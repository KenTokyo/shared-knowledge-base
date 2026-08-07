# Bildmessung und Urteilen — voxel-samurai-quiz (Quizfall World Runtime)

**Lesen wenn:** Quizfall-Weltbildmaße, Layer-Attribution, Sondenmetriken oder Probe-vs.-Shipping.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Global: [`threejs/MEASURING.md`](../../threejs/MEASURING.md). Laufvarianz/Zeit/Spalten:
[`RUNTIME-MEASURING.md`](RUNTIME-MEASURING.md).

Terrain-Höhencaches sind in Codeform beantwortet — `pnpm terrain:anchor-probe` prüft Feldmarke im Schlüssel,
Treffer/Fehltreffer und alle drei Mutatoren; kein Tipp nötig.

## Tipps

- **Bild-Featurebreite als Halmmaß** — normiertes Bildaggregat aus Dichte, Haltung, Überlagerung ≠ physische Breite. → Vor Geometrieänderung Bild- und Weltmaß trennen.
  *Featurebreite 0,60x Referenz bei Ø 8,95 mm Einzelhalm; +49 % hätte 13,3 mm erzeugt · 2026-08-01*

- **Bandmittel als Layer-Präsenz** — Blumen, Letterbox oder gegenläufige Teilstreifen stabilisieren Mittel trotz stark verändertem Zielinhalt. → Aktive Fläche/Feinstreifen prüfen; Präsenz nur aus gematchten An/Aus-Frames.
  *51/77/155/232/202 % → 98,6 % Mittel; `L.far` 97 % Blüte, Blumen 23,0 % bei invariantem Bandmittel · 2026-07-31/08-01*

- **Hide-and-Diff überinterpretiert** — kleinerer Hide-Wert oder eine freigesprochene Klasse gilt fälschlich global. → Nur positive Same-frame-Differenzen; Shipping-Pose und jede Layerklasse separat.
  *Alte Bauten-Posen bis +1,009, Produktions-Poser +0,083; Baum-Hide +0,465 auf 0,305 `foe%` · 2026-08-01*

- **Metrik sieht Defekt nicht** — Spalte steigt trotz Verbesserung oder bleibt still bei kippendem Kanal. → Kanal-/Regionssensitivität vergiften; gegenläufige Ortsfehler per Profilmaß statt globalem Gain.
  *`errG` stieg bei `gain` 1,016→1,003; Sättigung −1,6 %, Grün +11,1 % · 2026-07-31/08-01*

- **Probe driftet vom Shipping-Pfad** — Defaults, FreeCam, alte Pose oder nachgebaute Invariante liefern plausible Fremdzahlen. → Kandidatenflags, Produktions-Poser und veröffentlichte Runtime-Werte nutzen.
  *`camwall` ignorierte `--liftMode`/`--liftBodY`, Armformel veraltet; FreeCam verfehlte `groundLift`; alte Pose +1,009 vs. Shipping +0,083 · 2026-08-01*

- **Kameraabstand als Ausweg aus einem Bestand** — `--cam …,45` stand mitten im Bambus, weil die notierte „Hainposition“ nur das dichteste 8-m-Nest einer über die ganze Karte gestreuten Art war; Abstand vergrößern trägt aus so einem Bestand nicht heraus. → Vor dem Bild offline die Instanzhülle, den freien Standort und den Korridor Kamera→Ziel messen (`world.heightAt` + Instanzmatrizen, Sekunden statt Minuten); Standort suchen statt raten.
  *sd32 `senkenbambus`: 240 Halme über x −161…136 / z −155…172, davon 48 im 45-m-Umkreis des Nests; ein Sichtprüfungsbild verbrannt, das nächste traf mit gemessenem Stand −122/89 · 2026-08-05*

- **Sonde misst dort, wo Fehler- und Sollwert zusammenfallen** — `sunkBy 0.00` liest sich als Beleg; am Zielanker ist der Boden selbst 0.00, eine fälschlich gelatchte 0 nicht von der richtigen unterscheidbar. → Vor dem Lauf prüfen, ob der Fehlerfall an dieser Stelle einen **anderen** Wert liefert als der Sollfall; sonst Ort wechseln oder offline nachstellen.
  *Zwei Diag-Läufe L11/L12 (~6 min) belegten nichts — Spot 0 ist auf jeder Etage der auf 0 planierte Arena-Kern; `pnpm terrain:anchor-probe` zeigte den Befund in Sekunden (alter ortsbasierter Schlüssel 0 bei Boden 16,6) · 2026-08-02*
