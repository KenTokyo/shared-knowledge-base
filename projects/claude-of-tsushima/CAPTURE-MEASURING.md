# Capture und Messwerkzeuge — claude-of-tsushima

**Lesen wenn:** du eine Probe, einen Sweep, eine Capture, eine Referenzmetrik oder eine Framekostenmessung schreibst oder deutest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Globale Grundlagen stehen in [`../../threejs/MEASURING.md`](../../threejs/MEASURING.md) und [`../../threejs/DEBUG-REVIEW.md`](../../threejs/DEBUG-REVIEW.md). Hier folgen nur die lokalen Fallen.

- **Zwei Bridge-Aufrufe messen zwei verschiedene Frames** — zwischen CDP-Roundtrips läuft die Seite und überschreibt Render-Targets; dadurch erschien Wasser sogar heller als der Himmel. → Mutation, `capturing`, Render und Readback in **einem** `ctx.eval` halten oder die vorhandenen `src/capture/Probe.js`-Hilfen benutzen.
  *Erste Wasser-Messreihe vollständig verworfen; später holte ein After-Pose-Read stabil ein Fremdframe mit Row 389 um 4,29–6,21 % zu niedrig · PH6/PH69 · 2026-07-28/30*

- **`post.render(false)` nach Hide ändert nichts** — die Post-Kette verarbeitet noch das alte Scene-Target; das sieht wie ein toter Regler aus. → Nach jeder Szenenmutation zuerst `engine.renderScene()`, dann `post.render(false)`, dann im selben Besitzfenster lesen.
  *Hide-Ablation meldete 0 geänderte Pixel ohne Fehler, bis der fehlende Szenenrender auffiel · PH32 · 2026-07-29*

- **Tree-Hide wird beim nächsten Update aufgehoben** — `TreeField.update()` setzt `visible` und `castShadow` aus LOD/Distanz neu; Masken lesen dann nur Stämme oder leere Kronen. → Erst live setteln, dann Capture einfrieren; Sichtbarkeit exakt restaurieren und Schatten über `shadowFarOverride` statt gegen `update()` steuern.
  *83/249 Kronen kamen zurück; reparierte `stand.mjs`-Closure stieg bei drei Posen um 7,26× bis 16,19×; `canopy.mjs` ging von leerer Maske/Crash auf 3/3 Gates · `review/ph60-lawnbox.txt`, `ph62-canopy.txt`, `ph63-stand.txt` · 2026-07-30*

- **Renderer-Zähler zählen Vorgängerframes mit** — `renderer.info.autoReset` ist aus; eine Pose wirkt dadurch dutzendfach teurer. → Direkt vor und nach dem fraglichen Render `renderer.info.reset()`/Snapshot verwenden; `ct.frame()` nie als Renderkosten-Loop missbrauchen.
  *4.181.352 Dreiecke × 68 = 284.331.936 und 436 Draws × 68 = 29.648; Gras fiel nach Fix von ~67 Mio. auf 993.600 Dreiecke · PH13 · 2026-07-31*

- **Kontrolle enthält das Subjekt** — überlagerte Figuren, Bäume oder Wasser löschen die Hide-and-Diff-Maske beziehungsweise bewegen die vermeintliche Kontrollbox mit. → Andere Subjekte parken, `outside%`/Subjektanteil ausgeben und die Kontrolle im selben Lauf absichtlich bewegen.
  *Übereinander stehende Gegner ließen den Archer 49 statt 174 px messen; alte Treeline-Kontrollen bestanden zu 31 %/74 % aus Kronen · PH38/PH61 · 2026-07-29/30*

- **Gleiche Spalte, anderes Target** — `ct.regions()` liest standardmäßig HDR, PNG-Tools LDR; identische Namen verleiten zum direkten Vergleich. → Target und Farbraum im Tabellenkopf führen und keine HDR/LDR-Zahl gegeneinander ranken.
  *Dasselbe Blütenrechteck las 5,77 in HDR und 2,79–2,92 in LDR; zunächst als Regression gedeutet · PH22 · 2026-07-29*

- **Rechteckargumente still vertauscht** — `crop.mjs` nutzt `x0,y0,x1,y1`, mehrere Statistiktools `x0,x1,y0,y1`; beide Formen sind syntaktisch gültig. → Vor der ersten Entscheidung den Crop einmal erzeugen oder das Rect über benannte `{x,y}`-Felder führen.
  *Falsche Rechtecke lieferten plausible Werte ohne Fehler; die drei Konventionen stehen in `tools/crop.mjs`, `tools/rect.mjs` und älteren Probes · PH29 · 2026-07-29*

- **Sweep schreibt gegen einen regenerierten Wert** — `Environment.update()`/`pinClock()` baut Grade und Sky-Uniforms nach jedem externen Set neu; die Tabelle bleibt flach. → Über `gradeOverride`/`skyOverride` im selben Render schreiben und den angewandten Uniformwert zurücklesen.
  *Sättigung 1,06→1,60 bewegte vier Nachkommastellen exakt null; nach `gradeOverride` war der Hebel messbar · PH11 · 2026-07-28*

- **Shot-lokale Referenzzahl reist in fremde Kamera** — ein grassland-Crop wurde auf Sunset/Shrine angewandt und gab dort technisch präzisen Unsinn aus. → Referenz-ID am Zielwert tragen und fremde Shots über `tools/probes/refshot.mjs` zurückweisen.
  *Audit: 0 tight/0 mixed/20 loose, später 0/1/23; `grade.mjs` hätte Sunset um Faktor 3,2 entsättigt · `tools/spread.mjs` · 2026-07-29*

- **Source-Edit während Messlauf** — Vite-HMR lädt die Seite unter Recorder/Probe neu; Bridge oder Recorder verschwindet und das Resultat sieht wie Toolflakiness aus. → Während `framecost`, Probe oder Capture läuft nichts unter `src/` ändern; erst Prozessende, dann Edit.
  *Weapon-Edit während `framecost` kostete eine Schicht; Wiederholung ohne HMR lief mit `preconditions: all pass` · `review/ph19/framecost.txt` · 2026-08-01*

- **Raw-Rate bewertet fremde GPU-Last** — dieselbe Kampfszene springt je nach paralleler Chrome-Last in ein anderes Regime. → Renderer, Fremdlast und warme Quantile protokollieren; Entscheidungen gepaart treffen und `slowdownToFlip` statt einer Einzelrate lesen.
  *Eine Tier-Spalte schwankte 0,2–14,7 % = Faktor 74, obwohl GPU-Takt/Temperatur sauber waren; robuste Flip-Schranke blieb 1,4×–3,3× · `review/ph72-framecost.txt` · 2026-07-30*

- **Zielzahl aus der Übergabe statt aus dem Instrument** — eine weitergereichte Referenzzahl ohne Rechteck ist nicht prüfbar, und `stops`/`p99-med` hängen vollständig am gewählten Kasten. → Zielwerte nur aus dem Probe-Lauf zitieren, der sie druckt; wer eine Zahl übergibt, gibt Datei **und** Rechteck mit.
  *„1.97 Blenden / p99-med 5.64" reiste durch drei Übergaben und existiert nirgends: `foreground.mjs` druckt seit jeher `stops 1.75`, unser Stand las 1.54 statt der behaupteten 1.17. Auf denselben Refs schwankt dieselbe Metrik je nach Kasten 1,21–2,24 stops und 2,40–14,95 p99/med · `review/ph30/foreground.txt`, `hist-ref.txt`, `hist-ref2.txt` · 2026-08-01*

- **JPEG-Referenzen sind für die Messkette unsichtbar** — alles geht über `pngstat.mjs`'s `loadPng`, das nur PNG kann; ein `refs/*.jpg` liegt da, ist aber für `hist`, `hue`, `rect` und `crop` nicht existent. → `node tools/jpg2png.mjs refs/x.jpg` davorschalten; das Tool nennt vorher die ICC-Lage der Datei und prüft den Roundtrip gegen `loadPng`.
  *Drei Referenzen lagen zwei Schichten lang unmessbar im Repo, darunter der einzige Third-Person-Grasvergleich; alle drei ohne ICC-Profil, also ist die Farbraumfrage hier gegenstandslos · `review/ph30/jpg2png.txt` · 2026-08-01*
