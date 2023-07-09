import { z } from "zod";
import {
  CoverageSchema,
  CurrencyCodeSchema,
  SourceSchema,
  TravelClassSchema,
  TravelerTypeSchema,
} from "~/types/enums";

const DateTimeRangeSchema = z.object({
  date: z.string(), // "YYYY-MM-DD"
  time: z.string(), // "HH:MM:SS"
  dateWindow: z.string().regex(new RegExp("[MPI][1-3]D")).optional(),
  timeWindow: z.string().regex(new RegExp("([1-9]|10|11|12)H")).optional(),
});

const CarrierRestrictionSchema = z.object({
  blacklistedInEUAllowed: z.boolean().optional(),
  excludedCarrierCodes: z.string().array().optional(),
  includedCarrierCodes: z.string().array().optional(),
});

const CabinRestrictionSchema = z.object({
  cabin: TravelClassSchema.optional(),
  originDestinationIds: z.string().array().optional(),
  coverage: CoverageSchema.optional(),
});

const ConnectionRestrictionSchema = z.object({
  maxNumberOfConnections: z.number().optional(),
  nonStopPreferred: z.boolean().optional(),
  nonStopPreferredWeight: z.number().optional(),
  airportChangeAllowed: z.boolean().optional(),
  technicalStopsAllowed: z.boolean().optional(),
});

const TravelerSchema = z.object({
  id: z.string(),
  travelerType: TravelerTypeSchema,
  associatedAdultId: z.string().optional(),
});

const CriteriaSchema = z.object({
  excludeAllotments: z.boolean().optional(),
  addOneWayOffers: z.boolean().optional(),
  maxFlightOffers: z.number().optional(),
  maxPrice: z.number().optional(),
  allowAlternativeFareOptions: z.boolean().optional(),
  oneFlightOfferPerDay: z.boolean().optional(),
  additionalInformation: z
    .object({
      chargeableCheckedBags: z.boolean().optional(),
      brandedFares: z.boolean().optional(),
    })
    .optional(),
  pricingOptions: z
    .object({
      includedCheckedBagsOnly: z.boolean().optional(),
      refundableFare: z.boolean().optional(),
      noRestrictionFare: z.boolean().optional(),
      noPenaltyFare: z.boolean().optional(),
    })
    .optional(),
  flightFilters: z
    .object({
      crossBorderAllowed: z.boolean().optional(),
      moreOvernightsAllowed: z.boolean().optional(),
      returnToDepartureAirport: z.boolean().optional(),
      railSegmentAllowed: z.boolean().optional(),
      busSegmentAllowed: z.boolean().optional(),
      maxFlightTime: z.number().optional(),
      carrierRestrictions: CarrierRestrictionSchema.optional(),
      cabinRestrictions: CabinRestrictionSchema.array().optional(),
      connectionRestriction: ConnectionRestrictionSchema.optional(),
    })
    .optional(),
});

export const FlightOfferSearchParamsSchema = z.object({
  currencyCode: CurrencyCodeSchema,
  originDestinations: z
    .object({
      id: z.string(),
      originLocationCode: z.string(),
      destinationLocationCode: z.string(),
      includedConnectionPoints: z.string().array().optional(),
      excludedConnectionPoints: z.string().array().optional(),
      originRadius: z.number().optional(),
      alternativeOriginCodes: z.string().array().optional(),
      departureDateTimeRange: DateTimeRangeSchema,
      arrivalDateTimeRange: DateTimeRangeSchema.optional(),
    })
    .array(),
  travelers: TravelerSchema.array(),
  sources: SourceSchema.array(),
  searchCriteria: CriteriaSchema,
});

export type FlightOfferSearchParams = z.infer<
  typeof FlightOfferSearchParamsSchema
>;
