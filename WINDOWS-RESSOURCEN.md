# Windows-Ressourcen — Projekte, Pfade und Ports

Kompakte Pfadkarte für häufig genutzte lokale Projekte unter Windows. macOS erhält eine eigene Datei; diese absoluten
Windows-Pfade dort nicht übernehmen.

**Stand:** 2026-08-04 · Ports stammen aus Projektkonfigurationen, nicht aus laufenden Prozessen.
`Standard` bedeutet: Vite-Default ohne feste Reservierung.

## Kernprojekte

| Projekt | Windows-Pfad | Kurzbeschreibung | Stack | Sprache | Ports |
|---|---|---|---|---|---|
| **Voxel Samurai Quiz** | `D:\CODING\React Projects\games\voxel-samurai-quiz` | Wichtigstes 3D-Spiel: Voxel-Action-Quiz mit Klassenkampf, Dungeons, Multiplayer und Quizfall World Runtime. Enthält Asset-, Sound- und Monster-Lab. | React · React Three Fiber · Three.js | TypeScript | Dev: [3070 Spiel + Quizfall World Runtime](http://localhost:3070) · [3071 Asset](http://localhost:3071) · [3072 Sound](http://localhost:3072) · [3073 Monster](http://localhost:3073) · [3074 Legacy Animation](http://localhost:3074/animation-lab/) · 2567 Multiplayer; Preview: [4173 Spiel](http://localhost:4173) Standard · [4174 Asset](http://localhost:4174) · [4175 Sound](http://localhost:4175) · [4176 Monster](http://localhost:4176) · [4180 Mess-Build](http://localhost:4180) |
| **UniAI Chat** | `D:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension` | VS-Code-Erweiterung für mehrere KI-CLI- und Provider-Wege in einer Chatoberfläche. Verwaltet Chats, Provider, Subagents und lokale Brücken. | VS Code · Webview · Node.js | TypeScript | kein Dev-/Preview-Server · 18765 lokaler Proxy bei Bedarf |
| **NoteTree** | `D:\CODING\React Projects\notetree\notetree-tanstack` | Lern- und Notiz-App für Notizen, Quizze, Lernkarten und KI-gestütztes Lernen. Läuft als Web-, Electron- und mobile App. | React · TanStack · Electron | TypeScript | Dev: [3005 App/Electron](http://localhost:3005) · [3006 LAN](http://localhost:3006) · [3015 Notes](http://localhost:3015/notes); Preview: [3005 App](http://localhost:3005) · [3015 Notes](http://localhost:3015/notes) |

## 3D-Spielreferenzen

| Projekt | Windows-Pfad | Kurzbeschreibung | Stack | Sprache | Dev / Preview |
|---|---|---|---|---|---|
| **Bastion of the Emberveil** (`claude-tower-defense`) | `D:\CODING\React Projects\github-repos-examples\claude-tower-defense` | Third-Person-Fantasy-Action mit Tower-Defense. Welt und Assets entstehen prozedural in Three.js. | Three.js · Vite | JavaScript | [5183](http://localhost:5183) / [4183](http://localhost:4183) |
| **Claude of Duty** | `D:\CODING\React Projects\github-repos-examples\Claude-of-Duty` | Browser-Ego-Shooter mit Gegner-KI, Waffen und HDR-Renderpipeline. Geometrie, Texturen, Animationen und Audio entstehen aus Code. | Three.js · WebGL2 · Vite | JavaScript | [5178](http://localhost:5178) / [4178](http://localhost:4178) |
| **Claude of Duty Quiz** (`quizshoot`) | `D:\CODING\React Projects\github-repos-examples\quizshoot` | React-Ego-Shooter in einer Container-Arena mit Gegner-KI, vier Waffen und HUD. Three.js r128 bleibt für das bestehende Renderverhalten festgesetzt. | React · Three.js · Vite | TypeScript | [5173](http://localhost:5173) Standard / [4173](http://localhost:4173) Standard |
| **Ashen Desert** (`claude-desert`) | `D:\CODING\React Projects\github-repos-examples\claude-desert` | Third-Person-Fantasy-Kampf und VFX-Schaukasten. Dient als kompakte Three.js-Referenz für prozedurale Szenen und Effekte. | Three.js · Vite | JavaScript | [5173](http://localhost:5173) / [4173](http://localhost:4173) |
| **Claude of Tsushima** | `D:\CODING\React Projects\github-repos-examples\Claude-of-tsushima` | Third-Person-Open-World-Vertical-Slice auf einer prozeduralen Insel. Fokus: Weltbau, Samurai-Kampf, VFX und Messwerkzeuge. | Three.js · Vite | JavaScript | [5180](http://localhost:5180) / [4180](http://localhost:4180) |
| **Bending Sandbox** (`AvatarCastingAbilitiesThreeJS`) | `D:\CODING\React Projects\github-repos-examples\AvatarCastingAbilitiesThreeJS` | Avatar-inspirierte Elementar-Sandbox: Pfad auf den Boden zeichnen, loslassen, Feuer-/Wasser-/Erde-/Luft-Fähigkeit läuft die Spline ab und detoniert. Referenz für **Layering von Fähigkeiten**, den Look des VFX-Editors und Preset-Bedienung. **Trigger: sagt der Nutzer „Avatar“, ist dieses Projekt gemeint.** | Three.js 0.185 · lil-gui · GLSL · Vite 8 | JavaScript | [5173](http://127.0.0.1:5173) fest auf `127.0.0.1` / [4173](http://localhost:4173) Standard |
| **Domain Elemental** (`LinearAbiltyCastingThreeJS`) | `D:\CODING\React Projects\github-repos-examples\LinearAbiltyCastingThreeJS` | Qualitäts- und Architekturreferenz für vollständig prozedurale Skill-VFX: handgeschriebenes GLSL, laufzeitgenerierte Geometrie, exakte AoE-/Skillshot-Zielbilder, GPU-Partikel, Live-Parameter und gekoppelte Cast-Beats. Keine Effekttexturen, Sprites, Flipbooks oder VFX-Meshes auf Disk. | Three.js 0.185.1 · lil-gui · GLSL · Vite 8 | JavaScript | [5173](http://127.0.0.1:5173) Standard / [4173](http://localhost:4173) Standard |
| **Snowflow** (`Claude-Flakes`) | `D:\CODING\React Projects\github-repos-examples\Claude-Flakes` | Wave-Survival-Spiel auf einem Echtzeit-Schneerenderer. Wichtige Babylon-/WebGPU-Referenz, ausdrücklich kein Three.js-Projekt. | Babylon.js · WebGPU · WGSL | JavaScript / WGSL | [5173](http://localhost:5173) / [4173](http://localhost:4173) Standard |
| **Starforge Arena** (`quiz-arena-space`) | `D:\CODING\React Projects\github-repos-examples\quiz-arena-space` | Browserbasiertes 3D-Weltraum-Action-Roguelite. Dient als schlanke Three.js-Spielreferenz. | Three.js · Vite | TypeScript | [5184](http://localhost:5184) / [4184](http://localhost:4184) |

## VFX-Referenzrouting

- Verbindlicher Quellenvertrag für neue Runtime-VFX: [`threejs/VFX.md`](threejs/VFX.md); Three.js/WebGL nutzt eigenes handgeschriebenes GLSL, andere Renderer eigenen nativen Shadercode.
- `LinearAbiltyCastingThreeJS` liefert Qualitätsrollen: dominante Silhouette, Cast-Timeline, gemeinsamer Raumanker, prozedurale Layer, exakter AoE-Footprint, Live-Tuning, Pools und klare Degradation.
- Referenz nie kopieren: kein Code, Shader, exakter Skill, sichtbare Silhouette, UI, Preset oder Asset übernehmen. Zielprojekt erfindet Wirkung und Skill-Shell selbst; nur belegte Architekturgründe übertragen.
- Avatar/Bending bleibt ergänzende Layering- und Editor-UX-Gegenprobe, nie Quelle für sichtbare Effektassets oder einen zweiten Runtime-Renderer.

## Veraltet — nicht für neue Arbeit

| Projekt | Windows-Pfad | Kurzbeschreibung | Stack | Sprache | Dev / Preview |
|---|---|---|---|---|---|
| **Crossword Core Breaker** | `D:\CODING\React Projects\games\crossword-core-breaker` | Veralteter Synthwave-Typing-Shooter und Vokabeltrainer. Nur noch als Altvergleich verwenden. | React · React Three Fiber · Three.js | TypeScript | [3060](http://localhost:3060) / [4173](http://localhost:4173) Standard |
| **Quiz Blaster Arena** | `D:\CODING\React Projects\games\quiz-blaster-arena` | Deprecated First-Person-Quiz-Shooter mit schießbaren Antworttafeln. Keine neue Arbeit darauf aufbauen. | React · React Three Fiber · Three.js | TypeScript | [3035](http://localhost:3035) / [4173](http://localhost:4173) Standard |

## Portregeln

1. Konfiguration ist die Wahrheit; diese Übersicht nach Pfad-, Status- oder Portänderungen mitpflegen.
2. Port 5173 kollidiert zwischen `claude-desert`, `Claude-Flakes`, `AvatarCastingAbilitiesThreeJS` und dem Vite-Standard von `quizshoot`. Die Bending Sandbox bindet zusätzlich fest an `127.0.0.1`, `localhost` kann dort je nach IPv6-Auflösung ins Leere zeigen.
3. Port 4173 ist bei mehreren Projekten Preview-Standard. Kollidierende Projekte nur einzeln starten oder per CLI-Port trennen.
4. Ein belegter Port beweist nicht, dass das richtige Projekt läuft; Prozess-Arbeitsverzeichnis und HTTP-Antwort mitprüfen.
