# Notedrill Backend Next.js: Master-Taskliste und Status

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst eine zentrale Datei, die alles zusammenhält.
2. Diese Datei soll nicht nur Ideen sammeln, sondern Reihenfolge und Priorität klar machen.
3. Die Detailarbeit liegt dann in den einzelnen Phasen-Dateien.

## Wofür diese Datei da ist
Diese Datei ist die Haupt-Taskliste für den Backend-Umbau.

Sie zeigt:
1. Gesamtstand
2. Priorität
3. nächste Phase
4. Abhängigkeiten

## Status-Legende

| Status | Bedeutung |
|---|---|
| `DONE` | fertig geplant und umgesetzt |
| `IN_PROGRESS` | gerade in Arbeit |
| `NEXT_PHASE_READY` | das ist der beste nächste Schritt |
| `PLANNED` | sauber geplant, aber noch nicht gestartet |
| `LATER` | wichtig, aber nicht zuerst |

## Aktueller Gesamtstand

### Schon stark
1. Prompt-Orchestrierung im Web-Chat
2. Trennung von `nd_actions` und `open_in`
3. lokale JSON-Rettung
4. automatische Open-In-Übernahme
5. Provider-Fallback

### Noch der große Engpass
1. kein echter Server-Runner als Hauptweg
2. App-Aktionen hängen noch stark an Modell-JSON
3. kein voller Tool-Loop im produktiven Kern
4. zu viel Lauf-Logik sitzt noch im Frontend

## Die 10 Phasen im Überblick

| Phase | Titel | Hauptnutzen | Status | Datei |
|---|---|---|---|---|
| 01 | Run-Vertrag und Server-Runner | gemeinsamer Laufkern | `DONE` | `phasen/01-run-vertrag-und-server-runner.md` |
| 02 | Tool-Registry und App-Aktionen ohne JSON-Hickhack | weg vom fragilen Antwortformat | `DONE` | `phasen/02-tool-registry-und-app-aktionen-ohne-json-hickhack.md` |
| 03 | Provider-Routing, Budget und Modelle | Kosten senken und Routing klären | `DONE` | `phasen/03-provider-routing-budget-und-modelle.md` |
| 04 | Kontext, Zusammenfassung und Rollen | weniger Kontextchaos | `DONE` | `phasen/04-kontext-speicher-zusammenfassung-und-rollen.md` |
| 05 | Artefakte, Importe und Übernahme | User muss weniger manuell machen | `DONE` | `phasen/05-artefakte-importe-und-uebernahme.md` |
| 06 | Lange Läufe, Queue und 24h-Agenten | Browser-unabhängige Agent-Arbeit | `DONE` | `phasen/06-lange-laeufe-queue-und-24h-agenten.md` |
| 07 | MCP-Server und externe Werkzeuge | sichere Erweiterungen | `DONE` | `phasen/07-mcp-server-und-externe-werkzeuge.md` |
| 08 | Host-Modelle: Shared Remote, Companion, Nutzer-Server | Betriebswege sauber trennen | `DONE` | `phasen/08-host-modelle-shared-remote-companion-und-nutzer-server.md` |
| 09 | Abo-Preise und Paketlogik | Technik und Geschäft sauber verbinden | `DONE` | `phasen/09-abo-preise-und-paketlogik.md` |
| 10 | Messung, Tests und Rollout | sicher und kontrolliert ausrollen | `DONE` | `phasen/10-messung-tests-und-rollout.md` |

## Warum genau diese Reihenfolge sinnvoll ist

### Erst Phase 01
Ohne gemeinsamen Laufkern bleibt alles später doppelt und wackelig.

### Dann Phase 02 und 03
Erst danach lohnt sich:
1. echte Tool-Ausführung
2. sauberes Kostenrouting

### Dann Phase 04 und 05
Wenn der Laufkern steht, können wir:
1. Kontext sauber schneiden
2. Artefakte sauber übernehmen

### Danach Phase 06 bis 10
Dann kommen:
1. lange Läufe
2. MCP
3. Betriebsmodelle
4. Pakete
5. Rollout

## Die drei großen Wellen

## Welle A: Sofort produktiver werden
1. Phase 01
2. Phase 02
3. Phase 03

### Ziel
Der heutige Chat soll robuster, billiger und weniger JSON-abhängig werden.

## Welle B: Echten Agent-Kern bauen
1. Phase 04
2. Phase 05
3. Phase 06

### Ziel
Der Server besitzt den Lauf und lange Aufgaben werden sauber möglich.

## Welle C: Größere Plattform bauen
1. Phase 07
2. Phase 08
3. Phase 09
4. Phase 10

### Ziel
MCP, Companion, Premium-Wege, Pakete und Rollout sauber absichern.

## Orchestrator kurz erklärt
Orchestrator = unser Ablauf-Steuerer für mehrere KI-Schritte hintereinander.

Wir brauchen ihn später besonders stark ab:
1. Queue
2. lange Läufe
3. Rollen
4. Tool-Reihenfolgen

## Die 8 wichtigsten Quer-Risiken

| Risiko | Warum das wichtig ist |
|---|---|
| kaputtes JSON | heute noch Hauptfehlerquelle |
| zu große Prompts | macht Antworten teurer und wackeliger |
| Provider-Fallback ohne Run-Historie | später schwer zu debuggen |
| Tool-Ergebnisse ohne echte Tool-IDs | UI und Logs werden unscharf |
| Browser schließt während Lauf | lange Aufgaben gehen verloren |
| Nutzer ohne Desktop | brauchen remote-first |
| persönliche Coding-Pläne im Backend | kann an Nutzungsregeln scheitern |
| zu früher MCP-Schreibzugriff | Sicherheitsrisiko |

## Aktuelle Priorität
Alle 10 Phasen sind abgeschlossen.

## Was direkt danach folgen sollte
Keine offenen Phasen mehr.

## Mein ehrlicher Befund
Der größte Hebel ist nicht mehr ein besserer Prompt.
Der größte Hebel ist ein besserer Laufkern.

## Verlauf zur Umsetzung

### Phase 01 abgeschlossen
1. Ein gemeinsamer Laufkern fuer Chat und Bridge ist jetzt im Code eingebaut.
2. Neue Laufdaten liegen im Backend als Vertrag, Tracker und Speicher bereit.
3. `npm run schema:generate` und `npm run type-check` liefen erfolgreich.
4. Phase 02 ist jetzt der beste naechste Schritt.

### Phase 02 abgeschlossen
1. Ein neuer interner Tool-Kern ist im Backend angelegt.
2. `ND_ACTIONS` wird jetzt in interne Tool-Aufrufe uebersetzt statt nur lose als JSON gelesen zu werden.
3. Chat-Laeufe schreiben echte Tool-Events mit:
   - `tool_call`
   - `tool_result`
   - `artifact_ready`
4. Die Bridge kann die ersten Server-Tools schon wirklich ausfuehren:
   - `note.create`
   - `folder.create`
   - `open_in.import`
5. Der Web-Chat fuehrt diese Server-Tools jetzt ebenfalls serverseitig aus statt nur Vorschau zu sammeln.
6. Der Chat liest Tool-Ergebnisse direkt aus dem Stream und zeigt Erfolg oder Fehler direkt im Verlauf.
7. Die doppelte Ausfuehrung zwischen Browser und Server wird jetzt ueber den Server-Feed abgefangen.
8. `npm run type-check` lief erfolgreich.

### Was jetzt als Naechstes sinnvoll ist
1. `Phase 06 - Lange Laeufe, Queue und 24h-Agenten`
2. Danach `Phase 07 - MCP-Server und externe Werkzeuge`

### Phase 03 abgeschlossen
1. Ein neuer Routing-Kern teilt Chat- und Bridge-Laeufe jetzt in einfache Aufgabenklassen ein.
2. Premium-Modelle werden nicht mehr still zu oft genommen, sondern nur noch bewusst oder als erlaubte Ausnahme.
3. Wunsch-Modell und echtes Zielmodell werden jetzt getrennt gespeichert.
4. Kostenhinweise und Budget-Daten werden im Lauf-Verlauf mitgespeichert.
5. `npm run type-check` lief erfolgreich.

### Phase 04 abgeschlossen
1. Ein neuer Kontext-Baustein kuerzt alte Chat-Teile jetzt in eine kurze Lauf-Zusammenfassung.
2. Der Hauptkontext besteht jetzt klarer aus Rolle, Workspace-Kontext, Lauf-Zusammenfassung und frischen Nachrichten.
3. Retry-Nachrichten werden nicht mehr voll in den Hauptkontext gemischt.
4. Skill-Bloecke werden jetzt je nach Rolle gezielter geladen statt immer breit.
5. Chat und Bridge nutzen beide denselben Rollen- und Kontext-Weg.
6. `Phase 05 - Artefakte, Importe und Uebernahme` ist jetzt der beste naechste Schritt.

### Phase 05 abgeschlossen
1. Tool-Ergebnisse und Open-In-Vorschauen nutzen jetzt einen gemeinsamen Artefakt-Baustein.
2. Open-In wird serverseitig nur noch als Vorschau behandelt und blockiert die echte Editor-Uebernahme nicht mehr.
3. Vor einer Uebernahme werden jetzt kaputte UTF-8-Zeichen und zu grosse Pakete zentral geprueft.
4. Notizen, Ordner und Open-In-Ergebnisse liefern jetzt klarere Vorschau-Daten fuer den Chat.
5. `Phase 06 - Lange Laeufe, Queue und 24h-Agenten` ist jetzt der beste naechste Schritt.

### Phase 06 abgeschlossen
1. Lange Chat-Laeufe koennen jetzt in eine Queue gelegt werden.
2. Worker reservieren Jobs, schreiben Lebenszeichen und beachten Stop-Signale.
3. Neue API-Wege zeigen Run-Status und erlauben Stop sowie Worker-Abarbeitung.
4. `Phase 07 - MCP-Server und externe Werkzeuge` war danach der beste naechste Schritt.

### Phase 07 abgeschlossen
1. Ein gemeinsamer Tool-Katalog beschreibt jetzt interne und externe Werkzeuge in einer Sprache.
2. Externe read-only-MCP-Tools koennen ueber eine eigene API sichtbar gemacht und getestet werden.
3. Rechte-Regeln mit `allow`, `ask` und `deny` laufen jetzt zusammen mit Timeout, Aufruf-Limit und Circuit-Breaker.
4. Chat-Laeufe speichern den Tool-Katalog-Kontext mit, damit spaetere Fehler leichter zu verstehen sind.
5. `Phase 08 - Host-Modelle: Shared Remote, Companion und Nutzer-Server` ist jetzt der beste naechste Schritt.

### Phase 08 abgeschlossen
1. Drei Host-Modi (`shared_remote`, `desktop_companion`, `dedicated_worker`) mit klaren Capabilities definiert.
2. Host-Modus-Resolver bestimmt pro Lauf den aktiven Modus: expliziter Request > User-Praeferenz > Fallback auf shared_remote.
3. Companion-Vertrag definiert: Registrierung, Heartbeat, Run-Delegation und Onboarding-Steps. Companion spricht denselben Run-Vertrag.
4. Host-Status API (`GET/POST /api/agentic/host-status`) zeigt Modi mit Status und erlaubt Praeferenz-Aenderung sowie Status-Updates.
5. Run-Vertrag um `hostMode`-Feld erweitert. Chat-Route und Worker schreiben den aufgeloesten Host-Modus in Metadaten und Response-Header.
6. `npx tsc --noEmit` – 0 Fehler.
7. `Phase 09 - Abo-Preise und Paketlogik` ist jetzt der beste naechste Schritt.

### Phase 09 abgeschlossen
1. Vier Abo-Pakete (free, standard, plus, pro) mit klaren Technik-Limits definiert: Host-Modi, Modellklassen, Queue-Grenzen, Concurrent-Runs, Tages-Budget, max Token pro Lauf.
2. BYOK/BYOA-Trennung eingebaut: Persoenliche API-Keys und Tool-Abos werden nicht mit Plattform-Schluesseln verwechselt.
3. Chat-Route prueft vor jedem Lauf: Budget, Host-Modus-Berechtigung, Live/Queue-Slot-Limit.
4. Token-Limit wird automatisch durch Paketgrenze geclampt.
5. Subscription-API zeigt aktuelles Paket, Verbrauch und alle Tier-Optionen.
6. `npx tsc --noEmit` – 0 Fehler.
7. `Phase 10 - Messung, Tests und Rollout` ist jetzt der beste naechste Schritt.

### Phase 10 abgeschlossen
1. In-Memory Run-Metriken-Collector sammelt pro Lauf: Dauer, Kosten, Retry-Rate, Tool-Erfolgsrate, Queue-Fehler, Host-Modus und Abo-Paket.
2. 30-Minuten-Aggregatfenster mit automatischem Rollover fuer Trend-Analyse (bis zu 24h History).
3. Alarm-Schwellwerte (Fehlerrate, Retry-Rate, Tool-Erfolg, Kosten, Queue-Fehler) mit Health-Evaluation (normal/warning/critical).
4. Feature-Flag-System mit 10 Flags (Kill-Switch, In-Memory-Override, Umgebungsvariable, Default, prozentbasierter Rollout).
5. Rollout-Status-API (`GET /api/agentic/rollout-status`) zeigt Gesamtzustand, KPI-Gesundheit, Run-Metriken, Feature-Flags und Kill-Switches.
6. Chat-Route und Worker zeichnen Metriken an allen End-Punkten auf (complete, fail, cancel, generation-fail), gesteuert per Feature-Flag.
7. Subscription-Enforcement per Feature-Flag abschaltbar.
8. `npx tsc --noEmit` – 0 Fehler.
9. Alle 10 Phasen des Backend-Umbaus sind jetzt abgeschlossen.
