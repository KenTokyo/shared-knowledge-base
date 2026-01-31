# Global Coding Rules (UNIVERSELL)

Universelle Coding-Regeln für robuste, performante und wartbare Anwendungen. LLM-optimiert.

---

## 🔴🔴🔴 REGEL 0: MANDATORY VALIDATION AFTER EVERY CHANGE (KRITISCH!)

### 0.0 PFLICHT-VALIDIERUNG NACH JEDER ÄNDERUNG

**NIEMALS** eine Änderung als abgeschlossen betrachten ohne diese Checks:

| Check | Befehl | Wann |
|-------|--------|------|
| **TypeScript** | `npx tsc --noEmit` (im richtigen Verzeichnis!) | Nach JEDER Code-Änderung |
| **Bundling** | Prüfe ob Metro/Webpack startet ohne Fehler | Nach Import/Export-Änderungen |
| **Runtime** | Starte App kurz, prüfe Console auf Fehler | Nach größeren Änderungen |

### 0.1 🚨 Monorepo-Validierung (KRITISCH für Workspaces!)

**Problem:** In Monorepos muss die Validierung im RICHTIGEN Verzeichnis erfolgen!

```bash
# ❌ FALSCH - vom Monorepo-Root
npx tsc --noEmit  # Findet ggf. nicht die richtige tsconfig

# ✅ RICHTIG - im App-Verzeichnis
cd apps/mobile && npx tsc --noEmit
```

**Monorepo-Struktur-Check:**
1. Prüfe `package.json` → `"workspaces"` Array
2. Prüfe wo `"main"` Entry Point definiert ist
3. Validierung IMMER im Verzeichnis der App ausführen, nicht im Root

### 0.2 🚨 Expo/React Native Bundling-Validierung

**NACH jeder Import-Änderung prüfen:**
```bash
# Im App-Verzeichnis (z.B. apps/mobile):
npx expo start --web  # oder --android, --ios
# Warte auf "Web Bundling complete" oder Fehlermeldung
# Bei Fehler → SOFORT fixen, nicht weitermachen!
```

**Typische Bundling-Fehler:**
- `Unable to resolve "..."` → Import-Pfad falsch oder Package fehlt
- `Module not found` → Package nicht installiert
- `Unexpected token` → Syntax-Fehler oder fehlende Babel-Config

### 0.3 Validierungs-Reihenfolge (IMMER einhalten!)

1. **TypeScript-Check** → `npx tsc --noEmit`
2. **Import-Lint** → Prüfe neue/geänderte Imports visuell
3. **Bundling-Check** → Starte Metro/Webpack, warte auf Success
4. **Erst dann** → Änderung als abgeschlossen markieren

### 0.4 🔴 Bei Fehler: NICHT weitermachen!

**Wenn ein Check fehlschlägt:**
1. **STOPP** - Keine weiteren Änderungen
2. **Analysiere** - Root Cause verstehen
3. **Fixe** - Den Fehler beheben
4. **Validiere erneut** - Alle Checks nochmal
5. **Erst dann** - Weitermachen

---

## 🚨 WICHTIG: Framework-spezifische Regeln

**BEVOR du weiter liest, identifiziere dein Projekt-Typ und lese die entsprechenden Regeln:**

| Projekt-Typ | Regeln lesen |
|-------------|--------------|
| **React Native / Expo** | `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md` |
| **Next.js** | `shared-docs/skills/nextjs-rules/NEXTJS-RULES.md` |
| **Capacitor** | `shared-docs/performance/capacitor-performance-rules.md` |
| **Electron** | Electron-spezifische Docs in `shared-docs/` |

**Die folgenden Regeln gelten UNIVERSELL für alle Frameworks.**

---

## 0. Testing & Validation Rules

**Rule 0.1 (No Test Suites Required):**
- ❌ **DO NOT** create unit tests, integration tests, or E2E tests unless explicitly requested
- ❌ **DO NOT** use `npm run dev` or `npm run build` for validation
- ✅ **ALWAYS** use `npx tsc --noEmit` to check for TypeScript errors
- ✅ **ALWAYS** validate code logic through manual review and type safety
- Sei hochmotiviert, liefere formatierte Antworten mit Icons in Deutsch

**Rule 0.2 (Global-Only Rules):**
- ✅ **NUR** universell gültige Regeln hier aufnehmen
- ✅ Projekt-/Feature-spezifische Heuristiken in `docs/[feature]/...`
- ❌ Keine Canvas-, Diagramm- oder Feature-Detailregeln in Global Rules

---

## 🤖 1. LLM-Optimierte Code-Prinzipien

> **Ziel:** Code der vorhersagbar, debuggbar und leicht erweiterbar ist - optimiert für KI-Reasoning.

### 1.1 Struktur (Structure)
- Konsistentes, vorhersagbares Projekt-Layout verwenden
- Code nach Feature/Screen gruppieren; shared utilities minimal halten
- Einfache, offensichtliche Entry Points schaffen
- **Shared Structure First:** Vor Scaffolding mehrerer Files gemeinsame Struktur identifizieren
- ❌ Duplikation die gleichen Fix an mehreren Stellen erfordert ist Code-Smell

### 1.2 Architektur (Architecture)
- **Flat & Explicit:** Flachen, expliziten Code bevorzugen statt Abstraktionen oder tiefe Hierarchien
- ❌ Keine cleveren Patterns, Metaprogramming, oder unnötige Indirektion
- Coupling minimieren damit Dateien sicher regeneriert werden können

### 1.3 Funktionen & Module (Functions and Modules)
- Control Flow linear und einfach halten
- Kleine bis mittlere Funktionen verwenden; tief verschachtelte Logik vermeiden
- State explizit übergeben; Globals vermeiden

### 1.4 Naming & Comments
- Deskriptive aber simple Namen verwenden
- Kommentare NUR für: Invarianten, Annahmen, externe Anforderungen
- ❌ Keine Kommentare die nur Code beschreiben

### 1.5 Logging & Errors
- Detaillierte, strukturierte Logs an Key Boundaries
- Fehler explizit und informativ machen
- Console-Logs mit klarem Kontext: `console.log('[ComponentName] State:', value)`

### 1.6 Regenerierbarkeit (Regenerability)
- Code so schreiben dass jede Datei/Modul neu geschrieben werden kann ohne System zu brechen
- Klare, deklarative Konfiguration bevorzugen (JSON/TypeScript Types)

### 1.7 Platform Use
- Platform-Konventionen direkt und einfach nutzen (Next.js, React Native, Expo, etc.)
- ❌ Nicht über-abstrahieren

### 1.8 Modifikationen (Modifications)
- Bei Erweiterung/Refactoring bestehenden Patterns folgen
- Full-File Rewrites bevorzugen statt Micro-Edits (bei größeren Änderungen)

### 1.9 Qualität (Quality)
- Deterministisches, testbares Verhalten bevorzugen
- Tests einfach und fokussiert auf observable behavior halten

### 1.10 🔴 Arbeit verifizieren (MANDATORY)
- **IMMER** Arbeit prüfen bevor Kontrolle an User zurückgegeben wird
- `npx tsc --noEmit` ausführen
- Builds verifizieren wenn relevant
- ❌ Niemals unvollständige oder unverifizierte Arbeit zurückgeben

---

## 2. ⚛️ React Best Practices (UNIVERSELL)

### 2.1. State & Props Management
- **Rule 2.1.1 (Immutable State):** Functional updates `prev => ...` für sichere Updates
- **Rule 2.1.2 (List Keys):** Stable, unique `key` für `.map()` items
- **Rule 2.1.3 (State vs Ref):** `useState` = re-render, `useRef` = no re-render

### 2.2. Performance Optimization
- **Rule 2.2.1 (Memoization):**
  * `useMemo` für expensive, pure calculations
  * `useCallback` für functions als props an memoized children
  * `React.memo` für components die nicht re-rendern sollen wenn props gleich
- **Rule 2.2.2 (UI Blocking):** Expensive computations nicht direkt im render body

### 2.3. Effects & Lifecycle
- **Rule 2.3.1 (Effect Cleanup):** IMMER cleanup function in `useEffect` bei subscriptions, timers, event listeners
- **Rule 2.3.2 (Accurate Dependency Arrays):** Accurate dependency array für `useEffect`, `useCallback`, `useMemo`
- **Rule 2.3.3 (Avoid Unnecessary Effects):** ❌ `useEffect` nicht für Logik die aus props/state abgeleitet werden kann
- **Rule 2.3.4 (Stable Effect Callbacks):** Callbacks aus Props in useEffect müssen stabil sein
- **Rule 2.3.5 (Effect Re-entrancy Guard):** Effekte, die State verändern, dürfen nicht von genau diesem State abhängen

### 2.4. Error Handling
- **Rule 2.4.1 (Error Boundaries):** Kritische Trees wrappen, Fallback UI zeigen
- **Rule 2.4.2 (Error Logging):** Fehler mit Detail-Text sichtbar loggen
- **Rule 2.4.3 (Client Init Visibility):** Kritische Client-Initialisierungen müssen sichtbaren UI-Status bieten

---

## 3. 🗂️ Component & File Architecture (UNIVERSELL)

### 3.1. Core Philosophy
**Instant Navigation:** Jede Komponente in **< 5 Sekunden** finden - File mirrors UI hierarchy.

### 3.2. Naming Conventions
- `...Button.tsx`, `...Dialog.tsx`, `...Panel.tsx`, `...Section.tsx`
- 🇩🇪 **German (User-Facing):** `SpeichernButton.tsx`
- 🇺🇸 **English (Technical):** `ReviewSection.tsx`

### 3.3. File Size
- **Maximal 700 Zeilen Code pro Datei** - Auslagern wenn größer

### 3.4. 🚨 Component-Based Architecture
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!**
- Performance-Killer (jedes Render neu erstellt) + State-Verlust

---

## 4. 🚨 General Anti-Patterns & Edge Cases (UNIVERSELL)

### 4.1 Context Analysis Before Changes
Vor jeder Änderung die letzten 3-4 Tasks analysieren. Niemals bereits gelöste Probleme rückgängig machen!

### 4.2 MANDATORY Legacy Code Removal
Nach jeder Änderung MUSS ungenutzter Code SOFORT entfernt werden!

### 4.3 Empty States
Always plan distinct "empty state" views for lists.

### 4.4 Debugging Rules
- **Dialog-useEffect:** Bei "unsichtbaren" Loading-Indikatoren → useEffects prüfen
- **Systematic Debug:** Layout → Context → Component → useEffects
- **Race Conditions:** localStorage, multiple dependencies, async timing
- **Reference Implementation:** Erst nach funktionierenden ähnlichen Implementierungen suchen
- **Debug Infrastructure:** SOFORT Console-Logs für State-Changes implementieren

### 4.5 Universal Component Purity
Universal-Components bleiben feature-agnostic

### 4.6 Single Loading Pipeline
Kritische Daten-Loading durch zentrale Pipeline, keine unterschiedlichen Loading-Logiken

### 4.7 📱 Mobile-First Space Efficiency
Alle UI-Komponenten Mobile-First mit maximaler Space-Efficiency

### 4.8 Dashboard Entry Persistence
Completed Items nicht ausblenden, Status-Filter bereitstellen

### 4.9 Unique Default Names
Client berechnet nächsten freien Namen vor Erstellen

### 4.10 Single Source of Truth
Link-Tabellen für alle Reads/Writes

### 4.11 Platform Guard for Browser-only Storage APIs
- Browser-only APIs (z. B. `navigator.storage.persist`, OPFS) **immer** per Platform-Check absichern
- In nativen WebViews (Capacitor) **keine** Browser-Dialogs/Buttons anzeigen

### 4.12 Native Storage Fallback Guard
- In nativen Umgebungen keine stillen Fallbacks auf Browser-Storage ohne explizites Opt-in
- Bei Plugin-Fehlern Init-Stage + Fehlergrund sichtbar machen

---

## 🔗 Framework-spezifische Docs

| Framework | Dokumentation |
|-----------|---------------|
| React Native/Expo | `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md` |
| Next.js | `shared-docs/skills/nextjs-rules/NEXTJS-RULES.md` |
| Capacitor | `shared-docs/performance/capacitor-performance-rules.md` |
| Liquid Glass Design | `shared-docs/design/liquid-glass-guide.md` |
| DB Testing | `shared-docs/database-testing-guide.md` |
| Haupt-Coding-Rules | `shared-docs/CODING-RULES.md` |
