# Prompt — simpler Coding Rules and prompt-file flow

## Source

- Date: `2026-08-11`
- Reference image: `C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1786475371844-s1vpynd3.png`
- Target named by user: `D:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension\shared-docs\CODING-RULES.md`

## Unchanged original

```text
Bild 1: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1786475371844-s1vpynd3.png
D:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension\shared-docs\CODING-RULES.md

Task
Prompt


Prompt datei wird in task datei immer mitgegeben

task datei, initial goal also die prompt datei

Prompt-Verbesserung:[HIER inwiefern es verbessert werden würde] So, ich habe eine sehr, sehr gute Idee. Mir ist was Gutes eingefallen, was ich vorher nicht betrachtet habe. Es wäre doch schlauer, wenn wir die Möglichkeit haben, mit Keywords zu arbeiten. Also jetzt ist halt die Frage, geben wir das, ja, wir geben das quasi als einmaligen Prompt mit. Es gibt ja diesen Prompt Enhancer. Ich möchte den, dass man den natürlich auch, also wenn man den aktiv hat, dann sollte, also klar, man kann den initial enhancen, aber wenn man den aktiv hat, dann sollte der anders funktionieren. Der sollte losgelöst sein von dem jetzigen Feature. Den jetzigen Feature kannst du eigentlich sozusagen rauskicken, weil den brauchen wir doch nicht. Nee, das jetzige Feature baust du raus. Du machst das anders. Man kann aber, obwohl, ja, du kannst den jetzigen Feature drin lassen, aber ich möchte das anders haben. Och, wie soll ich es erklären? Pass auf, wir haben doch, warum nicht dieselbe KI, die da für die Aufgabe verantwortlich ist, genau dasselbe, also der soll sich darum kümmern, um diesen Prompt zu verbessern und dann den verbesserten Prompt umzusetzen. Das heißt, das ist, glaube ich, besser, sinnvoller, weil die KI genau weiß, was man möchte, eventuell. Also, dass diese zwei Varianten bestehen. Einmal gibt es die Möglichkeit, den Prompt jetzt zu verbessern und dann haben wir ja gesagt, den Prompt Auto on Send. Ja, aber zwei Varianten. Einmal gibt es den, die KI, die arbeitet, lassen wir das machen, aber dann würden wir in den Coding Rules schreiben, der muss ja sowieso, was der machen muss, der muss ja eine Task-Datei erzeugen. In der Task-Datei, ja, in der Task-Datei schreiben wir dann rein, der soll schreiben, was der User geschrieben hat, das haben wir bestimmt irgendwo drin. Genau, ich pull mal nochmal, vielleicht kann sein, dass es verändert worden ist, die Task-Datei. Genau. Genau, wir schreiben rein, was der User gesagt hat und wie wir den Prompt verbessert haben. Und jetzt kommt das Ding, also wir geben der KI mit, wie sie den Prompt verbessern soll. Du hast, wir haben quasi mehrere Varianten zur Verfügung, dass wir auswählen können über Selector, was für eine Art von Verbesserung wir möchten. So ähnlich möchte ich das haben. Also nicht eine extra, das heißt, wir brauchen keine extra KI. Warum nicht einfach die KI, die schon dran arbeitet, der soll den Prompt, also der soll quasi, was gesagt worden ist und gleichzeitig dann unten schreiben, verbesserte Optionen. Und das soll er quasi in die Task-Datei verlinken. Was heißt das? Also wir haben so eine Task-Datei und wir haben eine Prompt-Datei. Die Task-Prompt-Datei wird in Task-Datei immer mitgegeben. Auch in jeden, auch wenn wir Context Condense machen, dann gibt es dazu auch immer die Task-Datei. Und in der Task-Datei muss die Prompt-Datei initiales Ziel, also ist die Prompt-Datei, okay? Die Prompt-Datei ist wichtig, um zu wissen, was der User gesagt hat und wie die KI das verstanden beziehungsweise verbessert hat. Okay? Das ist deutlich angenehmer, weil so kann man das Ganze immer schon in der Task-Datei verlinken. Das heißt, die KI kann ja nichts falsch machen. Die Task-Datei ist ja aufgebaut anhand der Prompt-Datei. Das heißt, du müsstest die Coding Rules eigentlich nur anpassen und das wär's dann. Dann hättest du schon das Ziel erreicht. Dann würde automatisch dieses Prompt Enhancing nämlich automatisch gemacht, ohne dass man extra dieses Feature einbauen muss. Aber man wählt quasi aus, wie der Prompt verbessert werden würde mit Keywords. Das heißt, in die Coding Rules schreibt man rein, welche Keywords es gibt und wir senden den Keyword mit. Oder, ja, schreib das vielleicht so, dass es flexibel ist. Du schreibst in den Coding Rules rein, falls Prompt Verbesserung mitkommt. Meistens ist das sowas wie Prompt Verbesserung. Das ist so aufgebaut und dann wie hier die Option, also hier, inwiefern es verbessert werden würde. So, in diesem Format, wenn dieser Format reinkommt, dann heißt es, das muss genauso passieren. Ansonsten soll nur das Gesagte als Prompt-Datei aufgeschrieben werden und in die Coding Rules referenziert werden, okay? Ich hoffe, du weißt, wie ich das, genau. Also pass dementsprechend die Coding Rules an. Versuch bitte die Coding Rules eventuell zu schauen, ob da zu viel Doppel steht und nicht ein bisschen, nee, ich versuche mal Sachen rauszukicken, weil irgendwie ist die Coding Rules mir zu voll geworden. Genau, ich kick da ein paar Sachen raus und dann kannst du mit der Aufgabe beginnen. Also ja, während ich, wenn ich dir das schicke, die Aufgabe, dann ist die Coding Rules schon eigentlich geleert.  Obwohl, mach du, schau mal, was ein bisschen zu viel ist, too much. Nicht zu viel, was kann raus? Also, was ist ein bisschen zu heftig? Was widerspricht sich, was ist doppelt? Genau, versuch mal, die Coding Rules-Datei schlanker zu machen. Also wirklich Sachen rauszukicken, die man nicht braucht, oder Sachen quasi raus in eine andere Datei. Wenn wir zum Beispiel über Frontend-Regeln, keine Ahnung, 3D-Sachen, könnten wir vielleicht das ein bisschen rauskicken zu einer anderen Datei. Genau, also dass das nicht zu viel... Auch Screenshot Guide, ne? Das ist irgendwie, die Coding Rules ist so überfüllt. Ich glaube, wir müssen nicht so viel... Das ist deutlich zu viel, genau.
```

## Improved prompt

1. Keep one linked prompt/task pair for every project-changing assignment.
2. Preserve the user’s original text unchanged; put any cleanup, sorting, or requested improvement in a separate improved prompt.
3. Let the same working AI improve and execute the goal without a second enhancer process.
4. Make the always-read Coding Rules shorter and use everyday words while keeping safety and delivery rules.
5. Put useful-work guidance for Subagents only in the enabled Direct or Workflow prompt; `off` must add no strategy block.

## Dated updates

### 2026-08-11 — Simpler language and active-only Subagent rules

#### Attachments

- `C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1786480924325-3zl1yq0h.png`
- `C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1786480931718-36mvd0nn.png`

#### Unchanged user update

```text
Bild 1: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1786480924325-3zl1yq0h.png
Bild 2: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1786480931718-36mvd0nn.png

### Subagents nur bei echtem Gewinn

- Kleine, sequenzielle oder eng gekoppelte Arbeit bleibt beim Hauptagenten.
- Nach großen unabhängigen Fachbereichen teilen, nie nach Mini-Aufgaben.
- Exklusive Dateien, Zustände und Task-IDs vergeben; bei Kollisionsrisiko einen Owner oder serielle Übergabe wählen.
- Kleinste ausreichende Agentenzahl nutzen; kein Agent für wenige Toolaufrufe, eine Datei oder einen einfachen Check.
- Auftrag nennt Task, Task-ID, Ziel, In-/Out-of-Scope, eigene Pfade, Abhängigkeiten, Rückgabe und Stoppgrenze; Prompt bleibt über `Initial goal` erreichbar.
- Hauptagent führt Ergebnisse zusammen, prüft Schnittstellen und wiederholt delegierte Arbeit nicht. Leider sind mir die Coding Rules noch sehr komplex. Da werden noch zu komplexe Fachwörter benutzt und da ist mir noch ein bisschen zu viel. Ich weiß nicht, was kanonische ist. Also die Begriffe gibt's überhaupt nicht. Benutzt keiner. Bitte nutze nur Alltagswörter. Es sei denn, es muss so sein. Du kannst es aber eigentlich mit Alltagswörtern immer hingekommen. Ich frag mich, warum kanonische reinkommt. Also ich habe noch nie kanonisch als Alltagswort gesehen. Das ist ein bisschen schade, dass du das immer noch nicht hinbekommen hast. Genau, ich frag mich, ob man das überhaupt mit Subagents reinsch- ich mach das raus mit Subagents, oder? Dass zum Beispiel in den Coding Rules die Subagent-Logik reinkommt, müssen wir jetzt nicht hinschreiben. Weil wir haben ja quasi so ein Subagent-System, da eventuell reinschreiben. Wenn das noch nicht da schon steht, wann man Subagents benutzen soll, dann genau das, was wir, das habe ich jetzt raus aus den Coding Rules gemacht. Also weil der Block gehört dann, der Block muss erst dann gesendet werden, wenn Subagents an ist, ja. Und wenn es an ist, müssen die Subagents verwendet werden, also sollten irgendwie verwendet werden. Weil es gibt einen Grund, warum wir die Subagents anhaben. Genau. Oder natürlich automatisch ermitteln, ja. Nee, wir machen das erst mal sox    Okay, ich schau dann weiter. Dann schaue ich weiter, was gibt. Ich schaue mal von oben nach unten. Verstehe den Auftrag. Halte dein Original fest. Plane nachvollziehbar, arbeite selbstständig und liefere eine saubere fertige Einheit. Okay, das passt eigentlich. Aber da könnte noch Ziel drinstehen, eventuell. Verbessere den Original auch. Arbeite selbstständig, klar, aber plane nachvollziehbar in einer Task-Datei. Halte das Original fest, eventuell verbessern in einer Prompt-Datei. Das könntest du als Ziel auch hinschreiben. Genau, Prompt und Task gehören zusammen. Die Prompt-Datei besitzt das Ziel, die Task-Datei leitet daraus die Scope-Phasenentscheidung, was? Ja, okay, das passt. Die Prompt-Datei besitzt das Ziel, könnte aber auch eine Verbesserung behalten. Also das Original, beziehungsweise versuche das so umzuschreiben, weil es kann also sein, dass wir sehr oft das Original verbessern möchten. Genau. Originaltext nie umschreiben, aber eine bessere Variante eventuell mit hinschreiben, so. Ja genau, Prompt Improvement Request, genau, das hast du ja unten geschrieben. User-Text in Originalsprache, meistens verbessert, ausgebessert, also Füllwörter weg, Duplikate weg und sortiert in Sektion, Problem, wie auch immer. Ich schreibe das selber mal rein. Genau, ich habe dir mal ein paar reingeschrieben. Ich frage mich, was Prompt Improvement Request nur bei echterem, ja, das vergesse ich. Drei und vier verstehe ich nicht. Fünf ist sehr schön, also das mit den Updates finde ich gut. Was ist ein Raw-Bereich? Im Raw-Bereich als Redacted mit kurzer Begründung markieren. Ich weiß nicht, ob man das extra speichern, ob man das extra als Regel darstellen muss, weil das weiß die KI eigentlich. Was ist eine Normalisierung? Zeilenenden und unsichtbare Endspaces für Markdown-Hygiene normalisiert. Keine Ahnung, was das heißen soll. Also das ist wirklich nicht gute Sprache. Und du schreibst auch mal bitte diese No-Gos, sowas wie normalisieren, what? Oder hier, kanonisch, hallo? Bist du komplett raus? Und dann schreibst du auch deine Fehler rein und was du stattdessen sagen sollst. Also das, was du jetzt geschrieben hast, ist zum Beispiel falsch. Wo kommt dieses kanonisch her? Also beim... Pass noch mal die Dateien so ein bisschen an. Ich bin noch nicht zufrieden. Das ist noch ein bisschen zu viel. Und sind diese Schnellchecks, meinst du diesen... Ja... Ja, das passt eigentlich. Genau, wir machen höchstens 1200 Zeilen pro Datei, genau. Statt 1600. Aber das habe ich geändert. Genau, passe noch mal bitte die Sprache an, das ist mir ein bisschen noch zu komplex.
```

### 2026-08-14 — Enhanced prompt naming and compact improvement rules

#### Unchanged user update

````text
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

Notes/enhance-popover-funktion-verbessern-notes.md du verbessserts nicht den popover das macht wer anders gerade!

Aber du versuchst dann ganz kurz zu erklären, vielleicht in sechs, sieben Sätzen, wie man einen guten Prompt schreibt. Der muss gar nicht so lang sein, genau. Versuch das mal so kompakt wie möglich zu halten, damit der Prompt von der KI verbessert wird. Aber wie wird der verbessert, ist halt die Frage, ne? Prompt verbessern. Wie soll der Prompt verbessert werden? Das sollte quasi irgendwo in irgendeiner Sektion geschrieben werden, in den Coding Rules. Ich weiß nicht genau, wo das geschrieben werden soll. Wir haben ja gesagt, also das ist, glaube ich, 38 bis 48, ich glaube, da geht's um dieses Unchanged Original. Was ist denn das? Also wichtig, dass man auch Beispiele hat von anderen Spielen, Adjektive einbaut, sowas quasi, ne? Und die Länge etwas vergrößert, dass das klar ist, was, aber noch Freiheit bietet. Sowas quasi. Also wirklich nur die besten Tipps reintun, wie man so einen Prompt verbessert. Also da, wo wir Aufbau der Prompt-Datei, das ist vielleicht interessant. Und wann man den Prompt verändert, ist auch interessant, ne? Mach das zu einer coolen kleinen Zeile, dann will ich das mal testen, ob das funktioniert. Und dann direkt auch committen.
D:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension\shared-docs\CODING-RULES.md

- `…enhanced-prompt.md` — feste Quelle für Usertext und mögliche Verbesserung;

Genau. Mach damit weiter und nebenbei kannst du das auch so machen, in den Coding Rules eventuell die Coding Rules so anpassen. Nee, also, okay, pass auf. Du änderst nicht die Popover-Funktion. Du machst das genau andersrum. Wenn jemand nicht jetzt keinen guten Prompt hat, okay? Wir haben ja momentan in den Coding Rules, glaube ich, die Regel. Schau mal in den Coding Rules nach. Die musst du anpassen. Das heißt, zukünftig soll, wenn irgendwelche Keywords mitkommen, verbessere oder mach das schöner oder sowas, dann soll der Prompt verbessert werden. Also wenn der Prompt schlecht ist, soll der verbessert werden. Das heißt aber, es wird keine, wir haben ja vorhin, wir haben ja gesagt, wir haben ja so eine Prompt-Datei, feste Quelle für User-Text und mögliche Verbesserung. Nein, das sollte anders sein, aber wenn die Verbesserung reinkommt, dann sollte die Datei Enhanced Prompt heißen. Das heißt, da steht das vorherige und dann das Verbesserte. Und man orientiert sich quasi an dem Verbesserten. Genau.


Optionale Kennzeile:

```text
Prompt-Verbesserung:[Keywords oder freie Anweisung]
```

- Groß-/Kleinschreibung sowie Bindestrich oder Leerzeichen dürfen abweichen.
- Der Klammerinhalt ist frei: etwa `kompakt`, `Architektur`, `Edge-Cases`, `Performance`, `UI/UX` oder Freitext.
- Leerer Inhalt und Platzhalter wie `[HIER …]` sind kein Auftrag. Dann keine verbesserte Fassung erfinden.
- Bei echtem Auftrag schreibt **dieselbe ausführende KI** das `Clear work goal` und setzt es um. Keine zweite KI nur für diesen Dateiablauf starten.
- Die Verbesserung darf Reihenfolge, Abnahme und nötige Sonderfälle klären, aber keine Fakten, Features oder Grenzen erfinden.
- Absicht, Sprache, Verneinungen, Pfade, Befehle, Referenzen, Maße und feste Eigenschaften bleiben erhalten. Das bessere Ziel ergänzt das Original und ersetzt es nie.

Ein Prompt-Enhancer im Produkt darf getrennt bestehen; dieser Dateiablauf braucht ihn nicht.

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
````

#### Improved prompt

Update only the prompt-file workflow in `shared-docs/CODING-RULES.md`; do not change the product Prompt Enhancer or its popover. Use `…-prompt.md` when no improvement is requested and `…-enhanced-prompt.md` when the user clearly asks to improve, beautify, clarify, expand, or otherwise refine the prompt. An enhanced prompt file must preserve the unchanged original, add a separate improved prompt, and make that improved prompt the working basis without deleting the original. Explain in six or seven compact sentences when and how to improve a prompt: sharpen goal, priority, structure, boundaries, acceptance, useful game references, and concrete adjectives; add enough detail for clarity while preserving creative freedom. Keep negations and empty placeholders safe, avoid invented required features, preserve the existing same-AI flow, and commit the documentation-only change without touching the concurrent popover work.
