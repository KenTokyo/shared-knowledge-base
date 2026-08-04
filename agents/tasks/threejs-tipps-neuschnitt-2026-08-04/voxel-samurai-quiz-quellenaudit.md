# Voxel Samurai Quiz — Quellenplanung für globale 3D-Tipps

## Ziel
- Stärkste Animations-, VFX-, Kamera-, Runtime- und Performancebefunde aus aktuellem Hauptprojekt gewinnen.
- Relevante Task-/Completed-Dokumente und Codepfade prüfen, ohne fremde offene Arbeitsströme zu berühren.
- Lokale AEON-/R3F-Werkzeuge im Projektordner lassen; stackneutrale Mechanismen global schärfen.

## Phasen

### Phase 1 — Relevanter Dokumentkorpus
**Ziel:** Fachlich einschlägige Tasks und Abschlüsse sind vollständig erfasst, generierte Chats klar ausgeschlossen.
- [ ] Aktive Architektur-/VFX-/Animationsplanungen und passende `.completed/`-Dateien vollständig lesen.
- [ ] Bestehende sieben Projekttippdateien gegen aktuelle Taskabschlüsse prüfen.
- [ ] Frühere Three.js-Neuschnitt- und Regelplanungen auf wiederholte oder gestürzte Aussagen prüfen.
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
- [ ] Third-Person-Rig, Clip-/Posepfade, Waffen-/Kontaktpfad und Animationseditor prüfen.
- [ ] VFX-Runtime, Pools, Skills, Parameter-/Preset-System und Effektatelier prüfen.
- [ ] Shader-Warmup, Lichtzahl, Renderhüllen und Effektbudgets gegen bestehende Performance-Tipps prüfen.
**Ergebnis-Satz:** Animation und VFX erhalten konkrete Fehlerdiagnosen aus dem echten Spielpfad.
**Eingehalten:** keine Sichtprüfung, kein Dev-Server, keine Gameplay-Sonde.
**Architektur passt:** Pose/Kontakt bei Animation; Effektform bei VFX; Compile/Lifecycle bei Shader/Runtime/Performance.
**Auffälligkeiten/Performance/Kritische Findings:** offen bis Codegegenprobe.
**Referenzen:**
- `src/components/3d/`
- `src/lib/vfx/`
- `apps/asset-lab/`

### Phase 3 — Promotion und Abschluss
**Ziel:** Projektbefunde schärfen globale Tipps, ohne lokale Zahlen und Werkzeuge zu duplizieren.
- [ ] Kandidaten mit Claude Flakes, Tsushima oder Avatar kreuzen.
- [ ] Bereits globale lange Tipps kürzen oder lokalisieren, ohne Beleg zu verlieren.
- [ ] Projekttrigger nur bei neuer lokaler Tippklasse ändern.
**Ergebnis-Satz:** Voxel liefert starke Animation/VFX-Mechanismen; projektspezifische Messrezepte bleiben lokal.
**Eingehalten:** ein Tipp an einer Stelle, Herkunft und Datum, ungefähr zwölf Tipps pro Owner.
**Architektur passt:** Global bleibt Mechanismus; Projektordner bleibt Instrument und Kalibrierung.
**Auffälligkeiten/Performance/Kritische Findings:** offen.
**Referenzen:**
- `shared-docs/projects/voxel-samurai-quiz/`
- `shared-docs/threejs/ANIMATION-CHARACTER.md`
- `shared-docs/threejs/VFX.md`

## Arbeitsprotokoll

### Phase 1 — Status partial
**Dateien:** Sieben Projekttippdateien gelesen; relevante abgeschlossene VFX-, Welt- und Regelaufträge inventarisiert.
**Entscheidungen:** Nur fachlich einschlägige Tasks werden voll gelesen; Chatcache, temporäre Messdateien und Asset-Benchmark-Massen sind kein Planungsbestand.
**Unsicher / Risiko:** Animation ist über mehrere Alt-/AEON-/Studio-Pfade verteilt; Owner müssen vor Übernahme sauber getrennt werden.

## Offene Fix-Punkte
- [ ] Relevante Task-/Completed-Auswahl abschließen und vollständig lesen.
- [ ] Animation/VFX-Kandidaten gegen aktuelle Codeowner prüfen.
