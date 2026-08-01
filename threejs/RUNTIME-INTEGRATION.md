# Runtime-Integration, Uhren und Audio

- **Status:** optionale „könnte“-Tipps; lokale Reihenfolge, Clocks, APIs → Vorrang

## Fünf Tipps

- **1 · Updatevertrag könnte enthalten:**
  - Input → Gameplay → Animation → Kontakt/VFX → Kamera → Render
  - öffentliche API: Owner; Signatur; Lebenszyklus; Koordinatenraum
  - additive Erweiterung statt stiller Signaturänderung
- **2 · Clockdomänen könnten getrennt sein:**
  - Simulationszeit → Welt; Animation; VFX
  - Realzeit → geeignete Kamera/UI
  - `AudioContext.currentTime` → Audio-Scheduling
  - `timeScale(0)` ≠ Hard-Freeze
- **3 · Poolidentität könnte Generation sein:**
  - Generationstoken statt Objektadresse
  - Reuse → alte Trails; Lichter; Voices; Snapshots lösen
  - Fired/Refused/Stale-Event-Zähler
- **4 · Audio-/Ressourcenowner könnten enthalten:**
  - AudioContext nach User-Geste
  - positional World-Cues; globale UI-Cues
  - Voice-Cap; Priorität; Stealing; Loop-Stopp; Deduplizierung
  - Renderziele/Pipelines/Pools: Resize + Dispose
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - Effekt einen Frame spät → Publisher-/Consumer-Reihenfolge
  - Hit-Stop verschiebt Audio → alle Clockdomänen loggen
  - alter Trail auf neuem Gegner → Generation vergleichen
  - stummer Test ändert Bild → RNG-Streams zählen
  - Contract grün, Boot rot → echtes Szenario + Console + Pixel

## Belegte Tipps

Format und Änderungsrecht: [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md).

- **Gameplay liest die Kamerarichtung** — Trefferbogen, Zielhilfe oder Aufsammeln brechen, sobald ein neuer
  Kameramodus die Peilung dreht, und niemand sucht die Ursache in der Kamera. → Gameplay peilt aus dem
  **Spielerzustand** (`pitch`/`yaw`), nicht aus `camera.getWorldDirection()`. Vor jedem Rig-Umbau danach
  greppen; legitim sind nur Messobjekte und Billboards (`camera.quaternion`).
  *Bei 39 ° Schwenk lag die Schwingebene 1,26 m unter der Peilung, unter dem Fuß des Ziels; der 54°-Bogen zog
  sich auf 41° · Herkunft: voxel-samurai-quiz · 2026-08-01*

## Handoffs

- Kosten → [Performance](PERFORMANCE.md)
- Capture → [Debug/Review](DEBUG-REVIEW.md)
- Zahlen, auf die eine Entscheidung folgt → [Messhandwerk](MEASURING.md)
