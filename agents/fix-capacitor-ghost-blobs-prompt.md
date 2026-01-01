# 🔧 Fix: Capacitor Ghost-Blobs / Light-Blobs entfernen

> **Anwendung:** Wenn auf Capacitor (Android/iOS) Rendering-Artefakte wie "Ghost-Blobs" oder "Light-Blobs" in einer Komponente auftreten.

---

## 📍 Betroffene Komponente/Page

**Pfad:** `[HIER PFAD ZUR KOMPONENTE EINTRAGEN]`

**Beispiel:** `app/components/heute/cards/NutritionCard.tsx`

---

## 🎯 Aufgabe

Analysiere die angegebene Komponente und entferne **alle CSS-Eigenschaften**, die Rendering-Artefakte auf Capacitor verursachen können.

### Zu entfernende Elemente:

#### 1. **Große Blur-Blobs** (Light Mode)
```tsx
// ❌ ENTFERNEN:
<div className="absolute ... blur-[90px] ... mix-blend-multiply light-mode-blob" />
<div className="absolute ... blur-[75px] ... blur-3xl ..." />
```

#### 2. **Light-Mode Gradient Overlays**
```tsx
// ❌ ENTFERNEN:
<div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent ... light-mode-overlay" />
```

#### 3. **Dark-Mode Glow-Layer**
```tsx
// ❌ ENTFERNEN:
<div className="absolute ... blur-[75px] ... dark:opacity-100 glow-effect-layer">
  <div className="blur-[80px] ..." />
</div>
```

#### 4. **Dark-Mode Overlays**
```tsx
// ❌ ENTFERNEN:
<div className="absolute inset-0 dark:bg-black/60 ..." />
```

#### 5. **Icon-Glows (drop-shadow)**
```tsx
// ❌ ENTFERNEN:
className="... drop-shadow-[0_0_8px_rgba(...)]"
className="... drop-shadow-[0_0_10px_...]"
style={{ filter: `drop-shadow(0 0 4px ...)` }}
```

#### 6. **Box-Shadow Glows**
```tsx
// ❌ ENTFERNEN:
className="... shadow-[0_0_12px_rgba(...)]"
className="... shadow-[0_0_15px_rgba(...)]"
className="... shadow-[0_0_20px_rgba(...)]"
className="... hover:shadow-[0_0_20px_...]"
```

---

### Zu ersetzende Werte:

| Vorher | Nachher |
|--------|---------|
| `bg-white/95` | `bg-[#f8f8f8]` |
| `bg-card/90` | `bg-white dark:bg-[#0a0a0a]` |
| `bg-card/80` | `bg-white dark:bg-[#0a0a0a]` |
| `shadow-[0_0_Xpx_...]` auf Icons | (komplett entfernen) |
| `drop-shadow-[0_0_Xpx_...]` | (komplett entfernen) |

---

### Was BLEIBT (ist OK):

- ✅ `texture="grain"` oder `texture="grid"` (CSS-Patterns sind performant)
- ✅ `shadow-lg`, `shadow-xl`, `shadow-2xl` (Standard-Box-Shadows)
- ✅ Farbige Borders: `border-amber-500/20`
- ✅ Farbige Backgrounds: `bg-indigo-500/10`
- ✅ `drop-shadow-sm` (minimaler Text-Shadow)

---

## ✅ Checkliste nach Fix

- [ ] Alle `blur-[50px+]` Elemente entfernt
- [ ] Alle `mix-blend-multiply` entfernt
- [ ] Alle `drop-shadow-[0_0_*]` von Icons entfernt
- [ ] Alle `shadow-[0_0_*]` von Buttons/Cards entfernt
- [ ] Hintergründe auf solide Farben geändert
- [ ] `npx tsc --noEmit` erfolgreich
- [ ] Auf Capacitor getestet

---

## 📚 Referenzen

- **Coding Rule:** `shared-docs/CODING-RULES.md` → Regel 12.4
- **Postmortem:** `docs/mobile/postmortem/2026-01-01-capacitor-ghost-blobs-fix.md`
- **Capacitor CSS:** `app/capacitor.css`
