# Arbeitsregeln (Coding Rules)

Unsere eigenen Regeln für alle Projekte auf diesem Rechner. Einmal je frischem Kontext lesen; später nur geänderte Abschnitte.

**Allgemeine Arbeitsweise** (Auftrag, Aufgabendatei, 500-Zeilen-Grenze, Orchestrieren, Code, Prüfen, Git) steht nicht hier, sondern in der TreeChat-Regeldatei `.treechat/regeln/REGELN.md` des Projekts, Abschnitt „Arbeitsweise“. TreeChat schreibt sie für jedes Projekt; bearbeiten unter Einstellungen → Systemprompts → Arbeitsweise. Ohne TreeChat gilt ihre Vorlage in NoteTree: `treechat/apps/web/src/notedrill-embedded/workMethod.ts`. Hier steht nur, was darüber hinaus für uns gilt.

**Frontier oder nicht?** Ein Frontier-Modell ist ein Spitzenmodell, das Grundlagen von selbst richtig macht. Steht im Block `<model_rules>` deiner Nachricht „Frontier für: …“ mit dem Bereich deiner Aufgabe (Backend, Frontend oder alles), überspringst du die Zusatzregeln. Sonst – auch ohne jede Angabe – liest du vor der ersten Änderung in [CODING-RULES-ZUSATZ.md](CODING-RULES-ZUSATZ.md) „Allgemein“ und den Abschnitt deines Bereichs.

## 1. Auftrag

- Reihenfolge: Plattform- und Systemregeln → aktueller Wunsch des Nutzers → `AGENTS.md` des Projekts → Arbeitsweise → diese Regeln → Fachregeln.
- Diktierfehler nur verbessern, wenn der Sinn klar ist. Eigene Ideen nur dort, wo der Nutzer etwas offenlässt. Nicht um Erlaubnis für offensichtliche nächste Schritte bitten.
- **Für den faulen Menschen bauen (22.10.2026, Nutzer: „Hör auf, mir unnötige Sachen zu bauen, die mein Leben beschweren“):** Der Nutzer will einfach leben und so wenig wie möglich klicken. Was immer laufen soll, ist von selbst an, bleibt nach Neustarts an und verbindet sich selbst neu; „aus“ nur auf bewussten Wunsch. Nie einen Klick am anderen Gerät verlangen (er ist unterwegs). Vor der Abgabe den echten Alltag durchspielen: Neustart, App zu, unterwegs, nicht angemeldet – geht es dann noch ohne einen einzigen Extra-Klick? Ein versteckter Ersatzweg (z. B. „nur wenn das Konto-Cookie gilt“) ist kein Weg.

## 2. Nur so viel planen, wie die Aufgabe braucht

- Aufgabendatei, Folgedatei ab 500 Zeilen und Orchestrieren: siehe Arbeitsweise. Allgemeine Regeln nicht in Aufgabendateien kopieren; Funde gleich im selben Plan beheben, keine Aufräum-Pläne für Aufräum-Pläne.
- Aufgabendatei vom Sucher (Abschnitt `## Ungefähre Suche`, 20.10.2026): Entwurf eines kleinen Modells mit niedriger Denkstufe. Pfade, Zeilenzahlen und Methoden vor dem Ändern prüfen, falsche Treffer streichen, die Datei weiterführen statt eine zweite anzulegen.
- **Jede Phase nennt, was sie braucht** (24.10.2026): Art (Frontend, Backend, Doku, 3D …), die Dateien, die vorher gelesen werden müssen (Code und `docs/wissen/…`), und passende Skills (z. B. `app-ui-graffiti`, `elevenlabs-ton`, `threejs-leistung`, `videopruefer`). So lädt jede Phase nur ihr Wissen. Der Sucher schreibt keine Phasen (26.10.2026), nur Art und Skills unter seine Suche; die Phasen plant der Arbeiter.
- Mehr zu Phasen: [Phasen ohne Stopps](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md).

## 3. Code und Aufbau

- Keine Sammeldateien, doppelten Stores oder versteckten Ersatzwege. Erzeugte und fremde Dateien sind von der 1.200-Zeilen-Grenze ausgenommen; ein Mini-Fix löst keinen Umbau aus.
- **Leerlauf kostet Strom:** Platzhalter für Bilder bleiben still; Spiel, Medien und nötige Hintergrundjobs bleiben. Prüfweg: [IDLE-PERFORMANCE.md](IDLE-PERFORMANCE.md).

## 4. Prüfen

- Projekt-Skripte nutzen. Vorhandene Prüfungen bei gewollter Änderung anpassen.
- Bilder, die der Nutzer lokal mitgibt, darf man lesen und kopieren.
- Browser-, Dev-Server-, UI- und Spielprüfungen, die der Auftrag braucht, sind mit dem Auftrag erlaubt; keine zusätzliche Freigabe, keine feste Mindestzahl.
- **Prüfbrowser:** erst Node ohne Grafikkarte, dann der eingebaute Browser der App (z. B. `browser_*` in TreeChat), erst dann ein eigener, unsichtbarer Prüfbrowser (`headless`). Eigener Prüfbrowser nur Chrome for Testing in der Version des Nutzer-Chrome, nie der persönliche Chrome (auch nicht `channel: chrome`) und nie Playwrights mitgelieferter Chromium. Kein sichtbares Fenster, kein Fokuswechsel, keine Tabs nach vorn; Tabs des Nutzers bleiben. Laufzeit begrenzen und den Browser schließen – bei Erfolg, Fehler und Abbruch. 3D mit echter Grafikkarte, nie Software-Rendering. Details: [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md), Pfade in den Ressourcen-Dateien (§7).
- **Leistung:** erst einen vergleichbaren Ausgangswert messen, Ursache eingrenzen, ändern, gelieferten Stand messen. Bei wiederkehrender UI-Arbeit nach [IDLE-PERFORMANCE.md](IDLE-PERFORMANCE.md). Ein Build oder gerundete 0,0 % sind keine Abnahme.
- Download blockiert (`ERR_BLOCKED_BY_CLIENT`): Link in neuem Tab öffnen (Cmd-Klick), dann die fertige Datei und, falls veröffentlicht, die Prüfsumme prüfen. Sicherheitswarnungen nie umgehen.

## 5. Geheimnisse, Git und Abgabe

- Testzugänge nur für den beauftragten Test und innerhalb der Kosten- und Anbietergrenzen. Werte nur in ignorierten lokalen Dateien oder Umgebungsvariablen.
- Pfade einzeln stagen. Eigene Änderungen committen; fremde nur mit ausdrücklicher Erlaubnis und nach Durchsicht, und nicht als eigene ausgeben.
- **Fertiges committen und sofort pushen**, außer der Nutzer will es nicht: Erst der Push startet den Coolify-Build, sonst sieht der Nutzer nichts (Nutzerregel 09.10.2026). Reine Leseaufträge: kein Commit. Auf dem aktuellen Zweig bleiben, keine Worktrees von selbst.
- **Selbst zusammenführen:** Änderungen vom Server holen und einarbeiten, ohne Routine-Rückfrage. Vorher die eigene lokale Arbeit wiederherstellbar sichern (nur betroffene Pfade).
- **Konflikte:** gemeinsame Basis, lokalen Stand und eingehende Änderung vergleichen. Wo beide Fassungen konkurrieren, gewinnt unser gewolltes lokales Verhalten, solange es stimmt; passende Fixes von außen bleiben. Daten nach fester ID zusammenführen, ohne Doppelte und ohne Gelöschtes wiederzubeleben. Nie pauschal „ours“/„theirs“.
- Nur fragen, wenn ein konkreter Konflikt eine Entscheidung des Nutzers braucht oder sonst Daten verloren gingen – dann genau diesen Konflikt nennen.
- Submodule: erst darin committen und pushen, dann den Zeiger im Hauptprojekt. Gestagte Pfade, Diff und `git diff --check` prüfen; Fehler beim Commit oder Push beheben oder genau benennen.
- Bericht: Ergebnis, Pfade, Prüfungen und Grenzen, Version/Build falls passend, Commit-Hash, Abgleich mit dem Server, was offen bleibt.

## 6. Schreiben – hier steht die Stilregel

- Antworten an den Nutzer: einfaches Deutsch ohne Vorwissen, außer er wünscht eine andere Sprache. Code und Kommentare dürfen Englisch bleiben; Zitate und genaue Namen behalten ihre Sprache.
- Ergebnis zuerst, dann was es bedeutet. Alltagswörter, kurze Sätze. Ein Fachwort sofort erklären, mit Beispiel aus der Aufgabe: „Build (die App fertig zusammenbauen)“. Freundlich, ohne Babysprache.
- Wenige passende Icons als Wegweiser, **Kernaussagen fett**, klare Überschriften bei längeren Texten. Kurze Antworten bleiben kurz. Abläufe als nummerierte Schritte, Vergleiche als kleine Tabelle. Unsicherheit und Prüflücken offen sagen.
- **Regeln, Skills und Doku-Dateien** (für KIs, Menschen und Kunden): Deutsch, einfach, mit Alltagswörtern. Was nur Nicht-Frontier-Modelle brauchen, gehört in die Zusatzdatei, nicht in den Kern.
- UTF-8 und echte Umlaute; geänderte Doku auf kaputte Zeichen prüfen.
- Diesen Stilblock nicht in Pläne, Modell-Prompts oder Jede-Nachricht-Prompts kopieren.
- Logs: kurz und lesbar – Schritt, zuständiges Modul, Ergebnis, Dauer. Nie Geheimnisse, kein endloser Fortschrittslärm.

## 7. Fachregeln nur bei Bedarf laden

Erst lesen, wenn die Arbeit dort beginnt, nicht schon beim Planen oder Suchen. Beim Planen reicht, die Datei in der Phase zu nennen (§2).

- Frontend, Zustand, UI – **erst wenn du eine Frontend-Datei änderst:** [FRONTEND-RULES.md](FRONTEND-RULES.md) mit der [Layout-Abnahme](FRONTEND-RULES.md#verbindliche-layout-abnahme-für-arbeitsoberflächen-08092026) (Farbthema erben, Dialoge am Handy im Vollbild, Aufgabe vor Einstellungen, schmale Breite wirklich prüfen). Spiel-Oberflächen: [GAME-UI-GUIDE.md](GAME-UI-GUIDE.md). Design-Hausstil: `DESIGN.md` des Projekts.
- **Genannter Design-Skill gilt (Nutzer 17.10.2026):** Sagt der Nutzer „Game UI Graffiti“, „App UI Graffiti“ oder nennt einen anderen Skill, lädst du genau diesen Skill und baust danach. Ältere Stile, Fremd-Vorbilder (Linear, Codex, T3, Standard-Web-App) und Budget-Wörter wie „ruhig“ oder „seriös“ zählen dann nicht; widerspricht eine Regel dem Skill, die Regel melden und berichtigen.
- Echtzeit-3D, Karten, Welten: Skill `threejs-leistung` (Vorbilder Shard Royale „Kagami“, Shardfall „Kolossgrund“). Ton: Skills `elevenlabs-ton` und `klangpruefung`.
- Lokale Pfade, Ports, Orte der Testschlüssel: [Windows](WINDOWS-RESSOURCEN.md) oder [macOS](MACOS-RESSOURCEN.md), nicht beide.
- Fremde APIs: aktuelle Original-Doku nur zur offenen Frage, nicht ganze Doku-Bäume.
- Neue, belegte Lektionen beim Feature oder Projekt ablegen (`docs/wissen/` bzw. Aufgabendatei), nicht hier; keine neuen Learning-Sammlungen.
- Zusatzregeln für Nicht-Frontier-Modelle: [CODING-RULES-ZUSATZ.md](CODING-RULES-ZUSATZ.md).
