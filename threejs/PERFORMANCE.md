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

## Handoffs

- Shaderpässe → [Shader/PBR](SHADERS.md)
- Evidenz → [Debug/Review](DEBUG-REVIEW.md)
