# Oberfläche messen — claude-tower-defense

**Lesen wenn:** du Lesbarkeit, Kontrast, Größe oder Position einer HUD-/Weltlabel-Schicht misst oder änderst —
oder wenn eine Sonde über eine Oberfläche „0 Fehler" meldet.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **„0 von N" ist „0 von dem, was gemessen wurde"** — die Kontrastsonde schloss mit *„218 Zeilen, 0 unter dem
  AA-Boden"*, und das liest sich als Urteil über die Oberfläche. Es war ein Urteil über **vier ruhige Bilder**
  davon. Ursache: die Stageliste war nach *Klassenabdeckung* gewählt („keine fünfte Stage bringt eine Klasse,
  die die ersten vier verfehlen") — und eine Klasse einmal in Ruhe gemessen ist die Klasse in dem Zustand
  gemessen, in dem sie am besten liest. Jeder Alarmzustand, jeder Endzustand und jede ausgegraute Karte fehlten.
  → Stages nach **Zustand** wählen, nicht nach Klasse: was ist rot, was ist ausgegraut, was ist zu Ende, was ist
  am dichtesten belegt. Und die Schlusszeile einer Sonde immer als *„von dem, was gefahren wurde"* lesen.
  *`tools/_d75.mjs`: 4 Stages → 218 Zeilen → 0 unter dem Boden; dieselbe Sonde mit 13 Stages → 678 Zeilen →
  **17** unter dem Boden über **6** Klassen · 2026-08-02*

- **Ein dunkler Wash über einem fertigen Label DIMMT es nicht, er kollabiert sein Kontrastverhältnis** — und
  das ist der Unterschied zwischen „etwas blass" und „unlesbar". Ursache: ein Wash multipliziert Tinte **und**
  Papier mit demselben Faktor, und die WCAG-Formel hat einen **absoluten** Summanden — `(Tinte + 0.05) /
  (Papier + 0.05)`. Beide Seiten gegen null skaliert, übernimmt die Konstante und das Verhältnis läuft gegen
  1:1. Ein Label mit 0.92 deckendem Plättchen und cremefarbener Schrift las als zwei Schwarztöne.
  → Merkregel: **am Label selbst ist dagegen nichts zu machen.** Dickerer Strich, hellere Farbe, schwereres
  Plättchen — alles wird mit demselben Faktor multipliziert. Nur **Malreihenfolge** oder **Geometrie**
  antworten auf einen Wash, der obendrauf liegt.
  *`.wui-lane-name` bei **1.27:1**, Tinte 0.017 auf Papier 0.003, hellster Pixel der ganzen Box 0.020 bei einer
  Regelfarbe von 0.806 linear; nach dem Verschieben des Washs unter die Ebene **10.55:1** · 2026-08-02*

- **`z-index: auto` am Container macht seine Kinder nicht sicher** — eine Regel sagt „der Wash liegt hinter dem
  Text", das Kind bekommt `z-index: 0`, der Text `z-index: 1`, und trotzdem malt der Wash über eine
  **Nachbarschicht**. Ursache: ein positioniertes Element mit `z-index: auto` gründet **keinen** Stapelkontext,
  also konkurrieren seine Kinder im Kontext ganz oben — dort trifft `z-index: 0` auf eine Geschwisterschicht mit
  `z-index: auto`, beide landen in derselben Malstufe, und **die Baumreihenfolge** entscheidet.
  → Bei jeder „liegt hinter"-Regel prüfen, in **welchem** Stapelkontext beide Seiten stehen, nicht nur welche
  Zahl draufsteht. Und der Fix ist meist eine **Beförderung** der unterlegenen Schicht, keine Herabstufung des
  Washs: innerhalb einer Stufe entscheidet weiter die Baumreihenfolge, die Ordnung des restlichen Inhalts
  bleibt also unangetastet.
  *dieselbe `z-index: auto` hat in diesem Projekt dreimal etwas gekostet: erst der untere Wash über der unteren
  Leiste, dann derselbe Wash über der Weltlabel-Ebene · 2026-08-02*

- **Eine Sonde, die mehr als ein Szenario durch EINE Seite fährt, braucht EINE Baseline — nicht ein `reset` je
  Szenario** — sonst deckt jedes `reset` genau das ab, woran sein Autor gedacht hat, und das nächste Szenario
  vergisst dieselben Felder wieder. ⚠ **Und die Lücke versteckt sich hinter dem Nachbarfeld, das jeder schreibt:**
  hier zählte `energy` in beiden Läufen dieselbe 300, weil jedes Szenario sie selbst setzt — nur `earned`
  daneben trug die Summe des **vorherigen** Szenarios mit. Ein sichtbar richtiger Wert ist kein Beleg für die
  Zählung darunter.
  → Baseline **vor** die Bühne, nicht `reset` dahinter. Und den Umzug einer Baseline als **folgenlos beweisen**:
  denselben Lauf vorher/nachher diffen, Capture-Pfade normalisiert. Weicht **eine** Zeile ab, ist das der Fund.
  *der Umzug war byte-genau identisch bis auf eine Zeile: `earned 120` → **`earned 90`**. Neunzig ist wahr
  (`RUNE_ENERGY` 15 × sechs Runen); die fehlenden 30 waren die zwei guten Setzungen des Szenarios davor, elf
  Szenarien lang mitgeschleppt · 2026-08-02*

- **Eine Kontrastsonde findet einen Positionsfehler nur zufällig** — ein am Bildrand halbiertes Label taucht in
  ihrer Tabelle als **eine** Zeile mit einer negativen Boxkoordinate auf, zwischen zweihundert plausiblen. Sie
  misst Pixel in einer Box und hat kein Urteil darüber, ob die Box am richtigen Ort liegt.
  → Positionsfragen bekommen eine **eigene** Sonde. ⚠ Und eine rein geometrische Sonde darf **zwei
  Größenordnungen mehr Stichproben** nehmen als eine Pixelsonde, weil sie keinen Verschluss hat: kein
  Screenshot, kein Settle, keine Standruhe — nur `getBoundingClientRect` in **einer** `page.evaluate`-Schleife.
  *`-14,582,85,15` in einer Stage gegen **20,7 % von 150 Kamerastände** mit mindestens einem halb
  abgeschnittenen Label; 150 Stände statt 4 Stages, weil die Geometriesonde ~10 s statt ~10 min braucht · 2026-08-02*

- **Eine Klemmung ohne Grenze erzeugt ein Label, das LÜGT, statt eines, das abgeschnitten ist** — ein an den
  Rand geklemmtes Weltlabel zeigt dort auf etwas, das hinter der Kamera steht. Abgeschnitten ist ein sichtbarer
  Fehler, falsch verankert ist ein unsichtbarer.
  → Der Klemmung eine Reichweite geben: ein Anker weiter als eine halbe Labelbox außerhalb bekommt `null` statt
  einer Randposition. Die Grenze gehört in den Kommentar, weil sie sonst wie ein vergessener Fall aussieht.
  *Randklemmung brachte **8 Labels mehr** auf die Scheibe (307 → 315 Sichtungen) und **eine** Kartensichtung
  weniger, deren Anker mehr als eine halbe Boxhöhe außerhalb lag · 2026-08-02*

- **Der Rauschboden INNERHALB einer CSS-Regel ist größer, als man von einer Regel erwartet** — dieselbe Klasse,
  derselbe Lauf, zwei Instanzen: **3.50** und **11.88**. Ursache sind Glyphenform und Subpixelphase, nicht die
  Regel — eine „1" hat weniger Fläche als eine „2" und trifft das Pixelraster anders.
  → **Nie auf eine einzelne Instanz nahe dem Boden reagieren.** Die Rangliste je **Klasse** lesen (schlechteste
  Instanz je Regel, plus wie viele Instanzen die Regel überhaupt hat) — eine Stylesheet-Zeile bewegt alle, und
  eine Instanz ist eine Stichprobe von einer.
  *`.hud-cap`, ein Lauf, Faktor 3.4 zwischen zwei Zeichen derselben Regel · 2026-08-02*

- **Eine Größenangabe im Kommentar ist eine Behauptung, auch wenn sie plausibel klingt** — hier stand
  „Vignette, **auf den Text** dimensioniert statt auf eine Box", und die Regel war ein **Prozentsatz des
  Viewports**. Nachgemessen war sie 1,8× so breit wie ihr Gegenstand und **5,5× so hoch**.
  → Den Gegenstand **ausmessen** (die Sonde druckt seine Box ohnehin) und in einer Einheit dimensionieren, die
  ihm folgt: `em` gegen dieselbe Wurzelgröße, aus der die Schrift geschnitten ist. Prozent vom Container folgt
  dem **Fenster**, nicht dem Text — das ist genau der Unterschied, den der Kommentar behauptet hatte.
  *Wash-Null bei 530×194 px gegen einen Textblock von 586×70 px; nach `24em 5em` fielen **7 fehlerhafte Zeilen
  auf 1**, und der Titel darüber blieb bei 6.32:1 gegen einen Boden von 3.0 · 2026-08-02*

- **Wenn eine Sonde eine gewollte Ausblendung mitzählt, hört ihre Kopfzahl auf, eine Arbeitsliste zu sein** —
  ein toter Tastenhinweis steht mit Absicht auf `opacity: 0.3` („eine Anweisung, die ihr Verb überlebt, ist
  Lärm"), und vier solcher Zeilen standen ununterscheidbar neben echten Farbfehlern. Wer die Kopfzahl abarbeitet,
  macht eine Entscheidung rückgängig; wer lernt, sie zu diskontieren, liest sie gar nicht mehr.
  → **Nichts verstecken, sondern nach Ursache aufteilen:** eine zweite Zeile, die sagt, wie viele der Fehler
  unterhalb einer Deckkraftschwelle liegen (0.9 — darüber ist es eine Distanzrampe, keine Entscheidung) und wie
  viele der Stylesheet wirklich besitzt. Das berichtet **mehr** als vorher, nicht weniger.
  *5 Zeilen unter dem Boden, davon 4 gewollt ausgeblendet und 1 echt · 2026-08-02*
