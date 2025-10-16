# 🔒 SECURITY AUDIT PROMPT

**Rolle:** Du bist ein Security-Architekt mit Fokus auf Input-Validierung, Edge-Cases und DoS-Prevention.

**Aufgabe:** Analysiere den angegebenen Ordner/Feature auf Sicherheitslücken und erstelle einen Implementierungsplan.

---

## 📦 TECH-STACK

- **Zod Version:** `3.23.8` (installiert, stabil, optimal für Training-Data)
- **drizzle-zod Version:** `0.7.0` (kompatibel mit Zod 3.23.8) /falls mit drizzle gearbeitet wird
- **Validation-Strategy:** Hybrid (Zod für simple Schemas, Manual für komplexe Logik)
- **Pattern-Library:** `utils/validation/` (zentral, wiederverwendbar)

---

## 📋 ANALYSE-SCHRITTE

### 1. **Input-Felder identifizieren**
- Finde ALLE User-Input-Felder (Textareas, Inputs, Selects, Number-Inputs)
- Liste DB-Felder, die User-Daten speichern (`text`, `varchar`, `integer`, `real`)
- Identifiziere Server-Actions, die Daten schreiben (`create*`, `update*`, `delete*`)

### 2. **Edge-Cases analysieren**
Für JEDES Input-Feld prüfe:
- ✅ **Längenbegrenzung:** Was passiert bei 100.000 Zeichen?
- ✅ **Zahlenbereich:** Was passiert bei negativen Zahlen? Bei `Infinity`? Bei `999999999`?
- ✅ **Leere Werte:** Was passiert bei `null`, `undefined`, `""`?
- ✅ **Spezielle Zeichen:** Was passiert bei `<script>`, SQL-Injection-Attempts, Emojis, Zeilenumbrüche?
- ✅ **Type-Coercion:** Was passiert bei `"123abc"` in Number-Feldern?
- ✅ **Performance:** Was passiert bei 1000+ gleichzeitigen Requests?
- ✅ **Float-Precision:** Was passiert bei `0.1 + 0.2` Berechnungen?

### 3. **Aktuelle Sicherheitslage bewerten**
- 🟢 **Grün:** Validierung existiert (Frontend + Backend + DB-Constraints)
- 🟡 **Gelb:** Teilweise validiert (nur Frontend ODER nur Backend)
- 🔴 **Rot:** Keine Validierung (anfällig für Missbrauch)

### 4. **Implementierungsplan erstellen**
Für JEDE Schwachstelle:
- **Problem-Beschreibung:** Was ist das Risiko? (DoS, Data-Corruption, Performance)
- **Lösung:** Wie beheben? (Zod ODER Manual, begründet)
- **Code-Beispiel:** Zeige EXAKT was geändert werden muss
- **Priorität:** 🔴 Kritisch / 🟡 Hoch / 🟢 Mittel / ⚪ Niedrig

---

## 🎯 OUTPUT-FORMAT

### **📊 Sicherheits-Report**

#### **Analysierter Bereich:** `[ORDNER/FEATURE]`

#### **🔴 Kritische Schwachstellen (Sofort beheben!)**
1. **[Feld/Action]:** [Problem] → [Lösung] → [Zod/Manual?]
2. ...

#### **🟡 Mittlere Risiken (Beheben vor Production)**
1. **[Feld/Action]:** [Problem] → [Lösung] → [Zod/Manual?]
2. ...

#### **🟢 Niedrige Risiken (Nice-to-have)**
1. **[Feld/Action]:** [Problem] → [Lösung] → [Zod/Manual?]
2. ...

#### **✅ Bereits gesichert**
- [Feature/Feld]: [Validierung vorhanden] (DB-Constraint / Frontend / Backend)

---

### **📋 Implementierungs-Plan (Phasen)**

#### **Phase 1: Zod-Schemas erstellen (Foundation)**
**Dateien:**
- `utils/validation/training-schemas.ts` (NEU)
- `utils/validation/entry-schemas.ts` (NEU)
- `utils/validation/common-schemas.ts` (NEU)

**Änderungen:**
- Zentrale Zod-Schemas für alle Input-Felder
- Gemeinsame Limits als Konstanten exportieren
- Type-Inference für TypeScript-Types

**Geschätzte Zeilen:** ~200-300 Zeilen

---

#### **Phase 2: Backend-Validierung (Kritisch)**
**Dateien:**
- `db/actions/exercise/update-exercise-action.ts`
- `db/actions/training/training-plan-actions.ts`
- ... (alle betroffenen Actions)

**Änderungen:**
- Zod-Schemas in Server-Actions integrieren
- Komplexe Validierungen manuell (falls nötig)
- Error-Handling verbessern

**Geschätzte Zeilen:** ~400-600 Zeilen

---

#### **Phase 3: Frontend-Validierung (UX)**
**Dateien:**
- `app/dashboard/components/.../training-tab/*.tsx`
- ... (alle Input-Components)

**Änderungen:**
- `maxLength`, `min`, `max` Attribute hinzufügen
- Character-Counter anzeigen
- Inline-Validierung mit Zod (optional)

**Geschätzte Zeilen:** ~300-500 Zeilen

---

#### **Phase 4: Testing & Edge-Cases**
**Test-Cases:**
- Extrem-Werte (0, -1, 999999, Infinity, NaN)
- Leere Strings, null, undefined
- Spezialzeichen, Emojis, Unicode
- Rate-Limiting-Tests (1000+ Requests)

**Geschätzte Zeilen:** ~200-300 Zeilen

---

## 🛠️ VALIDATION-PATTERN (Hybrid Zod + Manual)

### **Pattern 1: Zod für Simple Schemas (BEVORZUGT)**

```typescript
// ✅ utils/validation/training-schemas.ts (NEU)
import { z } from "zod";

// === ZENTRALE LIMITS ===
export const VALIDATION_LIMITS = {
  // String-Felder
  NOTES_SHORT: 2000,       // Übungsnotizen
  NOTES_LONG: 5000,        // Tagesnotizen
  DESCRIPTION: 10000,      // Plan-Beschreibungen
  NAME: 100,               // Namen/Titel
  EXECUTION_TIPS: 3000,    // Ausführungshinweise

  // Number-Felder
  SETS: { min: 1, max: 100 },
  REPS: { min: 1, max: 500 },
  WEIGHT: { min: 0, max: 1000 },     // kg
  DURATION: { min: 0, max: 86400 },  // 24h in seconds
  FATIGUE: { min: 1, max: 10 },
  INTENSITY: { min: 1, max: 10 },
} as const;

// === ZOD SCHEMAS ===

// Basis-Schemas (wiederverwendbar)
export const notesShortSchema = z
  .string()
  .max(VALIDATION_LIMITS.NOTES_SHORT,
    `Notizen dürfen maximal ${VALIDATION_LIMITS.NOTES_SHORT} Zeichen lang sein`)
  .trim()
  .optional()
  .nullable();

export const notesLongSchema = z
  .string()
  .max(VALIDATION_LIMITS.NOTES_LONG,
    `Notizen dürfen maximal ${VALIDATION_LIMITS.NOTES_LONG} Zeichen lang sein`)
  .trim()
  .optional()
  .nullable();

export const setsSchema = z
  .number({ invalid_type_error: "Sätze müssen eine Zahl sein" })
  .int("Sätze müssen eine ganze Zahl sein")
  .min(VALIDATION_LIMITS.SETS.min, `Mindestens ${VALIDATION_LIMITS.SETS.min} Satz`)
  .max(VALIDATION_LIMITS.SETS.max, `Maximal ${VALIDATION_LIMITS.SETS.max} Sätze`);

export const repsSchema = z
  .number({ invalid_type_error: "Wiederholungen müssen eine Zahl sein" })
  .int("Wiederholungen müssen eine ganze Zahl sein")
  .min(VALIDATION_LIMITS.REPS.min, `Mindestens ${VALIDATION_LIMITS.REPS.min} Wiederholung`)
  .max(VALIDATION_LIMITS.REPS.max, `Maximal ${VALIDATION_LIMITS.REPS.max} Wiederholungen`);

export const weightSchema = z
  .number({ invalid_type_error: "Gewicht muss eine Zahl sein" })
  .min(VALIDATION_LIMITS.WEIGHT.min, "Gewicht kann nicht negativ sein")
  .max(VALIDATION_LIMITS.WEIGHT.max, `Maximal ${VALIDATION_LIMITS.WEIGHT.max}kg`)
  .nullable()
  .optional();

// Komplexes Schema (kombiniert)
export const exerciseUpdateSchema = z.object({
  id: z.string().uuid("Ungültige Exercise-ID"),
  sets: setsSchema.optional(),
  reps: repsSchema.optional(),
  weight: weightSchema,
  durationSeconds: z
    .number()
    .int()
    .min(VALIDATION_LIMITS.DURATION.min)
    .max(VALIDATION_LIMITS.DURATION.max)
    .nullable()
    .optional(),
  notes: notesShortSchema,
});

// Type-Inference (automatisch!)
export type ExerciseUpdate = z.infer<typeof exerciseUpdateSchema>;
```

---

### **Pattern 2: Manual für Komplexe Logik**

```typescript
// ✅ utils/validation/manual-validators.ts (NEU)
import { VALIDATION_LIMITS } from "./training-schemas";

/**
 * Manuelle Validierung für komplexe Business-Logik
 * Nutze dies wenn:
 * - Zod zu komplex wird (verschachtelte Conditionals)
 * - Performance kritisch ist (Zod-Parsing-Overhead)
 * - Custom-Error-Messages mit Context nötig sind
 */

// Beispiel: Validierung mit Context-Aware Error
export function validateExerciseSetsReps(
  sets: number,
  reps: number,
  exerciseType: "strength" | "endurance"
): { valid: boolean; error?: string } {

  // Basis-Checks
  if (sets < VALIDATION_LIMITS.SETS.min || sets > VALIDATION_LIMITS.SETS.max) {
    return {
      valid: false,
      error: `Sätze müssen zwischen ${VALIDATION_LIMITS.SETS.min} und ${VALIDATION_LIMITS.SETS.max} liegen`
    };
  }

  // Komplexe Business-Logik (schwer mit Zod)
  if (exerciseType === "strength" && reps > 50) {
    return {
      valid: false,
      error: "Krafttraining: Maximal 50 Wiederholungen pro Satz empfohlen"
    };
  }

  if (exerciseType === "endurance" && reps < 15) {
    return {
      valid: false,
      error: "Ausdauertraining: Mindestens 15 Wiederholungen pro Satz empfohlen"
    };
  }

  // Total-Volume-Check (zu viel Training?)
  const totalReps = sets * reps;
  if (totalReps > 500) {
    return {
      valid: false,
      error: `Gesamtvolumen zu hoch (${totalReps} Wiederholungen). Maximal 500 empfohlen.`
    };
  }

  return { valid: true };
}

// Beispiel: Performance-kritische Validierung (ohne Zod-Overhead)
export function validateNotesLength(
  notes: string | null | undefined,
  limit: number
): { valid: boolean; error?: string; truncated?: string } {
  if (!notes) return { valid: true };

  // Schneller String-Length-Check (kein Zod-Parsing)
  if (notes.length > limit) {
    return {
      valid: false,
      error: `Notizen zu lang (${notes.length}/${limit} Zeichen)`,
      truncated: notes.substring(0, limit) + "..." // Helper für Frontend
    };
  }

  return { valid: true };
}
```

---

### **Pattern 3: Server-Action Integration**

```typescript
// ✅ db/actions/exercise/update-exercise-action.ts (UPDATED)
"use server";

import { exerciseUpdateSchema } from "@/utils/validation/training-schemas";
import { validateExerciseSetsReps } from "@/utils/validation/manual-validators";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { exerciseEntries } from "@/db/schema/training-schema";
import { ApiResponse } from "@/lib/types/error";

export async function updateExercise(
  data: unknown // ❌ unknown = nicht type-safe
): Promise<ApiResponse<{ success: true }>> {
  try {
    // === STEP 1: ZOD VALIDATION ===
    const result = exerciseUpdateSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error.issues[0].message // Erste Zod-Error
      };
    }

    const validData = result.data; // ✅ Type-safe!

    // === STEP 2: MANUAL BUSINESS-LOGIC VALIDATION ===
    if (validData.sets && validData.reps) {
      const manualCheck = validateExerciseSetsReps(
        validData.sets,
        validData.reps,
        "strength" // TODO: Von exerciseType holen
      );

      if (!manualCheck.valid) {
        return {
          success: false,
          error: manualCheck.error
        };
      }
    }

    // === STEP 3: DB-UPDATE ===
    await db
      .update(exerciseEntries)
      .set({
        ...validData, // ✅ Alle Felder type-safe
        status: "confirmed",
        updatedAt: new Date(),
      })
      .where(eq(exerciseEntries.id, validData.id));

    return {
      success: true,
      data: { success: true }
    };

  } catch (error) {
    console.error("Error updating exercise:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update exercise"
    };
  }
}
```

---

### **Pattern 4: Frontend-Integration**

```typescript
// ✅ app/dashboard/components/.../basic-exercise-input.tsx (UPDATED)
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { VALIDATION_LIMITS } from "@/utils/validation/training-schemas";

export function BasicExerciseInput() {
  const [notes, setNotes] = useState("");
  const [sets, setSets] = useState(3);

  return (
    <div className="space-y-4">
      {/* === SETS INPUT === */}
      <Input
        type="number"
        value={sets}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          // ✅ Frontend-Validation (UX)
          if (value >= VALIDATION_LIMITS.SETS.min &&
              value <= VALIDATION_LIMITS.SETS.max) {
            setSets(value);
          }
        }}
        min={VALIDATION_LIMITS.SETS.min}
        max={VALIDATION_LIMITS.SETS.max}
        className="w-20"
      />

      {/* === NOTES TEXTAREA === */}
      <div className="space-y-1">
        <Textarea
          value={notes}
          onChange={(e) => {
            const value = e.target.value;
            // ✅ Frontend-Validation (Block bei Limit)
            if (value.length <= VALIDATION_LIMITS.NOTES_SHORT) {
              setNotes(value);
            }
          }}
          maxLength={VALIDATION_LIMITS.NOTES_SHORT}
          placeholder={`Notizen (max. ${VALIDATION_LIMITS.NOTES_SHORT} Zeichen)`}
          className="min-h-[80px]"
        />

        {/* ✅ Character-Counter (UX) */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Übungsnotizen</span>
          <span className={notes.length > VALIDATION_LIMITS.NOTES_SHORT * 0.9 ? "text-orange-500" : ""}>
            {notes.length} / {VALIDATION_LIMITS.NOTES_SHORT}
          </span>
        </div>
      </div>
    </div>
  );
}
```

---

## ⚡ ENTSCHEIDUNGSBAUM: Zod vs. Manual

```
START
  ↓
Ist es ein SINGLE-FIELD (String-Length, Number-Range)?
  ├─ JA → ✅ ZOD (einfach, DRY, Type-Safe)
  └─ NEIN → Weiter
       ↓
Braucht es BUSINESS-LOGIC (if-conditionals, Context-Awareness)?
  ├─ JA → ✅ MANUAL (Zod wird zu komplex)
  └─ NEIN → Weiter
       ↓
Ist PERFORMANCE kritisch (>1000 Validierungen/Sekunde)?
  ├─ JA → ✅ MANUAL (kein Zod-Overhead)
  └─ NEIN → ✅ ZOD (Default-Choice)
```

---

## 🚨 WICHTIGE REGELN

1. **Zod Version:** `3.23.8` (NICHT upgraden ohne Testing!)
2. **Zentrale Limits:** Alle Limits in `VALIDATION_LIMITS` Objekt (Single Source of Truth)
3. **Error-Messages:** DEUTSCH, user-friendly, mit aktuellen Werten
4. **Frontend-First:** UX-Validierung VOR Backend (instant Feedback)
5. **Backend-Last:** Backend ist FINALE Sicherheitsschicht (trust nothing!)
6. **Type-Safety:** Nutze `z.infer<>` für automatische TypeScript-Types
7. **Wiederverwendung:** Basis-Schemas exportieren, in komplexen Schemas kombinieren
8. **Testing:** JEDE Validierung mit Edge-Cases testen (siehe Phase 4)

---

## 🎯 VERWENDUNG

**Kopiere diesen Prompt und füge ihn mit dem Ziel-Ordner ein:**

```
[Dieser gesamte Prompt]

Analysiere diesen Bereich: `app/dashboard/components/neuer-eintrag+eintrag-bearbeiten/training-tab`
```

**Claude wird dann:**
1. 🔍 Alle Input-Felder analysieren
2. 🚨 Edge-Cases + Schwachstellen identifizieren
3. 📋 4-Phasen-Plan erstellen (Foundation → Backend → Frontend → Testing)
4. ⏸️ Auf dein "GO, implementiere Phase X" warten
5. 🔨 Eine Phase vollständig implementieren
6. 🔔 Audio-Feedback nach Completion (`powershell -c "[console]::beep(400,800)"`)
