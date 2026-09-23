# Licht, Kamera, Farbraum und PostFX — global

**Lesen wenn:** Framing, Kameraübergang, Lichtkontinuität, Schatten, HDR oder PostFX falsch wirken.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.

## Tipps

- **Kamera übernimmt Körpergang** — Jeder Schritt bewegt Fokus/Horizont; Pausenbilder bleiben grün. → Fokus vom Becken entkoppeln, kontinuierlich federn, Zeitverhalten bei Bewegung, Reset und Schwellenübergang prüfen; Kollision asymmetrisch behandeln, falls schnelles Einziehen wichtiger als Ausfahren ist.
  *claude-of-tsushima: `CameraRig` nutzt Spring-Fokus sowie schnelles Einziehen/langsames Ausfahren · voxel-samurai-quiz: 14/14 Posen übersahen Dämpfungs-, Reset- und Fallklippenfehler · 2026-08-01–08-04*

- **Auge bewegt, Motiv bleibt angeblich gleich** — Hub/Dolly verbessert Freigang, schiebt aber Figur, Füße oder Landmarke aus Randbudget. → Vor Neupeilen Bildversatz aus Arm/FOV/Aspect abschätzen; danach Motiv- und Randkontrolle gemeinsam messen statt nacheinander optimieren.
  *voxel-samurai-quiz: Hub bis 4,11 m verlor Figur in 2/14 Shots; Neupeilen senkte Gegnersichtbarkeit um 76 % · claude-of-tsushima: Fill-Score belohnte abgeschnittene Füße in 11/12 Kandidaten · 2026-08-01*

- **Licht erscheint, ein Spielframe kompiliert Szene neu** — Sichtbare Lichtzahl bestimmt Shader-/Pipelinevariante; Unmount oder `visible=false` ändert Kardinalität. → Feste Lichtplätze von Boot bis Ende halten, leere Slots mit Intensität null deklarieren, Wünsche pro Frame einspeisen; Slotzahl nicht an Spawn, Etage oder Qualitätswechsel koppeln.
  *voxel-samurai-quiz: 55 Lichtzahl-Relinks, teuerster Bossframe 21,8 s→3,9 s; drei Apex-Slots kosteten 0,2–0,7 ms/Frame · claude-flakes: unabhängiger fester Spell-Light-Pool, per Frame deklariert · 2026-08-02–08-04*

- **Post-Regler soll HDR-Defekt reparieren** — Grade/Tonemapping komprimiert nur bereits überstrahlte oder nichtfinite Szene. → Rohterm → Scene-HDR → Einzelpass → Tonemap/Grade → LDR verfolgen; Clipping und Nichtfinites vor jedem Downsample prüfen.
  *claude-of-tsushima: Dämmerungshimmel lag bei 1,3–2,7 linear, sonnennah 7–20 · claude-flakes: ein NaN-Texel wurde als 16-px-PostFX-Block vergrößert · 2026-07-30–31*

- **Ganzes Bild milchig, Nahbereich ebenfalls** — Additive Dunst-, Wolken- oder Horizontkarten liegen auf Radius **innerhalb** der Kameraumlaufbahn; Kamera blickt durch Nebelwand statt daran vorbei, additives Blending hellt ohne Tiefenwirkung auf. → Radius jeder Atmosphärenkarte gegen Kameraumlaufradius prüfen: Horizontband hinter Kamerabahn, Wolkendeck über Öffnungswinkel; additive Schicht nie zwischen Auge und Motiv.
  *voxel-samurai-quiz: 46 Dunstkarten à 96 Units auf Radius 258 bei Kameraumlauf 300 ergaben eine geschlossene additive Wand direkt vor der Linse · 2026-08-05*

- **Lichtsysteme stimmen einzeln, gemeinsam nicht** — Sonne, Nebel, Wasser, Vegetation und Grade lesen verschiedene Tageszustände. → Eine Environment-SSoT liefert Richtung, Farbe, Intensität, Atmosphäre, Wind, Wetter, Schatten, Belichtung und Grade; Materialien über legalen Hookpfad anbinden statt eigene Sonne zu addieren.
  *claude-of-tsushima: `Environment` schreibt gemeinsamen Uniformblock und CSM; ohne `engine.lit()` beleuchteten alle Kaskadenlichter ein Standardmaterial N-fach · claude-flakes: Spell-Lights werden vor der Consumer-Schleife an alle sichtbaren Materialconsumer übertragen · 2026-07-28–08-04*

- **Gute Welt wirkt durch Standardkamera und Einzelpass beliebig** — Schulterhöhe, Dämpfung, Sichtweite, Schatten und Finalbild wurden nicht als ein Vertrag gebaut. → Gameplaykamera mit Schulterabstand/-höhe, Fokusfeder, Kollision, First/Third Person, Reset und authored Views festlegen; ein HDR-Finalpfad ordnet Tone Mapping, Bloom, God Rays, Tiefenunschärfe, Ambient Occlusion und Grade nach klaren Bildrollen und Kosten.
  *claude-of-tsushima: CameraRig, CSM, Environment und PostFX bilden ein Weltbild · voxel-samurai-quiz: Quizfall World Runtime übernimmt Kamera, Schatten und Finalbild gemeinsam · 2026-08-01–08-07*

## Handoffs

- Vollständige Weltbild-Pipeline → [Authored World Runtime](AUTHORED-WORLD-RUNTIME.md)
- Material-/Shaderpfad → [Shader und PBR](SHADERS.md)
- Kamera als Gameplayrichtung → [Runtime-Integration](RUNTIME-INTEGRATION.md)
- Kostenmessung → [Performance](PERFORMANCE.md)
