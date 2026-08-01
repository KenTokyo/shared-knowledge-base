# Capture und Messhandwerk — claude-flakes

**Lesen wenn:** du `tools/shoot.mjs`, `src/capture/`, Presets, A/A, A/B, Crops oder Bildmetriken anfasst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **WebGPU verschwindet mit „hilfreichen“ GPU-Flags** — `--use-angle=vulkan` und `--enable-features=Vulkan` ließen `requestAdapter()` `null` liefern; `--disable-vulkan-surface` entfernte `navigator.gpu`. → `--headless=new` ohne spekulative GPU-Flags starten und den aktiven Renderer messen.
  *Ohne Zusatzflag echter NVIDIA-Adapter; drei vermeintliche WebGPU-Flags einzeln widerlegt · 2026-07-29*

- **Software-Erkennung liest die Geräteliste statt das aktive Gerät** — neben der RTX stand „Microsoft Basic Render Driver“, ein Join hätte jeden echten Lauf abgebrochen. → Nur aktives Gerät plus `glRenderer` prüfen; Software-Treffer ist Exit-Code, nicht Warnung.
  *RTX 2080 aktiv, Basic Render Driver nur zweiter Listeneintrag · 2026-07-29*

- **Freeze liefert Schwarz statt Stillstand** — `h=0` machte in `controller.js` aus `(velocity-prevVelocity)/h` ein `0/0`; NaN wanderte bis in die View-Matrix. → Jeden Zeitdivisor und Solver auf `dt<=0`, NaN und negative Schritte prüfen; den NaN-Detektor einmal vergiften.
  *Schwarzframe auf Capture und Nutzer-Setting; absichtliches `heightAt→NaN` löste danach 36 Diagnosen aus · 2026-07-29*

- **Zwischen CDP-Kommandos läuft die Welt weiter** — `cast()` und `advance()` waren durch rund zehn unangeforderte Frames bzw. 0,15 s getrennt. → Simulationszeit nur auf einem gelatchten angeforderten Frame verbrauchen; Readback direkt nach `scene.render()` bedienen.
  *Größter Determinismusfehler der ersten Pipeline; erst `_serving` machte den Zeitpunkt kontrollierbar · 2026-07-29*

- **`clear()` setzt sichtbare Objekte zurück, aber nicht ihre Geschichte** — Cloth, Kamerafedern, TAA, Wasser-/Eis-/Wake-Uhren, gepflanzte Prismen und Bruchschulden überlebten Shots. → Vollständigen Rewind als eine API führen; GPU-Daten, Cursor, Debts, Clocks und History einschließen, RNG **zuletzt** zurückspulen.
  *A/A mit TAA: ~5,8 % → 0,00 %; sechs gleiche Sweep-Zeitpunkte danach delta max 0 · 2026-07-29/30*

- **Gleiche Zahl von Random-Zügen, anderes Bild** — `_formOwed` verschob vier Körner um einen Frame; die Anzahl der Züge blieb konstant, der Partikelhash nicht. → Bei A/A Hash, Live-Zahl, Cursor und Bruchschulden fingerprinten; Checksummen über Float-Bytes, keine kompensierbaren Summen.
  *Drei von neun Shots bildeten exakt den zweiten Zustand; 4 Körner änderten über Light Shafts 11,47 % des Frames · 2026-07-30*

- **„Default“-Look erbt die vorige Kamera** — `pose()` schrieb nur gelieferte Achsen; `far,default` ließ Default mit Pitch 0,260 und Distanz 11 statt 0,170/6,2 laufen. → Kameraeinstellungen wie Settings aus vollständigem Default plus Shot-Diff bilden.
  *Die volle Look-Matrix war bis zur Gegenprobe still falsch kadriert · 2026-07-30*

- **Arithmetisch richtiger Eventzeitpunkt ist fotografisch leer** — Bloom bei 0,45 s und alle fünf Impact-Presets lagen auf Release, bevor Geometrie oder Staub sichtbar wurden. → Um das Ereignis einen Zeitstreifen messen und den ersten lesbaren Frame wählen; vor Release zwei Frames Sicherheitsmarge lassen.
  *Bloom 0,45→0,50 s; Crystallise erst bei 1,4 s erster Durchbruch und bei 1,6 s eindeutig Eis · 2026-07-29/30*

- **Rauschboden als Projekteigenschaft zitiert** — je nach Sitzung und Look war A/A bitgleich oder max Delta 2–4; alte Handovers erklärten abwechselnd 0 und 6 zum Boden. → Boden in derselben Sitzung, demselben Look und derselben Vorgeschichte messen; `notaa` für kausale Shader-A/B bevorzugen.
  *`notaa` mehrfach 25/25 bitgleich; `shadow`/`zoom` zugleich mit Delta 2 innerhalb einer Sitzung · 2026-07-30/31*

- **A/B ändert den Zufallsstrom statt den untersuchten Term** — Audio entmuten oder Vapor-Emission abschalten verschob Shards und Partikel, obwohl die Bildfrage stumm bzw. lokal war. → Für kausale A/B nur streamneutrale Hebel verwenden: Shaderterm, `discard`, Opazität, Skalar auf bereits gezogenem Zufall.
  *Audio-Reset bewegte 14 % eines tonlosen Crystallise-Frames bis Delta 84; Solo-`discard` isolierte Vapor sauber · 2026-07-30*

- **Ganzbildmetrik zeigt das falsche Subjekt** — `clipped` maß die Sonnenscheibe, Hochpass belohnte 0,15-px-Riss-Aliasing und zwei frühe Kornfenster lagen neben den Körnern. → Region einmal aus dem echten Frame ableiten, Maske und Nachbarschaft auf das Subjekt begrenzen, Kontrollcrop mitführen.
  *Formationscrop 20/20 bei 0,00 % Clipping, während das Vollbild lookkonstant 0,06–0,18 % meldete · 2026-07-31*

- **Langer Matrixlauf gilt trotz Dateien als fertig** — Notifications meldeten „stopped“, Renderer rebootete, oder der Ordner mischte zwei Generationen. → Abschluss nur aus `wrote N`, Summary, Zeitfenster und Exit-Code lesen; Bridge einmalig rebooten und Shot wiederholen, erst nachdem `clear()` deterministisch ist.
  *175/175 erst nach Neuaufbau; vorher 158 Logzeilen und gemischte mtimes, später 2 sichere Reboots · 2026-07-30*
