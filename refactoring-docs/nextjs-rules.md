# Next.js App Router: Core Rules for High-Quality Code

This guide provides a condensed set of rules for building robust and performant Next.js applications with the App Router. Following these principles helps avoid common pitfalls related to Server/Client Components, data fetching, mutations, and rendering.

---

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

---

### 3. Data Mutations & State Updates

*   **Rule 3.1 (Use Server Actions):** Use Server Actions for all data mutations (e.g., form submissions, updates, deletions). They can be called from both Server and Client Components.
*   **Rule 3.2 (UI Updates after Mutation):** After a mutation in a Server Action, use `revalidatePath('/')` or `revalidateTag('tag')` to invalidate the cache and trigger a UI update.
*   **Rule 3.3 (Security):** **Always** validate user input (e.g., with Zod) and authenticate the user session within your Server Actions to prevent security vulnerabilities.

---

### 4. Rendering, Loading & Secrets

*   **Rule 4.1 (Suspense Boundaries):** Use `loading.tsx` for route-level loading UI. For more granular control, wrap slow data-fetching components in `<Suspense>` boundaries. The boundary must be placed *above* the async component in the tree.
*   **Rule 4.2 (Re-triggering Suspense):** To force a Suspense boundary to re-trigger when props change (e.g., a search query), pass a unique `key` prop to it (e.g., `<Suspense key={query}>`).
*   **Rule 4.3 (Static vs. Dynamic Rendering):** Avoid using dynamic functions like `cookies()`, `headers()`, or the `searchParams` prop in Server Components, as this opts the entire route into dynamic rendering.
*   **Rule 4.4 (Environment Variables):** Store secrets in `.env.local`. Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep API keys and database secrets server-only (no prefix).
*   **Rule 4.5 (Code Execution Guarantees):** Use the `server-only` package to guarantee that a module can only be imported by Server Components. Use `client-only` for modules with browser-only APIs.
*   **Rule 4.6 (Hydration):** Ensure the initial UI rendered on the server is identical to the client. For intentional differences (e.g., timestamps), use `useEffect` to update the value on the client or add the `suppressHydrationWarning` prop.
*   **Rule 4.7 (Redirects):** The `redirect()` function from `next/navigation` works by throwing an error. Do not place it inside a `try...catch` block, as the `catch` will prevent the redirect from working.