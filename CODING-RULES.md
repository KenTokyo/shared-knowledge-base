# Coding Rules — gemeinsame Orchestrierung

**Geltung:** verbindlich, sobald die lokale `AGENTS.md` hierher verweist. Der aktuelle Userauftrag und
projektspezifische Regeln haben Vorrang. Die `AGENTS.md` hält nur Kernpflichten und lokale Fakten; gemeinsame
Arbeitsweise wird hier einmal gepflegt.

## Lesepfad und Kontextanker

Pflichtpfad: lokale `AGENTS.md` vollständig → diese Datei vollständig. Danach nur per konkretem Trigger:

- vorhandener User-/Projektplan → genau diesen Plan lesen und fortführen;
- mehrere zusammenhängende Lieferabschnitte → einmal den
  [Phasenworkflow](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md) lesen;
- Echtzeit-3D-Facharbeit → [THREEJS-RULES.md](THREEJS-RULES.md), dort engsten Owner wählen;
- belegter Projekttrigger → höchstens eine passende Tippdatei.

Querverweis allein ist kein Leseauftrag; keine Linkkette vorsorglich öffnen. Vor größerem Leseblock im
Arbeitskontext notieren und kurz fortschreiben:

- **Auftrag:** ein Satz zu Userziel und Fertigkriterium.
- **Leseliste:** `offen/gelesen · Pfad · Grund`; neue Pfade nur bei konkreter Frage ergänzen.
- **Befund:** pro gelesener Datei höchstens ein auftragsrelevanter Satz.
- **Nächster Schritt:** nach jedem Leseblock zum Auftrag zurückkehren.

Keine zusätzliche Protokolldatei anlegen, sofern das Projekt sie nicht verlangt. Lesen endet, sobald die nächste
Änderung sicher entschieden werden kann.

## Echtzeit-3D — große Schritte, Sichtprüfung nur als Ausnahme

Nur für visuelle oder spielerische Arbeit an Echtzeit-3D:

- **Makro zuerst:** Richtung, Komposition, Mechanik, Weltstruktur, Timing und Layering vor Detailwerten.
- **Änderungsmaß = Lückenmaß:** kleine Lücke → kleiner Fix; fehlender Maßstab, Tiefe, Identität oder Spielwert →
  großer, zusammenhängender und reversibler Schnitt.
- **Bei unklarer Richtung:** 2–3 klar verschiedene Richtungen festlegen; stärksten reversiblen Kandidaten als
  Vertical Slice bauen; anhand von Architektur, Zahlen und Produktziel behalten oder wechseln.
- **VFX als System:** Form, Bewegung, Material/Licht, Timing, Reaktion und Audio schichten; nicht nur mehr Partikel.
- **One-shot statt Bildschleife:** zusammenhängenden Kandidaten vollständig bauen. Agentische Sichtprüfung ist aus
  Zeitgründen ausdrücklich ungern gesehen und standardmäßig aus; die direkte Oberflächen-/Gameplay-Abnahme macht
  bevorzugt der User.
- **Freiwillige Ausnahme:** Bleibt nach statischen und numerischen Gegenchecks echte Unsicherheit, ob der Look trägt,
  darf eine Sichtprüfung stattfinden, ausnahmsweise eine zweite nach einer relevanten Änderung oder neuen Frage.
  Pro gesamtem Userauftrag sind **eine, absolut höchstens zwei Sichtprüfungen** erlaubt; niemals pro Phase, Kamera,
  Kandidat oder Mikroedit. Ein montiertes Vergleichsbild zählt als eine Sichtprüfung.
- **Messachse nach 3–5 Verbesserungen schließen:** an einer anderen 3D-Achse weiterarbeiten;
  [Deckel-Regel](agents/MAX-5-VERBESSERUNGEN-DANN-WEITER.md).

## Umsetzung und Performance

- Vor Änderungen Architektur, Single Source of Truth, aktuelle Git-Differenzen und vorhandene Werkzeuge prüfen.
  Bestehende Systeme erweitern statt parallele Zustände, Renderpfade oder Konfigurationen einzuführen.
- **System vor Feinschliff:** zuerst Struktur, SSoT, Integration und vollständigen Hauptpfad aufbauen; danach Werte,
  Optik und Mikrooptimierungen justieren. Kein isoliertes Detail polieren, während umgebender Ablauf fehlt.
- Große Änderungen als zusammenhängende, kompilierfähige Phasen liefern. Pro Phase alle eng gekoppelten Todos
  ausimplementieren; jeder Schnitt bleibt kohärent, reversibel und integrierbar. Keine halbfertige Parallelarchitektur.
- Performance ist Akzeptanzkriterium, kein Vorwand für Wirkungslosigkeit. Zusätzliche Layer müssen ihren
  sichtbaren oder spielerischen Wert gegen Framezeit, Draw Calls, Speicher, Update-Kosten und Komplexität bezahlen.
  Teure Arbeit bündeln, instanzieren, poolen oder vorbacken, wo es zum konkreten Pfad passt.
- Kein Gewinn darf Kernfunktion, Lesbarkeit, Steuerbarkeit oder bereits belegte Qualität unbemerkt verschlechtern.
  Den stärksten relevanten Gegencheck wählen, nicht eine ritualisierte Vollprüfung.

## Validierung und Echtzeit-3D

- **Gebündeltes Prüfbudget:** zusammenhängenden Schnitt zuerst ausimplementieren, danach kanonisches statisches
  Gate einmal für alle Änderungen. Funde gemeinsam beheben, normalerweise ein Kontrolllauf. Gleiche Prüfung ohne
  neue Änderung oder Frage nicht wiederholen; erneutes Scheitern heißt Ursache/Umsetzung prüfen statt rerunnen.
  CI bleibt Liefergate, keine Mikroedit-Schleife.
- Automatische UI- oder Gameplay-Tests nur auf ausdrücklichen Userbefehl. Eine agentische Sichtprüfung ist kein
  Liefergate: standardmäßig entfällt sie; direkte Oberflächen-/Gameplay-Abnahme durch den User hat Vorrang.
- Nur wenn die freiwillige Ausnahme oben gewählt wurde, gilt ausschließlich das projekteigene CLI-Capture-System.
  Fehlt es, nach [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md) zuerst bauen: Playwright startet einmalig headless
  Chromium, dieselbe Sitzung bedient alle Messungen, Software-Renderer brechen den Lauf ab und PNGs entstehen direkt
  aus dem Engine-Post-Target (in Three.js per `readRenderTargetPixels()`), niemals per `page.screenshot()` oder
  sichtbarem Browser.
- Zahlen zuerst: relative Maße, Rauschboden und tatsächlichen Messfensterinhalt prüfen. Kein PNG erzeugen oder
  ansehen, wenn Zahlen die Frage beantworten. Sonst genau das stärkste Vorher/Nachher- oder Gewinner/Verlierer-
  Vergleichsbild prüfen; eine zweite Sichtprüfung nur nach relevant geändertem Kandidaten oder neuer konkreter
  Frage, niemals eine dritte.

## Git und Lieferung

- Nur eigene Dateien stagen, nie pauschal `git add -A`. Fremde offene Änderungen unangetastet lassen.
- Zielbranch grundsätzlich `main`, auch für Shared-Docs. Nennt lokale `AGENTS.md` ausnahmsweise einen anderen
  Zielbranch, auf genau diesem bleiben. Nie eigenmächtig Branch oder Worktree anlegen beziehungsweise wechseln;
  nur aktueller Userauftrag darf das verlangen.
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

Nach diesem Schema arbeiten:
shared-docs/agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md