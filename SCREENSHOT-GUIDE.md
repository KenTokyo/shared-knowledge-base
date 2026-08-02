# CLI-Capture für visuelle Prüfungen

**Lesen wenn:** nach vollständiger Umsetzung eine visuelle Unsicherheit übrig bleibt und die freiwillige
Capture-Ausnahme gewählt wird.
**Geltung:** verbindlicher technischer Owner nur für diesen Ausnahmefall; lokale CLI-Namen stehen in der `AGENTS.md`.

**Default:** Keine agentische Sichtprüfung und kein vorsorglicher Bau des Capture-Systems. Sie ist aus Zeitgründen
bewusst ungern gesehen; die direkte Oberflächen-/Gameplay-Abnahme durch den User ist vorzuziehen. Nur wenn statische
und numerische Gegenchecks die relevante Look-Frage nicht beantworten, darf **eine** Sichtprüfung stattfinden,
absolut höchstens **zwei im gesamten Userauftrag**. Keine Screenshot- oder Review-Schleife.

1. **Nur nach diesem Entscheidungsgate das projekteigene CLI-Capture-System nutzen.** Existiert dann keines, zuerst
   eines nach diesem Muster bauen. Kein sichtbares Browserfenster und keine manuelle Browserprüfung.

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
   Kontrast oder Framezeit. Sweeps als Tabelle ausgeben und dafür kein PNG erzeugen. Ein Bild nur erzeugen und
   ansehen, wenn Zahlen die Look-Entscheidung nicht beantworten; dann das stärkste Gewinner/Verlierer- oder
   Vorher/Nachher-Vergleichsbild, nie alle Kandidaten.

6. **Vergleiche normalisieren.** Über verschiedene Auflösungen relative Maße statt nativer Pixel verwenden. Vor
   Rankings den Rauschboden bestimmen und prüfen, worauf das Messfenster tatsächlich zeigt; ein präziser Wert aus
   dem falschen Fenster ist kein Beleg.

7. **Review-Budget hart schließen.** Mehrere notwendige Frames in genau ein Vergleichsbild montieren; dessen
   einmalige Auswertung ist eine Sichtprüfung. Eine zweite ist nur nach einer relevanten Änderung oder neuen
   konkreten Unsicherheit zulässig. Niemals eine dritte, keine vollständigen Passes und kein Durchblättern von
   Kameras oder Sweeps.

8. **GPU-Flags nicht erraten.** Flags wie `--use-angle=vulkan`, `--enable-features=Vulkan` oder
   `--disable-vulkan-surface` nur nach eigener Messung einsetzen; sie waren auf NVIDIA bereits messbar schädlich.
