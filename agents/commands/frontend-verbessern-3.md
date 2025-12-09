# 🎨 Frontend Verbessern - Liquid Glass Design

> **Zweck:** Dieser Prompt wird verwendet, wenn eine Komponente visuell verbessert werden soll. Du erhältst: (1) Die aktuelle Komponente + Screenshot, (2) Liquid Glass Screenshots als Inspiration.

---

## 📋 Anleitung

**Schritt 1:** Analysiere die bereitgestellte Komponente und ihren aktuellen Screenshot
**Schritt 2:** Studiere die Liquid Glass Screenshots (`shared-docs/liquid-glass-*.png`) als Inspiration
**Schritt 3:** Erstelle einen Plan welche Elemente du überarbeiten wirst
**Schritt 4:** Implementiere das Liquid Glass Design mit Light/Dark Mode Support

---

## 🎯 Liquid Glass Design-Ästhetik

### Was ist Liquid Glass?
Ein hochmodernes, premium Design mit "Gaming" Feel - tiefe Räumlichkeit, schwebende Glasflächen, farbige Lichtakzente und versteckte Texturen die durch Licht enthüllt werden.

### Die 4 Kernelemente:

#### 1. Tiefe & Räumlichkeit
Die UI wirkt wie schwebende Glasflächen über einem tiefen, dunklen Raum.
```css
/* Dark Mode */
background: rgba(20, 20, 25, 0.4);
backdrop-filter: blur(24px) saturate(180%);
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* Light Mode */
background: rgba(255, 255, 255, 0.75);
backdrop-filter: blur(20px) saturate(120%);
box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9);
```

#### 2. Licht als Akzent (Punkt-Glows)
Farbiges Licht strahlt von aktiven Elementen - Icons, Status-Badges, Buttons. Das Licht ist weich und diffus.
```tsx
/* Punkt-Glow hinter Icon/Button */
<div className="absolute inset-0 bg-orange-500/60 blur-[50px] rounded-full" />

/* Status-Glows (Tailwind) */
// Orange = Loading/Aktion
className="shadow-[0_0_20px_-5px_rgba(249,115,22,0.6)]"
// Grün = Success
className="shadow-[0_0_20px_-5px_rgba(34,197,94,0.6)]"
// Rot = Error
className="shadow-[0_0_20px_-5px_rgba(239,68,68,0.6)]"
// Blau = Info
className="shadow-[0_0_20px_-5px_rgba(59,130,246,0.6)]"
```

#### 3. Versteckte Struktur (Grid/Grain Textur)
Subtile Texturen im Hintergrund, normalerweise fast unsichtbar. Durch Licht werden sie sichtbar - wie eine Taschenlampe die ein Muster enthüllt.
```tsx
/* Grid-Textur */
<div
  className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none"
  style={{
    backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px),
                      linear-gradient(to bottom, #808080 1px, transparent 1px)`,
    backgroundSize: '24px 24px'
  }}
/>

/* Mask begrenzt Textur auf beleuchteten Bereich (optional) */
style={{ maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 0%, transparent 100%)' }}
```

#### 4. Glasmorphism
Oberflächen wirken wie gefrostetes Glas - halbtransparent mit Blur, dezente Borders.
```css
/* Dark Mode Border */
border: 1px solid rgba(255, 255, 255, 0.08);

/* Light Mode Border */
border: 1px solid rgba(0, 0, 0, 0.06);

/* Blur */
backdrop-filter: blur(16px) saturate(180%);
```

---

## ⚡ Laser/Glow Ray Effekte

Für besondere Akzente - dezente "Laser" Linien die über Elemente gleiten:
```css
/* Top Laser Line */
.laser-line {
  position: absolute;
  top: 0;
  left: 20%;
  right: 20%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--glow-color), transparent);
  box-shadow: 0 0 15px var(--glow-color);
}
```

---

## 🌗 Light/Dark Mode (PFLICHT!)

**Jedes Element MUSS beide Modi unterstützen:**

| Eigenschaft | Dark Mode | Light Mode |
|-------------|-----------|------------|
| Background | `rgba(20,20,25,0.4)` / `bg-black/40` | `rgba(255,255,255,0.75)` / `bg-white/75` |
| Border | `border-white/8` | `border-black/6` |
| Text | `text-white/90` | `text-slate-900` |
| Glow Intensity | Stärker (`/60`) | Schwächer (`/30`) |
| Textur Opacity | `opacity-[0.08]` | `opacity-[0.04]` |

```tsx
/* Tailwind Pattern */
className="bg-white/75 dark:bg-black/40 border-black/6 dark:border-white/8"
```

---

## 📱 Mobile-First (PFLICHT!)

- **Kein horizontales Scrollen** - Buttons/Actions müssen sichtbar bleiben
- **Kompakte Y-Höhe** - Vertikaler Raum ist kostbar
- **Touch-Targets** - Min 44px für interaktive Elemente
- **Responsive Glows** - Kleinere blur-Werte auf Mobile

```tsx
/* Responsive Glow */
className="blur-[30px] sm:blur-[50px]"

/* Kompakte Padding */
className="p-3 sm:p-4"
```

---

## 🎮 Gaming-Like Interaktionen

**Hover/Click Effekte die sich "lebendig" anfühlen:**

```tsx
/* Scale on Hover */
className="transition-transform hover:scale-[1.02] active:scale-[0.98]"

/* Expand on Click (für Cards/Items) */
className="transition-all duration-300 data-[expanded=true]:scale-105"

/* Glow Intensivierung on Hover */
className="shadow-[0_0_15px_...] hover:shadow-[0_0_25px_...]"
```

---

## 🚫 Verbotene Patterns

❌ **Keine Framer Motion** - Nur CSS/Tailwind Animationen
❌ **Keine Endlos-Animationen** - Kein `animate-pulse`, `animate-shimmer`, `animate-spin` (außer bei Loading-Indikatoren)
❌ **Keine hardcodierten Farben** - Immer Theme-aware (`dark:...`)
❌ **Kein `npm run dev/build`** - Nur `npx tsc --noEmit`

---

## ✅ Checkliste vor Abschluss

- [ ] Light Mode getestet?
- [ ] Dark Mode getestet?
- [ ] Mobile Ansicht getestet (kein horizontales Scroll)?
- [ ] Hover-States vorhanden?
- [ ] Glows/Effekte dezent (nicht überladen)?
- [ ] `npx tsc --noEmit` erfolgreich?

---

## 📸 Inspiration Screenshots

Die folgenden Screenshots zeigen das Ziel-Design:
- `shared-docs/liquid-glass.png` - Lernkarten-Dialog mit warmem Orange-Glow
- `shared-docs/liquid-glass-5.png` - Minimalistisch, dezente Glasflächen
- `shared-docs/liquid-glass-6.png` - Backup Dashboard mit Icon-Glow, gestrichelte Tech-Borders
- `shared-docs/liquid-glass-7.png` - Notiz-Element mit blauem Punkt-Glow, Grid sichtbar
- `shared-docs/liquid-glass-8.png` - Status-Pill mit grünem Glow

**Workflow:** User packt seinen Komponenten-Screenshot + diese Liquid Glass Screenshots in den Chat. Du orientierst dich an den Beispielen und transformierst die Komponente.
