# 🎨 GFX Graphics Performance System - Universale Portierungs-Anleitung

> **Zweck:** Schritt-für-Schritt-Anleitung um das GFX Graphics Performance System in ein bestehendes Next.js-Projekt zu portieren. Optimiert für minimalen Token-Verbrauch durch automatisierte Skripte.
>
> **Version:** 2.0 (Scale-Faktoren-Pattern)
> **ULTRATHINK:** Aktiviert
> **Keine Unit Tests**

---

## 1. 🏗️ Architektur-Übersicht

### Was ist das GFX-System?

Ein **CSS-Variablen-basiertes Grafiksystem**, das GPU-intensive Effekte (Shadows, Blurs, Glows, Gradients) über Presets steuert. User können zwischen Qualitätsstufen wählen (ultra bis lowest). Bei "lowest" werden ALLE visuellen Effekte deaktiviert.

### Kernprinzip: Scale-Faktoren (0 = aus, 1 = voll)

```css
/* 7 Scale-Variablen steuern ALLE Effekte */
--gfx-shadow-scale: 0.7;      /* → Alle Shadows auf 70% */
--gfx-blur-scale: 0;           /* → Alle Blurs komplett aus */

/* Abgeleitete Werte berechnen sich automatisch */
--gfx-backdrop-blur-md: calc(18px * var(--gfx-blur-scale));  /* → 0px wenn scale=0 */
--gfx-shadow-md: 0 8px calc(32px * var(--gfx-shadow-scale)) rgba(0,0,0, calc(0.1 * var(--gfx-shadow-scale)));
```

**Warum Scale-Faktoren statt Toggle+Intensity?**
- **7 Variablen** statt 16 (kein `enabled` + `intensity` Paar nötig)
- `scale: 0` = deaktiviert, `scale: 0.5` = halb, `scale: 1` = voll
- Eine Variable deckt beides ab: Toggle UND Intensity
- Presets brauchen nur 7 Zeilen statt 16

### Bestandteile (Minimal-Paket)

```
GFX-System (minimal)
├── CSS Core (~100-150 Zeilen)
│   └── graphics-core.css         → 7 Scale-Variablen + Presets + abgeleitete Werte
├── CSS Utilities (~300-500 Zeilen)
│   └── gfx-utilities-base.css    → Utility-Klassen (Blur, Shadow, Glow, etc.)
├── TypeScript (~400-600 Zeilen)
│   ├── graphics-settings-store.ts → Zustand Store + persist (ODER Context-basiert)
│   ├── graphics-presets.ts        → Preset-Definitionen + Helpers
│   └── GraphicsSystemInit.tsx     → App-Level Init-Komponente
└── Optional (~200-300 Zeilen)
    └── gfx-utilities-app.css      → Projekt-spezifische Utility-Klassen
```

**Gesamt Minimal-Paket: ~1.000-1.500 Zeilen**

---

## 2. 🎚️ Standard Scale-Variablen (Pflicht für alle Projekte)

### 2.1 Die 7 Kern-Variablen

```css
:root {
  /* === SKALIERUNGSFAKTOREN (0 = aus, 1 = voll) === */
  --gfx-shadow-scale: 1;        /* Box-Shadows */
  --gfx-glow-scale: 1;          /* Glow-Effekte (farbige box-shadows) */
  --gfx-blur-scale: 1;          /* Blur + Backdrop-Blur */
  --gfx-drop-shadow-scale: 1;   /* Drop-Shadows (filter: drop-shadow) */
  --gfx-text-shadow-scale: 1;   /* Text-Shadows */
  --gfx-gradient-opacity: 1;    /* Dekorative Gradienten */
  --gfx-decorative-scale: 1;    /* Light-Blobs, Blend-Modes, Noise */
}
```

### 2.2 Kompatibilitäts-Aliase (optional, für bestehende Projekte)

Wenn ein Projekt bereits `--gfx-*-enabled` Variablen nutzt (z.B. TrackMeAI-Pattern), können diese als Aliase auf die Scale-Variablen gemappt werden:

```css
:root {
  /* Aliase: bestehende enabled-Variablen → Scale-Faktoren */
  --gfx-backdrop-blur-enabled: var(--gfx-blur-scale);
  --gfx-box-shadow-enabled: var(--gfx-shadow-scale);
  --gfx-drop-shadow-enabled: var(--gfx-drop-shadow-scale);
  --gfx-text-shadow-enabled: var(--gfx-text-shadow-scale);
  --gfx-glow-effects-enabled: var(--gfx-glow-scale);
  --gfx-light-blobs-enabled: var(--gfx-decorative-scale);
  --gfx-blend-mode-enabled: var(--gfx-decorative-scale);
  --gfx-noise-enabled: var(--gfx-decorative-scale);
  --gfx-gradients-enabled: var(--gfx-gradient-opacity);
}
```

So funktionieren bestehende `calc(... * var(--gfx-*-enabled))` Formeln weiterhin ohne Änderung.

### 2.3 Standard-Presets

```css
/* ULTRA: Alle Effekte voll (Standard, in :root definiert) */

/* HIGH: 70% */
[data-graphics-preset="high"] {
  --gfx-shadow-scale: 0.7;
  --gfx-glow-scale: 0.7;
  --gfx-blur-scale: 0.65;
  --gfx-drop-shadow-scale: 0.7;
  --gfx-text-shadow-scale: 0.7;
  --gfx-gradient-opacity: 0.8;
  --gfx-decorative-scale: 1;
}

/* MEDIUM: 40% */
[data-graphics-preset="medium"] {
  --gfx-shadow-scale: 0.4;
  --gfx-glow-scale: 0.35;
  --gfx-blur-scale: 0.4;
  --gfx-drop-shadow-scale: 0.4;
  --gfx-text-shadow-scale: 0.3;
  --gfx-gradient-opacity: 0.6;
  --gfx-decorative-scale: 0.5;
}

/* LOW: 20% */
[data-graphics-preset="low"] {
  --gfx-shadow-scale: 0.2;
  --gfx-glow-scale: 0;
  --gfx-blur-scale: 0.2;
  --gfx-drop-shadow-scale: 0;
  --gfx-text-shadow-scale: 0;
  --gfx-gradient-opacity: 0.4;
  --gfx-decorative-scale: 0;
}

/* LOWEST: Keine Effekte */
[data-graphics-preset="lowest"] {
  --gfx-shadow-scale: 0;
  --gfx-glow-scale: 0;
  --gfx-blur-scale: 0;
  --gfx-drop-shadow-scale: 0;
  --gfx-text-shadow-scale: 0;
  --gfx-gradient-opacity: 0;
  --gfx-decorative-scale: 0;
}
```

**Hinweis:** Das HTML-Attribut kann `data-graphics-preset` ODER `data-graphics-quality` heißen - wichtig ist Konsistenz innerhalb eines Projekts.

---

## 3. 🧩 Standard-Utility-Klassen

### 3.1 Abgeleitete CSS-Variablen (in Core-CSS)

Diese werden aus den Scale-Faktoren berechnet und können in `style={{ }}` genutzt werden:

```css
:root {
  /* Backdrop Blur Größen */
  --gfx-backdrop-blur-sm: calc(12px * var(--gfx-blur-scale));
  --gfx-backdrop-blur-md: calc(18px * var(--gfx-blur-scale));
  --gfx-backdrop-blur-lg: calc(26px * var(--gfx-blur-scale));
  --gfx-backdrop-blur-xl: calc(40px * var(--gfx-blur-scale));

  /* Standard Shadows */
  --gfx-shadow-sm: 0 4px calc(16px * var(--gfx-shadow-scale)) rgba(0,0,0, calc(0.05 * var(--gfx-shadow-scale)));
  --gfx-shadow-md: 0 8px calc(32px * var(--gfx-shadow-scale)) rgba(0,0,0, calc(0.1 * var(--gfx-shadow-scale)));
  --gfx-shadow-lg: 0 12px calc(48px * var(--gfx-shadow-scale)) rgba(0,0,0, calc(0.15 * var(--gfx-shadow-scale)));

  /* Text Shadows */
  --gfx-text-shadow-sm: 0 1px calc(2px * var(--gfx-text-shadow-scale)) rgba(0,0,0, 0.2);
  --gfx-text-shadow-md: 0 1px calc(3px * var(--gfx-text-shadow-scale)) rgba(0,0,0, 0.5);
}
```

### 3.2 Utility-Klassen (in Utilities-CSS)

#### Backdrop-Blur (ersetzen `backdrop-blur-*`)
```
gfx-backdrop-blur-sm    → backdrop-filter: blur(var(--gfx-backdrop-blur-sm))
gfx-backdrop-blur-md    → backdrop-filter: blur(var(--gfx-backdrop-blur-md))
gfx-backdrop-blur-lg    → backdrop-filter: blur(var(--gfx-backdrop-blur-lg))
gfx-backdrop-blur-xl    → backdrop-filter: blur(var(--gfx-backdrop-blur-xl))
```

#### Elevated Shadows (ersetzen `shadow-sm/md/lg`)
```
gfx-shadow-elevated-sm  → box-shadow: var(--gfx-shadow-sm)
gfx-shadow-elevated-md  → box-shadow: var(--gfx-shadow-md)
gfx-shadow-elevated-lg  → box-shadow: var(--gfx-shadow-lg)
```

#### Decorative Blurs (große Hintergrund-Effekte)
```
gfx-decorative-blur     → filter: blur(calc(100px * var(--gfx-blur-scale)))
gfx-decorative-blur-sm  → filter: blur(calc(60px * var(--gfx-blur-scale)))
gfx-decorative-blur-md  → filter: blur(calc(40px * var(--gfx-blur-scale)))
```

#### Glow Shadows (farbig)
```
gfx-glow-{farbe}-{sm|md|lg}   → box-shadow mit calc(Xpx * var(--gfx-glow-scale))
gfx-glow-primary-{sm|md|lg}   → box-shadow mit hsl(var(--primary) / ...)
```

#### Performance Helpers
```
gfx-decorative         → pointer-events: none + user-select: none
gfx-gpu                → transform: translateZ(0) + will-change: transform
```

---

## 4. 🔌 DOM-Integration

### 4.1 HTML-Attribut

```html
<html data-graphics-preset="ultra">
```

### 4.2 CSS-Selektoren (Preset-Overrides)

```css
[data-graphics-preset="lowest"] {
  --gfx-shadow-scale: 0;
  --gfx-glow-scale: 0;
  /* ... alle 7 Scale-Variablen auf 0 */
}
```

### 4.3 React Integration

```tsx
// In layout.tsx:
<GraphicsSystemInit />  {/* Setzt data-graphics-preset auf <html> */}
```

---

## 5. 🚀 Portierungs-Strategie: Skript-basiert (Token-effizient!)

### Ziel: Maximal 5-7 Phasen statt 60+

Die Migration wird über **automatisierte Node.js-Skripte** durchgeführt. Die KI muss nur noch wenige Sonderfälle manuell behandeln.

### Phase 0: Vorbereitung (manuell, ~30 min)

1. GFX CSS-Dateien ins Projekt kopieren (Core + Base Utilities)
2. State-Management einrichten (Zustand Store ODER Context)
3. `GraphicsSystemInit` Komponente erstellen
4. `globals.css` um Imports erweitern
5. `layout.tsx` um `<GraphicsSystemInit />` erweitern
6. TypeScript-Check: `npx tsc --noEmit`

### Phase 1: Automatisierte Tailwind-Ersetzung (Skript)

**Skript: `gfx-migrate-tailwind.mjs`** (siehe `shared-docs/scripts/gfx-migration/`)

| Tailwind-Klasse | GFX-Klasse |
|-----------------|------------|
| `shadow-sm` | `gfx-shadow-elevated-sm` |
| `shadow-md` | `gfx-shadow-elevated-md` |
| `shadow-lg` | `gfx-shadow-elevated-lg` |
| `shadow-xl` | `gfx-shadow-elevated-lg` |
| `shadow-2xl` | `gfx-shadow-elevated-lg` |
| `backdrop-blur-sm` | `gfx-backdrop-blur-sm` |
| `backdrop-blur-md` | `gfx-backdrop-blur-md` |
| `backdrop-blur-lg` | `gfx-backdrop-blur-lg` |
| `backdrop-blur-xl` | `gfx-backdrop-blur-xl` |
| `backdrop-blur-2xl` | `gfx-backdrop-blur-xl` |

**NICHT ersetzen:** `shadow-none`, `shadow-inner`, `shadow-[...]` (custom), Farb-Shadows

### Phase 2: Automatisierter Inline-Style-Audit (Skript)

**Skript: `gfx-audit-inline-styles.mjs`**

Findet und listet auf:
- `boxShadow:` in `style={{ }}` → Muss auf `var(--gfx-shadow-*)` umgestellt werden
- `backdropFilter:` in `style={{ }}` → Muss auf `gfx-backdrop-blur-*` Klasse umgestellt werden
- `filter: drop-shadow(` → Muss auf `var(--gfx-drop-shadow-*)` umgestellt werden
- `textShadow:` → Kandidat für `var(--gfx-text-shadow-*)`
- `radial-gradient` → Muss `--gfx-gradient-opacity` beachten

### Phase 3: Manuelles Feintuning (KI, ~2-3 Phasen)

Nur die Sonderfälle aus Phase 2:
- Inline-Styles mit dynamischen Werten
- Decorative Blur-Elemente die Opacity-Kontrolle brauchen
- Spezifische Komponenten-Shadows (Dialog, Sidebar)
- Projekt-spezifische GFX-Utility-Klassen erstellen

### Phase 4: Validierung (Skript + manuell)

- `npx tsc --noEmit` → 0 Fehler
- `gfx-audit-unprotected.mjs` → Grep-Audit für verbleibende Tailwind-Klassen
- Browser-Test auf `lowest` und `ultra`

---

## 6. 📝 Inline-Style-Patterns mit Scale-Variablen

### Box Shadow mit Scale-Variable

```tsx
// RICHTIG - nutzt abgeleitete CSS-Variable
style={{ boxShadow: "var(--gfx-shadow-md)" }}

// RICHTIG - eigener Wert mit Scale-Faktor
style={{ boxShadow: `0 0 calc(20px * var(--gfx-glow-scale)) rgba(255,255,255,0.1)` }}
```

### Backdrop Blur mit Scale-Variable

```tsx
// RICHTIG - Utility-Klasse (bevorzugt)
className="gfx-backdrop-blur-md"

// RICHTIG - inline mit abgeleiteter Variable
style={{ backdropFilter: `blur(var(--gfx-backdrop-blur-md))` }}

// RICHTIG - eigener Wert mit Scale-Faktor
style={{ backdropFilter: `blur(calc(20px * var(--gfx-blur-scale)))` }}
```

### Drop Shadow mit Scale-Variable

```tsx
// RICHTIG
style={{ filter: `drop-shadow(0 0 calc(8px * var(--gfx-drop-shadow-scale)) rgba(255,255,255,0.5))` }}
```

---

## 7. 🔀 Harmonisierung bestehender Projekte

### Szenario: Projekt nutzt bereits `enabled + intensity` Pattern (z.B. TrackMeAI)

**Schritt 1:** Scale-Variablen als neue Kern-Variablen definieren
```css
:root {
  --gfx-shadow-scale: 1;
  --gfx-glow-scale: 1;
  /* ... alle 7 */
}
```

**Schritt 2:** Bestehende `enabled`/`intensity` Variablen als Aliase umbiegen
```css
:root {
  --gfx-shadow-enabled: var(--gfx-shadow-scale);
  --gfx-shadow-intensity: var(--gfx-shadow-scale);
  --gfx-blur-enabled: var(--gfx-blur-scale);
  --gfx-blur-intensity: var(--gfx-blur-scale);
  /* ... */
}
```

**Schritt 3:** Presets auf Scale-Variablen umstellen (nur 7 Zeilen pro Preset statt 16)

**Schritt 4:** Schrittweise bestehende calc()-Formeln vereinfachen (optional)
```css
/* Vorher */
calc(8px * var(--gfx-blur-enabled) * var(--gfx-blur-intensity))
/* Nachher (identisches Ergebnis dank Aliase) */
calc(8px * var(--gfx-blur-scale))
```

---

## 8. Grep-Befehle für manuelles Audit

Falls keine Skripte verfügbar sind:

```bash
# 1. Ungeschützte Tailwind-Shadows in TSX
grep -rn "shadow-sm\|shadow-md\|shadow-lg\|shadow-xl\|shadow-2xl" \
  --include="*.tsx" app/ components/ | grep -v "gfx-" | grep -v "shadow-none"

# 2. Ungeschützte Backdrop-Blurs
grep -rn "backdrop-blur-" --include="*.tsx" app/ components/ | grep -v "gfx-"

# 3. Inline boxShadow ohne GFX-Variable
grep -rn "boxShadow:" --include="*.tsx" app/ components/ | grep -v "var(--gfx"

# 4. Inline backdropFilter
grep -rn "backdropFilter:" --include="*.tsx" app/ components/

# 5. Dekorative radial-gradients (keine mask-image)
grep -rn "radial-gradient" --include="*.tsx" app/ components/ | grep -v "mask"

# 6. mix-blend-mode ohne GFX-Kontrolle
grep -rn "mix-blend" --include="*.tsx" app/ components/ | grep -v "gfx-"

# 7. drop-shadow ohne GFX
grep -rn "drop-shadow" --include="*.tsx" app/ components/ | grep -v "gfx-"

# 8. Light-Blob Kandidaten
grep -rn "blur-\[" --include="*.tsx" app/ components/ | grep -v "gfx-"
```

---

## 9. ✅ Checkliste: Projekt-Portierung

### Vorbereitung
- [ ] `shared-docs` Submodul aktuell?
- [ ] Bestehendes Grafik-System vorhanden? → Harmonisierung statt Neuaufbau!
- [ ] CSS-Variablen-Standard: 7 Scale-Variablen (`--gfx-*-scale`)
- [ ] HTML-Attribut auf `<html>` gesetzt (`data-graphics-preset` oder `data-graphics-quality`)

### Automatisiert (Skripte)
- [ ] `node gfx-migrate-tailwind.mjs --dry-run` → Vorschau prüfen
- [ ] `node gfx-migrate-tailwind.mjs` → Tailwind-Klassen ersetzen
- [ ] `node gfx-audit-inline-styles.mjs` → Inline-Styles auflisten

### Manuell (KI, ~2-3 Phasen)
- [ ] Inline-Styles aus Audit-Liste behandeln
- [ ] App-spezifische GFX-Klassen erstellen
- [ ] Decorative Blur-Elemente mit Opacity-Kontrolle versehen

### Validierung
- [ ] `npx tsc --noEmit` → 0 Fehler
- [ ] `node gfx-audit-unprotected.mjs` → 0 kritische Treffer
- [ ] Browser-Test: `lowest` Preset → keine visuellen Effekte sichtbar
- [ ] Browser-Test: `ultra` Preset → alle Effekte sichtbar

---

## 10. ⚠️ Bekannte Fallstricke & Lessons Learned

### 10.1 Blur ohne Opacity = sichtbarer Farbblock!

**KRITISCH:** Wenn `blur(0px)` auf ein Element mit Hintergrundfarbe angewendet wird, bleibt die Farbe als scharfer Block sichtbar. Decorative Blur-Elemente MÜSSEN auch eine Opacity-Kontrolle haben:

```css
/* FALSCH - Farbblock bei lowest */
.gfx-decorative-blur { filter: blur(calc(80px * var(--gfx-blur-scale))); }

/* RICHTIG - Komplett unsichtbar bei lowest */
.gfx-decorative-blur {
  filter: blur(calc(80px * var(--gfx-blur-scale)));
  opacity: var(--gfx-decorative-scale);
}
```

### 10.2 CSS-Variablen-Timing in JavaScript

`getComputedStyle()` nach `setAttribute('data-graphics-preset', ...)` braucht `requestAnimationFrame` Delay (2 Frames) für korrekte Werte.

### 10.3 Tailwind JIT vs. CSS-Klassen

CSS-Klassen in `.css` Dateien werden IMMER kompiliert. Tailwind-Klassen nur wenn sie in TSX verwendet werden. GFX-Klassen in globalen CSS-Dateien sind davon nicht betroffen.

### 10.4 Safari Webkit-Prefix

`backdrop-filter` braucht IMMER auch `-webkit-backdrop-filter` für Safari-Kompatibilität.

### 10.5 Decorative Elemente: Pointer-Events

Dekorative Blur-/Glow-Elemente sollten IMMER `pointer-events: none` haben. Nutze `gfx-decorative` Klasse.

---

## 11. 🔄 Vergleich: NoteDrill vs TrackMeAI GFX-System

| Aspekt | NoteDrill | TrackMeAI |
|--------|-----------|-----------|
| HTML-Attribut | `data-graphics-preset` | `data-graphics-quality` |
| **Variablen-Pattern** | **Scale-Faktoren (7 Variablen)** ✅ | Toggle+Intensity (16 Variablen) |
| Kern-Formel | `calc(Xpx * var(--gfx-*-scale))` | `calc(Xpx * enabled * intensity)` |
| State Management | Zustand + persist | React Context + useReducer |
| FPS Monitoring | Ja (Auto-Downgrade) | Nein |
| CSS Organisation | 7 Dateien in `app/styles/globals/` | 18 Dateien in `app/graphics/` |
| Klassen-Prefix | `gfx-` | `gfx-` (identisch) |
| Device Detection | GPU-Tier + Memory + Category | Device-Info + Recommendation |
| Kompatibilität | Hat Aliase für beide Patterns | Nur eigenes Pattern |

### Empfohlener Standard für neue Projekte

- **Variablen:** 7 Scale-Faktoren (`--gfx-*-scale`) → NoteDrill-Pattern
- **Attribut:** `data-graphics-preset` ODER `data-graphics-quality` (projektweit konsistent)
- **State:** Zustand (einfacher) ODER Context (kein Extra-Dependency) - je nach Projekt
- **Klassen:** `gfx-` Prefix (beide Projekte kompatibel)

---

## 12. ❓ FAQ

**Q: Mein Projekt hat schon ein GFX-System - muss ich von vorne anfangen?**
A: Nein! Siehe Abschnitt 7 (Harmonisierung). Kompatibilitäts-Aliase ermöglichen schrittweise Migration.

**Q: Wie viele Phasen brauche ich für ein neues Projekt?**
A: Phase 0 (Setup) + Phase 1 (Skript) + Phase 2 (Audit) + Phase 3 (manuell, 2-3 Sub-Phasen) + Phase 4 (Validierung) = **~5-7 Phasen** statt 60+

**Q: Was passiert mit projekt-spezifischen Glows?**
A: Die kommen in eine separate `gfx-utilities-app.css` Datei. Das Core-System bleibt universell.

**Q: Brauche ich die Settings-UI?**
A: Optional. Das System funktioniert auch nur mit CSS-Variablen und einem Default-Preset.

**Q: Kann ich `data-graphics-quality` statt `data-graphics-preset` nutzen?**
A: Ja, beides funktioniert. Hauptsache konsistent innerhalb des Projekts. Der CSS-Selektor und der JS-Code müssen denselben Attribut-Namen nutzen.
