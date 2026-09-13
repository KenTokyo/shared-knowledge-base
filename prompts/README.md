# Map-Prompts

Die passende Datei vollständig im Chat des Zielprojekts mitgeben und die Angaben
oben ergänzen. Die ersten drei Vorlagen behandeln Performance; die drei neuen
Vorlagen erzeugen Maps mit ImageGen-Referenzen und vergleichen sie mit echten
Bildern aus der Spiel-Laufzeit.

| Zweck | Vorlage |
| --- | --- |
| Neue Map von Anfang an performant aufbauen | [Neue Map mit messbarer Performance](map-performance/01-neue-map-performance-prompt.md) |
| Bestehende Map messen und optimieren | [Bestehende Map schneller machen](map-performance/02-bestehende-map-optimieren-prompt.md) |
| Dreiecke, Draw Calls und wiederkehrende Spitzen verstehen | [Diagnose und Spitzen](map-performance/03-map-diagnose-und-spitzen-prompt.md) |
| Ein GPT-Modell erzeugt Referenzen und implementiert die gewählte Pipeline | [GPT + ImageGen + Map](map-generation/01-gpt-imagegen-map-prompt.md) |
| Ein Orchestrierer koordiniert Astra für Bilder und den vom Nutzer gewählten Implementierer | [Orchestrierte Map-Erzeugung](map-generation/02-orchestrierte-imagegen-map-prompt.md) |
| Dieselbe Map über Blender und Three.js bauen und fair vergleichen | [ImageGen → Blender / Three.js](map-generation/03-imagegen-blender-threejs-vergleich-prompt.md) |

## Standards für die drei Generierungs-Prompts

- **Größe:** 450 × 450 m als aufgerundeter Standard für neue Maps. Eigene Maße haben Vorrang; Spielgrenzen, Kollision und Spawns werden passend zur Größe und Spielbereichsform abgeleitet.
- **Stil:** „Ion 2“ wird als **AION 2-inspirierte Fantasy-Landschaft** interpretiert. Eigene Stilbeschreibung und Bildreferenzen überschreiben diese Annahme.
- **Pipeline:** In Variante 1 und 2 zwischen Three.js und Blender wählen; ohne Angabe gilt die vorhandene native Three.js-Pipeline. Variante 3 liefert beide Wege. Blender ist ein Werkzeug zum Erzeugen echter exportierter Geometrie; die Spiel-Laufzeit bleibt der vorhandene Renderer.
- **Referenz:** ImageGen-Ergebnisse speichern und ansehen. Side-by-Side zeigt das Konzept und den echten Laufzeit-Render. Blender-Offlinerender sind zusätzliche Design-Evidenz.
- **Modelle:** Anbieter, Modellkennung und Denkstufe lassen sich eintragen. Variante 2 trennt Orchestrierer, Astra-Bilderzeugung und Implementierung; ein fehlender Implementierer wird nicht stillschweigend ersetzt.
- **Leistungsziel:** Aus dem Zielprojekt oder der Nutzervorgabe ableiten. Silberhains bisheriges 600-FPS-Ziel und seine lokalen Messwerte sind keine allgemeine Vorgabe.

Die Leistungsregeln stehen jeweils kurz im Prompt und ausführlich unter diesen
absoluten Pfaden:

- [Three.js-Performance](</Users/kentoky/Documents/React Projects/shared-docs/threejs/PERFORMANCE.md>)
- [Vergleichbar messen](</Users/kentoky/Documents/React Projects/shared-docs/threejs/MEASURING.md>)
- [Leerlauf in Chrome und Electron](</Users/kentoky/Documents/React Projects/shared-docs/IDLE-PERFORMANCE.md>)

Auf einem anderen Rechner den dortigen Shared-Docs-Pfad verwenden und fehlende
Dateien benennen. Die lokalen Projektregeln und der aktuelle Nutzerauftrag gelten
weiter. Die Generierungs-Prompts erlauben für ihren konkreten Auftrag die benötigten
vorhandenen Laufzeitprüfungen.

## Ablage und Herkunft

Zentral gepflegt unter
[Shared Docs](</Users/kentoky/Documents/React Projects/shared-docs/prompts/README.md>),
auf Nutzerwunsch zusätzlich mit identischen sechs Dateien und diesem Index in
[Voxel Samurai Reborn](</Users/kentoky/Documents/React Projects/test-projects/voxel-samurai-reborn/prompts/README.md>).
Bei Änderungen beide Kopien gemeinsam aktualisieren. Das ist eine Prompt-Sammlung;
andere Spiele werden dadurch nicht automatisch umgebaut.

Ausgangspunkt war Silberhains rund 424 × 424 m großes
[Layout im Stand 5d0e8e272](https://github.com/KenTokyo/7-3D-Voxel-Samurai-Quiz/blob/5d0e8e272/public/maps/silberhain/layout.json);
der Nutzer hat den Prompt-Standard auf 450 × 450 m aufgerundet.
Für die Rollenbeschreibung wurde am 13.09.2026 geprüft: Astra kann das
Image-Generation-Werkzeug verwenden; die Rasterbilder entstehen durch dieses
Werkzeug. Modell- und Tool-Verfügbarkeit bei der Verwendung erneut prüfen.
Quellen: [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra),
[Image Generation](https://developers.openai.com/api/docs/guides/tools-image-generation).
