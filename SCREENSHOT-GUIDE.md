# CLI-Capture für visuelle Prüfungen

**Lesen wenn:** eine visuelle Prüfung in einem Echtzeit-3D-Projekt nötig ist oder dessen Capture-System fehlt.
**Geltung:** verbindlicher technischer Owner für den Capture-Pfad; lokale CLI-Namen stehen in der `AGENTS.md`.

1. **Nur das projekteigene CLI-Capture-System.** Existiert keines, zuerst eines nach diesem Muster bauen. Kein
   sichtbares Browserfenster und keine manuelle Browserprüfung.

2. **Ein headless Chromium als reiner Wirt.** Playwright startet den Browser einmal, lädt die App und ruft in die
   Seite hinein. Eine Sitzung bedient alle Messungen und Parametersweeps; nie ein Browser pro Bild oder Wert.
   Browserstart, Welt-Bake und Shaderaufbau kosten oft mehr als die eigentliche Messung.

3. **Pixel direkt aus dem Render-Target.** Den engineeigenen GPU-Readback auf dem tatsächlichen Post-Target
   verwenden und das PNG in Node schreiben; in Three.js ist das `renderer.readRenderTargetPixels()`. Bei anderen
   Engines das entsprechende Render-Target-/Texture-Readback nutzen. `page.screenshot()` und `fullPage` sind
   verboten: Sie laufen über den Compositor, kosten unnötig und belegen nicht exakt den Engine-Output.

4. **Software-Rendering ist ein Fehler.** Die echte Kennung über `WEBGL_debug_renderer_info`, bei WebGPU über die
   Adapterinformationen lesen. Matcht sie `/swiftshader|llvmpipe|software|microsoft basic|warp|angle \(google/i`,
   mit Fehlercode abbrechen — niemals nur warnen oder den Lauf ranken.

5. **Zahlen vor Bildern.** Zuerst die entscheidende Größe messen, etwa Deckung, Luminanz, NDC-Position, Abstand,
   Kontrast oder Framezeit. Sweeps als Tabelle ausgeben. Ein Bild nur erzeugen, wenn Zahlen die Entscheidung
   nicht beantworten; typischerweise Gewinner/Verlierer oder Vorher/Nachher, nicht alle Kandidaten.

6. **Vergleiche normalisieren.** Über verschiedene Auflösungen relative Maße statt nativer Pixel verwenden. Vor
   Rankings den Rauschboden bestimmen und prüfen, worauf das Messfenster tatsächlich zeigt; ein präziser Wert aus
   dem falschen Fenster ist kein Beleg.

7. **Nur entscheidungstragende Bilder ansehen.** Mehrere notwendige Frames in ein Vergleichsbild montieren und
   lokale Fragen als Ausschnitt prüfen. Keine vollständigen Passes durchblättern, wenn ein Pass-Diff die
   auffälligen Kameras vorsortieren kann.

8. **GPU-Flags nicht erraten.** Flags wie `--use-angle=vulkan`, `--enable-features=Vulkan` oder
   `--disable-vulkan-surface` nur nach eigener Messung einsetzen; sie waren auf NVIDIA bereits messbar schädlich.
