# duty-of-tsushima — Projekt-Learnings

**Lesen wenn:** du in diesem Repository ein Werkzeug unter `tools/` schreibst oder das Heightfield,
eine Lane oder einen Spawnpunkt anfasst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Der Engine-Vertrag steht **nicht hier**, sondern im Repo: `ARCHITECTURE.md` (Ownership, Events,
Weltfeld-API) und `AGENTS.md` (Pflichtregeln, Messregeln). Hier steht nur, was in diesem Repository
Zeit gekostet hat. Globale Three.js-Tipps beginnen bei [`../../THREEJS-RULES.md`](../../THREEJS-RULES.md).

## Trigger-Tabelle

| Woran du arbeitest | Lies zuerst |
|---|---|
| Werkzeug in `tools/`, headless Browser, Frames pumpen, Zahl aus dem Spiel lesen | [`HARNESS-GATES.md`](HARNESS-GATES.md) |
| Heightfield, Lane, Grat, Terrasse, Spawnpunkt, Begehbarkeit | [`WORLD-LANES.md`](WORLD-LANES.md) |

## Das teuerste Muster dieses Projekts

> **Der Lauf war grün, weil er die falsche Frage gestellt hat.**

Vier belegte Fälle aus Phase 1: `pnpm check` war `vite build` und hat damit bestätigt, dass ein
Bundler bündelt, während ~2500 Zeilen Spielcode nie gebootet waren. Headless Chromium rasterte auf
SwiftShader und lieferte plausible Zahlen. Ein Gefälle-Gate hätte je nach Fenster 50° oder 25° auf
demselben Terrain gemeldet. Und die erste Fassung des Lane-Gates verglich Höhen statt Design-Zusagen
und meldete drei Fehler, von denen zwei Absicht waren.

Das Gegenmittel ist in allen vier Fällen dasselbe: **die Prüfung muss die Zusage prüfen, nicht ihre
Nebenwirkung** — und das Messfenster gehört zur Zahl, nicht in den Kommentar.

## Kanonische lokale Owner

- Boot-Gate und alle Schwellen: `tools/smoke.mjs` — die Prüfungen sind als Design-Zusagen formuliert.
- Browser-Harness, GPU-Abbruchbedingung und die Messtabelle dahinter: Dateikopf von `tools/browser.mjs`.
- Weltfeld-API und die `laneSpine`-Begründung: `ARCHITECTURE.md`.
- Warum eine Zahl in der Welt-Spec so lautet, wie sie lautet: Kommentar an der Konstanten in
  `src/world/spec.js`. Ausführbarer Code schlägt Prosa.
