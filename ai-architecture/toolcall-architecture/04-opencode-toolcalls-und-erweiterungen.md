# Notedrill Mobile: OpenCode Tool-Calls, Agents, Skills und Permissions

Stand: 8. März 2026

## Was wurde verstanden?
1. OpenCode ist für dich spannend, weil es viele Anbieter bündeln kann.
2. Du willst wissen, wie Tool-Calls dort mit Agents, MCP und Skills zusammenspielen.
3. Du willst auch verstehen, was `antigravity-*` im Umfeld bedeutet.

## Kurzbild
OpenCode ist nicht nur ein einzelner Chat.
Es ist ein Agenten-Host mit:

1. primären Agents,
2. Subagents,
3. Custom Tools,
4. MCP-Servern,
5. Skills,
6. feinen Berechtigungen.

## Die Agenten-Struktur von OpenCode

| Typ | Beschreibung |
|---|---|
| Primary Agents | Hauptagenten für die normale Sitzung |
| Subagents | spezialisierte Helfer, automatisch oder per `@` |
| Hidden System Agents | interne Helfer für Titel, Zusammenfassung und Kontextkompaktung |

## Eingebaute Agenten

| Agent | Rolle |
|---|---|
| `build` | normaler Hauptagent mit allen Tools |
| `plan` | Planungsagent mit restriktiveren Rechten |
| `general` | allgemeiner Subagent für komplexe Nebenarbeit |
| `explore` | schneller, read-only Subagent |
| `compaction` | interner Agent für Kontextverkleinerung |
| `title` | interner Agent für Sitzungstitel |
| `summary` | interner Agent für Sitzungszusammenfassung |

## Warum das wichtig ist
OpenCode trennt:

1. Arbeitsmodus,
2. Tool-Rechte,
3. Subagent-Arbeit,
4. Hintergrund-Agenten

klarer als viele andere Systeme.

## Tool-Calls in OpenCode

### Was offiziell beschrieben ist
1. built-in tools wie `read`, `write`, `bash`
2. Custom Tools
3. MCP-Server
4. Skills als eigenes Werkzeug `skill`

### Custom Tools
Custom Tools sind eigene Funktionen, die das LLM aufrufen kann.

Wichtig:
1. sie haben Argument-Schemas,
2. sie haben eine `execute`-Funktion,
3. sie können eingebaute Tools sogar überschreiben.

## MCP in OpenCode

### Was die Doku zeigt
1. MCP-Server sind ein eigener Konfig-Bereich
2. entfernte Server werden über `type: "remote"` plus `url` beschrieben
3. Header, OAuth und Timeout sind Teil der Konfig

### Bedeutung
OpenCode behandelt MCP als normalen Teil seiner Werkzeugwelt.

## Skills in OpenCode

### Was offiziell auffällt
OpenCode ist beim Skill-System erstaunlich kompatibel.

Es sucht Skills in:
1. `.opencode/skills/`
2. `~/.config/opencode/skills/`
3. `.claude/skills/`
4. `~/.claude/skills/`
5. `.agents/skills/`
6. `~/.agents/skills/`

### Warum das stark ist
OpenCode kann damit Skill-Welten aus mehreren Ökosystemen lesen.

## Permissions in OpenCode

### Was die Doku zeigt
Jede Regel kann auf:
1. `allow`
2. `ask`
3. `deny`

laufen.

### Besonders stark
Permissions können:
1. global
2. pro Tool
3. pro Muster
4. pro Agent

gesetzt werden.

### Beispiele aus der Doku
1. `git *` erlauben
2. `rm *` verbieten
3. `.env` bei `read` standardmäßig verbieten
4. `skill`-Zugriffe nach Muster erlauben oder blockieren

## Was lokale Integrationen zusätzlich zeigen

### UniAI-OpenCode-Fassade
Die lokale UniAI-Integration zeigt:
1. OpenCode liefert JSON-Events wie `text`, `tool_call`, `tool_result`, `step_finish`, `error`
2. diese werden in ein internes Standardformat normalisiert
3. Auth wird über Dateien und `opencode auth list` geprüft
4. Modelle und Provider werden dynamisch aus CLI und Config geladen

### `antigravity-*`
In der Extension habe ich keine eigene „AntiGravity-IDE-Engine“ gefunden.
Was ich klar gefunden habe:
1. `antigravity-*` Modell-IDs in der OpenCode-Modell-Erkennung
2. diese werden als dynamische Modelle behandelt

Darum ist mein sauberer Befund:
`Antigravity` ist in diesem Repo sichtbar als Modell- oder Provider-Bezeichnung im OpenCode-Umfeld, nicht als eigener separater Agent-Stack.

## Was Notedrill davon lernen sollte

### 1. Agent-Rollen sind Gold wert
Notedrill sollte nicht nur „ein KI-Chat“ sein.
Sondern klarer unterscheiden:
1. Build
2. Plan
3. Explore
4. Review

### 2. Skill-Kompatibilität ist stark
Wenn Notedrill später `.claude/skills`, `.agents/skills` oder eigene Skill-Orte lesen kann, wird die Welt viel offener.

### 3. Berechtigungen pro Tool und Muster
OpenCode ist hier sehr lehrreich.
Nicht nur global erlauben oder verbieten.
Sondern:
1. pro Tool
2. pro Pattern
3. pro Agent

## Meine kurze Bewertung

| Bereich | Bewertung für Notedrill |
|---|---|
| Agent-Rollen | sehr stark |
| Skills-Kompatibilität | sehr stark |
| MCP-Konfig | stark |
| feine Berechtigungen | sehr stark |
| Mobile-Direktweg | nein |
| Companion- oder Host-Tauglichkeit | sehr stark |

## Quellen
1. OpenCode Agents: https://opencode.ai/docs/agents
2. OpenCode Skills: https://opencode.ai/docs/skills
3. OpenCode Custom Tools: https://opencode.ai/docs/custom-tools
4. OpenCode MCP Servers: https://opencode.ai/docs/mcp-servers
5. OpenCode Permissions: https://opencode.ai/docs/permissions
6. Lokale Referenz: `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/process/OpenCodeProcessService.ts`
7. Lokale Referenz: `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/process/event-normalization.ts`
8. Lokale Referenz: `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/process/model-discovery.ts`
9. Lokale Referenz: `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/process/auth-validation.ts`
