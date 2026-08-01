# claude-flakes — Projekt-Learnings

**Lesen wenn:** du in SNOWFLOW an Capture, VFX, Runtime, Performance, Gameplay oder den Prüf-Gates arbeitest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Architektur und Produktstand bleiben im Repository: `README.md`, `ROADMAP.md` und die Messberichte unter `.completed/`. Hier steht nur, was in diesem Repository wiederholt Zeit gekostet hat.

## Trigger-Tabelle

| Woran du arbeitest | Lies zuerst |
|---|---|
| `tools/shoot.mjs`, `src/capture/`, A/A, A/B, Presets, Crops | [`CAPTURE-MEASURING.md`](CAPTURE-MEASURING.md) |
| Kristalle, Wasser, Vapor, Partikel, PostFX, WGSL | [`VFX-SHADERS.md`](VFX-SHADERS.md) |
| Uhren, RNG, Reset, Audio, Cloth, Allokationen, Warm-up | [`RUNTIME-PERFORMANCE.md`](RUNTIME-PERFORMANCE.md) |
| Waves, Wights, Essence, Boons, Cairn, Balance | [`GAMEPLAY-BALANCE.md`](GAMEPLAY-BALANCE.md) |
| `progression-test.mjs`, `mutation-test.mjs`, neue Assertions | [`TEST-GATES.md`](TEST-GATES.md) |

Zusätzlich global, wenn das Thema stackübergreifend ist: [`../../THREEJS-RULES.md`](../../THREEJS-RULES.md).

## Ersteinrichtung — Belegumfang

Für diese erste Fassung wurden **alle 100 Dateien** unter `History/` in chronologischen Siebenergruppen gelesen: 8.972 Zeilen / 1.756.286 Bytes. Gegengeprüft wurden die elf Berichte unter `.completed/`, README, ROADMAP, Quellcode und die Review-Verteilung; allein die bildstärksten Phasen PH18/PH28/PH23 erzeugten 240/188/178 PNGs.

## Die zwei teuersten Muster

> **Ein plausibles Bild war häufig ein ungültiger Vergleich.** Freilaufende Frames, nicht zurückgesetzte Bruchschulden, geerbte Kamera, TAA-History oder ein verschobener RNG-Strom erzeugten jeweils plausible PNGs vom falschen Zustand.

> **Ein grüner Check war häufig nur ungeprüft.** Erst Mutationen, Fresh-Clone-Läufe, Crash-Guards und das Rücklesen der roten Detailzeile zeigten, ob Bedingung und Diagnose wirklich scheitern können.
