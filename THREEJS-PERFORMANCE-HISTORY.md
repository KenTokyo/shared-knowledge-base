# Three.js Performance-History und Projekt-Learnings

**Zweck:** Diese Datei sammelt alte Projektfälle, Vorfall-Merkhilfen und spezielle Learnings. Die schnelle Pflichtdatei bleibt `shared-docs/THREEJS-RULES.md`.

**Nutzung:** Diese Datei lesen, wenn ein Problem ähnlich wirkt oder wenn `THREEJS-RULES.md` im Scope-Lesepfad auf History verweist.

---

## 1. Effects- und Klassen-VFX-Regressionsfall

- **Symptom:** FPS-Einbruch bei VFX-/Klassenpfaden.
- **Ursache:** Lokale Klassen-VFX-Renderer wurden breit gemountet.
- **Learning:** Nicht die Klassenzahl war teuer, sondern aktive Runtime-Systeme im Hintergrund.
- **Guter Fix:** Nur aktive lokale Klasse mounten, Remote-VFX als Descriptor/Event spiegeln.
- **Regel:** Klassenvielfalt als Daten ist billig. Klassenvielfalt als aktive Runtime ist teuer.

---

## 2. VFX-Off, Lai-LMB und Skill-Semantik

- **Symptom:** Drops traten auch ohne sichtbare VFX auf.
- **Ursache:** Skillkosten bestanden nicht nur aus Partikeln, sondern auch aus Slash-Semantik, Hitstop, Runtime-Snapshot, Audio, Enemy-Model-Layer und Render-Buckets.
- **Lai-Slash-Regel:** Visuelle Darstellung darf deaktiviert oder versteckt werden. Gameplay-Signal bleibt erhalten, wenn Trefferlogik davon abhängt.
- **Report-Regel:** Sichtbare und versteckte Runtime-Objekte getrennt zählen, zum Beispiel `visibleSlashes` und `hiddenSlashes`.
- **Projekt-Learning:** Lai-LMB-Slashes bleiben bei Skill-VFX-Off als `hiddenVfx` aktiv, damit Trefferlogik nicht kaputtgeht.
- **Fix-Reihenfolge:** Erst Semantik erhalten, dann Visuals reduzieren, dann Runtime-Architektur verbessern.
- **Nicht tun:** Hitboxen entfernen, nur weil sie visuell wie VFX aussehen.

---

## 3. Regular Enemies, Boss-Slots und Remote-VFX

- **Regular Enemy Reihenfolge:** Sichtbare Gegnerliste korrekt begrenzen.
- **Regular Enemy Reihenfolge:** `InstancedMesh.count` auf echte sichtbare Runtime setzen.
- **Regular Enemy Reihenfolge:** Parts batchen statt pro Part ein Mesh.
- **Regular Enemy Reihenfolge:** Matrix/Farbe nur bei Dirty-Signatur hochladen.
- **Projekt-Learning:** Regular Enemy Parts von vielen separaten Part-Meshes auf kompakten Batch reduziert.
- **Messwert:** `15 Gegner Full` ging von `72` auf `49` Draw Calls.
- **Messwert:** Triangles gingen von `38.770` auf `37.690`.
- **Messwert:** `enemies.regularModelRender` sank bei `15 Gegner Full` von `0.227 ms` auf `0.017 ms`.
- **Messwert:** `enemies.regularModelRender` sank bei `15 Gegner VFX-Off` von `0.223 ms` auf `0.004 ms`.
- **Boss-Regel:** Modelle/Slots nicht an Array-Indizes koppeln, wenn Spawns/Deletes die Reihenfolge verschieben können.
- **Remote-VFX Default:** Ally-Skills bleiben in normalen Gruppenkämpfen sichtbar und lesbar.
- **Remote-VFX Reduktion:** Perzeptiv reduzieren, nicht alles aus.

---

## 3a. Shrine-Instancing und Dirty-Uploads

**Vorfall-Merkhilfe 2026-05-28:**
- **Symptom:** `No Shrines` brachte im echten Browser ca. 100 bis 150 FPS zurück; `No Runtime` und `No Text` erklärten den Drop kaum.
- **Ursache:** Shrine-Visuals waren zwar schon teilweise instanced, aber noch in mehrere Mesh-/Material-Familien und Letter-Materialien gesplittet. Außerdem wurden Matrix-, Farb- und Alpha-Daten breiter hochgeladen als nötig.
- **Fix:** Torii-Boxen in ein farbiges `InstancedMesh` gebündelt, A/B/C/D-Letter in einen Canvas-Atlas gelegt, Gate/Core/Fill/Letter-Daten mit Dirty-Signaturen geschützt. Ring-Rotation läuft weiter, weil sie sichtbares Shrine-Signal ist.
- **Messwert aus User-Gate:** Der Nachfix brachte ca. 150 FPS zurück.
- **Regel:** Nicht nur "InstancedMesh verwenden", sondern Renderer-Familie + Atlas/Texture-Array + Dirty-Signatur zusammen denken.
- **Nicht tun:** Mehrere fast gleiche Materialien, Mini-Texturen oder Mesh-Familien behalten und nur hoffen, dass Instancing allein reicht.
- **Task:** `docs/performance/tasks/2026-05-28-shrine-labels-performance-followup.md`

---

## 4. Voxel-Terrain, Map und Town

- **Terrain-Regel:** Dieses Projekt darf nicht zu Full-Box-Voxel als Default zurückfallen.
- **Terrain-Pflicht:** Top-Faces, Side-Skirts, Chunking, Culling, persistente Chunks und niedriges Terrain-Triangle-Budget nutzen.
- **Terrain-Bewertung:** Wenn Terrain wieder deutlich über Budget liegt, ist das ein Architekturproblem, kein "Grafik ist halt teuer"-Problem.
- **Town-/Map-Bewertung:** Town-Props und Map-Layer sind ein eigener Performance-Hotpath.
- **Map-Off-Fall Symptom:** Nach echtem Town-/Map-Ausblenden stieg die Szene auf mehrere hundert FPS, teils über `600 FPS`.
- **Map-Off-Fall Ursache:** Map-/Town-Layer waren nicht vollständig als Kostenblock erkannt oder nicht vollständig aus der Runtime genommen.
- **Map-Off-Fall Lektion:** Map-Ablation ist Pflicht bei 3D-Lag. Wenn die Map raus ist und Calls/Triangles fast leer sind, sind hohe FPS normal.
- **Uncapped-FPS-Hinweis:** Schwankende uncapped FPS immer über Framezeiten, Low und P95 bewerten.

---

## 5. Cursor/Input und R3F-Pointermove

- **Cursor/Input-Fall Symptom:** Starker FPS-Drop nur beim Bewegen der Maus, selbst ohne sichtbare Zusatzlast.
- **Cursor/Input-Fall Ursache:** Zu viel Arbeit im `mousemove`-Event bei hoher Polling-Rate.
- **Cursor/Input-Fall Fix:** Im Mouse-Hotpath früh aussteigen, Store nur bei aktivem Drag abfragen und Event-Positionen in-place aktualisieren.
- **Learning 2:** Bei Gaming-Mäusen können `mousemove`-Events viel schneller kommen als Frames. Mauspositionen für Gameplay-Aim nur einmal pro `requestAnimationFrame` in Runtime-State schreiben; Drag/Klick darf sofort reagieren.
- **Learning 3:** Wenn der Drop trotz Drossel bleibt, liegt die teure Arbeit oft im Frame-Pfad danach: Cursor-Ray, Terrain-Sample, Enemy-Hover-Scan und Player-Aim-Rotation.
- **R3F-Pointermove-Fall Symptom:** Fast leere Szene, niedrige Calls/Triangles, aber FPS-Abfall nur beim Mausbewegen.
- **R3F-Pointermove-Fall Ursache:** R3F-Hover-/Pointer-Events können pro `pointermove` Raycasts über interaktive 3D-Objekte auslösen.
- **R3F-Pointermove-Fall Fix:** Im Zustand `playing` blockt der Canvas-Eventmanager Pointermove-Raycasts; Pointer-Koordinaten bleiben aktuell, Klicks/Zoom laufen weiter über den Default-Pfad.

---

## 6. FPS-HUD und RendererStatsBridge

- **Symptom:** Kurzfenster-FPS sprang in leeren Szenen stark zwischen ca. `300`, `500` und mehr.
- **Fix:** Neben dem kurzen Schnitt braucht das HUD einen ruhigen `10s`-Schnitt.
- **Learning:** Das HUD darf keine eigene `requestAnimationFrame`-FPS-Wahrheit neben der RendererStatsBridge pflegen.
- **Regel:** FPS Now/Avg/Low/High/10s sollen aus `frameMsAvg`, `frameMsP95` und `frameMsWorst` derselben Renderer-Messquelle kommen.
- **Interpretation:** Kurze Werte zeigen Sofortreaktion, `10s` zeigt den Trend.

---

## 7. WebGPU und PostFX

- **Symptom:** WebGPU war in einzelnen Profilen langsamer oder instabil.
- **Ursache:** WebGL-orientierte PostFX-/Quality-Pfade und Messstreuung.
- **Learning:** WebGPU nur mit Backend-Validierung, dokumentierter Canvas-/Paritätsprüfung und identischen A/B-Paarläufen bewerten.
- **PostFX-Learning:** WebGPU wurde durch gezielte Shadow/Glow- und DPR-Anpassung stabiler, nicht durch pauschales Bloom/Vignette-Off.
- **Blocker:** Leerer Canvas oder `calls=0` ist ein Messfehler.
- **Paritätsregel:** WebGPU/PostFX-Fix ist erst fachlich vollständig, wenn Optik, Gameplay und Messwerte zusammen passen.

---

## 8. Fight-Runtime

- **Symptom:** `Kreis + Skill-Spam` zeigte starke Drops, während reine Grafik-Schalter wenig erklärten.
- **Ursache:** Skill, Trefferkontakt, Damage-Zahlen, Hitstop, HitFX, Enemy-Reaction, Audio und Snapshot/HUD-Sync lagen zu nah im gleichen Frame.
- **Fix:** Feedback über zentrale Budgets/Descriptoren lenken.
- **Regel:** Damage, Hitbox und CombatMeter bleiben echt; nur sichtbare oder fühlbare Nebenarbeit wird gruppiert, gedrosselt oder priorisiert.
- **Learning:** `No P Skills` und `No GameFX` sind Diagnose-Hebel, keine Produktlösung.
- **Manual-Gate:** Nach Fight-Fixes Default-Samurai mit gleicher Gegnerzahl, gleicher Kamera und gleicher Skillfolge manuell messen.

---

## 9. Option-E und Erstkosten

- **Learning:** Skill-Cast-Prewarm hilft nur bei Erstkosten wie Shader-Compile, Audio-Decode oder Pool-Aufbau.
- **Nicht wiederholen:** Wenn FPS dauerhaft niedrig bleiben und `FPS Avg`/`frameMs` nach dem ersten Cast nicht besser werden, nicht nochmal Option E wiederholen.
- **Dann prüfen:** Shadow, DPR, Town/Props, Map, Enemy-Ablation und Fight-Runtime-Segmente.

---

## 10. Slash-Type-ID-Kollision

**Vorfall-Merkhilfe 2026-05-19:**
- Tank-Slash-IDs `50-52` lagen im Mage-Bereich (`29-56`) und wurden dadurch im Slash-Renderer als Mage klassifiziert/gefiltert.
- Sichtbares Symptom: Slashes wurden gespawnt, aber in Klassen-Layern teilweise unsichtbar oder falsch einsortiert.
- **Fix-Regel:** Klassenbereiche strikt trennen, neue IDs nur über `*_SLASH_TYPES`, danach Kollisions-Scan + `pnpm lint` + `pnpm exec tsc --noEmit`.

**VFX Slash-Type Namespace Guard:**
- Keine numerischen Slash-IDs hart coden. Immer nur über `*_SLASH_TYPES` Konstanten arbeiten.
- Vor neuen Slash-Typen aktive Bereiche in Archer, Tank, Mage, Chanter, Lai, Sturmfaust und `src/lib/vfx/vfxSchema.ts` gegenprüfen.
- Range-Kollisionen sind kritisch. Besonders Mage nutzt einen Bereichsfilter (`29-56`).
- Nach jeder ID-Migration Kollisions-Scan auf `_SLASH_TYPES`, `pnpm lint` und `pnpm exec tsc --noEmit` ausführen.

---

## 11. Kritische Dateien und interne Referenzen

**Performance-kritische Komponenten:**
- `src/components/3d/Effects.tsx`
- `src/components/3d/enemies/InstancedRegularEnemies.tsx`
- `src/lib/vfx/runtime/vfxEventRuntime.ts`
- `src/lib/performance/runtimePerformanceSnapshot.ts`
- `src/components/3d/hooks/useEnemiesLogic.ts`
- `src/components/player/hooks/usePlayerLogic.ts`

**Projektinterne Dokus:**
- `docs/performance/tasks/2026-05-18-vfx-aaa-runtime-architecture-masterplan.md`
- `docs/performance/tasks/2026-05-19-performance-hud-overhaul-und-fps-diagnose-masterplan.md`
- `docs/performance/tasks/2026-05-20-mmorpg-fight-runtime-significance-masterplan.md`
- `docs/performance/recordings/README.md`
