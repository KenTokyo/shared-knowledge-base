# Runtime-Integration, Uhren und Lifecycle — global

**Lesen wenn:** Reihenfolge, Pause, Reset, Poolidentität, Audio oder Frame-zu-Frame-Zustand falsch reagieren.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

## Tipps

- **Consumer liest den vorigen Frame** — Hand, Trail, Kontakt oder Kamera hinkt genau einen Frame hinterher. → Datenfluss explizit ordnen: Gameplay → Pose → Weltmatrizen → Kontakt/VFX → Kamera → Render; Consumer liest den finalen Ownerzustand, nicht einen parallel fortgeschriebenen Proxy.
  *voxel-samurai-quiz: Stützhand muss nach Klassenpose und `updateMatrixWorld` laufen · claude-flakes: Figure, Wake und Deformationswriter teilen ausgewertete Weltpunkte statt unabhängige Updates · 2026-07-25–08-04*

- **`dt=0` stoppt die Welt nicht** — Verlet trägt Vorframebewegung weiter oder ein zustandsgetriebener Zweig feuert trotz Pause. → Zeitintegration bei `!(dt>0)` ohne History-Mutation verlassen und Weltstopp zusätzlich über ein Pause-Flag gattern; Simulations-, Real- und Audiozeit getrennt benennen.
  *claude-flakes: 165,03 mm Drift über 30 Nullschritte→0,00; zustandsgetriebener Wave-Zweig blieb aktiv · claude-of-tsushima: skaliertes `dt` verlängerte 38-ms-Hit-Stop auf bis ~0,25 s · 2026-07-29–08-04*

- **Reset löscht das Bild, nicht die Geschichte** — gleicher Shot hängt von TAA, Cloth, Federn, Pools, Debts, Audio oder Vorgeschichte ab. → Einen atomaren Rewindvertrag führen: Consumer lösen, CPU/GPU-Slots und Cursor leeren, Clocks/History resetten, RNG als letzte Zeile seeden.
  *claude-flakes: A/A mit TAA ~5,8 %→0,00 %, sechs Zeitpunkte delta max 0 · voxel-samurai-quiz: Klassen- und VFX-Reset löschen Snapshots, Owner und Cursor gemeinsam · 2026-07-29–08-04*

- **Ein gestoppter Producer hinterlässt Licht oder Audio** — Ressource bleibt am letzten Wert, weil der frühe Return kein Teardown erreicht. → Flüchtige Wünsche pro Frame deklarieren und nach Verbrauch auf null setzen; persistente Handles brauchen Generation/Owner und explizites Release.
  *claude-flakes: Spell-Lights werden je Frame neu deklariert · voxel-samurai-quiz: Apex-Lichtwünsche werden nach jedem Frame verbraucht; sonst leuchtete die Todesstelle weiter · 2026-08-02–08-04*

- **Endzustand ersetzt ein Ereignis** — Consumer kann Wiederholungen, verweigerte Casts oder mehrere Kontakte nicht unterscheiden. → Monotone Event-ID/Generation plus `fired/refused/dropped/stale`-Zähler führen; Zustand beschreibt Gegenwart, Event beschreibt Übergang.
  *voxel-samurai-quiz: Cast-ID und exhaustive Ereigniskinds besitzen VFX-Slots · claude-flakes: Event-/Phasenkontinuität und individuelle Growth-Uhren ersetzten grobe Plant-States · 2026-07-31–08-04*

## Handoffs

- Pose/Kontakt → [Animation und Charakter](ANIMATION-CHARACTER.md)
- Effektpools → [VFX](VFX.md)
- Hotpathkosten → [Performance](PERFORMANCE.md)
