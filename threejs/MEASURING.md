# Messhandwerk — global

**Lesen wenn:** du eine Zahl erzeugst, auf die eine Entscheidung folgt — Sweep, Ranking,
Referenzvergleich, Kostenmessung, Review.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

Diese Datei existiert, weil **eine** Fehlerform in Echtzeit-3D teurer ist als jeder Renderfehler:

> Die Messung ist richtig, die Einheit oder das Fenster nicht — und die Schlussfolgerung steht danach
> mehrere Schichten lang, weil sie durch eine Zahl gedeckt ist.

Ein Renderfehler wird gesehen. Ein Messfehler wird zitiert.

## Die zehn Tipps

- **Pixelmaße über zwei Auflösungen verglichen** — „Referenz 12 px, wir 11 px, passt". → Jede Länge,
  Fläche, Lauflänge und Ortsfrequenz in **Anteilen der Bildbreite**, nie in nativen Pixeln. Gilt auch für
  jeden KI-Review: Crops vorher auf dieselbe Frame-Fraktion normieren **und** den Reviewer ausdrücklich
  warnen.
  *1256 px gegen 1920 px: 0,955 % gegen 0,573 % = 0,60x. Trug eine ganze Achsenbegründung; die
  Verschlechterung blieb dadurch ungemessen · Herkunft: voxel-samurai-quiz · 2026-08-01*

- **Messfenster nie auf Inhalt geprüft** — eine Spalte steuert stabil in die falsche Richtung. Ursache: das
  Fenster liegt woanders, als sein Name sagt. → Vor der ersten Entscheidung **den Crop einmal ansehen** und
  festhalten, welche Teilfenster steuern dürfen.
  *Ein Fenster lag zu 97 % auf Blüte statt Gras und hat vier Entscheidungen falsch gesteuert · Herkunft:
  voxel-samurai-quiz · 2026-08-01*

- **Rauschboden geschätzt statt gemessen** — Ranking aus Unterschieden, die zwei Läufe desselben Codes schon
  erzeugen. → **Denselben unveränderten Code zweimal fahren, bevor gerankt wird.** Der Boden ist oft nach
  Größe gestaffelt: Geometrie exakt, Deckungen und Verteilungen deutlich lockerer.
  *Zweimal zu eng geschätzt, korrekt erst aus sechs Läufen — Faktor 13 daneben; auch die Zuordnung „welcher
  Ort driftet" war falsch · Herkunft: voxel-samurai-quiz · 2026-08-01*

- **Vorher und Nachher aus zwei verschiedenen Stunden** — die Framezeit steigt nach dem Commit klar und
  **reproduzierbar**, drei Wiederholungen des neuen Codes liegen eng beieinander, und die Regression ist
  trotzdem nicht im Code. Ursache: Wiederholungen innerhalb einer Stunde messen den Rauschboden **der
  Stunde**. Fremdlast (zweiter Browser, Editor, fremder Dev-Server, Thermik) verschiebt das ganze Niveau
  zwischen Stunden um Zehnerprozente und ist in keiner Wiederholung sichtbar — sie bestätigt nur sich selbst.
  → **A/B nur unmittelbar nacheinander, aus einem Bündel und einer Sitzung**, und das Wiederholungspaar in
  **umgekehrter Reihenfolge**; kehrt sich die Differenz um oder schrumpft sie unter den Boden, war es Drift.
  Wenn beide Seiten verschiedenen Code brauchen, gehört der Schalter **ins Bündel** (Abfragewert, einmal beim
  Modulstart gelesen), statt zweimal zu bauen — zwei Bündel sind zwei Sitzungen. Fremdlast **vor und nach** dem
  Lauf als Zahl festhalten, nicht als Eindruck.
  *Bei identischer Lichtzahl 13 las derselbe Fall 4,3/4,4 ms um 07:14 und 6,0/6,3 ms um 14:20; drei Läufe
  innerhalb 20 min stimmten auf 6,0–6,2 überein und sahen wie ein Beweis aus. Während des ersten Paares lief ein
  fremder Chrome mit ~230 % CPU (GPU-Prozess allein 110 %). Zwei Schichten jagten eine Regression, die im Code
  nicht existierte · Herkunft: voxel-samurai-quiz · 2026-08-02*

- **Konstante einseitig geschifft** — ein Wert sieht besser aus als sein Vorgänger und wird geschifft. →
  **Beidseitig einklammern** und den Wendepunkt zeigen; überzeugend ist er erst, wenn mehrere **verschieden
  gebaute** Spalten auf denselben Wert zeigen.
  *Ein Optimum bei drei unabhängigen Spalten auf einem Exponenten; zwei ungeklammerte Konstanten derselben
  Reihe mussten später zurück · Herkunft: voxel-samurai-quiz · 2026-08-01*

- **Falsches Instrument für die Frage** — eine fps-Zahl aus einem Aufwärmfenster als Kostenmessung zitiert.
  → Drei getrennte Instrumente: **Fehler-Gate** (Exit-Code, Konsolenfehler), **Bildrate** (Median über einen
  Ring, nach dem Aufwärmen), **Kosten** (GPU-Timer, gepaart, rotiert, mit Null-Kontrolle). Keines ersetzt
  ein anderes.
  *Dieselbe Zeile las auf identischem Code 83,5 und 44,3 fps · Herkunft: voxel-samurai-quiz · 2026-08-01*

- **Durchschnitt statt Verteilung** — eine flache und eine tiefe Szene sind im Mittel gleich. → Histogramm
  über das Rechteck. Ein Pegelfix kann die Zielmetrik **treffen** und dabei ein Sechstel des Fensters unter
  Schwarz quetschen; oft ist der Defekt **Spannweite statt Pegel**.
  *Referenz 2,2× heller und trotzdem 23 % Pixel unter Fast-Schwarz · Herkunft: voxel-samurai-quiz · 2026-08-01*

- **Reviewbefund übernommen statt nachgerechnet** — der Review misst richtig und schließt falsch, und der
  Fehler wandert in fünf Dokumente. → Vom Reviewer die **Messung** übernehmen, die **Schlussfolgerung** selbst
  nachrechnen. Umgekehrt gilt dasselbe zugunsten des Reviewers: eine bestellte Gegenprüfung findet Defekte,
  die die eigene Messreihe strukturell nicht zeigen kann.
  *Beide Richtungen je einmal belegt · Herkunft: voxel-samurai-quiz · 2026-08-01*

- **Pausierte Posen zeigen kein Zeitverhalten** — jede Messzeile grün, und im Spiel atmet die Kamera.
  Ursache: Dämpfung, Zustandsreset und Fallklippen existieren nur **zwischen** Frames. → Nach jeder Änderung
  an Rig, Dämpfung oder Zustand einmal von Hand durchlaufen — und die drei Fragen stellen: Wird gedämpft?
  Wird beim Reset gelöscht? Springt eine Fallunterscheidung?
  *Drei Defekte, alle in 14 von 14 grünen Posen unsichtbar; eine Fallunterscheidung sprang über 56° ·
  Herkunft: voxel-samurai-quiz · 2026-08-01*

- **Spalten über Feldindex gelesen, Läufe mit verschiedenen Flags gemischt** — Zahlen passen nicht zueinander
  und zeigen keinen Fehler. → Vergleiche **header-getrieben**, nie über Feldindizes; die Flags neben die
  Tabelle schreiben. Auch die **Bedeutung** einer Spalte kann zwischen Modi wandern.
  *Eine awk-Ablesung musste komplett verworfen werden, weil sich die Spaltenanordnung zwischen zwei Läufen
  geändert hatte · Herkunft: voxel-samurai-quiz · 2026-08-01*

## Vier Kontrollen, die sich fast immer bezahlt machen

- **Bitgleichheits-Kontrolle nach einem Umbau.** Der neue Code muss bei altem Parameterwert exakt die alten
  Zahlen liefern. Alles danach steht auf dieser Zeile.
- **Detektor einmal gezielt vergiften.** Ein Test, der beim absichtlich eingebauten Fehler nicht rot wird,
  ist ein blinder Sensor.
- **Null-Kontrolle im Sweep** (eine Zeile, die nichts ändert) — sie misst den Boden des Instruments mit.
- **Verifizieren, dass das Werkzeug die gemeinte Szene misst.** Ein Tool, das still die falsche Welt
  vermisst, ist der teuerste Fehler überhaupt, weil **jede** Zahl plausibel aussieht.

## Handoffs

- Kosten und Budgets → [Performance](PERFORMANCE.md)
- Capture, A/A, Beleg → [Debug und Review](DEBUG-REVIEW.md)
