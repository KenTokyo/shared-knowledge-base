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
- [ ] Vier Quellpläne gegen aktive Tasks, Histories und Code abschließen.
- [ ] Behalten, schärfen, verschieben oder entfernen je Owner entscheiden.
**Ergebnis-Satz:** Jede geplante Änderung hat einen engen Trigger und eine nachvollziehbare Quelle.
**Warum:** Neue Regeln ohne Herkunft würden genau die Überladung fortsetzen, die der Auftrag abbauen soll.
**Eingehalten:** eine Wissens-SSoT, keine Quellrepo-Änderung, kein Browser-/Gameplay-Test.
**Architektur passt:** Der Router routet; Fachowner tragen globale Mechanismen; Projektordner behalten lokale Werkzeuge und Konstanten.
**Auffälligkeiten/Performance/Kritische Findings:** `DEBUG-REVIEW.md`, `THREEJS-WORLDBUILDING-RULES.md` und `README.md` nennen noch ein Zwei-Bilder-Limit, während `CODING-RULES.md` maximal sechs freigegebene Sichtprüfungen erlaubt.
**Referenzen:**
- `shared-docs/THREEJS-RULES.md`
- `shared-docs/threejs/`
- `shared-docs/projects/`

### Phase 2 — Animation und VFX
**Ziel:** Animation und VFX liefern vor dem ersten Edit konkrete, belegte Fehlersuchen statt allgemeiner Wunschlisten.
- [ ] Animations-Tipps aus Voxel-Rig, Tsushima-Kontakt und Flakes-Cloth/Timing neu schneiden.
- [ ] VFX-Tipps aus Avatar-Layering/Pooling, Voxel-Runtime und Flakes-Effektparametrisierung zusammenführen.
- [ ] VFX-Audio, Lebenskurve, Hauptform, Kontakt, Poolreset und Parametrisierung ohne Zahlenrezepte trennen.
- [ ] Quellenbelege in jedem neuen oder geschärften Tipp nennen.
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
- [ ] Map-Generierung gegen Tsushima-Weltfelder, Relief, Bakes und Kompositionsprozess prüfen.
- [ ] Licht/Kamera auf kurze Trigger reduzieren; lange Spezialfälle bei enger Herkunft belassen oder schärfen.
- [ ] Shader-, Performance- und Weltinteraktions-Tipps gegen echte Pipeline- und Snowflow-Muster prüfen.
- [ ] `RUNTIME-INTEGRATION.md` nur behalten, wenn sein eigener Trigger gegenüber Animation/VFX/Performance klar bleibt.
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
- [ ] Sichtprüfungsgrenzen überall auf zentrale Freigabe und zentralen Gesamtdeckel verweisen lassen.
- [ ] Router-Quellprofile um Avatar ergänzen und „Regeln“ klar als freiwillige Tipps benennen.
- [ ] Projekttrigger und neue Quellenpfade ergänzen, ohne vorsorgliche Leseketten zu erzeugen.
- [ ] Veraltete, doppelte oder unbelegte Aussagen entfernen.
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
- [ ] Master- und Quellenpläne vollständig abhaken; offene Findings direkt beheben.
- [ ] Zeilen-/Tippbudgets, Links, Mojibake, Widersprüche und Diff statisch prüfen.
- [ ] Reine Dokuänderung ohne Typecheck begründen.
- [ ] Shared-Docs zuerst committen/pushen, danach ausschließlich Eltern-Pointer liefern.
**Ergebnis-Satz:** Die Wissensbasis ist kleiner im Zwang, stärker in der Diagnose und nachvollziehbar belegt.
**Eingehalten:** selektives Staging, Zielbranch `main`, kein Test ohne Auftrag.
**Architektur passt:** Neue dauerhafte Dateien sind nur die verlangten Planungsnachweise; Fachwissen bleibt in bestehenden Ownern.
**Auffälligkeiten/Performance/Kritische Findings:** offen bis Gesamtaudit.
**Referenzen:**
- `shared-docs/agents/tasks/threejs-tipps-neuschnitt-2026-08-04/`
- `shared-docs/threejs/`
- `shared-docs/projects/`

## Kommentare

### Phase 1
**Eingehalten:** Pflichtlesepfad ✅, bestehende Planung geprüft ✅, keine Quellrepo-Änderung ✅, Sichtprüfungsverbot ✅
**Auffälligkeiten (nach Schwere):** 🟠 Drei Dokus widersprechen dem zentralen Sichtprüfungsdeckel; 🟡 mehrere globale Owner nutzen noch unbelegte „könnte“-Checklisten statt Tippformat.

## Arbeitsprotokoll

### Phase 1 — Status partial
**Dateien:** Masterplan und vier Quellenpläne angelegt; globale Owner sowie vorhandene Projekt-Learnings vollständig gelesen.
**Entscheidungen:** 13 Owner bleiben zunächst bestehen; Dateizahl wird nur bei belegter Triggerüberschneidung gesenkt. Generierte Chats/Caches zählen nicht als fachliche Tasks.
**Unsicher / Risiko:** Quellenkorpora und aktuelle Codepfade müssen noch vollständig gegen die vorhandenen Zusammenfassungen geprüft werden.

## Offene Fix-Punkte
- [ ] Zwei-Bilder-Widerspruch in drei Dokus beheben.
- [ ] Unbelegte globale Checklisten in belegte Such-Tipps umformen oder entfernen.
- [ ] Avatar als Codequelle korrekt und ohne erfundenen Kostenbeleg einordnen.
