# Vorlage: Kunden-Projektstatus, Leistungsumfang, Abnahme und Kalkulation

**Vorlagenversion:** 1.0<br>
**Geeignet für:** bestehende Software, Prototypen, Übernahmen und unvollständige Kundenprojekte<br>
**Ziel:** aus belegtem Ist-Stand einen verständlichen, abnehmbaren und modular kalkulierbaren Auftrag machen

> Platzhalter in `[eckigen Klammern]` ersetzen. Hinweise mit `VORLAGE-HINWEIS` vor dem Kundenversand entfernen.

---

# Teil A — Kundenheft

## A1. Deckblatt

**Projekt:** [Projektname]<br>
**Kunde:** [Firma / Ansprechpartner]<br>
**Auftragnehmer:** [Firma / Ansprechpartner]<br>
**Dokumentversion:** [Version]<br>
**Stand:** [Datum]<br>
**Status:** [Entwurf / abgestimmt / freigegeben]<br>
**Zweck:** Projektstatus, Leistungsumfang, Angebot und Abnahme

## A2. Ergebnis in einem Satz

[Ein ehrlicher Satz: Was ist vorhanden und was fehlt bis zum vereinbarten Ziel?]

**VORLAGE-HINWEIS:** Keine Werbesprache. „Code vorhanden“ nicht mit „fertig“ verwechseln.

## A3. Warum dieses Dokument verwendet wird

Dieses Heft verbindet:

- **Kundenbedarf:** Was soll erreicht werden?
- **Umsetzung:** Welche Arbeitsblöcke sind dafür nötig?
- **Abnahme:** Woran erkennen beide Seiten ein fertiges Ergebnis?
- **Kalkulation:** Wie entsteht der angebotene Aufwand?

Ein klassisches Lastenheft allein reicht bei bestehender Software oft nicht. Vorhandene Funktionen müssen zuerst gegen Code, Daten und erlaubte Prüfungen bestätigt werden.

## A4. Statuszeichen

| Zeichen | Bedeutung |
|---|---|
| ✅ | belegt und für den vereinbarten Umfang abgenommen |
| 🟡 | vorhanden, aber noch nicht vollständig praktisch geprüft |
| 🔴 | fehlt, ist fehlerhaft oder blockiert das Ziel |
| ⚪ | Kundenentscheidung steht aus |
| ➕ | mögliche spätere Erweiterung |

## A5. Prioritäten

| Stufe | Bedeutung |
|---|---|
| Muss | ohne diesen Punkt kein vereinbartes Kernziel |
| Soll | wichtig für einen guten Arbeitsablauf |
| Kann | sinnvoll, aber nicht zwingend zum ersten Start |
| Nicht jetzt | bewusst außerhalb des aktuellen Angebots |

## A6. Kurzbewertung

### Bereits nutzbar oder vorzeigbar

- [Funktion mit Beleg]
- [Funktion mit Beleg]
- [Funktion mit Beleg]

### Vor dem Ziel noch nötig

- [Blocker]
- [Blocker]
- [wichtiger Restpunkt]

### Empfehlung

[Zum Beispiel: Demo möglich / Pilot möglich / Live-Start erst nach Muss-Blöcken]

## A7. Funktionsübersicht

| Bereich | Status | Beleg | kurze Bewertung |
|---|---:|---|---|
| [Bereich 1] | [Zeichen] | [Code / Daten / Prüfung] | [Bewertung] |
| [Bereich 2] | [Zeichen] | [Code / Daten / Prüfung] | [Bewertung] |
| [Bereich 3] | [Zeichen] | [Code / Daten / Prüfung] | [Bewertung] |

---

## A8. Arbeitsblock-Vorlage

Diesen Abschnitt pro Leistungsbereich kopieren.

### [Kennung] — [verständlicher Bereichsname]

**Status:** [Zeichen]<br>
**Priorität:** [Muss / Soll / Kann / Nicht jetzt]

#### Ziel

[Ein Satz aus Kundensicht.]

#### Bereits vorhanden

- [belegte Funktion]
- [belegte Funktion]

#### Noch offen

- [Lücke oder Entscheidung]
- [Lücke oder Entscheidung]

#### Enthaltene Arbeiten

- [konkrete Arbeit]
- [konkrete Arbeit]
- [konkrete Arbeit]

#### Nicht enthalten

- [klare Abgrenzung]
- [externe Leistung]

#### Messbare Abnahmekriterien

- [ ] [Auslöser] führt genau zu [messbarem Ergebnis].
- [ ] [Fehlerfall] erzeugt [erwartete sichere Reaktion].
- [ ] [Berechtigte Person] kann [Aktion]; [unberechtigte Person] nicht.
- [ ] [gespeicherter Vorgang] bleibt nach [Neuladen / Wiederholung] korrekt.

#### Beitrag des Kunden

- [Daten, Konto, Text, Musterdatei oder Entscheidung]
- [verantwortliche Person]
- [Freigabetermin]

#### Aufwand und Unsicherheit

- Aufwand: [von–bis Personentage]
- Sicherheit der Schätzung: [hoch / mittel / niedrig]
- größte Unsicherheit: [konkreter Grund]

---

## A9. Bekannte Fehler und Risiken

| Kennung | Dringlichkeit | sichtbare Auswirkung | Beleg | empfohlene Änderung |
|---|---:|---|---|---|
| BUG-001 | Blocker | [Auswirkung] | [Quelle] | [Änderung] |
| BUG-002 | Hoch | [Auswirkung] | [Quelle] | [Änderung] |
| RISK-001 | Mittel | [Auswirkung] | [Quelle / Annahme] | [Begrenzung] |

**Regel:** Bestätigte Fehler und offene Annahmen getrennt kennzeichnen.

## A10. Kundenentscheidungen

| Entscheidung | Auswahl / Antwort | verantwortlich | fällig bis |
|---|---|---|---|
| [Entscheidung] | [Optionen] | [Person] | [Datum] |
| [Entscheidung] | [Optionen] | [Person] | [Datum] |

## A11. Empfohlenes Vorgehen

1. Fragenbogen ausfüllen.
2. Muss-Umfang auswählen.
3. offene Fachregeln bestätigen.
4. Angebot je Arbeitsblock freigeben.
5. je Block gegen klare Kriterien abnehmen.
6. Gesamtfreigabe erst nach bestandenem Startcheck.

## A12. Regeln für neue Wünsche

Jeder neue Wunsch erhält:

- Kennung, zum Beispiel `CR-001`;
- Beschreibung und sichtbaren Nutzen;
- Einfluss auf Kosten und Termin;
- geänderte Abnahmekriterien;
- Entscheidung „jetzt“, „später“ oder „nicht enthalten“.

| Kennung | Wunsch | Kostenwirkung | Terminwirkung | Entscheidung |
|---|---|---:|---:|---|
| CR-___ | [Beschreibung] | [Wert] | [Wert] | ☐ jetzt ☐ später ☐ nein |

## A13. Rollen und Mitwirkung

### Auftragnehmer

- technische Umsetzung
- nachvollziehbare Schätzung
- vereinbarte Prüfungen
- Fehlerbehebung im beauftragten Umfang
- Abnahmedokumentation

### Kunde

- echte Fach- und Stammdaten
- externe Konten und freigegebene Inhalte
- zeitnahe Entscheidungen
- fachliche und sichtbare Abnahme

### Gemeinsame Verantwortung

- Umfang und Priorität
- Sonderfallregeln
- Restpunkte
- schriftliche Gesamtfreigabe

## A14. Abnahmeprotokoll

| Arbeitsblock | Kriterien erfüllt | offene Restpunkte | freigegeben von | Datum |
|---|---:|---|---|---|
| [Block 1] | ☐ | [Text] | [Name] | [Datum] |
| [Block 2] | ☐ | [Text] | [Name] | [Datum] |

### Gesamtfreigabe

- [ ] alle Muss-Kriterien erfüllt
- [ ] Restpunkte schriftlich akzeptiert
- [ ] Zuständigkeiten geklärt
- [ ] externe Fachfreigaben dokumentiert
- [ ] Sicherung, Überwachung und Rückfallplan aktiv

**Freigabe Kunde:** __________________<br>
**Freigabe Auftragnehmer:** __________________<br>
**Datum:** __________________

---

# Teil B — Kundenfragenbogen

## B1. Ansprechpartner und Ziel

| Frage | Antwort |
|---|---|
| Firma | [Antwort] |
| fachliche Ansprechperson | [Antwort] |
| technische Ansprechperson | [Antwort] |
| Person für Freigaben | [Antwort] |
| gewünschter Zieltermin | [Antwort] |
| Budgetrahmen netto | [Antwort] |
| wichtigstes Geschäftsziel | [Antwort] |

## B2. Startumfang

| Bereich | Muss | Soll | Kann | Nicht jetzt |
|---|---:|---:|---:|---:|
| [Bereich 1] | ☐ | ☐ | ☐ | ☐ |
| [Bereich 2] | ☐ | ☐ | ☐ | ☐ |
| [Bereich 3] | ☐ | ☐ | ☐ | ☐ |

## B3. Fachfragen

Pro Bereich nur Entscheidungen fragen, die der Kunde wirklich treffen muss:

1. [Welche Variante oder Regel soll gelten?]
2. [Welche Daten oder Formate werden benötigt?]
3. [Wer darf welche Aktion durchführen?]
4. [Welche Ausnahme muss unterstützt werden?]
5. [Wer liefert und genehmigt die Inhalte?]

## B4. Freigabe für die Angebotserstellung

- [ ] Antworten sind nach bestem Wissen vollständig.
- [ ] offene Punkte sind sichtbar markiert.
- [ ] daraus darf ein modularer Angebotsentwurf erstellt werden.

**Name:** __________________<br>
**Datum:** __________________<br>
**Freigabe:** __________________

---

# Teil C — Kalkulation und Angebotsbausteine

## C1. Rechenregeln

- 1 Personentag (PT) = [zum Beispiel 8] Arbeitsstunden.
- Preisformel: `Personentage × Netto-Tagessatz = Netto-Entwicklungskosten`.
- Aufwand ist eine Spanne, bis offene Entscheidungen beantwortet sind.
- externe Gebühren und fachliche Beratung getrennt ausweisen.
- Risiko- und Abstimmungspuffer sichtbar nennen, nie verstecken.

## C2. Annahmen

- [bestehende Architektur bleibt / wird ersetzt]
- [Kunde liefert Daten bis Datum]
- [Anzahl Länder, Sprachen, Rollen oder Systeme]
- [keine oder klar benannte Neugestaltung]
- [technische Umsetzung ersetzt keine Rechts- oder Steuerberatung]
- [erlaubte und ausgeschlossene Prüfarten]

## C3. Muss-Arbeitsblöcke

| Kennung | Arbeitsblock | Ergebnis | Aufwand | Schätzsicherheit |
|---|---|---|---:|---:|
| M01 | [Block] | [sichtbares Ergebnis] | [x–y PT] | [hoch/mittel/niedrig] |
| M02 | [Block] | [sichtbares Ergebnis] | [x–y PT] | [hoch/mittel/niedrig] |
|  | Zwischensumme |  | [x–y PT] |  |
|  | Risiko- und Abstimmungspuffer | [Begründung und Prozent] | [x–y PT] |  |
|  | Richtwert |  | [x–y PT] |  |

## C4. Optionale Erweiterungen

| Kennung | Erweiterung | Ergebnis | Aufwand |
|---|---|---|---:|
| O01 | [Option] | [Nutzen] | [x–y PT] |
| O02 | [Option] | [Nutzen] | [x–y PT] |

## C5. Angebotsvarianten

### Variante A — Klärung oder Vorführung

- Umfang: [Arbeitsblöcke]
- Live-Freigabe: [ja/nein]
- Richtwert: [x–y PT]

### Variante B — Kernziel

- Umfang: [Arbeitsblöcke]
- Live-Freigabe: [Bedingungen]
- Richtwert: [x–y PT]

### Variante C — Erweiterter Betrieb

- Umfang: [Kernziel plus Optionen]
- Richtwert: [x–y PT]

## C6. Preisbeispiele

| Tagessatz netto | Variante A | Variante B | Variante C |
|---:|---:|---:|---:|
| [€] | [€ von–bis] | [€ von–bis] | [€ von–bis] |

**Hinweis:** Beispiele sind nur Rechenhilfen. Verbindlich wird erst das freigegebene Angebot.

## C7. Nicht enthaltene Kosten

- Hosting, Speicher und Datenbank
- Zahlungs- oder Transaktionsgebühren
- E-Mail-, Überwachungs- oder Schutzdienste
- Drittanbieter-Lizenzen
- Rechts- und Steuerberatung
- Inhalte, Übersetzungen oder Medien, sofern nicht beauftragt
- Wünsche außerhalb der freigegebenen Arbeitsblöcke

## C8. Vertragsmodell

Empfohlen:

1. kleiner Festpreis für Klärung und freigegebenen Umfang;
2. Festpreis oder Preisobergrenze je klar abgegrenztem Arbeitsblock;
3. Änderungswünsche nur nach neuer Kosten- und Terminfreigabe;
4. optionaler Wartungsblock nach dem Start.

---

# Teil D — Phasenplan

| Phase | Ziel | Risiko | Prüfung | sichtbarer Nutzen | Aufwand |
|---|---|---|---|---|---:|
| 0 | Umfang festlegen | fehlende Entscheidungen | freigegebener Katalog | Klarheit | [PT] |
| 1 | Blocker schließen | alte Abhängigkeiten | gezielte Sicherheits- und Datenprüfung | sichere Grundlage | [PT] |
| 2 | Kernablauf vervollständigen | externe Regeln fehlen | echter Musterablauf | nutzbares Kernergebnis | [PT] |
| 3 | Betrieb vorbereiten | Dienste oder Daten fehlen | Startcheck | kontrollierter Alltag | [PT] |
| 4 | Abnahme und Start | neue Muss-Wünsche | Gesamtprotokoll | nachvollziehbare Freigabe | [PT] |

Pro Phase dokumentieren:

- Ziel
- enthaltene Arbeiten
- Risiko
- messbare Prüfung
- sichtbarer Nutzen
- Freigabe für die nächste Phase

---

# Teil E — Leistungs-Testplan

## E1. Grundsatz

Schnelligkeit zählt nur zusammen mit korrekten Daten. Keine Leistungsprüfung darf Duplikate, Datenverlust oder fremde Daten akzeptieren.

## E2. Kundenwerte

| Wert | Ziel |
|---|---:|
| normale Vorgänge pro Stunde | [Wert] |
| erwartete Spitze | [Wert] |
| gleichzeitige Nutzer | [Wert] |
| größte Nutzlast oder Datei | [Wert] |
| größte Datenmenge | [Wert] |

## E3. Messgrößen

- Median, 95. und 99. Perzentil
- Fehlerquote
- Durchsatz
- Datenbank- und Speicherlast
- Duplikate und verlorene Vorgänge
- Erholung nach Lastspitze

## E4. Pflichtszenarien

- Einzelaufruf
- Normalbetrieb
- erwartete Spitze
- kurze Lastspitze
- Dauertest
- Ausfall eines externen Dienstes
- Wiederholung nach Fehler
- Erholung

**Regel:** Browser-, Oberflächen- und Lastprüfungen nur mit aktueller ausdrücklicher Freigabe. Direkte Schnittstellenprüfungen davon getrennt planen.

---

# Teil F — Sonderfall-Katalog

| ID | Prio | Sonderfall | erwartetes Verhalten | Kundenentscheidung | Ergebnis |
|---|---:|---|---|---|---:|
| EDGE-001 | Blocker | [Fall] | [sichere Reaktion] | [Antwort] | ☐ |
| EDGE-002 | Hoch | [Fall] | [sichere Reaktion] | [Antwort] | ☐ |

Mindestens prüfen:

- doppelte oder verspätete Anfrage
- gleichzeitige Änderung
- ungültige, fehlende und zu große Eingabe
- Teilerfolg mit fehlgeschlagenem Folgeschritt
- Wiederholung nach Ausfall
- Berechtigungen zwischen zwei Nutzern
- Löschung gegen Aufbewahrungspflicht
- externe Dienste nicht erreichbar
- Rundung, Grenze und leerer Bestand
- Storno, Teilstorno und Rückabwicklung

---

# Teil G — Interne technische Bestandsaufnahme

> **Nicht für Kundenversand**, wenn konkrete Schwachstellen, Zugangsnamen, interne Pfade oder Sicherheitsdetails enthalten sind.

## G1. Prüfgrenzen

- geprüft: [Code / Datenbank / Konfiguration / erlaubte Tests]
- nicht geprüft: [Browser / Live-Zahlung / Produktion / Recht]
- Prüfdatum und Version: [Wert]

## G2. Sichere Konfigurationsklassifikation

Nur `gesetzt`, `fehlt`, `Testmodus`, `Livemodus`, `lokal` oder `unklar` dokumentieren. Niemals Schlüsselwerte kopieren.

## G3. Befund-Vorlage

### [Kennung] — [Titel]

- Dringlichkeit: [Blocker / Hoch / Mittel / Niedrig]
- sichtbare Auswirkung: [Kundenauswirkung]
- bestätigte Ursache: [kurz]
- Belege: [Dateipfad / Messwert / Prüfprotokoll]
- nötige Änderung: [konkret]
- Abnahme: [messbare Aussage]
- Restunsicherheit: [falls vorhanden]

## G4. Abschlusscheck

- [ ] Kundenaussagen sind belegt oder als ungeprüft markiert.
- [ ] Sicherheitsdetails stehen nicht im versendbaren Dokument.
- [ ] Schätzung nennt Annahmen und Puffer.
- [ ] jeder Muss-Block besitzt Abnahmekriterien.
- [ ] Kundenentscheidungen sind sichtbar.
- [ ] Dokumente nennen ihre Zielgruppe.
- [ ] Links und Platzhalter wurden geprüft.
- [ ] Geheimnisse und echte Kundendaten fehlen.
- [ ] freigegebene Prüfarten wurden eingehalten.
