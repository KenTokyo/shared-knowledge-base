# Komponenten-Audit: GFX Graphics Performance + Color Theme Styling

> **Zweck:** Du bekommst den Pfad einer Komponente. Untersuche sie und stelle sicher, dass sie **korrekt** mit dem GFX Graphics Performance System und dem Color-Theme-System integriert ist. Fixe alle Probleme direkt.
>
> **Universell:** Dieser Prompt funktioniert in jedem Projekt, das das GFX-System nutzt (NoteDrill, TrackMeAI, etc.)
>
> **Version:** 2.0 (Scale-Faktoren-Pattern)
> **ULTRATHINK:** Aktiviert
> **Keine Unit Tests**

---

## Dein Auftrag

1. Lies die Komponente unter dem angegebenen Pfad
2. Pruefe sie gegen die Checkliste unten
3. Fixe alle gefundenen Probleme direkt im Code
4. Gib eine kurze Zusammenfassung: was war falsch, was hast du gefixt

---

## System 1: GFX Graphics Performance System

Dieses Projekt hat ein **CSS-Variablen-basiertes Grafiksystem**, das GPU-intensive Effekte steuert. User koennen zwischen Presets waehlen (ultra, high, medium, low, lowest). Bei "lowest" werden ALLE visuellen Effekte deaktiviert, damit die App auf schwachen Geraeten fluessig laeuft.

### Wie es funktioniert

- **7 Scale-Variablen** (`--gfx-*-scale`) werden in der GFX-Core-CSS definiert (Werte: 0 = aus, 1 = voll)
- Das aktive Preset wird ueber `data-graphics-preset` (oder `data-graphics-quality`) Attribut auf `<html>` gesetzt
- Presets setzen die Scale-Variablen auf verschiedene Werte (z.B. `--gfx-blur-scale: 0.4` bei medium)
- **Abgeleitete Variablen** berechnen sich automatisch: `--gfx-backdrop-blur-md: calc(18px * var(--gfx-blur-scale))`
- **Utility-Klassen** (`gfx-*`) nutzen diese abgeleiteten Variablen

### Scale-Variablen (die 7 Kern-Variablen)

```
--gfx-shadow-scale       (0-1)  Box-Shadows
--gfx-glow-scale         (0-1)  Glow-Effekte
--gfx-blur-scale         (0-1)  Blur + Backdrop-Blur
--gfx-drop-shadow-scale  (0-1)  Drop-Shadows (filter)
--gfx-text-shadow-scale  (0-1)  Text-Shadows
--gfx-gradient-opacity   (0-1)  Dekorative Gradienten
--gfx-decorative-scale   (0-1)  Light-Blobs, Blend-Modes, Noise
```

### Kompatibilitaets-Aliase (fuer bestehende calc-Patterns)

Einige Projekte nutzen `--gfx-*-enabled` Variablen. Diese sind als Aliase auf die Scale-Variablen gemappt:

```
--gfx-backdrop-blur-enabled  → var(--gfx-blur-scale)
--gfx-box-shadow-enabled     → var(--gfx-shadow-scale)
--gfx-glow-effects-enabled   → var(--gfx-glow-scale)
--gfx-light-blobs-enabled    → var(--gfx-decorative-scale)
```

### Verfuegbare GFX Utility-Klassen

**Nutze diese IMMER statt hardcodierter Tailwind-Werte.**

#### Backdrop Blurs (ersetzen `backdrop-blur-*`)
```
gfx-backdrop-blur-sm    (12px bei ultra, 0 bei lowest)
gfx-backdrop-blur-md    (18px bei ultra, 0 bei lowest)
gfx-backdrop-blur-lg    (26px bei ultra, 0 bei lowest)
gfx-backdrop-blur-xl    (40px bei ultra, 0 bei lowest)
```

#### Elevated Shadows (ersetzen `shadow-sm/md/lg`)
```
gfx-shadow-elevated-sm   (ersetzt shadow-sm)
gfx-shadow-elevated-md   (ersetzt shadow-md)
gfx-shadow-elevated-lg   (ersetzt shadow-lg)
gfx-shadow-elevated-xl   (ersetzt shadow-xl)
```

#### Glow Shadows (farbige Glows)
```
gfx-glow-{farbe}-{sm|md|lg}     (nutzt --gfx-glow-scale)
gfx-glow-primary-{sm|md|lg}     (nutzt hsl(var(--primary)))
```

#### Drop Shadows (farbige Icon-Glows)
```
gfx-drop-shadow-{farbe}-{sm|md}
gfx-drop-shadow-primary
```

#### Decorative Blurs (grosse Hintergrund-Effekte / Light Blobs)
```
gfx-decorative-blur       (100px, deaktiviert bei lowest)
gfx-decorative-blur-sm    (60px, deaktiviert bei lowest)
gfx-decorative-blur-md    (40px, deaktiviert bei lowest)
```

#### Performance Helpers
```
gfx-decorative         (pointer-events: none + user-select: none)
gfx-gpu                (Force GPU layer: translateZ(0) + will-change)
```

### CSS-Variablen fuer `style={{ }}` (inline Styles)

Wenn keine passende Utility-Klasse existiert, **CSS-Variablen direkt** nutzen:

```tsx
// Box Shadow mit abgeleiteter Variable
style={{ boxShadow: "var(--gfx-shadow-md)" }}

// Box Shadow mit calc() und Scale-Variable
style={{ boxShadow: `0 0 calc(20px * var(--gfx-glow-scale)) rgba(255, 255, 255, 0.1)` }}

// Backdrop Blur mit abgeleiteter Variable
style={{ backdropFilter: `blur(var(--gfx-backdrop-blur-md))` }}

// Eigener Wert mit Scale-Variable
style={{ backdropFilter: `blur(calc(20px * var(--gfx-blur-scale)))` }}

// Text Shadow
style={{ textShadow: "var(--gfx-text-shadow-sm)" }}
```

---

## System 2: Color Theme System

Dieses Projekt hat **mehrere Color Themes**. Das aktive Theme wird ueber `data-theme` Attribut auf `<html>` gesetzt.

### Wichtige semantische CSS-Variablen (IMMER nutzen statt hardcodierter Farben)

```
--background         Seiten-Hintergrund
--foreground         Standard-Textfarbe
--card               Card-Hintergrund
--card-foreground    Card-Text
--primary            Primaerfarbe (theme-abhaengig!)
--accent             Akzentfarbe
--muted              Gedaempfter Hintergrund
--muted-foreground   Gedaempfter Text
--border             Border-Farbe
--ring               Focus-Ring-Farbe
--destructive        Fehler/Loeschen-Farbe
--popover            Popover-Hintergrund
--secondary          Sekundaere Farbe
```

### Dynamische Theme-Farbe im Code

Fuer `color-mix` oder dynamische `style`-Attribute:

```tsx
// Nutze color-mix() fuer theme-adaptive Styles:
style={{
  borderColor: `color-mix(in srgb, hsl(var(--primary)) 15%, transparent)`,
  boxShadow: `0 0 calc(20px * var(--gfx-glow-scale)) color-mix(in srgb, hsl(var(--primary)) 30%, transparent)`,
}}
```

---

## Checkliste: Was du pruefen musst

### A) Hardcodierte Shadows ersetzen

Suche nach diesen Tailwind-Klassen und ersetze sie:

| Finde (FALSCH) | Ersetze mit (RICHTIG) |
|---|---|
| `shadow-sm` | `gfx-shadow-elevated-sm` |
| `shadow-md` | `gfx-shadow-elevated-md` |
| `shadow-lg` | `gfx-shadow-elevated-lg` |
| `shadow-xl` | `gfx-shadow-elevated-xl` |
| `shadow-2xl` | `gfx-shadow-elevated-lg` |
| `shadow-none` | OK - bleibt (kein Effekt) |
| `shadow-inner` | Pruefe ob `gfx-shadow-*` Alternative existiert |

**AUSNAHME:** `shadow-none` und `shadow-inner` sind OK und muessen nicht ersetzt werden!

### B) Hardcodierte Backdrop-Blurs ersetzen

| Finde (FALSCH) | Ersetze mit (RICHTIG) |
|---|---|
| `backdrop-blur-sm` | `gfx-backdrop-blur-sm` |
| `backdrop-blur-md` | `gfx-backdrop-blur-md` |
| `backdrop-blur-lg` | `gfx-backdrop-blur-lg` |
| `backdrop-blur-xl` | `gfx-backdrop-blur-xl` |
| `backdrop-blur-2xl` | `gfx-backdrop-blur-xl` |

### C) Hardcodierte boxShadow in style={{ }} ersetzen

```tsx
// FALSCH - reagiert nicht auf Grafik-Preset
style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}

// RICHTIG Option 1 - abgeleitete CSS-Variable
style={{ boxShadow: "var(--gfx-shadow-md)" }}

// RICHTIG Option 2 - calc() mit Scale-Variable
style={{ boxShadow: `0 4px calc(16px * var(--gfx-shadow-scale)) rgba(0, 0, 0, calc(0.1 * var(--gfx-shadow-scale)))` }}

// RICHTIG Option 3 - GFX Utility-Klasse
className="gfx-shadow-elevated-md"
```

### D) Hardcodierte backdropFilter in style={{ }} ersetzen

```tsx
// FALSCH
style={{ backdropFilter: "blur(12px)" }}

// RICHTIG - Utility-Klasse nutzen (bevorzugt)
className="gfx-backdrop-blur-lg"

// ODER inline mit abgeleiteter Variable
style={{ backdropFilter: `blur(var(--gfx-backdrop-blur-lg))` }}

// ODER calc() mit Scale-Variable
style={{ backdropFilter: `blur(calc(12px * var(--gfx-blur-scale)))` }}
```

### E) Hardcodierte filter: drop-shadow ersetzen

```tsx
// FALSCH
style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))" }}

// RICHTIG - Utility-Klasse nutzen
className="gfx-drop-shadow-white-md"

// ODER inline mit Scale-Variable
style={{ filter: `drop-shadow(0 0 calc(8px * var(--gfx-drop-shadow-scale)) rgba(255, 255, 255, 0.5))` }}
```

### F) Hardcodierte text-shadow ersetzen

```tsx
// FALSCH
style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}

// RICHTIG - abgeleitete Variable nutzen
style={{ textShadow: "var(--gfx-text-shadow-sm)" }}

// ODER calc() mit Scale-Variable
style={{ textShadow: `0 1px calc(2px * var(--gfx-text-shadow-scale)) rgba(0, 0, 0, 0.3)` }}
```

### G) Decorative Blur-Elemente pruefen

Hintergrund-Effekte wie farbige Blobs/Glows MUESSEN GFX-kontrolliert sein:

```tsx
// FALSCH - Blur ohne GFX-System
<div className="absolute blur-[100px] bg-primary/20" />

// RICHTIG - GFX-Klasse + gfx-decorative
<div className="absolute gfx-decorative-blur gfx-decorative bg-primary/20" />
```

**KRITISCH:** Blur-Elemente mit Hintergrundfarbe MUESSEN auch `opacity`-Kontrolle haben! Bei `blur(0px)` (lowest) bleibt die Farbe als scharfer Block sichtbar. Entweder:
- `opacity: var(--gfx-decorative-scale)` als inline-style
- oder `gfx-decorative-blur` Klasse nutzen (hat opacity eingebaut)

### H) Hardcodierte Farben pruefen

```tsx
// FALSCH - hardcodierte Design-Akzentfarbe
className="text-violet-500 bg-violet-500/10 border-violet-500/20"

// RICHTIG - semantische Theme-Variablen
className="text-primary bg-primary/10 border-primary/20"
```

**ACHTUNG:** Status-Farben sind OK hardcodiert! `text-red-500` (Fehler), `text-emerald-500` (Erfolg), `text-amber-500` (Warnung) bleiben hardcodiert.

### I) Dialog/Overlay Hintergruende (PFLICHT-REGEL!)

**ALLE Dialoge, Sheets, Drawers MUESSEN eine solide Hintergrundfarbe haben:**

```tsx
// FALSCH - halbtransparent, Content scheint durch
<DialogContent className="bg-black/40">

// RICHTIG - solide Hex-Hintergrundfarbe (mindestens 90% Opazitaet)
<DialogContent className="!bg-[#0c0f1a]/95">
```

### J) Gradient-Opacity pruefen

Dekorative Gradienten sollten `--gfx-gradient-opacity` respektieren:

```tsx
// FALSCH - Gradient ignoriert Grafik-Preset
<div className="bg-gradient-to-b from-primary/20 to-transparent" />

// RICHTIG - Gradient mit GFX-Kontrolle
<div
  className="bg-gradient-to-b from-primary/20 to-transparent gfx-decorative"
  style={{ opacity: `var(--gfx-gradient-opacity)` }}
/>
```

### K) Mix-Blend-Mode pruefen

```tsx
// FALSCH - mix-blend ohne GFX-Kontrolle
<div className="mix-blend-overlay opacity-50" />

// RICHTIG - GFX-Klasse nutzen
<div className="gfx-blend-overlay" />
```

### L) Animation-bezogene Effekte

GPU-intensive Hover-Animationen (scale, rotate, blur, shadow-Animation) pruefen:
- Bei "lowest": Keine shadow-Glows, keine blur-Animationen
- Framer Motion: `animate={{ boxShadow: ... }}` muss GFX-Variablen nutzen

### M) Grain/Noise-Texturen

```tsx
// FALSCH - Grain ohne GFX-Kontrolle
<div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url(noise.svg)' }} />

// RICHTIG - GFX-Klasse nutzen
<div className="absolute inset-0 gfx-grain gfx-decorative" />
```

---

## Zusammenfassung der wichtigsten Regeln

1. **NIEMALS** `shadow-sm/md/lg/xl/2xl` verwenden → `gfx-shadow-elevated-*`
2. **NIEMALS** `backdrop-blur-*` verwenden → `gfx-backdrop-blur-*`
3. **NIEMALS** hardcodierte `boxShadow` in styles → `var(--gfx-shadow-*)` oder `calc(... * var(--gfx-*-scale))`
4. **NIEMALS** hardcodierte Design-Akzentfarben → `--primary`, `--accent`, `hsl(var(--primary))`
5. **IMMER** solide Hex-Hintergrundfarbe fuer Dialoge (mindestens 90% Opazitaet)
6. **IMMER** `gfx-decorative` auf rein dekorative Elemente (pointer-events: none)
7. **IMMER** Blur-Elemente mit Farbe brauchen auch Opacity-Kontrolle
8. **Status-Farben** (red=Fehler, emerald=Erfolg, amber=Warnung) bleiben hardcodiert - das ist OK

---

## Workflow

1. **Lies die Komponente** unter dem angegebenen Pfad
2. **Gehe die Checkliste A-M durch** und notiere alle Probleme
3. **Fixe alle Probleme direkt** im Code
4. **Pruefe nach dem Fix:** `npx tsc --noEmit` (0 Fehler!)
5. **Fasse zusammen:** Was war falsch? Was hast du gefixt?

> **WICHTIG:** Wenn die Komponente bereits korrekt ist, sage das einfach. Nicht unnoetig aendern!
