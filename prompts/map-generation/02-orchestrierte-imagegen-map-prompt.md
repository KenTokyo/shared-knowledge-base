# Neue Fantasy-Map: Orchestrierer, Astra für ImageGen, gewählter Implementierer

Im Chat des Orchestrierers verwenden. Koordiniere die Rollen bis zum vollständigen Bildpaket bzw. zur beauftragten integrierten Map.

## Meine Angaben

- Projekt und Map-Name: `<absoluter Projektpfad, Name>`
- Stil / Bildreferenzen: `<Beschreibung oder AION 2-inspirierte Fantasy>`
- Größe in Metern, Breite × Tiefe: `<optional; Standard: 450 × 450 m>`
- Umsetzung: `<Three.js oder Blender; ohne Angabe vorhandene native Three.js-Pipeline>`
- Arbeitsstufe: `<nur vollständiges Bildpaket oder Bildpaket und Umsetzung; aktuelle Nutzervorgabe geht vor>`
- Orchestrierer, Anbieter / Modell / Denkstufe: `<dieser Chat oder genaue Vorgabe>`
- Bilderzeugung: **GPT-6 Astra über ImageGen**; Anbieter / Modellkennung / Denkstufe: `<verfügbare Astra-Zuweisung>`
- Implementierer, Anbieter / genaue Modellkennung / Denkstufe: `<vom Nutzer einzutragen>`
- Spielweise / zu erhaltene Eigenschaften: `<Gameplay, Klassen, Dichte, Nahdetails, Effekte>`
- Zielhardware / Auflösung / Leistungsziel: `<Angabe oder bestehender Projektstandard>`

## Gemeinsamer Auftrag

Lass Astra mit ImageGen ein vollständiges, geprüftes Bild-, Material- und Assetpaket erzeugen und baue daraus, soweit beauftragt, eine spielbare Map. „Ion 2“ wird als **AION 2-inspirierte Fantasy-Landschaft** angenommen; meine Vorgaben gehen vor. Standardgröße: **450 × 450 m**, durch eigene Maße überschreibbar. Leite Spielgrenzen, Terrain, Kollision und Spawns passend zur Größe und Spielbereichsform ab. Halte Maßstab, Grenzen und Seed fest.

Lies Projektregeln und Arbeitsstand. Erhalte Produktoberfläche, Klassen und Gameplay; nutze den vorhandenen Welt-/Renderloop, in Reborn `src/game/Game.ts` und `src/world/`. Die genannten Agentenrollen sowie vorhandene Bild-, Browser-, Screenshot-, Gameplay- und Performance-Werkzeuge sind für diesen Auftrag freigegeben. Bestehende Prüfwege und Budgets gelten weiter.

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

## Rollen und Übergaben

| Rolle | Verantwortung | Konkretes Ergebnis |
| --- | --- | --- |
| Orchestrierer | Projekt prüfen, Modellzuweisung verifizieren, Arbeitsbereiche abgrenzen, Übergaben prüfen, integrieren und Git liefern | Gemeinsamer Auftrag, geprüfte Artefakte und Abschlussbericht |
| GPT-6 Astra | Vollständiges Inventar abdecken, ImageGen ausführen, sämtliche Szenen-, Material-/Textur- und Assetansichten erzeugen und ansehen | Echte Bilddateien, exakte Prompts, Version, vollständiges Manifest, Galerie und Abdeckungsbericht |
| Gewählter Implementierer | Aus den freigegebenen Referenzdateien die ausgewählte Blender-/Three.js-Pipeline bauen und integrieren | Spielbare Map, Quellcode/Generatoren, Assets, Kollision, Cleanup und Prüfergebnisse |

Prüfe die tatsächlichen Anbieter, Modellkennungen, Denkstufen und Tool-Fähigkeiten; halte meine Zuweisung ein. Fehlt bei beauftragter Umsetzung der Implementierer, frage gezielt danach und setze unabhängige Vorbereitung fort. Bei „nur Bildpaket“ ist kein Implementierer erforderlich. Fehlt Modell-/Agentenzugang, liefere Übergabedateien und benenne die blockierte Rolle. Keine stille Ersatzbesetzung oder behaupteten Agentenergebnisse.

Lege eindeutige Schreibbereiche und einen Integrations-/Git-Verantwortlichen fest. Gemeinsame Layout-/Referenzdateien haben einen Besitzer und eine versionierte Fassung. Separate Chats isolieren keine Dateien: nutze getrennte Schreibbereiche oder einen autorisierten isolierten Workspace. Erhalte fremde Änderungen.

Lass Astra das gesamte Paket gemäß dem Abschnitt oben erzeugen. Der Orchestrierer gleicht Inventar und Dateien ab und prüft Geografie, Licht sowie Material- und Assetabdeckung. Drei Szenenbilder oder eine reine Materialliste sind keine vollständige Übergabe. Bei „nur Bildpaket“ endet die Ausführung mit Galerie, Manifest und Abdeckungsbericht. Astra verwendet das [ImageGen-Werkzeug](https://developers.openai.com/api/docs/guides/tools-image-generation); [Modellbeschreibung](https://developers.openai.com/api/docs/models/gpt-6-astra).

Bei beauftragter Umsetzung übergib alle Originalbilder, Galerie, Bildprompts/Eingangsreferenzen, Inventar/Manifest, Referenzversion, Maße/Einheiten, Spielgrenzen, Seed/Layout, Kameras, Lichtquellen, Materialkanäle, Asset-/Materialzuordnungen, offene Punkte, Pipeline, Schreibbereiche und Performance-Regeln. Der Implementierer öffnet die für seine Arbeit benötigten Bilder tatsächlich; Pfadlisten oder Zusammenfassungen allein reichen nicht. Stelle Zugriff durch die verwendeten Werkzeuge sicher und kläre fehlende Ansichten vor abhängiger Arbeit. **Blender** liefert echte Exporte aus einer Szene oder einem reproduzierbaren Python-Skript; Python/CLI genügt ohne MCP. **Three.js** erzeugt die Geometrie in vorhandenen Modulen. Beide Wege nutzen den nativen Spielrenderer und belegen die Verwendung der Materialien und Assets im Manifest.

## Performance-Vertrag für alle Rollen

Lies und übergib die absoluten Quellen: [Performance](</Users/kentoky/Documents/React Projects/shared-docs/threejs/PERFORMANCE.md>), [Messregeln](</Users/kentoky/Documents/React Projects/shared-docs/threejs/MEASURING.md>), [Leerlauf](</Users/kentoky/Documents/React Projects/shared-docs/IDLE-PERFORMANCE.md>). Bei anderer Ablage den vorhandenen Shared-Docs-Pfad verwenden; fehlende Dateien benennen.

- Nahdetails, Silhouetten, Dichte und aktive Effekte erhalten. LOD nach Bildgröße/Entfernung mit Hysterese; Instancing mit gemeinsamen Geometrien/Materialien. Gruppengröße gegen Draw Calls und Instanz-Culling abwägen.
- Korrekte Bounds und Sichtbarkeit je Haupt-, Schatten- und Spiegelungsdurchlauf. Verschachtelte Render benötigen unabhängige Instanzdaten. Unveränderte Sichtbarkeit/LOD zwischenspeichern; keine wiederholten statischen Uploads oder Vollszenen-Scans.
- Transparenz, Gras, Wasser, Schatten und Postprocessing separat bewerten. Bestandsgeometrie ist keine Dreiecks-/GPU-Kostenmessung. Leere Effektpools schlafen, aktive Fähigkeiten funktionieren; unsichtbare/inaktive Flächen stoppen ihre Arbeit, Ressourcen werden freigegeben, UI-Dekoration bleibt ohne Endlosschleifen.
- Bestehende Diagnose: FPS und Framezeit-Verteilung, Dreiecke/Frame und Draw Calls/Frame als Fensterdurchschnitt und Spitze über alle Renderdurchläufe. Zusatzdurchläufe samt Häufigkeit, Asset-Bestand und CPU-/GPU-Zeit getrennt ausweisen. Keine dauernde Detailmessung bei geschlossener Diagnose. [Details](../map-performance/03-map-diagnose-und-spitzen-prompt.md).
- Vergleich bei gleichem Build, GPU, Auflösung/Pixelratio, Kamera/FOV, Seed, Population, Effekten und FPS-Limit. Warme feste Fenster, A/A-Schwankung und A → Änderung B → wiederhergestelltes A. `1000 / Ziel-FPS` ist das Framebudget; keine ungeprüfte Übernahme fremder FPS-Ziele.

## Integration, Vergleich und Lieferung

Dieser Abschnitt gilt für die beauftragte Umsetzung; die Bildstufe liefert die
vollständige Galerie und das Manifest gemäß oben.

Der Orchestrierer prüft Dateien und Ergebnisse anhand des bestehenden Prüfwegs. Liefere **Side-by-Side: ImageGen-Konzept | echter nativer Spiel-Render** mit ähnlicher Kamera und Beleuchtung. Beschrifte Herkunft und Abweichungen. Laufzeitbilder bleiben ohne ImageGen-Nachbearbeitung; Blender-Offlinerender sind separate Design-Evidenz.

Nach relevanten bestehenden Checks normal neu laden, DevTools für Abschlusswerte schließen und echte Bilder, Shaderfehler, LOD-Wechsel, aktive Effekte, Menü, Hintergrund und Mapwechsel kontrollieren. Ungeprüfte Zustände und fehlende GPU-Zeit bleiben ausdrücklich offen. Liefere Referenzen/Übergabe, implementierte Assets und Quellpfade mit Gründen, Vergleichsbilder, Messbedingungen und Ergebnisse. Der benannte Git-Verantwortliche committet und pusht die eigenen Änderungen nach Projektregeln; Agentenmeldungen allein sind keine bestandene Abnahme.
