# Frontend-Regeln & Komponentenstruktur

---
version: 1.0
updated: 2026-04-11
---

**PFLICHT bei Frontend-Arbeit:** Diese Datei IMMER lesen!

---

## 1. Komponentenstruktur (KRITISCH!)

### 1.1 Component Naming System

```
ComponentName[Type].tsx

Typen:
- Section.tsx    → Orchestriert UI-Bereich (ReviewSection.tsx)
- Panel.tsx      → Input/Config Interface (EinstellungenPanel.tsx)
- Dialog.tsx     → Modal/Overlay (BestätigenDialog.tsx)
- Button.tsx     → Interactive Trigger (SpeichernButton.tsx)
- Card.tsx       → Wiederverwendbarer Content-Block (ProductCard.tsx)
- Item.tsx       → List/Grid Element (MenuItem.tsx)
- Layout.tsx     → Seiten-Layout (MainLayout.tsx)
```

### 1.2 Deutsch/Englisch Naming Convention

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
- **User-facing = Deutsch:** User klickt "Speichern" → Code heißt `SpeichernButton.tsx`
- **Technical = Englisch:** Section names sind für Entwickler, nicht für User

### 1.3 Frontend-to-Code Navigation

| UI-Element | Dateiname |
|------------|-----------|
| Button mit Text "Kommentar hinzufügen" | `KommentarHinzufügenButton.tsx` |
| Dialog mit Titel "Einstellungen" | `EinstellungenDialog.tsx` |
| UI-Bereich "Comments" | `(commentSection)/` Ordner |

**Ziel:** Click UI element → Know exact file path in <5 seconds

---

## 2. Section Structure (Ordner-Hierarchie)

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
- **UI Area** → `(sectionName)/` folder mit Klammern
- **Button/Action** → `AktionButton.tsx`
- **Form/Input** → `KonfigPanel.tsx`
- **Popup** → `FeatureDialog.tsx`

**Benefits:** Instant hierarchy recognition, button-to-code navigation, scalable to 30+ components

---

## 3. Architektur-Regeln

### 3.1 🚨 NIEMALS Komponenten in Komponenten definieren!

```tsx
// ❌ FALSCH - Performance-Killer!
function ParentComponent() {
  function ChildComponent() { // <-- NIEMALS!
    return <div>Child</div>;
  }
  return <ChildComponent />;
}

// ✅ RICHTIG - Separate Datei
// ChildComponent.tsx
export function ChildComponent() {
  return <div>Child</div>;
}

// ParentComponent.tsx
import { ChildComponent } from './ChildComponent';
export function ParentComponent() {
  return <ChildComponent />;
}
```

**Warum?** Performance-Killer (jedes Render neu erstellt) + State-Verlust

### 3.2 Max 700 Zeilen pro Datei

Wird größer? → Aufteilen in:
- Unterkomponenten in Unterordner
- Helpers in `helpers/`
- Services in `services/`

---

## 4. Design System

### 4.1 NoteDrill Design System nutzen

**VOR Code-Änderungen prüfen:**
- `components/design-system/` (Import via `@/components/design-system`)
- Showcase: `app/design-system/_showcase/components`

**Design-System Reuse:**
1. Zuerst `components/design-system/*` nutzen (DesignButton, DesignBadge, etc.)
2. Keine neuen freien `<button>` wenn Design-Wrapper existiert
3. Vor Merge: "Nutze ich vorhandenen Baustein oder baue ich Duplikat?"

### 4.2 Theme System (Glassmorphism)

- **CSS Custom Properties**: `--primary`, `--accent`, etc.
- **Glassmorphism**: `glass-card`, `backdrop-blur-sm/md`
- **Gradients**: `bg-gradient-primary`, `text-gradient-primary`

### 4.3 Tailwind CSS Only

- Nur TailwindCSS-Klassen
- Keine inline styles
- Flexbox für Layouts (Grid nur wenn nötig)

---

## 5. UI-Regeln

### 5.1 Mobile-First Space Efficiency

UI MUSS Mobile-First designed werden:
- Kleine Schriftgrößen
- Geringe Abstände
- Collapsible Bereiche
- Aber: hochmodernes Design beibehalten

### 5.2 UI Library Defaults respektieren

**Niemals** Standard-Höhe/Padding von UI-Library-Komponenten (Radix, Shadcn) manuell überschreiben:
```tsx
// ❌ FALSCH
<TabsTrigger className="py-3 h-12">

// ✅ RICHTIG - Variants nutzen
<TabsTrigger size="lg">
```

### 5.3 Solide Hintergrundfarben für Dialoge

```tsx
// ❌ FALSCH - halbtransparent
<DialogContent className="bg-black/40">

// ✅ RICHTIG - solid
<DialogContent className="!bg-[#0c0f1a]/95">
```

### 5.4 Z-Index + Overflow Check

Vor jedem UI-Change an Dropdowns, Popovers, Kontextmenüs:
- Parent mit `overflow: hidden`?
- Portal gerendert?
- Z-Index korrekt?

---

## 6. Animationen

- **Bevorzugt:** AutoAnimate, FadeContent
- **Simpel halten**
- **Keine Endlos-Animationen** (nur Interaktions-Animationen)

---

## 7. Mock-Übernahme

Bei Screenshot/Referenz-Komponente:
1. **Mock-Treue zuerst:** Layout, Größen, Abstände müssen passen
2. **Keine Doppel-UI:** Alte Liste entfernen wenn neue ersetzt
3. **Abnahme-Frage:** "Sieht es im Screenshot-Vergleich hochwertig aus?"

---

## Referenzen

| Thema | Dokumentation |
|-------|---------------|
| Design-Patterns | `shared-docs/agents/global-rule-agent.md` |
| Frontend-Modernisierung | `shared-docs/agents/shared-docs/modernize-frontend.md` |
| Responsive Dialoge | `shared-docs/design/responsive-dialog-architecture.md` |
| Liquid Glass Design | `shared-docs/design/liquid-glass-guide.md` |
| LocalBench Components | `shared-docs/agents/shared-docs/localbench-component-library-prompts.md` |
