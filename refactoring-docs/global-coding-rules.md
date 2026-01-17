# Global Coding Rules

Comprehensive coding rules for robust, performant, and maintainable applications. Covers Next.js App Router, React best practices, and custom design patterns.

---

## 0. Testing & Validation Rules

**Rule 0.1 (No Test Suites Required):**
- ❌ **DO NOT** create unit tests, integration tests, or E2E tests unless explicitly requested
- ❌ **DO NOT** use `npm run dev` or `npm run build` for validation
- ✅ **ALWAYS** use `npx tsc --noEmit` to check for TypeScript errors
- ✅ **ALWAYS** validate code logic through manual review and type safety
- Sei hochmotiviert, liefere formatierte Antworten mit Icons in Deutsch

**Rule 0.2 (Global-Only Rules):**
- ✅ **NUR** universell gültige Regeln hier aufnehmen
- ✅ Projekt-/Feature-spezifische Heuristiken in `docs/[feature]/...`
- ❌ Keine Canvas-, Diagramm- oder Feature-Detailregeln in Global Rules

---

## 🤖 1. LLM-Optimierte Code-Prinzipien

> **Ziel:** Code der vorhersagbar, debuggbar und leicht erweiterbar ist - optimiert für KI-Reasoning.

### 1.1 Struktur (Structure)
- Konsistentes, vorhersagbares Projekt-Layout verwenden
- Code nach Feature/Screen gruppieren; shared utilities minimal halten
- Einfache, offensichtliche Entry Points schaffen
- **Shared Structure First:** Vor Scaffolding mehrerer Files gemeinsame Struktur identifizieren (Layouts, Templates, Provider, shared Components)
- ❌ Duplikation die gleichen Fix an mehreren Stellen erfordert ist Code-Smell

### 1.2 Architektur (Architecture)
- **Flat & Explicit:** Flachen, expliziten Code bevorzugen statt Abstraktionen oder tiefe Hierarchien
- ❌ Keine cleveren Patterns, Metaprogramming, oder unnötige Indirektion
- Coupling minimieren damit Dateien sicher regeneriert werden können

### 1.3 Funktionen & Module (Functions and Modules)
- Control Flow linear und einfach halten
- Kleine bis mittlere Funktionen verwenden; tief verschachtelte Logik vermeiden
- State explizit übergeben; Globals vermeiden

### 1.4 Naming & Comments
- Deskriptive aber simple Namen verwenden
- Kommentare NUR für: Invarianten, Annahmen, externe Anforderungen
- ❌ Keine Kommentare die nur Code beschreiben

### 1.5 Logging & Errors
- Detaillierte, strukturierte Logs an Key Boundaries
- Fehler explizit und informativ machen
- Console-Logs mit klarem Kontext: `console.log('[ComponentName] State:', value)`

### 1.6 Regenerierbarkeit (Regenerability)
- Code so schreiben dass jede Datei/Modul neu geschrieben werden kann ohne System zu brechen
- Klare, deklarative Konfiguration bevorzugen (JSON/TypeScript Types)

### 1.7 Platform Use
- Platform-Konventionen direkt und einfach nutzen (Next.js, React, Tailwind)
- ❌ Nicht über-abstrahieren

### 1.8 Modifikationen (Modifications)
- Bei Erweiterung/Refactoring bestehenden Patterns folgen
- Full-File Rewrites bevorzugen statt Micro-Edits (bei größeren Änderungen)

### 1.9 Qualität (Quality)
- Deterministisches, testbares Verhalten bevorzugen
- Tests einfach und fokussiert auf observable behavior halten

### 1.10 🔴 Arbeit verifizieren (MANDATORY)
- **IMMER** Arbeit prüfen bevor Kontrolle an User zurückgegeben wird
- `npx tsc --noEmit` ausführen
- Builds verifizieren wenn relevant
- ❌ Niemals unvollständige oder unverifizierte Arbeit zurückgeben

---

## 2. 🚀 Next.js App Router Rules

### 2.1. Component Architecture & Boundaries
*   **Rule 2.1.1 (Server vs. Client):** Components sind **Server Components by default**. `"use client"` nur für Interaktivität.
*   **Rule 2.1.2 (Placement):** `"use client"` an "leaf" des Component Tree, nicht in Root Layouts.
*   **Rule 2.1.3 (Isolate Interactivity):** Interaktive Logik in eigene Client Component extrahieren.
*   **Rule 2.1.4 (Server as Children):** Server Components als `children` an Client Components übergeben.
*   **Rule 2.1.5 (Third-Party):** Third-Party Components mit client hooks in eigene Client Component wrappen.

### 2.2. Data Fetching & Management
*   **Rule 2.2.1 (Direct Fetching):** Daten direkt in Server Components mit `async/await` fetchen.
*   **Rule 2.2.2 (Parallel Fetching):** `Promise.all` nutzen um Request Waterfalls zu verhindern.
*   **Rule 2.2.3 (Automatic Caching):** Next.js cached `fetch`. Für ORMs `React.cache` nutzen.
*   **Rule 2.2.4 (Dynamic Routes):** Via `params` prop zugreifen. `useSearchParams` in Client Components.
*   **Rule 2.2.5 (`use()` Hook):** Fetch auf Server starten (kein `await`), Promise an Client, konsumieren mit `use(promise)`.
*   **Rule 2.2.6 (Suspense):** `use()` Hook immer in `<Suspense>` boundary wrappen.
*   **Rule 2.2.7 (No useEffect for Initial Data):** ❌ `useEffect` nicht für initial data fetching.

### 2.3. Data Mutations & State Updates
*   **Rule 2.3.1 (Server Actions):** Server Actions für alle Mutations.
*   **Rule 2.3.2 (UI Updates):**
    - ⚠️ **In Dialogen/Modals:** KEIN `revalidateTag()` → Optimistic UI Pattern!
    - ✅ **Auf Page-Ebene:** `revalidatePath('/')` oder `revalidateTag('tag')` OK
*   **Rule 2.3.3 (Security):** Input validieren + `getCurrentProfile()` authentifizieren.
*   **Rule 2.3.4 (No Router Refresh in Modals):** Keine `revalidatePath()` in Dialog/Modal-Flows.

### 2.4. 🚨 Optimistic UI Pattern (MANDATORY für Dialoge/Modals)
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

### 2.5. Rendering, Loading & Secrets
*   **Rule 2.5.1 (Suspense):** `loading.tsx` für Route-Level, `<Suspense>` für Component-Level.
*   **Rule 2.5.2 (Re-trigger):** Unique `key` prop übergeben um Suspense neu zu triggern.
*   **Rule 2.5.3 (Static vs Dynamic):** `cookies()`, `headers()`, `searchParams` in Server Components vermeiden.
*   **Rule 2.5.4 (Env Variables):** Nur `NEXT_PUBLIC_*` im Browser exposed.
*   **Rule 2.5.5 (Static-First):** Statische UI AUSSERHALB Suspense boundaries rendern (0ms render).

---

## 3. ⚛️ React Best Practices

### 3.1. State & Props Management
*   **Rule 3.1.1 (Immutable State):** Functional updates `prev => ...` für sichere Updates.
*   **Rule 3.1.2 (List Keys):** Stable, unique `key` für `.map()` items.
*   **Rule 3.1.3 (State vs Ref):** `useState` = re-render, `useRef` = no re-render.

### 3.2. Performance Optimization
*   **Rule 3.2.1 (Memoization):**
    * `useMemo` für expensive, pure calculations
    * `useCallback` für functions als props an memoized children
    * `React.memo` für components die nicht re-rendern sollen wenn props gleich
*   **Rule 3.2.2 (UI Blocking):** Expensive computations nicht direkt im render body. `useMemo` oder web worker nutzen.
*   **Rule 3.2.3 (Capacitor WebView Animation Guard):** Reveal animations die `transform`, `opacity`, `filter` kombinieren auf großen card grids vermeiden bei Capacitor.

### 3.3. Effects & Lifecycle
*   **Rule 3.3.1 (Effect Cleanup):** IMMER cleanup function in `useEffect` bei subscriptions, timers, event listeners.
*   **Rule 3.3.2 (Accurate Dependency Arrays):** Accurate dependency array für `useEffect`, `useCallback`, `useMemo`.
*   **Rule 3.3.3 (Avoid Unnecessary Effects):** ❌ `useEffect` nicht für Logik die aus props/state abgeleitet werden kann.
*   **Rule 3.3.4 (Stable Effect Callbacks):** Callbacks aus Props in useEffect müssen stabil sein (`useCallback`) oder Guard-Checks haben.
*   **Rule 3.3.5 (Persisted Preferences Init):** Persistierte UI-Preferences, die den Initial-Render steuern (z.B. Animationen, Theme, Motion), müssen synchron initialisiert werden (localStorage + System-Preference), um falsche Zwischenzustände zu vermeiden.

### 3.4. Error Handling
*   **Rule 3.4.1 (Error Boundaries):** Kritische Trees wrappen, Fallback UI zeigen.
*   **Rule 3.4.2 (Error Logging):** Fehler mit Detail-Text sichtbar loggen.
*   **Rule 3.4.3 (Client Init Visibility):** Kritische Client-Initialisierungen müssen sichtbaren UI-Status bieten.

### 3.5. Component Styling
*   **Rule 3.5.1 (Responsive Children):** Child components müssen mit parent resize skalieren.
*   **Rule 3.5.2 (Empty-State Centering):** Innerhalb content width zentrieren, nicht viewport.

---

## 4. 🗂️ Component & File Architecture

### 4.1. Core Philosophy
**Instant Navigation:** Jede Komponente in **< 5 Sekunden** finden - File mirrors UI hierarchy.

### 4.2. Section-Based Architecture
```
app/feature/[param]/
├── (mainSection)/
│   ├── (subSection)/
│   │   └── AktionButton.tsx
│   └── MainSection.tsx
└── page.tsx
```
❌ **Anti-Pattern:** Flat "components" folder (Junk Drawer)

### 4.3. Naming Conventions
- `...Button.tsx`, `...Dialog.tsx`, `...Panel.tsx`, `...Section.tsx`
- 🇩🇪 **German (User-Facing):** `SpeichernButton.tsx`
- 🇺🇸 **English (Technical):** `ReviewSection.tsx`

---

## 5. 🎬 Advanced Design Patterns

### 5.1. High-Performance Tab Components
Tab-Komponenten dürfen **niemals eigene Daten-Fetches** durchführen. Parent fetcht, Props weitergeben.

### 5.2. CSS & Positioning
*   **Rule 5.2.1 (Scoped Positioning):** Parent braucht `position: relative` für contained `absolute` children.
*   **Rule 5.2.2 (Responsive Overlays):** `clamp()` für proportional sizing, nicht breakpoint toggles.

### 5.3. 🎨 Design-Ästhetik: Liquid Glass
> **Vollständige Doku:** `shared-docs/design/liquid-glass-guide.md`

- **Tiefe:** `bg-black/40`, `backdrop-blur-xl`, `box-shadow` mit `inset`
- **Licht als Akzent:** `blur-[50px]` Punkt-Glows, Status-Farben
- **Muted Buttons:** `orange-500/20` statt `bg-orange-500`!
- **Light/Dark Mode:** Jedes Element MUSS beide Modi unterstützen

### 5.4. Animation Rules
*   **Rule 5.4.1 (No Framer Motion):** Nur CSS Transitions oder Tailwind Animations.
*   **Rule 5.4.2 (No Endless Animations):** Keine Endlos-Animationen außer Loading-Indikatoren.
*   **Rule 5.4.3 (Interaction-Triggered):** Animationen durch User-Interaktion (`hover:`, `focus:`, `active:`).

---

## 6. 🚨 General Anti-Patterns & Edge Cases

### 6.1-6.8 General Rules
*   **SEO:** Critical content server-rendered
*   **CLS:** Reserve space with skeletons
*   **Animation Scope:** Animate content, not layout container
*   **Animation Staggering:** Staggered, not grouped reveal
*   **Data Fetching:** Don't fetch all at page level
*   **Data Batching:** Batch related queries
*   **Data Waterfall:** Avoid sequential loading

### 6.9 🔴 Context Analysis Before Changes
Vor jeder Änderung die letzten 3-4 Tasks analysieren. Niemals bereits gelöste Probleme rückgängig machen!

### 6.10 🔴 MANDATORY Legacy Code Removal
Nach jeder Änderung MUSS ungenutzter Code SOFORT entfernt werden!

### 6.11 Empty States
Always plan distinct "empty state" views for lists.

### 6.12-6.16 Debugging Rules
*   **6.12 Dialog-useEffect:** Bei "unsichtbaren" Loading-Indikatoren → useEffects prüfen
*   **6.13 Systematic Debug:** Layout → Context → Component → useEffects
*   **6.14 Race Conditions:** localStorage, multiple dependencies, async timing
*   **6.15 Reference Implementation:** Erst nach funktionierenden ähnlichen Implementierungen suchen
*   **6.16 Debug Infrastructure:** SOFORT Console-Logs für State-Changes implementieren

### 6.17 🔴 Dialog-EventListener-Pattern
Dialoge über useEffect-EventListener öffnen wenn Trigger in Layout-kritischen Komponenten.

### 6.18-6.20 Component Rules
*   **6.18 Universal Component Purity:** Universal-Components bleiben feature-agnostic
*   **6.19 Dialog Naming:** `[Feature]Dialog`, `[Feature]View`, `[Feature]Modal`
*   **6.20 Scroll Height:** `overflow-auto` braucht definierte Höhe! `h-[75vh]` oder `isDialog`-Props

### 6.21 🔴 will-change Font-Killer
Niemals `will-change: transform, opacity` permanent! Zerstört Font-Rendering.

### 6.22 Single Loading Pipeline
Kritische Daten-Loading durch zentrale Pipeline, keine unterschiedlichen Loading-Logiken.

### 6.23 📱 Mobile-First Space Efficiency
Alle UI-Komponenten Mobile-First mit maximaler Space-Efficiency.

### 6.24 🔴 Page-Level Data-Separation
Page-Components: KEINE Data-Fetching-Logic die Header blockiert!
- Page.tsx = 90% HTML (instant)
- MainContent = 90% Data-Logic (async mit Suspense)

### 6.25-6.28 Spezielle Regeln
*   **6.25 Dashboard Entry Persistence:** Completed Items nicht ausblenden, Status-Filter bereitstellen
*   **6.26 Unique Default Names:** Client berechnet nächsten freien Namen vor Erstellen
*   **6.27 Single Source of Truth:** Link-Tabellen für alle Reads/Writes
*   **6.28 Toolbar Inside-Click Guard:** `data-*` Marker für Toolbar-Bereiche

---

**🔗 Weiterführende Docs:**
- `shared-docs/CODING-RULES.md` - Haupt-Coding-Rules
- `shared-docs/design/liquid-glass-guide.md` - Liquid Glass Design
- `shared-docs/performance/capacitor-performance-rules.md` - Mobile Performance
- `shared-docs/database-testing-guide.md` - DB Testing
