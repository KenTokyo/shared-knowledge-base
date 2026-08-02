# Kamera, Held und Begegnung — voxel-samurai-quiz (AEON)

**Lesen wenn:** `CameraRig`, Third-Person-Pose, `Weapon`, `Enemies` oder Spielaufnahme-Framing.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

## Tipps

- **Reparatur nur durch Armeinzug** — Arm kollabiert, Körper füllt Frame, Restforderung bleibt. → `pull` nie als alleinigen Freigang-Fix.
  *`pull`: `body%` 15–17 %, Arm 0,95-m-Minimum, `dem` 0,28 offen · 2026-08-01*

- **Gutes Bild als Freigang** — rückseitiges Terrain/colliderlose Masse lässt Bild und Deckung grün trotz Auge in Geometrie; Teleport startet unspielbar. → Signiertes Augen-Containment/Standbarkeit vor Bildqualität; Teleport rückwärts entlang Ankunft.
  *`cap 0,55` bis +2,31 m im Hang; `ruins--engage` Auge y75,55 im Steinband 74,87–75,92; Starts Arm 0,09/0,09/0,14 m · 2026-08-01*

- **Roher Winkel in `camera.rotation`** — ungedämpfter Winkel bewegt Auge vor `expDamp`. → Winkelzustand mit Hub dämpfen, Auge neu setzen, Restbedarf lesen, in `snap()` löschen.
  *P15d fand Dämpfungs-, Peilungs-, Resetfehler; pausierte Posen sahen keinen · 2026-08-01*

- **Fallklippe statt Rampe** — 3,4° Mausweg springt auf 27,3° Peilung/1,84 m Kameraweg. → Über `HOME_PITCH` rampen; größten Nachbarschritt mit `probes/timewalk.mjs`.
  *326×0,115°: 56,15°→0,2597°; Steigung 2,27°/° statt ~4 · 2026-08-01*

- **Bildversatz gerechnet** — Überschlag ohne `aspect`, Null authored statt Shipping. → NDC-Spalte; x/`aspect`; laufenden Modus messen.
  *Behauptet 0,12 NDC≈116 px, gemessen 0,034≈33 px; `watchtower--approach` orbit 0,010 vs. Shipping 0,042 · 2026-08-01*

- **Peilung angenommen** — Wachringe blicken zum Anker, mittlere Richtung quer durchs Lager. → Kandidaten mit `E.losClear()`/`E._standable()`; `arc` gegen authored Peilung.
  *Patrouillen 5°/6°, Wachringe 36–101°; vermeintlicher Bautenfehler +1,009→+0,083 · 2026-08-01*

- **Stand-off zum Schwerpunkt** — Gruppensoll erfüllt, nächster Gegner steht am Helden. → Geschlossene Distanz zum nächsten Mitglied; Schwerpunkt nur Peilung.
  *`road:pass`: Soll 22 m → 3,6 m; 9-m-Engage `set 18,6`, `foe% 0`, `body% 9,43` · 2026-08-01*

- **Peilpunkt unter Wasser** — `heightAt(subject)` liefert Boden; Solver verwirft freie Teichsicht. → Wasserziel per belegtem `lookLift` über Oberfläche.
  *Boden 2,2 m unter Wasser; `lookLift` 4,0/3,5 rettete verworfene Kandidaten · 2026-07-30*

- **Collider-Sicht frei, Gegner unsichtbar** — `losClear` kennt weder Frustum noch colliderlose Layer. → Fuß–Auge im Frustum; Struktur/Bäume/Gras/Terrain per gematchtem Hide-and-Diff.
  *`open 4`; Baum-Hide +0,465 auf 0,305 `foe%`; Gras bis +1,243 `foe%`/+1,449 `body%`; Gegner +25,8° über +10,3° Bildkante · 2026-08-01*

- **Ein Armboden für zwei Zeilen** — eine verbessert, andere fällt; Rutsch hängt an `lift/arm`, nicht `lift`. → Gegen geschlossen lösbare Rutschgrenze aus `lift`, Arm, `tan(fov/2)` statt fixer Länge.
  *Arm 0,85→0,55: `road` `bodY` −0,83→−0,53, `watchtower` −0,64→−0,91; Formel −0,285/−0,498/−0,882 vs. −0,28/−0,51/−0,87 · 2026-08-01*

- **Winkelrate auf Länge übertragen** — gleicher Exponentialschritt ist bei 0,7° harmlos, bei 2 m Dolly-Schnitt. → Rate je Zustand gegen Augenschritt sweepen; Winkel darf asymmetrisch schützen, Länge nicht.
  *Rate 26: 0,6963 m/Frame = `1−exp(−26/60)` von 1,98 m; Knie Rate 3 (Auge 0,152 vs. 0,732 m), darunter dominiert 0,125 m `lift`-Boden · 2026-08-01*

- **Sollwert-Rampe vermutet, tatsächlich Stufe** — Dämpfung korrekt, Ziel springt an Schwelle voll. → Vor Rate prüfen, ob Sollwert frameweise springt; Schwelle = Befund, Rate = Sicherung.
  *`need > groundHold` schaltet `arm * clear`: `cut` 0,0020 Frame 138, 0,6965 Frame 161 · 2026-08-01*

## Scheinbare Defekte

- **`open 0` trotz Gegnerpixel** — `losClear` überblockt absichtlich mit höhenlosen Colliderzylindern. → Gerenderte Sicht separat; kein Gate-Fehler.
  *`ruins--approach open 0` mit Pixeln; Collider nutzt `r·0,85` · 2026-08-01*

- **`bodY −0,80` als Füße** — Spalte misst Pivot. → Beschnitt per `body%`.
  *`body%` 0,66/0,74 vs. 1,9–2,7 zeigte Randverlust · 2026-08-01*

- **`bodY` für Horizontalversatz** — `place()` skaliert Schulter und Arm; Hochachse blind. → `bodX`; wegen `fov` nur mit [`RUNTIME-MEASURING.md`](RUNTIME-MEASURING.md)-Toleranz.
  *Schulter 0,62→0,35 m bei 39°; 11 Zeilen `bodX −0,152`, 3 bis 0,034 Abweichung · 2026-08-01*

## Blend-Handel

- **Orbit-Handel war kein Endzustand** — `orbit` verlor zwei Horizonte; `blend` liefert Figur plus Skyline. → Erst schwenken bis Bildkante, dann Armrest einholen; umgekehrte Reihenfolge ist nicht monoton.
  *14 Shots: 12×16 Geometriespalten bitgleich; `sky` −9,3/−28,6→0; Preis `bodY` −0,07→−0,28/−0,53, `body%` 0,96→2,88 · 2026-08-01*

- **Blend verbraucht Freigangspuffer** — bewegte Zeilen enden exakt am Boden statt mit Orbit-Reserve. → Nach Arm-/Haltebudget zuerst `und` prüfen.
  *`und` jetzt −0,55/−0,55 statt −0,84/−1,76; kein vergrabenes Auge, aber frühestes Rückfallmaß · 2026-08-01*
