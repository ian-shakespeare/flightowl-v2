import { A } from "@solidjs/router";
import { Title } from "solid-start";
import { useAuth } from "~/contexts/auth";
import { api } from "~/utils/api";

const Home = () => {
  const hello = api.example.hello.useQuery(() => "World");
  const [profile] = useAuth();
  return (
    <main>
      <Title>Home - FlightOwl</Title>
      <h1>Hello {profile()?.firstName ?? "stranger"}!</h1>
      <A href="/login">Login page</A>
      <pre>
        <code>{JSON.stringify(hello.data, null, 2)}</code>
      </pre>
    </main>
  );
};

export default Home;
