# Test- und Mutations-Gates — claude-flakes

**Lesen wenn:** du `progression-test.mjs`, `mutation-test.mjs`, eine Assertion, Diagnosezeile, Probe oder Fresh-Clone-Stufe änderst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Grün gilt als Beweis, obwohl die Assertion nie rot werden kann** — sieben Progression-Checks überlebten passende Defekte; `buy()` durfte sogar die ganze Börse nullen. → Für jede wichtige Klausel einen benannten Mutanten zuerst rot sehen und Coverage nur als „schon einmal gescheitert“ beschreiben.
  *`buy-zeroes-the-purse` tötete 0/119; nach Wechselgeld-Check wurden schließlich 124/124 Checks unter Mutation rot beobachtet · 2026-08-01*

- **Rote Detailzeile druckt die grüne Schlussfolgerung** — `ward maxed → bulwark open` erschien auch, wenn Bulwark zu blieb; andere Details nannten Konstanten statt Runwerte. → Detail ausschließlich aus dem fehlgeschlagenen Lauf bauen und unter dem tötenden Mutanten vergleichen.
  *31 defekte Details im ersten Audit; später 14.780 Verdict-Zeilen über 120 Läufe mechanisch gelesen · 2026-08-01*

- **Detail-Template wirft, statt den Check rot zu melden** — fehlende Buyout-Zeile, umbenannte Income-Karte oder leere Liste verursachten `TypeError` und verloren bereits gedruckte Ergebnisse. → Alle Detailpfade total machen und `threw` universell für jeden Mutanten prüfen, nicht nur opt-in.
  *Ein unmarkierter Crash wurde zuvor als „killed 4 checks“, PASS und Exit 0 gewertet · 2026-08-01*

- **Fresh Clone besteht, weil 38 loggestützte Checks verschwinden** — fehlende gitignored Kurvenlogs ergaben zunächst PASS, später fehlte sogar `review/` und der Mutations-Gate crashte in Zeile 3. → Voll/partial/absent explizit unterscheiden; benötigte Artefakte vor dem Scratch-Tree inventarisieren und fehlende Abdeckung benannt rot machen.
  *Ohne Logs 86 statt 124 Checks; nach Härtung FAIL 92/134 ohne Stacktrace statt ENOENT · 2026-08-01*

- **Zwei Mutationen zählen als zwei Experimente** — gleiche `find/replace`-Ausgabe oder zwei getrennte Closures mit denselben `editCell`-Argumenten liefen doppelt. → Eindeutigkeit auf Zielpfad plus **erzeugtem Dateiinhalt** prüfen, nicht auf Name, Closure-Identität oder Quellstring.
  *Vier Klon-Paare über mehrere Audits gefunden; zwei Closures waren textuell und objektseitig verschieden, Ergebnis identisch · 2026-08-01*

- **`kills:` ist erfüllt, obwohl ein Präfix zwei Checks trifft** — Substring-Matching lässt den zufällig roten Nachbarn als erwarteten Kill gelten. → Jeder Erwartungseintrag muss genau einen aktuellen Checknamen treffen; Präfixtreffer und Orphans separat melden.
  *108 Einträge gegen 121 Namen: 0 mehrdeutig, aber 7 nur Präfix; Kontrollpräfix traf zwei Namen und machte die Stufe rot · 2026-08-01*

- **Leerer Sweep meldet „0 Probleme“** — Regex, Coverage oder Probe kann aufgehört haben zu lesen und trotzdem grün sein; zwei leere Namenslisten waren sogar „identisch“. → Mindestpopulation, Nenner, erwartete Zeilen und eine absichtliche Vergiftung neben jedes Meta-Gate setzen.
  *Mirror druckte „same 0 checks“; Floor- und Kontrollstufen fingen danach 10/10 bzw. 16/16 Mutanten · 2026-08-01*

- **Distinct Readings gelten als distinct Klauseln** — interpolierte Messwerte geben derselben Row mehrere Strings; mehr Mutanten als Rows teilen zwangsläufig Erstlesungen. → Row-Identität und Reading-Text getrennt messen, nie erstgelesene Rows ausweisen.
  *Truncation-Preflight meldete zunächst 14 verschiedene Strings, obwohl mehrere Mutanten dieselbe „seven items truncated“ Row trafen · 2026-08-01*

- **Execution-Coverage markiert tote Funktionen als betreten** — Modul-Range erwärmte Einrückung/Zeilenumbruch um jede Deklaration; Getter fehlten ganz in der Regionmap. → Nur Funktionskörper zählen, Accessor-/berechnete Member kreuzprüfen und Instrumentausgabe statt Input guardieren.
  *Falsch 52/52 und 0 kalt trotz kaltem `Progression.catalogue`; korrigiert 45/45 Regionen, 284/285 Körperzeilen · 2026-08-01*

- **Reine Einfügung wird auf eine Nachbarzeile gelegt** — Placement-Control widersprach im grünen Lauf seiner eigenen 37/52-Reach-Zahl. → Insertion als Naht zwischen Zeilen modellieren; Anfang, Ende und EOF separat perturbieren.
  *`a-short-pool-lays-no-table`: Diff 735 gegen Find 736–736; Gate druckte den Widerspruch und blieb Exit 0 · 2026-08-01*

- **Quellsweep findet seine Dokumentation als Code** — `.slice(0,N)` in JSDoc oder Kontroll-Fixtures machte die neue Truncation-Stufe gegen sich selbst rot. → Kommentare zeilentreu blanken, String-Literale getrennt behandeln und Fixtures so bauen, dass das Suchmuster nicht wörtlich im Prüfer steht.
  *Rohscan hätte 2 JSDoc-Funde; nach Einbau fand die Stufe zuerst zwei frisch geschriebene eigene Fixtures · 2026-08-01*

- **Meta-Gate prüft andere, nicht seine eigenen Verdicts** — Gruppenaufschlüsselung, Bare-Details, Stagezahl und Selbstversatz drifteten, obwohl alle Mutationen grün waren. → Jede neue Stufe bekommt eine darunterliegende Kontrolle; eigene Verdict-Zeilen zählen, lesen und mit `STAGE_GROUPS` rückkoppeln.
  *Gruppen-Defekt blieb bei gleicher Summe unsichtbar; nach Kontrolle 16/16 distinkte Diagnosen, Selbst-Gate zuletzt 141/141 · 2026-08-01*
