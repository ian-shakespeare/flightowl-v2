//@ts-ignore
import Amadeus from "amadeus";

const amadeus = new Amadeus({
  clientId: import.meta.env.VITE_AMADEUS_KEY,
  clientSecret: import.meta.env.VITE_AMADEUS_SECRET,
});

type FlightOfferParams = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: Date;
  numAdults: number;
};
export const getFlightOffers = async ({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  numAdults,
}: FlightOfferParams) => {
  const [formattedDate] = departureDate.toJSON().split("T");
  return await amadeus.shopping.flightOffersSearch.get({
    originLocationCode,
    destinationLocationCode,
    departureDate: formattedDate,
    adults: String(numAdults),
  });
};
