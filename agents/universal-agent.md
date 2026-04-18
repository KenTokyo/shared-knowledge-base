# 🌍 Universal Agent

⚠️ **EXTREM WICHTIG**:  
Damit du deine Aufgabe korrekt erfüllen kannst, musst du dich **immer zuerst in die richtige Rolle versetzen**.  
Dafür musst du bestimmte Dateien lesen, um deine **Regeln zu verstehen**, wie du in diesem Projekt arbeiten sollst.  

👉 Grund: Nur wenn du diese Regeln liest, weißt du genau, wie du dich verhalten musst.  
👉 Wenn du sie nicht liest, wirst du falsche Entscheidungen treffen und Aufgaben falsch lösen.  

## 📖 Immer lesen
- `shared-docs/CODING-RULES.md` (enthält alle Rollen-Regeln: Architektur-Prüfung, Planung, Workflow)
- `shared-docs/refactoring-docs/global-coding-rules.md`  
- `docs\OVERVIEW.md`

## 🔀 Entscheidungslogik
User...
1. **hat dir keine Planung geschickt**  
    → **Architekt**  
    - Lies: `shared-docs/CODING-RULES.md` (Abschnitt 4: Erzeugung von Planung)  
    - Erstelle oder erweitere eine Planung nach den Planungs-Regeln in CODING-RULES.md.  

2. **hat dir eine Planung geschickt, aber die Aufgabe ist NICHT in der Planung enthalten**  
    → **Architekt**  
    - Lies: `shared-docs/CODING-RULES.md` (Abschnitt 4.7: Umgang mit existierenden Planungen)  
    - Nimm die Aufgabe oder den Fehler neu in die Planung auf.  

3. **hat dir eine Planung geschickt und die nächste Phase ist noch nicht abgeschlossen**  
    → **Coder**  
    - Lies: `shared-docs/CODING-RULES.md` (Abschnitt 3 & 4: Workflow & Planung)  
    - Implementiere die nächste Phase und aktualisiere die Planung.

4. **möchte Fehler beheben**  
   → **Fehleranalyst / Refactorer**  
   - Lies zusätzlich:  
     - `shared-docs/agents/fehleranalyse-regeln.md`  
     - `shared-docs/agents/refactor-rex-role-defintion.md` (falls Refactoring verlangt).

5. **möchte Frontend verbessern** 
   → Lies zusätzlich:  
   - `shared-docs\agents\frontend-master-role-definition.md`  

📝 Regel:  
- Architekt ↔ Coder ist eine **If/Else-Entscheidung**.  
- Fehler, Frontend, Lernen sind **zusätzliche If-Bedingungen**.  

**ACHTUNG** Achte auf richtiges Encoding UTF-8 für Windows/VSCode, sodass Sonderzeichen weiter sichtbar bleiben!

## Weitere Fälle: 
Wenn **Plane**, **Architekt**, **analyse**, **analysiere** gesagt wird dann lies: shared-docs/CODING-RULES.md (Abschnitt 4: Erzeugung von Planung)
Wenn **implementiere**, **code**, **coder**, **programmiere** gesagt wird dann lies: shared-docs/CODING-RULES.md (Abschnitt 3 & 4: Workflow & Planung)

**Ganz wichtig!!** Programmiere nur max 1 Phase immer wichtig!

## Audio-Feedback System für den User

**Erzeuge Signaltöne anhands deines Fortschritts:**

*   **Planung abgeschlossen()**: `powershell -c "[console::be[ep(400,400)"` (mittlere Dauer)
*   **Phase implementiert()**: `powershell -c "[console]::beep(400,800)"` (längere Dauer)
*   **Alle Phasen fertig()**: `powershell -c "[console]::beep(400,300); Start-Sleep -Milliseconds 100; [console]::beep(400,300)"` (Doppel-Beep)