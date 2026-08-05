# Drei Weltarchitektur-Prompts für Voxel Samurai Quiz — Tasks

## Nutzerziel

- Drei einzeln kopierbare Prompts für dasselbe Endlos-Voxel-Hack-and-Slash liefern.
- Nur Map-Aufbau, Map-Rendering, Lichtkopplung und Skill-Reaktion der Map unterscheiden.
- Varianten heißen `Voxel Style`, `Ashen Coast Style` und `Cloud Flakes Style`.
- Ashen-Coast-Variante übernimmt lokale AEON-/V73-Prinzipien für authored Specs, Bake, Runtime, Wasser und Licht.
- Cloud-Flakes-Variante übernimmt belegte stackneutrale Prinzipien für Terrain, Deformation, Rückstände und Licht.

## Lösungswahl

- **Gewählt:** Drei vollständige Standalone-Dateien plus kompakter Index; gemeinsamer Spielvertrag wird statisch auf Gleichheit geprüft.
- **Verworfen:** Basis-Prompt plus drei Deltas; nicht direkt kopierbar und anfällig für fehlenden Kontext.
- **Verworfen:** Generatorskript aus einer Vorlage; unnötige Tooling-Abhängigkeit für drei Dokumente.

### Phase 1 — Referenz und Vergleichsvertrag

**Ziel:** Cloud-Flakes-Prinzipien und unveränderliche Spielteile sind belegt abgegrenzt.

- [x] Terrain-, Deformations-, Skillkontakt-, Reset- und Lichtpfad in `Claude-Flakes` gelesen.
- [x] Gemeinsamen Spielvertrag aus bestehendem Promptvergleich erhalten.
- [x] Drei ausschließlich mapbezogene Unterschiede festgelegt.

**Ergebnis:** Voxel-Module, Kazenoshima-Spec/Bake und Cloud-Flakes-Heightfield/Clipmap reagieren über denselben Skillkontaktvertrag, ohne Spielsysteme zu verändern.

**Referenzen:**
- `shared-docs/projects/voxel-samurai-quiz/RPG-DUNGEON-WELTARCHITEKTUR-PROMPTS.md`
- `d:/CODING/React Projects/github-repos-examples/Claude-Flakes/src/terrain/`
- `d:/CODING/React Projects/github-repos-examples/Claude-Flakes/src/render/`

### Phase 2 — Drei eigenständige Promptdateien

**Ziel:** Jede Datei kann ohne weitere Referenz als vollständiger Bauauftrag kopiert werden.

- [x] `Voxel Style` mit authored Voxel-Modulen und voxelgerechten Map-Rückständen erstellt.
- [x] `Kazenoshima Style` mit gemeinsamer Spec-/Bake-Weltengine und Feldmodifikatoren erstellt.
- [x] `Cloud Flakes Style` mit Clipmap-/Heightfield-/Deformationsfeld-Prinzipien erstellt.
- [x] Produkt, Charakter, Kampf, Skills, Gegner, Wellen, Spawn, UI und Audio wortgleich gehalten.

**Ergebnis:** Drei vollständige Einzelprompts teilen denselben Spiel- und Skillkontaktvertrag; nur Map-Owner und Lieferpfad variieren.

**Referenzen:**
- `shared-docs/projects/voxel-samurai-quiz/prompts/voxel-style.md`
- `shared-docs/projects/voxel-samurai-quiz/prompts/kazenoshima-style.md` — in Phase 4 durch `ashen-coast-style.md` ersetzt
- `shared-docs/projects/voxel-samurai-quiz/prompts/cloud-flakes-style.md`

### Phase 3 — Index, Ablösung und Abschlussabgleich

**Ziel:** Wissensbasis führt eindeutig zu drei aktuellen Einzelprompts; alte Doppeldatei erzeugt keine zweite Quelle.

- [x] Promptordner indexiert und Architekturunterschiede knapp erklärt.
- [x] Bisherigen Doppelprompt auf neue Einzeldateien umgestellt.
- [x] Projekt-Learning-Index aktualisiert.
- [x] Dateigleichheit, Links, UTF-8, Mojibake, Dateiende und Git-Diff geprüft.
- [x] Shared-Docs committen/pushen; danach Eltern-Pointer committen/pushen.

**Ergebnis:** Wissensbasis führt eindeutig zu drei Einzelprompts; alte Doppeldatei bleibt nur als kompatibler Wegweiser.

**Referenzen:**
- `shared-docs/projects/voxel-samurai-quiz/prompts/README.md`
- `shared-docs/projects/voxel-samurai-quiz/RPG-DUNGEON-WELTARCHITEKTUR-PROMPTS.md`
- `shared-docs/projects/voxel-samurai-quiz/README.md`

## Kommentare

### Phase 1

**Eingehalten:** Referenzrepo nur gelesen ✅, stackneutrale Übernahme statt Babylon-/WGSL-Kopie ✅, genau ein Cloud-Flakes-Projekttipp gelesen ✅, keine Browser-/Gameplayprüfung ✅.

**Auffälligkeiten/Performance-Issues/Probleme/Kritische Findings:** 🟡 Cloud Flakes ist eine 2.048-m-Schneewelt; Zahlen und Schneekanäle dürfen nicht blind auf zwei maximal 600 Einheiten große Stein-/Waldwelten übertragen werden. Fix: Prompt fordert bedarfsgeleitete Auflösung und materialsemantische Zustandskanäle.

### Phase 2

**Eingehalten:** jede Promptdatei eigenständig kopierbar ✅, nur Map-System variiert ✅, Bewegung plus acht Skills reagieren auf Map ✅, feste Kapazitäten/Reset/Passparität ✅, jede Datei deutlich unter 1.600 Zeilen ✅.

**Auffälligkeiten/Performance-Issues/Probleme/Kritische Findings:** 🟡 Früherer Orchestrierungsblock hätte Subagents ohne aktuellen Opt-in erlaubt. Fix: alle drei Prompts nutzen wortgleichen linearen Integrationsowner und verbieten ungefragte Browser-/Gameplayprüfung.

### Phase 3

**Eingehalten:** 15 Nicht-Map-Abschnitte wortgleich ✅, je acht Skillreaktionen ✅, je zehn Gegnerarten ✅, Bossrhythmus `5, 10, 15, …` ✅, Links/UTF-8/Mojibake/Dateiende sauber ✅, fremde Änderungen unangetastet ✅.

**Auffälligkeiten/Performance-Issues/Probleme/Kritische Findings:** Keine offenen Funde im damaligen Lieferumfang. Sichtbare Mapwirkung und gemessene Laufzeit bleiben bewusst manuelle Gates.

### Phase 4 — Kazenoshima durch lokale V73 Ashen Coast ersetzen

**Ziel:** Zweiter Prompt basiert ausschließlich auf belegter lokaler AEON-/V73-Bauweise; Kazenoshima verschwindet aus aktuellem Promptset.

- [x] `v73-ashen-coast`, Weltregistrierung, Bake-/Runtime-Owner und Lichtprofil gelesen.
- [x] `kazenoshima-style.md` durch eigenständige Datei `ashen-coast-style.md` ersetzt.
- [x] Promptindex, Wegweiser, Auswahlhilfe und Taskreferenzen auf Ashen Coast aktualisiert.
- [x] Gemeinsame Nicht-Map-Abschnitte erneut auf Wortgleichheit geprüft.
- [x] Links, UTF-8, Mojibake, Dateiende und Git-Diff geprüft; Submodul und Eltern-Pointer liefern.

**Ergebnis:** Drei aktive Einzelprompts vergleichen jetzt Voxel Style, lokalen Ashen Coast Style und Cloud Flakes Style; 15 Nicht-Map-Abschnitte bleiben wortgleich.

**Referenzen:**
- `src/engine/world/worlds/v73AshenCoast.js`
- `docs/aeon-engine/aeon-engine-overview.md`
- `shared-docs/projects/voxel-samurai-quiz/prompts/ashen-coast-style.md`

### Phase 4

**Eingehalten:** lokale V73-/AEON-Owner belegt ✅, V73 unverändert ✅, aktiver Prompt und Links vollständig umbenannt ✅, drei Standalone-Prompts erhalten ✅, keine Browser-/Gameplayprüfung ✅.

**Auffälligkeiten/Performance-Issues/Probleme/Kritische Findings:** 🟡 V73 ist größer und höher aufgelöst als die Zielwelten; Zahlen wurden deshalb nicht kopiert. Der Prompt fordert separate, bedarfsgeleitete Feldauflösungen und LOD nur bei belegtem Nutzen. Skillrückstände bleiben als begrenztes Runtime-Overlay vom unveränderlichen Bake getrennt.
