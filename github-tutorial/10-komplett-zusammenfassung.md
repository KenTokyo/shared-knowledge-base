# Git Befehle - Die komplette Zusammenfassung

## 🎯 Für wen ist diese Datei?
**Schnell-Nachschlagewerk** für alle 9 Tutorial-Dateien. Oben die wichtigsten Befehle, unten die Edge Cases. Jeder Befehl kurz erklärt + Referenz zur Detail-Doku.

---

## 📖 Wie du diese Datei benutzt

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   🏆 TOP-BEFEHLE      → 80% deines Alltags                  │
│   ⚡ WORKFLOW-BEFEHLE  → Branches, Teamwork                  │
│   🔧 SPEZIAL-BEFEHLE   → Wann du sie brauchst                │
│   ⚠️ EDGE CASES        → Wenn was schief geht                │
│                                                             │
│   Jeder Befehl hat:                                         │
│   • Kurze Erklärung (1-2 Sätze)                             │
│   • Referenz zur Detail-Doku                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏆 TOP 10 — Die täglich Befehle (80/20-Regel)

### 1. `git status`
**Was:** Zeigt aktuellen Branch, geänderte Dateien, Staging-Status.
**Wann:** Immer! Bevor du was machst, nachdem du was machst.
```bash
git status
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md)

---

### 2. `git add <datei>` / `git add .`
**Was:** Dateien in die Staging Area (Warteschlange) legen.
**Wann:** Bevor du committen willst. `.` = alle Änderungen.
```bash
git add src/App.tsx        # Eine Datei
git add .                  # Alles
git add -p                 # Interaktiv auswählen
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md) · [09-befehl-anatomie.md](09-befehl-anatomie.md)

---

### 3. `git commit -m "Nachricht"`
**Was:** Speicherpunkt erstellen (Foto mit Beschreibung).
**Wann:** Wenn ein logischer Schritt fertig ist.
```bash
git commit -m "Login-Fehler behoben"
git commit --amend         # Letzten Commit ändern
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md)

---

### 4. `git push`
**Was:** Lokale Commits zu GitHub hochladen.
**Wann:** Wenn du deine Arbeit sichern/teilen willst.
```bash
git push                   # Standard
git push -u origin branch  # Erster Push + Verbindung merken
git push origin clean:main # Anderen Branch-Name auf GitHub
git push --force           # Überschreiben (vorsichtig!)
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md) · [09-befehl-anatomie.md](09-befehl-anatomie.md)

---

### 5. `git pull`
**Was:** Neueste Version von GitHub holen + einbauen.
**Wann:** Vor dem Arbeiten, vor dem Pushen.
```bash
git pull                   # Standard
git pull origin main       # Von bestimmtem Branch
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md)

---

### 6. `git clone <url>`
**Was:** Komplettes Repository herunterladen (mit ganzer History).
**Wann:** Erstes Mal an einem Projekt arbeiten.
```bash
git clone https://github.com/user/repo.git
```
📖 **Mehr:** [01-git-grundlagen.md](01-git-grundlagen.md) · [02-begriffe-glossar.md](02-begriffe-glossar.md)

---

### 7. `git log --oneline`
**Was:** Commit-Historie kompakt anzeigen (1 Zeile pro Commit).
**Wann:** Sehen was passiert ist, Commit-Hash finden.
```bash
git log --oneline                  # Kompakt
git log --oneline --graph --all    # Mit Graph aller Branches
git log -5                         # Letzte 5 Commits
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md)

---

### 8. `git branch` / `git switch`
**Was:** Branches auflisten, erstellen, wechseln.
**Wann:** Parallel arbeiten, Features isolieren.
```bash
git branch                         # Alle lokalen Branches
git branch -a                      # Alle Branches (auch Remote)
git switch feature/xyz             # Branch wechseln
git switch -c feature/neu          # Neuen Branch erstellen + wechseln
git branch -d feature/fertig       # Branch löschen (gemerged)
git branch -D feature/abbrechen    # Branch löschen (erzwingen)
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md) · [04-branch-workflow.md](04-branch-workflow.md)

---

### 9. `git diff`
**Was:** Unterschiede zwischen Ständen anzeigen.
**Wann:** Sehen was genau geändert wurde.
```bash
git diff                           # Ungespeicherte Änderungen
git diff --staged                  # Bereits staged Änderungen
git diff c62afbc7 8da14794         # Zwischen 2 Commits
git diff main feature/xyz          # Zwischen 2 Branches
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md)

---

### 10. `git merge <branch>`
**Was:** Änderungen eines Branches in den aktuellen holen.
**Wann:** Feature fertig → zurück zu main.
```bash
git switch main
git merge feature/mein-feature
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md) · [04-branch-workflow.md](04-branch-workflow.md)

---

## ⚡ WORKFLOW-BEFEHLE — Branches & Teamwork

### `git stash` / `git stash pop`
**Was:** Änderungen temporär verstecken / wieder rausholen.
**Wann:** Branch wechseln aber unfertige Änderungen mitnehmen.
```bash
git stash          # Änderungen verstecken
git stash pop      # Wieder rausholen
```
📖 **Mehr:** [02-begriffe-glossar.md](02-begriffe-glossar.md)

---

### `git fetch`
**Was:** Remote-Änderungen herunterladen, aber NICHT einbauen.
**Wann:** Prüfen was auf GitHub neu ist, ohne den Code zu ändern.
```bash
git fetch origin
```
📖 **Mehr:** [02-begriffe-glossar.md](02-begriffe-glossar.md)

---

### `git remote -v`
**Was:** Alle Remote-Verbindungen anzeigen (URLs).
**Wann:** Prüfen wo dein Repo hinge pusht.
```bash
git remote -v
```
📖 **Mehr:** [09-befehl-anatomie.md](09-befehl-anatomie.md)

---

### `git checkout <commit-hash>`
**Was:** Zu einem alten Commit springen (Zeitreise).
**Wann:** Alten Stand anschauen oder wiederherstellen.
```bash
git checkout c62afbc7       # Zu altem Commit springen
git switch main             # Zurück zu main
```
📖 **Mehr:** [02-begriffe-glossar.md](02-begriffe-glossar.md)

---

### `git worktree add <pfad> <branch>`
**Was:** Zweiten Branch in einem SEPARATEN Ordner öffnen.
**Wann:** Gleichzeitig an 2 Branches arbeiten (2 VS Code-Fenster).
```bash
git worktree add ../mein-projekt-feature feature/neues-feature
```
📖 **Mehr:** [02-begriffe-glossar.md](02-begriffe-glossar.md) · [04-branch-workflow.md](04-branch-workflow.md)

---

### `git revert <commit-hash>`
**Was:** Einen Commit rückgängig machen (sicher!). Erstellt NEUEN Commit.
**Wann:** Fehler auf einem SHARED Branch rückgängig machen.
```bash
git revert c62afbc7
```
📖 **Mehr:** [02-begriffe-glossar.md](02-begriffe-glossar.md)

---

### `git reset`
**Was:** Zu einem alten Stand zurückspringen (gefährlich!).
**Wann:** Lokale Branches aufräumen.
```bash
git reset --soft HEAD~1    # Commit weg, Änderungen bleiben
git reset --hard HEAD~1    # Commit + Änderungen WEG! ⚠️
```
📖 **Mehr:** [02-begriffe-glossar.md](02-begriffe-glossar.md) · [08-teamgroessen-und-head.md](08-teamgroessen-und-head.md)

---

### `git push --force` / `--force-with-lease`
**Was:** GitHub überschreiben (History umschreiben).
**Wann:** Lokalen Stand als Wahrheit durchsetzen.
```bash
git push --force origin main              # Brutal
git push --force-with-lease origin main   # Sicherer
```
⚠️ **Niemals** wenn andere am gleichen Branch arbeiten!
📖 **Mehr:** [09-befehl-anatomie.md](09-befehl-anatomie.md)

---

## 🔧 SPEZIAL-BEFEHLE — Wann du sie brauchst

| Befehl | Kurz | Wann | Referenz |
|--------|------|------|----------|
| `git push -n` | Dry-Run (simulieren) | Prüfen was passieren würde | [09-befehl-anatomie.md](09-befehl-anatomie.md) |
| `git push --delete origin branch` | Remote Branch löschen | Auf GitHub aufräumen | [09-befehl-anatomie.md](09-befehl-anatomie.md) |
| `git branch -m alt neu` | Branch umbenennen | Falscher Name | [03-alltag-befehle.md](03-alltag-befehle.md) |
| `git rebase main` | Commits umorganisieren | Saubere History (lokal!) | [04-branch-workflow.md](04-branch-workflow.md) |
| `git rebase -i HEAD~3` | Interaktiv umschreiben | Commits zusammenfassen | [04-branch-workflow.md](04-branch-workflow.md) |
| `git commit -a -m "..."` | Add + Commit für bekannte Dateien | Schneller Workflow | [03-alltag-befehle.md](03-alltag-befehle.md) |
| `git add -A` | Alle Änderungen überall | Wie `git add .` | [09-befehl-anatomie.md](09-befehl-anatomie.md) |
| `git push origin :branch` | Remote Branch löschen | Leere Quelle = löschen | [09-befehl-anatomie.md](09-befehl-anatomie.md) |
| `git log --author="Name"` | Commits einer Person | Wer hat was gemacht? | [03-alltag-befehle.md](03-alltag-befehle.md) |
| `git diff --staged` | Nur staged Änderungen | Vor dem Commit prüfen | [03-alltag-befehle.md](03-alltag-befehle.md) |

---

## ⚠️ EDGE CASES — Wenn was schief geht

### Merge Conflict
**Problem:** Zwei Leute haben die gleiche Zeile geändert.
```bash
# 1. Datei öffnen
# 2. Nach <<<<<<<, =======, >>>>>>> suchen
# 3. Gewünschte Version behalten, Markierungen löschen
# 4. Fertig:
git add <datei>
git commit
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md) · [05-zusammenarbeit.md](05-zusammenarbeit.md)

---

### "Non-fast-forward" Fehler beim Push
**Problem:** GitHub ist weiter als du.
```bash
# Option 1: Updates holen + mergen
git pull origin main
git push

# Option 2: Überschreiben (wenn du sicher bist)
git push --force origin main
```
📖 **Mehr:** [09-befehl-anatomie.md](09-befehl-anatomie.md)

---

### Ungespeicherte Änderungen blockieren Pull
**Problem:** "Your local changes would be overwritten."
```bash
git stash              # Änderungen verstecken
git pull               # Updates holen
git stash pop          # Änderungen wieder rausholen
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md)

---

### Falscher Branch
**Problem:** Aus Versehen auf dem falschen Branch gearbeitet.
```bash
git stash                    # Änderungen sichern
git switch richtiger-branch  # Wechseln
git stash pop                # Änderungen wieder rausholen
```
📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md)

---

### Versehentlich committed
**Problem:** Commit war verfrüht oder falsch.
```bash
# Letzten Commit rückgängig (Dateien bleiben)
git reset --soft HEAD~1

# Letzten Commit + Änderungen weg (gefährlich!)
git reset --hard HEAD~1
```
📖 **Mehr:** [02-begriffe-glossar.md](02-begriffe-glossar.md) · [08-teamgroessen-und-head.md](08-teamgroessen-und-head.md)

---

### "Detached HEAD" Zustand
**Problem:** Du bist auf einem Commit, keinem Branch.
```bash
# Einfach zurück zu einem Branch:
git switch main

# Oder: Neuen Branch vom aktuellen Commit erstellen
git switch -c neuer-branch-name
```
📖 **Mehr:** [08-teamgroessen-und-head.md](08-teamgroessen-und-head.md)

---

### Branch auf GitHub gelöscht, aber noch lokal
**Problem:** Remote Branch weg, lokal noch da.
```bash
# Lokale Referenz aufräumen
git fetch --prune

# Dann lokal löschen
git branch -d branch-name
```
📖 **Mehr:** [04-branch-workflow.md](04-branch-workflow.md)

---

## 🧩 Befehls-Anatomie — Das Pattern

```
git <aktion> [optionen] [remote] [quelle:ziel]
│   │       │        │        │
│   │       │        │        └── Branch-Name (lokal:remote)
│   │       │        └── Remote (meistens "origin")
│   │       └── Flags wie -u, -f, -m, -n
│   └── Was gemacht wird (add, commit, push, ...)
└── Das Programm
```

📖 **Mehr:** [09-befehl-anatomie.md](09-befehl-anatomie.md)

---

## 🔑 Die 5 wichtigsten Begriffe

| Begriff | Kurz | Analogie |
|---------|------|----------|
| **Repository** | Von Git überwachter Ordner | 📁 Aktenordner mit Zeitmaschine |
| **Commit** | Speicherpunkt | 📸 Foto |
| **Branch** | Parallele Version | 🛤️ Parallelwelt |
| **Push** | Hochladen | 📤 Hausaufgaben hochladen |
| **Pull** | Herunterladen + Einbauen | 📥 Neueste Version holen |

📖 **Mehr:** [02-begriffe-glossar.md](02-begriffe-glossar.md)

---

## 🌐 Remote-Namen — Wer ist wer?

| Name | Bedeutung |
|------|-----------|
| `origin` | Standard-Name für dein GitHub-Repo |
| `upstream` | Original-Repo (bei Forks/Open Source) |
| Eigener Name | Du kannst beliebige Remotes hinzufügen |

```bash
git remote add backup https://gitlab.com/user/repo.git
```

📖 **Mehr:** [09-befehl-anatomie.md](09-befehl-anatomie.md)

---

## 🏆 Branch-Namenskonventionen

| Präfix | Bedeutung | Beispiel |
|--------|-----------|----------|
| `feature/` | Neues Feature | `feature/dark-mode` |
| `bugfix/` | Fehler beheben | `bugfix/login-crash` |
| `hotfix/` | Dringender Produktions-Fix | `hotfix/security` |
| `experiment/` | Ausprobieren (wegwerfbar) | `experiment/tanstack` |
| `refactor/` | Code umbauen | `refactor/auth` |
| `chore/` | Aufräumen | `chore/deps-update` |

📖 **Mehr:** [04-branch-workflow.md](04-branch-workflow.md) · [08-teamgroessen-und-head.md](08-teamgroessen-und-head.md)

---

## 📋 Daily Workflow Spickzettel

```
┌─────────────────────────────────────────────────────────┐
│  TÄGLICHER WORKFLOW                                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🌅 Morgens:                                            │
│  ├── git status        ← Wo stehe ich?                  │
│  └── git pull          ← Updates holen                  │
│                                                         │
│  💻 Arbeiten:                                           │
│  ├── Dateien ändern                                     │
│  ├── git status        ← Überblick behalten             │
│  └── git diff          ← Was genau geändert?            │
│                                                         │
│  📦 Fertig:                                             │
│  ├── git add .         ← Einpacken                      │
│  ├── git commit -m "..." ← Speichern                    │
│  └── git push          ← Hochladen                      │
│                                                         │
│  🌙 Abends:                                             │
│  └── git status        ← Alles gepusht?                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

📖 **Mehr:** [03-alltag-befehle.md](03-alltag-befehle.md)

---

## 🔀 Force-Push — Brauche ich es?

```
┌───────────────────────────────────────┐
│  BRAUCHE ICH --force?                 │
├───────────────────────────────────────┤
│                                       │
│  Normaler Push funktioniert?          │
│  ├── JA → Kein Force nötig ✅         │
│  └── NEIN ↓                           │
│                                       │
│  Willst du GitHub überschreiben?      │
│  ├── JA → --force benutzen ⚠️        │
│  └── NEIN → Erst pullen + mergen     │
│                                       │
│  Arbeiten andere am Branch?           │
│  ├── JA → --force-with-lease nutzen   │
│  └── NEIN → --force OK               │
│                                       │
└───────────────────────────────────────┘
```

📖 **Mehr:** [09-befehl-anatomie.md](09-befehl-anatomie.md)

---

## 👥 Team-Workflow nach Größe

| Teamgröße | Workflow | Review-Pflicht |
|-----------|----------|----------------|
| **1-3** | Einfach: Branch → PR → Merge | Optional |
| **4-6** | Strukturiert: Protected main, 1 Review | 1 Person |
| **7+** | Git Flow: main + develop + release | 2+ Personen |

📖 **Mehr:** [05-zusammenarbeit.md](05-zusammenarbeit.md) · [08-teamgroessen-und-head.md](08-teamgroessen-und-head.md)

---

## 🛠️ Tools Empfehlung

| Tool | Für wen |
|------|---------|
| **VS Code + GitLens** | Hauptarbeit (eingebaut) |
| **Terminal** | Schnelle Befehle |
| **GitHub Desktop** | Komplexe Merges |
| **Git Graph (VS Code Ext.)** | Visuelle Historie |
| **gh CLI** | GitHub vom Terminal |

📖 **Mehr:** [06-tools-und-oberflaechen.md](06-tools-und-oberflaechen.md)

---

## 📚 Alle Tutorial-Dateien im Überblick

| Nr. | Datei | Kerninhalt |
|-----|-------|------------|
| 01 | [01-git-grundlagen.md](01-git-grundlagen.md) | Was ist Git? Warum? 3 Orte |
| 02 | [02-begriffe-glossar.md](02-begriffe-glossar.md) | 17 Begriffe mit Analogien |
| 03 | [03-alltag-befehle.md](03-alltag-befehle.md) | Top 10 Befehle + Spickzettel |
| 04 | [04-branch-workflow.md](04-branch-workflow.md) | Branches, Merge vs Rebase |
| 05 | [05-zusammenarbeit.md](05-zusammenarbeit.md) | PRs, Reviews, Merge Conflicts |
| 06 | [06-tools-und-oberflaechen.md](06-tools-und-oberflaechen.md) | GitHub, VS Code, GUIs |
| 07 | [07-fehler-und-verlauf-notedrill.md](07-fehler-und-verlauf-notedrill.md) | Konkreter TanStack-Fall |
| 08 | [08-teamgroessen-und-head.md](08-teamgroessen-und-head.md) | HEAD, Teams skalieren |
| 09 | [09-befehl-anatomie.md](09-befehl-anatomie.md) | origin, -u, force, clean:main |
| **10** | **10-komplett-zusammenfassung.md** | **Diese Datei** 🎯 |

---

## 🧠 Das musst du dir merken

```
┌─────────────────────────────────────────────────────────────┐
│  GIT IN 10 SEKUNDEN                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. git status         → Wo bin ich?                        │
│  2. git add .          → Änderungen einpacken               │
│  3. git commit -m "x"  → Speicherpunkt                      │
│  4. git push           → Hochladen                          │
│  5. git pull           → Updates holen                      │
│                                                             │
│  Branch = Parallelwelt                                      │
│  Merge = Zusammenführen                                     │
│  origin = GitHub-Spitzname                                  │
│  HEAD = "Du bist hier"                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

*Erstellt für NoteDrill - April 2026*
*Dies ist die 10. und letzte Datei des Git Tutorials*
