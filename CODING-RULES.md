# 🎯 Coding Rules & Development Guidelines

**Zweck:** Universelle Regeln für konsistenten, performanten, wartbaren Code — projektübergreifend gültig.

> **Scope-Regel:** Diese Datei enthält nur allgemeine Coding-Regeln. Projekt- oder tech-spezifische Details gehören in ihre eigenen Docs:
> - Three.js / R3F / WebGPU / Game-Runtime / Juice: `shared-docs/THREEJS-RULES.md`
> - Multiplayer / State-Sync / Kampfgefühl: `shared-docs/COLYSEUS-RULES.md`
> - Browser-/Playwright-/Electron-Findings: `shared-docs/agents/agent-browser/*`
> - Klassen-/VFX-/Sound-/Animation-Learnings: das jeweilige Projekt (`prompts/*`, `docs/*`).

## Grundhaltung und Bewertungsmodus
Nicht automatisch zustimmen. Jede Behauptung, Diagnose, Annahme, Plan als ungeprüft behandeln, bis Code, Doku, Logik, Fakten oder klare Einschränkungen sie stützen.

## Durcharbeiten statt Fragen (PFLICHT)
- **Verbindlicher Phasen-Workflow (IMMER anwenden):** Jede Implementierung folgt den Regeln in `shared-docs/agents/commands/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md` — phasenweise ohne Stopps, To-dos in der Task-Datei abhaken, nach JEDER Phase dokumentieren (7-Punkte-Format + Kommentar-Sektion) und im Loop bis zur letzten Phase weiterarbeiten. Diese Datei definiert den Pflicht-Ablauf; vor Baubeginn lesen und exakt einhalten.
- **Keine Rückfragen an den User** (kein `AskUserQuestion`, keine „Soll ich A oder B?"-Dialoge). Bei Aufgabe, Plan oder Masterplanung ohne Zwischenfragen vom aktuellen Stand bis zur letzten Phase durcharbeiten.
- **Bei mehreren Wegen selbst die fachlich beste, kleinste stabile Option wählen**, kurz begründen, umsetzen, Entscheidung im Task-Doc dokumentieren. Annahmen klar als Annahme markieren.
- **Empfehlung = Auftrag:** Steht im Plan eine klare Empfehlung, gilt sie als gewählt. Nicht erneut vorlegen, direkt bauen.
- **Einziger Ausnahmefall:** Echte externe Blockade (fehlender Secret/Zugang, den nur der User hat; widersprüchliche Pflichtdaten; destruktive Aktion ohne Mandat). Dann genau diese eine Info anfordern — als Hinweis, nicht als Multiple-Choice.

## 1. Kontext & Kommunikation

- **Speech-to-Text-Berücksichtigung:** User sendet oft Sprachnachrichten. Begriffe können verfälscht sein → aktiv mitdenken („Cloud Code" ≈ „Claude Code").
- **Intent ableiten (selbst mitdenken):** Der User kann sein Ziel oft schwer in Worte fassen. Manchmal nicht am wörtlichen Satz kleben, sondern aktiv ableiten, was gemeint ist: Beispiele/Referenzen des Users heranziehen, das beste rausholen also das maximalste, was dem User vom Look und UX her gefallen würde, auch Edge Cases immer mit betrachten
- **Usernachricht zuerst notieren:** Die User-Nachricht initial in der Todo-/Phasenplanung (bestehende nutzen oder neue in `docs/[feature]/tasks/[task]-[datum].md`) oben als Kontext festhalten, bevor du planst — damit du nicht auf falsche Wege abdriftest. Format:

  ```
  Usernachricht - User möchte:
  - HUD oben links kleiner/kompakter
  - FPS-Anzeige oben rechts, grüne Schrift
  - ...
  ```

- **Junior-Developer-Feedback:** User beschreibt Probleme oft grob → klar und freundlich korrigieren · erklären statt nur fixen · Nebenwirkungen prüfen · Backend-Teile selbst recherchieren.
- **Verstehen statt Umdeuten (Pflicht):** Lösung A verbessern, nicht still zu B wechseln · Fachwörter nicht eigenmächtig übersetzen wenn die Richtung kippt · vor Umsetzung prüfen „Löst mein Schritt das genannte Problem?" · keine versteckten Nebenwirkungen (z. B. harte Limits) außer explizit gewünscht · bei Effizienz-Themen erwähnen, ob die Architektur umgebaut werden sollte · Zielkonflikte: erst Ergebnisqualität, dann Kosten/Tempo.
- **Anwender-Fehler vs. Code-Fehler (KRITISCH!):** VOR jedem Fix prüfen, ob es überhaupt ein Code-Fehler ist:

  | Frage | Wenn JA → |
  |-------|-----------|
  | Falsches Verzeichnis ausgeführt? | Kein Code-Fix! Hinweis geben |
  | Vergessen zu installieren/starten? | Kein Code-Fix! Checklist geben |
  | Bekanntes Setup-Problem? | Kein Code-Fix! Docs verlinken |
  | Port-Konflikt? | Kein Code-Fix! Kill-Befehl geben |

  **NIEMALS Workarounds für Anwender-Fehler bauen!**

- **Architektur-Prüfung (bei jedem Problem):** Ist die Architektur grundsätzlich falsch/riskant? → langfristig stabile Lösung · Workarounds klar benennen 🛑 · bewährte Standard-Methoden ✅ · **bei wiederholt falschem/kollidierendem Ergebnis die Grundstruktur komplett neu bauen statt patchen** (siehe „🔴 Grundstruktur-First", Abschnitt 3).
- **Wirksamkeits-Umfeld prüfen (PFLICHT bei sichtbaren/verhaltensrelevanten Änderungen):** Prüfen, ob andere Faktoren die Wirkung überlagern. Nicht nur deklarierte Werte ändern, sondern den kompletten Wirkungspfad bis zur sichtbaren Ausgabe kontrollieren: globale Settings, Theme-/CSS-Variablen, Shader/Tone-Mapping, Material-Overrides, Feature-Flags, Cache, Render-Modi, Daten-Normalisierung, Runtime-Fallbacks, Persistenz. Bei UI/Visual gegen die tatsächliche Oberfläche prüfen.
- **Research-First & Architektur-Vergleich (PFLICHT bei komplexen Problemen):** Bei Performance-Lags, Sync-Fehlern, UI-Ruckeln oder neuen Konzepten nicht blind Workarounds bauen:
  1. **Konzept-Abstraktion:** Symptom auf das Software-Muster abstrahieren (z. B. „Chat ruckelt" → Virtualisierung/Scroll-Dämpfung; „3D laggt" → Instancing/Mesh-Batching).
  2. **Lokaler Geschwister-Abgleich (Sibling Repos):** Benachbarte Arbeitsverzeichnisse in `D:\CODING\React Projects\` nach funktionierenden Mustern scannen (falls über `docs/RESSOURCES-UNIVERSAL-DOCS.md` verlinkt).
  3. **Repository-Mining:** GitHub-Repos/Issues durchsuchen (`site:github.com`), lauffähige Snippets und Best Practices finden.
  4. **Lösungs-Ranking:** 2-3 Lösungswege strukturieren, vergleichen, im Plan dokumentieren; erst nach Auswahl des kleinsten stabilen Ansatzes coden.
- **Keine automatischen Gameplay-/Werte-Beweise (PFLICHT):** Smoke-Skripte, Debug-Zahlen, Serverwerte, Ingame-Recorder, Browser-Checks oder selbst gebaute Prüfmechanismen gelten nicht als Beweis, dass Gameplay gut ist. Nur bei ausdrücklichem User-Auftrag laufen. Produktgefühl, Lesbarkeit, Trefferfeedback, Sound prüft der User manuell.
- **Keine UI-Tests ohne User-Befehl (PFLICHT):** Keine Browser-, Playwright-, Screenshot-, DOM-Snapshot-, UI-Smoke- oder manuellen UI-Checks automatisch starten. Auch Frontend-/Layout-/Mock-Abgleiche laufen nur auf klaren Befehl (z. B. „führe einen UI-Test aus"). Ohne Befehl den UI-Check als manuelles Gate dokumentieren. Details zu Browser-/Playwright-Arbeit: `shared-docs/agents/agent-browser/*`.

### Grundton
- **Kurz, klar, einheitlich:** Ergebnis zuerst. Keine langen Ich-Sätze. Kein unnötiger Fließtext.
- **8.-Klässler-Verständnis:** Motiviert, einfach, menschlich schreiben mit Alltagswörtern; schwierige Themen mit Alltagsbeispielen. Wenige technische Begriffe auf einmal, oder kurz erklären.
- **UTF-8 mit echten Umlauten** (ä, ö, ü, ß). Nach Doku-Edits auf Mojibake prüfen.
- **Deutsch zuerst:** Antworten und UI-nahe Erklärungen auf Deutsch. Englische Begriffe nur als technische Namen.
- **Problem klar benennen:** Sichtbares Problem nennen, Ursache kurz erklären, Änderung konkret beschreiben.
- **User-Entlastung:** Keine unnötigen manuellen Schritte · Import, Mapping, Fallbacks, Defaults, Validierung übernehmen · jede Antwort prüfen „Nimmt das dem User Arbeit ab?".

### Caveman-Ausgabemodus (Default AN, Stufe ultra)
Kompakter Antwortstil, der Fülltext killt und Tokens spart, aber **jede** technische Substanz behält. Zwei Stufen: **full** und **ultra**.

- **Default:** Caveman ist **immer aktiv**, Stufe **ultra**, für jede Chat-Antwort — auch ohne Aktivierungszeile.
- **Deaktivieren:** Nur `stop caveman` oder `normal mode` schaltet zurück auf normalen Stil.
- **Stufe wechseln:** `Nutze Caveman full` schaltet weicher; `Nutze Caveman ultra` zurück. Ohne Angabe gilt ultra.
- **Regeln (beide Stufen):** Weglassen: Artikel, Füllwörter (eigentlich/quasi/just/really), Höflichkeitsfloskeln (klar/gerne/natürlich), Hedging. Satzfragmente OK. Kurze Synonyme. Keine Tool-Erzählung, keine Deko-Tabellen/Emoji, keine langen Roh-Error-Logs (nur die kürzeste entscheidende Zeile). Standard-Akronyme OK (DB/API/HTTP); **keine** erfundenen Abkürzungen (cfg/impl/req/res). Fachbegriffe, Code, API-Namen, CLI-Befehle, Commit-Keywords und exakte Fehlerstrings **immer wortgetreu**. Sprache des Users bleibt (Deutsch → Deutsch-Caveman, nur Stil komprimieren, nicht übersetzen). Kein Selbstbezug/keine Modus-Ansage.
- **ultra zusätzlich:** Konjunktionen strippen, solange Ursache/Wirkung eindeutig. Ein Wort, wenn ein Wort reicht. Jeden Fakt genau einmal nennen.
- **Muster:** `[Ding] [Aktion] [Grund]. [nächster Schritt].` — nicht „Klar, gerne! Das Problem liegt vermutlich daran...", sondern „Bug in Auth-Middleware. Ablaufcheck nutzt `<` statt `<=`. Fix:".
- **Auto-Klarheit (Caveman aussetzen):** Bei Sicherheitswarnungen, Bestätigungen für irreversible/destruktive Aktionen, mehrstufigen Abläufen wo Fragment-Reihenfolge zu Missverständnis führt, oder wenn der User um Klärung bittet → normaler, vollständiger Stil. Danach fortsetzen.
- **Grenzen (nie komprimieren):** Code, Commit-Messages, PRs, Task-/Masterplanung und Doku werden **normal** geschrieben. Caveman betrifft nur den Chat-/Antworttext.

### Abschluss im Chat
- **Standardformat nach Änderungen:** Ergebnis zuerst, dann kurz `Problem`, `Ursache`, `Änderung`, `Dateien/Pfade`, `Code-Sicherheit/Manuelles Gate`.
- **Pfadpflicht:** Geänderte oder geprüfte Dateien/Komponenten immer mit Pfad nennen.
- **Erzeugte-Dateien-Pfadpflicht (PFLICHT):** Für **jede neu erzeugte Datei und jedes erzeugte Artefakt** im Abschluss den **vollständigen absoluten Speicherpfad** nennen — insbesondere Bilder, Screenshots, Audio, Videos, PDFs, Exporte und temporär außerhalb des Projektordners gespeicherte Ergebnisse. Bei mehreren Dateien jeden Pfad einzeln aufführen. Diese Pflicht gilt auch bei reinen Generierungsaufträgen wie „nur Bilder erzeugen"; eine knappe Pfadliste ist trotzdem erforderlich.
- **Projektgebundene KI-Bilder immer ins Projekt (PFLICHT):** Jedes finale oder vom User angeforderte generierte Bild, das als Konzept, Referenz, Mockup, Textur oder Baugrundlage für ein Projekt dient, muss **vor Abschluss** unter einem passenden Projektpfad wie `assets/concepts/[feature]/`, `public/assets/[feature]/` oder `docs/[feature]/assets/` gespeichert oder dorthin kopiert werden. Chat-Anhänge, Clipboard-, Temp-, AppData-, `$CODEX_HOME/generated_images`- und andere externe Generatorpfade sind nur Quellen, nie Endablagen. Kein Projekt darf ausschließlich auf externe lokale Bildpfade verweisen. Verwarfene Zwischenvarianten müssen nur gespeichert werden, wenn der User sie als Ergebnis angefordert hat.
- **Bildbrief und Implementierungsdetails dokumentieren (PFLICHT):** Für jede projektgebundene Bildserie hält die zuständige Task-Doku oder ein kanonisches Asset-Manifest mindestens Zweck, finalen Prompt, Referenz-/Quellbilder, finalen Projektpfad, Format, Pixelmaße und Auswahl/Empfehlung fest; ein nur rekonstruierter Prompt muss ehrlich als rekonstruiert markiert werden. Dient das Bild als KI-Baugrundlage für Map, Szene oder 3D-Modell, zusätzlich Kamera/Komposition und freie Sichtzonen, Module/Formaufbau, relative Größen/Platzierung, Materialien, Boden, Vegetation, Props/Kleinteile, Licht/Wetter, Negativvorgaben und Performance-Bauweise dokumentieren. Bei komplexen Szenen spezialisierte Detail-/Bauplantafeln für Gebäude, Modelle und Umgebung erzeugen, wenn die Hauptansicht diese Angaben nicht eindeutig zeigt. Generativer Bildtext ist nie alleinige Maß- oder Text-SSoT; exakte Angaben stehen in Markdown.
- **Optional nur bei echtem Nutzen:** `### Performance`, `### Learning`, `### Nächster Schritt`.
- **Keine Schein-Offenpunkte:** Offene Punkte nur nennen, wenn wirklich etwas offen ist.
- **Konsolenausgaben (wenn gewünscht):** Hochmodern, farbig, menschenlesbar, kompakt · Server/Client + Methode/Klasse zeigen.

## 3. Workflow & Dokumentation
- **Vor Programmierung:** Planung/Todo muss existieren (`docs/[feature]/tasks/[task]-[datum].md`), sonst nach Abschnitt 4 erstellen.
- **Vor Implementierung:** Planung validieren, ob sie Sinn macht und korrekt geplant ist.
- **Phasenweise ohne Stopps umsetzen** vom aktuellen Stand bis zur letzten Phase (nur bei externem Blocker pausieren), Todos phasenweise abhaken.
- **Nach jeder Phase/Todo:** Planung updaten, Todo abhaken, nächste Phase direkt weiter.
- **Nach allen Phasen:** Offene Auffälligkeiten in eine Cleanup-Masterplanung übernehmen, phasenweise verbessern.
- **Abschluss-Kommunikation:** Kurzer Stand + 1-3 konkrete Verbesserungs-/Feature-Vorschläge für den nächsten Schritt.
- **Legacy Code:** Nach jeder Änderung SOFORT ungenutzten Code entfernen.
- **„Komplett neu erzeugen" heißt neu erzeugen:** Verlangt der User etwas „komplett neu"/„von Grund auf", den ALTEN Inhalt der Datei **vollständig ersetzen** und frisch von Null schreiben — NICHT nur Parameter/Farben/Zahlen am Bestand drehen. Neubauten fallen erfahrungsgemäß deutlich besser aus.

- **🔴 Grundstruktur-First: NEU BAUEN statt auf schlechtem Code weiterflicken (PFLICHT):** Wenn dieselbe Sache mehrfach nicht sitzt oder ein Ergebnis wiederholt falsch aussieht/kollidiert, liegt die Ursache fast immer in einer **falschen Grundstruktur** (schlechter Code, falsches Datenmodell, kollidierende Geometrie, zwei Layer die nichts voneinander wissen) — nicht in einem einzelnen Wert. Dann:
  1. **Grundstruktur zuerst analysieren, nicht Symptome.** Wo genau ist das Fundament falsch (falsche Achsen/Frames, doppelte Quelle der Wahrheit, unabhängige Schichten, verstecktes Legacy)? Erst verstehen, dann bauen.
  2. **Komplett neu schreiben.** Betroffene Dateien von Null — nicht am kaputten Bestand nachjustieren. Nie annehmen, der vorhandene Code sei richtig.
  3. **Single Source of Truth herstellen.** Widersprechen sich zwei Schichten (Körper vs. Rüstung, Daten vs. Anzeige, Basis vs. Overlay), einen gemeinsamen Maßstab bauen, aus dem **beide** ableiten.
  4. **Nach dem Neubau aufräumen.** Legacy, verwaiste Importe und Altreferenzen sofort entfernen.
  **Warum:** Am Altbestand herumzudrehen kostet mehr Zeit und erzeugt neue Regressionen als ein sauberer Neubau. Im Zweifel: neu bauen, nicht flicken.

### Linearer Phasen-Modus (immer aktiv)
- **Du codest selbst.** Es gibt keinen Orchestrator-/Coder-Rollensplit und kein Delegieren von Implementierung an Subagents es sei denn es wird explizit als Systemprompt mitgegeben.
- **Nach jeder Phase** Plan updaten/Todos abhaken + Status setzen · kleine Summary, damit direkt weitergearbeitet werden kann.
- **Tempo-Guard:** Nur **eine Phase oder eine klar abgegrenzte Subphase pro Iteration**. Keine Sammel-Implementierung über mehrere große Phasen.
- **Qualitäts-Gate:** Vor Phasenabschluss Scope gegen Planung abgleichen, Doku aktualisieren, offene manuelle User-Gates notieren.
- **Loop-Stopper:** Sind nur noch manuelle User-Checks offen (UI-Test, Ingame-Run, visueller Check), gilt die Arbeit als fertig — keine Pseudo-Phase mehr anhängen.

## 4. Erzeugung von Planung

### Dokumentationssystem — Todoformat einhalten
**Structure:** `docs/OVERVIEW.md` → `docs/[feature]/[feature]-overview.md` → `docs/[feature]/tasks/[task]-[datum].md`

Jede Phase MUSS diese **7 Punkte** enthalten:
1. **Ziel:** Was ist am Ende sichtbar besser?
2. **Todos:** Abhakbare Aufgaben.
3. **Ergebnis-Satz:** Kurzer Satz in einfacher Sprache für Nicht-Entwickler.
4. **Warum (optional):** Warum löst diese Phase das Kernproblem?
5. **Eingehalten:** Relevante Regeln (z. B. 700-Zeilen-Limit, Theme-Farben, React-Loop-Schutz, Design-System).
6. **Architektur passt:** Kurze Begründung.
7. **Auffälligkeiten/Performance/Kritische Findings:** z. B. unnötiger `useEffect`, harte Farben, falsche Service-Ablage, Render-Loop-Risiko.

**Beispiel:**
```markdown
### ✅ Phase NUMMER — Kurzbeschreibung
**Ziel:** Hier schreiben, worum es geht.
* [x] `Komponente XYZ` erzeugt (604 Zeilen), .....
* [ ] `AUFGABE ABC` implementieren.
**Referenzen:** `Pfade der Unterplanungen/Historien` (je Zeile getrennt)
**Ergebnis:** Frontend erzeugen für das Dashboard
```

### Kommentar-Sektion (unterhalb aller Phasen/Todos)
- Nach Abschluss pro Phase eine kurze Kriterien-Zeile.
- Auffälligkeiten/Fehler/Regelverstöße nach Schwere sortieren (🔴🟠🟡), bei Bedarf Refactoring-Plan empfehlen.

```markdown
## Kommentare
### Phase 1
**Eingehalten:** unter 700 Zeilen ✅, Architektur ✅, Edge-Cases betrachtet ✅
**Auffälligkeiten (nach Schwere):**
1. 🔴 **Kritisch:** Start-Crash durch fehlerhafte QuizPack-Umwandlung
2. 🟠 **Hoch:** über 700 Zeilen, Coding-Regel gebrochen
```

Referenzen enthalten max. 3 Hauptkomponentenpfade pro Phase.

- **Findings:** Bei echten Auffälligkeiten `docs/[feature]/tasks/...optimierung-tasks.md` mit Referenz anlegen; nach Abschluss aller Phasen abarbeiten.
- **Planungsgrenzen:** Kein vollständiger Code, keine kompletten React-Komponenten, keine Copy-paste-Blöcke. Erlaubt: Konzepte, API-Signaturen, Dateistrukturen, Pseudo-Code bis 3-5 Zeilen.
- **Umfang:** Max. ~700 Zeilen pro Planung, 3-4 Komponenten pro Phase, max. ~900-1300 Codezeilen pro Phase.
- **Vor Code:** Existierende Funktionen suchen, Wiederverwendung vor Redundanz, Edge-Cases dokumentieren.
- **Architektur-Phasen:** Vorher/Nachher-Datenfluss in 3-6 Schritten ergänzen.

### Masterplan-System
- Bei großen Systemen: `docs/[feature]/tasks/[thema]-[masterplan].md` referenziert mehrere `[thema]-[task].md`.
- Erstellen sobald Umfang/Abhängigkeiten es erfordern oder wenn der User „erzeuge Masterplan" sagt.
- Phasen am Stück umsetzen und dokumentieren, ohne Pause.

### Arbeitsprotokoll in der Task-Datei
Die Task-/Masterplanung ist der **einzige** durable Kanal — kein zweiter Log. Neben den 7-Punkte-Phasen trägt sie ein knappes **Arbeitsprotokoll** und **offene Fix-Punkte**:

```markdown
# [Task]
## Userziel (kompakt)
- [1-5 Bulletpoints]

## Phasen  (7-Punkte-Format, Todos als [ ]/[x])
### Phase 1 — ...
* [ ] Todo A

## Arbeitsprotokoll  (append-only — nie überschreiben)
### Phase 1 — Status success|partial|blocked
**Dateien:** `pfad` — was geändert
**Entscheidungen:** [1-3 Weichen + Begründung]
**Unsicher / Risiko:** [ehrliche Zweifelspunkte]

## Offene Fix-Punkte (aktuell)
- [ ] `datei.ts:42` — noch offen
```

**Regeln:** Todos direkt hier abhaken (`[x]`), Protokoll append-only (frühere Phasen nie überschreiben, nie Ergebnisse erfinden). Offene Findings wandern in „Offene Fix-Punkte", bis erledigt. **600-Zeilen-Split:** Über ~600 Zeilen `-2.md` (`-3.md` …) anlegen, mit Rücklink + 5-Zeilen-Stand; alte Datei endet mit Vorwärts-Pointer. Aktuell = höchste Nummer. Keine Roh-Logs/Codeblöcke hineinkopieren — nur Entscheidungen, Findings, Soll-Zustände.

## 5. Subagents & Erkundung

### 5.1 Subagent-Nutzung
- Planen, Implementieren und Prüfen passiert linear in derselben Session
- Subagents **ausschließlich zum Suchen und Abschließen**: `erkunder-code`, `erkunder-docs`, `duplikat-checker` (Recherche) · `abschliesser` (`.completed/`-Datei + CLAUDE.md-Check).

### 5.2 Pre-Task Reconnaissance (Pflicht bei >2 Dateien)
- Vor Coding parallel: `erkunder-docs` sucht in `docs/`, `.completed/`, History; `erkunder-code` findet betroffene Dateien und Duplikate.
- Bei neuen Dateien/Hooks/Stores/Utilities: `duplikat-checker`; 80 %+ vorhandene Funktionalität → bestehendes Modul erweitern.
- Nach Coding: `abschliesser` erstellt `.completed/` und prüft CLAUDE.md-Relevanz.
- Falls Subagents fehlen: token-effizient erstellen und User kurz informieren.

## 6. Architektur & React Practices

### Component-Based Architecture (WICHTIGSTE REGEL)
**NIEMALS Komponenten innerhalb anderer Komponenten definieren!** → Performance-Killer (jedes Render neu erstellt) + State-Verlust. Jede Komponente in separater Datei.

### Fachliche Komponentenstruktur / Clean Code (PFLICHT)
- **Komponentenbasiert heißt fachlicher Besitz pro Datei**, nicht eine große Sammeldatei. Ein eigenständiges UI-Element, Asset, Map, Datenmodell oder Service-Use-Case bekommt eine eigene Datei/einen eigenen Unterordner.
- **Keine wachsenden `entries.ts`-/`config.ts`-/`data.ts`-Monster:** Aggregator-Dateien importieren nur und exportieren nur. Keine Build-Logik, keine langen Objektlisten, keine ziel-spezifischen Helper.
- **Faustregel:** Enthält eine Datei mehrere unabhängige fachliche Ziele, splitte in `zielName.ts` plus kleinen `index.ts`. Bei 20+ (oder erwartbar 100+) Einträgen von Anfang an Unterordner.
- **Dateiname muss den Inhalt erklären:** `v3/skyRidge.ts`, `settings/ThemeToggle.tsx` ist gut. `v3Entries.ts`, `misc.ts`, `helpers.ts`, `allAssets.ts` nur für echte kleine Aggregatoren.
- **Shared nur bei echter Wiederverwendung:** `kit.ts`, `builders.ts`, `utils.ts` dürfen neutrale Bausteine enthalten, keine versteckten konkreten Features. Existiert ein Helper nur für ein Ziel, bleibt er in der Ziel-Datei.
- **Änderungen additiv denken:** Neue Generationen/Modi/Varianten kommen als eigene Dateien/Ordner dazu; bestehende fachliche Dateien werden nicht zusammengeworfen, außer der User fordert genau diese Regeneration.

### Komponenten-Organisation
- **Maximal 700 Zeilen Code pro Datei** — auslagern wenn größer.
- 🇩🇪 **Deutsch (User-facing):** Button, Panel, Dialog → `SpeichernButton.tsx`.
- 🇺🇸 **Englisch (Technical):** Section, Card, Item → `ReviewSection.tsx`.
- Ordnerstruktur = UI-Hierarchie · `(sektionsName)/`-Ordner gruppieren verwandte Komponenten · eine Hauptkomponente pro Sektion (ohne Klammern) · max. 7 Verschachtelungsebenen.
- **Frontend-to-Code-Navigation:** UI-Element-Text = Dateiname (User klickt „Speichern" → `SpeichernButton.tsx`).

### Service- & DB-Ablage (PFLICHT, kompakt)
- **Service/Helper/Finder/Action in die Sektion, wo er fachlich genutzt wird** (`app/notes/services/*`). `lib/` **nur** für wirklich sektionenübergreifende/Plattform-Module. Sektionsspezifische Fachlogik in `lib/` ist verboten. Entscheidung: 1 Sektion → Sektion, 2+ Sektionen → global.
- **Import-Regel:** Sektionscode darf globale `lib`-Module nutzen; globale `lib`-Module dürfen **keine** Sektion importieren (kein Inversions-Chaos).
- **DB-Schicht (falls vorhanden):** Technologie muss am Pfad erkennbar sein (SQLite/Postgres/Browser/Capacitor). **Finder lesen nur** (SELECT), **Actions schreiben** (INSERT/UPDATE/DELETE/Side-Effects); Read-only bleibt im Finder. Dateien unter `finders/*` dürfen keine `actions/*` importieren. Nach Domain gliedern, `*.finder.ts` / `*.action.ts` benennen. Mischdateien (Read+Write) in Finder + Action splitten. Globale DB-Utilities nur in `db/shared/*` (keine Fachlogik).

### React Best Practices
- **State & Props:** Immutable `setState(prev => ...)` · stabiler unique `key` für `.map()` · `useState` = re-render, `useRef` = kein re-render.
- **Memoization:** `useMemo` (teure Berechnungen) · `useCallback` (Funktionen als Props) · `React.memo` (Komponenten).
- **Effects & Lifecycle:** IMMER Cleanup bei subscriptions/timers/listeners · korrekte Dependencies · `[]` = mount only.
- **Component Communication:** Props down, Callbacks up · 2-3 Ebenen: Lifting State Up · 3+ Ebenen: Context/State Management · Referenz: `shared-docs/react-core-communication-patterns.md`.
- **Stale Closure:** Callback mit neuen Daten aus dem Updater aufrufen, nicht mit dem alten State:
  ```typescript
  // ❌ FALSCH — habits ist noch ALTER State
  setHabits(prev => prev.map(h => ...));
  onHabitsUpdate?.(habits);
  // ✅ RICHTIG — neue Daten im Updater weiterreichen
  setHabits(prev => { const updated = prev.map(h => ...); onHabitsUpdate?.(updated); return updated; });
  ```

#### Render-Loop & Hydration Guard (PFLICHT, alle Projekttypen)
Gilt für Web-Apps, Spiele-UIs/HUDs, Mobile- und Desktop-Frontends gleichermaßen.
- **NIEMALS State im Render-Pfad setzen:** Kein `setState`/`dispatch`/Context-Update im Komponenten-Body, in JSX-Ausdrücken oder in während Render ausgeführten Funktionen.
- **NIEMALS Setter in Setter-Updater verschachteln:** Kein `setX(prev => { setY(...); return ...; })`. Erst Zielzustand berechnen, dann Updates getrennt außerhalb ausführen.
- **NIEMALS Parent-State in `useEffect` „korrigieren":** Ein `useEffect`, das denselben Wert im Parent korrigiert, triggert nach jedem Render neu → `Maximum update depth exceeded`. Stattdessen den berechneten Wert direkt nutzen:
  ```typescript
  const effectiveTab = allowedTabs.includes(activeTab) ? activeTab : defaultTab; // direkt an <Tabs value={effectiveTab}>
  ```
- **NIEMALS interaktive Elemente verschachteln** (Button in Button, Link in Button). Bei klickbaren Zeilen: `div` mit `role="button"` + `tabIndex` + Tastatursteuerung.
- **Write-Back-Effekte nie ohne Guard:** Ein `useEffect`, das Zustand in Store/DB zurückschreibt, muss deduplizieren (z. B. `signatureRef`) und darf bei semantisch identischen Daten nicht erneut schreiben.
- **Idempotente Store-Actions als Standard:** Jede `update*`-Action gibt bei No-Op den alten State zurück (`return state`), statt neue Objekte zu erzeugen.
- **Deterministische Normalisierung:** In Merge-/Normalizer-Pfaden keine zeitbasierten Fallbacks (`Date.now()`) verwenden. Nur stabile Fallbacks (`0`, `null`, feste Defaults) — sonst künstliche „scopeChanged"-Schleifen.
- **Einweg-Sync statt Ping-Pong:** Synchronisation von der echten Quelle aus triggern (z. B. `entry.updatedAtMs`), nicht von der zurückgeschriebenen Zielrepräsentation.
- **Custom-Event-Payloads deduplizieren:** Bei `window.dispatchEvent` + Listener-`setState` semantischen Vergleich (Snapshot-Key) nutzen; identische Payload weder erneut dispatchen noch in State schreiben.
- **Stop-Regel bei Warnungen:** `Maximum update depth exceeded`, `Too many re-renders`, `Cannot update while rendering`, `validateDOMNesting` und Hydration-Warnungen sind Stop-Signale → sofort Root Cause fixen (Update-Kette im Stacktrace bis zur ersten eigenen Datei zurückverfolgen), nicht unterdrücken.
- **Pflicht-Check nach UI-Änderungen:** Lint auf jede geänderte UI-Datei; bei auffälligem Laufzeitverhalten zusätzlich `tsc --noEmit`.

### Controlled-Value Guard & Patch-Hygiene (PFLICHT)
- **Kontrollierte UI-Werte immer validieren** (Allowlist-Prinzip bei `Tabs`, `Select`, `Popover`). Ist ein Wert auf der Plattform nicht erlaubt, sofort auf sicheren Default zurückfallen.
- **Event-Werte nie blind casten:** Kein `onValueChange={v => setState(v as MyType)}` ohne Laufzeitcheck.
- **State-Updates idempotent halten:** Nur updaten, wenn sich der Wert wirklich geändert hat (`prev === next ? prev : next`).
- **Patch-Hygiene:** Nach jedem schnellen Edit Dateiende prüfen (keine angehängten JSX-Reste, keine duplizierten Abschlussblöcke).

### Radix/Shadcn Tooltip- & Trigger-Sicherheit (PFLICHT)
- `TooltipTrigger`/`PopoverTrigger` `asChild` **nur** nutzen, wenn das Child garantiert ref-stabil ist (kein `motion.*`, kein bedingter Mount/Unmount im Subtree, kein verschachteltes `asChild`) — sonst `setRef`-Schleifen und `Maximum update depth exceeded`.
- Für normale Buttons direkten Trigger nutzen (`<TooltipTrigger type="button" ...>`). Ist ein instabiles Child nötig, in einen ref-stabilen Wrapper (`<span>`) verpacken (defensiver Tooltip-Default).

### Performance: React, Daten & Web
- Unabhängige Fetches parallel: `Promise.all([...])`.
- Jeder `useEffect` mit Timern/Subscriptions MUSS Cleanup haben.
- N+1 vermeiden: Nested Queries in Loops → Batch-Loading mit JOINs oder `inArray()`.
- **NO-GO Live-Collection-Mutation:** Niemals über `Map.values()`/`Set.values()`/ein Array iterieren und im selben Iterator neue Elemente in dieselbe Collection schreiben (Endloswachstum, weil JS-Iteratoren neue Einträge mitlaufen lassen). Für Nachbarschaften, Flood-Fill, Graphen, Spawn-Ausbreitung immer Snapshot/Queue/Visited-Set mit hartem Limit nutzen.

### 3D, Three.js, Game-Runtime & Multiplayer (Pointer)
- **3D / R3F / Shaders / WebGL/WebGPU:** Bei Arbeit an Three.js, Mesh-Erstellung, Lichtquellen oder Render-Optionen zwingend `shared-docs/THREEJS-RULES.md` lesen und befolgen (Instancing, Schatten-Budget, Lag-Checks, Partikel, PostFX/Composer, Game-Feel/Juice).
- **Game-Runtime-Muster** (Two-Stage-Escape, Ref-Runtime für Slide/Dash, Sound-Voice-Limiter, DOM-Overlay-Scope, orthogonale Optik-Achsen): `THREEJS-RULES.md` §21.
- **Multiplayer / State-Sync / Hitboxen / Schadens-Timing / Network-Visuals:** `shared-docs/COLYSEUS-RULES.md`.

### Frontend-Regeln & Antipatterns
- **Bestehendes Design zuerst prüfen:** Globale CSS-/Tailwind-Klassen, Theme-Variablen und `DESIGN.md` lesen; dieselbe Farbpalette weiterverwenden.
- **Solide Hintergrundfarben für Dialoge/Overlays (PFLICHT):** Keine Tailwind-Opacity-Notation (`bg-black/40`, `bg-white/10`) als Haupthintergrund — halbtransparente Flächen machen unter Capacitor Probleme. Stattdessen vorhandene Theme-Variablen/globale CSS-Klassen nutzen ODER volle Opacity (`bg-[#0c0f1a]`). Borders so transparent wie möglich (`border-subtle`, `--border`). Referenz: `shared-docs/farbpalette/minimal-styling-template.css`.
- **Dialog-Schärfe statt grundlosem Blur:** Dichte Lese-/Einstellungsdialoge nicht mit starkem `backdrop-filter`/`backdrop-blur-*` belegen (unscharfer Text unter Electron). Solide Flächen (`bg-background`, `bg-card`, `bg-surface-*`) nutzen.
- **Dialog-/Dropdown-Pointer-Lock-Schutz (KRITISCH):** Dialoge nie direkt aus einem noch modal offenen Dropdown/Popover/ContextMenu heraus öffnen. Vorher das Menü schließen oder den Root non-modal halten. Symptom bei Verstoß: App sichtbar, aber nach Schließen nicht mehr anklickbar (`body.style.pointerEvents = "none"` hängt). Niemals per CSS `body { pointer-events: auto !important; }` erzwingen.
- **Dark/Light-Mode + Surface-Skala:** Hintergründe schwarz/grau (`#000`…`#333`) und im Lightmode sauber spiegeln; Akzent-Themes ändern nur Primary/Secondary, nie die Surface-Skala.
- **Mobile-First Space Efficiency:** UI kompakt halten, Breite/Höhe nutzen, seltene Optionen in Popover/Dropdown/Collapsible verstecken.
- **Wiederverwendbarkeit-First:** Dialoge/Komponenten mit Modi, Callback-Props und vorhandenen Patterns bauen.
- **Recherche vor Rumprobieren (KRITISCH):** Stacktrace lesen → Docs/GitHub Issues prüfen → Root Cause verstehen → erst dann fixen. Bei demselben Fehler zweimal: 3-5 Lösungswege recherchieren, effizientesten umsetzen.
- **UI-Library-Defaults respektieren:** Standard-Höhe/Padding von Radix/Shadcn nicht manuell überschreiben → Variants nutzen (`size="sm"`) oder Variant-System erweitern.
- **Rounded/Floating UI:** Karten/Sektions-Container `rounded-2xl`–`rounded-4xl` (bevorzugt `rounded-3xl`); Floating über subtile Shadows und solide Flächen.
- **Icons/Farben:** Bedeutungsfarben verwenden (Speichern/Start/Erfolg = Success, Abbrechen/Gefahr = Danger).
- **Icon-First + Text nur wenn nötig:** In dichten Toolbars primär Icons; jeder Icon-Button braucht `aria-label` + Tooltip; eindeutige Aktions-Icons Pflicht.
- **Kompakte Control-Layouts:** Inputs/Filter nicht unnötig eine ganze Zeile blockieren (2er-Grid, kurze Felder, Langlabels in Tooltip/Kontext auslagern).
- **Gruppierte Toolbars:** Zusammengehörige Icon-Aktionen bündeln (`rounded-2xl border border-subtle bg-surface-2 p-1`), innere Buttons `rounded-xl`.
- **Disabled-Button-Feedback:** MUSS über Tooltip/Hinweis erklären WARUM deaktiviert. User darf nie raten.
- **Ressourcen-Blocker in HUD/Skill-UI:** Ist ein Skill wegen Mana/Energie nicht nutzbar, den Grund + Bedarf sichtbar zeigen (`Need 18 MP`, Tooltip `18/110`), nicht nur ausgrauen.
- **Dropdown/Popover Stacking-Check:** Vor UI-Changes overflow/stacking-context, Portal-Rendering, z-index prüfen. Niemals nur höheren z-index als Workaround — erst Ursache im Layout/Portal/Overflow beheben.
- **Stabile Panel-Größe (kein Resize/Sprung beim Wechsel):** Container, deren Inhalt beim Tab-/Item-/Provider-Wechsel variiert (Dialoge mit Anbieter-Rail, Tab-Panels, Master-Detail), bekommen eine **feste oder Mindest-Höhe** und scrollen intern — nicht die Wurzel wachsen/schrumpfen lassen. Dialog: `h-[min(88vh,720px)]` (nicht nur `max-h-…`, das noch mit dem Inhalt springt) + `overflow-hidden` an der Wurzel, `overflow-y-auto` am Body. Karten/Kacheln mit wechselndem Inhalt `min-h-[…]` geben. Der Rahmen darf sich beim Klick nicht bewegen — nur der Inhalt.

## Code-Sicherheit & manuelle Produktprüfung

### 8.2 Sichtbare Ergebnisqualität / Visual Acceptance Gate
- **Code-Sicherheit ist kein Produktbeweis:** Lint, TypeScript, gespeicherte Daten, Screenshots, grüne Logs oder ein erfolgreiches Playwright-Skript beweisen nur, dass etwas technisch ausgeführt wurde — nicht, dass das sichtbare Ergebnis gut, lesbar, fachlich richtig oder nutzbar ist.
- **Akzeptanzkriterien vor Umsetzung ableiten:** Bei jeder sichtbaren Aufgabe zuerst 3-7 konkrete Prüffragen aus dem Userziel notieren (z. B. Sind beide Hände sichtbar? Ist Text lesbar/nicht abgeschnitten? Zeigt das Dashboard die wichtigste Zahl ohne Scrollen?).
- **Screenshots aktiv beurteilen:** Beauftragt der User Browser/Playwright/Screenshot/Referenzvergleich, das Bild gegen diese Prüffragen bewerten. Ein sichtbar falsches Bild ist ein Fehlerbeweis, nie ein Abschlussbeweis.
- **Abnahme-Viewport zuerst herstellen:** Vor jedem visuellen Urteil Viewport/Fenster maximieren, störende Overlays ausblenden, Referenz groß anzeigen, Kamera/Zoom aufs Prüfobjekt ausrichten. Ist das Hauptobjekt nicht klar sichtbar, ist der Screenshot ungültig.
- **Bewegte Objekte aktiv verfolgen:** Bewegt/animiert/scrollt das Objekt, Follow-/Center-/Keep-visible bewusst setzen und die Bewegung messbar machen (Pfad, Distanz, Timeline-Zeit). Läuft das Hauptobjekt aus dem Bild, ist der Screenshot kein gültiges Gate. Bei 3D/Canvas mindestens Front/Side/Back/Top-Perspektiven.
- **Werkzeug darf Fehler nicht verdecken:** Editor-Hilfen (Joint-Handles, Overlays, Grid) dürfen die Produktansicht nicht überdecken; für Abnahmen braucht es einen Clean-/Gate-Modus. Fehlt er, ist das Tooling Teil des Bugs.
- **Nicht hinter manuellen Gates verstecken:** Liegt bereits ein Screenshot/Log/Preview/Export vor, muss er fachlich bewertet werden. Nur wenn wirklich keine Sichtprüfung möglich ist, als `manuelles Gate` dokumentieren.
- **Fertig nur bei bestandenem Gate:** Keine Phase als `success`/`fertig` dokumentieren, solange die sichtbaren Kernkriterien nicht erfüllt sind — dann ehrlich `partial`, `blocked` oder „technisch umgesetzt, visuell nicht abgenommen".
- **Bei wiederholtem visuellen Scheitern:** Nicht weiter einzelne Werte drehen. Erst Root Cause nennen, Vergleichsreferenz prüfen, Tooling verbessern, dann erneut implementieren.

### 8.3 Denkmodus & Ergebnis-Handwerk (PFLICHT — gilt für JEDE Ausgabe)

**Wurzel-Erkenntnis:** Beim *identischen* Auftrag entsteht „billig/flach/generisch" **nicht aus fehlendem Können**, sondern aus einem falschen Erfolgskriterium.
- **Engineering-Modus:** „Habe ich die Anforderung korrekt, sicher, sauber (DRY, Gates grün) erfüllt?" → vereinfacht den wertvollen Kern, prüft gegen Tests statt gegen das Erlebnis → **technisch-korrekte Mittelmäßigkeit**.
- **Craft-Modus (Ziel):** „Würde ein Mensch, der das Ergebnis erlebt, es exzellent nennen?" → gibt dem Wichtigen eigene Sorgfalt, schichtet, geht über den sicheren Default hinaus → **premium**.

Das ist kein 3D-Thema — dieselbe Ziel-Differenz macht Texte blass, Dashboards fokuslos, APIs generisch. Der Hebel ist **nicht „mehr Regeln"**, sondern zuerst den Denkmodus umzuschalten.

**Denkmodus-Reset (VOR jeder Umsetzung, domänenübergreifend):**
- **Erfolgstest = Wirkung, nicht Erfüllung:** Miss dich daran, ob ein Mensch das Ergebnis exzellent nennt. Die Spezifikation ist der Boden, nicht das Ziel.
- **An jeder Gabelung die reichere Variante:** Zwischen einfach/sicher und reicher/schwieriger immer die reichere für alles, was der Nutzer erlebt. Einfachheit nur für Unsichtbares.
- **Schwieriger Kern = mehr investieren, nicht vereinfachen:** Ein hartes Kern-Element ist das Signal, dort mehr Aufwand hineinzugeben — nicht abzuspecken und `partial` zu markieren.
- **Aufwand dem Fokus geben, nicht der Wiederverwendung:** Was der Nutzer zuerst erlebt (Hauptobjekt, Kernzahl, erster Satz), bekommt maßgeschneiderte Sorgfalt; nur der Hintergrund wird generalisiert. „DRY über alles" erzeugt uniforme Mittelmäßigkeit.
- **„Fertig" heißt erlebt-und-geprüft:** Erst fertig, wenn das Ergebnis durch die Augen des echten Nutzers gerendert wurde und du „exzellent" wettest — nicht, wenn Gates grün sind (ergänzt 8.2).

**Wie sich der Denkmodus zeigt:** echten Mechanismus bauen statt sicheren Ersatz · qualitätstragende Details formen statt flachen Default · die Sache wirklich passieren lassen statt auf Distanz faken · das Wichtigste vorn/groß/unverdeckt · über den sicheren Rand hinaus schichten · un-gefordertes Leben (sinnvolle Defaults, Micro-Copy-Ton, Sekundärbewegung).

**Fokus ohne Regress + Abschluss-Abgleich (PFLICHT — die globale „Check"-Regel vor „fertig"):** Der Craft-Modus hebt den Fokus — genau das erzeugt die häufigste Über-Korrektur: beim Aufwerten des Fokus wird still ein **vorher schon erfülltes** Merkmal an anderer Stelle geopfert (die Wippe kippt, statt dass beides zugleich gut ist). Gegenmittel, gehört zur Definition von „fertig":
- **Kein Regress:** Fokus-Investment darf **nichts** verschlechtern, das schon gut/richtig war. Qualität ist keine Wippe — ein exzellentes Ergebnis hält **alle** guten Eigenschaften gleichzeitig, es tauscht nicht A gegen B.
- **„Über dem Boden" heißt addieren, nie darunter fallen:** „Spec ist der Boden, ziele darüber" heißt *mehr obendrauf* — nie eine explizite Vorgabe unterschreiten. Benannte/quantifizierte/superlative Wörter im Auftrag („groß/oversized", „~200 Einheiten", „rund", „3 von X", „beide sichtbar") sind **harte Constraints**; Exzellenz wird **mit** ihnen gemessen, nicht statt ihnen.
- **Richtiger Hebel statt lokalem Kurzschluss:** Damit der Fokus „gewinnt", den passenden Hebel nutzen (Betonung, Kadrierung, Platzierung, relative Skala) — **nie** den Kontext degradieren (nicht die ganze Welt schrumpfen, damit der Held groß wirkt). Das echte Problem lösen, keine globale Eigenschaft für ein lokales Ziel opfern.
- **Abschluss-Abgleich (der „Check"):** Vor „fertig" zusätzlich zum Augen-Render **den ganzen Auftrag einmal gegenlesen** — ist jedes explizite Merkmal/Maß/Superlativ *wörtlich* noch wahr, und ist **nichts** vorher Gutes zurückgefallen? Das ist **kein** neuer Abhak-Gate: ein sachkundiger Nutzer sähe ein fallengelassenes „oversized" sofort, „exzellent für ihn wetten" *setzt* den vollständigen Auftrag also schon voraus — der Abgleich ist nur die ehrliche Einlösung dieser Wette.
- **Physisch/logisch kohärent:** Das Ergebnis muss real Sinn ergeben, nicht nur rendern/laufen (eine Hand ist nicht zugleich gehoben und gesenkt; eine Summe = ihre Teile). Zustände prüfen, nicht nur Ausführung.

_Beispiel (eine Domäne von vielen): Fokus „Figuren sichtbar/lebendig machen" gelöst, aber die zuvor erfüllte, ausdrücklich geforderte „oversized/mehrstöckige" Struktur dabei unter die geforderte Größe geschrumpft — falscher Hebel; richtig wäre, sie groß zu lassen und die Figuren darin hochzuskalieren. Global identisch: einen Absatz aufpolieren und eine geforderte Kernaussage streichen; ein Panel schön machen und eine geforderte Spalte weglassen._

### 8.1 TypeScript & Tests
- Statische Checks (`lint`, `tsc --noEmit`) sind nur Kompilier-/Typschutz — kein Beweis für Gameplay, Werte, Kampfgefühl oder Multiplayer-Lesbarkeit. Ergebnis als Code-Sicherheit dokumentieren, nicht als Produktprüfung.
- Bei reinen Doku-/Prompt-/Regeländerungen keine Tests/Checks starten.
- Bei echten Codeänderungen dürfen Lint/TypeScript den geänderten Scope absichern.
- **Fehler direkt mitfixen:** Findest du im bearbeiteten Scope sichtbare Fehler (TS, Lint, Runtime), sofort beheben, nicht „für später" liegen lassen.
- **Keine UI-/Browser-/Playwright-/Screenshot-/Smoke-/Ingame-/Serverwert-Tests ohne klaren User-Befehl.** Auch reine Frontend-/Layout-/Mock-Abgleiche nur auf ausdrücklichen Befehl. Ohne Befehl: Research + Codeänderung + manuellen User-Blocker dokumentieren. (Playwright/Browser-Details: `shared-docs/agents/agent-browser/*`.)
- **Keine neuen Tests erstellen und keine Test-Konfiguration ändern** (Unit/Integration/E2E, `vitest.config.ts`), außer der User verlangt es ausdrücklich.

## Referenzen & Qualitäts-Checkliste

### Framework-Dokumentation
| Thema | Dokumentation |
| --- | --- |
| React Native/Expo | `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md` |
| Next.js | `shared-docs/skills/nextjs-rules/NEXTJS-RULES.md` |
| Capacitor | `shared-docs/performance/capacitor-performance-rules.md` |
| Liquid Glass (Tailwind) | `shared-docs/design/liquid-glass-guide.md` |
| DB Live Testing (Postgres) | `shared-docs/database-testing-guide.md` |
| Three.js / R3F / Game-Runtime | `shared-docs/THREEJS-RULES.md` |
| Multiplayer / Colyseus | `shared-docs/COLYSEUS-RULES.md` |
| Browser-/Playwright-/Electron-Testing | `shared-docs/agents/agent-browser/*` |

### Qualitäts-Kriterien (bei jeder Planung & Implementierung)
- ✅ Wartbarkeit · Modularität · Helper/Services · klare Trennung von UI/Logik/Daten · gute Architektur · simpel/wiederverwendbar · Performance/Edge-Cases · eigene fachliche Meinung in Planungen.

### Quick Checklist
- Keine Rückfragen / kein `AskUserQuestion` — eigenständig die fachlich beste Lösung umsetzen.
- Bei Codeänderungen: Lint/TypeScript nur als Code-Sicherheitscheck, nicht als Gameplay-Beweis.
- Mobile-First · Max 700 Zeilen/Datei · bei großer Datei in Unterkomponenten/Helpers/Services aufteilen.
- **Grundstruktur-First:** Bei wiederholt falschem/kollidierendem Ergebnis die betroffenen Dateien komplett neu schreiben (nicht patchen) und eine Single Source of Truth herstellen (Abschnitt 3).
- Sichtbare Fehler im bearbeiteten Scope sofort mitfixen.
- Keine UI-/Browser-/Playwright-/Screenshot-/Smoke-/Ingame-Tests und keine automatischen Gameplay-/Serverwert-Beweise ohne klaren User-Befehl.
- Keine neuen Tests schreiben/planen und keine Test-Konfiguration ändern, außer explizit angefordert.
- **NO-GO Live-Collection-Mutation:** siehe Abschnitt 6 (Performance).
- Nach jeder Phase Task-Datei aktualisieren: erledigt/offen/nächste Phase + max. 3 Hauptkomponentenpfade.
- Commit nach Abschluss aller Phasen/Todos einer Masterplanung mit schöner Commit-Message.
- WebFetch/Websuche sinnvoll nutzen, besonders bei wiederholten Fehlern oder unsicherer externer Doku.

## Wichtige Regeln / Zusammenfassung

**NIEMALS automatisch `pnpm run dev` / `pnpm dev` starten!**
- Der Dev-Server läuft oft bereits im Hintergrund. Automatisches Starten verursacht Port-Konflikte (EADDRINUSE).
- Läuft er wirklich nicht, darfst du ihn starten. Bei vom User befohlenen UI-Tests zuerst prüfen, ob der Server läuft.

**NIEMALS automatisch CLI-/Terminal-/PowerShell-Prozesse im Hintergrund starten!**
- Kein `codex`, `gemini`, `claude`, `opencode`, `powershell`, `cmd.exe` etc. nur für Statusanzeige, App-Start, Watcher-Event oder Hover/Popover.
- **CPU & Unsichtbarkeit (kritisch):** Automatisch gestartete CLI-Modelle erzeugen extrem hohe CPU-Last (oft ~100 % Core), unsichtbar für den Nutzer → er bemerkt die Lag-Ursache nicht. CLI-Modellprozesse nur durch explizite Nutzeraktion (Nachricht senden, Login-Klick, „Aktualisieren"-Button, beauftragter CLI-Test).
- Hintergrundpfade dürfen nur Cache, gespeicherte JSON-Dateien, Env-Signale oder leichte Dateisystem-Metadaten lesen — nie einen echten Prozess anschalten. Nach jedem CLI-Start den Prozess sauber beenden.

**Nie überspringen:**
- React Loop-Stopper (Abschnitt 6): idempotente Updates, Dedupe-Guards, keine `Date.now()`-Fallbacks in Normalizern, Root Cause bei Loop-Fehlern verfolgen.
- Phasen-Regeln (Abschnitt 3): selbst coden (nicht delegieren), Phase dokumentieren, Todos abhaken, Mini-Check vor „fertig".
- UTF-8 sauber halten: nach Doku-Edits auf Mojibake (`Ã`, `â`, `ðŸ`) prüfen. Fremde parallele Änderungen nicht revertieren.
- Bei wiederholtem Fehler nicht kämpfen: recherchieren, 3-5 Lösungswege vergleichen, kleinste stabile Lösung umsetzen.
- Grundstruktur-First anwenden: strukturell falschen/kollidierenden Code komplett neu bauen statt kleine Patches zu stapeln (Abschnitt 3).
- Nach Abschluss aller Phasen erklären, wie der User die Änderungen in der UI sieht (Buttons, Befehle, Pfade) — in Stichpunkten, was er klicken/prüfen soll.
- Wenn du denkst, du bist fertig: in der Masterplanung nochmal ALLE Punkte durchgehen, ob wirklich alles korrekt implementiert ist — PFLICHT, auch wenn Todos schon abgehakt sind.

**Junior-/Azubi-Code (PFLICHT):** Dieses Projekt wurde größtenteils von Junior-Developern/Azubis geschrieben. Schlechte Stellen aktiv finden und direkt beheben — oder in die Planung notieren, damit sie behoben werden. Nicht blind auf einem schwachen Grundgerüst weiterbauen; wenn nötig auch die Architektur ändern (Grundstruktur-First, Abschnitt 3).
