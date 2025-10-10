# 🎯 Coding Rules & Development Guidelines

**Zweck:** Diese Datei enthält alle essentiellen Regeln für konsistente, performante und wartbare Code-Entwicklung. Sie vereint Architektur, Best Practices und kritische Anti-Patterns.

---

## 📋 Workflow & Arbeitsweise

### Vor dem Start
- Vorhaben formatiert mit Icons präsentieren
- Größere Aufgaben → Plan in `docs/[feature]/tasks/[datum]-[feature]-plan.md`
- **Code-Reuse prüfen:** Erst nach existierenden Funktionen/Components suchen
- **Testing:** Nur `npx tsc --noEmit` verwenden (❌ kein `npm run dev/build`)

### Kritisches Denken (Edge Cases)
Proaktiv an Szenarien denken, die der User nicht erwähnt hat:
- **Extrem-Fälle:** Große/kleine/leere Daten, Maximum erreicht?
- **User-Verhalten:** Falsche Eingaben, Spam-Klicks, Browser-Refresh?
- **Performance:** Langsame Queries, Memory leaks, DOM overload?
- **Concurrent Access:** Mehrere Tabs, Race conditions, State conflicts?
- **Browser/Device:** Mobile vs Desktop, alte Browser, verschiedene OS?
- **Security:** XSS, CSRF, Data injection, Unauthorized access?
- **UX:** Verwirrende UI, fehlende Feedback, Accessibility issues?

### Nach Abschluss
- **Plan aktualisieren:** Phase als ✅ markieren, kurz dokumentieren was/warum
- **Dokumentation erweitern:** `docs/[feature]/[feature]-overview.md` bei großen Änderungen
- **Motivierende Zusammenfassung:** Icons, exakte Dateipfade, abgeschlossene Phase nennen

---

## 🏗️ Architektur & Dateistruktur

### Component Organization (Section-Based)

**Max 400 lines per file** - Split in helpers/services wenn größer

#### ✅ The Right Way: Section-Based Structure
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

#### ❌ Anti-Pattern: Flat "components" Junk Drawer
```
app/chat/
├── page.tsx
└── components/             ← ❌ VERMEIDEN
    ├── AiChatDialog.tsx    ← Keine Struktur, nicht skalierbar
    ├── ChatHeader.tsx
    └── ... (20+ files chaos)
```

### Component Naming Convention

**Button-Text = File-Name:** "Speichern" button → `SpeichernButton.tsx`

**Component Types:**
```
ComponentName[Type].tsx:
- Section.tsx    → Orchestrates UI area (ReviewSection.tsx)
- Panel.tsx      → Input/config interface (EinstellungenPanel.tsx)
- Dialog.tsx     → Modal/overlay (BestätigenDialog.tsx)
- Button.tsx     → Interactive trigger (SpeichernButton.tsx)
- Card.tsx       → Reusable content block (ProductCard.tsx)
- Item.tsx       → List/grid element (MenuItem.tsx)
```

**Sprach-Konvention:**
- 🇩🇪 **DEUTSCH (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **ENGLISCH (Technical):** Section, Card, Item, Layout → `ReviewSection.tsx`

---

## 🚀 Next.js App Router Rules

### 1. Server vs Client Components
- **Default:** Server Components (kein `"use client"`)
- **"use client" nur für:** `useState`, `useEffect`, event listeners, browser APIs
- **Platzierung:** An der "leaf" des Component Tree, nicht in Root Layouts
- **Pattern:** Server Components als `children` an Client Components übergeben

### 2. Data Fetching
- ✅ **DO:** Direct fetching in Server Components mit `async/await`
- ✅ **DO:** Parallel fetching mit `Promise.all` (verhindert waterfalls)
- ✅ **DO:** `use()` Hook Pattern für Client Components + Suspense
- ❌ **DON'T:** `useEffect` für initial data fetching (slow, waterfalls)
- ❌ **DON'T:** Unnecessary API routes für simple data retrieval

**Best Practice - `use()` Hook Pattern:**
```tsx
// Server Component
const dataPromise = fetchData() // Nicht awaiten!
return <ClientComponent dataPromise={dataPromise} />

// Client Component
"use client"
import { use } from 'react'
function ClientComponent({ dataPromise }) {
  const data = use(dataPromise) // Resolve in Client
  return <div>{data}</div>
}
```

### 3. Data Mutations
- **Server Actions:** Alle Mutations (forms, updates, deletions)
- **UI Updates:** `revalidatePath('/')` oder `revalidateTag('tag')` nur bei geeigneten Fällen
- **Security:** ⚠️ IMMER User-Input validieren + Session mit `getCurrentProfile()` prüfen

### 4. Loading & Rendering
- **Suspense:** `loading.tsx` für Route-Level, `<Suspense>` für Component-Level
- **Re-trigger Suspense:** Key prop nutzen: `<Suspense key={query}>`
- **Static-First:** Statische UI (Header, Navigation) AUSSERHALB Suspense (0ms render)
- **Hydration:** Server und Client initial UI müssen identisch sein

---

## ⚛️ React Best Practices

### State & Props
- **Immutable State:** Functional updates: `setState(prev => ...)`
- **List Keys:** Stable, unique `key` prop für `.map()` items
- **State vs Ref:** `useState` = re-render, `useRef` = no re-render (DOM, interval IDs)

### Performance
- **Memoization:** `useMemo` (expensive calculations), `useCallback` (functions as props), `React.memo` (components)
- **UI Blocking:** Expensive computations in `useMemo` oder web worker auslagern

### Effects & Lifecycle
- **Cleanup:** IMMER cleanup function bei subscriptions/timers/listeners
- **Dependency Array:** Accurate dependencies, `[]` = mount only, none = every render
- **Avoid Unnecessary Effects:** Derive from props/state during render wenn möglich

### Error Handling
- **Error Boundaries:** Wrap critical trees, catch rendering errors, show fallback

### Component Communication
Parent↔Child: Props/Callbacks. 2-3 Levels: Lifting State Up. 3+ Levels: Context API. Anti-Patterns: Props-Drilling >3 Levels, Context für lokalen State, duplizierter State in Kindern. Details: `shared-docs/react-core-communication-patterns.md`

---

## 🎬 Design Patterns & Anti-Patterns

### Tab Components Performance
Tabs KEINE eigenen Fetches. Parent fetcht, Props weitergeben. Anti-Pattern: Tab-Fetches (1000ms+ Ladezeit). Referenz: `shared-docs/performance/tab-component-performance-antipattern.md`

### Responsive Dialogs
- **Controller Pattern:** Separate Components für Desktop/Mobile
- `[Feature]Dialog.tsx` + `Mobile[Feature]Dialog.tsx` + `[Feature]DialogController.tsx`
- **Referenz:** `shared-docs/design/responsive-dialog-architecture.md`

### Animated Loading States
- **Static-First:** Kritische UI (Header) instant, dynamic content progressiv
- **Staggered Animations:** Unterschiedliche delays für smooth reveal
- **Referenz:** `shared-docs/refactoring-docs/patterns/animated-loading-states.md`

### Multi-Level Data Fetching
- **3 Levels:** Page (critical), Section (important), Component (detailed)
- **Cascading:** Critical data instant, heavy data progressiv
- **Referenz:** `shared-docs/refactoring-docs/patterns/multi-level-data-fetching.md`

---

## 🚨 Kritische Anti-Patterns (MUST AVOID)

### 🔴 Rule 5.8: Proactive Implementation Analysis
Vor Code: Mental-Analyse (Physics Check, Side-Effects, Edge-Cases, Alternativen). Machbarkeit prüfen, bevor implementiert wird. Bei Limitationen: Alternative Lösungen vorschlagen, nicht blind implementieren.

### 🔴 Rule 5.9: Context Analysis Before Changes
Vor jeder Änderung die letzten 3-4 Tasks analysieren! Niemals bereits gelöste Probleme rückgängig machen.

### 🔴 Rule 5.10: MANDATORY Legacy Code Removal
Nach jeder Änderung SOFORT ungenutzten Code entfernen:
- Ungenutzte Functions/Components/Imports
- Ungenutzte Variables/Constants/CSS-Klassen
- Ungenutzte Hook-Aufrufe (`useState`, `useMemo`, etc.)

### 🔴 Rule 5.17: Dialog-EventListener-Pattern (LAYOUT-CRASH-PREVENTION)
Dialoge in Layout-kritischen Komponenten (Navbar, Header) MÜSSEN über `useEffect + window.addEventListener` geöffnet werden. Niemals direkt rendern - selbst `open={false}` kann Layout-Collapse verursachen.

**Referenz:** `shared-docs/postmortem/open-dialogs-right-way-useffect-windowEventListener.md`

### 🔴 Rule 5.20: Scroll Height Dependency
`overflow-auto` braucht definierte Höhe! `flex-1` allein reicht nicht.
- ❌ **Anti-Pattern:** `flex-1 overflow-auto` ohne Height-Parent
- ✅ **Fix:** `h-[75vh]` oder `isDialog`-Props für Context-Switching

### 🔴 Rule 5.21: will-change Font-Killer
Niemals `will-change: transform, opacity`! Zerstört Font-Rendering (blurry text). Browser optimieren automatisch.

### 🔴 Rule 5.22: Single Loading Pipeline
Für kritische Daten (Entry, User-Profile) MUSS eine zentrale Loading-Pipeline existieren. Verschiedene UI-Entry-Points dürfen NICHT unterschiedliche Loading-Logiken haben.

### 🔴 Rule 5.23: Mobile-First Space Efficiency
📱 Alle UI-Komponenten MÜSSEN Mobile-First designed werden:
- Maximale Space-Efficiency (kein exzessives Scrollen)
- Input-Felder nebeneinander in FlexRow wenn möglich
- Kleinere Schriftgrößen, geringere Abstände, weiterhin modernes Design

### 🔴 Rule 5.24: Page-Level Data-Separation
Page-Components ohne Data-Fetching für Header/Navigation. Header als pure HTML, Data-Logic in `MainContent` mit Suspense.

### 🔴 Rule 5.25: Custom List-Styles & Prose.css Interaktion
**Problem:** TailwindCSS Prose-Plugin + Custom Styles können native HTML-Elemente überschreiben

### 🔴 Rule 5.26: Direct Action Principle
Action-Buttons führen ihre Funktion DIREKT aus (1 Klick = 1 Action). Multi-Step Components brauchen `initialView/initialStep` Prop. Keine Zwischenschritte.

### 🔴 Rule 5.27: Consistent Dialog Design
Dialoge: `max-h-[85vh]`, `sm:max-w-[700px]`. Multi-Step über State-Switching (kein nested Dialog). Zurück-Button bei Sub-Views. Main-Container bleibt, Content wechselt.

### 🔴 Rule 5.29: FadeContent Dialog Conditional Rendering (RENDER-LOOP PREVENTION)
🚨 **KRITISCH:** FadeContent Components MÜSSEN conditional gerendert werden bei Dialog/Modal-Wrapping!

**Problem:** FadeContent rendert permanent → Dialog rendert mit `open={false}` → Re-Render-Loop

**❌ Anti-Pattern:** Permanent Rendering
```tsx
// ❌ FALSCH - Rendert permanent, auch wenn Dialog geschlossen
<FadeContent delay={200}>
  <MyDialog isOpen={isOpen} onOpenChange={setIsOpen} />
</FadeContent>
```

**✅ Correct Pattern:** Conditional Rendering
```tsx
// ✅ RICHTIG - Rendert nur wenn Dialog tatsächlich offen
{isOpen && (
  <FadeContent delay={200}>
    <MyDialog isOpen={isOpen} onOpenChange={setIsOpen} />
  </FadeContent>
)}
```

**Regel-Trigger:** Wenn FadeContent Dialoge/Modals wrapped → IMMER conditional rendering

**Symptoms:**
- Excessive Re-Rendering in Console Logs
- Components rendern endlos (Loop)
- State-Updates triggern unnötige Renders
- Performance-Degradation

**Postmortem-Referenz:** 2025-10-06 - Chat Section Render Loop durch permanent FadeContent Rendering

### 🔴 Rule 5.35: State-Changes During Active UI
State-Updates, die Component-Remount triggern, NICHT während aktiver UI-Interaktion. Defer bis User navigiert. Mental-Check: "Triggert setState einen Key-Prop oder wichtigen Dependency?"

### 🔴 Rule 5.37: Component Usage Chain Verification
Vor Implementierung: Grep nach Verwendung der Ziel-Komponente im Feature-Path. Call-Chain tracken (UI → Wrapper → Proxy → Target). Richtige Komponente identifizieren, bevor Code geschrieben wird.

---

## 🛠️ Implementation Guidelines

### Database (Actions & Finders)
- **Actions** (`db/actions/`): Alle mutations, MUSS `"use server"` haben
- **Finders** (`db/finders/`): Alle queries, MUSS `"use server"` haben
- **Auth:** `getCurrentProfile()` aus `profile-finder` statt auth-Methoden
- **User vs Profile:** User nur für Auth, Profile für alles andere

### API Response Format
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### State Management
- **Server State:** Next.js caching + Server Components
- **Form State:** React Hook Form
- **Optimistic Updates:** `useState` (nicht `useOptimistic`)
- **Theme/Language:** React Context providers

### Error Handling
- Toast notifications für User-facing errors
- Error Boundaries für component crashes
- Input validation inline (keine libraries)

### Frontend Animation
- **Expand/Collapse:** CSS Grid `grid-rows-[1fr]` (expanded) / `grid-rows-[0fr]` (collapsed) mit `transition-all duration-300` + `overflow-hidden` für smooth height transitions
- FadeContent-Komponente einbauen (siehe `shared-docs\refactoring-docs\prompts\universal-fadeContent-refactoring-prompt.md`)
---

## 🎨 Design System

### Theme System
- **CSS Custom Properties:** Dynamic colors (`--primary`, `--accent`)
- **Glassmorphism:** `glass-card`, `backdrop-blur-sm/md`
- **Gradients:** Three-color gradients (primary-dark → primary → primary-light)

### Component Classes
- **Cards:** `glass-card`, `bg-card/50 backdrop-blur-sm`
- **Buttons:** `bg-gradient-primary`, `hover:glow-primary`
- **Borders:** `border-primary/10` to `border-primary/20`
- **Text Gradients:** `text-gradient-primary`, `bg-clip-text text-transparent`

### Style Files
- `app/globals.css` - CSS variables, utilities
- `styles/themes/*.css` - Theme-specific colors
- `styles/themes/effects.css` - Glassmorphism, glows

---

## 📚 Documentation System

### Structure
- **Master-Navigation:** `docs/OVERVIEW.md` - Komplette App-Übersicht
- **Feature-Docs:** `docs/[feature]/[feature]-overview.md`
- **Sub-Features:** `docs/[feature]/features/[sub-feature].md`
- **Task-History:** `docs/[feature]/tasks/[datum]-[task].md`

### Update-Rules
- **Feature-Overview:** Bei großen Änderungen updaten
- **Sub-Features:** Komponenten-Details erweitern
- **Task-History:** Auf "abgeschlossen" setzen
- **Master-Navigation:** Nur bei sehr großen Änderungen

---

## ✅ Quick Checklist

Vor jedem Commit:
- [ ] `npx tsc --noEmit` läuft ohne Fehler
- [ ] Ungenutzter Code entfernt (imports, functions, variables)
- [ ] Mobile-First Design geprüft
- [ ] Edge Cases berücksichtigt (empty states, errors, loading)
- [ ] Server Actions haben `"use server"`
- [ ] Suspense boundaries für async components
- [ ] Static UI (Header) außerhalb Suspense
- [ ] Descriptive comments für functions/components
- [ ] Max 400 lines per file eingehalten

---

**🔗 Weiterführende Docs:**
- `shared-docs/performance/tab-component-performance-antipattern.md`
- `shared-docs/design/responsive-dialog-architecture.md`
- `shared-docs/refactoring-docs/patterns/animated-loading-states.md`
- `shared-docs/refactoring-docs/patterns/multi-level-data-fetching.md`
- `shared-docs/postmortem/open-dialogs-right-way-useffect-windowEventListener.md`
#### Revalidate-Sicherheitsregel (Remount-Loop Prävention)
- Verwende `revalidatePath` NICHT bei Autosave- oder hochfrequenten Updates, wenn ein Editor/komplexe Client-UI gerade gemountet ist (z. B. `/notes`).
- Stattdessen:
  - Server-Action: Nur schreiben (kein Revalidate). Optional aktualisierte Entität zurückgeben.
  - Client: Lokalen Zustand aktualisieren (`onSaved()`), Cache markieren (`invalidateCache(id, 'note' | 'diagram')`), optional gezieltes `refreshData()` aus dem Context aufrufen.
- `revalidatePath` nur für: Create/Delete, explizite Nutzeraktionen, oder wenn ein Navigationswechsel unmittelbar folgt.
- Hintergrund: `revalidatePath` invalidiert die Route und verursacht Remounts → bei Autosave führt das zu Endlosschleifen. Siehe: `shared-docs/postmortem/revalidatepath-autosave-remount-loop-postmortem.md`.
