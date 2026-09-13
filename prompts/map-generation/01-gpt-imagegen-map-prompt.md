# Neue Fantasy-Map: ein GPT-Modell, ImageGen und Umsetzung

Ein GPT-Modell übernimmt Referenz, Implementierung und Prüfung. Diese Datei im Zielprojekt verwenden.

## Meine Angaben

- Projekt und Map-Name: `<absoluter Projektpfad, Name>`
- Stil und Referenzen: `<Beschreibung, vorhandene Bilder oder AION 2-inspirierte Fantasy>`
- Größe in Metern, Breite × Tiefe: `<optional; Standard: 450 × 450 m>`
- Umsetzung: `<Three.js oder Blender; ohne Angabe vorhandene native Three.js-Pipeline>`
- GPT-Modell / Anbieter / Denkstufe: `<optional; sonst aktuelles Modell mit verfügbarem ImageGen-Werkzeug>`
- Spielweise und zu erhaltene Eigenschaften: `<Wege, Gegner, Klassen, Nahdetails, Effekte>`
- Zielhardware / Auflösung / FPS- oder Framezeit-Ziel: `<Angabe oder bestehender Projektstandard>`

## Auftrag und Standards

Erzeuge eine hochwertige, spielbare Map aus einer ImageGen-Referenz. „Ion 2“ wird
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

## Von ImageGen zur Map

1. Erzeuge und inspiziere mit ImageGen eine zusammenhängende Referenz, etwa Übersicht, Spielkamera, Wasserdetail und Vegetation/Landmarke. Geografie, Wege und Licht müssen zusammenpassen. Nutzerbilder dienen als Ausgangspunkt; speichere die fertigen Bilder.
2. Halte Bildpfade, Bildprompt, Referenzversion, Maßstab, Seed und Vergleichsansichten in einem Manifest fest. Leite Terrain, Wasserstand, Wege, Dichte und Materialpalette ab. Benenne Perspektivabweichungen; das Konzept ist keine metrisch genaue Kameraaufnahme.
3. Setze die gewählte Pipeline vollständig um. **Three.js:** Geometrie und Materialien in den vorhandenen nativen Modulen. **Blender:** echte Szene bzw. reproduzierbares Python-Skript, tatsächlich erzeugte Exporte und Import in denselben Spielrenderer. Blender per Python/CLI genügt; MCP ist keine Voraussetzung. Benenne Transformationskonventionen, Materialzuordnung und Exportherkunft.
4. Verwende bei Bedarf ImageGen auch für nutzbare Welttexturen mit passender Transparenz, Skalierung und Materialzuordnung. Eine schöne Vorschau allein ist kein verwendetes Laufzeitasset. Erhalte Nahdetails, dichte Silhouetten und lesbare Wege; integriere Kollision, Spawn, vorhandene Map-Auswahl und saubere Ressourcenfreigabe.

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
