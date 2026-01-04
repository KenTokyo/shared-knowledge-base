# 🌐 Phase 5: API-Routen

> **ULTRATHINK** - Diese Phase beschreibt die REST-API-Endpoints für Konfiguration und Task-Ausführung.

---

## 📌 Status

- **Phase:** 5 von 9
- **Dokumentation:** 📝 DOKUMENTIERT
- **Implementierung:** 🔲 OFFEN (für neues Projekt)
- **Priorität:** 4 (nach Schema-Generierung)
- **Verifiziert:** ✅ Gegen Server-Routes geprüft
- **Referenziert von:** `00-GLOBAL-ORCHESTRATOR.md`

---

## 🎯 Ziel dieser Phase

Dokumentation der **REST-API-Endpoints**:
- Config-Endpoints (Profile-Verwaltung)
- Task-Endpoints (Executor-Ausführung)
- Agent-Availability-Check
- MCP-Server-Konfiguration

---

## 🚀 API-Übersicht

### Endpoint-Gruppen

| Gruppe | Prefix | Zweck |
|--------|--------|-------|
| **Config** | `/config/*` | Profile und Einstellungen |
| **Tasks** | `/tasks/*` | Task-Erstellung und -Ausführung |
| **Agents** | `/agents/*` | Verfügbarkeitsprüfung |

---

## 📋 Config-Endpoints

### GET /config/info

**Zweck:** Lädt Systeminfo inkl. verfügbarer Provider

**Response:**
```typescript
interface UserSystemInfo {
  profiles: ExecutorConfigs;
  default_executor_profile: ExecutorProfileId;
  capabilities: Record<BaseCodingAgent, BaseAgentCapability[]>;
}
```

### GET /config/profiles

**Zweck:** Lädt alle Executor-Profile

**Response:** `ExecutorConfigs`

### PUT /config/profiles

**Zweck:** Speichert Executor-Profile

**Request Body:** `ExecutorConfigs`

**Speicherort:** `~/.vibe-kanban/profiles.json`

### GET /config/mcp-config

**Zweck:** Lädt MCP-Server-Konfiguration

**Response:**
```typescript
interface McpConfig {
  servers: Record<string, McpServerConfig>;
}
```

### POST /config/mcp-config

**Zweck:** Aktualisiert MCP-Server-Konfiguration

**Request Body:** `McpConfig`

---

## 📋 Task-Endpoints

### POST /tasks/workspace

**Zweck:** Startet neuen Task mit Executor

**Request Body:**
```typescript
interface StartWorkspaceRequest {
  executor_profile_id: ExecutorProfileId;
  prompt: string;
  workspace_path: string;
}
```

**Response:**
```typescript
interface StartWorkspaceResponse {
  task_id: string;
  execution_process_id: string;
}
```

**Ablauf:**
1. ExecutorConfigs laden
2. CodingAgent aus Profile holen
3. CommandBuilder erstellt CLI-Befehl
4. Subprocess spawnen
5. Stream-JSON lesen und in Logs speichern

### GET /tasks/{task_id}/logs

**Zweck:** Holt Logs für laufenden/abgeschlossenen Task

**Response:** Stream von Log-Events

### POST /tasks/{task_id}/follow-up

**Zweck:** Sendet Follow-Up an bestehende Session

**Request Body:**
```typescript
interface FollowUpRequest {
  prompt: string;
  session_id: string;
}
```

---

## 📋 Agent-Endpoints

### GET /agents/check-availability

**Zweck:** Prüft Verfügbarkeit eines Agents

**Query Parameters:** `executor=CLAUDE_CODE`

**Response:**
```typescript
type AvailabilityInfo =
  | { type: "LoginDetected", last_auth_timestamp: number }
  | { type: "InstallationFound" }
  | { type: "NotFound" };
```

**Prüft je nach Provider:**
- Claude Code: Environment Variable vorhanden
- Gemini: OAuth-Credentials in ~/.gemini/
- Cursor: CURSOR_API_KEY oder Login-Status
- Copilot: GitHub CLI authentifiziert

---

## ❓ Proaktive F&A

### Q1: Wie werden Profile persistiert?

✅ **Antwort:**
- `PUT /config/profiles` schreibt JSON in User-Home
- Pfad: `~/.vibe-kanban/profiles.json`
- Merge mit Defaults bei nächstem Laden

### Q2: Was passiert bei ungültigem Profile?

✅ **Antwort:**
- Server validiert gegen JSON-Schema
- 400 Bad Request bei Validierungsfehler
- Detaillierte Fehlermeldung zurück

### Q3: Wie funktioniert das Streaming der Logs?

✅ **Antwort:**
- Server-Sent Events (SSE) für Echtzeit
- Jeder Log-Eintrag als Event
- Client subscribed und rendert live

---

## 📱 Konkrete Beispiele

### Beispiel: Task starten

```
🖥️ Frontend: User klickt "Start Task"
    ↓
📤 POST /tasks/workspace
   {
     "executor_profile_id": {
       "executor": "CLAUDE_CODE",
       "variant": "OPUS"
     },
     "prompt": "Create a REST API",
     "workspace_path": "/home/user/project"
   }
    ↓
🔧 Backend:
   1. ExecutorConfigs.get_cached()
   2. profile_id.get_coding_agent(configs)
   3. ClaudeCode { model: "opus", ... }
   4. CommandBuilder.build_initial()
   5. Spawn: npx -y @anthropic-ai/claude-code...
    ↓
📥 Response:
   { "task_id": "abc123", "execution_process_id": "xyz789" }
    ↓
🔄 Frontend: Subscribed to logs via SSE
```

### Beispiel: Verfügbarkeit prüfen

```
📤 GET /agents/check-availability?executor=GEMINI
    ↓
🔧 Backend: Gemini::get_availability_info()
   - Prüft ~/.gemini/oauth_creds.json
   - Prüft ~/.gemini/installation_id
    ↓
📥 Response:
   { "type": "LoginDetected", "last_auth_timestamp": 1704326400 }
```

---

## 🧩 Komponenten & Implementierung

### 5.1 Module: `routes/config.rs` **~200 Zeilen**

Zweck: Config-bezogene Endpoints

**Endpoints:**
- `get_config_info()` - UserSystemInfo laden
- `get_profiles()` - Profile abrufen
- `put_profiles()` - Profile speichern
- `get_mcp_config()` - MCP-Config abrufen
- `post_mcp_config()` - MCP-Config speichern

### 5.2 Module: `routes/tasks.rs` **~300 Zeilen**

Zweck: Task-Ausführungs-Endpoints

**Endpoints:**
- `start_workspace()` - Neuen Task starten
- `get_task_logs()` - Logs abrufen (SSE)
- `post_follow_up()` - Follow-Up senden

### 5.3 Handler-Logik **~150 Zeilen**

Zweck: Gemeinsame Logik für Endpoints

**Funktionen:**
- `spawn_executor()` - Startet Executor-Prozess
- `stream_logs()` - SSE-Stream aufbauen
- `validate_profile()` - Schema-Validierung

---

## ⚡ Performance & Best Practices

### Async Processing

```rust
// Nicht blockierend: Subprocess wird async gehandled
tokio::spawn(async move {
    let output = process.wait_with_output().await?;
    // Process logs
});
```

### Error Handling

| Status | Bedeutung |
|--------|-----------|
| 200 | Erfolg |
| 400 | Ungültige Request-Daten |
| 404 | Profile/Task nicht gefunden |
| 500 | Server-Fehler |

### CORS

```rust
.layer(CorsLayer::permissive()) // Development
.layer(CorsLayer::new().allow_origin(...)) // Production
```

---

## 🔄 Integration

### Frontend-Aufruf

```typescript
// api.ts
export async function startTask(
  profileId: ExecutorProfileId,
  prompt: string,
  workspace: string
): Promise<StartWorkspaceResponse> {
  return fetch('/tasks/workspace', {
    method: 'POST',
    body: JSON.stringify({ executor_profile_id: profileId, prompt, workspace_path: workspace })
  }).then(r => r.json());
}
```

---

## 📚 Weiterführende Phasen

- **Phase 6:** Frontend-Komponenten - Wie diese APIs konsumiert werden
- **Phase 8:** Authentifizierung - Detaillierte Auth-Flows

---

## ✅ Abschlusskriterien für diese Phase

- [ ] Alle Endpoints dokumentiert
- [ ] Request/Response-Typen definiert
- [ ] Ablauf-Beispiele vorhanden
- [ ] Error-Handling beschrieben
- [ ] Integration mit Frontend skizziert

---

*Referenz: `shared-docs/ai-integration/00-GLOBAL-ORCHESTRATOR.md`*
