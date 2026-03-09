# Notedrill Mobile: Claude Code Tool-Calls, MCP, Skills und Subagents

Stand: 8. März 2026

## Was wurde verstanden?
1. Du meinst mit „Cloud Code“ in diesem Zusammenhang sehr wahrscheinlich `Claude Code`.
2. Du willst wissen, wie Claude Code seine Tool-Calls und Erweiterungen wirklich organisiert.
3. Du willst daraus lernen, was für Notedrill sinnvoll wäre.

## Kurzbild
Claude Code ist nicht nur „ein Modell im Terminal“.
Es ist ein komplettes Lauf-System mit:

1. eingebauten Werkzeugen,
2. Einstellungen,
3. MCP-Anbindung,
4. Skills,
5. Subagents,
6. Hooks.

## Wie der Tool-Call-Weg grob läuft

| Schritt | Was passiert |
|---|---|
| 1 | Nutzer startet `claude` oder eine andere Claude-Code-Oberfläche |
| 2 | Claude Code liest Projektkontext und Einstellungen |
| 3 | Das Modell bekommt Prompt, Kontext und verfügbare Tools |
| 4 | Das Modell fordert bei Bedarf einen Tool-Call an |
| 5 | Claude Code prüft Regeln, Freigaben und Match-Logik |
| 6 | Das Tool wird ausgeführt |
| 7 | Das Ergebnis geht zurück in den Loop |
| 8 | Claude antwortet weiter oder macht den nächsten Schritt |

## Was offiziell klar zu sehen ist

### 1. Claude Code läuft auf mehreren Oberflächen
Die Quickstart-Doku zeigt:
1. Terminal-CLI
2. Web
3. Desktop
4. VS Code
5. JetBrains
6. Slack
7. GitHub Actions und GitLab

Das ist wichtig:
Das gleiche Tool-System kann über verschiedene Oberflächen laufen.

### 2. Claude Code hat eingebaute Tool-Klassen
Aus Quickstart, Hooks und MCP-Doku sieht man diese wichtigen Klassen:

1. Datei-Werkzeuge wie `Read`, `Edit`, `Write`
2. Such-Werkzeuge wie `Glob`, `Grep`
3. Shell-Werkzeuge wie `Bash`
4. Web-Werkzeuge wie `WebFetch`, `WebSearch`
5. Aufgaben- oder Delegations-Werkzeuge wie `Task`
6. MCP-Werkzeuge aus externen Servern

### 3. Tool-Calls sind an Freigaben gebunden
Die Quickstart-Doku sagt klar:
1. Claude zeigt vorgeschlagene Änderungen,
2. fragt nach Freigabe,
3. führt danach aus.

Dazu kommen Settings und Policies.

## MCP in Claude Code

### Was MCP hier macht
MCP erweitert Claude Code um fremde Tools, Datenquellen und Prompts.

### Was laut Doku geht
1. lokale MCP-Server
2. entfernte MCP-Server
3. OAuth für entfernte Server
4. Import aus Claude Desktop
5. Claude Code selbst als MCP-Server per `claude mcp serve`

### Warum das wichtig ist
Claude Code behandelt MCP nicht als Extra-Spielzeug.
Es ist ein normaler Teil seiner Werkzeug-Welt.

## Skills in Claude Code

### Was ein Skill ist
Ein Skill ist ein kleiner Fähigkeits-Baustein mit:

1. `SKILL.md`
2. optionalen Vorlagen
3. optionalen Beispielen
4. optionalen Skripten

### Wo Skills liegen
Laut Doku:
1. `~/.claude/skills/<skill-name>/SKILL.md`
2. `.claude/skills/<skill-name>/SKILL.md`
3. Plugin-Skills

### Warum Skills stark sind
1. Sie trennen wiederverwendbares Wissen vom Hauptprompt.
2. Sie können automatisch gefunden werden.
3. Sie dürfen Zusatzdateien mitbringen.
4. Sie halten den Hauptkontext kleiner.

## Subagents in Claude Code

### Was sie tun
Subagents sind spezialisierte Hilfsagenten mit:
1. eigener Rolle,
2. eigener Tool-Liste,
3. eigener Kontextfläche.

### Was das praktisch bringt
1. weniger Kontextmüll im Hauptlauf
2. gezielte Rollen wie Review, Analyse, Doku
3. bessere Trennung zwischen Hauptagent und Spezialarbeit

## Hooks in Claude Code

### Was Hooks sind
Hooks sind automatisch ausgeführte Kommandos an bestimmten Ereignissen.

### Wichtige Hook-Punkte
1. `PreToolUse`
2. `PostToolUse`
3. `Notification`
4. `UserPromptSubmit`

### Warum Hooks wichtig sind
Sie können:
1. blockieren,
2. Zusatzkontext einspeisen,
3. externe Validierung machen,
4. Regeln vor oder nach Tool-Läufen durchsetzen.

## Settings und Kontext

### Was in `settings.json` steckt
Laut Doku:
1. `permissions.allow`
2. `permissions.deny`
3. Projekt- und User-Settings
4. MCP-Freigaben wie `enableAllProjectMcpServers`
5. Subagent-Konfiguration

### Was das für den Tool-Loop heißt
Tool-Calls leben nicht lose irgendwo.
Sie hängen an:
1. Settings
2. MCP-Konfig
3. Skills
4. Subagents
5. Hooks

## Die wichtigste Architektur-Idee hinter Claude Code
Claude Code trennt:

1. Oberflächen
2. Tool-System
3. Regel-System
4. Kontext-Bausteine
5. Erweiterungen

genug voneinander, damit alles zusammenarbeiten kann.

## Was Notedrill davon lernen sollte

### 1. Skills statt großer starrer Systemprompts
Notedrill sollte mehr Fachwissen in modulare Dateien legen.

### 2. Lokale und entfernte Werkzeuge im selben Vertrag
Nicht ein MCP-Weg für links und ein Bridge-Weg für rechts.
Beides sollte im gleichen Event- und Run-Vertrag erscheinen.

### 3. Subagent-Idee übernehmen
Beispiele:
1. `planer`
2. `notiz-reviewer`
3. `quiz-generator`
4. `datei-pruefer`

### 4. Hook-Idee später gezielt nutzen
Zum Beispiel für:
1. Pfadprüfung
2. JSON-Reparatur
3. Sicherheits-Checks

## Meine kurze Bewertung

| Bereich | Bewertung für Notedrill |
|---|---|
| Tool-System | sehr lehrreich |
| MCP-Integration | sehr wichtig |
| Skills | sehr wichtig |
| Subagents | sehr wichtig |
| Hooks | später wichtig |
| direkt auf Mobile | nein, nur über Host |

## Quellen
1. Claude Code Quickstart: https://code.claude.com/docs/en/quickstart
2. Claude Code MCP: https://docs.claude.com/en/docs/claude-code/mcp
3. Claude Code Skills: https://code.claude.com/docs/en/skills
4. Claude Code Settings: https://code.claude.com/docs/en/settings
5. Claude Code Hooks: https://docs.claude.com/en/docs/claude-code/hooks
6. Claude Code Subagents: https://docs.claude.com/en/docs/claude-code/subagents
7. Claude Agent SDK MCP: https://platform.claude.com/docs/en/agent-sdk/mcp
8. Lokale Referenz: `/mnt/d/CODING/React Projects/claude-code/README.md`
