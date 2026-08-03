# Alte und neue Coding-Regeln zusammenführen

## Userziel
- `AGENTS.md` und den verbindlichen Phasenworkflow einhalten.
- `CODING-RULES.md` wieder am ausführlichen, praxisnahen Aufbau von `CODING-RULES_old.md` ausrichten.
- Die stärkeren Regeln der kompakten neuen Fassung erhalten und Widersprüche, Dopplungen sowie veraltete Pfade beseitigen.
- Folgeauftrag: `AGENTS.md` um eine kompakte Projektarchitektur ergänzen und 1.600 LOC als harte Pflichtgrenze in allen aktiven Regelstellen verankern.

## Lösungsvergleich
1. **Alte Datei unverändert zurückkopieren:** schnell, verliert aber neue Regeln zu Lesepfad, Änderungsmaß, Prüfbudget und Git-Lieferung.
2. **Neue Datei nur ergänzen:** behält Kompaktheit, erreicht aber nicht den gewünschten ausführlichen alten Stil.
3. **Alte Struktur als Basis, neue Leitplanken integriert und redaktionell entdoppelt:** höchste Inhaltsabdeckung bei klarer Priorität. **Gewählt.**

## Phasen

### ✅ Phase 1 — Inhaltsarchitektur und Kernworkflow
**Ziel:** Die Datei besitzt wieder einen ausführlichen, gut auffindbaren Aufbau und enthält die aktuellen Orchestrierungsregeln.
- [x] Scope, Vorrang und ausgelösten Lesepfad eindeutig festgelegt.
- [x] Grundhaltung, eigenständiges Durcharbeiten, Kontext und Kommunikation aus der alten Fassung übernommen.
- [x] Neue Regeln zu Lückenmaß, System-vor-Feinschliff und gebündeltem Prüfbudget integriert.
**Ergebnis-Satz:** Agenten erhalten wieder konkrete Handlungsregeln statt nur einer Kurzfassung.
**Warum:** Der User bevorzugt die Umsetzbarkeit und Vollständigkeit der alten Fassung.
**Eingehalten:** Single Source of Truth, keine Parallelregeldatei, Userauftrag vor allgemeiner Regel.
**Architektur passt:** `CODING-RULES.md` bleibt zentraler Router; Fachdetails bleiben in ihren Owner-Dokumenten.
**Auffälligkeiten/Performance/Kritische Findings:** Die alte Fassung enthält Dopplungen und einen veralteten Workflow-Pfad; nicht blind kopieren.
**Referenzen:**
- `shared-docs/CODING-RULES.md`
- `shared-docs/CODING-RULES_old.md`
- `shared-docs/agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md`

### ✅ Phase 2 — Fachregeln und Qualitätsgates
**Ziel:** Praxisnahe Regeln für Architektur, React, UI, Echtzeit-3D, Tests und Lieferung sind vollständig, widerspruchsfrei und geroutet.
- [x] Architektur-, React-, UI- und Performance-Regeln aus der alten Fassung redaktionell konsolidiert.
- [x] Sichtprüfung als freiwillige 3D-Ausnahme mit absolutem Zwei-Prüfungen-Deckel erhalten.
- [x] Typecheck-, Test-, Prozess-, Git- und Wissensregeln eindeutig zusammengeführt.
**Ergebnis-Satz:** Die Regeln decken den Entwicklungsalltag wieder konkret ab, ohne fachliche Owner zu duplizieren.
**Warum:** Die Kurzfassung ließ wichtige Guardrails nur implizit oder gar nicht erkennen.
**Eingehalten:** keine automatischen UI-/Gameplay-Tests, keine Worktrees, gebündelte Gates, nur eigene Dateien stagen.
**Architektur passt:** Universelle Regeln stehen zentral; Three.js-, Multiplayer- und Framework-Details werden geroutet.
**Auffälligkeiten/Performance/Kritische Findings:** Alte Regel „Commit erst nach allen Phasen“ kollidiert mit aktueller Pflicht „jede kompilierfähige Einheit“; aktuelle Pflicht gewinnt.
**Referenzen:**
- `shared-docs/CODING-RULES.md`
- `shared-docs/THREEJS-RULES.md`
- `shared-docs/SCREENSHOT-GUIDE.md`

### ✅ Phase 3 — Abschlussaudit und Lieferung
**Ziel:** Alle Useranforderungen, Links, Encoding- und Git-Regeln sind geprüft und die Änderung ist sauber geliefert.
- [x] Alle Phasenpunkte gegen die finale Datei erneut geprüft.
- [x] Links, Überschriften, Widersprüche, UTF-8/Mojibake und Diff kontrolliert.
- [x] Reine Dokuänderung ohne Typecheck begründet geliefert; Shared-Docs-Commit `93698c0` gepusht, Eltern-Pointer folgt regelkonform.
**Ergebnis-Satz:** Die gemischte Coding-Rules-Fassung ist nachvollziehbar geprüft und im Zielbranch verfügbar.
**Warum:** Die Abschlussprüfung verhindert ausgelassene Regeln und beschädigte Referenzen.
**Eingehalten:** Dokuänderung ohne unnötige Codeprüfung, Main-Branch, präzise Commits.
**Architektur passt:** Nur die kanonische Regeldatei und ihr Arbeitsnachweis werden geändert.
**Auffälligkeiten/Performance/Kritische Findings:** offen bis Audit.
**Referenzen:**
- `shared-docs/CODING-RULES.md`
- `shared-docs/agents/tasks/coding-rules-alt-neu-zusammenfuehrung-2026-08-03.md`

### ✅ Phase 4 — Kompakte Projektarchitektur und harte LOC-Grenze
**Ziel:** Agenten finden zentrale Projektbereiche direkt in `AGENTS.md`; handgepflegte Codedateien bleiben verpflichtend unter 1.600 LOC.
- [x] `AGENTS.md` ohne Wiederholung der Coding Rules um eine kompakte Pfadarchitektur ergänzt.
- [x] 1.600 LOC als vierte lokale Pflichtregel und harte universelle Codegrenze formuliert.
- [x] Veraltete 700-Zeilen-Beispiele im verbindlichen Phasenworkflow auf 1.600 LOC umgestellt.
- [x] Regelstellen, Diff, Links, Architekturpfade und UTF-8 geprüft; reine Dokuänderung benötigt keinen Typecheck.
- [x] Shared-Docs als Commit `6aa831c` gepusht; `AGENTS.md` und finaler Submodule-Pointer für die direkte Elternrepo-Lieferung vorbereitet.
**Ergebnis-Satz:** Dateibesitz ist sofort auffindbar und übergroße handgepflegte Codedateien sind verbindlich verboten.
**Warum:** Eine weiche Split-Empfehlung setzt kein belastbares Maximum; die lokale Architektur spart unnötige Suche.
**Eingehalten:** kompakte AGENTS-Datei, keine Wiederholung allgemeiner Coding Rules, bestehende Fremdänderungen bleiben erhalten.
**Architektur passt:** Projektpfade stehen lokal; universelle Grenzdefinition bleibt in `CODING-RULES.md`; Workflow-Beispiele verwenden denselben Wert.
**Auffälligkeiten/Performance/Kritische Findings:** Parallele Fremdänderungen in `AGENTS.md` und `CODING-RULES.md` müssen beim selektiven Staging unangetastet bleiben.
**Referenzen:**
- `AGENTS.md`
- `shared-docs/CODING-RULES.md`
- `shared-docs/agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md`

### ✅ Phase 5 — Nachlauf-Audit des lokalen Folge-Commits
**Ziel:** Die neuen Grundton-Vorgaben bleiben erhalten, ohne bereits zusammengeführte Pflichtregeln wieder zu verlieren.
- [x] Entfernte Regeln zu Geltung/Priorität, Capture-Owner und Chat-Titel wiederherstellen.
- [x] Neue Grundton-Punkte sprachlich verbindlich und konsistent einordnen.
- [x] Gesamtdiff, Links, UTF-8/Mojibake und alle Phasenpunkte erneut prüfen.
- [x] Shared-Docs zuerst liefern; danach ausschließlich den vorbereiteten Eltern-Pointer nachziehen.
**Ergebnis-Satz:** Der redaktionelle Nachlauf ergänzt den gewünschten Grundton, ohne die abgeschlossene Regelzusammenführung zurückzudrehen.
**Warum:** Die lokale Folgebearbeitung ergänzte den gewünschten Grundton, entfernte dabei aber drei bereits auditierte Vorgaben und beschädigte die Owner-Aufzählung.
**Eingehalten:** append-only Arbeitsnachweis, keine Fachowner-Duplikate, reine Dokuänderung ohne Typecheck.
**Architektur passt:** `CODING-RULES.md` bleibt die eine gemeinsame Regelquelle; der bestehende Task dokumentiert auch den Nachlauf.
**Auffälligkeiten/Performance/Kritische Findings:** Keine Code- oder Laufzeitänderung; Lieferstatus noch offen.
**Referenzen:**
- `shared-docs/CODING-RULES.md`
- `shared-docs/agents/tasks/coding-rules-alt-neu-zusammenfuehrung-2026-08-03.md`

## Kommentare

### Phase 1
**Eingehalten:** Userauftrag vor gemeinsamer Regel ✅, ausgelöster Lesepfad ✅, eine kanonische Regeldatei ✅, Phasenformat ✅
**Auffälligkeiten (nach Schwere):** Veralteter Pfad `agents/commands/...` aus der alten Fassung nicht übernommen; aktueller Workflow liegt direkt unter `agents/`.

### Phase 2
**Eingehalten:** alte Praxistiefe ✅, neue 3D-Leitplanken ✅, gebündelte Gates ✅, Git-Einheiten ✅, keine Fachowner-Duplikate ✅
**Auffälligkeiten (nach Schwere):** Commit-Regel konfliktfrei auf die aktuelle strengere Lieferung jeder konsistenten Einheit vereinheitlicht.

### Phase 3
**Eingehalten:** vollständiger Wiederholungscheck ✅, alle Markdown-Links vorhanden ✅, UTF-8 ohne BOM/Mojibake ✅, `git diff --check` grün ✅, Shared-Docs gepusht ✅
**Auffälligkeiten (nach Schwere):** Keine offenen Inhalts-, Encoding- oder Lieferfehler.

### Phase 4
**Eingehalten:** kompakte Pfadkarte ✅, vier lokale Pflichtregeln ✅, harte 1.600-LOC-Grenze ✅, Workflow-Werte konsistent ✅, Links/Pfade/UTF-8 ✅, Shared-Docs gepusht ✅
**Auffälligkeiten (nach Schwere):** 🟡 29 bestehende handgepflegte oder skriptartige Dateien liegen bereits über 1.600 Zeilen; die neue Regel verlangt ihre fachliche Aufteilung, sobald sie in einem Auftrag berührt werden. Parallele Fremdänderungen wurden nicht gestagt.

### Phase 5
**Eingehalten:** wichtige Altregeln erhalten ✅, neuer Grundton ✅, Linkziele ✅, UTF-8 ohne BOM/Mojibake ✅, `git diff --check` grün ✅
**Auffälligkeiten (nach Schwere):** Der lokale Folgediff hatte Geltung/Priorität, Capture-Owner und Chat-Titel entfernt; vor der Lieferung vollständig korrigiert.

## Arbeitsprotokoll

### Phase 1 — Status success
**Dateien:** `CODING-RULES.md` — Priorität, Lesepfad, Grundhaltung, Loop und Phasenworkflow neu aufgebaut.
**Entscheidungen:** Alte Struktur als Basis; neue Orchestrierung bleibt verbindlich; kleine Aufgaben benötigen ohne Projektvorgabe keinen künstlichen Plan.
**Unsicher / Risiko:** keines.

### Phase 2 — Status success
**Dateien:** `CODING-RULES.md` — Architektur, React, UI, 3D, Validierung, Craft, Git, Wissen und Kommunikation konsolidiert.
**Entscheidungen:** UI-Tests bleiben Opt-in; nur Echtzeit-3D besitzt die freiwillige, absolut auf zwei Prüfungen begrenzte Ausnahme.
**Unsicher / Risiko:** Sichtbare Produktqualität bleibt ohne Userfreigabe ein manuelles Gate, nicht durch Typecheck beweisbar.

### Phase 3 — Status partial
**Dateien:** `CODING-RULES.md`, `agents/tasks/coding-rules-alt-neu-zusammenfuehrung-2026-08-03.md` — Abschlussaudit und Arbeitsnachweis geprüft.
**Entscheidungen:** Kein Typecheck, weil ausschließlich Markdown geändert wurde; Link-, Encoding- und Diff-Prüfung sind das relevante Gate.
**Unsicher / Risiko:** Nur Commit-/Push-Lieferung steht noch aus.

### Phase 3 — Status success (Fortsetzung)
**Dateien:** `CODING-RULES.md`, `agents/tasks/coding-rules-alt-neu-zusammenfuehrung-2026-08-03.md` — Shared-Docs als Commit `93698c0` auf `main` geliefert.
**Entscheidungen:** Append-only-Protokoll bewahrt den vorherigen Partial-Stand; Elternrepo erhält anschließend nur den finalen Submodule-Pointer.
**Unsicher / Risiko:** keines.

### Phase 4 — Status partial
**Dateien:** `AGENTS.md`, `CODING-RULES.md`, `agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md` — Pfadarchitektur und LOC-Grenze umgesetzt und statisch geprüft.
**Entscheidungen:** 1.600 ist ein hartes Limit für neue/geänderte handgepflegte Dateien; Generatorausgaben und unveränderter Vendor-Code bleiben ausgenommen. Bestehende Überschreitungen werden bei Berührung geteilt statt ungefragt als Großrefactoring eröffnet.
**Unsicher / Risiko:** Nur selektive Commit-/Push-Lieferung steht aus; parallele Fremdhunks in denselben Dateien bleiben außerhalb des Commits.

### Phase 4 — Status success (Fortsetzung)
**Dateien:** `CODING-RULES.md`, `agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md`, `AGENTS.md` — Shared-Docs unter `6aa831c` geliefert; lokale AGENTS-Änderung selektiv gestagt.
**Entscheidungen:** Fremde Hunks in `AGENTS.md` und `CODING-RULES.md` bleiben unstaged; nur eigene Regel- und Architekturänderungen werden geliefert.
**Unsicher / Risiko:** keines; Elternrepo-Lieferung folgt unmittelbar.

### Phase 5 — Status partial
**Dateien:** `CODING-RULES.md`, `agents/tasks/coding-rules-alt-neu-zusammenfuehrung-2026-08-03.md` — entfernte Pflichtregeln wiederhergestellt, Grundton ergänzt und Gesamtdiff statisch geprüft.
**Entscheidungen:** Der geprüfte Stand von Phase 4 bleibt vollständig erhalten; neu hinzu kommen nur Alltagswörter, Icons und stichpunktartige Schreibweise.
**Unsicher / Risiko:** Nur Lieferung in Shared-Docs und Elternrepo steht noch aus.

### Phase 5 — Status success (Fortsetzung)
**Dateien:** `CODING-RULES.md`, `agents/tasks/coding-rules-alt-neu-zusammenfuehrung-2026-08-03.md` — Regelstand unter `b4ad718` zuerst in Shared-Docs geliefert; Abschlussnachweis und finaler Eltern-Pointer folgen in dieser Reihenfolge.
**Entscheidungen:** Reine Dokuänderung bleibt ohne Typecheck; der Eltern-Commit enthält ausschließlich den Submodule-Pointer und keine parallelen Hauptrepo-Änderungen.
**Unsicher / Risiko:** keines.

## Offene Fix-Punkte
- [x] Finale Regeldatei auf redundante oder widersprüchliche Muss-Regeln geprüft.
- [x] Veraltete Links und Mojibake ausgeschlossen.
