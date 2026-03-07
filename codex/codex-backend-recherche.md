# Codex Backend Recherche

## [Ziel] Kurzfassung
Diese Doku erklaert nur das Backend von `codex`.
Das echte VS-Code-Frontend liegt nicht in diesem Repo.
Fuer deine eigene Extension ist das aber genau die wichtige Schicht.

Die wichtigste Regel ist:

- Mehrere parallele Chats oder Tasks = mehrere geladene Threads
- Nicht moeglich = mehrere gleichzeitige Top-Level-Turns im selben Thread

Guter Startpunkt:

- `codex/codex-rs/app-server/README.md`

Dort steht, dass `codex app-server` Rich Clients wie die VS-Code-Extension versorgt.

## [Bauplan] Architektur
Der grobe Ablauf sieht so aus:

```text
UI / eigene Extension
  -> app-server RPC
  -> core
  -> protocol
  -> state + rollout files
```

| Ebene | Aufgabe | Wichtige Pfade |
| --- | --- | --- |
| `app-server` | Nimmt RPC an und streamt Events zurueck | `codex/codex-rs/app-server/src/codex_message_processor.rs`, `codex/codex-rs/app-server/src/bespoke_event_handling.rs` |
| `core` | Baut Threads, Turns, Prompts, Tools und Compaction | `codex/codex-rs/core/src/codex.rs`, `codex/codex-rs/core/src/thread_manager.rs` |
| `protocol` | Gemeinsame Typen fuer Models, Events, Items und Token | `codex/codex-rs/protocol/src/protocol.rs`, `codex/codex-rs/protocol/src/openai_models.rs` |
| `state` | SQLite-Metadaten fuer Threads und Logs | `codex/codex-rs/state/src/runtime.rs`, `codex/codex-rs/state/src/runtime/threads.rs` |
| `rollout` | JSONL-Verlauf pro Thread | `codex/codex-rs/core/src/rollout/mod.rs`, `codex/codex-rs/core/src/rollout/recorder.rs` |

Die Kernregel fuer Parallelitaet kommt aus:

- `codex/codex-rs/core/src/thread_manager.rs -> ThreadManagerState::threads`
- `codex/codex-rs/core/src/codex.rs -> Session`
- `codex/codex-rs/core/src/tasks/mod.rs -> Session::spawn_task`
- `codex/codex-rs/core/src/state/turn.rs -> ActiveTurn`

## [Chats] Mehrere Chats und der neue Chat-Button
Ein neuer Chat erzeugt einen neuen Thread.
Jeder Thread hat seine eigene Session, seinen eigenen Verlauf und seinen eigenen Listener.
Darum koennen mehrere Chats parallel laufen.

Im selben Thread geht aber nur ein aktiver Turn gleichzeitig.

### Wo die Logik sitzt

| Thema | Pfad | Symbole |
| --- | --- | --- |
| Neue Threads im Speicher | `codex/codex-rs/core/src/thread_manager.rs` | `ThreadManager`, `ThreadManagerState::threads`, `spawn_thread_with_source` |
| Genau ein aktiver Turn pro Thread | `codex/codex-rs/core/src/codex.rs` | `Session { active_turn: Mutex<Option<ActiveTurn>> }` |
| Alter Turn wird ersetzt | `codex/codex-rs/core/src/tasks/mod.rs` | `Session::spawn_task`, `abort_all_tasks(TurnAbortReason::Replaced)` |
| Turn-Zustand | `codex/codex-rs/core/src/state/turn.rs` | `ActiveTurn`, `RunningTask`, `TurnState` |

### Wichtige RPCs fuer Chats

- `thread/start`
- `thread/resume`
- `thread/fork`
- `thread/list`
- `thread/loaded/list`
- `thread/read`
- `thread/unsubscribe`
- `turn/start`
- `turn/interrupt`
- `thread/compact/start`
- `review/start`

Typen dazu:

- `codex/codex-rs/app-server-protocol/src/protocol/common.rs`
- `codex/codex-rs/app-server-protocol/src/protocol/v2.rs`

### Ablauf: neuer Chat bis laufender Task

1. `thread/start` kommt im App-Server an.
   Pfad: `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_start`
2. Der App-Server ruft den Thread-Manager auf.
   Pfad: `codex/codex-rs/core/src/thread_manager.rs -> start_thread_with_tools_and_service_name`
3. Daraus wird ein neuer `CodexThread`.
   Pfad: `codex/codex-rs/core/src/thread_manager.rs -> spawn_thread_with_source`, `finalize_thread_spawn`
4. Danach wird sofort ein Listener angehaengt.
   Pfad: `codex/codex-rs/app-server/src/codex_message_processor.rs -> ensure_conversation_listener_task`
5. Die echte Modellarbeit startet erst bei `turn/start`.
   Pfad: `codex/codex-rs/app-server/src/codex_message_processor.rs -> turn_start`
6. Core startet daraus den echten Turn-Task.
   Pfad: `codex/codex-rs/core/src/tasks/mod.rs -> Session::spawn_task`

### Warum mehrere Chats parallel laufen
Der Grund ist die In-Memory-Registry:

- `codex/codex-rs/core/src/thread_manager.rs -> ThreadManagerState::threads: Arc<RwLock<HashMap<ThreadId, Arc<CodexThread>>>>`

Dazu kommt das Abo-Modell:

- `codex/codex-rs/app-server/src/thread_state.rs -> ThreadStateManager`
- `codex/codex-rs/app-server/src/thread_state.rs -> try_ensure_connection_subscribed`
- `codex/codex-rs/app-server/src/thread_state.rs -> subscribed_connection_ids`

Der Event-Fanout laeuft ueber:

- `codex/codex-rs/app-server/src/codex_message_processor.rs -> conversation.next_event()`
- `codex/codex-rs/app-server/src/bespoke_event_handling.rs`

### Warum mehrere Top-Level-Turns im selben Thread nicht gehen
Der Grund ist einfach:

- `codex/codex-rs/core/src/codex.rs -> Session::active_turn`
- `codex/codex-rs/core/src/tasks/mod.rs -> Session::spawn_task`

`spawn_task()` bricht zuerst laufende Tasks ab.
Darum ist echte Parallelitaet nur ueber mehrere Threads moeglich.

### Drei Thread-Arten, die du trennen solltest

| Art | Beschreibung | Wichtige Pfade |
| --- | --- | --- |
| Normale UI-Threads | normale Chats ueber Start, Resume oder Fork | `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_start`, `thread_resume`, `thread_fork` |
| Detached Review-Threads | Reviews koennen auf neuem Thread laufen | `codex/codex-rs/app-server/src/codex_message_processor.rs -> review_start`, `start_detached_review` |
| Sub-Agent-Threads | Sub-Agents laufen als eigene Threads | `codex/codex-rs/core/src/agent/control.rs -> AgentControl::spawn_agent`, `codex/codex-rs/core/src/tools/handlers/multi_agents.rs` |

### Was Listen- und Read-RPCs tun

| RPC | Zweck | Wichtige Pfade |
| --- | --- | --- |
| `thread/list` | gespeicherte Threads fuer die UI-Liste | `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_list`, `codex/codex-rs/state/src/runtime/threads.rs -> list_threads` |
| `thread/read` | Thread lesen, ohne ihn zu starten | `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_read` |
| `thread/loaded/list` | nur geladene Threads aus dem Speicher | `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_loaded_list`, `codex/codex-rs/core/src/thread_manager.rs -> list_thread_ids` |

### Was beim Schliessen passiert
Wenn der letzte Client sich abmeldet, wird der Thread wirklich entladen.

Wichtige Pfade:

- `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_unsubscribe`
- `codex/codex-rs/app-server/src/thread_state.rs -> has_subscribers`
- `codex/codex-rs/core/src/thread_manager.rs -> remove_thread`

## [Fenster] Context Window und Auto-Compaction
Codex arbeitet hier mit zwei verschiedenen Grenzen:

1. effektives Context Window
2. Auto-Compact-Schwelle

Die beiden Zahlen sind oft nicht gleich.

### Wo die Werte herkommen

| Thema | Pfad | Symbole |
| --- | --- | --- |
| Config-Felder | `codex/codex-rs/core/src/config/mod.rs` | `ConfigToml`, `Config`, `model_context_window`, `model_auto_compact_token_limit` |
| Modell-Metadaten | `codex/codex-rs/protocol/src/openai_models.rs` | `ModelInfo`, `context_window`, `auto_compact_token_limit`, `effective_context_window_percent` |
| Config ueber Modell legen | `codex/codex-rs/core/src/models_manager/model_info.rs` | `with_config_overrides` |
| Effektives Turn-Fenster | `codex/codex-rs/core/src/codex.rs` | `TurnContext::model_context_window()` |

### Formel 1: effektives Fenster
Pfad:

- `codex/codex-rs/core/src/codex.rs -> TurnContext::model_context_window()`

Formel:

```text
effektives_fenster = context_window * effective_context_window_percent / 100
```

Default:

- `codex/codex-rs/protocol/src/openai_models.rs -> default_effective_context_window_percent()`
- Standardwert: `95`

### Formel 2: Auto-Compact-Schwelle
Pfad:

- `codex/codex-rs/protocol/src/openai_models.rs -> ModelInfo::auto_compact_token_limit()`

Formel:

```text
auto_compact_limit = min(config_limit, 90% vom rohen context_window)
```

Wenn kein `config_limit` gesetzt ist, gilt nur `90%` vom rohen Fenster.
Wenn kein `context_window` existiert, gilt der Config-Wert direkt.
Wenn beides fehlt, ist Auto-Compaction praktisch aus.

### Wichtig: beide Zahlen sind verschieden
Beispiel:

```text
rohes context_window       = 272000
effektives Fenster bei 95% = 258400
auto-compact bei 90%       = 244800
```

### Wie der Wert weitergereicht wird

| Thema | Pfad |
| --- | --- |
| Token-Event erzeugen | `codex/codex-rs/core/src/codex.rs -> send_token_count_event` |
| Token-Struktur | `codex/codex-rs/protocol/src/protocol.rs -> TokenUsageInfo` |
| App-Server-Weitergabe | `codex/codex-rs/app-server/src/bespoke_event_handling.rs -> handle_token_count_event` |
| V2-Client-Typ | `codex/codex-rs/app-server-protocol/src/protocol/v2.rs -> ThreadTokenUsage` |

Wichtig:

- Das Backend sendet absolute Tokenwerte und `model_context_window`
- Ein Client kann daraus Prozent berechnen
- Hilfsfunktion: `codex/codex-rs/protocol/src/protocol.rs -> TokenUsage::percent_of_context_window_remaining()`

### Wann Auto-Compaction startet
Hauptpfade:

- `codex/codex-rs/core/src/codex.rs -> run_turn`
- `codex/codex-rs/core/src/codex.rs -> run_pre_sampling_compact`
- `codex/codex-rs/core/src/codex.rs -> run_auto_compact`

Verglichen wird gegen:

- `sess.get_total_token_usage()`

Das ist nicht nur die letzte API-Zahl.
Es ist die letzte bekannte API-Nutzung plus lokal geschaetzte neue History-Items.

### Die drei Compaction-Pfade

| Pfad | Beschreibung | Wichtige Stelle |
| --- | --- | --- |
| Pre-turn | laeuft direkt nach `TurnStarted`, noch vor neuer User-Nachricht | `codex/codex-rs/core/src/codex.rs -> run_pre_sampling_compact` |
| Mid-turn | laeuft waehrend des laufenden Turns | `codex/codex-rs/core/src/codex.rs -> run_turn` |
| Manual | eigener Task ueber RPC | `codex/codex-rs/core/src/tasks/compact.rs -> CompactTask`, `codex/codex-rs/app-server/src/codex_message_processor.rs` |

Mid-turn springt nur an, wenn beides wahr ist:

```text
token_limit_reached && needs_follow_up
```

### Lokale gegen Remote-Compaction

| Art | Beschreibung | Pfad |
| --- | --- | --- |
| Lokal | fuer Nicht-OpenAI-Provider | `codex/codex-rs/core/src/compact.rs` |
| Remote | fuer OpenAI-Provider | `codex/codex-rs/core/src/compact_remote.rs` |

Die lokale Variante nutzt:

- `codex/codex-rs/core/src/codex.rs -> TurnContext::compact_prompt()`
- `codex/codex-rs/core/templates/compact/prompt.md`
- `codex/codex-rs/core/templates/compact/summary_prefix.md`

### Wie Codex nach der Compaction weiterarbeitet
Das Herzstueck ist:

- `codex/codex-rs/core/src/codex.rs -> replace_compacted_history`

Dort passiert:

1. In-Memory-History wird ersetzt
2. `RolloutItem::Compacted` wird gespeichert
3. optional wird `reference_context_item` gesetzt
4. `recompute_token_usage()` laeuft

Die Struktur dafuer ist:

- `codex/codex-rs/protocol/src/protocol.rs -> CompactedItem`

und sie kann `replacement_history` enthalten.

### Warum `replacement_history` so wichtig ist
Wichtige Pfade:

- `codex/codex-rs/core/src/compact.rs -> CompactedItem { replacement_history: Some(...) }`
- `codex/codex-rs/core/src/compact_remote.rs -> CompactedItem { replacement_history: Some(...) }`
- `codex/codex-rs/core/src/codex/rollout_reconstruction.rs`
- `codex/codex-rs/core/src/codex_tests.rs -> reconstruct_history_uses_replacement_history_verbatim`

Wirkung:

- der laufende Turn kann direkt mit kleinerem Verlauf weitermachen
- `resume` und `fork` koennen denselben kompakten Verlauf spaeter wiederherstellen

### Die Rolle von `reference_context_item`
Wichtige Pfade:

- `codex/codex-rs/core/src/compact.rs -> InitialContextInjection`
- `codex/codex-rs/core/src/compact_remote.rs -> process_compacted_history`
- `codex/codex-rs/core/src/codex.rs -> record_context_updates_and_set_reference_context_item`

Merke:

- Pre-turn und manual compaction nutzen `DoNotInject`
- Mid-turn compaction nutzt `BeforeLastUserMessage`

Wirkung:

- `DoNotInject` baut beim naechsten normalen Turn den Startkontext neu auf
- `BeforeLastUserMessage` haelt den laufenden Turn sofort arbeitsfaehig

### Welche Events entstehen

| Event | Zweck | Pfad |
| --- | --- | --- |
| `ItemStarted` / `ItemCompleted` | Lifecycle fuer `ContextCompactionItem` | `codex/codex-rs/protocol/src/protocol.rs`, `codex/codex-rs/protocol/src/items.rs` |
| `TokenCount` | neue Tokeninfo nach Compaction | `codex/codex-rs/core/src/codex.rs -> send_token_count_event` |
| `thread/tokenUsage/updated` | Client-Notification | `codex/codex-rs/app-server/src/bespoke_event_handling.rs -> handle_token_count_event` |
| Legacy `thread/compacted` | alter Spiegel-Event | `codex/codex-rs/app-server/src/bespoke_event_handling.rs` |

Wichtig:

- Auto-Compaction im laufenden Turn startet keinen neuen Turn
- Manual compaction ist ein eigener Task mit normalem Turn-Lifecycle

## [Prompts] Prompt-, Instruction- und System-Logik
Codex hat nicht nur einen Prompt.
Es hat mehrere Schichten.

Die echten Sammelpunkte sind:

- `codex/codex-rs/core/src/codex.rs -> build_initial_context`
- `codex/codex-rs/core/src/client.rs -> build_responses_request`

### 1. Base oder System Instructions
Quellen:

- `codex/codex-rs/core/models.json`
- Fallback: `codex/codex-rs/core/prompt.md`

Aufloesung:

- `codex/codex-rs/protocol/src/openai_models.rs -> ModelInfo::get_model_instructions()`
- `codex/codex-rs/core/src/models_manager/model_info.rs -> with_config_overrides`

Prioritaet beim Session-Start:

1. `config.base_instructions`
2. gespeicherte `base_instructions` aus History oder Session-Meta
3. Modell-Default aus `models.json` oder Fallback

Pfad fuer die Prioritaet:

- `codex/codex-rs/core/src/codex.rs -> SessionConfiguration`

Im finalen Request landet das als:

- `instructions`

Pfad:

- `codex/codex-rs/core/src/client.rs -> build_responses_request`

### 2. Developer Instructions
Quellen:

- Config
- `thread/start`
- `thread/resume`
- `thread/fork`

Wichtige Pfade:

- `codex/codex-rs/app-server/src/codex_message_processor.rs -> build_thread_config_overrides`
- `codex/codex-rs/core/src/codex.rs -> SessionConfiguration`
- `codex/codex-rs/core/src/codex.rs -> build_initial_context`

Die aktuelle Runtime-Reihenfolge im Developer-Block ist:

1. Model-Switch-Hinweis
2. Permissions-Hinweis
3. direkte `developer_instructions`
4. Memory-Tool-Hinweis
5. Collaboration-Mode-Hinweis
6. Realtime-Hinweis
7. Personality-Hinweis
8. Apps-Hinweis
9. Commit-Hinweis

### 3. AGENTS, Project Docs, Skills und Plugins
Das ist die wichtigste Beobachtung:

AGENTS und aehnliche Texte landen im aktuellen Runtime-Code nicht als Systemprompt.
Sie landen als kontextuelle User-Nachrichten.

Wichtige Pfade:

- `codex/codex-rs/core/src/config/mod.rs -> load_instructions`
- `codex/codex-rs/core/src/project_doc.rs -> get_user_instructions`
- `codex/codex-rs/core/src/project_doc.rs -> discover_project_doc_paths`
- `codex/codex-rs/core/src/instructions/user_instructions.rs -> UserInstructions::serialize_to_text`
- `codex/codex-rs/core/src/contextual_user_message.rs`

Reihenfolge in `get_user_instructions()`:

1. Home-AGENTS aus `~/.codex/AGENTS.override.md` oder `~/.codex/AGENTS.md`
2. Projekt-AGENTS von Projektwurzel bis `cwd`
3. optionale JS-REPL-Hinweise
4. Plugin-Hinweise
5. Skill-Liste
6. Hierarchical-AGENTS-Hinweis

Skill- und Plugin-Pfade:

- `codex/codex-rs/core/src/skills/render.rs`
- `codex/codex-rs/core/src/plugins/render.rs`
- `codex/codex-rs/core/src/skills/injection.rs`

Wichtig fuer den Nachbau:

- die Skill-Liste kommt als Anleitung in den User-Kontext
- ein explizit genannter Skill kann `SKILL.md` als eigene User-Nachricht injizieren

### 4. Collaboration Mode Prompts
Pfad:

- `codex/codex-rs/core/src/models_manager/collaboration_mode_presets.rs`
- `codex/codex-rs/core/templates/collaboration_mode/plan.md`
- `codex/codex-rs/core/templates/collaboration_mode/default.md`

Ablauf:

- App-Server fuellt Built-in-Instruktionen nach, wenn `developer_instructions: null` kommt
- Core packt sie spaeter als `developer`-Block mit `<collaboration_mode>...</collaboration_mode>`

Wichtige Pfade:

- `codex/codex-rs/app-server/src/codex_message_processor.rs -> normalize_turn_start_collaboration_mode`
- `codex/codex-rs/protocol/src/models.rs -> DeveloperInstructions::from_collaboration_mode`

### 5. `compact_prompt`
Das ist eine Spezialschicht nur fuer Compaction.
Es ist nicht der normale Turn-Prompt.

Wichtige Pfade:

- `codex/codex-rs/core/src/config/mod.rs -> compact_prompt`
- `codex/codex-rs/core/src/codex.rs -> TurnContext::compact_prompt()`
- `codex/codex-rs/core/src/compact.rs -> run_inline_auto_compact_task`
- `codex/codex-rs/core/templates/compact/prompt.md`

### 6. `review_prompt`
Reviews haben ihren eigenen Spezialprompt.

Wichtige Pfade:

- `codex/codex-rs/core/src/client_common.rs -> REVIEW_PROMPT`
- `codex/codex-rs/core/review_prompt.md`

### Echte Prioritaet der Schichten

```text
Base/System
  = base_instructions des Modells oder Override

Developer
  = Policies, developer_instructions, Collaboration Mode und Zusatzhinweise

Contextual User
  = AGENTS, Projekt-Dokus, Skills, Plugins, Environment Context

Spezialprompts
  = compact_prompt, review_prompt, Mode-Templates
```

### Wichtige Abweichung zu aelteren Prompt-Dateien
In aelteren Prompttexten klingt es teilweise so, als wuerden AGENTS in die Developer-Schicht fliessen.

Wichtige Datei:

- `codex/codex-rs/core/prompt.md`

Der aktuelle Runtime-Assembler macht aber etwas anderes:

- AGENTS werden in `get_user_instructions()` gesammelt
- danach als kontextuelle User-Nachricht serialisiert

Darum ist fuer den echten Nachbau diese Laufkette wichtiger:

- `codex/codex-rs/core/src/project_doc.rs`
- `codex/codex-rs/core/src/codex.rs -> build_initial_context`

### Hinweis zu `ConfigToml.instructions`
Das Feld existiert hier:

- `codex/codex-rs/core/src/config/mod.rs -> ConfigToml::instructions`

Im verfolgten Laufweg normaler Threads war dieses Feld aber keine eigene, klar sichtbare aktive Schicht.
Die robuste Laufkette fuer den Nachbau ist deshalb:

- `base_instructions`
- `developer_instructions`
- `get_user_instructions()`

## [Daten] Pfade zur Laufzeit

| Pfad | Bedeutung | Wichtige Codepfade |
| --- | --- | --- |
| `~/.codex/sessions/YYYY/MM/DD/rollout-...-<threadId>.jsonl` | aktiver Verlauf pro Thread | `codex/codex-rs/core/src/rollout/mod.rs`, `codex/codex-rs/core/src/rollout/recorder.rs` |
| `~/.codex/archived_sessions/...` | archivierte Verlaeufe | `codex/codex-rs/core/src/rollout/mod.rs`, `codex/codex-rs/core/src/rollout/list.rs` |
| `state_*.sqlite` | Thread-Metadaten, Listen, Dynamic Tools | `codex/codex-rs/state/src/runtime.rs`, `codex/codex-rs/state/src/runtime/threads.rs` |
| `logs_*.sqlite` | Log-Daten | `codex/codex-rs/state/src/runtime.rs` |
| `CODEX_SQLITE_HOME` | ueberschreibt nur das SQLite-Home | `codex/codex-rs/state/src/lib.rs`, `codex/codex-rs/core/src/config/mod.rs` |

Wichtig:

- Wenn `sqlite_home` nicht extra gesetzt ist, nutzt Codex standardmaessig `codex_home`
- Die SQLite-Dateien liegen dann oft direkt neben `sessions`

## [API] Oeffentliche Schnittstellen und Typen

### RPCs, die du fuer eine eigene Extension kennen musst

| RPC | Zweck | Pfad |
| --- | --- | --- |
| `thread/start` | neuen Thread anlegen | `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_start` |
| `thread/resume` | alten Thread wieder laden | `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_resume` |
| `thread/fork` | Verlauf verzweigen | `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_fork` |
| `thread/list` | gespeicherte Threads fuer die UI | `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_list` |
| `thread/loaded/list` | nur geladene Threads | `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_loaded_list` |
| `thread/read` | Thread lesen ohne Resume | `codex/codex-rs/app-server/src/codex_message_processor.rs -> thread_read` |
| `turn/start` | echte Antwort starten | `codex/codex-rs/app-server/src/codex_message_processor.rs -> turn_start` |
| `turn/interrupt` | laufenden Turn abbrechen | `codex/codex-rs/app-server/src/codex_message_processor.rs -> turn_interrupt` |
| `thread/compact/start` | manuelle Kompaktierung starten | `codex/codex-rs/app-server/src/codex_message_processor.rs`, `codex/codex-rs/core/src/tasks/compact.rs` |
| `review/start` | Review starten, optional detached | `codex/codex-rs/app-server/src/codex_message_processor.rs -> review_start` |

### Status und Events

| Typ | Zweck | Pfad |
| --- | --- | --- |
| `ThreadStatus` | zeigt, ob ein Thread geladen, aktiv oder idle ist | `codex/codex-rs/app-server/src/thread_status.rs`, `codex/codex-rs/app-server-protocol/src/protocol/v2.rs` |
| `TurnStarted` | Turn beginnt | `codex/codex-rs/protocol/src/protocol.rs`, `codex/codex-rs/app-server/src/bespoke_event_handling.rs` |
| `TurnComplete` | Turn endet | `codex/codex-rs/protocol/src/protocol.rs`, `codex/codex-rs/app-server/src/bespoke_event_handling.rs` |
| `ItemStarted` / `ItemCompleted` | Lifecycle fuer Tools, Messages und Compaction | `codex/codex-rs/protocol/src/protocol.rs` |
| `TokenCount` | neue Tokeninfos | `codex/codex-rs/protocol/src/protocol.rs`, `codex/codex-rs/core/src/codex.rs -> send_token_count_event` |
| `thread/tokenUsage/updated` | Client-Notification | `codex/codex-rs/app-server/src/bespoke_event_handling.rs -> handle_token_count_event` |
| Legacy `thread/compacted` | alter Spiegel-Event | `codex/codex-rs/app-server/src/bespoke_event_handling.rs` |

### Wichtige Core- und Protocol-Typen

| Typ | Warum wichtig | Pfad |
| --- | --- | --- |
| `Session` | ein Thread mit Laufzeit und aktivem Turn | `codex/codex-rs/core/src/codex.rs` |
| `TurnContext` | alle Einstellungen fuer genau einen Turn | `codex/codex-rs/core/src/codex.rs` |
| `ModelInfo` | Modellfenster, Prompt-Basis, Tool-Flags | `codex/codex-rs/protocol/src/openai_models.rs` |
| `TokenUsageInfo` | Tokenstand plus `model_context_window` | `codex/codex-rs/protocol/src/protocol.rs` |
| `CompactedItem` | gespeichertes Ergebnis einer Compaction | `codex/codex-rs/protocol/src/protocol.rs` |
| `ContextCompactionItem` | Turn-Item fuer Compaction-Lifecycle | `codex/codex-rs/protocol/src/items.rs` |

## [Ablauf] Zwei kurze Sequenzen

### Neuer Chat -> turn/start -> Events

```text
UI
  -> thread/start
app-server
  -> codex_message_processor.rs::thread_start
core
  -> ThreadManager::start_thread_with_tools_and_service_name
  -> spawn_thread_with_source
  -> Codex::spawn
  -> SessionConfigured
app-server
  -> ensure_conversation_listener_task
UI
  -> turn/start
app-server
  -> codex_message_processor.rs::turn_start
core
  -> Op::OverrideTurnContext
  -> Op::UserInput
  -> Session::spawn_task
listener
  -> conversation.next_event()
app-server
  -> raw codex/event/*
  -> bespoke_event_handling
client
  -> turn/started
  -> item/started
  -> item/completed
  -> turn/completed
```

### Turn -> threshold check -> compact -> replacement_history -> continue

```text
turn/start
  -> run_turn
  -> TurnStarted
  -> run_pre_sampling_compact
  -> normal sampling request
  -> total_token_usage >= auto_compact_limit ?
       nein -> normal weiter
       ja + needs_follow_up
         -> run_auto_compact
         -> compact.rs oder compact_remote.rs
         -> replace_compacted_history
         -> replacement_history speichern
         -> recompute_token_usage
         -> TokenCount
         -> gleicher Turn laeuft mit neuer History weiter
```

## [Checks] Gute Belege und Tests
Wenn du Aussagen schnell selbst pruefen willst, nimm zuerst diese Dateien:

- `codex/codex-rs/app-server/tests/suite/v2/thread_loaded_list.rs`
- `codex/codex-rs/app-server/tests/suite/v2/thread_unsubscribe.rs`
- `codex/codex-rs/app-server/tests/suite/v2/compaction.rs`
- `codex/codex-rs/core/src/codex_tests.rs`
- `codex/codex-rs/core/src/codex/rollout_reconstruction_tests.rs`

Diese Tests decken gut ab:

- mehrere geladene Threads gleichzeitig
- echtes Unload bei `thread/unsubscribe`
- local und remote compaction
- `replacement_history` bei Resume und Rekonstruktion

## [Mitnahme] Was du fuer deinen Nachbau mitnehmen solltest
Denke nicht zuerst in "Chats", sondern in drei Schichten:

1. Thread-Verwaltung
2. Turn-Laufzeit
3. Event-Streaming

Die praktische Aufteilung ist:

- `thread/start`, `thread/list`, `thread/read`, `thread/resume`, `thread/fork` fuer Chat-Verwaltung
- `turn/start` und `turn/interrupt` fuer echte Arbeit
- Streaming ueber App-Server-Notifications

Fuer Context-Management gilt:

- das Backend kennt absolute Tokenwerte und das effektive Fenster
- Compaction ersetzt History aktiv durch `replacement_history`
- danach kann derselbe Thread mit kleinerem Kontext weiterlaufen

Wenn du nur drei Dateien zuerst lesen willst, nimm diese:

- `codex/codex-rs/app-server/src/codex_message_processor.rs`
- `codex/codex-rs/core/src/codex.rs`
- `codex/codex-rs/core/src/thread_manager.rs`
