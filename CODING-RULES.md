# Arbeitsregeln (Coding Rules)

Unsere Regeln für alle Projekte, zusätzlich zum `AGENTS.md` des Projekts. Einmal je frischem Kontext lesen.

**Nicht-Frontier:** Steht in `<model_rules>` kein „Frontier für: …“ mit deinem Bereich, vor der ersten Änderung in [CODING-RULES-ZUSATZ.md](CODING-RULES-ZUSATZ.md) „Allgemein“ und deinen Abschnitt lesen.

## 1. Auftrag

- **Für den faulen Menschen bauen:** so wenig Klicks wie möglich. Was immer laufen soll, ist von selbst an, bleibt nach Neustarts an und verbindet sich selbst neu („aus“ nur auf Wunsch); nie ein Klick an einem anderen Gerät (der Nutzer ist unterwegs). Vor der Abgabe den Alltag durchspielen: Neustart, App zu, unterwegs, nicht angemeldet.
- **Betrieb selbst in Ordnung bringen:** NoteTree- und TreeChat-Fehler, falsche Status- oder Kontoanzeigen und kaputte Skills beheben oder melden, nie umgehen; braucht es den Menschen, „Braucht dich“ mit echtem Ziel (Anmeldung: `open: "provider-login"`), nie ein Einstellungspfad in Worten.

## 2. Aufgabendateien

- Eine Datei mit `## Ungefähre Suche` ist der Entwurf eines kleinen Modells: Pfade und Angaben vor dem Ändern prüfen, falsche Treffer streichen, dieselbe Datei weiterführen.

## 3. Code

- **Vorhandenen Baustein nutzen** (`pnpm wer`, `components/ui/`, `components/ki/`) und lieber um eine Eigenschaft erweitern als eine fast gleiche Kopie bauen.
- **Leerlauf kostet Strom:** im Hintergrund läuft nichts endlos; Prüfweg [IDLE-PERFORMANCE.md](IDLE-PERFORMANCE.md). Leistung immer gegen einen vorher gemessenen Wert abnehmen.

## 4. Prüfen

- Browser-, Dev-Server-, UI- und Spielprüfungen, die der Auftrag braucht, sind mit ihm erlaubt; Einzelheiten [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md). Tabs und Fenster des Nutzers bleiben, 3D nie mit Software-Rendering.

## 5. Geheimnisse und Git

- Testzugänge nur für den beauftragten Test und in dessen Kosten- und Anbietergrenzen; Werte nur in ignorierten Dateien oder Umgebungsvariablen.
- **Fertiges committen und sofort pushen** (erst der Push baut auf Coolify), auf dem aktuellen Zweig; reine Leseaufträge ohne Commit.
- **Selbst zusammenführen:** eingehende Änderungen ohne Rückfrage einarbeiten, den eigenen Stand vorher sichern. Bei Konflikt gewinnt unser gewolltes Verhalten, passende Fixes von außen bleiben, Daten werden nach fester ID ohne Doppelte vereint, nie pauschal „ours“ oder „theirs“; nur fragen, wenn Daten verloren gingen oder der Nutzer entscheiden muss.
- **Submodule:** erst darin committen und pushen, dann den Zeiger im Hauptprojekt.

## 6. Schreiben

- **Aufgabendateien und Doku:** Deutsch in Alltagswörtern, Stichpunkte `- **Thema:** Kern`.
- **Regeln, Skills, Memory:** nur was jetzt gilt, eine Regel je Punkt; keine Daten, Zitate, Anlässe, Chat- oder Aufgabennummern (Verlauf steht in Git und Aufgabendateien); Neues ersetzt die alte Zeile.
- Echte Umlaute (UTF-8). Logs kurz: Schritt, Modul, Ergebnis, Dauer.

## 7. Fachregeln erst beim Ändern lesen

- **Frontend-Datei:** [FRONTEND-RULES.md](FRONTEND-RULES.md) mit der [Layout-Abnahme](FRONTEND-RULES.md#verbindliche-layout-abnahme-für-arbeitsoberflächen); Spiel-Oberflächen: [GAME-UI-GUIDE.md](GAME-UI-GUIDE.md); Aussehen: `DESIGN.md` des Projekts.
- **Genannter Design-Skill gilt:** Nennt der Nutzer einen, genau diesen laden und danach bauen; widerspricht ihm eine Regel, die Regel melden und berichtigen.
- Lokale Pfade, Ports, Testschlüssel: [macOS](MACOS-RESSOURCEN.md) oder [Windows](WINDOWS-RESSOURCEN.md).
- Neue belegte Lektionen beim Projekt ablegen (`docs/wissen/` oder Aufgabendatei), keine neuen Sammlungen.
