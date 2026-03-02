# Prompt: Komponenten-Lokalisierung & Verständlichkeitsprüfung

> **Anwendung:** Kopiere diesen gesamten Prompt und füge die zu prüfende Komponente am Ende ein (Dateipfad oder Code). Der KI-Agent prüft und korrigiert automatisch.

---

## Deine Aufgabe

Du bekommst eine React-Komponente aus einer deutschen Lern-App (NoteDrill) für Schüler der 10./11. Klasse. Deine Aufgabe ist es, **alle user-facing Texte** in dieser Komponente zu prüfen und **direkt zu korrigieren** — nicht nur auflisten.

**Zielgruppe:** Deutsche Schüler, 10./11. Klasse (15–17 Jahre). Keine Programmierkenntnisse. Kein technisches Vorwissen.

---

## Prüfregeln (ALLE anwenden!)

### Regel 1: Sprache = Deutsch

Alle user-facing Texte MÜSSEN auf Deutsch sein. Das betrifft:
- Labels, Headings, Titles
- Beschreibungstexte, Subtitles
- Button-Texte
- Placeholder-Texte
- Tooltips (`title="..."`)
- Toast-Nachrichten (`title:`, `description:`)
- `aria-label` (darf Englisch bleiben für Accessibility, aber prüfen ob sinnvoll)
- Dialog-Titel und -Beschreibungen
- Fehlermeldungen
- Statusanzeigen ("Connected" → "Verbunden")
- Bestätigungsdialoge (Confirm-Texte)
- Leere Zustände / Empty States ("No items found" → "Keine Einträge gefunden")

**NICHT übersetzen:**
- Code-Kommentare (dürfen Englisch bleiben)
- Variablennamen, Funktionsnamen, Prop-Namen
- CSS-Klassennamen
- Import-Pfade
- `console.log` / `console.error` Nachrichten
- Theme-Namen die als Brand-Namen fungieren (z.B. "Ocean", "Forest" — diese sind Stilnamen)

### Regel 2: Umlaute korrekt schreiben

Suche nach falschen Umlaut-Schreibweisen in **Strings** und korrigiere sie:

| FALSCH | RICHTIG |
|--------|---------|
| `ae` | `ä` |
| `oe` | `ö` |
| `ue` | `ü` |
| `Ae` | `Ä` |
| `Oe` | `Ö` |
| `Ue` | `Ü` |
| `ss` (wenn Ersatz für ß) | `ß` |

**Beispiele:**
- `'Ausgewogene Qualitaet'` → `'Ausgewogene Qualität'`
- `'Vollansicht oeffnen'` → `'Vollansicht öffnen'`
- `'aenderbar in Settings'` → `'änderbar in Einstellungen'`
- `'Kurztest fuer Import'` → `'Kurztest für Import'`
- `'Groesse'` → `'Größe'`
- `'Strasse'` → `'Straße'`

**ACHTUNG:** Nicht alle `ue/ae/oe` sind falsche Umlaute! Prüfe den Kontext:
- `"blue"` → NICHT ändern (englisches Wort)
- `"Queue"` → NICHT ändern
- `"linear"` → NICHT ändern (kein Umlaut)
- `"Aenderung"` → `"Änderung"` (deutsches Wort, korrigieren!)

### Regel 3: Verständliche Sprache (10./11. Klasse)

Ersetze technische Begriffe durch verständliche deutsche Alternativen:

| Technisch (VERBOTEN im UI) | Verständlich (RICHTIG) |
|-----------------------------|------------------------|
| API Key | Zugangsschlüssel |
| Provider | Anbieter |
| Configuration / Config | Einstellungen |
| Encryption / encrypted | Verschlüsselt / geschützt |
| Token | Zugangsschlüssel / Sitzung |
| Backend | Server |
| Setup Guide | Einrichtungsanleitung |
| Sync / Syncing | Synchronisieren / Abgleich |
| Cloud Sync | Cloud-Abgleich |
| Export | Exportieren / Herunterladen |
| Import | Importieren / Hochladen |
| Cache | Zwischenspeicher |
| Backup | Sicherungskopie |
| Session | Sitzung |
| Pending | Ausstehend |
| Connected | Verbunden |
| Disconnected | Nicht verbunden |
| Error | Fehler |
| Success | Erfolgreich |
| Cancel | Abbrechen |
| Delete | Löschen |
| Save | Speichern |
| Settings | Einstellungen |
| Performance | Leistung |
| Retry | Erneut versuchen |
| Loading | Wird geladen... |
| Upload / Uploading | Hochladen / Wird hochgeladen... |
| Download | Herunterladen |
| Format | Dateiformat |
| JSON (Full Data) | Vollständige Daten (JSON) |
| CSV (Statistics) | Tabelle (CSV) |
| Placeholder | Platzhalter |
| Tooltip | Hinweis |
| Toggle | Umschalten |
| Dropdown | Auswahl |
| Checkbox | Auswahlfeld |
| Slider | Regler |
| Appearance | Aussehen |
| Light | Hell |
| Dark | Dunkel |
| Color Themes | Farbthemen |
| Member Since | Mitglied seit |
| Account Information | Kontoinformationen |
| Fullscreen | Vollbild |
| Notification | Benachrichtigung |
| Privacy | Datenschutz |
| Security Layer | Sicherheitsebene (oder entfernen) |
| Authentication | Anmeldung |
| Biometric | Biometrisch |
| Threshold | Grenzwert |
| Latency | Verzögerung |
| Fallback | Ersatz-Option (oder entfernen) |
| Deprecated | ENTFERNEN (User darf das nie sehen) |
| Payload | ENTFERNEN |
| Render / Rendering | Anzeige (oder entfernen) |
| Instance | ENTFERNEN |
| Debug | ENTFERNEN (User darf das nie sehen) |
| Parse / Parsing | ENTFERNEN |
| Verbose | ENTFERNEN |
| Callback | ENTFERNEN |
| Endpoint | ENTFERNEN |
| Middleware | ENTFERNEN |
| Schema | ENTFERNEN |
| Mutation | ENTFERNEN |
| Query | Abfrage (oder entfernen) |

**Sonderfall — Technische Begriffe die bleiben dürfen:**
- "FPS" → darf bleiben, aber mit Erklärung: `"FPS (Bilder pro Sekunde)"`
- "GPU" → darf bleiben, aber mit Erklärung: `"GPU (Grafikkarte)"`
- "RAM" → darf bleiben, aber: `"RAM (Arbeitsspeicher)"`
- "Backup" → kann bleiben wenn allgemein bekannt, sonst "Sicherungskopie"
- "App" → darf bleiben (allgemein bekannt)
- "Cloud" → darf bleiben (allgemein bekannt), aber "Cloud Sync" → "Cloud-Abgleich"
- "PDF", "CSV" → darf als Abkürzung bleiben wenn Format gemeint
- "Login" → darf bleiben (allgemein bekannt)
- "Dashboard" → darf bleiben (allgemein bekannt)
- "KI" → darf bleiben (allgemein bekannt)

### Regel 4: Grafik-Effekt-Labels (Spezialfall)

Für die Grafikeinstellungen verwende diese deutschen Labels:

| Englisch | Deutsch |
|----------|---------|
| Backdrop Blur | Hintergrundunschärfe |
| Box Shadow | Schatten |
| Drop Shadow | Leuchteffekte |
| SVG Noise | Körnung / Textur |
| Mix Blend Mode | Farbmischung |
| Gradients | Farbverläufe |
| Text Shadow | Textschatten |
| Glow Effects | Leuchteffekte |
| Blur Effects | Unschärfe-Effekte |

### Regel 5: Konsistente Anrede & Tonalität

- **Duzen** (nicht Siezen): "Passe deine Einstellungen an" statt "Passen Sie Ihre Einstellungen an"
- **Aktive Sprache**: "Speichere deine Notizen" statt "Notizen werden gespeichert"
- **Ermutigend, nicht technisch**: "Alles gespeichert!" statt "Save operation completed successfully"
- **Kurze Button-Texte**: Aktionsbezogen ("Speichern", "Erstellen", "Löschen", "Abbrechen")
- **Einheitliche Begriffe**: Nicht mal "Ordner" und mal "Verzeichnis" — im ganzen UI konsistent bleiben

### Regel 6: Keine abgeschnittenen oder kryptischen Texte

- Statt `"Auth"` → `"Anmeldung"`
- Statt `"Config"` → `"Einstellungen"`
- Statt `"Err"` → `"Fehler"`
- Statt `"N/A"` → `"Nicht verfügbar"` oder `"—"`
- Statt `"Misc"` → `"Sonstiges"`
- Statt `"TBD"` → entfernen oder `"Wird ergänzt"`

### Regel 7: Entwickler-Infos verstecken

Alles was nur für Entwickler relevant ist, DARF NICHT im UI sichtbar sein:

- **Debug-Panels**: Entfernen oder hinter `process.env.NODE_ENV === 'development'` verstecken
- **Technische IDs**: Nie dem User anzeigen (z.B. UUIDs, Datenbank-IDs)
- **API-URLs, Response-Codes**: Nie im UI anzeigen
- **Provider-Namen** (z.B. "Gemini", "OpenAI"): Durch generische Begriffe ersetzen ("KI")
- **Versionsnummern, Build-Infos**: Nur in Dev-Mode anzeigen
- **Technische Fehlermeldungen** → in benutzerfreundliche umwandeln:
  - `"Error 500: Internal Server Error"` → `"Etwas ist schiefgelaufen. Bitte versuche es erneut."`
  - `"SQLITE_CONSTRAINT"` → `"Diese Daten existieren bereits."`
  - `"Network Error"` → `"Keine Internetverbindung. Bitte prüfe dein Netzwerk."`
  - `"Timeout"` → `"Die Anfrage hat zu lange gedauert. Bitte versuche es erneut."`
  - `"Rate limit exceeded"` → `"Zu viele Anfragen. Bitte warte einen Moment."`

---

## Ablauf

1. **Lies die gesamte Komponente durch**
2. **Identifiziere ALLE user-facing Strings** (alles was der Benutzer auf dem Bildschirm sieht)
3. **Prüfe jeden String** gegen alle 7 Regeln
4. **Korrigiere direkt** — ändere die Datei, erkläre kurz was du geändert hast
5. **Fasse zusammen:** Liste alle Änderungen auf mit Vorher/Nachher

---

## Ausgabeformat

Nach der Korrektur, gib eine Zusammenfassung:

```
## Änderungen in [Dateiname]

| # | Zeile | Vorher | Nachher | Regel |
|---|-------|--------|---------|-------|
| 1 | 42 | "Appearance" | "Aussehen" | Regel 1 (Deutsch) |
| 2 | 69 | "Qualitaet" | "Qualität" | Regel 2 (Umlaute) |
| 3 | 103 | "API Key Configuration" | "Zugangsschlüssel verwalten" | Regel 3 (Verständlich) |
| 4 | 155 | "Error 500: ..." | "Etwas ist schiefgelaufen..." | Regel 7 (Dev-Infos) |

Gesamtzahl Änderungen: X
```

---

## WICHTIG: Was du NICHT ändern darfst

- **Variablennamen** (`const apiKey`, `function handleExport`) → NIEMALS übersetzen
- **CSS-Klassen** (`className="..."`) → NIEMALS übersetzen
- **Import/Export Statements** → NIEMALS ändern
- **TypeScript Types/Interfaces** → NIEMALS übersetzen
- **Prop-Namen** (`onClick`, `onOpenChange`) → NIEMALS übersetzen
- **Enum-Werte** die programmatisch verwendet werden → NIEMALS übersetzen
- **`data-*` Attribute** → NIEMALS übersetzen
- **Tailwind-Klassen** → NIEMALS übersetzen
- **Kommentare** → Dürfen Englisch bleiben
- **Logik / Funktionalität** → NUR Texte ändern, keine Logik umbauen

---

## Projekt-Regeln beachten

- Solide Dialog-Hintergründe (Hex-Farben, keine halbtransparenten Backgrounds) — siehe CODING-RULES.md Regel 5.9
- Max 700 Zeilen pro Datei
- Mobile-First Design
- Disabled Buttons brauchen Erklärung warum sie deaktiviert sind

---

## Hier ist die Komponente zum Prüfen:

[KOMPONENTE HIER EINFÜGEN — Dateipfad oder Code]
