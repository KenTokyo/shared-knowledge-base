# Global React: Core Rules for High-Quality Code

This guide provides a condensed set of rules for building robust, performant, and maintainable React applications. Adhering to these principles helps avoid common pitfalls and ensures code quality.

---

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