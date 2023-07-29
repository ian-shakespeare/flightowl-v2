import { createClient } from "@supabase/supabase-js";
import { Profile } from "~/types";
import { CurrencyCode } from "~/types/enums";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_SECRET!,
);

export const signIn = async () =>
  await supabase.auth.signInWithOAuth({ provider: "google" });

export const signOut = async () => await supabase.auth.signOut();

export const createProfile = async (
  userId: string,
  fname: string,
  lname: string,
  preferredCurrency: CurrencyCode,
) =>
  await supabase.from("profiles").insert({
    fname,
    lname,
    user_id: userId,
    preferred_currency: preferredCurrency,
  });

export const getSession = async () =>
  (await supabase.auth.getSession()).data.session;

export const getUserAccount = async (): Promise<Profile | null> => {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, created_at, fname, lname, preferred_currency");
  if (error) throw error;
  if (profiles.length < 1) return null;
  const [{ id, created_at, fname, lname, preferred_currency }] = profiles;
  return {
    id,
    createdAt: new Date(created_at),
    firstName: fname,
    lastName: lname,
    preferredCurrency: preferred_currency,
  };
};
