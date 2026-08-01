# Kamera, Held und Begegnung — voxel-samurai-quiz (AEON)

**Lesen wenn:** du `CameraRig`, die Third-Person-Pose, `Weapon`, `Enemies` oder die Frage „warum sieht die Spielaufnahme so aus“ anfasst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

## Tipps

- **Reparatur durch Armeinzug** — der Arm kollabiert auf sein Minimum, der Körper füllt das Bild und die Forderung bleibt offen. → `pull` nicht als alleinigen Freigang-Fix behandeln.
  *`pull`: `body%` 15–17 %, Arm am 0,95-m-Minimum, Restforderung `dem 0,28` weiterhin offen · 2026-08-01*

- **Gutes Bild als Freigang genommen** — rückseitengekulltes Terrain oder colliderlose Rendermasse lassen Frame und Deckungswerte grün, während das Auge in Geometrie steckt; ein Teleport kann zudem unspielbar starten. → Vor Bildqualität signierte Augen-Containment-/Standbarkeitsprüfung fordern und Probe-Teleports entlang der Ankunftsrichtung zurückweichen.
  *`cap 0,55` lag bis +2,31 m im Hang; `ruins--engage` Auge y 75,55 im Steinband 74,87–75,92; drei feste Starts kollabierten auf Arm 0,09/0,09/0,14 m · 2026-08-01*

- **Rohe Winkel in `camera.rotation` geschrieben** — die Linse atmet, weil der ungedämpfte Winkel das Auge vor `expDamp` bewegt. → Winkel als Zustand mit dem Hub dämpfen, Auge am gedämpften Winkel neu setzen, Restbedarf neu lesen und in `snap()` löschen.
  *P15d fand Dämpfungs-, Peilungs- und Resetfehler; keiner erschien in pausierten Posen · 2026-08-01*

- **Fallunterscheidung als Klippe statt als Rampe** — 3,4° Mausbewegung springen auf 27,3° Peilung und 1,84 m Kameraweg. → Über `HOME_PITCH` rampen und mit `probes/timewalk.mjs` den größten Nachbarschritt messen.
  *326 Proben à 0,115°: Sprung 56,15° → 0,2597°; gemessene Steigung 2,27°/° statt „etwa vier“ · 2026-08-01*

- **Bildversatz gerechnet statt gemessen** — dem Überschlag fehlt der `aspect`-Divisor und seine Null ist authored statt Shipping. → Erst eine NDC-Spalte bauen, x durch `aspect` teilen und gegen den tatsächlich laufenden Modus rechnen.
  *Behauptet 0,12 NDC ≈ 116 px, gemessen 0,034 ≈ 33 px; bei `watchtower--approach` lag `orbit` 0,010 gegen Shipping 0,042 · 2026-08-01*

- **Peilung angenommen statt gewählt** — Wachringe schauen auf ihren Anker; ihre mittlere Blickrichtung zeigt quer durchs Lager. → Kandidaten mit `E.losClear()`/`E._standable()` wählen und `arc` gegen die authored Peilung ausgeben.
  *`arc` trennte Patrouillen 5°/6° von Wachringen 36–101°; der vermeintliche Bautenfehler fiel von +1,009 auf +0,083 · 2026-08-01*

- **Stand-off vom Gruppenschwerpunkt gelöst** — Sollabstand zur Gruppe ist erfüllt, während der nächste Gegner fast auf dem Helden steht. → Geschlossene Distanz zum nächsten Mitglied lösen; Schwerpunkt nur zur Peilung nutzen.
  *`road:pass` machte aus Soll 22 m nur 3,6 m; der 9-m-Engage-Fall las `set 18,6`, `foe% 0`, `body% 9,43` · 2026-08-01*

- **Peilpunkt liegt unter der Wasseroberfläche** — `heightAt(subject)` liefert den Gewässerboden, deshalb verwirft der Solver freie Teichsicht. → Wasserziele mit belegtem `lookLift` über die Oberfläche heben.
  *Teichboden 2,2 m unter Wasser; `lookLift` 4,0/3,5 rettete zuvor vollständig verworfene Kandidaten · 2026-07-30*

- **Freie Collider-Sicht, aber Gegner unsichtbar** — `losClear` prüft weder Frustum noch colliderlose Renderlayer. → Fuß bis Auge im Frustum prüfen und Struktur, Bäume, Gras sowie Terrain separat per gematchtem Hide-and-Diff attribuieren.
  *`open 4`; Baum-Hide +0,465 auf 0,305 `foe%`, Gras bis +1,243 `foe%`/+1,449 `body%`, Gegner bis +25,8° über +10,3° Bildkante · 2026-08-01*

- **Fester Armboden für zwei Zeilen gesucht** — die eine Zeile wird besser, während die andere über dieselbe Spanne verfällt, und es gibt keinen Wert für beide; der Rutsch ist das *Verhältnis* `lift/arm`, nicht `lift`. → Nicht auf eine Länge einholen, sondern gegen die Rutschgrenze, die aus `lift`, Arm und `tan(fov/2)` geschlossen lösbar ist.
  *Über 0,85 → 0,55 ging `road:forest--approach` `bodY` −0,83 → −0,53, `watchtower--approach` gleichzeitig −0,64 → −0,91; die geschlossene Form sagte −0,285/−0,498/−0,882 gegen gemessen −0,28/−0,51/−0,87 voraus · 2026-08-01*

- **Eine Dämpfungsrate für einen Winkel trägt plötzlich eine Länge** — der neue Zustand ist ordentlich geeast und dollyt trotzdem, weil ein Exponential seinen Schritt aus dem *Abstand* nimmt: dieselbe Rate ist bei 0,7° harmlos und bei 2 m ein Schnitt. → Rate pro Zustand wählen und gegen den Augenschritt sweepen, nicht gegen den Zustand selbst; die Asymmetrie „schnell schützen, langsam zurückgeben" gilt nur für Winkel, eine Länge ist in beide Richtungen gleich sichtbar.
  *Rate 26 ließ 0,6963 m in einem Frame durch = `1 − exp(−26/60)` der 1,98-m-Spanne; über neun Raten liegt das Knie bei 3 (Auge 0,152 gegen 0,732 m), darunter kauft man nichts, weil 0,125 m Boden dem `lift` gehört · 2026-08-01*

- **Ein Sollwert als Rampe gelesen, der eine Stufe ist** — die Dämpfung wird verdächtigt, obwohl sie rechnet wie bestellt; das Ziel dahinter springt an einer Schwelle über seine volle Spanne. → Vor dem Nachziehen einer Rate prüfen, ob der *Sollwert* zwischen zwei Frames springt — dann ist die Schwelle der Befund und die Rate nur die Sicherung.
  *`need > groundHold` schaltet den vollen `arm * clear` frei: `cut` 0,0020 auf Frame 138 und 0,6965 auf Frame 161 · 2026-08-01*

## Drei Dinge, die wie Defekte aussehen und keine sind

- **`open 0` trotz sichtbarer Gegnerpixel** — `losClear` überblockt absichtlich mit höhenlosen Colliderzylindern. → Nicht als Gate-Fehler behandeln; gerenderte Sicht getrennt messen.
  *`ruins--approach open 0` bei sichtbaren Pixeln; Colliderprüfung nutzt `r·0,85` · 2026-08-01*

- **`bodY −0,80` als Fußposition gelesen** — die Spalte misst den Pivot, nicht die Fußspitzen. → Beschnitt über `body%` statt den Pivotwert beurteilen.
  *`body%` 0,66/0,74 gegen 1,9–2,7 bei ungehobenen Zeilen zeigte den tatsächlichen Randverlust · 2026-08-01*

- **`bodY` für waagerechten Bildversatz benutzt** — `place()` skaliert Schulterversatz und Arm gemeinsam; die Hochachse bleibt strukturell blind. → `bodX` lesen und wegen des enthaltenen `fov` nur mit Laufzeittoleranz aus [`RUNTIME-MEASURING.md`](RUNTIME-MEASURING.md) behandeln.
  *Schulter 0,62 → 0,35 m bei 39°; elf unbewegte Zeilen `bodX −0,152`, drei bewegte bis 0,034 Abweichung · 2026-08-01*

## Der Handel, der bewusst genommen wurde — und dann nicht mehr nötig war

Galt bis 2026-08-01: der Default `liftMode = 'orbit'` kostet an zwei Zeilen den Horizont (`sky` −9,3 und
−28,6), der Defektzensus steht 2 gegen 2, gewählt wurde *ein Bild ohne Figur ist keine Aufnahme, eines ohne
Skyline schon*. **Der Handel ist erledigt, nicht gewonnen:** der dort als unversucht notierte dritte Weg —
schwenken, dann teilweise einholen — ist als `liftMode = 'blend'` gebaut und liefert beide Horizonte zurück,
ohne die Figur wieder herzugeben.

Was den Weg gangbar gemacht hat, ist allein die **Reihenfolge**, und die naheliegende ist die falsche. Erst
Arm, dann Schwenk holt den Horizont erst bei Arm 1,32 m zurück und ist dabei nicht einmal monoton
(`camp:pass--approach` liest `sky` −8,0 bei Armboden 0,70 und −9,1 bei 0,55, weil `atan2(need, arm)` den Arm
im Nenner hat). Erst schwenken ist monoton, weil die ersten Grad Schwenk weder Bildabstand noch Motiv
bewegen — sie sind gratis bis zu dem Moment, in dem der Horizont die obere Bildkante erreicht. Genau dort
hält die Grenze, und der Arm zahlt nur den Rest.

*`blend` gegen `orbit`, 14-Schuss-Pass: zwölf Zeilen bitgleich über sechzehn Geometriespalten, `sky` −9,3 → 0
und −28,6 → 0 auf den zwei bewegten; Preis `bodY` −0,07 → −0,28 bzw. −0,53 bei `body%` 0,96 → 2,88 · 2026-08-01*

Die eine Spalte, die dabei Puffer verloren hat, ist `und`: beide bewegten Zeilen liegen jetzt exakt auf dem
Freigangsboden −0,55, wo `orbit` −0,84 und −1,76 hatte. Kein vergrabenes Auge — aber `und` ist die Spalte, an
der `cap` gestorben ist, und sie ist ab jetzt die erste, die man liest, wenn Armboden oder Halte-Budget
gelockert werden.
