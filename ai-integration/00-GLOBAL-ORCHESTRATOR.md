# 🎯 GLOBAL ORCHESTRATOR: KI-Provider & Model-Integration

> **ULTRATHINK** - Diese Dokumentation dient als zentrale Referenz für die Integration von KI-Providern und Modellen in beliebige Projekte.

---

## 📌 Zweck dieser Dokumentation

Diese Sammlung von Planungen und Dokumentationen beschreibt, wie man ein **universelles KI-Provider-System** implementiert, das:

- **9+ KI-Provider** unterstützt (Claude Code, Codex, Copilot, Cursor, Gemini, Droid, Qwen, Amp, Opencode)
- **Beliebige Modelle** pro Provider konfigurierbar macht
- **Wiederverwendbar** für alle Projekte ist
- **Automatisch** Schema-basierte UI generiert

---

## 🗂️ Phasen-Übersicht (Referenzierte Planungen)

### Status-Legende
- 📝 **DOKUMENTIERT** = Planung/Dokumentation erstellt (diese Dateien)
- 🔲 **IMPL. OFFEN** = Implementierung in neuem Projekt steht aus
- ✅ **IMPL. FERTIG** = In neuem Projekt implementiert

| # | Phase | Doku | Impl. | Datei | Beschreibung |
|---|-------|------|-------|-------|--------------|
| 1 | Architektur-Übersicht | 📝 | 🔲 | `phases/01-architecture-overview.md` | Gesamtarchitektur, Schichten, Datenfluss |
| 2 | Provider-Definitionen | 📝 | 🔲 | `phases/02-provider-definitions.md` | Alle 9 Provider mit Konfigurationen |
| 3 | Executor-Implementierung | 📝 | 🔲 | `phases/03-executor-implementation.md` | Rust Executor-Module, Traits, CLI |
| 4 | Profil-System | 📝 | 🔲 | `phases/04-profile-system.md` | Profile, Varianten, Merge-Logik |
| 5 | API-Routen | 📝 | 🔲 | `phases/05-api-routes.md` | REST-Endpoints Config/Tasks |
| 6 | Frontend-Komponenten | 📝 | 🔲 | `phases/06-frontend-components.md` | React UI, RJSF-Forms |
| 7 | Schema-Generierung | 📝 | 🔲 | `phases/07-schema-generation.md` | Rust → JSON-Schema → TS |
| 8 | Authentifizierung | 📝 | 🔲 | `phases/08-authentication.md` | Auth pro Provider |
| 9 | Code-Referenzen | 📝 | 🔲 | `phases/09-code-references.md` | Verifizierte Dateipfade |

---

## 🏗️ Architektur-Kurzübersicht

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  AgentSelector  │  │  ConfigSelector │  │  ExecutorConfig │ │
│  │   (Provider)    │  │   (Variante)    │  │    Form (RJSF)  │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│           │                    │                    │           │
│           └────────────┬───────┴────────────────────┘           │
│                        ▼                                         │
│              ExecutorProfileId {executor, variant}              │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ REST API
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Rust)                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Config Routes  │  │  Task Routes    │  │  Profile System │ │
│  │  /config/*      │  │  /tasks/*       │  │  profiles.json  │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│           │                    │                    │           │
│           └────────────┬───────┴────────────────────┘           │
│                        ▼                                         │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    EXECUTORS MODULE                          │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │ │
│  │  │ Claude   │ │ Codex    │ │ Copilot  │ │ Cursor   │ ...   │ │
│  │  │ Code     │ │          │ │          │ │ Agent    │       │ │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │ │
│  │       │            │            │            │              │ │
│  │       └────────────┴────────────┴────────────┘              │ │
│  │                         │                                    │ │
│  │                         ▼                                    │ │
│  │              CommandBuilder / CLI Execution                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNE KI-PROVIDER                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Anthropic│ │ OpenAI   │ │ Google   │ │ GitHub   │ ...       │
│  │ Claude   │ │ GPT-5    │ │ Gemini   │ │ Copilot  │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Unterstützte Provider (Kurzreferenz)

| Provider | CLI/SDK | Typische Modelle | Authentifizierung |
|----------|---------|------------------|-------------------|
| **Claude Code** | `@anthropic-ai/claude-code` | opus, sonnet, haiku | `CLAUDE_API_KEY` |
| **Codex** | AppServer Protocol | gpt-5.2, gpt-5.1-codex-max | `OPENAI_API_KEY` |
| **Copilot** | `@github/copilot` | gpt-5, claude-sonnet-4.5 | GitHub CLI |
| **Cursor Agent** | `cursor-agent` | auto, sonnet-4.5, gpt-5 | `CURSOR_API_KEY` |
| **Gemini** | `@google/gemini-cli` | gemini-3-flash, gemini-3-pro | Google OAuth |
| **Droid** | `droid` | Multi-Provider (Claude, GPT, Gemini) | Provider-spezifisch |
| **Qwen Code** | `@qwen-code/qwen-code` | Customizable | Alibaba API |
| **Amp** | `@sourcegraph/amp` | N/A | Sourcegraph Auth |
| **Opencode** | `opencode-ai` | Customizable | Provider-spezifisch |

---

## 📋 Chat-Workflow & Kontext-Management

> **WICHTIG:** Diese Datei soll zu jedem neuen Chat mitgegeben werden!

### Aktueller Stand

- **Letzte Aktualisierung:** 2026-01-04
- **Dokumentation:** 9/9 Phasen dokumentiert 📝
- **Verifizierung:** Pfade & Modell-Namen gegen Code geprüft ✅

### Dokumentations-Status

| Schritt | Status |
|---------|--------|
| Globale Taskdatei | 📝 Erstellt |
| 9 Phasen-Planungen | 📝 Erstellt |
| Pfade verifiziert | ✅ Geprüft gegen echten Code |
| Modell-Namen verifiziert | ✅ Stimmen mit `default_profiles.json` |

### Für neues Projekt: Implementierungs-Reihenfolge

1. 🔲 **Phase 3** zuerst: Rust Executor-Module (Kern-Logik)
2. 🔲 **Phase 4** dann: Profil-System aufsetzen
3. 🔲 **Phase 7** dann: Schema-Generierung konfigurieren
4. 🔲 **Phase 5** dann: API-Routen erstellen
5. 🔲 **Phase 6** zuletzt: Frontend-Komponenten bauen

> **Hinweis:** Phase 1, 2, 8, 9 sind Referenz-Dokumentationen, keine Implementierungs-Schritte.

---

## 🔗 Wichtige Referenzen

### Projektstruktur (Vibe-Kanban als Referenz)

```
/crates/executors/          # Rust Executor-Module
  ├── src/executors/        # Provider-Implementierungen
  ├── src/profile.rs        # Profil-Verwaltung
  └── default_profiles.json # Standard-Konfigurationen

/frontend/src/
  ├── components/tasks/     # AgentSelector, ConfigSelector
  ├── pages/settings/       # AgentSettings
  └── components/rjsf/      # RJSF Custom Widgets

/shared/types.ts            # Auto-generierte TypeScript Types
```

### Temp-Datei Referenz

Falls eine `temp.md` im Chat mitgegeben wurde, enthält sie möglicherweise:
- Aktuelle Arbeitsnotizen
- Kontextinformationen aus vorherigen Chats
- Spezifische Anweisungen für die aktuelle Phase

---

## 📝 Notizen für zukünftige Chats

> Hier können während der Arbeit Notizen hinzugefügt werden, die für den nächsten Chat relevant sind.

---

**Status-Legende (Dokumentation):**
- 📝 DOKUMENTIERT - Planung/Doku erstellt
- ✅ VERIFIZIERT - Gegen echten Code geprüft

**Status-Legende (Implementierung in neuem Projekt):**
- 🔲 OFFEN - Noch nicht implementiert
- 🔄 IN ARBEIT - Wird gerade implementiert
- ✅ FERTIG - Implementierung abgeschlossen

---

*Diese Datei ist der zentrale Einstiegspunkt für die KI-Integration-Dokumentation. Alle referenzierten Phasen-Dateien befinden sich im Unterordner `phases/`.*
