# Frage-Runner und seine Antwortplaketten — quiz-arena-space

**Lesen wenn:** du `src/systems/Crossword.ts` und seine Nachbarn anfasst — den Frage-Takt, die vier Antwortplaketten, ihre Wirtsstrukturen in der Arena oder ihre Lesbarkeit im Gefecht.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Die Frage läuft **in** der lebenden Welle: kein Anflug, keine eigene Runde, kein Gitter. Vier Plaketten
tragen ganze Antwortwörter und hängen an geliehenen Arena-Strukturen. Was der Kern daraus macht, steht bei
`src/systems/CoreBreach.ts`; was die Prüf-Bench darüber bewacht, in [`SELFTEST-NOTES.md`](SELFTEST-NOTES.md).

- **Der Turmring, auf den geplant wurde, existiert in keinem Sektor** — die Antworten sollten statt eigener
  Türme bestehende Arena-Strukturen leihen; an einem Fragenort bei r=52 liegen die vier nächsten Strukturen
  26–61u entfernt und **alle auf einer Seite**. Ein fester Radius als Planungsgrundlage war nie durch die
  Sektor-Layouts gedeckt. → Die Wirte **quadrantenweise** wählen (pro Runde gedreht) und den Ort dorthin
  legen, wo in jedem Sektor etwas steht — hier: über den Kern in die Mitte.
  *Winkelloch im schlechtesten Sektor 212° vor dem Umbau, ≤164° danach; engstes Wirtspaar 23u, Wirte
  27–98u entfernt; Obstacle-Identitätsvergleich vor/während/nach der Phase 3/3 bestanden · 2026-08-02*

- **Ein Verdeckungs-Detektor mit einem Strahl zeigt immer auf den Fokus** — der Strahl lief die Blickachse
  hinunter; ein Okkluder am Bildrand blieb unberührt, und ein vollständig begrabener Antwortträger wurde als
  „freier Blick" gemeldet. → Einen Strahl **pro Träger**, Abnahmekriterium ist der Nullvektor über alle.
  *`plateOccl=[2 0 0 0]` bei gleichzeitig `occl=0`; zusätzlich war kein einziger Kamera-Zoomwert an beiden
  Enden sauber, womit die Kamera als Hebel messtechnisch ausschied · 2026-07-30*

- **Ein Gate auf dem Zustand zum Auslösezeitpunkt liest eine bereits zurückgesetzte Runde** — ein 260-s-Lauf
  lief über sein eigenes Rundenende hinaus, der Reset hatte den Zustand geleert, und die Live-Zählung las
  Nullen; jeder Marker fiel durch seinen eigenen „nur wenn gelöst"-Wächter. → Das Gate auf den **letzten
  Spitzenwert der Spur** legen, nicht auf den Zustand im Moment der Auslösung.
  *18 Commits mit 10 Kreuzungen im selben Lauf, veröffentlicht wurde ein grünes Lesbarkeits-Verdikt · 2026-07-31*

- **Das Brett, sein Gitter und seine beiden browserlosen Simulatoren sind weg** — galt bis 2026-08-03 als
  eigener Trigger dieser Datei. Drei Tipps hingen ausschließlich an ihm: der Zellgrößen-**Boden**, der hohe
  Bretter aus ihrer Textur laufen ließ; `linked = n/n`, das vier getrennte Rätsel als „vollständig
  verbunden" auswies, weil es pro Wort zählt statt über das Ganze; und der Parkplatz-Zweig, der acht der
  ersten neun Wörter als waagerechte Balken in Spalte 0 ablegte, weil bei Parallelabstand C eine Kreuzung
  nur für L ≤ 2C−1 existiert. Sie sind hier herausgenommen statt umgehängt: ihre Objekte gibt es nicht
  mehr, und ein Tipp ohne erreichbaren Trigger wird nicht gelesen. → Was von ihnen übertragbar bleibt, lebt
  woanders weiter: „zwei Dateien, die dieselbe Arithmetik führen, driften auseinander" als geschnittene
  statt getippte Liste in [`MEASURING-RIGS.md`](MEASURING-RIGS.md), und „eine Kennzahl, die pro Element
  zählt, beantwortet keine Frage über das Ganze" als Mengen-statt-Schwellen-Regel in
  [`SIM-GATES.md`](SIM-GATES.md).
  *Beide Simulatoren unter .shots/ gelöscht, `src/systems/Crossword.ts` 2.882 → 1.144 Zeilen
  über vier Schnitte; die Belege der drei Tipps stehen in der Commit-Historie bis `8a7326f` · 2026-08-03*
