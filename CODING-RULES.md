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

- **8.-Klässler-Verständnis:** Motiviert, einfach, menschlich schreiben. Echte Umlaute (ü, ä, ö, ß). Alltagsbeispiele und Alltagssprache. Wenige technische Begriffe auf einmal, oder erklären. Deutsch, allgemeinverständlich, keine Fachsprache.
- **Formatierung:** Kursiv, fett, Icons, Sektionen, kurze Beispiele aus dem Alltag
- **Problem-Aufstellung vor Lösung:** Erst kurz einordnen: Ziel + Warum wichtig → Dann Lösungsweg · Bei komplexen Features: Problem (1 Satz) → Auswirkung (1 Satz) → Lösung (1 Satz) → In Phasen planen
- **Starker Projekt-Partner:** Fortschritt in Updates · 2-3 konkrete Vorschläge statt abstrakter Ideen · Klarer nächster Schritt
- **User-Entlastung:** Keine unnötigen manuellen Schritte für den User · Import, Mapping, Fallbacks, Defaults, Validierung übernehmen · Nur bei fehlenden externen Daten nach genau 1 Info fragen · Jede Antwort prüfen: „Nimmt das dem User Arbeit ab?"
- **Konsolenausgaben (wenn gewünscht):** Hochmodern, farbig, menschenlesbar, kompakt · Server/Client + Methode/Klasse zeigen · Retro-Game-Stil 🎮 · Bei Laggs: Timer einbauen (siehe evlog: `shared-docs/agents/skills/review-logging-patterns/SKILL.md`)

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
- **ORCHESTRATOR MODUS:** Nach jeder Phase Plan updaten + `NEXT_PHASE_READY` am Ende · Task-Pfad mitgeben · Kleine Summary was gemacht wurde, so kann direkt weitergearbeitet werden von einer anderen KI!

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
6. **Jetzt nächste Phase implementieren ohne STOPP:** Entweder NEXT_PHASE_READY schreiben, falls Orchestrator an ist oder einfach weitermachen und diesen Prozess wiederholen


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
- 
### Controlled-Value Guard & Patch-Hygiene (PFLICHT)
- **Kontrollierte UI-Werte immer validieren:** Bei `Tabs`, `Select`, `Popover` usw. nur erlaubte Werte an den State weitergeben (Allowlist-Prinzip).
- **Fallback bei nicht verfügbaren Features:** Wenn ein Wert auf der aktuellen Plattform nicht erlaubt ist (z.B. `terminal` im Browser), sofort auf sicheren Wert zurückfallen (`chat` oder Default-Tab).
- **Event-Werte nie blind casten:** Kein `onValueChange={v => setState(v as MyType)}` ohne Laufzeitcheck.
- **State-Updates idempotent halten:** Nur updaten, wenn sich der Wert wirklich geändert hat (`prev === next ? prev : next`), damit keine unnötigen Re-Render-Ketten entstehen.
- **Patch-Hygiene nach schnellen Edits:** Nach jedem Patch Dateiende prüfen (keine angehängten JSX-Reste, keine duplizierten Abschlussblöcke).
- **Pflicht-Check danach:** `pnpm exec next lint --file <datei>`; bei auffälligem Laufzeitverhalten zusätzlich `npx tsc --noEmit` und Fehlerstellen dokumentieren.

**Vorfall-Merkhilfe (2026-04-24, einfach erklärt):**
- Ungültige Tab-Werte konnten eine Render-Schleife auslösen.
- Versehentlich angehängte Restzeilen machten den UI-Stack instabil.
- Falscher Zugriff auf `workspaces` (Array statt Objekt-Mapping) erzeugte TypeScript-Fehler.
- UI-Werte immer prüfen (nicht blind casten),
- nur bei echter Änderung State setzen,
- bei nicht unterstütztem Wert sofort auf sicheren Fallback,
- nach Patch immer Dateiende + Lint prüfen.

### Performance
- Unabhängige Fetches parallel: `Promise.all([fetch1(), fetch2()])`
- Polling Cleanup: Jeder useEffect mit Timers/Subscriptions MUSS Cleanup-Function haben
- N+1 Prevention: Nested Queries in Loops → Batch-Loading mit JOINs oder `inArray()`
- **Three.js / R3F Hotpath-Regel (PFLICHT):** Bei FPS-Spikes zuerst Render-/State-Churn im Trefferpfad prüfen, nicht nur Partikel reduzieren. In High-Frequency-Pfaden (`useFrame`, Sustain-Hit-Loops) keine breiten Store-Subscriptions oder häufiges `setState`; stattdessen selektive Selector (`useShallow`), `useRef` und gedrosselte Cross-Store-UI-Syncs nutzen.
- **Post-Mortem Referenz (verbindlich bei ähnlichen Bugs):** `docs/performance/threejs-fps-postmortem-2026-04-19.md`

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
- **Disabled Button Feedback:** MUSS über Tooltip/Hinweistext erklären WARUM deaktiviert. User darf nie raten müssen.
- **Dropdown/Popover Stacking-Check:** Vor jedem UI-Change an Dropdowns/Selects/Popovers prüfen: overflow/stacking-context? Portal-Rendering? z-index-Priorität? · Niemals nur höheren z-index als Workaround — erst Ursache im Layout/Portal/Overflow beheben

## Validierung & Testing
### 8.1 TypeScript
- Immer prüfen: `pnpm lint` · Kein `pnpm build` oder `pnpm dev` nötig
- **ZERO TOLERANCE:** `npx tsc --noEmit` nach JEDER Phase · NIEMALS Fehler ignorieren oder „später fixen" · SOFORT beheben · TypeScript-Fehler sind **BLOCKER** — keine Ausnahmen!
- **Fehler direkt mitfixen (Pflicht):** Wenn du im bearbeiteten Scope sichtbare Fehler findest (TS, Lint, Runtime), dann sofort beheben und nicht „für später“ liegen lassen.
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
**Bei Mac: Mac Signal Sounds (statt PowerShell):**
Phase fertig/generell: `afplay /System/Library/Sounds/Glass.aiff && sleep 0.3 && afplay /System/Library/Sounds/Glass.aiff`
Alle Phasen fertig: `afplay /System/Library/Sounds/Hero.aiff && sleep 0.5 && afplay /System/Library/Sounds/Funk.aiff`


# Wichtige Regeln / Zusammmenfassung
**NIEMALS automatisch `npm run dev` oder `pnpm dev` starten!**
- Der Dev-Server läuft oft bereits im Hintergrund
- Automatisches Starten verursacht Port-Konflikte (EADDRINUSE)
- Bei UI-Tests: Prüfen ob Server bereits läuft, nicht blind starten
- Halte dich an die Design/Layout Regeln, möglicherweise in einer globals.css hinterlegt, falls nicht auffindbar, erzeuge eine bzw nutze hier das beispiel als vorlage: `D:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension\shared-docs\farbpalette\darkmode.css`

- Höre nicht auf, bis wirklich alle Phasen implementiert sind und alle Phasen in der Planung abgeschlossen also abgehackte Todos - nach jeder Phase bitte plan updaten
- **Beim ORCHESTRATOR MODUS:** Nach jeder Phase Plan updaten + `NEXT_PHASE_READY` am Ende · Task-Pfad mitgeben · Kleine Summary was gemacht wurde, so kann direkt weitergearbeitet werden von einer anderen KI!
- Schreibe immer zu jeder Phase, falls fertig Anmerkungen in die Planung, was du noch für Schwachstellen rausgefunden hast, diese dann am Ende der Implementierung des Gesamtplans, also falls alle Phasen fertig sind, sollten dann Aufgaben anhand der Anmerkungen erzeugt werden 
  - diese dann direkt abarbeiten auch genauso wie bei der vorherigen Aufgabe!