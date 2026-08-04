# Map- und Terrain-Generierung — global

**Lesen wenn:** Weltfelder, Terrain, Wege, Scatter, Bakes oder Kartenkomposition auseinanderlaufen.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

## Tipps

- **Jedes System kennt eine andere Welt** — Render, Kollision, Navigation, Wasser und Scatter stimmen lokal, aber nicht an Übergängen. → Einen beim Boot validierten Weltvertrag für Einheiten, Achsen, Höhe, Normale, Steigung, Wasser, Wege und Belegung führen; Consumer leiten ab statt kopieren.
  *claude-of-tsushima: `WorldSpec` ist geschlossener, validierter Vertrag · voxel-samurai-quiz: AEON-Kartenspecs speisen Weltbau und Runtime · claude-flakes: gemeinsames Deformationsfeld verbindet alle Writer/Consumer · 2026-07-28–08-04*

- **Standort passt am Mittelpunkt und scheitert am Rand** — Bau, Teich oder Spawn schwebt, schneidet oder läuft aus. → Footprint/Ring/Querschnitt gegen die finale Oberfläche prüfen; analytischer Score wählt Kandidaten, der echte Bake entscheidet.
  *claude-of-tsushima: Teich-Bakefehler 22 % Dig/45 % Fläche durch Carve und Straße · voxel-samurai-quiz: Terrain-Ankerprobe prüft Feldmarke plus alle Mutatoren statt Ortswert · 2026-07-30–08-02*

- **Mehr Ferntextur, gleiche glatte Ferne** — Frequenz liegt unter dem Pixelraster und Mips mitteln sie weg; Silhouette/Masse fehlt. → projizierte Größe messen, Textursweep nach einer übertriebenen Rotkontrolle beenden und den fehlenden geometrischen/vegetativen Träger bauen.
  *claude-of-tsushima: ±150 % Albedo änderte `rel@1px` nur 0,1014→0,1060 · voxel-samurai-quiz: feine Terrainkachel ab ~450 m ohne Nutzdetail · 2026-07-29–08-01*

- **Terrainänderung lässt nur Folgefehler zurück** — Kamera, Spawn, Wasser, Vegetation oder Probe nutzt einen alten Bake. → Jede abgeleitete Ressource trägt Schema, Quellenhash und Feldrevision; Modifieränderung invalidiert alle abhängigen Artefakte gemeinsam.
  *voxel-samurai-quiz: ortsbasierter Höhencache lieferte 0 statt 16,6 bis Feldmarke in den Schlüssel kam · claude-of-tsushima: PMREM-/Wasser- und Teichbakes drifteten nach Weltänderungen · 2026-07-30–08-02*

- **Hero-Ort gut, Laufweg leer oder unlesbar** — Detailarbeit optimiert einen Shot ohne Vorder-, Mittel- und Hintergrundvertrag. → Makroform, Route, Landmarke, Wasser, Vegetationsmasse und Himmel früh zusammen lösen; erst danach Materialmikrostruktur.
  *claude-of-tsushima: Weltfelder und Environment-SSoT koppeln Komposition statt Einzelobjekte · voxel-samurai-quiz: AEON-Weltaufträge trennen Makro-, Meso- und Mikroform · 2026-07-28–08-04*

## Handoffs

- Bauten/Footprints → [Bauten](BUILDINGS.md)
- Vegetation/Scatter → [Vegetation](VEGETATION.md)
- Wasser/Ufer → [Wasser](WATER.md)
- Laufzeitspuren → [Weltinteraktion](WORLD-INTERACTION.md)
