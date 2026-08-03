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

- **Ein Gate misst nur, was man ihm zeigt — Gegenstand, Bedingung *und* Umgebung** — drei Gestalten. **Gegenstand:** „Kamera über Terrain“ prüfte die Spielerkamera, nicht die 14 Benchmarks. **Bedingung:** ein Lesbarkeitsgate maß den Kontrast vom Spawnpunkt (25,4 m) statt vom Ort, an dem der Spieler antwortet (8,1 m) — und hätte damit den Panelentwurf beschuldigt (Schriftgröße, Papierkontrast, Texturauflösung), während der Defekt in der Platzierung lag. **Umgebung:** eine Probe, die zwanzig Sekunden simuliert, misst alles mit, was in zwanzig Sekunden von selbst passiert — der Wellenregisseur stellte eine ganze Welle dazu, und „nach dem Bosstod leben 0" stand auf 17. Dieselbe Falle eine Ebene tiefer, wenn die gemessene Größe hinter einem *früheren* Zweig derselben Kette liegt: der Dash steht in `_engage` vor dem Spiegelabstand, feuert bei 8 m und schreibt jede Bewegung mit 34 m/s zu — gemessen kam „8,00 → 7,83 m" heraus, plausibel genug, um als „die Mechanik greift nicht" durchzugehen. Die teure Variante ist nie der rote Lauf, sondern der grüne: an der falschen Bedingung meldet ein vergrößerter Font grün und deckt die Ursache zu. → Gegenstand in den Zusicherungsnamen („Spielerkamera über Grund“); **vor** dem Schwellenwert die Bedingung beantworten und sie aus dem Code ableiten (`|Stein − Tafel|`) statt sie ins Gate zu tippen; für die Umgebung jede Regie stilllegen, die während der Messung von selbst handelt (`director.running = false`, danach zurückstellen), jeden Zweig **vor** dem gemeinten stummschalten (Abklingzeiten hochsetzen) und die Zusage als **Differenz** formulieren statt als Absolutwert — „Boss und beide Silhouetten gehen zusammen: 3 → 0" überlebt einen fremden Bewohner, „alive === 0" nicht.
  *34/34 grün bei 7 Benchmark-Kameras im Berg · `smoke.mjs:216` · 2026-08-02*
  *Am Antwortstand 7,7 px auf `low` gegen 3,5 px im Defektzustand; die 20/40/60 m der Planzeile sind als `--dists` erhalten, aber ohne Tor — auf 40 m ist jede Tafel vom Plateaurand verdeckt · `tools/boards.mjs` · `023d378` · 2026-08-03*
  *Bossabschnitt: 20 lebend statt 3 vor dem Stilllegen; Spiegelweg nach dem Stummschalten 8,00 → 13,59 m zurück und 24,00 → 14,69 m ran · `tools/enemies.mjs` §8 · `c044079` · 2026-08-03*

- **Boot-Fenster ist zu, wenn `__kaze.ready` ankommt** — Self-Warm läuft in `init()`, der Warm-Platz lebt 0,25 s Spielzeit, `ready` folgt erst nach `engine.start()` plus einem rAF. Wer über die Playwright-Brücke danach hakt, misst ein geschlossenes Fenster und liest „nie passiert" statt „längst passiert". → `page.addInitScript` mit `defineProperty`-Falle auf `globalThis.__kaze`, darin rAF-Poll auf `ctx.peek('<system>')`; Haken sitzt vor dem ersten gerenderten Frame. Draw Call selbst über `onBeforeRender` beobachten — three ruft es genau einmal je ausgegebenem Call, mit Instanzzahl und gebundenem Target.
  *Haken sass in Frame 0, Warm-Draw beider Hülsenringe in Frame 1: je 1 Instanz, Skalierung 0, Ziel 960×540 (Post-Target, nicht Canvas); `hadProgram` false nur beim ersten der beiden · 2026-08-02*

- **Posierte Kamera verschwindet beim Step** — `frame.mjs` setzt `ctx.camera` ohne Step; Performance muss steppen, Rig überschreibt Pose. → Spieler auf `height(x,z)` versetzen, `prevPosition`, `rig.yaw/pitch` aus `eye→look`; Freiraum selftesten.
  *`terrace-waterline` vs. Spawn: 110 vs. 89 Calls, 59.972 vs. 54.052 Tris; ohne Spielerpose identisch · 2026-08-02*

- **Ein Ausschluss versteckt genau die Defekte an seiner Grenze** — wer eine Zone aus dem Messband nimmt („Lanes nur außerhalb `radius + rimFalloff`"), macht deren Rand blind. Der Rand ist aber die wahrscheinlichste Defektstelle, weil dort zwei Formeln aufeinandertreffen. → Jeden Ausschluss im Gate mit der Zahl benennen, die ihn definiert, und prüfen, ob genau diese Zahl auch im Erzeuger steht; steht sie dort zweimal, ist der Rand ein Kandidat, kein Randfall.
  *`smoke.mjs` schließt `>= 69` aus; die 72°-Wand stand auf exakt 69 m, auf allen vier Lanes, über Wochen grün · `smoke.mjs:76-120` · 2026-08-02*

- **Feld und Nutzung werden gemeinsam abgenommen, in beide Richtungen** — **Hörer ohne Sender:** geerntete Subsysteme bringen ihre Hörer mit, und jeder Hörer ist eine stille Zusage an einen Sender, den es in diesem Repo vielleicht nie gab. Vier Fälle in drei Schichten: `weapon:fire.empty` (Klang gebaut, kein Sender), `ai:bark` (Klang gebaut, weder Schema noch Sender), `damage:dealt.armour` (aus der Doku entstanden, nie gesendet), Killfeed-Zeile an `e.killed` (Sender setzt es immer auf `false`). **Sender ohne Hörer** ist dieselbe Lücke rückwärts und schlechter zu sehen, weil eine gefüllte Datentabelle wie ein fertiges Feature aussieht: vier authored Felder standen in `BOSS_DEFS`, waren im Plan als „gebaut" abgehakt und hatten **je 0 Treffer** über `src/`. → Für jedes `p.<feld>` im Empfänger einmal `grep` über die Sender **und** für jedes authored Feld einmal `grep` über die Leser, bevor ein Subsystem als fertig gilt; ein grünes Gate über die Stimme beweist die Stimme, nicht den Pfad dorthin, und eine Zeile in einer Definitionstabelle beweist gar nichts.
  *`registry.js:EVENT_SCHEMA` als Ort der Wahrheit; `physics/index.js:835` sendet `killed: false`, weil der Schuss nicht weiß, ob er tötet · 2026-08-02*
  *`perch`, `volley`, `mirror`, `shadows` — vier Zeilen Shell hätten die Lücke am Tag ihrer Entstehung gezeigt; die Planzeile daneben nannte stattdessen ein Verzeichnis, das nie gebaut wurde, und ein Ereignis, das längst gesendet wurde · `src/enemies/defs.js` · `c044079` · 2026-08-03*

- **Ein Fallback, der für eine *eigene* Sache greift, ist ein vergessener Eintrag** — die Umkehrung des Tipps darüber: hier fehlt kein Sender, sondern der Eintrag beim Empfänger, und ein für sich **richtiger** Fallback verdeckt ihn. Drei neue Waffen-ids standen weder in der Profiltabelle noch in der Hülsenzuordnung; `resolveProfile` fiel auf den Karabiner (eine unbekannte Waffe soll klingen), `kindFor` auf `'rifle'` (sie soll Messing werfen). Beide Regeln sind einzeln zu behalten und ergeben zusammen einen Zustand, in dem **nichts fehlt** und trotzdem alles falsch ist — kein Test wird rot, weil kein Test eine Lücke sieht. Ein Regex als Zuordnung ist dieselbe Falle mit besserer Tarnung. → Vollständigkeit **mechanisch** gegen die Definitionsliste prüfen, nicht durch Lesen: für jede `id` aus der Quelle `resolveX(id) === TABELLE[id]` (Identität, nicht Wahrheitswert — sonst besteht der Fallback die Prüfung) und Eintrag in jeder Zuordnung. Weil so ein Gate über mehrere Verzeichnisse liest, kann es kein Selbsttest eines Subsystems sein: es prüft genau die Naht, an der „kein Fremdimport" die Lücke erst erzeugt.
  *`tools/audio.mjs` Abschnitt 1b über `WEAPON_DEFS` × `WEAPON_PROFILES` × `BY_WEAPON`, 104 → 107 Stimmen, sechs Waffen „Profil eigen"; die MP klang bis dahin wie ein Repetierer und warf eine 52-mm-Gewehrhülse · `251e798` · 2026-08-03*

- **Ein Gate, das seine Eingabe selbst sendet, prüft seinen eigenen Begriff und nicht den des Besitzers** — zwei Gestalten desselben Fehlers. **Form:** das HUD-Gate schrieb `target: 'ashigaru', killed: true` und meldete grün, was kein Sender erzeugt — der echte Sender schickt den **Datensatz** als `target` und `killed: false`, der Fallback `TABELLE[obj] ?? obj` landete damit in `String()`. **Besitz:** dasselbe Gate sendete `wave:start` und `ability:cast`, nachdem Restzähler und Cooldownringe längst aus `waves.getHudState()`/`abilities.getHudState()` kommen; das gesendete Ereignis wird im nächsten `lateUpdate` von der echten Regie überschrieben, gemessen wurde also, dass die Übernahme *nicht* stattgefunden hat — rote Prüfungen über ein HUD, das richtig arbeitet. → Eingabe über den Weg erzeugen, den auch Konsole und Werkzeuge nehmen (`waves.startWave(4)`, `abilities.cast('dash')`), und die Payloadform aus dem Sender ableiten statt aus der Lesbarkeit des Tests; der zweite Konsument desselben Ereignisses ist der billigste Fuzzer, den es gibt.
  *Killfeed schrieb „[OBJECT OBJECT]", Gate 31 → 35 Prüfungen · `d9adbce` · 2026-08-02. Drei von 35 rot ohne einen Defekt dahinter, nach dem Umbau auf die Besitzer 35/35 und keine Zeile HUD-Code geändert · `5cbeef9` · 2026-08-02*

- **Eine Spaltenüberschrift ist keine Definition** — „Wasser 0,0 %" auf einer Reisterrasse las sich wie eine leergelaufene Terrasse nach dem neuen Bake; `aim.mjs` zählt als Wasser aber `height < SEA_LEVEL`, also **Meer**, und die Lache liegt 13 m darüber. Eine Jagd auf ein Phantom kostet mehr als der Blick in die Zeile. → Vor jedem „Fix" die Definition der Spalte im Werkzeug lesen und die Größe daneben messen, die das Fehlerbild direkt beschreibt (hier: Wasserstand am Ort).
  *Kamera steht in 0,40 m Wasser, T1 zu 74,5 % nass; 77 % Boden / 23 % Himmel decken sich exakt mit den dokumentierten 47+30/23 · `tools/aim.mjs:95` · 2026-08-03*
