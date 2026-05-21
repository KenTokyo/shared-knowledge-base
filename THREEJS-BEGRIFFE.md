# Three.js-Begriffe einfach erklärt

**Zweck:** Diese Datei erklärt die wichtigsten Begriffe aus `shared-docs/THREEJS-RULES.md` in einfacher Sprache. Sie ist für alle gedacht, die Performance-Protokolle lesen oder an 3D-Code arbeiten, aber nicht jeden Rendering-Begriff auswendig kennen.

## Draw Call

Ein Draw Call ist ein Auftrag an die Grafikkarte: „Bitte zeichne dieses Objekt mit diesem Material.“ Viele einzelne Meshes mit vielen Materialien erzeugen viele Draw Calls. Das kann langsam werden, auch wenn die Objekte klein aussehen.

**Merksatz:** 1.000 kleine Einzelobjekte können teurer sein als ein großer Batch.

## Triangle

Ein Triangle ist ein Dreieck im 3D-Modell. Die Grafikkarte zeichnet Modelle aus vielen Dreiecken. Je mehr Dreiecke sichtbar sind, desto mehr Geometrie muss verarbeitet werden.

**Beispiel:** Ein Voxel-Würfel hat mehrere Seitenflächen. Wenn unsichtbare Seiten trotzdem gerendert werden, entstehen unnötige Triangles.

## Geometry

Eine Geometry beschreibt die Form eines 3D-Objekts, also Punkte, Kanten, Flächen und oft auch UV-Daten. Viele gleiche Geometrien sollten geteilt oder instanced werden, statt immer wieder neu angelegt zu werden.

## Material

Ein Material beschreibt, wie eine Oberfläche aussieht: Farbe, Transparenz, Glow, Textur, Lichtverhalten oder Shader. Viele Materialvarianten erhöhen oft die Renderkosten, weil Objekte schlechter zusammengefasst werden können.

## Mesh

Ein Mesh ist die Kombination aus Geometry und Material. Beispiel: „Würfelform + grünes Material“ ergibt einen sichtbaren grünen Würfel.

## Instancing

Instancing bedeutet: Eine Geometry und ein Material werden einmal vorbereitet, aber viele Kopien davon werden mit unterschiedlichen Positionen, Farben oder Größen gezeichnet.

**Beispiel:** 100 gleiche Gegnerteile können als Instanzen günstiger sein als 100 einzelne Meshes.

## Batching

Batching bedeutet: Mehrere kleine Renderaufgaben werden zu einer größeren Aufgabe zusammengefasst. Das reduziert Draw Calls und CPU-Verwaltungskosten.

**Unterschied zu Instancing:** Instancing ist ideal für viele gleiche Objekte. Batching kann auch helfen, wenn mehrere Teile zusammen als ein gemeinsamer Renderpfad verarbeitet werden.

## Dirty-Signatur

Eine Dirty-Signatur ist ein kleiner Vergleichswert, der sagt: „Hat sich seit dem letzten Frame wirklich etwas geändert?“ Wenn Position, Farbe und Animation gleich geblieben sind, muss die Matrix nicht neu zur GPU hochgeladen werden.

**Merksatz:** Nicht jedes Frame neu schreiben, wenn sich nichts verändert hat.

## Matrix

Eine Matrix speichert bei 3D-Objekten Position, Rotation und Größe in einer Form, die die Grafikkarte gut verarbeiten kann. Bei Instancing bekommt jede Instanz meistens eine eigene Matrix.

## `instanceMatrix.needsUpdate`

Diese Flag sagt Three.js: „Die Instanz-Matrizen haben sich geändert, bitte zur GPU hochladen.“ Wenn `setMatrixAt()` genutzt wird, aber `needsUpdate` fehlt, kann die Anzeige veraltet bleiben.

## `instanceColor.needsUpdate`

Diese Flag sagt Three.js: „Die Instanz-Farben haben sich geändert.“ Sie ist nötig, wenn `setColorAt()` genutzt wurde.

## Bounding Volume

Ein Bounding Volume ist eine einfache Hülle um ein Objekt, zum Beispiel eine Kugel oder Box. Three.js nutzt sie, um schnell zu entscheiden, ob ein Objekt sichtbar sein könnte.

**Wichtig:** Wenn Instanzen stark verschoben werden, muss die Hülle manchmal neu berechnet werden, sonst kann ein Objekt falsch ausgeblendet werden.

## Culling

Culling bedeutet: Dinge, die nicht sichtbar sind, werden nicht gerendert. Das spart Arbeit. Bei Terrain und vielen Gegnern ist gutes Culling sehr wichtig.

## View-Culling

View-Culling bedeutet: Die Engine prüft, was die Kamera überhaupt sehen kann, und lässt den Rest weg. Das ist gut, weil die Grafikkarte nicht an Dingen arbeiten muss, die hinter der Kamera, zu weit weg oder außerhalb des Bildes liegen.

**Alltagsbeispiel:** Wenn du aus einem Fenster schaust, musst du nicht gleichzeitig die Rückseite des Hauses malen.

**Wichtig:** View-Culling darf keine wichtigen Gameplay-Signale verstecken. Boss-Warnungen, Trefferfeedback, Gegner direkt neben dem Spieler und Skill-Hitboxen müssen sichtbar bleiben.

## Frustum-Culling

Frustum-Culling ist die Standardform von View-Culling. Das Kamera-Sichtfeld ist wie ein unsichtbarer Kegel oder eine Pyramide. Objekte außerhalb dieses Bereichs werden nicht gezeichnet.

**Three.js-Hinweis:** Three.js macht Frustum-Culling für normale Objekte oft automatisch. Bei `InstancedMesh`, Chunks oder selbst gebauter Geometry muss die Bounding Sphere/Box aber stimmen, sonst wird etwas zu früh oder zu spät ausgeblendet.

## Distance-Culling

Distance-Culling bedeutet: Dinge ab einer bestimmten Entfernung werden ausgeblendet oder gar nicht mehr aktualisiert. Das ist nützlich für kleine Deko, entfernte Partikel, kleine Props oder Remote-VFX.

**Merksatz:** Was weit weg und unwichtig ist, darf verschwinden. Was fürs Spiel wichtig ist, braucht eine Ersatzdarstellung.

## Occlusion-Culling

Occlusion-Culling bedeutet: Dinge hinter anderen Dingen werden nicht gezeichnet, zum Beispiel ein Gegner hinter einer Wand. Das klingt perfekt, ist im Browser/Three.js aber nicht automatisch immer billig. Man nutzt es eher gezielt über Räume, Portale, Chunk-Logik oder einfache Sichtlinien.

## LOD / Level of Detail

LOD bedeutet: Ein Objekt hat mehrere Detailstufen. Nah an der Kamera sieht es schön und detailliert aus. Weit weg wird eine einfachere Version genutzt, weil man die kleinen Details sowieso kaum erkennt.

**Beispiel:** Ein naher Gegner hat Körperteile, Animation, Glow und Partikel. Ein weiter Gegner nutzt weniger Teile, weniger Animation oder nur eine einfache Silhouette.

**Wichtig:** LOD ist gut, aber kein Freifahrtschein für kaputte Optik. Übergänge dürfen nicht stark auffallen, und Gameplay-Hinweise müssen erhalten bleiben.

## Chunk

Ein Chunk ist ein Abschnitt einer großen Welt oder Karte. Statt die ganze Map auf einmal zu verarbeiten, teilt man sie in Stücke. Sichtbare Chunks bleiben aktiv, entfernte Chunks werden ausgeblendet.

## Voxel

Ein Voxel ist wie ein 3D-Pixel, meistens ein kleiner Würfel. Voxel-Welten sehen einfach aus, können aber sehr teuer werden, wenn jede Würfelseite einzeln und dauerhaft gerendert wird.

## Top-Face

Top-Face bedeutet: Nur die obere Fläche eines Voxels oder Tiles wird gerendert. Das ist oft viel günstiger als ein voller Würfel, wenn Seitenflächen nicht sichtbar oder nicht wichtig sind.

## Side-Skirt

Ein Side-Skirt ist eine einfache Seitenblende am Rand eines Terrains. Damit sieht ein Top-Face-Terrain weniger flach aus, ohne wieder komplette Würfel rendern zu müssen.

## Overdraw

Overdraw entsteht, wenn viele transparente oder halbtransparente Flächen übereinander liegen und dieselben Pixel mehrfach gezeichnet werden. Glow, Nebel, AOE-Kreise und Partikel können dadurch teuer werden.

## Transparent

Ein transparentes Material lässt etwas dahinter sichtbar. Transparenz ist in 3D oft teurer als normale undurchsichtige Flächen, weil Sortierung und mehrfaches Zeichnen nötig werden können.

## Additive

Additive ist ein Blend-Modus, bei dem Farben heller zusammenaddiert werden. Das sieht für Magie, Glow und Feuer oft gut aus, kann aber bei vielen Layern teuer werden.

## DoubleSide

DoubleSide bedeutet, dass Vorder- und Rückseite einer Fläche sichtbar sind. Das kann nützlich sein, aber bei transparenten Materialien mehr Draw Calls oder mehr Overdraw erzeugen.

## `forceSinglePass`

`forceSinglePass` ist eine Three.js-Option, die bei bestimmten doppelseitigen transparenten Objekten helfen kann, nur einen Renderdurchgang zu nutzen. Das muss visuell geprüft werden, weil Sortierung oder Look leiden können.

## `useFrame`

`useFrame` ist in React Three Fiber die Funktion, die jedes Frame läuft. Alles darin ist besonders kritisch, weil es 60, 120, 240 oder noch öfter pro Sekunde ausgeführt werden kann.

**Merksatz:** Was in `useFrame` steht, muss extrem billig sein.

## Hotpath

Ein Hotpath ist ein Codepfad, der sehr oft oder in kritischen Momenten läuft. Bewegungen, Trefferlogik, Skill-VFX und Gegnerupdates sind typische Hotpaths.

## React-State-Churn

React-State-Churn bedeutet: State wird sehr oft geändert und löst viele Re-renders aus. In 3D-Szenen kann das teuer werden, weil React dann Arbeit macht, die besser direkt über Refs oder Runtime-Objekte laufen sollte.

## Pooling

Pooling bedeutet: Objekte werden wiederverwendet, statt ständig neu erzeugt und gelöscht zu werden. Bei Partikeln, Slashes, Damage Numbers und VFX spart das viele kleine Kosten.

## Queue

Eine Queue ist eine Warteschlange. VFX-Events können erst gesammelt, priorisiert und dann kontrolliert gerendert werden. So explodiert die Last nicht, wenn viele Skills gleichzeitig passieren.

## Descriptor

Ein Descriptor ist eine kleine Beschreibung eines Effekts oder Events, zum Beispiel „Slash an Position X, Farbe Y, Dauer Z“. Der Descriptor ist billiger als sofort viele Meshes zu erzeugen.

## Remote-Mirror-VFX

Remote-Mirror-VFX bedeutet: Effekte anderer Spieler werden nicht durch lokale Klassenrenderer nachgebaut, sondern über vereinfachte Event-Beschreibungen gespiegelt. Das verhindert, dass alle Klassen-Systeme gleichzeitig aktiv sein müssen.

## PostFX

PostFX sind Effekte nach dem eigentlichen Rendern, zum Beispiel Bloom, Vignette, Blur oder Tone Mapping. Sie können gut aussehen, aber je nach Backend und Auflösung stark kosten.

## DPR / Resolution Scale

DPR steht für Device Pixel Ratio. Eine höhere interne Auflösung sieht schärfer aus, kostet aber mehr GPU-Arbeit. Resolution Scale reduziert oder erhöht diese interne Renderauflösung.

## WebGL

WebGL ist die klassische Browser-Grafikschnittstelle, die Three.js seit langer Zeit nutzt. Sie ist stabil und breit unterstützt.

## WebGPU

WebGPU ist eine neuere Browser-Grafikschnittstelle. Sie kann in manchen Fällen schneller oder moderner sein, löst aber schlechte Architektur nicht automatisch.

## A/B-Messung

A/B-Messung bedeutet: Zwei Varianten werden unter gleichen Bedingungen verglichen. Beispiel: gleiche Szene, gleiche Gegnerzahl, gleicher Skill, einmal WebGL und einmal WebGPU.

## Visuelle Parität

Visuelle Parität bedeutet: Zwei Varianten sehen gleich genug aus. Ein Performance-Fix zählt nicht als fertig, wenn dadurch Skill-Hitboxen, Gegner, Terrain oder wichtige Effekte verschwinden.
