# Neue Fantasy-Map: Orchestrierer, Astra für ImageGen, gewählter Implementierer

Im Chat des Orchestrierers verwenden. Koordiniere die drei Rollen bis zur integrierten Map.

## Meine Angaben

- Projekt und Map-Name: `<absoluter Projektpfad, Name>`
- Stil / Bildreferenzen: `<Beschreibung oder AION 2-inspirierte Fantasy>`
- Größe in Metern, Breite × Tiefe: `<optional; Standard: 450 × 450 m>`
- Umsetzung: `<Three.js oder Blender; ohne Angabe vorhandene native Three.js-Pipeline>`
- Orchestrierer, Anbieter / Modell / Denkstufe: `<dieser Chat oder genaue Vorgabe>`
- Bilderzeugung: **GPT-6 Astra über ImageGen**; Anbieter / Modellkennung / Denkstufe: `<verfügbare Astra-Zuweisung>`
- Implementierer, Anbieter / genaue Modellkennung / Denkstufe: `<vom Nutzer einzutragen>`
- Spielweise / zu erhaltene Eigenschaften: `<Gameplay, Klassen, Dichte, Nahdetails, Effekte>`
- Zielhardware / Auflösung / Leistungsziel: `<Angabe oder bestehender Projektstandard>`

## Gemeinsamer Auftrag

Baue eine spielbare Map aus einer von Astra mit ImageGen erzeugten und geprüften Referenz. „Ion 2“ wird als **AION 2-inspirierte Fantasy-Landschaft** angenommen; meine Vorgaben gehen vor. Standardgröße: **450 × 450 m**, durch eigene Maße überschreibbar. Leite Spielgrenzen, Terrain, Kollision und Spawns passend zur Größe und Spielbereichsform ab. Halte Maßstab, Grenzen und Seed fest.

Lies Projektregeln und Arbeitsstand. Erhalte Produktoberfläche, Klassen und Gameplay; nutze den vorhandenen Welt-/Renderloop, in Reborn `src/game/Game.ts` und `src/world/`. Die genannten Agentenrollen sowie vorhandene Bild-, Browser-, Screenshot-, Gameplay- und Performance-Werkzeuge sind für diesen Auftrag freigegeben. Bestehende Prüfwege und Budgets gelten weiter.

## Rollen und Übergaben

| Rolle | Verantwortung | Konkretes Ergebnis |
| --- | --- | --- |
| Orchestrierer | Projekt prüfen, Modellzuweisung verifizieren, Arbeitsbereiche abgrenzen, Übergaben prüfen, integrieren und Git liefern | Gemeinsamer Auftrag, geprüfte Artefakte und Abschlussbericht |
| GPT-6 Astra | ImageGen ausführen, Bilder ansehen, konsistente Referenz und erforderliche Welttexturen liefern | Echte Bilddateien, ImageGen-Prompts, Version und Bild-/Materialmanifest |
| Gewählter Implementierer | Aus den freigegebenen Referenzdateien die ausgewählte Blender-/Three.js-Pipeline bauen und integrieren | Spielbare Map, Quellcode/Generatoren, Assets, Kollision, Cleanup und Prüfergebnisse |

Prüfe die tatsächlichen Anbieter, Modellkennungen, Denkstufen und Tool-Fähigkeiten; halte meine Zuweisung ein. Fehlt der Implementierer, frage gezielt danach und setze unabhängige Vorbereitung fort. Fehlt Modell-/Agentenzugang, liefere Übergabedateien und benenne die blockierte Rolle. Keine stille Ersatzbesetzung oder behaupteten Agentenergebnisse.

Lege eindeutige Schreibbereiche und einen Integrations-/Git-Verantwortlichen fest. Gemeinsame Layout-/Referenzdateien haben einen Besitzer und eine versionierte Fassung. Separate Chats isolieren keine Dateien: nutze getrennte Schreibbereiche oder einen autorisierten isolierten Workspace. Erhalte fremde Änderungen.

Lass Astra etwa Übersicht, Spielkamera, Wasserdetail und Vegetation/Landmarke mit gemeinsamer Geografie, Licht und Palette erzeugen. Prüfe die fertigen Bilddateien und deren Zugriff durch den Implementierer vor abhängiger Arbeit. Astra verwendet das [ImageGen-Werkzeug](https://developers.openai.com/api/docs/guides/tools-image-generation); [Modellbeschreibung](https://developers.openai.com/api/docs/models/gpt-6-astra).

Übergib Bildpfade/-prompts, Referenzversion, Maße/Einheiten, Spielgrenzen, Seed/Layout, Kameras, Materialpalette, Pipeline, Schreibbereiche und Performance-Regeln. Der Implementierer prüft die Dateien. **Blender** liefert echte Exporte aus einer Szene oder einem reproduzierbaren Python-Skript; Python/CLI genügt ohne MCP. **Three.js** erzeugt die Geometrie in vorhandenen Modulen. Beide Wege nutzen den nativen Spielrenderer.

## Performance-Vertrag für alle Rollen

Lies und übergib die absoluten Quellen: [Performance](</Users/kentoky/Documents/React Projects/shared-docs/threejs/PERFORMANCE.md>), [Messregeln](</Users/kentoky/Documents/React Projects/shared-docs/threejs/MEASURING.md>), [Leerlauf](</Users/kentoky/Documents/React Projects/shared-docs/IDLE-PERFORMANCE.md>). Bei anderer Ablage den vorhandenen Shared-Docs-Pfad verwenden; fehlende Dateien benennen.

- Nahdetails, Silhouetten, Dichte und aktive Effekte erhalten. LOD nach Bildgröße/Entfernung mit Hysterese; Instancing mit gemeinsamen Geometrien/Materialien. Gruppengröße gegen Draw Calls und Instanz-Culling abwägen.
- Korrekte Bounds und Sichtbarkeit je Haupt-, Schatten- und Spiegelungsdurchlauf. Verschachtelte Render benötigen unabhängige Instanzdaten. Unveränderte Sichtbarkeit/LOD zwischenspeichern; keine wiederholten statischen Uploads oder Vollszenen-Scans.
- Transparenz, Gras, Wasser, Schatten und Postprocessing separat bewerten. Bestandsgeometrie ist keine Dreiecks-/GPU-Kostenmessung. Leere Effektpools schlafen, aktive Fähigkeiten funktionieren; unsichtbare/inaktive Flächen stoppen ihre Arbeit, Ressourcen werden freigegeben, UI-Dekoration bleibt ohne Endlosschleifen.
- Bestehende Diagnose: FPS und Framezeit-Verteilung, Dreiecke/Frame und Draw Calls/Frame als Fensterdurchschnitt und Spitze über alle Renderdurchläufe. Zusatzdurchläufe samt Häufigkeit, Asset-Bestand und CPU-/GPU-Zeit getrennt ausweisen. Keine dauernde Detailmessung bei geschlossener Diagnose. [Details](../map-performance/03-map-diagnose-und-spitzen-prompt.md).
- Vergleich bei gleichem Build, GPU, Auflösung/Pixelratio, Kamera/FOV, Seed, Population, Effekten und FPS-Limit. Warme feste Fenster, A/A-Schwankung und A → Änderung B → wiederhergestelltes A. `1000 / Ziel-FPS` ist das Framebudget; keine ungeprüfte Übernahme fremder FPS-Ziele.

## Integration, Vergleich und Lieferung

Der Orchestrierer prüft Dateien und Ergebnisse anhand des bestehenden Prüfwegs. Liefere **Side-by-Side: ImageGen-Konzept | echter nativer Spiel-Render** mit ähnlicher Kamera und Beleuchtung. Beschrifte Herkunft und Abweichungen. Laufzeitbilder bleiben ohne ImageGen-Nachbearbeitung; Blender-Offlinerender sind separate Design-Evidenz.

Nach relevanten bestehenden Checks normal neu laden, DevTools für Abschlusswerte schließen und echte Bilder, Shaderfehler, LOD-Wechsel, aktive Effekte, Menü, Hintergrund und Mapwechsel kontrollieren. Ungeprüfte Zustände und fehlende GPU-Zeit bleiben ausdrücklich offen. Liefere Referenzen/Übergabe, implementierte Assets und Quellpfade mit Gründen, Vergleichsbilder, Messbedingungen und Ergebnisse. Der benannte Git-Verantwortliche committet und pusht die eigenen Änderungen nach Projektregeln; Agentenmeldungen allein sind keine bestandene Abnahme.
