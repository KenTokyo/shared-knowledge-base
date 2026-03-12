# Notedrill Mobile: Phase 04 Artefakt-Pipeline und Dateiverträge

Stand: 8. März 2026
Status: `DONE`
Abgeschlossen: 8. März 2026

## Ziel
Diese Phase sorgt dafür, dass Agent-Ergebnisse nicht nur im Chat auftauchen, sondern sicher in der App landen.

## Warum diese Phase wichtig ist
Ein Agent-Text allein bringt wenig, wenn:
1. die Notiz nicht in der Sidebar auftaucht,
2. Quiz-Daten fehlen,
3. Karten oder Diagramme nicht sicher übernommen werden.

## Zielarten von Artefakten
1. Notizen
2. Quizze
3. Lernkarten
4. Diagramme
5. Kreuzworträtsel
6. später weitere Lernobjekte

## Hauptaufgaben

### 1. `generatedArtifacts`-Form fixieren
1. Pfad
2. Format
3. Inhalt direkt oder Referenz
4. Quelle
5. Größe
6. Zeitstempel

### 2. Dateiverträge pro Bereich festlegen
1. Notizen -> Markdown + Meta
2. Quiz -> JSON
3. Karten -> JSON
4. Diagramme -> JSON
5. Kreuzworträtsel -> JSON

### 3. Ladeweg vereinheitlichen
1. Inhalt direkt in der Antwort
2. oder `local-artifact`-Endpunkt
3. oder später Companion-Dateipfad

### 4. Sicherheitsprüfungen
1. Pfad-Whitelist
2. UTF-8
3. Größenlimit
4. JSON-Parse
5. Kollisionen

## Edge Cases

| Edge Case | Antwort |
|---|---|
| Datei ist erwähnt, aber nicht erreichbar | sauberer Hinweis statt stiller Fehler |
| JSON kaputt | Reparatur oder klarer Abbruch |
| Markdown und JSON gemischt | eindeutige Erkennung |
| Größe zu hoch | Blockierung mit Hinweis |
| gleiches Artefakt doppelt | Duplikat-Regel |
| alter Host liefert nur Text | kein kaputter Auto-Save |

## Plattformsicht
1. Auf iPad und iPhone ist diese Phase besonders wichtig, weil dort fast alles remote entsteht.
2. Auf Companion-Wegen muss dieselbe Übernahme gelten.

## Betroffene Dateien
1. `features/chat/components/interface/agent-note-artifact-service.ts`
2. `features/chat/components/interface/agent-note-upsert-service.ts`
3. Verträge unter `lib/agent/contracts/`
4. Bridge- und Host-Endpunkte

## Done-Kriterien
1. Artefakte landen sicher in Notedrill.
2. Die Sidebar wird sauber aktualisiert.
3. Fehler sind klar sichtbar.

## Umgesetzte Dateien

### Neue Dateien
1. `lib/agent/contracts/artifact-type-registry.ts` - Klassifiziert Agent-Pfade in Domain-Typen (note, quiz, flashcard, diagram, crossword)
2. `features/chat/components/interface/agent-quiz-artifact-service.ts` - Quiz-Upsert-Pipeline: JSON parsen, Quiz+Fragen in DB erstellen
3. `features/chat/components/interface/agent-card-artifact-service.ts` - Standalone-Karten-Upsert-Pipeline: JSON parsen, Lernkarten in DB erstellen
4. `features/chat/components/interface/agent-artifact-dispatcher.ts` - Unified Dispatcher: routet nach Domain-Typ zur richtigen Pipeline

### Geänderte Dateien
1. `lib/agent/contracts/agent-note-upsert.ts` - CapabilityPolicy erweitert um quiz_upsert, card_upsert Actions und diagrams/, crosswords/ Pfade
2. `lib/agent/contracts/index.ts` - Barrel um artifact-type-registry Exports erweitert
3. `features/chat/components/interface/agent-note-upsert-service.ts` - Routing-Integration: non-note Pfade werden an den Dispatcher weitergeleitet; Pfad-Regex erweitert
4. `features/chat/components/interface/ConversationView.tsx` - Nullsafe-Fix für createdCardCount

## Nächste Phase danach
`05-setup-status-onboarding-und-host-ux.md`
