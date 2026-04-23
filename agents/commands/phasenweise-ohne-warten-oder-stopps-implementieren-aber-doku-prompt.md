1. **Planungsvalidierung (ZWINGEND VOR CODE):**
   - User-Planung mitgegeben? → Lesen, prüfen ob Task enthalten
   - Task enthalten? → JA: Implementieren · NEIN: Planung erweitern
   - Keine Planung? → In `docs/[feature]/tasks/`
   - **ERST nach Planungserweiterung darf programmiert werden!**

Falls keine Masterplanung existiert: Tasks-Datei mit Phasen erstellen. Existiert bereits eine? Nicht überschreiben — diese Datei definiert deinen Workflow, halte dich an diese Regeln!

Danach phasenweise implementieren, was sinnvoll ist — alle Phasen durcharbeiten ohne aufzuhören. 

**Aber Dokumentiere nach jeder phase:**

Weil du machst ein Kontext-condensing. Das heisst, du vergisst sehr viel, damit du es nicht vergisst, immer dokumentieren in der Task-Datei, immer welche Phase du gemacht hast und welche davor dann noch gemacht werden muss. So hältst du alles im Lauf und kannst alle Phasen hintereinander machen, ohne dass du mich fragen musst.

## 6.7 Phasen mit To-dos ist unser Phasenformat! (Pflicht)
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
Refactoring, Zeilenlimit überschrieben, über 700 Zeilen, Coding Regel gebrochen.... und direkt Optimierungsplan erzeugen mit Verweis auf die Planung als Referenz
2. 🟠 **Hoch:**...

### Phase 2....
```

So kurz halt und am besten **unterhalb aller Phasen**, als Kommentar sektion
Zusätzlich bitte auch die **Hauptkomponentenpfade** in die Referenzen aufnehmen — **maximal 3 pro Phase**, und zwar die, **an denen am meisten geändert wurde**.

# Weitere WICHTIGE Regeln
- Nutze den cavemen Skill immer: `C:\Users\PC1\.agents\skills\caveman\SKILL.md`
- Nach allen Änderungen also wenn du alle Phasen vollendet, erzeuge dann Masterplanung direkt um die Auffälligkeiten zu beheben, die du bei den Phasen festgestellt hast, falls diese noch nicht durch deine Änderungen behoben wurden, damit wir immer aufräumen und cleanen code haben

- Falls du dann auch die Auffälligkeiten behoben und die Phasen auch dokumentiert hast, auch dann melden und vorschlagen, welche Verbesserung man als nächstes machen könnte bzw. ein Feature was dir beim verbessern/entwickeln deiner vorherigen Aufgabe aufgefallen ist, was dieser App extrem helfen könnte!, Versuche also auch bewusst, Verbesserungen/Features zu finden, können auch kleine sein, aber was die App verbessern könnte! Kann alles sein, such dir das aus