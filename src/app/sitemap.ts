import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES, localePath, type Locale } from "@/i18n/config";
import { getCollection, getPosts, getTopLevelEntries, getVersions, type Entry } from "@/lib/content";
import { absoluteUrl, hreflangLinks } from "@/lib/seo";

const latest = (dates: string[]) => dates.reduce((a, b) => (a > b ? a : b));

/** One <url> per language version of a page, each listing every version as an hreflang alternate. */
function versions(pages: { locale: Locale; url: string; lastModified: string }[]): MetadataRoute.Sitemap {
  const links = hreflangLinks(Object.fromEntries(pages.map((p) => [p.locale, p.url])));
  const languages = Object.fromEntries(Object.entries(links).map(([hreflang, path]) => [hreflang, absoluteUrl(path)]));
  return pages.map((page) => ({
    url: absoluteUrl(page.url),
    lastModified: page.lastModified,
    ...(Object.keys(languages).length ? { alternates: { languages } } : {}),
  }));
}

const entryVersions = (entry: Entry) =>
  versions(getVersions(entry).map((e) => ({ locale: e.locale, url: e.url, lastModified: e.frontmatter.updated })));

/** Home, contact and the blog index exist in every language. */
const everyLanguage = (path: string, lastModified: string) =>
  versions(LOCALES.map((locale) => ({ locale, url: localePath(locale, path), lastModified })));

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = LOCALES.flatMap((locale) => [...getTopLevelEntries(locale), ...getCollection("blog", locale)]);
  const allUpdated = latest(entries.map((e) => e.frontmatter.updated));
  const postsUpdated = latest(entries.filter((e) => e.collection === "blog").map((e) => e.frontmatter.updated));

  return [
    ...everyLanguage("/", allUpdated),
    ...getTopLevelEntries(DEFAULT_LOCALE).flatMap(entryVersions),
    ...everyLanguage("/contact/", allUpdated),
    ...everyLanguage("/blog/", postsUpdated),
    ...getPosts(DEFAULT_LOCALE).flatMap(entryVersions),
  ];
}
