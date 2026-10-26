// Languages of the site. English is the default and has no URL prefix (/about-us/); the others live under
// /<locale>/ (/es/about-us/). next.config.ts rewrites unprefixed URLs to app/[lang] with lang = "en".
// No imports: next.config.ts loads this file too.

export const LOCALES = ["en", "es", "de", "zh", "vi"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

type LocaleInfo = {
  /** Native name, shown in the language switcher. */
  name: string;
  /** <html lang>, JSON-LD inLanguage. */
  htmlLang: string;
  /** hreflang value in <link rel="alternate"> and the sitemap. */
  hreflang: string;
  /** og:locale (Facebook's list). */
  ogLocale: string;
  /** Intl formatting of dates, days and times. */
  intl: string;
};

export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
  en: { name: "English", htmlLang: "en-US", hreflang: "en", ogLocale: "en_US", intl: "en-US" },
  es: { name: "Español", htmlLang: "es-US", hreflang: "es", ogLocale: "es_LA", intl: "es-US" },
  de: { name: "Deutsch", htmlLang: "de", hreflang: "de", ogLocale: "de_DE", intl: "de-DE" },
  zh: { name: "简体中文", htmlLang: "zh-Hans", hreflang: "zh-Hans", ogLocale: "zh_CN", intl: "zh-CN" },
  vi: { name: "Tiếng Việt", htmlLang: "vi", hreflang: "vi", ogLocale: "vi_VN", intl: "vi-VN" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Site path in a language: localePath("es", "/contact/") -> "/es/contact/". English paths are unchanged. */
export function localePath(locale: Locale, path: string): string {
  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
}

/**
 * "/es/contact/" -> { locale: "es", path: "/contact/" }; "/contact/" -> { locale: "en", path: "/contact/" }.
 * Also takes the internal "/en/contact/" form that usePathname() returns while English pages prerender
 * (next.config.ts rewrites English URLs to app/[lang] with lang = "en").
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const withSlash = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const match = withSlash.match(/^\/([a-z]{2})(\/.*)$/);
  if (match && isLocale(match[1])) return { locale: match[1], path: match[2] };
  return { locale: DEFAULT_LOCALE, path: withSlash };
}

/** The URL a visitor sees for a pathname: "/en/contact" -> "/contact/", "/es/contact" -> "/es/contact/". */
export function publicPath(pathname: string): string {
  const { locale, path } = splitLocale(pathname);
  return localePath(locale, path);
}
