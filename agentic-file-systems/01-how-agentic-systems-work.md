# 🤖 Wie Agentic Systems funktionieren

> **Ziel:** Verstehen, wie KI-Agenten wie Claude Code mit dem Dateisystem interagieren und Aufgaben autonom ausführen.

---

## 📋 Inhaltsverzeichnis

1. [Was ist ein Agentic System?](#1-was-ist-ein-agentic-system)
2. [Der Tool-basierte Ansatz](#2-der-tool-basierte-ansatz)
3. [Der Agentic Loop](#3-der-agentic-loop)
4. [Wie der LLM Tools auswählt](#4-wie-der-llm-tools-auswählt)
5. [Das Permission-System](#5-das-permission-system)
6. [Beispiel-Flows](#6-beispiel-flows)
7. [System-Prompt Architektur](#7-system-prompt-architektur)

---

## 1. Was ist ein Agentic System?

### Definition

Ein **Agentic System** ist eine KI, die nicht nur antwortet, sondern **aktiv handelt**. Der Unterschied zu einem einfachen Chatbot:

| Aspekt | Einfacher Chatbot | Agentic System |
|--------|-------------------|----------------|
| **Output** | Nur Text | Text + Aktionen |
| **Fähigkeiten** | Antworten generieren | Dateien lesen/schreiben, Commands ausführen |
| **Autonomie** | Keine | Kann selbstständig Schritte planen |
| **Feedback-Loop** | Einmalig | Iterativ (Tool → Ergebnis → Nächster Schritt) |

### Kernprinzip

```
User gibt Ziel → Agent plant Schritte → Agent führt Tools aus → Agent bewertet Ergebnis → Repeat bis Ziel erreicht
```

Der Agent ist **nicht** vorprogrammiert, welche Schritte er machen soll. Er **entscheidet** basierend auf:
- Dem User-Prompt
- Den verfügbaren Tools
- Den Ergebnissen vorheriger Tool-Aufrufe

---

## 2. Der Tool-basierte Ansatz

### Was sind Tools?

Tools sind **strukturierte Funktionen**, die der Agent aufrufen kann. Jedes Tool hat:
- **Name:** Eindeutiger Identifier (z.B. `Read`, `Write`, `Edit`)
- **Description:** Was das Tool macht (für den LLM zur Auswahl)
- **Parameters:** Welche Eingaben das Tool braucht (JSON Schema)
- **Implementation:** Der tatsächliche Code, der ausgeführt wird

### Die Core-Tools von Claude Code

#### 📖 Read - Dateien lesen

```
Zweck: Liest den Inhalt einer Datei
Parameter:
  - file_path: Absoluter Pfad zur Datei
  - offset: (optional) Ab welcher Zeile lesen
  - limit: (optional) Wie viele Zeilen lesen
```

**Wann wird es verwendet?**
- Bevor Änderungen gemacht werden (Kontext verstehen)
- Um bestehenden Code zu analysieren
- Um Konfigurationsdateien zu prüfen

#### ✏️ Write - Dateien erstellen/überschreiben

```
Zweck: Erstellt eine neue Datei oder überschreibt eine bestehende
Parameter:
  - file_path: Absoluter Pfad zur Datei
  - content: Der komplette Inhalt der Datei
```

**Wann wird es verwendet?**
- Neue Dateien erstellen
- Komplette Datei neu schreiben (bei großen Änderungen)

#### 🔧 Edit - Präzise Ersetzungen

```
Zweck: Ersetzt einen spezifischen Text-Abschnitt in einer Datei
Parameter:
  - file_path: Absoluter Pfad zur Datei
  - old_string: Der zu ersetzende Text (muss eindeutig sein!)
  - new_string: Der neue Text
  - replace_all: (optional) Alle Vorkommen ersetzen?
```

**Wann wird es verwendet?**
- Kleine, präzise Änderungen
- Refactoring (Variablen umbenennen)
- Bugs fixen

**Wichtig:** `old_string` muss **eindeutig** in der Datei sein, sonst schlägt das Tool fehl.

#### 🔍 Glob - Dateien finden (Pattern)

```
Zweck: Findet Dateien basierend auf Glob-Pattern
Parameter:
  - pattern: Das Suchmuster (z.B. "**/*.ts", "src/**/*.tsx")
  - path: (optional) Startverzeichnis
```

**Wann wird es verwendet?**
- Alle TypeScript-Dateien finden
- Projektstruktur verstehen
- Dateien in bestimmten Ordnern auflisten

#### 🔎 Grep - In Dateien suchen

```
Zweck: Sucht nach Text/Regex in Dateien
Parameter:
  - pattern: Suchmuster (Regex unterstützt)
  - path: Verzeichnis zum Durchsuchen
  - glob: (optional) Nur in bestimmten Dateitypen
  - output_mode: "content" | "files_with_matches" | "count"
```

**Wann wird es verwendet?**
- Funktionen/Klassen finden
- Imports aufspüren
- TODOs oder FIXMEs suchen

#### 💻 Bash - Shell-Commands ausführen

```
Zweck: Führt Bash/Shell-Befehle aus
Parameter:
  - command: Der auszuführende Befehl
  - timeout: (optional) Maximale Laufzeit
  - description: Beschreibung was der Befehl macht
```

**Wann wird es verwendet?**
- Git-Operationen (status, commit, push)
- npm/yarn Befehle
- Tests ausführen
- Build-Prozesse starten

**Sicherheit:** Besonders sensibles Tool - braucht oft explizite Bestätigung.

#### ❓ AskUserQuestion - User fragen

```
Zweck: Stellt dem User eine Frage mit Auswahloptionen
Parameter:
  - questions: Array von Fragen mit Optionen
```

**Wann wird es verwendet?**
- Bei Unklarheiten im Auftrag
- Entscheidungen, die der User treffen muss
- Bestätigungen vor kritischen Aktionen

#### 📋 TodoWrite - Aufgaben tracken

```
Zweck: Erstellt/aktualisiert eine Todo-Liste
Parameter:
  - todos: Array von Tasks mit Status (pending/in_progress/completed)
```

**Wann wird es verwendet?**
- Bei komplexen, mehrstufigen Aufgaben
- Um den Fortschritt sichtbar zu machen
- Zur Selbstorganisation des Agents

---

## 3. Der Agentic Loop

### Der grundlegende Ablauf

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────┐    ┌─────────────┐    ┌──────────────────┐    │
│  │  User   │───>│   Prompt    │───>│  LLM analysiert  │    │
│  │  Input  │    │  + Context  │    │  & plant         │    │
│  └─────────┘    └─────────────┘    └────────┬─────────┘    │
│                                              │              │
│                                              ▼              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Tool-Auswahl & Ausführung              │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐  │   │
│  │  │  Read   │  │  Edit   │  │  Bash   │  │  ...   │  │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └───┬────┘  │   │
│  └───────┼────────────┼────────────┼───────────┼───────┘   │
│          │            │            │           │           │
│          └────────────┴─────┬──────┴───────────┘           │
│                             │                              │
│                             ▼                              │
│                    ┌────────────────┐                      │
│                    │ Tool-Ergebnis  │                      │
│                    └───────┬────────┘                      │
│                            │                               │
│                            ▼                               │
│                 ┌─────────────────────┐                    │
│                 │  LLM bewertet:      │                    │
│                 │  - Ziel erreicht?   │──── JA ──> Antwort │
│                 │  - Nächster Schritt?│                    │
│                 └──────────┬──────────┘                    │
│                            │ NEIN                          │
│                            │                               │
│                            └──────────────┐                │
│                                           │                │
│                            ┌──────────────┘                │
│                            │                               │
│                            ▼                               │
│              (Zurück zu Tool-Auswahl)                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ein konkretes Beispiel

**User-Prompt:** "Füge eine Logger-Funktion zu utils.ts hinzu"

**Schritt 1:** LLM analysiert
- "Ich muss utils.ts erst lesen, um den aktuellen Inhalt zu verstehen"
- Entscheidung: `Read` Tool verwenden

**Schritt 2:** Tool-Aufruf
```
Read(file_path="src/utils.ts")
```

**Schritt 3:** Ergebnis
```typescript
export function formatDate(date: Date): string {
  return date.toISOString();
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

**Schritt 4:** LLM bewertet
- "Ich habe den Inhalt. Jetzt muss ich die Logger-Funktion hinzufügen"
- "Ich verwende Edit, um am Ende die Funktion hinzuzufügen"

**Schritt 5:** Tool-Aufruf
```
Edit(
  file_path="src/utils.ts",
  old_string="export function capitalize(str: string): string {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}",
  new_string="export function capitalize(str: string): string {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}\n\nexport function log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {\n  const timestamp = new Date().toISOString();\n  console[level](`[${timestamp}] ${message}`);\n}"
)
```

**Schritt 6:** Ergebnis
- Tool meldet: "Datei erfolgreich bearbeitet"

**Schritt 7:** LLM bewertet
- "Ziel erreicht! Die Logger-Funktion wurde hinzugefügt."
- Generiert Antwort für User

**Finale Antwort:**
> "Ich habe eine `log`-Funktion zu `src/utils.ts` hinzugefügt. Sie akzeptiert eine Message und optional ein Log-Level (info/warn/error)."

---

## 4. Wie der LLM Tools auswählt

### Tool-Descriptions im System-Prompt

Jedes Tool wird dem LLM mit einer **Beschreibung** präsentiert:

```json
{
  "name": "Read",
  "description": "Reads a file from the local filesystem. Use this to understand existing code before making changes.",
  "parameters": {
    "type": "object",
    "properties": {
      "file_path": {
        "type": "string",
        "description": "The absolute path to the file to read"
      }
    },
    "required": ["file_path"]
  }
}
```

### Entscheidungsfaktoren

Der LLM wählt Tools basierend auf:

1. **Keyword-Matching:**
   - "Lies die Datei" → Read
   - "Ändere..." → Edit
   - "Erstelle neue Datei" → Write
   - "Finde alle..." → Glob/Grep

2. **Kontext:**
   - Wenn der Inhalt einer Datei unbekannt ist → Erst Read
   - Wenn kleine Änderung → Edit
   - Wenn komplette Neuerstellung → Write

3. **Vorherige Ergebnisse:**
   - Read zeigte leere Datei → Write statt Edit
   - Grep fand keine Matches → Andere Strategie

4. **Best Practices im Training:**
   - "Nie Code ändern ohne erst zu lesen"
   - "Bei großen Änderungen lieber Write als viele Edits"

### Parallele Tool-Aufrufe

Wenn Tools **unabhängig** sind, können sie parallel aufgerufen werden:

```
User: "Zeige mir package.json und tsconfig.json"

→ Parallel:
  - Read(file_path="package.json")
  - Read(file_path="tsconfig.json")
```

Bei **Abhängigkeiten** muss sequentiell gearbeitet werden:

```
User: "Finde alle .ts Dateien und lies die erste"

→ Sequentiell:
  1. Glob(pattern="**/*.ts") → Ergebnis: ["src/index.ts", "src/utils.ts"]
  2. Read(file_path="src/index.ts")
```

---

## 5. Das Permission-System

### Warum Permissions?

Agents haben potenziell **gefährliche Fähigkeiten:**
- Dateien löschen
- Code ausführen
- Git Push zu Remote

Deshalb gibt es ein **gestuftes Permission-System.**

### Permission-Kategorien

| Kategorie | Beispiel-Tools | Default |
|-----------|---------------|---------|
| **Lesen** | Read, Glob, Grep | ✅ Erlaubt |
| **Schreiben** | Write, Edit | ⚠️ Nachfragen |
| **Ausführen** | Bash | ⚠️ Nachfragen |
| **Kritisch** | git push, rm -rf | ❌ Explizite Bestätigung |

### YOLO-Mode vs. Safe-Mode

**Safe-Mode (Default):**
- Jede schreibende/ausführende Aktion wird bestätigt
- User sieht genau, was passieren wird

**YOLO-Mode:**
- Automatische Bestätigung für die meisten Aktionen
- Nur bei kritischen Aktionen (push, delete) wird gefragt
- Für erfahrene User, die schnell arbeiten wollen

### Allow-Lists

User können bestimmte Aktionen **dauerhaft erlauben:**

```
"Erlaube alle npm-Befehle"
→ npm install, npm run, npm test werden nicht mehr gefragt

"Erlaube Schreiben in src/"
→ Write/Edit in src/ braucht keine Bestätigung
```

---

## 6. Beispiel-Flows

### Flow 1: Bug fixen

```
User: "Die formatDate-Funktion in utils.ts gibt das falsche Format zurück. Sie soll DD.MM.YYYY zurückgeben."

Agent-Schritte:
1. Read(src/utils.ts) → Sieht aktuellen Code
2. Edit(old_string="return date.toISOString()", new_string="return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`")
3. Antwort: "Ich habe formatDate angepasst. Sie gibt jetzt DD.MM.YYYY zurück."
```

### Flow 2: Neues Feature implementieren

```
User: "Erstelle einen neuen API-Endpoint für User-Profile"

Agent-Schritte:
1. Glob(pattern="src/api/**/*.ts") → Findet bestehende Endpoints
2. Read(src/api/users.ts) → Versteht die Struktur
3. Write(src/api/profiles.ts, content="...") → Erstellt neue Datei
4. Edit(src/api/index.ts, ...) → Registriert neuen Endpoint
5. Bash(command="npx tsc --noEmit") → Prüft TypeScript
6. Antwort: "Neuer Endpoint /api/profiles erstellt mit GET und PUT."
```

### Flow 3: Refactoring

```
User: "Benenne die Variable 'usr' zu 'user' um in allen Dateien"

Agent-Schritte:
1. Grep(pattern="\\busr\\b", path="src/") → Findet alle Vorkommen
2. Für jede Datei: Read → Edit (usr → user)
3. Bash(command="npx tsc --noEmit") → Prüft, ob alles noch kompiliert
4. Antwort: "Variable 'usr' wurde in 12 Dateien zu 'user' umbenannt."
```

---

## 7. System-Prompt Architektur

### Was steht im System-Prompt?

Der System-Prompt eines Agentic Systems enthält:

1. **Rollen-Definition:**
   ```
   Du bist ein Software-Entwickler-Assistent, der Code schreiben und bearbeiten kann.
   ```

2. **Tool-Beschreibungen:**
   ```json
   [
     { "name": "Read", "description": "...", "parameters": {...} },
     { "name": "Write", "description": "...", "parameters": {...} },
     ...
   ]
   ```

3. **Verhaltensregeln:**
   ```
   - IMMER erst lesen, bevor du Änderungen machst
   - Bei Unklarheiten: Nachfragen, nicht raten
   - Nach Änderungen: TypeScript-Check ausführen
   ```

4. **Kontext:**
   ```
   Aktuelles Verzeichnis: /Users/project/
   Git-Status: main branch, 2 uncommitted changes
   ```

5. **Conversation History:**
   ```
   User: "Erstelle eine Button-Komponente"
   Assistant: [Read tool] → [Write tool] → "Button erstellt"
   User: "Füge onClick hinzu"
   ...
   ```

### Kontext-Fenster Management

LLMs haben ein **begrenztes Kontext-Fenster** (z.B. 200k Tokens). Strategien:

1. **Zusammenfassung:** Alte Nachrichten werden zusammengefasst
2. **Relevanz-Filter:** Nur relevante Tool-Ergebnisse behalten
3. **Lazy Loading:** Dateien nur bei Bedarf lesen, nicht präventiv

---

## 🎯 Zusammenfassung

| Aspekt | Beschreibung |
|--------|--------------|
| **Agentic System** | KI, die nicht nur antwortet, sondern handelt |
| **Tools** | Strukturierte Funktionen (Read, Write, Edit, Bash, ...) |
| **Agentic Loop** | Prompt → Tool → Ergebnis → Bewertung → Repeat |
| **Tool-Auswahl** | LLM entscheidet basierend auf Prompt & Kontext |
| **Permissions** | Gestuftes System für Sicherheit |
| **System-Prompt** | Enthält Tools, Regeln, Kontext |

---

**Nächstes Dokument:** [02-why-filesystem-over-database.md](./02-why-filesystem-over-database.md) - Warum Dateisystem statt Datenbank?
