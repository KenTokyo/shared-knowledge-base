# Notedrill Backend Next.js: Phase 09 Abo-Preise und Paketlogik

Stand: 8. März 2026
Status: `DONE`

## Ziel
Diese Phase verbindet die Technik sauber mit dem späteren Geschäftsmodell.

## Was der User davon hat
1. klare Erwartungen
2. fairere Pakete
3. weniger böse Überraschungen

## Die wichtigste Regel
Der Standardweg muss günstig und verständlich bleiben.

## Hauptaufgaben

## 1. Pakete festlegen
Zum Beispiel:
1. `Free`
2. `Standard`
3. `Plus`
4. `Pro`

## 2. Was pro Paket enthalten ist
Nicht nur Tokens.
Sondern:
1. Laufarten
2. Modellklassen
3. lange Läufe ja oder nein
4. Companion ja oder nein
5. Nutzer-Server ja oder nein

## 3. BYOK und BYOA sauber trennen
1. eigener API-Schlüssel
2. eigenes Coding-Abo oder eigenes Tool-Konto

## 4. Persönliche Coding-Pläne nicht falsch einbauen
Wenn ein Anbieter seine Pläne nur für persönliche Coding-Tools erlaubt,
darf das nicht unser gemeinsamer Backend-Standard werden.

## 5. Premium-Zusätze definieren
Zum Beispiel:
1. extra große Läufe
2. dedizierter Nutzer-Worker
3. stärkere Modelle

## Meine grobe Paketlogik

| Paket | Hauptweg | Modelle | Queue | Nutzer-Server |
|---|---|---|---|---|
| Free | Shared Remote | günstig | nein oder sehr klein | nein |
| Standard | Shared Remote | günstig bis mittel | klein | nein |
| Plus | Shared Remote plus Companion optional | günstig plus begrenzt Premium | ja | nein |
| Pro | Hybrid plus optional dedizierter Worker | alle freigegebenen Klassen | ja | optional |

## Edge Cases

| Edge Case | Antwort |
|---|---|
| Free-Nutzer missbraucht Queue | harte Grenzen |
| persönliches Tool-Abo wird als App-Backend missverstanden | klare Trennung in UI und Doku |
| Premium-Lauf sprengt Kosten | harte Budgetkappe |
| Nutzer kündigt Abo | Worker stoppen und sauber abbauen |

## Quellen für diese Phase
1. Alibaba Cloud Model Studio Coding Plan Overview
2. Anthropic Claude Code und Agent SDK Doku
3. Google Gemini CLI Blog
4. OpenAI Hilfe zu Codex in ChatGPT
5. Hosting-Preisanker von Hetzner, Render, Railway und Fly.io

## Done-Kriterien
1. jedes Paket hat klare Technikgrenzen
2. persönlicher Tool-Zugang und Betreiber-Backend sind getrennt
3. Nutzer-Server ist nur ein bewusster Premium-Weg

## Umsetzung

### Neue Dateien
1. `lib/agentic/billing/subscription-types.ts` – Vier Pakete (free, standard, plus, pro) mit klaren Limits: erlaubte Host-Modi, Modellklassen, Queue-Grenzen, Concurrent-Runs, Tages-Budget, BYOK/BYOA-Flags, max Token pro Lauf und Laufdauer.
2. `lib/agentic/billing/subscription-resolver.ts` – Bestimmt das aktive Abo pro User (In-Memory, spaeter DB/Stripe). Prueft Budget, Host-Modus, Live/Queue-Slots, BYOK-Berechtigung und clampt Token-Limits.
3. `lib/agentic/billing/byok-guard.ts` – BYOK/BYOA-Trennung: Stellt sicher, dass persoenliche API-Keys nie mit Plattform-Keys verwechselt werden. Persoenliche Coding-Plaene werden nicht als Backend-Standard verwendet.
4. `app/api/agentic/subscription/route.ts` – GET: Zeigt aktuelles Paket mit Limits, Verbrauch und allen verfuegbaren Tiers. POST: Setzt das Abo-Tier (spaeter Stripe-Webhook).

### Geaenderte Dateien
5. `app/api/chat/route.ts` – Subscription-Checks vor jedem Lauf: Budget, Host-Modus, Concurrent-Run-Slots und Queue-Slots. Token-Limit wird durch Paketgrenze geclampt. Subscription-Tier in Response-Headers und Run-Metadaten.

### Validierung
- `npx tsc --noEmit` – 0 Fehler.

## Nächste Phase danach
`10-messung-tests-und-rollout.md`
