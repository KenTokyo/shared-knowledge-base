# Git Alltags-Befehle - Das tägliche Werkzeug

## 🎯 Das 80/20-Prinzip
80% deiner Git-Arbeit wirst du mit diesen **10 Befehlen** erledigen.

---

## 🚀 Die Top 10 Befehle

### 1. `git status` - Wo stehe ich gerade?
**Das wichtigste Kommando überhaupt!**

```bash
git status
```

**Zeigt dir:**
- Welcher Branch bist du?
- Welche Dateien wurden geändert?
- Was ist bereit zum Commit?

**Beispiel-Ausgabe:**
```
On branch main
Changes not staged for commit:
  modified:   src/App.tsx      ← Geändert, aber noch nicht "eingepackt"

Untracked files:
  src/NewFile.tsx              ← Neue Datei, Git kennt sie noch nicht
```

---

### 2. `git add` - Änderungen einpacken
**Welche Änderungen sollen ins nächste "Foto" (Commit)?**

```bash
# Eine bestimmte Datei
git add src/App.tsx

# Mehrere Dateien
git add src/App.tsx src/Button.tsx

# ALLE geänderten Dateien (vorsichtig!)
git add .

# Nur bestimmte Dateiarten
git add *.tsx
```

**Alltagsanalogie:** 📦 Du packst Sachen in deinen Koffer, die du mitnehmen willst.

---

### 3. `git commit` - Speicherpunkt erstellen
**Das "Foto" mit Beschreibung machen.**

```bash
# Mit kurzer Nachricht
git commit -m "Button-Farbe geändert"

# Mit längerer Nachricht (öffnet Editor)
git commit

# Add + Commit in einem (nur für bereits bekannte Dateien!)
git commit -am "Schneller Commit"
```

**Gute Commit-Nachrichten:**
| ❌ Schlecht | ✅ Gut |
|-------------|--------|
| "fix" | "Login-Fehler bei falscher Email behoben" |
| "asdf" | "Neue Filter-Komponente hinzugefügt" |
| "done" | "Performance: Bilder werden jetzt lazy geladen" |

---

### 4. `git push` - Hochladen zu GitHub
**Deine Commits ins Internet bringen.**

```bash
# Standard (zum origin, aktueller Branch)
git push

# Explizit
git push origin main

# Ersten Push eines neuen Branches
git push -u origin feature/neues-feature
#        └── "-u" merkt sich die Verbindung
```

---

### 5. `git pull` - Updates holen
**Neueste Version von GitHub holen.**

```bash
# Standard
git pull

# Von bestimmtem Branch
git pull origin main
```

**⚠️ Tipp:** Immer erst `git pull`, bevor du `git push` machst!

---

### 6. `git branch` - Branches verwalten
**Deine parallelen Versionen sehen und verwalten.**

```bash
# Alle lokalen Branches sehen
git branch

# Alle Branches (auch Remote)
git branch -a

# Neuen Branch erstellen
git branch feature/mein-feature

# Branch löschen
git branch -d feature/alter-branch

# Branch umbenennen
git branch -m alter-name neuer-name
```

---

### 7. `git checkout` / `git switch` - Branch wechseln
**Zu einem anderen Branch springen.**

```bash
# Classic (alt, aber funktioniert)
git checkout feature/mein-feature

# Modern (seit Git 2.23)
git switch feature/mein-feature

# Neuen Branch erstellen UND wechseln
git checkout -b feature/neues-feature
# oder modern:
git switch -c feature/neues-feature
```

---

### 8. `git log` - Geschichte ansehen
**Was wurde wann gemacht?**

```bash
# Standard (ausführlich)
git log

# Kompakt (eine Zeile pro Commit)
git log --oneline

# Die letzten 5 Commits
git log -5

# Schöner Graph
git log --oneline --graph --all

# Von wem wurde was geändert?
git log --author="KenTokyo"
```

**Beispiel `git log --oneline`:**
```
8da14794 asdasd
52332244 yeeyye
fec04580 phase 1 tanstack update
c62afbc7 yeye                      ← Vor TanStack!
8df7ecd9 before fetching update
```

---

### 9. `git diff` - Unterschiede sehen
**Was genau wurde geändert?**

```bash
# Ungespeicherte Änderungen
git diff

# Bereits hinzugefügte Änderungen (staged)
git diff --staged

# Zwischen zwei Commits
git diff c62afbc7 8da14794

# Zwischen zwei Branches
git diff main feature/experiment
```

---

### 10. `git merge` - Branches zusammenführen
**Änderungen von einem Branch in einen anderen bringen.**

```bash
# Erst zum Ziel-Branch wechseln
git checkout main

# Dann den anderen Branch reinmergen
git merge feature/mein-feature
```

---

## 📋 Spickzettel zum Ausdrucken

```
╔═══════════════════════════════════════════════════════════════╗
║                    GIT ALLTAGS-SPICKZETTEL                     ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║  STATUS & INFO                                                 ║
║  ├── git status              Was ist gerade los?               ║
║  ├── git log --oneline       Was wurde gemacht?                ║
║  └── git diff                Was wurde geändert?               ║
║                                                                ║
║  SPEICHERN                                                     ║
║  ├── git add .               Alle Änderungen einpacken         ║
║  ├── git commit -m "..."     Speicherpunkt erstellen           ║
║  └── git push                Hochladen zu GitHub               ║
║                                                                ║
║  HOLEN                                                         ║
║  ├── git pull                Updates von GitHub holen          ║
║  └── git clone <url>         Projekt kopieren                  ║
║                                                                ║
║  BRANCHES                                                      ║
║  ├── git branch              Branches auflisten                ║
║  ├── git switch <name>       Branch wechseln                   ║
║  ├── git switch -c <name>    Neuen Branch erstellen            ║
║  └── git merge <branch>      Branch zusammenführen             ║
║                                                                ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🔄 Der tägliche Workflow

```
Morgens: git pull         ← Neueste Version holen
         │
         ▼
Arbeiten: Dateien ändern  ← Normal programmieren
         │
         ▼
Zwischendurch: git status ← Überblick behalten
         │
         ▼
Fertig: git add .         ← Änderungen einpacken
         │
         ▼
         git commit       ← Speicherpunkt machen
         │
         ▼
Abends: git push          ← Hochladen zu GitHub
```

---

## ⚠️ Häufige Fehler und Lösungen

### "Ich habe versehentlich committed!"
```bash
# Letzten Commit rückgängig (Dateien bleiben)
git reset --soft HEAD~1
```

### "Ich bin im falschen Branch!"
```bash
# Ungespeicherte Änderungen mitnehmen
git stash                    # Verstecken
git switch richtiger-branch  # Wechseln
git stash pop                # Wieder rausholen
```

### "Pull geht nicht wegen lokaler Änderungen"
```bash
git stash          # Änderungen verstecken
git pull           # Updates holen
git stash pop      # Änderungen wieder rausholen
```

### "Merge Conflict!" 😱
Keine Panik! Das bedeutet nur, dass zwei Leute die gleiche Stelle geändert haben.
1. Öffne die Datei
2. Such nach `<<<<<<<` und `>>>>>>>`
3. Entscheide, welche Version du willst
4. Lösche die Markierungen
5. `git add` und `git commit`

---

## 📚 Weiter lesen
- [04-branch-workflow.md](04-branch-workflow.md) - Professionell mit Branches arbeiten
- [05-zusammenarbeit.md](05-zusammenarbeit.md) - Im Team arbeiten
