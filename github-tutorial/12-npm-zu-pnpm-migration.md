# NPM zu PNPM Migration - Komplett-Guide

## Warum diese Dokumentation?

Du hast in der [Worktree-Doku](10-groessere-aenderungen-worktrees.md) gesehen, dass jeder Worktree seine eigenen `node_modules` braucht (~1 GB pro Ordner!). Mit **pnpm** sparst du massiv Speicherplatz, weil alle Packages nur einmal global gespeichert werden.

---

## Was ist pnpm?

**pnpm** = "Performant npm" - ein alternativer Package Manager, der:

1. **Speicherplatz spart** - Packages werden einmal global gespeichert, dann per Symlink verknüpft
2. **Schneller ist** - ca. 3x schneller als npm bei Installationen
3. **Sicherer ist** - Verhindert "Phantom Dependencies" (undeklariierte Abhängigkeiten)

**Alltagsanalogie:** 📚 Stell dir vor, du hast 10 Schulhefte und jedes braucht das gleiche Wörterbuch. Mit npm legst du 10 Kopien des Wörterbuchs an. Mit pnpm hast du ein Wörterbuch in der Bibliothek und 10 Lesezeichen, die darauf zeigen.

---

## Speichervergleich bei Worktrees

```
MIT NPM (vorher):
notedrill/node_modules/              ~1 GB
notedrill-wt-tanstack/node_modules/  ~1 GB  (fast identisch!)
notedrill-wt-i18n/node_modules/      ~1 GB  (wieder identisch!)
────────────────────────────────────────────
Total:                               ~3 GB

MIT PNPM (nachher):
~/.pnpm-store/                       ~1 GB  (globaler Store, EINMALIG)
notedrill/node_modules/              ~50 MB (nur Symlinks!)
notedrill-wt-tanstack/node_modules/  ~50 MB (Symlinks zum selben Store)
notedrill-wt-i18n/node_modules/      ~50 MB (Symlinks zum selben Store)
────────────────────────────────────────────
Total:                               ~1.15 GB statt 3 GB!
```

---

## Soll ich einen Worktree für die Migration nutzen?

### Empfehlung: **JA, Worktree nutzen!**

Die npm → pnpm Migration ist eine größere Änderung, weil:

1. **Lock-Datei ändert sich** - `package-lock.json` → `pnpm-lock.yaml`
2. **Alle Scripts müssen getestet werden** - `npm run X` → `pnpm X`
3. **Mögliche Kompatibilitätsprobleme** - Manche Packages haben Symlink-Probleme

### Workflow für die Migration

```bash
# 1. Migrations-Branch und Worktree erstellen
git branch feature/pnpm-migration
git worktree add ../notedrill-pnpm-test feature/pnpm-migration

# 2. Im Worktree die Migration durchführen
cd ../notedrill-pnpm-test

# 3. Wenn alles funktioniert: Merge
# 4. Wenn nicht: Worktree löschen, Branch verwerfen
```

---

## Migration Schritt-für-Schritt

### Schritt 1: pnpm installieren

```bash
# Option A: Via npm (global)
npm install -g pnpm

# Option B: Via Corepack (empfohlen für Teams)
corepack enable
corepack prepare pnpm@latest --activate

# Prüfen ob es funktioniert
pnpm --version
```

### Schritt 2: Lock-Datei konvertieren

```bash
# Im Projekt-Ordner
cd dein-projekt

# Bestehende Lock-Datei importieren (wandelt package-lock.json um)
pnpm import

# WICHTIG: node_modules löschen bevor pnpm install!
rm -rf node_modules

# Neu installieren mit pnpm
pnpm install
```

### Schritt 3: package.json anpassen

Füge folgendes hinzu um sicherzustellen, dass **nur pnpm** verwendet wird:

```json
{
  "packageManager": "pnpm@10.8.0",
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

### Schritt 4: .npmrc erstellen (optional aber empfohlen)

Erstelle eine `.npmrc` Datei im Projekt-Root:

```ini
# Strict mode - verhindert Phantom Dependencies
shamefully-hoist=false

# Bei Kompatibilitätsproblemen (z.B. React Native):
# node-linker=hoisted
```

### Schritt 5: Alte Dateien entfernen

```bash
# Alte npm Lock-Datei entfernen
rm package-lock.json

# .gitignore prüfen - pnpm-lock.yaml sollte NICHT ignoriert werden!
```

### Schritt 6: Testen

```bash
# Prüfen ob alles läuft
pnpm run dev
pnpm run build
pnpm run type-check
```

---

## Der gefährlichste Edge-Case: Versehentlich `npm` statt `pnpm` tippen

### Das Problem

```bash
# Du tippst aus Gewohnheit:
npm install lodash    # FALSCH! Erzeugt package-lock.json!
npm run dev           # Funktioniert evtl., aber inkonsistent

# Statt:
pnpm add lodash       # RICHTIG!
pnpm dev              # RICHTIG!
```

**Was passiert wenn du `npm` aus Versehen nutzt?**
- `package-lock.json` wird neu erzeugt (Konflikt mit `pnpm-lock.yaml`)
- `node_modules` wird flach statt mit Symlinks aufgebaut
- Phantom Dependencies werden wieder möglich
- Inkonsistenter Zustand zwischen Teammitgliedern

### Lösung 1: Preinstall-Script (EMPFOHLEN)

Das Script in `package.json` verhindert `npm install`:

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

**Was passiert wenn du jetzt `npm install` tippst?**
```
╔═══════════════════════════════════════════════════╗
║                                                   ║
║   Use "pnpm install" for installation in this    ║
║   project.                                        ║
║                                                   ║
║   If you don't have pnpm, install it via:        ║
║   npm i -g pnpm                                   ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
```
Die Installation wird abgebrochen!

### Lösung 2: packageManager-Feld + Corepack

```json
{
  "packageManager": "pnpm@10.8.0"
}
```

Mit aktiviertem Corepack:
```bash
corepack enable
```

Wenn du jetzt `npm install` tippst, bekommst du eine Warnung (aber kein harter Stopp).

### Lösung 3: Shell-Alias (persönlich)

In deiner `~/.bashrc` oder `~/.zshrc`:

```bash
# Warnung wenn npm im pnpm-Projekt verwendet wird
npm() {
  if [ -f "pnpm-lock.yaml" ]; then
    echo "⚠️  WARNUNG: Dieses Projekt nutzt pnpm!"
    echo "   Nutze: pnpm $@"
    echo ""
    read -p "Trotzdem npm nutzen? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      command npm "$@"
    fi
  else
    command npm "$@"
  fi
}
```

### Lösung 4: Git Hook (Team-weit)

`.husky/pre-commit`:

```bash
#!/bin/sh

# Prüfe ob package-lock.json versehentlich erstellt wurde
if [ -f "package-lock.json" ]; then
  echo "❌ FEHLER: package-lock.json gefunden!"
  echo "   Dieses Projekt nutzt pnpm."
  echo "   Bitte lösche package-lock.json und nutze 'pnpm install'"
  exit 1
fi
```

---

## Bekannte Probleme und Lösungen

### Problem 1: Symlink-Kompatibilität (Electron, Lambda)

**Symptom:** Deployment funktioniert nicht, Fehler mit Symlinks

**Lösung:** In `.npmrc`:
```ini
node-linker=hoisted
```

### Problem 2: React Native funktioniert nicht

**Symptom:** Tonnenweise Fehler beim Start eines React Native Projekts

**Lösung:** In `.npmrc`:
```ini
node-linker=hoisted
```

React Native erwartet eine flache `node_modules` Struktur.

### Problem 3: Phantom Dependencies (undeklariierte Packages)

**Symptom:** Code nutzt ein Package das nicht in `package.json` steht
```javascript
import something from 'phantom-package'; // Funktionierte mit npm, bricht mit pnpm
```

**Lösung:** Package explizit installieren:
```bash
pnpm add phantom-package
```

pnpm zeigt dir diese Fehler - das ist ein **Feature**, kein Bug!

### Problem 4: Monorepo-Hoisting-Probleme

**Symptom:** Packages im Monorepo finden ihre Dependencies nicht

**Lösung:** In `.npmrc`:
```ini
# Nur bestimmte Packages hoisten
hoist-pattern[]=*eslint*
hoist-pattern[]=*prettier*

# ODER: Alles hoisten (nicht empfohlen)
shamefully-hoist=true
```

### Problem 5: CI/CD Pipeline bricht ab

**Symptom:** GitHub Actions / GitLab CI findet pnpm nicht

**Lösung:** pnpm in CI installieren:

```yaml
# GitHub Actions
- uses: pnpm/action-setup@v2
  with:
    version: 10
    
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'pnpm'
    
- run: pnpm install
```

### Problem 6: AUTH_TOKEN wird nicht erkannt

**Symptom:** Private Registry funktioniert nicht mit pnpm

**Lösung:** `.npmrc` im Projekt-Root erstellen:
```ini
//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}
```

---

## Befehls-Übersetzung: npm → pnpm

| npm Befehl | pnpm Befehl | Notiz |
|------------|-------------|-------|
| `npm install` | `pnpm install` | Gleich |
| `npm install lodash` | `pnpm add lodash` | **add** statt install! |
| `npm install -D lodash` | `pnpm add -D lodash` | Gleich |
| `npm install -g package` | `pnpm add -g package` | Gleich |
| `npm uninstall lodash` | `pnpm remove lodash` | **remove** statt uninstall |
| `npm run dev` | `pnpm dev` | Kürzer! (run ist optional) |
| `npm run build` | `pnpm build` | Kürzer! |
| `npm test` | `pnpm test` | Gleich |
| `npm ci` | `pnpm install --frozen-lockfile` | CI-Modus |
| `npx create-react-app` | `pnpm dlx create-react-app` | **dlx** statt npx |
| `npm update` | `pnpm update` | Gleich |
| `npm outdated` | `pnpm outdated` | Gleich |

---

## Checkliste: Migrations-Abschluss

```
[ ] pnpm global installiert
[ ] pnpm import ausgeführt
[ ] node_modules gelöscht und neu installiert
[ ] package-lock.json gelöscht
[ ] packageManager in package.json gesetzt
[ ] preinstall Script hinzugefügt
[ ] .npmrc erstellt (falls nötig)
[ ] pnpm run dev funktioniert
[ ] pnpm run build funktioniert  
[ ] pnpm run type-check funktioniert
[ ] CI/CD Pipeline angepasst
[ ] README aktualisiert (npm → pnpm Hinweis)
[ ] Team informiert
```

---

## Rollback: Zurück zu npm

Falls die Migration scheitert:

```bash
# Lock-Datei löschen
rm pnpm-lock.yaml

# node_modules löschen
rm -rf node_modules

# preinstall Script entfernen (in package.json)
# packageManager Feld entfernen (in package.json)

# Mit npm neu installieren
npm install
```

---

## Fazit: Wann lohnt sich pnpm?

| Situation | Empfehlung |
|-----------|------------|
| Du arbeitest oft mit Worktrees | **Ja, sehr!** Spart GB an Speicher |
| Monorepo mit mehreren Packages | **Ja!** Native Workspace-Unterstützung |
| Einfaches Solo-Projekt | Optional, aber keine Nachteile |
| Team-Projekt | **Ja**, wenn alle wechseln |
| React Native Projekt | Mit `node-linker=hoisted` |
| Electron App | Mit `node-linker=hoisted` |

---

## Quellen

- [pnpm vs npm - Offizielle Dokumentation](https://pnpm.io/pnpm-vs-npm)
- [pnpm FAQ](https://pnpm.io/faq)
- [Only allow pnpm](https://pnpm.io/only-allow-pnpm)
- [GitHub: only-allow Package](https://github.com/pnpm/only-allow)
- [Corepack Dokumentation](https://nodejs.org/api/corepack.html)
- [Migration Guide - British Geological Survey](https://britishgeologicalsurvey.github.io/development/migrating-from-npm-to-pnpm/)
- [pnpm Symlinked Structure](https://pnpm.io/symlinked-node-modules-structure)

---

## Weiter lesen

- [10-groessere-aenderungen-worktrees.md](10-groessere-aenderungen-worktrees.md) - Worktrees nutzen
- [11-top-befehle-zusammenfassung.md](11-top-befehle-zusammenfassung.md) - Git Befehle
- [13-pnpm-vs-bun-vergleich.md](13-pnpm-vs-bun-vergleich.md) - Vergleich mit Bun
