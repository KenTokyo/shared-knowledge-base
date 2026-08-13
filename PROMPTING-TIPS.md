# Prompting-Tipps — wann mehr Text wirklich hilft

**Lesen wenn:** Ein User nur „mach das besser“ sagt oder ein größerer Projektprompt geschrieben wird.

## Das Ziel

Der User soll keine perfekte technische Beschreibung liefern müssen. Die KI liest den vorhandenen Kontext und macht aus einem groben Wunsch selbst einen klaren Arbeitsauftrag.

Beispiel:

- Zu vage: „Mach die Animation besser.“
- Klarer: „Behalte Tempo und Trefferfolge. Verstärke Beinarbeit, Gewichtsverlagerung und Rumpfdrehung. Verhindere rutschende Füße und gekreuzte Beine.“

Der zweite Prompt ist besser, weil er echte Fragen beantwortet — nicht weil er mehr Wörter enthält.

## Hilft ein längerer Prompt?

**Nur bis die wichtigen Entscheidungslücken geschlossen sind. Danach kann zusätzlicher Text schaden.**

Hilfreicher Zusatztext erklärt:

- was genau besser werden soll;
- was unverändert bleiben muss;
- welche Schritte in welcher Reihenfolge nötig sind;
- welche wenigen typischen Fehler verhindert werden sollen;
- woran man ein gutes Ergebnis erkennt.

Nicht hilfreicher Zusatztext:

- wiederholt dieselbe Anforderung;
- verlangt interne Mess- und Kontrollsysteme, die niemand braucht;
- stapelt Adjektive oder Aktionsverben ohne klare Mechanik;
- beginnt mit einer langen Verbotsliste;
- macht jede Einzelheit gleich wichtig;
- schreibt einen bereits sehr guten Prompt vollständig neu.

## Was die Boxer-Tests zeigen

Direkter High-Vergleich derselben V14-Technik:

| Version | Wörter | Score |
| --- | ---: | ---: |
| V14.1 — zu kompakt | 520 | 17 |
| **V14.2 — ausführlich und fokussiert** | **1.269** | **89** |
| V14.3 — maximaler Systems Blueprint | 2.392 | 52 |
| V14.4 — viele Bilder, Adjektive und Verben | 1.812 | 30 |
| V14.5 — Failure-First und Abnahmematrix | 1.945 | 50 |

V14.2 erreichte in einem zusätzlichen Max-Lauf `94`. Dieser Lauf ist wegen des anderen Modell-Efforts kein sauberer Direktvergleich, zeigt aber, dass V14.2 nicht nur einmal stark funktionierte.

Das Ergebnis korrigiert die frühere Vermutung „länger ist besser“:

- Zu kurz kann wichtige Entscheidungen offenlassen.
- Noch länger als ein bereits vollständiger Prompt ist nicht automatisch besser.
- V14.3–V14.5 ergänzten mehr Architektur, Bildsprache oder Verbote, aber keine entsprechend besseren Resultate.

Die brauchbare Regel lautet:

> Ein guter Prompt ist so ausführlich wie nötig und so fokussiert wie möglich.

## Warum zu viel schaden kann

Ein LLM hat begrenzte Aufmerksamkeit und Arbeitszeit. Zusätzliche Anforderungen können:

- den Fokus vom sichtbaren Ergebnis auf Nebensysteme verschieben;
- Prioritäten verwässern;
- dieselbe Aufgabe mehrfach und leicht unterschiedlich formulieren;
- zu vielen nur teilweise gebauten Systemen führen;
- eine kreative Bewegung durch zu viele Fehlerprüfungen vorsichtig und steif machen.

Das sind plausible Erklärungen aus den Prompttexten und Scores, keine isoliert bewiesenen Einzelursachen. Ein Modelllauf enthält immer auch normale Streuung.

## Vage Wünsche selbst konkret machen

Wenn der User „besser“, „schöner“ oder „perfekt“ schreibt:

1. letzte konkrete Kritik lesen;
2. betroffene Datei oder Funktion prüfen;
3. festlegen, was besser werden soll;
4. festhalten, was gleich bleiben muss;
5. Umsetzung und fertiges Ergebnis klar beschreiben;
6. direkt arbeiten, ohne unnötige Rückfrage.

Nur fehlender Zugriff, ein Secret oder ein echter Widerspruch rechtfertigt eine Rückfrage.

## Einfacher Promptaufbau

Für größere Aufgaben reichen meistens diese Teile:

1. Ziel und aktueller Mangel.
2. Eine technische Hauptquelle.
3. Kurze geordnete Umsetzung.
4. Zu schützendes Verhalten.
5. Konkrete Anforderungen je Hauptteil.
6. Wenige lokale Fehlerhinweise.
7. Sichtbare oder prüfbare Abnahme.
8. Lieferung und feste Grenzen.

Jede Anforderung hat einen Hauptplatz. Sie wird nicht in Einleitung, Pipeline, Einzelfunktion und Abschluss viermal neu erzählt.

## Stop-Regel

Ein zusätzlicher Absatz bleibt nur, wenn er mindestens eine neue Frage beantwortet:

- Welche wichtige Entscheidung war offen?
- Welcher wahrscheinliche Fehler wird konkret verhindert?
- Welche Reihenfolge war unklar?
- Welche Abnahme fehlte?

Beantwortet er nichts davon, wird er entfernt.

## No-Gos

- Wortzahl als Qualitätsziel verwenden.
- Einen Produktprompt in ein Lehrbuch oder internes Pflichtenheft verwandeln.
- Viele Adjektive mit technischer Präzision verwechseln.
- Viele Aktionsverben ohne eindeutige Reihenfolge stapeln.
- Mit einer langen Liste von Fehlern beginnen.
- Alle Anforderungen gleich stark priorisieren.
- Einen starken Baseline-Prompt wegen eines kleinen Mangels komplett umschreiben.
- Aus einem einzelnen Lauf ein allgemeines Gesetz ableiten.

## Wie das System wirklich lernt

1. Besten Prompt als Baseline einfrieren.
2. Baseline unverändert zwei- oder dreimal wiederholen, um normale Schwankungen zu sehen.
3. Danach nur **einen kleinen Block** ändern.
4. Modell, Effort, Kontext, Assets und Bewertungsroute gleich halten.
5. Mehrere Läufe vergleichen und den Median verwenden.
6. Nur wiederholt bessere Änderungen als globale Regel übernehmen.

Für V14 bedeutet das: V14.2 unverändert wiederholen und anschließend nur die zwei schwachen Skillabschnitte zur Beinarbeit ändern. V14.3–V14.5 änderten zu viele Textbereiche gleichzeitig.

## Kurzcheck

1. Was ist aktuell schlecht?
2. Was soll konkret besser sein?
3. Was darf nicht verändert werden?
4. Wie wird es umgesetzt?
5. Woran erkennen wir, dass es fertig ist?
6. Wiederholt der Prompt etwas ohne neue Information?
7. Kann jetzt ein Absatz entfernt werden, ohne eine Entscheidung zu verlieren?

## Quellen

- `animation-review-hub-v1-gpt-5-6-sol/docs/animation/BOXER_V14_PROMPT_LEARNINGS.md`
- `animation-review-hub-v1-gpt-5-6-sol/docs/animation/BOXER_ANIMATION_PART_3_PROMPTS.md`
- `animation-review-hub-v1-gpt-5-6-sol/docs/animation/BOXER_ANIMATION_PART_4_PROMPTS.md`
- `animation-review-hub-v1-gpt-5-6-sol/data/reviews/animation.json`
