# Echtzeit-VFX und Effekt-Audio — global

**Lesen wenn:** ein Effekt flach, verspätet, instabil, zu teuer oder nach Wiederholung anders aussieht.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.

## Combat-/Skill-VFX — Quellenvertrag

- Sichtbare Effektformen entstehen aus handgeschriebenem GLSL und zur Laufzeit per Code erzeugter Geometrie; neutrale prozedurale Shader-/Geometriekerne dürfen geteilt werden, sichtbare Skill-Shells nicht.
- Verboten: geladene Bitmap-, Noise-, LUT- oder Decal-Texturen, Sprite-Sheets, Flipbooks, Videos, gebackene VFX-Meshes, importierte Effektpakete und kopierte Fremdshader.
- Erlaubt: `ShaderMaterial`/gezielte Material-Patches, SDFs, analytisches Noise, parametrisierte Ribbons/Tubes/Quads, `InstancedMesh`/`InstancedBufferGeometry`, codegenerierte Solids und rendererinterne Depth-/Color-Targets für Soft Intersection/PostFX.
- Charakter-, Waffen- und Weltassets fallen nicht unter das VFX-Verbot; sie dürfen keine versteckten gebackenen Effektflächen oder Animations-Flipbooks tragen.
- Prozedural bedeutet kein Pool-Spam: Hauptform, Beat, Raumanker, feste Kapazität, Blend-/Depth-Rolle und Degradation bleiben explizit.

## Tipps

- **Viele Layer, keine lesbare Hauptform** — Mehr Partikel, Bloom und Licht; Effekt bleibt beliebig. → Pro Beat tragende Geometrie/Spine bestimmen; Kontakt, Spray, Licht, Audio und Nachleben darauf reagieren lassen, nicht zu konkurrierenden Hauptformen machen.
  *voxel-samurai-quiz: Klassencomposer trennen Ereignis, Hauptform und wiederkehrende Beats · claude-flakes: Surf-Wake speist Mesh, Spray und Terrain aus einer Spine; Gale-Cleave ersetzte das fremde Ribbon-Motiv · 2026-07-27–08-04*

- **Sekundärlage driftet vom Effektkörper** — Spray, Licht, Decal oder Trail driftet von sichtbarer Bahn ab. → Final ausgewerteten Weltpfad einmal sampeln, allen Consumern reichen; keine zweite Bahn aus Spielerposition, Frame-Delta oder Handkonstanten ableiten.
  *claude-flakes: Wake-Spine treibt Kamm, Schatten, Spray und Brush · voxel-samurai-quiz: VFX-Ursprung aus gerenderten Druckhandschuhen statt `player.pos` · claude-of-tsushima: Ribbon aus `Hero.bladeAt` · avatar-casting-abilities: `_samplePath` speist Kopf, Trailfenster, Licht und Emission (Codegegenprobe ohne History) · 2026-07-25–08-04*

- **Sekundäreffekt feuert vor sichtbarer Ursache** — Frost, Audio oder Staub erscheint beim Anlegen statt bei Wachstum/Kontakt. → Explizite Ereignisse für Ansage, Release, Kontakt, Peak und Ende führen; jeden Consumer an seinen Beat hängen, nicht an groben Cast-State.
  *claude-flakes: `frost.grow` lag 0,11–0,60 s vor dem Prisma · voxel-samurai-quiz: typisierte `cast/implode/impact/telegraph/dash/...`-Events verhindern stille Formlücken · 2026-07-31–08-04*

- **Poolreuse trägt vorigen Effekt weiter** — Neue Instanz erbt Owner, Bewegung, Alpha oder Cursor; Vorgeschichte verändert Shot. → Beim Acquire alle Felder überschreiben; beim Release Owner und Sekundärobjekte lösen; beim Clear Slots und Cursor zurücksetzen; Reset-Gate mit zwei verschiedenen Vorgeschichten fahren.
  *claude-flakes: sechs gleiche Shots rot, nach Voll-Rewind 18–20 Felder konstant · voxel-samurai-quiz: Monster- und Klassenpools scrubben vollständige Slots/Cursor; claude-of-tsushima: Reset setzt alle Poolspans, Cursor, Expiry und Hit-Light zurück · 2026-07-30–08-04*

- **Überlast erzeugt neue Objekte statt schwächeres Bild** — Im größten Kampf wachsen Heap, Draws und Lichtzahl. → Feste Kapazität als Bildbudget behandeln; Priorität, FIFO-Reuse oder bewusstes Drop/Degradieren definieren; Drops zählen; im Overflow nie allokieren.
  *claude-of-tsushima: VFX wird vollständig beim Boot gepoolt, Pool ist Budget · voxel-samurai-quiz: Queue-/Familienbudgets und harte Pool-Caps · claude-flakes: fester Lichtpool verwirft den fünften Slot · 2026-05-18–08-04*

- **Tuningwert wirkt auf andere Schicht als gedacht** — Slider verändert irgendetwas; Reload/Preset stellt fremden Stand her; Gameplaywerte geraten ins Look-Tuning. → Authored Defaults, gespeicherte Baseline und Live-Overlay trennen; nur benannte, geklemmte Parameter whitelisten; Applied Value und Familienowner anzeigen.
  *claude-flakes: getrennte `DEFAULTS`, `baseline` und live `VFX` · voxel-samurai-quiz: Forge-Registry sanitisiert Datei, Preset und Live-Edit über dieselbe Whitelist; No-op weckt keine Shaderbrücke · avatar-casting-abilities: Settings/Preset laden per Deep-Merge in dieselben Live-Objekte (Codegegenprobe ohne History) · 2026-07-27–08-04*

- **Mehr Peak-Licht macht Treffer flacher** — Luma steigt; Struktur und Kontakt verschwinden in Bloom/Tonemap. → Hauptform ohne Bloom prüfen; Peak lokal geometrisch/emissiv formen; breite Staub-/Lichtlagen zeitlich nachstellen; Energie und Erasure getrennt messen.
  *claude-flakes: +52 % p99-Licht, aber −11 % Struktur · claude-of-tsushima: additive Maske wurde größer und im Mittel dunkler, Energie trotzdem +12–13 % · 2026-07-31–08-01*

## Handoffs

- Pose- und Waffenpfad → [Animation und Charakter](ANIMATION-CHARACTER.md)
- Uhren, Reset und Audio-Lifecycle → [Runtime-Integration](RUNTIME-INTEGRATION.md)
- Blend-, Alpha- und Pixelmathematik → [Shader und PBR](SHADERS.md)
- Kosten und Kapazitäten → [Performance](PERFORMANCE.md)
