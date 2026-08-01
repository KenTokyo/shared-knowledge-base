# Shared Docs — gemeinsame Wissensbasis

Ein Submodule (`shared-knowledge-base`), das in jedem Projekt liegt. Es trägt **freiwillige Tipps**, keine
Vorschriften: eine gemessen bessere lokale Lösung hat immer Vorrang und darf den Tipp überschreiben.

**Wie das System wächst und wer was ändern darf: [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md).**

## Wo was liegt

| Ordner / Datei | Inhalt |
|---|---|
| [`LEARNING-SYSTEM.md`](LEARNING-SYSTEM.md) | Die Verfassung: Tippformat, Änderungsrecht, Promotion, Größenbudget |
| [`threejs/`](threejs/) | **Global.** Echtzeit-3D-Tipps, die in mindestens zwei Repos Zeit gekostet haben. Router: [`THREEJS-RULES.md`](THREEJS-RULES.md) |
| [`projects/`](projects/) | **Pro Repository ein Ordner**, benannt wie das Repo. Nur was dort Zeit gekostet hat |
| [`CODING-RULES.md`](CODING-RULES.md) | Arbeitsweise, Loop, Critic — stackneutral |
| [`SCREENSHOT-GUIDE.md`](SCREENSHOT-GUIDE.md) | Muster für ein CLI-Capture-System (headless Wirt, Render-Target, kein `page.screenshot()`) |
| [`CREATE-PROMPT-GUIDE.md`](CREATE-PROMPT-GUIDE.md) | Prompts bauen |
| [`agents/`](agents/) | Arbeitsmodi (Loop ohne Rückfragen, Phasen abhaken) und das [Juicy-Game-UI-System](agents/juicy-game-ui-system.md) |
| [`OALab/`](OALab/) | Kundenprojekt-Betrieb |
| [`playwright-cli/`](playwright-cli/) | Playwright-CLI-Notizen |
| [`old-deprecated/`](old-deprecated/) | Abgelöste Fassungen. Nur zum Nachschlagen, nicht mehr verlinken |

## Projektordner

| Repository | Ordner |
|---|---|
| `voxel-samurai-quiz` | [`projects/voxel-samurai-quiz/`](projects/voxel-samurai-quiz/) |

Weitere Repos legen ihren Ordner selbst an: `projects/<repo-name>/README.md` mit der Trigger-Tabelle,
daneben die Tippdateien. Vorlage ist der Ordner oben.

## Der Ablauf in einer Arbeitsschicht

1. Thema erkennen → **eine** passende Tippdatei lesen (Trigger-Tabelle in der `AGENTS.md` des Repos).
2. Arbeiten.
3. Hat etwas Zeit gekostet, das ein Tipp verhindert hätte → Tipp anlegen. Zwei Zeilen, mit Beleg.
4. Hat ein Tipp nicht gestimmt → stürzen, mit Gegenbeleg. Das ist ausdrücklich erlaubt und erwünscht.

## Grenzen, die das System klein halten

- Ein Tipp lebt an **genau einer** Stelle. Promotion ist Umzug, nicht Kopie.
- **Max. 500 Zeilen und ~12 Tipps pro Datei.** Darüber splitten — nach Trigger, nie in „Teil 2".
- Kein Tipp ohne Beleg. Kein Tipp, den jede KI ohnehin weiß.
- Was ein Gate, ein Guard oder ein Selftest im Code beantwortet, schlägt jeden Tipp: dann ein Link
  auf das Gate statt Prosa.
