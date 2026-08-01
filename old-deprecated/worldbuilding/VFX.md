# VFX, Partikel, Trails, Animation und Audio

## Ereignisvertrag vor Optik

Jeder Effekt besitzt:

- eindeutigen Gameplay-/Welt-Trigger,
- Weltposition/Normalen/Emitter und Lebensdauer,
- sichtbaren Zweck: Treffer, Gefahr, Richtung, Material oder Atmosphäre,
- Pool-/Budgetklasse und Relevanzdistanz,
- deterministische Capture-Semantik.

Keine Hotpath-Abfrage, wenn ein Event-Hook genügt.

## Performante Architektur

- feste Pools/Ringbuffer statt Laufzeit-Allokationen,
- GPU- oder analytische Bewegung statt CPU-Update pro Partikel,
- Idle: unsichtbar und möglichst 0 Draws,
- instancete Quads/Trails, begrenzte transparente Fläche,
- Kamera-zentriertes Wrapping für weit verteilte Ambient-Partikel,
- gemeinsame Wind-/Weltfelder statt getrennte Bewegung.

Ambient-Populationen und Scatter-Klassen brauchen getrennte Seeds; Count-Sweeps dürfen spätere Klassen nicht neu würfeln.

## Sichtbarkeit und Tiefe

- Cutouts für Blätter/Vögel, wenn korrekter Depth-Fog nötig ist.
- Transparenz/DepthWrite bewusst wählen; Hintergrundtiefe kann sonst falschen Nebel liefern.
- DoubleSide nur, wenn die Karte wirklich beide Seiten zeigt; Transluzenz konservativ halten.
- Screen-Space-Effekte räumlich begrenzen; ein VFX darf nicht das ganze Bild als Halo verändern.
- Alter 0 kann absichtlich Alpha 0 sein. Für Capture Birth-Time kontrolliert zurücksetzen, nicht „Null Pixel = kaputt“ folgern.

## Zeitliche Wahrheit

Treffer-, Trail- und Audiozeit nicht als magische Prozentzahl authoren:

1. Bewegungskurve fein sampeln.
2. Kontakt gegen echte Hitbox/Kapsel berechnen; kompatible Größen vergleichen.
3. Framequantisierung berücksichtigen: Trigger feuert meist auf dem ersten Frame **nach** der Schwelle.
4. Worst Case im möglichen Auslösefenster maximieren, nicht blind den mathematischen Peak wählen.
5. Nach Pose-/Ease-Änderung Timing neu lösen.

Symmetrische Reichweiten-/Großzügigkeitsverträge beider Kampfseiten gemeinsam ändern, nie nur eine Seite „korrigieren“.

## Audio

- deterministische PCM-/Assetdaten einmal erzeugen,
- Sources poolen,
- Emitter, Listener, Spatial Gain, Pan und Filter getrennt prüfen,
- Peak/RMS/Dauer/Spektralschwerpunkt und Loop-Naht testen,
- semantische Relationen prüfen: Treffer > Windup, Gefahr hörbar, Distanz plausibel.

## Schnell-Gates

- Event ausgelöst → Shader/Programm gelinkt → sichtbare Pixel über Boden.
- A/A-Null sauber; Feature an/aus im selben gepinnten Fenster.
- Lebensdauer, Pool-Reuse und Restore ohne Leak.
- Nacht/Sturm/Quality-Gates dürfen Populationen absichtlich nullen; nur aktive Kameras bewerten.
- VFX bleibt lesbar, ohne Gameplay-Hitbox oder Weltgeometrie zu verdecken.
