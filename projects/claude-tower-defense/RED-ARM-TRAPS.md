# Rote Arme und Exit-Codes — claude-tower-defense

**Lesen wenn:** du die `--bad`-Arme, Exit-Codes oder Selbstprüfungen einer Sonde baust oder abnimmst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Gegenstück: [`INSTRUMENT-TRAPS.md`](INSTRUMENT-TRAPS.md) für das Deuten einer gelieferten Zahl.

- **Fehlerarme als paarweise `if`s** — 3 Familien×4 Modi, nur 5/12 geprüft; fehlendes Paar bleibt grün oder meldet anderes. → Erreichbarkeitstabelle; Arme/Ablehnung daraus ableiten.
  *D66: `--cullgate --bad still` PASS/0 unter „SUPPOSED TO DIE“ · 2026-08-01*

- **Modusschalter liest nur `argv[0]`** — roter Arm als zweites Argument bleibt PASS; Aritätsprüfung in einem von sechs Zweigen. → Eine Vorprüfung aller Zweige aus Modus→Parameter-Tabelle.
  *D67; Tippfehler `--bad profil` bewies falschen Arm · 2026-08-01*

- **Exit 2 verwechselt Ablehnung, Wächter und Crash** — Liste abgewiesener Läufe belegt nur Argumentprüfung; Boot-Timeout kann gleich aussehen, Filterblock leer. → Meldung statt Code; Argument=2, Wächter=1; guter Lauf plus je Arm eigene Meldung; Filter matcht `***`/Stacktrace, null Treffer druckt Rohende; rote Balken zählen.
  *D73: 6 Arme, 5 rote Balken; sechster Crash. D66–D71 mehrfach Ablehnung/Wächter verwechselt · 2026-08-01*

- **Rote Arme veralten oder röten doppelt** — Build holt Sabotage ein; geteilter Wert triggert zwei Gates. → Nach Wächteränderung Arme zählen; Sabotage auf eigene Kopie; Soll je Arm exakt ein Balken.
  *D73 `--bad basis` riss Lichtachse und Bodenprüfung; D65 druckte Defekt in Nachbarspalte · 2026-08-01*

- **Selbstprüfung feuert immer oder nie** — AABB=rotierte Vertex-AABB forderte falsche Gleichheit (42/42 rot); separat sortierte Arrays wurden positionsweise verglichen (immer grün, fremde Elemente). → Richtige Relation, hier Containment, statt Toleranz; Invariante vor Aggregation; jede Prüfung einmal rot.
  *D71: 42/42→grün über 10.470 Instanzen; zweite vorher grün über nichts, danach 11.426 Tris · 2026-08-01*

- **Zustand gesetzt ist nicht Zustand aktiv** — Sonde schreibt `phase='combat'` und druckt „in combat"; der Messcode läuft **vor** dem Besitzer im selben Step und die Phase verlässt sich bei leerer Queue selbst, also maß 5 von 6 Öffnungen die falsche Phase und der rote Arm kam **grün** zurück. → Bei jedem Messaufruf den **tatsächlich gesehenen** Zustand mitschreiben und judgen, nie den angeforderten; dem Zustand seine fehlende **Bedingung** geben (nie fälliger Queue-Sentinel) statt ihn pro Step neu zu pinnen — ein Re-Pin zahlt Nebenwirkungen in dieselbe Börse, die eine Nachbarregel liest.
  *D111: `--bad frozen` exit 0 = PASS mit Zahlen identisch zum gesunden Lauf; Ursache `Game.js:273` + `Director.js:664` · 2026-08-03*

- **Beleg älter als Datei** — Tool nach Beleglauf dreimal geändert. → Beleg nach letztem Edit; Exit je Arm statt alter Prosa.
  *13 Arme neu: 13/13 erwartet · 2026-08-01*
