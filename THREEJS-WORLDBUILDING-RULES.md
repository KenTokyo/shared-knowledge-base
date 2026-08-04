# Three.js-Worldbuilding — Router

**Zweck:** Für Weltarbeit nur die betroffenen globalen Tipps laden; lokale Weltarchitektur bleibt maßgeblich.
**Status:** Router, keine zweite Regelsammlung. Allgemeiner Owner: [`THREEJS-RULES.md`](THREEJS-RULES.md).

Agentische Sichtprüfung ist kein Standardgate. Freigabe, Reihenfolge und Gesamtbudget stehen ausschließlich in [`CODING-RULES.md`](CODING-RULES.md) §8–9.

## Lesepfad

| Aufgabe | Lesen |
| --- | --- |
| Neue Welt, Terrain, Biome, Wege | [`threejs/MAP-GENERATION.md`](threejs/MAP-GENERATION.md) + [`threejs/PERFORMANCE.md`](threejs/PERFORMANCE.md) |
| Gras, Bäume, Blumen, Ambient Life | [`threejs/VEGETATION.md`](threejs/VEGETATION.md) + [`threejs/PERFORMANCE.md`](threejs/PERFORMANCE.md) |
| Fluss, Meer, Teich, Wasserfall | [`threejs/WATER.md`](threejs/WATER.md) |
| Häuser, Schreine, Ruinen, Brücken | [`threejs/BUILDINGS.md`](threejs/BUILDINGS.md) |
| Licht, Kamera, Referenz, PostFX | [`threejs/LIGHT-CAMERA.md`](threejs/LIGHT-CAMERA.md) |
| Partikel, Trails, Umwelt- oder Audio-VFX | [`threejs/VFX.md`](threejs/VFX.md) + [`threejs/PERFORMANCE.md`](threejs/PERFORMANCE.md) |
| Spuren, Wake, Deformation | [`threejs/WORLD-INTERACTION.md`](threejs/WORLD-INTERACTION.md) |
| Capture, Regression, unklare Ursache | [`threejs/DEBUG-REVIEW.md`](threejs/DEBUG-REVIEW.md) |
| Sweep, Ranking, Referenzvergleich | [`threejs/MEASURING.md`](threejs/MEASURING.md) |

Zusätzlich genau eine passende Datei aus [`projects/<repo-name>/`](projects/) lesen, wenn dessen Trigger greift. Bei einer vollständigen neuen Welt zuerst Map-Generierung und Performance, danach nur die wirklich betroffenen Owner.

## Startreihenfolge

1. Hauptmotiv, Vorder-/Mittel-/Hintergrund, Route und Größenanker benennen.
2. Gemeinsame Weltfelder und Integrationskontakte festlegen.
3. Hauptschichten vollständig bauen; fehlend/kaputt schlägt Detailpolitur.
4. Abgeleitete Bakes, Kameras, Spawns und Messregionen nach Weltänderungen erneuern.

Fachmechanismen und Belege stehen ausschließlich in den verlinkten Ownern. Die frühere Parallelfassung unter `worldbuilding/` liegt nur noch in [`old-deprecated/worldbuilding/`](old-deprecated/worldbuilding/).
