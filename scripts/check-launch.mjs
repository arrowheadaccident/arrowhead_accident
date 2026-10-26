#!/usr/bin/env node
// npm run check:launch (SITE-BRIEF §15, docs/SEO-AUDIT.md C1). Exits 1 while the site is still a
// placeholder or src/config/business.ts still holds sample data. Run it before the DNS cutover, or make
// it part of the production build command: `npm run check:launch && npm run build`.
import fs from "node:fs";
import ts from "typescript";
import { launchWarnings, placeholderProblems } from "../src/lib/launch-check.mjs";

// business.ts has no imports, so transpiling it in memory gives the real values without a TS loader.
const source = fs.readFileSync(new URL("../src/config/business.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const config = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

const problems = placeholderProblems(config);
if (config.SITE_IS_PLACEHOLDER) problems.unshift("SITE_IS_PLACEHOLDER is true: every page is noindex, nofollow");
const warnings = launchWarnings(config);

for (const w of warnings) console.warn(`  ! ${w}`);
if (problems.length) {
  console.error(`check:launch: not ready to launch, ${problems.length} problem(s) in src/config/business.ts\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log(`check:launch passed: indexable, no placeholder data (${config.business.url}).`);
