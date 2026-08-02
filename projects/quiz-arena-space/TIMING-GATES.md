# Frame-Zeit-Tore und Host-Last — quiz-arena-space

**Lesen wenn:** du ein Tor über Frame-Zeit, Ruckler oder Laufzeit baust, nachziehst — oder aus einem Laufzeitvergleich einen Performance-Gewinn ableiten willst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Diese Datei existiert, weil in diesem Repo ein Frame-Zeit-Tor **stillgelegt** werden musste: das
Fehlersignal lag unter dem Rauschboden des Wirts. Wer hier ein Tor baut, baut gegen eine Maschine, nicht
gegen einen Build. Szenarienfehler stehen in [`BENCH-SCENARIOS.md`](BENCH-SCENARIOS.md).

- **Dasselbe unveränderte Bundle geht mal grün, mal rot** — die Schranke war ein Verhältnis, aber unter
  Last wächst der Schwanz schneller als der Median: das Verhältnis **verstärkt** die Maschine, statt sie
  herauszukürzen. → Vor jeder Kalibrierung dasselbe Artefakt mehrfach unter *verschiedener* Last fahren,
  nie einmal auf ruhigem Host.
  *6 Läufe eines unveränderten Bundles spannen `hitch` 0→37 und `stall` ×2,4→×24,1; über 15 Läufe steigt
  `p95/med` monoton 1,39 → 2,92 · 2026-07-30*

- **Das Rauschen erzeugt mehr Fehler-Spikes als der injizierte Fehler** — nach dem Scheitern der
  Verhältnis-Schranke sollte eine absolute Zählschranke retten; das Fehlersignal liegt auf diesem Wirt in
  **beide** Richtungen unter dem Rauschboden. → Ein Tor, das das nicht trennen kann, wird **stillgelegt**,
  nicht neu geschwellt. Scharfstellen braucht eine andere Stichprobe (ruhiger Host, Best-of-N), nicht eine
  andere Zahl.
  *`over[25ms]`: 0 gesund+ruhig, 32 mit injiziertem 40-ms-Stutter, aber 37 und 36 gesund **unter Last**;
  bei 50 ms ist der Fehler 0 und das Rauschen 3–4 · 2026-07-30*

- **Schwanzstatistik meldet den teureren Build als den ruhigeren** — `over25`, `p95`, `over12` und `over16`
  zählen genau die Frames, die auch der Host aufbläht. Ein Build, der auf *jedem* Frame 1,7× teurer ist,
  lief durch alle Frame-Tore grün. → Von den veröffentlichten Statistiken war nur der **Frame-Median**
  monoton im injizierten Fehler; das Tor auf `min(med)` über N Läufe legen.
  *`drizzle=4` meldete 4 Frames über 25 ms, eine gesunde Sitzung 5; Median-Minima 5,70/5,60/7,10/9,50/13,50
  über 5 Arme à 10 Läufe · 2026-07-31*

- **Eine absolute ms-Schranke importiert den Sitzungs-Offset des Hosts** — das frisch gebaute Tor bei
  9,0 ms ließ einen 4-ms-Defekt grün durch, weil nur der **Überschuss** stabil ist, nicht die Höhe. →
  Schranke am gemessenen gesunden Boden ausrichten und die **Nicht-Portabilität auf andere Wirte als
  definierende Eigenschaft** dokumentieren, nicht als Fußnote.
  *Median-Minimum gesund 4,90 gegen `drizzle=4` 8,90; 0,6 ms Sitzungsdrift versteckten 4,0 ms injizierten
  Defekt; gesunde Böden streuen 4,90–6,50, also 33 % · 2026-07-31*

- **Der vorgeschlagene Normierer lief rückwärts zur Last** — der aus der Vorschicht geerbte Fix hätte auf
  ruhigem Host gelockert und auf belastetem verschärft, weil er gegen den *gemessenen* Median normiert und
  Last diesen Median hebt. → Einen vorgeschlagenen Normierer erst unter **kontrollierter** Last messen
  (selbst-terminierende CPU-Spinner), dann implementieren.
  *3,3 % ruhig → 1,1 % bei +4 → 1,1 % bei +8 Spinnern; drei Host-Kontrollen in ~20 Minuten widerlegten
  einen Plan, der eine Schicht Implementierung gekostet hätte · 2026-07-30*

- **Wanduhr-Vergleiche driften monoton bei unverändertem Code** — ein ABA-Test „belegte" einen
  Performance-Gewinn, der reine Fremdlast war. → Struktur-Maße (Anteile, Profil) oder Minimum-aus-N plus
  ABA nehmen; Wanduhr-Einzelvergleiche verwerfen.
  *ABA 2,32 → 2,88 → 3,16 s bei identischem Code, während `ps` fremdes Chromium mit 64 % + 28 % und
  WindowServer mit 99 % zeigte. Belastbar blieb nur die Struktur: 94,5 % der Laufzeit in `spawnSync` · 2026-08-01*

- **Phantom-Defekte, weil eine Messschleife der Vorschicht noch lief** — Prüfbefehle lasen gepatchte
  Dateien; das Ergebnis sah aus wie ein Dutzend Defekte. → Vor jeder Prüfung nach laufenden Bench-Prozessen
  sehen und abwarten — aber **nicht** mit einer `kill -0`-Warteschleife, die verbrennt einen Kern und
  verfälscht dieselbe Messung.
  *Zwei von drei Zeitmessungen kontaminiert: 197,87 s (Kollision) und 181,79 s (Warteschleife) gegen
  175,88 s sauber · 2026-08-01*

- **Endpunktzählung liest „im Lead passiert" und „nie passiert" beide als +0** — ein einzelner Lauf führte
  zur Schlussfolgerung „der Auslieferungspfad deckt den Stall ab, mein Fund ist ein Diagnose-Artefakt";
  tatsächlich passiert es immer, nur der **Zeitpunkt** wandert. → Zensus im Sekundentakt über die ganze
  Aufnahme inklusive Lead fahren und das Delta pro Tick **benennen** statt zu zählen.
  *Vier Läufe desselben Builds kompilierten bei t 8,4 / 8,4 / 10,6 / 1,5 s; der Stall selbst war
  `max=311ms@8,4s` mit `PROG:+1` im selben Frame · 2026-07-30*
