import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import { COLLECTIONS, frontmatterSchema } from "./frontmatter.mjs";

export type Collection = keyof typeof COLLECTIONS;
export type Frontmatter = z.output<typeof frontmatterSchema>;
export type Template = NonNullable<Frontmatter["template"]>;

export type Entry = {
  collection: Collection;
  slug: string;
  url: string;
  template: Template;
  frontmatter: Frontmatter;
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function readCollection(collection: Collection): Entry[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = frontmatterSchema.safeParse(data);
      if (!parsed.success) {
        const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
        // Fails `next build` on purpose (SITE-BRIEF §7.3).
        throw new Error(`Invalid frontmatter in content/${collection}/${file}:\n${issues}`);
      }
      const config = COLLECTIONS[collection];
      return {
        collection,
        slug,
        url: config.url(slug),
        template: parsed.data.template ?? (config.template as Template),
        frontmatter: parsed.data,
        body: content,
      };
    })
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order || a.slug.localeCompare(b.slug));
}

let cache: Entry[] | null = null;

function allEntries(): Entry[] {
  if (cache) return cache;
  const entries = (Object.keys(COLLECTIONS) as Collection[]).flatMap(readCollection);

  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  for (const entry of entries) {
    for (const related of entry.frontmatter.related) {
      if (!bySlug.has(related)) {
        throw new Error(`content/${entry.collection}/${entry.slug}.mdx: related slug "${related}" does not exist`);
      }
    }
  }

  cache = entries;
  return entries;
}

export function getCollection(collection: Collection): Entry[] {
  return allEntries().filter((e) => e.collection === collection);
}

export function getEntry(collection: Collection, slug: string): Entry | undefined {
  return allEntries().find((e) => e.collection === collection && e.slug === slug);
}

/** Entries served at /<slug>/ by src/app/[slug]/page.tsx. */
export function getTopLevelEntries(): Entry[] {
  return allEntries().filter((e) => e.collection !== "blog");
}

export function getTopLevelEntry(slug: string): Entry | undefined {
  return getTopLevelEntries().find((e) => e.slug === slug);
}

/** Same-day care + the six conditions, in menu order. */
export function getTreatments(): Entry[] {
  return allEntries()
    .filter((e) => e.frontmatter.navGroup === "treatments")
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getRelated(entry: Entry): Entry[] {
  return entry.frontmatter.related
    .map((slug) => allEntries().find((e) => e.slug === slug))
    .filter((e): e is Entry => Boolean(e));
}

export function getPosts(): Entry[] {
  return getCollection("blog").sort((a, b) => b.frontmatter.published.localeCompare(a.frontmatter.published));
}

export const FAQ_SLUG = "car-collision-injury-chiropractor-arrowhead-glendale-arizona";
export const NO_COST_SLUG = "no-cost-for-your-treatment-ever";
