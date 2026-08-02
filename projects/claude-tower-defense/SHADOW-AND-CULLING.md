# Schattenpass, Culling und Kosten — claude-tower-defense

**Lesen wenn:** Culling, LOD, `castShadow`, Cascade oder Dreieckszahl.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Schattenkosten nur pro Schicht** — „Props 2 ms“ verdeckt Sortenhebel. → Per Sorte mit `renderer.info` in handgezeichnetem Frame, vor Kandidat.
  *809.944 Tris; eine Schicht 93,4 %, darin Sorte 55 %, zweite 33 % aus 130 Instanzen; bestätigte unabhängigen Befund · 2026-08-01*

- **`frustumCulled=false` neutralisiert Cascade** — Box ±78→±50 m: 0 Tris/Calls, weil ShadowMap Frustumtest kurzschließt. → Flags lesen; absurd kleine Box als Gegenprobe.
  *`--box 10`: −105 Tris/−1 Call, einziges Mesh mit Culling · 2026-08-01*

- **Instanzschicht zweimal gezeichnet, einmal gecullt** — Abschalten ergibt exakt 2× Tris/Calls; Lichtfrustum dreht nicht mit Kamera. → Kamera-Culling erreicht höchstens Beauty-Hälfte; Partition kostet K Kacheln, gewinnt nur Beauty-Anteil.
  *12,8–25,0 % Cull bei +50–63 Calls je Azimut ⇒ verworfen · 2026-08-01*

- **Halbe Tris kosten Viertel Preis** — Gesamtschicht −1,65…−2,20 ms, Schattenhälfte nur −0,25…−0,65. → Millisekunden stecken im Beauty-Pass; Tris über beide Pässe überschätzen Gewinn ~2×.
  *10 Klammern/3 Boots; Pixel×4 → Frame×1,97, Schicht×1,08, nicht fill-bound · 2026-08-01*

- **LOD entfernt Beauty, lässt Geisterschatten** — Distanz-Cull −558.168 Tris über beide Pässe; verkäuflich nur 10,7 % Frame, Shadow bleibt. → Vor Bild aus Spalten: Beauty fällt, Shadow nicht; echter Hebel = weniger Geometrie je Instanz.
  *40/60/80 m geklammert · 2026-08-01*

- **„Schatten unsichtbar“ braucht Bild-Nullkontrolle** — Layer aus Shadowmap, 38 Posen diffen; 38/38 bzw. 33/38 verändert. → Zuerst zwei frische Boots desselben Stands; nur bei 38/38 bitgleich sind Diffs gültig.
  *Ausgerechnet Nullkontroll-Log fehlte später · 2026-08-01*

- **Kostenkommentar veraltet** — „268k von 2,69M; Calls sind Metrik“ vs. 532.480/20,5 % und überholter Call-Befund. → Beim Messen Kommentare korrigieren oder datieren; benachbarte Konstanten separat belegen.
  *130 statt 131 Instanzen; 532.480 statt 268k; 20,5 % · 2026-08-01*

- **Dreieckszahl sieht Vertexkopien nicht** — 5 Instrumente zählen Tris; ungeweldete Geometrie emittiert 6× Vertices ohne Logänderung, Cache trifft nie. → Puffer je Geometrie: ausgeliefert vs. unterscheidbar.
  *6.144 vs. 1.026 Vertices, 83 % Kopie; 104/110 statische Geometrien bereits geweldet, eine trug 99,99 %; Bild 38/38 bitgleich · 2026-08-01*

- **Einreichung gemessen, Schatten-Abtastung nicht** — Texel = Lichtbox/Map: 156/2048=7,62 cm. → Je Sorte Deckungsseite und mediane Mindesthöhe `2·Fläche/längste Kante`; Merkmal/Texel vor Vereinfachung.
  **PCF-Falle:** Raster 7,62×5,91 cm ergibt Kern 16,00×12,41 (1,29:1); Bodenprojektion streckt y um `1/sin(26,1°)=2,273` zu 16,00×28,21 (1,76:1). y-Fit macht Boden 22,4 % runder ohne Texelmehrung; `mapSize.x=2641` kostet +29 % und verschlechtert Boden durch Schärfung bereits feiner x-Achse. `shadow.radius` skaliert beide Achsen, rundet nie.
  *GL-Programm: PCF 12/30, radius 2,0999999; Matrix-Rundlauf 2,21e−17, Live 1,764:1 vs. analytisch 1,763:1. Flächenspalte allein sagte „Splitter“, Dickenspalte drehte Urteil · 2026-08-01*

- **Weniger Tris können Schatten verschlechtern** — größte Sorte (55,1 %) liegt bei 1,103× Deckung/1,281× Dicke über Abtastrate; Vereinfachung fällt unter Raster. Kleinere Sorte 0,382×/0,387× und 6,7 Tris/Texel hat Kopfraum, aber Unterteilung ist Displacement-Abtastrate. → <1× möglicher Kopfraum, >1× Motiv; ältere Messung derselben Konstante prüfen.
  *Frühere Bildreihe 33/38 verändert, bis 27,71 %; Übergabeannahme fiel an zwei Spalten · 2026-08-01*

- **Verlustfreier Weld braucht drei Bedingungen** — Position, Normale, UV nur vom Vertexindex; Flat-Normalen brauchen Face-Kopien. → Attribute einzeln prüfen; Verlustfreiheit per Bild.
  *Gleicher Mesher emittiert andernorts korrekt 4 frische Vertices je Face · 2026-08-01*

- **Pixeldiff bewertet Boxänderung nicht** — gewählte Variante 38/38 bis 19,50 %, verworfene 38/38 bis 21,20 %; Texelraster verschiebt jede Kante. → Belegung (Span vs. Union je Achse) entscheidet, Bild an Motivkante ansehen; danach neue Schattenreferenz. Wenn alle Alternativen numerisch fallen und Gewinner keinen Code ändert, Bildfrage entfällt.
  *D73: „nicht angesehen“ war Ergebnis; verworfener Arm in Logzeile 2 kleiner, in Zeile 1 größer · 2026-08-01*
