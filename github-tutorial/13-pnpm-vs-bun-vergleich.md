# pnpm vs Bun - Der große Vergleich (2026)

## Warum dieser Vergleich?

Du überlegst von npm zu wechseln und fragst dich: **pnpm oder direkt Bun?** Diese Dokumentation hilft dir bei der Entscheidung.

---

## Kurz-Übersicht

| Kriterium | pnpm | Bun |
|-----------|------|-----|
| **Geschwindigkeit** | 3x schneller als npm | 17x schneller als npm |
| **Speicherplatz** | Sehr effizient (Symlinks) | Gut (Hardlinks) |
| **Kompatibilität** | Sehr hoch | Wachsend, aber Lücken |
| **Stabilität** | Produktionsreif | Noch jung |
| **Learning Curve** | Minimal | Minimal |
| **Runtime inklusive** | Nein (nur Package Manager) | Ja (JS/TS Runtime) |

---

## Was ist Bun?

**Bun** ist nicht nur ein Package Manager, sondern ein komplettes JavaScript-Toolkit:

1. **Package Manager** - Alternative zu npm/pnpm/yarn
2. **JavaScript Runtime** - Alternative zu Node.js
3. **Bundler** - Alternative zu Webpack/esbuild
4. **Test Runner** - Alternative zu Jest/Vitest

**Alltagsanalogie:** 🧰 pnpm ist ein super Schraubenzieher. Bun ist ein ganzer Werkzeugkasten - schneller, aber du musst prüfen ob alle Werkzeuge für deine Schrauben passen.

---

## Geschwindigkeits-Vergleich

### Typische Installation (50 Dependencies)

| Package Manager | Zeit |
|-----------------|------|
| npm | ~14 Sekunden |
| pnpm | ~4 Sekunden |
| **Bun** | **~0.8 Sekunden** |

### Großes Projekt (200 Dependencies, z.B. Next.js)

| Package Manager | Zeit |
|-----------------|------|
| npm | ~45 Sekunden |
| pnpm | ~12 Sekunden |
| **Bun** | **~2.1 Sekunden** |

### Warum ist Bun so schnell?

1. **Zig statt JavaScript** - Bun ist in Zig geschrieben (kompilierter Code)
2. **Weniger Syscalls** - ~165.000 vs npm's ~1.000.000+
3. **Binäre Lock-Datei** - `bun.lock` parst schneller als JSON/YAML

---

## Speicherplatz-Vergleich

### Mit 3 Worktrees (NoteDrill-Beispiel)

```
NPM:
notedrill/node_modules/      1.0 GB
notedrill-wt-1/node_modules/ 1.0 GB
notedrill-wt-2/node_modules/ 1.0 GB
────────────────────────────────────
Total:                       3.0 GB

PNPM:
~/.pnpm-store/               1.0 GB (global, einmalig)
notedrill/node_modules/      50 MB (Symlinks)
notedrill-wt-1/node_modules/ 50 MB (Symlinks)
notedrill-wt-2/node_modules/ 50 MB (Symlinks)
────────────────────────────────────
Total:                       1.15 GB

BUN:
~/.bun/install/cache/        1.0 GB (global Cache)
notedrill/node_modules/      200 MB (Hardlinks)
notedrill-wt-1/node_modules/ 200 MB (Hardlinks)
notedrill-wt-2/node_modules/ 200 MB (Hardlinks)
────────────────────────────────────
Total:                       1.6 GB
```

**Gewinner Speicherplatz: pnpm** (durch clevere Symlink-Struktur)

---

## Kompatibilität

### pnpm Kompatibilität

| Bereich | Status | Notiz |
|---------|--------|-------|
| npm Packages | ✅ 99%+ | Sehr wenige Ausnahmen |
| Node.js | ✅ 100% | Nutzt Node.js |
| Next.js | ✅ Perfekt | Vercel empfiehlt pnpm |
| React Native | ⚠️ Mit Config | `node-linker=hoisted` nötig |
| Electron | ⚠️ Mit Config | `node-linker=hoisted` nötig |
| AWS Lambda | ⚠️ Mit Config | Symlink-Probleme möglich |
| CI/CD | ✅ Überall | Native GitHub Actions Support |

### Bun Kompatibilität

| Bereich | Status | Notiz |
|---------|--------|-------|
| npm Packages | ✅ ~95% | Manche Native Modules problematisch |
| Node.js APIs | ⚠️ ~90% | Noch nicht alle APIs implementiert |
| Next.js | ✅ Gut | Funktioniert, aber nicht offiziell supported |
| React Native | ❌ Nicht empfohlen | Viele Probleme |
| Electron | ❌ Nicht empfohlen | Bun Runtime != Node.js |
| AWS Lambda | ⚠️ Experimentell | Bun Runtime Layer nötig |
| CI/CD | ✅ Wachsend | GitHub Actions Support vorhanden |

### Bekannte Bun-Inkompatibilitäten

```
❌ Native Node Modules (.node Dateien) - oft Probleme
❌ node-gyp basierte Packages - können fehlschlagen
❌ Manche fs/crypto APIs - noch nicht implementiert
❌ Worker Threads - unterschiedliches Verhalten
```

---

## Wann pnpm wählen?

### pnpm wenn...

- ✅ **Stabilität wichtig ist** - Produktionsprojekte
- ✅ **Next.js / Vercel** - Offizielle Empfehlung
- ✅ **React Native** - Mit Hoisting konfigurierbar
- ✅ **Electron Apps** - Mit Hoisting konfigurierbar
- ✅ **Maximale npm-Kompatibilität** - Nahezu alle Packages funktionieren
- ✅ **Team-Projekt** - Jeder kennt npm-Syntax
- ✅ **Monorepos** - Native Workspace-Unterstützung
- ✅ **Worktrees** - Beste Speichereffizienz

```bash
# Installation
npm install -g pnpm

# Nutzung (fast wie npm)
pnpm add lodash
pnpm dev
```

---

## Wann Bun wählen?

### Bun wenn...

- ✅ **Pure Speed wichtig ist** - Entwickler-Workflows beschleunigen
- ✅ **Greenfield Projekt** - Neues Projekt ohne Legacy
- ✅ **TypeScript-First** - Native TS-Unterstützung ohne Kompilierung
- ✅ **Du experimentierfreudig bist** - Neue Technologie ausprobieren
- ✅ **Einfache Web-Apps** - Ohne komplexe Native Dependencies
- ✅ **Solo-Entwicklung** - Keine Team-Abstimmung nötig

```bash
# Installation (Windows: via PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# Nutzung
bun add lodash
bun dev
```

---

## Befehls-Vergleich

| Aktion | npm | pnpm | Bun |
|--------|-----|------|-----|
| Install all | `npm install` | `pnpm install` | `bun install` |
| Add package | `npm install pkg` | `pnpm add pkg` | `bun add pkg` |
| Remove | `npm uninstall pkg` | `pnpm remove pkg` | `bun remove pkg` |
| Run script | `npm run dev` | `pnpm dev` | `bun dev` |
| Execute | `npx pkg` | `pnpm dlx pkg` | `bunx pkg` |
| Update | `npm update` | `pnpm update` | `bun update` |

---

## Performance-Philosophie

> **"Bun is Fast, pnpm is Correct"**
> 
> Bun fokussiert auf **Geschwindigkeit und Developer Experience**.
> pnpm fokussiert auf **korrektes Dependency Management**.

### Was bedeutet "correct"?

pnpm's strikte Dependency-Struktur findet Bugs die npm versteckt:

```javascript
// In deinem Code:
import helper from 'some-helper';

// some-helper ist NICHT in deiner package.json,
// aber zufällig installiert weil ein anderes Package es braucht.

// npm: ✅ Funktioniert (zufällig)
// pnpm: ❌ Error - Package nicht gefunden (GUT!)
// Bun: ✅ Funktioniert (zufällig)
```

---

## Risiko-Einschätzung

### pnpm Risiken

| Risiko | Schwere | Lösung |
|--------|---------|--------|
| Symlink-Probleme | Niedrig | `node-linker=hoisted` |
| Team kennt es nicht | Niedrig | 10 Min Einführung |
| CI muss angepasst werden | Niedrig | Einfache Config |

### Bun Risiken

| Risiko | Schwere | Lösung |
|--------|---------|--------|
| Package funktioniert nicht | Mittel | Zurück zu npm/pnpm |
| Node.js API fehlt | Mittel | Warten auf Update |
| Breaking Changes | Mittel | Version pinnen |
| Team-Widerstand | Hoch | Bei Node.js bleiben |
| Production-Bugs | Mittel | Intensive Tests |

---

## Migrations-Aufwand

### Von npm zu pnpm

```
Aufwand: ★☆☆☆☆ (Sehr gering)
Zeit: ~30 Minuten

Schritte:
1. pnpm install -g pnpm
2. pnpm import
3. rm -rf node_modules && pnpm install
4. rm package-lock.json
5. Fertig!
```

### Von npm zu Bun

```
Aufwand: ★★★☆☆ (Mittel)
Zeit: 1-4 Stunden (je nach Projekt)

Schritte:
1. Bun installieren
2. bun install
3. Scripts testen (manche brauchen Anpassung)
4. Native Modules prüfen
5. CI/CD anpassen
6. Team schulen
```

---

## Empfehlung für NoteDrill

### Klare Empfehlung: **pnpm**

**Warum?**

1. **Next.js Projekt** - Vercel empfiehlt pnpm offiziell
2. **Electron Support** - Mit `node-linker=hoisted` kein Problem
3. **Worktree-Nutzung** - Maximale Speicherersparnis
4. **Stabilität** - Produktionsreifes Tool
5. **Einfache Migration** - Fast identische Syntax wie npm
6. **Team-freundlich** - Geringe Lernkurve

### Bun später evaluieren wenn...

- Bun 2.0 released wird (mehr Node.js Kompatibilität)
- Electron offiziell unterstützt wird
- Das Team experimentierfreudig ist

---

## Fazit-Tabelle

| Frage | Antwort |
|-------|---------|
| Willst du maximale Geschwindigkeit? | → Bun |
| Willst du maximale Stabilität? | → pnpm |
| Willst du maximale Kompatibilität? | → pnpm |
| Hast du ein Next.js Projekt? | → pnpm |
| Hast du ein Electron Projekt? | → pnpm |
| Machst du ein Greenfield Experiment? | → Bun probieren |
| Arbeitest du im Team? | → pnpm |
| Nutzt du Worktrees? | → pnpm (beste Speichereffizienz) |

---

## Quellen

- [pnpm vs npm vs yarn vs Bun: The 2026 Package Manager Showdown](https://dev.to/pockit_tools/pnpm-vs-npm-vs-yarn-vs-bun-the-2026-package-manager-showdown-51dc)
- [PNPM vs. Bun Install vs. Yarn Berry - Better Stack](https://betterstack.com/community/guides/scaling-nodejs/pnpm-vs-bun-install-vs-yarn/)
- [Bun is Fast, pnpm is Correct](https://dev.to/tumf/bun-is-fast-pnpm-is-correct-the-future-of-the-js-ecosystem-as-shown-by-two-package-managers-2l06)
- [npm vs Yarn vs pnpm vs Bun: The Complete 2026 Comparison](https://techsy.io/blog/bun-vs-pnpm-vs-yarn-vs-npm)
- [GitHub Discussion: Clear winner in 2025?](https://github.com/orgs/community/discussions/182181)

---

## Weiter lesen

- [12-npm-zu-pnpm-migration.md](12-npm-zu-pnpm-migration.md) - Migrations-Guide
- [10-groessere-aenderungen-worktrees.md](10-groessere-aenderungen-worktrees.md) - Worktrees nutzen
