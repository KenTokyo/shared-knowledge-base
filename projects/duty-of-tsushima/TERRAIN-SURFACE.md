# Terrain-Oberfläche und lokaler Kontrast — duty-of-tsushima

**Lesen wenn:** du `src/world/splat.js` oder die Vertexattribute in `_chunkGeometry` anfasst, eine
Oberflächenmaske einführst — oder eine Kennzahl für lokalen Kontrast im Bild heben sollst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Abgespalten von [`METRICS-AND-GATES.md`](METRICS-AND-GATES.md), das mit zwölf Tipps auf der
Obergrenze aus [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md) steht — geteilt nach Trigger, wie dort
verlangt: dort steht, was eine Zahl **behaupten** darf, hier, was die Terrain-Oberfläche **bewegt**.
Globale Grundlagen: [`../../threejs/MAP-GENERATION.md`](../../threejs/MAP-GENERATION.md). Das
Höhenfeld selbst hat seine eigene Datei, [`WORLD-LANES.md`](WORLD-LANES.md).

- **Miss die Empfindlichkeit einer Kennzahl gegen jeden Regler, bevor du auf sie hin optimierst** —
  `absK` (Streuung der Luma in 8×8-Kacheln) liest sich als „lokaler Kontrast der Welt", und der
  Auftrag lautete, ihn über die Kornamplitude zu heben. Eine Probe über die Live-Uniformen von
  `splat.js`, eine Einstellung nach der anderen, hat die Rangfolge der Hebel umgeworfen: die Zahl ist
  **fast vollständig die Normalenstörung der Mikrolage**. Albedovariation und Roughnessvariation sind
  für sie unsichtbar, und die Makrolage mit 7,5 m Zellgröße ist **größer als eine 8-px-Kachel** und
  trägt deshalb nichts zur Streuung *innerhalb* einer Kachel bei. → Vor der ersten Zeile Code jeden
  vorhandenen Regler einzeln auf null und auf das Doppelte fahren und die Kennzahl mitschreiben; das
  kostet einen Lauf und entscheidet, ob die geplante Arbeit die Zahl überhaupt anfassen kann.
  *Fünf Kameras, kornfrei, Wiederholbarkeit 0,00000: heute 0,0089 · splat ganz aus 0,0034 (−62 %) ·
  Mikrolage aus 0,0035 (−61 %) · Makrolage aus 0,0088 (−1 %) · Albedovariation aus 0,0088 (−1 %) ·
  Roughnessvariation aus 0,0090 (+0 %) · `uBump` 0,04 → 0,08 0,0147 (+65 %) · 2026-08-02*

- **Eine Vertexfarbe ist eine verlustbehaftete Kodierung des Materials** — `_biomeColor` backte Pfad,
  Nässe und Höhe als *Tint* in `geo.color`, und danach sieht der Shader nur noch RGB: eine getretene
  Lane ist von dunklem Boden nicht mehr zu unterscheiden. Der Plan, „Pfad-, Asche- und Nässekanäle in
  `splat.js`" aufzulösen, beschrieb deshalb Kanäle, die es als Kanäle gar nicht gab. → Was ein Pixel
  *ist*, als eigenes Attribut führen (`kzMask` vec3: Pfad, Nässe, Brand), nicht als Farbe, aus der man
  es zurückrechnet. Und: der Kanal muss **Relief** steuern, nicht nur den Ton — siehe Tipp eins, ein
  reiner Farbunterschied bewegt den lokalen Kontrast nicht.
  *`absK` kornfrei 0,0082 → 0,0122 (+49 %) über 14 Kameras, Ziel war 0,0093 ·
  `src/world/index.js:_surfaceMask` · 2026-08-02*

- **Eine Vertexmaske interpoliert linear und wird zur Rampe entlang des Dreiecks** — eine Pfadkante
  aus einem Vertexattribut ist am feinsten LOD 1,1 m breit, am gröbsten 8,75 m, und sie läuft
  schnurgerade entlang der Kante, über die interpoliert wurde. Echter Boden wechselt sein Material
  über Zentimeter, und der Übergang wandert. → Die Maske gegen das vorhandene Rauschfeld schwellen
  statt gegen eine Konstante: `smoothstep(0.5-w, 0.5+w, m + n*0.55)` mit **signiertem** `n`. Das
  kostet keinen zusätzlichen Sample, macht die Kante scharf und den Verlauf auf jeder Skala
  unregelmäßig. Addieren, nicht `mix`en — `mix` zieht jeden Wert zum Rauschen und macht aus „1,0,
  eindeutig Pfad" ein „0,7, vermutlich".
  *`kzSharp` in `src/world/splat.js` · 2026-08-02*

- **Ein Kanal, der zwei Materialien meint, macht ein ganzes Biom zur halben Pfütze** — „Nässe" als
  eine Zahl setzte jede Paddy-Zelle auf 0,45, geflutet oder nicht. Feuchter Lehm und stehendes Wasser
  tun einer Oberfläche aber das Gegenteil an: der eine behält sein Relief und dunkelt nach, das andere
  füllt das Relief und wird spekular. → Als **Sättigungsskala** führen, mit einer benannten
  Materialgrenze in der Mitte (hier 0,5 = ab hier steht Wasser darauf), und im Shader in zwei Terme
  auflösen. **Die Korrektur hat ihre Zielkamera nicht gerettet** und das ist der eigentliche Tipp:
  bevor man für eine Kamera nachregelt, nachsehen, was in ihrem Bild überhaupt steht.
  `terrace-waterline` ist zu 40 % dunkles Band und 56 % hellem Band — Wasser-Sheet und Himmel, 96 %
  des Bildes. Ihr `absK` misst eine Fläche aus zwei Dreiecken, kein Terrain.
  *0,0085 → 0,0083 bei unverändertem Mittel 0,0122 · 2026-08-02*

- **Ein Backtick in einem GLSL-Template-Literal beendet den Shader** — `` `worldpos_vertex` `` in
  einem Kommentar *innerhalb* des Shader-Strings schließt das Template, und der Build meldet
  „Expected a semicolon" auf die Kommentarzeile. Der Fehler liest sich wie ein JavaScript-Syntaxfehler
  und steht in einer Zeile, die nur ein Kommentar ist. → In GLSL-Strings keine Backticks setzen;
  Bezeichner dort ohne Auszeichnung schreiben. Zwei Build-Zyklen in dieser Schicht.
  *`src/world/splat.js:93` und `:248` · 2026-08-02*
