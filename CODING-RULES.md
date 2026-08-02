# Coding Rules — gemeinsame Orchestrierung

**Geltung:** verbindlich, sobald die lokale `AGENTS.md` hierher verweist. Der aktuelle Userauftrag und
projektspezifische Regeln haben Vorrang. Die `AGENTS.md` hält nur Kernpflichten und lokale Fakten; gemeinsame
Arbeitsweise wird hier einmal gepflegt.

## Kontextanker statt Lesekette

Vor einem größeren Leseblock im Arbeitskontext notieren und dort kurz fortschreiben:

- **Auftrag:** ein Satz zum Userziel und zum Fertigkriterium.
- **Leseliste:** `offen/gelesen · Pfad · Grund`; neue Pfade nur ergänzen, wenn eine konkrete Frage sie erfordert.
- **Befund:** pro gelesener Datei höchstens ein auftragsrelevanter Satz.
- **Nächster Schritt:** nach jedem Leseblock zum Auftrag zurückkehren; ein Link allein ist kein Leseauftrag.

Keine zusätzliche Protokolldatei anlegen, sofern das Projekt sie nicht verlangt. Lesen endet, sobald die nächste
Änderung sicher entschieden werden kann.

## Echtzeit-3D — große Schritte vor Sichtprüfungen

Nur für visuelle oder spielerische Arbeit an Echtzeit-3D:

- **Makro zuerst:** Richtung, Komposition, Mechanik, Weltstruktur, Timing und Layering vor Detailwerten.
- **Änderungsmaß = Lückenmaß:** kleine Lücke → kleiner Fix; fehlender Maßstab, Tiefe, Identität oder Spielwert →
  großer, zusammenhängender und reversibler Schnitt.
- **Bei unklarer Richtung:** 2–3 klar verschiedene Richtungen festlegen; stärksten reversiblen Kandidaten als
  Vertical Slice bauen; anhand der Messung behalten oder wechseln.
- **VFX als System:** Form, Bewegung, Material/Licht, Timing, Reaktion und Audio schichten; nicht nur mehr Partikel.
- **Sichtprüfung nach Kandidaten:** nicht nach jedem Mikroedit messen oder Bilder erzeugen.
- **Messachse nach 3–5 Verbesserungen schließen:** an einer anderen 3D-Achse weiterarbeiten;
  [Deckel-Regel](agents/MAX-5-VERBESSERUNGEN-DANN-WEITER.md).

## Umsetzung und Performance

- Vor Änderungen Architektur, Single Source of Truth, aktuelle Git-Differenzen und vorhandene Werkzeuge prüfen.
  Bestehende Systeme erweitern statt parallele Zustände, Renderpfade oder Konfigurationen einzuführen.
- Große Änderungen als zusammenhängende, kompilierfähige Schnitte liefern. Jeder Schnitt muss für sich kohärent,
  reversibel und integrierbar sein; halbfertige Parallelarchitekturen sind kein Fortschritt.
- Performance ist Akzeptanzkriterium, kein Vorwand für Wirkungslosigkeit. Zusätzliche Layer müssen ihren
  sichtbaren oder spielerischen Wert gegen Framezeit, Draw Calls, Speicher, Update-Kosten und Komplexität bezahlen.
  Teure Arbeit bündeln, instanzieren, poolen oder vorbacken, wo es zum konkreten Pfad passt.
- Kein Gewinn darf Kernfunktion, Lesbarkeit, Steuerbarkeit oder bereits belegte Qualität unbemerkt verschlechtern.
  Den stärksten relevanten Gegencheck wählen, nicht eine ritualisierte Vollprüfung.

## Validierung und Echtzeit-3D

- Nach Codeänderungen das kanonische statische Projekt-Gate aus `AGENTS.md` ausführen. Automatische UI- oder
  Gameplay-Tests nur auf ausdrücklichen Userbefehl; eine erforderliche visuelle Prüfung ist davon unberührt.
- Bei Echtzeit-3D gilt für visuelle Prüfungen ausschließlich das projekteigene CLI-Capture-System. Fehlt es, nach
  [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md) zuerst bauen: ein headless Chromium per Playwright, eine Sitzung für
  alle Messungen, Software-Renderer als Fehler und PNG direkt aus dem Engine-Post-Target (in Three.js per
  `readRenderTargetPixels()`), niemals `page.screenshot()` und niemals einen sichtbaren Browser.
- Zahlen zuerst: relative Maße, Rauschboden und tatsächlichen Messfensterinhalt prüfen. Bilder nur, wenn sie eine
  Entscheidung tragen; normalerweise Gewinner/Verlierer oder Vorher/Nachher, nicht eine komplette Sweep-Reihe.
- Für 3D-Facharbeit über [THREEJS-RULES.md](THREEJS-RULES.md) genau den engsten passenden Owner und gegebenenfalls
  genau eine projektspezifische Tippdatei öffnen — nicht die ganze Wissensbasis.

## Git und Lieferung

- Nur eigene Dateien stagen, nie pauschal `git add -A`. Fremde offene Änderungen unangetastet lassen.
- Keine Branches oder Worktrees anlegen, außer der User verlangt es in der aktuellen Nachricht ausdrücklich.
  Direkt auf den in `AGENTS.md` genannten Zielbranch liefern.
- Commit-Titel einzeilig und konkret: `typ(bereich): was`. Jede kompilierfähige Einheit eigenständig committen
  und pushen. Bei Submodulen zuerst dort committen und pushen, danach nur den Pointer im Elternrepo committen.
- Commit-/Push-Fehler nicht delegieren. Bei abgelehntem Push synchronisieren, bei Bedarf `git pull --rebase`,
  Merge-/Rebase-Konflikte inhaltlich sinnvoll selbst lösen, Rebase fortsetzen und erneut pushen.

## Wissen klein halten

- Technische Tipps bleiben freiwillig und widerlegbar; gemessen bessere Lösung gewinnt.
- **Maximale Informationsdichte:** Fehlerbild, Ursache, Handlung und Beleg erhalten; Füllwörter, entbehrliche
  Artikel, Einleitungen, Wiederholungen und Synonymketten streichen. Telegrammstil vor Fließtext.
- Nur ein Learning lesen, das vor der konkreten Arbeit hilft.
- Belegt teure Erfahrung nach [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md) als kurzen Projekttipp zurückgeben;
  Duplikate vermeiden.
