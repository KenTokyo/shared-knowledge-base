# Avatar Casting Abilities — Quellenplanung für globale VFX-Tipps

## Ziel
- Effekt-Layering, Parameterbesitz, Pfad-/Ribbon-Geometrie, Partikel, Licht, Kameraimpuls und Pooling prüfen.
- Fehlende History ehrlich behandeln: Code belegt Architektur, aber keine behaupteten Zeitkosten.
- Nur projektfreie Mechanismen globalisieren oder Avatar als Codebeispiel im Quellenprofil nennen.

## Phasen

### Phase 1 — Projektvertrag
**Ziel:** Einstieg, Stack, Fähigkeiten und Dateibesitz sind vollständig verstanden.
- [ ] `README.md` und `package.json` vollständig lesen.
- [ ] Source-Baum und alle 25 VFX-/Animations-/Licht-/Kameradateien vollständig prüfen.
- [ ] Fehlen von Task-, History- und Git-Metadaten ausdrücklich dokumentieren.
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
- [ ] Partikelengine und Objektpool auf Kapazität, Reset, Überlast und Allokation prüfen.
- [ ] Ribbon, PathTrail und TrailMaterial auf Distanzsampling, Frames, Alter und Materialrollen prüfen.
- [ ] Burst, Decals, Lichtpool, ScreenFlash und CameraShake auf geschichtete Reaktion und gemeinsame Parameter prüfen.
**Ergebnis-Satz:** Effektqualität wird als gekoppelte Form-, Licht-, Kontakt- und Reaktionsschicht beschrieben.
**Eingehalten:** Codepfad statt Screenshotmeinung, keine projektspezifischen Zahlen als Default.
**Architektur passt:** CPU-Geometrie, GPU-Material, Pool und Feedbackrollen bleiben getrennt benennbar.
**Auffälligkeiten/Performance/Kritische Findings:** offen bis Codeaudit.
**Referenzen:**
- `src/effects/`
- `src/particles/`
- `src/materials/TrailMaterial.js`

### Phase 3 — Einordnung und Abschluss
**Ziel:** Avatar stärkt globale VFX-Tipps ohne Belegstandard zu verwässern.
- [ ] Kandidaten gegen Claude Flakes, Tsushima und Voxel belegen oder als bloßes Codebeispiel verwerfen.
- [ ] Quellenprofil mit Stack und Evidenzart ergänzen.
- [ ] Keine neue Projekt-Learning-Datei ohne echten Kosten-/Historybeleg anlegen.
**Ergebnis-Satz:** Avatar liefert Architekturbeispiele; globale Tipps tragen weiterhin echte Fehlerbelege.
**Eingehalten:** Promotion nur mit Zweitbeleg oder nachweislich projektfreiem Mechanismus.
**Architektur passt:** Kein Projektordner ohne projektinterne Learnings.
**Auffälligkeiten/Performance/Kritische Findings:** offen.
**Referenzen:**
- `shared-docs/THREEJS-RULES.md`
- `shared-docs/threejs/VFX.md`
- `shared-docs/LEARNING-SYSTEM.md`

## Arbeitsprotokoll

### Phase 1 — Status partial
**Dateien:** Quellinventar erstellt; 25 fachlich relevante Source-Dateien gefunden.
**Entscheidungen:** Kein `projects/avatar.../`-Ordner nur für allgemeine Codebeobachtungen; Herkunft wird bei passenden globalen Tipps als ergänzende Codegegenprobe genannt.
**Unsicher / Risiko:** README und Source müssen noch vollständig gelesen werden.

## Offene Fix-Punkte
- [ ] Vollständigen Codeaudit durchführen.
- [ ] Kandidaten nur bei vorhandenem Fehlerbeleg aus anderem Repo übernehmen.
