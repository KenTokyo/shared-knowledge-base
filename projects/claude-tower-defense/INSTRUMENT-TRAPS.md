# Messgerät und Gates — claude-tower-defense

**Lesen wenn:** du ein Gate, einen Wächter, einen roten Arm oder eine A/B-Klammer schreibst, änderst oder
zitierst — oder wenn ein Test grün ist und du daraus etwas schließen willst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Driftkontrolle prüft nur die Enden der Klammer** — A → B → A meldet `0.8 % drift` und darunter steht
  `Δ frame: +5.75 ms` für **−532 480 Dreiecke**. Ursache: `drift = |A − A'| / base` — das B-Bein kommt in der
  Formel nicht vor, also zertifiziert die Klammer genau den Zeitraum, in dem sie nicht gemessen hat.
  → Das B-Bein mitlesen und auf **unmögliche Vorzeichen** prüfen: weniger Geometrie und mehr Zeit ist die
  Maschine, nicht der Build.
  *D68: zwei `RESULT: PASS` mit `+8.85 ms` für −892 320 Dreiecke bzw. `+5.75 ms` für −532 480 · 2026-08-01*

- **Der neue Wächter brüllt im Normalfall** — die erste Fassung genau dieses B-Bein-Prüfers feuerte in voller
  Lautstärke für eine Schicht mit **0.15 ms**, wo das Vorzeichen ehrlich ein Münzwurf ist. Ein Banner, das
  jeden zweiten Lauf trifft, wird gelesen und dann übersprungen. → Urteil **stufen**: laut nur, wenn das
  Vorzeichen unmöglich **und** der Betrag zitierfähig ist; sonst leise.
  → Und den **grünen** Kontrolllauf fahren, nicht nur den roten — hier hat nur er es gefangen.
  *D68, Positivkontrolle: 2 laut / 2 leise, der gesunde Fall bleibt still · 2026-08-01*

- **Gate nennt seinen Umfang nicht** — Kopfzeile `14 probes checked`, grün, und die Zahl ist **wahr**. Der
  Korpus wurde über zwei Bezeichner gewählt; wer einen dritten benutzte, lag still außerhalb — darunter das
  Screenshot-CLI des Projekts. → Die Ausgabe soll die **Namen** drucken, nicht nur die Anzahl, und die Zahl
  einmal unabhängig gegen alle Kandidatendateien rekonziliert werden.
  *D69: 15 im Korpus − 1 benannte Ausnahme = 14 gedruckt; nach dem Fix 16 · 2026-08-01*

- **Erreichbarkeit von Fehlerarmen als paarweise `if`s** — 3 Familien × 4 Modi = 12 Paare, geprüft waren 5.
  Eine fehlende Paarung erzeugt **kein** Fehlerbild: der Lauf kommt grün zurück oder wird mit der Meldung
  eines **anderen** Paares abgewiesen. → Erreichbarkeit in eine **Tabelle**, die Arme daraus **ableiten**, und
  die Ablehnung beide Hälften aus derselben Tabelle drucken lassen.
  *D66: `--cullgate --bad still` kam `RESULT: PASS`, exit 0 unter „THIS RUN IS SUPPOSED TO DIE" · 2026-08-01*

- **Eine Liste abgewiesener Läufe belegt die Argumentprüfung, nicht die Wächter** — und die Verwechslung ist
  hier viermal passiert. `exit 2` ist auch der Code einer **abgewiesenen Argumentzeile**: ein Arm, der an der
  Argumentprüfung stirbt, sieht im Log genauso aus wie einer, der seinen Defekt gefunden hat. → Immer die
  **Meldung** lesen, nie den Code; Argumentzeile (2) und Wächter (1) im eigenen Werkzeug strikt trennen; und
  der Beweis ist der **gesunde** Lauf daneben, der unverändert durchkommt, **plus** je **ein** Arm mit
  **eigener** Meldung.
  *D66 (nach einem exit-1-Vorfall zwei Phasen früher) · D67 · D68 · und in D71 nochmals: 5 Ablehnungen und
  4 Wächter mit je eigener Meldung, getrennt protokolliert · 2026-08-01*

- **Modusschalter liest nur `argv[0]`** — `tool --table --bad` trägt einen roten Arm und meldet `RESULT: PASS`,
  exit 0, weil der Arm als zweites Argument steht. Die einzige Aritätsprüfung lag **innerhalb** eines
  Modus-Zweigs und schützte damit genau einen von sechs Modi. → **Eine** Prüfung **vor** allen Zweigen, aus
  einer Tabelle Modus → Parameter; eine Prüfung im Rumpf eines Zweigs sieht per Bauart nur die Läufe, die
  diesen Zweig erreichen.
  *D67, in einem Gate · ein Tippfehler (`--bad profil`) bewies dabei den falschen Arm · 2026-08-01*

- **Rote Arme sterben still, wenn der Build sie einholt** — beide `--bad`-Arme einer Sonde kamen drei Phasen
  lang **grün** zurück: der eine zeigte auf einen zurückgezogenen Wächter, der andere auf die Gleichheit
  `hi === 0`, die unerreichbar wurde, als der Build selbst zu cullen anfing. → Wer einen Wächter zurückzieht,
  zählt die roten Arme, die auf ihn zeigen; ein Arm, der **immer** rot ist, ist so wertlos wie keiner.
  *D65: der grüne Lauf druckte den Defekt in der Spalte **neben** der geprüften (Anteil −110.2 %) · 2026-08-01*

- **Ein Gate deckt einen Codepfad nur so weit, wie es ihn betritt** — zwei Berichtsmodi waren drei Phasen tot,
  und das Gate darüber war grün: es ruft dieselbe Funktion, aber mit `N === 0`, und die kehrt **vor** der
  Zeile zurück, die stirbt. → Die geteilte Kopie (eine Formel, ein Ort) schützt gegen *Auseinanderlaufen*,
  nicht gegen *Absterben*. Wer einen Modus anfasst, fährt **ihn**, nicht das Gate daneben.
  *D63 · 2026-08-01*

- **Ein Beleg, der älter ist als die Datei, ist kein Beleg** — nach dem Beleglauf wurde das Werkzeug noch
  dreimal geändert; zwei Meldungstexte waren danach andere. → Beleglauf **nach** der letzten Änderung
  wiederholen, und im Zweifel den Exit-Code jedes Arms vergleichen statt den Fließtext.
  *13 Arme neu gefahren, 13/13 wie erwartet — der Aufwand war ein Skriptaufruf · 2026-08-01*

- **Auch die BEGRÜNDUNG ist eine Behauptung** — zwei Sätze aus einer frisch geschriebenen Defektakte fielen,
  als jemand sie ausführte: „beide Parameter sind Pflicht" (beide sind optional) und „diese Zeile weist
  `banana` ab" (sie hält in Wahrheit den argumentlosen Gate-Aufruf am Leben — ohne sie stirbt das Gate mit
  `TypeError`). → Eine Akte ist fertig, wenn ihre **Belege gefahren** sind, nicht wenn ihre **Sätze plausibel**
  klingen.
  *gemessen mit vier Läufen bzw. einer gelöschten Zeile in einer Wegwerf-Kopie · 2026-08-01*

- **Eine Selbstprüfung ist auf zwei Weisen wertlos, und beide sehen im Code richtig aus: sie feuert IMMER,
  oder sie kann NIE feuern.** Zwei Fälle in einer Sonde, beide vor der ersten gedruckten Tabelle gefangen.
  (1) **Feuert immer:** eine Kontrolle forderte **Gleichheit** zweier Wege — Bounding-Box gegen jeden echten
  Vertex — und schlug bei **42 von 42** Sorten an. Sie hatte recht; falsch war die **Prämisse**: die AABB
  eines **rotierten** Körpers ist notwendig **größer** als die AABB seiner rotierten Vertices. Eine Prüfung,
  die überall feuert, wird abgeschaltet und nimmt die echten Funde mit. (2) **Kann nie feuern:** eine
  Invariante verglich zwei Arrays an derselben Stelle, **nachdem beide unabhängig sortiert worden waren** —
  dort beschreiben sie nicht mehr dasselbe Element. Grün, jeden Lauf, ohne je etwas geprüft zu haben.
  → Bei (1) fragen, welche Relation wirklich gilt, und auf **die** umbauen (hier: Containment, oberer Weg
  gegen Messweg) — **nicht die Toleranz aufweichen**. Bei (2) die Invariante **an der Stelle prüfen, an der
  das Element noch bei seinen Daten steht** — in der Schleife, nicht nach der Aggregation. Und: **jede
  Selbstprüfung einmal rot gesehen haben**, sonst weiß niemand, in welchem der beiden Zustände sie ist.
  *D71: Prüfung (1) rot auf 42/42, nach dem Umbau grün über 10 470 Instanzen; Prüfung (2) grün über 11 426
  Dreiecke — vorher grün über nichts · 2026-08-01*

- **Eine neue Sonde liest einen Puffer zuerst in der falschen Körnung oder zur falschen Zeit — und beides
  sieht aus wie ein Ergebnis.** Zwei Fälle am selben Tag, beide von den eigenen Selbstprüfungen gefangen,
  **bevor** die erste Tabelle gedruckt war. (1) **Falsche Körnung:** nicht jeder Eintrag in
  `geometry.attributes` ist je-Vertex — instanzierte Attribute haben als `count` die **Instanzzahl**, und mit
  einer Vertexnummer indiziert laufen sie über das Array; die Sonde las `undefined` und verglich es als
  `NaN`, an 14 Geometrien gleichzeitig. (2) **Falsche Zeit:** ein je Frame neu geschriebener Puffer steht beim
  Boot auf Null, also sind alle seine Vertices identisch — das las sich als **Faktor 1344**, das größte
  Verhältnis der ganzen Tabelle, und war ein leerer Puffer. → Attribute **explizit** in je-Vertex, je-Instanz
  und *unklar* einteilen, und *unklar* ist **Abbruch**, kein Achselzucken; dynamische Puffer **namentlich**
  unter der Tabelle ausweisen statt still zu überspringen. ⚠ Und der erste Filter dagegen war selbst zu grob
  und setzte fünf Meshes wegen **je-Instanz**-dynamischer Attribute beiseite — **dynamisch zählt nur, wenn es
  je-Vertex ist.**
  *die Weld-Kontrolle fing (1) erst, nachdem sie sagen konnte WAS abweicht statt nur „Ecke 25" · 2026-08-01*
