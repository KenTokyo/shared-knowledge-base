# Notedrill Backend Next.js: Phase 06 Lange Läufe, Queue und 24h-Agenten

Stand: 8. März 2026
Status: `PLANNED`

## Ziel
Diese Phase macht Agent-Läufe möglich, die nicht am offenen Browser hängen.

## Was der User davon hat
1. große Aufgaben können weiterlaufen
2. Browser schließen wird weniger kritisch
3. spätere Hintergrund-Aufgaben werden möglich

## Was wir aus dem heutigen Backend lernen
1. der aktuelle Chat ist noch stark an den Live-Dialog gebunden
2. lange Prozesse brauchen einen echten Laufdienst

## Hauptaufgaben

## 1. Eine Job-Queue einführen
Jeder größere Lauf wird als Job speicherbar.

## 2. Worker bauen
Der Worker führt den Lauf aus:
1. mit Heartbeat
2. mit Stop
3. mit Fehlerstatus

## 3. Pause und Wiederaufnahme vorbereiten
Noch nicht alles sofort,
aber die Grundstruktur muss da sein.

## 4. Laufarten unterscheiden
1. Live-Chat
2. kurzer Hintergrundjob
3. langer Agent-Lauf

## 5. 24h-Agenten erst als Aufsatz denken
Wichtig:
Nicht sofort jedem Nutzer einen Dauer-Worker geben.

Erst:
1. Queue
2. Laufstatus
3. Idle-Regeln
4. Stop-Regeln

## Edge Cases

| Edge Case | Antwort |
|---|---|
| Browser wird geschlossen | Lauf bleibt auf dem Server sichtbar |
| Worker hängt | Lease und Timeout |
| Job startet doppelt | idempotente Job-Regeln |
| langer Lauf wird zu teuer | Budget-Abbruch |
| Nutzer will sofort stoppen | Cancel-Signal bis zum Worker |

## Betroffene Dateien oder Bereiche
1. neuer Job- und Worker-Bereich
2. Run-Store
3. `app/api/chat/route.ts` als Startpunkt
4. spätere Notification- oder Status-Endpunkte

## Done-Kriterien
1. längere Läufe können außerhalb des Live-Chats laufen
2. Status bleibt nachvollziehbar
3. 24h-Ideen haben eine saubere Grundlage

## Nächste Phase danach
`07-mcp-server-und-externe-werkzeuge.md`
