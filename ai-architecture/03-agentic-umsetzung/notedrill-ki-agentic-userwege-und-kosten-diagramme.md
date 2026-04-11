# Notedrill Mobile: Agentic-Userwege, Kosten und Kontext als Mermaid-Diagramme

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst die Szenarien nicht nur als Text lesen.
2. Du willst Diagramme für Gerätewege, Kosten und Kontext-Stabilität.
3. Die Diagramme sollen zeigen, wie der Nutzer mit möglichst wenig Kosten an Agentic-Funktionen kommt.

## Diagramm 1: Welcher Weg ist für welchen Nutzer sinnvoll?

```mermaid
flowchart TD
    A[User startet Notedrill] --> B{Welches Gerät hat der User?}

    B -->|nur iPad oder iPhone| C[Remote-Hauptweg]
    B -->|Android ohne Laptop| D[Remote-Hauptweg]
    B -->|MacBook oder Linux-PC| E[Companion oder Remote]
    B -->|Windows-PC| F{Installierte App oder Browser?}
    B -->|iPad plus später MacBook| G[Erst Remote, später Companion]

    C --> C1[Günstiges Standardmodell]
    C1 --> C2[harte Monatsgrenzen]
    C2 --> C3[Premium nur optional]

    D --> D1{Will der User basteln?}
    D1 -->|nein| D2[Remote bleiben]
    D1 -->|ja| D3[Termux nur als Testweg]
    D3 --> D4[bei Problemen zurück auf Remote]

    E --> E1{Will der User lokale Agenten?}
    E1 -->|ja| E2[Companion aktivieren]
    E1 -->|nein| E3[Remote bleiben]
    E2 --> E4[Gemini CLI oder Codex CLI zuerst]
    E4 --> E5[Claude Code oder OpenCode optional]

    F -->|Browser| F1[kein direkter CLI-Zugriff]
    F1 --> F2[Companion zusätzlich nötig]
    F -->|installierte App| F3[Companion oder Remote]

    G --> G1[heute: Remote nutzen]
    G1 --> G2[später: Companion als Upgrade]

    C3 --> Z[Agentic-Funktionen mit wenig Kosten]
    D2 --> Z
    D4 --> Z
    E3 --> Z
    E5 --> Z
    F2 --> Z
    F3 --> Z
    G2 --> Z
```

## Diagramm 2: Wie bleibt der Kontext stabil?

```mermaid
flowchart TD
    A[User sendet Nachricht] --> B[Run starten]
    B --> C[RunContract mit runId]
    C --> D[Tool-Calls und Tool-Results mitschreiben]
    D --> E{Lauf wird zu lang oder teuer?}

    E -->|nein| F[weiter im gleichen Run]
    E -->|ja| G[Zusammenfassung erzeugen]
    G --> H[neuen Run mit sauberem Kontext starten]
    H --> I[alte Tool-Daten im Log behalten]

    F --> J{entsteht ein Artefakt?}
    I --> J

    J -->|ja| K[Artefakt-Vertrag prüfen]
    J -->|nein| L[Antwort normal anzeigen]

    K --> M[Pfad prüfen]
    M --> N[UTF-8 prüfen]
    N --> O[Artefakt sicher übernehmen]
    O --> P[Sidebar und Inhalte aktualisieren]

    L --> Q[Chat bleibt schlank]
    P --> Q
    Q --> R[weniger Kontextchaos]
```

## Diagramm 3: Wie bleiben die Kosten niedrig?

```mermaid
flowchart LR
    A[User braucht Agentic-Funktion] --> B{Hat der User einen Desktop?}

    B -->|nein| C[Remote-Host]
    B -->|ja| D{Will der User lokalen Host?}

    D -->|ja| E[Companion]
    D -->|nein| C

    C --> C1[Günstiges Standardmodell]
    C1 --> C2[Budgetgrenzen]
    C2 --> C3[Premium nur auf Wunsch]

    E --> E1[Gemini CLI oder Codex CLI]
    E1 --> E2[Betreiber spart Tokenkosten]
    E2 --> E3[mehr Setup- und Supportaufwand]

    C3 --> F[Planbare Kosten]
    E3 --> G[Flexibel, aber aufwendiger]

    F --> H[Hybrid-Modell]
    G --> H
    H --> I[Remote für alle, Companion als Upgrade]
```

## Diagramm 4: Maßnahmen-Map für die Umsetzung

```mermaid
flowchart TD
    A[Agentic-Feature verbessern] --> B[Verträge]
    A --> C[Host-Wege]
    A --> D[Nutzerführung]
    A --> E[Kontext]
    A --> F[MCP und Skills]
    A --> G[Kosten und Support]

    B --> B1[RunContract]
    B --> B2[Tool-Wörterbuch]
    B --> B3[Artefakt-Vertrag]

    C --> C1[Remote]
    C --> C2[Companion]
    C --> C3[Fallback]
    C --> C4[Termux nur Test]

    D --> D1[Setup-Status]
    D --> D2[Host-Modus sichtbar]
    D --> D3[klare Fehltexte]

    E --> E1[Kontextdateien]
    E --> E2[Zusammenfassung]
    E --> E3[Rollen und Subagents]

    F --> F1[MCP read-only zuerst]
    F --> F2[Skills-Layer]
    F --> F3[MCP-Test und Tool-Liste]

    G --> G1[Budgetlimits]
    G --> G2[Speicherquoten]
    G --> G3[Admin- und Schulmodus]
```

## Welche Diagramme ich am wichtigsten finde
1. Diagramm 1 für Produkt- und Nutzerentscheidung
2. Diagramm 2 für Kontextprobleme
3. Diagramm 3 für Kostenlogik

## Was diese Diagramme für die App bedeuten
1. iPad-only und iPhone-only brauchen fast immer Remote.
2. Companion ist das Upgrade für Desktop-Nutzer.
3. Kosten bleiben nur dann niedrig, wenn der günstige Standardweg klar sichtbar ist.
4. Kontext bleibt nur dann stabil, wenn Runs sauber getrennt und Artefakte sauber übernommen werden.

## Quellen
1. `shared-docs/ai-architecture/03-agentic-umsetzung/notedrill-ki-agentic-massnahmen-und-taskliste.md`
2. `shared-docs/ai-architecture/02-betrieb-und-szenarien/notedrill-ki-szenario-matrix-geraete-und-hosting.md`
3. `shared-docs/ai-architecture/02-betrieb-und-szenarien/notedrill-ki-kosten-speicher-und-abopakete.md`
4. `shared-docs/ai-architecture/toolcall-architecture/08-vergleich-und-was-notedrill-lernen-soll.md`
