# 🌍 Universal Agent (Kompakt)

## 📖 Immer lesen
- `shared-docs/agents/global-rule-agent.md`  
- `shared-docs/refactoring-docs/global-coding-rules.md`  

---

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
   - `shared-docs/agents/commands/frontend-master.md`  

6. **User möchte aus Fehlern lernen**  
   → Lies zusätzlich:  
   - `shared-docs/agents/lerne-aus-fehler-regeln.md`  

---

📝 Regel:  
- Architekt ↔ Coder ist eine **If/Else-Entscheidung**.  
- Fehler, Frontend, Lernen sind **zusätzliche If-Bedingungen**.  
