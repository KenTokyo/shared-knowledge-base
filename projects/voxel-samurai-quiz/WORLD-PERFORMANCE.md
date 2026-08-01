# Weltperformance — voxel-samurai-quiz (AEON)

**Lesen wenn:** du Gras, Laub, Terrain, Dichte, LOD, Schatten oder irgendeine Framezeit dieser Welt anfasst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Größenordnung, gegen die alles hier zu lesen ist: **Szenenpass ~2,73 ms**, davon **Grasfeld ~0,656 ms bei
einem Gate von 0,70 ms** (94 % ausgereizt). Wer hier etwas hinzufügt, nimmt es woanders weg.

## Die zehn Tipps

- **Nur „gehört woanders hin" ist echte Ersparnis** — Kosten mit „Chunkzahl runter" senken und dabei den
  bewerteten Inhalt still entfernen. Ursache: `sichtbare Chunks × Arten × LOD- × Schatten-/Postpässe` lässt
  sich an jedem Faktor drücken, und drei davon sind Inhalt. → Erst den Faktor benennen, dann drücken; ein
  Diagnosemodus ist kein Produktfix.
  *Loop-Prompt „Grenzen": Optimierung darf den bewerteten Inhalt nicht heimlich entfernen · 2026-08-01*

- **Vertexkosten und Fragmentkosten getrennt messen** — „Gras ist teuer" ohne zu wissen, welche Hälfte.
  Ursache: Verstecken und Ausschalten kosten Verschiedenes. → `density 0` gegen Meshes verstecken diffen:
  hier 0,21 ms gegen 0,37 ms; **die 0,16 ms dazwischen sind Vertexarbeit und Draw Calls**, der Rest ist
  Fragment.
  *`GrassField.js`, Kostenblock am Dichte-Uniform · 2026-08-01*

- **Schattenwurf ist keine Kleinigkeit am Gras** — „einmal Casting anschalten und sehen".
  Ursache: jeder Halm geht nochmal durch den Schattenpass. → Vorher zählen: hier **+2 980 800 Dreiecke
  (+90 %)**. Casting bleibt bewusst aus, und der historische Grund („Kosten") war nie der gemessene.
  *`GrassField.js`, Kommentar am Caster-Schalter · 2026-08-01*

- **Ein Chunk ist eine Rendering-Entscheidung, keine Tatsache über die Insel** — Chunks nach Weltlogik
  schneiden und sich über Draw Calls wundern. Ursache: ein Chunk ist genau ein Draw Call **und** eine
  Bounding Sphere. → Nach Draw Call und Bounds schneiden; **ein Material pro Art, von jedem Chunk geteilt**,
  dann kostet ein Chunk einen Call.
  *`Foliage.js`, Kopfkommentar am Chunking · 2026-08-01*

- **Kameragebundenes Gitter statt weltweiter Streuung** — Kandidaten über die ganze Insel verteilen und
  dann culling suchen. Ursache: die Population wächst mit der Insel, nicht mit dem Bild. → **Eine Instanz pro
  Zelle eines auf die Kamera zentrierten Gitters** (`aCell`); die Instanzzahl hängt dann an der Sichtweite,
  nicht an der Weltgröße.
  *`Foliage.js`, `aCell`-Kommentar · 2026-08-01*

- **Feines Detail jenseits seiner Reichweite kostet und aliast nur** — Fernbild flimmert, Kosten laufen
  trotzdem. Ursache: die feine Kachel ist ab ~450 m von Mips ohnehin zu einem Wash gemittelt. → Jenseits der
  Reichweite **ganz ausblenden** statt weiter zu zeichnen; Fernstruktur braucht einen eigenen Träger.
  *`Terrain.js`, Fade der feinen Kachel · 2026-08-01*

- **Stochastisch ausdünnen statt schwellen** — harte Kanten und Klumpen, wo eine Maske einen Schwellwert
  trifft. Ursache: ein Schwellwert schneidet eine Fläche, ein Vergleich gegen Zufall dünnt sie. → Per-Zell-
  Zufall gegen die Maske vergleichen; das ergibt weiche Ränder **und** eine steuerbare Population.
  *`GrassField.js`/`Foliage.js`, beide unabhängig auf dieselbe Lösung gekommen · 2026-08-01*

- **Frustum-Culling kann teurer sein als der Zeichenaufruf** — ein Mesh, dessen Bounds die halbe Insel
  umspannen, wird trotzdem jeden Frame getestet. Ursache: Per-Instance-Extents machen die Stock-Bounds
  bedeutungslos. → Auf solchen Meshes Culling **bewusst abschalten** und den Grund an die Zeile schreiben,
  sonst „repariert" es die nächste Schicht.
  *`GrassField.js`: `frustum culling is switched off on the mesh instead`; `Terrain.js` dieselbe Ursache · 2026-08-01*

- **Uniform sweepen statt neu bauen** — pro Kandidat ein Rebuild, dann ist ein Sweep ein halber Tag.
  Ursache: die Achse steckt im Shader, aber der Wert muss es nicht. → Achse als Uniform freilegen und in der
  **laufenden** Seite sweepen: `probes/blades.mjs` fährt 8 Zeilen in 24 s, `probes/trim.mjs` einen Regler
  über seinen ganzen Bereich.
  *`aeon-engine-overview.md`, Probe-Tabelle · 2026-08-01*

- **Beim Umparametrisieren die integrale Größe konstant halten** — ein Sweep, dessen Zeilen nicht
  vergleichbar sind, weil jede Zeile nebenbei die Blattfläche ändert. Ursache: der neue Parameter skaliert
  das Integral mit. → Normierungsfaktor mitrechnen (hier `taperNorm`), dann misst der Sweep **die Form** und
  nicht die Menge. Kontrolle: der Umbau muss bei altem Wert **bitgleich** sein.
  *`uBlade`-Umbau las bei p=2,0 gegen pass-22 `largest band delta 0.0000` in drei Läufen · 2026-08-01*

## Kostenmessung — der einzige belastbare Weg hier

`pnpm world:probe <id> probes/grassperf.mjs --rounds 112 --reps 16` — gepaart, rotiert, **GPU-Timer**, mit
einer Münze (Null-Änderung) und dem Terrain als Kontrollen. Nur diese Zahlen sind zitierfähig.

- **Bildrate** misst `probes/fpshold.mjs` (Median über einen 512-Frame-Ring, **nach** dem Aufwärmen).
- **Die fps-Zeile von `world:smoke` ist keine Kostenmessung.** `engine.fps` ist ein 0,4-s-Fenster, 2,5 s nach
  dem Interaktivwerden am Ende eines ~30-s-Bakes gelesen — auf identischem Code las sie **83,5 und 44,3**.
  `world:smoke` bleibt das Fehler-Gate: Exit-Code und „no console errors".
- **Build gegen Build geht nicht innerhalb einer Session.** Wer den Shader für eine Gegenmessung zurücksetzt:
  **erst nach `.tmp/` kopieren, danach per `diff` byte-identisch verifizieren.** `git checkout` würde den
  uncommitteten Migrationsstand vernichten.
- **Schwelle des Instruments ist |z| > 3.** Ein Effekt bei z −2,3 ist nicht geschifft, weil er gefällt.

## Was gegen die Geometrie gefittet ist und nicht mitreist

`uCanopy.x` (Bodenextinktion) ist gegen die **aktuelle** Grasgeometrie gefittet. Jede Änderung an Halmzahl,
Breite oder Haltung macht den Wert ungültig und verlangt einen neuen Sweep, ausgewertet mit `grassonly.mjs`.
Dass er einen Taperwechsel überlebt hat, ist **gemessen worden** (0,255 / 0,30 / 0,345) und war keine
Annahme — genau so gehört jede geometrieabhängige Konstante behandelt.
