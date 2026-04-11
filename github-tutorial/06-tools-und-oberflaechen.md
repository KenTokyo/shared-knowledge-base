# Git Tools & Oberflächen - Die Werkzeugkiste

## 🎯 Terminal vs GUI
Git kannst du auf zwei Arten benutzen:

| Terminal (CLI) | Grafische Oberfläche (GUI) |
|----------------|---------------------------|
| `git commit -m "..."` | Klick auf "Commit" Button |
| Schneller wenn du's kannst | Übersichtlicher für Anfänger |
| Alle Features | Oft vereinfacht |
| Muss man lernen | Intuitiver |

**Empfehlung:** Beides lernen! Terminal für Alltag, GUI für Überblick.

---

## 🌐 Online-Plattformen (Remote Hosts)

### GitHub 🏆
**Der Marktführer.**

| Pro | Contra |
|-----|--------|
| Größte Community | Microsoft-Besitz (seit 2018) |
| GitHub Actions (CI/CD) | Einige Features kostenpflichtig |
| GitHub Copilot Integration | |
| Beste Drittanbieter-Integrationen | |

**Kostenlos:** Unbegrenzte öffentliche Repos, begrenzte private.

---

### GitLab
**Open Source Alternative.**

| Pro | Contra |
|-----|--------|
| Kann selbst gehostet werden | Kleinere Community |
| Alles-in-einem (CI/CD inklusive) | Interface etwas komplexer |
| Mehr Privatsphäre | |
| Komplett kostenlos selbst gehostet | |

**Gut für:** Firmen, die Kontrolle über ihre Daten wollen.

---

### Bitbucket
**Von Atlassian (Jira, Confluence).**

| Pro | Contra |
|-----|--------|
| Jira-Integration | Kleinere Community |
| Kostenlos für kleine Teams | Weniger moderne Features |
| Pipelines inklusive | |

**Gut für:** Teams, die bereits Jira nutzen.

---

### Azure DevOps
**Microsoft's Enterprise-Lösung.**

| Pro | Contra |
|-----|--------|
| Microsoft-Integration | Komplex |
| Enterprise-Features | Weniger Open-Source-fokussiert |
| Azure-Cloud-Integration | |

---

### Vergleichstabelle

| Feature | GitHub | GitLab | Bitbucket | Azure DevOps |
|---------|--------|--------|-----------|--------------|
| Preis (Basic) | Kostenlos | Kostenlos | Kostenlos | Kostenlos |
| Self-Hosted | ❌ (Enterprise) | ✅ | ❌ | ❌ |
| CI/CD | Actions | Inklusive | Pipelines | Inklusive |
| Community | ⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐ |
| Open Source | ❌ | ✅ | ❌ | ❌ |

---

## 💻 Desktop-Anwendungen (GUIs)

### VS Code + Git Integration 🏆
**Bereits eingebaut!**

```
┌─────────────────────────────────────────────────────────┐
│  VS CODE GIT FEATURES                                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Source Control Tab (Strg+Shift+G)                      │
│  ├── Staged Changes     (bereit zum Commit)             │
│  ├── Changes            (geänderte Dateien)             │
│  └── Commit Message     (Nachricht eingeben)            │
│                                                         │
│  Status Bar (unten links)                               │
│  └── Branch-Name + Sync-Status                          │
│                                                         │
│  Timeline (rechte Sidebar)                              │
│  └── Geschichte einer Datei                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Wichtige VS Code Extensions:**
- **GitLens** - Wer hat welche Zeile wann geschrieben
- **Git Graph** - Visuelle Commit-Historie
- **GitHub Pull Requests** - PRs direkt in VS Code

---

### GitHub Desktop
**Offizielle GitHub-App.**

| Pro | Contra |
|-----|--------|
| Super einfach | Nur Basis-Features |
| Drag & Drop | Nur für GitHub |
| Kostenlos | |

**Gut für:** Absolute Anfänger.

---

### Sourcetree
**Von Atlassian, mächtig.**

| Pro | Contra |
|-----|--------|
| Viele Features | Kann überwältigend sein |
| Schöne Visualisierung | Manchmal langsam |
| Kostenlos | |

---

### GitKraken
**Modern und schön.**

| Pro | Contra |
|-----|--------|
| Sehr übersichtlich | Kostenpflichtig für private Repos |
| Cross-Platform | |
| Gboard-Integration | |

---

### Fork
**Leichtgewichtig, Mac + Windows.**

| Pro | Contra |
|-----|--------|
| Schnell | Weniger bekannt |
| Schönes UI | |
| Kostenlos | |

---

## ⌨️ Terminal-Clients

### Git Bash (Windows)
**Git mit Linux-Befehlen auf Windows.**

Wird mit Git für Windows installiert. Ermöglicht Linux-Befehle wie `ls`, `cat`, etc.

### Oh My Zsh (Mac/Linux)
**Schöneres Terminal mit Git-Shortcuts.**

```bash
# Shortcuts in Oh My Zsh
gst     = git status
gco     = git checkout
gcm     = git commit -m
gp      = git push
gl      = git pull
```

### Lazygit
**Terminal-UI für Git.**

```
┌─────────────────────────────────────────────────────┐
│ Lazygit - Terminal aber mit Oberfläche              │
├─────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────────────────┐ │
│ │ Branches │ │ Commits  │ │ Diff/Datei-Inhalt    │ │
│ │          │ │          │ │                      │ │
│ │ main     │ │ c62afbc7 │ │ - alte Zeile         │ │
│ │ feature  │ │ 8df7ecd9 │ │ + neue Zeile         │ │
│ │          │ │ ...      │ │                      │ │
│ └──────────┘ └──────────┘ └──────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 🔧 Nützliche Zusatz-Tools

### gh (GitHub CLI)
**GitHub vom Terminal aus.**

```bash
# Installation
winget install GitHub.cli

# Beispiele
gh repo clone user/repo       # Klonen
gh pr create                  # PR erstellen
gh pr list                    # PRs anzeigen
gh issue create               # Issue erstellen
```

### pre-commit
**Automatische Checks vor dem Commit.**

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    hooks:
      - id: trailing-whitespace
      - id: check-yaml
```

### Husky
**Git Hooks für Node.js-Projekte.**

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  }
}
```

---

## 📱 Mobile Apps

| App | Platform | Features |
|-----|----------|----------|
| GitHub Mobile | iOS, Android | PRs, Issues, Notifications |
| Working Copy | iOS | Vollständiger Git-Client |
| Termux + Git | Android | Terminal-Git |

---

## 🎨 Visualisierungs-Tools

### git log --graph
**Eingebauter Graph.**

```bash
git log --oneline --graph --all
```

### Git Graph (VS Code Extension)
**Interaktiver Graph in VS Code.**

### Gitk
**Eingebaute GUI (alt aber funktioniert).**

```bash
gitk --all
```

---

## 🏆 Meine Empfehlung für dich

```
┌─────────────────────────────────────────────────────────────┐
│  EMPFOHLENES SETUP FÜR EINSTEIGER                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. VS Code                                                 │
│     └── Mit GitLens + Git Graph Extensions                  │
│                                                             │
│  2. GitHub                                                  │
│     └── Für Online-Repos                                    │
│                                                             │
│  3. Terminal (Git Bash auf Windows)                         │
│     └── Für schnelle Befehle                                │
│                                                             │
│  4. GitHub Desktop (optional)                               │
│     └── Für komplexe Merges/Conflicts                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔗 Nützliche Links

### Offizielle Dokumentation
- [Git Buch (kostenlos)](https://git-scm.com/book/de/v2)
- [GitHub Docs](https://docs.github.com/de)
- [Git Cheatsheet](https://training.github.com/downloads/github-git-cheat-sheet/)

### Interaktives Lernen
- [Learn Git Branching](https://learngitbranching.js.org/) - Visuelles Spiel
- [Oh My Git](https://ohmygit.org/) - Git als Videospiel
- [Katacoda Git](https://www.katacoda.com/courses/git) - Hands-on Labs

### Videos
- [Git & GitHub Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk) (freeCodeCamp)
- [Git Explained in 100 Seconds](https://www.youtube.com/watch?v=hwP7WQkmECE) (Fireship)

---

## 📚 Das war's!

Du hast jetzt alle Grundlagen:
1. [Git Grundlagen](01-git-grundlagen.md) - Was ist Git?
2. [Begriffe Glossar](02-begriffe-glossar.md) - Alle Begriffe erklärt
3. [Alltags-Befehle](03-alltag-befehle.md) - Die wichtigsten Befehle
4. [Branch Workflow](04-branch-workflow.md) - Professionell mit Branches
5. [Zusammenarbeit](05-zusammenarbeit.md) - Teamwork
6. **Dieses Dokument** - Tools & Oberflächen

**Nächster Schritt:** Einfach anfangen zu benutzen! 🚀
