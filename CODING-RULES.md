# 🎯 Coding Rules & Development Guidelines

**Zweck:** Essentielle Regeln für konsistente, performante und wartbare Code-Entwicklung.

---

## Regel 1: Workflow & Arbeitsweise

### 1.1 Vor dem Start
- **Vorhaben präsentieren:** Formatiert mit Icons, klare Struktur
- **Größere Aufgaben:** Plan in `docs/[feature]/tasks/[datum]-[feature]-plan.md` erstellen
- **Code-Reuse prüfen:** ERST nach existierenden Funktionen/Components mit `Grep` suchen
jjjjj- **Testing:** Nur `npx tsc --noEmit` (❌ kein `npm run dev/build`)
- Sei hochmotiviert, liefere formatierte Antworten mit Icons in Deutsch

### 1.2 🚨 Planungs-Regel: Kein Code in Planungsdokumenten
- ✅ **ERLAUBT:** Konzepte, Architektur, Dateipfade, API-Signaturen (max 3-5 Zeilen)
- ❌ **VERBOTEN:** Vollständige Implementierungen, Code-Blöcke >10 Zeilen
- **Ziel:** Max 500-800 Zeilen pro Plan (WAS und WARUM, nicht WIE im Detail)

### 1.3 Kritisches Denken (Edge Cases)
Proaktiv: Extrem-Fälle, falsches User-Verhalten, Performance, Concurrent Access, Browser/Device-Unterschiede.

### 1.4 Nach Abschluss
- **Plan aktualisieren:** Phase als ✅ markieren
- **Dokumentation erweitern:** Bei großen Änderungen `docs/[feature]/[feature]-overview.md`
- **Zusammenfassung:** Icons, Dateipfade, abgeschlossene Phase nennen

---

## Regel 2: Architektur & Dateistruktur

### 2.1 🚨 Component-Based Architecture (WICHTIGSTE REGEL)
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!**
- **Warum?** Performance-Killer (jedes Render neu erstellt) + State-Verlust
- ✅ Jede Komponente in separater Datei

### 2.2 Component Organization
**Maximal 700 Zeilen Code pro Datei** - Auslagern wenn größer
```
app/feature/[param]/
├── (mainSection)/
│   ├── (subSection)/
│   │   └── AktionButton.tsx
│   └── MainSection.tsx
└── page.tsx
```

### 2.3 Component Naming Convention
- 🇩🇪 **DEUTSCH (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **ENGLISCH (Technical):** Section, Card, Item → `ReviewSection.tsx`

---

## Regel 3: Next.js App Router

### 3.1 Server vs Client Components
- **Default:** Server Components (kein `"use client"`)
- **"use client" nur für:** `useState`, `useEffect`, event listeners, browser APIs
- **Platzierung:** An der "leaf" des Component Tree

### 3.2 Data Fetching
- ✅ Direct fetching in Server Components mit `async/await`
- ✅ Parallel fetching mit `Promise.all`
- ✅ `use()` Hook Pattern für Client Components + Suspense
- ❌ `useEffect` für initial data fetching

### 3.3 Data Mutations
- **Server Actions:** Alle Mutations, MUSS `"use server"` haben
- **Security:** ⚠️ IMMER User-Input validieren + Session mit `getCurrentProfile()` prüfen

### 3.4 🚨 Optimistic UI Pattern (MANDATORY für Dialoge/Modals)
**Problem:** `revalidateTag()` triggert Router Cache Refresh → Hard-Refresh, Dialog flasht/schließt!

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

**Cross-Component:** `window.dispatchEvent(new CustomEvent('itemUpdated', { detail: result.data }))`

### 3.5 Loading & Rendering
- **Suspense:** `loading.tsx` für Route-Level, `<Suspense>` für Component-Level
- **Static-First:** Statische UI (Header, Navigation) AUSSERHALB Suspense (0ms render)

### 3.6 🔴 Client Provider Wrapper Pattern
Alle Client-Provider in ONE Client-Component (`ClientProviders.tsx`) wrappen.

---

## Regel 4: React Best Practices

### 4.1 State & Props
- **Immutable State:** `setState(prev => ...)`
- **List Keys:** Stable, unique `key` prop für `.map()` items
- **State vs Ref:** `useState` = re-render, `useRef` = no re-render

### 4.2 Performance
- **Memoization:** `useMemo` (expensive calculations), `useCallback` (functions as props), `React.memo` (components)

### 4.3 Effects & Lifecycle
- **Cleanup:** IMMER cleanup function bei subscriptions/timers/listeners
- **Dependency Array:** Accurate dependencies, `[]` = mount only

### 4.4 Component Communication
- **Parent↔Child:** Props down, Callbacks up
- **2-3 Levels:** Lifting State Up
- **3+ Levels:** Context API
- **Referenz:** `shared-docs/react-core-communication-patterns.md`

---

## Regel 5: Design Patterns

### 5.1 Tab Components Performance
Parent fetcht alle Daten, Props an Tabs weitergeben. NIEMALS flüchtige Keys.

### 5.2 Responsive Dialogs (Controller Pattern)
- `[Feature]Dialog.tsx` - Desktop
- `Mobile[Feature]Dialog.tsx` - Mobile
- `[Feature]DialogController.tsx` - Logic + Device-Detection

### 5.3 Theme-Stil: Neon-Glasmorphism
Neon-orientierter Glasmorphism: Gradients, Glows aus CSS-Variablen – **keine hardcodierten Hex-Farben**.

### 5.4 🎨 Liquid Glass Design
> **Vollständige Doku:** `shared-docs/design/liquid-glass-guide.md`

- **Tiefe:** `bg-black/40`, `backdrop-blur-xl`, `box-shadow` mit `inset`
- **Licht als Akzent:** `blur-[50px]` Punkt-Glows
- **Muted Buttons:** `orange-500/20` statt `bg-orange-500`

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
`overflow-auto` braucht definierte Höhe! Fix: `h-[75vh]` oder `isDialog`-Props.

### 7.5 🔴 will-change Font-Killer
Niemals `will-change: transform, opacity` permanent auf Containern mit Text!

### 7.6 🔴 Mobile-First Space Efficiency
UI MUSS Mobile-First designed werden: Maximale Space-Efficiency.

### 7.7 🔴 Page-Level Data-Separation
Header als pure HTML, Data-Logic in `MainContent` mit Suspense.

### 7.8 🔴 FadeContent Dialog Conditional Rendering
- ❌ `<FadeContent><Dialog isOpen={isOpen} /></FadeContent>`
- ✅ `{isOpen && <FadeContent><Dialog /></FadeContent>}`

### 7.9 🔴 TabContent Height-Constraint Anti-Pattern
Tab-Content darf NICHT `h-full` oder `flex flex-col` im Root-Div verwenden.

### 7.10 🔴 tailwindcss-animate Reserved Class Names
NIEMALS eigene CSS-Klassen mit tailwindcss-animate Namen. Eigener Prefix: `fm-fade-in`

### 7.11 🔴 revalidateTag Hard-Refresh Killer
❌ `revalidateTag()` in Dialogen/Modals → ✅ Optimistic UI Pattern (siehe Regel 3.4)

### 7.12 🔴 Stale Closure Pattern
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
Dialoge MÜSSEN für Wiederverwendung designed werden: Props für Modi, Callback-Props.

### 7.14 🔴🔴🔴 RECHERCHE VOR RUMPROBIEREN (KRITISCH!)
**PFLICHT-Workflow bei unbekannten Fehlern:**
1. **Stack-Trace GENAU lesen** - Welche Datei, Zeile, Komponente?
2. **RECHERCHIEREN** - Docs, GitHub Issues durchsuchen
3. **Root Cause verstehen** - WARUM passiert der Fehler?
4. **DANN erst fixen** - Mit Verständnis der Ursache

---

## Regel 8: Implementation Guidelines

### 8.1 Database (Actions & Finders)
- **Actions** (`db/actions/`): Alle mutations, MUSS `"use server"` haben
- **Finders** (`db/finders/`): Alle queries, MUSS `"use server"` haben
- **Auth:** `getCurrentProfile()` aus `profile-finder`

### 8.2 🔴 Database-First Logic
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
- CSS Grid `grid-rows-[1fr]` / `grid-rows-[0fr]` mit `transition-all duration-300`
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
<div className="flex items-center gap-2 py-1.5 min-h-[44px] sm:min-h-[36px]">
  <span className="text-sm">Titel</span>
  <span className="text-xs text-gray-500">·</span>
  <span className="text-xs truncate max-w-[200px]">Beschreibung</span>
</div>
```

---

## 📱 Regel 10: Mobile/Capacitor Performance

> **Vollständige Doku:** `shared-docs/performance/capacitor-performance-rules.md`

### 10.1 🔴 KRITISCH: backdrop-filter ist VERBOTEN!
- ❌ `backdrop-blur-*` auf Mobile automatisch deaktiviert
- ✅ `filter: blur(50px)` für Punkt-Glows ist OK

### 10.2 🔴 Ghost-Blobs Fix
Entferne: `blur-[90px]`, `mix-blend-multiply`, Icon-Glows `shadow-[0_0_Xpx]`, Gradient-Overlays

### 10.3 🔴 Icon-Rendering-Bug (GPU-Layer Fix)
```css
body.capacitor [data-card="true"] svg {
  will-change: transform, opacity;
  transform: translateZ(0);
}
```

---

## Regel 11: Documentation System

**Structure:** `docs/OVERVIEW.md` → `docs/[feature]/[feature]-overview.md` → `docs/[feature]/tasks/[datum]-[task].md`

---

## Regel 12: Validierung

Bevor du anfängst eine Planung zu implementieren, validiere ob sie Sinn macht und korrekt geplant wurde.

---

## 🔴 Regel 13: TypeScript-Fehler (KRITISCH!)

### 13.1 🚨 ZERO TOLERANCE für TypeScript-Fehler
- **NACH JEDER PHASE:** `npx tsc --noEmit` ausführen
- **NIEMALS** TypeScript-Fehler ignorieren oder "später fixen"
- **SOFORT** beheben bevor zur nächsten Phase gegangen wird
- TypeScript-Fehler sind **BLOCKER** - keine Ausnahmen!

### 13.2 TypeScript-Check Workflow
```powershell
# Nach jeder Änderung
npx tsc --noEmit

# Bei Fehlern: SOFORT fixen, nicht weitermachen!
```

### 13.3 Häufige Fehler-Kategorien
- **TS2307:** Cannot find module → Paket installieren
- **TS2322:** Type mismatch → Interface/Type anpassen
- **TS2339:** Property does not exist → Type erweitern
- **TS18048:** Possibly undefined → Optional chaining oder Guard

---

## ✅ Quick Checklist

Vor Commit: `npx tsc --noEmit` (🔴 MUSS 0 FEHLER HABEN!), ungenutzter Code entfernt, Mobile-First, Edge Cases, Server Actions `"use server"`, max 700 lines/file.

**⚡ Bei CRUD in Dialogen:** Optimistic UI! KEIN `revalidateTag()` → Instant UI.

**📱 Performance-Kritisch:**
- ❌ `backdrop-blur-*` (auf Mobile deaktiviert)
- ❌ Ghost-Blobs? → Siehe `capacitor-performance-rules.md`
- ✅ Solide Hintergründe: `bg-[#f8f8f8]` statt `bg-white/95`

---

## 🤖 Regel 14: LLM-Kontextmanagement (KRITISCH!)

### 14.1 🚨 TOKEN-LIMIT WARNUNG

**ACHTUNG:** Nach ~150.000 Tokens beginnen LLMs zu halluzinieren und Fehler zu machen!

| Kontext | Limit | Aktion |
|---------|-------|--------|
| Planungs-Chat | 4 Planungen max | Neuen Chat öffnen |
| Coding-Chat | ~150.000 Tokens | STOPP, neuen Chat öffnen |
| Kontext-Verlust | ~200.000 Tokens | Halluzinationen wahrscheinlich |

### 14.2 Neuer Chat Workflow

**Bei Erreichen des Token-Limits:**
1. Aktuellen Stand in MASTER-ORCHESTRATOR.md dokumentieren
2. Migrations-Tracker in der Phase-Datei aktualisieren
3. Zusammenfassung für nächsten Chat erstellen
4. Neuen Chat mit folgenden Dateien starten:
   - MASTER-ORCHESTRATOR.md
   - Relevante GLOBAL-TASK-LIST
   - Aktuelle Phase-Datei

### 14.3 Markierungssystem für migrierte Dateien

**JEDE migrierte Datei MUSS diesen Header haben falls TrackMe AI projekt:**
```typescript
/**
 * @migration-status MIGRATED
 * @migration-source trackme-ai-backend/app/[original-pfad]
 */
```

**Status-Werte:**
- ❌ OFFEN - Noch nicht begonnen
- ⏳ IN_ARBEIT - Aktuell in Bearbeitung
- ✅ MIGRIERT - Vollständig migriert

### 14.4 Warum ist das wichtig?

LLMs verlieren Kontext nach ~150k Tokens. Dieses System stellt sicher:
1. **Jeder neue Chat weiss sofort, was migriert wurde**
2. **Keine doppelte Arbeit durch fehlende Information**
3. **Einheitliche Markierung für alle Dateien**
4. **Konsistente Qualität ohne Halluzinationen**

### 14.5 Chat-Aufbau Template

```
ULTRATHINK

Lies bitte:
1. docs/react-native-migration/MASTER-ORCHESTRATOR.md
2. docs/react-native-migration/GLOBAL-TASK-LISTS/[BEREICH]-TASKS.md
3. docs/react-native-migration/phases/[bereich]/[phase].md

Aktueller Stand: Phase [X], CHAT [Y]
Aufgabe: Implementiere die Tasks aus CHAT [Y]

Wichtig: Maximal 150.000 Tokens!
```

---

## ✅ Quick Checklist

Vor Commit: `npx tsc --noEmit` (🔴 MUSS 0 FEHLER HABEN!), ungenutzter Code entfernt, Mobile-First, Edge Cases, Server Actions `"use server"`, max 700 lines/file.

**⚡ Bei CRUD in Dialogen:** Optimistic UI! KEIN `revalidateTag()` → Instant UI.

**📱 Performance-Kritisch:**
- ❌ `backdrop-blur-*` (auf Mobile deaktiviert)
- ❌ Ghost-Blobs? → Siehe `capacitor-performance-rules.md`
- ✅ Solide Hintergründe: `bg-[#f8f8f8]` statt `bg-white/95`

**🤖 LLM-Kontext:** Nach 150k Tokens → NEUEN CHAT öffnen!

---

**🔗 Weiterführende Docs:**
- `shared-docs/refactoring-docs/global-coding-rules.md` - LLM-Optimierte Prinzipien
- `shared-docs/design/liquid-glass-guide.md` - Liquid Glass Design
- `shared-docs/performance/capacitor-performance-rules.md` - Mobile Performance
- `shared-docs/database-testing-guide.md` - DB Testing
