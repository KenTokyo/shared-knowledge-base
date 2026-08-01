# Licht, Kamera, Farbraum und PostFX

- **Status:** optionale „könnte“-Tipps; lokale Looks, Belichtungen, APIs → Vorrang

## Fünf Tipps

- **1 · Referenz/Kamera könnten Daten sein:**
  - Motiv; Tiefenband; FOV; Crop; Sonne; Atmosphäre; Belichtung; Anti-Ziel
  - Solver: Augenhöhe; Sichtlinie; Piece-Fill; Skyline; Wasserfreiheit
  - Terrain-/Bakeänderung → Kamera neu lösen
- **2 · Diagnoseleiter könnte sein:**
  - Rohkanal → Scene-HDR → Einzelpass → Tonemapping/Grade → LDR/PNG
  - Farbtextur: einmal sRGB; Datentextur: linear
  - Outputkonvertierung: einmal; Downsample: linear light
- **3 · Lichtbeiträge könnten getrennt sein:**
  - Himmel; IBL; Sonne; lokale Lichter; Emission
  - Neutralmaterial; Caster-A/B; Receiver-A/B; Bias-A/B
  - PMREM gültig; Materialwerte unverfälscht
- **4 · PostFX könnte drei Kontrollen besitzen:**
  - null; Shipping; übertriebene Rotkontrolle
  - Bloomselektion: HDR-Luminanz/Intensität/Maske vor Tonemapping
  - Clipping: Weiß + einzelne Kanäle; passende Farbachse
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - Naht nur final → Raw/HDR/LDR-Bandprofil
  - Materialänderung ohne Wirkung → Neutrallicht + Applied Value
  - großer Schatten → Caster-Isolation + Schattenlänge
  - Reglerziel unerreichbar → mathematische Hülle
  - Kanalclipping → p95/p99 + Gain-Leiter

## Belegte Tipps

Format und Änderungsrecht: [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md).

- **Auge bewegt, ohne neu zu peilen** — das Motiv wandert pro Hubmeter im Bild nach unten und fällt am Ende
  heraus, obwohl an der Kamera „nichts geändert" wurde. Ursache: die Rotation kommt aus Spielerwinkeln, der
  Pivot liegt nur konstruktionsbedingt auf der Achse. → Jede Augbewegung vorher gegen
  `versatz / (arm · tan(fov/2))` rechnen.
  *Ein Bodenausweich-Hub bis 4,11 m schob die Figur aus 2 von 14 Spielaufnahmen · Herkunft:
  voxel-samurai-quiz · 2026-08-01*

- **Neupeilen als Reparatur** — das Motiv sitzt danach perfekt mittig und das Bild ist trotzdem wertlos.
  Ursache: Neupeilen bezahlt mit dem, was am Rand steht (Horizont, Landmarke, Gegner). → Die Kontrolle
  mitfahren, die das Randbudget misst, **bevor** der Modus Default wird; der Handel ist dann eine
  Entscheidung statt einer Überraschung.
  *Motiv mittig, dafür Gegner über der Bildkante, Sichtbarkeit −76 %, Pitch −51° · Herkunft:
  voxel-samurai-quiz · 2026-08-01*

## Handoffs

- PBR → [Shader/PBR](SHADERS.md)
- Capture → [Debug/Review](DEBUG-REVIEW.md)
- Zahlen, auf die eine Entscheidung folgt → [Messhandwerk](MEASURING.md)
