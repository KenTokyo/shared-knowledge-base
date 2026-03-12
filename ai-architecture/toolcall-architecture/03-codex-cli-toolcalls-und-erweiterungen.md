# Notedrill Mobile: Codex CLI Tool-Calls, JSON-Ereignisse und MCP

Stand: 8. März 2026

## Was wurde verstanden?
1. Codex ist für dich wichtig, weil viele Nutzer schon ChatGPT kennen.
2. Du willst verstehen, wie Codex im Hintergrund wie ein Agent arbeitet.
3. Du willst auch sehen, was offiziell bestätigt ist und was wir aus lokalen Integrationen ableiten.

## Wichtige Trennung
Bei Codex haben wir zwei Schichten:

1. offiziell bestätigt durch OpenAI-Doku und Repo
2. lokal sichtbar in UniAI und Automaker, wo Codex-Ereignisse und Tool-Namen weiterverarbeitet werden

Beides zusammen ergibt ein gutes Bild.

## Offiziell bestätigte Punkte

| Bereich | Was klar bestätigt ist |
|---|---|
| Nutzung | lokal auf dem Computer |
| Anmeldung | ChatGPT-Plan oder API-Key |
| Plattform | macOS, Linux, Windows 11 über WSL2 |
| Konfig | `~/.codex/config.toml` |
| MCP | kann an MCP-Server angebunden werden |
| Apps | kann ChatGPT-Apps oder Connectoren einbinden |
| Zustände | nutzt eine SQLite State DB |

## Was das für den Tool-Call-Weg bedeutet
Codex ist nicht nur ein Modellname.
Es ist ein lokaler Agent mit:

1. Zustand,
2. Konfig,
3. Approval- und Sandbox-Idee,
4. MCP-Anbindung,
5. JSON- oder Ereignis-Ausgabe für Integrationen.

## Was wir aus lokalen Integrationen klar sehen

### In UniAI
Der `CodexProcessService` arbeitet mit JSON-Ereignissen wie:
1. `item.started`
2. `item.updated`
3. `item.completed`
4. `turn.completed`
5. `error`

Zusätzlich sieht man dort Item-Arten wie:
1. `reasoning`
2. `agent_message`
3. `command_execution`
4. `todo_list`

### In Automaker
Der `CodexProvider` trennt sogar zwei Wege:
1. CLI-Modus
2. SDK-Modus

Das ist stark, weil:
1. SDK genutzt werden kann, wenn keine Tool-Welt nötig ist
2. CLI genutzt wird, wenn Tools oder MCP gebraucht werden

## Wie Tool-Aufrufe bei Codex praktisch erkennbar werden

### In UniAI
Die lokale Integration mappt rohe Codex-Ereignisse auf verständliche Tool-Namen.

### In Automaker
`codex-tool-mapping.ts` übersetzt rohe Shell- oder Event-Daten in Tool-Klassen wie:
1. `Bash`
2. `Read`
3. `Edit`
4. `Write`
5. `Grep`
6. `Glob`
7. `TodoWrite`
8. `Delete`
9. `Ls`

Das ist wichtig:
Das Agentensystem denkt am Ende in Werkzeugklassen, nicht nur in Prozesszeilen.

## Sandbox und Approval

### Was lokal klar sichtbar ist
1. Codex kennt Sandbox-Ideen
2. Codex kennt Approval- oder Ask-Strategien
3. Reasoning-Stufen spielen eine Rolle

### Warum das wichtig ist
Tool-Calls brauchen nicht nur Ausführung.
Sie brauchen:
1. Sicherheitsgrenzen
2. ein Freigabemodell
3. einen Zustand, ob etwas erlaubt oder blockiert wird

## MCP in Codex

### Offiziell sichtbar
1. MCP-Server können in `~/.codex/config.toml` konfiguriert werden
2. Apps oder Connectoren lassen sich im Composer nutzen

### Bedeutung
Codex trennt:
1. eingebautes Agent-Verhalten
2. zusätzliche externe Werkzeuge

## SQLite-Zustand
Das lokale Repo sagt klar:
Codex nutzt eine SQLite State DB.

Das ist für uns wichtig, weil:
1. Tool- und Laufdaten nicht nur im Kopf der Sitzung leben
2. Zustand wiederaufgenommen werden kann
3. längere Agentenläufe sauberer werden

## Warum Codex für Notedrill lehrreich ist

### 1. JSON-Ereignisse sind Gold wert
UniAI und Automaker können viel mit Codex anfangen, weil die Ereignisse strukturiert genug sind.

### 2. Tool-Auflösung ist eine eigene Schicht
Automaker zeigt:
Rohe Shell- oder Event-Daten sollte man in echte Tool-Klassen umdeuten.

### 3. CLI und API dürfen sauber getrennt sein
Automaker zeigt:
Nicht alles braucht denselben Ausführungsweg.

## Was Notedrill davon lernen sollte

### 1. Ein Ereignisformat für Tool-Calls festziehen
Beispiele:
1. `started`
2. `tool_call`
3. `tool_result`
4. `chunk`
5. `completed`
6. `failed`

### 2. Tool-Auflösung als eigene Logik führen
Wenn ein Tool von Codex, Claude oder OpenCode kommt, sollte Notedrill es in dieselbe lokale Sprache übersetzen.

### 3. Lokalen Laufzustand später sauber speichern
Nicht nur UI-State.
Sondern:
1. Run-ID
2. Tool-Liste
3. Ergebnisse
4. Artefakte

## Meine kurze Bewertung

| Bereich | Bewertung für Notedrill |
|---|---|
| JSON-Ereignisse | sehr wichtig |
| Sandbox-Denke | wichtig |
| Approval-Denke | wichtig |
| MCP-Anbindung | wichtig |
| SQLite-Zustand | wichtig |
| Mobile-Direktweg | nein |

## Quellen
1. OpenAI Codex Repository: https://github.com/openai/codex
2. OpenAI Developer Home mit Codex-Hinweisen: https://developers.openai.com/
3. GPT-5.2-Codex Modellseite: https://developers.openai.com/api/docs/models/gpt-5.2-codex
4. GPT-5.1-Codex Modellseite: https://developers.openai.com/api/docs/models/gpt-5.1-codex
5. Lokale Referenz: `/mnt/d/CODING/React Projects/codex/README.md`
6. Lokale Referenz: `/mnt/d/CODING/React Projects/codex/docs/config.md`
7. Lokale Referenz: `/mnt/d/CODING/React Projects/codex/docs/sandbox.md`
8. Lokale Referenz: `/mnt/d/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/services/CodexProcessService.ts`
9. Lokale Referenz: `/mnt/d/CODING/React Projects/uniai-chat/automaker/apps/server/src/providers/codex-provider.ts`
10. Lokale Referenz: `/mnt/d/CODING/React Projects/uniai-chat/automaker/apps/server/src/providers/codex-tool-mapping.ts`
