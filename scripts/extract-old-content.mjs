#!/usr/bin/env node
// One-time import of the old WordPress site (SITE-BRIEF §7.1).
//
//   npm run extract            -> writes content/_raw/<collection>/<slug>.mdx + prints a report
//
// The output is a starting point for the hand-cleaned files in content/<collection>/.
// It goes to content/_raw/ (git-ignored) so a re-run never overwrites cleaned content.
import fs from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";
import TurndownService from "turndown";

const OLD_SITE = "https://arrowheadcaraccidentchiropractor.com";
const OUT_DIR = path.join(process.cwd(), "content", "_raw");

// Verified against the live site on 2026-10-26: 10,377 look-alike characters -> 0 left.
// Found on the old site: а е о р с у і ѕ (U+04xx) and ԛ (U+051B). The rest are common extras.
// NOTE: the range must include U+0500–U+052F, or "ԛuickly" survives.
const HOMOGLYPHS = {
  "а": "a", "в": "b", "е": "e", "к": "k", "м": "m", "н": "h", "о": "o", "р": "p", "с": "c",
  "т": "t", "у": "y", "х": "x", "і": "i", "ј": "j", "ѕ": "s", "һ": "h", "ӏ": "l", "ԁ": "d",
  "ԛ": "q", "ԝ": "w",
  "А": "A", "В": "B", "Е": "E", "К": "K", "М": "M", "Н": "H", "О": "O", "Р": "P", "С": "C",
  "Т": "T", "Х": "X", "І": "I", "Ј": "J", "Ѕ": "S",
};

export function normalizeHomoglyphs(text) {
  return text.replace(/[Ѐ-ԯ]/g, (c) => HOMOGLYPHS[c] ?? c);
}

export const hasCyrillic = (text) => /[Ѐ-ԯ]/.test(text);

/** Old URL -> where its cleaned version lives. */
const SOURCES = [
  { url: "/", collection: "pages", slug: "home" },
  { url: "/about-us/", collection: "pages", slug: "about-us" },
  { url: "/pain-management/", collection: "pages", slug: "pain-management" },
  { url: "/contact/", collection: "pages", slug: "contact" },
  { url: "/emergency-car-collision-treatment/", collection: "pages", slug: "emergency-car-collision-treatment" },
  { url: "/no-cost-for-your-treatment-ever/", collection: "pages", slug: "no-cost-for-your-treatment-ever" },
  {
    url: "/car-collision-injury-chiropractor-arrowhead-glendale-arizona/",
    collection: "pages",
    slug: "car-collision-injury-chiropractor-arrowhead-glendale-arizona",
  },
  { url: "/whiplash-injury/", collection: "conditions", slug: "whiplash-injury" },
  { url: "/neck-pain-whiplash/", collection: "conditions", slug: "neck-pain-whiplash" }, // merged into whiplash-injury
  { url: "/neck-chiropractor-arrowhead-az/", collection: "conditions", slug: "neck-chiropractor-arrowhead-az" },
  { url: "/headaches-closed-head-injury/", collection: "conditions", slug: "headaches-closed-head-injury" },
  { url: "/low-back-pain/", collection: "conditions", slug: "low-back-pain" },
  { url: "/spinal-ligament-injury-treatment/", collection: "conditions", slug: "spinal-ligament-injury-treatment" },
  { url: "/mutiple-injuries/", collection: "conditions", slug: "multiple-injuries" },
  {
    url: "/2016/06/24/insurance-mantas-myths-concerning-auto-accidents-phoenix-arizona/",
    collection: "blog",
    slug: "car-accident-insurance-myths",
  },
  {
    url: "/2016/06/24/phoenix-car-accident-injury-us-military-study-states-youre-better-off-seeing-chiropractor/",
    collection: "blog",
    slug: "chiropractic-vs-standard-care-study",
  },
  { url: "/terms-of-use/", collection: "legal", slug: "terms-of-use" },
  { url: "/privacy-policy/", collection: "legal", slug: "privacy-policy" },
  { url: "/disclosure-policy/", collection: "legal", slug: "disclosure-policy" },
];

const turndown = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", emDelimiter: "*" });
turndown.remove(["iframe", "img", "figure"]);

const PHONE = /\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]\d{4}\b/g;

async function fetchHtml(url) {
  const res = await fetch(OLD_SITE + url, {
    headers: { "user-agent": "Mozilla/5.0 (content migration; arrowhead rebuild)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.text();
}

function extract(html) {
  const $ = cheerio.load(html);
  const title = normalizeHomoglyphs($("title").first().text().trim());
  const description = normalizeHomoglyphs($('meta[name="description"]').attr("content")?.trim() ?? "");
  const h1 = normalizeHomoglyphs($("h1").first().text().trim());

  let root = $(".entry-content").first();
  if (!root.length) root = $("main").first();
  if (!root.length) root = $("article").first();
  if (!root.length) root = $(".elementor").first();

  root.find("script, style, noscript, header, footer, nav, form, iframe, h1").remove();
  root.find(".widget_recent_entries, .post-navigation, .nav-links, .more-link").remove();
  root.find("a").filter((_, a) => /read more/i.test($(a).text())).remove();
  root.find("h2, h3, h4, h5").filter((_, h) => /recent news/i.test($(h).text())).each((_, h) => {
    $(h).next("ul").remove();
    $(h).remove();
  });

  const markdown = normalizeHomoglyphs(turndown.turndown(root.html() ?? ""))
    .replace(/ /g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { title, description, h1, markdown };
}

function frontmatterSkeleton({ title, description, h1 }) {
  const today = new Date().toISOString().slice(0, 10);
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `h1: ${JSON.stringify(h1)}`,
    'excerpt: ""',
    "order: 100",
    `published: "${today}"`,
    `updated: "${today}"`,
    "related: []",
    "faqs: []",
    "---",
    "",
  ].join("\n");
}

async function main() {
  const rows = [];
  for (const source of SOURCES) {
    const html = await fetchHtml(source.url);
    const page = extract(html);
    const file = path.join(OUT_DIR, source.collection, `${source.slug}.mdx`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, frontmatterSkeleton(page) + page.markdown + "\n", "utf8");

    rows.push({
      file: path.relative(process.cwd(), file),
      words: page.markdown.split(/\s+/).filter(Boolean).length,
      cyrillic: (page.markdown.match(/[Ѐ-ԯ]/g) ?? []).length,
      phones: [...new Set(page.markdown.match(PHONE) ?? [])].join(", ") || "-",
      headings: (page.markdown.match(/^#{2,6} .+$/gm) ?? []).length,
    });
    for (const heading of page.markdown.match(/^#{2,6} .+$/gm) ?? []) console.log(`  ${source.slug}: ${heading}`);
  }
  console.table(rows);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
