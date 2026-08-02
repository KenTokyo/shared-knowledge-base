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
  *Etage 12: Ladeschritt `scene` (Settle) 26552/26752 → 20157/20433 ms, also **−6,3 s Ladebildschirm** bei
  gleichen `map`/`encounter`-Schritten. B1 34/31 Kompilate 8269/7911 ms → 15/15 mit 1009/999 ms, B2 5/7 mit
  1210/1919 ms → 0, wall p99 B1 335/333 → 34/42 ms, cpu max B2 666/1368 → 17/26 ms; 14 der 15 Restkompilate
  sind Erstauftritte. Zwei Läufe je Seite, Median unverändert 5,2–5,9 ms · 2026-08-02*

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

- **Stage-Mount ist Render-Sturm plus ein `gl.render`-Aufruf — nicht der React-Commit** — `scene` meldete 18–20 s
  Mount ohne Adresse. Marken in den Komponentenrümpfen (`markPostStartSceneSettlePhase`) plus `c:`/`p:`-Marken aus
  `StageCommitMark.tsx` (Layout- bzw. passive Effekte, als **Geschwister** zwischen den Schichten, nie als Hülle)
  trennen die Posten: Der Stage-Chunk ist warm (`runtime` rendert bei 163 ms), aber der Teilbaum wird **fünfmal
  komplett verworfen und neu gerendert**, weil alles an EINER Suspense-Grenze hängt — ein suspendierendes Kind
  entsorgt den ganzen Baum. Die Abbruchstelle liest man an den Zählern ab: gleiche Zahl = Versuch kam vorbei,
  kleinere Zahl = hier brach er ab. Der **Commit selbst kostet 71–76 ms**; die Sekunden danach stehen in **einem
  einzigen `gl.render`**, das die neue Szene zum ersten Mal zeichnet (Three initialisiert dort GPU-Ressourcen).
  → Kein Posten wird einer Phase zugeschrieben, bevor auf **beiden** Seiten der Lücke eine Marke sitzt. „Großer
  Block direkt hinter dem Renderende" heißt nicht „React committet".
  *Etage 12, drei Läufe `.tmp/commit1..3-l12.json`: Renderphase 163→12049 ms; Commit `c:start`→`c:subtree`
  76/71/74 ms; danach **5494 ms ohne jede React-Marke**; passive Effekte `p:start`→`effect` 651 ms. In der Lücke
  `render 4526 ms in 896 Aufrufen, laengster 3808 ms endet bei 17663 ms` — 5 ms vor `p:start`. Widerlegt die
  vorherige Fassung dieses Tipps („Commit 11774→17849 ms") · 2026-08-02*

- **Produktionsbuild als „dreimal schneller" gelesen — er verschiebt den GPU-Posten, er senkt ihn nicht** —
  Prod meldete `Stage 5266 ms` statt 17811 ms und `render 7 ms in 336 Aufrufen (+0 Programme)`. Beides stimmt und
  beides täuscht: Der Wrapper zählte nur bis zum Mount, und in Prod liegt der Mount **vor** dem teuren Zeichnen.
  Misst man auch danach, steht dieselbe Arbeit da wie im Dev — bis auf ein paar Geometrien deckungsgleich.
  Der Prod-Gewinn ist ausschließlich **React-Churn und Dev-Modulauswertung**, nicht GPU-Arbeit. → Ein Messfenster,
  das an einem Ereignis endet, das der Vergleichslauf **verschiebt**, vergleicht zwei verschiedene Fenster; Posten
  immer über die ganze Phase führen, nie bis zu einer Marke, die die Gegenseite bewegt. Zweitens: In Prod gibt es
  keine StrictMode-Verdopplung — `xN` sind dort **echte** Versuche, im Dev halbieren.
  *Etage 12, `.tmp/prod2-l12.json` gegen `.tmp/render1-l12.json`: Dev `render 5436 ms in 924 Aufrufen
  (+19 Programme, +127 Geometrien, +5 Texturen), laengster 3941 ms [+16 Programme, +15 Geometrien, +0 Texturen,
  171 Draws]` — Prod nach dem Mount `6192 ms in 84 Aufrufen (+24, +128, +5), laengster 3568 ms [+16, +15, +0,
  165 Draws]`. Settle 20,0 s → 11,6 s, Renderaufrufe 924 → 84, Teilbaumversuche 5 → 4 · 2026-08-02*

- **`numPointLights` driftet über die Sitzung und linkt die halbe Szene im Spiel neu** — im Produktionsbuild
  brechen einzelne Spielframes auf 340–1060 ms ein, `compile.msTotal` liegt bei 1,9–8,4 s **nach** dem Reveal.
  Ursache: Die Lichtzahl steckt im Programm-Cache-Key, und sie steht nie still — Menü-Warmup 7, Gate-Compile 10,
  Spiel 13. Jeder Apex-Jäger bringt sein eigenes `<pointLight>` mit (`KrustenGraeberModel.tsx:488`,
  `ZenitSeglerModel.tsx:504`, u. a. je eins) und hebt die Zahl beim Spawn. Im Dev fiel das nie auf: Dort dauert
  der Mount 17,8 s, die Jäger stehen längst, wenn das Gate kompiliert — **null** solcher Relinks in den
  Spielblöcken. → Lichtzahl als Cache-Key-Achse behandeln: Was das Warmup sehen soll, muss beim Warmup **sichtbar**
  sein (`visible = false` nimmt three in `projectObject` aus der Lichtsammlung, `intensity = 0` nicht). Umsetzung:
  fester Lichtvorrat außerhalb der Kreaturen (`ApexAccentLightPool.tsx`), leere Plätze auf `intensity = 0`, Wunsch
  pro Frame neu anmelden. **Den Vorrat nicht kleinrechnen** — die Plätze sind zu billig, als dass eine etagen- oder
  qualitätsabhängige Zahl sich lohnte, und jede Änderung zur Laufzeit löst genau den Relink aus, den er verhindert.
  *Etage 12, zwei Prod-Läufe: `numPointLights (7→13)` 13+2+1 = 16 bzw. 10+1+0 = 11 Relinks, dagegen Dev 0 in drei
  Blöcken; Gate meldet `pointLights 10 beim Compile` · 2026-08-02*
  *Preis der Plätze per Ablation `?apexAccentSlots=N` aus **einem** Bündel und **einer** Sitzung, zwei Laufpaare in
  umgekehrter Reihenfolge: 10 Lichter 5,80/5,90 ms gegen 13 Lichter 6,00/6,30 ms cpu-Median — drei Plätze 0,2–0,7 ms
  je Frame, ~0,1–0,2 ms je Licht, auf/unter dem Rauschboden (3,4 %/4,8 %). Die Vermutung „~0,55 ms je Punktlicht" ist
  damit widerlegt · 2026-08-02*

- **Tickzahl durch Wallzeit geteilt und daraus auf „wartet" geschlossen** — 65 Ticks über 19,3 s ergeben
  ~186 ms/Frame, gelesen als blockierter Hauptthread, der auf den Dev-Server wartet. Real ist die Verteilung
  bimodal: acht Blöcke tragen 18,5 s, die 65 Ticks laufen in den ~0,8 s dazwischen zu **~12 ms**. Ein Mittelwert
  über Frames mischt beide Moden und beschreibt keinen. → Blockliste lesen (`blockGaps`, Schwelle `BLOCK_GAP_MS`),
  nicht die Tickdichte. Marken an beiden Blockenden geben jedem Block seine Adresse; eine Lücke, in der **keine**
  Marke fällt, ist selbst der Befund — sie grenzt den Posten ein, statt ihn zu verstecken.
  *Etage 12, `.tmp/commit3-l12.json`: Blöcke 2224/2135/1019/2920/2359/695/1671/5469 ms = 18,5 s von 19,3 s
  Mountfenster, Rest 823 ms auf 65 Ticks · 2026-08-02*

- **StrictMode verdoppelt jede Rumpfmarke — Zählwerte halbieren** — die Marken meldeten „10 Renderversuche",
  real waren es 5. `src/main.tsx:169` rendert unter `<StrictMode>`; React ruft Renderfunktionen doppelt auf und
  fährt Effekte mount→unmount→mount. Der scheinbare „Stage-Wechsel" am Ende des Ladens (`stage-unmount` nach dem
  ersten `effect`) ist genau dieser Zyklus, kein Moduswechsel — er re-armiert das Settle-Gate und kostet 1,5 s,
  **nur im Dev**. → Zählmarken in Rümpfen immer halbieren, Effektpaare nie als echten Remount lesen.
  *`effect 17849 x2` + `stage-unmount 17865` bei unverändertem `effectiveModeId` · 2026-08-02*

## Vorher-Stand

A/B ab Commit `545d5133` gegen `.tmp/rt2-l12.json`; davor liegt der Doppelcompile, noch davor der Thrash.
Zielspalten `compile.msTotal`, `wall.p99Ms` und `cpu.maxMs` je Block, immer `pnpm game:perf` mit drei Blöcken.
`cpu.medianMs` trägt hier nichts mehr: Kompilatspitzen stehen im Schwanz, der Median lag über alle sechs Läufe
bei 5,2–5,9 ms. `msTotal` ist eine Obergrenze — es summiert die ganze CPU-Zeit der Frames, in denen ein Programm
entstand. Ein einzelner Lauf trägt in der Kompilatspalte nicht; zwei je Seite sind das Minimum.

Wo die Ladezeit steht, sagt das Settle selbst: seine `done`-Zeile im `entry.timeline` trägt
`Stage … / Compile … / ruhig nach …`. Nach dem Fix sind das 18,3–18,9 s Stage-Mount, 1,4–2,1 s Compile und
47–93 ms Ruhefenster. Die Gate-Konstanten `CALM_FRAME_MS`/`REQUIRED_CALM_FRAMES` in
`src/lib/loading/postStartSceneSettle.ts` steuern nur den letzten Posten — dort zu tunen bringt Millisekunden,
der Mount trägt 91 %.

Seit `edf902e7` teilt dieselbe `done`-Zeile den Mount selbst auf: `Stage-Aufteilung [...]` listet die
Rumpfmarken als Wasserfall (`erste Zeit`, `+Spannweite`, `xAnzahl`), dahinter Tickdichte. Seit `0338519a` folgt
statt der einen größten Lücke die **Blockliste** `dauer@ende markeVorher>markeNachher` (ab `BLOCK_GAP_MS` 500 ms,
gedeckelt mit sichtbarem `ABGESCHNITTEN`), seit `7306a8ac` zusätzlich `render … laengster … endet bei …` aus einem
Wrapper um `gl.render`. Produktionsrelevant ist der lange `gl.render`-Aufruf; der StrictMode-Nachlauf ist
Dev-Artefakt. Seit `3ad4369d` führt der Wrapper **zwei** Abschnitte (`render vor Mount` / `render nach Mount`,
beide immer gedruckt) und meldet `pointLights N beim Compile` — die alte Fassung stieg beim Mount aus und ließ den
Produktionsbuild kostenlos aussehen. Das Instrument ist ohne laufendes Settle-Fenster ein No-op.

Der Produktionsbuild-Gegencheck ist damit **entschieden**: `pnpm build:measure` → `dist-measure/` (Messbrücke über
`SVQ_BRIDGE=1` als `define`, Bündelmarker `enterSoloDungeon`, niemals deployen), `pnpm preview:measure` auf 4180.
Die ~11,3 s Sturmdauer sind überwiegend Dev-Modulauswertung und React-Churn; die GPU-Arbeit darunter ist in beiden
Builds dieselbe und wandert in Prod hinter den Mount. Offen ist damit nicht mehr „Dev-Artefakt oder echt", sondern
die Lichtzahl-Drift und die eine Suspense-Grenze in `GameWorldSoloModeRuntime.tsx`.

Das Instrument benennt seit `c4a1b837` das `cacheKey`-Feld, in dem ein neues Programm vom ähnlichsten
vorhandenen abweicht, und druckt eine rohe Schlüsselprobe mit erkannter Kopflänge (`probe`-Zeile). Rumpf ist
**51** Felder lang: 48 Parameter, **zwei** Boolean-Masken (`WebGLPrograms.js:539`/`:589`), dann
`renderer.outputColorSpace`. Wer die Felder nachrechnet statt die Probe abzuzählen, verschiebt sie.
