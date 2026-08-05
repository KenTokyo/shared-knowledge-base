# Capture und Messhandwerk — claude-flakes

**Lesen wenn:** `tools/shoot.mjs`, `src/capture/`, Presets, A/A, A/B, Crops oder Bildmetriken.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Headless-Capture zielt in die Bildecke** — Bilder plausibel, Effekt aber klein, fern, „unsichtbar" oder ganz aus dem Bild; headless verweigert Chrome den Pointer-Lock, die Bridge setzt `input.locked` nicht selbst, und ein nie bewegter Cursor steht auf Client-Pixel (0,0) = NDC (-1,+1) statt Bildmitte. → Capture-Bridge setzt `input.locked` in `begin()` und gibt den Vorwert in `end()` zurück; Zielpunkt per `--stats` gegen `Linsenhöhe/tan(pitch)` gegenrechnen, nicht am Bild beurteilen.
  *53 Bilder zweier Pässe landeten auf dem 22-m-Reichweitencap am linken Bildrand; neun als VFX-Fehler notierte Befunde waren Kadrierung; gemessen 14,289 m gegen geforderte 14,274 m · 2026-08-05*

- **Renderer nie annehmen, immer messen** — `--use-angle=vulkan`/`--enable-features=Vulkan` ergaben Adapter `null`, `--disable-vulkan-surface` entfernte `navigator.gpu`; ein Softwarecheck über die Geräteliste sieht den Basic Render Driver neben der aktiven RTX. → Nur `--headless=new`; aktives Gerät plus `glRenderer` lesen, Software = Exit statt Warnung.
  *Ohne Zusatzflag NVIDIA, drei WebGPU-Flags einzeln widerlegt; RTX 2080 aktiv, Basic Driver nur zweiter Eintrag · 2026-07-29*

- **Freeze erzeugt Schwarz** — `h=0` macht `(velocity-prevVelocity)/h` zu NaN bis View-Matrix. → Zeitdivisoren/Solver auf `dt<=0`, NaN, negative Schritte; NaN-Detektor vergiften.
  *Schwarzframe; `heightAt→NaN` löste danach 36 Diagnosen · 2026-07-29*

- **Welt läuft zwischen CDP-Kommandos** — `cast()` und `advance()` trennten ~10 Frames/0,15 s. → Simulationszeit nur im gelatchten Request-Frame; Readback direkt nach `scene.render()`.
  *Größter Determinismusfehler; `_serving` kontrollierte Zeitpunkt · 2026-07-29*

- **`clear()` löscht Bild, nicht Geschichte** — Cloth, Federn, TAA, Uhren, Prismen, Debts überleben. → Ein vollständiger Rewind für GPU-Daten, Cursor, Debts, Clocks, History; RNG zuletzt.
  *A/A mit TAA ~5,8→0,00 %; sechs Sweep-Zeitpunkte delta max 0 · 2026-07-29/30*

- **Gleiche Random-Züge, anderes Bild** — `_formOwed` verschiebt vier Körner um einen Frame. → A/A fingerprintet Hash, Live-Zahl, Cursor, Debts; Float-Bytes statt Summen.
  *3/9 Shots exakt zweiter Zustand; 4 Körner änderten 11,47 % Frame · 2026-07-30*

- **„Default“ erbt Kamera** — `pose()` überschreibt nur gelieferte Achsen. → Kamera aus vollständigem Default plus Shot-Diff.
  *`far,default`: Pitch 0,260/Distanz 11 statt 0,170/6,2 · 2026-07-30*

- **Korrekter Eventzeitpunkt fotografisch leer** — Presets lagen auf Release vor sichtbarer Geometrie/Staub. → Zeitstreifen ums Ereignis; erster lesbarer Frame, zwei Frames vor Release Reserve.
  *Bloom 0,45→0,50 s; Crystallise Durchbruch 1,4 s, eindeutig 1,6 s · 2026-07-29/30*

- **Rauschboden als Projektkonstante** — je Sitzung/Look A/A bitgleich oder Delta 2–4. → Boden gleiche Sitzung, Look, Vorgeschichte; `notaa` für Shader-A/B.
  *`notaa` mehrfach 25/25 bitgleich; `shadow`/`zoom` Delta 2 in derselben Sitzung · 2026-07-30/31*

- **A/B verschiebt RNG statt Term** — Audio/Vapor-Emission bewegt Shards/Partikel. → Streamneutrale Hebel: Shaderterm, `discard`, Opazität, Skalar nach RNG-Zug.
  *Audio-Reset bewegte 14 % Crystallise bis Delta 84; Solo-`discard` isolierte Vapor · 2026-07-30*

- **Ganzbildmetrik misst Fremdsubjekt** — `clipped` sieht Sonne; Hochpass belohnt Aliasing; Crops verfehlen Körner. → Region aus echtem Frame, Maske/Nachbarschaft aufs Subjekt, Kontrollcrop.
  *Formationscrop 20/20 bei 0,00 % Clipping; Vollbild 0,06–0,18 % · 2026-07-31*

- **Matrixlauf trotz Dateien unfertig** — Notification „stopped“, Renderer rebootet, Ordner mischt Generationen. → Abschluss nur aus `wrote N`, Summary, Zeitfenster, Exit; Bridge einmal rebooten, Shot wiederholen.
  *175/175 erst nach Neuaufbau; vorher 158 Logs/gemischte mtimes, später 2 sichere Reboots · 2026-07-30*
