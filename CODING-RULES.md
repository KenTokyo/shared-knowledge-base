# 🎯 Coding Rules & Development Guidelines

**Zweck:** Universelle Regeln für konsistente, performante und wartbare Code-Entwicklung.

## Grundhaltung und Bewertungsmodus
Stimme dem Nutzer nicht automatisch zu. Behandle jede Behauptung, Diagnose, Annahme und jeden Plan als ungeprüft, bis Code, Doku, Logik, Fakten oder klare Einschränkungen sie stützen.

## 1. Kontext & Kommunikation

- **Speech-to-Text-Berücksichtigung:** User sendet oft Sprachnachrichten. Begriffe können verfälscht sein → aktiv mitdenken („Cloud Code" ≈ „Claude Code"). Viele technische Wörter durch Speech-to-Text falsch geschrieben → aufpassen!
- Versuche die User-Sprachnachricht oder Textnachricht immer initial in der Todos/Phasenplanung (entweder bestehende nutzen falls mit angegeben oder neue erzeugen in `docs/[feature]/tasks/[datum]-[task].md`) zu speichern bzw. in der Masterplanung/Todo oben anzugeben als Kontext bsp in diesem Format:

Usernachricht - User möchte:
- HUD Anzeige oben links kleiner, kompakter haben
- FPS Anzeige oben rechts eingebaut haben, mit grüner Schrift, FPS NOW
- ....

bevor du mit der eigentlichen Planung beginnst, damit du nicht auf falsche Wege abdriftest, denn was der User möchte sollte schon erstmals erneut irgendwo in schön und kompakt notiert werden in der Masterplanung/Todo bevor du überhaupt mit der eigentlichen Planung beginnst
- **Junior-Developer-Feedback:** User beschreibt Probleme oft grob und ungenau → klar und freundlich korrigieren · erklären statt nur fixen · Nebenwirkungen prüfen · Backend-Teile selbst recherchieren
- **Verstehen statt Umdeuten (Pflicht):**
  - Lösung A verbessern, nicht still zu B wechseln
  - Fachwörter nie eigenmächtig übersetzen wenn die Richtung kippt
  - Vor Umsetzung prüfen: „Löst mein Schritt das genannte Problem?"
  - Keine versteckten Nebenwirkungen einbauen (z.B. harte Limits), außer explizit gewünscht
  - Bei Effizienz-Themen: erwähnen ob Architektur komplett umbaut werden sollte
  - Zielkonflikte: erst Ergebnisqualität, dann Kosten/Tempo
  - Abschluss-Zusammenfassung: Gebaute Änderung in paar Sätzen (hochmotiviert, Fachbegriffe erklärt, Icons)
- **Rollen-Trennung:** `AGENTS.md` = Verweis auf diese Datei + CLAUDE.md · `CODING-RULES.md` = Arbeitsregeln · `CLAUDE.md/OVERVIEW.md` = Architekturwissen
- **Anwender-Fehler vs. Code-Fehler (KRITISCH!):** BEVOR Fixen IMMER prüfen:

  | Frage | Wenn JA → |
  |-------|-----------|
  | Falsches Verzeichnis ausgeführt? | → Kein Code-Fix nötig! Hinweis geben |
  | vergessen zu installieren/starten? | → Kein Code-Fix nötig! Checklist geben |
  | Bekanntes Setup-Problem? | → Kein Code-Fix nötig! Docs verlinken |
  | Port-Konflikt? | → Kein Code-Fix nötig! Kill-Befehl geben |

  **NIEMALS Workarounds für Anwender-Fehler bauen!**

- **Architektur-Prüfung (Pflicht bei jedem Problem):** Ist die Architektur dahinter grundsätzlich falsch oder riskant? → Langfristig stabile Lösung finden · Workarounds klar benennen 🛑 · Bewährte Standard-Methoden nutzen ✅
- **Wirksamkeits-Umfeld prüfen (PFLICHT bei sichtbaren oder verhaltensrelevanten Änderungen):** Wenn Aufgabe A umgesetzt wird, immer auch prüfen, ob B/C/D/E die Wirkung von A überlagern, verfälschen oder verhindern. Nicht nur deklarierte Werte ändern, sondern den kompletten Wirkungspfad bis zur sichtbaren Ausgabe bzw. Runtime-Wirkung kontrollieren: globale Settings, Theme-/CSS-Variablen, Shader/Tone-Mapping, Material-Overrides, Feature-Flags, Cache, User-Optionen, Render-Modi, Daten-Normalisierung, Runtime-Fallbacks, Server-State oder Persistenz können das Ergebnis anders erscheinen lassen als programmiert. Relevante Edge Cases kurz dokumentieren und bei UI/Visual-Aufgaben gegen die tatsächliche Oberfläche prüfen.
- **Research-First & Architektur-Vergleich (PFLICHT bei komplexen Problemen):** 
  Wenn Probleme (z.B. Performance-Lags, Fehler in der Synchronisation, UI-Ruckeln) auftreten oder neue Konzepte entwickelt werden, darf die KI nicht blind Workarounds im lokalen Code bauen. Es besteht eine **Recherche-Pflicht**:
  1. **Konzept-Abstraktion:** Das Problem vom konkreten UI-Symptom auf das darunterliegende Software-Muster abstrahieren (z. B. *"Chat ruckelt"* -> *Virtualisierung/Scroll-Dämpfung*; *"3D laggt"* -> *Instancing/Mesh-Batching*).
  2. **Lokaler Geschwister-Abgleich (Sibling Repos):** Zuerst benachbarte Arbeitsverzeichnisse in `D:\CODING\React Projects\` (z.B. `AntigravityManager`, `codeg`, `AionUi`, `happier`) nach funktionierenden Mustern, CLI-Brücken oder Dateisystem-Handhabung scannen.
  3. **Repository-Mining:** GitHub-Repositories und Issue-Tracker durchsuchen (z.B. mit Websuche `site:github.com` oder unserem Such-Skript), um lauffähige Code-Snippets und Best Practices zu identifizieren.
  4. **Lösungs-Ranking:** 2-3 konkrete Lösungswege/Architekturen strukturieren, vergleichen, im Plan dokumentieren und erst nach Auswahl des kleinsten stabilen Ansatzes mit dem Coden beginnen.
  *Details siehe:* [autonomous-research-guide.md](file:///d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/docs/agentic/autonomous-research-guide.md)
- **Playwright-/Browser-Research-First (PFLICHT bei beauftragter Browserarbeit):** Wenn Browser, Playwright CLI, Playwright-Testdateien, native Dialoge, File System Access API, Login/API-Key-Seeding oder Search Params genutzt werden, zuerst den offiziellen Skill `C:\Users\PC1\.codex\skills\playwright\SKILL.md` und danach die NoteDrill-Findings-Doku `shared-docs/agents/agent-browser/notedrill-playwright-findings.md` lesen. Bei Electron-Desktoparbeit zusätzlich `shared-docs/agents/agent-browser/notedrill-electron-playwright-cli-reference.md` lesen. Nach Context-Condensing diese Dateien erneut lesen.
- **Browser-Playwright mit Microsoft Edge (PFLICHT):** Normale Browser-Playwright-CLI-Tests in NoteDrill zuerst mit Microsoft Edge/System-Edge ausführen, nicht mit Chrome, weil Edge lokal performanter ist und Chrome in NoteDrill-Smokes stärker laggt. Playwright-CLI dabei über Edge-Channel/System-Edge nutzen und **nicht** durch Browser-use/In-App-Browser ersetzen. Ausnahme nur, wenn Edge fehlt oder ein Feature ausdrücklich Chrome verlangt. Electron-Playwright-CLI bleibt davon unberührt und nutzt weiter den Electron-/Chromium-Projektwrapper.
- **Electron-Playwright-CLI-Referenz (PFLICHT bei Electron-Desktoparbeit):** Wenn Electron, Desktop-App, Electron-KI-Chat, `window.electronAPI`, IPC, Desktop-Workspace oder `electron:pwcli` genutzt wird, ist `shared-docs/agents/agent-browser/notedrill-electron-playwright-cli-reference.md` die Projekt-Referenz. Normales Browser-Playwright bleibt für Web-URL-Flows; Electron-Playwright-CLI ist für echte Electron-Fenster und Desktop-IPC.
- **NoteDrill Chat-Testmodelle (PFLICHT bei Electron-/Playwright-Chat-Tests):** Bei Electron-Playwright-CLI und Playwright-CLI im Agentic-Chat zuerst die Testoberfläche mit OpenCode CLI nutzen. Bevorzugte Modelle: `Deepseek V4 Flash Free` (`cli:opencode/deepseek-v4-flash-free`) und `Mimo V2.5 Free` (`cli:opencode/mimo-v2.5-free`). Falls lokal vorhanden, darf `Mimo V2.3 Free` nur als Fallback oder Vergleich genutzt werden. Web-Tests mit API-Key-Provider nur nutzen, wenn CLI nicht reicht oder der User es ausdrücklich verlangt. API-Keys niemals in AGENTS.md, Coding-Rules, Task-Dateien, Screenshots, Logs, Commits oder Abschlussantworten schreiben; nur temporär über Env-Variable oder nicht-committed localStorage/ProviderStorage-Seed setzen und Artefakte auf Secret-Leaks prüfen.
- **Playwright-CLI + FSA-MCP-Helper (PFLICHT bei Browser-Dateisystemproblemen):** Wenn Playwright CLI an File System Access API, Ordner-Picker, Chrome-`Zulassen`-Prompt, Workspace-Restore, IndexedDB/FSA-Persistierung oder `clientToolExecutorActive` hängt, nicht blind Timings/Fokus/Clicks drehen. Nutze den lokalen Helper `pnpm run mcp:notedrill-fsa-helper` bzw. `scripts/mcp/notedrill-fsa-helper.ts` zusammen mit dem Runner `scripts/e2e/browser-real-gemini-fsa-smoke.ts`. Der stabile Ansatz ist ein isoliertes Chrome-Testprofil mit geseedeten `Default/Preferences` für exakt Origin + Zielordner; echter Erfolg zählt erst bei `reloadWorkspaceRestored=true` und `clientToolExecutorActive=true`. Details/Fallstricke stehen in `docs/chat/tasks/2026-06-02-mcp-helper-fsa-architecture-plan.md` und `shared-docs/agents/agent-browser/notedrill-playwright-findings.md`.
- **Electron-Native-Dialog-MCP-Helper (PFLICHT bei Electron-Ordnerdialogen):** Wenn Electron `dialog.showOpenDialog` oder ein nativer Windows-Dialog wie `Workspace-Ordner auswählen` außerhalb des Electron-DOM öffnet, zuerst `pnpm run mcp:notedrill-fsa-helper` bzw. `scripts/mcp/notedrill-fsa-helper.ts` nutzen: Tool `notedrill_electron_list_native_folder_dialogs` read-only ausführen, danach nur bei genau einem passenden `#32770`-Dialog aus dem NoteDrill-`electron.exe`-Prozess `notedrill_electron_select_workspace_folder` nutzen. Wenn kein Pfadfeld existiert, ist `confirm-current` nur erlaubt, wenn die Adresszeile oder Nutzerangabe eindeutig den gewünschten Ordner zeigt. Keine globalen `SendKeys`, keine Koordinaten-Retries, kein Fokus-Drehen. Für nicht paketierte E2E-Läufe darf zusätzlich `ND_ELECTRON_TEST_WORKSPACE_PATH` genutzt werden, aber nur nach Pfadprüfung und als Testhook, nicht als Produktlogik.
- **MCP-Stdio-Smoke für den FSA-Helper:** Für Tool-Listen- oder Stdio-Smokes den Helper direkt über `cmd /c node_modules\.bin\tsx.cmd scripts\mcp\notedrill-fsa-helper.ts` starten und JSON-RPC `initialize` + `tools/list` senden. `pnpm run mcp:notedrill-fsa-helper` ist für normale MCP-Clients okay, kann aber bei manuellen Stdio-Smokes Paketmanager-Ausgaben auf `stdout` erzeugen und das Protokoll stören.
- **Browser-Findings sofort sichern (PFLICHT):** Neue Erkenntnisse aus Playwright-Läufen, native Dialoggrenzen, Browser-Permission-Probleme, Search-Param-Hinweise, Login-/API-Key-Setups und gescheiterte Ansätze sofort in der aktiven Task-/Masterplanung notieren, bevor weiter experimentiert wird. Wenn das Finding dauerhaft relevant ist, zusätzlich `shared-docs/agents/agent-browser/notedrill-playwright-findings.md` aktualisieren.
- **Keine automatischen Gameplay-/Werte-Beweise (PFLICHT):** Smoke-Skripte, Debug-Zahlen, Serverwerte, Ingame-Recorder, Browser-Checks oder selbst gebaute Prüfmechanismen dürfen nicht mehr als Beweis gelten, dass Gameplay gut ist. Sie dürfen nur bei ausdrücklichem User-Auftrag laufen. Produktgefühl, Lesbarkeit, AOE-Sinn, Trefferfeedback, Sound, Vibration und Despawn-Verständlichkeit prüft der User manuell.

- **Keine UI-Tests ohne User-Befehl (PFLICHT):** Keine Browser-, Playwright-, Screenshot-, DOM-Snapshot-, UI-Smoke- oder manuellen UI-Checks automatisch starten. Auch Frontend-/Layout- und Mock-Abgleiche laufen nur, wenn der User es klar befiehlt, z. B. „führe einen UI-Test aus“. Dann Mock-Screenshots mit deinem gebauten Änderungen/Frontend vergleichen. Ohne Befehl wird der UI-Check als manuelles Gate dokumentiert.
### Grundton
- **Kurz, klar, einheitlich:** Ergebnis zuerst. Keine langen Ich-Sätze. Kein unnötiger Fließtext.
- **8.-Klässler-Verständnis:** Motiviert, einfach, menschlich schreiben mit Alltagswörter, schwierige Themen mit Alltagsbeispielen ausformulieren falls User es nicht versteht. Echte Umlaute (ü, ä, ö, ß). Alltagssprache statt Fachsprache. Wenige technische Begriffe auf einmal, oder kurz erklären.
- UTF 8 mit echten Umlauten (ä, ö, ü, ß...) - achte darauf Texte anzupassen
- **Deutsch zuerst:** Antworten und UI-nahe Erklärungen auf Deutsch. Englische Begriffe nur nutzen, wenn sie als technische Namen nötig sind.
- **Problem klar benennen:** Sichtbares Problem nennen, Ursache kurz erklären, Änderung konkret beschreiben.
- **User-Entlastung:** Keine unnötigen manuellen Schritte für den User · Import, Mapping, Fallbacks, Defaults, Validierung übernehmen · Nur bei fehlenden externen Daten nach genau 1 Info fragen · Jede Antwort prüfen: „Nimmt das dem User Arbeit ab?"

### Abschluss im Chat
- **Standardformat nach Änderungen:** Ergebnis zuerst, dann kurz `Problem`, `Ursache`, `Änderung`, `Dateien/Pfade`, `Code-Sicherheit/Manuelles Gate`.
- **Pfadpflicht:** Geänderte oder geprüfte Dateien, Dokumente und Komponenten immer mit Pfad nennen.
- **Optional nur bei echtem Nutzen:** `### Performance`, `### Learning`, `### Nächster Schritt`.
- **Keine Schein-Offenpunkte:** Offene Punkte nur nennen, wenn wirklich etwas offen ist.

### 2.4 Konsolenausgaben
- **Wenn gewünscht:** Hochmodern, farbig, menschenlesbar, kompakt · Server/Client + Methode/Klasse zeigen · Retro-Game-Stil 🎮

## 3. Workflow & Dokumentation
- **Vor Programmierung:** Planung/Todo muss existieren (`docs/[feature]/tasks/[datum]-[task].md`), sonst nach Abschnitt 4 erstellen
- **Vor Implementierung:** Planung/Todo validieren ob sie Sinn macht und korrekt geplant wurde
- **Wenn keine passende Planung existiert:** Sofort Task- oder Masterplanung/Todo anlegen
- **Phasenweise ohne Stopps umsetzen** vom aktuellen Stand bis zur letzten Phase (nur bei externem Blocker pausieren) und Todos phasenweise abhaken, nach jeder Phase, ohen Stopp
- **In Task/Todo-Datei tracken** mit Kontextinformationen, erledigten To-dos, offenen To-dos und nächster Phase
- **Nach jeder Phase/Todo:** Planung updaten, Todo abhaken und nächste Phase direkt weiter umsetzen
- **Bei Browser-/Playwright-Goals nach jedem echten Befund:** Task-/Masterplanung aktualisieren mit Befehl/URL, Browsermodus, Seed/Search Params, Screenshot-/Failure-Artefakt, Root Cause, nicht erneut zu wiederholendem Fehlweg und nächstem stabilen Ansatz. Das gilt auch mitten im Goal und besonders vor Context-Condensing.
- **Nach allen Phasen/Todo:** Offene Auffälligkeiten in eine Cleanup-Masterplanung übernehmen und phasenweise verbessern und todos nach jeder Phase abhaken (falls noch nicht behoben)
- **Abschluss-Kommunikation:** Kurzer Stand + 1-3 konkrete Verbesserungs- oder Feature-Vorschläge für den nächsten Schritt
- **Legacy Code:** Nach jeder Änderung SOFORT ungenutzten Code entfernen

Falls Orchestrator Modus an!
- **ORCHESTRATOR MODUS:** Nach jeder Phase Plan updaten/Todos abhaken + Status am Ende setzen · Task-Pfad mitgeben · Kleine Summary was gemacht wurde, so kann direkt weitergearbeitet werden von einer anderen KI!
- **ORCHESTRATOR TEMPO-GUARD (neu):** Bei aktivem Orchestrator-Modus nur **eine Phase oder eine klar abgegrenzte Subphase pro Iteration** umsetzen. Keine Sammel-Implementierung über mehrere große Phasen/Todos auf einmal.
- **ORCHESTRATOR QUALITÄTS-GATE (neu):** Vor Phasenabschluss Scope gegen Planung/Todo abgleichen, Doku aktualisieren und offene manuelle User-Gates notieren. Automatische Gameplay-/Werte-/Ingame-Prüfungen sind verboten, außer der User fordert sie ausdrücklich. Lint/TypeScript sind nur Code-Sicherheitschecks bei echten Codeänderungen und kein Produktbeweis.
- **ORCHESTRATOR HANDOVER-REIHENFOLGE (neu):** Immer in dieser Reihenfolge abschließen: 1) Phase dokumentieren, 2) offene Punkte + nächste Phase benennen, 3) Endstatus (`NEXT_PHASE_READY` oder `ALL_PHASES_COMPLETE`) als **letzte Zeile** ausgeben.
- **KRITISCH (Loop-Stopper):** Wenn nur noch manuelle User-Checks offen sind (z.B. UI-Test, Ingame-Run, Recorder-Export, visueller Check), darf **kein** `NEXT_PHASE_READY` mehr kommen. In diesem Fall immer `ALL_PHASES_COMPLETE`, weil die KI ohne User-Input nicht weiter ausführen kann.

## 4. Erzeugung von Planung

### Dokumentationssystem - Todoformat einhalten!
**Structure:** `docs/OVERVIEW.md` → `docs/[feature]/[feature]-overview.md` → `docs/[feature]/tasks/[datum]-[task].md`

Jede Phase MUSS diese **7 Punkte** enthalten:
1. **Ziel:** Was ist am Ende sichtbar besser?
2. **Todos:** Abhakbare Aufgaben.
3. **Ergebnis-Satz:** Kurzer Satz in einfacher Sprache für Nicht-Entwickler.
4. **Warum (optional):** Warum löst diese Phase das Kernproblem?
5. **Eingehalten:** Relevante Regeln, z.B. 700-Zeilen-Limit, Theme-Farben, React-Loop-Schutz, Design-System.
6. **Architektur passt:** Kurze Begründung.
7. **Auffälligkeiten/Performance/Kritische Findings:** z.B. unnötiger `useEffect`, harte Farben, falsche Service-Ablage, Render-Loop-Risiko, veraltete Kommentare.

**Beispiel:**
```markdown
### ✅ Phase NUMMER — Kurzbeschreibung *z. B. Architektur, Modus-Trennung, Save-Basis*
**Ziel:** Hier schreiben, worum es geht.
* [x] `Komponente XYZ` erzeugt (604 Zeilen Code), .....
* [ ] `AUFGABE ABC` implementieren.
**Referenzen:**
`Hier Pfade der Unterplanungen, Historien, Completed, Besprechungen angeben`
`Jeweils getrennt pro Zeile`
**Ergebnis:** Frontend erzeugen für das Dashboard
```

### Kommentar-Sektion unter der Phasen/Todo-Planung
- Nach Abschluss pro Phase eine kurze Kriterien-Zeile schreiben.
- Auffälligkeiten/Fehler/Regelverstöße nach Schwere sortieren und bei Bedarf Refactoring-Plan empfehlen.

```markdown
## Kommentare
### Phase 1
**Eingehalten**: unter 700 Zeilen ✅, architektur ✅, Edge-Cases betrachtet ✅, ...
**Auffälligkeiten/Performance-Issues/Probleme/Kritische Findings (nach Schwere):**
1. 🔴 **Kritisch:** Start-Crash durch fehlerhafte QuizPack-Umwandlung
Beschreibung hierzu notieren, falls notwendig
Refactoring, Zeilenlimit überschrieben, Ungültige Tab-Werte entdeckt in Komponente XYZ und konnten eine Render-Schleife auslösen! Versehentlich angehängte Restzeilen entdeckt! Event-Werte blindcast entdeckt! State-Updates nicht idempotent - Rerender-Kette möglich!
2. 🟠 **Hoch:** über 700 Zeilen, Coding Regel gebrochen

### Phase 2....
```

Die Kommentar-Sektion steht **unterhalb aller Phasen/Todos**. Referenzen enthalten zusätzlich max. 3 Hauptkomponentenpfade pro Phase.

- **Findings:** Bei echten Auffälligkeiten direkt `docs/[feature]/tasks/...optimierung-tasks.md` mit Referenz auf die Planung anlegen; nach Abschluss aller Phasen/Todos abarbeiten.
- **Planungsgrenzen:** Kein vollständiger Code, keine kompletten React-Komponenten, keine Copy-paste-Blöcke. Erlaubt sind Konzepte, API-Signaturen, Dateistrukturen und Pseudo-Code bis 3-5 Zeilen.
- **Umfang:** Max. ~700 Zeilen pro Planung, 3-4 Komponenten pro Phase, max. ~900-1300 Codezeilen pro Phase.
- **Vor Code:** Existierende Funktionen suchen, Wiederverwendung vor Redundanz, Edge-Cases dokumentieren.
- **Architektur-Phasen/Todos:** Vorher/Nachher-Datenfluss in 3-6 Schritten ergänzen.
- **Sprache:** Menschenlesbar, einfach, mit Icons, Alltagsbeispielen und klarer Meinung.

### Planungs-Workflow (ZWINGEND VOR CODE)
1. **Planungsvalidierung (ZWINGEND VOR CODE):**
   - User-Planung mitgegeben? → Lesen, prüfen ob Task enthalten
   - Task enthalten? → JA: Implementieren · NEIN: Planung erweitern
   - Keine Planung? → In `docs/[feature]/tasks/` suchen oder neue nach Architekten-Regeln erstellen
   - **ERST nach Planungserweiterung darf programmiert werden!**
2. **Kontext sammeln:** Plan lesen · Ähnliche Dateien finden für Struktur/Coding-Richtlinien
3. **Phasen/Todos nacheinander implementieren:** Qualität vor Quantität, ohne Rückfrage bis alle Phasen/Todos abgeschlossen sind (außer externer Blocker)
4. **Plan aktualisieren (PFLICHT nach jeder Phase):** Phase als ✅ markieren · Arbeitsschritte dokumentieren · Entscheidungen festhalten · Edge Cases notieren · erledigte/offene To-dos und nächste Phase festhalten
5. **Kommentar-Sektion unter allen Phasen/Todos:** Eingehaltene Kriterien (kommasepariert) + Auffälligkeiten/Fehler nach Schwere sortieren (🔴🟠🟡) · Hauptkomponentenpfade (max 3 pro Phase, mit den meisten Änderungen) · Refactoring-Plan empfehlen bei Funden
6. **Orchestrator-Ausgabe (KRITISCH):** Solange weitere KI-umsetzbare Phasen/Todos offen sind, `NEXT_PHASE_READY` nutzen. Sobald nur noch manuelle User-Checks offen sind oder alle Phasen/Todos abgeschlossen sind, immer `ALL_PHASES_COMPLETE` nutzen.


**Dokumentation (NUR wenn ALLE Phasen/Todos fertig):** Feature-Overview, Sub-Features, Task-History, ggf. Master-Navigation updaten · Doku-Richtlinien beachten: `agents/dokumentier-regeln.md`

### Masterplan-System
- Bei großen Systemen: `docs/[feature]/tasks/[thema]-[masterplan].md` referenziert mehrere `[thema]-[task].md`
- Erstellen sobald Umfang/Abhängigkeiten es erfordern oder wenn User „erzeuge Masterplan" sagt
- Pflicht-Phasen/Todos-Pläne nach unserem Format
- Phasen am Stück umsetzen und dokumentieren, ohne Pause

### Umgang mit existierenden Planungen
**Erweiterung:** User möchte neues Feature → Abhängigkeiten prüfen · Integration planen · Edge Cases identifizieren · Neue Phasen hinzufügen
**Fehlerbehebung:** Bug in implementiertem Feature → Welche Phase betroffen? Edge Case nicht berücksichtigt? Plan erweitern mit Fehleranalyse + Fix
**Vollständige Neubewertung:** Grundlegende Überarbeitung → Status Quo erfassen · Refactoring vs. Neuentwicklung · Neue Planung mit Migration-Strategie

## 5. Subagents & Erkundung

### 5.1 Subagent-Nutzung (Pflicht)
- Subagents **nur zum Suchen und Abschließen** — nicht für Coding/Implementieren.
- Nicht nach Präferenz fragen, wenn der empfohlene Weg fachlich klar ist.

### 5.2 Pre-Task Reconnaissance (Pflicht bei größeren Tasks)
Pflicht bei Feature-Implementierung, Refactoring, Bug-Fixes über mehrere Dateien und allem mit >2 Dateien:
- Vor Coding parallel: `erkunder-docs` sucht in `docs/`, `.completed/`, History; `erkunder-code` findet betroffene Dateien und Duplikate.
- Bei neuen Dateien/Hooks/Stores/Utilities: `duplikat-checker`; 80%+ vorhandene Funktionalität → bestehendes Modul erweitern.
- Nach Coding: `abschliesser` erstellt `.completed/` und prüft CLAUDE.md-Relevanz.
- `ki-architekt` nur für Ist-Stand, Abweichungen, betroffene Dateien und Empfehlungen.
- Falls Subagents fehlen: token-effizient erstellen und User kurz informieren.

## 6. Architektur & React Practices

### Component-Based Architecture (WICHTIGSTE REGEL)
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!** → Performance-Killer (jedes Render neu erstellt) + State-Verlust. Jede Komponente in separater Datei.

### Komponenten-Organisation
- **Maximal 700 Zeilen Code pro Datei** — Auslagern wenn größer
- 🇩🇪 **Deutsch (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **Englisch (Technical):** Section, Card, Item → `ReviewSection.tsx`

### Sektionsbasierte Ordnerstruktur
```
ui/
├── quiz/                      
│   ├── (hauptSektion)/          
│   │   ├── (unterSektion)/     
│   │   │   ├── AktionButton.tsx 
│   │   │   └── KonfigPanel.tsx
│   │   ├── HauptSection.tsx     
│   │   └── DatenCard.tsx
│   └── ZeigerDreieck.tsx        
├── ui/                          
│   ├── SprechBlase.tsx
│   └── VorschlagChips.tsx
└── layout/                      
    └── ZeigerHuelle.tsx
```
- Ordnerstruktur = UI-Hierarchie · `(sektionsName)/`-Ordner gruppieren verwandte Komponenten
- Eine Hauptkomponente pro Sektion ohne Klammern (Sektions-Container) · Max 7 Verschachtelungsebenen
- **Frontend-to-Code Navigation:** UI-Element-Text = Dateiname (User klickt „Speichern" → `SpeichernButton.tsx`)

### Service-Ordnerstruktur: Sektion zuerst, `lib` nur global (PFLICHT)
- **Default-Regel:** Service/Helper/Finder/Action kommt in die Sektion, wo er fachlich genutzt wird (z. B. `app/notes/services/*`, `app/dashboard/services/*`).
- **`lib/` nur für globale Bausteine:** Nur Module, die wirklich sektionenübergreifend sind oder Plattform-Infrastruktur bilden.
- **Verboten:** Sektionsspezifische Fachlogik in `lib/` ablegen.
- **Entscheidungsregel vor neuer Datei:** Wird es nur in 1 Sektion genutzt? → **Sektion**. Wird es in 2+ Sektionen genutzt? → **global (`lib/`)**.
- **Pflicht bei globalen Modulen:** Klarer Ordnerzweck (`lib/global/*`, `lib/platform/*`, `lib/shared/*`) statt unscharfer Sammeldateien.
- **Import-Regel:** Sektionscode darf globale `lib`-Module nutzen, aber globale `lib`-Module dürfen keine Sektion importieren (kein Inversions-Chaos).

### DB-Architektur: technologieklar + Finder/Actions strikt getrennt (PFLICHT)
```text
db/
├── sqlite/
│   ├── schema/
│   ├── finders/
│   ├── actions/
│   └── runtime/
│       ├── browser/
│       ├── sqlocal/
│       ├── capacitor/
│       └── recovery/
├── postgres/
│   ├── schema/
│   ├── finders/
│   ├── actions/
│   ├── drizzle/
│   └── migrations/
└── shared/
    ├── types/
    ├── guards/
    └── utils/
```
- **Finder-Regel:** Finder lesen nur (SELECT/Read), keine Schreiboperationen.
- **Action-Regel:** Actions schreiben (INSERT/UPDATE/DELETE/Upsert/Side-Effects); Read-only-Logik bleibt in Findern.
- **Import-Regel (hart):** Dateien unter `db/*/finders/*` dürfen keine Module aus `db/*/actions/*` importieren.
- **Domain-Pflicht unter SQLite:** `db/sqlite/finders/<domain>/*` und `db/sqlite/actions/<domain>/*` sind verpflichtend. Keine neuen Root-Dateien direkt in `finders/` oder `actions/`.
- **Naming-Pflicht:** `*.finder.ts` für Read-Module, `*.action.ts` für Write-Module.
- **Legacy-Hinweis:** Bestehende `*.local.ts`-Dateien sind bis zur schrittweisen Umbenennung erlaubt, müssen aber fachlich sauber in Domain-Ordnern liegen.
- **Technologie muss am Pfad erkennbar sein:** SQLite/Postgres/Browser/Capacitor nicht verstecken.
- **Client-Schicht-Regel (`db/sqlite/client/*`):** Nach Fachbereich gliedern; nur typsichere DB-Facades für Aufrufer bereitstellen, keine versteckte Runtime-Initialisierung.
- **`databases/`-Ordner-Regel:** Nur Datenbankdateien/Artefakte (z. B. `.db`, Dumps), keine Laufzeitlogik.
- **SQLite-Dateiablage (Pflicht):** SQLite-Dateien, Profil-DBs und ähnliche Artefakte liegen unter `db/sqlite/files/*`, nicht im `db/`-Root.
- **Mischdateien auflösen:** Enthält eine Datei Read + Write, muss sie in Finder + Action gesplittet werden.
- **Globale DB-Utilities:** Nur in `db/shared/*`; keine Fachlogik in `db/shared`.
### React Best Practices
- **State & Props:** Immutable `setState(prev => ...)` · Stable unique `key` für `.map()` · `useState` = re-render, `useRef` = no re-render
- **Memoization:** `useMemo` (expensive calculations) · `useCallback` (functions as props) · `React.memo` (components)
- **Effects & Lifecycle:** IMMER cleanup function bei subscriptions/timers/listeners · Accurate dependencies · `[]` = mount only
- **Component Communication:** Props down, Callbacks up · 2-3 Levels: Lifting State Up · 3+ Levels: Context/State Management · Referenz: `shared-docs/react-core-communication-patterns.md`
- **Stale Closure Pattern:**
  ```typescript
  // ❌ FALSCH - habits ist noch ALTER State!
  setHabits(prev => prev.map(h => ...));
  onHabitsUpdate?.(habits);

  // ✅ RICHTIG - Callback mit neuen Daten
  setHabits(prev => {
    const updated = prev.map(h => ...);
    onHabitsUpdate?.(updated);
    return updated;
  });
  ```

#### Render-Loop & Hydration Guard (PFLICHT)
- **NIEMALS State im Render-Pfad setzen:** Kein `setState`, `setStore`, `dispatch` oder Context-Update im Komponenten-Body, in JSX-Ausdrücken oder in Funktionen, die während Render direkt ausgeführt werden.
- **NIEMALS Setter in Setter-Updaters verschachteln:** Kein `setX(prev => { setY(...); return ...; })`. Erst Zielzustand berechnen, dann Updates getrennt außerhalb des Updaters ausführen.
- **NIEMALS interaktive Elemente ineinander verschachteln:** Kein `<button>` in `<button>`, kein Link in Button, kein Button in Link. Bei klickbaren Zeilen: Wrapper als `div` mit `role="button"` + `tabIndex` + Tastatursteuerung nutzen.
- **Pflicht-Check nach UI-Änderungen:** `pnpm exec next lint --file <geänderte-datei>` auf jede angepasste UI-Datei.
- **Stop-Regel bei Warnungen:** Bei `validateDOMNesting`, `Cannot update a component while rendering`, `Too many re-renders` oder Hydration-Warnungen sofort Root Cause fixen, nicht unterdrücken.
- **NIEMALS Parent-State in useEffect "korrigieren" (KRITISCH!):**
  ```typescript
  // ❌ FALSCH - Erzeugt Infinite Loop!
  useEffect(() => {
    if (activeTab !== effectiveTab) {
      onTabChange(effectiveTab); // Parent-Update → Re-Render → useEffect erneut → Loop
    }
  }, [activeTab, effectiveTab, onTabChange]);

  // ✅ RICHTIG - Berechneten Wert direkt nutzen, Parent nicht "korrigieren"
  const effectiveTab = allowedTabs.includes(activeTab) ? activeTab : defaultTab;
  // effectiveTab direkt an <Tabs value={effectiveTab}> übergeben
  ```
  **Warum:** useEffect triggert nach jedem Render. Wenn es Parent-State ändert → neuer Render → useEffect erneut → `Maximum update depth exceeded`. Kombiniert mit Radix UI Refs (Tooltip, Popover) wird das Problem verstärkt.

### Controlled-Value Guard & Patch-Hygiene (PFLICHT)
- **Kontrollierte UI-Werte immer validieren:** Bei `Tabs`, `Select`, `Popover` usw. nur erlaubte Werte an den State weitergeben (Allowlist-Prinzip).
- **Fallback bei nicht verfügbaren Features:** Wenn ein Wert auf der aktuellen Plattform nicht erlaubt ist (z.B. `terminal` im Browser), sofort auf sicheren Wert zurückfallen (`chat` oder Default-Tab).
- **Event-Werte nie blind casten:** Kein `onValueChange={v => setState(v as MyType)}` ohne Laufzeitcheck.
- **State-Updates idempotent halten:** Nur updaten, wenn sich der Wert wirklich geändert hat (`prev === next ? prev : next`), damit keine unnötigen Re-Render-Ketten entstehen.
- **Custom-Event-Payloads deduplizieren (PFLICHT):** Bei `window.dispatchEvent` + Listener-`setState` immer semantischen Vergleich nutzen (z. B. Snapshot-Key). Identische Payload darf weder erneut dispatcht noch erneut in State geschrieben werden.
- **Scope-Merge deterministisch halten (PFLICHT):** In Normalizern niemals `Date.now()` als Fallback für Scope-Felder nutzen. Fallbacks müssen stabil sein (z. B. `0`), sonst entstehen künstliche `"scopeChanged"`-Schleifen.
- **Session-Lese-Fallback im Chat-Store (PFLICHT):** Wenn `sessionId` fehlt oder `null` ist, dürfen `getMessagesForSession`/`getToolMessagesForSession` nicht auf einen leeren Default-Slice zeigen. In diesem Fall immer auf den Legacy-Top-Level-Fallback (`state.messages`, `state.toolMessages`) zurückfallen.
- **Patch-Hygiene nach schnellen Edits:** Nach jedem Patch Dateiende prüfen (keine angehängten JSX-Reste, keine duplizierten Abschlussblöcke).
- **Pflicht-Check danach:** `pnpm exec next lint --file <datei>`; bei auffälligem Laufzeitverhalten zusätzlich `pnpm exec tsc --noEmit` und Fehlerstellen dokumentieren.

### Globaler React-Loop-Schutz (PFLICHT, für alle Projekttypen)
- **Gilt überall:** Diese Regeln gelten für klassische Web-Apps, Spiele-UIs/HUDs, Fitness-Apps, Mobile-Frontends und Desktop-Apps gleichermaßen.
- **Write-Back-Effekte nie ohne Guard:** Ein `useEffect`, das Zustand in Store/DB zurückschreibt, muss deduplizieren (z. B. `signatureRef`) und darf nicht bei semantisch identischen Daten erneut schreiben.
- **Idempotente Store-Actions als Standard:** Jede `update*`-Action muss bei No-Op den alten State zurückgeben (`return state`), statt neue Objekte zu erzeugen.
- **Deterministische Normalisierung:** In Merge-/Normalizer-Pfaden keine zeitbasierten Fallbacks wie `Date.now()` verwenden. Nur stabile Fallbacks (`0`, `null`, feste Defaults).
- **Einweg-Sync statt Ping-Pong:** Synchronisation immer von der echten Quelle aus triggern (z. B. `entry.updatedAtMs`) und nicht von der bereits zurückgeschriebenen Zielrepräsentation.
- **Bei Loop-Fehlern sofort Root Cause prüfen:** `Maximum update depth exceeded`, `Too many re-renders` und `Cannot update while rendering` sind Stop-Signale. Nicht unterdrücken, sondern Update-Kette im Stacktrace bis zur ersten eigenen Datei zurückverfolgen.

**Vorfall-Merkhilfe (2026-04-24, einfach erklärt):**
- Ungültige Tab-Werte konnten eine Render-Schleife auslösen.
- Versehentlich angehängte Restzeilen machten den UI-Stack instabil.
- Falscher Zugriff auf `workspaces` (Array statt Objekt-Mapping) erzeugte TypeScript-Fehler.
- UI-Werte immer prüfen (nicht blind casten),
- nur bei echter Änderung State setzen,
- bei nicht unterstütztem Wert sofort auf sicheren Fallback,
- nach Patch immer Dateiende + Lint prüfen.

**Vorfall-Merkhilfe (2026-05-05, HudTabBar Infinite Loop):**
- useEffect rief `onTabChange(effectiveTab)` auf wenn `activeTab !== effectiveTab`
- Parent-Update → Re-Render → useEffect erneut → `Maximum update depth exceeded`
- Radix UI Tooltip-Refs verstärkten das Problem (setRef-Schleifen)
- **Fix:** useEffect entfernt, `effectiveTab` direkt an Tabs übergeben ohne Parent-"Korrektur"
- **Regel:** Niemals Parent-Callbacks in useEffect aufrufen, die denselben Wert "korrigieren" sollen

**Vorfall-Merkhilfe (2026-05-06, WorkspaceScope + Provider Snapshot Loop):**
- `autoprocess:provider-selected` konnte identische Snapshots wiederholt dispatchen → Listener setzte immer neues Objekt in State.
- `workspaceScopeJson` konnte sich künstlich ändern, weil fehlendes `updatedAtMs` mit `Date.now()` normalisiert wurde.
- Folge: `Scope-Merge -> Session aktualisiert` in Schleife und wiederkehrend `Maximum update depth exceeded`.
- **Fix:** Snapshot-Sender und Snapshot-Listener beidseitig idempotent gemacht + Scope-Normalisierung deterministisch (`0` statt `Date.now()` Fallback).

**Vorfall-Merkhilfe (2026-05-08, Leere Chat-Ansicht trotz erfolgreichem Lauf):**
- In einem CLI-Flow ohne numerische `sessionId` wurden User-/Assistant-Nachrichten geschrieben, aber beim Lesen als leer behandelt.
- Ursache: Session-Reader nutzte für `null` einen leeren Default-Slice statt Legacy-Top-Level-State.
- Verstärker: Restore-Timeout konnte zu früh `restoreComplete` setzen, bevor DB-Fallback-Daten ankamen.
- **Fix:** Session-Lese-Fallback für `null` auf Top-Level-Store ergänzt + Restore-Apply erst bei echten Daten markiert.

#### Tooltip-System: <HintTooltip> als defensiver Standard (PFLICHT, 2026-05-05)
- **Standard:** `import { HintTooltip } from '@/components/ui/hint-tooltip'`
  ```tsx
  <HintTooltip label="Speichern (Strg+S)">
    <button onClick={save}>Speichern</button>
  </HintTooltip>
  ```
  Wrappt children automatisch in einen ref-stabilen `<span>` → setRef-Loops unmöglich, auch bei `motion.*` mit `layoutId`, conditional Rendering oder forwardRef-Komponenten als Child.
- **Fallback (Spezialfälle):** Direkter `<Tooltip>/<TooltipTrigger asChild>`-Trigger NUR wenn der direkte Child garantiert ref-stabil ist (kein `motion.*`, kein bedingter Mount/Unmount im Subtree, kein verschachteltes asChild).
- **Dev-Schutz:** `TooltipTrigger` warnt im Dev-Build, sobald `asChild` mit einem `motion.*`-Child kombiniert wird (Heuristik in `components/ui/tooltip.tsx`).
- **Antipattern:** `<TooltipTrigger asChild><button>{cond && <motion.div layoutId="..." />}</button></TooltipTrigger>` → genau das hat 2026-05-05 die `setRef`-Schleife im HudTabBar ausgelöst.

### Performance: React, Daten & Web
- Unabhängige Fetches parallel: `Promise.all([fetch1(), fetch2()])`
- Polling Cleanup: Jeder useEffect mit Timers/Subscriptions MUSS Cleanup-Function haben
- N+1 Prevention: Nested Queries in Loops → Batch-Loading mit JOINs oder `inArray()`

### 3D, Three.js & WebGPU

- **PFLICHT: Three.js Rules lesen:** Falls an irgendwelchen Dateien gearbeitet wird, die mit Three.js, R3F, Shaders, Mesh-Erstellung, Lichtquellen oder WebGL/WebGPU-Render-Optionen zu tun haben, MÜSSEN zwingend die [THREEJS-RULES.md](file:///D:/CODING/React%20Projects/7-3D-Voxel-Samurai-Quiz/shared-docs/THREEJS-RULES.md) gelesen und befolgt werden. In den `THREEJS-RULES.md` sind alle Pflichtregeln zu Instancing, Schatten-Budgetierung, Lag-Pflichtchecks und Partikeln zentralisiert.

### Multiplayer, Colyseus & Kampfgefühl

- **PFLICHT: Colyseus- & Kampfgefühl-Regeln lesen:** Falls an Colyseus-State-Synchronisation, Multiplayer-Events, Hitboxen, Schadens-Timing, Sounds oder Network-Visuals gearbeitet wird, MÜSSEN zwingend die Multiplayer-Regeln im hinteren Teil von [THREEJS-RULES.md](file:///D:/CODING/React%20Projects/7-3D-Voxel-Samurai-Quiz/shared-docs/THREEJS-RULES.md) (Abschnitt 17) gelesen und befolgt werden.

### Frontend Regeln & Antipatterns!
- **Bestehendes Design zuerst prüfen:** Globale CSS-/Tailwind-Klassen, Theme-Variablen und `DESIGN.md` lesen; dieselbe Farbpalette weiterverwenden.
- **Solide Hintergrundfarben für Dialoge/Overlays (PFLICHT!):**
  - ❌ VERBOTEN: `bg-black/40`, `bg-black/50`, `bg-white/10` oder jede andere Tailwind-Opacity-Notation als Haupthintergrund z.B. `bg-green-500`, `bg-red-600`... **Warum?** Halbtransparente Hintergründe sorgen für Probleme, aufgrund von Capacitor-Einstellungen bei uns!
  - Außer Border ist es Pflicht, so transparent wie möglich die Borders zu machen; nutze am besten `border-subtle`, `--border` oder sehr dunkle Darkmode-Borders.
  - ✅ PFLICHT:
    1. Entweder prüfen ob globale css Klassen existieren/theming-system, wo Farben schon dran sind z.B: `[data-theme="default"] { --background: 0 0% 100%; --foreground: 0 0% 3.9%; --card: 0 0% 100%;...}`
    2. ODER: `bg-[#0c0f1a]` - immer volle Opacity!
      - Achte hier auf eine hochwertige Farbpalette, minimalistisch, dunkel und lightmode orientiert - schaue hierzu unbedingt `\shared-docs\farbpalette\minimal-styling-template.css`
- **Dialog-Schärfe statt grundlosem Blur (PFLICHT):** Dichte Lese-, API-Key-, Modell-, Experten- und Einstellungsdialoge dürfen keinen starken `backdrop-filter` nutzen. Vermeide dort `gfx-backdrop-blur-*`, `gfx-blur-backdrop-*`, `backdrop-blur-*`, `bg-blur*` und `nd-dialog-overlay-blur`, außer eine kurze Design-/Performance-Begründung steht direkt im Task und Electron zeigt scharfen Text. Nutze für solche Dialoge solide Flächen wie `bg-background`, `bg-card` oder `bg-surface-*`.
- **Dialog-/Dropdown-Pointer-Lock-Schutz (KRITISCH):** Dialoge nie direkt aus einem noch modal offenen Dropdown, Popover oder ContextMenu heraus offen lassen. Vor dem Öffnen eines Dialogs das auslösende Menü/Popover schließen oder den Menü-Root bewusst non-modal halten. Symptom bei Verstoß: Die App ist sichtbar, aber nach `Abbrechen`/`Schließen` nicht mehr anklickbar, weil `body.style.pointerEvents = "none"` hängen bleiben kann. Globaler Cleanup darf diesen Body-Lock nur nach Close und nur ohne offenen Overlay-Layer entfernen. Niemals per CSS `body { pointer-events: auto !important; }` erzwingen, weil das echte modale Dialoge kaputtmacht.
- **Dark/Light Mode + Surface-Skala:** Hintergründe schwarz/grau halten (`#000`, `#0A0A0A`, `#111`, `#1A1A1A`, `#222`, `#2A2A2A`, `#333`) und im Lightmode sauber spiegeln; Akzent-Themes ändern nur Primary/Secondary, nie die Surface-Skala.
- **Mobile-First Space Efficiency:** UI kompakt halten, Breite/Höhe nutzen, seltene Optionen in Popover/Dropdown/Collapsible/Dialog verstecken.
- **Wiederverwendbarkeit-First:** Dialoge/Komponenten mit Modi, Callback-Props und vorhandenen Patterns bauen.
- **Recherche vor Rumprobieren (KRITISCH!):** Stacktrace lesen → Docs/GitHub Issues prüfen → Root Cause verstehen → erst dann fixen. Bei demselben Fehler zweimal: 3-5 Lösungswege recherchieren, effizientesten umsetzen.
- **UI Library Defaults respektieren:** Niemals Standard-Höhe/Padding von Radix/Shadcn manuell überschreiben → vorhandene Variants nutzen (`size="sm"`, `size="lg"`) oder Variant-System erweitern.
- **Rounded/Floating UI:** Karten und Sektions-Container `rounded-2xl` bis `rounded-4xl`, bevorzugt `rounded-3xl`; Floating über subtile Shadows und solide Flächen. Backdrop-Blur nur bewusst und sparsam einsetzen, nicht in dichten Lesedialogen.
- **Icons/Farben:** Icons in Buttons/Toolbars nutzen; Bedeutungsfarben verwenden (Speichern/Start/Erfolg = Success, Abbrechen/Gefahr = Danger).
- **Icon-First + Text nur wenn nötig (PFLICHT):** In dichten Toolbars/Sidebars primär mit Icons arbeiten; sichtbare Labels nur bei wirklich nötiger Erklärung. Jeder Icon-Button braucht `aria-label` + Tooltip. Eindeutige Aktions-Icons sind Pflicht (z. B. `X` für „Schließen“, korrektes Mehrfachauswahl-Icon statt Plus-Symbol).
- **Kompakte Control-Layouts (PFLICHT):** Inputs/Filter dürfen nicht unnötig eine ganze Zeile blockieren. Platz in mehreren Zeilen/Spalten nutzen (z. B. 2er-Grid), kurze Werte als kompakte Felder darstellen und Langlabels wie „Stunden“/„Textgröße“ in Tooltip oder Kontexttext auslagern.
- **Gruppierte Toolbars:** Zusammengehörige Icon-Aktionen in Button-Gruppen bündeln (`rounded-2xl border border-subtle bg-surface-2 p-1`), innere Buttons `rounded-xl`, klare Trenner nur zwischen Aktionsarten.
- **Radix Trigger-Ref-Sicherheit (KRITISCH):** Bei `TooltipTrigger`/`PopoverTrigger` `asChild` nur nutzen, wenn das Child garantiert ref-stabil ist. Für normale Buttons immer direkten Trigger verwenden (`<TooltipTrigger type="button" ...>`), um `setRef`-Schleifen und `Maximum update depth exceeded` zu vermeiden.
- **Tooltip-Standard:** `<HintTooltip label="...">` aus `components/ui/hint-tooltip.tsx` ist der defensive Default — wrappt children in stabilen `<span>` und schützt vor setRef-Loops bei motion.*/conditional Childs.
- **Disabled Button Feedback:** MUSS über Tooltip/Hinweistext erklären WARUM deaktiviert. User darf nie raten müssen.
- **Ressourcen-Blocker in HUD/Skill-UI:** Wenn ein Skill wegen Mana/Energie/Fokus nicht nutzbar ist, muss die UI sichtbar den Grund und möglichst den konkreten Bedarf zeigen (z.B. `NO MP`, `Need 18 MP`, Tooltip mit `18/110`). Nicht nur ausgrauen.
- **Dropdown/Popover Stacking-Check:** Vor jedem UI-Change an Dropdowns/Selects/Popovers prüfen: overflow/stacking-context? Portal-Rendering? z-index-Priorität? · Niemals nur höheren z-index als Workaround — erst Ursache im Layout/Portal/Overflow beheben

## Code-Sicherheit & manuelle Produktprüfung
### 8.2 Sichtbare Ergebnisqualität / Visual Acceptance Gate
- **Code-Sicherheit ist kein Produktbeweis:** Lint, TypeScript, gespeicherte Daten, generierte Screenshots, grüne Konsolenlogs oder ein erfolgreiches Playwright-Skript beweisen nur, dass etwas technisch ausgeführt wurde. Sie beweisen nicht, dass das sichtbare Ergebnis gut, lesbar, fachlich richtig oder nutzbar ist.
- **Akzeptanzkriterien vor Umsetzung ableiten:** Bei jeder sichtbaren oder produktnahen Aufgabe zuerst 3-7 konkrete Prüffragen aus dem Userziel notieren. Beispiele: Sind in einer Animation beide Hände sichtbar? Liegt die Klinge auf der Mittellinie? Ist Text in einer Notiz lesbar und nicht abgeschnitten? Stimmen Einheiten und Tageswerte in einem Fitnessplan? Zeigt ein Dashboard die wichtigste Zahl ohne Scrollen?
- **Screenshots aktiv beurteilen:** Wenn der User Browser, Playwright, Screenshot, Referenzbild oder visuellen Vergleich beauftragt, muss das Bild gegen diese Prüffragen bewertet werden. Ein Screenshot, der sichtbar falsch aussieht, ist ein Fehlerbeweis. Er darf nie als Abschlussbeweis genutzt werden.
- **Abnahme-Viewport zuerst herstellen:** Vor jedem visuellen Urteil mit Playwright/Browser/Preview zuerst die Arbeitsfläche so groß und frei wie möglich machen: Viewport/Fenster maximieren, störende Sidebars einklappen oder passend verbreitern, Referenzbilder groß genug anzeigen, Kamera/Zoom auf das Prüfobjekt ausrichten und Debug-/Handle-/Overlay-Elemente ausblenden. Wenn das Hauptobjekt nicht klar sichtbar ist, ist der Screenshot kein gültiger Abnahme-Screenshot.
- **Bewegte Objekte aktiv verfolgen:** Wenn das geprüfte Objekt sich bewegt, scrollt, animiert, springt, zoomt oder per Root-Motion/Transition die Position ändert, muss das Prüfwerkzeug eine klare Follow-/Center-/Keep-visible-Funktion haben und diese vor dem Screenshot bewusst setzen. Relevante Bewegung muss sichtbar messbar sein, z. B. als Pfad, Distanz, Scrollposition, Timeline-Zeit oder Vorher/Nachher-Versatz. Ein Screenshot, bei dem das Hauptobjekt aus dem Bild läuft oder nur zufällig sichtbar ist, ist kein gültiges Gate.
- **Kamera-Presets für Bewegungsgates:** Bei 3D-, Canvas- oder Preview-Werkzeugen mit bewegten Figuren braucht die Abnahme mindestens Keep-visible/Follow, Center/Fit und klare Prüfperspektiven wie Front, Side, Back und Top. Die Bewegungsstrecke muss im Tool sichtbar und exportierbar sein, z. B. als Skill-Pfad, Distanz, Offset oder Timeline-State.
- **Werkzeug darf Fehler nicht verdecken:** Editor-Hilfen wie Joint-Handles, Pfad-Overlays, Grid-Markierungen, Tooltips oder Mini-Maps dürfen die eigentliche Produktansicht nicht überdecken. Für Abnahmen braucht es einen Clean-/Gate-Modus; falls er fehlt, ist das Tooling Teil des Bugs und wird vor weiterer Feinarbeit verbessert.
- **Nicht hinter manuellen Gates verstecken:** Wenn bereits ein Screenshot, Log, Preview, Datenexport oder sichtbarer Zustand vorliegt, muss er fachlich bewertet werden. Nur wenn wirklich keine automatische oder eigene Sichtprüfung erlaubt oder möglich ist, als `manuelles Gate` dokumentieren.
- **Fertig nur bei bestandenem Gate:** Eine Phase darf nicht als `success`, `fertig` oder `completed` dokumentiert werden, solange die sichtbaren Kernkriterien nicht erfüllt sind. Dann ehrlich `partial`, `blocked`, `manual gate` oder `technisch umgesetzt, visuell nicht abgenommen` schreiben.
- **Allgemeine Beispiele:** UI-Arbeit braucht Lesbarkeit, Layout, leere Zustände und Interaktion. Notizen-/Dokumentarbeit braucht korrekte Struktur, verständlichen Text und keine abgeschnittenen Inhalte. Fitness-/Datenarbeit braucht plausible Werte, Einheiten und Zeiträume. Animation/VFX braucht Pose, Timing, Silhouette, Bewegungspfad, Sound/VFX-Lesbarkeit und Vergleich zum Zielbild.
- **Bei wiederholtem visuellen Scheitern:** Nicht weiter einzelne Werte drehen. Erst Root Cause nennen, Vergleichsreferenz prüfen, Editor/Tooling verbessern und dann erneut implementieren. Wenn das Werkzeug schlechte Ergebnisse nicht erkennt, ist das Werkzeug Teil des Bugs.

### 8.1 TypeScript
- Statische Code-Sicherheitschecks (`pnpm lint`, `pnpm exec tsc --noEmit`) sind nur Kompilier- und Typ-Schutz. Sie beweisen kein Gameplay, keine Werte, kein Kampfgefühl und keine Multiplayer-Lesbarkeit.
- Bei reinen Doku-, Prompt- oder Regeländerungen keine Tests/Checks starten.
- Bei echten Codeänderungen dürfen Lint/TypeScript genutzt werden, wenn sie den geänderten Scope absichern. Ergebnis als Code-Sicherheit dokumentieren, nicht als Produktprüfung.
- **Fehler direkt mitfixen (Pflicht):** Wenn du im bearbeiteten Scope sichtbare Fehler findest (TS, Lint, Runtime), dann sofort beheben und nicht „für später“ liegen lassen.
- **Keine UI-Tests ohne User-Befehl (PFLICHT):** Keine Browser-, Playwright-, Screenshot-, DOM-Snapshot-, Recorder-, Ingame-, Smoke-, Bot-, Serverwert- oder manuellen UI-Checks automatisch starten. Nur ausführen, wenn der User es klar befiehlt. Sonst Research, Codeänderung und manuellen User-Blocker dokumentieren.
- **Keine stille Playwright-Ausnahme:** Auch reine Frontend-/Layout- oder Mock-Abgleiche laufen nur, wenn der User sie ausdrücklich befiehlt. Ohne Befehl: beschreiben, was der User manuell prüfen soll.
- **Keine Playwright-/Browser-Use-Performance-Tests für 3D-FPS:** Headless-Chromium hat keinen echten GPU-Treiber und liefert keine aussagekräftigen FPS-Werte. Browser-/Playwright-Checks sind nur bei User-Befehl erlaubt und bleiben **NICHT** erlaubt als 3D-Frame-Benchmark, WebGPU-A/B-Vergleich oder VFX-Performance-Messung. Echte Performance-Messung läuft nur über echten Chrome/Edge mit DevTools-Performance-Tab + Recording-Export. Bei Bedarf User um manuelle Recording-Aufnahme bitten und Pfad in `docs/performance/recordings/` ablegen.
- **Keine neuen Tests erstellen:** Es werden **keine** Unit-/Integration-/E2E-Tests neu erzeugt, außer der User fordert es ausdrücklich.
- **Keine Testarbeit ohne expliziten Auftrag:** Keine bestehenden Tests umbauen und keine Test-Konfigurationen (z. B. `vitest.config.ts`) ändern, außer der User verlangt es klar.

## Referenzen & Qualitäts-Checkliste

### Framework-Dokumentation
| Framework | Dokumentation |
| --- | --- |
| React Native/Expo | `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md` |
| Next.js | `shared-docs/skills/nextjs-rules/NEXTJS-RULES.md` |
|  |  |
| Capacitor | `shared-docs/performance/capacitor-performance-rules.md` |
| Liquid Glass (Tailwind) | `shared-docs/design/liquid-glass-guide.md` |
| DB Live Testing (Postgres) | `shared-docs/database-testing-guide.md` |
| Browser-Testing | `shared-docs/agents/agent-browser/SKILL.md` |
| NoteDrill Playwright-Findings | `shared-docs/agents/agent-browser/notedrill-playwright-findings.md` |
| NoteDrill Electron Playwright CLI | `shared-docs/agents/agent-browser/notedrill-electron-playwright-cli-reference.md` |

### Qualitäts-Kriterien (bei jeder Planung & Implementierung prüfen)
- ✅ Wartbarkeit · Modularität · Helper/Services · klare Trennung von UI/Logik/Daten · gute Architektur · simpel/wiederverwendbar · Performance/Edge-Cases · eigene fachliche Meinung in Planungen.

### Quick Checklist
- Bei Codeänderungen: Lint/TypeScript nur als Code-Sicherheitscheck nutzen, nicht als Gameplay-Beweis
- Gesichtselement-Regel im ganzen Spiel: Nur Augen sind erlaubt. Keine Münder, Gesichtslinien, Faceplates, Visor-/Maskenstreifen, Stirn-Gems oder andere gesichtsähnliche Markierungen an Charakteren/Gegnern.
- Mobile-First
- Max 700 lines/file
- Keine UI-/Browser-/Playwright-/Screenshot-/Smoke-/Ingame-Tests ohne klaren User-Befehl
- Frontend-Mock- und Layout-Abgleich nur manuell dokumentieren, außer der User befiehlt den UI-Test ausdrücklich
- Keine neuen Tests schreiben oder planen (Unit/Integration/E2E), außer explizit angefordert
- Keine Test-Konfiguration ändern (z. B. `vitest.config.ts`), außer explizit angefordert
- Sichtbare Fehler im bearbeiteten Scope sofort mitfixen
- Bei großer Datei: in Unterkomponenten/Helpers/Services aufteilen
- Keine automatischen Multiplayer-Smokes, Serverwert-Beweise oder selbst gebauten Prüfmechanismen
- Commite nach Abschluss aller Phasen/Todos aus einer Masterplanung mit schöner Commit message
- Nach jeder Phase Task-Datei aktualisieren: erledigt/offen/nächste Phase + max 3 Hauptkomponentenpfade
- Bei Browser-/Playwright-Arbeit: offiziellen Playwright-Skill + `shared-docs/agents/agent-browser/notedrill-playwright-findings.md` lesen; Playwright-CLI zuerst mit Edge/System-Edge ausführen und nicht durch Browser-use ersetzen; bei Electron zusätzlich `shared-docs/agents/agent-browser/notedrill-electron-playwright-cli-reference.md`; neue Findings sofort in Task/Masterplan sichern
- WebFetch/Websuche sinnvoll nutzen, besonders bei wiederholten Fehlern oder unsicherer externer Doku.

## Erzeuge Signaltöne anhand deines Fortschritts
**so gehts in Windows:**
**Phase/Todo implementiert oder fertig**: `powershell -c "[console]::beep(400,800)"` (längere Dauer)
**Alle Phasen/Todos fertig**: `powershell -c "[console]::beep(400,300); Start-Sleep -Milliseconds 100; [console]::beep(400,300)"` (Doppel-Beep)

# Wichtige Regeln / Zusammenfassung
**NIEMALS automatisch `pnpm run dev` oder `pnpm dev` starten!**
- Der Dev-Server läuft oft bereits im Hintergrund (zu 90% der Fälle)
- Automatisches Starten verursacht Port-Konflikte (EADDRINUSE)
- Sollte der wirklich nicht laufen, dann darfst du den starten
- Bei vom User befohlenen UI-Tests: Prüfen ob Server bereits läuft, nicht blind starten
- Halte dich an die Design/Layout Regeln, möglicherweise tailwind css klassen, globals.css oder in DESIGN.md reinschauen, falls nicht auffindbar, erzeuge eine bzw nutze hier das beispiel als vorlage: `D:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension\shared-docs\farbpalette\darkmode.css`

**NIEMALS automatisch CLI-, Terminal- oder PowerShell-Prozesse im Hintergrund starten!**
- Kein `codex`, `gemini`, `claude`, `opencode`, `cmdc`, `command-code`, `agy`, `qwen`, `kilo`, `powershell`, `cmd.exe` oder Terminalfenster nur für Statusanzeige, App-Start, Notes-Öffnen, Chat-Header, Watcher-Event, Modellselector oder Hover/Popover starten.
- **CPU-Auslastung & Unsichtbarkeit (Kritisch):** Das automatische oder leichtfertige Starten von CLI-Modellen (z.B. für lokale KI-Chats/Abfragen) erzeugt eine extrem hohe CPU-Auslastung (oft bis zu 100% Core Load). Da diese Hintergrund-Prozesse für den Nutzer völlig unsichtbar laufen, bemerkt er die Ursache des plötzlichen System-Lags gar nicht. CLI-Modellprozesse dürfen daher nur und ausschließlich durch eine explizite, bewusste Aktion des Nutzers (z.B. Absenden einer Nachricht im spezifischen CLI-Chat) initiiert werden.
- Hintergrundpfade dürfen nur Cache, gespeicherte JSON-Dateien, Env-Signale oder leichte Dateisystem-Metadaten lesen. Das ist wie auf einen Zettel schauen, nicht wie eine Maschine anschalten.
- Echte CLI-Prozesse sind nur erlaubt bei klarer Nutzeraktion: Chat senden, Terminalprofil starten, Login-Klick, manueller „Aktualisieren/Prüfen“-Button oder ausdrücklich beauftragter CLI-Test.
- Datei-Watcher dürfen UI-Status melden, aber niemals `forceRefresh`, `refreshAll`, `refreshOne`, Detection mit Versionsprobe oder Account-Usage-Abfragen starten.
- Codex-/Gemini-/Command-Code-Konten zeigen gespeicherte Daten sofort an; Live-Limits oder Account-Details werden nur manuell aktualisiert.
- Nach jedem CLI-Start muss der Prozess sauber beendet, abgebrochen oder vom Nutzer bewusst als Terminalfenster weitergeführt werden.

**Nie überspringen:**
- React Loop-Stopper aus Abschnitt 6 anwenden: idempotente Updates, Dedupe-Guards, keine `Date.now()`-Fallbacks in Normalizern, Root Cause bei Loop-Fehlern verfolgen.
- Orchestrator-Regeln aus Abschnitt 3 anwenden: Phase dokumentieren, Mini-Check, korrekter Endstatus; bei manuellen UI-/Gameplay-Checks immer `ALL_PHASES_COMPLETE`.
- UTF-8 sauber halten: nach Doku-Edits auf Mojibake (`Ã`, `â`, `ðŸ`) prüfen.
  - Fremde parallele Änderungen nicht revertieren; damit arbeiten oder ignorieren, wenn sie nicht zum Scope gehören.
- Bei wiederholtem Fehler nicht kämpfen: recherchieren, 3-5 Lösungswege vergleichen, kleinste stabile Lösung umsetzen.
- Bei Browser-/Playwright-Fehlern nicht auf Gedächtnis vertrauen: Findings in Task/Masterplan und bei Wiederverwendung in `shared-docs/agents/agent-browser/notedrill-playwright-findings.md` schreiben.
- Erkläre nach Abschluss aller Phasen bzw. Todos wie der User deine Änderungen in der UI sehen kann, über welche Buttons, Befehle, Pfad, sodass der User schnell das ganze testen kann in Stichpunkten, was er klicken soll, worauf er achten soll
- Wenn du denkst, du bist mit allen Todos fertig, dann bitte nochmal in der Masterplanung alle Punkte nochmal durchgehen, ob wirklich alles korrekt implementiert ist. Das ist wichtig. Sehr, sehr wichtige Regel, auch wenn die To-dos schon alle abgehakt sind, solltest du dennoch prüfen - PFLICHT!
