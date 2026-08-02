# Notiz- und Zitat-Bench — quiz-arena-space

**Lesen wenn:** du in `tools/selftest.mjs` eine Klausel, ein `want`, eine Treibung aus der `DRIVES`-Tabelle anfasst — oder eine Zahl bzw. ein Quellzitat in `Notes/visual-review.md`, `.shots/_grid.mjs` oder `.shots/_board.mjs` änderst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Diese Bench ist der einzige Wächter über die Fäden zwischen den browserlosen Brett-Renderern und
`src/systems/Crossword.ts`. Der Gameplay-Arm hat seine eigene Datei: [`SIM-GATES.md`](SIM-GATES.md).

- **Zeilennummern-Zitate rotten mit nicht konstantem Versatz** — nach einem Umbau zeigen sie auf fremden
  Code, und der naheliegende Reflex („alles unterhalb um N schieben") repariert die Hälfte und bricht die
  andere. Innerhalb *einer* Zieldatei laufen die Versätze auseinander, weil oberhalb jeder Zitatstelle
  unterschiedlich viel eingefügt wurde. → Jede Stelle über den **Inhalt** neu bestimmen (Symbolname +
  zitierter Ausdruck), nie per Offset schieben — und die Fundliste **case-insensitiv** erheben, sonst fehlen
  Zitate, die niemand als Zitat geschrieben hat.
  *Der Kern-Bruch verschob `Crossword.ts` um ~80 bis ~180 Zeilen; 13 Zitate zeigten außerhalb ihres Symbols,
  eines auf eine Leerzeile. Gemessene Versätze in derselben Datei: `BOARD_TEX` +42, `begin` +66,
  `_place`/`_scorePlacement` +79, `_drawPanel` +141. Bench 58/60 → 60/60, Commit `6258e20` · 2026-08-02*
  *Eine Schicht später, bei einem Versatz von nur +5: zwei Zitate lagen ~570 Zeilen daneben, ein Schieben um
  5 hätte sie zementiert. Ein drittes log über die eigene Herkunft und war für jeden `Crossword.ts:`-Grep
  unsichtbar, weil `.shots/_board.mjs:590` es als Bildunterschrift `PORTED CROSSWORD.TS:1900-1917` ins
  Diagramm zeichnet — alle sieben mixed-case-Zitate derselben Datei waren sauber. Commit `8a7326f` · 2026-08-03*

- **Ein `want`, das der Check-Titel schon trägt, ist von jedem Fehlschlag erfüllt** — das Verdikt wird auf
  `<Check-Titel>: <Meldung>` gematcht, das Tor war also rot, ohne den benannten Defekt getroffen zu haben.
  → `want`-Fragmente gegen den eigenen Check-Titel prüfen und Titel-Teilstrings verbieten; die Klausel, die
  das erzwingt, gehört in dieselbe Bench.
  *`want: 'the board is'` gegen den Titel `the picture says how many puzzles the board is in`; die Sonde
  meldet nach der Reparatur `0 of 82 drives demand a fragment their own check title already carries` · 2026-08-01*

- **Ein roter Treiber, der auf den *reparierten* Wert ankert, stirbt an der nächsten Reparatur** — er trieb
  die Zitierung *von* `1900-1917` weg; eine spätere Zitatreparatur nahm genau diesen Anker mit, der Patch
  fand nichts mehr, und der Treiber kam `refused` zurück — ein **unbeurteilter Wächter**, während die Bench
  grün blieb. Dieselbe Stille erzeugt ein `file:`, das auf das falsche Blatt zeigt: das Zitat stand in
  `NOTES`, der Treiber patchte `VIS`. → `edit: [[lebender Wert, toter Wert]]` schreiben, nie umgekehrt —
  diese Richtung überlebt eine Reparatur; und das `file:` gegen das Blatt prüfen, das das Zitat **trägt**.
  Beides sagt nur ein voller Treiberlauf, `selftest` nie.
  *Beide Defekte standen über Schichten unsichtbar, keiner war von der Schicht gebrochen, die sie fand;
  2 von 87 → 1 von 87. Beim Umhängen fiel `selftest` prompt auf die Verteilungszahlen, die es verschob —
  eine Kaskade, siehe Tipp unten. Commit `8a7326f` · 2026-08-03*

- **Eine Zahlen-Kaskade lässt Treibungsanker still `refused` zurück** — wird eine Zahl in der Prosa
  nachgezogen, zitieren die Anker die alte Prosa und werden ungeprüft übersprungen; die Bench bleibt dabei
  **grün**, nur ein Volllauf sagt es. → Nach *jeder* Zahl in einem Blatt die Anker-Sonde fahren, die die
  `DRIVES`-Tabelle evaluiert und jeden Patch kumulativ anwendet.
  *Sechs `refused` erst im Dreiminutenlauf entdeckt, in einer Folgeschicht nochmals fünf; dieselbe Frage
  beantwortet die Sonde in 1 s statt 3 min · 2026-08-01*

- **Grünes Verdikt über einen Lauf, der nichts geprüft hat** — ein Gruppenfilter mit Tippfehler ließ die
  Bench „sound" melden und mit 0 beenden, weil der Einstiegspunkt nie prüfte, ob überhaupt ein Check lief.
  → Verweigerung in den Zusammenfassungs-Zweig: unbekannte Gruppe **und** `judged === 0` drucken `PROBLEM:`
  und beenden mit 1.
  *`node tools/selftest.mjs simulater` → `bench-sound (0 checks, no browser)`, EXIT=0, in 0,10 s — während
  vier eigene Klauseln genau diese Regel für andere erzwingen · 2026-08-01*

- **Das Prüfskript trennt anders als der Geprüfte** — die schmale Fassung zerlegte Meldungsarme nur an
  ` | `, die geprüften Checks trennen aber mit `; `; das Skript meldete „sauber" über Zeilen, die es nie
  ganz gesehen hatte. → Den Trenner aus der **geprüften Quelle** ableiten und das Skript einmal gegen eine
  absichtlich kaputte Kopie beißen lassen.
  *Erste Fassung meldete 4 saubere Zeilen; mit beiden Trennern sind es 6 widersprechende, zwei davon ohne
  Anmerkung · 2026-08-01*

- **Ausgeschriebene Zahlwörter sind für den Zahlen-Check unsichtbar und altern jahrelang** — der
  Größen-Check verlangt `\d+`, also standen „vier Treibungen" und „three patch …" ungeprüft in beiden
  Blättern. → Verteilungszahlen aus dem Harness neu ableiten (`--census`) und Zahlwörter über eine
  Wort→Zahl-Tabelle mitlesen; parst die Gruppe nicht, den Treffer überspringen statt zu raten.
  *Beide Blätter beschrieben die `harness`-Gruppe **seit drei Schichten** als vier Treibungen — es sind
  sieben · 2026-08-01*

- **Ein Wächter über ein Backup, das nie geschrieben wurde** — der Doc-Block versprach seit sechs
  Durchgängen eine Kopie in `.shots/.reddrive/`; das Verzeichnis wurde leer angelegt und leer gelöscht, der
  Wächter konnte deshalb nie feuern. → Die Eigenschaft **im Flug** beobachten (Verzeichniseinträge während
  eines Drives zählen) statt der eigenen Dokumentation zu glauben.
  *`grep -n SAFE` zeigte sechs Stellen, keine schrieb je eine Datei; live gemessen `entries=0`, nach dem
  Fix `entries=1` mit md5 gleich dem committeten Blob · 2026-08-01*

- **Nach der Kaskade fällt das Tor rot aus dem richtigen Grund und sagt es falsch** — die Kaskade zog das
  `edit` nach, weil dessen Suchtext in den Notizen stand, und ließ das `want` daneben mit der alten Torzahl
  stehen. → `want` hört **vor** der lebenden Zahl auf und zitiert nur, was sein eigener Patch schreibt;
  nach jeder Kaskade zwingend ein voller Lauf, kein gefilterter.
  *Erster Volllauf nach der Kaskade 55→60: Exit 1, drei `wrong`, fünf `not in run` — ein gefilterter Lauf
  und die Bench selbst sehen das per Konstruktion nie · 2026-08-01*

- **`grep` meldet stillschweigend null Treffer, weil ein NUL-Byte die Datei als binär markiert** — ein
  Steuerzeichen landet beim Schreiben im Quelltext; die Datei parst, `node` läuft, das PNG kommt heraus —
  aber **jeder** Lies-den-Quelltext-Check dieses Repos läuft über `grep`, und `Edit` scheitert dort
  grundlos, während `Read` ein harmloses Leerzeichen zeigt. → Bei unerklärlichem `Edit`-Fehlschlag
  `readFileSync(p).includes(0)` prüfen; der NUL-Check gehört als Dauercheck über alle Skripte.
  *Dreimal in diesem Repo passiert, einmal ausgerechnet in der Treibung, die für NUL-Bytes geschrieben
  wurde; der Check deckt inzwischen 45 Skripte ab · 2026-08-01*

- **Die Regel-Idee war zu dünn zum Tragen, und das war in beide Richtungen messbar** — „jedes Token im
  Doc-Block muss im Rumpf vorkommen" lieferte fast nur Falschtreffer, weil diese Doc-Blocks essayistisch
  über Nachbarklauseln, andere Dateien und Historie reden. → Richtung umdrehen: **der Rumpf ist die
  Wahrheit**, der Doc-Block wird durchsucht; und vier Kandidatenformen messen, bevor eine gebaut wird.
  *Verworfen: Zahlwort+Substantiv 10 Treffer gemischt, gebacktickter `--flag` 1/1 falsch, gebacktickte
  Datei 6/11 falsch, doppelt-gequotete Spanne 9/9 falsch. Umgedreht: 16 Spannen, 0 falsch, 0 mehrdeutig,
  2 echte Drifts gefunden · 2026-08-01*
