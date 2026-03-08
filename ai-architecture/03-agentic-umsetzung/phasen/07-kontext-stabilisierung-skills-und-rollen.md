# Notedrill Mobile: Phase 07 Kontext-Stabilisierung, Skills und Rollen

Stand: 8. März 2026
Status: `PLANNED`

## Ziel
Diese Phase verhindert, dass lange Agent-Läufe kontextmäßig ausfransen.

## Warum diese Phase wichtig ist
Viele Probleme entstehen nicht durch das Modell selbst, sondern durch:
1. zu lange Chats,
2. zu viel gemischten Kontext,
3. zu große Prompts,
4. fehlende Rollen und Spezialisierung.

## Hauptaufgaben

### 1. Kontext-Hierarchie
1. globale Regeln
2. Projektregeln
3. Bereichsregeln
4. Lauf-Zusammenfassungen

### 2. Skill-Layer
1. Skill-Pfade definieren
2. Skill-Dateien lesen
3. Skill-Metadaten sichtbar machen

### 3. Rollen oder Subagents
1. `plan`
2. `build`
3. `review`
4. `explore`
5. `artifact-check`

### 4. Kontext-Kompaktung
1. alte Runs gruppieren
2. saubere Kurzfassungen erzeugen
3. neue Runs mit Übergabe starten

## Edge Cases

| Edge Case | Antwort |
|---|---|
| Skill-Regeln widersprechen sich | Prioritäts- und Konfliktregel |
| zu viele Skills gleichzeitig | Auswahl oder Auto-Limit |
| Rolle passt nicht zur Aufgabe | Nutzer- und Systemfallback |
| alte Zusammenfassung ist falsch | Möglichkeit zur Neuerzeugung |
| zu großer Verlauf auf Mobile | neue Run-Grenze statt endloser Chat |

## Betroffene Dateien oder Bereiche
1. Prompt-Resolver
2. Host-Settings
3. künftiger Skill- und Rollen-Layer
4. History- und Session-System

## Done-Kriterien
1. Kontext ist modularer.
2. Rollen sind klar.
3. lange Läufe kippen seltener.

## Nächste Phase danach
`08-mcp-integration-berechtigungen-und-externe-tools.md`
