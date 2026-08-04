# Claude of Tsushima — Quellenplanung für globale 3D-Tipps

## Ziel
- Stärkste Muster für Weltkomposition, Licht/Kamera, Performance, Animation/Kontakt und Kampf-VFX gewinnen.
- Alle fachlichen Histories, Roadmaps und Taskdateien gegen vorhandene Projekttipps und Quellcode prüfen.
- Mess- und Tooldetails lokal lassen; stackneutrale Fehlermechanismen global schärfen.

## Phasen

### Phase 1 — Dokumentkorpus
**Ziel:** Roadmaps, aktive Tasks und vollständiger History-Korpus sind nach Fachachsen erfasst.
- [ ] `README.md`, `ROADMAP.md`, acht Teilroadmaps und fünf aktive Taskdateien vollständig lesen.
- [ ] Alle `History/*.md` vollständig als Textkorpus erfassen; Welt, Kamera, Animation, VFX, Licht und Performance gruppieren.
- [ ] Vorhandene sechs Projekttippdateien gegen aktuelle Tasks und Histories prüfen.
**Ergebnis-Satz:** Jeder globale Kandidat lässt sich zu Projektbefund und Owner zurückverfolgen.
**Eingehalten:** Quellrepo read-only, parallele Änderungen unangetastet.
**Architektur passt:** Roadmaps erklären Soll; Histories belegen Kosten; Code entscheidet Mechanismus.
**Auffälligkeiten/Performance/Kritische Findings:** Quellrepo ist `ahead 1` und verändert; Gitstand wird nicht angefasst.
**Referenzen:**
- `docs/roadmap/`
- `docs/vfx-lab/tasks/`
- `History/`

### Phase 2 — Codegegenprobe
**Ziel:** Welt- und Kampfmuster sind an echten Datenflüssen belegt.
- [ ] `src/world/` auf Weltfelder, Bakes, Scatter, Kosten und Relief prüfen.
- [ ] `CameraRig.js`, Animation-/Waffenpfad und Kontaktberechnung prüfen.
- [ ] `Vfx.js`, `Trail.js`, Licht-/Postpfad und dokumentierte Performancehebel prüfen.
**Ergebnis-Satz:** Globale Tipps beschreiben Wirkungsketten statt projektspezifischer Dateirezepte.
**Eingehalten:** keine Sichtprüfung, keine Capture-Läufe, keine fremden Zahlen globalisieren.
**Architektur passt:** Weltkomposition, Animation, VFX, Licht und Performance behalten getrennte Owner.
**Auffälligkeiten/Performance/Kritische Findings:** offen bis Gegenprobe.
**Referenzen:**
- `src/world/`
- `src/game/CameraRig.js`
- `src/render/`

### Phase 3 — Promotion und Abschluss
**Ziel:** Tsushima-Kandidaten schärfen bestehende Owner ohne neue Parallelstruktur.
- [ ] Neue Kandidaten gegen vorhandene globale und lokale Tipps deduplizieren.
- [ ] Welt-, Licht-/Kamera- und Performance-Tipps kurz und suchbar formulieren.
- [ ] Animation/VFX nur ergänzen, wenn anderer Beleg oder projektfreier Mechanismus vorliegt.
**Ergebnis-Satz:** Tsushima bleibt klar erkennbare Herkunft, aber nicht versteckte Pflichtvorlage.
**Eingehalten:** Tippformat, Quellenbeleg, ungefähr zwölf Tipps je Datei.
**Architektur passt:** Router nennt Quellenprofil; Fachowner tragen nur übertragbare Diagnose.
**Auffälligkeiten/Performance/Kritische Findings:** offen.
**Referenzen:**
- `shared-docs/projects/claude-of-tsushima/`
- `shared-docs/threejs/MAP-GENERATION.md`
- `shared-docs/threejs/LIGHT-CAMERA.md`

## Arbeitsprotokoll

### Phase 1 — Status partial
**Dateien:** Vorhandene sechs Projektdokumente gelesen; aktive Tasks, Roadmaps und Histories inventarisiert.
**Entscheidungen:** Messwerkzeuge bleiben lokal; globale Owner erhalten nur Fehlerbild, Ursache, Handlung und Herkunft.
**Unsicher / Risiko:** Neueste VFX-Lab-/Dungeon-Tasks reichen über bisherigen 165-History-Beleg hinaus.

## Offene Fix-Punkte
- [ ] Aktuelle History-Zahl und Themenabdeckung belegen.
- [ ] Welt-/Licht-/Performancekandidaten gegen Code verifizieren.
