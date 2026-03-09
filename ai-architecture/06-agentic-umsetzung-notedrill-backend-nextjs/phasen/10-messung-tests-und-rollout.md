# Notedrill Backend Next.js: Phase 10 Messung, Tests und Rollout

Stand: 8. März 2026
Status: `DONE`

## Ziel
Diese Phase sorgt dafür, dass der Umbau nicht nur theoretisch gut klingt,
sondern sicher ausgerollt werden kann.

## Was der User davon hat
1. weniger kaputte Überraschungen
2. ruhigere Releases
3. stabilere Agent-Funktionen

## Hauptaufgaben

## 1. Vertrags-Tests bauen
Wir brauchen Tests für:
1. Run-Vertrag
2. Event-Sprache
3. Tool-Aufträge
4. Artefakt-Verträge

## 2. Replay-Tests einführen
Alte problematische Antworten sollen wieder abgespielt werden können.

## 3. Kosten- und Fehler-Messung einbauen
Mindestens:
1. Retry-Rate
2. Parse-Rate
3. Tool-Erfolgsrate
4. Kosten pro Lauf
5. Queue-Fehler

## 4. Feature-Flags nutzen
Neue Teile nicht sofort für alle.

## 5. Rollout in Stufen
1. intern
2. kleine Nutzergruppe
3. größere Gruppe
4. Standard

## Edge Cases

| Edge Case | Antwort |
|---|---|
| neuer Runner macht alte Wege kaputt | Feature-Flag und Fallback |
| Kosten steigen plötzlich | Alarm und Stop-Regeln |
| Queue hängt | Health-Checks und Incident-Plan |
| Tool-Erfolg sinkt | Rollout stoppen |

## Betroffene Dateien oder Bereiche
1. `tests/agentic/*`
2. neue Run- und Tool-Tests
3. Telemetrie
4. Rollout-Gates

## Done-Kriterien
1. wichtige Verträge sind getestet
2. Kosten und Fehler sind sichtbar
3. neue Phasen können kontrolliert live gehen

## Mein ehrlicher Befund
Ohne diese Phase wird die beste Architektur im Alltag schnell nervig.
Mit dieser Phase wird sie betreibbar.
