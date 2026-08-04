# Gegnerverhalten — duty-of-tsushima

**Lesen wenn:** Zustandsmaschine in `src/enemies/`, Abstandsband, Halteregel, Ansturm oder Standplatz.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Gate-Entwurf dazu: [`HARNESS-GATES.md`](HARNESS-GATES.md). Der Engine-Vertrag steht in der Repo-`ARCHITECTURE.md`.

- **Halteregel ohne Bindung an die eigenen Mittel friert die Figur ein** — Gegner steht in `engage`, sieht den
  Spieler, bewegt sich über Minuten keinen Meter. Ursache ist eine Warteregel, deren Bedingung er selbst nicht
  auflösen kann: der Spiegel des Kage-Musha übernimmt den Abstand, auf dem er den Spieler **zuerst** sieht, und
  hält ihn — auch bei 18 m, wo weder Nahkampf (3 m) noch Dash (zündet ab 0,55 × 16 m) greift. Den Abstand
  bestimmt der Spieler, also bestimmt er auch, ob der Gegner je handelt. Dieselbe Falle eine Woche vorher am
  Standplatz des Shiro-Yumi: Blinduhr nur bei `dist <= attack.reach`, jenseits davon stand er für immer.
  → Jedes Halteband ganz in das Fenster legen, in dem eine Aktion zündet (`mirrorBand` 10,5–14 m liegt samt
  ±1,6 m Bandbreite in (8,8; 16)), und die Gegenprobe mit **stehendem** Spieler fahren — ein bewegter Spieler
  löst jede solche Regel von außen auf und versteckt sie.
  *Vier Läufe à 20 s, Spieler steht: 35 → 24,67 m, 24 → 20,22 m, 18 → 18,00 m (Rechteck 0,0 × 0,0 m), 12 →
  8,73 m — in keinem ein einziger Schlag. Nach der Klammer 0,92–0,98 m Endabstand und 72 Schlagframes je Lauf.
  `tools/campaign.mjs` hing damit 119 s in Welle 12 · `/tmp/probe-mirror.mjs` · `5ec3eb6` · 2026-08-04*

- **Der Ansturm endet hinter dem Ziel** — der Gegner dasht und steht danach **weiter weg** als vorher, der
  Schlag fällt nie. Die Dauer kam aus der Reichweite (`range / speed`), ausgelöst wird der Dash aber schon ab
  `range × 0,55`: die Differenz läuft er hinter dem Spieler vorbei. Sichtbar wird das nur bei einem Gegner, den
  danach etwas festhält — der Ronin holte den Fehler zu Fuß wieder ein und schlug trotzdem zu, der Boss mit
  Spiegel nicht. → Die **Lücke** laufen, nicht die Reichweite (`dist − reach × 0,6`), und im Gate den
  Endabstand des Dashs prüfen statt seinen Auslöser.
  *kage-musha, Startabstand → Abstand beim Dashende: 15,5 → 1,07 m (schlägt zu), 13 → 3,57 m, 10,5 → 6,07 m,
  9,2 → 7,37 m (kein Schlag in 6 s). Nach dem Fix 0,78–1,32 m und 48 Schlagframes; Ronin 6,3 → 5,04 m mit 54,
  danach 0,72 m mit 81 Schlagframes · `/tmp/probe-dash.mjs` · `5ec3eb6` · 2026-08-04*
