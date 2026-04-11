# Notedrill Mobile: Phase 05 Setup-Status, Onboarding und Host-UX

Stand: 8. März 2026
Status: `DONE`

## Ziel
Diese Phase macht den aktiven KI-Weg für normale Nutzer verständlich.

## Validierter Umfang
Diese Phase wurde vor der Umsetzung noch einmal geprüft.

Wichtig war dabei:
1. Produktweg bleibt Mobile-App, nicht Web-Hauptprodukt.
2. Windows-Browser bleibt ein Randfall aus der Recherche, aber nicht der Kern dieser Mobile-Phase.
3. Kostenlogik mit Budgets und Paketen gehört als eigener Block in Phase 06.

## Was in dieser Phase konkret gelöst wurde

### 1. Setup-Status im aktiven Hauptweg
Für die aktiven Wege gibt es jetzt klare Statuskarten mit:
1. installiert,
2. angemeldet,
3. verbunden,
4. Version,
5. Pfad,
6. kurzen Hilfehinweisen.

### 2. Host-Modus direkt im Chat
Der Chat zeigt jetzt sichtbar:
1. ob Remote,
2. ob Companion,
3. ob Termux-Testweg,
4. ob iSH-Testweg,
5. wann ein Fallback aktiv ist.

### 3. Alltagshilfen für echte Nutzerlagen
Es gibt jetzt kurze Schnellstart-Hilfen für typische Fälle:
1. nur iPad oder iPhone,
2. heute iPad, später MacBook,
3. nur Android als Testweg,
4. iSH nur als Probe,
5. Schulgerät mit Sperren.

### 4. Modell- und Kostenhinweise im Alltag
Die Phase zeigt jetzt im Setup und im Chat:
1. welches Modell gerade gewählt ist,
2. ob es eher günstig, mittel oder eher Premium ist,
3. ob der Weg eher über Server-Budget, API-Key oder Abo-Login läuft.

## Edge Cases, die in Phase 05 sichtbar gemacht wurden

| Edge Case | Antwort |
|---|---|
| Android-Emulator | Hilfe kann weiter auf `10.0.2.2` verweisen |
| Companion absichtlich getrennt | Nutzer bekommt klare Hilfe statt nur rotem Status |
| Nutzer hat nur Handy | Remote bleibt der ruhige Standard, lokale Wege sind klar als Test markiert |
| iSH wackelt | der Rückweg zu Remote oder Companion ist direkt erklärt |

## Was das konkret für den User bedeutet
Der User sieht jetzt schneller:
1. welcher Weg gerade aktiv ist,
2. warum etwas nicht läuft,
3. welcher einfache Rückweg gerade am sichersten ist.

## Nicht Teil dieser Phase
Diese Punkte bleiben absichtlich für Phase 06:
1. Betreiberbudget,
2. Quoten pro Nutzer,
3. Premium- oder Schulpakete,
4. echte Preislogik für Produktpakete.

## Done-Kriterien
1. Nutzer versteht den aktiven Modus.
2. Nutzer versteht den häufigsten Fehlergrund.
3. Nutzer bekommt einen klaren Ausweichweg angezeigt.
4. Modell- und Kostenhinweise sind im Alltag sichtbar.

## Nächste Phase danach
`06-kosten-budget-quota-und-pakete.md`
