# Kamera, Held und Begegnung — voxel-samurai-quiz (AEON)

**Lesen wenn:** du `CameraRig`, die Third-Person-Pose, `Weapon`, `Enemies` oder die Frage „warum sieht die
Spielaufnahme so aus" anfasst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

## Die acht Tipps

- **Kamera hebt, ohne neu zu peilen** — der Held rutscht pro Hubmeter im Bild nach unten und fällt am Ende
  ganz heraus. Ursache: `camera.rotation` kommt direkt aus `p.pitch`/`p.yaw`; die Kamera peilt den Pivot
  **nie** an, er liegt nur deshalb auf der Achse, weil der Arm rückwärts entlang `_fwd` gebaut wird. → Jede
  Bewegung des Auges gegen `elevation / (arm · tan(fov/2))` rechnen, bevor man sie einbaut.
  *`groundLift` hob bis **4,11 m** und schob den Helden in 2 von 14 spielbaren Aufnahmen aus dem Bild
  (`body% 0`) · 2026-08-01*

- **Reparatur durch Neupeilen der Linse** — Held sitzt perfekt mittig, aber das Bild ist wertlos. Ursache:
  Neupeilen bezahlt mit dem, was am Rand steht. → Vor dem Einbau die Gegenkontrolle fahren: der Modus `aim`
  brachte `bodY −0,08` **und** Gegner über der Bildkante, `foe%` 0,087 → 0,021 (−76 %), Pitch auf −51,0°,
  Bild reiner Hang ohne Himmel und ohne Landmarke.
  *Die „Reparatur" stellte genau die Pathologie wieder her, die eine Schicht vorher beklagt worden war · 2026-08-01*

- **Reparatur durch Armeinzug** — der Arm kollabiert auf sein Minimum und der Körper füllt das Bild.
  Ursache: `DIST_MIN·0,5 = 0,95 m` ist erreichbar, und der Solver geht dahin. → `pull` ist gemessen
  gescheitert: `body%` 15–17 %, und die Aufgabe war danach **immer noch nicht gelöst** (`dem 0,28` blieb stehen).
  *2026-08-01*

- **Der Freigang forderte mehr als das Bild brauchte** — Kopfraum-Forderungen, die Bilder kaputtmachen, die
  ohne sie gut wären. → Die Forderung `0,55·(0,3+0,7t)` über den ganzen Arm gegen ein echtes Bild prüfen: bei
  **1,91 m verweigertem Freigang** war der Frame vollwertig (Held, beide Gegner, Weg, Fernkamm, Himmel,
  nichts clippt). Die Formel ist eine Annahme, kein Naturgesetz.
  *2026-08-01*

- **Gameplay liest die Kamerarichtung** — der Trefferbogen bricht, sobald ein neuer Kameramodus die Peilung
  dreht, und niemand sucht die Ursache in der Kamera. Ursache: `Weapon._resolveHit()` baute den Bogen aus
  `cam.getWorldDirection()`. → Richtung aus `p.pitch`/`p.yaw` nehmen. **Vor jedem Rig-Umbau nach
  `getWorldDirection`/`camera.quaternion` greppen**: legitim sind nur Messobjekte (`Overlay.js`) und
  Billboards (VFX).
  *Bei 39 ° Schwenk und 2 m lag die Schwingebene **1,26 m unter der Peilung**, unter dem Fuß eines Mannes;
  der 54°-Bogen zog sich auf 41° · 2026-08-01*

- **Rohe Winkel in `camera.rotation` geschrieben** — im Spiel atmet die Linse, in jeder Messzeile ist alles
  grün. Ursache: der neue Winkel lief ungedämpft **und** nahm der Position ihre Dämpfung weg, weil er das
  Auge vor `expDamp` bewegte. → Winkel als Zustand halten, mit demselben `expDamp` wie der Hub, Auge am
  **gedämpften** Winkel neu setzen und den Restbedarf dort **neu ablesen** — und `snap()` muss den neuen
  Zustand löschen.
  *P15d, drei Befunde einer Gegenprüfung; keiner davon kann in einer pausierten Pose auftauchen · 2026-08-01*

- **Fallunterscheidung als Klippe statt als Rampe** — 3,4 ° Mausbewegung springen auf 27,3 ° Peilung und
  1,84 m Kameraweg. Ursache: `p.pitch > 0 ? 0 : PITCH_MIN` fällt an der Waagerechten über **56,15°**. → Über
  einen Referenzwinkel rampen (`PITCH_MIN * clamp(p.pitch / HOME_PITCH, 0, 1)`). Klippe danach 0,00°.
  *2026-08-01*

- **Peilung angenommen statt gewählt** — die Engage-Pose landet mitten im Zelt, und es sieht nach einem
  Designfehler aus. Ursache: `Enemies._place()` gibt jedem Wachposten `yaw = ang + π` bei Position
  `anchor − (sin ang, cos ang)·rr`, also **schaut jeder Wachring auf seinen eigenen Anker**; die mittlere
  Blickrichtung zeigt quer über das Lager auf die leere Gegenseite. → Peilung aus Kandidaten **wählen** und
  mit engine-eigenen Wahrheiten bewerten: `E.losClear()` für Sicht, `E._standable()` für Legalität.
  *`back` 0 auf allen 14 Aufnahmen; der zweitgrößte Befund („die Lager verstecken ihre Männer") war
  **derselbe** Fehler und fiel mit weg — von +1,009 auf +0,083 Punkte, unter dem Rauschboden · 2026-08-01*

## Zwei Dinge, die wie Defekte aussehen und keine sind

- **`losClear` überblockt absichtlich** — Collider zählen als höhenlose Zylinder mit `r · 0,85`. Deshalb ist
  `ruins--approach open 0` korrekt, obwohl `foe%` ein paar Pixel zeigt.
- **`bodY` misst den Pivot, nicht die Fußspitzen.** Bei `bodY −0,80` steht der Held am unteren Bildrand und
  ist beschnitten — das ist am `body%` abzulesen (0,66/0,74 gegen 1,9–2,7 bei ungehobenen Zeilen), nicht am
  `bodY` selbst.

## Der Handel, der bewusst genommen wurde

Der Default `liftMode = 'orbit'` kostet an zwei Zeilen den Horizont (`sky` −9,3 und −28,6). Der Defektzensus
steht **2 gegen 2**, und die Wahl war: *ein Third-Person-Bild ohne Figur ist keine Aufnahme, eines ohne
Skyline schon.* Wer das umdreht, braucht einen anderen Grund als Geschmack. Der unversuchte dritte Weg ist
`orbit` gefolgt von einem **teilweisen** `pull` — `pull` allein kollabiert den Arm sofort.
