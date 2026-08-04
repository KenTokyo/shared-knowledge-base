# Claude Flakes — Quellenplanung für globale 3D-Tipps

## Ziel
- Snowflow als Babylon.js-/WebGPU-Referenz für VFX-Parametrisierung, Weltinteraktion, Runtime und Performance prüfen.
- Alle fachlichen `History/*.md`, `.completed/`, Roadmap-/Taskdateien sowie relevante Runtime-/Shaderpfade abdecken.
- Nur stackneutrale Mechanismen globalisieren; lokale WGSL-, Tool- und Balancefallen im Projektordner lassen.

## Phasen

### Phase 1 — Dokumentkorpus
**Ziel:** Alle aktiven und historischen Arbeitsdokumente sind gegen den bestehenden Belegumfang geprüft.
- [ ] `README.md`, `ROADMAP.md`, aktive Teilroadmaps/Tasks und zwölf `.completed/`-Dateien vollständig lesen.
- [ ] Alle 119 `History/*.md` per vollständigem Textkorpus erfassen; VFX-, Animation-, Licht-, Welt- und Performancebefunde gruppieren.
- [ ] Vorhandene acht Projekttippdateien gegen neue Funde und Duplikate prüfen.
**Ergebnis-Satz:** Kein globaler Tipp stützt sich nur auf Dateinamen oder Erinnerung.
**Eingehalten:** fremde Quelländerungen unangetastet, Code statt Prosa bei Widerspruch.
**Architektur passt:** Lokale Werkzeuge bleiben unter `projects/claude-flakes/`; globale Mechanismen wandern zum engsten Owner.
**Auffälligkeiten/Performance/Kritische Findings:** Quellrepo enthält parallele Änderungen; Audit bleibt strikt read-only.
**Referenzen:**
- `History/`
- `.completed/`
- `ROADMAP.md`

### Phase 2 — Codegegenprobe
**Ziel:** Parametrisierung und Laufzeitpfade sind an echten Besitzern statt nur an Berichten belegt.
- [ ] `src/vfx/tuning/`, `src/vfx/` und Shaderbibliothek auf Datenbesitz, Lebenskurven und Renderrollen prüfen.
- [ ] Charakter/Cloth, Kamera, Deformation und Wake auf Update-Reihenfolge und gemeinsame Felder prüfen.
- [ ] Pool-, Reset-, Warm-up- und Allokationsmuster gegen Projekttipps abgleichen.
**Ergebnis-Satz:** Übernommene Tipps benennen den Mechanismus, nicht Snowflow-spezifische APIs.
**Eingehalten:** keine Babylon.js-Anweisung als Three.js-Regel, keine fremden Konstanten.
**Architektur passt:** VFX-Parameter bleiben VFX; Uhren/Reset bleiben Runtime; Deformation bleibt Weltinteraktion.
**Auffälligkeiten/Performance/Kritische Findings:** offen bis Gegenprobe.
**Referenzen:**
- `src/vfx/`
- `src/shaders/`
- `src/terrain/`

### Phase 3 — Promotion und Abschluss
**Ziel:** Nur neue, belegte und nicht doppelte Mechanismen landen global.
- [ ] Kandidaten gegen Learning-System-Promotion prüfen.
- [ ] Herkunft „claude-flakes · Babylon.js/WebGPU“ sichtbar nennen.
- [ ] Lokale Projekttrigger nur bei echter neuer Tippdatei ändern.
**Ergebnis-Satz:** Snowflow stärkt globale Diagnose, ohne den Stack zu verschleiern.
**Eingehalten:** ungefähr zwölf Tipps pro Owner, ein Tipp an genau einer Stelle.
**Architektur passt:** Keine neue Fachowner-Datei ohne neuen Trigger.
**Auffälligkeiten/Performance/Kritische Findings:** offen.
**Referenzen:**
- `shared-docs/projects/claude-flakes/`
- `shared-docs/threejs/VFX.md`
- `shared-docs/threejs/PERFORMANCE.md`

## Arbeitsprotokoll

### Phase 1 — Status partial
**Dateien:** Vorhandene acht Projektdokumente gelesen; Quellinventar erstellt.
**Entscheidungen:** Generierte `.uniai-chat`-Verläufe und temporäre Reviewdateien sind keine Task-SSoT; `History/`, `.completed/`, Roadmap und aktive Tasks tragen den Audit.
**Unsicher / Risiko:** Neuere VFX-Studio-Histories liegen nach dem bisherigen 119-Dateien-Beleg und brauchen Gegenprüfung.

## Offene Fix-Punkte
- [ ] Aktuelle Korpuszahl und Themenabdeckung belegen.
- [ ] Parametrisierungskandidaten gegen Code verifizieren.
