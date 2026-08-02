# Render, PostFX und Effektaufbau — quiz-arena-space

**Lesen wenn:** du in `src/render/`, `src/fx/VFX.ts`, `src/fx/Particles.ts` an Shadern, Bloom, Licht oder Partikeln arbeitest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Sollst du beurteilen, **ob man einen Effekt sieht**, statt ihn zu bauen: [`EFFECT-VISIBILITY.md`](EFFECT-VISIBILITY.md).
Global dazu: [`../../threejs/SHADERS.md`](../../threejs/SHADERS.md) und
[`../../threejs/LIGHT-CAMERA.md`](../../threejs/LIGHT-CAMERA.md).

- **Jeder Effekt kompiliert bei Erstnutzung mitten im Kampf Shader nach** — `numPointLights` steht im
  Programm-Cache-Key von three, und es gibt kein Cull für `intensity === 0`. Ein Lichtpool, der `visible`
  pro Effekt schaltet, lässt jede neue *sichtbare Lichtzahl* jedes belichtete Material neu bauen. → Die
  Lichtzahl **pinnen**: alle Slots dauerhaft sichtbar halten und nur `intensity` auf 0 fahren.
  *Ungepinnt `prog=135` mit 11 Kaltpfaden, gepinnt `prog=35` und kein einziger Kaltpfad — 135 − 35 = 100
  exakt. Bildlich inert: 0 von 891.120 Pixeln geändert. `src/fx/VFX.ts:979-1011`; das Symptom fängt heute
  `COLD-PATHS` in `src/main.ts:7398`, die Ursache steht nur hier · 2026-07-30*

- **Partikel leben, kosten Draw-Calls und ändern null Pixel** — der Bench meldete einen vollen Pool, das
  Bild blieb bit-identisch: die Billboard-Basis landete in vertauschten Matrix-Spalten
  (`n = dir × toCam` ist die Breitenachse, stand in der Normalen-Spalte), jedes Quad stand hochkant zur
  Kamera. → Bei „gezeichnet und trotzdem unsichtbar" die **Instanz-Matrizen** aus `mesh.instanceMatrix.array`
  projizieren, nicht aus `pos`/`vel` herleiten.
  *176/176 Quads mit Bildschirmfläche 0, Skalarprodukt Breitenachse·Sehstrahl −0,980; Zurücktauschen
  0 → 2745 Pixel bei byte-gleichen Pool-Zahlen. Vorher „die Trails überleben alle" über eine Schicht von
  3 px · 2026-07-31*

- **Ein Term, der bei jedem Merge kompoundiert, hat keinen Ruhezustand** — der Scar-Term multiplizierte
  sich pro Merge, setzte dabei `age` zurück (Füllstand bleibt 0 = permanent heiß) und addierte Emissive pro
  Marke ohne Obergrenze; der vermeintliche Sicherheits-Clamp war in Wahrheit der Ruhewert. → Emissive
  **einmal** sättigen (Reinhard) statt pro Marke zu addieren, und Wachstum asymptotisch gegen eine absolute
  Decke führen.
  *Ein Schalter senkte den Bildmittelwert 0,3147 → 0,0383 — 88 % des Frames stammten aus diesem einen Term,
  alle fünf anderen Deck-Terme lagen im Rauschen. Zwei Vorschichten suchten im falschen System · 2026-07-30*

- **Ein Größenfaktor im Punkt-Shader macht aus 4400 Sternen eine Nebelbank** — was zwei Phasen lang als
  Bloom-Blowout gejagt wurde, war ein Faktor `*40.0` in `gl_PointSize`, der einzelne Sterne 63–157 px breit
  machte. Die korrekte Formel stand längst im selben Repo. → Vor dem Drehen an PostFX prüfen, ob eine
  **Geometriegröße** die Fläche erzeugt; `gl_PointSize` clampen.
  *`p50` 0,62 → 0,138, `p95` 0,995 → 0,703; mit ausgeschaltetem Bloom fiel `p50` auf 0,114 und isolierte
  damit den Rohanteil · 2026-07-28*

- **Ein Akzent unter der Bloom-Schwelle kann nicht leuchten, egal welche Farbe** — eine
  `MeshBasicMaterial`-Farbe aus einem Hex deckelt bei 1,0 pro Kanal, und die Luminanz eines *Farbtons* liegt
  weit darunter: Fraktionsrot `0xff4a2c` misst linear 0,342 gegen die Bloom-Schwelle 1,05. Jede Farbdrehung
  bleibt damit unter dem Tor, der Akzent wirkt stumpf, und die Suche wandert ins PostFX. → Vor dem
  Farbdrehen **Luminanz gegen die Schwelle rechnen** und per HDR-Gain auf einen Zielwert über der Schwelle
  normalisieren (`color.multiplyScalar(gain)`, `toneMapped: false`), nicht die Schwelle senken — die hebt
  jedes andere helle Pixel mit. Der Gain gehört **pro Farbe** gerechnet und geklemmt, sonst trägt die
  Schieflage des Luminanzvektors in die Kunst: dasselbe Grün misst 0,68, dasselbe Rot 0,33, ein globaler
  Faktor macht daraus doppelt so helle Unterstützerschiffe ohne gestalterischen Grund.
  *`ENEMY_GLOW_LUMA = 1.35` gegen Schwelle 1,05 (`src/render/Renderer.ts:676`), Gain
  `1.35 / max(0.08, luma)` auf [1, 8] geklemmt; emissiver Anteil swarmling 4,8 → 10,5 %, kamikaze
  18,2 → 28,0 %, Verdikt blieb `emissive-restrained`. Die Gegenrichtung war schon einmal verworfen worden:
  Schwelle 1,05 → 0,95 „damit beleuchtetes Metall glüht" · 2026-08-02*

- **Ein Band fester Breite auf wachsendem Radius wird heller, nicht dunkler** — der Schockwellenring wusch
  den Frame weiß, obwohl er gedämpft war: die beleuchtete Fläche ist `2πr·w` und wächst linear mit dem
  Radius, eine lineare `life`-Dämpfung zahlt das nicht. Weil `age` hier *der* Radius ist, stand die Dämpfung
  bei r=64 noch auf 0,57 — Fläche 6,4x hoch, Helligkeit 1,6x runter, also fast **viermal** mehr Gesamtlicht
  am Arenarand als am eigenen Ursprung. Über der Bloom-Schwelle 1,05 (Tipp oben) verteilt der Pass den
  Überschuss auf den ganzen Frame. → Erhaltung auf der expandierenden Kreislinie ansetzen:
  `spread = min(1, R/max(0.001, r))`, also flach solange der Ring sich noch bildet, danach `~1/r`. R
  **oberhalb der Bandbreite** halten — darunter ist der „Ring" eine gefüllte Scheibe, und die Division dimmt
  nur den Blitz in seinem eigenen Epizentrum, den jede Aufrufstelle genau dort will.
  *Ein einziger Bodenring änderte 99,97 % aller Pixel. Sweep über sieben R per `?pulsespread=`, jeder Schuss
  gegen denselben `?deckpulse=0`-Frame gediffed: Eigenfläche des Rings 13,4 % des Frames, alles darüber ist
  Spill; Knick zwischen R=18 (13,56 %) und R=22,5 (20,68 %), und R=18 ist zugleich der kontraststärkste
  Kandidat — |d| 109,4 gegen 89,8 der waschenden Fassung, dieselbe Lichtmenge konzentriert statt verteilt.
  `mean` trennt hier nicht: 0,1343 gegen Boden 0,1023. Der Deckel gilt **pro Aufrufstelle**: die Schwelle
  kreuzt `pu.w * spread`, also ist ein Gain auf `strength` derselbe wie einer auf `spread`, und dieselbe
  Sweep-Tabelle bepreist damit auch die lauten Aufrufer — 10 von 20 liegen über der getunten 1,4, die zwei
  lautesten (3,2 und 3,5) auf Gain 2,29 und 2,50, also jenseits der letzten gemessenen Zeile vor dem Wash.
  `PULSE_SPREAD_R` in `src/world/Arena.ts`, Commit `2718601` · 2026-08-03*

- **Flächiger Wash auf jeder waagerechten Platte — Intensität ist der falsche Hebel** — als
  Specular-Blowout diagnostiziert, war aber `blown=0.00 %` und eine Entsättigung: Rim-Elevation 19,6° gegen
  Kamera-Elevation 25° bei entgegengesetztem Azimut lässt den Halbvektor senkrecht nach oben zeigen, womit
  **jede** flache Platte gleichzeitig auf dem Specular-Peak liegt. → Die **Lichthöhe** ändern, nicht die
  Intensität, plus objektlokale Roughness.
  *Bei gesenkter Intensität bleibt das Deck magenta-dominant (sat 0,60); Höhe 52° → 18° bringt Deck
  `p50` 0,420 → 0,235 und `sat` 0,44 → 0,72, bei zahlengleicher Kampfszene · 2026-07-28*

- **Der Warm-up-Detektor schwieg neun Schichten lang über eine lebende Verletzung** — die
  Allokationsmeldung ritt innerhalb einer zu engen Bedingung; unter dem Licht-Pin brachte der Effekt weder
  Programm noch Textur, also wurde die Mesh-Allokation komplett verschwiegen. → Die Bedingung eines
  Detektors gegen **jeden** Weg prüfen, auf dem sein Ereignis eintreten kann, und ihn als eigenen
  Giftfall vier Läufe fahren (schweigt falsch → feuert → feuert zu Recht → schweigt echt).
  *Ursache war eine faul wachsende Free-Liste; nach dem Fix `draws=302`, `prog=35`, `tris=69991` identisch,
  also null Draw-Kosten · 2026-07-30*
