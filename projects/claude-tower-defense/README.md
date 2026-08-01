# claude-tower-defense — Projekt-Learnings

**Lesen wenn:** du in diesem Repository an der Weltschicht (`src/render/`, `src/world/`, `src/vfx/`) oder an
den Messsonden unter `tools/` arbeitest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Die Architekturkarte ist **nicht hier**, sondern im Repo: `Notes/TASKS.md` (Quelle der Wahrheit),
`Notes/TASKS-2.md` (Kurzfassung und Einstieg) und `Notes/DEFECTS.md` (die Akten). Hier steht nur, was
**wehgetan hat** — und in diesem Projekt hat fast alles davon am **Messgerät** wehgetan, nicht am Produkt.

## Trigger-Tabelle

| Woran du arbeitest | Lies zuerst |
|---|---|
| Ein Gate, ein Wächter, ein `--bad`-Arm, eine A/B-Klammer, „der Test ist grün" | [`INSTRUMENT-TRAPS.md`](INSTRUMENT-TRAPS.md) |
| Schattenpass, `castShadow`, Cascade, LOD, Culling, Draw Calls, Framezeit | [`SHADOW-AND-CULLING.md`](SHADOW-AND-CULLING.md) |
| CLI aufrufen, Prüfreihe schreiben, Datei schreiben, Beleg ablegen | [`TOOLING-TRAPS.md`](TOOLING-TRAPS.md) |

Zusätzlich global, wenn das Thema stackübergreifend ist: [`../../THREEJS-RULES.md`](../../THREEJS-RULES.md),
[`../../threejs/PERFORMANCE.md`](../../threejs/PERFORMANCE.md),
[`../../threejs/MEASURING.md`](../../threejs/MEASURING.md).

## Das teuerste Muster dieses Projekts

Über die Phasen PH88 bis PH97 sind **sechs** Defekte am Messgerät gefunden worden (D63, D65, D66, D67, D68,
D69) und **null** am Produkt. ⚠ **Die Serie ist in PH99 gerissen** — D70 sitzt im Produktcode (eine Geometrie
lieferte sechsmal so viele Vertices aus, wie sie unterscheidbare hat). **Das ändert die Lehre nicht, es
schärft sie:** gefunden wurde D70 nicht durch Hinsehen, sondern weil eine Frage gestellt wurde, die **kein
vorhandenes Instrument beantworten konnte** — alle fünf zählten Dreiecke, und der Defekt bewegte keins.
Fünf der sechs Instrumentenakten haben dieselbe Form:

> **Die Prüfung reicht kürzer, als ihre Überschrift behauptet — und erzeugt deshalb kein Fehlerbild,
> sondern ein falsches Erfolgsbild.**

Sie stand **in** einem Zweig statt **vor** den Zweigen (D66, D67), sie las nur einen Teil dessen, worüber sie
urteilte (D68: zwei A-Beine, nie das B dazwischen), oder ihr Korpus enthielt die zu prüfenden Dateien gar
nicht (D69: `14 probes checked` — wahr und zu kurz). **In jedem Fall kam ein GRÜNES Ergebnis zurück**, und in
zwei Fällen stand eine plausible **Zahl** daneben.

**Gegenmittel, das in allen fünf Fällen funktioniert hätte:** die Prüfung einmal gegen einen bekannt
**schlechten** Stand fahren *und* einmal gegen einen bekannt **guten** — und die Ausgabe fragen, **wie viele**
Fälle sie angesehen hat. Ein Gate, das seinen Umfang nicht nennt, unterscheidet „geprüft und in Ordnung"
nicht von „nicht angesehen".

⚠ **PH100 hat die Form nach der anderen Seite ergänzt (D71).** Eine Prüfung kann auch **zu weit** reichen:
eine Selbstkontrolle forderte **Gleichheit**, wo nur **Containment** gilt, und feuerte auf **42 von 42**
Fällen — sie hatte recht, ihre **Prämisse** war falsch. **Eine Prüfung, die überall feuert, wird
abgeschaltet und nimmt die echten Funde mit** — sie ist genauso wertlos wie eine, die nie feuert, und im
selben Werkzeug stand beides nebeneinander. **Damit lautet die Frage an jede neue Prüfung nicht „ist sie
grün?", sondern: in welchem der drei Zustände ist sie — feuert nie, feuert immer, oder feuert genau dann?**
Beantwortbar ist das nur, indem man sie **einmal rot sieht**.

⚠⚠ **Und PH100/PH101 hat den zweiten Produktbefund gebracht — durch dieselbe Bewegung wie D70: eine Frage,
die kein vorhandenes Instrument beantworten konnte.** Alle Sonden zählten die **eingereichte** Seite; keine
fragte, was die Schattenkarte **aufzeichnen** kann. Die Antwort hat drei Phasen Richtungsannahme umgedreht:
die größte Sorte des Schattenpasses liegt **über** der Abtastrate und ist damit **kein** Kostenhebel.
**Wenn eine Annahme mehrere Übergaben überlebt, ohne dass jemand ihre Einheit gemessen hat, ist sie
verdächtig — nicht bestätigt.**
