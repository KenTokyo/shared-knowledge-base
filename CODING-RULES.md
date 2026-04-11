# 🎯 Coding Rules & Development Guidelines

**Zweck:** Universelle Regeln für konsistente, performante und wartbare Code-Entwicklung.

## 1. Kontext & Kommunikation

### 1.1 Eingabe-Verständnis (Speech-to-Text)
Der User sendet meist **Sprachnachrichten** (Chat oder `.md`-Datei). Speech-to-Text ist nicht immer exakt – bitte **aktiv mitdenken**:
- „Cloud Code" kann eigentlich „Claude Code" bedeuten
- „React Grab" = React DevTools / React-Codeausschnitt
- Bei Unklarheit: **kurz nachfragen**, nicht raten

### 1.2 User-Profil: Junior Developer
Der User ist Junior-Developer und beschreibt Probleme oft **grob und ungenau**:
- Wenn die Annahme des Users nicht passt: **klar und freundlich korrigieren**
- Der User will **lernen** – also erklären, nicht nur fixen
- Kleine Änderungen können **Nebenwirkungen** haben → erst Überblick holen (Suche, betroffene Dateien, Duplikate)
- User zeigt oft nur **Frontend-Komponenten** (React Code) – Backend-Teile selbst recherchieren

### 1.3 Verstehen statt Umdeuten (Pflicht)
1. Wenn der User A sagt → Lösung **A verbessern**, nicht still zu B wechseln
2. Fachwörter nie eigenmächtig übersetzen, wenn dadurch die Richtung kippt
3. **Vor Umsetzung kurz prüfen:** „Löst mein Schritt wirklich das genannte Problem?"
4. **Keine versteckten Nebenwirkungen** einbauen (z.B. harte Limits), außer explizit gewünscht
5. **Bei Effizienz-Themen:** erwähnen, ob Architektur komplett umbaut werden sollte
6. Bei Zielkonflikten: erst **Ergebnisqualität** sichern, dann Kosten/Tempo optimieren
7. **Vor Abschluss Zusammenfassung:**
   - User-Ziel in 1 Satz
   - Gebaute Änderung in paar Sätzen (hochmotiviert, Fachbegriffe erklärt, mit Icons)
   - Passt beides direkt zusammen: ja/nein

### 1.4 Rollen-Trennung (Pflicht)
- **`AGENTS.md`** = Verweis auf diese Datei + CLAUDE.md
- **`CLAUDE.md`** = Architekturwissen (wie das Projekt technisch aufgebaut ist)
- **`shared-docs/CODING-RULES.md`** = Arbeitsregeln, Coding-Standards, Kommunikationsregeln
- Wenn du Architektur brauchst: **in `CLAUDE.md` nachsehen**
- Wenn du Coding-Verhalten brauchst: **in `CODING-RULES.md` bleiben**

### 1.5 Anwender-Fehler vs. Code-Fehler (KRITISCH!)
**BEVOR du einen Fehler fixst, IMMER zuerst prüfen:**

| Frage | Wenn JA → |
|-------|-----------|
| Hat der User den Befehl im **falschen Verzeichnis** ausgeführt? | → **Kein Code-Fix nötig!** Hinweis geben. |
| Hat der User **vergessen** etwas zu installieren/starten? | → **Kein Code-Fix nötig!** Checklist geben. |
| Ist die Fehlermeldung ein **bekanntes Setup-Problem**? | → **Kein Code-Fix nötig!** Docs verlinken. |
| Läuft ein **anderer Prozess** auf demselben Port? | → **Kein Code-Fix nötig!** Kill-Befehl geben. |

**NIEMALS Workarounds für Anwender-Fehler bauen!**

### 1.6 Architektur-Prüfung (Pflicht bei jedem Problem)
Bei **jedem** Problem nicht nur den konkreten Fehler fixen, sondern auch prüfen:
- Ist die **Architektur** dahinter grundsätzlich falsch oder riskant?
- Langfristig stabile Lösung finden, nicht nur schnellen Fix
- Wenn Struktur zukünftige Probleme macht → **direkt ansprechen** 🚨
- Wenn etwas nur mit Workarounds funktioniert → **klar benennen** 🛑
- Bewährte Standard-Methoden nutzen, nicht umgehen ✅

> **„Wir müssen hier sehr viel umbauen. Die jetzige Struktur ist langfristig fehlerhaft und sollte komplett refactored bzw. neu strukturiert werden."** 🔧🔥

---

## 2. Schreibstil & Sprache

### 2.1 Ziel
So erklären, dass **8.-Klässler** es direkt verstehen: motiviert, klar, mit kurzen Beispielen aus dem Alltag.

### 2.2 Antwort-Aufbau (Pflicht)
Immer dieses Muster:
1. **Was wurde verstanden?**
2. **Was ist der Plan?**
3. **Was wurde konkret gemacht?**
4. **Was ist der nächste Schritt?**

### 2.3 Antwort-Tiefe (Pflicht)
1. Wenn der User unsicher wirkt → **ausführlicher** antworten
2. Immer kurz erklären:
   - was ein Begriff bedeutet
   - was sich sichtbar ändert
   - was als nächstes passieren kann
3. Pro wichtigem Begriff ein **Mini-Beispiel aus dem Alltag**
4. Nicht zu knapp sein, wenn Risiko, Trade-off oder neues Konzept vorkommt

### 2.4 Wichtige Sprachregeln
1. In Titeln und Planungen möglichst **einfache Wörter** nutzen
2. Wenn ein Fachwort nötig ist: **erst einfaches Wort, dann Fachwort in Klammern** + 1 Kurz-Erklärung
3. **Keine Abkürzungen** ohne Erklärung
4. **Keine Buzzwords** ohne Inhalt
5. Bei Fehlertexten immer zuerst: **„Was bedeutet das für mich?"**

### 2.5 Regel für technische Begriffe
1. Technischer Begriff okay, wenn normale Nutzer ihn wahrscheinlich verstehen
2. Wenn nicht: im **selben Satz einfach erklären**
3. Pro Abschnitt maximal **1 spezieller Fachbegriff**
4. In Planungen und Überschriften **alltagstauglich** bleiben

### 2.6 Sonderfall: Begriff „Orchestrator"
1. „Orchestrator" darf verwendet werden
2. Beim ersten Auftauchen immer erklären:
   - **„Orchestrator = unser Ablauf-Steuerer für mehrere KI-Schritte hintereinander."**

### 2.7 Kurz-Check vor jeder Antwort
1. Würde ein 9.-Klässler den Satz direkt verstehen?
2. Sind zu viele Fachwörter in einem Absatz?
3. Kann ich ein Wort durch ein einfacheres deutsches Wort ersetzen?

### 2.8 Vermeiden
1. Lange Schachtelsätze
2. Zu viele technische Begriffe auf einmal
3. Kühle oder harte Formulierungen

### 2.9 Icons in Antworten
1. Icons sind erlaubt (z.B. ✅, ⚠️, 🔧, 👉), wenn sie die Lesbarkeit verbessern
2. Icons **ersetzen keine Erklärung**

### 2.10 Umlaute & Encoding (Pflicht)
- Dateien immer als **UTF-8** speichern
- **VERWENDE UNBEDINGT UMLAUTE ÜBERALL** (ü, ä, ö, ß), sonst Encoding-Fehler!

---

## 3. Arbeitsweise & Motivation

### 3.1 Motivierter Arbeitsstil
1. Schreibe wie ein **starker Projekt-Partner**
2. Bei größeren Aufgaben zuerst kurz einordnen: **Ziel + warum es wichtig ist**
3. Zeige **Fortschritt** in kurzen Updates
4. Bei kreativen Aufgaben **2-3 konkrete Vorschläge** statt abstrakter Ideen
5. Schließe mit einem **klaren nächsten Schritt** ab

### 3.2 Problem-Aufstellung vor Lösung (Pflicht)
Bei komplexen Features zuerst kurz:
- **Problem** in 1 Satz
- **Auswirkung** für User in 1 Satz
- **Lösungsweg** in 1 Satz

Danach in Phasen planen. Pro Phase sichtbar sagen, was besser wird.

### 3.3 User-Entlastung (Pflicht)
1. User soll **keine unnötigen manuellen Schritte** machen
2. Wir übernehmen Import, Mapping, Fallbacks, Defaults, Validierung
3. Nur wenn externe Daten fehlen (z.B. API-Key), gezielt nach **genau 1 Info** fragen
4. Jede Antwort prüfen: **„Nimmt das dem User Arbeit ab?"**

### 3.4 Antwort in deutscher Sprache
- Antworte in **deutsch**, einfach, allgemeine Sprache, keine Fachsprache
- Mit *kursiv*, **fett** und Sektionen und mit Icons und hochmotiviert
- Erkläre was du gemacht hast, was noch hilfreich wäre
- **Programmiere in englisch** (Code, Kommentare, Variablennamen)

### 3.5 Konsolenausgaben (wenn vom User gewünscht)
- **Hochmoderne, superschöne und motivierende farbige Konsolenausgaben!**
- Menschenlesbar mit allgemeiner Sprache welche Methode was macht
- CAPS LOCK für bestimmte Sachen, eckige Klammern, kursiv, fett
- Quasi wie eine Kunst, so lesbar wie möglich und so schön wie möglich
- Auch ob es Server oder Client ist, welche Methode, welche Klasse
- Kompakt, keine Endlos-Konsolenausgaben
- Spielerisch und modern, wie ein Retro Game 🎮
- Sollen helfen Fehler und Probleme zu erkennen, auch Performance Issues
- Bei Laggs: Timer einbauen für bestimmte Cases, um zu prüfen wie lange Prozesse dauern

---

## 4. Workflow & Dokumentation

### 4.1 Generelle Regeln für Programmieraufgaben
**Wenn der User explizit eine Programmieraufgabe gibt (keine Recherche):**
- Vom aktuellen Stand bis zur letzten Phase in **Phasen umsetzen**
- In einer **Task-Datei tracken** mit Kontextinformationen und Phasenabläufen
- Nach jeder Phase die Planung updaten und die nächste Phase durchgehen **ohne STOPP!!**
- Falls **ORCHESTRATOR MODUS AN** ist: nach jeder Phase den Plan updaten und dann `NEXT_PHASE_READY` am Ende schreiben
  - Inklusive der `...TASK.md` als Referenz mitgeben
  - Mit einer kleinen Summary was gemacht wurde
  - Weil genau die letzte Nachricht wird im nächsten Chat mit neuem Kontext erscheinen

### 4.2 Verlauf-Dateien pro Chat
Erstelle pro Chat eine Datei in `History/`, z.B. `[thema]-verlauf.md`.
Inhalt:
1. Kurz: was wurde gemacht?
2. Betroffene Dateien
3. Stand nach diesem Chat

### 4.3 Completed-Task Dokumentation
Nach erfolgreichem Abschluss MUSS eine Datei in `.completed/<YYYY-MM-DD>_<slug>.md` erstellt werden.
Format laut: `shared-docs/agents/completed-task-rule.md`

### 4.4 Signaltöne
- **Frage stellen / auf User warten:** `powershell -c "[console]::beep(400,400)"`
- **Fertig:** `powershell -c "[console]::beep(400,800)"`

### 4.5 Dokumentationssystem
**Structure:** `docs/OVERVIEW.md` → `docs/[feature]/[feature]-overview.md` → `docs/[feature]/tasks/[datum]-[task].md`

---

## 5. Subagents & Erkundung

### 5.1 Subagent-Nutzung (Pflicht)
- Subagents **nur zum Suchen und Abschließen** verwenden
- Also zum Suchen von Dateien oder zum Aktualisieren von Dokumentationen
- **Nicht** für das eigentliche Coding/Implementieren

### 5.2 Pre-Task Reconnaissance (Pflicht bei größeren Tasks)

**Inspiriert von ASMR (Agentic Search & Memory Retrieval):** Bevor Code geschrieben wird,
MÜSSEN 2-3 Erkunder-Agents (Haiku) parallel gespawnt werden um den vollen Kontext zu sammeln.
Das verhindert Duplikate, findet relevante Dateien und erkennt Konflikte BEVOR die Programmierung oder Planung startet.

### Ablauf (IMMER linear spawnen!):
```
User-Task → Orchestrator
  │
  ├─ VOR dem Coding (parallel):
  │   ├─ erkunder-docs  (Haiku) → Sucht in docs/, .completed/, History/
  │   └─ erkunder-code  (Haiku) → Findet betroffene Dateien, Duplikate
  │
  ▼ Synthese → duplikat-checker (Haiku, bei neuen Dateien)
  │
  ├─ programmiere/plane (Opus) → Coding mit vollem Kontext
  │
  ▼ NACH dem Coding:
  └─ abschliesser (Haiku) → .completed/ erstellen + CLAUDE.md Relevanz-Check
```

### Wann PFLICHT?
- Feature-Implementierung (neue Komponenten, Hooks, Stores)
- Refactoring (betroffene Dateien kennen)
- Bug-Fixes die mehrere Dateien betreffen könnten
- Alles wo der Programmierer mehr als 2 Dateien ändern wird

### Wann OPTIONAL?
- Einzeiler-Fixes (Typo, CSS-Anpassung)
- Wenn der User explizit sagt „mach einfach schnell"

### 5.3 Duplikat-Checker (PFLICHT bei neuen Dateien!)
Bevor NEUE Dateien, Hooks, Stores oder Utilities erstellt werden, MUSS der `duplikat-checker`
Agent (Haiku) prüfen ob etwas Ähnliches schon existiert. **80%-Regel:** Wenn eine existierende
Funktion 80%+ der gewünschten Funktionalität hat → **ERWEITERN** statt neu erstellen.

**WICHTIG:** Sollten die Subagents nicht existieren, lege sie an mit einem schnellen und token-effizienten Modell (z.B. Haiku 4.5) von dem Provider, von welchem du gerade aus arbeitest, und teile dem User mit, dass du die Subagents erzeugt hast.

### 5.4 Wer schreibt was?

| Agent | Modell | Datei-Output | Inhalt |
| --- | --- | --- | --- |
| `erkunder-docs` | Haiku | Chat-Output an Orchestrator | Verwandte Tasks, Architektur-Docs, History |
| `erkunder-code` | Haiku | Chat-Output an Orchestrator | Betroffene Dateien, existierende Funktionen, Duplikate |
| `duplikat-checker` | Haiku | Chat-Output an Orchestrator | Duplikat-Prüfung für geplante neue Dateien |
| `abschliesser` | Haiku | `.completed/*.md` + ggf. CLAUDE.md Mini-Update | .completed/ Datei + Relevanz-Check Knowledge Map/Persistenz |
| `ki-architekt` | Opus | `*-ARCHITEKTUR-ANALYSE.md` | Ist-Stand, Abweichungen, betroffene Dateien, Empfehlungen |

---

## 6. Planung & Analyse

### 6.1 Komplexe Planung (Pflicht)
1. Bei großen Systemen: **Masterplan plus Unterdateien**
2. Pflicht-Unterdateien:
   - Phasenplan
   - Performance-Testplan
   - Edge-Case-Katalog
3. Jede Phase braucht: **Ziel, Risiko, Test, sichtbaren Nutzen**
4. Phasen am Stück umsetzen und sauber dokumentieren
   - Programmieren und dokumentieren im Wechsel, **ohne Pause!**

### 6.2 Planungs-Workflow mit Mindesttiefe (Pflicht)
Bei Feature- oder Refactor-Planungen müssen die Phasen mehr erklären als nur Überschriften.
Jede Phase muss diese **6 Punkte** enthalten:

1. **Ziel:** Was ist am Ende sichtbar besser?
2. **Warum:** Warum löst genau diese Phase das Kernproblem?
3. **Umsetzung:** Welche 1-3 Dateien/Module werden konkret geändert?
4. **Risiko:** Was könnte kaputtgehen?
5. **Check:** Woran erkennen wir schnell, dass es funktioniert?
6. **Ergebnis-Satz:** Ein kurzer Satz in einfacher Sprache für Nicht-Entwickler.

Wenn die Phase Architektur betrifft, zusätzlich Pflicht:
- Vorher/Nachher-Datenfluss in 3-6 Schritten
- Klare Aussage, ob die Änderung mit `CLAUDE.md` konsistent ist

### 6.3 Detaillierungs-Standard für Analyse & Planung (Pflicht)
Wenn der User nach einer Analyse fragt oder schreibt „zu vage", gilt ab dann dieser Mindest-Standard:

1. **Keine pauschalen Aussagen** ohne Begründung
2. Jede wichtige Aussage braucht:
   - Was passiert technisch?
   - Warum passiert es genau?
   - Welche sichtbare Auswirkung hat das für den User?
3. Jede Analyse braucht klare Belege:
   - Konkrete Datei/Modul-Nennung
   - Konkrete Log-Hinweise oder Datenfluss-Schritte
4. Jede Planung braucht Entscheidungstiefe:
   - Option A (bevorzugt), Option B (Alternative), warum A besser passt
5. Bei Architekturfragen immer klar trennen:
   - Kurzfristiger Fix
   - Mittelfristige Verbesserung
   - Langfristige Zielarchitektur
6. Jede große Antwort endet mit einer verständlichen Zusammenfassung in 4 Teilen:
   - Ausgangsproblem
   - Echte Ursache
   - Umgesetzte oder empfohlene Lösung
   - Verbleibendes Risiko / nächster sinnvoller Schritt

### 6.4 Analyse-Workflow (Pflicht bei Bug, Architektur, Performance)
Nutze bei komplexen Themen immer dieses Ablaufmuster:

1. **Problem-Satz:** „Was ist kaputt?" in einem klaren Satz
2. **Auswirkungen:** „Was merkt der User davon?" in einem klaren Satz
3. **Ist-Fluss:** Schritt-für-Schritt den aktuellen Datenfluss beschreiben (Eingang → Verarbeitung → Ausgabe)
4. **Bruchstelle:** Exakt benennen, an welchem Schritt der Fluss kaputt geht
5. **Ursachenbeweis:** Logs, Codepfad oder Zustandswerte nennen, die die Ursache belegen
6. **Lösungsweg:** Genau sagen, welche Änderung den Bruch behebt und warum
7. **Nebenwirkungen:** Kurz prüfen, welche Bereiche mitbetroffen sein könnten
8. **Abschluss:** Kurze, alltagstaugliche Zusammenfassung mit „Was heißt das jetzt für dich?"

### 6.5 Architekten-Kette (Pflicht bei Multi-Architekten-Planung)
Wenn mehrere Architekten gebraucht werden, laufen sie **linear**, nicht parallel:
1. Architekt 1 schreibt Analyse
2. Architekt 2 baut darauf auf
3. Architekt 3 baut auf 1+2 auf

### 6.6 Validierung vor Implementierung
Bevor du anfängst eine Planung zu implementieren, **validiere** ob sie Sinn macht und korrekt geplant wurde.

### 6.7 Phasen mit To-dos (Pflicht)
Wichtig ist bei Phasen in Planungen, dass du die Phasen mit To-dos markierst. Also innerhalb von Phasen To-dos anlegen und dann schreiben, was genau gemacht worden ist.

**Beispiel:**
```markdown
### ✅ Phase NUMMER — Kurzbeschreibung *z. B. Architektur, Modus-Trennung, Save-Basis*
**Ziel:** Hier schreiben, worum es geht.
* [x] `Komponente XYZ` erzeugt (604 Zeilen Code), .....
* [ ] `AUFGABE ABC` implementieren.
**Referenzen:**
`Hier Pfade der Unterplanungen, Historien, Completed, Besprechungen angeben`
`Jeweils getrennt pro Zeile`
```

### Kommentar Sektion unter der Phasenplanung
Nach Abschluss bitte schreiben, an welchen Kriterien du dich gehalten hast, speziell also mit komma getrennt in einer Zeile 
und danach **Welche Auffäligkeiten/Fehler/Regelverstoße** dir aufgefallen sind, notieren und ein Refactoring Plan empfehlen, mitsamt aller Funde und nach Gewichtung sortieren
Kriterien eingehalten z.B. 

```markdown
## Kommentare
### Phase 1
**Eingehalten**: unter 700 Zeilen ✅, architektur ✅, Edge-Cases betrachtet ✅, ...
**Auffäligkeiten/Performance-Issues/Probleme/Kritische Findings (nach Schwere):**: 
1. 🔴 **Kritisch:** Start-Crash durch fehlerhafte QuizPack-Umwandlung
Beschreibung hierzu notieren, falls notwendig
Refactoring, Zeilenlimit überschrieben, über 700 Zeilen, Coding Regel gebrochen.... und direkt Optimierungsplan erzeugen mit Verweis auf die von dir erstelle Planung in 
2. 🟠 **Hoch:**...

### Phase 2....
```

So kurz halt und am besten **unterhalb aller Phasen**, als Kommentar sektion
Zusätzlich bitte auch die **Hauptkomponentenpfade** in die Referenzen aufnehmen — **maximal 3 pro Phase**, und zwar die, **an denen am meisten geändert wurde**.


---

## 7. Architektur & Dateistruktur

### 7.1 Component-Based Architecture (WICHTIGSTE REGEL)
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!**
- **Warum?** Performance-Killer (jedes Render neu erstellt) + State-Verlust
- ✅ Jede Komponente in separater Datei

### 7.2 Component Organization
**Maximal 700 Zeilen Code pro Datei** - Auslagern wenn größer

### 7.3 Component Naming Convention
- 🇩🇪 **DEUTSCH (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **ENGLISCH (Technical):** Section, Card, Item → `ReviewSection.tsx`

---

## 8. React Best Practices

### 8.1 State & Props
- **Immutable State:** `setState(prev => ...)`
- **List Keys:** Stable, unique `key` prop für `.map()` items
- **State vs Ref:** `useState` = re-render, `useRef` = no re-render

### 8.2 Performance
- **Memoization:** `useMemo` (expensive calculations), `useCallback` (functions as props), `React.memo` (components)

### 8.3 Effects & Lifecycle
- **Cleanup:** IMMER cleanup function bei subscriptions/timers/listeners
- **Dependency Array:** Accurate dependencies, `[]` = mount only

### 8.4 Component Communication
- **Parent↔Child:** Props down, Callbacks up
- **2-3 Levels:** Lifting State Up
- **3+ Levels:** Context API oder State Management
- **Referenz:** `shared-docs/react-core-communication-patterns.md`

### 8.5 Stale Closure Pattern
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

---

## 9. Performance

### 9.1 Waterfall-Fetching Prevention
Unabhängige Fetches parallel: `Promise.all([fetch1(), fetch2()])`

### 9.2 Polling Cleanup
Jeder `useEffect` mit Timers/Subscriptions MUSS Cleanup-Function haben

### 9.3 N+1 Query Prevention
Nested Queries in Loops → Batch-Loading mit JOINs oder `inArray(itemIds)`

---

## 10. Kritische Anti-Patterns

### 10.1 Context Analysis Before Changes
Vor Änderungen: Letzte 3-4 Tasks analysieren. Würde meine Änderung diese brechen?

### 10.2 Legacy Code Removal
Nach jeder Änderung SOFORT ungenutzten Code entfernen.

### 10.3 Mobile-First Space Efficiency
UI MUSS Mobile-First designed werden: Maximale Space-Efficiency.

### 10.4 Wiederverwendbarkeit-First
Dialoge/Komponenten MÜSSEN für Wiederverwendung designed werden: Props für Modi, Callback-Props.

### 10.5 RECHERCHE VOR RUMPROBIEREN (KRITISCH!)
**PFLICHT-Workflow bei unbekannten Fehlern:**
1. **Stack-Trace GENAU lesen** - Welche Datei, Zeile, Komponente?
2. **RECHERCHIEREN** - Docs, GitHub Issues durchsuchen
3. **Root Cause verstehen** - WARUM passiert der Fehler?
4. **DANN erst fixen** - Mit Verständnis der Ursache

### 10.6 UI Library Defaults respektieren
**Niemals** die Standard-Höhe/Padding von UI-Library-Komponenten (Radix, Shadcn) manuell überschreiben (z.B. `py-3` auf `TabsTrigger`, `h-12` auf `Button`). Nutze stattdessen die vordefinierten Variants (`size="sm"`, `size="lg"` etc.). Wenn kein passender Variant existiert, erweitere das Variant-System in der UI-Komponente.

### 10.7 Disabled Button Feedback
Jeder disabled Button MUSS über Tooltip oder benachbarten Hinweistext erklären, **warum** er deaktiviert ist. Der User darf nie raten müssen, warum eine Aktion nicht verfügbar ist.

### 10.8 Solide Hintergrundfarben für Dialoge/Overlays (PFLICHT!)
**Alle Dialoge, Sheets, Drawers und modale Overlays MÜSSEN eine solide Hintergrundfarbe mit Hex-Code bekommen.**

**VERBOTEN:**
- `bg-black/40`, `bg-black/50`, `bg-white/10` oder jede andere Tailwind-Opacity-Notation als Haupthintergrund
- Halbtransparente Hintergründe, durch die der Content dahinter durchscheint

**PFLICHT:**
- Solide Hex-Farben verwenden: z.B. `!bg-[#0c0f1a]/95` oder `!bg-[#0c0f1a]`
- Mindestens 90% Opazität, damit der Dialog-Inhalt klar lesbar bleibt
- Das `!important` (`!bg-...`) nutzen, um Shadcn/Radix-Defaults zu überschreiben

**Beispiel:**
```tsx
// ❌ FALSCH - halbtransparenter Hintergrund (Standard von DialogContent)
<DialogContent className="bg-black/40">

// ✅ RICHTIG - solide Hintergrundfarbe mit Hex
<DialogContent className="!bg-[#0c0f1a]/95">
```

### 10.9 Dropdown/Popover Stacking-Check (Z-Index + Overflow)
Vor jedem UI-Change an Dropdowns, Selects, Popovers, Command-Listen oder Kontextmenüs MUSS geprüft werden:
- Gibt es einen Parent mit `overflow: hidden/auto` oder einen neuen Stacking Context (`transform`, `filter`, `opacity`, `position`, `isolation`)?
- Wird das Overlay per Portal gerendert (z. B. Radix `Portal`) statt innerhalb eines abgeschnittenen Containers?
- Ist der `z-index` relativ zu bestehenden Overlays (Dialog, Sheet, Drawer, Tooltip) korrekt priorisiert?

Wenn Inhalte abgeschnitten sind, **kein Workaround mit nur höherem z-index**. Erst Ursache im Layout/Portal/Overflow beheben.

### 10.10 NIEMALS User-Input parsen für Intent-Routing (KRITISCH!)
**GOLDENE REGEL:** User-Freitext geht IMMER an die KI. Es gibt KEINE Vorfilterung.

**VERBOTEN:**
- Pattern-Matching / Regex auf User-Input um Intents zu erkennen
- Clarification-Messages aus User-Input-Analyse erzeugen
- Parameter-Extraktion aus User-Input vor KI-Antwort
- Jede Form von `routeIntent(userInput)` für Freitext

**ERLAUBT:**
- Preset-Button-Klicks direkt routen (`routePreset()`)
- KI-Antworten parsen (`parseAssistantCommands(aiResponse)`)
- KI-generierte Commands validieren (`validateAssistantCommandParseResult()`)

### 10.11 Kritische Design-Prüfung
Bitte achte bei **jedem** Problem nicht nur auf den konkreten Fehler, sondern auch darauf, ob die **Architektur** dahinter grundsätzlich falsch oder riskant ist.

---

## 11. TypeScript & Validierung

### 11.1 TypeScript-Prüfung
- TypeScript immer prüfen: `npm run type-check`
- Kein `npm run build` und kein `npm run dev` nötig

### 11.2 ZERO TOLERANCE für TypeScript-Fehler
- **NACH JEDER PHASE:** `npx tsc --noEmit` ausführen
- **NIEMALS** TypeScript-Fehler ignorieren oder „später fixen"
- **SOFORT** beheben bevor zur nächsten Phase gegangen wird
- TypeScript-Fehler sind **BLOCKER** - keine Ausnahmen!

### 11.3 Häufige Fehler-Kategorien
- **TS2307:** Cannot find module → Paket installieren
- **TS2322:** Type mismatch → Interface/Type anpassen
- **TS2339:** Property does not exist → Type erweitern
- **TS18048:** Possibly undefined → Optional chaining oder Guard

### 11.4 Bei Fehler: STOPP-Protokoll
1. **STOPP** - Keine weiteren Änderungen
2. **ANALYSIERE** - Root Cause verstehen (nicht raten!)
3. **RECHERCHIERE** - Docs/Issues wenn unklar
4. **FIXE** - Mit Verständnis der Ursache
5. **VALIDIERE** - Alle Checks erneut
6. **ERST DANN** - Weitermachen

---

## 12. LLM-Kontextmanagement

### 12.1 TOKEN-LIMIT WARNUNG
**ACHTUNG:** Nach ~150.000 Tokens beginnen LLMs zu halluzinieren und Fehler zu machen!

| Kontext | Limit | Aktion |
|---------|-------|--------|
| Planungs-Chat | 4 Planungen max | Neuen Chat öffnen |
| Coding-Chat | ~150.000 Tokens | STOPP, neuen Chat öffnen |
| Kontext-Verlust | ~200.000 Tokens | Halluzinationen wahrscheinlich |

### 12.2 Neuer Chat Workflow
**Bei Erreichen des Token-Limits:**
1. Aktuellen Stand in MASTER-ORCHESTRATOR.md dokumentieren
2. Migrations-Tracker in der Phase-Datei aktualisieren
3. Zusammenfassung für nächsten Chat erstellen
4. Neuen Chat mit relevanten Dateien starten

---

## 13. Browser-Testing

### 13.1 Wann Browser-Testing nutzen
**PFLICHT bei folgenden Situationen:**
- Nach Implementierung von UI-Features
- Nach Änderungen an Formularen/Inputs
- Nach Änderungen an Navigation/Routing
- Wenn User explizit „teste das im Browser" sagt

**Referenz:** `shared-docs/agents/agent-browser/SKILL.md`

### 13.2 Browser-Testing Workflow
**Standard-Workflow:**
1. Dev-Server starten
2. Port notieren
3. Browser öffnen: `agent-browser open http://localhost:PORT`
4. Snapshot machen: `agent-browser snapshot -i`
5. Mit UI interagieren (click, fill, etc.)
6. Screenshot bei Fehler: `agent-browser screenshot error-NAME.png`

### 13.3 Bei Port-Konflikten
**Problem:** Port belegt

**Lösung:**
```bash
# Option A: Anderen Port nutzen
npm run dev -- --port 5174

# Option B: Prozess auf Port beenden
npx kill-port 5173
```

### 13.4 Bei langen Wartezeiten
**Wenn Bundling > 60s dauert:**
1. Status prüfen (nicht ewig warten)
2. Cache clearen
3. Bei Endlos-Loop: Task abbrechen, User informieren

---

## 14. Test-Account System

### 14.1 Wann Test-Account nutzen
**PFLICHT bei Browser-Testing von Auth-geschützten Features:**
- Features die Login erfordern

### 14.2 Sicherheitsregeln (NIEMALS VERLETZEN!)
❌ **VERBOTEN:**
- Test-Account Features in Production-Builds
- Echte User-Credentials im Code
- Test-Account mit Admin-Rechten
- Test-Daten in Production-DB

✅ **PFLICHT:**
- `__DEV__` Check
- `NODE_ENV=development` Check
- Isoliertes Test-Profil
- Klar markierte Test-UI-Elemente

---

## 15. Framework-spezifische Docs

| Framework | Dokumentation |
|-----------|---------------|
| React Native/Expo | `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md` |
| Next.js | `shared-docs/skills/nextjs-rules/NEXTJS-RULES.md` |
| Capacitor | `shared-docs/performance/capacitor-performance-rules.md` |
| Liquid Glass Design for Tailwind CSS | `shared-docs/design/liquid-glass-guide.md` |
| DB Live Testing for Postgres | `shared-docs/database-testing-guide.md` |
| Browser-Testing | `shared-docs/agents/agent-browser/SKILL.md` |

---

## 16. Quick Checklist

**Vor Commit:**
- `npm run type-check` (🔴 MUSS 0 FEHLER HABEN!)
- Ungenutzter Code entfernt
- Mobile-First
- Edge Cases bedacht
- Max 700 lines/file
- Komponente in separater Datei
- Keine Komponenten in Komponenten

**🤖 LLM-Kontext:** Nach 150k Tokens → NEUEN CHAT öffnen!

---

## Achte auf folgende Sachen

**Bei jeder Planung und Implementierung immer prüfen:**
- ✅ **Wartbarkeit** – Ist der Code leicht zu pflegen?
- ✅ **Modular/Komponentenbasiert** – Sind Teile unabhängig nutzbar?
- ✅ **Helper/Service-Funktionen** – Wiederkehrende Logik ausgelagert?
- ✅ **Trennung** – UI, Logik, Daten klar getrennt?
- ✅ **Gute Architektur** – Passt die Struktur langfristig?
- ✅ **Simpel und Wiederverwendbar** – Nicht überkompliziert?
- ✅ **Performance Optimiert** – Edge Cases betrachtet?
- ✅ **Zu diesen Kriterien immer Meinung/Feedback in Planungen schreiben**


**Weitere Extrem wichtige Regeln**
- keine UNIT Tests schreiben