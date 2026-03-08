# Notedrill Mobile: Masterplanung Agentic-Umsetzung und Taskliste

Stand: 8. März 2026

## Was wurde verstanden?
1. Die alte Taskliste war zu klein und zu grob.
2. Du brauchst eine echte Masterplanung.
3. Diese Masterplanung soll viele Untertasks haben, auf die Phasen-Dateien zeigen und nach jedem Chat weiter gepflegt werden.

## Wofür diese Datei da ist
Diese Datei ist jetzt die Haupt-Taskliste für die Agentic-Umsetzung.
Sie ist nicht nur eine lose Ideensammlung.

Sie soll:
1. den Gesamtstand zeigen,
2. alle Umsetzungsphasen referenzieren,
3. sagen, was als Nächstes dran ist,
4. nach jedem Chat als Status- und Verlaufsübersicht aktualisiert werden.

## Status-Legende

| Status | Bedeutung |
|---|---|
| `DONE` | Phase ist fertig geplant und in der Umsetzung abgeschlossen |
| `PLANNED` | Phase ist sauber ausgearbeitet, aber noch nicht gebaut |
| `NEXT_PHASE_READY` | Das ist die sinnvollste nächste Phase |
| `IN_PROGRESS` | Gerade in Arbeit |
| `BLOCKED` | Es fehlt noch eine Abhängigkeit oder eine Entscheidung |

## Aktueller Gesamtstand

### Schon erledigt
1. Architektur-Grundlagen sind dokumentiert.
2. Geräte-, Nutzer- und Kostenwege sind dokumentiert.
3. Tool-Call-Architektur ist mit externen Referenzen dokumentiert.
4. Mermaid-Diagramme für Nutzerwege, Kosten und Kontext sind erstellt.

### Noch nicht umgesetzt
1. Ein echter gemeinsamer `RunContract`
2. Ein einheitliches Tool-Wörterbuch
3. Ein voller Host-Loop mit echten Tool-Events im produktiven Notedrill-Host
4. Ein sauberer Setup- und Host-Status im Alltag
5. Ein sauberer Skills-, Rollen- und MCP-Layer für den Produktbetrieb

## Empfohlene Lesereihenfolge in diesem Umsetzungsordner
1. Diese Datei
2. `phasen/01-run-contract-und-tool-woerterbuch.md`
3. `phasen/02-host-modi-routing-und-fallbacks.md`
4. `phasen/03-provider-adapter-und-ausfuehrungswege.md`
5. `phasen/04-artefakt-pipeline-und-dateivertraege.md`
6. `phasen/05-setup-status-onboarding-und-host-ux.md`
7. `phasen/06-kosten-budget-quota-und-pakete.md`
8. `phasen/07-kontext-stabilisierung-skills-und-rollen.md`
9. `phasen/08-mcp-integration-berechtigungen-und-externe-tools.md`
10. `phasen/09-observability-schulmodus-und-rollout.md`
11. `notedrill-ki-agentic-userwege-und-kosten-diagramme.md`

## Phasen-Überblick

| Phase | Titel | Hauptnutzen | Wichtige Geräte oder Wege | Status | Datei |
|---|---|---|---|---|---|
| 01 | Run-Contract und Tool-Wörterbuch | gemeinsamer Kern für alle Agent-Läufe | alle | `NEXT_PHASE_READY` | `phasen/01-run-contract-und-tool-woerterbuch.md` |
| 02 | Host-Modi, Routing und Fallbacks | klarer Weg pro Gerät und Lage | iPad, iPhone, Android, Mac, Windows, Linux | `PLANNED` | `phasen/02-host-modi-routing-und-fallbacks.md` |
| 03 | Provider-Adapter und Ausführungswege | gleiche Logik für Remote, Companion und Premium | Remote, Companion, API, CLI | `PLANNED` | `phasen/03-provider-adapter-und-ausfuehrungswege.md` |
| 04 | Artefakt-Pipeline und Dateiverträge | sichere Übernahme in Notizen, Quiz und Karten | alle | `PLANNED` | `phasen/04-artefakt-pipeline-und-dateivertraege.md` |
| 05 | Setup-Status, Onboarding und Host-UX | verständlicher Alltag für Nutzer | iPad-only, MacBook später, Windows-Web | `PLANNED` | `phasen/05-setup-status-onboarding-und-host-ux.md` |
| 06 | Kosten, Budgets, Quoten und Pakete | wenig Kosten und klare Produktlogik | Remote, Schule, BYOK, Companion | `PLANNED` | `phasen/06-kosten-budget-quota-und-pakete.md` |
| 07 | Kontext-Stabilisierung, Skills und Rollen | weniger Kontextprobleme und bessere Spezialisierung | alle | `PLANNED` | `phasen/07-kontext-stabilisierung-skills-und-rollen.md` |
| 08 | MCP, Berechtigungen und externe Tools | sichere Erweiterbarkeit | MCP, Skills, externe Datenquellen | `PLANNED` | `phasen/08-mcp-integration-berechtigungen-und-externe-tools.md` |
| 09 | Beobachtung, Schulmodus und Rollout | Betrieb, Support und Ausfallschutz | Schulen, Teams, Reseller | `PLANNED` | `phasen/09-observability-schulmodus-und-rollout.md` |

## Warum genau diese Reihenfolge sinnvoll ist

### Zuerst Phase 01
Ohne `RunContract` und Tool-Wörterbuch bleibt alles andere schwammig.

### Dann Phase 02 und 03
Erst wenn klar ist:
1. welcher Host-Weg aktiv ist
2. welcher Provider genutzt wird

kann die App ehrlich und stabil handeln.

### Dann Phase 04 und 05
Erst danach lohnt sich:
1. saubere Artefakt-Übernahme
2. gutes Nutzer-Onboarding

### Danach Phase 06 bis 09
Erst dann kommen:
1. Kostenlogik
2. Kontext-Stabilisierung
3. Skills und Rollen
4. MCP und Betrieb

## Größere Maßnahmenblöcke mit Untertasks

## Block A: Gemeinsamer technischer Kern
1. `RunContract` definieren
2. `ToolCall`- und `ToolResult`-Form vereinheitlichen
3. `generatedArtifacts` vereinheitlichen
4. `fallbackInfo` sauber definieren
5. `providerMode` und `hostMode` sauber trennen
6. Migrationsweg für alte Bridge-Antworten festlegen

## Block B: Geräte- und Host-Logik
1. iPad-only sauber auf `app_remote`
2. iPhone-only sauber auf `app_remote`
3. Android ohne Laptop klar als Testweg
4. MacBook oder Linux als Companion-Upgrade
5. Windows-App und Windows-Browser getrennt behandeln
6. Emulator-Sonderfall mit `10.0.2.2`
7. iSH auf iPad als echter POC-Fall

## Block C: Artefakte und Inhalte
1. Notizen
2. Quiz
3. Lernkarten
4. Diagramme
5. Kreuzworträtsel
6. Quellen- und Fehlerkennzeichnung

## Block D: Nutzerführung
1. Setup-Status
2. Host-Modus
3. Modell- und Kostenhinweise
4. Fallback-Hinweise
5. Schul- und Admin-Hinweise

## Block E: Qualität, Kosten und Betrieb
1. Budgetgrenzen
2. Kontextkompaktung
3. Rollen und Skills
4. MCP-Regeln
5. Logs, Audits und Rollout

## Wichtigste Edge Cases, die über mehrere Phasen gehen

| Edge Case | Warum wichtig |
|---|---|
| iPad-only ohne PC | wichtigster Schüler-Fall |
| iPad heute, MacBook später | realistischer Aufstiegs-Fall |
| Windows nur im Browser | sonst falsche Erwartungen an lokale CLIs |
| Android Emulator mit Host-PC | wichtig für Team und Tests |
| Android ohne Laptop | braucht ehrliche Testweg-Regeln |
| Schule mit MDM-Sperren | lokale Installationen oft blockiert |
| Nutzer ohne Zahlungsmittel | braucht betreiberfinanzierte Pakete |
| riesige PDFs oder Bilder | Speicher- und Artefaktregeln müssen das abfangen |
| Tool-Result kommt ohne Tool-Call | Event-System muss robust sein |
| Host fällt mitten im Lauf aus | Fallback muss sauber greifen |
| OAuth läuft ab | Setup-Status darf nicht unklar werden |
| MCP-Server liefert zu viele Tools | Kontext und Sicherheit leiden sonst |

## Historisierung: So wird diese Masterplanung weiter gepflegt
1. Nach jedem Chat wird der Status der betroffenen Phase angepasst.
2. Wenn eine neue Unterphase entsteht, wird sie hier ergänzt.
3. Wenn eine Phase fertig ist, kommt:
   - Datum
   - kurzer Abschlussstand
   - Verweis auf die betroffenen Dateien
4. Wenn sich Prioritäten ändern, wird hier die Reihenfolge sichtbar geändert.

## Aktuelle Priorität
Die nächste sinnvolle Phase ist:
`Phase 01 - Run-Contract und Tool-Wörterbuch`

Warum?
1. Mobile und Backend sind dort noch nicht sauber gleich.
2. Alle späteren Host- und UI-Verbesserungen hängen davon ab.

## Was nach Phase 01 sofort folgen sollte
1. `Phase 02 - Host-Modi, Routing und Fallbacks`
2. `Phase 03 - Provider-Adapter und Ausführungswege`
3. `Phase 04 - Artefakt-Pipeline und Dateiverträge`

## Mein ehrlicher Befund
Die große Recherche ist jetzt stark genug.
Der nächste Engpass ist nicht Wissen, sondern saubere schrittweise Umsetzung.

## Verweise
1. `shared-docs/ai-architecture/01-grundlagen/notedrill-ki-zielarchitektur.md`
2. `shared-docs/ai-architecture/01-grundlagen/notedrill-ki-phasenplan.md`
3. `shared-docs/ai-architecture/02-betrieb-und-szenarien/`
4. `shared-docs/ai-architecture/toolcall-architecture/`
5. `shared-docs/ai-architecture/03-agentic-umsetzung/notedrill-ki-agentic-userwege-und-kosten-diagramme.md`
