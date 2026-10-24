# Shared Docs — gemeinsame Regeln

Ein Submodule (`shared-knowledge-base`), das in jedem Projekt liegt. Hier stehen nur noch Arbeitsregeln und
Prüfwege, die für mehrere Projekte gelten. **Fachwissen steckt in Skills** (z. B. `threejs-leistung`,
`elevenlabs-ton`, `game-ui-graffiti`) und wird erst geladen, wenn die Aufgabe es braucht.

Seit 24.10.2026 gelöscht (alte Learnings, die heutige Modelle nicht mehr brauchen): Three.js-Regeln und
`threejs/`, Projekt-Learnings `projects/` (u. a. Claude/Duty of Tsushima), `world/`, `LEARNING-SYSTEM.md`,
Sound-Regeln, alte Prompt-Leitfäden und Map-Prompts, `old-deprecated/`. Sie liegen in der Git-Geschichte.

## Als Submodule hinzufügen

```bash
git submodule add https://github.com/KenTokyo/shared-knowledge-base shared-docs
git submodule update --init --recursive
```

## Wo was liegt

| Datei / Ordner | Inhalt | Wann lesen |
|---|---|---|
| [`CODING-RULES.md`](CODING-RULES.md) | Unsere Arbeitsregeln (Auftrag, Prüfen, Git, Schreiben) | einmal je frischem Kontext |
| [`CODING-RULES-ZUSATZ.md`](CODING-RULES-ZUSATZ.md) | Zusatz für Nicht-Frontier-Modelle | nur ohne „Frontier“-Angabe |
| [`FRONTEND-RULES.md`](FRONTEND-RULES.md), [`REACT-PERFORMANCE.md`](REACT-PERFORMANCE.md) | React, Zustand, Layout-Abnahme | erst beim Ändern einer UI-Datei |
| [`GAME-UI-GUIDE.md`](GAME-UI-GUIDE.md), [`ui/`](ui/) | Spiel-UI-Hausstil Premium-Graffiti | erst beim Ändern einer Spiel-Oberfläche |
| [`SCREENSHOT-GUIDE.md`](SCREENSHOT-GUIDE.md), [`IDLE-PERFORMANCE.md`](IDLE-PERFORMANCE.md) | Prüfbrowser, Bilder, Leerlauf | vor Browser- bzw. Leerlaufprüfung |
| [`MACOS-RESSOURCEN.md`](MACOS-RESSOURCEN.md), [`WINDOWS-RESSOURCEN.md`](WINDOWS-RESSOURCEN.md) | Pfade, Ports, Projekte | nur das eigene System, bei Bedarf |
| [`prompts/`](prompts/README.md) | Spiel-Redesign-Prompts | auf Wunsch |
| [`agents/`](agents/) | Phasen ohne Stopps, Deckel je Achse, Sprachweise | auf Verweis |
| [`OALab/`](OALab/), [`playwright-cli/`](playwright-cli/), [`tests/`](tests/), [`data/`](data/) | Kundenbetrieb, CLI-Notizen, Modell-Testprompts, Kostendaten | nur für diese Aufgabe |

## Grenzen

- Eine Regel lebt an genau einer Stelle; keine Kopien in Projekt-Dateien.
- Höchstens 200 Zeilen je Regeldatei. Kein Tipp, den jede KI ohnehin weiß.
- Was ein Prüftor im Code beantwortet, schlägt jeden Text: dann auf das Tor verweisen.
