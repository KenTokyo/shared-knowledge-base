# 📑 Planungs-Template

## 📌 Regeln & Einstieg

*   **Lese unbedingt zuerst: CLAUDE.MD**
*   Wenn du dieses Kommando erhältst: **Starte mit der Bearbeitung des übergebenen Plan/Tasks oder erstelle eine Plan/Tasks.md Datei nach /CLAUDE.md Richtlinien als Plan/Task.**
*   Lese auch das Overview der jeweiligen Komponente in: `docs/[feature]/[feature]-overview.md`
*   Lege Tasks ab unter: `docs/[feature]/tasks/[datum]-[task].md`
*   Versuche Edge-Cases rauszufinden
*   **Wichtig:** Du darfst nicht programmieren, nur Dokumente anpassen oder erstellen!

---

## 🎯 Menschenlesbare Planungen (WICHTIG!)

### 1\. 🚀 Strategie & Zielsetzung (motiviert & mit icons)

*   Was soll das Feature leisten?
*   Mit welchen Features ist es verbunden?
*   Gibt es Koexistenzen oder Abhängigkeiten?

### 2\. ❓ Automatische Q&A & Use Cases

*   3–6 Fragen/Edge Cases, die User stellen könnten
*   Beantworte proaktiv mit ✅ Icons
*   Typische User-Szenarien und mögliche Edge Cases
*   Fokus: "Was passiert wenn…" Situationen

### 3\. 📱 Konkrete Beispiele mit Emojis

```
🖥️ PC: Du schreibst "Einkaufsliste: Milch"
📱 Tablet: Du öffnest App → Download → Siehst "Milch"
✅ Sync funktioniert!
```

### 4\. ⚡ Regeleinhaltung & Performance-Optimierung

*   Welche Optimierungen geplant sind
*   Welche **Next.js Projektfeatures** genutzt werden, um Performance zu optimieren (z. B. useEffect, useCallback, useMemo, useCache …)
*   Welche Regeln aus CLAUDE.md angewendet werden
*   Ladezeiten/Speicherdaten mit konkreten Werten: "25MB", "2 Sekunden", "99.9%"

### 5\. 🔄 Code-Reuse prüfen

*   Erst nach existierenden Funktionen suchen
*   Wiederverwendung statt Redundanz
*   Ziel: Kein Dead-/Legacy-Code

### 6\. 🧩 Komponenten & Implementierung (kein Code)

Komponenten, die gebaut werden, nur **Name und Zweck**, mit geschätzten Code-Linien **optimal 400–500 Zeilen Richtwert**. Eine komplette Phase umfasst **4–6 Komponenten**, die entweder angepasst oder erzeugt werden. Eine Phase sollte insgesamt **1500–2500 Zeilen Code** umfassen.

*   Für jede Komponente: Name, Zweck, geschätzte Code-Linien
*   Datentypen/Typen, die erweitert werden
*   Bestehende Funktionen, die angepasst werden
*   Hinweis: Fokus liegt auf Verständlichkeit & Planung, kein Code

### 7\. 📚 Dokumentation & Subfeatures

*   Welche Dokumentationen angepasst werden müssen
*   Welche Subfeatures betroffen sind
*   Hinweise auf künftige Updates

### 8\. Erzeuge Signaltöne anhands deines Fortschritts:\*\*

*   **Planung abgeschlossen**: `powershell -c "[console]::beep(400,400)"` (mittlere Dauer)