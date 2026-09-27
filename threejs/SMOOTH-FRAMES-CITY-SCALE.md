# Ruhiges Bild bei wenig FPS, große Stadt ohne Einbruch — global

**Lesen wenn:** Spiel wirkt bei 30–60 Bildern je Sekunde ruckelig; Stadt mit vielen Häusern, Autos, Kleinkram soll flüssig laufen; Technik aus Spiderbench übernehmen.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)
**Quelle:** `spiderbench` (three r186, WebGL2, `postprocessing` + N8AO, Stand 2026-09-27) · Übernahme `shardfall-arena-v2.5-active` V21.0.

## Warum 36–50 FPS dort hochwertig wirken

Auge sieht Weg statt Sprünge. Vier Ursachen, nach Gewicht:

1. **Bewegungsunschärfe der Kamera** — jedes Bild zeigt Bewegung seit dem letzten als Schliere; Schritt zwischen zwei Bildern wird Strich statt Sprung.
2. **TAA statt MSAA** — Kanten und feine Muster flimmern nicht; Dither-Übergänge (LOD, Schattenkaskaden) verschmelzen über Bilder.
3. **Keine Hänger** — alle Shaderprogramme vor dem ersten Bild parallel übersetzt; erster Anblick eines Materials friert nicht ein.
4. **Kamera ohne Knicke** — jede Rahmengröße (Abstand, FOV, Versatz) über kritisch gedämpfte Feder; nur Mausblick direkt.

**Nicht die Maus:** Spiderbench liest `movementX/Y` unter Pointer Lock, ohne Glättung — nicht roher als übliche Spiele. **Nicht billig:** hohe Stufe zeichnet 5 Schattenkaskaden bis 3 km, SSAO, SSR, SSGI, Volumenwolken, DoF, Bloom. Ruhe kommt aus Bildaufbereitung und gleichmäßigem Takt, nicht aus niedriger Last.

## Tipps

- **Wenig FPS wirkt wie Diashow** — Bewegung springt je Bild; Auge sieht Einzelbilder. → Kamera-Bewegungsunschärfe per Tiefen-Rückprojektion: Weltpunkt aus Tiefe, mit voriger ViewProj projizieren, Strecke × Stärke, 6–10 Abtastungen mit IGN-Versatz (Striche über 20 px doppelt), Länge ≤ 10 % Bildbreite. Stärke nach Tempo (nicht Maus), Feder hoch 0,35 s / runter 0,2 s, Verschluss 1/60 s (≤ 2 Bilder), Zielen = sofort aus, Schnitt (Drehung > 0,6 rad, Sprung) → 0 und 0,3 s einblenden. Kein Geschwindigkeitspuffer, kein zweiter Szenendurchgang.
  *spiderbench `render/pipeline.js`, `player/camera.js` · shardfall V21.0 `fx/motionBlur.ts`: Sprint 13,5 m/s → Stärke 0,6 nach 1 s, Stehen/Gehen 0 · 2026-09-27*

- **Eigene Figur verschmiert** — Figur bewegt sich mit Kamera; aus Tiefe allein sieht sie wie stehende Welt aus. → Nahmaske: alles näher als Abstand Kamera–Figur + 1,5 m scharf, Rampe 5 m; Abtastungen im Nahbereich zählen nicht (sonst zieht Figur Schliere in den Hintergrund). Pass vor Waffen-/Overlaypass, damit Ich-Sicht-Waffe scharf bleibt.
  *spiderbench `setMotionBlur(…, maskDistance)` · shardfall V21.0 Kette Umriss → Unschärfe → Waffe · 2026-09-27*

- **Neuer Vollbildpass liefert schwarzes Bild** — `EffectComposer` klont Szenenziel; Klon teilt `Source` der `DepthTexture` → dieselbe GL-Tiefentextur an beiden Zielen. Pass liest Tiefe und zeichnet ins Ziel, an dem sie hängt: WebGL verwirft Aufruf (Rückkopplung), Ziel bleibt gelöscht; jedes Löschen setzt Welttiefe auf „Himmel“. → Vor erstem Binden `composer.renderTarget2.depthTexture = null` (eigener Tiefenpuffer); Pixelprobe per `readPixels` direkt nach Bild statt Bildschirmfoto.
  *shardfall V21.0: schwarzes Prüfbild, nach Fix mittlere Helligkeit 99,3 → 100, 0 % schwarz · three r169 `RenderTarget.copy` · 2026-09-27*

- **Kanten flimmern, LOD springt** — MSAA glättet nur Geometriekanten; Shaderdetail, Laub, Dither bleiben unruhig. → TAA: Halton-Jitter der Projektion, Verlauf im ungejitterten Bild, Rückprojektion über Tiefe + vorige ViewProj; Figur über eigene Starrbewegung (Tiefenmaske der Figur). Verlauf Catmull-Rom abtasten, Nachbarschaft in YCoCg clippen (Box ruhig 1,9 σ, schnell 0,9–1,4 σ), Mischung 0,1 → 0,25 nach Tempo, danach Schärfen 0,35; Schnitt → Verlauf verwerfen. Erst mit TAA lohnen Dither-Überblendungen.
  *spiderbench `render/pipeline.js` TAA-Pass · 2026-09-27*

- **Hänger beim ersten Anblick** — Programm wird beim ersten Draw gelinkt, synchron 0,2–1,6 s (MeshStandard + 5 PCF-Kaskaden unter ANGLE); Schwenk in neue Gegend friert 0,2–6 s. → Vor erstem Bild alle Varianten mit `renderer.compile()` gegen echtes Ziel und echte Lichtzahl anlegen (Hauptpass, Spiegel-/Schattenvarianten, Postpässe); `KHR_parallel_shader_compile` linkt auf Treiberfäden. Spätere Netze tröpfeln: ≤ 4 Programme, ≤ 2 ms je Bild, nächster Stapel erst nach fertigem Link.
  *spiderbench `render/warmup.js` · shardfall `motionPass.warm()` unter Ladebild · 2026-09-27*

- **Kamera knickt bei Moduswechsel** — Abstand/FOV/Versatz springen beim Wechsel (Lauf → Luft, Wand, Zielen). → Jeden Rahmenwert über SmoothDamp (Game Programming Gems 4) führen: Lage UND Geschwindigkeit stetig, bildratenunabhängig. Mausblick direkt (keine Eingabeverzögerung). Kollision: schnell heran, langsam zurück.
  *spiderbench `player/camera.js` „smoothness contract“ · shardfall `fx/motionBlurDrive.ts` nutzt dieselbe Feder für die Stärke · 2026-09-27*

- **Gleiche Bildzeit, ungleiche Schritte** — `performance.now()` im Rückruf streut um Eingabe-/Zeitgeberarbeit vor dem Rückruf; Bewegung zittert trotz gleichmäßiger Anzeige. → dt aus RAF-Zeitstempel (Bildbeginn im Takt des Schirms); ohne Zeitstempel (Hintergrundtakt) weiter `performance.now()`, nie rückwärts, erster Schritt 0.
  *eigene Verbesserung shardfall V21.0 `game/frameLoop.ts` (Spiderbench nutzt noch `THREE.Clock`) · 2026-09-27*

- **Viele Häuser = viele Draws** — Jedes Gebäude, jede Kachel eigener Draw; Schattenpässe vervielfachen. → Statik je Material in Kacheln (256 m) zusammenführen, 2×2-Superkacheln (512 m) teilen einen Puffer; stimmen alle Kacheln überein (sichtbar, Schatten), zeichnet die Superkachel in EINEM Aufruf, sonst jede Kachel ihren Indexbereich. `BatchedMesh`-Multidraw stockte unter Chrome/ANGLE (~100 ms/Bild) → gemessen meiden.
  *spiderbench `world/tilebatch.js` · shardfall Zellnetze 64 m + Fernfaltung · 2026-09-27*

- **Autos und Kleinkram fressen Zeit** — je Objekt Mesh + Culling + Schatten. → InstancedMesh je Modell × LOD (nah < 48 m, mittel < 230 m, fern gruppiert), Einzel-Culling erst ab 40 m, Schatten nur nahe Stufen in den ersten zwei Kaskaden; Instanzen erst nach ein paar Metern Kamerabewegung neu packen. LOD-Wechsel per Bildschirm-Dither (IGN + Bildversatz, komplementäre Schwellen) über Distanz je Vertex — braucht TAA.
  *spiderbench `world/vehinst.js`, `world/pool.js` · 2026-09-27*

- **Ferne Schatten teuer oder zitternd** — alle Kaskaden jedes Bild; Rand flimmert beim Laufen. → Kaskaden gestaffelt aktualisieren (ferne seltener, Radius gepolstert 6–15 %), Mitte aufs Texelraster, Tiefe gerundet, Blendband zwischen Kaskaden per Dither; eigene hochaufgelöste Kaskade nur für die Figur. Große verschmolzene Caster je Kaskade per Welt-AABB ausblenden (Bounding-Sphere zu grob). Matrix-Array-Uniforms cachen: three lädt sie bei jedem Materialwechsel neu, Chrome ~0,1 ms je `uniformMatrix4fv`.
  *spiderbench `render/csm.js`: 13,6 ms/Bild Uploads auf Straßenhöhe entfernt · shardfall `fx/shadowTempo.ts` taktet Schattenkarten auf ≤ 120 Hz · 2026-09-27*

- **Licht wirkt flach** — konstantes Umgebungslicht, feste Belichtung, harter Tonwert-Fuß. → Himmel aus Atmosphärenmodell (Rayleigh + Mie Cornette-Shanks) als LUT; Umgebungskarte aus demselben Himmel (Wechsel: eine Würfelseite je Bild); Luftperspektive im Composite; handgestimmte feste Tageszeiten statt Zyklus; Belichtung aus Median eines 32-Bin-log2-Histogramms, Rate 0,1; ACES mit weicherem Fuß (Schatten lesbar), Dither am Ende. SSR/SSGI lesen das vorige fertige Bild (billig).
  *spiderbench `render/lighting.js`, `atmosphere.js`, `sky.js`, `pipeline.js` · 2026-09-27*

## Übertragen — Reihenfolge

1. **Bewegungsunschärfe** (ein Vollbildpass, nur in Bildern mit Tempo): größter Gewinn je Aufwand. Schalter, Einstellung Aus/Leicht/Mittel/Stark, aus bei „weniger Bewegung“.
2. **Bildtakt**: dt aus RAF-Zeitstempel; Warm-up prüfen (neue Programme beim Erstauftritt zählen, nicht fehlerfreies `compile()`).
3. **TAA** statt MSAA: großer Umbau (Jitter aller Pässe, Verlauf, Figur-Maske), macht aber Dither-LOD, weiche Kaskadengrenzen und billigeres Laub möglich. Vorher Messung: MSAA-Kosten gegen TAA + Schärfen.
4. **Stadtmasse**: Kacheln je Material, Instanzen je Modell × LOD, Schattenkaskaden gestaffelt. Budget je Kachel (Dreiecke, Draws, MB) im Tor prüfen.
5. **Licht**: Belichtung aus Histogramm, Umgebungskarte aus dem Himmel, Luftperspektive.

Jeder Schritt einzeln abschaltbar und im schnellen Wechsel im selben Fenster messen; grüner Build belegt keine FPS ([Messhandwerk](MEASURING.md)).

## Blender?

Kein Umstieg nötig: Spiderbench baut die ganze Stadt (Häuser, Fassaden, Dächer, Straßen, Bäume) im Code; Dateien sind nur Held, Gegner, Autos und Requisiten als GLB. Ruhe und Masse kommen aus Laufzeittechnik oben, nicht aus dem Modellierwerkzeug. Blender lohnt für Einzelstücke mit Wiedererkennung (Figuren, Fahrzeuge, Wahrzeichen): GLB mit 2–3 LOD-Stufen, komprimiert (Meshopt/Draco, KTX2), als Instanzen gezeichnet.

## Handoffs

- Messaufbau → [Messhandwerk](MEASURING.md)
- Draws, Pools, Warm-up → [Performance](PERFORMANCE.md)
- Kamera, Licht, Schatten, PostFX → [Licht und Kamera](LIGHT-CAMERA.md)
