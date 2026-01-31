# Next.js App Router & Tailwind Rules

> **NUR LESEN wenn du in einem Next.js Projekt arbeitest!**
>
> Für React Native/Expo → `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md`
> Für Electron → siehe Electron-spezifische Docs
> Für Capacitor → `shared-docs/performance/capacitor-performance-rules.md`

---

## 1. Component Architecture & Boundaries

### 1.1 Server vs Client Components
- **Default:** Server Components (kein `"use client"`)
- **"use client" nur für:** `useState`, `useEffect`, event listeners, browser APIs
- **Platzierung:** An der "leaf" des Component Tree, nicht in Root Layouts

### 1.2 Component Patterns
- Interaktive Logik in eigene Client Component extrahieren
- Server Components als `children` an Client Components übergeben
- Third-Party Components mit client hooks in eigene Client Component wrappen

### 1.3 Client Provider Wrapper Pattern
Alle Client-Provider in ONE Client-Component (`ClientProviders.tsx`) wrappen.

---

## 2. Data Fetching & Management

### 2.1 Direct Fetching
- Daten direkt in Server Components mit `async/await` fetchen
- `Promise.all` nutzen um Request Waterfalls zu verhindern

### 2.2 Caching
- Next.js cached `fetch` automatisch
- Für ORMs `React.cache` nutzen

### 2.3 Dynamic Routes
- Via `params` prop zugreifen
- `useSearchParams` in Client Components

### 2.4 `use()` Hook Pattern
```tsx
// Server: Fetch starten (kein await)
const dataPromise = fetchData()

// Client: konsumieren mit use()
const data = use(dataPromise)
```
- `use()` Hook immer in `<Suspense>` boundary wrappen
- ❌ `useEffect` NICHT für initial data fetching

---

## 3. Data Mutations & Server Actions

### 3.1 Grundregeln
- Server Actions für alle Mutations
- MUSS `"use server"` haben
- Input validieren + `getCurrentProfile()` authentifizieren

### 3.2 🚨 Optimistic UI Pattern (MANDATORY für Dialoge/Modals)
**Problem:** `revalidateTag()` triggert Router Cache Refresh → Hard-Refresh, Dialog flasht/schließt!

```typescript
// ✅ RICHTIG - Server Action OHNE revalidateTag()
export async function createItemOptimistic(data) {
  const [created] = await db.insert(items).values(data).returning();
  return { success: true, data: created };
}

// Client - Instant Update
const result = await createItemOptimistic(data);
if (result.success) setItems(prev => [...prev, result.data]);
```

**Cross-Component Updates:**
```typescript
window.dispatchEvent(new CustomEvent('itemUpdated', { detail: result.data }))
```

### 3.3 Wann revalidate OK ist
- ✅ **Auf Page-Ebene:** `revalidatePath('/')` oder `revalidateTag('tag')` OK
- ❌ **In Dialogen/Modals:** NIEMALS → Optimistic UI Pattern nutzen!

---

## 4. Rendering & Loading

### 4.1 Suspense Patterns
- `loading.tsx` für Route-Level
- `<Suspense>` für Component-Level
- Unique `key` prop um Suspense neu zu triggern

### 4.2 Static-First Rendering
- Statische UI (Header, Navigation) AUSSERHALB Suspense (0ms render)
- `cookies()`, `headers()`, `searchParams` in Server Components vermeiden für Static

### 4.3 Page-Level Data-Separation
```
page.tsx = 90% HTML (instant render)
MainContent.tsx = 90% Data-Logic (async mit Suspense)
```
Header als pure HTML, Data-Logic in `MainContent` mit Suspense.

### 4.4 Environment Variables
- Nur `NEXT_PUBLIC_*` im Browser exposed
- Server-only secrets NIEMALS mit `NEXT_PUBLIC_` prefixen

---

## 5. Database (Actions & Finders)

### 5.1 Struktur
- **Actions** (`db/actions/`): Alle mutations, MUSS `"use server"` haben
- **Finders** (`db/finders/`): Alle queries, MUSS `"use server"` haben
- **Auth:** `getCurrentProfile()` aus `profile-finder`

### 5.2 Database-First Logic
- ✅ Filter: `WHERE` statt `.filter()` im Client
- ✅ Sortierung: `ORDER BY` statt `.sort()` im Client
- ✅ Pagination: `LIMIT/OFFSET` statt alles laden
- ⚠️ Neue Queries mit `npx tsx scripts/test-[feature].ts` testen!

### 5.3 API Response Format
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

---

## 6. Tailwind & Styling

### 6.1 Theme System
- CSS Custom Properties: `--primary`, `--accent`
- Glassmorphism: `glass-card`, `backdrop-blur-sm/md/2xl`

### 6.2 Liquid Glass Design
> Vollständige Doku: `shared-docs/design/liquid-glass-guide.md`

- **Tiefe:** `bg-black/40`, `backdrop-blur-xl`, `box-shadow` mit `inset`
- **Licht als Akzent:** `blur-[50px]` Punkt-Glows
- **Muted Buttons:** `orange-500/20` statt `bg-orange-500`
- **Light/Dark Mode:** Jedes Element MUSS beide Modi unterstützen

### 6.3 Vertical Space Efficiency (Notion-Style)
```tsx
<div className="flex items-center gap-2 py-1.5 min-h-[44px] sm:min-h-[36px]">
  <span className="text-sm">Titel</span>
  <span className="text-xs text-gray-500">·</span>
  <span className="text-xs truncate max-w-[200px]">Beschreibung</span>
</div>
```

### 6.4 CSS & Positioning
- Parent braucht `position: relative` für contained `absolute` children
- `clamp()` für proportional sizing, nicht breakpoint toggles
- Bei `backdrop-filter` interaktive Controls nicht in `overflow-hidden` clippen

### 6.5 Animation Rules
- ❌ Kein Framer Motion - Nur CSS Transitions oder Tailwind Animations
- ❌ Keine Endlos-Animationen außer Loading-Indikatoren
- ✅ Animationen durch User-Interaktion (`hover:`, `focus:`, `active:`)
- CSS Grid `grid-rows-[1fr]` / `grid-rows-[0fr]` mit `transition-all duration-300`

### 6.6 tailwindcss-animate Reserved Class Names
NIEMALS eigene CSS-Klassen mit tailwindcss-animate Namen. Eigener Prefix: `fm-fade-in`

---

## 7. Component Patterns

### 7.1 Section-Based Architecture
```
app/feature/[param]/
├── (mainSection)/
│   ├── (subSection)/
│   │   └── AktionButton.tsx
│   └── MainSection.tsx
└── page.tsx
```
❌ Anti-Pattern: Flat "components" folder (Junk Drawer)

### 7.2 Tab Components Performance
Parent fetcht alle Daten, Props an Tabs weitergeben. NIEMALS flüchtige Keys.

### 7.3 Responsive Dialogs (Controller Pattern)
- `[Feature]Dialog.tsx` - Desktop
- `Mobile[Feature]Dialog.tsx` - Mobile
- `[Feature]DialogController.tsx` - Logic + Device-Detection

### 7.4 Dialog-EventListener-Pattern
Dialoge in Layout-kritischen Komponenten über `useEffect + window.addEventListener` öffnen.

### 7.5 FadeContent Dialog Conditional Rendering
- ❌ `<FadeContent><Dialog isOpen={isOpen} /></FadeContent>`
- ✅ `{isOpen && <FadeContent><Dialog /></FadeContent>}`

### 7.6 Scroll Height Dependency
`overflow-auto` braucht definierte Höhe! Fix: `h-[75vh]` oder `isDialog`-Props.

### 7.7 TabContent Height-Constraint Anti-Pattern
Tab-Content darf NICHT `h-full` oder `flex flex-col` im Root-Div verwenden.

---

## 8. Anti-Patterns (Next.js-spezifisch)

### 8.1 will-change Font-Killer
Niemals `will-change: transform, opacity` permanent auf Containern mit Text!

### 8.2 revalidateTag Hard-Refresh Killer
❌ `revalidateTag()` in Dialogen/Modals → ✅ Optimistic UI Pattern (siehe 3.2)

### 8.3 Client-Side Fetch Anti-Pattern
Client-Components: KEIN initial Data-Fetching via `useEffect`! → Server-Side Pre-Fetch + Props

### 8.4 Capacitor WebView Animation Guard
Reveal animations die `transform`, `opacity`, `filter` kombinieren auf großen card grids vermeiden bei Capacitor.

---

## 9. Quick Checklist (Next.js)

**Vor Commit:**
- `npx tsc --noEmit` (🔴 MUSS 0 FEHLER HABEN!)
- Server Actions haben `"use server"`
- Max 700 lines/file

**Bei CRUD in Dialogen:**
- ⚡ Optimistic UI! KEIN `revalidateTag()` → Instant UI

**Styling:**
- ❌ `backdrop-blur-*` auf Mobile deaktiviert (Capacitor)
- ✅ Solide Hintergründe: `bg-[#f8f8f8]` statt `bg-white/95`
