# Messhandwerk — global

**Lesen wenn:** eine 3D-Zahl zu Ranking, Referenzvergleich, Kostenurteil oder Gate führt.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

## Tipps

- **Pixelmaße über verschiedene Auflösungen verglichen** — native Pixel sehen ähnlich aus, relative Bildgröße ist falsch. → Längen, Flächen und Crops in Frameanteilen normieren; FOV/Aspect und Zielauflösung mitführen.
  *voxel-samurai-quiz: 0,955 % gegen 0,573 % = 0,60×, eine Achsenbegründung kippte · claude-of-tsushima: Probe bei 2,5 m statt 1,4 m machte Effekt 6,5→11,7 % Framebreite · 2026-07-31–08-01*

- **Messfenster trägt das falsche Subjekt** — Cropname stimmt, Pixel gehören Blüte, Sonne, Figur oder Kontrolle. → Crop einmal gegen echten Frame verorten; Subjektanteil, Population und Kontrollcrop ausgeben, bevor eine Spalte steuern darf.
  *voxel-samurai-quiz: Fenster lag zu 97 % auf Blüte und steuerte vier Entscheidungen falsch · claude-flakes: Vollbild-Clipping maß Sonne statt Effekt · claude-of-tsushima: Kontrollen enthielten 31 %/74 % Kronen · 2026-07-30–08-01*

- **A/B liegt unter dem eigenen Rauschboden** — Wiederholungen bestätigen nur dieselbe Sitzung oder Vorgeschichte. → Unverändertes A/A zuerst; A/B unmittelbar gepaart und in Gegenreihenfolge; Look, Seed, Warm-up, Fremdlast und Vorgeschichte gleich halten.
  *voxel-samurai-quiz: identischer Fall 4,3/4,4 gegen 6,0/6,3 ms zwischen Stunden · claude-flakes: A/A je Sitzung/Look bitgleich oder Delta 2–4 · claude-of-tsushima: gleiche Runs schwankten bis zum Vorzeichen · 2026-07-30–08-02*

- **Messfenster endet an einem Ereignis, das A/B verschiebt** — beide Zahlen sind korrekt, aber decken verschiedene Arbeit ab. → Ganze Phase oder feste Besitzgrenzen messen; Marken auf beide Seiten setzen und Bestand plus Delta getrennt führen.
  *voxel-samurai-quiz: Produktionsbuild verschob GPU-Arbeit hinter den Mount und wirkte „dreimal schneller“ · claude-of-tsushima: zwei Bridge-Aufrufe lasen zwei Frames statt eines Besitzfensters · 2026-07-28–08-02*

- **Durchschnitt beantwortet eine Verteilungsfrage** — Peak, Fast-Schwarz, Stutter oder lokaler Defekt verschwindet im Mittel. → Histogramm/Quantile und Population ausgeben; Framekosten mindestens p50/p95/p99/Worst, Bildkanäle mit Unter-/Überlaufanteil.
  *voxel-samurai-quiz: Referenz 2,2× heller und trotzdem 23 % Fast-Schwarz · claude-of-tsushima: `created` streute, Programmbestand war über Läufe exakt stabil · 2026-08-01–02*

- **Instrument misst eine Nachbarfrage** — FPS im Warm-up gilt als GPU-Kosten, Rendererzähler enthalten Vorgängerframes oder Offline-Modell umgeht Shipping. → Fehlergate, Bildrate, GPU/CPU-Kosten und Produktintegration getrennt messen; jedes Instrument mit Null- und Positivkontrolle vergiften.
  *voxel-samurai-quiz: identische Zeile las 83,5 und 44,3 fps · claude-of-tsushima: Rendererzähler waren um Faktor 68 kumuliert · claude-flakes: Balance-Sweep war grün, Live-Callback zahlte weiter 1,00× · 2026-07-31–08-01*

- **Schranke ist über leerer Population grün** — `every`, `===0` oder „keine Naht“ wird besser, wenn das Subjekt fehlt. → Population/Nenner an dasselbe Verdict binden; Kamera oder Quelle absichtlich entfernen und Rot verlangen.
  *claude-of-tsushima: `whitecap clear` pass bei nur 8,59 % statt 36,7 % See · claude-flakes: fehlende Logs entfernten 38 Checks und ließen Fresh Clone scheinbar besser aussehen · 2026-08-01–02*

- **Reviewbefund wird als Schlussfolgerung übernommen** — Messung stimmt, Ursache nicht; der Satz wandert weiter. → Rohmessung übernehmen, Schluss selbst nachrechnen und den beschuldigten Term mit eigener A/B-Gegenprobe auf null setzen.
  *voxel-samurai-quiz: Reviewer lag in beiden Richtungen je einmal falsch · claude-of-tsushima: beschuldigtes Korn trug nur 1,8 % der Abweichung · 2026-08-01–02*

## Handoffs

- Capturebesitz und Reproduzierbarkeit → [Debug und Review](DEBUG-REVIEW.md)
- Kostenmodell → [Performance](PERFORMANCE.md)
