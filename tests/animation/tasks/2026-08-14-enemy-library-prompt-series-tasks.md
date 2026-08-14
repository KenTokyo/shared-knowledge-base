# Enemy-Library-Promptserie

## Initial goal

- Prompt: `2026-08-14-enemy-library-prompt-series-prompt.md`
- Vier kompakte, eigenständig ausführbare Projektprompts für Enemy Libraries erzeugen.
- Je Prompt exakt 20 Gegner: fünf frei entwickelte Gruppen mit je vier Gegnern.

## Phasen

- [x] P1 — Promptregeln, aktuelle Short-first-Tipps und bestehende Animation-/VFX-Promptmuster prüfen.
- [x] P2 — Zwei Short- und zwei Medium-Varianten mit unterschiedlichen Stilrichtungen schreiben.
- [x] P3 — Promptlexikon um Enemy-Library-, Animations- und VFX-Begriffe ergänzen.
- [x] P4 — Metadaten, Umfang, Vergleichbarkeit, UTF-8 und Zeilenlimits statisch prüfen.

## Entscheidungen

- Vier Varianten statt fünf: Voxel, facettiertes Low-Poly, leuchtende Konstrukte und stilisierte Dark-Fantasy-Miniaturen.
- Jede Variante lässt fünf Gruppenthemen, Gegnernamen und konkrete Angriffe vollständig durch das ausführende Modell bestimmen.
- Gemeinsamer Produktumfang: Library, Gruppenfilter, Gegnerauswahl, Orbitansicht, Idle/Walk/Attack, Replay, Pause und Geschwindigkeit.
- Leichte Emission, Trails und Kontaktimpulse unterstützen die Bewegung, verdecken sie aber nicht.
- React, Vite, Three.js, TypeScript und pnpm bleiben über alle Varianten konstant.
- Reine Prompt-/Dokumentationsarbeit: keine Tests, Builds, Serverstarts oder Sichtprüfungen.

## Findings

- Bewertungswissen stützt Short-first auf tragfähiger Basis, aber Animation braucht klare Kraftkette, Kontakt und Recovery.
- 20 vollständig unterschiedliche Modelle sind in einem Lauf riskant; fünf Gruppen mit gemeinsamem Formvokabular schaffen Wiederverwendung ohne reine Umfärbungen.
- Prozedurale Stile sind für eine assetfreie 20er-Library belastbarer als ein fotorealistischer Anspruch.

## Fortschrittslog (append-only)

### Runde 1 — 2026-08-14 — Vergleichsrahmen festgelegt

- Nutzerangabe als fünf Gruppen × vier Gegner interpretiert.
- Zwei kurze und zwei mittlere Promptdichten gewählt.
- Vier technisch realistische Stilrichtungen mit identischem Funktionsumfang festgelegt.

### Runde 2 — 2026-08-14 — Vier Projektprompts geschrieben

- V1 Voxel und V2 facettiertes Low-Poly bleiben kurz und geben viel Gestaltungsfreiheit.
- V3 leuchtende Konstrukte und V4 Dark Fantasy ergänzen gezielt Materialwirkung beziehungsweise körperliche Kraftkette.
- Alle Varianten enthalten 20 Gegner, fünf Gruppenfilter, Idle/Walk/Attack, Orbit-Vorschau, Wiedergabesteuerung und leichte Treffer-VFX.
- Gruppen, Namen und einzelne Angriffe bleiben vollständig offen.

### Runde 3 — 2026-08-14 — Promptlexikon angelegt

- Neues `shared-docs/data/prompt-lexicon.json` mit Stack, Rig-, Animations-, Vorschau- und Trail-Begriffen angelegt.
- Qualitätswörter decken Form, Material, Bewegung, Lesbarkeit und Finish ohne redundante Superlativketten ab.
- Direktiven halten 20 Gegner, fünf Vierergruppen, Animationen, Port und Registrierung fest.

### Runde 4 — 2026-08-14 — Statischer Abschluss

- Vier Überschriften, vier Prompt-IDs, vier HTML-Titel, vier feste-Port-Anweisungen und vier Registrierungen bestätigt.
- Jeder Prompt nennt exakt 20 Gegner sowie fünf Gruppen mit je vier Mitgliedern.
- Promptkörper sind bewusst gestaffelt: V1 148, V2 153, V3 200 und V4 193 Wörter.
- Promptserie liegt mit 59 Zeilen, Lexikon mit 44 Zeilen und Taskdateien mit je deutlich unter 800 Zeilen im Limit.
- JSON-Lexikon ist syntaktisch gültig; keine UTF-8-Ersatzzeichen oder nachgestellten Leerzeichen gefunden.
- Keine Tests, Builds, Serverstarts oder Sichtprüfungen ausgeführt.
