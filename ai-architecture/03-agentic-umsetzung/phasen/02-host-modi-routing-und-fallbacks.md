# Notedrill Mobile: Phase 02 Host-Modi, Routing und Fallbacks

Stand: 8. März 2026
Status: `PLANNED`

## Ziel
Diese Phase regelt, wie Notedrill je nach Gerät und Lage den richtigen Host auswählt.

## Warum diese Phase wichtig ist
Notedrill hat nicht nur einen Weg:
1. Remote
2. Companion
3. Android Termux
4. iPad iSH POC

Ohne klare Host-Logik versteht später weder der Nutzer noch das System, was gerade aktiv ist.

## Ziel-Host-Modi
1. `app_remote`
2. `desktop_companion`
3. `laptop_remote_fallback`
4. `android_termux_experimental`
5. `ipad_ish_experimental`

## Hauptaufgaben

### 1. Host-Modus-Modell definieren
1. manueller Modus
2. erkannter Modus
3. aktiver Modus
4. Fallback-Grund

### 2. Routing-Regeln pro Gerät
1. iPad-only -> Remote
2. iPhone-only -> Remote
3. Android ohne Laptop -> Remote oder Termux-Test
4. MacBook -> Companion oder Remote
5. Windows-App -> Companion oder Remote
6. Windows-Browser -> nur mit Companion für lokale CLIs

### 3. Fallback-Kette definieren
1. Companion offline -> Remote
2. Remote down -> lokales Arbeiten ohne KI
3. Termux kaputt -> Remote oder Laptop
4. iSH scheitert -> Remote

### 4. Host-Status im Store verankern
1. erreichbar
2. instabil
3. getrennt
4. bewusst deaktiviert

## Betroffene Nutzerlagen

| Fall | Was diese Phase liefern muss |
|---|---|
| iPad-only | immer ehrlicher Remote-Hauptweg |
| iPad heute, MacBook später | klarer Übergang ohne Datenbruch |
| Windows nur im Browser | klarer Hinweis: lokales CLI nur mit Companion |
| Android Emulator | Host-IP sauber über `10.0.2.2` |
| Schule mit MDM | Remote-first ohne lokale Installpflicht |

## Edge Cases

| Edge Case | Antwort dieser Phase |
|---|---|
| Nutzer wechselt WLAN | Host neu prüfen und Fallback sauber zeigen |
| Companion-Port belegt | klaren Fehler mit Alternativhinweis |
| zwei Geräte greifen auf denselben Companion zu | Sitzungsregeln definieren |
| Browser und App laufen gleichzeitig | Host-Zustand darf nicht durcheinander geraten |
| Android Emulator nutzt `127.0.0.1` falsch | Team-Runbook und feste Regel |

## Plattformsicht

### iOS
1. Remote als Kern
2. iSH nur POC

### Android
1. Remote als Kern
2. Termux nur Testweg

### Mac und Linux
1. Companion ist starker Upgrade-Weg

### Windows
1. Browser und App müssen getrennt gedacht werden

## Done-Kriterien
1. Jeder Nutzerweg hat einen klaren Host-Modus.
2. Jeder Host-Modus hat einen Fallback.
3. Die App zeigt den aktiven Modus ehrlich an.
4. Windows-Browser, Emulator und iPad-POC sind nicht mehr versteckte Sonderfälle.

## Nächste Phase danach
`03-provider-adapter-und-ausfuehrungswege.md`
