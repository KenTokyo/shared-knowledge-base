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

- **Boot-Fenster ist zu, wenn `__kaze.ready` ankommt** — Self-Warm läuft in `init()`, der Warm-Platz lebt 0,25 s Spielzeit, `ready` folgt erst nach `engine.start()` plus einem rAF. Wer über die Playwright-Brücke danach hakt, misst ein geschlossenes Fenster und liest „nie passiert" statt „längst passiert". → `page.addInitScript` mit `defineProperty`-Falle auf `globalThis.__kaze`, darin rAF-Poll auf `ctx.peek('<system>')`; Haken sitzt vor dem ersten gerenderten Frame. Draw Call selbst über `onBeforeRender` beobachten — three ruft es genau einmal je ausgegebenem Call, mit Instanzzahl und gebundenem Target.
  *Haken sass in Frame 0, Warm-Draw beider Hülsenringe in Frame 1: je 1 Instanz, Skalierung 0, Ziel 960×540 (Post-Target, nicht Canvas); `hadProgram` false nur beim ersten der beiden · 2026-08-02*

- **Posierte Kamera verschwindet beim Step** — `frame.mjs` setzt `ctx.camera` ohne Step; Performance muss steppen, Rig überschreibt Pose. → Spieler auf `height(x,z)` versetzen, `prevPosition`, `rig.yaw/pitch` aus `eye→look`; Freiraum selftesten.
  *`terrace-waterline` vs. Spawn: 110 vs. 89 Calls, 59.972 vs. 54.052 Tris; ohne Spielerpose identisch · 2026-08-02*

- **Ein Ausschluss versteckt genau die Defekte an seiner Grenze** — wer eine Zone aus dem Messband nimmt („Lanes nur außerhalb `radius + rimFalloff`"), macht deren Rand blind. Der Rand ist aber die wahrscheinlichste Defektstelle, weil dort zwei Formeln aufeinandertreffen. → Jeden Ausschluss im Gate mit der Zahl benennen, die ihn definiert, und prüfen, ob genau diese Zahl auch im Erzeuger steht; steht sie dort zweimal, ist der Rand ein Kandidat, kein Randfall.
  *`smoke.mjs` schließt `>= 69` aus; die 72°-Wand stand auf exakt 69 m, auf allen vier Lanes, über Wochen grün · `smoke.mjs:76-120` · 2026-08-02*

- **Ein gelesenes Feld ist damit noch nicht geschrieben** — geerntete Subsysteme bringen ihre Hörer mit, und jeder Hörer ist eine stille Zusage an einen Sender, den es in diesem Repo vielleicht nie gab. Vier Fälle in drei Schichten: `weapon:fire.empty` (Klang gebaut, kein Sender), `ai:bark` (Klang gebaut, weder Schema noch Sender), `damage:dealt.armour` (aus der Doku entstanden, nie gesendet), Killfeed-Zeile an `e.killed` (Sender setzt es immer auf `false`). → Für jedes `p.<feld>` im Empfänger einmal `grep` über die Sender, bevor ein Subsystem als fertig gilt; ein grünes Gate über die Stimme beweist die Stimme, nicht den Pfad dorthin.
  *`registry.js:EVENT_SCHEMA` als Ort der Wahrheit; `physics/index.js:835` sendet `killed: false`, weil der Schuss nicht weiß, ob er tötet · 2026-08-02*

- **Ein handgeschriebener Payload prüft den Ereignisbegriff des Gates, nicht den des Senders** — das HUD-Gate schrieb `target: 'ashigaru', killed: true` und meldete jahrelang grün, was kein Sender erzeugt: der echte Sender schickt den **Datensatz** als `target` und `killed: false`. Der Fallback `TABELLE[obj] ?? obj` landete damit in `String()`. → Die Payloadform aus dem Sender ableiten, nicht aus der Lesbarkeit des Tests; der zweite Konsument desselben Ereignisses ist der billigste Fuzzer, den es gibt.
  *Killfeed schrieb „[OBJECT OBJECT]"; Gate 31 → 35 Prüfungen, davon eine auf den Text im DOM · `tools/hud.mjs` · 2026-08-02*
