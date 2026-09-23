# Schranken und Gates — claude-of-tsushima

**Lesen wenn:** du aus einer gemessenen Zahl ein Verdikt machst — Schranke, Gate, Exit-Code, Falsifikation.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Messen selbst: [`CAPTURE-MEASURING.md`](CAPTURE-MEASURING.md). Hier nur die Lücke zwischen Zahl und `pass`. Leitfrage: **kann diese Zeile rot werden, und rötet sie das, was sie meint?**

- **„Exakt 0" ist über einer leeren Menge grün** — schwellwertfreie Schranken (`=== 0`, `every`, „keine Naht") werden stärker, je weniger man ihnen gibt. → Population unter die Schranke drucken **und mitbinden**; dann die Kamera wegdrehen und prüfen, dass die Zeile es merkt.
  *`whitecap clear` las `pass` bei 8,59 % statt 36,7 % See im Bild · `review/water-p33-inj-sky.txt` · 2026-08-02*

- **Unabhängigkeit behauptet statt injiziert** — zwei Zeilen scheinen einander mitzudecken; `cap%` zählt `whitecap > 0`, und `smoothstep(…) * gate` ist bei jedem positiven Gate positiv, bindet das Gate also nie. → Zu jedem Schrankenpaar fragen, welche Injektion **genau eine** rötet — und beide einzeln fahren.
  *Kante → `(1.5, 2.5)`: nur `whitecap` rot, Gate bleibt 1. `SWELL_HI` → `2.0`: nur `gate` rot (0,7222), `cap%` bleibt 1,0027 · `review/water-p33-inj-edge.txt`, `-inj-gate.txt` · 2026-08-02*

- **Abgeleitete Länge prüft die Quelle zweimal** — `col = sweep.map(…)`, also *ist* `col.length` gleich `sweep.length`: zwei rote Zeilen für einen Defekt, keine für den echten Achsenfehler. → Wächter nach seiner Frage benennen und auf der Quellsammlung behaupten, nie auf einer abgeleiteten.
  *Injektion `narrow`: alt **zwei** rote Zeilen, neu **eine**; `vacuous` bekam erst danach `axisShort` · `review/spark-p33-old-narrow.txt`, `-new-narrow.txt`, `-new-vacuous.txt` · 2026-08-02*

- **Schwelle vom Papier statt aus der Verteilung** — eine Summe nicht paralleler Wellenzüge erreicht ihre Amplitudensumme nur dort, wo alle Kämme zusammenfallen; die abgelesene Schwelle liegt systematisch zu hoch und der Term feuert nie. Diagnoseweg steht global ([`WATER.md`](../../threejs/WATER.md) §5, „wirkungsloser Schaum → Rohterm-Min/Max"), hier die Ursache. → Verteilung zurücklesen (p50/p90/p99/p999/max), nicht die rechnerische Obergrenze; zwischen p99 und Maximum bewegt sich der gebundene Anteil um zwei Größenordnungen.
  *Summe 0,917 m, Kante 1,5 m, gemessenes Maximum des rauhesten Wetters 1,4502 m — Term fünf Phasen lang in jedem Wetter tot · `review/crest-p32c.txt` · 2026-08-02*

- **Oberkante, die das Spiel nie erreicht** — Regler auf 2,1 geklemmt, also *liest* eine Kante bei 2.0 als erreichbar; die speisende Tabelle endet bei 1,705, ein Viertel des Bereichs liegt hinter dem Ende der Welt. → Rampenendpunkte aus der speisenden Tabelle ableiten (`Math.max(…, ...Object.values(TABLE).map(f))`) statt hinschreiben; dann richtet ein neues Preset die Schranke selbst nach.
  *Schlimmster ausgelieferter Sturm bekam `gate 0.7222` — 72 % eines auf 100 % geschriebenen Effekts · `review/crest-p32c.txt` · 2026-08-02*

- **Helligkeitsgate als Wächter über Oberflächenqualität** — Breite, Median und p99 gingen alle grün durch einen Nachbau, der im Bild als Cordsamt las: ein Musterfehler verschiebt kein Percentil, weil er Licht nur *umverteilt*. Die Zeile, die als Frühwarnsystem der Materialachse geführt wurde, kann für diese Frage gar nicht rot werden. → Vor dem Vertrauen benennen, welche **Bildstörung** eine Zahl überhaupt bewegen kann; für Muster und Frequenz braucht es ein Frequenz- oder Anisotropiemaß, sonst bleibt die Achse ungegatet und das ehrlich so dokumentiert.
  *`roh` PASS bei Median 25,7 / p99 134 / 16 Bändern in Toleranz — Sichtprüfung zeigte durchgehende Rillen über Torso, Hose und Wickel · PH10 · 2026-08-04*
