# Top Befehle - Alles auf einen Blick

## 🎯 Die ultimative Zusammenfassung

Diese Seite fasst **alles** zusammen - mit Links zu den Detail-Erklärungen.

---

## 🚀 Die Top 10 Befehle (90% deiner Git-Arbeit)

| # | Befehl | Was macht er? | Details |
|---|--------|---------------|---------|
| 1 | `git status` | Zeigt was los ist (geändert, staged, Branch) | [→ 03-alltag](03-alltag-befehle.md#1-git-status---wo-stehe-ich-gerade) |
| 2 | `git add .` | Alle Änderungen einpacken (stagen) | [→ 03-alltag](03-alltag-befehle.md#2-git-add---änderungen-einpacken) |
| 3 | `git commit -m "..."` | Speicherpunkt erstellen | [→ 03-alltag](03-alltag-befehle.md#3-git-commit---speicherpunkt-erstellen) |
| 4 | `git push` | Zu GitHub hochladen | [→ 03-alltag](03-alltag-befehle.md#4-git-push---hochladen-zu-github) |
| 5 | `git pull` | Von GitHub holen | [→ 03-alltag](03-alltag-befehle.md#5-git-pull---updates-holen) |
| 6 | `git switch -c name` | Neuen Branch erstellen + wechseln | [→ 04-branch](04-branch-workflow.md#branch-erstellen) |
| 7 | `git switch name` | Zu Branch wechseln | [→ 03-alltag](03-alltag-befehle.md#7-git-checkout--git-switch---branch-wechseln) |
| 8 | `git branch` | Branches auflisten | [→ 03-alltag](03-alltag-befehle.md#6-git-branch---branches-verwalten) |
| 9 | `git log --oneline` | Commit-Geschichte anzeigen | [→ 03-alltag](03-alltag-befehle.md#8-git-log---geschichte-ansehen) |
| 10 | `git merge name` | Branch zusammenführen | [→ 04-branch](04-branch-workflow.md#merge-vs-rebase) |

---

## 📋 Schnell-Spickzettel

```
╔════════════════════════════════════════════════════════════════════╗
║                         GIT CHEATSHEET                              ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                     ║
║  TÄGLICHER WORKFLOW                                                 ║
║  ─────────────────                                                  ║
║  git pull                    Updates holen (morgens)                ║
║  git status                  Was ist los?                           ║
║  git add .                   Alles einpacken                        ║
║  git commit -m "..."         Speicherpunkt                          ║
║  git push                    Hochladen (abends)                     ║
║                                                                     ║
║  BRANCHES                                                           ║
║  ────────                                                           ║
║  git branch                  Alle Branches zeigen                   ║
║  git switch -c feature/xyz   Neuen Branch erstellen                 ║
║  git switch main             Zu main wechseln                       ║
║  git merge feature/xyz       Branch mergen                          ║
║  git branch -d feature/xyz   Branch löschen                         ║
║                                                                     ║
║  GESCHICHTE                                                         ║
║  ──────────                                                         ║
║  git log --oneline           Kurze Commit-Liste                     ║
║  git log --oneline -5        Nur letzte 5                           ║
║  git diff                    Was wurde geändert?                    ║
║                                                                     ║
║  RÜCKGÄNGIG                                                         ║
║  ──────────                                                         ║
║  git reset --soft HEAD~1     Letzten Commit rückgängig              ║
║  git stash                   Änderungen verstecken                  ║
║  git stash pop               Versteckte zurückholen                 ║
║                                                                     ║
║  WORKTREES (Parallel arbeiten)                                      ║
║  ─────────────────────────────                                      ║
║  git worktree add ../wt-name branch    Worktree erstellen           ║
║  git worktree list                     Alle Worktrees zeigen        ║
║  git worktree remove ../wt-name        Worktree entfernen           ║
║                                                                     ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## 🔄 Die 5 häufigsten Workflows

### 1. Tägliche Arbeit
```bash
git pull                     # Updates holen
# ... arbeiten ...
git status                   # Kontrolle
git add .                    # Einpacken
git commit -m "Beschreibung" # Speichern
git push                     # Hochladen
```
→ Details: [03-alltag-befehle.md](03-alltag-befehle.md)

### 2. Neues Feature starten
```bash
git switch main              # Zu main wechseln
git pull                     # Neueste Version holen
git switch -c feature/name   # Neuen Branch erstellen
# ... arbeiten ...
git push -u origin feature/name  # Ersten Push
```
→ Details: [04-branch-workflow.md](04-branch-workflow.md)

### 3. Feature fertig → Pull Request
```bash
git add .
git commit -m "Feature fertig"
git push
# Dann auf GitHub: "Create Pull Request"
```
→ Details: [05-zusammenarbeit.md](05-zusammenarbeit.md)

### 4. Großes Update mit Worktree
```bash
git branch feature/grosses-update
git worktree add ../projekt-wt feature/grosses-update
cd ../projekt-wt
# ... KI arbeitet hier parallel ...
```
→ Details: [10-groessere-aenderungen-worktrees.md](10-groessere-aenderungen-worktrees.md)

### 5. Fehler rückgängig machen
```bash
# Noch nicht committed:
git checkout -- datei.txt    # Eine Datei zurücksetzen

# Schon committed:
git reset --soft HEAD~1      # Commit weg, Änderungen bleiben

# Komplett zurück zu GitHub:
git fetch origin
git reset --hard origin/main # ⚠️ Alles lokale weg!
```
→ Details: [07-fehler-und-verlauf-notedrill.md](07-fehler-und-verlauf-notedrill.md)

---

## 📊 Befehls-Anatomie verstehen

```bash
git push -u origin feature/login
│   │    │  │      │
│   │    │  │      └── Branch-Name
│   │    │  └── Remote-Name (fast immer "origin")
│   │    └── Flag: "upstream tracking" merken
│   └── Aktion: hochladen
└── Programm
```

→ Details: [09-befehl-anatomie.md](09-befehl-anatomie.md)

---

## 🎓 Begriffe-Schnellreferenz

| Begriff | Bedeutung | Details |
|---------|-----------|---------|
| Repository | Überwachter Ordner | [→ 02-glossar](02-begriffe-glossar.md) |
| Commit | Speicherpunkt | [→ 02-glossar](02-begriffe-glossar.md) |
| Branch | Parallele Version | [→ 04-branch](04-branch-workflow.md) |
| HEAD | "Du bist hier" | [→ 08-teams](08-teamgroessen-und-head.md) |
| Origin | GitHub-Server | [→ 09-anatomie](09-befehl-anatomie.md) |
| Worktree | Zweiter Arbeitsordner | [→ 10-worktrees](10-groessere-aenderungen-worktrees.md) |
| Staging | "Einpacken" für Commit | [→ 01-grundlagen](01-git-grundlagen.md) |

---

## 🆘 Notfall-Befehle

### "Hilfe, ich habe Mist gebaut!"

| Situation | Befehl |
|-----------|--------|
| Letzte Datei-Änderung weg | `git checkout -- datei.txt` |
| Letzten Commit weg (Dateien bleiben) | `git reset --soft HEAD~1` |
| Alles zurück wie auf GitHub | `git reset --hard origin/main` ⚠️ |
| Merge abbrechen | `git merge --abort` |
| Änderungen temporär verstecken | `git stash` |

### "Ich weiß nicht wo ich bin"

```bash
git status           # Branch + Änderungen
git branch           # Alle Branches
git log --oneline -3 # Letzte 3 Commits
pwd                  # Welcher Ordner?
```

---

## 📚 Kapitel-Übersicht

| Nr. | Thema | Beschreibung |
|-----|-------|--------------|
| [01](01-git-grundlagen.md) | Grundlagen | Was ist Git? Warum? |
| [02](02-begriffe-glossar.md) | Glossar | Alle Begriffe erklärt |
| [03](03-alltag-befehle.md) | Alltag | Die 10 wichtigsten Befehle |
| [04](04-branch-workflow.md) | Branches | Professionell verzweigen |
| [05](05-zusammenarbeit.md) | Teamwork | Pull Requests, Reviews |
| [06](06-tools-und-oberflaechen.md) | Tools | GitHub, VS Code, Desktop |
| [07](07-fehler-und-verlauf-notedrill.md) | Fehler | Rückgängig machen |
| [08](08-teamgroessen-und-head.md) | Teams | HEAD, Branch-Strategien |
| [09](09-befehl-anatomie.md) | Anatomie | Origin, -u, Force erklärt |
| [10](10-groessere-aenderungen-worktrees.md) | Worktrees | Parallel mit KI arbeiten |

---

## 🎯 Lernpfad-Empfehlung

```
Anfänger:     01 → 02 → 03 → 06
              │    │    │    │
              │    │    │    └── Tools kennenlernen
              │    │    └── Tägliche Befehle üben
              │    └── Begriffe verstehen
              └── Was ist Git?

Fortgeschritten: 04 → 05 → 07 → 08
                 │    │    │    │
                 │    │    │    └── Team-Workflows
                 │    │    └── Fehler beheben
                 │    └── Zusammenarbeit
                 └── Branches meistern

Power-User:   09 → 10
              │    │
              │    └── Parallele KI-Arbeit
              └── Befehle verstehen
```

---

*Dieses Tutorial ist Teil von NoteDrill - April 2026*
