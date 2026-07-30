# Charakteranimation, Rigging und Cloth

- **Status:** optionale „könnte“-Tipps; lokale Skeletons, Clips, APIs → Vorrang

## Fünf Tipps

- **1 · Trackvertrag könnte enthalten:**
  - `restLocal × authoredDelta`
  - keine Operand-/Output-Aliase
  - mutierende Additive-Hilfen → geklonte Tracks
- **2 · Bewegungsphasen könnten sichtbar sein:**
  - Antizipation → Impact → Follow-through → Settle
  - Events nach Mixer: `(previousTime, currentTime]` + Loop-Wrap
  - gemessene Peak-, Release-, Footfall-Zeit
- **3 · Kontakt/Waffenweg könnten geprüft werden:**
  - Ground-Gap; längste Flugzeit; Plant-Anteil
  - Meter pro Bake-Frame; sichere Waffenwinkel
  - VFX am ausgewerteten Waffenpfad
- **4 · Skinning/Cloth könnte prüfen:**
  - bekannte Bind-Vertices: CPU/GPU
  - eigene Cloth-Topologie + Gewichte
  - Snapshot: `boneCount × 16`; kein Padding
  - `vertexColors` → `color`-Attribut auf jedem Pfad
- **5 · Gegenbeweis könnte Diagnose wählen:**
  - schwebende Füße → ganze Clipzeit statt Minimum
  - springender Trail → Waffenweg pro Frame
  - gekippte Additive-Pose → Restpose + Trackkopie
  - Snapshot-Crash → Bonecount vs. Bufferpadding
  - schwarze Figur → Color-Attribut + Bindpose

## Handoffs

- Effekttiming → [VFX](VFX.md)
- Reihenfolge/Uhren → [Runtime-Integration](RUNTIME-INTEGRATION.md)
