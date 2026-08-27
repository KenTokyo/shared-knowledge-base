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

- **`dt=0` friert nur zeitgetriebene Zweige ein** — zwei Bilder, ein Mechanismus. Verlet trägt über `(pos-prev)` die Vorframe-Verschiebung weiter. Und ein Zweig, der auf **Zustand** prüft statt auf eine Uhr, feuert bei Nullzeit unverändert: `Combat.update` erreicht „wave cleared“ über `standingCount === 0`, also hätte „clear targets“ im gestoppten VFX-Studio den Cairn (z-index 140) über dem Panel (100) geöffnet — Spieler hinter zwei Panels, das untere unerreichbar. → Bei `!(dt>0)` ohne `prev`-Änderung zurück. Jeden Weltstopp zusätzlich über das vorhandene Pause-Flag führen (`combat.paused`), nie über die Uhr allein. Wachkontrolle: im gestoppten Frame jeden Zustandszweig einmal von Hand auslösen.
  *165,03 mm Drift/30 Nullschritte→0,00, echter Frame 41,15 mm · 2026-07-29 — Panel hinter Panel statisch gefunden, im Bild nie sichtbar gewesen · 2026-08-04*

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

- **Generisches Szenario-Fenster verfehlt die kurze Ability** — Abbruch bei 0,9 s ist mid-flight für Spells, die Sekunden hängen; ein Projektil liegt nach ~0,30 s, `cancel()` schrubbt leeren Pool und nimmt den Early-Return. Grün, und das Aufruf-Tally ist **identisch** zum ungestörten Lauf — Mindestpopulation und Nennerprüfung greifen nicht, es werden ja Aufrufe gescreent. → Jedes Szenario mit generischem Parameter per `--verbose` gegen den ungestörten Lauf diffen; Gleichheit heißt „behauptet nichts“. Fenster je Ability aus ihrer eigenen Flugzeit ableiten und die tragenden Konstanten am Parameter benennen.
  *`bolt/steady/cancel` las 49 `spray.emit` wie `bolt/steady`; mit `cancelAt: 0.20` 18, ohne `combat.hit`/`deform.brush` · 2026-08-03*

- **Bildschirmgröße mit Boden, ohne Deckel** — eine UI-Ebene, die mit `1/Sichttiefe` skaliert, hat keine natürliche Obergrenze: der Divisor ist eine Strecke, die der Spieler auf null laufen darf. Beim Port aus der Referenz überlebt der Boden (`MIN_SCALE`) und die Decke (`viewport cap`) fällt weg, weil der Boden sichtbar etwas tut und die Decke im Normalfall nie greift. Kein statischer Check sieht es — die Zahl entsteht erst aus einer laufenden Kamera, jedes Modul ist *auf dem Papier* gegen ein Repaint pro Frame abgesichert. Teuer ist nicht das Neuberechnen, sondern das Rastern der Ebene: `will-change: transform` macht sie zum eigenen Compositor-Layer, drei weiche `text-shadow` liegen drauf, und jeder Frame mit geänderter Skalierung rastert neu. → Beim Übernehmen einer Skalierungsregel Boden **und** Decke zählen; die Decke gegen den Viewport ausdrücken, nicht in Pixeln, weil die Kosten die Layerfläche sind. Zusätzlich am Weltende klemmen — beides, weil die Weltklemme beim Raise einfriert und der Spieler danach 22 s weiterläuft.
  *Snowflow-Antwortlabel projizierte auf 155187 x 48496 px = 81 Viewports; mit `MAX_SCALE_VIEWPORT 1.5` + `NEAR_HIDE 1.25` + `squareSpread` jetzt 689 x 215 px bei 1920 px. Style-Recalcs blieben bei 161/s (= 1/Frame, 0,13 ms) — die Rate war nie die Rechnung · 2026-08-21*

- **Kostenschätzung aus der Dreieckszahl** — „ein Drittel weniger Ecken ⇒ 0,2–0,3 ms“; gemessen ≤ 0,08 ms, also innerhalb der eigenen 3 %-Drift des Laufs. Ursache: die Vertexstufe war nie der Engpass. Nach 1,65 ms CPU-Boden (`no-draw`) liegen die restlichen 3,13 ms gleichmäßig auf vier Pässen à ~0,18 ms, und ein Indexpuffer senkt Ecken — nicht Dreiecke, nicht Draw Calls, nicht Füllrate. → Vor dem Umbau eine Sonde bauen, die genau diese Achse abschaltet; Attributzahlen sagen nichts über ms. Änderung behalten, wenn sie nichts kostet und das Bild identisch bleibt, aber nicht als Gewinn melden und die widerlegte Vorhersage in der Phase streichen statt mitschleppen.
  *`VoxelBuilder`-Indexpuffer: Combat 4,83–4,86 → 4,78 ms bei 1920×1080/ratio 1 auf RTX 2080; 404 Draw Calls und 1.436.347 Dreiecke unverändert · 2026-08-27*

- **Zwei Spalten aus einem Lauf, nur eine gültig** — dieselbe Messung liefert eine brauchbare Combat-Spalte und eine unbrauchbare Idle-Spalte; ohne die Drift-Zeile sieht man den Unterschied nicht, beide Tabellen sehen gleich sauber aus. Ursache: die Basislinie wird vor **und** nach dem Sondenfenster gelesen, und auf einem Rechner bei 96 % CPU wandert sie über den Lauf (idle 5,16 → 4,38 ms = 15 %), während die spätere Szene sich einpendelt (combat 3 %). Sonden gegen eine wandernde Basislinie werden reihenweise negativ und lesen sich wie „kostet nichts“. → Drift je Szene lesen, nicht je Lauf: ≤ 5 % berichten, darüber die frühere Ruhemessung stehen lassen und den Grund nennen. Den Lauf nicht ganz verwerfen — die andere Szene kann gültig sein.
  *`flakes-perf --ratio 1`: combat 4,78 ms bei 3 % übernommen, idle 4,38 ms bei 15 % verworfen zugunsten der 4,06 ms aus dem ruhigen Lauf · 2026-08-27*
