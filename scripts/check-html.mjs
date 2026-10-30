#!/usr/bin/env node
// npm run check:html (SITE-BRIEF §14 "Rendered HTML of every page"). Run against `next start`:
//   BASE_URL=http://localhost:3000 npm run check:html
// For every URL in /sitemap.xml: one <h1>, a trailing-slash canonical, one valid JSON-LD script,
// noindex while SITE_IS_PLACEHOLDER, only tel:+16236004878, alt on images, title on iframes,
// unique titles, <html lang> of the URL's language, hreflang links that point both ways,
// og/twitter/icon URLs that answer 200 without a redirect, and first-load JS (gzipped). The JS budget is reported as a warning: on Next 16.4 + React 19 the
// framework runtime alone is ~136 KB gzipped, above the brief's 120 KB target (see README).
import { gzipSync } from "node:zlib";
import * as cheerio from "cheerio";
import { loadTs } from "./load-ts.mjs";

const { LOCALE_INFO, splitLocale } = await loadTs("src/i18n/config.ts");

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const TEL = "tel:+16236004878";
const JS_BUDGET_KB = 120;
const PLACEHOLDER = (process.env.SITE_IS_PLACEHOLDER ?? "true") !== "false";

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
paths.push("/this-page-does-not-exist/");

const scriptSizes = new Map();
async function gzippedSize(src) {
  if (!scriptSizes.has(src)) {
    const buf = Buffer.from(await (await fetch(new URL(src, BASE))).arrayBuffer());
    scriptSizes.set(src, gzipSync(buf, { level: 9 }).length);
  }
  return scriptSizes.get(src);
}

const failures = [];
const warnings = [];
const rows = [];
const titles = new Map();
const assets = new Map(); // asset path -> first page that references it
const hreflangs = new Map(); // page path -> { hreflang: path }

// Share previews and icons must not redirect: `trailingSlash` 308s extensionless routes (docs/SEO-AUDIT.md H3).
const ASSET_SELECTORS = [
  ['meta[property="og:image"]', "content"],
  ['meta[name="twitter:image"]', "content"],
  ['link[rel="icon"]', "href"],
  ['link[rel="apple-touch-icon"]', "href"],
];

for (const path of paths) {
  const res = await fetch(BASE + path);
  const html = await res.text();
  const $ = cheerio.load(html);
  const fail = (msg) => failures.push(`${path}: ${msg}`);
  const is404 = path === "/this-page-does-not-exist/";

  if (is404 ? res.status !== 404 : res.status !== 200) fail(`HTTP ${res.status}`);
  const expectedLang = is404 ? "en-US" : LOCALE_INFO[splitLocale(path).locale].htmlLang;
  if ($("html").attr("lang") !== expectedLang) fail(`<html lang="${$("html").attr("lang")}"> (expected ${expectedLang})`);

  const title = $("title").text();
  if (!title) fail("no <title>");
  else if (titles.has(title)) fail(`same <title> as ${titles.get(title)}`);
  else titles.set(title, path);

  for (const [selector, attr] of ASSET_SELECTORS) {
    $(selector).each((_, el) => {
      const url = new URL($(el).attr(attr), BASE);
      const key = url.pathname + url.search;
      if (!assets.has(key)) assets.set(key, path);
    });
  }

  const h1s = $("h1");
  if (h1s.length !== 1) fail(`${h1s.length} <h1> elements`);
  if (/\d{3}\D{0,3}\d{3}\D\d{4}/.test(h1s.text())) fail("phone number in <h1>");

  const robots = $('meta[name="robots"]').attr("content") ?? "";
  if (PLACEHOLDER && !/noindex/.test(robots)) fail(`robots meta is "${robots}" (expected noindex while placeholder)`);
  if (PLACEHOLDER && !/nofollow/.test(robots) && !is404) fail(`robots meta is "${robots}" (expected nofollow while placeholder)`);

  if (!is404) {
    const canonical = $('link[rel="canonical"]').attr("href");
    if (!canonical) fail("no canonical");
    else if (!canonical.endsWith("/") || new URL(canonical).pathname !== path) fail(`canonical ${canonical}`);

    const ld = $('script[type="application/ld+json"]');
    if (ld.length !== 1) fail(`${ld.length} JSON-LD scripts`);
    else {
      try {
        const data = JSON.parse(ld.html());
        if (!Array.isArray(data["@graph"])) fail("JSON-LD has no @graph");
      } catch (e) {
        fail(`JSON-LD does not parse: ${e.message}`);
      }
    }
    const alternates = {};
    $('link[rel="alternate"][hreflang]').each((_, el) => {
      alternates[$(el).attr("hreflang")] = new URL($(el).attr("href")).pathname;
    });
    if (Object.keys(alternates).length) {
      if (!Object.values(alternates).includes(path)) fail("hreflang links leave out the page itself");
      if (!alternates["x-default"]) fail("hreflang links have no x-default");
      hreflangs.set(path, alternates);
    }
    if (!$('meta[name="description"]').attr("content")) fail("no meta description");
    if (!$('meta[property="og:image"]').attr("content")) fail("no og:image");
  }

  $('a[href^="tel:"]').each((_, a) => {
    if ($(a).attr("href") !== TEL) fail(`tel link ${$(a).attr("href")}`);
  });
  $("img").each((_, img) => {
    if ($(img).attr("alt") === undefined) fail(`<img src="${$(img).attr("src")}"> without alt`);
  });
  $("iframe").each((_, f) => {
    if (!$(f).attr("title")) fail("<iframe> without title");
  });

  // noModule scripts are legacy polyfills that modern browsers never download.
  const scripts = $("script[src]:not([nomodule])").map((_, s) => $(s).attr("src")).get();
  let js = 0;
  for (const src of scripts) js += await gzippedSize(src);
  const kb = Math.round((js / 1024) * 10) / 10;
  if (kb > JS_BUDGET_KB) warnings.push(`${path}: first-load JS ${kb} KB gzipped (brief budget ${JS_BUDGET_KB} KB)`);
  rows.push({ path, status: res.status, h1: h1s.length, "js (KB gz)": kb, tel: $('a[href^="tel:"]').length });
}

// Every language version must list the same set of alternates (hreflang has to point both ways).
for (const [page, alternates] of hreflangs) {
  const expected = JSON.stringify(Object.entries(alternates).sort());
  for (const target of new Set(Object.values(alternates))) {
    if (!hreflangs.has(target)) failures.push(`${page}: hreflang target ${target} is not in the sitemap or has no hreflang links`);
    else if (JSON.stringify(Object.entries(hreflangs.get(target)).sort()) !== expected) {
      failures.push(`${page}: hreflang links differ from those on ${target}`);
    }
  }
}

for (const [asset, page] of assets) {
  const res = await fetch(BASE + asset, { redirect: "manual" });
  if (res.status !== 200) failures.push(`${page}: ${asset} answers HTTP ${res.status}${res.headers.get("location") ? ` → ${res.headers.get("location")}` : ""}`);
}

console.table(rows);
if (warnings.length) {
  console.warn(`
${warnings.length} budget warning(s):`);
  for (const w of warnings) console.warn(`  ! ${w}`);
}
if (failures.length) {
  console.error(`check:html: ${failures.length} failure(s)\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`check:html passed: ${paths.length} pages, ${hreflangs.size} with hreflang links, ${assets.size} preview/icon URLs.`);
