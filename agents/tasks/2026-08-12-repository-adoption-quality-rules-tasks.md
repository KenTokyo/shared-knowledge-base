# Repository-Übernahme und Qualitätsparität in Coding Rules

## Initial goal

- Prompt: [2026-08-12-repository-adoption-quality-rules-prompt.md](2026-08-12-repository-adoption-quality-rules-prompt.md)
- Ziel: Allgemeine Regeln für vollständige, nicht nur oberflächliche Übernahmen aus Referenz-Repositories stärken.

## Phasen

### Phase 1 — Bestand und Regelposition

- [x] `AGENTS.md` und `CODING-RULES.md` vollständig lesen.
- [x] Vorhandene Aussagen zu „Übernehmen“, schwachen Grundlagen, Altcode und Architektur erfassen.
- [x] Passende Position in Abschnitt 2 sowie Abschlussprüfung bestimmen.

**Ergebnis:** Die bestehende Einzelzeile zu „Übernehmen“ ist richtig, aber zu kurz. Es fehlen eine End-to-End-Referenzanalyse, erlaubte große Umbauten, Nullreferenz-Cleanup und ein verbindlicher Eskalationsweg bei wiederholtem Userfeedback.

**Grenzen:** Reine Regeländerung; keine Tests und keine Sichtprüfung.

### Phase 2 — Regel stärken

- [x] Eigenen kompakten Unterabschnitt für Repository-/Referenzübernahmen ergänzen.
- [x] Wiederholtes identisches Userfeedback als Architektur- und Ursachenprüfung behandeln.
- [x] Schnellcheck um Qualitätsparität und Entfernung verdrängter Altwege ergänzen.

**Ergebnis:** „Übernehmen“ ist jetzt ein End-to-End-Ergebnisvertrag. Der neue Abschnitt verlangt Referenz-/Zielanalyse, Qualitätskriterien, Migration im echten Produktweg, große gekoppelte Umbauten bei ungeeigneter Grundlage, Nullreferenz-Cleanup und Ursacheneskalation bei wiederholtem Mangel.

### Phase 3 — Abschlussprüfung

- [x] UTF-8, Zeilenzahl, Struktur, Diff und Widerspruchsfreiheit prüfen.
- [x] Taskstand und Ergebnis ergänzen.

**Ergebnis:** Regeldatei und Task-Paar sind strukturell vollständig, valides UTF-8, ohne nachgestellte Leerzeichen und unter dem Zeilenlimit. Der Remote-Stand wurde abgerufen; dessen unabhängige Tonalitätsänderung wird vor dem Push per Rebase erhalten.

## Entscheidungen

- Die Regel fordert Ergebnisparität, aber keine blinde 1:1-Kopie einer inkompatiblen Architektur.
- Erforderliche große Refactorings und Löschungen sind Teil des Auftrags, sobald die bestehende Grundlage die Referenzqualität verhindert.
- „Noch einmal dasselbe Problem“ verbietet, denselben kleinen Tuning-Ansatz nur zu wiederholen.

## Findings

- Abschnitt 2 enthält bereits: „Übernehmen heißt gleiche Funktion, gleiches Verhalten, gleicher Datenfluss und gleiche Qualität.“
- Abschnitt 4 verlangt bereits eine Hauptquelle und das Löschen alter Wege, verbindet dies aber noch nicht ausdrücklich mit Repository-Übernahmen.
- Abschnitt 9 eignet sich als letzter verbindlicher Abschlusscheck.

## Fortschrittslog (append-only)

### Runde 1

Prompt-/Task-Paar vor dem ersten Edit angelegt. Regelbestand vollständig gelesen und Zielergänzung auf einen neuen Unterabschnitt plus einen Schnellcheck-Punkt begrenzt.

### Runde 2

`CODING-RULES.md` erweitert. Oberflächliche Demos, Wrapper, Umfärbungen, vereinfachte Nachahmungen, Dual Paths und Abschluss nach einem unvollständigen Pilot sind nun ausdrücklich ausgeschlossen. Wiederholtes Userfeedback widerlegt den bisherigen Ansatz und löst eine erneute End-to-End-Ursachen- und Architekturprüfung aus.

### Runde 3

Abschluss statisch geprüft: `CODING-RULES.md` 261 Zeilen vor Remote-Integration, Prompt 17 Zeilen, Task 59 Zeilen; UTF-8, finale Zeilenenden, Linkziel und Whitespace fehlerfrei. `git diff --check` meldet keine Fehler. Keine Tests oder Sichtprüfung, da ausschließlich Doku und Regeln geändert wurden. `origin/main` ist um einen unabhängigen Ein-Zeilen-Tonalitätswechsel voraus; dieser bleibt bei der Integration erhalten.
