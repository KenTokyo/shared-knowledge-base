# Completed-Task Dokumentation (.completed/)

## Regel

Nach **erfolgreichem Abschluss** einer Aufgabe (Feature, Bugfix, Refactoring, etc.) erstelle eine Dokumentationsdatei im `.completed/` Ordner des Workspace-Roots.

## Wann erstellen?

- Nach Abschluss eines Features, Bugfixes, Refactorings oder anderer abgeschlossener Arbeit
- Auch bei **teilweise erledigten** oder **fehlgeschlagenen** Aufgaben (mit `status: partial` bzw. `status: failed`)
- **Nicht** bei trivialen Aenderungen (Typo-Fix, einzelne Zeile geaendert)

## Ordner

```
<workspace-root>/.completed/
```

Falls der Ordner nicht existiert, erstelle ihn.

## Dateiname

```
<YYYY-MM-DD>_<kurzer-slug>.md
```

Beispiele:
- `2026-03-17_session-tabs-feature.md`
- `2026-03-17_fix-login-redirect.md`
- `2026-03-17_refactor-api-service.md`

## Datei-Format

YAML Frontmatter + Markdown Body:

```markdown
---
title: Session Tabs Feature
description: Multi-Session Tab-Switching mit Status-Indikatoren implementiert
date: 2026-03-17
status: success
effort: M
files:
  - src/pfad/zur/datei1.ts
  - src/pfad/zur/datei2.ts
tags: [feature, ui]
---

## Zusammenfassung

Detaillierte Beschreibung in Markdown.

### Was wurde gemacht
- Punkt 1
- Punkt 2

### Wichtige Entscheidungen
- Warum wurde X so geloest statt Y
```

### YAML-Quoting

Quotes im YAML sind nur bei Sonderzeichen (Doppelpunkt, Klammern, etc.) noetig.

**Ohne Quotes (bevorzugt):**
```yaml
title: Session Tabs Feature
description: Multi-Session Tab-Switching implementiert
```

**Mit Quotes (nur wenn noetig):**
```yaml
title: "Fix: Login Redirect bei OAuth"
description: "Fehler bei (localhost) Redirect behoben"
```

## Felder

| Feld | Pflicht | Beschreibung |
|------|---------|-------------|
| `title` | Ja | Kurzer, beschreibender Titel |
| `description` | Ja | Einzeiler fuer die Vorschau-Ansicht |
| `date` | Ja | ISO-Datum `YYYY-MM-DD` |
| `status` | Ja | `success`, `partial` oder `failed` |
| `effort` | Ja | `S` (trivial, 1 File), `M` (2-5 Files), `L` (5-15 Files, komplex), `XL` (15+ Files, architekturell) |
| `attempt` | Nein | Welcher Versuch (1, 2, 3...). Nur angeben wenn > 1 |
| `provider` | Nein | Welche KI: `claude`, `gemini`, `opencode` |
| `files` | Nein | Liste der bearbeiteten/erstellten Dateien (workspace-relativ) |
| `tags` | Nein | Kategorien als Array |

### Erlaubte Status-Werte

| Status | Beschreibung |
|--------|-------------|
| `success` | Aufgabe vollstaendig abgeschlossen |
| `partial` | Teilweise erledigt, Rest muss noch gemacht werden |
| `failed` | Fehlgeschlagen, dokumentiert warum |

### Effort-Groessen

| Effort | Beschreibung |
|--------|-------------|
| `S` | Trivial, 1 File betroffen |
| `M` | 2-5 Files betroffen |
| `L` | 5-15 Files, komplex |
| `XL` | 15+ Files, architekturell |

### Erlaubte Tags

`feature`, `bugfix`, `refactor`, `docs`, `ui`, `performance`, `security`, `test`, `config`, `cleanup`

### Format-Varianten fuer Arrays

Beide Formate sind erlaubt:

**Inline:**
```yaml
tags: [feature, ui]
files: [src/a.ts, src/b.ts]
```

**YAML-Liste:**
```yaml
tags:
  - feature
  - ui
files:
  - src/a.ts
  - src/b.ts
```

## Body (Markdown nach dem zweiten `---`)

Schreibe eine nuetzliche Zusammenfassung die folgendes enthaelt:
- **Was** wurde gemacht (konkrete Aenderungen)
- **Warum** wurde es so umgesetzt (Entscheidungen, Trade-offs)
- **Hinweise** fuer zukuenftige Arbeit (bekannte Limitierungen, offene Punkte)

## Retries und Learnings

Wenn eine Aufgabe mehrere Versuche braucht, dokumentiere jeden Versuch im Body:

### Format
```markdown
## Attempts

### Attempt 1 (failed)
**Problem:** Beschreibung des Problems
**Learning:** Was man daraus lernt

### Attempt 2 (success)
**Loesung:** Was letztendlich funktioniert hat
```

Setze `attempt` im Frontmatter auf die Gesamtzahl der Versuche.
Setze `status` auf den finalen Status.

## Beispiel: Vollstaendige Datei

```markdown
---
title: Session Tabs Feature
description: Multi-Session Tab-Switching mit Status-Indikatoren implementiert
date: 2026-03-17
status: success
effort: M
provider: claude
files:
  - src/ui/state/session-tabs.ts
  - src/ui/styles/components/tabs.ts
  - src/providers/chat/ChatProviderSessionTabs.ts
tags: [feature, ui]
---

## Zusammenfassung

Tab-Bar im Chat-Header implementiert die es ermoeglicht zwischen mehreren
aktiven Chat-Sessions zu wechseln.

### Was wurde gemacht
- Tab-Bar Komponente mit Session-Indikatoren
- Status-Animationen (running, completed, error)
- Lazy-Loading der Session-Daten beim Tab-Wechsel

### Wichtige Entscheidungen
- CSS-Animationen statt JS fuer Status-Indikatoren (Performance)
- Tab-State wird via Webview State API persistiert
```

## Beispiel: Retry-Datei

```markdown
---
title: Fix WebSocket Reconnect
description: WebSocket-Verbindung reconnected jetzt automatisch nach Timeout
date: 2026-03-18
status: success
effort: S
attempt: 2
provider: claude
files:
  - src/services/WebSocketService.ts
tags: [bugfix]
---

## Zusammenfassung

WebSocket-Verbindung wurde nach Timeout nicht wiederhergestellt.

## Attempts

### Attempt 1 (failed)
**Problem:** Retry-Logic im Event-Handler blockierte den Main-Thread
**Learning:** setTimeout in WebSocket-close-Handler vermeiden, stattdessen exponential backoff mit requestIdleCallback

### Attempt 2 (success)
**Loesung:** Exponential backoff mit requestIdleCallback und max 5 Retries implementiert
```
