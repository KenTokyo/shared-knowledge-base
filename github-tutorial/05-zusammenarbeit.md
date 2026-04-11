# Zusammenarbeit mit Git - Teamwork ohne Chaos

## 🎯 Das Problem ohne Git
Stell dir vor, 3 Leute arbeiten an der gleichen Word-Datei...

```
❌ projekt_v1.docx
❌ projekt_v2_sarah.docx
❌ projekt_final.docx
❌ projekt_final_WIRKLICH_FINAL.docx
❌ projekt_final_v3_korrigiert.docx
```

**Mit Git:** Es gibt nur EIN Projekt, alle arbeiten zusammen.

---

## 👥 Wie Teams mit Git arbeiten

### Der typische Team-Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    TEAM WORKFLOW                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  GitHub Repository (Remote)                                 │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                     main                               │ │
│  │  ●───●───●───●───●───●───●───●                        │ │
│  └───────────────────────────────────────────────────────┘ │
│        ↑       ↑       ↑                                    │
│        │       │       │                                    │
│      push    push    push                                   │
│        │       │       │                                    │
│  ┌─────┴──┐ ┌──┴────┐ ┌┴──────┐                           │
│  │ Sarah  │ │  Max  │ │  Kim  │                            │
│  │ (lokal)│ │(lokal)│ │(lokal)│                            │
│  └────────┘ └───────┘ └───────┘                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Pull Requests (PR) - Das Herzstück

### Was ist ein Pull Request?
**Eine "Bitte", deine Änderungen in main zu übernehmen.**

**Alltagsanalogie:** 📝 Du reichst einen Antrag ein: "Hey, ich habe diese Verbesserung gemacht. Kann jemand drüberschauen und freigeben?"

### Der PR-Workflow

```
1. Du arbeitest auf deinem Branch
   feature/neue-suche

2. Du pushst zu GitHub
   git push -u origin feature/neue-suche

3. Auf GitHub: "Create Pull Request"
   - Titel: Was wurde gemacht?
   - Beschreibung: Warum? Wie testen?

4. Team reviewt den Code
   - Kommentare
   - Änderungswünsche
   - Approval ✅

5. Merge!
   - feature/neue-suche → main
```

### Gute PR-Beschreibung

```markdown
## Was wurde geändert?
- Neue Suchfunktion für Notizen
- Filter nach Datum und Kategorie

## Warum?
User haben sich beschwert, dass sie Notizen nicht finden können.

## Wie testen?
1. Zur Notizen-Seite gehen
2. Suchfeld benutzen
3. Filter ausprobieren

## Screenshots
[Bild hier einfügen]
```

---

## 🔍 Code Review - Warum?

### Vorteile
1. **Vier Augen sehen mehr** - Bugs werden früher gefunden
2. **Wissenstransfer** - Alle lernen den Code kennen
3. **Code-Qualität** - Standards werden eingehalten
4. **Dokumentation** - PR-Historie erklärt Entscheidungen

### Gute Review-Kommentare

```
✅ "Dieser Loop könnte zu Performance-Problemen führen bei 
    großen Listen. Vielleicht useMemo() verwenden?"

✅ "Schöne Lösung! Kleine Anmerkung: Zeile 42 könnte einen 
    Edge-Case übersehen wenn user null ist."

❌ "Das ist falsch."

❌ "Warum machst du das so?"
```

---

## ⚔️ Merge Conflicts - Wenn zwei das Gleiche ändern

### Wann passiert ein Conflict?
Wenn zwei Leute die **gleiche Zeile** in der **gleichen Datei** ändern.

```
Sarah ändert Zeile 10:     const color = "blue";
Max ändert Zeile 10:       const color = "red";

→ Git weiß nicht, welche Version richtig ist!
```

### Wie sieht ein Conflict aus?

```javascript
<<<<<<< HEAD (deine Version)
const color = "blue";
=======
const color = "red";
>>>>>>> feature/max-changes (die andere Version)
```

### Wie löst man Conflicts?

```
1. Datei öffnen
2. Die <<<, ===, >>> Markierungen finden
3. Entscheiden: Welche Version? Oder beide kombinieren?
4. Markierungen löschen
5. git add <datei>
6. git commit
```

### Conflict vermeiden

```
✅ Regelmäßig main pullen
✅ In verschiedenen Bereichen arbeiten
✅ Kleine, schnelle PRs
✅ Gute Kommunikation im Team

❌ Wochenlang ohne Pull arbeiten
❌ Riesige PRs
❌ Alle in der gleichen Datei
```

---

## 🛡️ Protected Branches

### Was ist das?
**Regeln, die verhindern, dass jemand direkt auf main pusht.**

### Typische Einstellungen (auf GitHub)

| Regel | Bedeutung |
|-------|-----------|
| Require PR | Niemand pusht direkt zu main |
| Require Review | Mindestens 1 Person muss approven |
| Require Checks | Tests müssen durchlaufen |
| No Force Push | Niemand kann Geschichte umschreiben |

### Warum wichtig?
- **Produktions-Schutz** - Kein kaputter Code auf main
- **Review-Pflicht** - Vier-Augen-Prinzip
- **Test-Sicherheit** - Nur getesteter Code

---

## 📋 Team-Rollen in Git

### Repository Owner
- Kann alles (löschen, Einstellungen, etc.)
- Verwaltet Zugriffsrechte

### Maintainer
- Kann PRs mergen
- Kann Branches schützen
- Code-Review-Hauptperson

### Contributor
- Kann Branches erstellen
- Kann PRs erstellen
- Braucht Approval zum Mergen

### Viewer (bei privaten Repos)
- Kann nur lesen
- Keine Änderungen

---

## 💬 Kommunikation im Team

### Git ist nicht genug!
Git zeigt WAS, aber nicht WARUM oder WER GERADE WAS MACHT.

### Ergänzende Tools

| Tool | Wofür |
|------|-------|
| Slack/Discord | "Ich arbeite gerade an X" |
| Linear/Jira | Task-Tracking, Wer macht was |
| GitHub Issues | Bug-Reports, Feature-Requests |
| GitHub Projects | Kanban-Board |

### Gute Team-Gewohnheiten

```
✅ "Ich fange jetzt mit Feature X an"
✅ "Kann jemand meinen PR reviewen?"
✅ "Ich merge jetzt - Heads up!"
✅ "Conflict in user.tsx - wer hat das auch geändert?"

❌ Einfach mergen ohne Bescheid
❌ Force-Push ohne Warnung
❌ Große Änderungen ohne Absprache
```

---

## 🔧 Git für Solo-Entwickler mit KI

### Du + Claude Code = Team

Auch als Solo-Entwickler profitierst du von Git-Workflows:

```
┌─────────────────────────────────────────────────────────┐
│  SOLO + KI WORKFLOW                                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Du:          "Mach Feature X"                          │
│               │                                         │
│               ▼                                         │
│  Claude:      Erstellt Branch                           │
│               Implementiert                             │
│               Committed                                 │
│               │                                         │
│               ▼                                         │
│  Du:          Review + Approve                          │
│               │                                         │
│               ▼                                         │
│  Merge:       In main                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Was du mir (Claude) sagen kannst

```
✅ "Erstell einen Branch für Feature X"
✅ "Mach einen PR für diese Änderungen"
✅ "Zeig mir die letzten Commits"
✅ "Merge den Feature-Branch in main"
✅ "Geh zurück zu Commit XYZ"
```

---

## 📚 Weiter lesen
- [06-tools-und-oberflaechen.md](06-tools-und-oberflaechen.md) - GitHub, VS Code, und mehr
