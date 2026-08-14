# Promptlänge, Adjektive und Follow-up-Effizienz — Evidenz für globale Prompting-Tipps

**Arbeitsordner:** `d:\CODING\React Projects\test-projects\shared\shared-docs`
**Zieldatei:** `PROMPTING-TIPS.md`
**Datenquelle:** `animation-review-hub-v1-gpt-5-6-sol`
**Analyzer:** aktueller Review-Hub mit Prompt-Lexikon `2.7.0`

## Ziel

Die bisherigen Bewertungen domänenübergreifend einordnen und daraus eine vorsichtige, praktisch nutzbare Richtlinie für Promptlänge, Adjektive und Follow-up-Prompts ableiten. Metriken sollen beim Kürzen und bei der Versuchsplanung helfen, aber nicht selbst zum Qualitätsziel werden.

## Phasen

- [x] P1 — Regeln, globale Prompting-Tipps, drei bestehende Learning-Dateien und Nutzerbilder lesen.
- [x] P2 — alle 53 aktuell gespeicherten Scores sowie die V14-, V15-, V20- und Village-Promptserien auswerten.
- [x] P3 — quantitative Längen-/Adjektivdaten und vorläufige Arbeitsbereiche in `PROMPTING-TIPS.md` ergänzen.
- [x] P4 — Follow-up-Regeln, Laufzeitbefund V20.2–V20.4 und saubere Messroute ergänzen.
- [x] P5 — Dokument statisch auf Widersprüche, UTF-8, Links und Zeilenlimit prüfen.

## Entscheidungen

- Es wird kein universelles Qualitätsoptimum als Wortzahl behauptet. Stattdessen kommen drei vorläufige Arbeitsbereiche mit einer Pflicht zur inhaltlichen Stop-Regel.
- Zeichen und Wörter werden über den ausführbaren `text`-Inhalt gemessen; Adjektivtreffer folgen dem aktuellen Hub-Lexikon `2.7.0`. Dadurch können Werte leicht von älteren Learning-Dateien abweichen, die Überschrift/Metadaten oder einen älteren Lexikonstand einbezogen haben.
- Scores bewerten erzeugte Ergebnisse, nicht den Prompt isoliert. Modell-Effort, Quellenqualität, Laufstreuung und Ausführungsweg bleiben mögliche Mitursachen.
- V20.3 ist derzeit Qualitätssieger der Elemental-Reihe; V20.4 ist bei nur drei Punkten Abstand der klare Zeit-/Qualitäts-Pareto-Punkt.

## Findings

- Aktuell liegen 53 gespeicherte Bewertungen vor: Animation 30, VFX 4, Environment 11, Environment-VFX 7, VFX-Animation 1.
- Höchste Ergebnisse: V14.2 Max `94`, derselbe Prompt bei High `89`, V20.3 `86`, V20.4 `83`; danach drei Ergebnisse mit `70`.
- V14.2: 8.836 Zeichen, 1.269 Wörter, 65 Adjektivtreffer, 5,12 %, Scores `89/94`.
- V20.3: 2.293 Zeichen, 306 Wörter, 34 Adjektivtreffer, 11,11 %, Score `86`.
- V20.4: 5.995 Zeichen, 824 Wörter, 28 Adjektivtreffer, 3,40 %, Score `83`.
- Gleich kurze Prompts können gegensätzlich abschneiden: V20.3 mit 306 Wörtern erreicht `86`, V15.1 mit 310 Wörtern `15`, V15.2 mit 319 Wörtern `18`. Baseline- und Quellenfitness bestimmen, wie viel der Prompt selbst erklären muss.
- Gleich hohe Adjektivdichte ist ebenfalls nicht gleich Qualität: V20.2 hat 32 Treffer/11,47 % und Score `64`; V20.3 hat 34/11,11 % und Score `86`. Kuratierte Wirkungsdimensionen sind plausibel hilfreicher als ein ungeordneter Superlativstapel.
- Mehr Adjektive sind kein allgemeiner Gewinn: V14.4 hat 112 Treffer und Score `30`; V20.4 erreicht mit 28 Treffern `83`.
- Häufige funktionale Qualitätswörter der drei starken Prompts sind `complete`, `exact`, `compact`, `readable`, `stable`, `clear`, `coherent`, `bounded` und `layered`. Das ist eine Beobachtung, keine Pflichtwortliste.
- Vorläufige Arbeitsbereiche: enger Follow-up auf starker Baseline 250–450 Wörter; komplexe Neuentwicklung/Integration 700–1.300 Wörter; ab 1.500 Wörtern beziehungsweise etwa 10.000 Zeichen strenge Kürzungsprüfung. Kein Bereich garantiert Qualität.
- Nutzerzeiten: V20.2 etwa 4 h 40 min, V20.3 etwa 5 h, V20.4 etwa 1 h 20 min. V20.4 ist rund 73 % schneller als V20.3 bei nur drei Scorepunkten Abstand.
- Plausible Laufzeithypothese: V20.2/V20.3 ließen die Identitäten von 14 Skills aus Namen und allgemeiner Sprache ableiten; V20.4 lieferte Phasen, Geometrien und Implementierungsreihenfolge. Der längere Prompt verringerte damit wahrscheinlich den Design-Suchraum. Toolrunden, Portkorrekturen, Audits und Sessionbedingungen verhindern eine kausale Behauptung.

## Unsicheres

- V20.5 und V20.6 sind noch nicht bewertet; die zweite V20-Dreiergruppe ist nicht abgeschlossen.
- Für die besten Varianten fehlen überwiegend unveränderte Wiederholungsläufe mit gleichem Modell und Effort.
- Generierungsdauer wurde nicht als sauber getrennte aktive Zeit, Wartezeit und Nacharbeitszeit erfasst.
- Der V6-Originalprompt fehlt; sein Score `70` kann nicht mit belastbaren Textmetriken verknüpft werden.

## Append-only Log

### Runde 1 — Quellen und Gesamtbestand eingeordnet

- Root-Regeln und `PROMPT-REGELN.md` vollständig gelesen.
- `PROMPTING-TIPS.md`, Boxer-, Katana-, Village- und Sci-Fi-Learnings sowie V20-Folgeprompts und V20.2–V20.4-Tasklogs gelesen.
- Alle sechs Review-JSON-Dateien ausgewertet; 53 bewertete Datensätze festgestellt.
- Drei Nutzerbilder bestätigen V14.2 Max `94`, V14.2 High `89` sowie V20.3 `86`, V20.4 `83`, V20.2 `64`, V20.1 `58`.

### Runde 2 — Promptmetriken und Laufzeitbeziehung berechnet

- Aktuellen Analyzer aus `src/lib/prompt-analysis.ts` mit Lexikon `2.7.0` auf die ausführbaren V14-, V15-, V20- und Village-Texte angewendet.
- Längen- und Adjektivvergleiche zeigen keinen global monotonen Zusammenhang, aber klare domänenspezifische Sättigung und einen Überlängen-Warnbereich.
- V20.3 und V15.1/V15.2 belegen gemeinsam, dass rund 300 Wörter nur bei einer passenden, informationsreichen Baseline ausreichen.
- V20.2/V20.3 gegen V20.4 stützen als vorläufige Hypothese: mehr konkrete Vorentscheidungen können die Ausführung trotz längerem Prompt stark beschleunigen.

### Runde 3 — Längen- und Adjektivrichtlinie ergänzt

- Drei ausdrücklich vorläufige Arbeitsbereiche ergänzt: 250–450 Wörter für enge Follow-ups auf starker Baseline, 700–1.300 für komplexe Entwicklung/Integration und Kürzungsprüfung ab 1.500 Wörtern beziehungsweise etwa 10.000 Zeichen.
- Datentabelle enthält die stärksten bekannten Promptläufe und wichtige Gegenbeispiele einschließlich V14.2, V20.2–V20.4, V15.4, V6.2 und der schwachen kurzen beziehungsweise überlangen Varianten.
- Exakte häufige funktionale Adjektivtreffer der drei starken Prompts dokumentiert; ausdrücklich keine Pflichtwortliste daraus abgeleitet.

### Runde 4 — Follow-up- und Zeiteffizienzregeln ergänzt

- Follow-up als Delta-Vertrag beschrieben: Baseline schützen, Änderung positiv definieren, Hauptunsicherheit zuerst schließen, lokal abnehmen und Liefervertrag nicht wiederholen.
- Nutzerzeiten und Scores V20.2–V20.4 tabellarisch aufgenommen. V20.4 als Zeit-/Qualitäts-Pareto-Punkt markiert, V20.3 bleibt Qualitätssieger.
- Plausible Suchraum-Hypothese klar von Beweis getrennt; kurze Prompts werden nicht mehr automatisch mit schneller Ausführung gleichgesetzt.
- Messroute um Start/Ende, aktive Arbeit/Wartezeit und geänderte Dateien/Zeilen erweitert.

### Runde 5 — Statische Dokumentprüfung abgeschlossen

- `PROMPTING-TIPS.md` liegt mit 174 Zeilen und diese Taskdatei mit 76 Zeilen deutlich unter dem 800-Zeilen-Limit.
- Alle drei Learning-Links auf Existenz geprüft; keine fehlende Quelle festgestellt.
- `git diff --check` ohne Whitespacefehler; UTF-8-Ersatzzeichenprüfung unauffällig.
- Keine Tests, Builds, Dev-Server oder Sichtprüfungen ausgeführt, da ausschließlich Dokumentation geändert wurde.

### Runde 6 — Zeilenzahl präzisiert

- Die in Runde 5 genannten 76 Zeilen waren der Stand vor dem Anhängen des Abschlusslogs. Die Taskdatei bleibt auch mit Abschlusslog unter 100 Zeilen und damit deutlich unter dem Limit.

### Runde 7 — Neue V20-Scores und Zeitkorrektur

- Nutzer hat die vollständige Reihe neu bewertet: V20.1 `52`, V20.2 `68`, V20.3 `91`, V20.4 `81`, V20.5 `50`, V20.6 `40`.
- Die frühere Aussage „V20.4 rund 73 % schneller“ war auf Kalenderspannen gestützt und ist als aktive Laufzeit nicht haltbar.
- V20.3 enthielt laut Chatnotiz rund 3 h 39 min Account-/Provider-Cooldown; aktive Arbeitsnäherung etwa 1 h 30 min statt fünf Stunden.
- V20.4 lief ungefähr 1 h 20 min ohne vergleichbare lange Fremdwartezeit; beide aktiven Größenordnungen sind damit ähnlich.
- Promptmetriken wurden auf die Semantik des Prompt-Labors vereinheitlicht: vollständiger Promptblock einschließlich H2/Metadaten, Lexikon `2.9.0`.
- `PROMPTING-TIPS.md` betont jetzt positiv: kuratierte VFX-Adjektive waren ein starker Design-Controller; bloße Trefferzahl oder Dichte bleibt ungeeignet als Zielmetrik.

### Runde 8 — Laufzeit-Lexikon nachgezogen

- Während der Dokumentationsrunde stieg das Laufzeit-Lexikon auf `2.10.0`; die abschließenden Tabellen verwenden deshalb diesen aktuellen Stand.
- Aktuelle vollständige Treffer: V20.2 `38`/`11,34 %`, V20.3 `37`/`10,05 %`; die Kernaussage bleibt unverändert.

### Runde 9 — Abschlussstand 2.11.0

- Eine parallele Lexikonpflege erhöhte den Stand auf `2.11.0` und den Reviewbestand auf 56 bewertete Ergebnisse.
- V20.2/V20.3-Metriken bleiben gleich; Boxer- und Katana-Adjektivtreffer wurden mit den neuen Begriffen nachgezogen.

### Runde 10 — Prompting-Tipps auf echte Tipps reduziert

- Nutzerkorrektur umgesetzt: globale Datei vollständig auf kurze, direkt anwendbare Regeln reduziert.
- Technische Messtabellen, CLI-/Laufzeitdetails, Reviewbestand und ausführliche Versuchsargumentation entfernt; diese bleiben in den verlinkten Learning-Dateien.
- Adjektive deutlich positiv eingeordnet: viele sorgfältig ausgewählte Wörter helfen, wenn sie unterschiedliche sichtbare Wirkungsgruppen steuern.
- V20.3-Palette vollständig als kopierbares Muster erhalten und mit `91/100` gegen den ungeordneten V20.2-Stapel `68/100` eingeordnet.
- Datei beginnt nun ausdrücklich mit der Regel, keine technischen Messprotokolle, Laufzeitberichte, Toolbeschreibungen oder langen Versuchserklärungen aufzunehmen.
