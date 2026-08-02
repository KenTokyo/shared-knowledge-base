# Harness und Gates — duty-of-tsushima

**Lesen wenn:** Tool unter `tools/`, headless Browser, Frame-Pump oder Laufzeitzahl.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Global: [Messhandwerk](../../threejs/MEASURING.md) · [Debug/Review](../../threejs/DEBUG-REVIEW.md).
Kennzahlen: [`METRICS-AND-GATES.md`](METRICS-AND-GATES.md) · Millisekunden: [`FRAME-TIMING.md`](FRAME-TIMING.md).

- **Grünes `check`, ungebootetes Spiel** — `check` war nur `vite build`; Runtime blieb unberührt. → Build plus headless Boot-Probe mit Framewerten.
  *~2.500 Subsystemzeilen ungeprüft; erstes Gate fand 3 Weltdefekte, darunter Spawn 42,1 m hinter 79°-Wand · 2026-08-01*

- **Headless rastert still auf CPU** — SwiftShader liefert plausible wertlose Zahlen. → `WEBGL_debug_renderer_info`; bei `swiftshader|llvmpipe|software|warp|angle \(google` Exit. `--enable-gpu` genügt; keine ungemessenen Flags.
  *Ohne Flag SwiftShader; mit `--enable-gpu` ANGLE Metal Apple M5; `--use-angle=metal`/sichtbar gleich · Playwright 1.62.1, macOS 25.4 · 2026-08-01*

- **GPU-Kennung verändert Renderer-Kontext** — erster `canvas.getContext('webgl2')` fixiert Attribute; Three verliert `powerPreference`, `antialias:false`, `stencil:false`. → Kennung auf separatem Canvas; per `WEBGL_lose_context` freigeben.
  *`src/main.js:probeGpu` · 2026-08-01*

- **Sonde rechnet mit `undefined`** — `page.evaluate` serialisiert Callback; Tool-Closure-Konstante fehlt im Browser. → Konstanten als Argument: `page.evaluate(fn, WINDOW_M)`.
  *`WINDOW_M` im Lane-Gate; gilt für jede Probe-Konstante · 2026-08-01*

- **Zwei Uhren pro Frame** — manuelles Pumpen bei laufendem rAF verdoppelt Simulation. → `engine.stop()` vor Pump; `pumpFrames()` nutzen.
  *`tools/browser.mjs` · 2026-08-01*

- **Pump-Schritt über Substep-Budget** — Fixstep wirft Rückstand ab (`8×1/120 s`), Simulation verliert still Zeit. → Maximal 1/15 s; sonst `MAX_SUBSTEPS` mit erhöhen.
  *`src/core/engine.js`, Laufweg-Gate `smoke.mjs` · 2026-08-01*

- **Portliste älter als Konfiguration** — Nachbarrepo war bereits 5180/4180 `strictPort`; zwei Projekte kollidieren erst parallel. → Submodule pull plus `grep "port" ../repo/vite.config.js`; Konfig ist Wahrheit.
  *Kollision 2 Schichten unbemerkt; jetzt 5185/4185 · 2026-08-02*

- **Favicon-404 kippt Gate** — `requestfailed` zählt auch `/favicon.ico`. → Inline-SVG-Favicon im `<head>`.
  *`index.html` · 2026-08-01*

- **Abgeleitete Kamera antwortet falsch** — handgeschriebene Seed-Koordinaten veralten; 7/14 Augen unter Grund, dennoch plausible graue Frames. Derselbe Solver hebt auch **frisch eingetragene** Posen auf Mindestfreiraum, also misst kein Werkzeug die Pose, die im Sweep gewonnen hat: `frame.mjs` liest `world.cameras`, nicht `spec.CAMERAS`. → Beim Bake aus Quelle lösen, nicht Datei; gitignored Ziel nie Voraussetzung. Gemessene Pose **ungerundet** eintragen und danach gelöst gegen spezifiziert drucken.
  *`material-closeup` 19,8 m tief; nach Fix 14/14 ≥1,8 m Freiraum, 99 % Boden statt 0 %. `terrace-paddy` eingetragen y=11,63, gelöst 11,75 — 12 cm, die denselben Messwert von 0,063 auf 0,026 % drückten; 7/15 Kameras stehen exakt auf 1,80 m über Grund · 2026-08-02*

- **Gate wiederverwendet Code unter Test** — gleicher Framingfehler bestätigt sich selbst. → Erzeuger und Gate unabhängig implementieren; Widerspruch vor DRY.
  *Kamera-Solver 11×7 vs. `aim.mjs` 32×18 · 2026-08-02*

- **Gate prüft gleichnamigen Fremdgegenstand** — „Kamera über Terrain“ prüfte Spielerkamera, nicht 14 Benchmarks. → Gegenstand im Zusicherungsnamen: „Spielerkamera über Grund“.
  *34/34 grün bei 7 Benchmark-Kameras im Berg · `smoke.mjs:216` · 2026-08-02*

- **Posierte Kamera verschwindet beim Step** — `frame.mjs` setzt `ctx.camera` ohne Step; Performance muss steppen, Rig überschreibt Pose. → Spieler auf `height(x,z)` versetzen, `prevPosition`, `rig.yaw/pitch` aus `eye→look`; Freiraum selftesten.
  *`terrace-waterline` vs. Spawn: 110 vs. 89 Calls, 59.972 vs. 54.052 Tris; ohne Spielerpose identisch · 2026-08-02*
