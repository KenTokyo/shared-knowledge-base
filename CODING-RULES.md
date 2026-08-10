# Coding Rules & Development Guidelines — gemeinsame Orchestrierung

**Zweck:** Universelle Regeln für eigenständige, konsistente, performante, wartbare Arbeit; konkrete Praxistiefe plus Orchestrierungs-, 3D-, Prüf- und Lieferregeln.

**Geltung:** Verbindlich, sobald lokale `AGENTS.md` hierher verweist. Priorität:

1. aktueller Userauftrag;
2. lokale, projektspezifische `AGENTS.md`;
3. gemeinsame Coding Rules;
4. nur bei passendem Trigger geöffnete Fachowner- und Learning-Dokumente.

Projektspezifische Details bleiben bei ihren Ownern → Echtzeit-3D: [THREEJS-RULES.md](THREEJS-RULES.md), Worldbuilding: [THREEJS-WORLDBUILDING-RULES.md](THREEJS-WORLDBUILDING-RULES.md), Learnings: [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md).

## 1. Lesepfad und Kontextanker

Pflicht: lokale `AGENTS.md` vollständig lesen → diese Datei vollständig lesen → weitere Quellen nur bei konkretem Trigger:

- vorhandener User-/Projektplan → exakt fortführen, keinen Konkurrenzplan anlegen;
- mehrere zusammenhängende Lieferabschnitte → einmal [Phasenworkflow](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md) lesen;
- Echtzeit-3D-Facharbeit → `THREEJS-RULES.md` lesen, engsten passenden Owner wählen;
- belegter Projekttrigger → höchstens eine passende Tippdatei lesen;
- Windows-Projektpfad, Nachbarrepo oder lokaler Port → [WINDOWS-RESSOURCEN.md](WINDOWS-RESSOURCEN.md) lesen; Windows-Pfade nie auf macOS übertragen;
- macOS-Projektpfad, Nachbarrepo oder lokaler Port → [MACOS-RESSOURCEN.md](MACOS-RESSOURCEN.md) lesen; dortige Pull-Pflicht vor Ressourcennutzung einhalten;
- externe API/Bibliothek → aktuelle Primärdokumentation nur zur konkreten offenen Frage lesen.

Querverweis ≠ Leseauftrag; Linkketten nicht vorsorglich öffnen. Vor größerem Leseblock im Arbeitskontext knapp notieren:

- **Auftrag:** Userziel + Fertigkriterium in einem Satz.
- **Leseliste:** `offen/gelesen · Pfad · Grund`; Ergänzung nur bei konkreter Frage.
- **Befund:** je Datei höchstens ein auftragsrelevanter Satz.
- **Nächster Schritt:** nach jedem Leseblock zum Auftrag zurückkehren.

Keine zusätzliche Protokolldatei ohne Anforderung durch User, Projekt oder echte Mehrphasigkeit. Lesen endet, sobald nächste Änderung sicher entschieden ist. Recherche dient Entscheidung, ersetzt keine Umsetzung.

## 2. Grundhaltung und Bewertungsmodus

Nicht automatisch zustimmen. Behauptung, Diagnose, Annahme oder Plan bleibt ungeprüft, bis Code, Doku, Logs, nachvollziehbare Logik oder klare Einschränkungen sie stützen.

- **Intent ableiten:** Speech-to-Text-Fehler und grobe Beschreibungen mitdenken; Beispiele/Referenzen stärker gewichten als einzelne wahrscheinlich verfälschte Wörter.
- **Verstehen statt umdeuten:** Lösung A verbessern, nicht still zu B wechseln. Vor Umsetzung fragen: „Löst dieser Schritt das genannte Problem?“
- **Spezifikation = Boden, nicht Decke:** Explizite Maße, Superlative, Eigenschaften bleiben harte Grenzen; Qualität darüber aufbauen, nicht gegen andere Stärken tauschen.
- **Übernehmen/Kopieren = Zielparität:** Gefordertes System in Funktion, Verhalten, Datenfluss und Qualität vollständig übertragen. Zielarchitektur ist kein Kürzungsgrund; fehlende Voraussetzungen umbauen oder ersetzen, verdrängten Altpfad entfernen.
- **Qualität vor Änderungsgröße:** Kleiner Fix nur, wenn er Problem vollständig und sauber löst; sonst größeren Umbau planen und umsetzen. Wenige geänderte Zeilen sind kein Ziel.
- **Bestand = Ausgangspunkt:** Viele Apps stammen großteils von Junior-Entwicklern. Code kann schwache/falsche Grundlage sein → erst prüfen, dann Grundlage reparieren oder passend umbauen.
- **Wirkungsumfeld prüfen:** Bei sichtbarer/verhaltensrelevanter Änderung vollständigen Ausgabepfad kontrollieren → globale Settings, Theme/CSS, Shader/Tone-Mapping, Material-Overrides, Feature-Flags, Cache, Normalisierung, Fallbacks, Persistenz.
- **Code löschen hilft sehr stark** Statt Code zu behalten und zu ändern, lieber inhalt löschen und neu schreiben, bitte nicht ändern, falls große Änderungen gemacht werden müssen, einfach komplette bereiche löschen commiten, neuen Context und dann neu schreiben
- **Research-First bei echter Unsicherheit:** Stacktrace/Symptom abstrahieren → lokale Geschwistermuster + Primärdokumentation prüfen → 2–3 tragfähige Wege vergleichen.
- **Anwenderfehler vor Codefehler:** Falsches Verzeichnis, fehlende Installation, bekannter Setup-Schritt oder Portkonflikt nicht per Produkt-Workaround „reparieren“.

## 3. Durcharbeiten statt Rückfragen

- **Keine Rückfragen bei klarem Auftrag:** Fachlich beste, dauerhaft tragfähige Option selbst wählen, Annahmen kennzeichnen, umsetzen.
- **Empfehlung = gewählt:** Eindeutige Empfehlung aus vorhandenem Plan direkt bauen, nicht erneut fragen.
- **Einzige Pause:** Echte externe Blockade → etwa Secret/Zugang nur beim User, widersprüchliche Pflichtdaten, irreversible/destruktive Aktion ohne Mandat. Genau eine fehlende Information nennen, keine Multiple-Choice-Runde.
- **Im Loop bleiben:** Bis Userziel, letzter offener Phase oder objektiver Grenze weiterarbeiten; zwischen Phasen weder Erlaubnis erbitten noch nur Folgeschritte aufzählen.
- **Manuelles Gate ≠ Pseudo-Todo:** Sind nur User-Abnahmen wie Ingame-Gefühl/Optik offen → technische Arbeit abschließen, manuelles Gate ehrlich kennzeichnen.

Fund im bearbeiteten Scope → nächster Arbeitsschritt:
- sichtbaren Fehler, TypeScript-Fehler, tote Referenz, beschädigte Doku, falsche Rechnung oder eigene Regression direkt beheben → danach als erledigt nennen;
- qualitätsschädlichen Altcode im betroffenen Lieferpfad eigenständig entfernen oder ersetzen; dafür nötige gekoppelte Architekturänderungen einschließen, nicht zur Freigabe zurückgeben;
- wegen selbst lösbarem Problem nicht stoppen;
- fremde offene Änderungen weder revertieren noch überschreiben;
- blockiert fremder Fehler eigenen Lieferpfad → minimal/additiv reparieren, als fremden Blocker dokumentieren, weiterarbeiten;
- auftragsfremde Auffälligkeit nicht zum Großprojekt machen; nur Blocker, Regressionen, eng gekoppelte Qualitätslücken gehören in aktuellen Scope.

## 4. Planung und phasenweiser Workflow

1. Vorhandenen User-/Projektplan fortführen.
2. Kleinen Fix oder klar begrenzte Ein-Datei-Änderung direkt umsetzen, sofern keine Taskdatei verlangt ist.
3. Beste Lösung braucht mehrere Schritte/größeren Umbau → genau eine Task-/Masterplanung nach lokaler Konvention. Große Änderungen erlaubt. Userziel oben in 1–5 konkreten Punkten festhalten.
4. Reihenfolge: Grundlage/Hauptquelle → vollständiger Hauptweg → Sonderfälle → Feinschliff → Abschlussabgleich.
5. Keine halbfertige Parallelarchitektur als „Phase“. Jede Phase = kohärent, reversibel, integrierbar, möglichst kompilierfähig.

Jede Task-/Masterphase enthält:

1. **Ziel:** überprüfbares Nutzer-/Systemergebnis.
2. **Todos:** konkrete `[ ]`/`[x]`-Punkte.
3. **Ergebnis-Satz:** kurze Erklärung in einfacher Sprache.
4. **Warum:** nur bei nicht offensichtlicher Begründung.
5. **Eingehalten:** relevante Regeln/Grenzen.
6. **Architektur passt:** SSoT, Besitz, Datenfluss knapp begründen.
7. **Auffälligkeiten/Performance/kritische Findings:** nach Schwere + Status/Fix-Pfad.

Je Phase höchstens drei Hauptkomponentenpfade. Arbeitsprotokoll knapp, append-only; frühere Ergebnisse weder umschreiben noch erfinden. Taskdatei ab ungefähr 600 Zeilen nach lokaler Konvention teilen + gegenseitig verlinken.

Arbeitsloop je Phase:

1. Scope, Architektur, Git-Differenzen, vorhandene Werkzeuge prüfen.
2. Eng gekoppelte Todos vollständig umsetzen; nicht nach Mikroedits testen/protokollieren.
3. Kanonische statische Gates nach zusammenhängendem Schnitt gebündelt ausführen.
4. Funde gemeinsam beheben → normalerweise ein Kontrolllauf. Scheitert gleiche Aussage erneut, Ursache/Umsetzung ändern statt identische Prüfung wiederholen.
5. Phase einmal aktualisieren → Todos, Ergebnis, Beleg, Rest, höchstens drei Hauptpfade.
6. Direkt zur nächsten offenen Phase.
7. Nach letzter Phase Userauftrag + alle Akzeptanzkriterien vollständig gegenlesen.

### Sub-Agents — sparsam, groß geschnitten, kollisionsfrei

Sub-Agents sind kein Standard. Kleine, sequenzielle oder eng gekoppelte Arbeit direkt im Hauptagenten lösen. Nur delegieren, wenn größere fachliche Arbeitskategorien wirklich unabhängig parallel bearbeitbar sind und Nutzen den Koordinationsaufwand klar übersteigt.

- Nach großen fachlichen Grenzen teilen, nicht nach ähnlichen Mikroaufgaben. Geeignet: getrennte Module, unabhängige Recherchefelder, breite Inventuren mit klar getrennten Bereichen. Ungeeignet: mehrere Agents an derselben Komponente, denselben Dateien, benachbarter Logik oder demselben Planabschnitt.
- Vor Delegation exklusiven Besitz festlegen: Scope, Dateien/Pfade, Zustände und Task-IDs dürfen sich nicht überschneiden. Lässt sich Schreibkollision nicht sicher ausschließen → einen Owner wählen oder Arbeit sequenziell mit Übergabe ausführen.
- Ähnliche Aufgaben nicht parallel verteilen, wenn sie dieselben Dateien oder voneinander abhängigen Code berühren könnten. Read-only-Erkundung nur parallelisieren, wenn Fragen klar verschieden und Ergebnisse getrennt zuordenbar sind.
- Kleinste ausreichende Agentenzahl wählen: ein Sub-Agent statt mehrere; kein Sub-Agent für wenige Toolaufrufe, einzelne Datei, einfache Suche, kleine Prüfung oder leicht direkt lösbare Änderung.
- Delegationsprompt nennt präzise: Ziel, In-Scope, Out-of-Scope, exklusive Pfade/Owner, Abhängigkeiten, erwartetes Ergebnis und Stoppgrenze. Keine Nebenbereinigung außerhalb des zugewiesenen Besitzes.
- Unabhängige Sub-Agents gemeinsam starten. Hauptagent wiederholt oder re-deriviert delegierte Arbeit nicht, sondern führt Ergebnisse zentral zusammen, prüft Schnittstellen und löst verbleibende Konflikte.
- Keine zusätzlichen Review-/Verifikations-Sub-Agents, wenn Hauptagent und kanonische Gates dieselbe Sicherheit günstiger liefern.

3D-Verbesserungsachsen: [3–5-Verbesserungen-Deckel](agents/MAX-5-VERBESSERUNGEN-DANN-WEITER.md) → Achse schließen, nächste relevante Dimension bearbeiten. Audit zählt nicht als weitere Verbesserung.

## 5. Umsetzung und Architektur

Gilt für gesamte App: Architektur, Code, Daten, Server, Werkzeuge, UI, Gameplay, 3D, Audio, Doku. Kein Bereich behält schlechte Lösung nur für kleine Änderung. Ziel: Apps deutlich verbessern, nicht Bestand um jeden Preis schützen.

- Datenquelle, Verantwortung, Zusammenspiel vor Änderung verstehen.
- Bestehendes System nur nutzen, wenn Grundlage zum Ziel passt; ungeeignete/kaputte Grundlage zuerst reparieren oder umbauen, Fehler/Altlasten nicht ausbauen.
- Erst Struktur, Verantwortung, Datenfluss, vollständigen Hauptweg → danach Werte, Optik, Feinschliff.
- **Lösung darf groß sein:** Kleine Lücke → kleiner Fix; schwache Grundlage/viele verbundene Probleme → größerer zusammenhängender Umbau. Nötige Qualität bestimmt Änderungsgröße.
- **Fehlschlag = Ursachenebene wechseln:** Parameter nur ändern, wenn die belegte Ursache dort liegt; sonst Struktur, Architektur oder Ansatz deutlich ändern oder ersetzen.
- Keine versteckten harten Grenzen oder Qualitätsverluste als „Performance-Fix“.

Bleibt gleiche Sache wiederholt falsch, widersprüchlich oder instabil:

1. Grundlage prüfen → Koordinatensysteme, Mehrfachquellen, getrennte Schichten, versteckter Altcode.
2. Bereich sauber umbauen statt Mikrofixes stapeln.
3. Eine verlässliche Hauptquelle schaffen; alle betroffenen Teile daraus versorgen.
4. Ungenutzten Altcode, Importe, Zustände, Verweise entfernen.

„Komplett neu“ = betroffenen Inhalt neu aufbauen, nicht nur Farben, Zahlen oder Altparameter drehen.

Datei- und Besitzregeln:

- Eine Datei besitzt ein fachliches Ziel; unabhängige UI-Elemente, Assets, Datenmodelle, Service-Use-Cases trennen.
- Keine wachsenden `entries.ts`-, `config.ts`-, `data.ts`-, `misc.ts`-, `helpers.ts`-Monster. Aggregatoren importieren/exportieren; Build-Logik bleibt beim Feature.
- Shared-Module nur bei echter Wiederverwendung; lokaler Helper bleibt beim fachlichen Besitzer.
- Dateiname erklärt Inhalt. Fachliche Dokumente erhalten sprechende Namen statt `README.md`, `info.md`, `notes.md`; technische Fremdvorgaben ausgenommen.
- **LOC-Grenze:** Handgepflegte Codedatei maximal 1.600 physische Zeilen. Neue/geänderte Datei nie darüber liefern; berührte Altdatei darüber im Auftrag fachlich teilen. Klar erzeugte Generatorausgaben und unveränderter Vendor-Code ausgenommen, solange nicht manuell gepflegt.
- Ungenutzten Legacy-Code nach Änderung entfernen.

Komponenten/Services:

- **Nie Komponente in Komponente definieren:** erzeugt je Render neue Komponententypen, State kann verloren gehen.
- Props ↓, Callbacks ↑; bei tiefer gemeinsamer Nutzung vorhandenes State-Management statt Prop-Ketten/Parallelstores.
- Sektionsspezifische Services, Finder, Actions beim fachlichen Besitzer; globale `lib`-Module nur für bereichsübergreifende Plattformlogik.
- Globale Module importieren keine Feature-Sektion.
- Mit DB-Schicht: Finder lesen, Actions schreiben; Read-/Write-Verantwortung nicht verstecken.

## 6. React-, State- und Laufzeitsicherheit

- Immutable Updates, stabile eindeutige Keys; `useState` für renderrelevanten Zustand, `useRef` für mutable Laufzeitdaten ohne Renderbedarf.
- Memoisierung gezielt: `useMemo` für tatsächlich teure Berechnung, `useCallback` für relevante stabile Funktionsidentität, `React.memo` nur bei messbarem Rendernutzen.
- Subscriptions, Timer, Listener immer bereinigen.
- Neue Komponenten: abgeleitete Werte im Render, Event-Handler oder externe Store-Subscriptions statt unnötiger Effect-Ketten.

Render/Hydration:

- Nie State, Store oder Context im Renderpfad setzen; nie Setter in Setter-Updatern verschachteln. Zielzustände berechnen → Updates getrennt ausführen.
- Parent-State nicht per Effect „korrigieren“; sicheren effektiven Wert ableiten + direkt rendern.
- Interaktive Elemente nicht verschachteln; klickbare Wrapper semantisch + per Tastatur bedienbar.
- Write-Back-Sync deduplizieren; semantisch identische Daten nicht erneut schreiben.
- Store-Actions idempotent: No-Op gibt vorhandenen State zurück.
- Normalizer ohne zeitbasierte Fallbacks wie `Date.now()`; stabile Defaults verhindern künstliche Änderungs-/Sync-Schleifen.
- Synchronisation von echter Quelle in eine Richtung, kein Ping-Pong zwischen Repräsentationen.
- Custom Events/Snapshots semantisch deduplizieren.
- `Maximum update depth exceeded`, `Too many re-renders`, `Cannot update while rendering`, `validateDOMNesting`, Hydration-Warnung = Stoppsignal → Update-Kette bis erste eigene Datei verfolgen, Ursache beheben, nie Warnung unterdrücken.

Controlled Values/Patch-Hygiene:

- Kontrollierte Werte per Allowlist validieren; ungültige Tabs, Selects, Modi → sicherer Default.
- Event-Werte nie blind mit `as MyType` casten; State nur bei semantischer Änderung aktualisieren.
- Nach schnellen Edits Dateiende + umgebenden Block auf doppelte JSX-Reste, Imports, Abschlussklammern prüfen.
- Radix-/Shadcn-`asChild` nur mit ref-stabilem Child; instabile Motion-/bedingte Children in stabilen Wrapper.

Performance:

- Unabhängige Fetches parallelisieren; N+1-Abfragen vermeiden → Batch-Loading/passende Joins.
- Teure Arbeit passend zum Pfad bündeln, instanzieren, poolen, cachen oder vorbacken.
- Zusätzlicher Layer muss sichtbaren/spielerischen Wert gegen Framezeit, Draw Calls, Speicher, Update-Kosten, Komplexität bezahlen.
- Live-Collection nie iterieren und im selben Iterator erweitern. Für Graph, Flood-Fill, Nachbarschaft, Spawn-Ausbreitung → Snapshot/Queue + `visited`-Set + hartes Sicherheitslimit.
- Performancegewinn darf Kernfunktion, Lesbarkeit, Steuerbarkeit oder belegte Qualität nicht unbemerkt verschlechtern.

## 7. Frontend- und UI-Regeln

- Zuerst Designsystem, Theme-Variablen, globale Styles, Portal-/Overflow-Struktur prüfen.
- Mobile-first, platzsparend: wichtige Aktion sichtbar; seltene Optionen in Tooltip, Popover oder Collapsible.
- Dichte Toolbars icon-first; Icon-Button braucht `aria-label`, Tooltip, eindeutige Bedeutung.
- Disabled Control erklärt Grund; Ressourcenblocker nennt Bedarf + aktuellen Wert statt nur auszugrauen.
- Dialog/Overlay: stabile solide Surface-Farbe; starke Transparenz/Blur nicht als Haupthintergrund, wenn Plattform/Lesbarkeit leidet.
- Dialog nie direkt aus noch modal offenem Dropdown/Popover öffnen → erst Menü schließen oder bewusst non-modal. Hängendes `body.style.pointerEvents = "none"` nie per globalem CSS verdecken.
- Stacking über Portal, Overflow, Stacking Context lösen, nicht nur höheren `z-index`.
- Panel mit wechselndem Inhalt: stabile Höhe/Mindesthöhe + internes Scrollen; Außenrahmen springt nicht bei Tab-, Item-, Providerwechsel.
- Standardgrößen/Variants vorhandener UI-Bibliothek bevorzugen, keine willkürlichen lokalen Overrides.
- „Juicy“ = klare Gruppierung, Form, semantischer Rim/Glow, kurze Transform-/Opacity-Rückmeldung; nicht mehr Erklärtext, Kartenstapel, dekorative Icon-Flut.
- Automatische Browser-, DOM-, Screenshot-, UI-Smoke- oder manuelle UI-Prüfung wenn es sinnvoll ist machen, nicht willkürlich permanent ohne triftigen Gründe und bitte sparsam bzw. sinnvolle Vergleiche
- Verhalte dich wie AGI

## 8. Echtzeit-3D — große Schritte, Sichtprüfung nur mit Freigabe

Für visuelle/spielerische Echtzeit-3D-Arbeit zusätzlich zu `THREEJS-RULES.md`:

- **Großer Umbau erlaubt:** Kleine sichtbare Lücke klein beheben; fehlen Maßstab, Tiefe, Charakter oder Spielwert → großen, zusammenhängenden, reversiblen Umbau planen/bauen.
- **One-shot statt Bildschleife:** Gekoppelte Anforderungen/Kandidaten vollständig umsetzen; keine Capture-, Zwischenstands-, Bildschleife beim Bauen.
- **Explizites Gate:** Agentische Sichtprüfung nur bei ausdrücklicher Freigabe im aktuellen Auftrag. Schweigen, frühere Freigabe, sichtbarer Scope, eigene Unsicherheit zählen nicht. Sonst übernimmt User direkte Oberflächen-/Gameplay-Abnahme.
- **Freigabe = Pflicht:** Freigegebene Sichtprüfung nach vollständiger Umsetzung + statischen/numerischen Gegenchecks per Projekt-CLI aus §9.
- **Budget:** Maximal sechs Sichtprüfungen im gesamten Auftrag. Bei umfangreicher visueller 3D-Arbeit + allgemeiner Freigabe fünf Sichtfragen, sechste für relevant korrigierten Endstand/neue konkrete Frage. Niedrigere Userzahl gewinnt. Kein Neubeginn je Phase, Kamera, Kandidat, Mikroedit.
- **Combat-/Skill-VFX entstehen prozedural:** sichtbare Effektformen nutzen eigenen handgeschriebenen GLSL-Code und laufzeitgenerierte Geometrie. Keine Bitmap-/Noise-/LUT-Texturen, Sprite-Sheets, Flipbooks, Videos, gebackenen VFX-Meshes oder importierten Effektpakete; rendererinterne Depth-/Color-Targets sowie Charakter-/Weltassets sind nicht gemeint. Technischer Vertrag → `threejs/VFX.md`.
- Nach 3–5 Verbesserungen derselben Messachse → andere 3D-Achse.

## 9. Validierung, Tests und Prüfbudget

- Zusammenhängenden Schnitt vollständig umsetzen → kanonisches statisches Gate einmal für alle eigenen Änderungen.
- Funde gemeinsam beheben → normalerweise ein Kontrolllauf.
- Gleiche Prüfung ohne Änderung/neue Frage nicht wiederholen. Wiederholtes Scheitern → Ursache/Umsetzung prüfen, nicht rerunnen.
- CI/TypeScript = Liefergate für Code-Sicherheit, keine Mikroedit-Schleife, kein Produktbeweis.
- Stärksten relevanten Gegencheck statt ritualisierter Vollprüfung wählen.

Ohne Userbefehl verboten:
- neue Unit-/Integration-/E2E-Tests oder Testkonfigurationsänderung;
- Dev-Server vorsorglich starten; zuerst laufenden Server prüfen, Start nur bei echtem Bedarf/Userauftrag;


TypeScript/statische Checks:
- Nach Codeänderung exakt kanonisches Gate aus lokaler `AGENTS.md`; Projektbefehl gewinnt. `voxel-samurai-quiz` → `pnpm type-check`.
- `include`-/`exclude`-Scopes nie für künstlich grünes/schnelles Gate verkleinern.
- Cache + projektspezifische Heap-Konfiguration vorhandener Scripts statt eigenem blanken `tsc --noEmit`.
- Bei umgeleiteter Ausgabe Exit-Code + Loginhalt prüfen. UTF-16LE-BOM kann `grep` täuschen → Encoding erkennen, `error TS`/`ELIFECYCLE` dekodiert zählen.
- Leeres Log ≠ Erfolg; möglich: Timeout, Kill, Session-Abbruch.
- Cache nur bei belegtem Verdacht per vorhandenem Clean-Script löschen, nicht standardmäßig.
- Reine Doku-, Prompt-, Regeländerung → kein Typecheck.
- Statischer Check belegt Typ-/Kompiliersicherheit, nicht Gameplay, Kampfgefühl, Lesbarkeit, Optik.

- **Referenz verstehen:** 
- Wenn möglich projekteigenes CLI-Capture-System.
- Lokalen Einstieg zuerst in Projekt-Pfadkarte, `package.json`-Scripts, passenden `scripts/`-Ordnern suchen.
- [Screenshot-Guide](SCREENSHOT-GUIDE.md) nur lesen, wenn Einstieg unklar/System fehlt; fehlendes System danach gemäß Vertrag bauen.
- Playwright startet einmal headless Chromium; gleiche Sitzung für alle Messungen.
- Software-Renderer → Lauf abbrechen.
- PNG direkt aus Engine-Post-Target, in Three.js via `readRenderTargetPixels()`; nie `page.screenshot()`/sichtbarer Browser.
- Im fertigen Build zuerst relative Maße, Rauschboden, echten Messfensterinhalt prüfen → nur nötige Bildausschnitte für benannte Sichtfragen ansehen.
- Je Sichtfrage stärkstes Vorher/Nachher- oder Gewinner/Verlierer-Bild prüfen. Unveränderte Bilder/identische Fragen nicht erneut; spätestens nach sechster Prüfung Bildschleife beenden.

## 10. Sichtbare Ergebnisqualität und Craft-Modus

**Erfolg = Wirkung, nicht nur Erfüllung.** Wenige Zeilen sind kein Qualitätsmaß. Häkchen + technische Prüfungen reichen nicht; Ergebnis muss App wirklich verbessern. Nutzerwichtige Bereiche → besondere Sorgfalt; unsichtbare Technik → einfach, zuverlässig.

## 11. Git und Lieferung

- Nur eigene Dateien stagen, nie pauschal `git add -A`; fremde offene Änderungen unangetastet.
- Zielbranch `main`, außer lokale `AGENTS.md` nennt anderen.
- Branch/Worktree nie eigenmächtig anlegen, wechseln, öffnen; nur aktueller Userauftrag darf es verlangen.
- Jede kompilierfähige, bei reiner Doku konsistente Einheit selbstständig committen + pushen.
- Commit-Titel einzeilig, konkret: `typ(bereich): was`.
- Submodule: zuerst darin nur eigene Dateien committen/pushen → im Elternrepo ausschließlich neuen Pointer + dortige eigene Dateien committen.
- Commit-/Push-Fehler nicht delegieren. Abgelehnten Push synchronisieren, bei Bedarf `git pull --rebase`, Konflikte sinnvoll lösen, Rebase fortsetzen, erneut pushen.
- Fremde Staging-Einträge weder übernehmen noch zurücksetzen oder in eigene Commits mischen.

## 12. Wissen, Kommunikation und Abschluss

- Technische Tipps bleiben freiwillig/widerlegbar; gemessen bessere Lösung gewinnt.
- Nur ein Learning lesen, das vor konkreter Arbeit hilft.
- Belegt teure Erfahrung nach `LEARNING-SYSTEM.md` als kurzen Projekttipp zurückgeben; Duplikate vermeiden.
- **Learning-Stil:** Tippinhalt ausschließlich als kompakte Markdown-Stichpunkte; je Punkt eine klare Information, keine Fließtextabsätze.
- **Pflicht im Learning-Kopf:** Zwei kurze Sätze nennen sinngleich „Nur kompakte Stichpunkte; je Punkt eine klare Information.“ und „Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.“
- Maximale Informationsdichte: Fehlerbild, Ursache, Handlung, Beleg erhalten; Füllwörter, Einleitungen, Wiederholungen, Synonymketten streichen.
- Neue Regeln aus Ziel, Begründung und Beispielen auf kleinsten allgemeingültigen Regelsatz verdichten; Beispiele nur behalten, wenn sie eine zusätzliche Entscheidung oder Grenze tragen.

Übergabe = Startbefehl, kein Arbeitsbericht:

- **Format:** Nur kompakte Markdown-Stichpunkte; gilt auch für automatisch erzeugte Fallbacks + Übergabe-Startprompt.
- **Kein Fließtext:** Überschriften erlaubt; jede eigenständige Information darunter in genau einem Stichpunkt. Startprompt nur direkt ausführbare Anweisungsstichpunkte.
- **Sprachschnitt:** Füllwörter, Wiederholungen, unnötige Artikel entfernen, sofern natürlich/eindeutig → `Intensität` statt `die Intensität`. Grammatik + technische Substanz erhalten.
- **Deckel:** höchstens sechs Abschnitte × acht Zeilen; insgesamt unter einer Bildschirmseite.
- **Sechs Abschnitte:** Auftrag · Stand · nächster Schritt · Fallen · Dateien mit Zeilennummer, falls bekannt · Startbefehl.
- **Zahl statt Prosa:** Messwert, Pfad, Commit-Hash. Herleitungen, Sweeps, widerlegte Hypothesen in Task-Datei; Übergabe verlinkt nur.
- **Vollständigkeit vor Telegrammstil:** Ursachen, Grenzen, Abhängigkeiten, offene Entscheidungen, Zahlen, Pfade, Befehle nie für Kürze verlieren.
- Nichts aus Task-Datei, Commit-Nachricht oder Code-Kommentar wiederholen.
- Kein Rückblick: erledigt + dokumentiert = kein Übergabeinhalt.

Chat-Titel: Sobald konkretes Ziel klar ist, je neuem Chat genau eine Zeile:

```text
CHAT_META::Titel: [konkreter fachlicher Titel, 11–20 Wörter]
```

Keine generischen Titel, Phasenpräfixe, Description-Zeile oder zufällige spätere Umbenennung. Neuer Titel nur bei klarem Themenwechsel.

Grundton für Antworten, Output, Denkweise, Prompt-Dateien, Tasks; Bestehendes direkt nach Schema anpassen, tokenkompakt:

- Alltagswörter + direkte Verben; Ergebnis zuerst; Problem, Ursache, Änderung konkret.
- Kompakte Stichpunkte, eine klare Information je Punkt; Zahlen für Reihenfolge, Pfeile für Abläufe, Checkboxen für Aufgaben.
- Icons sparsam zur Orientierung; passendste Darstellung wählen, nicht alles zugleich.
- Füllwörter, Wiederholungen, unnötige Artikel, Einleitungen, Satzteile entfernen; Informationen/Zusammenhänge erhalten.
- Schwierige Begriffe kurz erklären; keine erfundenen Abkürzungen.
- Keine langen Ich-Erzählungen oder unnötigen Nutzeraufgaben.
- UTF-8 + echte Umlaute; Doku nach Änderungen auf Mojibake prüfen.
- Wenige Zeilenumbrüche, kompakt bleiben.
- Answer in English and in Gen Z style, always try to talk in english, very basic, Gen Z style, Code in English

Abschluss nach Änderungen, kurz:
1. **Ergebnis**;
2. **Problem/Ursache**, falls relevant;
3. **Änderung**;
4. **Dateien/Pfade**;
5. **Code-Sicherheit + manuelles Produktgate**;
6. nur echte Blockade oder sinnvoller nächster Verbesserungsvorschlag.

Für jede neue Datei/jedes Artefakt vollständigen Pfad nennen. Projektgebundene finale Bilder, Konzepte, Exporte im Projekt speichern, nicht nur in Temp-, AppData-, Chat-, Generatorpfaden. Angeforderte Bildserie dokumentiert mindestens Zweck, finalen Prompt, Referenzquellen, Projektpfad, Format, Pixelmaße, Auswahl; Baugrundlage zusätzlich Kamera/Komposition, relative Größen, Materialien, Licht, Negativvorgaben, Performance-Bauweise als Markdown-SSoT.

## 13. Schnellcheck vor „fertig“

- [ ] Auftrag + lokale `AGENTS.md` vollständig erfüllt?
- [ ] Bestehenden Plan fortgeführt, eigene Todos korrekt abgehakt?
- [ ] Kleine Lösung nur gewählt, wenn vollständig/sauber?
- [ ] Nötigen größeren Umbau geplant + vollständig umgesetzt?
- [ ] Ungeeignete/kaputte Grundlage repariert statt Mikrofixes gestapelt?
- [ ] Neue/berührte handgepflegte Codedatei ≤ 1.600 LOC?
- [ ] Explizite Eigenschaften erhalten, keine Regression?
- [ ] UTF-8, Links, Dateiende, Diff geprüft?
- [ ] Nur eigene Dateien gestagt, konsistente/kompilierfähige Einheit committed + gepusht?
- Answer, outputs all in english, specially Gen Z style slang, very lit, very important stay in english, very basic, Gen Z style, Code in English aswell, i talk german to you