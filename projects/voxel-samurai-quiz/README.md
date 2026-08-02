# voxel-samurai-quiz — Projekt-Learnings

**Lesen wenn:** AEON-Weltengine (`src/engine/`, Port 3074), Welt-Tooling (`scripts/world/`) oder Spielperformance (Port 3070).
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Architektur: `docs/aeon-engine/aeon-engine-overview.md` (SSoT). Messhandwerk:
`prompts/aeon-world/aeon-world-loop-prompt.md`. Hier: unerwartete, belegte Projektfallen.

## Trigger

| Arbeit | Zuerst lesen |
|---|---|
| Gras, Laub, Terrain, Dichte, Draw Calls, Framezeit | [`WORLD-PERFORMANCE.md`](WORLD-PERFORMANCE.md) |
| Shader-Kompilate, VFX-Layer, Render-Hüllen, `game:perf` | [`GAME-PERFORMANCE.md`](GAME-PERFORMANCE.md) |
| AEON-Bildmaße, Layer-A/B, Sondenmetrik, Probe-vs.-Shipping | [`MEASURING.md`](MEASURING.md) |
| Rauschboden, Lauf-Flags, Zustandsdrift, Zeit, Sondenspalten | [`RUNTIME-MEASURING.md`](RUNTIME-MEASURING.md) |
| `CameraRig`, Third Person, Spielpose, Waffe, Gegnerpeilung | [`CAMERA-CHARACTER.md`](CAMERA-CHARACTER.md) |
| CLI/Sonde/Datei schreiben, committen | [`TOOLING-TRAPS.md`](TOOLING-TRAPS.md) |

Global: [Messhandwerk](../../threejs/MEASURING.md) · [3D-Router](../../THREEJS-RULES.md).

## Teuerster Befund

„Richtige Messung, falsche Einheit oder falsches Fenster“ gehört global
[`threejs/MEASURING.md`](../../threejs/MEASURING.md); hier bleiben nur AEON-Instrumente, Kalibrierwerte und Bedeutungen.
