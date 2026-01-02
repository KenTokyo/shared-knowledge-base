# 📱 Capacitor/Mobile Performance Rules

> **Diese Datei enthält detaillierte Performance-Regeln für Capacitor/Mobile.**  
> **Kurzversion:** Siehe `CODING-RULES.md` → Regel 12

---

## 1. 🔴 KRITISCH: backdrop-filter ist VERBOTEN!

**`backdrop-filter: blur()` ist der #1 Performance-Killer auf Mobile UND kann Desktop verlangsamen!**

```
❌ NIEMALS verwenden:
- backdrop-blur-sm, backdrop-blur-md, backdrop-blur-xl, backdrop-blur-2xl, backdrop-blur-3xl
- backdrop-filter: blur(Xpx)

✅ STATTDESSEN: Erhöhte Opacity für Glass-Effekte
- bg-card/90 bis bg-card/95 (statt backdrop-blur)
- bg-black/80 bis bg-black/90 (für dunkle Overlays)
- bg-[#030303] (für tiefschwarze Karten)
```

**Wichtige Unterscheidung:**

| Eigenschaft | Performance | Verwendung |
|-------------|-------------|------------|
| `backdrop-filter: blur()` | 🔴 **VERBOTEN** - GPU-Killer | Niemals verwenden! |
| `filter: blur(50px)` | 🟢 **OK** | Für Punkt-Glows erlaubt |

**Warum?** `backdrop-filter` muss jeden Frame ALLES dahinter neu berechnen. `filter: blur()` auf einem Element ist einmalig und gecacht.

---

## 2. 🟢 Globale Capacitor-Lösung für backdrop-blur

**backdrop-filter wird NUR auf Capacitor/Mobile global deaktiviert** via `capacitor.css`:

```css
/* In capacitor.css - deaktiviert ALLE backdrop-blur Klassen auf Mobile */
body.capacitor [class*="backdrop-blur"] {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
```

**Vorteile:**
- ✅ Desktop behält weiche Blur-Effekte
- ✅ Mobile hat keine Performance-Probleme
- ✅ Keine Änderungen in einzelnen Komponenten nötig
- ✅ Zentrale Stelle für Mobile-Performance-Optimierungen

**Light-Mode Blobs:** `dark:opacity-0` ist OK - funktioniert jetzt korrekt, da backdrop-filter auf Mobile deaktiviert ist.

---

## 3. ✅ Glow-Effekte korrekt implementieren

Punkt-Glows für Dark Mode mit Custom-Klassen:

```tsx
// Dark Mode Glow mit glow-blob-* Klasse für Mobile-Optimierung
<div className="blur-[75px] rounded-full glow-blob-cardio" />

// In capacitor.css: Blur auf Mobile reduzieren
// body.capacitor .glow-blob-cardio { filter: blur(50px) !important; }
```

---

## 4. 🚨 KRITISCH: Rendering-Artefakte auf Capacitor (Ghost-Blobs Fix)

**Problem:** Wenn `backdrop-filter: none` global auf Capacitor angewendet wird, können bestimmte CSS-Eigenschaften **Rendering-Artefakte** ("Ghost-Blobs", "Light-Blobs") verursachen. Diese erscheinen als zufällige farbige Rechtecke/Kreise, die nicht verschwinden.

**Ursache:** Android WebView hat Probleme mit komplexen Layer-Berechnungen, besonders wenn:
- `mix-blend-mode` verwendet wird
- Große `blur()` Werte auf Pseudo-Layern (`absolute` positioned divs) angewendet werden
- Transparente Overlays mit Gradienten existieren
- `opacity: 0` Layer im DOM bleiben (statt entfernt zu werden)

### ❌ VERBOTEN auf Cards/Sections (verursacht Ghost-Blobs):

| CSS-Eigenschaft | Beispiel | Problem |
|-----------------|----------|---------|
| `mix-blend-multiply` | `mix-blend-multiply` auf Blur-Divs | WebView cached Layer falsch |
| Große Blur-Blobs | `blur-[90px]`, `blur-[75px]` auf `absolute` Divs | Repaint-Artefakte |
| Light-Mode Gradient Overlays | `bg-gradient-to-br from-white/40` als Overlay | Transparenz-Bugs |
| Icon-Glows | `shadow-[0_0_12px_rgba(...)]` | Icon-Rendering-Fehler |
| Hover-Glows | `hover:shadow-[0_0_20px_rgba(...)]` | Flackern bei Touch |
| Dark-Mode Glow-Layer | Große `blur-[60px+]` Divs mit `dark:opacity-100` | Ghost-Layer bleiben sichtbar |

### ✅ ERLAUBT (performant und sicher):

| CSS-Eigenschaft | Beispiel | Warum OK |
|-----------------|----------|----------|
| Solide Hintergründe | `bg-[#f8f8f8]`, `bg-[#030303]` | Keine Transparenz-Berechnung |
| Texture-Patterns | `texture="grain"`, `texture="grid"` | Einfache CSS-Patterns |
| Normale Shadows | `shadow-lg`, `shadow-xl` | Standard-Box-Shadows |
| Farbige Borders | `border-amber-500/20` | Keine Blur-Berechnung |
| Farbige Backgrounds | `bg-indigo-500/10` | Einfache Farb-Overlays |

### 🔧 FIX-Prompt bei Ghost-Blob-Problemen:

Wenn Rendering-Artefakte auf Capacitor auftreten, entferne folgende Elemente aus der betroffenen Komponente:

```tsx
// ❌ ENTFERNEN - Diese Elemente verursachen Ghost-Blobs:

// 1. Light-Mode Gradient Overlays
<div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent ..." />

// 2. Große Blur-Blobs (Light Mode)
<div className="absolute ... blur-[90px] ... mix-blend-multiply light-mode-blob" />

// 3. Dark-Mode Glow-Layer
<div className="absolute ... blur-[75px] ... dark:opacity-100 glow-effect-layer">
  <div className="blur-[80px] ..." />
</div>

// 4. Dark-Mode Overlay
<div className="absolute inset-0 dark:bg-black/60 ..." />

// ❌ ENTFERNEN bei Icons - Icon-Glows:
shadow-[0_0_12px_rgba(...)]
shadow-[0_0_15px_rgba(...)]
hover:shadow-[0_0_20px_rgba(...)]
```

### ✅ Ersetzen durch:

```tsx
// Verwende solide Hintergründe statt transparente:
className="bg-[#f8f8f8] dark:bg-[#030303]"  // statt bg-white/95

// Icons ohne Glow:
className="bg-amber-500/10 text-amber-400 border border-amber-500/20"
// statt: shadow-[0_0_12px_rgba(251,191,36,0.3)]
```

**Fazit:** Sobald `backdrop-filter: none` auf Capacitor aktiv ist, müssen ALLE dekorativen Blur-Layer und Glow-Effekte entfernt werden, um stabile Rendering zu gewährleisten.

---

## 5. 🚨 KRITISCH: Icon-Rendering-Bug auf Capacitor (GPU-Layer Fix)

**Problem:** Icons/SVGs sind auf Capacitor **unsichtbar bis zum Touch/Klick**. Elemente sind im DOM, werden aber nicht gerendert.

**Ursache:** Android WebView Compositor-Bug - Elemente ohne GPU-Layer-Promotion werden "vergessen".

**Lösung - GPU-Layer Promotion via CSS:**

```css
/* In capacitor.css */
body.capacitor [data-DEIN-CARD-ATTRIBUT="true"] svg {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

body.capacitor [data-DEIN-CARD-ATTRIBUT="true"] .relative > span {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

body.capacitor [data-DEIN-CARD-ATTRIBUT="true"] {
  isolation: isolate;
  contain: layout style;
}
```

**Checkliste bei Icon-Rendering-Bugs:**
1. ✅ Füge `data-xyz="true"` zum betroffenen Container hinzu
2. ✅ CSS-Regeln in `capacitor.css` Sektion 7 ergänzen
3. ✅ `will-change: transform, opacity` auf SVGs/Icons
4. ✅ `transform: translateZ(0)` erzwingt GPU-Layer
5. ✅ `isolation: isolate` auf dem Parent-Container

**Warum es funktioniert:**
- `will-change` signalisiert Rendering-Priorität → Browser erstellt GPU Layer
- `translateZ(0)` erzwingt eigenen Compositor Layer → Element wird IMMER gerendert
- Icons können nicht mehr vom WebView "vergessen" werden

**Postmortem:** `docs/mobile/postmortem/2026-01-02-capacitor-icon-rendering-fix.md`

---

## ✅ Quick Checklist für Capacitor

| Problem | Lösung | Referenz |
|---------|--------|----------|
| Performance langsam | `backdrop-blur-*` entfernen | Abschnitt 1 |
| Ghost-Blobs/Light-Blobs | Blur-Layer + Icon-Glows entfernen | Abschnitt 4 |
| Icons unsichtbar bis Klick | GPU-Layer Promotion | Abschnitt 5 |
| Glow-Effekte nötig | `glow-blob-*` Klassen nutzen | Abschnitt 3 |

---

**🔗 Zurück zu:** `shared-docs/CODING-RULES.md` → Regel 12
