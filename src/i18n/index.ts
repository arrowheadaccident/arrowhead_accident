// Server-side only: importing this from a Client Component would ship every dictionary to the browser.
// Client Components get the strings they need as props.
import type { Locale } from "./config";
import { de } from "./dictionaries/de";
import { en, type Dictionary } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { vi } from "./dictionaries/vi";
import { zh } from "./dictionaries/zh";

export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { en, es, de, zh, vi };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
