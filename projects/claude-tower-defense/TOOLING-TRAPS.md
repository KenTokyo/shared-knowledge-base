# Werkzeugfallen — claude-tower-defense

**Lesen wenn:** du eine Prüfreihe schreibst, eine Sonde änderst, einen Beleg ablegst oder eine Notizdatei
per Skript bearbeitest.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **zsh teilt unquotierte Variablen nicht in Wörter** (anders als bash) — eine Prüfschleife der Form
  `for c in "--yawband --bad still"; do node tool.mjs $c; done` übergibt **einen einzigen Argumentstring**.
  Das Flag wird nicht erkannt, es läuft ein voller, gesunder Lauf, und `exit 0` sieht aus wie eine bestandene
  Prüfung. → Prüfreihen als **Skript mit echten argv-Arrays**, nie als Schleife über `$var`.
  *fünf Läufe still verdreht; gefangen hat es nur die Argumentprüfung des Werkzeugs · 2026-08-01*

- **`grep -c $'\x00'` als NUL-Scan** — in zsh kollabiert das Muster zum **leeren** Muster, und das matcht jede
  Zeile: die Ausgabe ist die **Zeilenzahl** und liest sich als „tausende NUL-Bytes". → Den Scan über node
  fahren (`(src.match(/\0/g) || []).length`), zusammen mit `node --check`, nach **jeder** Werkzeugänderung.
  *ein Fehlalarm; der Edit-Weg hatte in derselben Schicht tatsächlich einmal ein NUL eingeschleust · 2026-08-01*

- **Exit-Code hinter einer Pipe gelesen** — `node tool.mjs | tail` liefert den Code von `tail`. Bei einer
  Sonde, deren ganze Aussage im Exit-Code steht, ist das die Aussage selbst. → `cmd > log 2>&1; echo "EXIT=$?"`,
  und die Ausgabe danach aus der Datei lesen.
  *mehrfach · 2026-08-01*

- **`| head` tötet die Sonde mitten im Lauf — und das Ausgabeverzeichnis sieht danach vollständig aus** —
  `head` schließt die Pipe nach n Zeilen, die Sonde stirbt an EPIPE, und im Zielordner stehen die restlichen
  Bilder **noch aus einem früheren Lauf**. Der anschließende Vergleich meldet dann Abweichungen, die wie ein
  Befund aussehen: hier zehn Posen gegen den geltenden Stand, bis 8.09 % Pixel — **beinahe als „die
  Referenz ist veraltet" gebucht.** → Bildsonden **nie** in eine Pipe; in eine Datei umlenken. Und beim
  kleinsten Zweifel die **Nullkontrolle** fahren (zweiter frischer Lauf gegen den ersten) sowie die
  **Zeitstempel** der abweichenden Dateien ansehen — sie lagen 16 Stunden auseinander.
  *Nullkontrolle: sauberer Lauf gegen den geltenden Stand 38/38 bit-identisch, also war nicht die Referenz
  falsch, sondern der eigene Aufruf · 2026-08-01*

- **Deutsche Anführungszeichen sprengen python-Heredocs** — `„…"` enthält ein ASCII-`"`; ein
  `python3 - <<'EOF'` mit `"…"`-Stringliteralen bricht mitten im Text. → Den Text mit dem Datei-Werkzeug nach
  `/tmp` schreiben und per `io.open(...).read()` einlesen, dann `str.replace(anker, neu + anker, 1)`.
  Oder gleich in node mit `fs.readFileSync`.
  *einmal mitten in einer 1600-Zeilen-Notizdatei · 2026-08-01*

- **Ein Skript, das eine Behauptung per Regex ersetzt, muss vorher trocken laufen** — die naive Fassung
  schnitt an einem Punkt, der **innerhalb** von Backticks stand (`find . -iname X.md`), und eine zweite
  Fassung verschluckte den gültigen Folgesatz. → Erst über eine **Kopie** des Verzeichnisses fahren, dann
  jede erzeugte Ersetzung **eindeutig auflisten** und ansehen, dann schreiben. Zwei Durchgänge, beide Fehler
  gefunden, bevor eine echte Datei angefasst wurde.
  *52 Stellen in 26 Dateien; die Kontrolle „geänderte Zeilen ohne das Stichwort = 0" kostet eine Zeile · 2026-08-01*

- **`/tmp` überlebt keinen Neustart, und dort liegen die Belege** — eine Schicht kann ihre gesamte
  Beweislage verlieren, ohne dass eine Datei im Repo sich ändert. → Die **Zahl** und den **Dateinamen** in die
  Akte schreiben, nicht nur den Verweis; ein Beleg, der nur als Pfad existiert, ist eine Wette auf die Uptime.
  *und einmal fehlte ausgerechnet die Nullkontrolle, gegen die alle anderen drei Diffs gelesen werden · 2026-08-01*

- **Symlink in einem Wegwerf-Verzeichnis unter `/tmp`** — die Wegwerf-Kopie einer Sonde braucht
  `node_modules`, also zeigt ein Symlink ins Projekt. Ein `rm -rf` auf das Wegwerf-Verzeichnis räumt dann
  potenziell das echte `node_modules` ab. → Vor dem Löschen erst den Symlink entfernen — oder die Kopie gar
  nicht erst unter `/tmp` anlegen.
  *2026-08-01*

- **Ein Review-Werkzeug, dessen Selektoren ins Leere greifen, meldet PASS** — der Report druckt Zeilen, die
  Felder darin sind leer oder `-`, und der Lauf endet grün. Ursache: das Produkt hat seine Klassen umbenannt
  (hier `.hud-gate*` → `.hud-quiz*`, weil das Quiz in die Bildmitte gezogen ist), das Werkzeug fragt weiter
  die alten ab, `querySelector` gibt `null`, und ein `null` **hat keinen Fehlerwert** — es fällt durch jede
  Formatierung als Leerstring durch. Ein DOM-Report ist damit genau so lange wahr wie das Markup, gegen das
  er geschrieben wurde. → Jeder Selektorblock bekommt eine **Existenzprüfung**: kommt der Container `null`
  zurück, ist das ein **benannter Fehler** („`.hud-quiz.on` nicht gefunden"), kein leeres Feld. Und nach
  jedem Umbau am Markup das Review-Werkzeug einmal gegen ein Szenario fahren, in dem das Element **da sein
  muss** — grün über nichts sieht aus wie grün.
  *`tools/hud.mjs` las nach dem Umzug jedes Quizfeld als `null` und meldete über alle 17 Szenarien
  `RESULT: PASS`; erst der Blick ins Bild zeigte, dass der Report ein anderes HUD beschrieb · 2026-08-02*

- **Die Uhr dieser Maschine trägt kleine Effekte nicht** — der Rauschboden las am **unveränderten** Build
  11.90 … 24.60 ms (Faktor 2.07) bei einem gesuchten Effekt von 0.3–1.0 ms. → Entscheidungen auf
  **deterministische Spalten** stellen (Dreiecke, Calls, Instanzen) und auf **Bilder**; den Rauschboden vor
  dem ersten Ranking einmal messen, nicht schätzen.
  *sechs von acht Klammern lagen über der eigenen Driftgrenze · 2026-08-01*
