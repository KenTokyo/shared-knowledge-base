# Warmer Akzent, Feuerstellen und das Lichtbudget — duty-of-tsushima

**Lesen wenn:** du eine warme Lichtquelle setzt, eine Feuerstelle dosierst, eine emissive Farbe durch
den Tonemapper schickst oder Punktlicht-Slots verteilst — oder GAME-DESIGN.md §3s Warmanteil
(2–6 % der Bildfläche) bewegen willst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Wie man den Warmanteil **misst**, steht in [`METRICS-AND-GATES.md`](METRICS-AND-GATES.md) und in
`tools/frame.mjs`; die Schwelle ist „rot führt blau um > 0,06 bei Chroma ≥ 0,04". Hier steht, was
diese Zahl **bewegt** und wo sie lügt. Die ausführliche Fassung mit Nachrechnung liegt im Dateikopf
von `src/world/structures.js` und in `tools/warm.mjs`.

- **Die Warm-Spalte ist eine Halbebene, kein Farbtonfenster — und ab Vegetation lügt sie** — zwei
  Kameras sprangen von 0,5 auf 14,3 % und von 0,7 auf 16,4 %, ohne dass ein einziges Pixel wärmer
  wurde. Die Bedingung lautet `r − b > 0,06 ∧ chroma ≥ 0,04` und sagt über **Grün** nichts: ein
  beleuchteter Bambushalm hat mehr Rot als Blau und zählt deshalb mit, obwohl er grün-dominant ist.
  Solange nur Feuer im Bild war, fiel das nicht auf — Flammen sind auch rot-dominant. → Die
  Zusatzbedingung `r ≥ g` mitmessen und **beide** Spalten führen, sobald Vegetation im Bild steht;
  die Spalte aus `capture.mjs` allein ist ab Phase 4 keine Aussage über §3 mehr.
  *`bamboo-cut` 14,30 % gegen **0,29 %** rot-dominant, `ability-dash` 16,45 % gegen **0,65 %**. Die
  Differenzpixel mitteln (90, 98, 72), also Laub. Auf den zwölf übrigen Kameras trennen die beiden
  Spalten um höchstens 0,21 Prozentpunkte · 2026-08-02*
  *Gegenprobe aus einer Änderung, die mit Farbe nichts zu tun hat: Schattenwurf auf der Vegetation
  drückte dieselbe Spalte auf `bamboo-cut` von 14,30 auf **6,96 %** und auf `ability-dash` von 16,45
  auf 1,77 %, während die rot-dominante bei 0,29 bzw. 0,51 % stehen blieb. Eine Spalte, die auf
  Beleuchtung um acht Prozentpunkte reagiert und auf den Akzent gar nicht, misst die Beleuchtung ·
  2026-08-02*

- **Der Ort ist eine eigene Sweep-Achse, und er schlägt die Dosis** — zwei Sweeps über Helligkeit und
  Reichweite waren für zehn von vierzehn Kameras gesättigt. Nicht weil die Welt es nicht zulässt,
  sondern weil an den fotografierten Stellen nichts stand; eine Dosisachse kann eine leere Stelle
  nicht heller machen. → Vor dem Feinschliff der Dosis erst Kandidaten**orte** ranken, jeden gegen
  den gebauten Stand statt gegen eine leere Welt, und die freien Ballastslots dafür umwidmen.
  *`warm.mjs --places`: eine Ortsprobe hat zwei von drei vorgeschlagenen Orten als wirkungslos
  widerlegt (bewegten **keine** Kamera) und zwei ungenannte gefunden, die drei Kameras ins Band
  hoben — `wave-peak` 0,28 → 11,14 %, `material-closeup` 0,11 → 6,15 % · 2026-08-02*

- **Warme Fläche ist linear in der projizierten Fläche, nicht in der Helligkeit** — ein bemaltes
  Bauwerk kann eine Kamera in 40 m rechnerisch nicht ins Band heben, egal wie satt die Farbe ist.
  → Vor dem Bauen die nötige Fläche ausrechnen und dann entscheiden, welche Art Objekt das
  überhaupt sein kann: für 2 % auf 40 m sind es rund **60 m²**, also eine Baumkrone und kein Torii.
  *Das rote Torii hat 9,6 m² Farbe, steht 34 m vor `bamboo-cut`, rechnerisch 0,32 % der Bildfläche —
  gemessen 0,34 %. Acht der vierzehn Kameras fotografieren offenen Grund in 26–80 m · 2026-08-02*

- **Ein Lichtkegel rekrutiert Boden, eine bemalte Fläche nicht** — deshalb ist dieselbe Entfernung
  für ein Licht ergiebig und für Farbe wirkungslos: das Licht macht die Bodenfläche zur warmen
  Fläche. → Den nächsten Hebel auf dem **Boden** suchen, nicht am Bauteil, und `distance` vor
  `intensity` drehen (three schneidet ein Punktlicht dort hart ab).
  *`plateau-hero` trägt 4,0 % aus vier Fackelmasten in 18–60 m · 2026-08-02*

- **ACES entsättigt einen zu hellen Emitter nach Weiß, und die Zahl merkt es nicht** — eine Flamme
  aus einem einzigen Wert (1,75 / 0,82 / 0,30 linear) kam am fertigen Bild als **(239, 217, 161)**
  heraus, also als Glühbirne, während der Warmanteil sie brav mitzählte. Derselbe Effekt stand
  vorher schon als Zahl da und wurde nicht gelesen: E = 3 und E = 20 ergaben dieselbe Warmfläche.
  → Nicht heller, sondern **dunkler und gesättigter** gegensteuern, und die Farbe als Verlauf über
  die Höhe ins Vertexattribut legen statt als einen Materialwert — heißer Kern unten, kühlere
  rötliche Spitze oben, so wie eine Flamme ihre Farbe auch wirklich verliert.
  *`FLAME_HOT` (1,35 / 0,40 / 0,09) → `FLAME_TIP` (0,62 / 0,13 / 0,02) misst am fertigen Bild
  (208, 172, 128) im Körper und (185, 121, 91) an der Spitze · 2026-08-02*

- **Ein Flächenmaß ist blind für die Form** — vierzehn Kameras Zahlen sagten „warmer Akzent im
  Band", während die nächste Flamme im Bild 0,68 m **breit** und 0,57 m **hoch** war und aus sieben
  Metern als cremefarbene Raute auf dem Boden las. Eine Deckungszahl kann das nicht sehen: eine
  liegende Raute deckt so viele Pixel wie eine stehende Flamme. → Bei jeder Population, die über ein
  Flächenmaß gerankt wird, das Seitenverhältnis der Art **gegen die Geschwister** prüfen; ein
  Ausreißer nach unten ist fast immer ein Modellierfehler, kein Stilmittel.
  *`pyre` 0,84 Höhe zu Breite gegen `mast` 2,01 / `gate` 1,73 / `signal` 1,61. Die Korrektur auf
  1,87 bewegte den Warmanteil von 2,9 auf 2,8 % — die Zahl war zum Bildfehler fast blind · 2026-08-02*

- **Eine gestreute Population mit einer gemeinsamen Höhe steht am Hang in der Luft** — die Streuung
  ist waagerecht, die Höhe kommt aus der Mitte, und am Hang ist die Differenz proportional zur
  Streuung. → Den Abstand der Stelle über **ihrem eigenen** Grund merken und jedes Element seinen
  Grund neu abfragen lassen; für Streuung 0 ist das eine Nulloperation und darf es auch sein, weil
  ein Aufsatz auf einem Bauwerk gerade **nicht** auf dem Boden steht.
  *Brandnest auf 20°: 1,9 m seitlich sind 0,7 m Höhenfehler, also die Höhe der Flamme selbst ·
  2026-08-02*

- **Ein Slotbudget schneidet an einer Rangsumme, nicht an einer Bauart** — die Rangfolge las sich
  als „auf `medium` reicht es bis `gate`", aber der Schnitt fällt dort, wo die Summe der Ränge das
  Budget erreicht, und das war **genau** hinter dem vorletzten Rang. → Die kumulierte Stellenzahl je
  Rang neben das Budget jeder Qualitätsstufe schreiben und den Warmanteil auf **jeder** Stufe messen;
  eine Rangfolge, die nur auf `high` geprüft ist, ist auf `medium` eine Vermutung.
  *4 mast + 4 brazier + 6 lantern = 14 = das ganze `medium`-Budget (16 − 2 Reserve). Kameras im Band
  2–6 %: high 6, medium 3, low 0 · 2026-08-02*

- **Der Akzent misst den Grundton, sobald drei Lichtterme dazwischen gebaut wurden** — §3s Warmanteil
  stand auf 10,21 % gegen ein Band von 2–6 %, zehn von fünfzehn Kameras darüber, und der einzige
  Regler, der „warm" heißt, ist die Feuerdosis. Er ist der falsche: mit **allen acht Feuerarten auf
  Dosis null** stehen immer noch 8,16 % und neun Kameras über der Schranke. Welt (4,76), Env-Map
  (+1,69), Blattdurchlicht (+1,93) und Feuer (+2,05) stapeln sich, und jeder Beitrag wurde gegen
  die Zahl *vor* dem jeweils nächsten Bau geprüft — vier Zahlen altern gegeneinander statt eine mit
  der Welt. → Vor dem Griff zum namensgleichen Regler die **Herkunft** messen: jeden Term einzeln
  auf null und den Rest in **einem** Prozess ablesen (`--sources`). Gegriffen wird dann dort, wo die
  Masse liegt — hier der Blauanteil des **Lifts**, der einzige Regler, der die dunkle Hälfte trifft
  (den gelbgrünen Bewuchs) und nicht den Flammenkern. Ein Akzent, der über der Schranke steht,
  während seine Quelle abgeschaltet ist, ist per Definition kein Akzentproblem.
  *10,21 % → 4,01 % über 15 Kameras, 9 statt 5 im Band, 3 statt 10 darüber; Preis Chroma 0,0395 →
  0,046 und drei Kameras unter 2 %. `tools/warm.mjs --sources`/`--rank`, 24 Kombinationen ·
  `93bf3f4` `f0370b4` · 2026-08-03*
