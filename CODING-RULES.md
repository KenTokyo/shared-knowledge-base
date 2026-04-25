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

## 4. Erzeugung von Planung

### 4.1 Dokumentationssystem
**Structure:** `docs/OVERVIEW.md` → `docs/[feature]/[feature]-overview.md` → `docs/[feature]/tasks/[datum]-[task].md`

Jede Phase MUSS diese **6 Punkte** enthalten:
1. **Ziel:** Was ist am Ende sichtbar besser?
2. **Warum:** Warum löst genau diese Phase das Kernproblem?
3. **Umsetzung:** Welche 1-3 Dateien/Module werden konkret geändert?
4. **Risiko:** Was könnte kaputtgehen?
5. **Check:** Woran erkennen wir schnell, dass es funktioniert?
6. **Ergebnis-Satz:** Kurzer Satz in einfacher Sprache für Nicht-Entwickler.

Bei Architektur-Phasen zusätzlich Pflicht: Vorher/Nachher-Datenfluss in 3-6 Schritten.

**Komplexe-Themen-Ablauf:** Probleme → Auswirkungen → Ist-Fluss → Bruchstelle → Ursachen → Lösungen/Optionen (alle auflisten) → Empfehlung ausplanen → Nebenwirkungen → Abschluss

### 4.2 Planungs-Workflow (ZWINGEND VOR CODE)

**Prioritäten:** 1. 🚨 Planung aktuell halten · 2. 📖 Plan lesen · 3. 💡 Eine Phase · 4. ✅ Plan updaten · 5. ✨ Kommunikation

1. **Planungsvalidierung (ZWINGEND VOR CODE):**
   - User-Planung mitgegeben? → Lesen, prüfen ob Task enthalten
   - Task enthalten? → JA: Implementieren · NEIN: Planung erweitern
   - Keine Planung? → In `docs/[feature]/tasks/` suchen oder neue nach Architekten-Regeln erstellen
   - **ERST nach Planungserweiterung darf programmiert werden!**

2. **Kontext sammeln:** Plan lesen · Ähnliche Dateien finden für Struktur/Coding-Richtlinien

3. **Phasen nacheinander implementieren:** Qualität vor Quantität, ohne Rückfrage bis alle Phasen abgeschlossen sind (außer externer Blocker)

4. **Plan aktualisieren (PFLICHT nach jeder Phase):** Phase als ✅ markieren · Arbeitsschritte dokumentieren · Entscheidungen festhalten · Edge Cases notieren · erledigte/offene To-dos und nächste Phase festhalten

5. **Kommentar-Sektion unter allen Phasen:** Eingehaltene Kriterien (kommasepariert) + Auffälligkeiten/Fehler nach Schwere sortieren (🔴🟠🟡) · Hauptkomponentenpfade (max 3 pro Phase, mit den meisten Änderungen) · Refactoring-Plan empfehlen bei Funden

6. **Dokumentation (NUR wenn ALLE Phasen fertig):** Feature-Overview, Sub-Features, Task-History, ggf. Master-Navigation updaten · Doku-Richtlinien beachten: `agents/dokumentier-regeln.md`

### 4.3 Masterplan-System
- Bei großen Systemen: `docs/[feature]/tasks/[datum]-[masterplan].md` referenziert mehrere `[datum]-[task].md`
- Erstellen sobald Umfang/Abhängigkeiten es erfordern oder wenn User „erzeuge Masterplan" sagt
- Pflicht-Phasenpläne nach unserem Format
- Phasen am Stück umsetzen und dokumentieren, ohne Pause

### 4.4 Phasen-mit-To-dos-Format (Pflicht, 6.7)
```markdown
### ✅ Phase NUMMER — Kurzbeschreibung *z. B. Architektur, Modus-Trennung*
**Ziel:** Hier schreiben, worum es geht.
* [x] `Komponente XYZ` erzeugt (604 Zeilen Code), .....
* [ ] `AUFGABE ABC` implementieren.
**Referenzen:**
`Hier Pfade der Unterplanungen, Historien, Completed, Besprechungen`
`Jeweils getrennt pro Zeile`
```

### 4.5 Architektur-Risiken in Planungen (PFLICHT)
In jeder Planung diesen Absatz einfügen — als **Denkprozess**, nicht starre Checkliste. Konkret für die Änderung durchdenken:
- Welche anderen Bereiche könnten betroffen sein? (Cross-Cutting Concerns)
- Wo wird der gleiche Datenfluss / die gleiche Quelle noch verwendet?
- Welche React-Lifecycle-Probleme könnten auftreten? (StrictMode, Remount, Context-Verfügbarkeit)
- Wo überqueren wir Server/Client-Grenzen?
- Nutzen wir flüchtige Speicher wo persistente Lösung nötig wäre?

```markdown
## 🛡️ Architektur-Risiken & Seiteneffekte
### Betroffene Bereiche (Cross-Cutting)
- [Bereich X] → könnte [Problem Y] verursachen weil [Grund]
### Potenzielle Fallen
- ⚠️ [Falle] → Empfehlung: [Alternative]
### Checkliste
- [ ] Seiteneffekte geprüft · [ ] Context/Store-Verfügbarkeit sichergestellt
```

### 4.6 Planungs-Regeln
- **KEIN vollständiger Code** in Planungen! Nur konzeptuelle Beschreibungen, API-Signaturen, kurze Pseudo-Code-Beispiele (max 3-5 Zeilen), Dateistrukturen, Import/Export-Listen
- ❌ VERBOTEN: Komplette Funktions-Implementierungen (>10 Zeilen) · Vollständige React-Komponenten mit JSX · Copy-paste-ready Code-Blöcke
- ✅ ERLAUBT: Konzeptuelle Beschreibungen · API-Signaturen · Kurze Pseudo-Code-Beispiele (max 3-5 Zeilen) · Dateistrukturen · Import/Export-Listen
- Max ~700 Zeilen pro Planung (nicht 1500+ mit Code!)
- 3-4 Komponenten pro Phase (neu oder angepasst), max ~900-1300 Zeilen Code gesamt
- Vor Programmierung: existierende Funktionen suchen → **Wiederverwendung vor Redundanz** (Ziel: kein toter oder veralteter Code)
- Proaktiv Edge-Cases identifizieren und dokumentieren (6 + F&A-Szenarien)
- Menschenlesbare Pläne: einfach, kursiv, fett, Icons, Alltagsbeispiele, Alltagssprache

### 4.7 Umgang mit existierenden Planungen

**Erweiterung:** User möchte neues Feature → Abhängigkeiten prüfen · Integration planen · Edge Cases identifizieren · Neue Phasen hinzufügen

**Fehlerbehebung:** Bug in implementiertem Feature → Welche Phase betroffen? Edge Case nicht berücksichtigt? Plan erweitern mit Fehleranalyse + Fix

**Vollständige Neubewertung:** Grundlegende Überarbeitung → Status Quo erfassen · Refactoring vs. Neuentwicklung · Neue Planung mit Migration-Strategie

### 4.8 Abschluss nach allen Phasen (PFLICHT)
- Wenn in der Kommentar-Sektion offene Auffälligkeiten stehen: direkt eine Cleanup-Masterplanung in `docs/[feature]/tasks/` erstellen
- Abschlussmeldung enthält immer: kurzen Umsetzungsstand + nächsten sinnvollen Verbesserungsvorschlag für die App

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

### 6.1 Component-Based Architecture (WICHTIGSTE REGEL)
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!** → Performance-Killer (jedes Render neu erstellt) + State-Verlust. Jede Komponente in separater Datei.

### 6.2 Komponenten-Organisation
- **Maximal 700 Zeilen Code pro Datei** — Auslagern wenn größer
- 🇩🇪 **Deutsch (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **Englisch (Technical):** Section, Card, Item → `ReviewSection.tsx`

### 6.3 Sektionsbasierte Ordnerstruktur
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

### 6.4 React Best Practices
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

### 6.5 Performance
- Unabhängige Fetches parallel: `Promise.all([fetch1(), fetch2()])`
- Polling Cleanup: Jeder useEffect mit Timers/Subscriptions MUSS Cleanup-Function haben
- N+1 Prevention: Nested Queries in Loops → Batch-Loading mit JOINs oder `inArray()`
- **Three.js / R3F Hotpath-Regel (PFLICHT):** Bei FPS-Spikes zuerst Render-/State-Churn im Trefferpfad prüfen, nicht nur Partikel reduzieren. In High-Frequency-Pfaden (`useFrame`, Sustain-Hit-Loops) keine breiten Store-Subscriptions oder häufiges `setState`; stattdessen selektive Selector (`useShallow`), `useRef` und gedrosselte Cross-Store-UI-Syncs nutzen.
- **Post-Mortem Referenz (verbindlich bei ähnlichen Bugs):** `docs/performance/threejs-fps-postmortem-2026-04-19.md`

## 7. Anti-Patterns & UI-Regeln

- **Kontextanalyse vor Änderungen:** Letzte 3-4 Tasks prüfen · Würde meine Änderung diese brechen?
- **Mobile-First Space Efficiency:** UI MUSS Mobile-First designed werden, maximale Space-Efficiency
- **Wiederverwendbarkeit-First:** Dialoge/Komponenten MÜSSEN für Wiederverwendung designed werden: Props für Modi, Callback-Props
- **Recherche vor Rumprobieren (KRITISCH!):** 1. Stack-Trace GENAU lesen → 2. Docs/GitHub Issues durchsuchen → 3. Root Cause verstehen → 4. DANN erst fixen
- **UI Library Defaults respektieren:** Niemals Standard-Höhe/Padding von UI-Library-Komponenten (Radix, Shadcn) manuell überschreiben → vordefinierte Variants nutzen (`size="sm"`, `size="lg"`). Kein passender Variant? → Variant-System erweitern
- **Disabled Button Feedback:** MUSS über Tooltip/Hinweistext erklären WARUM deaktiviert. User darf nie raten müssen.
- **Solide Hintergrundfarben für Dialoge/Overlays (PFLICHT!):**
  - ❌ VERBOTEN: `bg-black/40`, `bg-black/50`, `bg-white/10` oder jede andere Tailwind-Opacity-Notation als Haupthintergrund · Halbtransparente Hintergründe durch die Content durchscheint
  - ✅ PFLICHT: Solide Hex-Farben: `!bg-[#0c0f1a]/95` oder `!bg-[#0c0f1a]` · Mindestens 90% Opazität · `!important` nutzen um Shadcn/Radix-Defaults zu überschreiben
- **Dropdown/Popover Stacking-Check:** Vor jedem UI-Change an Dropdowns/Selects/Popovers prüfen: overflow/stacking-context? Portal-Rendering? z-index-Priorität? · Niemals nur höheren z-index als Workaround — erst Ursache im Layout/Portal/Overflow beheben
- **Einheitliche abgerundete Ecken (Border-Radius):**
  - ✅ PFLICHT: Alle Karten/Container einer Ansicht MÜSSEN denselben Border-Radius haben
  - Empfohlen: `rounded-2xl` (16px) oder `rounded-xl` (12px) für Karten · `rounded-lg` (8px) für kleinere Elemente (Buttons, Inputs)

## 8. Validierung & Testing

### 8.1 TypeScript
- Immer prüfen: `pnpm lint` · Kein `pnpm build` oder `pnpm dev` nötig
- **ZERO TOLERANCE:** `npx tsc --noEmit` nach JEDER Phase · NIEMALS Fehler ignorieren oder „später fixen" · SOFORT beheben · TypeScript-Fehler sind **BLOCKER** — keine Ausnahmen!
- **Fehler direkt mitfixen (Pflicht):** Wenn du im bearbeiteten Scope sichtbare Fehler findest (TS, Lint, Runtime), dann sofort beheben und nicht „für später“ liegen lassen.
- **Keine neuen Tests erstellen:** Es werden **keine** Unit-/Integration-/E2E-Tests neu erzeugt, außer der User fordert es ausdrücklich.
- **Keine Testarbeit ohne expliziten Auftrag:** Keine bestehenden Tests umbauen und keine Test-Konfigurationen (z. B. `vitest.config.ts`) ändern, außer der User verlangt es klar.

### 8.2 Browser-Testing (PFLICHT bei UI-Features)
- Nach UI-Feature-Implementierung · Nach Formular/Input-Änderungen · Nach Navigation/Routing-Änderungen · Wenn User „teste das im Browser" sagt
- Referenz: `shared-docs/agents/agent-browser/SKILL.md`
- Bei Bundling > 60s: Status prüfen → Cache clearen → Bei Endlos-Loop: Task abbrechen, User informieren

### 8.3 Test-Account System
- **PFLICHT** bei Browser-Testing von Auth-geschützten Features
- ❌ VERBOTEN: Test-Account Features in Production-Builds · Echte User-Credentials im Code · Test-Account mit Admin-Rechten · Test-Daten in Production-DB
- ✅ PFLICHT: `__DEV__` Check · `NODE_ENV=development` Check · Isoliertes Test-Profil · Klar markierte Test-UI-Elemente

## 9. Referenzen & Qualitäts-Checkliste

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


**NIEMALS automatisch `npm run dev` oder `pnpm dev` starten!**
- Der Dev-Server läuft oft bereits im Hintergrund
- Automatisches Starten verursacht Port-Konflikte (EADDRINUSE)
- Bei UI-Tests: Prüfen ob Server bereits läuft, nicht blind starten
- Halte dich an die Design/Layout Regeln, möglicherweise in einer globals.css hinterlegt, falls nicht auffindbar, erzeuge eine bzw nutze hier das beispiel als vorlage: `D:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension\shared-docs\farbpalette\darkmode.css`
