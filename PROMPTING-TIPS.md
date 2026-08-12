# Prompting-Tipps — wann mehr Text wirklich hilft

**Lesen wenn:** Ein User nur „mach das besser“ sagt oder ein größerer Projektprompt geschrieben wird.

## Das Ziel

Der User soll keine perfekte technische Beschreibung liefern müssen. Die KI liest den vorhandenen Kontext und macht aus einem groben Wunsch selbst einen klaren Arbeitsauftrag.

Beispiel:

- Zu vage: „Mach die Animation besser.“
- Klarer: „Behalte Tempo und Trefferfolge. Verstärke Beinarbeit, Gewichtsverlagerung und Rumpfdrehung. Verhindere rutschende Füße und gekreuzte Beine. Fertig ist die Änderung, wenn jeder Schlag sichtbar aus dem Standbein angetrieben wird.“

Der zweite Prompt ist länger, weil er echte Fragen beantwortet. Er ist nicht besser, weil er einfach mehr Wörter enthält.

## Hilft ein längerer Prompt wirklich?

**Oft ja — aber nur mit nützlichen Details.**

Hilfreicher zusätzlicher Text erklärt:

- was genau besser werden soll;
- was unverändert bleiben muss;
- welche Schritte in welcher Reihenfolge nötig sind;
- welche typischen Fehler verhindert werden sollen;
- woran man ein gutes Ergebnis erkennt.

Nicht hilfreich sind:

- derselbe Wunsch in fünf Formulierungen;
- viele Adjektive ohne sichtbare Bedeutung;
- Fachwörter, die keine Entscheidung steuern;
- neue Features, die der User nie verlangt hat.

## Was unsere Boxer-Tests zeigen

In Part 3 gewann die ausführliche Variante alle drei direkten Vergleiche:

| Vergleich | Kompakt | Ausführlich | Gewinn |
| --- | ---: | ---: | ---: |
| V14.1 → V14.2 | 17 | 89 | +72 |
| V16.1 → V16.2 | 13 | 36 | +23 |
| V18.1 → V18.2 | 31 | 41 | +10 |

Das ist ein starkes Signal. Es beweist aber nicht, dass jeder zusätzliche Satz hilft. Die ausführlichen Varianten waren zugleich länger, genauer und klarer gegliedert. Besonders V14.2 erklärte Bewegungsphasen, Reihenfolge, erlaubte Korrekturen, Fehlerbilder und Abnahme viel genauer als V14.1.

Darum lautet die Regel nicht „immer maximal lang“, sondern:

> Schreibe so ausführlich wie nötig, damit die KI wichtige Entscheidungen nicht erraten muss.

## Was die KI bei einem vagen Wunsch macht

Wenn der User „besser“, „schöner“, „perfekt“ oder ähnlich grob schreibt:

1. letzte konkrete Kritik lesen;
2. betroffene Datei oder Funktion prüfen;
3. festlegen, was besser werden soll;
4. festhalten, was gleich bleiben muss;
5. Umsetzung und fertiges Ergebnis klar beschreiben;
6. direkt arbeiten, ohne unnötige Rückfrage.

Nur fehlender Zugriff, ein Secret oder ein echter Widerspruch rechtfertigt eine Rückfrage.

## Einfacher Kurzcheck

Vor der Umsetzung müssen diese fünf Fragen beantwortet sein:

1. Was ist aktuell schlecht?
2. Was soll danach konkret besser sein?
3. Was darf nicht kaputtgehen oder verändert werden?
4. Wie wird die Verbesserung umgesetzt?
5. Woran erkennen wir, dass sie fertig ist?

Fehlt eine Antwort, ergänzt die KI sie aus dem belegten Projektkontext. Sie erfindet dabei keine neuen Produktfeatures.

## Neue Promptvergleiche

Künftige Tests sollen nicht nur „kurz gegen lang“ vergleichen. Sonst wissen wir nicht, welcher Unterschied geholfen hat. Besser sind getrennte Varianten mit derselben Technik und demselben Inhalt:

- mehr nützliche technische Details;
- bildhafte Sprache mit konkreten Verben und Adjektiven;
- Fehler zuerst, danach Prioritäten und Abnahme;
- Beispiele gegen Negativbeispiele;
- klare Produktionsschritte gegen freie Fließtextbeschreibung.

Score, Promptlänge und Generierungsdauer werden zusammen bewertet. So lernen wir, **welche Art von Zusatzinformation** wirklich hilft.

## Quellen

- `animation-review-hub-v1-gpt-5-6-sol/docs/animation/BOXER_ANIMATION_PART_3_PROMPTS.md`
- `animation-review-hub-v1-gpt-5-6-sol/data/reviews/animation.json`
- Nutzerfeedback vom 12. August 2026 zu V14.1/V14.2
