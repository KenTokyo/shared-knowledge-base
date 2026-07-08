# Real-3D Game-UI System — Echte 3D-Objekte in Menü & Meta-UI (Three.js/R3F)

> **Cross-Game Styleguide, Schwester-Dokument zu `juicy-game-ui-system.md`.**
> Das Juicy-System beschreibt Motion, Flächen, „Fake-3D" (CSS-Dioramen, Halos, Lit-Logos).
> DIESES Dokument beschreibt das Gegenteil-Upgrade: **echte 3D-Objekte** (R3F/Three.js) als
> tragende UI-Elemente — ausgerüstete Charaktere, drehbare Waffen/Rüstungen, echte
> Edelsteine/Kristalle, 3D-Schmiede-Ambosse — ohne die Performance-Regeln zu brechen.
>
> **Wann welches System?** Fake-3D bleibt richtig für Hintergründe, Previews in Listen,
> Overlays über laufender Spielszene. Real-3D ist Pflicht, sobald der User ein Objekt
> **inspizieren** können soll (drehen, zoomen, Upgrade-Glow sehen): Equipment, Charakter,
> Kristalle, Schmiede-Bühne. Merksatz: **„Anschauen dürfen = echtes Mesh."**

**Stack-Annahme:** React + TypeScript + React-Three-Fiber (eine persistente `<Canvas>`),
zustand-Stores, Framer Motion für DOM-Chrome. Referenzprojekt: `voxel-samurai-quiz`.

---

## 0. TL;DR — die 8 Regeln

1. **Eine Canvas, viele Bühnen.** Es gibt EINE persistente R3F-Canvas (`AppCanvas`). Meta-UI-3D
   (Charakter, Gear-Viewer, Schmiede) läuft als **Stage im selben Canvas** hinter/neben dem
   DOM-Chrome — nie als zweite Live-Canvas über einer laufenden Spielszene.
2. **DOM rahmt, Canvas zeigt.** Panels, Buttons, Werte = DOM (Juicy-System). Das Objekt der
   Begierde (Held, Waffe, Kristall) = echtes Mesh in einer freigehaltenen Bildzone.
   Die Mitte gehört dem 3D-Objekt, DOM-Panels docken links/rechts an (MMO-Anatomie).
3. **Jedes inspizierbare Objekt hat eine Viewer-Definition:** Geometrie-Builder, Basis-Pose,
   Kamera-Frame (Distanz/Höhe/FOV), Idle-Motion (langsame Y-Rotation ODER Atem), Licht-Rig-Preset.
   Nie „irgendwo hinstellen und reinzoomen".
4. **Drei-Punkt-Licht pro Bühne, gebudgetet.** Key (warm, aus Sichtrichtung), Rim (kühl, hinten),
   Fill (Hemisphäre). Keine Schatten-Kaskaden für UI-Bühnen; ein gebackener Blob-/Disc-Schatten reicht.
5. **Instancing & Pooling gelten auch in der UI.** Kristall-Grids, Item-Reihen, Partikel-Funken
   sind InstancedMesh/Points — ein Slot-Grid mit 30 Items darf keine 30 Materialien mounten.
6. **Upgrade-Zustand ist Material-Zustand.** +0…+20, Set-Glow, Seltenheit = Uniform-/Emissive-/
   Attribut-Wechsel am SELBEN Mesh (kein Mesh-Tausch pro Stufe). Sichtbarkeits-Stufen definieren
   (z. B. ab +10 Kanten-Glow, ab +15 Partikel-Aura, +20 Signatur-Effekt).
7. **Lazy by default.** UI-Bühnen mounten erst beim Öffnen (Suspense/`lazy`), schwere Assets
   (Maps, Klassen) laden über das Warmup-Gate. Beim Schließen: Pools schlafen legen
   (`visible=false`, `count=0`), nichts Teures unmounten/remounten, was gleich wieder kommt.
8. **DOM-Sync ohne React-Hotpath.** 3D-Objekt ↔ DOM-Tooltip/Badge synchronisieren über Refs,
   Poll-Pattern oder kleine Selektoren — kein `setState` pro Frame, keine breiten Store-Subscriptions.

---

## 1. Bühnen-Katalog (Stage-Archetypen)

Jede Meta-UI-3D-Ansicht ist einer dieser vier Archetypen — nichts Fünftes erfinden:

| Archetyp | Zweck | Kamera | Beispiel |
|---|---|---|---|
| **Hero-Stage** | Charakter groß, Mitte frei, UI rahmt | leicht erhöht, Ganzkörper, ~30° Orbit erlaubt | Übersicht/Nexus, Klassenwahl |
| **Inspect-Pod** | EIN Objekt drehbar/zoombar | Objekt füllt ~60% der Zone, Auto-Rotate bis Drag | Waffen-/Rüstungs-Viewer, Kristall |
| **Werkbank** | Objekt + Prozess-Feedback (Schmieden) | Objekt über Amboss/Podest, fester Frame | Schmiede: Item schwebt über Esse |
| **Diorama-Hub** | begehbare Mini-Welt als Menü | Third-Person / fixe Kamerapfade | Startwelt: Schmied-Haus, Dungeon-Tore |

**Regeln:**
- Hero-Stage und Werkbank teilen sich das Licht-Rig-Preset der Menü-Bühne (`MenuShowcaseStage`-Muster:
  Podest-Disc, Gradient-Backdrop, Hemisphäre + Key + Rim, GPU-Motes).
- Inspect-Pods sind **klein und wiederverwendbar**: eine Komponente, Props = `{ builder, frame, idle }`.
- Pro Screen maximal EINE aktive Bühne mit Live-Animation. Sekundäre 3D-Anzeigen (z. B. Mini-Gear-Icons)
  sind statisch (kein useFrame) oder Fake-3D.

## 2. Layout-Anatomie „MMO-Screen" (DOM + Canvas verheiratet)

```
┌────────────────────────────────────────────────────────────┐
│  Header-Bar (DOM): Marke · Gold · Kristalle · Gear · Tabs  │
├──────────────┬──────────────────────────┬──────────────────┤
│ Panel LINKS  │      FREIE MITTE         │  Panel RECHTS    │
│ (DOM)        │   = Canvas sichtbar      │  (DOM)           │
│ Equipment-   │   Held/Objekt in 3D      │  Stats, Set-     │
│ Slots, Tabs  │   (Hero-Stage/Pod)       │  Effekte, Aktionen│
├──────────────┴──────────────────────────┴──────────────────┤
│  Footer (DOM): Kontext-Aktionen (Schmiede, Freunde, …)     │
└────────────────────────────────────────────────────────────┘
```

- **Die Mitte ist heilig:** kein DOM-Panel über der Objektzone; Panels sind schmal genug,
  dass der Held nie verdeckt ist (User-Kernklage im alten Menü).
- Panels gleiten von links/rechts ein (`x`-Slide + Spring), die Mitte bleibt dabei stabil —
  das 3D-Objekt „springt" nicht (Kamera-Frame unabhängig vom Panel-Zustand definieren,
  mit festem Safe-Frame für die schmalste Panelbreite).
- Klick auf einen Slot im linken Panel = Fokuswechsel der Bühne (Hero-Stage → Inspect-Pod
  desselben Canvas, Kamera-Lerp ≤ 600 ms, easing `easeInOut`), Esc/Zurück = Rückweg.

## 3. Objekt-Viewer-Rezepte

### 3.1 Charakter-Viewer (Hero-Stage)
- Quelle: dieselben Klassen-Modelle wie im Spiel (`PlayerClassModel` → `SamuraiRigModel`) —
  **nie** ein zweites „Preview-Modell" pflegen (Single Source of Truth).
- Ausrüstung/Kostüm hängen an den Rig-Ankern (`classModelParts`-Slots: `headCrest`,
  `torsoArmor`, `leftShoulder`, …, `leftHandWeapon`, `rightHandWeapon`).
- Idle: Atem + seltene Blink-/Gewichtsverlagerung; Orbit nur horizontal ±30°, kein freies Gimbal.
- Toggles (Visier/Kostüm aus- & einblenden) wechseln nur Sichtbarkeits-Flags der Anker-Gruppen —
  kein Remount des Rigs.

### 3.2 Item-Viewer (Inspect-Pod)
- Jedes Equipment-Piece hat einen **parametrischen Builder** (voxel-/primitive-basiert wie die
  Klassenmodelle), registriert in einem Katalog (`itemId → builder(paletteId, plusLevel)`).
- Auto-Rotate 0.25 rad/s bis Pointer-Drag; Drag = manuelles Orbit, Release = sanft zurück in Auto.
- Boden: kleine Podest-Disc + gebackener Kontaktschatten (keine Echtzeit-Schatten).
- Plus-Stufen-Visuals am Material (siehe §5), Vergleichsmodus = zweites Pod daneben, nicht zwei Kameras.

### 3.3 Kristalle/Edelsteine (Real-3D statt Icon)
- Basis: `IcosahedronGeometry`/facettierte Custom-Geometrie, flat-shaded, Vertex-Farben
  (LINEAR schreiben! `setRGB(..., SRGBColorSpace)`), Fresnel-Rim im Shader, dezenter
  Emissive-Puls (uTime), KEIN Echtzeit-Refraction.
- In Grids/Inventaren: EIN InstancedMesh pro Tier-Familie, Farbe/Größe per Instanz-Attribut.
- Der „ein Kristall groß im Album"-Fall = Inspect-Pod mit demselben Material.

### 3.4 Schmiede-Werkbank
- Bühne: Amboss/Esse-Podest (Builder-Assets), Glut-Emissive + wenige GPU-Funken-Motes,
  Item schwebt im Fokus-Frame darüber.
- Upgrade-Moment: Hammer-Impuls = kurzer Scale-Punch + Emissive-Blitz + Funken-Burst
  (gepoolt, deterministisch, kein Math.random im Renderpfad) + Sound (Event-Audio-Profil).
- Kein Screen-Shake im DOM; der Punch lebt im Canvas, das DOM zeigt parallel Zahlen-Feedback.

## 4. Licht- & Material-Presets (UI-Bühnen)

- **Preset `stageWarm`** (Standard Meta-UI): Hemisphäre 0.45 (warm oben / dunkel unten),
  Key directional warm (~2.2, aus 35° links-oben), Rim kühl (~1.2, hinten rechts). Ambienz aus Backdrop.
- **Preset `forgeEmber`** (Schmiede): wie `stageWarm`, aber Key aus der Esse-Richtung (orange),
  zusätzliche Punkt-Glut NUR als Emissive-Mesh (kein echtes PointLight nötig).
- **Preset `crystalCool`** (Album/Kristalle): kühler Fill, Key neutral, Rim in Tier-Farbe.
- Materialien: `MeshStandardMaterial` mit flatShading für Voxel-Ästhetik; Metall-Anmutung über
  `metalness 0.6–0.8 / roughness 0.3–0.45`; NIE Textur-Maps laden, wo Vertex-Farben reichen.
- ToneMapping/Exposure der Haupt-Canvas gilt auch für UI-Bühnen — Presets dagegen abstimmen,
  nicht pro Bühne Renderer-Settings umschalten.

## 5. Upgrade-/Seltenheits-Visuals (Progression sichtbar machen)

Sichtbarkeit wächst **linear und lesbar** mit der Plus-Stufe — kein RNG, keine Explosion an Effekten:

| Stufe | Visual (additiv) |
|---|---|
| +0…+4 | sauberes Basismaterial, Podest-Licht |
| +5…+9 | Trim-/Kanten-Farbe sättigt sich, dezente Emissive-Linien (statisch) |
| +10…+14 | Kanten-Glow pulsiert langsam (uTime-Uniform, eine Frequenz projektweit) |
| +15…+19 | Partikel-Aura: 8–14 GPU-Motes im Orbit (InstancedMesh/Points, geteilter Pool) |
| +20 | Signatur-Moment: Aura dichter + feiner Boden-Sigill-Ring unter dem Item/Charakter |

- Die Stufen-Schwellen sind **projektweit identisch** (Items, Charakter im Menü, Ingame-Subtilform).
- Ingame ist alles eine Stufe subtiler (Combat-Lesbarkeit vor Kosmetik; Telegraphs/Feedback
  haben Vorrang — THREEJS-RULES §7).
- Set-Effekt aktiv = zusätzliche Akzentfarbe im Rim-Licht des Viewers, NICHT mehr Partikel.

## 6. Performance-Regeln (PFLICHT, ergänzt THREEJS-RULES)

1. **Mount-Budget:** Eine UI-Bühne mountet ≤ 1 neue Lichtquelle zusätzlich zum Preset und
   0 Echtzeit-Schattenwerfer. Podest-Schatten sind gebacken/Fake.
2. **useFrame-Budget:** ≤ 2 aktive useFrame-Systeme pro offener Meta-UI (Bühnen-Idle + Motes).
   Tooltips/Zahlen pollen mit 4–8 Hz, nie pro Frame in React-State schreiben.
3. **Idle-Sleep:** Geschlossene Bühne = Pools `count=0`, `visible=false`, keine Uploads. Der
   Viewer-Container bleibt gemountet, wenn Wiederöffnen wahrscheinlich (Menü-Session), sonst lazy unmount.
4. **Asset-Lazy-Load:** Item-Builder-Kataloge sind code-gesplittet (dynamic import pro Katalog-Familie).
   Erst-Öffnen der Schmiede darf einen kurzen Warmup nutzen (bestehendes Loading-Gate-Muster),
   nie den Frame blockieren.
5. **Kein Layout-Ping-Pong:** DOM-Panel-Animationen (Framer) animieren `transform/opacity`;
   Canvas-Kamera-Frames reagieren auf Panel-Zustände über einen kleinen Store-Wert, nicht über
   Resize-Observer-Kaskaden.
6. **Instanz-Disziplin:** Grids (Inventar, Album, Slots) rendern 3D-Inhalte als Instanz-Familien
   oder als EIN geteilter Inspect-Pod + 2D-Karten. 30 einzelne Mini-Canvases sind verboten.
7. **Messbarkeit:** Jede neue Bühne wird mit `calls/triangles/frameMs` vor/nach verglichen
   (vorhandene Diagnose-HUD-Werte); Ziel: Menü-Meta-UI bleibt unter der Last der alten Vollmap-Lobby.

## 7. Motion & Sound (Real-3D-Juice)

- **Kamera-Sprache:** Fokuswechsel = ein Lerp (Position + LookAt) mit `easeInOut`, 400–600 ms.
  Kein Cut, kein Doppel-Bounce. Zurück immer symmetrisch.
- **Objekt-Entrance:** Item erscheint mit Scale 0.92→1 + kurzem Emissive-Blitz (250 ms) —
  dasselbe Vokabular wie DOM-Entrance (Juicy §3), nur im Canvas.
- **Hover im 3D:** Slot-Hover im DOM highlightet das 3D-Teil (Emissive-Boost am Anker) —
  Verbindung zwischen Panel und Objekt herstellen (Pointer-Raycasts sparsam, DOM-Hover reicht).
- **Sound:** Öffnen einer Bühne, Fokuswechsel, Upgrade-Erfolg haben eigene Event-Audio-Profile
  (Voice-Limiter beachten). Schmiede: Amboss-Hall beim Öffnen, Hammer beim Schmieden,
  heller Klirr + Swell bei Erfolg.

## 8. Do / Don't

### ✅ Do
- Ein Canvas, Bühnen-Archetypen, geteilte Licht-Presets, dieselben Modelle wie ingame.
- Plus-Stufen als Material-/Attribut-Zustand; lineare, lesbare Visual-Treppen.
- Instancing für alles Wiederholte (Kristalle, Motes, Item-Grids).
- Lazy Mount + Idle-Sleep + Warmup-Gate für schwere Kataloge.
- DOM-Chrome nach Juicy-System; 3D nur für das inspizierbare Objekt.

### ❌ Don't
- Keine zweite Live-R3F-Canvas über laufender Spielszene (Pause/Overlay → Fake-3D).
- Keine Echtzeit-Schatten/Refraction/Planar-Mirror in Meta-UI-Bühnen.
- Kein Mesh-Tausch pro Upgrade-Stufe, kein Material-Klon pro Grid-Zelle.
- Kein `Math.random()`/`Date.now()` für Motes/Funken (deterministische Seeds/Golden-Angle).
- Keine Panels über der Objektzone; keine UI, die den Helden wieder verdeckt.
- Kein useFrame-`setState`, keine breiten Store-Subscriptions im Viewer.

## 9. Referenzen

- Juicy-System (DOM-Chrome, Motion-Vokabular, Fake-3D): `shared-docs/design/juicy-game-ui-system.md`
- Three.js-Pflichtregeln (Instancing, Budgets, Dirty-Signaturen): `shared-docs/THREEJS-RULES.md`
- Map-/Welt-Learnings (Vertex-Farben LINEAR, Licht-Presets): `prompts/maps-world-learnings.md`
- Live-Vorbilder im Projekt: `src/components/3d/menu/MenuShowcaseStage.tsx` (Bühne),
  `src/components/player/PlayerClassModel.tsx` (statischer Modell-Resolver),
  `src/components/3d/loot/GemDropsLayer.tsx` (Instanz-Pool + Idle-Sleep),
  `menu/customization/CustomizationPreviewCanvas.tsx` (bestehender Preview-Pfad).
- Anwendungs-Planung: `docs/mmo-grossumbau/` (Übersicht, Schmiede, Inventar, Startwelt).
