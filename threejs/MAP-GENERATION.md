# Map- und Terrain-Generierung

- **Status:** optionale „könnte“-Tipps; lokale Maße, Seeds, Bakes → Vorrang

## Fünf Tipps

- **1 · Gesamtframe könnte zuerst zeigen:**
  - Terrain; Wasser; Route; Vegetation; Landmarke; Himmel; Licht
  - Reihenfolge: fehlende Schicht → kaputte Schicht → Komposition → Kontakt → Material → Detail
  - vorhandene sichtbare Stärke könnte Untergrenze bleiben; neue Technik nur mit belegter Parität ersetzen
- **2 · Weltvertrag/Auftrag könnte bündeln:**
  - Einheiten; Achsen; Höhe; Normale; Steigung; Wasser; Wege; Pads; Biome; Occupancy
  - gemeinsame Daten: Render; Kollision; Navigation; Scatter; Kamera; Gameplay
  - Auftrags-Keywords: `realistic PBR materials`; `realistic lighting`; `reflections`; `shadows`
  - Makroform → Täler/Horizonte; Mesoform → Wege/Ufer; Mikroform → Oberflächenbruch
- **3 · Modifierfluss könnte sichtbar bleiben:**
  - Ausgangsfeld → Makroform → Wege/Wasser/Bauten → Glättung → Upsampling → Masken/Bakes
  - Standortprüfung: Mittelpunkt + Footprint/Ring/Querschnitt
  - analytischer Score → nur Vorauswahl; echter Bake → Entscheidung
- **4 · Bakevertrag könnte enthalten:**
  - alle Quellen; Schema; Hash; Stamp; Artefakt
  - Invalidation: Kameras; Spawns; Wasser; Vegetation; Bauten; Navigation; LOD; Probes
  - getrennte oder zellgebundene RNG-Ströme
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - leere Szene → Hauptschichten markieren
  - glatte Ferne → Instanzreichweite + Pixelmaß prüfen
  - schwebender Rand → Footprint/Ring auf finaler Oberfläche
  - falsche Form → Feld nach jedem Modifier diffen
  - Hero gut, Laufweg schlecht → Weltedit stoppen; Kamera/Komposition prüfen

## Handoffs

- Vegetation → [Vegetation](VEGETATION.md)
- Reaktionsspuren → [Weltinteraktion](WORLD-INTERACTION.md)
- Evidenz → [Debug/Review](DEBUG-REVIEW.md)
