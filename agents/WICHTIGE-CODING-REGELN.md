# Wichtigste Coding Regeln

## Kontext:

**Was ich dir sende**
ich sende dir meistens eine Sprachnachricht, diese kann im Chat oder in einer `.md` Datei vorkommen. Speech-to-Text ist nicht immer exakt, also bitte aktiv mitdenken (z.B. "Cloud Code" kann eigentlich "Claude Code" bedeuten).

**Ich bin nur ein "junior developer" also kunde, der Probleme grob beschreibt...**
es kann auch sein, dass ich den Fehler nicht ganz korrekt beschreibe. wenn meine Annahme nicht passt, korrigiere mich klar und freundlich. ich bin Junior-Developer und will lernen.

unsere App ist groß. eine kleine Änderung kann Nebenwirkungen haben. deshalb erst Überblick holen (Suche, betroffene Dateien, Duplikate) falls mit subagents möglich, dann umsetzen.

ich kann dir oft nur Frontend-Komponenten zeigen (React Grab), aber nicht automatisch die Backend-Teile. bitte den Rest selbst recherchieren.

**Schreibweise**
bitte motiviert, einfach und menschlich schreiben, mit alltagstauglichen Worten, klarer Struktur und gut lesbarer Formatierung.

## Allgemeine Regeln

- **Maximal 700 Zeilen Code pro Datei**.
- Wenn eine Datei größer wird: in Unterkomponenten, Helpers oder Services aufteilen.
- TypeScript immer prüfen: `pnpm lint`.
- Kein `pnpm build` und kein `pnpm dev` nötig.
- Keine Unit-Tests schreiben oder planen, außer der User verlangt es explizit.

## Verstehen statt Umdeuten (Pflicht)

1. Wenn der User A sagt, soll die Lösung A verbessern und nicht still zu B wechseln.
2. Fachwörter nie eigenmächtig übersetzen, wenn dadurch die Richtung kippt.
3. **Vor Umsetzung immer kurz prüfen**: "Löst mein Schritt wirklich das genannte Problem?"
4. **Keine versteckten Nebenwirkungen einbauen** (z.B. harte Limits), ausser der User hat es klar gewünscht.
5. **Bei Effizienz-Themen** ruhig immer erwähnen, ob man die Architektur komplett umbauen sollte, also andere Bereiche ebenfalls, auch wenn der User die nicht erwähnt hat.
6. Bei Zielkonflikten gilt Standard: erst Ergebnisqualität sichern, dann Kosten/Tempo optimieren.
7. Vor Abschluss immer eine schöne Zusammenfassung machen:
   - User-Ziel in 1 Satz
   - gebaute Änderung in paar Sätzen hochmotiviert, Fachbegriffe erklärt, einfach erklärt, mit icons
   - passt beides direkt zusammen: ja/nein

## Generelle Regeln
**Wenn der User explizit dir eine Programmieraufgabe, keine Recherche Aufgabe gibt, dann:** vom aktuellen Stand bis zur letzten Phase in Phasen umsetzen, aber in einer Task-Datei tracken mit Kontextinformationen und Phasenabläufe. Nach jeder Phase die Planung updaten und die nächste Phase durchgehen ohne STOPP!!
- falls ORCHESTRATOR MODUS AN IST: falls enabled, musst du nach jeder Phase den Plan updaten und dann `NEXT_PHASE_READY` am ende schreiben inklusive der ...TASK.md als Referenz mitgeben in deinem letzten Chat mit einer kleinen Summary was du gemacht hast, weil genau deine letzte Nachricht wird im nächsten Chat dann für dich mit neuem Kontext erscheinen

### 🔴 Nutze Subagents nur bei Search/Abschließer Subagents
- Subagents nur zum Suchen,Abschließen, also zum Suchen von Dateien oder zum Aktualisieren von Dokumentationen verwenden

## Pre-Task Reconnaissance (Pflicht bei größeren Tasks)

**Inspiriert von ASMR (Agentic Search & Memory Retrieval):** Bevor Code geschrieben wird,
MÜSSEN 2-3 Erkunder-Agents (Haiku) parallel gespawnt werden um den vollen Kontext zu sammeln.
Das verhindert Duplikate, findet relevante Dateien und erkennt Konflikte BEVOR die Programmierung oder Planung startet.

### Ablauf (IMMER linear spawnen!):
```
User-Task → Orchestrator
  │
  ├─ VOR dem Coding (parallel):
  │   ├─ erkunder-docs  (Haiku) → Sucht in docs/, .completed/, History/
  │   └─ erkunder-code  (Haiku) → Findet betroffene Dateien, Duplikate
  │
  ▼ Synthese → duplikat-checker (Haiku, bei neuen Dateien)
  │
  ├─ programmiere/plane (Opus) → Coding mit vollem Kontext
  │
  ▼ NACH dem Coding:
  └─ abschliesser (Haiku) → .completed/ erstellen + CLAUDE.md Relevanz-Check
```

### Duplikat-Checker (PFLICHT bei neuen Dateien!)
Bevor NEUE Dateien, Hooks, Stores oder Utilities erstellt werden, MUSS der `duplikat-checker`
Agent (Haiku) prüfen ob etwas Ähnliches schon existiert. 80%-Regel: Wenn eine existierende
Funktion 80%+ der gewünschten Funktionalität hat → ERWEITERN statt neu erstellen.

**WICHTIG:** Sollten die Subagents nicht exisiteren, lege sie an, mit einem schnellen und token-effizienten Modell (z.B. bei Claude wäre dieser Haiku 4.5) von dem Provider, von welchen du gerade aus arbeitest und teile mir mit dass du die Subagents erzeugt hast

### Wer schreibt was?

| Agent | Modell | Datei-Output | Inhalt |
| --- | --- | --- | --- |
| `erkunder-docs` | Haiku | Chat-Output an Orchestrator | Verwandte Tasks, Architektur-Docs, History |
| `erkunder-code` | Haiku | Chat-Output an Orchestrator | Betroffene Dateien, existierende Funktionen, Duplikate |
| `duplikat-checker` | Haiku | Chat-Output an Orchestrator | Duplikat-Prüfung für geplante neue Dateien |
| `abschliesser` | Haiku | `.completed/*.md` + ggf. CLAUDE.md Mini-Update | .completed/ Datei + Relevanz-Check Knowledge Map/Persistenz |
| `ki-architekt` | Opus | `*-ARCHITEKTUR-ANALYSE.md` | Ist-Stand, Abweichungen, betroffene Dateien, Empfehlungen |

## Completed-Task Dokumentation
Nach erfolgreichem Abschluss MUSS eine Datei in
`.completed/<YYYY-MM-DD>_<slug>.md` erstellt werden.
Format laut:
`shared-docs/agents/completed-task-rule.md`

## Signaltöne
- Frage stellen / auf User warten: `powershell -c "[console]::beep(400,400)"`
- Fertig: `powershell -c "[console]::beep(400,800)"`
- Antworte in deutsch, einfach, allgemeine Sprache, keine Fachsprache, mit kursiv, fett und sektionen und mit icons und hochmotiviert, so was du gemacht hast, was noch hilfreich wäre... 
- programmiere in englisch

**Wenn der User Konsolenausgaben schreibt bzw möchte**, 
- dann bitte hochmoderne superschöne und motivierende farbige konsolenausgaben!!
- Sie sollen menschenlesbar sein mit allgemeiner Sprache welche Methode was macht, CAPS LOCK für bestimmte Sachen, eckige Klammer, kursiv, fett
quasi wie eine Kunst, so lesbar wie möglich und so schön wie möglich, sodass ich sie dir auch geben kann, auch ob es server oder client ist, welche Methode, welche Klasse.. Kompakt, keine Endlos Konsolenausgaben... So spielerisch und modern! wie so ein Retro Game
- Sie sollen dir auch helfen Fehler und Probleme zu erkennen, auch Performance Issues, also wenn was laggt, dann kannst du einen Timer einbauen, für bestimmte Cases, um zu prüfen, ob es laggs gibt, endlosschleifen, also wie lange prozesse dauern

**ACHTE AUF FOLGENDE SACHEN:**
Wartbarkeit, Modular/Komponentenbasiert, Helper/Service Funktion, Trennung, Gute Architektur, Simpel und Wiederverwendbar und Performance Optimiert bzw. Edge Cases betrachten und
Zu diesen genannten Kriterien immer in Planungen Meinung kurz schreiben bzw Feedback abgeben ob die erzeugten Planungen den kritieren entsprechen

## Phasen mit To-dos ist unser Phasenformat! (Pflicht)
Wichtig ist bei Phasen in Planungen, dass du die Phasen mit To-dos markierst. Also innerhalb von Phasen To-dos anlegen und dann schreiben, was genau gemacht worden ist.

**Beispiel:**
```markdown
### ✅ Phase NUMMER — Kurzbeschreibung *z. B. Architektur, Modus-Trennung, Save-Basis*
**Ziel:** Hier schreiben, worum es geht.
* [x] `Komponente XYZ` erzeugt (604 Zeilen Code), .....
* [ ] `AUFGABE ABC` implementieren.
**Referenzen:**
`Hier Pfade der Unterplanungen, Historien, Completed, Besprechungen angeben`
`Jeweils getrennt pro Zeile`
```

### Kommentar Sektion unter der Phasenplanung
Nach Abschluss bitte schreiben, an welchen Kriterien du dich gehalten hast, speziell also mit komma getrennt in einer Zeile 
und danach **Welche Auffäligkeiten/Fehler/Regelverstoße** dir aufgefallen sind, notieren und ein Refactoring Plan empfehlen, mitsamt aller Funde und nach Gewichtung sortieren
Kriterien eingehalten z.B. 

```markdown
## Kommentare
### Phase 1
**Eingehalten**: unter 700 Zeilen ✅, architektur ✅, Edge-Cases betrachtet ✅, ...
**Auffäligkeiten/Performance-Issues/Probleme/Kritische Findings (nach Schwere):**: 
1. 🔴 **Kritisch:** Start-Crash durch fehlerhafte QuizPack-Umwandlung
Beschreibung hierzu notieren, falls notwendig
Refactoring, Zeilenlimit überschrieben, über 700 Zeilen, Coding Regel gebrochen.... und direkt Optimierungsplan erzeugen mit Verweis auf die von dir erstelle Planung in 
2. 🟠 **Hoch:**...

### Phase 2....
```

So kurz halt und am besten **unterhalb aller Phasen**, als Kommentar sektion
Zusätzlich bitte auch die **Hauptkomponentenpfade** in die Referenzen aufnehmen — **maximal 3 pro Phase**, und zwar die, **an denen am meisten geändert wurde**.