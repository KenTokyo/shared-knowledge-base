# claude-tower-defense — Projekt-Learnings

**Lesen wenn:** Weltschicht (`src/render/`, `src/world/`, `src/vfx/`) oder Messsonden (`tools/`).
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Architektur/SSoT: `Notes/TASKS.md`, Einstieg `TASKS-2.md`, Akten `DEFECTS.md`. Hier nur belegte Projektfallen.

## Trigger

| Arbeit | Zuerst lesen |
|---|---|
| Zahl oder Grün einer Sonde deuten, A/B-Klammer, Sampler | [`INSTRUMENT-TRAPS.md`](INSTRUMENT-TRAPS.md) |
| `--bad`-Arm, Exit-Code, Selbstprüfung bauen oder abnehmen | [`RED-ARM-TRAPS.md`](RED-ARM-TRAPS.md) |
| Schatten, Cascade, LOD, Culling, Calls, Framezeit | [`SHADOW-AND-CULLING.md`](SHADOW-AND-CULLING.md) |
| CLI, Prüfreihe, Datei, Beleg | [`TOOLING-TRAPS.md`](TOOLING-TRAPS.md) |
| HUD, Weltlabel, Lesbarkeit, Kontrast, Schriftgröße, `z-index`, grüne Oberfläche | [`UI-MEASURING.md`](UI-MEASURING.md) |

Global: [3D-Router](../../THREEJS-RULES.md) · [Performance](../../threejs/PERFORMANCE.md) · [Messung](../../threejs/MEASURING.md).

## Teuerstes Muster

PH88–97: 6 Instrumentdefekte (D63/D65–69), 0 Produktdefekte. PH99: D70 Produkt (6× ausgelieferte vs.
unterscheidbare Vertices), gefunden durch neue Frage; 5 Instrumente zählten nur Dreiecke.

> **Prüfung reicht kürzer als Überschrift und erzeugt falsches Grün.**

Ursachen: Prüfung im Zweig statt davor; A/B-Klammer liest nur A-Enden; Korpus schließt Zieltools aus.
Gegenmittel: bekannt schlechten plus guten Stand fahren; geprüfte Namen/Anzahl ausgeben.

D71 ergänzt Gegenpol: Gleichheit gefordert, obwohl nur Containment gilt; 42/42 rot. Prüfung kann nie, immer oder
genau richtig feuern — nur Rot- und Grünkontrolle unterscheiden. PH100/101 ergänzte zweiten Produktfund:
Sonden maßen Einreichung, keine Schatten-Abtastrate. **Ungeprüfte Annahme über mehrere Übergaben bleibt verdächtig.**

HUD-Lesbarkeit ergänzte Stichprobenfalle: klassenbasierte Sonde maß 218 Zeilen/0 unter Boden; zustandsbasiert
(Alarm, Ende, ausgegraut, dichteste Oberfläche) 678/17. HUD-Wash über Weltlabel drückte schlimmsten Fall auf
1,27:1. → Bestehendes Instrument gegen relevante Zustände statt nur Klassen führen; Details in
[`UI-MEASURING.md`](UI-MEASURING.md).
