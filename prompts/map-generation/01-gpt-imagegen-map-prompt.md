# Neue Fantasy-Map: ein GPT-Modell, ImageGen und Umsetzung

Ein GPT-Modell übernimmt das vollständige Bildpaket sowie die beauftragte Implementierung und Prüfung. Diese Datei im Zielprojekt verwenden.

## Meine Angaben

- Projekt und Map-Name: `<absoluter Projektpfad, Name>`
- Stil und Referenzen: `<Beschreibung, vorhandene Bilder oder AION 2-inspirierte Fantasy>`
- Größe in Metern, Breite × Tiefe: `<optional; Standard: 450 × 450 m>`
- Umsetzung: `<Three.js oder Blender; ohne Angabe vorhandene native Three.js-Pipeline>`
- Arbeitsstufe: `<nur vollständiges Bildpaket oder Bildpaket und Umsetzung; aktuelle Nutzervorgabe geht vor>`
- GPT-Modell / Anbieter / Denkstufe: `<optional; sonst aktuelles Modell mit verfügbarem ImageGen-Werkzeug>`
- Spielweise und zu erhaltene Eigenschaften: `<Wege, Gegner, Klassen, Nahdetails, Effekte>`
- Zielhardware / Auflösung / FPS- oder Framezeit-Ziel: `<Angabe oder bestehender Projektstandard>`

## Auftrag und Standards

Erzeuge ein vollständiges ImageGen-Bild-, Material- und Assetpaket und, soweit
beauftragt, daraus eine hochwertige, spielbare Map. „Ion 2“ wird
als **AION 2-inspirierte Fantasy** angenommen: starke Silhouetten, natürliche
Vegetation, lesbare Wege und stimmige Materialien/Beleuchtung. Meine Vorgaben gehen vor.

Standardgröße: **450 × 450 m**. Eigene Maße haben Vorrang. Leite Terrain,
Spielgrenzen, Kollision, Spawns und Platzierungen passend zur Größe und
Spielbereichsform ab; dokumentiere Einheiten, Grenzen und Seed.

Lies Projektregeln und vorhandene Welt-/Asset-Module. In Reborn bleibt
`src/game/Game.ts` mit `src/world/` der einzige Welt-/Render-Owner. Erhalte
Produktoberfläche, Klassen und Gameplay. Für diesen Map-Auftrag sind die vorhandenen
Bild-, Browser-, Screenshot-, Gameplay- und Performance-Werkzeuge zur integrierten
Prüfung freigegeben. Nutze den bestehenden Prüfweg und sein geltendes Budget.

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

## Von ImageGen zur Map

1. Erzeuge, inspiziere und liefere das vollständige Paket gemäß dem Abschnitt oben: räumliche Ansichten, sämtliche Materialien/Texturen und sämtliche Assettypen. Prüfe Inventarabdeckung, Geografie und Licht; liefere Manifest und Galerie. Bei „nur Bildpaket“ endet die Ausführung hier.
2. Leite aus der geprüften Referenzversion Maßstab, Seed/Layout, Terrain, gegebenenfalls Wasserstand, Wege, Dichte und Materialzuordnung ab. Verwende die dokumentierten Vergleichsansichten und behebe offene Widersprüche vor abhängiger Umsetzung.
3. Setze die gewählte Pipeline vollständig um. **Three.js:** Geometrie und Materialien in den vorhandenen nativen Modulen. **Blender:** echte Szene bzw. reproduzierbares Python-Skript, tatsächlich erzeugte Exporte und Import in denselben Spielrenderer. Blender per Python/CLI genügt; MCP ist keine Voraussetzung. Benenne Transformationskonventionen, Materialzuordnung und Exportherkunft.
4. Verwende die zugeordneten Welttexturen mit passender Transparenz, Skalierung und Materialzuordnung und vervollständige die für die gewählte Pipeline benötigten Materialkanäle. Belege ihre tatsächliche Verwendung im Manifest. Erhalte Nahdetails, dichte Silhouetten und lesbare Wege; integriere Kollision, Spawn, vorhandene Map-Auswahl und saubere Ressourcenfreigabe.

Prüfe den tatsächlichen ImageGen-Zugang; das GPT-Modell ruft dafür ein Werkzeug
auf. Fehlende Bilder bleiben offen. [Tool-Beschreibung](https://developers.openai.com/api/docs/guides/tools-image-generation).

## Performance gehört zum Aufbau

Lies [Performance](</Users/kentoky/Documents/React Projects/shared-docs/threejs/PERFORMANCE.md>),
[Messregeln](</Users/kentoky/Documents/React Projects/shared-docs/threejs/MEASURING.md>) und
[Leerlauf](</Users/kentoky/Documents/React Projects/shared-docs/IDLE-PERFORMANCE.md>).
Liegt Shared Docs anderswo, verwende den dort vorhandenen Pfad und benenne fehlende Quellen.

- Plane Gelände, Vegetation, Wasser, Schatten und Nachbearbeitung getrennt. Erhalte nahe Geometrie; entfernte LOD-Stufen brauchen stabile Silhouetten, geeignete Bildgrößen/Abstände und Hysterese.
- Teile Geometrien/Materialien und verwende Instancing sinnvoll. Vergleiche räumliche Gruppen mit Instanz-Culling; mehr Chunks können mehr Draw Calls kosten. Halte Bounds korrekt und Sichtbarkeits-/LOD-Ergebnisse bei unverändertem Blick zwischengespeichert.
- Behandle Hauptansicht, Schatten und Spiegelung nach deren eigener Sichtbarkeit. Verschachtelte Durchläufe dürfen die Instanzpuffer des Hauptbilds nicht überschreiben. Prüfe Transparenz, Overdraw und Shaderkosten zusätzlich zur Geometrie.
- Vermeide unveränderte Uploads und dauernde Vollszenen-Scans. Leere Effektpools schlafen; aktive Effekte bleiben vollständig. Verborgene/inaktive Flächen stoppen eigene Render-/Simulationsarbeit. Räume Timer, Listener und Ressourcen auf; dekorative UI bleibt ohne Endlosschleifen.
- Nutze das vorhandene Diagnose-Panel für FPS/Framezeit, Dreiecke/Frame und Draw Calls/Frame, jeweils Fensterdurchschnitt und Spitze. Zähle alle Renderdurchläufe; zeige deren Häufigkeit sowie Asset-Bestand separat. Veröffentliche gedrosselt aus dem vorhandenen Loop; geschlossene Diagnose betreibt keine Detailmessung. [Zählung und Spitzen](../map-performance/03-map-diagnose-und-spitzen-prompt.md).

## Vergleich und Lieferung

Dieser Abschnitt gilt für die beauftragte Umsetzung; die Bildstufe liefert die
vollständige Galerie und das Manifest gemäß oben.

Liefere **Side-by-Side: ImageGen-Referenz | echter Render im Zielspiel** mit ähnlicher
Kamera und Beleuchtung. Beschrifte Quelle und Abweichungen; zeige native Materialien
und Postprocessing. Laufzeitbilder bleiben ohne ImageGen-Nachbearbeitung,
Blender-Offlinerender werden separat beschriftet.

Miss bei gleicher Hardware/GPU, Auflösung, Pixelratio, FOV, Seed, Population und
FPS-Begrenzung. Leite das Budget mit `1000 / Ziel-FPS` ab. Nutze Warm-up und feste
Messfenster, A/A zur Schwankung sowie A → Änderung B → wiederhergestelltes A für
Optimierungen. Erfasse CPU- und GPU-Zeit getrennt; fehlende GPU-Zeit bleibt als
ungemessen markiert. Prüfe nach normalem Neuladen mit geschlossenen DevTools echte
Pixel, Shaderfehler, LOD-Wechsel, aktive Effekte, Menü, Hintergrund und Mapwechsel.

Liefere Referenzen, Vergleichsbilder, verwendete Assets/Generatoren, geänderte
Quellpfade mit Gründen, Messbedingungen und Ergebnisse samt offenen Grenzen.
Führe die relevanten bestehenden Checks aus; Build und statische Zähler ersetzen
keine GPU-Abnahme. Committe und pushe die eigenen Änderungen nach Projektregeln.
