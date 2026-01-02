# 🎯 Coding Rules & Development Guidelines

**Zweck:** Essentielle Regeln für konsistente, performante und wartbare Code-Entwicklung.

---

## Regel 1: Workflow & Arbeitsweise

### 1.1 Vor dem Start
- **Vorhaben präsentieren:** Formatiert mit Icons, klare Struktur
- **Größere Aufgaben:** Plan in `docs/[feature]/tasks/[datum]-[feature]-plan.md` erstellen
- **Code-Reuse prüfen:** ERST nach existierenden Funktionen/Components mit `Grep` suchen
- **Testing:** Nur `npx tsc --noEmit` verwenden (❌ kein `npm run dev/build`)
- **Neue Finder/Actions:** Vor Merge mit Live-DB testen! → **Siehe `shared-docs/database-testing-guide.md`**
- Sei immer hochmotiviert, liefere schön formatierte motivierende Antworten mit Icons in Deutsch
- **Einfache Sprache:** Erkläre jeden Schritt wie einer guten Freundin – ohne Fachjargon, kurze Sätze, klare Beispiele
- Sollte dir gesagt werden, dass du mehr oder alle Phasen programmieren sollst, dann mach das bitte auch direkt!

### 1.2 🚨 Planungs-Regel: Kein Code in Planungsdokumenten
**KRITISCH:** Planungsdokumente dürfen NIEMALS vollständigen Code enthalten!
- ✅ **ERLAUBT:** Konzepte, Architektur, Dateipfade, API-Signaturen (max 3-5 Zeilen Pseudo-Code)
- ❌ **VERBOTEN:** Vollständige Implementierungen, Code-Blöcke >10 Zeilen
- **Ziel:** Max 500-800 Zeilen pro Plan (WAS und WARUM, nicht WIE im Detail)

### 1.3 Kritisches Denken (Edge Cases)
Proaktiv denken: Extrem-Fälle, falsches User-Verhalten, Performance-Probleme, Concurrent Access, Browser/Device-Unterschiede.

### 1.4 Nach Abschluss
- **Plan aktualisieren:** Phase als ✅ markieren, kurz dokumentieren
- **Dokumentation erweitern:** `docs/[feature]/[feature]-overview.md` bei großen Änderungen
- **Motivierende Zusammenfassung:** Icons, exakte Dateipfade, abgeschlossene Phase nennen

---

## Regel 2: Architektur & Dateistruktur

### 2.1 🚨 Component-Based Architecture (WICHTIGSTE REGEL)
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!**
- ❌ `const NestedComponent = () => <div>Bad</div>` innerhalb Parent-Component
- **Warum?** Performance-Killer (jedes Render neu erstellt) + State-Verlust
- ✅ Jede Komponente in separater Datei

### 2.2 Component Organization
**Maximal 700 Zeilen Code pro Datei** - Auslagern in Unterkomponenten/helpers/services wenn größer

```
app/feature/[param]/
├── (mainSection)/
│   ├── (subSection)/
│   │   └── AktionButton.tsx
│   └── MainSection.tsx
└── page.tsx
```

### 2.3 Component Naming Convention
- **Button-Text = File-Name:** "Speichern" button → `SpeichernButton.tsx`
- 🇩🇪 **DEUTSCH (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **ENGLISCH (Technical):** Section, Card, Item → `ReviewSection.tsx`

---

## Regel 3: Next.js App Router

### 3.1 Server vs Client Components
- **Default:** Server Components (kein `"use client"`)
- **"use client" nur für:** `useState`, `useEffect`, event listeners, browser APIs
- **Platzierung:** An der "leaf" des Component Tree, nicht in Root Layouts

### 3.2 Data Fetching
- ✅ Direct fetching in Server Components mit `async/await`
- ✅ Parallel fetching mit `Promise.all` (verhindert waterfalls)
- ✅ `use()` Hook Pattern für Client Components + Suspense
- ❌ `useEffect` für initial data fetching

### 3.3 Data Mutations
- **Server Actions:** Alle Mutations, MUSS `"use server"` haben
- **Security:** ⚠️ IMMER User-Input validieren + Session mit `getCurrentProfile()` prüfen

### 3.4 🚨 Optimistic UI Pattern (MANDATORY für Dialoge/Modals)

> **⚡ STANDARD für alle CRUD-Operationen in modalen Kontexten!**

**Problem:** `revalidateTag()` triggert Next.js Router Cache Refresh → 3-10+ Sekunden Hard-Refresh, Dialog flasht/schließt!

**Lösung:**
```typescript
// Server Action - KEIN revalidateTag()!
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
window.dispatchEvent(new CustomEvent('itemUpdated', { detail: result.data }));
```

### 3.5 Loading & Rendering
- **Suspense:** `loading.tsx` für Route-Level, `<Suspense>` für Component-Level
- **Static-First:** Statische UI (Header, Navigation) AUSSERHALB Suspense (0ms render)

### 3.6 🔴 Client Provider Wrapper Pattern
Alle Client-Provider in ONE Client-Component (`ClientProviders.tsx`) wrappen, diese dann in RootLayout importieren.

---

## Regel 4: React Best Practices

### 4.1 State & Props
- **Immutable State:** Functional updates: `setState(prev => ...)`
- **List Keys:** Stable, unique `key` prop für `.map()` items
- **State vs Ref:** `useState` = re-render, `useRef` = no re-render

### 4.2 Performance
- **Memoization:** `useMemo` (expensive calculations), `useCallback` (functions as props), `React.memo` (components)

### 4.3 Effects & Lifecycle
- **Cleanup:** IMMER cleanup function bei subscriptions/timers/listeners
- **Dependency Array:** Accurate dependencies, `[]` = mount only

### 4.4 Component Communication
- **Parent↔Child:** Props down, Callbacks up (Standard)
- **2-3 Levels:** Lifting State Up
- **3+ Levels:** Context API (vermeidet Props-Drilling)
- **Referenz:** `shared-docs/react-core-communication-patterns.md`

---

## Regel 5: Design Patterns

### 5.1 Tab Components Performance
Parent fetcht alle Daten, Props an Tabs weitergeben. NIEMALS flüchtige Keys (`Math.random()` im Render).

### 5.2 Responsive Dialogs (Controller Pattern)
- `[Feature]Dialog.tsx` - Desktop
- `Mobile[Feature]Dialog.tsx` - Mobile
- `[Feature]DialogController.tsx` - Logic + Device-Detection

### 5.3 Theme-Stil: Neon-Glasmorphism
Neon-orientierter Glasmorphism-Stil: Gradients, Glows aus CSS-Variablen (`--primary`, `--accent-*`) – **keine hardcodierten Hex-Farben**.

### 5.4 🎨 Liquid Glass Design
> **Vollständige Doku:** `shared-docs/design/liquid-glass-guide.md`

**Kern-Prinzipien:**
- **Tiefe:** `bg-black/40`, `backdrop-blur-xl`, `box-shadow` mit `inset`
- **Licht als Akzent:** `blur-[50px]` Punkt-Glows, Status-Farben
- **Muted Buttons:** `orange-500/20` statt `bg-orange-500` (solid zerstört Glass-Effekt!)

### 5.5 🔴 Liquid Glass Card (3-Layer-System)
1. Deep Black Base (`bg-black/60`, `z-0`)
2. Texture - Grain ODER Grid (`z-0`)
3. Punkt-Glow (`blur-[50px]`, `z-[1]` - ÜBER Background!)
4. Content (`z-10`)

**Farben:** indigo=Allgemein, orange=Ernährung, emerald=Training, blue=Cardio, purple=Notizen

---

## Regel 6: Network Performance (CRITICAL)

### 6.1 🔴 Client-Side Fetch Anti-Pattern
Client-Components: KEIN initial Data-Fetching via `useEffect`! → Server-Side Pre-Fetch + Props

### 6.2 🔴 Waterfall-Fetching Prevention
Unabhängige Fetches parallel: `Promise.all([fetch1(), fetch2()])`

### 6.3 🔴 Polling Cleanup
Jeder `useEffect` mit Timers/Subscriptions MUSS Cleanup-Function haben

### 6.4 🔴 N+1 Query Prevention
Nested Queries in Loops → Batch-Loading mit JOINs oder `inArray(itemIds)`

---

## Regel 7: Kritische Anti-Patterns (MUST AVOID)

### 7.1 🔴 Context Analysis Before Changes
Vor Änderungen: Letzte 3-4 Tasks analysieren. Würde meine Änderung diese brechen?

### 7.2 🔴 Legacy Code Removal
Nach jeder Änderung SOFORT ungenutzten Code entfernen.

### 7.3 🔴 Dialog-EventListener-Pattern
Dialoge in Layout-kritischen Komponenten über `useEffect + window.addEventListener` öffnen.

### 7.4 🔴 Scroll Height Dependency
`overflow-auto` braucht definierte Höhe! `flex-1` allein reicht nicht. Fix: `h-[75vh]` oder `isDialog`-Props.

### 7.5 🔴 will-change Font-Killer
Niemals `will-change: transform, opacity` permanent auf Containern mit Text! Nur während aktiver Interaktion.

### 7.6 🔴 Mobile-First Space Efficiency
UI MUSS Mobile-First designed werden: Maximale Space-Efficiency, kleinere Abstände.

### 7.7 🔴 Page-Level Data-Separation
Header als pure HTML, Data-Logic in `MainContent` mit Suspense.

### 7.8 🔴 FadeContent Dialog Conditional Rendering
- ❌ `<FadeContent><Dialog isOpen={isOpen} /></FadeContent>`
- ✅ `{isOpen && <FadeContent><Dialog /></FadeContent>}`

### 7.9 🔴 TabContent Height-Constraint Anti-Pattern
Tab-Content darf NICHT `h-full` oder `flex flex-col` im Root-Div verwenden → Layout-Collapse!

### 7.10 🔴 tailwindcss-animate Reserved Class Names
NIEMALS eigene CSS-Klassen mit tailwindcss-animate Namen (`animate-in`, `fade-in-*`). Eigener Prefix: `fm-fade-in`

### 7.11 🔴 revalidateTag Hard-Refresh Killer
❌ `revalidateTag()` in Dialogen/Modals → Full Page Refresh!
✅ Optimistic UI Pattern (siehe Regel 3.4)

### 7.12 🔴 Stale Closure Pattern
> **Vollständige Doku:** `shared-docs/react-patterns/stale-closure-pattern.md`

```typescript
// ❌ FALSCH - habits ist noch ALTER State!
setHabits(prev => prev.map(h => ...));
onHabitsUpdate?.(habits);

// ✅ RICHTIG - Callback mit neuen Daten
setHabits(prev => {
  const updated = prev.map(h => ...);
  onHabitsUpdate?.(updated);
  return updated;
});
```

### 7.13 🔴 Wiederverwendbarkeit-First
Dialoge MÜSSEN für Wiederverwendung designed werden: Props für Modi (`mode: 'create' | 'edit'`), Callback-Props.

---

## Regel 8: Implementation Guidelines

### 8.1 Database (Actions & Finders)
- **Actions** (`db/actions/`): Alle mutations, MUSS `"use server"` haben
- **Finders** (`db/finders/`): Alle queries, MUSS `"use server"` haben
- **Auth:** `getCurrentProfile()` aus `profile-finder`

### 8.2 🔴 Database-First Logic
> **Vollständige Doku:** `shared-docs/database-testing-guide.md`

- ✅ Filter: `WHERE` statt `.filter()` im Client
- ✅ Sortierung: `ORDER BY` statt `.sort()` im Client
- ✅ Pagination: `LIMIT/OFFSET` statt alles laden
- ⚠️ **PFLICHT:** Neue Queries mit `npx tsx scripts/test-[feature].ts` testen!

### 8.3 API Response Format
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### 8.4 State Management
- **Server State:** Next.js caching + Server Components
- **Form State:** React Hook Form
- **Optimistic Updates:** `useState` (nicht `useOptimistic`)

### 8.5 Frontend Animation
- **Expand/Collapse:** CSS Grid `grid-rows-[1fr]` / `grid-rows-[0fr]` mit `transition-all duration-300`
- FadeContent-Komponente nutzen

---

## Regel 9: Design System

### 9.1 Dark Mode Glassmorphism
Tiefschwarze Hintergründe, Subtile Neon-Glows, Glassmorphism-Ränder, Inset-Highlights

### 9.2 Theme System
- **CSS Custom Properties:** `--primary`, `--accent`
- **Glassmorphism:** `glass-card`, `backdrop-blur-sm/md/2xl`

### 9.3 🔴 Vertical Space Efficiency (Notion-Style)
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

---

## Regel 11: Sonstige Kurzregeln

### 11.1 Revalidate-Sicherheitsregel
❌ `revalidatePath`/`revalidateTag` bei Autosave/hochfrequent
❌ **NIEMALS** in Dialogen/Modals → Optimistic UI!
✅ Nur auf Page-Ebene bei expliziten Actions

### 11.2 Loading-Feedback
**Nicht gecached:** `isLoading=true` + Skeleton. **Gecached:** UI direkt updaten.

### 11.3 🔴 Number Input Empty-State
```tsx
<Input
  type="number"
  value={field === 0 ? "" : field}
  onChange={(e) => handleChange("field", e.target.value === "" ? undefined : Number(e.target.value))}
/>
```

---

## 12. 📱 Mobile/Capacitor Performance-Regeln

> **Vollständige Doku:** `shared-docs/performance/capacitor-performance-rules.md`

### 12.1 🔴 KRITISCH: backdrop-filter ist VERBOTEN!
- ❌ `backdrop-blur-*` auf Mobile automatisch deaktiviert (capacitor.css)
- ✅ `filter: blur(50px)` für Punkt-Glows ist OK

### 12.2 🔴 Ghost-Blobs Fix
Bei Rendering-Artefakten auf Capacitor entferne:
- `blur-[90px]`, `mix-blend-multiply`
- Icon-Glows `shadow-[0_0_Xpx]`
- Gradient-Overlays

→ **Siehe `shared-docs/performance/capacitor-performance-rules.md`** Abschnitt 4

### 12.3 🔴 Icon-Rendering-Bug (GPU-Layer Fix)
Icons unsichtbar bis Klick? → GPU-Layer Promotion:
```css
body.capacitor [data-card="true"] svg {
  will-change: transform, opacity;
  transform: translateZ(0);
}
```
→ **Siehe `shared-docs/performance/capacitor-performance-rules.md`** Abschnitt 5

---

## ✅ Quick Checklist

Vor Commit: `npx tsc --noEmit`, ungenutzter Code entfernt, Mobile-First, Edge Cases, Server Actions `"use server"`, max 700 lines/file.

**⚡ Bei CRUD in Dialogen:** Optimistic UI! KEIN `revalidateTag()` → Daten zurückgeben → lokaler State Update → INSTANT UI.

**📱 Performance-Kritisch:**
- ❌ `backdrop-blur-*` (auf Mobile deaktiviert)
- ❌ Ghost-Blobs? → Siehe `capacitor-performance-rules.md`
- ❌ Icons unsichtbar? → GPU-Layer Promotion
- ✅ Solide Hintergründe: `bg-[#f8f8f8]` statt `bg-white/95`

---

**🔗 Weiterführende Docs:**
- `shared-docs/performance/capacitor-performance-rules.md` - Mobile/Capacitor Details
- `shared-docs/design/liquid-glass-guide.md` - Liquid Glass Design
- `shared-docs/database-testing-guide.md` - DB Testing mit npx tsx
- `shared-docs/react-patterns/stale-closure-pattern.md` - React State Patterns
