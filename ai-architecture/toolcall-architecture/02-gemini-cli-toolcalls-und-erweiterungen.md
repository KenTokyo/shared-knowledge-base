# Notedrill Mobile: Gemini CLI Tool-Calls, MCP, Skills und Kontext

Stand: 8. März 2026

## Was wurde verstanden?
1. Gemini CLI ist für dich besonders wichtig, weil es günstig und stark wirkt.
2. Du willst nicht nur Preise, sondern die eigentliche Tool-Call-Mechanik verstehen.
3. Du willst wissen, wie MCP, Skills, Extensions und Kontext zusammenhängen.

## Das Kernbild
Gemini CLI beschreibt selbst sehr klar, wie sein Tool-System arbeitet:

1. Prompt kommt in die CLI
2. der Core sendet Prompt, Verlauf und Tool-Definitionen an das Modell
3. das Modell fordert ein Tool an
4. der Core validiert und führt aus
5. das Ergebnis geht zurück ans Modell
6. erst dann entsteht die nächste Antwort

Das ist fast das sauberste offizielle Tool-Call-Bild in der ganzen Recherche.

## Offizieller Ablauf der Tool-Calls

| Schritt | Was laut Doku passiert |
|---|---|
| 1 | Nutzer schickt einen Prompt |
| 2 | CLI und Core sammeln Verlauf und verfügbare Tools |
| 3 | Tool-Beschreibungen und Schemas gehen an die Gemini API |
| 4 | Das Modell entscheidet, ob es ein Tool braucht |
| 5 | Der Core validiert und führt aus |
| 6 | Tool-Ergebnis geht an das Modell zurück |
| 7 | Das Modell baut daraus die nächste Antwort |

## Welche Tool-Arten Gemini CLI nennt

| Tool-Art | Beispiel |
|---|---|
| Datei-Werkzeuge | lesen, schreiben, ändern, mehrere Dateien einbinden |
| Shell | `run_shell_command` |
| Web | Fetch und Google Web Search |
| Memory | Wissen über Sitzungen oder Projekt merken |
| Todo | Teilaufgaben verwalten |
| MCP | zusätzliche externe Tools und Ressourcen |

## Zwei wichtige Besonderheiten

### 1. User-triggered tools
Gemini CLI erlaubt direkte Kürzel:
1. `@pfad` für Datei- oder Verzeichniszugriff
2. `!befehl` für Shell-Kommando

Das ist stark, weil Nutzer sehr direkt Werkzeuge anstoßen können.

### 2. Ein klarer Core
Die Doku sagt ausdrücklich:
Der Core verwaltet die Tools, die Schemas, die Ausführung und die Rückgabe an das Modell.

Das heißt:
Gemini CLI ist nicht nur eine hübsche Hülle um ein Modell.
Es hat einen echten Ausführungs-Kern.

## MCP in Gemini CLI

### Was die Doku besonders gut zeigt
Gemini CLI erklärt seinen MCP-Weg ungewöhnlich tief:

1. Discovery Layer
2. Execution Layer
3. Transport-Typen
4. Ressourcen
5. Prompts als Slash-Befehle
6. Verwaltung per `gemini mcp`

### Discovery Layer
Die Doku nennt `discoverMcpTools()` als zentralen Entdecker.
Dabei passiert:
1. Server aus `settings.json` lesen
2. Verbindung aufbauen
3. Tool-Definitionen holen
4. Schemas prüfen
5. in globale Registry eintragen
6. Ressourcen zusätzlich holen

### Execution Layer
Danach wird jedes entdeckte Tool in einer Lauf-Hülle verarbeitet.
Diese kümmert sich um:
1. Freigabe
2. Ausführung
3. Antwortbehandlung
4. Zustände und Timeouts

### Unterstützte MCP-Transporte
1. `stdio`
2. `SSE`
3. `Streamable HTTP`

## Skills in Gemini CLI

### Was ein Skill hier ist
Ein Skill ist ein wiederverwendbarer Fähigkeits-Baustein.

### Was wichtig ist
1. Skills können lokal gefunden werden
2. `gemini skills list` zeigt gefundene Skills
3. `gemini skills link` kann Skills aus einem Ordner verknüpfen
4. ein Skill kann Assets mitbringen
5. der Skill-Körper wird in den Verlauf eingebracht, wenn er aktiv wird

## Kontext in Gemini CLI

### `GEMINI.md`
Gemini CLI hat eine starke Hierarchie für Projektkontext:

1. globales `~/.gemini/GEMINI.md`
2. Projektwurzel und Elternverzeichnisse
3. Unterordner
4. optional andere Dateinamen über Settings

### Warum das wichtig ist
1. Projektregeln werden nicht jedes Mal neu geschrieben
2. Kontext ist hierarchisch
3. der Nutzer sieht sogar, wie viele Kontextdateien geladen wurden

## Extensions in Gemini CLI

### Was eine Extension bündeln kann
Laut Doku:
1. Prompts
2. MCP-Server
3. Custom Commands
4. Hooks
5. Subagents
6. Agent Skills

Das ist wichtig:
Gemini CLI denkt Fähigkeiten als Paket und nicht nur als Einzeldatei.

## Sicherheit und Freigabe

### Was die Doku klar sagt
1. sensible Werkzeuge fragen typischerweise nach Freigabe
2. Sandbox-Regeln gelten auch für MCP
3. wenn MCP in einer Sandbox läuft, müssen die benötigten Programme dort auch verfügbar sein

## Was Notedrill daraus lernen sollte

### 1. Discovery und Execution trennen
Notedrill sollte MCP nicht nur „irgendwie laden“.
Es braucht:
1. Discovery-Schicht
2. Execution-Schicht
3. saubere Registry

### 2. Tool-Schemas ernst nehmen
Gemini CLI prüft und normalisiert Schemas.
Das schützt später vor kaputten Tool-Parametern.

### 3. Kontextdateien hierarchisch denken
`GEMINI.md` ist ein gutes Vorbild für:
1. globale Regeln
2. Projektregeln
3. Unterordnerregeln

### 4. Skills und Extensions als Paket denken
Nicht nur einzelne Prompts.
Sondern komplette Fähigkeits-Bündel.

## Meine kurze Bewertung

| Bereich | Bewertung für Notedrill |
|---|---|
| Tool-Loop | sehr stark |
| MCP-Architektur | sehr stark |
| Skills | stark |
| Kontext-Hierarchie | sehr stark |
| Mobile-Direktweg | nein |
| Companion-Tauglichkeit | sehr stark |

## Quellen
1. Gemini CLI Repository: https://github.com/google-gemini/gemini-cli
2. Gemini CLI Tools: https://geminicli.com/docs/tools/
3. Gemini CLI Tools Reference: https://geminicli.com/docs/reference/tools/
4. Gemini CLI MCP: https://geminicli.com/docs/tools/mcp-server/
5. Gemini CLI Project Context: https://geminicli.com/docs/cli/gemini-md
6. Gemini CLI Skills: https://geminicli.com/docs/cli/skills/
7. Gemini CLI Extensions: https://geminicli.com/docs/extensions/
8. Gemini CLI Documentation Home: https://geminicli.com/docs/
9. Google Gemini CLI Blog: https://developers.googleblog.com/en/google-gemini-cli/
