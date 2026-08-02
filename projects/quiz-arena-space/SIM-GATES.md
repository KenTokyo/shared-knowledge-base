# Klauseln und Gifte im Gameplay-Arm — quiz-arena-space

**Lesen wenn:** du in `tools/sim.mjs` eine Klausel, ein `--poison=`, einen `--only=`-Arm oder eine Schwelle anfasst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Die Notiz- und Zitat-Bench hat ihre eigene Datei: [`SELFTEST-NOTES.md`](SELFTEST-NOTES.md). Wie ein
Messszenario das Spiel verfehlt, steht in [`MEASURING-RIGS.md`](MEASURING-RIGS.md).

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

- **Das Messinstrument besteht seine eigene Rot-Treibung nicht** — zwei Verfahren für Per-Frame-Allokation
  trennten synthetisch sauber und sahen die absichtlich eingebaute Regression trotzdem nicht. → Instrument
  erst gegen eine eingebaute Regression rot fahren; besteht es nicht, **zählen statt messen**.
  *`process.memoryUsage()` meldete 208 B/Frame und für eine Obermenge *weniger* Verbrauch als für ihre
  Teilmenge; der Minor-GC-Zähler trennte 0/3/8 GCs bei 0/1/5 Objekten über 2 Mio. Iterationen, maß für
  einen pro Frame erzeugten `THREE.Vector3` aber 1 GC gegen 2 über 2 Mio. Frames (V8 scalar replacement) · 2026-08-02*

- **Eine Konjunktion ohne eigenen Fehlerzweig druckt beim Fehlschlag den grünen Satz** — die
  Populationswächter (`combos === 27`, `waves === 2640`, `orders.length >= 5`, `checked >= 36`) hängen per
  `&&` in der Bedingung, aber die Ternär-Kette der Meldung hat für sie keinen Fall: fällt genau dieser
  Term, steht unter `FAIL` der bejahende Text, und die Erwartung, die verletzt wurde, steht nirgends. → Für
  **jeden** Term der Bedingung einen Zweig in der Meldung, oder den Term aus der Bedingung nehmen. Der
  Zähler und sein Nenner müssen dabei dieselbe Einheit haben.
  *Audit über alle sieben Klauseln des Gegner-Arms: 7 von 7 haben mindestens einen solchen Term. Gemessen
  am roten `onefleet`-Lauf: „5039 of 2640 waves" — `locked` zählt Schiffe, `waves` zählt Wellen-Draws · 2026-08-02*

- **„Keine Funde" war der Parser, nicht der Befund** — ein Karten-Audit meldete Entwarnung, weil sein
  Brace-Parser jede ausdruckskörperige Pfeilfunktion still übersprang. → Vor dem Glauben an ein
  Null-Ergebnis die **Eingangsmenge** des Werkzeugs ausdrucken lassen; „Karten ohne Body: keine" muss
  selbst eine geprüfte Zeile sein.
  *„targets with no reader: none" bei 24 von 41 stillschweigend fallengelassenen Karten
  (`apply: (s) => (…)` ohne Klammer) · 2026-08-01*

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
