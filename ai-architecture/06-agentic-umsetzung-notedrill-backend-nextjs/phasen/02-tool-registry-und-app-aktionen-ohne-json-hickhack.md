# Notedrill Backend Next.js: Phase 02 Tool-Registry und App-Aktionen ohne JSON-Hickhack

Stand: 8. März 2026
Status: `DONE`

## Ziel
Diese Phase nimmt App-Aktionen aus dem wackeligen Freitext-JSON heraus
und baut daraus echte interne Werkzeuge.

## Was der User davon hat
1. weniger "Antwort war gut, aber nichts wurde gespeichert"
2. klarere Schritt-Anzeigen
3. weniger kaputte Retries

## Was wir aus dem heutigen Backend lernen
1. ND_ACTIONS ist als Übergangsvertrag wertvoll
2. als Dauer-Hauptweg ist es zu fragil

## Was wir aus Mobile lernen
1. Tool-Events sollten normaler Teil des Laufs sein
2. Tool-Ergebnisse brauchen klare IDs und Ergebnisse

## Hauptidee dieser Phase
Heute sagt das Modell oft:
"Bitte mach Aktion X" als JSON.

Ziel später:
Das Modell ruft direkt ein internes Tool auf,
und der Server führt es aus.

## Hauptaufgaben

## 1. Interne Tool-Registry definieren
Erste Werkzeuge:
1. `note.create`
2. `note.update`
3. `folder.create`
4. `cards.generate`
5. `quiz.generate`
6. `diagram.generate`
7. `open_in.import`
8. `artifact.preview`

## 2. Einheitliche Tool-Eingaben bauen
Jedes Tool braucht:
1. `toolName`
2. `callId`
3. `input`
4. `approvalMode`
5. `idempotencyKey`

## 3. Einheitliche Tool-Ergebnisse bauen
Jedes Ergebnis braucht:
1. `callId`
2. `success`
3. `summary`
4. `artifactRefs`
5. `errorCode`

## 4. ND_ACTIONS als Adapter behalten
Wichtig:
ND_ACTIONS nicht sofort hart löschen.

Stattdessen:
1. Parser bleibt als Altweg
2. Server wandelt ND_ACTIONS in interne Tool-Aufträge um
3. der neue Kern arbeitet danach nur noch mit Tools

## 5. Erste echte Tool-Ausführung im Server bauen
Nicht alles auf einmal.
Start:
1. `note.create`
2. `folder.create`
3. `open_in.import`

## 6. UI-Feed auf echte Tool-Events vorbereiten
Der User soll später sehen:
1. welches Tool lief
2. ob es geklappt hat
3. was übernommen wurde

## Edge Cases

| Edge Case | Antwort |
|---|---|
| Tool wird doppelt aufgerufen | idempotenter Schutz |
| Tool scheitert halbwegs | Teilfehler mit sauberem Ergebnis |
| Modell liefert altes ND_ACTIONS | Adapter fängt es ab |
| ein Tool erzeugt sehr viel Inhalt | zuerst Preview, dann Übernahme |
| Nutzer stoppt mitten im Lauf | laufende Tools sauber abbrechen oder markieren |

## Betroffene Dateien oder Bereiche
1. `lib/agentic/commands/assistant-command-parser.ts`
2. neuer interner Tool-Bereich im Backend
3. `components/agentic/hooks/useAssistantArbitration.ts`
4. `lib/notes/open-in/open-in-import-router.ts`
5. Action-Ausführung im agentischen Bereich

## Done-Kriterien
1. Kern-Aktionen laufen intern als Tools
2. ND_ACTIONS ist nur noch Übergang
3. echte Tool-Events können angezeigt werden

## Umsetzung Stand 8. März 2026
1. Die Tool-Registry, Adapter und der Server-Executor sind eingebaut.
2. `ND_ACTIONS` bleibt als Übergang, wird aber intern in echte Tool-Aufrufe umgebaut.
3. Die ersten echten Server-Tools laufen:
   - `note.create`
   - `folder.create`
   - `open_in.import`
4. Der Web-Chat sendet Tool-Ergebnisse jetzt als Stream-Daten an den Client.
5. Der Client liest diese Tool-Daten direkt ein und zeigt die Ergebnisse im Chat-Verlauf.
6. Wenn der Server ein Tool schon ausgeführt hat, wird die spätere Browser-Ausführung blockiert. Das verhindert doppelte Notizen und doppelte Ordner.
7. Nicht fertige Tools bleiben bewusst in Vorschau oder geplant. Das ist okay für diese Phase, weil das Ziel der gemeinsame Tool-Weg war.

## Validierung der Phase
1. Die Planung war sinnvoll.
2. Der größte Restpunkt war nicht ein neuer Tool-Typ, sondern die letzte Verbindung zwischen Server, Stream und Chat.
3. Genau diese Lücke ist jetzt geschlossen.

## Betroffene Dateien bei der Fertigstellung
1. `app/api/chat/route.ts`
2. `app/api/chat/chat-route-helpers.ts`
3. `hooks/useChatInput.ts`
4. `components/agentic/EmbeddedChatView.tsx`
5. `components/agentic/hooks/useServerToolFeed.ts`
6. `app/api/agent/bridge/_shared/bridge-route.ts`

## Nicht Ziel dieser Phase
1. noch kein großer Multi-Agent-Bau
2. noch keine langen Queue-Läufe
3. noch kein MCP-Schreibzugriff

## Nächste Phase danach
`03-provider-routing-budget-und-modelle.md`
