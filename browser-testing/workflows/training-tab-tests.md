# TrainingTab Test-Workflows

**Erstellt:** 2026-02-01
**Voraussetzung:** Test-Account System (Planung 11) für Auth-geschützte Tests

---

## Übersicht

Diese Workflows beschreiben, wie der TrainingTab mit `agent-browser` getestet wird.

### Voraussetzungen für alle Tests

```bash
# 1. TypeScript validieren
cd apps/mobile && npx tsc --noEmit

# 2. Expo Web starten
cd apps/mobile && npx expo start --web

# 3. Warten auf "Web Bundled" Meldung
```

---

## Test 1: TrainingTab Navigation

**Ziel:** Prüfen ob TrainingTab erreichbar ist.

```bash
# 1. App öffnen
agent-browser open http://localhost:8081

# 2. Snapshot
agent-browser snapshot -i

# 3. Login durchführen (wenn nötig)
# Siehe: Test-Account Workflow unten

# 4. Zur Entry-Seite navigieren (TrainingTab)
agent-browser click @entry-tab  # oder entsprechender Ref
agent-browser wait --load networkidle

# 5. Verifizieren
agent-browser snapshot -i
agent-browser screenshot training-tab-loaded.png
```

**Erwartetes Ergebnis:**
- TrainingCalendar sichtbar
- Exercise-Liste sichtbar
- Keine Error-Messages

---

## Test 2: Trainingsplan laden

**Ziel:** Prüfen ob Trainingsplan-Auswahl funktioniert.

```bash
# Voraussetzung: Im TrainingTab

# 1. Snapshot für aktuelle UI
agent-browser snapshot -i

# 2. Trainingsplan-Button klicken
agent-browser click @training-plan-btn

# 3. Auf Sheet warten
agent-browser wait --text "Trainingsplan"
agent-browser snapshot -i

# 4. Plan auswählen (falls vorhanden)
agent-browser click @plan-option-1

# 5. Verifizieren
agent-browser wait --load networkidle
agent-browser snapshot -i
```

**Erwartetes Ergebnis:**
- TrainingPlanSelectorSheet öffnet sich
- Pläne werden angezeigt
- Auswahl aktualisiert UI

---

## Test 3: Übung zum Training hinzufügen

**Ziel:** Prüfen ob AddExerciseSheet funktioniert.

```bash
# Voraussetzung: Im TrainingTab

# 1. Snapshot
agent-browser snapshot -i

# 2. "Übung hinzufügen" Button finden und klicken
agent-browser click @add-exercise-btn

# 3. Auf AddExerciseSheet warten
agent-browser wait --text "Übung hinzufügen"
agent-browser snapshot -i

# 4. Muskelgruppe auswählen (wenn Filter vorhanden)
agent-browser click @muscle-group-filter
agent-browser click @muscle-group-chest  # z.B. Brust

# 5. Übung auswählen
agent-browser click @exercise-item-1

# 6. Verifizieren dass Übung hinzugefügt wurde
agent-browser wait --load networkidle
agent-browser snapshot -i
agent-browser screenshot exercise-added.png
```

**Erwartetes Ergebnis:**
- AddExerciseSheet öffnet sich
- Übungen werden mit Bildern angezeigt
- Auswahl fügt Übung zur Liste hinzu

---

## Test 4: Exercise-Bilder werden angezeigt

**Ziel:** Prüfen ob expo-image korrekt Bilder lädt.

```bash
# Voraussetzung: Im TrainingTab mit Übungen

# 1. Snapshot
agent-browser snapshot -i

# 2. Nach img-Elementen suchen
agent-browser find role img snapshot

# 3. Screenshot für visuelle Prüfung
agent-browser screenshot exercise-images-check.png

# 4. Prüfen ob Bilder geladen sind (keine Error-Icons)
agent-browser errors  # Sollte leer sein für Image-Errors
```

**Erwartetes Ergebnis:**
- Übungs-Bilder werden angezeigt
- Keine "Image failed to load" Fehler
- Bilder haben korrekte Größe

---

## Test 5: Pause planen

**Ziel:** Prüfen ob TrainingPauseSheet funktioniert.

```bash
# Voraussetzung: Im TrainingTab

# 1. Snapshot
agent-browser snapshot -i

# 2. Kalender anklicken (für Pause-Option)
agent-browser click @calendar-day  # Ein Tag im Kalender

# 3. Auf Optionen warten
agent-browser wait --text "Pause"
agent-browser snapshot -i

# 4. "Pause planen" auswählen
agent-browser click @pause-btn

# 5. Pause-Sheet
agent-browser wait --text "Pause planen"
agent-browser snapshot -i

# 6. Datumsbereich auswählen
agent-browser click @start-date
agent-browser click @end-date
agent-browser click @confirm-pause-btn

# 7. Verifizieren
agent-browser wait --load networkidle
agent-browser snapshot -i
```

**Erwartetes Ergebnis:**
- TrainingPauseSheet öffnet sich
- Datum kann ausgewählt werden
- Pause wird im Kalender angezeigt

---

## Test 6: Advanced Tracking (RPE, Timer)

**Ziel:** Prüfen ob Advanced Tracking Mode funktioniert.

```bash
# Voraussetzung: Im TrainingTab mit Übung

# 1. Snapshot
agent-browser snapshot -i

# 2. Übung expandieren/öffnen
agent-browser click @exercise-item-1

# 3. Advanced Mode aktivieren (wenn Toggle vorhanden)
agent-browser click @advanced-mode-toggle

# 4. RPE-Slider prüfen
agent-browser snapshot -i
agent-browser is visible @rpe-slider

# 5. Timer prüfen
agent-browser is visible @rest-timer

# 6. Screenshot
agent-browser screenshot advanced-tracking.png
```

**Erwartetes Ergebnis:**
- RPE-Eingabe sichtbar
- Rest-Timer sichtbar
- Warmup-Set Option sichtbar

---

## Test 7: Body Highlighter

**Ziel:** Prüfen ob Muskelgruppen-Visualisierung funktioniert.

```bash
# Voraussetzung: Im TrainingTab

# 1. Snapshot
agent-browser snapshot -i

# 2. Body Highlighter finden
agent-browser find testid "body-highlighter" snapshot

# 3. Auf Muskelgruppe klicken (wenn interaktiv)
agent-browser click @body-chest-area

# 4. Verifizieren dass Übungen gefiltert werden
agent-browser snapshot -i
agent-browser screenshot body-highlighter.png
```

**Erwartetes Ergebnis:**
- Body SVG wird angezeigt
- Trainierte Muskelgruppen sind farblich markiert
- Klick filtert Übungsliste (optional)

---

## Test-Account Workflow

**Für alle Auth-geschützten Tests:**

```bash
# 1. App öffnen
agent-browser open http://localhost:8081

# 2. Snapshot für Login-Screen
agent-browser snapshot -i

# 3. Test-Login Button klicken (nur in __DEV__ sichtbar!)
agent-browser click @test-login-btn

# 4. Auf Dashboard/Entry warten
agent-browser wait --url "**/entry"
agent-browser wait --load networkidle

# 5. Verifizieren
agent-browser snapshot -i

# 6. Session speichern für spätere Tests
agent-browser state save test-auth-session.json
```

**In späteren Tests wiederverwenden:**

```bash
agent-browser state load test-auth-session.json
agent-browser open http://localhost:8081/entry
```

---

## Batch-Test Script (alle Tests)

```bash
#!/bin/bash
# training-tab-full-test.sh

echo "=== TrainingTab Full Test Suite ==="

# Setup
agent-browser open http://localhost:8081
sleep 2

# Login
agent-browser snapshot -i
agent-browser click @test-login-btn
agent-browser wait --url "**/entry"

# Test 1: Navigation
echo "Test 1: Navigation"
agent-browser screenshot test1-navigation.png

# Test 2: Trainingsplan
echo "Test 2: Trainingsplan laden"
agent-browser click @training-plan-btn
sleep 1
agent-browser screenshot test2-training-plan.png
agent-browser press Escape  # Sheet schließen

# Test 3: Übung hinzufügen
echo "Test 3: Übung hinzufügen"
agent-browser click @add-exercise-btn
sleep 1
agent-browser screenshot test3-add-exercise.png
agent-browser press Escape

# Cleanup
echo "=== Tests abgeschlossen ==="
agent-browser close
```

---

## Troubleshooting

### "Cannot find @test-login-btn"

**Ursache:** Test-Account System (Planung 11) noch nicht implementiert.

**Lösung:** Warte auf Implementierung oder manuell einloggen.

### "TrainingTab zeigt Loading"

**Ursache:** API-Call noch nicht abgeschlossen.

**Lösung:**
```bash
agent-browser wait --load networkidle
agent-browser wait --text "Trainingsplan"  # Oder erwarteter Text
```

### "Bilder werden nicht angezeigt"

**Ursache:** expo-image Problem oder Image-URL falsch.

**Lösung:**
1. Console-Errors prüfen: `agent-browser errors`
2. Network-Requests prüfen: `agent-browser network requests --filter image`
