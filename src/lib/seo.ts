import type { Metadata } from "next";
import { SITE_IS_PLACEHOLDER, business, team } from "@/config/business";
import { DEFAULT_LOCALE, LOCALES, LOCALE_INFO, type Locale } from "@/i18n/config";
import { fill } from "@/i18n/fill";
import { getDictionary } from "@/i18n";
import { placeholderProblems } from "@/lib/launch-check.mjs";

// Going live with sample data would get a fake NAP indexed, so the build stops instead (docs/SEO-AUDIT.md C1).
// The opposite mistake, launching while still a placeholder, is caught by `npm run check:launch`.
if (!SITE_IS_PLACEHOLDER) {
  const problems = placeholderProblems({ business, team });
  if (problems.length) {
    throw new Error(`SITE_IS_PLACEHOLDER is false but src/config/business.ts still has placeholder data:\n- ${problems.join("\n- ")}`);
  }
}

/**
 * Page-level openGraph replaces the root one, so every page sets the image explicitly. It is a route
 * with a file extension (src/app/og.png/route.tsx) because `trailingSlash: true` 308-redirects
 * extensionless metadata routes such as /opengraph-image (docs/SEO-AUDIT.md H3). The image text is English.
 */
export function ogImage(locale: Locale) {
  return {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: fill(getDictionary(locale).meta.ogImageAlt, { name: business.name, phone: business.phone.display }),
  };
}

export const robots: Metadata["robots"] = SITE_IS_PLACEHOLDER
  ? { index: false, follow: false }
  : { index: true, follow: true };

/** Absolute URL for a site path ("/whiplash-injury/"). */
export function absoluteUrl(pathname: string): string {
  return new URL(pathname, business.url).toString();
}

/** The same page in each language it exists in, keyed by locale. */
export type Alternates = Partial<Record<Locale, string>>;

/** hreflang map for <link rel="alternate">: { en: "/x/", es: "/es/x/", …, "x-default": "/x/" }; empty for a one-language page. */
export function hreflangLinks(alternates: Alternates): Record<string, string> {
  const links: Record<string, string> = {};
  for (const locale of LOCALES) {
    const path = alternates[locale];
    if (path) links[LOCALE_INFO[locale].hreflang] = path;
  }
  if (Object.keys(links).length < 2) return {};
  const fallback = alternates[DEFAULT_LOCALE];
  if (fallback) links["x-default"] = fallback;
  return links;
}

type PageMeta = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  /** Other languages of this page. Leave out for a page that exists in one language only. */
  alternates?: Alternates;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({ locale, title, description, path, alternates, type = "website", publishedTime, modifiedTime }: PageMeta): Metadata {
  const image = ogImage(locale);
  const languages = alternates ? hreflangLinks(alternates) : {};
  const otherLocales = LOCALES.filter((l) => l !== locale && alternates?.[l]).map((l) => LOCALE_INFO[l].ogLocale);
  return {
    title,
    description,
    alternates: { canonical: path, ...(Object.keys(languages).length ? { languages } : {}) },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: business.name,
      locale: LOCALE_INFO[locale].ogLocale,
      ...(otherLocales.length ? { alternateLocale: otherLocales } : {}),
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots,
  };
}
