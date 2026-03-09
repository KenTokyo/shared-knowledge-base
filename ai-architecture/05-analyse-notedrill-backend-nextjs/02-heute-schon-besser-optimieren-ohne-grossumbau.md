# Notedrill Backend Next.js: Heute schon besser optimieren ohne Großumbau

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst nicht nur Zukunftsträume.
2. Du willst wissen, was jetzt schon klar besser geht.
3. Du willst Kosten, Kontext und JSON-Stress schon vor dem großen Umbau senken.

## Das Ziel dieser Datei
Hier geht es nicht um den Endzustand.
Hier geht es um die besten schnellen Hebel für den jetzigen Stand.

## Die wichtigste Regel
Solange der Hauptweg noch auf Modell-JSON beruht,
sollte der User davon so wenig wie möglich merken.

Das heißt:
1. weniger kaputte Formate,
2. weniger Extra-Retries,
3. weniger doppelter Kontext,
4. klarere Rückmeldungen.

## Die 10 wichtigsten Sofort-Maßnahmen

## 1. Parsing und Reparatur auf den Server ziehen
Heute wird viel im Frontend entschieden.

Besser:
1. Server prüft den letzten KI-Block zuerst
2. Server repariert kleine JSON-Fehler direkt
3. Frontend bekommt schon normalisierte Daten

### Was das bringt
1. weniger Logik im Browser
2. sauberere Telemetrie
3. weniger Unterschiede zwischen Web und Mobile

## 2. Retry nur mit dem kaputten Block machen
Heute wird beim Retry noch zu viel Kontext mitgeschleppt.

Besser:
1. letzten fehlerhaften Block speichern
2. nur diesen Block plus Kurzfehler an das Modell zurückgeben
3. nicht noch einmal den ganzen großen Chat anhängen

### Was das bringt
1. weniger Tokens
2. weniger Kontextmüll
3. weniger zweite Fehler durch unnötigen Zusatztext

## 3. ND_ACTIONS nur noch als Übergangsweg behandeln
Kurzfristig bleibt ND_ACTIONS noch da.
Aber innerlich sollte es schon so behandelt werden:

1. Parser liest den Block
2. Server wandelt ihn in einen internen Tool-Auftrag um
3. danach arbeitet die App nur noch mit internen Aufträgen weiter

### Was das bringt
Der äußere Altweg bleibt nutzbar,
aber der innere Kern wird schon sauberer.

## 4. Einen echten `runId` sofort einführen
Noch bevor echte Tools da sind, sollte jeder Lauf haben:
1. `runId`
2. `sessionId`
3. `responseContractMode`
4. `requestedProvider`
5. `resolvedProvider`
6. `retryOfRunId`

### Was das bringt
1. klarere Fehlersuche
2. echte Messung pro Lauf
3. besserer Übergang zu Queue und Background-Jobs

## 5. Prompt-Schichten aggressiver klein halten
Es gibt schon Budget-Regeln.
Die sollten noch mutiger genutzt werden.

Zum Beispiel:
1. nur aktive Skill-Fragmente laden
2. lange Beispiele nur im ersten Versuch
3. Retry immer kompakt
4. Debug-Text nie in echte Produktionsläufe mischen

### Was das bringt
1. weniger Kosten
2. weniger Antwortfehler
3. bessere Chance auf sauberes JSON

## 6. Lange Chats früher zusammenfassen
Wenn ein Chat viele Runden hat, sollte nicht alles roh mitlaufen.

Besser:
1. nach festen Grenzen Kurz-Zusammenfassung bilden
2. alte Teile in kompaktes Run-Paket umwandeln
3. nur das Paket plus die letzten frischen Nachrichten weiterschicken

### Was das bringt
1. weniger Kontextprobleme
2. weniger Drift
3. niedrigere Prompt-Kosten

## 7. Offenen Tool-Anspruch ehrlich machen
Die alte Bridge heißt heute nach CLI-Hosts,
liefert aber noch keine echten Tool-Läufe.

Besser:
1. UI nur echte Tool-Events so nennen
2. synthetische oder abgeleitete Schritte sichtbar anders labeln
3. keine falsche Erwartung an `codex-cli` oder `gemini-cli`

### Was das bringt
Mehr Vertrauen.
Weniger falsche Support-Erwartung.

## 8. Fehlversuche als nutzbaren Zwischenstand retten
Wenn JSON scheitert, sollte nicht alles verloren sein.

Besser:
1. Text als Entwurf retten
2. User eine einfache Übernehmen-Aktion geben
3. bei Batch-Texten einen lokalen Struktur-Fallback anbieten

### Was das bringt
Selbst bei Fehlern fühlt sich die App nicht kaputt an.

## 9. Open-In und ND-Fallback zusammenziehen
Heute sind es zwei ähnliche Rettungswege.

Besser:
1. ein gemeinsamer Reparatur-Kern
2. gleicher Retry-Zähler
3. gleiche Run-Telemetrie
4. gleiche Fehlerarten

### Was das bringt
Weniger doppelte Logik.
Weniger versteckte Unterschiede.

## 10. Provider-Kosten pro Lauf messen
Schon jetzt sollte pro Lauf sichtbar sein:
1. welche Route genutzt wurde
2. ob Fallback nötig war
3. wie groß Prompt und Antwort waren
4. ob Retry nötig war

### Was das bringt
Erst damit kann man später ehrlich Pakete bauen.

## Mein empfohlener Sofort-Plan in 3 Wellen

### Welle A: 1 bis 3 Tage
1. `runId` ergänzen
2. Retry nur mit letztem Block umbauen
3. Telemetrie für Retry und Fallback sauber machen

### Welle B: 3 bis 7 Tage
1. Parsing und Reparatur auf den Server schieben
2. Open-In und ND-Reparatur vereinheitlichen
3. klare Statusmeldungen für Entwurf statt Totalausfall

### Welle C: 1 bis 2 Wochen
1. erste Server-Normalisierung in interne Aufträge
2. kompaktere Kontext-Zusammenfassung
3. ehrliche Tool-Anzeige in der UI

## Was wir bewusst noch nicht brauchen
1. noch keinen kompletten 24h-Server pro Nutzer
2. noch keinen vollen MCP-Schreibzugriff
3. noch keinen riesigen Multi-Agent-Umbau

## Was das für den User spürbar verbessert
1. weniger "nichts passiert"
2. weniger kaputte Import-Antworten
3. klarere Rückmeldungen bei Fehlern
4. geringere Wartezeit bei Retries

## Mein kurzer Befund
Mit diesen Maßnahmen wird der heutige Chat nicht perfekt.
Aber er wird deutlich robuster und günstiger,
ohne dass wir sofort alles neu bauen müssen.

## Quellen
1. `History/2026-03-08-prompt-kuerzen-ohne-json-verlust-verlauf.md`
2. `docs/agentic-mode/tasks/2026-03-07-unified-prompt-system-plan.md`
3. `app/api/chat/route.ts`
4. `components/agentic/hooks/useAssistantArbitration.ts`
5. `lib/agentic/commands/response-contract-repair-prompt.ts`
6. `lib/agentic/commands/json-repair.ts`
