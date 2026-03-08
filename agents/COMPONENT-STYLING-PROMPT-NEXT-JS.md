# Komponenten-Audit: Grafiksystem + Color Theme Styling

> **Zweck:** Komponente pruefen und Komponente hochwertiger machen, liquid glass like design aber gleichzeitig performant.

---

## Auftrag

1. Lies die Komponente
2. Pruefe gegen die Checkliste
3. Fixe alle Probleme und verbessere die Komponente, hochwertiger liquid glass like design aber gleichzeitig performant
4. Kurze Zusammenfassung

---

## System 1: Graphics Performance System

CSS-Variablen (`--gfx-*`) in `app/styles/globals/globals-graphics-core.css`, gesteuert ueber `data-graphics-preset` auf `<html>`. Presets: ultra, high, medium, low, lowest, custom.

### GFX Utility-Klassen (IMMER statt hardcodierter Tailwind-Werte)

| Kategorie | Klassen |
|---|---|
| **Backdrop Blurs** | `gfx-backdrop-blur-{xs\|sm\|md\|lg\|xl\|2xl}` |
| **Shadows** | `gfx-shadow-elevated-{xs\|sm\|md\|lg\|xl\|2xl}` |
| **Glows** | `gfx-shadow-glow-{farbe}-{xs\|sm\|md\|lg}` |
| **Drop Shadows** | `gfx-drop-shadow-{farbe}-{sm\|md\|icon}` |
| **Decorative Blurs** | `gfx-decorative-blur`, `-sm`, `-md` |
| **Dialog Shadows** | `gfx-shadow-dialog-dark`, `-light`, `-content` |

### CSS-Variablen fuer inline Styles

```tsx
style={{ boxShadow: `var(--gfx-shadow-glass-card)` }}
style={{ backdropFilter: `blur(var(--gfx-backdrop-blur-md))` }}
style={{ textShadow: `var(--gfx-text-shadow-sm)` }}
```

### Toggle-Variablen (1=an, 0=aus)

`--gfx-backdrop-blur-enabled`, `--gfx-box-shadow-enabled`, `--gfx-drop-shadow-enabled`, `--gfx-text-shadow-enabled`, `--gfx-glow-effects-enabled`, `--gfx-gradients-enabled`, `--gfx-light-blobs-enabled`, `--gfx-gradient-opacity`

---

## System 2: Color Theme System

9 Themes via `data-theme` auf `<html>`. CSS-Variablen in `app/styles/core-theme-tokens.css`.

### Semantische CSS-Variablen (IMMER nutzen)

`--background`, `--foreground`, `--card`, `--primary`, `--primary-light`, `--accent`, `--muted`, `--muted-foreground`, `--border`, `--ring`, `--popover`, `--popover-foreground`, `--secondary`, `--destructive`

### Hintergruende: IMMER Light & Dark Mode kompatibel & Theme-Orientiert!

- **STRIKTE REGEL: KEINE HARDCODIERTEN HEX-FARBEN UND KEINE SLASH-FARBEN FÜR HINTERGRÜNDE!**
- **Dark Mode & Light Mode**: Es MÜSSEN immer harte, theme-orientierte Background-Klassen verwendet werden (z.B. `bg-background`, `bg-card`, `bg-popover`). Diese Klassen passen sich automatisch an das aktuell ausgewählte Theme an.
- **NIEMALS** `color-mix(themeColor, ...)` oder Opazitäts-Slashes wie `bg-white/50` oder `dark:bg-[#0c0f1a]/80` als Haupthintergrund für Container, Dialoge oder Panels nutzen. Diese führen zu Blaustichen oder unerwünschten Transparenzen.
- **DARK-MODE FARBTON-REGEL:** Falls ausnahmsweise ein Hex-Wert für Dark-Backdrops nötig ist (z.B. Overlay hinter Dialogen), MUSS die Farbe **neutrales Steingrau** sein (R/G/B-Kanäle nahezu gleich, z.B. `#111113`, `#0f0f11`, `#131316`). **NIEMALS** bläuliche/türkise Hex-Werte wie `#0c0f1a` verwenden, bei denen der Blaukanal deutlich höher ist als Rot/Grün!
- **Ränder (Borders)**: Sollen ab sofort **IMMER als sauberes, hochwertiges Licht-Weiß-Glas gestaltet werden**, NIEMALS theme-orientiert.
  - **Dark Mode (Standard)**: `border-white/[0.08]` → `hover:border-white/[0.14]` — NIEMALS über 0.14 als Default!
  - Light Mode: `border-black/[0.08]` → `hover:border-black/[0.14]`
- Theme-Farbe NUR noch sehr dezent fuer vereinzelte Glows oder Text-Akzente nutzen.

```tsx
// Theme-Farbe holen (NUR für Glows oder spezielle Text-Akzente!):
const { colorTheme } = useColorTheme();
const currentTheme = allThemes.find(t => t.id === colorTheme);
const themeColor = currentTheme?.previewColor || "hsl(265 85% 75%)";

// ERLAUBT: Glows, Box-Shadows
style={{ boxShadow: `...calc(32px * ...) color-mix(in srgb, ${themeColor} 10%, transparent)...` }}
// VERBOTEN: Borders (nutze stattdessen border-white/60 dark:border-white/10)
// VERBOTEN: Hardcodierte oder Slash-Backgrounds wie dark:bg-[#0c0f1a]/80
```

---

## Checkliste

### A) Shadows: `shadow-*` → `gfx-shadow-elevated-*`
### B) Blurs: `backdrop-blur-*` → `gfx-backdrop-blur-*`
### C) Inline boxShadow → `var(--gfx-*)` oder `calc(... * var(--gfx-*-enabled))`
### D) Inline backdropFilter → `gfx-backdrop-blur-*` Klasse
### E) Inline drop-shadow → `gfx-drop-shadow-*` Klasse oder `calc()`
### F) Inline text-shadow → `var(--gfx-text-shadow-sm)`
### G) Decorative blurs → `gfx-decorative-blur-*` Klasse
### H) Hardcodierte Design-Farben → `--primary`, `--accent`, `hsl(var(--primary))`

Status-Farben (red=Fehler, emerald=Erfolg, amber=Warnung) bleiben hardcodiert - OK!

### I) Dialoge/Overlays: Solide + theme-kompatibel (Light/Dark)

| Typ | Loesung |
|---|---|
| Dialog-Backdrop | `gfx-backdrop-blur-md bg-black/50 dark:bg-black/80` (Hier ist Opacity für Overlays erlaubt, aber KEIN #0c0f1a) |
| Dialog/Popover-Content | `bg-background` oder `bg-popover` (KEIN Farb-Tint, KEIN /80, passt sich an Light/Dark an!) |
| Sidebar/Panel | Solide `bg-card` oder `bg-background` (Light/Dark fähig) |

### J) Dekorative Gradienten → `opacity: var(--gfx-gradient-opacity)`
### K) GPU-intensive Animationen bei "lowest" reduzieren
### L) Buttons & interaktive Elemente: Muted Glass Style (Standard!)

Alle Buttons, Links-als-Buttons und interaktive Trigger MÜSSEN standardmäßig **muted** gestaltet werden. KEINE auffälligen Farbgradienten (`bg-gradient-to-br from-orange-500`, `bg-purple-600`, `bg-primary`) als Default.

**Standard-Button (Muted Glass):**
```tsx
className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/5 px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 gfx-backdrop-blur-sm transition-all hover:bg-white/10 hover:text-slate-900 dark:hover:text-white hover:border-white/[0.14] active:scale-95"
```

**Regeln:**
- Background: `bg-white/5` + `gfx-backdrop-blur-sm` (Glass-Effekt)
- Border: `border-white/[0.08]` → `hover:border-white/[0.14]` (NIEMALS über 0.14!)
- Text: `text-slate-700 dark:text-slate-300` → `hover:text-slate-900 dark:hover:text-white`
- KEINE Glows, KEINE farbigen Gradienten, KEINE `bg-primary`
- Ausnahme: Destructive-Actions dürfen `text-red-*` nutzen

---

## Regeln (Kurzform)

1. `shadow-*` → `gfx-shadow-elevated-*`
2. `backdrop-blur-*` → `gfx-backdrop-blur-*`
3. Hardcodierte `boxShadow` → `var(--gfx-*)`
4. Design-Farben → `--primary`, `--accent`
5. Dialoge/Hintergründe: `bg-background`, `bg-popover`, `bg-card` MÜSSEN harte Theme-Klassen sein. Keine Slash-Farben für Hauptelemente, keine hardcodierten Hex-Werte wie `#0c0f1a`.
6. `color-mix(themeColor)` NUR fuer Glows/Akzente. **Nicht für Ränder (Borders)** nutzen. Ränder sollen aus hochwertigem weißen Glas bestehen (`border-white/[0.08]` Dark Mode, max `hover:border-white/[0.14]`).
7. Status-Farben (red, emerald, amber) bleiben hardcodiert
8. Keine fixen Opacity-Hintergruende für Dialoge/Cards (`bg-[#030303]/60` oder `dark:bg-[#0c0f1a]/80`) → IMMER solide Theme-Klassen (`bg-background` etc.) verwenden!
9. **L-Schrift-Kontrast**: Icons, Standardtexte, Labels und Buttons MÜSSEN in Light- und Dark-Mode gut sichtbar sein! Verwende `text-slate-900 dark:text-slate-100` oder `text-slate-600 dark:text-slate-400`. Transparenzen wie `bg-white/5` für Hover/Zustände bei gleichzeitig hellem Text (`text-slate-100`) sind im Light Mode unsichtbar! Verwende daher Gegenstücke wie `bg-black/5 dark:bg-white/5` oder Ähnliches.
10. **Muted Buttons (Standard)**: Buttons IMMER als Muted Glass (`bg-white/5 border-white/[0.08] text-slate-700 dark:text-slate-300`). KEINE farbigen Gradienten oder `bg-primary` als Default. Nur Destructive-Actions dürfen rot sein. **Border-Hover max `border-white/[0.14]`!**


Orientiere dich auch an die Mock-Designs, für hochwertiges design:
public\mock-general-dark.png
public\mock-general.png

mehr aber in richtung liquid glass/gaming style wie hier:
shared-docs\mock-designs\mock-liquid-glass-2.png
shared-docs\mock-designs\mockup-liquid-glass-1.png