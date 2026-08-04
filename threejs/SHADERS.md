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

## Handoffs

- HDR, Grade und Licht → [Licht und Kamera](LIGHT-CAMERA.md)
- VFX-Lebenskurven → [VFX](VFX.md)
- Pipelinekosten/Warm-up → [Performance](PERFORMANCE.md)
