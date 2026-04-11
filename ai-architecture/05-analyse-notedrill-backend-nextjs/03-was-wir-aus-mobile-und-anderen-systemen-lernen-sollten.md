# Notedrill Backend Next.js: Was wir aus Mobile und anderen Systemen lernen sollten

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst nicht nur Probleme sammeln.
2. Du willst sehen, welche Teile schon da sind.
3. Du willst wissen, was das Backend konkret von Mobile und starken Referenzen übernehmen sollte.

## Das wichtigste Kurzbild
Das Backend ist heute stärker beim Prompt-System.
Mobile ist heute stärker beim Laufvertrag.

Beides zusammen ergibt den sinnvollsten nächsten Schritt.

## Vergleich: Backend heute gegen Mobile heute

| Bereich | Backend Next.js heute | Mobile heute | Klare Lehre |
|---|---|---|---|
| Prompt-System | sehr stark | einfacher | Backend bleibt Chef beim Prompt |
| Vertragsmodus | `nd_actions` und `open_in` sauber getrennt | eher Bridge-zentriert | diese Trennung behalten |
| Run-Sprache | noch eher Chat + Parsing | Event-Sprache mit `started`, `chunk`, `tool_call`, `tool_result`, `completed`, `failed` | Mobile-Laufsprache übernehmen |
| Provider-Adapter | vorhanden, aber eher API- und Stream-Fallback | klarere Bridge-Adapter pro Host | gemeinsame Adapter-Schicht bauen |
| Tool-Transparenz | noch nicht echter Produktkern | vertraglich vorbereitet | echte Tool-Events als Standard bauen |
| Artefakte | Open-In schon gut, App-Aktionen noch gemischt | kontrollierte Übernahme mit Verträgen | alles in eine Artefakt-Pipeline ziehen |
| Setup und Routenwahl | im Web-Chat nicht zentral | Resolver, Preflight und Fallback-Gründe da | Route-Wahl sichtbarer machen |

## Was Mobile heute schon besser vormacht

## 1. Eine klare Event-Sprache
In Mobile gibt es schon die wichtigsten Lauf-Ereignisse:
1. `started`
2. `chunk`
3. `tool_call`
4. `tool_result`
5. `completed`
6. `failed`

Das ist genau die Sprache, die dem Backend noch als Hauptweg fehlt.

## 2. Ein echterer Vertragsblick
Mobile denkt schon stärker in:
1. `ChatSessionContract`
2. `OperationsLogContract`
3. validierten Bridge-Requests
4. Fallback-Gründen und Route-Metadaten

Das ist Gold wert für das Backend.

## 3. Eine Adapter-Idee pro Provider
Mobile trennt besser:
1. Provider-Aufruf
2. Response-Parsen
3. Event-Umbau

Das sollte das Backend 1 zu 1 übernehmen.

## Was Backend heute schon besser vormacht

## 1. Das flexible Prompt-Orchestrieren
Backend kann heute schon:
1. Zielgruppe einbauen
2. Skills gezielt einbauen
3. Budget auf Prompt-Layer anwenden
4. Vertragsmodus wechseln

Das sollte Mobile später nicht neu erfinden.

## 2. Open-In ist schon weit
Der Open-In-Weg zeigt heute schon,
dass automatische Übernahme ohne Copy-Paste möglich ist.

Genau diese Denkweise sollte später auch für andere Artefakte gelten.

## 3. Robuste lokale Reparatur
Die Parser und Reparatur-Helfer sind nicht die Zielarchitektur.
Aber sie sind ein starker Sicherheitsgurt für die Übergangszeit.

## Was starke Referenzsysteme gemeinsam vormachen

| Baustein | Was starke Systeme tun | Was Notedrill daraus lernen sollte |
|---|---|---|
| Host | klarer Host statt bloßer Textantwort | echten Server-Runner bauen |
| Tools | Tool-Registry statt freie JSON-Wünsche | App-Aktionen als Tools anbieten |
| Rechte | allow, ask, deny | Freigaben früh mitdenken |
| Kontext | kompakte Rollen, Skills und Zusammenfassungen | Kontext in kleine Pakete schneiden |
| Events | sichtbare Zustände pro Lauf | echte Run- und Tool-Feeds bauen |

## Die 7 wichtigsten Learnings für Notedrill

## 1. Host und Ausgabe müssen getrennt werden
Heute ist Chat-Antwort und App-Aktion noch zu eng gekoppelt.

Ziel:
1. Host führt aus
2. UI zeigt nur an

## 2. App-Aktionen müssen echte Tools werden
`notes.create`, `folders.create`, `quiz.generate` und `cards.generate`
sollten nicht primär ein JSON-Wunsch des Modells sein,
sondern echte interne Werkzeuge.

## 3. Der Server muss den Lauf besitzen
Nicht der Browser.

Der Browser darf:
1. anzeigen
2. bestätigen
3. stoppen

Der Server soll:
1. entscheiden
2. speichern
3. wieder aufnehmen

## 4. Skills müssen kleiner und gezielter werden
Nicht jeder Lauf braucht alles.

Der Skill-Layer sollte nur das Nötige laden.
Das spart Geld und senkt Formatfehler.

## 5. MCP zuerst read-only
MCP = gemeinsamer Steckplatz für Werkzeuge und Datenquellen.

Für Notedrill heißt das:
1. erst lesen
2. dann beobachten
3. erst später schreiben

## 6. Kontextprobleme sind meist Strukturprobleme
Nicht nur Modellprobleme.

Lange Chats, Retries und gemischte Aufgaben machen den Kontext kaputt.
Darum brauchen wir kleine Run-Pakete.

## 7. Die Produktwahrheit ist wichtiger als coole Namen
Wenn eine Route `codex-cli` heißt,
erwartet man leicht einen vollen Codex-Host.

Dann muss der Weg entweder liefern
oder anders genannt werden.

## Meine klare Architektur-Folge
Notedrill sollte nicht Backend gegen Mobile ausspielen.

Sondern:
1. Backend liefert den starken Prompt-Kern
2. Mobile liefert den starken Laufvertrag
3. beide treffen sich in einem gemeinsamen Run-System

## Was das konkret für den nächsten Umbau heißt
1. gemeinsamer `RunContract`
2. gemeinsame Event-Sprache
3. gemeinsame Artefakt-Pipeline
4. Tools zuerst intern, MCP später außen

## Quellen
1. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/lib/agent/bridge/ai-bridge-service.ts`
2. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/lib/agent/bridge/provider-adapters.ts`
3. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/lib/agent/bridge/types.ts`
4. `/mnt/d/CODING/React Projects/notedrill/notedrill-mobile-react-native-expo/lib/agent/contracts/index.ts`
5. `shared-docs/ai-architecture/toolcall-architecture/07-notedrill-toolcall-system-ist-zustand-backend-mobile.md`
6. `shared-docs/ai-architecture/toolcall-architecture/08-vergleich-und-was-notedrill-lernen-soll.md`
