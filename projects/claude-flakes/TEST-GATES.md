# Test- und Mutations-Gates — claude-flakes

**Lesen wenn:** `progression-test.mjs`, `mutation-test.mjs`, Assertion, Mutant, Diagnose oder Fresh Clone.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)
**Stil:** Nur kompakte Markdown-Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.

- **Grün, obwohl Assertion nie rot** — 7 Checks überleben passende Defekte; `buy()` darf Börse nullen. → Je wichtige Klausel benannten Mutanten rot sehen; Coverage = „schon gescheitert“.
  *`buy-zeroes-the-purse` tötete 0/119; nach Wechselgeld-Check 124/124 rot beobachtet · 2026-08-01*

- **Rotes Detail druckt grüne Folgerung** — Details nennen Erfolg oder Konstanten statt Runwerte. → Detail nur aus fehlgeschlagenem Lauf; unter tötendem Mutanten vergleichen.
  *31 falsche Details; später 14.780 Verdicts/120 Läufe mechanisch gelesen · 2026-08-01*

- **Detail-Template wirft** — fehlende Zeile/Karte/Liste erzeugt `TypeError`, verliert Ergebnisse. → Detailpfade total; `threw` für jeden Mutanten.
  *Crash galt als „killed 4“, PASS, Exit 0 · 2026-08-01*

- **Fresh Clone besteht durch verschwundene Checks** — fehlende gitignored Logs: 38 Checks weg; fehlendes `review/` crasht Gate. → Voll/partial/absent trennen; Artefakte inventarisieren; fehlende Coverage benannt rot.
  *Ohne Logs 86 statt 124; gehärtet FAIL 92/134 ohne Stacktrace statt ENOENT · 2026-08-01*

- **Zwei Mutationen, ein Experiment** — verschiedene Namen/Closures erzeugen gleiche Datei. → Eindeutigkeit auf Zielpfad plus erzeugtem Inhalt.
  *3 Klonpaare; Closures verschieden, Ergebnis identisch · 2026-08-01*

- **`kills:`-Präfix trifft zwei Checks** — Substring lässt Nachbarn als Kill gelten. → Jeder Eintrag trifft exakt einen aktuellen Namen; Präfix/Orphans separat.
  *108 Einträge/121 Namen: 7 nur Präfix; Kontrollpräfix traf 2 · 2026-08-01*

- **Leerer Sweep meldet 0 Probleme** — Regex/Coverage/Probe liest nichts, bleibt grün. → Mindestpopulation, Nenner, erwartete Zeilen, Vergiftung je Meta-Gate.
  *Mirror „same 0 checks“; Floors fingen danach 10/10 bzw. 16/16 · 2026-08-01*

- **Distinct Readings als distinct Klauseln** — interpolierte Werte erzeugen mehrere Strings je Row. → Row-ID und Reading trennen; nie erstgelesene Rows behaupten.
  *Preflight 14 Strings, mehrere Mutanten trafen gleiche „seven items truncated“-Row · 2026-08-01*

- **Execution-Coverage markiert tote Funktionen** — Modulrange zählt Formatierung um Deklaration; Getter fehlen. → Nur Funktionskörper; Accessor/computed Member kreuzen; Output statt Input guardieren.
  *Falsch 52/52 und 0 kalt; korrigiert 45/45 Regionen, 284/285 Körperzeilen · 2026-08-01*

- **Einfügung landet auf Nachbarzeile** — Placement-Control widerspricht eigener Reach-Zahl. → Insertion als Naht; Anfang/Ende/EOF separat perturbieren.
  *Diff 735 vs. Find 736–736; Gate druckte Widerspruch bei Exit 0 · 2026-08-01*

- **Quellsweep findet Doku als Code** — Suchmuster in JSDoc/Fixtures macht Gate selbst rot. → Kommentare zeilentreu blanken; Strings getrennt; Fixtures ohne wörtliches Muster.
  *Rohscan 2 JSDoc-Funde; später 2 eigene Fixtures · 2026-08-01*

- **Meta-Gate prüft nicht eigene Verdicts** — Gruppen, Details, Stagezahl, Offset driften bei grünen Mutationen. → Jede Stufe mit Unterkontrolle; eigene Verdicts zählen/lesen/gegen `STAGE_GROUPS`.
  *Gruppendefekt bei gleicher Summe unsichtbar; danach 16/16 Diagnosen, Selbst-Gate 141/141 · 2026-08-01*

- **Reparatur am ungeseedeten Lauf trifft nur die gesehene Hälfte** — `play.mjs` ist ungeseedet; Welle, Kills und Tafelplatzierung sind jedes Mal anders. Ein aus *einem* roten Lauf abgeleiteter Fix beschreibt diesen Lauf, nicht die Zustandsmenge: `coinsLive > 0` verpasst die zu schnell eingesammelte Münze, `coinsTaken > 0` die nie eingesammelte. → Vor dem Fix alle legitimen Endzustände aufzählen und veroderen; fehlt die Vorbedingung ganz (0 Kills → 0 Münzen), `skip` statt rot. Nie zwei ungeseedete Läufe diffen.
  *Ein Check, drei Läufe, drei verschiedene Hälften: live 1/taken 0 rot, 0 felled rot, dann peak live 0/1 taken — grün allein durch den ODER-Zweig · 2026-08-03*

- **„Fremde Datei" nach Dateiname beurteilt, Feature bleibt uninstallierbar** — Übergabe führt eine Datei als fremden Strom, weil ein anderer Strom sie auch anfasst; die eigenen Integrationspunkte bleiben unversioniert. Committet sind die Blattmodule, ein Fresh Clone baut sie nicht: `coins.js` importiert `SURF_MAX`, HEAD exportiert es nicht → Rollup rot. Selbst mit Build hätte nichts `CoinField`/`Quiz` konstruiert und die Registry kannte die Shadernamen nicht. → Jede Fremd-Behauptung gegen `git diff -- <datei>` prüfen, nicht gegen den Dateinamen; Hunk-Inhalt entscheidet. Danach die Importkette der committeten Blätter gegen `git show HEAD:<datei>` gegenlesen. Gegenprobe, dass der Clone vollständig ist: `git ls-files --others --exclude-standard -- src tools` und dieselbe Abfrage mit `--ignored` müssen leer sein — dann ist der Clone byteidentisch zum Arbeitsbaum und ein grüner Lauf überträgt sich.
  *5 von 7 als fremd geführten Dateien waren eigene: `main.js`, `combat.js`, `settings.js`, `registry.js`, `hud.js`, dazu `controller.js`. Ein Named-Import ohne Export als einziger Build-Brecher · 2026-08-03*

- **Check misst etwas, das Defekt oder Zustandswechsel nicht bewegen kann** — fünf Bauarten, gleiche Wurzel: (1) *Eingabe statt Ausgabe* — `stageAhead`/`stageSide` bleibt, während `spells.stage` wandert. (2) *Vacuous* — `hide()` soll Pin räumen, Vorzustand ist schon gelöst. (3) *Gleicher Rückgabewert aus zwei Zweigen* — `cancelPlacement() === true` überlebt falschen Zweig. (4) *Fenster unter Entprellung* — 0,128 s < 0,16 s macht leading/trailing gleich. (5) *Owner-Wechsel fehlt* — Ring bleibt rot, aber `follow(key)` wechselt Stage-Parameterquelle und nächsten Anker. → Übergebenen Ausgabewert prüfen; Vorzustand aktiv herstellen; Rückgabe mit Zustand lesen; Zeitfenster über Schwelle wählen; alle Ereignisse ausführen, die Quelle oder Owner wechseln.
  *Placement-Falsifier: 7/11 → 11/11 bei Baseline 188/0; nach Cast-Follow-Mutant 12/12 bei Baseline 190/0 · 2026-08-07*

- **Mutant lädt nicht, Falsifier meldet „MISSED"** — gepflanzter Defekt landet syntaktisch falsch: Funktionsdeklaration vor `draw(phase` eingefügt steht *im Objektliteral*, Registry lädt nicht, Probe druckt eine Zeile und beendet. Der Fall sucht seine FAIL-Zeile, findet sie nicht, schreibt sie dem Gate zu. „Defekt unsichtbar" und „Baum nie geöffnet" erzeugen dasselbe Verdikt — dieselbe Wurzel wie ein grüner Check, der nie auswertet. Die Landekontrolle in `patch()` greift nicht: die Ersetzung *ist* gelandet, nur das Ergebnis ist kein ladbarer Baum. → Jeden Mutantenlauf vor dem Verdikt gegen eine **positive Marke des geprüften Gates** lesen — dessen eigene `note`-Zeile, weil `notes` auch über roten Läufen gedruckt wird. Fehlt sie: `instrument`-Fehler des Treibers, nicht Miss des Gates. Zweite Hälfte: Mutant so bauen, dass genau eine Klausel rot wird — ein zweites Feld hätte zusätzlich „at most one field is integrated" gekippt und der Fall hätte nicht mehr Erreichbarkeit gemessen.
  *ph57-source-falsifier 5/6 → 6/6; Guard danach mit der alten Mutation absichtlich rot gesehen: `VOID` + „left a tree the gate never reached — FAIL the variant registry does not load — Unexpected identifier" statt stillem MISSED · 2026-08-09*

- **Datei geteilt, Mutant blind** — Klausel ankert auf Quelltext (`return CASTER_BODIES.map(`) in `Lobby.js`; die Funktion zog beim Split nach `lobby-cards.js`. Lauf meldet `SKIPPED — 0 sites match`, nicht rot; Summe druckt „55/56 caught" und liest sich wie ein Rundungsfehler. → Nach jedem Dateisplit jeden Werkzeug-Anker mitziehen; `SKIPPED` ist ein Defekt, kein Übersprung, und gehört im Plan als Fund geführt.
  *`flakes:lobby-mutants` 55/56 → 56/56, nachdem die Klausel auf einen eigenen `CARDS`-Pfad zeigte · 2026-08-22*
