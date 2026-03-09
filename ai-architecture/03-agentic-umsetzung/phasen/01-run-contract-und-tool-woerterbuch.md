# Notedrill Mobile: Phase 01 Run-Contract und Tool-Wörterbuch

Stand: 8. März 2026
Status: `DONE`

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

## Was in dieser Phase umgesetzt wurde
1. Gemeinsame Vertrags-Dateien für Lauf, Tool-Wörterbuch, Parser und Artefakte liegen jetzt in `lib/agent/contracts/`.
2. `provider-adapters.ts` und `ai-bridge-service.ts` geben jetzt denselben Run-Kern mit `run`, `toolCalls`, `toolResults` und `generatedArtifacts` weiter.
3. Der mobile Chat nutzt jetzt die gemeinsame Parser-Schicht statt eigener Sonderlogik.
4. Der Chat-Store wurde in kleine Hilfsdateien aufgeteilt, damit `useChatStore.ts` wieder deutlich kleiner ist.
5. Die Chat-Metadaten speichern jetzt auch den echten `run` samt Tool-Daten für Anzeige und spätere Phasen.
6. `npm run type-check` lief nach der Umsetzung erfolgreich durch.

## Noch offen für spätere Phasen
1. Die Backend-Bridge spricht den neuen Vertrag noch nicht überall gleich tief.
2. Host-Routing, Fallback-Regeln und Provider-Wege folgen in den nächsten Phasen.
3. Die Artefakt-Übernahme in Notizen, Quiz und Karten kommt erst in Phase 04 voll dazu.

## Nächste Phase danach
`02-host-modi-routing-und-fallbacks.md`
