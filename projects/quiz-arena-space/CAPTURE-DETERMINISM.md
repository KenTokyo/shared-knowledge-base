# Capture-Harness und Determinismus — quiz-arena-space

**Lesen wenn:** du `tools/cdp.mjs`, `tools/shoot.mjs`, `tools/serve.mjs`, `src/capture/` anfasst oder zwei Läufe gegeneinander vergleichen willst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

> **Auf dem aktuellen Arbeitsrechner ist dieser Pfad gesperrt.** Kein Browser, auch kein headless — der
> Rechner stürzt sonst ab, und das schlägt jede Anweisung, die „einmalig headless Chromium starten" sagt.
> Was ohne GPU noch geht: `node tools/sim.mjs`, `node tools/selftest.mjs`, `node .shots/_board.mjs`. Die
> Tipps hier bleiben stehen, weil sie auf einer Maschine gelten, die den Harness fahren darf — und weil der
> erste von ihnen erklärt, *warum* der Rechner damals stehenblieb.

- **Jeder Screenshot legte den Rechner minutenlang lahm** — die Seite rasterte unter dem Software-Renderer
  **jeden** Warm-up-Frame mit Normalpriorität auf allen Kernen; dazu liefen verwaiste Headless-Bäume weiter. → Vor
  jeder optionalen Capture-Ausnahme Rendererkennung prüfen und bei Software sofort abbrechen; nicht
  herabpriorisieren, nicht ranken, nicht durch Workarounds fortsetzen. Auf erlaubter Hardware nur den exportierten
  Frame rastern (`Renderer.skipRaster`, `src/render/Renderer.ts:810`) und Prozessbäume zuverlässig beenden.
  *8 verwaiste Chrome-Prozesse mit zusammen 384 CPU-Sekunden; bei `capture=14` waren das ~840 gerasterte Frames für
  einen — Beleg für Fail-fast statt Software-Capture · 2026-07-28*

- **Mit stillgelegtem Rasterizer verhungert die Renderschleife sofort** — `requestAnimationFrame` wird vom
  Compositor getrieben, und der liefert keine Frames für eine Seite, die nicht zeichnet. → Capture-Schleifen
  (Spiel **und** Gallery) auf `setTimeout` mit festem `dt = 1/60` umstellen.
  *Reproduzierbarer Abbruch nach 2,7 s ohne einen Frame, auch bei `capture=1.0`; danach meldet der Titel
  exakt `t=2.6s` · 2026-07-28*

- **Die Szene wandert trotz Seed und festem Timestep** — der Seed-Patch ersetzt `Math.random` **global**,
  und three zieht daraus vier Werte pro Objekt: `Object3D`, `BufferGeometry` und `Material` rufen je
  `generateUUID()`. Jede Änderung an der Zahl gebauter Meshes verschiebt damit die komplette
  Simulationssequenz, und das liest sich exakt wie eine Gameplay-Regression. → Erst an der
  Simulationsgrenze neu seeden (`reseedSim()`, `src/core/Diagnostics.ts:155`), nach dem Boot und vor dem
  Szenario.
  *~10 nicht gebaute Objekte kippten die Szene von `enemies=3/proj=2` auf `4/4`; danach beide Arme
  byte-identisch (md5 `1c2bbcd1…`) bei `draws 306→308` · 2026-07-28*

- **Eine geseedete Bench würfelt nach einem simulierten Tastendruck neu** — die Audio-Buffer werden
  sampleweise aus `Math.random` gebaut, und `audio.init()` hängt an einem `keydown`, das die Bench selbst
  dispatcht: mitten in der Sequenz werden ~300.000 Werte gezogen. → Ein **eigener** Generator im
  Audio-Modul, unabhängig vom globalen Strom (`src/fx/Audio.ts:38`).
  *~300.000 Ziehungen bei Bench-Schritt 24; zuvor hatten bereits ~40 Ziehungen aus zehn Geometrie-Objekten
  einen Capture verschoben · 2026-07-29*

- **A/B über zwei Verzeichnisse verglich in Wahrheit zwei verschiedene Kämpfe** — die Abnahme ruhte auf
  „der Fix fasst den Zufallsstrom nicht an". Der Quelltext-Diff stimmte, die Schlussfolgerung nicht: das
  Szenario hält auch bei **völlig unverändertem** Code nicht still. → Vor jedem Zwei-Arm-Vergleich einen
  Kontrolllauf desselben Bundles gegen sich selbst fahren; erst dessen Streuung sagt, was ein Unterschied
  bedeuten darf.
  *Gleicher Pin, Seed 1, zweimal hintereinander: `enemies=20/25`, `pool=3/81` gegen `3/38`, `rated=6/10`
  gegen `1/10`, `mean=0,1429` gegen `0,2439`, ein Lauf sogar rot · 2026-07-31*

- **Signifikanz, die über zwei Bundles zusammengepoolt war** — „neun Ereignisse ohne Überlappung, p≈0,016"
  bestand zu sechs Teilen aus Läufen zweier Builds, also genau dem Confound, für dessen Beseitigung der
  Schalter überhaupt gebaut worden war. → Nur Läufe **eines** Bundle-Hashes poolen und jede geerbte Zahl
  gegen die Dateien nachrechnen, bevor darauf aufgebaut wird.
  *Auf reinen Ein-Bundle-Läufen bleiben 3 statt 9 Ereignisse, 1 gegen 2, p = 1/3; korrigierte Rate 2,9 %
  gegen 1,2 %, ohne den einen 38-Schiff-Nenner nur 2,5 % gegen 1,2 % bei p≈0,08 · 2026-07-30*

- **Ein volles Ergebnisverzeichnis, zusammengesetzt aus zwei Läufen** — der Runner leert `--out` nicht, der
  Lauf starb still mit Exit 127, und `| tail` verschluckte den Exit-Code. → Nach jedem Lauf mtimes **und**
  das Bundle-Feld der JSONs vergleichen; die Ausgabe eines Laufs nie durch eine Pipe abschneiden.
  *Der Lauf starb nach 18 von 27 Szenarien, das Verzeichnis enthielt trotzdem 27 Dateien — 18 aus
  `index-BY07DnZw.js`, 9 aus `index-BhYtcP0h.js` · 2026-07-30*

- **Verschiedene Bildhashes bei zeichengleichem Report** — ein md5-Unterschied wurde als Inhaltsänderung
  gelesen; es war Rasterrauschen des Software-Renderers, dünn über das ganze Bild gestreut. → Die
  Hash-Differenz **messen** statt sie zu deuten; md5 gilt nur dort als Gleichheitsbeweis, wo
  Byte-Stabilität vorher über mehrere Läufe nachgewiesen ist.
  *1,301 % der Pixel abweichend, mittlere Abweichung 1,12, Maximum 8/255, kein Pixel darüber — gegenüber
  5 byte-identischen Läufen desselben Szenarios · 2026-07-29*

- **DOM-Overlays sind über den GL-Puffer strukturell unfotografierbar** — der Screenshot ist `readPixels`
  auf dem Render-Target, DOM wird vom Browser **darüber** komponiert und berührt den Puffer nie; vier bit-identische
  Menü-Captures galten deshalb als Kuriosum statt als Deckungslücke. → Kein zweiter Compositor-Bildpfad:
  DOM-Geometrie, Text, Sichtbarkeit und Kontrast numerisch in einer Seitenauswertung prüfen; die visuelle UI-Abnahme
  dem User überlassen. `Page.captureScreenshot`/`page.screenshot()` bleiben verboten.
  *Ein-Variablen-Beweis über eine reine DOM-Änderung: GL-Frames byte-identisch (imgdiff 0/891120), damalige
  Compositor-Frames 34,235 % auseinander — Beleg für getrennte DOM-Metrik statt Browserbild · 2026-07-31*

- **Nach falschem Content-Type ist jede Folgemessung plausibel und falsch** — der In-Memory-Server leitete
  den MIME-Typ aus dem **Request-Pfad** ab; bei `/?capture=2` ist der Pfad `/`, die Extension-Suche
  scheitert, Chrome lädt die Seite herunter statt sie zu rendern, und der Tab bleibt auf `about:blank`. →
  Erst den Key auflösen (`/` → `/index.html`), dann die Extension aus dem **Key** lesen.
  *`Page.navigate` antwortete `{errorText:'net::ERR_ABORTED', isDownload:true}`; danach meldete dieselbe
  Seite `readyState:'complete'`, leeren Titel und eine leere Resource-Liste · 2026-07-30*

- **Ein Vorher/Nachher-Paar ist bit-identisch, weil beide Frames leer sind** — der Bench meldete an der
  Stelle noch ~24 lebende Partikel; sie waren auf Alpha 0 ausgeblendet. **Lebend ist nicht sichtbar.** →
  Zeitpunkte über eine gemessene Ausblendkurve wählen, nie über einen Lebensdauer-Zähler.
  *Ausblendkurve: 1,35 s 0,40 % · **1,70 s 36,1 %** · 2,20 s 24,9 % · 2,90 s 0,03 % · 3,20 s und 3,60 s
  0 %, Paar bit-identisch — der `mean` beider Zellen war dabei identisch · 2026-07-30*

- **Ein zu kurzer `capture=`-Wert liest sich wie ein Spielfehler** — zwei Benches meldeten fehlende
  Elemente und sahen nach Regression aus; die Kommentare nannten Zeiten, die neuere Schritte gar nicht mehr
  erreichen. → Vor jeder Fehlersuche den `capture=`-Wert gegen die tatsächliche Schrittzahl prüfen. Und:
  **jeden Lauf sofort lesen** — der Report existiert nur in der Konsolenausgabe, das PNG überlebt ihn.
  *`hazards&capture=82` → `TYPES:6/7`, mit 112 s grün; `clicks&capture=12` → `STEPS:23/39`, mit 22 s grün.
  Zwei Schichten in Folge verloren ihre Messung, während das PNG auf der Platte lag · 2026-07-29*
