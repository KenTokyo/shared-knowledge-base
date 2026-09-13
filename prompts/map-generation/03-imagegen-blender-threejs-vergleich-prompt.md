# Eine ImageGen-Referenz, zwei Maps: Blender und Three.js vergleichen

Baue dieselbe Landschaft über zwei Produktionswege bei vergleichbaren Spielbedingungen.

## Meine Angaben

- Projekt / Map-Name: `<absoluter Projektpfad, Name>`
- Stil / Referenzen: `<Beschreibung oder AION 2-inspirierte Fantasy>`
- Größe in Metern, Breite × Tiefe: `<optional; Standard: 450 × 450 m>`
- Ausführung: `<ein GPT-Modell oder Orchestrierung; ohne Angabe ein GPT-Modell mit ImageGen>`
- Bei Orchestrierung: `<Orchestrierer: Anbieter/Modell/Denkstufe; Astra für ImageGen; Implementierer: Anbieter/Modell/Denkstufe>`
- Spielweise / zu erhaltene Eigenschaften: `<Wege, Klassen, Dichte, Nahdetails, Effekte>`
- Hardware / Auflösung / Leistungsziel: `<Angabe oder Projektstandard>`

## Auftrag und gemeinsamer Maßstab

Erzeuge mit ImageGen eine hochwertige Fantasy-Map-Referenz und implementiere
**beide** Varianten: eine aus echten Blender-Exporten und eine mit in Three.js
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

## Referenz und zwei Produktionswege

1. Erzeuge und inspiziere mit ImageGen etwa Übersicht, Spielkamera, Wasser und Vegetation/Landmarke derselben Landschaft. Speichere Bilddateien, Prompts und Referenzversion. Welttexturen brauchen passende Transparenz und Materialzuordnung.
2. Erstelle eine gemeinsame, versionierte Layoutquelle: Seed, Gelände-/Höhenfeld, Wasserstand, Wege, Baum-/Fels-/Landmarkentransformationen, Grasverteilung, Spawn, Kollision, Licht und Vergleichskameras. Beide Varianten lesen dieselben Daten. Identische Seeds allein beweisen keine identischen Platzierungen.
3. **Blender-Variante:** Erzeuge echte Geometrie in Blender, exportiere sie und verwende diese Exporte im Spiel. Liefere Szene oder reproduzierbares Python-Skript, Exportparameter und Herkunft. Python/CLI ist ausreichend; MCP ist nicht nötig. Prüfe Einheiten, Achsen, Normalen, UVs, Materialzuordnung und Instanzierbarkeit.
4. **Three.js-Variante:** Erzeuge eigene Geometrie mit den nativen Modulen, denselben Terrain-/Transformationsdaten und vergleichbaren Silhouetten/Details. Ein bloßer zweiter Import der Blender-Exporte ist kein anderer Produktionsweg.
5. Teile Wasser, Gras, Licht, Spielmechanik und Diagnose. Halte Adapter klein und dokumentiere Unterschiede in Geometrie, Materialien, LOD und Bildqualität; gleiche Geografie bedeutet keine identische Dreiecksanzahl.

Ein GPT-Modell übernimmt alle Schritte über die vorhandenen Werkzeuge. Bei gewählter
Orchestrierung sind die angegebenen Rollen freigegeben: Astra für ImageGen,
Implementierer für Maps, Orchestrierer für Integration. Prüfe genaue Anbieter,
Modelle und Denkstufen. Trenne Schreibbereiche und benenne einen Git-Verantwortlichen.
Übergib verfügbare Bilder, Layoutversion, Maße, Kameras und Performance-Regeln vor
abhängiger Arbeit. Fehlende Modellangaben klären; keine stille Ersatzbesetzung.
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
