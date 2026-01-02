# 🎨 Liquid Glass Design Guide

> **Diese Datei enthält die vollständige Liquid Glass Design-Dokumentation.**  
> **Kurzversion:** Siehe `CODING-RULES.md` → Regel 5.4-5.6

---

## 1. Liquid Glass Ästhetik – Philosophie

**Liquid Glass** beschreibt die visuelle Richtung der App - keine starren Regeln, sondern eine Ästhetik:

- **Tiefe & Räumlichkeit:** `bg-black/40`, `backdrop-blur-xl`, `box-shadow` mit `inset`
- **Licht als Akzent:** `blur-[50px]` Punkt-Glows, Status-Farben (`orange-500`, `green-500`, `red-500`)
- **Versteckte Struktur:** Grid via `linear-gradient(#808080 1px...)`, `opacity-[0.05]`, `mask-image: radial-gradient(...)`
- **Glasmorphism:** `border-white/8`, `backdrop-blur-xl saturate(180%)`

**Inspiration:** `shared-docs/liquid-glass-*.png`

---

## 2. 🚨 Muted Glass Buttons (KRITISCH!)

> **Vollständige Doku:** `shared-docs/refactoring-docs/global-coding-rules.md` → Section 4.7.0

**Das Problem:** Solid-farbige Buttons (`bg-orange-500`, `bg-white`) zerstören die Liquid Glass Ästhetik!

**Die Lösung - Muted Colors mit Glow:**

| Button-Typ | Background | Border | Text | Glow |
|------------|------------|--------|------|------|
| Primary CTA | `orange-500/20` | `orange-500/30` | `orange-400` | `shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]` |
| Selected | `orange-500/20` | `orange-500/40` | `orange-400` | Inset + Outer Glow |
| Tab Selected | `white/10` | `white/20` | `white` | Inset-Shadow |
| Tab Unselected | `transparent` | `transparent` | `white/50` | - |
| Ghost | `transparent` | `orange-500/30` | `orange-400` | Dezenter Glow |

### ❌ Anti-Patterns:
- `bg-orange-500` (solid ohne Transparenz)
- `bg-white` für Tab-Selection im Dark Mode
- Buttons ohne Glow bei aktiven States
- `text-white` auf saturierten Hintergründen

---

## 3. 🔴 Liquid Glass Card Design (3-Layer-System)

```tsx
<Card className="relative overflow-hidden bg-[#030303] border-white/5">
  {/* Layer 1: Deep Black Base (z-0) */}
  <div className="absolute inset-0 bg-black/60 z-0" />

  {/* Layer 2: Texture - Grain ODER Grid (z-0) */}
  <div className="absolute inset-0 z-0 pointer-events-none mix-blend-soft-light"
    style={{maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 0%, transparent 100%)'}}>
    <div className="absolute inset-0 liquid-grain-ultra opacity-30" />
  </div>

  {/* Layer 3: Punkt-Glow - WICHTIG: z-[1] über Background! */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-[1] pointer-events-none">
    <div className="absolute inset-0 bg-[FARBE]/60 blur-[50px] rounded-full" />
  </div>

  {/* Content (z-10) */}
  <div className="relative z-10 p-4">...</div>
</Card>
```

---

## 4. Texture-Varianten

| Variante | Klassen | Verwendung |
|----------|---------|------------|
| **Ultra-Grain** | `liquid-grain-ultra opacity-30` + `mix-blend-soft-light` | Premium-Cards |
| **Fine-Grid** | `liquid-grid-fine opacity-40` | Tech-Elemente |
| **Dots** | `liquid-dots-bg opacity-25` + `mix-blend-overlay` | Subtle Backgrounds |

---

## 5. Punkt-Glow Farben

| Bereich | Farbe | Klasse |
|---------|-------|--------|
| Allgemein | `indigo-500` | `/60`, `blur-[50px]`, `z-[1]` |
| Ernährung | `orange-500` | `/60`, `blur-[50px]`, `z-[1]` |
| Training | `emerald-500` | `/60`, `blur-[50px]`, `z-[1]` |
| Cardio | `blue-500` | `/60`, `blur-[50px]`, `z-[1]` |
| Notizen | `purple-500` | `/60`, `blur-[50px]`, `z-[1]` |
| Netzwerk | `cyan-500` | `/60`, `blur-[50px]`, `z-[1]` |

---

## 6. ❌ Anti-Patterns

| Anti-Pattern | Problem | Lösung |
|--------------|---------|--------|
| Breiter Beam-Glow horizontal | Unnatürlich | Punkt-Glow von oben |
| Punkt-Glow mit `z-0` | Unsichtbar! | `z-[1]` verwenden |
| Grain UND Grid gleichzeitig | Überladen | Eines wählen |
| `bg-orange-500` solid | Zerstört Glass-Effekt | `orange-500/20` |

---

## 7. Code-Beispiel: Vollständige Glass Card

```tsx
import { Card } from "@/components/ui/card";

interface GlassCardProps {
  children: React.ReactNode;
  glowColor?: "indigo" | "orange" | "emerald" | "blue" | "purple" | "cyan";
  texture?: "grain" | "grid" | "dots";
}

const glowColorMap = {
  indigo: "bg-indigo-500/60",
  orange: "bg-orange-500/60",
  emerald: "bg-emerald-500/60",
  blue: "bg-blue-500/60",
  purple: "bg-purple-500/60",
  cyan: "bg-cyan-500/60",
};

export function GlassCard({ 
  children, 
  glowColor = "indigo",
  texture = "grain" 
}: GlassCardProps) {
  return (
    <Card className="relative overflow-hidden bg-[#030303] border-white/5">
      {/* Layer 1: Deep Black Base */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Layer 2: Texture */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-soft-light"
        style={{maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 0%, transparent 100%)'}}
      >
        {texture === "grain" && <div className="absolute inset-0 liquid-grain-ultra opacity-30" />}
        {texture === "grid" && <div className="absolute inset-0 liquid-grid-fine opacity-40" />}
        {texture === "dots" && <div className="absolute inset-0 liquid-dots-bg opacity-25 mix-blend-overlay" />}
      </div>

      {/* Layer 3: Punkt-Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-[1] pointer-events-none">
        <div className={`absolute inset-0 ${glowColorMap[glowColor]} blur-[50px] rounded-full`} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        {children}
      </div>
    </Card>
  );
}
```

---

**🔗 Zurück zu:** `shared-docs/CODING-RULES.md` → Regel 5.4-5.6
