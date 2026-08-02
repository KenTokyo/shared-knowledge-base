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

- **Belegungsfeld beantwortet die falsche Frage** — `occupied()` sagt, was *gebaut* ist, `water()`, was nass ist; was frei bleiben *muss*, sagt keins. Platzierungsregeln setzen dann Volumen auf die Lane-Achse, und das bleibt folgenlos, bis laterale Kollision dazukommt. → Freizuhaltendes als eigenes Feld führen (`laneClearance(x,z)`), nicht aus Belegung ableiten; Ausweichen als Regel im Bau, nicht als Handkoordinate.
  *Vier Regeln betroffen: Halle + Hof auf x=0, alle vier Antworttafeln per `head*0.46`, Brandnest „entlang des Südwegs“ mit 2,86 m Überlapp. bamboo 37 m von 224, burnt 71 m von 172 · `structures.js` · 2026-08-02*

- **Eine Lane hat zwei Linien, nicht eine** — die getretene Spine (mit Wobble) und die Sehne, die ein blind vorwärts laufender Sprinter oder eine Welle ohne Ausweichgrund nimmt. Sie liegen bis zu 9 m auseinander; eine freizuräumen räumt nichts frei. → Beide als Route führen und beide prüfen.
  *Halle nach Spine-Freiräumung immer noch auf der Sehne · `heightfield.js:_bakeRoutes` · 2026-08-02*

- **Ausweichender wird von sich selbst blockiert** — `_bakeOccupancy` beansprucht den Spec-Grund vor dem Bau, also fand die 12-m-Scheibe der Halle jeden Kandidaten besetzt: 19,7 m Abstand von sich selbst nötig, Suchradius 18 m, kein Versatz und keine Fehlermeldung. → `exceptId` beim Suchen; wer weicht, verschiebt seine Scheibe (`relocate`) statt eine zweite anzulegen.
  *Halle blieb still auf [0,−22] stehen, obwohl die Regel griff · `heightfield.js:occupied` · 2026-08-02*

- **Gradientenabstieg versagt genau am Problemort** — eine Distanzfunktion hat auf ihrer Mittellinie ein Minimum, ihr Gradient verschwindet dort. Wer *auf* dem Weg steht (der Regelfall bei zentrierter Komposition), bekommt „keine Richtung“. → Ringsuche mit fester Winkelreihenfolge: funktioniert auf dem Minimum und bleibt deterministisch.
  *Halle exakt auf x=0 der bamboo-Sehne x=0 · `structures.js:offLane` · 2026-08-02*
