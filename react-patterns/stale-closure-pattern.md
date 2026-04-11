# 🔄 Stale Closure Pattern in React

> **Diese Datei enthält detaillierte Erklärungen zum Stale Closure Problem.**  
> **Kurzversion:** Siehe `CODING-RULES.md` → Regel 7.17

---

## 1. Das Problem

**Stale Closure:** `setState(newValue)` gefolgt von `callback(state)` referenziert den **alten State** (Stale Closure).

```typescript
// ❌ FALSCH - Stale Closure: habits ist noch ALTER State!
setHabits((prev) => prev.map((h) => ...));
onHabitsUpdate?.(habits); // habits = ALTER Wert!
```

### Warum passiert das?

React's `setState` ist asynchron. Wenn du `onHabitsUpdate?.(habits)` direkt nach `setHabits` aufrufst, hat React den State noch nicht aktualisiert. Die Variable `habits` referenziert noch den alten Wert aus dem vorherigen Render-Zyklus.

---

## 2. Die Lösung

**Callback innerhalb `setState` mit neuem State:**

```typescript
// ✅ RICHTIG - Callback innerhalb setHabits mit neuem State
setHabits((prev) => {
  const updatedHabits = prev.map((h) => ...);
  onHabitsUpdate?.(updatedHabits); // ← NEUE Daten!
  return updatedHabits;
});
```

### Alternative: useEffect

```typescript
// ✅ AUCH RICHTIG - useEffect triggered nach State-Update
useEffect(() => {
  onHabitsUpdate?.(habits);
}, [habits, onHabitsUpdate]);
```

**Nachteil:** Zusätzlicher Render-Zyklus

---

## 3. Race-Condition Guard

**Problem:** Bei schnellem Klicken können mehrere Updates parallel laufen.

```typescript
// ✅ RICHTIG - Guard gegen parallel laufende Updates
const [loadingHabitId, setLoadingHabitId] = useState<string | null>(null);

const handleToggle = async (habitId: string) => {
  // Guard: Verhindert doppelte Klicks
  if (loadingHabitId === habitId) return;
  
  setLoadingHabitId(habitId);
  
  try {
    // ... async operation
    setHabits((prev) => {
      const updated = prev.map((h) => ...);
      onHabitsUpdate?.(updated);
      return updated;
    });
  } finally {
    setLoadingHabitId(null);
  }
};
```

---

## 4. Vollständiges Beispiel

```typescript
interface HabitListProps {
  habits: Habit[];
  onHabitsUpdate?: (habits: Habit[]) => void;
}

export function HabitList({ habits: initialHabits, onHabitsUpdate }: HabitListProps) {
  const [habits, setHabits] = useState(initialHabits);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleHabit = async (habitId: string) => {
    // Guard
    if (loadingId === habitId) return;
    setLoadingId(habitId);

    try {
      // Optimistic Update + Callback mit neuen Daten
      setHabits((prev) => {
        const updated = prev.map((habit) =>
          habit.id === habitId
            ? { ...habit, completed: !habit.completed }
            : habit
        );
        
        // ✅ Callback mit NEUEN Daten (nicht stale!)
        onHabitsUpdate?.(updated);
        
        return updated;
      });

      // Server-Call
      await toggleHabitOnServer(habitId);
      
    } catch (error) {
      // Rollback bei Fehler
      setHabits((prev) => {
        const rollback = prev.map((habit) =>
          habit.id === habitId
            ? { ...habit, completed: !habit.completed }
            : habit
        );
        onHabitsUpdate?.(rollback);
        return rollback;
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <ul>
      {habits.map((habit) => (
        <li key={habit.id}>
          <button
            onClick={() => toggleHabit(habit.id)}
            disabled={loadingId === habit.id}
          >
            {habit.name} {habit.completed ? "✅" : "⬜"}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 5. ❌ Anti-Patterns

| Anti-Pattern | Problem | Lösung |
|--------------|---------|--------|
| `setState(); callback(state)` | State ist noch alt | Callback in `setState` |
| `await setState()` | setState ist nicht await-bar | useEffect oder Callback |
| Kein Loading-Guard | Race Conditions | `loadingId` State |
| Direktes State-Mutieren | React sieht keine Änderung | Immer neue Referenz erstellen |

---

## 6. Wann ist das relevant?

- ✅ **Optimistic UI Updates** mit Parent-Callbacks
- ✅ **Form-Submissions** mit externen Handlern
- ✅ **Cross-Component Updates** via Events
- ✅ **Schnell klickbare UI-Elemente** (Toggle-Buttons, Checkboxes)

---

**🔗 Zurück zu:** `shared-docs/CODING-RULES.md` → Regel 7.17  
**🔗 Siehe auch:** `shared-docs/react-core-communication-patterns.md`
