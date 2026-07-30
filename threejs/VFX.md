# Echtzeit-VFX und Effekt-Audio

- **Status:** optionale „könnte“-Tipps; lokale Timings, Budgets, Farben, APIs → Vorrang

## Fünf Tipps

- **1 · Lebenskurve könnte gemeinsam sein:**
  - Cast → Aufbau → Release → Kontakt → Peak → Aktiv → Nachleben → Dissipation
  - Consumer: Pose; Emission; Licht; Kamera; Schaden; Terrain; Audio
  - Eventzähler statt Endzustand oder Dateiname
- **2 · Hauptform könnte vor Glow kommen:**
  - Bloom/Partikel null → Silhouette bleibt
  - Weltpfad: distanz-/subframebasiert; geschichtete 3D-Ribbons
  - Weltmaß: Breite; Pitch; Radius; Erosion; Fade
  - Prüfung: Wireframe; Flat Color; Shaderterm; Kamera außerhalb Bounds
- **3 · Energie könnte sichtbar budgetiert werden:**
  - `rgb × alpha × Überlagerung × Bildschirmfläche`
  - Falloff in finaler Alpha-Silhouette
  - A: FX+Bloom; B: FX ohne Bloom; C: ohne FX
  - Erasure-Maske statt Overlap/Kontrastproxy
- **4 · Pool/Partikel könnte Runtime prüfen:**
  - Deckung: Emission × Leben × Alpha-Fläche × Erosion × Opazität
  - Spriteachse/-aspekt; Stretchsignum; Alter; Projektion; Hintergrund; Bloom
  - Clear: CPU + GPU-Slots + Cursor + Debts + Sekundärobjekte
  - finite Alter/Uploads; getrennte RNG-Streams
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - Effekt fehlt → Eventcount + Pool + GPU-Konsole + Pixel
  - weiß/flächig → Layer-Solo + Alpha-/Heat-Term
  - Kartenlook → finale Sprite-Tinte + FWHM
  - Altlast im nächsten Shot → zwei Vorgeschichten + gleicher Reset
  - Detailverlust → Erasure + Overdraw im Worst-Case-Crop

## Handoffs

- Renderarithmetik → [Shader/PBR](SHADERS.md)
- Uhren/Audio-Runtime → [Runtime-Integration](RUNTIME-INTEGRATION.md)
- Capture → [Debug/Review](DEBUG-REVIEW.md)
