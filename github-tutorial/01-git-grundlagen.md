# Git Grundlagen - Was ist Git überhaupt?

## 🎯 In einem Satz
Git ist wie ein **Super-Speichersystem**, das sich jeden Stand deines Projekts merkt und dir erlaubt, jederzeit zu einem älteren Stand zurückzuspringen.

---

## 🏠 Alltagsanalogie: Das Foto-Album deiner Arbeit

Stell dir vor, du schreibst an einem wichtigen Schulaufsatz:

| **Ohne Git** | **Mit Git** |
|--------------|-------------|
| Du hast nur die aktuelle Version | Du hast ein Foto von **jedem Zwischenstand** |
| Wenn du etwas kaputt machst, ist es weg | Du kannst jederzeit zu einem alten Foto zurück |
| Bei Teamarbeit: Wer hat was geändert? Chaos! | Jede Änderung ist dokumentiert mit Name + Datum |

**Git ist also dein Projekt-Foto-Album**, das automatisch Fotos macht, wenn du "klick" sagst.

---

## 📦 Die drei Orte in Git

```
┌──────────────────────────────────────────────────────────────┐
│  1. DEIN COMPUTER (lokales Repository)                       │
│     └── Hier arbeitest du, hier sind deine Dateien           │
├──────────────────────────────────────────────────────────────┤
│  2. STAGING AREA (Warteschlange)                             │
│     └── "Diese Änderungen will ich speichern"                │
├──────────────────────────────────────────────────────────────┤
│  3. ONLINE (Remote Repository, z.B. GitHub)                  │
│     └── Backup im Internet + Teamzugriff                     │
└──────────────────────────────────────────────────────────────┘
```

### 🎒 Analogie: Der Schulranzen-Workflow

1. **Dein Schreibtisch** = Lokale Dateien (wo du arbeitest)
2. **Dein Ranzen** = Staging Area (was du mitnehmen willst)
3. **Das Schulfach** = Remote/GitHub (sicherer Ablageort für alle)

---

## 🆚 Git vs. GitHub - Was ist der Unterschied?

| **Git** | **GitHub** |
|---------|------------|
| Das **Werkzeug** auf deinem PC | Die **Website** im Internet |
| Funktioniert offline | Braucht Internet |
| Kostenlos, Open Source | Kostenlos + Premium-Features |
| Merkt sich Versionen | Speichert dein Projekt online |

**Merksatz:** *Git ist das Auto, GitHub ist die Garage.*

### Andere "Garagen" (Alternativen zu GitHub)
- **GitLab** - Mehr Privatsphäre-Optionen, belibt bei Firmen
- **Bitbucket** - Gut für kleine Teams
- **Azure DevOps** - Microsoft's Version
- **Gitea** - Selbst gehostet, komplett kostenlos

---

## 🔄 Der typische Git-Ablauf

```
1. Arbeiten         →  Du änderst Dateien
2. git add          →  Du packst Änderungen in den Ranzen
3. git commit       →  Du machst ein "Foto" (Speicherpunkt)
4. git push         →  Du bringst es in die Schule (GitHub)
```

### In Bildern:

```
📝 Du arbeitest...
     │
     ▼
┌─────────────────┐
│  git add .      │  ← "Diese Dateien will ich speichern"
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  git commit     │  ← "Foto machen + Beschreibung"
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  git push       │  ← "Ab ins Internet (GitHub)"
└─────────────────┘
```

---

## 💡 Warum ist Git so wichtig?

1. **Zeitreise möglich** - Du kannst zu jedem alten Stand zurück
2. **Teamwork ohne Chaos** - Jeder kann gleichzeitig arbeiten
3. **Backup-Sicherheit** - Dein Code liegt auf GitHub, nicht nur auf deinem PC
4. **Nachvollziehbarkeit** - Wer hat wann was geändert?
5. **Experimente ohne Risiko** - Teste Sachen, ohne das Hauptprojekt zu zerstören

---

## 📚 Weiter lesen

| Datei | Inhalt |
|-------|--------|
| [02-begriffe-glossar.md](02-begriffe-glossar.md) | Alle wichtigen Begriffe erklärt |
| [03-alltag-befehle.md](03-alltag-befehle.md) | Die Befehle, die du täglich brauchst |
| [04-branch-workflow.md](04-branch-workflow.md) | Wie man mit Branches arbeitet |
| [05-zusammenarbeit.md](05-zusammenarbeit.md) | Teamwork mit Git |
| [06-tools-und-oberflaechen.md](06-tools-und-oberflaechen.md) | GitHub, VS Code, und andere Tools |
