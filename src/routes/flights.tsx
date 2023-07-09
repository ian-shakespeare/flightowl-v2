import { api } from "~/utils/api";
import { Title } from "solid-start";
import { useAuth } from "~/contexts/auth";
import { Show } from "solid-js";
import { FlightOfferSearchParams } from "~/types/amadeus/params";

const Flights = () => {
  const [profile] = useAuth();
  const params: FlightOfferSearchParams = {
    currencyCode: "USD",
    originDestinations: [
      {
        id: "1",
        originLocationCode: "NYC",
        destinationLocationCode: "MAD",
        departureDateTimeRange: {
          date: "2023-11-01",
          time: "10:00:00",
        },
      },
    ],
    travelers: [
      {
        id: "1",
        travelerType: "ADULT",
      },
    ],
    sources: ["GDS"],
    searchCriteria: {
      maxFlightOffers: 2,
      flightFilters: {
        cabinRestrictions: [
          {
            cabin: "BUSINESS",
            coverage: "MOST_SEGMENTS",
            originDestinationIds: ["1"],
          },
        ],
      },
    },
  };
  const flights = !profile
    ? null
    : api.amadeus.getFlightOffers.useQuery(() => params);
  return (
    <main>
      <Title>Search - FlightOwl</Title>
      <h1 class="text-3xl">Flights Page</h1>
      <Show when={!!flights} fallback="Error finding flights">
        {JSON.stringify(flights)}
      </Show>
    </main>
  );
};

export default Flights;
