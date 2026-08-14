# Short-first und gezielt platzierte Adjektive

## Initial goal

- Prompt: `2026-08-14-short-first-adjective-placement-prompt.md`
- `PROMPTING-TIPS.md` und `CODING-RULES.md` kompakt auf die neue Short-first-Erkenntnis ausrichten.
- Drei gute und drei schlechte Mini-Beispiele ergänzen.

## Phasen

- [x] P1 — Beide Zieldateien und vorhandene Bewertungszusammenfassung vollständig prüfen.
- [x] P2 — Prompting-Tipps um klare Standardroute, Adjektivplatzierung und Beispiele ergänzen.
- [x] P3 — Coding Rules um kurze verbindliche Promptregel und Verweis ergänzen.
- [x] P4 — Links, UTF-8, Widersprüche, Diff und Zeilenlimits statisch prüfen.

## Entscheidungen

- `PROMPTING-TIPS.md` trägt Erklärung und Beispiele; `CODING-RULES.md` enthält nur den kurzen Arbeitsvertrag.
- Standardroute: Short-first auf starker Baseline; Medium nur bei benanntem Mangel; Long bei komplexer Neuentwicklung, Integration oder wiederkehrendem Fehler.
- Adjektive positiv nutzen, aber nah am Bezugswort und nach wenigen Wirkungsdimensionen ordnen.
- Vorhandene fremde Änderungen nicht zurücksetzen.
- Reine Dokumentationsarbeit: keine Tests, Builds, Serverstarts oder Sichtprüfungen.

## Findings

- Neuester Bewertungsstand: 56 Ergebnisse; Elemental V20.3 `91/100`, V20.2 `68/100`, V20.6 `40/100`.
- V20.3 stützt kuratierte Adjektive als starken lokalen Design-Controller; Trefferzahl und Promptlänge allein erklären Qualität nicht.
- Gegenbeispiele: ähnlich kurze Katana-Prompts erreichten `15/100` und `18/100`; V14.4 hatte 112 Adjektivtreffer bei `30/100`.
- Aktuelle `PROMPTING-TIPS.md` enthält bereits uncommittete Vorarbeit; Änderungen werden gezielt darauf aufgebaut.

## Fortschrittslog (append-only)

### Runde 1 — 2026-08-14 — Evidenz und Zielstruktur geprüft

- Beide Zieldateien vollständig gelesen.
- Vorhandene Bewertungs-Task mit ursprünglichen und später korrigierten Scores vollständig gelesen.
- Richtung als evidenzgestützte Standardroute statt universelles Gesetz festgelegt.

### Runde 2 — 2026-08-14 — Prompting-Tipps konkretisiert

- Grundregel auf Short-first mit gezielter Eskalation umgestellt.
- Adjektivregel positiv gefasst: direkt am Bezugswort, über wenige Wirkungsdimensionen verteilt, ohne Lösungswahl vorzugeben.
- Drei kompakte Gut-/Schlecht-Paare für VFX, Animation und UI ergänzt.
- Bewertungsrichtung mit aktuellen Scores und dem neuen, noch unbewerteten Plus-20-Nutzerbefund knapp belegt.

### Runde 3 — 2026-08-14 — Coding Rules knapp angebunden

- Bestehenden langen Verbesserungsabsatz durch sechs handlungsnahe Stichpunkte ersetzt.
- Short-first, direkte Adjektivplatzierung, Gestaltungsfreiheit und gezielte Eskalation verbindlich gemacht.
- Ausführliche Begründung und Beispiele bleiben ausschließlich in `PROMPTING-TIPS.md`, damit Regeln nicht auseinanderlaufen.

### Runde 4 — 2026-08-14 — Dokumentation statisch abgeschlossen

- Drei Gut-/Schlecht-Paare, aktuelle Scorebelege und interne Verlinkung statisch bestätigt.
- Keine UTF-8-Ersatzzeichen oder Whitespacefehler gefunden.
- Zieldateien liegen mit 160 beziehungsweise 268 Zeilen deutlich unter 800 Zeilen.
- Kein Commit erstellt: `PROMPTING-TIPS.md` enthielt bereits umfangreiche fremde, uncommittete Vorarbeit; diese darf nicht ungefragt mitcommittet werden.
- Keine Tests, Builds, Serverstarts oder Sichtprüfungen ausgeführt.
