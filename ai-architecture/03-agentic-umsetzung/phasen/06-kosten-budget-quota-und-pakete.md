# Notedrill Mobile: Phase 06 Kosten, Budget, Quota und Pakete

Stand: 8. März 2026
Status: `PLANNED`

## Ziel
Diese Phase macht die Agentic-Funktion wirtschaftlich planbar.

## Warum diese Phase wichtig ist
Ohne saubere Kostenlogik kann:
1. iPad-only zu teuer werden,
2. Premium-Modelle aus dem Ruder laufen,
3. Schule oder Reseller keine klaren Pakete planen.

## Hauptaufgaben

### 1. Modellklassen definieren
1. günstig
2. Standard
3. Premium
4. Spezialmodell

### 2. Budgetgrenzen
1. pro Run
2. pro Tag
3. pro Monat
4. pro Rolle

### 3. Speicherquoten
1. Textspeicher
2. Medienspeicher
3. Schul- oder Team-Pools

### 4. Paketlogik
1. Free oder Test
2. Standard
3. Plus
4. Lehrkraft
5. Schule oder Team

## Edge Cases

| Edge Case | Antwort |
|---|---|
| Nutzer löst endlose Schleifen aus | harte Run-Grenzen |
| viele PDFs und Bilder | Medienspeicher getrennt rechnen |
| Preisänderung bei Anbieter | Modellklassen und Preise zentral pflegen |
| BYOK-User hat kaputten Key | klare Abgrenzung zwischen Nutzer- und Betreiberkosten |
| Premium-Modell wird versehentlich Standard | Default nur über günstige Klasse erlauben |

## Plattformsicht
1. iPad-only und iPhone-only brauchen fast immer Betreiberbudget.
2. Companion-Nutzer können Betreiberkosten spürbar senken.
3. Schulen brauchen Sitz- oder Poolmodelle.

## Done-Kriterien
1. Standardmodell ist klar.
2. Premium ist klar begrenzt.
3. Speicher und Medien sind getrennt planbar.

## Nächste Phase danach
`07-kontext-stabilisierung-skills-und-rollen.md`
