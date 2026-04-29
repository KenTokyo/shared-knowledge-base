# 00 - Index: Kontext- und Token-Dossier

**Datum:** 2026-04-29
**Umfang:** 20 Dateien (Index + 19 Themenblätter)
**Ziel:** belastbare Entscheidungsbasis für globale Tokenzählung, Auto-Condense und Session-Rotation in NoteDrill

## Leitidee
- Das Dossier beantwortet die Fragen aus dem Rechercheauftrag in getrennten Themenblättern.
- Jedes Themenblatt enthält Leitfrage, Befunde, Übertragung, Risiken, Kriterien und Quellen.
- Die Struktur ist bewusst einheitlich, damit der Wechsel zwischen Themen schnell bleibt.
- Entscheidungen werden als umsetzbare Schritte mit messbaren Ergebnissen dargestellt.

## Team-Workflow
1. Themenblatt über die Leitfrage auswählen.
1. Kernbefunde mit aktuellen Codepfaden abgleichen.
1. Umsetzungsschritte in aktive Task-Planung übernehmen.
1. Akzeptanzkriterien als Review-Checkliste nutzen.
1. Auffälligkeiten direkt in Cleanup-Tasks zurückführen.

## Dateinavigation
### 01 - Kontext-Grundlagen
- Datei: shared-docs/context-und-tokens-docs/01-kontext-grundlagen.md
- Leitfrage: Was bedeutet Kontext bei LLMs genau, und warum ist er für NoteDrill eine Kernfunktion?
- Schwerpunkte: Arbeitsgedächtnis, Priorisierung, Reservetoken, Handoff, Drift, Warnstufen
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 02 - Token-Grundlagen
- Datei: shared-docs/context-und-tokens-docs/02-token-grundlagen.md
- Leitfrage: Was ist ein Token praktisch, und welche typischen Fehler passieren beim Zählen?
- Schwerpunkte: Tokeneinheit, InputOutput, CacheAnteil, Schätzwert, ProviderUsage, Kostenbezug
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 03 - Tokenisierung und BPE
- Datei: shared-docs/context-und-tokens-docs/03-tokenisierung-und-bpe.md
- Leitfrage: Wie funktioniert BPE-Tokenisierung, und was bedeutet das für präzise Zählung in NoteDrill?
- Schwerpunkte: BPE, TokenizerMismatch, Mehrsprachigkeit, Codeblöcke, JSONLast, Driftmessung
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 04 - Provider-Zählung im Vergleich
- Datei: shared-docs/context-und-tokens-docs/04-provider-zaehlung-vergleich.md
- Leitfrage: Wie unterscheiden sich Tokenfelder von OpenAI, Anthropic, Gemini und OpenRouter?
- Schwerpunkte: Feldmapping, DeltaTotal, CacheBuckets, Semantik, Normalisierung, Laufzeitlatenz
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 05 - OpenAI-Spezifika
- Datei: shared-docs/context-und-tokens-docs/05-openai-spezifika.md
- Leitfrage: Welche OpenAI-Mechaniken sind entscheidend für Kontextfenster, Prompt-Caching und Compaction?
- Schwerpunkte: ResponsesAPI, PromptCaching, CompactFlow, ConfigLimits, UsageFelder, Compaction
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 06 - Anthropic-Spezifika
- Datei: shared-docs/context-und-tokens-docs/06-anthropic-spezifika.md
- Leitfrage: Wie sollten Claude-Tokenfelder und Context-Window-Regeln in NoteDrill interpretiert werden?
- Schwerpunkte: input_tokens, output_tokens, cache_read, cache_write, ContextWindow, Feldmapping
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 07 - Gemini-Spezifika
- Datei: shared-docs/context-und-tokens-docs/07-gemini-spezifika.md
- Leitfrage: Wie nutzt NoteDrill Gemini-Tokenzählung korrekt, inklusive API-Zählung und Caching?
- Schwerpunkte: countTokens, promptTokenCount, candidatesTokenCount, GeminiCaching, ApiKey, Fallback
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 08 - OpenRouter-Normalisierung
- Datei: shared-docs/context-und-tokens-docs/08-openrouter-normalisierung.md
- Leitfrage: Wie normalisieren wir OpenRouter-Modelle, damit Token- und Kontextwerte konsistent bleiben?
- Schwerpunkte: Modellpräfixe, WindowMetadaten, FallbackLimits, RouterRegeln, UnknownRate, Synchronisation
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 09 - Öffentliche Libraries
- Datei: shared-docs/context-und-tokens-docs/09-oeffentliche-libraries.md
- Leitfrage: Welche offenen Libraries helfen bei Tokenzählung, Kontextanalyse und robusten Agenten-Workflows?
- Schwerpunkte: tiktoken, gpt-tokenizer, litellm, LangChain, Lizenzprüfung, Wartbarkeit
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 10 - Ist-Stand NoteDrill
- Datei: shared-docs/context-und-tokens-docs/10-notedrill-ist-stand.md
- Leitfrage: Was ist in NoteDrill heute bereits stabil, und wo liegen die wichtigsten Lücken?
- Schwerpunkte: token-counting-service, CTX-Control, CondenseMarker, Thresholds, Routenlogik, UIHinweise
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 11 - Ist-Stand UniAI
- Datei: shared-docs/context-und-tokens-docs/11-uniai-ist-stand.md
- Leitfrage: Welche UniAI-Muster sind für NoteDrill direkt übertragbar, ohne Architekturbruch?
- Schwerpunkte: context-window, limit-management, usage-adapter, WeakSetGuard, continuation, run-id
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 12 - Gap-Analyse NoteDrill vs UniAI
- Datei: shared-docs/context-und-tokens-docs/12-gap-analyse-notedrill-vs-uniai.md
- Leitfrage: Welche funktionalen Lücken bestehen zwischen NoteDrill und UniAI beim Kontext-/Limit-Management?
- Schwerpunkte: Zentralisierung, GuardReife, DriftTracking, HandoffSchema, ModelOverrides, Testtiefe
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 13 - Globale Token-Architektur
- Datei: shared-docs/context-und-tokens-docs/13-globale-token-architektur.md
- Leitfrage: Wie bauen wir eine modellübergreifende Token-Architektur, die in Browser, Electron und Mobil stabil läuft?
- Schwerpunkte: KanonSchema, AdapterLayer, Plattformparität, Persistenz, ThresholdEngine, Governance
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 14 - Auto-Condense-Design
- Datei: shared-docs/context-und-tokens-docs/14-auto-condense-design.md
- Leitfrage: Wie designen wir Auto-Condense so, dass es zuverlässig auslöst und verwertbare Übergaben erzeugt?
- Schwerpunkte: Triggerzustand, Idempotenz, Cooldown, Pflichtfelder, Sessionwechsel, Transparenz
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 15 - Electron: Neuer Chat im Hintergrund
- Datei: shared-docs/context-und-tokens-docs/15-electron-neuer-chat-hintergrund.md
- Leitfrage: Wie öffnen wir nach Condense automatisch eine neue Session im Hintergrund, ohne UX-Brüche?
- Schwerpunkte: IPC, RendererMain, SessionLifecycle, BackgroundWorker, RaceGuard, Persistenzlink
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 16 - Abort, Stop, Resume
- Datei: shared-docs/context-und-tokens-docs/16-abort-stop-resume.md
- Leitfrage: Wie müssen Abort-, Stop- und Resume-Pfade aussehen, damit Condense und Sessionwechsel robust bleiben?
- Schwerpunkte: AbortController, ReasonCodes, Cleanup, Checkpoint, Parallelität, Fehlerstrategie
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 17 - Handoff-Datenmodell
- Datei: shared-docs/context-und-tokens-docs/17-handoff-datenmodell.md
- Leitfrage: Welche Felder muss ein Übergabemodell enthalten, damit die nächste KI sofort verlässlich weiterarbeiten kann?
- Schwerpunkte: Pflichtfelder, SchemaVersion, Dateireferenzen, OpenTodos, Phase, Validierung
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 18 - Monitoring und Telemetrie
- Datei: shared-docs/context-und-tokens-docs/18-monitoring-und-telemetrie.md
- Leitfrage: Welche Messwerte brauchen wir, damit Tokenzählung und Auto-Condense im Betrieb wirklich verlässlich sind?
- Schwerpunkte: UnknownRate, DriftMetrik, TriggerErfolg, RunID, Alarmierung, Dashboard
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

### 19 - Umsetzungsfahrplan NoteDrill
- Datei: shared-docs/context-und-tokens-docs/19-umsetzungsfahrplan-notedrill.md
- Leitfrage: Wie setzen wir die Erkenntnisse in einen realistischen, phasenweisen Fahrplan für NoteDrill um?
- Schwerpunkte: Phasenplan, Risikoabbau, FeatureFlag, Canary, Rollout, SupportReadiness
- Nutzen: direkte Grundlage für Architektur- und Implementierungsentscheidungen

## Qualitätskriterien
- Pro Themenblatt mindestens 100 Zeilen, mit klarer Struktur und Primärquellen.
- Echte interne Codepfade und externe Referenzen sind fest eingebaut.
- UTF-8 mit echten Umlauten, damit keine Mojibake-Rückstände bleiben.
- Messkriterien und Edge-Cases sind explizit statt implizit dokumentiert.
- Fokus bleibt auf operativer Umsetzbarkeit im NoteDrill-Stack.

## Pflegehinweis
- Bei Provideränderungen erst Quellen aktualisieren, dann Themenblatt anpassen.
- Bei Logikänderungen an Condense/Limit immer die betroffenen Blätter mitpflegen.
- Monitoring-Erkenntnisse aus Blatt 18 in den Fahrplan aus Blatt 19 zurückspielen.
