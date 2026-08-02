# Laufzeitmessung und Sondenstabilität — voxel-samurai-quiz (AEON)

**Lesen wenn:** AEON-Rauschklassen, Lauf-Flags, Zustandsdrift, Zeit oder Sondenspalten.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Global: [`threejs/MEASURING.md`](../../threejs/MEASURING.md). Folgende Werte gelten nur für AEON-Sonden.

## Tipps

- **Eine Rauschgrenze für alle Klassen** — Same-frame, Neuflug, Code-/Flagwechsel haben verschiedene Böden. → Klasse und Spalte separat kalibrieren.
  *Same-frame ≤1e-4; 18 Neuflüge: 16 Geometriespalten 0,0000, `foe%` 0,077, `body%` 0,068, `near` 0,2 m, `sil` 1,84 · 2026-08-01*

- **Flag-Gruppierung als Ursache** — wenige Läufe clustern trotz gleichem Flag. → Kreuzlauf erzwingen: Flag und Gruppe trennen.
  *`bgL` scheinbar 4,5× `--liftMode`-abhängig; sechs identische Code/Flags erneut 4×~0,0173 und 2×~0,080: Ort, nicht Flag · 2026-08-01*

- **Zustandsspalte als Geometrie** — `sky = pit + fov/2` trägt von `snap()` nicht gelöschte Restgeschwindigkeit. → Engage-`sky`/`bodX` um eine Druckstelle tolerieren oder `fov` pinnen; Approach nicht.
  *55,20 in 3/18 vs. 55,00 in 15/18, entsprechend ~0,23 m/s Restgeschwindigkeit · 2026-08-01*

- **`timewalk` nach Rig-Änderung ausgelassen** — grüne Posen verbergen Dämpfung, Reset, Fallklippen. → `probes/timewalk.mjs` über Hang/Ebene/`snap()` je Zustand; größten Nachbarschritt messen; rohe Länge = roher Winkel (Dolly vs. Schwenk).
  *P15d: 3 Defekte in 14/14 grünen Posen; 56,15°→0,2597°, `snap()` 14,51°→0. P15e: zweiter Zustand Auge 0,7324 vs. 0,0977 m/Frame · 2026-08-01*

- **Zeitknopf ohne Kontrollpass** — Rate verschiebt Standbild, wenn Capture nicht auskonvergiert. → Alt/neu fahren; Zeitknopf erst bei Geometriespanne 0.
  *Rate 26 vs. 3: 16 Spalten × 14 Zeilen Spannweite 0,0000; Rest ~1 mm · 2026-08-01*

- **Sweep ohne Klammerpass** — plausible Rangfolge, fremder Rauschboden. → Erste Stufe am Sitzungsende wiederholen; Differenz = Boden.
  *Zwei Neun-Raten-Sweeps: Klammer 0,0000 m für Arm/Auge · 2026-08-01*

- **Roster vor Capture-Reset** — laufende Patrouille liefert Schwerpunkt für danach zurückgesetzte Positionen. → Site und Capture aus gleichem Reset.
  *`road:forest--approach`: 3,6 statt 22 m zum nächsten Gegner · 2026-08-01*

- **`dem` zwischen Modi verglichen** — Spalte hat zwei Definitionen. → `orbit`/`pull`: Restbedarf; `lift`/`cap`/`aim`: Eingangsforderung.
  *P15d mischte Nachzustand und Eingangsforderung · 2026-08-01*

- **`near` als gesetzter Abstand** — Begegnung läuft nach Setzen weiter. → `set` kontrolliert Stand-off; `near` misst Auslöserzustand.
  *2,5 s Weltlauf lassen alarmierte Gegner zulaufen · 2026-08-01*

- **`open` als Ortskonstante** — Zwischenläufe werden mit Pass vermischt. → Nur innerhalb derselben Aufnahme vergleichen.
  *`open` wird je Capture neu bestimmt · 2026-08-01*

- **Relatives `sil` ohne Lichtboden** — Laublücken ändern `bgL`; hoher Kontrast kann auf fast schwarzem Gegner liegen. → `foeL`+`bgL`, absoluter Boden, nur disjunkte Gruppen.
  *`foeL` 0,0487/0,0488/0,0488 bei springendem `bgL`; `sil` 2,05/1,57 trotz `foeL` 0,0028/0,0037 · 2026-08-01*

- **Frame/Regionen aus zwei Quellen** — nach `poseFrame` fällt `capturing=false`; nächster Animationsframe überschreibt Targets. → `ctx.read()` statt `ctx.frame()` + `ctx.regions()`.
  *Plausible Zahlen stammten aus Live- statt Capture-Frame · 2026-08-01*

- **Perf-Ring direkt nach Pose** — Median gehört voriger Kamera. → In Sonde messen oder 512 Frames erneuern.
  *512 Frames ~8,5 s; nach 1 s noch ~88 % Vorzustand · 2026-08-01*
