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
| AEON-Bildmaße, Layer-A/B, Sondenmetrik, Probe-vs.-Shipping | [`MEASURING.md`](MEASURING.md) |
| Rauschboden, Lauf-Flags, Zustandsdrift, Zeitverhalten, Sondenspalten | [`RUNTIME-MEASURING.md`](RUNTIME-MEASURING.md) |
| `CameraRig`, Third Person, Spielpose, Waffe, Gegnerpeilung | [`CAMERA-CHARACTER.md`](CAMERA-CHARACTER.md) |
| CLI aufrufen, Sonde schreiben, Datei schreiben, committen | [`TOOLING-TRAPS.md`](TOOLING-TRAPS.md) |

Allgemeine Sweeps, Rankings und Reviews: [`../../threejs/MEASURING.md`](../../threejs/MEASURING.md). Stackübergreifender Router: [`../../THREEJS-RULES.md`](../../THREEJS-RULES.md).

## Teuerster Befund

Der wiederholt belegte Mechanismus „richtige Messung, falsche Einheit oder falsches Fenster“ hat seinen einzigen operativen Owner im globalen [`../../threejs/MEASURING.md`](../../threejs/MEASURING.md). Die Dateien hier ergänzen ausschließlich AEON-spezifische Instrumente, Kalibrierwerte und Bedeutungen.
