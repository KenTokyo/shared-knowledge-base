# Notedrill Mobile: Umsetzungsplan für KI-Agenten, Companion und MCP

Stand: 8. März 2026

## Was wurde verstanden?
1. Es soll nicht nur Theorie geben.
2. Wir brauchen einen umsetzbaren Plan für das echte Projekt.
3. Der Plan soll in wenige klare Chats und Wellen aufgeteilt sein.

## Status-Regeln
1. `DONE` heißt: die Planung für diesen Block ist sauber dokumentiert.
2. `NEXT_PHASE_READY` heißt: der nächste Block kann direkt gestartet werden.
3. `OPEN` heißt: noch nicht bearbeitet.

## Gesamtbild
Wir teilen die große Arbeit in 4 Chat-Blöcke.
So bleibt der Kontext sauber und die Umsetzung bleibt kontrollierbar.

## Chat 1: Recherche und Architektur festziehen

Status: `DONE`

### Ziel
Ein gemeinsames Bild schaffen, bevor Umbauten starten.

### Inhalt
1. Markt-Recherche zu Codex, Gemini, Claude Code, Qwen Code, OpenCode und MCP
2. echter Ist-Stand im Mobile-Code
3. echter Ist-Stand im Next.js-Backend
4. erste Empfehlung für Produktweg, Companion und Testweg

### Ergebnis
1. `notedrill-ki-zielarchitektur.md`
2. `notedrill-ki-anbieter-vergleich-und-ranking.md`
3. `notedrill-ki-szenario-matrix-geraete-und-hosting.md`
4. `notedrill-ki-konkrete-user-journeys-und-setup-checklisten.md`
5. `notedrill-ki-kosten-speicher-und-abopakete.md`
6. `notedrill-ki-aufwand-und-verantwortung-pro-betriebsmodell.md`
7. `notedrill-ki-qa.md`
8. `toolcall-architecture/` mit eigenem Vergleichsblock
9. dieser Phasenplan

### Grober Token-Bedarf
20.000 bis 35.000 Tokens

## Chat 2: Verträge und Laufdaten sauber machen

Status: `NEXT_PHASE_READY`

### Ziel
Aus losem Bridge-Verhalten einen echten Lauf-Vertrag machen.

### Was gebaut oder geändert werden soll
1. ein fester `RunContract` für jede Agent-Anfrage
2. klare Felder für:
   - `runId`
   - `providerMode`
   - `toolCalls`
   - `toolResults`
   - `generatedArtifacts`
   - `budget`
   - `status`
3. klare Trennung zwischen:
   - UI-Zustand
   - Laufdaten
   - Inhalts-Artefakten
4. ein echter Artefakt-Weg:
   - Datei direkt in der Antwort
   - oder echte `local-artifact`-Route
5. gleiche Namen für Mobile, Companion und Backend

### Betroffene Stellen
1. `features/chat/components/store/useChatStore.ts`
2. `features/chat/components/interface/agent-note-artifact-service.ts`
3. `features/chat/components/interface/agent-note-upsert-service.ts`
4. `lib/agent/bridge/*`
5. Backend-Bridge in `notedrill-backend-nextjs/app/api/agent/bridge/*`

### Done-Kriterien
1. Mobile und Backend sprechen über denselben Lauf-Vertrag.
2. Tool-Schritte sind nicht mehr nur optionaler Text.
3. Artefakte können sauber gelesen und geprüft werden.

### Grober Token-Bedarf
25.000 bis 40.000 Tokens

## Chat 3: Host-Wege und Provider-Adapter bauen

Status: `OPEN`

### Ziel
Die drei echten Laufwege vorbereiten.

### Inhalt
1. `app_remote` als Hauptweg
2. `desktop_companion` mit echten CLIs
3. `android_termux_experimental` als Testweg

### Adapter, die wir brauchen
1. `api_runtime` für OpenAI, Gemini, Anthropic, OpenRouter und DashScope
2. `subscription_cli` für Codex CLI, Gemini CLI, Claude Code, Qwen Code und OpenCode
3. optionaler Premium-Adapter für bezahlte Zusatzpfade

### MCP-Regel
1. MCP nur als Werkzeug-Layer
2. Standard auf read-only
3. Schreib-MCP erst später und nur mit klarer Freigabe

### Done-Kriterien
1. Jeder Host-Weg hat klare Grenzen.
2. Jeder Adapter meldet:
   - Auth-Art
   - Kostenart
   - Modellliste
   - Tool-Fähigkeiten
3. Companion und Remote-Host nutzen denselben Artefakt-Vertrag.

### Grober Token-Bedarf
30.000 bis 45.000 Tokens

## Chat 4: Mobile-Integration, Bezahlweg und Rollout

Status: `OPEN`

### Ziel
Den Nutzerweg so einfach machen, dass die App im Alltag klar bleibt.

### Inhalt
1. Modell- und Host-Auswahl im Chat
2. günstige Standardwege markieren
3. Paywall nur dort, wo sie wirklich nötig ist
4. Status-Anzeigen für:
   - Remote aktiv
   - Companion verbunden
   - Termux-Testweg
5. Fehltexte für normale Nutzer
6. QA-Matrix für Android und iOS

### Speziell für Kosten
1. gratis oder günstige Wege zuerst anzeigen
2. API-Key und Abo getrennt erklären
3. Premium-Wege sichtbar, aber nicht im Kern vermischen

### Done-Kriterien
1. Ein Schüler versteht, welchen Weg er gerade nutzt.
2. Fehler führen nicht zu kaputten Dateien.
3. Store-Release braucht keine lokale CLI beim Nutzer.

### Grober Token-Bedarf
25.000 bis 40.000 Tokens

## Harte Architektur-Regeln
1. Dateien bleiben die Hauptquelle.
2. SQLite bleibt Spiegel für Suche und Listen.
3. Die Mobile-App startet kein normales Desktop-CLI im App-Prozess.
4. Produktmodus läuft über Remote oder Companion, nicht über wilden Direktzugriff.
5. Jede erzeugte Datei geht durch Pfad- und UTF-8-Prüfung.

## Größte Risiken
1. Route-Namen klingen heute stärker als die echte Ausführung ist.
2. Mobile erwartet schon Artefakte, das Backend liefert sie noch nicht vollständig.
3. Gratis-Anbieter können Limits ändern.
4. MCP kann schnell zu viel Vertrauen bekommen, wenn Rechte zu breit sind.

## Was als Nächstes sinnvoll ist
Der nächste sinnvolle Schritt ist `Chat 2`.
Dort sollten wir zuerst den Lauf-Vertrag und die echte Artefakt-Übergabe festziehen.
