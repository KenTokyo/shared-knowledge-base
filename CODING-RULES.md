# 🎯 Coding Rules & Development Guidelines

**Zweck:** Essentielle Regeln für konsistente, performante und wartbare Code-Entwicklung.

---

## Regel 1: Workflow & Arbeitsweise

### 1.1 Vor dem Start
- **Vorhaben präsentieren:** Formatiert mit Icons, klare Struktur
- **Größere Aufgaben:** Plan in `docs/[feature]/tasks/[datum]-[feature]-plan.md` erstellen
- **Code-Reuse prüfen:** ERST nach existierenden Funktionen/Components mit `Grep` suchen
- **Testing:** Nur `npx tsc --noEmit` verwenden (❌ kein `npm run dev/build`)

### 1.2 🚨 Planungs-Regel: Kein Code in Planungsdokumenten
**KRITISCH:** Planungsdokumente dürfen NIEMALS vollständigen Code enthalten!
- ✅ **ERLAUBT:** Konzepte, Architektur, Dateipfade, API-Signaturen (max 3-5 Zeilen Pseudo-Code)
- ❌ **VERBOTEN:** Vollständige Implementierungen, Code-Blöcke >10 Zeilen
- **Ziel:** Max 500-800 Zeilen pro Plan (WAS und WARUM, nicht WIE im Detail)

### 1.3 Kritisches Denken (Edge Cases)
Proaktiv denken: Extrem-Fälle, falsches User-Verhalten, Performance-Probleme, Concurrent Access, Browser/Device-Unterschiede, Security, UX-Issues.

### 1.4 Nach Abschluss
- **Plan aktualisieren:** Phase als ✅ markieren, kurz dokumentieren (was/warum, Edge-Cases)
- **Dokumentation erweitern:** `docs/[feature]/[feature]-overview.md` bei großen Änderungen
- **Motivierende Zusammenfassung:** Icons, exakte Dateipfade, abgeschlossene Phase nennen

---

## Regel 2: Architektur & Dateistruktur

### 2.1 🚨 Component-Based Architecture (WICHTIGSTE REGEL)
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!**

❌ **VERBOTEN:** `const NestedComponent = () => <div>Bad</div>` innerhalb Parent-Component

**Warum?** Performance-Killer (jedes Render neu erstellt) + State-Verlust + Unmöglich zu testen

✅ **RICHTIG:** Jede Komponente in separater Datei

### 2.2 Component Organization (Section-Based)
**Max 400 lines per file** - Split in helpers/services wenn größer

✅ **Section-Based Structure:**
```
app/feature/[param]/
├── (mainSection)/
│   ├── (subSection)/
│   │   ├── AktionButton.tsx
│   │   └── KonfigPanel.tsx
│   └── MainSection.tsx          ← Section orchestrator
└── page.tsx
```

❌ **Anti-Pattern:** Flat "components" Junk Drawer (keine Struktur, nicht skalierbar)

### 2.3 Component Naming Convention
**Button-Text = File-Name:** "Speichern" button → `SpeichernButton.tsx`

**Component Types:** `Section.tsx` (orchestrates), `Panel.tsx` (input/config), `Dialog.tsx` (modal), `Button.tsx` (trigger), `Card.tsx` (reusable block), `Item.tsx` (list element)

**Sprach-Konvention:**
- 🇩🇪 **DEUTSCH (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **ENGLISCH (Technical):** Section, Card, Item → `ReviewSection.tsx`

---

## Regel 3: Next.js App Router

### 3.1 Server vs Client Components
- **Default:** Server Components (kein `"use client"`)
- **"use client" nur für:** `useState`, `useEffect`, event listeners, browser APIs
- **Platzierung:** An der "leaf" des Component Tree, nicht in Root Layouts
- **Pattern:** Server Components als `children` an Client Components übergeben

### 3.2 Data Fetching
- ✅ **DO:** Direct fetching in Server Components mit `async/await`
- ✅ **DO:** Parallel fetching mit `Promise.all` (verhindert waterfalls)
- ✅ **DO:** `use()` Hook Pattern für Client Components + Suspense
- ❌ **DON'T:** `useEffect` für initial data fetching (slow, waterfalls)
- ❌ **DON'T:** Unnecessary API routes für simple data retrieval

**Best Practice - `use()` Hook Pattern:**
Server Component fetcht Daten als Promise (nicht awaiten!), Client Component resolved mit `use(dataPromise)`.

### 3.3 Data Mutations
- **Server Actions:** Alle Mutations (forms, updates, deletions)
- **UI Updates:** `revalidatePath('/')` oder `revalidateTag('tag')` nur bei geeigneten Fällen
- **Security:** ⚠️ IMMER User-Input validieren + Session mit `getCurrentProfile()` prüfen

### 3.4 Loading & Rendering
- **Suspense:** `loading.tsx` für Route-Level, `<Suspense>` für Component-Level
- **Re-trigger Suspense:** Key prop nutzen: `<Suspense key={query}>`
- **Static-First:** Statische UI (Header, Navigation) AUSSERHALB Suspense (0ms render)
- **Hydration:** Server und Client initial UI müssen identisch sein

### 3.5 🔴 Client Provider Wrapper Pattern (MANDATORY)
**Problem:** RootLayout (Server Component) darf NICHT direkt 5+ Client Components importieren → Client Manifest Build-Fehler

**Lösung:** Alle Client-Provider in ONE Client-Component (`ClientProviders.tsx`) wrappen, diese dann in RootLayout importieren.

**Warum?** Next.js 14 braucht klare Server/Client Boundary für korrektes Manifest-Building.

---

## Regel 4: React Best Practices

### 4.1 State & Props
- **Immutable State:** Functional updates: `setState(prev => ...)`
- **List Keys:** Stable, unique `key` prop für `.map()` items
- **State vs Ref:** `useState` = re-render, `useRef` = no re-render

### 4.2 Performance
- **Memoization:** `useMemo` (expensive calculations), `useCallback` (functions as props), `React.memo` (components)
- **UI Blocking:** Expensive computations in `useMemo` oder web worker auslagern

### 4.3 Effects & Lifecycle
- **Cleanup:** IMMER cleanup function bei subscriptions/timers/listeners
- **Dependency Array:** Accurate dependencies, `[]` = mount only, none = every render
- **Avoid Unnecessary Effects:** Derive from props/state during render wenn möglich

### 4.4 Error Handling
- **Error Boundaries:** Wrap critical trees, catch rendering errors, show fallback

### 4.5 Component Communication
**Pattern-Auswahl:**
- **Parent↔Child:** Props down, Callbacks up (Standard)
- **2-3 Levels:** Lifting State Up (State im gemeinsamen Parent)
- **3+ Levels:** Context API (vermeidet Props-Drilling)

**Anti-Patterns:** ❌ Props-Drilling >3 Levels, ❌ Context für lokalen State, ❌ Duplizierter State

**Referenz:** `shared-docs/react-core-communication-patterns.md`

---

## Regel 5: Design Patterns

### 5.1 Tab Components Performance
**Problem:** Jeder Tab macht eigenen Fetch → 1000ms+ Ladezeit bei Tab-Wechsel

**Lösung:** Parent fetcht alle Daten, Props an Tabs weitergeben

**Keys:** NIEMALS flüchtige Keys (`Math.random()` im Render) → Remounts + Fokusverlust

**Referenz:** `shared-docs/performance/tab-component-performance-antipattern.md`

### 5.2 Responsive Dialogs
**Controller Pattern:** Separate Components für Desktop/Mobile
- `[Feature]Dialog.tsx` - Desktop
- `Mobile[Feature]Dialog.tsx` - Mobile
- `[Feature]DialogController.tsx` - Logic + Device-Detection

**Warum:** Bessere UX als `hidden md:block`, keine doppelten Renders

**Referenz:** `shared-docs/design/responsive-dialog-architecture.md`

### 5.3 Animated Loading States
**Static-First:** Kritische UI (Header) instant (0ms), dynamic content progressiv

**Staggered Animations:** Unterschiedliche delays für smooth reveal (Header sofort, Main mit Suspense, Cards mit `delay={i * 50}`)

**Referenz:** `shared-docs/refactoring-docs/patterns/animated-loading-states.md`

### 5.4 Multi-Level Data Fetching
**3 Levels:** Page (critical 0-100ms), Section (important 100-500ms mit Suspense), Component (detailed, lazy on-demand)

**Cascading Loading:** Critical data instant, heavy data progressiv

**Referenz:** `shared-docs/refactoring-docs/patterns/multi-level-data-fetching.md`

---

## Regel 6: Network Performance (CRITICAL)

### 6.1 🔴 Client-Side Fetch Anti-Pattern
🚨 **KRITISCH:** Client-Components dürfen NICHT initial Data-Fetching via `useEffect` durchführen!

**Problem:** `useEffect` triggert bei jedem Re-Render → Request-Spam (20-100+ Requests beim Init)

**Lösung:** Server-Side Pre-Fetch + Props-Pattern ODER `use()` Hook + Suspense

### 6.2 🔴 Waterfall-Fetching Prevention
🚨 **KRITISCH:** Unabhängige Fetches MÜSSEN parallel laufen!

**Problem:** Sequential `await` → 3x länger (450ms statt 150ms)

**Lösung:** `Promise.all([fetch1(), fetch2(), fetch3()])` für unabhängige Daten

### 6.3 🔴 Request-Deduplizierung
🚨 **KRITISCH:** Identische Fetches MÜSSEN dedupliziert werden!

**Problem:** 2+ Components fetchen gleiche Daten → Doppelte DB-Queries

**Lösung:** React `cache()` wrapper für alle Finders/Actions (Server), Singleton-Pattern (Client)

### 6.4 🔴 Polling Cleanup
🚨 **KRITISCH:** Jeder `useEffect` mit Timers/Subscriptions MUSS Cleanup-Function haben!

**Problem:** `setInterval`/`setTimeout` läuft nach Unmount weiter → Memory-Leak + Ghost-Requests

**Lösung:** `return () => clearInterval(id)` in useEffect

### 6.5 🔴 Multiple Component Instance Prevention
🚨 **KRITISCH:** Responsive-UI darf NICHT 2 identische Components mit eigenem Fetching parallel rendern!

**Problem:** Desktop+Mobile Components → Doppeltes Fetching (2x DB-Queries, 2x Polling)

**Lösung:** Conditional Rendering (nur 1 Component) ODER Singleton-Service (beide teilen 1 Fetch)

### 6.6 🔴 N+1 Query Prevention (Batch-Loading)
🚨 **KRITISCH:** Nested Queries in Loops MÜSSEN durch Batch-Loading ersetzt werden!

**Problem:** `for (const item of items) { await getDetails(item.id) }` → 20 Items = 41 Queries

**Lösung:** Batch-Loading mit JOINs oder `inArray(itemIds)` → 1-3 Queries statt 41 (-92% Reduktion)

### 6.7 🔴 Cache Invalidation Strategy
🚨 **KRITISCH:** Jede Caching-Implementierung MUSS eine klare Invalidation-Strategie haben!

**Problem:** Caching ohne Invalidation → User sieht stale Data nach Updates

**Lösung:** TTL basierend auf Volatilität (Static: 1h, Live: 30s) + Manual Invalidation

**Decision-Tree:** CREATE → Invalidate Lists | UPDATE → Invalidate Item+Lists | DELETE → Invalidate ALL

### 6.8 🔴 Progressive Data Loading Pattern
🚨 **KRITISCH:** Alle Daten auf einmal laden = schlechte UX! Implementiere 3-Level Loading!

**Problem:** `Promise.all([allData])` → User wartet 7s auf ALLES, nur erste 10 Items sichtbar

**Lösung:** Level 1 (Critical 0-500ms, KEIN Suspense) → Level 2 (Important, MIT Suspense) → Level 3 (Lazy on-demand)

**Pattern:** First-Page only (10-20 items) + Pagination/Infinite-Scroll + Images `loading="lazy"` (-85% perceived load)

---

## Regel 7: Kritische Anti-Patterns (MUST AVOID)

### 7.1 🔴 Proactive Implementation Analysis
Vor Code-Implementierung: Mental-Analyse durchführen!
- **Physics Check:** Ist das überhaupt möglich? (z.B. CSS-Limitations, Browser-APIs)
- **Side-Effects:** Was wird dadurch noch beeinflusst?
- **Edge-Cases:** Extreme Inputs, leere Daten, Maximum-Werte
- **Alternativen:** Gibt es bessere/einfachere Lösungen?

### 7.2 🔴 Context Analysis Before Changes
Vor jeder Änderung die letzten 3-4 Tasks analysieren!
- Was wurde in letzten Tasks geändert?
- Warum wurden diese Änderungen gemacht?
- Würde meine Änderung diese Lösungen brechen?

### 7.3 🔴 Legacy Code Removal
Nach jeder Änderung SOFORT ungenutzten Code entfernen: Ungenutzte Functions/Components/Imports/Variables/Hook-Aufrufe.

### 7.4 🔴 Dialog-EventListener-Pattern (Layout-Crash-Prevention)
Dialoge in Layout-kritischen Komponenten (Navbar, Header) MÜSSEN über `useEffect + window.addEventListener` geöffnet werden.

**Problem:** Direkt rendern (auch mit `open={false}`) kann Layout-Collapse verursachen

**Lösung:** `useEffect(() => { window.addEventListener('openDialog', handler) }, [])`

### 7.5 🔴 Scroll Height Dependency
`overflow-auto` braucht definierte Höhe! `flex-1` allein reicht nicht.

❌ **Anti-Pattern:** `flex-1 overflow-auto` ohne Height-Parent

✅ **Fix:** `h-[75vh]` oder `isDialog`-Props für Context-Switching

### 7.6 🔴 will-change Font-Killer
Niemals `will-change: transform, opacity`! Zerstört Font-Rendering (blurry text). Browser optimieren automatisch.

### 7.7 🔴 Single Loading Pipeline
Für kritische Daten (Entry, User-Profile) MUSS eine zentrale Loading-Pipeline existieren.

**Problem:** Verschiedene UI-Entry-Points mit unterschiedlichen Loading-Logiken

**Lösung:** Eine zentrale Fetch-Funktion, alle Components nutzen gleichen Data-Flow

### 7.8 🔴 Mobile-First Space Efficiency
📱 Alle UI-Komponenten MÜSSEN Mobile-First designed werden:
- Maximale Space-Efficiency (kein exzessives Scrollen)
- Input-Felder nebeneinander in FlexRow wenn möglich
- Kleinere Schriftgrößen, geringere Abstände, weiterhin modernes Design

### 7.9 🔴 Page-Level Data-Separation
Page-Components ohne Data-Fetching für Header/Navigation.

**Pattern:** Header als pure HTML, Data-Logic in `MainContent` mit Suspense

**Warum:** Header rendert instant (0ms), Data lädt progressiv

### 7.10 🔴 Custom List-Styles & Prose.css Interaktion
**Problem:** TailwindCSS Prose-Plugin + Custom Styles können native HTML-Elemente überschreiben

**Lösung:** Spezifische Selektoren nutzen, Prose-Styles überschreiben wenn nötig

### 7.11 🔴 Direct Action Principle
Action-Buttons führen ihre Funktion DIREKT aus (1 Klick = 1 Action).

Multi-Step Components brauchen `initialView/initialStep` Prop. ❌ Keine Zwischenschritte für simple Actions

### 7.12 🔴 Consistent Dialog Design
Dialoge: `max-h-[85vh]`, `sm:max-w-[700px]`.
- Multi-Step über State-Switching (kein nested Dialog)
- Zurück-Button bei Sub-Views
- Main-Container bleibt, Content wechselt

### 7.13 🔴 FadeContent Dialog Conditional Rendering
🚨 **KRITISCH:** FadeContent Components MÜSSEN conditional gerendert werden bei Dialog/Modal-Wrapping!

**Problem:** FadeContent rendert permanent → Dialog rendert mit `open={false}` → Re-Render-Loop

❌ **Anti-Pattern:** `<FadeContent><Dialog isOpen={isOpen} /></FadeContent>` (Permanent)

✅ **Correct:** `{isOpen && <FadeContent><Dialog /></FadeContent>}` (Conditional)

### 7.14 🔴 State-Changes During Active UI
State-Updates, die Component-Remount triggern, NICHT während aktiver UI-Interaktion. Defer bis User navigiert. Mental-Check: "Triggert setState einen Key-Prop oder wichtigen Dependency?"

### 7.15 🔴 Component Usage Chain Verification
Vor Implementierung: Grep nach Verwendung der Ziel-Komponente im Feature-Path. Call-Chain tracken (UI → Wrapper → Proxy → Target). Richtige Komponente identifizieren, bevor Code geschrieben wird.

### 7.16 🔴 CSS Transform Coordinate-Space Awareness
🚨 **KRITISCH:** Bei Pointer-Events auf CSS-transformierten Elementen liefert `getBoundingClientRect()` die Position des **bereits transformierten** Elements (inkl. translate/scale). Koordinaten-Umrechnung muss daher nur die **Inverse-Transform** anwenden, **nicht** die Original-Transform nochmal kompensieren (sonst doppelte Offset-Subtraktion). Mental-Check: "Hat mein Element oder dessen Parent die CSS-Transform?" → Parent = rect ist bereits verschoben, nur noch skalieren!

### 7.17 🔴 State-Persistence Decision Pattern
🚨 **KRITISCH:** Vor jedem `useEffect` der State → Server synchronisiert, entscheide das richtige Pattern!

**Core-Problem:** `useEffect(() => { saveToServer(state) }, [state])` kann zu Performance-Killer werden

**Decision-Tree:**

1️⃣ **Wie oft ändert sich der State?**
   - **Kontinuierlich (>10x/Sekunde)?** → Pattern A: Explicit Save
   - **Frequent (1-10x/Sekunde)?** → Pattern B: Debounced Save
   - **Occasional (<1x/Sekunde)?** → Pattern C: Throttled Save
   - **On-Demand (User-Click)?** → Pattern D: Immediate Save

2️⃣ **Ist Data-Loss kritisch?**
   - **JA** (Payment, Auth) → Pattern A: Explicit Save ONLY
   - **NEIN** (Draft, UI-State) → Debounced/Throttled OK

3️⃣ **Ist die User-Experience wichtiger als Persistence?**
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

---

## Regel 8: Implementation Guidelines

### 8.1 Database (Actions & Finders)
- **Actions** (`db/actions/`): Alle mutations, MUSS `"use server"` haben
- **Finders** (`db/finders/`): Alle queries, MUSS `"use server"` haben
- **Auth:** `getCurrentProfile()` aus `profile-finder` statt auth-Methoden
- **User vs Profile:** User nur für Auth, Profile für alles andere

### 8.2 API Response Format
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### 8.3 State Management
- **Server State:** Next.js caching + Server Components
- **Form State:** React Hook Form
- **Optimistic Updates:** `useState` (nicht `useOptimistic`)
- **Theme/Language:** React Context providers

### 8.4 Error Handling
- Toast notifications für User-facing errors
- Error Boundaries für component crashes
- Input validation inline (keine libraries)

### 8.5 Frontend Animation
- **Expand/Collapse:** CSS Grid `grid-rows-[1fr]` (expanded) / `grid-rows-[0fr]` (collapsed) mit `transition-all duration-300` + `overflow-hidden`
- FadeContent-Komponente einbauen (siehe `shared-docs\refactoring-docs\prompts\universal-fadeContent-refactoring-prompt.md`)

---

## Regel 9: Design System

### 9.1 Dark Mode Glassmorphism Design Pattern
**Tiefschwarze Hintergründe**, **Subtile Neon-Glows**, **Glassmorphism-Ränder**, **Inset-Highlights**, **Light-Mode-Kompatibilität**, **Gradient-Texte**

### 9.2 Theme System
- **CSS Custom Properties:** Dynamic colors (`--primary`, `--accent`)
- **Glassmorphism:** `glass-card`, `backdrop-blur-sm/md/2xl`
- **Gradients:** Three-color gradients (primary-dark → primary → primary-light)

### 9.3 Component Classes
- **Cards:** `glass-card`, `bg-card/50 backdrop-blur-sm`
- **Buttons:** `bg-gradient-primary`, `hover:glow-primary`
- **Borders:** `border-primary/10` to `border-primary/20`
- **Text Gradients:** `text-gradient-primary`, `bg-clip-text text-transparent`

### 9.4 Style Files
- `app/globals.css` - CSS variables, utilities
- `styles/themes/*.css` - Theme-specific colors
- `styles/themes/effects.css` - Glassmorphism, glows

---

## Regel 10: Documentation System

**Structure:** `docs/OVERVIEW.md` (Master) → `docs/[feature]/[feature]-overview.md` → `docs/[feature]/features/[sub-feature].md` → `docs/[feature]/tasks/[datum]-[task].md`

**Update-Rules:** Feature-Overview bei großen Änderungen, Task-History auf "abgeschlossen" setzen.

---

## Regel 11: Sonstige Kurzregeln

### 11.1 Revalidate-Sicherheitsregel
❌ `revalidatePath` bei Autosave/hochfrequent (→ Remount-Loop). ✅ Nur bei Create/Delete/expliziten Actions.

**Autosave:** Server schreibt ohne Revalidate, Client updated lokalen State + Cache.

### 11.2 Loading-Feedback
**Nicht gecached:** `isLoading=true` + Skeleton für Bereich. **Nach Erfolg:** FadeContent (200-400ms).

**Gecached:** Kein Skeleton, UI direkt updaten.

**Scope:** Nur wechselnde Section, Header/Nav nie blockieren. Stabile Keys!

### 11.3 CSS-Debug-Regel (Sizing)
Bei unerwarteten Button-/Tile-Größen zuerst die „Computed"-Werte in DevTools prüfen; wenn Varianten oder Flex-Layouts inflatieren, Größen mit Inline `width/height` (+ `min/max`) erzwingen und `flex-none` setzen, danach schrittweise zu Klassen/Varianten zurückführen.

### 11.4 🔴 Container-Child Size Verification
🚨 **KRITISCH:** Bei Height-Reduktion von Containern MÜSSEN Child-Elemente geprüft werden!

**Problem:** Container `h-8` (32px), aber Child-Button `py-1.5` + `text-xs` = 28-30px → Overflow

**Mental-Checklist:**
1. ✅ Container-Height reduziert? → Child-Padding prüfen!
2. ✅ Child-Padding zu groß? → Padding reduzieren (inline → später Klassen)
3. ✅ Touch-Targets Mobile? → Minimum 16px Height (iOS guideline)
4. ✅ Text-Size lesbar? → `text-xs` = 12px (Minimum für UI-Elements)

**Pattern:**
- Container: `h-8` (32px Mobile) → Child: `py-0.5` (4px total)
- Container: `h-10` (40px Desktop) → Child: `py-1` (8px total)

**Anwendung:** Tabs, Dropdown-Items, List-Items, Navbar-Links

**Beispiel (Follower-Tab Redesign):**
```tsx
// ❌ FEHLER: Container zu klein für Child-Padding
<TabsList className="h-8">  {/* 32px Container */}
  <TabsTrigger className="py-1.5">  {/* 28-30px Button → Overflow! */}
    Button
  </TabsTrigger>
</TabsList>

// ✅ RICHTIG: Child-Padding an Container angepasst
<TabsList className="h-8 sm:h-9">  {/* 32px Mobile, 36px Desktop */}
  <TabsTrigger className="py-0.5 sm:py-1">  {/* 20px Mobile, 24px Desktop → Passt! */}
    Button
  </TabsTrigger>
</TabsList>
```

### 11.5 🔴 Number Input Empty-State Handling

🚨 **KRITISCH:** HTML `<input type="number">` Felder dürfen NIEMALS `value={0}` haben, wenn `0` ein ungültiger Wert ist!

**Problem:**
- User löscht Input → `""` (String)
- Code konvertiert: `Number("") = 0`
- State: `value={0}`
- Browser-Quirk: Zeigt "0" + neu eingegebenen Wert → "02" statt "2"

**Lösung:**
```tsx
// ❌ FEHLER: Leerer String wird zu 0
<Input
  type="number"
  value={exercise.sets}  // 0 nach Löschen
  onChange={(e) => handleChange("sets", Number(e.target.value))}
/>

// ✅ RICHTIG: Leerer String bleibt leer
<Input
  type="number"
  value={exercise.sets === 0 ? "" : exercise.sets}
  onChange={(e) => {
    const value = e.target.value;
    const numValue = value === "" ? undefined : Number(value);
    handleChange("sets", numValue);
  }}
/>
```

**Pattern:**
1. **Value:** `value={field === 0 ? "" : field}` (zeigt leeres Input bei 0)
2. **onChange:** `value === "" ? undefined : Number(value)` (verhindert 0-Conversion)
3. **Validation:** Zod Schema validiert `undefined` → Error-Message

**Anwendung:** Alle Number Inputs mit `.min(1, ...)` Validation (Required Fields)

**Referenz:** `docs/dashboard/tasks/2025-10-26-training-input-validation-bugfix.md`

---

## ✅ Quick Checklist

Vor Commit: `npx tsc --noEmit`, ungenutzter Code entfernt, Mobile-First, Edge Cases, Server Actions `"use server"`, Suspense boundaries, Static UI außerhalb Suspense, max 400 lines/file.

---

**🔗 Weiterführende Docs:** `shared-docs/performance/`, `shared-docs/design/`, `shared-docs/postmortem/`, `shared-docs/ux/`
