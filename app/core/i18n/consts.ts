import { enUS, es } from "date-fns/locale";

export type Locale = (typeof locales)[number]['key'];


export const defaultLocale: string = 'en';
export const locales = [
  {
    key: 'en',
    name: 'English',
    alpha2Code: 'US',
    flag: 'en',
    dateFnsLocale: enUS
  },
  {
    key: 'es',
    name: 'Español',
    flag: 'es',
    alpha2Code: 'ES',
    dateFnsLocale: es
  },
] as const;
