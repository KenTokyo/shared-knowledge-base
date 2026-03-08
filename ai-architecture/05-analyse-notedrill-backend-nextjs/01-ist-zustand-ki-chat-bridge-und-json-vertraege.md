# Notedrill Backend Next.js: Ist-Zustand von KI-Chat, Bridge und JSON-Verträgen

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst den heutigen Backend-Stand ehrlich sehen.
2. Du willst wissen, warum sich der Flow noch zu sehr nach Chat plus JSON anfühlt.
3. Du willst daraus klare Umbau-Entscheidungen ableiten.

## Das wichtigste Kurzbild
Das Backend hat heute schon viele gute Bausteine.

Vor allem:
1. guten Prompt-Zusammenbau,
2. klare Vertragsmodi,
3. lokale JSON-Rettung bei kaputten Antworten,
4. automatische Open-In-Übernahme.

Aber:
Der Kern ist noch meistens `Text zuerst, JSON danach`.

Das heißt:
Die App tut oft erst dann etwas, wenn das Modell das richtige Format sauber zurückgeschrieben hat.

## Die drei heutigen Ebenen

### 1. Der eigentliche Web-Chat
Die stärkere Route ist heute:
`app/api/chat/route.ts`

Dort passiert:
1. Provider-Auswahl mit `MultiProviderService`
2. Prompt-Orchestrierung mit `buildPromptOrchestration()`
3. Auswahl zwischen `nd_actions` und `open_in`
4. Streaming der Antwort zurück in den Chat

### 2. Die Client-Seite nach der Antwort
In `components/agentic/hooks/useAssistantArbitration.ts` wird die KI-Antwort danach geprüft.

Dabei passiert:
1. `ND_ACTIONS_V1` erkennen
2. Open-In-JSON erkennen
3. lokale Reparatur probieren
4. bei Bedarf Kurz-Retry schicken
5. dann erst Aktionen oder Importe auslösen

### 3. Die alte Bridge-Welt
Die Mobile-Bridge-Route
`app/api/agent/bridge/_shared/bridge-route.ts`
liefert heute nur:
1. `text`
2. `usage`
3. `toolCalls: []`
4. `toolResults: []`

Das ist für einen echten Tool-Host zu wenig.

## So läuft der Chat heute vereinfacht

```mermaid
flowchart TD
    A[User sendet Nachricht] --> B[/api/chat]
    B --> C[Prompt-Orchestrierung]
    C --> D[Provider streamt Text]
    D --> E[Assistant-Text im Frontend]
    E --> F{Welcher Vertragsmodus ist aktiv?}
    F -->|nd_actions| G[ND_ACTIONS parsen und validieren]
    F -->|open_in| H[Open-In JSON erkennen]
    G --> I{Format okay?}
    H --> J{Format okay?}
    I -->|ja| K[Aktion ausführen]
    I -->|nein| L[Retry oder Fallback]
    J -->|ja| M[Import ausführen]
    J -->|nein| L
```

## Was heute schon stark ist

| Bereich | Was schon gut ist | Warum das wichtig ist |
|---|---|---|
| Prompt-Zusammenbau | `prompt-orchestrator.ts` baut Core, Zielgruppe, Skills und Budget sauber zusammen | spart Chaos im System-Prompt |
| Zwei Vertragsmodi | `nd_actions` und `open_in` sind getrennt | weniger Format-Mischung |
| Lokale Reparatur | `json-repair.ts` und Parser retten häufig kaputte JSON-Antworten | spart unnötige Komplettfehler |
| Open-In-Autoimport | `open-in-contract-handler.ts` übernimmt Inhalte automatisch | weniger manuelle Arbeit für den User |
| Skill-Fragmente | aktive Skills werden gezielt geladen | weniger unnötiger Prompt-Text |
| Prompt-Budget | optionale Layer können abgeschnitten werden | hilft gegen Prompt-Wachstum |

## Was heute noch wackelt

| Problem | Was das für den User bedeutet | Wo es sichtbar wird |
|---|---|---|
| Modell muss App-Aktionen als JSON zurückschreiben | wenn das Format kippt, wird nichts gespeichert | `assistant-command-parser.ts` |
| Parsing sitzt vor allem im Frontend | der Server besitzt den Lauf nicht komplett | `useAssistantArbitration.ts` |
| Retry ist wieder ein neuer Chat-Schritt | kostet extra Kontext und extra Tokens | `buildResponseContractRepairPrompt()` |
| Tool-Feed ist nicht der echte Hauptweg | der User sieht kaum echte Schritt-für-Schritt-Tools | `bridge-route.ts` |
| Zwei Welten laufen nebeneinander | Web-Chat und Bridge ziehen noch nicht sauber an einem Strang | `/api/chat` gegen `/api/agent/bridge/*` |
| Provider-Fallback ist da, aber kein echter Tool-Loop | Wechsel des Modells klappt eher als echtes Agent-Arbeiten | `multi-provider-service.ts` |

## Das Kernproblem in einem Satz
Heute muss das Modell oft erst eine Art Befehlszettel zurückgeben,
damit die App überhaupt arbeiten kann.

Für einfachen Chat ist das okay.
Für starke Agent-Läufe ist das zu fragil.

## Warum sich das Parsing noch komisch anfühlt

### 1. Die App wartet auf das richtige Ausgabeformat
Statt:
`Tool aufrufen -> Ergebnis zurück -> weiter`

läuft es oft eher so:
`Text erzeugen -> JSON erkennen -> JSON reparieren -> dann App-Aktion`

### 2. Fehler kommen spät
Viele Probleme merkt man erst:
1. nach der fertigen Antwort,
2. beim Parsen,
3. oder beim Retry.

Das heißt:
Der User hat schon gewartet, aber die Arbeit ist noch nicht sicher passiert.

### 3. Der Lauf gehört noch nicht sauber dem Server
Ein echter Agent-Host sollte:
1. Run-ID haben,
2. Tool-Schritte speichern,
3. Fehler speichern,
4. Artefakte speichern,
5. Wiederaufnahme kennen.

Heute ist davon einiges vorbereitet, aber noch nicht der Hauptweg.

## Was im Code besonders auffällt

### `app/api/chat/route.ts`
Stark bei:
1. Prompt-Orchestrierung
2. Provider-Fallback
3. Vertragsmodus

Noch offen bei:
1. echtem Run-Store
2. echten Server-Tools
3. echter Tool-Event-Sprache

### `components/agentic/hooks/useAssistantArbitration.ts`
Stark bei:
1. ND- und Open-In-Erkennung
2. Retry-Steuerung
3. Fallbacks für verpasste ND-Blöcke

Noch offen bei:
1. zu viel Verantwortung im Frontend
2. keine volle Server-Hoheit über den Lauf

### `lib/agentic/commands/assistant-command-parser.ts`
Stark bei:
1. robuster ND-Block-Erkennung
2. lokaler JSON-Reparatur

Noch offen bei:
1. Das beste Parsing ist immer noch schlechter als ein echter Tool-Call.

### `app/api/agent/bridge/_shared/bridge-route.ts`
Stark bei:
1. einfachem Fallback zwischen Providern

Noch offen bei:
1. `toolCalls`
2. `toolResults`
3. echter Bridge-Lauf

## Was Mobile heute schon voraus hat
Die Mobile-Seite denkt schon stärker in:
1. `started`
2. `chunk`
3. `tool_call`
4. `tool_result`
5. `completed`
6. `failed`

Das ist noch nicht automatisch der bessere Produktweg.
Aber es ist die bessere Lauf-Sprache.

## Mein ehrlicher Befund
Der Web-Chat ist heute produktiver als die alte Bridge.
Die alte Bridge ist aber vom Laufvertrag her näher an einem echten Agent-Host.

Genau diese zwei Stärken müssen zusammenkommen.

## Die wichtigste Architektur-Folge daraus
Der nächste große Schritt ist nicht:
"noch mehr Parser bauen".

Der nächste große Schritt ist:
"weniger freie JSON-Rückgabe und mehr echte Server-Tools".

## Quellen im Code
1. `app/api/chat/route.ts`
2. `lib/agentic/prompts/prompt-orchestrator.ts`
3. `lib/agentic/prompts/system-prompt-v2.ts`
4. `components/agentic/hooks/useAssistantArbitration.ts`
5. `lib/agentic/commands/assistant-command-parser.ts`
6. `lib/agentic/commands/open-in-json-detector.ts`
7. `components/agentic/utils/open-in-contract-handler.ts`
8. `app/api/agent/bridge/_shared/bridge-route.ts`
9. `lib/ai/providers/multi-provider-service.ts`
