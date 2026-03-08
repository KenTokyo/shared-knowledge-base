# Notedrill Mobile: Start hier und Lesereihenfolge für AI Architecture

Stand: 8. März 2026

## Was wurde verstanden?
1. Der Ordner war zu voll und zu flach.
2. Es war nicht klar, was man zuerst lesen soll.
3. Deshalb gibt es jetzt Unterordner und diese Start-Datei.

## Die neue Ordnerstruktur

| Ordner | Wofür er da ist |
|---|---|
| `01-grundlagen/` | das große Grundbild, Phasenplan und Q&A |
| `02-betrieb-und-szenarien/` | Gerätewege, Nutzerwege, Kosten und Verantwortungen |
| `03-agentic-umsetzung/` | konkrete Maßnahmen und Mermaid-Diagramme |
| `04-zusatzthemen/` | einzelne Ergänzungen wie ChatGPT-Connector |
| `toolcall-architecture/` | tiefer Technikvergleich zu Tool-Calls, MCP, Skills und Host-Systemen |
| `99-history/` | längerer Verlauf und frühere Entscheidungen |

## Wenn du nur ganz wenig Zeit hast
Lies in genau dieser Reihenfolge:

1. `01-grundlagen/notedrill-ki-zielarchitektur.md`
2. `01-grundlagen/notedrill-ki-phasenplan.md`
3. `03-agentic-umsetzung/notedrill-ki-agentic-massnahmen-und-taskliste.md`
4. `03-agentic-umsetzung/notedrill-ki-agentic-userwege-und-kosten-diagramme.md`

Dann hast du das grobe Ziel, die Reihenfolge und die Maßnahmen.

## Empfohlene volle Lesereihenfolge

### Schritt 1: Erst das Grundbild
1. `01-grundlagen/notedrill-ki-zielarchitektur.md`
2. `01-grundlagen/notedrill-ki-phasenplan.md`
3. `01-grundlagen/notedrill-ki-qa.md`
4. `01-grundlagen/notedrill-mobile-chat-agent-sdk-react-native-capacitor.md`

### Schritt 2: Dann die echten Nutzer- und Gerätewege
1. `02-betrieb-und-szenarien/notedrill-ki-szenario-matrix-geraete-und-hosting.md`
2. `02-betrieb-und-szenarien/notedrill-ki-konkrete-user-journeys-und-setup-checklisten.md`
3. `02-betrieb-und-szenarien/notedrill-ki-anbieter-vergleich-und-ranking.md`
4. `02-betrieb-und-szenarien/notedrill-ki-aufwand-und-verantwortung-pro-betriebsmodell.md`
5. `02-betrieb-und-szenarien/notedrill-ki-kosten-speicher-und-abopakete.md`

### Schritt 3: Dann die konkrete Umsetzung
1. `03-agentic-umsetzung/notedrill-ki-agentic-massnahmen-und-taskliste.md`
2. `03-agentic-umsetzung/phasen/01-run-contract-und-tool-woerterbuch.md`
3. `03-agentic-umsetzung/phasen/02-host-modi-routing-und-fallbacks.md`
4. `03-agentic-umsetzung/phasen/03-provider-adapter-und-ausfuehrungswege.md`
5. `03-agentic-umsetzung/phasen/04-artefakt-pipeline-und-dateivertraege.md`
6. `03-agentic-umsetzung/phasen/05-setup-status-onboarding-und-host-ux.md`
7. `03-agentic-umsetzung/phasen/06-kosten-budget-quota-und-pakete.md`
8. `03-agentic-umsetzung/phasen/07-kontext-stabilisierung-skills-und-rollen.md`
9. `03-agentic-umsetzung/phasen/08-mcp-integration-berechtigungen-und-externe-tools.md`
10. `03-agentic-umsetzung/phasen/09-observability-schulmodus-und-rollout.md`
11. `03-agentic-umsetzung/notedrill-ki-agentic-userwege-und-kosten-diagramme.md`

### Schritt 4: Dann die tiefe Technik
1. `toolcall-architecture/00-master-ueberblick-toolcall-architektur.md`
2. `toolcall-architecture/01-claude-code-toolcalls-und-erweiterungen.md`
3. `toolcall-architecture/02-gemini-cli-toolcalls-und-erweiterungen.md`
4. `toolcall-architecture/03-codex-cli-toolcalls-und-erweiterungen.md`
5. `toolcall-architecture/04-opencode-toolcalls-und-erweiterungen.md`
6. `toolcall-architecture/05-uniai-chat-vscode-extension-toolcall-system-und-sidebar.md`
7. `toolcall-architecture/06-automaker-toolcall-system-und-server-orchestrierung.md`
8. `toolcall-architecture/07-notedrill-toolcall-system-ist-zustand-backend-mobile.md`
9. `toolcall-architecture/08-vergleich-und-was-notedrill-lernen-soll.md`

### Schritt 5: Zusatzthemen nur bei Bedarf
1. `04-zusatzthemen/chatgpt-connector.md`

### Schritt 6: History nur wenn du alte Entscheidungen nachlesen willst
1. `99-history/notedrill-mobile-ki-architektur-und-agent-planung-history.md`

## Welche Datei für welche Frage?

| Frage | Beste Datei |
|---|---|
| Was ist das Zielbild? | `01-grundlagen/notedrill-ki-zielarchitektur.md` |
| In welcher Reihenfolge bauen wir das? | `01-grundlagen/notedrill-ki-phasenplan.md` |
| Was passiert bei iPad-only oder MacBook später? | `02-betrieb-und-szenarien/notedrill-ki-szenario-matrix-geraete-und-hosting.md` |
| Was muss der Nutzer konkret tun? | `02-betrieb-und-szenarien/notedrill-ki-konkrete-user-journeys-und-setup-checklisten.md` |
| Wer macht was: Nutzer, Betreiber, Team? | `02-betrieb-und-szenarien/notedrill-ki-aufwand-und-verantwortung-pro-betriebsmodell.md` |
| Was kostet das ungefähr? | `02-betrieb-und-szenarien/notedrill-ki-kosten-speicher-und-abopakete.md` |
| Welche Maßnahmen bauen wir wirklich? | `03-agentic-umsetzung/notedrill-ki-agentic-massnahmen-und-taskliste.md` |
| Welche Phase ist als Nächstes dran? | `03-agentic-umsetzung/phasen/01-run-contract-und-tool-woerterbuch.md` |
| Gibt es Diagramme? | `03-agentic-umsetzung/notedrill-ki-agentic-userwege-und-kosten-diagramme.md` |
| Wie funktionieren Tool-Calls technisch? | `toolcall-architecture/00-master-ueberblick-toolcall-architektur.md` |

## Meine empfohlene Arbeitsweise
1. Erst `Grundlagen`
2. Dann `Betrieb und Szenarien`
3. Dann `Agentic-Umsetzung`
4. Danach erst `toolcall-architecture`
5. `Zusatzthemen` und `History` nur bei Bedarf

## Warum diese Reihenfolge sinnvoll ist
1. Sonst startet man zu tief in Technik und verliert das Produktbild.
2. Erst muss klar sein, für wen wir bauen.
3. Dann muss klar sein, was es kostet und wer was tun muss.
4. Erst danach lohnt sich der tiefe Tool-Call-Vergleich.

## Kurz-Wörterbuch
1. `Grundlagen` = Zielbild, Plan und Antworten auf die Grundfragen.
2. `Betrieb und Szenarien` = echte Nutzerlagen und Kosten.
3. `Agentic-Umsetzung` = was wir konkret bauen sollten.
4. `Toolcall-Architecture` = tiefer Technikvergleich.
