# Three.js und Echtzeit-3D — Router

**Status:** Fachdateien enthalten freiwillige, stackneutrale Tipps; lokaler Owner und gemessen bessere Lösung haben Vorrang.

## Lesepfad

Nur den engsten Fachowner lesen:

- Terrain, Modifier, Bakes → [Map-Generierung](threejs/MAP-GENERATION.md)
- Gras, Bäume, Scatter, Life → [Vegetation](threejs/VEGETATION.md)
- Meer, Fluss, Teich, Ufer → [Wasser](threejs/WATER.md)
- Bauten, Footprints, Occupancy → [Bauten](threejs/BUILDINGS.md)
- Spuren, Wake, Deformation → [Weltinteraktion](threejs/WORLD-INTERACTION.md)
- Pose, Clips, Rigging, Cloth → [Animation und Charakter](threejs/ANIMATION-CHARACTER.md)
- Kamera, Licht, Schatten, PostFX → [Licht und Kamera](threejs/LIGHT-CAMERA.md)
- Partikel, Trails, Effekt-Audio → [VFX](threejs/VFX.md)
- Reihenfolge, Uhren, Reset → [Runtime-Integration](threejs/RUNTIME-INTEGRATION.md)
- Shader, PBR, Renderpässe → [Shader und PBR](threejs/SHADERS.md)
- Chunks, LOD, Frametime → [Performance](threejs/PERFORMANCE.md)
- Capture, A/A, A/B, Probe → [Debug und Review](threejs/DEBUG-REVIEW.md)
- Sweep, Ranking, Referenzvergleich → [Messhandwerk](threejs/MEASURING.md)

Für vollständige Weltarbeit routet der kompakte [Worldbuilding-Router](THREEJS-WORLDBUILDING-RULES.md). Agentische Sichtprüfung wird ausschließlich durch [`CODING-RULES.md`](CODING-RULES.md) §8–9 freigegeben und gedeckelt.

## Projektebene

Projektfallen stehen unter [`projects/<repo-name>/`](projects/). Ein Tipp lebt genau einmal; Promotion ist Umzug, keine Kopie. Format, Belegstandard und Änderungsrecht: [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md).

## Quellenprofil

- **Claude of Tsushima · Three.js:** Weltverträge, Environment, Kamera/Kontakt, Kampf-VFX, Renderkosten und Messfallen.
- **Voxel Samurai Quiz · Three.js/R3F:** Charakterlayer, VFX-Pools/Forge, Licht-/Shader-Lifecycle, AEON-Welt und Performanceinstrumente.
- **Claude Flakes · Babylon.js/WebGPU:** nur stackneutrale Mechanismen aus Animation, VFX, Deformation, Reset und Kosten; keine WGSL-/Babylon-API als Three.js-Rezept.
- **Avatar Casting Abilities · Three.js:** ergänzende Codegegenprobe für Layering, Trails, Partikel und Pools; keine History, daher allein kein Kosten- oder Qualitätsbeleg.
- **Claude Desert · Three.js:** VFX-Isolation, Shader-/PBR-Gegenproben und Runtime-Readbacks.

Neue globale Tipps brauchen Belege aus mindestens zwei Repositories. Lokale APIs, Konstanten, Ports und Messlatten bleiben im Projektordner.
