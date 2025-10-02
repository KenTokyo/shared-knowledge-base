# 🔄 React Core Communication Patterns - Kompakt-Guide

> **Für wen?** React-Anfänger, die verstehen möchten, wie Komponenten miteinander kommunizieren - ohne komplexe Libraries wie Redux/Zustand.

---

## 📋 Table of Contents

1. [🎯 Die 4 Core Patterns](#-die-4-core-patterns)
2. [📦 Pattern 1: Props (Parent → Child)](#-pattern-1-props-parent--child)
3. [☎️ Pattern 2: Callbacks (Child → Parent)](#️-pattern-2-callbacks-child--parent)
4. [🔄 Pattern 3: Lifting State Up](#-pattern-3-lifting-state-up)
5. [🌐 Pattern 4: Context API](#-pattern-4-context-api)
6. [🧭 Entscheidungsbaum](#-entscheidungsbaum)
7. [💡 Real-World Beispiel: History-Button](#-real-world-beispiel-history-button)
8. [📚 Best Practices](#-best-practices)

---

## 🎯 Die 4 Core Patterns

| Pattern | Richtung | Wann nutzen? |
|---------|----------|--------------|
| 🎁 **Props** | Parent → Child | Daten nach unten weitergeben |
| ☎️ **Callbacks** | Child → Parent | Events nach oben melden |
| 🔄 **Lifting State Up** | Child ↔ Child | Geschwister synchronisieren |
| 🌐 **Context API** | Global | Theme, User, 3+ Level Prop-Drilling |

---

## 📦 Pattern 1: Props (Parent → Child)

### 🎯 Konzept
**Props** sind wie ein **Geschenk vom Vater ans Kind**. Der Parent gibt Daten nach unten weiter.

```tsx
// 👨 Parent Component
function Parent() {
  const userName = "Max";
  return <Child name={userName} age={25} />;
}

// 👶 Child Component
function Child({ name, age }) {
  return <div>Hallo {name}, du bist {age} Jahre alt!</div>;
}
```

### ✅ Vorteile / ❌ Nachteile

| ✅ Vorteile | ❌ Nachteile |
|------------|-------------|
| Einfachste Lösung | Nur eine Richtung |
| Type-Safe | Prop-Drilling bei tiefer Verschachtelung |
| Performance | Skaliert nicht bei vielen Levels |

### 🎯 Wann verwenden?
- ✅ Direkte Parent-Child-Beziehung (1-2 Levels)
- ✅ Read-Only-Daten
- ❌ **NICHT bei 3+ Levels** → Context API nutzen

---

## ☎️ Pattern 2: Callbacks (Child → Parent)

### 🎯 Konzept
**Callbacks** sind wie ein **Telefonanruf vom Kind zum Vater**. Das Kind ruft eine Funktion auf, die der Parent bereitgestellt hat.

```tsx
// 👨 Parent Component
function Parent() {
  const handleChildClick = (message: string) => {
    console.log("Kind hat geklickt:", message);
  };

  return <Child onClick={handleChildClick} />;
}

// 👶 Child Component
function Child({ onClick }) {
  return (
    <button onClick={() => onClick("Hallo Papa!")}>
      Klick mich
    </button>
  );
}
```

### ✅ Vorteile / ❌ Nachteile

| ✅ Vorteile | ❌ Nachteile |
|------------|-------------|
| Bidirektionale Kommunikation | Performance-Issue ohne `useCallback` |
| Ideal für User-Interaktionen | Callback-Hell bei vielen Levels |
| Separation of Concerns | Debugging kann komplex werden |

### ⚡ Performance-Tipp

```tsx
// ❌ SCHLECHT: Neue Function bei jedem Render
function Parent() {
  return <Child onClick={(msg) => console.log(msg)} />;
}

// ✅ GUT: Stabile Function mit useCallback
function Parent() {
  const handleClick = useCallback((msg: string) => {
    console.log(msg);
  }, []); // Nur einmal erstellt

  return <Child onClick={handleClick} />;
}
```

### 🎯 Wann verwenden?
- ✅ User-Interaktionen (Clicks, Form-Submits)
- ✅ Child-Events an Parent melden
- ✅ Controlled Components (Input-Felder)

---

## 🔄 Pattern 3: Lifting State Up

### 🎯 Konzept
**Lifting State Up**: State wird in den **gemeinsamen Parent** verschoben, damit mehrere Kinder darauf zugreifen können.

```tsx
// 👨 Parent Component (besitzt State)
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChildA count={count} />
      <ChildB onIncrement={() => setCount(count + 1)} />
    </>
  );
}

// 👶 Child A (liest State)
function ChildA({ count }) {
  return <div>Count: {count}</div>;
}

// 👶 Child B (ändert State)
function ChildB({ onIncrement }) {
  return <button onClick={onIncrement}>+1</button>;
}
```

### 🌍 Menschliche Analogie
**Wie ein gemeinsames Bankkonto:**
- 👨 Parent verwaltet das Konto (State)
- 👶 Kind A sieht den Kontostand (Props)
- 👶 Kind B kann Geld einzahlen (Callback)
- 🔄 Beide Kinder sind immer synchron

### ✅ Vorteile / ❌ Nachteile

| ✅ Vorteile | ❌ Nachteile |
|------------|-------------|
| Single Source of Truth | Props-Drilling bei vielen Levels |
| Geschwister bleiben synchron | Parent wird komplex |
| Einfaches Debugging | Re-Renders aller Children |

### 🎯 Wann verwenden?
- ✅ Geschwister-Komponenten brauchen denselben State
- ✅ Formulare (Input-Felder synchronisieren)
- ✅ Tabs/Accordions (Active-State)
- ❌ **NICHT bei 3+ Levels** → Context API nutzen

---

## 🌐 Pattern 4: Context API

### 🎯 Konzept
**Context API** ist wie eine **WhatsApp-Gruppe**. Einmal senden, alle empfangen – ohne jeden einzeln anzurufen.

```tsx
// 📢 Context erstellen
const ThemeContext = createContext<"light" | "dark">("light");

// 👨 Provider (Top-Level)
function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <Dashboard />
      <Footer />
    </ThemeContext.Provider>
  );
}

// 👶 Consumer (beliebig tief verschachtelt)
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme === "dark" ? "dark-btn" : "light-btn"}>
    Click
  </button>;
}
```

### ✅ Vorteile / ❌ Nachteile

| ✅ Vorteile | ❌ Nachteile |
|------------|-------------|
| Kein Prop-Drilling | Performance: Alle Consumer re-rendern |
| Ideal für globalen State | Boilerplate (Provider, Consumer) |
| Native React (keine Library) | Nicht für häufige Updates |

### ⚡ Performance-Optimierung: Context-Splitting

```tsx
// ❌ PROBLEM: Alle Consumer re-rendern bei jeder Änderung
const AppContext = createContext({ user, theme, settings });

// ✅ LÖSUNG: Separate Contexts
const UserContext = createContext(user);
const ThemeContext = createContext(theme);
const SettingsContext = createContext(settings);
// Nur Theme-Consumer re-rendern bei Theme-Änderung
```

### 🎯 Wann verwenden?
- ✅ Theme-Switching (Dark/Light Mode)
- ✅ User-Authentifizierung
- ✅ Sprach-Einstellungen (i18n)
- ✅ **3+ Levels Prop-Drilling** vermeiden
- ❌ **NICHT für häufige Updates** (Form-Inputs) → useState

---

## 🧭 Entscheidungsbaum

```
START: Komponenten-Kommunikation?
│
├─ Frage 1: Wie viele Components?
│   ├─ 2 (Parent + Child) ──────────────────► Props + Callbacks
│   ├─ 2-3 Geschwister ─────────────────────► Lifting State Up
│   └─ Viele (global) ──────────────────────► Gehe zu Frage 2
│
└─ Frage 2: Wie oft ändert sich der State?
    ├─ Selten (Theme, User) ────────────────► Context API
    └─ Oft (Form, Cart) ────────────────────► useState + Callbacks
                                               (oder später: Zustand/Redux)
```

### 📊 Schnell-Referenz

| Szenario | Pattern | Warum? |
|----------|---------|--------|
| 👨‍👦 Parent gibt Daten an Child | **Props** | Einfachste Lösung |
| 👦‍👨 Child meldet Event | **Callbacks** | Bidirektional |
| 👨‍👩‍👧 Geschwister synchronisieren | **Lifting State Up** | Single Source of Truth |
| 🌑 Dark/Light Mode | **Context API** | Global, selten geändert |
| 👤 User Authentication | **Context API** | Global, selten geändert |
| 📝 Form State | **useState** + **Callbacks** | Lokal, häufig geändert |

---

## 💡 Real-World Beispiel: History-Button

### 🎯 Das Szenario

Fitness-Tracking-Feature:

```
ExerciseItem (Parent)
 ├─ EnhancedExerciseHistoryDialog (Middle)
 │   └─ EnhancedHistoryTable (Enkel)
 └─ BasicExerciseInput (Child)
```

**Anforderung:** User klickt "Übernehmen" in `EnhancedHistoryTable` → Werte in `BasicExerciseInput` anzeigen.

### 🤔 Problem

| Challenge | Beschreibung |
|-----------|--------------|
| 🔴 Geschwister-Kommunikation | Tabelle ↔ Input sind Geschwister |
| 🔴 Tiefe Verschachtelung | Enkel → Parent → Kind |
| 🔴 Bidirektional | Event nach oben, Daten nach unten |

### ❌ Schlechte Lösung: Context API (Over-Engineering)

```tsx
// ❌ Context für nur 3 Components ist Overkill!
const ExerciseContext = createContext();

function ExerciseItem() {
  const [values, setValues] = useState({});
  return (
    <ExerciseContext.Provider value={{ values, setValues }}>
      <EnhancedExerciseHistoryDialog />
      <BasicExerciseInput />
    </ExerciseContext.Provider>
  );
}
```

**Problem:** Zu komplex für lokalen State!

### ✅ Optimale Lösung: Callbacks + Lifting State Up

```tsx
// 👨 Parent Component (besitzt State)
function ExerciseItem() {
  const [exercise, setExercise] = useState({
    sets: 3,
    reps: 10,
    weight: 50
  });

  // ☎️ Callback-Funktion für History-Apply
  const handleApplyHistoryValues = (
    sets: number,
    reps: number,
    weight: number | null
  ) => {
    setExercise({
      ...exercise,
      sets,
      reps,
      weight,
      maxWeight: weight // ✅ Sync für Basic Mode
    });
  };

  return (
    <>
      {/* 📤 Callback nach unten weitergeben */}
      <EnhancedExerciseHistoryDialog
        onApplyValues={handleApplyHistoryValues}
      />

      {/* 📥 State als Props nach unten */}
      <BasicExerciseInput
        exercise={exercise}
        onUpdate={setExercise}
      />
    </>
  );
}

// 👶 Middle Component (leitet Callback weiter)
function EnhancedExerciseHistoryDialog({ onApplyValues }) {
  return (
    <Dialog>
      {/* 📤 Callback weiterreichen */}
      <EnhancedHistoryTable onApplyValues={onApplyValues} />
    </Dialog>
  );
}

// 👶 Child Component (ruft Callback auf)
function EnhancedHistoryTable({ onApplyValues }) {
  const handleApply = (entry) => {
    // ☎️ Callback aufrufen = Event nach oben
    onApplyValues?.(entry.sets, entry.reps, entry.weight);
  };

  return (
    <Button onClick={() => handleApply(entry)}>
      ✓ Übernehmen
    </Button>
  );
}
```

### 📊 Datenfluss visualisiert

```
EnhancedHistoryTable (Enkel)
    │
    │ 1️⃣ User klickt "Übernehmen"
    │ 2️⃣ onApplyValues(sets, reps, weight) aufrufen
    ↓
EnhancedExerciseHistoryDialog (Kind)
    │
    │ 3️⃣ Callback durchreichen (kein State!)
    ↓
ExerciseItem (Parent) ← 4️⃣ State wird geupdatet
    │
    │ 5️⃣ Neuer State als Props nach unten
    ↓
BasicExerciseInput (Kind) ← 6️⃣ Re-Render mit neuen Werten
```

### 🎯 Warum diese Lösung?

| Aspekt | Begründung |
|--------|------------|
| ✅ **Lifting State Up** | State im Parent (Single Source of Truth) |
| ✅ **Callbacks** | Events nach oben (Child → Parent) |
| ✅ **Props** | Daten nach unten (Parent → Child) |
| ✅ **Einfachheit** | Nur 1 Callback, klar nachvollziehbar |
| ✅ **Type-Safe** | TypeScript prüft Signatur |
| ✅ **Performance** | Kein Context-Overhead |

### 🛠️ Technologie-Stack

| Feature | Technologie |
|---------|-------------|
| **State Management** | `useState` (Parent besitzt State) |
| **Child → Parent** | Callback-Props |
| **Parent → Child** | Props |
| **Hooks** | Keine für Kommunikation nötig! |
| **Pattern** | Lifting State Up + Callback-Props |

### 🔍 Lessons Learned

| Lesson | Beschreibung |
|--------|--------------|
| 📌 **Single Source of Truth** | State im Parent, nicht duplizieren |
| 📌 **Callbacks sind keine State** | Middle-Components leiten nur weiter |
| 📌 **Optional Chaining** | `onApplyValues?.()` verhindert Crashes |
| 📌 **Sync-Fields** | `maxWeight` mit `weight` synchronisieren |

---

## 📚 Best Practices

### 🎯 Die goldene Regel

```
1. Start simple: Props + Callbacks
2. Problem? → Kleinste Lösung wählen
3. Skaliert nicht? → Nächstes Pattern
4. Niemals über-engineeren!
```

### 📊 Pattern-Hierarchie (von einfach zu komplex)

```
1. Props (Parent → Child)
   ↓
2. Callbacks (Child → Parent)
   ↓
3. Lifting State Up (Geschwister)
   ↓
4. Context API (Global, selten geändert)
   ↓
5. Zustand/Redux (später, bei Bedarf)
```

### ✅ Checkliste

| Kategorie | Best Practice |
|-----------|---------------|
| **State** | ✅ Single Source of Truth |
| **State** | ✅ State so lokal wie möglich |
| **Props** | ✅ Destructuring nutzen (`{ name }`) |
| **Callbacks** | ✅ `useCallback` für React.memo-Kinder |
| **Context** | ✅ Context-Splitting (separate Contexts) |
| **Context** | ✅ Nur für globalen State (Theme, User) |
| **Performance** | ✅ React.memo sparsam (nur teure Components) |
| **Cleanup** | ✅ Immer Cleanup bei Subscriptions |

### ❌ Häufige Fehler

| Fehler | Fix |
|--------|-----|
| ❌ Props-Drilling > 3 Levels | → Context API |
| ❌ State in Kindern dupliziert | → Lifting State Up |
| ❌ Context für lokalen State | → Props + Callbacks |
| ❌ Inline-Functions in Props | → useCallback |
| ❌ Vergessene Cleanups | → return () => cleanup |

### 🎓 Lern-Roadmap

#### Woche 1-2: Basics
- ✅ Props (Parent → Child)
- ✅ Callbacks (Child → Parent)
- ✅ Lifting State Up

#### Woche 3-4: Advanced
- ✅ Context API (Theme-Switcher bauen)
- ✅ useCallback + useMemo
- ✅ Performance-Optimierung

---

## 🎯 Zusammenfassung

### Key Takeaways

1. **Props + Callbacks** reichen für die meisten Fälle
2. **Lifting State Up** für Geschwister-Komponenten
3. **Context API** nur für globalen State (Theme, User)
4. **Start simple**, nicht über-engineeren!

### Nächste Schritte

1. ✅ Baue kleine Projekte mit jedem Pattern
2. ✅ Nutze React DevTools zum Debuggen
3. ✅ Lies die offiziellen React Docs
4. ✅ Schaue dir Open-Source-Code an

---

**Erstellt:** 2025-10-02
**Autor:** Josh (Architect)
**Version:** 1.0
**Basis:** Real-World Beispiel aus elevate-me-4.0
