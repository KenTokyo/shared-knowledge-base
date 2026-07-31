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
