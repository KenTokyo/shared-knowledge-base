# Three.js und Echtzeit-3D

- **Status:** optionale, stackneutrale „könnte“-Tipps; lokaler Owner → Vorrang

## Kern

- **Früher Gesamtframe könnte:** Motiv, Maßstab, Tiefe, Kontakt, Bewegung, Licht
- **Diagnosewechsel könnte:** Daten → Geometrie → Material → Licht → PostFX → Kamera → Instrument
- **Gemeinsame Wahrheit könnte:** Render, Kollision, Navigation, Effekte
- **Produktbeleg könnte:** echtes Artefakt statt Build oder Datei

## Fachowner

- Terrain, Modifier, Bakes → [Map-Generierung](threejs/MAP-GENERATION.md)
- Gras, Bäume, Scatter, Life → [Vegetation](threejs/VEGETATION.md)
- Meer, Fluss, Teich, Ufer → [Wasser](threejs/WATER.md)
- Bauten, Footprints, Occupancy → [Bauten](threejs/BUILDINGS.md)
- Spuren, Wake, Deformation → [Weltinteraktion](threejs/WORLD-INTERACTION.md)
- Pose, Clips, Rigging, Cloth → [Animation und Charakter](threejs/ANIMATION-CHARACTER.md)
- Kamera, Licht, Schatten, PostFX → [Licht und Kamera](threejs/LIGHT-CAMERA.md)
- Partikel, Trails, Effekt-Audio → [VFX](threejs/VFX.md)
- Reihenfolge, Uhren, Audio-Runtime → [Runtime-Integration](threejs/RUNTIME-INTEGRATION.md)
- Shader, PBR, Renderpässe → [Shader und PBR](threejs/SHADERS.md)
- Chunks, LOD, Frametime → [Performance](threejs/PERFORMANCE.md)
- Capture, A/A, A/B, Review → [Debug und Review](threejs/DEBUG-REVIEW.md)

## Quellenprofil

- **Claude of Tsushima:** Weltkomposition; Weltfelder; gelöste Kameras; interne Captures
- **Claude Flakes:** Fußspuren; Wake; gemeinsame Runtime-Deformation; lebendige Welt
- **Claude Desert:** VFX-Isolation; Shader-/PBR-Gegenproben; Runtime-Readbacks
- **Gemeinsam:** Form → Kontakt → Lesbarkeit → Material → Licht → Detail
