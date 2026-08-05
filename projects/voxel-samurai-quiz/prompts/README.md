# Voxel Samurai Quiz — drei einzeln kopierbare Spielprompts

**Lesen wenn:** Dasselbe Endlos-Voxel-Hack-and-Slash soll mit drei gegensätzlichen Map-Systemen gebaut oder verglichen werden.
**Konstante:** Charakter, Kampf, acht Skills, VFX, Audio, Gegner, Wellen, Bossrhythmus, Spawn, UI und zwei Weltkonzepte bleiben gleich.
**Vergleichsbereich:** Nur Map-Aufbau, Map-Rendering, Map-Lichtkopplung und sichtbare Rückstände von Bewegung/Skills unterscheiden sich.
**Sichtprüfung:** Direkte sichtbare und spielerische Abnahme bleibt ohne aktuellen ausdrücklichen Prüfauftrag beim User.

## Prompts

1. [`voxel-style.md`](voxel-style.md) — authored Voxel-Module, lokale Weltbuilder, gebatchte Oberflächen und begrenzte Reaktionschunks.
2. [`ashen-coast-style.md`](ashen-coast-style.md) — lokale V73-AEON-Bauweise mit authored `WorldSpec`, gestuftem Bake und materialsemantischem `InteractionField`.
3. [`cloud-flakes-style.md`](cloud-flakes-style.md) — Makro-Heightfield, kontinuierliches Clipmap-Terrain, begrenztes `SurfaceReactionField` und warm-kühle Reliefbeleuchtung.

## Gemeinsamer Vergleichsvertrag

- genau zwei Welten: Skyglass Aqueduct Palace und Verdant Titan Grove Fortress.
- je Welt maximal 600 Einheiten äußere Gesamtspanne.
- identischer Voxel-Samurai, identische Steuerung und identische acht Skills `Q E R 1 2 3 4 5`.
- genau zehn steinartige Voxel-Gegnerarten; acht reguläre Kreaturen plus Titan Golem und Storm Wyrm.
- Bosswelle zwingend bei `5, 10, 15, …`.
- ein gemeinsames `WorldImpactEvent` meldet echten Kontaktpunkt, Richtung, Footprint und Stärke an Map-System.
- jeder Map-Stil hinterlässt materialgerechte Kerben, Furchen, Bruchränder, Verdichtung oder Wasserreaktion.
- Map-Reaktion verändert standardmäßig weder Schaden noch Navigation, Spawnfairness oder Bossmechanik.
- Rückstände sind kapazitätsbegrenzt, altern kontrolliert und werden bei Neustart/Weltenwechsel vollständig gelöscht.

## Auswahl

| Stil | Wählen, wenn | Haupttrade-off |
|---|---|---|
| Voxel | handgebaute facettierte Diorama-Welt und direkte Modulkontrolle zählen | lokale Builder und Reaktionschunks brauchen Kartenhandwerk |
| Ashen Coast | lokale AEON-Weltenarchitektur, authored Geografie und gemeinsame Bake-/Runtime-Owner zählen | höherer Spec-, Bake- und Validierungsaufwand vor erster fertiger Welt |
| Cloud Flakes | kontinuierliche Oberfläche, echte Skillnarben und reliefbetontes Licht im Mittelpunkt stehen | reaktives Feld, LOD-Parität und Shader-/Bandbreitenbudget sind anspruchsvoller |

## Cloud-Flakes-Referenzgrenze

- Quellreferenz: `D:/CODING/React Projects/github-repos-examples/Claude-Flakes`.
- Übernommen werden stackneutrale Prinzipien: Bake + CPU-Bodenparität, kontinuierlicher Terrain-LOD, gebundenes Deformationsfeld, gemeinsamer Kontakt-Brush, Reset, warmes Streiflicht und kühler Himmel.
- Nicht übernommen werden Babylon.js-/WGSL-APIs, fertige Shader, Schnee-Zwang oder Auflösungswerte der 2.048-m-Referenzwelt.
