# claude-flakes — Projekt-Learnings

**Lesen wenn:** SNOWFLOW-Capture, VFX, Runtime, Performance, Gameplay oder Gates.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Architektur/Stand: Repo-`README.md`, `ROADMAP.md`, `.completed/`. Hier nur belegte Projektfallen.

## Trigger

| Arbeit | Zuerst lesen |
|---|---|
| `shoot.mjs`, Capture, A/A, A/B, Presets, Crops | [`CAPTURE-MEASURING.md`](CAPTURE-MEASURING.md) |
| Kristalle, Wasser, Vapor, Partikel, PostFX, WGSL | [`VFX-SHADERS.md`](VFX-SHADERS.md) |
| Uhren, RNG, Reset, Audio, Cloth, Allokation, Warm-up | [`RUNTIME-PERFORMANCE.md`](RUNTIME-PERFORMANCE.md) |
| Waves, Wights, Essence, Boons, Cairn, Balance | [`GAMEPLAY-BALANCE.md`](GAMEPLAY-BALANCE.md) |
| `progression-test.mjs`, `mutation-test.mjs`, Assertions | [`TEST-GATES.md`](TEST-GATES.md) |

Stackübergreifend: [`THREEJS-RULES.md`](../../THREEJS-RULES.md).

## Belegumfang

100 `History/`-Dateien chronologisch gelesen: 8.972 Zeilen/1.756.286 Bytes; gegengeprüft mit 11 `.completed/`-Berichten, README, ROADMAP, Code, Reviews. PNG-stärkste Phasen: PH18 240, PH28 188, PH23 178.

## Teuerste Muster

> **Plausibles Bild, ungültiger Vergleich:** freie Frames, Restschulden, geerbte Kamera, TAA-History, verschobener RNG.

> **Grüner Check, ungeprüfte Bedingung:** erst Mutanten, Fresh Clone, Crash-Guards und rote Detailzeile belegten Gates.
