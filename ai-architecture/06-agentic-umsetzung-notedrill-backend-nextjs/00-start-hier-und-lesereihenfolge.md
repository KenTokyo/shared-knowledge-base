# Notedrill Backend Next.js: Start hier und Lesereihenfolge

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst keinen kleinen Notizzettel.
2. Du willst eine richtige Backend-Masterplanung mit vielen Phasen.
3. Die Phasen sollen zeigen, wie Notedrill von heute zu einem echten Agent-Backend kommt.

## Wofür dieser Ordner da ist
Dieser Ordner ist die eigentliche Bauplanung.

Er zeigt:
1. die Reihenfolge,
2. den Nutzen pro Phase,
3. die wichtigsten Aufgaben,
4. Risiken und Edge Cases,
5. die Verbindung zu Kosten, MCP, Queue und Nutzer-Servern.

## So solltest du den Ordner lesen
1. zuerst `01-master-taskliste-und-status.md`
2. dann Phase 01 bis Phase 05
3. danach Phase 06 bis 10

## Wenn du nur wenig Zeit hast
Lies in dieser Reihenfolge:

1. `01-master-taskliste-und-status.md`
2. `phasen/01-run-vertrag-und-server-runner.md`
3. `phasen/02-tool-registry-und-app-aktionen-ohne-json-hickhack.md`
4. `phasen/03-provider-routing-budget-und-modelle.md`
5. `phasen/08-host-modelle-shared-remote-companion-und-nutzer-server.md`
6. `phasen/09-abo-preise-und-paketlogik.md`

## Empfohlene volle Reihenfolge
1. `01-master-taskliste-und-status.md`
2. `phasen/01-run-vertrag-und-server-runner.md`
3. `phasen/02-tool-registry-und-app-aktionen-ohne-json-hickhack.md`
4. `phasen/03-provider-routing-budget-und-modelle.md`
5. `phasen/04-kontext-speicher-zusammenfassung-und-rollen.md`
6. `phasen/05-artefakte-importe-und-uebernahme.md`
7. `phasen/06-lange-laeufe-queue-und-24h-agenten.md`
8. `phasen/07-mcp-server-und-externe-werkzeuge.md`
9. `phasen/08-host-modelle-shared-remote-companion-und-nutzer-server.md`
10. `phasen/09-abo-preise-und-paketlogik.md`
11. `phasen/10-messung-tests-und-rollout.md`

## Welche Datei für welche Frage?

| Frage | Beste Datei |
|---|---|
| Welche Phase ist als Nächstes dran? | `01-master-taskliste-und-status.md` |
| Wie kommen wir weg vom JSON-Hickhack? | `phasen/02-tool-registry-und-app-aktionen-ohne-json-hickhack.md` |
| Wie sparen wir Modellkosten? | `phasen/03-provider-routing-budget-und-modelle.md` |
| Wie lösen wir Kontextprobleme? | `phasen/04-kontext-speicher-zusammenfassung-und-rollen.md` |
| Wie kommen lange Läufe und Queue dazu? | `phasen/06-lange-laeufe-queue-und-24h-agenten.md` |
| Wann wäre ein Server pro Nutzer sinnvoll? | `phasen/08-host-modelle-shared-remote-companion-und-nutzer-server.md` |
| Wie bauen wir Pakete und Preise? | `phasen/09-abo-preise-und-paketlogik.md` |

## Mein kurzer Befund
Der wichtigste Sprung ist:
nicht mehr nur bessere Prompts bauen,
sondern einen echten Server-Lauf bauen.

## Nächster sinnvoller Schritt
Direkt in:
`01-master-taskliste-und-status.md`
