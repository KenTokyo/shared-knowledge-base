# Notedrill Backend Next.js: Phase 09 Abo-Preise und Paketlogik

Stand: 8. März 2026
Status: `PLANNED`

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

## Nächste Phase danach
`10-messung-tests-und-rollout.md`
