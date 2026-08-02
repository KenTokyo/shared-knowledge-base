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

- **Bildanteil aus einer Kamera mitten in der Schicht ist eine Stichprobe, keine Eigenschaft** — Sweep kürt eine Dichte, die nur an einem Los gewinnt: bei kamerazentrierten Partikelgittern setzt die nächste Instanz den Anteil, und ihre Distanz ist Zufall, nicht Dichte. Anteil fällt mit 1/d², ein Korn 33 cm vor der Linse schlägt tausend in 20 m. → Längste zusammenhängende Zeile geänderter Pixel („Fleck“) mitdrucken — ein Fleck ≫ Rest verrät das Los ohne Segmentierung; Sieger erst rangieren, wenn er Kameraversatz im Zentimeterbereich übersteht.
  *0,450 % / 69-px-Fleck aus **einem** Korn bei Auge `[147.03, 11.63, 7.58]`, 0,063 % / 16 px bei `[147, 11.63, 7.6]` — 3 cm Versatz, Faktor 7. Vier Erklärungen vorher gemessen widerlegt (TAA und Schussreihenfolge identisch über 1–40 Settle-Frames, Augenhöhe Faktor 2,4, Seitenversatz 1,1 über 0,5 m, Auflösung identisch) · 2026-08-02*

- **Deckel ohne Konvergenzprobe misst das Messfenster** — Prüfung „über der Ziellinie steht nichts“ deckelte die Verdeckung im Anschlag auf 1,50 %; eine Waffe las 2,02 % und sah nach Defekt aus. Über einen *gehaltenen* Anschlag wächst das Maximum unbegrenzt weiter, bei **jeder** Waffe, weil Sway langsames Rauschen (0,21–0,95 Hz) plus Atmung (0,097 Hz) ist. Quantile retten es nicht. → Vor jedem Deckel prüfen, ob die Größe über wachsende Fenster stehenbleibt; tut sie es nicht, die Frage so umformulieren, dass die Störgröße nicht mitmisst — hier stillgestellter Sway, Antwort dann 0,00 % ohne Deckel und ohne Phase.
  *Max je Haltezeit 1/8/32/64/256 s: Tanegashima 0,34/0,34/0,70/0,84/2,61 · Karabiner 0,73/1,01/1,94/3,23/3,23 · Streuflinte 0,65/0,65/1,52/2,08/2,78; p99 des Karabiners 0,34→2,81 über dieselben Fenster; dieselbe Waffe las 1,35 % bei 0,6 s und 2,02 % bei 2,2 s Setzzeit · `/tmp/kz-spotup.mjs`, 10 240 Stichproben je Waffe · 2026-08-02*

- **Zahl, die von einer Eingabe nicht abhängen kann und es doch tut, misst den Messaufbau** — Gate fuhr die Animationssequenz je Seitenverhältnis erneut, in *einer* Sitzung, und maß damit drei Sway-Phasen statt dreier Projektionen. Der Beleg stand im eigenen Ergebnis: die Zoomkamera hat festen Öffnungswinkel und Seitenverhältnis 1, kennt das Bildformat gar nicht. → Eine Animationsrunde, darin je Frame **alle** Projektionen derselben Stellung; als Selbstprobe eine bewusst eingabeunabhängige Kennzahl mitdrucken und auf Gleichheit prüfen.
  *1,35 / 1,38 / 2,39 % für dasselbe Korn derselben Waffe; danach über alle drei Formate identisch, Lauf kostet ein Drittel der Schritte; zwei gemeldete „Ausreißer“ existierten nicht · `af040c3` · 2026-08-02*

- **Frames nach Eingabe sortiert statt nach Rig-Zustand** — Gate ordnete jeden Frame einer Lage zu und prüfte je Lage anderes. Für den Anschlag las es die Überblendung, für den Sprint die Taste: beim Loslassen hieß die Lage sofort „Hüfte“, während der Sprint-Blend noch auf 0,861 stand und die Waffe unverändert quer vor der Brust lag. Vier gemeldete Bauteil-Defekte meinten denselben einen Frame. → Zustand des **Dargestellten** lesen, nicht der Eingabe; jede Überblendung braucht ihren eigenen Namen, sonst sammeln sich die auffälligen Frames im Nachbarzustand.
  *`mag` 8/279 außerhalb (Rand −0,458), `serpentine` 1/171, `bolt` 1/279, `pump` 1/311 — nach Abklingen des Blends 0 außerhalb, Ränder +0,105 bis +0,486 · `/tmp/kz-guide.mjs` · 2026-08-02*
