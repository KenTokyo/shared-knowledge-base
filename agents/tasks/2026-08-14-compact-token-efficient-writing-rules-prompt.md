# Kompakte, token-effiziente Schreibregeln — Prompt

## Source

- Datum: 2026-08-14
- Quelle: aktueller Userauftrag im Chat
- Anhänge: keine

## Unchanged original

Wichtig: Lies /AGENTS.md im Root.

---

Wichtig: Lies /shared-docs/CODING-RULES.md vollständig und halte dich an die dortigen Arbeits-, Kommunikations- und Lieferregeln.

---

# Antworten, Output und Denkweise
* Alltagswörter, direkte Verben und kompakte Stichpunkte verwenden.
* Ergebnis zuerst; Problem, Ursache und Änderung konkret nennen.
* Zahlen für Reihenfolgen, Pfeile für Abläufe, Checkboxen für Aufgaben, Icons zur Orientierung.
* Passend formatieren, nicht alle Elemente gleichzeitig nutzen.
* Füllwörter, Wiederholungen und unnötige Satzteile entfernen, wichtige Informationen erhalten.
* Schwierige Begriffe kurz erklären, keine erfundenen Abkürzungen.
* Keine langen Ich-Erzählungen oder unnötigen Aufgaben an den Nutzer abgeben.
* Echte Umlaute verwenden und Dokumentation auf Mojibake prüfen.
* Answer, outputs all in english, specially Gen Z style slang, very lit, very important stay in english, very basic, Gen Z style, Code in English aswell, i talk german to you

D:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension\shared-docs\CODING-RULES.md


## 1. Prompt-Datei und Task-Datei

Jeder Auftrag, der Projektdateien oder ein Projektartefakt ändert, erhält **vor dem ersten Edit** genau ein Paar:

- `…-prompt.md` — feste Quelle, wenn keine Prompt-Verbesserung beauftragt ist;
- `…-enhanced-prompt.md` — feste Quelle mit Original und verbesserter Fassung, wenn eine Prompt-Verbesserung beauftragt ist;
- `…-tasks.md` oder vorhandene Task-/Masterdatei — änderbarer Arbeitsplan.

Pro Paar gibt es genau **eine** der beiden Prompt-Dateien. Reine Fragen und Leseaufträge brauchen kein Paar. Ein kleiner Fix bekommt eine kurze Phase statt gar keiner Task-Datei.

Regeln für das Paar:

- Beide Dateien liegen im selben Taskordner, wenn das Projekt keinen anderen Ort vorgibt.
- Neue Paare teilen einen klaren Namensstamm: `<thema>-prompt.md` oder `<thema>-enhanced-prompt.md` plus `<thema>-tasks.md`.
- Die Task-Datei nennt direkt oben unter `## Initial goal` den relativen Prompt-Pfad.
- Die Task-Datei leitet Arbeitsumfang, Phasen, Entscheidungen und Stand aus der neuesten Fassung `Improved prompt` ab; ohne Verbesserung aus `## Unchanged original`. Den ganzen Usertext dort nie kopieren.
- Vorhandenen Plan fortführen. Fehlt seine Prompt-Datei, diese vor dem nächsten Edit aus dem noch verfügbaren Original anlegen; nicht mehr bekannte Teile als unbekannt markieren.
- Spätere Useränderungen mit Datum an dieselbe Prompt-Datei anhängen. Kommt erst später ein echter Verbesserungsauftrag, die Datei einmal zu `…-enhanced-prompt.md` umbenennen und den Task-Link ändern; keine zweite Prompt-Datei anlegen.
- Früheren Text und frühere Verbesserungen nie umschreiben. Die Aufgabe ist nicht fertig, wenn die Prompt-Datei fehlt, der Link kaputt ist oder der Plan dem maßgeblichen Prompt widerspricht.

### Aufbau der Prompt-Datei

1. `## Source` — Datum, Chat-/Dateihinweis und Anhänge.
2. `## Unchanged original` — geschützter Beleg des Usertexts in Originalsprache und Originalreihenfolge; nicht aufräumen oder als bessere Fassung ausgeben.
3. `## Improved prompt` — Pflicht nur in `…-enhanced-prompt.md`; diese Fassung steuert Plan und Umsetzung.
4. `## Dated updates` — spätere Useränderungen mit Datum und unverändertem Text; eine dazu verlangte `#### Improved prompt`-Fassung steht getrennt direkt darunter und ist ab dann die Arbeitsbasis.

Im unveränderten Original bleiben Füllwörter, Wiederholungen, Schreibweise, Pfade, Befehle, Zahlen, Bildhinweise und Grenzen stehen. Geheimnisse nie speichern; an ihrer Stelle `[REDACTED: secret]` schreiben.
"Die" So, wir brauchen neue Regel. Wenn wir, immer wenn wir Tipps oder Prompt-Regeln oder was auch immer schreiben, dann müssen die sehr kompakt sein. Immer stichpunktartig, zum Beispiel Coding Rules, immer wenn ich, das muss da schon ganz oben stehen. Wenn, wenn, Dateien angepasst werden, also Learnings, Zusammenfassungen, dann muss das immer sehr kompakt sein. Also da muss das versucht werden, in so wenig wie möglich, in so wenig wie möglich, ja, zu schreiben. Verstehst du, was? Zum Beispiel, ich finde dieses, da wo, zum Beispiel Regeln für das Paar. Ich habe mal KI gesagt, die soll die Coding Rules anpassen. Und dann ist mir aufgefallen, da wird so was wie Füllwörter verwendet und so was wie die, ne, also so Artikel die oder ein, das sollte nicht vorkommen. Das kannst du auch direkt wieder korrigieren. Ne, wir schreiben auf jeden Fall hin, so wenig wie möglich, also so token-effizient wie möglich. Genau.

CHAT-TITEL-PFLICHT:
Erzeuge in deiner ersten Antwort genau eine Titel-Metadatenzeile, sobald das Ziel dieser Nachricht klar ist:
CHAT_META::Titel: [konkreter fachlicher Titel, 11-20 Wörter]

Regeln:
- Erst den Auftrag vollständig verstehen (Nachricht und genannte Dateien), dann den Titel setzen. Nicht raten.
- Der Titel benennt die konkrete Arbeit mit echten Nomen und Aktionsverben: Bereich, Komponente, Was wird gemacht.
- Verboten sind generische Titel ("Fix issue", "Update", "New Chat"), Phasen-Präfixe ("Phase 1"), Systemprompt-/Handover-Text und eine Description-Zeile.
- Höchstens eine Titelzeile pro Antwort, den aktuell gültigen Titel niemals wiederholen.
- Einen NEUEN Titel nur dann, wenn die Arbeit klar zu einem anderen Thema gewechselt ist; frühere Titel bleiben erhalten.

Gute Beispiele:
CHAT_META::Titel: Klasse Schwertkämpfer - Neue Skillpalette, VFX-System, UI-Hotbar - Shader-Einbau und Animations-Update
CHAT_META::Titel: Shop UI - Neue UI-Architektur, 3D-Preview, Voice-Input und überarbeiteter Warenkorb-Flow
CHAT_META::Titel: KI-Chat - UI-Verbesserungen, einfachere Inputs, mobil konformer machen

## Dated updates
