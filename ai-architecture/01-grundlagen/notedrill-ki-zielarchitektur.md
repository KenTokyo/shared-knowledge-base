# Notedrill Mobile: KI-Architektur Masterplanung und Recherche

Stand: 8. März 2026

## Was wurde verstanden?

1.  Die App soll auf Android und iOS starke KI-Agenten-Funktionen bekommen.
2.  Das Ganze soll möglichst günstig sein.
3.  Dateisystem-Persistenz ist Pflicht.
4.  Die Lösung soll klar trennen zwischen echtem Produktweg, Dev-Weg und Testweg.

## Worum es hier geht

Diese Datei ist die Hauptplanung.  
Sie verbindet:

1.  den echten Notedrill-Stand im Code,
2.  die aktuelle Recherche zu Codex, Gemini, Claude Code, Qwen Code, OpenCode und MCP,
3.  die Empfehlung für die beste Architektur.

## Die wichtigste Klarstellung zuerst

1.  Ein Abo, ein API-Key und eine CLI sind nicht dasselbe.
2.  MCP ist nicht der Agent selbst.
3.  Tool-Calls kommen nicht von allein nur wegen eines Modells.
4.  Für das schrittweise Arbeiten braucht man immer auch einen Ablauf-Steuerer.

Orchestrator = unser Ablauf-Steuerer für mehrere KI-Schritte hintereinander.

## So sieht Notedrill heute wirklich aus

### Mobile-App

1.  `features/chat/components/store/useChatStore.ts` sendet heute an Bridge-Endpunkte.
2.  Die App kann Tool-Logs im Chat anzeigen.
3.  `features/chat/components/interface/agent-note-upsert-service.ts` übernimmt erzeugte Dateien nur kontrolliert.
4.  `features/chat/components/interface/agent-note-artifact-service.ts` holt Datei-Inhalte aus der Antwort oder über `/api/agent/bridge/local-artifact`.
5.  `lib/agent/bridge/mobile-capability-boundary.ts` hält klar fest: kein `child_process`, kein echtes lokales CLI im App-Prozess.

### Backend-Stand im Next.js-Ursprung

1.  `app/api/agent/bridge/codex-cli/route.ts` und `app/api/agent/bridge/gemini-cli/route.ts` leiten auf dieselbe gemeinsame Bridge-Logik.
2.  `app/api/agent/bridge/_shared/bridge-route.ts` liefert heute nur Text plus leere `toolCalls` und `toolResults`.
3.  Der Name `codex-cli` bedeutet im aktuellen Stand also nicht automatisch echte lokale Codex-CLI-Ausführung.
4.  Eine Route für `local-artifact` habe ich im `notedrill-backend-nextjs`\-Stand vom 8. März 2026 nicht gefunden.

### Was das für uns bedeutet

1.  Die Mobile-App ist schon auf einen stärkeren Agent-Weg vorbereitet.
2.  Der Backend-Weg ist dafür aber noch nicht auf dem Zielstand.
3.  Genau hier liegt der wichtigste Umbaupunkt.

## Was die Recherche klar gezeigt hat

### 1\. Schrittweise Tool-Calls sind kein Zaubertrick

Wenn ein System wie Codex CLI oder Gemini CLI Schritt für Schritt arbeitet, steckt dahinter meistens:

1.  ein Modell mit Tool-Unterstützung,
2.  ein Lauf-Zustand pro Aufgabe,
3.  ein Loop:
    *   Modell fragt Werkzeug an,
    *   Host führt Werkzeug aus,
    *   Ergebnis geht zurück ans Modell,
    *   dann folgt der nächste Schritt.

### 2\. Kann das auch mit nur API-Key gehen?

Ja, grundsätzlich schon.  
Aber nur wenn wir den Lauf selbst bauen oder ein passendes SDK nutzen.

Das heißt:

1.  Ein API-Key allein reicht nicht.
2.  Man braucht zusätzlich Lauf-Logik, Freigaben, Tool-Registrierung und Speicher.
3.  Genau deshalb wirken reine Chat-Aufrufe oft wie eine einzelne Antwort, während CLI-Agenten wie eine kleine Schleife arbeiten.

### 3\. Was MCP wirklich ist

MCP steht für Model Context Protocol.  
Das ist ein gemeinsamer Steckplatz für Werkzeuge und Datenquellen.

Für uns heißt das:

1.  MCP kann dem Agenten neue Werkzeuge geben.
2.  MCP kann Datenquellen wie Supabase oder andere Systeme anbinden.
3.  MCP ersetzt aber nicht den Agent-Host.
4.  Jemand muss trotzdem den eigentlichen Loop ausführen.

### 4\. Mobile-Grenzen bleiben echt

1.  Android und iOS können lokale Dateien im App-Bereich gut.
2.  Android und iOS können SQLite gut.
3.  Android und iOS können kein normales Desktop-CLI sauber im App-Prozess starten.
4.  Android mit Termux ist ein Testweg.
5.  iOS direkt lokal ist noch schwächer und kein sauberer Produktweg.

### 5\. Abo-Zugang und API-Zugang muss man trennen

Die aktuelle Marktlage am 8. März 2026 zeigt:

1.  Manche Tools lassen Login mit Abo oder Account zu.
2.  Manche Wege laufen über API-Key.
3.  Manche Tools bieten beides.
4.  Für eine saubere App-Architektur brauchen wir deshalb getrennte Provider-Modi.

## Die Zielarchitektur, die ich empfehle

### Kernidee

Nicht eine einzelne Wunderlösung bauen.  
Sondern drei klare Wege:

1.  `app_remote` für normale Nutzer
2.  `desktop_companion` für starke lokale Agenten auf Laptop oder PC
3.  `android_termux_experimental` nur als Testweg

Ergänzend aus älteren Projekt- und Runbook-Ständen:  
4\. `laptop_remote_fallback` wenn lokaler Host ausfällt  
5\. `ipad_ish_experimental` nur als bewusster POC

### Zielbild in einfach

#### Schicht 1: Mobile-App

1.  Zeigt Chat, Status, Kostenhinweise und Tool-Schritte.
2.  Hält kleine lokale Zustände.
3.  Übernimmt Dateien nur über feste Verträge.

#### Schicht 2: Lauf-Host

Der Lauf-Host ist der eigentliche Agent-Startpunkt.

Er kann sein:

1.  ein Remote-Backend,
2.  ein Companion auf Laptop oder PC,
3.  im Testfall Termux auf Android,
4.  im POC-Fall iSH auf dem iPad.

#### Schicht 3: Provider-Adapter

Hier trennen wir sauber:

1.  `subscription_cli`
    *   Codex CLI
    *   Gemini CLI
    *   Claude Code
    *   Qwen Code
    *   OpenCode
2.  `api_runtime`
    *   OpenAI Responses oder Agents
    *   Gemini API
    *   Anthropic API
    *   OpenRouter
    *   DashScope oder Qwen API
3.  `premium_optional`
    *   extra Bezahlwege wie Alibaba-Qwen-Pfade

#### Schicht 4: Tool- und Daten-Layer

1.  Interne Schreib-Tools für Notizen, Quiz, Lernkarten und Kreuzworträtsel
2.  Lesende Werkzeuge für Suche und Projektkontext
3.  MCP nur dort, wo es wirklich hilft
4.  Standard erst einmal auf read-only

#### Schicht 5: Artefakt-Vertrag

Jeder Lauf darf nur in klare Zielpfade schreiben:

1.  `profiles/{profileId}/notes/{noteId}/content.md`
2.  `profiles/{profileId}/notes/{noteId}/meta.json`
3.  `profiles/{profileId}/quizzes/{quizId}/quiz.json`
4.  `profiles/{profileId}/cards/{cardId}.json`
5.  weitere JSON-Dateien für Diagramme, Ink und Kreuzworträtsel

#### Schicht 6: Prüf- und Kosten-Layer

1.  Zeitlimit pro Lauf
2.  Budgetlimit pro Lauf
3.  erlaubte Werkzeuge
4.  Pfad-Whitelist
5.  UTF-8-Prüfung
6.  klare Fehlertexte

## Meine Rangliste nach Ziel

### Beste Architektur für das echte Produkt

1.  Remote-Orchestrator plus API-Provider plus feste Datei-Verträge
2.  optionaler Companion für Power-User
3.  MCP nur als Zusatz-Layer, nicht als Kern

### Beste günstige Dev- und Power-User-Lösung

1.  Gemini CLI im Companion
2.  Codex CLI im Companion
3.  Qwen Code oder OpenCode als Zusatzweg

### Beste Qualitätslösung für harte Aufgaben

1.  Claude Code oder Codex im Companion oder Remote-Host
2.  interne Verträge bleiben trotzdem dieselben

## Was ich ausdrücklich nicht empfehle

1.  Die installierte Mobile-App direkt zum allgemeinen CLI-Host machen
2.  MCP als Ersatz für den Agent-Loop zu behandeln
3.  freien Datei-Zugriff ohne Vertragsprüfung
4.  Produktbetrieb nur auf Termux aufzubauen
5.  Abo-Zugang und API-Zugang im selben Schalter zu vermischen

## Konkrete Entscheidung für Notedrill

### Empfehlung

Die beste Mischung ist:

1.  Produktmodus:
    *   Remote-Orchestrator
    *   API-Provider
    *   feste Artefakt-Verträge
2.  Companion-Modus:
    *   echte CLIs für starke lokale Agenten
    *   Codex CLI, Gemini CLI, Claude Code, Qwen Code oder OpenCode
3.  Testmodus:
    *   Android mit Termux
    *   nur als Experiment oder Debug-Weg

### Warum genau diese Mischung?

1.  Sie läuft auf Android und iOS wirklich sauber.
2.  Sie spart Kosten, weil wir günstige und kostenlose Companion-Wege nutzen können.
3.  Sie hält den Produktweg stabil.
4.  Sie lässt später MCP, ChatGPT-Apps und weitere Werkzeuge als Zusatz zu.

## Nächste Dateien in dieser Planung

1.  `notedrill-ki-anbieter-vergleich-und-ranking.md`
2.  `notedrill-ki-szenario-matrix-geraete-und-hosting.md`
3.  `notedrill-ki-konkrete-user-journeys-und-setup-checklisten.md`
4.  `notedrill-ki-kosten-speicher-und-abopakete.md`
5.  `notedrill-ki-aufwand-und-verantwortung-pro-betriebsmodell.md`
6.  `notedrill-ki-phasenplan.md`
7.  `notedrill-ki-qa.md`
8.  `chatgpt-connector.md` als Zusatzthema
9.  `toolcall-architecture/` als eigener Vergleichsblock für Tool-Calls, MCP, Skills und Host-Systeme
10.  `03-agentic-umsetzung/notedrill-ki-agentic-massnahmen-und-taskliste.md`
11.  `03-agentic-umsetzung/phasen/` mit den Umsetzungsphasen 01 bis 09
12.  `03-agentic-umsetzung/notedrill-ki-agentic-userwege-und-kosten-diagramme.md`

## Quellen, die ich für diese Planung geprüft habe

1.  OpenAI Codex Repository: https://github.com/openai/codex
2.  OpenAI Agents SDK Guide: https://developers.openai.com/api/docs/guides/agents-sdk
3.  OpenAI Shell Tool Guide: https://developers.openai.com/api/docs/guides/tools-shell
4.  OpenAI Apps SDK: https://developers.openai.com/apps-sdk
5.  Google Gemini CLI Repository: https://github.com/google-gemini/gemini-cli
6.  Gemini API Pricing: https://ai.google.dev/gemini-api/docs/pricing
7.  Anthropic Claude Code Setup: https://code.claude.com/docs/en/setup
8.  Anthropic Claude Code MCP: https://code.claude.com/docs/en/mcp
9.  Anthropic Claude Code SDK TypeScript: https://docs.anthropic.com/en/docs/claude-code/sdk/sdk-typescript
10.  Anthropic Claude Code SDK Hosting: https://docs.anthropic.com/en/docs/claude-code/sdk/sdk-hosting
11.  Qwen Code Repository: https://github.com/QwenLM/qwen-code
12.  OpenCode Docs: https://opencode.ai/docs
13.  Model Context Protocol: https://modelcontextprotocol.io
14.  Supabase MCP Guide: https://supabase.com/docs/guides/getting-started/mcp

## Kurz-Wörterbuch

1.  Agent-Loop: Die KI arbeitet in mehreren Schritten statt nur mit einer Antwort.
2.  Companion: Ein Zusatz-Host auf Laptop oder PC, der schwere Agent-Arbeit übernimmt.
3.  MCP: Ein Standard-Steckplatz für Werkzeuge und Datenquellen.
4.  Provider-Adapter: Ein Übersetzer zwischen Notedrill und einem Anbieter.
5.  Run: Ein einzelner KI-Durchlauf mit Verlauf, Werkzeugen und Ergebnissen.