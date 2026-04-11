# 🔍 Postmortem: CSS Transform Coordinate-Space Bug (Ink-Canvas Pan)

## 📊 Technische Details

**Dauer:** ~1 Stunde
**Problem:** Nach Pan-Geste wurde an falscher Position gezeichnet (Cursor ≠ Stroke-Position)
**Root Cause:** Doppelte Offset-Subtraktion durch implizite CSS-Transform-Kompensation
**Lösung:** Nur Scale-Division, keine Offset-Subtraktion (getBoundingRect liefert bereits verschobene Position)

---

## 🚨 Root Cause

CSS Transform wird auf **Container-DIV** angewendet:
```css
transform: translate(offsetX, offsetY) scale(scale)
```

**Problem:** `getBoundingClientRect()` liefert Position des **bereits verschobenen** Elements.

**Alte (falsche) Mathematik:**
1. `x = clientX - rect.left` → bereits relativ zum verschobenen Canvas
2. `x = (x - offsetX) / scale` → offsetX **nochmal** abgezogen ❌

**Ergebnis:** Doppelte Offset-Subtraktion → Cursor-Position verschoben

**Neue (korrekte) Mathematik:**
1. `x = clientX - rect.left` → bereits relativ zum verschobenen Canvas
2. `x = x / scale` → nur noch skalieren ✅

---

## 🎓 Universelle Regel (CODING-RULES.md)

**Rule 7.17: CSS Transform Coordinate-Space Awareness**

Bei Pointer-Event-Koordinaten auf transformierten Elementen: `getBoundingClientRect()` liefert die Position des **bereits transformierten** Elements (inkl. translate/scale/rotate). Koordinaten-Umrechnung muss daher nur die Transform-**Inverse** auf die **Differenz** anwenden, nicht auf absolute Screen-Koordinaten. Mental-Check: "Ist mein Element das Transform-Target oder dessen Parent?" → Parent = implizite Kompensation bereits erfolgt.

---

## 📋 Lessons Learned

### Debugging-Ansatz (für Zukunft):
1. **Reference Implementation prüfen:** DiagramCanvas nutzt gleichen Pattern → Mathematik vergleichen
2. **CSS-Transform-Hierarchie klären:** Welches Element hat die Transform? (Container vs. Canvas selbst)
3. **getBoundingRect-Semantik:** Liefert transformierte oder untransformierte Position?
4. **Koordinaten-Space tracken:** Screen → Element → Canvas (jeden Schritt dokumentieren)

### Was hätte schneller zum Ziel geführt:
- **Sofortiger Vergleich** mit DiagramCanvas (Zeile 786-831): Identisches Pattern, funktionierende Pan-Logic
- **Transform-Hierarchie-Analyse:** Wo wird CSS Transform angewendet? (Container-DIV vs. Canvas)
- **Koordinaten-Space-Diagramm:** Screen → BoundingRect → Transform-Inverse → Canvas

**Zeit:** ~15 Minuten statt 1 Stunde mit systematischem Transform-Debugging

---

## 🏁 Fazit

**1 Stunde → 15 Minuten** möglich mit CSS-Transform-Awareness!

Bei transformierten Elementen **immer** klären: Welches Element hat die Transform, und liefert `getBoundingRect()` bereits die transformierte Position? Doppelte Transform-Kompensation ist ein häufiges Anti-Pattern bei Canvas/SVG-Interaktionen.

**Bottom Line:** CSS Transforms ändern die Coordinate-Space-Semantik von DOM-APIs – getBoundingRect ist transform-aware! 🎯
