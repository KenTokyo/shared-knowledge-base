# Schattenpass, Culling und was sie wirklich kosten — claude-tower-defense

**Lesen wenn:** du eine Schicht cullen, ein LOD bauen, `castShadow` umlegen oder die Schatten-Cascade
verkleinern willst — oder wenn du eine Dreieckszahl aus einem Log zitieren willst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Schattenkosten pro Schicht gemessen statt pro Sorte** — „die Props kosten 2 ms" ist wahr und führt zu
  nichts: der Posten zerfällt in Sorten mit völlig verschiedenen Hebeln. Erst die Aufschlüsselung zeigte,
  dass **eine** Sorte 55 % des Postens trägt und eine zweite 33 % aus nur **130** Instanzen. → Den Schattenpass
  **Sorte für Sorte** zählen, bevor irgendein Kandidat gebaut wird; die Sonde braucht keine Uhr, nur
  `renderer.info` um einen handgezeichneten Frame.
  *809 944 Dreiecke im Pass, davon eine Schicht 93.4 % — Ziffer für Ziffer die Zahl, die eine frühere Phase
  auf einem völlig anderen Weg gefunden hatte · 2026-08-01*

- **`frustumCulled = false` macht jede Cascade-Verkleinerung wirkungslos** — die Schattenbox von ±78 m auf
  ±50 m zu ziehen entfernte **−0 Dreiecke / −0 Calls**. Ursache: `WebGLShadowMap.renderObject` prüft
  `!frustumCulled || intersectsObject`; ist der linke Operand wahr, wird der rechte **nie ausgewertet**, und
  keine Boxgröße erreicht das Objekt. → Vor jeder Cascade-Arbeit `frustumCulled` der beteiligten Meshes lesen,
  und die Gegenprobe mit einer **absurd kleinen** Box fahren: entfernt auch die nichts, ist der Schalter tot.
  *Gegenprobe `--box 10` entfernte −105 / −1 — genau das einzige Mesh mit `frustumCulled` an · 2026-08-01*

- **Instanziierte Schicht wird zweimal gezeichnet und nur einmal gecullt** — die Dreiecksdifferenz beim
  Abschalten war **exakt 2 ×** die Zahl aus der Schichtentabelle, die Call-Differenz exakt 2 × die Meshzahl.
  Der Faktor zwei ist der Schattenpass, dessen Frustum dem **Licht** gehört und sich nicht mit der Kamera
  dreht. → Kamera-Culling erreicht **höchstens die Beauty-Hälfte**; die Kostenseite einer Partition skaliert
  mit der Kachelzahl K, die Gewinnseite nur mit dem Beauty-Anteil.
  *Kandidat cullte 12.8 … 25.0 % und bezahlte +50 … 63 Draw-Calls an jedem Azimut ⇒ nicht gebaut · 2026-08-01*

- **Die halben Dreiecke kosten ein Viertel des Preises** — „halbe Geometrie, halbe Millisekunden" ist
  widerlegt: die ganze Schicht kostete −1.65 … −2.20 ms, davon der Schattenpass nur −0.25 … −0.65 ms.
  → **Unerreichbar ist die billige Hälfte.** Wer nach Millisekunden greift, greift nach dem Beauty-Pass; wer
  Dreiecke zählt, zählt beide und überschätzt den Gewinn um den Faktor zwei.
  *zehn Klammern über drei Boots; Kontrolle: Pixel ×4 → Frame ×1.97, die Schicht ×1.08, also nicht
  fill-gebunden · 2026-08-01*

- **LOD verkauft nur die sichtbare Hälfte und lässt die andere im Bild stehen** — ein Distanz-Cull entfernte
  558 168 Dreiecke, aber **über beide Pässe**; verkäuflich war die Beauty-Hälfte = 10.7 % des Frames. Die
  andere Hälfte verschwindet nicht, sie bleibt als **Schatten ohne Baum** stehen, weil das Schattenfrustum
  dem Licht gehört. → Das ist **aus den deterministischen Spalten ablesbar**, bevor ein Bild entsteht:
  `beauty tris` fällt, `shadow tris` nicht.
  *40/60/80 m geklammert; der einzige Weg, der die großen Posten wirklich erreicht, ist weniger Geometrie
  **je Instanz** · 2026-08-01*

- **„Kein sichtbarer Schatten" ist eine Bildfrage, keine Rechenfrage** — die Vermutung, eine Sorte werfe
  Schatten, die niemand sieht, ließ sich in einer Stunde erledigen: Schicht aus der Schattenkarte nehmen,
  38 Posen photographieren, gegen den Auslieferungsstand diffen. Ergebnis 38/38 bzw. 33/38 abweichend.
  → **Zuerst die Nullkontrolle** — zwei frische Boots desselben Standes gegeneinander. Ohne ihre 38/38
  bit-identisch ist keiner der anderen Diffs etwas wert.
  *und genau diese Nullkontrolle war die einzige der vier, deren Log später fehlte · 2026-08-01*

- **Eine Kostennotiz im Quelltext altert schlechter als der Code** — der Kommentar an einer Geometrie nannte
  „268k of a 2.69M frame" und „draw calls are the metric"; gemessen waren es 532 480 über beide Pässe = 20.5 %
  des Frames, und die Call-Metrik war zwei Befunde vorher überholt. → Kostenkommentare beim Messen mitlesen
  und **entweder korrigieren oder datieren**; die Konstante daneben kann trotzdem richtig sein und einen
  eigenen, älteren Beleg haben.
  *korrigiert: 130 statt 131 Instanzen, 532 480 statt 268k, 20.5 % statt „draw calls are the metric" — die
  Konstante daneben blieb unangetastet, sie ruht auf einer eigenen, gemessenen Akte · 2026-08-01*

- **Eine Dreieckszahl kann eine ganze Klasse von Verschwendung nicht sehen** — die Reihe hatte fünf
  Instrumente für den Schattenpass und alle fünf zählten **Dreiecke**; `renderer.info.render` hat gar keinen
  Vertex-Zähler. Eine Geometrie, die drei frische Vertices **je Dreieck** schreibt, liefert das 6-fache an
  Vertexarbeit aus und **bewegt dabei keine einzige Zahl in irgendeinem dieser Logs**. Gefunden wurden 6 144
  ausgelieferte Vertices für 1 026 unterscheidbare — 83 % der Vertexarbeit dieses Meshes war Kopie, und weil
  der Indexpuffer dann `0,1,2,3,…` liest, kann der Post-Transform-Cache **nie** treffen. → Wenn „weniger
  Geometrie je Instanz" die Frage ist, **die Puffer lesen statt die Frames zählen**: ausgeliefert gegen
  unterscheidbar, je Geometrie. Braucht keine Uhr und keinen gezeichneten Frame.
  *104 von 110 statischen Geometrien waren schon geweldet — die eine, die es nicht war, trug 99.99 % des
  Befundes; Bildbeleg danach 38/38 bit-identisch · 2026-08-01*

- **Alle Instrumente zählten die EINGEREICHTE Seite; keins fragte, was ankommt** — fünf Sonden für den
  Schattenpass, und sie zählen Dreiecke, Vertices, Schichten und Pixel im fertigen Bild. **Keine fragte, wie
  fein die Schattenkarte an dieser Stelle überhaupt noch aufzeichnet.** Die Zahl ist billig: Sonnenbox geteilt
  durch Kartenauflösung = **ein Texel**, hier 156 m / 2048 = **7.62 cm**. Dagegen gehören **zwei** Maße je
  Sorte, und **eines allein zeigt in die falsche Richtung**: die Seite des flächengleichen Quadrats
  (**Deckung**) und die mediane kleinste Höhe `2·Fläche / längste Kante` (**Auflösung**). → Vor jedem
  „weniger Geometrie"-Vorschlag den Quotienten Merkmal/Texel je Sorte ausrechnen. Er braucht keine Uhr und
  keinen gezeichneten Frame, nur die gebauten Puffer und die Lichtmatrizen — und er entscheidet die Frage,
  bevor ein Kandidat gebaut wird.
  *die Flächenspalte allein las „Blätter sind Splitter"; erst die Dickenspalte drehte das Urteil um ·
  2026-08-01*

- **Weniger Dreiecke können den Schatten SCHLECHTER machen, und man sieht es an einer Zahl vorher** — die
  größte Sorte des Passes (55.1 %) galt drei Phasen lang als „der einzig verbliebene Hebel: weniger Dreiecke
  je Cluster". Gemessen liegt ihr Blatt bei **1.103x Deckung und 1.281x Dicke** — **auf beiden Achsen über**
  der Abtastrate. Es wird also bereits aufgezeichnet; gröber machen heißt **unter** den Raster fallen, und
  genau das hatte eine frühere Bildreihe schon fotografiert (33 von 38 Posen abweichend, bis 27.71 % Pixel),
  ohne dass jemand den Zusammenhang benennen konnte. Der einzige echte Kopfraum lag bei der **kleineren**
  Sorte: 0.382x / 0.387x und **6.7 Dreiecke je Texel** — und der war durch eine ältere, ebenfalls gemessene
  Akte verstellt (die Unterteilung ist dort eine **Abtastrate** für die Verdrängung, keine Qualitätsstufe).
  → **Unter 1.0x liegt Kopfraum, über 1.0x liegt das Motiv.** Wer eine Sorte über der Abtastrate vereinfacht,
  kauft keinen Gewinn, sondern verkauft Bild. Und: ein vorhandener Kopfraum ist noch kein verfügbarer —
  **erst nachsehen, welche ältere Messung auf derselben Konstante sitzt.**
  *die Annahme hatte eine ganze Übergabe getragen und fiel an zwei Spalten · 2026-08-01*

- **Ein verlustfreier Weld ist an drei Bedingungen gebunden, und die gehören benannt** — Position, Normale
  und UV müssen Funktionen **allein des Vertex-Index** sein. Bei geglätteten Normalen und einer UV, die aus
  der Position gerechnet wird, sind die Kopien bit-gleich und das Verschmelzen kostet nichts. Bei
  **flach schattierter** Geometrie trägt jede Ecke ihre eigene Face-Normale — dort sind die Kopien nötig, und
  ein Weld würde das Bild ändern. → Vor dem Verschmelzen die drei Attribute einzeln durchgehen; und die
  Behauptung „verlustfrei" mit einem **Bild** belegen, nicht mit dem Argument.
  *derselbe Mesher emittiert an anderer Stelle weiter vier frische Vertices je Face und hat recht damit ·
  2026-08-01*
