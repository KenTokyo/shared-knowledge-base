# Global Coding Rules

This guide provides comprehensive coding rules for building robust, performant, and maintainable applications. It covers Next.js App Router, React best practices, and our custom design patterns.

---
## 0. Testing & Validation Rules

**Rule 0.1 (No Test Suites Required):**
- ❌ **DO NOT** create unit tests, integration tests, or E2E tests unless explicitly requested
- ❌ **DO NOT** use `npm run dev` or `npm run build` for validation
- ✅ **ALWAYS** use `npx tsc --noEmit` to check for TypeScript errors
- ✅ **ALWAYS** validate code logic through manual review and type safety
- 🎯 **Reason:** This project prioritizes rapid development and type safety over test coverage
- Sei immer hochmotiviert, liefere schön formatierte motivierende Antworten, wenn möglich sinnvolle Icons einbauen und antworte in Deutsch

**Rule 0.2 (Global-Only Rules):**
- ✅ **NUR** universell gültige Regeln hier aufnehmen
- ✅ Projekt-/Feature-spezifische Heuristiken und Bugs gehören in `docs/[feature]/...`
- ❌ Keine Canvas-, Diagramm- oder Feature-Detailregeln in den Global Rules

---
## 1. 🚀 Next.js App Router Rules

### 1.1. Component Architecture & Boundaries

*   **Rule 1.1.1 (Server vs. Client):** Components are **Server Components by default**. Only use the `"use client"` directive for components that require interactivity (e.g., `useState`, `useEffect`, event listeners).
*   **Rule 1.1.2 (Placement of `use client`):** Place the `"use client"` directive at the "leaf" of the component tree. Avoid placing it in root layouts or pages to maximize the benefits of Server Components.
*   **Rule 1.1.3 (Isolate Interactivity):** Extract interactive logic into its own Client Component instead of turning a large Server Component into a Client Component.
*   **Rule 1.1.4 (Server Components as Children):** You can pass Server Components as `children` to Client Components. This pattern allows you to keep data fetching and logic on the server while wrapping it with client-side state or context providers.
*   **Rule 1.1.5 (Third-Party Components):** Wrap third-party components that use client-side hooks (`useState`, etc.) in your own Client Component. If they access browser APIs, use `next/dynamic` with `ssr: false`.

### 1.2. Data Fetching & Management

*   **Rule 1.2.1 (Direct Fetching):** Fetch data directly within Server Components using `async/await`. Avoid creating unnecessary API routes (`Route Handlers`) for simple data retrieval.
*   **Rule 1.2.2 (Parallel Fetching):** Fetch independent data in parallel using `Promise.all` to prevent request waterfalls and improve load times.
*   **Rule 1.2.3 (Automatic Caching):** Next.js automatically caches `fetch` requests. Embrace multiple, co-located `fetch` calls for the same data; they won't result in duplicate requests. For ORMs or other libraries, use `React.cache`.
*   **Rule 1.2.4 (Dynamic Routes & Params):** Access dynamic route segments in page components via the `params` prop (e.g., `ProductPage({ params })`). To read URL search parameters without a server round-trip, use the `useSearchParams` hook in a Client Component.
*   **Rule 1.2.5 (`use()` Hook Pattern):** For interactive Client Components that need server-fetched data: Start the fetch on the server (without `await`) to get a promise. Pass this promise as a prop to the Client Component and consume it with `use(promise)`. This is the fastest way to load server data in interactive components.
*   **Rule 1.2.6 (Suspense Integration):** Always wrap components using the `use()` hook pattern in a `<Suspense>` boundary on the server. This provides an instant loading fallback and prevents the UI from being blocked.
*   **Rule 1.2.7 (Avoid `useEffect` for Initial Data):** Do not use `useEffect` to fetch initial data in Client Components. This pattern is slow, causes rendering waterfalls, and negates the benefits of server-side data fetching.
*   **Rule 1.2.8 (Distribute Promises with Context):** When multiple Client Components need the same server-fetched data, distribute the promise via a React Context Provider. This prevents redundant data fetches and keeps the code clean (no prop-drilling).
### 1.3. Data Mutations & State Updates

*   **Rule 1.3.1 (Use Server Actions):** Use Server Actions for all data mutations (e.g., form submissions, updates, deletions). They can be called from both Server and Client Components.
*   **Rule 1.3.2 (UI Updates after Mutation):** After a mutation in a Server Action:
    - ⚠️ **In Dialogen/Modals:** KEIN `revalidateTag()` verwenden! → Siehe **Rule 1.4 (Optimistic UI)**
    - ✅ **Auf Page-Ebene (ohne aktive Dialoge):** `revalidatePath('/')` oder `revalidateTag('tag')` ist OK
*   **Rule 1.3.3 (Security):** **Always** validate user input and authenticate the profile session with profile-finder within your Server Actions to prevent security vulnerabilities.

### 1.4. 🚨 Optimistic UI Pattern (MANDATORY for All Mutations in Dialogs/Modals)

> **⚡ PERFORMANCE-CRITICAL: Diese Regel ist STANDARD für alle CRUD-Operationen (Create, Read, Update, Delete) in modalen Kontexten!**

*   **Rule 1.4.1 (Problem - revalidateTag Causes Hard Refresh):** 🚨 **KRITISCH** - Server Actions die `revalidateTag()` oder `revalidatePath()` aufrufen, triggern einen **Next.js Router Cache Refresh**. Das führt zu:
    1. Server Components werden komplett neu gefetcht (3-10+ Sekunden!)
    2. React Client-States werden zurückgesetzt
    3. Dialoge "flashen" oder schließen sich
    4. Formulare verlieren ihren State
    5. UX ist **inakzeptabel** für den User

*   **Rule 1.4.2 (Solution - Optimistic UI ohne revalidateTag):** Für alle Mutations innerhalb von Dialogen/Modals/aktiven UI-Flows:
    ```
    ✅ RICHTIG (Optimistic UI Pattern):
    1. Server Action speichert in DB → gibt erstellte/geänderte Daten zurück
    2. Server Action ruft KEIN revalidateTag() auf
    3. Client erhält Response → updated lokalen State SOFORT
    4. UI ist instant aktualisiert (< 100ms)
    5. Optional: Cache-Invalidierung bei Dialog-Close oder Page-Navigation

    ❌ FALSCH (Standard Pattern mit Hard Refresh):
    1. Server Action speichert in DB
    2. Server Action ruft revalidateTag() auf → 5-10s Hard Refresh!
    3. Dialog flasht/schließt, User verliert Kontext
    ```

*   **Rule 1.4.3 (Implementation Pattern):** Für jede Server Action die in einem Dialog/Modal verwendet wird:
    ```typescript
    // ❌ STANDARD ACTION (verursacht Hard Refresh)
    export async function createItem(data: ItemData) {
      const result = await db.insert(items).values(data).returning();
      revalidateTag(`items-${data.userId}`);  // ← PROBLEM!
      return { success: true };
    }

    // ✅ OPTIMISTIC ACTION (kein Hard Refresh)
    export async function createItemOptimistic(data: ItemData) {
      const [created] = await db.insert(items).values(data).returning();
      // ⚡ KEIN revalidateTag() - Client handled optimistic update
      return { success: true, data: created };  // ← Daten zurückgeben!
    }

    // Client-Side Handler:
    const handleCreate = async (data) => {
      const result = await createItemOptimistic(data);
      if (result.success && result.data) {
        // ⚡ Lokaler State Update - INSTANT!
        setItems(prev => [...prev, result.data]);
        toast({ title: "Erstellt!" });
      }
    };
    ```

*   **Rule 1.4.4 (Event-Based Cross-Component Updates):** Wenn mehrere Komponenten den gleichen State anzeigen:
    ```typescript
    // Nach erfolgreicher Mutation:
    window.dispatchEvent(new CustomEvent('itemUpdated', {
      detail: { item: result.data, action: 'create' | 'update' | 'delete' }
    }));

    // In anderen Komponenten:
    useEffect(() => {
      const handler = (e: CustomEvent) => {
        if (e.detail.action === 'create') setItems(prev => [...prev, e.detail.item]);
        if (e.detail.action === 'delete') setItems(prev => prev.filter(i => i.id !== e.detail.item.id));
      };
      window.addEventListener('itemUpdated', handler);
      return () => window.removeEventListener('itemUpdated', handler);
    }, []);
    ```

*   **Rule 1.4.5 (Cache Invalidation Strategy):** Cache-Invalidierung erfolgt LAZY, nicht bei der Mutation:
    - Bei Dialog-Close: Optional `invalidateCache()` aufrufen
    - Bei Page-Navigation: Next.js invalidiert automatisch
    - Bei explizitem Refresh-Button: User-triggered invalidation
    - **NIEMALS** während aktiver UI-Interaktion invalidieren!

*   **Rule 1.4.6 (Wann Standard revalidateTag verwenden):** `revalidateTag()` ist NUR akzeptabel wenn:
    - Mutation erfolgt auf einer **Page-Ebene** (nicht in Dialog/Modal)
    - User erwartet explizit einen Page-Refresh (z.B. "Änderungen übernehmen" Button)
    - Keine aktiven Formulare/Dialoge offen sind
    - Performance-Impact akzeptabel ist (< 2 Sekunden)

### 1.5. Rendering, Loading & Secrets

*   **Rule 1.5.1 (Suspense Boundaries):** Use `loading.tsx` for route-level loading UI. For component-level loading with animations, refer to the dedicated design pattern guide.
*   **Rule 1.5.2 (Re-triggering Suspense):** To force a Suspense boundary to re-trigger when props change (e.g., a search query), pass a unique `key` prop to it (e.g., `<Suspense key={query}>`).
*   **Rule 1.5.3 (Static vs. Dynamic Rendering):** Avoid using dynamic functions like `cookies()`, `headers()`, or the `searchParams` prop in Server Components, as this opts the entire route into dynamic rendering.
*   **Rule 1.5.4 (Environment Variables):** Store secrets in `.env.local`. Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep API keys and database secrets server-only (no prefix).
*   **Rule 1.5.5 (Code Execution Guarantees):** Use the `server-only` package to guarantee that a module can only be imported by Server Components. Use `client-only` for modules with browser-only APIs.
*   **Rule 1.5.6 (Hydration):** Ensure the initial UI rendered on the server is identical to the client. For intentional differences (e.g., timestamps), use `useEffect` to update the value on the client or add the `suppressHydrationWarning` prop.
*   **Rule 1.5.7 (Redirects):** The `redirect()` function from `next/navigation` works by throwing an error. Do not place it inside a `try...catch` block, as the `catch` will prevent the redirect from working.
*   **Rule 1.5.8 (Static-First Loading):** Always render static UI elements (headers, titles, descriptions, navigation) OUTSIDE of Suspense boundaries. Only wrap dynamic, data-dependent content in Suspense. This ensures critical UI appears instantly (0ms) while data loads progressively.

---

## 2. ⚛️ React Best Practices

### 2.1. State & Props Management

*   **Rule 2.1.1 (Immutable State):** Always treat state as immutable. Use state setters (`setState` or `setMyState`) with functional updates (`prev => ...`) for safe and predictable updates, especially for batched or asynchronous operations.
*   **Rule 2.1.2 (List Keys):** Always provide a stable and unique `key` prop for each element when rendering lists with `.map()`. This is crucial for efficient rendering, state preservation, and avoiding bugs.
*   **Rule 2.1.3 (State vs. Ref):** Use `useState` for values that should trigger a re-render when they change. Use `useRef` for mutable values that *do not* require a re-render on change (e.g., managing focus, storing interval IDs, accessing DOM elements).

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

*   **Rule 2.4.1 (Error Boundaries):** Wrap critical component trees in an Error Boundary component. This catches rendering errors in child components, displays a fallback UI, and prevents the entire application from crashing.
*   **Rule 2.4.2 (Process Error Logging):** Fehler in manuellen KI‑Prozessen müssen immer als Log‑Eintrag mit Detail‑Text sichtbar sein (inkl. kurzer Hinweis wie „API‑Key prüfen“). Keine „stummen“ Fehler‑States ohne Log.

### 2.5. Component Styling

*   **Rule 2.5.1 (Responsive Child Components):** When resizing a parent container component, always verify that all child components, especially those with their own complex layout or fixed dimensions, scale or respond as expected. Apply flexible layout properties (e.g., `flex-grow`, `h-full`, `w-full`) to child components where necessary to ensure they utilize the newly available space.
*   **Rule 2.5.2 (Empty-State Centering in Sidebar Layouts):** Empty-States in Views mit Sidebars müssen die gleiche Content-Breiten-Logik wie der Editor verwenden (z. B. `contentMaxWidth`, `--app-sidebar-width`, `--notes-sidebar-width`) und innerhalb dieser Breite zentriert werden. Nicht relativ zum gesamten Viewport zentrieren, wenn Sidebars sichtbar sind.
 
---

## 3. 🗂️ Component & File Architecture

### 3.1. Core Philosophy: UI mirrors Folder Structure

Our primary goal is **instant navigation**: A developer should be able to find any component's code file in **under 5 seconds** just by looking at the UI. This is achieved by mirroring the UI's visual hierarchy directly in the file system.

### 3.2. The Blueprint: Section-Based Architecture

We organize features into `(sections)` which are Next.js Route Groups. This allows for logical grouping without affecting the URL.

#### ✅ **The Right Way: Clean, Section-Based Structure**

A feature's components are organized into sub-folders that represent distinct UI areas.

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
*   **Clarity:** It's immediately clear that `AktionButton.tsx` belongs to `(subSection)`.
*   **Scalability:** New related components are added to the correct section, preventing clutter.
*   **Ownership:** Teams can work on different sections with minimal merge conflicts.

#### ❌ **The Anti-Pattern: The "Junk Drawer" `components` Folder**

Avoid creating a single, flat `components` folder within a feature route. This quickly becomes a chaotic "junk drawer" where no one can find anything.

**Example of what NOT to do (based on a real-world messy `app/chat`):**
```
app/chat/
├── page.tsx
└── components/             <- ❌ ANTI-PATTERN
    ├── AiChatDialog.tsx
    ├── AiChatHistoryList.tsx
    ├── ChatHeader.tsx
    ├── ChatInput.tsx
    ├── MessageActions.tsx
    ├── SaveChatDialog.tsx
    └── ... (20+ more files)
```
*   **No Context:** Which dialog belongs to which button? Is `ChatHeader` for the main page or a modal?
*   **Unscalable:** With 20+ components, this folder is impossible to navigate.
*   **High Friction:** Finding a specific component requires searching or guesswork, wasting valuable time.

---

### Component Naming Conventions

#### 3.3.1. Component Types

Use suffixes to identify a component's purpose at a glance.

*   `...Button.tsx`: Interactive triggers (e.g., `SpeichernButton.tsx`).
*   `...Dialog.tsx`: Modal overlays (e.g., `BestätigenDialog.tsx`).
*   `...Panel.tsx`: Input or configuration interfaces (e.g., `EinstellungenPanel.tsx`).
*   `...Section.tsx`: The main orchestrator for a `(section)` folder.

#### 3.3.2. Language: German vs. English

The language depends on who the component is for: the **user** or the **developer**.

*   **🇩🇪 German (User-Facing):** If the user sees or interacts with it directly, name it in German.
*   **🇺🇸 English (Technical/Structural):** If it's a structural or technical container, name it in English.

---

## 4. 🎬 Advanced Design Patterns

This section provides high-level rules for our core design patterns. For detailed implementation, refer to the linked guides.

### 4.1. Animated Loading States

*   **Rule 4.1.1:** Our application uses a "Static-First" loading strategy to create a perception of instant performance. Critical UI (like headers) appears immediately, while dynamic content loads progressively with staggered animations.
*   **For a complete guide with code examples and implementation blueprints, see:**
*   **➡️ [`shared-docs/refactoring-docs/patterns/animated-loading-states.md`](shared-docs/refactoring-docs/patterns/animated-loading-states.md)**

### 4.2. Multi-Level Data Fetching

*   **Rule 4.2.1:** We use a cascading, multi-level data fetching pattern to optimize for perceived performance. Data is fetched at three levels: Page, Section, and Component. This ensures critical data appears instantly, while heavier data loads progressively.
*   **For a complete guide with code examples and implementation blueprints, see:**
*   **➡️ [`shared-docs/refactoring-docs/patterns/multi-level-data-fetching.md`](shared-docs/refactoring-docs/patterns/multi-level-data-fetching.md)**

### 4.3. High-Performance Tab Components

*   **Rule 4.3.1:** Tab-Komponenten dürfen **niemals eigene Daten-Fetches** durchführen, um Ladezeiten von >1000ms bei jedem Tab-Wechsel zu vermeiden. Das Data-Fetching ist die alleinige Verantwortung der **Parent-Komponente** (z.B. `NavbarClient`), und die Daten werden über Props weitergegeben.
*   **Für eine vollständige Anleitung mit Code-Beispielen und Anti-Patterns, siehe:**
*   **➡️ [`shared-docs/performance/tab-component-performance-antipattern.md`](shared-docs/performance/tab-component-performance-antipattern.md)**

### 4.5. CSS & Positioning

*   **Rule 4.5.1 (Scoped Positioning):** When implementing `position: absolute` or `position: fixed` for a component that should be contained within a specific parent layout (e.g., a toolbar for an editor), always ensure the parent container has `position: relative` to create a new stacking context. Avoid relying on viewport-based positioning for components that are logically part of a sub-layout.
*   **Rule 4.5.2 (Responsive Overlay Controls):** Overlay-Schalter (z. B. Dreh-Buttons auf Grids/Cells) müssen ihre Größe und Offsets an die Referenz-Größe des Parent-Elements koppeln (Clamp: min → ideal → max). Breakpoint-only Toggles (`w-8` → `sm:w-5`) führen zu inkonsistenten Hitboxes; verwende stattdessen `clamp()` für Button-Durchmesser und Offset, damit der Control auf allen Viewports proportional bleibt und keine Zellen überdeckt.

### 4.6. Animation Components & useEffect Dependencies

*   **Rule 4.6.1 (Animation useEffect Dependencies):** 🚨 **KRITISCH** - Animation-Components die auf Prop-Changes reagieren sollen MÜSSEN `useEffect` mit **Dependency auf relevante Props** nutzen, nicht mit leerem Array `[]`. Empty dependency array (`useEffect(() => {...}, [])`) läuft **NUR** beim ersten Mount, nicht bei Prop-Changes. Für zuverlässige Re-Mount-Animationen: Force-Remount-Pattern mit inkrementierendem `key` State nutzen.
*   **Reasoning:** `key`-basiertes Remounting allein ist unzuverlässig - React's Reconciliation entscheidet, ob Re-Mount nötig ist. Explizites Force-Remount via inkrementierenden State garantiert Animation bei jedem Prop-Change.
*   **Für vollständige Post-Mortem-Analyse, siehe:**
*   **➡️ [`shared-docs/postmortem/animation-useeffect-dependency-array-postmortem.md`](shared-docs/postmortem/animation-useeffect-dependency-array-postmortem.md)**

### 4.7. Design-Ästhetik: Liquid Glass

> 🎨 **WICHTIGE FRONTEND-RICHTUNG!** Dies beschreibt die visuelle Sprache der App - keine starren Regeln, sondern eine Ästhetik, eine Richtung.

#### 🚨 4.7.0 KRITISCH: Muted Glass Buttons (HÖCHSTE PRIORITÄT)

> **⚡ Diese Sektion adressiert das häufigste Design-Problem: Übersättigte, solid-farbige Buttons die NICHT zum Liquid Glass Look passen!**

**Das Problem:**
- ❌ Solid Orange Buttons (`bg-orange-500`) wirken billig und "flat"
- ❌ Solid Weiße Tab-Selections (`bg-white`) zerstören die Glasmorphism-Ästhetik
- ❌ Keine Glow-Effekte bei interaktiven Elementen
- ❌ Farben sind übersättigt statt "muted"

**Die Lösung - Muted Glass Button Patterns:**

##### Primary Action Buttons (z.B. "Initialize Quest Generation")
```tsx
/* ❌ VERBOTEN - Solid Orange */
className="bg-orange-500 text-white"

/* ✅ RICHTIG - Muted Glass mit Glow */
className="
  relative overflow-hidden
  bg-orange-500/20 dark:bg-orange-500/15
  border border-orange-500/30 dark:border-orange-500/25
  text-orange-400 dark:text-orange-300
  shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]
  hover:bg-orange-500/30 hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.5)]
  transition-all duration-200
"
```

##### Selected/Active State Buttons (z.B. "Auto (Recommended)")
```tsx
/* ❌ VERBOTEN - Solid Orange Selection */
className="bg-orange-500 text-white"

/* ✅ RICHTIG - Muted Glass Selection */
className="
  bg-orange-500/20 dark:bg-orange-500/15
  border border-orange-500/40
  text-orange-400 dark:text-orange-300
  shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_15px_-5px_rgba(249,115,22,0.4)]
"

/* Unselected State - Dunkel/Transparent */
className="
  bg-white/5 dark:bg-white/5
  border border-white/10
  text-white/60
  hover:bg-white/10 hover:text-white/80
"
```

##### Tab Selection States (z.B. "Custom Input" / "Notes" / "Learning Cards")
```tsx
/* ❌ VERBOTEN - Solid Weiß Selection */
className="bg-white text-black"

/* ✅ RICHTIG - Muted Glass Tab */
// Selected Tab
className="
  bg-white/10 dark:bg-white/8
  border border-white/20
  text-white
  shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
"

// Unselected Tab
className="
  bg-transparent
  border border-transparent
  text-white/50
  hover:text-white/70 hover:bg-white/5
"
```

##### Secondary/Ghost Buttons (z.B. "Initialize Connection")
```tsx
/* ✅ Ghost Button mit Glow */
className="
  bg-transparent
  border border-orange-500/30
  text-orange-400
  shadow-[0_0_15px_-8px_rgba(249,115,22,0.3)]
  hover:bg-orange-500/10 hover:shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]
"
```

**Farbpalette für Muted Buttons:**

| Zweck | Background | Border | Text | Glow |
|-------|------------|--------|------|------|
| Primary | `orange-500/20` | `orange-500/30` | `orange-400` | `rgba(249,115,22,0.4)` |
| Success | `green-500/20` | `green-500/30` | `green-400` | `rgba(34,197,94,0.4)` |
| Info | `blue-500/20` | `blue-500/30` | `blue-400` | `rgba(59,130,246,0.4)` |
| Danger | `red-500/20` | `red-500/30` | `red-400` | `rgba(239,68,68,0.4)` |
| Neutral | `white/5` | `white/10` | `white/60` | none |

**Light Mode Anpassungen:**
```tsx
/* Light Mode - weniger Transparenz, dunklere Texte */
className="
  bg-orange-500/10 dark:bg-orange-500/20
  border-orange-500/20 dark:border-orange-500/30
  text-orange-600 dark:text-orange-400
  shadow-[0_0_15px_-5px_rgba(249,115,22,0.25)] dark:shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]
"
```

**🚫 Anti-Patterns (NIEMALS verwenden):**
- ❌ `bg-orange-500` (solid color ohne Transparenz)
- ❌ `bg-white` für Tab-Selection im Dark Mode
- ❌ Buttons ohne Glow/Shadow bei aktiven States
- ❌ `text-white` auf `bg-orange-500` (flat look)
- ❌ Hover-States die nur Opacity ändern ohne Glow-Intensivierung

#### 4.7.1 Die Ästhetik in Worten

**Liquid Glass** ist ein hochmodernes, dunkles Design mit folgenden Charakteristiken:

**Tiefe & Räumlichkeit:**
Die UI wirkt wie schwebende Glasflächen über einem tiefen, dunklen Raum. Elemente haben Tiefe durch subtile Schatten, Transparenz und Blur-Effekte.
```css
/* Beispiel */
background: rgba(20, 20, 25, 0.4);
backdrop-filter: blur(24px) saturate(180%);
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1);
```

**Licht als Akzent:**
Licht kommt von aktiven Elementen - Icons, Status-Badges, Buttons. Dieses Licht ist weich, diffus und farbig.
```tsx
/* Beispiel: Punkt-Glow */
<div className="absolute inset-0 bg-orange-500/60 blur-[50px] rounded-full" />

/* Status-Glows (Tailwind) */
shadow-[0_0_20px_-5px_rgba(249,115,22,0.6)]  // Orange = Loading
shadow-[0_0_20px_-5px_rgba(34,197,94,0.6)]   // Grün = Success
```

**Versteckte Struktur:**
Im Hintergrund können subtile Texturen existieren - feine Grids, Grain, Dot-Patterns. Diese werden durch Licht sichtbar.
```tsx
/* Beispiel: Grid-Textur */
<div className="absolute inset-0 opacity-[0.05] pointer-events-none"
  style={{
    backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px),
                      linear-gradient(to bottom, #808080 1px, transparent 1px)`,
    backgroundSize: '24px 24px'
  }}
/>

/* Mask begrenzt Textur auf beleuchteten Bereich */
mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black 0%, transparent 100%);
```

**Glasmorphism:**
Oberflächen wirken wie gefrostetes Glas - halbtransparent mit Blur-Effekt, dezente Borders.
```css
/* Beispiel */
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(16px) saturate(180%);
```

#### 4.7.2 Light/Dark Mode (PFLICHT)

**Jedes UI-Element MUSS beide Modi unterstützen:**

| Eigenschaft | Dark Mode | Light Mode |
|-------------|-----------|------------|
| Background | `bg-black/40` | `bg-white/75` |
| Border | `border-white/8` | `border-black/6` |
| Text | `text-white/90` | `text-slate-900` |
| Glow Intensity | Stärker (`/60`) | Schwächer (`/30`) |
| Textur Opacity | `dark:opacity-[0.08]` | `opacity-[0.04]` |

```tsx
/* Tailwind Pattern */
className="bg-white/75 dark:bg-black/40 border-black/6 dark:border-white/8"
```

#### 4.7.3 Leitprinzipien

- **Dunkelheit als Leinwand:** Tiefe Hintergründe (`#030305`, `bg-black/80`) geben Lichteffekten Raum
- **Licht kommuniziert:** Farbiges Licht zeigt Status - `orange-500`=Aktion, `green-500`=Erfolg, `red-500`=Fehler, `blue-500`=Info
- **Subtilität:** Texturen `opacity-[0.03]` bis `opacity-[0.08]`, Borders `border-white/5` bis `border-white/10`
- **Glas-Effekte:** `backdrop-blur-xl`, `bg-black/40`, weiche `box-shadow` mit `inset` highlights
- **Struktur durch Licht:** `mask-image: radial-gradient(...)` begrenzt Textur auf beleuchtete Bereiche

#### 4.7.4 Gaming-Like Interaktionen

**Hover/Click Effekte die sich "lebendig" anfühlen:**
```tsx
/* Scale on Hover */
className="transition-transform hover:scale-[1.02] active:scale-[0.98]"

/* Glow Intensivierung on Hover */
className="shadow-[0_0_15px_...] hover:shadow-[0_0_25px_...]"
```

#### 4.7.5 Inspiration

Screenshots: `shared-docs/liquid-glass-*.png`
Detaillierter Command: `shared-docs/agents/commands/frontend-verbessern-3.md`

### 4.8. Animation Rules

*   **Rule 4.8.1 (No Framer Motion):** 🚨 **KRITISCH** - Keine Framer Motion Animationen! Nur CSS Transitions oder Tailwind Animations verwenden. Framer Motion erhöht Bundle-Size und ist für unsere Zwecke unnötig.

*   **Rule 4.8.2 (No Endless Animations):** 🚨 **KRITISCH** - Keine Endlos-Animationen außer bei Loading-Indikatoren! Verboten sind:
    - `animate-pulse` (außer bei Skeleton-Loadern)
    - `animate-spin` (außer bei Loading-Spinnern)
    - `animate-shimmer` / `animate-bounce` als Deko
    - Jede Animation die ewig läuft ohne User-Interaktion

*   **Rule 4.8.3 (CSS/Tailwind Only):** Erlaubte Animation-Methoden:
    ```tsx
    /* ✅ ERLAUBT: Tailwind Transitions */
    className="transition-all duration-300 hover:scale-105"

    /* ✅ ERLAUBT: CSS Keyframes (in globals.css) */
    @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }

    /* ❌ VERBOTEN: Framer Motion */
    <motion.div animate={{ scale: 1.1 }} />
    ```

*   **Rule 4.8.4 (Interaction-Triggered Only):** Animationen sollen durch User-Interaktion ausgelöst werden:
    - ✅ `hover:`, `focus:`, `active:` States
    - ✅ `data-[state=open]:` für Dialoge/Dropdowns
    - ✅ Einmalige Entry-Animationen beim Mount
    - ❌ Permanente Aufmerksamkeits-Animationen

## 5. 🚨 General Anti-Patterns & Edge Cases

*   **Rule 5.1 (SEO):** Ensure critical SEO content (like `h1`, `meta description`) is rendered on the server and is not dependent on client-side animation.
*   **Rule 5.2 (Layout Shift - CLS):** Reserve space for loading elements using skeletons or fixed-height containers to prevent content from jumping.
*   **Rule 5.3 (Slow APIs):** For components that might take too long, consider a timeout that shows a simplified fallback state.
*   **Rule 5.4 (Animation Scope):** Do not animate the main page layout container. Animate the *content inside* the layout.
*   **Rule 5.5 (Animation Staggering):** Do not apply the same delay to multiple elements. The goal is a staggered, not a grouped, reveal.
*   **Rule 5.6 (Data Fetching Scope):** Never fetch all data at page level - this blocks the entire page render.
*   **Rule 5.7 (Data Batching):** Don't create separate queries for each small piece of data - batch related queries.
*   **Rule 5.8 (Data Waterfall):** Avoid waterfall loading where Component A waits for Component B's data.
*   **Rule 5.9 (Context Analysis Before Code Changes):** Vor jeder Code-Änderung die letzten 3-4 Tasks/Prompts analysieren, um den Kontext zu verstehen. Niemals Änderungen vornehmen, die bereits gelöste Probleme rückgängig machen. Besonders kritisch bei UI/Shortcut-Systemen, wo kompakte Darstellung vs. volle Texte bereits optimiert wurden.
*   **Rule 5.10 (MANDATORY Legacy Code Removal):** 🚨 **KRITISCH** - Nach jeder Änderung MUSS ungenutzter Legacy-Code SOFORT entfernt werden! Das betrifft:
    - Ungenutzte Funktionen/Components
    - Ungenutzte Imports/Dependencies  
    - Ungenutzte Variables/Constants
    - Ungenutzte CSS-Klassen
    - Ungenutzte Hook-Aufrufe (useState, useMemo, etc.)
    **WARNUNG:** Legacy-Code führt zu Maintenance-Hell, Bundle-Bloat und verwirrt zukünftige Entwickler. NIEMALS ungenützten Code zurücklassen - das ist inakzeptabel!
*   **Rule 5.11 (Plan for Empty States):** When designing a UI that displays a list of items (e.g., API keys, notes, files), always explicitly plan and implement a distinct "empty state" view. This view should guide the user on how to add their first item. Do not simply show an empty list or a form without context.
*   **Rule 5.12 (Dialog-useEffect Anti-Pattern):** 🚨 **KRITISCH** - Beim Debuggen von "unsichtbaren" Loading-Indikatoren in Dialogs IMMER zuerst alle `useEffect`s prüfen, die Dialog-State (`onOpenChange`, `setIsOpen`, etc.) beeinflussen!
*   **Rule 5.13 (Systematic Debug Order):** 🎯 **DEBUGGING REIHENFOLGE** - Bei UI-State-Problemen systematisch von außen nach innen debuggen: Layout → Context → Component → useEffects. Niemals chaotisch zwischen Ebenen springen!
*   **Rule 5.14 (Race Condition Debug Protocol):** ⚡ **RACE CONDITIONS** - Bei State-Management-Problemen SOFORT prüfen: localStorage useEffects, multiple useEffect dependencies, async operation timing, Context Provider mounting order.
*   **Rule 5.15 (Reference Implementation First):** 📚 **PATTERN REUSE** - Bei neuen Features IMMER zuerst nach funktionierenden ähnlichen Implementierungen suchen (z.B. DiagrammContext für QuizContext). Bewährte Patterns übernehmen statt neu erfinden!
*   **Rule 5.16 (Debug System First):** 🔧 **DEBUG INFRASTRUCTURE** - Bei komplexen State-Features SOFORT umfassendes Debug-System implementieren: Console-Logs für alle State-Changes, Mount/Unmount Events, useEffect-Triggers. Debug-System vor Feature-Fixes!

*   **Rule 5.17 (Dialog-EventListener-Pattern - LAYOUT-CRASH-PREVENTION):** 🚨 **KRITISCH** - Dialoge MÜSSEN über useEffect-EventListener-Pattern geöffnet werden wenn der Trigger in Layout-kritischen Komponenten (Navbar, Header, Sidebar) liegt. Niemals Dialoge direkt in diesen Komponenten rendern - selbst bei `open={false}` können sie Layout-Kollapse verursachen. Siehe Post-Mortem zu mehr: `shared-docs\postmortem\open-dialogs-right-way-useffect-windowEventListener.md`

*   **Rule 5.18 (Universal Component Purity):** 🚨 **KRITISCH** - Universal-Components (Dialog, Modal, Input) bleiben feature-agnostic. Keine Feature-spezifische Logic oder conditional Rendering. Feature-Detection gehört in Wrapper-Components.

*   **Rule 5.19 (Dialog Naming Convention):** 🚨 **KRITISCH** - Eindeutige Dialog-Namen: `[Feature]Dialog` (einfach), `[Feature]View` (vollständig), `[Feature]Modal` (overlay). Keine mehrdeutigen Namen.

*   **Rule 5.20 (Scroll Height Dependency):** 🚨 **KRITISCH** - `overflow-auto` braucht definierte Höhe! `flex-1` allein reicht nicht. **Debug:** Height-Chain prüfen. **Anti-Pattern:** `flex-1 overflow-auto` ohne Height-Parent. **Fix:** `h-[75vh]` oder `isDialog`-Props für Context-Switching.

*   **Rule 5.21 (will-change Font-Killer):** 🚨 **KRITISCH** - Niemals `will-change: transform, opacity`! Zerstört Font-Rendering (blurry text). Browser optimieren automatisch. Font-Quality > Micro-Performance.

*   **Rule 5.22 (Single Loading Pipeline):** 🚨 **KRITISCH** - Für kritische Daten-Loading-Szenarien (Entry, User-Profile, Session-Data) MUSS eine zentrale Loading-Pipeline existieren. Verschiedene UI-Entry-Points dürfen NIEMALS unterschiedliche Loading-Logiken implementieren. Alle Navigation-Wege müssen durch dieselbe Daten-Validierungs- und Loading-Schicht gehen.

*   **Rule 5.23 (Mobile-First Space Efficiency):** 📱 **MOBILE-FIRST** - Alle UI-Komponenten MÜSSEN Mobile-First designed werden mit maximaler Space-Efficiency. Der User darf NIEMALS exzessiv scrollen müssen. Kompakte Darstellung hat IMMER Priorität über "großzügige" Desktop-Layouts. Input-Felder, die nicht die volle Breite benötigen, MÜSSEN in FlexRow-Containern nebeneinander positioniert werden. Vertikaler Raum ist kostbar - jede Komponente muss ihn respektieren. Kleinere Schriftgrößen, geringere Abstände, aber weiterhin hochmodernes Design

*   **Rule 5.24 (CRITICAL Page-Level Data-Separation):** 🚨 **INSTANT-HEADER RULE** - Page-Components dürfen NIEMALS Data-Fetching-Logic enthalten, die das Rendering von Header/Navigation blockiert! Alle `await getCurrentProfile()`, Finder-Calls, Data-Loading-Logic MUSS in separate MainContent-Components ausgelagert werden. Page.tsx = 90% HTML (instant), MainContent = 90% Data-Logic (async). Anti-Pattern: `const profile = await getCurrentProfile()` in page.tsx blockiert instant Header-Rendering. Correct Pattern: Header als pure HTML, alle Data-Dependencies in MainContent mit Suspense-Boundary.

*   **Rule 5.25 (Quick Inline Actions Dialog Persistence):** ⚠️ **LEGACY-FALLBACK** - Diese Regel gilt NUR wenn Optimistic UI (Rule 1.4) aus technischen Gründen NICHT möglich ist!
    - **Bevorzugte Lösung:** Optimistic UI Pattern (Rule 1.4) - KEIN `revalidateTag()` in Dialogen
    - **Fallback (nur wenn nötig):** sessionStorage-Persistenz für Dialog-State
    - Siehe `DashboardProvider.tsx` für Legacy-Implementierungsreferenz

*   **Rule 5.26 (Server Action Cache Invalidation Side Effects):** ⚠️ **LEGACY-FALLBACK** - Diese Regel gilt NUR wenn Optimistic UI (Rule 1.4) aus technischen Gründen NICHT möglich ist!
    - **Bevorzugte Lösung:** Optimistic UI Pattern (Rule 1.4) - Daten zurückgeben, lokalen State updaten
    - **Fallback-Mitigationen:** (1) sessionStorage-Persistenz, (2) useRef-basierte State-Guards, (3) Context mit `useCallback`-wrapped Setters
    - **STANDARD:** Implementiere IMMER zuerst Rule 1.4, bevor du auf diese Fallbacks zurückgreifst!

*   **Rule 5.27 (Dashboard Entry Persistence):** Dashboards oder Cards, die als einziger Einstiegspunkt zu verlinkten Inhalten dienen (z. B. Hausaufgaben → Notiz), dürfen completed/archivierte Items nicht kommentarlos ausblenden. Finder müssen Status-Filter (open/completed/all) bereitstellen und die UI muss standardmäßig entweder ein separates Completed-Segment oder einen sofort sichtbaren Toggle anbieten, damit Nutzer erledigte Einträge weiterhin öffnen können. Statuswechsel darf niemals den letzten Link zur Ressource entfernen.

*   **Rule 5.28 (Unique Default Names in UI):** Wenn ein Dialog einen auto‑generierten Standard‑Namen (z. B. `Notiz‑Diagramm`) anzeigt, muss der Client **vor dem Erstellen** den nächsten freien Namen berechnen und anzeigen. So sieht der User den finalen Titel und es entstehen keine doppelten Standard‑Namen.
*   **Rule 5.29 (Single Source of Truth für Link‑Tabellen):** Wenn eine Link‑Tabelle existiert (z. B. `notesToInks`), müssen **alle Reads/Writes** darüber laufen. Legacy‑FK‑Felder (z. B. `noteId`) dürfen nur als **Fallback** gelesen werden und müssen anschließend **verlinkt/migriert** werden. **Keine parallelen Schreibpfade**.
*   **Rule 5.30 (Toolbar Inside-Click Guard):** Wenn globale Pointer-Listener Menüs schließen, müssen alle interaktiven Toolbar-Bereiche per neutralem Marker (z. B. `data-ink-toolbar`, `data-ink-settings-panel`) als **inside** erkannt werden. **Keine Style-Klassen** für Logik missbrauchen, sonst schließen Panels bei internen Klicks.
