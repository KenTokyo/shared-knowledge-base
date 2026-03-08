# Notedrill Mobile: Phase 01 Run-Contract und Tool-Wörterbuch

Stand: 8. März 2026
Status: `NEXT_PHASE_READY`

## Ziel
Diese Phase baut den gemeinsamen Kern für alle Agent-Läufe.
Ohne diese Phase bleiben Host, UI, Logs und Artefakte nicht sauber verbunden.

## Warum diese Phase zuerst kommt
1. Mobile hat schon gute Vertragsideen.
2. Das aktuelle Backend liefert aber noch nicht denselben Reifegrad.
3. Wenn wir hier nicht aufräumen, bauen spätere Phasen auf wackeligem Boden.

## Was am Ende dieser Phase klar sein soll
1. Ein gemeinsamer `RunContract`
2. Ein einheitliches Tool-Wörterbuch
3. Ein klares Event-Modell für:
   - `started`
   - `chunk`
   - `tool_call`
   - `tool_result`
   - `completed`
   - `failed`
4. Eine eindeutige Form für `generatedArtifacts`

## Hauptaufgaben

### 1. Run-Contract definieren
1. `runId`
2. `sessionId`
3. `provider`
4. `providerMode`
5. `hostMode`
6. `status`
7. `tokenUsage`
8. `fallbackInfo`
9. `startedAt`
10. `endedAt`

### 2. Tool-Call-Form definieren
1. `callId`
2. `toolName`
3. `toolCategory`
4. `arguments`
5. `startedAt`
6. `finishedAt`
7. `sourceProvider`

### 3. Tool-Result-Form definieren
1. `callId`
2. `success`
3. `result`
4. `error`
5. `summary`
6. `artifactRefs`

### 4. Artefakt-Referenz standardisieren
1. `path`
2. `format`
3. `source`
4. `mimeType`
5. `sizeBytes`
6. `contentIncluded`

### 5. Tool-Wörterbuch definieren
Interne Standardnamen:
1. `Read`
2. `Write`
3. `Edit`
4. `Delete`
5. `Bash`
6. `Search`
7. `Todo`
8. `WebFetch`
9. `WebSearch`
10. `McpTool`

## Zuordnung nach Anbieter

| Anbieter | Was übersetzt werden muss |
|---|---|
| Claude Code | `tool_use`, `tool_result`, Tool-Namen direkt |
| Gemini CLI | Tool-Events aus dem Core und MCP-Layer |
| Codex | JSON-Ereignisse und Shell-nahe Tool-Auflösung |
| OpenCode | `tool_call`, `tool_result`, Step- und Error-Events |

## Betroffene Dateien
1. `lib/agent/bridge/types.ts`
2. `lib/agent/bridge/ai-bridge-service.ts`
3. `lib/agent/bridge/provider-adapters.ts`
4. `lib/agent/contracts/*`
5. `features/chat/components/store/useChatStore.ts`
6. `notedrill-backend-nextjs/app/api/agent/bridge/_shared/bridge-route.ts`

## Edge Cases

| Edge Case | Was diese Phase dafür klären muss |
|---|---|
| Tool-Result kommt ohne Tool-Call | toleranter Fallback und Fehlerflag |
| doppeltes `callId` | Duplikat-Regel und Priorität |
| `chunk` kommt nach `completed` | Event-Reihenfolge schützen |
| `tool_call` ohne Argumente | erlaubte Minimalform |
| `generatedArtifacts` ohne Inhalt | Referenz und Ladeweg sauber halten |
| Provider sendet leeres Modell zurück | `requestedModel` und `resolvedModel` getrennt speichern |
| Unicode oder kaputte Umlaute | UTF-8-Feld und Validierung mitführen |
| Lauf wird abgebrochen | eigener Status statt unklarer Fehler |

## Plattformsicht

### iPad und iPhone
1. brauchen den Vertrag für Remote-Läufe
2. dürfen nicht von Provider-Rohdaten abhängen

### Android
1. braucht denselben Vertrag für Remote und Termux-Testweg

### Desktop-Companion
1. braucht denselben Vertrag, obwohl lokale CLIs genutzt werden

## Done-Kriterien
1. Mobile, Backend und Companion sprechen denselben Run-Kern.
2. Tool-Logs können ohne Sonderlogik gerendert werden.
3. `generatedArtifacts` sind einheitlich.
4. Alte Antworten können notfalls noch gemappt werden.

## Nächste Phase danach
`02-host-modi-routing-und-fallbacks.md`
