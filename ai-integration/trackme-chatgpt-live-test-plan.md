# TrackMe ChatGPT Live-Test-Plan

## Ziel
Wir wollen später echt prüfen, ob die wichtigsten ChatGPT-Wege in TrackMe sauber funktionieren.

## Was schon vorbereitet ist
- Es gibt jetzt ein Dev-Testkonto mit festen Browser-Zugangsdaten.
- Es gibt jetzt einen Dev-Setup-Weg für Beispieldaten, Freunde und Live-Status.
- Der neue ChatGPT-Tab in der App zeigt fertige Beispiel-Prompts.

## Dev-Testkonto
- E-Mail: `test-dev@trackme.local`
- Passwort: `TrackMeTest!123`
- Login-Seite: `/auth/signin`

## Wichtige Dev-Endpunkte
- `GET /api/dev/test-setup`
  Zeigt, was vorbereitet wird.
- `POST /api/dev/test-setup`
  Baut Testkonto, Beispieldaten, Freunde und Live-Status auf.
- `POST /api/dev/test-login`
  Gibt zusätzlich einen Dev-Token zurück.

## Empfohlener Ablauf später mit Playwright
1. Lokale App starten.
2. `POST /api/dev/test-setup` aufrufen.
3. `/auth/signin` öffnen.
4. Mit dem Dev-Testkonto einloggen.
5. Den AI-Dialog öffnen.
6. Den Tab `Mit ChatGPT steuern` öffnen.
7. Nacheinander diese Fälle prüfen:
   - Tagesdaten speichern
   - Status auf Training setzen
   - Freunde und Live-Status lesen
   - Letzte 30 Tage auswerten
   - Essen per Foto oder Screenshot vorbereiten

## Was im Test geprüft werden soll
- Wird der Nutzer sauber eingeloggt?
- Sind Beispieldaten sichtbar?
- Sind Freundedaten sichtbar?
- Sind Live-Status-Daten sichtbar?
- Sind die Prompt-Vorlagen leicht verständlich?
- Öffnet der ChatGPT-Button sauber?

## Späterer echter ChatGPT-Test
Für den echten Test in ChatGPT selbst brauchen wir zusätzlich:
- eine erreichbare URL von außen
- die fertige ChatGPT-Verbindung
- einen echten Verbindungs-Test mit Freigabe und Rückgabe

## Gute erste Test-Prompts
- `Trage bitte meinen heutigen Tag in TrackMe ein: Ich habe 7 Stunden geschlafen, 2,5 Liter Wasser getrunken und heute Pull-Training gemacht.`
- `Zeige mir bitte, was meine Freunde gerade machen.`
- `Analysiere bitte meine letzten 30 Tage in TrackMe.`
- `Setze meinen aktuellen TrackMe-Status bitte auf Training.`
