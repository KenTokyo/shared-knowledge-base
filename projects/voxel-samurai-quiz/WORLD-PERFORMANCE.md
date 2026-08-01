# Weltperformance — voxel-samurai-quiz (AEON)

**Lesen wenn:** du Gras, Laub, Terrain, Dichte, LOD, Schatten oder irgendeine Framezeit dieser Welt anfasst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Gepaarte Größenordnung aus P14q: **Szenenpass 3,0781 ms**, davon **Grasfeld 0,6563 ms bei einem Gate von 0,70 ms** (93,8 % ausgereizt; 21,3 % des Szenenpasses). Wer hier etwas hinzufügt, nimmt es woanders weg.

## Tipps

- **Nur „gehört woanders hin“ ist echte Ersparnis** — Chunkzahl sinkt, weil bewerteter Inhalt still verschwindet. → Vor jeder Optimierung den gedrückten Faktor in `sichtbare Chunks × Arten × LOD × Pässe` benennen; Diagnosemodus ist kein Produktfix.
  *AEON-Loop-Grenze: Optimierung darf den bewerteten Inhalt nicht heimlich entfernen · 2026-08-01*

- **Feindetail jenseits seiner Reichweite** — Fernbild flimmert, obwohl Mips die Kachel längst zum Wash mitteln. → Ab der gemessenen Reichweite vollständig ausblenden und Fernstruktur einem eigenen Träger geben.
  *Feine Terrainkachel ab etwa 450 m ohne nutzbares Detail · 2026-08-01*

- **Maske geschwellt statt stochastisch ausgedünnt** — harte Kanten und Klumpen entstehen am Schwellwert. → Pro-Zell-Zufall gegen die Maske vergleichen; das macht Ränder weich und Population steuerbar.
  *`GrassField.js` und `Foliage.js` kamen unabhängig auf denselben Fix · 2026-08-01*

- **Frustum-Culling teurer als der Zeichenaufruf** — Stock-Bounds eines instanzierten Meshes umspannen die halbe Insel und werden dennoch pro Frame geprüft. → Culling auf solchen Meshes bewusst abschalten und den Grund an der Zeile festhalten.
  *`GrassField.js` und `Terrain.js`: Per-Instance-Extents machten Stock-Bounds bedeutungslos · 2026-08-01*

- **Sweep-Zeilen verändern mehr als den Kandidaten** — Neustarts dominieren die Kosten; Quelltext-Literale verschieben zusätzlich Closure/RNG-Streams. → Achse als Uniform/Flag freilegen, Shippingwert und Nullzeile einschließen und alle Kandidaten in derselben Sitzung auf demselben aktiven Pfad fahren.
  *8 `blades`-Zeilen in 24 s; vier P15d-Starts ~65 s, Literal-Sweep 3/1/0 blinde Zeilen bei 0/0,25/0,5 · 2026-07-31/08-01*

- **Umparametrisierung ändert nebenbei die Menge** — Sweep-Zeilen vergleichen Form und Blattfläche zugleich. → Integral mitnormieren und beim alten Wert Bitgleichheit gegen den gültigen Pass verlangen.
  *`uBlade` mit `taperNorm`: p=2,0 gegen Pass 22 in drei Läufen `largest band delta 0.0000` · 2026-08-01*

- **Waldränder drehen und färben sich gleichförmig** — derselbe Hash steuert Dichteselektion und sichtbare Attribute. → Pro sichtbarem Attribut einen eigenen deterministischen Hashstrom verwenden und die alte Kopplung als Negativtest vergiften.
  *Rand-Yaw Rayleigh-Z 569,4 → 0,5; Attributkopplung zuvor Pearson r=1,000 · 2026-07-30*

- **Farbfehler sitzt in der Geometrie** — für 33–57 m getunte Halme stehen bei 2–10 m als 40–100-px-Schilf; Pixelmischung wirkt wie falsche Farbe. → Vor Farbkonstanten Breite, Höhe und Dichte gegen die aktuelle Kameradistanz sweepen.
  *Skalenlücke 1,188 → 0,253; Sättigung/r-g 0,617/0,648 → 0,545/0,743 gegen 0,544/0,747, ohne Farbkonstante · 2026-07-31*

- **Geometrie geändert, gefittetes Bodenlicht behalten** — `uCanopy.x` ist Bodenlicht/Floor, nicht die Extinktion in `.y`, und hängt an Halmzahl, Breite sowie Haltung. → Nach jeder Geometrieänderung mit `grassonly.mjs` neu sweepen.
  *Der Taperwechsel behielt den Wert erst nach Gegenmessung bei 0,255/0,30/0,345 · 2026-08-01*

## Lokaler Kostenpfad

Die Trennung von Fehler-Gate, Bildrate und GPU-Kosten hat ihren Owner in [`../../threejs/MEASURING.md`](../../threejs/MEASURING.md); Befehle und Gates gehören dem lokalen AEON-Loop. Für die oben genannten Graswerte lief `pnpm world:probe <id> probes/grassperf.mjs --rounds 112 --reps 16` gepaart, rotiert, mit GPU-Timer sowie Null- und Terrainkontrolle.
