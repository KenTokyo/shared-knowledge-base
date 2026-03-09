# Notedrill Mobile: Automaker, Server-Orchestrierung und Tool-Call-System

Stand: 8. März 2026

## Was wurde verstanden?
1. `automaker` ist eine der stärksten lokalen Referenzen für einen serverseitigen Agent-Host.
2. Wichtig ist dort nicht nur Claude, sondern die ganze Provider- und Orchestrator-Struktur.
3. Du willst wissen, was wir für Notedrill daraus lernen können.

## Kurzbild
Automaker ist kein einfacher Chat.
Es ist ein Server- und UI-System für Agenten mit:

1. `AgentService`,
2. `ProviderFactory`,
3. Claude Agent SDK,
4. Codex-Provider,
5. MCP-Test-Service,
6. Kontext-Loader,
7. UI für Tool-Logs und MCP.

## Was `AgentService` macht

| Bereich | Aufgabe |
|---|---|
| Sessions | Gesprächs- und Run-Zustand halten |
| Queue | Prompts stapeln und später fortsetzen |
| Bilder | Bilder lesen und ins Prompt aufnehmen |
| Kontext | Projektkontext und Memory laden |
| Provider | richtigen Provider pro Modell wählen |
| Streaming | Antworten und Events an die UI senden |

## Warum `AgentService` so wichtig ist
Hier sieht man den Kern eines guten Host-Systems:

1. Nutzerprompt
2. Kontext laden
3. Provider wählen
4. Event-Stream schicken
5. Sitzung speichern

## Provider-Fabrik

### Was `ProviderFactory` macht
1. Modellnamen auf Provider mappen
2. Provider-Instanzen erzeugen
3. getrennte Marker für „bewusst getrennt“ prüfen
4. Modelle und Vision-Fähigkeiten zusammenhalten

### Warum das stark ist
Notedrill braucht genau diese Trennung:
1. Modellwahl
2. Providerwahl
3. Hostwahl
4. Rechte und Marker

## Claude in Automaker

### Was der `ClaudeProvider` nutzt
1. `@anthropic-ai/claude-agent-sdk`
2. konfigurierbare Umgebungsvariablen
3. konfigurierbare MCP-Server
4. Subagents
5. `allowedTools`
6. `sdkSessionId`

### Das ist stark, weil
Claude hier nicht nur als Text-API benutzt wird.
Sondern als richtiger Agent-Host mit:
1. Sitzungsfortsetzung
2. Tools
3. MCP
4. Kontextdateien

## Codex in Automaker

### Was der `CodexProvider` besonders gut zeigt
1. CLI und SDK werden getrennt bewertet
2. wenn keine Tool-Welt nötig ist, kann SDK reichen
3. wenn Tools oder MCP nötig sind, wird CLI nötig

### Zusätzliche Stärke
`codex-tool-mapping.ts` übersetzt rohe Operationen in gemeinsame Tool-Namen.

Das ist für Notedrill sehr wichtig.

## Kontext und Memory

### `loadContextFiles()`
Automaker lädt:
1. `.automaker/context/`
2. `.automaker/memory/`
3. Metadaten und Beschreibungen
4. relevantere Memory-Dateien nach Task-Kontext

### Warum das stark ist
Der Agent bekommt nicht blind alles.
Sondern:
1. Kontextdateien
2. Memory-Dateien
3. eine formatierte Prompt-Vorlage

## MCP in Automaker

### Was offiziell im Projekt sichtbar ist
1. MCP ist ein normaler Teil der Settings-Typen
2. es gibt einen `MCPTestService`
3. dieser testet `stdio`, `SSE` und `Streamable HTTP`
4. Tools eines Servers können gelistet werden

### Warum das wichtig ist
Automaker behandelt MCP nicht nur konzeptionell.
Sondern als prüfbare Infrastruktur.

## Skills und Subagents in Automaker

### Sichtbar im Projekt
1. Settings-Typen kennen `skillsSources`
2. Quellen wie `user` und `project` sind vorgesehen
3. Claude-Settings-UI hat eine Skills-Sektion
4. `AgentService` berücksichtigt Skills- und Subagent-Konfiguration

### Bedeutung
Automaker baut den Host so, dass Skills und Subagents kein Extra sind, sondern normale Laufoptionen.

## Tool-Logs in der UI

### Was die UI zeigt
1. Tool-Call-Gruppen
2. Log-Parser
3. Fortschritt
4. Orchestrator-Run-IDs

### Warum das wichtig ist
Nicht nur der Host, auch die UI versteht Tool-Ereignisse.

## Was Notedrill davon lernen sollte

### 1. Provider-Fabrik bauen
Nicht überall von Hand if-else für Modelle.

### 2. Context-Loader und Memory trennen
Nicht alles in einen Systemprompt stopfen.

### 3. MCP testbar machen
Nicht nur Konfig speichern.
Sondern:
1. Verbindung prüfen
2. Tools listen
3. Fehler sauber zeigen

### 4. Session- und Run-Zustand stärker hosten
Automaker ist hier reifer als Notedrill heute.

## Meine kurze Bewertung

| Bereich | Bewertung für Notedrill |
|---|---|
| Server-Host-Struktur | sehr stark |
| Provider-Fabrik | sehr stark |
| Context-Loader | sehr stark |
| MCP-Test-Infrastruktur | stark |
| Tool-Log-UI | stark |
| Mobile direkt | nicht das Ziel |

## Quellen im Code
1. `/mnt/d/CODING/React Projects/uniai-chat/automaker/CLAUDE.md`
2. `/mnt/d/CODING/React Projects/uniai-chat/automaker/apps/server/src/services/agent-service.ts`
3. `/mnt/d/CODING/React Projects/uniai-chat/automaker/apps/server/src/providers/provider-factory.ts`
4. `/mnt/d/CODING/React Projects/uniai-chat/automaker/apps/server/src/providers/claude-provider.ts`
5. `/mnt/d/CODING/React Projects/uniai-chat/automaker/apps/server/src/providers/codex-provider.ts`
6. `/mnt/d/CODING/React Projects/uniai-chat/automaker/apps/server/src/providers/codex-tool-mapping.ts`
7. `/mnt/d/CODING/React Projects/uniai-chat/automaker/apps/server/src/lib/sdk-options.ts`
8. `/mnt/d/CODING/React Projects/uniai-chat/automaker/apps/server/src/services/mcp-test-service.ts`
9. `/mnt/d/CODING/React Projects/uniai-chat/automaker/libs/utils/src/context-loader.ts`
10. `/mnt/d/CODING/React Projects/uniai-chat/automaker/docs/server/providers.md`
