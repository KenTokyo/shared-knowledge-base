#!/usr/bin/env node
/**
 * GFX Audit: Findet verbleibende ungeschuetzte Tailwind-Effekte
 *
 * Usage: node gfx-audit-unprotected.mjs [--dir app/]
 *
 * Sucht nach Tailwind-Klassen die NICHT durch GFX ersetzt wurden.
 * Nützlich als Validierung nach der Migration.
 */

import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";

// ======= PATTERNS =======
const UNPROTECTED_PATTERNS = [
  {
    name: "shadow-* (Tailwind, sollte gfx-shadow-* sein)",
    regex: /\bshadow-(sm|md|lg|xl|2xl)\b/g,
    severity: "🔴",
  },
  {
    name: "backdrop-blur-* (Tailwind, sollte gfx-backdrop-blur-* sein)",
    regex: /\bbackdrop-blur-(sm|md|lg|xl|2xl|3xl)\b/g,
    severity: "🔴",
  },
  {
    name: "blur-[*] (custom hardcodiert)",
    regex: /\bblur-\[\d+px\]/g,
    severity: "🟡",
  },
  {
    name: "Light-Blob Kandidat (rounded-full + bg-*/opacity)",
    regex: /(?:rounded-full.*bg-.*\/\d+|bg-.*\/\d+.*rounded-full)/g,
    severity: "🟡",
  },
  {
    name: "drop-shadow (Tailwind, sollte gfx-drop-shadow-* sein)",
    regex: /\bdrop-shadow-(sm|md|lg|xl|2xl)\b/g,
    severity: "🔴",
  },
];

// Zeilen die diese Patterns enthalten sind FALSE POSITIVES
const FALSE_POSITIVE_PATTERNS = [
  /gfx-/,           // Bereits GFX-geschuetzt
  /shadow-none/,    // Kein Effekt
  /shadow-inner/,   // Inset-shadow (spezialfall)
  /mask-image/,     // CSS Mask (kein visueller Effekt)
  /\/\//,           // Auskommentiert
  /\/\*/,           // Auskommentiert
];

const EXCLUDE_DIRS = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "gfx-migrate",
  "gfx-audit",
  "globals-graphics",
  "gfx-utilities",
];

const FILE_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".css"];

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

console.log("\n🛡️ GFX Unprotected Effects Audit");
console.log("=".repeat(50));

let totalFindings = 0;
let falsePositives = 0;

for (const dir of dirs) {
  const files = findFiles(dir, FILE_EXTENSIONS);

  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // False-Positive Check
      if (FALSE_POSITIVE_PATTERNS.some((fp) => fp.test(line))) {
        continue;
      }

      for (const pattern of UNPROTECTED_PATTERNS) {
        // Reset regex lastIndex (global flag)
        pattern.regex.lastIndex = 0;
        const matches = line.match(pattern.regex);
        if (matches) {
          totalFindings += matches.length;
          const relPath = path.relative(process.cwd(), file);
          console.log(
            `${pattern.severity} ${relPath}:${i + 1} → ${pattern.name}`
          );
          console.log(`   ${line.trim().substring(0, 120)}`);
        }
      }
    }
  }
}

console.log("\n" + "=".repeat(50));
if (totalFindings === 0) {
  console.log("✅ Keine ungeschuetzten Effekte gefunden! Migration vollstaendig.");
} else {
  console.log(`⚠️ ${totalFindings} ungeschuetzte Effekte gefunden`);
  console.log("\n💡 Diese muessen auf gfx-* Klassen umgestellt werden.");
  console.log(
    "   Light-Blob Kandidaten (🟡) sind ggf. False Positives - manuell pruefen."
  );
}
