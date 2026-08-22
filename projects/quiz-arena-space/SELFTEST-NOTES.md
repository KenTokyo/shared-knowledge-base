# Notiz- und Zitat-Bench — quiz-arena-space

**Lesen wenn:** du in `tools/selftest.mjs` eine Klausel, ein `want` oder eine Treibung aus der `DRIVES`-Tabelle in `tools/reddrive.mjs` anfasst — oder eine Zahl bzw. ein Quellzitat in `Notes/visual-review.md` änderst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Diese Bench ist der einzige Wächter über die Fäden zwischen den browserlosen Brett-Renderern und
`src/systems/Crossword.ts`. Der Gameplay-Arm hat seine eigene Datei: [`SIM-GATES.md`](SIM-GATES.md).

- **Zeilennummern-Zitate rotten mit nicht konstantem Versatz** — nach einem Umbau zeigen sie auf fremden
  Code, und der naheliegende Reflex („alles unterhalb um N schieben") repariert die Hälfte und bricht die
  andere. Innerhalb *einer* Zieldatei laufen die Versätze auseinander, weil oberhalb jeder Zitatstelle
  unterschiedlich viel eingefügt wurde. Teuer ist nicht die kaputte, sondern die **plausible** Nummer: die
  verschobene Zeile existiert, liegt im richtigen Symbol und liest sich wie gemeint — „die Zeile ist da" ist
  deshalb kein Test, und genau daran prüft der Check `a citation in the notes points at a line that is there`
  vorbei. → Jede Stelle über den **Inhalt** neu bestimmen (Symbolname + zitierter Ausdruck), nie per Offset
  schieben; ein Paar, das **zweimal** brach, ganz auf Symbole umstellen — und die Fundliste
  **case-insensitiv** erheben, sonst fehlen Zitate, die niemand als Zitat geschrieben hat. Symbole heilen
  aber nur die Drift, nicht die **Aussage**: die Positionsprosa beim Umstellen gegen den Code mitmessen.
  *Der Kern-Bruch verschob `Crossword.ts` um ~80 bis ~180 Zeilen; 13 Zitate zeigten außerhalb ihres Symbols,
  eines auf eine Leerzeile. Gemessene Versätze in derselben Datei: `BOARD_TEX` +42, `begin` +66,
  `_place`/`_scorePlacement` +79, `_drawPanel` +141. Bench 58/60 → 60/60, Commit `6258e20` · 2026-08-02*
  *Eine Schicht später, bei einem Versatz von nur +5: zwei Zitate lagen ~570 Zeilen daneben, ein Schieben um
  5 hätte sie zementiert. Ein drittes log über die eigene Herkunft und war für jeden `Crossword.ts:`-Grep
  unsichtbar, weil der damalige Brett-Simulator (seit 2026-08-03 gelöscht) es als Bildunterschrift
  PORTED CROSSWORD.TS:1900-1917 ins Diagramm zeichnete — alle sieben mixed-case-Zitate derselben Datei
  waren sauber. Commit `8a7326f` · 2026-08-03*
  *Dasselbe Paar in `main.ts` stand über vier Stellungen: `Game.ts:725`/`:743`, `786`/`804`, `806`/`824`,
  heute `809`/`827` — zweimal repariert, dreimal gebrochen. Beim mittleren Bruch wuchs der Doc-Block darüber
  um 20 Zeilen, und `simulate(dt) {` rutschte von 766 auf **exakt die zitierte 786**, während der gemeinte
  `debugSim`-Aufruf auf 806 weiterzog: das Zitat zeigte auf eine echte Zeile im richtigen Symbol, die sich
  wie gemeint las. Die Symbolfassung behauptete danach, `simulate` rufe `debugSim` „on its first line" —
  der Aufruf steht 20 Zeilen und ein `if (run.ended) return;` tief. Commit `fb5d0eb` · 2026-08-03*

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
  nach jeder Kaskade zwingend ein voller Lauf, kein gefilterter. **Preis dieser Regel:** die Transkriptzeile
  zitiert die *ganze* Meldung samt lebender Zahl und altert daher weiter — `selftest` matcht per
  `q.includes(want)` (`selftest.mjs:1998`) und sieht alles hinter dem `want` nie. Nur die
  Transkript-Prüfung des Volllaufs nennt solche Zeilen, und zwar als `not in run`. **Zweiter Preis: genau
  dieser Pflichtlauf ist die verwundbarste Prüfung der Bench** — er läuft ~5 min, und ein Schichtwechsel
  killt die von `reddrive` gespawnten `selftest`-Kinder, während der `node`-Elternprozess weiterläuft und
  das Log zu Ende schreibt. Der Treiber, der gerade dran war, kommt als `crashed - the bench did not reach
  a verdict - syntax` zurück: ein echt aussehender Fehlschlag ohne Defekt dahinter. → Den Pflichtlauf **im
  Vordergrund** fahren, damit der Turn die vollen 5 min offen bleibt; ein Hintergrundlauf über ein Turn-Ende
  hinweg stirbt nicht, sondern schreibt ein **vergiftetes** Log. Und jedes `crashed … did not reach a
  verdict` erst mit `node tools/reddrive.mjs "<Namensfragment>"` (Sekunden statt 5 min) gegenprüfen, bevor
  man es glaubt.
  *Erster Volllauf nach der Kaskade 55→60: Exit 1, drei `wrong`, fünf `not in run` — ein gefilterter Lauf
  und die Bench selbst sehen das per Konstruktion nie · 2026-08-01*
  *Viermal in Folge getroffen, jedes Mal ein anderer Treiber — der, der beim Abräumen gerade lief:
  `the group tally is reworded away` (Zeile 39), `the group tally drifts` (37), `a sheet miscounts the
  verdicts it lists` (69), `the verdict count is reworded out of a sheet` (71). Alle vier gefiltert sofort
  `red`; der ununterbrochene Vordergrundlauf meldete `1 of 87`, 86 `red` + 1 `wrong`, 0 `crashed` · 2026-08-03*
  *Nach dem Crossword-Schnitt zitierten zwei Transkriptzeilen tote Dateienden: `Crossword.ts` „stops at
  line 2109" (lebend 1408) und `Diagnostics.ts` „480" (lebend 492, ohne jeden Schnitt gewachsen).
  `selftest` meldete davor wie danach 1 von 60 · 2026-08-03*

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
  **Zweite Schicht, dieselbe Klausel: die umgedrehte Richtung filtert gegen die Platte, und ein gelöschtes
  Skript fällt damit aus der *Menge* statt in den Rot-Zweig.** Die Kandidatenliste entsteht per
  `readdirSync` über `tools/`; nennt eine geschriebene Kommandozeile ein Skript, das es nicht mehr gibt,
  kommt sie leer zurück und die Spanne wird in derselben Stille übersprungen, die eine Spanne *ohne* Skript
  verdient. Das ist der schlimmere der beiden Verfälle: ein erfundener Switch ist ein falsches Wort auf
  einer Zeile, die noch läuft — ein gelöschtes Skript ist eine ganze Zeile, die nichts mehr beantwortet.
  → Jeden Filter, dessen Menge aus dem Dateisystem kommt, als **eigenen Term mit eigenem Zweig** führen;
  ein Term ohne Zweig druckt am Ende nur den bestätigenden Satz. Und nach jedem Löschen die Blätter nach
  dem toten Dateinamen greppen, statt dem Check zu glauben, der ihn gerade verloren hat.
  *Der Brett-Schnitt nahm den Gitter-Simulator mit; danach stand seine `--algo park`-Zeile in drei
  Prosa-Spannen zweier Blätter, und der Treiber, der genau diese Klausel rot treiben sollte, ankerte selbst
  darauf — der Wächter konnte seinen eigenen Fall nicht mehr sehen und kam `green` zurück. Der dritte Term
  fand alle drei sofort. Volllauf danach: 64 von 64 Toren rot treibbar, `selftest` 37/37 · 2026-08-03*

- **Ein Dateisplit verschiebt nicht nur Nummern, sondern die Datei, die ein Zitat meint** — eine
  Fortsetzung wie `` `:681` `` nennt keinen Dateinamen und löst gegen die zuletzt genannte Datei des
  Satzes auf. Zieht das Symbol davor in eine neue Datei, zeigt die Fortsetzung lautlos in ein anderes
  File, landet dort auf einer **echten** Zeile und bleibt grün — und der Treiber, der auf ihr ankert,
  nennt in seinem `want` weiter die alte Datei. → Nach jedem Schnitt jede Fortsetzung gegen die **Datei**
  neu bestimmen, nicht nur gegen die Zeile, und den Dateinamen im `want` mitziehen; beim Leerzeilen-Treiber
  **beide** Seiten des `edit`-Paars neu erheben — der tote Wert muss eine echte Leerzeile treffen, der
  lebende darf keine sein. **Und die nummernlose Form mitziehen:** der Check `every Crossword.ts citation
  still lands in its symbol` sammelt nur `File.ts:\d+ (symbol)` ein, also sieht er weder ein nacktes
  `` `_place` `` noch ein „Ported verbatim from `src/systems/X.ts`" — die Prosa um ein Zitat herum altert
  ungeprüft weiter, auch wenn das Zitat selbst nachgezogen wurde. Nach jedem Schnitt zusätzlich per
  Symbolgrep über die zitierenden Dateien gehen, nicht nur den Check fahren.
  *`Crossword.ts` 2.882 → 1.408 in drei Schnitten. `:681` zeigte in beiden Blättern nach dem Umzug von
  *park* in die damalige Gitterdatei auf `_unregister` und blieb grün; umgehängt auf deren `:55`,
  Leerzeilen-Treiber von `1780→1769` auf `1205→1206`. Beide Ziele sind mit dem Brett gelöscht — die
  Zitatform steht hier deshalb ohne Backticks, damit kein Grep ihr noch folgt · 2026-08-03*
  *Zwei Schichten später: derselbe Schnitt hatte die **Rümpfe** beider Simulatoren korrekt zurückgelassen
  und ihre **Kopfblöcke** nicht — 14 tote Symbolnennungen (`_place`, `_scorePlacement`, `_nextEntry`,
  `_drawPanel`; alle vier lebten damals ohne Unterstrich in den beiden Brettdateien, heute keines von
  ihnen mehr) und zwei
  Hausregelsätze, die auf `src/systems/Crossword.ts` zeigten, wo der geportete Code nicht mehr liegt.
  `selftest` meldete davor wie danach 1 von 60. Mitgewandert war auch die Aussage: `place` parkt nicht
  mehr selbst, sondern fällt auf `park` durch · 2026-08-03*

- **Zeilenangabe zuerst korrigiert, Datei danach bearbeitet** — dieselbe Zitatzeile in
  `visual-review-part-3` ging in einer Sitzung zweimal kaputt: erst durch fremde Einfügungen (`:7263`),
  dann durch den eigenen späteren Commit, der 26 Zeilen davor einfügte (`:7392` → `:7418`). Der
  `reddrive`-Antrieb, der auf dieser Zahl sitzt, meldete `refused` — sein Flicken fand seinen eigenen
  Suchtext nicht mehr, also blieb der Wächter ungeprüft. → **Zeilenangaben als Letztes einer Änderung
  nachlesen**, nach dem letzten Quell-Edit; und wer eine Angabe korrigiert, prüft mit, ob ein Antrieb oder
  eine Transkriptzeile auf genau diesen Text gepinnt ist (`grep` nach der alten Zahl in `tools/` **und**
  `Notes/`, nicht nur in der zitierenden Datei).
  *Drei Angaben in einer Sitzung verschoben, nur eine davon fing ein Gate — die anderen zeigten auf eine
  schließende Klammer und auf eine Kommentarzeile, beides nicht leer, und mehr prüft das Gate nicht · 2026-08-22*
