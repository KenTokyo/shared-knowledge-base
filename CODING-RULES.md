# 🎯 Coding Rules & Development Guidelines

**Zweck:** Diese Datei enthält alle essentiellen Regeln für konsistente, performante und wartbare Code-Entwicklung. Sie vereint Architektur, Best Practices und kritische Anti-Patterns.

---

## 📋 Workflow & Arbeitsweise

### Vor dem Start
- **Vorhaben präsentieren:** Formatiert mit Icons, klare Struktur
- **Größere Aufgaben:** Plan in `docs/[feature]/tasks/[datum]-[feature]-plan.md` erstellen
- **Code-Reuse prüfen:** ERST nach existierenden Funktionen/Components suchen
  - `Grep` nach ähnlicher Funktionalität
  - Bestehende Patterns wiederverwenden statt neu erfinden
  - Unnötige Duplikation vermeiden
- **Testing:** Nur `npx tsc --noEmit` verwenden (❌ kein `npm run dev/build`)
  - Schneller Check ohne Build-Overhead
  - Findet Type-Errors zuverlässig

### Kritisches Denken (Edge Cases)
Proaktiv an Szenarien denken: Extrem-Fälle, falsches User-Verhalten, Performance-Probleme, Concurrent Access, Browser/Device-Unterschiede, Security, UX-Issues.

### Nach Abschluss
- **Plan aktualisieren:** Phase als ✅ markieren, kurz dokumentieren was/warum
  - Was wurde implementiert?
  - Warum diese Lösung gewählt?
  - Welche Edge-Cases wurden berücksichtigt?
- **Dokumentation erweitern:** `docs/[feature]/[feature]-overview.md` bei großen Änderungen
  - Neue Components dokumentieren
  - Architektur-Änderungen festhalten
  - Breaking Changes highlighten
- **Motivierende Zusammenfassung:** Icons, exakte Dateipfade, abgeschlossene Phase nennen
  - User zeigen was erreicht wurde
  - Nächste Schritte vorschlagen

---

## 🏗️ Architektur & Dateistruktur

### 🚨 WICHTIGSTE REGEL: Component-Based Architecture (Rule 5.38)

**NIEMALS Komponenten innerhalb anderer Komponenten definieren!**

❌ **VERBOTEN:**
```tsx
const Parent = () => {
  const NestedComponent = () => <div>Bad</div>; // ❌ NIEMALS!
  return <NestedComponent />;
};
```

**Warum?** Performance-Killer (jedes Render neu erstellt) + State-Verlust + Unmöglich zu testen

✅ **RICHTIG:** Jede Komponente in separater Datei
```tsx
// File: NestedComponent.tsx
export const NestedComponent = () => <div>Good</div>;

// File: Parent.tsx
import { NestedComponent } from './NestedComponent';
const Parent = () => <NestedComponent />;
```

### Component Organization (Section-Based)

**Max 400 lines per file** - Split in helpers/services wenn größer

#### ✅ The Right Way: Section-Based Structure
```
app/feature/[param]/
├── (mainSection)/
│   ├── (subSection)/
│   │   ├── AktionButton.tsx
│   │   └── KonfigPanel.tsx
│   ├── MainSection.tsx          ← Section orchestrator
│   └── (otherSubSection)/
│       └── DataCard.tsx
└── page.tsx
```

#### ❌ Anti-Pattern: Flat "components" Junk Drawer
```
app/chat/
├── page.tsx
└── components/             ← ❌ VERMEIDEN
    ├── AiChatDialog.tsx    ← Keine Struktur, nicht skalierbar
    ├── ChatHeader.tsx
    └── ... (20+ files chaos)
```

### Component Naming Convention

**Button-Text = File-Name:** "Speichern" button → `SpeichernButton.tsx`

**Component Types:**
```
ComponentName[Type].tsx:
- Section.tsx    → Orchestrates UI area (ReviewSection.tsx)
- Panel.tsx      → Input/config interface (EinstellungenPanel.tsx)
- Dialog.tsx     → Modal/overlay (BestätigenDialog.tsx)
- Button.tsx     → Interactive trigger (SpeichernButton.tsx)
- Card.tsx       → Reusable content block (ProductCard.tsx)
- Item.tsx       → List/grid element (MenuItem.tsx)
```

**Sprach-Konvention:**
- 🇩🇪 **DEUTSCH (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **ENGLISCH (Technical):** Section, Card, Item, Layout → `ReviewSection.tsx`

---

## 🚀 Next.js App Router Rules

### 1. Server vs Client Components
- **Default:** Server Components (kein `"use client"`)
- **"use client" nur für:** `useState`, `useEffect`, event listeners, browser APIs
- **Platzierung:** An der "leaf" des Component Tree, nicht in Root Layouts
- **Pattern:** Server Components als `children` an Client Components übergeben

### 2. Data Fetching
- ✅ **DO:** Direct fetching in Server Components mit `async/await`
- ✅ **DO:** Parallel fetching mit `Promise.all` (verhindert waterfalls)
- ✅ **DO:** `use()` Hook Pattern für Client Components + Suspense
- ❌ **DON'T:** `useEffect` für initial data fetching (slow, waterfalls)
- ❌ **DON'T:** Unnecessary API routes für simple data retrieval

**Best Practice - `use()` Hook Pattern:**
```tsx
// Server Component
const dataPromise = fetchData() // Nicht awaiten!
return <ClientComponent dataPromise={dataPromise} />

// Client Component
"use client"
import { use } from 'react'
function ClientComponent({ dataPromise }) {
  const data = use(dataPromise) // Resolve in Client
  return <div>{data}</div>
}
```

### 3. Data Mutations
- **Server Actions:** Alle Mutations (forms, updates, deletions)
- **UI Updates:** `revalidatePath('/')` oder `revalidateTag('tag')` nur bei geeigneten Fällen
- **Security:** ⚠️ IMMER User-Input validieren + Session mit `getCurrentProfile()` prüfen

### 4. Loading & Rendering
- **Suspense:** `loading.tsx` für Route-Level, `<Suspense>` für Component-Level
- **Re-trigger Suspense:** Key prop nutzen: `<Suspense key={query}>`
- **Static-First:** Statische UI (Header, Navigation) AUSSERHALB Suspense (0ms render)
- **Hydration:** Server und Client initial UI müssen identisch sein

---

## ⚛️ React Best Practices

### State & Props
- **Immutable State:** Functional updates: `setState(prev => ...)`
- **List Keys:** Stable, unique `key` prop für `.map()` items
- **State vs Ref:** `useState` = re-render, `useRef` = no re-render (DOM, interval IDs)

### Performance
- **Memoization:** `useMemo` (expensive calculations), `useCallback` (functions as props), `React.memo` (components)
- **UI Blocking:** Expensive computations in `useMemo` oder web worker auslagern

### Effects & Lifecycle
- **Cleanup:** IMMER cleanup function bei subscriptions/timers/listeners
- **Dependency Array:** Accurate dependencies, `[]` = mount only, none = every render
- **Avoid Unnecessary Effects:** Derive from props/state during render wenn möglich

### Error Handling
- **Error Boundaries:** Wrap critical trees, catch rendering errors, show fallback

### Component Communication
**Pattern-Auswahl:**
- **Parent↔Child:** Props down, Callbacks up (Standard)
- **2-3 Levels:** Lifting State Up (State im gemeinsamen Parent)
- **3+ Levels:** Context API (vermeidet Props-Drilling)

**Anti-Patterns:**
- ❌ Props-Drilling >3 Levels (unlesbar, schwer zu refactoren)
- ❌ Context für lokalen State (Overkill, Performance-Impact)
- ❌ Duplizierter State in Kindern (Single Source of Truth!)

**Referenz:** `shared-docs/react-core-communication-patterns.md`

---

## 🎬 Design Patterns & Anti-Patterns

### Tab Components Performance
**Problem:** Jeder Tab macht eigenen Fetch → 1000ms+ Ladezeit bei Tab-Wechsel
**Lösung:** Parent fetcht alle Daten, Props an Tabs weitergeben
- ❌ **Anti-Pattern:** `useEffect(() => { fetch() }, [])` in jedem Tab
- ✅ **Pattern:** Parent fetcht, Tabs sind "dumb" Presenter
- **Keys:** NIEMALS flüchtige Keys (`Math.random()` im Render) → Remounts + Fokusverlust
- **Referenz:** `shared-docs/performance/tab-component-performance-antipattern.md`

### Responsive Dialogs
**Controller Pattern:** Separate Components für Desktop/Mobile
- `[Feature]Dialog.tsx` - Desktop-Version
- `Mobile[Feature]Dialog.tsx` - Mobile-Version
- `[Feature]DialogController.tsx` - Logic + Device-Detection
**Warum:** Bessere UX als `hidden md:block`, keine doppelten Renders
**Referenz:** `shared-docs/design/responsive-dialog-architecture.md`

### Animated Loading States
**Static-First:** Kritische UI (Header) instant (0ms), dynamic content progressiv
**Staggered Animations:** Unterschiedliche delays für smooth reveal
- Header: Sofort sichtbar (kein Suspense)
- Main Content: `<Suspense>` mit Skeleton
- Cards/Items: FadeContent mit `delay={i * 50}` für Stagger-Effect
**Referenz:** `shared-docs/refactoring-docs/patterns/animated-loading-states.md`

### Multi-Level Data Fetching
**3 Levels:** Page (critical), Section (important), Component (detailed)
**Cascading Loading:** Critical data instant, heavy data progressiv
- **Level 1 (Page):** User-Profile, Auth-State → 0-100ms
- **Level 2 (Section):** Liste, erste 20 Items → 100-500ms mit Suspense
- **Level 3 (Component):** Details on-demand → Lazy-Loading
**Referenz:** `shared-docs/refactoring-docs/patterns/multi-level-data-fetching.md`

---

## 🚀 Network Performance Rules (CRITICAL)

### 🔴 Rule 5.30: Client-Side Fetch Anti-Pattern
🚨 **KRITISCH:** Client-Components dürfen NICHT initial Data-Fetching via `useEffect` durchführen!
- **Problem:** `useEffect` triggert bei jedem Re-Render → Request-Spam (20-100+ Requests beim Init)
- **Lösung:** Server-Side Pre-Fetch + Props-Pattern ODER `use()` Hook + Suspense
- **Trigger:** Wenn `useEffect(() => { fetch(...) }, [deps])` in Client-Component → STOP

### 🔴 Rule 5.31: Waterfall-Fetching Prevention
🚨 **KRITISCH:** Unabhängige Fetches MÜSSEN parallel laufen!
- **Problem:** Sequential `await` → 3x länger (450ms statt 150ms)
- **Lösung:** `Promise.all([fetch1(), fetch2(), fetch3()])` für unabhängige Daten
- **Trigger:** Wenn mehrere `await` ohne Dependency → `Promise.all()` nutzen

### 🔴 Rule 5.32: Mandatory Request-Deduplizierung
🚨 **KRITISCH:** Identische Fetches MÜSSEN dedupliziert werden!
- **Problem:** 2+ Components fetchen gleiche Daten → Doppelte DB-Queries
- **Lösung Server-Side:** React `cache()` wrapper für alle Finders/Actions
- **Lösung Client-Side:** Singleton-Pattern für Polling/Subscriptions
- **Trigger:** Wenn gleiche Fetch-Logic in mehreren Components → Deduplizierung

### 🔴 Rule 5.33: Polling Cleanup Enforcement
🚨 **KRITISCH:** Jeder `useEffect` mit Timers/Subscriptions MUSS Cleanup-Function haben!
- **Problem:** `setInterval`/`setTimeout` läuft nach Unmount weiter → Memory-Leak + Ghost-Requests
- **Lösung:** `return () => clearInterval(id)` in useEffect
- **Trigger:** Wenn `setInterval`/`setTimeout`/`addEventListener` → IMMER Cleanup

### 🔴 Rule 5.34: Multiple Component Instance Prevention
🚨 **KRITISCH:** Responsive-UI darf NICHT 2 identische Components mit eigenem Fetching parallel rendern!
- **Problem:** Desktop+Mobile Components → Doppeltes Fetching (2x DB-Queries, 2x Polling)
- **Lösung 1:** Conditional Rendering (nur 1 Component rendert)
- **Lösung 2:** Singleton-Service (beide Components teilen sich 1 Fetch-Instance)
- **Trigger:** Wenn `<MobileComponent />` + `<DesktopComponent />` beide fetchen

### 🔴 Rule 5.39: N+1 Query Prevention (Batch-Loading Pattern)
🚨 **KRITISCH:** Nested Queries in Loops MÜSSEN durch Batch-Loading ersetzt werden!
- **Problem:** `for (const item of items) { await getDetails(item.id) }` → 20 Items = 41 Queries
- **Lösung:** Batch-Loading mit JOINs oder `inArray(itemIds)` → 1-3 Queries statt 41 (-92% Reduktion)
- **Trigger:** Wenn `for`/`map` Loop + `await` für Sub-Daten → STOP → Batch implementieren
- **Anwendbar:** Notizen+Tags, Products+Reviews, Plans+Days, Messages+Users

### 🔴 Rule 5.40: Cache Invalidation Strategy (Stale Data Prevention)
🚨 **KRITISCH:** Jede Caching-Implementierung MUSS eine klare Invalidation-Strategie haben!
- **Problem:** Caching ohne Invalidation → User sieht stale Data nach Updates
- **Lösung:** TTL basierend auf Volatilität (Static: 1h, Live: 30s) + Manual Invalidation
- **Decision-Tree:** CREATE → Invalidate Lists | UPDATE → Invalidate Item+Lists | DELETE → Invalidate ALL
- **Trigger:** Bei `cache()` oder `unstable_cache()` → IMMER Invalidation-Strategie definieren

### 🔴 Rule 5.42: Progressive Data Loading Pattern (Initial Load Optimization)
🚨 **KRITISCH:** Alle Daten auf einmal laden = schlechte UX! Implementiere 3-Level Loading!
- **Problem:** `Promise.all([allData])` → User wartet 7s auf ALLES, nur erste 10 Items sichtbar
- **Lösung:** Level 1 (Critical 0-500ms, KEIN Suspense) → Level 2 (Important, MIT Suspense) → Level 3 (Lazy on-demand)
- **Trigger:** Bei Initial Load >2s → Mental-Check: "Was braucht User in ersten 500ms?"
- **Pattern:** First-Page only (10-20 items) + Pagination/Infinite-Scroll + Images `loading="lazy"` (-85% perceived load)

---

## 🚨 Kritische Anti-Patterns (MUST AVOID)

### 🔴 Rule 5.8: Proactive Implementation Analysis
Vor Code-Implementierung: Mental-Analyse durchführen!
- **Physics Check:** Ist das überhaupt möglich? (z.B. CSS-Limitations, Browser-APIs)
- **Side-Effects:** Was wird dadurch noch beeinflusst?
- **Edge-Cases:** Extreme Inputs, leere Daten, Maximum-Werte
- **Alternativen:** Gibt es bessere/einfachere Lösungen?
- **Machbarkeit:** Wenn Limitationen → Alternative vorschlagen, nicht blind implementieren

### 🔴 Rule 5.9: Context Analysis Before Changes
Vor jeder Änderung die letzten 3-4 Tasks analysieren!
- **Warum:** Bereits gelöste Probleme NICHT rückgängig machen
- **Checklist:**
  - Was wurde in letzten Tasks geändert?
  - Warum wurden diese Änderungen gemacht?
  - Würde meine Änderung diese Lösungen brechen?
  - Gibt es einen besseren Weg, der beide Requirements erfüllt?

### 🔴 Rule 5.10: MANDATORY Legacy Code Removal
Nach jeder Änderung SOFORT ungenutzten Code entfernen:
- Ungenutzte Functions/Components/Imports
- Ungenutzte Variables/Constants/CSS-Klassen
- Ungenutzte Hook-Aufrufe (`useState`, `useMemo`, etc.)

### 🔴 Rule 5.17: Dialog-EventListener-Pattern (LAYOUT-CRASH-PREVENTION)
Dialoge in Layout-kritischen Komponenten (Navbar, Header) MÜSSEN über `useEffect + window.addEventListener` geöffnet werden.
- **Problem:** Direkt rendern (auch mit `open={false}`) kann Layout-Collapse verursachen
- **Lösung:** `useEffect(() => { window.addEventListener('openDialog', handler) }, [])`

### 🔴 Rule 5.20: Scroll Height Dependency
`overflow-auto` braucht definierte Höhe! `flex-1` allein reicht nicht.
- ❌ **Anti-Pattern:** `flex-1 overflow-auto` ohne Height-Parent
- ✅ **Fix:** `h-[75vh]` oder `isDialog`-Props für Context-Switching

### 🔴 Rule 5.21: will-change Font-Killer
Niemals `will-change: transform, opacity`! Zerstört Font-Rendering (blurry text). Browser optimieren automatisch.

### 🔴 Rule 5.22: Single Loading Pipeline
Für kritische Daten (Entry, User-Profile) MUSS eine zentrale Loading-Pipeline existieren.
- **Problem:** Verschiedene UI-Entry-Points mit unterschiedlichen Loading-Logiken
- **Lösung:** Eine zentrale Fetch-Funktion, alle Components nutzen gleichen Data-Flow

### 🔴 Rule 5.23: Mobile-First Space Efficiency
📱 Alle UI-Komponenten MÜSSEN Mobile-First designed werden:
- Maximale Space-Efficiency (kein exzessives Scrollen)
- Input-Felder nebeneinander in FlexRow wenn möglich
- Kleinere Schriftgrößen, geringere Abstände, weiterhin modernes Design

### 🔴 Rule 5.24: Page-Level Data-Separation
Page-Components ohne Data-Fetching für Header/Navigation.
- **Pattern:** Header als pure HTML, Data-Logic in `MainContent` mit Suspense
- **Warum:** Header rendert instant (0ms), Data lädt progressiv

### 🔴 Rule 5.25: Custom List-Styles & Prose.css Interaktion
**Problem:** TailwindCSS Prose-Plugin + Custom Styles können native HTML-Elemente überschreiben
- **Lösung:** Spezifische Selektoren nutzen, Prose-Styles überschreiben wenn nötig

### 🔴 Rule 5.26: Direct Action Principle
Action-Buttons führen ihre Funktion DIREKT aus (1 Klick = 1 Action).
- Multi-Step Components brauchen `initialView/initialStep` Prop
- ❌ Keine Zwischenschritte für simple Actions

### 🔴 Rule 5.27: Consistent Dialog Design
Dialoge: `max-h-[85vh]`, `sm:max-w-[700px]`.
- Multi-Step über State-Switching (kein nested Dialog)
- Zurück-Button bei Sub-Views
- Main-Container bleibt, Content wechselt

### 🔴 Rule 5.29: FadeContent Dialog Conditional Rendering (RENDER-LOOP PREVENTION)
🚨 **KRITISCH:** FadeContent Components MÜSSEN conditional gerendert werden bei Dialog/Modal-Wrapping!
- **Problem:** FadeContent rendert permanent → Dialog rendert mit `open={false}` → Re-Render-Loop
- ❌ **Anti-Pattern:** `<FadeContent><Dialog isOpen={isOpen} /></FadeContent>` (Permanent)
- ✅ **Correct:** `{isOpen && <FadeContent><Dialog /></FadeContent>}` (Conditional)
- **Symptoms:** Excessive Re-Rendering, Performance-Degradation

### 🔴 Rule 5.35: State-Changes During Active UI
State-Updates, die Component-Remount triggern, NICHT während aktiver UI-Interaktion. Defer bis User navigiert. Mental-Check: "Triggert setState einen Key-Prop oder wichtigen Dependency?"

### 🔴 Rule 5.37: Component Usage Chain Verification
Vor Implementierung: Grep nach Verwendung der Ziel-Komponente im Feature-Path. Call-Chain tracken (UI → Wrapper → Proxy → Target). Richtige Komponente identifizieren, bevor Code geschrieben wird.

### 🔴 Rule 5.38: MANDATORY Component-Based Architecture
🚨 React-Komponenten NIEMALS innerhalb anderer Komponenten definieren! (siehe Zeile 27-49 für Details)

**Problem:** Nested Component Definitions verursachen:
- ❌ Komplette Remounts bei jedem Parent-Render (Performance-Killer)
- ❌ State-Verlust und unnötige Re-Initialisierung
- ❌ Unmögliche Wiederverwendung und Testing
- ❌ React DevTools Chaos und schwieriges Debugging

**Lösung:** Jede Komponente in eigener Datei (siehe Beispiel oben)

**📂 Dateistruktur-Regel:**
Jede Komponente MUSS in einer eigenen Datei sein, außer:
- Sehr kleine Helper-Komponenten (<5 Zeilen, keine State-Logik)
- Komponenten, die AUSSERHALB der Parent-Component definiert sind (Top-Level)

**⚡ REGEL-TRIGGER:**
- Wenn du `const ComponentName = () => { ... }` INNERHALB einer anderen Komponente siehst → SOFORT refactoren
- Vor Code-Review: Grep nach `= ({.*}) => {` innerhalb von Function Components

---

### 🔴 Rule 5.41: State-Persistence Decision Pattern (UNIVERSAL PERFORMANCE RULE)
🚨 **KRITISCH:** Vor jedem `useEffect` der State → Server synchronisiert, entscheide das richtige Pattern!

**Core-Problem:** `useEffect(() => { saveToServer(state) }, [state])` kann zu Performance-Killer werden

**Decision-Tree:**

1️⃣ **Frage: Wie oft ändert sich der State?**
   - **Kontinuierlich (>10x/Sekunde)?** → Pattern A: Explicit Save
   - **Frequent (1-10x/Sekunde)?** → Pattern B: Debounced Save
   - **Occasional (<1x/Sekunde)?** → Pattern C: Throttled Save
   - **On-Demand (User-Click)?** → Pattern D: Immediate Save

2️⃣ **Frage: Ist Data-Loss kritisch?**
   - **JA** (Payment, Auth) → Pattern A: Explicit Save ONLY
   - **NEIN** (Draft, UI-State) → Debounced/Throttled OK

3️⃣ **Frage: Ist die User-Experience wichtiger als Persistence?**
   - **JA** (Smooth-Dragging) → Optimistic-UI + Debounced-Background-Save
   - **NEIN** (Forms) → Blocking-Save mit Loading-State

**Pattern A: Explicit Save (Kontinuierliche Interaktionen)**
- **Use-Cases:** Drag & Drop, Pan/Zoom, Slider, Color-Picker, Canvas-Drawing
- **Frequency:** 60+ State-Updates/Sekunde
- **Problem:** Auto-Save würde 60+ Requests/Sekunde triggern
- **Lösung:** Save bei Action-Ende (`handleDragEnd`, `onSliderCommitted`)

**Pattern B: Debounced Save (Frequent-Typing)**
- **Use-Cases:** Text-Input, Search-Bar, Filter-Input, Rich-Text-Editor
- **Frequency:** 1-10 State-Updates/Sekunde
- **Problem:** Auto-Save bei jedem Keystroke → Unnecessary-Requests
- **Lösung:** `useMemo(() => debounce((value) => saveToServer(value), 1000), [])`

**Pattern C: Throttled Save (Occasional-Updates)**
- **Use-Cases:** Scroll-Position, Window-Resize, Live-Chart-Updates
- **Frequency:** <1 State-Update/Sekunde (aber viele Events)
- **Problem:** Zu viele Events, aber State ändert sich seltener
- **Lösung:** `useMemo(() => throttle((pos) => saveToServer(pos), 300), [])`

**Pattern D: Immediate Save (On-Demand)**
- **Use-Cases:** Submit-Button, Delete-Action, Create-Action
- **Frequency:** Einzelne User-Clicks
- **Lösung:** Direct `onClick={handleSubmit}` mit Loading-State

**Mental-Checklist (CODE-REVIEW):**
Wenn du `useEffect(() => { serverAction(state) }, [state])` siehst:
1. ✅ Wie oft ändert sich `state`? (1x/Click, 10x/s, 60x/s?)
2. ✅ Ist das Pattern angemessen? (Immediate, Debounced, Throttled, Explicit?)
3. ✅ Gibt es eine Cleanup-Function? (`debounce.cancel()`, `clearInterval()`)
4. ✅ Ist Data-Loss akzeptabel? (Falls Device offline/Browser-Crash während Debounce)

**Red-Flags:**
- ⚠️ `useEffect` + `serverAction` ohne Debouncing/Throttling
- ⚠️ State ändert sich >10x/Sekunde (Drag, Slider, Drawing)
- ⚠️ Keine Cleanup-Function bei Debounce/Throttle
- ⚠️ State enthält Viewport/Camera/UI-State (sollte nicht persistiert werden)

---

## 🛠️ Implementation Guidelines

### Database (Actions & Finders)
- **Actions** (`db/actions/`): Alle mutations, MUSS `"use server"` haben
- **Finders** (`db/finders/`): Alle queries, MUSS `"use server"` haben
- **Auth:** `getCurrentProfile()` aus `profile-finder` statt auth-Methoden
- **User vs Profile:** User nur für Auth, Profile für alles andere

### API Response Format
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### State Management
- **Server State:** Next.js caching + Server Components
- **Form State:** React Hook Form
- **Optimistic Updates:** `useState` (nicht `useOptimistic`)
- **Theme/Language:** React Context providers

### Error Handling
- Toast notifications für User-facing errors
- Error Boundaries für component crashes
- Input validation inline (keine libraries)

### Frontend Animation
- **Expand/Collapse:** CSS Grid `grid-rows-[1fr]` (expanded) / `grid-rows-[0fr]` (collapsed) mit `transition-all duration-300` + `overflow-hidden` für smooth height transitions
- FadeContent-Komponente einbauen (siehe `shared-docs\refactoring-docs\prompts\universal-fadeContent-refactoring-prompt.md`)
---

## 🎨 Design System

### Theme System
- **CSS Custom Properties:** Dynamic colors (`--primary`, `--accent`)
- **Glassmorphism:** `glass-card`, `backdrop-blur-sm/md`
- **Gradients:** Three-color gradients (primary-dark → primary → primary-light)

### Component Classes
- **Cards:** `glass-card`, `bg-card/50 backdrop-blur-sm`
- **Buttons:** `bg-gradient-primary`, `hover:glow-primary`
- **Borders:** `border-primary/10` to `border-primary/20`
- **Text Gradients:** `text-gradient-primary`, `bg-clip-text text-transparent`

### Style Files
- `app/globals.css` - CSS variables, utilities
- `styles/themes/*.css` - Theme-specific colors
- `styles/themes/effects.css` - Glassmorphism, glows

---

## 📚 Documentation System

**Structure:** `docs/OVERVIEW.md` (Master) → `docs/[feature]/[feature]-overview.md` → `docs/[feature]/features/[sub-feature].md` → `docs/[feature]/tasks/[datum]-[task].md`

**Update-Rules:** Feature-Overview bei großen Änderungen, Task-History auf "abgeschlossen" setzen.

---

## ✅ Quick Checklist

Vor Commit: `npx tsc --noEmit`, ungenutzter Code entfernt, Mobile-First, Edge Cases, Server Actions `"use server"`, Suspense boundaries, Static UI außerhalb Suspense, max 400 lines/file.

---

**🔗 Weiterführende Docs:** `shared-docs/performance/`, `shared-docs/design/`, `shared-docs/postmortem/`, `shared-docs/ux/`

---

### Revalidate-Sicherheitsregel
❌ `revalidatePath` bei Autosave/hochfrequent (→ Remount-Loop). ✅ Nur bei Create/Delete/expliziten Actions.
**Autosave:** Server schreibt ohne Revalidate, Client updated lokalen State + Cache.

### Loading-Feedback Kurzregeln
**Nicht gecached:** `isLoading=true` + Skeleton für Bereich. **Nach Erfolg:** FadeContent (200-400ms).
**Gecached:** Kein Skeleton, UI direkt updaten.
**Scope:** Nur wechselnde Section, Header/Nav nie blockieren. Stabile Keys!

