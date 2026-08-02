# Frametime und GPU-Zeit — duty-of-tsushima

**Lesen wenn:** du eine Zahl in Millisekunden aus dem laufenden Spiel liest — Frametime, GPU-Zeit,
Submissionszeit, Quantile, Rauschboden.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Werkzeugbau und Browser-Harness stehen in [`HARNESS-GATES.md`](HARNESS-GATES.md), Kennzahlen und
Tore in [`METRICS-AND-GATES.md`](METRICS-AND-GATES.md). Hier steht nur, woran die **Uhr** scheitert.
Das ausgeführte Ergebnis ist `tools/perf.mjs`; sein Dateikopf trägt dieselben Zahlen als Begründung.

- **`p99` aus dem Boot-Log ist Shader-Kompilierung** — der erste Frame kompiliert, und das landet im
  selben Quantil-Array wie die Frametime; derselbe Lauf meldete 2687,90 ms und 55,60 ms. → Für
  Performance-Aussagen einen eigenen Warmlauf in **einem** Prozess fahren und die Boot-Zeile als Info
  führen, nie ranken.
  *`perf.mjs` verwirft 90 Frames und druckt die Boot-Zeile getrennt: Boot-p99 51,60–393,50 ms über
  vier Läufe, warme Frametime 1,09–9,56 ms · 2026-08-02*

- **`gl.finish()` ist hier kein Synchronisationspunkt** — der Standardaufbau „N Frames einreihen, ein
  `gl.finish()`, Wandzeit durch N" meldet ein Vielfaches der wahren Geschwindigkeit, weil `finish()`
  sofort zurückkehrt und die eingereihte Arbeit weiterläuft. Der Fehler ist unsichtbar: die Zahl ist
  plausibel, nur zu gut. → Drain über **`gl.readPixels(0,0,1,1)`** auf dem Default-Framebuffer; ein
  Readback muss auf die GPU warten und braucht die Ereignisschleife nicht. Das eine Pixel wird für
  die Synchronisation gelesen, nicht für seinen Wert.
  *Chromium/ANGLE Metal, Apple M5: `finish()` kehrte nach 0,00 ms zurück, danach brauchte der
  Readback noch 218,90 / 228,60 / 377,20 / 1092,90 ms. Wandzeit/N wäre 0,45 statt 9,56 ms/Frame
  gewesen — Faktor 21,3. Gegen die GPU-Zeitabfrage auf demselben Block: 3,97 gegen 3,92 (1,4 %) und
  3,74 gegen 3,67 (2,0 %) · `tools/perf.mjs` · 2026-08-02*

- **Ein busy-gespintes `clientWaitSync` wird nie signalisiert** — der zweite Reflex nach `finish()`
  ist `fenceSync` + `clientWaitSync` in einer engen Schleife. Ohne Rückkehr in die Ereignisschleife
  aktualisiert Chromium den Status des Sync-Objekts nicht; das ist kein langsamer Warteweg, sondern
  eine Endlosschleife. → Entweder `setTimeout(0)` dazwischen — dann kostet es 1–4,5 ms Auflösung je
  Umlauf und ist als Einzelframe-Instrument unbrauchbar — oder gleich der Readback-Drain.
  *134 554 994 Umläufe über 20 s, Status durchgehend `TIMEOUT_EXPIRED`, zweimal reproduziert; mit
  Yield gemessene Umlaufkosten 4,5 ms bei einem Frame von 4,0 ms · 2026-08-02*

- **„Die Zeitabfrage gibt es auf ANGLE/Metal nicht"** — galt als *Annahme, ungeprüft* in einer
  Übergabe und war der Grund, einen Umweg zu planen. **Widerlegt:** `EXT_disjoint_timer_query_webgl2`
  ist vorhanden, liefert Werte und meldete über alle Läufe `GPU_DISJOINT = false`. → Eine mit
  „ungeprüft" markierte Annahme ist eine **Aufgabe**, kein Ergebnis; diese hier kostete 40 Sekunden
  zu prüfen und hätte einen halben Tag Umweg gekostet. Die Zeitabfrage ist heute das zweite,
  unabhängige Instrument neben dem Readback-Drain — und erst dieses Paar hat den `finish()`-Fehler
  darüber überhaupt sichtbar gemacht.
  *Chromium/ANGLE Metal, Apple M5, macOS 25.4; Δ zwischen beiden Instrumenten 0,4–2,0 % über vier
  Presets · 2026-08-02*

- **Die Uhr ist gröber als die CPU-Hälfte eines Frames** — `performance.now()` wird im Browser
  absichtlich vergröbert und löst hier **0,100 ms** auf. Die CPU-Hälfte liegt bei 0,15–0,45 ms, also
  ein bis fünf Ticks: eine Einzelframe-CPU-Zeit ist damit quantisiert, und ein Teil der Frames liest
  exakt **0**. Das sieht aus wie ein Frame, der nichts gekostet hat, und eine Selbstprobe „keine Zeit
  ≤ 0" bricht daran ab, ohne dass etwas kaputt ist. → Den Tick **messen** (in einer Schleife warten,
  bis `performance.now()` springt), die CPU-Zahl aus dem **Blockmittel** über N Frames nehmen, wo der
  Tick herausfällt, und die Frames unter einem Tick zählen und drucken statt sie zu verstecken.
  *Alle Werte in `render.stats().cpuMs` sind Vielfache von 0,1 ms; 7 von 120 Frames auf `high` lagen
  unter einem Tick · `tools/perf.mjs` · 2026-08-02*

- **Der Rauschboden im Lauf ist nicht der Rauschboden zwischen zwei Läufen** — derselbe Block zweimal
  hintereinander wiederholt sich auf 0,12–0,36 ms genau, und das liest sich wie „jede Differenz
  darüber ist echt". Zwischen zwei **Prozessen** stimmt das nicht: derselbe Befehl zweimal gefahren
  lieferte auf `high` 4,88 und 3,72 ms — 31 %, das Zehnfache der Wiederholbarkeit im Lauf. → Beide
  Zahlen sind richtig und messen Verschiedenes. Eine Regression über zwei Läufe braucht mehr Abstand
  als die Wiederholbarkeitsspalte anzeigt, und die **Fremdlast** gehört deshalb in den Messvertrag —
  ohne sie ist ein Vergleich über zwei Läufe nicht nachvollziehbar.
  *loadavg 3,7 auf 10 Kernen, sonst identischer Aufruf · `tools/perf.mjs` · 2026-08-02*
