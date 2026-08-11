# Custom-GLSL-Migration-Tutorial und Allround-Prompt

## Ziel

Ein kompaktes, wiederverwendbares Tutorial samt Copy-ready-Prompt erstellen, mit dem eine KI bestehende Three.js-Projekte zuverlässig auf projekt-eigene, handgeschriebene GLSL-VFX und laufzeitgenerierte Geometrie migriert.

## Phasen

- [x] Phase 1: Regeln und vorhandene Boxer-/VFX-Prompts lesen.
- [x] Phase 2: technische Render-, Migrations- und Edge-Case-Kriterien verdichten.
- [x] Phase 3: Tutorial und kompakten Allround-Prompt schreiben.
- [x] Phase 4: Dokumentstruktur, UTF-8 und Vollständigkeit statisch prüfen.

## Entscheidungen

- Neue Datei: `../CUSTOM-GLSL-MIGRATION-TUTORIAL-PROMPT.md`.
- Der Prompt verlangt zuerst eine Bestandsaufnahme und danach eine familienweise Migration im echten Produktionspfad; dadurch vermeidet er den häufigen Fehler, neben dem vorhandenen Renderer nur eine isolierte Shader-Demo zu bauen.
- Charakter-, Welt- und UI-Assets bleiben erlaubt. Nur sichtbare VFX-Quellen müssen prozedural sein.
- Keine Sichtprüfung und keine Tests, da dies eine reine Dokumentationsaufgabe ist.

## Findings

- Der bisherige kurze „Allround“-Abschnitt beschreibt hauptsächlich gewünschte Effektformen, aber nicht Renderer-Eigentümer, Materialstrategie, Raum-/Zeitquelle, Renderreihenfolge, Cleanup oder Shader-Fehlerdiagnose.
- Der globale VFX-Vertrag nennt bereits die entscheidenden Architekturprinzipien: eine finale Weltbahn für alle Consumer, explizite Beats, vollständiger Pool-Reset, feste Kapazität und keine Overflow-Allokation.
- Der vom Nutzer genannte lokale Ordner `threejs-procedural-fighter-showcase-opus-5` existiert unter diesem exakten Namen nicht. Der ähnlich benannte Ordner `threejs-procedural-combat-animation-opus-5-max` besitzt in der geprüften App-Datei keine direkt erkennbare Custom-GLSL-Integration und wird deshalb nicht als technische Referenz behauptet.
- Der zweite genannte Beispielpfad liegt außerhalb des laut `AGENTS.md` erlaubten Projektbereichs und wurde nicht geöffnet.

## Unsicheres

- Keine Laufzeit-/Bildbelege für die zwei genannten Referenzprojekte; Aussagen im Tutorial werden als allgemeine Three.js-Migrationskriterien formuliert, nicht als vermeintlich verifizierte Projektdetails.

## Fortschrittslog (append-only)

### Runde 1

Regeln, Boxer-Prompts, bestehende Szenario-Prompts und globale VFX-Hinweise gelesen. Kernlücke des bisherigen Allround-Prompts identifiziert: Er fordert einen Look, aber keinen vollständigen Umbau des vorhandenen Produktionspfads.

### Runde 2

Migrationskriterien verdichtet: vorhandenen Renderer und echte Trigger behalten, Materialstrategie je Objektklasse wählen, eine gemeinsame Zeit-/Raumquelle einführen, Renderrollen explizit machen, alte Pfade erst nach Nullreferenz löschen und Shader-Kompilation gegen die reale Pipeline absichern. Edge Cases für React Three Fiber, GLTF/PBR, vorhandene Custom Shader, PostFX, WebGL-Versionen, Transparenz, Instancing, UI und WebGPU aufgenommen.

### Runde 3

`CUSTOM-GLSL-MIGRATION-TUTORIAL-PROMPT.md` geschrieben. Enthalten sind Umbauprinzip, Behalten/Ergänzen/Ersetzen/Löschen, Einsatzbereiche einschließlich Schwertkämpfer und UI, Systemvarianten, Unsichtbar-/Schwarz-Rendering-Gate sowie ein direkt kopierbarer, kompakter Migrationsprompt mit vier Platzhaltern.

### Runde 4

Statische Dokumentprüfung abgeschlossen: Tutorial 144 Zeilen, Taskdatei 44 Zeilen, beide valides UTF-8, keine nachgestellten Leerzeichen, Code-Fence-Paar vollständig und Dateilimits eingehalten. Gemäß Regel für reine Dokumentationsänderungen keine Tests und keine Sichtprüfung ausgeführt.
