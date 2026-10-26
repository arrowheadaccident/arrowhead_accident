// Loads a TypeScript module that has no imports (src/config/business.ts, src/i18n/config.ts) without a
// TS loader: transpile it in memory and import the result.
import fs from "node:fs";
import ts from "typescript";

/** @param {string} relativePath path from the project root */
export async function loadTs(relativePath) {
  const source = fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}
