# Weltinteraktion, Spuren und Runtime-Deformation — global

**Lesen wenn:** Fußspur, Wake, Decal, Terrainreaktion oder persistente Weltspur driftet oder wächst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.

## Tipps

- **Spur und sichtbarer Kontakt liegen an verschiedenen Orten** — Jeder Consumer rekonstruiert Fuß-, Waffen- oder Wakepunkt selbst. → Kontaktereignis mit Welt-ID, finaler Position/Normale, Richtung, Footprint, Stärke und Zeit veröffentlichen; Render, Audio, Deformation und Gameplay lesen denselben Punkt.
  *claude-flakes: SnowContact/Deformation teilen den ausgewerteten Weltkontakt · voxel-samurai-quiz: Grounding-, Decal- und VFX-Composer verwenden gemeldete Kontakt-/Zielpunkte statt Spielerproxy · 2026-07-27–08-04*

- **Wake besteht aus Partikeln, nicht aus verdrängter Oberfläche** — Spray liest Bewegung, Terrainreaktion eine andere Bahn; Form zerfällt. → Distanzbasiert Spine sampeln; Swept Mesh, Kamm, Spray und Brush daraus ableiten; Frames nur als Zeitgeber, nie als Wegmaß verwenden.
  *claude-flakes: Surf-Wake nutzt eine gemeinsame Spine für Mesh/Spray/Deformation · claude-of-tsushima: Trail-Unterteilung aus realem Klingenweg; voxel-samurai-quiz: klassenlokale Trail-Source-Busse teilen die Bahn · 2026-07-31–08-04*

- **Spurkosten wachsen mit zurückgelegter Strecke** — Historie läuft als ungebundene Objektliste. → Feste Kapazität oder weltgesnapptes Fensterfeld verwenden; Scroll/Recycle nullt neu sichtbare Zellen; Reset räumt beide Ping-Pong-Seiten.
  *claude-flakes: toroidales, texelgesnapptes Ping-Pong-Deformationsfeld · voxel-samurai-quiz: Decal-/Trail-/Partikelpfade laufen über gecappte Pools mit explizitem Clear · 2026-07-27–08-04*

## Handoffs

- Weltfelder → [Map-Generierung](MAP-GENERATION.md)
- Effektform → [VFX](VFX.md)
- Kapazität → [Performance](PERFORMANCE.md)
