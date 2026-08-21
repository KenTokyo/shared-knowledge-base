# Sichtbarkeit beurteilen — quiz-arena-space

**Lesen wenn:** du beantworten sollst, ob man einen Effekt *sieht* — mit Differenzbild, Pixel-Gate, Crop, Kontrollframe oder Verdikt.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Abgespalten von [`RENDER-VFX.md`](RENDER-VFX.md), weil beide Trigger dort in einer Datei standen: dort baust
du den Effekt, hier urteilst du über ihn. Was die Zahl danach behaupten darf, steht in
[`BENCH-SCENARIOS.md`](BENCH-SCENARIOS.md) und global in [`../../threejs/MEASURING.md`](../../threejs/MEASURING.md).

- **Der Harness konnte die Schicht gar nicht sehen, in der der Fehler lag** — 105 Symbole waren korrekt
  verdrahtet, in der richtigen Farbe, mit der richtigen Marke, und der Nutzer meldete „die Icons fehlen".
  Jede Bench war grün, weil `tools/shoot.mjs` sein Bild über `gl.readPixels` aus der Engine zieht: HUD,
  Skillleiste und Ladeschirm sind **DOM über dem Canvas**, also ist eine Aufnahme mit acht leeren Kacheln
  byte-gleich mit einer, in der alle acht stimmen. Kein Instrument im Repo konnte diese ganze Fehlerklasse
  überhaupt beobachten. → Bei jeder Beschwerde über ein Element der *Oberfläche* zuerst fragen, ob das
  gewählte Instrument diese Schicht abbildet; für DOM `tools/domshot.mjs` (`Page.captureScreenshot`
  komponiert). Und **im Dokument messen statt im Bild**: ein fehlendes und ein 0×0 großes Symbol sehen im
  PNG identisch aus und sind verschiedene Fehler.
  *Ursache war eine Klasse, kein fehlendes Markup: die kopierten Marken tragen `class="glyph-svg"` wie in
  der Quell-Library, jede Größenregel dieses Projekts hängt an `.sigil`. Gemessen: Mount-Kacheln 40×40,
  alle fünf Skill-Kacheln 0×0 (`line-height: 0` lässt das ersetzte Element kollabieren statt auf 300×150
  zurückzufallen — deshalb „leer" statt „kaputt") · 2026-08-20*

- **Ein Verdikt sagt *ob*, nie *welche*** — der Kontrollframe blendet die ganze Effektschicht auf einmal
  aus und benennt deshalb keinen Täter; zwei Schichten dämpften daraufhin den falschen Effekt. → Das
  **zuordnende** Instrument (Gruppen einzeln ausblenden) bauen, *bevor* der erste Fix versucht wird, nicht
  nachdem er versagt hat. Und die **Abtastform** gegen die Behauptung prüfen: ein Strahl beantwortet keine
  Frage über eine Fläche, ein Punkt keine über ein Band.
  *Impacts um 45 % und dann um 99 % gedämpft = 3 Pixel Unterschied von ~1600; die Gruppenauflösung
  entschied es in einem Lauf — schuldig war der Kill-Explosionsblitz zwei Funktionen weiter. Danach weiß
  geblasene Pixel 1236 → 358. Ein Achsenstrahl meldete `occl=0/span96[]` über einem Bild voller schwarzer
  Deckenplatten; `imgdiff` wies dieselbe Deko als 6,317 % geänderte Fläche aus, bei bit-identischer
  Simulation · 2026-07-29, 2026-08-02*

- **Der benannte Verdächtige war nie im Bild** — einmal wiesen drei „bestätigende" Läufe auf die
  Bloom-Stärke, einmal benannte eine Übergabe den Schuss-Trail als bildfüllendes Band und lieferte die
  Zielwerte gleich mit; beide Verdächtigen waren unschuldig, beide Male sagte es erst ein Gegenlauf.
  → **Null-Lauf vor Fix**: den Frame einmal fahren, in dem der Verdächtige *nichts* erzeugt — nicht mit
  alten Werten, die sind der Ausgangszustand. Steht das Bild dann noch, ist jede Parameterarbeit daran
  verloren, und die Suche gehört eine Ebene höher.
  *Band unverändert bei `charges=0`, durch alle zwölf `?fxoff=`-Schichten und `bloom=0` hindurch, weg erst
  bei `?deckpulse=0` — der Deck-Puls des Bretts, Ring bei Radius ~64 zu t=0,86 unter einer Kamera auf
  Radius 62. Die vorgeschlagenen Breiten 0,42/0,9 → 0,2/0,45 bewegten den Frame-Mittelwert um 0,0002.
  Zuvor: rekonstruierte alte Bloom-Werte lieferten unverändert `BLOWN:t28(+6%)`, Ursache war ein
  Damper-Wert zwei Systeme weiter · 2026-07-29, 2026-08-02*

- **Ein Effekt bedeckte 43 % des Bildes und war trotzdem unsichtbar** — „geänderte Fläche" wurde als
  Sichtbarkeit gelesen; der Rauch lag auf derselben Luminanz wie der Boden, 92 % seiner Pixel im
  ±0,04-Band. → Für „sieht man das" **Kontrastfläche** messen (Körper ab |Δ| ≥ 0,10, Kern ab 0,20), nie
  `changed %`.
  *Körper 0,392 % → 5,794 % (14,8×), Kern 0,005 % → 2,402 % (480×); die publizierte Aussage „im einen
  Sektor sichtbar, im anderen fast nichts" war dabei rückwärts · 2026-07-31*

- **Ein Pixel-Gate misst PostFX mit, das nach dem geprüften Pass läuft** — 25,7 % der „geschützten" Pixel
  schienen vom Verzerrungs-Pass bewegt; Bloom trägt Nachbaränderungen auf unberührte Pixel. → Jedes
  Pixel-Gate **nur mit ausgeschaltetem Bloom** lesen, auf allen Armen.
  *25,7 % mit Bloom gegen 0,311 % ohne — Faktor 82; die Restverletzungen waren 162 Läufe mit mittlerer
  Lauflänge 1,3 px · 2026-07-31*

- **Ein schwarzer Verdecker ist im Differenzbild unsichtbar** — drei Phasen drehten an Licht, Becken und
  Shader-Rändern; es war die Deckelkappe eines Kragens (`openEnded: false` → massive Scheibe), die die
  additive, tiefengetestete Säule mitten im Schaft beschnitt. Ein „Effekt aus"-Bild kann den Verdecker nie
  entlasten, weil eine schwarze Kappe gegen ein unbeleuchtetes Inneres nichts ändert. → Verdächtige
  Verdecker mit `depthTest: false` oder einem opaken Debug-Pass prüfen, nicht per Differenzbild.
  *Säulen-Rechteck `p50` 0,461 → 0,349 bei unverändertem Ganzbild · 2026-07-28*

- **Vergrößerte Crops erzeugen Defekte, die es nicht gibt** — im ×2-Crop schien ein Bauteil ~10 px
  gewandert, im ×3-Crop wirkte der Rumpf zerrissen; Vergrößerung überzeichnet Ein-Pixel-Kanten und das Auge
  liest daraus Struktur. → Nur bei 1:1 urteilen, ×N ausschließlich zum **Auffinden**, jede behauptete
  Verschiebung per Schwerpunkt oder Block-Matching nachmessen.
  *Behauptete ~10 px gegen gemessene 1,3 px = Faktor 8; vierter dokumentierter Fehlalarm derselben Art auf
  derselben Zeile · 2026-07-31*
