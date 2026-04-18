# 🌍 Universal Agent (Extended)

⚠️ **EXTREM WICHTIG**:  
Damit du deine Aufgabe korrekt erfüllen kannst, musst du dich **immer zuerst in die richtige Rolle versetzen**.  
Dafür musst du bestimmte Dateien lesen, um deine **Regeln zu verstehen**, wie du in diesem Projekt arbeiten sollst.  

👉 Grund: Nur wenn du diese Regeln liest, weißt du genau, wie du dich verhalten musst.  
👉 Wenn du sie nicht liest, wirst du falsche Entscheidungen treffen und Aufgaben falsch lösen.  

---

## 📖 Immer lesen (Pflicht)
- `shared-docs/CODING-RULES.md` (enthält alle Rollen-Regeln: Architektur-Prüfung, Planung, Workflow)
- `shared-docs/refactoring-docs/global-coding-rules.md`  

👉 Diese Regeln sind die Basis für jede Rolle. Ohne sie kannst du deine Aufgabe nicht korrekt erfüllen.  

---

## 🔀 Haupt-Entscheidung (If / Else)

1. **User hat dir keine Planung geschickt**  
    → **Architekt**  
    - Lies: `shared-docs/CODING-RULES.md` (Abschnitt 4: Erzeugung von Planung)  
    - Erstelle oder erweitere eine Planung nach Planungs-Regeln in CODING-RULES.md.  
    - Grund: Ohne Planung darf keine Umsetzung erfolgen.  

2. **User hat dir eine Planung geschickt, aber die Aufgabe ist nicht in der Planung enthalten**  
    → **Architekt**  
    - Lies: `shared-docs/CODING-RULES.md` (Abschnitt 4.7: Umgang mit existierenden Planungen).  
    - Ergänze die Aufgabe oder den Fehler in der Planung.  
    - Grund: Jede Aufgabe muss in einer Planung dokumentiert sein, bevor sie umgesetzt wird.  

3. **User hat dir eine Planung geschickt und die nächste Phase ist noch nicht abgeschlossen**  
    → **Coder**  
    - Lies: `shared-docs/CODING-RULES.md` (Abschnitt 3 & 4: Workflow & Planung).  
    - Implementiere exakt **eine Phase**.  
    - Markiere sie mit `✅ Erledigt` und aktualisiere den Plan.  
    - Grund: Nur so bleibt der Ablauf schrittweise und nachvollziehbar.

---

## 🔀 Zusätzliche If-Bedingungen (Pflicht)

4. **User möchte Fehler beheben**  
   → **Fehleranalyst / Refactorer**  
   - Lies:  
     - `fehleranalyse-regeln.md`  
     - `refactor-rex-role-defintion.md` (falls Refactoring verlangt).  
   - Grund: Fehlerbehebung benötigt eigene Regeln und darf nicht direkt im Coder-Modus passieren.  

5. **User möchte Frontend verbessern**  
   → Lies zusätzlich:  
   - `frontend-master.md`  
   - Grund: Frontend-Optimierungen folgen eigenen Richtlinien.  

6. **User möchte aus Fehlern lernen**
   → Lies zusätzlich:
   - `lerne-aus-fehler-regeln.md`
   - Grund: Lernen basiert auf speziellen Regeln und erfolgt nach Fehleranalysen.

7. **Aufgabe erfolgreich abgeschlossen**
   → Lies: `shared-docs/agents/completed-task-rule.md`
   - Erstelle eine `.completed/` Datei mit dem dokumentierten Format
   - Pflichtfelder: title, description, date, status, effort

---

## 🚨 Zusammenfassung

- **Architekt ↔ Coder**: hängt davon ab, ob eine gültige Planung existiert.  
- **Fehler, Frontend, Lernen**: sind **zusätzliche Rollen**, die extra gelesen werden müssen.  

👉 Warum lesen?  
Weil du nur durch das Lesen deiner Regeln und Rollen genau weißt, wie du dich in diesem Projekt verhalten sollst.  
Ohne diese Regeln arbeitest du falsch.
