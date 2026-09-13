# Map-Diagnose: Dreiecke, Draw Calls und wiederkehrende Spitzen

Diese Datei im Chat des Zielprojekts mitgeben. Sie ist die dritte Variante für ein verlässliches Diagnose-Panel und für Fälle wie „600.000 Dreiecke, zwischendurch 1,4 Millionen“.

Lies zusätzlich [Performance](</Users/kentoky/Documents/React Projects/shared-docs/threejs/PERFORMANCE.md>), [Messregeln](</Users/kentoky/Documents/React Projects/shared-docs/threejs/MEASURING.md>) und [Leerlauf](</Users/kentoky/Documents/React Projects/shared-docs/IDLE-PERFORMANCE.md>). Bei anderer Ablage den vorhandenen Shared-Docs-Pfad verwenden und fehlende Quellen benennen. Die Kernregeln stehen auch direkt in diesem Prompt.

- Projekt und Map: `<absoluter Zielordner, Map-ID>`
- Beobachtung: `<Werte, Abstand und Dauer der Spitzen; Stillstand oder Bewegung>`
- Bedingungen: `<Hardware, Auflösung, Gegner, Fähigkeiten, betroffene Ansicht>`

## Auftrag

Prüfe den Weg vom Rendererzähler bis zur Anzeige. Ergänze oder korrigiere das bestehende Diagnose-Panel und kläre anhand einer begrenzten Messreihe, welche Spitzen echte Mehrarbeit und welche Darstellungs- oder Messfehler sind. Behalte Layout und Bedienung des Projekts bei; baue keinen zweiten HUD- oder Renderloop. Ändere die Map nur dort, wo eine belegte Ursache zum Auftrag gehört.

## Bedeutung der Zahlen

Zeige und beschrifte im geöffneten Panel mindestens:

| Wert | Messbedeutung |
| --- | --- |
| FPS und Framezeit | Derselbe vollständige Zeitraum; Frames geteilt durch gemessene Zeit, plus Framezeit p50/p95/p99 und Maximum |
| Dreiecke/Frame | Tatsächlich eingereichte Dreiecke, Fensterdurchschnitt und Spitze; ein letzter Einzelwert heißt ausdrücklich „letzter Frame“ |
| Draw Calls/Frame | Tatsächliche Zeichenaufrufe, ebenfalls Fensterdurchschnitt und Spitze |
| Renderdurchläufe | Hauptansicht, Schatten, Spiegelung und Nachbearbeitung mit Häufigkeit; passende Einzelanteile nur bei korrekter Zuordnung |
| Last und Bedingungen | Gegner/aktive Effekte, Auflösung/Pixelratio, FPS-Limit, Messfenster und aktive Diagnose-Abschaltungen |
| CPU und GPU | Getrennte Zeitmessungen; nicht verfügbare oder ungültige GPU-Zeit ausdrücklich als „nicht gemessen“ kennzeichnen |

Geladene Geometrie/Materialien/Instanzen sind zusätzliche Bestandszahlen. Eine mehrfach gezeichnete Geometrie kann pro Frame mehr Arbeit verursachen, ohne dass ein neues Mesh geladen wurde. Eingereichte Dreiecke sind weder sichtbare Pixel noch eine direkte Messung von Shaderkosten.

## Zählung und Veröffentlichung

- Lege die Grenze eines vollständigen Spiel-Frames am vorhandenen Frame-Owner fest. Erfasst werden sämtliche zugehörigen Renderdurchläufe. Lies nicht nur den letzten Vollbildpass aus und fasse nicht versehentlich mehrere Spiel-Frames zu einem zusammen.
- Bei Three.js/WebGLRenderer die installierte Version prüfen: Während der eigenen Messung kann `renderer.info.autoReset = false` nötig sein. Genau einmal pro vollständigem Spiel-Frame resetten, erst nach allen Durchläufen den fertigen Wert sammeln; beim Ende der Messung den vorherigen Zustand wiederherstellen. Bestehende Profiler und verschachtelte Render-Aufrufe berücksichtigen. Siehe [Renderer-Statistik](https://threejs.org/docs/pages/WebGLRenderer.html#info).
- Zähle verschachtelte Durchläufe nicht doppelt: Enthält der Hauptaufruf bereits die Spiegelung, darf sein Gesamtwert nicht noch einmal zu deren Einzelwert addiert werden. Für eine Aufteilung exklusive Anteile bestimmen oder nicht trennbare Anteile klar kennzeichnen. Kontrolliere die Summe gegen die Gesamtzahl desselben Frames.
- Sammle die billigen Zähler jedes vollständigen Frames in einem begrenzten Fenster. Berechne Dreieck-/Draw-Call-Mittel über die Zahl der erfassten Frames. Einzelne Anzeigezeitpunkte sind kein Ersatz für diese Sammlung. Speichere nur begrenzte Rohdaten oder einen Ringpuffer; keine wachsenden Listen und keine fortlaufenden Szenen-Scans.
- Aktualisiere nur das Diagnose-Panel, beispielsweise viermal pro Sekunde. Nutze dafür die vorhandene Spielschleife. Stoppe eigene Detailmessung, Quantilberechnung und UI-Veröffentlichung bei geschlossener Diagnose; im Hintergrund gelten die normalen Suspend-Regeln. Leere Fenster zeigen „keine Messung“, keine erfundenen Nullkosten.
- Tab-Pausen und Debugger-Unterbrechungen getrennt markieren. Echte lange Frames im aktiven Spiel bleiben als Ausreißer sichtbar. Setze Fenster bei Map-/Qualitätswechsel sinnvoll zurück und kennzeichne Warm-up.
- Miss CPU-Abschnitte und GPU-Arbeit mit geeigneten getrennten Instrumenten. CPU-Zeit kann Treiberwartezeit enthalten; `performance.now()` allein misst keine GPU-Zeit. GPU-Abfragen asynchron abholen, ungültige/disjunkte Werte verwerfen, begrenzte Queries freigeben. Zusätzliche manuelle Render- oder Readback-Proben gehören nicht in den normalen FPS-Vergleich.

## Wiederkehrende Spitzen erklären

Nimm bei identischer Kamera eine begrenzte Zeitreihe auf, die mehrere Spitzen umfasst. Ordne hohe Zählwerte dem gleichen Frame zu wie dessen Dauer, Renderdurchläufe und Ereignisse. Prüfe insbesondere:

1. **Spiegelung oder Schatten aktualisiert:** Ein Zusatzdurchlauf zeichnet Teile der Welt erneut. Ein seltener Renderer-Snapshot kann gerade diesen teureren Frame erwischen. Das ist reale Arbeit für diesen Frame; die Anzeige beweist aber nicht, dass sie während ihrer gesamten sichtbaren Dauer anfällt.
2. **LOD oder Sichtbarkeit gewechselt:** Kamera, Zoom, unpassende Bounds, Schattenkamera und instabile Übergangsgrenzen können die eingereichte Geometrie ändern. Zähle sichtbare Instanzen und aktive Detailstufen, ohne ständig die ganze Szene zu durchsuchen.
3. **Spielereignis oder Ressourcenarbeit:** Gegner, Fähigkeiten, Terrain-Updates, Asset-Uploads, Shader-Kompilierung oder Speicherbereinigung mit der Zeitreihe abgleichen. Manche Ruckler erhöhen die Framezeit, ohne die Dreieckszahl zu verändern.
4. **Messfehler oder Abtastmuster:** Reset zu früh/spät, anderer Render-Owner, Aufnahme-Render, verschachtelter Aufruf oder nur vier Stichproben pro Sekunde können das Bild verfälschen. Verschiedene Takte können scheinbar langsame regelmäßige Spitzen erzeugen.

Isoliere die vermutete Ursache einzeln und stelle sie wieder her, etwa Spiegelungsaktualisierung A → eingefroren B → wieder aktiv A. Ändere nicht zugleich Auflösung, Kamera und mehrere Effekte. Vergleiche Framezeit und Bild; glätte die Anzeige nicht so, dass reale Spitzen verschwinden. Durchschnitt, Maximum und Aktualisierungsereignis sollen gemeinsam verständlich sein.

Für Silberhain wurde am 2026-09-13 im Stand `5d0e8e272` ein konkretes Beispiel im Quellcode gefunden: Die Anzeige veröffentlicht alle 0,25 Sekunden Dreiecke/Draw Calls des letzten Frames; die sichtbare Wasserreflexion wird höchstens 30-mal pro Sekunde neu gerendert. Diese Kombination kann wechselnde Zählwerte erklären. Ein beobachteter Abstand von drei bis vier Sekunden ist damit noch nicht durch eine passende Zeitreihe nachgewiesen. Verallgemeinere diese lokale Ursache nicht auf andere Projekte.

## Kontrolle und Ergebnis

Nutze vorhandene Checks für Gesamtzähler, Renderdurchlauf-Zuordnung und Fensterbildung. Prüfe im echten Zielrenderer einen ruhigen Blick, einen reproduzierbaren Zusatzdurchlauf, Bewegung und aktive Effekte. Kontrolliere den ausgelieferten Stand nach normalem Neuladen, mit geschlossenen DevTools, außerdem geschlossene Diagnose, Menü, Hintergrund und Mapwechsel. Respektiere den bestehenden Prüfweg und die geltenden Projektfreigaben.

Liefere die Ursache mit Codepfad und zeitlichem Beleg, vorherige/neue Anzeigebedeutung, Vergleichswerte samt Bildern sowie Grenzen. Trenne „im Code erkannt“, „durch Messung bestätigt“ und „noch Vermutung“. Wenn eine Live-Gegenprobe fehlt, bleibt die Ursache vorläufig. Commit und Push folgen den Projektregeln.

Lokales Beispiel im Stand 5d0e8e272: [Frame-Sammlung und Anzeige](https://github.com/KenTokyo/7-3D-Voxel-Samurai-Quiz/blob/5d0e8e272/src/game/Game.ts), [Wasserreflexion](https://github.com/KenTokyo/7-3D-Voxel-Samurai-Quiz/blob/5d0e8e272/src/world/silberhain/water.ts). Engine-Quelle für den zusätzlichen Render-Aufruf: [Three.js Reflector, r169](https://github.com/mrdoob/three.js/blob/r169/examples/jsm/objects/Reflector.js).
