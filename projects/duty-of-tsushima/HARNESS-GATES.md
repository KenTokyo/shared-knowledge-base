# Harness und Gates — duty-of-tsushima

**Lesen wenn:** du ein Werkzeug unter `tools/` schreibst, den headless Browser fährst, Frames pumpst
oder eine Zahl aus dem laufenden Spiel liest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Globale Grundlagen stehen in [`../../threejs/MEASURING.md`](../../threejs/MEASURING.md) und
[`../../threejs/DEBUG-REVIEW.md`](../../threejs/DEBUG-REVIEW.md). Hier stehen nur die lokalen Fallen.

- **Grünes `check`, ungebootetes Spiel** — das Skript war `vite build`; ein Bundler, der erfolgreich
  bündelt, hat nichts über Laufzeit gesagt, und die Vertragsregel „`pnpm check` muss grün sein" war
  erfüllbar, ohne dass eine Zeile Spielcode je lief. → `check` ist Build **und** headless Boot-Probe,
  die Zahlen aus dem laufenden Frame liest.
  *~2500 Zeilen Subsystemcode lagen ungetestet im Repo; der erste Gate-Lauf fand sofort drei echte
  Weltbefunde, darunter einen Wellen-Spawn auf 42,1 m hinter einer 79°-Wand · 2026-08-01*

- **Headless Chromium rastert still auf der CPU** — der GPU-Prozess ist headless standardmäßig aus;
  der Lauf sieht erfolgreich aus, und SwiftShader-Zahlen sind plausibel und wertlos. → Kennung über
  `WEBGL_debug_renderer_info` lesen, gegen `swiftshader|llvmpipe|software|warp|angle \(google`
  matchen und **mit Fehlercode abbrechen**, nicht warnen. `--enable-gpu` genügt und ist
  plattformneutral; kein weiteres GPU-Flag ohne eigene Messung.
  *Ohne Flags `ANGLE (Google, Vulkan … SwiftShader driver)`, mit `--enable-gpu`
  `ANGLE (Apple, ANGLE Metal Renderer: Apple M5)`; `--use-angle=metal` und `headless:false` liefern
  dasselbe. Playwright 1.62.1, macOS 25.4 · Tabelle im Kopf von `tools/browser.mjs` · 2026-08-01*

- **Die GPU-Kennung stiehlt dem Renderer seine Kontext-Attribute** — ein Canvas hat genau **einen**
  Kontext: wer zuerst `canvas.getContext('webgl2')` für die Kennung ruft, legt dessen Attribute fest,
  und three bekommt später denselben Kontext zurück, während `powerPreference`, `antialias:false`
  und `stencil:false` still verworfen werden. Man misst dann eine Konfiguration, die das Spiel nie
  benutzt. → Kennung auf einem `document.createElement('canvas')` holen und den Kontext mit
  `WEBGL_lose_context` sofort wieder freigeben.
  *`src/main.js:probeGpu` · 2026-08-01*

- **Die Sonde rechnet mit `undefined` weiter** — der `page.evaluate`-Callback wird serialisiert und
  läuft im Browser; eine Closure über eine Modul-Konstante aus `tools/` existiert dort nicht, und
  arithmetisch stirbt das nicht, es liefert nur stumm Unsinn. → Jede Konstante explizit als Argument
  übergeben: `page.evaluate(fn, WINDOW_M)`.
  *Traf `WINDOW_M` im Lane-Gate; dieselbe Falle trifft jede neue Konstante in jeder neuen Probe · 2026-08-01*

- **Zwei Uhren auf demselben Frame** — wer Frames manuell pumpt, ohne vorher `engine.stop()` zu
  rufen, lässt rAF weiterlaufen; die Simulation läuft doppelt und der gemessene Laufweg ist zu lang.
  → Erst `engine.stop()`, dann pumpen. `pumpFrames()` macht das; handgeschriebene Proben müssen es auch.
  *`tools/browser.mjs` · 2026-08-01*

- **Ein Pump-Schritt über dem Substep-Budget verkürzt still die Simulation** — der Fixstep-Loop wirft
  Rückstand ab, statt ihn aufzuholen (Spiral-of-Death-Guard, `MAX_SUBSTEPS = 8` × 1/120 s). Wer mit
  mehr als 1/15 s pro Frame pumpt, misst eine Simulation, die Zeit verloren hat, ohne dass irgendwo
  ein Fehler steht. → 1/15 s ist die Obergrenze; wer sie anhebt, muss `MAX_SUBSTEPS` mit anheben.
  *`src/core/engine.js`, Laufweg-Gate in `tools/smoke.mjs` · 2026-08-01*

- **`p99` aus dem Boot-Log ist Shader-Kompilierung** — der erste Frame kompiliert, und das landet im
  selben Quantil-Array wie die Frametime; derselbe Lauf meldete 2687,90 ms und 55,60 ms. → Für
  Performance-Aussagen einen eigenen Warmlauf in **einem** Prozess fahren und die Boot-Zeile als Info
  führen, nie ranken.
  *Aktueller Lauf: p50 0,20 ms, p90 0,30 ms, p99 70,30 ms · 2026-08-02*

- **Der freie Port war belegt, weil die Liste älter war als die Datei** — die Portwahl 5180/4180 fiel
  gegen eine Fassung von `PORTLISTE.md`, die `Claude-of-tsushima` noch auf 5173/4173 führte; in
  dessen `vite.config.js` stehen aber `server.port = 5180` und `preview.port = 4180`, beide
  `strictPort`. Zwei `strictPort`-Projekte auf derselben Nummer heißt: wer zweitens startet, bricht
  ab — und beim Ernten laufen genau diese beiden nebeneinander. → Vor der Portwahl `git pull` im
  Submodule **und** `grep -n "port" ../<nachbarrepo>/vite.config.js`. Die Liste ist eine Momentaufnahme,
  die Konfigurationsdatei ist die Wahrheit.
  *Kollision blieb zwei Schichten unbemerkt, weil beide Server nie gleichzeitig liefen; jetzt
  5185/4185 · 2026-08-02*

- **Ein fehlendes Favicon reißt das Gate ein** — `requestfailed` gehört in den Exit-Code, und ein
  404 auf `/favicon.ico` ist ein fehlgeschlagener Request wie jeder andere. Das sieht aus wie
  Toolflakiness und ist keine. → Inline-SVG-Favicon im `<head>`, keine Datei; das Projekt lädt
  ohnehin keine externen Assets.
  *`index.html` · 2026-08-01*
