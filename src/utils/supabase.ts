import { createClient } from "@supabase/supabase-js";
import { User } from "../types";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SECRET
);

export const signIn = async () =>
  await supabase.auth.signInWithOAuth({ provider: "google" });

export const getUserAccount = async (): Promise<User> => {
  const { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) throw error;
  if (profiles.length < 1) throw "no profile found";
  const [{ id, created_at, user_id, fname, lname }] = profiles;
  return { id, createdAt: created_at, userId: user_id, fname, lname };
};
