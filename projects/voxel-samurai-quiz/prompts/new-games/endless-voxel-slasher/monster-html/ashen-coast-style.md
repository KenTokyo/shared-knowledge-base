# Ashen Coast Style — Monster HTML-Only Chat Prompt

**Use:** Paste the complete block into a chat interface to request one offline monster showcase.

```text
Create a premium interactive 3D monster gallery as exactly one self-contained file named `monster.html`. Return a downloadable file attachment when supported; otherwise return exactly one complete `html` fenced code block and nothing else. The saved file must run by double-click through `file://`. Put all HTML, CSS, ordinary JavaScript, GLSL strings, procedural geometry, generated texture data, SVG/data URIs, and optional Web Audio inside that file. No terminal, CLI, npm, build step, server, import, module, CDN, fetch, network request, external library, font, image, sound, model, worker file, or second asset.

Build a real interactive creature showcase with renderer-independent rig, camera, selection, and UI state, not a static picture, fake 3D card, sprite sheet, or DOM cube pile. At boot automatically select `WebGL2 → WebGL1 → Canvas 2D`: prefer raw WebGL2, try raw WebGL1 when WebGL2 is unavailable or initialization fails, then run a genuine Canvas 2D renderer when neither GPU path works. Missing WebGL2 must never stop the gallery. Use a fresh canvas element for each backend attempt. WebGL1 needs its own GLSL ES 1.00-compatible shader/resource path with feature checks and no WebGL2-only assumptions. If an initialized GPU context is lost, pause, attempt bounded restoration, then replace the canvas and continue through the fallback ladder without resetting the selected creature, animation, or camera state.

The first read is a full-screen premium creature showroom: one selected stone-like voxel monster fills a clean hero viewport while a compact collection rail exposes all ten species immediately. Use an original authored look. Treat Monster Hunter only as a benchmark for ecological species readability, Elden Ring only as a benchmark for weathered monumentality, and modern Zelda games only as a benchmark for clear encounter silhouettes. Copy no creature, asset, lore, UI, animation, sound, or proprietary design.

GALLERY CONTRACT

- Show exactly ten selectable creatures from the fixed roster below: eight regular species and two clearly marked bosses.
- Provide ten numbered selector buttons, creature name, Regular/Boss tag, scale class, locomotion type, and one short English design capsule.
- Add mouse/touch orbit, wheel/pinch zoom, drag rotation, previous/next controls, keyboard keys `1`–`0`, auto-rotate toggle, reset camera, pause, and `Idle`, `Move`, `Attack`, and `Hit` animation buttons.
- Keep the selected creature centered, fully visible, grounded, and large enough to judge at desktop and mobile sizes. Hide debug overlays by default and include a simple humanoid-sized stone marker for scale.
- Use a restrained coastal plinth, distant cliff silhouettes, light sea mist, and authored key/fill/rim lighting. The environment supports the creature and never hides its silhouette.
- Show a small nonblocking English renderer-status label. Show a fatal error only if even Canvas 2D cannot initialize. Keep every label, tooltip, status, and accessibility name in English.

HARD CREATURE CONTRACT

- Every species must read as a different creature in solid-black silhouette: unique main mass, support pattern, proportions, negative space, head construction, locomotion, scale, material breakup, eye arrangement, idle rhythm, and signature attack.
- Build coherent form hierarchies from tapered, overlapping faceted voxel modules. Boxes and wedges are construction tools, not the final read. No random cube stacks, recolored shared body, generic humanoid, standard golem with swapped horns, detached limbs, or VFX used to hide weak anatomy.
- All bodies are weathered stone ecosystems using basalt, salt crust, sea glass, reef mineral, ash, cinder, wet rock, copper stain, or petrified driftwood with believable mass, erosion, compressed joints, contact wear, and controlled surface variation.
- The eyes are the only visible facial feature on every regular creature and boss. Eyes may vary in count, spacing, color, depth, and motion, but each head is otherwise a fully sealed stone mask: no visible mouth, jaw opening, nose, nostrils, teeth, tongue, lips, skin, or human face.
- Each creature needs articulated full-body `Idle`, `Move`, `Attack`, and `Hit` states. Weight travels through the root and support limbs; feet plant, fins push, wings balance, long bodies propagate motion, heavy parts lag, and recovery returns the whole body to balance.
- Each signature action follows load → body source → contact or release → recoil/reaction → readable recovery. Effects may add spray, salt dust, rock chips, cinders, sparks, or pressure only where material or contact causes them.
- Bosses are original complete body plans with authored scale and phase-like escalation, not enlarged regular creatures.

FIXED ASHEN COAST ROSTER — EXACTLY THESE TEN

1. `Saltstone Crab` — regular blocker; wide low shell, eight lateral legs, one oversized slab claw and one fine probe claw, pearl-blue stalk eyes, and a sideways brace-to-crush motion.
2. `Ashcliff Ibex` — regular charger; compact cliff-goat body, split mineral hooves, sweeping spiral rock horns, two ember eyes in a sealed wedge mask, and a vertical rear-and-drop attack.
3. `Tiderune Heron` — regular sentinel; two extreme stilt legs, narrow counterweighted body, folded slate wings, a closed spearhead mask with teal eyes, and a precise whole-body spear lunge without a visible beak opening.
4. `Reefback Boar` — regular breaker; dense low torso, coral ridge armor, short digging legs, a blank forward shield head with four orange eyes, and a shoulder-led plow charge with no snout or tusked mouth.
5. `Brineveil Ray` — regular skimmer; broad diamond stone membrane, flexible layered wing edges, trailing mineral ribbons, two green eyes on a sealed dorsal mask, and a low pressure-wave pass.
6. `Stormglass Scorpion` — regular artillery beast; six anchored walking legs, paired sea-glass pincers, segmented overhead tail, a horizontal line of violet eyes on a closed face plate, and a charged tail-sting release.
7. `Driftrock Centipede` — regular swarmer; long petrified-stone trunk, many paired contact legs, alternating salt plates, tiny gold eyes beneath a sealed lead shield, and a traveling lateral body snap.
8. `Cindercliff Salamander` — regular area controller; low flexible igneous body, four splayed gripping limbs, heat-cracked dorsal fins, two white eyes in a smooth black mask, and a coiling cinder burst from real ground contact.
9. `Breakwater Leviathan` — boss; enormous armored coastal crawler with four fin-like load limbs, layered seawall ribs, a blank cliff face carrying two lighthouse-scale cyan eyes, and a staged body-roll that throws a bounded ring of spray and stone.
10. `Tempest Fortressback` — boss; living island-like siege beast carried by six asymmetrical stone pylons, stormglass sails along its back, three pairs of electric eyes in a sealed frontal citadel, and a wind-loaded stomp sequence ending in a directional thunder front.

ASHEN COAST STYLE DIRECTION

- Make the roster feel authored by one harsh shoreline: salt-eaten basalt, wet ledges, sea glass, oxidized mineral stains, pale ash, black cinder, reef accretion, and petrified wood.
- Use distinct exposure zones: dry matte upper planes, darker wet lower stone, pale salt in sheltered seams, and limited glassy fracture where pressure or storms formed it.
- Light with a low warm sun, cool ocean fill, soft mist depth, readable contact shadows, and restrained spray sparkle. Never flatten the roster into gray fog or hide the eyes behind bloom.
- The ten species must feel ecologically related while never sharing the same body template, gait, attack source, or scale read.

RUNTIME AND SOURCE QUALITY

- Use one active renderer adapter and one animation loop. Automatically choose WebGL2, WebGL1, or Canvas 2D in that order; keep reusable mesh builders, indexed GPU buffers where supported, shared primitive/material families, and cached creature definitions. Render only the selected hero at full detail; do not keep ten hidden full-detail scenes running.
- All adapters consume the same creature definitions, hierarchical rig transforms, animation timelines, input, orbit camera, selection, and UI state. Canvas 2D must draw live depth-sorted faceted body parts, grounding, scale marker, eye motion, and every animation state; it may reduce lighting, shadows, particles, and background depth, but it may not substitute a screenshot, static card, disabled control, or simplified unrelated mascot.
- Keep update work allocation-light, clamp delta time, pause when hidden, cap device pixel ratio and transient particles, dispose replaced GPU resources, handle resize/context loss, and preserve controls after repeated creature switching.
- Design toward smooth 60 FPS on a modern desktop with the selected boss animating, but never claim measured performance unless the page actually measures it. Reduce mist layers, background spray, shadow resolution, DPR, and secondary debris before reducing silhouette, eyes, main animation, or contact clarity.
- Keep source readable with named sections and small functions/classes for math, renderer, geometry, creature definitions, rig evaluation, animation, effects, input, camera, UI, and lifecycle. Do not minify.

DONE WHEN

- One offline `monster.html` opens directly and contains the complete experience.
- Exactly ten selector entries and exactly the ten named creatures exist; entries 9 and 10 are bosses.
- Every creature is distinct without text, color, or effects and has four working animation states.
- Every face exposes eyes only and no forbidden facial feature from any angle or animation.
- Selection, camera, controls, responsive layout, renderer status, context fallback, and repeated switching work without external files.
- Disabling WebGL2 still yields the complete interactive gallery through WebGL1 or Canvas 2D rather than a hard stop.
- The final response is only the downloadable file or one complete `html` code block containing `monster.html`.
```
