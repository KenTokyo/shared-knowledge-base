# Bildmessung und Urteilen — voxel-samurai-quiz (AEON)

**Lesen wenn:** du AEON-Bildmaße, Layer-Attribution, Sondenmetriken oder den Vertrag zwischen Probe und Shipping-Pfad bewertest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Allgemeine Messmechanismen gehören [`../../threejs/MEASURING.md`](../../threejs/MEASURING.md); hier stehen nur AEON-spezifische Instrument- und Bedeutungsfallen. Für Laufvarianz, Zeitpfade und Spaltensemantik siehe [`RUNTIME-MEASURING.md`](RUNTIME-MEASURING.md).

## Tipps

- **Bild-Featurebreite für Halmmaß gehalten** — die normierte Bildmessung ist korrekt, aber ihr Aggregat aus Dichte, Haltung und Überlagerung wird als physische Elementbreite gelesen. → Vor Geometrieänderungen Bild- und Weltmaß getrennt prüfen.
  *Featurebreite 0,60x zur Referenz, obwohl Einzelhalme bereits Ø 8,95 mm breit waren; +49 % hätte 13,3 mm erzeugt · 2026-08-01*

- **Bandmittel als Layer-Präsenz gelesen** — Blumen, Letterbox oder gegenläufige Teilstreifen halten ein Mittel stabil, obwohl sich der Zielinhalt stark ändert. → Aktive Fläche und feine Streifen prüfen; Layer-Präsenz ausschließlich aus gematchten An/Aus-Frames ableiten.
  *51/77/155/232/202 % mittelten zu 98,6 %; `L.far` lag zu 97 % auf Blüte, Blumen deckten bei invariantem Bandmittel 23,0 % · 2026-07-31/08-01*

- **Hide-and-Diff überinterpretiert** — ein kleinerer Wert nach dem Ausblenden oder eine freigesprochene Layerklasse wird als globaler Verdeckungsbefund gelesen. → Nur positive Same-frame-Differenzen zählen; dieselbe Shipping-Pose und jede relevante Layerklasse separat prüfen.
  *Alte Bauten-Posen zeigten bis +1,009, der Produktions-Poser nur +0,083; Baum-Hide gab dagegen +0,465 auf 0,305 `foe%` zurück · 2026-08-01*

- **Metrik sieht den behaupteten Defekt nicht** — die Spalte steigt trotz besserem Ergebnis oder bleibt still, während ein Kanal kippt. → Kanal-/Regionssensitivität vorab vergiften; bei gegenläufigen Ortsfehlern ein Profilmaß statt globalem Gain nutzen.
  *`errG` stieg trotz `gain` 1,016 → 1,003; Sättigung wich −1,6 % ab, während Grün +11,1 % zu hoch lag · 2026-07-31/08-01*

- **Probevertrag driftet vom Shipping-Pfad weg** — Diagnose und Gates liefern plausible Zahlen aus Default-Flags, FreeCam, alter Pose oder nachgebauter Invariante. → Kandidatenflags durchreichen, den Produktions-Poser wiederverwenden und veröffentlichte Runtime-Werte statt abgeleiteter Ersatzgrößen lesen.
  *`camwall` ignorierte `--liftMode`/`--liftBodY` und berechnete den Arm veraltet; FreeCam-Gates verfehlten `groundLift`; alte Pose +1,009 gegen Shipping +0,083 · 2026-08-01*
