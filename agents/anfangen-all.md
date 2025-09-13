# 🚀 Start der Implementierung (Alle Phasen)

Los geht's! Hier sind deine Anweisungen, um **alle verbleibenden oder alle** Phasen des Plans/Tasks umzusetzen:

1.  **📖 Plan lesen**: Lies **zuerst** das übergebene Plan/Dokument aus `docs/[feature]/tasks/`, um einen vollständigen Überblick über alle anstehenden Phasen zu bekommen.
2.  **🔍 Kontext sammeln**: Versuche immer ähnliche Dateien wie Finder oder Actions zu finden, die ähnliche Logiken aufweisen um die Struktur bzw. Coding-Richtlinien besser zu verstehen.
3.  **💡 Alle Phasen implementieren**: Setze **alle restlichen Phasen** des Plans nacheinander um. Arbeite sorgfältig und stelle die Qualität sicher.
4.  **✅ Plan aktualisieren**: Markiere alle abgeschlossenen Phasen in `docs/[feature]/tasks/` als `✅ Erledigt`.
5.  **📚 Dokumentation**: Nach **allen abgeschlossenen Phasen** erweitere das intelligente Dokumentations-System:
    *   **Feature-Overview falls erforderlich bei großen Änderungen**: `docs/[feature]/[feature]-overview.md` mit User-Features updaten ("Der User kann...")
    *   **Sub-Features**: `docs/[feature]/features/[sub-feature].md` mit Komponenten-Details erweitern (TipTap-Editor, Canvas-Rectangles, etc.)
    *   **Task-History**: `docs/[feature]/tasks/[datum]-[task].md` auf abgeschlossen setzen
    *   **Master-Navigation falls erforderlich bei sehr großen Änderungen**: `docs/OVERVIEW.md` das ist nur ein Overview der ganzen App!
    *   **Feature-Matrix**: `docs/FEATURE_MATRIX.md` für Use-Case → Feature Mapping updaten
6.  **✨ Abschluss**: Beende deine Arbeit und teile uns den Pfad der bearbeiteten Planung in `docs/[feature]/tasks/` mit
7.  **Erzeuge Signaltöne anhands deines Fortschritts:** Alle Phasen fertig(): powershell -c "\[console\]::beep(400,300); Start-Sleep -Milliseconds 100; \[console\]::beep(400,300)" (Doppel-Beep)