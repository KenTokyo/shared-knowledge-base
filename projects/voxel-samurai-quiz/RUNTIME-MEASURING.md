# Laufzeitmessung und Sondenstabilität — voxel-samurai-quiz (AEON)

**Lesen wenn:** du AEON-Rauschklassen, Lauf-Flags, Zustandsdrift, Zeitverhalten oder Sondenspalten bewertest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Allgemeine Messregeln stehen in [`../../threejs/MEASURING.md`](../../threejs/MEASURING.md); diese Werte und Bedeutungen gelten nur für die AEON-Sonden.

## Tipps

- **Eine Rauschgrenze auf alle Vergleichsklassen übertragen** — Same-frame, Neuflug und Code-/Flagwechsel werden mit demselben Boden bewertet. → Jede Klasse und Spalte separat kalibrieren; bei Neuflügen sind Posegeometrie und Deckungsmetriken nicht gleich stabil.
  *Same-frame bis 1e-4; 18 Neuflüge: 16 Geometriespalten 0,0000, `foe%` 0,077, `body%` 0,068, `near` 0,2 m, `sil` 1,84 · 2026-08-01*

- **Flag-Gruppierung für eine Ursache gehalten** — wenige Läufe sortieren sich sauber nach Modus, obwohl beide Gruppen unter demselben Flag auftreten. → Einen Kreuzlauf fahren, der mit dem Flag der einen Gruppe in der anderen landen könnte.
  *`camp:coast--engage bgL` schien über neun Läufe 4,5× am `--liftMode` zu hängen; fünf gleiche Modi ergaben 4× 0,0174 und 1× 0,0780. Sechs Läufe mit identischem Code und identischen Flags teilten dieselbe Spalte erneut in 4× ~0,0173 und 2× ~0,080 — die Zweiteilung gehört dem Ort, nicht dem Flag · 2026-08-01*

- **Zustandsspalte für Geometrie gehalten** — identischer Code und identische Flags lesen verschieden, weil `sky = pit + fov/2` die nicht von `snap()` geleerte Restgeschwindigkeit trägt. → `sky`/`bodX` an Engage-Zeilen um eine letzte Druckstelle tolerieren oder `fov` pinnen; Approach-Zeilen nicht so behandeln.
  *Aus `2·(sky−pit)` folgten 55,20 in 3/18 Läufen gegen 55,00 in 15/18, entsprechend ~0,23 m/s Restgeschwindigkeit · 2026-08-01*

- **`timewalk` nach Rig-Zustandsänderung ausgelassen** — der Capture-Pass bleibt grün, während Dämpfung, Reset oder Fallklippen zwischen Frames brechen. → `probes/timewalk.mjs` über Hang, Waagerechte und `snap()` fahren; Unstetigkeit als größten Nachbarschritt messen. Gilt **je Zustand**, nicht je Modus: ein zweiter gedämpfter Zustand braucht einen eigenen Lauf, und eine rohe *Länge* zwischen Frames ist dieselbe Defektfamilie wie ein roher Winkel — sie dollyt statt zu schwenken, und keine pausierte Pose sieht eines von beidem.
  *P15d: drei Defekte in 14/14 grünen Posen unsichtbar; Klippe 56,15°, reparierte Rampe 0,2597°, `snap()` 14,51° → 0. P15e: der zweite Zustand las Auge 0,7324 m je Frame gegen 0,0977 m im geschifften Modus, bei 14/14 grünen Posen · 2026-08-01*

- **Zeitknopf ohne Kontrollpass gedreht** — eine Dämpfungsrate gilt als folgenlos für Standbilder, bis sie innerhalb des Capture-Fensters nicht mehr auskonvergiert und die Posenspalten still verschiebt. → Kontrollpass mit alter *und* neuer Rate fahren; die Rate ist erst dann ein Zeitknopf, wenn die Geometriespalten Spannweite 0 lesen.
  *Rate 26 gegen 3, also Faktor 8,7: 16 Geometriespalten × 14 Zeilen Spannweite 0,0000, weil `exp(−3·150/60)` = 5,5e-4 von 1,98 m rund ein Millimeter ist · 2026-08-01*

- **Sweepstufen ohne Klammerpass gelesen** — die Rangfolge über acht Stufen ist plausibel, aber der Rauschboden stammt aus einem fremden Lauf und passt nicht zu dieser Sitzung. → Die erste Stufe am Ende derselben Sitzung noch einmal fahren und die Differenz als Boden melden; alles darunter ist keine Ablesung des Knopfs.
  *Zwei Sweeps über neun Raten lasen Klammer 0,0000 m auf Arm und Auge — damit war jede Differenz der Tabelle der Knopf und nichts sonst · 2026-08-01*

- **Roster vor dem Capture-Reset gelesen** — eine laufende Patrouille liefert einen Schwerpunkt für Positionen, die `DRIVE` unmittelbar danach zurücksetzt. → Site-Registrierung und Capture aus demselben Reset-Zustand ableiten.
  *`road:forest--approach` landete dadurch 3,6 statt 22 m vom nächsten Mann entfernt · 2026-08-01*

- **`dem` zwischen Modi direkt verglichen** — dieselbe Spalte trägt zwei Definitionen. → Bei `orbit`/`pull` als Restbedarf nach Bewegung lesen, bei `lift`/`cap`/`aim` als ursprüngliche Forderung.
  *P15d mischte andernfalls Nachzustand und Eingangsforderung in einer Rangfolge · 2026-08-01*

- **`near` für den gesetzten Abstand gehalten** — der Gegnerabstand scheint nicht reproduzierbar, obwohl die Begegnung weiterläuft. → `set` als Stand-off-Kontrolle lesen; `near` beschreibt den Zustand am Auslöser.
  *Zwischen Setzen und Messen liegen 2,5 s Weltlauf, in denen alarmierte Männer zulaufen · 2026-08-01*

- **`open` als Ortskonstante behandelt** — Werte aus Zwischenläufen werden mit einem Pass vermischt. → `open` nur innerhalb derselben Aufnahme vergleichen.
  *Die Größe wird pro Capture neu bestimmt und trug zwischen Zwischenlauf und Pass unterschiedlichen Zustand · 2026-08-01*

- **Relatives `sil` ohne Lichtboden gelesen** — Laublücken ändern `bgL`; zugleich kann hoher Kontrast auf fast schwarzem Gegner entstehen. → `foeL` und `bgL` gemeinsam lesen, absoluten Luminanzboden fordern und erst disjunkte Gruppen als Befund werten.
  *`foeL` blieb 0,0487/0,0488/0,0488 bei springendem `bgL`; andernorts wirkte `sil` 2,05/1,57 trotz `foeL` 0,0028/0,0037 gut · 2026-08-01*

- **Frame und Regionen aus zwei Quellen gelesen** — nach `poseFrame` fällt `game.capturing` auf false; der nächste Animationsframe überzeichnet beide Targets. → `ctx.read()` statt `ctx.frame()` plus `ctx.regions()` verwenden.
  *Das getrennte Paar lieferte plausible Zahlen aus einem Live-Frame mit weiterlaufender Uhr statt aus der Capture-Quelle · 2026-08-01*

- **Perf-Ring direkt nach dem Posieren gelesen** — der Median gehört überwiegend zur vorigen Kamera. → Framezeit in der Sonde selbst messen oder den 512-Frame-Ring vollständig erneuern.
  *`Perf.stats` hält 512 Frames (~8,5 s); eine Sekunde nach dem Posewechsel stammen rund 88 % noch vom Vorzustand · 2026-08-01*
