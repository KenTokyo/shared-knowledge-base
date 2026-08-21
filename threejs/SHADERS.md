# Shader, PBR-Materialien und Renderstabilität — global

**Lesen wenn:** Shaderterm, Material, Transparenz, Farbraum oder Pipelinevariante falsch rendert.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.

## Tipps

- **Detail mathematisch vorhanden, im Bild fehlend** — Riss, Noise oder Muster unter einem Pixel; Mips/TAA erzeugen Wash oder Speckle. → Weltfeature in projizierte Pixel umrechnen; Frequenz und Breite gemeinsam sweepen; Fernwirkung auf gröberen Träger verschieben.
  *claude-flakes: 0,13–0,25-px-Risse überlebten TAA nur zu 54 %, ~3-px-Einschlüsse zu 81 % · claude-of-tsushima: ±150 % Fernalbedo blieb nahezu wirkungslos · 2026-07-29–31*

- **„Noise aus“ löscht ganzen Effekt** — Detailterm trägt zugleich Alpha/Geometrie; Tuningregler wählt nur zwischen Körnung und Unsichtbarkeit. → Detail gegen neutralen Mittelwert blenden, Grate/Fissuren gegen null; analytische Silhouette und Deckung separat führen.
  *voxel-samurai-quiz: `surfaceDetail=0` neutralisiert FBM auf 0,5 und Grate/Fissuren auf 0, Geometrie bleibt · claude-flakes: Coverage-Fenster musste vor Amplitude korrigiert werden, sonst blieb Frost/Kontakt schwach · 2026-07-27–31*

- **Transparente Röhre oder Wasserfläche zeigt Zähne** — Vorder- und Rückwand mischen in Indexreihenfolge oder Winding invertiert. → Zuerst Flat-Color/Winding prüfen; Volumen als Rückwand- und Vorderwandpass mit explizitem Cull/Depth-Vertrag zeichnen; `DoubleSide` nur zur Diagnose.
  *claude-flakes: glatte Röhre mit 176-Spalten-Sägezahn, repariert durch zwei Cull-Pässe · claude-of-tsushima: invertierter Ozeanring sowie nach unten gerichtete Dächer/Zylinder · 2026-07-28–30*

- **Albedo um Größenordnungen zu dunkel** — Farbbytes entstehen linear und werden nochmals sRGB-dekodiert; Datenmaps erhalten umgekehrte Farbraumbehandlung. → Farb- und Datentexturen am Erzeuger typisieren; je genau eine Farbdekodierung und Outputkonvertierung zulassen.
  *claude-of-tsushima: Rinde 0,0059 statt 0,0671, Faktor 11,4 · voxel-samurai-quiz: Shader-/Texturpfade trennen Farb- von Datenrollen und gatten Reserved/NaN statisch · 2026-07-29–08-04*

- **Custom-Material addiert zweite Sonne** — Framework-Licht, CSM und eigener Uniformpfad beleuchten denselben Term; Regler wirken unvorhersagbar. → Legalen Material-/Hookowner definieren; Applied Uniforms zurücklesen; andere Lichtquellen aus Shader entfernen.
  *claude-of-tsushima: ungepatchte Standardmaterialien erhielten alle CSM-Kaskadenlichter und wurden N-fach überbelichtet; ein zusätzlicher Transmissionsterm nahe 1,0 verdoppelte die Sonne · voxel-samurai-quiz: CSM-, Boss- und Weltshader besitzen zentrale Compile-/Materialbrücken statt ad-hoc Lichtkopien · 2026-07-28–08-04*

- **Zusammengesetzte Stage kompiliert nicht, jede Einzeldatei liest sich richtig** — Deklaration und Verwendung stehen in verschiedenen Strings, nur die zusammengesetzte Stage hält beide. Zwei Richtungen, ein Mechanismus: Three.js injiziert aktivierte Standardattribute wie `color` und der Chunk deklariert sie erneut (`redefinition`) — oder niemand deklariert, weil der Verbraucher-Chunk benutzt und der geteilte Header den Uniform nicht führt, der nur einem der Materialien gehört. Ein Wert in `shader.uniforms` erzeugt **keine** Deklaration; `onBeforeCompile` mischt Werte dazu, den Text schreibt der Patch. Beides ist kein Warning — die Stage fällt aus, three zeichnet mit dem Material gar nichts, und der Kontext unterdrückt nach dem ersten Shaderfehler weitere. → Eingebaute Attribute nur über Materialflags aktivieren; je Attribut/Uniform genau einen Deklarationsowner festlegen und ihn dort hinlegen, wo der Verbraucher steht, statt den geteilten Block zu verbreitern; Prüfung gegen die **zusammengesetzte** Stage fahren, nie gegen die Quelldateien — eine Prüfung, die Dateien liest, ist gegen diesen Fehler blind.
  *voxel-samurai-quiz: `vertexColors: true` plus viermal `attribute vec3 color` legte Frostbell-Terrain, Bauten, Windfeld und Glühen still; Grass-Header plus Aerial-/Light-Chunks deklarierten zwei Uniforms doppelt · claude-flakes: `uDeckHalf`/`uDeckCenter` im Fragment benutzt, nirgends deklariert — kein Schnee auf der ganzen Karte, `useProgram: program not valid` ×256, acht grüne Gates · 2026-08-05 / 2026-08-21*

- **Fokusobjekte verschwinden ab mittlerer Entfernung im Horizontton**
  - Unkalibrierte Exponentialkurve interpretiert Host-Nebeldichte erneut; hoher Maximalblendwert löscht Materialkontrast.
  - Distanz zum Weltursprung statt zur Kamera vernebelt nächsten Vordergrund am stärksten; Kamerafahrt ändert nichts.
  - → Aerial Perspective erst hinter Entfernungsschwelle einblenden; Maximalanteil begrenzen; Distanz gegen Kameraposition bilden; Standardkamera-Kontrast numerisch gegenprüfen.
  - *voxel-samurai-quiz: `1-exp(-distance·0,01·1,8)` erreichte bei 178 Units 95,9 % und wurde dauerhaft auf 86 % Horizontfarbe gekappt; Gebäude blieben erst im Nahbereich lesbar · Arena-Gipfel: Radius zum Ursprung plus Höhenterm kappte erst bei 82 %, der Hang direkt vor der Kamera lief auf ~0,78 Grauweiß · 2026-08-05*

- **Vertexshader kompiliert trotz mathematisch korrekter Zeile nicht**
  - Swizzle benennt Komponenten neu: `vec2 d = b.xz - a.xz` trägt x und z, adressierbar als `.x`/`.y`; Namen wie `flat` sind reservierte Qualifizierer.
  - Typechecker/Linter sehen nur Template-Text; Treiber meldet einen Fehler, Kontext unterdrückt danach weitere Shaderfehler. Konsole bleibt unvollständig.
  - → Vektorgröße gegen jeden Swizzle, Bezeichner gegen Reserved-Liste gaten; Selftest mit Negativkontrolle statt Bild als Beleg.
  - *voxel-samurai-quiz: `atan(d.x, d.z)` auf einem `vec2` und `vec3 flat` legten ein Statisten-Rig und den Funkenburst still — bei grünem Typecheck, grünem Guard und grünem Shader-Gate · 2026-08-05*

- **Additive Fernschicht brennt Bild bei Kamerafahrt weiß**
  - Fehlende Kameradistanzsperre plus Motivhöhe schiebt Wolken-, Dunst- oder Staubkarten zwischen Linse und Motiv; Überlagerung summiert sich zu Vollweiß.
  - Schwesterschicht mit korrekter Sperre lenkt Verdacht auf falsches System.
  - → Jede Fernschicht über `length(centre - cameraPosition)` einblenden; Deckunterkante über Augenhöhe legen; Kartenstärke gegen reale Überlappungszahl auslegen; Bounds nach Anheben mitziehen.
  - *voxel-samurai-quiz Arena-Gipfel: 74 Wolkenkarten auf y 66–135, Unterkante y≈10 bei `PLATEAU_Y` 7,1 und `viewHeight` 52, Kameraradius 300, keine Distanzsperre → Kampffläche unsichtbar; das benachbarte Dunstband mit `smoothstep(120, 330)` war unbeteiligt · 2026-08-05*

- **Zwei Materialien zeichnen mit demselben Shader, obwohl beide korrekt gepatcht sind** — three sucht Programme allein über `customProgramCacheKey()`, Default ist `onBeforeCompile.toString()`. Ein geteilter Patch-Helfer gibt jedem Material denselben Wrappertext, der unterscheidende Chunk steckt unsichtbar in der Closure. Bei sonst gleichen Parametern teilen sie **ein** Programm: alle außer dem zuerst kompilierten tragen den fremden Shader — kein Wurf, keine Konsolenzeile, nur stumm falsche Optik. Was zwei solche Materialien heute trennt, ist oft nur Renderstate: `side` und `transparent` gehen als `doubleSided`/`opaque` in denselben Schlüssel ein, haben mit dem Shader aber nichts zu tun, und niemand merkt es beim Umschalten. → Je Materialrolle einen eigenen Tag anhängen (`() => prev() + '|rolle'`), **nach** allen anderen Patches, sonst überschreibt ihn der nächste. Ein fest verdrahteter Schlüssel ist ein Versprechen, dass der injizierte Text nie von den Fabrikargumenten abhängt — das messen, nicht behaupten; hängt er nur über `shader.uniforms.*` ab, ist ein geteiltes Programm richtig.
  *voxel-samurai-quiz: `customProgramCacheKey ×8` als eigener Rekompilierungsposten; grep-Zählung „N Dateien mit Hook, N mit Key" beweist nichts, der Schlüssel gilt je Material · claude-flakes: Schneeebene und Deck erzeugten zeichengleiche 127-Zeichen-Schlüssel, ganze Karte ohne Schnee; Ice und Meteor tun es weiterhin und werden allein durch `side: DoubleSide` + `transparent: true` auseinandergehalten · 2026-07-22 / 2026-08-21*

## Handoffs

- HDR, Grade und Licht → [Licht und Kamera](LIGHT-CAMERA.md)
- VFX-Lebenskurven → [VFX](VFX.md)
- Pipelinekosten/Warm-up → [Performance](PERFORMANCE.md)
