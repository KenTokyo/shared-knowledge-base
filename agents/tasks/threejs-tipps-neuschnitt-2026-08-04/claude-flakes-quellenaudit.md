# Claude Flakes — Quellenplanung für globale 3D-Tipps

## Ziel
- Snowflow als Babylon.js-/WebGPU-Referenz für VFX-Parametrisierung, Weltinteraktion, Runtime und Performance prüfen.
- Alle fachlichen `History/*.md`, `.completed/`, Roadmap-/Taskdateien sowie relevante Runtime-/Shaderpfade abdecken.
- Nur stackneutrale Mechanismen globalisieren; lokale WGSL-, Tool- und Balancefallen im Projektordner lassen.

## Phasen

### Phase 1 — Dokumentkorpus
**Ziel:** Alle aktiven und historischen Arbeitsdokumente sind gegen den bestehenden Belegumfang geprüft.
- [x] `README.md`, `ROADMAP.md`, aktive Taskquellen und zwölf `.completed/`-Dateien als Dokumentkorpus erfassen; fachliche Belegketten vollständig lesen.
- [x] Alle 165 `History/*.md` per vollständigem Textkorpus erfassen; VFX-, Animation-, Licht-, Welt- und Performancebefunde gruppieren.
- [x] Vorhandene acht Projekttippdateien gegen neue Funde und Duplikate prüfen.
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
- [x] `src/vfx/tuning/`, `src/vfx/` und Shaderpfade auf Datenbesitz, Lebenskurven und Renderrollen prüfen.
- [x] Charakter/Cloth, Deformation und Wake auf Update-Reihenfolge und gemeinsame Felder prüfen.
- [x] Pool-, Reset-, Warm-up- und Allokationsmuster gegen Projekttipps abgleichen.
**Ergebnis-Satz:** Übernommene Tipps benennen den Mechanismus, nicht Snowflow-spezifische APIs.
**Eingehalten:** keine Babylon.js-Anweisung als Three.js-Regel, keine fremden Konstanten.
**Architektur passt:** VFX-Parameter bleiben VFX; Uhren/Reset bleiben Runtime; Deformation bleibt Weltinteraktion.
**Auffälligkeiten/Performance/Kritische Findings:** Code bestätigt vier feste Spell-Light-Slots, getrennte Defaults/Baseline/Live-Werte, eine distanzgesampelte Wake-Spine, toroidales Ping-Pong-Deformationsfeld, gepoolte Partikel und framerateunabhängige Cloth-Raten. Histories belegen dazu `dt=0`-Drift, vollständigen Shot-Rewind, Phasenfehler und Allokationsfallen.
**Referenzen:**
- `src/vfx/`
- `src/shaders/`
- `src/terrain/`

### Phase 3 — Promotion und Abschluss
**Ziel:** Nur neue, belegte und nicht doppelte Mechanismen landen global.
- [x] Kandidaten gegen Learning-System-Promotion prüfen.
- [x] Herkunft „claude-flakes · Babylon.js/WebGPU“ sichtbar nennen.
- [x] Lokale Projekttrigger nur bei echter neuer Tippdatei ändern.
**Ergebnis-Satz:** Snowflow stärkt globale Diagnose, ohne den Stack zu verschleiern.
**Eingehalten:** ungefähr zwölf Tipps pro Owner, ein Tipp an genau einer Stelle.
**Architektur passt:** Keine neue Fachowner-Datei ohne neuen Trigger.
**Auffälligkeiten/Performance/Kritische Findings:** Promoted wurden nur stackneutrale Mechanismen zu `dt`, Reset, Spine/Kontakt, Ereignisphase, Parametereigentum, festen Kapazitäten, Weltfeldern und Allokationen. WGSL-, Babylon- und Balanceinstrumente bleiben lokal.
**Referenzen:**
- `shared-docs/projects/claude-flakes/`
- `shared-docs/threejs/VFX.md`
- `shared-docs/threejs/PERFORMANCE.md`

## Arbeitsprotokoll

### Phasen 1–3 — abgeschlossen
**Dateien:** 165 Histories und zwölf `.completed/` gezählt; Volltextkorpus nach VFX, Animation, Licht, Runtime, Welt und Performance ausgewertet. Relevante Belegketten und Ownercode (`spellLights`, `paramStore`, `surfWake`, `deformation`, `particles`, `cloth`) vollständig gegengelesen.
**Entscheidungen:** Generierte `.uniai-chat`-Verläufe und temporäre Reviewdateien sind keine Task-SSoT. Acht vorhandene Projektdokumente reichen aus; kein neuer lokaler Owner.
**Unsicher / Risiko:** Das Repo arbeitet parallel weiter. Die Zahl 165 ist der Abschlussstand dieses Audits; neue Histories ändern nicht rückwirkend die belegten Quellenzeilen.

## Offene Fix-Punkte
- [x] Aktuelle Korpuszahl und Themenabdeckung belegen.
- [x] Parametrisierungskandidaten gegen Code verifizieren.
