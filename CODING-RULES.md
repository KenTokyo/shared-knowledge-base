# 🎯 Coding Rules & Development Guidelines

**Zweck:** Essentielle Regeln für konsistente, performante und wartbare Code-Entwicklung.

---

## Regel 1: Workflow & Arbeitsweise

### 1.1 Vor dem Start
- **Vorhaben präsentieren:** Formatiert mit Icons, klare Struktur
- **Größere Aufgaben:** Plan in `docs/[feature]/tasks/[datum]-[feature]-plan.md` erstellen
- **Code-Reuse prüfen:** ERST nach existierenden Funktionen/Components mit `Grep` suchen
- **Testing:** Nur `npx tsc --noEmit` verwenden (❌ kein `npm run dev/build`)
- Sei immer hochmotiviert, liefere schön formatierte motivierende Antworten, wenn möglich sinnvolle Icons einbauen und antworte in Deutsch
- Sollte dir gesagt werden, dass du mehr oder alle phasen programmieren sollst, dann mach das bitte auch direkt statt nach einer Phase aufzuhören

### 1.2 🚨 Planungs-Regel: Kein Code in Planungsdokumenten
**KRITISCH:** Planungsdokumente dürfen NIEMALS vollständigen Code enthalten!
- ✅ **ERLAUBT:** Konzepte, Architektur, Dateipfade, API-Signaturen (max 3-5 Zeilen Pseudo-Code)
- ❌ **VERBOTEN:** Vollständige Implementierungen, Code-Blöcke >10 Zeilen
- **Ziel:** Max 500-800 Zeilen pro Plan (WAS und WARUM, nicht WIE im Detail)

### 1.3 Kritisches Denken (Edge Cases)
Proaktiv denken: Extrem-Fälle, falsches User-Verhalten, Performance-Probleme, Concurrent Access, Browser/Device-Unterschiede, Security, UX-Issues.

### 1.4 Nach Abschluss
- **Plan aktualisieren:** Phase als ✅ markieren, kurz dokumentieren (was/warum, Edge-Cases)
- **Dokumentation erweitern:** `docs/[feature]/[feature]-overview.md` bei großen Änderungen
- **Motivierende Zusammenfassung:** Icons, exakte Dateipfade, abgeschlossene Phase nennen

---

## Regel 2: Architektur & Dateistruktur

### 2.1 🚨 Component-Based Architecture (WICHTIGSTE REGEL)
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!**

❌ **VERBOTEN:** `const NestedComponent = () => <div>Bad</div>` innerhalb Parent-Component

**Warum?** Performance-Killer (jedes Render neu erstellt) + State-Verlust + Unmöglich zu testen

✅ **RICHTIG:** Jede Komponente in separater Datei

### 2.2 Component Organization (Section-Based)
**Maximal 700 Zeilen Code pro Datei** - Teile/Auslagern in unterkomponenten in (Ordnern)/in helpers/services/compontens wenn größer

✅ **Section-Based Structure:**
```
app/feature/[param]/
├── (mainSection)/
│   ├── (subSection)/
│   │   ├── AktionButton.tsx
│   │   └── KonfigPanel.tsx
│   └── MainSection.tsx          ← Section orchestrator
└── page.tsx
```

❌ **Anti-Pattern:** Flat "components" Junk Drawer (keine Struktur, nicht skalierbar)

### 2.3 Component Naming Convention
**Button-Text = File-Name:** "Speichern" button → `SpeichernButton.tsx`

**Component Types:** `Section.tsx` (orchestrates), `Panel.tsx` (input/config), `Dialog.tsx` (modal), `Button.tsx` (trigger), `Card.tsx` (reusable block), `Item.tsx` (list element)

**Sprach-Konvention:**
- 🇩🇪 **DEUTSCH (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **ENGLISCH (Technical):** Section, Card, Item → `ReviewSection.tsx`

---

## Regel 3: Next.js App Router

### 3.1 Server vs Client Components
- **Default:** Server Components (kein `"use client"`)
- **"use client" nur für:** `useState`, `useEffect`, event listeners, browser APIs
- **Platzierung:** An der "leaf" des Component Tree, nicht in Root Layouts
- **Pattern:** Server Components als `children` an Client Components übergeben

### 3.2 Data Fetching
- ✅ **DO:** Direct fetching in Server Components mit `async/await`
- ✅ **DO:** Parallel fetching mit `Promise.all` (verhindert waterfalls)
- ✅ **DO:** `use()` Hook Pattern für Client Components + Suspense
- ❌ **DON'T:** `useEffect` für initial data fetching (slow, waterfalls)
- ❌ **DON'T:** Unnecessary API routes für simple data retrieval

**Best Practice - `use()` Hook Pattern:**
Server Component fetcht Daten als Promise (nicht awaiten!), Client Component resolved mit `use(dataPromise)`.

### 3.3 Data Mutations
- **Server Actions:** Alle Mutations (forms, updates, deletions)
- **UI Updates:** `revalidatePath('/')` oder `revalidateTag('tag')` nur bei geeigneten Fällen
- **Security:** ⚠️ IMMER User-Input validieren + Session mit `getCurrentProfile()` prüfen

### 3.4 🚨 Optimistic UI Pattern (MANDATORY für Dialog/Modal-Mutations)

> **⚡ STANDARD-REGEL für alle CRUD-Operationen (Create, Update, Delete) in modalen Kontexten!**

**Problem:** `revalidateTag()` triggert Next.js Router Cache Refresh → 3-10+ Sekunden Hard-Refresh, Dialog flasht/schließt!

**Lösung - Optimistic UI ohne revalidateTag:**
```
✅ RICHTIG:
1. Server Action speichert in DB → gibt erstellte Daten zurück
2. KEIN revalidateTag() Aufruf
3. Client setzt lokalen State SOFORT mit Response-Daten
4. UI ist instant aktualisiert (< 100ms)

❌ FALSCH:
1. Server Action speichert + revalidateTag() → Hard Refresh!
```

**Implementation:**
```typescript
// Server Action (OPTIMISTIC)
export async function createItemOptimistic(data) {
  const [created] = await db.insert(items).values(data).returning();
  // ⚡ KEIN revalidateTag()!
  return { success: true, data: created };
}

// Client Handler
const handleCreate = async (data) => {
  const result = await createItemOptimistic(data);
  if (result.success) {
    setItems(prev => [...prev, result.data]); // ← INSTANT!
    toast({ title: "Erstellt!" });
  }
};
```

**Cross-Component Updates via Events:**
```typescript
window.dispatchEvent(new CustomEvent('itemUpdated', {
  detail: { item: result.data, action: 'create' | 'update' | 'delete' }
}));
```

**Cache-Invalidierung:** LAZY bei Dialog-Close oder Page-Navigation, NIEMALS während aktiver UI!

**Referenz:** `shared-docs/refactoring-docs/global-coding-rules.md` Rule 1.4

### 3.5 Loading & Rendering
- **Suspense:** `loading.tsx` für Route-Level, `<Suspense>` für Component-Level
- **Re-trigger Suspense:** Key prop nutzen: `<Suspense key={query}>`
- **Static-First:** Statische UI (Header, Navigation) AUSSERHALB Suspense (0ms render)
- **Hydration:** Server und Client initial UI müssen identisch sein

### 3.6 🔴 Client Provider Wrapper Pattern (MANDATORY)
**Problem:** RootLayout (Server Component) darf NICHT direkt 5+ Client Components importieren → Client Manifest Build-Fehler

**Lösung:** Alle Client-Provider in ONE Client-Component (`ClientProviders.tsx`) wrappen, diese dann in RootLayout importieren.

---

## Regel 4: React Best Practices

### 4.1 State & Props
- **Immutable State:** Functional updates: `setState(prev => ...)`
- **List Keys:** Stable, unique `key` prop für `.map()` items
- **State vs Ref:** `useState` = re-render, `useRef` = no re-render

### 4.2 Performance
- **Memoization:** `useMemo` (expensive calculations), `useCallback` (functions as props), `React.memo` (components)
- **UI Blocking:** Expensive computations in `useMemo` oder web worker auslagern

### 4.3 Effects & Lifecycle
- **Cleanup:** IMMER cleanup function bei subscriptions/timers/listeners
- **Dependency Array:** Accurate dependencies, `[]` = mount only, none = every render
- **Avoid Unnecessary Effects:** Derive from props/state during render wenn möglich

### 4.4 Error Handling
- **Error Boundaries:** Wrap critical trees, catch rendering errors, show fallback

### 4.5 Component Communication
**Pattern-Auswahl:**
- **Parent↔Child:** Props down, Callbacks up (Standard)
- **2-3 Levels:** Lifting State Up (State im gemeinsamen Parent)
- **3+ Levels:** Context API (vermeidet Props-Drilling)

**Anti-Patterns:** ❌ Props-Drilling >3 Levels, ❌ Context für lokalen State, ❌ Duplizierter State

**Referenz:** `shared-docs/react-core-communication-patterns.md`

---

## Regel 5: Design Patterns

### 5.1 Tab Components Performance
**Problem:** Jeder Tab macht eigenen Fetch → 1000ms+ Ladezeit bei Tab-Wechsel

**Lösung:** Parent fetcht alle Daten, Props an Tabs weitergeben. NIEMALS flüchtige Keys (`Math.random()` im Render).

### 5.2 Responsive Dialogs
**Controller Pattern:** Separate Components für Desktop/Mobile
- `[Feature]Dialog.tsx` - Desktop
- `Mobile[Feature]Dialog.tsx` - Mobile
- `[Feature]DialogController.tsx` - Logic + Device-Detection

### 5.3 Theme-Stil: Neon-Glasmorphism
Neon-orientierter Glasmorphism-Stil: Gradients, Glows aus CSS-Variablen (`--primary`, `--accent-*`) – **keine hardcodierten Hex-Farben**. Karten nutzen `glass-card`, `neon-glass` mit Blur/Glow-Layern.

### 5.4 🔴 Liquid Glass Card Design (3-Layer-System)

```tsx
<Card className="relative overflow-hidden bg-[#030303] border-white/5">
  {/* Layer 1: Deep Black Base (z-0) */}
  <div className="absolute inset-0 bg-black/60 z-0" />

  {/* Layer 2: Texture - Grain ODER Grid (z-0) */}
  <div className="absolute inset-0 z-0 pointer-events-none mix-blend-soft-light"
    style={{maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 0%, transparent 100%)'}}>
    <div className="absolute inset-0 liquid-grain-ultra opacity-30" />
  </div>

  {/* Layer 3: Punkt-Glow - WICHTIG: z-[1] über Background! */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-[1] pointer-events-none">
    <div className="absolute inset-0 bg-[FARBE]/60 blur-[50px] rounded-full" />
  </div>

  {/* Content (z-10) */}
  <div className="relative z-10 p-4">...</div>
</Card>
```

**Texture-Varianten:**
- **Ultra-Grain:** `liquid-grain-ultra opacity-30` + `mix-blend-soft-light`
- **Fine-Grid:** `liquid-grid-fine opacity-40`
- **Dots:** `liquid-dots-bg opacity-25` + `mix-blend-overlay`

**Punkt-Glow Farben:** Allgemein=indigo-500, Ernährung=orange-500, Training=emerald-500, Cardio=blue-500, Notizen=purple-500, Netzwerk=cyan-500 (alle `/60`, `blur-[50px]`, `z-[1]`)

❌ **Anti-Pattern:** Breiter Beam-Glow horizontal, Punkt-Glow mit `z-0` (unsichtbar!), Grain UND Grid gleichzeitig

---

## Regel 6: Network Performance (CRITICAL)

### 6.1 🔴 Client-Side Fetch Anti-Pattern
Client-Components: KEIN initial Data-Fetching via `useEffect`! → Server-Side Pre-Fetch + Props ODER `use()` Hook + Suspense

### 6.2 🔴 Waterfall-Fetching Prevention
Unabhängige Fetches parallel: `Promise.all([fetch1(), fetch2()])` statt sequential `await`

### 6.3 🔴 Request-Deduplizierung
Identische Fetches deduplizieren: React `cache()` wrapper (Server), Singleton-Pattern (Client)

### 6.4 🔴 Polling Cleanup
Jeder `useEffect` mit Timers/Subscriptions MUSS Cleanup-Function haben: `return () => clearInterval(id)`

### 6.5 🔴 N+1 Query Prevention
Nested Queries in Loops → Batch-Loading mit JOINs oder `inArray(itemIds)`

### 6.6 🔴 Progressive Data Loading
Level 1 (Critical 0-500ms, KEIN Suspense) → Level 2 (Important, MIT Suspense) → Level 3 (Lazy on-demand)

---

## Regel 7: Kritische Anti-Patterns (MUST AVOID)

### 7.1 🔴 Context Analysis Before Changes
Vor Änderungen: Letzte 3-4 Tasks analysieren. Warum wurden diese Änderungen gemacht? Würde meine Änderung diese brechen?

### 7.2 🔴 Legacy Code Removal
Nach jeder Änderung SOFORT ungenutzten Code entfernen.

### 7.3 🔴 Dialog-EventListener-Pattern
Dialoge in Layout-kritischen Komponenten (Navbar, Header) über `useEffect + window.addEventListener` öffnen (verhindert Layout-Collapse).

### 7.4 🔴 Scroll Height Dependency
`overflow-auto` braucht definierte Höhe! `flex-1` allein reicht nicht. Fix: `h-[75vh]` oder `isDialog`-Props.

### 7.5 🔴 will-change Font-Killer
Niemals `will-change: transform, opacity`! Zerstört Font-Rendering.

### 7.6 🔴 Mobile-First Space Efficiency
UI MUSS Mobile-First designed werden: Maximale Space-Efficiency, Input-Felder nebeneinander in FlexRow wenn möglich, kleinere Abstände.

### 7.7 🔴 Page-Level Data-Separation
Header als pure HTML, Data-Logic in `MainContent` mit Suspense (Header rendert instant 0ms).

### 7.8 🔴 Direct Action Principle
Action-Buttons führen ihre Funktion DIREKT aus (1 Klick = 1 Action). Multi-Step Components brauchen `initialView` Prop.

### 7.9 🔴 FadeContent Dialog Conditional Rendering
FadeContent Components MÜSSEN conditional gerendert werden bei Dialog-Wrapping:
- ❌ `<FadeContent><Dialog isOpen={isOpen} /></FadeContent>`
- ✅ `{isOpen && <FadeContent><Dialog /></FadeContent>}`

### 7.10 🔴 State-Changes During Active UI
State-Updates, die Component-Remount triggern, NICHT während aktiver UI-Interaktion.

### 7.11 🔴 TabContent Height-Constraint Anti-Pattern
Tab-Content darf NICHT `h-full` oder `flex flex-col` im Root-Div verwenden → Layout-Collapse! Simple Container: `<div className="space-y-2 pt-3 pb-6 px-4">`

### 7.12 🔴 Single-Scroll-Container in Dialog-Tabs
In Dialogen genau EINEN Scroll-Container. Child-Sections KEINE eigenen `h-full`/`flex`/`overflow`. Suche nach `h-full`, `overflow-auto` in Tab-Sections und entferne diese.

### 7.13 🔴 tailwindcss-animate Reserved Class Names
NIEMALS eigene CSS-Klassen mit Namen von `tailwindcss-animate` Plugin erstellen: `animate-in/out`, `fade-in/out-*`, `zoom-in/out-*`, `slide-in/out-*` sind reserviert! Eigener Prefix: `fm-fade-in`, etc.

### 7.14 🔴 State-Persistence Decision Pattern
Vor `useEffect(() => { saveToServer(state) }, [state])` entscheide Pattern:
- **Kontinuierlich (>10x/s):** Explicit Save (bei `onDragEnd`)
- **Frequent (1-10x/s):** Debounced Save (1000ms)
- **Occasional (<1x/s):** Throttled Save (300ms)
- **On-Demand (Click):** Immediate Save

### 7.15 🔴🔴🔴 revalidateTag Hard-Refresh Killer (HÖCHSTE PRIORITÄT)
**Problem:** `revalidateTag()` oder `revalidatePath()` in Server Actions triggert **FULL PAGE REFRESH** (3-10+ Sekunden!):
- Next.js invalidiert Router Cache
- Server Components werden komplett neu gefetcht
- React Client-States werden zurückgesetzt
- Dialoge schließen sich, Forms verlieren State

**Lösung - Optimistic UI Pattern:**
```typescript
// ❌ VERBOTEN in Dialogs/Modals:
revalidateTag(`items-${userId}`);

// ✅ PFLICHT - Optimistic Update:
return { success: true, data: createdItem }; // Daten zurückgeben
// Client updated lokalen State INSTANT
```

**STANDARD für alle CRUD in modalen Kontexten!** Siehe Rule 3.4 und `global-coding-rules.md` Rule 1.4.

---

## Regel 8: Implementation Guidelines

### 8.1 Database (Actions & Finders)
- **Actions** (`db/actions/`): Alle mutations, MUSS `"use server"` haben
- **Finders** (`db/finders/`): Alle queries, MUSS `"use server"` haben
- **Auth:** `getCurrentProfile()` aus `profile-finder` statt auth-Methoden

### 8.1.1 🔴 Database Seeding Scripts
Seed-Skripte MÜSSEN `"dotenv/config"` importieren + via `npx tsx` ausgeführt werden:
```typescript
import "dotenv/config"; // IMMER Zeile 1
import db from "../db";
```
Ausführung: `npx tsx scripts/seed-[name].ts`

### 8.2 API Response Format
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### 8.3 State Management
- **Server State:** Next.js caching + Server Components
- **Form State:** React Hook Form
- **Optimistic Updates:** `useState` (nicht `useOptimistic`)
- **Theme/Language:** React Context providers

### 8.4 Error Handling
- Toast notifications für User-facing errors
- Error Boundaries für component crashes
- Input validation inline (keine libraries)

### 8.5 Frontend Animation
- **Expand/Collapse:** CSS Grid `grid-rows-[1fr]` (expanded) / `grid-rows-[0fr]` (collapsed) mit `transition-all duration-300`
- FadeContent-Komponente einbauen (siehe `shared-docs\refactoring-docs\prompts\universal-fadeContent-refactoring-prompt.md`)

---

## Regel 9: Design System

### 9.1 Dark Mode Glassmorphism Design Pattern
Tiefschwarze Hintergründe, Subtile Neon-Glows, Glassmorphism-Ränder, Inset-Highlights, Gradient-Texte

### 9.2 Theme System
- **CSS Custom Properties:** `--primary`, `--accent`
- **Glassmorphism:** `glass-card`, `backdrop-blur-sm/md/2xl`
- **Gradients:** Three-color gradients (primary-dark → primary → primary-light)

### 9.3 Component Classes
- **Cards:** `glass-card`, `bg-card/50 backdrop-blur-sm`
- **Buttons:** `bg-gradient-primary`, `hover:glow-primary`
- **Borders:** `border-primary/10` to `border-primary/20`

### 9.4 🔴 Vertical Space Efficiency (Notion-Style Compact)
UI MUSS vertikales Spacing minimieren:
```tsx
// ✅ RICHTIG: Alles in EINER Zeile
<div className="flex items-center gap-2 py-1.5 min-h-[44px] sm:min-h-[36px]">
  <span className="text-sm">Titel</span>
  <span className="text-xs text-gray-500">·</span>
  <span className="text-xs truncate max-w-[200px]">Beschreibung</span>
</div>
```

---

## Regel 10: Documentation System

**Structure:** `docs/OVERVIEW.md` → `docs/[feature]/[feature]-overview.md` → `docs/[feature]/tasks/[datum]-[task].md`

**Update-Rules:** Feature-Overview bei großen Änderungen, Task-History auf "abgeschlossen" setzen.

---

## Regel 11: Sonstige Kurzregeln

### 11.1 Revalidate-Sicherheitsregel
❌ `revalidatePath` bei Autosave/hochfrequent. ✅ Nur bei Create/Delete/expliziten Actions.

### 11.2 Loading-Feedback
**Nicht gecached:** `isLoading=true` + Skeleton. **Gecached:** UI direkt updaten.

### 11.3 Container-Child Size Verification
Bei Height-Reduktion Child-Padding prüfen! Container `h-8` (32px) → Child `py-0.5` (4px total).

### 11.4 🔴 Number Input Empty-State Handling
HTML `<input type="number">` darf NIEMALS `value={0}` bei ungültigem 0:
```tsx
// ✅ RICHTIG
<Input
  type="number"
  value={field === 0 ? "" : field}
  onChange={(e) => {
    const value = e.target.value;
    handleChange("field", value === "" ? undefined : Number(value));
  }}
/>
```

---

## ✅ Quick Checklist

Vor Commit: `npx tsc --noEmit`, ungenutzter Code entfernt, Mobile-First, Edge Cases, Server Actions `"use server"`, Suspense boundaries, Static UI außerhalb Suspense, max 700 lines/file.

**⚡ Bei CRUD in Dialogen/Modals:** Optimistic UI Pattern! KEIN `revalidateTag()` → Daten zurückgeben → lokaler State Update → INSTANT UI.

---

**🔗 Weiterführende Docs:** `shared-docs/performance/`, `shared-docs/design/`, `shared-docs/postmortem/`, `shared-docs/ux/`
