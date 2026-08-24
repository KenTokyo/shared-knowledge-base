# Shardfall Terrain und Wetter — Referenzvertrag

## Zweck

Zwei lokale Bilder steuern Makrokomposition und Wettervarianten für Shardfall-Welten. Sie dürfen direkt als Dateien angesehen werden. Sie verpflichten nicht zu Browser-, Runtime-Screenshot- oder Ergebnis-gegen-Referenz-Vergleichen.

## Referenzen und beobachtete Merkmale

- [**Mountain Vista Terrain 01**](references/shardfall-mountain-vista-terrain-01.png) — 1435 × 1096 RGB-PNG, SHA-256 `3f3c604e428ee43a1857d082d550d417306fdf5c296781c3ea490f4566bab44a`.
  - Vordergrund: windbewegtes hohes Gras, Blumen, Felsen und klar lesbare Spielerfigur als Größenanker.
  - Mittelgrund: begehbares Tal, geschichtete Hügel, Felsrippen, Nebelbänder, Wasserfall und eine terrassierte, warm beleuchtete Siedlung.
  - Hintergrund: mehrere deutlich getrennte Bergsilhouetten mit dominantem schneebedecktem Gipfel, Nebenketten und atmosphärischer Tiefenstaffelung.
  - Blickführung: Vordergrundhang und Talachse führen zur Siedlung; deren Dachrhythmus steigt zum Sci-Fi-Landmark auf, während Berge den Horizont schließen.
  - Licht: warmer tiefer Sonnenstand trifft kühle Wolken-, Schnee- und Nebelwerte; lokale Cyanenergie verbindet Figur und Landmarke.

- [**Weather Variants 01**](references/shardfall-weather-variants-01.png) — 1435 × 1096 RGB-PNG, SHA-256 `c7dc4f6bc1f4644a58e6aa9e89fec449d66c82483844aa71c36fd6df92445b42`.
  - Vier Zustände behalten Kamera, Siedlung, Wege, Spielerposition und Landmarken bei; Wetter verändert Atmosphäre statt Weltlayout.
  - **Clear Dawn:** warmer Sonnenstand, offene Fernsicht, grüne Vegetation und helle Wegkante.
  - **Electric Storm:** Nachtblau, Starkregen, Blitz, nasse dunkle Materialien und warme Fensterkontraste.
  - **Snow Squall:** kaltes Tageslicht, Schneefall, sichtbare Oberflächenauflage und reduzierte Fernkontraste.
  - **Amber Dustfront:** orangebrauner Himmel, Staubpartikel, stark verkürzte Sicht und warme Silhouettenstaffelung.

## Verbindlicher Terrainvertrag

1. **Makroform vor Dekoration:** Vorder-, Mittel- und Hintergrund, Route, Größenanker, Siedlung, Wasserfall und Bergkranz werden vor Gras-, Fels- oder Partikeldetail festgelegt.
2. **Berge sind Geometrie und Silhouette:** Mehrere überlappende Bergketten schließen die Welt glaubhaft. Ein flacher Boden mit gemalter Skybox erfüllt die Referenz nicht.
3. **Spielbare Höhenstaffelung:** Talboden, Hänge, Felsstufen, Terrassen und erhöhte Siedlungsbereiche bilden echte begehbare Höhen. Kritische Routen erhalten lesbare Steigung, Deckung und Rückwege.
4. **Siedlung folgt Terrain:** Gebäude sitzen auf geprüften Footprints, Terrassen und Stützmauern. Mesh, Collider, Navigation, Scatter-Clearing und Kamera lesen denselben Site-Transform.
5. **Wasserfall besitzt Quelle und Abfluss:** Wasserlinie, Fallkante, Gischtzone und Talabfluss folgen dem finalen Terrain; keine schwebende Wasserkarte.
6. **Dichteverlauf:** Detail konzentriert sich an Vordergrund, Routen, Siedlung und Landmarken. Übergänge und Fernketten verwenden günstigere Cluster, LOD und Silhouetten.
7. **Eine Weltwahrheit:** Renderhöhe, Kollision, Navigation, Wasser, Wege, Vegetation, Gebäude und Spawn lesen denselben validierten Weltvertrag. Terrainänderungen invalidieren abhängige Bakes gemeinsam.

## Verbindlicher Wettervertrag

1. Eine `Environment`-Wahrheit besitzt Sonne/Mond, Himmel, Nebel, Wind, Niederschlag, Sichtweite, Schatten, Belichtung, Grade, Oberflächenreaktion und Wetteraudio.
2. Clear Dawn, Electric Storm, Snow Squall und Amber Dustfront verwenden dieselbe Weltgeometrie, Navigation und Belegung. Wetter erzeugt keine vier Mapkopien.
3. Übergänge interpolieren kontrolliert; F1 bietet direkten Zustand und einen sicheren 8–15-Sekunden-Blend. Reset beendet Übergänge, Partikel, Audio und Blitztimer vollständig.
4. Regen aktiviert gebundene Nässe/Reflexion und gepoolte kameranahe Tropfen; Schnee nutzt begrenzte Flocken plus maskierte Auflage; Staub nutzt gerichtete Böen und Distanznebel. Keine flächendeckenden transparenten Weltquads.
5. Blitz nutzt feste Lichtslots und gedrosselte Ereignisse statt dynamisch wachsender Lichter. Niederschlags-, Staub- und Gischtpools besitzen harte Caps und priorisierten Überlauf.
6. Reticle, Gegner, Build-Preview, Wege, Interaktionen und HUD bleiben in jedem Zustand lesbar. Sichtreduktion ist Atmosphäre, kein unspielbarer Blindfilter.
7. Windrichtung speist Graswellen, Partikel, Wolkenzug und Audio gemeinsam. Jede Familie darf Frequenz und Amplitude passend übersetzen, aber nicht eine eigene Wetterwahrheit erfinden.

## Referenzgebrauch und Abnahme

- Die beiden PNGs vor Terrain-/Wetterautoring direkt ansehen; keine Bildsuche nötig.
- Rhythmus, Tiefenstaffelung, Höhenrollen, Wetterunterschied und Materialreaktion übertragen; keine exakte Siedlung, Figur, Waffe oder Bergsilhouette kopieren.
- Keine browsergestützte Laufzeit-Sichtprüfung, kein Playwright/CLI-Browser, kein Runtime-Capture und kein Ergebnis-Screenshot-Vergleich gegen die Referenzen.
- Nichtvisuelle Gates prüfen Weltvertrag, Höhen-/Steigungsgrenzen, Footprints, Wasseranschluss, Wetterzustandsmaschine, Environment-Consumer, Poolcaps, Übergangs-Cleanup und Reset.
- Die Bilder definieren Richtung, nicht numerische Bildähnlichkeit. Eine spätere menschliche Produktbeurteilung bleibt getrennt von automatischen Gates.
