# Notedrill Mobile: Ist-Zustand vom Tool-Call-System in Backend und Mobile

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst nicht nur Fremdsysteme vergleichen.
2. Du willst wissen, wo Notedrill heute wirklich steht.
3. Dabei sollen `notedrill-backend-nextjs` und `notedrill-mobile-react-native-expo` zusammen gelesen werden.

## Kurzbild
Notedrill hat heute schon viele gute Bausteine.
Aber der Lauf ist noch nicht überall gleich stark.

## Mobile heute

### `useChatStore.ts`
Die Mobile-App:
1. baut Prompt und Modellwahl,
2. ruft Bridge-Endpunkte auf,
3. liest Text und Tool-Daten aus der Antwort,
4. zeigt Tool-Log-Meldungen im Chat,
5. übernimmt erzeugte Artefakte kontrolliert.

### Was dabei gut ist
1. Tool-Calls und Tool-Results sind als Felder vorgesehen
2. `generatedArtifacts` sind vorgesehen
3. Modell-Mismatch und Fallback werden schon geprüft

### Was noch fehlt
Die echte Tiefe hängt noch vom Host ab.
Wenn der Host nichts Sinnvolles liefert, kann Mobile nur wenig anzeigen.

## Mobile Bridge-Schicht

### `AIBridgeService`
Diese Schicht ist schon deutlich reifer als die alte einfache Bridge.

Sie hat:
1. eigene Eventtypen
2. eigenen Contract-Check
3. Route-Resolver
4. Operations-Log
5. ChatSession-Contract

### Bridge-Event-Typen
1. `started`
2. `chunk`
3. `tool_call`
4. `tool_result`
5. `completed`
6. `failed`

Das ist genau die Art von Vertrag, die Notedrill künftig überall gleich brauchen wird.

## Provider-Adapter in Mobile

### Was `provider-adapters.ts` heute macht
1. Bridge-HTTP-Calls an `codex-cli`, `gemini-cli`, `claude-code-cli`
2. Antwort parsen
3. Tool-Calls und Tool-Results auslesen
4. in Bridge-Events umwandeln

### Starker Punkt
Die Mobile-Seite denkt schon in einem gemeinsamen Ereignisvertrag.

## Notedrill Backend Next.js heute

### Was die Bridge-Route macht
Die aktuelle Route in `app/api/agent/bridge/_shared/bridge-route.ts`:
1. nimmt Prompt an
2. ruft `MultiProviderService`
3. erzeugt Textantwort
4. füllt `toolCalls: []`
5. füllt `toolResults: []`

### Das Kernproblem
Die Route heißt wie ein Tool-Host,
liefert aber im aktuellen Stand noch keinen echten Tool-Loop.

Das heißt:
1. Mobile ist schon weiter als dieser Host
2. die Live-Brücke ist noch schwächer als der neue Contract-Gedanke

## MCP in Notedrill

### Was schon da ist
1. eigene MCP-Module in `lib/mcp/`
2. eigener `mcp-adapter.ts`
3. eigene MCP-Server- und Resource-Ideen
4. frühere Planungen zur SDK-Integration

### Was das bedeutet
Notedrill hat MCP schon konzeptionell und technisch vorbereitet.
Aber der Produktweg ist noch nicht überall sauber zusammengezogen.

## Verträge in Notedrill

### Was heute schon gut ist
1. `ChatSessionContract`
2. `OperationsLogContract`
3. Agent-Artefakt-Vertrag
4. Pfad-Whitelist
5. UTF-8-Prüfung

### Warum das stark ist
Viele andere Systeme haben gute Tool-Hosts, aber weniger saubere Produktverträge.
Hier hat Notedrill schon eine echte Stärke.

## Größte Lücke heute

| Bereich | Heute | Ziel |
|---|---|---|
| Mobile UI | Tool-Daten vorbereitet | echter reichhaltiger Tool-Feed |
| Bridge Contract | gut gedacht | überall gleich live genutzt |
| Next.js Bridge | Text stark, Tools schwach | voller Tool-Loop |
| MCP | vorhanden | mit Bridge und Run-Contract vereinen |
| Artefakte | kontrollierte Übernahme vorhanden | echter End-to-End-Lauf mit Tool-Quelle |

## Was Notedrill schon besser macht als manche Referenzen
1. klare Artefakt-Übernahme
2. Pfad- und UTF-8-Prüfung
3. Bridge-Vertrag mit Chat- und Operations-Logs
4. starke Mobile-Fokus-Grenzen

## Was Notedrill klar von anderen übernehmen sollte
1. echte Tool-Normalisierung wie UniAI
2. Provider-Fabrik und Hosttrennung wie Automaker
3. Skills und Kontext-Bausteine wie Claude und Gemini
4. feinere Tool-Rechte wie OpenCode

## Mein ehrlicher Befund
Notedrill hat heute schon die richtigen Bauteile.
Aber:
Der aktuelle produktive Tool-Lauf ist noch nicht so geschlossen wie bei den starken Referenzsystemen.

## Quellen im Code
1. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/features/chat/components/store/useChatStore.ts`
2. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/lib/agent/bridge/ai-bridge-service.ts`
3. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/lib/agent/bridge/provider-adapters.ts`
4. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/lib/agent/bridge/types.ts`
5. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/lib/agent/contracts/index.ts`
6. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/lib/sdk/adapters/mcp-adapter.ts`
7. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/docs/unified-migration/phase-09-sdk-integration/sdk-integration.md`
8. `/mnt/d/CODING/React Projects/notedrill/notedrill-backend-nextjs/app/api/agent/bridge/_shared/bridge-route.ts`
9. `/mnt/d/CODING/React Projects/notedrill/notedrill-backend-nextjs/app/api/agent/bridge/codex-cli/route.ts`
10. `/mnt/d/CODING/React Projects/notedrill/notedrill-backend-nextjs/app/api/agent/bridge/gemini-cli/route.ts`
