# Bewegung, Waffen, Kamera, Audio und HUD — quiz-arena-space

**Lesen wenn:** du eine Spielgröße änderst, die ein Spieler spürt — Bewegung, Abklingzeiten, Waffenzahlen, Kameraklemmen, Audio-Pegel oder eine HUD-Anzeige.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Das gemeinsame Muster dieser Datei: **die Zahl, die in der Tabelle steht, ist selten die, die bindet.**
Bevor eine Konstante gedreht wird, messen, welcher Term das Verhalten tatsächlich hält.

- **Die angehobene Grenze war nie die bindende** — die Leertaste blieb spammbar, obwohl die Abklingzeit
  erhöht worden war; gebunden hat auf jedem Rumpf und in jedem Eingabeprofil der **Ladungsnachschub**
  (`dashCooldown * 1.5`), eine Zahl, die in keiner Tabelle steht. → Den Messarm sagen lassen, **welche**
  Grenze pro Rumpf gehalten hat, statt die naheliegende zu drehen.
  *Über 120 Dashes band die Abklingzeit 3×; vorher 0,63 s Periode / 52 % unverwundbar, nachher 1,35 s /
  23–25 % · 2026-08-02*

- **Eine ganze Konstantenfamilie formt nichts** — die Momentum-Decke liegt bereits bei Momentum 0 über der
  realen Endgeschwindigkeit `accel/drag`, die Klammer feuert also bei **keinem** Wert, und zwei weitere
  Konstanten daneben sind damit wirkungslos. → Vor dem Nachdrehen prüfen, ob der Term überhaupt je bindet;
  ist er tot, den **Befund dokumentieren** statt zu justieren — an `momentum01` hängen Kamera, Audio und
  fünf Upgrade-Karten.
  *Decke 36,9/44,0/29,4 gegen `accel/drag` 23,3/22,9/18,6 auf den drei Rümpfen; `t90` 1,00–1,07 s gegen
  ein gefordertes Band von 1,5–2,5 s · 2026-07-30*

- **Zwei Terme in derselben Frame heben sich exakt auf** — Boosten zog Energie ab, und die Regeneration
  addierte **bedingungslos** im selben Schritt wieder dazu: die Anzeige bewegte sich nie, und eine
  Upgrade-Karte verkaufte eine tote Klausel. → Regeneration hinter den Zustand gaten, der sie verbraucht;
  die Netto-Bilanz pro Rumpf ausrechnen und **vor** dem Lauf notieren.
  *Netto 21/21 = exakt 0 auf einem Rumpf, +8/s und +11/s auf den anderen — auf zwei von drei füllte Boosten
  den Tank. Nach dem Fix `peak 0.00 → 0.46`, exakt die Vorhersage 21/s × 2,4 s ÷ 110 · 2026-07-29*

- **Eine Ressource, deren Abbau ungegated läuft, kann ihren Deckel nie erreichen** — die Abkühlung lief
  auch während des Feuerns, die Netto-Bilanz bei Dauerfeuer war negativ, und damit war Überhitzung
  **strukturell unerreichbar** — samt Sperrzustand, zwei Karten und einem Immunitäts-Stat. → Abbau an den
  losgelassenen Auslöser koppeln; die eingebaute Kontrolle ist der eine Pfad, der den Deckel erreicht.
  *Nach 4 s gehaltenem Abzug war der Spitzenwert exakt der Zuwachs eines einzelnen Schusses — 0,03 / 0,02 /
  0,09 —, während der Beam als eingebaute Kontrolle 1,00 erreichte · 2026-07-28*

- **Ein Schuss, der als zwei gelesen wird, kam nicht aus der Waffe** — die Waffe feuerte messbar einmal;
  die Optik legte zwei Bänder eine halbe Umdrehung versetzt um die Flugachse, mit dunkler Lücke dazwischen.
  → Die Zahl zuerst messen (`maxPerFrame`), dann die **Form** prüfen; und die geometrische Klausel
  *außerhalb* der Zeichenroutine ansiedeln: nichts weiter von der Achse als der eigene Kollisionsradius.
  *`maxPerFrame=1` bei 17/17 Schüssen, während die Bänder bei ±0,70u um einen Kern von 0,345u lagen =
  2,0× Kernbreite. Danach worst off-axis 0,310u gegen radius 0,368u, verwurzelt 120/120 · 2026-08-02*

- **Die Arena war lauter als der Spieler** — drei Oszillatoren mit Amplitude 1 summierten in *ein*
  Ausgangs-Gain, also erreichte rund das Dreifache der Konstante den Master; dazu fehlte die
  Distanzdämpfung im ersten Frame. → Oszillatorstapel auf **Summe 1** normalisieren und je Quelle einen
  eigenen Pegel führen (Spieler / Hazard / Slow).
  *Eine 2,6 s haltende Stimme lag mit 0,698 über dem eigenen Schuss-Transienten (0,627); nachher 0,296 /
  0,237 / 0,454. Gemessen ist die Gain-Summe im Graphen, nicht die wahrgenommene Lautheit · 2026-08-02*

- **Eine Klemme, die geometrisch nicht tun kann, was sie behauptet** — die Kamera-Kollisionsklemme addierte
  auf `distance`; das Auge liegt aber auf dem Strahl, der das Subjekt unter `pitch` verlässt, also ist das
  alte Segment **Teilmenge** des längeren Booms: Zurückziehen kann eine Verdeckung nicht auflösen. → Die
  Klemme über `pitch` führen und das echte Segment Auge→Hülle prüfen. Und: die Hypothese der Vorschicht
  („toter Zweig") vorher **messen** statt sie zu übernehmen.
  *`blocked=11` mit lebendem Term und dieselben `11` mit `return 0` bei sonst identischen Läufen; nach dem
  Umbau 11 → 6. Die Vorbedingung war erfüllt (363 von 1801 Frames), die geerbte Hypothese war falsch · 2026-07-30*

- **Zwei boolesche Tore, von denen eines nie auslöst, sehen aus wie eine Prüfung** — in zwei Sektoren riss
  kein einziger der 24 Kandidaten das zweite Tor, der Term war konstant, trug null Information, und das
  Ranking fiel still auf das Verhalten *vor* dem Fix zurück. → Boolesche Tore durch **summierte Kosten in
  einer Währung** ersetzen; und die als „greift ohnehin nie" geparkten Zweige einfach messen.
  *Der als „greift nie" abgehakte Fallback griff in 7 von 20 Konfigurationen und lieferte 3 Plätze mit real
  verdeckten Buchstaben aus; der Hauptverdächtige tauchte in 30 Messungen über 5 Layouts **kein einziges
  Mal** als Blocker auf · 2026-07-30*

- **Ein knapp grüner Wert war Glück, nicht Struktur** — ein Gegner kippte von 0,67 s Vorwarnung auf 0,03 s,
  ohne selbst angefasst worden zu sein: alle kampfnahen Benches teilen einen Zufallsstrom, den jede
  Schadens- oder Projektiländerung verschiebt, und der grüne Wert war ein gewonnenes Rennen zwischen zwei
  Angriffsarten. → **Struktur erzwingen** (die anderen Angreifer entwaffnen), nicht den Wert nachjustieren.
  Ein Codekommentar „gemessen, nicht angenommen" ist damit widerlegbar — und wurde widerlegt.
  Dieselbe Verwechslung mit vertauschten Rollen: **ein Maximum über N Züge ist ein Maximum über Glück.**
  Ein Pegel-Vergleich, der die lauteste Frame der Waffe gegen die lauteste eines Höhepunkts stellt, zieht
  auf der einen Seite viele Male und auf der anderen wenige — der Abstand, der dabei herauskommt, ist zum
  großen Teil die Zugzahl. → Beide Seiten aus **demselben Zustand** und mit **gleicher Zugzahl** rechnen,
  oder die Rivalin als Kontrafaktisches aus der Spur des Höhepunkts herleiten und die Zugzahlen mitdrucken;
  ein Maximum aus ungleich großen Ziehungsmengen nie als Rangfolge veröffentlichen.
  *0,67 s → 0,03 s ohne eine Zeile Änderung an diesem Gegner; danach strukturell stabil auf dem
  Melee-Windup 0,45/0,63/0,70 s · 2026-07-29*
  *Die Kanone zieht 16-mal, die drei Landmarken je einmal: ihr bester Zug 0,5977 steht gegen 0,4000 aus
  ihrer lautesten echten Frame. Deshalb ist sie nicht die Rivalin — die Klausel rechnet jede Landmarke
  gegen das, was die Waffe **vom selben Pegelstand aus** gekauft hätte (Stufe 0,06→0,404/0,204,
  0,75→0,433/0,433, Kill 0,72→0,489/0,489), und das Modell dahinter reproduziert alle 36 echten Rufe ans
  Rig · 2026-08-03*

- **Ein voller Balken sah aus wie 78 %** — verdächtigt wurde die Rechnung der Vitalanzeige; die Zeile war
  die einzige mit Zahlenspalte, ihr Track dadurch kürzer als die der beiden Nachbarn. → Balken derselben
  Gruppe auf einer **gemeinsamen rechten Kante** enden lassen (leere Zahlenspalten als `—`), und solche
  Befunde am Zoom-Crop suchen — Codelesen findet sie nicht.
  *46 px Spaltenbreiten-Differenz · 2026-07-28*

- **Ein „flaches Tal" aus zwei Messreihen ist der schwächste Ausgang, den ein Sweep haben kann** — zwei
  Sektoren lasen den Korridor [0.4, 0.8] als gleichwertig („jeder Wert darin ergibt dasselbe Bild"); bei
  fünf legen zwei ihre Böden auf **entgegengesetzte** Enden genau dieses Korridors und lesen am Boden des
  anderen je rund dreimal schlechter. Ein Plateau ist die Form, die Uneinigkeit annimmt, solange zu wenige
  Reihen da sind — zwei Minima an verschiedenen Stellen sehen zusammen flach aus. → Plateau- und
  Korridoraussagen erst ab der **dritten unabhängigen Reihe** veröffentlichen; Wert und Begründung getrennt
  führen, denn die Konstante darf überleben, während ihre Begründung stürzt.
  *`cwaimpull` über fünf Sektoren: verdant Boden 0.75 (4) liest 12 bei 0.50, voidscar Boden 0.50 (4) liest
  11 bei 0.75 — 3,0× und 2,75×. 0.5 blieb stehen, getragen jetzt vom Mittelpunkt-Argument statt vom flachen
  Tal: innerhalb von 8° jedes eigenen Bodens, von 0.00 (23–31) nirgends geschlagen · 2026-08-03*
  *Eine Schicht später ist auch das Mittelpunkt-Argument gefallen, und zwar ohne eine einzige neue Reihe:
  der Sweep maß `plateOff` gegen vier zusammenstehende Buchstabentürme, die der Frage-Runner gelöscht hat.
  Eine Frage läuft jetzt in der lebenden Welle, Zentrierung ist nicht mehr die Größe, gegen die diese Zahl
  handelt — `CW_AIM_PULL` steht auf **0.35** (`src/core/Game.ts`, per Symbol zitiert), und die Tabelle ist
  mit ihrer Phase aus dem Doc-Block heraus. Der Tipp selbst hält damit zweimal: der Wert überlebte den
  Sturz seiner ersten Begründung und starb am Wegfall seines Messobjekts · 2026-08-03*

- **Der Beat mit dem größten Gewicht war der einzige ohne Kamerastoß** — Juice verteilt sich über
  unabhängige Kanäle (Trauma, Flash, Hitstop, Licht, Ring, Audio), und ein Beat kann auf fünf davon
  vollständig sein und auf dem sechsten leer. Im Spiel fällt das nicht auf, weil das abklingende Trauma des
  vorigen Beats die Lücke maskiert; im Code fällt es nicht auf, weil der Beat sichtbar *etwas* tut. → Beats
  gegen Kanäle auftragen und die **Spalte** lesen, nicht die Zeile — ein Höhepunkt muss seine eigenen
  Teilschritte auf **jedem** Kanal überbieten, nicht auf den meisten.
  *Der Wort-Solve trug Flash 0.25 (1,56× des Turm-Bursts 0.16) und Ring 26 (1,44× dessen 18), aber Trauma
  **0** gegen 0.24 — während eine *falsche* Antwort mit 0.16 stieß. Trauma klingt linear mit 1.35/s ab: die
  0.40 des letzten Buchstabens waren bei 0,30 s aufgebraucht, der Solve feuert bei 0,50 s. Nachweislich
  stille Kamera im lautesten Moment der Phase, gesetzt auf 0.35 · 2026-08-03*
