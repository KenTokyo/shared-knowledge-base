# Charakter, Kontakt und Kamera — claude-of-tsushima

**Lesen wenn:** Hero-Rig, Pose, IK, Waffenpfad, Treffergeometrie oder Third-Person-Framing.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Global: [Animation/Charakter](../../threejs/ANIMATION-CHARACTER.md) · [Licht/Kamera](../../threejs/LIGHT-CAMERA.md).

- **Lock-on-Plate zeigt keinen Kampf** — Schulterkamera, Held, Gegner kollinear; Körper verdeckt Kontakt. → Kontakt
  numerisch prüfen; nur falls die globale freiwillige Bildausnahme gewählt wurde, den ungelockten Frame in das eine
  erlaubte Vergleichsbild montieren. `--lock` nur für eigene Rahmung.
  *0,62-m-Schulter bei 3,45/5,30 m trennt 3,6° vs. ~10° Körperbreite; Gegner vollständig verdeckt · PH2/PH21 · 2026-08-01*

- **Kamera vergrößert durch abgeschnittene Füße** — Fill-Scores belohnen `feet=1,000`. → `feet≤0,97` hart; Shot-Deltas nur auf eigene Pitch/FOV/Distanz.
  *11/12 Kandidaten ohne Stiefel; `dpx` 848.636 Pixel, Gold-Meadow Pitch −0,100 statt −0,14 · PH27 · 2026-08-01*

- **Waffenschweißnaht invertiert Posen** — falsches Vorzeichen in `heroWeaponMatrix()`. → Nach Bind-Edit Carry plus signierten Klingenpfad gegen Pose-Kommentare messen.
  *Heavy-Spitze 0,50→2,00 m, 0,70 m hinter Held; π-Flip reparierte Carry + 6 Schwünge · PH3 · 2026-08-01*

- **Fuß-IK besteht nur auf Ebene** — Root-Offset/lokales Z falsch; Ebene verdeckt. → Hang plus maximale Kniefaltung; Ground-Gap in Weltkoordinaten.
  *Heavy Root −0,39 m, Knöchelfreiheit 0,10 m, Plant 0; Terrain bis 0,7 m am gespiegelten Fuß gesampelt · PH3 · 2026-08-01*

- **`heroarm.mjs` beweist Plate-Offhand nicht** — Offlinepfad erzwingt `heroGripL(P,1)`, ohne additive Runtime-Layer. → Ableitung offline, finale Abnahme per `Hero.silhouette()` `grip/reach/pull`.
  *Spin offline `off mx 0,05`, Plate `grip 0,43+0,42`; neue Spalte lokalisierte Schicht · PH25 · 2026-08-01*

- **Knaufkontakt als Klingentreffer** — `bladeEnds` umfasst Griff–Spitze; Segmentdistanz belohnt `at=0`. → Schneide ab `EDGE0`; immer `at` vor `pic`.
  *3/6 Schwünge trafen mit Stichblatt/Knauf; kostete 6 Phasen · PH14 · 2026-08-01*

- **Universelle Posenmetrik verurteilt Schnitte** — `wag/rad`, `x base`, Radius verlieren schnittspezifische Richtung. → Überhau `pic/at/elev`; horizontal Pfad+Kontakt; Richtung signed `f/r`.
  *Do 1,56→1,08 m und besser trotz `x base 0,69`; Shomen-Azimut konstruktiv 180° am Scheitel · PH8/16 · 2026-08-01*

- **Solver spendet am falschen Keyframe** — Lagrange-Endknoten hat am Kontakt kaum Hebel, zerstört Endpose. → Basisgewichte am Defektzeitpunkt; Mid/Late/zusätzlicher Knoten vor Cap.
  *Kontakt 0,62: `end=0,149`, `mid=0,942`; End-Solve +6 cm, Endpose −137°→−261° · PH12 · 2026-08-01*

- **Clock-Zeile mit Arc-Waypoint verglichen** — `--path` Clock, `--want` Bogen. → Vor Vergleich `arcEase(clock)`/`arcEaseInv(arc)`.
  *`arcEase(0,75)=0,612`; 0,62 vs. Tabellenzeile 0,63 kostete ~30 min · PH19 · 2026-08-01*

- **Cap als fehlende Freiheit** — Kanäle kleben am Anschlag, Fehler sinkt kaum. → Erst Kanäle/Knoten; Cap nur bei physisch nötigem Weg und gesundem Gesamtpfad.
  *2 Endkanäle 18 Iterationen bei −0,9, Fehler 0,479→0,449; Kesa-Caps erlaubt bei 1,0-m-Windup/11 Waypoints · PH11/15 · 2026-08-01*

- **Gegner verlässt committeten Schlag** — Engage zirkelt während Windup weiter und frisst Lunge. → Bei committed attack Ziel/Stand-off einfrieren; Kontaktabstand am Damage-Frame.
  *Lunge 0,80 m geliefert, Kontakt 1,24–1,64 m; Verlust Light 22 %, Spin 62 % · PH13 · 2026-08-01*

- **Reviewer behauptet fehlende Systeme aus Bild** — geringe Wirkung ≠ Abwesenheit. → „X fehlt“ vor Refactor in Code und aktiver Renderkette prüfen; nur gemessene Befunde.
  *Reviewer vermisste 6 vorhandene Systeme; nur Pixelmessung traf Kamera · PH26 · 2026-08-01*
