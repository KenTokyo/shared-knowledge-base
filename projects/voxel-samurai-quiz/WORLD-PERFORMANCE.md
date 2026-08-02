# Weltperformance — voxel-samurai-quiz (AEON)

**Lesen wenn:** Gras, Laub, Terrain, Dichte, LOD, Schatten oder Welt-Framezeit.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

P14q-Budget: **Szenenpass 3,0781 ms**; **Gras 0,6563/0,70 ms Gate** (93,8 %; 21,3 % Szenenpass). Mehrkosten brauchen Einsparung.

## Tipps

- **Verschwundener Inhalt als Ersparnis** — weniger Chunks durch still entfernten Bewertungsinhalt. → Faktor `sichtbare Chunks × Arten × LOD × Pässe` nennen; Diagnosemodus ≠ Produktfix.
  *AEON-Loop: Optimierung darf Bewertungsinhalt nicht heimlich entfernen · 2026-08-01*

- **Feindetail außerhalb Reichweite** — Fernbild flimmert, Mips mitteln Kachel längst zum Wash. → Ab gemessener Reichweite ausblenden; Fernstruktur eigenem Träger geben.
  *Feine Terrainkachel ab ~450 m ohne Nutzdetail · 2026-08-01*

- **Maske hart geschwellt** — Kanten/Klumpen am Schwellwert. → Pro-Zell-Zufall gegen Maske: weiche Ränder, steuerbare Population.
  *`GrassField.js` und `Foliage.js` unabhängig gleicher Fix · 2026-08-01*

- **Frustum-Culling teurer als Draw** — Stock-Bounds instanzierter Meshes umspannen halbe Insel und werden je Frame geprüft. → Culling dort abschalten; Grund an Codezeile dokumentieren.
  *`GrassField.js`, `Terrain.js`: Per-Instance-Extents entwerteten Stock-Bounds · 2026-08-01*

- **Sweep verändert mehr als Kandidat** — Neustarts dominieren; Quellliterale verschieben Closure/RNG. → Uniform/Flag, Shipping-/Nullzeile, gleiche Sitzung und aktiver Pfad.
  *8 `blades`-Zeilen/24 s; vier P15d-Starts ~65 s; Literal-Sweep 3/1/0 blinde Zeilen bei 0/0,25/0,5 · 2026-07-31/08-01*

- **Umparametrisierung verändert Menge** — Sweep vergleicht Form plus Blattfläche. → Integral normieren; Altwert gegen gültigen Pass bitgleich fordern.
  *`uBlade`/`taperNorm`, p=2,0 vs. Pass 22: drei Läufe `largest band delta 0.0000` · 2026-08-01*

- **Waldrandattribute gekoppelt** — gleicher Hash steuert Dichteselektion und sichtbare Attribute. → Eigener deterministischer Hashstrom je Attribut; alte Kopplung als Negativtest.
  *Rand-Yaw Rayleigh-Z 569,4→0,5; vorher Pearson r=1,000 · 2026-07-30*

- **Farbfehler aus Geometrie** — für 33–57 m getunte Halme stehen bei 2–10 m als 40–100-px-Schilf. → Vor Farbwerten Breite/Höhe/Dichte gegen Kameradistanz sweepen.
  *Skalenlücke 1,188→0,253; Sättigung/r-g 0,617/0,648→0,545/0,743 vs. 0,544/0,747, ohne Farbänderung · 2026-07-31*

- **Geometrie geändert, Bodenlicht-Fit behalten** — `uCanopy.x` hängt an Halmzahl, Breite, Haltung; `.y` ist Extinktion. → Nach Geometrieänderung `grassonly.mjs` sweepen.
  *Taperwert erst nach Gegenmessung 0,255/0,30/0,345 behalten · 2026-08-01*

## Kostenpfad

Fehler-Gate/Bildrate/GPU-Kosten: [`threejs/MEASURING.md`](../../threejs/MEASURING.md). Graswerte:
`pnpm world:probe <id> probes/grassperf.mjs --rounds 112 --reps 16`, gepaart/rotiert, GPU-Timer, Null- und Terrainkontrolle.
