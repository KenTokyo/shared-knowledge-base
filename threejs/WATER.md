# Wasser und Landschaftskontakt

- **Status:** optionale „könnte“-Tipps; lokale Wellen, Farben, APIs → Vorrang

## Fünf Tipps

- **1 · Wasservertrag könnte bündeln:**
  - Oberfläche; Bett; Tiefe; Shore-Distanz; Bankreserve; Wetness; Strömung
  - Render; Kollision; Kamera; Spawn; Vegetation; Gameplay
- **2 · Diagnose könnte vor Materialtuning liegen:**
  - Winding → Terrainkontakt → Depth/Sortierung → Reflexionsressource → Okklusion → Rohkanäle
  - `DoubleSide` → nur Diagnose
- **3 · Fluss/Teich könnten Terrain-plus-Render sein:**
  - gemeinsame Stationen: Bett; Gefälle; Geometrie; Richtung; Schaum; Kollision
  - Carves: gesammelte Beiträge oder klare Zell-Ownership
  - Teich: Ringminimum; Blocker; Wasserlinie; Tiefe; Bankreserve; Randluft
- **4 · Reflexion/Transparenz könnten klare Owner besitzen:**
  - PMREM/Probe: aktuelle ID; Bakezeitpunkt; Dispose
  - Volumen: Rückwand vor Vorderwand; getrennte Cull-Pässe
  - Zusatzkosten: Pipeline; Overdraw; Uniformsync
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - schwarzes Wasser → Front/Backface + Reflexions-ID
  - schwebender Wasserfall → Heightfield nach jedem Carve
  - teilgefüllter Teich → Wasserlinie nach jedem Modifier
  - Zähne auf Volumen → Flat Color + Cullrichtungen
  - wirkungsloser Schaum → Rohterm-Min/Max + Applied Value

## Handoffs

- Terrain → [Map-Generierung](MAP-GENERATION.md)
- Wake/Nässe → [Weltinteraktion](WORLD-INTERACTION.md)
- Transparenz → [Shader/PBR](SHADERS.md)
