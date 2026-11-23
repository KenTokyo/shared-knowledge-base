# macOS-Ressourcen — Projekte, Pfade und Ports

Zentrale Übersicht der lokalen Ressourcen unter `/Users/kentoky/Documents/React Projects`.
Sie ordnet Projekte nach Three.js-Bezug, nennt geeignete Einsatzfelder und hält die konfigurierten lokalen Ports fest.

**Stand:** 2026-09-03 · **Letzter Vollscan:** 2026-08-04 über 20 direkte Verzeichnisse · **Aufgenommen:** 16 Codeprojekte und 4 Workspace-Ressourcen · **Ausgeschlossen:** 3 Sammelverzeichnisse · **Nachträge:** 2026-08-20 `signature-vfx-unified-library-v21-gpt-5-6-sol` und `Claude-Flakes`; 2026-09-03 `Cadle`; 2026-10-12 `benchmarking-area`; nicht als neuer Vollscan zu lesen.

**Trigger-Wörter:** „Avatar“, „Elemental“, „Domain Elemental“ → `domains/elemental` in `signature-vfx-unified-library-v21-gpt-5-6-sol` (Abschnitt 1). „Elemental Flakes“, „Claude Flakes“, „Snowflow“ → `Claude-Flakes` (Abschnitt 1); für Glass-Design und Icon-Erzeugung Abschnitt 1a im [Anhang](MACOS-RESSOURCEN-anhang.md). „Cadle“, „cadle.gg“, „hochwertige Landing“ → `Cadle` (Abschnitt 1); für Landing-/Marketing-Design Abschnitt 1b im [Anhang](MACOS-RESSOURCEN-anhang.md). Windows-Pfade stehen in [WINDOWS-RESSOURCEN.md](WINDOWS-RESSOURCEN.md) und gelten hier nicht.

## Pflicht vor jeder Ressourcennutzung

Eine Git-Ressource muss vor dem Lesen, Übernehmen oder Bearbeiten aktualisiert werden. `fetch` allein genügt nicht.

```bash
RESOURCE="/Users/kentoky/Documents/React Projects/<repo>"
git -C "$RESOURCE" status --short --branch
git -C "$RESOURCE" pull --ff-only
git -C "$RESOURCE" submodule update --init --recursive
```

- Erst Status prüfen, dann mit `pull --ff-only` aktualisieren.
- Nie fremde Änderungen durch `reset --hard`, pauschales Stashing oder Löschen überschreiben.
- Scheitert der sichere Pull wegen fremder Änderungen oder abweichender Branch-Historie, gilt die Ressource **nicht als aktuell**. Den Blocker nennen, statt mit einem möglicherweise alten Stand weiterzuarbeiten.
- Für ein aktuelles `shared-docs`-Submodul zusätzlich den Befehl aus der lokalen `AGENTS.md` nutzen, meist `git submodule update --remote shared-docs`.
- Workspace-, Archiv- und Platzhalterordner ohne Git-Repository können nicht gepullt werden; dort gilt der vorhandene lokale Stand.

## 1. Three.js als Kerntechnologie

| Ressource | Status und wofür sie gut ist | Sprachen und Stack | Absoluter macOS-Pfad |
|---|---|---|---|
| `quiz-arena-space` | Aktiv · Prozedurale Weltraumarena; gute Referenz für 3D-Welten, Raumkampf, Rendering, Capture und Crossword-Spielsysteme. | TypeScript, GLSL, HTML, CSS · Three.js 0.185, Vite 8 | `/Users/kentoky/Documents/React Projects/quiz-arena-space` |
| `Claude-of-tsushima` | Aktiv · Third-Person-Open-World auf einer großen Insel; gut für Weltmaßstab, Kamera, Kampf, Vegetation und Fantasy-VFX. | JavaScript, GLSL, HTML, CSS · Three.js r180, Vite 6 | `/Users/kentoky/Documents/React Projects/Claude-of-tsushima` |
| `duty-of-tsushima` | Aktiv · Wellenbasierter Insel-FPS; gut für Waffen, Gegner, Kampagnen, Performance und Capture-Harnesses. | JavaScript, GLSL, HTML, CSS · Three.js r180, Vite 7 | `/Users/kentoky/Documents/React Projects/duty-of-tsushima` |
| `voxel-samurai-quiz` | Aktiv · Umfangreiches Quiz-ARPG/MMORPG; stärkste Referenz für React Three Fiber, Klassen, Dungeons, Asset-/Audio-Labore und Multiplayer. | TypeScript, TSX, JavaScript, GLSL, CSS · React 19, Three.js 0.184, React Three Fiber, Vite 8, Colyseus | `/Users/kentoky/Documents/React Projects/voxel-samurai-quiz` |
| `quizshoot` | Aktiv · Kompakter Drei-Minuten-Quiz-FPS; gut für überschaubare TypeScript-Spielarchitektur, prozedurale Assets und Gegner-KI. | TypeScript, TSX, CSS, HTML · React 19, Three.js r128, Vite 7 | `/Users/kentoky/Documents/React Projects/quizshoot` |
| `quiz-blaster-arena` | **Deprecated** · Noch als Referenz für Quiz-Zieltafeln, Gegnerwellen, Boss, Waffenhitze, Shop und Socket.IO nutzbar. | TypeScript, TSX, CSS, JavaScript · React 19, Three.js 0.183, React Three Fiber, Vite 6, Express, Socket.IO | `/Users/kentoky/Documents/React Projects/quiz-blaster-arena` |
| `Claude-of-Duty` | Aktiv · Prozeduraler WebGL2-FPS; gut für eigene Render-, Physik-, Waffen-, Audio-, KI- und Performance-Systeme. | JavaScript, GLSL, HTML, CSS · Three.js r180, Vite 7 | `/Users/kentoky/Documents/React Projects/Claude-of-Duty` |
| `3-crossword-core-breaker` | **Leicht deprecated** · „Crossword Core Breaker“; weiter nützlich für Kreuzwort-/Vokabel-Gameplay, Tippen, Bossphasen und dauerhafte Upgrades. **Referenz-Implementierung des Spiel-UI-Hausstils [Premium-Graffiti](ui/PREMIUM-GRAFFITI-GAME-UI.md)** („Nachtschicht“, `DESIGN.md`, seit 11.10.2026). | TypeScript, TSX, CSS, JSON · React 19, Three.js 0.183, React Three Fiber, Vite 6 | `/Users/kentoky/Documents/React Projects/3-crossword-core-breaker` |
| `claude-desert` | Aktiv · Third-Person-Fantasy- und VFX-Showcase; gut für Shader, hochwertige Kampfeffekte und prozedurale Hero-Inszenierung. | JavaScript, GLSL, HTML, CSS · Three.js 0.185, Vite 8 | `/Users/kentoky/Documents/React Projects/claude-desert` |
| `signature-vfx-unified-library-v21-gpt-5-6-sol` | Aktiv · **Trigger-Wörter „Avatar“ und „Elemental“ meinen `domains/elemental` in diesem Repo.** Vereinte Signatur-VFX-Bibliothek mit sechs Domains; `domains/elemental` ist Domain Elemental mit neunzig prozeduralen Signaturen, Sechs-Slot-Loadout, Linien- und Fernzielbild, Sigil-Icons und Laufzeit-VFX-Editor. Stärkste Referenz für **Layering von Fähigkeiten**, Loadout-Bedienung und handgeschriebenes GLSL. | TypeScript, TSX, JavaScript, GLSL, HTML, CSS · React 18, Three.js 0.185, lil-gui, Vite 8 | `/Users/kentoky/Documents/React Projects/test-projects/signature-vfx-unified-library-v21-gpt-5-6-sol` · Domain: `…/domains/elemental` |
| `Claude-Flakes` | Aktiv · **Trigger-Wörter „Claude Flakes“, „Elemental Flakes“ und „Snowflow“ meinen dieses Repo.** Snowflow ist eine Schnee-Survivalwelt auf Babylon.js 9 / WebGPU mit Wellen, Quiz-Tafeln, Shop und Technomancer-Klasse; `elemental-flakes/` fährt daneben die Three.js-Fassung derselben Skills. Stärkste Referenz für **UI-Erlebnis**: Skill-Rail mit zwei Bänken, Loadout-Picker auf `L`, Skilltree und ein Sigil-Icon-Satz in einem Strichrahmen. | JavaScript, WGSL, GLSL, HTML, CSS · Babylon.js 9, WebGPU, Three.js 0.185, Vite 8 | `/Users/kentoky/Documents/React Projects/Claude-Flakes` · Three.js-Teil: `…/elemental-flakes` |
| `claude-tower-defense` | Aktiv · Action-Tower-Defense mit Held, Arena und Türmen; gut für Baufluss, Gegnerwellen, Kamera, prozedurale Welt und HUD. | JavaScript, GLSL, HTML, CSS · Three.js r180, Vite 6 | `/Users/kentoky/Documents/React Projects/claude-tower-defense` |
| `benchmarking-area` | Aktiv · **QUADRANT**, Benchmark-Arena für KI-Modelle: vier KI-gebaute Spiele laufen gleichzeitig in isolierten iframes (eigene Origins `slot-a…d.localhost`) mit geteilter Eingabe, festen Seeds und 60-Hz-Takt; Module Shooter, Souls-like, Wissenschaft, Nachbau nach Referenzvideo. Gut für Benchmark-Verträge (postMessage-Protokoll, SDK), messbare Prüfungen, Bewertung, Prompt-Erzeugung und Sci-Fi-Leitstand-UI. Explizit Sci-Fi statt Graffiti-Hausstil (Nutzerentscheidung). | TypeScript, TSX, GLSL, CSS · React 19, Three.js 0.186, motion 14, zustand 5, Vite 8 | `/Users/kentoky/Documents/React Projects/benchmarking-area` |
| `Cadle` | Aktiv · **Trigger-Wörter „Cadle“, „cadle.gg“ und „hochwertige Landing“ meinen dieses Repo.** Browser-FPS-RPG (Destiny-2-Gefühl, FFXIV-Optik) mit Landing unter `/` und Spiel unter `/play/`. Stärkste Referenz für **Marketing-/Landing-Design**: Gold-auf-Tinte-Palette, Glas-Platten, Split-Word-Reveals, metallische Pill-Buttons, Segment-Steuerung, Stat-Count-up (Abschnitt 1b). | JavaScript, GLSL, HTML, CSS · Three.js 0.185, postprocessing, Vite 8 | `/Users/kentoky/Documents/React Projects/Cadle` · Landing: `…/index.html` + `…/src/site/` |

## 1a/1b. Design-Referenzen (Anhang)

- [MACOS-RESSOURCEN-anhang.md](MACOS-RESSOURCEN-anhang.md): **1a** Glass-Design und Icon-Erzeugung (`Claude-Flakes/elemental-flakes`: `src/ui/styles.css`, `glyph-frame.js`, `ELEMENT_META`) · **1b** Landing-/Marketing-Design (`Cadle/index.html`, `Cadle/src/site/ui.js`: Vokabular, was nicht übernommen wird)

## 2. Three.js als Teil eines größeren Produktstacks

| Ressource | Status und wofür sie gut ist | Sprachen und Stack | Absoluter macOS-Pfad |
|---|---|---|---|
| `notetree-tanstack` | Aktiv · Plattformübergreifende Lern-App für Notizen, Quizze, Lernkarten und Crosswords; Three.js ist ein Feature-Baustein, nicht die Produktbasis. | TypeScript, TSX, JavaScript, CSS, SQL · React, TanStack Start/Router, Vite 8, Electron, Capacitor, TipTap, Drizzle, Supabase, Three.js/R3F | `/Users/kentoky/Documents/React Projects/notetree-tanstack` |

## 3. Anwendungen und Werkzeuge ohne Three.js

| Ressource | Status und wofür sie gut ist | Sprachen und Stack | Absoluter macOS-Pfad |
|---|---|---|---|
| `track-me-ai` | Aktiv · Erfasst und visualisiert Fitness-, Ernährungs-, Schlaf- und Fortschrittsdaten; Referenz für Mobile, Offline-Daten, Karten und MCP. | TypeScript, TSX, JavaScript, CSS, SQL · Next.js 14, React 18, Capacitor, MCP SDK, Drizzle, Supabase, Dexie, Leaflet | `/Users/kentoky/Documents/React Projects/track-me-ai` |
| `benchmarking-area` (QUADRANT) | `pnpm dev` / Preview | 5190 / 5191 | Fest mit `strictPort` auf `127.0.0.1`; Slots laufen auf `slot-a…d.localhost` mit demselben Port |
| `benchmarking-area` Modell-Workspaces | `pnpm dev` im Workspace aus `pnpm arena:workspace` | 5199 | Bevorzugt; Workspaces liegen außerhalb des Repos, mehrere gleichzeitig weichen aus |
| `uniai-chat-vscode-extension` | Aktiv · VS-Code-Erweiterung mit Chat-Webview für mehrere lokale und entfernte KI-/CLI-Anbieter; gut für Extension API, Webviews, lokale Proxy-Brücken und VSIX-Pakete. | TypeScript, JavaScript, HTML, CSS · VS Code Extension API, Node.js | `/Users/kentoky/Documents/React Projects/uniai-chat-vscode-extension` |

## 4. Workspace-, Archiv- und Platzhalterressourcen

| Ressource | Einordnung | Formate / Technik | Absoluter macOS-Pfad |
|---|---|---|---|
| `.unityAIChat` | Derzeit leerer UniAI-Chat-Ablageort für Gesprächsverläufe; kein ausführbares Projekt. | Workspace-Metadaten, vorgesehenes JSON-Schema | `/Users/kentoky/Documents/React Projects/.unityAIChat` |
| `.unityAIChat-backups` | Datierte Gesprächs-, Rewrite- und Git-Sicherungen für UniAI Chat und einzelne Projekte; nur zum Wiederherstellen und Nachschlagen. | JSON, Markdown, Text, Git-Patch, Git-Bundle | `/Users/kentoky/Documents/React Projects/.unityAIChat-backups` |
| `claude-cartoon-tsushima` | Unvollständiger NoteTree-Lernworkspace mit Regeln und Chat-Sitzung; kein Code-Repository. | Markdown, JSON · NoteTree-Workspace | `/Users/kentoky/Documents/React Projects/claude-cartoon-tsushima` |
| `new` | Leerer, ungeklärter Platzhalter ohne Manifest, Dokumentation oder Git-Repository; nicht als Projektvorlage behandeln. | Keine Dateien vorhanden | `/Users/kentoky/Documents/React Projects/new` |
| `Accs` | **Schlüsselablage des Users.** `KEYS.md` hält freigegebene Test-Schlüssel als `NAME=WERT` je Zeile (aktuell `OPENCODE_API_KEY`), daneben `API-KEYS.md` und `Business-data.md`. Nur lesen, Werte nie ausgeben oder committen. | Markdown | `/Users/kentoky/Desktop/Accs` |

## 5. Portliste

Die Tabelle enthält **konfigurierte oder vom Framework vorgegebene Ports**, keinen flüchtigen Prozessstatus. `fest` bedeutet: Ein zweiter Prozess soll bei Belegung scheitern. `bevorzugt` bedeutet: Das Werkzeug kann auf einen anderen freien Port ausweichen.

| Ressource / Dienst | Start oder Modus | Port(s) | Verhalten |
|---|---|---|---|
| `track-me-ai` | `pnpm dev` | 3000 | Next.js-Standard; bevorzugt, nicht als global reservierter Port behandeln |
| `track-me-ai` MCP über HTTP | optionaler HTTP-Transport | 3333 | Optional; der normale MCP-Entwicklungsmodus nutzt stdio und keinen TCP-Port |
| `notetree-tanstack` | `pnpm dev` | 3005 | Konfigurierter Hauptport |
| `notetree-tanstack` LAN / Notes | Sondermodi | 3006 / 3015 | Konfigurierte Zusatzports |
| `quiz-blaster-arena` | `pnpm dev` | 3030 / 3031 | Vite bevorzugt 3030; Socket.IO ist fest auf 3031 · deprecated |
| `3-crossword-core-breaker` | `pnpm dev` | 3060 | Vite bevorzugt 3060; Preview beginnt ohne feste Reservierung bei 4173 · leicht deprecated |
| `voxel-samurai-quiz` | `pnpm dev` | 3070 | Hauptanwendung fest mit `strictPort` |
| `voxel-samurai-quiz` Labore | jeweiliger Labor-Modus | 3071 / 3072 / 3073 | Asset-, Sound- und Monster-Lab; Quizfall World Runtime läuft in der Hauptanwendung auf 3070 |
| `voxel-samurai-quiz` Multiplayer | Servermodus | 2567 | Standardport des Multiplayer-Servers |
| `voxel-samurai-quiz` Previews | jeweiliger Preview-Modus | 4174 / 4175 / 4176 | Asset-, Sound- und Monster-Preview; Quizfall World Runtime läuft im Spiel-Preview |
| `voxel-samurai-quiz` Mess-Preview | `preview:measure` | 4180 | **Konflikt:** kollidiert mit `Claude-of-tsushima` Preview |
| `quizshoot` | `pnpm dev` | ab 5173 | Unfixierter Vite-Standard; weicht bei Belegung aus, Preview entsprechend ab 4173 |
| `claude-desert` | `npm run dev` / Preview | 5173 / 4173 | Fest mit `strictPort` |
| `Claude-of-Duty` | `pnpm dev` / Preview | 5178 / 4178 | Fest mit `strictPort` |
| `Claude-of-tsushima` | `pnpm dev` / Preview | 5180 / 4180 | Fest mit `strictPort`; Preview kollidiert mit Voxel-Mess-Preview |
| `claude-tower-defense` | `pnpm dev` / Preview | 5183 / 4183 | Fest mit `strictPort` |
| `signature-vfx-unified-library-v21-gpt-5-6-sol` | `pnpm dev` / Preview | 6117 | Fest mit `strictPort` auf `127.0.0.1`; Dev und Preview teilen den Port und laufen nicht gleichzeitig |
| `Claude-Flakes` Snowflow | `npm run dev` | 5173 | Fest mit `strictPort`; **Konflikt:** kollidiert mit `claude-desert` Dev |
| `Cadle` | `npm run dev` / Preview | 5173 / 5173 | Fest mit `strictPort` auf `127.0.0.1`; Dev und Preview teilen den Port; **Konflikt:** kollidiert mit `claude-desert` und `Claude-Flakes` Snowflow |
| `Claude-Flakes` Elemental Flakes | `npm run flakes` | 5177 | Fest mit `strictPort`; eigener Vite-Root unter `elemental-flakes/` |
| `quiz-arena-space` | `npm run dev` / Preview | 5184 / 4184 | Fest mit `strictPort` |
| `duty-of-tsushima` | `pnpm dev` / Preview | 5185 / 4185 | Fest mit `strictPort` |
| `uniai-chat-vscode-extension` | `pnpm compile` / `pnpm watch` | 18765 bei Bedarf | Kein Dev-/Preview-Server; gemeinsamer Loopback-Port für lokale Claude-Code-Proxy-Brücken |
| Workspace-/Archivordner | nicht ausführbar | keiner | Kein Server |

### Bekannte Überschneidungen

1. **4180 fest belegt:** `Claude-of-tsushima` Preview und `voxel-samurai-quiz` Mess-Preview können nicht gleichzeitig laufen.
2. **5173/4173 gemischt:** `claude-desert`, `Claude-Flakes` Snowflow und `Cadle` reservieren 5173 alle drei fest und können nicht gleichzeitig laufen (Cadle auch in der Preview). `quizshoot` und die freie Crossword-Preview beginnen dort nur standardmäßig und können ausweichen.
3. Alte laufende Prozesse oder CLI-Overrides können von dieser Konfiguration abweichen. Auf macOS den echten Listener prüfen:

```bash
lsof -nP -iTCP:<PORT> -sTCP:LISTEN
```

Ein belegter Port allein beweist nicht das richtige Projekt; zusätzlich Prozess-Arbeitsverzeichnis und Startbefehl prüfen.

## 6. Bewusst ausgeschlossene Verzeichnisse

| Verzeichnis | Grund |
|---|---|
| `/Users/kentoky/Documents/React Projects/kundenprojekte` | Kundenprojekte sind ausdrücklich nicht Teil dieser gemeinsamen Ressourcenliste. |
| `/Users/kentoky/Documents/React Projects/sonstiges` | Der Sammelordner `Sonstiges` ist ausdrücklich ausgeschlossen. |
| `/Users/kentoky/Documents/React Projects/Gaming Docs` | Entspricht dem vorhandenen Games-/Games-Ressourcenordner und ist ausdrücklich ausgeschlossen. |

Direkte Ordner mit den exakten Namen `Games` oder `Games Folder` waren beim Scan nicht vorhanden.

## Pflege

- Bei neuem oder entferntem Top-Level-Verzeichnis, geändertem Projektstatus oder Portwechsel diese Datei aktualisieren.
- Pfade exakt in der Groß-/Kleinschreibung von macOS eintragen.
- Keine Kundenprojekte oder Inhalte aus `sonstiges` beziehungsweise `Gaming Docs` ergänzen.
- Keine flüchtigen Listenerzustände als dauerhafte Wahrheit speichern.
- Neue feste Ports zuerst gegen diese Liste und anschließend mit `lsof` prüfen.
