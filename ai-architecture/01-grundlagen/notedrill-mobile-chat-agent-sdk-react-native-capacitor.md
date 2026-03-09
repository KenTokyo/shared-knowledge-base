# Notedrill Mobile: KI-Chat, Claude Agent SDK, React Native und Capacitor

Stand: 8. März 2026

## Was wurde verstanden?
1. Du willst den echten Stand vom mobilen KI-Chat verstehen.
2. Du willst wissen, warum das heute in React Native funktioniert.
3. Du willst wissen, ob das auch ganz ohne Server direkt auf Android oder iOS laufen kann.
4. Du willst React Native und Capacitor beim Dateisystem und beim Tool-System sauber vergleichen.

## Was ist der Plan?
1. Erst erkläre ich den Ist-Zustand im aktuellen Code.
2. Dann trenne ich klar zwischen `eigene Bridge-Loesung` und `Claude Agent SDK`.
3. Danach ordne ich Android mit Termux und iOS ehrlich ein.
4. Zum Schluss vergleiche ich React Native und Capacitor mit klaren Ja/Nein-Aussagen.

## Wichtige Klarstellung
Ich meine hier `Claude Code` und `Claude Agent SDK`.
Falls du mit `Cloud Code` eigentlich `Claude Code` meintest, passt diese Doku genau dazu.

## 1) So laeuft es heute wirklich in Notedrill Mobile

### Kurzbild
Die App fuehrt die Tool-Calls nicht selbst als lokales CLI aus.
Die App ist heute vor allem:
1. Chat-Oberflaeche,
2. Status-Anzeige,
3. lokaler Speicher fuer App-Daten,
4. sicherer Uebernehmer fuer erzeugte Dateien.

### Der Weg einer Nachricht
1. `ConversationView.tsx` nimmt die Eingabe an.
2. `useChatStore.ts` waehlt Provider und Modell.
3. Die App baut daraus einen Prompt mit etwas Verlauf.
4. Dann sendet sie per `fetch()` an eine Bridge-Route wie:
   - `/api/agent/bridge/codex-cli`
   - `/api/agent/bridge/gemini-cli`
   - `/api/agent/bridge/claude-code-cli`
5. Die Bridge antwortet mit:
   - Text,
   - Tool-Events,
   - optional erzeugten Dateien.
6. Die App zeigt die Tool-Schritte im Chat an.
7. Falls eine erlaubte Datei erzeugt wurde, uebernimmt die App sie kontrolliert in den Notiz-Speicher.

### Die wichtigsten Stellen im Code
1. `features/chat/components/interface/ConversationView.tsx`
   - Startet das Senden und das Auto-Uebernehmen.
2. `features/chat/components/store/useChatStore.ts`
   - Baut den Prompt.
   - Schickt den Request an die Bridge.
   - Liest Tool-Events und Artefakte aus der Antwort.
3. `features/chat/components/messages/ToolAuditPanel.tsx`
   - Zeigt die Tool-Schritte fuer den Nutzer an.
4. `features/chat/components/interface/agent-note-upsert-service.ts`
   - Prueft Pfad, Groesse und UTF-8.
   - Uebernimmt die Datei sicher in die App-Daten.
5. `features/chat/components/interface/agent-note-artifact-service.ts`
   - Holt die erzeugte Datei direkt aus den Antwortdaten oder ueber
     `/api/agent/bridge/local-artifact`.
6. `lib/agent/contracts/agent-note-upsert.ts`
   - Definiert die feste Erlaubnisliste fuer Pfade wie `notes/`, `flashcards/`, `quizzes/`.
7. `lib/agent/bridge/mobile-capability-boundary.ts`
   - Helt fest, was Mobile darf und was nicht.

## 2) Warum funktioniert das in React Native?

### Der einfache Grund
Weil React Native hier nicht die CLI startet.
React Native macht nur die Teile, die mobile Apps gut koennen:
1. HTTP senden,
2. lokale Daten speichern,
3. Datei-Inhalte im App-Bereich lesen und schreiben,
4. Ergebnisse zeigen.

### Was React Native dafuer lokal gut kann
1. SQLite in der App.
2. Sicheren Speicher fuer Tokens.
3. Dateisystem im App-Sandbox-Bereich.
4. Chat-Oberflaeche, Tool-Logs, Auswahl von Modellen.

### Was React Native hier absichtlich nicht macht
1. Kein `child_process`.
2. Kein echtes `node-pty`.
3. Kein lokales Starten von `claude`, `codex` oder `gemini` direkt im App-Prozess.

### Deshalb passt die heutige Architektur
1. Schwerer KI-Ablauf liegt ausserhalb der App.
2. Mobile-App bleibt leicht und stabil.
3. Die App uebernimmt nur kontrollierte Ergebnisse.
4. So koennen wir trotzdem Tool-Calls im Chat zeigen.

## 3) Was haben wir selbst gebaut statt das Agent SDK direkt zu nutzen?

### Kurz gesagt
Wir haben die mobile Steuerung selbst gebaut.
Nicht als direktes `Claude Agent SDK im React-Native-Prozess`,
sondern als eigene Bridge-Schicht.

### Unsere eigene Schicht macht heute diese Aufgaben
1. Modell-Routing.
2. Laufmodus-Auswahl.
3. Setup-Status fuer Laptop, Termux und Online-Host.
4. Tool-Event-Anzeige im Chat.
5. Sichere Datei-Uebernahme in die Notiz-Persistenz.

### Was daran aehnlich zum Agent SDK ist
1. Es gibt Tool-Schritte.
2. Es gibt einen Ablauf ueber mehrere Aktionen.
3. Es gibt Ergebnis-Dateien.
4. Es gibt Sicherheitsregeln fuer erlaubte Pfade.

### Was daran anders ist
1. Die App selbst ist nicht der Agent-Host.
2. Die App ist nur die mobile Oberflaeche.
3. Der Agent-Host liegt heute auf Bridge, Companion oder Test-Host.

## 4) Koennte das ganz ohne Server direkt auf dem Geraet laufen?

### 4.1 Als reine App allein auf iOS oder Android
Kurzantwort: fuer den vollen Claude-Code- oder Agent-SDK-Weg eher nein.

### Warum?
Die offizielle Claude-Agent-SDK-Doku zeigt Laufzeiten wie:
1. Node.js,
2. Bun,
3. Deno,
4. Hosting in einer dauerhaften Arbeitsumgebung.

Die offizielle Claude-Code-Setup-Doku nennt aktuell:
1. macOS,
2. Ubuntu,
3. Debian,
4. Alpine,
5. Windows ueber WSL.

Android und iOS werden dort nicht als offizieller Zielweg genannt.

### Was bedeutet das fuer uns?
1. Direkt im React-Native-Prozess ist das kein sauber offizieller Weg.
2. Vor allem Shell, Prozess-Start und lange laufende Agent-Schritte sind das Problem.
3. Das Dateisystem ist nicht der Haupt-Blocker.
4. Der Haupt-Blocker ist die lokale Ausfuehrung von CLI und Agent-Loop.

### 4.2 Android mit Termux
Kurzantwort: als Testweg ja, als sauberer Produktweg nein.

### Wie das dann aussehen wuerde
1. Der Nutzer installiert `Termux` als extra App.
2. Darin laufen Node und ein lokaler Host.
3. Darin wuerde man dann `Claude Code` oder andere CLIs testen.
4. Die React-Native-App redet dann ueber `127.0.0.1` oder einen lokalen Port mit diesem Host.

### Wichtig dabei
1. Dann startet nicht die React-Native-App die CLI.
2. Sondern `Termux` startet die CLI.
3. Die App spricht nur mit einem lokalen Server.

### Ehrliche Einordnung
1. Das ist technisch interessant.
2. Das ist gut fuer eigene Tests auf Android.
3. Das ist aber fragiler als Laptop-Companion oder Remote-Backend.
4. Genau deshalb ist dieser Weg bei uns eher `POC` oder `Testweg`.

### 4.3 iOS direkt auf dem Geraet
Kurzantwort: noch schwieriger als Android.

### Warum?
1. Kein offizieller Claude-Code-Zielweg fuer iOS.
2. Zusatzwege wie `iSH` sind eher Bastel- oder Testwege.
3. Fuer eine normale App-Store-App ist das kein stabiler Standard.

### Fazit fuer Produktbetrieb
1. Standard fuer Nutzer bleibt `app_remote`.
2. Fuer das Team ist `laptop_companion` sinnvoll.
3. Android mit Termux kann ein Testweg sein.
4. iOS direkt lokal bleibt nur ein schwacher Experiment-Weg.

## 5) Dateisystem: React Native gegen Capacitor

### Die wichtigste Ueberraschung
Beim Dateisystem sind React Native und Capacitor naeher beieinander als beim Tool-System.

### Gemeinsamer Kern
Beide koennen:
1. im App-eigenen Bereich Dateien speichern,
2. JSON und Markdown lokal ablegen,
3. mit SQLite arbeiten,
4. ueber Picker Nutzer-Dateien importieren.

### Aber beide koennen nicht einfach
1. beliebige Systemordner frei lesen,
2. andere Apps durchsuchen,
3. lokal beliebige CLI-Prozesse starten wie auf einem Laptop.

### Kurzvergleich
| Thema | React Native / Expo | Capacitor |
|---|---|---|
| Lokale Dateien im App-Bereich | Ja | Ja |
| JSON/Markdown lokal speichern | Ja | Ja |
| SQLite lokal | Ja | Ja |
| Freier Zugriff auf ganze Festplatte | Nein | Nein |
| Echte lokale CLI direkt aus der App starten | Nein | Nein |
| Gut fuer Datei-first-Persistenz | Ja | Ja |
| Gut fuer Claude-Code-CLI direkt im App-Prozess | Nein | Nein |

## 6) Was gilt speziell fuer Capacitor?

### Das Gute
Capacitor hat mit dem offiziellen Filesystem-Plugin einen guten Dateiweg.
Die Doku nennt das sogar eine `NodeJS-like API` fuer Dateien.

### Was das konkret heisst
1. Dateien lesen.
2. Dateien schreiben.
3. Ordner im App-Bereich nutzen.
4. Auf Android auch mit Pfaden oder `content://`-URIs arbeiten.

### Was man aber nicht verwechseln darf
`NodeJS-like API` heisst hier nicht:
1. echtes Node.js in der App,
2. `child_process`,
3. Shell-Befehle,
4. Claude Agent SDK als direkter In-App-Host.

### Die echte Grenze bei Capacitor
Capacitor ist eine Web-App in einer nativen Huelle.
Fuer Geraetefunktionen nutzt man Plugins.
Das hilft beim Dateisystem.
Es loest aber nicht automatisch das CLI-Problem.

## 7) Was ist also der echte Unterschied zwischen React Native und Capacitor fuer unser System?

### Beim Speichern von Artefakten
Fast kein Grundproblem.
Beide koennen unsere Datei-first-Idee tragen:
1. `content.md`
2. `meta.json`
3. `quiz.json`
4. `cards/*.json`
5. `crosswords/*.json`

### Beim Agenten mit Tool-Calls
Hier ist der Unterschied kleiner als man zuerst denkt.
Denn das Kernproblem ist nicht `Datei speichern`,
sondern `lokal eine echte Agent-Umgebung mit Shell und CLI hosten`.

### Deshalb gilt fuer beide
1. Datei-first lokal: ja.
2. SQLite-Spiegel lokal: ja.
3. Direkter Claude-Code-Host im App-Prozess: nein.

## 8) Meine klare Empfehlung fuer Notedrill

### Produktweg
1. Mobile-App bleibt Client.
2. Agent-Ablauf laeuft ueber Backend oder Companion.
3. Ergebnisse landen ueber festen Vertrag in JSON und Markdown.

### Testweg
1. Android + Termux darf als Laborweg bleiben.
2. Aber nicht als einziger Standard.
3. iOS lokal direkt bleibt vorerst kein Zielweg.

### Warum das gut zu unserer Persistenz passt
1. Die KI kann trotzdem Dateien erzeugen.
2. Die App kann diese Dateien sauber anzeigen.
3. SQLite bleibt schneller Spiegel fuer Listen, Suche und Beziehungen.
4. So bleibt das System agentisch, ohne Mobile zu ueberfordern.

## 9) Klare Antworten auf deine direkten Fragen

### Funktioniert das heute in React Native?
Ja, weil die App selbst nicht die CLI ausfuehrt, sondern nur mit einer Bridge spricht.

### Kann eine installierte App einfach Claude Code lokal starten?
Im normalen Produktweg nein.

### Wuerde Android mit Termux theoretisch gehen?
Ja, als extra Testaufbau mit zusaetzlicher App und lokalem Host.
Aber das ist kein sauber offizieller Standard fuer Claude Code.

### Hat man in React Native Dateisystemzugriff?
Ja, aber nur im App-Sandbox-Bereich und ueber passende Mobile-APIs.

### Hat man in Capacitor Dateisystemzugriff?
Ja, ebenfalls im App-Bereich und ueber das Filesystem-Plugin.

### Ist Capacitor beim Dateisystem deutlich staerker als React Native fuer uns?
Nicht wirklich.
Fuer unser Problem ist der groesste Blocker nicht Datei-Zugriff, sondern CLI-Ausfuehrung.

## 10) Naechster sinnvoller Schritt
1. Diese Doku als Grundlage fuer die Chat-Zielarchitektur nutzen.
2. Danach eine zweite Doku schreiben:
   `welcher Agent-Weg ist Produktweg, welcher ist nur Testweg`.
3. Danach koennen wir die offene Entscheidung festziehen:
   `nur Bridge`, `Bridge plus Companion`, oder `Bridge plus experimentelles Termux`.

## Quellen im Projekt
1. `features/chat/components/interface/ConversationView.tsx`
2. `features/chat/components/store/useChatStore.ts`
3. `features/chat/components/store/useSetupStatusStore.ts`
4. `features/chat/components/messages/ToolAuditPanel.tsx`
5. `features/chat/components/interface/agent-note-upsert-service.ts`
6. `features/chat/components/interface/agent-note-artifact-service.ts`
7. `lib/agent/contracts/agent-note-upsert.ts`
8. `lib/agent/bridge/mobile-capability-boundary.ts`
9. `docs/architecture/notedrill-ki-zielarchitektur.md`
10. `docs/architecture/notedrill-ki-qa.md`
11. `docs/guides/mobile-expo-go-runbook.md`
12. `History/planung-ki-chat-ohne-serverpflicht.md`

## Offizielle Quellen
1. Anthropic Agent SDK Overview: https://docs.anthropic.com/en/docs/claude-code/sdk/sdk-overview
2. Anthropic Agent SDK TypeScript: https://docs.anthropic.com/en/docs/claude-code/sdk/sdk-typescript
3. Anthropic Agent SDK Hosting: https://docs.anthropic.com/en/docs/claude-code/sdk/sdk-hosting
4. Claude Code Setup: https://code.claude.com/docs/en/setup
5. Expo FileSystem: https://docs.expo.dev/versions/latest/sdk/filesystem/
6. Capacitor Filesystem: https://capacitorjs.com/docs/apis/filesystem
7. Capacitor Overview: https://capacitorjs.com/docs
8. Android app-specific storage: https://developer.android.com/training/data-storage/app-specific

## Kurz-Woerterbuch
1. Bridge: Ein Zwischenweg, der die Mobile-App mit einem Host fuer KI und Tools verbindet.
2. Companion: Ein kleiner lokaler Helfer auf Laptop oder Testgeraet.
3. Sandbox: Der geschuetzte Bereich einer App. Die App darf nicht ueberall ins System greifen.
4. Artifact: Eine erzeugte Datei, zum Beispiel JSON oder Markdown.
5. Agent-Loop: Mehrere KI-Schritte hintereinander, zum Beispiel lesen, planen, schreiben, pruefen.
