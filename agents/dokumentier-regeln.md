# 📑 Dokumentations-Agent – Struktur & Regeln

## 1\. Speicherorte der Dokumentation

**Feature-Overview** (nur bei großen Änderungen oder neuen Features):`docs/[feature]/[feature]-overview.md`

**Sub-Features**:`docs/[feature]/features/[sub-feature].md`

**Task-History**:`docs/[feature]/tasks/[datum]-[task].md`

**Master-Navigation** (nur bei sehr großen Änderungen):`docs/OVERVIEW.md`

**Feature-Matrix**:`docs/FEATURE_MATRIX.md`

---

## 2\. Dokumentations-Inhalt pro Ebene

### **Feature-Overview (**`**[feature]-overview.md**`**\*\*\*\*)**

Eine einheitliche Tabelle mit allen relevanten Informationen:


| Kategorie          | Inhalt                                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| User kann          | Notizen schreiben, Notizen löschen, Notizen bearbeiten, Notizen umbenennen                                        |
| Betroffene Dateien | `tiptap-editor.tsx`, `notes-panel.tsx`                                                                             |
| Feature-Ordner     | `features/tiptap-editor`                                                                                           |
| Sub-Feature-Name   | `tiptap-editor`                                                                                                    |
| Finder             | `DrizzleFinderNotes.ts` (ca. 120 Zeilen), `DrizzleFinderTags.ts` (ca. 80 Zeilen)                                   |
| Actions            | `DrizzleActionCreateNote.ts` (ca. 50 Zeilen), `DrizzleActionDeleteNote.ts` (ca. 40 Zeilen)                         |
| Services           | `NoteService.ts` (200 Zeilen), `TagService.ts` (150 Zeilen)                                                        |
| Methoden           | `handleCreateNote (Action)`, `handleDeleteNote (Action)`, `handleUpdateNoteSafe (Safe)`, `handleRenameNote (Safe)` |

---

### **Sub-Feature (**`**features/[sub-feature].md**`**\*\*\*\*)**

Ebenfalls in Tabellenform, falls Details tiefer aufgeschlüsselt werden müssen (z. B. Methoden-Beschreibungen):

<table><tbody><tr><td>Methode</td><td>Art</td><td>Beschreibung</td></tr><tr><td>handleCreateNote</td><td>Action</td><td>Erstellt eine neue Notiz in der DB</td></tr><tr><td>handleDeleteNote</td><td>Action</td><td>Löscht eine Notiz</td></tr><tr><td>handleUpdateNoteSafe</td><td>Safe</td><td>Aktualisiert eine Notiz mit Fehlerprüfung</td></tr><tr><td>handleRenameNote</td><td>Safe</td><td>Benennt eine Notiz um und prüft Konflikte</td></tr></tbody></table>

---

### **Task-History (**`**tasks/[datum]-[task].md**`**\*\*\*\*)**

<table><tbody><tr><td>Datum</td><td>Task</td><td>Status</td><td>Betroffene Features</td></tr><tr><td>2025-09-11</td><td>Refactoring Notizen</td><td>✅ abgeschlossen</td><td>Notes, tiptap-editor</td></tr></tbody></table>

---

### **Feature-Matrix (**`**FEATURE_MATRIX.md**`**\*\*\*\*)**

<table><tbody><tr><td>Use-Case</td><td>Feature</td><td>Sub-Feature</td></tr><tr><td>Notizen erstellen</td><td>Notes</td><td>tiptap-editor</td></tr><tr><td>Zeichnen auf Canvas</td><td>Canvas</td><td>canvas-rectangles</td></tr></tbody></table>

---

## 3\. Regeln für den Dokumentations-Agent

Dokumentation wird **nur ausgelöst**, wenn alle Phase abgeschlossen ist.

**Wichtig!** Nur **IST**\-Zustand wird notiert, alter Stand wird gelöscht

Immer **kompakt in Tabellenform**.

Dateien werden **automatisch im richtigen Ordner** abgelegt.

Bei großen Änderungen zusätzlich **Overview** und **Feature-Matrix** aktualisieren.

Falls struktur nicht dieser ähnelt, dann bitte umsetzen, bzw Umbau planen
