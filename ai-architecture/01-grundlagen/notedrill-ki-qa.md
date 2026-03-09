# Notedrill Mobile: KI Q&A in einfacher Sprache

Stand: 8. März 2026

## Worum es hier geht
Diese Fragen und Antworten erklären den aktuellen Stand so, dass man ihn schnell versteht.

## 1. Brauchen wir unbedingt Claude Code?
Nein.

Wir brauchen nicht unbedingt Claude Code selbst.
Wir brauchen vor allem:

1. einen Agent-Loop,
2. Werkzeuge,
3. sichere Datei-Verträge,
4. klare Kostenregeln.

Claude Code ist nur ein möglicher Host oder Anbieter-Weg.

## 2. Kann eine KI mit nur API-Key auch Tool-Calls machen?
Ja, oft schon.

Aber:

1. Das Modell muss Tool-Aufrufe unterstützen.
2. Wir müssen den Ablauf drum herum bauen.
3. Nur der API-Key allein macht noch keinen fertigen Agenten.

## 3. Warum fühlt sich ein CLI-Agent schlauer oder schrittweiser an?
Weil er meist in einer Schleife arbeitet.

Das bedeutet:
1. erst planen,
2. dann Werkzeug nutzen,
3. Ergebnis prüfen,
4. wieder weitermachen.

Ein einfacher Chat-Aufruf endet oft nach einer einzigen Antwort.

## 4. Ist MCP das Gleiche wie ein Agent?
Nein.

MCP ist eher wie eine Steckdose für Werkzeuge.
Der Agent ist derjenige, der entscheidet, welches Werkzeug wann benutzt wird.

## 5. Heißt das: MCP allein löst unser Problem nicht?
Genau.

MCP hilft bei:
1. Datenquellen,
2. Werkzeugen,
3. Erweiterbarkeit.

MCP löst aber nicht automatisch:
1. den Loop,
2. die Kostenlogik,
3. die Mobile-Grenzen.

## 6. Kann die installierte App direkt Codex, Gemini CLI oder Claude Code starten?
Nein, nicht sauber im normalen App-Prozess.

Das ist auf Android und iOS nicht der richtige Produktweg.

## 7. Warum nicht?
Weil Mobile-Apps nicht wie ein normaler Laptop mit Shell und frei startbaren Prozessen arbeiten.

Kurz:
1. Dateien ja,
2. SQLite ja,
3. Desktop-CLI im App-Prozess nein.

## 8. Geht es auf Android mit Termux?
Ja, als Testweg.

Dann startet aber Termux den Host.
Die App selbst bleibt nur der Client.

## 9. Geht es auf iPhone oder iPad direkt lokal?
Im Alltag nicht als sauberer Produktweg.

Das ist höchstens ein Experiment.

## 10. Kann ein ChatGPT-Abo die API ersetzen?
Nicht allgemein.

Wichtig:
1. Ein Abo ist ein Produktzugang.
2. Ein API-Key ist ein Entwicklerzugang.
3. Beides kann sich bei einem Anbieter überschneiden, muss es aber nicht.

## 11. Ist Codex CLI damit kostenlos?
Nicht pauschal.

Der Stand am 8. März 2026 ist:
1. Codex kann mit ChatGPT-Konto oder API-Key genutzt werden.
2. Welche Nutzung inklusive ist, hängt vom Plan ab.
3. Für die Produktarchitektur dürfen wir uns nicht blind auf einen Plan verlassen.

## 12. Ist Gemini CLI günstig?
Ja, im Vergleich sehr oft.

Der offizielle Stand, den ich geprüft habe:
1. Login mit Google-Konto ist möglich.
2. Es gibt einen freien Bereich mit Limits.
3. Zusätzlich gibt es Gemini-API-Preise für API-Key-Wege.

## 13. Warum ist Gemini CLI für uns so interessant?
Weil es drei Dinge gut verbindet:
1. günstiger Einstieg,
2. echter Agent-Stil mit Tools,
3. guter Companion-Kandidat.

## 14. Was ist mit Qwen Code?
Qwen Code ist spannend als günstiger Zusatzweg.

Warum?
1. Es gibt einen offiziellen CLI-Agenten.
2. Es gibt kostenlose oder günstige Einstiegspfade.
3. Für uns ist es aber eher Zusatzweg als erster Hauptweg.

## 15. Was ist mit OpenCode?
OpenCode ist eher eine Hülle für viele Anbieter.

Das ist gut, wenn man flexibel bleiben will.
Es ist aber nicht automatisch kostenlos nur wegen OpenCode selbst.

## 16. Brauchen wir dann überhaupt noch ein eigenes System?
Ja, ein kleines eigenes System schon.

Aber nicht alles neu erfinden.

Wir brauchen vor allem:
1. einen eigenen Lauf-Vertrag,
2. eigene Datei-Regeln,
3. eigene Mobile-Anbindung,
4. eigene Kosten- und Sicherheitsregeln.

## 17. Müssen wir also ein eigenes „Claude Code“ bauen?
Nein, nicht komplett.

Das wäre zu groß.

Besser ist:
1. einen schlanken Notedrill-Orchestrator bauen,
2. vorhandene CLIs und APIs daran andocken,
3. immer denselben Datei-Vertrag nutzen.

## 18. Was ist der beste Produktweg?
Remote-Orchestrator plus feste Datei-Verträge.

Das heißt:
1. App bleibt stabil,
2. Android und iOS laufen sauber,
3. lokale CLIs sind nicht Pflicht für Nutzer.

## 19. Was ist der beste Dev-Weg?
Ein Companion auf Laptop oder PC.

Dort können echte CLIs laufen:
1. Codex CLI,
2. Gemini CLI,
3. Claude Code,
4. Qwen Code,
5. OpenCode.

## 20. Kann ChatGPT-Apps oder ein Connector unsere App ersetzen?
Nein.

Das ist eher ein Zusatzkanal.
Zum Beispiel:
1. für Recherche,
2. für Wissenszugriff,
3. für externe ChatGPT-Nutzung.

Die eigentliche Mobile-App-Architektur ersetzt das nicht.

## 21. Lohnt sich Supabase MCP für Notedrill?
Vielleicht, aber eher als Zusatz.

Sinnvoll wäre es zum Beispiel für:
1. Recherche auf Projektwissen,
2. Admin- und Dev-Werkzeuge,
3. späteres interne Datenabfragen.

Nicht sinnvoll wäre es, damit sofort den ganzen Schreibkern zu ersetzen.

## 22. Was muss im Projekt als Nächstes konkret geändert werden?
Die wichtigsten Punkte sind:

1. echter Lauf-Vertrag für Tool-Schritte,
2. echte Artefakt-Übergabe,
3. saubere Trennung von Remote, Companion und Testweg,
4. Provider-Modi für Abo, API-Key und Premium,
5. klare Kosten- und Rechte-Regeln.

## 23. Warum ist der jetzige Backend-Stand noch nicht genug?
Weil die heutigen Bridge-Routen im Next.js-Stand zwar passende Namen tragen, aber noch nicht den vollen Agent-Lauf liefern.

Kurz:
1. Tool-Felder sind noch leer,
2. echte Artefakt-Übergabe ist noch nicht komplett,
3. dadurch bleibt eine Lücke zwischen Mobile-Erwartung und Host-Wirklichkeit.

## 24. Ist das schlecht?
Nein.

Es ist sogar gut, weil:
1. der Mobile-Teil schon vorbereitet ist,
2. die Datei-Prüfung schon da ist,
3. jetzt klar ist, wo der nächste Umbau hinmuss.

## Kurz-Wörterbuch
1. Agent-Loop: Mehrere kleine KI-Schritte statt nur einer Antwort.
2. Companion: Ein Zusatz-Host auf Laptop oder PC.
3. MCP: Ein Standard-Steckplatz für Werkzeuge und Datenquellen.
4. Provider: Der KI-Anbieter oder KI-Weg.
5. Vertrag: Eine feste Form, wie Daten gespeichert und übergeben werden.
