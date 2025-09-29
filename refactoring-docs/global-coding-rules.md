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
*   **Rule 1.3.2 (UI Updates after Mutation):** After a mutation in a Server Action, use `revalidatePath('/')` or `revalidateTag('tag')` to invalidate the cache and trigger a UI update.
*   **Rule 1.3.3 (Security):** **Always** validate user input and authenticate the profile session with profile-finder within your Server Actions to prevent security vulnerabilities.

### 1.4. Rendering, Loading & Secrets

*   **Rule 1.4.1 (Suspense Boundaries):** Use `loading.tsx` for route-level loading UI. For component-level loading with animations, refer to the dedicated design pattern guide.
*   **Rule 1.4.2 (Re-triggering Suspense):** To force a Suspense boundary to re-trigger when props change (e.g., a search query), pass a unique `key` prop to it (e.g., `<Suspense key={query}>`).
*   **Rule 1.4.3 (Static vs. Dynamic Rendering):** Avoid using dynamic functions like `cookies()`, `headers()`, or the `searchParams` prop in Server Components, as this opts the entire route into dynamic rendering.
*   **Rule 1.4.4 (Environment Variables):** Store secrets in `.env.local`. Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep API keys and database secrets server-only (no prefix).
*   **Rule 1.4.5 (Code Execution Guarantees):** Use the `server-only` package to guarantee that a module can only be imported by Server Components. Use `client-only` for modules with browser-only APIs.
*   **Rule 1.4.6 (Hydration):** Ensure the initial UI rendered on the server is identical to the client. For intentional differences (e.g., timestamps), use `useEffect` to update the value on the client or add the `suppressHydrationWarning` prop.
*   **Rule 1.4.7 (Redirects):** The `redirect()` function from `next/navigation` works by throwing an error. Do not place it inside a `try...catch` block, as the `catch` will prevent the redirect from working.
*   **Rule 1.4.8 (Static-First Loading):** Always render static UI elements (headers, titles, descriptions, navigation) OUTSIDE of Suspense boundaries. Only wrap dynamic, data-dependent content in Suspense. This ensures critical UI appears instantly (0ms) while data loads progressively.

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

### 2.3. Effects & Lifecycle

*   **Rule 2.3.1 (Effect Cleanup):** Always provide a cleanup function in `useEffect` when setting up subscriptions, timers, or event listeners. This is critical to prevent memory leaks.
*   **Rule 2.3.2 (Accurate Dependency Arrays):** Always provide an accurate dependency array for `useEffect`, `useCallback`, and `useMemo`.
    *   An empty array (`[]`) runs the effect only once on mount.
    *   Omitting the array causes the effect to run on *every single render*.
*   **Rule 2.3.3 (Avoid Unnecessary Effects):** Do not use `useEffect` for logic that can be derived directly from props or state during rendering. Also, avoid it for actions that can be handled directly within event handlers.

### 2.4. Error Handling

*   **Rule 2.4.1 (Error Boundaries):** Wrap critical component trees in an Error Boundary component. This catches rendering errors in child components, displays a fallback UI, and prevents the entire application from crashing.

### 2.5. Component Styling

*   **Rule 2.5.1 (Responsive Child Components):** When resizing a parent container component, always verify that all child components, especially those with their own complex layout or fixed dimensions, scale or respond as expected. Apply flexible layout properties (e.g., `flex-grow`, `h-full`, `w-full`) to child components where necessary to ensure they utilize the newly available space.
 
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