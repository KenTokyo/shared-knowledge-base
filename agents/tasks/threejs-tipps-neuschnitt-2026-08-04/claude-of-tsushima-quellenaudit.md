# Claude of Tsushima — Quellenplanung für globale 3D-Tipps

## Ziel
- Stärkste Muster für Weltkomposition, Licht/Kamera, Performance, Animation/Kontakt und Kampf-VFX gewinnen.
- Alle fachlichen Histories, Roadmaps und Taskdateien gegen vorhandene Projekttipps und Quellcode prüfen.
- Mess- und Tooldetails lokal lassen; stackneutrale Fehlermechanismen global schärfen.

## Phasen

### Phase 1 — Dokumentkorpus
**Ziel:** Roadmaps, aktive Tasks und vollständiger History-Korpus sind nach Fachachsen erfasst.
- [x] `README.md`, `ROADMAP.md`, acht Teilroadmaps und fünf aktive Taskdateien als Dokumentkorpus erfassen; fachliche Belegketten vollständig lesen.
- [x] Alle 246 `History/*.md` als vollständigen Textkorpus erfassen; Welt, Kamera, Animation, VFX, Licht und Performance gruppieren.
- [x] Vorhandene sechs Projekttippdateien gegen aktuelle Tasks und Histories prüfen.
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
- [x] `src/world/` auf Weltfelder, Bakes, Scatter, Kosten und Relief prüfen.
- [x] `CameraRig.js`, Animation-/Waffenpfad und Kontaktberechnung prüfen.
- [x] `Vfx.js`, `Trail.js`, Licht-/Postpfad und dokumentierte Performancehebel prüfen.
**Ergebnis-Satz:** Globale Tipps beschreiben Wirkungsketten statt projektspezifischer Dateirezepte.
**Eingehalten:** keine Sichtprüfung, keine Capture-Läufe, keine fremden Zahlen globalisieren.
**Architektur passt:** Weltkomposition, Animation, VFX, Licht und Performance behalten getrennte Owner.
**Auffälligkeiten/Performance/Kritische Findings:** `WorldSpec` ist der geschlossene Weltvertrag; `CameraRig` federt Fokus und Pull-in; `Hero.bladeAt()` liefert den gerenderten Klingenpfad; VFX/Trail arbeiten mit festen Ringen. Histories belegen 6 Ahorne/38 Calls gegen 170/56, 11/12 abgeschnittene Kamera-Kandidaten und `worst curved` 0,858/0,883. Der alte „Gras etwa 8× zu hell“-Kurzbeleg war falsch verdichtet: belegt sind N-fache CSM-Beleuchtung ungepatchter Standardmaterialien und eine mögliche Verdopplung durch einen zusätzlichen Transmissionsterm.
**Referenzen:**
- `src/world/`
- `src/game/CameraRig.js`
- `src/render/`

### Phase 3 — Promotion und Abschluss
**Ziel:** Tsushima-Kandidaten schärfen bestehende Owner ohne neue Parallelstruktur.
- [x] Neue Kandidaten gegen vorhandene globale und lokale Tipps deduplizieren.
- [x] Welt-, Licht-/Kamera- und Performance-Tipps kurz und suchbar formulieren.
- [x] Animation/VFX nur ergänzen, wenn anderer Beleg oder projektfreier Mechanismus vorliegt.
**Ergebnis-Satz:** Tsushima bleibt klar erkennbare Herkunft, aber nicht versteckte Pflichtvorlage.
**Eingehalten:** Tippformat, Quellenbeleg, ungefähr zwölf Tipps je Datei.
**Architektur passt:** Router nennt Quellenprofil; Fachowner tragen nur übertragbare Diagnose.
**Auffälligkeiten/Performance/Kritische Findings:** Globale Owner tragen nur Fehlerbild, Mechanismus und Handlung. Kamera-, Trail-, Bucket-, Weltvertrag-, CSM- und Poolbelege sind übernommen; konkrete Proben, Kamerawerte und Weltkonstanten bleiben in den sechs Projektowner-Dateien.
**Referenzen:**
- `shared-docs/projects/claude-of-tsushima/`
- `shared-docs/threejs/MAP-GENERATION.md`
- `shared-docs/threejs/LIGHT-CAMERA.md`

## Arbeitsprotokoll

### Phasen 1–3 — abgeschlossen
**Dateien:** 246 Histories, acht Roadmaps, fünf aktive Tasks und sechs Projektowner inventarisiert; einschlägige Belegketten vollständig gelesen. Codegegenprobe über `WorldSpec`, `CameraRig`, `Hero`, `Weapon`, `Trail` und `Vfx`.
**Entscheidungen:** Messwerkzeuge bleiben lokal; globale Owner erhalten nur Fehlerbild, Ursache, Handlung und Herkunft. Die zwei ungenauen 8×-Quellenzeilen wurden auf den tatsächlich belegten N-fach-/Verdopplungsmechanismus korrigiert.
**Unsicher / Risiko:** Das read-only Referenzrepo verändert sich parallel. 246 ist der Abschlussstand des Audits und kein dauerhafter Vertragswert.

## Offene Fix-Punkte
- [x] Aktuelle History-Zahl und Themenabdeckung belegen.
- [x] Welt-/Licht-/Performancekandidaten gegen Code verifizieren.
