# Arbeitsregeln (Coding Rules)

Gilt für jede KI in jedem Projekt. Einmal je frischem Kontext lesen; später nur geänderte Abschnitte. Fachwissen steht in den verlinkten Dateien, nicht hier.

**Frontier oder nicht?** Ein Frontier-Modell ist ein Spitzenmodell, das Grundlagen von selbst richtig macht. Steht im Block `<model_rules>` deiner Nachricht „Frontier für: …“ mit dem Bereich deiner Aufgabe (Backend, Frontend oder alles), überspringst du die Zusatzregeln. Sonst – auch ohne jede Angabe – liest du vor der ersten Änderung in [CODING-RULES-ZUSATZ.md](CODING-RULES-ZUSATZ.md) „Allgemein“ und den Abschnitt deines Bereichs.

## 1. Auftrag verstehen und schützen

- Reihenfolge: Plattform- und Systemregeln → aktueller Wunsch des Nutzers → `AGENTS.md` des Projekts → diese Regeln → Fachregeln. Eine Ausnahme des Nutzers gilt nur für die genannte Aufgabe.
- Erst passende Dateien, Doku und Git-Stand ansehen, dann entscheiden. Nur so viel lesen wie nötig; aufhören, sobald der nächste Schritt belegt ist.
- Alles behalten: Mengen, Pfade, Befehle, Namen, Grenzen, Verneinungen und was schon funktioniert. Diktierfehler nur verbessern, wenn der Sinn klar ist.
- Den Wortlaut klarer machen, nie den Umfang: Aus fünf Effekten werden nicht zehn. Keine erfundenen Funktionen, Regeln oder Architektur. Eigene Ideen nur dort, wo der Nutzer etwas offenlässt.
- Ein schon verbesserter Prompt ist der Auftrag; ihn nicht noch einmal verbessern.
- Kleine Annahmen selbst treffen und kurz nennen. Nur fragen, wenn die Antwort das Ergebnis, hohe Kosten, Sicherheit oder etwas Unumkehrbares ändert. Nicht um Erlaubnis für offensichtliche nächste Schritte bitten.

## 2. Nur so viel planen, wie die Aufgabe braucht

- **Frage, Beratung, Prüfung ohne Änderung:** direkt antworten. Keine Aufgabendatei, kein Build, kein Commit.
- **Kleine, klare Änderung:** eine kurze Checkliste reicht. Gibt es schon eine passende Aufgabendatei, dort weiterführen.
- **Mehrstufig, riskant oder lang:** vor dem Bauen EINE Aufgabendatei anlegen oder fortsetzen. Ort: Aufgabenordner des Projekts (wie `AGENTS.md` oder `CLAUDE.md` ihn nennen, sonst `docs/tasks/`). Name wie im Projekt üblich, sonst `<JJJJ-MM-TT>-<thema>-tasks.md`. Keine eigene Prompt-Datei, den Entwurf des Nutzers nicht wörtlich abschreiben.
- **Aufbau von oben nach unten:** `## Initial goal` (Ziel in ein bis zwei Sätzen) → `## Improved prompt` (der verbesserte Auftrag; jedes Bild, jede Datei, jeden Pfad und Link genau so übernehmen, Geheimnisse als `[REDACTED: secret]`) → Phasen. Neue Wünsche zur selben Aufgabe datiert in `## Improved prompt` einarbeiten. Allgemeine Regeln nicht hineinkopieren.
- **Jede Phase:** Ziel, Punkte mit `[ ]`/`[x]`, kurzes Ergebnis, höchstens drei Pfade. Gründe, Risiken oder Architektur nur, wenn sie eine Entscheidung ändern.
- Nach jedem Fortschritt abhaken und weitermachen. Funde gleich im selben Plan beheben; keine Aufräum-Pläne für Aufräum-Pläne, keine fremden Zusatzfunktionen.
- **Über 500 Zeilen:** nicht weiter anhängen. Folgedatei mit `-2` am Ende anlegen (`…-tasks-2.md`, z. B. `2026-10-17-login-tasks-2.md`, danach `-3`): Verweis auf die alte Datei, Ziel, aktueller `## Improved prompt`, nur offene Phasen. Die alte Datei bekommt unten einen Verweis auf die neue. Dieselbe Regel steht im Enhanced-Prompt-System von TreeChat.
- **Orchestrieren** (nur wenn der Nutzer Helfer, Unterchats oder einen Orchestrator verlangt): Gemeinsames einmal (Regeln, Absprachen, wem welche Datei gehört) und je Helfer eine nummerierte Aufgabe mit Ziel, eigenen Dateien und erwartetem Ergebnis in die Aufgabendatei; der Prompt an den Helfer nennt nur Datei und Nummer. Jeder Helfer hakt nur seine eigene Aufgabe ab.
- **Übergabe:** Ziel, Stand, nächster Schritt, Blocker, Pfade, Befehle. Nach Kontextverlust: Auftrag → Aufgabendatei → betroffener Code lesen, nicht den ganzen Verlauf nachspielen.
- Vor der Abgabe das Ergebnis mit dem Auftrag und den offenen Abnahmepunkten vergleichen.
- Mehr zu Phasen: [Phasen ohne Stopps](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md).

## 3. Code und Aufbau

- Zuständiges Modul und Datenfluss verstehen. Muster des Projekts nutzen. Einfache Bausteine mit einer klaren Aufgabe und **einer** verlässlichen Datenquelle (eine Stelle hält den Zustand, nicht zwei).
- Gemeinsame Module nur bei echter Mehrfachnutzung. Keine Sammeldateien, doppelten Stores, versteckten Ersatzwege oder Schichten ohne Nutzen.
- Ursachen beheben, nicht Anzeichen. Abgelösten Code löschen, nachdem die Verweise geprüft sind. Funktionierendes Verhalten und Änderungen anderer bleiben.
- Neue, von Hand geschriebene Code-Dateien bleiben unter 1.200 Zeilen. Große bestehende Dateien nur aufteilen, wenn die Aufgabe dort arbeitet; ein Mini-Fix löst keinen Umbau aus. Erzeugte und fremde Dateien sind ausgenommen; strengere Projektgrenzen gelten.
- **Leerlauf kostet Strom:** keine endlosen Schmuck-Animationen; Platzhalter für Bilder bleiben still. Was sich wiederholt (Animation, Zeichnen, Abfragen), braucht einen Zweck und stoppt, wenn die Fläche verborgen oder inaktiv ist. Spiel, Medien und nötige Hintergrundjobs bleiben. Prüfweg: [IDLE-PERFORMANCE.md](IDLE-PERFORMANCE.md).

## 4. Prüfen

- Erst eine zusammenhängende Änderung fertig machen, dann die stärksten passenden vorhandenen Prüfungen laufen lassen, Funde gemeinsam beheben und nur Betroffenes erneut prüfen.
- Projekt-Skripte nutzen; Exit-Code und Logs wirklich lesen. Prüfungen nie abschwächen, um Grün zu bekommen. Reine Doku braucht keinen Typecheck.
- Keine neuen Tests oder Konfigurationen, außer der Nutzer oder das Projekt verlangt sie. Vorhandene Prüfungen bei gewollter Änderung anpassen.
- Bilder, die der Nutzer lokal mitgibt, darf man lesen und kopieren.
- Browser-, Dev-Server-, UI- und Spielprüfungen, die der Auftrag braucht, sind mit dem Auftrag erlaubt; keine zusätzliche Freigabe, keine feste Mindestzahl.
- **Prüfbrowser:** erst Node ohne Grafikkarte, dann der eingebaute Browser der App (z. B. `browser_*` in TreeChat), erst dann ein eigener, unsichtbarer Prüfbrowser (`headless`). Eigener Prüfbrowser nur Chrome for Testing in der Version des Nutzer-Chrome, nie der persönliche Chrome (auch nicht `channel: chrome`) und nie Playwrights mitgelieferter Chromium. Kein sichtbares Fenster, kein Fokuswechsel, keine Tabs nach vorn; Tabs des Nutzers bleiben. Laufzeit begrenzen und den Browser schließen – bei Erfolg, Fehler und Abbruch. 3D mit echter Grafikkarte, nie Software-Rendering. Details: [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md), Pfade in den Ressourcen-Dateien (§7).
- Typecheck und Test-DOM beweisen kein Aussehen und kein echtes Verhalten.
- **Leistung:** erst einen vergleichbaren Ausgangswert messen, Ursache eingrenzen, ändern, gelieferten Stand messen. Bei wiederkehrender UI-Arbeit nach [IDLE-PERFORMANCE.md](IDLE-PERFORMANCE.md). Ein Build oder gerundete 0,0 % sind keine Abnahme; Ungeprüftes offen nennen.
- Download blockiert (`ERR_BLOCKED_BY_CLIENT`): Link in neuem Tab öffnen (Cmd-Klick), dann die fertige Datei und, falls veröffentlicht, die Prüfsumme prüfen. Sicherheitswarnungen nie umgehen.

## 5. Geheimnisse, Git und Abgabe

- Testzugänge nur für den beauftragten Test und innerhalb der Kosten- und Anbietergrenzen. Werte nur in ignorierten lokalen Dateien oder Umgebungsvariablen, nie in Chat, Prompts, Aufgabendateien, Logs, Screenshots oder Commits.
- Vor dem Schreiben Status und Diff ansehen. Pfade einzeln stagen. Arbeit anderer nie still zurücksetzen, überschreiben oder verwerfen. Eigene Änderungen committen; fremde nur mit ausdrücklicher Erlaubnis und nach Durchsicht, und nicht als eigene ausgeben.
- **Fertiges committen und sofort pushen**, außer der Nutzer will es nicht: Erst der Push startet den Coolify-Build, sonst sieht der Nutzer nichts (Nutzerregel 09.10.2026). Reine Leseaufträge: kein Commit. Auf dem aktuellen Zweig bleiben, keine Worktrees von selbst.
- **Selbst zusammenführen:** Änderungen vom Server holen und einarbeiten, ohne Routine-Rückfrage. Vorher die eigene lokale Arbeit wiederherstellbar sichern (nur betroffene Pfade).
- **Konflikte:** gemeinsame Basis, lokalen Stand und eingehende Änderung vergleichen. Wo beide Fassungen konkurrieren, gewinnt unser gewolltes lokales Verhalten, solange es stimmt; passende Fixes von außen bleiben. Daten nach fester ID zusammenführen, ohne Doppelte und ohne Gelöschtes wiederzubeleben. Nie pauschal „ours“/„theirs“, kein Reset, kein Force-Push, keine Hooks umgehen.
- Nur fragen, wenn ein konkreter Konflikt eine Entscheidung des Nutzers braucht oder sonst Daten verloren gingen – dann genau diesen Konflikt nennen.
- Submodule: erst darin committen und pushen, dann den Zeiger im Hauptprojekt. Gestagte Pfade, Diff und `git diff --check` prüfen; Fehler beim Commit oder Push beheben oder genau benennen.
- Bericht: Ergebnis, Pfade, Prüfungen und Grenzen, Version/Build falls passend, Commit-Hash, Abgleich mit dem Server, was offen bleibt.

## 6. Schreiben – hier steht die Stilregel

- Antworten an den Nutzer: einfaches Deutsch ohne Vorwissen, außer er wünscht eine andere Sprache. Code und Kommentare dürfen Englisch bleiben; Zitate und genaue Namen behalten ihre Sprache.
- Ergebnis zuerst, dann was es bedeutet. Alltagswörter, kurze Sätze. Ein Fachwort sofort erklären, mit Beispiel aus der Aufgabe: „Build (die App fertig zusammenbauen)“. Freundlich, ohne Babysprache.
- Wenige passende Icons als Wegweiser, **Kernaussagen fett**, klare Überschriften bei längeren Texten. Kurze Antworten bleiben kurz. Abläufe als nummerierte Schritte, Vergleiche als kleine Tabelle. Unsicherheit und Prüflücken offen sagen.
- **Regeln, Skills und Doku-Dateien** (für KIs, Menschen und Kunden): Deutsch, einfach, mit Alltagswörtern; knapp und token-sparsam – nur Nötiges, keine Geschichte, keine Doppelungen. Was nur Nicht-Frontier-Modelle brauchen, gehört in die Zusatzdatei, nicht in den Kern.
- UTF-8 und echte Umlaute; geänderte Doku auf kaputte Zeichen prüfen.
- Diesen Stilblock nicht in Pläne, Modell-Prompts oder Jede-Nachricht-Prompts kopieren.
- Logs: kurz und lesbar – Schritt, zuständiges Modul, Ergebnis, Dauer. Nie Geheimnisse, kein endloser Fortschrittslärm.

## 7. Fachregeln nur bei Bedarf laden

- Frontend, Zustand, UI: [FRONTEND-RULES.md](FRONTEND-RULES.md) mit der [Layout-Abnahme](FRONTEND-RULES.md#verbindliche-layout-abnahme-für-arbeitsoberflächen-08092026) (Farbthema erben, Dialoge am Handy im Vollbild, Aufgabe vor Einstellungen, schmale Breite wirklich prüfen). Spiel-Oberflächen: [GAME-UI-GUIDE.md](GAME-UI-GUIDE.md). Design-Hausstil: `DESIGN.md` des Projekts.
- **Genannter Design-Skill gilt (Nutzer 17.10.2026):** Sagt der Nutzer „Game UI Graffiti“, „App UI Graffiti“ oder nennt einen anderen Skill, lädst du genau diesen Skill und baust danach. Ältere Stile, Fremd-Vorbilder (Linear, Codex, T3, Standard-Web-App) und Budget-Wörter wie „ruhig“ oder „seriös“ zählen dann nicht; widerspricht eine Regel dem Skill, die Regel melden und berichtigen.
- Echtzeit-3D: [THREEJS-RULES.md](THREEJS-RULES.md); ganze Welten: [THREEJS-WORLDBUILDING-RULES.md](THREEJS-WORLDBUILDING-RULES.md). Alte Fälle zu VFX, Rigs, Leistung: [3D-Belege](threejs/PROJECT-EVIDENCE-NOTES.md) – Stack und Version vorher prüfen.
- Lokale Pfade, Ports, Orte der Testschlüssel: [Windows](WINDOWS-RESSOURCEN.md) oder [macOS](MACOS-RESSOURCEN.md), nicht beide.
- Fremde APIs: aktuelle Original-Doku nur zur offenen Frage, nicht ganze Doku-Bäume.
- Neue, belegte Lektionen: [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md); beim Feature oder Projekt ablegen, nicht hier.
- Zusatzregeln für Nicht-Frontier-Modelle: [CODING-RULES-ZUSATZ.md](CODING-RULES-ZUSATZ.md).
