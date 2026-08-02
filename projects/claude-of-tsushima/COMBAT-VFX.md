# Kampf-VFX — claude-of-tsushima

**Lesen wenn:** Trail, Ribbon, Slash, Funken, Impact, Hit-Stop, Timing oder VFX-Capture.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

**Danach Pflicht:** `docs/ai-rules/VFX.md` (Pipeline, Konstanten, Abnahme).

- **Partikel am Geburtsframe fehlt** — `smoothstep(0,uRise,u)` ist bei Alter 0 absichtlich null. → Uhr pinnen, Birth-Timestamp resetten, benannten Beat nach Rise messen.
  *`sparkPx 0` zweimal als Shaderdefekt verfolgt trotz Draws; Heavy-Kontakt zeigt deshalb nur Licht · PH41/PH3 · 2026-07-29/31*

- **Hit-Stop verlängert sich selbst** — Countdown auf skaliertem `dt`; Scale 0,16 vervielfacht Dauer. → Dauer auf `rdt`, Welt auf skaliertem `dt`; Kick/Shake und Flinch getrennt.
  *38 ms wären ~0,25 s; shipped 38/79/121–143 ms; Kamera real, Flinch Weltzeit · PH1/PH5 · 2026-07-31/08-01*

- **Probeform wird im Spiel Stern** — Aspekt skaleninvariant, Bloomsaum/projizierte Länge nicht. → Bildschranken bei echter Kontaktdistanz kalibrieren.
  *2,5 m Probe vs. 1,4 m Kontakt: Länge 6,5→11,7 % Framebreite (×1,79); 4 Schranken ungültig · PH6 · 2026-07-31*

- **Subframe-Trail folgt weiter Sehne** — Kontrollpunkt nutzt Subsample-Abstand wie Vollframe-Delta. → Geschwindigkeit m/s; `P0 + v × elapsed × 0,5`; Ground Truth fein gesampelt aus `Hero.bladeAt`.
  *Referenz nach Unterteilung Faktor `steps` zu schwach; Gap-Ratio 0,858/0,883 · PH13/14 · 2026-08-01*

- **60-Hz-Trail unterteilt jeden zweiten Frame** — Floatfehler bei exakt `2×MIN_DT`. → Beide Vergleiche mit `DT_EPS`; Nullkontrolle behalten.
  *600 Frames: `room=1` je Start 240–446-mal statt konstant 2; `d` ausgeschlossen · PH14 · 2026-08-01*

- **Bloom-Maximum misst Hintergrund** — additives Band übernimmt hellsten Pixel; Perzentil verliert schmale Peaks. → Vor Bloom Bandpixelanteil >0,9 (`overPct`) und Vier-Render-Doppeldifferenz.
  *Foe-Max 2,78 vs. Player 2,83; `overPct` 20,40/2,39 vs. 0,13/0,00; Glow 2.886 vs. 802 px · PH10 · 2026-07-31*

- **Additiver Core scheint dunkler** — Maske wächst um matte Randpixel, Mittel sinkt. → Fläche×Mittel als Energie plus feste Ausgangsmaske.
  *Deckung 7,73→9,31 %, Mittel 128,3→120,6; Energie +12–13 % · PH12 · 2026-08-01*

- **Gleichmäßige Beats verpassen Impact** — kurze Strike-Phase zwischen vier Samples; `hits[0]` kann vor Event liegen. → Sheets aus `Weapon.beatsOf()`/`hitArc`; landenden Event-Zähler führen.
  *Heavy u0,339–0,509; 0/0,333/0,667/1 verfehlten um 0,006; „Impact“-Plate bei 100 HP · PH1/2 · 2026-08-01*

- **Trefferzeit auf State-Clock** — `arcEase` verschiebt physische Pose. → Kontakt in `hitArc`; einmal per `arcEaseInv` in Clock.
  *Heavy `hits=0,46` → Arc 0,252: Schaden bei Viertelschnitt, Klinge hinter Kopf · PH2 · 2026-08-01*

- **Profil rankt subpixelige Core-Breite rückwärts** — Bins lösen Linie nicht auf. → Bis sichtbar falsch sweepen, ein Endbild urteilen; Zahlen nur Gesundheit.
  *`uCoreW` 4→40: Breiten konstant, Luma rankte unsichtbares w4; w20 shipped · PH12 · 2026-08-01*

- **Heller Schleier als Figuren-Erasure** — verkleinerter Frame verwechselt Helligkeit mit Strukturverlust. → Exakte Figurenmaske: Burn-Pixel und Varianz mit/ohne Effekt.
  *Eindruck „weiße Platte“; 0,00 % Figur L≥250, Varianz 28→49 · PH2 · 2026-07-31*
