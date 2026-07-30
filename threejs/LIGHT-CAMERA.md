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

## Handoffs

- PBR → [Shader/PBR](SHADERS.md)
- Capture → [Debug/Review](DEBUG-REVIEW.md)
