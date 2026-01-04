# 🖥️ Phase 6: Frontend-Komponenten

> **ULTRATHINK** - Diese Phase beschreibt die React-Komponenten für die KI-Provider-UI.

---

## 📌 Status

- **Phase:** 6 von 9
- **Dokumentation:** 📝 DOKUMENTIERT
- **Implementierung:** 🔲 OFFEN (für neues Projekt)
- **Priorität:** 5 (zuletzt implementieren)
- **Verifiziert:** ✅ Komponenten-Pfade geprüft
- **Referenziert von:** `00-GLOBAL-ORCHESTRATOR.md`

---

## 🎯 Ziel dieser Phase

Dokumentation der **Frontend-Komponenten**:
- Provider-Selektion (AgentSelector)
- Varianten-Selektion (ConfigSelector)
- Konfigurationsformular (ExecutorConfigForm)
- Verfügbarkeitsanzeige (AgentAvailabilityIndicator)
- Verwaltungsseite (AgentSettings)

---

## 🚀 Komponenten-Hierarchie

```
┌─ App ─────────────────────────────────────────────────┐
│                                                       │
│  ┌─ Settings Page ──────────────────────────────────┐│
│  │                                                   ││
│  │  ┌─ AgentSettings ─────────────────────────────┐ ││
│  │  │                                              │ ││
│  │  │  ┌─ AgentSelector ────────┐ (Provider)      │ ││
│  │  │  └────────────────────────┘                  │ ││
│  │  │                                              │ ││
│  │  │  ┌─ ConfigSelector ───────┐ (Varianten)     │ ││
│  │  │  │  [Create] [Delete]     │                  │ ││
│  │  │  └────────────────────────┘                  │ ││
│  │  │                                              │ ││
│  │  │  ┌─ ExecutorConfigForm ───┐ (RJSF)          │ ││
│  │  │  │  ┌─ Field ────────────┐│                  │ ││
│  │  │  │  └────────────────────┘│                  │ ││
│  │  │  │  ┌─ Field ────────────┐│                  │ ││
│  │  │  │  └────────────────────┘│                  │ ││
│  │  │  └────────────────────────┘                  │ ││
│  │  │                                              │ ││
│  │  │  ┌─ AgentAvailabilityIndicator ─┐           │ ││
│  │  │  └──────────────────────────────┘           │ ││
│  │  │                                              │ ││
│  │  └──────────────────────────────────────────────┘ ││
│  │                                                   ││
│  └───────────────────────────────────────────────────┘│
│                                                       │
│  ┌─ Task Creation ──────────────────────────────────┐│
│  │                                                   ││
│  │  ┌─ ExecutorProfileSelector ─────────────────────┐││
│  │  │  ┌─ AgentSelector ───┐ ┌─ ConfigSelector ───┐│││
│  │  │  └───────────────────┘ └────────────────────┘│││
│  │  └───────────────────────────────────────────────┘││
│  │                                                   ││
│  └───────────────────────────────────────────────────┘│
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## ❓ Proaktive F&A

### Q1: Wie werden die Schemas für RJSF geladen?

✅ **Antwort:**
- Vite-Plugin generiert Schemas zur Build-Zeit
- Import via `import schemas from 'virtual:executor-schemas'`
- Schema pro Provider: `schemas.CLAUDE_CODE`, etc.

### Q2: Wie funktioniert die Echtzeit-Verfügbarkeitsprüfung?

✅ **Antwort:**
- `useAgentAvailability` Hook
- Ruft `/agents/check-availability` auf
- Zeigt Status: Loading → Found/Not Found
- Refresh-Button für manuelle Aktualisierung

### Q3: Wie werden Varianten erstellt/gelöscht?

✅ **Antwort:**
- Dialoge: `CreateConfigurationDialog`, `DeleteConfigurationDialog`
- Rufen `PUT /config/profiles` mit aktualisierter Config
- Optimistic UI mit lokalem State-Update

---

## 📱 Konkrete Beispiele

### Beispiel: Provider wechseln

```
🖥️ User: Öffnet AgentSettings
    ↓
📋 AgentSelector: Zeigt [Claude Code ▼]
    ↓
🖱️ User: Wählt "Droid"
    ↓
🔄 State Update: selectedAgent = "DROID"
    ↓
📋 ConfigSelector: Zeigt Varianten für DROID
   [DEFAULT, CLAUDE_SONNET_4_5, GPT_5]
    ↓
📝 ExecutorConfigForm: Lädt Schema für DROID
   - autonomy (select)
   - model (text)
   - reasoning_effort (select)
```

### Beispiel: Konfiguration speichern

```
🖥️ User: Ändert "model" auf "opus"
    ↓
📤 ExecutorConfigForm: onChange(newConfig)
    ↓
💾 Button: "Save Configuration"
    ↓
🔧 PUT /config/profiles
   { "CLAUDE_CODE": { "DEFAULT": { "CLAUDE_CODE": { "model": "opus" } } } }
    ↓
✅ Toast: "Configuration saved!"
```

---

## 🧩 Komponenten & Implementierung

### 6.1 Component: `AgentSelector` **~100 Zeilen**

Zweck: Dropdown zur Provider-Auswahl

**Props:**
- `value: BaseCodingAgent` - Aktuell ausgewählt
- `onChange: (agent: BaseCodingAgent) => void`
- `disabled?: boolean`

**Rendering:**
- shadcn/ui Select mit allen BaseCodingAgent-Werten
- Icons/Labels pro Provider

### 6.2 Component: `ConfigSelector` **~100 Zeilen**

Zweck: Dropdown zur Varianten-Auswahl

**Props:**
- `agent: BaseCodingAgent` - Gewählter Provider
- `value: string | null` - Aktuelle Variante
- `onChange: (variant: string | null) => void`
- `configs: ExecutorConfigs` - Verfügbare Konfigurationen

**Rendering:**
- shadcn/ui Select mit Varianten für gewählten Agent
- DEFAULT als erste Option
- User-definierte Varianten darunter

### 6.3 Component: `ExecutorProfileSelector` **~80 Zeilen**

Zweck: Kombiniert AgentSelector + ConfigSelector

**Props:**
- `value: ExecutorProfileId`
- `onChange: (id: ExecutorProfileId) => void`

**Verwendung:**
- Task-Erstellung
- Default-Profil-Auswahl in Settings

### 6.4 Component: `ExecutorConfigForm` **~200 Zeilen**

Zweck: RJSF-basiertes Konfigurationsformular

**Props:**
- `agent: BaseCodingAgent` - Provider
- `config: CodingAgent` - Aktuelle Konfiguration
- `onChange: (config: CodingAgent) => void`
- `onSave: () => void`

**Technologie:**
- React JSON Schema Form (@rjsf/core)
- Custom Widgets aus `components/rjsf/`
- shadcn/ui für Styling

### 6.5 Component: `AgentAvailabilityIndicator` **~80 Zeilen**

Zweck: Zeigt Verfügbarkeitsstatus eines Agents

**Props:**
- `agent: BaseCodingAgent`

**States:**
- Loading: Spinner
- LoginDetected: ✓ Grün mit Timestamp
- InstallationFound: ⚠ Gelb "Installed, not logged in"
- NotFound: ✗ Rot "Not installed"

### 6.6 Page: `AgentSettings` **~500 Zeilen**

Zweck: Hauptseite für Executor-Verwaltung

**Sections:**
1. Form/Raw Editor Toggle
2. Provider-Selektor (AgentSelector)
3. Varianten-Manager (ConfigSelector + Create/Delete)
4. Konfigurationsformular (ExecutorConfigForm ODER Raw JSON)
5. Default-Profil-Auswahl
6. Verfügbarkeitsanzeige

**State:**
- `selectedAgent: BaseCodingAgent`
- `selectedVariant: string`
- `profiles: ExecutorConfigs`
- `useFormEditor: boolean`

---

## ⚡ Performance & Best Practices

### Memoization

```typescript
// Schema nur laden wenn Agent wechselt
const schema = useMemo(
  () => schemas[selectedAgent],
  [selectedAgent]
);
```

### Optimistic Updates

```typescript
// Lokal updaten, dann API call
setProfiles(prev => updateProfile(prev, newConfig));
await saveProfiles(profiles);
// Kein Reload nötig!
```

### Form Validation

```typescript
// AJV8 für Schema-Validierung
import validator from '@rjsf/validator-ajv8';
<Form validator={validator} schema={schema} />
```

---

## 🔄 RJSF Custom Widgets

### Widget-Ordner: `components/rjsf/`

| Widget | Zweck |
|--------|-------|
| `TextWidget` | shadcn/ui Input |
| `SelectWidget` | shadcn/ui Select |
| `CheckboxWidget` | shadcn/ui Checkbox |
| `ArrayFieldTemplate` | shadcn/ui für Arrays |

### Widget Registry

```typescript
const widgets = {
  TextWidget: ShadcnTextWidget,
  SelectWidget: ShadcnSelectWidget,
  CheckboxWidget: ShadcnCheckboxWidget,
};

<Form widgets={widgets} ... />
```

---

## 📚 Weiterführende Phasen

- **Phase 7:** Schema-Generierung - Wie Schemas aus Rust generiert werden
- **Phase 8:** Authentifizierung - Auth-Flows im Frontend

### Wichtige Hooks

| Hook | Zweck |
|------|-------|
| `useProfiles` | Profile laden/speichern |
| `useAgentAvailability` | Verfügbarkeitsprüfung |
| `useConfig` | Global Config Context |

---

## ✅ Abschlusskriterien für diese Phase

- [ ] Alle Komponenten dokumentiert
- [ ] Props und States beschrieben
- [ ] Komponentenhierarchie dargestellt
- [ ] RJSF-Integration erklärt
- [ ] Performance-Patterns aufgelistet

---

*Referenz: `shared-docs/ai-integration/00-GLOBAL-ORCHESTRATOR.md`*
