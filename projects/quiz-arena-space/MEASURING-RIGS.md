# Messvorrichtungen — quiz-arena-space

**Lesen wenn:** du an der Vorrichtung arbeitest, die eine Zahl für eine Klausel *herstellt* — an einem Stub, einem Wrapper, einem Antrieb oder einem Parser.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Was die Klausel selbst behauptet, steht in [`SIM-GATES.md`](SIM-GATES.md). Hier steht, warum die Zahl,
die bei ihr ankommt, nicht die war, die im Spiel entstand.

- **Der Wrapper war schmaler als das, was er umschloss** — der Fix griff im Produktivcode nachweislich, und
  der Arm druckte trotzdem exakt dieselben Zahlen wie davor. Ein Mess-Wrapper mit weniger Parametern als die
  umschlossene Methode stellt deren altes Verhalten still wieder her, **aber nur innerhalb der Messung**. →
  Wrapper über die vollständige Signatur oder über `(...a)` schreiben, und nach jeder Signaturerweiterung im
  Produktivcode jeden Wrapper im Harness nachziehen. Ein Wrapper, der schmaler ist als sein Ziel, fällt nicht
  aus — er misst den alten Code weiter.
  **Ein Stub, der schmaler ist als sein Ziel, fällt dagegen laut aus — und das ist teurer, nicht billiger:**
  ein fehlender Member ist kein Messfehler, sondern ein `TypeError` mitten im Arm, und alles **hinter** dem
  Arm wird in diesem Lauf nie beurteilt. Eine getippte Memberliste ist dabei die eigentliche Ursache; sie
  kann nur zurückfallen. → Die Memberliste **aus der Quelle schneiden** (`readFileSync` + Regex auf die
  Aufrufform, hier `this.vfx.X(` / `this.vfx.X.Y(`) und einen **Größen-Term** danebenlegen: ein Regex, das
  aufhört zu matchen, liefert die leere Menge im selben zuversichtlichen Ton wie eine Datei, die aufgehört
  hat, Effekte zu rufen.
  *`VFX._afford` bekam einen vierten Parameter `evicts`, der Wrapper in `tools/sim.mjs` nahm drei und ließ ihn
  fallen: `rings=158/176` und dieselben Verweigerungen vor wie nach dem Fix · 2026-08-02*
  *Zwei Rigs derselben Datei, eines nachgezogen, eines nicht: `Weapons.ts` ruft sieben `vfx`-Member, der
  Stub im `weapons`-Arm trug fünf. `this.vfx.shockwave is not a function` beendete den Lauf in der
  Scatter-Halteschleife — **31 Klauseln** ab diesem Arm kamen nie zu einem Verdikt, die des Arms selbst
  eingeschlossen, weil er erst am Ende meldet. Geschnitten statt getippt: 69 von 69 · 2026-08-03*

- **Ein selbstscharfstellender Timer im Messobjekt verschiebt den Zufallsstrom** — Vorher/Nachher einer
  reinen Umschichtung wich ab, obwohl der Graph unverändert war. `_startAmbient` armt ein 2,2–7,4 s
  `setTimeout`, das aus dem **geteilten** `audioRng` zieht und sich selbst neu scharfstellt; über einen
  minutenlangen Sweep feuert es dutzendfach zu maschinenabhängigen Zeitpunkten und entnimmt Zahlen mitten
  aus dem Strom, aus dem jede Tonhöhenvariation liest. Jede lange Audio-Messung ist damit unreproduzierbar,
  ohne dass irgendwo ein Fehler auftaucht. → Nach `build()` `clearTimeout(engine._clankTimer)`, vor jedem
  Render `audioRng.setSeed(...)`. Im **Rig** beheben, nicht in der Engine — das Geräusch soll es im Spiel
  geben. Das Fehlerbild erkennt man am *Muster*, nicht am Betrag: genau die Stimmen, die den RNG nie
  anfassen, bleiben bitgenau, alle anderen wandern. Sind einige Zeilen identisch und andere nicht, ist es
  ein verschobener Strom und kein geänderter Graph.
  *`shieldBreak` 0.3083 / `missileLaunch` 0.0627 / `bulwarkVent` 0.4179 zweimal bitgleich, `plasmaShot`
  0.0907 → 0.0968; nach dem Fix zwei volle Läufe byte-identisch (4394 B) · 2026-08-20*

- **Eine Umschichtung ist erst bewiesen, wenn beide Formen gegeneinander laufen** — zwei identische Läufe
  *derselben* neuen Form beweisen nur, dass das Rig deterministisch ist, nicht dass die Teilung nichts
  verändert hat. → Die alte Form aus den neuen Dateien **wieder zusammensetzen** und beide über dasselbe
  Rig fahren (`QA_AUDIO_MOD=<pfad>`), danach die Rekonstruktion löschen. Ergänzend statisch: jeder
  Methodenname genau einmal über die ganze Kette.
  *`Audio.ts` 3196 → 6 Dateien; Monolith aus den vier neuen Dateien in Originalreihenfolge neu geschnitten
  (2912 Z., temporär), volle Bench beider Formen `IDENTICAL`, 83 Methoden je genau einmal · 2026-08-20*

- **Round-Robin füllt keinen Pool** — die naheliegende Antriebsform (reihum je einen Gegner je Schlüssel,
  viele Runden) misst nichts: `acquireModel` holt sofort zurück, was die Vorrunde freigab, die Free-List
  bleibt bei einer Handvoll stehen und die Deckel-Klausel wird grün, ohne den Deckel je berührt zu haben.
  → Je Schlüssel im **Batch** spawnen, den Batch als Ganzes freigeben, erst dann den nächsten Schlüssel.
  *10, 12 und 16 Runden Round-Robin ergaben alle `pooled=18` statt der geforderten 180; im Batch-Betrieb
  246 freigegebene Rümpfe über 6 Schlüssel → exakt 180 · 2026-08-02*

- **Das Rot kam vom eigenen Testeingangssignal, nicht vom Code** — drei von vier Rotmeldungen einer
  Schicht waren Fehler der Stimuli und sahen exakt wie echte Funde aus. → Jede Rotmeldung **zuerst gegen
  das eingespeiste Signal nachrechnen**, bevor eine Zeile Produktivcode angefasst wird; die Rechnung
  kostet Minuten, der falsche Fix eine Schicht.
  *Ein „1 Schaden"-Projektil ist wegen `Math.max(1, …)` in Wahrheit 60 dps und tötete den Kern bei 9,2 s,
  während das Verwundbarkeitsfenster noch bei 4,8 s stand; 5 Schaden/Frame ergaben 0,029 Shake-Zufluss
  gegen 0,043 Abfluss — netto negativ, `corefreeze` hatte nichts zum Einfrieren · 2026-08-02*

- **Das Messinstrument besteht seine eigene Rot-Treibung nicht** — zwei Verfahren für Per-Frame-Allokation
  trennten synthetisch sauber und sahen die absichtlich eingebaute Regression trotzdem nicht. → Instrument
  erst gegen eine eingebaute Regression rot fahren; besteht es nicht, **zählen statt messen**.
  *`process.memoryUsage()` meldete 208 B/Frame und für eine Obermenge *weniger* Verbrauch als für ihre
  Teilmenge; der Minor-GC-Zähler trennte 0/3/8 GCs bei 0/1/5 Objekten über 2 Mio. Iterationen, maß für
  einen pro Frame erzeugten `THREE.Vector3` aber 1 GC gegen 2 über 2 Mio. Frames (V8 scalar replacement) · 2026-08-02*

- **„Keine Funde" war der Parser, nicht der Befund** — ein Karten-Audit meldete Entwarnung, weil sein
  Brace-Parser jede ausdruckskörperige Pfeilfunktion still übersprang. → Vor dem Glauben an ein
  Null-Ergebnis die **Eingangsmenge** des Werkzeugs ausdrucken lassen; „Karten ohne Body: keine" muss
  selbst eine geprüfte Zeile sein.
  *„targets with no reader: none" bei 24 von 41 stillschweigend fallengelassenen Karten
  (`apply: (s) => (…)` ohne Klammer) · 2026-08-01*

- **Die Auszeichnung war der Zustand vor dem ersten Frame** — eine Klausel las `.hud-strip` im TEMPLATE
  und meldete „12 Elemente, down from 24, cap 14", während der Streifen auf dem Schirm 22 trug. Ursache:
  `_slot` ersetzt beide Slots per `innerHTML`, sobald etwas drinliegt; was im Markup steht, sieht der
  Spieler nur, bevor er das erste Mal aufsammelt. Ein Markup-Read ist deshalb kein Read des Produkts,
  sondern eines Anfangszustands — und er meldet die harmlose Zahl. → Vor jeder Textlesung von Markup
  **jeden Schreiber derselben Knoten suchen** (`innerHTML`, `textContent`, `appendChild`, `replaceChildren`).
  Findet sich einer, wird die Zahl **getrieben statt geparst**: das echte Verfahren gegen einen Knoten-Stub,
  und gezählt wird in dem String, den es erzeugt hat. Nur was niemand überschreibt, darf Text bleiben.
  *8 (Schale) + 2 × (4 + `MAX_CHARGES`) = 22 gegen einen Deckel von 14, drei Phasen lang grün. Getrieben
  über 112 (index, skill, charge, pending)-Zustände; das Gift, das den Defekt zurückgibt, misst exakt die
  22, die ein unabhängiges Wegwerf-Rig vorher gemessen hatte · 2026-08-02*

- **Die neun Funde waren der Parser, nicht der Befund** — das Gegenstück zum Tipp darüber, und teurer:
  ein frisch geschriebener Selektor-Matcher meldete 9 tote Selektoren in einer 300-Zeilen-CSS, alle neun
  falsch. `selParts` erhöhte die Klammertiefe für `[`, **bevor** es entschied, ob dort eine Trennstelle
  liegt, las `.boot[data-stage='fetch']` also als *einen* Klassennamen, den kein Element trägt. Ein
  Nullbefund lädt zum Nachprüfen ein, eine Fundliste zum Reparieren — deshalb kostet diese Richtung mehr.
  → Einem frisch geschriebenen Parser keine Fundmeldung glauben, bevor er gegen **handgeschriebene Fälle
  mit danebenstehendem Sollwert** grün ist. Sie gehören ins Rig, nicht in den Kopf.
  *16 Matcher-Fälle als Selbsttest, 16/16 grün, danach waren die 9 Toten 0 · 2026-08-02*

- **Das Gift patchte eine andere Quellkopie als die, die die Klausel inzwischen liest** — ein Gift ist nur
  so gut wie die Kopie, in die es schreibt: legt ein Umbau die Klausel auf eine frische Quellvariable, wird
  jedes Gift, das noch die alte patcht, **still wirkungslos**. Es fällt nicht aus, es meldet nichts, und in
  einem einzelnen `--poison=`-Lauf sieht ein blindes Gift genau wie ein bestandenes aus — nur der
  vollständige Durchlauf zählt es. → Nach jedem Umbau, der die Quelle einer Klausel wechselt, **jedes Gift
  dieser Klausel neu zuordnen** (Markup-Gift in die Template-Kopie, Code-Gift in die Code-Kopie) und den
  Sweep über *alle* Gifte fahren. Und vor dem Verschieben prüfen, ob das Gift an der neuen Stelle eine
  **zweite** Klausel trifft: ein Gift, das zwei Klauseln rot macht, kann nicht mehr sagen, welche den
  Defekt sah.
  *`fatstrip` schrieb weiter in `hud` (die Kopie einer anderen Klausel), während seine Klausel seit dem
  Umbau aus `hudSrc` liest — der Sweep stand bei 88/89, jede Einzelmeldung war grün. Auf die Template-Kopie
  verschoben färbte die verbatim zurückgegebene Auszeichnung zusätzlich eine dritte Klausel rot
  (`no font size could be resolved for .hud-strip-wave b`: das zugehörige CSS war mit der Auszeichnung
  verschwunden); ein Attribut weniger im Gift löste es, gemessen statt geraten · 2026-08-02*

- **Ein Referenzwert ohne seinen Strom ist nicht nachfahrbar** — ein Hash über die Ausgabe eines Laufs
  steht in der Übergabe, die nächste Schicht fährt dasselbe Kommando mit `2>&1` und bekommt eine andere
  Zahl. Beide Läufe sind korrekt und deterministisch; verglichen wurden zwei verschiedene Messungen, weil
  eine Warnung auf stderr zum Strom gehört und nicht zum Ergebnis. Die Suche geht danach im Produktivcode
  nach einer Nichtdeterminismus-Quelle, die es nicht gibt. → Einen Sollwert **nie ohne seine
  Erzeugungszeile** notieren: Kommando, Strom (`2>/dev/null` oder `2>&1`), Trunkierung, Werkzeug. Wer nur
  die Zahl notiert, notiert eine Zahl, die niemand nachfahren kann — und ein Sollwert, den niemand
  nachfahren kann, ist kein Tor, sondern eine Behauptung.
  *`--only=core` ergibt `21339511c682` über stdout und `bb9dbb80d963` mit stderr (eine
  THREE-Doppelimport-Warnung); beide sind echt, zwei Schichten haben sich an dem Unterschied verrannt · 2026-08-02*

- **Eine neue Herleitung in der Klausel macht das Prüfrig an zwei Stellen still falsch** — das Rig
  bescheinigte dem reparierten Parser 20 von 21, und sein „grün" bedeutete etwas anderes als das der
  Klausel. Beide Stellen sind dieselbe Nachlässigkeit in zwei Kleidern: das `green` des Rigs ist eine **von
  Hand getippte Konjunktion** der Klauselterme, und jede `soll=grün`-Form bedient nur die Herleitungen, die
  die Klausel **beim Schreiben der Form** las. Kommt ein Term dazu, urteilt das Rig weiter über *n−1* Terme,
  und eine Form, die einen Screen korrekt in Konstruktor und Dispatcher verdrahtet, wird in dem Moment zur
  **Defektform**, in dem die Klausel zusätzlich das Markup liest — sie behauptet dann „korrekter Code bleibt
  grün" über Code, den die Klausel zu Recht rot färbt. → Die Termliste **aus der Klausel schneiden**
  (Bedingung zwischen Titel und Meldungsarray, Bezeichner vor `===`/`!==`/`>` einsammeln) und als Selbsttest
  fordern, dass jeder Term entweder gemessen oder **namentlich als außer Reichweite** geführt wird; ein
  weggelassener Term ist genau der stille Verlust, den das Rig beim Prüfling sucht. Und bei jeder neuen
  Herleitung **jede grüne Form** gegen sie nachziehen, nicht nur eine Testform für den neuen Term bauen.
  *`panelGap` kam als 10. Term dazu, das Rig maß 9: `T2-kebab` stand grün, während die Klausel dieselbe
  Quelle rot färbt (Panel im Konstruktor, nicht im TEMPLATE). Die rote Zeile, die eine ganze Schicht lang
  als Parserfund galt, war ebenso eine unvollständige Form — ein `case` ohne sein Panel. Termliste
  hergeleitet, Formen nachgezogen: 21 → 25 Formen, ALT 9/25 gegen NEU 25/25, und die beiden Richtungen des
  neuen Terms (`ctl-tplonly`, `ctl-declonly`) fuhren unter ALT beide still grün · 2026-08-02*

- **Der Maskierer verlor seinen Platz und zählte zuversichtlich weiter** — sieben intakte Panels wurden als
  „declared and no case reaches them" gemeldet; das liest sich wie sieben Funde und war eine Ursache. Der
  Leser, der Strings und Kommentare ausblendet, verrutscht an zwei Stellen, die beide gewöhnlicher Code sind:
  ein Template im `${}` eines Templates schließt die Maske am **verschachtelten** Backtick, und ein `/` nach
  `)` ist nach `if (x)` ein Regex-Literal, nach `f(x)` eine Division. Ein verrutschter Maskierer fällt nicht
  aus — er schneidet einen anderen Text heraus und beantwortet eine andere Frage im selben sicheren Ton.
  → **Die Klammerbilanz der Maske als eigenen Term in die Klausel legen und zuoberst drucken:** eine ganze
  Datei ist ausgeglichen, also ist alles außer 0 der Leser und nicht das Spiel. Alles, was aus derselben
  Lesung abgeleitet ist, gehört darunter und wird gegattert. `${` und `}` bleiben in der Maske stehen, wenn
  ein Brace-Scan sie zählt.
  *`maskCode(Screens.ts)` stand bei `( -2, { -4`, ab Zeile 378 aus dem Lot, 19 verschachtelte Templates —
  harmlos allein durch die Position des Ankers in Zeile 97. Die drei `)`-Formen ergaben `{ +2`, `[ +1 { +1`,
  `{ +1`. Prüfrig 25/28 → 28/28; das Gift `driftmask` isoliert nur, weil die Verletzung *hinter* dem Schnitt
  liegt — dieselbe über dem `switch` reißt eine zweite Klausel mit und beweist keine von beiden · 2026-08-02*

- **Das Prüfwerkzeug trug seine eigene Kopie des Lesers — und normalisierte, bevor es las** — ein Audit über
  69 Klauseln meldete acht unbenannte Terme und zwei **vorhandene** Meldungszweige als fehlend; sechs der
  zehn Funde gab es nicht. Zwei Ursachen, dieselbe Nachlässigkeit in zwei Kleidern: es führte eine ältere
  Kopie des Maskierers und urteilte über verschobene Bytes, und es zog den Zweigtext mit `\s+` zusammen,
  wodurch ein `//`-Kommentar über einem Zweig den Zweig selbst verschluckte. → **Den Parser verbatim aus dem
  Prüfling schneiden** (`new Function(src.slice(a, b))`) statt ihn nachzubauen; eine geschnittene Maske kann
  nicht hinter den Prüfling zurückfallen. Bezeichner **aus der Maske** lesen, wo Kommentare schon leer sind
  und die Offsets noch stimmen — wer vorher `\s+` zusammenzieht, macht aus zwei Zeilen eine Kommentarzeile.
  *Tier-1b 8 → 3 allein durch die geschnittene Maske, erkannte Array-Meldungen 11 → 28 von 69; Tier 1a fiel
  von „1 Klausel, 2 Terme" auf 0, nachdem Zweigspannen statt Zweigtext gelesen wurden. Die drei übrig
  gebliebenen Funde waren echt, einer druckte unter FAIL den bejahenden Satz · 2026-08-02*
