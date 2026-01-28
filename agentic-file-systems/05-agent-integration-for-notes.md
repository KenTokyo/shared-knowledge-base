# 🤖 Agent-Integration für Notiz-Systeme

> **Ziel:** Verstehen, wie KI-Agents mit einem dateibasierten Notiz-System interagieren können - von der Tool-Definition bis zur praktischen Anwendung.

---

## 📋 Inhaltsverzeichnis

1. [Agent-Tools für Notizen definieren](#1-agent-tools-für-notizen-definieren)
2. [Tool-Implementierungen](#2-tool-implementierungen)
3. [Kontext-Management](#3-kontext-management)
4. [Automatische Aktionen](#4-automatische-aktionen)
5. [Sicherheit & Permissions](#5-sicherheit--permissions)
6. [Praktische Anwendungsfälle](#6-praktische-anwendungsfälle)
7. [Integration in bestehende Apps](#7-integration-in-bestehende-apps)

---

## 1. Agent-Tools für Notizen definieren

### Warum eigene Tools?

Generische Read/Write-Tools funktionieren, aber **spezialisierte Notiz-Tools** sind besser:

| Generisch | Spezialisiert |
|-----------|---------------|
| `Read(path)` | `GetNote(title)` - Findet nach Titel |
| `Write(path, content)` | `CreateNote(title, content, tags)` - Inkl. Frontmatter |
| `Grep(pattern)` | `SearchNotes(query)` - Versteht Frontmatter |

### Die empfohlenen Tools

#### Tool 1: ListNotes

```json
{
  "name": "ListNotes",
  "description": "Listet alle Notizen im Vault auf. Kann nach Ordner, Tags oder Datum gefiltert werden.",
  "parameters": {
    "type": "object",
    "properties": {
      "folder": {
        "type": "string",
        "description": "Optional: Nur Notizen in diesem Ordner (z.B. 'inbox', 'projects/alpha')"
      },
      "tags": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Optional: Nur Notizen mit diesen Tags"
      },
      "limit": {
        "type": "number",
        "description": "Optional: Maximale Anzahl (default: 50)"
      }
    }
  }
}
```

**Beispiel-Aufrufe:**
```
ListNotes()                          → Alle Notizen
ListNotes(folder="inbox")            → Nur Inbox
ListNotes(tags=["meeting"])          → Nur Meeting-Notizen
ListNotes(folder="projects", limit=10)
```

#### Tool 2: GetNote

```json
{
  "name": "GetNote",
  "description": "Liest eine spezifische Notiz. Kann nach Pfad oder Titel suchen.",
  "parameters": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "Pfad zur Notiz (z.B. 'inbox/2024-01-24-idee.md')"
      },
      "title": {
        "type": "string",
        "description": "Alternativ: Titel der Notiz (wird gesucht)"
      }
    }
  }
}
```

**Beispiel-Aufrufe:**
```
GetNote(path="inbox/meeting.md")
GetNote(title="Meeting Notes Januar")
```

#### Tool 3: CreateNote

```json
{
  "name": "CreateNote",
  "description": "Erstellt eine neue Notiz mit Titel, Inhalt und optionalen Metadaten.",
  "parameters": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Titel der Notiz"
      },
      "content": {
        "type": "string",
        "description": "Markdown-Inhalt der Notiz"
      },
      "folder": {
        "type": "string",
        "description": "Optional: Zielordner (default: 'inbox')"
      },
      "tags": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Optional: Tags für die Notiz"
      },
      "template": {
        "type": "string",
        "description": "Optional: Template verwenden (z.B. 'meeting', 'daily')"
      }
    },
    "required": ["title", "content"]
  }
}
```

**Beispiel-Aufrufe:**
```
CreateNote(
  title="Projekt Alpha Meeting",
  content="# Agenda\n\n- Punkt 1\n- Punkt 2",
  folder="projects/alpha",
  tags=["meeting", "alpha"]
)
```

#### Tool 4: UpdateNote

```json
{
  "name": "UpdateNote",
  "description": "Aktualisiert eine bestehende Notiz. Kann den gesamten Inhalt ersetzen oder an bestimmten Stellen einfügen.",
  "parameters": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "Pfad zur Notiz"
      },
      "content": {
        "type": "string",
        "description": "Neuer Inhalt (ersetzt komplett, wenn 'replace' nicht angegeben)"
      },
      "append": {
        "type": "boolean",
        "description": "Wenn true: Content am Ende anhängen statt ersetzen"
      },
      "prepend": {
        "type": "boolean",
        "description": "Wenn true: Content am Anfang einfügen statt ersetzen"
      },
      "updateTags": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Optional: Neue Tags setzen"
      },
      "addTags": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Optional: Tags hinzufügen (ohne bestehende zu entfernen)"
      }
    },
    "required": ["path"]
  }
}
```

**Beispiel-Aufrufe:**
```
UpdateNote(path="inbox/todo.md", content="- Neuer Punkt", append=true)
UpdateNote(path="meeting.md", addTags=["follow-up"])
```

#### Tool 5: SearchNotes

```json
{
  "name": "SearchNotes",
  "description": "Durchsucht alle Notizen nach Inhalt, Titel oder Tags.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Suchbegriff (durchsucht Titel und Inhalt)"
      },
      "inTitle": {
        "type": "boolean",
        "description": "Nur im Titel suchen"
      },
      "inTags": {
        "type": "boolean",
        "description": "Nur in Tags suchen"
      },
      "limit": {
        "type": "number",
        "description": "Max. Ergebnisse (default: 20)"
      }
    },
    "required": ["query"]
  }
}
```

**Beispiel-Aufrufe:**
```
SearchNotes(query="Budget 2024")
SearchNotes(query="meeting", inTags=true)
```

#### Tool 6: DeleteNote

```json
{
  "name": "DeleteNote",
  "description": "Verschiebt eine Notiz in den Papierkorb.",
  "parameters": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "Pfad zur Notiz"
      },
      "permanent": {
        "type": "boolean",
        "description": "Wenn true: Endgültig löschen (default: false = in Trash)"
      }
    },
    "required": ["path"]
  }
}
```

#### Tool 7: MoveNote

```json
{
  "name": "MoveNote",
  "description": "Verschiebt eine Notiz in einen anderen Ordner.",
  "parameters": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "Aktueller Pfad der Notiz"
      },
      "destination": {
        "type": "string",
        "description": "Zielordner (z.B. 'projects/beta')"
      }
    },
    "required": ["path", "destination"]
  }
}
```

---

## 2. Tool-Implementierungen

### TypeScript Service

```typescript
interface NoteToolResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

class NoteAgentService {
  constructor(private vaultPath: string) {}

  // ListNotes
  async listNotes(params: {
    folder?: string;
    tags?: string[];
    limit?: number;
  }): Promise<NoteToolResult> {
    try {
      let notes = await this.loadIndex();

      // Filter by folder
      if (params.folder) {
        notes = notes.filter(n => n.path.startsWith(params.folder + '/'));
      }

      // Filter by tags
      if (params.tags?.length) {
        notes = notes.filter(n =>
          params.tags!.every(tag => n.tags.includes(tag))
        );
      }

      // Limit
      const limit = params.limit || 50;
      notes = notes.slice(0, limit);

      return {
        success: true,
        data: notes.map(n => ({
          path: n.path,
          title: n.title,
          tags: n.tags,
          modified: n.modified
        }))
      };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  // GetNote
  async getNote(params: {
    path?: string;
    title?: string;
  }): Promise<NoteToolResult> {
    try {
      let notePath = params.path;

      // Find by title if no path
      if (!notePath && params.title) {
        const index = await this.loadIndex();
        const found = index.find(n =>
          n.title.toLowerCase().includes(params.title!.toLowerCase())
        );
        if (!found) {
          return { success: false, error: `Notiz mit Titel "${params.title}" nicht gefunden` };
        }
        notePath = found.path;
      }

      const fullPath = path.join(this.vaultPath, notePath!);
      const content = await fs.readFile(fullPath, 'utf-8');
      const { frontmatter, body } = this.parseFrontmatter(content);

      return {
        success: true,
        data: {
          path: notePath,
          frontmatter,
          content: body
        }
      };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  // CreateNote
  async createNote(params: {
    title: string;
    content: string;
    folder?: string;
    tags?: string[];
    template?: string;
  }): Promise<NoteToolResult> {
    try {
      const folder = params.folder || 'inbox';
      const fileName = this.titleToFileName(params.title);
      const notePath = `${folder}/${fileName}.md`;
      const fullPath = path.join(this.vaultPath, notePath);

      // Template laden wenn angegeben
      let content = params.content;
      if (params.template) {
        const templatePath = path.join(this.vaultPath, `templates/${params.template}.md`);
        const templateContent = await fs.readFile(templatePath, 'utf-8');
        content = templateContent.replace('{{content}}', params.content);
      }

      // Frontmatter erstellen
      const now = new Date().toISOString();
      const frontmatter = {
        title: params.title,
        created: now,
        modified: now,
        tags: params.tags || []
      };

      const fullContent = this.createMarkdownWithFrontmatter(frontmatter, content);

      // Ordner erstellen falls nötig
      await fs.mkdir(path.dirname(fullPath), { recursive: true });

      // Datei schreiben
      await fs.writeFile(fullPath, fullContent, 'utf-8');

      // Index updaten
      await this.updateIndex(notePath, 'create');

      return {
        success: true,
        data: { path: notePath, title: params.title }
      };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  // UpdateNote
  async updateNote(params: {
    path: string;
    content?: string;
    append?: boolean;
    prepend?: boolean;
    updateTags?: string[];
    addTags?: string[];
  }): Promise<NoteToolResult> {
    try {
      const fullPath = path.join(this.vaultPath, params.path);
      const existing = await fs.readFile(fullPath, 'utf-8');
      const { frontmatter, body } = this.parseFrontmatter(existing);

      let newBody = body;

      if (params.content) {
        if (params.append) {
          newBody = body + '\n\n' + params.content;
        } else if (params.prepend) {
          newBody = params.content + '\n\n' + body;
        } else {
          newBody = params.content;
        }
      }

      // Tags updaten
      if (params.updateTags) {
        frontmatter.tags = params.updateTags;
      }
      if (params.addTags) {
        frontmatter.tags = [...new Set([...frontmatter.tags, ...params.addTags])];
      }

      frontmatter.modified = new Date().toISOString();

      const fullContent = this.createMarkdownWithFrontmatter(frontmatter, newBody);
      await fs.writeFile(fullPath, fullContent, 'utf-8');

      await this.updateIndex(params.path, 'update');

      return { success: true, data: { path: params.path } };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  // SearchNotes
  async searchNotes(params: {
    query: string;
    inTitle?: boolean;
    inTags?: boolean;
    limit?: number;
  }): Promise<NoteToolResult> {
    try {
      const index = await this.loadIndex();
      const queryLower = params.query.toLowerCase();
      const limit = params.limit || 20;

      let results = index.filter(note => {
        if (params.inTitle) {
          return note.title.toLowerCase().includes(queryLower);
        }
        if (params.inTags) {
          return note.tags.some(tag => tag.toLowerCase().includes(queryLower));
        }
        // Default: Search everywhere (including content if we have it cached)
        return (
          note.title.toLowerCase().includes(queryLower) ||
          note.tags.some(tag => tag.toLowerCase().includes(queryLower))
        );
      });

      // Für Volltext-Suche im Content: Dateien laden
      if (!params.inTitle && !params.inTags) {
        const contentResults = await this.searchInContent(queryLower, limit);
        results = [...results, ...contentResults].slice(0, limit);
      }

      return {
        success: true,
        data: results.slice(0, limit).map(n => ({
          path: n.path,
          title: n.title,
          tags: n.tags,
          snippet: n.snippet
        }))
      };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  // Helper Methods
  private parseFrontmatter(content: string) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
      return { frontmatter: {}, body: content };
    }
    return {
      frontmatter: yaml.parse(match[1]),
      body: match[2].trim()
    };
  }

  private createMarkdownWithFrontmatter(frontmatter: object, body: string): string {
    return `---\n${yaml.stringify(frontmatter)}---\n\n${body}`;
  }

  private titleToFileName(title: string): string {
    const date = new Date().toISOString().split('T')[0];
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9äöüß]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${date}-${slug}`;
  }
}
```

---

## 3. Kontext-Management

### Das Token-Limit-Problem

LLMs haben ein begrenztes Kontext-Fenster (z.B. 200k Tokens bei Claude). Wenn der User 500 Notizen hat, können nicht alle gleichzeitig als Kontext gegeben werden.

### Strategien

#### Strategie 1: On-Demand Loading

```
User: "Was stand im Meeting letzte Woche?"

Agent:
1. SearchNotes(query="meeting", limit=5) → Findet 3 relevante
2. GetNote(path="meeting-2024-01-20.md") → Lädt den relevantesten
3. Antwortet basierend auf dem Inhalt
```

Der Agent lädt nur, was er braucht.

#### Strategie 2: Intelligentes Pre-Loading

```typescript
async function getRelevantContext(userQuery: string): Promise<string[]> {
  // 1. Keywords extrahieren
  const keywords = extractKeywords(userQuery);

  // 2. Relevante Notizen finden
  const results = await searchNotes(keywords.join(' '), { limit: 5 });

  // 3. Token-Budget berechnen
  const maxTokens = 10000; // 10k Tokens für Kontext
  let totalTokens = 0;
  const selectedNotes: string[] = [];

  for (const result of results) {
    const note = await getNote(result.path);
    const noteTokens = estimateTokens(note.content);

    if (totalTokens + noteTokens > maxTokens) break;

    selectedNotes.push(note.content);
    totalTokens += noteTokens;
  }

  return selectedNotes;
}
```

#### Strategie 3: Zusammenfassungs-Layer

```typescript
// Jede Notiz hat eine generierte Zusammenfassung im Index
interface NoteIndexEntry {
  path: string;
  title: string;
  tags: string[];
  summary: string;  // ~50 Wörter
  embedding?: number[];  // Für Semantic Search
}

// Agent sieht erst Zusammenfassungen, dann bei Bedarf vollen Inhalt
```

---

## 4. Automatische Aktionen

### Was Agents automatisch tun können

#### Aktion 1: Meeting-Notizen zusammenfassen

```
Trigger: Neue Notiz mit Tag "meeting"
Agent:
1. GetNote(path) → Liest die Notiz
2. Generiert Zusammenfassung
3. UpdateNote(path, prepend=true, content="## Zusammenfassung\n...")
```

#### Aktion 2: Tasks extrahieren

```
Trigger: Neue Notiz enthält Checkboxen
Agent:
1. GetNote(path) → Liest die Notiz
2. Extrahiert alle [ ] Checkboxen
3. CreateNote(title="Tasks aus Meeting", content="...", tags=["todo"])
```

#### Aktion 3: Verlinkung vorschlagen

```
Trigger: Notiz wird gespeichert
Agent:
1. Analysiert Inhalt
2. SearchNotes(query=relevanteBegriffe)
3. Schlägt Links vor: "Diese Notiz könnte mit 'Projekt Alpha' verlinkt werden"
```

#### Aktion 4: Tägliche Zusammenfassung

```
Trigger: Jeden Abend um 18:00
Agent:
1. ListNotes(tags=["journal"], filter=heute)
2. Fasst alle Einträge zusammen
3. CreateNote(title="Tagesrückblick 2024-01-24", ...)
```

### Implementation

```typescript
interface AutoAction {
  name: string;
  trigger: 'onCreate' | 'onUpdate' | 'onSchedule' | 'onTag';
  condition: (note: Note) => boolean;
  action: (note: Note, agent: NoteAgentService) => Promise<void>;
}

const autoActions: AutoAction[] = [
  {
    name: 'Meeting Summary',
    trigger: 'onCreate',
    condition: (note) => note.tags.includes('meeting'),
    action: async (note, agent) => {
      const summary = await generateSummary(note.content);
      await agent.updateNote({
        path: note.path,
        prepend: true,
        content: `## Zusammenfassung\n\n${summary}\n\n---\n`
      });
    }
  },
  {
    name: 'Extract Tasks',
    trigger: 'onUpdate',
    condition: (note) => note.content.includes('- [ ]'),
    action: async (note, agent) => {
      const tasks = extractTasks(note.content);
      // Nur wenn neue Tasks vorhanden
      if (tasks.newTasks.length > 0) {
        await agent.createNote({
          title: `Tasks aus ${note.title}`,
          content: tasks.newTasks.map(t => `- [ ] ${t}`).join('\n'),
          tags: ['todo', 'extracted']
        });
      }
    }
  }
];
```

---

## 5. Sicherheit & Permissions

### Was der Agent darf

| Aktion | Standard-Permission | Begründung |
|--------|---------------------|------------|
| ListNotes | ✅ Immer erlaubt | Nur Metadaten |
| GetNote | ✅ Immer erlaubt | Lesen ist sicher |
| SearchNotes | ✅ Immer erlaubt | Lesen ist sicher |
| CreateNote | ⚠️ Mit Bestätigung | Erstellt neue Daten |
| UpdateNote | ⚠️ Mit Bestätigung | Ändert bestehende Daten |
| DeleteNote | ❌ Explizite Bestätigung | Destruktiv |
| MoveNote | ⚠️ Mit Bestätigung | Ändert Struktur |

### Permission-System

```typescript
interface AgentPermissions {
  canRead: boolean;      // ListNotes, GetNote, SearchNotes
  canCreate: boolean;    // CreateNote
  canUpdate: boolean;    // UpdateNote
  canDelete: boolean;    // DeleteNote, MoveNote
  autoConfirm: boolean;  // Keine Bestätigung nötig
  allowedFolders: string[] | '*';  // Nur bestimmte Ordner
  blockedFolders: string[];        // Diese Ordner nie
}

const defaultPermissions: AgentPermissions = {
  canRead: true,
  canCreate: true,
  canUpdate: true,
  canDelete: false,      // Muss explizit erlaubt werden
  autoConfirm: false,    // User sieht jede Änderung
  allowedFolders: '*',
  blockedFolders: ['.notes', 'private']
};
```

### Confirmation-Flow

```typescript
async function executeWithConfirmation(
  action: string,
  params: unknown,
  execute: () => Promise<NoteToolResult>
): Promise<NoteToolResult> {
  // Bei autoConfirm: Direkt ausführen
  if (permissions.autoConfirm) {
    return execute();
  }

  // Sonst: User fragen
  const confirmed = await showConfirmDialog({
    title: `Agent möchte: ${action}`,
    description: formatParams(params),
    confirmText: 'Erlauben',
    denyText: 'Ablehnen'
  });

  if (!confirmed) {
    return { success: false, error: 'Vom User abgelehnt' };
  }

  return execute();
}
```

---

## 6. Praktische Anwendungsfälle

### Use Case 1: Brainstorming-Assistent

```
User: "Ich brauche Ideen für meinen Blog-Post über Produktivität"

Agent:
1. SearchNotes(query="produktivität", limit=10)
   → Findet 7 relevante Notizen

2. GetNote(path="ideas/productivity-tips.md")
   → Liest bestehende Ideen

3. Generiert neue Ideen basierend auf:
   - Bestehendem Wissen im Vault
   - Allgemeinem Wissen

4. CreateNote(
     title="Blog-Ideen Produktivität",
     content="# Ideen\n\n1. ...\n2. ...",
     folder="drafts",
     tags=["blog", "draft", "produktivität"]
   )
```

### Use Case 2: Wissensabfrage

```
User: "Was weiß ich über Machine Learning?"

Agent:
1. SearchNotes(query="machine learning")
   → Findet 15 Notizen

2. Liest die Top 5 (nach Relevanz)

3. Fasst zusammen:
   "Du hast 15 Notizen zu ML. Die wichtigsten Themen sind:
   - Neuronale Netze (5 Notizen)
   - Supervised Learning (3 Notizen)
   - Projekte: Bildklassifikation, Chatbot
   Soll ich eine bestimmte Notiz öffnen?"
```

### Use Case 3: Weekly Review Vorbereitung

```
User: "Bereite meinen Weekly Review vor"

Agent:
1. ListNotes(folder="journal", filter=letzte7Tage)
   → 7 Tageseinträge

2. GetNote für jeden Tag

3. ListNotes(tags=["todo"], filter=completed)
   → 12 erledigte Tasks

4. CreateNote(
     title="Weekly Review 2024-W04",
     content="
       # Weekly Review KW4

       ## Highlights
       - Projekt X abgeschlossen
       - Meeting mit Team Y

       ## Erledigte Tasks
       - Task 1
       - Task 2

       ## Offene Punkte
       - ...

       ## Learnings
       - ...
     ",
     folder="reviews",
     tags=["review", "weekly"]
   )
```

### Use Case 4: Intelligente Inbox-Verarbeitung

```
User: "Sortiere meine Inbox"

Agent:
1. ListNotes(folder="inbox")
   → 15 unsortierte Notizen

2. Für jede Notiz:
   a. GetNote(path)
   b. Analysiert Inhalt
   c. Schlägt Zielordner vor

3. Zeigt dem User:
   "Ich schlage vor:
   - 'Meeting Alpha' → projects/alpha/
   - 'Rezept Pasta' → resources/recipes/
   - 'Idee App' → projects/ideas/

   Soll ich verschieben?"

4. Bei Bestätigung:
   MoveNote(path, destination) für jeden
```

---

## 7. Integration in bestehende Apps

### Architektur-Übersicht

```
┌─────────────────────────────────────────────────────────────────┐
│                        NOTES APP                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      UI LAYER                            │   │
│  │  ┌───────────────┐  ┌───────────────┐                   │   │
│  │  │ Notes UI      │  │ Chat/Agent UI │                   │   │
│  │  │ (Editor,List) │  │ (Prompt Input)│                   │   │
│  │  └───────┬───────┘  └───────┬───────┘                   │   │
│  └──────────┼──────────────────┼───────────────────────────┘   │
│             │                  │                                │
│             ▼                  ▼                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   AGENT LAYER                            │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │              AgentOrchestrator                    │  │   │
│  │  │  - Nimmt User-Prompt                              │  │   │
│  │  │  - Sendet an LLM (Claude, GPT, etc.)              │  │   │
│  │  │  - Führt Tool-Aufrufe aus                         │  │   │
│  │  │  - Streamt Antwort zurück                         │  │   │
│  │  └───────────────────────┬───────────────────────────┘  │   │
│  │                          │                               │   │
│  │  ┌───────────────────────▼───────────────────────────┐  │   │
│  │  │              NoteAgentService                     │  │   │
│  │  │  - ListNotes()  - GetNote()   - CreateNote()      │  │   │
│  │  │  - UpdateNote() - SearchNotes() - DeleteNote()    │  │   │
│  │  └───────────────────────┬───────────────────────────┘  │   │
│  └──────────────────────────┼───────────────────────────────┘   │
│                             │                                    │
│                             ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  SERVICE LAYER                           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │ NoteService │  │IndexService │  │PermissionService│  │   │
│  │  └──────┬──────┘  └──────┬──────┘  └────────┬────────┘  │   │
│  └─────────┼────────────────┼──────────────────┼───────────┘   │
│            │                │                  │                │
│            ▼                ▼                  ▼                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   FILE SYSTEM                            │   │
│  │                   notes-vault/                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Minimale Integration

```typescript
// 1. LLM-Client initialisieren
const llmClient = new AnthropicClient({ apiKey: process.env.ANTHROPIC_API_KEY });

// 2. Note-Agent-Service erstellen
const noteAgent = new NoteAgentService(vaultPath);

// 3. Tools registrieren
const tools = [
  createTool('ListNotes', noteAgent.listNotes.bind(noteAgent)),
  createTool('GetNote', noteAgent.getNote.bind(noteAgent)),
  createTool('CreateNote', noteAgent.createNote.bind(noteAgent)),
  createTool('UpdateNote', noteAgent.updateNote.bind(noteAgent)),
  createTool('SearchNotes', noteAgent.searchNotes.bind(noteAgent)),
];

// 4. Chat-Handler
async function handleUserMessage(message: string) {
  const response = await llmClient.chat({
    model: 'claude-3-sonnet-20240229',
    messages: [{ role: 'user', content: message }],
    tools,
    system: `Du bist ein Notiz-Assistent. Du hast Zugriff auf den Notiz-Vault des Users.
             Verwende die verfügbaren Tools um Notizen zu lesen, erstellen und bearbeiten.
             Frage nach, wenn du dir unsicher bist.`
  });

  // Tool-Aufrufe verarbeiten
  while (response.stop_reason === 'tool_use') {
    const toolResults = await executeTools(response.tool_calls);
    response = await llmClient.chat({
      messages: [...messages, { role: 'assistant', content: response.content }, { role: 'tool', content: toolResults }],
      tools
    });
  }

  return response.content;
}
```

---

## 🎯 Zusammenfassung

| Aspekt | Empfehlung |
|--------|------------|
| **Tools** | 7 spezialisierte Tools (List, Get, Create, Update, Search, Delete, Move) |
| **Kontext** | On-Demand Loading + Zusammenfassungs-Layer |
| **Automation** | Trigger-basierte Aktionen (onCreate, onUpdate, onSchedule) |
| **Security** | Gestufte Permissions + Confirmation-Flow |
| **Integration** | Agent-Layer zwischen UI und File-Services |

**Das Wichtigste:**
> Dateibasierte Notizen + spezialisierte Tools = KI-Agent kann wie ein zweites Gehirn arbeiten

---

## 📚 Weiterführende Dokumentation

- [01-how-agentic-systems-work.md](./01-how-agentic-systems-work.md) - Grundlagen
- [02-why-filesystem-over-database.md](./02-why-filesystem-over-database.md) - Warum Dateien?
- [03-how-vscode-stores-data.md](./03-how-vscode-stores-data.md) - VS Code als Vorbild
- [04-notes-app-architecture-filesystem.md](./04-notes-app-architecture-filesystem.md) - Konkrete Architektur
