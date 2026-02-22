# 🤖 Phase 2: Provider-Definitionen

> **ULTRATHINK** - Diese Phase dokumentiert alle unterstützten KI-Provider mit ihren Konfigurationsoptionen.

---

## 📌 Status

- **Phase:** 2 von 9
- **Dokumentation:** 📝 DOKUMENTIERT
- **Typ:** Referenz-Dokumentation (keine Implementierung nötig)
- **Verifiziert:** ✅ Modell-Namen gegen `default_profiles.json` geprüft
- **Referenziert von:** `00-GLOBAL-ORCHESTRATOR.md`

---

## 🎯 Ziel dieser Phase

Detaillierte Dokumentation aller **9 unterstützten KI-Provider**:
- CLI-Paket und Version
- Konfigurationsoptionen (Felder)
- Unterstützte Modelle
- Authentifizierungsmethode
- Besonderheiten und Modi

---

## 🚀 Provider-Übersicht (Alle 9 Provider)

### 1. 🟣 Claude Code (Anthropic)

| Eigenschaft | Wert |
|-------------|------|
| **CLI-Paket** | `@anthropic-ai/claude-code@2.0.75` |
| **Executor-Name** | `CLAUDE_CODE` |
| **Authentifizierung** | `CLAUDE_API_KEY` Environment Variable |

**Konfigurationsfelder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `model` | `Option<String>` | Modell (opus, sonnet, haiku) |
| `dangerously_skip_permissions` | `bool` | Überspringt Permission-Abfragen |
| `plan` | `bool` | Plan-Modus aktivieren |
| `approvals` | `bool` | Approval-Workflow aktivieren |
| `claude_code_router` | `bool` | Router-Variante (v1.0.66) |

**Typische Varianten:**
- `DEFAULT` - Standard mit skip_permissions
- `PLAN` - Plan-Modus aktiviert
- `OPUS` - Opus-Modell
- `APPROVALS` - Mit Genehmigungsworkflow

---

### 2. 🔵 Codex (OpenAI)

| Eigenschaft | Wert |
|-------------|------|
| **CLI-Paket** | AppServer Protocol (intern) |
| **Executor-Name** | `CODEX` |
| **Authentifizierung** | `OPENAI_API_KEY` Environment Variable |

**Konfigurationsfelder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `model` | `Option<String>` | gpt-5.2, gpt-5.1-codex-max, etc. |
| `sandbox` | `SandboxMode` | auto, read-only, workspace-write, danger-full-access |
| `approval_strategy` | `ApprovalStrategy` | auto, suggest, ask |
| `reasoning_effort` | `ReasoningEffort` | low, medium, high, xhigh |

**Sandbox-Modi:**
- `auto` - Automatische Entscheidung
- `read-only` - Nur Lesen
- `workspace-write` - Schreiben im Workspace
- `danger-full-access` - Voller Zugriff (gefährlich!)

---

### 3. 🟢 GitHub Copilot

| Eigenschaft | Wert |
|-------------|------|
| **CLI-Paket** | `@github/copilot@0.0.367` |
| **Executor-Name** | `COPILOT` |
| **Authentifizierung** | GitHub CLI (`gh auth login`) |

**Konfigurationsfelder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `model` | `Option<String>` | gpt-5, claude-sonnet-4.5, claude-sonnet-4 |
| `allow_all_tools` | `bool` | Alle Tools erlauben |
| `mcp_servers` | `Vec<String>` | MCP Server aktivieren/deaktivieren |
| `reasoning_effort` | `Option<String>` | Reasoning-Level |

**Besonderheiten:**
- Integriert mit GitHub-Ökosystem
- MCP-Server-Verwaltung möglich
- Mehrere Claude-Modelle verfügbar

---

### 4. 🟡 Cursor Agent

| Eigenschaft | Wert |
|-------------|------|
| **CLI-Paket** | `cursor-agent` (lokal installiert) |
| **Executor-Name** | `CURSOR_AGENT` |
| **Authentifizierung** | `CURSOR_API_KEY` oder `cursor-agent login` |

**Konfigurationsfelder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `model` | `Option<String>` | auto, sonnet-4.5, sonnet-4.5-thinking, gpt-5, opus-4.1, grok |
| `auto_approve` | `bool` | Automatische Genehmigung |

**Unterstützte Modelle:**
- `auto` - Automatische Modellwahl
- `sonnet-4.5` - Claude Sonnet 4.5
- `sonnet-4.5-thinking` - Mit Thinking-Modus
- `gpt-5` - OpenAI GPT-5
- `opus-4.1` - Claude Opus 4.1
- `grok` - xAI Grok

---

### 5. 🔴 Google Gemini

| Eigenschaft | Wert |
|-------------|------|
| **CLI-Paket** | `@google/gemini-cli@0.21.1` |
| **Executor-Name** | `GEMINI` |
| **Authentifizierung** | Google OAuth (`~/.gemini/oauth_creds.json`) |

**Konfigurationsfelder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `model` | `Option<String>` | gemini-3-flash-preview, gemini-3-pro-preview |
| `yolo` | `bool` | YOLO-Modus (auto-approve alles) |

**Besonderheiten:**
- Verwendet ACP-Protokoll (Agent Communication Protocol)
- Session-Forking unterstützt
- OAuth-basierte Authentifizierung

---

### 6. 🟠 Droid (Multi-Provider)

| Eigenschaft | Wert |
|-------------|------|
| **CLI-Paket** | `droid` (lokal installiert) |
| **Executor-Name** | `DROID` |
| **Authentifizierung** | Provider-spezifisch |

**Konfigurationsfelder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `model` | `Option<String>` | Siehe Modell-Liste unten |
| `autonomy` | `Autonomy` | ask-on-modify, skip-permissions-unsafe |
| `reasoning_effort` | `Option<String>` | Reasoning-Level |

**Unterstützte Modelle (Multi-Provider!):**
- `gpt-5.1-codex` - OpenAI Codex
- `gpt-5.1` - OpenAI GPT-5.1
- `gemini-3-pro-preview` - Google Gemini
- `claude-sonnet-4-6` - Anthropic Claude Sonnet
- `claude-haiku-4-5-20251001` - Anthropic Claude Haiku
- `claude-opus-4-1-20250805` - Anthropic Claude Opus
- `glm-4.6` - GLM

**Besonderheiten:**
- Kann verschiedene Provider/Modelle über ein CLI ansprechen
- Session-Forking unterstützt
- Autonomy-Level steuerbar

---

### 7. 🟤 Qwen Code (Alibaba)

| Eigenschaft | Wert |
|-------------|------|
| **CLI-Paket** | `@qwen-code/qwen-code@0.2.1` |
| **Executor-Name** | `QWEN_CODE` |
| **Authentifizierung** | Alibaba API Key (Environment) |

**Konfigurationsfelder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `model` | `Option<String>` | Qwen-Modelle |
| `yolo` | `bool` | YOLO-Modus |

**Besonderheiten:**
- Verwendet ACP-Protokoll (wie Gemini)
- Session-Forking unterstützt

---

### 8. ⚫ Sourcegraph Amp

| Eigenschaft | Wert |
|-------------|------|
| **CLI-Paket** | `@sourcegraph/amp@0.0.1764777697-g907e30` |
| **Executor-Name** | `AMP` |
| **Authentifizierung** | Sourcegraph Auth |

**Konfigurationsfelder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `thread_id` | `Option<String>` | Bestehenden Thread fortsetzen |

**Besonderheiten:**
- Thread-basierte Konversation
- Sourcegraph-Integration

---

### 9. ⚪ Opencode

| Eigenschaft | Wert |
|-------------|------|
| **CLI-Paket** | `opencode-ai@1.0.134` |
| **Executor-Name** | `OPENCODE` |
| **Authentifizierung** | Provider-spezifisch (OpenAI, Anthropic, etc.) |

**Konfigurationsfelder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `model` | `Option<String>` | Konfigurierbar |
| `plan` | `bool` | Plan-Modus |
| `auto_approve` | `bool` | Auto-Approve |

**Besonderheiten:**
- Verwendet ACP-Protokoll
- Multi-Provider Backend

---

## ❓ Proaktive F&A

### Q1: Welchen Provider soll ich für ein neues Projekt wählen?

✅ **Empfehlung nach Anwendungsfall:**

| Anwendungsfall | Empfohlener Provider | Grund |
|----------------|---------------------|-------|
| **Allgemein (beste Qualität)** | Claude Code | Beste Code-Qualität, Plan-Modus |
| **Schnelle Iterationen** | Gemini | Schnell, YOLO-Modus |
| **GitHub-Integration** | Copilot | Native GitHub-Integration |
| **Multi-Modell** | Droid | Kann verschiedene Modelle nutzen |
| **Enterprise (OpenAI)** | Codex | GPT-5 mit Sandbox-Modi |

### Q2: Wie füge ich ein neues Modell zu einem Provider hinzu?

✅ **Antwort:**
1. Neuen Eintrag in `default_profiles.json` unter dem Provider
2. Varianten-Name als Key (z.B. `"NEW_MODEL"`)
3. `model`-Feld auf gewünschten Modell-String setzen
4. Frontend erkennt automatisch neue Variante!

### Q3: Was sind die Unterschiede zwischen Sandbox-Modi (Codex)?

✅ **Antwort:**
- `read-only`: Kann nur lesen, keine Änderungen
- `workspace-write`: Kann im Projekt schreiben
- `danger-full-access`: Kann alles (System-Befehle, etc.)
- `auto`: Wählt automatisch basierend auf Task

---

## 📱 Beispiel: Provider in default_profiles.json

```json
{
  "executors": {
    "CLAUDE_CODE": {
      "DEFAULT": {
        "CLAUDE_CODE": {
          "dangerously_skip_permissions": true
        }
      },
      "OPUS": {
        "CLAUDE_CODE": {
          "model": "opus",
          "dangerously_skip_permissions": true
        }
      },
      "PLAN": {
        "CLAUDE_CODE": {
          "plan": true
        }
      }
    },
    "DROID": {
      "DEFAULT": {
        "DROID": {
          "autonomy": "skip-permissions-unsafe"
        }
      },
      "CLAUDE_SONNET_4_5": {
        "DROID": {
          "model": "claude-sonnet-4-6",
          "autonomy": "skip-permissions-unsafe"
        }
      },
      "GPT_5": {
        "DROID": {
          "model": "gpt-5.1",
          "autonomy": "skip-permissions-unsafe"
        }
      }
    }
  }
}
```

---

## 🧩 Enum-Definitionen (Rust)

### BaseCodingAgent Enum

```rust
pub enum BaseCodingAgent {
    CLAUDE_CODE,
    AMP,
    GEMINI,
    CODEX,
    OPENCODE,
    CURSOR_AGENT,
    QWEN_CODE,
    COPILOT,
    DROID,
}
```

### CodingAgent Union (Discriminated Union)

```rust
pub enum CodingAgent {
    ClaudeCode(ClaudeCode),
    Amp(Amp),
    Gemini(Gemini),
    Codex(Codex),
    Opencode(Opencode),
    CursorAgent(CursorAgent),
    QwenCode(QwenCode),
    Copilot(Copilot),
    Droid(Droid),
}
```

---

## 📚 Weiterführende Phasen

- **Phase 3:** Executor-Implementierung - Wie diese Provider-Definitionen in Rust implementiert werden
- **Phase 4:** Profil-System - Wie Varianten und Defaults verwaltet werden

---

## ✅ Abschlusskriterien für diese Phase

- [ ] Alle 9 Provider dokumentiert
- [ ] Konfigurationsfelder pro Provider aufgelistet
- [ ] Authentifizierungsmethoden beschrieben
- [ ] Modell-Optionen pro Provider dokumentiert
- [ ] Beispiel-JSON für Profiles vorhanden

---

*Referenz: `shared-docs/ai-integration/00-GLOBAL-ORCHESTRATOR.md`*
