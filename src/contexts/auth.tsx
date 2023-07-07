import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
} from "solid-js";
import { User } from "../types";
import { onMount } from "solid-js";
import { getUserAccount } from "../utils/supabase";

const AuthContext = createContext();

export const AuthProvider = (props: {
  user: User | null;
  children: JSX.Element;
}) => {
  const [user, setUser] = createSignal(props.user),
    settableUser = [
      user,
      {
        load(u: User | null) {
          setUser(() => u);
        },
      },
    ];

  onMount(() => {
    console.log("fetching user");
    getUserAccount()
      .then((u) => setUser(() => u))
      .catch((err) => console.error(err));
  });

  return (
    <AuthContext.Provider value={settableUser}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): [
  Accessor<User | null>,
  { load: (u: User | null) => void }
] => {
  return useContext(AuthContext) as unknown as [
    Accessor<User | null>,
    { load: (u: User | null) => void }
  ];
};
