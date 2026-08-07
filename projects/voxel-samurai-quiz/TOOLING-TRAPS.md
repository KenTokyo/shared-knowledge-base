# Werkzeugfallen — voxel-samurai-quiz (Quizfall World Runtime)

**Lesen wenn:** Welt-CLI, Sonde, `.mjs`/Shader, SSoT-Tabelle, Komponentensplit oder Commit.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Jeder Tipp kostete mindestens einen Durchgang.

## Aufruf

- **Gepiptes `world:inspect` wirkt grün** — `inspect | tail` liefert letzten Pipe-Exit; Warnungen sind ungegatet. → Exit unpipet sichern; Volltext lesen.
  *Pipe Exit 0 statt Gate Exit 1; weitere Defekte nur im Text · 2026-07-30*

- **Ausgabe wird „Binary file matches“** — NUL macht `grep` binär. → Vor Filtern `tr -d '\000'`; `grep -a`.
  *Vorhandene Ausgabe erschien nur als „Binary file matches“ · 2026-08-01*

- **Hintergrundsonde endet leer** — `run_in_background` starb dreimal und wirkte gehängt. → Vordergrund, großzügiger Timeout.
  *14 Zeilen ~29 s, `--site` ~22 s; `camwall.mjs` 101 s vs. `playpass.mjs` 25 s · 2026-08-01*

## Schreiben

- **`node --check` übersieht NUL** — Datei parst, Ausgabe bleibt unbrauchbar. → Nach Write Byte `0` suchen; Index muss `-1` sein.
  *NUL-Datei bestand `node --check`, Byte-Suche fand Index ≥0 · 2026-08-01*

- **Shader-Kommentar beendet Template-Literal** — Backtick in `GrassField.js`-Kommentar schließt Shader; Meldung nur `Unexpected identifier`. → Shader-Kommentare ohne Backticks; nach Edit `node --check`.
  *P14n/P14o/P14q: gleiche Falle je ein Durchgang · 2026-08-01*
  **Schlimmer bei geradem Backtickpaar:** `` `.a` `` im Kommentar schließt das Literal und macht aus dem Rest ein
  **Tagged Template** — gültiges JS. `node --check` und `pnpm type-check` bleiben grün, der Bruch kommt erst beim
  Laden als `TypeError: "…".a is not a function`, reißt die R3F-Canvas mit und löscht `__svq`; jedes Messwerkzeug
  meldet danach nur die Folge (`worldReady=false`, `__svq undefined`). → Backticks in Shader-Kommentaren nicht
  „ausbalancieren", sondern weglassen; Erklärungen in JS-Blockkommentare **vor** das Literal. Statische Gates
  taugen hier nicht als Beleg — eine Seitenkonsole (`pageErrors`) beantwortet die Frage in einem Lauf.
  *`dungeonGrass.js` `VERT_BODY`: zwei Durchgänge verloren, weil beide Fehlerbilder auf einen GLSL-Compile-Fehler
  zeigten · 2026-08-03*

- **Shader-Gate grün, Treiber bricht trotzdem ab** — das Asset-Lab-Gate prüfte nur Deklarationen, Attribute, Klammern, Uniformwerte und Farbpfad; Swizzle außerhalb der Komponentenzahl und reservierte Wörter fielen durch. → `pnpm asset-lab:shader-gate --entry=<slug>/<target>` deckt beide seit 2026-08-05 mit ab (`scripts/asset-lab/assetLabGlslIdentifierChecks.mts`); der repoweite `pnpm vfx:shader-reserved-lint` zählt Benchmark-Ordner nur unter `--strict` und schweigt im eigenen Ordner sonst.
  *2 Compile-Fehler in 17 Surfaces trotz grünem Gate, grünem Guard und grünem Typecheck · 2026-08-05*

- **Gate meldet Code als fehlend, der dasteht** — eigener Regex-Kommentar-Stripper (`/\/\*[\s\S]*?\*\//` + `/\/\/[^\n]*/`) kennt keinen Kontext; `/*` in einem Glob-Pfad, `//` in einem String oder `*/` in einer Regex frisst echten Code bis zum nächsten Blockende. → Nie neu schreiben, `stripSourceComments` aus `scripts/gate-kit/stripSourceComments.mts` importieren (Zustandsstapel für String, Template, Regex, Kommentar).
  *24 Kopien in 23 Gate-Skripten; Sonde über 8409 Dateien: 144 Dateien, wo die alte Fassung Code fraß, davor zwei Durchgänge auf falscher Fährte · 2026-08-06*

- **Gate wird rot nach fremdem Komponentensplit** — Gates lesen Quelldateien per hartkodiertem Pfadstring; ein Split verschiebt den Besitzer, der Pfad zeigt ins Leere und der Guard meldet „nicht lesbar" statt der echten Ursache. → Beim Verschieben einer gelesenen Datei `scripts/**` nach dem alten Pfad greppen und im selben Schnitt umstellen; Gates ohne Leerlauf-Guard messen sonst still gegen `NaN`.
  *`AppCanvas.tsx`-Split traf `_meguri-height-gate` (41 ok/3 FAIL) und `_aonagi-layout-gate`; beide grün nach Pfadfix · 2026-08-06*

- **`CameraRig.js`-Grep verfälscht Kommentarzeichen** — Ausgabe stellt `//` als `\` dar. → Aussagen per direktem Read prüfen.
  *Grep und Read unterschieden sich an Kommentarzeichen · 2026-08-01*

- **SSoT-Zeile still abgeschnitten** — Leerzeile spaltet Tabelle; unescaptes `|` beendet Zelle. → Text-Pipes `\|`; je `| P…` vier unescapte Trenner zählen; kein awk/sed/perl.
  *P15b verlor gerendert ~3.400 Zeichen · 2026-08-01*

## Artefakte und Git

- **Probe mischt alte/neue Frames** — überschriebenes `review/probe/` plus alte Prefix-PNGs verfälschen Sweep. → Beleg sichern; jeder Lauf in leeren, laufgescopten Pfad.
  *Alte Prefix-Frames verfälschten PH18-Tabellen · 2026-07-31*

- **`git checkout` als Messungs-Undo** — Gegenmessung überschreibt fremde/ungetrackte Arbeit außerhalb Diff. → Zieldatei nach `.tmp/`, gezielt restaurieren, byte-identisch diffen.
  *`src/engine/`, `scripts/world/`, and `public/quizfall-world/` sat outside the inspected diff · 2026-08-01*
