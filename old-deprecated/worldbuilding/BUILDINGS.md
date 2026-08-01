# Gebäude, Schreine, Brücken und Ruinen

## Platzierung: Footprint statt Mittelpunkt

Für jeden Standort:

1. gesamten Grundriss sampeln, nicht nur das Zentrum,
2. höchste/niedrigste Stelle und Steigung bestimmen,
3. Oberkante/Fußboden bewusst setzen,
4. Fundament oder Plinthe unter den tiefsten Punkt führen,
5. Geometrie, Collider, Bodenprobe und Clearing aus demselben lokalen Frame ableiten.

Authored Pads sind nicht automatisch flach. Nach Terrain-Rebake alle Standorte erneut prüfen.

## Gemeinsame Belegung

Gebäude, Höfe, Pflaster, Brücken und Wege schreiben in ein Occupancy-/Clearing-Feld. Bäume, Gras, Blumen, Terrainmaterial, Kollision und Navigation lesen es. Natürliche Ränder weich/ausgefranst; Wände und Pflaster hart.

Modifier-Reihenfolge festlegen: Ein späteres Pad darf keinen Teich zuschütten, ein Weg kein Fundament aufreißen.

## Form und Glaubwürdigkeit

- Tür-, Geschoss-, Dach- und Balkenmaße an Spieler/Augenhöhe ankern.
- Wiederholbare Module nutzen, aber Hero-Orte über Silhouette und Ausnahmeformen authoren.
- Materialmaß in Weltmetern halten; große Wand und kleiner Pfosten dürfen nicht dieselbe Texturanzahl tragen.
- Dach, Fundament, Entwässerung, Zugang und umgebender Boden erzählen dieselbe Konstruktion.

### Ruinen

- Zuerst den ursprünglichen Grundriss lesbar machen, dann gezielt Teile entfernen.
- Schäden besitzen Lastlogik: gebrochene Dachkante, Restwand, Sturz, Trümmer am Fuß.
- Keine zufällige Steinwolke als Ersatz für Baugeschichte.
- Wegführung, Deckung und Landmark-Silhouette trotz Zerstörung erhalten.

## Geometrie-Gate vor Materialtuning

- geschlossene Körper: Normalen nach außen,
- Dachoberseiten: nach oben; Untersichten: nach unten,
- Zylinder/Kappen und Giebelfüllungen vollständig,
- keine NaNs/Nullflächen,
- lokale und Welt-Bounds korrekt.

`DoubleSide` ist kein Reparaturwerkzeug für falsche Wicklung. Dunkle Flächen zuerst geometrisch prüfen, nicht heller färben.

## Performance

- Gleiche Teile instancen.
- Unterschiedliche statische Teile derselben Materialfamilie standort-/chunkweise batchen.
- Kein Insel-weites Mesh pro Material: Welt-Bounds zerstören Frustum-Culling.
- Schatten nur für relevante Teile und Distanzen.
- Ein neuer Material-/Spezies-Bucket kann pro Chunk und Schattenpass mehrere Calls erzeugen; Kosten am Bucket, nicht am Objekt zählen.

## Kamera-Gate

Solver und Review müssen gebaute Teile wirklich sehen: Subject-/Piece-Masken, Fill im Frame, Terrain-/Built-Occlusion, abgeschnittene Dächer und Lichtabsicht prüfen. Sichtbarkeit allein ist keine gute Komposition.

**Abnahme:** Nichts schwebt oder wächst durch feste Flächen; Konstruktion bleibt in Nah- und Fernsicht lesbar; Winding, Bounds, Collider und Clearing teilen dieselbe Transformation.
