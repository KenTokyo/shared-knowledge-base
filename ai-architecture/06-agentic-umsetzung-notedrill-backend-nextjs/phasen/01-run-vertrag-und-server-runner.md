# Notedrill Backend Next.js: Phase 01 Run-Vertrag und Server-Runner

Stand: 8. März 2026
Status: `DONE`

## Ziel
Diese Phase baut den gemeinsamen Laufkern.

Am Ende soll jede Agent-Anfrage ein echter Server-Lauf sein,
nicht nur eine Chat-Antwort mit späterem Parsing.

## Was der User davon hat
1. klarere Status-Anzeigen
2. weniger unsichtbare Fehler
3. bessere Wiederaufnahme nach Problemen
4. stabilere Grundlage für alle späteren Agent-Funktionen

## Was wir aus dem heutigen Backend lernen
1. Prompt-Aufbau ist schon stark
2. Provider-Fallback ist schon da
3. aber der Lauf gehört dem Server noch nicht vollständig

## Was wir aus Mobile lernen
1. Event-Sprache ist schon gut vorbereitet
2. `ChatSessionContract` und `OperationsLogContract` sind starke Vorlagen
3. Route-Metadaten und Fallback-Gründe sind wertvoll

## Was am Ende dieser Phase klar sein soll
1. jeder Lauf hat eine `runId`
2. jeder Lauf hat einen Status
3. jeder Lauf hat echte Events
4. jeder Lauf kann später Tools und Artefakte anhängen

## Hauptaufgaben

## 1. Einen gemeinsamen `RunContract` definieren
Pflichtfelder:
1. `runId`
2. `sessionId`
3. `requestedProvider`
4. `resolvedProvider`
5. `responseContractMode`
6. `status`
7. `startedAt`
8. `endedAt`
9. `retryOfRunId`
10. `tokenUsage`

## 2. Eine gemeinsame Event-Sprache definieren
Pflicht-Events:
1. `started`
2. `chunk`
3. `tool_call`
4. `tool_result`
5. `artifact_ready`
6. `completed`
7. `failed`
8. `cancelled`

## 3. Server-Run-Store anlegen
Der Server soll speichern:
1. Lauf-Metadaten
2. Event-Folge
3. Retry-Kette
4. Fallback-Kette
5. letzte Fehlerursache

## 4. `/api/chat` auf Run-Start umbauen
Die Route soll nicht nur streamen,
sondern vorher einen Lauf eröffnen und danach sauber abschließen.

## 5. Bridge-Welt auf denselben Kern ziehen
`/api/chat` und `/api/agent/bridge/*` dürfen später nicht zwei getrennte Laufsprachen haben.

## 6. Erste Server-Telemetrie anhängen
Pro Lauf sichtbar:
1. Prompt-Größe
2. Antwort-Größe
3. Provider-Fallback
4. Retry-Anzahl
5. Fehlerart

## Edge Cases

| Edge Case | Was diese Phase klären muss |
|---|---|
| Stream bricht mitten im Lauf ab | Lauf auf `failed` oder `cancelled` setzen |
| Provider wechselt im Fallback | alter und neuer Provider müssen im Lauf sichtbar sein |
| Retry auf kaputtes JSON | muss neue Run-Verknüpfung bekommen |
| Browser lädt neu | Lauf darf auf dem Server trotzdem nachvollziehbar bleiben |
| Antwort kommt doppelt an | Event- und Run-IDs müssen idempotent sein |
| späteres Tool-Event fehlt noch | Event-Sprache muss trotzdem schon vorbereitet sein |

## Betroffene Dateien oder Bereiche
1. `app/api/chat/route.ts`
2. `app/api/agent/bridge/_shared/bridge-route.ts`
3. `lib/ai/providers/multi-provider-service.ts`
4. neuer Bereich für `run-contract` oder `run-store`
5. `components/agentic/hooks/useAssistantArbitration.ts`
6. Mobile-Vertragsangleichung in späterem Schritt

## Done-Kriterien
1. jeder Lauf hat eine `runId`
2. jeder Lauf hat einen klaren Status
3. Server kann Lauf und Fehler später wiederfinden
4. `/api/chat` und Bridge sprechen dieselbe Grundsprache

## Nicht Ziel dieser Phase
1. noch kein voller Tool-Loop
2. noch kein MCP
3. noch keine Queue

## Was in dieser Phase konkret umgesetzt wurde
1. Ein neuer Lauf-Vertrag fuer `runId`, Status, Events, Retry und Telemetrie wurde angelegt.
2. Ein gemeinsamer Lauf-Speicher fuer Chat und Bridge wurde eingebaut.
3. `/api/chat` startet und beendet jetzt echte Server-Laeufe statt nur losem Streaming.
4. Die Bridge-Routen nutzen denselben Laufkern und liefern dieselben Run-Header zurueck.
5. Provider-Versuche, Fallbacks und Abschlussdaten landen jetzt im Lauf mit drin.
6. Der Chat sendet die Sitzungs-ID jetzt sauber in den Backend-Lauf.

## Was das konkret fuer den User bedeutet
1. Ein Chat-Lauf ist jetzt spaeter besser nachvollziehbar.
2. Fehler und Fallbacks verschwinden nicht mehr so leicht im Nichts.
3. Chat und Bridge verhalten sich bei Laeufen jetzt aehnlicher.

## Nächste Phase danach
`02-tool-registry-und-app-aktionen-ohne-json-hickhack.md`
