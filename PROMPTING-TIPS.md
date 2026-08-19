# Prompting-Tipps — nur Regeln, die wirklich helfen

**Zweck dieser Datei:** kurze, direkt anwendbare Promptregeln. Keine technischen Messprotokolle, Laufzeitberichte, Toolbeschreibungen oder langen Versuchserklärungen.

## Grundregel

> **Short-first:** Mit dem kürzesten vollständigen Prompt starten. Nur bei einem konkreten Mangel gezielt verlängern.

Ein vollständiger Kurzprompt nennt Ziel, Umfang, geschützte Baseline, Gestaltungsfreiheit und wichtigste Qualitätsrichtung. Alles entfernen, was nur wiederholt, verwaltet oder beeindruckend klingt.

## Was wirklich hilft

### 1. Ziel und Priorität zuerst

Nenne zuerst:

- was entstehen soll;
- was sichtbar am wichtigsten ist;
- was unverändert bleiben muss;
- woran ein gutes Ergebnis erkennbar ist.

Nicht alle Anforderungen gleich stark gewichten.

### 2. Adjektive gezielt platzieren

Gut gewählte Adjektive können kreative Ergebnisse stark steuern. Sie stehen direkt bei dem Nomen, das sie verändern, statt als Schmuckliste am Promptende:

- **Bezug:** „skulpturale Formen“, „leuchtende Materialien“, „rhythmisches Timing“.
- **Wirkung:** Das Wort verändert eine sichtbare oder funktionale Entscheidung.
- **Breite:** Wenige unterschiedliche Dimensionen abdecken, Synonyme vermeiden.
- **Freiheit:** Wirkung vorgeben; konkrete Lösung, Namen und Gestaltung offenlassen.

Geeignete Dimensionen:

- VFX → Form, Material/Licht, Timing/Nachwirkung, Lesbarkeit/Finish;
- UI → Hierarchie, Dichte, Interaktion, Rückmeldung;
- Animation → Vorbereitung, Gewicht, Kontakt, Recovery;
- Text → Ton, Präzision, Struktur, Zielgruppe.

### Drei gute und drei schlechte Kurzbeispiele

| Bereich | Gut | Schlecht |
|---|---|---|
| VFX | „Erweitere dieselbe Library um 20 weitere VFX. Wähle Skills und Namen selbst. Gestalte **skulpturale, dimensionale Formen**, **leuchtende, transluzente Materialien**, **dynamische Bewegung**, **klare Lesbarkeit** und ein **hochwertiges Finish**.“ | „Erzeuge 20 epische, fantastische, perfekte, extrem hochwertige VFX.“ |
| Animation | „Der Angriff wirkt **gewichtig**: klare Vorbereitung, hüftgeführte Beschleunigung, fester Kontakt und kurze, kontrollierte Recovery.“ | „Die Animation soll realistisch, cool, flüssig, krass und AAA sein.“ |
| UI | „Baue eine **kompakte Informationsfläche** mit **klarer Hierarchie**, **ruhigen Grundflächen** und **unmittelbarer Fehlerrückmeldung**.“ | „Erzeuge ein modernes, schönes, cleanes, professionelles Premium-UI.“ |

### 3. Was die Bewertungen stützen

- Elemental V20.3: `91/100`; kompakte, geordnete VFX-Palette und viel Freiheit.
- Elemental V20.2: `68/100`; ähnliche Adjektivdichte, aber schwächere Vermittlung.
- Elemental V20.6: `40/100`; lange Acceptance Matrix ersetzte keinen starken positiven Bauplan.
- Boxer V14.2: `89/94`; ein längerer Prompt kann bei komplexer Bewegung gewinnen.
- Kurze Katana-Prompts: `15/18`; Kürze rettet keine ungeeignete Quelle oder schwache Baseline.
- Boxer V14.4: 112 Adjektivtreffer bei `30/100`; Menge allein ist kein Qualitätshebel.

Der neue sehr kurze Plus-20-VFX-Follow-up erzeugte laut Nutzerprüfung ebenfalls außergewöhnlich starke Effekte. Das stützt **Short-first auf einer starken Baseline**, ist ohne Wiederholung aber noch kein allgemeiner Beweis.

Globale Richtung: wenige relevante Dimensionen, nicht redundante Adjektive, positiver Auftrag und freie Lösungswahl. Gewinnerwörter nicht blind auf andere Domänen kopieren.

### 4. Produktionsprompt und Lernexperiment trennen

Vor dem Schreiben festlegen, welcher Modus gilt:

- **Produktion:** Das bestmögliche bekannte Ergebnis liefern. Bewährte Steuerung erhalten und nur nötige Änderungen ergänzen.
- **Experiment:** Eine benannte Hypothese prüfen. Genau eine Variable ändern; Baseline, Scope, Modell, Effort, Seed und Bewertung konstant halten.

Eine absichtlich geschwächte Variante darf nicht als Qualitäts-Follow-up verkauft werden. Vergleichsläufe starten von derselben frischen Baseline; sequentielle Änderungen desselben Ergebnisses sind Produktentwicklung, kein kontrollierter Vergleich. Prompt-IDs dokumentieren Herkunft, schaffen aber keine Isolation.

### 5. Das Aufmerksamkeitbudget des Prompts schützen

Die stärksten Signale stehen früh und bleiben relativ dominant. Bewährte Reihenfolge:

1. Ziel und wichtigste Ergebnisqualität;
2. relevante Qualitätsdimensionen;
3. konkreter Inhalt und Umfang;
4. wenige unveränderliche Grenzen;
5. sichtbare oder funktionale Abnahme;
6. Installation und Liefervertrag.

Eine große Infrastrukturmigration, ein neues Datenmodell oder umfangreiche Diagnostik ist ein eigener Hauptauftrag. Wenn gleichzeitig kreative Qualität verlangt wird, die Aufgaben trennen oder eine klare Primärpriorität setzen. Mehr technische Vollständigkeit kann das Ergebnis verschlechtern, wenn sie den eigentlichen Qualitätsauftrag sprachlich verdrängt.

### 6. Einen positiven Bauplan geben

Beschreibe zuerst, wie das gute Ergebnis aussehen und funktionieren soll. Danach nur wenige wahrscheinliche Fehler nennen.

Lange Verbots-, Reject- oder Failure-Listen ersetzen keinen guten Entwurf. V20.6 verwendete eine ausführliche Acceptance Matrix und erreichte nur `40/100`.

### 7. Die richtige Promptform wählen

- Sichtbare Komposition ist das Hauptrisiko → konkrete Art Direction.
- Bewegung ist das Hauptrisiko → Phasen, Support, Kraftkette und Kontakt.
- Integration ist das Hauptrisiko → Quelle, Reihenfolge und Zuständigkeiten.
- Abschluss ist das Hauptrisiko → kurze Abnahmekriterien.

Kein Promptformat ist immer das beste.

### 8. Gute Quellen vor Vollintegration prüfen

Ein technisch gültiges Mocap, Modell oder Asset kann sichtbar ungeeignet sein.

1. Rohquelle prüfen.
2. Einen repräsentativen Hero-Fall vollständig lösen.
3. Erst danach auf viele Skills oder Varianten erweitern.

Eine schlechte Primärquelle wird durch mehr Prompttext, Rigging oder VFX nicht automatisch gut.

### 9. Follow-ups als Änderung schreiben

Bei einer starken Baseline nicht das ganze Projekt neu erklären. Nenne nur:

- welche Baseline geschützt wird;
- was neu oder besser werden soll;
- welche Hauptunsicherheit geschlossen werden muss;
- welche sichtbare Abnahme gilt.

Eine starke Baseline lokal verbessern, nicht komplett neu schreiben.

## Praktische Längenroute

1. **Short:** Bei starker Baseline mit zwei bis sechs Sätzen starten: Änderung, Freiheit, kuratierte Qualitätsrichtung.
2. **Medium:** Nur einen konkret sichtbaren Mangel ergänzen, etwa schwache Silhouette oder unlesbares Timing.
3. **Long:** Nur wenn Quelle, Architektur, Integration, Reihenfolge oder Abnahme wirklich ungeklärt sind.
4. **Ab etwa 1.500 Wörtern:** streng prüfen, welche Absätze keine neue Entscheidung klären.

Wortzahl und Adjektivzahl sind keine Qualitätsziele. Der kürzeste Prompt gewinnt, der alle wichtigen offenen Entscheidungen trägt.

## Stop-Regel

Ein Absatz bleibt nur, wenn er mindestens eine neue Frage beantwortet:

- Welche wichtige Entscheidung war offen?
- Welche Reihenfolge war unklar?
- Welcher wahrscheinliche Fehler wird verhindert?
- Welche sichtbare Abnahme fehlte?

Wenn nichts davon zutrifft, Absatz löschen.

## No-Gos

- unnötige technische Neben- und Diagnosesysteme;
- Messprotokolle oder Toolerklärungen im eigentlichen Projektprompt;
- dieselbe Anforderung mehrfach formulieren;
- lange Fehlerlisten vor dem positiven Ziel;
- viele gleichbedeutende Superlative;
- Adjektive ohne klaren Bezug oder beobachtbare Folge;
- domänenspezifische Gewinner-Wortlisten blind auf andere Aufgaben kopieren;
- Fachwort-, Adjektiv- oder Wortzahl als Qualitätsziel;
- ungeeignete Quellen durch mehr Politur kaschieren;
- aus einem einzelnen Lauf ein allgemeines Gesetz machen;
- einen bewiesenen lokalen Qualitätsmechanismus still entfernen oder mit Infrastruktur überdecken;
- Produktionsauftrag und absichtliches Grenzexperiment vermischen;
- kumulative Batches im selben veränderten Projekt als kontrollierte Promptvarianten behandeln.

## Weiterführende Learnings

- [Boxer: fokussierte vollständige Bewegungsbeschreibung](../../animation-review-hub-v1-gpt-5-6-sol/docs/animation/BOXER_V14_PROMPT_LEARNINGS.md)
- [Katana: Source-Fitness vor Integration](../../animation-review-hub-v1-gpt-5-6-sol/docs/animation/KATANA_V15_PROMPT_LEARNINGS.md)
- [Village: sichtbare Art Direction vor Technikbudget](../../animation-review-hub-v1-gpt-5-6-sol/docs/environment/JAPANESE_VILLAGE_PROMPT_LEARNINGS.md)
- [Domain Elemental: kuratierte Adjektivpalette](../../animation-review-hub-v1-gpt-5-6-sol/docs/vfx/ELEMENTAL_SANDBOX_PROMPT_LEARNINGS.md)
