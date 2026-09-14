# Bestehende Map gezielt schneller machen

Diese Datei im Chat des Zielprojekts mitgeben. Es ist ein Umsetzungsauftrag für das genannte Projekt, kein Auftrag zum Umbau aller anderen Spiele.

Lies zusätzlich [Performance](</Users/kentoky/Documents/React Projects/shared-docs/threejs/PERFORMANCE.md>), [Messregeln](</Users/kentoky/Documents/React Projects/shared-docs/threejs/MEASURING.md>) und [Leerlauf](</Users/kentoky/Documents/React Projects/shared-docs/IDLE-PERFORMANCE.md>). Bei anderer Ablage den vorhandenen Shared-Docs-Pfad verwenden und fehlende Quellen benennen. Die Kernregeln stehen auch direkt in diesem Prompt.

- Projekt und Map: `<absoluter Zielordner, Map-ID>`
- Problem: `<niedrige FPS, hohe Dreiecke/Draw Calls, Ruckler oder konkrete Stelle>`
- Zielhardware, Auflösung und Leistungsziel: `<Vorgabe oder Projektstandard>`
- Zu erhalten: `<Optik, Nahdetails, Effekte, Population, Gameplay>`

## Auftrag

Finde den tatsächlichen Engpass der vorhandenen Map, optimiere ihn und kontrolliere den ausgelieferten Stand. Lies Projektregeln und aktuellen Arbeitsstand, sichere die Vergleichsbasis und erhalte fremde Änderungen. Bleibe in der vorhandenen Welt- und Renderlaufzeit. Hohe Dreieckszahlen allein sind noch keine Ursache für schlechte FPS.

## 1. Ausgangszustand messen

Erfasse Hardware/GPU, Build und Version, Auflösung, Pixelratio, FPS-Limit, Kamera/FOV, Seed, Gegner, Effekte und Qualitätseinstellungen. Verwende feste Spielansichten und eine repräsentative Bewegung. Miss eine sichtbare Szene ohne Gegner und aktiven Kampf getrennt; Menüs und Hintergrund sind eigene Leerlaufzustände.

Prüfe das vorhandene Diagnose-Panel und ergänze fehlende **Dreiecke und Draw Calls pro Frame**. Zähle alle zum Spielbild gehörenden Renderdurchläufe. Zeige Fensterdurchschnitt und Spitze statt eines scheinbaren Durchschnitts aus nur einem Frame. Erfasse FPS, Framezeit mit p50/p95/p99, CPU-Arbeit und echte GPU-Zeit, soweit verfügbar. Bestandsgeometrie, eingereichte Geometrie und Pixel-/Shaderarbeit dürfen nicht verwechselt werden. Details: [Diagnose und Spitzen](03-map-diagnose-und-spitzen-prompt.md).

Miss zuerst zweimal denselben unveränderten Zustand (A/A), um die normale Schwankung zu sehen. Nach Warm-up mehrere feste Fenster nutzen, beispielsweise dreimal zehn Sekunden. Der bestehende native Messweg hat Vorrang; baue keine zweite Szene oder eigene Renderpipeline für bessere Zahlen.

## 2. Ursachen einzeln prüfen

Ordne die teuersten Gruppen und Renderdurchläufe nach gemessenen Kosten: Laub, Gras, Gelände, Felsen/Bauten, Figuren/Effekte, Schatten, Wasserreflexion, Lichtberechnung und Nachbearbeitung. Prüfe auch CPU-Traversierung, Uploads, Allokationen und Shader-Kompilierung. Verwende gezielte Abschalt- oder Einfrierversuche als Diagnose und stelle jede Änderung wieder her.

Wähle passende Kandidaten nach erwartetem Gewinn, sichtbarem Risiko und Aufwand:

| Befund | Zu vergleichender Ansatz |
| --- | --- |
| Viel entfernte Geometrie | LOD mit erhaltener Nahgeometrie, stabilen Silhouetten und Hysterese; bei Bedarf geeignete Ersatzmodelle/Normalmaps |
| Viele kleine Zeichenaufrufe | Gemeinsame Materialien, Instancing/Batches; zusätzliche Gruppen pro Material, Detailstufe und Renderdurchlauf mitzählen |
| Viel unsichtbare Geometrie | Korrekte Bounds, Frustum-Culling pro Instanz oder sinnvoller räumlicher Gruppe; Schatten und Spiegelung separat behandeln |
| Hohe Vertex-Arbeit | Innenflächen entfernen, passende Vertices indizieren, tatsächlich teure Meshes vereinfachen; Attribute und Kanten erhalten |
| Hohe Pixel-/Materialkosten | Überlagerung, Transparenz, Beleuchtung und Shaderpfade isolieren; vollständige aktive Effekte gegenprüfen |
| Teure wiederkehrende Zusatzdurchläufe | Schatten- und Spiegelungsarbeit, Invalidierung, benötigte Auflösung und Taktung untersuchen; Bewegung und Qualität vergleichen |
| CPU-Arbeit trotz unverändertem Zustand | Sichtbarkeit/LOD sinnvoll zwischenspeichern, unveränderte Uploads vermeiden, leere Pools schlafen lassen und unnötige Traversierung entfernen |
| Nachgewiesener Speicher-/Sichtbarkeitsengpass | Streaming, HLOD oder Occlusion Culling gegen ihre Verwaltungs- und Übergangskosten vergleichen |

Instancing allein reduziert keine Dreiecke. Kleinere Chunks können mehr Draw Calls erzeugen. Ein niedrigerer Dreieckszähler beweist keine schnellere GPU. Ein Engine-Wechsel, WebGPU oder WASM ist ein eigener Vergleich mit vollständiger Funktionsgleichheit, kein automatischer nächster Schritt.

## 3. Gewinner übernehmen

Vergleiche jeweils A → Änderung B → wiederhergestelltes A im gleichen Blick und unter denselben Bedingungen. Wiederhole knappe oder widersprüchliche Ergebnisse, gegebenenfalls in umgekehrter Reihenfolge. Ein Gewinn innerhalb der normalen A/A-Schwankung ist nicht belastbar. Bewerte anschließend die sinnvolle Kombination; Einzelgewinne lassen sich nicht einfach addieren.

Übernimm nur nachvollziehbare Verbesserungen. Veränderte Auflösung, entfernte Effekte, geringere Population oder geänderte Materialien sind Qualitätsänderungen und müssen sichtbar im Vergleich stehen. Erhalte geschützte Eigenschaften; verschweige keine gröberen entfernten Details. Entferne verworfene Prototypen und ersetzten Code.

## 4. Ausgelieferten Stand kontrollieren

Nach den passenden bestehenden Checks normal neu laden und unter denselben Bedingungen messen. Prüfe echte Bilder, Shader-/Konsolenfehler, LOD-Wechsel hin und zurück, Kameradrehungen, Schatten außerhalb der Hauptansicht, Spiegelungen und aktive Fähigkeiten samt anschließendem Schlafen ihrer Pools. Kontrolliere Stillstand im Menü/Hintergrund und Ressourcenfreigabe beim Mapwechsel.

Liefere eine kurze Tabelle mit FPS, Framezeit-Verteilung, Dreiecken/Frame und Draw Calls/Frame, jeweils Durchschnitt und Spitze; ergänze CPU-/GPU-Zeiten mit Messmethode und Grenzen. Nenne Sichtbedingungen, geänderte Pfade und Gründe, behaltene/verworfene Kandidaten, sichtbare Unterschiede und ungeprüfte Zustände. Behaupte weder GPU-Abnahme aufgrund eines Builds noch Zielerreichung aufgrund eines einzelnen schnellen Fensters. Commit und Push folgen den Projektregeln.

Herkunft dieses Vorgehens: [Silberhain-Vergleich, Stand 5d0e8e272](https://github.com/KenTokyo/7-3D-Voxel-Samurai-Quiz/blob/5d0e8e272/docs/rebuild/silberhain/verification.md#lod-and-600-fps--latest-control). Seine Abstände, Zählwerte und FPS sind ein lokales Ergebnis, keine Vorgabe für andere Maps.
