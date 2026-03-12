# Notedrill Mobile: Phase 08 MCP-Integration, Berechtigungen und externe Tools

Stand: 8. März 2026
Status: `DONE`

## Abschluss (8. März 2026)

### Erstellte Dateien
1. `lib/agent/mcp/mcp.types.ts` (176 Zeilen) - Typen fuer Server, Tools, Verbindungen, Berechtigungen
2. `lib/agent/mcp/mcp-tool-registry.ts` (199 Zeilen) - Registry fuer verfuegbare MCP-Tools mit Discovery, Filter, Limits
3. `lib/agent/mcp/mcp-connection-health.ts` (244 Zeilen) - Verbindungszustand, Health-Signale, Timeout-Handling
4. `lib/agent/mcp/mcp-permission-gate.ts` (250 Zeilen) - Berechtigungspruefung mit Regeln, Rollen, Glob-Muster, PermissionStorage-Anbindung
5. `lib/agent/mcp/index.ts` (75 Zeilen) - Barrel-Export

### Was bedeutet das konkret fuer den User?
Externe Tools (z.B. Wikipedia-Suche, Datenbank-Abfragen) koennen jetzt sicher angebunden werden. Schueler duerfen nur lesen, Lehrer muessen bei Loesch-Aktionen bestaetigen, Admins haben vollen Zugriff. Langsame oder defekte Server werden automatisch erkannt und abgeschaltet.

### Architektur-Entscheidungen
- Mobile hostet MCP nicht selbst → Health-Signale kommen ueber Bridge
- PermissionStorage wird wiederverwendet (kein zweites Speichersystem)
- Glob-Patterns fuer flexible Regelzuweisung (z.B. "Search*" → erlaubt)
- MAX_TOOLS_PER_SERVER = 50 gegen Kontext-Ueberflutung
- UNREACHABLE_THRESHOLD = 3 aufeinanderfolgende Fehler

## Ziel
Diese Phase macht externe Tools nutzbar, ohne Sicherheit und Klarheit zu verlieren.

## Warum diese Phase wichtig ist
MCP ist stark.
Aber ohne Regeln kann MCP:
1. zu viele Tools laden,
2. zu viel Kontext kosten,
3. gefährliche Schreibrechte öffnen.

## Hauptaufgaben

### 1. MCP zuerst read-only
1. Suche
2. Wissen
3. externe Datenquellen
4. Admin-Ansichten

### 2. MCP-Testweg
1. Verbindung testen
2. Tool-Liste lesen
3. Fehlertext zeigen
4. Timeout sauber behandeln

### 3. Rechte-System
1. allow
2. ask
3. deny
4. pro Tool
5. pro Muster
6. pro Rolle

### 4. Skills und MCP zusammendenken
1. Skills können MCP nutzen
2. MCP kann Zusatzwissen für Skills liefern

## Edge Cases

| Edge Case | Antwort |
|---|---|
| bösartiger MCP-Server | nur vertrauenswürdige Server und read-only zuerst |
| OAuth läuft ab | klarer Status und Reconnect |
| zu viele MCP-Tools | Tool-Limit und Kontextwarnung |
| Schreib-MCP wird zu früh aktiviert | getrennte Freigabestufe |
| Server langsam oder hängt | Timeout und Abschaltung |

## Plattformsicht
1. Mobile hostet MCP nicht direkt als Produktkern.
2. Remote und Companion sind die eigentlichen MCP-Hosts.

## Done-Kriterien
1. MCP-Server sind testbar.
2. Tool-Listen sind sichtbar.
3. Rechte sind nicht nur global, sondern differenziert.

## Nächste Phase danach
`09-observability-schulmodus-und-rollout.md`
