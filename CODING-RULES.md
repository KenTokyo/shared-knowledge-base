# 🎯 Coding Rules & Development Guidelines

**Zweck:** Universelle Regeln für konsistente, performante und wartbare Code-Entwicklung.

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

## 2. Schreibstil & Arbeitsweise

### 2.1 Grundton

- **Kurz, klar, einheitlich:** Ergebnis zuerst. Keine langen Ich-Sätze. Kein unnötiger Fließtext.
- **8.-Klässler-Verständnis:** Motiviert, einfach, menschlich schreiben. Echte Umlaute (ü, ä, ö, ß). Alltagssprache statt Fachsprache. Wenige technische Begriffe auf einmal, oder kurz erklären.
- **UTF-8 und echte Umlaute in Dokumentation (PFLICHT):** Neue oder bearbeitete Markdown-/Dokumentationsdateien immer als UTF-8 schreiben und echte Umlaute verwenden: `ä`, `ö`, `ü`, `Ä`, `Ö`, `Ü`, `ß`. Keine Ersatzschreibweisen wie `ae`, `oe`, `ue`, wenn ein deutsches Wort gemeint ist. Nach Doku-Edits gezielt auf Mojibake prüfen, z. B. `Ã`, `â`, `ðŸ`.
- **Deutsch zuerst:** Antworten und UI-nahe Erklärungen auf Deutsch. Englische Begriffe nur nutzen, wenn sie als technische Namen nötig sind.
- **Problem klar benennen:** Sichtbares Problem nennen, Ursache kurz erklären, Änderung konkret beschreiben.
- **User-Entlastung:** Keine unnötigen manuellen Schritte für den User · Import, Mapping, Fallbacks, Defaults, Validierung übernehmen · Nur bei fehlenden externen Daten nach genau 1 Info fragen · Jede Antwort prüfen: „Nimmt das dem User Arbeit ab?"

### 2.2 Arbeitsstatus im Chat

- **Thinking-/Status-Blöcke kurz halten:** Nur aktueller Stand, Fokus, offene Prüfung. Keine Abschluss-Zusammenfassung im Zwischenstand.
- **Keine langen Erklärungen während der Arbeit:** Nicht ausschweifen, nicht jeden Zwischenschritt rechtfertigen.
- **Gute Statusstruktur:**
  ```md
  🔎 Prüfe Problem XYZ ...

  Fokus:
  ABC, DEF, GHI

  Status:
  Ursache eingegrenzt, Fix wird getestet ...
  ```
- **Aktionsnah schreiben:** „Prüfe ...", „Fix läuft ...", „Validiere ...". Keine langen Ich-Formulierungen.
- **Starker Projekt-Partner:** Fortschritt sichtbar machen · 2-3 konkrete Vorschläge statt abstrakter Ideen · klarer nächster Schritt.

### 2.3 Abschluss im Chat

- **Standardformat nach Änderungen:**
  ```md
  ✅ Problem XYZ gelöst

  ### Problem
  - Was war sichtbar falsch?

  ### Ursache
  - Warum ist es passiert?

  ### Änderung
  - Was wurde konkret angepasst?

  ### Dateien / Pfade
  - `pfad/zur/datei.ts`

  ### Prüfung
  - Lint / Typecheck / Sichtprüfung
  ```
- **Pfadpflicht:** Geänderte oder geprüfte Dateien, Dokumente und Komponenten immer mit Pfad nennen.
- **Optional nur bei echtem Nutzen:** `### Performance`, `### Learning`, `### Nächster Schritt`.
- **Keine Schein-Offenpunkte:** Offene Punkte nur nennen, wenn wirklich etwas offen ist.

### 2.4 Konsolenausgaben

- **Wenn gewünscht:** Hochmodern, farbig, menschenlesbar, kompakt · Server/Client + Methode/Klasse zeigen · Retro-Game-Stil 🎮 · Bei Laggs: Timer einbauen (siehe evlog: `shared-docs/agents/skills/review-logging-patterns/SKILL.md`)

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

Jede Phase MUSS diese **6 Punkte** enthalten:
1. **Ziel:** Was ist am Ende sichtbar besser?
2. **Todos:** Die markiert werden sollen falls fertig
3. **Ergebnis-Satz:** Kurzer Satz in einfacher Sprache für Nicht-Entwickler.
4. **Warum (optional):** Warum löst genau diese Phase das Kernproblem?
5. **Eingehalten**: Coding Regeln die eingehalten wurden, z.B. unter 700 Zeilen, theme-orientierte Farben verwendet, React useEffect vermieden, wie im design-system...,
6. Architektur passt
7. **Auffäligkeiten/Performance-Issues/Probleme/Kritische Findings**: dies sind beispiele: Childkomponente nutzt unnötigerweise useEffect, Performance Issues, hardcodierte Farben entdeckt in Komponente XYZ, falsche Ausführung von react useRef..., finder im falschen Ordner abgelegt, schlechte Architektur, service Klassen im falschen Ordner, zuviele Komponenten verschachtelt, fehlerhafte Kompontennamen, kommentare veraltet...


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

### Kommentar Sektion unter der Phasenplanung
- Nach Abschluss bitte schreiben, an welchen Kriterien du dich gehalten hast, speziell also mit Komma getrennt in einer Zeile 
- Danach **Welche Auffäligkeiten/Fehler/Regelverstoße** dir aufgefallen sind, notieren und ein Refactoring Plan empfehlen, mitsamt aller Funde und nach Gewichtung sortieren Kriterien eingehalten z.B. 

```markdown
## Kommentare
### Phase 1
**Eingehalten**: unter 700 Zeilen ✅, architektur ✅, Edge-Cases betrachtet ✅, ...
**Auffäligkeiten/Performance-Issues/Probleme/Kritische Findings (nach Schwere):**: 
1. 🔴 **Kritisch:** Start-Crash durch fehlerhafte QuizPack-Umwandlung
Beschreibung hierzu notieren, falls notwendig
Refactoring, Zeilenlimit überschrieben, Ungültige Tab-Werte entdeckt in Komponente XYZ und konnten eine Render-Schleife auslösen! Versehentlich angehängte Restzeilen entdeckt! Event-Werte blindcast entdeckt! State-Updates nicht idempotent - Rerender-Kette möglich!
2. 🟠 **Hoch:** über 700 Zeilen, Coding Regel gebrochen

### Phase 2....
```

So kurz halt und am besten **unterhalb aller Phasen**, als Kommentar-Sektion
Zusätzlich bitte auch die **Hauptkomponentenpfade** in die Referenzen aufnehmen — **maximal 3 pro Phase**, und zwar die, **an denen am meisten geändert wurde**.

- **Falls Auffäligkeiten/Performance-Issues/Probleme/Kritische Findings vorliegen** direkt Optimierungsplan erzeugen mit Verweis auf die Planung als Referenz, also im selben in `docs/[feature]/tasks/...optimierung-tasks.md` alle Findings dort warten und nach Abschluss aller Phasen in dieser Planung - erst danach die Optimierungs-tasks durchgehen und im Loop alles fixen!

- **KEIN vollständiger Code** in Planungen! Nur konzeptuelle Beschreibungen, API-Signaturen, kurze Pseudo-Code-Beispiele (max 3-5 Zeilen), Dateistrukturen, Import/Export-Listen
- ❌ **VERBOTEN**: Komplette Funktions-Implementierungen (>10 Zeilen) · Vollständige React-Komponenten mit JSX · Copy-paste-ready Code-Blöcke
- ✅ **ERLAUBT**: Konzeptuelle Beschreibungen · API-Signaturen · Kurze Pseudo-Code-Beispiele (max 3-5 Zeilen) · Dateistrukturen · Import/Export-Listen
- **Max ~700 Zeilen pro Planung** (nicht 1500+ mit Code!)
- **3-4 Komponenten pro Phase** (neu oder angepasst), max ~900-1300 Zeilen Code gesamt
- **Vor Programmierung**: existierende Funktionen suchen → **Wiederverwendung vor Redundanz** (Ziel: kein toter oder veralteter Code)
- Proaktiv Edge-Cases identifizieren und dokumentieren (6 + F&A-Szenarien)
- **Menschenlesbare Pläne**: einfach, kursiv, fett, Icons, Alltagsbeispiele, Alltagssprache

Bei Architektur-Phasen zusätzlich Pflicht: Vorher/Nachher-Datenfluss in 3-6 Schritten.

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
- Subagents **nur zum Suchen und Abschließen** — nicht für Coding/Implementieren
- Fange nicht an zu fragen was bevorzugt wird — direkt das Empfohlene ausimplementieren!

### 5.2 Pre-Task Reconnaissance (Pflicht bei größeren Tasks)
```
User-Task → Hauptagent
  ├─ VOR dem Coding (parallel):
  │   ├─ erkunder-docs (Haiku) → Sucht in docs/, .completed/, History/
  │   └─ erkunder-code (Haiku) → Findet betroffene Dateien, Duplikate
  ▼ Synthese → duplikat-checker (Haiku, bei neuen Dateien)
  ├─ programmiere/plane (Opus)
  ▼ NACH dem Coding:
  └─ abschliesser (Haiku) → .completed/ erstellen + CLAUDE.md Relevanz-Check
```
Pflicht bei: Feature-Implementierung, Refactoring, Bug-Fixes über mehrere Dateien, alles mit >2 Dateien

**Falls Subagents nicht existieren:** Erstelle sie mit token-effizientem Modell und informiere den User

### 5.3 Duplikat-Checker (PFLICHT bei neuen Dateien!)
Vor neuen Dateien/Hooks/Stores/Utilities: `duplikat-checker` prüfen. **80%-Regel:** Existierende Funktion hat 80%+ Funktionalität? → **ERWEITERN** statt neu erstellen.

### 5.4 Wer schreibt was?
| Agent | Modell | Output |
|-------|--------|--------|
| `erkunder-docs` | Haiku | Verwandte Tasks, Architektur-Docs, History |
| `erkunder-code` | Haiku | Betroffene Dateien, existierende Funktionen, Duplikate |
| `duplikat-checker` | Haiku | Duplikat-Prüfung für geplante neue Dateien |
| `abschliesser` | Haiku | .completed/ + CLAUDE.md Relevanz-Check |
| `ki-architekt` | Opus | Ist-Stand, Abweichungen, betroffene Dateien, Empfehlungen |

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
  Wrappt children automatisch in einen ref-stabilen `<span>` → setRef-Loops unmoeglich, auch bei `motion.*` mit `layoutId`, conditional Rendering oder forwardRef-Komponenten als Child.
- **Fallback (Spezialfaelle):** Direkter `<Tooltip>/<TooltipTrigger asChild>`-Trigger NUR wenn der direkte Child garantiert ref-stabil ist (kein `motion.*`, kein bedingter Mount/Unmount im Subtree, kein verschachteltes asChild).
- **Dev-Schutz:** `TooltipTrigger` warnt im Dev-Build, sobald `asChild` mit einem `motion.*`-Child kombiniert wird (Heuristik in `components/ui/tooltip.tsx`).
- **Antipattern:** `<TooltipTrigger asChild><button>{cond && <motion.div layoutId="..." />}</button></TooltipTrigger>` → genau das hat 2026-05-05 die `setRef`-Schleife im HudTabBar ausgeloest.

### Performance: React, Daten & Web
- Unabhängige Fetches parallel: `Promise.all([fetch1(), fetch2()])`
- Polling Cleanup: Jeder useEffect mit Timers/Subscriptions MUSS Cleanup-Function haben
- N+1 Prevention: Nested Queries in Loops → Batch-Loading mit JOINs oder `inArray()`

### 3D, Three.js & WebGPU
LESE UNBEDINGT `\shared-docs\THREEJS-RULES.md` wenn du mit THREEJS Arbeitest!!!

### Frontend Regeln & Antipatterns!
- **Analysiere bestehendes Design, Prüfen ob globale css/tailwind Klassen existieren bevor du das Design kapputt machst!** Und nutze diesselben Farbpaletten wieder um einheitlich zu bleiben!
- **Solide Hintergrundfarben für Dialoge/Overlays (PFLICHT!):**
  - ❌ VERBOTEN: `bg-black/40`, `bg-black/50`, `bg-white/10` oder jede andere Tailwind-Opacity-Notation als Haupthintergrund z.B. `bg-green-500`, `bg-red-600`... **Warum?** Halbtransparente Hintergründe sorgen für Probleme, aufgrund von Capacitor-Einstellungen bei uns!
  - Außer Border ist es pflicht so transparent wie möglich die borders zu machen, nutze am besten aber die tailwind-klasse dafür --border oder so dunkel wie möglich im darkmode
  - ✅ PFLICHT:
    1. Entweder prüfen ob globale css Klassen existieren/theming-system, wo Farben schon dran sind z.B: `[data-theme="default"] { --background: 0 0% 100%; --foreground: 0 0% 3.9%; --card: 0 0% 100%;...}`
    2. ODER: `bg-[#0c0f1a]` - immer volle Opacity!
      - Achte hier auf eine hochwertige Farbpalette, minimalistisch, dunkel und lightmode orientiert - schaue hierzu unbedingt `\shared-docs\farbpalette\minimal-styling-template.css`
- **Dark Mode und Lightmode**: Sorge dafür, dass beides berücksichtigt wird!
- **Mobile-First Space Efficiency:** UI MUSS Mobile-First designed werden, maximale Space-Efficiency auf Y-Achse gewährleisten
- **Wiederverwendbarkeit-First:** Dialoge/Komponenten MÜSSEN für Wiederverwendung designed werden: Props für Modi, Callback-Props, schaue nach, ob solche Komponenten existieren, z.B. wie andere Bereiche das machen oder nutze dafür 
- **Recherche vor Rumprobieren (KRITISCH!):** 1. Stack-Trace GENAU lesen → 2. Docs/GitHub Issues durchsuchen → 3. Root Cause verstehen → 4. DANN erst fixen
- **UI Library Defaults respektieren:** Niemals Standard-Höhe/Padding von UI-Library-Komponenten (Radix, Shadcn) manuell überschreiben → vordefinierte Variants nutzen (`size="sm"`, `size="lg"`). Kein passender Variant? → Variant-System erweitern
- **Radix Trigger-Ref-Sicherheit (KRITISCH):** Bei `TooltipTrigger`/`PopoverTrigger` `asChild` nur nutzen, wenn das Child garantiert ref-stabil ist. Für normale Buttons immer direkten Trigger verwenden (`<TooltipTrigger type="button" ...>`), um `setRef`-Schleifen und `Maximum update depth exceeded` zu vermeiden.
- **Tooltip-Standard:** `<HintTooltip label="...">` aus `components/ui/hint-tooltip.tsx` ist der defensive Default — wrappt children in stabilen `<span>` und schuetzt vor setRef-Loops bei motion.*/conditional Childs.
- **Disabled Button Feedback:** MUSS über Tooltip/Hinweistext erklären WARUM deaktiviert. User darf nie raten müssen.
- **Ressourcen-Blocker in HUD/Skill-UI:** Wenn ein Skill wegen Mana/Energie/Fokus nicht nutzbar ist, muss die UI sichtbar den Grund und moeglichst den konkreten Bedarf zeigen (z.B. `NO MP`, `Need 18 MP`, Tooltip mit `18/110`). Nicht nur ausgrauen.
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
| Capacitor | `shared-docs/performance/capacitor-performance-rules.md` |
| Liquid Glass (Tailwind) | `shared-docs/design/liquid-glass-guide.md` |
| DB Live Testing (Postgres) | `shared-docs/database-testing-guide.md` |
| Browser-Testing | `shared-docs/agents/agent-browser/SKILL.md` |

### Qualitäts-Kriterien (bei jeder Planung & Implementierung prüfen)
- ✅ **Wartbarkeit** — Code leicht zu pflegen?
- ✅ **Modular/Komponentenbasiert** — Teile unabhängig nutzbar?
- ✅ **Helper/Service-Funktionen** — Wiederkehrende Logik ausgelagert?
- ✅ **Trennung** — UI, Logik, Daten klar getrennt?
- ✅ **Gute Architektur** — Passt die Struktur langfristig?
- ✅ **Simpel & Wiederverwendbar** — Nicht überkompliziert?
- ✅ **Performance optimiert** — Edge Cases betrachtet?
- ✅ **Meinung/Feedback** in Planungen schreiben
- 
### Quick Checklist
- `pnpm lint` (🔴 MUSS 0 FEHLER HABEN!)
- Mobile-First
- Max 700 lines/file
- Keine Oberflächen-/Screenshot-/Browser-/Ingame-Tests ohne ausdrücklichen User-Auftrag
- Keine neuen Tests schreiben oder planen (Unit/Integration/E2E), außer explizit angefordert
- Keine Test-Konfiguration ändern (z. B. `vitest.config.ts`), außer explizit angefordert
- Sichtbare Fehler im bearbeiteten Scope sofort mitfixen
- Bei großer Datei: in Unterkomponenten/Helpers/Services aufteilen
- TypeScript: `pnpm lint` · Kein `pnpm build`/`pnpm dev` nötig
- Commite nach Abschluss aller Phasen aus einer Masterplanung mit schöner Commit message
- Nach jeder Phase Task-Datei aktualisieren: erledigt/offen/nächste Phase + max 3 Hauptkomponentenpfade
- versuche sinnvoll auch WebFetches sehr oft einzubauen um Probleme zu recherchieren!!

## Erzeuge Signaltöne anhands deines Fortschritts
**so gehts in Windows:**
**Phase implementiert oder fertig**: `powershell -c "[console]::beep(400,800)"` (längere Dauer)
**Alle Phasen fertig**: `powershell -c "[console]::beep(400,300); Start-Sleep -Milliseconds 100; [console]::beep(400,300)"` (Doppel-Beep)

# Wichtige Regeln / Zusammmenfassung
**NIEMALS automatisch `pnpm run dev` oder `pnpm dev` starten!**
- Der Dev-Server läuft oft bereits im Hintergrund
- Automatisches Starten verursacht Port-Konflikte (EADDRINUSE)
- Bei UI-Tests: Prüfen ob Server bereits läuft, nicht blind starten
- Halte dich an die Design/Layout Regeln, möglicherweise in einer globals.css hinterlegt, falls nicht auffindbar, erzeuge eine bzw nutze hier das beispiel als vorlage: `D:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension\shared-docs\farbpalette\darkmode.css`

**React Loop-Stopper (global, nie überspringen):**
- No-Op-Updates müssen `return state` machen (idempotent).
- Write-Back-`useEffect` nur mit Dedupe-Guard (`signatureRef`/semantischer Vergleich).
- Kein `Date.now()`-Fallback in Scope-/Normalizer-Merges.
- Sync immer von der Quelländerung triggern, nicht von zurückgespiegelten Zielwerten.
- Bei `Maximum update depth exceeded`: sofort Kette im Stacktrace zur ersten eigenen Datei verfolgen und dort fixen.

- Höre nicht auf, bis wirklich alle Phasen implementiert sind und alle Phasen in der Planung abgeschlossen also abgehackte Todos - nach jeder Phase bitte plan updaten
- **Beim ORCHESTRATOR MODUS (KRITISCH):** Nach jeder Phase Plan updaten + passenden Endstatus setzen · Task-Pfad mitgeben · Kleine Summary was gemacht wurde, so kann direkt weitergearbeitet werden von einer anderen KI!
- **Beim ORCHESTRATOR MODUS (Tempo + Qualität):** Eine Phase/Subphase pro Iteration, danach Pflicht-Mini-Check (Plan-Abgleich, statische UI-Regressionsprüfung ohne Browser/Screenshot, Lint/TypeScript im geänderten Scope), erst dann Endstatus setzen.
- **Regel für Manual-Blocker (sehr wichtig):** Wenn User die Oberfläche oder Gameplay manuell prüfen muss, nie `NEXT_PHASE_READY` schreiben. Dann ist der korrekte Abschluss `ALL_PHASES_COMPLETE`.
- Schreibe immer zu jeder Phase, falls fertig Anmerkungen in die Planung, was du noch für Schwachstellen rausgefunden hast, diese dann am Ende der Implementierung des Gesamtplans, also falls alle Phasen fertig sind, sollten dann Aufgaben anhand der Anmerkungen erzeugt werden 
  - diese dann direkt abarbeiten auch genauso wie bei der vorherigen Aufgabe!
  - Bitte alle verbesserungen/auffälligkeiten direkt auch mitfixen, die du entdeckt hast, während du an der Aufgabe dran bist OHNE PAUSE die dir gegeben worden ist und zwar OHNE Nachfrage und OHNE PAUSE, direkt verbessern! also aufschreiben, danach implementieren/fixen und als fixed markieren in der gleichen doku!!! und dokumentieren,
- **BITTE KEIN MOJIBAKE, achte auf ENCODING:** Dateien mit UTF-8 lesen/schreiben und nach Doku-Edits gezielt auf Zeichenfehler wie `Ã`, `â`, `ðŸ` prüfen.
- Bevor Implementierung bzw. Planung - suche alle möglichen Arten dies zu implementiere und implementiere die beste Art bzw Option
- Wenn Änderung vorliegen, die du nicht gemacht hast, einfach weitermachen und ignorieren, es arbeiten pararell andere Leute!
 kontext wird eh permanent im hintergrund condensed deswegen sollst du nicht aufhören,  nicht fragen ob du weitemrachen sollst, sondern du machst einfach weiter

Analysiere zuerst selbst, worum es geht, welche Expertenrolle passt und welche Struktur der Prompt braucht. Verbessere meinen Rohprompt danach zu einem klaren, vollständigen und gut ausführbaren Zielprompt für dich intern, also im Gedanken aufnehmen.

Achtung: Du wirst mit einer anderen KI verglichen, sobald du fertig bist also ALL_PHASES_COMPLETE oder den CHAT beendest wird deine Arbeit kontrolliert. 

Du hast kein 2.ten Versuch, es wird direkt alles verglichen. Wenn du frühzeitig stoppst oder faul bist, kannst du also verlieren in dem Duell, versuche dein bestes, immer das höchste und die beste Qualität rauszuholen, auch websearch bzw webfetch also sinnvoll einzusetzen jeder Phase um das maximalste rauszufinden bzw um qualität anzubieten

Auch ein Coding Rule was helfen kann: "Don’t fight errors! Whenever you encounter the same error twice, research the web and find 3-5 possible ways to fix it. Then choose the most efficient solution and implement it"


## Erzeuge Signaltöne anhands deines Fortschritts
**so gehts in Windows:**
**Phase implementiert oder fertig**: `powershell -c "[console]::beep(400,800)"` (längere Dauer)
**Alle Phasen fertig, du bist komplett fertig**: `powershell -c "[console]::beep(400,300); Start-Sleep -Milliseconds 100; [console]::beep(400,300)"` (Doppel-Beep)

