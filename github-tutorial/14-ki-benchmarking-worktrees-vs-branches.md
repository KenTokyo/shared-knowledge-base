# KI-Benchmarking: Worktrees vs Branches

## Worum geht es?

Du willst **mehrere KIs parallel** am selben Feature arbeiten lassen und die Ergebnisse vergleichen. Zum Beispiel:
- 5 verschiedene LLMs machen dasselbe UI-Refactoring
- Du vergleichst Claude Code vs Cursor vs Copilot
- Du testest verschiedene Prompts an derselben Aufgabe

**Problem:** Wie organisierst du das, damit jede KI ihren eigenen isolierten Arbeitsbereich hat UND du die Ergebnisse live im Browser vergleichen kannst?

---

## TL;DR: Worktrees sind besser

| Kriterium | Branches allein | Worktrees |
|-----------|-----------------|-----------|
| Parallele Dev-Server | Nein (nur einer) | Ja (pro Worktree ein Server) |
| KI-Isolation | Nein (teilen node_modules) | Ja (komplett getrennt) |
| Live-Vergleich im Browser | Nein | Ja (verschiedene Ports) |
| Setup-Aufwand | Gering | Mittel (einmalig) |
| Speicherverbrauch | ~1 GB | ~1.5 GB (mit pnpm) |

**Fazit:** Fur KI-Benchmarking brauchst du Worktrees. Branches allein reichen nicht.

---

## Warum Branches allein nicht reichen

### Das Problem

Mit Branches hast du nur **einen Ordner**:

```
notedrill/                 <- Ein Ordner
  ├── .git/
  ├── node_modules/        <- Eine node_modules
  └── src/
```

Wenn du zwischen Branches wechselst (`git switch branch-a`), andern sich die Dateien im **selben Ordner**. Das bedeutet:

1. **Kein paralleler Dev-Server** - Du kannst nur einen `pnpm dev` laufen lassen
2. **Kein Live-Vergleich** - Du musst standig Branches wechseln und den Server neu starten
3. **KIs storen sich gegenseitig** - Wenn KI-A gerade arbeitet und du zu Branch-B wechselst, gibts Chaos

### Pseudo-Losung: Mehrere Klone

Manche versuchen, das Repo mehrfach zu klonen:

```bash
git clone repo notedrill-claude
git clone repo notedrill-cursor
git clone repo notedrill-copilot
```

**Problem:** 
- Jeder Klon ist ein **separates Repo** (kein geteilter Git-Verlauf)
- Mergen ist kompliziert
- ~3 GB pro Klon statt ~150 MB pro Worktree

---

## Worktrees: Die richtige Losung

### Was ist ein Worktree?

Ein Worktree ist ein **zusatzlicher Arbeitsordner** fur dasselbe Git-Repo:

```
notedrill/                      <- Hauptordner (main)
  ├── .git/                     <- Zentrale Git-DB (geteilt!)
  ├── node_modules/
  └── src/

notedrill-wt-claude/            <- Worktree 1 (branch: bench/claude)
  ├── .git -> ../notedrill/.git <- Zeigt auf Hauptrepo
  ├── node_modules/             <- Eigene Dependencies
  └── src/

notedrill-wt-cursor/            <- Worktree 2 (branch: bench/cursor)
  ├── .git -> ../notedrill/.git
  ├── node_modules/
  └── src/
```

**Vorteile:**
- Jeder Worktree ist **isoliert** (eigene Dateien, eigene node_modules)
- Alle teilen die **gleiche Git-Geschichte**
- Mergen ist trivial (`git merge bench/claude`)

---

## Praxis: 5 KIs parallel benchmarken

### Schritt 1: Branches und Worktrees erstellen

```bash
# Im Hauptordner
cd notedrill

# Basis-Branch fur alle erstellen (aktueller Stand)
git branch bench/baseline

# Worktrees fur jede KI erstellen
git worktree add ../notedrill-wt-claude   bench/claude   -b bench/claude
git worktree add ../notedrill-wt-cursor   bench/cursor   -b bench/cursor
git worktree add ../notedrill-wt-copilot  bench/copilot  -b bench/copilot
git worktree add ../notedrill-wt-gemini   bench/gemini   -b bench/gemini
git worktree add ../notedrill-wt-gpt      bench/gpt      -b bench/gpt
```

**Ergebnis:**
```
C:\Projekte\
├── notedrill\                   <- Hauptordner (main)
├── notedrill-wt-claude\         <- Claude Code
├── notedrill-wt-cursor\         <- Cursor
├── notedrill-wt-copilot\        <- Copilot
├── notedrill-wt-gemini\         <- Gemini
└── notedrill-wt-gpt\            <- GPT
```

### Schritt 2: Dependencies installieren

**WICHTIG:** Jeder Worktree braucht eigene `node_modules`!

```bash
# Mit pnpm (EMPFOHLEN - spart 80% Speicher!)
cd ../notedrill-wt-claude  && pnpm install
cd ../notedrill-wt-cursor  && pnpm install
cd ../notedrill-wt-copilot && pnpm install
cd ../notedrill-wt-gemini  && pnpm install
cd ../notedrill-wt-gpt     && pnpm install

# Oder als One-Liner:
for d in notedrill-wt-*; do (cd "$d" && pnpm install); done
```

> **Noch nicht auf pnpm?** Siehe [12-npm-zu-pnpm-migration.md](12-npm-zu-pnpm-migration.md) - es lohnt sich besonders bei Worktrees!

### Schritt 3: Dev-Server auf verschiedenen Ports

Jetzt starten wir 5 Dev-Server parallel:

```bash
# Terminal 1: Claude
cd notedrill-wt-claude
pnpm dev --port 3001

# Terminal 2: Cursor
cd notedrill-wt-cursor
pnpm dev --port 3002

# Terminal 3: Copilot
cd notedrill-wt-copilot
pnpm dev --port 3003

# Terminal 4: Gemini
cd notedrill-wt-gemini
pnpm dev --port 3004

# Terminal 5: GPT
cd notedrill-wt-gpt
pnpm dev --port 3005
```

**Browser-Vergleich:**
- http://localhost:3001 - Claude
- http://localhost:3002 - Cursor
- http://localhost:3003 - Copilot
- http://localhost:3004 - Gemini
- http://localhost:3005 - GPT

---

## Automatisierung: Start-Script

Erstelle `scripts/bench-start.sh` in deinem Hauptordner:

```bash
#!/bin/bash
# KI-Benchmark Dev-Server Starter

WORKTREES=(
  "notedrill-wt-claude:3001"
  "notedrill-wt-cursor:3002"
  "notedrill-wt-copilot:3003"
  "notedrill-wt-gemini:3004"
  "notedrill-wt-gpt:3005"
)

for entry in "${WORKTREES[@]}"; do
  DIR="${entry%%:*}"
  PORT="${entry##*:}"
  
  if [ -d "../$DIR" ]; then
    echo "Starting $DIR on port $PORT..."
    # Startet im Hintergrund
    (cd "../$DIR" && pnpm dev --port "$PORT" &)
  fi
done

echo ""
echo "=== Benchmark Dev-Server gestartet ==="
echo "Claude:  http://localhost:3001"
echo "Cursor:  http://localhost:3002"
echo "Copilot: http://localhost:3003"
echo "Gemini:  http://localhost:3004"
echo "GPT:     http://localhost:3005"
```

**Nutzung:**
```bash
chmod +x scripts/bench-start.sh
./scripts/bench-start.sh
```

---

## Prompt-Snippet fur KI-Agents

Wenn du einer KI sagst, sie soll in einem Worktree arbeiten, nutze dieses Template:

### Prompt fur Claude Code / Cursor / etc.

```
BENCHMARK-SETUP:
- Wechsle zum Worktree: C:\Projekte\notedrill-wt-claude
- Du bist auf Branch: bench/claude
- Der Dev-Server lauft auf Port 3001

AUFGABE:
[Deine Aufgabe hier, z.B.:]
Refactore die Sidebar-Komponente in /components/sidebar/Sidebar.tsx.
Ziel: Bessere Lesbarkeit, moderne React-Patterns, Tailwind-Cleanup.

REGELN:
- Arbeite NUR im genannten Worktree
- Committe deine Anderungen am Ende
- Starte den Dev-Server NICHT neu (lauft bereits)
- Teste visuell im Browser: http://localhost:3001
```

### Prompt mit automatischem Worktree-Setup

Falls die KI den Worktree selbst erstellen soll:

```
BENCHMARK-AUFGABE: UI-Refactoring

SETUP (einmalig):
1. Erstelle Branch: bench/[dein-name]
2. Erstelle Worktree: git worktree add ../notedrill-wt-[dein-name] bench/[dein-name]
3. Installiere Dependencies: cd ../notedrill-wt-[dein-name] && pnpm install
4. Starte Dev-Server: pnpm dev --port 300X (wobei X = eindeutige Nummer)

AUFGABE:
[Deine Aufgabe hier]

NACH ABSCHLUSS:
- git add . && git commit -m "Benchmark: [Beschreibung]"
- Teile mir den Port mit, damit ich das Ergebnis sehen kann
```

---

## Vergleich und Auswertung

### Methode 1: Side-by-Side Browser

Offne alle URLs nebeneinander:

```
┌─────────────────┬─────────────────┬─────────────────┐
│ localhost:3001  │ localhost:3002  │ localhost:3003  │
│    Claude       │    Cursor       │    Copilot      │
├─────────────────┼─────────────────┼─────────────────┤
│ localhost:3004  │ localhost:3005  │                 │
│    Gemini       │      GPT        │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

### Methode 2: Git Diff vergleichen

```bash
# Alle Branches mit Baseline vergleichen
git diff bench/baseline..bench/claude  --stat
git diff bench/baseline..bench/cursor  --stat
git diff bench/baseline..bench/copilot --stat
```

### Methode 3: Commits analysieren

```bash
# Commit-Messages und Dateianderungen
git log bench/claude --oneline -5
git log bench/cursor --oneline -5
```

---

## Cleanup nach dem Benchmark

### Worktrees entfernen

```bash
# Einzeln
git worktree remove ../notedrill-wt-claude

# Alle auf einmal
for d in ../notedrill-wt-*; do git worktree remove "$d"; done

# Aufraumen (falls Ordner manuell geloscht)
git worktree prune
```

### Branches behalten oder loschen

```bash
# Gewinner-Branch mergen
git merge bench/claude

# Verlierer-Branches loschen
git branch -D bench/cursor bench/copilot bench/gemini bench/gpt

# Oder alle bench-Branches loschen
git branch | grep "bench/" | xargs git branch -D
```

---

## Speicherverbrauch: npm vs pnpm

### Mit npm (SCHLECHT)

```
notedrill/node_modules/           ~1.0 GB
notedrill-wt-claude/node_modules/ ~1.0 GB
notedrill-wt-cursor/node_modules/ ~1.0 GB
notedrill-wt-copilot/node_modules/~1.0 GB
notedrill-wt-gemini/node_modules/ ~1.0 GB
notedrill-wt-gpt/node_modules/    ~1.0 GB
─────────────────────────────────────────
Total:                            ~6.0 GB
```

### Mit pnpm (GUT)

```
~/.pnpm-store/                    ~1.0 GB (global, geteilt)
notedrill/node_modules/           ~50 MB  (Symlinks)
notedrill-wt-claude/node_modules/ ~50 MB
notedrill-wt-cursor/node_modules/ ~50 MB
notedrill-wt-copilot/node_modules/~50 MB
notedrill-wt-gemini/node_modules/ ~50 MB
notedrill-wt-gpt/node_modules/    ~50 MB
─────────────────────────────────────────
Total:                            ~1.3 GB (80% weniger!)
```

**Fazit:** Bei KI-Benchmarking mit 5+ Worktrees sparst du ~5 GB mit pnpm!

---

## Haufige Probleme

### Problem: Port ist belegt

```
Error: Port 3001 is already in use
```

**Losung:**
```bash
# Prozess auf Port finden und beenden
npx kill-port 3001
# Oder anderen Port nutzen
pnpm dev --port 3006
```

### Problem: node_modules fehlen

```
Error: Cannot find module 'next'
```

**Losung:**
```bash
cd notedrill-wt-xyz
pnpm install
```

### Problem: Git sagt "branch already checked out"

```
fatal: 'bench/claude' is already checked out at '../notedrill-wt-claude'
```

**Bedeutung:** Du kannst denselben Branch nicht in zwei Worktrees haben.

**Losung:** Anderen Branch-Namen wahlen oder bestehenden Worktree nutzen.

---

## Entscheidungsbaum

```
┌─────────────────────────────────────────────────────────────┐
│  WIE VIELE KIs VERGLEICHEN?                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1 KI (normale Arbeit)?                                     │
│  └── Branch reicht                                          │
│                                                             │
│  2 KIs nacheinander?                                        │
│  └── Branches reichen (wechseln zwischen Tests)             │
│                                                             │
│  2+ KIs PARALLEL mit Live-Vergleich?                        │
│  └── WORKTREES sind Pflicht!                                │
│                                                             │
│  5+ KIs mit wenig Speicher?                                 │
│  └── Worktrees + pnpm (spart 80% Speicher)                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Weiter lesen

- [10-groessere-aenderungen-worktrees.md](10-groessere-aenderungen-worktrees.md) - Worktree-Grundlagen
- [04-branch-workflow.md](04-branch-workflow.md) - Branch-Grundlagen
- [12-npm-zu-pnpm-migration.md](12-npm-zu-pnpm-migration.md) - pnpm Migration (EMPFOHLEN fur Benchmarking!)
