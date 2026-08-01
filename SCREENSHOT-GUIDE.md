
Nutze für jede visuelle Prüfung ausschließlich das projekteigene CLI-Capture-System.
Existiert keines, baue eines nach diesem Muster:

1. EIN headless Chromium als reiner Wirt. Playwright startet den Browser, lädt die
   App und ruft in die Seite hinein. Niemals ein sichtbares Fenster, niemals zwei
   Browser parallel, niemals ein Browser pro Bild.

2. Bilder kommen aus dem Render-Target, nicht vom Browser:
   renderer.readRenderTargetPixels() auf das Post-Target, PNG in Node schreiben.
   page.screenshot() und fullPage sind verboten - sie gehen über den Compositor,
   kosten ein Vielfaches und zeigen nicht, was der Renderer erzeugt hat.

3. Software-Rendering ist ein ABBRUCH, keine Warnung. Lies die echte Kennung über
   WEBGL_debug_renderer_info. Matcht sie
   /swiftshader|llvmpipe|software|microsoft basic|warp|angle \(google/i,
   brich mit Fehlercode ab. Dieser Fallback ist die Ursache hängender Rechner.

4. Eine Sitzung, viele Messungen. Start (Browser + Laden + Welt-Bake + Shader)
   kostet typisch das Doppelte bis Dreifache der eigentlichen Messung.
   Parametersweeps laufen in EINEM Prozess, nie ein Neustart pro Wert.

5. Zahlen vor Bildern. Miss zuerst - Deckung, Luminanz, NDC-Position, Abstände.
   Schieße ein Bild nur, wenn eine Zahl die Frage nicht beantworten kann, und dann
   genau eines. Kein Bild "zur Sicherheit".

6. Kein GPU-Flag ohne eigene Messung. --use-angle=vulkan, --enable-features=Vulkan
   und --disable-vulkan-surface sind auf NVIDIA gemessen schädlich.
