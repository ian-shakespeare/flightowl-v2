import { createTRPCRouter, publicProcedure } from "../utils";
import { getFlightOffers } from "~/server/amadeus/requests";
import { FlightOfferSearchParamsSchema } from "~/types/amadeus/params";

export const amadeusRouter = createTRPCRouter({
  getFlightOffers: publicProcedure
    .input(FlightOfferSearchParamsSchema)
    .query(async ({ input: params }) => {
      return await getFlightOffers(params);
    }),
});
