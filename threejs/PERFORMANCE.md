# Echtzeit-Performance und räumliche Kosten — global

**Lesen wenn:** Framezeit, Draws, Pools, Culling, Warm-up oder Erstauftritte zu teuer sind.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.

## Tipps

- **Weniger Instanzen, mehr Draws** — Neue Art oder kleiner Weltchunk vervielfacht Buckets und Pässe; Instanzzahl war nicht Kostentreiber. → Kosten als `sichtbare Buckets × Arten/Materialien × LOD × Beauty-/Schattenpässe` notieren; nach Renderbounds und Call schneiden, nicht nach Weltlogik.
  *claude-of-tsushima: 6 Ahorne 38 Calls, 170 Ahorne 56; Randchunk −26 % Kosten bei 2,5 % Bäumen · voxel-samurai-quiz: Chunk = Draw Call plus Bounding Sphere, nicht Weltbegriff · 2026-07-29–08-01*

- **Pool wächst im teuersten Moment** — Burst, Licht oder Effekt überläuft und allokiert unter Last. → Poolkapazität als Qualitätsbudget festlegen; bei Überlast priorisiert droppen/recyceln, Telemetrie führen, nie still wachsen.
  *claude-of-tsushima: VFX-Pools entstehen vollständig beim Boot · voxel-samurai-quiz: harte Caps, Queue-/Familien-/Batch-Drops · claude-flakes: fester Lichtpool verwirft Überlauf · 2026-05-18–08-04*

- **Kein `new`, trotzdem GC-Druck** — Variadische Mathe, Boxing, temporäre Arrays oder Harness-Code allokieren im Framepfad. → Site isolieren, warme Nullkontrolle fahren, primitive Arithmetik und wiederverwendete Scratchwerte gegenmessen; Profilerfund erst nach echtem Korpus-A/B ändern.
  *claude-flakes: `Math.hypot`/HeapNumbers 126.982→131 B/Update, Gesamt 86.148→6.709 B/Frame · voxel-samurai-quiz: Rig-, Pool- und Composerpfade halten Scratch/Slots außerhalb des Frames · 2026-07-31–08-04*

- **Warm-up grün, Erstauftritt bleibt** — Compile sieht falsches Target, falsche Lichtzahl oder andere, nicht montierte Variante. → Spätere Materialien/Geometrien exakt gegen echte Environment- und Targetparameter wärmen; Erfolg an neuen Programmen beim Erstauftritt messen, nicht an fehlerfreiem `compile()`.
  *voxel-samurai-quiz: falsches Render-Target kostete ~6,3 s Ladezeit; anderes Bossprofil ließ 10 Erstauftrittsprogramme stehen · claude-flakes: „First-Cast“ folgte Laufposition, nicht Ability; 19 Materialien/9 Postpässe waren bereits eager · 2026-07-31–08-02*

- **Leerlaufhülle als Optimierung ausgehängt** — Null aktive Instanzen sparen keinen Draw; Unmount gibt Materialien/Programme frei; nächste Salve kompiliert neu. → Renderer mit echtem Nullpfad montiert lassen; Instanzzahl null und `visible=false` am Mesh, Feature-Schalter nur für dauerhafte Deaktivierung.
  *voxel-samurai-quiz: 4 Layer×11 Meshes, Thrash-Schlüssel 9→0, Kompilate 50→5/65→2 · claude-of-tsushima: feste Boot-Pools setzen inaktive Spans außerhalb des Bilds statt Renderer zu erzeugen/zerstören · 2026-08-02–04*

- **Culling prüft erfundene Hülle** — Stock-Bounds decken instanzierte Weltpositionen nicht ab; fehlende Sphere crasht trotz `frustumCulled=false`. → Hülle nach letzter Positions-/Matrixänderung explizit setzen und gegen echte Instanzextents prüfen; Culling nur abschalten, wenn Test nachweislich teurer oder bedeutungslos.
  *voxel-samurai-quiz: 1.524 Traversalfehler durch fehlende Geometry-Sphere; Stock-Bounds entwerteten Gras-/Terrainculling · claude-of-tsushima: Chunk-/Tree-Cost hängt an lokalen Renderbounds statt Weltpopulation · 2026-07-30–08-02*

- **Qualitätsstufe tauscht Weltcharakter gegen FPS** — Pauschales Abschalten entfernt Skyline, Route, Bodenlesbarkeit oder Kampfkontakt. → Eine Weltlaufzeit behalten; zuerst interne Auflösung, sinnloses Fern-LOD, Schattenreichweite, Reflexions-/PostFX-Qualität, Ambient-Life-Takt und Hintergrunddichte skalieren; authored Landmarken, sichere Wege und Gameplayklarheit schützen.
  *claude-of-tsushima: räumliche Buckets und passbezogene Kosten · voxel-samurai-quiz: Quizfall World Runtime skaliert Weltqualität ohne zweiten Renderer · 2026-08-01–08-07*

## Handoffs

- Vollständige Weltbild-Pipeline → [Authored World Runtime](AUTHORED-WORLD-RUNTIME.md)
- Messaufbau und Verteilungen → [Messhandwerk](MEASURING.md)
- Shader-/Passkosten → [Shader und PBR](SHADERS.md)
- Effektkapazitäten → [VFX](VFX.md)
