# Terrain-Oberfläche und lokaler Kontrast — duty-of-tsushima

**Lesen wenn:** du Terrain-Normalen in `src/world/Terrain.js`, `src/world/splat.js` oder die
Vertexattribute in `_chunkGeometry` anfasst, eine Oberflächenmaske einführst — oder eine Kennzahl
für lokalen Kontrast im Bild heben sollst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.

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
  Bezeichner dort ohne Auszeichnung schreiben. Gilt für **jede** Datei mit `/* glsl */`-Literalen, nicht
  nur `splat.js`, und trifft am härtesten den langen Belegkommentar: je mehr Messwerte und
  Uniformnamen darin stehen, desto sicherer rutscht ein Backtick hinein. Gleiche Klasse, gleiche
  Zeile: eine GLSL-Variable `float step` verdeckt die eingebaute `step()`.
  *`src/world/splat.js:93` und `:248` · 2026-08-02 · Wiederholung in `src/render/PostFX.js:368`,
  „Expected ',', got 'ident'" auf einer Kommentarzeile · 2026-08-08*

- **„Bergschlieren überleben Schattenbias-Tuning, also liegt es an der Terrain-Oberfläche"** — galt
  bis 2026-08-08, **widerlegt**: das Artefakt lag nie im Terrain-Shader. Drei Phasen ablatierten
  Schatten, Detailnormalen, Albedo, gebackene Normalen und Occlusion — und schlossen aus dem
  Ausschluss auf die verbliebene Terrain-Größe, statt weiter nach außen zu suchen. Der Verursacher
  war das Screen-Space-AO der Post-Kette. Ursache des Denkfehlers: jede Metrik bis dahin fragte
  *steht senkrechte Struktur auf der Wand* — ein Kraterrand antwortet ehrlich ja. Die Beschwerde war
  nie Struktur, sondern dass Struktur **mit der Position wandert**. → Positionsabhängigkeit direkt
  messen: zwei Frames aus **einem** Auge bei zwei Blickrichtungen, den zweiten per exakter
  Rotations-Homographie zurückresampeln, subtrahieren. Die Sehstrahlen sind in beiden identisch,
  also kürzen sich alle weltraumfesten Shading-Terme exakt weg und nur der Screen-Space-Fehler
  bleibt stehen. Erst danach ablatieren — die Rangfolge dreht sich.
  *`rotate` in `tools/terrain/streaks.mjs` · `rim-west` dCol 0,01783 gegen A/A-Boden 0,00111 = 16,1x,
  `no-ao` bricht auf 0,00249 · `no-shadow` −0,7 %, `no-detail-normal` 2,0 %, `no-fine-tile` 2,3 %,
  `flat-rock-grade` 1,6 %, alle im Rauschen · 2026-08-08*

- **Ein Screen-Space-Effekt braucht seine Abschaltschwelle in Screen-Einheiten, nicht in Metern** —
  das SSAO blendete über `smoothstep(120, 300, depth)` aus, während sein Sample-Spiral
  `uRadius / depth * 90` Halb-Res-Texel misst und ab ~76 m unter einen Texel fällt. Zwischen 76 und
  300 m lagen alle zwölf Taps im selben Bilinear-Patch: `max(0, ndv - uBias)` gleichrichtet dort
  Tiefenquantisierungsrauschen zu einseitiger Verdunklung, die am Bildschirm klebt und auf einer
  streifend gesehenen Wand entlang der Spalten variiert — die senkrechte Schliere. → Die Schwelle in
  der Größe schreiben, die den Ausfall erklärt (hier Kernel-Fußabdruck in Texeln), und eine
  Konstante für Sample-Offset **und** Schwelle nutzen. Dann folgt der Schnitt einer Auflösungs-,
  Linsen- oder Radiusänderung von allein, statt hinter jeder einzeln nachgezogen zu werden. Der
  Verdacht „Dosis zu hoch" ist hier die falsche Fährte: 4x Radius und 0,25 Bias machen es schlimmer,
  nicht besser — beides vergrößert den Fehler, den die Dosis gar nicht besitzt.
  *`uAOFade` (0,85 / 1,9) Texel statt (120 / 300) m in `src/render/PostFX.js` · dCol 0,01783 → 0,00284,
  colRms 0,0157 → 0,0087 · Nahfeld unberührt, unter 40,3 m liefert das `smoothstep` exakt 1,0 · 2026-08-08*
