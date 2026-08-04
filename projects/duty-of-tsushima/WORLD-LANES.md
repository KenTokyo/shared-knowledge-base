# Welt, Lanes und Begehbarkeit — duty-of-tsushima

**Lesen wenn:** Heightfield, Lane, Grat, Terrasse, Spawn oder Begehbarkeits-Gate.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Global: [Map-Generierung](../../threejs/MAP-GENERATION.md) · [Wasser](../../threejs/WATER.md). Weltvertrag: Repo-`ARCHITECTURE.md`.

- **Gefälle ohne Messfenster** — gleiches Terrain: 50° über 0,9 m, 25° über 2 m. → Fenster als Konstante und in jeder Zeile: `steilste 2,6 m: 20°`.
  *`tools/smoke.mjs`, `WINDOW_M=2` · 2026-08-01*

- **Grat wirkt über Achsenende hinaus** — Gaußradius schüttet in Nachbarzone; Top-down bleibt plausibel. → Nach Makroform-Edit Spawn-zu-Kopf-Weg messen, nicht Feld ansehen.
  *58-m-Halbwertsbreite hob Flanke 40 m östlich um ~28 m; Terrasse 10 vs. Umland 37 m; Spawn 42,1 m, Wand 16,8 m/27,1 m über 2 m. `RIDGE_NE` [220,−40]→[218,−84]; 79°→19°/2,8 m · 2026-08-01*

- **Lane endet neben Wegkopf** — Sinusoffset bei `t=1` ≠0; Weg verfehlt Kopf 8,3 m, Sehne echten Weg bis 9 m. → `sin(πt)` pinnt beide Enden; Route als `w.laneSpine` veröffentlichen.
  *Laufweg-Gate erreicht vier Köpfe auf 0,1–0,2 m · `heightfield.js:110` · 2026-08-01*

- **Terrassenkante ist Mauer, kein Hang** — Lane kreuzt konstruktiv richtige, aber unpassierbare Paddy-Kante. → Bund lokal zur Rampe öffnen, nicht gesamte Kante glätten.
  *51° · `heightfield.js:228` · 2026-08-01*

- **Höhengate meldet Absicht als Fehler** — „Lane unter Plateau“ markiert Sattel als Bug. → Verteidigbare Design-Zusagen: Sichtlinie, Begehbarkeit bis Spawn, freier Spawn; keine meist gültige Höhenrelation.
  *Erstes Gate: 3 Fehler, davon 2 by design · `tools/smoke.mjs` · 2026-08-01*

- **Belegungsfeld beantwortet die falsche Frage** — `occupied()` sagt, was *gebaut* ist, `water()`, was nass ist; was frei bleiben *muss*, sagt keins. Platzierungsregeln setzen dann Volumen auf die Lane-Achse, und das bleibt folgenlos, bis laterale Kollision dazukommt. → Freizuhaltendes als eigenes Feld führen (`laneClearance(x,z)`), nicht aus Belegung ableiten; Ausweichen als Regel im Bau, nicht als Handkoordinate.
  *Vier Regeln betroffen: Halle + Hof auf x=0, alle vier Antworttafeln per `head*0.46`, Brandnest „entlang des Südwegs“ mit 2,86 m Überlapp. bamboo 37 m von 224, burnt 71 m von 172 · `structures.js` · 2026-08-02*

- **Eine Lane hat zwei Linien, nicht eine** — die getretene Spine (mit Wobble) und die Sehne, die ein blind vorwärts laufender Sprinter oder eine Welle ohne Ausweichgrund nimmt. Sie liegen bis zu 9 m auseinander; eine freizuräumen räumt nichts frei. → Beide als Route führen und beide prüfen.
  *Halle nach Spine-Freiräumung immer noch auf der Sehne · `heightfield.js:_bakeRoutes` · 2026-08-02*

- **Ausweichender wird von sich selbst blockiert** — `_bakeOccupancy` beansprucht den Spec-Grund vor dem Bau, also fand die 12-m-Scheibe der Halle jeden Kandidaten besetzt: 19,7 m Abstand von sich selbst nötig, Suchradius 18 m, kein Versatz und keine Fehlermeldung. → `exceptId` beim Suchen; wer weicht, verschiebt seine Scheibe (`relocate`) statt eine zweite anzulegen.
  *Halle blieb still auf [0,−22] stehen, obwohl die Regel griff · `heightfield.js:occupied` · 2026-08-02*

- **Gradientenabstieg versagt genau am Problemort** — eine Distanzfunktion hat auf ihrer Mittellinie ein Minimum, ihr Gradient verschwindet dort. Wer *auf* dem Weg steht (der Regelfall bei zentrierter Komposition), bekommt „keine Richtung“. → Ringsuche mit fester Winkelreihenfolge: funktioniert auf dem Minimum und bleibt deterministisch.
  *Halle exakt auf x=0 der bamboo-Sehne x=0 · `structures.js:offLane` · 2026-08-02*

- **Eine Reservierung ist keine Mauer** — dieselbe Liste beantwortet „wo darf nichts wachsen" und wird als „wo kommt kein Bein durch" gelesen. Ein `gate: true`-Bauteil (Torii, Laternenreihe) liegt absichtlich **quer** auf der Route, und ein `footprint` ist bis zur Hälfte breiter als das Bauwerk. → Zweites Feld `nav` je Reservierung und eine eigene Methode `blocked(x,z,r)`; Deckung als Gate prüfen (jeder deklarierte Nicht-Tor-Eintrag braucht einen gebauten Kreis), sonst ist ein Eintrag ohne `place()` für die Navigation unsichtbar. Gegenstück zu *Belegungsfeld beantwortet die falsche Frage*.
  *bamboo-Lane, Ashigaru r 0,34: 22 von 107 Spine-Punkten blockiert, Eindringtiefe bis 3,38 m an der 7,34-m-Kante von `torii-north`; 1,774 → 2,353 m/s. Deckung danach 10/10 Nicht-Tor-Fußabdrücke bei Abstand 0,00 m, Radius 2,62–9,05 m · `heightfield.js:blocked` · 2026-08-02*

- **Vorprüfung und Blende müssen dieselbe Reichweite lesen** — die Prüfung ließ `radius + rimFalloff` herein, die Blende darunter rechnete mit der verbreiterten Rampenreichweite `rimFalloff * (1 + gain)`. Wo die kleinere Zahl endet, reißt die Blende mitten im Hang ab und lässt genau die Höhe stehen, die sie dort noch trug. Abseits einer Rampe ist die Blende schon 0, wenn der Guard beißt — der Defekt steht deshalb **ausschließlich** auf den Rampen, und die Rampen sind die Lanes. → `gain` als einzige Quelle in die Spec, Guard und Blende lesen sie beide.
  *69 m gegen 61,2 m: bamboo 5,11 m Anstieg auf 1,75 m Lauf, terrace 5,19 auf 1,5, cliff 5,81 auf 1,5 = 72°, `path`-Maske durchgehend 1. Größter Sprung je 0,25 m danach 0,025/0,09/0,06 statt 0,78/0,82/0,93 · `heightfield.js` §4 · 2026-08-02*

- **Wo eine Lane ein Gewässer kreuzt, hebt sich das Bett zur Furt** — dieselbe Regel wie Terrassenbund und Plateaurampe, nur auf Wasser: ein 1,1-m-Bach gegen ein Watt-Limit von 0,90 m stoppt jede Welle, und kein Steuerungscode kann das lösen, weil alle Sonden dasselbe melden. → Bett **und** Wasserspiegel um denselben Lane-Faktor senken; wer nur eines anfasst, bekommt eine trockene Rinne oder einen Wassertisch über dem Ufer. Der Faktor ist damit ein Balance-Hebel, kein reiner Bugfix — er bremst auch den Spieler.
  *Gegner lief 131 m von 198, stand ab Frame 588 bei (11,03/85,51) in 0,88 m, alle fünf Sonden Grund `wasser`, voraus 1,08 m. `STREAM_FORD` 0,55 → größte Wattiefe auf der Spine 0,478 m · `heightfield.js` §6 · 2026-08-02*

- **Eine Begehbarkeitsprobe aus `>`-Vergleichen winkt NaN durch** — `walkable()` fragt Weltrand, Steigung und Wassertiefe ausschließlich als „größer als", und **jeder** Vergleich gegen NaN ist falsch. Ein Zielpunkt aus einer NaN-Schrittweite gilt damit als begehbar, `agent.x = NaN` wird geschrieben, und der Körper ist aus der Welt — ohne Ausnahme, ohne Log, ohne rote Prüfung. Die Quelle war ein Definitionsfeld, das eine Sonderfigur (Boss) nicht mitbrachte: `undefined * Steigungsfaktor` ist NaN, und die Kette dahinter ist nur mit Ungleichungen gebaut. → Am Eingang der Bewegung endlich prüfen (`Number.isFinite`) oder — billiger und ehrlicher — die *Anwesenheit* des Definitionsfelds als Gate führen, statt sie mit `??` unsichtbar zu machen. Eine Prüfung, die nur eine Richtung kennt, hat einen dritten Zustand, und der heißt „durchgewinkt".
  *`def.rush` fehlte allen drei Bossen; erster Kampfschritt schrieb NaN. Fix dreiteilig: Wert authored (4,0/4,6/7,0 m/s), `?? def.speed` als Netz, Pflichtprüfung je Boss in `posetest.js` (74 → 87) · `nav.js:262`, `brain.js:188` · `850400c` · 2026-08-03*

- **Eine Luftlinie ist keine Route, und was sie stoppt, steht selten im Höhenfeld** — der Sprint zur Bucht blieb nach 21 m stehen: grounded, nicht steil, Gefälle −0,31, kein Wasser, volle Gesundheit, 91 % der Schritte ohne Weg. Weder Hang noch Tod, sondern der einzige Collider im Umkreis von 18 m — die zerbrochene Brücke, deren Kiste den Stillstandspunkt enthält. Zehn Meter dahinter lag der zweite Riegel, den erst das Profil zeigte: 1,10 m Wasser, wo die Gerade die **Biegung** des Bachs schneidet, obwohl Ziel und Start auf derselben Uferseite liegen. Eine Gerade quer über eine Kurve kreuzt ein Gewässer, das niemand kreuzen muss. → Bei Stillstand zuerst die statische Kollisionsgeometrie am Ort abfragen (Weltbauten, nicht Terrain) und daneben ein Höhen-/Wasserprofil je Meter legen; die beiden zusammen benennen die Ursache, die Wegkoordinaten allein nie. Und den Knickpunkt aus der Spec ableiten statt ihn zu tippen — ein Zahlenpaar im Testcode driftet, sobald die Karte sich bewegt.
  *Sechs Knickpunkte gemessen; alle drei Stillstände liegen in derselben Brücken-Kiste (`wood`, x −12,9..2,8 · z 27,9..40). Gewählt `STREAM[0] + 3 × STREAM_WIDTH`: 266 m gelaufen, 0,6 m dran, 0,00 m Wasser, zweites Bein 4,8 m an der Kiste vorbei — derselbe Knick 8 m weiter westlich läuft hinein · `tools/smoke.mjs`, `src/world/spec.js:543` · `35197d6` · 2026-08-04*
