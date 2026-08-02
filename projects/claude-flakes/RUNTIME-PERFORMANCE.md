# Runtime und Performance — claude-flakes

**Lesen wenn:** Uhren, RNG, Reset, Audio, Cloth, Kamera, Pools, Allokationen oder Warm-up.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **`cancel()` stoppt, rewound nicht** — Debts, Site-Zähler, Cursor, Rest-Vapor bleiben. → `cancel()` als stiller Voll-Rewind; alle Sites und tote Pool-Slots scrubben.
  *Vorher 6 gleiche Shots rot; danach 5 Spells über 18–20 Felder konstant · 2026-07-30*

- **RNG vor Resets zurückgespult** — Reset-Randomness verschiebt Startzug. → Alle Owner resetten; `seedRandom()` letzte Rewind-Zeile.
  *Crystallise-Reset zog je Site Rest-Vapor; RNG zuletzt startet immer Draw 0 · 2026-07-30*

- **Audiozustand verändert Bild** — Audio und VFX teilen `Math.random`; Entmuten verbraucht Shard-RNG. → Capture-Settings nicht im Look-Reset; RNG-Domänen trennen.
  *14 % Crystallise-Frame bis Delta 84 · 2026-07-30*

- **Lineare Zufuhr plus lineare Drainage ohne Ruhewert** — 5 Kamera-Kanäle +0,06–1,01/s, Drain −1,15/s, jedes Frame null. → Dauerzustand als Level (`max`), Impulse integrieren.
  *5 Dauer-Shakes tatsächlich 0; `holdShake` machte nur Vortex messbar · 2026-07-31*

- **Cast-Reaktion endet vor Impact** — `_release` nach 0,323 s null, Crystallise 0,72 s später. → Hülle vom spätesten Wirkungsmoment rückwärts; Reviewframe mit Brace/Throw-Energie.
  *Reviewframe 0,30–0,49 Brace; 38 % Wurf statt 1 %, Deltas nur Figur/Cloth · 2026-07-30*

- **Verlet bei `dt=0` aktiv** — `(pos-prev)` trägt Vorframe-Verschiebung weiter. → Bei `!(dt>0)` ohne `prev`-Änderung zurück; Wachkontrolle.
  *165,03 mm Drift/30 Nullschritte→0,00; echter Frame 41,15 mm · 2026-07-29*

- **Mock verdeckt Achsen** — Identitätskamera nullt 6/9 Komponenten; geteiltes Objekt leakt. → Schräge orthonormale Basis, frische World je Szenario, Property-Zugriffe inventarisieren.
  *Nur `rig.right`/`rig.up` fehlten; schräge Basis deckte Ribbon-Formel · 2026-07-29*

- **Heap-Sampler misst Retention** — verworfene 109,6 MB erscheinen 0,04, gehaltene 109,62. → Kurzlebige/gehaltene Positivkontrolle; GC/Scavenge separat.
  *Reparatur änderte Aussage 65,7→86.148 B/Frame · 2026-07-31*

- **Profiler zählt Harness-Müll als Shipping** — Simulatorarrays/`typeof` in `_helices`. → Site ungefoldet, echte Funktion isoliert, körperfreie Nullzeile.
  *`WaterBody.column`: 0,0 B; Stand-in 312,5 B, Array 175,6 B, `Float64Array` 0,0 B · 2026-07-31*

- **Kein `new`, trotzdem 127 KB/Frame** — variadisches `Math.hypot`/Double-Argumente erzeugen HeapNumbers. → Warm isolieren; `sqrt(sum squares)`; Array+Smi-Flag gegenmessen.
  *Cloth 126.982→131 B/Update (×967); Gesamt 86.148→6.709 B/Frame · 2026-07-31*

- **Profiler-Fund wird ohne Gegenbenchmark optimiert** — Typed Array verschleiert Mathematik; handgeschriebener Newline-Loop wirkt billiger als nativer Split. → Echten Korpus A/B-messen; absolute Rate, Gesamtlauf und Wartungskosten entscheiden.
  *Typed Array sparte nur 1,9 KB/Frame; Newline-Loop 2,050 statt 1,065 ms — beide Umbauten verworfen · 2026-07-31/08-02*

- **Erster teurer Shot als First-Cast-Stutter** — 11,2 ms folgt Laufposition; Crystallise als erster 7,0 ms. → Position rotieren, Pipelines auditieren; 19 Materialien/9 Postpässe eager mit echter Geometrie.
  *Kein Ability-Lazy-Pfad; nur Debug-`wireframe` lazy · 2026-07-31*
