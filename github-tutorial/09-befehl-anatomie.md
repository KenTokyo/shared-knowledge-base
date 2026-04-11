# Git-Befehle Anatomie - Warum sind Befehle so aufgebaut?

## 🎯 Übersicht

Git-Befehle folgen einem Muster:
```
git <aktion> [optionen] [argumente]
```

Diese Datei erklärt **WARUM** Befehle so aussehen, nicht nur WAS sie tun.

---

## 📦 `git add` vs `git commit` - Der Unterschied

### Das Problem das Git löst:

Du änderst 10 Dateien, willst aber nur 3 davon speichern. Wie?

### Die Lösung: Zwei-Stufen-System

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   WORKING DIRECTORY        STAGING AREA        REPOSITORY  │
│   (Deine Dateien)          (Warteschlange)     (Gespeichert)│
│                                                             │
│   file1.js ─────┐                                          │
│   file2.js ─────┼──► git add ──► 📦 Paket ──► git commit ──► 💾│
│   file3.js ─────┘              (bereit)       (gespeichert) │
│                                                             │
│   file4.js                                                  │
│   file5.js      (diese NICHT mit add hinzugefügt)          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Befehle erklärt:

| Befehl | Was passiert | Analogie |
|--------|--------------|----------|
| `git add datei.js` | Datei in Warteschlange | Produkt in Einkaufswagen legen |
| `git add .` | ALLE Änderungen in Warteschlange | Alles in den Wagen |
| `git commit -m "..."` | Warteschlange speichern | An der Kasse bezahlen |

### Warum zwei Schritte?

```
Szenario: Du hast 10 Dateien geändert

❌ Ohne Staging:
   Alles oder nichts - alle 10 müssen in einen Commit

✅ Mit Staging:
   git add login.js logout.js    ← Nur diese 2
   git commit -m "Auth fertig"   ← Commit nur mit diesen 2
   
   git add styles.css            ← Separat
   git commit -m "CSS fixes"     ← Eigener Commit
```

**Vorteil:** Saubere, logische Commit-Historie!

---

## 🌐 Was ist `origin`?

### Kurzantwort:
**`origin` = Der Spitzname für GitHub (oder wo dein Remote-Repo ist)**

### Visualisiert:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   DEIN PC                          GITHUB                   │
│   ┌─────────┐                      ┌─────────┐              │
│   │  Lokal  │ ───── origin ─────►  │  Remote │              │
│   │  Repo   │                      │  Repo   │              │
│   └─────────┘                      └─────────┘              │
│                                                             │
│   origin = "https://github.com/user/repo.git"               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Warum "origin"?

```bash
# Wenn du klonst, wird automatisch gesetzt:
git clone https://github.com/user/repo.git

# Git merkt sich:
# "origin" = https://github.com/user/repo.git

# Statt:
git push https://github.com/user/repo.git main

# Schreibst du:
git push origin main
```

**`origin` ist nur ein Alias/Spitzname für die URL!**

### Mehrere Remotes möglich:

```bash
# Anzeigen welche Remotes du hast:
git remote -v

# Ausgabe:
origin    https://github.com/DU/repo.git (fetch)
origin    https://github.com/DU/repo.git (push)

# Du könntest weitere hinzufügen:
git remote add backup https://gitlab.com/DU/repo.git
git remote add teammate https://github.com/KOLLEGE/repo.git
```

---

## 🔗 Was bedeutet `-u` in `git push -u origin branch`?

### Das `-u` Flag (oder `--set-upstream`):

```bash
git push -u origin clean
```

**Bedeutet:** "Merke dir, dass `clean` lokal mit `origin/clean` verbunden ist."

### Warum brauchst du das?

```
OHNE -u (erstes Mal):
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Lokal: clean                GitHub: ???                 │
│                                                          │
│  Git weiß nicht wohin pushen!                            │
│  Du musst IMMER sagen: git push origin clean             │
│                                                          │
└──────────────────────────────────────────────────────────┘

MIT -u (einmalig):
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Lokal: clean ←──────────→ GitHub: origin/clean          │
│                  VERBUNDEN                               │
│                                                          │
│  Ab jetzt reicht: git push                               │
│  Git weiß automatisch wohin!                             │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Praxis:

```bash
# Erstes Mal: mit -u
git push -u origin clean

# Ab jetzt: einfach nur
git push
git pull

# Git merkt sich die Verbindung!
```

---

## 🔄 Was bedeutet `clean:main` ?

### Die Syntax `lokal:remote`:

```bash
git push origin clean:main
```

**Bedeutet:** "Push meinen lokalen `clean` Branch als `main` auf GitHub."

### Visualisiert:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   LOKAL                              GITHUB                 │
│                                                             │
│   clean ●───●───●  ───────────────►  main ●───●───●        │
│         ↑                                  ↑                │
│         │                                  │                │
│      Quelle                             Ziel                │
│                                                             │
│   "Nimm clean, nenn es main auf GitHub"                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Verschiedene Szenarien:

```bash
# Gleicher Name (Standard):
git push origin main
# = git push origin main:main

# Anderer Name:
git push origin clean:main
# Lokal "clean" wird zu "main" auf GitHub

# Branch auf GitHub löschen:
git push origin :alte-branch
# Leere Quelle = "nichts" zu "alte-branch" = löschen!
```

---

## 💪 Warum `--force` ?

### Das Problem:

```
LOKAL:                    GITHUB:
A ─── B ─── C             A ─── B ─── D ─── E ─── F
          ↑                                       ↑
       du bist hier                         GitHub ist hier
```

Du willst C pushen, aber GitHub hat D, E, F die du nicht hast.

### Normaler Push sagt:

```
❌ REJECTED!
"GitHub ist weiter als du. Erst pullen!"
```

### Mit `--force`:

```bash
git push --force origin main
```

```
VORHER GitHub:  A ─── B ─── D ─── E ─── F
NACHHER GitHub: A ─── B ─── C

D, E, F sind WEG! Überschrieben!
```

### Wann `--force` benutzen?

| Situation | Force OK? |
|-----------|-----------|
| Du arbeitest alleine | ✅ Ja |
| Du willst Geschichte "reparieren" | ✅ Ja (vorsichtig) |
| Andere arbeiten am gleichen Branch | ❌ NEIN! |
| Production/Main Branch im Team | ❌ NIEMALS! |

### Sicherere Alternative:

```bash
# Force, aber nur wenn niemand anderes gepusht hat:
git push --force-with-lease origin main
```

---

## 📋 Alle Flags/Optionen erklärt

### Push-Optionen:

| Flag | Lang | Bedeutung |
|------|------|-----------|
| `-u` | `--set-upstream` | Verbindung merken |
| `-f` | `--force` | Überschreiben erzwingen |
| `--force-with-lease` | - | Sicherer Force |
| `--delete` | - | Remote Branch löschen |
| `-n` | `--dry-run` | Nur simulieren, nichts tun |

### Add-Optionen:

| Flag | Bedeutung |
|------|-----------|
| `.` | Alle Änderungen im aktuellen Ordner |
| `-A` | Alle Änderungen überall |
| `-p` | Interaktiv auswählen (patch) |
| `-n` | Nur zeigen was passieren würde |

### Commit-Optionen:

| Flag | Bedeutung |
|------|-----------|
| `-m "..."` | Nachricht direkt angeben |
| `-a` | Automatisch alle geänderten (tracked) Dateien adden |
| `--amend` | Letzten Commit ändern |
| `-n` | Hooks überspringen (nicht empfohlen) |

---

## 🧩 Befehlsstruktur-Pattern

### Das allgemeine Pattern:

```
git <verb> [flags] [remote] [quelle:ziel]
```

### Beispiele analysiert:

```bash
git push -u origin clean
│   │    │  │      │
│   │    │  │      └── Branch-Name
│   │    │  └── Remote (GitHub)
│   │    └── Flag: Upstream setzen
│   └── Aktion: Hochladen
└── Git-Programm

git push origin clean:main --force
│   │    │      │     │    │
│   │    │      │     │    └── Flag: Erzwingen
│   │    │      │     └── Ziel auf GitHub
│   │    │      └── Quelle lokal
│   │    └── Remote
│   └── Aktion
└── Git

git push origin --delete tanstack
│   │    │      │        │
│   │    │      │        └── Welcher Branch
│   │    │      └── Flag: Löschen
│   │    └── Remote
│   └── Aktion
└── Git
```

---

## 🌐 Mehrere Remotes - Warum?

### Was ist ein Remote nochmal?
```
Remote = Eine Kopie deines Repos auf einem Server (z.B. GitHub)
```

### Warum würde man MEHRERE haben?

#### Szenario 1: Backup auf zwei Plattformen
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   DEIN PC                                                   │
│   ┌─────────┐                                               │
│   │  Lokal  │                                               │
│   │  Repo   │                                               │
│   └────┬────┘                                               │
│        │                                                    │
│        ├───── origin ─────► GitHub (Haupt)                  │
│        │                                                    │
│        └───── backup ─────► GitLab (Sicherheit)             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

# Push zu beiden:
git push origin main
git push backup main
```

**Warum?** Falls GitHub mal down ist oder gelöscht wird.

#### Szenario 2: Open Source Contribution (Fork)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Du willst zu React beitragen:                             │
│                                                             │
│   upstream = github.com/facebook/react    (Original)        │
│   origin   = github.com/DU/react          (Deine Kopie)     │
│                                                             │
│   Workflow:                                                 │
│   1. git pull upstream main    ← Updates vom Original holen │
│   2. Änderungen machen                                      │
│   3. git push origin main      ← Zu DEINER Kopie pushen     │
│   4. Pull Request erstellen                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Szenario 3: Team-Mitglied direkt
```
# Du arbeitest mit Max zusammen, ihr wollt Code direkt teilen:

git remote add max https://github.com/max/projekt.git

# Max's neueste Änderungen holen:
git pull max feature/login

# Ohne GitHub als Zwischenstation!
```

### Für dich relevant?

**Wahrscheinlich nicht.** Die meisten Leute brauchen nur `origin`.

Mehrere Remotes sind für:
- Open Source Contributors
- Große Teams mit mehreren Servern
- Paranoia-Backups

---

## 🔗 Das `-u` Flag - Tiefere Erklärung

### Das Problem ohne `-u`:

```bash
# Erstes Mal pushen:
git push origin clean
# ✅ Funktioniert

# Zweites Mal:
git push
# ❌ FEHLER: "No upstream branch set"

# Du musst JEDES MAL sagen:
git push origin clean
git push origin clean
git push origin clean   # Nervig!
```

### Mit `-u` (einmalig):

```bash
# Erstes Mal mit -u:
git push -u origin clean
# ✅ Git merkt sich: "clean" gehört zu "origin/clean"

# Ab jetzt:
git push    # ✅ Funktioniert!
git pull    # ✅ Funktioniert!
# Git weiß automatisch wohin/woher
```

### Visualisiert:

```
OHNE -u:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Lokal                           GitHub                    │
│                                                             │
│   clean ●───●───●                 origin/clean ●───●───●    │
│         │                                      │            │
│         └──────── ? ─────────────────────────→ │            │
│                                                             │
│   Git: "Wo soll ich hinpushen? Sag mir jedes Mal!"          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

MIT -u:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Lokal                           GitHub                    │
│                                                             │
│   clean ●───●───● ←──TRACKING──→ origin/clean ●───●───●     │
│                    (verbunden!)                             │
│                                                             │
│   Git: "Ich weiß Bescheid! Push/Pull automatisch."          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Wann `-u` benutzen?

| Situation | -u nötig? |
|-----------|-----------|
| Neuer Branch, erster Push | ✅ Ja |
| Branch existiert schon auf GitHub | ❌ Nein (schon verbunden) |
| Du hast geklont | ❌ Nein (automatisch verbunden) |

---

## 🎯 `clean:main` Szenarien - Wann Force, wann nicht?

### Die Grundregel:

```
git push origin clean:main

Bedeutet: "Nimm meinen lokalen clean, mach daraus main auf GitHub"
```

### Szenario 1: main existiert NICHT auf GitHub
```
GitHub hat: (nichts, kein main Branch)
Du hast:    clean ●───●───●

git push origin clean:main
# ✅ FUNKTIONIERT ohne Force!
# GitHub erstellt einfach "main" mit deinem Code
```

### Szenario 2: main existiert und ist IDENTISCH
```
GitHub main:    A ─── B ─── C
Dein clean:     A ─── B ─── C

git push origin clean:main
# ✅ FUNKTIONIERT ohne Force!
# "Nichts zu tun, ist schon gleich"
```

### Szenario 3: Dein clean ist WEITER als GitHub main
```
GitHub main:    A ─── B ─── C
Dein clean:     A ─── B ─── C ─── D ─── E
                              ↑
                          (neue Commits)

git push origin clean:main
# ✅ FUNKTIONIERT ohne Force!
# "Fast-forward" - GitHub fügt D und E hinzu
```

### Szenario 4: GitHub main ist WEITER (Problem!)
```
GitHub main:    A ─── B ─── C ─── X ─── Y
Dein clean:     A ─── B ─── C
                          ↑
                    (du bist hinter GitHub)

git push origin clean:main
# ❌ REJECTED! "Non-fast-forward"
# Git sagt: "Du würdest X und Y löschen!"

git push origin clean:main --force
# ⚠️ FUNKTIONIERT - aber X und Y sind WEG!
```

### Szenario 5: Komplett verschiedene Geschichte (DEIN FALL!)
```
GitHub main:    A ─── B ─── C ─── TanStack1 ─── TanStack2
Dein clean:     A ─── B ─── C ─── Docs ─── Tutorial
                          ↑
                    (ab hier anders)

git push origin clean:main
# ❌ REJECTED! "Diverged histories"

git push origin clean:main --force
# ⚠️ FUNKTIONIERT - TanStack-Commits sind WEG
# GitHub main wird zu deinem clean
```

### Entscheidungsbaum:

```
┌─────────────────────────────────────────────────────────────┐
│  BRAUCHE ICH --force?                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Hast du ohne --force gepusht?                              │
│  ├── ✅ Hat funktioniert → Fertig, kein Force nötig         │
│  └── ❌ "Rejected" Fehler ↓                                 │
│                                                             │
│  Was sagt die Fehlermeldung?                                │
│  ├── "non-fast-forward" → Du bist hinter GitHub             │
│  └── "diverged" → Komplett verschiedene Geschichte          │
│                                                             │
│  Willst du GitHub ÜBERSCHREIBEN?                            │
│  ├── JA → --force benutzen (Daten auf GitHub gehen verloren)│
│  └── NEIN → Erst pullen, dann mergen/rebasen                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Für DEINEN Fall (TanStack → Clean):

```bash
# Du willst: clean soll das neue main werden
# TanStack-Commits auf GitHub sollen weg

# Befehl:
git push origin clean:main --force

# Was passiert:
# - GitHub main = wird zu deinem clean
# - TanStack-Commits auf GitHub = gelöscht
# - Dein lokaler tanstack-Ordner = bleibt (separater Clone)
```

---

## 🎓 Zusammenfassung

| Begriff | Bedeutung |
|---------|-----------|
| `origin` | Spitzname für GitHub-URL |
| `add` | Dateien in Warteschlange (Staging) |
| `commit` | Warteschlange speichern |
| `-u` | "Merk dir diese Verbindung" |
| `lokal:remote` | "Nimm lokal, nenn es remote" |
| `--force` | "Überschreib alles, ich weiß was ich tue" |

---

## 📚 Weiter lesen
- [03-alltag-befehle.md](03-alltag-befehle.md) - Tägliche Befehle
- [08-teamgroessen-und-head.md](08-teamgroessen-und-head.md) - HEAD erklärt
