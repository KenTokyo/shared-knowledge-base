# 🎯 Coding Rules & Development Guidelines

**Zweck:** Universelle Regeln für konsistente, performante und wartbare Code-Entwicklung.

## Projekt-Override: Test-Policy (Notedrill)

Diese Regel überschreibt in diesem Projekt alle nachgelagerten Test-Pflichten:
- Automatisierte Tests (Unit/E2E/Integration) sind **nicht erforderlich**.
- Fokus ist **Praxis-Validierung im laufenden System** statt Test-Suiten.
- Tests koennen bei Bedarf ergaenzend genutzt werden, sind aber kein Pflicht-Gate.

---

Bitte achte bei **jedem** Problem nicht nur auf den konkreten Fehler (z. B. einen **TypeScript-Error**), sondern auch darauf, ob die **Architektur** dahinter grundsätzlich falsch oder riskant ist.

### ✅ Was ich von dir erwarte

* **Nicht nur den Error fixen**, sondern prüfen, ob die Lösung langfristig stabil ist. 🧩
* Wenn du merkst, dass **die aktuelle Struktur uns in Zukunft Probleme macht**, dann **sag es direkt**. 🚨
* Wenn etwas so gebaut ist, dass es **eigentlich nicht sauber funktionieren kann** (nur mit Workarounds/Tricks), dann **muss das klar benannt werden**. 🛑
* Wenn es eine **bewährte Standard-Methode** gibt, die praktisch jeder nutzt – und wir umgehen sie gerade – dann **weise darauf hin**. ✅

### ⚠️ Ganz wichtig

Wenn du erkennst, dass wir gerade in eine **schlechte technische Richtung** abdriften (z. B. durch Workarounds, unklare Verantwortlichkeiten, falsche Layering/Struktur), dann musst du das ausdrücklich sagen – auch wenn es unbequem ist.

### 🏗️ Konsequenz: Refactor statt Pflaster

Wenn nötig, sag bitte klar:

> **„Wir müssen hier sehr viel umbauen. Die jetzige Struktur ist langfristig fehlerhaft und sollte komplett refactored bzw. neu strukturiert werden."** 🔧🔥

Denn wenn das nicht offen angesprochen wird, kommen wir nicht weiter. 🚀 Nutze auch das Internet, falls du spürst, das könnte in die falsche Richtung gehen und ob es nicht schon jemand gibt, der das Problem schon gelöst hat. Denn sobald unser Grundgerüst die Architektur falsch ist, werden wir immer wieder auf Probleme stoßen. 🔧🔥

---

### 🔴 REGEL 0: Anwender-Fehler vs. Code-Fehler (KRITISCH!)

**BEVOR du einen Fehler fixst, IMMER zuerst prüfen:**

| Frage | Wenn JA → |
|-------|-----------|
| Hat der User den Befehl im **falschen Verzeichnis** ausgeführt? | → **Kein Code-Fix nötig!** Hinweis geben. |
| Hat der User **vergessen** etwas zu installieren/starten? | → **Kein Code-Fix nötig!** Checklist geben. |
| Ist die Fehlermeldung ein **bekanntes Setup-Problem**? | → **Kein Code-Fix nötig!** Docs verlinken. |
| Läuft ein **anderer Prozess** auf demselben Port? | → **Kein Code-Fix nötig!** Kill-Befehl geben. |

**NIEMALS Workarounds für Anwender-Fehler bauen!**

**Beispiel - WAS ICH HÄTTE TUN SOLLEN:**
```
❌ FALSCH: "Ich erstelle eine App.tsx im Root als Workaround"
✅ RICHTIG: "Von welchem Verzeichnis hast du 'expo start' ausgeführt?
            Bei Monorepos musst du im App-Verzeichnis sein: cd apps/mobile"
```

**Bei Fehlermeldungen IMMER nachfragen:**
1. Von welchem Verzeichnis wurde der Befehl ausgeführt?
2. Welcher Befehl genau wurde verwendet (`npm start` vs `expo start`)?
3. Wurden alle Dependencies installiert?

## 🚨 WICHTIG: Framework-spezifische Regeln

**BEVOR du weiter liest, identifiziere dein Projekt-Typ und lese die entsprechenden Regeln:**

| Projekt-Typ | Regeln lesen |
|-------------|--------------|
| **React Native / Expo** | `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md` |
| **Next.js** | `shared-docs/skills/nextjs-rules/NEXTJS-RULES.md` |
| **Capacitor** | `shared-docs/performance/capacitor-performance-rules.md` |
| **Electron** | Electron-spezifische Docs in `shared-docs/` |

**Die folgenden Regeln gelten UNIVERSELL für alle Frameworks.**

---

## Regel 1: Workflow & Arbeitsweise

### 1.1 Vor dem Start
- **Vorhaben präsentieren:** Formatiert mit Icons, klare Struktur
- **Größere Aufgaben:** Plan in `docs/[feature]/tasks/[datum]-[feature]-plan.md` erstellen
- **Code-Reuse prüfen:** ERST nach existierenden Funktionen/Components mit `Grep` suchen
- **Testing:** Keine Pflicht fuer automatisierte Tests; stattdessen Praxis-Testing im Feature-Flow
- Sei hochmotiviert, liefere formatierte Antworten mit Icons in Deutsch

### 1.2 🚨 Planungs-Regel: Kein Code in Planungsdokumenten
- ✅ **ERLAUBT:** Konzepte, Architektur, Dateipfade, API-Signaturen (max 3-5 Zeilen)
- ❌ **VERBOTEN:** Vollständige Implementierungen, Code-Blöcke >10 Zeilen
- **Ziel:** Max 500-800 Zeilen pro Plan (WAS und WARUM, nicht WIE im Detail)

### 1.2.1 🗣️ Sprache in Planungen und Status-Updates (NEU)
- Planungen, Phasenbeschreibungen und Abschluss-Updates müssen in **klarer Alltagssprache** geschrieben sein.
- Fachwörter sind erlaubt, aber nur mit kurzer Erklärung in einfachen Worten.
- Unklare Abkürzungen und interne Begriffe ohne Kontext sind zu vermeiden.
- Jede Phase braucht zusätzlich einen kurzen Satz: **"Was bedeutet das konkret für den User?"**

### 1.3 Kritisches Denken (Edge Cases)
Proaktiv: Extrem-Fälle, falsches User-Verhalten, Performance, Concurrent Access, Device-Unterschiede.

### 1.4 Nach Abschluss
- **Plan aktualisieren:** Phase als ✅ markieren
- **Dokumentation erweitern:** Bei großen Änderungen `docs/[feature]/[feature]-overview.md`
- **Zusammenfassung:** Icons, Dateipfade, abgeschlossene Phase nennen

---

## Regel 2: Architektur & Dateistruktur (UNIVERSELL)

### 2.1 🚨 Component-Based Architecture (WICHTIGSTE REGEL)
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!**
- **Warum?** Performance-Killer (jedes Render neu erstellt) + State-Verlust
- ✅ Jede Komponente in separater Datei

### 2.2 Component Organization
**Maximal 700 Zeilen Code pro Datei** - Auslagern wenn größer

### 2.3 Component Naming Convention
- 🇩🇪 **DEUTSCH (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **ENGLISCH (Technical):** Section, Card, Item → `ReviewSection.tsx`

---

## Regel 3: React Best Practices (UNIVERSELL)

### 3.0 🔴🔴🔴 useEffect wird NICHT benötigt (KRITISCH!)

**BEVOR du useEffect benutzt, STOPP und lies:**
- `shared-docs/react-useEffect/not-needed.md`

**Oder nutze den Skill:** `react-no-use-effect`

**Faustregel:** useEffect ist ein "Escape Hatch" - in 90% der Fälle brauchst du ihn NICHT!

| Situation | FALSCH (useEffect) | RICHTIG |
|-----------|-------------------|---------|
| Daten transformieren | `useEffect(() => setFiltered(...))` | `const filtered = data.filter(...)` direkt berechnen |
| State aus Props ableiten | `useEffect(() => setFullName(...))` | `const fullName = first + last` |
| Teure Berechnungen | `useEffect(() => setResult(...))` | `useMemo(() => expensiveCalc())` |
| State reset bei Prop-Change | `useEffect(() => setX(null), [prop])` | `key={prop}` am Component |
| Event-Handler Logik | `useEffect(() => if(clicked) doX())` | Direkt im Event-Handler |
| Parent über State informieren | `useEffect(() => onChange(state))` | Im Event-Handler: `setX(); onChange()` |

**Wann useEffect OK ist:**
- Externe Systeme synchronisieren (DOM, WebSocket, Third-Party)
- Analytics bei Component-Mount
- Data Fetching (aber besser: Server Components, React Query, SWR)

### 3.1 State & Props
- **Immutable State:** `setState(prev => ...)`
- **List Keys:** Stable, unique `key` prop für `.map()` items
- **State vs Ref:** `useState` = re-render, `useRef` = no re-render

### 3.2 Performance
- **Memoization:** `useMemo` (expensive calculations), `useCallback` (functions as props), `React.memo` (components)

### 3.3 Effects & Lifecycle
- **Cleanup:** IMMER cleanup function bei subscriptions/timers/listeners
- **Dependency Array:** Accurate dependencies, `[]` = mount only



### 3.4 Component Communication
- **Parent↔Child:** Props down, Callbacks up
- **2-3 Levels:** Lifting State Up
- **3+ Levels:** Context API oder State Management
- **Referenz:** `shared-docs/react-core-communication-patterns.md`

### 3.5 🔴 Stale Closure Pattern
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

## Regel 4: Network Performance (UNIVERSELL)

### 4.1 🔴 Waterfall-Fetching Prevention
Unabhängige Fetches parallel: `Promise.all([fetch1(), fetch2()])`

### 4.2 🔴 Polling Cleanup
Jeder `useEffect` mit Timers/Subscriptions MUSS Cleanup-Function haben

### 4.3 🔴 N+1 Query Prevention
Nested Queries in Loops → Batch-Loading mit JOINs oder `inArray(itemIds)`

---

## Regel 5: Kritische Anti-Patterns (UNIVERSELL)

### 5.1 🔴 Context Analysis Before Changes
Vor Änderungen: Letzte 3-4 Tasks analysieren. Würde meine Änderung diese brechen?

### 5.2 🔴 Legacy Code Removal
Nach jeder Änderung SOFORT ungenutzten Code entfernen.

### 5.3 🔴 Mobile-First Space Efficiency
UI MUSS Mobile-First designed werden: Maximale Space-Efficiency.

### 5.4 🔴 Wiederverwendbarkeit-First
Dialoge/Komponenten MÜSSEN für Wiederverwendung designed werden: Props für Modi, Callback-Props.

### 5.5 🔴🔴🔴 RECHERCHE VOR RUMPROBIEREN (KRITISCH!)
**PFLICHT-Workflow bei unbekannten Fehlern:**
1. **Stack-Trace GENAU lesen** - Welche Datei, Zeile, Komponente?
2. **RECHERCHIEREN** - Docs, GitHub Issues durchsuchen
3. **Root Cause verstehen** - WARUM passiert der Fehler?
4. **DANN erst fixen** - Mit Verständnis der Ursache

### 5.6 🔴 UI Library Defaults respektieren
**Niemals** die Standard-Höhe/Padding von UI-Library-Komponenten (Radix, Shadcn) manuell überschreiben (z.B. `py-3` auf `TabsTrigger`, `h-12` auf `Button`). Nutze stattdessen die vordefinierten Variants (`size="sm"`, `size="lg"` etc.). Wenn kein passender Variant existiert, erweitere das Variant-System in der UI-Komponente.

### 5.7 🔴 Provider-Type Exhaustive Handling
Bei jeder Komponente, die `AIProviderType`-basierte Switches/if-else-Branches hat, MUSS jeder Provider-Typ explizit behandelt werden. Nutze TypeScript exhaustive checks (`satisfies Record<AIProviderType, ...>`) oder `switch` mit `default: never`. **Kein Catch-All `else`** das unbekannte Provider-Typen stillschweigend falsch behandelt.

### 5.8 🔴 Disabled Button Feedback
Jeder disabled Button MUSS über Tooltip oder benachbarten Hinweistext erklären, **warum** er deaktiviert ist. Der User darf nie raten müssen, warum eine Aktion nicht verfügbar ist.

### 5.9 🔴 Solide Hintergrundfarben für Dialoge/Overlays (PFLICHT!)
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

**WARUM:** Halbtransparente Dialoge machen den Inhalt schwer lesbar, weil der Content dahinter durchscheint. Besonders bei Editoren, Formularen und textlastigen Dialogen ist das ein UX-Problem.

### 5.10 🔴 Dropdown/Popover Stacking-Check (Z-Index + Overflow)
Vor jedem UI-Change an Dropdowns, Selects, Popovers, Command-Listen oder Kontextmenüs MUSS geprüft werden:
- Gibt es einen Parent mit `overflow: hidden/auto` oder einen neuen Stacking Context (`transform`, `filter`, `opacity`, `position`, `isolation`)?
- Wird das Overlay per Portal gerendert (z. B. Radix `Portal`) statt innerhalb eines abgeschnittenen Containers?
- Ist der `z-index` relativ zu bestehenden Overlays (Dialog, Sheet, Drawer, Tooltip) korrekt priorisiert?

Wenn Inhalte abgeschnitten sind, **kein Workaround mit nur höherem z-index**. Erst Ursache im Layout/Portal/Overflow beheben.

### 5.11 🔴🔴🔴 NIEMALS User-Input parsen für Intent-Routing (KRITISCH!)

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

**WARUM:** User-Sprache ist mehrdeutig. "Ich schreibe eine Klausur über Redoxreaktionen"
kann ein Chat-Intent sein, NICHT zwingend ein "Ordner erstellen"-Intent.
Nur die KI kann den Kontext korrekt interpretieren.

**Referenz:** `docs/agentic-mode/tasks/2026-02-13-intent-router-user-parsing-fix-MASTER-ORCHESTRATOR.md`

---

## Regel 6: Documentation System

### 6.1 Struktur

```
docs/
├── OVERVIEW.md                           ← Master-Navigation (nur bei großen Änderungen)
├── FEATURE_MATRIX.md                     ← Use-Case → Feature Mapping
└── [feature]/
    ├── [feature]-overview.md             ← Feature-Übersicht
    ├── features/[sub-feature].md         ← Sub-Feature Details
    └── tasks/[datum]-[task].md           ← Task-History
```

### 6.2 Wann dokumentieren

- **Feature-Overview:** Nur bei großen Änderungen oder neuen Features
- **Task-History:** Nach jeder abgeschlossenen Phase
- **Master-Navigation:** Nur bei sehr großen Änderungen

### 6.3 Completed-Task Dokumentation (.completed/)

Nach **erfolgreichem Abschluss** einer Aufgabe → Datei in `.completed/` erstellen:

**Dateiname:** `<YYYY-MM-DD>_<kurzer-slug>.md`

**Format:**
```markdown
---
title: Session Tabs Feature
description: Multi-Session Tab-Switching implementiert
date: 2026-03-17
status: success
effort: M
files:
  - src/pfad/zur/datei1.ts
tags: [feature, ui]
---

## Zusammenfassung
Was wurde gemacht, warum so umgesetzt.
```

**Status-Werte:** `success`, `partial`, `failed`
**Effort:** `S` (1 File), `M` (2-5 Files), `L` (5-15 Files), `XL` (15+ Files)

---

## Regel 6b: Kommunikation & Schreibstil

### 6b.1 Spracherkennung beachten

- User sendet oft **Sprachnachrichten** (Speech-to-Text nicht immer exakt)
- Aktiv mitdenken: "Cloud Code" = "Claude Code"
- Bei Unklarheiten: Nachfragen statt raten

### 6b.2 Schreibstil

**Ziel:** So erklären, dass 8.-Klässler es verstehen.

**Antwort-Aufbau:**
1. Was wurde verstanden?
2. Was ist der Plan?
3. Was wurde konkret gemacht?
4. Was ist der nächste Schritt?

**Sprache:** Deutsch, einfach, mit Icons, hochmotiviert.
**Code:** Englisch.

### 6b.3 Echte Umlaute überall

- ✅ **RICHTIG:** ä, ö, ü, ß (echte Umlaute)
- ❌ **FALSCH:** ae, oe, ue, ss
- **Ausnahme:** Nur Dateinamen mit ae/oe/ue (wegen Kompatibilität)

---

## Regel 7: Validierung

Bevor du anfängst eine Planung zu implementieren, validiere ob sie Sinn macht und korrekt geplant wurde.

---

## 🔴 Regel 8: TypeScript-Fehler (KRITISCH!)

### 8.1 🚨 ZERO TOLERANCE für TypeScript-Fehler
- **NACH JEDER PHASE:** `npx tsc --noEmit` ausführen
- **NIEMALS** TypeScript-Fehler ignorieren oder "später fixen"
- **SOFORT** beheben bevor zur nächsten Phase gegangen wird
- TypeScript-Fehler sind **BLOCKER** - keine Ausnahmen!

### 8.2 Häufige Fehler-Kategorien
- **TS2307:** Cannot find module → Paket installieren
- **TS2322:** Type mismatch → Interface/Type anpassen
- **TS2339:** Property does not exist → Type erweitern
- **TS18048:** Possibly undefined → Optional chaining oder Guard

---

## 🔴🔴🔴 Regel 9: MANDATORY VALIDATION (NEU - KRITISCH!)

### 9.1 🚨 NACH JEDER ÄNDERUNG VALIDIEREN

**Ich (Claude) MUSS nach JEDER Code-Änderung diese Checks durchführen:**

| Check | Befehl | Wann |
|-------|--------|------|
| **TypeScript** | `cd apps/mobile && npx tsc --noEmit` | Nach JEDER Änderung |
| **Bundling** | `cd apps/mobile && npx expo start --web` | Nach Import-Änderungen |

### 9.2 🚨 Monorepo-Validierung

**KRITISCH:** In Monorepos MUSS die Validierung im RICHTIGEN Verzeichnis erfolgen!

```bash
# ❌ FALSCH - vom Root
npx tsc --noEmit

# ✅ RICHTIG - im App-Verzeichnis
cd apps/mobile && npx tsc --noEmit
```

### 9.3 🚨 Bundling-Check Workflow

**Nach Import/Export-Änderungen:**
1. Metro stoppen falls läuft
2. `cd apps/mobile && npx expo start --web`
3. Warten auf "Web Bundling complete" oder Fehler
4. Bei Fehler → STOPP, analysieren, fixen
5. Erst bei Erfolg → Änderung abgeschlossen

### 9.4 Bei Fehler: STOPP-Protokoll

1. **STOPP** - Keine weiteren Änderungen
2. **ANALYSIERE** - Root Cause verstehen (nicht raten!)
3. **RECHERCHIERE** - Docs/Issues wenn unklar
4. **FIXE** - Mit Verständnis der Ursache
5. **VALIDIERE** - Alle Checks erneut
6. **ERST DANN** - Weitermachen

### 9.5 🚨 Package-Installation bei neuen Imports (KRITISCH!)

**PFLICHT:** Bei JEDEM neuen `import ... from 'package-name'`

1. **SOFORT prüfen:** Ist `package-name` in `package.json`?
2. **Falls NEIN:** Installation VOR weiteren Änderungen
   ```bash
   # Für Expo-Packages:
   cd apps/mobile && npx expo install package-name

   # Für andere Packages:
   cd apps/mobile && npm install package-name
   ```
3. **Bundling-Check:** IMMER nach neuen Imports
   ```bash
   cd apps/mobile && npx expo start --web
   # Warte auf "Web Bundling complete" oder Fehler
   ```

**WARUM DIESE REGEL EXISTIERT (Lessons Learned):**
- `npx tsc --noEmit` prüft KEINE Package-Auflösung!
- TypeScript findet ggf. Types aus anderen Workspace-Packages
- Bundler (Metro/Webpack) brauchen die echten Packages
- **Fehler-Beispiel:** `expo-image` Import hinzugefügt, aber Package nie installiert → Bundling schlägt fehl

**MERKE:**
- TypeScript-Check ≠ Bundling-Check
- BEIDE Checks sind bei Import-Änderungen erforderlich!

### 9.6 🚨 Expo-Package Installation

**IMMER `npx expo install` statt `npm install` für:**
- Packages mit `expo-` Prefix (z.B. `expo-image`, `expo-haptics`)
- React Native Core-Packages (`react-native-*`)
- Packages die native Module haben

**Warum:** Expo CLI installiert automatisch kompatible Versionen

```bash
# ❌ FALSCH
npm install expo-image

# ✅ RICHTIG
npx expo install expo-image
```

### 9.7 🚨 Phase-Abschluss Checklist (PFLICHT!)

**BEVOR eine Phase als "abgeschlossen" markiert wird:**

- [ ] `cd apps/mobile && npx tsc --noEmit` → 0 Fehler
- [ ] `cd apps/mobile && npx expo start --web` → Bundling erfolgreich
- [ ] Alle neuen Imports haben Package in `package.json`
- [ ] Metro/Webpack zeigt keine "Unable to resolve" Fehler
- [ ] App startet ohne Runtime-Errors (kurzer Test)

**NIEMALS eine Phase als "abgeschlossen" markieren wenn:**
- Bundling fehlschlägt
- Packages fehlen
- Runtime-Errors auftreten

---

## 🤖 Regel 10: LLM-Kontextmanagement (KRITISCH!)

### 10.1 🚨 TOKEN-LIMIT WARNUNG

**ACHTUNG:** Nach ~150.000 Tokens beginnen LLMs zu halluzinieren und Fehler zu machen!

| Kontext | Limit | Aktion |
|---------|-------|--------|
| Planungs-Chat | 4 Planungen max | Neuen Chat öffnen |
| Coding-Chat | ~150.000 Tokens | STOPP, neuen Chat öffnen |
| Kontext-Verlust | ~200.000 Tokens | Halluzinationen wahrscheinlich |

### 10.2 Neuer Chat Workflow

**Bei Erreichen des Token-Limits:**
1. Aktuellen Stand in MASTER-ORCHESTRATOR.md dokumentieren
2. Migrations-Tracker in der Phase-Datei aktualisieren
3. Zusammenfassung für nächsten Chat erstellen
4. Neuen Chat mit relevanten Dateien starten

---

## ✅ Quick Checklist (UNIVERSELL)

**Vor Commit:**
- `npx tsc --noEmit` (🔴 MUSS 0 FEHLER HABEN!)
- Ungenutzter Code entfernt
- Mobile-First
- Edge Cases bedacht
- Max 700 lines/file

**🤖 LLM-Kontext:** Nach 150k Tokens → NEUEN CHAT öffnen!

---

## 🧪 Regel 11: Browser-Testing mit Agent-Browser

### 11.1 Wann Browser-Testing nutzen

**PFLICHT bei folgenden Situationen:**
- Nach Implementierung von UI-Features
- Nach Änderungen an Formularen/Inputs
- Nach Änderungen an Navigation/Routing
- Wenn User explizit "teste das im Browser" sagt

**Referenz:** `shared-docs/agents/agent-browser/SKILL.md`

### 11.2 Browser-Testing Workflow

**Standard-Workflow:**
1. Expo Web starten: `cd apps/mobile && npx expo start --web`
2. Port notieren (meist 8081 oder nächster freier)
3. Browser öffnen: `agent-browser open http://localhost:PORT`
4. Snapshot machen: `agent-browser snapshot -i`
5. Mit UI interagieren (click, fill, etc.)
6. Screenshot bei Fehler: `agent-browser screenshot error-NAME.png`

### 11.3 Bei Port-Konflikten

**Problem:** Expo sagt "Port 8081 belegt"

**Lösung:**
```bash
# Option A: Anderen Port nutzen
npx expo start --web --port 8082

# Option B: Prozess auf Port beenden
npx kill-port 8081
```

### 11.4 Bei langen Wartezeiten

**Wenn Bundling > 60s dauert:**
1. Status prüfen (nicht ewig warten)
2. Cache clearen: `npx expo start --clear`
3. Bei Endlos-Loop: Task abbrechen, User informieren

### 11.5 Browser-Testing für Authentication

**Problem:** App erfordert Login

**Lösung:** Test-Account System nutzen (siehe Regel 12)

---

## 🔐 Regel 12: Test-Account System (Development-Only)

### 12.1 Wann Test-Account nutzen

**PFLICHT bei Browser-Testing von Auth-geschützten Features:**
- TrainingTab testen
- Dashboard testen
- Alle Features die Login erfordern

### 12.2 Test-Login Workflow

1. Prüfe ob App in Development läuft
2. Navigiere zu Login-Screen
3. Klicke "🧪 Dev: Test-Login" Button (nur sichtbar wenn `__DEV__`)
4. Warte auf Dashboard-Navigation
5. Fahre mit Tests fort

```bash
# Agent-Browser Workflow
agent-browser open http://localhost:8081
agent-browser snapshot -i
agent-browser click @test-login-btn  # ref des Test-Login Buttons
agent-browser wait --url "**/dashboard"
agent-browser snapshot -i  # Validierung
```

### 12.3 Sicherheitsregeln (NIEMALS VERLETZEN!)

❌ **VERBOTEN:**
- Test-Account Features in Production-Builds
- Echte User-Credentials im Code
- Test-Account mit Admin-Rechten
- Test-Daten in Production-DB

✅ **PFLICHT:**
- `__DEV__` Check in Mobile-App
- `NODE_ENV=development` Check im Backend
- Isoliertes Test-Profil
- Klar markierte Test-UI-Elemente

### 12.4 Implementierung

**Backend:** `POST /api/dev/test-login`
- Nur wenn `NODE_ENV === 'development'`
- Gibt 404 in Production

**Mobile:** `DevTestLoginButton` Komponente
- Nur sichtbar wenn `__DEV__ === true`

**Planungs-Referenz:** `docs/migration/tasks/11-test-account-system.md`

---

## 🔗 Referenzen (nur bei Bedarf lesen)

### Framework-spezifisch

| Framework | Dokumentation |
|-----------|---------------|
| React Native/Expo | `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md` |
| Next.js | `shared-docs/skills/nextjs-rules/NEXTJS-RULES.md` |
| Capacitor | `shared-docs/performance/capacitor-performance-rules.md` |

### Themen-spezifisch (nur bei Problem lesen)

| Thema | Dokumentation |
|-------|---------------|
| useEffect vermeiden | `shared-docs/react-useEffect/not-needed.md` |
| CSS/Design-Patterns | `shared-docs/agents/global-rule-agent.md` |
| Performance Tab-Komponenten | `shared-docs/performance/tab-component-performance-antipattern.md` |
| Responsive Dialoge | `shared-docs/design/responsive-dialog-architecture.md` |
| Frontend-Modernisierung | `shared-docs/agents/shared-docs/modernize-frontend.md` |
| Browser-Testing | `shared-docs/agents/agent-browser/SKILL.md` |
| Liquid Glass Design | `shared-docs/design/liquid-glass-guide.md` |

**Regel:** Diese Docs NICHT pauschal lesen - nur wenn das spezifische Thema relevant ist.
