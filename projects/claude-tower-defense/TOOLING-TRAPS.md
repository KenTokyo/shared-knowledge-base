# Werkzeugfallen — claude-tower-defense

**Lesen wenn:** Prüfreihe, Sonde, Beleg oder skriptbasierter Notiz-Edit.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **zsh splittet Variable nicht wie bash** — `node tool.mjs $c` mit `c="--yawband --bad still"` übergibt ein Argument; gesunder Lauf Exit 0. → Prüfreihe als Skript mit echten argv-Arrays.
  *5 Läufe verdreht; nur Argumentprüfung fing es · 2026-08-01*

- **`grep -c $'\x00'` als NUL-Scan** — zsh macht leeres Muster; Ausgabe = Zeilenzahl. → Node `(src.match(/\0/g)||[]).length` plus `node --check` nach jedem Tool-Edit.
  *Ein Fehlalarm; Editweg hatte einmal echtes NUL · 2026-08-01*

- **Exit hinter Pipe** — `node tool | tail` liefert `tail`-Code. → `cmd >log 2>&1; echo EXIT=$?`; danach Log lesen.
  *Mehrfach · 2026-08-01*

- **`| head` tötet Sonde, Ordner wirkt vollständig** — EPIPE lässt alte Bilder liegen; Diff erscheint als Befund. → Bildsonden nie pipen; Logdatei, Nullkontrolle, mtimes.
  *10 Posen bis 8,09 % gegen Stand; Dateien 16 h auseinander. Frisch 38/38 bitgleich · 2026-08-01*

- **Deutsche Anführungszeichen brechen Python-Heredoc** — `„…"` beendet String. → Text per Dateitool nach `/tmp`, `io.open`+`replace`; alternativ Node `fs`.
  *Einmal in 1.600-Zeilen-Notiz · 2026-08-01*

- **Regex-Behauptungsedit ohne Trockenlauf** — Match endet in Backticks oder verschluckt Folgesatz. → Auf Verzeichniskopie; jede eindeutige Ersetzung listen/prüfen, dann schreiben.
  *52 Stellen/26 Dateien; Kontrolle „geänderte Zeilen ohne Stichwort=0“ · 2026-08-01*

- **Belege nur in `/tmp`** — Neustart löscht gesamte Evidenz. → Zahl plus Dateiname in Akte, nicht nur Pfad.
  *Einmal fehlte genau Nullkontrolle für drei Diffs · 2026-08-01*

- **Symlink im `/tmp`-Wegwerfbaum** — `rm -rf` kann echtes `node_modules` treffen. → Symlink vor Löschen entfernen oder keine solche Kopie.
  *2026-08-01*

- **Leere DOM-Selektoren melden PASS** — umbenanntes `.hud-gate*`→`.hud-quiz*`; `null` formatiert leer statt Fehler. → Existenzprüfung je Block; nach Markup-Edit Szenario fahren, wo Element existieren muss.
  *`hud.mjs`: 17 Szenarien PASS mit allen Quizfeldern `null`; Bild entlarvte Fremd-HUD · 2026-08-02*

- **Maschinenuhr kleiner als gesuchter Effekt** — Nullbuild 11,90–24,60 ms (×2,07), Ziel 0,3–1,0 ms. → Deterministische Tris/Calls/Instanzen plus Bilder; Rauschboden vor Ranking.
  *6/8 Klammern über eigener Driftgrenze · 2026-08-01*

- **Urteil fällt aus dem behaltenen Fenster** — Prüfreihe behält je Sonde nur die letzten N Zeilen, das Detail steht am **Kopf** der Ausgabe; archiviert wird `regel 0` ohne die Zahl, die es belegt — ununterscheidbar von genau dem Defekt, den die Regel verbietet. → Vor dem Eintrag `head -$N | tail -N` gegen die echte Ausgabe fahren; kritische Reconciliation **über** der Zählzeile wiederholen; Platz durch Trennleerzeilen zwischen Bahnen derselben Regel holen, nie durch Inhalt.
  *D111: `_d106` druckte 26 Zeilen bei KEEP=20, Phasennachweis und `cadence`-Detail fielen heraus · 2026-08-03*

- **Der Kopf eines Werkzeugs verspricht Dateinamen, die es nie schreibt** — `# writes /tmp/phNN-{gates.log,time,exit,done}`: Brace-Expansion verteilt das **Präfix**, also entstehen drei der vier Namen nie — darunter der `.done`-Marker, auf den derselbe Kopf zu warten befiehlt. Eine Wartebedingung unter falschem Namen misst nichts falsch, sie **kehrt nicht zurück**. → Wartebedingung immer aus der **schreibenden Zeile** ziehen, nie aus dem Kommentar; Namenslisten per `bash -c 'echo …'` expandieren statt lesen; und eine einmal gefundene Namensfalle **in die Quelle patchen, nicht in die Phasennotiz** — Notizen gelten für eine Schicht und werden beim Übergeben neu zusammengefasst, die Quelle erreicht die nächste Schicht ungefragt.
  *D112: PH15 fand es, bezifferte es mit „zwei Warter gekostet" und schrieb es nur in seine Notiz; neun Phasen später übergab PH24 `until [ -f /tmp/ph51-done ]`, eine Schleife, die nie zurückkehrt. PH15s eigener Beleg `fullrun.sh:175` löste nie auf — die Datei hat seit ihrem einzigen Commit 135 Zeilen · 2026-08-03*
