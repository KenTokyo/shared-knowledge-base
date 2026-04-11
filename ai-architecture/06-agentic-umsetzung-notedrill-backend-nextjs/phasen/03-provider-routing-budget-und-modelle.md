# Notedrill Backend Next.js: Phase 03 Provider-Routing, Budget und Modelle

Stand: 8. März 2026
Status: `DONE`

## Ziel
Diese Phase macht den günstigsten sinnvollen Weg zum Standard
und reserviert teure Modelle nur für echte Mehrwerte.

## Was der User davon hat
1. weniger unnötige Kosten
2. weniger harte Ausfälle bei leeren Quoten
3. klarerer Wechsel zwischen Standard und Premium

## Was wir aus dem heutigen Backend lernen
1. `MultiProviderService` kann schon Fallback
2. aber Kostenlogik und Laufklassen sind noch nicht fein genug getrennt

## Was wir aus Mobile lernen
1. Route-Auswahl und Fallback-Gründe sollten sichtbar sein
2. Modell-Wunsch und echtes Zielmodell müssen getrennt gespeichert werden

## Hauptaufgaben

## 1. Aufgabenklassen definieren
Zum Beispiel:
1. `chat_light`
2. `action_simple`
3. `artifact_heavy`
4. `long_reasoning`
5. `premium_optional`

## 2. Modellklassen definieren
Zum Beispiel:
1. günstiges Standardmodell
2. mittleres Aktionsmodell
3. teures Premiummodell

## 3. Routing-Regeln bauen
Fragen pro Lauf:
1. Was ist die Aufgabe?
2. Wie groß ist der Kontext?
3. Reicht das günstige Modell?
4. Ist Premium freigeschaltet?

## 4. Budget pro Lauf mitführen
Jeder Lauf sollte Grenzen kennen:
1. Prompt-Zeichen
2. geschätzte Tokens
3. Retry-Limit
4. Modell-Eskalation

## 5. Fallback-Leiter definieren
Beispiel:
1. Standardmodell
2. Standardmodell anderer Provider
3. Premium nur wenn erlaubt

## 6. Kosten-Telemetrie pro Lauf speichern
Mindestens:
1. geschätzte Prompt-Tokens
2. geschätzte Antwort-Tokens
3. Retry-Kosten
4. Fallback-Kosten

## Edge Cases

| Edge Case | Antwort |
|---|---|
| Premium-Modell fällt aus | sauber zurück auf Standard |
| Quota leer | Fallback oder klare Meldung |
| User hat kleines Paket | harte Premium-Sperre |
| Lauf wird durch Retry teuer | Abbruchgrenze mit Hinweis |
| Provider meldet anderes Modell zurück | `requestedModel` und `resolvedModel` trennen |

## Betroffene Dateien oder Bereiche
1. `lib/ai/providers/multi-provider-service.ts`
2. `app/api/chat/route.ts`
3. Modellkatalog und Preislogik
4. künftige Run-Telemetrie

## Done-Kriterien
1. Standardwege sind klar definiert
2. teure Modelle eskalieren nur bewusst
3. Kosten pro Lauf sind später auswertbar

## Umsetzung Stand 8. März 2026
1. Ein neuer Routing-Helfer teilt Läufe jetzt in einfache Klassen ein:
   - `chat_light`
   - `action_simple`
   - `artifact_heavy`
   - `long_reasoning`
   - `premium_optional`
2. Der Mehrfach-Provider-Service nutzt diese Klasse jetzt nur dann aktiv, wenn ein Lauf echte Routing-Hinweise mitschickt.
3. Jeder solcher Lauf bekommt jetzt:
   - ein Prompt-Budget
   - ein Retry-Limit
   - eine Premium-Regel
   - eine geordnete Fallback-Reihe
4. Wunsch-Modell und echtes Zielmodell werden jetzt getrennt mitgeführt:
   - `requestedModel`
   - `resolvedModel`
5. Kosten-Hinweise werden pro Lauf geschätzt und im Lauf mitgespeichert:
   - Kostenklasse
   - geschätzte Kosten
   - Preisquelle
6. Chat-Route und Bridge-Route schreiben die Routing-Entscheidung jetzt schon vor dem Modellaufruf in den Lauf-Verlauf.
7. Der Chat bekommt bei echtem Fallback einen klareren Hinweis, welches Ersatz-Modell jetzt läuft.

## Betroffene Dateien bei der Fertigstellung
1. `lib/ai/providers/provider-types.ts`
2. `lib/ai/providers/provider-service.ts`
3. `lib/ai/providers/provider-routing.ts`
4. `lib/ai/providers/multi-provider-service.ts`
5. `lib/agentic/runs/agent-chat-run-contract.ts`
6. `lib/agentic/runs/agent-chat-run-tracker.ts`
7. `lib/agentic/runs/agent-chat-run-routing.ts`
8. `app/api/chat/route.ts`
9. `app/api/agent/bridge/_shared/bridge-route.ts`
10. `hooks/useChatInput.ts`

## Validierung der Phase
1. Die neue Logik bleibt absichtlich aus bei alten Wegen ohne Routing-Hinweise.
2. So ändern wir nicht aus Versehen andere KI-Routen im Projekt.
3. `npm run type-check` lief erfolgreich.

## Nächste Phase danach
`04-kontext-speicher-zusammenfassung-und-rollen.md`
