# Notedrill Mobile: Aufwand und Verantwortung pro Betriebsmodell

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst klar sehen, wer was tun muss.
2. Du willst nicht nur Technik, sondern echte Arbeit pro Rolle.
3. Es soll sichtbar sein, was Nutzer, Betreiber und Notedrill-Team jeweils übernehmen.

## Die drei Rollen in dieser Datei
1. `Nutzer` = Schüler, Elternteil oder Einzelperson
2. `Betreiber` = Schule, Reseller, Elternkonto oder Organisation mit Vertrag
3. `Notedrill-Team` = wir als Produkt- und Technikseite

## Betriebsmodelle im Überblick

| Modell | Nutzer-Aufwand | Betreiber-Aufwand | Team-Aufwand | Supportlast | Gute Zielgruppe |
|---|---|---|---|---|---|
| A. Managed Remote | niedrig | mittel bis hoch | hoch | mittel | iPad-only, Schulen, Einsteiger |
| B. Remote plus eigener API-Key | mittel | mittel | mittel bis hoch | mittel | fortgeschrittene Einzelnutzer |
| C. Desktop-Companion selbst eingerichtet | hoch | niedrig | mittel | hoch | Mac-, Linux- und Windows-Power-User |
| D. Desktop-Companion zentral betreut | mittel | hoch | hoch | hoch | Lehrkräfte, Teams |
| E. Android Termux experimentell | sehr hoch | niedrig | mittel | sehr hoch | nur Bastler und interne Tests |
| F. ChatGPT-App- oder Connector-Zusatz | niedrig bis mittel | mittel | mittel | mittel | Recherche und Wissenszugriff als Zusatz |

## Modell A: Managed Remote

### Was der Nutzer tun muss
1. App installieren
2. Konto nutzen
3. Modell oder Modus wählen
4. sonst nichts Kompliziertes

### Was der Betreiber tun muss
1. Hosting wählen
2. Quoten und Pakete festlegen
3. Datenschutz und Backups klären
4. Support-Kanal bereitstellen

### Was das Notedrill-Team tun muss
1. echten Agent-Host bauen
2. Run-Contract und Artefakt-Wege festziehen
3. Kosten- und Rechte-Limits einbauen
4. Monitoring und Ausfallschutz bauen

### Mein Urteil
Das ist der wichtigste Kernweg.
Vor allem für iPad-only, iPhone-only und Schulbetrieb.

## Modell B: Remote plus eigener API-Key

### Was der Nutzer tun muss
1. API-Key besorgen
2. Key eintragen
3. Limits verstehen

### Was der Betreiber tun muss
1. sicheren Key-Speicher zulassen
2. gute Fehltexte liefern
3. Abgrenzung zwischen Betreiberkosten und Nutzerkosten erklären

### Was das Notedrill-Team tun muss
1. Secure-Store sauber pflegen
2. Key-Validierung bauen
3. Fallbacks ohne Key bereitstellen

### Mein Urteil
Gut als Zusatz.
Nie als einziger Weg für Schüler.

## Modell C: Desktop-Companion selbst eingerichtet

### Was der Nutzer tun muss
1. Tool installieren
2. Konto oder Login aktivieren
3. lokalen Host koppeln
4. bei Problemen Logs und Health-Checks verstehen

### Was der Betreiber tun muss
1. meist wenig
2. höchstens Doku oder Support bereitstellen

### Was das Notedrill-Team tun muss
1. Pairing bauen
2. Companion-Status sichtbar machen
3. Health-Checks und klare Setup-Hilfen bauen

### Mein Urteil
Sehr gut für Power-User.
Zu anstrengend als Standardweg für breite Schülerschaft.

## Modell D: Desktop-Companion zentral betreut

### Was der Nutzer tun muss
1. Companion starten
2. sich anmelden
3. gekoppelt nutzen

### Was der Betreiber tun muss
1. Geräte vorbereiten
2. Policies und Updates pflegen
3. Support leisten

### Was das Notedrill-Team tun muss
1. Admin-Handbücher bauen
2. klaren Rollout-Prozess bauen
3. Multi-User und Gerätepolitik berücksichtigen

### Mein Urteil
Sinnvoll für Lehrkräfte oder kleine Expertengruppen.
Nicht der erste Schüler-Standard.

## Modell E: Android Termux experimentell

### Was der Nutzer tun muss
1. Termux installieren
2. Node oder passende Laufzeit installieren
3. CLI einrichten
4. Login aktivieren
5. Port und Pairing pflegen

### Was der Betreiber tun muss
1. fast nichts, wenn es nur Experiment ist

### Was das Notedrill-Team tun muss
1. klare Warnhinweise
2. Setup-Anleitung
3. keine falschen Produktversprechen

### Mein Urteil
Nur für Experiment und Debug.
Nicht für normalen Kundeneinsatz.

## Modell F: ChatGPT-App- oder Connector-Zusatz

### Was der Nutzer tun muss
1. in ChatGPT verbinden
2. verstehen, dass das ein Zusatzkanal ist

### Was der Betreiber tun muss
1. App- oder MCP-Endpunkt bereitstellen
2. OAuth oder Tokenfluss absichern

### Was das Notedrill-Team tun muss
1. Connector oder App pflegen
2. getrennte Rechte und Inhalte bedenken

### Mein Urteil
Gut für Zusatzwissen und Recherche.
Kein Ersatz für den Notedrill-Mobile-Kern.

## Konkrete Checklisten nach Rolle

## Für den Nutzer

| Ziel | Was der Nutzer tun muss |
|---|---|
| iPad-only starten | nur App nutzen und anmelden |
| später MacBook nutzen | Companion installieren und koppeln |
| eigenen API-Key nutzen | Key besorgen, sicher eintragen, testen |
| ChatGPT-Zusatz nutzen | App oder Connector in ChatGPT verbinden |

## Für den Betreiber

| Ziel | Was der Betreiber tun muss |
|---|---|
| Remote-Angebot bereitstellen | Hosting, Storage, Quoten, Backup |
| Schulbetrieb anbieten | Rollen, Datenschutz, Gerätepolitik, Support |
| Premium-Modell anbieten | Preislogik, Limits, Missbrauchsschutz |
| Companion erlauben | Supportstufe und Dokumentation definieren |

## Für das Notedrill-Team

| Ziel | Was wir tun müssen |
|---|---|
| stabiler Produktkern | Run-Contract, Artefakt-Vertrag, Remote-Host |
| guter Schülerweg | einfache UI, klare Pakete, harte Defaults |
| guter Power-User-Weg | Companion, Pairing, Health-Checks |
| guter Schulweg | Admin- und Rollout-Doku, Quoten, Audit-Logs |

## Wo der meiste Support entsteht

| Bereich | Warum |
|---|---|
| WSL und Windows-Shells | viele kleine Setup-Unterschiede |
| OAuth-Logins | Browser, Rechte, Token, Popup-Probleme |
| BYOK API | Nutzer verstehen Kosten und Limits oft nicht |
| Termux | sehr fragil und wenig Standard |
| Schulgeräte mit Sperren | Installationen und Logins oft blockiert |

## Meine klare Priorisierung
1. Erst Managed Remote sauber machen
2. Dann Companion als Upgrade
3. Dann BYOK als Zusatz
4. Termux nur als Test
5. ChatGPT-Apps nur als Zusatzkanal

## Welche Betriebsmodelle ich für Notedrill zuerst bauen würde

### Stufe 1
1. Managed Remote
2. günstiges Standardmodell
3. klare Speicher- und Nutzungsgrenzen

### Stufe 2
1. Desktop-Companion
2. erst Gemini CLI und Codex CLI
3. dann Claude Code

### Stufe 3
1. BYOK
2. Schul-Admin-Funktionen
3. ChatGPT-App-Zusatz

## Quellen
1. OpenAI Codex Repository: https://github.com/openai/codex
2. Google Gemini CLI Repository: https://github.com/google-gemini/gemini-cli
3. Anthropic Claude Code Quickstart: https://docs.anthropic.com/en/docs/claude-code/quickstart
4. Qwen Code Repository: https://github.com/QwenLM/qwen-code
5. OpenCode Docs: https://opencode.ai/docs
6. OpenAI Apps SDK: https://developers.openai.com/apps-sdk
7. ChatGPT Apps Help: https://help.openai.com/en/articles/6825453-chatgpt-apps-on-ios-and-android
