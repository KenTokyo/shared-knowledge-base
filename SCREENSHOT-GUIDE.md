# Screenshots ohne unnötige Browser-CPU

**Lesen vor:** Browserstarts, Screenshots und browsergestützten Grafik-/Laufzeitprüfungen.
**Geltung:** Playwright, direkte CDP-Verbindungen, Browser-CLI, Shellskripte und andere Testbrowser. Notwendige Prüfungen sind durch den Projektauftrag erlaubt; keine zusätzliche Freigaberunde. Ausdrückliche Nutzergrenzen gelten weiter.

## Vorrang: Die Arbeit des Nutzers nicht unterbrechen

Verbindliche Korrektur des Nutzers vom 20.09.2026: Die frühere Pflicht zu sichtbaren lokalen Testbrowsern ist aufgehoben. Keine sichtbaren Testbrowser oder Testfenster starten. Keine Tabs nach vorne holen, keine Fenster aktivieren und keinen Tastaturfokus übernehmen. Das gilt auch für Playwright, CDP, Electron und Fehlerbehebungsversuche.

- Vorhandene oder eingebaute Oberflächen und native Aufnahmen nur verwenden, wenn die laufende Arbeit ungestört bleibt.
- Nötige eigene Browserprüfungen unsichtbar ausführen (`headless: true`), mit isoliertem Profil, begrenzter Laufzeit und verlässlichem Aufräumen.
- Ein fehlendes ChatGPT-/Chrome-Plugin ist kein Grund für einen sichtbaren Ersatzstart. Headless ist der vorgesehene Ausweichweg, kein Regelverstoß.
- Kein `bringToFront()`, `focus()`, `app.focus()`, Aktivieren einer Browser-App oder Öffnen sichtbarer Entwicklerwerkzeuge. Konsole und Netzwerk über die Prüfverbindung erfassen.
- Headless erfordert keine zusätzliche Routinefreigabe und keine pauschale CPU-Warnung. Konkrete hohe Rechenlast vermeiden und bei Bedarf vorab benennen. Headless bedeutet nicht automatisch Software-Rendering.
- Funktioniert der unsichtbare Weg nicht, den konkreten Fehler melden. Nicht mit sichtbaren Browserstarts wiederholen.
- Bei versehentlicher Störung sofort nur den eigenen Lauf beenden. Fremde Browser, Tabs und Tests nicht schließen.

## Echte Grafikbeschleunigung prüfen

Bei 3D/WebGL/WebGPU vor längeren Aufnahmen oder Messreihen den tatsächlichen Renderer des verwendeten Grafikkontexts prüfen: WebGL über `WEBGL_debug_renderer_info`, WebGPU über die verfügbaren Adapterinformationen. Ein Browsername, ein Startflag oder ein neuer unbenutzter Testkontext beweist den Renderer der Szene nicht.

`SwiftShader`, `llvmpipe`, `software`, `Microsoft Basic Render Driver` und `WARP` weisen auf CPU-Grafik hin. `ANGLE` allein ist kein Fehler: ANGLE kann die echte Apple-/Intel-/AMD-/NVIDIA-GPU verwenden. Fehlende oder unklare Angaben als ungeprüft dokumentieren; nicht als Hardware-Nachweis ausgeben und keinen teuren Blindversuch anschließen.

Bei erkanntem Software-Rendering für normale 3D-Screenshots abbrechen. Nur eine vorhandene GPU-beschleunigte Fläche ohne Arbeitsunterbrechung oder einen GPU-fähigen unsichtbaren Lauf verwenden; keinen sichtbaren Ersatzbrowser starten. Keine Qualitätsreduktion, Auflösungsänderung oder heimliche Änderung von Nutzereinstellungen als vermeintliche CPU-Reparatur. Keine geratenen Vulkan-/Metal-/ANGLE-Flags.

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
