# Three.js und Echtzeit-3D

- **Status:** optionale, stackneutrale „könnte“-Tipps; lokaler Owner → Vorrang

## Kern

- **Früher Gesamtframe könnte:** Motiv, Maßstab, Tiefe, Kontakt, Bewegung, Licht
- **Diagnosewechsel könnte:** Daten → Geometrie → Material → Licht → PostFX → Kamera → Instrument
- **Gemeinsame Wahrheit könnte:** Render, Kollision, Navigation, Effekte
- **Produktbeleg könnte:** echtes Artefakt statt Build oder Datei
- **Ownerwahl könnte:** nur engster Owner für konkrete Lücke; lokaler Auftrag → Vorrang
- **Tipp könnte Diagnose bleiben:** keine kumulative Zweit-Checkliste, kein fremdes Zahlenrezept ohne gleichen Stack und Maßstab

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
- Sweep, Ranking, Referenzvergleich, „ist das besser?" → [Messhandwerk](threejs/MEASURING.md)

## Projektebene

Was **nur in einem Repository** Zeit gekostet hat, steht in dessen eigenem Ordner unter
[`projects/<repo-name>/`](projects/) — dort auch die Trigger-Tabelle des Projekts. Wie Tipps geschrieben,
geändert, gestürzt und nach oben promotet werden: [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md).

## Quellenprofil

- **Claude of Tsushima:** Weltkomposition; Weltfelder; gelöste Kameras; interne Captures
- **Claude Flakes:** Fußspuren; Wake; gemeinsame Runtime-Deformation; lebendige Welt
- **Claude Desert:** VFX-Isolation; Shader-/PBR-Gegenproben; Runtime-Readbacks
- **Voxel Samurai Quiz:** AEON-Weltengine; Messkette gegen Referenzbilder; Third-Person-Rig
- **Gemeinsam:** Form → Kontakt → Lesbarkeit → Material → Licht → Detail
