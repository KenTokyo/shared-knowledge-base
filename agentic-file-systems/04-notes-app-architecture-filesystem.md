# 📝 Notiz-App Architektur mit Dateisystem

> **Ziel:** Eine konkrete Architektur für eine Notiz-App, die dateibasiert arbeitet und optimal für KI-Agent-Integration geeignet ist.

---

## 📋 Inhaltsverzeichnis

1. [Die Ordnerstruktur](#1-die-ordnerstruktur)
2. [Markdown als Format](#2-markdown-als-format)
3. [Frontmatter für Metadaten](#3-frontmatter-für-metadaten)
4. [Indexierung ohne Datenbank](#4-indexierung-ohne-datenbank)
5. [Suche implementieren](#5-suche-implementieren)
6. [Sync-Strategien](#6-sync-strategien)
7. [React Native Spezifika](#7-react-native-spezifika)
8. [Capacitor Spezifika](#8-capacitor-spezifika)
9. [Watcher für Live-Updates](#9-watcher-für-live-updates)
10. [Vollständiges Architektur-Diagramm](#10-vollständiges-architektur-diagramm)

---

## 1. Die Ordnerstruktur

### Empfohlene Struktur

```
notes-vault/                      # Der "Vault" - ein Ordner = eine Sammlung
│
├── .notes/                       # App-interne Daten (versteckt)
│   ├── config.json               # User-Einstellungen
│   ├── index.json                # Such-Index (Cache)
│   ├── state.json                # UI-State (offene Tabs, etc.)
│   ├── trash/                    # Papierkorb (30 Tage behalten)
│   └── attachments-meta.json     # Attachment-Referenzen
│
├── inbox/                        # Schnelle Notizen (unsortiert)
│   ├── 2024-01-24-gedanke.md
│   └── 2024-01-25-idee.md
│
├── projects/                     # Projektbezogene Notizen
│   ├── projekt-alpha/
│   │   ├── _index.md             # Projekt-Übersicht
│   │   ├── meeting-2024-01-24.md
│   │   └── tasks.md
│   └── projekt-beta/
│       └── research.md
│
├── areas/                        # Lebensbereiche (GTD-Style)
│   ├── health/
│   │   └── fitness-log.md
│   └── finance/
│       └── budget-2024.md
│
├── resources/                    # Referenzmaterial
│   ├── recipes/
│   │   └── pasta-carbonara.md
│   └── checklists/
│       └── travel-packing.md
│
├── archive/                      # Abgeschlossene/alte Notizen
│   └── 2023/
│       └── projekt-gamma/
│
├── templates/                    # Vorlagen für neue Notizen
│   ├── meeting.md
│   ├── daily-journal.md
│   └── project.md
│
└── attachments/                  # Bilder, PDFs, etc.
    ├── images/
    │   └── screenshot-2024-01-24.png
    └── documents/
        └── contract.pdf
```

### Warum diese Struktur?

| Ordner | Zweck | Inspiriert von |
|--------|-------|----------------|
| `inbox/` | Schnell erfassen, später sortieren | GTD (Getting Things Done) |
| `projects/` | Aktive Projekte mit Deadline | PARA Method |
| `areas/` | Laufende Verantwortlichkeiten | PARA Method |
| `resources/` | Referenzmaterial | PARA Method |
| `archive/` | Abgeschlossen | PARA Method |
| `templates/` | Konsistente Notiz-Erstellung | Obsidian |
| `attachments/` | Medien zentral | VS Code |

### Namenskonventionen

```
# Für datierte Notizen
YYYY-MM-DD-titel.md
2024-01-24-meeting-projekt-alpha.md

# Für permanente Notizen
kebab-case-titel.md
pasta-carbonara.md

# Für Index-Dateien
_index.md
_README.md
```

---

## 2. Markdown als Format

### Warum Markdown?

| Vorteil | Beschreibung |
|---------|--------------|
| **Menschenlesbar** | Ohne App lesbar |
| **Zukunftssicher** | Format existiert seit 2004 |
| **Tool-Support** | Jeder Editor kann Markdown |
| **Git-freundlich** | Text-Diff funktioniert perfekt |
| **Konvertierbar** | Export zu HTML, PDF, DOCX trivial |
| **Agent-freundlich** | KI versteht Markdown nativ |

### Unterstützte Markdown-Features

```markdown
# Überschrift 1
## Überschrift 2
### Überschrift 3

**Fett** und *kursiv* und ~~durchgestrichen~~

- Aufzählung
- Mit Unterpunkten
  - So hier

1. Nummerierte
2. Liste

> Blockquote für Zitate

`Inline Code` und

​```javascript
// Code Block
const x = 1;
​```

[Link](https://example.com)
![Bild](./attachments/image.png)

| Tabelle | Header |
|---------|--------|
| Zelle   | Zelle  |

- [ ] Todo unchecked
- [x] Todo checked

---

Horizontale Linie oben

[[wiki-link]] für interne Links (Obsidian-Style)
```

---

## 3. Frontmatter für Metadaten

### Was ist Frontmatter?

YAML-Block am Anfang einer Markdown-Datei:

```markdown
---
title: Meeting Notes - Projekt Alpha
created: 2024-01-24T10:30:00Z
modified: 2024-01-24T14:22:00Z
tags:
  - meeting
  - projekt-alpha
  - q1-2024
status: active
priority: high
due: 2024-02-01
---

# Meeting Notes - Projekt Alpha

Hier beginnt der eigentliche Inhalt...
```

### Standard-Felder

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `title` | string | Anzeigename (falls anders als Dateiname) |
| `created` | ISO 8601 | Erstellungsdatum |
| `modified` | ISO 8601 | Letzte Änderung |
| `tags` | string[] | Kategorisierung |
| `status` | enum | draft, active, archived |
| `priority` | enum | low, medium, high |
| `due` | ISO 8601 | Fälligkeitsdatum |
| `aliases` | string[] | Alternative Titel für Suche |

### Optionale Felder

```yaml
---
# Basis
title: Meine Notiz
created: 2024-01-24T10:30:00Z
modified: 2024-01-24T14:22:00Z
tags: [tag1, tag2]

# Zusätzlich
author: Max Mustermann
source: https://example.com/article
related:
  - andere-notiz.md
  - noch-eine.md
project: projekt-alpha
area: health
type: meeting | journal | reference | task
---
```

### Frontmatter parsen (TypeScript)

```typescript
interface NoteFrontmatter {
  title?: string;
  created: string;
  modified: string;
  tags: string[];
  status?: 'draft' | 'active' | 'archived';
  priority?: 'low' | 'medium' | 'high';
  due?: string;
  [key: string]: unknown; // Erweiterbar
}

interface Note {
  path: string;           // Relativer Pfad
  frontmatter: NoteFrontmatter;
  content: string;        // Markdown ohne Frontmatter
  rawContent: string;     // Komplette Datei
}
```

---

## 4. Indexierung ohne Datenbank

### Der Index als JSON-Datei

`.notes/index.json`:

```json
{
  "version": 1,
  "generated": "2024-01-24T15:00:00Z",
  "notes": [
    {
      "path": "inbox/2024-01-24-gedanke.md",
      "title": "Mein Gedanke",
      "created": "2024-01-24T10:30:00Z",
      "modified": "2024-01-24T10:30:00Z",
      "tags": ["idea"],
      "wordCount": 150,
      "checksum": "abc123"
    },
    {
      "path": "projects/projekt-alpha/meeting-2024-01-24.md",
      "title": "Meeting Notes",
      "created": "2024-01-24T09:00:00Z",
      "modified": "2024-01-24T11:00:00Z",
      "tags": ["meeting", "projekt-alpha"],
      "wordCount": 500,
      "checksum": "def456"
    }
  ],
  "tags": {
    "meeting": 5,
    "projekt-alpha": 12,
    "idea": 3
  },
  "stats": {
    "totalNotes": 150,
    "totalWords": 45000,
    "totalTags": 25
  }
}
```

### Index-Rebuild-Strategie

```typescript
async function rebuildIndex(vaultPath: string): Promise<Index> {
  // 1. Alle .md Dateien finden
  const files = await glob('**/*.md', { cwd: vaultPath });

  // 2. Jede Datei parsen
  const notes = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(path.join(vaultPath, file), 'utf-8');
      const { frontmatter, body } = parseFrontmatter(content);
      const checksum = createHash('md5').update(content).digest('hex').slice(0, 8);

      return {
        path: file,
        title: frontmatter.title || path.basename(file, '.md'),
        created: frontmatter.created,
        modified: frontmatter.modified,
        tags: frontmatter.tags || [],
        wordCount: countWords(body),
        checksum
      };
    })
  );

  // 3. Tags aggregieren
  const tags: Record<string, number> = {};
  notes.forEach(note => {
    note.tags.forEach(tag => {
      tags[tag] = (tags[tag] || 0) + 1;
    });
  });

  // 4. Index speichern
  const index = {
    version: 1,
    generated: new Date().toISOString(),
    notes,
    tags,
    stats: {
      totalNotes: notes.length,
      totalWords: notes.reduce((sum, n) => sum + n.wordCount, 0),
      totalTags: Object.keys(tags).length
    }
  };

  await writeFile(
    path.join(vaultPath, '.notes/index.json'),
    JSON.stringify(index, null, 2)
  );

  return index;
}
```

### Inkrementelles Update

```typescript
async function updateIndex(
  index: Index,
  changedFile: string,
  changeType: 'create' | 'update' | 'delete'
): Promise<Index> {
  switch (changeType) {
    case 'delete':
      index.notes = index.notes.filter(n => n.path !== changedFile);
      break;

    case 'create':
    case 'update':
      // Alten Eintrag entfernen
      index.notes = index.notes.filter(n => n.path !== changedFile);

      // Neuen Eintrag hinzufügen
      const content = await readFile(changedFile, 'utf-8');
      const newEntry = await parseNoteForIndex(changedFile, content);
      index.notes.push(newEntry);
      break;
  }

  // Tags neu berechnen
  index.tags = recalculateTags(index.notes);
  index.generated = new Date().toISOString();

  return index;
}
```

---

## 5. Suche implementieren

### Strategie 1: In-Memory (für <1000 Notizen)

```typescript
class SearchService {
  private index: Index;

  search(query: string): SearchResult[] {
    const terms = query.toLowerCase().split(/\s+/);

    return this.index.notes
      .filter(note => {
        const searchable = `${note.title} ${note.tags.join(' ')}`.toLowerCase();
        return terms.every(term => searchable.includes(term));
      })
      .sort((a, b) =>
        new Date(b.modified).getTime() - new Date(a.modified).getTime()
      );
  }

  searchByTag(tag: string): SearchResult[] {
    return this.index.notes.filter(note => note.tags.includes(tag));
  }

  searchByDateRange(from: Date, to: Date): SearchResult[] {
    return this.index.notes.filter(note => {
      const created = new Date(note.created);
      return created >= from && created <= to;
    });
  }
}
```

### Strategie 2: Volltext-Suche mit SQLite (für >1000 Notizen)

```typescript
// SQLite FTS5 für Volltext-Suche
class FullTextSearchService {
  private db: Database;

  async rebuildFTS() {
    await this.db.exec(`
      DROP TABLE IF EXISTS notes_fts;
      CREATE VIRTUAL TABLE notes_fts USING fts5(
        path,
        title,
        content,
        tags
      );
    `);

    for (const note of this.index.notes) {
      const content = await readFile(note.path, 'utf-8');
      await this.db.run(`
        INSERT INTO notes_fts (path, title, content, tags)
        VALUES (?, ?, ?, ?)
      `, [note.path, note.title, content, note.tags.join(' ')]);
    }
  }

  async search(query: string): Promise<SearchResult[]> {
    return this.db.all(`
      SELECT path, title, snippet(notes_fts, 2, '<mark>', '</mark>', '...', 32) as snippet
      FROM notes_fts
      WHERE notes_fts MATCH ?
      ORDER BY rank
      LIMIT 50
    `, [query]);
  }
}
```

### Strategie 3: Hybrid

```
App-Start:
  1. index.json laden (schnell)
  2. SQLite FTS im Hintergrund aufbauen

Suche:
  - Einfache Suche → In-Memory (index.json)
  - Volltext-Suche → SQLite FTS
```

---

## 6. Sync-Strategien

### Option 1: Git (Empfohlen für Entwickler)

```bash
# Vault ist ein Git-Repo
cd notes-vault
git init

# .gitignore
.notes/index.json    # Cache, nicht committen
.notes/state.json    # Lokaler State
.notes/trash/        # Papierkorb

# Sync
git add -A
git commit -m "Notes update $(date)"
git push origin main
```

**Vorteile:**
- Versionierung inklusive
- Merge-Fähigkeit
- Kostenlos (GitHub, GitLab)
- Offline-fähig

**Nachteile:**
- Technisches Know-how nötig
- Manuelle Commits (oder Auto-Commit)

### Option 2: Cloud-Ordner (iCloud, Dropbox, OneDrive)

```
~/Library/Mobile Documents/iCloud~com~myapp~notes/
```

oder

```
~/Dropbox/Notes/
```

**Vorteile:**
- Automatischer Sync
- Einfach für User
- Plattformübergreifend

**Nachteile:**
- Keine Versionierung
- Sync-Konflikte möglich
- Abhängigkeit von Drittanbieter

### Option 3: Custom Sync (CouchDB/Firebase)

```typescript
interface SyncService {
  push(note: Note): Promise<void>;
  pull(path: string): Promise<Note>;
  resolveConflict(local: Note, remote: Note): Note;
}
```

**Vorteile:**
- Volle Kontrolle
- Echtzeit möglich

**Nachteile:**
- Entwicklungsaufwand
- Server-Kosten

### Konflikt-Handling

```typescript
async function resolveConflict(local: Note, remote: Note): Promise<Note> {
  // Strategie 1: Last-Writer-Wins
  if (new Date(local.modified) > new Date(remote.modified)) {
    return local;
  }
  return remote;

  // Strategie 2: Merge (für Markdown möglich)
  // const merged = threeWayMerge(ancestor, local, remote);

  // Strategie 3: User fragen
  // return await showConflictDialog(local, remote);
}
```

---

## 7. React Native Spezifika

### Filesystem-Zugriff

```typescript
// react-native-fs
import RNFS from 'react-native-fs';

// Basis-Pfade
const documentsPath = RNFS.DocumentDirectoryPath;
const vaultPath = `${documentsPath}/notes-vault`;

// Datei lesen
const content = await RNFS.readFile(`${vaultPath}/inbox/note.md`, 'utf8');

// Datei schreiben
await RNFS.writeFile(`${vaultPath}/inbox/note.md`, content, 'utf8');

// Ordner erstellen
await RNFS.mkdir(`${vaultPath}/projects/new-project`);

// Dateien auflisten
const files = await RNFS.readDir(vaultPath);
```

### Sandboxing

```
iOS:
  /var/mobile/Containers/Data/Application/<UUID>/Documents/
  → Nur dieser Ordner ist beschreibbar
  → Kein Zugriff auf andere Apps

Android:
  /data/data/com.myapp/files/
  → Internal Storage (privat)

  /storage/emulated/0/Documents/MyApp/
  → External Storage (mit Permission)
```

### File Picker für Import

```typescript
// react-native-document-picker
import DocumentPicker from 'react-native-document-picker';

async function importNotes() {
  const results = await DocumentPicker.pick({
    type: [DocumentPicker.types.allFiles],
    allowMultiSelection: true,
  });

  for (const file of results) {
    // Kopiere in Vault
    await RNFS.copyFile(file.uri, `${vaultPath}/inbox/${file.name}`);
  }
}
```

### iCloud-Integration (iOS)

```typescript
// react-native-cloud-store (oder ähnlich)
import CloudStore from 'react-native-cloud-store';

// Vault in iCloud Documents
const iCloudPath = await CloudStore.getDocumentsPath();
const vaultPath = `${iCloudPath}/notes-vault`;

// Automatischer Sync durch iOS
```

---

## 8. Capacitor Spezifika

### Filesystem Plugin

```typescript
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Datei lesen
const contents = await Filesystem.readFile({
  path: 'notes-vault/inbox/note.md',
  directory: Directory.Documents,
  encoding: Encoding.UTF8,
});

// Datei schreiben
await Filesystem.writeFile({
  path: 'notes-vault/inbox/note.md',
  data: content,
  directory: Directory.Documents,
  encoding: Encoding.UTF8,
});

// Ordner erstellen
await Filesystem.mkdir({
  path: 'notes-vault/projects/new-project',
  directory: Directory.Documents,
  recursive: true,
});

// Dateien auflisten
const files = await Filesystem.readdir({
  path: 'notes-vault',
  directory: Directory.Documents,
});
```

### Platform-Unterschiede

| Aspekt | iOS | Android | Web |
|--------|-----|---------|-----|
| Basis-Pfad | `Documents/` | `Documents/` | IndexedDB / OPFS |
| External Access | ❌ Nein | ⚠️ Mit Permission | ❌ Nein |
| iCloud Sync | ✅ Native | ❌ Nein | ❌ Nein |
| File Picker | ✅ Ja | ✅ Ja | ✅ Ja |

### Web-Fallback (OPFS)

```typescript
// Origin Private File System für Web
if (Capacitor.getPlatform() === 'web') {
  const root = await navigator.storage.getDirectory();
  const vaultDir = await root.getDirectoryHandle('notes-vault', { create: true });

  // Datei schreiben
  const fileHandle = await vaultDir.getFileHandle('note.md', { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
}
```

---

## 9. Watcher für Live-Updates

### Warum Watcher?

Wenn Dateien **extern** geändert werden (durch Agent, Sync, anderen Editor), muss die App reagieren.

### React Native Watcher

```typescript
// react-native-fs hat keinen eingebauten Watcher
// Alternative: Polling

class FileWatcher {
  private checksums: Map<string, string> = new Map();
  private interval: NodeJS.Timeout | null = null;

  start(vaultPath: string, onChanges: (changes: FileChange[]) => void) {
    this.interval = setInterval(async () => {
      const changes = await this.detectChanges(vaultPath);
      if (changes.length > 0) {
        onChanges(changes);
      }
    }, 5000); // Alle 5 Sekunden
  }

  private async detectChanges(vaultPath: string): Promise<FileChange[]> {
    const files = await this.getAllFiles(vaultPath);
    const changes: FileChange[] = [];

    for (const file of files) {
      const stat = await RNFS.stat(file);
      const newChecksum = `${stat.mtime}-${stat.size}`;
      const oldChecksum = this.checksums.get(file);

      if (oldChecksum !== newChecksum) {
        changes.push({
          path: file,
          type: oldChecksum ? 'modified' : 'created'
        });
        this.checksums.set(file, newChecksum);
      }
    }

    return changes;
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
```

### Capacitor Watcher (mit Plugin)

```typescript
// capacitor-community/filesystem-watcher (hypothetisch)
import { FilesystemWatcher } from '@capacitor-community/filesystem-watcher';

FilesystemWatcher.watch({
  path: 'notes-vault',
  directory: Directory.Documents,
}).subscribe((event) => {
  console.log('File changed:', event.path, event.type);
  // type: 'create' | 'modify' | 'delete'

  // UI updaten
  refreshNote(event.path);
});
```

### Node.js / Electron Watcher

```typescript
import chokidar from 'chokidar';

const watcher = chokidar.watch(vaultPath, {
  ignored: /(^|[\/\\])\../,  // Versteckte Dateien ignorieren
  persistent: true,
  ignoreInitial: true,
});

watcher
  .on('add', path => handleCreate(path))
  .on('change', path => handleModify(path))
  .on('unlink', path => handleDelete(path));
```

---

## 10. Vollständiges Architektur-Diagramm

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        NOTES APP ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                         UI LAYER                                 │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │   │
│  │  │ Note Editor │  │ Note List   │  │ Search / Filter Panel   │  │   │
│  │  └──────┬──────┘  └──────┬──────┘  └────────────┬────────────┘  │   │
│  └─────────┼────────────────┼──────────────────────┼───────────────┘   │
│            │                │                      │                    │
│            ▼                ▼                      ▼                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      STATE LAYER (Zustand/Redux)                 │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │   │
│  │  │ notes[]     │  │ index       │  │ searchResults[]         │  │   │
│  │  │ activeNote  │  │ tags{}      │  │ filters                 │  │   │
│  │  └──────┬──────┘  └──────┬──────┘  └────────────┬────────────┘  │   │
│  └─────────┼────────────────┼──────────────────────┼───────────────┘   │
│            │                │                      │                    │
│            ▼                ▼                      ▼                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     SERVICE LAYER                                │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │   │
│  │  │ NoteService │  │IndexService │  │SearchService│              │   │
│  │  │ - read()    │  │ - rebuild() │  │ - search()  │              │   │
│  │  │ - write()   │  │ - update()  │  │ - filter()  │              │   │
│  │  │ - delete()  │  │ - load()    │  │             │              │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │   │
│  │         │                │                │                      │   │
│  │         ▼                ▼                ▼                      │   │
│  │  ┌─────────────────────────────────────────────────────────┐    │   │
│  │  │              FileSystemService                          │    │   │
│  │  │  - readFile()  - writeFile()  - watchChanges()          │    │   │
│  │  └────────────────────────┬────────────────────────────────┘    │   │
│  └───────────────────────────┼─────────────────────────────────────┘   │
│                              │                                          │
│                              ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    PLATFORM LAYER                                │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │   │
│  │  │ Capacitor   │  │ React       │  │ Electron                │  │   │
│  │  │ Filesystem  │  │ Native FS   │  │ Node.js fs              │  │   │
│  │  └──────┬──────┘  └──────┬──────┘  └────────────┬────────────┘  │   │
│  └─────────┼────────────────┼──────────────────────┼───────────────┘   │
│            │                │                      │                    │
│            ▼                ▼                      ▼                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     FILE SYSTEM                                  │   │
│  │                                                                  │   │
│  │  notes-vault/                                                    │   │
│  │  ├── .notes/                                                     │   │
│  │  │   ├── config.json                                             │   │
│  │  │   └── index.json                                              │   │
│  │  ├── inbox/                                                      │   │
│  │  ├── projects/                                                   │   │
│  │  └── ...                                                         │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Zusammenfassung

| Komponente | Empfehlung |
|------------|------------|
| **Format** | Markdown mit YAML Frontmatter |
| **Struktur** | PARA-inspiriert (Projects, Areas, Resources, Archive) |
| **Index** | JSON-Datei, beim Start laden, inkrementell updaten |
| **Suche** | In-Memory für <1000 Notizen, SQLite FTS5 für mehr |
| **Sync** | Git (Entwickler) oder Cloud-Ordner (Consumer) |
| **Watcher** | Polling (React Native) oder native Watcher (Electron) |
| **Plattform-Abstraktion** | FileSystemService mit Platform-spezifischer Implementierung |

---

**Nächstes Dokument:** [05-agent-integration-for-notes.md](./05-agent-integration-for-notes.md) - Wie KI-Agents mit dem Notiz-System interagieren
