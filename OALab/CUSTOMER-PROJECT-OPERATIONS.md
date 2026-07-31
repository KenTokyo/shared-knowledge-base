# OALab-Kundenprojekte: Accounts, Mail und Produktionstests

Diese Regeln gelten für Projekte unter `Kundenprojekte`.

## GitHub-Account beim Commit

Kundenprojekt-Commits und Pushes erfolgen mit dem GitHub-Account `oalabhypercode`. Danach wird der Arbeitsaccount wieder auf `KenTokyo` gestellt.

```bash
gh auth switch --user oalabhypercode
gh auth status
git commit -m "<fachliche Commit-Nachricht>"
git push <korrektes-remote> main
gh auth switch --user KenTokyo
gh auth status
```

Vor jedem Push müssen Remote, Branch und Ziel-Repository ausdrücklich geprüft werden. Der Accountwechsel allein ändert weder das Git-Remote noch die Commit-Autorendaten. Keine fremden Änderungen pauschal stagen.

## Hosting-Account prüfen

Die GitHub- und Vercel-Zuständigkeit darf nicht aus dem Ordnernamen abgeleitet werden. Vor Änderungen immer das verlinkte Vercel-Projekt und den Scope prüfen:

```bash
vercel whoami
vercel project inspect <projektname>
vercel env ls
```

Secrets werden ausschließlich in ignorierten lokalen Env-Dateien und im richtigen Vercel-Projekt gespeichert. Passwörter, Tokens und vollständige Zugangsdaten gehören nie in Beispiele, Logs, Commits oder diese Wissensbasis.

## Mailprovider

Bei Kundenprojekten ist Netcup häufig der Mailprovider, aber kein verbindlicher Standard. Die vom Kunden gelieferten Daten sind maßgeblich. Vor dem Rollout prüfen:

- SMTP-Host, Port und TLS-Modus
- authentifizierter SMTP-Benutzer
- internes Zielpostfach
- erlaubte Absenderadresse
- SPF- und DMARC-Ausrichtung
- ob der Provider selbst DKIM signiert

Die Formularadresse gehört als `Reply-To` in die interne Nachricht. Als `From` soll grundsätzlich das authentifizierte Postfach verwendet werden; eine fremde Absenderdomain kann SPF/DMARC verletzen. Eigene DKIM-Konfiguration nur einbauen, wenn sie ausdrücklich bereitgestellt und verlangt wurde.

## Kontrollierte Produktionstests mit Playwright CLI

Playwright CLI darf für klar begrenzte Abnahmetests auf echten Kundenseiten eingesetzt werden. Dabei gelten folgende Regeln:

1. Testdaten eindeutig als OALab-Test kennzeichnen.
2. Eine kontrollierte Zieladresse verwenden, wenn eine Bestätigung geprüft wird.
3. Vor dem finalen Klick Netzwerk- und Formularzustand kontrollieren.
4. Jedes echte Formular höchstens einmal absenden, sofern kein Fehler eine gezielte Wiederholung erfordert.
5. HTTP-Status, sichtbare Erfolgsmeldung und Vercel-Runtime-Logs prüfen.
6. Screenshots und Logs ohne personenbezogene Daten oder Secrets ablegen.
7. Empfang und Spamordner können technisch nicht garantiert werden; SMTP-Annahme und bestätigter Postfacheingang getrennt dokumentieren.
