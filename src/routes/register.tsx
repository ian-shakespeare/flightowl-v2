import { createSignal, Show } from "solid-js";
import { Navigate } from "solid-start";
import { useAuth } from "~/contexts/auth";
import { CurrencyCode } from "~/types/enums";
import { createProfile, getSession } from "~/utils/supabase";

const Register = () => {
  const [profile] = useAuth();
  const [fname, setFname] = createSignal("");
  const [lname, setLname] = createSignal("");
  const [currency, setCurrency] = createSignal("");
  return (
    <main>
      <Show when={profile !== null}>
        <Navigate href="/" />
      </Show>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const session = await getSession();
          createProfile(
            session!.user.id,
            fname(),
            lname(),
            currency() as CurrencyCode,
          );
        }}
      >
        <input
          type="text"
          value={fname()}
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          type="text"
          value={lname()}
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
        <input
          type="text"
          value={currency()}
          placeholder="Preferred currency"
          onChange={(e) => setCurrency(e.target.value)}
        />
        <input type="submit" value="submit me" />
      </form>
    </main>
  );
};

export default Register;
