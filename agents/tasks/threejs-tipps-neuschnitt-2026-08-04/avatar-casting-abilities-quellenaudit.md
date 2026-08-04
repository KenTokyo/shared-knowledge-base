# Avatar Casting Abilities — Quellenplanung für globale VFX-Tipps

## Ziel
- Effekt-Layering, Parameterbesitz, Pfad-/Ribbon-Geometrie, Partikel, Licht, Kameraimpuls und Pooling prüfen.
- Fehlende History ehrlich behandeln: Code belegt Architektur, aber keine behaupteten Zeitkosten.
- Nur projektfreie Mechanismen globalisieren oder Avatar als Codebeispiel im Quellenprofil nennen.

## Phasen

### Phase 1 — Projektvertrag
**Ziel:** Einstieg, Stack, Fähigkeiten und Dateibesitz sind vollständig verstanden.
- [x] `README.md` und `package.json` vollständig lesen.
- [x] Source-Baum und alle 25 VFX-/Animations-/Licht-/Kameradateien vollständig prüfen.
- [x] Fehlen von Task-, History- und Git-Metadaten ausdrücklich dokumentieren.
**Ergebnis-Satz:** Avatar wird als Codequelle eingeordnet, nicht als erfundener Erfahrungsbeleg.
**Eingehalten:** read-only, keine Laufzeit-/Bildprüfung, keine ungesicherten Qualitätsurteile.
**Architektur passt:** Projektcode belegt Besitz; Learning-System entscheidet, ob daraus ein globaler Tipp werden darf.
**Auffälligkeiten/Performance/Kritische Findings:** Ordner ist kein Git-Repository und besitzt keine Task-/Historydateien.
**Referenzen:**
- `README.md`
- `package.json`
- `src/`

### Phase 2 — VFX-Architektur
**Ziel:** Wiederverwendbare Mechanismen und Grenzen sind aus dem Code extrahiert.
- [x] Partikelengine und Objektpool auf Kapazität, Reset, Überlast und Allokation prüfen.
- [x] Ribbon, PathTrail und TrailMaterial auf Distanzsampling, Frames, Alter und Materialrollen prüfen.
- [x] Burst, Decals, Lichtpool, ScreenFlash und CameraShake auf geschichtete Reaktion und gemeinsame Parameter prüfen.
**Ergebnis-Satz:** Effektqualität wird als gekoppelte Form-, Licht-, Kontakt- und Reaktionsschicht beschrieben.
**Eingehalten:** Codepfad statt Screenshotmeinung, keine projektspezifischen Zahlen als Default.
**Architektur passt:** CPU-Geometrie, GPU-Material, Pool und Feedbackrollen bleiben getrennt benennbar.
**Auffälligkeiten/Performance/Kritische Findings:** `ParticleSystem` recycelt feste Ringpuffer und lädt nur Dirty-Ranges; `LightPool` besitzt sechs feste Slots und gibt bei Überlauf `null` zurück. Der generische `ObjectPool` wächst dagegen bei Leerstand und ist deshalb kein Beleg für ein hartes Poolbudget. `Ability.spawn()` setzt `lightBoost` nicht selbst zurück; ohne History oder Laufzeitgate wird daraus keine globale Reset-Behauptung.
**Referenzen:**
- `src/effects/`
- `src/particles/`
- `src/materials/TrailMaterial.js`

### Phase 3 — Einordnung und Abschluss
**Ziel:** Avatar stärkt globale VFX-Tipps ohne Belegstandard zu verwässern.
- [x] Kandidaten gegen Claude Flakes, Tsushima und Voxel belegen oder als bloßes Codebeispiel verwerfen.
- [x] Quellenprofil mit Stack und Evidenzart ergänzen.
- [x] Keine neue Projekt-Learning-Datei ohne echten Kosten-/Historybeleg anlegen.
**Ergebnis-Satz:** Avatar liefert Architekturbeispiele; globale Tipps tragen weiterhin echte Fehlerbelege.
**Eingehalten:** Promotion nur mit Zweitbeleg oder nachweislich projektfreiem Mechanismus.
**Architektur passt:** Kein Projektordner ohne projektinterne Learnings.
**Auffälligkeiten/Performance/Kritische Findings:** Global übernommen wurden nur zwei ergänzende Codegegenproben: eine gemeinsame Trajektorie für Kopf/Trail/Licht/Emission und Settings/Preset-Deep-Merge in dieselben Live-Objekte. Poolkosten, Bildqualität und Zeitersparnis bleiben unbelegt.
**Referenzen:**
- `shared-docs/THREEJS-RULES.md`
- `shared-docs/threejs/VFX.md`
- `shared-docs/LEARNING-SYSTEM.md`

## Arbeitsprotokoll

### Phasen 1–3 — abgeschlossen
**Dateien:** `README.md`, `package.json` und alle 25 geplanten Owner unter `src/{abilities,animation,core,effects,materials,particles,world}` vollständig gelesen; Pfade zu Tasks, Histories, `.completed` oder Git-Metadaten existieren nicht.
**Entscheidungen:** Kein `projects/avatar.../`-Ordner ohne Erfahrungsbeleg. Avatar erscheint im Router und in zwei VFX-Quellenzeilen ausdrücklich als Codegegenprobe ohne History.
**Unsicher / Risiko:** README nennt eine warme Sitzung nahezu allokationsfrei, besitzt dafür aber weder Messartefakt noch History; diese Aussage wurde nicht promoted.

## Offene Fix-Punkte
- [x] Vollständigen Codeaudit durchführen.
- [x] Kandidaten nur bei vorhandenem Fehlerbeleg aus anderem Repo übernehmen.
