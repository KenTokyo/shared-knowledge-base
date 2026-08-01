# Weltinteraktion, Spuren und Runtime-Deformation

- **Status:** optionale „könnte“-Tipps; lokale Datenformate, Persistenz, APIs → Vorrang
- **Quellprofil:** Claude Flakes → gemeinsamer Pfad für Fußspuren, Wake, Spells

## Fünf Tipps

- **1 · Kontaktereignis könnte enthalten:**
  - Welt-ID; Position; Richtung; Footprint; Intensität; Material; Zeit
  - gemeinsame Consumer: Deformation; Partikel; Decal; Audio; Gameplay
- **2 · Deformations-/Kontaktfeld könnte gemeinsam sein:**
  - Zustand: Depression; verdrängte Masse/Berm; Kompression; Eis/Nässe
  - Writer: Footprints; Tracks/Trails; Surface Wake; Krater/Spells
  - Consumer: Vertex-Displacement; Normalen; Beauty-/Shadow-Pass; Kollision/Gameplay
- **3 · Pfadspur/Wake könnte distanzbasiert sein:**
  - Samples nach Weltweg statt Frame; Footprints getrennt von kontinuierlichem Track/Trail
  - Surface Wake: Swept Mesh entlang einer Spine statt bloß Partikel
  - gleiche Spine: Kamm; Schatten; Spray; Terrainbrush
- **4 · Streaming/Reset könnte enthalten:**
  - persistenter Layer: Chunkversion; Eviction; Restore; Relaxation
  - Fensterfeld: Render-Target-Ping-Pong; toroidale World-UV; texelgesnapptes Scrollzentrum
  - neu sichtbare Texel nullen; Diffusion/Decay; beide Targets deterministisch zurücksetzen
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
