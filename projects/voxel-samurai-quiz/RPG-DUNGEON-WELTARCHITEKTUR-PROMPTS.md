# RPG-Dungeon-Weltarchitektur — Kaze-System gegen Asset-Lab-System

**Lesen wenn:** KI soll ein RPG mit mehreren Dungeon-Leveln und klar gewählter Weltarchitektur bauen.
**Vergleich:** Prompt A erzeugt eine gemeinsame Kaze-artige Produktions-Weltengine; Prompt B erzeugt gegensätzliche, beitragslokale Asset-Lab-artige Einzelkarten.
**Grenze:** Ghost of Tsushima dient nur als Qualitätsrichtung für Landschaft, Raumfolge und Atmosphäre; keine geschützten Assets, Kartenlayouts, Figuren oder Namen kopieren.
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen und unnötige Artikel streichen; Fehlerbild, Ursache, Handlung und Beleg erhalten.

## 1. Gleiche Spielidee, andere Weltarchitektur

- Gemeinsame Spielidee: Third-Person-Fantasy-RPG (Rollenspiel aus Verfolgerkamera) mit Klassen, Gegnern, Quests und Dungeon-Level-Auswahl.
- Prompt A: Weltengine (wiederverwendbare Kartentechnik) ist Hauptprodukt; Karten liefern World-Specs (bewusste Kartenbaupläne).
- Prompt B: Kartenbeitrag ist Hauptprodukt; jede Karte liefert `build(seed)` (einmaliger reproduzierbarer Szenenaufbau).
- Beide Prompts trennen Kartenwelt von Spieler-, Gegner-, Kampf-, Quest- und UI-Systemen.
- Karten erzeugen keine zweite Kamera-, Eingabe-, Audio-, Wetter- oder Gameplay-Runtime (eigene Laufzeit neben dem Spielhost).

## 2. Unterschiede nebeneinander

| Entscheidung | Prompt A — Kaze-artig | Prompt B — Asset-Lab-V36-artig |
|---|---|---|
| Hauptziel | gemeinsame Weltplattform für viele große Karten | schnell gebaute, eigenständige Kulissenkarte je Dungeon |
| Karteninhalt | World-Spec (Kartenbauplan) | lokaler Builder (Szenenaufbauer) |
| Terrain | gemeinsames Heightfield (Höhenraster) und CDLOD (entfernungsabhängige Bodenstücke) | ein vollständiges Terrain-Mesh (zusammenhängender 3D-Boden) pro Karte |
| Material | Splatmap (Mischkarte), Normalmaps (feine Lichtstruktur), AO (Kontaktschatten) | Vertexfarben (Farben an Meshpunkten) oder kompakter lokaler Shader (GPU-Oberflächenprogramm) |
| Vegetation | kamera-relative Grasfelder, Baumchunks (Raumgruppen), LOD (günstige Fernformen) | einmaliger Scatter (regelbasierte Verteilung) und Instancing (viele Kopien pro Renderauftrag) |
| Wasser | gemeinsames Ozean-, Fluss-, Teich- und Wasserfallsystem | lokale Flussbänder, Pools und Wasserfallflächen |
| Atmosphäre | Environment-SSoT (eine Umweltquelle für Sonne, Wind, Nebel und Wetter) | Host-Preset (vorgegebene Lichtstimmung) plus wenige lokale Oberflächen |
| Gameplayboden | Engine veröffentlicht gemeinsame Boden-, Wasser- und Steigungsabfragen | Karte veröffentlicht kleines `playfield` (Boden-, Spawn- und Hindernisvertrag) |
| Performance | Chunks (Raumabschnitte), LOD (Fernvereinfachung), Culling (Unsichtbares ausblenden), Bake-Cache (gespeicherte Vorberechnung) | wenige Instanzfamilien und Oberflächen; ganze Karte bleibt geladen |
| Neue Karte | hauptsächlich neue Daten und authored Formen (bewusst gesetzte Großformen) | neue lokale Geometrie-, Material- und Scatterlogik (regelbasierte Verteilung) |
| Startkosten | hoch | niedrig bis mittel |
| Kosten bei vielen Karten | sinken stark, weil Engine wiederverwendet wird | steigen, weil Technik pro Karte wiederholt oder variiert |
| Typische Wirkung | weite, zusammenhängende, erkundbare Landschaft | starke Gesamtkomposition mit klarer Landmarke |

## 3. Prompt A — Kaze-artiges RPG-Dungeon-Weltsystem

```text
AUFTRAG

Baue ein vollständiges Third-Person-Fantasy-RPG mit einem Dungeon-Level-System und einer gemeinsamen produktionsreifen Weltengine. Die Landschaft soll die Qualität einer großen japanisch inspirierten Abenteuerwelt erreichen, aber vollständig eigene Küsten, Berge, Flüsse, Straßen, Siedlungen, Schreine, Ruinen, Pflanzen, Namen und Assets verwenden. Kopiere keine Ghost-of-Tsushima-Karte und keine geschützten Inhalte.

ERGEBNISZIEL

- Spieler wählt mehrere große Dungeon-Level aus einem Registry-System (zentrale Kartenliste).
- Jedes Level ist eine eigenständige, begehbare Landschaft mit Route, Landmarken, Kämpfen, Quests und Rückkehrpunkt.
- Alle Level verwenden dieselbe Terrain-, Vegetations-, Wasser-, Wetter-, Licht-, Kamera- und Gameplay-Bodenarchitektur.
- Eine neue Karte benötigt hauptsächlich eine World-Spec (bewusster Kartenbauplan), keine neue Renderengine (gemeinsamer 3D-Zeichenpfad).

ARCHITEKTUR

1. Schaffe eine zentrale WorldSpec-Schnittstelle (Datenvertrag für Kartenbauplan).
2. Eine Map-Spec (Datenobjekt einer konkreten Karte) beschreibt mindestens:
   - Weltgröße und Seed (reproduzierbare Zufallszahl),
   - Küsten- oder Randform,
   - Ridge-Splines (bewusst gezeichnete Gebirgslinien),
   - Peaks (Berggipfel),
   - Flüsse und Teiche,
   - Straßen und Nebenpfade,
   - Baupads (geglättete Bauflächen),
   - Biomregionen (große Vegetationszonen),
   - Landmarken und Siedlungen,
   - Spawn, Kampflichtungen und Rückkehrpunkte,
   - Reviewkameras (festgelegte Prüfansichten).
3. Die Map-Spec enthält keine eigene Kamera-, Eingabe-, Audio-, Kampf-, Quest- oder Wetter-Runtime.
4. Eine zentrale Bake-Pipeline (Vorbereitungskette) erzeugt aus jeder Spec:
   - Heightfield (gemeinsames Höhenraster),
   - Normalfeld (Bodenrichtung für Licht und Steigung),
   - AO-Feld (weicher Kontaktschatten),
   - Splatmap (Mischkarte für Fels, Erde, Sand, Wege und Nässe),
   - Biomfeld (Dichte von Gras, Blumen und Bäumen),
   - Wasserprofil,
   - Occupancy-Feld (belegte Flächen für Bauten und Vegetation),
   - Cache (gespeichertes Bake-Ergebnis).
5. Eine einzige groundHeightAt(x,z)-Funktion (gemeinsame Bodenhöhenabfrage) versorgt Terrain, Spieler, Gegner, Kamera, Gebäude, Vegetation und Wasser.
6. Straßen, Pads, Flussbetten und Teiche verändern den Boden konstruktiv; sie sind keine aufgelegten Farbflächen.
7. Definiere bei überlappenden Features eine klare Besitzregel; Schleifenreihenfolge darf kein zufälliges Ergebnis bestimmen.

TERRAIN UND MATERIAL

- Rendere Terrain über CDLOD oder gleichwertiges Quadtree-LOD (entfernungsabhängige Bodenstücke ohne sichtbare Risse).
- CPU-Höhenabtastung (Bodenlesen auf Prozessor) und GPU-Höhenabtastung (Bodenlesen auf Grafikkarte) müssen numerisch übereinstimmen.
- Nutze gemeinsame Texturarrays (mehrere Bodenmaterialien in einem GPU-Speicherverbund) für Albedo (Grundfarbe) und Normalmaps (feine Lichtstruktur).
- Mische Fels, Erde, Sand, Pfad, Gras und Nässe aus Splatmap, Höhe, Steigung und Makrovariation (großflächiger Farbwechsel).
- Verhindere sichtbare Nähte, schwebende Wege und unterschiedliche Bodenhöhen zwischen Grafik und Gameplay.
- Wähle Weltgröße, Rasterauflösung und Erosionsmenge nach Karte und Zielhardware; kopiere keine Kaze-Zahl blind.

VEGETATION

- Nutze kamera-relative, weltgehashte Grasfelder: Feld folgt Kamera, Pflanzen bleiben an stabilen Weltpositionen.
- Trenne Nah-, Mittel- und Fernband nach echter Bildschirmgröße.
- Scattere Bäume deterministisch (bei gleichem Seed identisch) aus Biom, Steigung, Wasser, Wegen und Gebäude-Clearings (bewuchsfreien Gebäudezonen).
- Teile Bäume nach Art und Raumchunk (räumlicher Kartenabschnitt).
- Nutze LOD mit Hysterese (Fernform mit Puffer gegen häufiges Umschalten).
- Begrenze Schattenreichweite getrennt von Sichtweite.
- Nutze gemeinsame Winduniforms (Shaderwerte für Richtung, Stärke und Böen) für Gras, Bäume, Stoff und Partikel.

ARCHITEKTUR UND LANDMARKEN

- Sample jeden Gebäude-Footprint (mehrere Bodenkontaktpunkte).
- Setze Gebäudeboden auf verlässliche Höhe und führe Plinthen (Sockel) unter tiefsten Kontaktpunkt.
- Leite Vegetations-Clearings aus Gebäudegrundrissen ab.
- Instanziere wiederholte Bauteile; merge (verbinde) einzigartige statische Bauteile pro Standort und Material.
- Halte Standorte getrennt cullbar (außerhalb Kamera ausblendbar).
- Investiere Formbudget zuerst in Silhouette, Dachform, Eingang, Sockel und Fernlesbarkeit.

WASSER

- Leite Flussoberfläche aus fertig bearbeitetem Terrain ab.
- Erzwinge flussabwärts fallendes Wasserprofil.
- Bestimme Teichwasser aus geprüftem Ufer statt aus einem einzelnen Mittelpunkt.
- Erzeuge Wasserfälle an tatsächlichen Profilstufen.
- Berechne Wassertiefe aus Wasserhöhe minus groundHeightAt(x,z).
- Verwende Weltkoordinaten für Wellenphase, damit kamera-relative Wasserflächen nicht schwimmen.

UMWELT

- Eine Environment-SSoT (zentrale Umweltquelle) besitzt Sonne, Mond, Wind, Böen, Nebel, Wetter, Niederschlag und Farbkorrektur.
- Sichtbarer Himmel, IBL (Materialbeleuchtung aus Himmel) und Wasserreflexion verwenden dieselbe Lichtquelle.
- Nutze Luftperspektive (Kontrastverlust mit Entfernung) für klare Nah-, Mittel- und Fernräume.
- Karten wählen Parameter oder Presets (vorgegebene Werteprofile), bauen aber keine zweite Umweltengine.

GAMEPLAY UND DUNGEON-LEVEL

- Baue eine MapRegistry (Liste aller Dungeon-Karten) mit lazy loading (Laden erst bei Auswahl).
- Jede Karte veröffentlicht Spawn, Kampflichtungen, begehbare Grenze, Wasserzonen und Blocker (Hindernisformen).
- Gegnernavigation nutzt dieselbe Boden- und Steigungswahrheit wie Spieler.
- Unterstütze zunächst eine Bodenhöhe pro X/Z; behaupte keine Höhlen, Stockwerke oder begehbaren Brückenebenen ohne eigene Mehrschicht-Kollision.
- Spieler-, Gegner-, Kampf-, Quest-, Loot-, Audio- und UI-Systeme bleiben gemeinsame RPG-Systeme außerhalb der Map-Spec.

ERSTE DREI ORIGINALKARTEN

1. Sturmkap-Insel: offene Silbergrasplateaus, südöstlicher Bruchkamm, Fluss zur Westlagune, Fischerdorf, Klippenkloster und Basaltnadeln im Meer; eigene Form und Namen.
2. Nebelpass: enger Bergkorridor, Bambustal, Wasserfälle, verlassener Wachposten, Hochmoor und mehrere Sichtachsen zwischen Pass und Gipfel.
3. Ahornbecken: breites Herbsttal, verzweigter Bach, Reisfeldterrassen, befestigtes Dorf, Waldschrein und Felsruinen an einer Höhenroute.

PERFORMANCE

- Vermeide per-frame Allokationen (neue Speicherobjekte in jedem Bild) und große Buffer-Reuploads (erneutes Hochladen von Geometriedaten).
- Nutze Instancing (viele Kopien pro Renderauftrag), Merging (statische Teile zusammenfassen), LOD, Frustum-Culling (außerhalb Kamera ausblenden) und Shadow-Culling (unnötige Schatten ausblenden) nach räumlicher Wirkung.
- Cache teure Bakes; invalidiere Cache bei Änderungen erzeugender Quellen.
- Berichte Draw Calls (Renderaufträge), Dreiecke, p50/p90/p99-Framezeit (Median und langsame Ausreißer) sowie kalten Erststart getrennt.
- Optimiere keine verschwundenen Inhalte als angeblichen Gewinn.

LIEFERREIHENFOLGE

1. Bestehende Architektur und Regeln lesen.
2. WorldSpec, Bake und gemeinsame Abfragen bauen.
3. Vollständigen Terrainpfad bauen.
4. Wasser, Vegetation, Architektur und Umwelt anbinden.
5. Gameplay-Boden und Dungeon-Registry anbinden.
6. Drei Karten als Specs bauen.
7. Statische und numerische Gates ausführen; keine Browser- oder Screenshot-Prüfung ohne ausdrückliche Freigabe.
8. Dokumentieren, welche Datenquelle jede sichtbare und spielbare Weltfrage besitzt.

FERTIG WENN

- Drei Karten laden über dieselbe Weltengine.
- Rendering und Gameplay stimmen bei Boden, Wasser, Straßen und Gebäuden überein.
- Neue Karte benötigt keine kopierte Terrain-, Wasser-, Vegetations- oder Wetterengine.
- Große Sichtweiten bleiben durch LOD, Chunks, Culling und Cache skalierbar.
- Kein Kartenmodul besitzt versteckte Parallelruntime oder zweite Weltwahrheit.
```

## 4. Prompt B — Asset-Lab-V36-artiges RPG-Dungeon-Weltsystem

```text
AUFTRAG

Baue ein vollständiges Third-Person-Fantasy-RPG mit einem Dungeon-Level-System aus kompakten, eigenständigen Kulissenwelten. Jede Dungeon-Karte soll wie ein hochwertiger Asset-Lab-Weltbeitrag entstehen: eine starke Gesamtkomposition, eine sofort lesbare Landmarke, authored Routen, lokale Terrain- und Wassersysteme und wenige gut gebatchte Formen. Keine Karte baut eine globale Produktions-Weltengine.

ERGEBNISZIEL

- Spieler wählt mehrere kompakte Dungeon-Level aus einer Registry (zentralen Kartenliste).
- Jede Karte ist ungefähr 280–340 Einheiten breit und als vollständige Kulisse lesbar.
- Karten sind begehbar, bleiben aber bewusst einstöckige Kleinwelten.
- Gemeinsamer RPG-Host besitzt Spieler, Gegner, Kampf, Quests, Loot, Kamera, Eingabe, Audio, Wetter und UI.
- Jede Karte liefert nur Weltgeometrie, lokale Oberflächen und einen kleinen Playfield-Vertrag (Boden-, Spawn- und Hindernisdaten).

KARTENVERTRAG

1. Definiere DungeonMapEntry mit:
   - id, Name, Beschreibung, Seed und Lichtpreset,
   - build(seed) als einmaligen reproduzierbaren Aufbau,
   - families (instanzierte Grundformen),
   - surfaces (eigene Terrain-, Wasser- und Atmosphären-Meshes),
   - viewDistance und viewHeight (Kamerarahmen),
   - playfield mit groundHeightAt, clearingCenter, clearingRadius, walkableRadius, playerSpawn und Blockern.
2. Jede Karte bleibt in ihrem eigenen Ordner.
3. Lokale Helfer dürfen Terrain, Architektur, Vegetation und Wasser dieser Karte bauen.
4. Karten importieren keine fertigen Builder einer anderen Karte.
5. Karten erzeugen keine eigene Kamera-, Eingabe-, Audio-, Gegner-, Quest-, Wetter- oder UI-Runtime.

TERRAIN

- Verwende pro Karte eine reine lokale groundHeightAt(x,z)-Funktion (Bodenhöhenabfrage).
- Nutze dieselbe Funktion für Terrainraster, Props, Wasserbezug und Playfield.
- Sample die Funktion in ein einziges vollständiges Terrain-Mesh mit ungefähr 96–160 Segmenten.
- Baue große Formen authored (bewusst gesetzt): Burgplatte, Terrassen, Schlucht, Straße, Hof, Flussbett und Kartenrand.
- Nutze FBM- oder Ridge-Noise (mathematische Landschaftsvariation) nur für Oberflächenbruch und kleine Reliefvariation.
- Keine hydraulische Erosion (simulierte Bodenabtragung), kein CDLOD (entfernungsabhängige Bodenstücke), kein Terrain-Streaming (Nachladen von Bodenabschnitten) und kein Quadtree (hierarchischer Raumbaum).
- Ganze Kleinwelt darf geladen bleiben, weil sie für eine kompakte Kamera- und Spielreichweite gebaut wird.

MATERIAL

- Nutze Vertexfarben (Farben direkt an Meshpunkten) oder einen kompakten Terrain-Shader (GPU-Programm für Bodenfarbe).
- Mische wenige klare Rollen: Fels, Erde, Gras, Schnee, Straße, Hof und Wasserbett.
- Farbe darf von Höhe, Steigung, Noise und lokalen Masken abhängen.
- Keine globale Splatmap (Bodenmischkarte), kein globales Biomfeld (Bewuchsdatenkarte) und keine Texturarray-Pipeline (gemeinsame Verarbeitung mehrerer Materialbilder).
- Materialkontrast muss Landmarke, Route und Spielraum sofort lesbar machen.

ARCHITEKTUR

- Baue Burg, Dorf, Schrein, Brücken, Türme und Props aus einfachen wiederverwendbaren Grundformen.
- Nutze Instancing (viele Kopien gleicher Geometrie in einem Renderauftrag) für Boxen, Stämme, Kronen, Dächer, Felsen und Lichter.
- Gruppiere nach Material und Grundform.
- Nutze eigene Surface-Geometrie nur für Terrain, Wasser, besondere Dächer oder unverzichtbare Silhouetten.
- Prüfe Gebäudekontakt lokal über mehrere groundHeightAt-Samples.
- Türen, Routen und Höfe bleiben echte sichtbare Lücken; keine unsichtbaren Kreisblocker über Eingängen.

VEGETATION

- Scattere Bäume, Büsche, Grasgruppen, Felsen und Blumen einmal bei build(seed).
- Prüfe vor Platzierung Höhe, Steigung, Wasser, Straße, Hof und Gebäudeabstand.
- Nutze wenige klar getrennte Arten mit eigener Silhouette.
- Kein kamera-relatives Grasfeld, keine Baumchunks und kein lokales LOD-System.
- Begrenze Dichte durch Kartenmaßstab und sichtbare Komposition statt durch Großwelttechnik.
- Host-Wind darf bekannte Shaderuniforms (gemeinsame GPU-Werte) aktualisieren; Karte baut keinen eigenen Windmanager.

WASSER UND ATMOSPHÄRE

- Baue lokale Flussbänder, Pool-Scheiben und Wasserfallflächen.
- Nutze einfache zeitbasierte Shader für Wellen, Schaum, Glitzern und Wasserfallstreifen.
- Lege Wasserhöhe aus derselben lokalen Bodenfunktion plausibel fest.
- Nutze Host-Licht, Host-Nebel und Host-Wetter als Hauptquelle.
- Ergänze höchstens wenige lokale Wolken-, Nebel- oder Haze-Flächen (Fernluftschleier), wenn Landmarke und Tiefenstaffelung sie brauchen.
- Keine zweite Sonne, keine zweite Wettersteuerung und keine eigene Postprocessing-Pipeline (Bildbearbeitung nach dem 3D-Rendern).

GAMEPLAY UND DUNGEON-LEVEL

- Gemeinsamer RPG-Host setzt Spieler und Gegner auf groundHeightAt.
- Playfield definiert eine klare Kampflichtung und einen begehbaren Radius.
- Blocker (Hindernisformen) beschreiben Felsen, Türme und Wände; Eingänge bleiben offen.
- Unterstütze einstöckige Innenräume nur über einfache Wandsegmente und geschützte Raumflächen.
- Keine Höhlen unter Terrain, keine übereinanderliegenden Stockwerke und keine zweite Bodenhöhe am gleichen X/Z-Punkt.
- Kämpfe, Quests und Loot referenzieren authored Kartenanker, gehören aber nicht in Terrainbuilder oder Shader.

ERSTE DREI ORIGINALKARTEN

1. Gipfelzitadelle: höchste Bergplatte, große Festung, Torachse, Serpentinenstraße, Schluchtbrücke, Wasserfall und kleiner Nadelwald.
2. Versunkener Ahornhof: terrassiertes Becken, verfallener Palast, rote Baumringe, Kanäle, zentrale Kampflichtung und entfernte Torlandmarke.
3. Bambuskloster: kompakter Hügel, Klostermauer, offene Eingangstreppe, Bambusgürtel, Teich, Felsgarten und Nebelabschluss.

PERFORMANCE

- Ziel: höchstens 20 Instanzfamilien und 34 Oberflächen pro Karte.
- Über 54 geschätzte Draw Calls (Renderaufträge) braucht eine konkrete Begründung.
- Erzeuge keine Geometrie oder Materialien pro Frame.
- Baue große Arrays einmal in build(seed).
- Chunking und LOD nur ergänzen, wenn Hostkamera nachweisbar relevante Kartenteile auslässt.
- Keine FPS-Behauptung (Bilder pro Sekunde) ohne Messung.

LIEFERREIHENFOLGE

1. Gemeinsamen Kartenvertrag und Hostgrenzen bauen.
2. Eine vollständige Vertical-Slice-Karte (kleinster kompletter Qualitätsausschnitt) bauen.
3. Playfield, Blocker und RPG-Anker anbinden.
4. Gemeinsame neutrale Grundformen stabilisieren.
5. Zwei weitere Karten mit eigener Komposition, aber gleichem Vertrag bauen.
6. Statische Gates und Typecheck ausführen; keine Browser- oder Screenshot-Prüfung ohne ausdrückliche Freigabe.
7. Pro Karte Familien, Oberflächen, geschätzte Draw Calls und bekannte Grenzen dokumentieren.

FERTIG WENN

- Drei kompakte Karten laden über dieselbe Dungeon-Registry.
- Jede Karte besitzt eigene starke Silhouette, Route, Landmarke und Atmosphäre.
- Jede Karte stimmt intern bei sichtbarem Boden, Prop-Höhe und Gameplay-Boden überein.
- Keine Karte enthält eine unnötige Großweltengine oder eine zweite RPG-Runtime.
- Neue Karte darf eigene Weltbaulogik besitzen, muss aber denselben Host- und Playfield-Vertrag erfüllen.
```

## 5. Auswahlhilfe

### Prompt A wählen

- mehr als wenige große Karten geplant.
- weite Erkundung und Vegetationsdichte sind Kernprodukt.
- Wetter, Wasser und Boden müssen über alle Karten identisch funktionieren.
- hohe Startinvestition ist akzeptabel.
- Karten sollen langfristig hauptsächlich aus Specs (Bauplänen) bestehen.

### Prompt B wählen

- Dungeon-Level bleiben kompakte, klar gerahmte Einzelwelten.
- jede Karte darf technisch und gestalterisch stärker eigenständig sein.
- schneller Bau und starke Gesamtkomposition sind wichtiger als Großweltskalierung.
- wenige Karten oder häufig wechselnde KI-Beiträge sind geplant.
- gemeinsamer RPG-Host kann Gameplay liefern, während Karten nur Kulisse und Playfield liefern.

## 6. Größter Promptunterschied

```text
Prompt A fragt zuerst:
„Welche gemeinsame Weltwahrheit und Engine brauchen alle Karten?“

Prompt B fragt zuerst:
„Welche lokale Geometrie und Komposition braucht diese eine Karte?“
```

- Prompt A optimiert Wiederverwendung, Konsistenz und große Sicht-/Laufstrecken.
- Prompt B optimiert Liefergeschwindigkeit, Eigenständigkeit und sofort lesbare Gesamtszenen.
- Prompt A verhindert Karten-Sonderengines.
- Prompt B erlaubt Karten-Sonderlogik, solange Host- und Gameplayvertrag stabil bleiben.
