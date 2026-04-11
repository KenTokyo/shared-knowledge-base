# 🖥️ Wie VS Code Daten speichert

> **Ziel:** Die Architektur von VS Code verstehen und lernen, wie ein professioneller Editor Daten zwischen Dateisystem und interner Storage organisiert.

---

## 📋 Inhaltsverzeichnis

1. [Das Workspace-Konzept](#1-das-workspace-konzept)
2. [Der .vscode/ Ordner](#2-der-vscode-ordner)
3. [User vs. Workspace Settings](#3-user-vs-workspace-settings)
4. [Extension Storage](#4-extension-storage)
5. [SQLite in VS Code](#5-sqlite-in-vs-code)
6. [Die Architektur-Übersicht](#6-die-architektur-übersicht)
7. [Lessons Learned für eigene Apps](#7-lessons-learned-für-eigene-apps)

---

## 1. Das Workspace-Konzept

### Was ist ein Workspace?

Ein Workspace in VS Code ist:
- Ein **Ordner** (Single-Folder Workspace)
- Oder mehrere Ordner (Multi-Root Workspace, `.code-workspace` Datei)

Der Workspace definiert den **Kontext** für:
- Welche Dateien sichtbar sind
- Welche Settings gelten
- Welche Extensions aktiv sind
- Welche Tasks/Debug-Configs verfügbar sind

### Single-Folder Workspace

```
my-project/
├── .vscode/           ← Workspace-spezifische Configs
│   ├── settings.json
│   ├── tasks.json
│   └── launch.json
├── src/
├── package.json
└── README.md
```

Öffnen: `code my-project/` oder Datei → Ordner öffnen

### Multi-Root Workspace

```
my-workspace.code-workspace  ← Die Workspace-Datei
```

Inhalt:
```json
{
  "folders": [
    { "path": "./frontend" },
    { "path": "./backend" },
    { "path": "./shared" }
  ],
  "settings": {
    "editor.fontSize": 14
  }
}
```

---

## 2. Der .vscode/ Ordner

### Übersicht

Der `.vscode/` Ordner enthält **projektspezifische Konfigurationen:**

```
.vscode/
├── settings.json      # Editor-Einstellungen für dieses Projekt
├── tasks.json         # Build/Run Tasks
├── launch.json        # Debug-Konfigurationen
├── extensions.json    # Empfohlene Extensions
└── *.code-snippets    # Projekt-spezifische Snippets
```

### settings.json

Projekt-spezifische Einstellungen, die User-Settings überschreiben:

```json
{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### tasks.json

Build-Tasks, die über `Ctrl+Shift+B` oder Task-Runner ausgeführt werden:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build",
      "type": "npm",
      "script": "build",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "Test",
      "type": "npm",
      "script": "test",
      "group": "test"
    }
  ]
}
```

### launch.json

Debug-Konfigurationen:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Current File",
      "type": "node",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal"
    },
    {
      "name": "Debug Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      "args": ["--runInBand"]
    }
  ]
}
```

### extensions.json

Empfohlene Extensions für das Projekt:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ],
  "unwantedRecommendations": [
    "some.conflicting-extension"
  ]
}
```

---

## 3. User vs. Workspace Settings

### Die Settings-Hierarchie

VS Code hat eine **Hierarchie** von Settings:

```
1. Default Settings (VS Code intern)
         ▼
2. User Settings (global für User)
         ▼
3. Workspace Settings (.vscode/settings.json)
         ▼
4. Folder Settings (bei Multi-Root)
```

**Niedrigere überschreiben höhere.**

### Speicherorte

| Typ | Windows | macOS | Linux |
|-----|---------|-------|-------|
| **User Settings** | `%APPDATA%\Code\User\settings.json` | `~/Library/Application Support/Code/User/settings.json` | `~/.config/Code/User/settings.json` |
| **Workspace Settings** | `<project>/.vscode/settings.json` | `<project>/.vscode/settings.json` | `<project>/.vscode/settings.json` |

### Beispiel: Settings-Merge

**User Settings:**
```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 4,
  "editor.formatOnSave": false
}
```

**Workspace Settings:**
```json
{
  "editor.tabSize": 2,
  "editor.formatOnSave": true
}
```

**Effektives Ergebnis:**
```json
{
  "editor.fontSize": 14,      // von User
  "editor.tabSize": 2,        // von Workspace (überschrieben)
  "editor.formatOnSave": true // von Workspace (überschrieben)
}
```

---

## 4. Extension Storage

### globalState vs. workspaceState

Extensions können Daten speichern über die Memento API:

```typescript
// globalState - überall verfügbar
context.globalState.get('myKey');
context.globalState.update('myKey', value);

// workspaceState - nur in diesem Workspace
context.workspaceState.get('myKey');
context.workspaceState.update('myKey', value);
```

### Speicherorte

| Typ | Pfad |
|-----|------|
| **globalState** | `~/.vscode/globalStorage/<extension-id>/` |
| **workspaceState** | `<workspace>/.vscode/storage/<extension-id>/` |

### Extension Storage Ordner

Extensions können auch Dateien speichern:

```typescript
// Globaler Ordner für Extension
const globalStoragePath = context.globalStorageUri.fsPath;
// z.B. ~/.vscode/extensions/my-extension/globalStorage/

// Workspace-spezifischer Ordner
const storageUri = context.storageUri;
```

### Beispiel: UniAI Chat Extension

Unsere VS Code Extension speichert so:

```
<workspace>/.vscode/
├── uniai-chat/
│   ├── conversations/        # JSON-Dateien pro Conversation
│   │   ├── conv-001.json
│   │   └── conv-002.json
│   ├── mcp/
│   │   └── mcp-servers.json  # MCP-Konfiguration
│   └── backups/
│       └── .git/             # Git-Backups
```

---

## 5. SQLite in VS Code

### Wofür VS Code SQLite verwendet

VS Code nutzt SQLite **nur für Performance-Caching**, nicht als primäre Datenquelle:

| Komponente | SQLite-Nutzung |
|------------|---------------|
| **Extension Host** | Extension State Cache |
| **Search Index** | Volltext-Suche über Dateien |
| **Telemetry** | Event-Queue vor Upload |
| **Workbench State** | UI-State (geöffnete Tabs, Positionen) |

### Der wichtige Unterschied

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   SOURCE OF TRUTH          CACHE (SQLite)               │
│   ────────────────         ──────────────               │
│                                                         │
│   • settings.json    ───→   • Parsed Settings Cache     │
│   • Quellcode-Dateien ───→  • Search Index              │
│   • extensions.json  ───→   • Extension Metadata        │
│                                                         │
│   Bei Konflikt:                                         │
│   Datei gewinnt IMMER!                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Warum nicht SQLite als Primary Storage?

1. **Dateien sind menschenlesbar** - Du kannst settings.json in jedem Editor öffnen
2. **Git-Integration** - Dateien können versioniert werden
3. **Portabilität** - Kopiere `.vscode/` und es funktioniert
4. **Debugging** - Bei Problemen: Datei öffnen und prüfen

---

## 6. Die Architektur-Übersicht

### Vollständiges Storage-Modell

```
┌─────────────────────────────────────────────────────────────────┐
│                        VS CODE STORAGE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    USER-EBENE                            │   │
│  │  Speicherort: %APPDATA%/Code/User/                       │   │
│  │                                                          │   │
│  │  • settings.json         Global User Settings            │   │
│  │  • keybindings.json      Keyboard Shortcuts              │   │
│  │  • snippets/*.json       User Snippets                   │   │
│  │  • profiles/             Settings Profiles               │   │
│  │  • globalStorage/        Extension Global State          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  WORKSPACE-EBENE                         │   │
│  │  Speicherort: <project>/.vscode/                         │   │
│  │                                                          │   │
│  │  • settings.json         Workspace Settings              │   │
│  │  • tasks.json            Build/Run Tasks                 │   │
│  │  • launch.json           Debug Configs                   │   │
│  │  • extensions.json       Recommended Extensions          │   │
│  │  • *.code-snippets       Workspace Snippets              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  CACHE/STATE-EBENE                       │   │
│  │  Speicherort: Internal SQLite DBs                        │   │
│  │                                                          │   │
│  │  • workspaceStorage.db   UI State (Tabs, Splits)         │   │
│  │  • searchIndex.db        Volltext Search Cache           │   │
│  │  • extensionHost.db      Extension State Cache           │   │
│  │                                                          │   │
│  │  ⚠️ Wird aus Dateien regeneriert!                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Datenfluss

```
User ändert Setting in UI
         │
         ▼
VS Code schreibt settings.json (SOURCE OF TRUTH)
         │
         ▼
VS Code updated Internal Cache (SQLite)
         │
         ▼
UI reflektiert Änderung
```

```
User ändert settings.json manuell (extern)
         │
         ▼
File Watcher erkennt Änderung
         │
         ▼
VS Code liest & parst settings.json
         │
         ▼
Internal Cache wird invalidiert & neu aufgebaut
         │
         ▼
UI reflektiert Änderung
```

---

## 7. Lessons Learned für eigene Apps

### Prinzipien von VS Code übernehmen

#### 1. Dateien als Source of Truth

```
✅ DO:
- Hauptdaten in lesbaren Dateien (JSON, YAML, Markdown)
- Cache/Index in SQLite (kann jederzeit rebuilt werden)

❌ DON'T:
- Hauptdaten in SQLite speichern
- Binäre Formate für Config
```

#### 2. Hierarchische Settings

```
✅ DO:
- Default Settings (im Code)
- User Settings (global)
- Projekt Settings (im Projektordner)

Niedrigere Ebene überschreibt höhere.
```

#### 3. Portable Projektdateien

```
✅ DO:
- Alles Projekt-relevante in einem Ordner (.vscode/, .notes-config/)
- Ordner kopieren = Projekt mitnehmen

❌ DON'T:
- Projekt-State verstreut über verschiedene Orte
- Abhängigkeit von externen Datenbanken
```

#### 4. File Watcher für Sync

```
✅ DO:
- Externe Änderungen erkennen
- UI automatisch updaten
- Merge-Strategien bei Konflikten

❌ DON'T:
- Nur eigene Änderungen tracken
- Annehmen, dass nur die App schreibt
```

### Konkrete Empfehlung für Notiz-App

```
my-notes/
├── .notes-app/                 # App-Konfiguration
│   ├── config.json             # User Preferences
│   ├── index.json              # Schnell-Index (Cache, rebuilt on start)
│   └── workspace.json          # UI State (offene Tabs, etc.)
├── inbox/                      # Schnelle Notizen
│   └── 2024-01-24-quick.md
├── projects/                   # Organisierte Notizen
│   └── work/
│       └── meeting-2024-01-24.md
├── archive/                    # Archiviert
└── .git/                       # Versionierung (optional)
```

**Format jeder Notiz:**
```markdown
---
title: Meeting Notes
created: 2024-01-24T10:30:00Z
modified: 2024-01-24T11:45:00Z
tags: [meeting, work, project-x]
---

# Meeting Notes

Hier der eigentliche Inhalt...
```

---

## 🎯 Zusammenfassung

| VS Code Konzept | Anwendung für Notiz-App |
|-----------------|-------------------------|
| `.vscode/` Ordner | `.notes-app/` für Config |
| settings.json | config.json für Preferences |
| Workspace-Konzept | Notiz-Ordner als "Vault" |
| Extension Storage | Index-Dateien für Suche |
| SQLite als Cache | Index.json oder SQLite für Suche |
| File Watcher | Externe Änderungen erkennen |
| Hierarchie | Default → User → Workspace Settings |

**Das Wichtigste:**
> Dateien = Source of Truth, SQLite/Cache = Performance-Optimierung

---

**Nächstes Dokument:** [04-notes-app-architecture-filesystem.md](./04-notes-app-architecture-filesystem.md) - Konkrete Architektur für Notiz-App
