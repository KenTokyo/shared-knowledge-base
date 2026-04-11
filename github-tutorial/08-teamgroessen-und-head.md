# Teamgrößen, HEAD-Befehle und Branch-Namenskonventionen

## 🤔 Deine Fragen beantwortet

> "Nennt man den zweiten Branch immer clean?"

**Nein!** "Clean" habe ich nur verwendet, weil es deine Situation beschrieben hat (sauber = ohne TanStack). Der Name sollte beschreiben, WAS im Branch ist.

---

## 🏷️ Wie nennt man Branches richtig?

### Standard-Namenskonventionen

| Präfix | Wann benutzen | Beispiel |
|--------|---------------|----------|
| `feature/` | Neues Feature | `feature/dark-mode` |
| `bugfix/` | Fehler beheben | `bugfix/login-crash` |
| `hotfix/` | Dringender Fix für Produktion | `hotfix/security-leak` |
| `experiment/` | Ausprobieren, evtl. wegwerfen | `experiment/tanstack-migration` |
| `chore/` | Aufräumen, Dependencies | `chore/update-react` |
| `refactor/` | Code umbauen (gleiche Funktion) | `refactor/auth-service` |

### Für deine TanStack-Situation besser gewesen:
```
❌ main (mit TanStack vermischt)
❌ clean (unklar was das bedeutet)

✅ main (stabil, produktionsreif)
✅ experiment/tanstack-migration (klar was es ist)
```

---

## 🧭 HEAD erklärt - Der "Wo bin ich?"-Zeiger

### Was ist HEAD?

```
HEAD = "Dein aktueller Standort in der Git-Geschichte"
```

**Alltagsanalogie:** 🎮 Der Speicherstand, auf dem du gerade spielst.

### HEAD visualisiert

```
Commits:     A ─── B ─── C ─── D ─── E
                              ↑
                             HEAD
                        (du bist hier)
```

### HEAD-Befehle Übersicht

| Befehl | Was passiert | Gefährlichkeit |
|--------|--------------|----------------|
| `git log HEAD` | Zeigt wo du bist | ⚪ sicher |
| `git show HEAD` | Zeigt aktuellen Commit | ⚪ sicher |
| `git reset HEAD~1` | 1 Commit zurück (behält Änderungen) | 🟡 mittel |
| `git reset --hard HEAD~1` | 1 Commit zurück (LÖSCHT Änderungen) | 🔴 gefährlich |
| `git revert HEAD` | Macht letzten Commit rückgängig (neuer Commit) | ⚪ sicher |
| `git checkout HEAD~3` | Springt 3 Commits zurück (nur schauen) | ⚪ sicher |

### HEAD-Notation erklärt

```
HEAD      = Der aktuelle Commit
HEAD~1    = 1 Commit zurück (Parent)
HEAD~2    = 2 Commits zurück (Großeltern)
HEAD~5    = 5 Commits zurück

HEAD^     = Auch Parent (gleich wie HEAD~1)
HEAD^^    = Großeltern (gleich wie HEAD~2)
```

### Wichtige HEAD-Befehle mit Beispielen

#### 1. Letzten Commit rückgängig machen (SICHER)
```bash
# Erstellt einen NEUEN Commit der den letzten aufhebt
git revert HEAD

# Ergebnis:
# A ─── B ─── C ─── D (wird aufgehoben)
#                    \
#                     └── R (Revert-Commit)
```

#### 2. Letzten Commit "auflösen" (behält Änderungen)
```bash
# Commit weg, aber Code bleibt
git reset HEAD~1

# Ergebnis:
# A ─── B ─── C ─── [D ist weg, aber Code noch da]
```

#### 3. Komplett zurücksetzen (GEFÄHRLICH!)
```bash
# ALLES weg - Commit UND Änderungen
git reset --hard HEAD~1

# ⚠️ VORSICHT: Daten können verloren gehen!
```

#### 4. Nur schauen wie es früher war
```bash
# Zeitreise (read-only)
git checkout HEAD~5

# Du bist jetzt im "detached HEAD" Zustand
# Zurück: git switch main
```

---

## 👥 Team-Skalierung: 3, 5, 10 Leute

### 1-3 Personen: Einfacher Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  KLEINES TEAM (1-3 Personen)                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  main          ●───●───●───●───●───●───●                    │
│                         \     /                              │
│  feature/xyz             ●───●                               │
│                                                             │
│  Workflow:                                                   │
│  1. Branch erstellen                                        │
│  2. Arbeiten                                                │
│  3. PR erstellen                                            │
│  4. Kurzes Review (oder self-merge)                         │
│  5. Merge                                                   │
│                                                             │
│  Regeln:                                                    │
│  ✅ Jedes Feature = eigener Branch                          │
│  ✅ PRs erwünscht, aber nicht streng                        │
│  ✅ Direkte Kommunikation ("Hey, ich merge jetzt")          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4-6 Personen: Strukturierter Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  MITTLERES TEAM (4-6 Personen)                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  main          ●───────●───────●───────●                    │
│                         ↑       ↑       ↑                    │
│                         │       │       │                    │
│  feature/a     ●───●────┘       │       │                    │
│  feature/b          ●───●───────┘       │                    │
│  feature/c               ●───●──────────┘                    │
│                                                             │
│  Workflow:                                                   │
│  1. Branch erstellen (Namenskonvention WICHTIG)             │
│  2. Arbeiten + regelmäßig main pullen                       │
│  3. PR erstellen mit BESCHREIBUNG                           │
│  4. Mindestens 1 Review PFLICHT                             │
│  5. Merge nach Approval                                     │
│                                                             │
│  Regeln:                                                    │
│  ✅ Protected Branch: main                                   │
│  ✅ Review-Pflicht für alle PRs                             │
│  ✅ Ticket-Nummern in Branch-Namen (feature/TICKET-123)     │
│  ✅ Tägliche Sync-Meetings oder Slack-Channel               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 7+ Personen: Git Flow / Professional

```
┌─────────────────────────────────────────────────────────────┐
│  GROSSES TEAM (7+ Personen)                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  main       ●─────────────────●─────────────────●           │
│  (production)                 ↑                 ↑           │
│                               │                 │           │
│  develop    ●───●───●───●─────┴───●───●───●─────┴───●       │
│                  ↑       ↑             ↑       ↑             │
│                  │       │             │       │             │
│  feature/a  ●────┘       │             │       │             │
│  feature/b        ●──────┘             │       │             │
│  feature/c                    ●────────┘       │             │
│  feature/d                          ●──────────┘             │
│                                                             │
│  Branches:                                                  │
│  • main     = Produktion (was User sehen)                   │
│  • develop  = Integration (nächstes Release)                │
│  • feature/* = Einzelne Features                            │
│  • release/* = Release-Vorbereitung                         │
│  • hotfix/*  = Notfall-Fixes für Produktion                 │
│                                                             │
│  Workflow:                                                   │
│  1. Feature-Branch von develop                              │
│  2. PR zu develop (2 Reviews PFLICHT)                       │
│  3. Release-Branch wenn genug Features                      │
│  4. QA-Testing auf Release-Branch                           │
│  5. Merge zu main = Live                                    │
│                                                             │
│  Regeln:                                                    │
│  ✅ NIEMAND pusht direkt zu main oder develop               │
│  ✅ 2+ Reviews für jeden PR                                 │
│  ✅ CI/CD Tests müssen grün sein                            │
│  ✅ Ticket-System (Linear, Jira) PFLICHT                    │
│  ✅ Code-Owner für verschiedene Bereiche                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Vergleichstabelle: Team-Größen

| Aspekt | 1-3 Personen | 4-6 Personen | 7+ Personen |
|--------|--------------|--------------|-------------|
| **Haupt-Branches** | main | main + develop | main + develop + release |
| **Review-Pflicht** | Optional | 1 Review | 2+ Reviews |
| **Branch-Schutz** | Optional | main geschützt | main + develop geschützt |
| **Namenskonvention** | Empfohlen | Pflicht | Streng (mit Ticket-Nr.) |
| **CI/CD** | Nice-to-have | Empfohlen | Pflicht |
| **Kommunikation** | Direkt | Slack + Daily | Jira + Slack + Meetings |

---

## 🔄 Wie Code in main landet (nach Teamgröße)

### Solo / 2-3 Personen
```bash
# 1. Branch erstellen
git switch -c feature/mein-feature

# 2. Arbeiten + Committen
git add .
git commit -m "Feature fertig"

# 3. Zu main wechseln und mergen
git switch main
git merge feature/mein-feature

# 4. Branch löschen
git branch -d feature/mein-feature
```

### 4-6 Personen
```bash
# 1. Branch erstellen
git switch -c feature/TICKET-123-mein-feature

# 2. Arbeiten + Committen
git add .
git commit -m "TICKET-123: Feature implementiert"

# 3. Push zu GitHub
git push -u origin feature/TICKET-123-mein-feature

# 4. PR auf GitHub erstellen
#    → Review anfordern
#    → Warten auf Approval

# 5. Auf GitHub "Merge" klicken

# 6. Lokal aufräumen
git switch main
git pull
git branch -d feature/TICKET-123-mein-feature
```

### 7+ Personen
```bash
# 1. Aktuellen develop holen
git switch develop
git pull

# 2. Feature-Branch erstellen
git switch -c feature/PROJ-456-grosses-feature

# 3. Arbeiten (regelmäßig develop reintegrieren!)
git add .
git commit -m "PROJ-456: Teil 1 implementiert"
git pull origin develop  # Updates holen
git push

# 4. PR zu develop erstellen
#    → 2 Reviewer zuweisen
#    → CI/CD muss grün sein
#    → Code-Owner muss approven

# 5. Nach Approval: Squash & Merge zu develop

# 6. Release-Manager erstellt später release/v1.2.0
#    → QA testet
#    → Merge zu main = Live
```

---

## ❓ Häufige Fragen

### "Hat jeder Mitarbeiter seinen eigenen Branch?"

**Nein!** Jedes **Feature** hat einen Branch, nicht jede **Person**.

```
❌ FALSCH:
sarah-branch
max-branch
kim-branch

✅ RICHTIG:
feature/dark-mode (Sarah arbeitet dran)
bugfix/login (Max arbeitet dran)
feature/export (Kim arbeitet dran)
```

### "Was wenn zwei Leute am gleichen Feature arbeiten?"

```
Option 1: Beide auf dem gleichen Branch
  git switch feature/grosses-feature
  # Beide pushen/pullen auf gleichen Branch

Option 2: Sub-Branches
  feature/grosses-feature
  ├── feature/grosses-feature-frontend (Sarah)
  └── feature/grosses-feature-backend (Max)
```

### "Wann lösche ich einen Branch?"

```
NACH dem Merge!

1. Feature fertig und in main/develop gemerged
2. PR auf GitHub geschlossen
3. Lokal: git branch -d feature/xyz
4. Remote: git push origin --delete feature/xyz

(GitHub kann Branches auch automatisch nach Merge löschen)
```

---

## 📚 Weiter lesen
- [04-branch-workflow.md](04-branch-workflow.md) - Branch-Grundlagen
- [05-zusammenarbeit.md](05-zusammenarbeit.md) - Code Reviews und PRs
