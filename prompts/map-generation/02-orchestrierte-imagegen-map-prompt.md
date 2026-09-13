# Neue Fantasy-Map: Orchestrierer, Astra für ImageGen, gewählter Implementierer

Diese Datei im Chat des Orchestrierers verwenden. Koordiniere die drei Rollen mit
den tatsächlich verfügbaren Agenten-/Anbieterwerkzeugen bis zur integrierten Map.

## Meine Angaben

- Projekt und Map-Name: `<absoluter Projektpfad, Name>`
- Stil / Bildreferenzen: `<Beschreibung oder AION 2-inspirierte Fantasy>`
- Größe in Metern, Breite × Tiefe: `<optional; Standard unten>`
- Umsetzung: `<Three.js oder Blender; ohne Angabe vorhandene native Three.js-Pipeline>`
- Orchestrierer, Anbieter / Modell / Denkstufe: `<dieser Chat oder genaue Vorgabe>`
- Bilderzeugung: **GPT-6 Astra über ImageGen**; Anbieter / Modellkennung / Denkstufe: `<verfügbare Astra-Zuweisung>`
- Implementierer, Anbieter / genaue Modellkennung / Denkstufe: `<vom Nutzer einzutragen>`
- Spielweise / zu erhaltene Eigenschaften: `<Gameplay, Klassen, Dichte, Nahdetails, Effekte>`
- Zielhardware / Auflösung / Leistungsziel: `<Angabe oder bestehender Projektstandard>`

## Gemeinsamer Auftrag

Baue eine spielbare Map aus einer von Astra mit ImageGen erzeugten, gespeicherten
und angesehenen Referenz. „Ion 2“ wird als **AION 2-inspirierte Fantasy-Landschaft**
interpretiert; meine eigene Stilbeschreibung und Bilder haben Vorrang.
Standardgröße ist **424,26406871192853 × 424,26406871192853 m**, der aktuelle
Silberhain-Grundriss. Dessen kreisförmiger Spielbereich hat **202,2325394193526 m
Radius**. Eigene Maße überschreiben den Standard; Spielbereich, Terrain, Kollision,
Spawns und Dichte müssen dazu passen. Halte Maßstab, Grenzen und Seed fest.

Lies Projektregeln und bestehenden Arbeitsstand. Erhalte Produktoberfläche,
Klassen und Gameplay; integriere in den vorhandenen Welt-/Renderloop. In Reborn
sind das `src/game/Game.ts` und `src/world/`. Für diesen Auftrag sind die genannten
Agentenrollen und die vorhandenen Bild-/Browser-/Screenshot-/Gameplay-/Performance-
Werkzeuge zur integrierten Prüfung freigegeben. Nutze bestehende Prüfwege und
Budgets. Separate Chats allein schaffen keine getrennten Arbeitsverzeichnisse.

## Rollen und Übergaben

| Rolle | Verantwortung | Konkretes Ergebnis |
| --- | --- | --- |
| Orchestrierer | Projekt prüfen, Modellzuweisung verifizieren, Arbeitsbereiche abgrenzen, Übergaben prüfen, integrieren und Git liefern | Gemeinsamer Auftrag, geprüfte Artefakte und Abschlussbericht |
| GPT-6 Astra | ImageGen ausführen, Bilder ansehen, konsistente Referenz und erforderliche Welttexturen liefern | Echte Bilddateien, ImageGen-Prompts, Version und Bild-/Materialmanifest |
| Gewählter Implementierer | Aus den freigegebenen Referenzdateien die ausgewählte Blender-/Three.js-Pipeline bauen und integrieren | Spielbare Map, Quellcode/Generatoren, Assets, Kollision, Cleanup und Prüfergebnisse |

Prüfe die tatsächlich zurückgemeldeten Anbieter, Modellkennungen, Denkstufen und
Tool-Fähigkeiten. Übernimm meine Zuweisung unverändert. Fehlt die Angabe zum
Implementierer, frage gezielt danach und erledige währenddessen die unabhängige
Projekt-/Referenzvorbereitung. Wechsle bei fehlendem Modellzugang nicht heimlich
das Modell. Fehlen Agentenwerkzeuge, bereite nutzbare Übergabedateien vor und
benenne die konkret blockierte Rolle; ein nicht gestarteter Agent gilt nicht als erledigt.

Lege vor paralleler Arbeit eindeutige Schreibbereiche und einen Integrations-/Git-
Verantwortlichen fest. Gemeinsame Layout- und Referenzdateien haben einen Besitzer;
andere Rollen lesen dieselbe versionierte Fassung. Nutze getrennte Dateibereiche
oder einen bereits autorisierten isolierten Workspace. Erhalte fremde Änderungen.

Lass Astra etwa vier zusammenhängende Ansichten erstellen: Übersicht, Spielkamera,
Wasserdetail und Vegetation/Landmarke. Geografie, Wege, Licht und Palette müssen
zusammenpassen. Prüfe die fertigen Dateien und ihren Zugriff durch den Implementierer,
bevor davon abhängige Implementierung beginnt. Ein gestarteter Chat oder ein
Bildversprechen ersetzt kein verfügbares Artefakt. Astra verwendet das
[ImageGen-Werkzeug](https://developers.openai.com/api/docs/guides/tools-image-generation);
[Modellbeschreibung](https://developers.openai.com/api/docs/models/gpt-6-astra).

Die Übergabe enthält mindestens Bildpfade, Referenzversion, Bildprompts,
Breite/Tiefe/Einheiten, Spielgrenzen, Seed, Layout, Kameraliste, Materialpalette,
Pipelinewahl, Schreibbereiche und die folgenden Performance-Regeln. Der
Implementierer bestätigt diese Werte anhand der Dateien. **Blender** liefert
echte Exporte aus einer Szene oder einem reproduzierbaren Python-Skript; Python/CLI
genügt ohne MCP. **Three.js** erzeugt die Geometrie in den vorhandenen Modulen.
Beide Wege nutzen den nativen Spielrenderer und erhalten die gewünschte Bildqualität.

## Performance-Vertrag für alle Rollen

Lies und übergib die absoluten Quellen:
[Performance](</Users/kentoky/Documents/React Projects/shared-docs/threejs/PERFORMANCE.md>),
[Messregeln](</Users/kentoky/Documents/React Projects/shared-docs/threejs/MEASURING.md>),
[Leerlauf](</Users/kentoky/Documents/React Projects/shared-docs/IDLE-PERFORMANCE.md>).
Bei anderer Ablage den vorhandenen Shared-Docs-Pfad verwenden; fehlende Dateien benennen.

- Nahdetails, Silhouetten, Dichte und aktive Effekte erhalten. LOD nach Bildgröße/Entfernung mit Hysterese; Instancing mit gemeinsamen Geometrien/Materialien. Gruppengröße gegen Draw Calls und Instanz-Culling abwägen.
- Korrekte Bounds und Sichtbarkeit je Haupt-, Schatten- und Spiegelungsdurchlauf. Verschachtelte Render benötigen unabhängige Instanzdaten. Unveränderte Sichtbarkeit/LOD zwischenspeichern; keine wiederholten statischen Uploads oder Vollszenen-Scans.
- Transparenz, Gras, Wasser, Schatten und Postprocessing separat bewerten. Bestandsgeometrie ist keine Dreiecks-/GPU-Kostenmessung. Leere Effektpools schlafen, aktive Fähigkeiten funktionieren; unsichtbare/inaktive Flächen stoppen ihre Arbeit, Ressourcen werden freigegeben, UI-Dekoration bleibt ohne Endlosschleifen.
- Bestehende Diagnose: FPS und Framezeit-Verteilung, Dreiecke/Frame und Draw Calls/Frame als Fensterdurchschnitt und Spitze über alle Renderdurchläufe. Zusatzdurchläufe samt Häufigkeit, Asset-Bestand und CPU-/GPU-Zeit getrennt ausweisen. Keine dauernde Detailmessung bei geschlossener Diagnose. [Details](../map-performance/03-map-diagnose-und-spitzen-prompt.md).
- Vergleich bei gleichem Build, GPU, Auflösung/Pixelratio, Kamera/FOV, Seed, Population, Effekten und FPS-Limit. Warme feste Fenster, A/A-Schwankung und A → Änderung B → wiederhergestelltes A. `1000 / Ziel-FPS` ist das Framebudget; keine ungeprüfte Übernahme fremder FPS-Ziele.

## Integration, Vergleich und Lieferung

Der Orchestrierer prüft gelieferte Dateien und Ergebnisse selbst anhand des
bestehenden Prüfwegs. Liefere **Side-by-Side: ImageGen-Konzept und echter nativer
Spiel-Render** mit ähnlicher Kamera, Licht und Ausschnitt; Herkunft und verbleibende
Abweichungen klar beschriften. Keine ImageGen-Nachbearbeitung der Laufzeitbilder.
Ein Blender-Offlinerender ist separate Design-Evidenz und kein Laufzeitnachweis.

Nach relevanten bestehenden Checks normal neu laden, DevTools für Abschlusswerte
schließen und echte Bilder, Shaderfehler, LOD-Wechsel, aktive Effekte, Menü,
Hintergrund und Mapwechsel kontrollieren. Ungeprüfte Zustände und fehlende GPU-Zeit
bleiben ausdrücklich offen. Liefere Referenzen/Übergabe, implementierte Assets
und Quellpfade mit Gründen, Vergleichsbilder, Messbedingungen und Ergebnisse.
Der benannte Git-Verantwortliche committet und pusht die eigenen Änderungen nach
Projektregeln; Agentenmeldungen allein sind keine bestandene Abnahme.
