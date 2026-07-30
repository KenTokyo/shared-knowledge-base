# Prozedurale Bauten und Landmarken

- **Status:** optionale „könnte“-Tipps; lokale Baustile, Maße, APIs → Vorrang

## Fünf Tipps

- **1 · Standort könnte flächig geprüft werden:**
  - Ecken; Kanten; Min/Max-Höhe; Gefälle; Eingrabung
  - gemeinsamer Transform: Mesh; Collider; Clearing; Kamera; Navigation
- **2 · Occupancy könnte gemeinsam sein:**
  - Bauten; Wege; Pads; Trümmer → Kernzone + weicher Rand
  - Consumer: Bäume; Gras; Blumen; Gegner; Life; Navigation
- **3 · Geometrieprüfung könnte enthalten:**
  - Außenflächen; Dächer; Böden; Giebel; Kappen; Extrusionsenden
  - Winding; Dreiecksfläche; Degeneration; NaN
  - `DoubleSide` → nur Diagnose
- **4 · Form könnte vor Oberfläche kommen:**
  - Silhouette; Dach; Öffnungen; Wandstärke; Maßstabsanker
  - Ruine: Ursprungsgrundriss → plausible Brüche
  - Kamera: echte Piece-Bounds statt Site-Mittelpunkt
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - schwebende Ecke → Footprint-Min/Max
  - Gras im Pflaster → Occupancy-Consumer prüfen
  - verschwindendes Dach → Normalen + Front/Backface
  - Site sichtbar, Bau unsichtbar → Piece-Bounds projizieren
  - schlechte Cullingkosten → lokale Batch-Bounds

## Handoffs

- Terrainkontakt → [Map-Generierung](MAP-GENERATION.md)
- PBR → [Shader/PBR](SHADERS.md)
- Framing → [Licht/Kamera](LIGHT-CAMERA.md)
