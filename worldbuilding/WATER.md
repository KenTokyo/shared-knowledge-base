# Wasser: Meer, Flüsse, Wasserfälle und Teiche

## Ein Vertrag für Optik und Gameplay

Terrain, Renderer, Kamera, Spawn, Kollision und Vegetation teilen:

- Wasseroberfläche und gezeichnete Ausdehnung,
- Grundhöhe/Tiefe, Gefälle und Fließrichtung,
- Ufer-/Nässezone,
- `waterAt`/Submersion,
- Bett-/Carve-Parameter.

`heightAt` unter Wasser liefert den Grund, nicht die begehbare Oberfläche. Sichtbares Wasser darf nicht als trockener Boden gelten.

## Flüsse und Wasserfälle

- Verlauf aus Drainage/Gefälle statt frei schwebender Y-Linie.
- Bett, Breite, Ufer und Nässe gemeinsam authoren.
- Überlappende Segmente nicht nacheinander in dieselbe Heightmap graben; pro Zelle Owner/nächsten Einfluss bestimmen.
- Schaum nach Gefälle, Sturz und Turbulenz; nicht nach Helligkeit.
- Talwasser braucht lokale Reflexionssicht. Eine globale Environment-Map kennt keine Talwände und kann weißen Himmel spiegeln.

## Teiche

1. **Natürliches Terrain prüfen:** Modifier deaktivieren; Zentrum, Ringminimum und Ringspanne messen. Liegt das Ringminimum unter dem Zentrum, ist der Punkt Hang/Dom, keine Mulde.
2. **Flachen Baugrund suchen:** Flüsse, Meer, Bau-Pads und spätere Terrainmodifier ausschließen.
3. **Nur graben:** Eine Wanne schneiden; Hang nicht großflächig auffüllen und keinen Wasserlauf stauen.
4. **Eine Konstantequelle:** Draw-Radius, Lip, Shore- und Bed-Falloff, `waterAt` und Wetness dürfen keine getrennten Radien erfinden.
5. **Reserve einplanen:** Nachfolgendes Upsampling/Feinrelief darf den Ufer-Lip nicht wieder unterschneiden.
6. **Finale Karte prüfen:** Kein Meshrand über Boden unter dem Spiegel; echte Wasserlinie, Tiefe und Fläche Ende-zu-Ende messen.

Eine flache Scheibe mit Fragment-Discard kann die echte Terrain-Schnittlinie finden. Sie löst aber keinen Standort, an dem der Außenrand frei in der Luft endet.

## Render-Diagnose in dieser Reihenfolge

1. Winding, Normalen, FrontSide/BackSide.
2. Oberfläche im Bett und tatsächlicher Meshrand.
3. Regionen nach Tiefe, Gefälle und Entfernung bucketieren.
4. Body, Reflexion, Fresnel, Specular und Schaum einzeln ablatieren.
5. Lokale Reflexionsokklusion.
6. Fog/PostFX am **finalen Wasserpixel**.
7. Optik gegen `waterAt`, Submersion und Solver querprüfen.

`DoubleSide`, Fog oder dunklere Tints dürfen falsche Geometrie nicht kaschieren.

## Harte Gates

- Kein zusammenhängender Randbogen schwebt über tieferem Boden.
- Kein Punkt mit gezeichnetem Wasser meldet „trocken“.
- Kamera-/Spawnsolver prüfen Wasser zusätzlich zur Terrainhöhe.
- Vegetation meidet stehendes Wasser und Flussbett.
- Bake-Absicht und final upgesampelte Karte stimmen innerhalb gemessener Reserve.
- Nach Terrain-Rebake Kameras und Messregionen neu lösen.
