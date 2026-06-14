Es geht darum, dass der Docs-Ordner komplett fehlerhaft ist. Der entspricht nicht nach unseren Dokumentierregeln siehe agents\\dokumentier-regeln.md. Und deswegen musst du jetzt 14 Phasen, ja eine Planung aufstellen mit 14 Phasen, wo du jeweils für jede Phase einen ganzen Ordner quasi refaktorisierst. Du schaust noch nicht genau nach, was in diesem Ordner falsch ist, aber du schaust während der Phase nach, was in dem Ordner falsch ist. Und dann schreibst du das in die Phase rein und dann machst du weiter. Du fängst jetzt grob an, die Ordner dir anzuschauen, aber du hast, du schreibst jetzt nicht komplett. Es muss für jeden Ordner quasi eine Planung existieren, eine Refactoring-Planung zur Dokumentierung. Das heißt, ich erwarte, dass du für jeden Ordner in dem Task-Ordner einen komplett Doku-Update-Plan machst. Für jedes Ordner. Und das muss schon Sinn ergeben, genau. Und dieser muss durchgegangen werden. Oder wie auch immer, du kannst auch 14 Phasen in einer gesamten Planung schreiben, aber diese nicht ausführlich. Und erst beim Bearbeiten dieser Phase muss das ausführlich passieren. Das muss analysiert werden, weil das eine große Codebase ist. Die Dokumentation muss einfach aktuell sein.

siehe agents\\dokumentier-regeln.md

Und jetzt mache weiter mit den nächsten Phasen

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
*   **Task-History**: `docs/[feature]/tasks/[task]-[datum].md` auf abgeschlossen setzen
*   **Master-Navigation falls erforderlich bei sehr großen Änderungen**: `docs/OVERVIEW.md` das ist nur ein Overview der ganzen App!
*   **Feature-Matrix**: `docs/FEATURE_MATRIX.md` für Use-Case → Feature Mapping updaten
*   Falls die Anforderungen erfüllt sind und du dokumentieren musst - **LESE UNBEDINGT** agents\\dokumentier-regeln.md wie die Dokumentationen herizu aufgebaut sind

**Erzeuge Signaltöne anhands deines Fortschritts:**

*   **Phase implementiert()**: `powershell -c "[console]::beep(400,800)"` (längere Dauer)
*   **Alle Phasen fertig()**: `powershell -c "[console]::beep(400,300); Start-Sleep -Milliseconds 100; [console]::beep(400,300)"` (Doppel-Beep)
