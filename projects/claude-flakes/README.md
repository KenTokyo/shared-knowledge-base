# claude-flakes — Projekt-Learnings

**Lesen wenn:** SNOWFLOW-Capture, VFX, Runtime, Performance, Gameplay oder Gates.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Architektur/Stand: Repo-`README.md`, `ROADMAP.md`, `.completed/`. Hier nur belegte Projektfallen.

## Vier Apps in diesem Repo

Vor Facharbeit klären, in welcher die Änderung landet — sie teilen nur Repo, `shared-docs/` und `node_modules/`.

| App | Ordner | Start | Prüflauf | Kontext |
|---|---|---|---|---|
| Snowflow | `src/` | `npm run dev` (5173) | `shoot`, `smoke`, `sim`, `draw`, `wgsl` | Repo-`README.md` |
| Elemental Flakes | `elemental-flakes/` | `npm run flakes` (5177) | `flakes:verify` | `elemental-flakes/README.md` |
| Moonlit Vale | `moonlit-vale/` | `npm run vale` (5178) | `vale:verify` | `moonlit-vale/README.md` |
| Shardfall Flakes | `shardfall-flakes/` | `npm run arena` (5179) | `arena:gate` (19 Schritte) | `shardfall-flakes/README.md` |

Die Tippdateien unten stammen aus Snowflow-Arbeit. Für die drei Three.js-Apps gelten sie nur da, wo sie
stackneutral sind; Renderer-, WGSL- und Capture-Tipps sind Babylon/WebGPU-spezifisch.

## Trigger

| Arbeit | Zuerst lesen |
|---|---|
| `shoot.mjs`, Capture, A/A, A/B, Presets, Crops | [`CAPTURE-MEASURING.md`](CAPTURE-MEASURING.md) |
| Kristalle, Wasser, Vapor, Partikel, PostFX, WGSL | [`VFX-SHADERS.md`](VFX-SHADERS.md) |
| Emissiv-, Hitze-, Lichtzahlen — „zu schwach“, „zu flach“, „zu weiß“ | [`EMISSION-LIGHT-LEVELS.md`](EMISSION-LIGHT-LEVELS.md) |
| Uhren, RNG, Reset, Audio, Cloth, Allokation, Warm-up, ms-Sonden, Basislinien-Drift, Szenengraph und Matrizen | [`RUNTIME-PERFORMANCE.md`](RUNTIME-PERFORMANCE.md) |
| Waves, Wights, Essence, Boons, Cairn, Balance | [`GAMEPLAY-BALANCE.md`](GAMEPLAY-BALANCE.md) |
| `progression-test.mjs`, `mutation-test.mjs`, Assertions | [`TEST-GATES.md`](TEST-GATES.md) |
| `review/*.mjs`, `tools/*shot.mjs`, Selbsttests, Falsifikatoren, Messsonden | [`PROBES-SELFTESTS.md`](PROBES-SELFTESTS.md) |
| Zahlen, Absolutworte, Artefaktverweise in README/ROADMAP/`docs/` | [`DOC-CLAIMS.md`](DOC-CLAIMS.md) |
| `evaluate`-Strings, `RAIL_CSS`, HUD-Markup — alles in Backticks | [`TEMPLATE-LITERALS.md`](TEMPLATE-LITERALS.md) |
| Stagen, Commit, fremde Änderungen im Arbeitsbaum, Bilder im Repo | [`GIT-DELIVERY.md`](GIT-DELIVERY.md) |

Stackübergreifend: [`THREEJS-RULES.md`](../../THREEJS-RULES.md).

## Belegumfang

Auditstand 2026-08-04: 165 `History/`-Dateien vollständig als Textkorpus gelesen (14.081 Zeilen/2.762.795 Bytes); gegengeprüft mit zwölf `.completed/`-Dateien, README, ROADMAP, aktiven `docs/`, aktuellen Codeowner-Pfaden und 2.566 Reviewbildern. Frühere Angaben mit 119 Dateien sind überholt.

## Teuerste Muster

> **Plausibles Bild, ungültiger Vergleich:** freie Frames, Restschulden, geerbte Kamera, Zielstrahl durch die Bildecke, TAA-History, verschobener RNG.

> **Grüner Check, ungeprüfte Bedingung:** erst Mutanten, Fresh Clone, Crash-Guards und rote Detailzeile belegten Gates.
