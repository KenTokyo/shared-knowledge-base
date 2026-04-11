# KRITISCHE REGELN (IMMER LESEN)

---
version: 1.0
updated: 2026-04-11
owner: @KenTokyo
---

Diese 15 Regeln haben den **groessten Impact**. Bei Verstoss: Bugs, Performance-Probleme, User-Frustration.

**Lesezeit:** ~2 Minuten | **Prioritaet:** HOECHSTE

---

## ARCHITEKTUR-KILLER

### 1. NIEMALS Komponenten in Komponenten definieren
- **Warum kritisch:** Performance-Killer (jedes Render neu erstellt) + State geht verloren
- **Richtig:** Jede Komponente in eigener Datei
- **Referenz:** `CODING-RULES.md` Regel 2.1

### 2. Max 700 Zeilen pro Datei
- **Warum kritisch:** Groessere Dateien werden unwartbar, KI verliert Kontext
- **Richtig:** In Unterkomponenten, Helpers, Services aufteilen
- **Referenz:** `AGENTS.md` Zeile 32-33

### 3. TypeScript-Fehler = BLOCKER
- **Warum kritisch:** Ignorierte TS-Fehler werden zu Runtime-Bugs
- **Richtig:** Nach jeder Phase `npm run type-check`, Fehler sofort fixen
- **Referenz:** `CODING-RULES.md` Regel 8

### 4. Duplikat-Check vor neuer Datei (80%-Regel)
- **Warum kritisch:** Code-Bloat, inkonsistente Implementierungen
- **Richtig:** Existiert aehnliches mit 80%+ Funktionalitaet? → Erweitern statt neu
- **Referenz:** `AGENTS.md` Zeile 249-252

---

## USER-EXPERIENCE-KILLER

### 5. NIEMALS User-Input parsen fuer Intent-Routing
- **Warum kritisch:** User-Sprache ist mehrdeutig, Pattern-Matching versagt
- **Richtig:** User-Freitext → IMMER zur KI, nur KI-Antworten parsen
- **Referenz:** `CODING-RULES.md` Regel 5.11

### 6. Disabled Buttons MUESSEN erklaeren WARUM
- **Warum kritisch:** User raten = User frustriert = User weg
- **Richtig:** Tooltip oder Text: "Du musst erst X machen"
- **Referenz:** `CODING-RULES.md` Regel 5.8

### 7. Design fuer Neuntklaessler
- **Warum kritisch:** NoteDrill ist fuer Schueler, nicht fuer Entwickler
- **Richtig:** Einfache Woerter, Icons mit Text, keine Fachbegriffe ohne Erklaerung
- **Referenz:** `AGENTS.md` Zeile 296-312

### 8. Mobile-First Space Efficiency
- **Warum kritisch:** Mobile User sind die Mehrheit, Scroll-Orgien = Abbruch
- **Richtig:** Collapsible Bereiche, Panels, Combo-Boxen
- **Referenz:** `CODING-RULES.md` Regel 5.3

---

## PERFORMANCE-KILLER

### 9. Waterfall-Fetching verhindern
- **Warum kritisch:** Sequenzielle Fetches = langsame App = User weg
- **Richtig:** `Promise.all([fetch1, fetch2])` fuer unabhaengige Calls
- **Referenz:** `CODING-RULES.md` Regel 4.1

### 10. Cleanup in useEffect PFLICHT
- **Warum kritisch:** Memory Leaks, Ghost-Subscriptions, Race Conditions
- **Richtig:** Timer, Subscriptions, Listener → Return-Funktion mit Cleanup
- **Referenz:** `CODING-RULES.md` Regel 3.3

### 11. N+1 Query Prevention
- **Warum kritisch:** 100 Items = 101 Queries = Timeout
- **Richtig:** Batch mit JOINs oder `inArray(itemIds)`, keine Queries in Loops
- **Referenz:** `CODING-RULES.md` Regel 4.3

---

## WARTBARKEIT-KILLER

### 12. Legacy Code sofort entfernen
- **Warum kritisch:** Toter Code verwirrt, wird versehentlich genutzt, blaecht Bundles
- **Richtig:** Nach jeder Aenderung ungenutzten Code loeschen
- **Referenz:** `CODING-RULES.md` Regel 5.2

### 13. Planen vor Coden (bei >2 Dateien)
- **Warum kritisch:** Ohne Plan → Spaghetti, vergessene Edge Cases, doppelte Arbeit
- **Richtig:** Plan in `docs/[feature]/tasks/` erstellen
- **Referenz:** `AGENTS.md` Zeile 136-143

### 14. Recherche VOR Rumprobieren
- **Warum kritisch:** Blindes Probieren = falsche Fixes = neue Bugs
- **Richtig:** Stack-Trace lesen → Docs/Issues suchen → Root Cause verstehen → DANN fixen
- **Referenz:** `CODING-RULES.md` Regel 5.5

---

## UI-LIBRARY-FALLEN

### 15. UI-Library-Defaults respektieren
- **Warum kritisch:** Manuelle Overrides brechen Konsistenz, Accessibility, Updates
- **Richtig:** Variants nutzen (`size="sm"`), keine manuellen `py-3`, `h-12` auf Shadcn/Radix
- **Referenz:** `CODING-RULES.md` Regel 5.6

---

## BONUS: Solide Hintergrundfarben fuer Dialoge

- **Verboten:** `bg-black/40`, halbtransparente Hintergruende
- **Richtig:** `!bg-[#0c0f1a]/95` oder solide Hex-Farben
- **Referenz:** `CODING-RULES.md` Regel 5.9

---

## Schnell-Checkliste vor Commit

- [ ] TypeScript: `npm run type-check` = 0 Fehler
- [ ] Keine Komponente in Komponente definiert
- [ ] Keine Datei >700 Zeilen
- [ ] Cleanup in allen useEffects
- [ ] Disabled Buttons haben Erklaerung
- [ ] Legacy Code entfernt

---

## Hierarchie der Regeldateien

```
1. KRITISCHE-REGELN.md     ← Du bist hier (IMMER zuerst)
2. CODING-RULES.md         ← Universelle Regeln (bei Coding)
3. CLAUDE.md               ← Projekt-Architektur
4. AGENTS.md               ← Projekt-spezifische Erweiterungen
```

**Bei Konflikt:** Hoehere Nummer ueberschreibt niedrigere (Projekt > Universal > Kritisch).
