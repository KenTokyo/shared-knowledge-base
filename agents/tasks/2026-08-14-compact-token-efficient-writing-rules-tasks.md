# Kompakte, token-effiziente Schreibregeln

## Initial goal

- Prompt: [2026-08-14-compact-token-efficient-writing-rules-prompt.md](2026-08-14-compact-token-efficient-writing-rules-prompt.md)
- Ziel: Schreibregeln ganz oben verankern; Tipps, Regeln, Learnings und Zusammenfassungen auf minimale, stichpunktartige Form begrenzen; Paarregeln von Fülltext und unnötigen Artikeln befreien.

## Phasen

### ✅ Phase 1 — Regeln und Änderungsgrenze

**Ziel:** Pflichtquellen lesen; kleinsten vollständigen Dokuweg festlegen.

- [x] `AGENTS.md`, `CODING-RULES.md` und `CLAUDE.md` vollständig lesen.
- [x] Fremde Cache-Änderung erkennen und schützen.
- [x] Prompt-/Task-Paar vor Regeländerung anlegen.

**Ergebnis:** Änderung betrifft nur zentrale Schreibpflicht und kompakten Paarabschnitt.

**Architektur:** `CODING-RULES.md` bleibt gemeinsame Hauptquelle; kein Zusatzmodul nötig. Lösung ist simpel, wartbar und ohne Leistungsrisiko.

**Referenzen:**
- `shared-docs/CODING-RULES.md`
- `AGENTS.md`
- `CLAUDE.md`

### ✅ Phase 2 — Kompaktpflicht und Paarregeln

**Ziel:** Token-effiziente Stichpunkte als oberste Schreibregel setzen; Paarregeln straffen.

- [x] Kompaktpflicht direkt am Dateianfang ergänzen.
- [x] Unnötige Artikel, Füllwörter und Wiederholungen im Paarabschnitt entfernen.
- [x] Inhalt, Grenzen und Prompt-Verträge vollständig bewahren.

**Ergebnis:** Neue Top-Regel fordert minimale Stichpunkte, schützt Pflichtinfos und nimmt unveränderte Prompt-Originale aus; Paarregeln sind kompakter.

**Architektur:** Eine zentrale Regel verhindert doppelte Vorgaben; gezielte Abschnittsänderung schützt restliche Verträge.

**Referenzen:**
- `shared-docs/CODING-RULES.md`
- `shared-docs/agents/tasks/2026-08-14-compact-token-efficient-writing-rules-prompt.md`

### ✅ Phase 3 — Statische Prüfung und Lieferung

**Ziel:** Inhalt, UTF-8, Links, Diff, Git und Remote-Stand prüfen.

- [x] Regelwirkung und Informationsverlust prüfen.
- [x] Mojibake, Whitespace, Links und Diff prüfen.
- [x] Commit-Inhalt und Remote-Stand beider Repositorys prüfen.

**Ergebnis:** UTF-8, Dateiende, Prompt-Link und Whitespace sind sauber; beide Branches entsprechen `origin/main` vor Commit.

**Architektur:** Reine Dokuänderung braucht keinen Typecheck oder VSIX-Build.

**Referenzen:**
- `shared-docs/CODING-RULES.md`
- `shared-docs/agents/tasks/2026-08-14-compact-token-efficient-writing-rules-tasks.md`

## Entscheidungen

- Artikel nur entfernen, wenn Aussage klar bleibt; keine telegraphische Mehrdeutigkeit.
- Prompt-Original bleibt absichtlich unverändert und darf Füllwörter enthalten.
- Kein globales Umschreiben unabhängiger Fachverträge.

## Findings

- Schreibregeln stehen bisher erst in Abschnitt 8.
- Paarregeln wiederholen Subjekte und nutzen viele entbehrliche Artikel.
- Reine Dokuänderung: kein Compile, Test oder VSIX-Paket nötig.
- `CODING-RULES.md`: 261 Zeilen; keine Mojibake-Marker oder nachgestellten Leerzeichen.
- Fremde Änderung bleibt ausschließlich `.uniai-chat/cache/opencode-models.json`.
