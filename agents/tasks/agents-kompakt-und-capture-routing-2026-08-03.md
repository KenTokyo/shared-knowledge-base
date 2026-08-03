# Projekt-AGENTS kompakt halten und Capture-Routing verstecken

## Userziel
- Alle drei Spiel-`AGENTS.md` auf kompakte lokale Pflichtangaben prüfen.
- Pro Projekt höchstens vier verlinkte Dokumente zulassen.
- Den Screenshot-Guide aus den Projektdateien entfernen.
- Das lokale Capture-System zuerst suchen; den Guide nur bei unklarem oder fehlendem Einstieg lesen.

## Lösungsvergleich
1. Nur die drei Screenshot-Links löschen → klein, aber der gewünschte Fallback bleibt unklar.
2. Capture-Regeln in jeder `AGENTS.md` wiederholen → auffindbar, aber nicht kompakt und schnell widersprüchlich.
3. Projektdateien auf lokale Fakten begrenzen; Capture-Fallback einmal tief in `CODING-RULES.md` halten → kompakt und eine gemeinsame Wahrheit. **Gewählt.**

## Phasen

### ✅ Phase 1 — Gemeinsames Capture-Routing
**Ziel:** Der Screenshot-Guide ist kein Standard-Lesepfad mehr.
- [x] Capture aus der sichtbaren Owner-Aufzählung entfernen.
- [x] Projektlokalen Einstieg zuerst suchen; Guide nur bei unklarem oder wirklich fehlendem Einstieg lesen.
- [x] Regeln, Links und UTF-8 geprüft; reine Dokuänderung benötigt keinen Typecheck.
**Ergebnis-Satz:** Capture-Hilfe erscheint erst, wenn das lokale Werkzeug nicht auffindbar ist.
**Eingehalten:** eine gemeinsame Regelquelle, kein neuer Capture-Vertrag, keine Sichtprüfung.
**Architektur passt:** `CODING-RULES.md` besitzt den allgemeinen Fallback; `THREEJS-RULES.md` routet 3D-Review bereits zum Fachowner.
**Auffälligkeiten/Performance/Kritische Findings:** keine Laufzeitänderung.
**Referenzen:**
- `shared-docs/CODING-RULES.md`
- `shared-docs/THREEJS-RULES.md`

### Phase 2 — Drei Projektdateien vereinheitlichen
**Ziel:** Jede Spiel-`AGENTS.md` bleibt kurz, lokal und unter vier Dokumentlinks.
- [ ] Voxel Samurai Quiz prüfen und direkten Screenshot-Guide entfernen.
- [ ] Quiz Blaster Arena kompakt angleichen und harte 1.600-LOC-Grenze ergänzen.
- [ ] Crossword Core Breaker kompakt angleichen und harte 1.600-LOC-Grenze ergänzen.
**Ergebnis-Satz:** Agenten sehen zuerst nur Pflichtregeln, Projektpfade, 3D-Router und Lieferung.
**Eingehalten:** Zielbranches `main/main/v2`, fremde Änderungen unangetastet, höchstens vier Links.
**Architektur passt:** Gemeinsame Arbeitsweise bleibt im Submodule; lokale Dateien enthalten nur Projektbesonderheiten.
**Auffälligkeiten/Performance/Kritische Findings:** Voxel enthält parallele uncommittete Änderungen; nur eigene Hunks stagen.
**Referenzen:**
- `voxel-samurai-quiz/AGENTS.md`
- `quiz-blaster-arena/AGENTS.md`
- `crossword-core-breaker/AGENTS.md`

### Phase 3 — Gesamtprüfung und Lieferung
**Ziel:** Alle drei Repositories verweisen auf denselben gelieferten Regelstand.
- [ ] Linkzahl, Linkziele, Screenshot-Verweise und Mojibake in allen Projektdateien prüfen.
- [ ] Shared-Docs zuerst pushen, danach die drei Submodule-Pointer und Projektdateien auf ihren Zielbranches liefern.
- [ ] Userziel und alle Phasenpunkte abschließend gegenlesen.
**Ergebnis-Satz:** Die kompakte Struktur ist in allen drei Projekten verfügbar.
**Eingehalten:** keine Codeprüfung bei reinen Dokuänderungen, selektives Staging, Submodule zuerst.
**Architektur passt:** Ein zentraler Regelstand, drei dünne lokale Einstiege.
**Auffälligkeiten/Performance/Kritische Findings:** offen bis Abschlussaudit.

## Arbeitsprotokoll

### Phase 1 — Status success
**Dateien:** `CODING-RULES.md` — Capture aus dem frühen Owner-Block entfernt und als tiefer Fallback neu formuliert; `agents/tasks/agents-kompakt-und-capture-routing-2026-08-03.md` — Auftrag und Nachweis angelegt.
**Entscheidungen:** Lokale Pfadkarte, `package.json` und `scripts/` gewinnen; der Screenshot-Guide wird nur bei unklarem oder fehlendem Einstieg gelesen.
**Unsicher / Risiko:** keines.

## Offene Fix-Punkte
- [ ] Keine direkten `SCREENSHOT-GUIDE.md`-Links in Projekt-`AGENTS.md`.
- [ ] Höchstens vier Markdown-Dokumentlinks pro Projekt-`AGENTS.md`.
