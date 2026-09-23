# Welt und Rendering — claude-of-tsushima

**Lesen wenn:** Terrain, Wasser, Vegetation, Texturen, Licht, PostFX, Bake oder Weltkosten.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Global: [`THREEJS-RULES.md`](../../THREEJS-RULES.md). Hier nur lokale Mechanismen/Werkzeuge.

- **Lineare Albedo fast schwarz** — RGB roh in sRGB-Textur, GPU dekodiert erneut. → Farbausgabe in `TextureFactory.js` via `srgbByte()`; Daten/Normal/Masken linear.
  *Stein 0,032–0,084 statt 0,196–0,318; Rinde 0,0059 statt 0,0671 (11,4× Verlust) · PH33/PH5 · 2026-07-29/31*

- **Dunkle Fläche als Materialproblem** — `DoubleSide` kaschiert invertiertes Winding und dreht FrontFacing/Normalen. → Vor Farbe/Licht `winding.mjs`/`facing.mjs`; Front-/BackSide getrennt.
  *Ozeanring invertiert; später alle Dächer nach unten, Zylinderseiten innen · PH6/PH30 · 2026-07-28/29*

- **Custom-Lit falsch beleuchtet** — CSM setzt mehrere volle DirectionalLights; `setupMaterial()` überschreibt Hook; Shader zählt Sonne doppelt. → Nur `engine.lit()` samt Hook-Reihenfolge; kein zweites `uSunIntensity`.
  *Gras durch 1,35×Sonne 6 ~8× zu stark/weiß; gegen Three r180 verifiziert · PH1/PH10 · 2026-07-28*

- **Wasser nach Probe-Bake schwarz** — `pmrem.fromCubemap()` ersetzte/disposete Target, Wasser hielt alte Texture-ID. → PMREM-Target wiederverwenden; Bake vor Settle/Updates synchronisieren.
  *Manuelles Rebind entfernte Balken; Wiederverwendung stabilisierte Identität · PH8 · 2026-07-28*

- **Entfernung aus Bild geschätzt** — Dunst/Halmmaß/Referenz auf falscher Tiefe. → Erst `depth.mjs`/`aerial.mjs` gegen `heightAt()`, dann Hebel.
  *„1,2-km“-Grat Median 456 m; Grasfenster 33–57 m vs. Referenz 0,5–3 m · PH15/18 · 2026-07-29*

- **Ferntextur stärker, Ferne glatt** — Mips entfernen subpixelige Frequenz; geometrischer/vegetativer Träger fehlt. → Nach absurder Rotkontrolle Textur-Sweep beenden, Biom/Silhouette prüfen.
  *±150 % Albedo bei Stärke 3: `rel@1px` 0,1014→0,1060 vs. Ziel 0,2479; 77 % Fernband an `bio.tree<0.08` · PH46/47 · 2026-07-29*

- **Coverage optimiert falsche Form** — gleiche Deckung aus wenigen Motiven oder hunderten Karten. → Weltmaß/projizierte Größe neben Coverage; dominantes Merkmal statt Frequenz.
  *Halme 10,6–18,5 cm/98 px, Referenz war Büschel; 1.728 Zwei-Pixel-Vögel erfüllten gleiche Deckung · PH1 · 2026-07-31*

- **Population-Cap schneidet Insel ab** — Scatter-Scan bricht bei vollem Array statt fair auszudünnen. → Bedarf unlimitiert zählen, Reserve, bei `capped` warnen.
  *26.000/26.000 capped; Bedarf 34.348, neuer Deckel 40.000 · PH3 · 2026-07-31*

- **Neue Baumart teuer trotz weniger Bäume** — Kosten `Chunk × Spezies × Pass`, nicht Instanzen. → Hain/Buckets zuerst; Dichte in bestehenden Buckets billig.
  *6 Ahorne 38 Calls, 170 Ahorne 56; Randchunk −26 % Kosten bei 2,5 % Bäumen · PH52 · 2026-07-29*

- **Teich auf verformter Karte bewertet** — Spill/Ring zirkulär aus Carve; Straße füllt Wanne. → Standort auf Rohkarte via `pondpick`; Größe am finalen `pondbake`; Straßen blocken.
  *3 Schichten zirkulär; Meadow-Verlust 0,108r Kuppel +0,240r Straße; Bakefehler 22 % Dig/45 % Fläche · PH55/56 · 2026-07-30*

- **Globale Sättigung repariert lokalen Kontrast** — Ziel erreicht, Kanal klemmt großflächig null. → `uSaturation` nicht für Gras; lokale Antwort oder `uAgxSat` plus `bClip`.
  *1,45 klemmte Blau in 27,4 % Vordergrund; 1,10 Fehler 28,95→13,35 %, Clipping 0,95 % · PH28/PH27 · 2026-07-29/08-01*

- **Dämmerungswäsche im Tonemapper gesucht** — Post kann überstrahlte HDR-Kuppel nur komprimieren. → `sceneTarget` vor Post bandweise, Sky-Term zerlegen.
  *Mittag 0,6–0,99 linear; Dämmerung 1,3–2,7, sonnennah 7–20; Low-Sun +2,5× bis 7,3× · PH7 · 2026-07-31*

- **Prozedurales Detail unter 12 px in den Bumpterm gelegt** — `dFdx`/`dFdy` sind Ein-Pixel-Differenzen, keine Ableitungen; ein Höhenfeld mit 5,4 px Periode springt 66° je Pixel, und darüber liefert die Differenz keine Steigung mehr, sondern eine Schwebung. Über einen gekrümmten Körper, dessen Periode perspektivisch wandert, wird daraus Cordsamt: durchgehende Rillen statt Gewebe. → Rezept in **zwei** Felder trennen — grob (Periode ≥ 12 px bei Prüfmaßstab) kippt die Normale, fein färbt nur und treibt die Rauheit. Struktur unter Pixelgröße *ist* Rauheit, das ist die Definition im Microfacet-Modell. Der Gegenbeweis steht im selben Bild: eine Nachbarfläche derselben Geometrie ohne feine Oktave bleibt glatt, also liegt es nie an den Segmenten.
  *`sin(p.x*349)` = 18 mm = 5,4 px bei 300 px/m; `hide` 2,1 px, `skin` 2,7 px. Nackter Oberarm glatt bei gleicher 22-Segment-Lathe · PH10 · 2026-08-04*

- **`bump` als Prozentzahl gesetzt, und `toFixed` frisst den Rest** — der Term kippt um `atan(bump · dH/dp)`, also ist `bump` eine **Länge** je Feldeinheit; 0,055 bei Gradient 45/m sind 68° statt der gemeinten 5 %. Zwei Schritte später schnitt `toFixed(3)` im GLSL-Codegen aus 0,0022 stumm `0.002`, und 0,0004 wäre `0.000` geworden — Bump lautlos aus. → Zielwinkel authoren und `bump = tan(Winkel) / Gradient` rechnen, Gradient je Oktave als `a·k` (Sinus) bzw. `1,5·f` (Wertrauschen), quadratisch addiert; Zahl als Kommentar neben das Rezept, damit die nächste Frequenzänderung sie mitzieht. Float-Literale über einen Helfer mit sechs Nachkommastellen statt `toFixed(3)`.
  *Median 24,7 → 43,3 (`roh`) und 32,7 → 43,7 (`ronin`) bei unverändertem Material — eine ganze Blende aus einer Einheit · PH10 · 2026-08-04*
