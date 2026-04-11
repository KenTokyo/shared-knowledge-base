# Loading Feedback Pattern (Skeleton + Fade)

Purpose: Provide a consistent, low‑friction UX for data changes that are not instantly available from cache. Keep the UI snappy by showing progress right away and reveal content smoothly when ready.

Scope
- Use for intra‑view interactions that fetch or recompute data (e.g., switching a training day, changing filters) when data is not guaranteed to be cached.
- Do not use for optimistic actions (e.g., typing, toggles, quick edits) that should feel instant.

Decision Rules (TL;DR)
- Not cached / uncertain: show Skeleton immediately; then fade in content when data arrives.
- Cached / optimistic: update UI immediately; at most a very light fade if the content area visually changes a lot.
- Keep feedback scoped: only the changing section renders Skeleton/Fade; avoid blocking headers, nav, or unrelated sections.

Design Targets
- Perceived latency: < 150 ms to first feedback (Skeleton visible).
- Transition: 200–400 ms, `ease-out`. Default blur disabled.
- Layout stability: zero content reflow; Skeleton should match the final layout footprint.

Reference Implementation

1) Trigger loading immediately (no waterfalls)
```tsx
// Inside an event handler
setIsLoading(true);            // 1) synchronously, before any await
const promise = fetchData();   // 2) start the async work right away
const data = await promise;    // 3) await later
setStateFrom(data);
setIsLoading(false);
```

2) Scoped rendering with Skeleton + Fade
```tsx
return (
  <section>
    {isLoading ? (
      <MySectionSkeleton />    // Only wrap the changing area
    ) : (
      <FadeContent duration={300} easing="ease-out" /* blur=false by default */>
        <MySectionContent data={data} />
      </FadeContent>
    )}
  </section>
);
```

3) Keep hooks stable
- Declare all hooks at the top of the component and before any conditional return. Early returns before hooks can cause “Rendered fewer hooks than expected”.
- Example anti‑pattern: placing `useState` after an `if (isLoading) return …` branch.

4) Stable keys and scope
- Use stable keys for list items to avoid remounts and focus loss.
- Wrap only the section that actually changes. Headers, tabs, static controls remain outside to render in 0 ms.

5) startTransition (optional)
- For heavy state updates that cause visible jank, wrap non‑urgent updates:
```tsx
import { startTransition } from 'react';
startTransition(() => {
  setStateFrom(data);
});
```
- Do not wrap urgent input (e.g., typing) in transitions.

6) Server vs Client
- Route/Page level: prefer Next.js Suspense and `loading.tsx` for route‑level fetching.
- Intra‑view (e.g., picking a day in a loaded dialog): use local `isLoading` with Skeleton + Fade.

7) When NOT to use Skeleton
- Optimistic or cached interactions: notes typing, simple toggles, non‑blocking counters. Show instant updates; optionally a tiny fade if there is a major visual change.
- Micro-delays (<100 ms): avoid flashing Skeletons. Optionally gate with a 120–150 ms delay to prevent flicker.

8) Visual guidance
- Skeleton mirrors final layout (same paddings, card frames, control sizes).
- Use one or two shades; keep motion subtle; avoid distracting shimmer for short loads.
- Fade duration: 200–400 ms; `ease-out`. Default `blur=false` (blur can be tiring on frequent interactions).

9) Error/empty states
- Replace the Skeleton with an inline error card if a request fails; avoid toasts only UX.
- If data resolves to empty, still fade in the “empty” block for visual continuity.

10) Performance checklist
- No client waterfalls: start all independent requests in parallel (`Promise.all`).
- Avoid N+1 calls; batch where feasible.
- Keep Skeleton lightweight; do not mount heavy sub‑trees while loading.

Code Snippet – Minimal Pattern
```tsx
// Component.tsx
const [isLoading, setIsLoading] = useState(false);
const [items, setItems] = useState<ItemType[]>([]);

async function onChangeFilter(f: Filter) {
  setIsLoading(true);                   // immediate feedback
  try {
    const res = await search(f);        // run async
    setItems(res);
  } finally {
    setIsLoading(false);
  }
}

return (
  <div>
    <Controls onChange={onChangeFilter} />
    {isLoading ? (
      <ListSkeleton />
    ) : (
      <FadeContent duration={300} easing="ease-out">
        <ItemList items={items} />
      </FadeContent>
    )}
  </div>
);
```

Do & Don’t
- Do: trigger loading state synchronously before any `await`.
- Do: keep the Skeleton’s footprint identical to final layout.
- Do: keep headers and nav outside the feedback wrapper.
- Don’t: add Skeletons to optimistic actions (typing, toggles, quick edits).
- Don’t: place hooks below conditional returns.

Defaults
- `FadeContent` defaults to `blur=false` to reduce boilerplate.
- Recommended durations: 300 ms (lists), 200 ms (small cards), 400 ms (dense content).

QA Notes
- Verify no layout shifts between Skeleton and final content.
- Check that repeated rapid interactions do not cause hook‑order warnings.
- Confirm keyboard focus does not jump (stable keys).

Changelog Integration
- Add a short reference in CODING-RULES under “Loading-Feedback Kurzregeln (Skeleton + Fade)” and link to this document.

