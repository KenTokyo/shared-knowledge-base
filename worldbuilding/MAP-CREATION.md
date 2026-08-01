# Map Creation: Welt, Terrain und Baufolge

## Vor dem ersten Weltcode

Aus Alltagssprache einen kurzen Vertrag ableiten:

- **First Read:** Was erkennt man in einer Sekunde?
- **Schichten:** Was steht vorne, in der Mitte und am Horizont?
- **Maßstab:** Augenhöhe, Wege, Bäume, Gebäude und Berge in Metern.
- **Weltfelder:** Höhe/Normale, Steigung, Wasser, Biom-/Splatgewichte, Wege, Belegung.
- **Kontakte:** Terrain↔Wasser, Terrain↔Gebäude, Wege↔Vegetation, Kamera↔Welt/Licht.
- **Budget:** Zielgerät/FPS, Chunks, LOD, Schatten, Texturen und Draw Calls.
- **Prüfung:** feste Kameras, Zeit, Wetter, Renderstufe und Anti-Ziele.

„Episch“, „natürlich“, „dicht“ oder „AAA“ sind keine Bauangaben. In sichtbare Schichten, Meter, Verteilung, Licht und Negativraum übersetzen.

## Schnelle Baufolge

| Gate | Muss sichtbar stimmen |
| --- | --- |
| **G0 Referenz** | Motiv, Tiefenschichten, Sonne, Maßstab, Bewegung, Nicht-Ziele |
| **G1 Graue Welt** | Silhouette, Gelände, vorgesehene Gewässer, Wege, Waldflächen, Landmark |
| **G2 Vollständigkeit** | Bodendeckung, Gehölz, Himmel/Licht und alle Hauptschichten gemeinsam |
| **G3 Integration** | Ufer, Fundamente, Wege, Clearings und Kollision teilen Weltdaten |
| **G4 Maßstab/Form** | Nah-, Mittel- und Fernsicht plus Meteranker |
| **G5 Neutraler Render** | Wicklung, Farbraum, Albedo, Normalen, Sonne und IBL ohne Look-PostFX |
| **G6 Final Look** | Jeder Post-Pass hat einen benannten Zweck |
| **G7 Traversal/Performance** | Hero, Gegenrichtung, Laufweg, Bounds, LOD/Culling und Budgets |

Ein bestandenes Gate nach einer Weltänderung gezielt wieder öffnen; nicht still weiterbauen.

## Terrain-Regeln

1. **Drei Skalen:** Makroform (Tal/Berg/Küste), Mittelform (Rücken/Terrassen/Erosion), Mikrodetail. Noise ersetzt keine Landform.
2. **Ruhezonen:** Wege, Gebäude, Kampf und lesbare Wiesen brauchen bewusst flachere Bereiche.
3. **Modifier-Ownership:** Überlappende Flüsse, Straßen, Pads oder Teiche nicht nacheinander destruktiv schreiben. Pro Zelle Einfluss/Owner bestimmen und einmal anwenden.
4. **Unveränderte Referenz:** Standort- oder Spill-Entscheidungen auf dem natürlichen Terrain treffen, nicht auf einer Karte, die derselbe Modifier bereits verformt hat.
5. **Eine Höhenwahrheit:** CPU, GPU, Kollision, Kamera und Scatter aus derselben Quelle oder nachweislich identischer Mathematik.
6. **Bake-Stufen:** Analytische Vorprüfung darf Kandidaten ablehnen; Tiefe, Reserve und Fläche erst auf der final upgesampelten Karte glauben.
7. **Atomarer Bake:** Während des Bakes keine Source-Edits; Ergebnis mit Version/Source-Hash stempeln.

## Kamera und Messung sind abgeleitete Daten

Nach Terrain-, Wasser- oder Landmark-Änderungen neu prüfen:

- Augenhöhe über echter begehbarer Oberfläche,
- Sichtlinie und Vordergrundhang,
- Biomoffenheit und Skyline,
- Sonne relativ zum Blick,
- Spawns, Vegetationsscatter und alte Bildrechtecke.

Alte Koordinaten oder Crops sind keine Wahrheit.

## Schnellste Diagnose

- Leere Welt → Vollständigkeitsbild, nicht Material-Sweep.
- Glatter Rauschberg → fehlende Mittelform, nicht stärkere Mikrotextur.
- Gerade Naht → Rohkanal/HDR/LDR und Objekt an/aus trennen.
- Falscher Standort → natürliches Terrain und ganzen Footprint prüfen.
- Ferne bleibt glatt → fehlt ein geometrischer/vegetativer Träger; Mips löschen Subpixel-Textur prinzipiell.

**Abnahme:** Die Welt liest bereits ohne finale Materialien; alle sichtbaren Übergänge besitzen einen Datenvertrag; keine wichtige Entscheidung hängt nur an einem Hero-Shot.
