# voxel-samurai-quiz — Projekt-Learnings

**Lesen wenn:** Quizfall World Runtime (`src/engine/`), Welt-Tooling (`scripts/world/`) oder Spielperformance auf Port 3070.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Architecture SSoT: `docs/quizfall-world-runtime-entry.md`. Measurement tools: `scripts/game/`.
This folder keeps only unexpected, proven project traps.

## Trigger

| Arbeit | Zuerst lesen |
|---|---|
| Asset-Lab-Landschaft gegen Kaze-Technik vollständig vergleichen | [`ASSET-LAB-KAZE-WELTTECHNIK.md`](ASSET-LAB-KAZE-WELTTECHNIK.md) |
| Größte Asset-Lab-/Kaze-Unterschiede und Auswirkungen kompakt | [`ASSET-LAB-KAZE-WELTTECHNIK-KOMPAKT.md`](ASSET-LAB-KAZE-WELTTECHNIK-KOMPAKT.md) |
| Endlos-Voxel-Hack-and-Slash mit drei Map-Stilen prompten | [`prompts/new-games/endless-voxel-slasher/README.md`](prompts/new-games/endless-voxel-slasher/README.md) |
| Gras, Laub, Terrain, Dichte, Draw Calls, Framezeit | [`WORLD-PERFORMANCE.md`](WORLD-PERFORMANCE.md) |
| Shader-Kompilate, VFX-Layer, Render-Hüllen, `game:perf` | [`GAME-PERFORMANCE.md`](GAME-PERFORMANCE.md) |
| V21-Klassen-VFX kopieren, Laufzeit-Overrides nach sauberem Slice-Diff | [`CLASS-VFX-TRANSFER.md`](CLASS-VFX-TRANSFER.md) |
| Quizfall-Weltbildmaße, Layer-A/B, Sondenmetrik, Probe-vs.-Shipping | [`MEASURING.md`](MEASURING.md) |
| Rauschboden, Lauf-Flags, Zustandsdrift, Zeit, Sondenspalten | [`RUNTIME-MEASURING.md`](RUNTIME-MEASURING.md) |
| `CameraRig`, Third Person, Spielpose, Waffe, Gegnerpeilung | [`CAMERA-CHARACTER.md`](CAMERA-CHARACTER.md) |
| CLI/Sonde/Datei schreiben, committen | [`TOOLING-TRAPS.md`](TOOLING-TRAPS.md) |
| Persistierte Favoriten, Rosteransicht, localStorage-Schlüssel, Produktumbenennung | [`PERSISTENCE-TRAPS.md`](PERSISTENCE-TRAPS.md) |

Global: [Messhandwerk](../../threejs/MEASURING.md) · [3D-Router](../../THREEJS-RULES.md).

## Teuerster Befund

„Richtige Messung, falsche Einheit oder falsches Fenster“ gehört global
[`threejs/MEASURING.md`](../../threejs/MEASURING.md); hier bleiben nur Quizfall-Weltinstrumente, Kalibrierwerte und Bedeutungen.
