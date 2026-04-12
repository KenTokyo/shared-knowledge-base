# KI-Benchmarking Prompts

> **Nutze mit:** [14-ki-benchmarking-worktrees-vs-branches.md](14-ki-benchmarking-worktrees-vs-branches.md)

Diese Prompts sind fur **paralleles KI-Testing** in beliebigen Projekten konzipiert. Jede KI arbeitet in einem eigenen Worktree mit eigenem Port.

---

## Begriffe

| Abkurzung | Bedeutung | Beispiel |
|-----------|-----------|----------|
| **wt** | Worktree (isolierter Arbeitsordner) | `projekt-wt-claude` |
| **benchmark** | Branch-Prafix fur Vergleichstests | `benchmark/claude` |
| **BASE_PORT** | Standard-Port des Projekts (aus package.json) | 3000, 4000, 5173 |

---

## Port-System (Projekt-agnostisch)

### Prinzip

```
Claude:   BASE_PORT      (Standard, kein Worktree notig)
Cursor:   BASE_PORT + 1
Copilot:  BASE_PORT + 2
Gemini:   BASE_PORT + 3
GPT:      BASE_PORT + 4
OpenCode: BASE_PORT + 5
GLM:      BASE_PORT + 6
MiniMax:  BASE_PORT + 7
```

### Beispiel: Projekt mit BASE_PORT = 3000

| KI | Worktree | Branch | Port | URL |
|----|----------|--------|------|-----|
| Claude | (Hauptordner) | main | 3000 | localhost:3000 |
| Cursor | projekt-wt-cursor | benchmark/cursor | 3001 | localhost:3001 |
| Copilot | projekt-wt-copilot | benchmark/copilot | 3002 | localhost:3002 |
| Gemini | projekt-wt-gemini | benchmark/gemini | 3003 | localhost:3003 |
| GPT | projekt-wt-gpt | benchmark/gpt | 3004 | localhost:3004 |
| OpenCode | projekt-wt-opencode | benchmark/opencode | 3005 | localhost:3005 |
| GLM | projekt-wt-glm | benchmark/glm | 3006 | localhost:3006 |
| MiniMax | projekt-wt-minimax | benchmark/minimax | 3007 | localhost:3007 |

### Beispiel: Projekt mit BASE_PORT = 5173 (Vite)

| KI | Port |
|----|------|
| Claude | 5173 |
| Cursor | 5174 |
| Copilot | 5175 |
| ... | ... |

### BASE_PORT ermitteln

```bash
# In package.json suchen:
cat package.json | grep -E "port|PORT"

# Typische Defaults:
# Next.js:  3000
# Vite:     5173
# CRA:      3000
# Nuxt:     3000
# Angular:  4200
```

---

## Setup-Block (PFLICHT fur jeden Prompt)

Kopiere diesen Block an den **Anfang jedes Prompts** und ersetze die Variablen:

```
=== WORKTREE-SETUP ===

PROJEKT: [PROJEKT_NAME]
DU BIST: [Claude/Cursor/Copilot/Gemini/GPT/OpenCode/GLM/MiniMax]
BASE_PORT: [z.B. 3000]

WORKTREE: ../[PROJEKT_NAME]-wt-[ki-name]
BRANCH: benchmark/[ki-name]
DEIN PORT: [BASE_PORT + OFFSET]

SETUP (falls Worktree nicht existiert):
1. git worktree add ../[PROJEKT_NAME]-wt-[ki-name] -b benchmark/[ki-name]
2. cd ../[PROJEKT_NAME]-wt-[ki-name]
3. pnpm install
4. pnpm dev --port [DEIN_PORT]

LIVE-URL: http://localhost:[DEIN_PORT]

=== AUFGABE BEGINNT ===
```

### Variablen-Tabelle

| Variable | Beschreibung | Beispiel |
|----------|--------------|----------|
| `PROJEKT_NAME` | Ordnername des Projekts | `notedrill`, `mein-shop` |
| `ki-name` | Kleingeschrieben | `claude`, `cursor`, `glm` |
| `BASE_PORT` | Aus package.json oder Framework-Default | `3000` |
| `OFFSET` | Siehe Port-System oben | Claude=0, Cursor=1, ... |

---

## Kategorie 1: Migrationen

### Prompt 1: npm zu pnpm Migration

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME]
DU BIST: [KI_NAME]
BASE_PORT: [z.B. 3000]
DEIN PORT: [BASE_PORT + OFFSET]

WORKTREE: ../[PROJEKT_NAME]-wt-[ki-name]
BRANCH: benchmark/[ki-name]

SETUP:
1. git worktree add ../[PROJEKT_NAME]-wt-[ki-name] -b benchmark/[ki-name]
2. cd ../[PROJEKT_NAME]-wt-[ki-name]
3. (npm install NICHT ausfuhren - das ist Teil der Aufgabe)

=== AUFGABE ===

MIGRATION: npm zu pnpm

Schritte:
1. pnpm installieren (global): npm install -g pnpm@latest
2. Lock-Datei konvertieren: pnpm import
3. node_modules loschen: rm -rf node_modules
4. Neu installieren: pnpm install
5. package.json anpassen:
   - "packageManager": "pnpm@[NEUESTE_VERSION]"
   - "preinstall": "npx only-allow pnpm"
6. package-lock.json loschen
7. Testen: pnpm dev --port [DEIN_PORT]

ERFOLGSKRITERIEN:
- pnpm dev startet ohne Fehler
- npm install wird blockiert (preinstall-Script)
- Keine package-lock.json mehr

NACH ABSCHLUSS:
- Committe alle Anderungen
- Gib mir deinen Port zuruck: http://localhost:[DEIN_PORT]
```

### Prompt 2: JavaScript zu TypeScript Migration

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]
WORKTREE: ../[PROJEKT_NAME]-wt-[ki-name] | BRANCH: benchmark/[ki-name]

=== AUFGABE ===

MIGRATION: Konvertiere [DATEINAME].js zu TypeScript

Schritte:
1. Datei umbenennen: .js -> .tsx
2. TypeScript-Typen hinzufugen (KEINE any!)
3. Props-Interface definieren
4. Return-Types hinzufugen
5. type-check ausfuhren: pnpm type-check

ERFOLGSKRITERIEN:
- Keine TypeScript-Fehler
- Keine any-Types
- Funktionalitat unverandert

LIVE-URL: http://localhost:[DEIN_PORT]
```

### Prompt 3: CSS zu Tailwind Migration

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]
WORKTREE: ../[PROJEKT_NAME]-wt-[ki-name] | BRANCH: benchmark/[ki-name]

=== AUFGABE ===

MIGRATION: Konvertiere CSS-Styles zu Tailwind

Zieldatei: [KOMPONENTE].tsx

Schritte:
1. Identifiziere alle CSS-Klassen/Inline-Styles
2. Ersetze durch aquivalente Tailwind-Klassen
3. Entferne ungenutzte CSS-Dateien
4. Prufe responsive Breakpoints

ERFOLGSKRITERIEN:
- Visuell identisch
- Keine separaten CSS-Dateien mehr
- Konsistente Tailwind-Patterns

LIVE-URL: http://localhost:[DEIN_PORT]
```

---

## Kategorie 2: UI-Verbesserungen

### Prompt 4: Komponenten-Redesign

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]
WORKTREE: ../[PROJEKT_NAME]-wt-[ki-name] | BRANCH: benchmark/[ki-name]

=== AUFGABE ===

REDESIGN: [KOMPONENTE]

Aktuelle Probleme:
- [PROBLEM 1]
- [PROBLEM 2]

Anforderungen:
- Design-System nutzen: components/design-system/
- Dark-Mode kompatibel
- Mobile-First (responsive)
- Accessibility (Fokus-States, Labels)

NICHT ANDERN:
- Funktionalitat/Logik
- API/Props-Interface

ERFOLGSKRITERIEN:
- Visuell ansprechender
- Alle Design-System-Tokens genutzt
- Keine harten Farbwerte (nur CSS-Variablen)

LIVE-URL: http://localhost:[DEIN_PORT]
```

### Prompt 5: Dark Mode Fix

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

DARK MODE FIX

Zielbereich: [PFAD/KOMPONENTE]

Typische Probleme finden und fixen:
1. Harte Farbwerte (white, black, #fff)
2. Fehlende dark: Variants
3. Inkonsistente Kontraste
4. Fehlende border-Farben

Erlaubte Tokens:
- bg-background, bg-card, bg-popover
- text-foreground, text-muted-foreground
- border, border-muted

LIVE-URL: http://localhost:[DEIN_PORT]
```

### Prompt 6: Mobile Responsiveness

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

MOBILE OPTIMIZATION

Zielkomponente: [PFAD]

Prufen und fixen:
1. Layout auf 375px Breite (iPhone SE)
2. Touch-Targets mindestens 44x44px
3. Kein horizontales Scrollen
4. Text lesbar ohne Zoom (min 16px)
5. Abstande mit clamp() fur Fluid-Scaling

Tailwind-Breakpoints nutzen:
- sm: 640px
- md: 768px
- lg: 1024px

LIVE-URL: http://localhost:[DEIN_PORT]
Teste in DevTools mit Mobile-Emulation!
```

### Prompt 7: Accessibility (a11y) Audit

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

ACCESSIBILITY AUDIT

Zielbereich: [PFAD]

Checklist:
1. Alle interaktiven Elemente per Tab erreichbar?
2. Focus-States sichtbar?
3. aria-labels fur Icon-Buttons?
4. Farbkontrast WCAG AA (4.5:1)?
5. Bilder haben alt-Text?
6. Formulare haben Labels?

Tools nutzen:
- Browser DevTools > Accessibility
- Lighthouse Audit

Fixes implementieren, nicht nur berichten!

LIVE-URL: http://localhost:[DEIN_PORT]
```

---

## Kategorie 3: Performance

### Prompt 8: Bundle Size Optimierung

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

BUNDLE SIZE OPTIMIZATION

Schritte:
1. Bundle analysieren: pnpm build && pnpm analyze
2. Grostes Package identifizieren
3. Optimieren durch:
   - Dynamic imports (lazy loading)
   - Tree-shaking verbessern
   - Kleinere Alternativen (z.B. date-fns statt moment)

Ziel: Bundle um mindestens 10% verkleinern

MESSEN:
- Vorher: [KB]
- Nachher: [KB]

LIVE-URL: http://localhost:[DEIN_PORT]
```

### Prompt 9: React Performance

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

REACT PERFORMANCE: [KOMPONENTE]

Probleme suchen und fixen:
1. Unnotige Re-Renders (React DevTools Profiler)
2. Fehlende useMemo/useCallback
3. Props-Drilling (Context nutzen?)
4. Schwere Berechnungen in Render

NICHT UBERTREIBEN:
- Nur optimieren wo messbar langsam
- Keine vorzeitige Optimierung

MESSEN:
- Render-Zeit vorher: [ms]
- Render-Zeit nachher: [ms]

LIVE-URL: http://localhost:[DEIN_PORT]
```

### Prompt 10: Loading States & Suspense

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

LOADING STATES implementieren

Zielbereich: [PFAD]

Anforderungen:
1. Skeleton-Loader fur Daten-Komponenten
2. Suspense-Boundaries fur lazy-loaded Components
3. Error-Boundaries fur Fehlerfall
4. Graceful degradation

Pattern:
- Skeleton wahrend Laden
- Fade-In nach Laden (kein Flash)
- Retry-Button bei Fehler

LIVE-URL: http://localhost:[DEIN_PORT]
```

---

## Kategorie 4: Code-Qualitat

### Prompt 11: Refactoring (Lesbarkeit)

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

REFACTORING: [DATEI]

Fokus: Lesbarkeit verbessern

Erlaubt:
- Variablen umbenennen
- Funktionen extrahieren
- Magic Numbers durch Konstanten ersetzen
- Komplexe Conditions vereinfachen

VERBOTEN:
- Funktionalitat andern
- Neue Features hinzufugen
- Dependencies hinzufugen

ERFOLGSKRITERIEN:
- Gleiche Tests bestehen
- Code ist selbsterklarend
- Keine Kommentare fur offensichtliches

LIVE-URL: http://localhost:[DEIN_PORT]
```

### Prompt 12: Code-Cleanup (Dead Code)

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

DEAD CODE CLEANUP

Bereich: [PFAD oder ganzes Projekt]

Finden und entfernen:
1. Ungenutzte Imports
2. Ungenutzte Variablen/Funktionen
3. Auskommentierter Code
4. TODO-Kommentare die erledigt sind
5. Leere Dateien

Tools:
- TypeScript: Strikte Checks aktivieren
- ESLint: no-unused-vars

VORSICHT:
- Dynamisch genutzte Exports prufen!
- Nicht API-Endpunkte loschen

LIVE-URL: http://localhost:[DEIN_PORT]
```

### Prompt 13: Test Coverage erhohen

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

TEST COVERAGE: [KOMPONENTE/MODUL]

Aktuelle Coverage: [X]%
Ziel: [Y]%

Schreibe Tests fur:
1. Happy Path
2. Edge Cases
3. Error States
4. Async Behavior

Test-Framework: [vitest/jest]
Testing Library: @testing-library/react

ERFOLGSKRITERIEN:
- Alle Tests grun
- Coverage-Ziel erreicht
- Keine flaky Tests

LIVE-URL: http://localhost:[DEIN_PORT]
```

---

## Kategorie 5: Spezial-Aufgaben

### Prompt 14: API-Endpunkt implementieren

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

API ENDPOINT: [METHOD] /api/[ROUTE]

Spezifikation:
- Input: [SCHEMA]
- Output: [SCHEMA]
- Auth: [ja/nein]
- Rate-Limit: [ja/nein]

Implementieren:
1. Route Handler erstellen
2. Input-Validierung (zod)
3. Business Logic
4. Error Handling
5. Response-Types

Testen mit:
- curl oder Postman
- pnpm test

LIVE-URL: http://localhost:[DEIN_PORT]/api/[ROUTE]
```

### Prompt 15: Neue Komponente nach Design

```
=== WORKTREE-SETUP ===
PROJEKT: [PROJEKT_NAME] | DU BIST: [KI_NAME] | PORT: [BASE_PORT + OFFSET]

=== AUFGABE ===

NEUE KOMPONENTE: [NAME]

Design-Referenz: [LINK/SCREENSHOT]

Anforderungen:
1. Design-System nutzen (components/design-system/)
2. Props-Interface mit TypeScript
3. Responsive (Mobile-First)
4. Dark-Mode kompatibel
5. Storybook-Story (optional)

Platzierung: components/[BEREICH]/[NAME].tsx

ERFOLGSKRITERIEN:
- Pixel-genau zum Design
- Alle Props dokumentiert
- Keine harten Farbwerte

LIVE-URL: http://localhost:[DEIN_PORT]
Navigiere zu: [ROUTE WO KOMPONENTE SICHTBAR]
```

---

## Quick-Start: 8 KIs parallel starten

> Ersetze `PROJEKT` mit deinem Projektnamen und `BASE` mit dem Standard-Port.

### 1. Worktrees erstellen

```bash
# Im Projekt-Ordner
cd PROJEKT

# Worktrees fur alle KIs (Claude bleibt im Hauptordner)
git worktree add ../PROJEKT-wt-cursor   -b benchmark/cursor
git worktree add ../PROJEKT-wt-copilot  -b benchmark/copilot
git worktree add ../PROJEKT-wt-gemini   -b benchmark/gemini
git worktree add ../PROJEKT-wt-gpt      -b benchmark/gpt
git worktree add ../PROJEKT-wt-opencode -b benchmark/opencode
git worktree add ../PROJEKT-wt-glm      -b benchmark/glm
git worktree add ../PROJEKT-wt-minimax  -b benchmark/minimax
```

### 2. Dependencies installieren

```bash
for d in ../PROJEKT-wt-*; do (cd "$d" && pnpm install); done
```

### 3. Dev-Server starten

```bash
# Claude: Hauptordner, Standard-Port (z.B. 3000)
pnpm dev

# Andere KIs: Worktree + Offset-Port
cd ../PROJEKT-wt-cursor  && pnpm dev --port $((BASE+1))  # 3001
cd ../PROJEKT-wt-copilot && pnpm dev --port $((BASE+2))  # 3002
cd ../PROJEKT-wt-gemini  && pnpm dev --port $((BASE+3))  # 3003
cd ../PROJEKT-wt-gpt     && pnpm dev --port $((BASE+4))  # 3004
cd ../PROJEKT-wt-opencode && pnpm dev --port $((BASE+5)) # 3005
cd ../PROJEKT-wt-glm     && pnpm dev --port $((BASE+6))  # 3006
cd ../PROJEKT-wt-minimax && pnpm dev --port $((BASE+7))  # 3007
```

### 4. Prompts an KIs verteilen

Kopiere den gewunschten Prompt, ersetze:
- `[PROJEKT_NAME]` → dein Projektname
- `[KI_NAME]` → z.B. `Cursor`
- `[BASE_PORT + OFFSET]` → z.B. `3001`

### 5. Vergleichen

```
Browser-Tabs offnen (Beispiel BASE=3000):

localhost:3000  → Claude (Hauptordner)
localhost:3001  → Cursor
localhost:3002  → Copilot
localhost:3003  → Gemini
localhost:3004  → GPT
localhost:3005  → OpenCode
localhost:3006  → GLM
localhost:3007  → MiniMax
```

---

## Auswertungs-Template

Nach dem Benchmark, dokumentiere:

```markdown
# Benchmark-Auswertung: [AUFGABE]

Datum: [DATUM]
Dauer: [MIN]
Projekt: [PROJEKT_NAME]
BASE_PORT: [PORT]

## Ergebnisse

| KI | Port | Fertig? | Qualitat (1-5) | Fehler | Commits | Besonderheiten |
|----|------|---------|----------------|--------|---------|----------------|
| Claude | BASE | | | | | |
| Cursor | +1 | | | | | |
| Copilot | +2 | | | | | |
| Gemini | +3 | | | | | |
| GPT | +4 | | | | | |
| OpenCode | +5 | | | | | |
| GLM | +6 | | | | | |
| MiniMax | +7 | | | | | |

## Code-Vergleich

git diff main..benchmark/cursor --stat
git diff main..benchmark/copilot --stat
git diff main..benchmark/gemini --stat
...

## Gewinner

[KI] weil [GRUND]

## Learnings

- ...
```

---

## Cleanup nach Benchmark

```bash
# Alle Worktrees entfernen (ersetze PROJEKT mit deinem Projektnamen)
for d in ../PROJEKT-wt-*; do git worktree remove "$d" --force; done
git worktree prune

# Branches loschen (oder Gewinner mergen)
git branch | grep "benchmark/" | xargs git branch -D

# Oder nur bestimmte KI loschen:
git worktree remove ../PROJEKT-wt-cursor --force
git branch -D benchmark/cursor
```

---

## Siehe auch

- [14-ki-benchmarking-worktrees-vs-branches.md](14-ki-benchmarking-worktrees-vs-branches.md) - Warum Worktrees
- [12-npm-zu-pnpm-migration.md](12-npm-zu-pnpm-migration.md) - pnpm Migration
- [12a-pnpm-migration-praxis-learnings.md](12a-pnpm-migration-praxis-learnings.md) - Praxis-Fehler
