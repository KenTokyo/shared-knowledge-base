# CSS-Variablen Zoom-System - Architektur & Implementierung

**Stand:** 2025-12-11
**Feature:** Globaler Zoom-Faktor ohne Verpixelung

---

## Warum funktioniert das so gut? (ohne Verpixelung)

### Das Geheimnis: CSS `font-size` auf `<html>`

Das Zoom-System nutzt eine fundamentale CSS-Eigenschaft: **Alle `rem`-Einheiten sind relativ zur Root-Font-Size**.

```css
html {
  font-size: calc(100% * var(--user-font-scale));
}
```

#### Warum keine Verpixelung?

1. **Vektorskalierung statt Bitmap-Zoom:**
   - Browser rendern Text und Layouts bei jeder Änderung NEU
   - Es wird NICHT ein bereits gerendertes Bild vergrößert
   - Der Browser berechnet alles mit der neuen Basis neu

2. **Rem-basierte Skalierung:**
   - `1rem` = Root Font-Size (z.B. 16px * 0.85 = 13.6px)
   - Alle `rem`-Werte skalieren proportional
   - Pixel-perfekte Darstellung bei jeder Größe

3. **Native Browser-Technologie:**
   - Identisch mit Browser-eigenem Zoom (Ctrl+/-)
   - Sub-Pixel-Rendering aktiv
   - Hardware-beschleunigte Text-Rendering

---

## System-Architektur

### 1. CSS-Variable Definition (`app/globals.css`)

```css
:root {
  /* Default: 1 (100% Browser-Zoom) */
  --user-font-scale: 1;
}

html {
  /* Die Magie: Root Font-Size ist dynamisch */
  font-size: calc(100% * var(--user-font-scale));
}
```

### 2. React Context (`contexts/DashboardPreferencesContext.tsx`)

```typescript
// State-Management
interface DashboardPreferences {
  fontScale: number; // 0.6375 to 1.275 (75%-150% GUI)
}

// Live-Update der CSS-Variable
useEffect(() => {
  document.documentElement.style.setProperty(
    "--user-font-scale",
    preferences.fontScale.toString()
  );
}, [preferences.fontScale]);
```

### 3. GUI-Komponente (`components/dashboard-settings/EditModeToolbar.tsx`)

```tsx
<Slider
  value={[fontScale]}
  min={0.6375}   // 75% GUI
  max={1.275}    // 150% GUI
  step={0.0425}  // 5%-Schritte
  onValueChange={(vals) => setFontScale(vals[0])}
/>
<span>{Math.round(fontScale / 0.85 * 100)}%</span>
```

---

## Umrechnungsformel

### Interner Wert ↔ GUI-Anzeige

Der interne Wert `0.85` entspricht **100%** in der GUI (optimaler Zoom).

```typescript
// Intern → GUI%
const displayPercent = Math.round(internalValue / 0.85 * 100);

// GUI% → Intern
const internalValue = guiPercent / 100 * 0.85;
```

### Wertetabelle

| GUI-Anzeige | Interner Wert | Browser-Effekt |
|-------------|---------------|----------------|
| 75% | 0.6375 | Root-Font: ~10.2px |
| 80% | 0.68 | Root-Font: ~10.9px |
| 85% | 0.7225 | Root-Font: ~11.6px |
| 90% | 0.765 | Root-Font: ~12.2px |
| 95% | 0.8075 | Root-Font: ~12.9px |
| **100%** | **0.85** | Root-Font: ~13.6px (optimal) |
| 105% | 0.8925 | Root-Font: ~14.3px |
| 110% | 0.935 | Root-Font: ~15.0px |
| 120% | 1.02 | Root-Font: ~16.3px |
| 130% | 1.105 | Root-Font: ~17.7px |
| 140% | 1.19 | Root-Font: ~19.0px |
| **150%** | **1.275** | Root-Font: ~20.4px |

*Basis: Browser-Default 16px*

---

## Implementierung in neuen Komponenten

### Schritt 1: Context importieren

```tsx
import { useDashboardPreferences } from "@/contexts/DashboardPreferencesContext";

function MyComponent() {
  const { fontScale, setFontScale } = useDashboardPreferences();
  // ...
}
```

### Schritt 2: Slider einbauen

```tsx
import { Slider } from "@/components/ui/slider";

// In deinem JSX:
<div className="flex items-center gap-3">
  <span className="text-xs text-muted-foreground">Zoom</span>
  <Slider
    value={[fontScale]}
    min={0.6375}
    max={1.275}
    step={0.0425}
    onValueChange={(vals) => setFontScale(vals[0])}
    className="flex-1"
  />
  <span className="text-xs font-mono w-10 text-right">
    {Math.round(fontScale / 0.85 * 100)}%
  </span>
</div>
```

### Schritt 3: Fertig!

Die CSS-Variable `--user-font-scale` wird automatisch aktualisiert und alle `rem`-basierten Layouts skalieren sofort.

---

## Warum Rem statt Px?

| Einheit | Skaliert mit Zoom? | Empfehlung |
|---------|-------------------|------------|
| `rem` | ✅ Ja | Für Text, Padding, Margins |
| `em` | ✅ Ja (relativ zu Parent) | Für relative Größen |
| `px` | ❌ Nein | Für fixe Elemente (Borders, Icons) |
| `%` | Teils | Für Layouts |

### Best Practice

```css
/* ✅ Skaliert mit Zoom */
.card {
  padding: 1rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
}

/* ❌ Fixe Pixel für Borders (sieht sonst zu dick aus) */
.card {
  border: 1px solid rgba(255,255,255,0.1);
}
```

---

## Performance-Hinweise

1. **Keine Re-Renders:** CSS-Variable Änderung löst keinen React Re-Render aus
2. **Browser-Optimiert:** Native CSS-Variable Updates sind extrem schnell
3. **Keine Layout-Shifts:** Transition auf `font-size` vermeiden (sofort ändern)
4. **localStorage:** Wert wird persistent gespeichert und bei App-Start geladen

---

## Dateien im System

| Datei | Verantwortung |
|-------|---------------|
| `app/globals.css:48,192` | CSS-Variable Definition & html font-size |
| `contexts/DashboardPreferencesContext.tsx` | State-Management, localStorage, CSS-Update |
| `components/dashboard-settings/EditModeToolbar.tsx` | Haupt-Slider im Bearbeitungsmodus |

---

## Erweiterungsmöglichkeiten

1. **Pro-Komponenten-Zoom:** Einzelne Bereiche mit eigenem Zoom
   ```css
   .special-area {
     font-size: calc(100% * var(--special-zoom));
   }
   ```

2. **Animierter Zoom:** Für spezielle Effekte
   ```css
   html {
     transition: font-size 0.3s ease-out;
   }
   ```

3. **Responsive Zoom:** Unterschiedliche Defaults für Mobile/Desktop
   ```css
   @media (max-width: 768px) {
     :root { --user-font-scale: 0.9; }
   }
   ```
