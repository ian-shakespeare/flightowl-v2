import { CurrencyCode } from "~/types/enums";

export type Profile = {
  id: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  preferredCurrency: CurrencyCode;
};

export type Error = {
  code: number;
  name: string;
  body: string;
  location: string;
};
