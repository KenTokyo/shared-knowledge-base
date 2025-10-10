# 🚀 Network Performance Analysis Guide - React & Next.js
**Erstellt:** 2025-10-10
**Zweck:** Umfassende Anleitung zur Erkennung und Behebung von Fetch-Performance-Problemen
**Framework:** React 18 + Next.js 14 App Router

---

## 📊 **Teil 1: Network-Tab richtig nutzen**

### **1.1 Chrome DevTools Network-Tab öffnen**
```
1. Chrome öffnen → F12 (DevTools)
2. Tab "Network" auswählen
3. Filter setzen: "Fetch/XHR" (zeigt nur API-Calls)
4. "Preserve log" aktivieren (behält Logs bei Navigation)
5. Page-Refresh (Ctrl+R) → Initial-Load beobachten
```

---

### **1.2 Was im Network-Tab analysieren?**

#### **🔴 Red Flags: Probleme erkennen**

| Problem | Symptom im Network-Tab | Ursache | Lösung |
|---------|------------------------|---------|---------|
| **Request-Spam** | 50+ identische Requests in Sekunden | Component mountet mehrfach, Hook startet bei jedem Mount | Singleton-Pattern, `useEffect` Dependency-Fix |
| **Waterfall-Pattern** | Requests laufen sequenziell (einer nach dem anderen) | `await` in Loop, keine Parallelisierung | `Promise.all()`, Server-Component für paralleles Fetching |
| **Slow Response** | Time > 500ms | Langsame DB-Query, keine Indizes, N+1-Problem | DB-Optimierung, `JOIN` statt Loops, Query-Profiling |
| **Large Payload** | Size > 100KB für simple Daten | Over-Fetching, zu viele Joins | GraphQL/Select-Specific-Fields, Pagination |
| **Keine Caching** | Status immer 200 (nie 304) | Fehlende Cache-Headers | `Cache-Control`, ETag, React `cache()`, `unstable_cache()` |
| **Duplicate-Requests** | Identische URLs parallel | Keine Request-Deduplizierung | React `cache()` (Server), SWR/React-Query (Client) |

---

#### **✅ Gesunde Metriken: Was ist normal?**

| Metrik | ✅ Gut | ⚠️ Akzeptabel | 🚨 Problem |
|--------|--------|---------------|-----------|
| **Initial Requests** | 5-15 | 15-30 | >30 |
| **Response-Zeit** | <100ms | 100-500ms | >500ms |
| **Payload-Size** | <10KB | 10-50KB | >100KB |
| **Polling-Frequency** | 30-60s | 10-30s | <10s |
| **Cache-Hit-Rate** | >70% (304) | 30-70% | <30% (immer 200) |

---

### **1.3 Network-Tab Filter & Tricks**

#### **Filter nach Request-Type:**
```
Fetch/XHR   → API-Calls
JS          → JavaScript-Bundles
CSS         → Stylesheets
Img         → Images
Font        → Fonts
Doc         → HTML-Dokumente
```

#### **Waterfall-Diagramm lesen:**
```
Queueing     → Browser wartet (zu viele parallele Requests)
Stalled      → Browser wartet auf verfügbare Connection
DNS Lookup   → Domain-Auflösung (sollte 0ms sein bei gleicher Domain)
Initial Conn → TCP-Handshake
SSL          → HTTPS-Handshake
Waiting      → Server-Processing (DB-Query-Zeit!)
Download     → Response-Download
```

**🎯 Fokus:** "Waiting"-Zeit ist DB/Server-Performance!

---

## 🔍 **Teil 2: Häufige Fetch-Probleme in React/Next.js**

### **Problem 1: useEffect Infinite Loop**

#### **❌ Anti-Pattern:**
```tsx
function Component() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const result = await fetch('/api/data');
    setData(result);
  };

  useEffect(() => {
    fetchData(); // ❌ fetchData ist neue Function bei jedem Render!
  }, [fetchData]); // ❌ Dependency triggert Loop

  return <div>{data}</div>;
}
```

**Symptom:** Network-Tab zeigt hunderte Requests pro Sekunde

#### **✅ Lösung 1: useCallback**
```tsx
const fetchData = useCallback(async () => {
  const result = await fetch('/api/data');
  setData(result);
}, []); // ✅ Stable function reference

useEffect(() => {
  fetchData();
}, [fetchData]); // ✅ Triggert nur bei Mount
```

#### **✅ Lösung 2: Inline Function**
```tsx
useEffect(() => {
  const fetchData = async () => {
    const result = await fetch('/api/data');
    setData(result);
  };
  fetchData();
}, []); // ✅ Empty deps = mount only
```

---

### **Problem 2: Multiple Component Instances**

#### **❌ Anti-Pattern:**
```tsx
// Header.tsx
function Header() {
  return (
    <>
      <MobileNav />  {/* ❌ Rendert auf Mobile */}
      <DesktopNav /> {/* ❌ Rendert auf Desktop */}
    </>
  );
}

// Beide Components nutzen useNotificationCount()
// → 2x Polling, 2x Initial Fetch
```

**Symptom:** Network-Tab zeigt doppelte Requests

#### **✅ Lösung 1: Conditional Rendering**
```tsx
function Header() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileNav /> : <DesktopNav />;
  // ✅ Nur 1 Instance rendert
}
```

#### **✅ Lösung 2: Singleton-Pattern (siehe Notification-Polling-Plan)**
```tsx
// Global Service - nur 1 Polling egal wie viele Components
class PollingService {
  private listeners = new Set();
  private intervalId = null;

  subscribe(listener) {
    this.listeners.add(listener);
    if (this.listeners.size === 1) this.startPolling();
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) this.stopPolling();
    };
  }
}

export const pollingService = new PollingService();

// Hook nutzt Service
function usePolling() {
  const [data, setData] = useState(null);

  useEffect(() => {
    return pollingService.subscribe(setData);
  }, []);

  return data;
}
```

---

### **Problem 3: Waterfall-Fetching (Sequential Requests)**

#### **❌ Anti-Pattern:**
```tsx
async function loadData() {
  const user = await fetch('/api/user');        // ⏱️ 100ms
  const posts = await fetch(`/api/posts/${user.id}`); // ⏱️ 150ms (wartet auf user!)
  const comments = await fetch(`/api/comments/${posts[0].id}`); // ⏱️ 200ms (wartet auf posts!)
  // Total: 450ms
}
```

**Symptom:** Network-Tab zeigt sequenzielle Requests (Wasserfall)

#### **✅ Lösung 1: Promise.all für unabhängige Daten**
```tsx
async function loadData(userId: string) {
  const [user, posts, notifications] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/notifications')
  ]);
  // Total: 150ms (längster Request)
}
```

#### **✅ Lösung 2: Server Component für paralleles Fetching**
```tsx
// app/page.tsx (Server Component)
async function Page() {
  // ✅ Next.js fetcht parallel automatisch
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts()
  ]);

  return <ClientComponent user={user} posts={posts} />;
}
```

---

### **Problem 4: Over-Fetching (zu viele Daten)**

#### **❌ Anti-Pattern:**
```tsx
// Server Action
export async function getUser(userId: string) {
  const user = await db.select().from(users)
    .where(eq(users.id, userId))
    .leftJoin(posts, eq(posts.userId, users.id)) // ❌ Lädt alle Posts
    .leftJoin(comments, eq(comments.userId, users.id)) // ❌ Lädt alle Comments
    .leftJoin(likes, eq(likes.userId, users.id)); // ❌ Lädt alle Likes
  // Response: 5MB 🚨
}
```

**Symptom:** Network-Tab zeigt große Payload (>100KB) für simple UI

#### **✅ Lösung: Selective Fetching**
```tsx
// Nur benötigte Felder laden
export async function getUserBasic(userId: string) {
  const user = await db.select({
    id: users.id,
    name: users.name,
    avatar: users.avatar,
    postsCount: count(posts.id) // ✅ Nur Count, nicht alle Posts
  })
  .from(users)
  .leftJoin(posts, eq(posts.userId, users.id))
  .where(eq(users.id, userId))
  .groupBy(users.id);
  // Response: 500 bytes ✅
}
```

---

### **Problem 5: Fehlende Deduplizierung**

#### **❌ Anti-Pattern:**
```tsx
// Component A
const user = await getUser('123');

// Component B (rendert parallel)
const user = await getUser('123'); // ❌ Zweiter identischer Call

// Network-Tab: 2x GET /api/user/123
```

**Symptom:** Parallele identische Requests

#### **✅ Lösung 1: React cache() (Server-Side)**
```tsx
import { cache } from 'react';

export const getUser = cache(async (userId: string) => {
  return await db.select().from(users).where(eq(users.id, userId));
});

// ✅ Innerhalb eines Renders: Mehrere Calls = 1 DB-Query
```

#### **✅ Lösung 2: SWR/React-Query (Client-Side)**
```tsx
import useSWR from 'swr';

function Component() {
  // ✅ SWR dedupliziert automatisch
  const { data } = useSWR('/api/user/123', fetcher);
}
```

---

### **Problem 6: Polling ohne Cleanup**

#### **❌ Anti-Pattern:**
```tsx
function Component() {
  useEffect(() => {
    setInterval(() => {
      fetch('/api/data'); // ❌ Interval läuft nach Unmount weiter!
    }, 5000);
  }, []); // ❌ Kein Cleanup
}
```

**Symptom:** Network-Tab zeigt Requests auch nach Navigation weg von der Page

#### **✅ Lösung: Cleanup-Function**
```tsx
function Component() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('/api/data');
    }, 5000);

    return () => clearInterval(intervalId); // ✅ Cleanup bei Unmount
  }, []);
}
```

---

### **Problem 7: Suspense Rendering-Loop**

#### **❌ Anti-Pattern:**
```tsx
function Parent() {
  return (
    <Suspense fallback={<Spinner />}>
      <ChildWithFetch /> {/* ❌ Component suspended */}
    </Suspense>
  );
}

function ChildWithFetch() {
  const [data, setData] = useState(null);

  if (!data) {
    fetch('/api/data').then(setData);
    throw promise; // ❌ Suspense-Throw triggert Re-Render → Loop
  }

  return <div>{data}</div>;
}
```

**Symptom:** Network-Tab zeigt Loop von Requests + Spinner flackert

#### **✅ Lösung: use() Hook + Promise**
```tsx
// Server Component
async function Parent() {
  const dataPromise = fetchData(); // ❌ NICHT awaiten!

  return (
    <Suspense fallback={<Spinner />}>
      <ChildWithFetch dataPromise={dataPromise} />
    </Suspense>
  );
}

// Client Component
"use client";
import { use } from 'react';

function ChildWithFetch({ dataPromise }) {
  const data = use(dataPromise); // ✅ Resolve in Client
  return <div>{data}</div>;
}
```

---

## 🛠️ **Teil 3: React/Next.js Performance-Tools**

### **Tool 1: useMemo - Expensive Calculations**

**Wann nutzen?**
- ✅ Teure Berechnungen (Filtering, Sorting großer Arrays)
- ✅ Referenz-Stabilität für Props (verhindert Child-Re-Renders)
- ❌ **NICHT für Fetching** (nutze `useEffect` + `useCallback`)

```tsx
function Component({ items }) {
  // ✅ Sortierung nur wenn items sich ändert
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return <List items={sortedItems} />;
}
```

**Impact:** Reduziert CPU-Zeit, **nicht** Network-Requests

---

### **Tool 2: useCallback - Stable Function References**

**Wann nutzen?**
- ✅ Function als Prop an Child-Components
- ✅ Function als `useEffect`-Dependency
- ❌ **NICHT für jeden Event-Handler** (Overhead > Benefit)

```tsx
function Parent() {
  // ✅ onClick ist stable → Child rendert nicht bei Parent-Update
  const handleClick = useCallback(() => {
    fetch('/api/action');
  }, []);

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```

**Impact:** Verhindert unnötige Re-Renders + Fetch-Triggers

---

### **Tool 3: React.memo - Component Memoization**

**Wann nutzen?**
- ✅ Component rendert oft mit gleichen Props
- ✅ Component hat teure Rendering-Logic
- ❌ **NICHT bei Components die fast immer neue Props bekommen**

```tsx
// ✅ List-Items rendern nur bei Prop-Änderung
const ListItem = React.memo(({ item }) => {
  return <div>{item.name}</div>;
});

function List({ items }) {
  return items.map(item => <ListItem key={item.id} item={item} />);
}
```

**Impact:** Reduziert Re-Renders, verhindert fetch-Triggers in Child-Effects

---

### **Tool 4: useDebounce - User-Input-Fetching**

**Wann nutzen?**
- ✅ Search-Input (fetch bei jedem Keystroke)
- ✅ Autocomplete
- ✅ Filter-UI
- ❌ **NICHT für Polling** (nutze `setInterval`)

```tsx
function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300); // ✅ 300ms Verzögerung

  useEffect(() => {
    if (debouncedQuery) {
      fetch(`/api/search?q=${debouncedQuery}`); // ✅ Nur nach 300ms Pause
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

// Custom Hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // ✅ Cleanup
  }, [value, delay]);

  return debouncedValue;
}
```

**Impact:**
- **Vorher:** 100 Requests bei "React" (5 Keystrokes)
- **Nachher:** 1 Request nach Tipp-Pause

---

### **Tool 5: React cache() - Server-Side Deduplizierung**

**Wann nutzen?**
- ✅ Server Actions/Fetchers in Server Components
- ✅ Parallele Component-Fetches mit gleichen Parametern
- ❌ **NICHT für Client-Side** (funktioniert nur Server-Side)

```tsx
import { cache } from 'react';

// ✅ Dedupliziert automatisch innerhalb eines Request-Lifecycles
export const getUser = cache(async (userId: string) => {
  return await db.select().from(users).where(eq(users.id, userId));
});

// Page.tsx
async function Page() {
  const user1 = await getUser('123'); // DB-Query
  const user2 = await getUser('123'); // ✅ Cached (kein neuer Query)
}
```

**Impact:** Reduziert DB-Queries bei parallelen Component-Fetches

---

### **Tool 6: unstable_cache - Next.js Persistent Cache**

**Wann nutzen?**
- ✅ Daten die sich selten ändern (z.B. Settings, Categories)
- ✅ Teure Berechnungen (Analytics, Aggregations)
- ❌ **NICHT für User-spezifische Daten** (Cache ist global!)

```tsx
import { unstable_cache } from 'next/cache';

export const getCategories = unstable_cache(
  async () => {
    return await db.select().from(categories);
  },
  ['categories'], // Cache-Key
  {
    revalidate: 3600, // ✅ Cache 1 Stunde
    tags: ['categories'] // ✅ Invalidierung via revalidateTag()
  }
);
```

**Impact:**
- **Vorher:** 100 DB-Queries pro Minute
- **Nachher:** 1 DB-Query pro Stunde

---

### **Tool 7: SWR/React-Query - Client-Side Caching**

**Wann nutzen?**
- ✅ Client-Side Data-Fetching mit Caching
- ✅ Polling/Auto-Refetch/Retry-Logic out-of-the-box
- ✅ Optimistic Updates
- ❌ **NICHT für Server Components** (nutze React `cache()`)

```tsx
import useSWR from 'swr';

function Component() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/user',
    fetcher,
    {
      refreshInterval: 30000, // ✅ Auto-Polling alle 30s
      dedupingInterval: 5000, // ✅ Deduplizierung 5s
      revalidateOnFocus: true // ✅ Refresh bei Tab-Focus
    }
  );

  return <div>{data?.name}</div>;
}
```

**Impact:** Automatisches Caching + Deduplizierung + Revalidation

---

## 📋 **Teil 4: Checkliste - Performance-Optimierung**

### **Initial-Load-Optimierung:**
- [ ] **Parallel Fetching:** `Promise.all()` für unabhängige Daten
- [ ] **Server Components:** Static-UI außerhalb Suspense (0ms render)
- [ ] **Selective Loading:** Nur kritische Daten initial, Rest progressiv
- [ ] **Code-Splitting:** Dynamic Imports für große Components
- [ ] **Image-Optimization:** Next.js `<Image>` mit `priority` für above-fold

### **Runtime-Fetching-Optimierung:**
- [ ] **Deduplizierung:** React `cache()` (Server), SWR (Client)
- [ ] **Debouncing:** User-Input → 300-500ms Delay
- [ ] **Polling-Frequency:** 30-60s Standard, 10s für kritische Daten
- [ ] **Tab-Visibility:** Polling pausieren bei inaktiven Tabs
- [ ] **Cleanup:** `clearInterval`/`clearTimeout` in `useEffect` Cleanup

### **Data-Layer-Optimierung:**
- [ ] **DB-Indexing:** Indizes auf häufig gequeryte Columns
- [ ] **Query-Optimization:** `EXPLAIN ANALYZE` für langsame Queries
- [ ] **N+1-Prevention:** `JOIN` statt Loops, Drizzle `.leftJoin()`
- [ ] **Pagination:** Limit/Offset für große Datasets
- [ ] **Caching-Layer:** Redis für hot data (Optional)

### **Network-Layer-Optimierung:**
- [ ] **Cache-Headers:** `Cache-Control`, `ETag` in API Routes
- [ ] **Compression:** Gzip/Brotli für Responses >1KB
- [ ] **CDN:** Statische Assets via CDN (Vercel Edge Network)
- [ ] **HTTP/2:** Multiplexing für parallele Requests
- [ ] **Prefetching:** Next.js `<Link prefetch>` für Navigation

---

## 🎯 **Teil 5: Praktische Szenarien & Lösungen**

### **Szenario 1: Search-Component mit Live-Suggestions**

**Anforderung:** User tippt → Suggestions laden → max 1 Request pro 300ms

```tsx
function SearchWithSuggestions() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length >= 3) { // ✅ Min 3 Zeichen
      fetch(`/api/search/suggestions?q=${debouncedQuery}`)
        .then(res => res.json())
        .then(setSuggestions);
    } else {
      setSuggestions([]); // ✅ Clear bei kurzem Input
    }
  }, [debouncedQuery]);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SuggestionList items={suggestions} />
    </>
  );
}
```

**Metriken:**
- **Vorher:** 50 Requests für "React" (5 Keystrokes)
- **Nachher:** 1 Request nach 300ms Pause

---

### **Szenario 2: Dashboard mit vielen Widgets**

**Anforderung:** Jedes Widget lädt eigene Daten → Parallel fetching

```tsx
// ❌ FALSCH: Sequential Loading
async function Dashboard() {
  const user = await getUser();           // 100ms
  const stats = await getStats();         // 150ms
  const activities = await getActivities(); // 200ms
  const friends = await getFriends();     // 100ms
  // Total: 550ms
}

// ✅ RICHTIG: Parallel Loading
async function Dashboard() {
  const [user, stats, activities, friends] = await Promise.all([
    getUser(),
    getStats(),
    getActivities(),
    getFriends()
  ]);
  // Total: 200ms (längster Request)
}
```

**Alternative:** Multi-Level-Loading (Critical → Important → Nice-to-Have)
```tsx
async function Dashboard() {
  // Level 1: Critical (sofort laden)
  const user = await getUser();

  return (
    <div>
      <UserHeader user={user} />

      {/* Level 2: Important (Suspense) */}
      <Suspense fallback={<StatsLoader />}>
        <StatsWidget /> {/* Lädt parallel zu Level 3 */}
      </Suspense>

      {/* Level 3: Nice-to-Have (Lazy Load) */}
      <Suspense fallback={<ActivityLoader />}>
        <ActivityFeed /> {/* Lädt nach Stats */}
      </Suspense>
    </div>
  );
}
```

---

### **Szenario 3: Notification-Polling mit Multi-Tab-Support**

**Anforderung:**
- Polling alle 10 Sekunden
- Mehrere Tabs → nur 1 Polling-Instance total (über alle Tabs hinweg)
- Tab inaktiv → Polling pausieren

```tsx
// Shared Worker (läuft über alle Tabs hinweg)
// shared-worker.js
let intervalId = null;
const ports = [];

self.onconnect = (e) => {
  const port = e.ports[0];
  ports.push(port);

  if (ports.length === 1 && !intervalId) {
    // ✅ Start Polling bei erstem Tab
    intervalId = setInterval(() => {
      fetch('/api/notifications/count')
        .then(res => res.json())
        .then(data => {
          ports.forEach(p => p.postMessage(data)); // Broadcast zu allen Tabs
        });
    }, 10000);
  }

  port.onmessage = (e) => {
    if (e.data === 'disconnect') {
      const index = ports.indexOf(port);
      if (index > -1) ports.splice(index, 1);

      if (ports.length === 0) {
        // ✅ Stop Polling bei letztem Tab-Close
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  };
};

// React Hook
function useNotificationCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const worker = new SharedWorker('/shared-worker.js');

    worker.port.onmessage = (e) => setCount(e.data.count);
    worker.port.start();

    return () => worker.port.postMessage('disconnect');
  }, []);

  return count;
}
```

**Impact:**
- **Vorher:** 3 Tabs × 10s Polling = 3 Requests/10s
- **Nachher:** 1 Request/10s total (über alle Tabs)

---

### **Szenario 4: Infinite-Scroll mit Pagination**

**Anforderung:** User scrollt → nächste Page laden → keine doppelten Requests

```tsx
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return; // ✅ Prevent double-fetch

    setIsLoading(true);
    try {
      const response = await fetch(`/api/items?page=${page}&limit=20`);
      const newItems = await response.json();

      if (newItems.length === 0) {
        setHasMore(false); // ✅ No more items
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  // Intersection Observer für Auto-Load
  const observerRef = useRef();
  const lastItemRef = useCallback((node) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore(); // ✅ Load bei Sichtbarkeit
      }
    });

    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore, loadMore]);

  return (
    <div>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.id} ref={isLast ? lastItemRef : null}>
            {item.name}
          </div>
        );
      })}
      {isLoading && <Spinner />}
    </div>
  );
}
```

---

## 🎓 **Teil 6: Advanced Patterns**

### **Pattern 1: Request-Coalescing (Batching)**

**Problem:** 100 Components fetchen User-Daten → 100 Requests

**Lösung:** Batch-Loader (DataLoader-Pattern)
```tsx
class UserBatchLoader {
  private queue: string[] = [];
  private batchTimeout: NodeJS.Timeout | null = null;

  async load(userId: string): Promise<User> {
    return new Promise((resolve) => {
      this.queue.push({ userId, resolve });

      if (!this.batchTimeout) {
        this.batchTimeout = setTimeout(() => {
          this.flush();
        }, 10); // ✅ 10ms Batch-Window
      }
    });
  }

  private async flush() {
    const batch = this.queue;
    this.queue = [];
    this.batchTimeout = null;

    const userIds = batch.map(item => item.userId);
    const users = await db.select().from(users).where(inArray(users.id, userIds));

    // Resolve alle Promises
    batch.forEach(item => {
      const user = users.find(u => u.id === item.userId);
      item.resolve(user);
    });
  }
}

export const userLoader = new UserBatchLoader();

// Usage
const user = await userLoader.load('123'); // ✅ Batched mit anderen Calls
```

**Impact:**
- **Vorher:** 100 DB-Queries
- **Nachher:** 1 DB-Query mit `WHERE id IN (...)`

---

### **Pattern 2: Optimistic Updates**

**Problem:** User klickt "Like" → UI freezed bis Server antwortet

**Lösung:** Sofort UI updaten, bei Fehler rollback
```tsx
function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isOptimistic, setIsOptimistic] = useState(false);

  const handleLike = async () => {
    // ✅ Optimistic Update (sofort UI ändern)
    setLikes(prev => prev + 1);
    setIsOptimistic(true);

    try {
      const result = await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
      const data = await result.json();

      // ✅ Replace optimistic with real data
      setLikes(data.likes);
      setIsOptimistic(false);
    } catch (error) {
      // ❌ Rollback bei Fehler
      setLikes(prev => prev - 1);
      setIsOptimistic(false);
      toast.error('Like failed');
    }
  };

  return (
    <button onClick={handleLike} className={isOptimistic ? 'opacity-50' : ''}>
      ❤️ {likes}
    </button>
  );
}
```

**Impact:** UI feels instant (0ms perceived latency)

---

### **Pattern 3: Stale-While-Revalidate (SWR)**

**Problem:** Cached Data ist alt, aber User soll sofort Content sehen

**Lösung:** Zeige cached data → fetch fresh data im Hintergrund
```tsx
function useSWR(key: string) {
  const [data, setData] = useState(null);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    // 1. Load from Cache
    const cached = localStorage.getItem(key);
    if (cached) {
      setData(JSON.parse(cached));
      setIsStale(true); // ✅ Mark als stale
    }

    // 2. Fetch fresh data
    fetch(`/api/${key}`)
      .then(res => res.json())
      .then(freshData => {
        setData(freshData);
        setIsStale(false);
        localStorage.setItem(key, JSON.stringify(freshData));
      });
  }, [key]);

  return { data, isStale };
}

function Component() {
  const { data, isStale } = useSWR('user');

  return (
    <div className={isStale ? 'opacity-70' : ''}>
      {data?.name} {isStale && '(updating...)'}
    </div>
  );
}
```

**Impact:** Instant perceived load + fresh data nachgeladen

---

## 📚 **Teil 7: Ressourcen & Tools**

### **Chrome DevTools Extensions:**
- **React DevTools:** Component-Re-Renders visualisieren
- **React Query DevTools:** Cache-Status inspizieren
- **Redux DevTools:** State-Changes tracken

### **Performance-Monitoring:**
- **Lighthouse:** Page-Performance-Score
- **Web Vitals:** LCP, FID, CLS messen
- **Next.js Analytics:** Vercel Dashboard
- **Sentry Performance:** Real-User-Monitoring

### **DB-Performance:**
- **Drizzle Studio:** Query-Visualisierung
- **PostgreSQL EXPLAIN ANALYZE:** Query-Performance
- **pg_stat_statements:** Slow-Query-Log

### **Network-Debugging:**
- **Postman:** API-Testing
- **Insomnia:** GraphQL/REST-Client
- **Charles Proxy:** Request-Interception
- **Wireshark:** Low-Level Network-Analysis

---

## ✅ **Zusammenfassung: Quick-Wins**

| Problem | Quick-Fix | Impact |
|---------|-----------|--------|
| **Request-Spam** | Singleton-Pattern für Polling | -95% Requests |
| **Waterfall-Fetching** | `Promise.all()` | -70% Load-Time |
| **Over-Fetching** | Selective Fields | -80% Payload |
| **No Caching** | React `cache()` + `Cache-Control` | -90% DB-Load |
| **Slow Queries** | DB-Indexing + `JOIN` | -80% Response-Time |
| **User-Input-Spam** | `useDebounce(300ms)` | -98% Requests |
| **Infinite-useEffect** | `useCallback` Dependency | -100% Loop |
| **Multiple-Instances** | Conditional Rendering | -50% Requests |

---

**🎯 Nächste Schritte:**
1. **Network-Tab öffnen** → Baseline messen (wie viele Requests?)
2. **Probleme identifizieren** → Tabelle "Red Flags" nutzen
3. **Quick-Win wählen** → Größter Impact zuerst
4. **Implementieren** → Pattern aus diesem Guide nutzen
5. **Validieren** → Network-Tab prüfen (Verbesserung messbar?)

**📖 Weiterführende Docs:**
- `docs/social/tasks/2025-10-10-notification-polling-optimization-plan.md` - Praktisches Beispiel
- `shared-docs/refactoring-docs/rules/global-polling-strategy.md` - Polling-Best-Practices
- `shared-docs/performance/tab-component-performance-antipattern.md` - Tab-Performance
