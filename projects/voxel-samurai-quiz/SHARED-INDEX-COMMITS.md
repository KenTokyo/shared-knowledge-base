# Geteilter Git-Index — voxel-samurai-quiz

**Lesen wenn:** committen, während andere Agenten am selben Arbeitsbaum arbeiten (fremde Einträge in `git diff --cached`).
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Der Index dieses Repos gehört keiner Sitzung allein. Jeder Tipp kostete mindestens einen Durchgang.

## Commit abgrenzen

- **Commit schluckt fremde Arbeit** — `git commit` und `--amend` nehmen den ganzen Index; fremde Sitzungen stagen mitten im eigenen Lauf, `git add -A` ist damit nie sicher, und selbst `commit -- <pfad>` lässt bereits gestagte Fremdpfade im Index stehen. → Privaten Index fahren: `export GIT_INDEX_FILE=.tmp/own-index`, `git read-tree HEAD`, nur eigene Pfade stagen, dann `git write-tree` → `git commit-tree` → `git update-ref refs/heads/main <neu> <alt>`. Die alte Ref als dritter Parameter ist die Kollisionsprüfung: hat inzwischen jemand committet, schlägt das Update fehl statt zu überschreiben.
  *`9533f82e` wollte eine Datei liefern (`bake-world.mjs`) und nahm vier veraltete Indexeinträge mit: rollte `4ed9a3d3` und einen Teil von `8956118a` zurück und schob einen kaputten Import (`shapeOfRequest`) nach `origin/main`. Repo hat leeres `.git/hooks` und kein `core.hooksPath` — der Plumbing-Weg umgeht deshalb nichts · 2026-08-23*

- **Halber Commit nach Hunk-Filter** — ein Stager, der eigene Hunks am Klassennamen erkennt, lässt jede eigene Zeile ohne das Wort liegen (Interface-Feld, Helfer, Export-Zeile); Ergebnis kompiliert lokal weiter, weil die Restzeilen im Arbeitsbaum stehen, und ist erst im Remote-Klon kaputt. → Nach dem Filter `git diff HEAD -U0 -- <datei>` lesen und jeden übrig gebliebenen Hunk ausdrücklich fremd oder eigen zuordnen, nicht zählen.
  *Zweimal in einer Runde zugeschlagen · 2026-08-23*

- **`git apply --cached --unidiff-zero` setzt Einfügungen falsch** — ohne Kontextzeilen hat der Patch keinen Anker; sobald davor ein Fremd-Hunk übersprungen wurde, ist der Zeilenversatz falsch und die eigene Einfügung landet mitten in fremdem Code. Kein Fehler, kein Exit ≠ 0. → Filterpatch aus `git diff HEAD -U3` bauen und mit `git apply --cached --recount` einspielen; `--recount` korrigiert die Hunk-Kopfzahlen nach dem Filtern.
  *`.tmp/stage-own-hunks.sh` fuhr erst `-U0`, danach `-U3 --recount` · 2026-08-23*

## Fremdstand lesen

- **Gestagte Fremdänderung sieht aus wie eigener Rückschritt** — eine fremde Sitzung mit altem Arbeitsstand stagt Zeilen, die bereits gelandete eigene Commits zurückdrehen; im `git diff --cached` liest sich das wie ein Selbstverschulden. → Vor jeder Reparatur `git ls-tree -r --name-only HEAD | grep -c <namensraum>` und `git log --oneline` prüfen: steht die eigene Arbeit in HEAD, ist der Index-Eintrag fremd und bleibt unangetastet.
  *Gestagter Revert von `class-runtime-v2-contract-gate.mts` und Masterplan bei 204 eigenen Dateien in HEAD · 2026-08-23*

- **Eigene Arbeit fremd zurückgerollt** — landete der Revert bereits in einem fremden Commit, steht die eigene Fassung nur noch im Arbeitsbaum; ein Blick auf `git status` liest sich wie „noch nicht committet". → Nicht den Arbeitsbaum committen (der trägt auch fremde Umsortierungen), sondern die eigenen Commits gezielt nachspielen: `git show <eigener-commit> -- <eigene-pfade> | git apply --cached -3`. Der Dreiwege-Modus setzt auf den inzwischen gewachsenen Baum auf, und fremde Änderungen an denselben Dateien bleiben stehen.
  *Arbeitsbaum-Overview trug zusätzlich zwei fremde Abschnittsverschiebungen; Patch-Replay von `4ed9a3d3` + `8956118a` traf genau 4 Dateien, 79+/19− · 2026-08-23*

- **HEAD wandert mitten im Plumbing-Commit** — zwischen `git read-tree HEAD` und `git write-tree` committen andere Sitzungen; `git diff --cached HEAD` zeigt deren Arbeit dann als eigene Löschung (hier: 5 Kit-Dateien, 2541 Zeilen). → `OLD=$(git rev-parse HEAD)` einmal festhalten, gegen `$OLD` diffen, `update-ref … "$NEW" "$OLD"` als Kollisionsprüfung nutzen und den ganzen Block in einer Schleife dreimal wiederholen statt den Diff zu glauben.
  *HEAD lief in einem Lauf von `4c284dd7` über `9533f82e` bis `28f5825a` · 2026-08-23*

- **Submodul-Zeiger erscheint nach eigenem Commit als fremder Revert** — der Zeiger wird per Plumbing in HEAD gehoben, der geteilte Index hält aber weiter den alten Hash und meldet ihn als gestagte Rückänderung. → Nach dem `update-ref` denselben Hash im geteilten Index nachziehen: `git update-index --cacheinfo 160000,<hash>,shared-docs`.
  *`shared-docs` 26544fad → 67468c1a · 2026-08-23*
