# Shared Docs — gemeinsame Wissensbasis

Ein Submodule (`shared-knowledge-base`), das in jedem Projekt liegt. Technische Learnings bleiben **freiwillige
Tipps**: eine gemessen bessere lokale Lösung hat Vorrang. Daneben stehen zentral gepflegte Arbeitsregeln, die
verbindlich werden, sobald die lokale `AGENTS.md` sie übernimmt.

**Wie das System wächst und wer was ändern darf: [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md).**

## Wo was liegt

| Ordner / Datei | Inhalt |
|---|---|
| [`LEARNING-SYSTEM.md`](LEARNING-SYSTEM.md) | Die Verfassung: Tippformat, Änderungsrecht, Promotion, Größenbudget |
| [`threejs/`](threejs/) | **Global.** Echtzeit-3D-Tipps, die in mindestens zwei Repos Zeit gekostet haben. Router: [`THREEJS-RULES.md`](THREEJS-RULES.md) |
| [`projects/`](projects/) | **Pro Repository ein Ordner**, benannt wie das Repo. Nur was dort Zeit gekostet hat |
| [`CODING-RULES.md`](CODING-RULES.md) | Verbindliche Orchestrierung: Kontextanker, Umsetzung, Echtzeit-3D, Validierung und Git |
| [`SCREENSHOT-GUIDE.md`](SCREENSHOT-GUIDE.md) | Technischer Owner nur für die freiwillige, auf 1–2 Sichtprüfungen begrenzte CLI-Capture-Ausnahme |
| [`WINDOWS-RESSOURCEN.md`](WINDOWS-RESSOURCEN.md) | Häufig genutzte Windows-Projekte: Zweck, absolute Pfade, Stack, Sprache und lokale Ports |
| [`CREATE-PROMPT-GUIDE.md`](agents/CREATE-PROMPT-GUIDE.md) | Prompts bauen |
| [`agents/`](agents/) | Nur per Trigger: [Phasenworkflow](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md), [Deckel pro Achse](agents/MAX-5-VERBESSERUNGEN-DANN-WEITER.md), [Juicy-Game-UI](agents/juicy-game-ui-system.md) |
| [`OALab/`](OALab/) | Kundenprojekt-Betrieb |
| [`playwright-cli/`](playwright-cli/) | Playwright-CLI-Notizen |
| [`old-deprecated/`](old-deprecated/) | Abgelöste Fassungen. Nur zum Nachschlagen, nicht mehr verlinken |

## Projektordner

| Repository | Ordner |
|---|---|
| `voxel-samurai-quiz` | [`projects/voxel-samurai-quiz/`](projects/voxel-samurai-quiz/) |
| `Claude-Flakes` | [`projects/claude-flakes/`](projects/claude-flakes/) |
| `Claude-of-tsushima` | [`projects/claude-of-tsushima/`](projects/claude-of-tsushima/) |

Weitere Repos legen ihren Ordner selbst an: `projects/<repo-name>/README.md` mit der Trigger-Tabelle,
daneben die Tippdateien. Vorlage ist der Ordner oben.

## Der Ablauf in einer Arbeitsschicht

1. Lesepfad aus [`CODING-RULES.md`](CODING-RULES.md) folgen; nur bei belegtem Projekttrigger **eine** passende Tippdatei lesen.
2. Arbeiten.
3. Hat etwas Zeit gekostet, das ein Tipp verhindert hätte → Tipp anlegen. Zwei Zeilen, mit Beleg.
4. Hat ein Tipp nicht gestimmt → stürzen, mit Gegenbeleg. Das ist ausdrücklich erlaubt und erwünscht.
5. Nach **3–5 Verbesserungen an derselben Achse**: Achse schließen, Deltas festhalten, weiter an etwas
   Neuem → [`agents/MAX-5-VERBESSERUNGEN-DANN-WEITER.md`](agents/MAX-5-VERBESSERUNGEN-DANN-WEITER.md).

## Grenzen, die das System klein halten

- Ein Tipp lebt an **genau einer** Stelle. Promotion ist Umzug, nicht Kopie.
- **Max. 500 Zeilen und ~12 Tipps pro Datei.** Darüber splitten — nach Trigger, nie in „Teil 2".
- Kein Tipp ohne Beleg. Kein Tipp, den jede KI ohnehin weiß.
- Was ein Gate, ein Guard oder ein Selftest im Code beantwortet, schlägt jeden Tipp: dann ein Link
  auf das Gate statt Prosa.
