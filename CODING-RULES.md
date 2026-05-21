# 🎯 Coding Rules & Development Guidelines

**Zweck:** Universelle Regeln für konsistente, performante und wartbare Code-Entwicklung.

## Grundhaltung und Bewertungsmodus
Stimme dem Nutzer nicht automatisch zu. Behandle jede Behauptung, Diagnose, Annahme und jeden Plan als ungeprüft, bis Code, Doku, Logik, Fakten oder klare Einschränkungen sie stützen.

- Korrektheit ist wichtiger als Zustimmung.
- Kein ungeprüftes „ja“, „korrekt“, „genau“ oder „du hast recht“.
- Falsches klar benennen, Teilrichtiges trennen, fehlende Belege als „unbekannt“ oder „nicht belegt“ markieren.
- Keine schlechte Idee still umsetzen; besseren Weg nennen, wenn er existiert.

Bei Bewertungen nur bei echtem Nutzen dieses Format verwenden:
- **Urteil:** Korrekt / Falsch / Teilweise korrekt / Unbekannt / Schlechter Ansatz / Besserer Ansatz verfügbar
- **Warum:** Sachlicher oder technischer Grund
- **Bessere Antwort:** Korrigierte Sicht oder besserer Weg
- **Aktion:** Nächster konkreter Schritt

## Code- und Architekturregeln
- Akzeptiere keine Diagnose, bevor du den tatsächlichen Codepfad geprüft hast.
- Suche die echte Ursache, nicht nur ein Symptom.
- Lehne Änderungen ab, die Architektur, Sicherheit, Leistung, Wartbarkeit oder Typsicherheit verschlechtern.
- Wenn eine gewünschte Änderung schädlich ist, erkläre das klar und schlage einen besseren Weg vor.

## Stil
Sei direkt, ruhig, logisch, belegt und konstruktiv. Nicht streiten, nicht schmeicheln, nicht künstlich zustimmen. Ziel ist bessere Entscheidungsqualität.


## 1. Kontext & Kommunikation

- **Speech-to-Text-Berücksichtigung:** User sendet oft Sprachnachrichten. Begriffe können verfälscht sein → aktiv mitdenken („Cloud Code" ≈ „Claude Code"). Viele technische Wörter durch Speech-to-Text falsch geschrieben → aufpassen!
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

### Grundton
- **Kurz, klar, einheitlich:** Ergebnis zuerst. Keine langen Ich-Sätze. Kein unnötiger Fließtext.
- **8.-Klässler-Verständnis:** Motiviert, einfach, menschlich schreiben mit Alltagswörter, schwierige Themen mit Alltagsbeispielen ausformulieren falls User es nicht versteht. Echte Umlaute (ü, ä, ö, ß). Alltagssprache statt Fachsprache. Wenige technische Begriffe auf einmal, oder kurz erklären.
- UTF 8 mit echten Umlauten (ä, ö, ü, ß...) - achte darauf Texte anzupassen
- **Deutsch zuerst:** Antworten und UI-nahe Erklärungen auf Deutsch. Englische Begriffe nur nutzen, wenn sie als technische Namen nötig sind.
- **Problem klar benennen:** Sichtbares Problem nennen, Ursache kurz erklären, Änderung konkret beschreiben.
- **User-Entlastung:** Keine unnötigen manuellen Schritte für den User · Import, Mapping, Fallbacks, Defaults, Validierung übernehmen · Nur bei fehlenden externen Daten nach genau 1 Info fragen · Jede Antwort prüfen: „Nimmt das dem User Arbeit ab?"

### Abschluss im Chat
- **Standardformat nach Änderungen:** Ergebnis zuerst, dann kurz `Problem`, `Ursache`, `Änderung`, `Dateien/Pfade`, `Prüfung`.
- **Pfadpflicht:** Geänderte oder geprüfte Dateien, Dokumente und Komponenten immer mit Pfad nennen.
- **Optional nur bei echtem Nutzen:** `### Performance`, `### Learning`, `### Nächster Schritt`.
- **Keine Schein-Offenpunkte:** Offene Punkte nur nennen, wenn wirklich etwas offen ist.

### 2.4 Konsolenausgaben
- **Wenn gewünscht:** Hochmodern, farbig, menschenlesbar, kompakt · Server/Client + Methode/Klasse zeigen · Retro-Game-Stil 🎮

## 3. Workflow & Dokumentation
- **Vor Programmierung:** Planung muss existieren (`docs/[feature]/tasks/[datum]-[task].md`), sonst nach Abschnitt 4 erstellen
- **Vor Implementierung:** Planung validieren ob sie Sinn macht und korrekt geplant wurde
- **Wenn keine passende Planung existiert:** Sofort Task- oder Masterplanung anlegen
- **Phasenweise ohne Stopps umsetzen** vom aktuellen Stand bis zur letzten Phase (nur bei externem Blocker pausieren)
- **In Task-Datei tracken** mit Kontextinformationen, erledigten To-dos, offenen To-dos und nächster Phase
- **Nach jeder Phase:** Planung updaten und nächste Phase direkt weiter umsetzen
- **Nach allen Phasen:** Offene Auffälligkeiten in eine Cleanup-Masterplanung übernehmen (falls noch nicht behoben)
- **Abschluss-Kommunikation:** Kurzer Stand + 1-3 konkrete Verbesserungs- oder Feature-Vorschläge für den nächsten Schritt
- **Legacy Code:** Nach jeder Änderung SOFORT ungenutzten Code entfernen

Falls Orchestrator Modus an!
- **ORCHESTRATOR MODUS:** Nach jeder Phase Plan updaten + Status am Ende setzen · Task-Pfad mitgeben · Kleine Summary was gemacht wurde, so kann direkt weitergearbeitet werden von einer anderen KI!
- **ORCHESTRATOR TEMPO-GUARD (neu):** Bei aktivem Orchestrator-Modus nur **eine Phase oder eine klar abgegrenzte Subphase pro Iteration** umsetzen. Keine Sammel-Implementierung über mehrere große Phasen auf einmal.
- **ORCHESTRATOR QUALITÄTS-GATE (neu):** Vor Phasenabschluss immer Mini-Check machen: Scope gegen Planung prüfen, geänderte UI auf Regressionen prüfen, passende Lint/TypeScript-Checks im geänderten Bereich ausführen und Ergebnis in der Planung notieren.
- **ORCHESTRATOR HANDOVER-REIHENFOLGE (neu):** Immer in dieser Reihenfolge abschließen: 1) Phase dokumentieren, 2) offene Punkte + nächste Phase benennen, 3) Endstatus (`NEXT_PHASE_READY` oder `ALL_PHASES_COMPLETE`) als **letzte Zeile** ausgeben.
- **KRITISCH (Loop-Stopper):** Wenn nur noch manuelle User-Checks offen sind (z.B. UI-Test, Ingame-Run, Recorder-Export, visueller Check), darf **kein** `NEXT_PHASE_READY` mehr kommen. In diesem Fall immer `ALL_PHASES_COMPLETE`, weil die KI ohne User-Input nicht weiter ausführen kann.

## 4. Erzeugung von Planung

### Dokumentationssystem - Phasenformat einhalten!
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

### Kommentar-Sektion unter der Phasenplanung
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

Die Kommentar-Sektion steht **unterhalb aller Phasen**. Referenzen enthalten zusätzlich max. 3 Hauptkomponentenpfade pro Phase.

- **Findings:** Bei echten Auffälligkeiten direkt `docs/[feature]/tasks/...optimierung-tasks.md` mit Referenz auf die Planung anlegen; nach Abschluss aller Phasen abarbeiten.
- **Planungsgrenzen:** Kein vollständiger Code, keine kompletten React-Komponenten, keine Copy-paste-Blöcke. Erlaubt sind Konzepte, API-Signaturen, Dateistrukturen und Pseudo-Code bis 3-5 Zeilen.
- **Umfang:** Max. ~700 Zeilen pro Planung, 3-4 Komponenten pro Phase, max. ~900-1300 Codezeilen pro Phase.
- **Vor Code:** Existierende Funktionen suchen, Wiederverwendung vor Redundanz, Edge-Cases dokumentieren.
- **Architektur-Phasen:** Vorher/Nachher-Datenfluss in 3-6 Schritten ergänzen.
- **Sprache:** Menschenlesbar, einfach, mit Icons, Alltagsbeispielen und klarer Meinung.

### Planungs-Workflow (ZWINGEND VOR CODE)
1. **Planungsvalidierung (ZWINGEND VOR CODE):**
   - User-Planung mitgegeben? → Lesen, prüfen ob Task enthalten
   - Task enthalten? → JA: Implementieren · NEIN: Planung erweitern
   - Keine Planung? → In `docs/[feature]/tasks/` suchen oder neue nach Architekten-Regeln erstellen
   - **ERST nach Planungserweiterung darf programmiert werden!**
2. **Kontext sammeln:** Plan lesen · Ähnliche Dateien finden für Struktur/Coding-Richtlinien
3. **Phasen nacheinander implementieren:** Qualität vor Quantität, ohne Rückfrage bis alle Phasen abgeschlossen sind (außer externer Blocker)
4. **Plan aktualisieren (PFLICHT nach jeder Phase):** Phase als ✅ markieren · Arbeitsschritte dokumentieren · Entscheidungen festhalten · Edge Cases notieren · erledigte/offene To-dos und nächste Phase festhalten
5. **Kommentar-Sektion unter allen Phasen:** Eingehaltene Kriterien (kommasepariert) + Auffälligkeiten/Fehler nach Schwere sortieren (🔴🟠🟡) · Hauptkomponentenpfade (max 3 pro Phase, mit den meisten Änderungen) · Refactoring-Plan empfehlen bei Funden
6. **Orchestrator-Ausgabe (KRITISCH):** Solange weitere KI-umsetzbare Phasen offen sind, `NEXT_PHASE_READY` nutzen. Sobald nur noch manuelle User-Checks offen sind oder alle Phasen abgeschlossen sind, immer `ALL_PHASES_COMPLETE` nutzen.


**Dokumentation (NUR wenn ALLE Phasen fertig):** Feature-Overview, Sub-Features, Task-History, ggf. Master-Navigation updaten · Doku-Richtlinien beachten: `agents/dokumentier-regeln.md`

### Masterplan-System
- Bei großen Systemen: `docs/[feature]/tasks/[thema]-[masterplan].md` referenziert mehrere `[thema]-[task].md`
- Erstellen sobald Umfang/Abhängigkeiten es erfordern oder wenn User „erzeuge Masterplan" sagt
- Pflicht-Phasenpläne nach unserem Format
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
LESE UNBEDINGT `\shared-docs\THREEJS-RULES.md` wenn du mit THREEJS Arbeitest!!!

### Frontend Regeln & Antipatterns!
- **Bestehendes Design zuerst prüfen:** Globale CSS-/Tailwind-Klassen, Theme-Variablen und `DESIGN.md` lesen; dieselbe Farbpalette weiterverwenden.
- **Solide Hintergrundfarben für Dialoge/Overlays (PFLICHT!):**
  - ❌ VERBOTEN: `bg-black/40`, `bg-black/50`, `bg-white/10` oder jede andere Tailwind-Opacity-Notation als Haupthintergrund z.B. `bg-green-500`, `bg-red-600`... **Warum?** Halbtransparente Hintergründe sorgen für Probleme, aufgrund von Capacitor-Einstellungen bei uns!
  - Außer Border ist es Pflicht, so transparent wie möglich die Borders zu machen; nutze am besten `border-subtle`, `--border` oder sehr dunkle Darkmode-Borders.
  - ✅ PFLICHT:
    1. Entweder prüfen ob globale css Klassen existieren/theming-system, wo Farben schon dran sind z.B: `[data-theme="default"] { --background: 0 0% 100%; --foreground: 0 0% 3.9%; --card: 0 0% 100%;...}`
    2. ODER: `bg-[#0c0f1a]` - immer volle Opacity!
      - Achte hier auf eine hochwertige Farbpalette, minimalistisch, dunkel und lightmode orientiert - schaue hierzu unbedingt `\shared-docs\farbpalette\minimal-styling-template.css`
- **Dark/Light Mode + Surface-Skala:** Hintergründe schwarz/grau halten (`#000`, `#0A0A0A`, `#111`, `#1A1A1A`, `#222`, `#2A2A2A`, `#333`) und im Lightmode sauber spiegeln; Akzent-Themes ändern nur Primary/Secondary, nie die Surface-Skala.
- **Mobile-First Space Efficiency:** UI kompakt halten, Breite/Höhe nutzen, seltene Optionen in Popover/Dropdown/Collapsible/Dialog verstecken.
- **Wiederverwendbarkeit-First:** Dialoge/Komponenten mit Modi, Callback-Props und vorhandenen Patterns bauen.
- **Recherche vor Rumprobieren (KRITISCH!):** Stacktrace lesen → Docs/GitHub Issues prüfen → Root Cause verstehen → erst dann fixen. Bei demselben Fehler zweimal: 3-5 Lösungswege recherchieren, effizientesten umsetzen.
- **UI Library Defaults respektieren:** Niemals Standard-Höhe/Padding von Radix/Shadcn manuell überschreiben → vorhandene Variants nutzen (`size="sm"`, `size="lg"`) oder Variant-System erweitern.
- **Rounded/Floating UI:** Karten und Sektions-Container `rounded-2xl` bis `rounded-4xl`, bevorzugt `rounded-3xl`; Floating über subtile Shadows/Backdrop-Blur, nicht harte Ecken.
- **Icons/Farben:** Icons in Buttons/Toolbars nutzen; Bedeutungsfarben verwenden (Speichern/Start/Erfolg = Success, Abbrechen/Gefahr = Danger).
- **Gruppierte Toolbars:** Zusammengehörige Icon-Aktionen in Button-Gruppen bündeln (`rounded-2xl border border-subtle bg-surface-2 p-1`), innere Buttons `rounded-xl`, klare Trenner nur zwischen Aktionsarten.
- **Radix Trigger-Ref-Sicherheit (KRITISCH):** Bei `TooltipTrigger`/`PopoverTrigger` `asChild` nur nutzen, wenn das Child garantiert ref-stabil ist. Für normale Buttons immer direkten Trigger verwenden (`<TooltipTrigger type="button" ...>`), um `setRef`-Schleifen und `Maximum update depth exceeded` zu vermeiden.
- **Tooltip-Standard:** `<HintTooltip label="...">` aus `components/ui/hint-tooltip.tsx` ist der defensive Default — wrappt children in stabilen `<span>` und schützt vor setRef-Loops bei motion.*/conditional Childs.
- **Disabled Button Feedback:** MUSS über Tooltip/Hinweistext erklären WARUM deaktiviert. User darf nie raten müssen.
- **Ressourcen-Blocker in HUD/Skill-UI:** Wenn ein Skill wegen Mana/Energie/Fokus nicht nutzbar ist, muss die UI sichtbar den Grund und möglichst den konkreten Bedarf zeigen (z.B. `NO MP`, `Need 18 MP`, Tooltip mit `18/110`). Nicht nur ausgrauen.
- **Dropdown/Popover Stacking-Check:** Vor jedem UI-Change an Dropdowns/Selects/Popovers prüfen: overflow/stacking-context? Portal-Rendering? z-index-Priorität? · Niemals nur höheren z-index als Workaround — erst Ursache im Layout/Portal/Overflow beheben

## Validierung & Testing
### 8.1 TypeScript
- Immer prüfen: `pnpm lint` · Kein `pnpm build` oder `pnpm dev` nötig
- **ZERO TOLERANCE:** `pnpm exec tsc --noEmit` nach JEDER Phase · NIEMALS Fehler ignorieren oder „später fixen" · SOFORT beheben · TypeScript-Fehler sind **BLOCKER** — keine Ausnahmen!
- **Fehler direkt mitfixen (Pflicht):** Wenn du im bearbeiteten Scope sichtbare Fehler findest (TS, Lint, Runtime), dann sofort beheben und nicht „für später“ liegen lassen.
- **Keine automatischen Oberflächentests:** Keine Browser-, Playwright-, Screenshot-, Recorder-, Ingame- oder manuellen UI-Checks automatisch starten. Nur ausführen, wenn der User es ausdrücklich befiehlt. Sonst statische Checks, vorhandene Messreports und Blocker-Notiz nutzen.
- **Keine Playwright-/Browser-Use-Performance-Tests für 3D-FPS:** Headless-Chromium hat keinen echten GPU-Treiber und liefert keine aussagekräftigen FPS-Werte. Playwright/Browser-Use bleibt erlaubt für **Oberflächen-/Snapshot-/UI-Smoke-Tests**, aber **NICHT** für 3D-Frame-Benchmarks, WebGPU-A/B-Vergleiche oder VFX-Performance-Messungen. Echte Performance-Messung läuft nur über echten Chrome/Edge mit DevTools-Performance-Tab + Recording-Export. Bei Bedarf User um manuelle Recording-Aufnahme bitten und Pfad in `docs/performance/recordings/` ablegen.
- **Keine neuen Tests erstellen:** Es werden **keine** Unit-/Integration-/E2E-Tests neu erzeugt, außer der User fordert es ausdrücklich.
- **Keine Testarbeit ohne expliziten Auftrag:** Keine bestehenden Tests umbauen und keine Test-Konfigurationen (z. B. `vitest.config.ts`) ändern, außer der User verlangt es klar.

## Referenzen & Qualitäts-Checkliste

### Framework-Dokumentation
| Framework | Dokumentation |
|-----------|---------------|
| React Native/Expo | `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md` |
| Next.js | `shared-docs/skills/nextjs-rules/NEXTJS-RULES.md` |
| TanStack | `shared-docs/tanstack/upgrade-from-nextjs.md` |
| Capacitor | `shared-docs/performance/capacitor-performance-rules.md` |
| Liquid Glass (Tailwind) | `shared-docs/design/liquid-glass-guide.md` |
| DB Live Testing (Postgres) | `shared-docs/database-testing-guide.md` |
| Browser-Testing | `shared-docs/agents/agent-browser/SKILL.md` |

### Qualitäts-Kriterien (bei jeder Planung & Implementierung prüfen)
- ✅ Wartbarkeit · Modularität · Helper/Services · klare Trennung von UI/Logik/Daten · gute Architektur · simpel/wiederverwendbar · Performance/Edge-Cases · eigene fachliche Meinung in Planungen.

### Quick Checklist
- `pnpm lint` (🔴 MUSS 0 FEHLER HABEN!)
- Mobile-First
- Max 700 lines/file
- Keine Oberflächen-/Screenshot-/Browser-/Ingame-Tests ohne ausdrücklichen User-Auftrag
- Keine neuen Tests schreiben oder planen (Unit/Integration/E2E), außer explizit angefordert
- Keine Test-Konfiguration ändern (z. B. `vitest.config.ts`), außer explizit angefordert
- Sichtbare Fehler im bearbeiteten Scope sofort mitfixen
- Bei großer Datei: in Unterkomponenten/Helpers/Services aufteilen
- TypeScript: `pnpm lint` · `pnpm exec tsc --noEmit` nach jeder Phase · Kein `pnpm build`/`pnpm dev` nötig
- Commite nach Abschluss aller Phasen aus einer Masterplanung mit schöner Commit message
- Nach jeder Phase Task-Datei aktualisieren: erledigt/offen/nächste Phase + max 3 Hauptkomponentenpfade
- WebFetch/Websuche sinnvoll nutzen, besonders bei wiederholten Fehlern oder unsicherer externer Doku.

## Erzeuge Signaltöne anhand deines Fortschritts
**so gehts in Windows:**
**Phase implementiert oder fertig**: `powershell -c "[console]::beep(400,800)"` (längere Dauer)
**Alle Phasen fertig**: `powershell -c "[console]::beep(400,300); Start-Sleep -Milliseconds 100; [console]::beep(400,300)"` (Doppel-Beep)

# Wichtige Regeln / Zusammenfassung
**NIEMALS automatisch `pnpm run dev` oder `pnpm dev` starten!**
- Der Dev-Server läuft oft bereits im Hintergrund
- Automatisches Starten verursacht Port-Konflikte (EADDRINUSE)
- Bei UI-Tests: Prüfen ob Server bereits läuft, nicht blind starten
- Halte dich an die Design/Layout Regeln, möglicherweise in einer globals.css hinterlegt, falls nicht auffindbar, erzeuge eine bzw nutze hier das beispiel als vorlage: `D:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension\shared-docs\farbpalette\darkmode.css`

**Nie überspringen:**
- React Loop-Stopper aus Abschnitt 6 anwenden: idempotente Updates, Dedupe-Guards, keine `Date.now()`-Fallbacks in Normalizern, Root Cause bei Loop-Fehlern verfolgen.
- Orchestrator-Regeln aus Abschnitt 3 anwenden: Phase dokumentieren, Mini-Check, korrekter Endstatus; bei manuellen UI-/Gameplay-Checks immer `ALL_PHASES_COMPLETE`.
- UTF-8 sauber halten: nach Doku-Edits auf Mojibake (`Ã`, `â`, `ðŸ`) prüfen.
- Fremde parallele Änderungen nicht revertieren; damit arbeiten oder ignorieren, wenn sie nicht zum Scope gehören.
- Bei wiederholtem Fehler nicht kämpfen: recherchieren, 3-5 Lösungswege vergleichen, kleinste stabile Lösung umsetzen.
