# Notedrill Mobile: Phase 09 Observability, Schulmodus und Rollout

Stand: 8. März 2026
Status: `DONE`
Umgesetzt: 8. März 2026

## Ziel
Diese Phase macht aus der Architektur einen betreibbaren Produktweg.

## Warum diese Phase wichtig ist
Ohne diese Phase gibt es:
1. zu teuren Support,
2. unklare Fehler,
3. keine sauberen Rollouts,
4. schlechte Schul- und Teamtauglichkeit.

## Hauptaufgaben

### 1. Beobachtung
1. Host gesund oder nicht
2. Bridge gesund oder nicht
3. Tool-Fehler sichtbar
4. Fallbacks sichtbar

### 2. Audit und Verlauf
1. Run-Verlauf
2. Tool-Verlauf
3. Artefakt-Verlauf
4. Admin-Hinweise

### 3. Schul- und Teammodus
1. Rollen
2. Sitz-Pools
3. Quoten
4. Companion nur für Lehrkräfte oder Admins

### 4. Rollout-Wellen
1. intern
2. kleine Testgruppe
3. iPad-only Kernzielgruppe
4. Companion-Upgrade

## Edge Cases

| Edge Case | Antwort |
|---|---|
| Companion fällt mitten im Unterricht aus | klarer Fallback und Status |
| mehrere Geräte pro Nutzer | Sitzungs- und Host-Regel |
| Provider hat Störung | Fallback-Kette sichtbar |
| Tokenbudget leer | günstigeres Modell oder Stop |
| Nutzer meldet „Tool fehlt“ | Setup-Status und Host-Status getrennt zeigen |

## Plattformsicht
1. Schulen brauchen meist Remote-first.
2. Companion sollte als Zusatzweg für erfahrene Rollen bleiben.
3. Browser und installierte App müssen im Support getrennt sein.

## Done-Kriterien
1. Fehler sind für Nutzer verständlich.
2. Admins können den Zustand sehen.
3. Rollout kann stufenweise passieren.

## Ende der Umsetzungsreihe
Wenn diese Phase sauber umgesetzt ist, ist der Agentic-Produktweg betrieblich tragfähig.
