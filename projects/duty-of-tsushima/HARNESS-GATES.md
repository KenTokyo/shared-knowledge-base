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

- **Eine Kennzahl, die über jede Variante konstant bleibt, misst das Instrument** — `capture.mjs`
  zählte Pixel unter Luma 0,10 und meldete 0,0 % auf allen vierzehn Kameras; der Masterplan las das
  als „nichts im Bild ist dunkel" und leitete eine Kritik an der Beleuchtung daraus ab. Die Zahl
  konnte arithmetisch nichts anderes sein: der Lift `[0.012, 0.014, 0.019]` wirkt **nach** dem
  Tonemapper, also verlässt ein reines Schwarz den Grade bei sRGB-Luma 0,135 — der Boden des Bildes
  liegt über der Schwelle. → Schattenende als **Perzentil** messen, nicht als feste Schwelle: ein
  Perzentil wandert mit der Verteilung und lässt sich nicht anpinnen. Und den Wertebereich einer
  neuen Schwelle einmal von Hand durch die Post-Chain rechnen, bevor man ihr glaubt.
  *Gegenprobe: `uExposure` 1,00 → 0,12 gefahren, mittlere Luma fällt 0,623 → 0,212, „Tiefschatten"
  bleibt exakt 0,0 %. Nach dem Umbau auf `p01`: 0,138–0,419 über die vierzehn Kameras · 2026-08-02*

- **Abgeleitete Daten scheitern nicht, sie antworten falsch** — die vierzehn Benchmark-Kameras waren
  von Hand geschriebene Koordinaten auf einer Insel, die aus einem Seed entsteht. Sieben lagen mit
  dem Auge unter Grund, `material-closeup` 19,8 m tief. Nichts warf, nichts wurde schwarz: eine
  vergrabene Kamera liefert ein plausibles graues Bild vom Inneren eines Hügels, und graue Pixel sind
  grau, ob sie Nebel, Hang oder Polygonrückseite sind. Daraus stammte eine committete Baseline **und**
  der Fehlverdacht, die Materialschicht sei ein stiller No-Op. → Abgeleitetes beim Bake aus der
  Quelle lösen, nicht in eine Datei schreiben. Eine committete Lösung veraltet still, sobald Seed
  oder Feld sich bewegen; ein Solver, der die Quelle liest, kann nicht veralten. Liegt das Ziel in
  einem gitignorierten Verzeichnis, ist die Dateivariante ohnehin eine Abhängigkeit, die kein
  Checkout hat.
  *Nach dem Fix alle 14 mit ≥ 1,8 m Freiraum, `material-closeup` bei 99 % Boden statt 0 % · 2026-08-02*

- **Eine Prüfung, die den Code unter Test wiederverwendet, bestätigt ihn** — der Kamera-Solver
  rankt sein Framing über ein 11×7-Raster; das Gate `tools/aim.mjs` marschiert 32×18. Teilten sie
  sich die Funktion, würde das Gate einen kaputten Solver genauso bereitwillig bestätigen wie einen
  richtigen, weil beide Seiten denselben Fehler machen. → Gate und Erzeuger unabhängig
  implementieren, auch wenn das ein paar Zeilen dupliziert. Der Zweck einer Prüfung ist
  Widerspruch, nicht Wiederverwendung.
  *`src/world/cameras.js` gegen `tools/aim.mjs` · 2026-08-02*

- **Das Gate prüfte eine gleichnamige, andere Sache** — `smoke.mjs` trägt eine Zusicherung „Kamera
  über dem Terrain" und war 34 von 34 grün, während sieben Benchmark-Kameras im Berg standen. Die
  Zusicherung prüft `engine.camera`, die Spielerkamera. → Beim Formulieren einer Zusicherung den
  geprüften Gegenstand benennen, nicht seine Gattung: „Spielerkamera über Grund" hätte die Lücke
  beim Lesen sichtbar gemacht.
  *`tools/smoke.mjs:216` · 2026-08-02*

- **Eine Kennzahl aus einem einzelnen Bild trennt Effekt und Motiv nicht** — die Spalte „Vignette"
  war Außenring durch Mittelscheibe und lief über die vierzehn Kameras von 0,83 bis 1,17. Drei
  lagen über 1,0, also Rand heller als Mitte — was eine abdunkelnde Vignette nicht erzeugen kann.
  Gemessen wurde zur Hälfte, was zufällig in den Ecken stand. → Den Effekt gegen sich selbst
  messen: dieselbe Kamera zusätzlich mit dem Effekt auf null, dann die beiden Verhältnisse teilen.
  Der Bildinhalt kürzt sich heraus, weil er in beiden Bildern an derselben Stelle steht. Und die
  Messung braucht eine Schranke aus Geometrie oder Shader-Arithmetik, gegen die sie falsch sein
  kann — hier: der Shader multipliziert im Ring im Mittel 0,888 auf *lineares* Licht, der Readback
  ist sRGB-kodiert und sRGB ist stauchend, also muss das Ergebnis in [0,888; 1,000] liegen.
  *Nach der Trennung 0,947–0,948 auf allen vierzehn, Spanne 0,001; `wave-peak` misst ohne Vignette
  1,235 und mit 1,171 · `tools/capture.mjs --vig` · 2026-08-02*

- **Eine absolute Streuung kann zwei Belichtungen nicht vergleichen** — der lokale Kontrast war die
  Standardabweichung der Luma in 8×8-Kacheln. Die halbiert sich, wenn man das Licht halbiert, ganz
  ohne dass eine Kante weicher geworden wäre. Die Spezifikation verlangte „dunkler" **und** „nicht
  plattgemacht"; unter dieser Kennzahl schließen sich beide konstruktionsbedingt aus. Eine
  Kennzahl, unter der die Spezifikation unerfüllbar ist, ist die kaputte Seite. → Streuung durch
  Kachelmittel teilen: dimensionslos, eine globale Lichtänderung fällt heraus. Und über **alle**
  Kacheln mitteln statt je Helligkeitsband — die Bänder sind nach Kachelhelligkeit besetzt, ein
  dunkleres Bild schiebt Kacheln von hell nach mittel nach dunkel, und ein Bandmittel vergleicht
  danach zwei verschiedene Populationen.
  *Exposure 1,00 → 0,70 bei Fill 1,15: Luma ×0,862, absoluter Kontrast ×0,906 — das Bild wurde
  relativ schärfer, während die Zahl fiel · `tools/frame.mjs` · 2026-08-02*

- **Der zweite Regler war nie angeschlossen** — `uExposure` stand seit zwei Phasen im
  Grade-Material, `_syncGrade` schrieb es nie, und in der Parametertabelle fehlte es. Es lag also
  auf dem Material-Default und sah in jedem Sweep aus wie ein Parameter ohne Wirkung. Dieselbe
  Sitzung fand denselben Fall bei Key und Fill, die als Literale in der Lichtfunktion standen.
  → Beim Anlegen eines Uniforms sofort die Schreibstelle mit anlegen, auch wenn der Wert erstmal
  der Default ist. Ein Parameter, den ein Sweep nicht schreiben kann, ist kein Parameter — und er
  fällt nicht auf, weil ein nicht bedienter Regler exakt aussieht wie ein wirkungsloser.
  *`src/render/index.js:_syncGrade` gegen `src/render/grade.glsl.js:uExposure` · 2026-08-02*

- **„Nicht schlechter als heute" verbietet die Aufgabe, wenn heute am Rand steht** — ein Tor
  verglich den Anteil Pixel auf dem Boden des Grades gegen den heutigen Wert und lehnte **34 von 35**
  Kandidaten ab — alles außer der Baseline im Vergleich mit sich selbst. Nicht weil sie schlecht
  waren: die Spalte stand heute auf 0,07 % bei einer Wiederholbarkeit von exakt 0,00000, das Tor las
  sich also als „höchstens 0,07 %, plus nichts", und die Suchrichtung zeigte genau auf diesen Rand.
  Ein relatives Tor mit Basiswert am Rand seines Wertebereichs erlaubt keinen ersten Schritt.
  → Vor jedem relativen Tor den heutigen Wert im Wertebereich der Kennzahl verorten. Steht er am
  Rand und läuft die Suche dorthin, braucht das Tor eine absolute Schranke — und die aus einer
  Größe ableiten, die das Projekt schon gewählt hat, nicht aus Geschmack. Hier: 1 %, weil der
  Schattendeskriptor das 1. Perzentil ist und oberhalb davon das Perzentil den Boden beschreibt
  statt die Schatten. Die Ablehnungszahl der relativen Formulierung wird weiter in jedem Lauf
  mitgerechnet und gedruckt — sobald sie aufhört, „fast alle" zu sein, darf das Tor wieder relativ
  werden. Eine Begründung, die sich selbst nachrechnet, überlebt die nächste Änderung.
  *`p01` 0,230 gegen einen Boden von 0,134 — das dunkelste Prozent lag 96 Milli-Luma über Schwarz,
  während 0,07 % des Bildes schon aufsaßen · `tools/grade.mjs`, Tor 1 · 2026-08-02*

- **Eine Schwelle aus der Spezifikation zitieren statt aus der Pipeline messen** — die Spezifikation
  prüfte Tiefschatten als „Anteil unter Luma 0,030". Der Lift läuft nach dem Tonemapper, also
  verlässt ein Pixel ganz ohne Szenenlicht die Kette bei 0,134 — Faktor 4,5 über der Schwelle. Das
  Tor hat über zwei Phasen 0 von 35 Kandidaten abgelehnt und **konnte** arithmetisch nicht
  ablehnen. → Die Schwelle messen, indem man das **Eingangssignal** auf null setzt statt den Effekt:
  ein Schuss mit Exposure 0 lässt den Szenenterm verschwinden, das ganze Bild ist dann der Boden,
  mit allem, was die Kette sonst noch draufrechnet. Das ist die Umkehrung von „den Effekt gegen sich
  selbst messen" — dort nullt man den Effekt und behält das Motiv, hier nullt man das Motiv und
  behält die Kette. Zwei Selbstproben dazu, beide abbrechend: das Bodenbild muss zu 100 % unter der
  eigenen Schwelle liegen, und der gemessene Wert muss zur Handrechnung durch die Post-Chain passen.
  *Gerechnet 0,1350, gemessen 0,1339 — 0,28 Codewerte · `tools/grade.mjs` · 2026-08-02*

- **Der Rasterrand gewinnt, weil er dort keine Bedeutung mehr hat** — die Regel „das dunkelste Paar,
  das alle Tore hält" krönte in jedem Lauf Fill 0,00. Der Reflex ist „das Raster ist zu schmal".
  Richtig war: ohne IBL ist das HemisphereLight nicht **ein** Ambient-Term, sondern der **gesamte**,
  und Fill 0 macht Schatten nicht dunkler, sondern unbeleuchtet. → Wenn eine Suchregel an den
  Rasterrand läuft, zuerst fragen, ob der Randwert im System überhaupt etwas bedeutet, und die
  Antwort als **Zulässigkeit** kodieren, nicht als Tor: der Guard fragt `requestEnvMap()` und hebt
  sich selbst auf, sobald ein IBL existiert. Die Zeile bleibt in der Tabelle stehen — einen Wert aus
  der Entscheidung nehmen ist kein Grund, ihn nicht mehr zu messen.
  *Die ersten drei Fill-Schritte kauften 42 Milli-Luma für 1,5 Milli-Prozent Bodenanteil, die letzten
  drei 17 für 22,6 — 0,036 gegen 1,33 je Milli-Luma, Faktor 37, Knick zwischen 0,30 und 0,15 statt am
  Rasterrand · `tools/grade.mjs` · 2026-08-02*

- **Eine Gültigkeitsaussage darf man nicht mitteln** — ein Tor prüfte „höchstens 1 % des Bildes auf
  dem Boden" gegen den **Mittelwert** über vierzehn Kameras. Der stand auf 0,70 % und ließ das
  ausgelieferte Bild durch, während die Spalte je Kamera von 0,00 % bis 2,88 % lief und **fünf von
  vierzehn** über der Schranke lagen. Auf diesen fünf war die Fehlerbedingung des Tores bereits
  eingetreten. Der Unterschied ist nicht Statistik, sondern Grammatik: neun der zehn Spalten sagen,
  **wie gut** ein Look ist, und ein Mittel ist die richtige Zusammenfassung davon. Diese eine sagt,
  **ob** eine andere Kennzahl auf einem Bild noch bedeutet, was sie behauptet. Ein Mittel darüber
  fragt, ob der Deskriptor im Durchschnitt gültig ist. → Vor dem Mitteln einer Spalte fragen, ob sie
  *wie gut* misst oder *ob es gilt*. Das Zweite je Messobjekt prüfen und die Verletzer **namentlich**
  drucken — der Name sagt, was die Zahl nicht sagt: ob es der Regler war oder das Motiv.
  *Mittel 0,70 %, Spanne 0,00–2,88 %; `terrace-waterline` 2,88 · `material-closeup` 1,97 ·
  `wave-peak` 1,55 · `shrine-question` 1,05 · `burnt-slope` 1,00 · `tools/grade.mjs` · 2026-08-02*

- **Der Worst Case war ein Verbot, und der Grund dafür war die eigentliche Erkenntnis** — nachdem
  der Mittelwert als Aggregation durchgefallen war, lag „keine einzige Kamera auf dem Boden" nahe.
  Bepreist statt angenommen: **0 von 25** Paaren bestehen das, das Minimum über das ganze Raster ist
  **1**, auch beim hellsten Paar. Als Tor wäre es das dritte Verbot in derselben Datei. Der Grund
  ist mehr wert als das Tor: **eine Kamera liegt bei jedem Paar auf dem Boden, auch beim hellsten** —
  ihre Bodenpixel sind kein Grade-Problem, dort ist schlicht kein Licht, und keine Belichtung legt
  welches hin. → Wenn eine strengere Aggregation alles ablehnt, ist die Frage nicht „welche Schranke
  passt", sondern „welche Messobjekte scheitern **unabhängig** vom geprüften Regler". Die gehören auf
  eine andere Rechnung. Und jede Schranke, die das gerade Ausgelieferte durchließe und das nächste
  nicht, ist eine Zahl, die den aktuellen Lauf passend macht — Geschmack in Zahlenform.
  *`material-closeup` auf dem Boden bei Exposure 1,00 / Fill 0,50 wie bei 0,80 / 0,15 ·
  `tools/grade.mjs` · 2026-08-02*
  **↑ GESTÜRZT am selben Tag, siehe nächster Tipp — der zweite Halbsatz war eine Aussage über den
  Rand meines Rasters, nicht über die Welt.**

- **„Keine Einstellung kann das beheben" ist nur so stark wie das durchsuchte Raster** — der Tipp
  darüber schloss aus „`material-closeup` liegt bei jedem Paar auf dem Boden, auch beim hellsten",
  die Kamera sei inhaltsgebunden und gehöre in die Weltphase. Das hellste Paar **dieses Rasters** war
  Exposure 1,00 / Fill 0,50. Nimmt man den Fill bis 1,15 dazu — den Wert, der vor jedem Ranking in
  der Konfiguration stand —, **kommt die Kamera vom Boden herunter**, und über 26 Paare liegt dann
  keine einzige Kamera immer auf dem Boden. An der Kamera war nichts inhaltsgebunden; dem Raster
  fehlte das helle Ende. → Bevor man einen Befund von der geprüften Größe auf die Welt umbucht, den
  **Rand des Rasters** ansehen: liegt der Befund am Rand, ist er eine Aussage über den Rand. Und die
  Menge der „scheitert bei **jedem** Kandidaten"-Objekte in jedem Lauf mitdrucken, dann überlebt die
  Behauptung ihr Raster nicht. Die Preisfrage bleibt, in schärferer Form: über das breite Raster
  bestehen **2 von 26**, das dunkelste davon gibt **89 der 107 gewonnenen Milli-Luma** zurück — die
  strenge Formulierung verlangt keinen besseren Regler, sondern fast keinen.
  *Gegenmessung am selben Tag, gleicher Prozess: auf dem Boden bei 1,00/0,50, nicht mehr bei
  1,00/1,15 · `tools/grade.mjs` · 2026-08-02*

- **Wer eine Ratsche an einem Tor repariert, muss alle Tore derselben Datei durchgehen** — ein Tor
  war absolut gemacht worden, damit es nicht nach jedem Ausliefern auf das zuletzt Ausgelieferte neu
  gesetzt wird. **Zwei weitere Tore derselben Datei taten genau das weiter**, unbemerkt, weil ihre
  Zahl noch nicht wehgetan hatte. Dann tat sie es: beide lehnten ein Paar ab, das vier von fünf
  kaputten Kameras repariert hätte, mit Abständen **unter einem Zähler der gedruckten Genauigkeit**
  (0,0239 gegen 0,0249 und 0,0081 gegen 0,0082) bei einer Wiederholbarkeit von exakt 0,00000. Sie
  lehnten kein schlechteres Bild ab, sondern einen früheren Commit. → „Nicht schlechter als heute"
  auf einen **Punkt im Designdokument** festnageln statt auf die laufende Konfiguration, und ihn **in
  jedem Lauf neu messen** statt die Zahl zu zitieren — sonst veraltet die Referenz beim ersten echten
  Fortschritt. Und: ob die Verankerung den Sieger bewegt, ist eine **andere Frage** als ob sie richtig
  ist. Beide Formulierungen auswerten und die Sieger nebeneinander drucken, dann rechnet sich die
  Änderung keinen Erfolg an, den sie nicht hatte.
  *Verankert auf Exposure 1,00 / Fill 1,15, beide Zahlen stehen wörtlich in der Spezifikation:
  13 statt 5 bestehende Paare, derselbe Sieger · `tools/grade.mjs` · 2026-08-02*

- **Zwei Aussagen, die dasselbe behaupten, sind gegeneinander prüfbar** — die Schranke „Bodenanteil
  ≥ 1 %" wurde damit begründet, dass darüber das 1. Perzentil den Boden beschreibt statt die
  Schatten. Das ist keine Analogie, sondern per Definition des Perzentils dieselbe Aussage von zwei
  Seiten, also **muss** sie auf jedem Messobjekt übereinstimmen. → Wo eine Begründung und ihre
  Schranke identisch sein sollen, beide Prädikate getrennt auswerten und die **Widerspruchszahl**
  drucken. Steht sie auf null, ist die Schranke ihr Zweck und nicht sein Stellvertreter; wird sie je
  ungleich null, ist die Begründung von der Schranke abgerückt und der Lauf sagt es, statt dass es
  jemand merken muss.
  *0 Widersprüche auf 350 Kamera-Messungen (25 Paare × 14) · `tools/grade.mjs` · 2026-08-02*
