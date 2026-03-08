# Notedrill Mobile: Phase 03 Provider-Adapter und Ausführungswege

Stand: 8. März 2026
Status: `PLANNED`

## Ziel
Diese Phase trennt sauber:
1. welcher Host läuft
2. welcher Anbieter genutzt wird
3. ob der Weg über API, CLI oder Bridge läuft

## Warum diese Phase wichtig ist
Heute klingen manche Routen stärker als sie wirklich sind.
Zum Beispiel kann `codex-cli` heißen, ohne echten lokalen Codex-Loop zu liefern.

## Zielbild

### Provider-Modi
1. `api_runtime`
2. `subscription_cli`
3. `premium_optional`

### Anbietergruppen
1. OpenAI
2. Gemini
3. Anthropic
4. OpenCode
5. Qwen
6. OpenRouter oder andere Sammelwege

## Hauptaufgaben

### 1. Adapter-Klassen sauber trennen
1. Remote-API-Adapter
2. Companion-CLI-Adapter
3. Bridge-Proxy-Adapter
4. Premium-Zusatzadapter

### 2. Modellkatalog vereinheitlichen
1. Anzeige-Name
2. technische Modell-ID
3. Kostenklasse
4. Vision ja oder nein
5. Tool-Fähigkeit
6. Host-Tauglichkeit

### 3. Auth-Arten sichtbar machen
1. Abo-Login
2. API-Key
3. OAuth
4. provider-spezifische Dateien

### 4. Fallback-Reihenfolge festlegen
1. Standardmodell
2. günstiges Fallback
3. Premium nur wenn gewollt

## Geräte- und Produktsicht

| Nutzerlage | Ausführungsweg |
|---|---|
| iPad-only | Remote-API |
| iPhone-only | Remote-API |
| MacBook-Power-User | Companion-CLI oder Remote |
| Windows-App | Companion-CLI oder Remote |
| Windows-Browser | Remote oder Companion-Bridge |
| Android-Testweg | Remote oder Termux |

## Edge Cases

| Edge Case | Was diese Phase klären muss |
|---|---|
| Modellname vom Host weicht vom Wunschmodell ab | `requestedModel` und `resolvedModel` trennen |
| Provider meldet Vision falsch | Katalog braucht klare `supportsVision`-Flag |
| Login da, aber CLI nicht nutzbar | Setup-Status und Adapter-Status trennen |
| Abo-User ohne API-Key | Remote und Companion unterschiedlich behandeln |
| zu viele Modelle im UI | Standard- und Expertenmodus einführen |

## Betroffene Dateien
1. `lib/agent/bridge/provider-adapters.ts`
2. `lib/agent/bridge/bridge-model-catalog.ts`
3. `lib/agent/bridge/provider-adapters.ts`
4. `notedrill-backend-nextjs` Bridge- und Provider-Dateien

## Done-Kriterien
1. Host und Provider sind nicht mehr vermischt.
2. Der Nutzer sieht, ob er gerade API oder CLI nutzt.
3. Fallbacks sind planbar und verständlich.

## Nächste Phase danach
`04-artefakt-pipeline-und-dateivertraege.md`
