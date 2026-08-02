# Spielperformance — voxel-samurai-quiz (Spiel, Port 3070)

**Lesen wenn:** Shader-Kompilate, VFX-Layer, Render-Hüllen oder die `compile`-Spalte aus `pnpm game:perf`.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Weltseite (AEON, Port 3074): [`WORLD-PERFORMANCE.md`](WORLD-PERFORMANCE.md). Instrument: `src/capture/svqBridge.tsx`
(Kompilatzähler, Besitzer über `properties.get(material).currentProgram.cacheKey`), Ausgabe `scripts/game/perf.mjs`.

## Tipps

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

A/B ab Commit `818954ea` gegen `.tmp/fix1-l12.json`; alles davor enthält den Thrash. Zielspalten `cpu.medianMs`
und `compile.msTotal`, immer `pnpm game:perf` mit drei Blöcken. `msTotal` ist eine Obergrenze — es summiert die
ganze CPU-Zeit der Frames, in denen ein Programm entstand.
