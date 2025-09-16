# Global Coding Rules

This guide provides comprehensive coding rules for building robust, performant, and maintainable applications. It covers Next.js App Router, React best practices, and our custom design patterns.

---

## 🚀 Next.js App Router Rules

### 1. Component Architecture & Boundaries

*   **Rule 1.1 (Server vs. Client):** Components are **Server Components by default**. Only use the `"use client"` directive for components that require interactivity (e.g., `useState`, `useEffect`, event listeners).
*   **Rule 1.2 (Placement of `use client`):** Place the `"use client"` directive at the "leaf" of the component tree. Avoid placing it in root layouts or pages to maximize the benefits of Server Components.
*   **Rule 1.3 (Isolate Interactivity):** Extract interactive logic into its own Client Component instead of turning a large Server Component into a Client Component.
*   **Rule 1.4 (Server Components as Children):** You can pass Server Components as `children` to Client Components. This pattern allows you to keep data fetching and logic on the server while wrapping it with client-side state or context providers.
*   **Rule 1.5 (Third-Party Components):** Wrap third-party components that use client-side hooks (`useState`, etc.) in your own Client Component. If they access browser APIs, use `next/dynamic` with `ssr: false`.

---

### 2. Data Fetching & Management

*   **Rule 2.1 (Direct Fetching):** Fetch data directly within Server Components using `async/await`. Avoid creating unnecessary API routes (`Route Handlers`) for simple data retrieval.
*   **Rule 2.2 (Parallel Fetching):** Fetch independent data in parallel using `Promise.all` to prevent request waterfalls and improve load times.
*   **Rule 2.3 (Automatic Caching):** Next.js automatically caches `fetch` requests. Embrace multiple, co-located `fetch` calls for the same data; they won't result in duplicate requests. For ORMs or other libraries, use `React.cache`.
*   **Rule 2.4 (Dynamic Routes & Params):** Access dynamic route segments in page components via the `params` prop (e.g., `ProductPage({ params })`). To read URL search parameters without a server round-trip, use the `useSearchParams` hook in a Client Component.
*   **Rule 2.5 (Cascading Data Pattern):** Follow our 3-level data fetching pattern (see Design Pattern Rules below): Page-level for critical data, Section-level for main queries, Component-level for specific data.

*   **Rule 2.5.1 (`use()` Hook Pattern):** For interactive Client Components that need server-fetched data: Start the fetch on the server (without `await`) to get a promise. Pass this promise as a prop to the Client Component and consume it with `use(promise)`. This is the fastest way to load server data in interactive components.
*   **Rule 2.5.2 (Suspense Integration):** Always wrap components using the `use()` hook pattern in a `<Suspense>` boundary on the server. This provides an instant loading fallback and prevents the UI from being blocked.
*   **Rule 2.5.3 (Avoid `useEffect` for Initial Data):** Do not use `useEffect` to fetch initial data in Client Components. This pattern is slow, causes rendering waterfalls, and negates the benefits of server-side data fetching.
*   **Rule 2.5.4 (Distribute Promises with Context):** When multiple Client Components need the same server-fetched data, distribute the promise via a React Context Provider. This prevents redundant data fetches and keeps the code clean (no prop-drilling).

---

### 3. Data Mutations & State Updates

*   **Rule 3.1 (Use Server Actions):** Use Server Actions for all data mutations (e.g., form submissions, updates, deletions). They can be called from both Server and Client Components.
*   **Rule 3.2 (UI Updates after Mutation):** After a mutation in a Server Action, use `revalidatePath('/')` or `revalidateTag('tag')` to invalidate the cache and trigger a UI update.
*   **Rule 3.3 (Security):** **Always** validate user input (e.g., with Zod) and authenticate the user session within your Server Actions to prevent security vulnerabilities.

---

### 4. Rendering, Loading & Secrets

*   **Rule 4.1 (Suspense Boundaries):** Use `loading.tsx` for route-level loading UI. For component-level loading with animations, see our Design Pattern Rules below for the complete animated loading system.
*   **Rule 4.2 (Re-triggering Suspense):** To force a Suspense boundary to re-trigger when props change (e.g., a search query), pass a unique `key` prop to it (e.g., `<Suspense key={query}>`).
*   **Rule 4.3 (Static vs. Dynamic Rendering):** Avoid using dynamic functions like `cookies()`, `headers()`, or the `searchParams` prop in Server Components, as this opts the entire route into dynamic rendering.
*   **Rule 4.4 (Environment Variables):** Store secrets in `.env.local`. Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep API keys and database secrets server-only (no prefix).
*   **Rule 4.5 (Code Execution Guarantees):** Use the `server-only` package to guarantee that a module can only be imported by Server Components. Use `client-only` for modules with browser-only APIs.
*   **Rule 4.6 (Hydration):** Ensure the initial UI rendered on the server is identical to the client. For intentional differences (e.g., timestamps), use `useEffect` to update the value on the client or add the `suppressHydrationWarning` prop.
*   **Rule 4.7 (Redirects):** The `redirect()` function from `next/navigation` works by throwing an error. Do not place it inside a `try...catch` block, as the `catch` will prevent the redirect from working.

---

## ⚛️ React Best Practices

### 1. State & Props Management

*   **Rule 1.1 (Immutable State):** Always treat state as immutable. Use state setters (`setState` or `setMyState`) with functional updates (`prev => ...`) for safe and predictable updates, especially for batched or asynchronous operations.
*   **Rule 1.2 (List Keys):** Always provide a stable and unique `key` prop for each element when rendering lists with `.map()`. This is crucial for efficient rendering, state preservation, and avoiding bugs.
*   **Rule 1.3 (State vs. Ref):** Use `useState` for values that should trigger a re-render when they change. Use `useRef` for mutable values that *do not* require a re-render on change (e.g., managing focus, storing interval IDs, accessing DOM elements).

---

### 2. Performance Optimization

*   **Rule 2.1 (Memoization):** Prevent unnecessary re-renders to keep the UI fast and responsive.
    *   Wrap expensive, pure calculations in `useMemo`.
    *   Wrap function definitions passed as props to memoized child components in `useCallback`.
    *   Wrap components in `React.memo` to prevent them from re-rendering if their props have not changed.
*   **Rule 2.2 (UI Blocking):** Avoid running expensive, blocking computations directly in the render body. Offload them using `useMemo` or, for very heavy tasks, consider moving them to a web worker.

---

### 3. Effects & Lifecycle

*   **Rule 3.1 (Effect Cleanup):** Always provide a cleanup function in `useEffect` when setting up subscriptions, timers, or event listeners. This is critical to prevent memory leaks.
*   **Rule 3.2 (Accurate Dependency Arrays):** Always provide an accurate dependency array for `useEffect`, `useCallback`, and `useMemo`.
    *   An empty array (`[]`) runs the effect only once on mount.
    *   Omitting the array causes the effect to run on *every single render*.
*   **Rule 3.3 (Avoid Unnecessary Effects):** Do not use `useEffect` for logic that can be derived directly from props or state during rendering. Also, avoid it for actions that can be handled directly within event handlers.

---

### 4. Error Handling

*   **Rule 4.1 (Error Boundaries):** Wrap critical component trees in an Error Boundary component. This catches rendering errors in child components, displays a fallback UI, and prevents the entire application from crashing.

---

---

## 🗂️ Component Architecture & File Structure

### Core Philosophy: UI mirrors Folder Structure

Our primary goal is **instant navigation**: A developer should be able to find any component's code file in **under 5 seconds** just by looking at the UI. This is achieved by mirroring the UI's visual hierarchy directly in the file system.

---

### The Blueprint: Section-Based Architecture

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

#### 1. Component Types

Use suffixes to identify a component's purpose at a glance.

*   `...Button.tsx`: Interactive triggers (e.g., `SpeichernButton.tsx`).
*   `...Dialog.tsx`: Modal overlays (e.g., `BestätigenDialog.tsx`).
*   `...Panel.tsx`: Input or configuration interfaces (e.g., `EinstellungenPanel.tsx`).
*   `...Section.tsx`: The main orchestrator for a `(section)` folder.

#### 2. Language: German vs. English

The language depends on who the component is for: the **user** or the **developer**.

*   **🇩🇪 German (User-Facing):** If the user sees or interacts with it directly, name it in German.
    *   `SpeichernButton.tsx` (User clicks "Speichern").
    *   `EinstellungenDialog.tsx` (User sees "Einstellungen" title).
*   **🇺🇸 English (Technical/Structural):** If it's a structural or technical container, name it in English.
    *   `ReviewSection.tsx` (Organizes the review area).
    *   `ProductCard.tsx` (A reusable data display block).

## 🎬 Design Pattern Rules: Animated Loading States

### Core Philosophy: Perceived Performance > Actual Performance

Our goal is to make the application *feel* instant, even when loading heavy data. We achieve this by showing critical content immediately and progressively revealing less important elements. This creates a smooth, high-quality user experience.

---

### The 3 Golden Rules of Loading

1.  **🥇 Instant Critical Content First:** The most important information the user needs (e.g., page title, main heading) must appear instantly. This content should be rendered on the server and not be part of any animation sequence.
2.  **🌊 Stagger Animations (Waterfall):** Never reveal all elements at once. Create a "waterfall" effect by staggering animations with small delays (`0.1s`, `0.2s`, etc.). This guides the user's eye and makes loading feel dynamic.
---

### 🏗️ The Blueprint: Core Implementation

#### 1. CSS Foundation

Use these minimal, standardized CSS classes for all staggered loading animations.

```css
/* Keyframes for animations */
@keyframes slideInFade {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Animation utility classes */
.animate-slide-fade { animation: slideInFade 0.5s ease-out forwards; opacity: 0; }
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; opacity: 0; }
.animate-fade-scale { animation: fadeInScale 0.4s ease-out forwards; opacity: 0; }

/* Delay utility classes */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }
```

#### 2. The `UniversalSection` Component (Best Practice)

To ensure consistency, use a wrapper component like this. It combines animation, delay, and `Suspense` for asynchronous content.

```tsx
// components/UniversalSection.tsx
import { Suspense } from 'react';
import LoadingState from '@/components/LoadingState';

type AnimationType = 'slide' | 'fade' | 'fadeScale';
type DelayType = 1 | 2 | 3 | 4 | 5;

interface Props {
  delay: DelayType;
  animation?: AnimationType;
  children: React.ReactNode;
  className?: string;
}

const animationClasses = {
  slide: 'animate-slide-fade',
  fade: 'animate-fade-in',
  fadeScale: 'animate-fade-scale'
};

export default function UniversalSection({ 
  delay, 
  animation = 'fade',
  children, 
  className = "mt-8"
}: Props) {
  const animClass = animationClasses[animation];
  const delayClass = `delay-${delay}`;
  
  return (
    <div className={`${className} ${animClass} ${delayClass}`}>
      <Suspense fallback={<LoadingState />}>
        {children}
      </Suspense>
    </div>
  );
}
```

#### 3. Next.js Page Example (Blueprint)

This demonstrates the perfect loading sequence.

```tsx
// app/some-page/page.tsx
import UniversalSection from '@/components/UniversalSection';
import HeavyComponent from '@/components/HeavyComponent';
import AnotherAsyncComponent from '@/components/AnotherAsyncComponent';

export default async function Page() {
  // 🥇 Rule 1: This is rendered on the server and appears INSTANTLY.
  const criticalData = await getCriticalData();

  return (
    <div>
      {/* INSTANT CONTENT - NO ANIMATION */}
      <h1 className="text-4xl font-bold">{criticalData.title}</h1>
      <p className="text-lg text-gray-600">{criticalData.subtitle}</p>

      {/* 🌊 Rule 2: Staggered animations for everything else */}
      
      <UniversalSection delay={1} animation="slide">
        <SomeInfo data={criticalData.info} />
      </UniversalSection>

      <UniversalSection delay={2} animation="fadeScale">
        <HeavyComponent />
      </UniversalSection>

      <UniversalSection delay={3} animation="fade">
        <AnotherAsyncComponent />
      </UniversalSection>
    </div>
  );
}
```

---

### 📊 Data Fetching & Loading Hierarchy

#### The Multi-Level Fetching Pattern

Our app follows a **cascading data fetching pattern** that mirrors the visual loading hierarchy:

**Level 1 - Page Level (Instant Critical Data)**
```tsx
// app/perfumes/[slug]/page.tsx
export default async function Page({ params }: Props) {
  // 🥇 CRITICAL: Fetched on server, appears instantly (0ms delay)
  const validation = await validatePerfumeSlug(params.slug);
  const { name, brand, concentration, year } = validation.perfume;

  return (
    <div>
      {/* INSTANT CONTENT - NO LOADING STATE */}
      <h1>{name}</h1>
      <p>{brand}, {year}</p>
      <span>{concentration}</span>

      {/* ASYNC SECTIONS WITH SUSPENSE */}
      <Suspense fallback={<LoadingState />}>
        <PerfumeDetails name={name} brand={brand} />
      </Suspense>
    </div>
  );
}
```

**Level 2 - Section Level (Heavy Components with Joint Queries)**
```tsx
// PerfumeDetails.tsx
export default async function PerfumeDetails({ name, brand }) {
  // 🔍 MAIN QUERY: Fetch core data + relations
  const { data } = await supabase
    .from("Perfumes")
    .select(`*, PAccords(*), Ratings(*), Brands(*)`)
    .match({ name, "Brands.name": brand })
    .single();

  // 🔍 SECONDARY QUERY: Additional related data
  const { data: users_rated } = await supabase
    .from("Profile")
    .select("*")
    .in("id", profileIdsWithReview);

  return (
    <>
      {/* Staggered sections with progressive loading */}
      <UniversalSection delay={1}>
        <PerfumeImage imageUrl={perfume.image_url} />
      </UniversalSection>
      
      <UniversalSection delay={2}>
        <PerfumeHeroSection perfume={perfume} />
      </UniversalSection>
      
      <UniversalSection delay={3}>
        <Accords accordIds={accordIds} />
      </UniversalSection>
    </>
  );
}
```

**Level 3 - Component Level (Specific Data Queries)**
```tsx
// Accords.tsx
async function Accords({ accordIds }) {
  // 🔍 COMPONENT-SPECIFIC QUERY: Only fetch what this component needs
  const { data: accords } = await supabase
    .from("Accords")
    .select("*")
    .in("id", accordIds);

  return (
    <div className="glass-card">
      <h2>Duftrichtung</h2>
      {accords?.map(accord => (
        <span key={accord.id}>{accord.name}</span>
      ))}
    </div>
  );
}
```

#### 🎯 Fetching Strategy Rules

1. **🥇 Critical First:** Page-level queries fetch only what's needed for immediate display (title, basic info)
2. **🔄 Batch Related Data:** Section-level components fetch their core data + immediate relations in one query
3. **🎯 Component-Specific:** Individual components fetch their specific requirements (e.g., Accords fetches accord details)
4. **⚡ Progressive Loading:** Each level has its own Suspense boundary with appropriate fallbacks

#### 🎬 The Complete Flow Example

```tsx
// 1. Page loads instantly with critical data
<h1>Dior Homme</h1>           // ✅ 0ms - Server-rendered

// 2. Main section starts loading
<Suspense fallback={<LoadingState />}>
  <PerfumeDetails />           // ⏳ Loading main perfume data...
</Suspense>

// 3. Within PerfumeDetails, sections appear with staggered animation
<UniversalSection delay={1}>
  <PerfumeImage />             // ✅ 100ms - Image appears
</UniversalSection>

<UniversalSection delay={2}>
  <PerfumeHeroSection />       // ✅ 200ms - Hero section fades in
</UniversalSection>

<UniversalSection delay={3}>
  <Suspense fallback={<Spinner />}>
    <Accords />                // ⏳ 300ms - Accords component fetches its data
  </Suspense>
</UniversalSection>
```

**Result:** User sees **title immediately**, then sections **cascade in beautifully** with their data, creating a premium loading experience.

---

### 🚨 Safety Net: Key Edge Cases & Anti-Patterns

*   **SEO:** Ensure critical SEO content (like `h1`, `meta description`) is rendered on the server and is not dependent on client-side animation.
*   **Layout Shift (CLS):** Reserve space for loading elements using skeletons or fixed-height containers to prevent content from jumping.
*   **Slow APIs:** For components that might take too long, consider a timeout that shows a simplified fallback state.
*   **❌ ANTI-PATTERN:** Do not animate the main page layout container. Animate the *content inside* the layout.
*   **❌ ANTI-PATTERN:** Do not apply the same delay to multiple elements. The goal is a staggered, not a grouped, reveal.
*   **❌ DATA ANTI-PATTERN:** Never fetch all data at page level - this blocks the entire page render
*   **❌ DATA ANTI-PATTERN:** Don't create separate queries for each small piece of data - batch related queries
*   **❌ DATA ANTI-PATTERN:** Avoid waterfall loading where Component A waits for Component B's data