# Taskplanung phasenweise ohne Stopps

**Lesen bei:** Implementierung, Refactoring, mehrdateiliger Änderung oder ausdrücklichem Planungsauftrag.
**Ziel:** Eine Task-Datei ist Plan, Todo-Liste, Arbeitsprotokoll und Übergabe-SSoT.

## 1. Vor Änderungen

1. Bestehende Task-/Masterplanung suchen und lesen.
2. Fehlt sie, unter `docs/<feature>/tasks/<datum>-<sprechender-task>.md` anlegen.
3. Usernachricht oben als kompaktes `Userziel` notieren.
4. Git-Status, bestehende SSoTs, ähnliche Vorarbeit und betroffene Imports/Verweise prüfen.
5. Zwei bis vier sinnvolle Lösungswege vergleichen; kleinsten stabilen Ansatz wählen und begründen.
6. Erst nach validierter Planung ändern.

Keine Rückfrage für ableitbare Entscheidungen. Nur bei externer Blockade stoppen.

## 2. Phasenformat

Jede Phase enthält:

1. **Ziel:** konkrete Wirkung.
2. **Todos:** ausführbare `[ ]`/`[x]`-Punkte.
3. **Ergebnis:** ein verständlicher Satz.
4. **Warum:** nur wenn die Ursache sonst unklar bleibt.
5. **Eingehalten:** relevante Regeln und Grenzen.
6. **Architektur passt:** kurze Ownership-/Datenflussbegründung.
7. **Auffälligkeiten/Performance/Kritische Findings:** nach Schwere, auch wenn keine offen sind.

Maximal drei Hauptreferenzpfade pro Phase. Planung enthält Konzepte und kurze Signaturen, keinen vollständigen
Produktionscode. Bei Architekturphasen Vorher-/Nachher-Datenfluss in drei bis sechs Schritten ergänzen.

## 3. Phasenloop

1. Genau eine Phase oder klar abgegrenzte Subphase umsetzen.
2. Scope gegen Phase und Userziel abgleichen.
3. Todo sofort abhaken; nicht bis zum Ende sammeln.
4. Phasenkommentar und append-only Arbeitsprotokoll ergänzen.
5. Offene Findings unter `Offene Fix-Punkte` notieren und im selben Auftrag beheben.
6. Direkt mit der nächsten Phase fortfahren.

Nicht wegen eines selbst behebbaren Funds stoppen. Fremde Änderungen weder revertieren noch pauschal
formatieren. Blockiert ein fremder Fehler den eigenen Weg, nur den kleinsten additiven Fix dokumentieren.

Sind ausschließlich nicht freigegebene manuelle Sicht-/Gameplay-/Performance-Gates offen, endet der
technische Loop mit ehrlichem Status; keine Pseudophase anhängen.

## 4. Arbeitsprotokoll

```markdown
## Arbeitsprotokoll

### Phase N — Status success|partial|blocked

**Dateien:** Pfad — Änderung
**Entscheidungen:** ein bis drei Weichen mit Grund
**Unsicher / Risiko:** reale Restunsicherheit, keine erfundenen Erfolge

## Offene Fix-Punkte

- [ ] `pfad:zeile` — konkreter offener Fix
```

Frühere Einträge nie überschreiben. Über etwa 600 Zeilen eine nummerierte Fortsetzung mit Rück- und
Vorwärtspointer anlegen.

## 5. Abschlussabgleich

1. Alle Usermerkmale und quantifizierten Vorgaben erneut gegenlesen.
2. Alle Phasen/Todos und offenen Fix-Punkte prüfen, auch wenn sie bereits abgehakt wirken.
3. Stärkste im Auftrag erlaubte Evidenz ausführen; statische Checks nicht als Produktbeweis ausgeben.
4. Mojibake, Links/Pfade, Dateiende, Diff-Hygiene und fremden Scope prüfen.
5. Kommentare und Arbeitsprotokoll finalisieren.
6. `.completed/`-Dokument und minimale Root-Doku-Aktualisierung nach dem Task-Abschließer-Vertrag prüfen.
