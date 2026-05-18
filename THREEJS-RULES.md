# Three.js, R3F, WebGPU und 3D-Performance-Regeln

**Zweck:** Diese Datei ist die zentrale Arbeits-Guideline für 3D-Performance mit Three.js, React Three Fiber, WebGL, WebGPU, VFX, Gegner-Rendering und Voxel-/Tile-Maps.

**Wichtig zur Einordnung:** Nicht jede Regel hier gilt gleich stark für jedes Spiel. Die Abschnitte 1 bis 9 sind globale Three.js-/R3F-Regeln. Abschnitt 10 ist bewusst projektbezogen und gilt speziell für dieses Voxel-Samurai-Quiz-Projekt mit Klassen-VFX, Gegnerwellen, Voxel-Terrain und Lai-Samurai-Skills.

**Begriffserklärung:** Wenn Begriffe wie „Draw Call“, „Instancing“, „Overdraw“ oder „Dirty-Signatur“ unklar sind, zuerst diese kurze Erklärung lesen: `shared-docs/THREEJS-BEGRIFFE.md`.

**Wann lesen:** Immer bei Änderungen an `src/components/3d`, `src/components/player/classes`, `src/lib/vfx`, `src/lib/performance`, Canvas/PostFX, Terrain/Voxel, Gegner-Modellen oder WebGPU/WebGL.

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

---

## 2. Pflicht-Workflow bei 3D-Lag

### 2.1 Reihenfolge

1. **Reproduzieren:** Szene, Klasse, Skill, Gegnerzahl, VFX-Schalter, Browser, Backend, Monitor-/FPS-Cap notieren.
2. **Messen:** `fps`, `frameMs`, `p95`, `worst`, `calls`, `triangles`, `geometries`, `transparentLayerEstimate`, `activeUseFrameSubsystems`, Queue-/Pool-Drops erfassen.
3. **Ablation statt Raten:** VFX on/off, Particles only, Slashes only, Enemy Model on/off, Terrain on/off, PostFX on/off, WebGL/WebGPU vergleichen.
4. **Root Cause trennen:** CPU-Loop, React-State-Churn, Draw Calls, Triangles, Transparenz/Overdraw, Shader/PostFX, Texture/Memory, Server oder Display-Cap getrennt betrachten.
5. **Architektur fixen:** Batching, Instancing, Pooling, stabile Scene-Boundaries, Dirty-Signaturen und zentrale Queues nutzen.
6. **Sicht prüfen:** Screenshot/Browser/Playwright: Canvas nicht leer, Kamera korrekt, VFX sichtbar, Hitboxen intakt.
7. **Dokumentieren:** Ursache, verworfene Alternativen, Messwert-Delta, Reportpfad, Restrisiko.

### 2.2 Projekt-Commands

- `pnpm lint` - TypeScript-Gate.
- `pnpm run perf:vfx-guardrails` - statischer VFX-Hotpath-Check.
- `pnpm run perf:vfx-guardrails:update-baseline` - nur nach bewusstem Hotpath-Strukturwechsel.
- `pnpm run perf:lai-lmb` - Lai-LMB-Spezialprofil, Reports unter `output/perf/`.
- `pnpm run perf:guard` - allgemeiner Browser-Performance-Guard.
- `pnpm run browser:webgpu-phase6c-ab` - WebGL/WebGPU-A/B.
- `pnpm run browser:webgpu-phase8-solo-ablation` - WebGPU/PostFX-Ablation.

**Projektregel:** Dev-Server nicht automatisch starten. Wenn `http://localhost:3070/` nicht erreichbar ist, Messblocker dokumentieren.

---

## 3. Messwerte richtig lesen

| Metrik | Bedeutung | Kritisch bei |
| --- | --- | --- |
| `frameMsAvg` | durchschnittliche Framezeit | besser als FPS für Vergleiche |
| `frameMsP95` | schlechte Frames ohne Extrem-Ausreißer | „fühlt sich laggy an“ |
| `frameMsWorst` | härtester Spike | kurze Hänger |
| `calls` | Draw Calls | viele Meshes/Materialien/PostFX |
| `triangles` | Geometrie-Last | Terrain, Modelle, Full-Box-Voxel |
| `geometries` | GPU-Geometrien | unnötige Einzelobjekte |
| `transparentLayerEstimate` | Overdraw-Risiko | Glow, Additive, AOE-Layer |
| `activeUseFrameSubsystems` | aktive Frame-Loops | breit gemountete Runtime-Systeme |
| Queue-/Batch-Drops | begrenzte VFX-Last | sichtbare Skalierung erklären |

**FPS-Cap-Regel:** Wenn FPS bei `60`, `120`, `144` oder `240` kleben, über `frameMs`, `p95`, `worst`, Calls, Triangles und Segmentzeiten entscheiden. Ein stabiler `60 FPS avg` kann Display-Cap sein; ein `120 ms` Worst-Frame bleibt ein echter Hänger.

**Headed-Regel:** WebGL/WebGPU-FPS aus Default-Headless-Chromium sind nur Diagnose. Für echte 3D-FPS headed Chrome/Edge nutzen, gleiche Szene, gleiches Backend, `renderStatsFresh` und Canvas-Sicht prüfen.

---

## 4. Globale R3F- und React-Hotpath-Regeln

### 4.1 `useFrame`

**Pflicht:** In `useFrame` kein häufiges React-`setState` für Bewegungen verwenden. Bewegte Meshes über `ref.current` mutieren, mit `delta` rechnen, Store-Zugriffe selektiv halten und UI-Sync drosseln oder deduplizieren.

**Warum:** R3F warnt selbst vor `setState` in `useFrame`, weil Frame-Arbeit sonst durch React-Scheduling und Re-renders läuft.

### 4.2 Mount/Unmount-Kosten

**Pflicht:** Materialien, Geometrien, Lights und Shader nicht pro Render neu erzeugen. Schwere Subtrees stabil halten, Sichtbarkeit über `visible`, `count`, `range` oder Pool-Slots steuern und Shader-/Materialpfade nur mit Messung mounten/unmounten.

**Typischer Nutzen:** mittel bis sehr hoch, besonders bei VFX, PostFX und großen Szenen-Subtrees.

### 4.3 React-State-Churn erkennen

Warnsignale sind FPS-HUD-Updates, die Terrain/Gegner neu bauen, Trefferlogik mit mehreren breiten Store-Writes, inline definierte Unterkomponenten oder Arrays, die im Renderpfad neu sortiert/gefiltert und in schwere 3D-Subtrees gereicht werden.

Gegenmittel sind `useRef`, typed Arrays, zentrale Runtime-Objekte, idempotente Store-Actions, selektive Selector und Scene-Boundaries mit stabilen Props.

---

## 5. Globale Instancing-, Batching- und Dirty-Regeln

### 5.1 Wann Instancing passt

`InstancedMesh` oder vorhandene Batch-Renderer passen, wenn viele Objekte gleiche Geometrie/Materialien haben und nur Position, Rotation, Scale oder Farbe variieren. Typische Kandidaten sind Gegnerteile, Partikel, Ground Decals, Damage Numbers, Slashes, Trails, Tiles, Deko und Remote-Mirror-VFX.

### 5.2 `InstancedMesh`-Pflichten

- Nach `setMatrixAt()` immer `instanceMatrix.needsUpdate = true`.
- Nach `setColorAt()` immer `instanceColor.needsUpdate = true`.
- `count` darf nur innerhalb der Max-Kapazität variieren.
- Wenn mehr Instanzen als Kapazität gebraucht werden, neuen `InstancedMesh` erzeugen.
- Bounding Volumes bei veränderten Instanzen prüfen: `computeBoundingBox()`/`computeBoundingSphere()` für Culling/Raycasting.

### 5.3 Dirty-Signaturen

Bei statischen oder selten veränderten Instanzen nicht jedes Frame Matrix/Farbe neu schreiben. Eine Dirty-Signatur kann Position, Rotation/Yaw, Scale, Animation-Speed/Phase, Archetype/Partlayout, Farbe/Rage/Flash/Telegraph, Sichtbarkeit, Count und Reihenfolge enthalten.

**Typischer Nutzen:** hoch für stationäre oder selten veränderte Instanzen; geringer für voll animierte Instanzen ohne stabile Phasen.

### 5.4 Batching statt Mesh-Splitting

Wenn viele Einzel-Meshes nur Parts eines Modells darstellen, zuerst Material-/Geometrie-Batching prüfen. Neue Merge-Pfade immer A/B gegen Instancing dokumentieren: FPS, `p95`, `worst`, `renderer.info`, Screenshot und visuelle Parität.

---

## 6. Globale VFX-Architektur-Regeln

### 6.1 Zielbild

Kosten sollen mit aktueller Effektlast skalieren, nicht mit Anzahl eingebauter Klassen oder importierter Skill-Dateien. Ein Skill erzeugt ein Event oder einen Descriptor, eine zentrale Runtime-Queue begrenzt und priorisiert, Pools recyceln Slots, und Rendererfamilien wie `Beam`, `Trail`, `Ring`, `Aura`, `Impact`, `Spark` oder `Number` verarbeiten Events gebatcht.

### 6.2 Was nicht passieren darf

- Keine lokale Klassen-VFX-Runtime für alle Klassen gleichzeitig mounten.
- Remote-/Raid-VFX nicht lösen, indem alle lokalen Klassenrenderer aktiv werden.
- Keine unkontrollierten `engineState.particles.push`/`slashes.push` aus vielen Komponenten im Hotpath.
- Kein „VFX Off“ als Endlösung für Architekturprobleme.
- Keine Gameplay-Hitbox entfernen, nur weil sie visuell wie ein Effekt aussieht.

### 6.3 Transparenz und Overdraw

Transparente Serien mit vielen Layern brauchen Instancing/Batching oder Messwerte. DoubleSide + transparent prüfen: Three.js kann für doppelseitig transparente Objekte zwei Draw Calls nutzen. `forceSinglePass` kann bei flachen VFX/Sprites sinnvoll sein. `depthWrite=false` für transparente Overlays prüfen, `renderOrder` nur gezielt setzen und Overdraw mit `transparentLayerEstimate` sichtbar machen.

### 6.4 VFX-Guardrails

Vor jedem VFX-Hotpath-Merge `pnpm run perf:vfx-guardrails` ausführen. Bei absichtlicher Hotpath-Erweiterung Baseline nur bewusst aktualisieren. Guardrail-Warnungen dürfen nur mit Messwerten freigegeben werden: `fps`, `frameMs`, `calls`, `transparentLayerEstimate`, `activeUseFrameSubsystems`, Queue-/Batch-Drops.

---

## 7. Globale Terrain-, Voxel- und Chunking-Regeln

### 7.1 Voxel-Grundregel

Bei großen Tile-Maps nie blind Voll-Boxen als Default rendern. Erst sichtbare Faces reduzieren, Top-Faces nutzen, Side-Skirts für Look-Recovery einsetzen, Chunking und Culling für Sichtfenster nutzen, Chunks persistent halten und `visible` toggeln.

### 7.2 Terrain-Budget

Für Standardkamera ein Budget pflegen: Terrain möglichst unter `~20k` Triangles halten und Richtung `~1` Draw Call pro sichtbarem Batch bringen. Bei Überschreitung zuerst Geometriepfad/Materialpfad korrigieren.

### 7.3 Chunk-Boundary-Stutter

Chunk-Geometrien einmalig cachen, Chunk-Gruppen persistent halten, Sichtbarkeit toggeln statt neu mounten, Stats als Summen zählen und Kamera-/Chunk-Updates niedrig priorisieren, wenn sie React-State berühren.

### 7.4 Procedural Geometry

Bei selbst erzeugten Geometrien Triangle-Winding, Normals und Bounding Volumes explizit prüfen. Backface-Culling nicht mit `DoubleSide` kaschieren, wenn Winding falsch ist.

---

## 8. Globale WebGPU-Regeln

### 8.1 WebGPU kann helfen bei

WebGPU kann bei moderner Renderer-Pipeline, Node/TSL-Materialpfaden, bestimmten PostFX-/MRT-Pfaden, GPU-nahen Workloads und langfristiger Renderarchitektur helfen.

### 8.2 WebGPU löst nicht automatisch

WebGPU löst nicht automatisch zu viele gemountete `useFrame`-Systeme, React-State-Churn, ungebatchte Mesh-Massen, unkontrollierte transparente Layer, schlechte PostFX-Ablation, fehlende Pools oder falsche Messungen.

### 8.3 Pflichtvalidierung

Vor FPS-Bewertung prüfen: `window.isSecureContext === true`, `navigator.gpu` vorhanden, `requestAdapter()` liefert Adapter, `requestDevice()` klappt, App meldet `backend === "webgpu"`, `renderStatsFresh === true`, Canvas ist sichtbar und nicht leer.

### 8.4 R3F/Three.js WebGPU-Hinweise

WebGPU-Initialisierung ist async. Der R3F-Renderer-Pfad muss async/init-fähig sein. `WebGPURenderer` kann auf WebGL2 fallbacken, deshalb Backend nie raten, sondern messen. Klassische `EffectComposer`-Pfade sind WebGLRenderer-orientiert; WebGPU braucht kompatiblen PostFX-Pfad oder expliziten Downgrade.

---

## 9. Globale PostFX-, Schatten- und Asset-Regeln

PostFX nie nur als Sammelschalter bewerten. Bloom, Vignette, Shadow/Glow, Edge Blur, DPR/Resolution Scale, Tone Mapping und Backend-Fallbacks getrennt betrachten. Wenn ein Backend deutlich schlechter ist, nicht direkt alle Effekte abschalten, sondern Kostenpfad isolieren, backend-sensitives Profil bauen und Screenshot-Parität prüfen.

Geometrien und Materialien teilen, Materialvarianten begrenzen, Texturen nicht im Renderpfad laden/erzeugen, `needsUpdate` nur bei echter Änderung setzen und `dispose()` für nicht mehr genutzte GPU-Ressourcen beachten. Texture-Uploads gehören nicht in häufige Gameplay-Hotpaths.

---

## 10. Projektbezogene Regeln für dieses Voxel-Samurai-Quiz

### 10.1 Warum dieser Abschnitt speziell ist

Die folgenden Regeln sind aus konkreten Messungen und Fehlerfällen dieses Projekts entstanden. Sie passen besonders zu diesem Spiel, weil es Voxel-Terrain, Klassen-Skills, Lai-Samurai-LMB, Gegnerwellen, lokale/Remote-VFX, R3F und experimentelle WebGPU-Pfade kombiniert. Für ein anderes Three.js-Spiel sind sie nützlich als Muster, aber nicht automatisch 1:1 Pflicht.

### 10.2 `Effects.tsx` als kritischer Hotpath

`src/components/3d/Effects.tsx` entscheidet, welche großen VFX-Systeme in der Szene leben. Ein kleiner Boolean kann viele `useFrame`-Loops, Shader, transparente Meshes und globale Array-Arbeit aktivieren. Lokale Klassen-VFX nur für die aktive lokale Klasse mounten, gemeinsame Renderer nur für Klassen mounten, die sie wirklich nutzen, Preview-/Dev-Klasse nur explizit aktivieren und Remote-VFX über Remote-Mirror-Descriptoren laufen lassen.

**Projekt-Learning:** Die große Regression entstand, weil lokale Klassen-VFX-Renderer breit gemountet wurden. Der Fix war echtes Gating: aktive lokale Klasse statt „alle Klassen leben im Hintergrund“.

### 10.3 VFX-Off und Lai-Slash-Semantik

Manche VFX-Objekte sind gleichzeitig Hitbox-/Gameplay-Signale, zum Beispiel Lai-Slashes. Visuelle Darstellung darf deaktiviert oder versteckt werden, aber das Gameplay-Signal bleibt erhalten, wenn Trefferlogik davon abhängt. Reports sollen sichtbare und versteckte Runtime-Objekte getrennt zählen, zum Beispiel `visibleSlashes` und `hiddenSlashes`.

**Projekt-Learning CHAT 7:** Lai-LMB-Slashes bleiben bei Skill-VFX-Off als `hiddenVfx` aktiv, damit Trefferlogik nicht kaputtgeht.

### 10.4 Regular Enemies

Bewährte Reihenfolge in diesem Projekt: sichtbare Gegnerliste korrekt begrenzen, `InstancedMesh.count` auf echte sichtbare Runtime setzen, Parts batchen statt pro Part ein Mesh, Matrix/Farbe nur bei Dirty-Signatur hochladen und erst danach LOD/Material-Sparpfade prüfen. Enemy-Model-Layer nicht einfach abschalten und als Fix verkaufen.

**Projekt-Learning CHAT 11:** Regular Enemy Parts von `24` separaten Part-Meshes auf kompakten Batch reduziert: `15 Gegner Full` ging von `72` auf `49` Draw Calls, Triangles von `38.770` auf `37.690`, Model-Layer danach nur noch `+1` Call über Model-Off.

**Projekt-Learning CHAT 12:** Regular Enemies mit Dirty-Signaturen: `enemies.regularModelRender` sank bei `15 Gegner Full` von `0.227 ms` auf `0.017 ms`, bei `15 Gegner VFX-Off` von `0.223 ms` auf `0.004 ms`. Draw Calls blieben bei `49`, Triangles bei `37.690`.

### 10.5 Boss- und Slot-Tracking

Modelle/Slots nicht an Array-Indizes koppeln, wenn Spawns/Deletes die Reihenfolge verschieben können. Boss-Modell-Slots wurden auf stabile Boss-IDs umgestellt, damit normale Spawns/Deletes keinen unnötigen React-State-Churn im Boss-Pfad auslösen.

### 10.6 Remote-/Ally-VFX

Default in normalen Gruppenkämpfen: Ally-Skills bleiben sichtbar und lesbar. Reduktion ist perzeptiv, nicht „alles aus“. Remote-Effekte nutzen Mirror-Events, Familien, Pools und Relevanz. Relevanzsignale sind Distanz, Kamera-/Screen-Space, Combat-Relevanz, Skill-Priorität, Queue-/Batch-Druck und lokale Spielernähe.

### 10.7 Terrain in diesem Projekt

Das Projekt darf nicht zu Full-Box-Voxel als Default zurückfallen. Für die Standardkamera gelten Top-Faces, Side-Skirts, Chunking, Culling, persistente Chunks und ein niedriges Terrain-Triangle-Budget. Wenn Terrain wieder deutlich über dem Budget liegt, ist das ein Architekturproblem, kein „Grafik ist halt teuer“-Problem.

### 10.8 WebGPU/PostFX in diesem Projekt

WebGPU erst bewerten, wenn Backend wirklich aktiv ist, Canvas sichtbar rendert und PostFX getrennt gemessen wurde. Einzelruns streuen stark; Median mehrerer identischer Paarläufe ist belastbarer. Ein leerer Canvas oder `calls=0` ist ein Blocker, kein guter FPS-Wert.

**Projekt-Learning Phase 9:** WebGPU wurde durch gezielte Shadow/Glow- und DPR-Anpassung stabiler, nicht durch pauschales Bloom/Vignette-Off.

---

## 11. Erwarteter Nutzen nach Hebel

| Hebel | Nutzen | Risiko | Wann zuerst |
| --- | --- | --- | --- |
| Unnötige Klassen-VFX nicht mounten | sehr hoch | gering, wenn Semantik getrennt | Kosten steigen mit Klassenzahl |
| Instancing/Batching gleicher Objekte | hoch | mittel, Parität prüfen | hohe Draw Calls |
| Dirty-Signaturen | hoch bei statischer Last | mittel, Animation/Flash beachten | CPU-Matrix-/Color-Kosten |
| Terrain Top-Faces/Chunking | sehr hoch | mittel, Look-Recovery nötig | Voxel-/Tile-Maps |
| Transparenz-Layer batchen/reduzieren | mittel bis hoch | mittel, Look kann leiden | Additive/Glow/Overdraw |
| Zentrale VFX-Queue/Pools | hoch in Gruppen/Raid | mittel, Architekturarbeit | viele Skillquellen |
| WebGPU-A/B | situativ | hoch, PostFX/Shader-Parität | nach Architekturfix |
| Pauschal VFX aus | nur Diagnose | hoch, Qualitätsverlust | Notfall/Debug |

---

## 12. Review-Checkliste für 3D-PRs

- Wurde `shared-docs/THREEJS-RULES.md` gelesen?
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
- Wurde visuelle Parität per Screenshot/Browser geprüft?
- Wurden `pnpm lint` und passende Perf-Commands ausgeführt?

---

## 13. Offizielle Referenzen

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

## 14. Projektinterne Pflichtreferenzen

- `shared-docs/THREEJS-BEGRIFFE.md`
- `docs/performance-issue/BIG-PERFORMANCE-ISSUE-HISTORY.md`
- `docs/performance/tasks/2026-05-18-vfx-aaa-runtime-architecture-masterplan.md`
- `docs/performance/tasks/2026-05-18-runtime-fps-lag-masterplan.md`
- `docs/performance/tasks/2026-05-18-runtime-fps-chat-12-regular-enemy-instance-update-budget.md`
- `docs/performance/tasks/2026-05-18-webgpu-postfx-parity-plan.md`
- `VFX.md`
- `src/components/3d/Effects.tsx`
- `src/components/3d/enemies/InstancedRegularEnemies.tsx`
- `src/lib/vfx/runtime/vfxEventRuntime.ts`
- `src/lib/performance/runtimePerformanceSnapshot.ts`

---

## 15. Merksatz

Gute 3D-Performance entsteht nicht dadurch, dass das Spiel schlechter aussieht. Sie entsteht dadurch, dass dieselbe Optik intern über weniger aktive Runtime-Systeme, weniger Draw Calls, weniger unnötige Uploads, stabile Pools und klare Messwerte läuft.
