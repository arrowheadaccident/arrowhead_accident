// Frontmatter schema (SITE-BRIEF §7.3). Plain ESM so both the Next.js build
// (src/lib/content.ts) and `npm run check:content` (scripts/check-content.mjs)
// validate with the same rules.
import { z } from "zod";

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;
export const EXCERPT_MAX = 140;

/** Icons a card may use; mapped to lucide components in src/components/icons.tsx. */
export const ICON_NAMES = /** @type {const} */ ([
  "siren",
  "whiplash",
  "neck",
  "head",
  "back",
  "ligament",
  "multiple",
  "pill",
  "wallet",
  "question",
  "info",
]);

/** YAML turns unquoted 2019-08-02 into a Date; normalize back to a string. */
const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
);

const faqList = z.array(z.object({ q: z.string().min(5), a: z.string().min(10) }));

/** The fields a translation replaces. */
const textFields = {
  title: z.string().min(10).max(TITLE_MAX),
  description: z.string().min(20).max(DESCRIPTION_MAX), // legal pages use short descriptions (§9.2)
  h1: z.string().min(3).max(90),
  excerpt: z.string().min(20).max(EXCERPT_MAX),
  navLabel: z.string().max(40).optional(),
};

export const frontmatterSchema = z
  .object({
    ...textFields,
    faqs: faqList.default([]),
    navGroup: z.enum(["treatments"]).optional(),
    order: z.number().int().default(100),
    published: isoDate,
    updated: isoDate,
    related: z.array(z.string()).default([]),
    icon: z.enum(ICON_NAMES).optional(),
    template: z.enum(["service", "condition", "about", "faq", "legal", "post"]).optional(),
    showTeam: z.boolean().default(false),
  })
  .strict();

/**
 * A translation in content/<locale>/<collection>/<slug>.mdx has the same slug as the English file and only
 * the text fields; order, icon, related, dates and the rest come from the English file. `updated` is the
 * translation's own date when it differs.
 */
export const translationSchema = z.object({ ...textFields, faqs: faqList.optional(), updated: isoDate.optional() }).strict();

/** Collection folders under content/ and the URL each one is served at. */
export const COLLECTIONS = {
  pages: { template: "service", url: (slug) => `/${slug}/` },
  conditions: { template: "condition", url: (slug) => `/${slug}/` },
  legal: { template: "legal", url: (slug) => `/${slug}/` },
  blog: { template: "post", url: (slug) => `/blog/${slug}/` },
};

/** Strings that must never appear in content/ (SITE-BRIEF §14). */
export const BANNED_STRINGS = [
  "623-444-1111", // old numbers; the clinic number is now (623) 600-4878
  "602-313-1925",
  "602-449-9430",
  "16390",
  "20229",
  "Quackenbush",
  "Arrowhead Health Centers",
  "caraccdident",
  "mutiple",
  "Recent News",
  "in Arrowhead Car Accident Chiropractor",
];

export const CYRILLIC = /[Ѐ-ԯ]/;
