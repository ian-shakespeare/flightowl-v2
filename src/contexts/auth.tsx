import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  onMount,
} from "solid-js";
import { Profile } from "~/types";
import { getUserAccount, getSession } from "~/utils/supabase";

const AuthContext = createContext();

export const AuthProvider = (props: {
  profile: Profile | null;
  children: JSX.Element;
}) => {
  const [profile, setProfile] = createSignal(props.profile),
    loadableProfile = [
      profile,
      {
        loadProfile(p: Profile | null) {
          setProfile(() => p);
        },
      },
    ];

  onMount(async () => {
    const account = await getUserAccount();
    const isSignedIn = (await getSession()) !== null;
    // TODO(ian) switch away from window location
    if (
      isSignedIn &&
      !account?.id &&
      !window.location.href.includes("/register")
    ) {
      window.location.href = "/register";
    }
    setProfile(() => account);
  });

  return (
    <AuthContext.Provider value={loadableProfile}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): [
  Accessor<Profile | null>,
  { loadProfile: (p: Profile | null) => void },
] => {
  return useContext(AuthContext) as unknown as [
    Accessor<Profile | null>,
    { loadProfile: (p: Profile | null) => void },
  ];
};
