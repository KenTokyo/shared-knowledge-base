# 🔐 Phase 8: Authentifizierung

> **ULTRATHINK** - Diese Phase beschreibt die Authentifizierungsmechanismen für alle KI-Provider.

---

## 📌 Status

- **Phase:** 8 von 9
- **Dokumentation:** 📝 DOKUMENTIERT
- **Typ:** Referenz-Dokumentation (Auth pro Provider)
- **Verifiziert:** ✅ Auth-Methoden gegen Executor-Code geprüft
- **Referenziert von:** `00-GLOBAL-ORCHESTRATOR.md`

---

## 🎯 Ziel dieser Phase

Dokumentation der **Authentifizierung**:
- Authentifizierungsmethoden pro Provider
- API-Key-Management
- OAuth-Flows
- Verfügbarkeitsprüfung

---

## 🚀 Strategie & Prinzipien

### Designprinzip: Keine zentrale Key-Speicherung

```
┌─────────────────────────────────────────────────────────┐
│ WICHTIG: Das System speichert KEINE API-Keys!           │
│                                                          │
│ Stattdessen:                                             │
│ • Provider verwalten Keys selbst                         │
│ • Environment Variables für lokale Entwicklung           │
│ • Home-Directory für OAuth/Credentials                   │
│ • System prüft nur Verfügbarkeit                         │
└─────────────────────────────────────────────────────────┘
```

### Authentifizierungstypen

| Typ | Provider | Speicherort |
|-----|----------|-------------|
| **Environment Variable** | Claude Code, Codex, Cursor | `CLAUDE_API_KEY`, `OPENAI_API_KEY`, `CURSOR_API_KEY` |
| **OAuth** | Gemini | `~/.gemini/oauth_creds.json` |
| **CLI Login** | Copilot, Cursor | GitHub CLI, cursor-agent login |
| **Config File** | Amp | Sourcegraph Config |

---

## 📋 Authentifizierung pro Provider

### 🟣 Claude Code

**Methode:** Environment Variable

**Setup:**
```bash
export CLAUDE_API_KEY="sk-ant-..."
```

**Verfügbarkeitsprüfung:**
```rust
fn get_availability_info(&self) -> AvailabilityInfo {
    if std::env::var("CLAUDE_API_KEY").is_ok() {
        AvailabilityInfo::LoginDetected { last_auth_timestamp: 0 }
    } else {
        AvailabilityInfo::NotFound
    }
}
```

---

### 🔵 Codex (OpenAI)

**Methode:** Environment Variable

**Setup:**
```bash
export OPENAI_API_KEY="sk-..."
```

**Alternative:** Codex CLI eigene Authentifizierung

---

### 🟢 GitHub Copilot

**Methode:** GitHub CLI OAuth

**Setup:**
```bash
gh auth login
# → Browser öffnet für GitHub OAuth
# → Token wird in ~/.config/gh/hosts.yml gespeichert
```

**Verfügbarkeitsprüfung:**
```rust
fn get_availability_info(&self) -> AvailabilityInfo {
    let config_path = dirs::config_dir()?.join("gh/hosts.yml");
    if config_path.exists() {
        // Parse YAML für Token-Existenz
        AvailabilityInfo::LoginDetected { ... }
    } else {
        AvailabilityInfo::NotFound
    }
}
```

---

### 🟡 Cursor Agent

**Methode:** API Key ODER CLI Login

**Option A: Environment Variable**
```bash
export CURSOR_API_KEY="..."
```

**Option B: CLI Login**
```bash
cursor-agent login
# → Browser öffnet für Cursor Auth
```

**Verfügbarkeitsprüfung:**
```rust
fn get_availability_info(&self) -> AvailabilityInfo {
    // Prüft CURSOR_API_KEY env var
    // ODER ~/.cursor/ credentials
}
```

---

### 🔴 Google Gemini

**Methode:** Google OAuth

**Setup:**
```bash
gemini auth login
# → Browser öffnet für Google OAuth
# → Credentials in ~/.gemini/oauth_creds.json
```

**Dateien:**
- `~/.gemini/oauth_creds.json` - OAuth Tokens
- `~/.gemini/installation_id` - Installation Marker
- `~/.gemini/settings.json` - User Settings

**Verfügbarkeitsprüfung:**
```rust
fn get_availability_info(&self) -> AvailabilityInfo {
    let oauth_path = dirs::home_dir()?.join(".gemini/oauth_creds.json");

    if oauth_path.exists() {
        // Parse JSON für Expiry
        let creds: OAuthCreds = serde_json::from_str(&fs::read_to_string(oauth_path)?)?;
        AvailabilityInfo::LoginDetected {
            last_auth_timestamp: creds.expiry_timestamp
        }
    } else if installation_id_exists() {
        AvailabilityInfo::InstallationFound
    } else {
        AvailabilityInfo::NotFound
    }
}
```

---

### 🟠 Droid

**Methode:** Provider-spezifisch (Multi-Provider)

**Da Droid verschiedene Backends nutzt:**
- Claude-Modelle: `ANTHROPIC_API_KEY`
- GPT-Modelle: `OPENAI_API_KEY`
- Gemini-Modelle: Google OAuth

**Empfehlung:** Alle relevanten Keys setzen:
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
```

---

### 🟤 Qwen Code

**Methode:** Alibaba Cloud API Key

**Setup:**
```bash
export ALIBABA_API_KEY="..."
# ODER
export DASHSCOPE_API_KEY="..."
```

---

### ⚫ Sourcegraph Amp

**Methode:** Sourcegraph Auth

**Setup:**
```bash
amp auth login
# → Sourcegraph OAuth Flow
```

---

### ⚪ Opencode

**Methode:** Provider-spezifisch

**Unterstützt verschiedene Backends:**
```bash
export OPENAI_API_KEY="..."      # Für OpenAI
export ANTHROPIC_API_KEY="..."   # Für Anthropic
```

---

## ❓ Proaktive F&A

### Q1: Was passiert, wenn der Key fehlt?

✅ **Antwort:**
- `get_availability_info()` gibt `NotFound` zurück
- Frontend zeigt "Not installed" oder "Not logged in"
- User kann trotzdem Profile konfigurieren
- Bei Task-Start: Executor schlägt fehl mit klarer Fehlermeldung

### Q2: Wie erneuere ich abgelaufene OAuth-Tokens?

✅ **Antwort:**
- Die meisten CLIs erneuern automatisch (Refresh Token)
- Bei Problemen: `<cli> auth logout && <cli> auth login`
- Gemini: Token automatisch erneuert wenn nicht älter als 7 Tage

### Q3: Kann ich mehrere API-Keys für denselben Provider haben?

✅ **Antwort:**
- Nicht nativ unterstützt
- Workaround: Verschiedene Environment-Sets
- Oder: dotenv mit verschiedenen .env-Dateien

---

## 📱 Konkrete Beispiele

### Beispiel: Gemini Auth Flow

```
🖥️ User: gemini auth login
    ↓
🌐 Browser öffnet: accounts.google.com/o/oauth2/...
    ↓
👆 User: Gewährt Zugriff
    ↓
🔐 Callback: Token empfangen
    ↓
💾 Gespeichert: ~/.gemini/oauth_creds.json
   {
     "access_token": "ya29...",
     "refresh_token": "1//...",
     "expiry": "2024-01-15T10:00:00Z"
   }
    ↓
✅ gemini: "Successfully logged in!"
```

### Beispiel: Verfügbarkeitsprüfung im Frontend

```
🖥️ User: Öffnet AgentSettings
    ↓
🔍 useAgentAvailability("GEMINI")
    ↓
📤 GET /agents/check-availability?executor=GEMINI
    ↓
🔧 Backend: Gemini::get_availability_info()
   - Prüft ~/.gemini/oauth_creds.json ✓
   - Parst expiry timestamp
    ↓
📥 Response: { type: "LoginDetected", last_auth_timestamp: 1704326400 }
    ↓
🖥️ AgentAvailabilityIndicator:
   "✓ Logged in (expires: Jan 15, 2024)"
```

---

## 🧩 Komponenten & Implementierung

### 8.1 Enum: `AvailabilityInfo` **~30 Zeilen**

Zweck: Authentifizierungsstatus darstellen

```rust
pub enum AvailabilityInfo {
    LoginDetected { last_auth_timestamp: i64 },
    InstallationFound,
    NotFound,
}
```

### 8.2 Trait-Methode: `get_availability_info()` **Pro Executor ~50 Zeilen**

Zweck: Verfügbarkeit prüfen

**Pattern:**
1. Environment Variables prüfen
2. Home-Directory Credentials prüfen
3. Appropriate AvailabilityInfo zurückgeben

### 8.3 Endpoint: `/agents/check-availability` **~50 Zeilen**

Zweck: REST-API für Verfügbarkeitsprüfung

**Handler:**
```rust
async fn check_availability(
    Query(params): Query<CheckAvailabilityParams>
) -> Json<AvailabilityInfo> {
    let executor = get_executor(params.executor);
    Json(executor.get_availability_info())
}
```

### 8.4 Hook: `useAgentAvailability` **~60 Zeilen**

Zweck: React Hook für Verfügbarkeitsstatus

```typescript
function useAgentAvailability(agent: BaseCodingAgent) {
  const [status, setStatus] = useState<AvailabilityInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/agents/check-availability?executor=${agent}`)
      .then(r => r.json())
      .then(setStatus)
      .finally(() => setLoading(false));
  }, [agent]);

  return { status, loading, refresh: () => { /* refetch */ } };
}
```

---

## ⚡ Security Best Practices

### Do's

- ✅ Keys in Environment Variables
- ✅ OAuth für Browser-basierte Auth
- ✅ Credentials in Home-Directory (nicht im Projekt)
- ✅ Token-Refresh automatisch handhaben

### Don'ts

- ❌ Keys im Code committen
- ❌ Keys in profiles.json speichern
- ❌ Tokens über HTTP übertragen
- ❌ Credentials in Projekt-Verzeichnis

---

## 📚 Weiterführende Phasen

- **Phase 2:** Provider-Definitionen - Auth-Methoden pro Provider
- **Phase 5:** API-Routen - Availability-Endpoint

### Umgebungsvariablen-Referenz

| Variable | Provider |
|----------|----------|
| `CLAUDE_API_KEY` | Claude Code |
| `ANTHROPIC_API_KEY` | Anthropic (Droid, Opencode) |
| `OPENAI_API_KEY` | Codex, Droid, Opencode |
| `CURSOR_API_KEY` | Cursor Agent |
| `ALIBABA_API_KEY` | Qwen Code |
| `DASHSCOPE_API_KEY` | Qwen Code (Alternative) |

---

## ✅ Abschlusskriterien für diese Phase

- [ ] Alle Auth-Methoden pro Provider dokumentiert
- [ ] Setup-Anleitungen vorhanden
- [ ] Verfügbarkeitsprüfung erklärt
- [ ] Security Best Practices aufgelistet
- [ ] Environment Variables referenziert

---

*Referenz: `shared-docs/ai-integration/00-GLOBAL-ORCHESTRATOR.md`*
