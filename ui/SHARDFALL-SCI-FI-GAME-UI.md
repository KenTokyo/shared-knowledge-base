# Shardfall Sci-Fi Game UI — kompakter Stil- und Technologievertrag

## Zweck

Wiederverwendbare UI-Richtung für Shardfall-Prompts und ähnliche Three.js-Spiele. Zwei lokale Voxel-Sci-Fi-Boards sind verbindliche Anker für Command Deck, Charaktere, Helme und Loadout; die übrigen Bilder ergänzen Komponenten, HUD und Notification Motion. Kritische Spielinformationen bleiben semantisches React/DOM; WebGL-/Canvas-Effekte sind dekorative, begrenzte Ebenen.

## Referenzstatus

Der Nutzer gruppierte neun lokale Bilder als:

- Bild 1–3: **Cool Sci-Fi Data und HUD**;
- Bild 4: **Amber Sci-Fi Components**;
- Bild 5: **Amber Voxel Command**;
- Bild 6: **Blue Voxel Tactical**;
- Bild 7: **Amber Tactical HUD**;
- Bild 8: **Notification Motion 01 – With Icons**;
- Bild 9: **Notification Motion 02 – Without Icons**.

Die Dateien wurden am 2026-08-24 direkt per Bildleser angesehen und dauerhaft nach `shared/shared-docs/ui/references/` kopiert. Dabei wurde kein Browser, Dev-Server, Playwright- oder CLI-Browser-Lauf gestartet; die direkte Inspektion bereitgestellter Referenzdateien ist keine browsergestützte Laufzeit-Sichtprüfung.

- [`cool-sci-fi-command-ui-01.png`](references/cool-sci-fi-command-ui-01.png) — vollständige dunkelblaue Lobby mit zentralem Charakter, Mondlandschaft, Skinraster, Aufgaben, Gruppe und klarer cyanfarbener Primäraktion.
- [`cool-sci-fi-command-ui-02.png`](references/cool-sci-fi-command-ui-02.png) — Komponentenboard für Lebensanzeigen, Notifications, Skillleisten, Minikarten, Ressourcen, Questtracker, Cooldowns, Status, Chat, Timer, Gruppe und Popup.
- [`cool-sci-fi-command-ui-03.png`](references/cool-sci-fi-command-ui-03.png) — byte-identisches Duplikat von Bild 2; als sechsteilige Originalserie bewusst erhalten.
- [`warm-sci-fi-command-ui-01.png`](references/warm-sci-fi-command-ui-01.png) — gold-/bernsteinfarbenes Komponentenboard mit feinen Linien, Kreisen, Warnungen, Leisten, Slots und Bodeneffekten auf Schwarz.
- [**Amber Voxel Command**](references/warm-sci-fi-command-ui-02.png) — verbindliche Command-Deck-Referenz: zentraler hochwertiger Voxel-Krieger in vollständiger segmentierter Sci-Fi-Rüstung mit geschlossenem Samurai-Helm, bernsteinfarbenen Emissivkernen und Schwert; dichtes Skinraster, klare Topnavigation, Party/Challenges, Bottom-Loadout und dominante Play-Aktion. Der historische Dateiname bleibt als stabiler Link erhalten.
- [**Blue Voxel Tactical**](references/realistic-sci-fi-tactical-ui-01.png) — verbindliche Tactical-/Loadout-Referenz: geschlossener modularer Sci-Fi-Helm, dicht geschichtete Voxel-Panzerung, beidhändig getragene Energiefeuerwaffe, blaue Holo-Plattform, stark leuchtende Rahmen und klare Waffen-/Abilities-/Loadout-Navigation. Der historische Dateiname bleibt als stabiler Link erhalten; **Realistic Sci-Fi ist keine aktive Stilrolle mehr**.
- [`warm-sci-fi-tactical-hud-03.png`](references/warm-sci-fi-tactical-hud-03.png) — vollständiges Gameplay-HUD mit Kompass, vier Statusleisten, radialen Kernwerten, semantischen Warnungen, Fähigkeiten, Verbrauchsgegenständen, Quest, Minikarte, Tracker, Schnellwahl und sechs räumlichen Ereignisbeispielen.
- [**Notification Motion 01 – With Icons**](references/notification-motion-01-with-icons.png) — semantische Status-, Heilungs-, Ziel-, Beute-, Treffer- und Hype-Meldungen mit ereignisgebundenem Icon/Motiv, gerichteten Lichtspuren, Splittern und Partikeln in fünf Phasen: Erscheint, Aufbau, Highlight, Stabil und Verblasst.
- [**Notification Motion 02 – Without Icons**](references/notification-motion-02-without-icons.png) — typografische Killstreak-, Combo-, Multi-Kill- und große Reaktionsmeldungen ohne separates Icon in vier Phasen: Erscheint, Aufbau, Highlight und Verblasst.

## Drei kompatible Stilrollen

### Cool Sci-Fi Data

- near-black/navy machined surfaces, cold steel and optical glass;
- cyan/electric-blue selection energy, white data ink and amber only for attention;
- thin chamfered frames, corner brackets, micro-grid and restrained scan/sweep lines;
- crisp condensed typography, tabular numbers and strong negative space;
- use as the quieter information layer for match HUD, map, build/edit and diagnostics.

### Amber Voxel Command

- follow `warm-sci-fi-command-ui-02.png` for the main Lobby, Home, Characters, Shop and hero presentation;
- charcoal/black frames, hot amber/gold edge emission, cyan/purple/red secondary skin energy and deep environmental contrast;
- central runtime character on a luminous platform, dense but ordered surrounding navigation, large decisive Play action and readable skin matrix;
- high-density voxel construction with many small purposeful armor modules, not raw cubes or a low-detail block mannequin;
- layered shoulder, chest, forearm, waist and shin armor with material separation, contact shadow and emissive seams;
- a fully authored closed Sci-Fi helmet is the default hero silhouette; each class and skin family remains helmet-compatible and includes a high-quality helmet option.

### Blue Voxel Tactical

- follow `realistic-sci-fi-tactical-ui-01.png` for Loadout, Weapons, Abilities, optics and tactical character presentation;
- near-black/navy panels, intense electric-blue edge light, cyan-white data ink, luminous platform rings and controlled purple/green/red skin accents;
- a helmeted runtime character holds the selected weapon in a supported two-hand pose; weapon silhouette, hands and armor remain readable through the glow;
- use segmented voxel armor, closed visor/mask, brow, cheek, ear and crown modules, vents and restrained emissive optics instead of a bare head or generic cube helmet;
- strong emission is permitted around hero, selection and Play states, but text hierarchy and dark recovery areas prevent a uniform blue wash.

One screen chooses one dominant role. Amber Voxel Command leads the main Command Deck; Blue Voxel Tactical leads weapon/loadout routes; Cool Sci-Fi Data supports dense gameplay information. Realistic Sci-Fi is removed rather than blended into the voxel direction.

## Canvas UI: verified technology role

Sources checked nonvisually on 2026-08-24:

- `https://canvasui.dev/`
- `https://canvasui.dev/docs`
- `https://github.com/DavidHDev/canvas-ui`

Canvas UI identifies itself as an open-source TypeScript library/registry for creative HTML-in-Canvas and WebGL effects across React and other frameworks. The public site shows Shadcn-registry installation such as `npx shadcn@latest add @canvas-ui/particle-reveal-react`.

Important boundaries from the official page:

- effects render on the GPU through WebGL and outside React's render cycle;
- components initialize on mount, pause off-screen and clean up on unmount;
- live HTML rendered into canvas depends on an experimental browser capability;
- unsupported paths fall back to normal HTML, while pure WebGL overlays can continue;
- Canvas UI supplies effects/components, not game state, HUD architecture, input routing or Three.js scene ownership.

### Shardfall integration decision

1. **Core HUD stays DOM:** health, ammo, materials, reticle, enemy HP, quiz, notifications, focus and accessibility never depend on HTML-in-Canvas.
2. **Three.js owns gameplay WebGL:** world holograms, scope lens geometry, build previews and combat VFX live in the existing renderer.
3. **Canvas UI is optional and selective:** at most a few Command-Deck hero/background effects such as particle reveal, glass/refraction, grid/ripple or masked transitions.
4. **No canvas per card:** one shared decorative layer per route/region at most; never stack independent WebGL contexts over active combat.
5. **Progressive enhancement:** normal HTML is complete before the effect mounts; failure or reduced motion removes only decoration.
6. **Lifecycle gate:** inactive routes pause; unmount disposes RAF, observers, listeners, textures, materials and context-owned resources.
7. **Consumer gate:** install/copy only a component with a visible runtime consumer. Read its current official source/docs and license before integration.

Canvas UI does not replace GSAP. GSAP sequences DOM state transitions; Canvas UI may render a bounded decorative effect; Three.js renders the game and genuine 3D holograms.

## Compact prompt-ready UI block

> Directly inspect `warm-sci-fi-command-ui-02.png` and `realistic-sci-fi-tactical-ui-01.png`. Build the main Command Deck as Amber Voxel Command and weapon/loadout routes as Blue Voxel Tactical: high-density voxel characters, layered modular armor, strong controlled emissive edges, luminous platforms, clear skin matrices and decisive Play/navigation hierarchy. The default hero is fully helmeted; every class and skin family supports an authored Sci-Fi helmet, and tactical previews hold the selected weapon correctly. Do not use bare block heads, generic cube helmets or low-detail mannequins. Keep health, ammo, reticle, materials, enemy state, quiz and notifications as semantic React/DOM. Three.js owns runtime characters, 3D holograms and gameplay VFX. Canvas UI may provide only a few progressively enhanced WebGL overlays in inactive Command-Deck regions; never create one canvas per card or place a second live canvas over combat. Every effect pauses off-screen, cleans up on unmount, falls back to complete HTML and obeys reduced motion.

## Gaming-HUD behavior

- Crosshair changes state only for a valid unobstructed hostile under the authoritative center ray; head/armor/invalid range remain distinct without constant flashing.
- Enemy health plate appears on aim, damage or threat, animates deltas, respects distance/occlusion and fades instead of permanently filling the screen.
- Pulse Rifle uses a clean 1.8× holographic optic; Rail Scout uses a lens-based 4×/8× scope. Scatter Cannon and Arc SMG keep shoulder ADS without a scope overlay.
- Scope entry changes camera FOV, weapon pose, reticle and edge treatment together. The center ray remains damage truth; the overlay never hides hit confirmation or ammo.
- Notifications are queued/coalesced, show at most three records and never cover reticle, optic center, quiz or health. Their event semantics select one of two binding motion contracts; generic card movement or a plain toast fade cannot replace either reference effect.
  - **Notification Motion 01 – With Icons** is mandatory for status, healing, quest, objective, loot and comparable semantic events. It follows **appear → build → highlight → stable → fade**: an event-specific icon or integrated motif leads; directed light trails, shards and particles build the composition; highlight owns the strongest burst and luminance; stable settles into quiet readability; fade dissolves text, motif and particles.
  - **Notification Motion 02 – Without Icons** is mandatory for killstreak, combo, multi-kill and large typographic reactions. It follows **appear → build → highlight → fade** with no separate icon and no forced stable phase: typography and background shards grow together, highlight reaches maximum luminance, then the whole composition decays directly and cleanly.
  - Matching the boards means preserving rhythm, composition, luminance build, burst, typographic hierarchy and dissolution rather than merely copying colors. Reduced motion shortens both contracts to restrained fades but preserves event category, exact text, semantic color and the required icon-versus-no-icon selection.
- Edit cells trace under held pointer, selected cells settle into a holographic draft, commit collapses physical sections and cancel rebuilds the last committed mask.
- Turbo Build on repeats placement at a bounded cadence while held; off accepts exactly one placement per fresh mouse-down.
- Build rotation uses 90° `R` steps. A setting chooses temporary rotation or remembered per-kind offset; `T` cycles material.

## Audio and Juice essentials

- Reload audio is event-driven: magazine/cell out, magazine/cell in, bolt/energy latch and completion are aligned to animation markers. Cancel never plays completion.
- Empty trigger uses a weapon-specific dry click with anti-spam cooldown; empty reserve gives a separate concise feedback state.
- Pulse Rifle/Rail Scout optic enter, optic exit and `V` zoom-step use quiet mechanical/electronic cues.
- Camera/HUD/VFX response is event-profiled and bounded. Automatic fire cannot accumulate unlimited shake.
- Every edit, build, pickup, target, reload and optic cue has an emitter, runtime consumer and cleanup path.
