# Shader, PBR-Materialien und Renderstabilität — global

**Lesen wenn:** Shaderterm, Material, Transparenz, Farbraum oder Pipelinevariante falsch rendert.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

## Tipps

- **Detail existiert mathematisch, aber nicht im Bild** — Riss, Noise oder Muster liegt unter einem Pixel und wird durch Mips/TAA zu Wash oder Speckle. → Weltfeature in projizierte Pixel umrechnen; Frequenz und Breite gemeinsam sweepen; Fernwirkung auf gröberen Träger verschieben.
  *claude-flakes: 0,13–0,25-px-Risse überlebten TAA nur zu 54 %, ~3-px-Einschlüsse zu 81 % · claude-of-tsushima: ±150 % Fernalbedo blieb nahezu wirkungslos · 2026-07-29–31*

- **„Noise aus“ löscht den ganzen Effekt** — Detailterm trägt zugleich Alpha/Geometrie; ein Tuningregler kann nur zwischen Körnung und Unsichtbarkeit wählen. → Detail gegen seinen neutralen Mittelwert blenden, Grate/Fissuren gegen null; analytische Silhouette und Deckung separat führen.
  *voxel-samurai-quiz: `surfaceDetail=0` neutralisiert FBM auf 0,5 und Grate/Fissuren auf 0, Geometrie bleibt · claude-flakes: Coverage-Fenster musste vor Amplitude korrigiert werden, sonst blieb Frost/Kontakt schwach · 2026-07-27–31*

- **Transparente Röhre oder Wasserfläche zeigt Zähne** — Vorder- und Rückwand mischen in Indexreihenfolge oder Winding ist invertiert. → Erst Flat-Color/Winding prüfen; Volumen als Rückwand- und Vorderwandpass mit explizitem Cull/Depth-Vertrag zeichnen, `DoubleSide` nur zur Diagnose.
  *claude-flakes: glatte Röhre mit 176-Spalten-Sägezahn, repariert durch zwei Cull-Pässe · claude-of-tsushima: invertierter Ozeanring sowie nach unten gerichtete Dächer/Zylinder · 2026-07-28–30*

- **Albedo wird um Größenordnungen zu dunkel** — Farbbytes werden als linear erzeugt und danach nochmals sRGB-dekodiert; Datenmaps bekommen umgekehrt Farbraumbehandlung. → Farb- und Datentexturen am Erzeuger typisieren; genau eine Farbdekodierung und genau eine Outputkonvertierung zulassen.
  *claude-of-tsushima: Rinde 0,0059 statt 0,0671, Faktor 11,4 · voxel-samurai-quiz: Shader-/Texturpfade trennen Farb- von Datenrollen und gatten Reserved/NaN statisch · 2026-07-29–08-04*

- **Custom-Material addiert eine zweite Sonne** — Framework-Licht, CSM und eigener Uniformpfad beleuchten denselben Term; Regler wirken unvorhersagbar. → Einen legalen Material-/Hookowner definieren, Applied Uniforms zurücklesen und andere Lichtquellen aus dem Shader entfernen.
  *claude-of-tsushima: ungepatchte Standardmaterialien erhielten alle CSM-Kaskadenlichter und wurden N-fach überbelichtet; ein zusätzlicher Transmissionsterm nahe 1,0 verdoppelte die Sonne · voxel-samurai-quiz: CSM-, Boss- und Weltshader besitzen zentrale Compile-/Materialbrücken statt ad-hoc Lichtkopien · 2026-07-28–08-04*

- **Shader meldet `redefinition`, obwohl jede einzelne Zeile korrekt aussieht** — Three.js injiziert bei `ShaderMaterial` aktivierte Standardattribute wie `color`; zusammengesetzte GLSL-Bausteine können zusätzlich eigene Uniforms mehrfach deklarieren. → Eingebaute Attribute nur über Materialflags aktivieren; je eigenes Attribut/Uniform genau einen Deklarationsowner im final zusammengesetzten Shader festlegen und Verbraucher- sowie Chunk-Header gemeinsam prüfen.
  *voxel-samurai-quiz: `vertexColors: true` plus viermal `attribute vec3 color` legte Frostbell-Terrain, Bauten, Windfeld und Glühen still; Grass-Header plus Aerial-/Light-Chunks deklarierten zwei Uniforms doppelt · 2026-08-05*

- **Fokusobjekte verschwinden schon in mittlerer Entfernung im Horizontton** — Host-Nebeldichte wird durch eine eigene unkalibrierte Exponentialkurve erneut interpretiert; hoher Maximalblendwert löscht Materialkontrast. Zweite Ursache, gleiches Bild: die Kurve misst den Abstand zum **Weltursprung** statt zur Kamera — dann ist ausgerechnet der nächste Vordergrund am stärksten vernebelt, und der Nebel reagiert auf keine Kamerafahrt. → Aerial Perspective erst hinter einer Entfernungsschwelle einblenden, Maximalanteil begrenzen, Distanz immer gegen die Kameraposition bilden und Standardkamera-Kontrast numerisch gegenprüfen.
  *voxel-samurai-quiz: `1-exp(-distance·0,01·1,8)` erreichte bei 178 Units 95,9 % und wurde dauerhaft auf 86 % Horizontfarbe gekappt; Gebäude blieben erst im Nahbereich lesbar · Arena-Gipfel: Radius zum Ursprung plus Höhenterm kappte erst bei 82 %, der Hang direkt vor der Kamera lief auf ~0,78 Grauweiß · 2026-08-05*

- **Vertexshader kompiliert nicht, obwohl die Zeile mathematisch stimmt** — nach einem Swizzle heißen die Komponenten neu (`vec2 d = b.xz - a.xz` trägt x und z, adressiert werden sie als `.x`/`.y`), und unverdächtige Namen wie `flat` sind reservierte Qualifizierer. Für Typechecker und Linter ist beides nur Text in einem Template-Literal; der Treiber meldet es einmal, danach unterdrückt der Kontext **alle weiteren** Shaderfehler — die Konsole ist also keine vollständige Fehlerliste. → Beide Klassen statisch gaten: deklarierte Vektorgröße gegen jeden Swizzle prüfen, Bezeichner gegen die Reserved-Liste; Selftest mit Negativkontrolle ist der Beleg, nicht das Bild.
  *voxel-samurai-quiz: `atan(d.x, d.z)` auf einem `vec2` und `vec3 flat` legten ein Statisten-Rig und den Funkenburst still — bei grünem Typecheck, grünem Guard und grünem Shader-Gate · 2026-08-05*

- **Additive Fernschicht brennt das Bild weiß, sobald die Kamera fährt** — Wolken-, Dunst- oder Staubkarten haben gar keine Sperre gegen die **Kameradistanz** und liegen auf Motivhöhe statt darüber; eine Orbitkamera schiebt sie damit zwischen Linse und Motiv, wo sich Dutzende additive Karten zu Vollweiß summieren. Eine Schwesterschicht mit korrekter Sperre lenkt den Verdacht auf das falsche System. → Jede additive Fernschicht über `length(centre - cameraPosition)` einblenden, Deckunterkante über die Augenhöhe legen, Kartenstärke gegen die reale Überlappungszahl auslegen und Bounds nach dem Anheben mitziehen.
  *voxel-samurai-quiz Arena-Gipfel: 74 Wolkenkarten auf y 66–135, Unterkante y≈10 bei `PLATEAU_Y` 7,1 und `viewHeight` 52, Kameraradius 300, keine Distanzsperre → Kampffläche unsichtbar; das benachbarte Dunstband mit `smoothstep(120, 330)` war unbeteiligt · 2026-08-05*

## Handoffs

- HDR, Grade und Licht → [Licht und Kamera](LIGHT-CAMERA.md)
- VFX-Lebenskurven → [VFX](VFX.md)
- Pipelinekosten/Warm-up → [Performance](PERFORMANCE.md)
