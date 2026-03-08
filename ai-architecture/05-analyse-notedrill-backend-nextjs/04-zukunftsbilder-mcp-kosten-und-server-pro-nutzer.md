# Notedrill Backend Next.js: Zukunftsbilder, MCP, Kosten und Server pro Nutzer

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst offen prüfen, wie weit wir die Architektur drehen können.
2. Du willst Kosten sparen, aber beim Bauen selbst keine Denkgrenze setzen.
3. Du willst auch die Idee prüfen, ob ein zahlender Nutzer einen eigenen laufenden Server bekommen könnte.

## Die wichtigste Klarstellung zuerst
Nicht jede Coding-Flatrate oder jeder Tool-Login darf einfach als Produkt-Backend missbraucht werden.

Das ist wichtig.
Sonst plant man auf einem Weg, der später rechtlich oder technisch nicht sauber ist.

## Vier sinnvolle Zukunftsbilder

| Bild | Kurz erklärt | Nutzer-Aufwand | Betreiber-Aufwand | Kostenbild | Meine Einordnung |
|---|---|---|---|---|---|
| A | heutiger Chat, aber deutlich sauberer | sehr niedrig | mittel | günstig bis mittel | guter Sofortweg |
| B | gemeinsamer Remote-Agent-Host für alle | sehr niedrig | hoch | planbar, aber Token-lastig | bester Produktkern |
| C | Hybrid aus Remote plus Companion | niedrig bis mittel | hoch | oft bester Mix | mein Favorit |
| D | eigener Worker oder Server pro Nutzer | niedrig nach Setup | sehr hoch | nur für Premium sinnvoll | späterer Zusatzweg |

## Bild A: Heutigen Chat sauberer machen
Das ist der Weg aus der Datei davor.

Er heißt:
1. weniger JSON-Stress
2. weniger Retry-Ballast
3. mehr Server-Normalisierung

### Gut daran
1. schnell umsetzbar
2. wenig Risiko
3. verbessert sofort das Alltagserlebnis

### Schlecht daran
1. bleibt noch im alten Grundmuster
2. kein voller Agent-Lauf
3. nur Übergang, nicht Ziel

## Bild B: Gemeinsamer Remote-Agent-Host
Hier läuft der echte Agent-Runner auf unseren Servern.

Der User merkt davon im Idealfall nur:
1. senden
2. warten
3. Ergebnis übernehmen

### Gut daran
1. einfachster Nutzerweg
2. beste Kontrolle
3. gute Basis für iPad-only und Mobile

### Schlecht daran
1. wir tragen fast alle KI-Kosten
2. wir tragen fast alle Ausfall- und Supportkosten
3. Quoten und Missbrauchsschutz werden Pflicht

## Bild C: Hybrid aus Remote plus Companion
Companion = ein Begleit-Host auf Laptop oder PC.

Das Produkt bleibt remote-first.
Aber starke Nutzer können ihren eigenen Host ergänzen.

### Gut daran
1. spart Betreiberkosten bei Power-Usern
2. passt zu Codex, Gemini CLI, Claude Code und ähnlichen Wegen
3. guter Mix aus einfacher Basis und starkem Ausbau

### Schlecht daran
1. mehr Setup
2. mehr Supportfälle
3. mehr Unterschiede zwischen Nutzergruppen

## Bild D: Eigener Worker oder Server pro Nutzer
Hier bekommt ein zahlender Nutzer einen eigenen kleinen Lauf-Host.

Zum Beispiel:
1. eigener Container
2. eigene Queue
3. eigener Tool-Status
4. optional eigene Provider-Zugänge

### Gut daran
1. lange Läufe werden sauberer
2. mehr Isolation pro Nutzer
3. gute Premium-Story

### Schlecht daran
1. Provisionierung ist aufwendig
2. Idle-Zeit kostet Geld
3. Support wird schwerer
4. Billing, Secrets und Security werden deutlich komplexer

## Wichtige offizielle Punkte aus der Recherche

## 1. Alibaba Coding Plan ist kein normaler Backend-API-Weg
Die offizielle Alibaba-Cloud-Seite beschreibt den `Coding Plan` für Coding-Tools wie:
1. Qwen Code
2. Claude Code
3. Cline
4. OpenClaw

Wichtig daran:
Der Plan ist für Coding-Tools gedacht und laut Doku nicht für normale Backend-API-Automation.

### Was das für Notedrill heißt
Als Nutzer- oder Companion-Weg interessant.
Als gemeinsamer App-Backend-Kern eher nicht sauber.

## 2. Claude Code ist stark, aber für Drittprodukte nicht einfach über claude.ai-Login weiterreichbar
Die Anthropic-Doku zeigt:
1. Claude Code ist in bestimmten Plänen enthalten oder per API-Billing nutzbar
2. Für Drittprodukte soll man API-Key-Wege nutzen statt einfach `claude.ai`-Logins und Limits weiterzugeben

### Was das für Notedrill heißt
Für Companion oder nutzereigene Hosts gut.
Für unser zentrales Produkt besser mit API- oder sauberem Remote-Weg planen.

## 3. Gemini CLI ist stark für günstige oder freie Nutzerwege
Google beschreibt Gemini CLI offiziell mit:
1. freiem Einstiegsbereich bei persönlichem Google-Login
2. alternativ API-Key über AI Studio oder Vertex AI

### Was das für Notedrill heißt
Sehr guter Companion-Kandidat.
Nicht der Standardkern für iPad-only.

## 4. Codex in ChatGPT ist eher ein Nutzer- oder Tool-Weg, nicht unser App-Backend
OpenAI beschreibt Codex in ChatGPT und Codex CLI als Produktweg für Nutzer und Coding-Tools.
API-Preise laufen getrennt über die OpenAI-API.

### Was das für Notedrill heißt
Gut für Companion oder späteren Premium-Zusatz.
Nicht automatisch ein gemeinsamer Betreiberweg.

## 5. Kleine Dauer-Server sind nicht extrem teuer, aber sie sind auch nicht gratis
Offizielle Preisanker vom 8. März 2026:
1. Hetzner Cloud liegt im unteren einstelligen Euro-Bereich für kleine Instanzen
2. Render startet bei kleinen festen Monatsplänen
3. Railway ist nutzungsbasiert mit monatlicher Grundstruktur
4. Fly.io hat kleine günstige Always-on-Stufen

### Meine Ableitung daraus
Ein eigener kleiner Nutzer-Worker kann bei der Infrastruktur grob in einem Bereich von etwa 2 bis 25 Euro pro Monat liegen,
bevor:
1. Modellkosten,
2. Logs,
3. Speicher,
4. Support,
5. Monitoring
dazukommen.

Das ist eine Ableitung aus den offiziellen Preisankern.
Das ist kein fertiges Angebot.

## Wann ein Server pro Nutzer sinnvoll wird

### Eher sinnvoll
1. bei Plus- oder Pro-Nutzern
2. bei langen Agent-Läufen
3. wenn Nutzer ihren eigenen Provider oder ihr eigenes Coding-Abo einbringen
4. wenn Isolation wichtig ist

### Eher nicht sinnvoll
1. für Free
2. für Standard mit kleiner Marge
3. wenn der User nur selten KI nutzt
4. wenn wir noch keine saubere Queue und Run-Überwachung haben

## Meine klare Empfehlung für Notedrill

### Produktkern
1. `shared remote runtime`
2. günstiges Standardmodell
3. klare Quoten

### Ausbau 1
1. `desktop companion`
2. BYOK oder BYOA möglich

BYOK = Nutzer bringt eigenen API-Schlüssel mit.
BYOA = Nutzer bringt eigenes Abo oder eigenes Tool-Konto mit.

### Ausbau 2
1. `dedizierter Nutzer-Worker`
2. nur für Premium
3. nur mit sauberem Billing, Stop, Pause und Idle-Regeln

## Die beste Reihenfolge
1. erst den gemeinsamen Remote-Host sauber machen
2. dann Hybrid mit Companion öffnen
3. erst danach dedizierte Nutzer-Worker bauen

## Was ich ausdrücklich nicht empfehlen würde
1. eine persönliche Coding-Flatrate als gemeinsames Notedrill-Backend zu planen
2. MCP schon jetzt zum Hauptkern zu machen
3. pro Nutzer sofort einen 24h-Server zu starten, ohne Queue und Idle-Stop

## Mein ehrlicher Befund
Ein Server pro Nutzer ist möglich.
Aber erst später.

Vorher gewinnt fast immer ein sauberer gemeinsamer Remote-Host plus Companion-Option.

## Quellen
1. Alibaba Cloud Model Studio Coding Plan Overview: https://www.alibabacloud.com/help/en/model-studio/coding-plan-overview
2. Anthropic Claude Code Overview: https://docs.anthropic.com/en/docs/claude-code/overview
3. Anthropic Agent SDK Pricing and Plans: https://docs.anthropic.com/en/docs/claude-code/sdk/sdk-pricing
4. Google Gemini CLI Announcement: https://developers.googleblog.com/en/google-gemini-cli/
5. OpenAI Help zu Codex in ChatGPT: https://help.openai.com/en/articles/11369540-codex-in-chatgpt
6. OpenAI API Pricing: https://openai.com/api/pricing/
7. Hetzner Cloud: https://www.hetzner.com/cloud
8. Render Pricing: https://render.com/pricing
9. Railway Pricing: https://railway.com/pricing
10. Fly.io Pricing: https://fly.io/docs/about/pricing/
