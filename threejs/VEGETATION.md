# Vegetation, Scatter und Ambient Life — global

**Lesen wenn:** Gras, Bäume, Scatter, LOD oder Fernvegetation trotz hoher Dichte falsch aussehen oder zu teuer sind.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

## Tipps

- **Mehr Arten, weniger Vegetation, höhere Kosten** — Spezies erzeugt neue Material-/Chunk-/Pass-Buckets; Instanzzahl sinkt, Drawzahl steigt. → Arten pro sichtbarem Bucket zählen, Material teilen und seltene Arten räumlich bündeln statt überall einen Bucket zu öffnen.
  *claude-of-tsushima: 6 Ahorne 38 Calls, 170 Ahorne 56 · voxel-samurai-quiz: Kostenmodell `Chunks × Arten × LOD × Pässe` · 2026-07-29–08-01*

- **Coverage stimmt, Vegetation liest als falsches Motiv** — dieselbe Fläche entsteht aus wenigen großen Büscheln oder tausenden Pixelkarten. → projizierte Größe, Cluster, Lücken und dominante Silhouette neben Coverage messen; Form vor Count korrigieren.
  *claude-of-tsushima: 1.728 Zwei-Pixel-Vögel erfüllten dieselbe Deckung wie das Zielmotiv · voxel-samurai-quiz: Bild-Featurebreite 0,60× Referenz trotz 8,95-mm-Einzelhalm · 2026-07-31–08-01*

- **Fernvegetation wird durch mehr Textur nur ruhiger** — Blatt-/Halmfrequenz fällt unter Mip-/Pixelmaß; Masse fehlt. → Distanzrollen trennen: nah Kontakt/Material, mittel Cluster/Lücken, fern Kronenlinie/Biomfläche; unauflösbares Feindetail ausblenden.
  *claude-of-tsushima: Fernalbedo-Sweep fast wirkungslos, 77 % Zielband ohne Baum-Biom · voxel-samurai-quiz: Feindetail jenseits ~450 m ohne Nutzsignal · 2026-07-29–08-01*

- **Scatter endet sauber an einer unsichtbaren Kante** — voller Zielarray-Cap bricht den Scan ab und schneidet den Rest der Welt weg. → Bedarf vor Cap vollständig zählen, Capping melden und fair/deterministisch ausdünnen; Weltfläche nie durch frühen Arrayabbruch bestimmen.
  *claude-of-tsushima: 26.000/26.000 wirkte voll, Bedarf war 34.348 · voxel-samurai-quiz: kamerazentriertes Gitter bindet Population an Sichtweite statt Weltgröße · 2026-07-31–08-01*

## Handoffs

- Weltfelder/Blocker → [Map-Generierung](MAP-GENERATION.md)
- Draws/LOD → [Performance](PERFORMANCE.md)
- Texturfilterung → [Shader und PBR](SHADERS.md)
