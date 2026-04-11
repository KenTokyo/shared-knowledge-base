# Git Begriffe - Das komplette Glossar

## 🎯 Warum dieses Glossar?
Git hat viele Begriffe, die auf Englisch sind und verwirrend klingen. Hier sind alle wichtigen Begriffe mit **Alltagsanalogien** erklärt.

---

## 📖 Die Kernbegriffe

### 1. Repository (Repo)
**Was es ist:** Ein Ordner, der von Git überwacht wird.

**Alltagsanalogie:** 📁 Ein **Aktenordner** mit eingebauter Zeitmaschine.

```
Dein Projekt-Ordner
├── src/
├── README.md
└── .git/          ← Das macht es zum Repository!
```

**Zwei Typen:**
- **Lokales Repository** = Auf deinem Computer
- **Remote Repository** = Im Internet (GitHub, GitLab)

---

### 2. Commit
**Was es ist:** Ein **Speicherpunkt** mit Beschreibung.

**Alltagsanalogie:** 📸 Ein **Foto** deines Projekts zu einem bestimmten Zeitpunkt.

```
Commit = Foto + Beschreibung + Zeitstempel + Autor
         ────────────────────────────────────────
         "Was wurde geändert und warum?"
```

**Beispiel:**
```
commit 8da14794
Author: KenTokyo
Date:   2026-04-10

    "Button-Farbe geändert und Fehler im Login behoben"
```

---

### 3. Branch
**Was es ist:** Eine **parallele Arbeitsversion** deines Projekts.

**Alltagsanalogie:** 🛤️ **Parallelwelten** wie in einem Film.

```
          ┌──────────────────────┐
          │  feature/neue-farbe  │  ← Hier experimentierst du
          └──────────┬───────────┘
                     │
─────────────────────┴───────────────────────
                     │
              main (Hauptversion)
```

**Warum Branches?**
- Du kannst experimentieren, ohne das Hauptprojekt zu zerstören
- Mehrere Leute können gleichzeitig an verschiedenen Features arbeiten
- Wenn etwas schief geht, löschst du einfach den Branch

---

### 4. Main / Master
**Was es ist:** Der **Hauptbranch** - die offizielle Version.

**Alltagsanalogie:** 📕 Das **veröffentlichte Buch**, während andere Branches die Entwürfe sind.

**Synonyme (alle meinen dasselbe):**
| Begriff | Erklärung |
|---------|-----------|
| **main** | Aktueller Standard-Name (modern) |
| **master** | Alter Name (vor 2020) |
| **trunk** | In älteren Systemen (SVN) |
| **default** | Bei manchen Git-Hosts |

⚠️ **Tipp:** `main` und `master` sind dasselbe Konzept, nur unterschiedliche Namen!

---

### 5. HEAD
**Was es ist:** Ein **Zeiger** auf den aktuellen Stand, wo du gerade bist.

**Alltagsanalogie:** 📍 Dein **"Du bist hier"**-Punkt auf einer Landkarte.

```
                HEAD
                 │
                 ▼
┌─────┐   ┌─────┐   ┌─────┐
│ c1  │──▶│ c2  │──▶│ c3  │
└─────┘   └─────┘   └─────┘
  alt       älter     neu
```

**Wichtig:** HEAD zeigt auf den Commit, den du gerade siehst/bearbeitest.

---

### 6. Clone
**Was es ist:** Eine **Kopie** eines Repositories herunterladen.

**Alltagsanalogie:** 📋 Ein Buch aus der Bibliothek **komplett kopieren** und mit nach Hause nehmen.

```bash
git clone https://github.com/user/projekt.git
```

**Was passiert:**
1. Komplettes Projekt wird heruntergeladen
2. Alle Commits/Geschichte dabei
3. Automatisch mit dem Online-Repo verbunden

---

### 7. Push
**Was es ist:** Deine lokalen Commits **hochladen** ins Internet (GitHub).

**Alltagsanalogie:** 📤 Deine Hausaufgaben **hochladen** ins Schulportal.

```bash
git push origin main
      │      │     │
      │      │     └── Welcher Branch?
      │      └──────── Wohin? (meistens "origin")
      └─────────────── Der Befehl
```

---

### 8. Pull
**Was es ist:** Änderungen von anderen **herunterladen** und einbauen.

**Alltagsanalogie:** 📥 Die neueste Version eines Dokuments **herunterladen**.

```bash
git pull origin main
```

**Was passiert:**
1. Neue Commits werden heruntergeladen
2. Automatisch in deinen Code eingebaut
3. Du hast jetzt den aktuellen Stand

---

### 9. Fetch
**Was es ist:** Wie Pull, aber **ohne automatisches Einbauen**.

**Alltagsanalogie:** 📬 Die Post aus dem Briefkasten holen, aber noch nicht öffnen.

```bash
git fetch origin
```

**Unterschied zu Pull:**
| Pull | Fetch |
|------|-------|
| Download + Einbauen | Nur Download |
| Ändert deine Dateien | Ändert nichts |
| Schneller | Sicherer zum Prüfen |

---

### 10. Merge
**Was es ist:** Zwei Branches **zusammenführen**.

**Alltagsanalogie:** 🧬 Zwei Versionen eines Dokuments zu einer **verschmelzen**.

```
feature-branch:    A──B──C
                          \
                           \
main:              D──E─────M  (M = Merge-Commit)
```

---

### 11. Checkout
**Was es ist:** Zu einem anderen Branch oder Commit **wechseln**.

**Alltagsanalogie:** 🚗 Die **Autobahn-Ausfahrt** nehmen.

```bash
# Zu einem Branch wechseln
git checkout feature/mein-feature

# Zu einem alten Commit springen (Zeitreise!)
git checkout c62afbc7
```

**Moderner Ersatz:** `git switch` (seit Git 2.23)
```bash
git switch feature/mein-feature
```

---

### 12. Worktree
**Was es ist:** Mehrere Branches **gleichzeitig** in verschiedenen Ordnern.

**Alltagsanalogie:** 📂 Zwei **Schreibtische** für verschiedene Projekte, beide mit dem gleichen Aktenordner verbunden.

```bash
git worktree add ../mein-projekt-feature feature/neues-feature
```

**Wann nützlich?**
- Du willst gleichzeitig auf main UND feature arbeiten
- Du brauchst zwei VS-Code-Fenster für verschiedene Branches
- **Genau dein Fall!** (notedrill-backend-nextjs + notedrill-tanstack-branch)

---

### 13. Stash
**Was es ist:** Änderungen **temporär verstecken**, ohne Commit.

**Alltagsanalogie:** 🗄️ Deine unfertige Arbeit in eine **Schublade** legen.

```bash
git stash           # Verstecken
git stash pop       # Wieder rausholen
```

---

### 14. Rebase
**Was es ist:** Commits **umorganisieren** (fortgeschritten!).

**Alltagsanalogie:** 📝 Deine Geschichte **umschreiben**, als ob sie von Anfang an anders war.

⚠️ **Vorsicht:** Nur auf lokalen Branches verwenden, nie auf shared Branches!

---

### 15. Revert
**Was es ist:** Einen alten Commit **rückgängig machen** (sicher!).

**Alltagsanalogie:** ↩️ Eine Änderung **stornieren** wie eine Bestellung.

```bash
git revert c62afbc7   # Erstellt neuen Commit, der den alten rückgängig macht
```

**Wichtig:** Revert löscht nichts, es fügt einen neuen "Rückgängig-Commit" hinzu.

---

### 16. Reset
**Was es ist:** Zu einem alten Stand **zurücksetzen** (gefährlich!).

**Alltagsanalogie:** ⏪ Die **Zeitmaschine** - springt zurück und löscht die Zukunft.

```bash
git reset --soft HEAD~1    # Behält Änderungen
git reset --hard HEAD~1    # LÖSCHT Änderungen! ⚠️
```

**Unterschied Reset vs Revert:**
| Reset | Revert |
|-------|--------|
| Löscht Geschichte | Behält Geschichte |
| Gefährlich | Sicher |
| Für lokale Branches | Für shared Branches |

---

### 17. Origin
**Was es ist:** Der **Standard-Name** für das Online-Repository.

**Alltagsanalogie:** 🏠 "Zuhause" - wo dein Projekt ursprünglich herkommt.

```bash
git remote -v
# origin  https://github.com/user/projekt.git (fetch)
# origin  https://github.com/user/projekt.git (push)
```

Du kannst auch mehrere Remotes haben:
- `origin` = GitHub
- `backup` = GitLab
- `production` = Deployment-Server

---

## 📊 Übersichtskarte

```
┌───────────────────────────────────────────────────────────────────┐
│                         GIT BEGRIFFE ÜBERSICHT                     │
├───────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ORTE:                                                            │
│  ├── Repository = Der überwachte Ordner                           │
│  ├── Remote = Online-Version (GitHub)                             │
│  └── Origin = Standard-Name für Remote                            │
│                                                                    │
│  SPEICHERN:                                                       │
│  ├── Commit = Speicherpunkt (Foto)                                │
│  ├── Push = Hochladen                                             │
│  ├── Pull = Herunterladen + Einbauen                              │
│  └── Fetch = Nur Herunterladen                                    │
│                                                                    │
│  VERZWEIGEN:                                                      │
│  ├── Branch = Parallele Version                                   │
│  ├── Main/Master = Hauptversion                                   │
│  ├── HEAD = "Du bist hier"                                        │
│  ├── Checkout = Wechseln                                          │
│  └── Merge = Zusammenführen                                       │
│                                                                    │
│  SPEZIAL:                                                         │
│  ├── Clone = Kopieren                                             │
│  ├── Worktree = Mehrere Branches gleichzeitig                     │
│  ├── Stash = Temporär verstecken                                  │
│  ├── Revert = Sicher rückgängig                                   │
│  └── Reset = Gefährlich zurücksetzen                              │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

---

## 📚 Weiter lesen
- [03-alltag-befehle.md](03-alltag-befehle.md) - Die Befehle für den Alltag
- [04-branch-workflow.md](04-branch-workflow.md) - Wie man richtig mit Branches arbeitet
