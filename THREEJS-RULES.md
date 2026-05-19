# Three.js, R3F, WebGPU und 3D-Performance-Regeln

**Zweck:** Diese Datei ist die zentrale Arbeits-Guideline für 3D-Performance mit Three.js, React Three Fiber, WebGL, WebGPU, VFX, Gegner-Rendering und Voxel-/Tile-Maps.

**Strukturregel für diese Doku:** Nur H1 und H2 verwenden. Unterthemen laufen über fett markierte Stichpunkte, damit die Datei kompakt bleibt und nicht in zu viele Überschrift-Ebenen zerfällt.

**Wichtig zur Einordnung:** Abschnitt 1 bis 12 sind globale Regeln für Three.js/R3F-Projekte. Abschnitt 13 bis 18 sind bewusst projektbezogen und gelten speziell für dieses Voxel-Samurai-Quiz-Projekt mit Klassen-VFX, Gegnerwellen, Voxel-Terrain, Lai-Samurai-Skills, Runtime-Reports und WebGPU-A/B-Läufen.

**Begriffserklärung:** Wenn Begriffe wie „Draw Call“, „Instancing“, „Overdraw“ oder „Dirty-Signatur“ unklar sind, zuerst `shared-docs/THREEJS-BEGRIFFE.md` lesen.

**Detailerklärung:** Für ausführlichere Beispiele, typische Denkfehler und Projektfälle zusätzlich `shared-docs/THREEJS-PERFORMANCE-DETAILS.md` lesen.

**Wann lesen:** Immer bei Änderungen an `src/components/3d`, `src/components/player/classes`, `src/lib/vfx`, `src/lib/performance`, Canvas/PostFX, Terrain/Voxel, Gegner-Modellen, Animationen, Skills oder WebGPU/WebGL.

**Grundsatz:** Performance-Probleme nicht durch blindes Abschalten „lösen“. Erst messen, dann Ursache trennen, dann Architektur verbessern, danach Qualität fein abstimmen.

---

## 1. Schnellregeln

1. **FPS allein reicht nie.** Immer `frameMsAvg`, `frameMsP95`, `frameMsWorst`, Draw Calls, Triangles, Geometries, Texturen, aktive `useFrame`-Systeme und sichtbare Stotterer prüfen.
2. **Kosten dürfen nicht mit eingebauten Klassen skalieren.** Eine Klasse als Konfiguration ist billig. Eine gemountete Klassen-VFX-Runtime mit `useFrame`, transparenten Meshes, Shadern und Queue-Writes ist teuer.
3. **`useFrame` ist ein Hotpath.** Kein häufiges React-`setState`, keine breiten Store-Subscriptions, keine Objektmassen neu erzeugen.
4. **Schwere R3F-Objekte stabil halten.** Materialien, Geometrien, Lights, Shader und PostFX nicht unnötig mounten/unmounten.
5. **Viele gleiche Dinge batchen oder instancen.** Gegnerteile, Partikel, Decals, Slashes, Tiles und Remote-VFX sollen über wenige Renderer laufen.
6. **Transparenz ist teuer.** Additive/transparent/DoubleSide kann Overdraw und Draw Calls stark erhöhen. `transparentLayerEstimate` und `forceSinglePass` prüfen.
7. **Terrain über Sichtbarkeit und Faces optimieren.** Nicht 10.000 Voll-Boxen rendern, wenn Top-Faces, Side-Skirts und Chunk-Culling reichen.
8. **WebGPU ist ein A/B-Hebel, kein Wundermittel.** Erst Runtime-Architektur, Batching, Pools und PostFX-Kosten klären.
9. **Spielbarkeit bleibt Default.** Ally-/Remote-Skills in normalen Gruppenkämpfen nicht standardmäßig verstecken. Reduktion muss lesbar bleiben.
10. **Jeder Fix braucht Messwerte.** Vorher/Nachher mit gleicher Szene, gleicher Last, Reportpfad und Root-Cause-Notiz dokumentieren.
11. **Globale Regel zuerst, Projektregel danach.** Erst prüfen, ob ein Problem ein allgemeines Three.js/R3F-Muster ist. Danach prüfen, ob dieses Voxel-Projekt zusätzliche Sonderregeln braucht.
12. **Nicht gegen Symptome kämpfen.** Wenn ein Skill langsam ist, nicht sofort Partikel reduzieren. Erst trennen: Gameplay-Hitbox, Audio, Animation, Gegnerreaktion, VFX, React-State, Renderer.

---

## 2. Pflicht-Workflow bei 3D-Lag

- **Reproduzieren:** Szene, Klasse, Skill, Gegnerzahl, VFX-Schalter, Browser, Backend, Monitor-/FPS-Cap, Kamera, Zoom und aktive Debug-Schalter notieren.
- **Messen:** `fps`, `frameMs`, `p95`, `worst`, `calls`, `triangles`, `geometries`, `transparentLayerEstimate`, `activeUseFrameSubsystems`, Queue-/Pool-Drops, sichtbare VFX-Anzahl und aktive Gegnerzahl erfassen.
- **Ablation statt Raten:** VFX on/off, Particles only, Slashes only, Enemy Model on/off, Terrain on/off, PostFX on/off, Shadows on/off, WebGL/WebGPU, Audio on/off und Skill ohne Trefferkontakt vergleichen.
- **Root Cause trennen:** CPU-Loop, React-State-Churn, Draw Calls, Triangles, Transparenz/Overdraw, Shader/PostFX, Texture/Memory, Server, Audio, Physik, Display-Cap und Browser-Fallback getrennt betrachten.
- **Architektur fixen:** Batching, Instancing, Pooling, stabile Scene-Boundaries, Dirty-Signaturen, zentrale Queues, Budget-Gates und perzeptive Skalierung nutzen.
- **Visuelle Prüfung als User-Gate:** Screenshot/Browser/Playwright/Recorder/Ingame-Checks nur starten, wenn der User es ausdrücklich befiehlt. Sonst Canvas-/Gameplay-Parität als offenen manuellen Blocker dokumentieren und statische Checks, vorhandene Reports und Messwerte nutzen.
- **Dokumentieren:** Ursache, verworfene Alternativen, Messwert-Delta, Reportpfad, Restrisiko, Qualitätsverlust und Folgeaufgaben notieren.
- **Nicht automatisch Dev-Server starten:** Wenn `http://localhost:3070/` nicht erreichbar ist, Messblocker dokumentieren. Keine Port-Konflikte erzeugen.

---

## 3. Projekt-Commands für Messungen

- `pnpm lint` - TypeScript-Gate. Pflicht nach Dokumentationsänderungen nur, wenn Projektregeln es verlangen; nach Codeänderungen immer.
- `pnpm run perf:vfx-guardrails` - statischer VFX-Hotpath-Check.
- `pnpm run perf:vfx-guardrails:update-baseline` - nur nach bewusstem Hotpath-Strukturwechsel.
- `pnpm run perf:lai-lmb` - Lai-LMB-Spezialprofil, Reports unter `output/perf/`.
- `pnpm run perf:guard` - allgemeiner Browser-Performance-Guard.
- `pnpm run browser:webgpu-phase6c-ab` - WebGL/WebGPU-A/B.
- `pnpm run browser:webgpu-phase8-solo-ablation` - WebGPU/PostFX-Ablation.
- **Report-Regel:** Jeder Lauf braucht Szenenbeschreibung, Browser, Backend, Schalter, Reportpfad und Ergebnis-Satz.
- **A/B-Regel:** Zwei Varianten nur vergleichen, wenn Szene, Gegnerzahl, Klasse, Skill, Kamera, Backend und VFX-Schalter gleich sind.
- **Headed-Regel:** WebGL/WebGPU-FPS aus Default-Headless-Chromium sind nur Diagnose. Für echte 3D-FPS headed Chrome/Edge nutzen.
- **Canvas-Regel:** `calls=0`, leerer Canvas oder fehlende Gegner zählen als Messfehler, nicht als Performance-Gewinn.

---

## 4. Messwerte richtig lesen

| Metrik | Bedeutung | Kritisch bei |
| --- | --- | --- |
| `fps` | Bilder pro Sekunde | gut für groben Eindruck |
| `frameMsAvg` | durchschnittliche Framezeit | besser als FPS für Vergleiche |
| `frameMsP95` | schlechte Frames ohne Extrem-Ausreißer | „fühlt sich laggy an“ |
| `frameMsWorst` | härtester Spike | kurze Hänger |
| `calls` | Draw Calls | viele Meshes/Materialien/PostFX |
| `triangles` | Geometrie-Last | Terrain, Modelle, Full-Box-Voxel |
| `geometries` | GPU-Geometrien | unnötige Einzelobjekte |
| `textures` | aktive Texturen | Uploads, Speicher, Materialvarianten |
| `transparentLayerEstimate` | Overdraw-Risiko | Glow, Additive, AOE-Layer |
| `activeUseFrameSubsystems` | aktive Frame-Loops | breit gemountete Runtime-Systeme |
| Queue-/Batch-Drops | begrenzte VFX-Last | sichtbare Skalierung erklären |

- **FPS-Cap-Regel:** Wenn FPS bei `60`, `120`, `144` oder `240` kleben, über `frameMs`, `p95`, `worst`, Calls, Triangles und Segmentzeiten entscheiden.
- **Worst-Frame-Regel:** Ein guter Durchschnitt kann trotzdem schlecht spielbar sein, wenn `frameMsWorst` harte Spikes zeigt.
- **P95-Regel:** `p95` ist oft näher am Spielgefühl als der Durchschnitt, weil es die schlechten Frames sichtbar macht.
- **Draw-Call-Regel:** Viele Draw Calls deuten oft auf viele Meshes, Materialvarianten, PostFX-Pässe oder nicht gebatchte Partikel hin.
- **Triangle-Regel:** Viele Triangles deuten oft auf Terrain, Modelle, Full-Box-Voxel, unnötige Seitenflächen oder zu hohe Asset-Details hin.
- **Transparenz-Regel:** Hohe transparente Layer sind besonders kritisch bei Glow, AOE, Nebel, Partikeln, Slashes und DoubleSide-Materialien.
- **Interpretationsregel:** Ein einzelner Wert beweist selten die Ursache. Erst Muster aus mehreren Werten bildet die Diagnose.

---

## 5. Globale R3F- und React-Hotpath-Regeln

- **`useFrame` bleibt billig:** In `useFrame` kein häufiges React-`setState` für Bewegungen verwenden. Bewegte Meshes über `ref.current` mutieren, mit `delta` rechnen und keine Objektmassen neu anlegen.
- **R3F-Warnung ernst nehmen:** R3F warnt vor `setState` in `useFrame`, weil Frame-Arbeit sonst durch React-Scheduling und Re-renders läuft.
- **Store-Zugriffe selektiv halten:** Keine breiten Store-Subscriptions in FPS-, Skill-, Gegner- oder Terrain-Hotpaths. Selector, `useShallow`, Refs oder Runtime-Objekte nutzen.
- **UI-Sync drosseln:** FPS-HUD, Debug-Panel und Profiling-Anzeigen dürfen nicht selbst schwere 3D-Subtrees neu rendern.
- **Performance-HUD bleibt billig:** HUD-Sampling drosseln, Details nur bei Bedarf rendern, Store-Subscriptions schmal halten und keine großen Listen pro Frame formatieren. Das Diagnosewerkzeug darf nicht selbst zum Performance-Problem werden.
- **Keine Inline-Komponenten:** Komponenten nicht im Body anderer Komponenten definieren. Das erzeugt neue Component Types pro Render und kann State verlieren.
- **Stabile Scene-Boundaries:** Terrain, Instancing, Gegnerlisten, VFX-Runtimes und große Map-Listen hinter stabilen Grenzen halten.
- **Schwere Objekte stabil halten:** Materialien, Geometrien, Lights, Shader und PostFX nicht pro Render neu erzeugen.
- **Sichtbarkeit statt Mount-Churn:** Sichtbarkeit bevorzugt über `visible`, `count`, `range`, Pool-Slots oder Budget-Gates steuern.
- **Mount/Unmount messen:** Shader-/Materialpfade nur mit Messung mounten/unmounten, weil Kompilierung und GPU-Uploads Spikes auslösen können.
- **React-State-Churn erkennen:** Warnsignale sind HUD-Updates, Treffer-Store-Writes, Debug-Stats oder sortierte Arrays, die schwere 3D-Subtrees neu antreiben.
- **Gegenmittel:** `useRef`, typed Arrays, zentrale Runtime-Objekte, idempotente Store-Actions, stabile Props, memoisiert berechnete Daten und kleine Selector.

---

## 6. Globale Instancing-, Batching- und Dirty-Regeln

- **Instancing nutzen:** `InstancedMesh` passt, wenn viele Objekte gleiche Geometrie/Materialien haben und nur Position, Rotation, Scale oder Farbe variieren.
- **Typische Kandidaten:** Gegnerteile, Partikel, Ground Decals, Damage Numbers, Slashes, Trails, Tiles, Deko, Projektile, Remote-Mirror-VFX und einfache Trefferanzeigen.
- **Update-Flags:** Nach `setMatrixAt()` immer `instanceMatrix.needsUpdate = true`; nach `setColorAt()` immer `instanceColor.needsUpdate = true`.
- **Kapazität beachten:** `count` darf nur innerhalb der Max-Kapazität variieren. Wenn mehr Instanzen als Kapazität gebraucht werden, neuen `InstancedMesh` erzeugen.
- **Bounding Volumes prüfen:** Bei veränderten Instanzen `computeBoundingBox()` oder `computeBoundingSphere()` für Culling/Raycasting prüfen.
- **Dirty-Signaturen nutzen:** Bei statischen oder selten veränderten Instanzen nicht jedes Frame Matrix/Farbe neu schreiben.
- **Dirty-Signatur-Felder:** Position, Rotation/Yaw, Scale, Animation-Speed, Animation-Phase, Archetype, Partlayout, Farbe, Rage, Flash, Telegraph, Sichtbarkeit, Count und Reihenfolge.
- **Nutzen:** Hoch bei stationärer oder selten veränderter Last; geringer bei voll animierten Instanzen ohne stabile Phasen.
- **Batching prüfen:** Wenn viele Einzel-Meshes nur Parts eines Modells darstellen, zuerst Material-/Geometrie-Batching prüfen.
- **Instancing vs. Merging:** Neue Merge-Pfade immer A/B gegen Instancing dokumentieren: FPS, `p95`, `worst`, `renderer.info`, Screenshot und visuelle Parität.
- **Nicht nur Meshzahl zählen:** Auch Materialzahl, Transparenz, Shaderpfade und Upload-Häufigkeit betrachten.
- **Keine falsche Optimierung:** Wenn die Kosten vom CPU-Update kommen, reicht Draw-Call-Reduktion allein nicht.

---

## 7. Globale VFX-Architektur-Regeln

- **Zielbild:** Kosten skalieren mit aktueller Effektlast, nicht mit Anzahl eingebauter Klassen oder importierter Skill-Dateien.
- **Event statt Renderer:** Ein Skill erzeugt ein Event oder einen Descriptor, nicht direkt viele globale Renderobjekte.
- **Zentrale Queue:** VFX-Events sammeln, priorisieren, begrenzen und danach kontrolliert rendern.
- **Pooling:** Slots recyceln statt Partikel, Slashes, Decals oder Damage Numbers ständig neu erzeugen und löschen.
- **Rendererfamilien:** `Beam`, `Trail`, `Ring`, `Aura`, `Impact`, `Spark`, `Number`, `Slash`, `Projectile` als wenige gebatchte Renderer denken.
- **Perzeptive Skalierung:** Bei Last Dichte, Lifetime, Alpha, Auflösung, Detailstufe oder Spawnrate reduzieren, ohne wichtige Gameplay-Signale unsichtbar zu machen.
- **Nicht breit mounten:** Keine lokale Klassen-VFX-Runtime für alle Klassen gleichzeitig mounten.
- **Remote-VFX sauber spiegeln:** Remote-/Raid-VFX nicht lösen, indem alle lokalen Klassenrenderer aktiv werden.
- **Keine unkontrollierten Pushes:** `engineState.particles.push`, `slashes.push` oder ähnliche globale Array-Writes in vielen Komponenten sind Warnsignale.
- **VFX-Off ist Diagnose:** VFX-Off darf helfen, Ursache zu finden. Es ist keine dauerhafte Architektur-Lösung.
- **Hitbox bleibt Gameplay:** Keine Gameplay-Hitbox entfernen, nur weil sie visuell wie ein Effekt aussieht.
- **Guardrail Pflicht:** Vor jedem VFX-Hotpath-Merge `pnpm run perf:vfx-guardrails` ausführen.
- **Baseline-Regel:** Guardrail-Baseline nur nach bewusstem Hotpath-Strukturwechsel aktualisieren.
- **Warnungen freigeben:** Guardrail-Warnungen nur mit Messwerten freigeben: `fps`, `frameMs`, `calls`, `transparentLayerEstimate`, `activeUseFrameSubsystems`, Queue-/Batch-Drops.

---

## 8. Transparenz, Glow und Overdraw

- **Transparenz ist teuer:** Transparente Flächen müssen oft sortiert und mehrfach über dieselben Pixel gezeichnet werden.
- **Additive-Effekte messen:** Magie, Glow, Feuer, AOE-Kreise, Nebel, Slashes und Partikel können schnell Overdraw erzeugen.
- **DoubleSide prüfen:** DoubleSide + transparent kann zusätzliche Draw Calls oder mehr Overdraw erzeugen.
- **`forceSinglePass` prüfen:** Bei flachen VFX/Sprites kann `forceSinglePass` sinnvoll sein, muss aber visuell geprüft werden.
- **`depthWrite=false` prüfen:** Für transparente Overlays oft sinnvoll, aber Sortierung und Look testen.
- **`renderOrder` sparsam nutzen:** Nicht als globalen Sortier-Hack verwenden. Erst Ursache in Layering, Material oder Szenenstruktur klären.
- **Layer zählen:** `transparentLayerEstimate` oder ähnliche Metriken nutzen, damit Overdraw sichtbar wird.
- **Look schützen:** Reduktion darf Skill-Lesbarkeit nicht zerstören. Wichtige Telegraphs, Hitbox-Hinweise und Trefferfeedback bleiben sichtbar.
- **Perzeptive Tricks:** Kürzere Lifetime, weniger sekundäre Sparks, kleinere Alpha-Flächen und niedrigere Partikelanzahl wirken oft besser als alles abzuschalten.

---

## 9. Globale Terrain-, Voxel- und Chunking-Regeln

- **Keine Full-Box-Defaults:** Bei großen Tile-Maps nie blind Voll-Boxen als Default rendern.
- **Faces reduzieren:** Unsichtbare Seitenflächen entfernen, Top-Faces nutzen und Seiten nur dort rendern, wo sie sichtbar oder spielerisch wichtig sind.
- **Side-Skirts nutzen:** Ränder können über Side-Skirts besser aussehen, ohne wieder komplette Würfel zu rendern.
- **Chunking nutzen:** Große Maps in Chunks teilen. Sichtfenster und Kamera bestimmen, welche Chunks sichtbar sind.
- **Culling nutzen:** Unsichtbare Bereiche nicht rendern. Culling ist bei Voxel-Welten oft wichtiger als Material-Feintuning.
- **Persistente Chunks:** Chunks möglichst persistent halten und `visible` toggeln statt hart mounten/unmounten.
- **Chunk-Geometrien cachen:** Geometrien einmalig bauen, nicht bei jeder Kamerabewegung neu erzeugen.
- **Stats billig halten:** Sichtbare Stats über Summen zählen, nicht bei jedem Grenzwechsel große Listen neu bauen.
- **Updates niedrig priorisieren:** Kamera-/Chunk-Updates niedrig priorisieren, wenn sie React-State berühren.
- **Terrain-Budget:** Für Standardkamera Terrain möglichst unter `~20k` Triangles und Richtung `~1` Draw Call pro sichtbarem Batch bringen.
- **Bei Budgetbruch:** Erst Geometriepfad, Materialpfad, Sichtbarkeit und Chunking prüfen; nicht nur UI-Optionen ergänzen.
- **Procedural Geometry prüfen:** Triangle-Winding, Normals und Bounding Volumes explizit prüfen.
- **DoubleSide nicht kaschieren:** Backface-Culling nicht mit `DoubleSide` kaschieren, wenn Winding falsch ist.

---

## 10. Globale WebGPU-Regeln

- **WebGPU kann helfen:** Moderne Renderer-Pipeline, Node/TSL-Materialpfade, bestimmte PostFX-/MRT-Pfade, GPU-nahe Workloads und langfristige Renderarchitektur.
- **WebGPU löst nicht automatisch:** Zu viele `useFrame`-Systeme, React-State-Churn, ungebatchte Mesh-Massen, transparente Layer, fehlende Pools oder falsche Messungen.
- **Backend validieren:** `window.isSecureContext === true`, `navigator.gpu` vorhanden, `requestAdapter()` liefert Adapter, `requestDevice()` klappt.
- **App-Status prüfen:** App meldet `backend === "webgpu"`, `renderStatsFresh === true`, Canvas ist sichtbar und nicht leer.
- **Fallback nicht übersehen:** `WebGPURenderer` kann fallbacken. Backend nie raten, immer prüfen.
- **Async beachten:** WebGPU-Initialisierung ist async. R3F-Renderer-Pfad muss async/init-fähig sein.
- **PostFX-Kompatibilität:** Klassische `EffectComposer`-Pfade sind WebGLRenderer-orientiert. WebGPU braucht kompatiblen PostFX-Pfad oder expliziten Downgrade.
- **A/B sauber fahren:** Gleiche Szene, gleiche Kamera, gleiche Last, gleiche Schalter, gleicher Browser, mehrere Paarläufe.
- **Einzelrun misstrauen:** Einzelruns streuen. Median mehrerer identischer Paarläufe ist belastbarer.
- **Leerer Canvas ist Blocker:** Ein leerer Canvas oder `calls=0` ist kein Performance-Erfolg.

---

## 11. PostFX, Schatten, Materialien und Texturen

- **PostFX trennen:** Bloom, Vignette, Shadow/Glow, Edge Blur, DPR/Resolution Scale, Tone Mapping und Backend-Fallbacks getrennt messen.
- **Nicht pauschal abschalten:** Wenn ein Backend schlechter ist, Kostenpfad isolieren und backend-sensitives Profil bauen.
- **Visuelle Parität:** PostFX-Fix braucht sichtbare Parität, nicht nur bessere FPS. Ohne ausdrücklichen User-Auftrag wird dafür kein Screenshot-/Browser-Check gestartet; der manuelle Prüfpunkt wird dokumentiert.
- **DPR beachten:** Höhere interne Auflösung kann teurer sein als einzelne Effektparameter.
- **Geometrien teilen:** Gleiche Geometrien wiederverwenden, statt viele identische GPU-Ressourcen anzulegen.
- **Materialien teilen:** Materialvarianten begrenzen. Zu viele Varianten verhindern Batching und erhöhen Draw Calls.
- **Texturen nicht im Renderpfad laden:** Texture-Uploads gehören nicht in häufige Gameplay-Hotpaths.
- **`needsUpdate` sparsam:** Nur setzen, wenn Daten wirklich geändert wurden.
- **`dispose()` beachten:** Nicht mehr genutzte GPU-Ressourcen freigeben, wenn sie wirklich aus der Szene verschwinden.
- **Texture-Größe budgetieren:** Große Texturen kosten Speicher und Upload-Zeit.
- **Canvas-/Video-/DataTexture:** Nur mit `texture.needsUpdate = true`, wenn Daten geändert wurden.

---

## 12. 3D-Asset- und Meshy-Qualitätsgate

- **Referenz wirklich verwenden:** Wenn ein Charakter/Objekt zuerst mit ImageGen freigegeben wurde, muss diese Referenz wirklich in die 3D-Pipeline.
- **Methode dokumentieren:** `image-to-3d`, `multi-image-to-3d` oder `text-to-3d` mit Task-ID festhalten.
- **GLB visuell prüfen:** Nach Preview/Refine braucht die GLB eine Viewer-/Spiel-Freigabe. Screenshot-/Browser-Checks nur starten, wenn der User es ausdrücklich befiehlt; sonst als manuellen Freigabe-Blocker dokumentieren.
- **Vergleichskriterien:** Kopf/Form, Gesicht, Kleidung, Hände, Füße, Proportionen, Farben, Low-Poly/Voxel-Stil.
- **Stop-Regel:** Wenn das GLB klar nicht wie die Referenz aussieht, stoppen. Kein Refine, Rigging oder Animate auf schlechtem Modell.
- **Credit-Schutz:** Animationen/Rigging erst starten, wenn das Modell visuell akzeptiert wurde.
- **Dokumentationspflicht:** Referenzdatei, Meshy-Methode, Task-ID, Screenshot-Pfad und Entscheidung `ACCEPTED` oder `REJECTED` notieren.

---

## 13. Projektgrenze: Was nur für dieses Voxel-Samurai-Quiz gilt

- **Warum speziell:** Dieses Projekt kombiniert Voxel-Terrain, Klassen-Skills, Lai-Samurai-LMB, Gegnerwellen, lokale/Remote-VFX, R3F, Runtime-Reports und WebGPU-Experimente.
- **Nicht blind übertragen:** Für andere Three.js-Spiele sind diese Regeln gute Muster, aber nicht automatisch 1:1 Pflicht.
- **Projekt-Hauptproblem:** Kosten entstanden mehrfach durch aktive Runtime-Systeme, nicht nur durch sichtbare Effekte.
- **Klassenvielfalt:** Viele Klassen als Daten sind okay. Viele gleichzeitig gemountete Klassen-Renderer sind teuer.
- **Voxel-Kontext:** Terrain-Regeln sind hier besonders wichtig, weil Voxel-Optik schnell viele Flächen erzeugt.
- **Skill-Kontext:** Skills enthalten nicht nur VFX, sondern auch Hitboxen, Audio, Animation, Enemy-Reaktion, Snapshots und UI-Sync.
- **Mess-Kontext:** Reports müssen sichtbare und versteckte Runtime-Objekte getrennt zählen, sonst wirkt VFX-Off falsch besser.

---

## 14. Projektregel: `Effects.tsx` als kritischer Hotpath

- **Datei:** `src/components/3d/Effects.tsx`.
- **Rolle:** Entscheidet, welche großen VFX-Systeme in der Szene leben.
- **Risiko:** Ein kleiner Boolean kann viele `useFrame`-Loops, Shader, transparente Meshes und globale Array-Arbeit aktivieren.
- **Pflicht:** Lokale Klassen-VFX nur für die aktive lokale Klasse mounten.
- **Pflicht:** Gemeinsame Renderer nur für Klassen mounten, die sie wirklich nutzen.
- **Pflicht:** Preview-/Dev-Klasse nur explizit und sichtbar aktivieren.
- **Pflicht:** Remote-VFX über Remote-Mirror-Descriptoren laufen lassen.
- **Verboten:** Alle lokalen Klassen-VFX gleichzeitig mounten, nur damit Remote-Skills sichtbar werden.
- **Projekt-Learning:** Die große Regression entstand, weil lokale Klassen-VFX-Renderer breit gemountet wurden.
- **Guter Fix:** Aktive lokale Klasse mounten, Remote-VFX als Descriptor/Event spiegeln.
- **Warum:** Klassenvielfalt als Daten ist billig. Klassenvielfalt als aktive Runtime ist teuer.

---

## 15. Projektregel: VFX-Off, Lai-LMB und Skill-Semantik

- **Problem:** Drops traten auch ohne sichtbare VFX auf.
- **Ursache:** Skillkosten bestanden nicht nur aus Partikeln, sondern auch aus Slash-Semantik, Hitstop, Runtime-Snapshot, Audio, Enemy-Model-Layer und Render-Buckets.
- **Lai-Slash-Regel:** Visuelle Darstellung darf deaktiviert oder versteckt werden. Gameplay-Signal bleibt erhalten, wenn Trefferlogik davon abhängt.
- **Report-Regel:** Sichtbare und versteckte Runtime-Objekte getrennt zählen, zum Beispiel `visibleSlashes` und `hiddenSlashes`.
- **Projekt-Learning CHAT 7:** Lai-LMB-Slashes bleiben bei Skill-VFX-Off als `hiddenVfx` aktiv, damit Trefferlogik nicht kaputtgeht.
- **Analyse-Regel:** „Skill langsam“ ist zu grob. Skillkosten in VFX, Audio, Gameplay-Hitbox, Enemy-Reaktion, Renderer und Snapshot auftrennen.
- **Fix-Reihenfolge:** Erst Semantik erhalten, dann Visuals reduzieren, dann Runtime-Architektur verbessern.
- **Nicht tun:** Hitboxen entfernen, nur weil sie visuell wie VFX aussehen.

---

## 16. Projektregel: Regular Enemies, Boss-Slots und Remote-VFX

- **Regular Enemy Reihenfolge:** Sichtbare Gegnerliste korrekt begrenzen.
- **Regular Enemy Reihenfolge:** `InstancedMesh.count` auf echte sichtbare Runtime setzen.
- **Regular Enemy Reihenfolge:** Parts batchen statt pro Part ein Mesh.
- **Regular Enemy Reihenfolge:** Matrix/Farbe nur bei Dirty-Signatur hochladen.
- **Regular Enemy Reihenfolge:** Erst danach LOD/Material-Sparpfade prüfen.
- **Nicht tun:** Enemy-Model-Layer einfach abschalten und als Fix verkaufen.
- **Projekt-Learning CHAT 11:** Regular Enemy Parts von `24` separaten Part-Meshes auf kompakten Batch reduziert.
- **Messwert CHAT 11:** `15 Gegner Full` ging von `72` auf `49` Draw Calls.
- **Messwert CHAT 11:** Triangles gingen von `38.770` auf `37.690`.
- **Messwert CHAT 11:** Model-Layer danach nur noch `+1` Call über Model-Off.
- **Projekt-Learning CHAT 12:** Dirty-Signaturen reduzierten CPU-Upload-Arbeit stark.
- **Messwert CHAT 12:** `enemies.regularModelRender` sank bei `15 Gegner Full` von `0.227 ms` auf `0.017 ms`.
- **Messwert CHAT 12:** `enemies.regularModelRender` sank bei `15 Gegner VFX-Off` von `0.223 ms` auf `0.004 ms`.
- **Boss-Regel:** Modelle/Slots nicht an Array-Indizes koppeln, wenn Spawns/Deletes die Reihenfolge verschieben können.
- **Boss-Learning:** Boss-Modell-Slots auf stabile Boss-IDs umstellen, damit normale Spawns/Deletes keinen unnötigen React-State-Churn im Boss-Pfad auslösen.
- **Remote-VFX Default:** Ally-Skills bleiben in normalen Gruppenkämpfen sichtbar und lesbar.
- **Remote-VFX Reduktion:** Perzeptiv reduzieren, nicht „alles aus“.
- **Remote-Relevanz:** Distanz, Kamera-/Screen-Space, Combat-Relevanz, Skill-Priorität, Queue-/Batch-Druck und lokale Spielernähe berücksichtigen.

---

## 17. Projektregel: Voxel-Terrain und WebGPU/PostFX

- **Terrain-Regel:** Dieses Projekt darf nicht zu Full-Box-Voxel als Default zurückfallen.
- **Terrain-Pflicht:** Top-Faces, Side-Skirts, Chunking, Culling, persistente Chunks und niedriges Terrain-Triangle-Budget nutzen.
- **Terrain-Bewertung:** Wenn Terrain wieder deutlich über Budget liegt, ist das ein Architekturproblem, kein „Grafik ist halt teuer“-Problem.
- **Chunk-Stutter:** Chunk-Grenzen dürfen keine harten Mount/Unmount-Spikes erzeugen.
- **Stats-Regel:** Terrain-Stats billig halten, damit Debug selbst nicht laggt.
- **WebGPU-Regel:** WebGPU erst bewerten, wenn Backend wirklich aktiv ist, Canvas sichtbar rendert und PostFX getrennt gemessen wurde.
- **WebGPU-Learning:** Einzelruns streuen stark; Median mehrerer identischer Paarläufe ist belastbarer.
- **WebGPU-Blocker:** Leerer Canvas oder `calls=0` ist ein Messfehler.
- **PostFX-Learning:** WebGPU wurde durch gezielte Shadow/Glow- und DPR-Anpassung stabiler, nicht durch pauschales Bloom/Vignette-Off.
- **Paritätsregel:** WebGPU/PostFX-Fix ist erst fachlich vollständig, wenn Optik, Gameplay und Messwerte zusammen passen. Ohne User-Auftrag zur Oberfläche endet die KI-Arbeit mit dokumentiertem manuellem Prüfpunkt.

---

## 18. Root-Cause-Muster aus diesem Projekt

- **Effects-Regressionsfall Symptom:** FPS-Einbruch bei VFX-/Klassenpfaden.
- **Effects-Regressionsfall Ursache:** Lokale Klassen-VFX-Renderer wurden breit gemountet.
- **Effects-Regressionsfall Lektion:** Nicht die Klassenzahl war teuer, sondern aktive Runtime-Systeme im Hintergrund.
- **Lai-LMB-Fall Symptom:** Drops auch ohne sichtbare VFX.
- **Lai-LMB-Fall Ursache:** Skillkosten waren auf Slash-Semantik, Hitstop, Runtime-Snapshot, Audio, Enemy-Model-Layer und Render-Buckets verteilt.
- **Enemy-Model-Fall Symptom:** Gegner senkten FPS und Draw Calls blieben hoch.
- **Enemy-Model-Fall Ursache:** Viele Part-Meshes und pro Frame Matrix-/Color-Schreibarbeit.
- **Enemy-Model-Fall Fix:** Sichtbare Slots, Part-Batching, Dirty-Signaturen.
- **WebGPU/PostFX-Fall Symptom:** WebGPU war in einzelnen Profilen langsamer oder instabil.
- **WebGPU/PostFX-Fall Ursache:** WebGL-orientierte PostFX-/Quality-Pfade und Messstreuung.
- **WebGPU/PostFX-Fall Lektion:** WebGPU nur mit Backend-Validierung, dokumentierter Canvas-/Paritätsprüfung und identischen A/B-Paarläufen bewerten. Automatische Oberfläche nur bei ausdrücklichem User-Auftrag öffnen.

---

## 19. Erwarteter Nutzen nach Hebel

| Hebel | Nutzen | Risiko | Wann zuerst |
| --- | --- | --- | --- |
| Unnötige Klassen-VFX nicht mounten | sehr hoch | gering, wenn Semantik getrennt | Kosten steigen mit Klassenzahl |
| Instancing gleicher Objekte | hoch | mittel, Update-Flags beachten | viele gleiche Objekte |
| Batching von Parts | hoch | mittel, Parität prüfen | hohe Draw Calls |
| Dirty-Signaturen | hoch bei statischer Last | mittel, Animation/Flash beachten | CPU-Matrix-/Color-Kosten |
| Terrain Top-Faces/Chunking | sehr hoch | mittel, Look-Recovery nötig | Voxel-/Tile-Maps |
| Transparenz-Layer reduzieren | mittel bis hoch | mittel, Look kann leiden | Additive/Glow/Overdraw |
| Zentrale VFX-Queue/Pools | hoch in Gruppen/Raid | mittel, Architekturarbeit | viele Skillquellen |
| WebGPU-A/B | situativ | hoch, PostFX/Shader-Parität | nach Architekturfix |
| Pauschal VFX aus | nur Diagnose | hoch, Qualitätsverlust | Notfall/Debug |

---

## 20. Review-Checkliste für 3D-PRs

- Wurde `shared-docs/THREEJS-RULES.md` gelesen?
- Wurde `shared-docs/THREEJS-PERFORMANCE-DETAILS.md` gelesen, wenn die Änderung VFX, Gegner, Terrain oder WebGPU betrifft?
- Ist klar, welche Regeln global sind und welche nur für dieses Voxel-Projekt gelten?
- Gibt es neue `useFrame`-Stellen?
- Gibt es neue transparente/Additive/DoubleSide-Serien?
- Werden Materialien/Geometrien im Renderpfad neu erzeugt?
- Sind InstancedMesh-Updates mit Dirty-Signatur oder Begründung versehen?
- Werden `instanceMatrix`/`instanceColor` Update-Flags korrekt gesetzt?
- Werden Bounding Volumes bei Instancing/Procedural Geometry korrekt behandelt?
- Bleiben Gameplay-Hitboxen bei VFX-Off intakt?
- Wurde per Ablation gemessen statt geraten?
- Gibt es Reportpfade und Vorher/Nachher-Werte?
- Wurde visuelle Parität geprüft oder als manueller User-Blocker dokumentiert?
- Wurden `pnpm lint` und passende Perf-Commands ausgeführt?
- Ist dokumentiert, was bewusst nicht optimiert wurde und warum?

---

## 21. Entscheidungsbaum für Performance-Fixes

- **Wenn FPS droppt, aber Draw Calls gleich bleiben:** CPU-Hotpath, React-State-Churn, Matrix-/Color-Uploads, Audio, Gameplay-Loop oder PostFX prüfen.
- **Wenn Draw Calls stark steigen:** Mesh-Splitting, Materialvarianten, PostFX-Pässe, transparente Serien, nicht gebatchte Partikel oder Enemy-Parts prüfen.
- **Wenn Triangles stark steigen:** Terrain, Full-Box-Voxel, Modell-Detailgrad, sichtbare Faces, Side-Skirts und LOD prüfen.
- **Wenn nur `frameMsWorst` schlecht ist:** Mount/Unmount, Shader-Kompilierung, Texture-Upload, Chunk-Grenze, Asset-Ladepunkt oder Garbage Collection prüfen.
- **Wenn `frameMsP95` schlecht ist:** Dauerhaft teurer Hotpath, zu viele aktive Runtimes, Gegner-Update, VFX-Queue oder Terrain-Sichtfenster prüfen.
- **Wenn VFX-Off kaum hilft:** Hitbox-Semantik, Audio, Animation, Enemy-Reaktion, Snapshot-Logik und React-State prüfen.
- **Wenn VFX-Off stark hilft:** Transparenz, Partikelanzahl, Lifetime, Shader, Rendererfamilien, Pooling und Queue-Budget prüfen.
- **Wenn Gegner-Off stark hilft:** Instancing, Enemy-Part-Batching, Dirty-Signaturen, AI-Tickrate, Boss-Slots und sichtbare Gegnerliste prüfen.
- **Wenn Terrain-Off stark hilft:** Top-Faces, Chunking, Culling, Full-Box-Fallback, Materialvarianten und Chunk-Stats prüfen.
- **Wenn WebGPU schlechter ist:** Backend-Validierung, Canvas-Sicht, PostFX-Kompatibilität, DPR, Shadow/Glow und Fallback prüfen.
- **Wenn WebGPU besser ist:** Trotzdem visuelle Parität prüfen. Kein Backend als Default setzen, wenn Effekte oder Hitboxen fehlen.
- **Wenn Messwerte widersprüchlich sind:** Mehrere identische Paarläufe fahren und Median nutzen.

---

## 22. Typische Antipatterns

- **Antipattern:** `setState` in `useFrame` für Positionsupdates.
- **Besser:** Mesh direkt über Ref bewegen und UI nur gedrosselt synchronisieren.
- **Antipattern:** Jede Klasse mountet ihre VFX-Runtime, obwohl nur eine Klasse aktiv ist.
- **Besser:** Aktive lokale Klasse mounten, Remote-VFX als Descriptor spiegeln.
- **Antipattern:** VFX-Off entfernt sichtbare Effekte und gleichzeitig Trefferlogik.
- **Besser:** Visuals und Gameplay-Semantik trennen.
- **Antipattern:** Viele Gegnerteile als einzelne Meshes rendern.
- **Besser:** Parts batchen oder instancen.
- **Antipattern:** Instanced Matrices jedes Frame neu schreiben, obwohl Gegner stillstehen.
- **Besser:** Dirty-Signaturen verwenden.
- **Antipattern:** Full-Box-Voxel als Standard für große Maps.
- **Besser:** Top-Faces, Side-Skirts, Chunking und Culling.
- **Antipattern:** WebGPU als schnellen Ersatz für Architekturarbeit behandeln.
- **Besser:** Erst Hotpaths fixen, dann WebGPU sauber A/B messen.
- **Antipattern:** `renderOrder` global hochdrehen, bis transparente Effekte „passen“.
- **Besser:** Layer, Material, Sortierung und Overdraw gezielt prüfen.
- **Antipattern:** PostFX nur als einen großen On/Off-Schalter behandeln.
- **Besser:** Bloom, Shadow/Glow, Vignette, DPR und Tone Mapping getrennt messen.
- **Antipattern:** Performance-Fix ohne Paritäts-Gate.
- **Besser:** Prüfen oder dokumentieren, ob das Spiel noch korrekt aussieht und Trefferfeedback lesbar bleibt. Screenshot-/Browser-Checks nur mit ausdrücklichem User-Auftrag starten.
- **Antipattern:** Neue Guardrail-Baseline ohne Begründung.
- **Besser:** Baseline nur nach bewusstem Strukturwechsel mit Root-Cause-Notiz aktualisieren.

---

## 23. Messprotokoll-Vorlage

- **Szene:** Modus, Map, Kamera, Zoom, Backend, Browser, Monitor-/FPS-Cap.
- **Spielzustand:** Klasse, Skill, Gegnerzahl, Bosszahl, VFX-Schalter, Terrain-Schalter, PostFX-Schalter.
- **Vorher:** `fps`, `frameMsAvg`, `frameMsP95`, `frameMsWorst`, `calls`, `triangles`, `geometries`, `transparentLayerEstimate`.
- **Nachher:** Dieselben Werte mit exakt gleicher Szene.
- **Ablation:** Welche Teile wurden einzeln an/aus geschaltet?
- **Root Cause:** Was war wirklich teuer?
- **Verworfene Alternativen:** Welche Ideen wurden geprüft und warum nicht genommen?
- **Qualität:** Was sieht gleich aus? Was sieht anders aus? Ist der Unterschied akzeptabel?
- **Gameplay:** Hitboxen, Skill-Treffer, Gegnerreaktionen, Boss-Slots und Remote-VFX geprüft?
- **Reportpfad:** Pfad zu JSON/Log/Screenshot notieren.
- **Restrisiko:** Was könnte später wieder teuer werden?
- **Nächster Schritt:** Nur echte offene Punkte nennen, keine Scheinaufgaben.

---

## 24. Vorher/Nachher-Datenfluss für gute 3D-Architektur

- **Vorher schlecht:** Skill-Komponente erzeugt direkt Meshes, schreibt globale Arrays, triggert React-State, mountet Klassenrenderer und aktualisiert UI.
- **Nachher besser:** Skill-Komponente erzeugt Descriptor/Event, zentrale Runtime budgetiert, Rendererfamilie zeichnet gebatcht, UI liest gedrosselte Snapshots.
- **Vorher schlecht:** Gegnerliste erzeugt pro Gegner und Part eigene Meshes mit eigenen Materialien.
- **Nachher besser:** Sichtbare Gegnerliste begrenzt Slots, Parts laufen über Batch/Instancing, Dirty-Signatur steuert Uploads.
- **Vorher schlecht:** Terrain baut bei Kamerawechsel große Listen und Chunks neu.
- **Nachher besser:** Chunks bleiben persistent, Geometrien sind gecacht, Sichtbarkeit wird getoggelt, Stats laufen über günstige Summen.
- **Vorher schlecht:** WebGPU-Lauf wird als schneller gewertet, obwohl Canvas leer ist.
- **Nachher besser:** Backend, Adapter, Device, `renderStatsFresh`, Canvas-Sicht und visuelle Parität sind Gate.
- **Vorher schlecht:** VFX-Off löscht visuelle und semantische Objekte gemeinsam.
- **Nachher besser:** Visuals werden reduziert, Gameplay-Signale bleiben erhalten und Reports zählen beides getrennt.

---

## 26. Offizielle Referenzen

- React Three Fiber Performance Pitfalls: https://r3f.docs.pmnd.rs/advanced/pitfalls
- Three.js Optimize Lots of Objects: https://threejs.org/manual/en/optimize-lots-of-objects.html
- Three.js InstancedMesh API: https://threejs.org/docs/api/en/objects/InstancedMesh
- Three.js How to Update Things: https://threejs.org/manual/en/how-to-update-things.html
- Three.js Material API: https://threejs.org/docs/pages/Material.html
- Three.js Renderer API / `renderer.info`: https://threejs.org/docs/pages/Renderer.html
- Three.js WebGPURenderer Manual: https://threejs.org/manual/en/webgpurenderer
- Three.js WebGPURenderer API: https://threejs.org/docs/pages/WebGPURenderer.html
- Three.js EffectComposer API: https://threejs.org/docs/examples/en/postprocessing/EffectComposer.html

---

## 27. Projektinterne Pflichtreferenzen

In `d:\CODING\React Projects\7-3D-Voxel-Samurai-Quiz`
**Dokumentationen oder Historien die kritisch waren bzw wo länger nach Performance Lösungen geschaut wurde**
- `docs/performance-issue/BIG-PERFORMANCE-ISSUE-HISTORY.md`
  - Was haben wir daraus gelernt:
    -
- `docs/performance/tasks/2026-05-18-vfx-aaa-runtime-architecture-masterplan.md`
  - Was haben wir daraus gelernt:
    - ...

**Komponente hier schreiben die Performance kritisch waren, oder sind und beobachten, die Liste füllen**
- `src/components/3d/Effects.tsx`
- `src/components/3d/enemies/InstancedRegularEnemies.tsx`
- `src/lib/vfx/runtime/vfxEventRuntime.ts`
- `src/lib/performance/runtimePerformanceSnapshot.ts`

---

## 28. Merksatz

Gute 3D-Performance entsteht nicht dadurch, dass das Spiel schlechter aussieht. Sie entsteht dadurch, dass dieselbe Optik intern über weniger aktive Runtime-Systeme, weniger Draw Calls, weniger unnötige Uploads, stabile Pools und klare Messwerte läuft.
