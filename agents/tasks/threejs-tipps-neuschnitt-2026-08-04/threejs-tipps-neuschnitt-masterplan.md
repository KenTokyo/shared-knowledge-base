# Three.js-Tipps entschlacken und aus Referenzprojekten schärfen

## Userziel
- Globale 3D-Wissensbasis auf wenige belegte, zeitsparende Tipps statt wachsender Pflichtregeln ausrichten.
- Animation aus Voxel Samurai Quiz, VFX aus Avatar Casting Abilities, Voxel Samurai Quiz und Claude Flakes stärken.
- Welt, Licht/Kamera und Performance besonders gegen Claude of Tsushima und Claude Flakes prüfen.
- Herkunft jedes neuen Tipps sichtbar machen; Sichtprüfungen bleiben nur mit aktueller Userfreigabe erlaubt.
- Alle Phasen ohne Rückfrage umsetzen, dokumentieren, erneut gegenlesen und liefern.

## Lösungsvergleich
1. Alles in `THREEJS-RULES.md` sammeln → wenige Dateien, aber unlesbar und ohne enge Trigger.
2. Für jedes Muster neue Owner anlegen → präzise, aber mehr Dateilast und Routingkosten.
3. Bestehende 13 Owner behalten, generische Checklisten durch belegte Such-Tipps ersetzen und vier Quellenpläne anbinden → kleinste stabile Struktur. **Gewählt.**

## Quellenpläne
- [Claude Flakes](claude-flakes-quellenaudit.md)
- [Claude of Tsushima](claude-of-tsushima-quellenaudit.md)
- [Avatar Casting Abilities](avatar-casting-abilities-quellenaudit.md)
- [Voxel Samurai Quiz](voxel-samurai-quiz-quellenaudit.md)

## Phasen

### Phase 1 — Korpus und Taxonomie
**Ziel:** Aktive Owner, Projekte, Roadmaps, Taskdateien und History-Korpora sind inventarisiert; Dopplungen und Widersprüche sind belegt.
- [x] `AGENTS.md`, `CODING-RULES.md`, 3D-Router, Learning-System und Usernotiz vollständig gelesen.
- [x] Alle 13 globalen 3D-Owner und 21 vorhandenen Tipps der drei Kernprojekte gelesen.
- [x] Vier Quellpläne gegen aktive Tasks, Histories und Code abschließen.
- [x] Behalten, schärfen, verschieben oder entfernen je Owner entscheiden.
**Ergebnis-Satz:** Jede geplante Änderung hat einen engen Trigger und eine nachvollziehbare Quelle.
**Warum:** Neue Regeln ohne Herkunft würden genau die Überladung fortsetzen, die der Auftrag abbauen soll.
**Eingehalten:** eine Wissens-SSoT, keine Quellrepo-Änderung, kein Browser-/Gameplay-Test.
**Architektur passt:** Der Router routet; Fachowner tragen globale Mechanismen; Projektordner behalten lokale Werkzeuge und Konstanten.
**Auffälligkeiten/Performance/Kritische Findings:** Der Zwei-Bilder-Widerspruch wurde in den zentralen Dokus beseitigt; Fachdateien verweisen nur noch auf Freigabe und Gesamtbudget aus `CODING-RULES.md`.
**Referenzen:**
- `shared-docs/THREEJS-RULES.md`
- `shared-docs/threejs/`
- `shared-docs/projects/`

### Phase 2 — Animation und VFX
**Ziel:** Animation und VFX liefern vor dem ersten Edit konkrete, belegte Fehlersuchen statt allgemeiner Wunschlisten.
- [x] Animations-Tipps aus Voxel-Rig, Tsushima-Kontakt und Flakes-Cloth/Timing neu schneiden.
- [x] VFX-Tipps aus Avatar-Layering, Voxel-Runtime und Flakes-Effektparametrisierung zusammenführen.
- [x] VFX-Audio, Lebenskurve, Hauptform, Kontakt, Poolreset und Parametrisierung ohne Zahlenrezepte trennen.
- [x] Quellenbelege in jedem neuen oder geschärften Tipp nennen.
**Ergebnis-Satz:** Charakterbewegung und Effekte lassen sich anhand sichtbarer Fehler schneller zur Ursache führen.
**Eingehalten:** maximal etwa zwölf Tipps je Datei, freiwilliger Status, keine doppelte Projektkopie.
**Architektur passt:** Animation besitzt Pose/Kontakt; VFX besitzt Effektform; Runtime besitzt Reihenfolge/Uhren.
**Auffälligkeiten/Performance/Kritische Findings:** Avatar besitzt keine History-/Taskdoku; dort dürfen nur im Code belegte Mechanismen, keine erfundenen Zeitkosten, übernommen werden.
**Referenzen:**
- `shared-docs/threejs/ANIMATION-CHARACTER.md`
- `shared-docs/threejs/VFX.md`
- `shared-docs/threejs/RUNTIME-INTEGRATION.md`

### Phase 3 — Welt, Licht, Shader und Performance
**Ziel:** Die stärksten übertragbaren Mechanismen aus Tsushima und Flakes schärfen Weltkomposition, Licht/Kamera, Shader und Kostenpfade.
- [x] Map-Generierung gegen Tsushima-Weltfelder, Relief, Bakes und Kompositionsprozess prüfen.
- [x] Licht/Kamera auf kurze Trigger reduzieren; lange Spezialfälle bei enger Herkunft belassen oder schärfen.
- [x] Shader-, Performance- und Weltinteraktions-Tipps gegen echte Pipeline- und Snowflow-Muster prüfen.
- [x] `RUNTIME-INTEGRATION.md` mit eigenem Trigger für Reihenfolge, Uhren und Lifecycle behalten.
**Ergebnis-Satz:** Welt- und Renderprobleme führen vom sichtbaren Symptom zum billigsten Gegenbeweis.
**Eingehalten:** Qualität nicht durch versteckte Limits senken, stackfremde Konstanten nicht globalisieren.
**Architektur passt:** Weltfelder bleiben bei Map/Weltinteraktion; Renderarithmetik bei Shader; Kosten bei Performance.
**Auffälligkeiten/Performance/Kritische Findings:** Claude Flakes ist Babylon.js/WebGPU/WGSL, kein Three.js-Projekt; nur stackneutrale Mechanismen dürfen global werden.
**Referenzen:**
- `shared-docs/threejs/MAP-GENERATION.md`
- `shared-docs/threejs/LIGHT-CAMERA.md`
- `shared-docs/threejs/PERFORMANCE.md`

### Phase 4 — Routing, Regelwidersprüche und Herkunft
**Ziel:** Router, Capture-Grenzen, Quellprofile und Projekttrigger stimmen mit Coding Rules und Learning-System überein.
- [x] Sichtprüfungsgrenzen überall auf zentrale Freigabe und zentralen Gesamtdeckel verweisen lassen.
- [x] Router-Quellprofile um Avatar ergänzen und „Regeln“ klar als freiwillige Tipps benennen.
- [x] Projekttrigger und neue Quellenpfade prüfen, ohne vorsorgliche Leseketten zu erzeugen.
- [x] Veraltete, doppelte oder unbelegte Aussagen entfernen.
**Ergebnis-Satz:** Eine Regelquelle entscheidet Freigaben; Fachdateien liefern nur Diagnosewissen.
**Eingehalten:** keine Parallelregel, Links relativ, echte Umlaute, kompakte Sprache.
**Architektur passt:** `CODING-RULES.md` besitzt Arbeitsgates; `THREEJS-RULES.md` besitzt 3D-Routing; Owner besitzen Tipps.
**Auffälligkeiten/Performance/Kritische Findings:** Bestehende Quellprofile nennen Claude Flakes pauschal als Three.js-Quelle, obwohl dessen Stack Babylon.js ist.
**Referenzen:**
- `shared-docs/CODING-RULES.md`
- `shared-docs/THREEJS-RULES.md`
- `shared-docs/README.md`

### Phase 5 — Abschlussaudit und Lieferung
**Ziel:** Alle Usermerkmale, Tippbudgets, Links, Quellen und Git-Einheiten sind vollständig geprüft und geliefert.
- [x] Master- und Quellenpläne vollständig abhaken; offene Findings direkt beheben.
- [x] Zeilen-/Tippbudgets, Links, Mojibake, Widersprüche und Diff statisch prüfen.
- [x] Reine Dokuänderung ohne Typecheck begründen.
- [x] Shared-Docs zuerst committen/pushen, danach ausschließlich Eltern-Pointer liefern.
**Ergebnis-Satz:** Die Wissensbasis ist kleiner im Zwang, stärker in der Diagnose und nachvollziehbar belegt.
**Eingehalten:** selektives Staging, Zielbranch `main`, kein Test ohne Auftrag.
**Architektur passt:** Neue dauerhafte Dateien sind nur die verlangten Planungsnachweise; Fachwissen bleibt in bestehenden Ownern.
**Auffälligkeiten/Performance/Kritische Findings:** Alle 13 globalen Owner liegen bei 3–8 Tipps. Zwei zu stark verdichtete 8×-Lichtbelege wurden auf den tatsächlich belegten N-fach-/Verdopplungsmechanismus korrigiert; Avatar bleibt ausdrücklich Codegegenprobe ohne Kostenbeleg.
**Referenzen:**
- `shared-docs/agents/tasks/threejs-tipps-neuschnitt-2026-08-04/`
- `shared-docs/threejs/`
- `shared-docs/projects/`

## Kommentare

### Phase 1
**Eingehalten:** Pflichtlesepfad ✅, vier Korpora inventarisiert ✅, keine Quellrepo-Änderung ✅, Sichtprüfungsverbot ✅
**Auffälligkeiten (nach Schwere):** 🟠 Capture-Widerspruch gefunden und in der zentralen Regelkette beseitigt; 🟡 alte Korpuszahlen 119/165 waren auf 165/246 angewachsen.

### Phasen 2–4
**Eingehalten:** 13 enge Owner ✅, 3–8 Tipps je globalem Owner ✅, stackneutrale Promotion ✅, Herkunft sichtbar ✅
**Auffälligkeiten (nach Schwere):** 🟠 Avatar besitzt keinen Erfahrungsbeleg und bleibt Codegegenprobe; 🟡 Claude Flakes ist Babylon.js/WebGPU und liefert keine API-Rezepte; 🟡 zwei 8×-Lichtzitate waren stärker als ihre Quellen.

### Phase 5
**Eingehalten:** keine Browser-/Capture-/Gameplaytests ✅, reine Dokuänderung ✅, statische Abschlussgates ✅
**Auffälligkeiten (nach Schwere):** Keine offenen fachlichen Findings. Der Typecheck entfällt, weil ausschließlich Markdown im Wissens-Submodul geändert wurde.

## Arbeitsprotokoll

### Phase 1 — abgeschlossen
**Dateien:** Vier Quellenpläne, 13 globale Owner und 21 Projektdateien geprüft; Histories 165/246, Voxel-Abschlüsse und Avatar-Source inventarisiert.
**Entscheidungen:** Alle 13 Owner behalten, weil Trigger nicht kollidieren. Generierte Chats/Caches zählen nicht als fachliche Tasks.
**Unsicher / Risiko:** Referenzrepos verändern sich parallel; Korpuszahlen sind Auditstand, keine Verträge.

### Phasen 2–3 — abgeschlossen
**Dateien:** Owner für Animation, VFX, Runtime, Welt, Licht/Kamera, Shader, Performance und Interaktion neu geschnitten; 22 Dokumente in Commit `60c1d4d` um 763 Zeilen verkürzt.
**Entscheidungen:** Global bleibt der Fehlermechanismus, lokal bleiben Tool, Messlatte und Konstante. Avatar ergänzt zwei VFX-Codegegenproben; sein wachsender `ObjectPool` wurde nicht als harter Budgetbeleg übernommen.
**Unsicher / Risiko:** Keine sichtbare Qualitätsaussage aus Avatar ohne History oder Laufzeitartefakt.

### Phasen 4–5 — abgeschlossen
**Dateien:** Router/Worldbuilding/Capture-Hinweise zentralisiert; vier Quellenaudits abgeschlossen; Lichtquellen präzisiert.
**Entscheidungen:** `CODING-RULES.md` allein besitzt Sichtfreigabe und Gesamtbudget. Reine Markdown-Änderung, daher kein `pnpm type-check`; stattdessen Links, Encoding, Budgets und Diff statisch geprüft.
**Unsicher / Risiko:** Fachabschluss als `33707ae` gepusht; der finale Plancommit folgt im Shared-Docs-Repo, danach wird ausschließlich der Eltern-Pointer geliefert.

## Offene Fix-Punkte
- [x] Zwei-Bilder-Widerspruch in drei Dokus beheben.
- [x] Unbelegte globale Checklisten in belegte Such-Tipps umformen oder entfernen.
- [x] Avatar als Codequelle korrekt und ohne erfundenen Kostenbeleg einordnen.
- [x] Zu stark verdichtete Lichtbelege gegen Originalquelle korrigieren.
- [x] Shared-Docs committen/pushen und Eltern-Pointer separat liefern.
