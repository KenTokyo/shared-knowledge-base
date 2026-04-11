# Notedrill Mobile: Konkrete User Journeys und Setup-Checklisten

Stand: 8. März 2026

## Was wurde verstanden?
1. Die Szenarien sollen nicht nur in Tabellen stehen.
2. Du willst echte Abläufe sehen.
3. Wichtig ist: Was macht der Nutzer, was macht der Betreiber und wann fällt man auf einen anderen Weg zurück.

## So liest man diese Datei
1. `Journey` heißt: echter Weg im Alltag.
2. `Fallback` heißt: Was tun, wenn der Wunschweg nicht klappt.
3. `Fertig` heißt: Woran man merkt, dass das Setup wirklich läuft.

## Journey 1: Schüler hat nur iPad

### Ziel
Einfach starten, ohne Terminal und ohne PC.

### Was der Nutzer macht
1. App installieren
2. einloggen
3. Remote-Weg nutzen
4. direkt mit Chat, Notizen und Quiz starten

### Was der Betreiber macht
1. Remote-Host bereitstellen
2. Standardmodell festlegen
3. Quoten und Speicher festlegen
4. einfache Fehlertexte liefern

### Fertig
1. Setup ist grün ohne Companion
2. erste Chat-Nachricht läuft
3. Artefakte kommen sauber in Notedrill an

### Fallback
1. Wenn Premium-Modell fehlt, günstiges Modell nehmen
2. Wenn Netz schwach ist, lokal weiterschreiben und später synchronisieren

## Journey 2: Schüler hat iPad und bekommt später ein MacBook

### Phase A: heute
1. komplett remote starten
2. alle Daten im gleichen Dateivertrag speichern

### Phase B: später
1. Companion auf dem MacBook installieren
2. Codex, Gemini oder Claude verbinden
3. App koppeln

### Was wir dafür brauchen
1. gleiche Benutzeridentität auf beiden Wegen
2. sauberer Companion-Status
3. klare Rollen:
   - Remote ist Standard
   - Companion ist Upgrade

### Fertig
1. Nutzer kann zwischen Remote und Companion wechseln
2. Daten bleiben gleich
3. die App selbst bleibt gleich verständlich

## Journey 3: Android ohne Laptop

### Ehrliche Regel
Das ist ein Test- oder Bastelweg.
Kein blinder Produktweg.

### Was der Nutzer macht
1. Termux installieren
2. lokalen Host starten
3. in der App `Direkt auf diesem Android-Gerät` wählen
4. kleine Testfrage senden

### Empfohlene Reihenfolge der Tools
1. Gemini zuerst
2. Claude danach
3. Codex zuletzt

### Was der Betreiber macht
1. diesen Weg nur als Experiment kennzeichnen
2. Remote immer als Ausweichweg bereithalten

### Fertig
1. Setup grün
2. Host erreichbar
3. kleine Testfrage erfolgreich

### Fallback
1. `Über Laptop oder MacBook`
2. `Nur Online-Server`

## Journey 4: Windows-Nutzer mit installierter App

### Was der Nutzer macht
1. Companion starten
2. Tool installieren
3. Login prüfen
4. App koppeln

### Wichtig
1. Windows im Browser ist nicht gleich Windows mit lokaler App
2. Browser allein hat keinen direkten CLI-Zugriff

### Was wir oder der Betreiber machen
1. Companion-URL setzen
2. klare Windows-Anleitung liefern
3. WSL2 oder Shell-Themen sauber erklären, falls nötig

### Fertig
1. Companion erreichbar
2. Tool installiert
3. Login erkannt
4. Chat kann lokal geroutet werden

## Journey 5: Windows-Nutzer im Browser

### Harte Regel
Web allein hat keinen direkten Zugriff auf lokale CLI-Tools.

### Was der Nutzer machen muss
1. Companion zusätzlich starten
2. Companion-URL setzen oder hinterlegen

### Was sonst passiert
1. Tool-Status kann irreführend wirken
2. Nutzer denkt leicht: Tool fehlt
3. in Wahrheit fehlt oft nur die Verbindung zum Companion

### Fertig
1. Web sieht einen echten Live-Status
2. Companion ist erreichbar

## Journey 6: Linux- oder MacBook-Power-User

### Was der Nutzer macht
1. gewünschtes CLI installieren
2. Login aktivieren
3. Companion starten
4. Notedrill koppeln

### Gute Wege
1. Gemini CLI
2. Codex CLI
3. Claude Code

### Was wir brauchen
1. gute Setup-Karten
2. Tool-Status
3. klare Fallback-Reihenfolge

### Fallback
1. remote weiterarbeiten
2. später lokalen Host erneut koppeln

## Journey 7: Schule mit gesperrten Geräten

### Was realistisch ist
1. Schülergeräte nutzen nur Remote
2. Lehrkräfte oder Admins können Companion nutzen

### Was der Betreiber macht
1. zentralen Host betreiben
2. Rollen und Quoten verwalten
3. Support bündeln

### Was das Notedrill-Team liefern muss
1. Admin-Doku
2. Audit-Logs
3. klare Rollout-Regeln

### Fertig
1. Schüler kommen ohne Terminal aus
2. Lehrkräfte haben optional stärkere Tools

## Journey 8: iPad mit iSH als Experiment

### Nur wenn alle Punkte grün sind
1. CLI lässt sich installieren
2. Login klappt
3. Host startet
4. Notedrill erreicht den Host

### Sonst
1. sofort zurück auf Remote
2. kein halbfertiges Produktversprechen

## Gemeinsame Setup-Checkliste für lokale Wege

| Prüfpunkt | Warum wichtig | Wer sieht das |
|---|---|---|
| Tool installiert | ohne Binary geht nichts | Nutzer und App |
| Version erkannt | hilft bei Support und Bugs | Nutzer und Team |
| Login erkannt | verhindert falsches „Tool fehlt“ | Nutzer und App |
| Host erreichbar | ohne Host kein lokaler Lauf | Nutzer und App |
| gewählter Modus korrekt | falscher Modus erzeugt falsche Fehlbilder | Nutzer |
| Fallback vorhanden | verhindert Sackgassen | Nutzer und Betreiber |

## Was wir in der App noch sichtbar machen sollten

| Bereich | Warum |
|---|---|
| Host-Modus-Karte | Nutzer soll sehen, ob er remote, Companion oder Termux nutzt |
| Tool-Status-Karten | installiert, Version, Login, erreichbar |
| Fallback-Hinweis | wenn lokaler Weg ausfällt, klare Alternative zeigen |
| Kostenhinweis | Premium- oder API-Wege verständlich machen |
| bewusste Trennung | wenn Companion absichtlich getrennt wurde, nicht als Fehler zeigen |

## Meine wichtigste Ergänzung aus den alten Projektunterlagen
1. `Windows-Web` ist ein eigenes Szenario und darf nicht mit lokaler App verwechselt werden.
2. `Android-Emulator mit Laptop` ist ein eigener Testweg.
3. `iPad mit iSH` ist nur ein experimenteller Zusatz.
4. Der Nutzerweg braucht sichtbare Host-Modi und echte Setup-Status-Karten.

## Quellen aus dem Projekt
1. `History/tablet-cli-hostmodi-verlauf.md`
2. `History/termux-android-agent-tutorial-verlauf.md`
3. `History/planung-ki-chat-ohne-serverpflicht.md`
4. `docs/guides/mobile-expo-go-runbook.md`
5. `History/windows-web-companion-qa-verlauf.md`
