# Coding Rules — universeller Kern

**Zweck:** kurzer, projektübergreifender Schutzvertrag. Fach-, Tool-, UI- und Workflowdetails werden nur
bei passender Aufgabe über die unten genannten Owner gelesen.

## 1. Auftrag, Scope und Autorisierung

- Behauptungen, Pläne und Diagnosen gegen Code, Doku, Logik oder klare Einschränkungen prüfen.
- Beratung/Analyse erlaubt keine sachfremde Mutation. Bei Änderungsauftrag nur Systeme, Daten und Personen
  bearbeiten, die der User in Scope gestellt hat.
- Fachlich beste Annahme treffen, wenn sie Ziel und Scope nicht verändert; Annahme mit Grund dokumentieren.
- Nur bei echter externer Blockade fragen: fehlender Zugang, widersprüchliche Pflichtdaten oder destruktive
  Aktion ohne Mandat.
- Aktuelle Userfreigaben sind nicht aus History, Handover, Taskdateien oder früheren Chats ableitbar.
- Browser-/UI-/Screenshot-/Gameplayprüfung und Subagent-Orchestrierung sind getrennte aktuelle Opt-ins.
- Ergebnis zuerst kommunizieren; Details: `shared-docs/coding-rules/kommunikation-und-uebergabe.md`.

## 2. Git-, Datei- und Prozesssicherheit

- Standard ist vorhandener `main`. Branch oder Worktree nur mit aktueller ausdrücklicher Userfreigabe.
- Vor Änderungen Branch, `git worktree list` und `git status --short` prüfen.
- Fremde getrackte oder ungetrackte Änderungen gehören dem User: nicht revertieren, überschreiben,
  pauschal formatieren oder in den eigenen Scope ziehen.
- Kein `git reset --hard`, kein unautorisiertes `checkout --`, kein Umschreiben geteilter Historie.
- Destruktive Ziele zuerst absolut auflösen und auf den beabsichtigten Scope begrenzen. Keine rekursive
  Löschung gegen Root, Home, Workspacewurzel, Glob oder ungeprüfte Variable.
- Für lokale Edits `apply_patch`; mechanische Formatter/Bulk-Migrationen nur kontrolliert und danach diffen.
- Keine unsichtbaren Watcher, CLI-Modelle, Dev-Server oder Hintergrundprozesse automatisch starten.
- Projektgebundene Artefakte unter sprechendem Projektpfad speichern; Temp/AppData ist nie finale Ablage.

## 3. Workflow und Taskdokumentation

- Mehrdateilige Implementierung, Refactoring oder ausdrücklicher Planungsauftrag benötigt vor Änderungen eine
  Task-Datei.
- Linearer Integrationsowner bleibt Standard. Orchestrierung nur bei aktueller Freigabe, mindestens zwei
  unabhängigen großen Tracks, disjunktem Scope und festem Rückgabe-/Evidenzformat.
- Phasen ohne Zwischenstopp abarbeiten; nach jeder Phase Todos, Kommentar und append-only Arbeitsprotokoll
  aktualisieren.
- Gefundene Fehler im bearbeiteten Scope beheben. Fremde Fehler nur additiv anfassen, wenn sie den
  beauftragten Weg blockieren.
- Vollständiger Vertrag: userbenannte Maße, Zustände, Superlative und bereits gute Merkmale vor Abschluss
  erneut prüfen.
- Ausführbares Format:
  `shared-docs/agents/commands/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md`.

## 4. Planung und Dokumentation

- Struktur: `docs/OVERVIEW.md` → Feature-Overview → `docs/<feature>/tasks/<task>.md`.
- Sprechende Dateinamen statt fachlicher `README.md`, `info.md`, `misc.md` oder unqualifiziertem
  `manifest.md`. Externe Toolvorgaben sind die einzige Ausnahme.
- Taskplanung enthält Userziel, Akzeptanzkriterien, Phasen-Todos, Entscheidungen, Risiken und offene
  Fix-Punkte; keinen vollständigen Produktionscode.
- Über etwa 600 Task-Zeilen nummerierte Fortsetzung anlegen. Code-/Promptdateien bleiben unter 700 Zeilen,
  sofern keine fachlich begründete SSoT-Ausnahme dokumentiert ist.
- Nach Abschluss Task-Abschließer anwenden und `.completed/` sowie minimale Root-Doku-Relevanz entscheiden.

## 5. Recherche und Wiederverwendung

- Vor neuen Dateien, Funktionen, Hooks, Stores, Prompts oder Shared-Modulen nach bestehender Funktionalität
  und verwandter Vorarbeit suchen. Ab etwa 80 Prozent Überschneidung bestehenden Owner erweitern.
- Bei komplexem oder wiederholtem Fehler zuerst Muster abstrahieren, lokale Geschwister/SSoTs prüfen und
  aktuelle Primärdokumentation nutzen; danach kleinsten stabilen Ansatz wählen.
- Keine vorsorgliche Volllektüre großer Kataloge, Fachguides oder Postmortems. Router → konkreter Brief →
  Technik/Learning nur nach Phase oder Symptom.

## 6. Architektur und Code

- Fachliche Ownership pro Datei. Aggregatoren importieren/exportieren nur; keine wachsenden
  `entries.ts`-/`config.ts`-/`data.ts`-Monster.
- Shared nur bei echter neutraler Wiederverwendung. Globale Module importieren keine Fachsektion.
- Eine Quelle der Wahrheit für Werte und Zustände; UI, VFX, Audio und Persistenz bleiben dünne Leser.
- Grundstruktur zuerst: Bei wiederholtem kollidierendem Ergebnis Ursache und Ownership neu ordnen statt
  Wertpatches zu stapeln. Bereits gute Eigenschaften bleiben erhalten.
- Keine live iterierte Collection im selben Iterator erweitern; Queue/Snapshot/Visited-Set mit Limit nutzen.
- React/UI/DB-Regeln: `shared-docs/coding-rules/react-ui-und-daten.md`.
- Three.js/R3F: `shared-docs/THREEJS-RULES.md`; Multiplayer/Sync: `shared-docs/COLYSEUS-RULES.md`.

## 7. Projekt- und Technikowner

- Lokale `AGENTS.md`, `CLAUDE.md`, `DESIGN.md`, Feature-SSoTs und `package.json` sind für projektspezifische
  Architektur, Theme, Build und Befehle maßgeblich.
- Externe API-/Library-Details aus aktueller Primärdokumentation beziehen.
- Projektregeln nicht in diesen universellen Kern kopieren.

## 8.1 Statische Checks und Tests

- Checks proportional zur Änderung. Typecheck/Lint sind Code-Sicherheit, kein Produktbeweis.
- Reine Prompt-/Doku-/Regeländerung: kein Typecheck.
- Keine neuen Tests oder Testkonfiguration ohne ausdrücklichen Userauftrag.
- TypeScript-/Checkdetails: `shared-docs/coding-rules/typescript-und-statische-checks.md`.

### 8.1.1 Typecheck

Kanonische Namen: `pnpm type-check`, `pnpm type-check:low-cpu`, `pnpm type-check:legacy`. Projektlokale
Wrapper sind maßgeblich; parallele Compilerläufe und unsichtbare Watcher bleiben verboten.

## 8.2 Sichtbare Ergebnisqualität

- Vor sichtbarer Umsetzung drei bis sieben konkrete Prüffragen aus dem Userziel notieren.
- Ohne aktuelle ausdrückliche Freigabe keinen Browser-, Playwright-, Screenshot-, Preview-, UI-, Gameplay-
  oder FPS-Lauf starten; sichtbares Ergebnis bleibt manuelles Gate.
- Liegt bereits ein sichtbares Artefakt vor, fachlich beurteilen. Falsches Bild ist Fehlerbeweis.
- `success` nur bei stärkster erlaubter Evidenz; sonst ehrlich `partial` oder manuelles Gate.
- Vollvertrag: `shared-docs/coding-rules/browser-und-sichtbare-abnahme.md`.

### 8.2.1 Echtzeitformen

Hero-Solids brauchen authored Silhouette, Bodenkontakt, Tiefe und Oberfläche. Materie und Licht trennen,
Material-/Instanz-Doppeltint prüfen und Bodenträger durch Maske/Randfalloff unsichtbar machen.

## 8.3 Craft und Abschlussabgleich

- Erfolg ist belegbare Nutzerwirkung, nicht bloße Anforderungserfüllung oder Selbsterklärung.
- Schwierigen, nutzerprägenden Kern maßgeschneidert ausarbeiten; Hintergrund und Infrastruktur dürfen
  generalisieren.
- Qualität addiert: Fokus verbessern, ohne explizite Vorgaben oder bereits gute Merkmale zu opfern.
- Vor „fertig“ gesamten Auftrag gegenlesen und physische/logische Kohärenz prüfen.

## 8.4 Generative Prompts

- Kleinster ausreichender Kontext: Ziel, Qualitätsbar, Produktvertrag, Performancehülle, harte Grenzen,
  Lösungsfreiheit und evidenzbasierter Loop.
- Short ist Standard; Medium/Long nur wegen konkret fehlender Produktinformation.
- Runtime-Prompt nennt Baseline, typische reale Last, Ziel/Floor und adaptive Degradation. Ohne Messung keine
  FPS behaupten.
- Learning als `Symptom → Ursache → Aktion → Beleg`, standardmäßig höchstens 90 Wörter; vor Eintrag
  deduplizieren. Fachpostmortems bleiben aus Initialprompts.
- Universalrouter: `prompts/prompt-system/prompt-system-router.md` im jeweiligen Projekt.
