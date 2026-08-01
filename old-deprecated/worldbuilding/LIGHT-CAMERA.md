# Licht, Kamera, Referenzen und PostFX

## Referenz zuerst zerlegen

Pro Bild getrennt festhalten:

- gewünschte Eigenschaft und ausdrückliches Nicht-Ziel,
- Vorder-, Mittel- und Hintergrund,
- Sonne relativ zur Kamera,
- Größenanker und sichtbare Tiefe,
- Farb-/Helligkeitsrollen,
- UI, Letterbox, Figuren oder andere Kontamination.

Referenzkonstanten sind meist **shot-lokal**. Nur motivgleiche Crops mit ähnlicher Tiefe vergleichen; nach Kameraänderung alle Crops/Ziele neu validieren.

## Kamera ist Weltbestandteil

Solver-Eingaben:

- Augenhöhe über echter begehbarer Oberfläche,
- Subject, Distanz, Peilungsbogen und Sichtlinie,
- Vordergrundhang, Biomoffenheit und Skyline,
- Sonne relativ zum Blick,
- gewünschter Fill und Negativraum.

Blickwinkel allein rankt keinen Hero-Shot: projizierte Deckung, Distanz und Vergleichsumgebung zählen mit. Nach Terrain-/Bake-Änderung Kameras neu lösen statt alte Y-Werte zu retten.

## Licht in Beiträge zerlegen

- Sichtbarer Sky-Dome und IBL-Probe dürfen unterschiedlich aufbereitet sein.
- Sonne, Sky/IBL, Schatten, lokale Reflexion und PostFX separat messen.
- IBL ist Teil des Materialergebnisses; Ground-/Foliage-Bounce verhindert unplausible kalte Schatten.
- Höhen-/Materialkontext darf vorhandene Irradianz retinten, aber nicht Energie doppelt addieren.
- Fog erklärt echte Ferne; fehlende 50–150-m-Struktur braucht Geometrie/Vegetation, nicht mehr Dunst.

## Farbraumvertrag

- Albedo: Autorenraum kennen, korrekt nach sRGB kodieren und genau einmal dekodieren.
- Normalen, Masken, Höhen und Splatdaten: keine sRGB-Dekodierung.
- HDR **und** finales LDR auf Kanal-Clipping prüfen. Globales Grading kann korrekte HDR-Farbe erst im Finalbild zerstören.

## Drei Diagnosebilder

1. **Rohkanal:** Albedo, Normale, Roughness, Maske, Tiefe.
2. **HDR-Szene:** Licht vor Tonemap/PostFX.
3. **LDR-Final:** Tonemap, Grade, SSAO, Bloom, DOF, Godrays usw.

Am ersten Bild suchen, in dem der Fehler erscheint.

## PostFX-Regeln

- DOF, chromatische Aberration, Bloom, Fog, SSAO und Godrays einzeln ablatieren.
- Screen-Space-Kontakt wie SSAO vor grober Ferntiefe ausfaden.
- Godrays nur bei plausibel sichtbarer Quelle/kleiner Reichweite.
- Bloom/Grade nicht als Ersatz für Material, Tiefe oder Vollständigkeit.
- Jeder Pass braucht einen benannten sichtbaren Zweck und eine Feature-off-Kontrolle.

## Abnahme

- First Read in einer Sekunde.
- Hero, Gegenrichtung und Laufweg.
- Vergleich bei gleicher Kamera, Auflösung, Renderstufe, Zeit und Wetter.
- Form/Komposition visuell; Belichtung, Clipping und Beitrag numerisch.
- Neutraler Render bleibt ohne Look-PostFX glaubwürdig.
