import { z } from "zod";

export const CurrencyCodeSchema = z.enum([
  "USD",
  "EUR",
  "JPY",
  "CAD",
  "AUD",
  "GBP",
  "CHF",
  "NZD",
  "CNH",
]);

export const TravelerTypeSchema = z.enum([
  "ADULT",
  "CHILD",
  "HELF_INFANT",
  "SEATED_INFANT",
  "SENIOR",
]);

export const SourceSchema = z.enum(["GDS"]);

export const TravelClassSchema = z.enum([
  "ECONOMY",
  "PREMIUM_ECONOMY",
  "BUSINESS",
  "FIRST",
]);

export const CoverageSchema = z.enum([
  "MOST_SEGMENTS",
  "AT_LEAST_ONE_SEGMENT",
  "ALL_SEGMENTS",
]);

export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export type TravelerType = z.infer<typeof TravelerTypeSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type TravelClass = z.infer<typeof TravelClassSchema>;
export type Coverage = z.infer<typeof CoverageSchema>;
