# Modernize Frontend (SSOT)

## Was ist diese Datei?

Diese Datei ist der verbindliche Frontend-Prompt fuer alle UI-Arbeiten in NoteDrill. Wenn du eine Komponente baust, ueberarbeitest oder modernisierst, lies diese Datei vorher.

Das Design-System ist als fertige Komponenten-Bibliothek unter `components/design-system/` verfuegbar. Alle Komponenten sind ueber `@/components/design-system` importierbar.

---

## Design-Philosophie

Das Design-System folgt dem Prinzip **"Eleganz durch Zurueckhaltung"**:

- **Minimal, technisch, editorial** - klare Flaechen, wenig visuelles Rauschen
- **Subtile Tiefe** statt harter Kanten - Opacity-basierte Borders, weiche Shadows
- **Dark-first** mit hochwertigem Light-Mode (Liquid Glass)
- **Grosszuegiges Spacing** - Luft zwischen Elementen schafft Ruhe
- **Sanfte Micro-Interactions** - leichtes Anheben bei Hover (`-translate-y-0.5`), keine aggressiven Effekte

---

## Verfuegbare Komponenten

Import: `import { DesignButton, DesignCard, ... } from '@/components/design-system'`

### Kern-Komponenten

| Komponente | Zweck | Wichtige Props |
|---|---|---|
| `DesignButton` | Buttons mit 22+ Varianten | `variant`, `size`, `fullWidth` |
| `DesignCard` | Cards mit Liquid Glass / Dark Flat | `interactive` |
| `DesignCardHeader/Title/Description/Content` | Card-Unterteile | Compound-Pattern |
| `DesignBadge` | Status-Badges | `tone` (neutral, info, warning, success, danger), `icon` |
| `DesignInput` | Textfeld (Pill-Form) | Standard HTML Input Props |
| `DesignSelect` | Dropdown-Auswahl (Radix UI) | `options`, `value`, `onChange` |
| `DesignCheckbox` | Checkbox | Standard Props |
| `DesignSlider` | Range-Slider | Standard Props |
| `DesignSection` | Abschnitts-Wrapper | Layout-Container |
| `DesignCollapsible` | Aufklappbarer Bereich | - |

### Animierte Komponenten

| Komponente | Zweck |
|---|---|
| `DesignAnimatedBadge` | Badge mit Framer Motion Ein-/Aus-Animation |
| `DesignAnimatedCounter` | Animierter Zahlenzaehler |
| `DesignAnimatedProgress` | Animierter Fortschrittsbalken |
| `DesignAnimatedSubmitButton` | Submit-Button mit Lade-/Erfolgs-Zustaenden |

### Daten & Layout

| Komponente | Zweck |
|---|---|
| `DesignAvatarGroup` | Avatar-Gruppe |
| `DesignPreviewTile` | Vorschau-Kachel |
| `DesignDataDisplayActions` | Datenanzeige mit Aktions-Integration |

---

## Button-Varianten (Schnellreferenz)

Die wichtigsten `DesignButton` Varianten:

| Variant | Wann verwenden |
|---|---|
| `primary` | Haupt-CTA, hoechste Prioritaet |
| `secondary` | Zweite Aktion, niedrigere Prioritaet |
| `outline` | Tertiare Aktionen, dezent |
| `ghost` | Minimale Aktionen, nur Text + leichter Hover |
| `theme` | Primaerfarbe der App (folgt `--primary`) |
| `themeSoft` | Weichere Theme-Variante |
| `toolbar` / `toolbarActive` | Toolbar-Buttons mit Zustandswechsel |
| `chip` / `chipActive` | Pill-foermige Filter/Tags |
| `save` / `success` | Gruen - Speichern/Erfolg |
| `warning` | Gelb - Warnung |
| `danger` | Rot - Loeschen/Gefahr |
| `info` | Blau - Information |
| `close` | Schliessen-Button (transparent) |

**Sizes:** `sm` (h-9), `md` (h-11, Default), `lg` (h-12), `pill` (h-9 rounded-full), `icon` (h-10 w-10), `iconSm` (h-9 w-9)

---

## Design-Tokens

### Farben

**Light Mode:**
- Background: `#fafafa` (Off-White, nicht reines Weiss)
- Surface/Panel: `bg-white/80 backdrop-blur-xl` (Liquid Glass Effekt)
- Border: `border-black/5` bis `border-black/10` (extrem subtil)
- Text Primary: `#000000`
- Text Muted: `text-black/50` bis `text-black/65`
- Shadow: `shadow-xl shadow-black/[0.04]` (kaum sichtbar, aber erzeugt Tiefe)

**Dark Mode:**
- Background: `#000000`
- Surface/Panel: `bg-[#0a0a0a]` (nicht reines Schwarz fuer Tiefe)
- Border: `border-white/5` bis `border-white/10`
- Text Primary: `#ffffff`
- Text Muted: `text-white/50` bis `text-white/65`
- Shadow: `shadow-none` (Dark Mode nutzt keine Shadows, nur Glows)

**Semantische Farben (konsistent ueber Badge/Button):**
- Success/Save: Emerald-Toene (`emerald-50/75`, `emerald-400/[0.09]`)
- Warning: Amber-Toene
- Danger: Rose-Toene
- Info: Sky-Toene

### Typografie

Drei Font-Familien im Zusammenspiel:

| Font | Klasse | Einsatz |
|---|---|---|
| **Inter** | `font-sans` | UI, Buttons, Body-Text (Standard) |
| **Playfair Display** | `font-serif italic font-light` | Hero-Headlines, Abschnittsueberschriften |
| **JetBrains Mono** | `font-mono` | Zahlen, technische Werte, Code |

**Editorial-Pattern:** In grossen Headlines einzelne Schluesselbegriffe mit `font-serif italic font-light` hervorheben, Rest bleibt Sans.

### Border-Radius

| Element | Radius |
|---|---|
| Cards, Panels, Sections | `rounded-3xl` (24px) |
| Dialoge, Innenlayer | `rounded-2xl` |
| Buttons, Controls | `rounded-xl` (12px, Standard) |
| Inputs, Chips, Pills | `rounded-full` |

### Spacing

- Section-Container: `p-8` (Desktop), `p-4` bis `p-6` (Mobil)
- Card-Container: `p-6`
- Card-Header: `p-6 pb-0`
- Card-Content: `p-6`
- Gaps zwischen Elementen: `gap-4` bis `gap-6`

---

## Kernmuster

### Card (Liquid Glass + Dark Flat)

```tsx
<DesignCard interactive>
  <DesignCardHeader>
    <DesignCardTitle>Titel</DesignCardTitle>
    <DesignCardDescription>Beschreibung</DesignCardDescription>
  </DesignCardHeader>
  <DesignCardContent>
    {/* Inhalt */}
  </DesignCardContent>
</DesignCard>
```

Hinter den Kulissen:
- Light: `bg-white/80 backdrop-blur-xl border-black/10 shadow-xl shadow-black/[0.04] rounded-3xl`
- Dark: `bg-[#0a0a0a] border-white/5 shadow-none rounded-3xl`

### Border-Regeln (kritisch)

Borders sind IMMER subtil. Keine leuchtenden Primaerfarben auf Border-Linien.

| Zustand | Light | Dark |
|---|---|---|
| Ruhe | `border-black/5` bis `border-black/10` | `border-white/5` bis `border-white/10` |
| Hover | `hover:border-black/20` | `hover:border-white/10` bis `white/20` |
| Fokus | `border-black/20` bis `black/30` | `border-white/20` bis `white/25` |

**Verboten:** `border-primary-500`, `border-green-400`, `border-blue-500` auf neutralen Flaechen.

### Hover-Effekt

Das System nutzt konsistent ein leichtes Anheben bei Hover:

```css
hover:-translate-y-0.5
```

Kombiniert mit subtiler Border-Verstaerkung und leichtem Background-Shift. Kein Scale, kein Shadow-Change.

### Overlay-Muster (Popover, Dropdown, Dialog)

- `rounded-2xl` + leichter Blur + feine Border
- Dark: `bg-[#0a0a0a] border-white/5`
- Light: `bg-white/80 backdrop-blur-xl border-black/10`

---

## Workflow fuer neue UI-Aufgaben

1. **Pruefen:** Gibt es bereits eine `Design*`-Komponente dafuer? -> Nutzen statt neu bauen.
2. **Tokens verwenden:** Farben, Borders, Radii aus diesem Dokument, keine Ad-hoc-Werte.
3. **Komposition:** Neue Muster aus bestehenden Primitives zusammensetzen.
4. **Dark/Light:** Beide Modi testen. Dark ist nicht nur "invertiert", sondern bewusst gestaltet.
5. **Responsiv:** 375px und Desktop pruefen.

---

## Anti-Patterns (vermeiden)

- Leuchtende Border-Linien auf neutralen Flaechen
- Harte Schatten im Dark Mode (dort gilt: flach + Glow)
- Zufaellige Farben ohne Token-Bezug
- Verschiedene Radius-Werte ohne System
- Neue One-Off-Komponenten statt bestehende `Design*`-Bausteine zu nutzen
- Nur Inter ueberall ohne Serif/Mono-Kontrast bei Headlines und Zahlen
- Scale-Animationen bei Hover (stattdessen `-translate-y-0.5`)
- Endlos-Animationen oder aggressive Motion (nur dezente Interaktions-Animationen)

---

## Kurz-Checkliste

- [ ] Bestehende `Design*`-Komponenten verwendet/erweitert?
- [ ] Tokens aus diesem Dokument (Farben, Borders, Radii, Spacing)?
- [ ] Borders muted (opacity-basiert, keine leuchtenden Farben)?
- [ ] Dark + Light Mode geprueft?
- [ ] Mobile + Desktop geprueft?
- [ ] Typografie-Mix (Sans + Serif fuer Headlines + Mono fuer Zahlen)?

---

## Quellen

- Komponenten: `components/design-system/*.tsx`
- Barrel-Export: `components/design-system/index.ts`
- Design-Referenz (Original): `D:\CODING\React Projects\localbench-component-library\src`
- Pilot-Bereich: `http://localhost:3001/admin/design` (`app/admin/design/`)
