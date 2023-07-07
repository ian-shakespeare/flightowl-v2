import Layout from "../components/ui/Layout";
import { signIn } from "../utils/supabase";

const Login = () => {
  const handleSignIn = async () => {
    const { data, error } = await signIn();
    if (!error) {
      console.log(data);
    }
  };
  return (
    <Layout title="Login - FlightOwl" description="">
      <button onClick={handleSignIn} class="bg-red-500 p-4 hover:bg-blue-500">
        Sign in with Google
      </button>
    </Layout>
  );
};

export default Login;
