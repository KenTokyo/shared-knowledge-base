# Welt, Lanes und Begehbarkeit — duty-of-tsushima

**Lesen wenn:** du das Heightfield, eine Lane, einen Grat, eine Terrasse oder einen Spawnpunkt
änderst — oder ein Gate schreibst, das behauptet, ein Weg sei begehbar.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Globale Grundlagen stehen in [`../../threejs/MAP-GENERATION.md`](../../threejs/MAP-GENERATION.md)
und [`../../threejs/WATER.md`](../../threejs/WATER.md). Der Weltvertrag selbst ist `ARCHITECTURE.md`
im Repo. Hier stehen nur die lokalen Fallen.

- **Ein Gefälle ohne sein Messfenster ist keine Zahl** — dasselbe Terrain liest sich über 0,9 m Lauf
  als 50° und über 2 m als 25°, also ist eine 45°-Schwelle je nach Fenster erfüllt oder verletzt,
  ohne dass sich am Terrain irgendetwas geändert hat. Wer das Fenster im Kommentar lässt, liefert
  eine Zahl, die niemand nachprüfen kann. → Fenster als benannte Konstante führen und in **jeder**
  Ergebniszeile mit ausgeben: `steilste 2,6 m: 20°`.
  *`tools/smoke.mjs`, `WINDOW_M = 2` · 2026-08-01*

- **Ein Grat schüttet über seinen Gauß-Radius in die Nachbarzone** — die Achse endet dort, wo man sie
  hinschreibt, das Feld nicht: ein Grat mit 58 m Halbwertsbreite legte rund 28 m auf eine Flanke,
  die 40 m weiter östlich lag. Die Reisterrasse war dort auf 10 m gepinnt, das Umland stand auf 37 m
  — die Terrasse lag in einer Grube, ihr Wellen-Spawn auf 42,1 m statt am Wasser, davor eine Wand von
  16,8 m auf 27,1 m über 2 m Lauf. Von oben betrachtet sah nichts davon falsch aus. → Nach jeder
  Änderung an einem Makroform-Modifier den **Spawn-zu-Kopf-Weg** neu messen, nicht das Feld ansehen;
  der Radius reicht immer weiter als das Endstück der Achse.
  *`RIDGE_NE` endete bei `[220,-40]`, jetzt bei `[218,-84]`; 79° vor dem Fix, 19° über 2,8 m danach ·
  `src/world/spec.js:125` · 2026-08-01*

- **Die getretene Linie endete neben ihrem eigenen Wegkopf** — der Sinus-Versatz einer Lane war bei
  `t=1` nicht null, also lief der Weg 8,3 m am Kopf vorbei, während Biom-Blutung,
  Schrein-Ausrichtung und Wellen-Spawn ihn dort erwarten. Ein Versatz, der an beiden Enden null sein
  muss, wird nicht dadurch null, dass man ihn klein wählt. → Mit `sin(π t)` auf beide Enden pinnen
  und die Route als API veröffentlichen (`w.laneSpine`), damit niemand sie aus den Endpunkten
  rekonstruiert — die Sehne liegt bis zu 9 m neben dem echten Weg.
  *`src/world/heightfield.js:110`; das Laufweg-Gate kommt seither auf 0,1–0,2 m an jeden der vier
  Köpfe · 2026-08-01*

- **Eine Terrassenkante ist eine Stützmauer, kein Hang** — wo eine Lane eine Paddy-Kante kreuzt,
  steht per Konstruktion eine Mauer, und der Spawn liegt dahinter. Die Kante ist als Bauwerk
  richtig und als Weg unpassierbar; das Terrain hat kein Wort für den Unterschied. → Dort, wo eine
  Lane eine Terrassenkante schneidet, den Bund zu einer Rampe öffnen, statt die Kante insgesamt
  flacher zu machen.
  *51° gemessen · `src/world/heightfield.js:228` · 2026-08-01*

- **Ein Gate, das Höhen vergleicht, meldet Absicht als Fehler** — die erste Fassung des Lane-Gates
  prüfte „Lane liegt unter dem Plateau" und meldete drei Fehler, von denen zwei by design waren:
  eine Lane, die über einen Sattel steigt, ist kein Bug. → Prüfungen als **Design-Zusagen**
  formulieren, die man verteidigen will — Sichtlinie vom Plateau, Begehbarkeit bis zum Spawn,
  Spawnpunkt frei —, nicht als Höhenrelationen, die zufällig meistens gelten.
  *`tools/smoke.mjs` · 2026-08-01*
