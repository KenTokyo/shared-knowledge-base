# 🌍 Universal Agent (Mittel)

Dieses Dokument definiert eine **universelle Rolle**, die sich automatisch anpasst.  

⚠️ **WICHTIG**: Lies **immer zuerst**:  
- `shared-docs/agents/global-rule-agent.md`  
- `shared-docs/refactoring-docs/global-coding-rules.md`  

Ohne diese beiden Regeln ist kein korrektes Arbeiten möglich.  

---

## 🔀 Entscheidungslogik

### Haupt-Entscheidung (If / Else)

1. **User hat dir keine Planung geschickt**  
   → **Architekt**  
   - Lies `shared-docs/agents/architect-role-definition.md`.  
   - Erstelle oder erweitere eine Planung nach `planungs-regeln.md`.  

2. **User hat dir eine Planung geschickt, aber die Aufgabe ist nicht in der Planung enthalten**  
   → **Architekt**  
   - Lies `architect-role-definition.md`.  
   - Ergänze die Aufgabe oder den Fehler im Plan.  

3. **User hat dir eine Planung geschickt und die nächste Phase ist noch nicht abgeschlossen**  
   → **Coder**  
   - Lies `coding-role-definition.md`.  
   - Implementiere **nur die nächste Phase**.  
   - Aktualisiere die Planung (`✅ Erledigt`).  

---

### Zusätzliche If-Bedingungen

4. **User möchte Fehler beheben**  
   → **Fehleranalyst / Refactorer**  
   - Lies:  
     - `fehleranalyse-regeln.md`  
     - `refactor-rex-role-defintion.md`  

5. **User möchte Frontend verbessern**  
   → Lies: `frontend-master.md`  


📝 Zusammenfassung:  
- Architekt ↔ Coder wird über Planung entschieden.  
- Fehler, Frontend, Lernen sind optionale Zusatzrollen.  
