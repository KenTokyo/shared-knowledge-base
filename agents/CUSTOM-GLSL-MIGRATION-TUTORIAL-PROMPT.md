# Custom-GLSL-Migration-Tutorial und kompakter Allround-Prompt

**Zweck:** Ein bestehendes Three.js-Projekt auf handgeschriebene, prozedurale GLSL-VFX umbauen, ohne daneben einen zweiten Renderer oder eine isolierte Shader-Demo zu erzeugen.

## Warum der bisherige Allround-Prompt oft nicht reicht

„Nutze Custom GLSL und erzeuge Partikel“ beschreibt den gewünschten Look, aber nicht den Umbau. Eine belastbare Migration muss sieben Ebenen verbinden:

1. echter Gameplay-/UI-Trigger,
2. gemeinsame Ereignis- und Lebenszeit,
3. finale Weltposition, Richtung und Bahn,
4. Laufzeitgeometrie und Attribute,
5. Shader, Uniforms und Materialrollen,
6. vorhandener Renderer, Composer und Farbraum,
7. Reset, Pooling, Disposal und Entfernung des alten Pfads.

Fehlt eine Ebene, kompiliert der Shader eventuell, wird aber nicht sichtbar, hängt einen Frame zurück, sitzt am Ursprung, verschwindet durch Depth/Culling oder läuft nur in einer separaten Demo.

## Was behalten, ergänzen, ersetzen und löschen?

| Aktion | Typische Teile |
|---|---|
| **Behalten** | vorhandenes Canvas, Renderer, Kamera, Renderloop, Composer, Gameplay-Timing, Animation, Kollision, GLTF-Charaktere, PBR-Welt und zugängliche DOM-UI |
| **Ergänzen** | ein kleines VFX-Eventformat, finale Weltanker, Shader-Module, laufzeitgenerierte `BufferGeometry`, feste Pools, Warm-up, Reset und Disposal |
| **Ersetzen** | nur die sichtbaren Legacy-VFX-Quellen und direkt gekoppelte, strukturell falsche Hilfspfade |
| **Löschen** | alte Effekt-Texturen, Sprite-/Flipbookpfade, VFX-Meshes, Loader, Preloads, Flags, Registrierungen und Fallbacks – aber erst, wenn der Ersatz im echten Pfad aktiv ist und keine Referenz mehr besteht |

Nicht pauschal alle `MeshStandardMaterial`-Materialien durch `ShaderMaterial` ersetzen. Figuren, Waffen und Welt verlieren sonst leicht Skinning, Morph Targets, Schatten, IBL, Fog und PBR. Für reine Effektmeshes eignet sich `ShaderMaterial`; für bestehende beleuchtete Oberflächen ist ein gezielter Material-Patch oft sicherer.

## Wo Custom GLSL sinnvoll ist

- **Schwertkämpfer:** Klingenaura, Trail aus finaler Klingenwurzel und -spitze, Luftschnitt, Kontaktkern, Funken, Blut-/Energiespray, Bodenschnitt und Nachglühen.
- **Boxer oder Martial Arts:** Hand-/Fußbahn, Druckkegel, Elementhülle, Kontaktring, Staub, Bruchstücke und Bodenreaktion.
- **Zauber und Fernkampf:** Telegraph, Projektilkörper, Flugbahn, Einschlag, AoE-Grenze und Nachwirkung aus derselben räumlichen Wahrheit.
- **Umwelt:** Windfelder, Nebel, Wasser, Portale, Kraftfelder, Feuer, Wetter und lokale Bodenreaktionen.
- **Materialeffekte:** Dissolve, Trefferwelle, Scan, Vergiftung oder Frost; PBR-Basis möglichst erhalten und gezielt patchen.
- **PostFX:** Hit-Flash, Distortion, Bloom-Maske oder Farbimpuls als Pass im vorhandenen Composer.
- **UI:** GLSL wirkt nicht direkt auf normale HTML-/CSS-Elemente. Shader-UI gehört als Plane/SDF-Element in eine WebGL-Overlay-Szene oder in dasselbe Canvas; Buttons, Text und Barrierefreiheit dürfen im DOM bleiben. Keinen zweiten unkoordinierten Renderloop hinzufügen.

### Beispiel Schwertkämpfer

Erst die fertige Animation auswerten und Weltmatrizen aktualisieren. Danach Klingenwurzel, Klingenspitze und Trefferpunkt sampeln. Dieselben Samples treiben Trail-Geometrie, Emission, Licht, Audio und Kontakt. Ein Effekt an `player.position` statt an der finalen Klinge ist der häufigste Grund für driftende oder verspätete VFX.

## Kritische Systemvarianten und Edge Cases

- **Imperatives Three.js:** In vorhandenen `requestAnimationFrame`-Owner integrieren; keinen zweiten RAF starten.
- **React Three Fiber:** `useFrame`, vorhandenes `<Canvas>` und R3F-Lifecycle benutzen; keinen parallelen `WebGLRenderer` erzeugen.
- **GLTF/SkinnedMesh:** Für VFX eigene Meshes verwenden oder das bestehende PBR-Material gezielt patchen. Bei vollständigem Custom-Material müssen Skinning, Morphs, Instancing, Fog, Clipping und Schatten bewusst unterstützt werden.
- **Bestehende Custom Shader:** Gesunde Shader behalten und an gemeinsames Event-, Raum-, Reset- und Poolingformat anbinden; nicht nur wegen anderer Dateinamen neu schreiben.
- **EffectComposer/Postprocessing:** Genau einen Finalbildpfad behalten. Distortion benötigt kontrollierte Color-/Depth-Targets; niemals versehentlich Renderer und Composer beide pro Frame final ausgeben lassen.
- **WebGL 1/2:** Three.js-Version und GLSL-Modus prüfen. `varying/attribute`, `in/out`, `texture2D/texture`, Fragment-Outputs und Extensions nicht mischen.
- **`ShaderMaterial` vs. `RawShaderMaterial`:** `ShaderMaterial` injiziert Built-ins; keine gleichnamigen Attribute/Uniforms doppelt deklarieren. `RawShaderMaterial` benötigt Matrizen, Präzision und Outputs vollständig selbst.
- **Transparenz:** Pro Layer `transparent`, Blending, `depthTest`, `depthWrite`, Side und Renderreihenfolge festlegen. Additiv ist nicht automatisch richtig; Volumen können getrennte Vorder-/Rückseiten benötigen.
- **Culling/Instancing:** Nach prozeduraler Verformung oder Instanzbewegung korrekte Bounding Sphere/Box setzen. Ein korrekter Shader kann vollständig weggecullt werden.
- **Farbraum/Tonemapping:** Farben in der erwarteten Arbeitsfarbwelt ausgeben und bei screennahen Shadern die zur installierten Three.js-Version passenden Tone-Mapping-/Color-Space-Schritte verwenden. Kein doppeltes Encoding.
- **Uniform-Lifecycle:** Uniformobjekte stabil halten, Werte mutieren, Größenänderung/DPR/Targets aktualisieren und jeden wiederverwendeten Slot vollständig scrubben.
- **Bodenzerstörung:** Lokale Reaktion aus Trefferdaten erzeugen; ursprünglichen Boden nicht irreversibel verändern. Reset muss Krater, Risse, Chunks und Reaktions-Targets zurücksetzen.
- **WebGPU-Projekt:** Nicht blind WebGL-`ShaderMaterial` einbauen. Bestehenden Renderer respektieren und dieselbe Architektur mit dessen nativer Shaderquelle, etwa WGSL/TSL, umsetzen oder eine ausdrücklich erlaubte Rendererentscheidung dokumentieren.

## Minimaler Rendering-Gate

Wenn ein Effekt nicht erscheint, in dieser Reihenfolge prüfen:

1. Erreicht der echte Trigger den Effekt und ist die Instanz aktiv?
2. Ist Mesh/Points im echten Szenengraph und läuft der vorhandene Final-Renderpfad?
3. Kompilieren Vertex- und Fragmentshader in der **realen** Renderer-/Target-/Lichtvariante?
4. Stimmen Attribute, Item Sizes, Counts, Index, Draw Range und Instanzzahl?
5. Sind Uniforms gesetzt, finite und in den erwarteten Einheiten?
6. Wurde nach der Animation `updateMatrixWorld` ausgeführt und stimmt World/Local/View/Clip Space?
7. Liegt Geometrie im Kamerafrustum; sind Bounds und Side korrekt?
8. Bleibt Alpha über null; verdecken Depth, Blending, Render Order oder PostFX das Ergebnis?
9. Stimmen Three.js-Version, GLSL-Version, Output-Farbraum und Tone Mapping?
10. Werden gepoolte Instanzen beim Acquire wirklich sichtbar gesetzt und beim Reset vollständig neutralisiert?

---

# Copy-ready: Custom-GLSL-Allround-Migrationsprompt

Ersetze nur die eckigen Platzhalter und gib den gesamten Block an die umsetzende KI.

```text
Migriere [PROJEKT/PFAD] in seinem echten Produktionspfad auf ein projekt-eigenes, handgeschriebenes Custom-GLSL-VFX-System. Der konkrete Umfang ist [VFX-FAMILIEN/FEATURES]. Erhalte exakt [GAMEPLAY, TIMING, KOLLISION, ANIMATION, KAMERA UND UI, DIE GLEICH BLEIBEN MÜSSEN]. Laufzeit- oder Sichtprüfung ist für diese Aufgabe: [ERLAUBT MIT GENAUER METHODE / NICHT ERLAUBT].

Arbeite das bestehende System um; baue keine separate Shader-Demo, kein zweites Canvas, keinen zweiten Renderer, keinen zweiten Frame-Loop und keinen parallelen Composer.

Beginne mit einer kurzen Bestandsaufnahme des realen Pfads:
- installierte Three.js-Version und WebGL-/WebGPU-Renderer,
- imperatives Three.js oder React Three Fiber,
- Canvas-, Renderer-, Kamera-, Frame- und Composer-Owner,
- echte Trigger, Animationsphasen und Gameplay-Raumdaten,
- aktuelle Effektfamilien, Materialien, Geometrien, Texturen, Loader und Preloads,
- PostFX, Farbraum, Tone Mapping, Depth-/Color-Targets,
- Pools, Reset, Resize, Warm-up und Disposal.

Ordne jede betroffene Effektfamilie einer Entscheidung zu: gesund behalten und anbinden, reparieren, vollständig ersetzen oder löschen. Danach sofort familienweise im echten Pfad umsetzen; nicht nach Inventar oder Pilot stoppen.

Für jede sichtbare VFX-Form gelten:
- handgeschriebene, projekt-eigene Vertex- und Fragmentshader,
- zur Laufzeit erzeugte BufferGeometry, InstancedBufferGeometry oder feste Partikelbuffer,
- analytische Masken/SDFs, mathematisches Hash-/FBM-Noise, Turbulenz und Lebenskurven direkt im Shader,
- keine Bitmap-/Noise-/LUT-/Decal-Texturen als Effektquelle, keine Sprite-Sheets, Flipbooks, Videos, gebackenen VFX-Meshes, importierten Effektpakete oder kopierten Fremdshader.

Charakter-, Waffen-, Welt- und UI-Assets bleiben in ihrer normalen Rolle erlaubt. Ersetze PBR-Materialien nicht blind. Nutze ShaderMaterial/RawShaderMaterial für reine Effektmeshes; patche bestehende MeshStandard-/MeshPhysical-Materialien nur gezielt, wenn Skinning, Morphs, Instancing, Licht, IBL, Fog, Clipping oder Schatten erhalten bleiben müssen.

Führe einen kleinen gemeinsamen Cast-/Eventvertrag ein oder adaptiere den gesunden vorhandenen Vertrag. Eine stabile Event-ID, Phase, Zeit, Seed, Intensität, finale Weltposition, Richtung, Bahn/Footprint, Kontaktpunkt und Lebenszeit treiben Animation, Geometrie, Shader, Licht, Audio, Kamera und Bodenreaktion. Werte zuerst Gameplay und finale Pose aus, aktualisiere Weltmatrizen und sample danach Hand, Fuß, Waffe oder Projektil. Leite keine zweite Bahn aus Player-Position, Frame-Delta oder Lookalike-Konstanten ab.

Baue jede Familie als lesbare Kausalkette:
Antizipation → Release → Bahn/Fläche → Kontakt → Reaktion → Nachwirkung/Recovery.
Gib jedem Beat eine dominante geometrische Form. Kern, Rand, Partikel, Distortion, Licht, Debris und Nachwirkung unterstützen diese Form, statt sie mit Bloom oder Partikelmasse zu ersetzen. Telegraph-/AoE-Geometrie muss ab dem ersten gefährlichen Frame dieselbe Quelle wie Gameplay-Radius und Kollision verwenden.

Passe die Implementierung an das vorhandene System an:
- In imperativem Three.js in den bestehenden RAF integrieren.
- In React Three Fiber vorhandenes Canvas, useFrame und Lifecycle verwenden.
- Im vorhandenen Composer genau einen Finalbildpfad behalten.
- GLSL-Syntax, Built-ins, Shader-Chunks und Output-Konvertierung an die installierte Three.js- und WebGL-Version anpassen.
- Bei WebGPU die native WGSL/TSL-Entsprechung verwenden, statt inkompatibles ShaderMaterial zu erzwingen, und die Abweichung benennen.
- HTML/CSS-UI nicht durch GLSL ersetzen. Shader-UI nur als bewusst integrierte WebGL-Overlay-Szene oder SDF-/Plane-Layer im vorhandenen Renderer ergänzen.

Definiere pro Material explizit Blending, transparent, depthTest, depthWrite, Side, Render Order, Fog/Tone-Mapping-Rolle und Bounds. Prüfe Attribute, Item Sizes, Draw Ranges, Instanzzahlen, finite Uniforms, World/Local/View Spaces, Frustum-Culling, Resize/DPR und Render-Target-Größen. Kompiliere/wärme erforderliche Shadervarianten gegen die reale Renderer-, Target-, Licht- und PostFX-Konfiguration; ein TypeScript-Build allein beweist keine Shader-Kompilation.

Nutze feste, vorallokierte Pools und stabile Uniformobjekte. Erzeuge im Framepfad keine neuen Meshes, Geometrien, Materialien, Shader, Lichter oder wachsenden Arrays. Definiere Kapazität und Overflow als Drop/Reuse/Degradation ohne Allokation. Beim Acquire, Release, Replay und Reset alle Zeiten, Owner, Seeds, Alpha, Pfade, Cursor, Transforms, Draw Ranges, Instanzzahlen, Lichter und Sekundärobjekte vollständig zurücksetzen. Dispose entfernte GPU-Ressourcen und Listener genau einmal.

Migriere pro Familie in dieser Reihenfolge:
1. echten Trigger, Phasen und finale Raumquelle sichern,
2. prozedurale Geometrie und Shader im vorhandenen Renderer integrieren,
3. Material-/Depth-/Blend-/Post-Rollen korrekt verbinden,
4. Pool, Reset, Overflow, Bounds, Warm-up und Disposal fertigstellen,
5. echten Produktionspfad auf den Ersatz routen,
6. alte VFX-Assets, Loader, Preloads, Registrierungen, Flags, Controls, Fallbacks und toten Code erst nach Nullreferenz entfernen,
7. statische Projektchecks und erlaubte Shader-/Laufzeitprüfungen ausführen.

Wenn etwas unsichtbar oder schwarz rendert, behebe zuerst Ursache statt Intensität: Trigger/Scene-Registrierung → Shader-Compilelog → Attribute/Draw Range → Uniforms/NaN → Transformraum/Weltmatrizen → Frustum/Bounds/Side → Alpha/Depth/Blending/Render Order → Composer/Targets → Farbraum/Tone Mapping. Lasse keinen stillen Legacy-Fallback stehen.

Für einen Schwertkämpfer müssen mindestens Klingenaura, Trail und Kontakt aus den finalen Weltpositionen von Klingenwurzel, Klingenspitze und Trefferpunkt entstehen. Für Faust/Fuß, Projektil, AoE, Umwelt oder UI wähle entsprechend die reale Hand-/Fußbahn, Projektilbahn, Gameplay-Fläche, Weltzone oder Overlay-Koordinaten als gemeinsame Quelle.

Fertig ist die Migration erst, wenn jede benannte Familie über den echten Trigger rendert, nur einen Runtime-/Renderowner besitzt, im richtigen Raum und Beat erscheint, sauber wiederholbar/resetbar ist, feste Budgets hat, keine verbotene sichtbare Quelle oder dauerhafte Dual-Path-Lösung mehr besitzt und die erlaubten Checks bestanden sind. Behaupte keine visuelle Qualität oder Performance ohne entsprechende Prüfung. Arbeite selbstständig bis zu diesem Zustand oder dokumentiere einen objektiven externen Blocker mit exakt fehlendem Input.
```

## Die wichtigsten Platzhalter

- `[PROJEKT/PFAD]`: konkreter Projektordner.
- `[VFX-FAMILIEN/FEATURES]`: zum Beispiel alle Skills, nur Schwert-Trails oder Skills plus UI-HUD.
- `[... GLEICH BLEIBEN MÜSSEN]`: besonders Timing, Hitboxen, Animationen und Bedienung benennen.
- `[LAUFZEIT-/SICHTPRÜFUNG]`: explizit festlegen; ohne Erlaubnis darf die KI nur statische Evidenz behaupten.
