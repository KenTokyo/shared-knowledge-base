# Global Coding Rules

This guide provides comprehensive coding rules for building robust, performant, and maintainable applications. It covers Next.js App Router, React best practices, and our custom design patterns.

---
## 0. Testing & Validation Rules

**Rule 0.1 (No Test Suites Required):**
- ❌ **DO NOT** create unit tests, integration tests, or E2E tests unless explicitly requested
- ❌ **DO NOT** use `npm run dev` or `npm run build` for validation
- ✅ **ALWAYS** use `npx tsc --noEmit` to check for TypeScript errors
- ✅ **ALWAYS** validate code logic through manual review and type safety
- Sei immer hochmotiviert, liefere schön formatierte motivierende Antworten mit Icons in Deutsch

**Rule 0.2 (Global-Only Rules):**
- ✅ **NUR** universell gültige Regeln hier aufnehmen
- ✅ Projekt-/Feature-spezifische Heuristiken und Bugs gehören in `docs/[feature]/...`
- ❌ Keine Canvas-, Diagramm- oder Feature-Detailregeln in den Global Rules

---
## 1. 🚀 Next.js App Router Rules

### 1.1. Component Architecture & Boundaries

*   **Rule 1.1.1 (Server vs. Client):** Components are **Server Components by default**. Only use `"use client"` for interactivity (`useState`, `useEffect`, event listeners).
*   **Rule 1.1.2 (Placement):** Place `"use client"` at the "leaf" of the component tree, not in root layouts.
*   **Rule 1.1.3 (Isolate Interactivity):** Extract interactive logic into its own Client Component.
*   **Rule 1.1.4 (Server as Children):** Pass Server Components as `children` to Client Components for data fetching on server.
*   **Rule 1.1.5 (Third-Party):** Wrap third-party components with client hooks in your own Client Component.

### 1.2. Data Fetching & Management

*   **Rule 1.2.1 (Direct Fetching):** Fetch data directly within Server Components using `async/await`.
*   **Rule 1.2.2 (Parallel Fetching):** Use `Promise.all` to prevent request waterfalls.
*   **Rule 1.2.3 (Automatic Caching):** Next.js caches `fetch` requests. For ORMs use `React.cache`.
*   **Rule 1.2.4 (Dynamic Routes):** Access via `params` prop. Use `useSearchParams` in Client Components.
*   **Rule 1.2.5 (`use()` Hook):** Start fetch on server (no `await`), pass promise to Client, consume with `use(promise)`.
*   **Rule 1.2.6 (Suspense):** Always wrap `use()` hook components in `<Suspense>` boundary.
*   **Rule 1.2.7 (No useEffect for Initial Data):** Don't use `useEffect` for initial data fetching.

### 1.3. Data Mutations & State Updates

*   **Rule 1.3.1 (Server Actions):** Use Server Actions for all data mutations.
*   **Rule 1.3.2 (UI Updates):**
    - ⚠️ **In Dialogen/Modals:** KEIN `revalidateTag()` → Optimistic UI Pattern!
    - ✅ **Auf Page-Ebene:** `revalidatePath('/')` oder `revalidateTag('tag')` ist OK
*   **Rule 1.3.3 (Security):** Always validate input + authenticate with `getCurrentProfile()`.
*   **Rule 1.3.4 (No Router Refresh in Modals):** In Dialog/Modal-Flows keine `revalidatePath()` oder `revalidateTag()` nutzen. Das triggert Router-Refresh und schließt Overlays. Stattdessen Optimistic UI + lokale Updates oder Events.
*   **Rule 1.3.5 (Cache-Tag-Komplettheit & Client-Cache-Sync):**
    - Mutations revalidieren **alle** betroffenen Tags (z. B. Schedule + Active-Plan).
    - Client-Caches (Memory/localStorage) müssen invalidiert oder versioniert werden.
    - Kurzbeispiel:
      ```typescript
      revalidateTag(`training-schedule-${profileId}`);
      revalidateTag(`active-plan-schedule-${profileId}`);
      // client: bump local cache version flag
      ```

### 1.4. 🚨 Optimistic UI Pattern (MANDATORY für Dialoge/Modals)

> **Vollständige Doku:** `shared-docs/CODING-RULES.md` → Regel 3.4

**Kurzversion:**
```typescript
// ✅ RICHTIG - Kein revalidateTag(), Daten zurückgeben
export async function createItemOptimistic(data) {
  const [created] = await db.insert(items).values(data).returning();
  return { success: true, data: created };
}

// Client: Instant Update
const result = await createItemOptimistic(data);
if (result.success) setItems(prev => [...prev, result.data]);
```

**Cross-Component:** `window.dispatchEvent(new CustomEvent('itemUpdated', { detail: result.data }))`

### 1.5. Rendering, Loading & Secrets

*   **Rule 1.5.1 (Suspense):** Use `loading.tsx` for route-level, `<Suspense>` for component-level.
*   **Rule 1.5.2 (Re-trigger):** Pass unique `key` prop to force Suspense re-trigger.
*   **Rule 1.5.3 (Static vs Dynamic):** Avoid `cookies()`, `headers()`, `searchParams` in Server Components.
*   **Rule 1.5.4 (Env Variables):** Only `NEXT_PUBLIC_*` exposed to browser.
*   **Rule 1.5.5 (Static-First):** Render static UI OUTSIDE Suspense boundaries (0ms render).

---

## 2. ⚛️ React Best Practices

### 2.1. State & Props Management

*   **Rule 2.1.1 (Immutable State):** Use functional updates `prev => ...` for safe updates.
*   **Rule 2.1.2 (List Keys):** Stable, unique `key` for `.map()` items.
*   **Rule 2.1.3 (State vs Ref):** `useState` = re-render, `useRef` = no re-render.

### 2.2. Performance Optimization

*   **Rule 2.2.1 (Memoization):** Prevent unnecessary re-renders to keep the UI fast and responsive.
    *   Wrap expensive, pure calculations in `useMemo`.
    *   Wrap function definitions passed as props to memoized child components in `useCallback`.
    *   Wrap components in `React.memo` to prevent them from re-rendering if their props have not changed.
*   **Rule 2.2.2 (UI Blocking):** Avoid running expensive, blocking computations directly in the render body. Offload them using `useMemo` or, for very heavy tasks, consider moving them to a web worker.
*   **Rule 2.2.3 (Capacitor WebView Animation Guard):** In Capacitor/Android WebView, avoid reveal animations that combine `transform`, `opacity`, or `filter` on large card grids. Bypass `ScrollReveal`/page fade wrappers when `isCapacitorEnvironment()` or `body.capacitor` is present to prevent render artifacts (missing icons/ghosting).
*   **Rule 2.2.4 (Triangle Confidence Floor):** Triangle-Erkennung darf eine eigene Mindest-Confidence nutzen und Angle/Edge-Score kombinieren, damit echte Dreiecke nicht am globalen Threshold scheitern.

### 2.3. Effects & Lifecycle

*   **Rule 2.3.1 (Effect Cleanup):** Always provide a cleanup function in `useEffect` when setting up subscriptions, timers, or event listeners. This is critical to prevent memory leaks.
*   **Rule 2.3.2 (Accurate Dependency Arrays):** Always provide an accurate dependency array for `useEffect`, `useCallback`, and `useMemo`.
    *   An empty array (`[]`) runs the effect only once on mount.
    *   Omitting the array causes the effect to run on *every single render*.
*   **Rule 2.3.3 (Avoid Unnecessary Effects):** Do not use `useEffect` for logic that can be derived directly from props or state during rendering. Also, avoid it for actions that can be handled directly within event handlers.
*   **Rule 2.3.4 (Stable Effect Callbacks):** Wenn ein `useEffect` einen Callback aus Props nutzt (z.B. `onSelectedTopicsChange`), muss der Callback stabil sein (`useCallback`) oder der Effekt braucht Guard-Checks. Sonst entstehen Render-Loops (z.B. Radix `setRef`).
*   **Rule 2.3.5 (Autoprocess User-Gate):** Auto-Detektoren dürfen nur nach echter User-Interaktion feuern; Content-Hydration oder programmatic Updates müssen geblockt werden, damit keine KI-Calls ohne User-Aktion starten.
*   **Rule 2.3.6 (Hold/Long-Press Ticking):** Zeitbasierte Gesten (Hold/Long-Press) dürfen nicht nur von `pointermove` abhängen. Starte einen RAF/Timer-Tick während `pointerdown`, stoppe ihn bei `pointerup/cancel`, und flush batched Punkte vor der Erkennung.

### 2.4. Error Handling

*   **Rule 2.4.1 (Error Boundaries):** Wrap critical trees, show fallback UI.
*   **Rule 2.4.2 (Error Logging):** Fehler mit Detail-Text sichtbar loggen.

### 2.5. Component Styling

*   **Rule 2.5.1 (Responsive Children):** Verify child components scale with parent resize.
*   **Rule 2.5.2 (Empty-State Centering):** Center within content width, not viewport.

---

## 3. 🗂️ Component & File Architecture

> **Vollständige Doku:** `shared-docs/CODING-RULES.md` → Regel 2

### 3.1. Core Philosophy
**Instant Navigation:** Find any component in **< 5 seconds** by looking at UI → File mirrors UI hierarchy.

### 3.2. Section-Based Architecture
```
app/feature/[param]/
├── (mainSection)/
│   ├── (subSection)/
│   │   └── AktionButton.tsx
│   └── MainSection.tsx
└── page.tsx
```

❌ **Anti-Pattern:** Flat "components" folder (Junk Drawer)

### 3.3. Naming Conventions
- `...Button.tsx`, `...Dialog.tsx`, `...Panel.tsx`, `...Section.tsx`
- 🇩🇪 **German (User-Facing):** `SpeichernButton.tsx`
- 🇺🇸 **English (Technical):** `ReviewSection.tsx`

---

## 4. 🎬 Advanced Design Patterns

### 4.1. Animated Loading States
> **➡️ `shared-docs/refactoring-docs/patterns/animated-loading-states.md`**

### 4.2. Multi-Level Data Fetching
> **➡️ `shared-docs/refactoring-docs/patterns/multi-level-data-fetching.md`**

### 4.3. High-Performance Tab Components
Tab-Komponenten dürfen **niemals eigene Daten-Fetches** durchführen. Parent fetcht, Props weitergeben.
> **➡️ `shared-docs/performance/tab-component-performance-antipattern.md`**

### 4.4. CSS & Positioning
*   **Rule 4.4.1 (Scoped Positioning):** Parent needs `position: relative` for contained `absolute` children.
*   **Rule 4.4.2 (Responsive Overlays):** Use `clamp()` for proportional sizing, not breakpoint toggles.

### 4.5. Animation useEffect Dependencies
*   **Rule 4.5.1:** Animation-Components die auf Prop-Changes reagieren → `useEffect` mit Dependency auf Props, nicht `[]`!
> **➡️ `shared-docs/postmortem/animation-useeffect-dependency-array-postmortem.md`**

### 4.6. 🎨 Design-Ästhetik: Liquid Glass

> **Vollständige Doku:** `shared-docs/design/liquid-glass-guide.md`

**Kern-Prinzipien:**
- **Tiefe:** `bg-black/40`, `backdrop-blur-xl`, `box-shadow` mit `inset`
- **Licht als Akzent:** `blur-[50px]` Punkt-Glows, Status-Farben
- **Muted Buttons:** `orange-500/20` statt `bg-orange-500`!
- **Light/Dark Mode:** Jedes Element MUSS beide Modi unterstützen

**❌ Anti-Patterns:**
- `bg-orange-500` (solid ohne Transparenz)
- `bg-white` für Tab-Selection im Dark Mode
- Buttons ohne Glow bei aktiven States

### 4.7. Animation Rules

*   **Rule 4.7.1 (No Framer Motion):** Nur CSS Transitions oder Tailwind Animations.
*   **Rule 4.7.2 (No Endless Animations):** Keine Endlos-Animationen außer Loading-Indikatoren.
*   **Rule 4.7.3 (CSS/Tailwind Only):**
    ```tsx
    /* ✅ ERLAUBT */
    className="transition-all duration-300 hover:scale-105"
    
    /* ❌ VERBOTEN */
    <motion.div animate={{ scale: 1.1 }} />
    ```
*   **Rule 4.7.4 (Interaction-Triggered):** Animationen durch User-Interaktion (`hover:`, `focus:`, `active:`).

---

## 5. 🚨 General Anti-Patterns & Edge Cases

### 5.1-5.8 General Rules
*   **SEO:** Critical content server-rendered
*   **CLS:** Reserve space with skeletons
*   **Animation Scope:** Animate content, not layout container
*   **Animation Staggering:** Staggered, not grouped reveal
*   **Data Fetching:** Don't fetch all at page level
*   **Data Batching:** Batch related queries
*   **Data Waterfall:** Avoid sequential loading

### 5.9 🔴 Context Analysis Before Changes
Vor jeder Änderung die letzten 3-4 Tasks analysieren. Niemals bereits gelöste Probleme rückgängig machen!

### 5.10 🔴 MANDATORY Legacy Code Removal
Nach jeder Änderung MUSS ungenutzter Code SOFORT entfernt werden!

### 5.11 Empty States
Always plan distinct "empty state" views for lists.

### 5.12-5.16 Debugging Rules
*   **5.12 Dialog-useEffect:** Bei "unsichtbaren" Loading-Indikatoren → useEffects prüfen
*   **5.13 Systematic Debug:** Layout → Context → Component → useEffects
*   **5.14 Race Conditions:** localStorage, multiple dependencies, async timing
*   **5.15 Reference Implementation:** Erst nach funktionierenden ähnlichen Implementierungen suchen
*   **5.16 Debug Infrastructure:** SOFORT Console-Logs für State-Changes implementieren

### 5.17 🔴 Dialog-EventListener-Pattern
Dialoge über useEffect-EventListener öffnen wenn Trigger in Layout-kritischen Komponenten (Navbar, Header).
> **➡️ `shared-docs/postmortem/open-dialogs-right-way-useffect-windowEventListener.md`**

### 5.18-5.20 Component Rules
*   **5.18 Universal Component Purity:** Universal-Components bleiben feature-agnostic
*   **5.19 Dialog Naming:** `[Feature]Dialog`, `[Feature]View`, `[Feature]Modal`
*   **5.20 Scroll Height:** `overflow-auto` braucht definierte Höhe! `h-[75vh]` oder `isDialog`-Props

### 5.21 🔴 will-change Font-Killer
Niemals `will-change: transform, opacity` permanent! Zerstört Font-Rendering.

### 5.22 Single Loading Pipeline
Kritische Daten-Loading durch zentrale Pipeline, keine unterschiedlichen Loading-Logiken.

### 5.23 📱 Mobile-First Space Efficiency
Alle UI-Komponenten Mobile-First mit maximaler Space-Efficiency. Kompakte Darstellung hat Priorität!

### 5.24 🔴 Page-Level Data-Separation
Page-Components: KEINE Data-Fetching-Logic die Header blockiert!
- Page.tsx = 90% HTML (instant)
- MainContent = 90% Data-Logic (async mit Suspense)

### 5.27-5.30 Spezielle Regeln
*   **5.27 Dashboard Entry Persistence:** Completed Items nicht ausblenden, Status-Filter bereitstellen
*   **5.28 Unique Default Names:** Client berechnet nächsten freien Namen vor Erstellen
*   **5.29 Single Source of Truth:** Link-Tabellen für alle Reads/Writes
*   **5.30 Toolbar Inside-Click Guard:** `data-*` Marker für Toolbar-Bereiche, keine Style-Klassen für Logik
*   **5.31 Production Persistence:** Dateibasierte SQLite-Datenbanken im Server-Betrieb dürfen **nie** auf ephemeral Container-Filesystem liegen. Immer persistentes Volume oder Remote-DB verwenden und Speicherort dokumentieren.
*   **5.32 Library Callback Contracts:** Library-Callbacks nie per Typ-Cast "glattziehen". Wenn Statement-Objekte erwartet werden, müssen `{ sql, params }` geliefert werden, sonst drohen Runtime-Fehler.

---

**🔗 Weiterführende Docs:**
- `shared-docs/CODING-RULES.md` - Haupt-Coding-Rules
- `shared-docs/design/liquid-glass-guide.md` - Liquid Glass Design
- `shared-docs/performance/capacitor-performance-rules.md` - Mobile Performance
- `shared-docs/database-testing-guide.md` - DB Testing
