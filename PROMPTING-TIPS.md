# Prompting-Tipps — ausführliche, umsetzbare Arbeitsaufträge

**Lesen wenn:** Ein Nutzerprompt vage ist, ein komplexes Projekt erzeugt werden soll oder eine Promptserie vorbereitet wird.

## 1. Grundregel

Komplexe One-shot-, Projekt- und Implementierungsaufträge werden standardmäßig **ausführlich und operationalisiert** formuliert. Ein kurzer Nutzertext bleibt als unverändertes Original erhalten, wird aber nicht ungeprüft als Arbeitsauftrag weitergereicht.

„Ausführlich“ bedeutet:

- Entscheidungen, Reihenfolge und Zuständigkeiten sind klar;
- Qualitätswörter werden in beobachtbares Verhalten übersetzt;
- Grenzen, Fehlerfälle und zu schützendes Verhalten sind genannt;
- die Abnahme sagt, wann die Arbeit wirklich fertig ist.

Es bedeutet **nicht**, denselben Wunsch mehrfach zu wiederholen, künstlich Wörter anzuhängen oder neue Features zu erfinden. Länge ist ein Nebenprodukt vollständiger Spezifikation, nicht das alleinige Ziel.

Bestehende kompakte Prompts dürfen als historische Vergleichsdaten bestehen bleiben. Neue kompakte Varianten entstehen nur noch, wenn der Nutzer ausdrücklich einen kontrollierten Promptlängen-Test verlangt.

## 2. Beleg aus Boxer Animation Part 3

Drei Direktvergleiche nutzten innerhalb ihres Paars dieselbe Technikbasis, denselben Seed, dieselben Skills, Zieldauern, Controls und VFX-Grenzen. Die ausführliche Variante gewann alle drei gespeicherten Bewertungen:

| Paar | Kompakt | Ausführlich | Differenz |
| --- | ---: | ---: | ---: |
| V14.1 → V14.2 | 17 | 89 | +72 |
| V16.1 → V16.2 | 13 | 36 | +23 |
| V18.1 → V18.2 | 31 | 41 | +10 |
| Mittelwert | 20,3 | 55,3 | +35,0 |

Promptumfang:

| Paar | Wörter kompakt/ausführlich | Absätze kompakt/ausführlich |
| --- | ---: | ---: |
| V14.1/V14.2 | 520 / 1.269 | 6 / 16 |
| V16.1/V16.2 | 525 / 1.302 | 6 / 16 |
| V18.1/V18.2 | 563 / 1.747 | 6 / 31 |

Der Nutzer berichtete beim ausführlichen V14.2-Lauf ungefähr 24 Minuten zusätzliche Generierungszeit. Das passt zu mehr ausgeführter Arbeit, ist allein aber kein Qualitätsbeweis.

### Was der Versuch belegt

- In diesem Aufbau war ausführlich in `3/3` Paaren besser.
- Die stärkste Verbesserung trat bei derselben technischen Richtung auf: V14.2 schlug V14.1 um 72 Punkte und den bisherigen Bestwert von 70.
- Mehr explizite Umsetzungslogik kann die ausgeführte Architektur und das Endergebnis stark verändern, obwohl die grobe Produktidee gleich bleibt.

### Was der Versuch nicht isoliert

Die Paare variierten gleichzeitig **Länge und Anweisungspräzision**. Deshalb ist „mehr Wörter verursachen bessere Qualität“ nicht sauber bewiesen. Die belastbare Regel lautet:

> Komplexe Prompts so weit ausführen, bis Architektur, Reihenfolge, Qualitätsgrenzen, Fehlerfälle und Abnahme keinen wichtigen Interpretationssprung mehr offenlassen.

## 3. Warum V14.2 deutlich stärker steuernde Informationen enthält

V14.1 nennt bereits die richtige Technik, das gewünschte Tempo und wichtige Verbote. Viele Entscheidungen bleiben jedoch in Sammelbegriffen wie „phase-aware“, „amplify“, „lock planted feet“ oder „prioritize clean contacts“ verborgen.

V14.2 macht daraus einen ausführbaren Vertrag:

1. **Kalibrierung vor Korrektur** — Restpose, Knochenachsen, Vorwärtsrichtung, Hüfthöhe, Proportionen, Root-Skalierung, Boden und Blickrichtung werden vor der Bewertung vereinheitlicht.
2. **Geordnete Bewegungsphasen** — neun Marker von Guard bis stabiler Rückkehr legen fest, wann welche Änderung wirken darf.
3. **Explizite Messdaten** — Kontakte, Beckenbewegung, Blickrichtung, Gelenkgeschwindigkeiten und Guard-relative Posen werden gespeichert.
4. **Begrenzte Verstärkung** — nur im Capture vorhandene Bewegung darf mit glatten Verstärkungen gleicher Richtung deutlicher werden.
5. **Lebendige Übergänge** — Atmung, Guard-Anpassung, Beckenbewegung, Gegenbewegung und Kopfreaktion dürfen zwischen Treffern nicht einfrieren.
6. **Phasentreue Zeitsteuerung** — nur informationsarme Lücken werden gekürzt; Kontakt-, Takeoff-, Apex- und Landereihenfolge bleiben erhalten.
7. **Geordnete Kontaktkorrektur** — erst Retargeting, Verstärkung und Timing, dann kleine Root-/Beckenkorrektur, zuletzt zentimeterkleine Bein-IK.
8. **Vollständige Skill-Abläufe** — jede Animation besitzt konkrete Vorbereitung, Lastaufnahme, Angriff, Kontakt, Nachbewegung und Recovery.
9. **Benannte Fehlerbilder** — gekreuzte Beine, kollabierende Knie, Foot Skating, eingefrorener Rumpf, Waist-Fold und unkontrollierte Landung sind ausdrücklich ausgeschlossen.
10. **Deterministische Abnahme** — Replay und Guard-Reset beginnen aus demselben Root-, Kontakt- und VFX-Zustand.

Die KI muss dadurch weniger entscheidende Lücken selbst erraten. Das erhöht die Chance, dass sie die richtige technische Reihenfolge tatsächlich baut statt nur passende Begriffe im Ergebnis zu erwähnen.

## 4. Automatische Verbesserung vager Nutzerprompts

Folgende Formulierungen lösen immer eine Konkretisierung vor dem ersten Implementierungsedit aus:

- „mach das besser“;
- „mach das schöner“;
- „mach das perfekt“;
- „optimier das“;
- „fix die Animation/UI/Performance“;
- ähnliche Wünsche ohne benannte Qualitätsmerkmale oder Abnahme.

Ablauf:

1. **Original schützen** — Nutzertext, Verneinungen, Pfade, Zahlen, Referenzen und feste Eigenschaften unverändert aufbewahren.
2. **Kontext lesen** — letzte konkrete Nutzerkritik, bestehende Task-Datei, zuständige Hauptquelle, relevante Daten und erlaubte Referenzen prüfen.
3. **„Besser“ übersetzen** — aus belegten Mängeln konkrete Eigenschaften und beobachtbare Ergebnisse ableiten.
4. **Arbeitsvertrag ausführen** — Ziel, Architektur, Reihenfolge, Grenzen, Fehlerfälle und Abnahme ergänzen.
5. **Widerspruchsprüfung** — sicherstellen, dass keine Nutzergrenze verloren ging und kein neues Produktfeature erfunden wurde.
6. **Umsetzen** — nicht auf eine zweite KI oder einen separaten Prompt-Enhancer warten.

Wenn der Kontext die gewünschte Achse bereits zeigt, wird selbstständig die fachlich beste Option gewählt. Nur ein echter äußerer Blocker wie fehlender Zugriff, Secret oder widersprüchliche Pflichtdaten rechtfertigt eine Rückfrage.

## 5. Mindestvertrag für komplexe Prompts

Ein komplexer Arbeits- oder Generierungsprompt ist erst bereit, wenn diese acht Inhalte konkret genug vertreten sind. Eigene Überschriften sind hilfreich, aber nicht zwingend.

1. **Ergebnis** — Was soll nachher funktionieren oder sichtbar sein?
2. **Ausgangslage** — Welcher aktuelle Mangel oder belegte Stand wird verbessert?
3. **Schutzvertrag** — Was muss unverändert bleiben?
4. **Hauptquelle und Architektur** — Welche Datei, Datenquelle oder technische Instanz ist verantwortlich?
5. **Reihenfolge** — Welche abhängigen Schritte müssen in welcher Ordnung erfolgen?
6. **Qualitätsmerkmale** — Woran ist gutes Verhalten konkret erkennbar?
7. **Fehler- und Sonderfälle** — Welche typischen falschen Ergebnisse müssen verhindert werden?
8. **Abnahme und Lieferung** — Welche erlaubten Checks, Artefakte, Dokumentation und Abschlussdaten sind nötig?

Für eine komplexe Aufgabe reicht eine Ein-Zeilen-Wiederholung des Nutzerwunsches nie. Ein Prompt darf erst kurz bleiben, wenn die Aufgabe selbst klein ist und alle acht Punkte entweder trivial oder bereits eindeutig im lokalen Vertrag beantwortet sind.

## 6. Qualitätswörter operationalisieren

Ein Adjektiv ohne Verhalten ist keine ausreichende Anweisung:

| Vage | Umsetzbar |
| --- | --- |
| „schönere UI“ | visuelle Hierarchie, Abstände, Kontrast, Zustände, responsive Reihenfolge und zu schützende Interaktionen benennen |
| „bessere Animation“ | Vorbereitung, Gewichtsverlagerung, Support-Kontakt, Beschleunigung, Treffer, Nachbewegung und Recovery benennen |
| „mehr Performance“ | Engpass, Messgröße, Datenmenge, erlaubte Änderung und zu schützende Qualität benennen |
| „perfekt“ | feste Abnahmepunkte und bekannte Fehlerbilder nennen; keine absolute Fehlerfreiheit behaupten |
| „wie die Referenz“ | qualitätsbestimmende Mechanik, Datenfluss, Timing, Zustände und sichtbare Eigenschaften Ende zu Ende erfassen |

Die Konkretisierung muss aus Nutzerfeedback, Projektzustand, Referenz oder belastbarer Fachlogik stammen. Adjektivketten ohne Mechanik erhöhen nur Textmenge.

## 7. Erlaubte Ableitung und verbotene Erfindung

**Erlaubt:**

- nötige Implementierungsdetails aus vorhandener Architektur ableiten;
- klare Reihenfolge und Zuständigkeit festlegen;
- bekannte Fehlerfälle aus dem aktuellen Mangel ergänzen;
- eine mess- oder beobachtbare Abnahme formulieren;
- bei mehreren passenden Wegen begründet den fachlich stärksten wählen.

**Verboten:**

- nicht verlangte Produktfeatures ergänzen;
- feste Maße, Inhalte, Pfade oder Technologien still ändern;
- Widersprüche durch kreative Annahmen verdecken;
- „länger“ durch Wiederholungen oder bedeutungslose Fachwörter simulieren;
- eine Vermutung als gemessenen Fakt ausgeben.

## 8. Kurzprüfung vor der Umsetzung

- [ ] Ist jedes wichtige „besser/schöner/perfekt“ in konkretes Verhalten übersetzt?
- [ ] Sind Hauptquelle, Datenfluss oder technische Verantwortung benannt?
- [ ] Ist die Reihenfolge abhängiger Schritte klar?
- [ ] Sind feste Grenzen und zu schützendes Verhalten erhalten?
- [ ] Besitzt jeder wichtige Teil eine erkennbare Abnahme?
- [ ] Sind typische Fehlerbilder und Sonderfälle abgedeckt?
- [ ] Enthält der Prompt keine erfundenen Features oder künstliche Wiederholung?

Bei einem `Nein` wird der Arbeitsauftrag vor dem Edit weiter konkretisiert.

## 9. Künftige Promptvergleiche

Nach diesem Ergebnis sollten neue Produktprompts nicht mehr standardmäßig „kompakt gegen ausführlich“ testen. Beide Varianten beginnen auf ausführlichem Qualitätsniveau. Pro Vergleich wird nur eine Vermittlungsachse verändert, zum Beispiel:

- technische Reihenfolge;
- Beispiele gegen Negativbeispiele;
- Abnahmekriterien früh gegen spät;
- fachsprachliche gegen alltagssprachliche Erklärung;
- tabellarische gegen narrative Struktur.

Technologie, Produktumfang, Modell, Kontext, Seed, Assets und Abnahme bleiben gleich. Zusätzlich zu Score und Notizen werden Promptumfang und Generierungsdauer gespeichert. So wird messbar, **welcher Bestandteil** hilft, statt erneut Präzision und Länge gleichzeitig zu verändern.

## Quellen

- `animation-review-hub-v1-gpt-5-6-sol/docs/animation/BOXER_ANIMATION_PART_3_PROMPTS.md`
- `animation-review-hub-v1-gpt-5-6-sol/data/reviews/animation.json`
- Nutzerfeedback vom 12. August 2026 zu V14.1/V14.2
