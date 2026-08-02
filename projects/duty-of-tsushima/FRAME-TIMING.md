# Frametime und GPU-Zeit — duty-of-tsushima

**Lesen wenn:** Frametime, GPU-Zeit, Submissionszeit, Quantil oder Rauschboden aus laufendem Spiel.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Harness: [`HARNESS-GATES.md`](HARNESS-GATES.md) · Kennzahlen: [`METRICS-AND-GATES.md`](METRICS-AND-GATES.md).
Ausführbarer Owner: `tools/perf.mjs` samt Begründung im Dateikopf.

- **Boot-`p99` misst Shader-Kompilierung** — erster Frame und Frametime teilen Quantilarray. → Warmlauf im selben Prozess; Boot separat, nie ranken.
  *Gleicher Lauf 2687,90 und 55,60 ms; 90 Frames verworfen; Boot-p99 51,60–393,50 vs. warm 1,09–9,56 ms · 2026-08-02*

- **`gl.finish()` synchronisiert hier nicht** — N Frames + `finish()` + Wandzeit/N wirkt plausibel zu schnell; GPU läuft weiter. → Drain per `gl.readPixels(0,0,1,1)` am Default-Framebuffer; Pixelwert irrelevant.
  *ANGLE/Metal M5: `finish()` 0,00 ms, Readback danach 218,90/228,60/377,20/1092,90 ms; 0,45 statt 9,56 ms/Frame (×21,3); Readback vs. GPU Query 3,97/3,92 (+1,4 %), 3,74/3,67 (+2,0 %) · 2026-08-02*

- **Busy-`clientWaitSync` signalisiert nie** — enge Schleife blockiert Chromium-Eventloop. → Yield kostet 1–4,5 ms und taugt nicht pro Frame; Readback-Drain nutzen.
  *134.554.994 Loops/20 s, immer `TIMEOUT_EXPIRED`; mit Yield 4,5 ms bei 4,0-ms-Frame · 2026-08-02*

- **„Timer Query fehlt auf ANGLE/Metal“ ungeprüft** — widerlegt: `EXT_disjoint_timer_query_webgl2`, Werte, stets `GPU_DISJOINT=false`. → Ungeprüfte Annahme als Aufgabe; Query plus Readback als unabhängiges Paar.
  *Prüfung 40 s statt geplantem halben Tag Umweg; Δ 0,4–2,0 % über 4 Presets, M5/macOS 25.4 · 2026-08-02*

- **Browseruhr gröber als CPU-Halbframe** — `performance.now()` tickt 0,100 ms; CPU 0,15–0,45 ms, einzelne Frames teils 0. → Tick messen; CPU aus N-Frame-Blockmittel; Sub-Tick-Frames zählen.
  *`render.stats().cpuMs` nur 0,1-ms-Vielfache; 7/120 `high`-Frames unter einem Tick · 2026-08-02*

- **Blockgröße folgt der Zielauflösung, nicht dem Bauchgefühl** — der 0,1-ms-Tick quantisiert auch den *Median* aus vielen Runden: bei zu kleinen Blöcken sortiert man Stufen, nicht Messwerte, und die Streuung sieht trotzdem plausibel aus. → Block so wählen, dass er ≥ 20 Ticks (2 ms) dauert; Quantisierung erkennt man daran, dass alle Zeilen dieselben zwei bis drei Werte tragen.
  *Kapselkollision: 200 Züge/Block → 13 Orte trugen nur 1,50/2,00/0,50 µs und ein Mittel von 1,69; 4 000 Züge/Block → 1,00–1,60 µs, Mittel 1,22, IQR ±0,15 · 2026-08-02*

- **„Kostet nichts" ohne Gegenprobe belegt die Blindheit der Sonde** — ein Pre-Warm-Beleg der Form „erster echter Auslöser zeigt keinen Ausschlag" meldet auch dann grün, wenn das Instrument einen Shaderkompilat gar nicht auflösen kann. → Im selben Block einen Lauf fahren, in dem die Sache **sichtbar** kostet: dasselbe Material mit **einem** zusätzlichen Cache-Schlüssel (`flatShading`) ist ein Programm, das three nie übersetzt hat. Erst dessen Zahl macht die erste zu einem Beleg.
  *Hülsen-Pre-Warm: erster `weapon:shell` +0,40 ms gegen Nachbarmax bei Rauschboden ±9,40 ms; Gegenprobe +268,60 ms in EINEM Frame = 16 Framebudgets, Faktor 670. ANGLE/Metal M5, `high`, 960×540 · 2026-08-02*

- **In-Run-Rauschen ≠ Prozess-Rauschen** — Blockwiederholung 0,12–0,36 ms, neue Prozesse 4,88 vs. 3,72 ms (31 %). → Regression braucht Prozessabstand plus dokumentierte Fremdlast; beide Böden getrennt.
  *loadavg 3,7 auf 10 Kernen, sonst gleicher Aufruf · 2026-08-02*

- **Eine Änderung unter 31 % ist nur verschränkt messbar** — Vorher/Nachher über zwei `perf`-Läufe kann eine Schicht, die 0,1 % kostet, nicht sehen; sie verschwindet im Prozessboden. → Alle Konfigurationen in EINEM Prozess, VERSCHRÄNKT und mehrfach (A B C A B C …), Median je Konfiguration, Streuung als mittlere Hälfte statt voller Spanne — Fremdlast schlägt nach oben aus, nie nach unten, und ein einziger Ausreisser beschreibt sonst nur sich selbst.
  *Schattenwurf je Art: verschränkt trennten sich 0,008 und 0,152 ms gegen einen Boden von 0,032 ms; unverschränkt lag derselbe Block einmal bei 11,75 statt 6,3 ms und riss die Spanne auf 5,4 ms · 2026-08-02*
