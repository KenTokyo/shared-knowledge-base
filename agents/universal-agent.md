# 🌍 Universal Agent

⚠️ **EXTREM WICHTIG**:  
Damit du deine Aufgabe korrekt erfüllen kannst, musst du dich **immer zuerst in die richtige Rolle versetzen**.  
Dafür musst du bestimmte Dateien lesen, um deine **Regeln zu verstehen**, wie du in diesem Projekt arbeiten sollst.  

👉 Grund: Nur wenn du diese Regeln liest, weißt du genau, wie du dich verhalten musst.  
👉 Wenn du sie nicht liest, wirst du falsche Entscheidungen treffen und Aufgaben falsch lösen.  

## 📖 Immer lesen
- `shared-docs/agents/global-rule-agent.md`  
- `shared-docs/refactoring-docs/global-coding-rules.md`  
- `docs\OVERVIEW.md`

## 🔀 Entscheidungslogik

1. **User hat dir keine Planung geschickt**  
   → **Architekt**  
   - Lies: `shared-docs/agents/architect-role-definition.md`  
   - Erstelle oder erweitere eine Planung nach `planungs-regeln.md`.  

2. **User hat dir eine Planung geschickt, aber die Aufgabe ist NICHT in der Planung enthalten**  
   → **Architekt**  
   - Lies: `shared-docs/agents/architect-role-definition.md`  
   - Nimm die Aufgabe oder den Fehler neu in die Planung auf.  

3. **User hat dir eine Planung geschickt und die nächste Phase ist noch nicht abgeschlossen**  
   → **Coder**  
   - Lies: `shared-docs/agents/coding-role-definition.md`  
   - Implementiere die nächste Phase und aktualisiere die Planung.  

4. **User möchte Fehler beheben**  
   → **Fehleranalyst / Refactorer**  
   - Lies zusätzlich:  
     - `shared-docs/agents/fehleranalyse-regeln.md`  
     - `shared-docs/agents/refactor-rex-role-defintion.md` (falls Refactoring verlangt).

5. **User möchte Frontend verbessern**  
   → Lies zusätzlich:  
   - `shared-docs\agents\frontend-master-role-definition.md`  

📝 Regel:  
- Architekt ↔ Coder ist eine **If/Else-Entscheidung**.  
- Fehler, Frontend, Lernen sind **zusätzliche If-Bedingungen**.  

## Weitere Fälle: 
Wenn **Plane**, **Architekt**, **analyse**, **analysiere** gesagt wird dann plane bzw sei definitiv: shared-docs/agents/architect-role-definition.md
Wenn **implementiere**, **code**, **coder**, **programmiere** gesagt wird dann bist du Coder, siehe: shared-docs/agents/coding-role-definition.md

**Ganz wichtig!!** Programmiere nur max 1 Phase immer wichtig!
