# Coding Rules — einfacher Arbeitsvertrag

> **Kompaktpflicht**
> - Tipps, Regeln, Prompts, Pläne, Learnings, Zusammenfassungen, angepasste Doku: möglichst wenige, token-effiziente Stichpunkte.
> - Entfernen: Füllwörter, Wiederholungen, unnötige Artikel (`der`, `die`, `das`, `ein`, `eine`), Prosa.
> - Bewahren: Pflichtinhalt, Gründe, Grenzen, Zahlen, Pfade, Befehle.
> - Ausnahme: `Unchanged original` bleibt unverändert.

**Ziel:** Auftrag verstehen, Original und verlustfrei verbesserte Arbeitsfassung speichern, in Task-Datei planen, verbesserte Aufgabe direkt umsetzen.

**Reihenfolge bei Widersprüchen:** aktueller Userauftrag → lokale `AGENTS.md` → diese Coding Rules → passende Fachregeln und belegte Learnings.

**Ausnahmen sind erlaubt.** Der User darf jede Regel dieser Datei für eine Sitzung oder einen Auftrag aufheben — auch Sperren wie die Freigabepflicht für Sicht- und Browserprüfungen (§5) oder die Testsperre (§6). Eine gewährte Ausnahme gilt für die genannte Sitzung, wird in Antwort und Task-Datei genannt und braucht keine Rückfrage mehr. Sie ändert diese Datei nicht und gilt nicht automatisch für die nächste Sitzung.

## 1. Prompt-Datei und Task-Datei

Änderung an Projektdatei oder -artefakt → **vor erstem Edit** genau ein Paar:

- `…-enhanced-prompt.md` — feste Quelle mit Original und verbesserter Arbeitsfassung;
- `…-tasks.md` oder vorhandene Task-/Masterdatei — änderbarer Arbeitsplan.

Neue plain `…-prompt.md` entfallen. Reine Frage oder Leseauftrag → kein Paar. Kleiner Fix → kurze Phase, nicht fehlende Dateien.

Paarregeln:

- Gleicher Taskordner, sofern Projekt nichts anderes vorgibt.
- Gemeinsamer Namensstamm: `<thema>-enhanced-prompt.md` plus `<thema>-tasks.md`.
- Task-Datei: relativer Prompt-Pfad direkt unter `## Initial goal`.
- Arbeitsumfang, Phasen, Entscheidungen und Stand aus neuestem `Improved prompt` ableiten; ganzen Usertext dort nie kopieren.
- Vorhandenen Plan fortführen. Historische `…-prompt.md` nicht massenhaft umbenennen; beim nächsten aktiven Edit einmal zu `…-enhanced-prompt.md` migrieren, `Improved prompt` ergänzen und Task-Link ändern.
- Spätere Useränderungen datiert an bestehende Enhanced-Datei anhängen; direkt darunter eine neue `#### Improved prompt`-Arbeitsfassung ergänzen.
- Frühere Originale und Verbesserungen nie umschreiben. Abschluss blockiert bei fehlender Datei, kaputtem Link oder Widerspruch zwischen Arbeitsfassung und Plan.

### Enhanced-Prompt-Datei

1. `## Source` — Datum, Chat-/Dateihinweis, Anhänge.
2. `## Unchanged original` — geschützter Usertext in Originalsprache und Originalreihenfolge; nie aufräumen oder verbessern.
3. `## Improved prompt` — verlustfreie Arbeitsfassung; steuert immer Plan und Umsetzung.
4. `## Dated updates` — spätere Useränderungen unverändert mit Datum; neue `#### Improved prompt`-Fassung direkt darunter.

`Unchanged original` bewahrt Füllwörter, Wiederholungen, Schreibweise, Pfade, Befehle, Zahlen, Bildhinweise und Grenzen. Secrets nie speichern; stattdessen `[REDACTED: secret]`.

### Auto-Enhance und optionale Keywords

**Default ohne Keyword:** Dieselbe ausführende KI verbessert jeden projektändernden Auftrag, schreibt die Arbeitsfassung und setzt sie ohne Freigabestopp direkt um. Kein zweiter Enhancer und keine getrennte Vorbereitungsrunde.

- `Prompt verbessern` oder `Prompt-Verbesserung:[…]` → verbessern **und implementieren**; Zusatztext steuert den Schwerpunkt.
- `Wirklich Nur Prompt verbessern` → Arbeitsfassung schreiben, aber nichts implementieren.
- `Prompt unverändert` → im `Improved prompt` auf das unveränderte Original verweisen und dieses ohne inhaltliche Erweiterung implementieren.

Sätze wie „gefällt mir nicht“, „sieht billig/schlecht/generisch aus“, „mach das besser/schöner/hochwertiger“ oder „überarbeite das“ brauchen kein Keyword. Die KI liest betroffenen Projektzustand und übersetzt die Kritik in:

- konkreten sichtbaren oder funktionalen Mangel;
- passende Domänendimensionen, etwa Form, Material, Timing, Hierarchie oder Rückmeldung;
- wenige Adjektive direkt am Bezugswort;
- geschützte gute Eigenschaften und prüfbare Fertig-Kriterien.

Ein bereits starker Prompt wird nur geordnet, entwirrt und auf Widersprüche geprüft; keine zusätzlichen Features, Fakten, Referenzen oder Qualitätsrichtungen erfinden. Verneinungen, zitierte Beispiele, leere Kennzeilen und Platzhalter wie `[HIER …]` sind keine neuen Aufträge.

Standardroute:

- **Short-first:** kürzeste vollständige Fassung mit Ziel, Mangel, Priorität, Schutz und Abnahme schreiben.
- Bei sichtbarer Arbeit konkrete Adjektive am Bezugswort platzieren, etwa „skulpturale Formen“, „leuchtende Materialien“ oder „gewichtige Bewegung“.
- Unterschiedliche Wirkungsdimensionen abdecken; Synonym- und Superlativstapel löschen.
- Nicht festgelegte Lösungen, Namen und Gestaltung dem ausführenden Modell überlassen.
- Nur bei benanntem Mangel auf Medium erweitern; Long nur für ungeklärte Quelle, Architektur, Integration oder Reihenfolge.
- Sprache, Verneinungen, feste Fakten, Pfade, Befehle und Maße schützen; Wiederholungen entfernen.

Begründung, Bewertungen und Gut-/Schlecht-Beispiele: [PROMPTING-TIPS.md](PROMPTING-TIPS.md).

### Übergabe und Lesen

Jede Übergabe und jeder Start nach einer Kontextkürzung nennt direkt:

```text
- Prompt: <projekt-relativer Pfad zur *-enhanced-prompt.md>
- Task: <projekt-relativer Pfad zur Task-/Masterdatei>
```

Der Folgeagent liest Prompt → Taskstand → Code. Beim Zusammenführen und Abschluss liest er Prompt und Task erneut. Beide Pfade bleiben bei jeder Kontextkürzung erhalten.

Normaler Lesepfad:

1. lokale `AGENTS.md` vollständig lesen;
2. diese Datei vollständig lesen;
3. Prompt-Datei und danach Task-Datei lesen oder das Paar anlegen;
4. nur die kleinste passende Fachdatei lesen.

Fachdateien:

- React, State, Hydration, Browser-UI → [FRONTEND-RULES.md](FRONTEND-RULES.md)
- Echtzeit-3D → [THREEJS-RULES.md](THREEJS-RULES.md)
- vollständiger Weltbau → [THREEJS-WORLDBUILDING-RULES.md](THREEJS-WORLDBUILDING-RULES.md)
- ausdrücklich erlaubte Bildschirmaufnahmen → [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md)
- neue belegte Learnings → [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md)
- Windows-Ressourcen, Nachbarprojekt oder Port → [WINDOWS-RESSOURCEN.md](WINDOWS-RESSOURCEN.md)
- macOS-Ressourcen, Nachbarprojekt oder Port → [MACOS-RESSOURCEN.md](MACOS-RESSOURCEN.md)
- mehrere Lieferphasen → [Phasenworkflow](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md)

Externe API oder Bibliothek → nur aktuelle Originaldoku zur offenen Frage lesen. Vor großem Lesen kurz notieren: **Auftrag · Leseliste · Fund je Datei · nächster Schritt**. Stoppen, sobald die Änderung sicher entschieden ist.

## 2. Prüfen, entscheiden, durcharbeiten

- Aussagen und Pläne erst nach Code, Doku, Log, Messung oder klarer Logik übernehmen.
- Mögliche Speech-to-Text-Fehler mitdenken; Beispiele und Referenzen stärker als ein wahrscheinlich falsches Einzelwort gewichten.
- Lösung A verbessern, nicht still zu B wechseln. Vor großer Änderung fragen: **Löst sie das genannte Problem?**
- Maße, feste Eigenschaften, Superlative und Verneinungen schützen. „Übernehmen“ heißt gleiche Funktion, gleiches Verhalten, gleicher Datenfluss und gleiche Qualität.
- Kleine Lücke klein beheben; schwache Grundlage zusammenhängend reparieren. Wenige Zeilen sind kein Ziel.
- Altcode prüfen. Schädliche Altwege entfernen, statt weitere Notlösungen darauf zu stapeln.
- Bei Unsicherheit: Problem vereinfachen → ähnliche Projektlösung und Originaldoku prüfen → zwei oder drei Wege vergleichen → besten wählen.
- Setupfehler wie falscher Ordner, fehlende Installation oder Portkonflikt nicht als Produktlösung verstecken.

### Teile aus Repositorys und Referenzen wirklich übernehmen

„Nimm diesen Teil aus dem Repository“ ist ein Ergebnisvertrag, keine Bitte um lose Inspiration. Zu übernehmen sind die qualitätsbestimmenden Eigenschaften des benannten Teils: Funktion, Verhalten, Interaktion, Timing, Datenfluss, Rendering, Material-/Assetlogik, Zustände, Lebenszyklus und sichtbare Qualität. Gleiche Farben, Namen, Formen oder einige ähnliche Parameter reichen nicht, wenn Mechanik und Ergebnis anders bleiben.

Vor dem ersten Implementierungsedit beide Wege Ende zu Ende erfassen:

1. Referenz: Einstieg/Trigger → Daten und Zustände → Kernalgorithmus → Rendering/UI → Lebenszyklus und Cleanup.
2. Zielprojekt: entsprechende Hauptquelle, vorhandene Architektur, widersprechende Altwege und direkt gekoppelte Abhängigkeiten.
3. Qualitätsvertrag: konkrete Eigenschaften, an denen die Übernahme erkennbar ist, plus Referenzpfade und erlaubte Prüfart.
4. Migrationsentscheidung je gekoppeltem Teil: behalten, anbinden, reparieren, ersetzen oder nach Nullreferenz löschen.

Das Zielprojekt darf eine andere Architektur behalten, wenn sie dasselbe Ergebnis nachweisbar trägt. Verhindert seine Grundlage jedoch Funktion oder Qualität der Referenz, ist der nötige zusammenhängende Umbau ausdrücklich Teil des Auftrags: verantwortliche Module ersetzen, Daten- und Renderwege neu verbinden, echte Trigger umleiten und verdrängte Altpfade vollständig entfernen. Umfangreiche Änderungen und Löschungen sind dann richtiger als ein kleiner Patch; wenige geänderte Zeilen sind kein Qualitätsmerkmal.

Mandatory route for reference transfers, before look tuning: pin source commit and public trigger → trace source and target through reset → map every production slot → copy the full quality-bearing runtime slice → add one adapter for IDs, space, one clock, and native render contracts → route real triggers → delete the old path → check source content, finite values, expiry, and reset across all slots. Treat a missing or weak form as an integration defect; check distance, event beat, layers, uniforms, blend/depth, light, and lifecycle before brightness.

Nicht als Übernahme liefern:

- isolierte Demo, Overlay oder Wrapper neben dem echten Produktweg;
- vereinfachte Nachahmung, die den qualitätsbestimmenden Mechanismus auslässt;
- neuer Pfad plus dauerhaft aktiver Altpfad, stiller Fallback oder zweiter Zustands-/Renderverantwortlicher;
- reines Umbenennen, Umfärben, Skalieren oder Parameter-Tuning bei falscher Struktur;
- Abschluss nach einem Pilot, wenn der benannte Teil noch nicht vollständig im echten Weg läuft.

Meldet der User denselben Mangel erneut, gilt der bisherige Ansatz für diesen Punkt als widerlegt. Nicht dieselbe kleine Tuning-Achse wiederholen. Referenz und Ziel erneut Ende zu Ende öffnen, die erste ursächliche Abweichung finden und Architektur, Datenquelle, Ereignisse, Raum-/Zeitbezug, Rendering, Materialien, Assets, Lebenszyklus und Altpfade prüfen. Den Arbeitsumfang auf alle direkt gekoppelten Teile erweitern, die für die geforderte Qualität nötig sind; große Refactorings, Ersatz und Löschung sind dabei ausdrücklich erwartet. Bereits belegtes gutes Verhalten außerhalb dieses Wegs schützen.

Ist Sichtprüfung ausdrücklich erlaubt, verlangt ein wiederholter Referenztransfer-Mangel vor Abschluss einen Source-/Target-Capturevergleich desselben Produktbeats mit vergleichbaren relativen Bildmaßen, Kameraabstand und Renderpfad. Erste sichtbare Abweichung in Ereignis, Raum, Layer, Material/Depth, HDR/Post oder Lebenszyklus beheben; nicht nur Helligkeit tunen.

Fertig ist die Übernahme erst, wenn der echte Produkttrigger den neuen Weg nutzt, die benannten Qualitätsmerkmale umgesetzt sind, verdrängte Wege keine Produktionsreferenzen mehr haben und erlaubte Prüfungen das Ergebnis tragen. Ohne erlaubte Sichtprüfung nur statische Evidenz und eine genaue manuelle Abnahme nennen; keine optische Gleichheit behaupten.

Bei klarem Auftrag nicht nachfragen. Bis zum Ziel oder zu einer echten äußeren Blockade weiterarbeiten. Nur stoppen bei fehlendem Secret/Zugang, widersprüchlichen Pflichtdaten oder nicht erlaubter endgültiger Aktion; dann genau die eine fehlende Information nennen.

Im bearbeiteten Weg sichtbare Fehler, Typfehler, tote Verweise, kaputte Doku, falsche Rechnungen und eigene Rückschritte direkt beheben. Fremde Änderungen nie überschreiben oder zurücksetzen. Fremde Blocker nur so klein wie nötig und ohne Datenverlust beheben; Funde außerhalb des Auftrags nicht zum neuen Großprojekt machen.

## 3. Phasen und Arbeitsablauf

Jede Phase enthält kompakt:

1. **Ziel** — sichtbares oder prüfbares Ergebnis.
2. **Todos** — klare `[ ]`- und `[x]`-Punkte.
3. **Ergebnis** — ein kurzer Satz.
4. **Warum** — nur wenn nicht offensichtlich.
5. **Grenzen** — feste Regeln und Obergrenzen.
6. **Architektur** — Hauptquelle, Verantwortung und Datenfluss.
7. **Funde** — Fehler und Leistungsrisiken nach Schwere und Fixstand.
8. **Referenzen** — höchstens drei Hauptpfade.

Reihenfolge: Grundlage → kompletter Hauptweg → Sonderfälle → Feinschliff → Endprüfung. Jede Phase bleibt zusammenhängend, rückbaubar und möglichst prüfbar.

Arbeitsablauf:

1. Prompt, Taskstand, Arbeitsumfang, Architektur, Git-Diff und Werkzeuge prüfen.
2. Eng verbundene Todos vollständig umsetzen.
3. Stärksten passenden Projektcheck einmal ausführen.
4. Funde gemeinsam beheben; danach normalerweise genau einen Kontrolllauf starten.
5. Phase einmal aktualisieren und direkt zur nächsten offenen Phase wechseln.
6. Am Ende `Unchanged original`, neuesten `Improved prompt`, Task und alle Abnahmepunkte erneut lesen.

Frühere Ergebnisse nur ergänzen. Ab etwa 600 Taskzeilen nach Projektregel aufteilen und verlinken. Verbundene offene Funde als Todos schließen; nur echte spätere Zusatzarbeit bekommt einen eigenen Plan.

## 4. Code und Architektur

- Vor dem Edit Hauptquelle, Verantwortung und Datenfluss verstehen.
- Erst Struktur und kompletten Hauptweg bauen, danach Werte, Optik und Feinschliff.
- Bei instabilen Bereichen doppelte Quellen und Altcode prüfen → eine verlässliche Quelle bauen → alle Nutzer anbinden → alten Weg löschen.
- „Komplett neu“ heißt Inhalt neu aufbauen, nicht nur Farben oder Zahlen ändern.
- Keine versteckten Grenzen oder Qualitätsverluste als Leistungsverbesserung verkaufen.

Dateien:

- Eine Datei hat ein Fachziel. Unabhängige UI, Assets, Datenmodelle und Services trennen.
- Keine wachsenden Sammeldateien wie `entries.ts`, `config.ts`, `data.ts`, `misc.ts` oder `helpers.ts`.
- Sammelstellen importieren und exportieren nur; Fachlogik bleibt beim Fachteil.
- Gemeinsames Modul nur bei echter Wiederverwendung. Globale Module importieren kein Feature.
- Handgepflegte Codedatei maximal **1.200 physische Zeilen**. Neue oder geänderte Datei nie darüber liefern; eine berührte größere Altdatei sinnvoll teilen. Erzeugte Dateien und unveränderter Fremdcode sind ausgenommen.
- Nach Umbauten ungenutzten Code, Imports, Zustände und Verweise löschen.

Datenfluss und Leistung:

- Eine verlässliche Hauptquelle festlegen; parallele Stores und Hin-und-her-Abgleich vermeiden.
- Daten gesammelt laden, unabhängige Arbeit parallel ausführen und viele Einzelzugriffe vermeiden.
- Teure Arbeit bündeln, wiederverwenden, zwischenspeichern oder vorberechnen.
- Eine laufend veränderte Liste nie im selben Durchlauf erweitern; Kopie oder Queue plus `visited`-Set und feste Obergrenze nutzen.
- Neue Schichten brauchen sichtbaren Nutzen. Leistung darf Kernfunktion, Lesbarkeit oder belegte Qualität nicht still verschlechtern.

## 5. Fachregeln und Sichtprüfung

- React-/Frontend-Arbeit folgt [FRONTEND-RULES.md](FRONTEND-RULES.md); Echtzeit-3D folgt [THREEJS-RULES.md](THREEJS-RULES.md) und genau einer passenden Fachdatei.
- Browser-, Screenshot-, UI- oder Gameplay-Sichtprüfung braucht eine **ausdrückliche Freigabe im aktuellen Userauftrag**. Schweigen, alte Freigaben oder eigene Unsicherheit reichen nicht.
- Ohne Freigabe nur statisch prüfen; der User übernimmt die direkte Sicht- und Spielgefühl-Abnahme.
- Mit Freigabe erst fertig umsetzen und statisch prüfen, dann [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md) folgen.
- Für Echtzeit-3D höchstens sechs Sichtprüfungen; kleinere Usergrenze gewinnt. Nach drei bis fünf Verbesserungen derselben Eigenschaft zur nächsten wichtigen wechseln.
- Eine Sitzungsausnahme des Users (siehe Kopf) hebt die Freigabepflicht auf. Sie hebt die Sechsergrenze und den Dauerwirt aus `AGENTS.md` nicht auf — beide schützen den Rechner, nicht die Regel.

### Electron startup smoke

- Changes to Electron Main/Preload, app-provider trees, the embedded client or runtime, startup URL, runtime manager, or packaged startup need a **matching real Electron startup smoke** before completion. Typecheck and build alone are not enough.
- Matching means opening the changed entry and visible target in a fresh process. Test packaged-start changes in the built package; test Notes-provider changes through the real Notes entry.
- Run only with current Browser/Playwright permission from §5. Without it, keep the smoke open and do not claim full runtime completion. A direct user request for an Electron startup test grants this permission.
- Use a verified free isolated port, short session name, and separate test profile. Capture page errors, relevant console events, and failed requests. Stop only owned processes and confirm port cleanup.
- Before the next experiment, add each new or repeated finding to the active task with command/URL, setup, artifact, cause, what not to repeat, and next stable route.

## 6. Checks und Testmenge

- Zusammenhängenden Teil fertigstellen, dann stärksten passenden Projektcheck einmal für alle eigenen Änderungen ausführen.
- Funde sammeln, gemeinsam beheben und normalerweise genau einen Kontrolllauf starten.
- Gleichen Check ohne Änderung oder neue Frage nicht wiederholen. Gleicher Fehler braucht eine andere Ursachenprüfung oder Lösung.
- TypeScript und CI belegen Codesicherheit, nicht Produktqualität, Optik, Lesbarkeit oder Spielgefühl.
- `include` und `exclude` nie verkleinern, nur damit ein Check grün oder schneller wird.
- Vorhandene Projekt-, Cache- und Heap-Skripte nutzen. Bei umgeleiteten Logs Exit-Code und Inhalt prüfen. Cache nur bei belegtem Verdacht über das Clean-Skript löschen.
- Reine Doku-, Prompt- und Regeländerungen brauchen keinen Typecheck.

Ohne Userauftrag oder klare Projektpflicht keine neuen Tests oder Testeinstellungen anlegen und keinen Dev-Server, Browser, Screenshot-, UI- oder Gameplay-Test starten.

## 7. Git und Lieferung

- Nur eigene Dateien stagen; nie `git add -A` nutzen. Fremde Änderungen oder Staging-Einträge nicht übernehmen oder zurücksetzen.
- Zielbranch ist `main`, außer lokale Regeln nennen einen anderen. Branch oder Worktree nie ohne Userauftrag anlegen, wechseln oder öffnen.
- Jede zusammenhängende und bei Code kompilierfähige Einheit selbst committen und pushen. Titel: `typ(bereich): was`.
- Submodule zuerst innen committen und pushen; danach im Hauptprojekt Zeiger und eigene Hauptprojektdateien committen.
- Vor Abschluss Remote-Stand abrufen und sauber einbauen; nichts still verwerfen.
- Commit- und Push-Fehler beheben. Hooks nie mit `--no-verify` umgehen.
- Vor Commit Status, gestagte Dateiliste, gestagten Diff und `diff --check` prüfen. Danach Hash, Remote-Abgleich und Reststatus melden.

## 8. Sprache und Übergabe

Neue teuer belegte Erfahrung nach [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md) speichern. Technische Tipps bleiben prüfbar; die gemessen bessere Lösung gewinnt.

Für Antworten, Prompt-, Task- und Doku-Dateien:

- Ergebnis zuerst; Alltagswörter, direkte Verben, möglichst wenige token-effiziente Stichpunkte.
- Zahlen für Reihenfolge, Pfeile für kurze Abläufe und Checkboxen nur für echte Todos nutzen. Icons sparsam einsetzen.
- Problem, Ursache und Änderung konkret nennen. Füllwörter, Wiederholungen und unnötige Satzteile entfernen.
- Schwierige Begriffe kurz erklären; keine Abkürzungen erfinden und keine lange Ich-Erzählung schreiben.
- UTF-8 und echte Umlaute nutzen; Doku automatisch auf kaputte Zeichen prüfen.
- Chat-Antworten und erzeugte Ausgaben in einfachem Englisch mit starkem Gen-Z-Ton schreiben; Klarheit gewinnt.
- Code, Namen und Code-Kommentare auf Englisch schreiben.

### Wörter, die wir nicht ohne Erklärung nutzen

| Nicht so | Besser so |
|---|---|
| `kanonisch` | `maßgeblich` oder `gemeinsame Hauptquelle` |
| `normalisieren` | `prüfen und vereinheitlichen` |
| `Raw` | `unverändertes Original` |
| `Scope` | `Arbeitsumfang` |
| `Owner` | `zuständige Datei` oder `verantwortlicher Teil` |
| `Fan-in` | `Ergebnisse zusammenführen` |
| `Gate` | `Prüfung` oder `Freigabepunkt` |
| `bounded` | `mit klarer Obergrenze` |

Exakte Code-, API-, Datei- oder Befehlsnamen dürfen diese Wörter behalten; dann ihre Bedeutung kurz erklären.

### Übergabe nach Kontextkürzung

- Höchstens sechs Abschnitte mit je acht kurzen Stichpunkten: Auftrag · Stand · nächster Schritt · Fallen · Dateien · Startbefehl.
- Prompt- und Taskpfad direkt nennen und bei jedem Folgestart behalten.
- Zahlen, Pfade, Befehle und Hashes statt langer Herleitung nutzen; Ursachen, Grenzen und Abhängigkeiten behalten.
- Erledigtes nicht wiederholen.

### Abschluss nach Änderungen

1. **Done:** Ziel und Ergebnis.
2. **Benefit:** Was geht besser?
3. **View:** genaue Datei, Route oder Artefaktpfad.
4. **Test:** ein bis drei Schritte plus erwartetes Ergebnis.
5. **Tech:** Checks, Build, Commit, Hash und Remote-Abgleich.
6. **Problem/Cause:** nur wenn wichtig.

Neue Artefakte mit vollständigem Projektpfad nennen. Finale Bilder, Konzepte und Exporte im Projekt speichern, nicht nur in Temp-, AppData- oder Chatpfaden.

## 9. Schnellcheck vor „fertig“

- [ ] Unverändertes Original und verlustfreier `Improved prompt` in der einen `…-enhanced-prompt.md` gespeichert und unter `Initial goal` verlinkt?
- [ ] Default oder optionales Keyword korrekt angewendet, ohne Verneinungen, Zitate, leere Kennzeilen oder Platzhalter als neue Aufträge zu missverstehen?
- [ ] Userauftrag, `AGENTS.md`, Prompt, Task, Phasen und Abnahmepunkte erfüllt?
- [ ] Problem vollständig gelöst und schwache Grundlage statt Mini-Fixes repariert?
- [ ] Repository-/Referenzübernahme Ende zu Ende qualitätsgetreu integriert und verdrängte Altwege ohne Produktionsreferenz entfernt?
- [ ] Jede neue oder geänderte handgepflegte Codedatei höchstens 1.200 Zeilen?
- [ ] Passende Fachdatei gelesen; UTF-8, Links, Dateiende, Diff und Checks grün?
- [ ] Nur eigene Dateien gestagt, committed und gepusht; Remote-Stand eingebaut?
- [ ] Übergabe enthält Enhanced-Prompt- und Taskpfad; finale Antwort ist einfaches Englisch?
