# Render, PostFX und Effektlesbarkeit — quiz-arena-space

**Lesen wenn:** du in `src/render/`, `src/fx/VFX.ts`, `src/fx/Particles.ts` an Shadern, Bloom, Licht oder Partikeln arbeitest — oder beurteilen sollst, ob ein Effekt sichtbar ist.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Global dazu: [`../../threejs/SHADERS.md`](../../threejs/SHADERS.md) und
[`../../threejs/LIGHT-CAMERA.md`](../../threejs/LIGHT-CAMERA.md).

- **Jeder Effekt kompiliert bei Erstnutzung mitten im Kampf Shader nach** — `numPointLights` steht im
  Programm-Cache-Key von three, und es gibt kein Cull für `intensity === 0`. Ein Lichtpool, der `visible`
  pro Effekt schaltet, lässt jede neue *sichtbare Lichtzahl* jedes belichtete Material neu bauen. → Die
  Lichtzahl **pinnen**: alle Slots dauerhaft sichtbar halten und nur `intensity` auf 0 fahren.
  *Ungepinnt `prog=135` mit 11 Kaltpfaden, gepinnt `prog=35` und kein einziger Kaltpfad — 135 − 35 = 100
  exakt. Bildlich inert: 0 von 891.120 Pixeln geändert. `src/fx/VFX.ts:979-1011` · 2026-07-30*

- **Partikel leben, kosten Draw-Calls und ändern null Pixel** — der Bench meldete einen vollen Pool, das
  Bild blieb bit-identisch: die Billboard-Basis landete in vertauschten Matrix-Spalten
  (`n = dir × toCam` ist die Breitenachse, stand in der Normalen-Spalte), jedes Quad stand hochkant zur
  Kamera. → Bei „gezeichnet und trotzdem unsichtbar" die **Instanz-Matrizen** aus `mesh.instanceMatrix.array`
  projizieren, nicht aus `pos`/`vel` herleiten.
  *176/176 Quads mit Bildschirmfläche 0, Skalarprodukt Breitenachse·Sehstrahl −0,980; Zurücktauschen
  0 → 2745 Pixel bei byte-gleichen Pool-Zahlen. Vorher „die Trails überleben alle" über eine Schicht von
  3 px · 2026-07-31*

- **Ein Verdikt sagt *ob*, nie *welche*** — der Kontrollframe blendet die ganze Effektschicht auf einmal
  aus und benennt deshalb keinen Täter; zwei Schichten dämpften daraufhin den falschen Effekt. → Das
  **zuordnende** Instrument (Gruppen einzeln ausblenden) bauen, *bevor* der erste Fix versucht wird, nicht
  nachdem er versagt hat.
  *Impacts um 45 % und dann um 99 % gedämpft = 3 Pixel Unterschied von ~1600; die Gruppenauflösung
  entschied es in einem Lauf — schuldig war der Kill-Explosionsblitz zwei Funktionen weiter. Danach
  weiß geblasene Pixel 1236 → 358 · 2026-07-29*

- **Ein Term, der bei jedem Merge kompoundiert, hat keinen Ruhezustand** — der Scar-Term multiplizierte
  sich pro Merge, setzte dabei `age` zurück (Füllstand bleibt 0 = permanent heiß) und addierte Emissive pro
  Marke ohne Obergrenze; der vermeintliche Sicherheits-Clamp war in Wahrheit der Ruhewert. → Emissive
  **einmal** sättigen (Reinhard) statt pro Marke zu addieren, und Wachstum asymptotisch gegen eine absolute
  Decke führen.
  *Ein Schalter senkte den Bildmittelwert 0,3147 → 0,0383 — 88 % des Frames stammten aus diesem einen Term,
  alle fünf anderen Deck-Terme lagen im Rauschen. Zwei Vorschichten suchten im falschen System · 2026-07-30*

- **Ein Größenfaktor im Punkt-Shader macht aus 4400 Sternen eine Nebelbank** — was zwei Phasen lang als
  Bloom-Blowout gejagt wurde, war ein Faktor `*40.0` in `gl_PointSize`, der einzelne Sterne 63–157 px breit
  machte. Die korrekte Formel stand längst im selben Repo. → Vor dem Drehen an PostFX prüfen, ob eine
  **Geometriegröße** die Fläche erzeugt; `gl_PointSize` clampen.
  *`p50` 0,62 → 0,138, `p95` 0,995 → 0,703; mit ausgeschaltetem Bloom fiel `p50` auf 0,114 und isolierte
  damit den Rohanteil · 2026-07-28*

- **Ein Pixel-Gate misst PostFX mit, das nach dem geprüften Pass läuft** — 25,7 % der „geschützten" Pixel
  schienen vom Verzerrungs-Pass bewegt; Bloom trägt Nachbaränderungen auf unberührte Pixel. → Jedes
  Pixel-Gate **nur mit ausgeschaltetem Bloom** lesen, auf allen Armen.
  *25,7 % mit Bloom gegen 0,311 % ohne — Faktor 82; die Restverletzungen waren 162 Läufe mit mittlerer
  Lauflänge 1,3 px · 2026-07-31*

- **Drei „bestätigende" Läufe zeigten auf die falsche Stellschraube** — Läufe 1–3 wiesen konsistent auf die
  Bloom-Stärke; der Gegenlauf mit exakt den **alten** Bloom-Werten zeigte denselben Blow-out, also war
  Bloom nie die Ursache. → Vor dem Fix einen Lauf mit den alten Werten der Verdächtigen fahren; drei
  konsistente Läufe sind kein Kausalbeleg, ein Gegenlauf ist einer.
  *Rekonstruierte alte Bloom-Werte lieferten unverändert `BLOWN:t28(+6%)`; die beiden Stärken waren auf
  beiden Metriken ununterscheidbar. Ursache war ein Damper-Wert zwei Systeme weiter · 2026-07-29*

- **Ein schwarzer Verdecker ist im Differenzbild unsichtbar** — drei Phasen drehten an Licht, Becken und
  Shader-Rändern; es war die Deckelkappe eines Kragens (`openEnded: false` → massive Scheibe), die die
  additive, tiefengetestete Säule mitten im Schaft beschnitt. Ein „Effekt aus"-Bild kann den Verdecker nie
  entlasten, weil eine schwarze Kappe gegen ein unbeleuchtetes Inneres nichts ändert. → Verdächtige
  Verdecker mit `depthTest: false` oder einem opaken Debug-Pass prüfen, nicht per Differenzbild.
  *Säulen-Rechteck `p50` 0,461 → 0,349 bei unverändertem Ganzbild · 2026-07-28*

- **Flächiger Wash auf jeder waagerechten Platte — Intensität ist der falsche Hebel** — als
  Specular-Blowout diagnostiziert, war aber `blown=0.00 %` und eine Entsättigung: Rim-Elevation 19,6° gegen
  Kamera-Elevation 25° bei entgegengesetztem Azimut lässt den Halbvektor senkrecht nach oben zeigen, womit
  **jede** flache Platte gleichzeitig auf dem Specular-Peak liegt. → Die **Lichthöhe** ändern, nicht die
  Intensität, plus objektlokale Roughness.
  *Bei gesenkter Intensität bleibt das Deck magenta-dominant (sat 0,60); Höhe 52° → 18° bringt Deck
  `p50` 0,420 → 0,235 und `sat` 0,44 → 0,72, bei zahlengleicher Kampfszene · 2026-07-28*

- **Ein Effekt bedeckte 43 % des Bildes und war trotzdem unsichtbar** — „geänderte Fläche" wurde als
  Sichtbarkeit gelesen; der Rauch lag auf derselben Luminanz wie der Boden, 92 % seiner Pixel im
  ±0,04-Band. → Für „sieht man das" **Kontrastfläche** messen (Körper ab |Δ| ≥ 0,10, Kern ab 0,20), nie
  `changed %`.
  *Körper 0,392 % → 5,794 % (14,8×), Kern 0,005 % → 2,402 % (480×); die publizierte Aussage „im einen
  Sektor sichtbar, im anderen fast nichts" war dabei rückwärts · 2026-07-31*

- **Der Warm-up-Detektor schwieg neun Schichten lang über eine lebende Verletzung** — die
  Allokationsmeldung ritt innerhalb einer zu engen Bedingung; unter dem Licht-Pin brachte der Effekt weder
  Programm noch Textur, also wurde die Mesh-Allokation komplett verschwiegen. → Die Bedingung eines
  Detektors gegen **jeden** Weg prüfen, auf dem sein Ereignis eintreten kann, und ihn als eigenen
  Giftfall vier Läufe fahren (schweigt falsch → feuert → feuert zu Recht → schweigt echt).
  *Ursache war eine faul wachsende Free-Liste; nach dem Fix `draws=302`, `prog=35`, `tris=69991` identisch,
  also null Draw-Kosten · 2026-07-30*

- **Vergrößerte Crops erzeugen Defekte, die es nicht gibt** — im ×2-Crop schien ein Bauteil ~10 px
  gewandert, im ×3-Crop wirkte der Rumpf zerrissen; Vergrößerung überzeichnet Ein-Pixel-Kanten und das Auge
  liest daraus Struktur. → Nur bei 1:1 urteilen, ×N ausschließlich zum **Auffinden**, jede behauptete
  Verschiebung per Schwerpunkt oder Block-Matching nachmessen.
  *Behauptete ~10 px gegen gemessene 1,3 px = Faktor 8; vierter dokumentierter Fehlalarm derselben Art auf
  derselben Zeile · 2026-07-31*
