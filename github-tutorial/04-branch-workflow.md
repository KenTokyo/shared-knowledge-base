# Branch Workflow - Professionell mit Branches arbeiten

## 🎯 Warum Branches?
Branches sind wie **parallele Universen** - du kannst experimentieren, ohne das Hauptprojekt zu gefährden.

---

## 🌳 Der Branch-Baum

```
                    feature/neue-buttons
                         ┌─────●─────●
                        /
main ●─────●─────●─────●─────●─────●─────●
                  \             /
                   └─────●─────┘
                    bugfix/login
```

**Legende:**
- `●` = Ein Commit
- Jeder Strich = Geschichte
- Abzweigungen = Branches

---

## 📋 Branch-Namenskonventionen

### Professionelle Präfixe

| Präfix | Bedeutung | Beispiel |
|--------|-----------|----------|
| `feature/` | Neues Feature | `feature/dark-mode` |
| `bugfix/` | Fehlerbehebung | `bugfix/login-crash` |
| `hotfix/` | Dringende Reparatur | `hotfix/security-patch` |
| `chore/` | Aufräumarbeiten | `chore/update-dependencies` |
| `refactor/` | Code umstrukturieren | `refactor/user-service` |
| `experiment/` | Experimente | `experiment/new-ui-idea` |

### Gute Branch-Namen
```
✅ feature/user-profile-page
✅ bugfix/cart-total-calculation
✅ chore/remove-unused-imports

❌ mein-branch
❌ test123
❌ final-final-v2
```

---

## 🔄 Die Standard-Workflows

### 1. Feature Branch Workflow (am häufigsten)

```
1. Neuen Branch erstellen
   git switch -c feature/mein-feature

2. Arbeiten und committen
   git add .
   git commit -m "Feature implementiert"

3. Updates von main holen (wichtig!)
   git pull origin main

4. Branch pushen
   git push -u origin feature/mein-feature

5. Pull Request erstellen (auf GitHub)

6. Nach Review: Merge in main
```

### 2. Git Flow (für größere Projekte)

```
main              ●─────────────────●──────────────────●
(Production)             ↑                    ↑
                         │                    │
develop           ●──●───┴────●───●───────────┴───●
                     │        ↑       ↑
                     │        │       │
feature/a            └───●────┘       │
                                      │
feature/b                    └───●────┘
```

**Branches im Git Flow:**
- `main` = Produktions-Code (was live ist)
- `develop` = Entwicklungs-Version
- `feature/*` = Einzelne Features
- `release/*` = Vorbereitung für Release
- `hotfix/*` = Notfall-Reparaturen

---

## 🎬 Dein konkreter Fall: TanStack vs Next.js

Du willst:
- **main** = Saubere Version (vor TanStack)
- **tanstack** = Experimentelle Version (mit TanStack)

### So würde das aussehen:

```
Vorher:
main  ●─●─●─●─●─●─●─●  (alles gemischt, TanStack drin)
           ↑
        c62afbc7 (letzter sauberer Commit)

Nachher:
                    tanstack
                     ●─●─●─●─●  (mit TanStack)
                    /
main  ●─●─●─●─●─●─●  (sauber, ohne TanStack)
              ↑
           c62afbc7
```

---

## 🛠️ Wichtige Branch-Operationen

### Branch erstellen
```bash
# Neuen Branch erstellen (ohne wechseln)
git branch feature/neu

# Neuen Branch erstellen UND wechseln
git switch -c feature/neu
```

### Branches anzeigen
```bash
# Lokale Branches
git branch

# Alle Branches (auch Remote)
git branch -a

# Mit letztem Commit
git branch -v
```

### Branch wechseln
```bash
# Modern (empfohlen)
git switch feature/mein-feature

# Classic
git checkout feature/mein-feature
```

### Branch löschen
```bash
# Lokalen Branch löschen
git branch -d feature/fertig

# Erzwingen (wenn nicht gemerged)
git branch -D feature/abbrechen

# Remote Branch löschen
git push origin --delete feature/alt
```

### Branch umbenennen
```bash
# Aktuellen Branch umbenennen
git branch -m neuer-name

# Bestimmten Branch umbenennen
git branch -m alter-name neuer-name
```

---

## 🔀 Merge vs Rebase

### Merge (Standard, sicher)
**Erstellt einen "Zusammenführungs-Commit".**

```bash
git switch main
git merge feature/mein-feature
```

```
feature   ●───●───●
                   \
main      ●───●─────M  (M = Merge-Commit)
```

### Rebase (sauberer, aber gefährlicher)
**Schreibt die Geschichte um.**

```bash
git switch feature/mein-feature
git rebase main
```

```
Vorher:
main      ●───●───●
               \
feature         ●───●

Nachher:
main      ●───●───●
                   \
feature             ●───●  (Geschichte umgeschrieben!)
```

⚠️ **Goldene Regel:** Nie auf shared Branches rebasen!

---

## 💡 Best Practices

### 1. Kleine, fokussierte Branches
```
✅ feature/add-login-button
✅ feature/add-logout-button

❌ feature/entire-authentication-system  (zu groß!)
```

### 2. Regelmäßig main holen
```bash
# Mindestens einmal täglich
git switch main
git pull
git switch feature/mein-feature
git merge main
```

### 3. Saubere Commit-Historie
```bash
# Vor dem Merge aufräumen (optional)
git rebase -i HEAD~3  # Letzte 3 Commits bearbeiten
```

### 4. Branch nach Merge löschen
```bash
git branch -d feature/fertig
git push origin --delete feature/fertig
```

---

## 📊 Entscheidungshilfe: Wann welcher Branch?

```
┌────────────────────────────────────────────────────────────┐
│  BRAUCHE ICH EINEN NEUEN BRANCH?                           │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Einzeiler-Fix (Typo, CSS)?                                │
│  └── Nein, direkt auf main (wenn du alleine arbeitest)     │
│                                                            │
│  Neues Feature?                                            │
│  └── JA! → feature/beschreibender-name                     │
│                                                            │
│  Bug beheben?                                              │
│  └── JA! → bugfix/was-kaputt-war                          │
│                                                            │
│  Experiment/Prototyp?                                      │
│  └── JA! → experiment/idee-name                           │
│                                                            │
│  Team-Projekt?                                             │
│  └── IMMER Branch für alles!                              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 📚 Weiter lesen
- [05-zusammenarbeit.md](05-zusammenarbeit.md) - Mit Teams arbeiten
- [06-tools-und-oberflaechen.md](06-tools-und-oberflaechen.md) - GitHub, VS Code, etc.
