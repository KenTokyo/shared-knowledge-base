# Vegetation, Scatter und Ambient Life

- **Status:** optionale „könnte“-Tipps; lokale Arten, Dichten, Reichweiten → Vorrang

## Fünf Tipps

- **1 · Distanzrollen könnten getrennt sein:**
  - nah → Fußpunkt, Form, Material
  - mittel → Masse, Cluster, Lücken, Wind
  - fern → Flächenstruktur, Kronenlinie, Biomsilhouette
- **2 · Vegetationsfelder könnten getrennt bleiben:**
  - Wuchsrecht; Dichte; Art; Größe; LOD; Life/VFX-Region
  - gemeinsame Blocker: Wege; Pads; Wasser; Bauten; Kampfbereiche
- **3 · Kartenprüfung könnte enthalten:**
  - Weltmaß; Atlaszelle; `flipY`; Padding; Alpha-Rand
  - projizierte Pixel; Kartenanzahl; Kartenfläche; Winding; Kronenlöcher
  - Scatter: Cluster; Lichtungen; Altersstufen; unregelmäßige Ränder
- **4 · Gras/Wind/LOD könnten getrennte Owner besitzen:**
  - Breite; Länge; Krümmung; Neigung; Tiefenstaffelung
  - gemeinsame Windrichtung/Gusts; rollenabhängige Frequenz/Amplitude
  - Chunk-Bounds; masseerhaltendes Fern-LOD; kürzere Schattenreichweite
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - flaches Gras → Boden-only; DOF; CA; SSAO; Geometrietiefe
  - leerer Hain → Dichtefeld + Biom-ID + Artenclassifier
  - dunkle Krone → Front/Backface + Caster-A/B
  - Kameraabhängiges Poppen → Hysterese-A/A
  - hohe Dichte, schwache Form → Cluster/Silhouette vor mehr Count

## Handoffs

- Terrain → [Map-Generierung](MAP-GENERATION.md)
- Materialfilterung → [Shader/PBR](SHADERS.md)
- Kosten → [Performance](PERFORMANCE.md)
