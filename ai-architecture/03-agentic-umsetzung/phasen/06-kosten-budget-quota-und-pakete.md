# Notedrill Mobile: Phase 06 Kosten, Budget, Quota und Pakete

Stand: 8. März 2026
Status: `DONE`
Abgeschlossen: 8. März 2026

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

## Was in dieser Phase konkret gelöst wurde

### 1. Modellklassen und Paket-Empfehlung
1. Ein gemeinsamer Helfer ordnet Modelle jetzt in einfache Klassen ein:
   - günstig
   - Standard
   - Premium
   - Spezialmodell
2. Daraus wird für den aktiven Weg direkt ein sinnvolles Paket empfohlen.

### 2. Paketwahl wird gemerkt
1. Nutzer können im Setup jetzt zwischen Auto, Starter, Standard und Plus wählen.
2. Diese Wahl bleibt gespeichert und wirkt im Chat-Banner und in der Budget-Prüfung weiter.

### 3. Echte Budget-Zähler laufen jetzt mit
1. Der Store zählt jetzt pro Lauf, Tag und Monat:
   - Kosten
   - Läufe
   - Token
2. Bereits verbuchte Run-IDs werden nicht doppelt gezählt.

### 4. Klare Stopps vor zu teuren Läufen
1. Vor dem Senden wird jetzt geprüft:
   - Grenze pro Lauf
   - Grenze pro Tag
   - Grenze pro Monat
2. Wenn der nächste Lauf zu teuer wäre, stoppt der Chat vor dem Request und zeigt einen klaren Hinweis.

### 5. Sichtbar im aktiven Mobile-Weg
1. Setup zeigt jetzt aktives Paket, Budget-Stand und Paketwahl.
2. Das Chat-Banner zeigt Paket, Tages- und Monatsstand und den letzten Budget-Stopp.
3. Nach einer Antwort wird der echte Lauf mit Tokenzahl und Kosten grob nachgetragen.

## Betroffene Dateien dieser Phase
1. `features/chat/components/model/model-budget-guide.ts`
2. `features/chat/components/model/model-budget-config.ts`
3. `features/chat/components/store/useChatBudgetStore.ts`
4. `features/chat/components/store/chat-budget-guard.ts`
5. `features/chat/components/store/useChatStore.ts`
6. `features/chat/components/onboarding/SetupGuidanceSections.tsx`
7. `features/chat/components/onboarding/setup-status-screen.styles.ts`
8. `features/chat/components/interface/ProviderRouteBannerSimple.tsx`

## Was das konkret für den User bedeutet
1. Der User sieht nicht nur Hinweise, sondern echte Grenzen.
2. Ein zu teurer Lauf wird vorher gestoppt statt erst nachher sichtbar.
3. Die Paketwahl bleibt erhalten und muss nicht jedes Mal neu gesetzt werden.

## Nicht Teil dieser Phase
Diese Punkte bleiben bewusst für spätere Produktblöcke:
1. Speicher- und Medienquoten technisch hart durchsetzen
2. Schul- oder Team-Pools serverseitig verwalten
3. Preisänderungen automatisch vom Backend ziehen

## Edge Cases

| Edge Case | Antwort |
|---|---|
| Nutzer löst endlose Schleifen aus | harte Run-Grenzen bremsen früher |
| viele PDFs und Bilder | Medienspeicher getrennt rechnen |
| Preisänderung bei Anbieter | Modellklassen und Preise zentral pflegen |
| BYOK-User hat kaputten Key | klare Abgrenzung zwischen Nutzer- und Betreiberkosten |
| Premium-Modell wird versehentlich Standard | Default nur über günstige Klasse erlauben |

## Plattformsicht
1. iPad-only und iPhone-only brauchen fast immer Betreiberbudget.
2. Companion-Nutzer können Betreiberkosten spürbar senken.
3. Schulen brauchen später zusätzlich Sitz- oder Poolmodelle.

## Done-Kriterien
1. Standardmodell ist klar.
2. Premium ist klar begrenzt.
3. Speicher und Medien sind getrennt planbar.
4. Harte Budgetlogik ist technisch angebunden.

## Nächste Phase danach
`07-kontext-stabilisierung-skills-und-rollen.md`
