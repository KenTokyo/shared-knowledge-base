# Notedrill Backend Next.js: Phase 07 MCP-Server und externe Werkzeuge

Stand: 8. März 2026
Status: `DONE`

## Ziel
Diese Phase öffnet das System nach außen,
ohne Sicherheit und Klarheit zu verlieren.

## MCP einfach erklärt
MCP = gemeinsamer Steckplatz für Werkzeuge und Datenquellen.

## Was der User davon hat
1. mehr nützliche Quellen
2. bessere Recherche
3. später stärkere Automationen

## Hauptaufgaben

## 1. MCP zuerst read-only
Erste Wege:
1. Suche
2. Wissensquellen
3. Admin-Daten

## 2. Tool-Katalog sichtbar machen
Der Lauf soll wissen:
1. welche Tools da sind
2. welches Tool von welchem Server kommt
3. welches Risiko es hat

## 3. Rechte-Modell einführen
1. `allow`
2. `ask`
3. `deny`

## 4. Timeout und Schutzregeln einbauen
1. Tool-Limit
2. Server-Limit
3. Timeout
4. Circuit-Breaker

## Edge Cases

| Edge Case | Antwort |
|---|---|
| MCP-Server hängt | Timeout und Abschaltung |
| OAuth läuft ab | klarer Reconnect-Zustand |
| Tool-Liste ist riesig | Limit und Filter |
| bösartiger Server | Read-only zuerst, Vertrauensliste |

## Betroffene Dateien oder Bereiche
1. `lib/mcp/*`
2. neuer Tool- und Rechte-Layer
3. Run-Runner
4. Admin- und Debug-Ansichten

## Done-Kriterien
1. MCP-Quellen sind testbar
2. Rechte sind differenziert
3. externe Tools sind kein blinder Fleck mehr

## Was jetzt schon im Code steckt
1. Ein gemeinsamer Tool-Katalog beschreibt interne und externe Tools mit:
   - Herkunft
   - Risiko
   - Rechte-Modus
   - Timeout
   - Aufruf-Limit
2. Erste read-only-MCP-Tools sind da:
   - `mcp.tool_catalog.list`
   - `mcp.chat_run.list`
3. Eine API zeigt den Katalog und kann diese externen Tools direkt pruefen:
   - `GET /api/agentic/tool-catalog`
   - `POST /api/agentic/tool-catalog`
4. Schutzregeln sind aktiv:
   - `allow`
   - `ask`
   - `deny`
   - Timeout
   - Circuit-Breaker
   - Limit pro Lauf
5. Laufdaten nehmen jetzt den Tool-Katalog mit in die Metadaten auf.

## Was das konkret fuer den User bedeutet
Externe Werkzeuge sind jetzt nicht mehr unsichtbar oder unkontrolliert.
Wir koennen sie erst vorsichtig nur zum Lesen anbinden und spaeter sicher erweitern.

## Nächste Phase danach
`08-host-modelle-shared-remote-companion-und-nutzer-server.md`
