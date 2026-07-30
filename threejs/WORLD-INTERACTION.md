# Weltinteraktion, Spuren und Runtime-Deformation

- **Status:** optionale „könnte“-Tipps; lokale Datenformate, Persistenz, APIs → Vorrang
- **Quellprofil:** Claude Flakes → gemeinsamer Pfad für Fußspuren, Wake, Spells

## Fünf Tipps

- **1 · Kontaktereignis könnte enthalten:**
  - Welt-ID; Position; Richtung; Footprint; Intensität; Material; Zeit
  - gemeinsame Consumer: Deformation; Partikel; Decal; Audio; Gameplay
- **2 · Weltlayer könnte gemeinsam sein:**
  - Spuren; Krater; Nässe; Frost; Wake
  - Consumer: Terrain; Normalen; Schatten; Kollision; Vegetation; Navigation
- **3 · Pfadspur könnte distanzbasiert sein:**
  - Samples nach Weg statt Frame
  - gleiche Spine: Kamm; Schatten; Spray; Terrainbrush
  - Fußspuren getrennt von kontinuierlicher Wake
- **4 · Streaming/Reset könnte enthalten:**
  - Chunkversion; Eviction; Restore; Relaxation
  - Buffer; Scrollzentrum; Ping-Pong; Cursor; Uhr; Wegmesser; Wake-Geometrie
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - Abdruck neben Fuß → Plant-Frame + sichtbare Fußposition
  - Spur am Hang falsch → finale Höhe + Normale + Footprint
  - Render/Gameplayspur driftet → gleicher Weltpunkt
  - Reloadfehler → Chunkversion + Restore
  - Kosten wachsen mit Strecke → Kapazität + aktive Samples + Draws

## Handoffs

- Terrain → [Map-Generierung](MAP-GENERATION.md)
- Wasser → [Wasser](WATER.md)
- VFX → [VFX](VFX.md)
