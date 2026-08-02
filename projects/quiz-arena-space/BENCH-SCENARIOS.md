# Messszenarien und ihr Urteil — quiz-arena-space

**Lesen wenn:** du ein Szenario in `tools/shoot.mjs` / `src/core/Diagnostics.ts` baust oder änderst, eine `PROBLEM:`-Zeile formulierst oder ein grünes Bench-Ergebnis als Beleg verwenden willst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Hier steht, warum ein Szenario etwas anderes misst als das Spiel. Was die Zahl danach behaupten darf, steht
in [`TIMING-GATES.md`](TIMING-GATES.md) und global in [`../../threejs/MEASURING.md`](../../threejs/MEASURING.md).

- **Bench meldet „bestanden", ohne eine einzige Zeile erhoben zu haben** — jede `bad`-Liste ist ein Filter
  über einer Datenliste, und eine leere Liste besteht **jeden** Grenzwert. Das Rig startete den Run erst im
  Hook, `debugSim` läuft aber nur bei `state === 'playing'`. → Die **Zählprüfung als erste Zeile** jedes
  Report-Blocks (`CHECKS:n/m`), nicht als Fußnote unter dem Urteil.
  *`?scenario=movement` gab `movement-heavy-and-responsive` aus bei 0 von 3 Schiffszeilen und `state=title`;
  derselbe Fehler wurde zwei Schichten später sofort als `CHECKS:0/14` gefangen · 2026-07-28*

- **Grüne Suite, die rote Verdikte druckt und wegwirft** — der Suite-Runner zählte nur die Konsolenströme
  (`fatal`, `errs`, `probs`), das bench-eigene `PROBLEM:` reist aber in `result.parts` und wurde gedruckt
  und verworfen. → Verdikte über `result.parts` filtern und in `failed` zählen; nie über die
  zusammengefügte `summary`.
  *Ein Lauf mit `PROBLEM: HIDDEN:t42.8(33%)` endete mit `all clean` und Exit 0 — jede grüne Suite des
  Projekts bis dahin war grün, weil jemand 16 Zeilen mit dem Auge gelesen hatte; `tools/shoot.mjs:374` · 2026-07-30*

- **Benches mit eigenem Verdikt, die kein einziges Mal gelaufen sind** — in Codeform beantwortet: `--all`
  und `--list` fahren `Object.keys(SCENARIOS)` (`tools/shoot.mjs:361`/`:380`), eine zweite Namensliste
  neben der Tabelle gibt es nicht mehr.

- **Ein Szenario-Stub, der die geprüfte Eigenschaft selbst abschaltet, fotografiert einen Zustand, den das
  Spiel nie hat** — `?cwtower=1` setzte `_puzzleFocus` auf leer, damit die Kamera beim Zielen nicht zur
  Brettmitte zieht; also lief jeder Kadrierungsbeleg ohne den ausgelieferten Kamerazug, und genau der war
  der Defekt. Den Stub bedingt zu machen reicht nicht von selbst: `diagScale` unterscheidet „Schalter auf
  seinem Default übergeben" nicht von „Schalter fehlt", beide liefern dieselbe Zahl. → Stub an einen
  **explizit übergebenen** Schalter binden (`diagHas`) und vor jeder Kadrierungsaussage aufzählen, welche
  Shipping-Pfade das Szenario stummschaltet.
  *Erster Lauf mit lebendem Zug, nach zwei Schichten „belegter" Kadrierung: Schiff komplett außerhalb des
  Bildes, gelockte Plate in der Ecke angeschnitten. Nach dem Fix Zielplate 35°→12° von der Linsenachse,
  `cam=(18,49,6)`→`(51,47,-14)` · 2026-08-03*

- **Szenarien messen still die falsche Arena** — `save.data.lastSector` liegt im localStorage und überlebt
  den Seitenwechsel, also erben in einem `--all`-Lauf alle Szenarien nach `sectors` deren Sektor;
  zusätzlich erreichte `?sector=` `startRun` gar nicht. → Sektor im Szenario **pinnen** und `sector=` im
  Klartext in jeden Report drucken, damit die Abhängigkeit im Diff steht.
  *`perf` las dadurch `draws=397` statt `355`; die ersten 17 von 27 Szenarien liefen Crucible, `sectors`
  hinterließ Ashfall, die 9 danach erbten es; 16 Matrixzellen forderten voidscar und liefen crucible · 2026-07-30*

- **Vier Urteile in Folge maßen das Test-Rig statt des Spiels** — der Treiber feuerte alle N Treffer in
  *einem* Frame, und die Effektfunktion beginnt mit einem 0,05-s-Wiederholungsschutz: ein Funkenstoß, N−1
  stumme Abzüge. Dazu die Turm-Mittelachse als Trefferpunkt, was den Richtungsterm auf (0,1,0) kollabieren
  ließ. → Bevor „der Effekt ist schwach" geschrieben wird, **beweisen, dass das Instrument den Effekt
  überhaupt durchlässt** — Shipping-Takt gegen Wiederholungsschutz rechnen.
  *4 Durchgänge übereinstimmend falsch; Shipping-Intervall 0,24 s gegen das 0,05-s-Fenster = 4,8×;
  Trefferfläche nach dem Rig-Fix 128×193 → 185×242 px · 2026-07-31*

- **Die Wirkung einer Karte wird sechsfach gemessen, weil der Zielsack nicht festgenagelt ist** — der Boss
  hat drei Schadensregime (Schwachpunkt ×2,2, Modul ×1,0, Rumpf ×0,75 = 2,93× Spanne **ohne jede Karte**),
  und beide Umschalter fallen mitten im Lauf. → Vor der Kartenmessung den Zielzustand einfrieren: Kern
  geschlossen, Phasenwechsel neutralisiert, Rumpf und alle Teil-Hüllen jeden Frame auffüllen, Crit auf 0.
  *`coils ×3` meldete +305 %, erwartet war 1,18³ = +64 %; festgenagelt +55 %. Erst ein 5,0-s- statt
  2,6-s-Fenster löste zusätzlich die Ratenkarten auf (+cycler von +3 % auf +16 %) · 2026-07-28*

- **„Waffe macht null Schaden" war die Geometrie des Szenarios** — der Spieler wurde blind auf
  `boss.position + offset` geparkt, der Boss wanderte über die Messzeit, und jede Waffenfamilie wurde damit
  unter anderer Geometrie gemessen; bei einer Distanz stand er auf einem Blocker. → Vorab eine per
  Blocker-Abfrage **verifizierte, breitestmögliche Bahn** suchen und Spieler *und* Ziel jeden Frame darauf
  pinnen.
  *`missile:NO-DAMAGE` → `died[hit6]`/78 dmg; kinetic fiel von 20 Blocker-Toten bei 32 Schüssen auf 0 · 2026-07-28*

- **Drei byte-identische Läufe, alle drei wertlos** — Reproduzierbarkeit ist kein Gültigkeitsbeleg. Die
  Karten des Setups zählten die Welle hoch, die elfte spawnte den Boss, und danach setzte der Wellenstart
  den Zähler zurück — der Bench las die bequeme Zahl und sah den Boss nicht. → Den Wächter auf die
  **Prämisse** legen (`BOSS-PRESENT`), nicht auf die auslesbare Zahl.
  *Drei Läufe byte-identisch (md5 `34ad84fa…`) und alle kontaminiert; `boss=3200/3200` schon bei `capture=6` · 2026-07-28*

- **Grünes Urteil mit Exit 0 über eine Stichprobe, die die Bench nicht lesen konnte** — der Sortierer gab
  bei einem ungeparsten Lauf `NaN` zurück, und ein Komparator, der `NaN` liefert, wird als „gleich, lass
  liegen" gelesen; der Defekt war damit **positionsabhängig** unsichtbar. → `NaN` zuerst sortieren und
  einen reihenfolge-unabhängigen „nicht lesbar"-Zähler vor jeden Grenzwert setzen.
  *5 gesunde + 1 unlesbarer Lauf, den unlesbaren zuletzt → grünes Verdikt, Exit 0, Laufzahl weiterhin 6;
  derselbe Defekt mit dem kaputten Lauf zuerst wurde korrekt gefangen · 2026-08-01*

- **Eine Sonde ohne Kontrollsonde misst „nichts drückt zurück" und „die Sonde ist kaputt" gleich** — der
  19,5u-Kern stand in jedem Run kollisionslos in der Arenamitte, weil der Konstruktor nach dem Einfügen die
  Hindernisliste leerte; im selben Muster war ein HUD-Check arithmetisch auf exakt 0 genagelt, weil sein
  Verbraucher entfernt worden war und der Tank beim Armieren auf Maximum springt. Beide Male sieht die 0 wie
  ein Befund aus. → Die erwartete Zahl **vor** dem Lauf aussprechen, von den **echten** Verbrauchern treiben,
  und jede Sonde bekommt eine Kontrollsonde an einem Objekt, das garantiert antwortet.
  *Vorhergesagt 10/19/15/21, gemessen 9/18/14/20 — genau eins fehlend in allen vier Sektoren; Sonde am Kern
  `0.00push` gegen Kontrollsonde am Monolithen `9.30`. Beim HUD-Check Vorhersage 57 von 110 = 0,518 vor dem
  Lauf notiert, gemessen `peak=0.52`; in jener Phase waren fünf von sechs Fehlschlägen Harness-Fehler ·
  2026-07-29, 2026-07-30*

- **Zwei Läufe von `readable` widersprechen vier Läufen desselben Bundles mit p = 0,025** — auf byte-gleichem
  Code reicht die Spanne eines Einzellaufs von 0,00 % bis 11,11 % lost; welche Läufe man zieht, entscheidet
  das Ergebnis, nicht die Änderung. Ein Zwei-Lauf-Spotcheck kann deshalb nichts überführen. Dazu zählt ein
  Pool-Parser, der das ganze Report-JSON scannt, jede Sonde dreifach (`result.summary`, `.info`, `.parts`) —
  die *Rate* überlebt das, `n` verdreifacht sich, und jedes z wird um √3 = 1,73 zu groß. → Vier Läufe je Arm
  **und** ein Gegenlauf, der die eigene Änderung isoliert; den z-Test allein auf `result.summary` rechnen.
  *Bundle `index-BsDNItSo.js`, identischer Code: 2 Läufe 18/241 = 7,47 % gegen 4 Läufe 17/469 = 3,62 %,
  z = 2,24 — ein Falsch-Positiv gegen sich selbst, das eine Übergabe lang als offener Befund galt. Der
  isolierende Gegenlauf (Arena vor/nach) gab 3,62 % gegen 2,80 %, z = 0,72, p = 0,47 · 2026-08-03*

- **`npx tsc --noEmit` grün, Methode auf dem falschen Objekt gerufen** — beide Felder sind
  `declare …: any`, durch die kann der Typecheck nicht hindurchsehen; der geerbte, angeblich fertige Fix
  war die ganze Zeit tot. → Bei jedem neuen `this.x.y()` auf `Game`/`CameraRig` gilt nur ein **gefahrener
  Lauf** als Beleg, nicht `tsc`.
  *Die Bench fing es als `THROW TypeError` mit gar keinem Report; derselbe grüne Typecheck ließ eine Schicht
  später einen Treiber durch, der `moved=0` maß · 2026-07-30*
