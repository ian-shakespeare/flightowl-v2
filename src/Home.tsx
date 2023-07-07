import { A } from "@solidjs/router";
import Layout from "./components/ui/Layout";
import { useAuth } from "./contexts/auth";

const Home = () => {
  const [user] = useAuth();
  return (
    <Layout title="Home - FlightOwl" description="">
      <h1>{user()?.fname}</h1>
      <A href="/login">To login page</A>
    </Layout>
  );
};

export default Home;
