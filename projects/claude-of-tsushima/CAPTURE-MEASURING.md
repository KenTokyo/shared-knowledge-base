# Capture und Messwerkzeuge — claude-of-tsushima

**Lesen wenn:** Probe, Sweep, Capture, Referenzmetrik oder Framekostenmessung.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Global: [Messhandwerk](../../threejs/MEASURING.md) · [Debug/Review](../../threejs/DEBUG-REVIEW.md).

- **Zwei Bridge-Aufrufe, zwei Frames** — CDP-Roundtrips lassen Seite laufen und Targets überschreiben. → Mutation, `capturing`, Render, Readback in einem `ctx.eval`; alternativ `src/capture/Probe.js`.
  *Wasserreihe verworfen; After-Pose-Read holte Fremdframe, Row 389 um 4,29–6,21 % zu niedrig · PH6/PH69 · 2026-07-28/30*

- **`post.render(false)` nach Hide wirkungslos** — Post verarbeitet altes Scene-Target. → Nach Mutation `engine.renderScene()`, dann `post.render(false)`, dann im selben Besitzfenster lesen.
  *Hide-Ablation 0 Pixel bis fehlender Szenenrender auffiel · PH32 · 2026-07-29*

- **Tree-Hide vom Update aufgehoben** — `TreeField.update()` setzt `visible`/`castShadow` aus LOD neu. → Live setteln, Capture einfrieren, Sichtbarkeit exakt restaurieren; Schatten per `shadowFarOverride`.
  *83/249 Kronen zurück; `stand.mjs`-Closure 7,26×–16,19×; `canopy.mjs` leer/Crash→3/3 Gates · PH60–63 · 2026-07-30*

- **Renderer-Zähler enthalten Vorgängerframes** — `renderer.info.autoReset=false`; Pose wirkt dutzendfach teurer. → Direkt vor/nach Render resetten/snapshotten; `ct.frame()` nie als Kostenloop.
  *4.181.352 Tris×68=284.331.936; 436 Calls×68=29.648; Gras nach Fix ~67 Mio.→993.600 Tris · PH13 · 2026-07-31*

- **Kontrolle enthält Subjekt** — Figuren/Bäume/Wasser löschen Hide-Diff-Maske oder bewegen Kontrollbox. → Fremdsubjekte parken, `outside%`/Subjektanteil ausgeben, Kontrolle absichtlich bewegen.
  *Überlagerter Archer 49 statt 174 px; Treeline-Kontrollen 31 %/74 % Kronen · PH38/PH61 · 2026-07-29/30*

- **Gleiche Spalte, anderes Target** — `ct.regions()` HDR, PNG-Tools LDR. → Target/Farbraum im Kopf; HDR und LDR nie ranken.
  *Blütenrechteck 5,77 HDR vs. 2,79–2,92 LDR; zunächst Regression · PH22 · 2026-07-29*

- **Rechteckargumente vertauscht** — `crop`: `x0,y0,x1,y1`; Statistiktools: `x0,x1,y0,y1`; beides gültig. → Testcrop oder benannte `{x,y}`-Felder.
  *Plausible Fehlwerte; drei Konventionen in `crop.mjs`, `rect.mjs`, alten Probes · PH29 · 2026-07-29*

- **Sweep gegen regenerierten Wert** — `Environment.update()`/`pinClock()` baut Grade/Sky-Uniforms neu. → `gradeOverride`/`skyOverride` im Render; Applied Uniform zurücklesen.
  *Sättigung 1,06→1,60: vier Nachkommastellen null; Override machte Hebel messbar · PH11 · 2026-07-28*

- **Shot-lokale Referenz in fremder Kamera** — Grassland-Crop auf Sunset/Shrine liefert präzisen Unsinn. → Referenz-ID am Ziel; fremde Shots per `refshot.mjs` ablehnen.
  *Audit 0 tight/0 mixed/20 loose, später 0/1/23; `grade.mjs` hätte Sunset 3,2× entsättigt · 2026-07-29*

- **Source-Edit während Messlauf** — HMR entfernt Bridge/Recorder. → Während Framecost/Probe/Capture nichts in `src/`; Prozessende vor Edit.
  *Weapon-Edit kostete Schicht; Wiederholung ohne HMR `preconditions: all pass` · PH19 · 2026-08-01*

- **Raw-Rate misst Fremdlast** — parallele Chrome-Last verschiebt GPU-Regime. → Renderer, Last, warme Quantile protokollieren; gepaart entscheiden; `slowdownToFlip` statt Einzelrate.
  *Tier-Spalte 0,2–14,7 % (×74), Flip-Schranke 1,4×–3,3× · PH72 · 2026-07-30*

- **Zielzahl aus Übergabe statt Instrument** — Zahl ohne Rechteck ist unprüfbar; `stops`/`p99-med` hängen am Crop. → Nur druckenden Probelauf zitieren; Datei plus Rechteck.
  *„1.97 / 5.64“ nirgends; Instrument 1.75, Stand 1.54 statt 1.17; gleiche Refs je Crop 1,21–2,24 stops, 2,40–14,95 p99/med · PH30 · 2026-08-01*

- **JPEG für Messkette unsichtbar** — `loadPng` liest kein JPG. → `node tools/jpg2png.mjs refs/x.jpg`; ICC-Lage und PNG-Roundtrip prüfen.
  *Drei Refs zwei Schichten unmessbar, inklusive einzigem Third-Person-Grasvergleich; alle ohne ICC · PH30 · 2026-08-01*
