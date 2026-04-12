# pnpm Migration - Praxis-Learnings

> **Erganzung zu:** [12-npm-zu-pnpm-migration.md](12-npm-zu-pnpm-migration.md)  
> **Entstanden aus:** Reale Migration NoteDrill (April 2026)

Diese Doku enthalt die **echten Probleme** die bei einer pnpm-Migration auftreten konnen - nicht nur Theorie, sondern getestete Losungen.

---

## Problem 1: Corepack uberschreibt deine pnpm-Version

### Symptom

Du installierst pnpm 10.33.0, aber `pnpm --version` zeigt eine altere Version:

```bash
npm install -g pnpm@latest
# Installing pnpm@10.33.0

pnpm --version
# 10.28.2  <- FALSCH! Nicht die installierte Version
```

### Ursache

Windows hat **zwei pnpm-Installationen**:

1. **npm global** (`C:\Users\USER\AppData\Roaming\npm\pnpm.cmd`)
2. **Corepack** (`C:\Program Files\nodejs\pnpm.cmd`)

Corepack ist fruher im PATH und gewinnt:

```bash
where pnpm
# C:\Program Files\nodejs\pnpm.cmd      <- Corepack (gewinnt!)
# C:\Users\USER\AppData\Roaming\npm\pnpm.cmd  <- npm global
```

### Losung: packageManager Feld nutzen

Das `packageManager` Feld in `package.json` **pinnt** die Version fur Corepack:

```json
{
  "packageManager": "pnpm@10.33.0"
}
```

Wenn Corepack aktiv ist, liest es dieses Feld und nutzt automatisch die richtige Version:

```bash
# Vor dem packageManager-Update
pnpm --version
# 10.28.2

# package.json andern: "packageManager": "pnpm@10.33.0"

# Danach
pnpm --version
# 10.33.0  <- Korrekt!
```

### Diagnose-Befehle

```bash
# Welche pnpm-Installationen gibt es?
where pnpm              # Windows
which -a pnpm           # Mac/Linux

# Ist Corepack aktiv?
corepack --version

# Welche Version nutzt das Projekt?
cat package.json | grep packageManager
```

---

## Problem 2: pnpm-Version aktualisieren (Corepack-Umgebung)

### Das naive Vorgehen (funktioniert NICHT)

```bash
npm install -g pnpm@latest
pnpm --version
# Zeigt immer noch alte Version!
```

### Der richtige Weg

**Option A: packageManager Feld aktualisieren (EMPFOHLEN)**

```json
{
  "packageManager": "pnpm@10.33.0"
}
```

Corepack ladt die neue Version automatisch beim nachsten pnpm-Befehl.

**Option B: Corepack direkt nutzen**

```bash
corepack prepare pnpm@10.33.0 --activate
```

**Option C: Corepack deaktivieren und npm global nutzen**

```bash
corepack disable
npm install -g pnpm@latest
```

---

## Problem 3: pnpm install Warnings (Build-Scripts)

### Symptom

Nach `pnpm install` erscheinen Warnings uber Build-Scripts:

```
Building packages... (esbuild, @electron/remote, etc.)
WARN: Packages require build approval
```

### Erklarung

pnpm blockiert standardmassig **postinstall** Scripts aus Sicherheitsgrunden.
Das betrifft Packages die native Binaries bauen (esbuild, electron, etc.).

### Losung

```bash
pnpm approve-builds
# Fragt interaktiv welche Packages bauen durfen

# Oder direkt genehmigen:
pnpm install --ignore-scripts=false
```

---

## Problem 4: Git Worktree + pnpm - node_modules blockiert Loschung

### Symptom

```bash
git worktree remove ../notedrill-wt-test
# error: 'notedrill-wt-test' contains modified or untracked files
```

### Ursache

`node_modules` enthalt tausende Dateien die nicht in Git sind.

### Losung

```bash
# Option A: Force Remove (Referenz loschen)
git worktree remove ../notedrill-wt-test --force

# Falls der Ordner noch da ist, manuell loschen:
rm -rf ../notedrill-wt-test

# Aufraumen
git worktree prune
```

---

## Problem 5: Nach Migration - npm wird trotzdem genutzt

### Symptom

Ein Teammitglied tippt `npm install` aus Gewohnheit.

### Absicherung (PFLICHT)

In `package.json`:

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

**Resultat wenn jemand `npm install` tippt:**

```
╔═══════════════════════════════════════════════════╗
║  Use "pnpm install" for installation in this      ║
║  project.                                         ║
╚═══════════════════════════════════════════════════╝

npm ERR! code 1
```

Die Installation wird abgebrochen!

---

## Problem 6: pnpm-lock.yaml Konflikte nach Merge

### Symptom

Nach einem Git-Merge zeigt `pnpm-lock.yaml` Konflikte.

### Losung

Lock-Dateien niemals manuell mergen!

```bash
# Lock-Datei verwerfen und neu generieren
git checkout --ours pnpm-lock.yaml   # Oder --theirs
pnpm install

# Commit
git add pnpm-lock.yaml
git commit -m "fix: regenerate pnpm-lock.yaml after merge"
```

---

## Versions-Upgrade Checklist

Wenn du pnpm von Version X auf Y upgraden willst:

```
[ ] 1. Changelog lesen: https://github.com/pnpm/pnpm/releases
[ ] 2. package.json aktualisieren: "packageManager": "pnpm@Y.Z.W"
[ ] 3. pnpm --version prufen (sollte neue Version zeigen)
[ ] 4. pnpm install ausfuhren
[ ] 5. pnpm dev testen
[ ] 6. pnpm build testen
[ ] 7. Committen: "chore: upgrade pnpm to vY.Z.W"
```

---

## Schnell-Diagnose: Welche pnpm-Version wird genutzt?

```bash
# 1. System-Version
pnpm --version

# 2. Projekt-Pin (packageManager)
cat package.json | grep packageManager

# 3. Alle pnpm-Installationen
where pnpm              # Windows
which -a pnpm           # Mac/Linux

# 4. Corepack-Status
corepack --version

# 5. npm-global Installationen
npm list -g --depth=0 | grep pnpm
```

---

## Zusammenfassung: Die 3 wichtigsten Learnings

1. **packageManager Feld ist Pflicht** - Sonst nutzt Corepack eine beliebige Version
2. **preinstall Script ist Pflicht** - Sonst nutzt jemand versehentlich npm
3. **Worktrees mit --force loschen** - node_modules blockiert normale Loschung

---

## Siehe auch

- [12-npm-zu-pnpm-migration.md](12-npm-zu-pnpm-migration.md) - Haupt-Dokumentation
- [14-ki-benchmarking-worktrees-vs-branches.md](14-ki-benchmarking-worktrees-vs-branches.md) - Worktrees fur KI-Testing
