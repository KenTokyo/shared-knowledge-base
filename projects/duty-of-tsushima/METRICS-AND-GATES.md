# Kennzahlen, Schwellen und Tore — duty-of-tsushima

**Lesen wenn:** Kennzahl, Schwelle, Tor oder Sweep-Ranking.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Getrennt von [`HARNESS-GATES.md`](HARNESS-GATES.md): dort **wie messen**, hier **was Zahlen behaupten dürfen**.
Ausführliche Nachrechnung: Köpfe von `tools/grade.mjs` und `tools/capture.mjs`.

- **Konstante Kennzahl misst Instrument** — Pixel unter Luma 0,10 waren auf 14 Kameras 0,0 %, weil Post-Lift selbst Schwarz auf sRGB 0,135 hebt. → Schattenende als Perzentil; neue Schwelle einmal durch Post-Chain rechnen.
  *Exposure 1,00→0,12: Mittel 0,623→0,212, „Tiefschatten“ 0,0 %; `p01` danach 0,138–0,419 · 2026-08-02*

- **Ein Bild trennt Effekt und Motiv nicht** — Außenring/Mitte („Vignette“) 0,83–1,17; Motiv dominiert. → Gleiche Kamera mit Effekt=0; Verhältnisse teilen; Schranke aus Shaderarithmetik. Hier linearer Ringfaktor 0,888 und sRGB-Kompression ⇒ [0,888;1].
  *Getrennt 0,947–0,948, Spanne 0,001; `wave-peak` 1,235 ohne vs. 1,171 mit Vignette · `capture.mjs --vig` · 2026-08-02*

- **Absolute Streuung vergleicht Belichtungen falsch** — Luma-Standardabweichung sinkt mit Licht, auch bei schärferen Kanten; Spezifikation „dunkler und nicht flach“ wird unerfüllbar. → Kachelstreuung/Kachelmittel; über alle Kacheln statt wandernde Helligkeitsbänder.
  *Exposure 1→0,70, Fill 1,15: Luma ×0,862, absoluter Kontrast ×0,906 trotz relativ schärferem Bild · 2026-08-02*

- **Regler nie angeschlossen** — `uExposure` im Material, aber nicht `_syncGrade`/Parametertabelle; Key/Fill ebenfalls Literale. → Uniform und Schreibstelle gemeinsam; nicht sweepbarer Parameter existiert praktisch nicht.
  *`_syncGrade` vs. `grade.glsl.js:uExposure` · 2026-08-02*

- **„Nicht schlechter als heute“ sperrt Randwert** — relatives Gate bei Basis 0,07 % und Wiederholbarkeit 0 lehnt 34/35 ab; Suche läuft genau zum Rand. → Basis im Wertebereich prüfen; am Suchrand absolute, projektbegründete Schranke. Hier 1 %, passend zum 1. Perzentil; alte Ablehnungszahl weiter drucken; erst wieder relativ, wenn sie nicht mehr fast alle ablehnt.
  *`p01` 0,230 vs. Boden 0,134; dunkelstes Prozent 96 Milli-Luma über Schwarz, 0,07 % saßen auf · `grade.mjs`, Gate 1 · 2026-08-02*

- **Spezifikationsschwelle statt Pipelineboden** — Luma 0,030 kann bei Post-Lift-Boden 0,134 nie feuern; 0/35 Ablehnungen. → Eingangssignal nullen (Exposure 0), Pipelineboden messen; Selftests: Bodenbild 100 % unter eigener Schwelle, Messwert ≈ Handrechnung.
  *Gerechnet 0,1350, gemessen 0,1339 (0,28 Codewerte) · `grade.mjs` · 2026-08-02*

- **Rasterrand ohne Systembedeutung gewinnt** — „dunkelstes gültiges Paar“ wählt Fill 0, obwohl ohne IBL damit jedes Ambientlicht fehlt. → Bedeutungslosen Rand per selbstaufhebendem Zulässigkeitsguard (`requestEnvMap()`), nicht Tor; Wert weiter messen.
  *Erste 3 Fill-Schritte: 42 Milli-Luma für 1,5 Milli-% Boden; letzte 3: 17 für 22,6; Effizienz 0,036 vs. 1,33 (×37), Knick 0,30–0,15 · 2026-08-02*

- **Gültigkeit gemittelt** — Gate „≤1 % Boden“ nutzt Kameramittel 0,70 %, obwohl 5/14 verletzen. → *Wie gut* darf mitteln; *gilt?* je Objekt prüfen und Verletzer benennen.
  *Spanne 0–2,88 %; `terrace-waterline` 2,88, `material-closeup` 1,97, `wave-peak` 1,55, `shrine-question` 1,05, `burnt-slope` 1,00 · 2026-08-02*

- **Worst Case als Totalverbot** — „keine Kamera auf Boden“ besteht 0/25; mindestens eine scheitert sogar beim hellsten getesteten Paar. → Bei totaler Ablehnung zuerst reglerunabhängige Messobjekte suchen, nicht passende Schranke erfinden.
  *`material-closeup` auf Boden bei 1,00/0,50 und 0,80/0,15 · 2026-08-02*
  **↑ GESTÜRZT am selben Tag: „reglerunabhängig“ beschrieb nur damaligen Rasterrand.**

- **„Keine Einstellung hilft“ nur so stark wie Raster** — oberer Tipp testete maximal Fill 0,50; bei ehemaligem Konfigwert 1,15 verlässt `material-closeup` Boden, 0/26 Kameras scheitern immer. → Vor Umbuchung auf Welt Rasterrand erweitern; Anzahl „scheitert bei jedem Kandidaten“ drucken.
  *1,00/0,50 scheitert, 1,00/1,15 nicht; breites Raster 2/26 gültig, dunkelstes gibt 89/107 gewonnene Milli-Luma zurück · 2026-08-02*

- **Eine Ratschenreparatur, zwei Ratschen bleiben** — zwei weitere „nicht schlechter als heute“-Gates lehnten Verbesserung um <1 Druckzähler ab. → Alle Tore derselben Datei prüfen; Referenz auf Designpunkt statt Live-Konfig, aber je Lauf neu messen; alte/neue Sieger nebeneinander.
  *0,0239 vs. 0,0249 und 0,0081 vs. 0,0082 bei Wiederholbarkeit 0; Anker Exposure 1/Fill 1,15: 13 statt 5 gültige Paare, gleicher Sieger · 2026-08-02*

- **Äquivalente Aussagen als Widerspruchsprobe** — „Bodenanteil ≥1 %“ und „p01 beschreibt Boden“ sollen definitionsgleich sein. → Beide Prädikate getrennt; Widerspruchszahl drucken.
  *0 Widersprüche auf 350 Messungen (25 Paare×14 Kameras) · `grade.mjs` · 2026-08-02*
