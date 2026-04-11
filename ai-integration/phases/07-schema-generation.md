# 🔧 Phase 7: Schema-Generierung

> **ULTRATHINK** - Diese Phase beschreibt die automatische Generierung von JSON-Schemas und TypeScript-Types aus Rust.

---

## 📌 Status

- **Phase:** 7 von 9
- **Dokumentation:** 📝 DOKUMENTIERT
- **Implementierung:** 🔲 OFFEN (für neues Projekt)
- **Priorität:** 3 (nach Profil-System)
- **Verifiziert:** ✅ Generierungs-Pipeline geprüft
- **Referenziert von:** `00-GLOBAL-ORCHESTRATOR.md`

---

## 🎯 Ziel dieser Phase

Dokumentation der **Schema-Generierung**:
- JSON-Schema aus Rust via schemars
- TypeScript Types via ts-rs
- Vite Plugin für Build-Integration
- RJSF Form-Generierung

---

## 🚀 Strategie & Generierungs-Pipeline

### Generierungs-Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. RUST STRUCTS                                          │
│                                                          │
│    #[derive(Serialize, Deserialize, TS, JsonSchema)]     │
│    pub struct ClaudeCode {                               │
│        pub model: Option<String>,                        │
│        pub plan: bool,                                   │
│    }                                                     │
└─────────────────────────┬───────────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
┌─────────────────────┐       ┌─────────────────────────┐
│ 2A. TS-RS                   │ 2B. SCHEMARS            │
│                     │       │                         │
│ Generiert           │       │ Generiert               │
│ TypeScript Types    │       │ JSON-Schemas            │
│                     │       │                         │
│ → shared/types.ts   │       │ → executor-schemas.json │
└──────────┬──────────┘       └────────────┬────────────┘
           │                               │
           ▼                               ▼
┌─────────────────────────────────────────────────────────┐
│ 3. FRONTEND                                              │
│                                                          │
│    types.ts                    Vite Plugin               │
│    ↓                           ↓                         │
│    Type-Safety                 RJSF Forms                │
│    in Components               auto-generiert            │
└─────────────────────────────────────────────────────────┘
```

### Verwendete Crates

| Crate | Zweck |
|-------|-------|
| `serde` | Serialisierung/Deserialisierung |
| `schemars` | JSON-Schema-Generierung |
| `ts-rs` | TypeScript-Type-Generierung |

---

## ❓ Proaktive F&A

### Q1: Wie füge ich ein neues Feld zu einem Executor hinzu?

✅ **Antwort:**
1. Feld in Rust Struct hinzufügen
2. `#[serde(default)]` für optionale Felder
3. `pnpm run generate-types` ausführen
4. Schema und Types werden automatisch aktualisiert
5. RJSF Form zeigt neues Feld automatisch an!

### Q2: Wie kann ich Custom-Validierung hinzufügen?

✅ **Antwort:**
- Schemars-Attribute: `#[schemars(regex = "...")]`
- Enum-Constraints: `#[serde(rename_all = "snake_case")]`
- Min/Max: `#[schemars(range(min = 0, max = 100))]`

### Q3: Warum virtuelles Modul statt statischer Import?

✅ **Antwort:**
- Schemas können groß sein (~100KB)
- Vite Plugin lädt nur was gebraucht wird
- Tree-Shaking für Production Build
- Hot-Reload in Development

---

## 📱 Konkrete Beispiele

### Beispiel: Rust Struct → JSON-Schema

```rust
// Rust Definition
#[derive(Debug, Clone, Serialize, Deserialize, TS, JsonSchema)]
#[ts(export)]
pub struct ClaudeCode {
    #[schemars(description = "Model to use (opus, sonnet, haiku)")]
    pub model: Option<String>,

    #[serde(default)]
    pub dangerously_skip_permissions: bool,

    #[serde(default)]
    pub plan: bool,
}
```

```json
// Generiertes JSON-Schema
{
  "type": "object",
  "properties": {
    "model": {
      "type": ["string", "null"],
      "description": "Model to use (opus, sonnet, haiku)"
    },
    "dangerously_skip_permissions": {
      "type": "boolean",
      "default": false
    },
    "plan": {
      "type": "boolean",
      "default": false
    }
  }
}
```

### Beispiel: Generierte TypeScript Types

```typescript
// shared/types.ts (auto-generiert)
export interface ClaudeCode {
  model?: string | null;
  dangerously_skip_permissions: boolean;
  plan: boolean;
}

export type CodingAgent =
  | { CLAUDE_CODE: ClaudeCode }
  | { CODEX: Codex }
  | { COPILOT: Copilot }
  // ...
```

---

## 🧩 Komponenten & Implementierung

### 7.1 Script: `generate_types.rs` **~200 Zeilen**

Zweck: Haupt-Generierungsskript

**Ablauf:**
1. Rust Structs mit `#[derive(TS)]` finden
2. ts-rs Bindings generieren → `shared/types.ts`
3. schemars Schemas generieren → Eingebettet in Vite Plugin
4. Optional: Schema-JSON-Datei für Debugging

**Ausführung:**
```bash
pnpm run generate-types
# → cargo run --bin generate_types
```

### 7.2 Vite Plugin: `executor-schemas.ts` **~100 Zeilen**

Zweck: Stellt Schemas als virtuelles Modul bereit

**Implementierung:**
- Lädt Schemas zur Build-Zeit
- Exponiert als `virtual:executor-schemas`
- TypeScript-Deklaration in `virtual-executor-schemas.d.ts`

**Verwendung im Frontend:**
```typescript
import schemas from 'virtual:executor-schemas';

const claudeSchema = schemas.CLAUDE_CODE;
// → JSON-Schema für ClaudeCode
```

### 7.3 Type Declaration: `virtual-executor-schemas.d.ts` **~30 Zeilen**

Zweck: TypeScript-Typen für virtuelles Modul

```typescript
declare module 'virtual:executor-schemas' {
  import { JSONSchema7 } from 'json-schema';

  const schemas: {
    CLAUDE_CODE: JSONSchema7;
    CODEX: JSONSchema7;
    COPILOT: JSONSchema7;
    // ... weitere
  };

  export default schemas;
}
```

### 7.4 RJSF Integration **~50 Zeilen**

Zweck: Schema → React Form

**In ExecutorConfigForm:**
```typescript
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import schemas from 'virtual:executor-schemas';

function ExecutorConfigForm({ agent, config, onChange }) {
  const schema = schemas[agent];

  return (
    <Form
      schema={schema}
      formData={config}
      onChange={(e) => onChange(e.formData)}
      validator={validator}
      widgets={customWidgets}
    />
  );
}
```

---

## ⚡ Performance & Best Practices

### Schema-Caching

```typescript
// Schemas werden einmal geladen und gecached
const schemaCache = new Map<BaseCodingAgent, JSONSchema7>();

function getSchema(agent: BaseCodingAgent): JSONSchema7 {
  if (!schemaCache.has(agent)) {
    schemaCache.set(agent, schemas[agent]);
  }
  return schemaCache.get(agent)!;
}
```

### Validierung

```typescript
// AJV8 für schnelle Runtime-Validierung
import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

const validate = ajv.compile(schema);
const valid = validate(config);
if (!valid) console.error(validate.errors);
```

---

## 🔄 Derive Macros erklärt

### Erforderliche Derives

```rust
#[derive(
    Debug,           // Debug-Ausgabe
    Clone,           // Klonbar
    Serialize,       // → JSON
    Deserialize,     // ← JSON
    TS,              // → TypeScript
    JsonSchema,      // → JSON-Schema
)]
```

### Serde-Attribute

| Attribut | Effekt |
|----------|--------|
| `#[serde(default)]` | Feld optional mit Default-Wert |
| `#[serde(rename = "...")]` | Umbenennung in JSON |
| `#[serde(skip_serializing_if = "Option::is_none")]` | Null-Felder weglassen |
| `#[serde(rename_all = "camelCase")]` | Naming Convention |

### Schemars-Attribute

| Attribut | Effekt |
|----------|--------|
| `#[schemars(description = "...")]` | Feld-Beschreibung |
| `#[schemars(title = "...")]` | Feld-Titel |
| `#[schemars(example = "...")]` | Beispielwert |
| `#[schemars(regex = "...")]` | Pattern-Validierung |

---

## 📚 Weiterführende Phasen

- **Phase 6:** Frontend-Komponenten - Wie Schemas konsumiert werden
- **Phase 3:** Executor-Implementierung - Wo Derives verwendet werden

### Befehle

| Befehl | Zweck |
|--------|-------|
| `pnpm run generate-types` | Types und Schemas generieren |
| `pnpm run generate-types:check` | CI-Check (keine Änderungen?) |

---

## ✅ Abschlusskriterien für diese Phase

- [ ] Generierungs-Pipeline dokumentiert
- [ ] Rust Derives erklärt
- [ ] Vite Plugin beschrieben
- [ ] RJSF Integration aufgezeigt
- [ ] Beispiele für Schema-Generierung

---

*Referenz: `shared-docs/ai-integration/00-GLOBAL-ORCHESTRATOR.md`*
