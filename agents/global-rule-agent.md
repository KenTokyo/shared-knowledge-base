This file provides guidance to Roo Code when working with code in this repository.

# Component Organization

**Hinweis: Es kann sein, dass es abweichend ist, da es später erst eingeführt wurde, wie die Komponentenstruktur aufgebaut werden soll, schaue am besten in die docs nach (steht in Arbeitsweise) aber erstelle Code wenn möglich immer nach diesem Stil:**

* Max 400 lines per file - split into helpers/services if larger

**Frontend-to-Code Navigation (Universal):**

* **Button-Text = File-Name:** "Kommentar hinzufügen" button → `KommentarHinzufügenButton.tsx`
* **Dialog-Title = File-Name:** "Einstellungen" dialog → `EinstellungenDialog.tsx`
* **UI-Area = Section:** Comment area → `(commentSection)/`
* **Fast Navigation:** Click UI element → Know exact file path in \<5 seconds

**Component Naming System:**

```
ComponentName[Type].tsx where [Type] is:
- Section.tsx    → Orchestrates UI area (ReviewSection.tsx)
- Panel.tsx      → Input/config interface (EinstellungenPanel.tsx) 
- Dialog.tsx     → Modal/overlay (BestätigenDialog.tsx)
- Button.tsx     → Interactive trigger (SpeichernButton.tsx)
- Card.tsx       → Reusable content block (ProductCard.tsx)
- Item.tsx       → List/grid element (MenuItem.tsx)
```

**Deutsch/Englisch Naming Convention:**

```
🇩🇪 DEUTSCH (User-facing Komponenten):
- Button.tsx     → SpeichernButton.tsx, LöschenButton.tsx
- Panel.tsx      → EinstellungenPanel.tsx, BenutzerPanel.tsx  
- Dialog.tsx     → BestätigenDialog.tsx, EinstellungenDialog.tsx

🇺🇸 ENGLISCH (Technische Container):
- Section.tsx    → ReviewSection.tsx, HeaderSection.tsx
- Card.tsx       → ProductCard.tsx, UserCard.tsx
- Item.tsx       → MenuItem.tsx, ListItem.tsx
- Layout.tsx     → MainLayout.tsx, PageLayout.tsx
```

**Warum diese Aufteilung?**

* **User-facing = Deutsch:** User klickt "Speichern" → Code heißt `SpeichernButton.tsx`
* **Technical = Englisch:** Section names sind für Entwickler, nicht für User

**Section Structure Example:**

```
feature/[param]/
├── (mainSection)/
│   ├── (subSection)/
│   │   ├── AktionButton.tsx
│   │   └── KonfigPanel.tsx
│   ├── MainSection.tsx          ← Section orchestrator
│   └── (otherSubSection)/
│       └── DataCard.tsx
```

**Universal Pattern:**

* **UI Area** → `(sectionName)` folder
* **Button/Action** → `AktionButton.tsx`
* **Form/Input** → `KonfigPanel.tsx`
* **Popup** → `FeatureDialog.tsx`

**Benefits:** Instant hierarchy recognition, button-to-code navigation, scalable to 30+ components

## Development Patterns

### Server Actions & Finders

* **Actions** (`db/actions/`): All database mutations, must include "use server"
* **Finders** (`db/finders/`): All database queries, must include "use server"
* **API Response Format**:

### Data Fetching Best Practices

* Use simple SQL joins to combine related tables
* Avoid complex nested joins - retrieve broader dataset then filter in TypeScript
* Use Suspense boundaries for loading states with key prop for re-rendering
* Anticipate errors and handle via toast notifications

### State Management

* **Server State**: Next.js caching and server components
* **Form State**: React Hook Form
* **Optimistic Updates**: useState (not useOptimistic)
* **Theme/Language**: React Context providers

## Design System

### Theme System

The app uses a glassmorphism design with multi-theme gradient system:

* **CSS Custom Properties**: Dynamic theme colors (--primary, --accent, etc.)
* **Glassmorphism**: `glass-card`, `backdrop-blur-sm/md` for depth
* **Gradients**: Three-color gradients (primary-dark → primary → primary-light)
* **Themes**: Cyber (blue), Warm (orange), Neon (green), Premium themes

### Component Classes

* **Cards**: `glass-card`, `bg-card/50 backdrop-blur-sm`
* **Buttons**: `bg-gradient-primary`, `hover:glow-primary`
* **Borders**: `border-primary/10` to `border-primary/20`
* **Text Gradients**: `text-gradient-primary`, `bg-clip-text text-transparent`

### Style Files

* **Base Styles**: `app/globals.css` (CSS variables, utilities)
* **Theme Files**: `styles/themes/*.css` (theme-specific colors)
* **Effects**: `styles/themes/effects.css` (glassmorphism, glows)

## Mobile Integration (Capacitor)

The app includes full mobile support via Capacitor:

## Key Features

## Important Implementation Notes

### Critical Rules

1. **Check for existing code first** - Always search for existing functions/components before creating new ones
2. **No duplicate files** - Never create files with suffixes like "v2" or "Optimized"
3. **Remove unused code immediately** - Don't leave dead code in the repository
4. **File size limit** - Max 400 lines per file, split into helpers/components if larger
5. **Use "use server"** - Required at the top of all actions and finders files
6. **Type checking** - Run `npx tsc --noEmit` to check for TypeScript errors
7. **No migration files** - Don't create Drizzle migration files, use `db:push` instead
8. **Kein User verwenden** - Benutze stattdessen den Profile, User nur für Auth, Profile für alles andere
9. **Responsive Dialogs**: For dialogs requiring a distinct mobile experience, you **MUST** use the Controller Pattern. Create separate components for desktop (`[Feature]Dialog.tsx`) and mobile (`Mobile[Feature]Dialog.tsx`), and use a `[Feature]DialogController.tsx` to render the correct one based on screen size. Do not create a single, complex responsive component. For a detailed guide, see the [`Responsive Dialog Architecture`](shared-docs/design/responsive-dialog-architecture.md).
10. **Important!: AutoAnimate for Frontend Tasks**: For frontend tasks use the `auto-animate` library. It's a zero-config utility that automatically animates elements when they are added, removed, or moved in the DOM. For a quick start, read the [`auto-animate-documentation.md`]
11. Alle UI-Komponenten MÜSSEN **Mobile-First** designed werden mit maximaler Space-Efficiency, kleine Schriftgrößen, geringe Abstände, aber weiterhin hochmodernes Design.
12. **Completed-Task Dokumentation**: Nach erfolgreichem Abschluss einer Aufgabe MUSS eine Datei in `.completed/<YYYY-MM-DD>_<slug>.md` erstellt werden. Format: YAML Frontmatter mit title, description, date, status, effort + Markdown Body. Siehe: `shared-docs/agents/completed-task-rule.md`

### Code Style Guidelines

* Use server functions, not classes
* Simple inline validation instead of libraries
* Descriptive comments for functions/components
* English naming for folders and components (kebab-case)
* Handle errors with toast notifications
* Use Suspense for loading states
* Batch tool calls for performance
* nutze getCurrentProfile() aus profile-finder für den aktuell eingeloggten Profil statt auth-Methoden

## Arbeitsweise

**Vor dem Start**: Vorhaben motiviert mit Icons formatiert präsentieren. Bei größeren Aufgaben → Plan in `docs/[feature]/tasks/[datum]-[feature]-plan.md` erstellen

**Documentation System**: Nutze das intelligente `docs/` System für Feature-Discovery:
**Master-Navigation**: `docs/OVERVIEW.md` für schnelle komplette App- Feature-Übersicht
**Feature-Dokumentation**: `docs/[feature]/[feature]-overview.md`
\***Sub-Features**: `docs/[feature]/features/[sub-feature].md` mit Komponenten-Details erweitern (TipTap-Editor, Canvas-Rectangles, etc.)

**Code-Reuse prüfen**: Erst nach existierenden Funktionen suchen, dann wiederverwendbar programmieren

**Kritisch denken & Edge Cases**: Du MUSST proaktiv an Szenarien denken, die der User nicht erwähnt hat:

* **Extrem-Fälle**: Was bei sehr großen/kleinen/leeren Datenmengen? Maximum erreicht?
* **User-Verhalten**: Falsche Eingaben, Spam-Klicks, Browser-Refresh während Operation?
* **System-Limits**: Memory voll, Disk space, Rate limits, Timeout-Probleme?
* **Concurrent Access**: Mehrere Tabs, mehrere User, Race conditions?
* **Browser/Device Unterschiede**: Mobile vs Desktop, alte Browser, verschiedene OS?
* **Integration-Probleme**: Third-party APIs down, Versions-Konflikte, Breaking changes?
* **Performance-Degradation**: Langsame Queries, Memory leaks, DOM overload?
* **Security-Aspekte**: XSS, CSRF, Data injection, Unauthorized access?
* **UX-Probleme**: Verwirrende UI, fehlende Feedback, Accessibility issues?
* **State-Management**: Stale data, cache invalidation, optimistic updates gone wrong?
* Bessere Alternativen vorschlagen und erklären WARUM
* Gefundene Edge Cases im Plan dokumentieren mit Lösungsansätzen

**Testing**: Nur `npx tsc --noEmit` verwenden, bloß kein npm run dev/build!!

## Phasen-Dokumentation (WICHTIG!)

### Nach Phasen-Abschluss:

**Plan aktualisieren** in `docs/[feature]/tasks/[datum]-[feature]-plan.md`

* Phase als ✅ Abgeschlossen markieren
* Dokumentiere kurz was gemacht wurde
* Warum so umgesetzt (kurze Begründung)
* Hinweise und Edge cases für nächste Phase evtl. notieren

**Kleine Aufgaben ohne Plan**:

* Formatierte Zusammenfassung mit vielen Infos mit Icons, motiviert, formatiert zurückgeben
* Auch hier: Edge Cases erwähnen und Datenfluss erklären
* Keine separate Dokumentation nötig, aber trotzdem verständlich schreiben

**📚 Dokumentation**: Nach **WIRKLICH allen abgeschlossenen Phasen** erweitere das intelligente Dokumentations-System:

* **Feature-Overview falls erforderlich bei großen Änderungen**: `docs/[feature]/[feature]-overview.md` mit User-Features updaten ("Der User kann...")
* **Sub-Features**: `docs/[feature]/features/[sub-feature].md` mit Komponenten-Details erweitern (TipTap-Editor, Canvas-Rectangles, etc.)
* **Task-History**: `docs/[feature]/tasks/[datum]-[task].md` auf abgeschlossen setzen
* **Master-Navigation falls erforderlich bei sehr großen Änderungen**: `docs/OVERVIEW.md` das ist nur ein Overview der ganzen App!

**Abschluss**:

* Exakten Dateipfad der aktualisierten Doku nennen & abgeschlossene Phase nennen
* Task als completed markieren
* Motivierende Sprache mit Emojis verwenden

```typescript
export interface ApiResponse<T> {
success: boolean;
data?: T;
error?: string;
}
```

## 🚨 KRITISCHE PERFORMANCE-REGEL: Tab Components

Tab-Komponenten dürfen **niemals eigene Daten-Fetches** durchführen. Das Data-Fetching ist die alleinige Verantwortung der **Parent-Komponente** (z.B. `NavbarClient`). Die Daten werden dann über Props an die einzelnen Tabs weitergegeben, um einen sofortigen Tab-Wechsel (< 100ms) zu gewährleisten.

**Referenz bei Performance-Problemen:** [`shared-docs/performance/tab-component-performance-antipattern.md`](shared-docs/performance/tab-component-performance-antipattern.md)

**Lese unbedingt die doku zu: `shared-docs\refactoring-docs\global-coding-rules.md` und wenn du mit der Planung beginnst, nenne welche Regeln du aus der `shared-docs\refactoring-docs\global-coding-rules.md` benutzt!**
