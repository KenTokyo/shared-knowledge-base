# Echtzeit-Performance und räumliche Kosten

- **Status:** optionale „könnte“-Tipps; lokale Budgets, Geräte, Stufen → Vorrang

## Fünf Tipps

- **1 · Kostenmodell könnte sein:**
  - `Buckets × Arten/Materialien × LOD × Render-/Schattenpässe + Screen-Space`
  - exakter Subjekt-Hide statt ganzer Chunks
  - Draw Calls + Vertexarbeit + Overdraw
- **2 · Räumliche Wahrheit könnte gemeinsam sein:**
  - lokale Chunk-Bounds nach Updates
  - aktuelle Kamera/Frustum vor Culling
  - LOD erhält Silhouette, Kontakt, Kartenfläche
  - Schattenreichweite getrennt von Sichtreichweite
- **3 · Hotpath/Pools könnten prüfen:**
  - feste Kapazität; vorallokierte Buffer; bewusste Überlast
  - keine Frame-Allokationen; GC im warmen Worst Case messen
  - Idle: keine Scans; Voices; Draws
  - Reset: CPU/GPU-Slots; Cursor; Debts; History
- **4 · Messvertrag könnte enthalten:**
  - Hardware-Renderer; Szene; Kamera; Qualität; Warm-up
  - p50; p90; p95; p99; Worst
  - Calls; Dreiecke; sichtbare Parität; Fremdlast
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - hohe Calls → Chunk×Art×Pass-Tabelle
  - Culling ohne Gewinn → Bounds + Frustumtreffer
  - First-use-Stotterer → Kalt-/Warmlauf + Variantenliste
  - teurer Zusatzpass → GPU-Zeit + Overdraw-A/B
  - Prozessschwankung → Inhalt + Device + Fremdlast

## Belegte Tipps

Format und Änderungsrecht: [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md).

- **„X ist teuer" ohne zu wissen, welche Hälfte** — optimiert wird die Seite, die nichts kostet. → Zwei
  Läufe diffen: **Population auf 0** gegen **Meshes verstecken**. Die Differenz ist Vertexarbeit plus Draw
  Calls, der Rest ist Fragment.
  *0,21 ms gegen 0,37 ms — 0,16 ms davon Vertex und Draw Call · Herkunft: voxel-samurai-quiz · 2026-08-01*

- **Chunkgrenzen nach Weltlogik geschnitten** — schöne Datenstruktur, unerklärlich viele Draw Calls.
  Ursache: ein Chunk ist genau ein Draw Call **und** eine Bounding Sphere — beides Rendering-Begriffe, keine
  Tatsachen über die Welt. → Nach Call und Bounds schneiden; ein Material je Art, von allen Chunks geteilt.
  *Herkunft: voxel-samurai-quiz · 2026-08-01*

- **Population wächst mit der Welt statt mit dem Bild** — Kandidaten über die ganze Karte streuen und danach
  Culling suchen. → **Ein Element je Zelle eines auf die Kamera zentrierten Gitters**; die Instanzzahl hängt
  dann an der Sichtweite, nicht an der Weltgröße.
  *Herkunft: voxel-samurai-quiz · 2026-08-01*

- **Schattenwurf als „kleiner Schalter"** — eine dichte Vegetationsschicht verdoppelt beinahe die Dreiecke.
  → Vor dem Anschalten zählen, nicht danach messen. **Und danach getrennt zählen:** die Schattenhälfte kostet
  weit weniger Zeit als ihr Dreiecksanteil, also überschätzt jede Dreiecksdifferenz den erreichbaren Gewinn
  um rund den Faktor zwei — Culling und LOD erreichen nur den Beauty-Pass, das Schattenfrustum gehört dem
  Licht.
  *+2 980 800 Dreiecke (+90 %) für Grascasting · Herkunft: voxel-samurai-quiz · 2026-08-01*
  *zweiter Beleg: Schicht gesamt −1.65 … −2.20 ms, davon Schattenpass nur −0.25 … −0.65 ms, bei exakt
  hälftigem Dreiecksanteil; ein LOD, das 558 168 Dreiecke „entfernt", verkauft davon 279 084 und lässt die
  andere Hälfte als Schatten ohne Baum im Bild · Herkunft: claude-tower-defense · 2026-08-01*

- **„Grober Stellvertreter im Schattenpass, feine Geometrie im Bild" — geht in three nicht** — der
  naheliegendste Schattenhebel überhaupt, und er ist im Renderer verschlossen. `WebGLShadowMap.render` ruft
  **dieselbe** `renderObject`-Funktion wie der Beauty-Pass und übergibt ihr die **Hauptkamera**; darin steht
  `object.layers.test( camera.layers )`. Die Layer des Schattenkamera-Objekts werden beim Filtern **nie
  gelesen** — ein Caster auf eigenem Layer ist damit auch für den Schattenpass unsichtbar. `visible === false`
  kehrt aus demselben Grund vorher zurück, und der Vor-Schatten-Haken feuert erst **nach** beiden Tests, ist
  also zu spät, um Sichtbarkeit umzuschalten. → Vor dem Planen eines Proxy-Casters die drei Stellen im
  Renderer-Quelltext lesen, nicht die API-Namen. Wer den Weg trotzdem will, zahlt einen **zweiten Draw im
  Beauty-Pass** — das ist ein Aufschlag, kein Sparweg; der verbleibende Hebel ist die **Auflösung** der
  Schattenkarte, nicht die Objektmenge.
  *r180, im Quelltext nachgelesen statt aus der API geschlossen; die Annahme hatte eine ganze Phase getragen
  · Herkunft: claude-tower-defense · 2026-08-01*

## Handoffs

- Shaderpässe → [Shader/PBR](SHADERS.md)
- Evidenz → [Debug/Review](DEBUG-REVIEW.md)
- Kostenzahlen, die zitiert werden sollen → [Messhandwerk](MEASURING.md)
