#!/usr/bin/env node
/**
 * Lists every fact still marked "To be confirmed" (tbc(...)) in content/,
 * plus fee schedules still awaiting SLFC approval, photos awaiting consent
 * and the team's "// To check:" notes (facts to check against documents).
 * Run with:  npm run checklist
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath, not .pathname: the project folder's name may contain spaces.
const dir = fileURLToPath(new URL("../content/", import.meta.url));
let total = 0;

for (const file of readdirSync(dir).filter((f) => f.endsWith(".ts")).sort()) {
  const lines = readFileSync(join(dir, file), "utf8").split("\n");
  const hits = [];
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/tbc\("([^"]+)"/g)) hits.push(`  line ${String(i + 1).padStart(4)}  ${m[1]}`);
    if (/status: "awaiting-approval"/.test(line)) hits.push(`  line ${String(i + 1).padStart(4)}  Fee schedule awaiting SLFC-approved amounts`);
    if (/consent: "pending"/.test(line)) hits.push(`  line ${String(i + 1).padStart(4)}  Photo/video consent pending`);
    const check = line.match(/\/\/ To check: (.+)/);
    if (check) hits.push(`  line ${String(i + 1).padStart(4)}  Check: ${check[1]}`);
  });
  if (hits.length) {
    console.log(`\ncontent/${file}  (${hits.length})`);
    console.log(hits.join("\n"));
    total += hits.length;
  }
}
console.log(`\n${total} item(s) to confirm before launch.\n`);
