import { api } from "~/utils/api";
import { Title, useSearchParams } from "solid-start";
import { useAuth } from "~/contexts/auth";
import { For, Show } from "solid-js";
import type { FlightOfferSearchParams } from "~/types/amadeus/params";
import type { Daum } from "~/types/amadeus";
import { Duration } from "~/utils/duration";
import FlightOffer from "~/components/FlightOffer";

const Flights = () => {
  const [profile] = useAuth();
  const [{ origin, destination, departureDate }] = useSearchParams();
  const params: FlightOfferSearchParams = {
    currencyCode: "USD",
    originDestinations: [
      {
        id: "1",
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDateTimeRange: {
          date: departureDate,
          time: "12:00:00",
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
      maxFlightOffers: 5,
      flightFilters: {
        cabinRestrictions: [
          {
            cabin: "ECONOMY",
            coverage: "MOST_SEGMENTS",
            originDestinationIds: ["1"],
          },
        ],
      },
    },
  };
  const searchResults = !profile
    ? null
    : api.amadeus.getFlightOffers.useQuery(() => params);
  const { meta, data, dictionaries } = searchResults?.data ?? {
    meta: null,
    data: [] as Daum[],
    dictionaries: null,
  };
  return (
    <main>
      <Title>Search - FlightOwl</Title>
      <h1 class="text-3xl">Flights Page</h1>
      <Show when={!!searchResults} fallback="Error finding flights">
        Number of flights: {meta?.count ?? 0}
        <ul>
          <For each={data}>
            {(d) => (
              <li>
                <FlightOffer flight={d} dictionaries={dictionaries!} />
              </li>
            )}
          </For>
        </ul>
      </Show>
    </main>
  );
};

export default Flights;
