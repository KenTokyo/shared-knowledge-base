# OALab-Kundenprojekte: Operations-Regeln

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

## Kurze Zwischenstands-Commits

Kleine abgeschlossene Änderungen und kundenrelevante Zwischenstände zeitnah committen, statt viele unabhängige Arbeiten in einem großen Sammel-Commit zu bündeln.

Regeln:

1. Pro Commit nur ein fachliches Thema aufnehmen.
2. Nur die zugehörigen Dateien gezielt stagen; niemals pauschal fremde Änderungen übernehmen.
3. Vor dem Commit mindestens den passenden Build-, Typ-, Lint- oder Runtime-Test ausführen.
4. Commit-Betreff kurz als `<typ>: <ergebnis>` formulieren, möglichst unter 72 Zeichen.
5. Bevorzugte Typen sind `feat`, `fix`, `docs`, `test`, `refactor` und `chore`.
6. Keine Secrets, Kundendaten oder technischen Rohnotizen in Commit-Nachrichten schreiben.

Beispiele:

```text
fix: deliver contact forms through IONOS
fix: support direct Vercel SPA routes
docs: record customer mail rollout
```

## Customer Notes pro Projekt

Für jedes Kundenprojekt eine fortlaufende Datei unter `OALab/Projects/<PROJEKT>-CUSTOMER-NOTES.md` pflegen. Sie ist der kurze, kundenlesbare Verlauf und darf keine Passwörter, Tokens oder personenbezogenen Testdaten enthalten.

Nach jedem verifizierten kundenrelevanten Arbeitsblock:

1. unter einer Überschrift im Format `## YYYY-MM-DD` genau einen kurzen Ergebnissatz ergänzen,
2. ausschließlich bestätigte Zustände dokumentieren,
3. technische Annahme und vom Kunden bestätigten Empfang klar unterscheiden,
4. den Eintrag zusammen mit einem kurzen `docs:`-Commit in den Shared Docs sichern,
5. anschließend den Gitlink im Kundenprojekt gezielt aktualisieren.

Empfohlene Kennzeichnung:

- `✅` produktiv erledigt und geprüft
- `📚` Dokumentation oder Prozess verbessert
- `⚠️` Rückfrage, Risiko oder Kundenbestätigung offen

Vorlage:

```markdown
# <Kunde> – Customer Notes

Website: https://example.de

## 2026-08-01

- ✅ Das Kontaktformular wurde produktiv geprüft und versendet wieder erfolgreich.
- ⚠️ Der tatsächliche Postfacheingang soll noch vom Kunden bestätigt werden.
```

Commit-Betreff und Customer-Notes-Satz sollen dasselbe Ergebnis in technischer beziehungsweise kundenlesbarer Form ausdrücken. Reine lokale Versuche, fehlgeschlagene Zwischenwege und vertrauliche Details gehören nicht in die Customer Notes.

## Hosting-Account prüfen

Die GitHub- und Vercel-Zuständigkeit darf nicht aus dem Ordnernamen abgeleitet werden. Vor Änderungen immer das verlinkte Vercel-Projekt und den Scope prüfen:

```bash
vercel whoami
vercel project inspect <projektname>
vercel env ls
```

Secrets werden ausschließlich in ignorierten lokalen Env-Dateien und im richtigen Vercel-Projekt gespeichert. Passwörter, Tokens und vollständige Zugangsdaten gehören nie in Beispiele, Logs, Commits oder diese Wissensbasis.

Der vollständige Ablauf für Login, Scope-Auswahl, Projektanlage, Verlinkung, Env-Variablen, Deployment und Runtime-Logs steht in [VERCEL-CLI-WORKFLOW.md](VERCEL-CLI-WORKFLOW.md).

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
