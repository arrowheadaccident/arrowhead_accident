#!/usr/bin/env node
// npm run check:content (SITE-BRIEF §14). Exits 1 on any problem.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  BANNED_STRINGS,
  COLLECTIONS,
  CYRILLIC,
  DESCRIPTION_MAX,
  TITLE_MAX,
  frontmatterSchema,
} from "../src/lib/frontmatter.mjs";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");

// Found during the cleanup on top of the brief's list: another clinic's name and a scraped directory.
const EXTRA_BANNED = ["Penny Injury", "uschirodirectory", "US CHIROPRACTIC DIRECTORY", "John Quackenbush"];
const PHONE = /\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]\d{4}\b/;
const SHOUTING = /\b[A-Z]{2,}[A-Z'’]*(?:\s+[A-Z]{2,}[A-Z'’]*){3,}\b/;

const problems = [];
const report = (file, message) => problems.push(`${path.relative(ROOT, file)}: ${message}`);

function walk(dir, exts) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name.startsWith("_") || entry.name === "node_modules" ? [] : walk(full, exts);
    return exts.some((ext) => entry.name.endsWith(ext)) ? [full] : [];
  });
}

function checkText(file, text) {
  const cyrillic = text.match(new RegExp(CYRILLIC.source, "g"));
  if (cyrillic) report(file, `${cyrillic.length} Cyrillic character(s) (U+0400–U+052F), e.g. "${cyrillic[0]}"`);
  for (const banned of [...BANNED_STRINGS, ...EXTRA_BANNED]) {
    if (text.toLowerCase().includes(banned.toLowerCase())) report(file, `banned string "${banned}"`);
  }
}

// 1. Every content file: frontmatter, Cyrillic, banned strings, phones, headings, tone.
const entries = [];
for (const [collection] of Object.entries(COLLECTIONS)) {
  for (const file of walk(path.join(CONTENT, collection), [".mdx"])) {
    const raw = fs.readFileSync(file, "utf8");
    checkText(file, raw);

    const { data, content } = matter(raw);
    const parsed = frontmatterSchema.safeParse(data);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) report(file, `frontmatter ${issue.path.join(".")}: ${issue.message}`);
      continue;
    }
    const fm = parsed.data;
    if (fm.title.length > TITLE_MAX) report(file, `title is ${fm.title.length} chars (max ${TITLE_MAX})`);
    if (fm.description.length > DESCRIPTION_MAX) report(file, `description is ${fm.description.length} chars (max ${DESCRIPTION_MAX})`);

    const slug = path.basename(file, ".mdx");
    const template = fm.template ?? COLLECTIONS[collection].template;
    entries.push({ file, slug, fm, template });

    const text = raw.replace(/\[[^\]]*\]\([^)]*\)/g, "");
    if (PHONE.test(text)) report(file, `phone number in text (use <Phone />): "${text.match(PHONE)[0]}"`);
    if (/^# /m.test(content)) report(file, "body contains an H1; the template renders the only H1 (start at ##)");
    if (/!{2,}/.test(raw)) report(file, 'repeated "!!"');
    if (SHOUTING.test(content)) report(file, `ALL-CAPS run: "${content.match(SHOUTING)[0]}"`);
    if ((template === "condition" || template === "service") && !content.includes("<CallCta />")) {
      report(file, "condition/service page is missing <CallCta />");
    }
    if (template === "faq" && fm.faqs.length === 0) report(file, "FAQ page has no faqs");
  }
}

// 2. Cross-file rules.
const slugs = new Set(entries.map((e) => e.slug));
for (const entry of entries) {
  for (const related of entry.fm.related) {
    if (!slugs.has(related)) report(entry.file, `related slug "${related}" does not exist`);
  }
  if (entry.template === "condition" && entry.fm.related.length !== 3) {
    report(entry.file, `condition page needs exactly 3 related pages (has ${entry.fm.related.length})`);
  }
}
const urls = entries.map((e) => COLLECTIONS[Object.keys(COLLECTIONS).find((c) => e.file.includes(path.sep + c + path.sep))].url(e.slug));
const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
for (const dupe of dupes) problems.push(`duplicate URL ${dupe}`);

// 3. Source code shown to visitors must be clean too (home page copy lives in src/).
for (const file of walk(path.join(ROOT, "src"), [".ts", ".tsx", ".mjs", ".css"])) {
  if (file.endsWith("frontmatter.mjs")) continue; // holds the banned list itself
  checkText(file, fs.readFileSync(file, "utf8"));
}

if (problems.length) {
  console.error(`check:content found ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log(`check:content passed: ${entries.length} content files, 0 Cyrillic, 0 banned strings, titles ≤ ${TITLE_MAX}, descriptions ≤ ${DESCRIPTION_MAX}.`);
