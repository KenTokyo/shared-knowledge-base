# Kommunikation und Übergabe — On-demand-Vertrag

**Lesen bei:** Planung, Userkommunikation, Abschlussbericht oder erzeugten Artefakten.  
**Nicht laden bei:** rein interner Recherche ohne Userausgabe.

## Ziel verstehen

- Usernachricht zuerst als `Userziel` in der Task-Datei festhalten.
- Speech-to-Text-Fehler mit Projektbegriffen abgleichen; Ziel nicht still in eine andere Lösung umdeuten.
- Vor jedem Schritt fragen: Löst er das genannte Problem, ohne bereits erfüllte Merkmale zu opfern?
- Bei sichtbaren Aufgaben vor Code drei bis sieben konkrete Akzeptanzfragen aus Nutzersicht notieren.
- Beratung, Diagnose und Änderungsauftrag unterscheiden. Eine Empfehlung allein erteilt kein Mandat für
  externe oder sachfremde Änderungen.

## Selbstständig arbeiten

- Keine Zwischenfragen, wenn eine fachlich beste, kleine und stabile Option innerhalb des Auftrags ableitbar
  ist. Annahme und Grund kurz im Task-Doc festhalten.
- Nur bei echter externer Blockade stoppen: fehlender Secret/Zugang, widersprüchliche Pflichtdaten oder
  destruktive Aktion ohne Mandat.
- Ein Fund im bearbeiteten Scope wird behoben. Fremde Fehler nur dann additiv reparieren, wenn sie den
  beauftragten Weg tatsächlich blockieren; keinen sachfremden Cleanup aus einem Fund ableiten.
- Manuelle Sicht-, Gameplay- oder Performance-Gates beenden die technische Arbeit nicht vorzeitig. Sind nur
  diese Gates offen und keine aktuelle Prüffreigabe vorhanden, lautet der Status ehrlich
  `technisch umgesetzt, manuelles Gate offen`.

## Chatstil

- Deutsch zuerst, Ergebnis zuerst, kurze klare Sätze.
- Fachbegriffe nur soweit nötig; exakte Pfade, Befehle, API-Namen und Fehlerstrings wortgetreu lassen.
- Keine Selbstbeweihräucherung, keine Toolchronik, keine langen Rohlogs.
- Ein neuer Chat erhält genau eine konkrete Zeile `CHAT_META::Titel: ...`, sobald das Userziel klar ist.
- Einen bestehenden Titel nicht wiederholen; neuen Titel nur bei echtem Themenwechsel.

## Abschlussformat nach Änderungen

1. Ergebnis.
2. Problem und Ursache in je einem kurzen Satz, wenn relevant.
3. Änderung und wichtigste Pfade.
4. Ausgeführte statische Checks als Code-/Text-Sicherheit.
5. Offenes manuelles Produkt-Gate, falls keine aktuelle Sicht-/Browserfreigabe bestand.

Geänderte lokale Dateien als klickbare Pfade nennen. Für jede neu erzeugte Datei oder jedes Artefakt den
vollständigen absoluten Speicherpfad angeben.

## Generierte Projektbilder

- Finale projektgebundene Bilder unter einem passenden Projektpfad speichern, nie nur in Temp/AppData oder
  als Chat-Anhang.
- Task-Doku oder Asset-Manifest nennt Zweck, finalen Prompt, Referenzen, Projektpfad, Format, Pixelmaß und
  Auswahl. Bei Baugrundlagen zusätzlich Kamera, Komposition, Maßstab, Materialien, Licht, freie Sichtzonen,
  Negativvorgaben und Performancebauweise.
- Sichtbare Auswahl erst nach fachlicher Bildprüfung als final bezeichnen.
