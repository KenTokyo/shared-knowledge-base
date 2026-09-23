# Sound mit ElevenLabs — verbindliche Regeln

Gilt für jedes Projekt, das Soundeffekte über die ElevenLabs-Text-to-SFX-API erzeugt.
Der Grund für diese Datei ist eine Zahl: **9.024 Credits** sind in zwei Projekten für
Stems ausgegeben worden, die nach dem ersten Hören gelöscht wurden. Kein einziger
davon war technisch fehlerhaft. Jede Regel unten ist die Umkehrung eines bezahlten
Fehlers.

---

## 1. Die Aufrufparameter

| Feld | Wert | Warum genau der |
|---|---|---|
| Modell | `eleven_text_to_sound_v2` | |
| `prompt_influence` | **0,45–0,7 für Kandidaten**, 0,75–1 nur für eingefrorene, wörtliche Produktion | Der ElevenLabs-Skill empfiehlt moderate Bindung für kreative Kandidaten. Influence 1 machte wiederholte Vollsätze technisch konsistent, half aber nicht bei der Suche nach einer guten Richtung. |
| `output_format` | `mp3_44100_192` | Reicht für Runtime-Einschläge; WAV vervierfacht die Auslieferungsgrösse ohne hörbaren Gewinn |
| Dauer | **0,5–1,0 s je Hero-Beat** | Aktuelle Nutzervorgabe. `0,5` ist zugleich das **gemessene API-Minimum**: `0,2`, `0,3` und `0,4` werden mit HTTP 400 abgelehnt, nicht aufgerundet. |

**Länger ist nicht besser, sondern nur teurer.** Der Versuch, die API-Maximaldauer von
30 s zu nutzen, damit das Modell „Anlauf hat", kostete 6.930 Credits für achtzehn
Dateien — das Zwanzigfache je Stem für Material, von dem im Spiel ohnehin nur ein
Ausschnitt zu hören gewesen wäre. Fülle kommt aus dem **Stapel** (mehrere kurze Rollen
versetzt übereinander), nicht aus der Länge einer einzelnen Datei.

## 2. Die Promptform

Vier Abschnitte, in dieser Reihenfolge:

```
Magical fantasy heavy mortar shell impact.          <- Kopf: Keyword, Objekt, Rolle
A burning shell arcs high and drops into the ground. <- Spell: was passiert
Molten slag slams into rock, deep boom with a sharp crack, brimstone shards spray.
                                                     <- Ereignisliste: was zu hören ist
Cinematic fantasy RPG fire magic, punchy and dry, game sfx, no music, no voice.
                                                     <- Tagzeile: Rahmen und Ausschluss
```

- **Keyword-Kopf.** Jeder Prompt beginnt mit dem Genre-Keyword (`Magical fantasy`,
  `Fantasy magical`, `Dark sorceress`, …). Eine nüchterne Materialliste holt aus dem
  Modell Feldaufnahmen; derselbe Stoff unter einem Fantasy-Rahmen holt das, was neben
  einem VFX steht.
- **Der Spell-Satz** nennt **eine** Handlung mit Anfang und Ende. Nicht zwei, nicht
  eine Eigenschaft.
- **Die Ereignisliste** ist eine Kommaliste aus **Geräuschen mit Quelle**
  (`deep boom with a sharp crack`), nicht aus Stimmungswörtern (`epic`, `beautiful`,
  `powerful atmosphere`). Ereignisse haben einen Anschlag, Stimmungen haben keinen.
  Das ist der Unterschied zwischen einer guten und einer teuren Kommaliste.
- **Die Tagzeile** steht am Schluss und trägt die Negativliste: mindestens
  `no music, no voice`, je nach Fall `no weapon sound`, `no metal`, `no words`. Sie ist
  der billigste Filter der ganzen Kette — ein untergelegter Streicherakkord oder ein
  gehauchtes Wort macht einen Stem unbrauchbar und kostet trotzdem vollen Preis.
  Am Ende, nicht am Anfang: die letzten Wörter sollen ausschliessen, die ersten sollen
  das Bild setzen.
- **Wortdeckel: rund 50** (aktuell 52). Je länger der Prompt, desto dünner wird jedes
  einzelne Wort darin. Teildeckel je Baustein setzen, sonst frisst ein Abschnitt den
  ganzen Deckel — im Zweifel den Deckel senken, nicht heben.

## 3. Die Schichtung — ein Cast ist eine Kette, kein Klang

Ein Zauber wird nicht als eine Datei bestellt, sondern als **Beats**, die der Director
versetzt übereinanderlegt:

| Beat | Dauer | Was er trägt |
|---|---|---|
| `charge` | 1,0 s | Aufbau vor dem Auslösen |
| `cast` | **0,5 s** | Nur der **Druckpunkt** des Auslösens |
| `flight` | 1,0 s | Das Projektil unterwegs, geschnitten beim Einschlag |
| `impact` | 1,0 s | Der Treffer |
| `tail` | 1,0 s | Was danach kurz ausklingt |

- **Der Cast ist nur der Druckpunkt.** Sein Prompt endet auf `instant, no tail` und
  beschreibt **einen** Anschlag. Ein Cast, der auch Flug und Einschlag beschreibt,
  liefert einen vollständigen Zauber in 0,5 s — und dann spielt der Director drei
  vollständige Zauber gleichzeitig. Das ist der Fehler, den man am Bericht nicht sieht:
  jede Datei ist einzeln gut und der Stapel ist Brei.
- **Der Flug ist ein eigener Beat, keine Verlängerung des Cast.** Er startet nach dem
  Auslösen, läuft während der Flugzeit und wird beim Einschlag mit einer kurzen Rampe
  (~60 ms) abgeschnitten — hart geschnitten klickt es, ausgeblendet matscht es in den
  Impact. Wer den Flug in den Cast packt, bekommt bei kurzer Reichweite einen Nachhall
  hinter dem Treffer. Für variable Flugzeiten loopt ausschließlich die gleichförmige
  Body-Lage mit beschnittenem Start/Ende; Charge bleibt einmalig, sonst pumpt ihr
  Aufbau bei jeder Wiederholung.
- **Eine Salve hat ein gemeinsames Flugbett.** Weitere Projektile erhöhen nur einen
  `airborne`-Zähler; der erste Einschlag darf den Flug der übrigen Geschosse nicht
  abschneiden. Erst der letzte Einschlag beendet das Bett. Läuft es von selbst leer,
  setzt der nächste Schuss den Zähler neu, damit ein verlorener Impact die Sitzung
  nicht dauerhaft stumm macht.
- **Jeder Beat bekommt einen eigenen Bus** und die Regler des Editors lesen ihre
  Ausgangswerte **aus dem Director**, nicht aus einer zweiten Liste in der UI. Ein
  Regler, der 0,9 anzeigt, während der Bus auf 0,62 steht, ist schlimmer als kein
  Regler: man dreht ihn hoch und hört es leiser werden.

### Das Material gehört zum Skill, die Lesart zur Richtung

Die Ereignisliste (§2) hängt am **Cue** — am Skill —, nicht an der Richtung. Eine
Richtung trägt nur ihren **Stil-Tag** (`Anime RPG dark magic spell, crimson occult
bell, eldritch`).

Der Grund: Ein Mörsergeschoss ist in jeder Lesart ein Mörsergeschoss. Hängt die
Ereignisliste an der Richtung, dann beschreiben alle fünf Rollen eines Skills dasselbe
Material — und derselbe Skill klingt in zwei Richtungen nach zwei verschiedenen
Objekten. Hängt sie am Cue, bleibt das Objekt gleich und nur die Lesart wechselt: das
ist genau das, was ein A/B-Vergleich zwischen zwei Richtungen zeigen soll. Ein
Nebeneffekt, der die Kosten senkt: die Ereignislisten werden **einmal** je Skill
geschrieben und geprüft, nicht einmal je Skill × Richtung.

## 4. Wortsperren

- **Dämpfungswörter** (`soft`, `gentle`, `controlled`, `subtle`, `delicate`, `muted`,
  `smooth`, `silky`) in Einschlags- und Abschussrollen: verboten. Eine Detonation, die
  aus „gentle attack" erzeugt wird, **kann** nicht knallen — das wird danach
  fälschlich als Mischfehler gesucht.
- **Dauerklang-Substantive** (`hum`, `whine`, `wash`, `hiss`, `shimmer`, `drone`,
  `swell`, `bloom`, `resonance`, `harmonic`, `spectral`, `ambience`) in Transienten:
  verboten. Sie beschreiben etwas, das anhält, wo etwas anschlagen muss. In `charge`
  und `tail` sind sie richtig.
- **Materie statt Begriff.** Jedes Wort benennt Stoff, der Masse hat und eine Art zu
  brechen. Für „Stein auf Stein" hat das Modell Material, für „spectral bloom" fast
  keines.
- Wortsperren gehören an die **Rolle**, nicht an die Promptform, und sie gelten auch
  für Bausteine, die in *jede* Rolle wandern (Stil-Tags, gemeinsame Sätze). Genau dort
  wandert ein „resonant" unbemerkt in achtzig Prompts.

## 5. Der Ablauf — kein bezahlter Aufruf ohne diese vier Schritte

1. **Guard.** Jeder fertige Prompt wird aus seinen Bausteinen **neu gebaut** und
   bytegleich verglichen; dazu Wortsperren, Deckel, Dauer, Form. Läuft **vor** dem
   Dry-Run. Ein Prompt, den der Guard nicht rekonstruieren kann, kostet nichts; nach
   dem API-Aufruf entdeckt kostet er den ganzen Lauf.
2. **Dry-Run.** Zählt gesamt / vorhanden / veraltet / ausstehend und schätzt die
   Credits. Diese Zahl wird gelesen, bevor irgendetwas läuft.
3. **Budget-Gate.** Kontostand abfragen und gegen die Schätzung prüfen. Bricht ab,
   wenn das Guthaben nicht reicht — ein Lauf, der auf halber Strecke an Credits
   scheitert, hinterlässt eine halb bezahlte Richtung.
4. **Erzeugen**, dann Manifest und Bericht schreiben.

**Fingerabdruck statt Zeitstempel.** Jede Datei trägt einen Hash aus Policy-Version,
Id, Prompttext, Dauer, Influence, Modell und Format. Passt er nicht, gilt sie als
*veraltet* und nicht als vorhanden. Eine Bibliothek aus zwei Policy-Ständen sieht auf
der Platte genauso aus wie eine aus einem, klingt aber nicht so.

**Die Policy-Version steigt nur, wenn sich Text oder Dauer einer *bestehenden* Datei
ändert.** Eine Richtung hinzuzufügen ist kein Grund — ein unnötiger Bump meldet den
ganzen bezahlten Bestand als veraltet.

**`--force` nie ohne `--direction=`.** Global gesetzt markiert es jede bezahlte Datei
als neu zu erzeugen.

## 6. Provenienz und No-Go-Liste

- Jede bezahlte Datei bekommt einen Provenienzeintrag (Prompt, Dauer, Modell, Kosten,
  Datum, Hash). Ohne ihn ist nach zwei Runden nicht mehr belegbar, wofür bezahlt wurde.
- Eine verworfene Richtung wird **als Datenzeile** eingetragen (Id, Label, Urteil,
  Ursache, Stems, Credits) — nicht als Prosa in einer Doku. Der Guard liest diese Liste
  und **verweigert** Id und Label ein zweites Mal. Wer eine wiederbeleben will, trägt
  sie dort aus, und dann steht es in der Diff.
- Jede Löschung schreibt ihre Ursache als **maschinell geprüfte Regel** fort. Eine
  Regel im Markdown ist eine Bitte, eine Regel im Guard ist eine Bedingung.

## 7. Hero-Kandidaten vor jeder Bibliothek

Bei ungeklärter Prompt-Richtung zuerst **drei bis sechs Kandidaten für einen konkret
fehlerhaften Hero-Skill** erzeugen. Pro Kandidat nur ein bis zwei Achsen verändern,
etwa Materialfarbe, Transientenschärfe oder Mikrofonperspektive; Modell, Rolle, Dauer,
Format und Mix bleiben gleich. Erst ein menschlich gewählter Gewinner darf auf eine
Gruppe skaliert werden. Das folgt dem installierten ElevenLabs-Skill und verhindert,
dass 75 Stems dieselbe ungeklärte Richtung nur teurer wiederholen.

Verworfene Kandidaten nicht blind vernichten: aus der aktiven Runtime entfernen und
mit Provenienz archivieren. Sie bleiben Referenzmaterial und können später einzelne
Lagen liefern, ohne erneut Credits zu kosten.

Ein Regenerate-Button darf den API-Key nie in den Browser holen. Ein lokaler,
loopback-gebundener Node-Helfer nimmt nur allowgelistete Pack- und Skill-Ids an, führt
Guard und Budget-Gate aus und ersetzt danach den Audio-Cache unter stabilen Namen.
Jeder Klick braucht eine sichtbare Kostenbestätigung.

## 8. Zuschnitt: lieber ein Hero als fünf Skills, lieber fünf als zwanzig

Eine neue Richtung beginnt mit einem Hero-Skill. Nach dessen Hörfreigabe folgt eine
kleine, verwandte Gruppe (etwa fünf Skills), nicht die ganze Bibliothek. Fünf lassen
sich in einem Durchgang hören und beurteilen, zwanzig nicht. Zwei Richtungen über je
zwanzig Skills kosteten zusammen 3.932 Credits, bevor sie zum ersten Mal jemand
gehört hatte — und waren dann beide unbrauchbar. Enger schneiden heißt früher hören.

## 9. Was kein Werkzeug ersetzt

Vollständigkeit, Provenienz, Länge, Balance und Wortsperren sind prüfbar. **Gestalt
nicht.** Jede der bisher gelöschten Richtungen war grün im Bericht. Gefunden hat sie
jedes Mal ein Ohr — ein Lauf gilt erst als abgeschlossen, wenn ein Mensch ihn gehört
hat.
