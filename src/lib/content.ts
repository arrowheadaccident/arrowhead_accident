import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { z } from "zod";
import { DEFAULT_LOCALE, LOCALES, localePath, type Locale } from "@/i18n/config";
import { COLLECTIONS, frontmatterSchema, translationSchema } from "./frontmatter.mjs";

export type Collection = keyof typeof COLLECTIONS;
export type Frontmatter = z.output<typeof frontmatterSchema>;
export type Template = NonNullable<Frontmatter["template"]>;

export type Entry = {
  collection: Collection;
  slug: string;
  locale: Locale;
  /** Localized URL: /whiplash-injury/ or /es/whiplash-injury/. */
  url: string;
  template: Template;
  frontmatter: Frontmatter;
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function invalid(file: string, error: { issues: { path: PropertyKey[]; message: string }[] }): Error {
  const issues = error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
  // Fails `next build` on purpose (SITE-BRIEF §7.3).
  return new Error(`Invalid frontmatter in ${file}:\n${issues}`);
}

function readMdx(dir: string): { slug: string; file: string; data: unknown; content: string }[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return { slug: file.replace(/\.mdx$/, ""), file: path.relative(process.cwd(), path.join(dir, file)), data, content };
    });
}

function readCollection(collection: Collection): Entry[] {
  const config = COLLECTIONS[collection];
  const english = readMdx(path.join(CONTENT_DIR, collection)).map(({ slug, file, data, content }): Entry => {
    const parsed = frontmatterSchema.safeParse(data);
    if (!parsed.success) throw invalid(file, parsed.error);
    return {
      collection,
      slug,
      locale: DEFAULT_LOCALE,
      url: config.url(slug),
      template: parsed.data.template ?? (config.template as Template),
      frontmatter: parsed.data,
      body: content,
    };
  });

  // content/<locale>/<collection>/<slug>.mdx translates the English file with the same slug.
  const translations = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).flatMap((locale) =>
    readMdx(path.join(CONTENT_DIR, locale, collection)).map(({ slug, file, data, content }): Entry => {
      const source = english.find((e) => e.slug === slug);
      if (!source) throw new Error(`${file} has no English original content/${collection}/${slug}.mdx`);
      const parsed = translationSchema.safeParse(data);
      if (!parsed.success) throw invalid(file, parsed.error);
      const text = Object.fromEntries(Object.entries(parsed.data).filter(([, value]) => value !== undefined));
      return {
        ...source,
        locale,
        url: localePath(locale, source.url),
        frontmatter: { ...source.frontmatter, ...text },
        body: content,
      };
    }),
  );

  return [...english, ...translations].sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order || a.slug.localeCompare(b.slug),
  );
}

function loadEntries(): Entry[] {
  const entries = (Object.keys(COLLECTIONS) as Collection[]).flatMap(readCollection);

  const englishSlugs = new Set(entries.filter((e) => e.locale === DEFAULT_LOCALE).map((e) => e.slug));
  for (const entry of entries) {
    for (const related of entry.frontmatter.related) {
      if (!englishSlugs.has(related)) {
        throw new Error(`content/${entry.collection}/${entry.slug}.mdx: related slug "${related}" does not exist`);
      }
    }
  }

  return entries;
}

let loaded: Entry[] | null = null;

/** Builds and `next start` read content/ once per process. `next dev` reads it once per request, so edits to
    content/*.mdx show on the next refresh without restarting the server. */
const allEntries = process.env.NODE_ENV === "production" ? () => (loaded ??= loadEntries()) : cache(loadEntries);

const inLocale = (locale: Locale) => allEntries().filter((e) => e.locale === locale);

export function getCollection(collection: Collection, locale: Locale): Entry[] {
  return inLocale(locale).filter((e) => e.collection === collection);
}

export function getEntry(collection: Collection, slug: string, locale: Locale): Entry | undefined {
  return inLocale(locale).find((e) => e.collection === collection && e.slug === slug);
}

/** Entries served at /<slug>/ (or /<locale>/<slug>/) by src/app/[lang]/[slug]/page.tsx. */
export function getTopLevelEntries(locale: Locale): Entry[] {
  return inLocale(locale).filter((e) => e.collection !== "blog");
}

export function getTopLevelEntry(slug: string, locale: Locale): Entry | undefined {
  return getTopLevelEntries(locale).find((e) => e.slug === slug);
}

/** Same-day care + the six conditions, in menu order. */
export function getTreatments(locale: Locale): Entry[] {
  return inLocale(locale)
    .filter((e) => e.frontmatter.navGroup === "treatments")
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

/** Related pages in the entry's language; ones that are not translated yet are left out. */
export function getRelated(entry: Entry): Entry[] {
  return entry.frontmatter.related
    .map((slug) => inLocale(entry.locale).find((e) => e.slug === slug))
    .filter((e): e is Entry => Boolean(e));
}

export function getPosts(locale: Locale): Entry[] {
  return getCollection("blog", locale).sort((a, b) => b.frontmatter.published.localeCompare(a.frontmatter.published));
}

/** The entry in every language it exists in, English first. */
export function getVersions(entry: Pick<Entry, "collection" | "slug">): Entry[] {
  return allEntries()
    .filter((e) => e.collection === entry.collection && e.slug === entry.slug)
    .sort((a, b) => LOCALES.indexOf(a.locale) - LOCALES.indexOf(b.locale));
}

/** The same page in every language it exists in: { en: "/whiplash-injury/", es: "/es/whiplash-injury/", … }. */
export function getAlternates(entry: Pick<Entry, "collection" | "slug">): Partial<Record<Locale, string>> {
  return Object.fromEntries(getVersions(entry).map((e) => [e.locale, e.url]));
}

/**
 * What the language switcher needs to know: every page's English path, and per language the ones with no
 * translation (the legal pages). It sends those, and unknown paths (the 404 page), to the home page.
 */
export function getSitePages(): { paths: string[]; untranslated: Partial<Record<Locale, string[]>> } {
  const english = inLocale(DEFAULT_LOCALE);
  return {
    paths: ["/", "/contact/", "/blog/", ...english.map((e) => e.url)],
    untranslated: Object.fromEntries(
      LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => [
        locale,
        english.filter((e) => !getEntry(e.collection, e.slug, locale)).map((e) => e.url),
      ]),
    ),
  };
}

export const FAQ_SLUG = "car-collision-injury-chiropractor-arrowhead-glendale-arizona";
export const NO_COST_SLUG = "no-cost-for-your-treatment-ever";
