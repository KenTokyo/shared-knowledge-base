# Dokumentansprüche und Doku-Gates — claude-flakes

**Lesen wenn:** eine Zahl, ein Absolutwort oder ein Artefaktverweis in README, ROADMAP oder `docs/` steht — oder ein Gate gebaut wird, das so etwas prüft.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Sonden, Selbsttests und Messtreiber: [`PROBES-SELFTESTS.md`](PROBES-SELFTESTS.md).

- **Dokumentzahl bleibt bei grünen Gates frei erfunden** — Suite liest nur Kurventabelle, ROADMAP gar nicht. Auch mit Doku-Gate bleibt eine Lücke: `FIGURE_SHAPES` erkennt ausschließlich „`review/x.log` + N lines". Ein Verdikt-Block (`all 16 checks passed`, `58/58 checks passed`) nennt weder Logdatei noch Zeilenzahl, fällt damit durch jede Shape und driftet unbemerkt weiter — ausgerechnet in dem Dokument, das „eine Zahl in Prosa ist ein Anspruch" als eigene Regel führt. → Claims aus aktuellem Dokument parsen, Artefakt live lesen, falschen Wert und fehlendes Artefakt separat röten; Verdikt-Zahlen beim Anfassen **neu messen statt abschreiben** — `consts`+`wgsl`+`progression`+`mutation`+`build` kosten zusammen unter einer Minute und keinen Browser, nur `play.mjs` kostet einen Chromium-Start.
  *README 141/118→777/555: Mutation-Gate 141/141 und Suite 124/124 weiter PASS; danach 255-vs-257-Fehler gefunden · 2026-08-01. Erneut in `docs/test-status.md` selbst: wgsl stand auf 16 (gemessen 18), play.mjs auf 58/58 (gemessen 140/140) — Gate blieb bei beiden 145/145 grün · 2026-08-03*

  **Ein `@see`-Kommentar ist kein Gate.** Sonde nennt das Dokument nur im Kopfkommentar; die Punktzahl darin ist eine Abschrift ohne Leser, und beide Seiten wirken verbunden, weil die Sonde den Pfad ja nennt. → Sonde ihre **eigene** Zeile aus dem Dokument lesen lassen und die Zahl darin gegen `ok.length + fails.length + 1` prüfen (`+1` = diese Prüfung selbst, noch nicht gezählt). Zeile über den **eigenen Dateinamen** finden, nicht über die Zeilennummer — sonst prüft eine umbenannte Sonde still die Zeile einer fremden. Ein zweiter Check „Zeile existiert überhaupt" davor, sonst ist ein verschwundener Abschnitt kein Rot.
  *`docs/vfx-studio-editor.md` §11 stand auf 416, `vfx-panel-probe.mjs` lief 445 — 29 Prüfungen Drift, alle vier Sonden verwiesen nur per `@see`. Das neue Gate war beim ersten Lauf sofort rot (445 vs 447) · 2026-08-08*

- **Hartumbruch verkleinert Claim-Nenner** — Parser erwartet Literalspaces und überspringt umbrochene Prosa; kleinerer Nenner wirkt sauber. → Zwischen Tokens `\s+`; zusätzlich jede unverbrauchte `N lines`-Phrase mit Pfad/Zeile melden.
  *3/10 README-Claims fielen zunächst still weg; Residuum fand sofort 3 weitere übersehene Stellen · 2026-08-01*

- **Dokument-Sweep schrumpft grün** — Liste und Leser fallen gemeinsam auf Root zurück; Inhaltsstufe bleibt auf 14 statt 24 Claims grün. → Zwei Böden: erlaubte Verzeichnisse erreicht **und** gelistete Dateien vom Sweep erreicht.
  *`floor-dir` allein schwieg; `floor-reach` fing Root-only, während die Hauptstufe bytegleich grün blieb · 2026-08-02*

- **Archiv wird gegen heutigen Artefaktstand gegatet** — datierte History-Zahlen werden nach späteren Log-Neuschriften zwangsläufig falsch. → Nur aktuelle Root-/`docs/`-Claims live halten; historische Aussagen datieren, nicht umschreiben.
  *4/10 lesbare Claims zweier History-Dateien widersprachen später korrekt der Platte · 2026-08-01*

- **Commit dreht Präsensansprüche ohne Codefehler um** — Trackingstatus oder Tastenbelegung ändert sich, die Prosa bleibt stehen; ein Doku-Nachtrag findet es nicht, weil er nach seinem *eigenen* neuen Thema grept statt nach dem, was das Dokument behauptet. → Präsens gegen `git ls-files` bzw. die Quelle prüfen; beim Anfassen eines Bestandsdokuments zusätzlich dessen Absolutaussagen greppen (`nur|kein|einzige|fünf|niemals`) — genau die dreht ein Feature-Commit um, und sie stehen nie dort, wo man das neue Feature einträgt. Ehemals wahre Aussage datieren, nicht umschreiben.
  *Ein Commit widerlegte 28 Claims an 13 Stellen; Sonde endete mit 0 widersprochenen und 19 datierten Sites · 2026-08-02. `b91652b` drehte drei Tastenzeilen um (Shift=Sprint→Surf, RMB=Surf→Platzierung, LMB fehlte ganz): README-Startseite, ROADMAP §7 und `gameplay-state.md` §7 blieben falsch — quer durch einen Doku-Nachtrag, der dieselbe Datei fürs Münzfeld auf die Konstante gemessen hatte; §1 verneinte zugleich den Wellen-Event, den §5 zwei Bildschirme tiefer beschreibt · 2026-08-03*

- **Überschriebener Beleg macht Transition unfalsifizierbar** — derselbe Logname ersetzt den 222-Zeilen-Vorgänger; Diff-Prosa zeigt auf kein existierendes Artefakt. → Beide Enden dauerhaft benennen oder nur reproduzierbaren Fixpunkt behaupten.
  *Frischer Lauf war bytegleich zum 224-Zeilen-Fixpunkt; verschwundener 222-Zeilen-Vergleich wurde zurückgezogen · 2026-08-02*

- **Selbstreferenzielles Doku-Gate braucht Konvergenzreihenfolge** — neues Log ändert Doku-Zahl, Doku ändert Gate-Ausgabe, rote Zwischenstufe ist erwartbar. → Treiber→Log→Doku→Gate→Treiber; zuletzt alle Artefakte byte-diffen.
  *Falsifikatorlog 138→159→282→318 Zeilen; erst zweiter Treiberlauf belegte den jeweiligen Fixpunkt · 2026-08-01/02*
