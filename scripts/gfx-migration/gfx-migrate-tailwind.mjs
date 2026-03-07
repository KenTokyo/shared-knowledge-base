#!/usr/bin/env node
/**
 * GFX Migration Script: Ersetzt Tailwind-Klassen durch GFX-Klassen
 *
 * Usage: node gfx-migrate-tailwind.mjs [--dry-run] [--dir app/]
 *
 * --dry-run: Zeigt nur was geaendert wuerde, aendert nichts
 * --dir:     Verzeichnis zum Scannen (default: app/ + components/)
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import path from "path";

// ======= KONFIGURATION =======
const REPLACEMENTS = [
  // Backdrop-Blur (MUSS VOR shadow- kommen wegen Reihenfolge)
  {
    from: /\bbackdrop-blur-3xl\b/g,
    to: "gfx-backdrop-blur-xl",
    desc: "backdrop-blur-3xl → gfx-backdrop-blur-xl",
  },
  {
    from: /\bbackdrop-blur-2xl\b/g,
    to: "gfx-backdrop-blur-xl",
    desc: "backdrop-blur-2xl → gfx-backdrop-blur-xl",
  },
  {
    from: /\bbackdrop-blur-xl\b/g,
    to: "gfx-backdrop-blur-xl",
    desc: "backdrop-blur-xl → gfx-backdrop-blur-xl",
  },
  {
    from: /\bbackdrop-blur-lg\b/g,
    to: "gfx-backdrop-blur-lg",
    desc: "backdrop-blur-lg → gfx-backdrop-blur-lg",
  },
  {
    from: /\bbackdrop-blur-md\b/g,
    to: "gfx-backdrop-blur-md",
    desc: "backdrop-blur-md → gfx-backdrop-blur-md",
  },
  {
    from: /\bbackdrop-blur-sm\b/g,
    to: "gfx-backdrop-blur-sm",
    desc: "backdrop-blur-sm → gfx-backdrop-blur-sm",
  },

  // Shadows (nur Standard-Tailwind, NICHT shadow-none/inner/custom/color)
  {
    from: /\bshadow-2xl\b(?![\w-])/g,
    to: "gfx-shadow-elevated-lg",
    desc: "shadow-2xl → gfx-shadow-elevated-lg",
  },
  {
    from: /\bshadow-xl\b(?![\w-])/g,
    to: "gfx-shadow-elevated-xl",
    desc: "shadow-xl → gfx-shadow-elevated-xl",
  },
  {
    from: /\bshadow-lg\b(?![\w-])/g,
    to: "gfx-shadow-elevated-lg",
    desc: "shadow-lg → gfx-shadow-elevated-lg",
  },
  {
    from: /\bshadow-md\b(?![\w-])/g,
    to: "gfx-shadow-elevated-md",
    desc: "shadow-md → gfx-shadow-elevated-md",
  },
  {
    from: /\bshadow-sm\b(?![\w-])/g,
    to: "gfx-shadow-elevated-sm",
    desc: "shadow-sm → gfx-shadow-elevated-sm",
  },
];

// Dateien/Verzeichnisse die NICHT veraendert werden sollen
const EXCLUDE_PATTERNS = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "globals.css",
  "_variables.css",
  "_base-utilities.css",
  "_component-glows.css",
  "gfx-migrate",
  "gfx-audit",
  "graphics-core",
  "gfx-utilities",
];

const FILE_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js"];

// ======= HELPERS =======
function findFiles(dir, extensions) {
  const results = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry);
      if (EXCLUDE_PATTERNS.some((p) => full.includes(p))) continue;
      try {
        const stat = statSync(full);
        if (stat.isDirectory()) {
          results.push(...findFiles(full, extensions));
        } else if (extensions.some((ext) => full.endsWith(ext))) {
          results.push(full);
        }
      } catch {
        /* Permission denied or broken symlink */
      }
    }
  } catch {
    /* Directory not found */
  }
  return results;
}

// ======= MAIN =======
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const dirArg = args.find((a) => a.startsWith("--dir="));
const dirs = dirArg ? [dirArg.split("=")[1]] : ["app", "components"];

console.log(`\n🎨 GFX Migration Script${dryRun ? " (DRY RUN)" : ""}`);
console.log("=".repeat(50));

let totalFiles = 0;
let totalReplacements = 0;
const details = [];

for (const dir of dirs) {
  const files = findFiles(dir, FILE_EXTENSIONS);

  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    let newContent = content;
    let fileReplacements = 0;
    const fileDetails = [];

    for (const { from, to, desc } of REPLACEMENTS) {
      const matches = newContent.match(from);
      if (matches) {
        fileReplacements += matches.length;
        fileDetails.push(`  ${desc} (${matches.length}x)`);
        newContent = newContent.replace(from, to);
      }
    }

    if (fileReplacements > 0) {
      totalFiles++;
      totalReplacements += fileReplacements;
      const relPath = path.relative(process.cwd(), file);
      console.log(`\n📝 ${relPath}: ${fileReplacements} Ersetzungen`);
      fileDetails.forEach((d) => console.log(d));
      details.push({ file: relPath, count: fileReplacements });

      if (!dryRun) {
        writeFileSync(file, newContent, "utf-8");
      }
    }
  }
}

console.log("\n" + "=".repeat(50));
console.log(
  `✅ ${totalFiles} Dateien, ${totalReplacements} Ersetzungen${dryRun ? " (nur Vorschau)" : " durchgefuehrt"}`
);

if (dryRun && totalReplacements > 0) {
  console.log("\n💡 Tipp: Ohne --dry-run ausfuehren um Aenderungen zu speichern.");
}
if (totalReplacements === 0) {
  console.log("\n✨ Keine Tailwind-Klassen gefunden die ersetzt werden muessen.");
}
