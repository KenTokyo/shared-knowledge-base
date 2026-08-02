# Debug, Capture und Review-Evidenz

- **Status:** optionale „könnte“-Tipps; lokale Hosts, Baselines, Latten → Vorrang

## Bildreview-Budget

Agentische Bildprüfung ist kein Standardgate und aus Zeitgründen ungern gesehen; direkte Abnahme durch den User
hat Vorrang. Nur eine nach statischen/numerischen Checks ungelöste Look-Frage rechtfertigt ein Vergleichsbild,
absolut höchstens zwei Sichtprüfungen im gesamten Userauftrag. Die technischen Tipps unten schreiben kein Capture
vor; falls die Ausnahme gewählt wird, gilt zusätzlich [`SCREENSHOT-GUIDE.md`](../SCREENSHOT-GUIDE.md).

## Fünf Tipps

- **1 · Beleg könnte enthalten:**
  - Behauptung; echtes Artefakt; Vorbedingungen; billigster Gegenbeweis; Grenze
  - Status: verifiziert; Hypothese; widerlegt; offen; Produktwahl
  - Renderer-Readback statt Browser-/DOM-Bild
- **2 · Capturevertrag könnte enthalten:**
  - exklusives Target vom Render bis Readback
  - Format; BGRA/RGBA; Zeilenrichtung; Alpha; lineares Downsampling
  - tatsächlicher Frame; elapsed time; Eventsignatur
  - Modell/Sweep → Kandidat; fester Frame/Beat → Edit oder zitierbarer Beleg
- **3 · A/A könnte vor A/B kommen:**
  - Uhr; `dt`; Wind; Kamera; LOD; CSM; Environment; History; Pools; RNG
  - gleicher Shot: wiederholt; nach zwei Vorgängern; in frischen Prozessen
  - Warm-up getrennt; Source-Edit während Lauf → Lauf ungültig
- **4 · Probe-Selftest könnte enthalten:**
  - A/A; absichtliches A/B; Seitentausch; leer; Singleton; Rotkontrolle; Restore
  - Count + Mindestkardinalität; null Output ≠ Pass
  - Applied Value; Left-visible; Left-casting
  - alle Renderables: Waffen; Ghosts; PostFX-Spuren
- **5 · Metrik/Baseline könnte enthalten:**
  - Population; Nenner; Schwelle; Messboden; Kamera; Tiefe; Raw/HDR/LDR; Maske; Mindestpixel
  - Erasure statt Overlap; geclippte Pixel separat; Messfarbraum benennen
  - Baseline: Source/Bake; Sequenz; Seed; Target; Toolversion; Gatezahl
  - falls Bildausnahme gewählt: stärkste relevante Ansichten in **einem** Vergleichsbild statt Einzelreview je Winkel

## Gegenbeispiele

- periodisches A/A → Cursor/Debt/History
- gleiches HDR, anderes spätes LDR → Targetbesitz
- grünes Tool ohne Output → Run-Guard + erwartete Zeilen
- Hide null, Subjekt sichtbar → Runtime-Restore
- A/B verschiebt Fremdpartikel → RNG-Verbrauch
