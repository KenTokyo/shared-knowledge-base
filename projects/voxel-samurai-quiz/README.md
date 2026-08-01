# voxel-samurai-quiz — Projekt-Learnings

**Lesen wenn:** du in diesem Repository an der AEON-Weltengine (`src/engine/`, Port 3074) oder an ihrem
Welt-Tooling (`scripts/world/`) arbeitest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Die Architekturkarte ist **nicht hier**, sondern im Repo: `docs/aeon-engine/aeon-engine-overview.md` (SSoT)
und `prompts/aeon-world/aeon-world-loop-prompt.md` (Messhandwerk). Hier steht nur, was **wehgetan hat** —
Dinge, die man in keiner Architekturkarte sucht, weil man nicht weiß, dass man sie suchen müsste.

## Trigger-Tabelle

| Woran du arbeitest | Lies zuerst |
|---|---|
| Gras, Laub, Terrain, Dichte, Draw Calls, Framezeit | [`WORLD-PERFORMANCE.md`](WORLD-PERFORMANCE.md) |
| Sweeps, Rankings, Referenzvergleich, Blindreview, „ist das besser?" | [`MEASURING.md`](MEASURING.md) |
| `CameraRig`, Third Person, Spielpose, Waffe, Gegnerpeilung | [`CAMERA-CHARACTER.md`](CAMERA-CHARACTER.md) |
| CLI aufrufen, Sonde schreiben, Datei schreiben, committen | [`TOOLING-TRAPS.md`](TOOLING-TRAPS.md) |

Zusätzlich global, wenn das Thema stackübergreifend ist: [`../../THREEJS-RULES.md`](../../THREEJS-RULES.md).

## Das teuerste Muster dieses Projekts

Über P14 bis P15 hat **eine** Fehlerform mehr Zeit gekostet als alle anderen zusammen:

> **Die Messung war richtig, die Einheit oder das Fenster nicht — und die Schlussfolgerung stand trotzdem
> vier Schichten lang.**

Vier belegte Fälle: Pixel über zwei Auflösungen verglichen (P14p → P14q), Messfenster im Teich statt im Gras
(`R.far`/`R.toe`), Rauschboden zweimal zu eng geschätzt (0,006 → 0,077), Aufwärm-fps als Kostenmaß zitiert
(83,5 gegen 44,3 auf identischem Code).

**Gegenmittel, das in allen vier Fällen funktioniert hätte:** vor der ersten Schlussfolgerung *einmal*
prüfen, was das Instrument tatsächlich zählt — Einheit, Fenster, Nenner, Rauschboden. Das kostet einen Lauf.
Eine falsche Schlussfolgerung kostet eine Schicht.
