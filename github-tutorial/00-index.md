# Git Tutorial - Übersicht

## 🎯 Für wen ist dieses Tutorial?
Für **absolute Anfänger**, die Git verstehen und professionell damit arbeiten wollen.

---

## 📚 Die Kapitel

| Nr. | Datei | Inhalt |
|-----|-------|--------|
| 01 | [Git Grundlagen](01-git-grundlagen.md) | Was ist Git? Warum brauche ich das? |
| 02 | [Begriffe Glossar](02-begriffe-glossar.md) | Alle wichtigen Begriffe mit Alltagsanalogien |
| 03 | [Alltags-Befehle](03-alltag-befehle.md) | Die 10 Befehle, die du täglich brauchst |
| 04 | [Branch Workflow](04-branch-workflow.md) | Wie man professionell mit Branches arbeitet |
| 05 | [Zusammenarbeit](05-zusammenarbeit.md) | Teamwork, Pull Requests, Code Review |
| 06 | [Tools & Oberflächen](06-tools-und-oberflaechen.md) | GitHub, VS Code, Desktop-Apps, Terminal |
| 07 | [Fehler & Verlauf](07-fehler-und-verlauf-notedrill.md) | Dein konkreter Fall mit TanStack |
| 08 | [Teamgrößen & HEAD](08-teamgroessen-und-head.md) | Teams skalieren, HEAD-Befehle, Branch-Namen |
| 09 | [Befehl-Anatomie](09-befehl-anatomie.md) | Warum Befehle so aufgebaut sind (origin, -u, force) |

---

## 🚀 Schnellstart (wenn du keine Zeit hast)

### Die 5 wichtigsten Befehle:
```bash
git status              # Was ist los?
git add .               # Änderungen einpacken
git commit -m "..."     # Speicherpunkt machen
git push                # Hochladen
git pull                # Updates holen
```

### Die 5 wichtigsten Begriffe:
1. **Repository** = Überwachter Ordner
2. **Commit** = Speicherpunkt (Foto)
3. **Branch** = Parallele Version
4. **Push** = Hochladen
5. **Pull** = Herunterladen

---

## 🧠 Alltagsanalogien zum Merken

| Git-Begriff | Alltagsanalogie |
|-------------|-----------------|
| Repository | 📁 Aktenordner mit Zeitmaschine |
| Commit | 📸 Foto mit Beschreibung |
| Branch | 🛤️ Parallelwelt |
| Push | 📤 Hausaufgaben hochladen |
| Pull | 📥 Neueste Version holen |
| Clone | 📋 Buch komplett kopieren |
| Merge | 🧬 Zwei Versionen verschmelzen |
| HEAD | 📍 "Du bist hier" |

---

## 📋 Dein erster Tag mit Git

```
1. Git installieren
   https://git-scm.com/download

2. Konfigurieren
   git config --global user.name "Dein Name"
   git config --global user.email "dein@email.de"

3. Erstes Repository
   git init                    # Neues Repo erstellen
   # ODER
   git clone <url>             # Existierendes klonen

4. Arbeiten
   - Dateien ändern
   - git status                # Was wurde geändert?
   - git add .                 # Einpacken
   - git commit -m "..."       # Speichern
   - git push                  # Hochladen

5. Wiederholen! 🔄
```

---

## 🎓 Quiz-Ideen (für später)

Du kannst aus diesem Tutorial Quizfragen generieren:

1. **Was ist der Unterschied zwischen Git und GitHub?**
2. **Was macht `git add`?**
3. **Was ist ein Branch?**
4. **Wann benutzt man `git push` vs `git pull`?**
5. **Was ist HEAD?**
6. **Wie erstellt man einen neuen Branch?**
7. **Was ist ein Pull Request?**
8. **Wie löst man einen Merge Conflict?**
9. **Was bedeutet HEAD~3?**
10. **Unterschied zwischen `git reset` und `git revert`?**
11. **Wie viele Reviews braucht ein Team mit 8 Leuten?**
12. **Was ist der Unterschied zwischen main und develop?**

---

## 🆘 Hilfe

- [Git Cheatsheet (offiziell)](https://training.github.com/downloads/github-git-cheat-sheet/)
- [Learn Git Branching (interaktiv)](https://learngitbranching.js.org/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/git)

---

*Erstellt für NoteDrill - April 2026*
