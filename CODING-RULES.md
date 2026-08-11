# Coding Rules — klare Regeln für gute Arbeit

**Ziel:** Baue saubere, schnelle und gut wartbare Lösungen. Arbeite selbstständig. Liefere fertige Arbeit.

**Diese Reihenfolge gilt:**

1. aktueller Userauftrag;
2. lokale `AGENTS.md` des Projekts;
3. diese Coding Rules;
4. Fachregeln und Learnings, wenn der Auftrag sie wirklich braucht.

Fachthemen haben eigene Hauptquellen:

- Echtzeit-3D → [THREEJS-RULES.md](THREEJS-RULES.md)
- Weltbau → [THREEJS-WORLDBUILDING-RULES.md](THREEJS-WORLDBUILDING-RULES.md)
- neue Learnings → [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md)

## 1. Erst lesen, dann bauen

Lies immer in dieser Reihenfolge:

1. lokale `AGENTS.md` komplett;
2. diese Datei komplett;
3. nur die Fachdateien, die für den Auftrag nötig sind.

Öffne weitere Dateien nur bei einem klaren Grund:

- Es gibt schon einen Plan → diesen Plan weiterführen. Keinen zweiten Plan bauen.
- Der Auftrag hat mehrere große Teile → einmal den [Phasenworkflow](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md) lesen.
- Der Auftrag betrifft Echtzeit-3D → `THREEJS-RULES.md` und danach nur den kleinsten passenden Fachbereich lesen.
- Ein bekanntes Problem passt zu einem Projekttipp → genau einen passenden Tipp lesen.
- Du brauchst einen Windows-Pfad, ein Nachbarprojekt oder einen Port → [WINDOWS-RESSOURCEN.md](WINDOWS-RESSOURCEN.md) lesen.
- Du brauchst einen macOS-Pfad, ein Nachbarprojekt oder einen Port → [MACOS-RESSOURCEN.md](MACOS-RESSOURCEN.md) lesen und dortige Pull-Regel beachten.
- Du nutzt eine externe API oder Bibliothek → aktuelle Original-Doku nur zur offenen Frage lesen.

Ein Link ist noch kein Leseauftrag. Öffne keine langen Linkketten auf Vorrat.

Vor einem großen Leseblock kurz festhalten:

- **Auftrag:** Ziel + klares Fertig-Kriterium in einem Satz.
- **Leseliste:** `offen/gelesen · Pfad · Grund`.
- **Befund:** pro Datei höchstens ein wichtiger Satz.
- **Danach:** direkt zum nächsten Arbeitsschritt zurückkehren.

Keine extra Protokolldatei bauen, außer User, Projekt oder echter Mehrphasen-Auftrag verlangt sie. Stoppe die Suche, sobald die nächste Änderung sicher ist.

## 2. Erst prüfen, dann glauben

Stimme nicht automatisch zu. Prüfe Aussagen mit Code, Doku, Logs, Messwerten oder klarer Logik.

- **Absicht verstehen:** Denke bei Sprach-zu-Text-Fehlern mit. Beispiele und Referenzen wiegen mehr als ein wahrscheinlich falsches Wort.
- **Beim Ziel bleiben:** Verbessere Lösung A. Wechsle nicht heimlich zu Lösung B.
- **Klare Wünsche schützen:** Maße, Eigenschaften und Wörter wie „komplett“ oder „maximal“ sind feste Grenzen.
- **Übernehmen heißt vollständig übernehmen:** Funktion, Verhalten, Datenfluss und Qualität müssen zum Ziel passen. Baue fehlende Grundlagen. Entferne den alten, ersetzten Weg.
- **Qualität bestimmt die Größe:** Ein kleiner Fix reicht nur, wenn er das Problem ganz löst. Sonst ist ein größerer Umbau richtig.
- **Altcode ist nur der Start:** Prüfe ihn zuerst. Repariere oder ersetze eine schlechte Grundlage.
- **Ganze Wirkung prüfen:** Bei sichtbaren Änderungen auch Theme, globale Styles, Shader, Tone Mapping, Material-Overrides, Flags, Cache, Normalisierung, Fallbacks und gespeicherte Daten prüfen.
- **Bei großem Umbau lieber sauber neu bauen:** Entferne den kaputten Bereich in einem klaren Schritt. Baue ihn danach mit einer guten Hauptquelle neu. Staple keine Notlösungen.
- **Bei echter Unsicherheit recherchieren:** Problem kurz fassen → ähnliche lokale Lösung + Original-Doku prüfen → 2–3 gute Wege vergleichen.
- **Setup-Fehler nicht im Produkt verstecken:** Falscher Ordner, fehlende Installation oder Portkonflikt zuerst direkt lösen.

Frage vor jeder größeren Änderung: **Löst das wirklich das genannte Problem?**

## 3. Nicht wegen kleiner Fragen stoppen

- Bei klarem Auftrag nicht nachfragen. Wähle die beste dauerhafte Lösung und setze sie um.
- Eine klare Empfehlung im vorhandenen Plan gilt als gewählt.
- Arbeite im Loop bis zum Userziel, zur letzten offenen Phase oder zu einer echten Grenze.
- Bitte zwischen Phasen nicht um Erlaubnis.
- Eine manuelle Sicht- oder Spielgefühl-Abnahme ist kein Technik-Todo. Schließe Technik ab und nenne das manuelle Gate ehrlich.

Stoppe nur bei einer echten äußeren Blockade, zum Beispiel:

- Secret oder Zugang liegt nur beim User;
- Pflichtangaben widersprechen sich;
- eine nicht erlaubte Aktion wäre dauerhaft oder zerstörerisch.

Nenne dann genau die eine fehlende Information. Keine lange Auswahlrunde.

Wenn du im bearbeiteten Bereich etwas findest:

- sichtbaren Fehler, TypeScript-Fehler, tote Referenz, kaputte Doku, falsche Rechnung oder eigene Regression direkt beheben;
- schädlichen Altcode im gleichen Lieferweg entfernen oder ersetzen;
- gekoppelte Änderungen mitnehmen, wenn sie für eine saubere Lösung nötig sind;
- fremde offene Änderungen nie zurücksetzen oder überschreiben;
- fremden Blocker im eigenen Lieferweg klein und additiv reparieren, klar nennen und weiterarbeiten;
- auftragsfremde Funde nicht zum neuen Großprojekt machen.

## 4. Planen und in ganzen Teilen arbeiten

1. Vorhandenen User- oder Projektplan weiterführen.
2. Kleinen, klaren Fix direkt bauen.
3. Größerer Umbau mit mehreren Teilen → genau eine Task- oder Masterdatei nach Projektart anlegen.
4. Reihenfolge: Grundlage → kompletter Hauptweg → Sonderfälle → Feinschliff → Endcheck.
5. Jede Phase muss zusammenpassen, rückbaubar und möglichst kompilierfähig sein.

Jede Phase in einer Taskdatei enthält:

1. **Ziel:** sichtbares oder prüfbares Ergebnis.
2. **Todos:** klare `[ ]`- und `[x]`-Punkte.
3. **Ergebnis:** ein kurzer Satz in einfacher Sprache.
4. **Warum:** nur wenn der Grund nicht klar ist.
5. **Grenzen:** wichtige Regeln und Limits.
6. **Architektur:** Hauptquelle, Besitzer und Datenfluss kurz erklären.
7. **Funde:** Fehler, Performance-Risiken und Fixweg nach Schwere sortieren.

Weitere Regeln:

- Pro Phase höchstens drei Hauptpfade.
- Frühere Ergebnisse nicht umschreiben oder erfinden.
- Taskdatei ab etwa 600 Zeilen nach Projektregel teilen und gegenseitig verlinken.

Arbeitsloop pro Phase:

1. Scope, Architektur, Git-Diff und vorhandene Werkzeuge prüfen.
2. Eng verbundene Todos komplett bauen.
3. Statische Projektchecks einmal für den ganzen Teil ausführen.
4. Alle Funde zusammen beheben. Danach meist ein Kontrolllauf.
5. Scheitert dieselbe Prüfung erneut → Ursache oder Lösung ändern. Nicht blind noch einmal starten.
6. Phase einmal aktualisieren.
7. Direkt mit der nächsten offenen Phase weitermachen.
8. Am Ende Auftrag und alle Abnahmepunkte noch einmal komplett lesen.

### Subagents nur bei echtem Gewinn

Subagents sind Helfer mit eigenem Kontext. Nutze sie nicht als Standard.

- Kleine, direkte oder eng gekoppelte Arbeit bleibt beim Hauptagenten.
- Teile nach großen unabhängigen Fachbereichen, nicht nach Mini-Aufgaben.
- Gib jedem Agenten eigene Dateien, Zustände und Task-IDs. Keine Überschneidung.
- Ist eine Schreibkollision möglich → einen Besitzer wählen oder nacheinander arbeiten.
- Starte ähnliche Arbeiten nicht parallel, wenn sie dieselben Dateien oder Daten brauchen.
- Nutze so wenige Agenten wie möglich.
- Kein Subagent für wenige Toolaufrufe, eine Datei, eine kleine Suche oder einen einfachen Check.
- Jeder Auftrag nennt Ziel, In-Scope, Out-of-Scope, eigene Pfade, Abhängigkeiten, Rückgabe und Stoppgrenze.
- Unabhängige Agenten zusammen starten. Der Hauptagent führt Ergebnisse zusammen und prüft Schnittstellen.
- Kein extra Review-Agent, wenn Hauptagent + Projektchecks dasselbe sicherer und günstiger schaffen.

Bei 3D-Arbeit gilt zusätzlich der [Deckel für 3–5 Verbesserungen](agents/MAX-5-VERBESSERUNGEN-DANN-WEITER.md): eine Achse schließen, dann die nächste wichtige Achse bearbeiten. Ein Audit zählt nicht als Verbesserung.

## 5. Code und Architektur

Diese Regeln gelten für App, Server, Daten, UI, Gameplay, 3D, Audio, Tools und Doku.

- Vor der Änderung Hauptquelle, Verantwortung und Datenfluss verstehen.
- Vorhandenes System nur nutzen, wenn es zum Ziel passt.
- Erst Struktur und kompletter Hauptweg. Danach Werte, Optik und Feinschliff.
- Kleine Lücke → kleiner Fix. Schwache Grundlage → größerer sauberer Umbau.
- Ändere Werte nur, wenn die Ursache wirklich bei den Werten liegt.
- Verstecke keine Qualitätsverluste oder harten Limits als „Performance-Fix“.

Wenn dieselbe Sache wieder falsch oder instabil bleibt:

1. Koordinaten, Mehrfachquellen, getrennte Schichten und alten Code prüfen.
2. Bereich sauber umbauen statt weitere Mini-Fixes stapeln.
3. Eine verlässliche Hauptquelle bauen.
4. Alle betroffenen Teile an diese Quelle hängen.
5. Alten Code, tote Imports, Zustände und Verweise löschen.

„Komplett neu“ heißt: Inhalt neu aufbauen. Nur Farben oder Zahlen ändern reicht nicht.

### Dateien und Besitzer

- Eine Datei hat ein klares Fachziel.
- Trenne unabhängige UI-Teile, Assets, Datenmodelle und Services.
- Keine wachsenden Sammeldateien wie `entries.ts`, `config.ts`, `data.ts`, `misc.ts` oder `helpers.ts`.
- Eine Sammeldatei darf importieren und exportieren. Die eigentliche Logik bleibt beim Feature.
- Shared-Modul nur bei echter Wiederverwendung. Sonst Helper beim Feature lassen.
- Dateiname erklärt den Inhalt. Fach-Doku bekommt einen klaren Namen statt `info.md` oder `notes.md`.
- Handgeschriebene Codedatei: höchstens 1.600 echte Zeilen.
- Neue oder geänderte Datei nie über 1.600 Zeilen liefern.
- Berührte Altdatei über 1.600 Zeilen im gleichen Auftrag sinnvoll teilen.
- Klar erzeugte Dateien und unveränderter Fremdcode sind ausgenommen.
- Nach einem Umbau ungenutzten Altcode löschen.

### Komponenten und Services

- Nie eine React-Komponente in einer anderen Komponente definieren. Sonst entsteht bei jedem Render ein neuer Typ und State kann verloren gehen.
- Props gehen nach unten, Callbacks nach oben.
- Bei tief geteiltem State vorhandenen Store nutzen. Keine langen Prop-Ketten oder Parallel-Stores bauen.
- Feature-Services, Finder und Actions bleiben beim Feature.
- Globale `lib`-Module sind nur für echte appweite Plattformlogik.
- Globale Module importieren kein Feature.
- Mit Datenbank: Finder lesen, Actions schreiben.

## 6. React, State und Laufzeit

- State unveränderlich aktualisieren.
- Stabile, eindeutige Keys nutzen.
- `useState` für Daten, die den Render ändern.
- `useRef` für veränderliche Laufzeitdaten ohne Renderbedarf.
- `useMemo`, `useCallback` und `React.memo` nur bei echtem Nutzen.
- Timer, Listener und Subscriptions immer aufräumen.
- In neuen Komponenten abgeleitete Werte direkt im Render berechnen.
- Event-Handler oder echte Store-Subscriptions statt unnötiger Effect-Ketten nutzen.

### Render und Hydration

- Im Render nie State, Store oder Context setzen.
- Setter nicht in andere Setter-Updates stecken.
- Zielwerte zuerst berechnen, Updates danach getrennt ausführen.
- Parent-State nicht per Effect „reparieren“. Sicheren Wert ableiten und direkt anzeigen.
- Interaktive Elemente nicht ineinander verschachteln.
- Klickbare Wrapper brauchen passende HTML-Bedeutung und Tastatursteuerung.
- Gleiche Daten nicht erneut zurückschreiben.
- Store-Actions müssen bei gleichem Wert den alten State zurückgeben.
- Normalizer nutzen stabile Defaults, nie `Date.now()` als Ersatzwert.
- Daten nur in eine Richtung aus der echten Quelle synchronisieren.
- Events und Snapshots nur senden, wenn sich ihr Inhalt wirklich ändert.

Diese Warnungen sind Stoppsignale:

- `Maximum update depth exceeded`
- `Too many re-renders`
- `Cannot update while rendering`
- `validateDOMNesting`
- Hydration-Warnung

Folge der Update-Kette bis zur ersten eigenen Datei. Behebe die Ursache. Warnung nie nur ausblenden.

### Kontrollierte Werte und schnelle Edits

- Tabs, Selects und Modi mit einer festen Erlaubtliste prüfen.
- Ungültiger Wert → sicherer Default.
- Event-Wert nie blind mit `as MyType` casten.
- State nur bei echter Änderung setzen.
- Nach schnellen Edits Imports, Dateiende, Klammern und doppelte JSX-Reste prüfen.
- Radix/Shadcn `asChild` braucht ein ref-stabiles Child. Bewegte oder bedingte Children in einen stabilen Wrapper setzen.

### Performance

- Unabhängige Fetches parallel starten.
- N+1-Abfragen vermeiden. Daten gesammelt laden.
- Teure Arbeit passend teilen, poolen, cachen oder vorab bauen.
- Jeder neue Layer muss seinen sichtbaren oder spielerischen Wert gegen Framezeit, Draw Calls, Speicher und Pflegekosten rechtfertigen.
- Eine Live-Liste nie im gleichen Iterator erweitern.
- Für Graphen, Flood-Fill, Nachbarn oder Spawn-Ausbreitung: Queue/Snapshot + `visited`-Set + festes Sicherheitslimit.
- Performance darf Kernfunktion, Lesbarkeit, Steuerung oder belegte Qualität nicht still abbauen.

## 7. Frontend und UI

- Erst Designsystem, Theme-Werte, globale Styles, Portal und Overflow prüfen.
- Mobile-first und platzsparend bauen.
- Wichtigste Aktion bleibt sichtbar.
- Seltene Optionen in Tooltip, Popover oder aufklappbaren Bereich legen.
- Dichte Toolbars nutzen zuerst klare Icons.
- Jeder Icon-Button braucht `aria-label`, Tooltip und klare Bedeutung.
- Deaktivierte Controls erklären den Grund.
- Bei fehlender Ressource Bedarf + aktuellen Wert zeigen.
- Dialoge brauchen eine klare, solide Fläche. Starke Transparenz oder Blur nicht als Hauptfläche nutzen, wenn Text schlecht lesbar wird.
- Dialog nicht direkt aus einem noch offenen modalen Menü starten. Menü zuerst schließen oder bewusst nicht-modal bauen.
- Ein hängen gebliebenes `body.style.pointerEvents = "none"` nicht mit globalem CSS verstecken.
- Layer-Probleme über Portal, Overflow und Stacking Context lösen. Nicht nur `z-index` erhöhen.
- Panels mit wechselndem Inhalt brauchen stabile Höhe und internes Scrollen.
- Vorhandene UI-Größen und Varianten nutzen. Keine zufälligen lokalen Abweichungen.
- „Juicy“ heißt: klare Gruppen, gute Form, passender Rand/Glow und kurze Reaktion über Transform/Opacity. Nicht mehr Text, Karten oder Deko-Icons.
- Browser-, DOM-, Screenshot-, UI- oder Gameplay-Prüfung nur starten, wenn der aktuelle Userauftrag sie erlaubt. Dann sparsam und mit klarer Prüffrage arbeiten.

## 8. Echtzeit-3D

Zusätzlich immer `THREEJS-RULES.md` beachten.

- Kleine sichtbare Lücke klein beheben.
- Fehlen Maßstab, Tiefe, Charakter oder Spielwert → großen, zusammenhängenden und rückbaubaren Umbau bauen.
- Gekoppelte Anforderungen in einem Zug umsetzen. Beim Bauen keine Bildschleife nach jedem Mini-Schritt starten.
- Agentische Sichtprüfung nur mit klarer Freigabe im aktuellen Auftrag.
- Schweigen, alte Freigabe, sichtbarer Scope oder eigene Unsicherheit sind keine Freigabe.
- Ohne Freigabe übernimmt der User die direkte Bild- und Gameplay-Abnahme.
- Mit Freigabe: erst komplett bauen, statisch prüfen, dann Projekt-CLI nutzen.
- Höchstens sechs Sichtprüfungen im ganzen Auftrag. Eine kleinere Usergrenze gilt.
- Bei großer visueller Arbeit: bis zu fünf klare Sichtfragen, sechste Prüfung nur für den wichtig korrigierten Endstand oder eine neue Frage.
- Combat- und Skill-VFX entstehen aus eigenem handgeschriebenem Shadercode + Laufzeit-Geometrie.
- Für diese VFX verboten: Bitmap-/Noise-/LUT-Texturen, Sprite-Sheets, Flipbooks, Videos, gebackene VFX-Meshes und importierte Effektpakete.
- Renderer-interne Depth-/Color-Targets und normale Charakter-/Weltassets sind nicht gemeint.
- Technische VFX-Regeln → `threejs/VFX.md`.
- Nach 3–5 Änderungen an derselben Messachse zur nächsten 3D-Achse wechseln.

## 9. Checks und Testbudget

- Erst einen zusammenhängenden Teil fertig bauen.
- Danach genau den normalen statischen Projektcheck für alle eigenen Änderungen starten.
- Alle Funde zusammen beheben.
- Danach meist ein Kontrolllauf.
- Gleichen Check ohne Änderung oder neue Frage nicht wiederholen.
- Wiederholter Fehler → Ursache prüfen, nicht blind neu starten.
- TypeScript und CI zeigen Code-Sicherheit. Sie beweisen nicht Produktqualität.
- Nutze den stärksten passenden Gegencheck statt viele Routinechecks.

Ohne Userauftrag verboten:

- neue Unit-, Integration- oder End-to-End-Tests;
- Testkonfiguration ändern;
- Dev-Server vorsorglich starten;
- Browser-, Screenshot-, UI- oder Gameplay-Test starten.

### TypeScript und statische Checks

- Nach Codeänderung gilt exakt der Befehl aus lokaler `AGENTS.md`.
- Für `voxel-samurai-quiz`: `pnpm type-check`.
- `include` oder `exclude` nie kleiner machen, nur damit der Check grün wird.
- Vorhandene Cache- und Speicher-Scripts nutzen. Nicht einfach eigenes `tsc --noEmit` starten.
- Bei Logdatei Exit-Code + Inhalt prüfen.
- UTF-16LE-BOM kann `grep` täuschen. Bei Bedarf Encoding erkennen und `error TS` oder `ELIFECYCLE` dekodiert suchen.
- Leeres Log ist nicht automatisch Erfolg. Prozess kann abgebrochen oder getötet worden sein.
- Cache nur bei klarem Verdacht mit vorhandenem Clean-Script löschen.
- Reine Doku-, Prompt- und Regeländerung braucht keinen Typecheck.
- Ein grüner Check beweist keine Optik, Lesbarkeit, FPS oder gutes Gameplay.

### Referenz oder Bild prüfen

Nur mit passender Userfreigabe:

1. Erst Projekt-Pfadkarte, `package.json` und passende `scripts/` prüfen.
2. Wenn vorhanden, projekteinigenes CLI-Capture nutzen.
3. [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md) nur lesen, wenn Einstieg fehlt oder unklar ist.
4. Ein headless Chromium für alle Messungen nutzen.
5. Bei Software-Renderer sofort abbrechen.
6. PNG direkt aus dem Engine-Post-Target lesen; bei Three.js über `readRenderTargetPixels()`.
7. Kein `page.screenshot()` und kein sichtbarer Browser.
8. Erst Maße, Rauschboden und echten Messbereich prüfen.
9. Pro Sichtfrage nur den stärksten fairen Vorher/Nachher- oder Gewinner/Verlierer-Vergleich ansehen.
10. Gleiche Bilder oder gleiche Fragen nicht neu prüfen. Nach spätestens sechs Sichtprüfungen stoppen.

## 10. Sichtbare Qualität

**Erfolg heißt Wirkung, nicht nur Häkchen.**

- Wenige Codezeilen sind kein Qualitätsmaß.
- Grüne Checks allein reichen nicht.
- Das Ergebnis muss die App wirklich verbessern.
- Nutzerwichtige Teile bekommen besonders viel Sorgfalt.
- Unsichtbare Technik bleibt so einfach und verlässlich wie möglich.

## 11. Git und Lieferung

- Nur eigene Dateien stagen. Nie pauschal `git add -A`.
- Fremde offene Änderungen nicht anfassen.
- Zielbranch ist `main`, außer lokale `AGENTS.md` nennt einen anderen.
- Branch oder Worktree nie selbst anlegen, wechseln oder öffnen, außer der User verlangt es.
- Jede kompilierfähige Einheit selbst committen und pushen.
- Reine Doku-Einheit committen, sobald sie in sich stimmt.
- Commit-Titel: eine klare Zeile im Format `typ(bereich): was`.
- Submodule zuerst innen committen und pushen.
- Danach im Elternrepo nur neuen Submodule-Pointer + eigene Elternrepo-Dateien committen.
- Commit- oder Push-Fehler selbst lösen.
- Abgelehnten Push mit `git pull --rebase` abgleichen, Konflikte sauber lösen, Rebase fortsetzen und erneut pushen.
- Fremde Staging-Einträge nicht übernehmen oder zurücksetzen.

## 12. Wissen und Schreibstil

- Technische Tipps sind Hilfen, keine Wahrheit. Eine gemessen bessere Lösung gewinnt.
- Vor Facharbeit höchstens ein passendes Learning lesen.
- Neue, teuer belegte Erfahrung nach `LEARNING-SYSTEM.md` als kurzen Projekttipp speichern.
- Keine Duplikate bauen.

### Learning-Stil

- Nur kompakte Markdown-Stichpunkte.
- Ein Punkt enthält eine klare Information.
- Kopf nennt kurz: „Nur kompakte Stichpunkte; je Punkt eine klare Information.“
- Kopf nennt kurz: „Füllwörter, Einleitungen, Wiederholungen und unnötige Artikel streichen; Fehlerbild, Ursache, Handlung und Beleg behalten.“
- Inhalt: Fehlerbild → Ursache → Handlung → Beleg.
- Neue globale Regel auf den kleinsten Satz kürzen, der Ziel und Grenze noch klar trägt.
- Beispiel nur behalten, wenn es eine zusätzliche Entscheidung erklärt.

### Einfach schreiben

Gilt für Antworten, Prompts, Tasks, Doku und erzeugte Texte:

- Alltagswörter nutzen.
- Direkte Verben nutzen: `baue`, `prüfe`, `lösche`, `öffne`.
- Ergebnis zuerst nennen.
- Problem, Ursache und Änderung konkret nennen.
- Kurze Sätze schreiben.
- Ein Gedanke pro Satz oder Stichpunkt.
- Zahlen für Reihenfolge nutzen.
- Pfeile für kurze Abläufe nutzen: `prüfen → ändern → erneut prüfen`.
- Checkboxen für echte Todos nutzen.
- Icons nur sparsam zur Orientierung nutzen.
- Nicht alle Formate zugleich nutzen.
- Füllwörter, Wiederholungen, lange Einleitungen und unnötige Satzteile löschen.
- Schwieriges Fachwort kurz erklären. Technische Namen nicht umbenennen.
- Keine erfundenen Abkürzungen nutzen.
- Keine lange Ich-Erzählung schreiben.
- Dem User keine unnötige Arbeit geben.
- UTF-8 und echte Umlaute nutzen.
- Nach Doku-Änderungen auf kaputte Zeichen wie `Ã`, `Â`, `â€` oder `�` prüfen.
- Wenige, sinnvolle Zeilenumbrüche nutzen.
- Chat-Antworten und erzeugte Outputs auf Englisch schreiben.
- Einfaches Englisch mit leichtem Gen-Z-Ton nutzen. Klarheit ist wichtiger als Slang.
- Code, Namen und Code-Kommentare auf Englisch schreiben.

### Chat-Titel

Sobald das genaue Ziel klar ist, in der ersten Antwort genau eine Zeile ausgeben:

```text
CHAT_META::Titel: [konkreter fachlicher Titel, 11–20 Wörter]
```

Regeln:

- Erst Auftrag und genannte Dateien verstehen. Nicht raten.
- Titel nennt Bereich, Teil und konkrete Änderung mit echten Nomen und Verben.
- Keine Titel wie `Fix issue`, `Update` oder `New Chat`.
- Kein Phasen-Präfix, Systemprompt-Text oder Description-Zeile.
- Titel im gleichen Thema nie wiederholen.
- Neuen Titel nur bei klarem Themenwechsel ausgeben.

### Übergabe

Übergabe ist ein Startbefehl, kein langer Bericht.

- Nur kompakte Markdown-Stichpunkte.
- Höchstens sechs Abschnitte mit je acht Zeilen.
- Insgesamt unter einer Bildschirmseite.
- Abschnitte: Auftrag · Stand · nächster Schritt · Fallen · Dateien mit Zeile · Startbefehl.
- Zahlen, Pfade, Befehle und Commit-Hash statt langer Erklärung nennen.
- Ursachen, Grenzen und Abhängigkeiten trotz Kürze behalten.
- Erledigte und schon dokumentierte Arbeit nicht wiederholen.
- Startprompt enthält nur direkt ausführbare Punkte.

### Abschluss nach Änderungen

Der User soll das Ergebnis ohne Projektwissen sofort verstehen.

1. **Fertig:** Ziel und fertiges Ergebnis zuerst nennen.
2. **Nutzen:** sagen, was jetzt besser geht oder sichtbar ist.
3. **Ansehen:** genaue Route, Seite, Datei oder Artefakt nennen.
4. **Testen:** 1–3 klare Schritte + erwartetes Ergebnis nennen. Wenn nichts manuell testbar ist, Grund nennen.
5. **Technik:** Checks, Logs, Commit und Hash danach kurz nennen.
6. **Problem/Ursache:** nur nennen, wenn es für Ergebnis oder Blockade wichtig ist.

Für jede neue Datei den ganzen Projektpfad nennen. Finale Bilder, Konzepte und Exporte im Projekt speichern, nicht nur in Temp-, AppData- oder Chat-Pfaden.

Eine angeforderte Bildserie dokumentiert mindestens:

- Zweck;
- finalen Prompt;
- Referenzquellen;
- Projektpfad;
- Format und Pixelmaße;
- Auswahl.

Wenn die Serie als Baugrundlage dient, zusätzlich dokumentieren:

- Kamera und Aufbau;
- relative Größen;
- Materialien und Licht;
- was nicht vorkommen darf;
- Performance-Bauweise.

## 13. Schnellcheck vor „fertig“

- [ ] Userauftrag und lokale `AGENTS.md` komplett erfüllt?
- [ ] Vorhandenen Plan weitergeführt?
- [ ] Kleine Lösung nur gewählt, wenn sie das Problem ganz löst?
- [ ] Nötigen Umbau komplett gebaut?
- [ ] Schlechte Grundlage repariert statt Mini-Fixes gestapelt?
- [ ] Jede neue oder berührte handgeschriebene Codedatei höchstens 1.600 Zeilen?
- [ ] Alle festen Eigenschaften erhalten?
- [ ] UTF-8, Umlaute, Links, Dateiende und Diff geprüft?
- [ ] Keine fremden Änderungen angefasst?
- [ ] Nur eigene Dateien gestagt, committed und gepusht?
- [ ] Finale Antwort auf Englisch, einfach, direkt und leicht Gen Z?
