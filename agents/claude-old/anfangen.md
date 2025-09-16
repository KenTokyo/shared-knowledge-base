# 🚀 Start der nächsten Phase

Willkommen zurück! Hier sind deine Anweisungen, um mit der nächsten Phase zu beginnen:

**📖 Plan lesen**: Lies **zuerst** die übergebene Planung/Task aus `docs/[feature]/tasks/`, um die nächste anstehende Phase zu verstehen.

**🔍 Kontext sammeln**: Versuche immer ähnliche Dateien wie Finder oder Actions zu finden, die ähnliche Logiken aufweisen um die Struktur bzw. Coding-Richtlinien besser zu verstehen.

**💡 Eine Phase implementieren**: Konzentriere dich darauf, **nur eine einzige Phase** des Plans umzusetzen. Qualität vor Quantität!

**✅ Plan aktualisieren**: Sobald du fertig bist, aktualisiere das Planungsdokument:

*   Markiere die abgeschlossene Phase als `✅ Erledigt`.
*   Dokumentiere deine Arbeitsschritte klar und nachvollziehbar.
*   Fasse zusammen, warum du bestimmte Entscheidungen getroffen hast.

**✨ Abschluss**: Beende deine Arbeit und teile uns den Pfad der bearbeiteten Planung in `docs/[feature]/tasks/` mit

**📚 Dokumentation**: NUR WENN **alle Phasen abgeschlossen sind** erweitere das intelligente Dokumentations-System:  
**Feature-Overview falls erforderlich bei großen Änderungen**: `docs/[feature]/[feature]-overview.md` mit User-Features updaten ("Der User kann...")

*   **Sub-Features**: `docs/[feature]/features/[sub-feature].md` mit Komponenten-Details erweitern (TipTap-Editor, Canvas-Rectangles, etc.)
*   **Task-History**: `docs/[feature]/tasks/[datum]-[task].md` auf abgeschlossen setzen
*   **Master-Navigation falls erforderlich bei sehr großen Änderungen**: `docs/OVERVIEW.md` das ist nur ein Overview der ganzen App!
*   **Feature-Matrix**: `docs/FEATURE_MATRIX.md` für Use-Case → Feature Mapping updaten
*   Falls die Anforderungen erfüllt sind und du dokumentieren musst - **LESE UNBEDINGT** agents\\dokumentier-regeln.md wie die Dokumentationen herizu aufgebaut sind

**Erzeuge Signaltöne anhands deines Fortschritts:**

*   **Phase implementiert()**: `powershell -c "[console]::beep(400,800)"` (längere Dauer)
*   **Alle Phasen fertig()**: `powershell -c "[console]::beep(400,300); Start-Sleep -Milliseconds 100; [console]::beep(400,300)"` (Doppel-Beep)