# Messvorrichtungen — quiz-arena-space

**Lesen wenn:** du an der Vorrichtung arbeitest, die eine Zahl für eine Klausel *herstellt* — an einem Stub, einem Wrapper, einem Antrieb oder einem Parser.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Was die Klausel selbst behauptet, steht in [`SIM-GATES.md`](SIM-GATES.md). Hier steht, warum die Zahl,
die bei ihr ankommt, nicht die war, die im Spiel entstand.

- **Der Wrapper war schmaler als das, was er umschloss** — der Fix griff im Produktivcode nachweislich, und
  der Arm druckte trotzdem exakt dieselben Zahlen wie davor. Ein Mess-Wrapper mit weniger Parametern als die
  umschlossene Methode stellt deren altes Verhalten still wieder her, **aber nur innerhalb der Messung**. →
  Wrapper über die vollständige Signatur oder über `(...a)` schreiben, und nach jeder Signaturerweiterung im
  Produktivcode jeden Wrapper im Harness nachziehen. Ein Wrapper, der schmaler ist als sein Ziel, fällt nicht
  aus — er misst den alten Code weiter.
  *`VFX._afford` bekam einen vierten Parameter `evicts`, der Wrapper in `tools/sim.mjs` nahm drei und ließ ihn
  fallen: `rings=158/176` und dieselben Verweigerungen vor wie nach dem Fix · 2026-08-02*

- **Round-Robin füllt keinen Pool** — die naheliegende Antriebsform (reihum je einen Gegner je Schlüssel,
  viele Runden) misst nichts: `acquireModel` holt sofort zurück, was die Vorrunde freigab, die Free-List
  bleibt bei einer Handvoll stehen und die Deckel-Klausel wird grün, ohne den Deckel je berührt zu haben.
  → Je Schlüssel im **Batch** spawnen, den Batch als Ganzes freigeben, erst dann den nächsten Schlüssel.
  *10, 12 und 16 Runden Round-Robin ergaben alle `pooled=18` statt der geforderten 180; im Batch-Betrieb
  246 freigegebene Rümpfe über 6 Schlüssel → exakt 180 · 2026-08-02*

- **Das Rot kam vom eigenen Testeingangssignal, nicht vom Code** — drei von vier Rotmeldungen einer
  Schicht waren Fehler der Stimuli und sahen exakt wie echte Funde aus. → Jede Rotmeldung **zuerst gegen
  das eingespeiste Signal nachrechnen**, bevor eine Zeile Produktivcode angefasst wird; die Rechnung
  kostet Minuten, der falsche Fix eine Schicht.
  *Ein „1 Schaden"-Projektil ist wegen `Math.max(1, …)` in Wahrheit 60 dps und tötete den Kern bei 9,2 s,
  während das Verwundbarkeitsfenster noch bei 4,8 s stand; 5 Schaden/Frame ergaben 0,029 Shake-Zufluss
  gegen 0,043 Abfluss — netto negativ, `corefreeze` hatte nichts zum Einfrieren · 2026-08-02*

- **Das Messinstrument besteht seine eigene Rot-Treibung nicht** — zwei Verfahren für Per-Frame-Allokation
  trennten synthetisch sauber und sahen die absichtlich eingebaute Regression trotzdem nicht. → Instrument
  erst gegen eine eingebaute Regression rot fahren; besteht es nicht, **zählen statt messen**.
  *`process.memoryUsage()` meldete 208 B/Frame und für eine Obermenge *weniger* Verbrauch als für ihre
  Teilmenge; der Minor-GC-Zähler trennte 0/3/8 GCs bei 0/1/5 Objekten über 2 Mio. Iterationen, maß für
  einen pro Frame erzeugten `THREE.Vector3` aber 1 GC gegen 2 über 2 Mio. Frames (V8 scalar replacement) · 2026-08-02*

- **„Keine Funde" war der Parser, nicht der Befund** — ein Karten-Audit meldete Entwarnung, weil sein
  Brace-Parser jede ausdruckskörperige Pfeilfunktion still übersprang. → Vor dem Glauben an ein
  Null-Ergebnis die **Eingangsmenge** des Werkzeugs ausdrucken lassen; „Karten ohne Body: keine" muss
  selbst eine geprüfte Zeile sein.
  *„targets with no reader: none" bei 24 von 41 stillschweigend fallengelassenen Karten
  (`apply: (s) => (…)` ohne Klammer) · 2026-08-01*
