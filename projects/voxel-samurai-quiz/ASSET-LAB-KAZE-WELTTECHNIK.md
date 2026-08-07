# Asset Lab V3/V36 und Kaze no Shima — reine Welttechnik

**Lesen wenn:** Asset-Lab-Landschaften mit Kaze no Shima vergleichen; Terrain, Architektur, Vegetation, Wasser, Licht oder Performance planen.
**Status:** technischer Vergleich auf Basis von Quellcode und Doku; keine Sichtbewertung.
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen und unnötige Artikel streichen; Fehlerbild, Ursache, Handlung und Beleg erhalten.

## 1. Geltungsbereich

- Verglichen: Asset Lab V3, reiner V36-Welt-/Burgunterbau, Kaze no Shima.
- Ausgeschlossen: Figuren, Kampf, Ereignisablauf, Choreografie, Treffer, VFX und sonstige Simulationslogik.
- V3-Beleg: `claude-opus-5-max/v3` mit Marktplatz, Bergrücken und Waldburg.
- V36-Beleg: Tier-Vertrag plus vorhandene Weltunterbauten von GLM 5.2 und DeepSeek V4 Flash v2.
- Kaze-Beleg: retired standalone world-prototype port and read-only reference `Claude-of-tsushima`.
- Claude Opus 5 besitzt V3-Beiträge, aber keinen V36-Beitrag.
- Aussagen zu V36 beschreiben deshalb kein Opus-5-Ergebnis.

## 2. Ergebnis zuerst

- Asset Lab V3 und V36 basieren auf einem kompakten Szenenvertrag: `build(seed)` liefert Instanzfamilien und einzelne Oberflächen an einen gemeinsamen Three.js-Renderer.
- Kaze basiert auf einer eigenen Weltengine: authored World-Spec → Bake → gemeinsame Weltfelder → spezialisierte Terrain-, Vegetations-, Wasser- und Umweltsysteme.
- Asset-Lab-Welten sind in sich geschlossene, vollständig geladene Vorschauwelten.
- Kaze ist eine große, begehbare Produktionswelt mit gemeinsamer Bodenwahrheit für Rendering und Gameplay.
- V3 standardisiert Weltgröße und sichtbare Inhalte, aber keine fortgeschrittene Welttechnologie.
- V36 standardisiert Burgmaßstab und Landschaftslesbarkeit, aber ebenfalls keine einheitliche Terrain-, Biom- oder Streaming-Architektur.
- Zwei V36-Beiträge können deshalb ähnlich aussehen und technisch deutlich verschieden gebaut sein.
- Kaze besitzt eine feste technische Architektur; Weltinhalte wechseln innerhalb dieses Systems.

## 3. Die drei Bauwege

### Asset Lab V3

```text
KI schreibt TypeScript
→ build(seed)
→ CPU-Höhenfunktion
→ ein kompaktes Terrain-Mesh
→ Vertexfarben
→ instanzierte Primitive
→ einzelne Wasseroberflächen
→ AssetLabStage rendert die gesamte Welt
```

### Asset Lab V36 ohne Figuren und Simulation

```text
KI schreibt TypeScript und optional GLSL
→ build(seed)
→ statische Berg-/Burggeometrie
→ optional ein lokales Heightfield
→ instanzierte Architektur und Vegetation
→ einzelne Terrain-, Wasser-, Wolken- und Nebeloberflächen
→ AssetLabStage rendert die gesamte Kulisse
```

### Kaze no Shima

```text
authored World-Spec
→ Distanzfelder
→ analytische Landform
→ Erosion
→ Fluss, Straßen, Teiche und Baupads
→ Height-, Normal-, Splat- und Biomfelder
→ Bake-Cache und GPU-Texturen
→ CDLOD-Terrain, Vegetation, Bauten und Wasser
→ gemeinsame Umwelt, Kamera und Gameplay-Abfragen
```

## 4. Technische Basis

| Bereich | Asset Lab V3/V36 | Kaze no Shima |
|---|---|---|
| Laufzeitbasis | React Three Fiber + Three.js im Asset-Lab-Host | eigene imperative Three.js-Weltengine unter `src/engine/` |
| Beitragsschnittstelle | `AssetLabBuildResult` | `WorldSpec`, `Heightfield` und spezialisierte Engine-Systeme |
| Weltbau | ein synchroner `build(seed)` | vorgelagerter Bake plus gecachter Laufzeitaufbau |
| Renderobjekte | `families` und `surfaces` | Terrain, GrassField, TreeField, Structures, Water, Environment, Sky, PostFX |
| Besitz | Host erzeugt und entsorgt Oberflächenressourcen | Weltengine besitzt Felder, Texturen, Chunks und Renderer |
| Raumstrategie | gesamte kompakte Welt gleichzeitig vorhanden | räumliche Auswahl über Chunks, LOD und Culling |
| Gameplayvertrag | bei V3/V36 normalerweise nicht vorhanden | `heightAt`, `normalAt`, `slopeAt`, `waterAt`, Blocker und Kameraabfragen |

## 5. Asset-Lab-Renderer erklärt

### Instanzfamilien

- `families` verwenden nur vier gemeinsame Grundgeometrien: `trunk`, `blob`, `box`, `spike`.
- `trunk` ist eine vereinfachte Stammform.
- `blob` ist eine vereinfachte organische Masse.
- `box` trägt Mauern, Häuser, Wege, Props und viele Architekturteile.
- `spike` ist ein fünfeckiger Kegel für Dächer, Nadelkronen oder Kristalle.
- Jede Familie teilt Geometrie und Material; Matrizen bestimmen Position, Drehung und Größe jeder Instanz.
- Eine Familie entspricht normalerweise einem Draw Call im Hauptpass.
- Neue Grundformen benötigen eine `surface`; eine Familie kann keine beliebige eigene Geometrie liefern.

### Oberflächen

- `surfaces` liefern eigene `BufferGeometry`.
- `surfaces` verwenden entweder Three.js-Standardmaterial oder eigenes `ShaderMaterial`.
- Typische Oberflächen: Terrainraster, Flussband, Teich, Wasserfall, Wolkendecke oder Himmelkuppel.
- Jede Oberfläche ist normalerweise ein eigenes Mesh und ein eigener Draw Call.
- Der Host aktualisiert `uTime`, wenn ein Shader dieses Uniform besitzt.
- Der Host kann bekannte Umweltwerte wie Wind, Nebel, Niederschlag und Sonnenwinkel an passende Shader weitergeben.
- Ältere V3/V36-Beiträge nutzen diese Umweltbrücke meist nicht vollständig.

## 6. Terrain

### Claude Opus 5 Max V3

- Marktplatzgröße: `166` Einheiten mit `132` Terrainsegmenten.
- Bergrückengröße: `168` Einheiten mit `136` Terrainsegmenten.
- Waldburggröße: `168` Einheiten mit `138` Terrainsegmenten.
- Jede Welt besitzt ein einziges vollständiges Terrainraster.
- CPU-Funktion berechnet Höhe für jeden Rasterpunkt.
- Marktplatz kombiniert Terrassen, Plaza, Kanal, Pool, Außenfelder und Klippenrand.
- Bergrücken kombiniert Schneeterrassen, Massiv, Schlucht, Pool, Bach, Lagerpad und Weltrand.
- Waldburg kombiniert Terrassenhügel, Wassergraben, Spiralstraße, Bach und Plunge-Becken.
- FBM- und Ridge-Noise ergänzen kleine und mittlere Unebenheiten.
- Authored Masken bestimmen wichtige Formen; Noise bestimmt nicht allein das Layout.
- Keine hydraulische Erosion.
- Kein Terrain-Quadtree.
- Kein Terrain-LOD.
- Kein Terrain-Streaming.
- Ganze Terrainoberfläche bleibt gezeichnet, weil fast die ganze Kleinwelt im Bild liegt.

### V36-Weltunterbau

- V36 schreibt keine einheitliche Terrainauflösung vor.
- GLM-Beispiel: ein `760` Einheiten breites Raster mit `96` Segmenten.
- DeepSeek-v2-Beispiel: `112 × 112` Rasterpunkte über ungefähr `376 × 376` Einheiten.
- GLM berechnet zentrale Burgplatte, sanfte Anmarschseite und abgestufte Klippen direkt aus Radius und Winkel.
- DeepSeek berechnet Burgplateau, Terrassen, Schlucht, Straße und Randabfall aus einer gemeinsamen `terrainHeight(x,z)`-Funktion.
- Manche V36-Beiträge besitzen ein echtes Heightfield-Mesh.
- Andere V36-Beiträge bauen Berge überwiegend aus instanzierten Felsen, Platten oder vereinfachten Massen.
- Keine V36-Pflicht für Erosion, Splatmaps, Biomfelder, Chunks, LOD oder Gameplay-Boden.
- V36-Welttechnik ist deshalb Beitragstechnik, keine gemeinsame Engine-Technik.

### Kaze no Shima

- Weltfläche: `1.600 × 1.600 m`.
- finales Heightfield: `2.048²`.
- Basis- und Erosionsfeld: `1.024²`.
- Material-Splat: `1.024²`.
- Biomfeld: `512²`.
- Spline-Distanzfelder: `512²`.
- authored Inselumriss, drei Ridge-Splines, sieben Peaks, Fluss, Straßen, Pads, Teiche und Landmarken bestimmen Makroform.
- 190.000 Erosionstropfen verfeinern Entwässerung und Hangstruktur im Bake.
- Flussprofil wird nach Erosion aus fertigem Boden abgeleitet.
- Straßen und Baupads verändern Terrainhöhe konstruktiv.
- Teichhöhe wird aus geprüftem Ufer gelöst.
- CPU und GPU verwenden dieselbe bilineare Höhenabtastung.
- Terrain rendert über ein crackfreies CDLOD-Quadtree.
- Neun LOD-Stufen decken Welt und Fernraum ab.
- Typisch bleiben ungefähr `120–200` Terrainpatches sichtbar.
- Terrainpatches teilen Geometrie und werden instanziert.

## 7. Bodenmaterialien

### V3

- Terrainfarbe wird beim Geometriebau pro Vertex berechnet.
- Farbe hängt von Höhe, Steigung, Noise und lokalen Masken ab.
- Three.js `MeshStandardMaterial` beleuchtet diese Vertexfarben.
- Keine Bodentextur-Arrays.
- Keine getrennten Normalmaps pro Bodenart.
- Keine dauerhafte Splatmap.
- Materialentscheidung ist in die erzeugte Geometriefarbe eingebrannt.

### V36

- Terrainmaterial hängt vollständig vom jeweiligen Beitrag ab.
- GLM mischt Fels, Moos und Schnee im Fragment-Shader anhand Höhe und Normalenrichtung.
- DeepSeek-v2 schreibt Fels, Gras, Straße, Hof und Flussfarbe als Vertexattribute und beleuchtet sie im Shader.
- Materialrollen bleiben meist wenige mathematische Farbbänder.
- Keine tierweit verpflichtende PBR-, Textur-, Splat- oder Biomlösung.

### Kaze

- Heightfield hält Bodenform getrennt von Oberflächenbedeutung.
- Normalfeld liefert Richtung; Alphakanal liefert günstiges Terrain-AO.
- Splatmap trennt Fels, Sand, Pfad/Baufläche und Nässe.
- Biomfeld trennt Gras-, Blumen- und Baumdichte sowie diskrete Biom-ID.
- Fünf Albedo- und fünf Normallayer liegen in Texturarrays.
- Terrainshader mischt Materialien zur Laufzeit aus gemeinsamen Feldern.
- Geometrie, Material, Vegetation, Wasser und Gameplay lesen dieselbe Weltgrundlage.

## 8. Architektur und Landmarken

### V3/V36

- Architektur besteht überwiegend aus instanzierten Boxen, Kegeln, Stämmen und Blobs.
- Materialgruppen bündeln gleiche Formen und Farben.
- V3 baut jede Motivwelt mit lokalen Helfern aus Rohformen.
- V36 baut Burgmauern, Türme, Dächer, Brücken und Klippen ebenfalls beitragslokal.
- Ganze Burg bleibt normalerweise ein kompakter Satz instanzierter Familien.
- Keine automatische Site-Struktur für räumliches Culling.
- Kein allgemeines Footprint-, Plinthen- oder Gebäudeclearing-System.
- Gute Beiträge lösen Bodenkontakt selbst über gemeinsame Höhenfunktion und lokale Prüfungen.

### Kaze

- Einzigartige Architektur wird pro Standort und Material gemerged.
- Dorf, Schrein, Ruinen und Camps bleiben getrennte cullbare Sites.
- Gebäude samplen mehrere Footprint-Punkte.
- Gebäudeboden richtet sich nach höchstem Kontaktpunkt.
- Plinthe reicht unter tiefsten Kontaktpunkt.
- Vegetations-Clearings halten Gras und Bäume aus Gebäuden.
- Dächer erhalten höheres Geometriebudget als weniger sichtbare Wände.
- Siteweises Merging verbindet geringe Draw Calls mit räumlichem Culling.

## 9. Vegetation

### V3

- Bäume, Büsche, Felsen und Schneeverwehungen werden einmal aus Seed und lokalen Regeln verteilt.
- Opus-5-Max-Waldburg fragt Höhe, Straße, Wassergraben und Bach vor Platzierung ab.
- Opus-5-Max-Bergrücken prüft Höhe, Pool, Bach, Pfad, Lager und Baumgrenze.
- Wiederholungen werden nach Grundform und Material instanziert.
- Keine Vegetationschunks.
- Kein Baum-LOD.
- Kein kamera-relatives Grasfeld.
- Kein gemeinsamer Windshader für gesamte Vegetation.

### V36

- Vegetation unterstützt Maßstab und Silhouette der Bergburg.
- Typisch sind begrenzte Fels-, Baum-, Busch- und Schneefamilien.
- Scatter bleibt einmaliger Build-Schritt.
- Keine Pflicht für Waldökologie, Grasdichtefelder, Chunks oder LOD.

### Kaze

- Gras und Blumen verwenden weltgehashte, kamera-relative Felder.
- Drei Grasbänder besitzen unterschiedliche Zellabstände und Reichweiten.
- 363.536 potenzielle Grasslots decken das Nah- und Mittelfeld ab.
- Weltzellen halten Pflanzen trotz kamerafolgendem Raster ortsfest.
- Bäume werden einmal über Insel gescattert.
- `200-m`-Chunks trennen Bäume räumlich.
- Baumart und Chunk bestimmen InstancedMesh-Batches.
- Nah- und Fernkronen bilden ein flächenerhaltendes LOD.
- 30-m-Hysterese verhindert häufigen LOD-Wechsel.
- Frustum- und Schattenculling reduzieren unsichtbare Kosten.
- Gras, Blumen, Bäume und Stoff lesen denselben Windblock.

## 10. Wasser

### Opus 5 Max V3

- Wasserflächen sind lokale Rechtecke, Scheiben, Ringe oder vertikale Sheets.
- eigener Vertex-Shader erzeugt Sinuswellen aus Weltposition und `uTime`.
- eigener Fragment-Shader mischt Tiefenfarbe, Flachwasserfarbe, Schaum und Glitzern.
- Randattribut blendet Wasser am Geometrierand aus.
- Wasserfälle scrollen mathematische Streifen und hellen Lippe sowie Aufprallzone auf.
- Wasserhöhe wird authored im jeweiligen Weltbuilder gesetzt.
- Keine analytische Wassertiefe aus Terrainhöhe.
- Keine gemeinsame Ozean-, Fluss- und Teicharchitektur.

### V36-Weltunterbau

- Wasser besteht typischerweise aus lokalem Flussband, Wasserfall-Sheets und Pool.
- Bewegung läuft meist über einfache Sinus-, Streifen- oder UV-Logik im Shader.
- DeepSeek-v2 teilt `terrainHeight` mit Fluss- und Objektplatzierung.
- Andere Beiträge platzieren Wasser unabhängig als sichtbare Kulisse.
- Keine V36-Pflicht für Uferprüfung, Flussprofil, Wassertiefe oder Weltkoordinatenphase.

### Kaze

- Ozean folgt Kamera bis 13 km Reichweite.
- Gerstner-Wellen berechnen Ozeanbewegung.
- Flussribbon folgt gebackenem Flussprofil.
- Teichscheiben verwenden aus Uferprüfung gelöste Wasserstände.
- Wasserfall-Sheets entstehen an gemeldeten Gefällestellen des fertigen Profils.
- Wassertiefe ergibt sich analytisch aus `waterSurfaceY - heightAt(x,z)`.
- Schaum, Flachwasserfarbe und Wellendämpfung benötigen keinen zweiten Depth-Pass.
- Wellenphase verwendet Weltkoordinaten; kamera-relativer Ozean schwimmt nicht sichtbar mit.

## 11. Licht, Himmel und Atmosphäre

### V3/V36

- Asset-Lab-Host liefert Kamera und Lichtpreset.
- V3 wählt pro Welt ein Preset wie `daylight`, `himmelsgrat` oder `abendglut`.
- Ältere Opus-5-V3-Wassershader lesen nur `uTime`, nicht gemeinsame Wind- oder Wetteruniforms.
- V36-Beiträge ergänzen oft eigene Himmelkuppel, Wolkenflächen, Nebelshader oder lokale Beleuchtung.
- Beitragseigene Atmosphäre kann Host-Licht ergänzen oder technisch doppeln.
- Keine tierweite Garantie, dass Himmel, Materiallicht, Wasserreflexion und Wetter dieselbe Quelle teilen.

### Kaze

- `Environment.js` ist zentrale Quelle für Sonne, Mond, Wind, Nebel, Wetter und Color Grade.
- `Sky.js` rendert Rayleigh-/Mie-Streuung, Sonne, Mond, Sterne und Wolken in HDR.
- derselbe Himmel erzeugt per CubeCamera und PMREM die Material-Environment-Map.
- sichtbarer Himmel, Material-IBL und Wasserreflexion verwenden dieselbe Lichtquelle.
- räumliche Böen kombinieren wandernde Front, große Welle, Instanzphase und feines Flutter.
- zwei bis vier Shadow Cascades staffeln Schattenqualität nach Entfernung.
- PostFX fügt SSAO, Höhennebel, Mie-Inscatter, Godrays, DOF, Bloom, AgX, Grade und FXAA zusammen.
- Luftperspektive trennt Nah-, Mittel- und Fernraum.

## 12. Performancearchitektur

### V3

- kleine Welt benötigt normalerweise kein Chunking oder LOD.
- ein Terrain-Mesh hält Boden-Draw-Calls niedrig.
- Instanzfamilien reduzieren Draw Calls für wiederholte Props.
- jede zusätzliche Materialfarbe kann eine weitere Familie und damit einen Draw Call erzeugen.
- jede Wasserstrecke kann eine eigene Oberfläche und einen eigenen Draw Call erzeugen.
- gesamte Welt bleibt im Speicher und meist im Kamerabereich.
- kein Bake-Cache nötig; Raster und Instanzen entstehen beim `build(seed)`.

### V36

- Tier empfiehlt höchstens 20 Instanzfamilien und 34 Oberflächen.
- über 54 geschätzte Draw Calls verlangt der Prompt eine Begründung.
- kompakte Komplettansicht begünstigt wenige große Batches statt vieler Chunks.
- einzelne Beiträge melden ungefähr 18–19 Familien plus Terrain- und Atmosphärenoberflächen.
- kein gemeinsamer Leistungsmesswert für alle V36-Beiträge.
- keine belastbare FPS-Aussage ohne vergleichbare Messung.

### Kaze

- CDLOD reduziert Terrainauflösung mit Entfernung.
- Terrain bleibt durch Instancing trotz vieler sichtbarer Patches ein kompakter Draw-Pfad.
- Baumchunks erlauben Frustum-Culling.
- Shadow-Culling entfernt unnötige Schattenarbeit außerhalb Kaskadenreichweite.
- getrennte Grasbänder vermeiden überdichtes Fernfeld.
- siteweises Merging hält einzigartige Architektur günstig und cullbar.
- analytische Bewegung vermeidet per-frame Buffer-Reuploads.
- Bake-Cache reduziert vollständigen Weltaufbau von ungefähr 18 s auf ungefähr 0,3 s.
- historische RTX-2080-Messung: High `4,0 ms` p50, Ultra `4,7 ms` p50.
- historische Spitzen: 383 Draw Calls High und 543 Draw Calls Ultra.
- Messwerte sind Hardwarebeleg, kein direktes Asset-Lab-Budget.

## 13. Gameplay- und Weltwahrheit

### V3/V36

- untersuchte V3- und V36-Beiträge liefern keinen `playfield`-Block.
- Host erhält keine vollständige Höhenfunktion für begehbare Gesamtwelt.
- Host erhält keine authored Weltgrenze, Spawnfläche oder Hindernisliste.
- sichtbare Brücken, Straßen und Höfe sind Vorschaugeometrie, keine garantierte Navigation.
- Asset Lab kann nur einen begrenzten Ersatzspielraum aus Geometrie ableiten.

### Kaze

- `heightAt(x,z)` ist gemeinsame Bodenwahrheit.
- `normalAt`, `slopeAt`, `waterAt`, `biomeAt` und `splatAt` leiten weitere Weltfragen ab.
- Spieler, Gegner und Kamera können denselben Boden abfragen, den Terrainshader zeichnet.
- Gebäude und wichtige Strukturen publizieren Blocker.
- System bleibt einwertiges Heightfield.
- Echte übereinanderliegende Stockwerke, Höhlen und begehbare Brückendecks benötigen eine andere Kollisionsarchitektur.

## 14. Warum V3/V36 anders aussehen können als Kaze

- Asset Lab baut große Formen oft aus wenigen sichtbaren Primitivfamilien.
- Kaze verwendet Texturarrays, Vegetationsatlanten, spezialisierte Silhouetten und mehrere Entfernungssysteme.
- Asset-Lab-Terrain trägt häufig Vertexfarben ohne hochfrequente Materialdetails.
- Kaze trennt Makrovariation, Materialtexturen, Normalmaps, AO, Nässe und Biomwirkung.
- Asset-Lab-Atmosphäre ist oft ein lokaler Shaderlayer.
- Kaze-Atmosphäre beeinflusst Himmel, Licht, Materialien, Wasser, Vegetation und Postprocessing gemeinsam.
- Asset-Lab-Welt bleibt als Gesamtmodell lesbar.
- Kaze baut Raumfolgen für Laufen, Kämpfen, Fernsicht und Kamerahöhen.
- Unterschied entsteht primär aus Architektur und Datenfluss, nicht aus mehr Shaderwörtern oder mehr Polygonen.

## 15. Was eine Asset-Lab-Welt für Kaze-Niveau technisch ergänzen müsste

- authored World-Spec als eigene Hauptquelle.
- gemeinsame `groundHeightAt`-Funktion für Geometrie, Props und Gameplay.
- getrennte Material-, Biom-, Wasser- und Occupancy-Fragen.
- Straßen und Baupads als Terrainoperation statt aufgelegte Dekoration.
- Ufer- und Wasserstandsprüfung aus fertigem Boden.
- Footprint-Sampling, Plinthen und Vegetations-Clearings für Gebäude.
- instanzierte Wiederholungen plus sinnvoll gemergte einzigartige Architektur.
- Vegetations-Lösungen nach tatsächlicher Kamerareichweite.
- gemeinsamer Host-Wind-, Wetter-, Nebel- und Sonnenvertrag.
- vollständige Bounds für alle sichtbaren Formen.
- Gameplay-`playfield` mit Spawn, Lichtung, Radius und Blockern.
- Chunking oder LOD nur bei messbarem Verwerfen außerhalb Hostkamera.
- keine ungeprüfte Übernahme der `1.600-m`-, `2.048²`- oder 190.000-Erosionswerte in eine Kleinwelt.

## 16. Fachbegriffe kurz

- **Authored:** wichtige Form oder Platzierung wurde bewusst festgelegt.
- **Procedural:** Form oder Verteilung entsteht durch Regeln und Mathematik.
- **Noise:** mathematische Unregelmäßigkeit für natürliche Variation.
- **Heightfield:** Raster mit genau einer Bodenhöhe pro X/Z-Stelle.
- **Bake:** teure Weltberechnung vor Laufzeit.
- **Cache:** gespeichertes Bake-Ergebnis für schnellen Neustart.
- **Vertex:** Eckpunkt eines 3D-Meshes.
- **Vertexfarbe:** direkt an einem Meshpunkt gespeicherte Farbe.
- **BufferGeometry:** kompakte Arrays für Positionen, Normalen, Farben und Dreiecke.
- **Shader:** GPU-Programm für Geometrieverformung oder Pixelberechnung.
- **Vertex-Shader:** bewegt und transformiert Meshpunkte.
- **Fragment-Shader:** berechnet sichtbare Pixelfarbe und Transparenz.
- **Uniform:** gemeinsamer Shaderwert wie Zeit, Wind oder Sonnenstand.
- **PBR:** Materialbeleuchtung mit physikalisch orientierten Reflexionsregeln.
- **Splatmap:** Datenkarte zum Mischen mehrerer Bodenmaterialien.
- **Biomfeld:** Datenkarte für Vegetationsdichte und Biomtyp.
- **AO:** weiche Verdunkelung in Mulden und Kontaktstellen.
- **Instancing:** viele Kopien gleicher Geometrie in einem Renderauftrag.
- **Merging:** einzigartige statische Teile zu einer Geometrie verbinden.
- **Draw Call:** CPU-Auftrag an GPU, eine Geometrie mit einem Material zu zeichnen.
- **Chunk:** räumlich begrenzter Weltabschnitt.
- **LOD:** günstigere Darstellung mit wachsender Entfernung.
- **Culling:** unsichtbare oder irrelevante Inhalte nicht zeichnen.
- **CDLOD:** Terrain-LOD mit entfernungsabhängigen Quadtree-Patches und Randmorphing.
- **IBL:** Materialbeleuchtung aus einem Umgebungsbild oder gerenderten Himmel.
- **Postprocessing:** Bildbearbeitung nach dem eigentlichen 3D-Rendern.
- **Luftperspektive:** entfernte Formen verlieren Kontrast und nähern sich Luft-/Nebelfarbe.

## 17. Quellen

- `prompts/asset-lab-model-benchmarking-v3-mega-worlds.md`
- `prompts/asset-lab-model-benchmarking-v36-castle-siege-timeline-stress.md`
- `apps/asset-lab/src/components/assetLab/AssetLabStage.tsx`
- `apps/asset-lab/src/components/assetLab/AssetLabSurfaceMesh.tsx`
- `apps/asset-lab/src/catalog/worldAssetLabTypes.ts`
- `apps/asset-lab/src/catalog/assetLabBenchmarks/claude-opus-5-max/v3/`
- `apps/asset-lab/src/catalog/assetLabBenchmarks/glm-5-2-via-claude-code/v36/fortressEnvironment.ts`
- `apps/asset-lab/src/catalog/assetLabBenchmarks/deepseek-v4-flash-v2-via-claude-code-max/v36/terrainMath.ts`
- `apps/asset-lab/src/catalog/assetLabBenchmarks/deepseek-v4-flash-v2-via-claude-code-max/v36/environmentSurfaces.ts`
- `docs/quizfall-world-runtime-entry.md`
- `src/engine/world/worlds/kazeNoShima.js`
- `src/engine/world/Heightfield.js`
- `src/engine/world/Terrain.js`
- `src/engine/world/GrassField.js`
- `src/engine/world/TreeField.js`
- `src/engine/world/Structures.js`
- `src/engine/render/Water.js`
- `src/engine/render/Environment.js`
- `src/engine/render/Sky.js`
- `src/engine/render/PostFX.js`
