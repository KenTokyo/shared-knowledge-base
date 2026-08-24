# Shardfall Sci-Fi Game UI — kompakter Stil- und Technologievertrag

## Zweck

Wiederverwendbare UI-Richtung für Shardfall-Prompts und ähnliche Three.js-Spiele. Sie beschreibt hochwertige Gaming-UI ohne Abhängigkeit von einem Referenzbild. Kritische Spielinformationen bleiben semantisches React/DOM; WebGL-/Canvas-Effekte sind dekorative, begrenzte Ebenen.

## Referenzstatus

Der Nutzer gruppierte sechs lokale Bilder als:

- Bild 1–3: **Cool Sci-Fi**;
- Bild 4–5: **Warm Sci-Fi**;
- Bild 6: **Realistic Sci-Fi**.

Die Dateien wurden am 2026-08-24 direkt per Bildleser angesehen und dauerhaft nach `shared/shared-docs/ui/references/` kopiert. Dabei wurde kein Browser, Dev-Server, Playwright- oder CLI-Browser-Lauf gestartet; die direkte Inspektion bereitgestellter Referenzdateien ist keine browsergestützte Laufzeit-Sichtprüfung.

- [`cool-sci-fi-command-ui-01.png`](references/cool-sci-fi-command-ui-01.png) — vollständige dunkelblaue Lobby mit zentralem Charakter, Mondlandschaft, Skinraster, Aufgaben, Gruppe und klarer cyanfarbener Primäraktion.
- [`cool-sci-fi-command-ui-02.png`](references/cool-sci-fi-command-ui-02.png) — Komponentenboard für Lebensanzeigen, Notifications, Skillleisten, Minikarten, Ressourcen, Questtracker, Cooldowns, Status, Chat, Timer, Gruppe und Popup.
- [`cool-sci-fi-command-ui-03.png`](references/cool-sci-fi-command-ui-03.png) — byte-identisches Duplikat von Bild 2; als sechsteilige Originalserie bewusst erhalten.
- [`warm-sci-fi-command-ui-01.png`](references/warm-sci-fi-command-ui-01.png) — gold-/bernsteinfarbenes Komponentenboard mit feinen Linien, Kreisen, Warnungen, Leisten, Slots und Bodeneffekten auf Schwarz.
- [`warm-sci-fi-command-ui-02.png`](references/warm-sci-fi-command-ui-02.png) — warme Gold-Lobby mit realistischer Materialwirkung, ruhiger Landschaft, Skinraster, Party-/Challenge-Spalte und großer Play-Aktion.
- [`realistic-sci-fi-tactical-ui-01.png`](references/realistic-sci-fi-tactical-ui-01.png) — regennasse, materialreiche Lobby mit realistischer Figur und Umgebung, jedoch stark elektrischer blauer UI-Energie. Für Shardfall wird daraus die physische Tiefe übernommen, nicht die flächige Blausättigung.

## Drei kompatible Paletten

### Cool Sci-Fi

- Near-black/navy machined surfaces, cold steel and optical glass;
- cyan/electric-blue selection energy, white data ink, amber only for attention;
- thin chamfered frames, corner brackets, micro-grid, restrained scan/sweep lines;
- holographic depth through edge light, masked noise, refraction and layered parallax;
- crisp condensed typography, tabular numbers and strong negative space;
- use for main Command Deck, HUD, map, build/edit and optics.

### Warm Sci-Fi

- charcoal, smoked bronze and dark ceramic surfaces;
- amber, copper and restrained gold emission with parchment-white text;
- broader material edges, soft volumetric pools and subtle heat distortion;
- calm glow in rim/icon/title, not luminous panel fills;
- use for Shop, rewards, forge/material panels, hero moments and selected skin presentation.

### Realistic Sci-Fi

- near-black steel, graphite, desaturated neutral glass and physically plausible reflections;
- sparse emission, optical lens artifacts only where a real display/lens motivates them;
- denser tactical data grouped into quiet modules with strict hierarchy;
- fine wear, fasteners, seams and contact shadow instead of decorative techno-glyph noise;
- use for weapon optics, loadout details, diagnostics and high-stakes combat states.

One screen chooses one dominant palette. Warm and realistic roles may accent the Cool command language, but no panel mixes all three at equal strength.

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

> Use one high-modern sci-fi command language: layered optical glass over dark machined metal, chamfered frames, corner brackets, micro-grid, crisp condensed typography, tabular values, controlled cyan selection energy and sparse amber attention. Animate meaningful state changes with scoped GSAP timelines; ambient motion remains slow and subordinate. Keep health, ammo, reticle, materials, enemy state, quiz and notifications as semantic React/DOM. Three.js owns 3D holograms and gameplay VFX. Canvas UI may provide only a few progressively enhanced WebGL overlays in inactive Command-Deck regions; never create one canvas per card or place a second live canvas over combat. Every effect pauses off-screen, cleans up on unmount, falls back to complete HTML and obeys reduced motion.

## Gaming-HUD behavior

- Crosshair changes state only for a valid unobstructed hostile under the authoritative center ray; head/armor/invalid range remain distinct without constant flashing.
- Enemy health plate appears on aim, damage or threat, animates deltas, respects distance/occlusion and fades instead of permanently filling the screen.
- Pulse Rifle uses a clean 1.8× holographic optic; Rail Scout uses a lens-based 4×/8× scope. Scatter Cannon and Arc SMG keep shoulder ADS without a scope overlay.
- Scope entry changes camera FOV, weapon pose, reticle and edge treatment together. The center ray remains damage truth; the overlay never hides hit confirmation or ammo.
- Notifications are queued/coalesced and animate enter–hold–exit; maximum three visible and never over reticle, optic center, quiz or health.
- Edit cells trace under held pointer, selected cells settle into a holographic draft, commit collapses physical sections and cancel rebuilds the last committed mask.
- Turbo Build on repeats placement at a bounded cadence while held; off accepts exactly one placement per fresh mouse-down.
- Build rotation uses 90° `R` steps. A setting chooses temporary rotation or remembered per-kind offset; `T` cycles material.

## Audio and Juice essentials

- Reload audio is event-driven: magazine/cell out, magazine/cell in, bolt/energy latch and completion are aligned to animation markers. Cancel never plays completion.
- Empty trigger uses a weapon-specific dry click with anti-spam cooldown; empty reserve gives a separate concise feedback state.
- Pulse Rifle/Rail Scout optic enter, optic exit and `V` zoom-step use quiet mechanical/electronic cues.
- Camera/HUD/VFX response is event-profiled and bounded. Automatic fire cannot accumulate unlimited shake.
- Every edit, build, pickup, target, reload and optic cue has an emitter, runtime consumer and cleanup path.
