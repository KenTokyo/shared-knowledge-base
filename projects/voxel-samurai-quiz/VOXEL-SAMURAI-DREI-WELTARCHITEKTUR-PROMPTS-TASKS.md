# Drei Weltarchitektur-Prompts für Voxel Samurai Quiz — Tasks

## Nutzerziel

- Drei einzeln kopierbare Prompts für dasselbe Endlos-Voxel-Hack-and-Slash liefern.
- Nur Map-Aufbau, Map-Rendering, Lichtkopplung und Skill-Reaktion der Map unterscheiden.
- Varianten heißen `Voxel Style`, `Ashen Coast Style` und `Claude Flakes Style`.
- Ashen-Coast-Variante übernimmt lokale AEON-/V73-Prinzipien für authored Specs, Bake, Runtime, Wasser und Licht.
- Claude-Flakes-Variante übernimmt belegte stackneutrale Prinzipien für Terrain, Deformation, Rückstände und Licht.
- Aktuelle Erweiterung: alle kopierbaren Prompts und Spieltexte auf Englisch; Stilname `Claude Flakes` statt `Cloud Flakes`.
- Je Stil eine Long- und Short-Fassung unter einer klaren New-Game-Ordnerstruktur.
- Jump, separater Dodge, Dash-Skill, Luftskill und hochwertiges Slash-VFX-Layering sind Pflicht.
- Aktuelle Erweiterung: je Stil zusätzliche Long-/Short-Subagent-Fassung mit Three.js-Blindvergleich und hartem Qualitätsloop.
- Current extension: three monster-showcase prompts output one offline `monster.html` each, with ten original creatures per style.

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

### Phase 5 — Englische Long-/Short-Prompts unter New-Game-Kategorie

**Ziel:** Sechs eindeutig kategorisierte, englische Standalone-Prompts enthalten vollständigen Spielvertrag oder bewusste Kurzfassung.

- [x] Ordner `prompts/new-games/endless-voxel-slasher/{long,short}/` angelegt und Altdateien migriert.
- [x] Drei Long-Prompts vollständig ins Englische übertragen; Nicht-Map-Vertrag wortgleich gehalten.
- [x] `Cloud Flakes` vollständig in `Claude Flakes` umbenannt.
- [x] Englisch-only-UI, Jump, Dodge, Dash, Luftskill und Slash-VFX-Research/-Layering ergänzt.
- [x] Drei Black-Desert-inspirierte Short-Prompts erstellt.
- [x] Rootindex, Spieleindex und Wegweiser auf neue Kategorie aktualisiert.
- [x] Struktur, Links, Sprachreinheit, Inhaltsparität, UTF-8, Dateiende und LOC geprüft; Submodul und Eltern-Pointer liefern.

**Ergebnis:** Kategorie `new-games/endless-voxel-slasher` führt zu drei englischen Long- und drei englischen Short-Prompts mit identischem Spielvertrag und klar getrennten Map-Stilen.

**Referenzen:**
- `shared-docs/projects/voxel-samurai-quiz/prompts/new-games/endless-voxel-slasher/`
- `shared-docs/projects/voxel-samurai-quiz/prompts/README.md`
- `shared-docs/projects/voxel-samurai-quiz/RPG-DUNGEON-WELTARCHITEKTUR-PROMPTS.md`

### Phase 5

**Eingehalten:** sechs Standalone-Prompts ✅, 15 gemeinsame Long-Abschnitte wortgleich ✅, Englisch-only-Vertrag ✅, Jump + separater Dodge + Q-Dash + Luftskill ✅, VFX-Research und 11+ kausale Layerrollen ✅, keine Browser-/Gameplayprüfung ✅, alle Dateien unter 1.600 Zeilen ✅.

**Architektur passt:** Promptbibliothek kategorisiert erst nach `new-games`, dann nach konkretem Spiel, anschließend nach `long`/`short`; jedes Spielset besitzt einen eigenen Index als SSoT.

**Auffälligkeiten/Performance-Issues/Probleme/Kritische Findings:** Keine offenen Funde. Black Desert bleibt ausdrücklich Qualitätsbenchmark ohne Asset-/Inhaltskopie; sichtbares Kampfgefühl und gemessene 60 FPS bleiben ehrliche manuelle Gates.

### Phase 6 — Schwertkämpfer und technologiegestützter Elementar-Techniker

**Ziel:** Alle sechs Prompts verlangen zwei gleichwertige Klassen mit neun Skills auf `Q E R 1 2 3 4 5 6`.

- [x] Schwertkämpfer auf neun Skills erweitert und `6 — Thousandfold Horizon` ergänzt.
- [x] Elementar-Techniker als technisch erklärten Magier mit eigenem Rig, Ressource, Animationen und neun Skills ergänzt.
- [x] Feuer, Eis, Donner, Wind, Magma und Gravitation über sichtbare Geräteketten statt unerklärter Magie festgelegt.
- [x] Große Flächenangriffe, Luftvariante, Map-Reaktionen, VFX-/Audio-Layer, Bossregeln, Pooling und harte Laufzeitgrenzen definiert.
- [x] Welt-/Klassenauswahl, HUD, Steuerung, Lieferfolge und Fertigkriterien auf zwei Klassen umgestellt.
- [x] Drei Long- und drei Short-Prompts sowie beide Indizes statisch auf Parität, Sprache, Links, UTF-8, Dateiende und LOC geprüft.

**Ergebnis:** Swordfighter und Elemental Technician sind in allen sechs englischen Prompts vollständige Auswahlklassen; der Techniker erzeugt extreme, lesbare Flächenangriffe durch Plasma-, Kryo-, Tesla-, Turbinen-, Induktions- und Gravitationstechnik.

**Architektur passt:** Ein Game Host und eine gemeinsame Klassendefinitionsquelle besitzen Auswahl, Eingaben, Ressourcen, Skills, HUD und Map-Kontakte; Map-Stile bleiben alleiniger Variantenbereich.

**Eingehalten:** neun Skills je Klasse ✅, gleiche Featuretiefe ✅, Englisch-only ✅, sechs Standalone-Prompts ✅, keine Browser-/Gameplayprüfung ✅, Dateien unter 1.600 Zeilen ✅.

**Auffälligkeiten/Performance-Issues/Probleme/Kritische Findings:** 🟡 Extreme Techniker-AoE kann Transparenz-, Licht- und Objektkosten sprengen. Fix: authored Grenzen, feste Slots, gepoolte Felder/Trümmer/Lichter, begrenzte Kettenziele und klare Degradationsreihenfolge sind Promptpflicht.

### Phase 7 — Drei HTML-only-Chat-Prompts

**Ziel:** Jede Weltvariante besitzt einen kompakten Chat-Prompt, dessen einzige Lieferung eine lokal öffnungsfähige `index.html` ist.

- [x] Ordner `html-only/` als dritte Promptform neben `long/` und `short/` angelegt.
- [x] Voxel-, Ashen-Coast- und Claude-Flakes-Variante als eigenständige englische Chat-Prompts erstellt.
- [x] Ausgabe auf eine Datei, `file://`-Start und vollständig eingebettete CSS-/JavaScript-/GLSL-/Audio-Inhalte festgelegt.
- [x] CLI, npm, Build, Server, Imports, CDN, Netzwerkzugriffe, externe Bibliotheken und Zusatzassets ausgeschlossen.
- [x] Zwei Welten, zwei Klassen, 18 Skills, zehn Gegner, Bossrhythmus, VFX, Audio, Map-Reaktion und HUD erhalten.
- [x] Spieleindex, Rootindex und kompatiblen Wegweiser auf neun Prompts erweitert.
- [x] Gemeinsame Absätze, Stiltrennung, Links, Englisch, UTF-8, Dateiende und LOC statisch geprüft.

**Ergebnis:** Drei direkt in Chat-Oberflächen nutzbare Kurzprompts fordern je eine vollständige `index.html`; nur Weltbau, Rendering, Lichtkopplung und Oberflächenreaktion unterscheiden sich.

**Architektur passt:** `html-only/` ist eine eigene Lieferform desselben Spiels; jeder Prompt bleibt standalone, während der Spieleindex Konstanten und Auswahl besitzt.

**Eingehalten:** exakt drei Varianten ✅, eine Ausgabedatei ✅, ohne CLI/Build/Server ✅, vollständiger Klassen-/Wellenvertrag ✅, keine Browser-/Gameplayprüfung ✅.

**Auffälligkeiten/Performance-Issues/Probleme/Kritische Findings:** 🟡 Vollständiges 3D-Spiel in einer HTML-Datei erzeugt große Ausgabe und erhöht Umsetzungsdruck. Fix: Prompt erlaubt vereinfachte prozedurale Details, aber keine ausgelassenen Systeme, Fake-Buttons oder statische Scheinlösung; strukturierte Abschnitte ersetzen Minifizierung.

### Phase 8 — Orchestrierte Long-/Short-Prompts mit Blindvergleich

**Ziel:** Drei Long- und drei Short-Kopien erlauben ausdrücklich Subagenten, Three.js-Sichtprüfung, harte Kritik und einen echten blinden Qualitätsvergleich.

- [x] Ordner `long-subagent/` und `short-subagent/` neben den bisherigen Lieferformen angelegt.
- [x] Sechs bestehende Standalone-Prompts verlustfrei übernommen; nur Titel und Ausführungsprofil unterscheiden.
- [x] Disjunkte Subagent-Tracks, zentralen Integrationsowner und prüfbare Rückgaben festgelegt.
- [x] Gewünschten Call-of-Duty-Qualitätsloop als letzten Promptteil wortgleich in alle sechs Dateien gesetzt.
- [x] Spieleindex, Rootindex und kompatiblen Wegweiser auf 15 Promptvarianten aktualisiert.
- [x] Inhalt, Parität, Schlussposition, Links, Englisch, UTF-8, Mojibake, Dateiende und LOC statisch geprüft.
- [x] Shared-Docs committen/pushen; danach ausschließlich Elternrepo-Submodule-Pointer committen/pushen.

**Ergebnis:** Sechs kopierbare Subagent-Prompts behalten den vollständigen Spielvertrag, erlauben ausdrücklich orchestrierte Umsetzung, Sichtprüfung und Blindvergleich und sind über Shared-Docs geliefert.

**Architektur passt:** Bestehende Prompts bleiben unveränderte lineare Baseline; neue Ordner kennzeichnen das abweichende orchestrierte Ausführungsprofil eindeutig.

**Eingehalten:** Nutzer-Opt-in für Subagents und Sichtvergleich dokumentiert ✅, bestehende Promptformen bleiben unangetastet ✅, keine Runtime- oder Codeänderung ✅.

**Auffälligkeiten/Performance-Issues/Probleme/Kritische Findings:** 🟡 Begeisterung eines Subagenten ist kein Qualitätsbeleg. Fix-Pfad: Prompt verlangt echte Side-by-Side-Evidenz, Blindurteil, konkrete Defizite, zentral integrierte Korrekturen und ehrliche Kennzeichnung jedes nicht ausführbaren manuellen Gates.

### Phase 9 — Three HTML-only monster showcases

**Goal:** Voxel, Ashen Coast, and Claude Flakes each receive one standalone chat prompt that outputs exactly one offline `monster.html` with ten unique stone-like voxel creatures.

- [x] Created `monster/` as a dedicated prompt format beside the game-build variants.
- [x] Defined eight regular creatures and two bosses per style; all 30 names, silhouettes, locomotion systems, and material identities are distinct.
- [x] Enforced glowing eyes as the only visible facial feature on every creature.
- [x] Required an interactive WebGL2 gallery, selector, clean hero viewport, scale cue, animation controls, responsive UI, and complete offline behavior.
- [x] Kept each response to one self-contained `monster.html`; CLI, build tools, imports, CDN, network calls, and external assets are forbidden.
- [x] Updated the game index, root prompt index, and compatibility guide from 15 to 18 prompts.
- [x] Validated creature counts, name uniqueness, bosses, output contract, shared sections, links, English, UTF-8, Mojibake, final newline, and LOC.
- [x] Committed and pushed Shared Docs; the parent submodule pointer is the final delivery commit.

**Result:** Three delivered standalone prompts define 30 unique stone-like voxel creatures and one offline `monster.html` gallery per style.

**Architecture fits:** `monster/` is a focused HTML-only showcase format inside the existing game prompt library; the three files share one gallery contract while style-specific creature rosters stay fully independent.

**Rules met:** existing prompt SSoT continued ✅, duplicate runtime work avoided ✅, no browser or gameplay run ✅, English-only new artifacts ✅.

**Findings/performance/critical issues:** 🟡 Thirty creatures inside one page can trigger heavy startup and GPU cost. Fix path: render one selected hero at full detail, reuse one renderer and shared geometry/material families, dispose switched resources, cap DPR/effects, and degrade background polish before silhouette or animation.

### Phase 10 — Offline renderer fallbacks and `monster-html` migration

**Goal:** All six HTML-only prompts keep their offline single-file contract and produce a usable interactive result when WebGL2 is unavailable.

- [x] Replace each hard WebGL2 requirement with the ordered runtime ladder `WebGL2 → WebGL1 → Canvas 2D`.
- [x] Require shared simulation, creature definitions, input, UI, and lifecycle state across renderer adapters instead of separate reduced products.
- [x] Keep Canvas 2D genuinely animated and interactive; forbid screenshots, static cards, fake 3D DOM stacks, and disabled controls as fallback output.
- [x] Require WebGL1-compatible shaders/resources and a fresh canvas per backend attempt; preserve state when an initialized GPU context is lost.
- [x] Rename `monster/` to `monster-html/` and update every prompt-library link and structure contract.
- [x] Validate fallback wording, exact file contracts, links, English, UTF-8, Mojibake, final newlines, LOC, and scoped Git diff.
- [ ] Commit and push Shared Docs; then commit and push only the parent submodule pointer.

**Result:** All six prompts now preserve one offline product across WebGL2, WebGL1, and live Canvas 2D; current indexes resolve through `monster-html/`.

**Architecture fits:** One renderer-independent product state feeds three ordered adapters; each prompt stays standalone, and `monster-html/` names the artifact format without colliding with runtime monster ownership.

**Rules met:** existing append-only task continued ✅, one prompt mode and one renderer owner read ✅, Ironhold delivery contract checked directly ✅, no browser/gameplay run ✅.

**Findings/performance/critical issues:** 🟡 Historical Operation Ironhold allowed Three.js r128 from CDN, while its current repository is a Vite/React multi-file app; neither is evidence for weakening the offline `file://` contract. Fixed: all six prompts keep renderer code inline and network-free. Static evidence: six ladders found, zero hard WebGL2-error phrases, old folder absent, new folder present, prompt files 23–68 lines, links and Mojibake scan clean.
