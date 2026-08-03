# Test- und Mutations-Gates — claude-flakes

**Lesen wenn:** `progression-test.mjs`, `mutation-test.mjs`, Assertion, Mutant, Diagnose oder Fresh Clone.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

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
