# duty-of-tsushima — Projekt-Learnings

**Lesen wenn:** Werkzeug unter `tools/`, Heightfield, Lane oder Spawnpunkt.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Engine-Vertrag: Repo-`ARCHITECTURE.md`; Pflicht/Messregeln: `AGENTS.md`. Hier nur belegte Projektfallen.
Global: [`THREEJS-RULES.md`](../../THREEJS-RULES.md).

## Trigger

| Arbeit | Zuerst lesen |
|---|---|
| Tool, headless Browser, Frame-Pump, Laufzeitzahl | [`HARNESS-GATES.md`](HARNESS-GATES.md) |
| Kennzahl, Schwelle, Tor, Sweep-Ranking | [`METRICS-AND-GATES.md`](METRICS-AND-GATES.md) |
| warme Lichtquelle, Feuerstelle, Emissive, Punktlicht-Slots, §3s Warmanteil | [`WARM-ACCENT-AND-FIRE.md`](WARM-ACCENT-AND-FIRE.md) |
| Frametime, GPU-/Submission-Zeit, Quantil, Rauschboden | [`FRAME-TIMING.md`](FRAME-TIMING.md) |
| Heightfield, Lane, Grat, Terrasse, Spawn, Begehbarkeit | [`WORLD-LANES.md`](WORLD-LANES.md) |
| Terrain-Oberfläche, `splat.js`, Vertexattribut, Maske, lokaler Bildkontrast | [`TERRAIN-SURFACE.md`](TERRAIN-SURFACE.md) |
| Pflanze streuen, Dichte, LOD-Stufe, Blatt-/Kronenform | [`VEGETATION-SCATTER.md`](VEGETATION-SCATTER.md) |

## Teuerstes Muster

> **Grüner Lauf, falsche Frage.**

Sechs Fälle: Build statt Boot; SwiftShader statt GPU; Gefälle ohne Fenster; Höhen statt Design-Zusage;
7/14 Benchmark-Kameras im Berg trotz 34 grüner Checks, weil Gate Spielerkamera prüfte; „Tiefschatten“ konstant
0,0 %, weil Post-Lift Boden 0,135 über Schwelle 0,10 hob. Beide letzten Fälle erzeugten falsche Baselines und
verdächtigten funktionierende Materialien.

Gegenmittel: **Prüfung misst Zusage, Messfenster gehört zur Zahl.** Konstante Kennzahl misst Instrument;
abgeleitete Daten scheitern nicht, sondern antworten falsch.

## Lokale Owner

- Boot-Gates/Schwellen: `tools/smoke.mjs`
- Browser/GPU-Abbruch/Messtabelle: Kopf `tools/browser.mjs`
- Zeitmessung samt Gegenproben: Kopf `tools/perf.mjs`
- Weltfeld/`laneSpine`: `ARCHITECTURE.md`
- Welt-Spec-Zahlen: Kommentare in `src/world/spec.js`; Code schlägt Prosa
