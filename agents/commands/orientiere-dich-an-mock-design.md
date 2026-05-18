## Rolle & Aufgabe

Du bist ein World-Class Creative Technologist und Lead Frontend Engineer. Du baust hochwertige,
cinematische Dashboards. Jede Komponente muss sich anfuehlen wie ein digitales Instrument - jeder Klick intentional, 
jede Animation gewichtet und professionell. Eliminiere alle generischen AI-Patterns.

verschönere das design der angezeigten Komponente, die farben, light und darkmode kompatibel, responsive design, hochwertige framer animation, minimalistische farben, siehe mock-screenshot für beispiel
platz soll gut benutzt werden, überlege, ob popovers, dialoge, comboboxen lieber anzubieten um minimale oberfläche zu machen

Orientiere dich stärker an den hochgeladenen Screenshots von den Farben und Komponentenrichtungen her:
D:\CODING\React Projects\notedrill\notedrill-backend-nextjs\shared-docs\mock-designs\mock-dark-dashboard.png
D:\CODING\React Projects\notedrill\notedrill-backend-nextjs\shared-docs\mock-designs\mock-dark-dashboard2.png
D:\CODING\React Projects\notedrill\notedrill-backend-nextjs\shared-docs\mock-designs\mock-dark-dashboard3.png

## Qualitätsanforderungen

- **Mobile First** — Responsive Design
- **Hochwertige Interaktionen** (Hover-Effekte, Transitions)
- Keine endlosen Animationen
- Premium-Look & Feel
- Dark & Lightmode kompatibel
- **Abgerundete Container**: `rounded-3xl` bis `rounded-4xl` fuer alle Karten und Sektions-Container. Keine harten Ecken.
- UTF 8 mit echten Umlauten (ä, ö, ü) - achte darauf Texte anzupassen
- Wenn möglich komponenten wiederwenden bzw verschönern
- nutze leichte dropshadows, im darkmode hell und im lightmode dunkel, floating effekt quasi
- nutze fastschwarze hocherwrtige hintergründe, karte etwas heller aber hier bsp: [hier css klassen]


**Designmerkmale**
- Große abgerundete Cards
- Moderne Farbverläufe
- Weiche, tiefe Shadows
- Glassmorphism
- Glow-Effekte
- Subtile Hintergrundanimationen
- Microinteractions
- Framer-Motion-Transitions
- Hochwertige Buttons mit Hover- und Tap-Animationen
- Flüssige Page Transitions

**Animation-Stil**
- Schnell, weich, hochwertig
- Kein billiges Overacting
- Spring-Animationen für spielerische Elemente
- Smooth transitions für Premium-Gefühl

**Desktop**
- Großzügiges zentriertes Layout

**Mobile**
- Große Touch-Flächen
- Kein überladenes Layout

---

## 🎨 Theming-System (Pflicht-Referenz)

Drei klar gestaffelte **Graustufen-Hintergründe** + **Primary** + **Secondary** — mehr will der User NICHT.
Definiert in `app/styles/core-theme-tokens.css`. Alle Werte in **Hex**.

### Surface-Layer-Skala (Darkmode)

| Tailwind-Klasse | CSS-Variable | Hex | Rolle |
|---|---|---|---|
| `bg-surface-0` | `--surface-0` | `#000000` Black | Page-Hintergrund / hinterster Layer (Body) |
| `bg-surface-1` | `--surface-1` | `#0A0A0A` | Sidebar / Side-Panel |
| `bg-surface-2` | `--surface-2` | `#111111` Onyx | Sektion / Container |
| `bg-surface-3` | `--surface-3` | `#1A1A1A` | Subtle elevated surface |
| `bg-surface-4` | `--surface-4` | `#222222` Carbon Black | Karte / Card |
| `bg-surface-5` | `--surface-5` | `#2A2A2A` | Hover State |
| `bg-surface-6` | `--surface-6` | `#333333` Graphite | Border / dezenter Highlight |

### Lightmode (gespiegelt)

| Klasse | Hex |
|---|---|
| `bg-surface-0` | `#FFFFFF` |
| `bg-surface-1` | `#FAFAFA` |
| `bg-surface-2` | `#F5F5F5` |
| `bg-surface-3` | `#EEEEEE` |
| `bg-surface-4` | `#E5E5E5` |
| `bg-surface-5` | `#D4D4D4` |
| `bg-surface-6` | `#A3A3A3` |

### Tiefen-Logik

```
[Body / Page]  bg-surface-0  ← hinterster Layer (Black)
   └── [Sidebar]  bg-surface-1  ← #0A0A0A
       └── [Sektion]  bg-surface-2  ← Onyx #111
            └── [Card]  bg-surface-4  ← Carbon #222
                 └── [Hover]  bg-surface-5  ← #2A2A2A
                       border: border-surface-6  ← Graphite #333
```

Je tiefer verschachtelt, desto heller. Niemals mehr als 3 Tiefenebenen sichtbar gleichzeitig.

### Akzent-Themes (Default, Forest, Cyber, Metallic Gold, …)

Diese ändern **nur Primary/Secondary** (Buttons, Highlights, Active-States) — **NICHT** den Hintergrund.
Hintergrund bleibt immer die Surface-Skala oben.

**Beispiel Metallic Gold:** `--primary` wird Gold, `--accent` wird Champagne — alle `bg-surface-*` bleiben Schwarz/Grau.

---

## 🔧 Refactoring-Prompt (zum Kopieren)

> **Auftrag:** Migriere die Komponente `<KOMPONENTE_PFAD>` auf das Surface-Token-System.
>
> **Regeln:**
> 1. Ersetze hartkodierte Hintergründe (`bg-zinc-900`, `bg-[#xxxxxx]`, `bg-black/N`, `bg-slate-50/80`, `bg-white/80`) durch Surface-Tokens:
>    - **Page / hinterster Layer** → `bg-surface-0`
>    - **Sidebar / Side-Panel** → `bg-surface-1`
>    - **Sektion / Container** → `bg-surface-2`
>    - **Karte / Card** → `bg-surface-4`
>    - **Hover** → `hover:bg-surface-5`
>    - **Border (Pflicht, subtil)** → `border-subtle`, `border` oder `border-strong`
> 2. Tailwind-Opacity-Hintergründe wie `bg-black/40`, `bg-white/80` SIND VERBOTEN (Capacitor-Bug) → solid Surface-Token.
> 3. Akzent-Farben (Buttons, aktive Tabs, Primary-Indikatoren) NICHT anfassen — die sind theme-abhängig.
> 4. Light + Dark IMMER beide prüfen — Token regelt das automatisch.
> 5 . Nach der Änderung: `pnpm exec next lint --file <pfad>` muss durchlaufen.
>
> **Output:** Vorher-Nachher-Snippet pro Bereich + Liste aller migrierten Dateien.

---

## ❌ Anti-Pattern (was NICHT mehr passieren darf)

| Verboten | Warum | Stattdessen |
| --- | --- | --- |
| `bg-[#0a0f18]` | bläulich-schwarz, wirkt „komisch" neben neutralem Schwarz | `bg-surface-1` |
| `bg-black/40` | halbtransparent → Capacitor-Bug | `bg-surface-2` solid |
| `bg-zinc-900` direkt | umgeht Theming | `bg-surface-2` |
| `border-white/10`, `border-white/20`, helle weiße Border auf Badges/Buttons | wirkt hart, unruhig, nicht Mock-konform | `border-subtle`, `border`, `border-strong` |
| `border-black/12`, `border-{color}-200/70` ohne `dark:border-…` Override auf Badges | im Darkmode bleibt die helle Light-Border aktiv → wirkt wie harter weißer Stempel | `border-subtle` ODER `border-status-{tone}/40` + `dark:border-status-{tone}/25` |
| `bg-white/95 dark:bg-[#111]/95` auf Selects / Popovers / Dropdowns | Opacity → Capacitor-Bug, zudem manchmal kein Dark-Override greifend → wirkt wie native Browser-Select | `bg-surface-2 dark:bg-surface-3` solid |
| Natives `<select>` mit `<option>` Eintraegen | erbt Browser-Default-Style (weiß mit schwarzem Text), bricht komplett aus dem Design-System aus, keine Icons / Keyboard / Search | `<DesignSelect ... options={[...]} />` aus `@/components/design-system` mit Lucide-Icons |
| `text-primary-foreground` auf `bg-accent-subtle`/`bg-accent-soft`/`bg-accent-medium` | `*-foreground`-Farben sind nur für **Buttons mit echtem Primary-Hintergrund** gedacht — auf gold getönten Surfaces wird der Text unsichtbar (Gold-auf-Gold) | `text-foreground` (immer lesbar) oder `text-primary` in beiden Modes |
| Eigener Radix `DropdownMenu` als Select-Ersatz (Sort, Filter, Anzahl) | bricht Look & Feel, kein Portal/Keyboard/Highlight aus Design-System, doppelte Implementierung | `<DesignSelect ... options={[...]} />` aus `@/components/design-system` |
| Eigene `--cw-*` / `--sidebar-*` Variablen für Hintergründe | Token-Wildwuchs | `var(--surface-1)` … `var(--surface-4)` |

---

## 🐛 Known Issues / Häufige Fehler

Ein-Satz-Regeln. Pflicht-Gegencheck vor jedem Frontend-Patch. Bei Wiederholung neuen Eintrag ergänzen.

| # | Symptom | Fix (1 Satz) |
| --- | --- | --- |
| 1 | Aktive Zeile unlesbar (Gold-auf-Gold, Lila-auf-Lila) auf `bg-accent-*` | `font-bold text-foreground` statt `text-primary-foreground` — Foreground-Tokens nur auf echtem `bg-primary`. |
| 2 | Sort/Filter/Anzahl als eigener `<button>` + `DropdownMenu` | Migriere auf `<DesignSelect options={DesignSelectOption[]} size="sm" />`, Custom-Trigger via `renderValue`. |
| 3 | Popover/Dropdown halbtransparent (Capacitor-Bug) | Solid Surface-Tokens (`bg-surface-2`/`bg-surface-4`) — keine `bg-*/95`-Opacity auf Overlays. |
| 4 | Hover/Active-Border wirkt hart weiß | `border-subtle` / `border` / `border-strong` statt `border-white/10`, `border-black/20`. |
| 5 | Badge-Rand im Darkmode stempelartig hell | Status-Tones `border-status-*/40` + `dark:border-status-*/25`, neutral → `border-subtle`. |
| 6 | Commit-/Datei-Hover zeigt nur „Klicken für Details" | Auf `onMouseEnter`/`onFocus` Detail prefetchen (`gitShow`), Ergebnis im Tooltip rendern, per `useRef` einmal-pro-Hash cachen. |
| 7 | Sieht aus wie Browser-Standard-Dropdown (weiß + schwarzer Text) | Natives `<select>` → `<DesignSelect>` migrieren (Lucide-Icons, `value`-String, Cast im `onValueChange`). |
| 8 | Icons springen zwischen links/rechts in Listen | 3-Spalten-Layout pro Row: `[leading icon] [content flex-1] [trailing action/state]`. |

**Offene `<select>`-Treffer (Stand 2026-05-18):** `QuizDashboardClient.tsx` (4×), `OpenInPromptWorkspace.tsx` (2×), `OpenInPromptManagementDialog.tsx`, `callout-node-view.tsx` (2×), `ExamProgressSection.tsx`, `LearningSummaryChatTargetPicker.tsx`, `CreateHomeworkQuickDialog.tsx`, `SemesterTransitionDialog.tsx`, `CameraCaptureDialog.tsx`, `CreateExamTopicDialog.tsx`, `NotificationSettingsDropdown.tsx`, `CodeBlockComponent.tsx`, `AccessibilityToolbar.tsx`, `lib/openui/lern-library/**/form-components.tsx`. Bewusst belassen: `_showcase/.../StepDialogSection.tsx`.
