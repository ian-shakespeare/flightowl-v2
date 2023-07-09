//@ts-ignore
import Amadeus from "amadeus";
import { FlightOfferSearchResult } from "~/types/amadeus";
import { FlightOfferSearchParams } from "~/types/amadeus/params";
import { Error } from "~/types";

const amadeus = new Amadeus({
  clientId: import.meta.env.VITE_AMADEUS_KEY,
  clientSecret: import.meta.env.VITE_AMADEUS_SECRET,
  logLevel: "warn",
  http: "",
});

export const getFlightOffers = async (
  params: FlightOfferSearchParams
): Promise<{ data?: FlightOfferSearchResult; error?: Error }> => {
  console.log("got to here");
  try {
    const response = await amadeus.shopping.flightOffersSearch.post(
      JSON.stringify(params)
    );
    console.log("came back");
    return { data: JSON.parse(response.body), error: undefined };
  } catch (err) {
    console.error(err);
    return {
      data: undefined,
      error: {
        name: "Amadeus Error",
        location: "server/amadeus/index.ts",
        body: String(err),
      },
    };
  }
};
