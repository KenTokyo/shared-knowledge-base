# Größere Änderungen & Worktrees - Parallel mit KI arbeiten

## 🎯 Wann brauche ich das?

Manchmal hast du **richtig große Änderungen** vor:
- Framework-Update (z.B. TanStack, React 19)
- Komplette Übersetzung der App
- Neue Architektur ausprobieren
- Breaking Changes, die alles betreffen

**Problem:** Während die KI stundenlang daran arbeitet, kannst du nicht normal weiterarbeiten - dein Code ist "blockiert".

**Lösung:** **Worktrees** - du arbeitest in deinem normalen Branch, die KI arbeitet parallel in ihrem eigenen Branch, komplett isoliert.

---

## 🌳 Was ist ein Worktree?

Ein Worktree ist wie **ein zweiter Arbeitsordner für das gleiche Git-Repo**.

```
Normaler Branch (main)           Worktree Branch (feature/tanstack-update)
      │                                      │
      ▼                                      ▼
C:\Projekte\notedrill\           C:\Projekte\notedrill-worktree-tanstack\
      │                                      │
      │  Du arbeitest hier                   │  KI arbeitet hier
      │  normal weiter                       │  am großen Update
      ▼                                      ▼
[VS Code Fenster 1]              [VS Code Fenster 2 / Claude Code]
```

**Alltagsanalogie:** 📋 Du hast zwei Kopien deines Schulhefts - in einer schreibst du die Hausaufgaben, in der anderen überarbeitet jemand den kompletten Aufbau. Am Ende führt ihr alles zusammen.

---

## 🤖 Was sage ich der KI?

### Option 1: KI soll selbst den Worktree erstellen

```
"Erstelle einen Worktree für das TanStack-Update und arbeite dort.
Der Branch soll 'feature/tanstack-update' heißen.
Ich will parallel in main weiterarbeiten können."
```

Die KI wird dann folgende Schritte machen:
1. Neuen Branch erstellen
2. Worktree anlegen
3. Dort arbeiten (ohne deinen main zu stören)

### Option 2: Du erstellst manuell, KI arbeitet dort

```
"Ich habe einen Worktree unter C:\Projekte\notedrill-worktree-tanstack erstellt.
Wechsle dorthin und führe das TanStack-Update durch.
Branch: feature/tanstack-update"
```

### Option 3: Claude Code Agent mit `isolation: "worktree"`

In Claude Code gibt es das Agent-Tool mit eingebauter Worktree-Isolation:

```
"Starte einen Agent mit isolation: worktree für das komplette i18n-Update.
Der Agent soll alle Texte ins Deutsche übersetzen."
```

Der Agent arbeitet dann in einem temporären, isolierten Worktree.

---

## 🛠️ Manuell einen Worktree erstellen

### Schritt 1: Branch erstellen (falls noch nicht vorhanden)

```bash
# Vom aktuellen Stand einen neuen Branch erstellen
 
```

### Schritt 2: Worktree erstellen

```bash
# Worktree in neuem Ordner erstellen
git worktree add ../notedrill-worktree-update feature/grosses-update
#                 │                            │
#                 │                            └── Welcher Branch?
#                 └── Wo soll der Ordner sein?
```

**Ergebnis:**
```
C:\Projekte\
├── notedrill\                      ← Dein normaler Ordner (main)
└── notedrill-worktree-update\      ← Neuer Ordner (feature/grosses-update)
```

### Schritt 3: Im Worktree arbeiten

```bash
# Zum Worktree-Ordner navigieren
cd ../notedrill-worktree-update

# Jetzt bist du auf dem neuen Branch
git branch
# * feature/grosses-update
```

### Schritt 4: VS Code öffnen (parallel arbeiten)

```bash
# Neues VS Code Fenster für den Worktree
code ../notedrill-worktree-update
```

**Jetzt hast du zwei VS Code Fenster:**
- Fenster 1: `notedrill` → main Branch (du arbeitest hier)
- Fenster 2: `notedrill-worktree-update` → feature Branch (KI arbeitet hier)

### Schritt 5: Node.js Projekt einrichten (WICHTIG!)

**Worktrees teilen NICHT die `node_modules`!** Jeder Worktree hat seinen eigenen Ordner.

```
notedrill/
├── .git/                    ← Wird geteilt (zentrale Git-Datenbank)
├── node_modules/            ← NICHT geteilt (900MB nur für diesen Ordner)
├── package.json
└── ...

notedrill-worktree-update/
├── .git -> ../notedrill/.git   ← Zeigt auf Hauptrepo
├── node_modules/            ← EIGENE node_modules (anfangs LEER!)
├── package.json             ← Kopie aus dem Branch
└── ...
```

**Also musst du im Worktree einmal installieren:**

```bash
cd ../notedrill-worktree-update

# Dependencies installieren (dauert etwas)
npm install

# Jetzt kannst du testen
npm run dev
```

**Tipp:** Das `npm install` dauert zwar, aber danach läuft alles unabhängig. Du kannst in beiden Ordnern gleichzeitig `npm run dev` laufen lassen - auf verschiedenen Ports!

```bash
# Terminal 1 (Hauptordner)
cd C:\Projekte\notedrill
npm run dev                  # Läuft auf Port 3000

# Terminal 2 (Worktree)
cd C:\Projekte\notedrill-worktree-update
npm run dev -- --port 3001   # Läuft auf Port 3001
```

---

## 💡 Pro-Tipp: pnpm statt npm bei Worktrees

### Das Speicher-Problem

Mit npm hast du **~1 GB pro Worktree** an `node_modules`:

```
notedrill/node_modules/           ~1 GB
notedrill-wt-tanstack/node_modules/  ~1 GB  (fast identisch!)
notedrill-wt-i18n/node_modules/      ~1 GB  (wieder identisch!)
────────────────────────────────────────────
Total:                               ~3 GB  (90% doppelt!)
```

### Die Lösung: pnpm

Mit **pnpm** werden Packages nur einmal global gespeichert:

```
~/.pnpm-store/                       ~1 GB  (einmalig, global)
notedrill/node_modules/              ~50 MB (nur Symlinks!)
notedrill-wt-tanstack/node_modules/  ~50 MB (Symlinks zum Store)
notedrill-wt-i18n/node_modules/      ~50 MB (Symlinks zum Store)
────────────────────────────────────────────
Total:                               ~1.15 GB statt 3 GB!
```

### Schnell-Migration

```bash
# pnpm installieren
npm install -g pnpm

# Im Projekt: Lock-Datei konvertieren
pnpm import

# node_modules neu aufbauen
rm -rf node_modules
pnpm install

# Alte Lock-Datei löschen
rm package-lock.json
```

**Empfehlung:** Wenn du öfter mit Worktrees arbeitest, lohnt sich der Umstieg auf pnpm!

👉 **Ausführlicher Guide:** [12-npm-zu-pnpm-migration.md](12-npm-zu-pnpm-migration.md)

---

## 📋 Kompletter Workflow: Großes Update mit KI

### 1. Vorbereitung (du machst das)

```bash
# Im Hauptordner
cd C:\Projekte\notedrill

# Aktuellen Stand sichern
git status
git add .
git commit -m "Stand vor großem Update"
git push

# Branch und Worktree erstellen
git branch feature/tanstack-update
git worktree add ../notedrill-worktree-tanstack feature/tanstack-update

# Dependencies im Worktree installieren
cd ../notedrill-worktree-tanstack
npm install

# Zurück zum Hauptordner
cd ../notedrill
```

### 2. KI beauftragen

```
"Wechsle zum Worktree unter C:\Projekte\notedrill-worktree-tanstack.
Du bist dort auf dem Branch 'feature/tanstack-update'.

Aufgabe: Führe das komplette TanStack Query Update durch.
- Ersetze alle SWR-Aufrufe durch TanStack Query
- Update die Dependencies
- Teste, dass alles funktioniert

Ich arbeite parallel in main weiter. Wenn du fertig bist, sag Bescheid."
```

### 3. Parallel arbeiten

Während die KI im Worktree arbeitet:

```bash
# Du bleibst in deinem normalen Ordner
cd C:\Projekte\notedrill

# Normaler Workflow - kein Konflikt!
git status
git add .
git commit -m "Neues Feature"
git push
```

### 4. Nach Fertigstellung: Merge

Wenn die KI fertig ist:

```bash
# In den Worktree wechseln und pushen
cd ../notedrill-worktree-tanstack
git status
git add .
git commit -m "TanStack Query Update komplett"
git push -u origin feature/tanstack-update

# Zurück zum Hauptordner
cd ../notedrill

# Branch mergen (oder Pull Request auf GitHub)
git checkout main
git pull
git merge feature/tanstack-update

# Worktree entfernen (optional, wenn nicht mehr gebraucht)
git worktree remove ../notedrill-worktree-tanstack
```

---

## 🔧 Worktree-Befehle Übersicht

| Befehl | Was passiert? |
|--------|--------------|
| `git worktree list` | Zeigt alle Worktrees |
| `git worktree add <pfad> <branch>` | Erstellt neuen Worktree |
| `git worktree remove <pfad>` | Entfernt Worktree (Branch bleibt!) |
| `git worktree prune` | Räumt gelöschte Worktrees auf |

### Beispiele:

```bash
# Alle Worktrees anzeigen
git worktree list
# /c/Projekte/notedrill                    8da14794 [main]
# /c/Projekte/notedrill-worktree-tanstack  a3b2c1d0 [feature/tanstack-update]

# Worktree entfernen (nach Merge)
git worktree remove ../notedrill-worktree-tanstack

# Oder Ordner manuell löschen, dann aufräumen
rm -rf ../notedrill-worktree-tanstack
git worktree prune
```

---

## 🎬 Typische Szenarien

### Szenario 1: Framework-Update

```bash
# Worktree erstellen
git branch feature/react-19-update
git worktree add ../notedrill-react19 feature/react-19-update

# KI beauftragen
"Arbeite in C:\Projekte\notedrill-react19 und update alles auf React 19."
```

### Szenario 2: Komplette Übersetzung

```bash
# Worktree erstellen
git branch feature/i18n-german
git worktree add ../notedrill-i18n feature/i18n-german

# KI beauftragen
"Arbeite in C:\Projekte\notedrill-i18n und übersetze alle UI-Texte ins Deutsche."
```

### Szenario 3: Experimentelle Architektur

```bash
# Worktree erstellen
git branch experiment/neue-architektur
git worktree add ../notedrill-experiment experiment/neue-architektur

# KI beauftragen
"Arbeite in C:\Projekte\notedrill-experiment und teste die neue Ordnerstruktur.
Wenn es nicht funktioniert, können wir den Branch einfach löschen."
```

---

## ⚠️ Wichtige Regeln

### 1. Ein Branch = Ein Worktree
Du kannst nicht zwei Worktrees auf dem gleichen Branch haben.

```bash
# Das geht NICHT:
git worktree add ../ordner1 main
git worktree add ../ordner2 main  # Fehler!
```

### 2. Worktree hat eigene Stage
Änderungen im Worktree sind komplett isoliert. Was du dort `git add` machst, betrifft nicht deinen Hauptordner.

### 3. Pushen nicht vergessen!
Änderungen im Worktree existieren nur lokal, bis du pushst.

```bash
cd ../notedrill-worktree-tanstack
git push -u origin feature/tanstack-update
```

### 4. Nach Merge: Aufräumen

```bash
# Worktree entfernen
git worktree remove ../notedrill-worktree-tanstack

# Branch löschen (wenn fertig)
git branch -d feature/tanstack-update
```

---

## 💡 Pro-Tipps

### Tipp 1: Worktree-Ordner neben dem Hauptordner

```
C:\Projekte\
├── notedrill\                  ← Hauptordner
├── notedrill-wt-tanstack\      ← Worktree 1
└── notedrill-wt-i18n\          ← Worktree 2
```

Präfix `wt-` macht klar: "Das ist ein Worktree."

### Tipp 2: VS Code Workspaces nutzen

Du kannst einen VS Code Workspace mit beiden Ordnern erstellen:
1. File → Add Folder to Workspace
2. Beide Ordner hinzufügen
3. Speichern als `.code-workspace`

### Tipp 3: Terminal im richtigen Ordner

Achte immer darauf, in welchem Ordner dein Terminal ist!

```bash
pwd  # Zeigt aktuellen Pfad
# /c/Projekte/notedrill              ← Hauptordner
# /c/Projekte/notedrill-wt-tanstack  ← Worktree
```

---

## 📊 Entscheidungshilfe: Branch vs Worktree

```
┌─────────────────────────────────────────────────────────────────┐
│  BRAUCHE ICH EINEN WORKTREE?                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Kleine Änderung (1-2 Dateien)?                                 │
│  └── NEIN, normaler Branch reicht                               │
│                                                                 │
│  Willst du parallel weiterarbeiten?                             │
│  └── JA → Worktree!                                             │
│                                                                 │
│  Dauert die Arbeit länger als eine Session?                     │
│  └── JA → Worktree sinnvoll                                     │
│                                                                 │
│  KI soll großes Update machen, du willst nicht warten?          │
│  └── JA → Worktree!                                             │
│                                                                 │
│  Einfaches Feature-Branch Workflow?                             │
│  └── NEIN, normaler Branch + switch reicht                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📚 Weiter lesen
- [04-branch-workflow.md](04-branch-workflow.md) - Branch Grundlagen
- [05-zusammenarbeit.md](05-zusammenarbeit.md) - Pull Requests & Merge
- [11-top-befehle-zusammenfassung.md](11-top-befehle-zusammenfassung.md) - Alle Befehle auf einen Blick
