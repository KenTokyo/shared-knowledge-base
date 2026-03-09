# Notedrill Mobile: Kosten, Speicher und Abo-Modelle

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst echte Kostenbilder.
2. Du willst nicht nur Tokenpreise, sondern auch Server und Speicher.
3. Du willst wissen, wie man für iPad-only oder Schulbetrieb sinnvolle Pakete baut.

## Wichtigste Erkenntnis zuerst
Bei einer textlastigen Lern-App ist Speicher meist billig.
Die eigentliche Kostenbombe ist fast immer KI-Nutzung und Support.

## Was in dieser Datei offiziell ist und was meine Ableitung ist
1. Offiziell:
   - Modellpreise
   - Rate Limits
   - Hosting- oder Storage-Preise auf den verlinkten Seiten
2. Meine Ableitung:
   - Paketvorschläge
   - empfohlene Gigabyte pro Nutzer
   - Beispielrechnungen für typische Schülerlast

## Offizielle Modellpreise, die ich für die Planung heranziehe

| Modell oder Weg | Input pro 1 Mio. Tokens | Output pro 1 Mio. Tokens | Art |
|---|---|---|---|
| Gemini 3.1 Flash-Lite Preview | 0,25 US-Dollar | 1,50 US-Dollar | API |
| Gemini 3.1 Pro Preview | 2,00 US-Dollar | 12,00 US-Dollar | API |
| GPT-5.2-Codex | 1,75 US-Dollar | 14,00 US-Dollar | API |
| Claude Sonnet 4 | 3,00 US-Dollar | 15,00 US-Dollar | API |
| Codex mit ChatGPT-Plan | nicht per Token im Alltag sichtbar | planbasiert | Abo |
| Claude Code mit Claude.ai oder Console | je nach Plan oder Credits | je nach Plan oder Credits | Abo oder Credits |
| Gemini CLI mit Login | freier Bereich laut Google-Doku | freier Bereich laut Google-Doku | Login |
| Qwen Code mit Login | freier Bereich laut Qwen-Repo | freier Bereich laut Qwen-Repo | Login |

## Beispielrechnung pro Nutzer und Monat

### Annahmen für die Rechnung
1. `leicht` = 5 Mio. Input-Tokens und 1 Mio. Output-Tokens
2. `mittel` = 20 Mio. Input-Tokens und 4 Mio. Output-Tokens
3. `stark` = 60 Mio. Input-Tokens und 12 Mio. Output-Tokens

Das ist keine offizielle Anbieterrechnung.
Das ist meine Beispielrechnung mit den offiziellen Tokenpreisen.

| Modell | leicht | mittel | stark |
|---|---|---|---|
| Gemini 3.1 Flash-Lite | 2,75 US-Dollar | 11,00 US-Dollar | 33,00 US-Dollar |
| Gemini 3.1 Pro | 22,00 US-Dollar | 88,00 US-Dollar | 264,00 US-Dollar |
| GPT-5.2-Codex | 22,75 US-Dollar | 91,00 US-Dollar | 273,00 US-Dollar |
| Claude Sonnet 4 | 30,00 US-Dollar | 120,00 US-Dollar | 360,00 US-Dollar |

## Was diese Tabelle für uns heißt
1. Für Massenbetrieb ist günstiges Standardmodell Pflicht.
2. Premium-Modelle brauchen klare Limits oder Paywall.
3. Companion-Wege können Betreiberkosten stark senken, weil der Nutzer sein eigenes Abo oder Konto nutzt.

## Offizielle Speicher- und Hosting-Anker

| Dienst | Wichtige Zahl | Was das für uns heißt |
|---|---|---|
| Cloudflare R2 | 10 GB kostenlos, danach 0,015 US-Dollar pro GB und Monat | Textspeicher ist fast vernachlässigbar billig |
| Supabase Pro | 8 GB Datenbank und 100 GB Dateispeicher inklusive | guter Paketanker für eine kleine bis mittlere App |
| Railway Hobby | 5 US-Dollar pro Monat Basis plus Nutzung | bequem, aber bei Dauerlast teurer |
| Railway Nutzung | 10 US-Dollar pro GB RAM, 20 US-Dollar pro vCPU, 0,15 US-Dollar pro GB Volume und Monat | schnell teuer bei ständig laufendem Agent-Host |
| Hetzner Cloud CX22 | rund 3,79 Euro pro Monat für 2 vCPU, 4 GB RAM, 40 GB SSD | günstiger fester Host für kleine Remote-Lösungen |
| Hetzner Cloud CX32 | rund 6,89 Euro pro Monat für 4 vCPU, 8 GB RAM, 80 GB SSD | guter nächster Schritt bei höherer Last |

## Meine Ableitung: Speicher ist nicht das Kernproblem

### Beispiel mit R2
1. 2 GB pro Nutzer kosten roh nur etwa 0,03 US-Dollar pro Monat.
2. 5 GB pro Nutzer kosten roh nur etwa 0,075 US-Dollar pro Monat.
3. 10 GB pro Nutzer kosten roh nur etwa 0,15 US-Dollar pro Monat.

### Bedeutet für Notedrill
1. Bei reinen Markdown- und JSON-Dateien kann man großzügig sein.
2. Sobald viele PDFs, Bilder oder Audio dazukommen, braucht es eigene Medienregeln.
3. Die Speicherquote sollte deshalb eher nach Medientyp als nach Textdateien getrennt werden.

## Meine Speicherempfehlung pro Nutzer

| Paket | Empfohlene Quote | Für wen | Warum |
|---|---|---|---|
| Starter | 500 MB | kostenlose oder sehr günstige Nutzer | reicht locker für viele Textnotizen |
| Standard | 2 GB | normaler Schülerbetrieb | guter Alltagspuffer |
| Plus | 5 GB | Nutzer mit PDFs und mehr Medien | immer noch sehr günstig beim Rohspeicher |
| Team oder Schule | 10 bis 25 GB je Sitz oder Pool | Lehrkräfte, Teams, Schulen | Medien und Backups besser abgedeckt |

## Wichtiger Randfall: Medien machen alles teurer
1. 1.000 reine Markdown-Notizen sind fast nichts.
2. 1.000 PDF-Uploads oder Bilder sind eine andere Liga.
3. Wenn Notedrill viele Anhänge erlaubt, sollte Textspeicher und Medien-Speicher getrennt geplant werden.

## Paketideen nach Nutzer-Typ

## 1. iPad-only Einzelnutzer

### Gute Architektur
1. Remote-Host
2. günstiges Standardmodell wie Gemini Flash-Lite
3. 2 GB Storage

### Grobe Monatslogik
1. Host ab etwa 3,79 Euro mit kleinem Hetzner-Server oder 5 US-Dollar bei Railway als Einstieg
2. Storage fast egal
3. KI-Nutzung bestimmt den echten Preis

### Meine Paketidee
1. günstiges Grundabo
2. klare Monatsgrenze bei Agent-Aufrufen
3. Premium-Modelle nur als Zusatz

## 2. Schüler mit MacBook oder Linux-Laptop

### Gute Architektur
1. Remote als Basis
2. Companion als Upgrade
3. optional Nutzer-Abo oder Nutzer-Login für Codex, Gemini oder Claude

### Was das kostet
1. Betreiber spart Tokenkosten, wenn der Nutzer seinen eigenen Companion nutzt
2. Supportkosten steigen aber

### Meine Paketidee
1. kostenloser oder günstiger Companion-Modus
2. Betreiber zahlt nur Storage und Sync
3. Nutzer zahlt sein Abo oder nutzt freien CLI-Bereich

## 3. Schule oder Reseller

### Gute Architektur
1. Remote-first
2. klare Quoten
3. Lehrkräfte optional mit Companion

### Grober Kostenblick
1. Infrastruktur planbar
2. Tokenkosten müssen über Budgets gedeckelt werden
3. Storage ist selten der Haupttreiber

### Meine Paketidee
1. Sitz-basierte Pakete
2. gemeinsame Pool-Quoten
3. Medien-Speicher gesondert rechnen

## Welche Preismodelle für Notedrill sinnvoll wirken

| Modell | Gut daran | Schlecht daran | Meine Einordnung |
|---|---|---|---|
| Alles durch Betreiber bezahlt | einfach für Schüler | hohes Tokenrisiko | nur mit starken Limits |
| BYOK API-Key | Betreiber spart Tokens | für Schüler oft zu schwer | optional, nie Pflicht |
| Companion mit Nutzer-Abo | sehr günstig für Betreiber | hoher Supportaufwand | starker Zusatzweg |
| Hybrid | fair und flexibel | Logik wird komplexer | mein Favorit |

## Mein Favorit: Hybrid
1. Remote-Basis für alle
2. Companion-Upgrade für Nutzer mit Mac, Windows oder Linux
3. Premium-Modelle als Zusatz
4. günstiges Standardmodell als Default

## Meine konkrete Empfehlung für Quoten

| Rolle | Standardmodell | Premiummodell | Speicher | Bemerkung |
|---|---|---|---|---|
| Schüler Free oder Test | günstigstes Modell | keines | 500 MB | nur kurze Läufe |
| Schüler Standard | günstiges Flash-Modell | optional manuell | 2 GB | guter Alltag |
| Schüler Plus | Flash als Standard | Codex oder Claude limitierbar | 5 GB | für intensivere Nutzung |
| Lehrkraft oder Power-User | Flash oder Pro je nach Aufgabe | ja | 5 bis 10 GB | Companion lohnt sich |
| Schule oder Team | gemischtes Routing | nur kontrolliert | Pool 10 bis 25 GB je Sitz oder Projekt | Admin-Konsole sinnvoll |

## Die wichtigste Kosten-Wahrheit für iPad-only
Wenn ein Nutzer nur iPad oder iPhone hat, muss fast alles über Remote laufen.
Dann trägt der Betreiber fast immer den Hauptteil von:

1. Server,
2. Monitoring,
3. Tokenkosten,
4. Support.

Darum braucht iPad-only fast immer:
1. günstiges Standardmodell,
2. harte Monatsgrenzen,
3. saubere Pakete.

## Quellen
1. Gemini API Pricing: https://ai.google.dev/gemini-api/docs/pricing
2. Gemini API Rate Limits: https://ai.google.dev/gemini-api/docs/rate-limits
3. GPT-5.2-Codex Model Page: https://platform.openai.com/docs/models/gpt-5.2-codex
4. OpenAI API Pricing: https://openai.com/api/pricing
5. Anthropic Claude API Pricing: https://docs.anthropic.com/en/docs/about-claude/pricing
6. OpenAI Codex in ChatGPT Help: https://help.openai.com/en/articles/11369540-codex-in-chatgpt
7. Cloudflare R2 Pricing: https://developers.cloudflare.com/r2/pricing/
8. Railway Pricing: https://railway.com/pricing
9. Supabase Pricing: https://supabase.com/pricing
10. Hetzner Cloud Pricing: https://www.hetzner.com/cloud/
11. Google Gemini CLI Blog: https://developers.googleblog.com/en/google-gemini-cli/
12. Qwen Code Repository: https://github.com/QwenLM/qwen-code
