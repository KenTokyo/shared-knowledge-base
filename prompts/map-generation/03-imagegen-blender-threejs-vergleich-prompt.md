# Ein vollständiges ImageGen-Referenzpaket, zwei Maps: Blender und Three.js vergleichen

Erzeuge das vollständige Bildpaket und baue, soweit beauftragt, dieselbe Landschaft über zwei Produktionswege bei vergleichbaren Spielbedingungen.

## Meine Angaben

- Projekt / Map-Name: `<absoluter Projektpfad, Name>`
- Stil / Referenzen: `<Beschreibung oder AION 2-inspirierte Fantasy>`
- Größe in Metern, Breite × Tiefe: `<optional; Standard: 450 × 450 m>`
- Arbeitsstufe: `<nur vollständiges Bildpaket oder Bildpaket und beide Umsetzungen; aktuelle Nutzervorgabe geht vor>`
- Ausführung: `<ein GPT-Modell oder Orchestrierung; ohne Angabe ein GPT-Modell mit ImageGen>`
- Bei Orchestrierung: `<Orchestrierer: Anbieter/Modell/Denkstufe; Astra für ImageGen; Implementierer: Anbieter/Modell/Denkstufe>`
- Spielweise / zu erhaltene Eigenschaften: `<Wege, Klassen, Dichte, Nahdetails, Effekte>`
- Hardware / Auflösung / Leistungsziel: `<Angabe oder Projektstandard>`

## Auftrag und gemeinsamer Maßstab

Erzeuge mit ImageGen ein vollständiges Fantasy-Map-Bild-, Material- und Assetpaket
und implementiere bei beauftragter Umsetzung **beide** Varianten:
eine aus echten Blender-Exporten und eine mit in Three.js
erzeugter Geometrie. „Ion 2“ wird als **AION 2-inspirierte Fantasy-Landschaft**
angenommen; meine eigenen Vorgaben haben Vorrang.

Standardgröße: **450 × 450 m**, durch eigene Maße überschreibbar. Leite Terrain,
Spielgrenzen, Kollision, Spawns und Platzierungen in beiden Varianten gleich aus
Größe und Spielbereichsform ab. Halte Einheiten und Koordinatensystem fest.

Lies Projektregeln und vorhandene Laufzeit. Beide Varianten laufen als umschaltbare
Maps durch denselben vorhandenen Renderer; in Reborn `src/game/Game.ts` mit
`src/world/`. Lade/rendere nur die gewählte Map und entsorge ihre Ressourcen beim
Wechsel. Erhalte Produktoberfläche, Klassen, Gameplay und aktive Effekte.
Für diesen Auftrag sind vorhandene ImageGen-, Blender-/CLI-, Browser-, Screenshot-,
Gameplay- und Performance-Funktionen zur Umsetzung und integrierten Prüfung
freigegeben. Nutze bestehende Prüfwege und deren geltendes Budget.

## Vollständiges Bild-, Material- und Assetpaket

Drei schöne Gesamtbilder reichen für den Nachbau nicht. Erzeuge ein vollständiges,
inspiziertes Referenzpaket; eine Materialliste oder ein Prompt ohne tatsächliche
Bilddatei erfüllt den Auftrag nicht. Der Umfang folgt der Map und ihrer Inventarliste,
nicht einer pauschalen Obergrenze von drei oder vier Bildern.

### Umfang und Nutzerreferenzen

- Beachte die gewählte Arbeitsstufe: **nur Bildpaket** oder **Bildpaket und Umsetzung**.
  Bei „erstmal nur Bilder“ liefere das gesamte hier beschriebene Paket und beende
  diese Stufe vor Blender, Geometrie, Spielintegration und Laufzeitprüfungen.
  Bei einem vollständigen Map-Auftrag arbeite danach innerhalb der erteilten
  Freigabe weiter; dieser Abschnitt führt keine zusätzliche Bestätigungsrunde ein.
- Nutzer-Screenshots sind Ausgangsreferenzen für Form, Material und Stimmung.
  Inspiziere sie und erzeuge mit ImageGen neue, auf die Zielmap angepasste Bilder.
  Screenshots allein, bloßes Zuschneiden oder das Entfernen des HUD ersetzen das
  neue Paket nicht. Übernimm keine Browserleisten, UI, Schrift oder Spielfiguren.
  Echte spätere Laufzeitnachweise bleiben unverändert.
- Lege vor der Bilderzeugung eine vollständige Inventarliste an: alle Zonen,
  sichtbaren Oberflächen/Materialvarianten, Fels- und Steinformen, Bauteile,
  Landmarken, Requisiten sowie vorhandene Vegetation, Wasser und Effekte.
  Ordne stabile IDs zu. Ergänze neue Bestandteile aus erzeugten Bildern sofort;
  sie brauchen ebenfalls Referenzen. Keine zusätzlichen Biome oder Objekte allein
  zum Füllen einer Bildquote erfinden.

### Räumliche Ansichten und Licht

- Plane für eine vollständige Map **etwa 12–16 unterschiedliche Szenenansichten
  als Ausgangspunkt**, zusätzlich zu Material- und Assetbildern. Decke eine
  Layoutübersicht, alle vier Blickrichtungen, mehrere Spielkamerapositionen,
  Ein-/Ausgänge, Verbindungen, Höhenwechsel und Nahdetails ab. Bei Höhlen gehören
  Decke, Überhänge und verdeckte Kammern dazu. Für weitere Zonen oder verdeckte
  Bereiche weitere Ansichten erzeugen. Eine ausdrücklich kleinere Nutzervorgabe
  hat Vorrang; keine gleichartigen Blickwinkel als Abdeckung zählen.
- Verwende dieselbe Layoutskizze und bereits erzeugte, geprüfte Bilder als
  Bildreferenzen für Folgeansichten. Halte Maßstab, Orientierung, Landmarken,
  Wege, Materialpalette und Lichtquellen konsistent. Lege Kamera-ID, Position,
  Blickrichtung, Höhe und ungefähres FOV fest. ImageGen-Perspektiven sind keine
  metrisch verlässlichen Projektionen; Widersprüche korrigieren oder als offen
  markieren, nicht an den Implementierer als konsistente Geometrie weiterreichen.
- Zeige je charakteristischer Lichtzone eine Übersicht und ein Oberflächendetail
  unter dem geplanten Licht; vorhandene Ansichten dürfen dies abdecken. Dokumentiere
  Tageslichtöffnungen, Leuchten/Emission, Lichtfarbe, Schatten und Ambient-Anteil.
  Laufwege und Materialdetails müssen in Schatten erkennbar bleiben. Neutrale
  Materialbilder und atmosphärische Szenenansichten erfüllen verschiedene Zwecke.

### Sämtliche Materialien als eigene Dateien

- Erzeuge für **jedes unterschiedliche benötigte Material und jede sichtbare
  Variante** ein eigenes Materialbild und die benötigten Texturdateien.
  Beispielsweise können Wandfels, loser Stein, Sand, Staub, Pflaster, Bruchkanten,
  Kristall, Metall und Ruß verschiedene Einträge sein; die tatsächliche Map
  bestimmt die Liste. Wiederholte Instanzen desselben Materials teilen eine ID.
  Eine Sammeltafel allein ersetzt keine einzeln nutzbaren Dateien.
- Für kachelbare Oberflächen: separate Base-Color-/Albedo-Textur, frontal und
  flächig, gleichmäßig neutral beleuchtet, ohne perspektivische Verzerrung,
  gerichtete Schatten, Glanzlichter, Beschriftung oder eingebrannte Szenenbeleuchtung.
  Dokumentiere Auflösung, realen Kachelmaßstab und UV-/Wiederholungsabsicht.
  Prüfe Kantenübergänge mit einer 2×2-Kachelung und Details in Originalauflösung;
  korrigiere sichtbare Nähte und unbeabsichtigte Muster.
- Ergänze pro Material eine neutrale Materialvorschau zur Beurteilung von Relief,
  Rauheit, Glanz oder Transparenz. Lege die tatsächlich benötigten Kanäle fest:
  Base Color, Roughness, Normal, gegebenenfalls Height, AO, Metallic, Emission,
  Opacity/Transmission. Nicht jedes Material braucht jeden Kanal; dokumentierte
  konstante Werte sind zulässig, wenn sie die Oberfläche korrekt beschreiben.
- Unabhängig gemalte ImageGen-Bilder sind kein automatisch registriertes PBR-Set.
  Leite benötigte Strukturkanäle aus einer gemeinsamen Grundlage ab oder bake sie
  in der beauftragten Produktionsstufe; dokumentiere Verfahren und Schätzungen.
  Prüfe Deckungsgleichheit, Wertebereiche, Farbraum und Normalen-Konvention.
  Ungeprüfte oder erst später gebackene Kanäle bleiben ausdrücklich offen.
  Eine Materialvorschau ist weder eine Albedo-Datei noch ein Nachweis physikalisch
  korrekter Materialwerte.
- Bei Ausschnitten, Decals und Vegetation liefere benötigtes echtes Alpha und
  kontrolliere Ränder auf hellem und dunklem Grund. Ein aufgemaltes Schachbrett
  ist keine Transparenz. Bei prozeduralen Materialien wie Wasser oder Feuer:
  eigene Erscheinungsreferenz, benötigte Masken/Texturen und dokumentierte
  Shaderparameter statt einer ungeeigneten vollflächigen Screenshot-Textur.

### Sämtliche Felsen, Steine und Bauteile sichtbar machen

- Erzeuge **für jeden unterschiedlichen Assettyp und jede benötigte Formvariante**
  isolierte Referenzen: zum Beispiel Wandsegmente, Bodenfelsen, Geröllgrößen,
  Stalaktiten, Kristallgruppen, Treppen, Bögen, Türen und Feuerschalen, sofern
  diese zur Map gehören. Nicht jede wiederholte Steininstanz braucht ein neues Bild;
  unterschiedliche Silhouetten und Materialbelegungen schon.
- Zeige mindestens Vorderseite, Seite und Rückseite sowie Draufsicht oder
  Dreiviertelansicht, wenn sie Form oder Anschlussflächen besser erklären.
  Ergänze bei komplexen Assets verdeckte Seiten, Unterseiten und Kontaktflächen.
  Folgeansichten nutzen dasselbe Assetbild als Referenz. Form, Proportionen
  und Materialien dürfen zwischen Ansichten nicht wechseln.
- Verwende neutralen Hintergrund und gut lesbares Licht. Liefere die Ansichten
  einzeln in ausreichender Auflösung; Kontaktbögen dienen zusätzlich der Übersicht.
  Ordne jedem Asset Maße/Größenklasse, Material-IDs, Orientierung, Auflage- bzw.
  Anschlussflächen und den geplanten Einsatzort zu. Halte für den späteren Bau
  begehbare Flächen und Kollisionserwartungen fest; die Bilder selbst sind keine
  fertige Geometrie oder geprüften Collider.

### Ablage, Vollständigkeit und sichtbare Übergabe

- Speichere unter einem versionierten Map-Ordner die Szenenansichten,
  Material-/Texturdateien, Assetansichten, exakten Bildprompts und verwendeten
  Eingangsreferenzen. Nutze eindeutige Dateinamen mit IDs; keine überschriebenen
  oder nur im Chat erreichbaren Referenzen für die nachfolgende Umsetzung.
- Liefere ein maschinenlesbares Manifest: ID, Kategorie, Zone, Dateipfade,
  Referenzversion, Prompt-/Eingangsbildzuordnung, Kamera bzw. Maße,
  Material-/Assetbeziehungen, geplanter Einsatz und Prüfstatus/offene Punkte.
  Trenne Konzeptbild, Textur, Materialvorschau und tatsächliches Laufzeitasset.
  Vor der Integration heißt eine Zuordnung **geplant**, danach nur bei belegter
  Verwendung **eingebaut** mit Zielmaterial/-Mesh und Quellpfad.
- Erstelle eine lokal öffnende, statische Galerie mit beschrifteten Kontaktbögen
  für **alle** Szenen, Materialien, Texturkanäle und Assetansichten. Verlinke
  Originaldateien und Manifest; zeige dem Nutzer alle Gruppen und ihren geplanten
  Einsatz. Keine automatische Bildschleife und keine Auswahl von nur drei
  Vorzeigebildern als alleinige Lieferung.
- Gleiche Inventar und Dateien vor Abschluss zeilenweise ab: jede Zone aus
  ausreichenden Richtungen sichtbar, jedes Material mit eigenem Bild und
  benötigten Texturen/Werten, jeder Assettyp mit seinen Ansichten, jede Datei
  vorhanden und tatsächlich angesehen. Berichte erzeugte/geprüfte/offene
  Einträge je Kategorie. Fehlende, widersprüchliche oder ungeprüfte Bilder
  nacharbeiten; bei Tool- oder Budgetgrenzen den Rest konkret als unvollständig
  ausweisen. Eine erreichte Bildanzahl beweist keine vollständige Abdeckung.

## Referenz und zwei Produktionswege

1. Erzeuge und inspiziere das vollständige Paket gemäß dem Abschnitt oben: räumliche Ansichten, sämtliche Materialien/Texturen und sämtliche Assettypen. Liefere Galerie, Manifest und Abdeckungsbericht. Beide Produktionswege erhalten dieselbe geprüfte Referenzversion und vollständige Originaldateien. Bei „nur Bildpaket“ endet die Ausführung hier.
2. Erstelle eine gemeinsame, versionierte Layoutquelle: Seed, Gelände-/Höhenfeld, Wasserstand, Wege, Baum-/Fels-/Landmarkentransformationen, Grasverteilung, Spawn, Kollision, Licht und Vergleichskameras. Beide Varianten lesen dieselben Daten. Identische Seeds allein beweisen keine identischen Platzierungen.
3. **Blender-Variante:** Erzeuge echte Geometrie in Blender, exportiere sie und verwende diese Exporte im Spiel. Liefere Szene oder reproduzierbares Python-Skript, Exportparameter und Herkunft. Python/CLI ist ausreichend; MCP ist nicht nötig. Prüfe Einheiten, Achsen, Normalen, UVs, Materialzuordnung und Instanzierbarkeit.
4. **Three.js-Variante:** Erzeuge eigene Geometrie mit den nativen Modulen, denselben Terrain-/Transformationsdaten und vergleichbaren Silhouetten/Details. Ein bloßer zweiter Import der Blender-Exporte ist kein anderer Produktionsweg.
5. Teile vorhandenes Wasser, Gras, Licht, Spielmechanik und Diagnose sowie das Materialpaket. Belege für beide Varianten je Material-/Asset-ID die tatsächlich verwendeten Texturen, Zielmaterialien/-Meshes und Quellpfade im Manifest. Halte Adapter klein und dokumentiere Unterschiede in Geometrie, Materialien, LOD und Bildqualität; gleiche Geografie bedeutet keine identische Dreiecksanzahl.

Ein GPT-Modell übernimmt alle Schritte über die vorhandenen Werkzeuge. Bei gewählter
Orchestrierung sind die angegebenen Rollen freigegeben: Astra für ImageGen,
Implementierer für Maps, Orchestrierer für Integration. Prüfe genaue Anbieter,
Modelle und Denkstufen. Trenne Schreibbereiche und benenne einen Git-Verantwortlichen.
Übergib alle Bild-/Textur-/Assetdateien, Galerie, Inventar/Manifest, Layoutversion,
Maße, Kameras, Licht, Materialzuordnungen und Performance-Regeln vor abhängiger
Arbeit. Implementierende Rollen müssen die benötigten Bilder öffnen und
auswerten; Pfadlisten allein reichen nicht. Fehlende Modellangaben für die
beauftragte Stufe klären; keine stille Ersatzbesetzung.
Details: [Orchestrierung](02-orchestrierte-imagegen-map-prompt.md),
[ImageGen-Werkzeug](https://developers.openai.com/api/docs/guides/tools-image-generation).

## Performance-Regeln für beide Varianten

Lies [Performance](</Users/kentoky/Documents/React Projects/shared-docs/threejs/PERFORMANCE.md>),
[Messregeln](</Users/kentoky/Documents/React Projects/shared-docs/threejs/MEASURING.md>) und
[Leerlauf](</Users/kentoky/Documents/React Projects/shared-docs/IDLE-PERFORMANCE.md>).
Bei abweichender Ablage den vorhandenen Shared-Docs-Pfad nutzen; fehlende Quellen benennen.

- Erhalte Nahdetails, Dichte, Landmarken und aktive Effekte. Vergleiche geeignete entfernte LOD-Stufen mit Hysterese, Instancing und Instanz-Culling. Mehr räumliche Gruppen können zusätzliche Draw Calls erzeugen; messe den Gewinn.
- Korrekte Bounds und eigene Sichtbarkeit für Hauptbild, Schatten und Spiegelung; separate Instanzdaten für verschachtelte Durchläufe. Statische Daten bleiben statisch, Sichtbarkeit/LOD werden sinnvoll zwischengespeichert. Keine Vollszenen-Scans oder unveränderten Uploads pro Frame.
- Prüfe Gras-/Transparenzüberlagerung, Shader, Wasser, Schatten und Nachbearbeitung neben Dreiecken. Leere Effektpools schlafen. Menüs und verborgene/inaktive Flächen betreiben keine unnötige Render-/Simulationsarbeit; Timer, Listener und Ressourcen werden bereinigt. Keine endlose UI-Dekoration.
- Zähle vollständige Spiel-Frames über alle Renderdurchläufe. Bestehende Diagnose zeigt FPS/Framezeit-Verteilung, Dreiecke/Frame und Draw Calls/Frame mit Fensterdurchschnitt und Spitze; Zusatzdurchläufe mit Frequenz und Asset-Bestand separat. Gedrosselte Anzeige aus dem vorhandenen Loop, keine Detailmessung bei geschlossener Diagnose. [Messbedeutung](../map-performance/03-map-diagnose-und-spitzen-prompt.md).

## Sichtbarer und messbarer Vergleich

Dieser Abschnitt gilt für die beauftragte Umsetzung; die Bildstufe liefert die
vollständige Galerie und das Manifest gemäß oben.

Liefere **Side-by-Side: ImageGen-Referenz | Three.js im Spiel | Blender im Spiel**
mit ähnlicher Kamera und Beleuchtung. Beschrifte Quelle, Map, Stand und Abweichungen.
Zeige native Materialien und Postprocessing ohne ImageGen-Nachbearbeitung.
Zusätzliche Blender-Offlinerender belegen keine Spiel-FPS.

Vergleiche beide Varianten einzeln bei gleichem Build, GPU, Auflösung/Pixelratio,
FOV, Seed/Layout, Population, Effekten und FPS-Limit. Verwende warme feste Fenster,
zuerst A/A zur Schwankung, dann Three.js → Blender → Three.js und bei knappen
Ergebnissen die umgekehrte Reihenfolge. Optimiere weitere Kandidaten einzeln mit
Abschalten/Ändern und Wiederherstellen. Leite das Framebudget aus `1000 / Ziel-FPS`
ab; trenne CPU- und GPU-Zeit und markiere fehlende GPU-Messung.

Nach relevanten bestehenden Checks normal neu laden und mit geschlossenen DevTools
kontrollieren: gleiche Kameras, Bewegung über LOD-Grenzen, aktive Effekte,
Shader-/Konsolenfehler, Menü, Hintergrund und wiederholter Mapwechsel. Liefere
Vergleichsbilder und eine Tabelle mit FPS/Framezeiten, durchschnittlichen/maximalen
Dreiecken und Draw Calls, CPU-/GPU-Zeit, sichtbaren Unterschieden und Aufwand je
Produktionsweg. Nenne Zielerreichung und offene Grenzen. Begründe anhand dieser
Ergebnisse, welcher Weg sich für die nächste Map eignet. Committe und pushe die
eigenen Assets, Quellen und Dokumentation nach Projektregeln.
