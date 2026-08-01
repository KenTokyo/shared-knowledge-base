# Charakter, Kontakt und Kamera — claude-of-tsushima

**Lesen wenn:** du Hero-Rig, Posen, IK, Waffenpfad, Treffergeometrie oder Third-Person-Framing änderst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Globale Grundlagen stehen in [`../../threejs/ANIMATION-CHARACTER.md`](../../threejs/ANIMATION-CHARACTER.md) und [`../../threejs/LIGHT-CAMERA.md`](../../threejs/LIGHT-CAMERA.md).

- **Lock-on-Plate zeigt vom Kampf nichts** — Schulterkamera, Held und Gegner werden kollinear; der eigene Körper verdeckt die Kontaktzone. → Pose visuell ungelockt fotografieren und Kontakt numerisch entscheiden; `--lock` nur für die bewusst andere Rahmung.
  *0,62-m-Schulteroffset trennt bei 3,45/5,30 m nur 3,6° gegen etwa 10° Körperbreite; gelockt war der Gegner vollständig verdeckt · PH2-third-person/PH21 · 2026-08-01*

- **Kamera macht den Helden größer, indem sie Füße abschneidet** — reine Höhen-/Fill-Scores belohnen `feet=1,000`. → `feet≤0,97` als harte Nebenbedingung führen und pro Shot nur Deltas auf dessen eigene Pitch/FOV/Distanz anwenden.
  *11/12 erster Kandidaten schnitten Stiefel ab; `dpx`-Selftest fand 848.636 abweichende Pixel, weil Gold-Meadow bei Pitch −0,100 statt Konstruktor −0,14 posiert · `review/ph27/frame.txt` · 2026-08-01*

- **Waffenschweißnaht invertiert alle Posen** — falsches Vorzeichen in `heroWeaponMatrix()` lässt jede korrekt authorisierte Delta-Pose rückwärts laufen. → Nach Rig-/Bind-Änderung Carry plus einen signierten Klingenpfad gegen die Pose-Kommentare messen, nicht nur Silhouette.
  *Heavy-Spitze stieg von 0,50 auf 2,00 m und endete 0,70 m hinter dem Helden; exakter π-Flip reparierte gleichzeitig Carry und alle sechs Schwünge · PH3-Hero · 2026-08-01*

- **Fuß-IK besteht auf Ebene und bricht bei Root-Drop/Hang** — Root-Offset und lokales Z hatten falsches Vorzeichen; flacher Boden verdeckte beides. → IK immer auf geneigtem Boden und in einer Pose mit maximaler Kniefaltung prüfen, Ground-Gap in Weltkoordinaten messen.
  *Heavy versenkte Root 0,39 m, echte Knöchelfreiheit 0,10 m, Solver meldete Plant 0; Terrain wurde bis 0,7 m am gespiegelten Fuß gesampelt · PH3-Hero · 2026-08-01*

- **`heroarm.mjs` beweist die Plate-Offhand nicht** — Offlinepfad ruft `heroGripL(P,1)` unbedingt auf und lässt additive/Runtime-Layer weg. → Ableitung dort lösen, aber finale Platte über `Hero.silhouette()`-Spalten `grip/reach/pull` abnehmen.
  *Spin-Impact hatte offline `off mx 0,05`, echte Plate `grip 0,43+0,42`; neue Silhouette-Spalte lokalisierte die Schichtdifferenz · PH25 · 2026-08-01*

- **Knaufkontakt gilt als Klingentreffer** — `bladeEnds` umfasst Griff bis Spitze; Distanz zum Gesamtsegment belohnt `at=0`. → Schneide ab der Tsuba (`EDGE0`) messen und immer `at` vor `pic` lesen.
  *Drei von sechs Schwüngen lösten Schaden mit der Stichblatt-/Knaufseite aus; Verwechslung kostete sechs Phasen · PH14-contact · 2026-08-01*

- **Eine universelle Posenmetrik verurteilt korrekte Schnitte** — `wag/rad` springt beim sagittalen Shomen, `x base` belohnt beim Do den langen Umweg, radiale Distanz verliert Richtung. → Metrik nach Schnittart wählen: `pic/at/elev` für Überhau, Pfad+Kontakt für horizontale Schnitte, signed `f/r` statt Radius für Richtung.
  *Do wurde von 1,56 auf 1,08 m kürzer und sichtbar besser trotz `x base 0,69`; Shomen-Azimut sprang konstruktiv 180° über dem Scheitel · PH8/PH16 · 2026-08-01*

- **Solver spendet am falschen Keyframe** — Lagrange-Basis gibt dem Endknoten am Kontakt kaum Hebel und zerstört dafür die Endpose. → Vor Solve Basisgewichte am Defektzeitpunkt ausgeben und Mid/Late/zusätzlichen Knoten statt höhere Caps wählen.
  *Bei Kontakt 0,62: `BASIS.end=0,149`, `BASIS.mid=0,942`; End-Solve kaufte 6 cm und drehte Endpose −137°→−261° · PH12-contact · 2026-08-01*

- **Clock-Zeile mit Arc-Waypoint verglichen** — `--path` druckt Clock, `--want` lebt im Bogen; gleich aussehende 0,62 sind verschiedene Momente. → Vor Tabellenvergleich explizit `arcEase(clock)` beziehungsweise `arcEaseInv(arc)` umrechnen.
  *`arcEase(0,75)=0,612`; Verwechslung von Waypoint 0,62 und Tabellenzeile 0,63 kostete rund eine halbe Stunde · PH19-shomen · 2026-08-01*

- **Cap wird als fehlende Optimierungsfreiheit behandelt** — mehrere Kanäle kleben viele Iterationen am Anschlag, während Fehler kaum fällt. → Erst Kanalsatz/Knoten wechseln; Cap nur erhöhen, wenn der gewünschte physische Weg selbst den Betrag verlangt und der ganze Pfad gesund bleibt.
  *Zwei Endkanäle lagen 18 Iterationen bei −0,9, Fehler nur 0,479→0,449; separater Kesa-Solve durfte Caps nutzen, weil 1,0-m-Windup und 11 Waypoints gesund blieben · PH11/15 · 2026-08-01*

- **Gegner läuft aus dem committeten Schlag** — Engage-Logik zirkelt weiter auf Sollabstand und frisst den gelieferten Lunge während des Windups. → Für committed attacks Ziel-/Standoff-Vertrag einfrieren und tatsächlichen Kontaktabstand am Damage-Frame messen.
  *Lunge 0,80 m wurde exakt geliefert, Kontakt blieb trotzdem 1,24–1,64 m; je länger der Windup, desto mehr verlor er, Light 22 %, Spin 62 % · PH13-contact · 2026-08-01*

- **Review-Agent meldet fehlende Systeme aus einem Bild** — Bild kann geringe Wirkung nicht von Abwesenheit trennen. → Jede Behauptung „X fehlt“ vor einem Refactor im Code und in der aktiven Renderkette greppen; nur gemessene Agentenbefunde übernehmen.
  *Ein Reviewer meldete Grass-Transmission, Wolken, Fog, Godrays, SSAO und Specular als fehlend; alle sechs existierten, nur der Mess-Reviewer traf mit Pixelmodell die Kamera exakt · PH26-third-person · 2026-08-01*
