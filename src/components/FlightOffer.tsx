import { createSignal } from "solid-js";
import type { Daum, Dictionaries } from "~/types/amadeus";
import { Duration } from "~/utils/duration";
import Dropdown from "./primitives/Dropdown";

type Props = {
  flight: Daum;
  dictionaries: Dictionaries;
};

const FlightOffer = ({ flight, dictionaries }: Props) => {
  const duration = new Duration(
    flight.itineraries.reduce(
      (acc, cur) => acc + new Duration(cur.duration).toSeconds(),
      0
    )
  );
  const carriers = new Set(
    flight.itineraries
      .map((itn) => itn.segments.map((seg) => seg.carrierCode))
      .flat()
  );
  return (
    <Dropdown
      id={`result${flight.id}`}
      dropButton={
        <>
          Carrier: {Array.from(carriers).map((c) => dictionaries.carriers[c])}
        </>
      }
    >
      Duration: {duration.toString()}
    </Dropdown>
  );
};

export default FlightOffer;
