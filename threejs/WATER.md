# Wasser und Landschaftskontakt — global

**Lesen wenn:** Meer, Fluss, Teich, Wasserfall, Ufer, Schaum oder transparentes Volumen falsch wirken.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.

## Tipps

- **Wasser ist schwarz, Materialtuning hilft nicht** — Winding, Cullseite, Depth-Reihenfolge oder Reflexionsressource stimmt nicht. → Zuerst Flat-Color und Front/BackSide, dann Depth/Sortierung, zuletzt PBR/Grade prüfen.
  *claude-of-tsushima: invertierter Ozeanring und veraltete PMREM-Texture-ID · claude-flakes: transparente Röhre brauchte getrennte Fern-/Nahwand-Cull-Pässe statt Materialtuning · 2026-07-28–30*

- **Teich passt ins Rohfeld, läuft im Spiel aus** — Spätere Carves, Straße oder Glättung verändern Ringminimum und Uferreserve. → Standort im Rohfeld wählen; Wasserlinie/Footprint nach jedem Modifier am finalen Bake prüfen; Wege und Bauten als Blocker einbeziehen.
  *claude-of-tsushima: Straße füllte Wanne, Bakefehler 22 % Dig/45 % Fläche · voxel-samurai-quiz: Terrain-Anker müssen Feldrevision und alle Mutatoren tragen · 2026-07-30–08-02*

- **Schaumregler bewegt nichts** — Schwelle stammt aus theoretischer Amplitudensumme statt realer Wellenverteilung oder liegt außerhalb der Presettabelle. → Rohterm p50/p90/p99/max ausgeben; Applied Value lesen; Rampenende aus speisender Tabelle ableiten.
  *claude-of-tsushima: theoretisch 0,917/1,5 m, reales Maximum 1,4502 m; ausgelieferter Sturm erreichte nur Gate 0,7222 · claude-flakes: Kontakt/Frost brauchte größeres Coverage-Fenster vor mehr Amplitude · 2026-07-31–08-02*

- **Wasserbewegung und Wake erzählen zwei Wege** — Normaldetail, Spine, Spray und Uferkontakt driften. → Flussrichtung/Spine als Weltweg besitzen; Geometrie trägt Silhouette/Wake; Flow-/Normalmap nur Oberflächendetail; Kontaktconsumer lesen denselben Pfad.
  *claude-flakes: Surf-Wake teilt Spine zwischen Mesh, Spray und Terrain · voxel-samurai-quiz: Wasserlayer trennen Geometrie-/Terrainvertrag von Shaderdetail · 2026-07-28–08-04*

## Handoffs

- Terrain/Carves → [Map-Generierung](MAP-GENERATION.md)
- Wake/Spuren → [Weltinteraktion](WORLD-INTERACTION.md)
- Transparenz/PBR → [Shader und PBR](SHADERS.md)
