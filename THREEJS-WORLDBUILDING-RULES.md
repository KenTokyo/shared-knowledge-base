# Three.js-Worldbuilding — kompakter Router

**Zweck:** Nur die Regeln laden, die zur aktuellen 3D-Aufgabe gehören. Keine lange Sammel-Prompt lesen.

**Immer zusätzlich:** [`THREEJS-RULES.md`](THREEJS-RULES.md) für allgemeine Three.js-, R3F- und
Runtime-Regeln. **Und der Ordner des eigenen Repos** unter [`projects/<repo-name>/`](projects/) — dort steht,
was in *diesem* Projekt Zeit gekostet hat.

**Sichtprüfung ist kein Standardgate:** User-Abnahme bevorzugen. Nur ungelöste Look-Unsicherheit erlaubt eine,
im gesamten Userauftrag absolut höchstens zwei agentische Sichtprüfungen nach `CODING-RULES.md`; keine Bildschleife.

## Lesepfad nach Aufgabe

| Aufgabe | Lesen |
| --- | --- |
| Neue Welt, Terrain, Biome, Wege | [`threejs/MAP-GENERATION.md`](threejs/MAP-GENERATION.md) + [`threejs/PERFORMANCE.md`](threejs/PERFORMANCE.md) |
| Gras, Bäume, Blumen, Ambient Life | [`threejs/VEGETATION.md`](threejs/VEGETATION.md) + [`threejs/PERFORMANCE.md`](threejs/PERFORMANCE.md) |
| Fluss, Meer, Teich, Wasserfall | [`threejs/WATER.md`](threejs/WATER.md) + [`threejs/DEBUG-REVIEW.md`](threejs/DEBUG-REVIEW.md) |
| Häuser, Schreine, Ruinen, Brücken | [`threejs/BUILDINGS.md`](threejs/BUILDINGS.md) + [`threejs/PERFORMANCE.md`](threejs/PERFORMANCE.md) |
| Licht, Kamera, Referenz, PostFX | [`threejs/LIGHT-CAMERA.md`](threejs/LIGHT-CAMERA.md) + [`threejs/DEBUG-REVIEW.md`](threejs/DEBUG-REVIEW.md) |
| Partikel, Trails, Treffer-, Umwelt- oder Audio-VFX | [`threejs/VFX.md`](threejs/VFX.md) + [`threejs/PERFORMANCE.md`](threejs/PERFORMANCE.md) |
| Spuren, Wake, Deformation zur Laufzeit | [`threejs/WORLD-INTERACTION.md`](threejs/WORLD-INTERACTION.md) |
| Capture, Messung, Regression, unklare Ursache | [`threejs/DEBUG-REVIEW.md`](threejs/DEBUG-REVIEW.md) |
| Sweep auswerten, ranken, gegen eine Referenz vergleichen | [`threejs/MEASURING.md`](threejs/MEASURING.md) |

Bei einer vollständigen neuen Welt zuerst **Map-Generierung**, **Performance** und danach nur die betroffenen
Fachdateien lesen.

*Die frühere Parallelfassung dieser Owner unter `worldbuilding/` liegt in
[`old-deprecated/worldbuilding/`](old-deprecated/worldbuilding/). Zwei Taxonomien über dieselbe Sache waren
genau der Fehler, den diese Regeln selbst verbieten (Regel 4).*

## Acht Regeln, die immer gelten

1. **First Read zuerst:** Hauptmotiv sowie Vorder-, Mittel- und Hintergrund vor Detailcode benennen.
2. **Vollständig vor schön:** Terrain, vorgesehenes Wasser, Bodendeckung, Gehölz, Landmark und Licht früh gemeinsam sichtbar machen.
3. **Größter Fehler zuerst:** `fehlt > kaputt > Maßstab/Komposition > Integration > Licht/Material > Politur`.
4. **Eine Weltwahrheit:** Höhe, Steigung, Wasser, Biome, Wege und Belegung werden geteilt; keine Systemkopien.
5. **Meter vor Reglern:** Hauptformen in Weltmetern und an mindestens zwei bekannten Größenankern prüfen.
6. **Eine Ursache pro Versuch:** Nach zwei erfolglosen Varianten Layer wechseln statt weiter Werte zu drehen.
7. **Bild und Zahl trennen:** Energie, Verteilungen, Kosten und Regressionen numerisch; Form, Silhouette und
   Komposition bevorzugt durch den User, agentisch nur im begrenzten Ausnahmefall visuell.
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

**Fertig heißt:** Hero-Shot, Gegenrichtung und Laufweg sind als Produktziele umgesetzt; Systeme stimmen an ihren
Übergängen; Rohkanäle, HDR-Szene und LDR-Finalbild sind numerisch plausibel; Performance ist gebaut und nicht nur
versprochen. Die finale visuelle Oberflächenabnahme darf beim User bleiben.

## Danach

Hat in dieser Schicht etwas Zeit gekostet, das ein Tipp verhindert hätte, gehört es in zwei Zeilen in den
Projektordner — Format und Änderungsrecht: [`LEARNING-SYSTEM.md`](LEARNING-SYSTEM.md).
