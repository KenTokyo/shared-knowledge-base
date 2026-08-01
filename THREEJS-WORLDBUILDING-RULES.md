# Three.js-Worldbuilding – kompakter Router

**Zweck:** Nur die Regeln laden, die zur aktuellen 3D-Aufgabe gehören. Keine lange Sammel-Prompt lesen.

**Immer zusätzlich:** [`THREEJS-RULES.md`](THREEJS-RULES.md) für allgemeine Three.js-, R3F- und Runtime-Regeln.

## Lesepfad nach Aufgabe

| Aufgabe | Lesen |
| --- | --- |
| Neue Welt, Terrain, Biome, Wege | [`worldbuilding/MAP-CREATION.md`](worldbuilding/MAP-CREATION.md) + [`worldbuilding/PERFORMANCE.md`](worldbuilding/PERFORMANCE.md) |
| Gras, Bäume, Blumen, Ambient Life | [`worldbuilding/VEGETATION.md`](worldbuilding/VEGETATION.md) + [`worldbuilding/PERFORMANCE.md`](worldbuilding/PERFORMANCE.md) |
| Fluss, Meer, Teich, Wasserfall | [`worldbuilding/WATER.md`](worldbuilding/WATER.md) + [`worldbuilding/DEBUG-REVIEW.md`](worldbuilding/DEBUG-REVIEW.md) |
| Häuser, Schreine, Ruinen, Brücken | [`worldbuilding/BUILDINGS.md`](worldbuilding/BUILDINGS.md) + [`worldbuilding/PERFORMANCE.md`](worldbuilding/PERFORMANCE.md) |
| Licht, Kamera, Referenz, PostFX | [`worldbuilding/LIGHT-CAMERA.md`](worldbuilding/LIGHT-CAMERA.md) + [`worldbuilding/DEBUG-REVIEW.md`](worldbuilding/DEBUG-REVIEW.md) |
| Partikel, Trails, Treffer-, Umwelt- oder Audio-VFX | [`worldbuilding/VFX.md`](worldbuilding/VFX.md) + [`worldbuilding/PERFORMANCE.md`](worldbuilding/PERFORMANCE.md) |
| Capture, Messung, Regression, unklare Ursache | [`worldbuilding/DEBUG-REVIEW.md`](worldbuilding/DEBUG-REVIEW.md) |

Bei einer vollständigen neuen Welt zuerst **Map Creation**, **Performance** und danach nur die betroffenen Fachdateien lesen.

## Acht Regeln, die immer gelten

1. **First Read zuerst:** Hauptmotiv sowie Vorder-, Mittel- und Hintergrund vor Detailcode benennen.
2. **Vollständig vor schön:** Terrain, vorgesehenes Wasser, Bodendeckung, Gehölz, Landmark und Licht früh gemeinsam sichtbar machen.
3. **Größter Fehler zuerst:** `fehlt > kaputt > Maßstab/Komposition > Integration > Licht/Material > Politur`.
4. **Eine Weltwahrheit:** Höhe, Steigung, Wasser, Biome, Wege und Belegung werden geteilt; keine Systemkopien.
5. **Meter vor Reglern:** Hauptformen in Weltmetern und an mindestens zwei bekannten Größenankern prüfen.
6. **Eine Ursache pro Versuch:** Nach zwei erfolglosen Varianten Layer wechseln statt weiter Werte zu drehen.
7. **Bild und Zahl trennen:** Form, Silhouette und Komposition visuell; Energie, Verteilungen, Kosten und Regressionen numerisch.
8. **Abgeleitete Daten erneuern:** Terrain-/Bake-Änderungen invalidieren Kameras, Spawns, Vegetation und Messregionen.

## Minimaler Weltvertrag vor Code

- First Read und Anti-Ziele
- Vordergrund / Mittelgrund / Hintergrund
- Größenanker in Metern
- gemeinsame Weltfelder und Integrationskontakte
- Zielgerät, FPS- und Renderbudgets
- feste Prüfkameras, Zeit, Wetter und Renderstufe
- Stage-Gates und aktuelle Impact-Queue

**Stop-Regel:** Solange eine Hauptschicht fehlt oder sichtbar kaputt ist, höchstens zwei lokale Material-, Noise-, Schaum-, Bloom- oder Grade-Pässe.

**Fertig heißt:** Hero-Shot, Gegenrichtung und Laufweg funktionieren; Systeme stimmen an ihren Übergängen; Rohkanäle, HDR-Szene und LDR-Finalbild sind plausibel; Performance ist gebaut und nicht nur versprochen.
