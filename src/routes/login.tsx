import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { Title } from "solid-start";
import { useAuth } from "~/contexts/auth";
import { signIn } from "~/utils/supabase";

const Login = () => {
  const [profile] = useAuth();

  const handleSignIn = async () => {
    const { data, error } = await signIn();
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
  };
  return (
    <>
      <Title>Login - FlightOwl</Title>
      <Show
        when={!profile()}
        fallback={
          <>
            You are already signed in. <A href="/">Go to home page</A>
          </>
        }
      >
        <button
          onClick={() => handleSignIn()}
          class="p-4 bg-red-500 hover:bg-blue-500"
        >
          Sign in with Google
        </button>
      </Show>
    </>
  );
};

export default Login;
