# Vegetation: Gras, Bäume, Blumen und Ambient Life

## Gemeinsame Eingaben

Scatter und Shader lesen dieselben Felder: `height`, Normale/Steigung, weiche Biomgewichte, Nässe/Wasser, Wege und Occupancy/Clearing. Harte Biom-IDs aus linear gefilterten Texturen nicht vertrauen; Gewichte oder explizite Regionen verwenden.

## Gras

- **Distanzrollen:** nah breite einzelne Halme, mittig Masse und Böen, fern ruhiger Träger ohne Riesenkarten.
- **Wind:** gemeinsame Richtung und große Gust-Wellen; wenig lokales Zittern; Eigengewicht/Droop getrennt.
- **Kontakt:** Boden unter dichter Deckung passend abdunkeln und am Vegetations-Fade ausblenden.
- **Komposition:** Kuppe plus abfallender Vordergrund schafft große Halme und freie Tiefe; Ebene wird schnell zur Hecke.
- **Maßstab:** Halmhöhe/-breite in Metern und projizierten Pixeln prüfen. Coverage kann einen Shag-Teppich fälschlich belohnen.

## Bäume

- Artenflecken, Alters-/Höhenhierarchie, Überhälter, Unterwuchs und unregelmäßige Waldränder statt gleichmäßiger Zellen.
- Kronen-**Deckung** hängt näherungsweise von Kartenanzahl × Kartenfläche ab, nicht nur vom Kronenvolumen.
- Nicht-uniforme Skalierung von Karten geometrisch kompensieren; sonst entstehen Bannerblätter.
- Atlas × Species-Tint × Vertexgradient als Produkt prüfen; direkte Sonne, IBL und Schatten getrennt messen.
- Kartenwicklung/Normalen mit FrontSide prüfen. `DoubleSide` ist kein Winding-Fix.
- Artenregion und Terrain-Waldmaske müssen denselben Falloff lesen; Zufallsrest nach regionaler Auswahl renormalisieren.

## Blumen und Kartenatlanten

- Erst klären, was eine Karte darstellt: Einzelblatt, Zweig oder Cluster.
- Weltgröße, Atlasinhalt, UV-Inset, `flipY`, Alpha-Coverage und Ziel-Mips zusammen prüfen.
- Eine meterbreite Karte bleibt ein Schild; mehr Dichte oder perfektes Mip-Alpha repariert sie nicht.
- Arten auf großen Clustern verteilen; kleine unabhängige Zufälligkeit erzeugt Konfetti.

## Ambient Life

Pollen, Staub, Insekten, Blätter und Vögel:

- an Heightfield/Biom/Splat/Wind binden,
- als geschlossene Funktion gepinnter Zeit animieren,
- lokal um die Kamera wrappen statt CPU-seitig ständig neu streuen,
- pro Klasse separaten Zufallsseed verwenden,
- Cutouts bei benötigtem Tiefennebel korrekt in den Depth-Pfad integrieren,
- Population, Helligkeit und Größe **isoliert** messen.

Mehr Instanzen dürfen nur „mehr“ bedeuten. Ein gemeinsamer RNG-Strom verschiebt bei Count-Änderung alle späteren Populationen und macht Dichte-Sweeps unbrauchbar.

## Performance-Falle: Spezies-Buckets

Kosten entstehen oft pro **Chunk × Spezies × sichtbarer LOD-/Schattenpass**, nicht pro Baum. Daher:

- dichter in einem vorhandenen Bucket kann draw-call-neutral sein,
- eine seltene Art in einem neuen Rand-Chunk kann viele Calls kosten,
- Ausdehnung und Species-Share getrennt sweepen,
- Bounds pro Chunk/Mesh setzen, nicht auf geteilter Geometrie,
- bei Fern-LOD Kartenfläche erhalten und Fernschatten abschalten.

## Abnahme

- Nah/Mittel/Fern jeweils lesbar.
- Cluster und Negativraum statt Raster.
- Weltmaß und projizierte Größe plausibel.
- Wege, Gewässer und Gebäude frei.
- A/A-Null und Feature-off-Lauf sauber; Klassen getrennt gemessen.
- Dichteerhöhung löst Formfehler nicht und verletzt das Budget nicht.
