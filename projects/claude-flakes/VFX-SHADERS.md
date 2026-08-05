# VFX und Shader — claude-flakes

**Lesen wenn:** Kristalle, Wasser, Vapor, Partikel, PostFX, Terrainkontakt oder WGSL.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Schwarzer PostFX-Block am Verstärker repariert** — fp16 `+Inf` erzeugt Karis `Inf*0`, Soft-Knee `Inf/Inf`; Bloom vergrößert nur. → NaN vor `min`, Inf am Downsample-Eingang klemmen, Szenenquelle verfolgen.
  *16-px-Block = 1 NaN-Texel auf 1/16; Guard entfernte Block, legte Quelle frei · 2026-07-30*

- **Sterbender Vapor mit NaN-Alpha** — Lebenscheck vor `age+=h`; danach `pow(negativ,1.5)`. → Normalisierte Lebenszeit vor Potenz `[0,1]` klemmen.
  *Schwarzpixel 28.418→0; 18/25 Matrixframes bitgleich · 2026-07-30*

- **Röhre mit Sägezähnen trotz glatter Geometrie** — Vorder-/Rückwand ohne Depth-Write mischen in Indexreihenfolge. → Fern-/Nahwand als zwei Cull-Pässe; Flat-Color und Cullrichtungen getrennt.
  *Zahnpitch 176 Gridspalten, nicht 64 Datenknoten; 27→28 Draws, ~1,0 ms · 2026-07-30*

- **Shaderterm sechsmal unter Pixelraster** — 0,13–0,25-px-Risse werden unter TAA Speckle; Breite erhöht Coverage. → Feature in Pixeln; Frequenz+Breite sweepen statt Hochpass-Sigma.
  *TAA-Überleben Risse 54 %, ~3-px-Einschlüsse 81 %; Modell 53,8 % · 2026-07-31*

- **Sekundäreffekt feuert beim Anlegen** — Schnee/`frost.grow` 0,11–0,60 s vor Prisma. → Emission/Audio an individuelle Growth-Uhr statt `_plant`.
  *Population t1,0: 814→265; bei lesbarem Eis t1,6: 246→649, ohne neues Korn · 2026-07-31*

- **Unsortierter Plan blockiert Folgereihen** — erster später Shard stoppt frühere; 12–17 Prismen in einem Frame. → Je Cast nach Delay sortieren oder alle fälligen besuchen; Signal > Jitter.
  *Insertion-Sort Worst 17→4; klein→groß über 0,25 s · 2026-07-30/31*

- **Bodennebel driftet als Band** — Drag nähert Wind 2,4 m/s statt null; 2,5-m-Radius reist 6–11 m. → Windkopplung nach Bodenhöhe; Boden-/Steigschicht getrennt.
  *Vapor Delta≥12 0,43→1,67 %; Ripple 85 % an Basen, 71 % Vortex-Worst · 2026-07-30*

- **Dünner Kristall ohne Schneekontakt** — Brush folgt entkoppelter Taille; 9-cm-Kontakt bei 18-cm-Berm. → Footprint aus Lean/Höhenprojektion plus Mindestfuß; Wall klemmen.
  *0,67 % Frame lokal; Naht −6,0/−4,6/−3,0 Level · 2026-07-30*

- **Dimensionslose Grenze gegen Meter-Scatter** — 0,167 Höhe = 0,46 m bei 2,73 m; Scatter 0,30 m. → CPU/GPU gleiche Einheit; Seed×Höhen-Population.
  *Clamp 0,28 m: 0/65.536 über Eis, 27,7 % Kappen unverändert · 2026-07-30*

- **WGSL/JS-Doppelkonstante driftet lautlos zu Rauschen** — WGSL kann nicht importieren, also steht die Layoutzahl beidseitig als Literal; driftet sie, adressiert der Indexbuffer verschobene Vertexgruppen. Kein Wurf, keine Konsolenzeile, `npm run build` und `node --check` blind — sichtbar nur im Bild, in einem Projekt mit 1–2 erlaubten Sichtprüfungen. → Explizite Paarungstabelle in `tools/const-parity.mjs`, verdrahtet als Vite-Plugin (`buildStart`) in `vite.config.js`; deckt `dev`, `build` und jedes Capture-Werkzeug ab, weil alle über `serve.mjs` dieselbe Config hochziehen. Fehlender Name, doppelter Name und Nicht-Literal sind Fehler, nie Skip. Blanke Kehrwerte (`* 0.25`) vorher benennen — ungenannt nicht prüfbar.
  *Namens-Sweep verworfen: 4 Kollisionen, nur 2 echte Paare — `REACH` 0.82 (Shafts) vs. 1.9 m (Wights), `SINK` 3.7 m vs. 0.9 s. Alle drei Fehlermodi absichtlich gebaut: Skript und Build je Exit 1 · 2026-08-03*
