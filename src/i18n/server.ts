import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./index";

/**
 * The page's language, read from the app/[lang] root segment. Server Components only. Outside [lang]
 * (app/global-not-found.tsx) there is no root param, and the page is English.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (value === undefined) return DEFAULT_LOCALE;
  if (!isLocale(value)) notFound();
  return value;
}

/** The page's language and its interface copy. */
export async function getI18n(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getLocale();
  return { locale, t: getDictionary(locale) };
}
