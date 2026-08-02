aus dem projekt duty-of-tsushima entnommen

# ADR-001 — JavaScript ESM statt TypeScript

**Datum:** 2026-08-01 · **Status:** angenommen · **Betrifft:** den gesamten Laufzeitcode und den
Mess-Harness

## Frage

Der Auftrag verlangt Three.js und stellt die Sprachwahl ausdrücklich zur Entscheidung — mit
Begründung. Also: JavaScript oder TypeScript?

## Entscheidung

**JavaScript ESM mit JSDoc-Typen und `checkJs` im Editor.** Kein Build-Schritt für Typen, keine
`.ts`-Dateien, kein `tsc` in der Pipeline.

Als Sicherheitsnetz statt eines Compilers:

- `jsconfig.json` mit `"checkJs": true` und `"strict": true` — der Editor prüft, der Build nicht.
- JSDoc-`@typedef` auf den **Verträgen**, nicht überall: `ctx`, die Eventtabelle, die
  Quality-Presets, die Weltfelder. Das sind die Stellen, an denen ein Missverständnis zwischen zwei
  parallel arbeitenden Agenten entsteht.
- `pnpm check` = `glslcheck && build` plus passende numerische Probes — die Gates, die diesen Stack wirklich
  brechen. CLI-Capture ist kein Standardgate; nur bei ungelöster Look-Unsicherheit freiwillig eine, im gesamten
  Userauftrag absolut höchstens zwei Sichtprüfungen.

## Warum

### 1 · Drei von vier Quellen sind bereits plain ESM

`Claude-of-Duty` (148 Dateien, ~70 000 Zeilen), `Claude-of-tsushima` (30 Dateien, ~27 000 Zeilen)
und `claude-desert` (~31 000 Zeilen) sind JavaScript. Die Ernte ist laut
[`HARVEST-MAP.md`](../HARVEST-MAP.md) zum größten Teil **PORT** — Datei kopieren, Konstanten
anpassen, Verhalten identisch lassen.

Bei gleicher Sprache ist PORT ein Copy und ein Suchen-Ersetzen. Bei TypeScript wäre jeder PORT
zusätzlich eine Typisierungsarbeit an fremdem Code, den wir gerade *nicht* verstehen wollen,
sondern übernehmen. Das ist der teuerste Teil des Projekts, und er wäre selbst verursacht.

Die vierte Quelle, `voxel-samurai-quiz`, ist TypeScript — aber von dort kommen ohnehin nur
**Kurven und Reihenfolgen** (Spawnbudget, Eröffnungssalve, Quiz-Flow). Das sind wenige hundert
Zeilen reine Mathematik; die portieren sich in beide Richtungen gleich schnell.

### 2 · Der Harness importiert Laufzeitcode direkt

`tools/*.mjs` läuft in Node und liest Konstanten aus `src/` — Kameradefinitionen, Weltmaße,
Qualitätspresets. Mit plain ESM ist das ein `import`. Mit TypeScript bräuchte jeder CLI-Aufruf
entweder einen Loader (`tsx`, `--import`) oder einen vorgelagerten Build, und beides kostet genau
dort Zeit, wo `shared-docs` sagt, dass Startkosten das Doppelte bis Dreifache der eigentlichen
Messung ausmachen. Ein Sweep, der in *einem* Prozess laufen soll, verträgt keinen Buildschritt
zwischen zwei Werten.

### 3 · Typen fangen nicht die Fehler, die dieser Stack macht

Die dokumentierten, teuer bezahlten Fehler der vier Nachbarrepos sind:

- pro Frame allokieren (`new THREE.Vector3()` in `update()`)
- die sichtbare Punktlichtzahl kippen und damit jedes Material neu kompilieren
- eine Zellratio mit falschem Vorzeichen (`paintShard` malt lang in y, nicht in x)
- über zwei Auflösungen in nativen Pixeln vergleichen
- Aufwärm-fps als Kostenmaß nehmen
- ein Messfenster, das zu 97 % auf Blüte statt auf Gras zeigt

**Kein einziger davon ist ein Typfehler.** Alle sechs sind Laufzeit-, Mess- oder
Semantikfehler. Dagegen helfen Gates, Selftests und Probes — `physics/selftest.js`,
`lightcount.mjs`, `framecost.mjs` —, nicht ein Typsystem. Genau deshalb sind diese Gates in
`pnpm check` und nicht optional.

### 4 · Der Vertrag ist eine Datei, kein Interface

`ARCHITECTURE.md` koordiniert parallel arbeitende Agenten über Ownership-Map, Eventtabelle und
Oberflächenvokabular. Diese Koordination passiert im Review und im Commit, nicht im Compiler:
Ein Agent, der ein Event mit falschem Payload sendet, wird von der Tabelle erwischt, in der die
Zeile fehlt — nicht von einem Typ, den er selbst mitgeliefert hätte.

## Was das kostet

Ehrlich, ohne Beschönigung:

- **Refactorings über Subsystemgrenzen sind riskanter.** Kein „rename symbol" über 148 Dateien.
  → Gegenmaßnahme: die Grenzen sind ohnehin `ctx.get(id)`-Strings, also von Anfang an
  refactoring-feindlich. Änderungen an `ctx` und an der Eventtabelle gehen über `ARCHITECTURE.md`
  und einen Commit, nicht über eine IDE-Aktion.
- **Falsch getippte Event-Payloads fallen erst zur Laufzeit auf.**
  → Gegenmaßnahme: ein Dev-Guard in `ctx.events.emit`, der im Nicht-Produktionsbuild gegen ein
  Schema aus `ARCHITECTURE.md` prüft und laut wirft. Das erwischt zusätzlich Payloads, die typ-
  korrekt und trotzdem falsch sind (`NaN`, leerer Vektor) — was ein Typsystem nicht kann.
- **Autovervollständigung ist schwächer** außerhalb der JSDoc-typisierten Verträge.
  → Akzeptiert. Der Nutzen konzentriert sich ohnehin auf `ctx`, und genau der ist typisiert.

## Verworfene Alternativen

| Alternative | Warum nicht |
|---|---|
| **Volles TypeScript** | Jeder PORT aus drei JS-Repos wird zur Typisierungsarbeit an fremdem Code. Höchste Kosten genau dort, wo der größte Teil der Arbeit liegt. |
| **TS nur für neue Subsysteme** (`waves`, `shrines`, `abilities`) | Zwei Sprachen in einem Repo, zwei Build-Pfade, zwei Loader-Wege im Harness. Die Grenze verläuft quer durch Dateien, die einander über `ctx` erreichen — also überall. |
| **`allowJs` + schrittweise Migration** | Migration ist ein Projekt für sich und liefert am Spiel keinen Frame. Ohne Enddatum bleibt permanent der Mischzustand von Alternative 2. |
| **JSDoc + `tsc --noEmit` als CI-Gate** | Nah dran und ernsthaft erwogen. Verworfen, weil `three`-Typen über 148 portierte Dateien eine Flut von Findings erzeugen, die niemand abarbeitet, und ein rotes Gate, das man ignoriert, ist schlechter als keines. Der Editor prüft trotzdem — die Prüfung ist da, sie blockiert nur nicht. |

## Wann diese Entscheidung fällt

Sie ist widerlegbar, und zwar an einer Zahl statt an einem Gefühl. Zu revidieren, wenn eines eintritt:

- Die Ernte ist abgeschlossen und der Anteil neu geschriebenen Codes übersteigt den portierten
  deutlich — dann verschiebt sich das Kostenargument aus Punkt 1.
- Drei Defekte in Folge sind nachweislich Typfehler, die `checkJs` nicht gefangen hat.
- Der Harness braucht ohnehin einen Buildschritt, sodass Punkt 2 entfällt.

Wer sie stürzt, schreibt den Beleg dazu — Regel aus
[`shared-docs/LEARNING-SYSTEM.md`](../../shared-docs/LEARNING-SYSTEM.md).
