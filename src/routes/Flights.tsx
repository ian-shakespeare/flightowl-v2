import { createResource } from "solid-js";
import Layout from "../components/ui/Layout";
import { getFlightOffers } from "../utils/amadeus";

const Flights = () => {
  const originLocationCode = "LAX";
  const destinationLocationCode = "NRT";
  const departureDate = new Date("2023-09-09");
  const numAdults = 1;
  const [flights] = createResource(
    { originLocationCode, destinationLocationCode, departureDate, numAdults },
    getFlightOffers
  );
  return (
    <Layout title="Flights - FlightOwl" description="TODO">
      <div>{flights.loading && "Loading..."}</div>
      <div>{JSON.stringify(flights())}</div>
    </Layout>
  );
};

export default Flights;
