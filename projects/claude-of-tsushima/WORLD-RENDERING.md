# Welt und Rendering — claude-of-tsushima

**Lesen wenn:** du Terrain, Wasser, Vegetation, prozedurale Texturen, Licht, PostFX, Bake oder Weltkosten veränderst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Globale Fachowner stehen in [`../../THREEJS-RULES.md`](../../THREEJS-RULES.md). Diese Hinweise benennen nur lokale Mechanismen und Werkzeuge.

- **Plausible lineare Albedo wird fast schwarz** — prozedurale RGB-Werte wurden roh in als sRGB markierte Texturen geschrieben und von der GPU ein zweites Mal dekodiert. → Jede Farbausgabe in `TextureFactory.js` über `srgbByte()` schreiben; Daten-, Normal- und Maskentexturen linear lassen.
  *Strukturstein kam mit 0,032–0,084 statt 0,196–0,318 an; Zedernrinde 0,0059 statt 0,0671 = 11,4× Verlust · PH33/PH5-scha · 2026-07-29/31*

- **Dunkle Fläche wird als Materialproblem getunt** — `DoubleSide` kaschiert invertiertes Winding und kehrt `gl_FrontFacing`/Normalen semantisch um. → Vor Farbe/Licht `tools/winding.mjs` beziehungsweise `tools/probes/facing.mjs` laufen lassen und Front-/BackSide getrennt prüfen.
  *Ozean war wegen invertiertem Ring nahezu schwarz; später zeigten alle Dächer nach unten und Zylinderseiten nach innen · PH6/PH30 · 2026-07-28/29*

- **Custom-Lit-Material wird mehrfach oder gar nicht richtig beleuchtet** — CSM setzt mehrere volle DirectionalLights und `setupMaterial()` überschreibt `onBeforeCompile`; eigener Shader zählt Sonnenintensität leicht doppelt. → Beleuchtete Materialien ausschließlich über `engine.lit()` registrieren und dessen Hook-Reihenfolge beibehalten; Shader nicht nochmals mit `uSunIntensity` verstärken.
  *Grass-Transluzenz war durch `1,35 × Sonnenintensität 6` rund 8× zu stark und clippte weiß; CSM-Hook-Verhalten gegen Three r180 verifiziert · PH1/PH10 · 2026-07-28*

- **Wasserhorizont wird nach Probe-Bake schwarz** — `pmrem.fromCubemap()` ersetzte/disposete das Target, während Wasser die alte Textur-ID behielt. → Das bestehende PMREM-Target wiederverwenden und Environment-Bake vor Settle/System-Updates synchronisieren.
  *Manuelles Neubinden entfernte den Balken; Target-Wiederverwendung machte die Texturidentität stabil · PH8 · 2026-07-28*

- **Entfernung aus dem Bild geschätzt** — Dunst, Halmmaß und Referenzvergleich werden auf der falschen Tiefenskala getunt. → Erst `tools/probes/depth.mjs`/`aerial.mjs` gegen `heightAt()` marschieren, dann den Hebel wählen.
  *Ein vermeintlich 1,2-km-Grat stand bei Median 456 m; das Grasfenster sah Boden in 33–57 m, die Referenz Halme in 0,5–3 m · PH15/PH18 · 2026-07-29*

- **Ferntextur immer stärker, Ferne bleibt glatt** — Mips mitteln genau die subpixelige Frequenz weg; der Szene fehlt ein geometrischer/vegetativer Träger. → Nach einer absurden Rotkontrolle ohne ausreichenden Effekt Textur-Sweeps beenden und Biom-/Silhouettenträger prüfen.
  *±150 % Albedo bei Stärke 3,0 bewegte `rel@1px` nur 0,1014→0,1060 gegen 0,2479 Ziel; 77 % des Fernbands scheiterten stattdessen an `bio.tree < 0.08` · PH46/47 · 2026-07-29*

- **Coverage optimiert die falsche Form** — dieselbe Pixeldeckung kann aus wenigen lesbaren Motiven oder hunderten falschen Karten bestehen. → Weltmaß und projizierte Größe neben Coverage führen; dominantes Merkmal identifizieren, nicht nur dessen Frequenz.
  *Gras-Sweep machte einzelne Halme 10,6–18,5 cm/98 px breit, weil die Referenzstruktur ein Büschel war; 1.728 Zwei-Pixel-Vögel erfüllten dieselbe Deckung wie wenige große · PH1-scha · 2026-07-31*

- **Population-Cap schneidet die Insel geradlinig ab** — der Scatter-Scan bricht bei vollem Array ab und dünnt nicht räumlich fair aus. → Bedarf zuerst unlimitiert zählen, Luft einplanen und bei `capped` laut warnen.
  *26.000/26.000 Stämme waren capped; echter Bedarf 34.348, neuer Deckel 40.000 · PH3-scha · 2026-07-31*

- **Neue Baumart ist trotz weniger Bäume teuer** — Kosten entstehen pro `Chunk × Spezies × Pass`, nicht pro Instanz. → Erst Hain-Ausdehnung/Bucketzahl reduzieren; Dichte innerhalb vorhandener Buckets ist der billigere Hebel.
  *6 Ahorne kosteten 38 Calls, 170 Ahorne 56; Entfernen eines Randchunks spart 26 % der Kosten bei 2,5 % der Bäume · PH52 · 2026-07-29*

- **Teich auf bereits verformter Karte beurteilt** — Spill-/Ringwerte werden zirkulär aus dem Carve abgeleitet; nachfolgendes Straßen-Grading füllt die Wanne wieder. → Standort auf der unveränderten Karte ablehnen (`pondpick`), Größe nur am echten finalen Bake (`pondbake`) entscheiden und Straßen als Blocker führen.
  *Drei Schichten auf zirkulären Spill-Werten; Meadow-Verlust zerlegt in 0,108r Kuppel + 0,240r Straße, finaler Bake verfehlte Vorhersage noch um 22 % Dig/45 % Fläche · `review/ph55-pondnat.txt`, `ph56-pondbake.txt` · 2026-07-30*

- **Mehr globale Sättigung repariert lokalen Kontrast** — die Farbe erreicht zwar das Ziel, klemmt aber einen Kanal großflächig auf null. → `uSaturation` nicht als Grashebel verwenden; lokale Materialantwort oder den klemmfreien `uAgxSat`-Pfad mit `bClip` prüfen.
  *Sättigung 1,45 klemmte bei 27,4 % des besonnten Vordergrunds Blau; 1,10 senkte mittleren Fehler 28,95 %→13,35 % bei 0,95 % Clipping · PH28/PH27-third-person · 2026-07-29/08-01*

- **Dämmerungswäsche im Tonemapper gesucht** — Post-Knee kann eine bereits überstrahlte HDR-Kuppel nur komprimieren, nicht zurückgewinnen. → Vor PostFX `sceneTarget` bandweise prüfen und den Sky-Term zerlegen.
  *Mittagshimmel 0,6–0,99 linear, Dämmerung 1,3–2,7 abseits und 7–20 nahe Sonne; Low-Sun-Enhancement verstärkte 2,5× bis 7,3× · PH7-scha · 2026-07-31*
