import { CurrencyCode } from "~/types/enums";

export type Profile = {
  id: string;
  createdAt: Date;
  userId: string;
  firstName: string;
  lastName: string;
  preferredCurrency: CurrencyCode;
};

export type Error = {
  name: string;
  body: string;
  location: string;
};
