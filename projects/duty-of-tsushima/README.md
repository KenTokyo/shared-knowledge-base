# duty-of-tsushima — Projekt-Learnings

**Lesen wenn:** Werkzeug unter `tools/`, Heightfield, Lane, Spawnpunkt, Weltmaßstab oder Waffe im Bild.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Engine-Vertrag: Repo-`ARCHITECTURE.md`; Pflicht/Messregeln: `AGENTS.md`. Hier nur belegte Projektfallen.
Global: [`THREEJS-RULES.md`](../../THREEJS-RULES.md).

## Trigger

| Arbeit | Zuerst lesen |
|---|---|
| Tool, headless Browser, Frame-Pump, Laufzeitzahl | [`HARNESS-GATES.md`](HARNESS-GATES.md) |
| Kennzahl, Schwelle, Tor, Sweep-Ranking | [`METRICS-AND-GATES.md`](METRICS-AND-GATES.md) |
| warme Lichtquelle, Feuerstelle, Emissive, Punktlicht-Slots, §3s Warmanteil | [`WARM-ACCENT-AND-FIRE.md`](WARM-ACCENT-AND-FIRE.md) |
| Frametime, GPU-/Submission-Zeit, Quantil, Rauschboden | [`FRAME-TIMING.md`](FRAME-TIMING.md) |
| Heightfield, Lane, Grat, Terrasse, Spawn, Begehbarkeit | [`WORLD-LANES.md`](WORLD-LANES.md) |
| Weltzahl mit einem Faktor multiplizieren, Kartengröße, Gitterauflösung, Bake-Wechsel | [`WORLD-SCALE.md`](WORLD-SCALE.md) |
| Viewmodel-Lage, Optik, Bauteil aus `PartSet`, Zielpunkt, Shaderquelle in `src/weapons/` | [`WEAPON-VIEWMODEL.md`](WEAPON-VIEWMODEL.md) |
| Terrain-Oberfläche, `splat.js`, Vertexattribut, Maske, lokaler Bildkontrast | [`TERRAIN-SURFACE.md`](TERRAIN-SURFACE.md) |
| Pflanze streuen, Dichte, LOD-Stufe, Blatt-/Kronenform | [`VEGETATION-SCATTER.md`](VEGETATION-SCATTER.md) |
| Textur zur Ladezeit rechnen, Atlasspalte, Decal-Kachel, Normale aus Höhenfeld | [`PROCEDURAL-TEXTURES.md`](PROCEDURAL-TEXTURES.md) |
| Datensatz aus einem Pool wiederverwenden, Instanzring dimensionieren, Referenz auf einen Poolplatz | [`ACTOR-POOLS.md`](ACTOR-POOLS.md) |
| Zustandsmaschine eines Gegners, Abstandsband, Halteregel, Ansturm, Standplatz | [`ENEMY-BEHAVIOUR.md`](ENEMY-BEHAVIOUR.md) |

**Über der Größengrenze, offen:** `METRICS-AND-GATES.md` (22 Tipps), `HARNESS-GATES.md` (21) und
`VEGETATION-SCATTER.md` (15) liegen über den ~12 aus [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md);
ein ungelesener Tipp wirkt nicht. Die Teilung läuft entlang der Trigger, nicht der Menge — bei den
beiden Gate-Dateien trennt sich *Harness-Mechanik* (Browser, Pump, Boot-Fenster, Port) von
*Gate-Entwurf* (was eine Prüfung behauptet, wer die Eingabe erzeugt, welcher Ausschluss blind macht).
Die Schicht vom 2026-08-03 hat deshalb **drei bestehende Tipps geschärft statt drei neue angelegt**
(Gegenstand *und* Bedingung eines Gates · A/B gegen dieselbe Szene ohne das Objekt · der `grep` vor
einem Maßstabsdreh findet nur, was schon steht) und genau zwei neue geschrieben. Die Bossschicht
desselben Tages hat zwei weitere **geschärft** — der Gate-Tipp trägt jetzt die dritte Gestalt
*Umgebung*, der Sender/Hörer-Tipp beide Richtungen — und für die Pool-Findings eine neue Datei
angelegt, weil `ACTOR-POOLS.md` einen eigenen Trigger hat und in keine der bestehenden gehört.
Die Kampagnenschicht vom 2026-08-04 hat nach demselben Maßstab entschieden: der Gate-Tipp *„Eingabe
selbst gesendet"* trägt jetzt die dritte Gestalt **Vorgabe** (das Gate setzt den Sollwert und fragt nie,
welchen das System selbst wählt), die projizierte Fläche steht als neuer Tipp bei den Kennzahlen, und
zwei Verhaltensbefunde haben mit `ENEMY-BEHAVIOUR.md` eine eigene Datei bekommen — Halteband und
Ansturm sind eine Frage an die Zustandsmaschine, nicht an ein Werkzeug.
Die Blindvergleichsschicht vom 2026-08-04 hat aus drei Befunden **zwei** Tipps gemacht: die beiden
Messfehler teilen sich Ursache und Gegenmittel (ein Fall, dessen Antwort vorher feststeht) und stehen
darum als ein Tipp mit zwei Gestalten bei den Kennzahlen, der Entwurf des referenzlosen Vergleichs
bei der Harness — die Trennlinie ist dieselbe wie oben: *was eine Zahl behaupten darf* gegen *wie ein
Werkzeug gebaut wird*.

## Teuerstes Muster

> **Grüner Lauf, falsche Frage.**

Sechs Fälle: Build statt Boot; SwiftShader statt GPU; Gefälle ohne Fenster; Höhen statt Design-Zusage;
7/14 Benchmark-Kameras im Berg trotz 34 grüner Checks, weil Gate Spielerkamera prüfte; „Tiefschatten“ konstant
0,0 %, weil Post-Lift Boden 0,135 über Schwelle 0,10 hob. Beide letzten Fälle erzeugten falsche Baselines und
verdächtigten funktionierende Materialien.

Gegenmittel: **Prüfung misst Zusage, Messfenster gehört zur Zahl.** Konstante Kennzahl misst Instrument;
abgeleitete Daten scheitern nicht, sondern antworten falsch.

## Zweitteuerstes Muster

> **Der Rückfall — eine aufgeschriebene Regel handelt nicht.**

Zwei Fälle in einer Schicht: Backtick im eingebetteten Shader (die Regel stand seit `ui/style.js` im
Plan), `ring()` als gedeckelter Zylinder (die Falle war beim Karabiner gefunden und mit `hoop()`
beantwortet). Beide fand eine Maschine — der Bundler und das Viewmodel-Gate —, keine Erinnerung.

Gegenmittel: **was mechanisch prüfbar ist, gehört in den `check`, und die Regel gehört an die Stelle
im Code, an der getippt wird.** Eine zweite Notiz derselben Regel ist kein Gegenmittel.

**Dritter Fall, eine Schicht später, und er schärft die Regel:** drei getippte Weltkoordinaten in
`shrines/index.js` überlebten den Maßstabsdreh nicht — getippt 00:07, Maßstab gedreht 01:15
desselben Tages. Hier hätte auch das beste Gedächtnis nichts ausgerichtet, weil die Stelle zum
Tippzeitpunkt **richtig war**; gefunden hat sie ein Gate, das eine Woche später entstand. Daraus
folgt der Zusatz: gegen Rückfälle hilft eine Prüfung, gegen *Alterung* hilft nur eine Prüfung, die
das **Ergebnis** misst statt der Konstanten — und die entsteht erfahrungsgemäß erst, wenn jemand
die Zusage einmal ausschreibt.

## Lokale Owner

- Boot-Gates/Schwellen: `tools/smoke.mjs`
- Browser/GPU-Abbruch/Messtabelle: Kopf `tools/browser.mjs`
- Zeitmessung samt Gegenproben: Kopf `tools/perf.mjs`
- Weltfeld/`laneSpine`: `ARCHITECTURE.md`
- Welt-Spec-Zahlen: Kommentare in `src/world/spec.js`; Code schlägt Prosa
