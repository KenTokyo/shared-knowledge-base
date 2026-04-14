# 🔍 Quiz-Modi Ist-Zustand Analyse & Masterplan

**Datum:** 2026-04-13
**Orchestrator-Run:** orch-run-mnxkl0p8-ycpxqr

---

## 📊 Ist-Zustand: Was existiert bereits

### ✅ Typ-System — 100% vollständig

Alle 10 Quiz-Modi haben **vollständige TypeScript-Interfaces**:

| Datei | Inhalt |
|-------|--------|
| `src/types/quizValidation.ts` | 10 discriminated union interfaces (`SingleChoiceItem` bis `CategorySortItem`) |
| `src/types/quizRuntime.ts` | `ActiveQuestionState` mit mode-spezifischen Feldern (`selectedChoiceIds`, `filledBlanks`, `orderedStepIds`, `linkedPairs`, `eliminatedChoiceIds`, `hotspotTargetId`, `sortedTokenIds`) |
| `src/types/quizSettings.ts` | `QuizSettings`, `PlayerProgress`, Unlock-Requirements, Display-Namen, Icons, Beschreibungen für alle 10 Modi |

### ✅ Validierung — 100% vollständig

`src/data/quiz/validators.ts` enthält mode-spezifische Validierungslogik für alle 10 Modi mit Fehler/Warnung-Schweregraden.

### ✅ Pipeline & Scheduler — funktionsfähig

| Komponente | Status | Anmerkung |
|-----------|--------|-----------|
| `questionPipeline.ts` | ✅ | Normalisiert Legacy + QuizPack → `PipelineQuestion`. Mode-Aliase, Difficulty, Humor-Antworten |
| `schedulers.ts` | ✅ | `scheduleNextQuestion` mit Rotation, Boss-Filter, Difficulty-Scoring |
| `loader.ts` | ✅ | `convertLegacyToQuizPack()` konvertiert Alt-Format |

### ⚠️ Pipeline-Lücken bei 3 Modi

`PipelineQuestion` flattet alle Modi zu `answers[] + correctIndex/correctIndices`. Bei diesen Modi geht mode-spezifische Info verloren:

| Modus | Was geht verloren? | Impact |
|-------|-------------------|--------|
| `hotspot` | Koordinaten/Shapes → nur Platzhalter-Text "Richtiger Bereich" | Hoch — komplett unspielbar |
| `numeric_range` | exacte Min/Max → nur Text-Bereichswerte | Mittel — als Choice spielbar |
| `category_sort` | Token→Kategorie-Zuordnung → nur Kategorie-Namen | Hoch — Sortier-Logik fehlt |

---

## 🔴 Die 4 großen Lücken

### Lücke 1: BossQuizWorld konvertiert ALLES zu single_choice

**Datei:** `src/components/boss/BossQuizWorld.tsx:15-32`

```typescript
const convertQuestionToQuizItem = (question, questionIndex, totalQuestions): SingleChoiceItem => {
  return {
    mode: 'single_choice',  // ← IMMER single_choice!
    ...
  };
};
```

**Impact:** Die Boss-Phase nutzt **nie** die mode-spezifischen Renderer, selbst wenn die Frage z.B. `multi_select` oder `elimination` ist. Alle Boss-Fragen werden als Single Choice gespielt.

### Lücke 2: Answer Checking ist fast nur single_choice

**Datei:** `src/store/gameStore.ts:536-648`

Die `answerQuestion`-Logik behandelt:
- **single_choice:** Korrekt ✅ — `correctIndex` Check
- **multi_select:** Korrekt ✅ — Progressive Auswahl, `selectedChoiceIds`, PARTIAL-Status
- **Alle anderen Modi:** Fallback auf `correctIndex` ❌ — Kein mode-spezifischer Check

Konkret: `fill_blank` prüft nicht ob Lücken korrekt gefüllt sind, `sequence` prüft nicht die Reihenfolge, `match_pairs` prüft nicht ob Paare korrekt verknüpft sind, etc.

### Lücke 3: 3D-Arena hat keine mode-spezifische Visualisierung

**Datei:** `src/components/AnswerNode.tsx`, `src/components/Game.tsx:380-389`

Alle Antworten werden als **identische Orbs** gerendert — Octahedron + Torus + Text-Panel.
Einzige mode-spezifische Logik: `isSelectedMultiChoice` für Cyan-Markierung bei Multi-Select.

Keine visuelle Unterscheidung für:
- `fill_blank` → sollte Lückentext + Token-Bank zeigen
- `sequence` → sollte nummerierte Schritte zeigen
- `match_pairs` → sollte linke/rechte Seite + Beam-Verbindung zeigen
- `elimination` → sollte "falsche abschießen"-Mechanik zeigen
- `hotspot` → sollte Bild/Diagramm mit Zielbereichen zeigen
- `numeric_range` → sollte Zahlenkorridor zeigen
- `category_sort` → sollte Zonen/Buckets zeigen

### Lücke 4: Boss-UI fehlt für 4 Modi + 2 sind defekt

| Boss-Renderer | Status | Problem |
|--------------|--------|---------|
| `BossSingleChoiceRenderer` | ✅ Komplett | — |
| `BossMultiSelectRenderer` | ✅ Komplett | — |
| `BossTrueFalseRenderer` | ✅ Komplett | — |
| `BossFillBlankRenderer` | ⚠️ Stub | Kein Text-Eingabe-Mechanismus, zeigt nur Platzhalter |
| `BossSequenceRenderer` | ✅ Komplett | — |
| `BossEliminationRenderer` | ⚠️ Bug | `correctRemaining`-Filterlogik fehlerhaft (Zeilen 23-26) |
| `match_pairs` | ❌ Fehlt | Fällt auf BossSingleChoiceRenderer zurück |
| `hotspot` | ❌ Fehlt | Fällt auf BossSingleChoiceRenderer zurück |
| `category_sort` | ❌ Fehlt | Fällt auf BossSingleChoiceRenderer zurück |
| `numeric_range` | ❌ Fehlt | Fällt auf BossSingleChoiceRenderer zurück |

**Zusätzlich:** `BossQuizRenderer.tsx` hat `match_pairs` nicht im `switch`-Case (Zeile 22-40), obwohl `isBossCompatible` es ohnehin ausschließt. Aber `hotspot`, `category_sort`, `numeric_range` fallen auf den `default`-Fall zurück.

---

## 📊 Quiz-Daten: Stark unausgewogen

| Modus | Frageanzahl | Datenqualität |
|-------|:-----------:|:-------------:|
| `single_choice` | **61** | ✅ Solide |
| `multi_select` | 1 | ⚠️ Minimal |
| `true_false` | 1 | ⚠️ Minimal |
| `fill_blank` | 2 | ⚠️ Minimal |
| `sequence` | 1 | ⚠️ Minimal |
| `match_pairs` | 2 | ⚠️ Minimal |
| `elimination` | 1 | ⚠️ Minimal |
| `hotspot` | 0 | ❌ Keine |
| `numeric_range` | 0 | ❌ Keine |
| `category_sort` | 0 | ❌ Keine |

**5 von 5 Legacy-Kataloge** nutzen das alte Format (`correctIndex` → nur Single Choice).
Nur `quiz_elliott_wave_advanced.json` hat neue Modi.

---

## 🎯 Masterplan: Modi schrittweise spielbar machen

### Phase 1 — Kritische Bugs fixen & BossQuizWorld reparieren

**Ziel:**Boss-Phase funktioniert korrekt mit allen bereits implementierten Modi.

| # | Aufgabe | Was gemacht wird | Risiko |
|---|---------|-----------------|--------|
| 1.1 | **BossQuizWorld: Mode erhalten** | `convertQuestionToQuizItem` muss den echten Mode erhalten, nicht `single_choice` hardcodieren. QuizItem aus dem Pipeline-kontext laden statt konvertieren. | Mittel — BossQuizRenderer-Props müssen angepasst werden |
| 1.2 | **answerQuestion: Mode-spezifische Checks** | Switch-Case für `fill_blank`, `sequence`, `match_pairs`, `elimination`, `true_false` implementieren. Jeder Mode bekommt eigene Korrektur-Logik. | Mittel — gameStore wird komplexer |
| 1.3 | **BossEliminationRenderer Bug fixen** | `correctRemaining`-Filterlogik reparieren. Aktuell wird `findIndex` auf demselben Array falsch angewendet. | Niedrig |
| 1.4 | **BossFillBlankRenderer: Text-Eingabe** | Tastatur-Eingabe für Lücken implementieren (statt nur Anzeige). | Mittel — 3D-Text-Eingabe ist tricky |

**Risiko:** Mittleres Refactoring-Risiko, da gameStore und BossQuizWorld zentrale Komponenten sind.
**Check:** Boss-Phase mit multi_select, fill_blank, sequence, elimination spielen → korrektes Rendering + Antwort-Check.

---

### Phase 2 — Die "Big 3" im Arena-Modus spielbar machen

**Ziel:** Multi Select, Fill Blank und Match Pairs funktionieren **visuell unterschiedlich** in der 3D-Arena.

| # | Aufgabe | Was gemacht wird | Risiko |
|---|---------|-----------------|--------|
| 2.1 | **ModeContext für Arena-Rendering** | Neuer Context/Hook, der den aktuellen Quiz-Mode + die mode-spezifischen Daten (blanks, pairs, sequence steps) an AnswerNode/Game.tsx weitergibt. | Niedrig |
| 2.2 | **Multi Select Arena-Visualisierung** | Bereits teilweise da (`isSelectedMultiChoice`). Cyan-Markierung + Fortschrittsanzeige (X von Y korrekt) im HUD ergänzen. | Niedrig |
| 2.3 | **Fill Blank Arena-Visualisierung** | Neuer Renderer: Lückentext als großes Panel im Himmel + schwebende Token-Orbs zum Abschießen. Geschossene Token fliegen in die Lücke. | Hoch — Neues 3D-Layout |
| 2.4 | **Match Pairs Arena-Visualisierung** | Neuer Renderer: Linke Seite + rechte Seite. Spieler schießt erst ein linke ORB, dann das korrekte rechte Gegenstück. Beam-Verbindung bei Treffer. | Hoch — Komplexe Interaktion |
| 2.5 | **Mode-spezifische HUD-Elemente** | fill_blank zeigt "Lücke 1/2", match_pairs zeigt "Verbinde Paare", etc. Als kleine Mode-Hint-Komponente. | Niedrig |

**Risiko:** Hoch bei 2.3 und 2.4, da komplett neue 3D-Interaktionsmuster gebaut werden müssen.
**Check:** Im Arena-Modus eine fill_blank-Frage spielen → Lückentext + Token-Orbs sichtbar. Korrekte Treffer fliegen in Lücke.

---

### Phase 3 — Sequence, Elimination, True/False in der Arena

**Ziel:** 3 weitere Modi sind visuell und spielerisch in der Arena unterscheidbar.

| # | Aufgabe | Was gemacht wird | Risiko |
|---|---------|-----------------|--------|
| 3.1 | **Sequence Arena-Visualisierung** | Nummerierte Orbs (1→2→3→4). Spieler muss in Reihenfolge schießen. Falsche Reihenfolge = roter Blitz + HP-Schaden. Reihenfolge-Pfeile zwischen den Orbs. | Mittel |
| 3.2 | **Elimination Arena-Visualisierung** | Alle Orbs schweben. Spieler schießt die FALSCHEN Orbs ab. Korrekte Orbs sind unverwundbar (blauer Schild-Effekt). Falsche explodieren grün. Letzter korrekter Orb bleibt stehen → Frage gelöst. | Mittel |
| 3.3 | **True/False Arena-Visualisierung** | Nur 2 große Orbs: WAHR (grün leuchtend) und FALSCH (rot leuchtend). Größere Orb-Geometrie, mehr Glow-Effekt. | Niedrig |
| 3.4 | **Mode-spezifische Answer-Checking in Arena** | fill_blank: Token-Treffer → Lücke füllen (nicht correctIndex). Sequence: Reihenfolge prüfen. Elimination: shouldEliminate-Check. | Mittel |

**Risiko:** Mittel — Sequence und Elimination bauen auf Phase 2 auf (ModeContext). True/False ist simpel.
**Check:** Sequence-Frage spielen → nummerierte Orbs, Reihenfolge-Check funktioniert.

---

### Phase 4 — Spielintern: Boss-Renderer für fehlende Modi ✅

**Ziel:** Alle Modi, die `isBossCompatible` erlauben, haben eigene Boss-Renderer.

| # | Aufgabe | Was gemacht wird | Status |
|---|---------|-----------------|--------|
| 4.1 | **BossMatchPairsRenderer** | Linke/rechte Spalte. Spieler klickt links, dann rechts → Paar-Verbindung. Visuelle Beam-Linie (Line-Komponente). | ✅ Koplett |
| 4.2 | **BossNumericRangeRenderer** | Tastatur-UI für Min/Max-Eingabe mit TAB-Feldwechsel. Zeigt Zahlenbereich visuell. | ✅ Komplett |
| 4.3 | **BossCategorySortRenderer** | Klick-basiertes Sortieren: Token klicken → Kategorie klicken. Reset-Button bei Fehlern. | ✅ Komplett |
| 4.4 | **BossHotspotRenderer** | 3D-Plane mit klickbaren Hotspot-Zonen (circle/rect/polygon).Bestätigungs-Button nach Auswahl. | ✅ Komplett |
| 4.5 | **BossQuizRenderer Switch-Case erweitert** | Alle 10 Modi im Dispatcher registriert. | ✅ Komplett |
| 4.6 | **BossQuizWorld: Konvertierung + Validierung** | `convertQuestionToQuizItem` und `validateBossAnswer` um 4 neue Modi erweitert (match_pairs, numeric_range, category_sort, hotspot). | ✅ Komplett |
| 4.7 | **isBossCompatible aktualisiert** | `match_pairs`, `hotspot`, `category_sort`, `numeric_range` sind jetzt `bossCompatible = true`. | ✅ Komplett |

**Hinweis:** `isBossCompatible` ist jetzt für alle Modi aktiv.
**Risiko:** Mittel-Hoch — Category Sort und Hotspot nutzen Klick-Interaktion statt Drag, was die 3D-Komplexität reduziert.
**Check:** ✅ `npx tsc --noEmit` — 0 Fehler.

---

### Phase 5 — Quiz-Daten: Generator & Katalog-Erweiterung ✅

**Ziel:** Ausreichend Fragendaten in verschiedenen Modi, damit der Modus-Scheduler sie nutzen kann.

| # | Aufgabe | Was gemacht wird | Status |
|---|---------|-----------------|--------|
| 5.1 | **Legacy-Konverter erweitern** | `convertLegacyToQuizPack` erweitern + `generateQuizVariants` in questionPipeline.ts | ✅ |
| 5.2 | **Quiz-Prompt-Generator** | `generateTrueFalseVariant`, `generateMultiSelectVariant`, `generateFillBlankVariant` in questionPipeline.ts | ✅ |
| 5.3 | **Mindestens 5 Fragen pro Modus** | quiz_elliott_wave_advanced.json: Alle 10 Modi haben ≥5 Fragen (56 total) | ✅ |
| 5.4 | **Hotspot, NumericRange, CategorySort Beispieldaten** | 5 Fragen pro Modus in quiz_elliott_wave_advanced.json, ensureModeDiversity() in gameStore | ✅ |

**Risiko:** Niedrig — Daten-Pflege, keine Code-Änderung.
**Check:** ✅ `npx tsc --noEmit` — 0 Fehler. Quiz-Scheduler rotiert durch alle Modi. Jeder Modus hat ≥5 Fragen.

---

### Phase 6 — Pipeline & Hotspot/NumericRange/CategorySort ✅

**Ziel:** Die 3 "schwierigen" Modi verlieren nicht mehr ihre mode-spezifischen Daten in der Pipeline.

| # | Aufgabe | Was gemacht wird | Status |
|---|---------|-----------------|--------|
| 6.1 | **PipelineQuestion erweitern** | Mode-spezifische Datenfelder: `fillBlankData`, `matchPairData`, `sequenceData`, `categorySortData`, `hotspotData`, `numericRangeData` | ✅ |
| 6.2 | **questionPipeline: Mode-Daten durchreichen** | `normalizeQuizItemToQuestion` bewahrt alle mode-spezifischen Daten für numeric_range, category_sort, hotspot, match_pairs, fill_blank, sequence | ✅ |
| 6.3 | **BossQuizWorld: Rich Data nutzen** | Konvertierung nutzt Pipeline-Daten (matchPairData, numericRangeData, categorySortData, hotspotData) für korrekte BossQuizItem-Erstellung | ✅ |
| 6.4 | **gameStore: Mode-spezifische Checks** | match_pairs, fill_blank, sequence, elimination — alle mit mode-spezifischer Antwortlogik in `answerQuestion` | ✅ |

**Risiko:** Mittel — PipelineQuestion-Erweiterung muss rückwärtskompatibel bleiben.
**Check:** ✅ `npx tsc --noEmit` — 0 Fehler. Alle Modi bewahren mode-spezifische Daten durch die Pipeline.

---

## 📋 Zusammenfassung: Aktueller Stand (nach Phase 1, 4, 5, 6)

| Komponente | single | multi | true_false | fill_blank | sequence | match_pairs | elimination | hotspot | numeric_range | category_sort |
|-----------|:------:|:-----:|:----------:|:----------:|:--------:|:-----------:|:-----------:|:------:|:------------:|:-------------:|
| **Typen** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Validierung** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Pipeline** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Scheduler** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Answer Check** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌¹ | ❌¹ | ❌¹ |
| **Boss-Renderer** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Boss-Validierung** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Arena-3D** | ✅ | ⚠️² | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Quiz-Daten** | 11 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 |

¹ hotspot, numeric_range, category_sort — Arena-spezifische Answer-Checks fehlen (nur Boss-Phase nutzt BossQuizWorld.validateBossAnswer)
² multi_select — Basis vorhanden, braucht HUD-Fortschrittsanzeige

---

## Kommentare

### Phase 1
**Eingehalten:** Architektur-Check ✅, Edge-Cases betrachtet ✅, Bug-Fixes priorisiert ✅
**Auffälligkeiten:**
1. 🔴 **Kritisch:** BossQuizWorld hardcodiert `single_choice` — muss als Erstes gefixt werden, sonst werden alle Boss-Modi-Renderer nie aktiviert
2. 🟠 **Hoch:** gameStore answerQuestion hat nur single_choice + multi_select Logik — andere Modi haben keine korrekte Antwort-Prüfung

### Phase 2
**Eingehalten:** Modulare Erweiterung ✅, ModeContext als Lösung ✅, HUD-Ergänzungen ✅
**Auffälligkeiten:**
1. 🟠 **Hoch:** Fill Blank und Match Pairs brauchen komplett neue 3D-Interaktionsmuster — deutlich mehr Aufwand als True/False oder Multi Select
2. 🟡 **Mittel:** Match Pairs in der Arena braucht 2-Schritt-Interaktion (erst links, dann rechts schießen) — muss im AnswerNode neue State-Maschine einführen

### Phase 3
**Eingehalten:** Baut auf Phase 2 auf ✅, Edge-Cases (falsche Reihenfolge, etc.) ✅
**Auffälligkeiten:**
1. 🟡 **Mittel:** Sequence-Reihenfolge im 3D muss new State (`sequenceStepIndex`) im gameStore einführen

### Phase 4
**Eingehalten:** Boss-Renderer für alle Modi ✅, isBossCompatible-Update ✅, TypeScript 0 Fehler ✅
**Auffälligkeiten:**
1. 🟡 **Mittel:** Category Sort und Hotspot nutzen Klick-Interaktion statt Drag-and-Drop — in 3D simpler und robuster, aber weniger intuitiv als 2D-Drag.
2. 💡 **Vorschlag:** Für komplexe Boss-Modi (insb. Hotspot mit echten Bild-Daten) könnte ein 2D-Overlay (HTML/CSS) sinnvoller sein als reines 3D-Rendering.

### Phase 5 ✅
**Eingehalten:** Generator ✅, Datenmenge erreicht ✅, Alle Modi ≥5 Fragen ✅, TypeScript 0 Fehler ✅
**Auffälligkeiten:**
1. 🟢 **Niedrig:** Daten-Pflege, kein hohes Risiko
2. 💡 **Hinweis:** `ensureModeDiversity()` generiert automatisch Varianten (true_false, multi_select, fill_blank) wenn ein Modus <3 Fragen hat

### Phase 6 ✅
**Eingehalten:** Pipeline-Erweiterung ✅, Backward-Kompatibilität ✅, BossQuizWorld nutzt Rich Data ✅, TypeScript 0 Fehler ✅
**Auffälligkeiten:**
1. 🟡 **Mittel:** `gameStore.ts` ist 1638 Zeilen — deutlich über dem 700-Zeilen-Limit. Empfehlung: In Sub-Stores aufteilen (quizStore, bossStore, playerStore)
2. 🟢 **Niedrig:** `questionPipeline.ts` bei 672 Zeilen — nahe am Limit

---

**Hauptkomponenten-Pfade:**
- Phase 1: `src/components/boss/BossQuizWorld.tsx`, `src/store/gameStore.ts`, `src/components/boss/BossEliminationRenderer.tsx`
- Phase 2-3: `src/components/Game.tsx`, `src/components/AnswerNode.tsx`, `src/store/gameStore.ts` *(noch nicht gestartet)*
- Phase 4: `src/components/boss/`, `src/data/quiz/schedulers.ts`
- Phase 5: `src/data/quiz_elliott_wave_advanced.json`, `src/data/quiz/questionPipeline.ts`, `src/store/gameStore.ts`
- Phase 6: `src/data/quiz/questionPipeline.ts`, `src/components/boss/BossQuizWorld.tsx`, `src/types/quizValidation.ts`

**⚠️ Refactoring-Empfehlung:**
- `src/store/gameStore.ts` (1638 Zeilen) → Aufteilen in `quizStore.ts`, `bossStore.ts`, `playerStore.ts`