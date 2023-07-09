import { Amadeus } from ".";
import { FlightOfferSearchResult } from "~/types/amadeus";
import { FlightOfferSearchParams } from "~/types/amadeus/params";

const amadeus = new Amadeus(
  import.meta.env.VITE_AMADEUS_KEY,
  import.meta.env.VITE_AMADEUS_SECRET
);

export const getFlightOffers = async (
  params: FlightOfferSearchParams
): Promise<FlightOfferSearchResult | null> => {
  const res = await amadeus.performRequest(
    "/v2/shopping/flight-offers",
    "POST",
    JSON.stringify(params)
  );
  if (res.errors) {
    console.error(res);
    return null;
  }
  return res;
};
