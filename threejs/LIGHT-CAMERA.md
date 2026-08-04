# Licht, Kamera, Farbraum und PostFX — global

**Lesen wenn:** Framing, Kameraübergang, Lichtkontinuität, Schatten, HDR oder PostFX falsch wirken.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

## Tipps

- **Kamera übernimmt den Gang des Körpers** — jeder Schritt bewegt Fokus/Horizont; Pausenbilder bleiben grün. → Fokus vom Becken entkoppeln, kontinuierlich federn und Zeitverhalten mit Bewegung, Reset und Schwellenübergang prüfen; Kollision asymmetrisch behandeln, falls schnelles Einziehen wichtiger als Ausfahren ist.
  *claude-of-tsushima: `CameraRig` nutzt Spring-Fokus sowie schnelles Einziehen/langsames Ausfahren · voxel-samurai-quiz: 14/14 Posen übersahen Dämpfungs-, Reset- und Fallklippenfehler · 2026-08-01–08-04*

- **Auge bewegt, Motiv bleibt angeblich gleich** — Hub/Dolly verbessert Freigang und schiebt Figur, Füße oder Landmarke aus dem Randbudget. → Vor Neupeilen Bildversatz aus Arm/FOV/Aspect abschätzen; danach Motiv- und Randkontrolle gemeinsam messen, nicht nacheinander optimieren.
  *voxel-samurai-quiz: Hub bis 4,11 m verlor Figur in 2/14 Shots; Neupeilen senkte Gegnersichtbarkeit um 76 % · claude-of-tsushima: Fill-Score belohnte abgeschnittene Füße in 11/12 Kandidaten · 2026-08-01*

- **Licht erscheint, ein Spielframe kompiliert die Szene neu** — sichtbare Lichtzahl wird Teil der Shader-/Pipelinevariante; Unmount oder `visible=false` ändert Kardinalität. → Feste Lichtplätze vom Boot bis zum Ende halten, leere Slots mit Intensität null deklarieren und Wünsche pro Frame einspeisen; Slotzahl nicht an Spawn, Etage oder Qualitätswechsel koppeln.
  *voxel-samurai-quiz: 55 Lichtzahl-Relinks, teuerster Bossframe 21,8 s→3,9 s; drei Apex-Slots kosteten 0,2–0,7 ms/Frame · claude-flakes: unabhängiger fester Spell-Light-Pool, per Frame deklariert · 2026-08-02–08-04*

- **Post-Regler soll einen HDR-Defekt reparieren** — Grade/Tonemapping komprimiert nur eine bereits überstrahlte oder nichtfinite Szene. → Rohterm → Scene-HDR → Einzelpass → Tonemap/Grade → LDR verfolgen; Clipping und Nichtfinites vor jedem Downsample prüfen.
  *claude-of-tsushima: Dämmerungshimmel lag bei 1,3–2,7 linear, sonnennah 7–20 · claude-flakes: ein NaN-Texel wurde als 16-px-PostFX-Block vergrößert · 2026-07-30–31*

- **Lichtsysteme stimmen einzeln, gemeinsam nicht** — Sonne, Nebel, Wasser, Vegetation und Grade lesen unterschiedliche Tageszustände. → Eine Environment-SSoT liefert Richtung, Farbe, Intensität, Atmosphäre und Grade; Materialien hängen über einen legalen Hookpfad daran statt eigene Sonne zu addieren.
  *claude-of-tsushima: `Environment` schreibt gemeinsamen Uniformblock und CSM; ohne `engine.lit()` beleuchteten alle Kaskadenlichter ein Standardmaterial N-fach · claude-flakes: Spell-Lights werden vor der Consumer-Schleife an alle sichtbaren Materialconsumer übertragen · 2026-07-28–08-04*

## Handoffs

- Material-/Shaderpfad → [Shader und PBR](SHADERS.md)
- Kamera als Gameplayrichtung → [Runtime-Integration](RUNTIME-INTEGRATION.md)
- Kostenmessung → [Performance](PERFORMANCE.md)
