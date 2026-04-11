# Test-Account System (Development-Only)

---
version: 1.0
updated: 2026-04-11
---

Ein sicheres Test-Account-System für automatisiertes Testing in der Entwicklungsumgebung.

---

## 1. Wann Test-Account nutzen

**PFLICHT bei Browser-Testing von Auth-geschützten Features:**
- Dashboard testen
- Geschützte Bereiche testen
- Alle Features die Login erfordern

---

## 2. Test-Login Workflow

1. Prüfe ob App in Development läuft
2. Navigiere zu Login-Screen
3. Klicke "🧪 Dev: Test-Login" Button (nur sichtbar wenn `__DEV__`)
4. Warte auf Dashboard-Navigation
5. Fahre mit Tests fort

```bash
# Agent-Browser Workflow
agent-browser open http://localhost:8081
agent-browser snapshot -i
agent-browser click @test-login-btn  # ref des Test-Login Buttons
agent-browser wait --url "**/dashboard"
agent-browser snapshot -i  # Validierung
```

---

## 3. Sicherheitsregeln (NIEMALS VERLETZEN!)

### ❌ VERBOTEN

- Test-Account Features in Production-Builds
- Echte User-Credentials im Code
- Test-Account mit Admin-Rechten
- Test-Daten in Production-DB

### ✅ PFLICHT

- `__DEV__` Check in Mobile-App
- `NODE_ENV=development` Check im Backend
- Isoliertes Test-Profil
- Klar markierte Test-UI-Elemente

---

## 4. Implementierung

### Backend

**Endpoint:** `POST /api/dev/test-login`

- Nur wenn `NODE_ENV === 'development'`
- Gibt 404 in Production
- Erstellt temporäre Session für Test-Profil

### Frontend (Mobile/Web)

**Komponente:** `DevTestLoginButton`

- Nur sichtbar wenn `__DEV__ === true`
- Zeigt "🧪 Dev: Test-Login" Text
- Ruft Test-Login-Endpoint auf

---

## 5. Test-Profil Eigenschaften

| Eigenschaft | Wert |
|-------------|------|
| ID | `test-profile-dev-only` |
| Name | `Test User (Dev)` |
| Rechte | Standard-User (keine Admin-Rechte) |
| Daten | Isoliert von echten User-Daten |

---

## Referenzen

| Thema | Dokumentation |
|-------|---------------|
| Browser-Testing | `shared-docs/agents/agent-browser/SKILL.md` |
