# Licht, Kamera, Farbraum und PostFX

- **Status:** optionale „könnte“-Tipps; lokale Looks, Belichtungen, APIs → Vorrang

## Fünf Tipps

- **1 · Referenz/Kamera könnten Daten sein:**
  - Motiv; Tiefenband; FOV; Crop; Sonne; Atmosphäre; Belichtung; Anti-Ziel
  - Solver: Augenhöhe; Sichtlinie; Piece-Fill; Skyline; Wasserfreiheit
  - Terrain-/Bakeänderung → Kamera neu lösen
- **2 · Diagnoseleiter könnte sein:**
  - Rohkanal → Scene-HDR → Einzelpass → Tonemapping/Grade → LDR/PNG
  - Farbtextur: einmal sRGB; Datentextur: linear
  - Outputkonvertierung: einmal; Downsample: linear light
- **3 · Lichtbeiträge könnten getrennt sein:**
  - Himmel; IBL; Sonne; lokale Lichter; Emission
  - Neutralmaterial; Caster-A/B; Receiver-A/B; Bias-A/B
  - PMREM gültig; Materialwerte unverfälscht
- **4 · PostFX könnte drei Kontrollen besitzen:**
  - null; Shipping; übertriebene Rotkontrolle
  - Bloomselektion: HDR-Luminanz/Intensität/Maske vor Tonemapping
  - Clipping: Weiß + einzelne Kanäle; passende Farbachse
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - Naht nur final → Raw/HDR/LDR-Bandprofil
  - Materialänderung ohne Wirkung → Neutrallicht + Applied Value
  - großer Schatten → Caster-Isolation + Schattenlänge
  - Reglerziel unerreichbar → mathematische Hülle
  - Kanalclipping → p95/p99 + Gain-Leiter

## Belegte Tipps

Format und Änderungsrecht: [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md).

- **Auge bewegt, ohne neu zu peilen** — das Motiv wandert pro Hubmeter im Bild nach unten und fällt am Ende
  heraus, obwohl an der Kamera „nichts geändert" wurde. Ursache: die Rotation kommt aus Spielerwinkeln, der
  Pivot liegt nur konstruktionsbedingt auf der Achse. → Jede Augbewegung vorher gegen
  `versatz / (arm · tan(fov/2))` rechnen.
  *Ein Bodenausweich-Hub bis 4,11 m schob die Figur aus 2 von 14 Spielaufnahmen · Herkunft:
  voxel-samurai-quiz · 2026-08-01*

- **Neupeilen als Reparatur** — das Motiv sitzt danach perfekt mittig und das Bild ist trotzdem wertlos.
  Ursache: Neupeilen bezahlt mit dem, was am Rand steht (Horizont, Landmarke, Gegner). → Die Kontrolle
  mitfahren, die das Randbudget misst, **bevor** der Modus Default wird; der Handel ist dann eine
  Entscheidung statt einer Überraschung.
  *Motiv mittig, dafür Gegner über der Bildkante, Sichtbarkeit −76 %, Pitch −51° · Herkunft:
  voxel-samurai-quiz · 2026-08-01*

- **Einzelne Spielframes brechen auf Hunderte Millisekunden ein, sobald Lichter kommen und gehen** — mitten im
  Spiel, ohne neuen Inhalt, ohne neues Material. Ursache: Die **Anzahl** der Lichter je Typ steht im
  Programm-Cache-Key (`numPointLights`, `numDirLights`, …). Jede Änderung linkt **jedes** betroffene Material
  neu, nicht nur das beleuchtete. Der Auslöser ist meist unsichtbar gemacht statt entfernt: `projectObject`
  steigt bei `visible === false` gar nicht erst in den Teilbaum ab, ein verstecktes Licht **fällt aus der
  Zählung** — `intensity = 0` dagegen zählt voll mit und liefert nichts. Ein Licht als Kind einer Kreatur, die
  spawnt, stirbt oder ausgeblendet wird, ist damit ein Relink pro Ereignis.
  → Lichtzahl als **feste Achse** behandeln, nicht als Folge des Spielzustands: konstanter Vorrat außerhalb der
  Objekte, ab dem ersten Frame gemountet, leere Plätze auf `intensity = 0`. Die Zahl an nichts koppeln, das zur
  Laufzeit wechselt (Qualitätsstufe, Etage, Spawnzahl) — sonst kauft man den Relink zurück, den der Vorrat
  verhindert.
  ⚠ **Der Vorrat lohnt sich mit großem Abstand, auch wenn Plätze leer bleiben:** ein Platz kostet je Fragment
  eine Schleifenrunde, ein Relink kostet einen ganzen Frame. Wer den Vorrat aus Sparsamkeit schrumpft, tauscht
  Zehntelmillisekunden gegen Hunderte.
  *Ein dauerhaftes Punktlicht kostete gemessen 0,1–0,2 ms je Frame (1080p, Forward, ~330 Draws); die Relinks,
  die es verhinderte, kosteten 11–16 Einzelframes von 340–1060 ms je Lauf. Drei Plätze = 0,2–0,7 ms gegen bis zu
  16 s Ruckeln · Herkunft: voxel-samurai-quiz (Mechanismus ohne Projektbezug, zweiter Beleg steht aus) ·
  2026-08-02*

- **Quadratische Schattenbox über einer Szene, die im Lichtraum nicht quadratisch ist** — die Schatten sind
  überall gleich grob, und jede Abhilfe klingt nach „mehr Auflösung". Ursache: die Ortho-Box des
  Richtungslichts wird in **Weltmetern** gewählt („die Karte ist 156 m breit"), aufgelöst wird aber die
  **Projektion der Kaster in die Lichtachsen** — und eine **streifende** Sonne streckt die eine Achse und
  staucht die andere, also überzahlt ein Quadrat die eine und hungert die andere **gleichzeitig** aus.
  → Die Kastervertices durch die **Viewmatrix des Lichts** laufen lassen und die Belegung **je Achse** messen;
  `texel_x = (right − left) / mapSize` und `texel_y` sind **getrennte Zahlen**, und **nur der Span ist
  gratis** — `mapSize` kostet Speicher und Füllrate, ein engerer Span kostet nichts.
  ⚠ **Die Schranke ist der BODEN, nicht die Deko:** an die vorhandenen Kaster zu fitten ist zu eng, weil
  Figuren, Gegner und später Gebautes **auf** dem Terrain stehen und beim Boot noch gar nicht existieren. Die
  Bodenebene plus Kopfraum ist die ehrliche Schranke — und den Umrechnungsfaktor Welt-Höhe → Lichtraum-y
  **aus der Viewmatrix lesen**, nicht aus dem Sonnenwinkel rechnen.
  ⚠ **Und der scheinbare Preis — „ungleiche Texel machen den PCF-Kern oval" — ist auf dem Boden ein GEWINN,**
  siehe den nächsten Tipp: das Oval im Raster steht **quer** zu dem, das die Kamera sieht.
  *eine quadratische Box las auf x 123 % Belegung (überzogen) und auf y 60 %; nur die y-Achse zu fitten
  schärfte das halbe Bild um 22 % zu Kosten von null, die x-Heilung hätte jeden Schatten 24 % gröber gemacht ·
  Herkunft: claude-tower-defense (Mechanismus ohne Projektbezug, zweiter Beleg steht aus) · 2026-08-01*

- **Ein Maß aus dem Schattenraster als Bildgröße gelesen** — Kernweite, Penumbra oder Bias werden in
  Lichtraum-Metern ausgerechnet, in Bildschirmpixel umgerechnet und entschieden; das Urteil kann **im
  Vorzeichen** falsch sein. Ursache: ein PCF-Tap ist ein Versatz in der **Ebene der Schattenmap**, ein
  Schatten liegt aber auf einem **EMPFÄNGER**, und beide sind nur für einen Empfänger gleich, der **senkrecht
  zur Lichtrichtung** steht. → Den Fußabdruck auf die Empfängerfläche **projizieren**, bevor irgendeine Zahl
  daraus wird: gesucht ist das Δ mit `Δ·ax = δx`, `Δ·ay = δy`, `Δ·n = 0` — ein **2×2-System**, **keine zwei
  unabhängigen Streckungen** (die Achsen entkoppeln nur, wenn eine davon schon in der Fläche liegt). Auf dem
  Boden streckt das die lichtraum-y-Achse um **1 / sin(Sonnenelevation)**.
  ⚠ **Gegenprobe, die den Fehler nicht überleben lässt:** denselben Δ durch `projectionMatrix ·
  matrixWorldInverse` der **Schattenkamera** zurückschieben — der NDC-Versatz muss **exakt der Tap** sein
  (`2h/span` auf einer Achse, **null** auf der anderen).
  ⚠⚠ **Und die Streckung ist kein Fehler, den man wegdrehen sollte:** eine physikalische Penumbra ist eine
  isotrope Streuung senkrecht zum Licht, auf den Empfänger projiziert — **dieselbe Projektion**. Ein auf dem
  Boden **runder** Kern beleuchtet eine streifende Sonne wie eine Mittagssonne. Wählbar ist die **Größe** des
  Kerns, nicht seine Form auf der Fläche.
  *im Raster 16,00 gegen 12,41 cm (1,29 : 1, x breit), auf dem Boden 16,00 gegen 28,21 cm (1,76 : 1, **y**
  breit) bei 26,1° Sonne; die erste, unprojizierte Antwort nannte die falsche Achse und eine Differenz von
  11 px mit falschem Vorzeichen — der Streckfaktor 0,440 war darin bereits berechnet und gedruckt, nur nicht
  benutzt · Herkunft: claude-tower-defense · 2026-08-01*

## Handoffs

- PBR → [Shader/PBR](SHADERS.md)
- Capture → [Debug/Review](DEBUG-REVIEW.md)
- Zahlen, auf die eine Entscheidung folgt → [Messhandwerk](MEASURING.md)
