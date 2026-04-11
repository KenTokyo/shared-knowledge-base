# 🏗️ Phase 1: Architektur-Übersicht

> **ULTRATHINK** - Diese Phase beschreibt die Gesamtarchitektur des KI-Provider-Integrationssystems.

---

## 📌 Status

- **Phase:** 1 von 9
- **Dokumentation:** 📝 DOKUMENTIERT
- **Typ:** Referenz-Dokumentation (keine Implementierung nötig)
- **Verifiziert:** ✅ Gegen echten Code geprüft
- **Referenziert von:** `00-GLOBAL-ORCHESTRATOR.md`

---

## 🎯 Ziel dieser Phase

Verstehen und dokumentieren der **Gesamtarchitektur** für die KI-Provider-Integration:
- Wie die Schichten zusammenarbeiten
- Datenfluss von UI bis zum externen Provider
- Designprinzipien und Erweiterbarkeit

---

## 🚀 Strategie & Architekturprinzipien

### 1. Schichten-Architektur (Layer Architecture)

Das System besteht aus **5 Hauptschichten**:

```
┌─────────────────────────────────────────┐
│ 1. KONFIGURATION LAYER                   │
│    → Profile, Varianten, Defaults        │
├─────────────────────────────────────────┤
│ 2. EXECUTOR LAYER                        │
│    → Provider-spezifische Logik          │
├─────────────────────────────────────────┤
│ 3. SERVER LAYER                          │
│    → REST APIs, Task-Management          │
├─────────────────────────────────────────┤
│ 4. FRONTEND LAYER                        │
│    → UI-Komponenten, RJSF-Forms          │
├─────────────────────────────────────────┤
│ 5. SHARED TYPES LAYER                    │
│    → Auto-generierte TypeScript Types    │
└─────────────────────────────────────────┘
```

### 2. Designprinzipien

| Prinzip | Beschreibung |
|---------|-------------|
| **Plugin-Architektur** | Neue Provider durch Hinzufügen einer Executor-Datei |
| **Schema-First** | Konfiguration über JSON-Schemas definiert |
| **Type-Safety** | Rust → TypeScript Auto-Generierung |
| **CLI-Wrapper** | Externe CLIs werden gewrappt, nicht reimplementiert |
| **Profile-basiert** | Konfigurationen als benannte Profile (Varianten) |

---

## ❓ Proaktive F&A & Edge-Cases

### Q1: Wie füge ich einen neuen KI-Provider hinzu?

✅ **Antwort:**
1. Neue Executor-Datei in `crates/executors/src/executors/` erstellen
2. Struct mit `#[derive(JsonSchema)]` definieren
3. In `mod.rs` zum `CodingAgent` Enum hinzufügen
4. Default-Profile in `default_profiles.json` definieren
5. `pnpm run generate-types` ausführen → Schema und Types werden generiert
6. Frontend erkennt automatisch den neuen Provider!

### Q2: Was passiert, wenn ein Provider nicht installiert ist?

✅ **Antwort:**
- Jeder Executor implementiert `get_availability_info()`
- Returns: `LoginDetected`, `InstallationFound`, oder `NotFound`
- Frontend zeigt Status über `AgentAvailabilityIndicator`
- User kann trotzdem konfigurieren (für späteren Gebrauch)

### Q3: Wie werden verschiedene Modelle pro Provider unterstützt?

✅ **Antwort:**
- Jeder Executor hat optionales `model: Option<String>` Feld
- Varianten im Profile-System: `DEFAULT`, `GPT_5`, `OPUS`, etc.
- CLI-Parameter werden zur Laufzeit gebaut: `--model gpt-5`

### Q4: Wie funktioniert die Authentifizierung?

✅ **Antwort:**
- **Keine zentrale Key-Speicherung** im System
- Provider verwalten Keys selbst (Environment, Home-Directory)
- System prüft nur Verfügbarkeit, speichert keine Secrets

---

## 📱 Datenfluss: Konkrete Beispiele

### Beispiel: Task mit Claude Code erstellen

```
🖥️ User: Wählt "Claude Code" + "OPUS" Variante
    ↓
📤 Frontend: Sendet ExecutorProfileId {executor: "CLAUDE_CODE", variant: "OPUS"}
    ↓
🔧 Backend: Lädt Profile → CodingAgent::ClaudeCode {model: "opus", ...}
    ↓
⚙️ Executor: CommandBuilder erstellt:
   "npx -y @anthropic-ai/claude-code@2.0.75 --model opus --print stream-json"
    ↓
📡 CLI: Spawnt Prozess, liest stdin, schreibt stdout
    ↓
📊 Backend: Parst Stream-JSON, normalisiert Logs
    ↓
🖥️ Frontend: Zeigt Live-Output an
✅ Task abgeschlossen!
```

### Beispiel: Konfiguration ändern

```
🖥️ User: Öffnet AgentSettings → Wählt "DROID"
    ↓
📋 Frontend: Lädt JSON-Schema für Droid (via virtual:executor-schemas)
    ↓
📝 RJSF: Generiert Form automatisch aus Schema
    ↓
🖥️ User: Ändert "autonomy" auf "full-auto", setzt "model" auf "gpt-5.1"
    ↓
💾 Frontend: PUT /config/profiles mit neuer Konfiguration
    ↓
📂 Backend: Speichert in ~/.vibe-kanban/profiles.json
    ↓
🔄 Next Task: Verwendet neue Konfiguration
✅ Konfiguration angewendet!
```

---

## ⚡ Performance & Erweiterbarkeit

### Performance-Aspekte

| Aspekt | Optimierung |
|--------|-------------|
| **Schema-Laden** | Schemas werden zur Build-Zeit in Vite-Bundle gepackt |
| **Profile-Caching** | `ExecutorConfigs::get_cached()` mit LazyLock |
| **CLI-Startup** | `npx -y` cached Packages nach erstem Aufruf |
| **Stream-Processing** | JSON wird zeilenweise geparsed, nicht gebuffert |

### Erweiterbarkeit

- **Neuer Provider:** ~200-400 Zeilen Rust (Executor + Config)
- **Neue Variante:** JSON-Eintrag in `default_profiles.json`
- **UI-Anpassung:** Custom RJSF-Widget in `components/rjsf/`

---

## 🧩 Komponenten-Übersicht (High-Level)

### Backend (Rust)

| Komponente | Zweck | Geschätzte Zeilen |
|------------|-------|-------------------|
| `profile.rs` | Profile-Verwaltung, ExecutorConfigs | ~300 Zeilen |
| `executors/mod.rs` | CodingAgent Enum, BaseCodingAgent | ~200 Zeilen |
| `executors/*.rs` | Je ein Provider-Executor | ~150-400 Zeilen |
| `traits.rs` | StandardCodingAgentExecutor Trait | ~100 Zeilen |
| `command.rs` | CommandBuilder für CLI | ~150 Zeilen |
| `routes/config.rs` | Config REST-Endpoints | ~200 Zeilen |

### Frontend (React/TypeScript)

| Komponente | Zweck | Geschätzte Zeilen |
|------------|-------|-------------------|
| `AgentSettings.tsx` | Hauptseite für Executor-Verwaltung | ~500 Zeilen |
| `ExecutorConfigForm.tsx` | RJSF-basierte Konfiguration | ~200 Zeilen |
| `AgentSelector.tsx` | Dropdown für Provider-Auswahl | ~100 Zeilen |
| `ConfigSelector.tsx` | Dropdown für Varianten | ~100 Zeilen |
| `AgentAvailabilityIndicator.tsx` | Status-Anzeige | ~80 Zeilen |

### Shared

| Komponente | Zweck | Generiert |
|------------|-------|-----------|
| `types.ts` | TypeScript Interfaces | ✅ Auto |
| `executor-schemas` | JSON-Schemas für Forms | ✅ Auto |

---

## 📚 Dokumentation & Weiterführende Phasen

### Nächste Schritte

Nach dieser Phase folgt:
- **Phase 2:** Detaillierte Provider-Definitionen (alle 9 Provider)
- **Phase 3:** Executor-Implementierung (Rust-Traits, CLI-Integration)

### Abhängigkeiten für Implementierung

Bevor implementiert werden kann, müssen verstanden werden:
1. Rust serde/schemars für JSON-Schema-Generierung
2. React JSON Schema Form (RJSF) für dynamische Forms
3. Stream-JSON Protokoll der KI-CLIs
4. Profile-Merge-Logik (Default + User-Overrides)

---

## ✅ Abschlusskriterien für diese Phase

- [ ] Architektur-Diagramm erstellt
- [ ] Schichten dokumentiert
- [ ] Datenfluss beschrieben
- [ ] Erweiterbarkeit erklärt
- [ ] Komponenten-Übersicht vorhanden

---

*Referenz: `shared-docs/ai-integration/00-GLOBAL-ORCHESTRATOR.md`*
