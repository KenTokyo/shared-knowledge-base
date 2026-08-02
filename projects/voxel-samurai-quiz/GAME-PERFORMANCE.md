# Spielperformance — voxel-samurai-quiz (Spiel, Port 3070)

**Lesen wenn:** Shader-Kompilate, VFX-Layer, Render-Hüllen oder die `compile`-Spalte aus `pnpm game:perf`.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Weltseite (AEON, Port 3074): [`WORLD-PERFORMANCE.md`](WORLD-PERFORMANCE.md). Instrument: `src/capture/svqBridge.tsx`
(Kompilatzähler, Besitzer über `properties.get(material).currentProgram.cacheKey`), Ausgabe `scripts/game/perf.mjs`.

## Tipps

- **Warmup-`compile()` ohne gebundenes Render-Target** — jedes Material bekommt zwei Programme, Warmup zahlt
  doppelt und verhindert nichts. `parameters.outputColorSpace` steht im `cacheKey` und wird aus
  `renderer.getRenderTarget()` **zur Compile-Zeit** abgeleitet (`WebGLPrograms.js:118`/`:209`): ohne Ziel `srgb`,
  mit Ziel `workingColorSpace` (`srgb-linear`). Ein Warmup aus `useFrame` läuft nach dem letzten Pass der
  Postkette, also canvas-gebunden — die Kette rendert die Szene danach in ihren `inputBuffer` und lässt alles
  erneut kompilieren. Symptom ist tückisch: `rebuiltKeys: 0`, jeder Besitzer `×1`, Materialflags sichtbar
  identisch. → Vor `compile()` das Ziel des echten Szenenrenders binden und danach zurückbinden; ohne Postkette
  `null` lassen. Gleiches Fenster gilt für `toneMapping` (`:177`).
  *Etage 12: B1 34/31 Kompilate 8269/7911 ms → 15/15 mit 1009/999 ms, B2 5/7 mit 1210/1919 ms → 0, wall p99 B1
  335/333 → 34/42 ms, cpu max B2 666/1368 → 17/26 ms; 14 der 15 Restkompilate sind Erstauftritte. Zwei Läufe je
  Seite, Median unverändert 5,2–5,9 ms · 2026-08-02*

- **Wandernde Programm-Absolutzahl als Rauschen abgetan** — sie war das Symptom. Der Doppelcompile hängt am
  Timing: die zweite Kompilatwelle sieht andere Lichtzahlen als die erste (`numPointLights` 10→13), also
  entstehen je Lauf andere Varianten. Blockbeginn wanderte 201/203/216/298/315/348, Bestand am Ende 226 bis 350.
  Nach dem Fix steht er auf 227 in beiden Läufen. → Eine über Läufe springende Programmzahl bei stabiler Szene
  ist ein Befund, keine Messstreuung.
  *2026-08-02*

- **Kompilate gegen Höchstmarke oder Enddelta gezählt** — „0 neue Programme" bei laufendem Dauerthrash;
  `info.programs` ist refgezählt, three gibt ein Programm frei, sobald das letzte Material darauf entfällt.
  238 → 235 → 238 sind drei Kompilate mit Enddelta 0. → Stand in **beide** Richtungen gegen den **Vorframe**
  führen, über die `cacheKey`-Menge diffen (nie über Länge), `created`/`removed`/`rebuiltKeys` getrennt melden;
  Absolutzahl nie deuten.
  *`added: 0` bei 238 → 235; gegen den Vorframe 55 kompiliert / 58 freigegeben — der Thrash blieb zwei Schichten
  unsichtbar. Blockbeginn wanderte über fünf Läufe 201/203/298/315/348 · 2026-08-02*

- **Render-Hülle bei Inaktivität ausgehängt** — Kompilate bei jeder Salve, `compile.msTotal` im Sekundenbereich
  ohne neuen Szeneninhalt. Ursache: Aktivitätsgatter nimmt die VFX-Hülle Sekundenbruchteile nach dem letzten
  Effekt aus dem Baum, der Unmount entsorgt alle InstancedMesh-Materialien auf einmal, three gibt die Programme
  refgezählt frei, die nächste Salve kompiliert neu. Spart nichts, wenn die Hülle bei null Instanzen ohnehin
  `visible = false` setzt — three überspringt sie schon in `projectObject`, kein Draw Call, kein `setProgram`.
  → Hüllen mit Leerlaufpfad montiert lassen, nur über den Feature-Schalter gattern; Leerlaufpfad vor dem
  Aushängen belegen, nicht annehmen.
  *`Effects.tsx`, 4 Gegnergeschoss-Layer × 11 InstancedMesh: 9 Thrash-Schlüssel → 0 (drei Vorher-Läufe identisch),
  Kompilate 50→5 / 65→2, `msTotal` 2467→1210 / 2398→684 ms, Frames je 15 s 1065→1532 · 2026-08-02*

## Vorher-Stand

A/B ab Commit `545d5133` gegen `.tmp/rt2-l12.json`; davor liegt der Doppelcompile, noch davor der Thrash.
Zielspalten `compile.msTotal`, `wall.p99Ms` und `cpu.maxMs` je Block, immer `pnpm game:perf` mit drei Blöcken.
`cpu.medianMs` trägt hier nichts mehr: Kompilatspitzen stehen im Schwanz, der Median lag über alle sechs Läufe
bei 5,2–5,9 ms. `msTotal` ist eine Obergrenze — es summiert die ganze CPU-Zeit der Frames, in denen ein Programm
entstand. Ein einzelner Lauf trägt in der Kompilatspalte nicht; zwei je Seite sind das Minimum.

Das Instrument benennt seit `c4a1b837` das `cacheKey`-Feld, in dem ein neues Programm vom ähnlichsten
vorhandenen abweicht, und druckt eine rohe Schlüsselprobe mit erkannter Kopflänge (`probe`-Zeile). Rumpf ist
**51** Felder lang: 48 Parameter, **zwei** Boolean-Masken (`WebGLPrograms.js:539`/`:589`), dann
`renderer.outputColorSpace`. Wer die Felder nachrechnet statt die Probe abzuzählen, verschiebt sie.
