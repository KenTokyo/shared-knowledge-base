# Vercel CLI: Login, Projektanlage und Betrieb

Dieser Leitfaden beschreibt den wiederholbaren OALab-Ablauf für Kundenprojekte. GitHub-Account und Vercel-Account sind getrennte Zuständigkeiten: Ein `gh auth switch` ändert weder den Vercel-Login noch den Vercel-Scope.

## 1. CLI installieren und anmelden

```bash
npm install --global vercel@latest
vercel login
vercel whoami
vercel teams list
```

`vercel login` startet den interaktiven Login. Zugangstokens dürfen nicht in Repositories, Shell-Skripten, Notizen oder Chat-Logs stehen.

Wenn mehrere Teams oder Accounts verfügbar sind, den richtigen Scope ausdrücklich auswählen und erneut prüfen:

```bash
vercel teams switch <scope-slug>
vercel whoami
vercel teams list
```

Alternativ kann bei kritischen Befehlen der Scope explizit angegeben werden:

```bash
vercel project list --scope <scope-slug>
```

## 2. Vorhandenes Projekt verlinken

Zuerst Projektname und Scope ermitteln, dann gezielt verlinken:

```bash
vercel project list --scope <scope-slug>
vercel link --project <project-name> --scope <scope-slug> --yes
vercel project inspect <project-name> --scope <scope-slug>
vercel env ls
```

Die Verlinkung liegt lokal unter `.vercel/`. Dieser Ordner muss ignoriert bleiben. Vor jeder Änderung kontrollieren:

- stimmt `vercel whoami`?
- stimmt der Scope?
- stimmt der Projektname?
- zeigt das Projekt auf das erwartete Git-Repository und die erwarteten Domains?

## 3. Neues Projekt anlegen

```bash
vercel project add <project-name> --scope <scope-slug>
vercel link --project <project-name> --scope <scope-slug> --yes
vercel git connect <git-repository-url>
vercel project inspect <project-name> --scope <scope-slug>
```

Bei einem Git-verknüpften Projekt ist der bevorzugte Produktionsablauf: fachlichen Commit pushen, das automatische Deployment beobachten und anschließend die Ziel-Domain testen. Ein manuelles Deployment ist nur für bewusst kontrollierte Fälle nötig:

```bash
vercel deploy --prod --yes
```

## 4. Umgebungsvariablen sicher verwalten

Werte interaktiv eingeben, damit Secrets nicht als Klartext in der Kommandozeile oder Shell-History landen:

```bash
vercel env add <NAME> development
vercel env add <NAME> preview --sensitive
vercel env add <NAME> production --sensitive
vercel env ls
```

Lokale Development-Werte nur in eine ignorierte Datei ziehen:

```bash
vercel env pull .env.local --environment=development --yes
```

Wichtig:

- `.env.local`, `.env` und `.vercel/` müssen ignoriert sein.
- Keine Tokens oder Passwörter in `vercel deploy -e ...`, Commits oder Dokumentation schreiben.
- Sensitive Preview-/Production-Werte können beim Pull leer oder geschützt erscheinen. Ihre Funktion wird über einen kontrollierten Runtime-Test geprüft, nicht durch Ausgabe des Secrets.
- Nach Änderungen an Runtime-Variablen ein neues Deployment erzeugen.

## 5. Deployment beobachten und prüfen

`vercel ls` schreibt seine Tabelle je nach CLI-Version auf stderr. Für Skripte deshalb beide Ausgabekanäle zusammenführen:

```bash
vercel ls --yes 2>&1
vercel inspect <deployment-url> --wait --timeout 3m
vercel inspect <deployment-url> --logs
```

Danach die Produktions-Domain und relevante API-Routen testen. Runtime-Fehler gezielt abrufen:

```bash
vercel logs --environment production --since 30m --expand --no-branch
vercel logs --environment production --since 30m --status-code 500 --expand --no-branch
vercel logs --environment production --since 30m --level error --expand --no-branch
```

Ein erfolgreicher Build beweist noch nicht, dass eine Serverless Function importiert werden kann oder externe Dienste erreicht. Immer mindestens einen sicheren Runtime-Test durchführen.

## 6. Vite-/React-SPA: direkte Unterseiten

Bei `BrowserRouter` muss Vercel bekannte Frontend-Routen auf `index.html` umschreiben. Sonst funktioniert die Navigation innerhalb der App, während ein direkter Aufruf oder Browser-Refresh mit `404: NOT_FOUND` endet.

Wenn das Projekt zusätzlich `/api/*`-Functions besitzt, bekannte SPA-Routen explizit eintragen und API-Routen unberührt lassen:

```json
{
  "rewrites": [
    { "source": "/karriere", "destination": "/index.html" },
    { "source": "/datenschutz", "destination": "/index.html" }
  ]
}
```

Nach einer Änderung sowohl die Unterseite direkt als auch alle wichtigen API-Endpunkte prüfen.

## 7. Rücknahme und Abschluss

Falls ein Production-Deployment fehlerhaft ist:

```bash
vercel rollback <deployment-url-or-id>
```

Abschlusscheck:

1. Deployment ist `Ready` und enthält den erwarteten Commit.
2. Produktions-Domain zeigt auf dieses Deployment.
3. Direkte Frontend-Routen und API-Routen liefern den erwarteten Status.
4. Runtime-Logs enthalten keine neuen Fehler.
5. Secrets wurden weder ausgegeben noch committed.
6. GitHub-Arbeitsaccount wurde nach den OALab-Commits wieder auf `KenTokyo` gestellt.
