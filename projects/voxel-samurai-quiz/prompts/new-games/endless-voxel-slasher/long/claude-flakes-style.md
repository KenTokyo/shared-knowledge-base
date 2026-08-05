# Claude Flakes Style — Reactive Heightfield and Clipmap Worlds

**Use:** Copy the complete fenced block and execute it as a standalone game-build request in the target repository.
**Constant:** Game, character, combat, eight skills, enemies, waves, spawn, audio, UI, and English-only player-facing language match the two sibling long prompts.
**Only comparison area:** Map construction, map rendering, map-light coupling, and visible movement/skill residues.
**Map focus:** Stack-neutral Claude Flakes principles: macro heightfield, continuous terrain LOD, bounded SurfaceReactionField, and relief-driven warm/cool lighting.
**Visual verification:** Do not start automated browser, screenshot, gameplay, or FPS verification without an explicit current user request.

```text
CREATE SKYGLASS & VERDANT ENDLESS VOXEL SLASHER — CLAUDE FLAKES STYLE REACTIVE WORLD ENGINE

MISSION AND QUALITY BAR

Build a completely new, immediately playable third-person browser hack-and-slash. The game has exactly two selectable compact worlds, one voxel-like swordfighter class, endless enemy waves, premium MMORPG-grade abilities, and a minimal start flow.

Target the combat responsiveness, full-body animation quality, impact clarity, and layered spectacle associated with the strongest modern action MMORPGs such as Black Desert, while creating an original voxel identity. Use that title only as a quality benchmark. Do not copy its assets, characters, effects, UI, audio, or proprietary content.

World quality must reach the composition, material separation, lighting, and atmosphere of the two supplied concept images. Character construction and animation must use the strongest principles of the Asset Lab V6/V36 voxel rigs: clearly separated body segments, real joint pivots, readable full-body motion, and spatially attached weapons and VFX. Implement everything from scratch and keep it local to this game; do not copy a finished benchmark entry.

References:
- assets/concepts/asset-lab/v91-v120-world-comparison/imagegen-final/world-skyglass-aqueduct-palace-image.png
- assets/concepts/asset-lab/v91-v120-world-comparison/imagegen-final/world-verdant-titan-grove-fortress-image.png

Use the images as art direction and a quality bar, never as flat scenery. The result must function as a real 3D game.

FIRST READ

- First Read 1: the selected world and central combat arena are unmistakable immediately.
- First Read 2: the voxel swordfighter has a clear samurai/action-MMORPG silhouette.
- First Read 3: enemies visibly assemble in the arena center before attacking.
- First Read 4: the skill bar communicates eight abilities and cooldowns without menu clutter.
- First Read 5: jumping, the directional dash skill, and the aerial attack branch read as distinct intentional actions.
- Anti-goal: no empty terrain demo, Minecraft clone, rigid sliding figures, particle show without impact causality, or overloaded MMO interface.

PRODUCT SCOPE

- Build a new standalone game, not a demo inside an editor or Asset Lab.
- Include exactly two worlds selected before play.
- Keep each world's outer span at or below 600 units.
- Keep the playable combat/exploration core around 220–340 units.
- Build a compact endless arena session, not an open-world quest game.
- Support one local player; no network or backend.
- One shared Game Host owns camera, input, combat, enemies, waves, audio, UI, and save/session state.
- Maps never create a second gameplay, input, camera, audio, or UI runtime.
- All player-facing language is English: title, buttons, HUD, tutorials, skill descriptions, wave messages, errors, accessibility labels, and death/restart copy.

START FLOW AND UI

1. The start screen contains only:
   - game title,
   - two large world cards with reference image and English name,
   - an unmistakable selected state,
   - one primary `Start` button.
2. Do not add settings, accounts, news, shop, character editor, or nested menus.
3. `Start` loads the selected world and places the player at its authored entrance.
4. In-game HUD:
   - `Health`,
   - `Stamina`,
   - `Spirit` for the ultimate,
   - `Wave` and `Enemies Remaining`,
   - eight compact skill slots,
   - hotkeys `Q E R 1 2 3 4 5`,
   - dark radial or area cooldown progress,
   - remaining cooldown seconds,
   - clear disabled state when Spirit is insufficient.
5. The skill bar remains readable through intense VFX.
6. Pause contains only `Resume`, `Restart World`, and `World Selection`.
7. Death shows `Wave Reached`, `Retry`, and `World Selection`.

THE TWO WORLDS

WORLD 1 — SKYGLASS AQUEDUCT PALACE

- Bright high-plateau city above a canyon.
- Broad stone plaza as the central combat space, approximately 100–130 units wide.
- Large palace gate as the primary landmark opposite the player entrance.
- Smaller explorable houses, towers, stairs, walls, statues, banners, planters, and market props frame the plaza.
- Aqueduct ring in the background with repeated arches and watchtowers.
- Turquoise channels trace the plaza edges; several waterfalls descend into the canyon.
- Safe parapets and blockers prevent accidental exits from the play space.
- Enemy spawn zone sits in the central floor medallion; several anchors distribute groups without pop-in.
- Lighting: warm directional sun, cool sky fill, turquoise water bounce, golden interior lights, and crisp contact shadows.

WORLD 2 — VERDANT TITAN GROVE FORTRESS

- Ancient forest basin with gigantic trunks as hero landmarks.
- Circular rune clearing as the central combat space, approximately 100–120 units in diameter.
- Large timber hall/fortress opposite the player entrance.
- Smaller houses, pagoda roofs, terraces, stairs, bridges, rock gardens, lanterns, and a root gate frame the clearing.
- Rocks, roots, moss, ferns, shrubs, and small trees join architecture to terrain.
- Titan trees are authored landmarks, never random scatter.
- Enemy spawn zone follows the central rune; spawn anchors remain separated from the player entrance.
- Lighting: warm sun shaft through the canopy, cool green ambient fill, warm windows/lanterns, and visible atmospheric depth without milky near fog.

CLAUDE FLAKES STYLE — REACTIVE HEIGHTFIELD MAP ARCHITECTURE

1. Transfer stack-neutral principles from `D:/CODING/React Projects/github-repos-examples/Claude-Flakes`; copy no Babylon.js/WGSL API, shader file, value table, or finished game world.
2. The reference bar is terrain-dominant: macro shape, fine surface, light, movement, and skill residues behave as one coherent system.
3. Build one baked macro heightfield per world as the ground truth:
   - broad authored landforms and combat spaces,
   - directional medium-scale surface forms instead of isotropic noise,
   - material/slope/exposure helper fields from the final bake,
   - CPU mirror or equivalent query source for exact grounding.
4. Skyglass and Verdant preserve composition, architecture, and material identity; Claude Flakes Style is map technology and surface behavior, not a required snow biome or Babylon look.
5. Skyglass shapes plateau, plaza, channels, palace pad, aqueduct foundations, and canyon edge in the heightfield; architecture sits constructively on it.
6. Verdant shapes basin, clearing, paths, hall pad, root mounds, terraces, and rim rise in the heightfield; Titan trees remain authored landmarks.
7. Use a static nested-ring or equivalent clipmap mesh for continuous ground only when the target camera genuinely needs different resolutions.
8. Clipmap vertices carry compact grid/level data; the vertex path computes world position, grid snapping, morphing, macro height, and response without per-frame CPU rebuild.
9. Overlap/morph band prevents cracks between resolution rings; band-limit response to current grid spacing instead of producing moving triangle ridges.
10. Center detail and response authority on player/playfield focus, not an orbit camera; camera rotation alone never moves or reshapes an existing scar.
11. Fine surface structure is frequency-correct:
   - macro form in the bake,
   - medium directional relief only at sufficient vertex density,
   - microdetail and material normals in the fragment path,
   - pixel/footprint filtering against shimmer and moiré.
12. Build a bounded texel-snapped `SurfaceReactionField` as a ping-pong or equivalent world-state window around player/arena.
13. Field channels are material-semantic, not snow-specific:
   - net depression,
   - displaced mass/raised rim,
   - compaction or fracture level,
   - signed surface state such as wet/frozen versus burned/exposed.
14. A fixed brush staging buffer collects all frame contacts; hard capacity, cheap out-of-window rejection, and overload priority prevent growth.
15. One simulation step applies scroll/recycle, slow material-dependent recovery, directional weathering, new brushes, and safe clamps; no object list per trail.
16. World addressing remains toroidal or equivalently recyclable; newly exposed cells clear safely and field edges fade before seams.
17. Material profiles respond differently:
   - Skyglass stone: shallow depression, sharp fracture, chipped rim, dust/heat state, very slow recovery,
   - Verdant soil/moss: deeper compaction, soft earth berm, torn greenery, moisture, faster natural recovery,
   - wood/root: shallow fiber notch without terrain hole,
   - water: wake/foam/turbidity instead of persistent geometry scar.
18. Beauty, depth/prepass, and every shadow vertex path use identical clipmap placement and filtered field offset; scars have real depth and matching shadows.
19. Fragment material reads field gradient, rim mass, and state for normal, albedo, roughness, and fractured/compacted surface; color alone never pretends to be a deep groove.
20. CPU gameplay height remains the stable baseline bake while residues are cosmetic; VFX and particles may also query visible field offset without rewriting navigation.
21. Reset initializes both ping-pong sides from a safe zero state; world selection, restart, and deterministic review states inherit no old craters.
22. Derive resolution and coverage from the 600-unit maximum, camera distance, smallest visible scar, VRAM, and target hardware; never copy 4096²/2048² reference values blindly.
23. Field update allocates nothing per frame; prebound and prewarmed brush data, targets, scratch values, and skill lights remain capped.
24. One central Environment source supplies sun direction, direct radiance, sky/ambient light, wind, fog, shadows, and grade to every material consumer.
25. Lighting takes its principles from Claude Flakes:
   - low warm grazing sun reveals relief and long shadows,
   - cool sky separates shade from warm direct light,
   - wind/relief direction remains sufficiently crosswise to the sun so micro edges do not flatten,
   - aerial perspective gives terrain scale without making close combat milky.
26. Direct sun moves continuously; expensive sky/IBL bakes may follow through controlled thresholds without visible shadow or specular jumps.
27. Cascaded or equivalent directional shadows fit the real camera envelope and measured height extents, then stabilize in the world texel grid.
28. Pooled skill lights illuminate deformed map materials in the same HDR scale; fixed slots prevent first-cast shader variants.
29. Exposure and tone mapping preserve pale Skyglass stone, Verdant shafts, and skill cores simultaneously; bloom amplifies HDR cores but never replaces relief or material readability.
30. Visual target: broad continuous terrain with directional microstructure, warm/cool lighting depth, and an arena visibly used after a wave.

VOXEL CHARACTER SYSTEM

- Build neither realistic humans nor simple Minecraft block figures.
- Procedurally construct body and armor from named voxel parts with stable part IDs, local pivots, and material roles.
- Player palette: moon silver, deep indigo, cyan energy, and restrained gold accents.
- Enemies are creature-shaped voxel/stone beings: angular rock plates, fractured edges, crystals, and readable animal proportions form body and armor.
- Faces remain fully mask-like and show only one pair of glowing eyes; no visible mouths, noses, teeth, skin, or realistic facial features.
- Eye shape, eye color, silhouette, and value distribution separate roles from combat distance; color alone is insufficient.
- The player may use a dedicated hero-rig render path; repeated enemy parts must be instanced or batched by geometry/material.
- Never create one React element or independent mesh per body part and enemy.
- Batched rigs carry at least `aPartId/aBoneId`, `aPivot`, `aActorId`, `aBaseColor`, and optional emissive/mask attributes.
- Vertex processing transforms position and normal around the real joint pivot through bone/part matrices; lighting must not remain attached to rest pose.
- Interactive bone matrices derive from actor state and normalized clip time, not global world time alone.
- The animation solver evaluates each actor pose once per frame and writes part matrices, weapon anchors, and hit anchors in batches; no React state per joint.
- Identical actor state plus identical clip time produces the same pose; animation remains deterministic and inspectable.
- Target an expressive voxel action figure with faceted box/wedge volumes, readable armor layering, and a premium silhouette.
- Player class is a swordfighter:
  - angular head with glowing eyes and no realistic facial features,
  - separate breastplate, hip guards, shoulder plates, bracers, and boots,
  - asymmetric shoulder/waist profile for recognition,
  - katana in the right hand and scabbard on the left hip,
  - cloth/banner elements limited to a few controlled parts.
- Use a hierarchical voxel rig with at least:
  - Root,
  - Pelvis,
  - Chest,
  - Neck/Head,
  - left/right Shoulder,
  - Elbow,
  - Wrist,
  - Hip,
  - Knee,
  - Ankle/Foot,
  - weapon and scabbard anchors.
- Place pivots anatomically at shoulders, elbows, hips, and knees; limbs never rotate around their center.
- Katana, scabbard, blade trail, cast origin, and hit point remain attached to real rig anchors.
- Drive interactive animation from actor time and a state machine, never a global showcase loop.
- Required animation states:
  - Idle with breathing and weight shift,
  - Run/Sprint/Strafe with opposing arms and planted feet,
  - Jump Start, Airborne Loop, Aerial Skill, Fall, and Landing,
  - Dodge Roll,
  - three-hit LMB chain,
  - heavy RMB slash,
  - Block and Parry,
  - eight skill clips including directional dash and aerial Skyward Fang branch,
  - Hit, Stagger, Knockback, Knockdown, Death, and Victory.
- Every attack follows Anticipation → Travel → Contact → Recovery.
- Damage is active only during visible contact frames.
- Blend compatible poses smoothly; define cancel windows, input buffering, root-motion ownership, and movement release deliberately.
- Full-body action must include planted feet or airborne center-of-mass motion, hip/chest counter-rotation, shoulder lead, off-hand balance, head intent, and follow-through; arm-only weapon swings are invalid.
- Prevent foot sliding, rigid whole-body yaw, gliding enemies, floating jumps, and weapons detached from wrists.
- Enemies use the same rig system with distinct silhouettes, proportions, armor, weapons, and locomotion.

CONTROLS AND COMBAT FEEL

- `WASD`: camera-relative movement.
- Mouse: camera and aim direction.
- `Shift`: sprint.
- `Space`: responsive jump with input buffer, short coyote time, authored ascent/fall, and grounded landing recovery.
- `Left Alt`: dodge roll with brief invulnerability and a visible movement path.
- `LMB`: fast three-hit sword chain.
- `RMB`: heavy slash; hold to block.
- `Q`: dedicated directional dash skill, usable on ground and in air when its cooldown permits.
- Optional soft lock prioritizes enemies inside a view/range cone without imprisoning the camera.
- Define air control, gravity, maximum fall speed, ledge behavior, and landing ownership centrally; jumping must not become flight or bunny-hop speed tech.
- Skills explicitly declare `ground`, `air`, or `both`; unavailable airborne actions buffer safely instead of silently failing.
- At least `Q — Windstep Sever` and the aerial branch of `2 — Skyward Fang` must work during a jump.
- Airborne attacks preserve readable momentum and return to a valid fall/landing state after recovery.
- Hits require spatial hitboxes, team filtering, one hit ID per swing, and explicit range.
- Combat is fast, cancelable, and forceful, never floaty or animation-locked.
- Hit feedback layers a short hit stop, restrained camera impulse, enemy reaction, VFX, and spatial audio.
- Camera impulse remains short and bounded; no persistent nausea-inducing shake.

FIXED SKILL KIT

- `Q — Windstep Sever`, cooldown 5 s, `both`:
  - short directional dash through or past the target on ground or in air,
  - horizontal sword trail synchronized to the full-body cut,
  - delayed afterimage silhouette,
  - light displacement/stagger at contact,
  - never replaces the normal jump or dodge controls.
- `E — Moon Guard`, cooldown 8 s, `ground`:
  - brief parry window,
  - successful parry creates a radial counter arc and strong stagger,
  - failure grants only a short guard with no free damage.
- `R — Tempest Wheel`, cooldown 10 s, `ground`:
  - controlled spinning slash around the player,
  - low ground ring communicates reach,
  - lightly gathers nearby lightweight enemies.
- `1 — Crescent Wave`, cooldown 6 s, `both`:
  - broad low sword arc travels forward,
  - ends at the real collision or maximum-range point,
  - airborne cast follows aim pitch within safe limits without hovering the player.
- `2 — Skyward Fang`, cooldown 9 s, `both`:
  - ground cast performs an upward slash, launches a small target, and carries the player into a short controlled aerial follow-up,
  - airborne cast becomes a deliberate descending fang that preserves aim, locks onto a valid ground-contact point, and ends in a compact impact slash,
  - both branches share one definition, cooldown, damage budget, and hit ID policy.
- `3 — Phantom Blades`, cooldown 14 s, costs Spirit, `both`:
  - three delayed spirit blades strike marked targets,
  - each blade has origin, flight, contact, and its own impact impulse.
- `4 — Storm Domain`, cooldown 18 s, costs Spirit, `ground`:
  - bounded ground zone with an authored edge mask,
  - pulsing cuts and wind lines,
  - no visible rectangular carrier surface.
- `5 — Heaven Splitter`, cooldown 35 s, requires full Spirit, `ground`:
  - short readable preparation,
  - huge vertical sword arc,
  - contact core, halo, directional arc, sparks, ground scar, and pressure ring,
  - strongest moment in the kit without obscuring the entire screen.
- Cooldowns, costs, damage, control, input context, and air/ground permissions live in one shared skill definition consumed by UI, combat, animation, and AI.

SLASH VFX RESEARCH, LAYERING, AND AUDIO

- Before implementation, inspect the strongest relevant local combat/VFX examples and current first-party engine documentation for trails, transparent sorting, HDR, pooling, depth, and shader ownership.
- Study high-quality action-game blade arcs, sword trails, hit flashes, and aerial slashes as motion/readability references; recreate principles, never assets or proprietary effect designs.
- Evaluate every slash from gameplay camera distance for silhouette, direction, timing, contact point, target visibility, and map response.
- Every effect follows Cause → Travel/Motion → Contact → Reaction → Decay.
- VFX origin comes from hand, sword edge, foot contact, target contact, or authored ground anchor.
- Premium slash VFX deliberately layer:
  - solid/depth-writing blade or impact mass where physical form is needed,
  - narrow HDR blade-edge core,
  - camera-readable ribbon trail following sampled weapon motion,
  - directional crescent/arc that communicates attack plane and reach,
  - soft halo kept subordinate to silhouette,
  - contact flash and radial or directional impact burst,
  - sparks, stone shards, leaves, dust, or water droplets selected by surface material,
  - wind streaks or restrained distortion aligned with motion,
  - short pooled dynamic light,
  - authored ground scar/decal or reaction-field write,
  - synchronized enemy reaction, hit stop, camera impulse, and spatial audio.
- Do not maximize every layer simultaneously; assign primary, support, contact, and decay roles so the swordfighter and target remain readable.
- Sample the real weapon path across animation time; trails must not jump from wrist to target or remain attached to rest pose.
- Slash width, taper, curvature, UV flow, brightness, and lifetime follow velocity and attack phase rather than generic global time.
- Mass writes depth; halos and light layers may be transparent/additive. Avoid flat glowing planes, rectangular carrier silhouettes, texture cutoffs, and bloom-only shape.
- Aerial slash VFX preserve vertical direction and show the actual landing/contact point before the strongest burst.
- Pool particles, trails, impact lights, scars, and spawn fragments; prewarm any first-cast shader variants.
- Audio per skill layers preparation, body/cloth motion, blade swing, travel, material-specific contact, low impact, and decay.
- Footsteps, armor, katana, water, wind, forest, arena, and enemies have distinct spatial roles.
- Music begins restrained, intensifies for elites/bosses, and loops endlessly without an audible seam.

WORLD RESPONSE TO MOVEMENT AND SKILLS

- Damage, hit timing, range, cooldown, and control remain identical across map styles and surface materials.
- One shared `WorldImpactEvent` is the only combat-to-map handoff: stable event ID, world ID, final contact point, surface normal, direction, footprint, strength, duration, and reaction roles.
- Create the event at real weapon, projectile, foot, landing, or ground contact, never at the player origin as a substitute.
- Rendering, persistent map response, particles, light, and audio consume the same contact; never estimate separate hit points.
- Response is cosmetic by default and changes neither damage, navigation, spawn fairness, nor boss mechanics.
- Skyglass responds through carved stone, chipped edges, displaced dust, fine fracture veins, and short water wakes.
- Verdant responds through torn moss, compacted soil, cut leaves, loosened earth, and stressed root surfaces.
- Architecture, water, parapets, spawn anchors, and indestructible landmarks may react visibly but retain gameplay-critical collision.
- Movement response: steps leave subtle contacts; sprint, dodge, dash, jump takeoff, and landing create broader directional scuffs or compression without repainting the arena in seconds.
- `Q — Windstep Sever`: narrow directional cut along the real ground or aerial dash path; dust/leaves/water move laterally, with no fake ground scar while fully airborne.
- `E — Moon Guard`: only a successful counter writes a brief broken pressure ring at the parry contact; failure leaves no persistent mark.
- `R — Tempest Wheel`: several shallow tangential cuts form an irregular ring instead of a perfect circle texture.
- `1 — Crescent Wave`: low trail ends at the true collision/range point and becomes shallower with distance.
- `2 — Skyward Fang`: ground branch opens a compact wedge crack at takeoff; aerial branch writes its strongest compact mark only at the measured landing/contact point.
- `3 — Phantom Blades`: each spirit blade writes exactly one narrow notch at its own target contact.
- `4 — Storm Domain`: pulses accumulate bounded crossing cuts within the authored edge mask; no rectangular carrier.
- `5 — Heaven Splitter`: deepest directional groove in the kit with broken rim, material fragments, and a long but finite decay.
- The same event ID never writes a second residue; multi-hit, render replay, and state replay remain idempotent.
- Residues have fixed capacity, spatial window, or capped chunks; overload discards the smallest/oldest secondary marks before memory or draw calls grow.
- Surfaces heal or weather slowly by material profile; the ultimate scar lasts longest and micro-footsteps shortest.
- `Restart World`, death retry, and world selection clear all map residues completely and deterministically.
- Beauty, depth/prepass, and shadow paths consume the same visible geometry change; a color mask cannot pretend to be a deep groove.
- Underwater response becomes wake/turbidity instead of a permanent scar; steep or ineligible surfaces safely degrade to material feedback.
- Debug data exposes active contacts, residue occupancy, discarded writes, field/chunk boundaries, air/ground context, and reset revision; do not start browser checks without explicit permission.

ENDLESS WAVES AND ENEMIES

- Waves run `1…∞`; there is no final victory gate.
- The next wave starts after a short clear pause when the previous enemies are defeated.
- One shared `WaveDirector` is the source of truth for wave number, unlocked species, composition, scaling, elite modifiers, and boss rotation.
- Every fifth wave `5, 10, 15, …` is mandatory: one boss plus reduced support; no fifth wave may omit its boss.
- Boss waves alternate deterministically between Titan Golem and Storm Wyrm; later appearances add phases, attack combinations, and stronger support instead of health alone.
- Difficulty never drops: health, damage, and stagger resistance rise through stable bounded formulas; movement and attack speed rise more slowly and have safe caps.
- Every five-wave segment unlocks species, attacks, group combinations, or elite modifiers.
- Waves 1–4 introduce the first four regular species; waves 6–9 add two more; from wave 11 all eight regular species can form increasingly mixed groups.
- From wave 6 elite modifiers may strengthen regular species but never count as additional species.
- Once multiple species are unlocked, consecutive non-boss waves cannot use the same enemy composition.
- Active enemies have a hard cap; target approximately 18–24 simultaneously only after performance evidence.
- All spawn, enemy, and projectile effects use pools; no unbounded object accumulation.
- Include exactly ten enemy species: eight regular creatures and two bosses:
  1. Stonefang Wolf: low fast quadruped with pack circling, leap-bite telegraph, and vulnerable recovery,
  2. Crystal Mantis: narrow crystal hunter with side steps, pincer combo, and clear cross-cut warning,
  3. Rootshell Beetle: armored tank with frontal guard, charge, and exposed rear counter area,
  4. Shardwing Raven: flying stone creature with shadow warning, dive, and short grounded phase,
  5. Obsidian Ape: heavy breaker with rock-fist combo, leap slam, and radial ground warning,
  6. Runehorn Stag: fast charger with visible attack line, wall stagger, and broad antler sweep,
  7. Boulder Tortoise: slow artillery creature with stone shell, shard projectile, and interruptible charge,
  8. Hollow Serpent: segmented stone snake with ground wave, brief burrow, and marked emergence point,
  9. Titan Golem: massive boss of floating voxel rock plates with two to three phases, breakable armor roles, and large ground warnings,
  10. Storm Wyrm: long voxel stone wyrm with air/ground transitions, lightning eyes, corridor attack, and arena-wide but avoidable boss mechanic.
- All ten species have stone-like voxel silhouettes; only glowing eyes are visible in the face from every relevant distance.
- Regular species and bosses require distinct proportions, locomotion, ranges, telegraphs, and counter windows; color variants are invalid.
- Enemies navigate around houses, water, trees, roots, parapets, and arena props; flight and burrow phases respect the same play-space limits.
- No enemy walks through geometry, attacks through walls, or spawns inside the player.

SPAWN SEQUENCE

- Enemies appear only at authored central arena spawn anchors.
- Spawn has 0.8–1.4 s of readable telegraphing before activation.
- Skyglass: floor rune glows turquoise/gold; voxel fragments rise from a light seam and assemble the body by segment.
- Verdant: root rune grows; leaves, wood splinters, and green light form the silhouette from the ground.
- Sequence: Ground Sign → Particle Rise → Rig Assembly → Core Flash → Material Stabilization → Enemy Active.
- Enemy is harmless and not invisibly hittable during assembly.
- Spawn light, particles, and sound remain attached to the same anchor.
- Wave manager offsets spawn times so effects do not all begin in one frame.

LIGHTING SYSTEM

- One central Environment source of truth controls sunlight, sky fill, fog, shadows, exposure, and color grade.
- Skyglass: warm key light, cool canyon fill, water bounce, bright readable stone, and golden interior accents.
- Verdant: directional sun shafts, cool canopy shadow, warm window/lantern contrast, and controlled height fog.
- Cascaded or equivalent directional shadows cover player, enemies, and arena; distant scenery uses lower shadow quality.
- Allow only a few pooled skill/spawn lights at once with bounded intensity and lifetime.
- Bloom supports HDR cores but never replaces form or material separation.
- Tone mapping and exposure prevent blown-out VFX and crushed black shadows.

EXECUTION AND CRAFT LOOP

- Execution profile `linear`: one integration owner understands the repository and references, builds the full product, and keeps coupled decisions in one context.
- Do not create subagents or a parallel architecture.
- Order: lock product contract → Game Host → primary map path → character/combat → skills → enemies/waves → second world → lighting/performance → final contract pass.
- Before combat VFX implementation, complete the targeted research pass defined above and record only decisions that affect the product.
- After each coherent cut, inspect real artifacts: ownership, data flow, registration, limits, air/ground state, reset, and static gates.
- Fix the largest evidence-backed gap; do not use a fixed iteration count or self-declared quality as proof.
- Never start agent-driven browser, screenshot, gameplay, or FPS checks without explicit permission in the current request.
- Visible effect quality, combat feel, and measured runtime remain honest manual product gates without that permission.

PERFORMANCE AND GATES

- Target stable 60 FPS on defined target hardware; never claim FPS without measurement.
- Report CPU/GPU frame time p50/p90/p99, draw calls, triangles, active enemies, particles, and shadow cost only when measured through an allowed run.
- Instance repeated world forms and voxel enemy parts where movement architecture permits.
- No per-frame geometry/material creation, unbounded arrays, or React state updates in the render loop.
- Pool enemies, projectiles, hits, VFX, trails, decals/scars, audio sources, and dynamic lights.
- Remove invisible distant cost, excess shadows, and secondary particles first; preserve character, slash, skill, and arena readability.
- Static gates verify:
  - TypeScript,
  - deterministic map build,
  - ground parity,
  - spawn outside blockers,
  - complete skill definitions including air/ground permissions,
  - valid jump/dodge/dash state transitions,
  - finite shader uniforms,
  - resource disposal,
  - active enemy/pool caps,
  - bounded map response, complete reset, and beauty/depth/shadow parity.
- Do not add browser, screenshot, or gameplay tests without an explicit user request.

DELIVERY ORDER

1. Understand rules, repository, and references.
2. Build shared Game Host, state flow, and world selection.
3. Build macro heightfield, continuous ground, and SurfaceReactionField.
4. Build Skyglass as the complete reactive-terrain vertical slice.
5. Integrate voxel player, jump/dodge/dash, base combat, and camera.
6. Integrate eight skills, researched layered slash VFX, audio, and skill bar.
7. Integrate enemy rigs, AI, spawn, and endless waves.
8. Build Verdant as the second material profile in the same reactive terrain engine.
9. Close lighting, material separation, performance, and edge cases.
10. Bundle static/numeric gates and hand visible acceptance to the user.

DONE WHEN

- Start screen selects exactly Skyglass or Verdant and starts directly.
- Both maps use the same Claude-Flakes-style heightfield/clipmap/reaction-field foundation with distinct material profiles.
- Player and enemies are premium voxel rigs with articulated full-body ground and aerial animation.
- Jump, separate dodge, `Q` dash, and aerial `Skyward Fang` transition without broken states.
- `Q E R 1–5` work, show cooldowns, and own attached layered VFX/audio/hits.
- Endless waves, elites, and bosses run without unbounded growth.
- Movement and all eight skills leave material-correct bounded fully resettable map traces.
- Enemies visibly assemble in the arena center and activate only after assembly.
- World light, skill light, slash layers, materials, and tone mapping remain readable.
- Every player-facing string is English and UI stays compact around start plus combat values.
- Static/numeric gates are green; visible combat feel remains honestly marked for user acceptance.
```
