# Notedrill Mobile: Anbieter-Vergleich und Ranking für KI-Agenten

Stand: 8. März 2026

## Was wurde verstanden?
1. Du brauchst nicht nur ein grobes Ranking.
2. Du brauchst eine echte Vergleichsdatei mit Rollen, Aufwand und Geräteblick.
3. Der Vergleich soll zeigen, was für Schüler, Power-User, iPad-only und Betreiber wirklich passiert.

## So liest man diese Datei
1. `lokal` heißt: läuft auf Mac, Windows oder Linux als eigener Host.
2. `direkt mobil` heißt: läuft im installierten App-Prozess auf iPhone, iPad oder Android.
3. `remote` heißt: läuft auf Server oder Companion außerhalb der App.
4. `Betreiber` meint Schule, Elternkonto, App-Anbieter oder Team, das den Dienst bereitstellt.

## Große Vergleichstabelle

| Weg | Offizieller Stand am 8. März 2026 | Lokal auf Mac/Linux/Windows | Direkt in iOS/Android-App | Login oder Bezahlung | Was der Nutzer tun muss | Was der Betreiber tun muss | Supportlast | Beste Rolle |
|---|---|---|---|---|---|---|---|---|
| Codex CLI | OpenAI-Coding-Agent, lokal auf dem Computer, mit ChatGPT-Login oder API-Key nutzbar | Ja, laut Repo auf macOS und Linux direkt, Windows über WSL2 | Nein | ChatGPT-Plan oder API-Key | installieren, anmelden, Projekt freigeben | nur Pairing und Lauf-Vertrag, wenn Companion genutzt wird | mittel | starker Companion für Power-User |
| Gemini CLI | Open-Source-Agent von Google mit freiem Einstiegsbereich und API-Key-Option | Ja, praktisch auf Desktop mit Node oder Paketmanager | Nein | Google-Login oder Gemini-API-Key | installieren, anmelden oder Key setzen | optionaler Companion-Host, Budget-Regeln | mittel | günstigster Companion-Kandidat |
| Claude Code | Terminal-Agent von Anthropic, mit Claude.ai-Abo oder Anthropic-Console nutzbar | Ja, laut Doku auf macOS, Linux, WSL und Windows | Nein | Claude.ai-Plan oder Console-Credits | installieren, einloggen, Projekt freigeben | Companion oder Remote-Host, klare Budget- und Datenschutzregeln | mittel bis hoch | Qualitätsweg für schwere Aufgaben |
| Qwen Code | Offizieller CLI-Agent, abgeleitet von Gemini CLI, mit freiem Tageslimit oder API-kompatiblen Wegen | Ja, laut Repo auf Linux, macOS und Windows | Nein | Qwen-Login, OpenAI-kompatible APIs oder eigener Provider | installieren, anmelden oder API setzen | Zusatz-Adapter, Qualitäts- und Stabilitätsprüfung | mittel | günstiger Zusatzweg |
| OpenCode | Multi-Provider-Host mit Agenten, MCP, Themen und flexiblen Provider-Anschlüssen | Ja, laut Doku auf macOS und Linux, Windows noch im Ausbau | Nein | je nach verbundenem Provider | installieren, Provider verbinden | Support für viele Wege und mehr Oberfläche | mittel bis hoch | flexible Labor- und Companion-Hülle |
| OpenAI Responses oder Agents | API- und SDK-Weg für eigene Agent-Hosts | Ja, aber als eigener Host, nicht als Schüler-CLI | Ja, aber nur über Remote-Host | API-Kosten | nur App nutzen, wenn Betreiber zahlt | ganzen Agent-Host bauen und betreiben | hoch | sauberster Produktkern |
| Gemini API | API-Weg mit klaren Preis- und Limit-Seiten | Ja, aber als eigener Host | Ja, aber nur über Remote-Host | API-Kosten | optional API-Key eingeben oder nur App nutzen | Host, Budget, Quoten und Ausfallschutz bauen | mittel bis hoch | günstiger Produktweg |
| Claude Code SDK | SDK für eigene Agenten mit Datei-, Bash- und Web-Werkzeugen | Ja, auf Host-Umgebungen wie Node, Bun oder Deno | Nicht im normalen Mobile-App-Prozess | API-Key oder Anthropic-Umgebungen | nichts direkt, wenn remote | Host und Sicherheitsregeln bauen | hoch | Premium-Remote-Weg |
| MCP-Server | Werkzeug-Standard für Tools, Ressourcen und Prompts | Ja, lokal oder remote je nach Servertyp | Nein als Kern-Host | je nach Server | meist nichts, wenn schon eingebunden | Server wählen, Rechte begrenzen, OAuth oder Token pflegen | mittel | Werkzeug-Layer |
| ChatGPT-Apps oder Connector | Zusatzweg in ChatGPT, nicht der Kern der Mobile-App | Web und Windows gut, mobiles Vollerlebnis laut Help Center noch nicht überall da | Nicht verlässlich als App-Kern | ChatGPT-Nutzung und App-Setup | in ChatGPT verbinden | eigenen MCP- oder App-Endpunkt bereitstellen | mittel | Nebenkanal für Recherche und Wissen |

## Was die große Tabelle in einfach bedeutet
1. Kein CLI-Weg ist ein sauberer Direktweg für die installierte iPad- oder iPhone-App.
2. Für iPad-only und iPhone-only bleibt remote fast immer Pflicht.
3. Companion spart oft Betreiberkosten, erhöht aber Nutzer- und Supportaufwand.
4. APIs sind für den Produktkern am saubersten, kosten aber laufend Tokens.

## Geräte- und Weg-Matrix

| Weg | iPad-only | iPhone-only | Android-only | MacBook | Windows-PC | Linux-PC | Ohne PC im Alltag | Schule mit MDM-Sperren |
|---|---|---|---|---|---|---|---|---|
| Codex CLI | schlecht | schlecht | schlecht | sehr gut | gut mit WSL2 | sehr gut | nein | meist nein |
| Gemini CLI | schlecht | schlecht | schlecht | sehr gut | gut bis ordentlich | sehr gut | nein | meist nein |
| Claude Code | schlecht | schlecht | schlecht | sehr gut | gut | sehr gut | nein | meist nein |
| Qwen Code | schlecht | schlecht | schlecht | gut | gut | gut | nein | meist nein |
| OpenCode | schlecht | schlecht | schlecht | gut | noch vorsichtig | gut | nein | meist nein |
| OpenAI Responses oder Agents | gut, wenn remote betrieben | gut, wenn remote betrieben | gut, wenn remote betrieben | gut | gut | gut | ja | ja |
| Gemini API | gut, wenn remote betrieben | gut, wenn remote betrieben | gut, wenn remote betrieben | gut | gut | gut | ja | ja |
| ChatGPT-Apps oder Connector | nur als Zusatz | nur als Zusatz | nur als Zusatz | gut als Zusatz | gut als Zusatz | gut im Browser | nein als Kern | selten sinnvoll als Kern |

## Was der Nutzer wirklich tun muss

| Weg | Nutzer-Aufwand | Typische Schritte für den Nutzer | Typische Stolpersteine |
|---|---|---|---|
| Reiner Remote-Weg | niedrig | App öffnen, anmelden, loslegen | Anbieter-Ausfall, Quoten leer |
| Remote mit eigenem API-Key | mittel | Key besorgen, eintragen, testen | falscher Key, Limits, Kostenangst |
| Companion mit Codex oder Gemini | mittel bis hoch | Tool installieren, anmelden, Pairing aktivieren | WSL, Firewall, OAuth, fehlende Rechte |
| Companion mit Claude Code | mittel bis hoch | Tool installieren, Konto anmelden, Pairing aktivieren | Plan-Fragen, Freigaben, Terminal-Hürden |
| Android Termux | hoch | Termux, Node, CLI, Port, Pairing | sehr fragil, Hintergrund-Stop, Support schwer |
| ChatGPT-App-Weg | niedrig bis mittel | in ChatGPT verbinden | hilft nicht direkt beim Notedrill-Dateisystem |

## Was der Betreiber wirklich tun muss

| Weg | Betreiber-Aufwand | Typische Aufgaben | Wer zahlt meist |
|---|---|---|---|
| Reiner Remote-Weg | hoch | Server, Quoten, Storage, Backups, Monitoring | Betreiber |
| Remote plus eigener API-Key der Nutzer | mittel | nur Host und Storage, weniger Tokenrisiko | gemischt |
| Companion-first | mittel | Pairing, Host-Profil, Support-Doku | Nutzer oder Team |
| Schul- oder Team-Companion | hoch | Geräte-Setup, Policies, Support, Updates | Schule oder Betreiber |
| ChatGPT-App-Zusatz | mittel | MCP- oder App-Endpunkt, Auth, Rechte | Betreiber oder Nutzer |

## Echte Ranglisten nach Ziel

### Ziel 1: So günstig wie möglich
1. Gemini CLI im Companion
2. Qwen Code als Zusatzweg
3. Gemini API im Remote-Host
4. OpenAI- oder Claude-Pfade erst später für Premium oder Spezialfälle

### Ziel 2: So gut wie möglich für iPad-only und iPhone-only
1. Remote-Orchestrator mit API-Modellen
2. optional BYOK mit API-Key
3. ChatGPT-Apps nur als Zusatz, nicht als Kern

### Ziel 3: So stark wie möglich für MacBook- oder Linux-Power-User
1. Codex CLI
2. Claude Code
3. Gemini CLI
4. OpenCode als flexible Hülle

### Ziel 4: So einfach wie möglich für Schulen
1. zentraler Remote-Weg
2. feste Quoten und einfache Rollen
3. Companion nur für Lehrkräfte oder Admins

## Einzelbewertung mit mehr Tiefe

## Codex CLI

### Stärken
1. echter Agentenstil mit lokalem Computer-Host
2. laut OpenAI-Repo mit ChatGPT-Plan oder API-Key nutzbar
3. MCP- und Connector-Themen sind im Codex-Umfeld schon mitgedacht

### Schwächen
1. nicht direkt für iPad- oder Android-App
2. Windows offiziell vor allem über WSL2 klar beschrieben
3. für reinen Schüler-Massenbetrieb ohne Computer kein Kernweg

### Mein Einsatzbild
1. bester Power-User-Companion für Mac und Linux
2. auf Windows gut, wenn WSL2 okay ist
3. nicht der Standardweg für iPad-only

## Gemini CLI

### Stärken
1. sehr guter Preis-Leistungs-Weg
2. freier Einstiegsbereich laut Google-Doku
3. guter Kandidat für Schüler mit späterem Laptop

### Schwächen
1. nicht direkt im Mobile-App-Prozess
2. Quoten können sich ändern
3. Google-Login und CLI-Setup sind für jüngere Nutzer nicht immer leicht

### Mein Einsatzbild
1. bester günstiger Companion
2. guter erster Laptop-Weg, wenn ein Schüler vom iPad auf Mac oder PC wechselt
3. sinnvoller Standard für dev-nahe Nutzer

## Claude Code

### Stärken
1. starke Qualität
2. starke MCP- und Tool-Welt
3. laut Doku klarer Weg für Terminal, IDE und mehrere Desktop-Plattformen

### Schwächen
1. kein sauberer Mobile-Direktweg
2. eher kein Billigweg
3. für breiten Schüler-Betrieb nur mit Bedacht

### Mein Einsatzbild
1. Premium-Weg
2. Qualitätsweg für schwierige Aufgaben
3. eher Begleit- oder Power-User-Modus

## Qwen Code

### Stärken
1. freier oder günstiger Einstieg
2. Windows, macOS und Linux im Repo beschrieben
3. sinnvoll, wenn wir noch einen Billig-Zusatzweg wollen

### Schwächen
1. weniger erprobt als Codex oder Gemini
2. Support-Aufwand kann höher sein
3. nicht mein erster Hauptweg für die breite Masse

### Mein Einsatzbild
1. Reserve- und Zusatzpfad
2. gut für experimentierfreudige Nutzer
3. gut als Preisdruck-Alternative

## OpenCode

### Stärken
1. viele Provider in einer Oberfläche
2. MCP und Agenten sind schon Teil des Konzepts
3. gut, wenn wir langfristig flexibel bleiben wollen

### Schwächen
1. Windows ist laut Docs noch nicht komplett ausgereift
2. zusätzliche Hülle bedeutet zusätzliche Support-Oberfläche
3. ersetzt nicht unseren eigenen Lauf-Vertrag

### Mein Einsatzbild
1. Experiment- und Profi-Weg
2. Companion-Zusatz für Teams
3. nicht erster Schul- oder iPad-only-Weg

## OpenAI Responses oder Agents

### Stärken
1. sauberster Weg für einen eigenen Produkt-Host
2. offiziell dokumentierte Tool- und Agenten-Welt
3. gut kontrollierbar bei Quoten, Freigaben und Logs

### Schwächen
1. laufende API-Kosten
2. Betreiber muss echten Host bauen
3. kein Gratis-Abo-Ersatz

### Mein Einsatzbild
1. Hauptweg für iPad-only, iPhone-only und Schulbetrieb
2. stabiler Kern für Notedrill Remote
3. guter Maßstab für Verträge und Audit-Daten

## Gemini API

### Stärken
1. gute Preis-Seite
2. freie und bezahlte Wege klar getrennt
3. sinnvoll für günstigen Remote-Kern

### Schwächen
1. eigener Agent-Loop bleibt unsere Arbeit
2. Google-spezifische Limits und Login-Fragen
3. nicht automatisch magisch nur durch API-Key

### Mein Einsatzbild
1. günstiger Produktkern
2. guter Start für Remote-Only-Nutzer
3. starke Basis für iPad-only

## MCP-Server

### Stärken
1. sehr stark für Zusatzwissen und Tools
2. gut für Supabase, Suche und Admin-Werkzeuge
3. stark für spätere Erweiterungen

### Schwächen
1. kein Agent-Host
2. kann Rechte und Sicherheitsfragen verkomplizieren
3. sollte nicht am Anfang zu breit geöffnet werden

### Mein Einsatzbild
1. read-only zuerst
2. gezielt für Recherche und Verwaltung
3. erst später für Schreibrechte

## ChatGPT-Apps oder Connector

### Stärken
1. gut für zusätzliche Oberfläche außerhalb von Notedrill
2. kann ChatGPT-Nutzer schnell an Zusatzfunktionen bringen
3. passt gut zu einem eigenen MCP-Server

### Schwächen
1. laut Help Center ist das volle Erlebnis noch nicht überall auf mobile Apps ausgerollt
2. kein direkter Ersatz für Notedrill-Dateiwege
3. keine saubere Antwort auf iPad-only im Produktkern

### Mein Einsatzbild
1. Zusatzkanal
2. Wissens- und Recherche-Portal
3. nicht Kern-Architektur für Mobile

## Meine klare Empfehlung
1. Produktkern: Remote-Orchestrator mit günstigen API-Modellen
2. Companion: zuerst Gemini CLI und Codex CLI
3. Premium: Claude Code
4. Zusatz: Qwen Code und OpenCode
5. MCP: erst read-only und nie als Ersatz für den Agent-Loop

## Wichtige Quellen
1. OpenAI Codex Repository: https://github.com/openai/codex
2. OpenAI Codex in ChatGPT Help: https://help.openai.com/en/articles/11369540-codex-in-chatgpt
3. OpenAI GPT-5.2-Codex Model Page: https://platform.openai.com/docs/models/gpt-5.2-codex
4. OpenAI API Pricing: https://openai.com/api/pricing
5. OpenAI Apps SDK: https://developers.openai.com/apps-sdk
6. Building MCP Servers for ChatGPT Apps: https://platform.openai.com/docs/mcp
7. Google Gemini CLI Repository: https://github.com/google-gemini/gemini-cli
8. Gemini API Pricing: https://ai.google.dev/gemini-api/docs/pricing
9. Gemini API Rate Limits: https://ai.google.dev/gemini-api/docs/rate-limits
10. Google Gemini CLI Blog: https://developers.googleblog.com/en/google-gemini-cli/
11. Anthropic Claude Code Quickstart: https://docs.anthropic.com/en/docs/claude-code/quickstart
12. Anthropic Claude Code SDK: https://docs.anthropic.com/en/docs/claude-code/sdk
13. Anthropic Claude API Pricing: https://docs.anthropic.com/en/docs/about-claude/pricing
14. Qwen Code Repository: https://github.com/QwenLM/qwen-code
15. OpenCode Docs: https://opencode.ai/docs
16. Model Context Protocol: https://modelcontextprotocol.io
17. ChatGPT Apps with Sync Help: https://help.openai.com/en/articles/6825453-chatgpt-apps-on-ios-and-android
