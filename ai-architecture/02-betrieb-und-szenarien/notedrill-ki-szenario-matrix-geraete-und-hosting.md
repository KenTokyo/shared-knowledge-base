# Notedrill Mobile: Szenario-Matrix für Geräte, Nutzerwege und Hosting

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst alle echten Nutzerlagen sehen.
2. Es reicht nicht zu sagen: „Remote ist gut“.
3. Es muss klar sein, was bei iPad-only, iPhone-only, MacBook später, Windows, Linux und ohne PC wirklich passiert.

## So liest man diese Matrix
1. `Hauptweg` ist der Weg, den ich für den Alltag empfehle.
2. `Zusatzweg` ist eine sinnvolle Erweiterung, aber nicht Pflicht.
3. `Betreiber` meint Schule, Elternkonto, App-Anbieter oder Team, das den Dienst bereitstellt.

## Hauptmatrix

| Szenario | Was der Nutzer hat | Was sofort gut geht | Was nicht sauber geht | Bester Hauptweg | Sinnvoller Zusatzweg | Nutzer-Aufwand | Betreiber-Aufwand | Meine Empfehlung |
|---|---|---|---|---|---|---|---|---|
| 1. iPad-only | nur iPad, kein PC | App, lokales Speichern, Remote-Chat | lokales CLI, Companion, Terminal-Login | `app_remote` | optional BYOK-API-Key | niedrig | hoch | wichtigster Basisszenario für Schüler |
| 2. iPhone-only | nur iPhone | App, Remote-Chat, kleine Notizen | längere Coding- oder Orchestrator-Arbeit lokal | `app_remote` | keiner | niedrig | hoch | nur Remote ernsthaft planen |
| 3. Android-only | Android-Tablet oder Handy | App, Remote-Chat | lokales CLI im App-Prozess | `app_remote` | Termux nur für fortgeschrittene Tester | niedrig bis hoch | hoch | Remote bleibt Standard |
| 4. iPad jetzt, MacBook später | heute iPad, später Mac | sofort Remote, später Desktop-Companion | heute noch kein lokaler Agent | zuerst `app_remote`, später `desktop_companion` | Gemini CLI oder Codex CLI | zuerst niedrig, später mittel | mittel | sehr realistischer Schüler-Weg |
| 5. iPad plus Familien-Laptop | iPad und gelegentlicher PC | Remote immer, Companion manchmal | stabiler Dauer-Companion schwer | `app_remote` | Companion nur für Spezialaufgaben | niedrig bis mittel | mittel | Remote zuerst, Companion optional |
| 6. MacBook-only | MacBook | alle Desktop-CLI-Wege, Companion, Remote | Mobile-Spezifika fehlen | `desktop_companion` oder `app_remote` | Claude Code, Codex, Gemini CLI | mittel | mittel | bester Power-User-Weg |
| 7. Windows-PC-only | Windows-Laptop oder PC | Remote und Desktop-Host | je nach Tool WSL oder Shell-Fragen | `desktop_companion` oder `app_remote` | Codex mit WSL2, Claude Code, Gemini CLI | mittel | mittel | gut machbar, aber Onboarding sauber planen |
| 8. Linux-PC-only | Linux-Laptop oder Desktop | Desktop-CLI und Remote | wenig | `desktop_companion` oder `app_remote` | Codex, Claude Code, Gemini CLI, Qwen | mittel | mittel | sehr guter Host-Weg |
| 9. Schule mit MDM-Sperren | iPad oder Laptop, aber keine freien Installationen | Remote-App, zentrale Logins | CLI-Setup beim Schüler | `app_remote` | Companion nur für Lehrkräfte oder Admins | niedrig | hoch | Schulbetrieb fast immer remote-first |
| 10. Kein eigenes Zahlungsmittel | Gerät vorhanden, aber keine Karte | betreiberfinanzierter Remote-Weg | eigenes API-Key-Modell | `app_remote` | Gutschein oder Schul-Code | niedrig | hoch | wichtig für Schüler-Modell |
| 11. Schwaches Internet | beliebiges Gerät | lokale Notizen und Caches | großer Cloud-Agent live | lokales Arbeiten ohne KI, später Sync | Companion nur wenn PC da ist | niedrig bis mittel | mittel | Offline sauber abfangen |
| 12. Hohe Datenschutz-Anforderung | Schule oder Eltern wollen enge Kontrolle | self-hosted Remote und klare Logs | wilde Dritt-Apps und viele externe Konten | `app_remote` self-hosted | gezielte MCP-Server read-only | niedrig | hoch | frühe Architektur-Entscheidung nötig |

## Host-Modi, die im Projekt schon sichtbar waren

| Host-Modus | Für wen gedacht | Was dabei läuft | Meine Einordnung |
|---|---|---|---|
| `tablet_remote` | iPad, iPhone, gesperrte Schülergeräte | App redet nur mit Remote-Host | Hauptweg |
| `laptop_local` | MacBook, Windows-PC, Linux-PC | lokaler Companion oder lokaler Host auf dem Rechner | starker Zusatzweg |
| `laptop_remote_fallback` | Nutzer mit Rechner, aber lokalem Problem | Remote springt ein, wenn Companion ausfällt | sehr sinnvoll |
| `android_termux_local` | Android-Bastler ohne Laptop | lokaler Host in Termux | nur Experiment |
| `ipad_ish_experimental` | iPad-POC | lokaler Host in iSH | nur bewusster Testweg |

## Zusätzliche Praxis-Szenarien aus alten Projektunterlagen

| Szenario | Was daran besonders ist | Warum es für uns wichtig ist |
|---|---|---|
| Windows im Browser | Browser hat keinen direkten CLI-Zugriff | muss klar getrennt von Windows-App mit Companion sein |
| Android Emulator mit Laptop | App greift über `10.0.2.2` auf den Rechner zu | wichtiger Team-Testweg |
| iPad mit iSH | nur POC, wenn Installation, Login, Host und Erreichbarkeit klappen | ehrliche Grenze für iPad-lokal |
| Schüler installiert Laptop-Tools selbst | Status muss Installation, Version und Login prüfen | macht Onboarding planbar |
| Companion bewusst getrennt | Status darf nicht so wirken, als wäre alles kaputt | wichtig für saubere UX |

## Was der Nutzer in jedem Hauptszenario wirklich machen muss

| Szenario | Schritte für den Nutzer | Was wir oder der Betreiber vorbereiten müssen |
|---|---|---|
| iPad-only | App installieren, anmelden, Modell wählen, nutzen | Server, Storage, Quoten, sichere Defaults |
| iPhone-only | App installieren, anmelden, kurze Aufgaben nutzen | kleineres UI, klare Fehltexte, Remote-Host |
| Android-only | App installieren, anmelden, Remote nutzen | Android-Optimierung und optionales Termux-Handbuch |
| iPad jetzt, Mac später | heute Remote nutzen, später Companion verbinden | Profil-Übergang ohne Datenbruch |
| MacBook-only | Tool installieren, anmelden, Companion koppeln | Pairing, Quoten und Artefakt-Vertrag |
| Windows-PC-only | Tool installieren, evtl. WSL2 oder Git Bash, Companion koppeln | klare Windows-Anleitung |
| Linux-PC-only | Tool installieren, Companion koppeln | Linux-Handbuch und Health-Checks |

## Was bei Windows im Browser anders ist

### Harte Regel
Die Web-Variante hat keinen direkten Zugriff auf lokale CLI-Tools.

### Was das für den Nutzer bedeutet
1. Ohne Companion sieht man leicht nur einen Fallback-Status.
2. Der Browser darf nicht so tun, als könne er Codex oder Claude lokal direkt starten.
3. Für lokale CLI-Nutzung braucht Windows-Web immer einen Companion-Endpunkt.

### Folge für unsere Planung
1. `Windows-Web` ist ein eigenes Support-Szenario.
2. Es gehört nicht automatisch in dieselbe Kategorie wie `Windows-App mit Companion`.

## Was bei Android Emulator mit Laptop wichtig ist

### Praktischer Sonderfall
Im Android-Emulator zeigt `127.0.0.1` auf den Emulator selbst.

### Richtiger Weg
1. Setup-Host und Bridge laufen auf dem Rechner.
2. Die App im Emulator greift über `10.0.2.2` auf den Rechner zu.
3. Dadurch ist `Über Laptop oder MacBook` im Emulator oft stabiler als echtes Termux.

## Was bei iPad-only wirklich die Antwort ist

### Harte Wahrheit
Wenn der Nutzer nur ein iPad hat, ist ein lokaler CLI-Agent in der Notedrill-App kein sauberer Standardweg.

### Praktische Antwort
1. Wir betreiben den Agent-Host remote.
2. Die App bleibt einfach.
3. Optional kann der Nutzer später einen API-Key eintragen.
4. Wenn er später ein MacBook bekommt, kann er zusätzlich Companion freischalten.

### Was iSH daran ändert
1. iSH kann man als POC probieren.
2. Das bleibt aber nur erlaubt, wenn vier Punkte klappen:
   - CLI-Installation
   - Login
   - Host-Start
   - Erreichbarkeit aus Notedrill
3. Sobald einer dieser Punkte scheitert, fällt das Szenario zurück auf `app_remote`.

### Warum ChatGPT-Apps das nicht lösen
1. Sie sind ein Zusatzkanal.
2. Laut OpenAI Help Center ist das volle App-Erlebnis noch nicht überall gleich.
3. Das ersetzt nicht unseren Notedrill-Dateiweg.

## Was bei „MacBook später“ die beste Strategie ist

### Phase 1
1. Schüler startet komplett remote auf dem iPad.
2. Alle Daten landen schon im richtigen Dateivertrag.

### Phase 2
1. Sobald MacBook da ist, Companion aktivieren.
2. Dann kann der Nutzer Codex, Gemini oder Claude lokal als Host nehmen.
3. Die App bleibt trotzdem dieselbe.

### Was wir zusätzlich sichtbar machen sollten
1. Setup-Status pro Tool
2. Version und Login
3. Host erreichbar oder nicht
4. bewusst getrennt oder nur kaputt

### Vorteil
Wir müssen den Produktweg nicht neu erfinden, nur einen Zusatzmodus freischalten.

## Was bei Schule oder Reseller wichtig ist

| Typ | Beste Antwort | Warum |
|---|---|---|
| kleine Schule ohne IT | Managed Remote | wenig Setup beim Nutzer |
| größere Schule mit Admins | Self-hosted Remote | mehr Kontrolle über Daten |
| Lehrer als Power-User | optional Companion | starke lokale Agenten ohne Schüler-Stress |
| reine Schülergeräte mit Sperren | Remote only | CLIs am Schülergerät fallen weg |

## Was bei Android ohne Laptop ehrlicher geplant werden sollte

| Punkt | Bewertung |
|---|---|
| Termux als lokaler Startweg | möglich |
| stabiler Produktweg | nein |
| empfohlene Test-Reihenfolge | zuerst Gemini, dann Claude, Codex zuletzt |
| Supportaufwand | hoch |
| Rückfall bei Problemen | `Nur Online-Server` oder `Über Laptop oder MacBook` |

## Edge Cases, die leicht vergessen werden

| Edge Case | Was das für uns bedeutet | Gute Antwort |
|---|---|---|
| Schüler hat nur Handy | Remote-only und kurze Aufgaben priorisieren | kleine UI, klare Limits |
| Schüler teilt sich einen Familien-PC | Companion nicht als Pflicht planen | Remote bleibt Hauptweg |
| Schule blockiert Browser-Logins | OAuth-lastige Companion-Wege werden schwer | zentrale Konten oder Remote-only |
| Nutzer will komplett kostenlos | kostenlose CLI-Wege helfen nur mit Desktop | günstiges Remote-Limit oder Sponsor-Modell |
| Nutzer will komplett offline | echte Cloud-Agenten fallen weg | Notizen lokal, KI später synchronisieren |
| Nutzer importiert viele PDFs | Speicherquote muss höher oder getrennt sein | Medien-Bucket und Upload-Regeln |
| Nutzer hat keine Ahnung von API-Keys | BYOK darf nie der einzige Weg sein | klare Remote-Defaults |
| Nutzer hat Windows, aber nutzt nur Browser | lokales CLI geht dort nicht direkt | Companion sichtbar erklären |
| Nutzer trennt lokalen Host absichtlich | App muss das als bewusst getrennt verstehen | Marker oder klarer Status |
| Android Emulator im Team-Test | Sonder-IP statt localhost nötig | eigenes Team-Runbook |

## Meine harte Priorisierung nach Szenario

### Für die meisten Schüler
1. `app_remote`
2. günstiges Standardmodell
3. später optional Companion

### Für Schüler mit Mac oder Linux
1. Companion als Upgrade
2. zuerst Gemini CLI oder Codex CLI
3. Claude Code für Premium-Aufgaben

### Für Schulen
1. zentraler Remote-Weg
2. Lehrkräfte können Zusatz-Companion bekommen
3. Schülergeräte bleiben möglichst einfach

## Quellen
1. OpenAI Apps Help: https://help.openai.com/en/articles/6825453-chatgpt-apps-on-ios-and-android
2. OpenAI Apps SDK: https://developers.openai.com/apps-sdk
3. OpenAI Codex Repository: https://github.com/openai/codex
4. Google Gemini CLI Repository: https://github.com/google-gemini/gemini-cli
5. Anthropic Claude Code Quickstart: https://docs.anthropic.com/en/docs/claude-code/quickstart
6. Qwen Code Repository: https://github.com/QwenLM/qwen-code
7. OpenCode Docs: https://opencode.ai/docs
8. `docs/guides/mobile-expo-go-runbook.md`
9. `History/tablet-cli-hostmodi-verlauf.md`
10. `History/windows-web-companion-qa-verlauf.md`
