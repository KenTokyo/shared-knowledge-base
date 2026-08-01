# Shader, PBR-Materialien und Renderstabilität

- **Status:** optionale „könnte“-Tipps; lokale APIs, Limits, Tools → Vorrang

## Fünf Tipps

- **1 · Echter Pipelinepfad könnte prüfen:**
  - Geometrie; Attribute; Bindings; Defines; Cull; Blend; Depth; Targetformat
  - CPU-/Buffer-/Shaderlayout: Stride; Typ; Einheit; Koordinatenraum; Reset
  - aktives Target nie gleichzeitig samplen → Copy/Ping-Pong
- **2 · Mathematikprüfung könnte enthalten:**
  - Guards vor Division; Normalize; Sqrt; Pow; Log
  - NaN und Infinity getrennt
  - Applied Value; Rohterm-Min/Max; Rotkontrolle
  - CPU-Modell → nur Kandidat; echter Frame → Entscheidung
- **3 · PBR-Rollen könnten getrennt sein:**
  - Albedo; Roughness; Metalness; Normal; AO; Emission
  - Farbtextur: sRGB; ORM/Normal/Höhe/Maske: linear
  - Map → Wert/Detail; Tint → Hue
  - Reflexionsleiter: IBL/Environment Map/PMREM → Screen-Space oder Planar Reflections nur für passende Flächen
  - SSR/Probe: Roughness; Specular-/Materialmaske; Rand-/Miss-Fallback; Zusatzkosten
  - Metallprüfung: gültige PMREM + Neutrallicht
  - Normalmap-Ferne: Specular-AA/Toksvig
- **4 · Geometrie/Transparenz könnte prüfen:**
  - Winding; Tangenten; Deformationsnormalen
  - Pixelmaß; Mips; Nyquist
  - Alpha; Depth-Test/-Write; Cullseite; Sortierung
  - Volumen: Rückwandpass → Vorderwandpass
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - CPU aktiv, Pixel leer → GPU-Konsole + Targetbesitz
  - Material schwarz → PMREM + Rohkanäle + Vertexfarben
  - Regler wirkungslos → Applied Value + Rotkontrolle
  - transparente Zähne → Flat Color + Cullrichtungen
  - Block mit festen Kanten → Finite-Sonde je Downsamplepass

## Handoffs

- Licht/Grade → [Licht/Kamera](LIGHT-CAMERA.md)
- VFX-Lifecycle → [VFX](VFX.md)
