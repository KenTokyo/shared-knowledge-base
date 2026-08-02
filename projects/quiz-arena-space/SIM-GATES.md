# Klauseln und Gifte im Gameplay-Arm — quiz-arena-space

**Lesen wenn:** du in `tools/sim.mjs` eine Klausel, ein `--poison=`, einen `--only=`-Arm oder eine Schwelle anfasst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Die Notiz- und Zitat-Bench hat ihre eigene Datei: [`SELFTEST-NOTES.md`](SELFTEST-NOTES.md). Warum die Zahl,
die bei einer Klausel ankommt, nicht die war, die im Spiel entstand — Stubs, Wrapper, Antriebe, Parser —
steht in [`MEASURING-RIGS.md`](MEASURING-RIGS.md).

- **Die Klausel steht dort, wo die Zahl entsteht, statt dort, wo sie ankommt** — `--only=core` rief
  `rec.onHit(...)` direkt auf und ging deshalb nie durch `Weapon._updateBeam`; ein Schadensdefekt genau
  dazwischen war für den Arm strukturell unsichtbar, nicht bloß unentdeckt. → Die Klausel auf den
  **Konsumentenpfad** legen, den das Spiel wirklich nimmt, nicht auf den Erzeugerpfad, der sich leichter
  aufrufen lässt. Ein Arm, der eine Callback-Signatur testet, testet eine Signatur.
  *Gift `beamblind` misst 1,00x gegen 6,00x — 83 % des Schadensbaus (`stats.damageMul` + Crit-Wurf) kamen
  am Kern nie an · 2026-08-02*

- **Ungleichung plus „gab es überhaupt etwas zu messen"-Wächter feuert auf die Vorbedingung** — der
  Wächter ist die schwächere Aussage und stirbt zuerst; ein Gift kann ihn reißen, während der Satz der
  Klausel wahr bleibt, und dann zeigt das Rot auf die falsche Stelle. → Wo es geht, **zwei unabhängig
  hergeleitete Zahlen gleichsetzen** statt eine gegen eine Schwelle zu prüfen. Eine Gleichung braucht
  keinen Vakuum-Wächter, weil sie im Vakuum nicht erfüllbar ist.
  *`flatfleet` riss die Radius-Klausel als Kollateral mit, obwohl deren Satz galt; `spined` wächst in **y**,
  wohin ein planarer Radius zu Recht nicht folgt, ein ehrlicher Retune ohne seitlichen Splay wäre rot
  gefahren. Als `radiusRatio === max(1, planarReachRatio)` exakt auf allen 18 Refits · 2026-08-02*

- **Ein Gift kollabiert die Partition, gegen die der Deckel gemessen wird** — `mixpool` legt die
  Pool-Schlüssel auf den Typ zusammen; eine Klausel, die „bei N bindet der Deckel" über *Schlüssel*
  rechnet, ändert damit unter dem Gift ihre eigene Arithmetik und fällt aus dem falschen Grund. → Den
  Antrieb so dimensionieren, dass **beide** Partitionierungen dasselbe N erreichen — dann ist die
  Rechnung identisch und nur der benannte Defekt ist der Unterschied.
  *6 Typen × 41 Rümpfe landen unter beiden Schlüsselformen auf exakt 180 idle bei `POOL_TOTAL=180`,
  `PER_KEY=40`, `LIVE_CAP=90`; `tools/sim.mjs:4180-4270` · 2026-08-02*

- **Ein einzelner Lauf geht bei getakteten Größen grün durch** — zwei Uhren waren phasenverriegelt und der
  Lauf traf zufällig die günstige Phase; der Defekt war vollständig vorhanden. → Misst eine Klausel gegen
  etwas Getaktetes, die **Phase sweepen** statt eine zu ziehen, und die Trefferfolge in die Meldung drucken.
  *`FX_INTERVAL 0,07` gegen `1/60` ergibt einen 5-Frame-Zyklus, der Alarm läuft alle 60 Frames, `60 % 5 = 0`;
  die Klausel fährt jetzt 8 Feuerphasen, `--poison=corealarm` meldet `30000300` · 2026-08-02*

- **Eine Erwartung, die wie ein Präfix aussieht, ist keins, sobald ein Konsument von hinten indexiert** —
  die Strain-Zuweisung wurde als „die Welle führt die ersten *n* Einträge der Sektorflotte" modelliert;
  Elites nehmen `fleet[depth-1]`, also kann eine kurze Queue legitim eine Nicht-Präfix-Menge fielden. → Die
  Erwartung über **Teilmenge und Vereinigung** formulieren, nicht über Reihenfolge, und vor dem Formulieren
  einmal *jeden* Leser der Liste suchen.
  *2 bis 45 Präfix-Verfehlungen je 300 Zügen pro Zelle; die Klausel urteilt jetzt über 2640 Wellen
  (5 Sektoren × 11 Wellen × 2 Protokolle × 24 Züge) und ist über 20 Wiederholungen 0× rot gelaufen · 2026-08-02*

- **Ein Gift, das beide Tore rot macht, beweist nur die Tore** — eine Klausel mit zwei rot getriebenen
  Giften las ihre Eingangstabelle systematisch falsch; ein Gift übt seinen eigenen Pfad, nicht die
  Eingabemenge. → Neue Klauseln zusätzlich **adversarial gegen die vollständige Eingabe** lesen lassen,
  nicht nur rot treiben.
  *Die Tabelle lief bis Dateiende statt bis `\n];` → 14.064 Bytes Fremdcode wurden als Treibungen lesbar,
  der letzte Eintragskörper maß 14.497 statt 672 Bytes; ein nachgestelltes Komma machte 2 lebende Patches
  unsichtbar; `1.5` matchte `1x5`; `\n` wurde bei 12 Paaren als Buchstabe gelesen · 2026-08-01*

- **Eine Konjunktion ohne eigenen Fehlerzweig druckt beim Fehlschlag den grünen Satz** — die
  Populationswächter (`combos === 27`, `waves === 2640`, `orders.length >= 5`, `checked >= 36`) hängen per
  `&&` in der Bedingung, aber die Ternär-Kette der Meldung hat für sie keinen Fall: fällt genau dieser
  Term, steht unter `FAIL` der bejahende Text, und die Erwartung, die verletzt wurde, steht nirgends. → Für
  **jeden** Term der Bedingung einen Zweig in der Meldung, oder den Term aus der Bedingung nehmen. Der
  Zähler und sein Nenner müssen dabei dieselbe Einheit haben.
  *Audit über alle sieben Klauseln des Gegner-Arms: 7 von 7 haben mindestens einen solchen Term. Gemessen
  am roten `onefleet`-Lauf: „5039 of 2640 waves" — `locked` zählt Schiffe, `waves` zählt Wellen-Draws · 2026-08-02*

- **Zwei Klauseln teilen eine Formel, die nur an einer Stelle nachgezogen wird** — eine Klausel, die eine
  Konstante oder Kurve aus `src/` **kopiert**, misst nach dem nächsten Retune die Kopie gegen sich selbst.
  → Die Zahl aus der Quelle **lesen** (`readFileSync` + Regex auf die Deklaration) und den Parse-Fehlschlag
  in den Rot-Zweig fallen lassen — `NaN` in jeder Vergleichsrichtung ist genau richtig.
  *`POOL_TOTAL`/`PER_KEY`/`LIVE_CAP` werden aus `src/systems/WaveDirector.ts` gelesen; die
  Sektor-Flottenlisten kommen per Regex aus `src/world/Sectors.ts`, nicht aus einer zweiten Liste · 2026-08-02*

- **Eine Schwelle, die auf dem Ist-Wert sitzt, hat nie gebunden** — ein Grenzwert exakt am gemessenen
  Shipping-Wert geht beim ersten ehrlichen Retune rot und wird dann *nachgezogen*, womit er endgültig
  nichts mehr behauptet. → Entweder mit **Abstand** zum Ist-Wert setzen und den Abstand in den Kommentar
  schreiben — oder **beide Seiten aus der Quelle parsen**, dann retunt die Schwelle sich selbst mit. Was
  nicht geht: eine handgeschriebene Policy-Zahl auf der Gleichheit.
  *Mit Luft: `SEP = 0.12` gegen einen gemessenen Worst Case von 21,7 % — Faktor 1,8, und das Gift erzeugt
  0 %. Selbst-retunend: `held === POOL_TOTAL` (180 === 180), beide Seiten aus `WaveDirector.ts`.
  Ohne beides: `POOL_TOTAL <= LIVE_CAP * 2` (180 <= 180) — eine Erhöhung auf 181 fährt rot, und der Term
  hat keinen Fehlerzweig · 2026-08-02*

- **Der Gipfel war eine Ablesung des Deckels, nicht der Last** — eine Klausel urteilte über den
  Belegungsgipfel (`hi >= cap`) einer Ressource, deren Gipfel die geprüfte Regel **selbst setzt**; sie konnte
  nicht rot werden, was auch immer verlorenging, und die harmloseste Zahl war der größte Verlust. → Vor dem
  Formulieren prüfen, ob die Größe, gegen die geurteilt wird, von der Regel unter Test erzeugt wird. Wenn ja:
  **Entscheidungen zählen, wo sie fallen**, statt Zustände abzulesen — eine Verweigerung hinterlässt in einer
  Belegung keine Spur, und ein Deckel, der bindet, sieht dort aus wie Kopffreiheit.
  *`rings` stand bei 158 von 176 = `floor(cap·0,9)`, `debris` bei 233 gegen eine Decke von 234 und galt drei
  Phasen lang als „eine darunter, nicht gebunden". Gezählt statt abgelesen: je Wipe 178 Ringe, 86 Blüten und
  2274 Brocken verworfen, während 18, 20 und 27 Records frei standen; `tools/sim.mjs`, Gift `fixedceil` · 2026-08-02*

- **Ein Verlust, der Auslegung ist, und einer, der Defekt ist, landen in einem Zähler** — zählt die Klausel
  jede Verwerfung, ist sie dauerhaft rot über eine bewusste Designentscheidung und wird dann so lange
  nachgezogen, bis sie nichts mehr behauptet. → Nach **Ursache** trennen und nur eine Hälfte urteilen lassen:
  `min(want, frei) − gewährt` ist der Defekt, `want − min(want, frei)` ist die Auslegung. Die zweite Hälfte
  wird **gedruckt**, nicht verschwiegen — sonst liest sich „nichts wurde defekt verworfen" als „nichts wurde
  verworfen".
  *Die Klausel urteilt über 0 und druckt 4494 von 5494 gefragten Brocken als Auslegungsverlust; ohne die
  Trennung wäre sie über eine 260-Records-Grenze rot, die das Spiel absichtlich hat · 2026-08-02*

- **Eine handgeschriebene Liste im Prüfterm ist blind gegen alles, was nicht darauf steht — und zwar
  still** — der fehlende Fall fällt nicht rot aus, er fällt aus der **Menge**, und die grüne Meldung zählt
  danach die Restmenge und nennt sie vollständig. Drei Formen desselben Fehlers: eine Selektor-Alternation
  ohne `b`, eine Screen-Liste ohne die zwei Screens, die niemand erwähnt hatte, ein Term, der Klassennamen
  und Custom Properties abglich und damit strukturell jeden Tag-Selektor, jedes `*` und jede Vererbung
  übersah — alles, was auf ein Element wirkt, **ohne es zu nennen**; das ist nicht selten, das ist die
  Reset-Schicht. → **Die Menge aus der einen Stelle herleiten, die sie entscheidet**, statt sie zu tippen:
  `onStateChanged` für die Screens, die `const`-Bindungen der Methode für die Empfänger, die Ahnenkette für
  CSS. Speziell bei Stylesheets ist die Einheit ein **(Element, Property)-Paar**, nicht ein Selektor:
  erster Vorfahr-oder-selbst mit einer Meinung gewinnt, dann ist „erreicht dieses Stylesheet jenes Element"
  eine Rechnung statt einer Namensgleichheit. Und der Wächter darüber ist eine **Gleichung** (jeder
  hergeleitete Fall gefahren **oder namentlich entschuldigt**), keine Schwelle — eine Schwelle bemerkt eine
  fehlende Hälfte nie.
  *3 von 307 Selektoren aus `styles.css`+`screens.css` erreichen das Boot-Overlay (`*`, `html`, `body`)
  und brachten `box-sizing`, `-webkit-font-smoothing` und `user-select` mit, die `boot.css` nicht
  deklarierte: 30 (Element, Property)-Paare wechselten am Bundle-Handover das Antialiasing, der Ring um
  die Marke sprang 86px→84px. `boot.css` begründete genau diese Doktrin im eigenen Kommentar seit jeher
  für `background` — und wandte sie auf eins von vier Feldern an. Hergeleitet statt getippt: 12 → 14
  gemessene Anzeigen (`b` fehlte in der Alternation, also hatte `this.bossName` drei Schreiber und null
  Anzeigen, während „no reading drawn twice" grün stand) und 41 → 48 Controls aus 7 Buttons in zwei
  Screens, die in `sim.mjs` nirgends vorkamen — der alte Wächter `tiles > 20` konnte 4 Screens nicht von
  7 unterscheiden, weil die Armory allein 32 bringt · 2026-08-02*
