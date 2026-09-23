# Voxel Samurai Quiz — Quellenplanung für globale 3D-Tipps

## Ziel
- Stärkste Animations-, VFX-, Kamera-, Runtime- und Performancebefunde aus aktuellem Hauptprojekt gewinnen.
- Relevante Task-/Completed-Dokumente und Codepfade prüfen, ohne fremde offene Arbeitsströme zu berühren.
- Lokale AEON-/R3F-Werkzeuge im Projektordner lassen; stackneutrale Mechanismen global schärfen.

## Phasen

### Phase 1 — Relevanter Dokumentkorpus
**Ziel:** Fachlich einschlägige Tasks und Abschlüsse sind vollständig erfasst, generierte Chats klar ausgeschlossen.
- [x] Aktive Architektur-/VFX-/Animationsplanungen und passende `.completed/`-Dateien vollständig lesen.
- [x] Bestehende sieben Projekttippdateien gegen aktuelle Taskabschlüsse prüfen.
- [x] Frühere Three.js-Neuschnitt- und Regelplanungen auf wiederholte oder gestürzte Aussagen prüfen.
**Ergebnis-Satz:** Neue Tipps stammen aus belegter Projektarbeit, nicht aus dem 5.000-Dateien-Rauschen generierter Verläufe.
**Eingehalten:** parallele Asset-Lab-Änderungen unangetastet, kein Quellcode-Edit.
**Architektur passt:** Aktive Projektdoku definiert Soll; `.completed/` belegt Ergebnis; Code bestätigt Mechanismus.
**Auffälligkeiten/Performance/Kritische Findings:** Breite Dateinamenssuche zählt tausende `.unityAIChat`-Verläufe und Asset-Benchmark-Dateien falsch als Tasks.
**Referenzen:**
- `.completed/`
- `docs/`
- `prompts/`

### Phase 2 — Animation und VFX im Code
**Ziel:** Globale Kandidaten sind an aktuellen Runtime-Eigentümern gegengeprüft.
- [x] Third-Person-Rig, Clip-/Posepfade, Waffen-/Kontaktpfad und Animationseditor prüfen.
- [x] VFX-Runtime, Pools, Skills, Parameter-/Preset-System und Effektatelier prüfen.
- [x] Shader-Warmup, Lichtzahl, Renderhüllen und Effektbudgets gegen bestehende Performance-Tipps prüfen.
**Ergebnis-Satz:** Animation und VFX erhalten konkrete Fehlerdiagnosen aus dem echten Spielpfad.
**Eingehalten:** keine Sichtprüfung, kein Dev-Server, keine Gameplay-Sonde.
**Architektur passt:** Pose/Kontakt bei Animation; Effektform bei VFX; Compile/Lifecycle bei Shader/Runtime/Performance.
**Auffälligkeiten/Performance/Kritische Findings:** Support-Hand-Solver fordert Klassenpose plus Weltmatrix vor Kontakt; sechs Alive-Knoten besitzen exklusive Transformrollen. VFX-Eventruntime führt harte Familien-/Batchbudgets und Dropzähler, Forge eine gemeinsame Sanitizing-Grenze. Feste Apex-Lichtslots und montierte Effekt-Renderer belegen Lichtzahl-/Compile-Lifecycle; `Effects.tsx` senkte damit Thrash 9→0 und Compile 50→5/65→2.
**Referenzen:**
- `src/components/3d/`
- `src/lib/vfx/`
- `apps/asset-lab/`

### Phase 3 — Promotion und Abschluss
**Ziel:** Projektbefunde schärfen globale Tipps, ohne lokale Zahlen und Werkzeuge zu duplizieren.
- [x] Kandidaten mit Claude Flakes, Tsushima oder Avatar kreuzen.
- [x] Bereits globale lange Tipps kürzen oder lokalisieren, ohne Beleg zu verlieren.
- [x] Projekttrigger nur bei neuer lokaler Tippklasse ändern.
**Ergebnis-Satz:** Voxel liefert starke Animation/VFX-Mechanismen; projektspezifische Messrezepte bleiben lokal.
**Eingehalten:** ein Tipp an einer Stelle, Herkunft und Datum, ungefähr zwölf Tipps pro Owner.
**Architektur passt:** Global bleibt Mechanismus; Projektordner bleibt Instrument und Kalibrierung.
**Auffälligkeiten/Performance/Kritische Findings:** Animation/Kontakt, VFX-Ereignisse, Forge-Parameter, feste Lichtplätze, montierte Nullpfade, Warm-up und Bounds wurden global nur als Mechanismen übernommen. AEON-Proben, Klassenwerte, Programmlisten und konkrete Toolaufrufe bleiben in den sieben Projektdateien.
**Referenzen:**
- `shared-docs/projects/voxel-samurai-quiz/`
- `shared-docs/threejs/ANIMATION-CHARACTER.md`
- `shared-docs/threejs/VFX.md`

## Arbeitsprotokoll

### Phasen 1–3 — abgeschlossen
**Dateien:** 214 `.completed/` inventarisiert; 56 breite Namenskandidaten auf die tatsächlichen Animation-, VFX-, AEON- und Performanceowner eingegrenzt. Sieben Projektdateien, einschlägige Tasks/Abschlüsse und aktuelle Codeowner gegengelesen.
**Entscheidungen:** Chatcache, temporäre Messdateien und Asset-Benchmark-Massen sind kein Planungsbestand. Alt-R3F, AEON-Welt, Klassenrig, VFX-Runtime und Forge wurden als getrennte Besitzer behandelt.
**Unsicher / Risiko:** Der Hauptworktree enthält parallele Fremdarbeit. Audit und Doku berühren keine Quell- oder Asset-Lab-Datei.

## Offene Fix-Punkte
- [x] Relevante Task-/Completed-Auswahl abschließen und vollständig lesen.
- [x] Animation/VFX-Kandidaten gegen aktuelle Codeowner prüfen.
