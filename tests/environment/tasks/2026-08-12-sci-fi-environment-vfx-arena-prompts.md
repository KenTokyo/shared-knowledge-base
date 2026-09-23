# Task — Sci-Fi-Environment-VFX-Arena-Prompts

## Ziel
Sechs vergleichbare LLM-Arena-Prompts für ein kleines, identisches Sci-Fi-VFX-Studio erstellen. Verglichen werden ausschließlich technische Ansätze für Wind, fliegende Blätter, Staub, Nebel, Rauch und Vegetationsreaktion – keine Weltgenerierung.

## Phasen
- [x] AGENTS.md, Referenzprompts und fünf Bildreferenzen auswerten.
- [x] Identische Studio-Szene, Bedienung, Messwerte und Bewertungskriterien festlegen.
- [x] Sechs klar unterscheidbare technische VFX-Variationen ausformulieren.
- [x] Dokument prüfen und Abschluss festhalten.

## Entscheidungen
- Ablage: ursprünglich neben den LLM-Arena-Dokumenten unter `shared/shared-docs/agents`; seit Runde 5 fachlich einsortiert unter `shared/shared-docs/tests/environment`.
- Die Mini-Map bleibt in allen sechs Läufen fest und absichtlich einfach; nur die Simulations-/Rendering-Methode wechselt.
- Licht ist fest vorgegeben und besitzt keine UI-Regler. Der Fokus liegt auf Wind, Nebel, Rauch, Staub, Blättern und optionalem Post-Processing.
- Bildreferenzen dienen nur als Qualitäts- und Bewegungsreferenz, nicht als Auftrag zum Nachbau einer Welt oder konkreter Spielinhalte.

## Findings
- Bild 1 betont klar gerichtete, unterschiedlich große und tiefengestaffelte rote Blätter.
- Bild 2 zeigt die gemeinsame Wirkung aus Böen, bewegtem Laub, bodennahem Dunst und gerichteter Vegetation.
- Bild 3 zeigt dichte Baumkronen, fallendes/fliegendes Laub und atmosphärische Staffelung.
- Bild 4 zeigt großflächige Windwellen im Gras sowie Nebel- und Wolkenmassen als Richtungsanzeiger.
- Bild 5 zeigt warmes Gegenlicht, bodennahen Dunst und konsistente Windreaktion von Gras, Partikeln und Stoff.

## Unsicheres
- Kein offener externer Blocker. Post-Processing wird kompakt und sekundär gehalten, da der Nutzer es nur optional genannt hat.

## Fortschrittslog

### Runde 1 — 2026-08-12
Referenzen gelesen und Scope auf ein kontrolliertes Environment-VFX-Labor statt Weltgenerierung festgelegt.

### Runde 2 — 2026-08-12
Das Arena-Dokument mit Locked Brief, einheitlichen Reglern, vier Presets, Diagnostik, Performance-HUD, sechs technischen Ansätzen und Bewertungsreihenfolge erstellt. Die Variationen testen analytische Shader-Advektion, CPU-Partikelphysik, GPGPU, ein Flow-Field-Gitter, volumetrisches Rendering und einen hybriden Produktionsansatz. Markdown-Struktur, sechs Promptblöcke und Zeilenlimits geprüft. Gemäß Regel für reine Dokumentationsarbeit keine Tests oder UI-Sichtprüfung ausgeführt.

### Runde 3 — 2026-08-12
Nutzerfeedback umgesetzt: Den vollständigen Abschnitt mit Bildreferenzen, sämtliche Dateipfade und den letzten Referenzverweis aus dem Arena-Dokument entfernt. Die gewünschte Optik wird nun ausschließlich durch konkrete technische Bauvorgaben beschrieben. Technische Details bewusst kompakt beibehalten, weil genau sie den fairen Vergleich ohne Bildvorlagen ermöglichen. Keine Tests oder UI-Sichtprüfung bei dieser reinen Dokumentationsänderung.

### Runde 4 — 2026-08-12
Aktuelles Ergebnisbild analysiert: Der bisherige Bodennebel hellt vor allem die Fläche auf, statt die Sichtweite um eine Person zu reduzieren; die festen Rauchpunkte lesen sich als große weiße Kugeln beziehungsweise Vent-Plumes. Locked Brief und Controls deshalb neu gefasst: Third-Person-Mannequin, kamerazentrierte Distanz-Extinktion über die volle Sichthöhe, Fog-Density ab echtem Nullwert mit feiner Low-End-Steuerung, vertikale Reichweite bis 150 Meter sowie abgeleitete Sichtweite. Feste Rauchquellen in allen sechs Variationen durch deterministische, zufällig positionierte, wind- und böengetriebene Smoke Wisps ersetzt. Ground Mist bleibt nur ein zurückhaltender Sekundärlayer. Bewertungsablauf entsprechend angepasst. Keine Tests oder UI-Sichtprüfung bei reiner Dokumentationsänderung.

### Runde 5 — 2026-08-12
Die frühere Ablageentscheidung unter `shared/shared-docs/agents` ist durch die neue zentrale Sortierregel abgelöst. Arena-Dokument und dieses Fortschrittsprotokoll liegen jetzt unter `shared/shared-docs/tests/environment`; weitere LLM-Arena-Tests wurden entsprechend nach `animation`, `vfx` und `world` sortiert. Keine Tests oder Sichtprüfung bei reiner Dokumentationsorganisation.
