# Echtzeit-VFX und Effekt-Audio — global

**Lesen wenn:** ein Effekt flach, verspätet, instabil, zu teuer oder nach Wiederholung anders aussieht.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

## Tipps

- **Viele Layer, keine lesbare Hauptform** — Partikel, Bloom und Licht werden erhöht, aber der Effekt bleibt beliebig. → Pro Beat eine tragende Geometrie/Spine bestimmen; Kontakt, Spray, Licht, Audio und Nachleben sind Reaktionen darauf, keine konkurrierenden Hauptformen.
  *voxel-samurai-quiz: Klassencomposer trennen Ereignis, Hauptform und wiederkehrende Beats · claude-flakes: Surf-Wake speist Mesh, Spray und Terrain aus einer Spine; Gale-Cleave ersetzte das fremde Ribbon-Motiv · 2026-07-27–08-04*

- **Sekundärlage driftet vom Effektkörper** — Spray, Licht, Decal oder Trail liegt neben der sichtbaren Bahn. → Den final ausgewerteten Weltpfad einmal sampeln und an alle Consumer reichen; keine zweite Bahn aus Spielerposition, Frame-Delta oder Handkonstanten ableiten.
  *claude-flakes: Wake-Spine treibt Kamm, Schatten, Spray und Brush · voxel-samurai-quiz: VFX-Ursprung aus gerenderten Druckhandschuhen statt `player.pos`; claude-of-tsushima: Ribbon aus `Hero.bladeAt` · 2026-07-25–08-04*

- **Sekundäreffekt feuert vor seiner sichtbaren Ursache** — Frost, Audio oder Staub erscheint beim Anlegen statt bei Wachstum/Kontakt. → Explizite Ereignisse für Ansage, Release, Kontakt, Peak und Ende führen; Consumer an den eigenen Beat hängen, nicht an einen groben Cast-State.
  *claude-flakes: `frost.grow` lag 0,11–0,60 s vor dem Prisma · voxel-samurai-quiz: typisierte `cast/implode/impact/telegraph/dash/...`-Events verhindern stille Formlücken · 2026-07-31–08-04*

- **Poolreuse trägt den vorigen Effekt weiter** — neue Instanz erbt Owner, Bewegung, Alpha oder Cursor; Vorgeschichte ändert den Shot. → Beim Acquire jedes Feld überschreiben, beim Release Owner und Sekundärobjekte lösen, beim Clear Slots plus Cursor zurücksetzen; Reset-Gate mit zwei verschiedenen Vorgeschichten fahren.
  *claude-flakes: sechs gleiche Shots rot, nach Voll-Rewind 18–20 Felder konstant · voxel-samurai-quiz: Monster- und Klassenpools scrubben vollständige Slots/Cursor; claude-of-tsushima: Reset setzt alle Poolspans, Cursor, Expiry und Hit-Light zurück · 2026-07-30–08-04*

- **Überlast erzeugt neue Objekte statt ein schwächeres Bild** — genau im größten Kampf wachsen Heap, Draws und Lichtzahl. → Feste Kapazität als Bildbudget behandeln; Priorität, FIFO-Reuse oder bewusstes Drop/Degradieren definieren und Drops zählen, nie im Overflow allokieren.
  *claude-of-tsushima: VFX wird vollständig beim Boot gepoolt, Pool ist Budget · voxel-samurai-quiz: Queue-/Familienbudgets und harte Pool-Caps · claude-flakes: fester Lichtpool verwirft den fünften Slot · 2026-05-18–08-04*

- **Tuningwert wirkt auf eine andere Schicht als gedacht** — Slider bewegt irgendetwas, Reload/Preset stellt einen fremden Stand her oder Gameplaywerte geraten ins Look-Tuning. → Authored Defaults, gespeicherte Baseline und Live-Overlay trennen; nur benannte, geklemmte Parameter whitelisten; Applied Value und Familienowner anzeigen.
  *claude-flakes: getrennte `DEFAULTS`, `baseline` und live `VFX` · voxel-samurai-quiz: Forge-Registry sanitisiert Datei, Preset und Live-Edit über dieselbe Whitelist; No-op weckt keine Shaderbrücke · 2026-07-27–08-04*

- **Mehr Peak-Licht macht den Treffer flacher** — Luma steigt, Struktur und Kontakt verschwinden in Bloom/Tonemap. → Hauptform ohne Bloom prüfen; Peak lokal geometrisch/emissiv formen, breite Staub-/Lichtlagen zeitlich nachstellen; Energie und Erasure getrennt messen.
  *claude-flakes: +52 % p99-Licht, aber −11 % Struktur · claude-of-tsushima: additive Maske wurde größer und im Mittel dunkler, Energie trotzdem +12–13 % · 2026-07-31–08-01*

## Handoffs

- Pose- und Waffenpfad → [Animation und Charakter](ANIMATION-CHARACTER.md)
- Uhren, Reset und Audio-Lifecycle → [Runtime-Integration](RUNTIME-INTEGRATION.md)
- Blend-, Alpha- und Pixelmathematik → [Shader und PBR](SHADERS.md)
- Kosten und Kapazitäten → [Performance](PERFORMANCE.md)
