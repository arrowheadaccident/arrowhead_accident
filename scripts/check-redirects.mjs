#!/usr/bin/env node
// npm run check:redirects (SITE-BRIEF §14). Run against `next start`:
//   BASE_URL=http://localhost:3000 npm run check:redirects
// Every "keep" URL must return 200 directly; every "redirect" URL must take exactly one 301
// to its target, and the target must return 200.
import fs from "node:fs";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const { keep, redirect } = JSON.parse(fs.readFileSync(new URL("./old-urls.json", import.meta.url), "utf8"));

const get = (path) => fetch(BASE + path, { redirect: "manual" });
const pathOf = (location) => new URL(location, BASE).pathname;

const failures = [];
let passed = 0;

for (const path of keep) {
  const res = await get(path);
  if (res.status === 200) passed++;
  else failures.push(`${path}: expected 200, got ${res.status}${res.headers.get("location") ? ` -> ${res.headers.get("location")}` : ""}`);
}

for (const [from, to] of Object.entries(redirect)) {
  const first = await get(from);
  const location = first.headers.get("location");
  if (first.status !== 301 || !location) {
    failures.push(`${from}: expected 301, got ${first.status}${location ? ` -> ${location}` : ""}`);
    continue;
  }
  if (pathOf(location) !== to) {
    failures.push(`${from}: 301 went to ${pathOf(location)} (a second hop is needed); expected ${to}`);
    continue;
  }
  const second = await get(to);
  if (second.status !== 200) failures.push(`${from}: target ${to} returned ${second.status}`);
  else passed++;
}

if (failures.length) {
  console.error(`check:redirects: ${failures.length} failure(s) against ${BASE}\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`check:redirects passed against ${BASE}: ${keep.length} URLs return 200, ${Object.keys(redirect).length} redirects take one 301 hop (${passed} checks).`);
