# Kampf-VFX — claude-of-tsushima

**Lesen wenn:** du Trail, Ribbon, Slash, Funken, Impact, Hit-Stop, Effekt-Timing oder VFX-Capture änderst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

**Danach Pflicht:** `docs/ai-rules/VFX.md`; dort liegen Pipelinevertrag, aktuelle Konstanten und ausführbare Abnahme. Diese Datei enthält nur die teuersten lokalen Suchfallen.

- **Partikel am eigenen Geburtsframe „fehlt“** — `vFade = smoothstep(0,uRise,u)` ist bei Alter 0 absichtlich null; Pin/Emit-Reihenfolge erzeugt genau diesen Zustand. → Uhr zuerst pinnen, Birth-Timestamp zurücksetzen und einen benannten Beat nach Rise messen.
  *`sparkPx 0` wurde zweimal als Shaderdefekt verfolgt, obwohl beide Pools Draws lieferten; Heavy-Impact am Kontakt zeigt aus demselben Grund nur Licht · PH41/PH3-impact · 2026-07-29/31*

- **Hit-Stop verlängert sich selbst** — Countdown auf skaliertem `dt` macht aus Millisekunden beim Scale 0,16 ein Vielfaches. → Haltedauer auf `rdt`/Realzeit abbauen, Weltbewegung auf skaliertem `dt`; Kamera-Kick/Shake und Körper-Flinch nicht vereinheitlichen.
  *38-ms-Stop hätte sich auf rund 0,25 s gedehnt; shipped Light/Heavy/Kill 38/79/121–143 ms, Kameraantwort zerfällt real, Flinch hält mit der Welt · PH1-VFX/PH5-Hero · 2026-07-31/08-01*

- **Form stimmt im Probe, wirkt im Spiel wie ein Stern** — Aspekt ist skaleninvariant, Bloomsaum und projizierte Länge sind es nicht. → Jede bildkalibrierte VFX-Schranke auf der echten Kontaktdistanz neu eichen.
  *Spark-Bühne 2,5 m statt echtem Kontakt 1,4 m: Länge 6,5 %→11,7 % Framebreite = 1,79×; alle vier Bildschranken wurden ungültig · PH6-spark · 2026-07-31*

- **Subframe-Trail hat mehr Samples, folgt aber weiter der Sehne** — der Bézier-Kontrollpunkt benutzte den Abstand letzter Subsamples wie ein Vollframe-Delta. → Geschwindigkeit in m/s halten und Kontrollpunkt als `P0 + v × elapsed × 0,5` bilden; Ground-Truth über fein gesampelten `Hero.bladeAt` in `subframe.mjs` prüfen.
  *Importierte Referenzimplementierung war nach Unterteilung um Faktor `steps` zu schwach; Fix verbesserte gekrümmte Lücken auf Ratio 0,858/0,883 · `review/ph13-subframe.txt`, `ph14-sub.txt` · 2026-08-01*

- **60-Hz-Trail unterteilt nur in etwa jedem zweiten Frame** — `elapsed` ist Differenz einer akkumulierten Uhr und fällt am exakten `2×MIN_DT` durch Float-Rundung auf eine Stufe weniger. → Beide `MIN_DT`-Vergleiche mit dem vorhandenen `DT_EPS` führen und dessen Nullkontrolle erhalten.
  *Über 600 echte Akkumulationsframes kam `room=1` je nach Start 240–446-mal statt konstant 2; `d` war als Binder ausgeschlossen · `review/ph14-sub.txt` · 2026-08-01*

- **Bloom-Maximum misst den Hintergrund** — Hide-and-Diff über ein additives Band übernimmt den hellsten Pixel dahinter; Perzentile verlieren schmale Peaks konstruktionsbedingt. → Vor-Bloom den Anteil der **Bandpixel** über 0,9 (`overPct`) und geliefert per Vier-Render-Doppeldifferenz messen.
  *Foe-Max 2,78 gegen Player 2,83 trotz etwa Drittel-Tint; `overPct` trennte 20,40/2,39 von 0,13/0,00, gelieferter Glow 2.886 vs 802 px · `review/ph10-trail-glow.txt` · 2026-07-31*

- **Additiver Core scheint das Band abzudunkeln** — Schwellwertmaske wächst um matte Randpixel, daher sinkt ihr Mittel trotz zusätzlichem Licht. → Maskenfläche und Mittel gemeinsam als Energie lesen, plus feste Ausgangsmaske kontrollieren.
  *Core erhöhte Deckung 7,73→9,31 %, senkte Mittel 128,3→120,6; Deckung×Mittel stieg in drei Bedingungen um 12–13 % · PH12-ribbon · 2026-08-01*

- **Gleichmäßig verteilte Beats verfehlen den Impact** — kurze Strike-Phase liegt zwischen den vier Samples; selbst exakt `hits[0]` kann vor dem Update-Grenzübertritt liegen. → Contact-Sheets aus `Weapon.beatsOf()`/authored `hitArc` erzeugen und den landenden Event-Zähler mitführen.
  *Heavy-Strike lag u 0,339–0,509; 0/0,333/0,667/1 verfehlten um 0,006, später blieb der Gegner trotz „Impact“-Plate bei 100 HP · PH1/2-third-person · 2026-08-01*

- **Trefferzeit auf State-Clock statt Klingenbogen** — `arcEase` macht aus demselben Zahlenwert eine andere physische Pose. → Kontakt in sichtbarem `hitArc` authoren und einmalig über `arcEaseInv` in Clock-Zeit ableiten.
  *Heavy `hits=0,46` bedeutete `arcEase(0,46)=0,252`: Schaden bei einem Viertel des Schnitts, Klinge noch hinter dem Kopf · PH2-third-person · 2026-08-01*

- **Profilspalte rankt subpixelige Core-Breite rückwärts** — Bins können die Linie nicht auflösen und belohnen die hellste, flachste Variante. → Achse bis zu sichtbaren Fehlenden sweepen, dann genau **ein** Endenbild beurteilen; numerische Gates nur als Gesundheit behalten.
  *`uCoreW` 4→40 ließ Breitenmetriken konstant; Luma rankte w4 als „best“, Bild zeigte dort gerade keine trennbare Core-Schicht; w20 geshippt · PH12-core · 2026-08-01*

- **Heller Schleier wird als Figur-Erasure bewertet** — Eindruck aus verkleinertem Frame verwechselt Helligkeit mit verlorener Innenstruktur. → Figur per exakter Maske prüfen: verbrannte Pixel und Varianz mit/ohne Effekt, nicht Bandfläche allein.
  *Erster Eindruck „weiße Platte über Kopf“; gemessen 0,00 % Figur über L≥250 und Varianz 28→49 unter dem Band · PH2-VFX · 2026-07-31*
