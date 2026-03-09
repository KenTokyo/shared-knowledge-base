# Notedrill Mobile: Vergleich aller Tool-Call-Systeme und konkrete Learnings

Stand: 8. März 2026

## Was wurde verstanden?
1. Am Ende geht es nicht um hübsche Einzel-Dokus.
2. Es geht darum, was Notedrill konkret verbessern kann.
3. Deshalb sammelt diese Datei die wichtigsten Gemeinsamkeiten und Entscheidungen.

## Der gemeinsame Kern aller starken Systeme

| Kernbaustein | Claude Code | Gemini CLI | Codex | OpenCode | UniAI | Automaker | Notedrill heute |
|---|---|---|---|---|---|---|---|
| echter Host | ja | ja | ja | ja | ja | ja | teils |
| Tool-Loop | ja | ja | ja | ja | ja | ja | vorbereitet |
| MCP | ja | ja | ja | ja | ja | ja | vorhanden |
| Skills | ja | ja | indirekt oder anders | ja | Agent-Prompts | ja | erst teilweise |
| Subagents oder Rollen | ja | ja | indirekt | ja | teilweise | ja | erst teilweise |
| Tool-Rechte | stark | stark | stark | sehr stark | eigenes System | stark | Vertrag stark, Host noch schwach |
| Laufzustand | stark | stark | stark | stark | mittel bis stark | stark | mittel |

## Die wichtigste Gemeinsamkeit
Alle starken Systeme trennen:

1. Host
2. Tools
3. Rechte
4. Kontext
5. Ausgabe oder Events

Notedrill muss genau diese fünf Dinge ebenfalls sauberer trennen.

## Was jedes System am besten vormacht

| System | Größte Stärke für Notedrill |
|---|---|
| Claude Code | Skills, Subagents, MCP als erster Bürger |
| Gemini CLI | sehr klare Tool- und MCP-Architektur |
| Codex | strukturierte Ereignisse und klare Zustände |
| OpenCode | Agent-Rollen plus feine Berechtigungen |
| UniAI | UI-Normalisierung und Sidebar-Transparenz |
| Automaker | Provider-Fabrik und Server-Host |

## Die fünf wichtigsten Architekturverbesserungen für Notedrill

## 1. Ein einheitlicher Run-Vertrag
Notedrill braucht für alle Host-Wege denselben Kern:

1. `runId`
2. `provider`
3. `providerMode`
4. `toolCalls`
5. `toolResults`
6. `generatedArtifacts`
7. `status`
8. `tokenUsage`
9. `fallbackInfo`

## 2. Ein einheitliches Tool-Wörterbuch
Egal ob Claude, Gemini, Codex oder OpenCode:
Notedrill sollte intern immer dieselben Tool-Klassen nutzen.

Beispiele:
1. `Read`
2. `Write`
3. `Edit`
4. `Bash`
5. `Search`
6. `Todo`
7. `WebFetch`
8. `McpTool`

## 3. Skills als Dateisystem-Bausteine
Notedrill sollte Skill-Dateien lesen können.

Empfohlene Richtungen:
1. `.claude/skills/`
2. `.agents/skills/`
3. eigener Profilpfad für mobile Skill-Pakete

## 4. Rollen statt nur ein KI-Chat
Notedrill sollte gezielt Rollen haben:

1. `build`
2. `plan`
3. `explore`
4. `review`
5. `artifact-check`

## 5. MCP und Bridge zusammendenken
Heute existieren beide Welten nebeneinander.
Ziel sollte sein:

1. gleiche Event-Sprache
2. gleiche Rechte
3. gleiche Tool-Anzeige
4. gleiche Artefakt-Verträge

## Was Notedrill sofort übernehmen sollte

| Priorität | Idee | Woher |
|---|---|---|
| sehr hoch | Run-Contract mit Tool-Events | Automaker, Codex, Gemini |
| sehr hoch | Tool-Normalisierung | UniAI, Automaker |
| sehr hoch | Rollen und Modi | OpenCode, Claude Code |
| hoch | Skill-Dateien | Claude Code, Gemini CLI, OpenCode |
| hoch | MCP-Test und Tool-Liste | Automaker |
| hoch | sichtbare Setup-Statuskarten | UniAI, alte Notedrill-Planungen |

## Was Notedrill bewusst nicht kopieren sollte
1. komplettes Fremd-CLI direkt im Mobile-App-Prozess
2. nur auf einen Anbieter setzen
3. lose Tool-Logs ohne Vertrag
4. MCP ohne Rechte- oder Timeout-Denke

## Meine klare Zielarchitektur für Notedrill nach dieser Recherche

### Produktkern
1. Remote-Host
2. eigener Run-Vertrag
3. eigener Artefakt-Vertrag
4. günstiges Standardmodell

### Upgrade-Schicht
1. Desktop-Companion
2. Codex, Gemini, Claude, OpenCode je nach Nutzer

### Erweiterungs-Schicht
1. MCP
2. Skills
3. Subagents
4. Admin- und Schulregeln

## Was im Notedrill-Backend zuerst geändert werden sollte
1. echte `toolCalls`
2. echte `toolResults`
3. echte `generatedArtifacts`
4. echter `claude-code-cli`-Pfad statt nur Name
5. gleiche Event-Sprache wie `AIBridgeService`

## Was im Notedrill-Mobile zuerst geändert werden sollte
1. Host-Modus klar sichtbar machen
2. Tool-Events in derselben Sprache anzeigen
3. Setup- und Login-Status pro Provider sichtbar machen
4. Skills und Rollen später im UI vorbereiten

## Meine härteste Einordnung
Der größte Engpass von Notedrill ist heute nicht die Mobile-App.
Der größte Engpass ist, dass der Host- und Tool-Lauf noch nicht so vollständig und einheitlich ist wie bei den besten Referenzsystemen.

## Nächster sinnvoller Umsetzungsschritt
1. gemeinsamen Run-Contract finalisieren
2. Tool-Wörterbuch definieren
3. Bridge-Events auf echten Host umstellen
4. Rollen und Skills als nächste Schicht planen

## Quellen
1. `00-master-ueberblick-toolcall-architektur.md`
2. `01-claude-code-toolcalls-und-erweiterungen.md`
3. `02-gemini-cli-toolcalls-und-erweiterungen.md`
4. `03-codex-cli-toolcalls-und-erweiterungen.md`
5. `04-opencode-toolcalls-und-erweiterungen.md`
6. `05-uniai-chat-vscode-extension-toolcall-system-und-sidebar.md`
7. `06-automaker-toolcall-system-und-server-orchestrierung.md`
8. `07-notedrill-toolcall-system-ist-zustand-backend-mobile.md`
