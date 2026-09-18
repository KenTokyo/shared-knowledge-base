# Screenshots ohne unnötige Browser-CPU

**Lesen vor:** Browserstarts, Screenshots und browsergestützten Grafik-/Laufzeitprüfungen.
**Geltung:** Playwright, direkte CDP-Verbindungen, Browser-CLI, Shellskripte und andere Testbrowser. Notwendige Prüfungen sind durch den Projektauftrag erlaubt; keine zusätzliche Freigaberunde. Ausdrückliche Nutzergrenzen gelten weiter.

## Zuerst vorhandene Oberflächen nutzen

| Weg | Wann verwenden | Grenze |
| --- | --- | --- |
| Vorhandener oder eingebauter Browser-Tab | Standard für Seiten-/UI-Screenshots; vorhandene Browser- oder Computer-Use-Werkzeuge nutzen | Dieselbe Seite, richtige Ansicht und Auflösung prüfen. Auch ein eingebauter 3D-Tab braucht Rechenleistung. |
| Native Fensteraufnahme / Electron `capturePage` | Bereits geöffnete App oder NoteTree-Browserfläche | Kein zusätzlicher Browser nötig; Aufnahme muss die beauftragte Fläche zeigen. |
| Sichtbarer Testbrowser | Wenn vorhandene Tabs ungeeignet sind oder der Ablauf eine isolierte Sitzung braucht | Bestehenden Projektweg nutzen, keine privaten Profile kopieren. Edge bevorzugen, wenn vorhanden; sonst Chrome oder voller Chromium-Browser. |
| Unsichtbarer Browser | Begründete Ausnahme, etwa CI ohne Bildschirm oder ausdrücklich beauftragter Headless-Test | Vorher warnen, begrenzte Laufzeit und Aufräumen; 3D nur mit geprüfter GPU, außer beim ausdrücklich beauftragten Software-Rendering-Test. |

Kein neuer Browser nur deshalb, weil ein Screenshot gebraucht wird. Vorhandene geeignete Sitzung für zusammengehörige Aufnahmen wiederverwenden; keine neue Instanz pro Bild. Ist kein nutzbarer Weg verfügbar, die konkrete fehlende Fähigkeit nennen, statt ungefragt einen großen Aufnahme-Unterbau zu bauen oder einen Screenshot zu erfinden.

## Warnpflicht und Regelverstöße

**Vor jedem notwendigen unsichtbaren Browserlauf** im Chat sichtbar sagen:

> CPU-Warnung: Dieser Test startet einen unsichtbaren Browser. Grund: … Sparsamere Alternative: … Ich beende den eigenen Browser spätestens nach … und prüfe danach, dass er geschlossen ist.

Die Warnung ist eine Information, keine zusätzliche Bestätigungsfrage bei bereits beauftragter Arbeit. Auch bei einem vorhandenen Skript dessen tatsächlichen Startweg prüfen. In unbeaufsichtigten Läufen gehört die Warnung in die sichtbare Testausgabe.

Als Regelverstoß gelten:

- Ein unangekündigter Headless-Start für lokale Screenshot-Arbeit, obwohl eine geeignete vorhandene/sichtbare Fläche nutzbar ist.
- Erzwungene CPU-Grafik für normale 3D-Aufnahmen, etwa `--use-angle=swiftshader`, `--use-angle=swiftshader-webgl` oder `--use-vulkan=swiftshader`. `--enable-unsafe-swiftshader` erlaubt den problematischen Rückfall und ist kein Performance-Fix. `--disable-gpu` ist ebenfalls kein allgemeines Mittel gegen hohe CPU.
- Ein eigener Testbrowser, der nach Erfolg, Fehler, Zeitlimit oder Abbruch weiterrechnet; auch abgetrennte Starts mit `nohup` oder `&` brauchen einen Besitzer und zuverlässiges Ende.

Bei einem Verstoß den **eigenen** Lauf stoppen, kurz mit dem Präfix **„Browser-CPU-Warnung“** erklären und den passenden Weg aus der Tabelle verwenden. Bereits laufende fremde Tests zuordnen und melden, nicht pauschal beenden. Eine Ausnahme gilt nur für ausdrücklich beauftragte Software-Rendering-/Fallback-Tests; sie braucht dieselbe Warnung und Aufräumpflicht. Headless ist nicht grundsätzlich Software-Rendering, und ein sichtbares Fenster beweist noch keine echte GPU.

## Echte Grafikbeschleunigung prüfen

Bei 3D/WebGL/WebGPU vor längeren Aufnahmen oder Messreihen den tatsächlichen Renderer des verwendeten Grafikkontexts prüfen: WebGL über `WEBGL_debug_renderer_info`, WebGPU über die verfügbaren Adapterinformationen. Ein Browsername, ein Startflag oder ein neuer unbenutzter Testkontext beweist den Renderer der Szene nicht.

`SwiftShader`, `llvmpipe`, `software`, `Microsoft Basic Render Driver` und `WARP` weisen auf CPU-Grafik hin. `ANGLE` allein ist kein Fehler: ANGLE kann die echte Apple-/Intel-/AMD-/NVIDIA-GPU verwenden. Fehlende oder unklare Angaben als ungeprüft dokumentieren; nicht als Hardware-Nachweis ausgeben und keinen teuren Blindversuch anschließen.

Bei erkanntem Software-Rendering für normale 3D-Screenshots abbrechen und die vorhandene GPU-beschleunigte Fläche bzw. einen sichtbaren Browser verwenden. Keine Qualitätsreduktion, Auflösungsänderung oder heimliche Änderung von Nutzereinstellungen als vermeintliche CPU-Reparatur. Keine geratenen Vulkan-/Metal-/ANGLE-Flags.

## Das passende Bild aufnehmen

- Für Seiten, Menüs und Layouts sind normale Tab-/Fenster-Screenshots sowie `page.screenshot()` geeignet. Den beauftragten Ausschnitt aufnehmen; `fullPage` nur, wenn die ganze Seite benötigt wird.
- Für einen isolierten Engine-/Shader-Vergleich kann ein bereits vorhandener GPU-Readback des tatsächlichen Render-Targets genauer sein. Er ersetzt keinen Screenshot der gesamten Oberfläche. Nicht allein für ein Bild die Engine umbauen oder permanent `preserveDrawingBuffer` aktivieren.
- Bei Messreihen zuerst die tatsächlich relevante Zahl erheben. Bilder gezielt für offene visuelle Fragen aufnehmen, keine dauernde Screenshot-/Kameraschleife. Benötigte Auflösung und Vergleichszustände erhalten.

## Eigene Sitzungen zuverlässig aufräumen

Vor dem Start Besitzer, Profil/Port und ein zum Test passendes Zeitlimit festhalten. In eigenem Startcode `try/finally` sowie Fehler-, Abbruch- und Zeitlimitbehandlung vorsehen. Playwright-Testläufe sollen ihre verwalteten Fixtures nutzen; lose Skripte müssen `context.close()`/`browser.close()` und gegebenenfalls den selbst gestarteten Unterprozess beenden. Ein von der Prüfung unabhängiges Zeitlimit muss auch einen hängenden Aufruf beenden können.

- Eigener Browser: am Ende vollständig schließen und gezielt anhand der eigenen PID/Prozessfamilie bzw. des eigenen Debug-Ports prüfen, dass nichts weiterläuft.
- Angefügter Nutzerbrowser: nur eigene Test-Tabs/-Kontexte schließen und die Verbindung trennen; die fremde App, Tabs und Profile erhalten. `disconnect`/`detach` reicht nur hier, nicht für einen selbst gestarteten Browser.
- Keine pauschalen `kill-all`-/`pkill Chrome`-Aufrufe. Keine Hintergrundspiele nach dem Screenshot stehen lassen. Einen nur für die Aufnahme geöffneten eingebauten Test-Tab ebenfalls schließen, sofern er nicht als gewünschte Vorschau weiter gebraucht wird.

## CPU-Ergebnis ehrlich einordnen

30–50 % während dauerhaftem Software-Rendering können erheblich sein. Ein einzelner Start-/Screenshot-Spitzenwert beweist aber keine Dauerlast. CPU eines Kerns und Anteil an der gesamten Maschine unterscheiden. Vorher/nachher an derselben Szene, Auflösung, Qualität und CPU-Skala messen; warme Fenster, gleiche Sichtbarkeit, DevTools für den Abschluss geschlossen. Details: [IDLE-PERFORMANCE.md](IDLE-PERFORMANCE.md).

Eine Regel ist kein systemweiter Prozesswächter. Sie wirkt bei Agenten, die sie laden. Technische Warnungen eines Teststarters erreichen nur dessen Läufe. Keine garantierten Prozent-Einsparungen ohne Vergleichsmessung behaupten.

Quellen: [Chromium: SwiftShader](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/gpu/swiftshader.md), [Playwright: Browser und Headless-Modi](https://playwright.dev/docs/browsers).
