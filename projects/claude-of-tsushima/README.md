# claude-of-tsushima — Projekt-Learnings

**Lesen wenn:** du in diesem Repository an Welt, Capture-Tooling oder dem Third-Person-Kampf arbeitest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Hier steht nur, was in **diesem** Repository Zeit gekostet hat. Architektur und aktuelle Verträge bleiben bei ihren Ownern im Repo; globale Three.js-Tipps beginnen in [`../../THREEJS-RULES.md`](../../THREEJS-RULES.md).

## Trigger-Tabelle

| Woran du arbeitest | Lies zuerst |
|---|---|
| Capture, Probe, Sweep, Referenzvergleich, Framekosten | [`CAPTURE-MEASURING.md`](CAPTURE-MEASURING.md) |
| Terrain, Wasser, Vegetation, Materialien, Licht, Bake | [`WORLD-RENDERING.md`](WORLD-RENDERING.md) |
| Trail, Funken, Hit-Stop, Impact, Effekt-Timing | [`COMBAT-VFX.md`](COMBAT-VFX.md), danach zwingend `docs/ai-rules/VFX.md` |
| Hero-Rig, Pose, IK, Kontakt, Third-Person-Kamera | [`CHARACTER-CAMERA.md`](CHARACTER-CAMERA.md) |

## Erhebungsbasis

Der Erstaudit lief über **alle 165 History-Dateien in 24 Siebener-Batches**; nach jedem Batch wurden Kandidaten notiert, gegen spätere Widerlegungen geprüft und am Ende dedupliziert. `review/` enthält **1.537 Bilder**. Die Dateinamen zeigen, wo Bildschleifen teuer wurden: `spark` 176, `streak` 92, `sliv` 53, `hitstop` 40, `pass-*` 238, `crop` 250 und `probe` 130 Treffer (Überlappungen möglich). Die Anzahl priorisiert das Lesen; Beleg bleibt die Messung, nicht das Bildzählwerk.

## Das teuerste Muster dieses Projekts

> **Ein präziser Wert wurde wiederholt für die falsche Szene, den falschen Zustand oder die falsche geometrische Größe erzeugt.**

Beispiele: Wasser erschien heller als der Himmel, weil zwischen zwei CDP-Aufrufen Live-Frames die Targets überschrieben; `stand.mjs` maß Kronenschluss auf der Stammmaske; ein 2,5-m-Funkenbild wurde für den 1,4-m-Kontakt ausgeliefert; eine Schwertkomponente wurde mit radialem Trefferabstand verglichen; `at = 0` wertete den Knauf wie die Schneide. Das Gegenmittel ist projektspezifisch, aber konstant: **Kontrollzeile im selben Lauf, Population und Applied Value ausgeben, erst dann entscheiden.**

## Kanonische lokale Owner

- Screenshot-Architektur und Determinismus: `Notes/screenshot-pipeline-tutorial.md`, `src/capture/`, `tools/probe.mjs`.
- Kampf-VFX-Vertrag und gemessene Schwellen: `docs/ai-rules/VFX.md`.
- Weltvertrag und historische Ursachen: `Notes/threejs-worldbuilding-prozessanalyse-und-ki-fehler.md`.
- Aktueller Code schlägt Prosa: Selftests, Exit-Gates und Kopfkommentare in `tools/`/`src/` sind die ausführbaren Owner.
