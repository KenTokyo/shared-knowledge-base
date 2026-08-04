# Debug, Capture und Review-Evidenz — global

**Lesen wenn:** Capture, A/A, A/B, Probe, Regression oder sichtbare Ursache unklar ist.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

Agentische Sichtprüfung ist **kein Standardgate**. Sie braucht die ausdrückliche Freigabe im aktuellen Userauftrag; Reihenfolge, Werkzeug und Gesamtbudget stehen ausschließlich in [`CODING-RULES.md`](../CODING-RULES.md) §8–9. Diese Datei ordnet nur die technische Evidenz.

## Tipps

- **Zwei Bridge-Aufrufe liefern zwei Zustände** — zwischen Mutation, Render und Readback läuft die Seite weiter. → Mutation, Capture-Latch, Render und Readback in einem exklusiven Eval-/Requestfenster ausführen; tatsächliche Frame-/Eventsignatur mit ausgeben.
  *claude-flakes: `cast()` und `advance()` trennten ~10 Frames/0,15 s · claude-of-tsushima: After-Pose-Read lag 4,29–6,21 % neben dem Ziel-Frame · 2026-07-28–29*

- **`clear()` macht das Bild leer, A/A bleibt rot** — History, Federn, Pools, Debts, Uhren oder RNG überleben. → Voll-Rewind statt sichtbarem Clear; zwei verschiedene Vorgeschichten auf denselben Shot führen und Byte-/Fingerprintgleichheit verlangen.
  *claude-flakes: TAA-A/A ~5,8 %→0,00 %, sechs Zeitpunkte delta max 0 · voxel-samurai-quiz: Pool-/Animationsreset löscht Owner, Cursor und Snapshots gemeinsam · 2026-07-29–08-04*

- **Hide-Ablation ändert null Pixel** — Update setzt Sichtbarkeit zurück oder Post verarbeitet das alte Scene-Target. → Live setteln, Capture einfrieren, Hide unmittelbar vor echtem Szenenrender anwenden, danach im selben Targetbesitz lesen und exakt restaurieren.
  *claude-of-tsushima: 83/249 Kronen wurden vom LOD-Update wieder sichtbar; Post-Hide ohne Scene-Render ergab 0 Pixel · voxel-samurai-quiz: Shipping-Pose und gematchte Same-frame-Hide-Diffs waren Voraussetzung für belastbare Layerwerte · 2026-07-30–08-01*

- **Gleiche Spaltenzahl, anderer Farbraum** — HDR-Region und LDR-PNG werden gerankt, obwohl Tonemap/Grade dazwischenliegt. → Artefaktkopf nennt Target, Format, Farbraum, Alpha und Zeilenrichtung; Raw/HDR/LDR nie in derselben Rangfolge mischen.
  *claude-of-tsushima: Blütenrechteck 5,77 HDR gegen 2,79–2,92 LDR · claude-flakes: ein nichtfinites HDR-Texel wurde erst im Postpfad zum schwarzen Block · 2026-07-29–30*

- **Grüne Probe hat nichts gelesen** — leerer Sweep, falsches Szenariofenster oder fehlendes Artefakt liefert Exit 0. → erwartete Zeilen/Population und Mindestkardinalität binden; Detektor einmal gezielt vergiften; Gleichheit mit ungestörtem Lauf als „behauptet nichts“ behandeln.
  *claude-flakes: Ability-Szenario hatte identisches 49er-Tally wie ungestörter Lauf; leere Sweeps blieben grün · claude-of-tsushima: schwellwertfreies Wassergate bestand bei leerer Zielmenge · 2026-08-01–03*

- **Belegordner mischt Generationen** — abgebrochener Lauf lässt alte und neue Frames unter denselben Namen. → pro Lauf leeres, gescoptes Ziel; Abschluss nur aus Exit, erwarteter Anzahl, Zeitfenster und Summary; Quelle während Messlauf nicht editieren.
  *claude-flakes: 158 gemischte Logs statt 175/175 bis Bridge-Neuaufbau · voxel-samurai-quiz: alte Prefix-Frames verfälschten Sweep-Tabellen · claude-of-tsushima: HMR entfernte Bridge/Recorder während Framecost · 2026-07-30–08-01*

## Handoffs

- Zahlen und Schlussfolgerungen → [Messhandwerk](MEASURING.md)
- Laufzeitreset → [Runtime-Integration](RUNTIME-INTEGRATION.md)
