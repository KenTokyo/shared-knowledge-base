# quiz-arena-space — Projekt-Learnings

**Lesen wenn:** du in Starforge Arena an den Prüf-Benches, an Capture und Messung, an Render/VFX, an einer spürbaren Spielgröße oder am Kreuzwortbrett arbeitest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Architektur, Befehle und Protokolle bleiben im Repository (`AGENTS.md`, `Notes/`, die Klassen-Docs im
Quelltext). Hier steht nur, was in **diesem** Repository wiederholt Zeit gekostet hat.

## Trigger-Tabelle

| Woran du arbeitest | Lies zuerst |
|---|---|
| Klausel, `--poison=`, `--only=`-Arm oder Schwelle in `tools/sim.mjs` | [`SIM-GATES.md`](SIM-GATES.md) |
| Ein Stub, ein Wrapper, ein Antrieb oder ein Parser, der die Zahl für eine Klausel herstellt | [`MEASURING-RIGS.md`](MEASURING-RIGS.md) |
| `tools/selftest.mjs`, ein `want`, eine Treibung, eine Zahl oder ein Quellzitat in einer Notiz | [`SELFTEST-NOTES.md`](SELFTEST-NOTES.md) |
| Szenario in `tools/shoot.mjs` / `src/core/Diagnostics.ts`, eine `PROBLEM:`-Zeile, ein grünes Ergebnis als Beleg | [`BENCH-SCENARIOS.md`](BENCH-SCENARIOS.md) |
| `tools/cdp.mjs`, `tools/serve.mjs`, `src/capture/`, zwei Läufe vergleichen | [`CAPTURE-DETERMINISM.md`](CAPTURE-DETERMINISM.md) |
| Ein Tor über Frame-Zeit, Ruckler oder Laufzeit | [`TIMING-GATES.md`](TIMING-GATES.md) |
| `src/render/`, `src/fx/VFX.ts`, `src/fx/Particles.ts`, Shader, Bloom, Licht, Partikel **bauen** | [`RENDER-VFX.md`](RENDER-VFX.md) |
| „Sieht man das?" — Differenzbild, Pixel-Gate, Crop, Kontrollframe, Verdikt über Sichtbarkeit | [`EFFECT-VISIBILITY.md`](EFFECT-VISIBILITY.md) |
| Bewegung, Abklingzeiten, Waffenzahlen, Kameraklemmen, Audio-Pegel, HUD-Anzeige | [`GAMEPLAY-SYSTEMS.md`](GAMEPLAY-SYSTEMS.md) |
| `src/systems/Crossword.ts`, `.shots/_grid.mjs`, `.shots/_board.mjs` | [`CROSSWORD-BOARD.md`](CROSSWORD-BOARD.md) |

Stackübergreifend zusätzlich: [`../../THREEJS-RULES.md`](../../THREEJS-RULES.md) als Router und
[`../../threejs/MEASURING.md`](../../threejs/MEASURING.md) für Messhandwerk, das nicht an diesem Repo hängt.

**Was hier bewusst *nicht* steht:** die Begründungen der Gegner-Refits, der Pool-Invarianten und der
Panel-Arithmetik. Die stehen ausführlich in den Klassen-Docs von `src/entities/ShipDefs.ts`,
`ShipModels.ts`, `ShipBuilder.extents()` und `src/systems/WaveDirector.ts` — dorthin gehört ein Link, kein
Duplikat.

## Ersteinrichtung — Belegumfang

Für diese erste Fassung wurden **alle 126 Dateien** unter `History/` gelesen (2,4 MB, in sieben
Themengruppen), gegengeprüft gegen `Notes/PROMPT-gameplay-overhaul.md`, den Quelltext und die
Commit-Historie. Zusätzlich liefen drei unabhängige Audits gegen den ausgelieferten Stand: der Gegner-Arm
von `tools/sim.mjs`, die Abnahmetabelle A–K und der Frame-Pfad. Aufgenommen wurde nur, was eine Zahl
mitbringt.

## Die drei teuersten Muster

> **Ein grüner Check war meistens nur ungeprüft.** Leere Datenlisten bestehen jeden Grenzwert, ein
> `NaN`-Komparator sortiert „lass liegen", ein Gruppenname mit Tippfehler beendet mit 0, und für die
> Konjunktion, die eine Klausel trägt, existiert oft gar kein Fehlerzweig — dann druckt der rote Lauf den
> grünen Satz.

> **Das Instrument stand fast immer zwischen Messung und Spiel.** Vier Urteile in Folge maßen einen
> Wiederholungsschutz statt eines Effekts, drei byte-identische Läufe waren alle drei kontaminiert, und ein
> „NO-DAMAGE" war die Geometrie des Szenarios. Reproduzierbarkeit ist **kein** Gültigkeitsbeleg.

> **Die Zahl, die in der Tabelle steht, ist selten die, die bindet.** Eine Abklingzeit wurde erhöht und ein
> Nachschubterm hielt weiter; eine Momentum-Decke lag über der erreichbaren Geschwindigkeit; eine
> Kameraklemme konnte geometrisch nicht tun, was ihr Name sagte. Vor dem Drehen messen, **welcher** Term
> hält.
