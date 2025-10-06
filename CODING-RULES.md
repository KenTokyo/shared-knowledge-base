﻿# ðŸŽ¯ Coding Rules & Development Guidelines

**Zweck:** Diese Datei enthÃ¤lt alle essentiellen Regeln fÃ¼r konsistente, performante und wartbare Code-Entwicklung. Sie vereint Architektur, Best Practices und kritische Anti-Patterns.

---

## ðŸ“‹ Workflow & Arbeitsweise

### Vor dem Start
- Vorhaben formatiert mit Icons prÃ¤sentieren
- GrÃ¶ÃŸere Aufgaben â†’ Plan in `docs/[feature]/tasks/[datum]-[feature]-plan.md`
- **Code-Reuse prÃ¼fen:** Erst nach existierenden Funktionen/Components suchen
- **Testing:** Nur `npx tsc --noEmit` verwenden (âŒ kein `npm run dev/build`)

### Kritisches Denken (Edge Cases)
Proaktiv an Szenarien denken, die der User nicht erwÃ¤hnt hat:
- **Extrem-FÃ¤lle:** GroÃŸe/kleine/leere Daten, Maximum erreicht?
- **User-Verhalten:** Falsche Eingaben, Spam-Klicks, Browser-Refresh?
- **Performance:** Langsame Queries, Memory leaks, DOM overload?
- **Concurrent Access:** Mehrere Tabs, Race conditions, State conflicts?
- **Browser/Device:** Mobile vs Desktop, alte Browser, verschiedene OS?
- **Security:** XSS, CSRF, Data injection, Unauthorized access?
- **UX:** Verwirrende UI, fehlende Feedback, Accessibility issues?

### Nach Abschluss
- **Plan aktualisieren:** Phase als âœ… markieren, kurz dokumentieren was/warum
- **Dokumentation erweitern:** `docs/[feature]/[feature]-overview.md` bei groÃŸen Ã„nderungen
- **Motivierende Zusammenfassung:** Icons, exakte Dateipfade, abgeschlossene Phase nennen

---

## ðŸ—ï¸ Architektur & Dateistruktur

### Component Organization (Section-Based)

**Max 400 lines per file** - Split in helpers/services wenn grÃ¶ÃŸer

#### âœ… The Right Way: Section-Based Structure
```
app/feature/[param]/
â”œâ”€â”€ (mainSection)/
â”‚   â”œâ”€â”€ (subSection)/
â”‚   â”‚   â”œâ”€â”€ AktionButton.tsx
â”‚   â”‚   â””â”€â”€ KonfigPanel.tsx
â”‚   â”œâ”€â”€ MainSection.tsx          â† Section orchestrator
â”‚   â””â”€â”€ (otherSubSection)/
â”‚       â””â”€â”€ DataCard.tsx
â””â”€â”€ page.tsx
```

#### âŒ Anti-Pattern: Flat "components" Junk Drawer
```
app/chat/
â”œâ”€â”€ page.tsx
â””â”€â”€ components/             â† âŒ VERMEIDEN
    â”œâ”€â”€ AiChatDialog.tsx    â† Keine Struktur, nicht skalierbar
    â”œâ”€â”€ ChatHeader.tsx
    â””â”€â”€ ... (20+ files chaos)
```

### Component Naming Convention

**Button-Text = File-Name:** "Speichern" button â†’ `SpeichernButton.tsx`

**Component Types:**
```
ComponentName[Type].tsx:
- Section.tsx    â†’ Orchestrates UI area (ReviewSection.tsx)
- Panel.tsx      â†’ Input/config interface (EinstellungenPanel.tsx)
- Dialog.tsx     â†’ Modal/overlay (BestÃ¤tigenDialog.tsx)
- Button.tsx     â†’ Interactive trigger (SpeichernButton.tsx)
- Card.tsx       â†’ Reusable content block (ProductCard.tsx)
- Item.tsx       â†’ List/grid element (MenuItem.tsx)
```

**Sprach-Konvention:**
- ðŸ‡©ðŸ‡ª **DEUTSCH (User-facing):** Button, Panel, Dialog â†’ `SpeichernButton.tsx`
- ðŸ‡ºðŸ‡¸ **ENGLISCH (Technical):** Section, Card, Item, Layout â†’ `ReviewSection.tsx`

---

## ðŸš€ Next.js App Router Rules

### 1. Server vs Client Components
- **Default:** Server Components (kein `"use client"`)
- **"use client" nur fÃ¼r:** `useState`, `useEffect`, event listeners, browser APIs
- **Platzierung:** An der "leaf" des Component Tree, nicht in Root Layouts
- **Pattern:** Server Components als `children` an Client Components Ã¼bergeben

### 2. Data Fetching
- âœ… **DO:** Direct fetching in Server Components mit `async/await`
- âœ… **DO:** Parallel fetching mit `Promise.all` (verhindert waterfalls)
- âœ… **DO:** `use()` Hook Pattern fÃ¼r Client Components + Suspense
- âŒ **DON'T:** `useEffect` fÃ¼r initial data fetching (slow, waterfalls)
- âŒ **DON'T:** Unnecessary API routes fÃ¼r simple data retrieval

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
- **UI Updates:** `revalidatePath('/')` oder `revalidateTag('tag')` nur bei geeigneten FÃ¤llen
- **Security:** âš ï¸ IMMER User-Input validieren + Session mit `getCurrentProfile()` prÃ¼fen

### 4. Loading & Rendering
- **Suspense:** `loading.tsx` fÃ¼r Route-Level, `<Suspense>` fÃ¼r Component-Level
- **Re-trigger Suspense:** Key prop nutzen: `<Suspense key={query}>`
- **Static-First:** Statische UI (Header, Navigation) AUSSERHALB Suspense (0ms render)
- **Hydration:** Server und Client initial UI mÃ¼ssen identisch sein

---

## âš›ï¸ React Best Practices

### State & Props
- **Immutable State:** Functional updates: `setState(prev => ...)`
- **List Keys:** Stable, unique `key` prop fÃ¼r `.map()` items
- **State vs Ref:** `useState` = re-render, `useRef` = no re-render (DOM, interval IDs)

### Performance
- **Memoization:** `useMemo` (expensive calculations), `useCallback` (functions as props), `React.memo` (components)
- **UI Blocking:** Expensive computations in `useMemo` oder web worker auslagern

### Effects & Lifecycle
- **Cleanup:** IMMER cleanup function bei subscriptions/timers/listeners
- **Dependency Array:** Accurate dependencies, `[]` = mount only, none = every render
- **Avoid Unnecessary Effects:** Derive from props/state during render wenn mÃ¶glich

### Error Handling
- **Error Boundaries:** Wrap critical trees, catch rendering errors, show fallback

### Component Communication (Pattern-Auswahl)

**ðŸŽ¯ Schnell-Entscheidung:** Welches Pattern fÃ¼r Component Communication?

| Situation | Pattern | Warum? |
|-----------|---------|--------|
| **Parent â†’ Child** (Daten weitergeben) | Props | Einfachste LÃ¶sung, Type-Safe |
| **Child â†’ Parent** (Event melden) | Callbacks | Standard fÃ¼r User-Interaktionen |
| **2-3 Geschwister** synchronisieren | Lifting State Up | Single Source of Truth im Parent |
| **3+ Levels** Prop-Drilling | Context API | Kein Prop-Drilling mehr |
| **Globaler State** (Theme, User) | Context API | Selten geÃ¤ndert, Ã¼berall verfÃ¼gbar |
| **Lokaler Form-State** | useState | Kein globales State-Management nÃ¶tig |

**ðŸš¨ Anti-Patterns vermeiden:**
- âŒ **Props-Drilling > 3 Levels** â†’ Context API nutzen
- âŒ **Context fÃ¼r lokalen State** â†’ useState + Callbacks reichen
- âŒ **State in Kindern dupliziert** â†’ Lifting State Up
- âŒ **Inline-Functions in Props** â†’ `useCallback` fÃ¼r Performance

**ðŸ“š AusfÃ¼hrliche Dokumentation:** `shared-docs/react-core-communication-patterns.md`

**ðŸ”„ Standard-Pattern: Callbacks + Lifting State Up**
```tsx
// Parent besitzt State
function Parent() {
  const [data, setData] = useState();
  const handleUpdate = (newData) => setData(newData);

  return (
    <>
      <ChildA data={data} />
      <ChildB onUpdate={handleUpdate} />
    </>
  );
}
```

---

## ðŸŽ¬ Design Patterns & Anti-Patterns

### Tab Components Performance
ðŸš¨ **KRITISCH:** Tab-Components dÃ¼rfen **NIEMALS eigene Daten-Fetches** durchfÃ¼hren!
- âœ… **Parent-Component fetcht alle Daten** (z.B. `NavbarClient`)
- âœ… **Props an Tabs weitergeben** â†’ instant Tab-Wechsel (<100ms)
- âŒ **Anti-Pattern:** Jeder Tab fetcht eigene Daten â†’ 1000ms+ Ladezeit

**Referenz:** `shared-docs/performance/tab-component-performance-antipattern.md`

### Responsive Dialogs
- **Controller Pattern:** Separate Components fÃ¼r Desktop/Mobile
- `[Feature]Dialog.tsx` + `Mobile[Feature]Dialog.tsx` + `[Feature]DialogController.tsx`
- **Referenz:** `shared-docs/design/responsive-dialog-architecture.md`

### Animated Loading States
- **Static-First:** Kritische UI (Header) instant, dynamic content progressiv
- **Staggered Animations:** Unterschiedliche delays fÃ¼r smooth reveal
- **Referenz:** `shared-docs/refactoring-docs/patterns/animated-loading-states.md`

### Multi-Level Data Fetching
- **3 Levels:** Page (critical), Section (important), Component (detailed)
- **Cascading:** Critical data instant, heavy data progressiv
- **Referenz:** `shared-docs/refactoring-docs/patterns/multi-level-data-fetching.md`

---

## ðŸš¨ Kritische Anti-Patterns (MUST AVOID)

### ðŸ”´ Rule 5.8: Proactive Implementation Analysis (BEFORE CODING)
**VOR jeder Implementierung MUSS eine technische Machbarkeitsanalyse erfolgen:**

**ðŸ“‹ Pflicht-Checkliste vor Code-Ã„nderungen:**
1. **Physics Check:** Ist das physikalisch/technisch mÃ¶glich?
   - Beispiel: Overlay mit variabler SchriftgrÃ¶ÃŸe Ã¼ber fixed-size Textarea â†’ **UNMÃ–GLICH**
   - Layout-Constraints: CSS Grid/Flexbox/Positioning kompatibel?
   - Browser-Limitations: Kann Browser das rendern?

2. **Side-Effects Analysis:** Was bricht durch diese Ã„nderung?
   - Welche existierenden Komponenten sind betroffen?
   - VerÃ¤ndern sich Layouts/Paddings/Margins?
   - Performance-Impact auf andere Features?

3. **Edge-Case-Simulation:** Mental-Test durchfÃ¼hren
   - Was passiert bei extremen Werten (sehr lang, sehr kurz, leer)?
   - User-Interaktionen (schnelles Tippen, Copy-Paste, Resize)?
   - Cross-Browser-KompatibilitÃ¤t?

4. **Alternative Solutions:** Gibt es bessere AnsÃ¤tze?
   - Kann das Problem anders gelÃ¶st werden?
   - Gibt es etablierte Patterns fÃ¼r dieses Problem?
   - Welche Bibliotheken/Frameworks lÃ¶sen das bereits?

**âŒ Anti-Pattern:** "Implementieren â†’ Testen â†’ Fehler finden â†’ Fixen"
**âœ… Correct Pattern:** "Analysieren â†’ Machbarkeit prÃ¼fen â†’ Design anpassen â†’ Implementieren"

**Regel-Trigger:** Wenn User sagt "Kannst du X implementieren":
1. STOP - Mental-Analyse durchfÃ¼hren (30 Sekunden Denkzeit)
2. Technische Limitationen identifizieren
3. Alternative LÃ¶sungen vorschlagen BEVOR Code geschrieben wird
4. User fragen: "Ich sehe Herausforderung Y - soll ich LÃ¶sung Z vorschlagen?"

**Postmortem-Referenz:** Markdown-Preview-Overlay (2025-10-03) - Transparentes Overlay unmÃ¶glich wegen variabler SchriftgrÃ¶ÃŸen vs. fixed Textarea.

### ðŸ”´ Rule 5.9: Context Analysis Before Changes
Vor jeder Ã„nderung die letzten 3-4 Tasks analysieren! Niemals bereits gelÃ¶ste Probleme rÃ¼ckgÃ¤ngig machen.

### ðŸ”´ Rule 5.10: MANDATORY Legacy Code Removal
Nach jeder Ã„nderung SOFORT ungenutzten Code entfernen:
- Ungenutzte Functions/Components/Imports
- Ungenutzte Variables/Constants/CSS-Klassen
- Ungenutzte Hook-Aufrufe (`useState`, `useMemo`, etc.)

### ðŸ”´ Rule 5.17: Dialog-EventListener-Pattern (LAYOUT-CRASH-PREVENTION)
Dialoge in Layout-kritischen Komponenten (Navbar, Header) MÃœSSEN Ã¼ber `useEffect + window.addEventListener` geÃ¶ffnet werden. Niemals direkt rendern - selbst `open={false}` kann Layout-Collapse verursachen.

**Referenz:** `shared-docs/postmortem/open-dialogs-right-way-useffect-windowEventListener.md`

### ðŸ”´ Rule 5.20: Scroll Height Dependency
`overflow-auto` braucht definierte HÃ¶he! `flex-1` allein reicht nicht.
- âŒ **Anti-Pattern:** `flex-1 overflow-auto` ohne Height-Parent
- âœ… **Fix:** `h-[75vh]` oder `isDialog`-Props fÃ¼r Context-Switching

### ðŸ”´ Rule 5.21: will-change Font-Killer
Niemals `will-change: transform, opacity`! ZerstÃ¶rt Font-Rendering (blurry text). Browser optimieren automatisch.

### ðŸ”´ Rule 5.22: Single Loading Pipeline
FÃ¼r kritische Daten (Entry, User-Profile) MUSS eine zentrale Loading-Pipeline existieren. Verschiedene UI-Entry-Points dÃ¼rfen NICHT unterschiedliche Loading-Logiken haben.

### ðŸ”´ Rule 5.23: Mobile-First Space Efficiency
ðŸ“± Alle UI-Komponenten MÃœSSEN Mobile-First designed werden:
- Maximale Space-Efficiency (kein exzessives Scrollen)
- Input-Felder nebeneinander in FlexRow wenn mÃ¶glich
- Kleinere SchriftgrÃ¶ÃŸen, geringere AbstÃ¤nde, weiterhin modernes Design

### ðŸ”´ Rule 5.24: Page-Level Data-Separation (INSTANT-HEADER RULE)
ðŸš¨ **KRITISCH:** Page-Components dÃ¼rfen NIEMALS Data-Fetching enthalten, das Header/Navigation blockiert!
- âŒ **Anti-Pattern:** `const profile = await getCurrentProfile()` in `page.tsx`
- âœ… **Correct:** Header als pure HTML, Data-Logic in `MainContent` mit Suspense

### ðŸ”´ Rule 5.25: Custom List-Styles & Prose.css Interaktion
**Problem:** TailwindCSS Prose-Plugin + Custom Styles kÃ¶nnen native HTML-Elemente Ã¼berschreiben

### ðŸ”´ Rule 5.26: Direct Action Principle (Minimize Clicks)
ðŸš¨ **KRITISCH:** Action-Buttons MÃœSSEN ihre Funktion DIREKT ausfÃ¼hren - KEINE Zwischenschritte!
- **Prinzip:** Button-Label = Direkte Funktion | 1 Klick = 1 Action
- âŒ **Anti-Pattern:** `onClick={() => setOpen(true)}` â†’ Ã–ffnet Default-View â†’ User muss weiter navigieren (2 Klicks)
- âœ… **Correct:** `onClick={() => { setTargetView('specific'); setOpen(true); }}` â†’ Direkt zum Ziel (1 Klick)
- **Implementation:** Multi-Step Components MÃœSSEN `initialView/initialStep` Prop haben

### ðŸ”´ Rule 5.27: Consistent Dialog Design
ðŸš¨ **KRITISCH:** Dialoge MÃœSSEN einheitliche GrÃ¶ÃŸe und Navigation haben!
- **Size:** `max-h-[85vh]` fÃ¼r konsistente HÃ¶he, `sm:max-w-[700px]` Desktop
- **Multi-Step Navigation:** Sub-Dialogs Ã¼ber State-Switching (kein nested Dialog-in-Dialog)
- **Back-Navigation:** ZurÃ¼ck-Button bei Sub-Views, History-basiert
- **Pattern:** Main-Container bleibt, Content-Area wechselt per Step/View-State

---

## ðŸ› ï¸ Implementation Guidelines

### Database (Actions & Finders)
- **Actions** (`db/actions/`): Alle mutations, MUSS `"use server"` haben
- **Finders** (`db/finders/`): Alle queries, MUSS `"use server"` haben
- **Auth:** `getCurrentProfile()` aus `profile-finder` statt auth-Methoden
- **User vs Profile:** User nur fÃ¼r Auth, Profile fÃ¼r alles andere

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
- Toast notifications fÃ¼r User-facing errors
- Error Boundaries fÃ¼r component crashes
- Input validation inline (keine libraries)

### Frontend Animation
- **Expand/Collapse:** CSS Grid `grid-rows-[1fr]` (expanded) / `grid-rows-[0fr]` (collapsed) mit `transition-all duration-300` + `overflow-hidden` fÃ¼r smooth height transitions
- FadeContent-Komponente einbauen (siehe `shared-docs\refactoring-docs\prompts\universal-fadeContent-refactoring-prompt.md`)
---

## ðŸŽ¨ Design System

### Theme System
- **CSS Custom Properties:** Dynamic colors (`--primary`, `--accent`)
- **Glassmorphism:** `glass-card`, `backdrop-blur-sm/md`
- **Gradients:** Three-color gradients (primary-dark â†’ primary â†’ primary-light)

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

## ðŸ“š Documentation System

### Structure
- **Master-Navigation:** `docs/OVERVIEW.md` - Komplette App-Ãœbersicht
- **Feature-Docs:** `docs/[feature]/[feature]-overview.md`
- **Sub-Features:** `docs/[feature]/features/[sub-feature].md`
- **Task-History:** `docs/[feature]/tasks/[datum]-[task].md`

### Update-Rules
- **Feature-Overview:** Bei groÃŸen Ã„nderungen updaten
- **Sub-Features:** Komponenten-Details erweitern
- **Task-History:** Auf "abgeschlossen" setzen
- **Master-Navigation:** Nur bei sehr groÃŸen Ã„nderungen

---

## âœ… Quick Checklist

Vor jedem Commit:
- [ ] `npx tsc --noEmit` lÃ¤uft ohne Fehler
- [ ] Ungenutzter Code entfernt (imports, functions, variables)
- [ ] Mobile-First Design geprÃ¼ft
- [ ] Edge Cases berÃ¼cksichtigt (empty states, errors, loading)
- [ ] Server Actions haben `"use server"`
- [ ] Suspense boundaries fÃ¼r async components
- [ ] Static UI (Header) auÃŸerhalb Suspense
- [ ] Descriptive comments fÃ¼r functions/components
- [ ] Max 400 lines per file eingehalten

---

**ðŸ”— WeiterfÃ¼hrende Docs:**
- `shared-docs/performance/tab-component-performance-antipattern.md`
- `shared-docs/design/responsive-dialog-architecture.md`
- `shared-docs/refactoring-docs/patterns/animated-loading-states.md`
- `shared-docs/refactoring-docs/patterns/multi-level-data-fetching.md`
- `shared-docs/postmortem/open-dialogs-right-way-useffect-windowEventListener.md`
#### Revalidate-Sicherheitsregel (Remount-Loop PrÃ¤vention)
- Verwende `revalidatePath` NICHT bei Autosave- oder hochfrequenten Updates, wenn ein Editor/komplexe Client-UI gerade gemountet ist (z. B. `/notes`).
- Stattdessen:
  - Server-Action: Nur schreiben (kein Revalidate). Optional aktualisierte EntitÃ¤t zurÃ¼ckgeben.
  - Client: Lokalen Zustand aktualisieren (`onSaved()`), Cache markieren (`invalidateCache(id, 'note' | 'diagram')`), optional gezieltes `refreshData()` aus dem Context aufrufen.
- `revalidatePath` nur fÃ¼r: Create/Delete, explizite Nutzeraktionen, oder wenn ein Navigationswechsel unmittelbar folgt.
- Hintergrund: `revalidatePath` invalidiert die Route und verursacht Remounts â†’ bei Autosave fÃ¼hrt das zu Endlosschleifen. Siehe: `shared-docs/postmortem/revalidatepath-autosave-remount-loop-postmortem.md`.

### Overlay Stability (TipTap/Tippy)
- Global: Stabilisiere Bubble/Popper‑Props mit useCallback/useMemo und verhindere Blur auf pointerdown (Capture); setze hideOnClick: false und nutze ppendTo auf den Editor‑Container.
