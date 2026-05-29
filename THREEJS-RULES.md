# Three.js, R3F, WebGPU und 3D-Performance-Regeln

**Zweck:** Schnelle Pflichtregeln für 3D-Performance in Three.js, React Three Fiber, WebGL/WebGPU, VFX, Gegnern, Skills und Voxel-/Tile-Maps.

**Wann lesen:** Immer bei Änderungen an `src/components/3d`, `src/components/player/classes`, `src/lib/vfx`, `src/lib/performance`, Canvas/PostFX, Terrain/Voxel, Gegner-Modellen, Animationen, Skills oder WebGPU/WebGL.

**Merksatz:** Gute 3D-Performance entsteht nicht dadurch, dass das Spiel schlechter aussieht. Sie entsteht dadurch, dass dieselbe Optik intern über weniger aktive Runtime-Systeme, weniger Draw Calls, weniger unnötige Uploads, stabile Pools und klare Messwerte läuft.

**Begriffe:** Bei unklaren Wörtern wie Draw Call, Instancing, Overdraw oder Dirty-Signatur zuerst `shared-docs/THREEJS-BEGRIFFE.md` lesen.

**Details:** Für Beispiele, typische Denkfehler und längere Erklärungen `shared-docs/THREEJS-PERFORMANCE-DETAILS.md` lesen.

**Projekt-History:** Alte Projektfälle, Root-Cause-Muster und Vorfall-Merkhilfen liegen in `shared-docs/THREEJS-PERFORMANCE-HISTORY.md`.

---

## 1. MMO-Performance-Grundsatz

Denke bei jeder Three.js/R3F/VFX/Game-Änderung zuerst wie ein MMO-Performance-Engineer: schöne Effekte erhalten, aber Kosten durch Pooling, Instancing, Batching, Budgets, Relevanz und stabile Runtimes kontrollieren. Nicht blind VFX, Skills, Gegner oder Map abschalten. Gameplay-Hitboxen, Trefferfeedback, Klassenidentität und Boss-Signale bleiben sichtbar und korrekt. FPS nie allein bewerten: Frame Avg, P95, Worst, Calls, Triangles und echtes Spielgefühl zählen. Bei Unsicherheit diese Datei und danach die Detail-/History-Dateien lesen.

**Priorität:**
1. Gameplay korrekt: Hitboxen, Damage, Boss-Signale, Gegnerreaktionen und Skill-Semantik bleiben echt.
2. Optik hochwertig: eigene Skills, wichtige VFX, Trefferfeedback und Klassenidentität bleiben lesbar.
3. Performance messbar besser: Vorher/Nachher mit gleicher Szene und passenden Messwerten.
4. Architektur sauber: Pooling, Instancing, Batching, zentrale Queues, stabile Runtimes.
5. Dokumentation klar: Ursache, Entscheidung, Restrisiko und manuelles Prüf-Gate notieren.

**Nicht tun:** Performance nicht durch blinde Qualitätsverluste verkaufen. VFX-Off, No-AI, No-GameFX, No-Skills, Map-Off und Gegner-Off sind Diagnose-Hebel, keine Produktlösung.

**User-Gate für Messungen:** Keine automatischen Browser-, Ingame-, Smoke-, Bot-, FPS-, A/B-, Recorder- oder Serverwert-Läufe ohne ausdrücklichen User-Auftrag. Ohne Auftrag nur Code, vorhandene Reports, offizielle Doku und User-Beschreibung nutzen und ein manuelles Prüf-Gate dokumentieren. Metriken sind Hinweise für Technik, aber kein Beweis für Kampfgefühl, AOE-Lesbarkeit, Sound, Vibration oder Despawn-Verständlichkeit.

---

## 2. Pflichtregeln

- **MUSS: FPS allein reicht nie.** Wenn Performance mit vorhandenen Daten oder User-Auftrag bewertet wird, nicht nur FPS nutzen, sondern auch `frameMsAvg`, `frameMsP95`, `frameMsWorst`, Draw Calls, Triangles, Geometries, Texturen, aktive `useFrame`-Systeme und sichtbare Stotterer einordnen.
- **MUSS: Vorhandene Evidenz nutzen, nicht automatisch messen.** Wenn der User Messwerte, Logs, Screenshots oder Recording-Pfade liefert, Szene, Klasse, Skill, Gegnerzahl, Kamera, Zoom, Backend, Browser und aktive Debug-Schalter notieren. Ohne ausdrücklichen Auftrag keine neuen Messläufe starten.
- **MUSS: Ursache trennen.** Renderlast, CPU-Loop, React-State, `useFrame`, VFX, Audio, Animation, Gegnerlogik, Terrain/Map, PostFX und Input getrennt betrachten.
- **MUSS: Gameplay und Visuals trennen.** Eine visuelle Reduktion darf keine Hitbox, keinen Damage, keine Boss-Mechanik und kein Skill-Timing entfernen.
- **MUSS: `useFrame` bleibt billig.** Kein häufiges React-`setState`, keine breiten Store-Subscriptions, keine Objektmassen pro Frame neu erzeugen.
- **MUSS: Schwere R3F-Objekte stabil halten.** Materialien, Geometrien, Lights, Shader und PostFX nicht unnötig mounten/unmounten.
- **MUSS: Gleiche Dinge batchen oder instancen.** Gegnerteile, Partikel, Decals, Slashes, Tiles und Remote-VFX über wenige Renderer laufen lassen.
- **MUSS: VFX budgetieren statt löschen.** Wichtige Treffer bleiben sichtbar; entfernte, doppelte oder kleine Neben-Effekte dürfen reduziert werden.
- **MUSS: LOD und View-Culling bei großen Szenen prüfen.** Weit entfernte Objekte einfacher rendern und Dinge außerhalb der Kamera, Relevanzdistanz oder Sichtlinie früh auslassen.
- **MUSS: Terrain nicht als Full-Box-Default bauen.** Top-Faces, Side-Skirts, Chunking, Culling und persistente Chunks nutzen.
- **MUSS: Keine automatischen 3D-FPS-Beweise aus Headless-Browsern.** Echte FPS brauchen echten Browser/GPU oder User-Messwerte.
- **CHECK: Wenn Messwerte widersprüchlich sind,** mehrere identische Paarläufe oder einen manuellen User-Lauf nutzen.
- **CHECK: Wenn du unsicher bist,** passende Scope-Abschnitte unten lesen und danach Details/History prüfen.

---

## 3. Scope-Lesepfade

**VFX, Skills, Klassen-Effekte:** Abschnitt 1, 2, 4, 6, 7, 8 lesen. Danach `THREEJS-PERFORMANCE-HISTORY.md` zu Effects, Lai-LMB, Fight-Runtime und Slash-ID-Kollision prüfen.

**Terrain, Map, Voxel, Town:** Abschnitt 1, 2, 4, 5, 9 lesen. Danach History zu Map-Off, Terrain und Chunking prüfen.

**Gegner, Boss-Slots, Remote-VFX:** Abschnitt 1, 2, 4, 5, 6, 10 lesen. Danach History zu Regular Enemies und Boss-Slots prüfen.

**WebGPU, WebGL, PostFX, DPR, Glow:** Abschnitt 1, 2, 4, 8, 9 lesen. Danach Details zu WebGPU/PostFX lesen.

**HUD, Diagnose, FPS-Anzeige:** Abschnitt 1, 2, 4, 11 lesen. Danach History zu FPS-HUD und RendererStatsBridge prüfen.

**Input, Maus, Pointer, Kamera:** Abschnitt 1, 2, 5, 11 lesen. Danach History zu Cursor/Input und R3F-Pointermove prüfen.

---

## 4. Messwerte richtig lesen

| Metrik | Bedeutung | Wichtige Einordnung |
| --- | --- | --- |
| `fps` | Bilder pro Sekunde | Nur grober Eindruck, nie allein entscheiden |
| `frameMsAvg` | Durchschnittliche Framezeit | Besser als FPS für Vergleiche |
| `frameMsP95` | Schlechte Frames ohne Extrem-Ausreißer | Oft näher am Spielgefühl |
| `frameMsWorst` | Härtester Spike | Erklärt kurze Hänger |
| `calls` | Draw Calls | Viele Meshes, Materialien, PostFX oder ungebatchte Parts |
| `triangles` | Geometrie-Last | Terrain, Modelle, Full-Box-Voxel, unnötige Faces |
| `geometries` | GPU-Geometrien | Einzelobjekte oder fehlendes Batching |
| `textures` | aktive Texturen | Uploads, Speicher, Materialvarianten |
| `transparentLayerEstimate` | Overdraw-Risiko | Glow, AOE, Slashes, Nebel, Partikel |
| `activeUseFrameSubsystems` | aktive Frame-Loops | Zu viele laufende Runtimes |
| Queue-/Pool-Drops | VFX-Druck | Sichtbare Skalierung erklären |

- **FPS-Cap-Regel:** Wenn FPS bei `60`, `120`, `144` oder `240` kleben, über Framezeiten, Calls, Triangles und Segmentzeiten entscheiden.
- **Uncapped-FPS-Regel:** Werte wie `200`, `700` oder `1000 FPS` sind extrem empfindlich. Kleine Framezeit-Sprünge wirken riesig. Für Entscheidungen zählen `frameMsAvg`, `p95`, `worst`, FPS-Low und mehrere Sekunden Durchschnitt.
- **Renderer-Stats-Regel:** Draw Calls und Triangles müssen aus `renderer.info.render.calls` und `renderer.info.render.triangles` kommen. Eigene Scene-Traversal-Schätzungen nur als Hilfswerte nutzen.
- **Triangle-/PostFX-Regel:** `Triangles` ist ein aktueller Frame-/Render-Durchlauf-Wert, keine feste Gesamtszenen-Zahl. Leere `EffectComposer` nie mounten.
- **Canvas-Regel:** `calls=0`, leerer Canvas oder fehlende Gegner sind Messfehler, kein Performance-Gewinn.

---

## 5. R3F-, React- und Input-Hotpaths

- **MUSS: In `useFrame` keine React-Render-Ketten erzeugen.** Bewegung über `ref.current`, Runtime-Objekte oder direkte Mutable-State-Pfade lösen.
- **MUSS: Store-Zugriffe klein halten.** Keine breiten Store-Subscriptions in FPS-, Skill-, Gegner-, Terrain- oder Input-Hotpaths.
- **MUSS: UI-Sync drosseln.** FPS-HUD, Debug-Panel und Profiler dürfen nicht selbst schwere 3D-Subtrees neu rendern.
- **MUSS: Komponenten nicht im Body anderer Komponenten definieren.** Das erzeugt neue Component Types pro Render und kann State verlieren.
- **MUSS: R3F-Pointer-Raycasts prüfen.** `onPointerOver`, `onPointerMove`, `onClick` und ähnliche R3F-Events können bei Mausbewegung Raycasts auslösen.
- **CHECK: Gameplay-Hover nur nutzen, wenn er wirklich gebraucht wird.** Sonst eigenes Input-System, Klicks oder gedrosselte Nähe-Checks verwenden.
- **CHECK: Gaming-Mäuse beachten.** `mousemove` kann viel schneller kommen als Frames. Mauspositionen für Aim nur einmal pro `requestAnimationFrame` schreiben; Klick/Drag bleibt Sofortpfad.
- **CHECK: Kamera-/Cursor-Arbeit budgetieren.** Cursor-Ray, Terrain-Sample, Enemy-Hover-Scan und Aim-Rotation brauchen Revisionen, Cache und Zeitbudget.

---

## 6. Instancing, Batching, Dirty-Signaturen

- **MUSS: Instancing nutzen, wenn viele Objekte gleich sind.** Gute Kandidaten: Gegnerteile, Partikel, Ground Decals, Damage Numbers, Slashes, Trails, Tiles, Deko, Projektile, Remote-VFX.
- **MUSS: Auto-Instancing-Kandidaten sammeln.** Bei Maps, Kitbash-Props, Gegnerteilen, Deko und VFX-Familien nicht nur einzelne `InstancedMesh`-Fixes bauen, sondern eine Pipeline prüfen, die gleiche Geometrie + gleiches Material automatisch in Rendererfamilien gruppiert.
- **MUSS: Texturwechsel reduzieren.** Wenn viele kleine Texturen, Decals, Sprite-Masks, Icons, Tile-Varianten oder Materialvarianten Draw Calls aufsplitten, zuerst Atlas, Spritesheet, `DataArrayTexture`/Texture-Array oder Material-ID-Attribute prüfen.
- **MUSS: Material-Varianten budgetieren.** Gleiche Geometrie mit zehn fast gleichen Materialien ist oft kein Instancing-Gewinn. Varianten bevorzugt über Uniforms, Instancing-Attribute, Texture-Layer-ID oder gemeinsame Shaderfamilie lösen.
- **MUSS: Renderer-Familie vor Merge benennen.** Gleiche Geometrie bleibt `InstancedMesh`/`Instances`; unterschiedliche statische Geometrien mit gleichem Material sind `BatchedMesh`-Kandidaten; viele kleine Texturen brauchen Atlas/Texture-Array-Check.
- **MUSS: Globales Renderer-Familien-Muster nutzen.** Erst gleiche/ähnliche Teile in Renderer-Familien sortieren, dann Material-/Textur-Splits entfernen, dann Matrix/Farbe/Alpha/UV nur per Dirty-Signatur hochladen. Der 150-FPS-Schrein-Vorfall ist nur das Beispiel: Torii-Boxen wurden zu einem farbigen `InstancedMesh`, A/B/C/D-Letter zu einem Canvas-Atlas, Gate/Core/Label-Daten nur bei echten Änderungen hochgeladen. Das Muster gilt global für VFX, Deko, Props, Gegnerteile, Projektile, Telegraphs, Dungeon-Adds, Arena-Visuals, Map-Details und UI-im-3D-Raum.
- **MUSS: Update-Flags setzen.** Nach `setMatrixAt()` immer `instanceMatrix.needsUpdate = true`; nach `setColorAt()` immer `instanceColor.needsUpdate = true`.
- **MUSS: Kapazität beachten.** `count` darf nur innerhalb der Max-Kapazität variieren.
- **MUSS: Bounding Volumes prüfen.** Bei veränderten Instanzen `computeBoundingBox()` oder `computeBoundingSphere()` beachten.
- **MUSS: View-Culling nicht durch falsche Bounds kaputtmachen.** Wenn Instanzen, Chunks oder prozedurale Geometrien außerhalb ihrer alten Hülle liegen, kann Three.js sie falsch ausblenden.
- **MUSS: Neue `frustumCulled={false}` Stellen begründen.** Statische Meshes mit sauberer Bounding-Sphere nutzen normales Culling; dynamische Instanced-/VFX-Pools brauchen Kommentar, Regelverweis oder Task-Begründung.
- **CHECK: Dirty-Signaturen nutzen.** Position, Yaw, Scale, Animation-Speed, Farbe, Rage, Flash, Telegraph, Sichtbarkeit, Count und Reihenfolge nur bei Änderung hochladen.
- **CHECK: Dauer-Uploads verdächtig behandeln.** Wenn `useFrame` jedes Frame alle Instanzen neu schreibt, obwohl nur Rotation/Timer animiert, statische Teile trennen: animierte Instanzen weiter tickern, statische Instanzen schlafen lassen.
- **CHECK: Leere Instanced-Pools schlafen lassen.** Bei `count=0` nach Möglichkeit `visible=false` setzen und keine Matrix-/Color-Uploads als dirty markieren.
- **CHECK: CPU-Kosten gegen Renderkosten trennen.** Wenn Kosten vom CPU-Update kommen, reicht Draw-Call-Reduktion allein nicht.
- **CHECK: Typed-Array-/Worker-/WASM-Hotpaths nur bei echtem CPU-Bottleneck.** Erst Algorithmus, Datenlayout und Allokationen reparieren; AssemblyScript/WASM lohnt sich nur für isolierte, oft laufende Module wie Culling, Matrix-Updates, Sortierung oder Spatial Queries.

---

## 7. VFX-Architektur

- **MUSS: Kosten skalieren mit aktueller Effektlast, nicht mit Anzahl eingebauter Klassen.**
- **MUSS: Skill erzeugt Descriptor/Event, nicht direkt viele globale Renderobjekte.**
- **MUSS: Zentrale Queue nutzen.** VFX-Events sammeln, priorisieren, begrenzen und kontrolliert rendern.
- **MUSS: Pooling nutzen.** Partikel, Slashes, Decals, Damage Numbers und ImpactFX recyceln.
- **MUSS: Rendererfamilien denken.** `Beam`, `Trail`, `Ring`, `Aura`, `Impact`, `Spark`, `Number`, `Slash`, `Projectile` als wenige gebatchte Renderer planen.
- **MUSS: Hitbox bleibt Gameplay.** Keine Gameplay-Hitbox entfernen, nur weil sie visuell wie ein Effekt aussieht.
- **MUSS: Remote-/Ally-VFX lesbar halten.** In normalen Gruppenkämpfen nicht standardmäßig verstecken, sondern per Relevanz reduzieren.
- **CHECK: Perzeptive Skalierung bevorzugen.** Dichte, Lifetime, Alpha, Auflösung, Detailstufe oder Spawnrate reduzieren, statt Effekte hart auszuschalten.
- **CHECK: Direkte globale Pushes sind Warnsignale.** `engineState.particles.push`, `slashes.push`, `damageNumbers.push` in vielen Komponenten prüfen.
- **CHECK: Guardrail ausführen.** Vor VFX-Hotpath-Merge `pnpm run perf:vfx-guardrails`; Baseline nur nach bewusstem Strukturwechsel aktualisieren.

---

## 8. Transparenz, Glow, PostFX und Materialien

- **MUSS: Transparenz ernst nehmen.** Additive, transparent und DoubleSide können Overdraw, Sortierung und Draw Calls stark erhöhen.
- **MUSS: Wichtige VFX sichtbar halten.** Telegraphs, Hitbox-Hinweise, eigene Treffer, Boss-Gefahren und Klassenidentität dürfen nicht verschwinden.
- **MUSS: WebGL-Partikel-Farbpfad prüfen.** Wenn Partikel-Daten und Poolwerte gut aussehen, aber Sparks unsichtbar oder schwarz bleiben, nicht weiter Pool/Größe erhöhen. Den Materialpfad prüfen: `meshBasicMaterial + vertexColors + InstancedMesh.setColorAt` kann bei Partikeln im WebGL-Spielbild unzuverlässig wirken. Stabiler Fix: wie bei Slashes einen kleinen Shader nutzen, `instanceColor` explizit lesen und Farbe/Intensität direkt ausgeben.
- **CHECK: `forceSinglePass` prüfen.** Bei flachen VFX/Sprites kann es helfen, muss aber visuell geprüft werden.
- **CHECK: `depthWrite=false` prüfen.** Für transparente Overlays oft sinnvoll, Sortierung trotzdem testen.
- **CHECK: `renderOrder` sparsam nutzen.** Nicht als globalen Sortier-Hack verwenden.
- **CHECK: PostFX getrennt messen.** Bloom, Shadow/Glow, Vignette, DPR/Resolution Scale, Tone Mapping und Backend-Fallbacks einzeln bewerten.
- **CHECK: Leere PostFX-Pfade entfernen.** Wenn Bloom/RFX aus ist, darf kein leerer Composer weiterlaufen.

**Vorfall-Merkhilfe (2026-05-21, Samurai-Partikel in WebGL):**
- Sichtbares Problem: Slash-Effekte waren normal, aber echte Partikel/Sparks waren unsichtbar oder schwarz.
- Falsche Fährten: Pool war grün, Spark-Größe +10% half nicht, WebGPU war nicht aktiv.
- Ursache: Partikel nutzten den Three.js-Standardpfad `meshBasicMaterial + vertexColors + InstancedMesh.setColorAt`; Slashes nutzten dagegen einen eigenen Shader mit explizitem `instanceColor`.
- Fix: Partikel-Buckets in `src/components/3d/vfx/Particles.tsx` auf kleinen WebGL-Shader umgestellt, der `instanceColor` direkt liest und Sparks/Additive-Orbs heller ausgibt.
- Merksatz: Wenn Slash sichtbar ist, Partikel aber nicht, zuerst Render-Material/Farbpfad vergleichen, nicht Spawn, Pool oder WebGPU beschuldigen.

---

## 9. Terrain, Voxel, Map und WebGPU

- **MUSS: Keine Full-Box-Defaults bei großen Tile-Maps.**
- **MUSS: Sichtbare Faces reduzieren.** Top-Faces, Side-Skirts und nur nötige Seitenflächen nutzen.
- **MUSS: Chunks persistent halten.** Sichtbarkeit toggeln statt harte Mount/Unmount-Spikes erzeugen.
- **MUSS: Chunk-Geometrien cachen.** Nicht bei jeder Kamerabewegung neu bauen.
- **MUSS: Chunk-LOD und Chunk-Culling planen.** Nahe Chunks dürfen mehr Details haben; entfernte Chunks brauchen grobere Geometrie, weniger VFX/Props oder werden außerhalb des Sichtfensters deaktiviert.
- **MUSS: Map-Off muss echt sein.** Wenn `Map Off` aktiv ist, müssen Terrain-Basisflächen, Walls und große Layer wirklich weg sein.
- **CHECK: Terrain-Budget beachten.** Für Standardkamera Richtung `~20k` Triangles und wenige Draw Calls pro sichtbarem Batch zielen.
- **CHECK: Map-/Town-Hide richtig deuten.** Wenn das Ausblenden `+400 FPS` bringt, ist die Map ein Hauptkostenblock.
- **CHECK: WebGPU ist ein A/B-Hebel, kein Wundermittel.** Erst Runtime-Architektur, Batching, Pools und PostFX-Kosten klären.
- **CHECK: WebGPU nur bewerten, wenn Backend aktiv ist.** Canvas sichtbar, RendererStats frisch, `calls>0`, Effekte und Hitboxen vorhanden.
- **CHECK: WebGPU/PostFX-Parität sichern.** Kein Backend als Default setzen, wenn VFX, Hitboxen oder Look fehlen.

---

## 10. Gegner, Boss-Slots und Remote-VFX

- **MUSS: Sichtbare Gegnerliste korrekt begrenzen.**
- **MUSS: `InstancedMesh.count` auf echte sichtbare Runtime setzen.**
- **MUSS: Gegner-Parts batchen statt pro Part ein Mesh.**
- **MUSS: Matrix/Farbe nur bei Dirty-Signatur hochladen.**
- **MUSS: Gegner-LOD und Relevanz-Culling nutzen.** Nahe Gegner behalten Silhouette, Animation und Trefferfeedback; entfernte Gegner nutzen vereinfachte Parts, reduzierte Animation/VFX oder reine Marker.
- **MUSS: Boss-Modelle nicht an Array-Indizes koppeln.** Spawns/Deletes dürfen keine Slot-Fehler oder unnötigen React-State-Churn erzeugen.
- **CHECK: Enemy-Model-Layer nicht einfach abschalten und als Fix verkaufen.**
- **CHECK: Remote-VFX nach Relevanz reduzieren.** Distanz, Kamera-/Screen-Space, Combat-Relevanz, Skill-Priorität, Queue-/Batch-Druck und lokale Spielernähe nutzen.

---

## 11. Diagnose-Workflow

- **Reproduzieren:** Nur mit User-Auftrag oder vorhandenen User-Daten. Szene, Klasse, Skill, Gegnerzahl, VFX-Schalter, Browser, Backend, Monitor-/FPS-Cap, Kamera, Zoom und Debug-Schalter notieren.
- **Messen:** Nur vorhandene Messwerte oder ausdrücklich beauftragte Messläufe nutzen: FPS, Frame Avg, P95, Worst, Calls, Triangles, Geometries, Texturen, transparente Layer, aktive `useFrame`-Systeme, Queue-/Pool-Druck.
- **Ablation statt Raten:** VFX, Partikel, Slashes, Enemy Model, Terrain, Map, PostFX, Shadows, WebGL/WebGPU, Audio und Skill ohne Trefferkontakt getrennt prüfen.
- **Root Cause trennen:** CPU-Loop, React-State-Churn, Draw Calls, Triangles, Overdraw, Shader/PostFX, Texture/Memory, Audio, Physik, Input, Display-Cap.
- **Architektur fixen:** Batching, Instancing, Pooling, Dirty-Signaturen, zentrale Queues, Budget-Gates, stabile Boundaries.
- **Qualität prüfen:** Was sieht gleich aus? Was sieht anders aus? Ist Trefferfeedback noch lesbar?
- **User-Gate beachten:** Screenshot/Browser/Playwright/Recorder/Ingame-Checks nur mit ausdrücklichem User-Auftrag starten. Sonst manuellen Blocker dokumentieren.
- **Dokumentieren:** Ursache, verworfene Alternativen, vorhandene Messwert-Delta/Reportpfade, Restrisiko, Qualitätsverlust, manuelles User-Gate und Folgeaufgaben.

**Fight-Runtime-Pflichtblock:** Nur bei vorhandenen Reports oder ausdrücklichem User-Auftrag Default-Samurai, Gegnerzahl, Kamera/Zoom, Skillfolge, `No P Skills`-Delta, `No GameFX`-Delta und Segmente wie `combat.hitScan`, `combat.damageApply`, `combat.enemyReaction`, `combat.hitFeedback`, `combat.damageNumberSpawn`, `combat.hitStopApply`, `player.slam.hitFrame` notieren.

---

## 12. Projekt-Commands

- `pnpm lint` - Pflicht nach Codeänderungen.
- `pnpm exec tsc --noEmit` - TypeScript-Gate nach Phasen.
- `pnpm run perf:vfx-guardrails` - statischer VFX-Hotpath-Check.
- `pnpm run perf:vfx-guardrails:update-baseline` - nur nach bewusstem Hotpath-Strukturwechsel.
- `pnpm run perf:lai-lmb` - Lai-LMB-Spezialprofil, Reports unter `output/perf/`.
- `pnpm run perf:guard` - allgemeiner Browser-Performance-Guard.
- `pnpm run browser:webgpu-phase6c-ab` - WebGL/WebGPU-A/B, nur wenn passend und erlaubt.
- `pnpm run browser:webgpu-phase8-solo-ablation` - WebGPU/PostFX-Ablation, nur wenn passend und erlaubt.

**Nicht automatisch starten:** Kein `pnpm dev` oder `pnpm run dev` ohne ausdrücklichen Auftrag. Keine Port-Konflikte erzeugen.

---

## 13. Entscheidungsbaum

- **FPS droppt, Calls gleich:** CPU-Hotpath, React-State-Churn, Matrix-/Color-Uploads, Audio, Gameplay-Loop, Input oder PostFX prüfen.
- **Draw Calls steigen:** Mesh-Splitting, Materialvarianten, PostFX-Pässe, transparente Serien, ungebatchte Partikel oder Enemy-Parts prüfen.
- **Triangles steigen:** Terrain, Full-Box-Voxel, Modell-Detailgrad, sichtbare Faces, Side-Skirts und LOD prüfen.
- **Objekte sichtbar, aber weit weg:** LOD, Distanz-Culling, Screen-Space-Größe und Relevanz-Budget prüfen.
- **Nur Worst schlecht:** Mount/Unmount, Shader-Kompilierung, Texture-Upload, Chunk-Grenze, Asset-Ladepunkt oder Garbage Collection prüfen.
- **P95 schlecht:** Dauerhaft teurer Hotpath, aktive Runtimes, Gegner-Update, VFX-Queue oder Terrain-Sichtfenster prüfen.
- **VFX-Off hilft kaum:** Hitbox-Semantik, Audio, Animation, Enemy-Reaktion, Snapshot-Logik und React-State prüfen.
- **VFX-Off hilft stark:** Transparenz, Partikelanzahl, Lifetime, Shader, Rendererfamilien, Pooling und Queue-Budget prüfen.
- **Gegner-Off hilft stark:** Instancing, Enemy-Part-Batching, Dirty-Signaturen, AI-Tickrate, Boss-Slots und sichtbare Gegnerliste prüfen.
- **Terrain-Off hilft stark:** Top-Faces, Chunking, Culling, Full-Box-Fallback, Materialvarianten und Chunk-Stats prüfen.
- **WebGPU schlechter:** Backend-Validierung, Canvas-Sicht, PostFX-Kompatibilität, DPR, Shadow/Glow und Fallback prüfen.
- **Messwerte widersprüchlich:** Mehrere identische Paarläufe fahren oder echten User-Playtest anfordern.

---

## 14. Review-Checkliste

- Wurde der passende Scope-Lesepfad genutzt?
- Gibt es neue `useFrame`-Stellen?
- Gibt es neue transparente/Additive/DoubleSide-Serien?
- Werden Materialien/Geometrien im Renderpfad neu erzeugt?
- Sind InstancedMesh-Updates mit Dirty-Signatur oder Begründung versehen?
- Werden `instanceMatrix`/`instanceColor` Update-Flags korrekt gesetzt?
- Werden Bounding Volumes bei Instancing/Procedural Geometry korrekt behandelt?
- Sind LOD-Stufen, View-Culling und Relevanzdistanz so gesetzt, dass wichtige Gameplay-Signale sichtbar bleiben?
- Bleiben Gameplay-Hitboxen bei VFX-Off intakt?
- Wurde per Ablation gemessen statt geraten?
- Gibt es Reportpfade und Vorher/Nachher-Werte?
- Wurde visuelle Parität geprüft oder als manueller User-Blocker dokumentiert?
- Wurden `pnpm lint`, TypeScript und passende Perf-Commands ausgeführt?
- Ist dokumentiert, was bewusst nicht optimiert wurde und warum?

---

## 15. SkillForge-/Unity-Learnings: Vorab optimieren statt später retten

**Kontext:** SkillForge zeigt das Muster: viele Helden + große Szenen brauchen frühe Budgets. Öffentlich genannt: Speicher `4 GB -> 1.3 GB`, Framerate `+57%`. Nutzer-Transkript ergänzt: `-76%` Shader-Varianten, Portrait-Atlas, Addressables/CDN, Occlusion Culling, Mipmaps, Geräteprofile und schnellere Ladezeiten.

**MUSS: Low/Medium/High-Profile.** Neue 3D-Features brauchen feste Budgets für DPR, Texturgröße, Schatten/PostFX, Partikel, sichtbare Gegner, Chunk-Reichweite und VFX-Dichte.

**MUSS: Asset-Budget vor Import.** Neue Helden, Gegner, Maps und VFX brauchen vor Merge: Triangles, Materialanzahl, Texturgrößen, geschätzte GPU-MB, LOD, Lazy-Load und Entladepunkt.

**MUSS: Texturgröße zählt mehr als Dateigröße.** Kleine WebP/PNG-Dateien können im GPU-Speicher groß sein. Faustregel: `width * height * 4 * 1.33`. Für große 3D-Texturen KTX2/BasisU prüfen.

**MUSS: Atlanten für Massenbilder.** Portraits, Skill-Icons, Decals, Partikel und Slash-Masks nicht als 100+ Einzeltexturen laden. Atlas/Spritesheet/Texture-Array oder Registry nutzen.

**MUSS: Nicht alles am Start laden.** Nur aktuelle Route, Encounter, Klasse und sichtbare UI preladen. Bosse, Skins, Maps und spätere Skills nachladen; alte Assets sauber `dispose()`n.

**MUSS: Material-/Shader-Varianten klein halten.** Neue Effekte über gemeinsame Shaderfamilien, Uniforms, Instancing-Attribute und Renderer-Buckets bauen. Neue Material-Kombinationen brauchen einen Messgrund.

**MUSS: Erste-Ruckler prüfen.** Wenn erster Skill/Boss/Skin ruckelt: Shader-Kompilierung, Texture-Upload und GLTF-Decode prüfen. Kritische Materialien beim Ladebildschirm vorbereiten.

**MUSS: Eigenes Occlusion-/Relevanz-Culling planen.** Three.js macht kein Unity-Occlusion-Culling. Große Wände, Towns, Dungeons und Arenen brauchen Zellen, Portale, Chunks, Distanz- oder Screen-Space-Culling. Boss-Signale und Hitboxen bleiben sichtbar.

**MUSS: Ladezeit und Speicher mitmessen.** Neben FPS auch Downloadgröße, Texture-Memory, GLTF-/Animationsspeicher, First-Combat-Time und erster Skill-Ruckler prüfen.

**CHECK: 200-Helden-Problem früh lösen.** Systeme für Helden, Skins, Skills, Gegner, Portraits oder Maps müssen schon bei wenigen Einträgen caching-, batching- und lazy-load-fähig sein.

**Quellen:**
- SkillForge/Unity-Video-Zusammenfassung: https://www.gamesinprogress.com/indie-game-developers/unity/optimizing-SkillForge-200-heroes-million-polygon-worlds
- Unity Shader Variants: https://docs.unity.cn/6000.0/Documentation/Manual/shader-variants-landing.html
- Unity Mobile Optimierung: https://docs.unity.cn/530/Documentation/Manual/MobileOptimisation.html
- Unity Addressables + Sprite Atlases: https://docs.unity.cn/Packages/com.unity.addressables%401.21/manual/AddressablesAndSpriteAtlases.html
- Three.js Texture Memory: https://threejs.org/manual/en/textures.html
- Three.js Optimize Lots of Objects: https://threejs.org/manual/en/optimize-lots-of-objects.html

---

## 16. Offizielle Referenzen

- React Three Fiber Performance Pitfalls: https://r3f.docs.pmnd.rs/advanced/pitfalls
- Three.js Optimize Lots of Objects: https://threejs.org/manual/en/optimize-lots-of-objects.html
- Three.js LOD API: https://threejs.org/docs/api/en/objects/LOD.html
- Three.js InstancedMesh API: https://threejs.org/docs/api/en/objects/InstancedMesh
- Three.js DataArrayTexture API: https://threejs.org/docs/pages/DataArrayTexture.html
- Three.js How to Update Things: https://threejs.org/manual/en/how-to-update-things.html
- Three.js Material API: https://threejs.org/docs/pages/Material.html
- Three.js Renderer API / `renderer.info`: https://threejs.org/docs/pages/Renderer.html
- Three.js WebGPURenderer Manual: https://threejs.org/manual/en/webgpurenderer
- Three.js WebGPURenderer API: https://threejs.org/docs/pages/WebGPURenderer.html
- Three.js EffectComposer API: https://threejs.org/docs/examples/en/postprocessing/EffectComposer.html
- MDN WebGL Best Practices: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices


- **Renderer-Default ist WebGL:** Bei Bugs, VFX, Gameplay-Optik und Performance immer zuerst vom WebGL-Pfad ausgehen.
- **WebGPU nicht als Ursache annehmen:** WebGPU nur bearbeiten, wenn der User ausdrücklich WebGPU nennt, `renderer=webgpu` belegt ist oder ein Log eindeutig `backend=webgpu` zeigt.
- **Bei unklaren Render-Bugs zuerst Backend prüfen:** WebGL/WebGPU im HUD, Store oder Renderer-Log verifizieren, dann erst backend-spezifisch fixen.
