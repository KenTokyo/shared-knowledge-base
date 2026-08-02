# Kreuzwortbrett und seine browserlosen Renderer — quiz-arena-space

**Lesen wenn:** du `src/systems/Crossword.ts` anfasst — Wortplatzierung, Panel-Zeichnung, Buchstabenträger — oder die browserlosen Simulatoren `.shots/_grid.mjs` / `.shots/_board.mjs`.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Diese Renderer sind auf einer Maschine ohne Browser die **einzige** verbliebene Bildkontrolle
(`node .shots/_board.mjs --algo cross --words 18 --out <pfad>`). Ihre Fäden zu `Crossword.ts` bewacht
`tools/selftest.mjs` — siehe [`SELFTEST-NOTES.md`](SELFTEST-NOTES.md).

- **Der Simulator ist Fiktion, sobald er der Quelle nicht mehr gleichläuft** — ein Zellgrößen-**Boden**,
  als Lesbarkeitsschutz gedacht, ließ hohe Bretter aus ihrer Box in der Textur herauslaufen; der Fix musste
  in `Crossword.ts` *und* in `.shots/_grid.mjs` gleichzeitig landen. → Jede Änderung an der Panel-Arithmetik
  in beiden Dateien zugleich, sonst zeigt der einzige verfügbare Bildkanal etwas, das das Spiel nicht tut.
  Nach unten klemmen ist hier fast immer falsch, nach oben fast immer richtig.
  *12 Wörter ergaben ein 8×23-Gitter = 414 px in einer 392 px hohen Box; ohne den Boden fotografierte der
  Simulator erstmals 27 Zeilen bei 14,5 px Zelle — der Boden hätte sechs Zeilen abgeschnitten · 2026-07-31*

- **`linked = n/n` beschreibt vier getrennte Rätsel** — die Kennzahl zählt pro Wort, ob es *irgendein*
  anderes berührt, nicht ob das Brett zusammenhängt; ein Layout sah damit vollständig verbunden aus und war
  es nicht. → Komponenten per Union-Find zählen und `COMPONENTS n / LARGEST n%` **ins Bild** zeichnen, nicht
  in eine Notiz.
  *`park` mit 18 Wörtern: 4 Inseln `[5,5,5,3]`, größte hält 28 % — bei `linked=18/18`. `cross` mit
  18 Wörtern: 1 Insel, 100 %. Der ausgelieferte Algorithmus: 8 Inseln, größte 44 % · 2026-08-01*

- **Acht der ersten neun Wörter lagen als waagerechte Balken in Spalte 0** — der Parkplatz-Zweig gab immer
  dieselbe Position und Achse zurück; bei Parallelabstand C existiert eine Kreuzung genau dann, wenn
  L ≤ 2C−1, ein Abstand von 2 lässt also nur Wörter bis Länge 3 zu — und das kürzeste Wort im Pack hat
  vier Buchstaben. → Den Abstand aus der **längsten möglichen Antwort** ableiten, die Achse aus dem
  Panel-Seitenverhältnis wählen und die Reihenfolge nach „kann kreuzen" statt nach Queue-Kopf bedienen.
  *`linked` 2/9 → 10/10, Box 5×19 → 9×15, Panel-Füllung 20,9 % → 47,8 %, Zellgröße 20,6 → 26,1 px,
  geparkte Wörter 7 → 0 · 2026-07-31*

- **Der Turmring, auf den geplant wurde, existiert in keinem Sektor** — die Buchstaben sollten statt vier
  eigener Türme bestehende Arena-Strukturen leihen; an einem Rätselort bei r=52 liegen die vier nächsten
  Strukturen 26–61u entfernt und **alle auf einer Seite**. Ein fester Radius als Planungsgrundlage war
  nie durch die Sektor-Layouts gedeckt. → Die Wirte **quadrantenweise** wählen (pro Runde gedreht) und den
  Ort dorthin legen, wo in jedem Sektor etwas steht — hier: über den Kern in die Mitte.
  *Winkelloch im schlechtesten Sektor 212° vor dem Umbau, ≤164° danach; engstes Wirtspaar 23u, Wirte
  27–98u entfernt; Obstacle-Identitätsvergleich vor/während/nach der Phase 3/3 bestanden · 2026-08-02*

- **Ein Verdeckungs-Detektor mit einem Strahl zeigt immer auf den Fokus** — der Strahl lief die Blickachse
  hinunter; ein Okkluder am Bildrand blieb unberührt, und ein vollständig begrabener Buchstabe wurde als
  „freier Blick" gemeldet. → Einen Strahl **pro Buchstabenträger**, Abnahmekriterium ist der Nullvektor
  über alle.
  *`plateOccl=[2 0 0 0]` bei gleichzeitig `occl=0`; zusätzlich war kein einziger Kamera-Zoomwert an beiden
  Enden sauber, womit die Kamera als Hebel messtechnisch ausschied · 2026-07-30*

- **Ein Gate auf dem Zustand zum Auslösezeitpunkt liest eine bereits zurückgesetzte Runde** — ein 260-s-Lauf
  lief über sein eigenes Rundenende hinaus, der Reset hatte die Zellen geleert, und die Live-Zählung las
  Nullen; jeder Marker fiel durch seinen eigenen „nur wenn gelöst"-Wächter. → Das Gate auf den **letzten
  Spitzenwert der Spur** legen, nicht auf den Zustand im Moment der Auslösung.
  *18 Commits mit 10 Kreuzungen im selben Lauf, veröffentlicht wurde ein grünes Lesbarkeits-Verdikt · 2026-07-31*
