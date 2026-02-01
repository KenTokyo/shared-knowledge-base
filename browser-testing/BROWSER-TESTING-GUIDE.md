# Browser-Testing Guide mit Agent-Browser

**Erstellt:** 2026-02-01
**Status:** AKTIV
**Referenz:** `shared-docs/agents/agent-browser/SKILL.md`

---

## Übersicht

Dieses Dokument beschreibt, wie `agent-browser` für automatisiertes UI-Testing der TrackMe-AI Mobile-App verwendet wird.

### Warum Agent-Browser?

| Vorteil | Beschreibung |
|---------|--------------|
| **Automatisierung** | KI kann UI selbst validieren ohne User-Interaktion |
| **Reproduzierbarkeit** | Tests können wiederholt ausgeführt werden |
| **Screenshots** | Visuelle Dokumentation von Fehlern |
| **Interaktion** | Formulare ausfüllen, Buttons klicken, Navigation testen |

---

## Quick Start

### 1. Expo Web starten

```bash
# Im App-Verzeichnis
cd apps/mobile && npx expo start --web
```

**Erwartete Ausgabe:**
```
Web Bundled XXXXms node_modules\expo-router\entry.js (XXXX modules)
Starting Webpack on port 8081
```

### 2. Browser öffnen

```bash
agent-browser open http://localhost:8081
```

### 3. Snapshot erstellen (interaktive Elemente anzeigen)

```bash
agent-browser snapshot -i
```

**Ausgabe zeigt Refs wie `@e1`, `@e2` für Elemente:**
```
button "Login" [ref=e1]
textbox "Email" [ref=e2]
textbox "Password" [ref=e3]
```

### 4. Mit UI interagieren

```bash
agent-browser fill @e2 "test@example.com"
agent-browser fill @e3 "password123"
agent-browser click @e1
```

### 5. Auf Navigation warten

```bash
agent-browser wait --url "**/dashboard"
```

### 6. Screenshot bei Bedarf

```bash
agent-browser screenshot dashboard-loaded.png
```

### 7. Browser schließen

```bash
agent-browser close
```

---

## Expo Web Testing Workflow

### Voraussetzungen

1. Bundling muss erfolgreich sein (`npx expo start --web` zeigt "Web Bundled")
2. Port muss verfügbar sein (8081 Standard)
3. Keine TypeScript-Fehler (`npx tsc --noEmit`)

### Vollständiger Test-Workflow

```bash
# 1. TypeScript validieren
cd apps/mobile && npx tsc --noEmit

# 2. Expo Web starten (im Hintergrund oder separates Terminal)
cd apps/mobile && npx expo start --web

# 3. Warten auf "Web Bundled" Meldung

# 4. Browser-Testing starten
agent-browser open http://localhost:8081

# 5. Snapshot für Navigation
agent-browser snapshot -i

# 6. Tests durchführen (siehe workflows/ Ordner)

# 7. Browser schließen
agent-browser close
```

---

## Port-Management

### Standard-Ports

| Service | Port | Beschreibung |
|---------|------|--------------|
| Expo Web | 8081 | Standard Web-Port |
| Metro Bundler | 19000 | React Native Bundler |
| Expo Dev Client | 19001 | Development Client |

### Bei Port-Konflikten

**Option A: Anderen Port verwenden**
```bash
cd apps/mobile && npx expo start --web --port 8082
# Dann:
agent-browser open http://localhost:8082
```

**Option B: Prozess auf Port beenden**
```bash
# Windows:
npx kill-port 8081

# Linux/Mac:
kill $(lsof -t -i:8081)
```

**Option C: Automatische Port-Erkennung**
Expo zeigt den verwendeten Port in der Konsole an:
```
Starting Webpack on port 8082  # Falls 8081 belegt
```

---

## Authentication-Handling

### Problem
Die App erfordert Login für die meisten Features (TrainingTab, Dashboard, etc.).

### Lösung: Test-Account System

**Voraussetzung:** Planung 11 (Test-Account System) muss implementiert sein!

```bash
# 1. Login-Screen öffnen
agent-browser open http://localhost:8081

# 2. Snapshot für Login-Elemente
agent-browser snapshot -i

# 3. Test-Login Button klicken (nur in __DEV__)
agent-browser click @test-login-btn

# 4. Auf Dashboard warten
agent-browser wait --url "**/dashboard"

# 5. Verifizieren
agent-browser snapshot -i
```

### Session speichern (für wiederholte Tests)

```bash
# Nach erfolgreichem Login:
agent-browser state save test-session.json

# In späteren Tests laden:
agent-browser state load test-session.json
agent-browser open http://localhost:8081/dashboard
```

---

## Häufige Test-Szenarien

### UI-Element sichtbar?

```bash
agent-browser is visible @element-ref
```

### Text auf Seite vorhanden?

```bash
agent-browser wait --text "Willkommen"
# ODER
agent-browser find text "Willkommen" click
```

### Formular ausfüllen

```bash
agent-browser fill @input-ref "Wert"
agent-browser select @dropdown-ref "Option"
agent-browser check @checkbox-ref
```

### Navigation prüfen

```bash
agent-browser get url  # Aktuelle URL
agent-browser wait --url "**/expected-path"
```

### Screenshot bei Fehler

```bash
agent-browser screenshot error-beschreibung.png
```

---

## Debugging

### Browser sichtbar machen (nicht headless)

```bash
agent-browser --headed open http://localhost:8081
```

### Console-Logs anzeigen

```bash
agent-browser console
```

### Fehler anzeigen

```bash
agent-browser errors
```

### Element hervorheben

```bash
agent-browser highlight @e1
```

---

## Fehlerbehebung

### "Connection refused"

**Ursache:** Expo Web läuft nicht oder falscher Port.

**Lösung:**
1. Prüfe ob Expo läuft: `cd apps/mobile && npx expo start --web`
2. Prüfe Port in Expo-Ausgabe
3. Korrekten Port in `agent-browser open` verwenden

### "Element not found"

**Ursache:** Ref ist veraltet oder Element existiert nicht.

**Lösung:**
1. Neuen Snapshot machen: `agent-browser snapshot -i`
2. Aktuellen Ref aus Snapshot verwenden
3. Prüfen ob Element im DOM ist (evtl. noch lädt)

### "Timeout waiting for..."

**Ursache:** Seite lädt zu langsam oder Bedingung nie erfüllt.

**Lösung:**
1. Timeout erhöhen oder
2. Prüfen ob Bedingung korrekt ist
3. Screenshot machen um aktuellen Zustand zu sehen

### Bundling schlägt fehl

**Ursache:** TypeScript-Fehler, fehlende Packages, etc.

**Lösung:**
1. `cd apps/mobile && npx tsc --noEmit` ausführen
2. Fehler beheben
3. `npx expo start --clear` für Cache-Reset

---

## Referenzen

| Dokument | Beschreibung |
|----------|--------------|
| `shared-docs/agents/agent-browser/SKILL.md` | Vollständige Agent-Browser Referenz |
| `shared-docs/browser-testing/workflows/` | Spezifische Test-Workflows |
| `shared-docs/CODING-RULES.md` (Regel 11-12) | Browser-Testing Regeln |
