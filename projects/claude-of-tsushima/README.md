# claude-of-tsushima — Projekt-Learnings

**Lesen wenn:** Welt, Capture-Tooling oder Third-Person-Kampf.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Nur belegte Projektfallen; Architektur/Verträge bleiben bei Repo-Ownern. Global: [`THREEJS-RULES.md`](../../THREEJS-RULES.md).

## Trigger

| Arbeit | Zuerst lesen |
|---|---|
| Capture, Probe, Sweep, Referenz, Framekosten | [`CAPTURE-MEASURING.md`](CAPTURE-MEASURING.md) |
| Schranke, Gate, Exit-Code, Falsifikation | [`GATES-BOUNDS.md`](GATES-BOUNDS.md) |
| Terrain, Wasser, Vegetation, Material, Licht, Bake | [`WORLD-RENDERING.md`](WORLD-RENDERING.md) |
| Trail, Funken, Hit-Stop, Impact, Timing | [`COMBAT-VFX.md`](COMBAT-VFX.md), dann `docs/ai-rules/VFX.md` |
| Hero-Rig, Pose, IK, Kontakt, Third-Person-Kamera | [`CHARACTER-CAMERA.md`](CHARACTER-CAMERA.md) |

## Belegumfang

Audit: 165 History-Dateien in 24×7 Batches, später dedupliziert; `review/`: 1.537 Bilder. Teure Schleifen:
`spark` 176, `streak` 92, `sliv` 53, `hitstop` 40, `pass-*` 238, `crop` 250, `probe` 130 Treffer (Überlappung möglich). Messung schlägt Bildzahl.

## Teuerstes Muster

> **Präziser Wert, falsche Szene, falscher Zustand oder falsche geometrische Größe.**

Beispiele: Live-Frame statt Wasser-Target; Stamm- statt Kronenmaske; 2,5-m-Funkenbild für 1,4-m-Kontakt;
radialer Abstand für Schwertkomponente; Knauf als Schneide. Gegenmittel: **Kontrollzeile im selben Lauf,
Population und Applied Value ausgeben, dann entscheiden.**

## Lokale Owner

- Capture/Determinismus: `Notes/screenshot-pipeline-tutorial.md`, `src/capture/`, `tools/probe.mjs`
- Kampf-VFX: `docs/ai-rules/VFX.md`
- Welt: `Notes/threejs-worldbuilding-prozessanalyse-und-ki-fehler.md`
- Code vor Prosa: Selftests, Exit-Gates, Kopfkommentare in `tools/`/`src/`
