# Maßstab der Welt — duty-of-tsushima

**Lesen wenn:** eine Weltzahl mit einem Faktor multipliziert wird — Layoutmaßstab, Kartengröße, Gitterauflösung, Bake-Wechsel.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Zahlenquelle: `src/world/spec.js` (`LAYOUT`, `lay()`, Kopfkommentar). Begehbarkeit: [`WORLD-LANES.md`](WORLD-LANES.md).
Global: [Map-Generierung](../../threejs/MAP-GENERATION.md).

- **Grundriss gestaucht, Relief stehen gelassen** — die Karte wird kleiner und jede Steigung um 1/L steiler; gemeldet wird das nie als „Maßstab", sondern als „keine Welle kommt an", weil die Navigation vorher aussteigt. Amplitude und Frequenz eines Höhenfelds sind **eine** Entscheidung. → Amplituden durch denselben Faktor **und** Rauschabtastung in Designkoordinaten (`DESIGN = 1/L`): die Identität `h(x) = L · h₀(x/L)` lässt jede gemessene Steigung dort, wo sie gemessen wurde.
  *`LAYOUT` 0,625: Plateaurand wäre 52° → 69° gegen `SLOPE_LIMIT` 0,62 gelaufen, alle vier Lanes unbegehbar in einer Änderung. Mit der Identität lesen sie unverändert 20/23/28/36°, während der Marsch von 165,8–188,3 m auf 103,6–117,7 m fällt · `e5e6c00` · 2026-08-03*

- **Auflösung an einer Weltgröße ist eine verkleidete Länge** — eine Gitterweite sieht wie eine reine Zahl aus und bleibt beim Skalieren stehen. `_smooth` blurrt im Gitterraum, `normalAt` differenziert **einen Schritt**: beide geben physische Längen zurück, also liest dieselbe Insel ihre Steigung plötzlich über weniger Grund — leise rauer, in den Lanes leise steiler, ohne dass eine Zusage bricht. → **Texelgröße halten, nicht Texelzahl**; Trennlinie ist, ob über das Gitter differenziert oder ob es angesehen wird.
  *`HEIGHT_RES` 1024 über 350 m wären 0,342 m je Texel statt 0,547; gebaut 640 = 1024 × `LAYOUT`. `BAKE_RES`/`SPLAT_RES` bleiben 512, die werden angesehen · `e5e6c00` · 2026-08-03*

- **Eine Rate ist keine Länge und skaliert gegenläufig** — Bahnradius durch den Maßstab, Winkelgeschwindigkeit stehen gelassen: der Vogel schlägt gleich schnell mit den Flügeln und kommt nicht mehr vorwärts. Fluggeschwindigkeit ist `orbit × speed`, also ist die Rate durch den Faktor zu **teilen**. → Jede Konstante im Generator entscheidet einzeln: Länge → mal L, Rate über einer Länge → durch L, Verhältnis und Winkel → gar nicht.
  *Möwe wäre von 2,1–11,0 m/s auf 1,3–6,9 m/s gebremst worden; `layRate = v / LAYOUT` in `life.js` · `e5e6c00` · 2026-08-03*

- **Ein Maßstab ist erst dann eine Zahl, wenn niemand außerhalb der Spec eine zweite hält** — getippte Weltkoordinaten in fremden Dateien überleben den Dreh nicht, und sie melden sich nicht: sie stehen relativ zu Landmarken, die weggewandert sind. → Vor dem Dreh `grep` über alle Zahlen mit Meterbedeutung außerhalb der Spec, nicht nur über die Spec; jede gefundene Stelle bekommt `lay()` oder eine Begründung, warum nicht.
  *Drei getippte Brandnester in `structures.js` standen auf dem Grund von 560 m gegen Brücke und Wachturm; Möwenorbit 96 m hätte die 145-m-Insel ganz überquert · `e5e6c00` · 2026-08-03*

- **Kartengröße muss ganzes Vielfaches der Chunkkante bleiben** — `CHUNKS = SIZE / CHUNK` ist Schleifengrenze: 5,6 Chunks je Kante bauen Terrain über zwei Kartenränder hinaus und über die anderen beiden gar nicht, ohne Fehlermeldung. → Faktor so wählen, dass die Division aufgeht (bei `CHUNK` 70: 0,75 → 420 m, 0,625 → 350, 0,5 → 280), sonst `CHUNK` ableiten — die Konstante steht **doppelt**.
  *`src/world/index.js:29` und `src/world/foliage.js:61`, beide `const CHUNK = 70` · 2026-08-03*

- **Nach einem Bake-Wechsel ist jede ältere Zahl keine Baseline mehr** — das Höhenfeld ist Eingang für Kameras, Biome, Vegetationsverteilung und Messregionen; ein A/B über den Wechsel hinweg vergleicht zwei Inseln und liest sich wie ein Regressionsfund. → Baseline immer mit dem Commit des Bakes benennen; nach jedem Wechsel erst `smoke`, `aim --check`, `hud`, `enemies` grün fahren, dann vergleichen.
  *Drei Wechsel in zwei Tagen: Rampen `6645430`, Furt `ead4986`, Maßstab `e5e6c00` · 2026-08-03*
