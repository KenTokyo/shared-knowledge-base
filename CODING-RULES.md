# 🎯 Coding Rules & Development Guidelines

**Zweck:** Universelle Regeln für konsistente, performante und wartbare Code-Entwicklung.

---

Bitte achte bei **jedem** Problem nicht nur auf den konkreten Fehler (z. B. einen **TypeScript-Error**), sondern auch darauf, ob die **Architektur** dahinter grundsätzlich falsch oder riskant ist.

### ✅ Was ich von dir erwarte

* **Nicht nur den Error fixen**, sondern prüfen, ob die Lösung langfristig stabil ist. 🧩
* Wenn du merkst, dass **die aktuelle Struktur uns in Zukunft Probleme macht**, dann **sag es direkt**. 🚨
* Wenn etwas so gebaut ist, dass es **eigentlich nicht sauber funktionieren kann** (nur mit Workarounds/Tricks), dann **muss das klar benannt werden**. 🛑
* Wenn es eine **bewährte Standard-Methode** gibt, die praktisch jeder nutzt – und wir umgehen sie gerade – dann **weise darauf hin**. ✅

### ⚠️ Ganz wichtig

Wenn du erkennst, dass wir gerade in eine **schlechte technische Richtung** abdriften (z. B. durch Workarounds, unklare Verantwortlichkeiten, falsche Layering/Struktur), dann musst du das ausdrücklich sagen – auch wenn es unbequem ist.

### 🏗️ Konsequenz: Refactor statt Pflaster

Wenn nötig, sag bitte klar:

> **„Wir müssen hier sehr viel umbauen. Die jetzige Struktur ist langfristig fehlerhaft und sollte komplett refactored bzw. neu strukturiert werden."** 🔧🔥

Denn wenn das nicht offen angesprochen wird, kommen wir nicht weiter. 🚀 Nutze auch das Internet, falls du spürst, das könnte in die falsche Richtung gehen und ob es nicht schon jemand gibt, der das Problem schon gelöst hat. Denn sobald unser Grundgerüst die Architektur falsch ist, werden wir immer wieder auf Probleme stoßen. 🔧🔥

---

### 🔴 REGEL 0: Anwender-Fehler vs. Code-Fehler (KRITISCH!)

**BEVOR du einen Fehler fixst, IMMER zuerst prüfen:**

| Frage | Wenn JA → |
|-------|-----------|
| Hat der User den Befehl im **falschen Verzeichnis** ausgeführt? | → **Kein Code-Fix nötig!** Hinweis geben. |
| Hat der User **vergessen** etwas zu installieren/starten? | → **Kein Code-Fix nötig!** Checklist geben. |
| Ist die Fehlermeldung ein **bekanntes Setup-Problem**? | → **Kein Code-Fix nötig!** Docs verlinken. |
| Läuft ein **anderer Prozess** auf demselben Port? | → **Kein Code-Fix nötig!** Kill-Befehl geben. |

**NIEMALS Workarounds für Anwender-Fehler bauen!**

**Beispiel - WAS ICH HÄTTE TUN SOLLEN:**
```
❌ FALSCH: "Ich erstelle eine App.tsx im Root als Workaround"
✅ RICHTIG: "Von welchem Verzeichnis hast du 'expo start' ausgeführt?
            Bei Monorepos musst du im App-Verzeichnis sein: cd apps/mobile"
```

**Bei Fehlermeldungen IMMER nachfragen:**
1. Von welchem Verzeichnis wurde der Befehl ausgeführt?
2. Welcher Befehl genau wurde verwendet (`npm start` vs `expo start`)?
3. Wurden alle Dependencies installiert?

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

## Regel 1: Workflow & Arbeitsweise

### 1.1 Vor dem Start
- **Vorhaben präsentieren:** Formatiert mit Icons, klare Struktur
- **Größere Aufgaben:** Plan in `docs/[feature]/tasks/[datum]-[feature]-plan.md` erstellen
- **Code-Reuse prüfen:** ERST nach existierenden Funktionen/Components mit `Grep` suchen
- **Testing:** Nur `npx tsc --noEmit` (❌ kein `npm run dev/build`)
- Sei hochmotiviert, liefere formatierte Antworten mit Icons in Deutsch

### 1.2 🚨 Planungs-Regel: Kein Code in Planungsdokumenten
- ✅ **ERLAUBT:** Konzepte, Architektur, Dateipfade, API-Signaturen (max 3-5 Zeilen)
- ❌ **VERBOTEN:** Vollständige Implementierungen, Code-Blöcke >10 Zeilen
- **Ziel:** Max 500-800 Zeilen pro Plan (WAS und WARUM, nicht WIE im Detail)

### 1.3 Kritisches Denken (Edge Cases)
Proaktiv: Extrem-Fälle, falsches User-Verhalten, Performance, Concurrent Access, Device-Unterschiede.

### 1.4 Nach Abschluss
- **Plan aktualisieren:** Phase als ✅ markieren
- **Dokumentation erweitern:** Bei großen Änderungen `docs/[feature]/[feature]-overview.md`
- **Zusammenfassung:** Icons, Dateipfade, abgeschlossene Phase nennen

---

## Regel 2: Architektur & Dateistruktur (UNIVERSELL)

### 2.1 🚨 Component-Based Architecture (WICHTIGSTE REGEL)
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!**
- **Warum?** Performance-Killer (jedes Render neu erstellt) + State-Verlust
- ✅ Jede Komponente in separater Datei

### 2.2 Component Organization
**Maximal 700 Zeilen Code pro Datei** - Auslagern wenn größer

### 2.3 Component Naming Convention
- 🇩🇪 **DEUTSCH (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`
- 🇺🇸 **ENGLISCH (Technical):** Section, Card, Item → `ReviewSection.tsx`

---

## Regel 3: React Best Practices (UNIVERSELL)

### 3.1 State & Props
- **Immutable State:** `setState(prev => ...)`
- **List Keys:** Stable, unique `key` prop für `.map()` items
- **State vs Ref:** `useState` = re-render, `useRef` = no re-render

### 3.2 Performance
- **Memoization:** `useMemo` (expensive calculations), `useCallback` (functions as props), `React.memo` (components)

### 3.3 Effects & Lifecycle
- **Cleanup:** IMMER cleanup function bei subscriptions/timers/listeners
- **Dependency Array:** Accurate dependencies, `[]` = mount only

### 3.4 Component Communication
- **Parent↔Child:** Props down, Callbacks up
- **2-3 Levels:** Lifting State Up
- **3+ Levels:** Context API oder State Management
- **Referenz:** `shared-docs/react-core-communication-patterns.md`

### 3.5 🔴 Stale Closure Pattern
```typescript
// ❌ FALSCH - habits ist noch ALTER State!
setHabits(prev => prev.map(h => ...));
onHabitsUpdate?.(habits);

// ✅ RICHTIG - Callback mit neuen Daten
setHabits(prev => {
  const updated = prev.map(h => ...);
  onHabitsUpdate?.(updated);
  return updated;
});
```

---

## Regel 4: Network Performance (UNIVERSELL)

### 4.1 🔴 Waterfall-Fetching Prevention
Unabhängige Fetches parallel: `Promise.all([fetch1(), fetch2()])`

### 4.2 🔴 Polling Cleanup
Jeder `useEffect` mit Timers/Subscriptions MUSS Cleanup-Function haben

### 4.3 🔴 N+1 Query Prevention
Nested Queries in Loops → Batch-Loading mit JOINs oder `inArray(itemIds)`

---

## Regel 5: Kritische Anti-Patterns (UNIVERSELL)

### 5.1 🔴 Context Analysis Before Changes
Vor Änderungen: Letzte 3-4 Tasks analysieren. Würde meine Änderung diese brechen?

### 5.2 🔴 Legacy Code Removal
Nach jeder Änderung SOFORT ungenutzten Code entfernen.

### 5.3 🔴 Mobile-First Space Efficiency
UI MUSS Mobile-First designed werden: Maximale Space-Efficiency.

### 5.4 🔴 Wiederverwendbarkeit-First
Dialoge/Komponenten MÜSSEN für Wiederverwendung designed werden: Props für Modi, Callback-Props.

### 5.5 🔴🔴🔴 RECHERCHE VOR RUMPROBIEREN (KRITISCH!)
**PFLICHT-Workflow bei unbekannten Fehlern:**
1. **Stack-Trace GENAU lesen** - Welche Datei, Zeile, Komponente?
2. **RECHERCHIEREN** - Docs, GitHub Issues durchsuchen
3. **Root Cause verstehen** - WARUM passiert der Fehler?
4. **DANN erst fixen** - Mit Verständnis der Ursache

---

## Regel 6: Documentation System

**Structure:** `docs/OVERVIEW.md` → `docs/[feature]/[feature]-overview.md` → `docs/[feature]/tasks/[datum]-[task].md`

---

## Regel 7: Validierung

Bevor du anfängst eine Planung zu implementieren, validiere ob sie Sinn macht und korrekt geplant wurde.

---

## 🔴 Regel 8: TypeScript-Fehler (KRITISCH!)

### 8.1 🚨 ZERO TOLERANCE für TypeScript-Fehler
- **NACH JEDER PHASE:** `npx tsc --noEmit` ausführen
- **NIEMALS** TypeScript-Fehler ignorieren oder "später fixen"
- **SOFORT** beheben bevor zur nächsten Phase gegangen wird
- TypeScript-Fehler sind **BLOCKER** - keine Ausnahmen!

### 8.2 Häufige Fehler-Kategorien
- **TS2307:** Cannot find module → Paket installieren
- **TS2322:** Type mismatch → Interface/Type anpassen
- **TS2339:** Property does not exist → Type erweitern
- **TS18048:** Possibly undefined → Optional chaining oder Guard

---

## 🔴🔴🔴 Regel 9: MANDATORY VALIDATION (NEU - KRITISCH!)

### 9.1 🚨 NACH JEDER ÄNDERUNG VALIDIEREN

**Ich (Claude) MUSS nach JEDER Code-Änderung diese Checks durchführen:**

| Check | Befehl | Wann |
|-------|--------|------|
| **TypeScript** | `cd apps/mobile && npx tsc --noEmit` | Nach JEDER Änderung |
| **Bundling** | `cd apps/mobile && npx expo start --web` | Nach Import-Änderungen |

### 9.2 🚨 Monorepo-Validierung

**KRITISCH:** In Monorepos MUSS die Validierung im RICHTIGEN Verzeichnis erfolgen!

```bash
# ❌ FALSCH - vom Root
npx tsc --noEmit

# ✅ RICHTIG - im App-Verzeichnis
cd apps/mobile && npx tsc --noEmit
```

### 9.3 🚨 Bundling-Check Workflow

**Nach Import/Export-Änderungen:**
1. Metro stoppen falls läuft
2. `cd apps/mobile && npx expo start --web`
3. Warten auf "Web Bundling complete" oder Fehler
4. Bei Fehler → STOPP, analysieren, fixen
5. Erst bei Erfolg → Änderung abgeschlossen

### 9.4 Bei Fehler: STOPP-Protokoll

1. **STOPP** - Keine weiteren Änderungen
2. **ANALYSIERE** - Root Cause verstehen (nicht raten!)
3. **RECHERCHIERE** - Docs/Issues wenn unklar
4. **FIXE** - Mit Verständnis der Ursache
5. **VALIDIERE** - Alle Checks erneut
6. **ERST DANN** - Weitermachen

---

## 🤖 Regel 10: LLM-Kontextmanagement (KRITISCH!)

### 10.1 🚨 TOKEN-LIMIT WARNUNG

**ACHTUNG:** Nach ~150.000 Tokens beginnen LLMs zu halluzinieren und Fehler zu machen!

| Kontext | Limit | Aktion |
|---------|-------|--------|
| Planungs-Chat | 4 Planungen max | Neuen Chat öffnen |
| Coding-Chat | ~150.000 Tokens | STOPP, neuen Chat öffnen |
| Kontext-Verlust | ~200.000 Tokens | Halluzinationen wahrscheinlich |

### 10.2 Neuer Chat Workflow

**Bei Erreichen des Token-Limits:**
1. Aktuellen Stand in MASTER-ORCHESTRATOR.md dokumentieren
2. Migrations-Tracker in der Phase-Datei aktualisieren
3. Zusammenfassung für nächsten Chat erstellen
4. Neuen Chat mit relevanten Dateien starten

---

## ✅ Quick Checklist (UNIVERSELL)

**Vor Commit:**
- `npx tsc --noEmit` (🔴 MUSS 0 FEHLER HABEN!)
- Ungenutzter Code entfernt
- Mobile-First
- Edge Cases bedacht
- Max 700 lines/file

**🤖 LLM-Kontext:** Nach 150k Tokens → NEUEN CHAT öffnen!

---

## 🔗 Framework-spezifische Docs

| Framework | Dokumentation |
|-----------|---------------|
| React Native/Expo | `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md` |
| Next.js | `shared-docs/skills/nextjs-rules/NEXTJS-RULES.md` |
| Capacitor | `shared-docs/performance/capacitor-performance-rules.md` |
| Liquid Glass Design for Tailwind CSS | `shared-docs/design/liquid-glass-guide.md` |
| DB Live Testing for Postgres | `shared-docs/database-testing-guide.md` |
