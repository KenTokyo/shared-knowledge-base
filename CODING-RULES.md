# Coding Rules — kompakter Arbeitsvertrag

**Ziel:** Verstehe den Auftrag, halte sein Original fest, plane nachvollziehbar, arbeite selbstständig und liefere eine saubere fertige Einheit.

**Priorität:**

1. aktueller Userauftrag und seine unveränderte Prompt-Quelle;
2. lokale `AGENTS.md` des Projekts;
3. diese Coding Rules;
4. nur passend ausgelöste Fachregeln und Learnings.

## 1. Prompt-Quelle, Task und Lesepfad

### Pflichtpaar für Projektarbeit

Jeder Auftrag, der Repository-Dateien oder ein Projektartefakt ändert, erhält **vor der Umsetzung** genau ein zusammengehöriges Paar:

- `…-prompt.md` — unveränderliche Quelle für Usertext und optionale Prompt-Verbesserung;
- `…-tasks.md` oder vorhandene lokale Task-/Masterdatei — veränderlicher Ausführungsplan.

Reine Fragen und reine Leseaufträge ohne Projektänderung brauchen kein Paar. Ein kleiner Fix erhält eine kurze Phase statt gar keiner Taskdatei.

Regeln für das Paar:

- Beide Dateien liegen im selben Taskordner, sofern die Projektkonvention keinen anderen Ort verlangt.
- Neue Paare teilen einen sprechenden Namensstamm: `<thema>-prompt.md` und `<thema>-tasks.md`.
- Jede Taskdatei enthält direkt oben `## Initial goal` mit relativem Pfad zur Prompt-Datei.
- Die Prompt-Datei besitzt das Ziel; die Taskdatei leitet daraus Scope, Phasen, Entscheidungen und Status ab.
- Raw Prompt nie in der Taskdatei duplizieren. Ein kurzer Zielsatz ist erlaubt.
- Bestehenden Plan fortführen, keinen Konkurrenzplan bauen. Fehlt ihm eine Prompt-Datei, vor dem nächsten Edit eine Begleitdatei aus dem noch verfügbaren Originalauftrag anlegen; unbekannte ältere Teile ehrlich als nicht verfügbar markieren.
- Neuer User-Nachtrag zum selben Ziel wird datiert an dieselbe Prompt-Datei angehängt. Originaltext nie umschreiben.
- Task gilt nicht als fertig, wenn Prompt-Datei fehlt, Link gebrochen ist oder Plan dem Prompt widerspricht.

### Inhalt der Prompt-Datei

Die Prompt-Datei trennt Quellen und Ableitungen klar:

1. `## Source` — Datum, Chat-/Dateireferenz und Anhänge.
2. `## Raw user request` — Usertext in Originalsprache und Reihenfolge; Pfade, Befehle, Zahlen, Bildreferenzen und Grenzen erhalten.
3. `## Prompt improvement request` — nur bei echtem Verbesserungsmarker.
4. `## Improved executable goal` — nur wenn der Marker eine echte Anweisung enthält.
5. `## Updates` — spätere Useränderungen append-only mit Datum.

Secrets, Tokens und Passwörter nie persistieren; im Raw-Bereich als `[REDACTED]` mit kurzer Begründung markieren. Zeilenenden und unsichtbare Endspaces dürfen für Markdown-Hygiene normalisiert werden; Inhalt sonst nicht kürzen oder glätten.

### Flexibler Verbesserungsmarker

Kanonisches Format:

```text
Prompt-Verbesserung:[Keywords oder freie Anweisung]
```

- Groß-/Kleinschreibung sowie Bindestrich oder Leerzeichen tolerant erkennen.
- Klammerinhalt ist eine offene Anweisung, keine feste Enum. Beispiele: `kompakt`, `Architektur`, `Edge-Cases`, `Performance`, `UI/UX`, beliebige Kombination oder Freitext.
- Leerer Inhalt oder Platzhalter wie `[HIER …]` zählt als **kein** Verbesserungsauftrag.
- Ohne echten Marker enthält die Prompt-Datei nur den Raw Prompt und spätere Updates; keine künstliche Neufassung erfinden.
- Mit Marker schreibt **dieselbe ausführende KI** darunter den verbesserten Zielprompt und setzt genau diesen um. Keine zweite KI, kein zweiter Provider und kein separater Enhancer-Prozess nur für diesen Workflow.
- Verbesserung darf Rolle, Reihenfolge, Abnahme und nötige Edge-Cases klären, aber keine Fakten, Features oder Grenzen erfinden.
- Userabsicht, Sprache, Negationen, Pfade, Befehle, Referenzen, Maße und harte Eigenschaften bleiben erhalten.
- Raw Prompt und verbesserter Prompt bleiben getrennt; Verbesserung überschreibt nie die Quelle.

Ein produktseitiger Prompt-Enhancer darf als eigenes optionales Werkzeug bestehen. Er ist nicht Voraussetzung für diesen Datei-Workflow.

### Context Condense, Handover und Subagents

Sobald ein Taskpaar existiert, nennt jede Übergabe und jeder Context-Condense-Start direkt:

```text
- Prompt: <workspace-relativer Pfad zur *-prompt.md>
- Task: <workspace-relativer Pfad zur Task-/Masterdatei>
```

- Folgeagent liest Prompt zuerst, danach Taskstatus und erst dann Code.
- Subagent-Routing trägt Taskpfad und exakte Task-ID; die Taskdatei hält den Promptpfad als `Initial goal`. Der Child liest erst den verlinkten Prompt, dann sein Todo.
- Fan-in und Abschluss lesen beide Dateien erneut. Kontextkürzung darf die Prompt-Referenz nie entfernen.

### Normaler Lesepfad

1. lokale `AGENTS.md` komplett lesen;
2. diese Datei komplett lesen;
3. verlinkte Prompt-Datei, danach bestehende Taskdatei lesen oder neues Paar anlegen;
4. nur den engsten ausgelösten Fachowner lesen.

Fachowner:

- React, State, Hydration, Browser-UI → [FRONTEND-RULES.md](FRONTEND-RULES.md)
- Echtzeit-3D → [THREEJS-RULES.md](THREEJS-RULES.md)
- vollständiger Weltbau → [THREEJS-WORLDBUILDING-RULES.md](THREEJS-WORLDBUILDING-RULES.md)
- freigegebene CLI-Captures → [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md)
- neue belegte Learnings → [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md)
- Windows-Ressourcen, Nachbarrepo oder Port → [WINDOWS-RESSOURCEN.md](WINDOWS-RESSOURCEN.md)
- macOS-Ressourcen, Nachbarrepo oder Port → [MACOS-RESSOURCEN.md](MACOS-RESSOURCEN.md)
- mehrere Lieferphasen → [Phasenworkflow](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md)

Externe API oder Bibliothek → aktuelle Originaldokumentation nur zur offenen Frage lesen. Ein Link allein ist kein Leseauftrag; keine Linkketten vorsorglich öffnen.

Vor großem Leseblock kurz festhalten: **Auftrag · Leseliste · Befund je Datei · nächster Schritt**. Suche beenden, sobald die Änderung sicher entschieden ist.

## 2. Prüfen, entscheiden, durcharbeiten

- Aussage, Diagnose oder Plan erst nach Code, Doku, Log, Messung oder klarer Logik übernehmen.
- Speech-to-Text-Fehler mitdenken; Beispiele und Referenzen stärker als wahrscheinlich falsche Einzelwörter gewichten.
- Lösung A verbessern, nicht still zu B wechseln. Vor großer Änderung fragen: **Löst das das genannte Problem?**
- Explizite Maße, Eigenschaften, Superlative und Negationen als harte Grenzen schützen.
- „Übernehmen“ bedeutet Zielparität in Funktion, Verhalten, Datenfluss und Qualität.
- Kleine Lücke klein beheben; schwache Grundlage zusammenhängend umbauen. Wenige Zeilen sind kein Ziel.
- Altcode prüfen, nicht automatisch verteidigen. Schädlichen Altpfad im Lieferweg entfernen statt Notlösungen stapeln.
- Bei echter Unsicherheit: Problem abstrahieren → lokale Geschwisterlösung + Originaldoku prüfen → 2–3 tragfähige Wege vergleichen → besten Weg wählen.
- Setup-Fehler wie falscher Ordner, fehlende Installation oder Portkonflikt nicht als Produkt-Workaround verstecken.

Bei klarem Auftrag nicht nachfragen. Arbeiten bis Ziel, letzter Phase oder echter äußerer Blockade fortsetzen. Stoppen nur bei fehlendem Secret/Zugang, widersprüchlichen Pflichtdaten oder nicht erlaubter irreversibler Aktion; dann genau eine fehlende Information nennen.

Im bearbeiteten Lieferweg:

- sichtbaren Fehler, Typfehler, tote Referenz, kaputte Doku, falsche Rechnung und eigene Regression direkt beheben;
- fremde offene Änderungen weder überschreiben noch zurücksetzen;
- fremden Blocker minimal und additiv reparieren, klar nennen, weiterarbeiten;
- auftragsfremden Fund nicht zum neuen Großprojekt machen.

## 3. Taskphasen und Arbeitsloop

Jede Phase enthält kompakt:

1. **Ziel** — sichtbares oder prüfbares Ergebnis.
2. **Todos** — klare `[ ]`/`[x]`-Punkte.
3. **Ergebnis** — ein kurzer Satz.
4. **Warum** — nur wenn nicht offensichtlich.
5. **Grenzen** — Regeln und harte Limits.
6. **Architektur** — Hauptquelle, Besitzer, Datenfluss.
7. **Funde** — Fehler und Performance-Risiken nach Schwere + Fixstatus.
8. **Referenzen** — höchstens drei Hauptpfade, einschließlich Promptdatei wenn sie für die Phase zentral ist.

Reihenfolge: Grundlage → kompletter Hauptweg → Sonderfälle → Feinschliff → Endcheck. Jede Phase bleibt kohärent, rückbaubar und möglichst prüfbar.

Arbeitsloop:

1. Prompt, Taskstatus, Scope, Architektur, Git-Diff und Werkzeuge prüfen.
2. Eng gekoppelte Todos vollständig umsetzen.
3. Kanonische Checks einmal für den zusammenhängenden Teil ausführen.
4. Funde gemeinsam beheben; danach normalerweise ein Kontrolllauf.
5. Phase einmal aktualisieren und direkt zur nächsten offenen Phase wechseln.
6. Am Ende Raw Prompt, verbessertes Ziel falls vorhanden, Task und alle Abnahmepunkte erneut lesen.

Frühere Ergebnisse append-only erhalten; nichts rückwirkend erfinden. Ab etwa 600 Taskzeilen nach Projektkonvention teilen und gegenseitig verlinken. Offene gekoppelte Findings als Todos schließen; nur wirklich eigener Folgescope bekommt eine separate Optimierungsplanung.

### Subagents nur bei echtem Gewinn

- Kleine, sequenzielle oder eng gekoppelte Arbeit bleibt beim Hauptagenten.
- Nach großen unabhängigen Fachbereichen teilen, nie nach Mini-Aufgaben.
- Exklusive Dateien, Zustände und Task-IDs vergeben; bei Kollisionsrisiko einen Owner oder serielle Übergabe wählen.
- Kleinste ausreichende Agentenzahl nutzen; kein Agent für wenige Toolaufrufe, eine Datei oder einen einfachen Check.
- Auftrag nennt Task, Task-ID, Ziel, In-/Out-of-Scope, eigene Pfade, Abhängigkeiten, Rückgabe und Stoppgrenze; Prompt bleibt über `Initial goal` erreichbar.
- Hauptagent führt Ergebnisse zusammen, prüft Schnittstellen und wiederholt delegierte Arbeit nicht.

## 4. Code und Architektur

- Vor Änderung Hauptquelle, Verantwortung und Datenfluss verstehen.
- Erst Struktur und kompletter Hauptweg, danach Werte, Optik und Feinschliff.
- Wiederholt instabiler Bereich: Mehrfachquellen und Altcode prüfen → eine verlässliche Quelle bauen → alle Consumer anbinden → toten Weg löschen.
- „Komplett neu“ heißt Inhalt neu aufbauen, nicht nur Farben oder Zahlen drehen.
- Keine versteckten harten Grenzen oder Qualitätsverluste als Performance-Fix.

### Datei- und Besitzgrenzen

- Eine Datei besitzt ein Fachziel; unabhängige UI, Assets, Datenmodelle und Services trennen.
- Keine wachsenden `entries.ts`-, `config.ts`-, `data.ts`-, `misc.ts`- oder `helpers.ts`-Sammeldateien.
- Aggregatoren importieren/exportieren; Featurelogik bleibt beim Feature.
- Shared-Modul nur bei echter Wiederverwendung, sonst Helper beim fachlichen Owner.
- Globale Module importieren kein Feature.
- Handgepflegte Codedatei maximal **1.600 physische Zeilen**. Neue/geänderte Datei nie darüber liefern; berührte Altdatei darüber im Auftrag fachlich teilen.
- Generatorausgabe und unveränderter Vendor-Code sind ausgenommen.
- Nach Umbau ungenutzten Code, Imports, Zustände und Verweise löschen.

### Datenfluss und Performance

- Single Source of Truth festlegen; parallele Stores und Ping-Pong-Synchronisation vermeiden.
- Daten gesammelt laden; unabhängige Arbeit parallelisieren; N+1-Zugriffe vermeiden.
- Teure Arbeit passend bündeln, poolen, cachen oder vorbacken.
- Live-Collection nie im selben Iterator erweitern; Queue/Snapshot + `visited`-Set + hartes Sicherheitslimit nutzen.
- Neue Layer müssen sichtbaren Nutzen gegen Laufzeit, Speicher und Pflegekosten rechtfertigen.
- Performance darf Kernfunktion, Lesbarkeit oder belegte Qualität nicht still abbauen.

## 5. Fachrouter und Sichtprüfung

- React-/Frontend-Arbeit folgt [FRONTEND-RULES.md](FRONTEND-RULES.md); Details stehen nicht doppelt hier.
- Echtzeit-3D folgt [THREEJS-RULES.md](THREEJS-RULES.md) und genau einem passenden Fachowner.
- Agentische Browser-, Screenshot-, UI- oder Gameplay-Sichtprüfung braucht eine **ausdrückliche Freigabe im aktuellen Userauftrag**. Schweigen, frühere Freigabe, sichtbarer Scope oder eigene Unsicherheit reichen nicht.
- Ohne Freigabe schließt der Agent technische Arbeit statisch ab; der User übernimmt direkte Sicht-/Spielgefühl-Abnahme.
- Mit Freigabe erst vollständig umsetzen und statisch prüfen, dann projekteigenes CLI nutzen. Technischer Capture-Owner: [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md).
- Für Echtzeit-3D höchstens sechs Sichtprüfungen im gesamten Auftrag; kleinere Usergrenze gewinnt. Gleiche Frage oder unverändertes Bild nicht erneut prüfen.
- Nach 3–5 Verbesserungen derselben 3D-Messachse Achse schließen und zur nächsten relevanten Dimension wechseln.

## 6. Checks und Testbudget

- Zusammenhängenden Teil fertigstellen, dann stärksten kanonischen Projektcheck einmal für alle eigenen Änderungen ausführen.
- Funde bündeln und normalerweise genau einen Kontrolllauf starten.
- Gleichen Check ohne Änderung oder neue Frage nicht wiederholen; wiederholter Fehler verlangt andere Ursache oder Lösung.
- TypeScript und CI belegen Code-Sicherheit, nicht Produktqualität, Optik, Lesbarkeit oder Spielgefühl.
- `include`/`exclude` nie für künstlich grünes oder schnelles Gate verkleinern.
- Vorhandene Cache-, Heap- und Projektscripts statt eigenem blanken Check nutzen.
- Umgeleitete Logs brauchen Exit-Code + Inhalt; leeres Log ist kein Erfolg, wenn Prozess timeoutet oder beendet wurde.
- Cache nur bei belegtem Verdacht über vorhandenes Clean-Script löschen.
- Reine Doku-, Prompt- und Regeländerung braucht keinen Typecheck.

Ohne Userauftrag oder klare Projektpflicht nicht:

- neue Unit-, Integration- oder End-to-End-Tests anlegen;
- Testkonfiguration ändern;
- Dev-Server oder Browser vorsorglich starten;
- Screenshot-, UI- oder Gameplay-Test starten.

## 7. Git und Lieferung

- Nur eigene Dateien stagen; nie pauschal `git add -A`.
- Fremde Änderungen und fremde Staging-Einträge nicht übernehmen, resetten oder in eigene Commits mischen.
- Zielbranch `main`, außer lokale `AGENTS.md` nennt einen anderen.
- Branch oder Worktree nie ohne ausdrücklichen Userauftrag anlegen, wechseln oder öffnen.
- Jede konsistente, bei Code kompilierfähige Einheit selbst committen und pushen.
- Commit-Titel einzeilig und konkret: `typ(bereich): was`.
- Submodule zuerst innen committen und pushen; danach im Elternrepo nur neuen Pointer + eigene Elternänderungen committen.
- Vor Abschluss Remote fetch prüfen. Remote-Änderungen per Fast-forward oder sauberem Rebase/Merge integrieren; nichts still verwerfen.
- Push-/Commit-Fehler selbst beheben; keine Hooks mit `--no-verify` umgehen.
- Vor Commit Status, gestagte Dateiliste, staged Diff und `diff --check` prüfen; danach Hash, Remote-Sync und Reststatus melden.

## 8. Wissen, Schreiben und Übergabe

- Neue teuer belegte Erfahrung nach [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md) speichern; keine zweite Formatkopie hier pflegen.
- Technische Tipps bleiben widerlegbar; gemessen bessere Lösung gewinnt.

Gilt für Antworten, Prompt-, Task- und Doku-Dateien:

- Ergebnis zuerst; Alltagswörter und direkte Verben nutzen.
- Kurze Stichpunkte, ein Gedanke pro Punkt; Zahlen für Reihenfolge, Pfeile für kurze Abläufe, Checkboxen für echte Todos.
- Icons sparsam einsetzen; nicht alle Formate zugleich nutzen.
- Problem, Ursache und Änderung konkret nennen.
- Füllwörter, Wiederholungen, unnötige Einleitungen und Satzteile streichen, ohne Information zu verlieren.
- Schwierige Begriffe kurz erklären; keine erfundenen Abkürzungen.
- Keine lange Ich-Erzählung und keine unnötigen Aufgaben an den User.
- UTF-8 + echte Umlaute; Doku automatisiert auf Mojibake prüfen.
- Chat-Antworten und erzeugte Outputs in einfachem Englisch mit leichtem Gen-Z-Ton schreiben; Klarheit gewinnt.
- Code, Namen und Code-Kommentare auf Englisch schreiben.

### Übergabe und Context Condense

- Startbefehl statt Arbeitsbericht; kompakte Markdown-Stichpunkte, höchstens sechs Abschnitte × acht Zeilen.
- Abschnitte: Auftrag · Stand · nächster Schritt · Fallen · Dateien · Startbefehl.
- Prompt- und Taskpfad stehen direkt im Auftrag/Dateiblock und bleiben in jedem Folgestart erhalten.
- Zahlen, Pfade, Befehle und Hashes statt langer Herleitung; Ursachen, Grenzen und Abhängigkeiten trotzdem erhalten.
- Erledigte und bereits dokumentierte Arbeit nicht wiederholen.

### Abschluss nach Änderungen

1. **Fertig:** Ziel und konkretes Ergebnis zuerst.
2. **Nutzen:** Was geht jetzt besser?
3. **Ansehen:** genaue Datei, Route oder Artefaktpfad.
4. **Testen:** 1–3 Schritte + erwartetes Ergebnis; wenn nicht manuell testbar, Grund nennen.
5. **Technik:** Checks, Build, Commit, Hash und Remote-Sync.
6. **Problem/Ursache:** nur wenn für Ergebnis oder Blockade wichtig.

Neue Artefakte immer mit vollständigem Projektpfad nennen. Finale projektgebundene Bilder, Konzepte und Exporte im Projekt speichern, nicht nur unter Temp, AppData oder Chatpfaden.

## 9. Schnellcheck vor „fertig“

- [ ] Raw Prompt unverändert gespeichert und in Task unter `Initial goal` verlinkt?
- [ ] Echter `Prompt-Verbesserung`-Marker exakt umgesetzt, leerer/fehlender Marker nicht erfunden?
- [ ] Userauftrag, lokale `AGENTS.md`, Prompt und Task vollständig erfüllt?
- [ ] Vorhandenen Plan fortgeführt und alle Phasen/Abnahmepunkte erneut gelesen?
- [ ] Kleine Lösung nur gewählt, wenn sie Problem vollständig löst?
- [ ] Schlechte Grundlage repariert statt Mini-Fixes gestapelt?
- [ ] Jede neue/berührte handgepflegte Codedatei höchstens 1.600 Zeilen?
- [ ] Passenden Fachowner gelesen, universelle Regeln nicht dupliziert?
- [ ] UTF-8, Links, Dateiende, Diff und relevante Checks grün?
- [ ] Nur eigene Dateien gestagt, committed und gepusht; Remote integriert?
- [ ] Handover/Context Condense enthält Prompt- und Taskpfad?
- [ ] Finale Antwort einfach, direkt, Englisch und leicht Gen Z?
