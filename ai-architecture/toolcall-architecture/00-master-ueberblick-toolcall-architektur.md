# Notedrill Mobile: Master-Überblick Tool-Call-Architektur

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst einen eigenen Architektur-Block nur für Tool-Calls.
2. Es geht nicht nur um Anbieter-Dokus, sondern auch um echte lokale Projekte.
3. Der Fokus liegt auf: Claude Code, Gemini CLI, Codex CLI, OpenCode, UniAI, Automaker und Notedrill.

## Ziel dieses Ordners
Dieser Ordner erklärt:

1. wie die großen Coding-Agenten ihre Werkzeug-Aufrufe (Tool-Calls) wirklich machen,
2. wie MCP, Skills, Kontext und Berechtigungen dabei zusammenspielen,
3. wie UniAI, Automaker und Notedrill diese Ideen lokal umsetzen,
4. was Notedrill davon übernehmen sollte.

## Die wichtigste Klarstellung
Ein Tool-Call-System besteht fast nie nur aus dem Modell.
Fast immer braucht man diese Bausteine:

1. einen Host,
2. eine Liste von Werkzeugen,
3. Regeln für Erlaubnis oder Blockierung,
4. einen Loop:
   - Modell fragt Werkzeug an,
   - Host führt aus,
   - Ergebnis geht zurück,
   - Modell entscheidet weiter.

## Die vier Grundmuster, die wir gesehen haben

| Muster | Kurz erklärt | Beispiele |
|---|---|---|
| CLI-Spawn | Ein lokales Tool wird als Prozess gestartet und streamt Ereignisse zurück | UniAI mit Claude, Gemini, Codex, OpenCode |
| SDK-Host | Ein Server oder Host nutzt ein SDK direkt und streamt strukturierte Antworten | Automaker mit Claude Agent SDK |
| Bridge-Proxy | Eine App ruft einen Adapter oder Server an und bekommt Tool-Events zurück | Notedrill Mobile Bridge |
| MCP-Layer | Ein Standard verbindet zusätzliche Tools, Ressourcen und Prompts | Claude Code, Gemini CLI, OpenCode, Automaker |

## Die wichtigsten Unterschiede auf einen Blick

| System | Host | Werkzeuge | Berechtigungen | Kontext | MCP | Skills oder Subagents | Status |
|---|---|---|---|---|---|---|---|
| Claude Code | lokaler CLI oder kompatibler Host | eingebaute Tools plus MCP | stark über Settings, Hooks, Freigaben | CLAUDE.md, Skills, Subagents | sehr stark | ja | sehr ausgereift |
| Gemini CLI | lokaler CLI-Host | eingebaute Tools plus MCP | Bestätigung, Sandbox, Policies | GEMINI.md, Skills, Extensions | sehr stark | ja | sehr ausgereift |
| Codex CLI | lokaler CLI-Host oder API-SDK-Weg | Agent- und Tool-Flow, MCP anbindbar | Sandbox und Approval-Konzept | Konfig, State-DB, Apps | gut | indirekt | stark |
| OpenCode | lokaler CLI-Host | eingebaute Tools, Custom Tools, MCP | allow/ask/deny pro Tool | Agenten, Skills, Config | sehr stark | ja | sehr flexibel |
| UniAI VS Code | lokaler VS-Code-Host | CLI-Tools der Anbieter, MCP-Service der Extension | eigenes Permission-System | CLAUDE.md, Agent Prompts, Sitzungen | ja | ja | gutes Referenzprojekt |
| Automaker | Server-Host | Provider-abhängig, MCP, SDK-Optionen | zentral über Settings und Providerregeln | Kontextdateien, Memory, Sessions | ja | ja | sehr starkes Referenzprojekt |
| Notedrill heute | Mobile-Bridge + teils Backend | Bridge-Events und lokale Übernahme | Vertrag, Pfadregeln, Bridge-Checks | Systemprompt, Chat-Store, Verträge | vorhanden, aber noch nicht Endzustand | teilweise | noch gemischt |

## Welche Dateien in diesem Ordner liegen

| Datei | Worum es geht |
|---|---|
| `00-master-ueberblick-toolcall-architektur.md` | Einstieg und Gesamtbild |
| `01-claude-code-toolcalls-und-erweiterungen.md` | Claude Code, MCP, Skills, Hooks, Subagents |
| `02-gemini-cli-toolcalls-und-erweiterungen.md` | Gemini CLI, Core, Tools, MCP, Skills, Extensions |
| `03-codex-cli-toolcalls-und-erweiterungen.md` | Codex CLI, JSON-Events, Sandbox, Apps, MCP |
| `04-opencode-toolcalls-und-erweiterungen.md` | OpenCode, Agents, Skills, Permissions, Custom Tools |
| `05-uniai-chat-vscode-extension-toolcall-system-und-sidebar.md` | lokale VS-Code-Architektur mit Sidebar und Tool-Normalisierung |
| `06-automaker-toolcall-system-und-server-orchestrierung.md` | serverseitiger Agent- und Provider-Stack |
| `07-notedrill-toolcall-system-ist-zustand-backend-mobile.md` | Ist-Zustand von Notedrill Backend und Mobile |
| `08-vergleich-und-was-notedrill-lernen-soll.md` | Zusammenfassung, Learnings und Architekturverbesserungen |

## Größte Erkenntnisse aus der Recherche
1. Claude Code, Gemini CLI und OpenCode sind stark, weil sie Tool-Loop, Regeln und Kontext als Ganzes behandeln.
2. Codex ist stark, weil es lokales Agent-Verhalten, Modellrouting und Konfiguration klar trennt.
3. UniAI zeigt gut, wie man rohe CLI-Events in eine Sidebar und Chat-UI übersetzt.
4. Automaker zeigt gut, wie man Provider sauber in einem Server trennt und trotzdem denselben Tool-Begriff behält.
5. Notedrill hat schon gute Vertrags- und Bridge-Ideen, aber der aktuelle Next.js-Bridge-Stand liefert noch nicht die gleiche Tiefe wie die stärkeren Referenzsysteme.

## Kernfrage für Notedrill
Nicht:
„Welches Tool ist am coolsten?“

Sondern:
„Welcher Host, welche Tool-Datenform und welche Rechte-Struktur geben uns auf Mobile den stabilsten Weg?“

## Meine kurze Vorentscheidung
1. Notedrill sollte nicht ein einzelnes Fremd-Tool kopieren.
2. Notedrill sollte einen eigenen Run- und Tool-Call-Vertrag bauen.
3. Die stärksten Ideen kommen dabei aus:
   - Claude Code für Skills, Subagents und MCP-Denke
   - Gemini CLI für Core-Architektur und MCP-Discovery
   - Codex für Ereignisse, Approval und lokale Zustände
   - OpenCode für Agent-Rollen und feinere Berechtigungen
   - Automaker für Provider-Fabrik und Server-Host
   - UniAI für UI, Sidebar und Prozess-Normalisierung

## Wichtige Quellen
1. Claude Code Quickstart: https://code.claude.com/docs/en/quickstart
2. Claude Code MCP: https://docs.claude.com/en/docs/claude-code/mcp
3. Claude Code Skills: https://code.claude.com/docs/en/skills
4. Claude Code Settings: https://code.claude.com/docs/en/settings
5. Claude Agent SDK MCP: https://platform.claude.com/docs/en/agent-sdk/mcp
6. Gemini CLI Repository: https://github.com/google-gemini/gemini-cli
7. Gemini CLI Tools: https://geminicli.com/docs/tools/
8. Gemini CLI MCP: https://geminicli.com/docs/tools/mcp-server/
9. Gemini CLI Skills: https://geminicli.com/docs/cli/skills/
10. Gemini CLI Extensions: https://geminicli.com/docs/extensions/
11. Codex Repository: https://github.com/openai/codex
12. OpenAI Codex Models: https://developers.openai.com/api/docs/models/gpt-5.2-codex
13. OpenAI Apps SDK: https://developers.openai.com/apps-sdk
14. OpenCode Agents: https://opencode.ai/docs/agents
15. OpenCode Skills: https://opencode.ai/docs/skills
16. OpenCode Custom Tools: https://opencode.ai/docs/custom-tools
17. OpenCode MCP Servers: https://opencode.ai/docs/mcp-servers
18. OpenCode Permissions: https://opencode.ai/docs/permissions
