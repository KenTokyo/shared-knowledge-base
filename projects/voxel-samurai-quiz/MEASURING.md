# Messen und Urteilen — voxel-samurai-quiz (AEON)

**Lesen wenn:** du einen Sweep auswertest, gegen die Referenz vergleichst, einen Blindreview bestellst oder
die Frage „ist das jetzt besser?" beantworten sollst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Werkzeugliste und Loop stehen in `prompts/aeon-world/aeon-world-loop-prompt.md`. Hier steht, **wie diese
Werkzeuge schon gelogen haben**.

## Die zehn Tipps

- **Pixelmaße über zwei Auflösungen verglichen** — „Referenz 12 px, wir 11 px, die Breite stimmt bereits";
  die Referenz ist **1256 px** breit, unser Frame **1920 px**. → Jede Länge, Fläche, Lauflänge und
  Ortsfrequenz in **Anteilen der Framebreite**; dafür ist `bladesize.mjs` da.
  *0,955 % gegen 0,573 % = **0,60x**. P14p baute darauf eine ganze Achsenbegründung und verschlechterte die
  Spalte ungemessen (0,74x → 0,65x). Eine Schicht verloren · 2026-08-01*

- **Messfenster nicht auf Inhalt geprüft** — eine Spalte, die stabil in die falsche Richtung steuert.
  Ursache: das Fenster liegt woanders, als der Name sagt. → Vor der ersten Entscheidung **einmal den Crop
  ansehen**. Hier gilt: nur `L.low`/`R.low` dürfen steuern — `L.far` ist zu 97 % Blüte, `R.far`/`R.toe`
  hängen am Teich, und `shade.mjs` referenziert eine Blütenwiese.
  *`L.far` hat vier Entscheidungen falsch gesteuert · 2026-08-01*

- **Rauschboden geschätzt statt gemessen** — Ranking aus Unterschieden, die zwei Läufe desselben Codes
  schon erzeugen. → Vor dem Ranken **denselben unveränderten Code zweimal fahren**. Hier dreifach gestaffelt:
  innerhalb einer pausierten Aufnahme exakt bis 1e-4; über Neuflüge **Geometrie exakt**, Deckung bis
  **0,077**, `sil` bis 0,25, `near` bis 0,2 m; die alte 0,4 nur über Codeänderungen, die den `Rand`-Strom
  verschieben.
  *Zweimal zu eng geschätzt: erst 0,4, dann 0,006, korrekt erst aus sechs Läufen 0,077. Auch die Zuordnung
  „welcher Ort driftet" war falsch · 2026-08-01*

- **Konstante einseitig geschifft** — ein Wert, der besser aussieht als der Vorgänger, aber nie gegen sein
  Nachbarpaar geprüft wurde. → **Beidseitig einklammern** und den Wendepunkt zeigen. Vorbild: `uBlade.x`
  über acht Exponenten, `spanG` mit Minimum bei 3,0 (2,787 → **2,771** → 2,806), `gain` kreuzt dort 1,000,
  `shapeL` kreuzt 100 — **drei verschieden gebaute Spalten auf einem Wert**.
  *Ungeklammert geschifft wurde `uCanopy.x` (P14p) und beinahe `liftBodY` (P15c) · 2026-08-01*

- **Eine Metrik als Zielfunktion genommen, die es nicht ist** — die Spalte steigt, während das Ergebnis
  besser wird. → `errG` **niemals** optimieren: sie stieg über den ganzen Taper-Sweep, während `gain` von
  1,6 % daneben auf 0,3 % daneben ging. Zielfunktionen sind die Summenspalten von `grassonly.mjs`.
  *2026-08-01*

- **Durchschnitt statt Verteilung** — flache und tiefe Szene sehen im Mittel gleich aus. → `hist.mjs` auf
  das Rechteck. Die Referenz sitzt 2,2× heller **und** hat 23 % Pixel unter Fast-Schwarz; ein Pegelfix
  hätte 17,6 % des Vegetationsfensters unter Luminanz 0,004 gequetscht und die Zielmetrik dabei getroffen.
  *P14h: Defekt als **Spannweite statt Pegel** neu aufgelöst, Vorzeichen der übergebenen Diagnose gedreht · 2026-08-01*

- **Befund eines Reviewers übernommen statt nachgeprüft** — der Review misst richtig und schließt falsch,
  und der Fehler wandert in fünf Dokumente. → Von einem Subagenten die **Messung** übernehmen, die
  **Schlussfolgerung** selbst nachrechnen. Bei Bild-Reviews zusätzlich: Crops vorher auf dieselbe
  Frame-Fraktion normieren **und den Reviewer ausdrücklich warnen**, keine nativen Pixelzahlen zu vergleichen.
  *Der P14p-Blindreview; umgekehrt fand eine bestellte Gegenprüfung in P15d drei echte Defekte, die keine
  pausierte Pose zeigen konnte · 2026-08-01*

- **Pausierte Posen können Zeitverhalten nicht zeigen** — vierzehn saubere Messzeilen, und im Spiel atmet
  die Linse. Ursache: Dämpfung, Zustandsreset und Klippen existieren nur zwischen Frames. → Nach jeder
  Änderung an Rig, Dämpfung oder Zustand **einmal von Hand laufen**: Hang hinunter (Dämpfung), Maus langsam
  durch die Waagerechte (Klippen), `snap()` (Reset).
  *P15d: drei Defekte, alle in 14/14 grünen Posen unsichtbar; die Klippe maß **56,15°** — 3,4 ° Maus →
  27,3 ° Peilung · 2026-08-01*

- **Läufe mit verschiedenen Flags gemischt** — Zahlen, die nicht zueinander passen und keinen Fehler zeigen.
  → `--shots` verändert die Zahlen der Folgesites (`[flat]` liest 1/14 ohne, 2/14 mit). Alles innerhalb
  eines Vergleichs mit **denselben** Flags fahren und die Flags neben die Tabelle schreiben. Auch die
  Bedeutung wandert: `dem` heißt bei `orbit`/`pull` Restbedarf **nach** der Bewegung, bei `lift`/`cap`/`aim`
  die ursprüngliche Forderung.
  *2026-08-01*

- **Spalten über Feldindex gelesen** — awk liest Spalte 7, die Spaltenanordnung hat sich aber zwischen den
  Läufen geändert. → Vergleiche **header-getrieben** in Node, nie über Feldindizes.
  *P15d: eine erste awk-Ablesung von `pull.txt`/`aim.txt` war falsch und musste verworfen werden · 2026-08-01*

## Zwei Kontrollgrößen, die regelmäßig verwechselt werden

- **`set`, nicht `near`.** `set` ist der gesetzte Stand-off (Kontrollgröße). `near` wird am Auslöser
  gemessen, nach 2,5 s Weltlauf, in denen alarmierte Männer zulaufen. Die Differenz ist eine Aussage über
  das Tempo der Begegnung, kein Messfehler.
- **`open` gilt pro Aufnahme, nicht pro Ort.** Werte aus Zwischenläufen nicht mit denen eines Passes mischen.

## Vor dem ersten Urteil

- **`ctx.read()` statt `ctx.frame()` + `ctx.regions()`.** Nach `poseFrame` fällt `game.capturing` auf false
  und der nächste Animationsframe überzeichnet beide Targets — das Paar misst einen Live-Frame mit laufender
  Uhr, also plausible Zahlen von der falschen Quelle.
- **`Perf.stats` ist ein 512-Frame-Ring (~8,5 s), der zwischen Posen nie geleert wird.** Eine Sekunde nach
  dem Posieren gelesen ist der Median überwiegend die **vorherige** Kamera. `sweep.mjs` misst deshalb selbst.
- **Detektor einmal gezielt vergiften.** Ein Test, der beim eingebauten Fehler nicht rot wird, ist ein blinder
  Sensor (`where.mjs --selftest`, `world:obstruction -- --selftest`).
- **Ein Pass ist die Einheit des Urteils**, nicht ein Frame, den man gerade schön findet.
