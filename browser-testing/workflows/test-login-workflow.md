# Test-Login Workflow für Agent-Browser

**Erstellt:** 2026-02-01
**Status:** Implementiert
**Zweck:** Automatisiertes Login für KI-gestütztes Browser-Testing

---

## Voraussetzungen

| Komponente | Anforderung |
|------------|-------------|
| Backend | Muss in Development-Mode laufen (`NODE_ENV=development`) |
| Mobile App | Muss in Development-Mode laufen (`__DEV__=true`) |
| Port | Expo Web auf Port 8081 (oder konfiguriert) |

---

## Architektur

```
┌─────────────────────────────────────────────────────────┐
│                     DEVELOPMENT ONLY                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐       ┌──────────────────────────┐   │
│  │ Mobile App   │       │ Backend                   │   │
│  │              │       │                           │   │
│  │ Login Screen │──────▶│ POST /api/dev/test-login │   │
│  │              │       │                           │   │
│  │ [Dev: Test-  │       │ ✓ NODE_ENV=development   │   │
│  │  Login]      │       │ ✓ Returns test-profile   │   │
│  │              │       │ ✓ Returns auth-token     │   │
│  │ __DEV__=true │       │                           │   │
│  └──────────────┘       └──────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Agent-Browser Workflow

### 1. Services starten

```bash
# Terminal 1: Backend starten (Development Mode)
cd trackme-ai-backend
npm run dev

# Terminal 2: Mobile App Web starten
cd trackme-ai-mobile/apps/mobile
npx expo start --web --port 8081
```

### 2. Browser-Testing Workflow

```bash
# Schritt 1: App öffnen
agent-browser open http://localhost:8081

# Schritt 2: Snapshot für Element-Referenzen
agent-browser snapshot -i

# Schritt 3: Test-Login Button finden und klicken
# Der Button hat testID="dev-test-login-button"
agent-browser click @dev-test-login-button

# Alternative: Nach Text suchen
agent-browser click "Dev: Test-Login"

# Schritt 4: Auf Dashboard-Navigation warten
agent-browser wait --url "**/heute"
agent-browser wait --load networkidle

# Schritt 5: Validierung - Dashboard geladen?
agent-browser snapshot -i
```

### 3. Nach Login: Feature-Tests

```bash
# TrainingTab testen
agent-browser click "Training"
agent-browser snapshot -i

# Übung hinzufügen
agent-browser click @add-exercise-button
agent-browser snapshot -i

# Screenshot für Dokumentation
agent-browser screenshot training-tab-test.png
```

---

## Fehlerbehebung

### Test-Login Button nicht sichtbar

**Mögliche Ursachen:**

1. **App nicht in Development-Mode:**
   - Prüfe ob `__DEV__` true ist
   - Bei Expo Web: `npx expo start --web` (nicht `--production`)

2. **Falscher Screen:**
   - Button ist nur auf Login-Screen sichtbar
   - Navigiere zu `/(auth)/login`

### Test-Login schlägt fehl

**HTTP 404:**
- Backend läuft nicht in Development-Mode
- Prüfe `NODE_ENV=development` in Backend

**Netzwerk-Fehler:**
- Backend nicht erreichbar
- Prüfe `EXPO_PUBLIC_API_URL` in `.env`
- Default: `http://localhost:3000`

**Invalid Response:**
- Backend kann Test-User nicht erstellen
- Prüfe Datenbank-Verbindung im Backend

---

## API-Details

### Endpoint

```
POST /api/dev/test-login
```

### Response (Erfolg)

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": "test-user-dev-001",
    "email": "test-dev@trackme.local",
    "name": "Test Developer",
    "role": "user"
  },
  "profileId": "uuid-of-test-profile",
  "_dev": true
}
```

### Response (Production - 404)

```
HTTP 404 Not Found
(Leerer Body)
```

---

## Sicherheitshinweise

| Aspekt | Status |
|--------|--------|
| Production-Schutz | ✅ Endpoint gibt 404 wenn `NODE_ENV !== 'development'` |
| UI-Schutz | ✅ Button rendert nur wenn `__DEV__ === true` |
| Keine Secrets | ✅ Keine Passwörter im Client-Code |
| Isolierte Daten | ✅ Test-User hat eigenes Profil |

---

## Test-Account Details

| Feld | Wert |
|------|------|
| User ID | `test-user-dev-001` |
| Email | `test-dev@trackme.local` |
| Name | `Test Developer` |
| Role | `user` |
| Profile Display Name | `TestDev` |

Der Test-Account wird beim ersten Login automatisch erstellt (falls nicht vorhanden).

---

## Verknüpfte Dateien

### Backend
- `trackme-ai-backend/app/api/dev/test-login/route.ts`

### Mobile
- `apps/mobile/components/dev/DevTestLoginButton.tsx`
- `apps/mobile/app/(auth)/login.tsx`

### Dokumentation
- `shared-docs/browser-testing/BROWSER-TESTING-GUIDE.md`
- `shared-docs/CODING-RULES.md` (Regel 12)
