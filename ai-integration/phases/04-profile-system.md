# 📋 Phase 4: Profil-System

> **ULTRATHINK** - Diese Phase beschreibt das Profil- und Varianten-System für Executor-Konfigurationen.

---

## 📌 Status

- **Phase:** 4 von 9
- **Dokumentation:** 📝 DOKUMENTIERT
- **Implementierung:** 🔲 OFFEN (für neues Projekt)
- **Priorität:** 2 (nach Executor-Implementierung)
- **Verifiziert:** ✅ Gegen `profile.rs` und `default_profiles.json` geprüft
- **Referenziert von:** `00-GLOBAL-ORCHESTRATOR.md`

---

## 🎯 Ziel dieser Phase

Dokumentation des **Profil-Systems**:
- Profile und Varianten
- Default-Konfigurationen
- User-Overrides
- Merge-Logik

---

## 🚀 Strategie & Konzepte

### 1. Profil-Hierarchie

```
┌─────────────────────────────────────────┐
│ default_profiles.json (eingebettet)      │
│ → Standard-Konfigurationen pro Provider  │
└─────────────────────┬───────────────────┘
                      │ Merge
                      ▼
┌─────────────────────────────────────────┐
│ ~/.vibe-kanban/profiles.json (User)      │
│ → Benutzerdefinierte Overrides           │
└─────────────────────┬───────────────────┘
                      │ Merge
                      ▼
┌─────────────────────────────────────────┐
│ ExecutorConfigs (Runtime)                │
│ → Finale Konfiguration im Speicher       │
└─────────────────────────────────────────┘
```

### 2. Kernkonzepte

| Konzept | Beschreibung |
|---------|-------------|
| **ExecutorProfileId** | Identifikator: `{executor, variant}` |
| **Variante** | Benannte Konfiguration (DEFAULT, OPUS, PLAN) |
| **ExecutorConfig** | Map von Varianten-Namen zu CodingAgent |
| **ExecutorConfigs** | Map von BaseCodingAgent zu ExecutorConfig |

---

## ❓ Proaktive F&A

### Q1: Was passiert, wenn keine Variante angegeben wird?

✅ **Antwort:**
- System verwendet `DEFAULT` Variante
- Jeder Provider MUSS eine DEFAULT-Variante haben
- Fallback auf Embedded-Defaults wenn User-Profile fehlt

### Q2: Wie erstelle ich eine neue Variante?

✅ **Antwort:**
1. Frontend: AgentSettings → Create Configuration Dialog
2. Name eingeben (wird zu SCREAMING_SNAKE_CASE)
3. Konfiguration im Form bearbeiten
4. Speichern → Schreibt in User-Profiles

### Q3: Können User die Defaults überschreiben?

✅ **Antwort:**
- Ja! User-Profiles überschreiben Embedded-Defaults
- Partial Overrides möglich (nur geänderte Felder)
- Reset möglich durch Löschen des User-Profile-Eintrags

---

## 📱 Konkrete Beispiele

### Beispiel: ExecutorProfileId

```
User wählt: "Claude Code" + "OPUS"
    ↓
ExecutorProfileId {
    executor: BaseCodingAgent::CLAUDE_CODE,
    variant: Some("OPUS")
}
    ↓
System lädt: ExecutorConfigs.executors["CLAUDE_CODE"]["OPUS"]
    ↓
CodingAgent::ClaudeCode { model: "opus", ... }
```

### Beispiel: Merge-Logik

```json
// default_profiles.json (embedded)
{
  "CLAUDE_CODE": {
    "DEFAULT": {"CLAUDE_CODE": {"dangerously_skip_permissions": true}}
  }
}

// ~/.vibe-kanban/profiles.json (user)
{
  "CLAUDE_CODE": {
    "DEFAULT": {"CLAUDE_CODE": {"model": "opus"}},
    "FAST": {"CLAUDE_CODE": {"model": "haiku"}}
  }
}

// Runtime Result (merged)
{
  "CLAUDE_CODE": {
    "DEFAULT": {"CLAUDE_CODE": {"model": "opus", "dangerously_skip_permissions": true}},
    "FAST": {"CLAUDE_CODE": {"model": "haiku"}}
  }
}
```

---

## 🧩 Komponenten & Implementierung

### 4.1 Struct: `ExecutorProfileId` **~50 Zeilen**

Zweck: Eindeutiger Identifikator für Profil+Variante

**Felder:**
- `executor: BaseCodingAgent` - Enum-Wert des Providers
- `variant: Option<String>` - Varianten-Name oder None für DEFAULT

**Methoden:**
- `canonical_variant()` - Normalisiert zu SCREAMING_SNAKE_CASE
- `get_coding_agent(configs)` - Lädt CodingAgent aus Configs

### 4.2 Struct: `ExecutorConfig` **~30 Zeilen**

Zweck: Map von Varianten zu Konfigurationen

**Typ:**
```rust
pub struct ExecutorConfig {
    pub configurations: HashMap<String, CodingAgent>
}
```

### 4.3 Struct: `ExecutorConfigs` **~150 Zeilen**

Zweck: Haupt-Container für alle Provider-Konfigurationen

**Felder:**
- `executors: HashMap<BaseCodingAgent, ExecutorConfig>`

**Methoden:**
- `from_defaults()` - Lädt Embedded-Defaults
- `from_file(path)` - Lädt User-Profiles
- `merge(other)` - Merged zwei Configs
- `get_coding_agent(profile_id)` - Holt spezifische Config
- `get_cached()` - Cached Singleton (LazyLock)

### 4.4 File: `default_profiles.json` **~200 Zeilen**

Zweck: Embedded Default-Konfigurationen

**Struktur:**
- Pro Provider: Map von Varianten-Namen zu Config
- Mindestens DEFAULT pro Provider
- Zusätzliche Varianten für häufige Use-Cases

---

## ⚡ Performance & Best Practices

### Caching-Strategie

```rust
static CACHED_CONFIGS: LazyLock<ExecutorConfigs> = LazyLock::new(|| {
    let defaults = ExecutorConfigs::from_defaults();
    if let Ok(user) = ExecutorConfigs::from_file(user_path()) {
        defaults.merge(user)
    } else {
        defaults
    }
});
```

### Canonical Key Normalisierung

```rust
pub fn canonical_key(s: &str) -> String {
    s.to_uppercase()
     .replace("-", "_")
     .replace(" ", "_")
}
// "my variant" → "MY_VARIANT"
```

---

## 🔄 Code-Wiederverwendung

### Serialisierung

Alle Profil-Structs nutzen:
```rust
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
```

### TypeScript-Generierung

Generierte Types in `shared/types.ts`:
- `ExecutorProfileId`
- `ExecutorConfig`
- `ExecutorConfigs`

---

## 📚 Weiterführende Phasen

### Nächste Schritte

- **Phase 5:** API-Routen - REST-Endpoints für Profile-Management
- **Phase 6:** Frontend - UI für Profil-Verwaltung

### Dateipfade

| Datei | Zweck |
|-------|-------|
| `crates/executors/src/profile.rs` | Profil-Implementierung |
| `crates/executors/default_profiles.json` | Embedded Defaults |
| `~/.vibe-kanban/profiles.json` | User Overrides |

---

## ✅ Abschlusskriterien für diese Phase

- [ ] Profile-Hierarchie dokumentiert
- [ ] Merge-Logik beschrieben
- [ ] Structs und Methoden aufgelistet
- [ ] Caching-Strategie erklärt
- [ ] Beispiele für Varianten vorhanden

---

*Referenz: `shared-docs/ai-integration/00-GLOBAL-ORCHESTRATOR.md`*
