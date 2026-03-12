# Notedrill Mobile: Phase 07 Kontext-Stabilisierung, Skills und Rollen

Stand: 8. März 2026
Status: `DONE`
Abgeschlossen: 8. März 2026

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

## Was in dieser Phase konkret gelöst wurde

### 1. Rollen laufen jetzt durch den echten Chat-Weg
1. Der Mobile-Chat kennt jetzt feste Rollen:
   - `plan`
   - `build`
   - `review`
   - `explore`
   - `artifact-check`
2. Die gewählte Rolle geht bis in Prompt und Request-Metadaten mit.

### 2. Skill-Hilfen sind auswählbar und sichtbar
1. Nutzer können bis zu drei Hilfen gleichzeitig aktivieren.
2. Die aktive Auswahl ist direkt im Arbeitsmodus sichtbar.
3. Skill-Pfade werden im Sheet gezeigt, damit klar bleibt, wo die Hilfe herkommt.

### 3. Lange Chats bekommen einen Kurzverlauf
1. Ältere Nachrichten werden bei langen Chats zu einer kurzen Übergabe verdichtet.
2. Diese Kurzfassung geht in neue Läufe mit.
3. Gespeicherte Sitzungen merken sich, ob ältere Teile schon gekürzt wurden.

### 4. Verlauf und Session-Speicher zeigen den Modus
1. Chat-Sitzungen speichern jetzt Rolle, aktive Hilfen und Kurzverlauf.
2. In der History sieht man Rolle, Hilfen-Anzahl und ob ein Kurzverlauf aktiv war.

## Betroffene Dateien dieser Phase
1. `features/chat/components/interface/agent-run-mode-config.ts`
2. `features/chat/components/interface/useConversationAgentMode.ts`
3. `features/chat/components/interface/AgentModeSheet.tsx`
4. `features/chat/components/interface/ConversationHeader.tsx`
5. `features/chat/components/interface/ConversationView.tsx`
6. `features/chat/components/history/ChatHistoryItem.tsx`
7. `features/chat/components/store/chat-bridge-request.ts`
8. `features/chat/components/store/useChatStore.ts`
9. `features/chat/components/interface/useAutoSessionPersistence.ts`

## Was das konkret für den User bedeutet
1. Der User kann dem Chat einen klaren Arbeitsstil geben.
2. Lange Chats laufen ruhiger weiter, weil alter Ballast kurz zusammengefasst wird.
3. Beim Öffnen alter Sitzungen sieht man schneller, in welchem Modus sie gelaufen sind.

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
