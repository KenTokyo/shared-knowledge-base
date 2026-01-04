# 📁 Phase 9: Code-Referenzen

> **ULTRATHINK** - Diese Phase enthält alle relevanten Dateipfade und Code-Strukturen für die KI-Integration.

---

## 📌 Status

- **Phase:** 9 von 9
- **Dokumentation:** 📝 DOKUMENTIERT
- **Typ:** Referenz-Dokumentation (Dateipfade)
- **Verifiziert:** ✅ Alle Pfade gegen echtes Projekt geprüft (2026-01-04)
- **Referenziert von:** `00-GLOBAL-ORCHESTRATOR.md`

---

## 🎯 Ziel dieser Phase

**Vollständige Datei-Referenz** für die Implementierung:
- Alle relevanten Dateien mit Pfaden
- Ordnerstruktur
- Abhängigkeiten zwischen Dateien
- Copy-Ready Struktur für neue Projekte

---

## 📂 Vollständige Ordnerstruktur

```
project-root/
│
├── crates/
│   ├── executors/
│   │   ├── src/
│   │   │   ├── lib.rs                          # Modul-Exports
│   │   │   ├── profile.rs                      # ExecutorConfigs, Profile-Logik
│   │   │   ├── traits.rs                       # StandardCodingAgentExecutor Trait
│   │   │   ├── command.rs                      # CommandBuilder
│   │   │   ├── env.rs                          # ExecutionEnv
│   │   │   ├── approvals.rs                    # Approval Service
│   │   │   ├── mcp_config.rs                   # MCP Server Configuration
│   │   │   │
│   │   │   └── executors/
│   │   │       ├── mod.rs                      # CodingAgent Enum, BaseCodingAgent
│   │   │       │
│   │   │       ├── claude.rs                   # Claude Code Executor
│   │   │       │   ├── client.rs               # Protocol Client
│   │   │       │   ├── protocol.rs             # Stream-JSON
│   │   │       │   └── types.rs                # Types
│   │   │       │
│   │   │       ├── codex.rs                    # Codex Executor
│   │   │       │   ├── client.rs               # AppServer Client
│   │   │       │   ├── jsonrpc.rs              # JSON-RPC
│   │   │       │   ├── session.rs              # Session Handler
│   │   │       │   └── normalize_logs.rs       # Log Processing
│   │   │       │
│   │   │       ├── copilot.rs                  # GitHub Copilot Executor
│   │   │       │
│   │   │       ├── cursor.rs                   # Cursor Agent Executor
│   │   │       │   └── mcp.rs                  # MCP Trust Management
│   │   │       │
│   │   │       ├── gemini.rs                   # Google Gemini Executor
│   │   │       │
│   │   │       ├── qwen.rs                     # Qwen Code Executor
│   │   │       │
│   │   │       ├── opencode.rs                 # Opencode Executor
│   │   │       │
│   │   │       ├── amp.rs                      # Sourcegraph Amp Executor
│   │   │       │
│   │   │       ├── droid.rs                    # Droid Executor
│   │   │       │   ├── session.rs              # Session Forking
│   │   │       │   └── normalize_logs.rs       # Log Normalization
│   │   │       │
│   │   │       └── acp/                        # Shared ACP Harness
│   │   │           ├── mod.rs                  # Harness Implementation
│   │   │           ├── client.rs               # ACP Client
│   │   │           ├── session.rs              # Session Management
│   │   │           └── normalize_logs.rs       # Log Normalization
│   │   │
│   │   ├── default_profiles.json               # Embedded Default Configs
│   │   └── Cargo.toml                          # Crate Dependencies
│   │
│   ├── server/
│   │   └── src/
│   │       ├── routes/
│   │       │   ├── config.rs                   # Config REST Endpoints
│   │       │   └── tasks.rs                    # Task REST Endpoints
│   │       │
│   │       └── bin/
│   │           └── generate_types.rs           # Type Generation Script
│   │
│   └── db/
│       └── migrations/
│           ├── *_executor_sessions.sql         # Executor Sessions Table
│           └── *_execution_processes.sql       # Execution Processes Table
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   └── settings/
│       │       ├── AgentSettings.tsx           # Executor Settings Page
│       │       └── McpSettings.tsx             # MCP Server Settings
│       │
│       ├── components/
│       │   ├── tasks/
│       │   │   ├── AgentSelector.tsx           # Provider Dropdown
│       │   │   └── ConfigSelector.tsx          # Variant Dropdown
│       │   │
│       │   ├── settings/
│       │   │   └── ExecutorProfileSelector.tsx # Combined Selector
│       │   │
│       │   ├── ExecutorConfigForm.tsx          # RJSF Config Form
│       │   ├── AgentAvailabilityIndicator.tsx  # Status Indicator
│       │   │
│       │   ├── dialogs/
│       │   │   └── settings/
│       │   │       ├── CreateConfigurationDialog.tsx
│       │   │       └── DeleteConfigurationDialog.tsx
│       │   │
│       │   └── rjsf/                           # Custom RJSF Widgets
│       │       ├── TextWidget.tsx
│       │       ├── SelectWidget.tsx
│       │       ├── CheckboxWidget.tsx
│       │       └── ArrayFieldTemplate.tsx
│       │
│       ├── hooks/
│       │   ├── useProfiles.ts                  # Profile Management Hook
│       │   └── useAgentAvailability.ts         # Availability Hook
│       │
│       ├── contexts/
│       │   └── ConfigProvider.tsx              # Global Config Context
│       │
│       ├── lib/
│       │   └── api.ts                          # API Client Functions
│       │
│       └── types/
│           └── virtual-executor-schemas.d.ts   # Schema Type Declarations
│
├── vite/
│   └── plugins/
│       └── executor-schemas.ts                 # Vite Plugin for Schemas
│
├── shared/
│   └── types.ts                                # Auto-generated TS Types
│
└── package.json                                # NPM Scripts
```

---

## 📋 Datei-Referenzen nach Kategorie

### Backend: Executor Core

| Datei | Zeilen | Zweck |
|-------|--------|-------|
| `crates/executors/src/profile.rs` | ~300 | ExecutorConfigs, Profile-Logik |
| `crates/executors/src/executors/mod.rs` | ~200 | CodingAgent Enum |
| `crates/executors/src/traits.rs` | ~100 | Executor Trait Definition |
| `crates/executors/src/command.rs` | ~150 | CLI Command Builder |
| `crates/executors/default_profiles.json` | ~200 | Default Configurations |

### Backend: Executor Implementations

| Datei | Zeilen | Zweck |
|-------|--------|-------|
| `crates/executors/src/executors/claude.rs` | ~300 | Claude Code |
| `crates/executors/src/executors/codex.rs` | ~400 | OpenAI Codex |
| `crates/executors/src/executors/copilot.rs` | ~150 | GitHub Copilot |
| `crates/executors/src/executors/cursor.rs` | ~200 | Cursor Agent |
| `crates/executors/src/executors/gemini.rs` | ~100 | Google Gemini |
| `crates/executors/src/executors/droid.rs` | ~350 | Droid Multi-Provider |
| `crates/executors/src/executors/qwen.rs` | ~100 | Qwen Code |
| `crates/executors/src/executors/amp.rs` | ~100 | Sourcegraph Amp |
| `crates/executors/src/executors/opencode.rs` | ~100 | Opencode |
| `crates/executors/src/executors/acp/` | ~350 | Shared ACP Harness |

### Backend: Server Routes

| Datei | Zeilen | Zweck |
|-------|--------|-------|
| `crates/server/src/routes/config.rs` | ~200 | Config Endpoints |
| `crates/server/src/routes/tasks.rs` | ~300 | Task Endpoints |
| `crates/server/src/bin/generate_types.rs` | ~200 | Type Generation |

### Frontend: Components

| Datei | Zeilen | Zweck |
|-------|--------|-------|
| `frontend/src/pages/settings/AgentSettings.tsx` | ~500 | Settings Page |
| `frontend/src/components/ExecutorConfigForm.tsx` | ~200 | RJSF Form |
| `frontend/src/components/tasks/AgentSelector.tsx` | ~100 | Provider Dropdown |
| `frontend/src/components/tasks/ConfigSelector.tsx` | ~100 | Variant Dropdown |
| `frontend/src/components/AgentAvailabilityIndicator.tsx` | ~80 | Status |

### Frontend: Hooks & Context

| Datei | Zeilen | Zweck |
|-------|--------|-------|
| `frontend/src/hooks/useProfiles.ts` | ~80 | Profile Management |
| `frontend/src/hooks/useAgentAvailability.ts` | ~60 | Availability Check |
| `frontend/src/contexts/ConfigProvider.tsx` | ~100 | Global Config |

### Build Tools

| Datei | Zeilen | Zweck |
|-------|--------|-------|
| `vite/plugins/executor-schemas.ts` | ~100 | Schema Vite Plugin |
| `frontend/src/types/virtual-executor-schemas.d.ts` | ~30 | Type Declarations |

### Shared Types

| Datei | Zeilen | Zweck |
|-------|--------|-------|
| `shared/types.ts` | ~500+ | Auto-generated Types |

---

## 🔗 Abhängigkeiten zwischen Dateien

```
                    ┌─────────────────────┐
                    │ default_profiles.json│
                    └──────────┬──────────┘
                               │ loads
                               ▼
                    ┌─────────────────────┐
                    │    profile.rs       │
                    │  (ExecutorConfigs)  │
                    └──────────┬──────────┘
                               │ uses
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │ claude.rs   │    │ codex.rs    │    │   ...       │
    │ (Executor)  │    │ (Executor)  │    │ (Executors) │
    └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
           │                  │                  │
           └──────────────────┼──────────────────┘
                              │ implements
                              ▼
                    ┌─────────────────────┐
                    │     traits.rs       │
                    │ (StandardExecutor)  │
                    └──────────┬──────────┘
                               │ used by
                               ▼
                    ┌─────────────────────┐
                    │   routes/tasks.rs   │
                    │  (Task Execution)   │
                    └──────────┬──────────┘
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │     api.ts          │
                    │  (Frontend Client)  │
                    └──────────┬──────────┘
                               │ calls
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │AgentSettings│    │AgentSelector│    │ConfigForm   │
    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## 🚀 Schnellstart: Neue Integration

### Minimale Dateien für neuen Provider

1. **Rust Executor:** `crates/executors/src/executors/new_provider.rs`
2. **Mod.rs Update:** `CodingAgent::NewProvider(NewProvider)` hinzufügen
3. **Default Profile:** Eintrag in `default_profiles.json`
4. **Generate:** `pnpm run generate-types`

### Minimale Dateien für Frontend-Only

1. **Types:** `shared/types.ts` (generiert)
2. **Hooks:** `useProfiles.ts`, `useAgentAvailability.ts`
3. **Components:** `AgentSelector.tsx`, `ConfigSelector.tsx`
4. **Page:** `AgentSettings.tsx`

---

## 📦 NPM Dependencies (Frontend)

```json
{
  "@rjsf/core": "^5.x",
  "@rjsf/validator-ajv8": "^5.x",
  "@rjsf/utils": "^5.x"
}
```

## 📦 Cargo Dependencies (Backend)

```toml
[dependencies]
serde = { version = "1.0", features = ["derive"] }
schemars = "0.8"
ts-rs = "7.x"
tokio = { version = "1.0", features = ["full"] }
anyhow = "1.0"
```

---

## ✅ Abschlusskriterien für diese Phase

- [ ] Vollständige Ordnerstruktur dokumentiert
- [ ] Alle Dateien mit Zeilen/Zweck aufgelistet
- [ ] Abhängigkeiten visualisiert
- [ ] Schnellstart-Anleitung vorhanden
- [ ] NPM/Cargo Dependencies referenziert

---

*Referenz: `shared-docs/ai-integration/00-GLOBAL-ORCHESTRATOR.md`*
