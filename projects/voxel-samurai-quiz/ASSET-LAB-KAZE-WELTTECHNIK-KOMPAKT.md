# Asset Lab V3/V36 gegen Kaze no Shima — Kompaktvergleich

**Lesen wenn:** größte Unterschiede und Auswirkungen der Welttechniken in wenigen Minuten verstehen.
**Vollversion:** [`ASSET-LAB-KAZE-WELTTECHNIK.md`](ASSET-LAB-KAZE-WELTTECHNIK.md)
**Status:** technischer Vergleich aus Quellcode und Doku; keine Sichtbewertung.
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen und unnötige Artikel streichen; Fehlerbild, Ursache, Handlung und Beleg erhalten.

## 1. Ein Satz pro System

- **Asset Lab V3:** kompakte Vorschauwelt; `build(seed)` (einmaliger Aufbau aus reproduzierbarer Zufallszahl) erzeugt ein vollständiges Terrain-Mesh (zusammenhängender 3D-Boden), Instanzen (viele Kopien derselben Grundform) und lokale Wasserflächen.
- **Asset Lab V36 ohne Figuren:** große Burgkulisse; jeder Beitrag wählt seine eigene Terrain-Technik (Bauweise des 3D-Bodens), Architektur und Atmosphäre innerhalb des gemeinsamen Asset-Lab-Renderers (Anzeigeprogramm für Beiträge).
- **Kaze no Shima:** Produktionswelt; World-Spec (bewusst geschriebener Kartenbauplan), Bake (teure Vorberechnung), gemeinsame Weltfelder (Datenkarten für Boden und Bewuchs) und spezialisierte Laufzeitsysteme arbeiten zusammen.
- **Wichtig:** Claude Opus 5 besitzt V3-Beiträge, aber keinen V36-Beitrag.

## 2. Größte Unterschiede

| Frage | Asset Lab V3 | Asset Lab V36 – nur Welt | Kaze no Shima | Größte Auswirkung |
|---|---|---|---|---|
| Was wird gebaut? | drei kompakte Miniwelten | eine große Bergburg-Kulisse | eine große begehbare Insel | Asset Lab optimiert ein Gesamtbild; Kaze optimiert Erkundung |
| Technische Basis | React Three Fiber (React-Anbindung für Three.js) + Three.js (Browser-3D-Bibliothek) | gleicher Asset-Lab-Host (gemeinsame Anzeigehülle) | eigene imperative Three.js-Engine (direkt gesteuerte Weltlaufzeit) | Kaze besitzt mehr Kontrolle, braucht aber mehr Grundentwicklung |
| Kartenvertrag | `build(seed)` (einmaliger reproduzierbarer Aufbau) | `build(seed)` (einmaliger reproduzierbarer Aufbau) | World-Spec (Kartenbauplan) → Heightfield (Höhenraster) → Laufzeitsysteme | Kaze trennt Karteninhalt von Welttechnik; Asset Lab mischt beides im Beitrag |
| Boden | ein vollständiges Terrain-Mesh (zusammenhängender 3D-Boden) | je Beitrag Raster, Platten oder Felsmassen | CDLOD-Terrain (entfernungsabhängige Bodenstücke ohne sichtbare Risse) | Kaze skaliert auf große Laufwege; Asset Lab bleibt kompakt |
| Bodenwahrheit | lokale Höhenfunktion; meist nicht ans Gameplay geliefert | lokale Höhenfunktion optional | `heightAt(x,z)` (gemeinsame Bodenhöhenabfrage) für Rendering und Gameplay | Kaze verhindert schwebende Figuren, falsche Kollision und getrennte Bodenstände |
| Bodenmaterial | Vertexfarben (Farben direkt an Meshpunkten) | Vertexfarben oder lokaler Shader (GPU-Programm für Oberfläche) | Splatmap (Mischkarte für Bodenarten), Normalmap (Karte für feine Lichtstruktur), AO (weicher Kontaktschatten) | Kaze erzeugt reichere Oberflächen und kann Material unabhängig von Geometrie ändern |
| Biome | lokale Regeln im einzelnen Builder | nicht vorgeschrieben | Biomfeld (Datenkarte für Gras, Blumen, Bäume und Biomtyp) | Kaze hält Ökologie über ganze Karte konsistent |
| Vegetation | einmal verteilen und instanzieren | begrenzte Kulissenvegetation | kamera-relative Grasfelder (Nahbewuchs folgt Kamera, bleibt aber ortsfest), Baumchunks (räumliche Baumgruppen), LOD (günstigere Fernform) | Kaze erreicht hohe Dichte über große Fläche ohne alles voll zu zeichnen |
| Architektur | Primitive (einfache Boxen, Kegel, Blobs) nach Material instanziert | gleiche Grundidee, größerer Burgbau | Site-Batching (Zusammenfassen je Standort und Material), Footprint-Sampling (mehrere Bodenkontaktpunkte prüfen), Plinthen (Sockel bis in Boden) | Kaze erhält glaubwürdigen Bodenkontakt und räumliches Ausblenden |
| Wasser | lokale Scheiben, Bänder und Wasserfallflächen | lokaler Fluss, Pool und Wasserfall je Beitrag | Ozean, Flussprofil, Teiche und Wasserfälle aus gemeinsamem Boden | Kaze hält Ufer, Tiefe und Wasserhöhe konstruktiv zusammen |
| Licht und Wetter | Host-Preset (vorgegebene Lichtstimmung) | Host-Preset plus beitragseigene Atmosphäre | Environment-SSoT (eine zentrale Quelle für Sonne, Wind, Nebel und Wetter) | Kaze beleuchtet Himmel, Material, Wasser und Vegetation aus derselben Weltstimmung |
| Sichtweite | fast ganze Karte gleichzeitig sichtbar | ganze Kulisse für Gesamtansicht gebaut | Culling (Unsichtbares nicht zeichnen), Chunks (Raumabschnitte), LOD (günstigere Fernform) | Asset Lab spart Systemkomplexität; Kaze spart Laufzeitkosten in großer Welt |
| Vorbereitung | Welt entsteht direkt in `build(seed)` | Welt entsteht direkt in `build(seed)` | Bake-Cache (gespeichertes Ergebnis der Vorberechnung) | Kaze verschiebt teure Berechnung aus Spielstart; Asset Lab bleibt einfacher |
| Spielbarkeit | ohne `playfield` (Vertrag für Boden und Hindernisse) nur Vorschau | ohne `playfield` (Vertrag für Boden und Hindernisse) nur Vorschau | Boden-, Wasser-, Steigungs- und Blockerabfragen integriert | Kaze ist Weltplattform; V3/V36 sind zunächst Szenenbeiträge |
| Wartung vieler Karten | Technik wiederholt sich pro Beitrag | Technik kann sich pro Beitrag stark unterscheiden | alle Karten nutzen dieselbe Engine und liefern hauptsächlich Specs (Baupläne) | Kaze kostet anfangs mehr, wird mit jeder weiteren Karte wirtschaftlicher |

## 3. Größte Auswirkungen nach Bedeutung

1. **Gemeinsame Bodenwahrheit:** Kaze nutzt Heightfield (Höhenraster) und `heightAt` (Bodenhöhenabfrage) gemeinsam → Rendering, Wasser, Gebäude und Gameplay stimmen überein.
2. **Engine statt Einzelbeitrag:** Kaze trennt Weltengine (wiederverwendbare Technik) und Map-Spec (Karteninhalt) → neue Dungeon-Level erben Terrain, Wasser, Vegetation, Wetter und Performance.
3. **Großweltskalierung:** Kaze nutzt Chunks (Raumabschnitte), LOD (günstigere Fernformen) und Culling (Unsichtbares nicht zeichnen) → Kosten folgen sichtbarem Raum statt Gesamtkarte.
4. **Oberflächenqualität:** Kaze nutzt Splatmap (Bodenmischkarte), Normalmaps (feine Lichtstruktur) und AO (Kontaktschatten) → Boden wirkt materieller als reine Vertexfarben (Farben an Meshpunkten).
5. **Atmosphärenkohärenz:** Kaze nutzt Environment-SSoT (eine zentrale Umweltquelle) und IBL (Beleuchtung aus dem Himmel) → Himmel, Wasser, Materialien und Wind gehören sichtbar zusammen.
6. **Vegetationsdichte:** Kaze nutzt kamera-relative Felder (Nahvegetation um Kamera), Instancing (viele Kopien pro Renderauftrag) und Baum-LOD (günstigere Fernkronen) → viel mehr Bewuchs bleibt bezahlbar.
7. **Entwicklungskosten:** Asset Lab baut kleine Welten schnell; Kaze braucht Bake-Pipeline (Vorbereitungskette), Cache (gespeichertes Ergebnis) und mehrere Renderer → höhere Startkosten, geringere Folgekosten pro großer Karte.

## 4. Wann welches System passt

### Asset Lab V3 passt

- kleines Diorama (kompakte Modellwelt) oder Level-Vorschau.
- gesamte Karte bleibt fast immer sichtbar.
- schneller KI-Vergleich ist wichtiger als langfristige Weltarchitektur.
- lokale Höhenfunktion und wenige Oberflächen reichen.

### Asset Lab V36-Weltbau passt

- eine große Burg oder Landmarke soll als vollständige Kulisse lesbar sein.
- jede Karte darf eigene Technik und eigenen Stil besitzen.
- kompakte Komplettansicht ist wichtiger als kilometerweite Erkundung.
- Instanzfamilien (viele Kopien einfacher Grundformen) und lokale Shader (eigene GPU-Oberflächenprogramme) reichen.

### Kaze passt

- viele große Dungeon-Level sollen dieselbe Welttechnik verwenden.
- Spieler, Gegner, Kamera, Wasser und Gebäude brauchen verlässlichen Boden.
- hohe Vegetationsdichte, weite Sicht und Wetter gehören zum Kernprodukt.
- langfristige Wartbarkeit wiegt stärker als schneller Erstaufbau.

## 5. Kurzurteil

```text
Asset Lab V3  = kompakte, selbst gebaute Miniwelt
Asset Lab V36 = große, beitragslokale Kulissenwelt
Kaze no Shima = wiederverwendbare Produktions-Weltengine
```

- Größter visueller Unterschied: Kaze besitzt zusammenhängende Material-, Vegetations-, Licht- und Tiefensysteme.
- Größter technischer Unterschied: Kaze besitzt gemeinsame Weltfelder (zentrale Boden- und Biomdaten) statt nur fertiger Szenengeometrie.
- Größter Produktunterschied: Asset Lab liefert eine Welt; Kaze liefert ein System für viele Welten.
