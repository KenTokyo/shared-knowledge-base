# Chat History: context tokens recercheauftrag loop notizen

*Created on 4/29/2026, 11:56:00 PM*

<!-- UNIAI_HISTORY_META_START -->
- Session ID: `unknown`
- Created At (ISO): `2026-04-29T21:56:00.827Z`
- Last Updated At (ISO): `2026-04-29T21:56:00.827Z`
<!-- UNIAI_HISTORY_META_END -->

---

**You (Draft):**
Context und Tokens Recercheauftrag loop modus nicht aufhören, bis ca. 20 Markdown dateien erzeugt sind min 100 Zeilen jeweils hochwertige qUELENNE UND 
Reposiories

Context, was ist token, wie wird das berechnet, wie machen lbiraries, gibt es ölfffentliche libraries, wie nutzt das projekt d:\CODING\React Projects\uniai-chat\uniai-chat-vscode-extension token berechnungen bzw wie ist das implenmentiert, wei könnte man das in electron implem enteiren, wie hat das codex plugin oder ide es gseschafft sowas zu implenmenteiren also auto impact/condense + token zählen, wie kann man das global einbauen also für jedes mdoell?  shared-docs\context-und-tokens-docs 1. **Planungsvalidierung (ZWINGEND VOR CODE):**
   - User-Planung mitgegeben? → Lesen, prüfen ob Task enthalten
   - Task enthalten? → JA: Implementieren · NEIN: Planung erweitern
   - Keine Planung? → In `docs/[feature]/tasks/`
   - **ERST nach Planungserweiterung darf programmiert werden!**

Falls keine Masterplanung existiert: Tasks-Datei mit Phasen erstellen. Existiert bereits eine? Nicht überschreiben — diese Datei definiert deinen Workflow, halte dich an diese Regeln!

Danach phasenweise implementieren, was sinnvoll ist — alle Phasen durcharbeiten ohne aufzuhören. 

**Aber Dokumentiere nach jeder phase und arbeite im Loop weiter!:**

Weil du machst ein Kontext-condensing. Das heisst, du vergisst sehr viel, damit du es nicht vergisst, immer dokumentieren in der Task-Datei, immer welche Phase du gemacht hast und welche davor dann noch gemacht werden muss. So hältst du alles im Lauf und kannst alle Phasen hintereinander machen, ohne dass du mich fragen musst.

## 6.7 Phasen mit To-dos ist unser Phasenformat! (Pflicht)
Wichtig ist bei Phasen in Planungen, dass du die Phasen mit To-dos markierst. Also innerhalb von Phasen To-dos anlegen und dann schreiben, was genau gemacht worden ist.

**Beispiel:**
```markdown
### ✅ Phase NUMMER — Kurzbeschreibung *z. B. Architektur, Modus-Trennung, Save-Basis*
**Ziel:** Hier schreiben, worum es geht.
* [x] `Komponente XYZ` erzeugt (604 Zeilen Code), .....
* [ ] `AUFGABE ABC` implementieren.
**Referenzen:**
`Hier Pfade der Unterplanungen, Historien, Completed, Besprechungen angeben`
`Jeweils getrennt pro Zeile`
```

### Kommentar Sektion unter der Phasenplanung
Nach Abschluss bitte schreiben, an welchen Kriterien du dich gehalten hast, speziell also mit komma getrennt in einer Zeile 
und danach **Welche Auffäligkeiten/Fehler/Regelverstoße** dir aufgefallen sind, notieren und ein Refactoring Plan empfehlen, mitsamt aller Funde und nach Gewichtung sortieren
Kriterien eingehalten z.B. 

```markdown
## Kommentare
### Phase 1
**Eingehalten**: unter 700 Zeilen ✅, architektur ✅, Edge-Cases betrachtet ✅, ...
**Auffäligkeiten/Performance-Issues/Probleme/Kritische Findings (nach Schwere):**: 
1. 🔴 **Kritisch:** Start-Crash durch fehlerhafte QuizPack-Umwandlung
Beschreibung hierzu notieren, falls notwendig
Refactoring, Zeilenlimit überschrieben, Ungültige Tab-Werte entdeckt in Komponente XYZ und konnten eine Render-Schleife auslösen! Versehentlich angehängte Restzeilen entdeckt! Event-Werte blindcast entdeckt! State-Updates nicht idempotent - Rerender-Kette möglich!
2. 🟠 **Hoch:** über 700 Zeilen, Coding Regel gebrochen

### Phase 2....
```

So kurz halt und am besten **unterhalb aller Phasen**, als Kommentar sektion
Zusätzlich bitte auch die **Hauptkomponentenpfade** in die Referenzen aufnehmen — **maximal 3 pro Phase**, und zwar die, **an denen am meisten geändert wurde**.

- **Falls Auffäligkeiten/Performance-Issues/Probleme/Kritische Findings vorliegen** direkt Optimierungsplan erzeugen mit Verweis auf die Planung als Referenz, also im selben in `docs/[feature]/tasks/...optimierung-tasks.md` alle Findings dort warten und nach Abschluss aller Phasen in dieser Planung - erst danach die Optimierungs-tasks durchgehen und im Loop alles fixen!

# Weitere WICHTIGE Regeln
- Nach allen Änderungen also wenn du alle Phasen vollendet, erzeuge dann Masterplanung direkt um die Auffälligkeiten zu beheben, die du bei den Phasen festgestellt hast, falls diese noch nicht durch deine Änderungen behoben wurden, damit wir immer aufräumen und cleanen code haben

- Falls du dann auch die Auffälligkeiten behoben und die Phasen auch dokumentiert hast, auch dann melden und vorschlagen, welche Verbesserung man als nächstes machen könnte bzw. ein Feature was dir beim verbessern/entwickeln deiner vorherigen Aufgabe aufgefallen ist, was dieser App extrem helfen könnte!, Versuche also auch bewusst, Verbesserungen/Features zu finden, können auch kleine sein, aber was die App verbessern könnte! Kann alles sein, such dir das aus

BITTE KEIN MOJIBAKE, achte auf ENCODING
- Bitte alle verbesserungen/auffälligkeiten direkt auch mitfixen, die du entdeckt hast, während du an der Aufgabe dran bist OHNE PAUSE die dir gegeben worden ist und zwar OHNE Nachfrage und OHNE PAUSE, direkt verbessern! also aufschreiben, danach implementieren/fixen und als fixed markieren in der gleichen doku!!! und dokumentieren,
- Bevor Implementierung bzw. Planung - Suche mehrere Arten erstmal rauswie man das Problem lösen könnte, dann suche du die beste davon aus, um das Problem zu lösen, Feature zu implementieren..

condext condensing richtig gemacht, wie man das macht, wie öffnet man im hintergrund ienen neuen chat D:\CODING\React Projects\notedrill\notedrill-backend-nextjs\app\notes\components\(rightSidebar)\NotesRightSidebar.tsx D:\CODING\React Projects\notedrill\notedrill-backend-nextjs\components\notes\autoprocess\GlobalKiProcessHUD.tsx 

<div data-side="top" data-align="start" data-state="open" role="dialog" id="radix-:r28:" class="z-[var(--z-over..." tabindex="-1" style="--radix-popover...">
  <div ...>
  CTX-Status
Kein Kontext
AN
Belegung
Schätzung
~15K
von unbekannt
Modellfenster
Unbekannt
Aktiver Kon...
</div>
  in components/ui/popover.tsx
  in EmbeddedChatContextControl (at components/agentic/EmbeddedChatContextControl.tsx)
  in EmbeddedChatInput (at components/agentic/EmbeddedChatInput.tsx)

So, worum geht's? Ich brauche deine Hilfe bezüglich eines Problems. Was heisst ein Problem? Ich bin mir noch nicht sicher, ob wir das wirklich gut implementiert haben. Du sollst das prüfen, indem du Webfetch nutzt. Was ist überhaupt, was ist Kontext? Was ist Token? Wie wird das berechnet? Wie machen das Libraries? Das sollst du recherchieren. Gibt es öffentliche Libraries? Wie Inwiefern nutzt das das Projekt? Schick die mal Tokens und Kontext. Oder ne, wie nutzt das Tokenberechnungen bzw. wie ist das implementiert? Wie könnte man das in Electron implementieren? Für jede Frage, die ich jetzt gestellt habe, machst du Websearch und eine komplette Planung, ausführlich wie möglich, ja? Und auch, wie hat das Codex-Plugin oder IDE es geschafft? So was zu implementieren, also Auto-Impact plus Token counts oder Auto-Impact counts plus Token zählen. Wie kann man das global einbauen, also für jedes Modell? Und wie berechnet man das korrekt? Jede Frage, die ich dir jetzt, alle Fragen auflisten, da sind so circa 12, 13 Fragen. Jede Frage, die ich dir gestellt habe, eine Markdown-Datei und ausführlich wie möglich und dann Websearch mit Quellen, ja. So viele Quellen wie möglich. Ich möchte pro Recherche brauche ich mindestens 10 Quellen, musst du mir auflisten, ja. Das heißt, du recherchierst so lange wie möglich. Context und Tokens, Docs. Du packst das alles, ich möchte 15 oder irgendwie in der Richtung möchte ich Markdown-Dateien haben. Alles in dem Ordner, jede Markdown-Datei hat mindestens, ja, 100 Zeilen von, also ich will so ausführlich wie möglich für jedes Nutzer-Web-Recherche und du arbeitest quasi so lange wie möglich. Nicht warten, ja. So lange wie möglich recherchierst du. So viel wie möglich, jedes, weil das ein super schwieriges Thema ist und die KI macht da sehr viele Fehler, weil wir zukünftig noch und dann kommen die nächsten. Du kannst das auch direkt dann auch mitmachen. Kontext Condensing richtig gemacht, wie man das macht. Wie öffnet man im Hintergrund einen neuen Chat? Genau, wir haben ja ein Chatfenster. Leider kann ich dir das gerade nicht zeigen. Im Grunde genommen ist das das KI Wo ist das? Das ist die Sidebar, das ist die Notes Right Sidebar. Dort ist das irgendwo hinterlegt. Da haben wir so einen KI Tab und in diesem KI Tab haben wir Ich glaube, ich weiss nicht, ob das dieses Global Process hat, ist. Ich habe keine Ahnung. Irgendwo ist da so ein KI Chat. Und du machst eine Planung, wie man das dort implementiert, das Zählen von Kontext und dann eine weitere Planung. Wie könnten wir? Kontext Condensing oder Auto Impact genannt, implementieren mit Also wir haben ja sowas schon eigentlich, aber ich glaube, es ist noch nicht so weit fortgeschritten, dass wir sagen können, das könnte, das muss problemlos einwandfrei funktionieren. Ich möchte, dass so viel Arbeit gesteckt wird, dass es wirklich ohne zu testen instant funktioniert, weil wir das quasi recherchiert haben, weil wir das woanders gefunden haben. Du versuchst Repositories zu finden, alles Mögliche an Ressourcen, was du im Internet findest, um dieses Thema anzugehen. Und zwar das Auto, das es kondens wird. Also ein Prompt wird zwischengeschaltet. Die KI fasst alles zusammen, was sie geschrieben hat, öffnet und im Hintergrund wird dann ein neuer Chat geöffnet, nachdem sie die Antwort geliefert hat. Das heißt, wir müssen wissen, wie man einen Chat abbrechen kann. Mitten drin und dann eine Folgenachricht dem Chat mitteilen, dass er bitte alles zusammenfassen soll, damit ein nächster Mitarbeiter dran arbeitet. Das ist Auto Impact, okay? Aber was, dann müssten wir auch quasi diese Logik, ja. diese Logik. Was wollte ich sagen? Okay, Auto-Compact. Im Grunde genommen, dass ab einer bestimmten Tokenanzahl, sagen wir mal, wir haben 160.000 geschrieben. Sobald wir über 160.000 kommen, ja, und das muss halt immer gut berechnet sein, sofort wird quasi der Chat abgebrochen und die KI wird aufgefordert, das Ganze zusammenzufassen, weil sie daran nicht mehr arbeitet, weil ein anderer Mitarbeiter dran arbeitet, okay? Sie soll doch bitte alles zusammenfassen, was zum Thema gehört und alle Dateien referenzieren, sodass die KI direkt weitermachen kann, auch die Masterplanung oder die Planung oder die Task-Datei, dass die KI weiß, welcher Phase sie weitermachen soll und welche Phase quasi noch weiter gemacht werden soll. Das sind die Informationen, die die KI quasi bereitstellt für die nächste KI, damit die nächste KI quasi der Mitarbeiter weiter daran arbeiten kann, aber in einem neuen Chatfenster, nicht in dem gleichen Chatfenster. Grundsätzlich wird ein neuer Chatfenster erzeugt. Das ist die Logik dahinter. Und um diese zu erreichen, müssen wir erstmals die Kontext und die Tokens richtig zählen. Ich habe es noch nicht ausprobiert, aber ich glaube, es wird nicht funktionieren, weil dass wir kaum, dass wir uns das nicht richtig angeschaut haben. Bitte schau dir das genauer an, recherchier, auch dass es für mich gut lesbar ist, einfach, ja, in einfacher Sprache. Ich möchte ungefähr 20 Markdown-Dateien sehen, bevor du aufhörst zu arbeiten. Wenn du aufhörst zu arbeiten und ich sehe keine 20 Markdown-Dateien, dann haben wir ein Problem. Also in dem Rahmen, das muss ja jetzt schon Sinn machen, aber nach meinem Wissenstand so viel, wie ich dir jetzt gebe, solltest du in der Lage sein, so viel zu erzeugen. in den ordner shared-docs/context-und-tokens-docs alle markdown dateien dort einbauen