#!/usr/bin/env node
/**
 * GFX Audit: Findet ungeschuetzte Inline-Styles die GFX benoetigen
 *
 * Usage: node gfx-audit-inline-styles.mjs [--dir app/]
 *
 * Sucht nach hardcodierten boxShadow, backdropFilter, textShadow etc.
 * in style={{ }} Attributen und listet sie auf.
 */

import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";

// ======= PATTERNS =======
const PATTERNS = [
  {
    name: "boxShadow (hardcodiert)",
    regex: /boxShadow\s*:\s*[`"'][^`"']*(?!var\(--gfx)/,
    exclude: /var\(--gfx/,
    severity: "🔴",
  },
  {
    name: "backdropFilter (hardcodiert)",
    regex: /backdropFilter\s*:\s*[`"'][^`"']*blur/,
    exclude: /var\(--gfx/,
    severity: "🔴",
  },
  {
    name: "filter: drop-shadow (hardcodiert)",
    regex: /filter\s*:\s*[`"'][^`"']*drop-shadow/,
    exclude: /var\(--gfx/,
    severity: "🔴",
  },
  {
    name: "textShadow (hardcodiert)",
    regex: /textShadow\s*:\s*[`"'][^`"']/,
    exclude: /var\(--gfx/,
    severity: "🟡",
  },
  {
    name: "radial-gradient (dekorativ)",
    regex: /radial-gradient\(/,
    exclude: /mask/,
    severity: "🟡",
  },
  {
    name: "mix-blend-mode (inline)",
    regex: /mixBlendMode\s*:/,
    exclude: null,
    severity: "🟡",
  },
];

const EXCLUDE_DIRS = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "gfx-migrate",
  "gfx-audit",
];

const FILE_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js"];

// ======= HELPERS =======
function findFiles(dir, extensions) {
  const results = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry);
      if (EXCLUDE_DIRS.some((p) => full.includes(p))) continue;
      try {
        const stat = statSync(full);
        if (stat.isDirectory()) {
          results.push(...findFiles(full, extensions));
        } else if (extensions.some((ext) => full.endsWith(ext))) {
          results.push(full);
        }
      } catch {
        /* Permission denied */
      }
    }
  } catch {
    /* Directory not found */
  }
  return results;
}

// ======= MAIN =======
const args = process.argv.slice(2);
const dirArg = args.find((a) => a.startsWith("--dir="));
const dirs = dirArg ? [dirArg.split("=")[1]] : ["app", "components"];

console.log("\n🔍 GFX Inline-Style Audit");
console.log("=".repeat(50));

let totalFindings = 0;
const findings = [];

for (const dir of dirs) {
  const files = findFiles(dir, FILE_EXTENSIONS);

  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      for (const pattern of PATTERNS) {
        if (pattern.regex.test(line)) {
          // Pruefen ob exclude-Pattern zutrifft (dann ist es OK)
          if (pattern.exclude && pattern.exclude.test(line)) continue;

          totalFindings++;
          const relPath = path.relative(process.cwd(), file);
          const finding = {
            file: relPath,
            line: i + 1,
            pattern: pattern.name,
            severity: pattern.severity,
            content: line.trim().substring(0, 100),
          };
          findings.push(finding);
          console.log(
            `${pattern.severity} ${relPath}:${i + 1} → ${pattern.name}`
          );
          console.log(`   ${line.trim().substring(0, 100)}`);
        }
      }
    }
  }
}

console.log("\n" + "=".repeat(50));
console.log(`📊 ${totalFindings} Findings gefunden`);
if (totalFindings > 0) {
  const critical = findings.filter((f) => f.severity === "🔴").length;
  const warning = findings.filter((f) => f.severity === "🟡").length;
  console.log(`   🔴 Kritisch: ${critical} (MUSS gefixt werden)`);
  console.log(`   🟡 Warnung:  ${warning} (pruefen ob GFX-Kontrolle noetig)`);
  console.log(
    "\n💡 Kritische Findings muessen auf var(--gfx-*) oder gfx-* Klassen umgestellt werden."
  );
} else {
  console.log("\n✨ Keine ungeschuetzten Inline-Styles gefunden!");
}
