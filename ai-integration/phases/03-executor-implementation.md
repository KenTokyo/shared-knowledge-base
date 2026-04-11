# ⚙️ Phase 3: Executor-Implementierung

> **ULTRATHINK** - Diese Phase beschreibt die Rust-Implementierung der Executor-Module.

---

## 📌 Status

- **Phase:** 3 von 9
- **Dokumentation:** 📝 DOKUMENTIERT
- **Implementierung:** 🔲 OFFEN (für neues Projekt)
- **Priorität:** 1 (Kern-Logik, zuerst implementieren)
- **Verifiziert:** ✅ Pfade gegen echten Code geprüft
- **Referenziert von:** `00-GLOBAL-ORCHESTRATOR.md`

---

## 🎯 Ziel dieser Phase

Dokumentation der **Executor-Implementierung** in Rust:
- Trait-Definitionen
- CLI-Command-Building
- Stream-JSON-Verarbeitung
- Log-Normalisierung

---

## 🚀 Strategie & Implementierungsmuster

### 1. Executor-Architektur

Jeder Provider wird als **Executor-Modul** implementiert:

```
crates/executors/src/executors/
├── mod.rs              # CodingAgent Enum, BaseCodingAgent
├── claude.rs           # ClaudeCode Executor
│   ├── client.rs       # Protocol Client
│   ├── protocol.rs     # Stream-JSON Handling
│   └── types.rs        # Type Definitions
├── codex.rs            # Codex Executor
│   ├── client.rs       # AppServer Client
│   ├── jsonrpc.rs      # JSON-RPC Kommunikation
│   └── session.rs      # Session Management
├── copilot.rs          # Single-File Executor
├── cursor.rs           # Cursor mit MCP-Submodul
│   └── mcp.rs
├── gemini.rs           # Gemini (nutzt ACP)
├── qwen.rs             # Qwen (nutzt ACP)
├── opencode.rs         # Opencode (nutzt ACP)
├── amp.rs              # Amp Executor
├── droid.rs            # Droid mit Session-Forking
│   ├── session.rs
│   └── normalize_logs.rs
└── acp/                # Shared ACP Harness
    ├── mod.rs
    ├── client.rs
    ├── session.rs
    └── normalize_logs.rs
```

### 2. Implementierungsmuster

**Muster A: CLI-Wrapper (einfach)**
- Copilot, Cursor Agent, Amp
- Baut CLI-Command, spawnt Prozess, liest Output

**Muster B: CLI-Wrapper mit ACP**
- Gemini, Qwen, Opencode
- Shared `AcpAgentHarness` für Session-Management

**Muster C: SDK-Integration**
- Claude Code, Codex
- Eigenes Protocol/Client-Modul

**Muster D: Multi-Session**
- Droid
- Session-Forking, Log-Normalisierung

---

## ❓ Proaktive F&A

### Q1: Was ist der Unterschied zwischen CLI-Wrapper und SDK-Integration?

✅ **Antwort:**
- **CLI-Wrapper:** Ruft externes Programm auf (`npx @github/copilot ...`)
- **SDK-Integration:** Kommuniziert direkt über Protokoll (JSON-RPC, etc.)
- CLI-Wrapper sind einfacher, SDK-Integration bietet mehr Kontrolle

### Q2: Wie funktioniert Stream-JSON?

✅ **Antwort:**
```
Executor spawnt CLI → stdout ist stream-json
    ↓
Zeile für Zeile lesen
    ↓
Jede Zeile ist ein JSON-Objekt
    ↓
Parse und verarbeite (Actions, Logs, Status)
```

### Q3: Was ist das ACP-Protokoll?

✅ **Antwort:**
- **A**gent **C**ommunication **P**rotocol
- Verwendet von Gemini, Qwen, Opencode
- Shared Harness in `acp/` Modul
- Unterstützt Session-Forking und Follow-Ups

---

## 📱 Konkrete Beispiele

### Beispiel: Copilot CLI Command

```
🔧 Input:
   CopilotConfig { model: "gpt-5", allow_all_tools: true }

⚙️ CommandBuilder.build_initial():
   npx -y @github/copilot@0.0.367 \
     --model gpt-5 \
     --allow-all-tools \
     --print stream-json

📤 Output:
   {"type":"action","action":"file_write","path":"src/main.rs",...}
   {"type":"log","level":"info","message":"Writing file..."}
   {"type":"done","success":true}
```

### Beispiel: Claude Code mit Plan-Modus

```
🔧 Input:
   ClaudeCodeConfig { plan: true, model: "opus" }

⚙️ CommandBuilder.build_initial():
   npx -y @anthropic-ai/claude-code@2.0.75 \
     --plan \
     --model opus \
     --print stream-json

📤 Plan Output:
   {"type":"plan","steps":["Analyze requirements","Create files","Test"]}
```

---

## 🧩 Komponenten & Implementierung

### 3.1 Trait: `StandardCodingAgentExecutor` **~100 Zeilen**

Zweck: Einheitliche Schnittstelle für alle Executors

**Methoden:**
- `build_initial(prompt, env) → Command` - Erstellt initialen CLI-Befehl
- `build_follow_up(prompt, session_id, env) → Command` - Follow-Up Command
- `get_availability_info() → AvailabilityInfo` - Prüft Verfügbarkeit
- `get_base_agent() → BaseCodingAgent` - Returns enum-Typ
- `get_capabilities() → Vec<BaseAgentCapability>` - Returns Fähigkeiten

### 3.2 Struct: `CommandBuilder` **~150 Zeilen**

Zweck: Baut CLI-Befehle aus Konfiguration

**Konzept:**
- Nimmt Executor-Config und Environment
- Baut Argument-Liste (`--model`, `--plan`, etc.)
- Returns `std::process::Command`

### 3.3 Struct: `ExecutionEnv` **~80 Zeilen**

Zweck: Arbeitsverzeichnis und Umgebungsvariablen

**Felder:**
- `working_directory: PathBuf`
- `env_vars: HashMap<String, String>`

### 3.4 Executor: `ClaudeCode` **~300 Zeilen**

Zweck: Claude Code CLI-Integration

**Submodule:**
- `client.rs` - Protocol Client (~100 Zeilen)
- `protocol.rs` - Stream-JSON Parser (~100 Zeilen)
- `types.rs` - Type Definitions (~50 Zeilen)

### 3.5 Executor: `Codex` **~400 Zeilen**

Zweck: OpenAI Codex AppServer-Integration

**Submodule:**
- `client.rs` - AppServer Client (~150 Zeilen)
- `jsonrpc.rs` - JSON-RPC Handler (~100 Zeilen)
- `session.rs` - Session Management (~100 Zeilen)
- `normalize_logs.rs` - Log Processing (~50 Zeilen)

### 3.6 Executor: `Copilot` **~150 Zeilen**

Zweck: GitHub Copilot CLI-Wrapper

**Einfacher Executor:**
- Kein Submodul nötig
- Direkte CLI-Ausführung
- MCP-Server-Trust aus `mcp_config.rs`

### 3.7 Executor: `CursorAgent` **~200 Zeilen**

Zweck: Cursor Agent CLI-Integration

**Submodule:**
- `mcp.rs` - MCP Trust Management (~80 Zeilen)

### 3.8 Executor: `Gemini` / `Qwen` / `Opencode` **je ~100 Zeilen**

Zweck: ACP-basierte Executors

**Nutzen Shared Harness:**
- `acp/mod.rs` - Harness Implementation (~150 Zeilen)
- `acp/client.rs` - ACP Client (~100 Zeilen)
- `acp/session.rs` - Session Management (~100 Zeilen)

### 3.9 Executor: `Droid` **~350 Zeilen**

Zweck: Multi-Provider Executor mit Session-Forking

**Submodule:**
- `session.rs` - Session Fork/Resume (~150 Zeilen)
- `normalize_logs.rs` - Log Normalization (~100 Zeilen)

### 3.10 Executor: `Amp` **~100 Zeilen**

Zweck: Sourcegraph Amp CLI-Wrapper

**Thread-basiert:**
- `thread_id` für Konversationsfortsetzung

---

## ⚡ Performance & Best Practices

### Performance-Regeln

| Regel | Beschreibung |
|-------|-------------|
| **Lazy Spawning** | Prozess erst bei Bedarf starten |
| **Stream Processing** | Zeile für Zeile verarbeiten, nicht buffern |
| **Cleanup** | Prozesse bei Abbruch sauber beenden |

### Error Handling

- `anyhow::Result` für Executor-Methoden
- Graceful degradation bei fehlenden CLIs
- Timeout-Handling für hängende Prozesse

---

## 🔄 Code-Wiederverwendung

### Shared Components

| Komponente | Genutzt von |
|------------|-------------|
| `AcpAgentHarness` | Gemini, Qwen, Opencode |
| `CommandBuilder` | Alle CLI-basierten Executors |
| `mcp_config.rs` | Copilot, Cursor |
| `normalize_logs` | Codex, Droid |

### Derive Macros

Alle Executor-Structs nutzen:
```rust
#[derive(Debug, Clone, Serialize, Deserialize, TS, JsonSchema)]
```

---

## 📚 Dokumentation & Weiterführende Phasen

### Nächste Schritte

- **Phase 4:** Profil-System - Wie Configs in Profile organisiert werden
- **Phase 5:** API-Routen - REST-Endpoints für Executors

### Wichtige Rust Crates

| Crate | Zweck |
|-------|-------|
| `serde` | Serialisierung |
| `schemars` | JSON-Schema-Generierung |
| `ts-rs` | TypeScript-Type-Generierung |
| `tokio` | Async Runtime |
| `anyhow` | Error Handling |

---

## ✅ Abschlusskriterien für diese Phase

- [ ] Alle Executor-Module aufgelistet
- [ ] Trait-Definition dokumentiert
- [ ] Implementierungsmuster beschrieben
- [ ] Shared Components identifiziert
- [ ] Performance-Regeln formuliert

---

*Referenz: `shared-docs/ai-integration/00-GLOBAL-ORCHESTRATOR.md`*
