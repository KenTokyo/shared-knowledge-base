# Welt, Lanes und Begehbarkeit — duty-of-tsushima

**Lesen wenn:** Heightfield, Lane, Grat, Terrasse, Spawn oder Begehbarkeits-Gate.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Global: [Map-Generierung](../../threejs/MAP-GENERATION.md) · [Wasser](../../threejs/WATER.md). Weltvertrag: Repo-`ARCHITECTURE.md`.

- **Gefälle ohne Messfenster** — gleiches Terrain: 50° über 0,9 m, 25° über 2 m. → Fenster als Konstante und in jeder Zeile: `steilste 2,6 m: 20°`.
  *`tools/smoke.mjs`, `WINDOW_M=2` · 2026-08-01*

- **Grat wirkt über Achsenende hinaus** — Gaußradius schüttet in Nachbarzone; Top-down bleibt plausibel. → Nach Makroform-Edit Spawn-zu-Kopf-Weg messen, nicht Feld ansehen.
  *58-m-Halbwertsbreite hob Flanke 40 m östlich um ~28 m; Terrasse 10 vs. Umland 37 m; Spawn 42,1 m, Wand 16,8 m/27,1 m über 2 m. `RIDGE_NE` [220,−40]→[218,−84]; 79°→19°/2,8 m · 2026-08-01*

- **Lane endet neben Wegkopf** — Sinusoffset bei `t=1` ≠0; Weg verfehlt Kopf 8,3 m, Sehne echten Weg bis 9 m. → `sin(πt)` pinnt beide Enden; Route als `w.laneSpine` veröffentlichen.
  *Laufweg-Gate erreicht vier Köpfe auf 0,1–0,2 m · `heightfield.js:110` · 2026-08-01*

- **Terrassenkante ist Mauer, kein Hang** — Lane kreuzt konstruktiv richtige, aber unpassierbare Paddy-Kante. → Bund lokal zur Rampe öffnen, nicht gesamte Kante glätten.
  *51° · `heightfield.js:228` · 2026-08-01*

- **Höhengate meldet Absicht als Fehler** — „Lane unter Plateau“ markiert Sattel als Bug. → Verteidigbare Design-Zusagen: Sichtlinie, Begehbarkeit bis Spawn, freier Spawn; keine meist gültige Höhenrelation.
  *Erstes Gate: 3 Fehler, davon 2 by design · `tools/smoke.mjs` · 2026-08-01*
