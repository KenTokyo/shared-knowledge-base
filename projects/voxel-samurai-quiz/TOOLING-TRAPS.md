# Werkzeugfallen — voxel-samurai-quiz (AEON)

**Lesen wenn:** du ein Welt-CLI aufrufst, eine Sonde schreibst, eine `.mjs`/Shader-Datei schreibst, die SSoT-Tabelle anfasst oder committen willst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Jede Zeile hier hat mindestens einen Durchgang gekostet. Zusammen sind sie der billigste Teil der Wissensbasis.

## Tipps

### Aufruf

- **Gepiptes `world:inspect` wirkt grün** — `inspect | tail` übernimmt den Exit-Code des letzten Pipe-Glieds, während das Gate rot war; Warnungen sind ohnehin nicht gegatet. → Exit-Code unpipet sichern und den vollständigen Text lesen.
  *Ein Lauf meldete über die Pipe Exit 0 statt tatsächlich Exit 1; weitere Weltdefekte standen nur im Text · 2026-07-30*

- **Weltskript-Ausgabe verschwindet als „Binary file matches“** — NUL-Bytes lassen `grep` die Ausgabe als Binärdatei behandeln. → Vor Textfiltern `tr -d '\000'` einsetzen und mit `grep -a` lesen.
  *`grep` meldete bei vorhandener Ausgabe nur „Binary file matches“ · 2026-08-01*

- **Hintergrundsonde stirbt ohne Ausgabe** — `run_in_background` endete hier dreimal leer und sah wie ein Hänger aus. → Weltsonden im Vordergrund mit großzügigem Timeout fahren.
  *Voller 14-Zeilen-Lauf ~29 s, `--site` ~22 s; `camwall.mjs` 101 s gegen `playpass.mjs` 25 s · 2026-08-01*

### Schreiben

- **`node --check` übersieht NUL-Bytes** — die `.mjs` parst, aber ihre Ausgabe ist unbrauchbar. → Nach einem Write den Dateiinhalt binär auf Byte `0` prüfen; Ergebnis muss `-1` sein.
  *Eine Datei mit NUL bestand `node --check`, die Byte-Suche fand dennoch Index ≥0 · 2026-08-01*

- **Shader-Kommentar beendet das Template-Literal** — ein Backtick in einem Kommentar von `GrassField.js` schließt den Shader; `node --check` meldet nur `Unexpected identifier`. → Shader-Kommentare backtickfrei halten und nach jeder Änderung `node --check` fahren.
  *In P14n, P14o und P14q kostete dieselbe Falle je einen Durchgang · 2026-08-01*

- **`CameraRig.js`-Grep-Ausgabe sieht wie Quelltext aus** — das Werkzeug stellt dort `//` als `\` dar. → Aussagen über diese Datei immer gegen ein direktes `Read` prüfen.
  *Grep-Ausgabe und direkt gelesener `CameraRig.js`-Quelltext unterschieden sich an Kommentarzeichen · 2026-08-01*

- **SSoT-Tabellenzeile wird still abgeschnitten** — Leerzeilen spalten die Tabelle; ein unescaptes `|` beendet eine Zelle. → Fließtext-Pipes als `\|` schreiben und pro `| P…`-Zeile vier unescapte Trenner zählen; nicht mit awk/sed/perl.
  *Die P15b-Zeile verlor beim Rendern unbemerkt rund 3 400 Zeichen · 2026-08-01*

### Artefakte und Git

- **Probe-Auswertung mischt alte und neue Frames** — überschriebenes `review/probe/` plus liegen gebliebene Prefix-PNGs verfälschen den aktuellen Sweep. → Beleg vorab sichern und jeden Lauf in einen leeren, laufgescopten Pfad schreiben.
  *Alte Prefix-Frames verfälschten die PH18-Tabellen und mussten nachträglich getrennt werden · 2026-07-31*

- **`git checkout` als Messungs-Undo** — eine Gegenmessung überschreibt fremde oder ungetrackte Arbeit, die im betrachteten Diff fehlen kann. → Ziel-Datei nach `.tmp/` sichern, gezielt zurückschreiben und danach byte-identisch diffen.
  *`src/engine/`, `scripts/world/`, `scripts/engine/`, `public/aeon-world/` und `vite.aeon.config.js` lagen beim Gegenmessungsfall außerhalb des Diffs · 2026-08-01*
