# Map- und Terrain-Generierung — global

**Lesen wenn:** Weltfelder, Terrain, Wege, Scatter, Bakes oder Kartenkomposition auseinanderlaufen.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.

## Tipps

- **Systeme kennen verschiedene Welten** — Render, Kollision, Navigation, Wasser und Scatter stimmen lokal, nicht an Übergängen. → Beim Boot validierten Weltvertrag für Einheiten, Achsen, Höhe, Normale, Steigung, Wasser, Wege und Belegung führen; Consumer daraus ableiten statt Werte kopieren.
  *claude-of-tsushima: `WorldSpec` = geschlossener, validierter Vertrag · voxel-samurai-quiz: Quizfall-Weltspecs speisen Weltbau und Runtime · claude-flakes: gemeinsames Deformationsfeld verbindet alle Writer/Consumer · 2026-07-28–08-04*

- **Standort passt mittig, scheitert am Rand** — Bau, Teich oder Spawn schwebt, schneidet oder läuft aus. → Footprint/Ring/Querschnitt gegen finale Oberfläche prüfen; analytischer Score wählt Kandidaten, echter Bake entscheidet.
  *claude-of-tsushima: Teich-Bakefehler 22 % Dig/45 % Fläche durch Carve und Straße · voxel-samurai-quiz: Terrain-Ankerprobe prüft Feldmarke plus alle Mutatoren statt Ortswert · 2026-07-30–08-02*

- **Mehr Ferntextur, Ferne bleibt glatt** — Frequenz liegt unter Pixelraster; Mips mitteln sie weg; Silhouette/Masse fehlt. → Projizierte Größe messen, Textursweep nach übertriebener Rotkontrolle beenden, fehlenden geometrischen/vegetativen Träger bauen.
  *claude-of-tsushima: ±150 % Albedo änderte `rel@1px` nur 0,1014→0,1060 · voxel-samurai-quiz: feine Terrainkachel ab ~450 m ohne Nutzdetail · 2026-07-29–08-01*

- **Terrainänderung hinterlässt Folgefehler** — Kamera, Spawn, Wasser, Vegetation oder Probe nutzt alten Bake. → Teure deterministische Felder gestuft backen; jede abgeleitete Ressource trägt Schema, Quellenhash, Seed, Regeln, Auflösung und Feldrevision; Änderung invalidiert alle abhängigen Artefakte gemeinsam.
  *voxel-samurai-quiz: ortsbasierter Höhencache lieferte 0 statt 16,6, bis Feldmarke in Schlüssel kam; Quizfall-Welten brauchen passende `.bin`-/Stempelpaare · claude-of-tsushima: PMREM-/Wasser- und Teichbakes drifteten nach Weltänderungen · 2026-07-30–08-07*

- **Hero-Ort gut, Laufweg leer oder unlesbar** — Detailarbeit optimiert Shot ohne Vorder-, Mittel- und Hintergrundvertrag. → Makroform, Route, Landmarke, Wasser, Vegetationsmasse und Himmel früh gemeinsam lösen; danach Materialmikrostruktur.
  *claude-of-tsushima: Weltfelder und Environment-SSoT koppeln Komposition statt Einzelobjekte · voxel-samurai-quiz: Quizfall-Weltaufträge trennen Makro-, Meso- und Mikroform · 2026-07-28–08-04*

## Handoffs

- Vollständige Weltbild-Pipeline → [Authored World Runtime](AUTHORED-WORLD-RUNTIME.md)
- Bauten/Footprints → [Bauten](BUILDINGS.md)
- Vegetation/Scatter → [Vegetation](VEGETATION.md)
- Wasser/Ufer → [Wasser](WATER.md)
- Laufzeitspuren → [Weltinteraktion](WORLD-INTERACTION.md)
