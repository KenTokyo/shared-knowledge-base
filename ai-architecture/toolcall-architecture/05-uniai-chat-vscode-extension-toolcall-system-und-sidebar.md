# Notedrill Mobile: UniAI Chat VS Code Extension, Sidebar und Tool-Call-System

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst die lokale Referenz `uniai-chat-vscode-extension` nicht nur am Rand sehen.
2. Wichtig ist vor allem: Was passiert in der Sidebar und im Hintergrund?
3. Genau das hilft uns später für Notedrill Mobile und mögliche Desktop- oder Tablet-Modi.

## Kurzbild
UniAI Chat ist eine VS-Code-Extension mit:

1. Sidebar-Webview,
2. ChatProvider als Orchestrator,
3. lokalen CLI-Providern,
4. MCP-Service,
5. Agent-Prompts,
6. Prozess- und Ereignis-Normalisierung.

## Hauptfluss

| Schritt | Was passiert |
|---|---|
| 1 | Nutzer öffnet die Sidebar |
| 2 | Die Webview sendet `sendMessage` an die Extension |
| 3 | `ChatProvider` bereitet Prompt, Kontext und Modus vor |
| 4 | `ProviderService` wählt Claude, Codex, Gemini oder OpenCode |
| 5 | der passende Process-Service startet das CLI |
| 6 | rohe Stream-Ereignisse werden normalisiert |
| 7 | Sidebar und Verlauf zeigen Text, Tool-Use und Tool-Result |

## Provider-Welt in UniAI

| Provider | Umsetzung |
|---|---|
| Claude | `ClaudeProcessService` |
| Gemini CLI | `GeminiProcessService` |
| Codex | `CodexProcessService` |
| OpenCode | `OpenCodeProcessService` |

## Was `sendMessageToProvider()` wichtig macht
Die Datei `send-message.ts` zeigt, dass UniAI vor dem eigentlichen Provider-Lauf noch viel vorbereitet:

1. `CLAUDE.md`-Hinweis wird ergänzt
2. Thinking-Intensität wird eingebaut
3. Orchestrator-Wrapper können hinzugefügt werden
4. Agent-Prompts werden mitgeführt
5. Status, Tabs und Zeitlimits werden verwaltet

Das ist wichtig:
Der Tool-Call-Host startet nie „roh“, sondern mit vorbereitetem Sitzungszustand.

## Wie rohe Provider-Daten ins UI kommen

### Claude
`claude-events.ts` verarbeitet:
1. Text
2. `thinking`
3. `tool_use`
4. `tool_result`
5. `result`

### Gemini
`gemini-events.ts` arbeitet mit:
1. `init`
2. `message`
3. `tool_use`
4. `tool_result`
5. `result`
6. `error`

### OpenCode
`event-normalization.ts` übersetzt:
1. `text`
2. `tool_call`
3. `tool_result`
4. `step_finish`
5. `error`

in eine gemeinsame interne Form.

### Codex
`CodexProcessService` erkennt JSON-Ereignisse und ordnet sie Tool-Namen und Sitzungen zu.

## Warum diese Normalisierung wichtig ist
Die Extension macht genau das, was Notedrill auch braucht:

1. mehrere Anbieter
2. verschiedene Rohformate
3. am Ende ein gemeinsames UI-Format

## MCP in UniAI

### Was `MCPService` macht
1. legt `mcp-servers.json` im Extension-Speicher an
2. ergänzt einen Permission-Server
3. beobachtet `permission-requests`
4. verarbeitet Antwortdateien

### Bedeutung
MCP ist hier nicht nur ein Einstellungsfeld.
Es ist ein laufendes Dateisystem- und Rechte-System.

## Sidebar und Agent-Gefühl

### Was die Sidebar zeigt
1. Chat
2. Historie
3. Modellwahl
4. MCP-Dialoge
5. Agent-Prompts
6. Tool-Call-Gruppen

### Warum das relevant ist
Der Nutzer sieht:
1. welchen Provider er nutzt
2. welche Tools gelaufen sind
3. welchen Status eine Sitzung hat

Das macht den Agenten verständlicher.

## AntiGravity-Einordnung
Im gegebenen Repo habe ich keine eigene, getrennte „AntiGravity IDE“-Logik gefunden.

Was ich wirklich gefunden habe:
1. eine Sidebar-basierte Agent-Oberfläche
2. `antigravity-*` Modell-IDs in OpenCode-Modelltests

Mein sauberer Schluss:
Wenn du mit „AntiGravity“ die sichtbare Agent-Sidebar aus dem Screenshot meinst, dann ist die passende technische Referenz hier der UniAI-Chat-Sidebar- und Provider-Stack. Eine eigene separate AntiGravity-Engine lag in diesem Repo nicht als klarer Codepfad vor.

## Was Notedrill davon lernen sollte

### 1. Einheitliche Event-Normalisierung
Nicht jeder Provider darf seine eigene UI-Sprache behalten.

### 2. Sichtbare Tool-Gruppen
Die Tool-Call-Anzeige gehört ins UI, nicht nur in Logs.

### 3. Setup-Status gehört zur Produktfläche
Provider-Status, MCP und Auth sollten sichtbar sein.

### 4. Rollen für Chat, Verlauf und Prozesse trennen
UniAI trennt:
1. Webview
2. Process Services
3. Event-Handler
4. Settings

Das ist für Notedrill sehr wertvoll.

## Quellen im Code
1. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/CLAUDE.md`
2. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/providers/ChatProvider.ts`
3. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/providers/chat/message-handling/send-message.ts`
4. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/providers/chat/provider-events/claude-events.ts`
5. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/providers/chat/provider-events/gemini-events.ts`
6. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/ProviderService.ts`
7. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/MCPService.ts`
8. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/ClaudeProcessService.ts`
9. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/GeminiProcessService.ts`
10. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/CodexProcessService.ts`
11. `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/process/OpenCodeProcessService.ts`
