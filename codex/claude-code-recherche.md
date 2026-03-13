# Claude Code Recherche

## [Ziel] Kurzfassung
Diese Doku erklaert drei Dinge zu Claude Code:

1. wie `Thinking` und `Effort` eingestellt werden
2. was `/clear` fachlich macht
3. was der `New session`-Button in der VS-Code-Extension wahrscheinlich tut

Wichtig:

- Das lokale Repo `claude-code/` enthaelt hier nicht den eigentlichen App- oder Extension-Source
- Es enthaelt vor allem `README`, `CHANGELOG`, `plugins`, `examples` und ein paar Scripts
- Darum trenne ich sauber zwischen:
  - direkt lokal belegt
  - offiziell dokumentiert
  - begruendete Inferenz

## [Stand] Was im lokalen Repo wirklich liegt

Die wichtigsten lokalen Ordner sind:

- `claude-code/README.md`
- `claude-code/CHANGELOG.md`
- `claude-code/plugins/`
- `claude-code/examples/`
- `claude-code/scripts/`

Ich habe in diesem Snapshot keinen normalen App-Quellcode gefunden wie:

- `src/`
- `app/`
- `packages/vscode-extension/`
- `webview/`
- `electron/`

Das bedeutet:

- Das Verhalten von `Thinking` und `/clear` ist hier vor allem ueber Changelog und Plugin-Doku belegbar
- Das Verhalten des `New session`-Buttons ist hier nicht als Source sichtbar
- Dafuer musste ich offizielle Claude-Code-Doku dazu nehmen

Offizielle Doku, die ich mitbenutzt habe:

- `https://docs.anthropic.com/en/docs/claude-code/common-workflows`
- `https://docs.anthropic.com/en/docs/claude-code/interactive-mode`
- `https://docs.anthropic.com/en/docs/claude-code/ide-integrations`

## [Thinking] Effort und Thinking bei Claude Code

## Kurz gesagt
Claude Code trennt zwei Dinge:

1. `Effort`
2. `Thinking budget`

Das ist wichtig, weil beides nicht dasselbe ist.

`Effort` steuert, wie aggressiv Claude Tokens fuer Denken, Antworten und Tool-Aufrufe ausgibt.
`Thinking budget` begrenzt extra Denk-Tokens.

## Lokal belegte Hinweise

### 1. Das Produkt zeigt den aktiven Effort-Level sichtbar an
Im lokalen Changelog steht:

- `claude-code/CHANGELOG.md`
- Eintrag: "Added effort level display (e.g., 'with low effort') to the logo and spinner"

Das passt genau zu deinem Screenshot mit:

- `with high effort`
- `with medium effort`

### 2. Opus 4.6 hat einen Medium-Default
Im lokalen Changelog steht:

- `claude-code/CHANGELOG.md`
- Eintrag: "Opus 4.6 now defaults to medium effort for Max and Team subscribers"
- Eintrag: "You can change this anytime with /model"
- Eintrag: "ultrathink keyword" aktiviert `high effort` fuer den naechsten Turn

Das bedeutet:

- `medium` ist fuer Opus 4.6 offenbar haeufig der Standard
- `/model` ist ein offizieller Weg zum Umstellen
- `ultrathink` ist eine Schnell-Abkuerzung fuer den naechsten Turn

### 3. Lokales API-Referenzmaterial zeigt die eigentliche Form
Im Repo liegt diese Referenz:

- `claude-code/plugins/claude-opus-4-5-migration/skills/claude-opus-4-5-migration/references/effort.md`

Dort steht fachlich:

- `output_config.effort` kennt `high`, `medium`, `low`
- Effort beeinflusst alle Tokens
- Effort ist unabhaengig vom Thinking-Budget

Das ist kein Runtime-Source von Claude Code selbst.
Aber es ist gute, mitgelieferte Referenz-Doku aus dem Repo.

## Offiziell dokumentierte Einstellwege

Aus der offiziellen Claude-Code-Doku:

- `https://docs.anthropic.com/en/docs/claude-code/interactive-mode`
- `https://docs.anthropic.com/en/docs/claude-code/common-workflows`

Dort sind diese Wege dokumentiert:

1. `/model`
2. `CLAUDE_CODE_EFFORT_LEVEL`
3. `settings.json` mit `env`
4. `CLAUDE_CODE_MAX_THINKING_TOKENS`
5. `MAX_THINKING_TOKENS`
6. `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1`

### Was das praktisch bedeutet

| Hebel | Wirkung |
| --- | --- |
| `/model` | interaktive Umstellung von Modell und Effort |
| `CLAUDE_CODE_EFFORT_LEVEL` | globaler Effort-Default fuer die Session oder Umgebung |
| `settings.json -> env` | IDE- oder Projekt-seitige Vorgabe |
| `CLAUDE_CODE_MAX_THINKING_TOKENS` | neuer Name fuer Thinking-Budget |
| `MAX_THINKING_TOKENS` | alter oder kompatibler Name |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` | adaptive Thinking-Logik aus, stattdessen feste Thinking-Grenze |

### Mein fachliches Fazit zu Thinking

- `Effort` = Qualitaets- und Ausgabeniveau
- `Thinking budget` = Obergrenze fuer Thinking-Tokens
- Claude Code scheint beides kombinieren zu koennen
- `high effort` bedeutet also nicht automatisch "unbegrenzt denken"

## [Clear] Was `/clear` macht

## Sicher belegt
Dein Screenshot zeigt bereits die eingebaute Kurzbeschreibung:

```text
/clear = Clear conversation history and free up context
/compact = Clear conversation history but keep a summary in context
```

Das ist die wichtigste Produktregel:

- `/clear` = Verlauf weg, freier Kontext
- `/compact` = Verlauf weitgehend weg, aber Zusammenfassung bleibt im Kontext

## Lokal belegte Folgewirkungen aus dem Changelog

Im lokalen Changelog gibt es mehrere Fixes zu `/clear`:

- `claude-code/CHANGELOG.md`
- "Fixed /clear not fully clearing all session caches"
- "Fixed /clear not resetting cached skills"
- "Fixed session name persisting in status bar after /clear"
- "Fixed plan files persisting across /clear commands"
- "Fixed transcript path after /clear"

Das ist sehr aufschlussreich.
Es zeigt, dass `/clear` intern nicht nur den sichtbaren Chat leert.
Es greift offenbar auch in mehrere Session-Zustaende ein.

### Daraus kann man belastbar ableiten

`/clear` macht wahrscheinlich mindestens diese Dinge:

1. aktive Conversation-History zuruecksetzen
2. Session-Caches leeren
3. Skill-Caches zuruecksetzen
4. Plan-Datei oder Plan-Zustand erneuern
5. Session-Titel oder UI-Titel zuruecksetzen
6. Transcript-Bezug fuer Hooks neu verdrahten

## Was `/clear` wahrscheinlich nicht macht

Es gibt im lokalen Material keinen Hinweis darauf, dass `/clear`:

- eine neue App-Instanz startet
- ein neues Terminal oeffnet
- einen neuen globalen Account-Login erzwingt

Der Befehl wirkt eher wie:

- "reset current conversation state"

und nicht wie:

- "launch completely new process container"

## Unterschied zu `/compact`

Das ist der wichtigste Unterschied:

| Befehl | Wirkung |
| --- | --- |
| `/clear` | aktueller Verlauf weg, Kontext frei |
| `/compact` | Verlauf reduziert, aber Summary bleibt als Arbeitsgedaechtnis erhalten |

Wenn du also in deiner eigenen Extension Claude-Code-aehnliches Verhalten nachbauen willst:

- `/clear` ist ein harter Reset fuer die aktuelle Unterhaltung
- `/compact` ist ein weicher Reset mit Zusammenfassung

## [VS Code] Was der `New session`-Button wahrscheinlich macht

## Das grosse Problem zuerst
Im lokalen `claude-code/`-Repo liegt der eigentliche VS-Code-Extension-Source hier nicht sichtbar vor.
Ich konnte also keinen echten Button-Handler lesen wie:

- `onNewSessionClick()`
- `createNewSessionTab()`
- `spawnTerminalForNewSession()`

Darum ist diese Sektion eine Mischung aus:

- offizieller Doku
- lokalem Changelog
- begruendeter Inferenz

## Offiziell dokumentierte Fakten

Aus der offiziellen IDE-Doku:

- Claude Code gibt es als native grafische IDE-Oberflaeche
- die Extension hat Conversation History
- man kann mehrere Gesprache in separaten Tabs oder Fenstern offen haben
- die Extension und das CLI teilen sich dieselbe Conversation History
- in VS Code kann man lokal und remote Sessions durchsuchen und fortsetzen

Wichtige Seiten:

- `https://docs.anthropic.com/en/docs/claude-code/ide-integrations`
- `https://docs.anthropic.com/en/docs/claude-code/common-workflows`

## Lokal belegte Hinweise aus dem Changelog

Diese Eintraege sind besonders wichtig:

- `claude-code/CHANGELOG.md`
- "VSCode: Added session rename and remove actions to the sessions list"
- "VSCode: Added support for remote sessions, allowing OAuth users to browse and resume sessions from claude.ai"
- "VSCode: Added git branch and message count to the session picker"
- "VSCode: Added ability for OAuth users to browse and resume remote Claude sessions from the Sessions dialog"

Das zeigt klar:

- Die Extension arbeitet mit Session-Objekten
- Es gibt eine Session-Liste oder einen Session-Picker
- Sessions koennen lokal und remote existieren
- Sessions sind wiederaufnahmefaehig

## Meine belastbare Inferenz zum `New session`-Button

Der Button macht sehr wahrscheinlich **nicht** einfach nur:

- "oeffne ein neues Terminal"

Warum ich das so bewerte:

1. Die offizielle Doku spricht von nativer grafischer IDE-Oberflaeche, Session-History und mehreren Gespraechen in Tabs oder Fenstern
2. Das lokale Changelog spricht von Session-Liste, Session-Picker, Resume, Rename und Remove
3. Das klingt nach einer echten Session-Schicht, nicht nur nach einem Terminal-Launcher

### Deshalb ist die wahrscheinlichste technische Bedeutung:

Der `New session`-Button erstellt wahrscheinlich:

- eine neue Claude-Code-Konversation in der Extension
- mit eigener History
- mit eigenem UI-Kontext
- eventuell mit eigener zugeordneter CLI- oder Backend-Session im Hintergrund

Nicht die wahrscheinlichste Lesart:

- "oeffne einfach ein weiteres VS-Code-Terminal und starte dort blind `claude`"

## Ist das thread-basiert

Im Claude-Code-Material sehe ich im Gegensatz zu Codex nicht den klaren offenen Begriff `ThreadId` im lokalen Repo.
Die sichtbare Produktsprache ist hier eher:

- session
- conversation
- resume
- history

Darum ist die sauberste Aussage:

- Fuer Claude Code solltest du hier eher in `sessions` oder `conversations` denken
- nicht in dem klar offengelegten `thread`-Modell wie bei Codex

## Wahrscheinlichstes Modell hinter dem Button

```text
New session
  -> neue Conversation / Session im GUI
  -> neuer leerer Verlauf
  -> eigener History-Eintrag
  -> spaeter ueber Session-Picker wieder aufnehmbar
```

Und nur wenn der Nutzer den "Use Terminal"-Modus bevorzugt, kann die Darstellung eher terminalnah werden.
Die offizielle IDE-Doku beschreibt genau diese Trennung:

- GUI-Interface als Standard
- Terminal-Nutzung als alternative Arbeitsweise

## [Pfade] Was ich lokal zu Datenpfaden belegen konnte

## Direkt sichtbar im lokalen Material

| Pfad | Bedeutung | Quelle |
| --- | --- | --- |
| `~/.claude.json` | zentrale Nutzer-Konfig | `claude-code/CHANGELOG.md` |
| `~/.claude/backups/` | Config-Backups | `claude-code/CHANGELOG.md` |
| `~/.claude/commands/` | persoenliche Slash Commands | `claude-code/plugins/plugin-dev/skills/command-development/README.md` |
| `.claude/commands/` | Projekt-Commands | `claude-code/plugins/plugin-dev/skills/command-development/README.md` |
| `~/.claude/agents/` | persoenliche Agents | `claude-code/plugins/pr-review-toolkit/README.md` |
| `~/.claude/skills` | Skills-Hot-Reload wird darauf bezogen | `claude-code/CHANGELOG.md` |

## Transcript-Pfad
Das lokale Hook-Material zeigt, dass Hooks einen `transcript_path` bekommen.

Pfad:

- `claude-code/plugins/plugin-dev/skills/hook-development/SKILL.md`

Dort wird ein JSON-Beispiel mit diesen Feldern gezeigt:

- `session_id`
- `transcript_path`
- `cwd`
- `permission_mode`

Wichtig:

- Die Existenz von `transcript_path` ist belegt
- Der exakte interne Speicherort der Session-Transkripte ist in diesem lokalen Repo-Snapshot aber nicht offen gelegt

## [Sicherheit] Was ich sicher weiss und was nicht

## Sicher belegt

- `Effort` kennt `low`, `medium`, `high`
- `medium effort` ist fuer Opus 4.6 in bestimmten Plaenen Standard
- `/model` kann den Effort umstellen
- `ultrathink` schaltet fuer den naechsten Turn auf hohen Effort
- `/clear` ist mehr als nur UI leeren, weil es mehrere Session-Caches und Folgezustaende zuruecksetzt
- Die VS-Code-Extension arbeitet mit echter Session-History, Resume und mehreren Gespraechen

## Nicht direkt im lokalen Code beweisbar

- der exakte Source-Handler des `New session`-Buttons
- ob intern nur ein neuer Prozess, ein neues Terminal oder eine neue Session-ID erzeugt wird
- die exakte Runtime-Implementierung von `/clear`

## Meine beste technische Bewertung

- `Thinking` bei Claude Code ist eine Kombination aus `Effort` und Thinking-Budget
- `/clear` ist ein harter Reset der aktuellen Unterhaltung plus Session-bezogene Caches
- der `New session`-Button erstellt sehr wahrscheinlich eine neue GUI-Session oder Conversation und nicht nur stumpf ein neues Terminal

## [Belege] Schnellste Dateien zum Nachlesen

Wenn du nur die wichtigsten Quellen oeffnen willst, nimm diese:

- `claude-code/CHANGELOG.md`
- `claude-code/plugins/claude-opus-4-5-migration/skills/claude-opus-4-5-migration/references/effort.md`
- `claude-code/plugins/plugin-dev/skills/hook-development/SKILL.md`
- `claude-code/plugins/plugin-dev/skills/command-development/README.md`
- `https://docs.anthropic.com/en/docs/claude-code/interactive-mode`
- `https://docs.anthropic.com/en/docs/claude-code/common-workflows`
- `https://docs.anthropic.com/en/docs/claude-code/ide-integrations`

## [Fazit] Was du fuer deinen Nachbau mitnehmen solltest

Wenn du Claude-Code-aehnliches Verhalten nachbauen willst, dann sind diese Regeln sinnvoll:

1. Session statt Thread als Hauptbegriff verwenden
2. `Effort` und `Thinking budget` getrennt behandeln
3. `/clear` als echten Session-Reset bauen
4. `/compact` als weichere Variante mit Summary bauen
5. `New session` als neue Conversation in der GUI denken, nicht nur als neues Terminal

Der wichtigste Unterschied zu Codex ist hier:

- Codex legt sein Thread-Modell im Code sehr offen
- Claude Code zeigt in diesem lokalen Snapshot eher Produktflaechen, Changelog und Plugin-System

Darum ist fuer Claude Code diese Lesart am saubersten:

```text
Codex      -> offen sichtbares Thread-Modell im Code
Claude Code -> offen sichtbares Session-/Conversation-Modell in Produktflaeche und Doku
```
