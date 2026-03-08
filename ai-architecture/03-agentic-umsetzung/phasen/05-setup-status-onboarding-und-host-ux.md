# Notedrill Mobile: Phase 05 Setup-Status, Onboarding und Host-UX

Stand: 8. März 2026
Status: `PLANNED`

## Ziel
Diese Phase macht das ganze System für normale Nutzer verständlich.

## Warum diese Phase wichtig ist
Technisch gute Agenten bringen wenig, wenn der Nutzer nicht versteht:
1. welchen Host-Weg er gerade nutzt,
2. ob ein Tool fehlt,
3. ob nur der Login fehlt,
4. ob der Companion offline ist.

## Hauptaufgaben

### 1. Setup-Status-Karten
Für jeden lokalen oder halb-lokalen Weg:
1. installiert
2. Version
3. angemeldet
4. Host erreichbar
5. bewusst getrennt

### 2. Host-Modus im UI
1. Remote
2. Companion
3. Termux-Testweg
4. iSH-POC

### 3. klare Tutorials
1. iPad-only
2. iPad heute, MacBook später
3. Windows-App
4. Windows-Browser
5. Android-Termux
6. Schule mit gesperrten Geräten

### 4. Modell- und Kostenhinweise
1. günstig
2. Premium
3. eigenes API-Key-Modell
4. Abo-Login

## Edge Cases

| Edge Case | Antwort |
|---|---|
| Windows-Browser ohne Companion | klar sagen, dass Web keinen direkten CLI-Zugriff hat |
| Android-Emulator | `10.0.2.2` in Hilfe sichtbar machen |
| Companion absichtlich getrennt | nicht als Fehler anzeigen |
| Nutzer hat gar kein Zahlungsmittel | betreiberfinanzierte Pakete sichtbar machen |
| Nutzer hat nur Handy | kleine Aufgaben und Remote priorisieren |

## Betroffene Nutzerlagen
1. iPad-only Schüler
2. MacBook später
3. Windows-Nutzer
4. Linux- und MacBook-Power-User
5. Lehrkräfte und Schulen

## Done-Kriterien
1. Nutzer versteht den aktiven Modus.
2. Nutzer versteht den häufigsten Fehlergrund.
3. Nutzer bekommt einen klaren Ausweichweg angezeigt.

## Nächste Phase danach
`06-kosten-budget-quota-und-pakete.md`
