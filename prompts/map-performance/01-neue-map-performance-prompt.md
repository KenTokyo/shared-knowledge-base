# Neue Map mit messbarer Render-Performance

Diese Datei im Chat des Zielprojekts mitgeben. Angaben ergänzen; fehlende Werte aus dem Projekt ableiten und als Annahme nennen. Der Prompt gilt auch für andere Spiele und Engines.

Lies zusätzlich [Performance](</Users/kentoky/Documents/React Projects/shared-docs/threejs/PERFORMANCE.md>), [Messregeln](</Users/kentoky/Documents/React Projects/shared-docs/threejs/MEASURING.md>) und [Leerlauf](</Users/kentoky/Documents/React Projects/shared-docs/IDLE-PERFORMANCE.md>). Bei anderer Ablage den vorhandenen Shared-Docs-Pfad verwenden und fehlende Quellen benennen. Die Kernregeln stehen auch direkt in diesem Prompt.

- Projekt: `<absoluter Zielordner>`
- Map und gewünschtes Aussehen: `<Beschreibung oder Referenz>`
- Größe, Spielweise, Gegner und Effekte: `<Rahmen>`
- Zielhardware, Auflösung und Leistungsziel: `<Projektstandard oder konkrete Vorgabe>`
- Besonders zu erhalten: `<Nahdetails, Silhouetten, Beleuchtung, Gameplay>`

## Auftrag

Erstelle die Map in der vorhandenen Welt- und Renderlaufzeit. Plane ihre Renderkosten von Anfang an mit und liefere eine tatsächlich spielbare, geprüfte Map. Lies zuerst die Projektregeln und die zuständigen Welt-, Asset-, Render- und Diagnosemodule. Verwende bestehende Systeme und den vorhandenen Messweg.

Leite aus dem FPS-Ziel das Zeitbudget ab: `1000 / Ziel-FPS` Millisekunden pro Frame. Definiere die Bedingungen dazu, insbesondere Auflösung, Kamerablick, Gegner und aktive Fähigkeiten. Eine ruhende sichtbare Spielszene, aktiver Kampf und ein verborgenes Spiel sind verschiedene Zustände. Übernimm keine FPS-Zahlen oder Dreiecksgrenzen ungeprüft aus anderen Spielen.

## Aufbau der Map

- Plane die teuersten Gruppen einzeln: Gelände, Baumkronen, Gras, Felsen/Bauten, Wasser, Schatten und Effekte. Unterscheide vollständige Asset-Geometrie, platzierte Instanzen und tatsächlich pro Frame eingereichte Geometrie über alle Renderdurchläufe.
- Bewahre gute Nahdetails. Verwende für entfernte Objekte passende Detailstufen (LOD); wähle Übergänge anhand ihrer Bildgröße, Kamera und Skalierung. Verhindere ständiges Hin- und Herschalten mit Hysterese. Prüfe Silhouette, Kronenabdeckung und sichtbare Übergänge. Fremde LOD-Abstände sind nur Versuchskandidaten.
- Verwende gemeinsame Geometrien und Materialien für wiederholte Objekte. Instancing spart Zeichenaufrufe, vereinfacht aber das einzelne Modell nicht. Vergleiche räumliche Gruppen mit Instanz-Culling: zu viele kleine Gruppen erhöhen Draw Calls, eine riesige Gruppe kann zu viel unsichtbare Geometrie zeichnen.
- Setze korrekte Bounds für verformte und instanzierte Geometrie. Hauptkamera, Schatten und Spiegelung brauchen die für ihren jeweiligen Blick sichtbaren Objekte. Außerhalb der Hauptkamera können noch Schattenwerfer und Spiegelungsobjekte benötigt werden. Verschachtelte Renderdurchläufe dürfen die Instanzdaten der Hauptansicht nicht überschreiben.
- Entferne unnötige Innenflächen und nutze indizierte Vertices, soweit Normalen, UVs, Farben und harte Kanten das erlauben. Nutze vereinfachte Meshes und Normalmaps dort, wo die Oberflächendetails damit erhalten bleiben; eine Normalmap ersetzt keine Silhouette.
- Prüfe neben Geometrie auch überlagerte transparente Flächen, Grasmaterialien, Lichtberechnung, Schatten und Nachbearbeitung. Wenige Dreiecke können durch teure Pixelberechnung trotzdem langsam sein. HLOD, Occlusion Culling oder Streaming nur bei einem passenden, belegten Engpass ergänzen.
- Halte statische Daten statisch: keine unveränderten Instanzpuffer pro Frame hochladen, keine dauernden Vollszenen-Scans. Leere Effektpools schlafen, aktive Effekte funktionieren vollständig. Verborgene Flächen stoppen ihre Render-/Simulationsarbeit; Ressourcen, Listener und veraltete Ladevorgänge werden aufgeräumt.

## Diagnose gehört zur Lieferung

Erweitere das vorhandene Diagnose-Panel, falls diese Werte fehlen: FPS, Framezeit, **Dreiecke pro Frame und Draw Calls pro Frame**. Zeige für Dreiecke und Draw Calls mindestens Durchschnitt und Spitze eines beschrifteten Messfensters; halte Framezeit-Ausreißer mit p95/p99 sichtbar. Ein einzelner abgegriffener Frame darf nicht als Durchschnitt erscheinen.

Zähle das vollständige Spielbild einschließlich Schatten, Spiegelungen und Postprocessing. Zeige zusätzliche Renderdurchläufe und ihre Häufigkeit getrennt, soweit korrekt messbar. Geladene Geometrie ist eine eigene Bestandszahl. Veröffentliche UI-Werte gedrosselt aus der vorhandenen Spielschleife; keine React-Aktualisierung pro Frame und keine laufende Detailmessung bei geschlossener Diagnose. Der [Diagnose-Prompt](03-map-diagnose-und-spitzen-prompt.md) beschreibt die Zählung genauer.

## Vergleich und Abschluss

Teste eine kleine repräsentative Szene früh und später dieselben Standorte in der fertigen Map. Prüfe Spielkamera, weite Übersicht, Bewegung über LOD-Grenzen, Spiegelungen und aktiven Kampf. Nutze denselben Build-Modus, Seed, Blick, FOV, Pixelratio, Auflösung und dieselbe Population. Prüfe auch FPS-Limit und tatsächliche GPU; bezeichne Software- oder Headless-Messungen korrekt.

Lass die Szene warm werden. Miss mehrere feste Fenster, beispielsweise dreimal zehn Sekunden nach fünf Sekunden Warm-up. Vergleiche eine Änderung einzeln und stelle den Ausgangszustand zur Gegenprobe wieder her. Erfasse CPU-Arbeit und GPU-Zeit getrennt; wenn GPU-Zeit nicht messbar ist, sage das. Schließe DevTools für die abschließende Messung und prüfe den ausgelieferten Stand nach normalem Neuladen.

Führe die passenden bestehenden Prüfungen aus und kontrolliere echte Bilder sowie Shader-/Konsolenfehler. Erhalte die gewünschte Optik und Funktion; entferne verworfene Versuche. Liefere geänderte Pfade mit Begründung, Bedingungen und Vorher/Nachher-Werten, Vergleichsbilder sowie verbleibende Grenzen. Berichte ein verfehltes Leistungsziel ausdrücklich. Commit und Push folgen den Regeln des Zielprojekts.

Fachreferenzen für Three.js: [LOD](https://threejs.org/docs/pages/LOD.html), [InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html). APIs immer mit der installierten Engine-Version abgleichen.
