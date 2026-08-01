# Runtime und Performance — claude-flakes

**Lesen wenn:** du Uhren, RNG, Reset, Audio, Cloth, Kamera, Pools, Allokationen oder Warm-up änderst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **`cancel()` stoppt den Effekt, aber rewound ihn nicht** — Fractional Debts, Site-Zähler, Cursors und Rest-Vapor blieben erhalten; separate `reset()`-APIs hätten die Liste verdoppelt. → `cancel()` als vollständigen stillen Rewind definieren und alle Sites, auch tote Pool-Slots, scrubben.
  *Sweep war vor dem Fix unter sechs gleichen Shots rot, danach alle fünf Spells über 18–20 Probe-Felder konstant · 2026-07-30*

- **RNG wird vor den Resets zurückgespult** — dann hängt der Startzug davon ab, wie viel Zufall die Reset-Arbeit verbrauchte. → Alle Owner zurücksetzen und `seedRandom()` als letzte Zeile des Rewinds halten.
  *Crystallise-Reset konnte je nach Site-Zustand Residual-Vapor ziehen; RNG-last machte den Shot immer bei Draw 0 starten · 2026-07-30*

- **Stummer Audiozustand verändert das Bild** — Audio-Grain und VFX teilten `Math.random`; Entmuten verbrauchte Zahlen vor Shard- und Partikelplatzierung. → Capture-gepinnte Settings nicht im Look-Reset überschreiben; langfristig RNG-Domänen trennen.
  *14 % eines tonlosen Crystallise-Frames bewegten sich bis Delta 84 · 2026-07-30*

- **Lineare Zufuhr unter linearer Drainage erzeugt keinen Ruhewert** — fünf Kamera-Kanäle addierten 0,06–1,01/s, der Drain zog 1,15/s und klemmte jeden Frame auf null. → Dauerzustand pro Frame als Level deklarieren (`max`), Impulse separat integrieren.
  *Alle fünf dokumentierten Dauer-Shakes tatsächlich 0; `holdShake` machte nur Vortex als Vollbildbewegung messbar · 2026-07-31*

- **Cast-Reaktion endet vor dem Impact** — `_release` war nach 0,323 s null, Crystallise wirkte erst 0,72 s später und die Figur stand wieder in Laufpose. → Reaktionshülle aus spätestem Wirkungsmoment rückwärts rechnen; Reviewframe muss noch messbare Brace/Throw-Energie tragen.
  *Crystallise bekam am Reviewframe 0,30–0,49 Brace; Sweep 38 % Wurf statt 1 %, Deltas nur auf Figur/Cloth · 2026-07-30*

- **Verlet-Solver läuft bei `dt=0` weiter** — `(pos-prev)` trägt keinen Zeitschritt; bei null blieb die volle Vorframe-Verschiebung erhalten. → Für `!(dt>0)` ohne Änderung an `prev` zurückkehren und mit einer „Solver ist wach“-Kontrolle testen.
  *165,03 mm Saumdrift über 30 Nullschritte→0,00 mm, echter Frame blieb 41,15 mm · 2026-07-29*

- **Bequemer Mock macht Achsen unsichtbar** — Identitätskamera nullte sechs von neun Basiskomponenten und ein gemeinsam benutztes Objekt leakte zwischen Szenarien. → Nicht achsenparallele orthonormale Basis rechnen, pro World frisch erzeugen und alle Property-Zugriffe breit inventarisieren.
  *Nur `rig.right` und `rig.up` fehlten; die schräge Basis deckte die vollständige Ribbon-Formel · 2026-07-29*

- **Heap-Sampler misst Retention statt Allokation** — verworfene 109,6 MB erschienen als 0,04 MB, gehaltene als 109,62 MB. → Profiler zuerst mit gleich großer kurzlebiger und gehaltener Positivkontrolle kalibrieren; GC/Scavenge als unabhängigen Gegentest fahren.
  *Reparierte Sonde änderte die Aussage 65,7→86.148 B/Frame · 2026-07-31*

- **Profiler beschuldigt Shippingcode für Harness-Müll** — Rest-Arrays und `typeof`-Screening im Simulator wurden in `_helices` gefaltet. → Verdächtige Site ungefoldet lesen, echte Funktion isoliert messen und eine körperfreie Nulllinie mitführen.
  *Echte `WaterBody.column`: 0,0 B/Aufruf; Stand-in 312,5 B, feste Arrayform 175,6 B, `Float64Array` 0,0 B · 2026-07-31*

- **Im Hotpath steht kein `new`, trotzdem 127 KB/Frame** — variadisches `Math.hypot` und nicht-inlinebare Double-Argumente erzeugten HeapNumbers. → Warm isolieren; für bekannte Dimension `sqrt(sum squares)` und Array+Smi-Flag an der Aufrufgrenze gegenmessen.
  *Cloth 126.982→131 B/Update (×967); gesamter gemessener Rest 86.148→6.709 B/Frame · 2026-07-31*

- **Kleine Restallokation wird auf Kosten der Mathematik entfernt** — sechs Doubles in `Float64Array` sparten 1,9 KB/Frame, machten aber Paralleltransport unlesbar. → Nach absoluter Rate und Wartungskosten entscheiden, nicht nur nach Prozent.
  *Rest rund 400 KB/s gegenüber zuvor 7,6 MB/s Cloth-Müll; Optimierung bewusst verworfen und Messweg dokumentiert · 2026-07-31*

- **Erster teurer Shot wird als First-Cast-Stutter gelesen** — 11,2 ms folgten der Position im Lauf, Crystallise als erster Spell brauchte nur 7,0 ms. → Laufposition rotieren und Pipelineliste auditieren; alle 19 ShaderMaterialien und neun Postpässe hier eager mit echter Geometrie wärmen.
  *Kein Ability-Pipeline-Lazy-Pfad; einzige echte Lazy-Topologie ist der Debug-`wireframe`-Schalter · 2026-07-31*
