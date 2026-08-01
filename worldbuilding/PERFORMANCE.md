# Worldbuilding-Performance

Für allgemeine Three.js-/R3F-Regeln zusätzlich [`../THREEJS-RULES.md`](../THREEJS-RULES.md) lesen. Hier stehen nur Welt-spezifische Hebel.

## Vor hoher Dichte festlegen

- Zielgerät, Auflösung und FPS-Ziel,
- Draw-Call-, Triangle-, Textur-/Speicher- und Schattenbudget,
- Chunkgröße, Sichtweiten und LOD-Rollen,
- welche Systeme im Hero-, Laufweg- und Gegenblick sichtbar sein müssen.

FPS allein ist kein Budget. Bei beauftragter Messung mindestens Avg/P95/Worst, Calls, Triangles und visuelle Parität einordnen.

## Architektur

- Terrain chunk-/LOD-fähig.
- Wiederholte Vegetation und Bauteile instancen.
- Unterschiedliche statische Geometrie materialweise **räumlich** batchen.
- Bounds pro Mesh/Chunk in Weltkoordinaten setzen; nie eine geteilte Geometry-Bounds für alle Chunks verwenden.
- LOD/Impostor vor massiver Dichte planen; Fernschatten separat abschalten.
- Atlas/Texture-Array/Attribute statt Materialflut.
- Weltpositionen shaderseitig stabil ableiten; keine CPU-Neuverteilung bei jeder Kamerabewegung.

## Versteckte Draw-Call-Multiplikatoren

Kosten entstehen oft als:

`räumliche Buckets × Arten/Materialien × sichtbare LODs × Haupt-/Schattenpässe`

Darum:

- zusätzliche Art am Rand kann teuer sein, obwohl sie nur wenige Objekte besitzt,
- mehr Instanzen in vorhandenem Bucket können call-neutral sein,
- Ausdehnung, Artanteil und Dichte getrennt messen,
- Schattenkaskaden in der Kostenanalyse mitzählen,
- leere/unsichtbare Fernmeshes nicht unbemerkt weiter zeichnen.

## Vegetations-LOD

- Bei weniger Karten die projizierte Gesamtfläche ungefähr erhalten.
- Karteninhalt und Weltmaß vor Count erhöhen.
- Fernstruktur braucht einen Träger; Subpixel-Textur wird von Mips korrekt entfernt.
- Culling nach Rollen: Nahdetails kurz, Masse mittel, Silhouette/Fernträger lang.

## VFX/Ambient Life

- wenige stabile Draw Calls pro Klasse,
- analytische Zeit/GPU-Bewegung,
- feste Pools und keine Hotpath-Allokation,
- transparente Fläche, Bloom-Halo und Depth-Kosten begrenzen,
- Quality-Tiers als echte Populations-/Reichweitenverträge prüfen.

## Messhygiene

- Baseline und Feature-off-Lauf führen.
- Renderer-Zähler korrekt resetten/attribuieren.
- Populationen mit getrennten Seeds sweepen.
- Eine neue Spezies/Materialklasse per Hide-and-Diff auf Calls und Triangles zuordnen.
- Kosten nur gegen ein dokumentiertes Budget werten; beobachtetes Maximum ist nicht automatisch ein Gate.

**Abnahme:** Gleiche sichtbare Schichten auf Hero, Gegenrichtung und Laufweg; lokale Bounds greifen; LOD-Wechsel bewahrt Silhouette/Deckung; keine Dichte kompensiert falsche Größe oder Verteilung.
