# Zusatzregeln für Nicht-Frontier-Modelle

Ergänzt [CODING-RULES.md](CODING-RULES.md). Hier steht, was Spitzenmodelle (Frontier) von selbst richtig machen.

**Wer liest was:** Steht im Block `<model_rules>` „Frontier für: …“ mit dem Bereich deiner Aufgabe, liest du diese Datei nicht. Sonst (Standard) liest du „Allgemein“ und den Abschnitt deines Bereichs. Beispiel: Ein Modell ist Frontier für Backend und baut einen Dialog → „Allgemein“ + „Frontend“ lesen.

## Allgemein

- Denktiefe passend zur nächsten Entscheidung: Routine direkt erledigen; gründlich nachdenken bei Unsicherheit, Fehlern oder folgenreichen Abwägungen. Schon Entschiedenes ohne neue Belege nicht neu herleiten. Verlangte Funktion und Prüfung bleiben vollständig.
- Tritt ein Fehler wieder auf, eine neue Ursache suchen, statt dieselbe Stellschraube noch einmal zu drehen. Die Reparatur nur auf Teile ausweiten, die direkt daran hängen.
- Übernahme aus fremden Repos oder Vorlagen: das echte Verhalten und den Mechanismus übernehmen, der die Qualität trägt, nicht nur das Aussehen. Mehr: [REFERENCE-TRANSFERS.md](REFERENCE-TRANSFERS.md).
- Zwischenstände und Abschluss so lang wie die Aufgabe: Entscheidungen, Ergebnisse und Offenes je einmal. Knappe Sprache kürzt nie nötigen Code oder Belege.
- Erklären mit Beispielen aus der Aufgabe („Öffne Coolify und starte den Build“), nicht mit erzwungenen Vergleichen oder langen Fachlisten.

## Backend (Logik, Server, Daten, Werkzeuge)

- Wiederholte Lese- und Schreibzugriffe bündeln, Unabhängiges parallel ausführen, teure Ergebnisse wiederverwenden. Listener, Timer und andere Ressourcen wieder aufräumen.
- Erst messen, dann optimieren. Nie Qualität oder verlangte Funktion heimlich kürzen, um schneller zu sein.
- Eine Liste nie beim Durchlaufen vergrößern – außer mit bewusster Warteschlange oder Kopie, Liste des schon Besuchten und Obergrenze.

## Frontend (Oberfläche, Design, Motion)

- **Vorbild vor Layout-Änderungen:** ein echtes Bild oder echten Quelltext ansehen, nicht nur einen Namen. Zuerst eine gelungene Fläche im Projekt und den Hausstil aus `DESIGN.md`, sonst eine Profi-App. Daran Aufbau, Abstände, Knopf- und Zeilengrößen, Schrift, Zustände (Hover, Fokus, leer, Fehler) und schmale Breite ausrichten.
- Vorhandene Bausteine und Theme-Farben nutzen; hell, dunkel und alle Farbthemen müssen stimmen. Keine Kartenwiederholung, keine uneinheitlichen Knöpfe, kein Deko-Wirrwarr.
- Vorher und nachher dieselben Zustände und Breiten vergleichen. Nie Qualität behaupten, die man nicht gesehen hat.
- Bei wiederkehrender UI-Arbeit die CPU im Leerlauf messen: warme Fenster, DevTools zu, nach normalem Neuladen der ausgelieferten Fassung; Vorder- und Hintergrund getrennt angeben ([IDLE-PERFORMANCE.md](IDLE-PERFORMANCE.md)).
