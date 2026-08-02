# Deckel — 3–5 Verbesserungen pro Achse, dann etwas Neues

**Lesen wenn:** du an derselben Sache die dritte Verbesserung misst — und bevor du eine Loop-Schicht startest.
**Status:** Deckel, kein Tipp · überschreiben nur über den Preisvergleich unten · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)

**Der Deckel stoppt nicht die Arbeit, er stoppt die Wiederholung.** Im
[Phasenworkflow](TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md) weiterarbeiten — ab sechster
Verbesserung jedoch an anderer Phase/Achse. Phasenworkflow sagt, dass Arbeit weitergeht; diese Datei sagt, woran.

## Die Regel

1. **Pro Achse 3–5 Verbesserungen. Danach ist die Achse zu** — auch wenn noch etwas ginge. Es geht immer
   noch etwas. Das ist kein Gegenargument, das ist der Grund für den Deckel.
2. **Beim Schließen fünf Zeilen hinterlassen:** die 3–5 Verbesserungen mit ihrem gemessenen Delta, die
   Restidee, die du bewusst liegen lässt, und die Zahl, an der man einen Rückfall erkennt. Ohne diese
   Notiz macht die nächste KI die Achse aus Unwissen wieder auf und die Leiter beginnt von vorn.
3. **Die nächste Arbeit ist etwas anderes.** Nicht dieselbe Achse feiner, nicht dieselbe Achse mit
   besserem Messwerkzeug, nicht ein Audit derselben Achse.

## Was eine Achse ist

**Die Achse ist die Zahl, gegen die du vergleichst — nicht die Datei, die du editierst.** Wenn die nächste
Verbesserung an derselben Kennzahl auf derselben Szene gemessen würde, ist es dieselbe Achse, egal wie
viele Dateien dazwischen liegen. Umgekehrt ist ein Wechsel der Datei kein Achsenwechsel.

Das ist die Stelle, an der der Deckel umgangen wird: Man nennt Runde 6 einen neuen Namen und zählt weiter
bei 1. Der Test dagegen ist eine Frage — **würde ich den Erfolg mit derselben Messung belegen wie beim
letzten Mal?** Ja → dieselbe Achse.

## Was nicht als Verbesserung zählt

Diese drei fühlen sich wie Arbeit an und bewegen am Ergebnis nichts. Sie sind **kein** Zähler-Inkrement,
sondern das Signal, dass die Achse schon zu war:

- ein Audit der eigenen letzten Verbesserung
- eine Korrektur an Kommentar, Notiz, Doku oder Messwerkzeug
- ein Fix, dessen Delta auf der Achsenzahl gemessen 0 ist

## Die einzige Ausnahme: der Preisvergleich

Verbesserung #6 ist erlaubt, wenn du **vorher** zeigst, dass sie mehr wert ist als das Beste, was du gerade
nicht tust. Beide Seiten beziffern, je ein Satz, bevor du anfängst — nicht danach als Rechtfertigung. Nach
fünf Runden auf einer Achse fällt dieser Vergleich fast immer gegen #6 aus; und wenn nicht, ist
Weitermachen richtig und belegt.

Nicht zulässig als Preis: „da geht noch was", „ich bin schon drin", „das ist schnell erledigt". Das sind
Gründe, warum #6 **billig** ist, keine, warum sie **wertvoll** ist.

## Wieder aufmachen

Erlaubt, mit Grund in einer Zeile, und der Zähler beginnt neu bei 1:

- die Achse ist **gemessen zurückgefallen** (die Zahl aus der Abschlussnotiz ist wieder schlechter)
- der User verlangt es
- eine **neue Messart** zeigt dort einen Effekt, der größer ist als alles auf der geschlossenen Leiter

## Beleg

- **Die Rendite endete bei vier, die Achse lief bis sieben.** In `claude-desert` lief die Achse
  „`slam` gone-px" über 25 Phasen (`STATUS.md ## PH60`..`## PH85`), zuletzt fünf Phasen auf einer einzigen
  Partikel-Kohorte. Sieben Commits: **vier bewegten Pixel** (`80fc1e7`, `0dd0d12`, `9cf868f`, `6adfed4`),
  die drei danach **null** — `2002468`/`341a212` sind Upload-Ranges, Bild bytegleich (slam f44/f45/f47/f73,
  je 9 Zeilen), `96b541b` ist reiner Kommentar (76+/31−, keine einzige Nicht-Kommentarzeile). Schon die
  vierte ließ 88 von 98 Frames ziffernidentisch. Ein Deckel bei 5 hätte genau dort geschlossen, wo die
  Rendite aufhörte; stattdessen beendete der User die Achse: „wir drehen uns im Kreis".
  *· 2026-08-01*
