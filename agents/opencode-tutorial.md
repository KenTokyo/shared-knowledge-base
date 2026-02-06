# OpenCode + Oh-My-OpenCode Tutorial

## Was ist Oh-My-OpenCode?

Oh-My-OpenCode ist ein Plugin für OpenCode, das ein **Multi-Agenten-System** bereitstellt. Stell dir vor, du hast ein ganzes Entwicklerteam zur Verfügung - jeder Agent hat seine Spezialität.

---

## Die Agenten erklärt

### Sisyphus (Hauptagent)
- **Rolle**: Der Chef/Orchestrator
- **Aufgabe**: Koordiniert alle anderen Agenten, delegiert Aufgaben
- **Empfohlenes Modell**: Claude Opus 4.5 (bei dir: Gemini 3 Pro)

### Oracle
- **Rolle**: Strategischer Berater
- **Aufgabe**: Debugging, Architektur-Entscheidungen, komplexe Problemlösung

### Explore
- **Rolle**: Codebase-Navigator
- **Aufgabe**: Schnelle Suche durch den Code, findet relevante Dateien

### Librarian
- **Rolle**: Dokumentations-Experte
- **Aufgabe**: Durchsucht Dokumentation, versteht die Codebase

### Hephaestus
- **Rolle**: Autonomer Deep-Worker
- **Aufgabe**: Führt komplexe Aufgaben zielorientiert aus

---

## Ultrawork (ulw) - Der Magic-Modus

### Was macht Ultrawork?

Wenn du `ultrawork` oder `ulw` in deinen Prompt schreibst, passiert folgendes automatisch:

1. **Exploration**: Der Agent erkundet deine Codebase
2. **Recherche**: Best Practices werden recherchiert
3. **Planung**: Ein Plan wird erstellt
4. **Implementierung**: Code wird geschrieben (nach deinen Konventionen)
5. **Validierung**: Tests und Diagnostics werden ausgeführt

### Beispiele

```
ulw add authentication to my app
```
→ Agent macht alles selbstständig: sucht bestehende Auth-Patterns, implementiert, testet

```
ulw fix the login bug
```
→ Agent findet den Bug, analysiert, fixt, validiert

```
ultrawork refactor the API routes
```
→ Agent analysiert alle Routes, refactored nach Best Practices

### Wann Ultrawork nutzen?

- **Ja**: Neue Features, Bug-Fixes, Refactoring, komplexe Aufgaben
- **Nein**: Einfache Fragen, kleine Änderungen

---

## Prometheus Mode (Tab-Taste)

Für **sehr komplexe Aufgaben** mit mehr Kontrolle:

1. Drücke **Tab** → Prometheus Mode aktiviert
2. Agent führt ein **Interview** mit dir
3. Analysiert dein Projekt
4. Erstellt einen **detaillierten Plan** mit Akzeptanzkriterien
5. `/start-work` → Atlas führt den Plan aus

### Workflow

```
[Du drückst Tab]
     ↓
Prometheus: "Was möchtest du bauen?"
     ↓
Interview & Analyse
     ↓
Plan wird erstellt
     ↓
/start-work
     ↓
Atlas verteilt Tasks an Agenten
     ↓
Fertig!
```

---

## Modelle konfigurieren

### Wo sind die Konfig-Dateien?

| Datei | Pfad | Zweck |
|-------|------|-------|
| `opencode.json` | `~/.config/opencode/opencode.json` | Plugins & Modell-Definitionen |
| `oh-my-opencode.json` | `~/.config/opencode/oh-my-opencode.json` | Agent-Modell-Zuordnung |

### Deine aktuelle Konfiguration

**opencode.json** - Verfügbare Modelle:
```json
{
  "plugin": ["oh-my-opencode", "opencode-antigravity-auth@latest"],
  "provider": {
    "google": {
      "models": {
        "antigravity-gemini-3-pro": { ... },
        "antigravity-gemini-3-flash": { ... }
      }
    }
  }
}
```

**oh-my-opencode.json** - Agent-Zuordnung:
```json
{
  "agents": {
    "sisyphus": { "model": "google/antigravity-gemini-3-pro" },
    "oracle": { "model": "google/antigravity-gemini-3-pro" },
    "explore": { "model": "google/antigravity-gemini-3-flash" },
    "librarian": { "model": "google/antigravity-gemini-3-flash" }
  }
}
```

### Modell für einen Agent ändern

Bearbeite `~/.config/opencode/oh-my-opencode.json`:

```json
{
  "agents": {
    "sisyphus": { "model": "google/antigravity-gemini-3-pro" }
  }
}
```

### Verfügbare Modelle (Antigravity)

| Modell | Beschreibung | Varianten |
|--------|--------------|-----------|
| `google/antigravity-gemini-3-pro` | Stärkstes Gemini | `low`, `high` |
| `google/antigravity-gemini-3-flash` | Schnelles Gemini | `minimal`, `low`, `medium`, `high` |

### Varianten nutzen

Varianten steuern die "Thinking"-Tiefe:

```bash
# In OpenCode mit Variante
--variant=high
```

---

## Schnellbefehle

| Befehl | Beschreibung |
|--------|--------------|
| `ultrawork` / `ulw` | Automatischer Vollmodus |
| **Tab** | Prometheus Planner Mode |
| `/start-work` | Plan ausführen (nach Prometheus) |

---

## Authentifizierung

### Google (Antigravity) einrichten

```bash
opencode auth login
# → Provider: Google
# → Login method: OAuth with Google (Antigravity)
# → Browser-Anmeldung
```

### Mehrere Accounts (Load-Balancing)

Du kannst bis zu 10 Google-Accounts hinzufügen. Bei Rate-Limits wechselt das System automatisch zum nächsten Account.

---

## Tipps & Best Practices

### 1. Ultrawork für alles Komplexe
Schreib einfach `ulw` davor - der Agent macht den Rest.

### 2. Flash für schnelle Tasks
Gemini 3 Flash ist schneller, Pro ist gründlicher.

### 3. Prometheus für große Features
Bei mehrtägigen Features: Tab → Interview → /start-work

### 4. Kontext-Dateien nutzen
Erstelle eine `AGENTS.md` im Projekt-Root mit Projekt-Infos - wird automatisch geladen.

---

## Troubleshooting

### "Model not found"
→ Prüfe `opencode.json` ob das Modell definiert ist

### "Auth failed"
→ `opencode auth login` erneut ausführen

### Langsame Responses
→ Nutze `--variant=low` oder Flash statt Pro

---

## Dateipfade (Windows)

```
C:\Users\<USER>\.config\opencode\opencode.json
C:\Users\<USER>\.config\opencode\oh-my-opencode.json
```

---

## Links

- [Oh-My-OpenCode GitHub](https://github.com/code-yeongyu/oh-my-opencode)
- [OpenCode Docs](https://opencode.ai/docs)
- [Antigravity Auth Plugin](https://github.com/NoeFabris/opencode-antigravity-auth)
