# Prozedurale Bauten und Landmarken — global

**Lesen wenn:** Bau, Brücke, Ruine oder Landmarke schwebt, schneidet, verschwindet oder Scatter falsch blockt.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

## Tipps

- **Mittelpunkt sitzt, Gebäuderand schwebt** — Standortprüfung sampelt einen Punkt, obwohl das Bauwerk Fläche belegt. → Ecken, Kanten und Footprint-Ring auf der finalen Oberfläche messen; Mesh, Collider, Clearing, Navigation und Kamera aus demselben Site-Transform ableiten.
  *claude-of-tsushima: finale Footprints/Ringe entschieden Teich- und Bauorte nach dem Rohscore · voxel-samurai-quiz: AEON-Bauten teilen Layout-, Kollisions- und Feldsampler statt unabhängiger Höhenwerte · 2026-07-26–08-04*

- **Gras, Weg oder Gegner steht im Baukörper** — jeder Scatterer besitzt eigene Blocker. → Eine Occupancy mit Kern und weichem Rand veröffentlichen; Bauten, Wege, Pads, Navigation und Spawn lesen dieselbe Maske.
  *claude-of-tsushima: `WorldSpec` bündelt Weltfelder und Bautenbelegung · voxel-samurai-quiz: AEON-Layout/Collision/Scatter führen gemeinsame Feldsampler · 2026-07-26–08-04*

- **Site ist sichtbar, Landmarke trotzdem außerhalb Kamera/Culling** — Mittelpunkt oder Weltchunk ersetzt die Bounds der echten Pieces. → Piece-Bounds nach Transform berechnen und für Framing, LOD und lokale Batches verwenden; `DoubleSide`/Culling-Off nur als Gegenprobe.
  *claude-of-tsushima: invertierte Dächer/Zylinder und echte Piece-Silhouetten statt Site-Schwerpunkt · voxel-samurai-quiz: Renderchunks müssen nach Call und Bounds statt Weltlogik geschnitten werden · 2026-07-29–08-01*

## Handoffs

- Terrainkontakt → [Map-Generierung](MAP-GENERATION.md)
- Material/Winding → [Shader und PBR](SHADERS.md)
- Framing → [Licht und Kamera](LIGHT-CAMERA.md)
