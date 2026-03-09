# Notedrill Backend Next.js: Phase 04 Kontext, Speicher, Zusammenfassung und Rollen

Stand: 8. März 2026
Status: `DONE`

## Ziel
Diese Phase soll Kontextprobleme spürbar senken.

## Was der User davon hat
1. weniger Abschweifen
2. weniger Wiederholen
3. stabilere lange Arbeitswege

## Was wir aus dem heutigen Backend lernen
1. das Prompt-System ist schon modular
2. aber lange Chats und Retries blähen den Verlauf auf

## Was wir aus Mobile und Referenzen lernen
1. Laufpakete sind besser als endlose Rohverläufe
2. Rollen helfen gegen Mischmasch
3. Skills sollten klein und gezielt sein

## Hauptaufgaben

## 1. Kontext-Schichten festlegen
1. globale Regeln
2. Nutzer- oder Profilkontext
3. Arbeitsbereichskontext
4. Run-Zusammenfassung
5. letzte frische Nachrichten

## 2. Zusammenfassungen automatisch erzeugen
Nach Grenzen wie:
1. Nachrichtenzahl
2. Prompt-Größe
3. Retry-Häufigkeit

## 3. Rollen einführen
Erste Rollen:
1. `plan`
2. `build`
3. `review`
4. `artifact_check`
5. `explain`

## 4. Skill-Layer weiter verkleinern
Nur das laden, was zum Lauf passt.

## 5. Retry-Lärm aus dem Hauptkontext raushalten
Reparatur-Nachrichten und Fehlerketten sollen nicht dauernd den normalen Arbeitskontext aufblasen.

## Edge Cases

| Edge Case | Antwort |
|---|---|
| falsche Zusammenfassung | neu berechnen können |
| Rolle passt nicht | Fallback auf neutrale Rolle |
| zu viele Skills aktiv | Auto-Limit |
| Verlauf wird zu groß | harter Schnitt mit Übergabe-Paket |

## Betroffene Dateien oder Bereiche
1. `lib/agentic/prompts/*`
2. `lib/agentic/session/*`
3. `lib/agentic/skills/*`
4. künftiger Run-Store

## Done-Kriterien
1. Kontext läuft in Schichten
2. Zusammenfassungen sind normaler Teil des Systems
3. Rollen und Skills laden gezielter

## Nächste Phase danach
`05-artefakte-importe-und-uebernahme.md`

## Umsetzung Stand 8. Maerz 2026
1. Ein neuer serverseitiger Kontext-Baustein baut jetzt pro Lauf eine klare Paket-Struktur:
   - Rolle
   - Workspace-Kontext
   - Lauf-Zusammenfassung
   - letzte frische Nachrichten
2. Alte Retry-Nachrichten werden aus dem normalen Hauptkontext herausgenommen.
3. Aeltere Chat-Teile werden in eine kurze Uebergabe-Zusammenfassung gepackt statt immer komplett mitzuwandern.
4. Rollen werden jetzt automatisch erkannt:
   - `plan`
   - `build`
   - `review`
   - `artifact_check`
   - `explain`
5. Skill-Bloecke werden je nach Rolle kleiner geladen.
6. Chat-Route und Bridge-Route nutzen denselben neuen Kontext-Weg.

## Betroffene Dateien bei der Fertigstellung
1. `db/finders/local/agent-session-context-finder.local.ts`
2. `lib/agentic/context/run-context-packet.ts`
3. `lib/agentic/prompts/prompt-orchestrator.ts`
4. `app/api/chat/route.ts`
5. `app/api/agent/bridge/_shared/bridge-route.ts`

## Validierung der Phase
1. Die wichtigste Aenderung war nicht eine neue KI-Regel, sondern weniger Kontext-Muell pro Lauf.
2. Damit wird der Prompt kuerzer, Rollen werden klarer und Retry-Laerm stoert weniger.
3. Phase 05 ist jetzt der naechste sinnvolle Schritt.
