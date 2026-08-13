# Prompting-Tipps — globale Kurzfassung

**Lesen wenn:** Ein vager Wunsch konkretisiert oder ein größerer Projektprompt geschrieben wird.

## Grundregel

> So ausführlich wie nötig, so fokussiert wie möglich.

Mehr Text hilft nur, wenn er eine echte offene Frage beantwortet. Wiederholung, Fülltext und zusätzliche Adjektive machen einen Prompt nicht genauer.

## Was in einen guten Projektprompt gehört

1. **Ziel:** Was soll entstehen?
2. **Aktueller Mangel:** Was fehlt oder funktioniert schlecht?
3. **Priorität:** Was ist am wichtigsten?
4. **Schutz:** Was muss unverändert bleiben?
5. **Hauptquelle:** Welche Technik, Daten oder Assets tragen das Ergebnis?
6. **Reihenfolge:** Welche wenigen Schritte müssen nacheinander erfolgen?
7. **Hauptteile:** Was muss jeder wichtige Bereich konkret leisten?
8. **Fehlergrenzen:** Welche wenigen wahrscheinlichen Fehler sind zu vermeiden?
9. **Abnahme:** Was muss sichtbar oder technisch prüfbar sein?
10. **Lieferung:** Stack, Dateien, Titel, Installation, Port und Dokumentation.

Jede Anforderung steht an einem Hauptplatz. Ein Thema wird nicht in Einleitung, Pipeline, Einzelfunktion und Abschluss wiederholt.

## Vage Wünsche selbst konkret machen

Bei „besser“, „schöner“ oder „perfekt“:

1. letzte konkrete Kritik und betroffenen Bereich lesen;
2. schlecht, besser und unverändert festlegen;
3. Umsetzung, Priorität und Fertig-Kriterium bestimmen;
4. direkt arbeiten, ohne unnötige Rückfrage.

Nur fehlender Zugriff, ein Secret oder ein echter Widerspruch rechtfertigt eine Rückfrage.

## Promptform nach Aufgabe wählen

Es gibt keine universell beste Promptarchitektur:

- **Environment:** Raumaufteilung, Wege, Blickachsen, Dichte, Variation, Material und Atmosphäre konkret beschreiben.
- **Animation:** Vorbereitung, Timing, Ganzkörpereinsatz, Kontakt, Support und Recovery beschreiben.
- **VFX:** Form, Materialwirkung, zeitliche Beats, Interaktion, Lesbarkeit und technische Grenzen beschreiben.
- **Externe Assets oder Daten:** zuerst prüfen, ob die Quelle fachlich passt; danach Integration und technische Abnahme ordnen.

Systems Blueprint hilft, wenn Datenfluss und Integrationsreihenfolge das Hauptrisiko sind. Visual Director hilft, wenn Komposition und sichtbare Wirkung das Hauptrisiko sind. Acceptance-Kriterien helfen beim Abschluss, ersetzen aber keinen positiven Bauplan.

## Adjektive sinnvoll verwenden

Adjektive helfen, wenn sie eine sichtbare Entscheidung auslösen:

- „dicht“ plus klarer Dichteverlauf;
- „schwer“ plus längere Lastphase und kräftiger Follow-through;
- „glühend“ plus Farbverlauf, Emission und Abklingverhalten.

Sie helfen nicht als Stapel wie „episch, spektakulär, legendär, extrem hochwertig“. Bei Environment und VFX können Material- und Stilwörter nützlich sein; bei Animation müssen sie zusätzlich in Timing und Körpermechanik übersetzt werden.

## Externe Quellen zuerst prüfen

Ein technisch gültiges Mocap, Modell oder Datenset kann sichtbar ungeeignet sein. Deshalb:

1. Rohquelle ohne kaschierende Effekte prüfen;
2. fachliche Eignung sichtbar abnehmen;
3. einen repräsentativen Hero-Fall vollständig lösen;
4. erst danach auf viele Skills, Szenen oder Varianten skalieren.

Dateiformat, Lizenz, Messwerte und grüne Prüfskripte belegen technische Konsistenz, nicht automatisch gute Produktqualität.

## Was bisherige Tests knapp belegen

- Aus den [Boxer-Learnings](../../animation-review-hub-v1-gpt-5-6-sol/docs/animation/BOXER_V14_PROMPT_LEARNINGS.md): Zu kompakt lässt Entscheidungen offen; maximale Länge, Adjektivdichte oder Fehlerlisten sind kein Ersatz für eine fokussierte vollständige Bewegungsbeschreibung.
- Aus den [Katana-Learnings](../../animation-review-hub-v1-gpt-5-6-sol/docs/animation/KATANA_V15_PROMPT_LEARNINGS.md): Geordnete Integration half relativ, löste aber ungeeignete Primärbewegung nicht. Source-Fitness kommt vor Rig, VFX und UI.
- Aus den [Village-Learnings](../../animation-review-hub-v1-gpt-5-6-sol/docs/environment/JAPANESE_VILLAGE_PROMPT_LEARNINGS.md): Räumliche Art Direction half mehr als ein technisches Pflichtenheft. Organischer Content darf nicht über starre Objektquoten gesteuert werden.

Neue Testreihen wie Sakura werden als weitere Learning-Quelle ergänzt. Globale Tipps ändern sich nur, wenn ein Befund wiederholt oder domänenübergreifend trägt; sonst bleibt er in einer eigenen Bereichssektion.

## Stop-Regel

Ein Absatz bleibt nur, wenn er mindestens eine Frage neu beantwortet:

- Welche wichtige Entscheidung war offen?
- Welche Reihenfolge war unklar?
- Welcher wahrscheinliche Fehler wird konkret verhindert?
- Welche Abnahme fehlte?

Wenn keine Frage beantwortet wird, Absatz entfernen.

## Sauber lernen

1. Besten Prompt als Baseline einfrieren.
2. Baseline mit gleichem Modell, Effort, Kontext und Assets wiederholen.
3. Danach nur einen klaren Block ändern.
4. Mehrere Läufe und möglichst den Median vergleichen.
5. Messwert, Nutzerbeobachtung und vermutete Ursache trennen.
6. Nur wiederholt bessere Änderungen global übernehmen.

## No-Gos

- Wortzahl oder Metrik als Qualitätsziel.
- Unnötige Neben-, Diagnose- oder Kontrollsysteme.
- Lange Verbotsliste vor dem positiven Ziel.
- Adjektive oder Aktionsverben ohne konkrete Wirkung.
- Alle Anforderungen gleich stark priorisieren.
- Einen starken Prompt wegen eines lokalen Mangels komplett neu schreiben.
- Aus einem Einzelrun ein allgemeines Gesetz ableiten.
