export interface FlightOfferSearchResult {
  meta: Meta;
  data: Daum[];
  dictionaries: Record<string, Record<string, string>>;
}

export interface Meta {
  count: number;
  links: Links;
}

export interface Links {
  self: string;
}

export interface Daum {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: Departure;
  arrival: Arrival;
  carrierCode: string;
  number: string;
  aircraft: Aircraft;
  operating?: Operating;
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
  stops?: Stop[];
}

export interface Departure {
  iataCode: string;
  terminal?: string;
  at: string;
}

export interface Arrival {
  iataCode: string;
  terminal?: string;
  at: string;
}

export interface Aircraft {
  code: string;
}

export interface Operating {
  carrierCode: string;
}

export interface Stop {
  iataCode: string;
  duration: string;
  arrivalAt: string;
  departureAt: string;
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
  additionalServices?: AdditionalService[];
}

export interface Fee {
  amount: string;
  type: string;
}

export interface AdditionalService {
  amount: string;
  type: string;
}

export interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price2;
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface Price2 {
  currency: string;
  total: string;
  base: string;
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  brandedFare?: string;
  class: string;
  includedCheckedBags: IncludedCheckedBags;
  sliceDiceIndicator?: string;
}

export interface IncludedCheckedBags {
  quantity: number;
}
