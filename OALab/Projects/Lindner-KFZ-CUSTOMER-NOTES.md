# Lindner KFZ – Customer Notes

Website: https://kfz-lindner.de

## 2026-08-01

- ✅ Der E-Mail-Versand der Termin- und Bewerbungsformulare wurde auf das IONOS-Postfach `webseite@kfz-lindner.de` umgestellt und in Vercel konfiguriert.
- ✅ Interne Benachrichtigungen und automatische Eingangsbestätigungen mit React-Email-Templates wurden produktiv mit HTTP 200 und erfolgreicher SMTP-Annahme getestet.
- ✅ Der authentifizierte IONOS-Absender und die Formularadresse als `Reply-To` wurden SPF-/DMARC-gerecht eingerichtet.
- ✅ Die Vercel Function für den Formularversand wurde repariert und liefert auch bei ungültigen Anfragen wieder korrekte JSON-Antworten.
- ✅ Die Karriereseite ist nach der Vercel-SPA-Routing-Korrektur direkt unter `https://kfz-lindner.de/karriere` erreichbar und wurde inklusive Bewerbungsformular geprüft.
- 📚 Der wiederverwendbare Vercel-CLI-Ablauf für Login, Projektverknüpfung, Umgebungsvariablen, Deployments und Logs wurde in den OALab Shared Docs dokumentiert.
- ⚠️ Die tatsächliche Zustellung in den Kundenpostfächern und im Spamordner soll abschließend von Anne Lindner beziehungsweise Philipp Radloff bestätigt werden.
- ✅ Der leere IONOS-Posteingang wurde aufgelöst: Der MX-Eintrag der Domain führt eingehende E-Mails zu Microsoft 365, während IONOS nur als authentifizierter SMTP-Ausgang dient.
- ✅ Interne Formularbenachrichtigungen werden jetzt an das bestehende Microsoft-365-Postfach `info@kfz-lindner.de` adressiert; der kontrollierte Produktionstest wurde mit HTTP 200 und ohne Runtime-Fehler angenommen.
- ⚠️ Der tatsächliche Eingang des neuen Routingtests in `info@kfz-lindner.de` ist noch manuell zu bestätigen; für einen Empfang im IONOS-Webmail müsste Nexos eine providerübergreifende Mailrouting-Regel einrichten.
- ✅ Deutsche Umlaute und Sonderzeichen werden in den Termin- und Bewerbungs-E-Mails jetzt korrekt statt als sichtbare HTML-Codes dargestellt und wurden für HTML sowie Klartext geprüft.
