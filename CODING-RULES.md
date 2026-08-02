# Coding Rules — gemeinsame Orchestrierung

**Geltung:** verbindlich, sobald die lokale `AGENTS.md` hierher verweist. Der aktuelle Userauftrag und
projektspezifische Regeln haben Vorrang. Die `AGENTS.md` hält nur Kernpflichten und lokale Fakten; gemeinsame
Arbeitsweise wird hier einmal gepflegt.

## Wirkung vor Feinschliff

- **Änderungsmaß = Lückenmaß.** Eine kleine, klar begrenzte Lücke bekommt einen kleinen Fix. Fehlt dem Produkt
  dagegen spürbar Maßstab, Tiefe, Identität, Spielwert oder Inszenierung, ist eine entsprechend große,
  zusammenhängende Änderung richtig — nicht die zwölfte Justage derselben Konstante.
- **Makro vor Mikro.** Erst Richtung, Komposition, Mechanik, Weltstruktur, Timing und Layering beurteilen;
  Details erst polieren, wenn diese Ebene trägt. Eine bereits fein abgestimmte Achse nicht weiter bearbeiten,
  nur weil dort leicht noch ein Prozent zu finden ist.
- **Alternativen müssen wirklich anders sein.** Ist die Richtung unklar, zwei bis drei deutlich verschiedene
  Hypothesen formulieren und den stärksten reversiblen Kandidaten weit genug als kohärenten Vertical Slice
  umsetzen, dass sein Wert beurteilbar ist. Vergleichen, die beste Richtung behalten, Verlierer sauber entfernen.
- **Spiele größer machen, nicht bloß den Code.** Neue Mechanik-, Welt- oder VFX-Schichten sollen gemeinsam
  erlebbare Tiefe erzeugen. Bei VFX etwa Form, Bewegung, Material/Licht, Timing, Reaktion und Audio als bewusstes
  System schichten statt nur mehr Partikel derselben Art anzuhängen.
- **Kontrolle ist ein Entscheidungs-Gate, keine Mikroskop-Pflicht.** Statische Gates laufend nutzen; visuell oder
  messtechnisch nach einem aussagekräftigen Kandidaten prüfen, nicht nach jedem Mikroedit. Messungen entscheiden,
  ob eine Richtung bleibt, wechselt oder endet — sie erzwingen keine kleinen Änderungen.
- **Nach 3–5 Verbesserungen derselben Messachse wechseln.** Der Deckel beendet nicht den Loop, sondern die
  Wiederholung: [MAX-5-VERBESSERUNGEN-DANN-WEITER.md](agents/MAX-5-VERBESSERUNGEN-DANN-WEITER.md).

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
  alle Messungen, Software-Renderer als Fehler, PNG direkt per `readRenderTargetPixels()` aus dem Post-Target,
  niemals `page.screenshot()` und niemals einen sichtbaren Browser.
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

Technische Tipps bleiben freiwillig und widerlegbar; eine gemessen bessere Lösung gewinnt. Nur ein Learning
lesen, das vor der konkreten Arbeit helfen kann. Hat etwas belegbar Zeit gekostet, nach
[LEARNING-SYSTEM.md](LEARNING-SYSTEM.md) als kurzen projektspezifischen Tipp zurückgeben; Duplikate vermeiden.
