```text
CREATE SKYGLASS & VERDANT ENDLESS VOXEL SLASHER — ASHEN COAST STYLE AEON WORLD ENGINE

MISSION AND QUALITY BAR

Build a completely new, immediately playable third-person browser hack-and-slash. The game has exactly two selectable compact worlds, two complete voxel hero classes—a Swordfighter and a technology-based Elemental Technician—endless enemy waves, premium MMORPG-grade abilities, and a minimal start flow.

Target the combat responsiveness, full-body animation quality, impact clarity, and layered spectacle associated with the strongest modern action MMORPGs such as Black Desert, while creating an original voxel identity. Use that title only as a quality benchmark. Do not copy its assets, characters, effects, UI, audio, or proprietary content.

World quality must reach the composition, material separation, lighting, and atmosphere of the two supplied concept images. Character construction and animation must use the strongest principles of the Asset Lab V6/V36 voxel rigs: clearly separated body segments, real joint pivots, readable full-body motion, and spatially attached weapons and VFX. Implement everything from scratch and keep it local to this game; do not copy a finished benchmark entry.

References:
- assets/concepts/asset-lab/v91-v120-world-comparison/imagegen-final/world-skyglass-aqueduct-palace-image.png
- assets/concepts/asset-lab/v91-v120-world-comparison/imagegen-final/world-verdant-titan-grove-fortress-image.png

Use the images as art direction and a quality bar, never as flat scenery. The result must function as a real 3D game.

FIRST READ

- First Read 1: the selected world and central combat arena are unmistakable immediately.
- First Read 2: class choice reads instantly as either an agile voxel swordfighter or a reactor-equipped Elemental Technician.
- First Read 3: enemies visibly assemble in the arena center before attacking.
- First Read 4: the skill bar communicates nine class abilities and cooldowns without menu clutter.
- First Read 5: jumping, the class dash, each aerial attack branch, sword impacts, and large elemental area attacks read as intentional actions.
- Anti-goal: no empty terrain demo, Minecraft clone, rigid sliding figures, robe-wizard reskin, unexplained recolored magic circles, particle show without impact causality, or overloaded MMO interface.

PRODUCT SCOPE

- Build a new standalone game, not a demo inside an editor or Asset Lab.
- Include exactly two worlds selected before play.
- Include exactly two complete playable classes selected before play: `Swordfighter` and `Elemental Technician`.
- Keep each world's outer span at or below 600 units.
- Keep the playable combat/exploration core around 220–340 units.
- Build a compact endless arena session, not an open-world quest game.
- Support one local player; no network or backend.
- One shared Game Host owns camera, input, class selection, combat, enemies, waves, audio, UI, and save/session state.
- Maps and classes never create a second gameplay, input, camera, audio, or UI runtime.
- Both classes receive equal production depth: full-body rigs, movement, jump, dodge, ground/air dash, nine skills, aerial branch, cooldown UI, VFX, audio, hits, map response, and reset behavior.
- All player-facing language is English: title, class and skill names, buttons, HUD, tutorials, skill descriptions, wave messages, errors, accessibility labels, and death/restart copy.

START FLOW AND UI

1. The start screen contains only:
   - game title,
   - two large world cards with reference image and English name,
   - two clear class cards for `Swordfighter` and `Elemental Technician`,
   - unmistakable selected states for world and class,
   - one primary `Start` button.
2. Do not add settings, accounts, news, shop, character editor, or nested menus.
3. `Start` loads the selected world and selected class at the authored entrance.
4. In-game HUD:
   - `Health`,
   - `Stamina`,
   - class resource: `Spirit` for Swordfighter or `Core Charge` for Elemental Technician,
   - `Wave` and `Enemies Remaining`,
   - nine compact skill slots,
   - hotkeys `Q E R 1 2 3 4 5 6`,
   - dark radial or area cooldown progress,
   - remaining cooldown seconds,
   - clear disabled state when the current class resource is insufficient.
5. The skill bar remains readable through intense sword and elemental VFX.
6. Pause contains only `Resume`, `Restart World`, and `World Selection`.
7. Death shows `Wave Reached`, `Retry`, and `World Selection`; retry preserves the selected class.

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

ASHEN COAST STYLE — LOCAL AEON WORLD ARCHITECTURE

1. Use only the local AEON implementation as the architectural reference:
   - `src/engine/world/worlds/v73AshenCoast.js`,
   - `src/engine/world/WorldSpec.js`, `Heightfield.js`, `Terrain.js`, `Structures.js`, `TreeField.js`,
   - `src/engine/render/Environment.js` and `Water.js`.
2. V73 Ashen Coast is a finished read-only reference; build Skyglass and Verdant as new specs using its principles, never copies of its coastline.
3. One closed `WorldSpec` is the source of truth per world; missing required data fails loudly during boot instead of becoming an empty area three systems later.
4. Resolve the selected world exactly once before allocating heightfields, typed arrays, and runtime systems; freeze the active spec or perform a complete controlled reload, never a partial live swap.
5. Each spec authors at least:
   - world span, sea/water base, separate field resolutions, and seed,
   - landmass silhouette, ridges, spurs, peaks, and large depressions,
   - river control line/profile, ponds, channels, and coast/water boundaries,
   - roads, side paths, construction pads, landmarks, camps, and distant carriers,
   - biome regions, player start, enemy/boss anchors,
   - verifiable camera/composition intents rather than fragile coordinates alone.
6. Author major forms and routes deliberately; noise breaks surfaces and transitions but never decides arena, landmark, river, or road placement alone.
7. Run the shared bake in fixed dependency order:
   - distance fields for ridges, waterways, and roads,
   - analytic macro shape from the spec,
   - erosion/weathering,
   - derive water profile from eroded ground, then carve bed and banks,
   - grade roads, level pads, and place distant forms,
   - upsample final height and add fine relief,
   - derive normals/slope, material splat, and biome/density fields.
8. Everything after the bake reads the same fields: terrain, player, enemies, camera, structures, vegetation, water, VFX, spawn, and map response.
9. `groundHeightAt`, normal, slope, water height, splat, and biome query come from the final bake; no diverging CPU/GPU interpolation implementations.
10. Cache is deterministic and world-bound; schema/bake version, seed, resolutions, world ID, and source hash prevent stale or swapped worlds.
11. Never blindly scale V73 values to the 600-unit maximum:
   - each field resolution follows its smallest visible or gameplay-required frequency,
   - world span and bake, splat, biome, and distance-field resolutions remain separate decisions,
   - LOD is justified only when the real target camera discards areas or detail levels.
12. When evidence requires it, continuous ground uses Ashen-Coast-style CDLOD/quadtree terrain: one reusable patch mesh, instanced nodes, tight frustum selection, and a morph band between neighboring levels.
13. Beauty and shadow/depth paths use identical patch placement, camera uniforms, height sampling, and morph logic; the light camera never displaces terrain differently from the game camera.
14. Terrain material combines a few clear roles through shared texture arrays and splat/biome data: stone, soil/grass, sand/rubble, path, and wetness; steep faces use appropriate projection instead of smeared top UVs.
15. Skyglass spec authors plateau, plaza, palace pad, channels, aqueduct foundations, canyon edge, and safe approaches as coherent fields/sites.
16. Verdant spec authors forest basin, clearing, hall pad, paths, terraces, root mounds, Titan tree sites, and rim rise as coherent fields/sites.
17. Structures sample several points across their final footprint; top sits above the highest contact and plinth skirt reaches below the lowest, preventing float and burial.
18. Buildings batch by site and material rather than one island mesh; site bounds receive frustum culling and repeated shapes preserve scale-correct world UVs.
19. Structures publish clearings, paving/paths, colliders, traversable special surfaces, and named anchors; vegetation, material path, player, and enemies consume the same results.
20. Grass/flowers may be camera-relative and shader-driven; large trees scatter once deterministically from biome, splat, water, slope, and clearings, then chunk spatially and instance.
21. Every visible random parameter gets an independent stable hash stream; existence/position never accidentally couples yaw, scale, brightness, or species choice.
22. Water derives from finished terrain:
   - river surface never runs uphill,
   - bed/banks match the profile,
   - waterfalls originate at measured gradient spans,
   - pond surface sits in a basin that can hold it,
   - shader depth uses the same height query as ground.
23. Runtime response is a bounded material-semantic `InteractionField` above the immutable baseline bake; skill scars never write back into signed terrain cache.
24. At real contact, `WorldImpactEvent` queries splat, biome, water, and site occupancy; material role determines notch, displacement, fracture, wetness, and recovery instead of map-specific skill code.
25. Beauty, depth/prepass, and shadow paths read the same filtered response offset; gameplay height remains stable while residues are cosmetic.
26. Response field uses capped world tiles or a focus-local window with field revision, complete reset, and safe fallback on structures, water, and steep surfaces.
27. One Environment source of truth owns time of day, weather, sun direction/color/intensity, sky/ground fill, fog/haze, wind, shadows, exposure, and color grade.
28. Sky dome, directional shadows, environment probe, terrain, vegetation, water, skill lights, and post effects consume that source; no consumer invents its own sun or fog.
29. Lighting follows Ashen Coast principles: cross/back light draws grass and surface edges, warm key separates from cool sky fill, ground bounce keeps shadows material-readable, and aerial perspective carries true foreground/midground/background.
30. Specs describe camera intents through subject, range, bearing arc, light relationship, clear sightline, foreground, and terrain falloff; solve coordinates from final bake and revalidate after world changes.
31. Visual target: an authored compact world with dense local geography, constructively aligned systems, and three clear depth planes—not noise terrain with props placed on top.

TWO VOXEL CLASS SYSTEMS

- Build neither realistic humans nor simple Minecraft block figures.
- Include exactly two selectable hero classes with different silhouettes, weapons, animation language, resources, and complete nine-skill kits; neither class may be a recolor or placeholder.
- Procedurally construct bodies and armor from named voxel parts with stable part IDs, local pivots, and material roles.
- Enemies are creature-shaped voxel/stone beings: angular rock plates, fractured edges, crystals, and readable animal proportions form body and armor.
- Faces remain fully mask-like and show only one pair of glowing eyes; no visible mouths, noses, teeth, skin, or realistic facial features.
- Eye shape, eye color, silhouette, and value distribution separate roles from combat distance; color alone is insufficient.
- Each player class may use a dedicated hero-rig render path; repeated enemy parts must be instanced or batched by geometry/material.
- Never create one React element or independent mesh per body part and enemy.
- Batched rigs carry at least `aPartId/aBoneId`, `aPivot`, `aActorId`, `aBaseColor`, and optional emissive/mask attributes.
- Vertex processing transforms position and normal around the real joint pivot through bone/part matrices; lighting must not remain attached to rest pose.
- Interactive bone matrices derive from actor state and normalized clip time, not global world time alone.
- The animation solver evaluates each actor pose once per frame and writes part matrices, weapon/emitter anchors, and hit anchors in batches; no React state per joint.
- Identical actor state plus identical clip time produces the same pose; animation remains deterministic and inspectable.
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
  - class weapon, emitter, and equipment anchors.
- Place pivots anatomically at shoulders, elbows, hips, and knees; limbs never rotate around their center.

SWORDFIGHTER CLASS

- Target an expressive voxel samurai/action-MMORPG silhouette with faceted box/wedge volumes and readable armor layering.
- Palette: moon silver, deep indigo, cyan energy, and restrained gold accents.
- Use separate breastplate, hip guards, shoulder plates, bracers, boots, and an asymmetric shoulder/waist profile.
- Attach katana to the right hand, scabbard to the left hip, and sword trail/cast/hit anchors to the real blade path.
- Limit cloth/banner elements to a few controlled parts.
- Resource: `Spirit`, earned through deliberate combat and spent by upper-tier sword skills.

ELEMENTAL TECHNICIAN CLASS

- This class fills the mage role through visible engineered technology, never robes, a staff, unexplained spellcasting, or a swordfighter recolor.
- Silhouette: ceramic-metal field armor, reinforced stance, articulated coil gauntlets, compact back reactor, shoulder emitter fins, belt canisters, and one small utility drone.
- Palette: dark graphite, pale ceramic, copper conductors, bright cyan charge, and element-specific accents only at active emitters.
- Resource: `Core Charge`, built by accurate attacks, elemental interactions, and controlled multi-target hits.
- Every element has a readable device chain: reactor charge → named emitter → travel/field medium → measured contact → material response.
- Plasma igniters create flame and fireballs; cryogenic phase arrays grow ice and frost; Tesla coils and ion channels create lightning; turbine/vector nozzles compress wind; induction lances melt mineral feedstock into magma; paired gravity lenses create a brief contained micro-singularity effect.
- Fire, frost, lightning, wind, magma, and gravity must differ in motion, sound, timing, material response, crowd control, and decay—not merely color.
- The Technician is intentionally overpowered against groups through large authored AoE footprints, chain reactions, and strong crowd control, while telegraphs, boss resistance rules, visibility, and hard runtime caps remain clear.
- Attach gauntlet muzzles, reactor vents, drone ports, field projectors, cast origins, and hit points to real rig/equipment anchors; no effect may originate from an arbitrary world point.

FULL-BODY ANIMATION CONTRACT

- Drive interactive animation from actor time and a state machine, never a global showcase loop.
- Required states for both classes:
  - Idle with breathing, device/weapon readiness, and weight shift,
  - Run/Sprint/Strafe with opposing limbs and planted feet,
  - Jump Start, Airborne Loop, Aerial Skill, Fall, and Landing,
  - Dodge Roll,
  - class-specific three-hit LMB chain,
  - class-specific RMB heavy/guard action,
  - Block or Projector Guard and Parry/Overload reaction,
  - nine authored skill clips per class including a ground/air dash and aerial attack branch,
  - Hit, Stagger, Knockback, Knockdown, Death, and Victory.
- Every attack follows Anticipation → Travel → Contact → Recovery.
- Damage is active only during visible contact frames.
- Blend compatible poses smoothly; define cancel windows, input buffering, root-motion ownership, and movement release deliberately.
- Full-body action includes planted feet or airborne center-of-mass motion, hip/chest counter-rotation, shoulder lead, off-hand balance, head intent, recoil or follow-through; arm-only attacks are invalid.
- Sword cuts carry the whole body; Technician casts visibly brace, recoil, redirect emitters, vent heat, and recover from force.
- Prevent foot sliding, rigid whole-body yaw, gliding enemies, floating jumps, and weapons, emitters, drones, or VFX detached from their anchors.
- Enemies use the same rig principles with distinct silhouettes, proportions, armor, weapons, and locomotion.

CONTROLS AND COMBAT FEEL

- `WASD`: camera-relative movement.
- Mouse: camera and aim direction.
- `Shift`: sprint.
- `Space`: responsive jump with input buffer, short coyote time, authored ascent/fall, and grounded landing recovery.
- `Left Alt`: dodge roll with brief invulnerability and a visible movement path.
- `LMB`: class primary chain—three fast sword cuts or three articulated gauntlet pulses.
- `RMB`: class heavy/defense—heavy slash with hold-to-block or charged plasma shot with hold-to-projector-guard.
- `Q`: dedicated directional class dash, usable on ground and in air when its cooldown permits.
- Optional soft lock prioritizes enemies inside a view/range cone without imprisoning the camera.
- Define air control, gravity, maximum fall speed, ledge behavior, and landing ownership centrally; jumping must not become flight or bunny-hop speed tech.
- Skills explicitly declare `ground`, `air`, or `both`; unavailable airborne actions buffer safely instead of silently failing.
- Swordfighter `Q — Windstep Sever` and `2 — Skyward Fang`, plus Technician `Q — Ion Vector` and `2 — Cyclone Drive`, must each have functional airborne behavior during a jump.
- Airborne attacks preserve readable momentum and return to a valid fall/landing state after recovery.
- Both classes share camera quality, movement responsiveness, dodge safety, hit rules, input buffering, cooldown feedback, and recovery depth; class choice never removes a core feature.
- Hits require spatial hitboxes, team filtering, one hit ID per swing/cast stage, and explicit range.
- Combat is fast, cancelable, and forceful, never floaty or animation-locked.
- Hit feedback layers a short hit stop, restrained camera impulse, enemy reaction, VFX, and spatial audio.
- Camera impulse remains short and bounded; no persistent nausea-inducing shake.

TWO FIXED NINE-SKILL KITS

SWORDFIGHTER — `SPIRIT`

- `Q — Windstep Sever`, cooldown 5 s, `both`: directional ground/air dash with full-body cut, sampled sword trail, afterimage, and measured contact.
- `E — Moon Guard`, cooldown 8 s, `ground`: brief parry; success creates a radial counter arc and strong stagger, failure only a short guard.
- `R — Tempest Wheel`, cooldown 10 s, `ground`: controlled spinning slash, readable ground ring, and light gather.
- `1 — Crescent Wave`, cooldown 6 s, `both`: broad low sword arc ending at true collision/range; airborne aim pitch is safely bounded.
- `2 — Skyward Fang`, cooldown 9 s, `both`: ground launch branch and deliberate airborne descending fang share one cooldown/damage policy.
- `3 — Phantom Blades`, cooldown 14 s, costs Spirit, `both`: three delayed blades each own origin, flight, contact, and impulse.
- `4 — Storm Domain`, cooldown 18 s, costs Spirit, `ground`: bounded authored zone of pulsing cuts and wind lines; no rectangular carrier.
- `5 — Heaven Splitter`, cooldown 35 s, requires full Spirit, `ground`: huge vertical sword arc with short preparation, contact core, halo, directional arc, sparks, ground scar, and pressure ring; strongest single cleave without obscuring the screen.
- `6 — Thousandfold Horizon`, cooldown 45 s, requires full Spirit, `ground`: broad telegraphed sector, full-body multi-cut convergence, and one horizon-cleaving final AoE; regular enemies gather, bosses resist pull.

ELEMENTAL TECHNICIAN — `CORE CHARGE`

- `Q — Ion Vector`, cooldown 5 s, `both`: vector-nozzle ground/air dash with ion wake and one measured gauntlet contact.
- `E — Pyroclast Orb`, cooldown 6 s, `both`: reactor-charged plasma fireball detonating at true collision into broad fireburst and short material-specific burn field.
- `R — Cryo Bastion`, cooldown 10 s, `ground`: curved thick ice wall grown from valid anchors; briefly blocks light enemies/projectiles, never traps bosses, spawns, exits, or player, then fractures from pools.
- `1 — Thunder Grid`, cooldown 11 s, `ground`: three Tesla pylons chain capped lightning through a readable area and culminate in one radial thunder impact.
- `2 — Cyclone Drive`, cooldown 9 s, `both`: ground turbine vortex launches player/light enemies; airborne branch descends as a steerable pressure spear and wide wind ring.
- `3 — Magma Rail`, cooldown 13 s, `both`: induction lance drives a finite molten-mineral eruption corridor to a measured endpoint; water becomes steam and cooling rock.
- `4 — Zero-Point Blizzard`, cooldown 17 s, `ground`: large irregular frost field slows regular enemies, primes brittle reactions, and ends in an inward ice fracture; boss slow is capped.
- `5 — Elemental Overdrive`, cooldown 24 s, costs Core Charge, `ground`: four staged AoEs—wind gather → lightning grid → frost lock → plasma eruption—with separate contacts and reactions.
- `6 — Event Horizon Engine`, cooldown 45 s, requires full Core Charge, `ground`: containment lenses form a bounded micro-singularity effect; regular enemies/debris spiral inward before collapse and shockwave, bosses resist pull but take capped hits.

- Technician skills are intentionally overpowered against groups through huge authored AoE, chain reactions, and crowd control, while telegraphs, boss rules, target visibility, pooling, and hard caps remain clear.
- Skill names and causal roles are parity anchors; do not replace them with generic recolored circles.
- Cooldowns, resources, damage, control, input context, air/ground permissions, VFX roles, and map-contact roles live in one class-skill definition source consumed by UI, combat, animation, AI, audio, and map response.

CLASS COMBAT VFX RESEARCH, LAYERING, AND AUDIO

- Before implementation, inspect the strongest relevant local combat/VFX examples and current first-party engine documentation for trails, transparent sorting, HDR, pooling, depth, volumetric fields, distortion, and shader ownership.
- Study blade arcs, elemental projectiles, ice walls, lightning fields, wind funnels, large AoE, and gravity effects as motion/readability references; recreate principles, never assets or proprietary designs.
- Every effect follows Cause → Travel/Motion → Contact → Reaction → Decay and is judged from gameplay camera distance.
- Origins come from real sword, gauntlet, reactor, drone, foot, target, or validated ground anchors.
- Sword attacks layer depth-writing mass, HDR edge core, sampled ribbon, directional arc, restrained halo, contact flash, material debris, wind/distortion, pooled light, ground response, enemy reaction, hit stop, camera impulse, and spatial audio.
- Technician attacks layer visible device ignition/recoil, element-specific core, projectile/beam/wall/field travel, authored AoE boundary, measured contacts, material debris/vapor/frost/embers/ion sparks/pressure dust, capped light/distortion, map/enemy reaction, spatial audio, and technology-specific decay.
- Fireballs carry plasma mass, flame sheath, wake, collision burst, heat light, scorch/steam, and cooling decay.
- Ice walls are depth-writing temporary structures with growth, thickness, footing, collision, cracks, timed fracture, and pooled cleanup—not blue planes.
- Lightning areas expose pylons/emitters, branch to valid targets, light contacts, and visibly ground; no random screen bolts.
- Wind shows pressure through directional debris, condensation, ribbons, and enemy motion; carrier geometry stays hidden.
- Event Horizon shows containment lenses and bounded accretion before collapse; distortion never hides telegraphs, targets, or arena.
- Assign primary, support, contact, and decay roles rather than maximizing every layer.
- Sample real weapon/emitter motion; width, field radius, brightness, and lifetime follow attack phase, not generic global time.
- Physical mass writes depth; halos and light may blend additively. Reject flat carrier planes, rectangular silhouettes, texture cutoffs, bloom-only shape, and effects detached from class anchors.
- Pool trails, projectiles, field volumes, ice-wall pieces, lights, scars, and debris; prewarm first-cast variants for both classes.
- Audio layers preparation, body/device motion, release, travel, material contact, low impact, and decay.
- Music begins restrained, intensifies for elites/bosses, and loops endlessly without an audible seam.

WORLD RESPONSE TO MOVEMENT AND BOTH CLASS KITS

- Damage, timing, range, cooldown, and control remain identical across map styles and materials.
- One `WorldImpactEvent` carries stable event/class/skill/world IDs, final contact, normal, direction, footprint, strength, duration, element/material roles, and air/ground context.
- Create it at real weapon, projectile, emitter, foot, landing, or ground contact; rendering, map response, particles, light, and audio consume that same contact.
- Response is cosmetic by default; temporary Cryo Bastion collision is a separate bounded skill object.
- Skyglass supports chips, dust, fractures, heat, frost, grounding, wakes, and steam; Verdant supports torn moss, soil compression, leaves, roots, char, frost, and wind pressure.
- Movement contacts stay subtle and bounded.

SWORDFIGHTER MAP CONTACTS

- `Q`: directional cut near valid surfaces; none while fully airborne. `E`: successful counter ring only. `R`: irregular tangential cuts.
- `1`: trail ends at true endpoint. `2`: takeoff wedge plus measured landing mark. `3`: one notch per blade.
- `4`: bounded crossing cuts. `5`: deep finite groove. `6`: decorative cuts converge into one capped sector mask and final horizon scar.

ELEMENTAL TECHNICIAN MAP CONTACTS

- `Q`: ion/pressure wake near valid surfaces. `E`: radial heat/scorch or water steam. `R`: temporary frost/compression footing under wall.
- `1`: three pylon contacts plus capped target grounding. `2`: separate takeoff and landing pressure contacts.
- `3`: finite heat/displacement corridor to true endpoint. `4`: bounded irregular frost field. `5`: four element contacts inside one authored event family.
- `6`: bounded inward compression and one final annular fracture; all debris remains pooled.

- Event writes are idempotent; residues use fixed capacity/window/chunks and discard low-priority marks under load.
- Ultimates last longest, footsteps shortest; `Restart World`, retry, class change, and world selection clear residues and temporary objects deterministically.
- Beauty, depth/prepass, and shadow consume the same visible geometry response.
- Debug data exposes contacts, class/skill IDs, occupancy, dropped writes, element/air context, temporary objects, and reset revision; visual checks happen only after a coherent integrated build exists.

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

- Execution profile `orchestrated`: one integration owner keeps coupled architecture and shared state, while sub-agents own disjoint tracks for worlds/lighting, characters/combat/VFX, gameplay/UI/audio, and performance/accessibility. Each sub-agent returns changed files, evidence, risks, and unresolved gaps; only the integration owner merges decisions and performs the complete regression review.
- Order: product/class contract → Game Host → primary map → shared rig/movement → Swordfighter slice → Elemental Technician parity → enemies/waves → second world → lighting/performance → final pass.
- Technician is not stretch content; both complete classes belong to the playable path.
- Complete targeted VFX research before class effects and retain only product-relevant decisions.
- Inspect real ownership, data flow, registrations, limits, class/resource state, air/ground state, reset, and static gates after coherent cuts; fix the largest evidenced gap.
- This prompt grants current permission for agent-driven browser, screenshot, gameplay, and performance checks of the final integrated build. Establish the acceptance viewport first: maximize the preview, center and keep the active character visible, hide debug overlays, show the reference large enough to judge, and capture representative movement, skill, enemy, boss, and world states.
- Visible quality, combat feel, class parity, and measured runtime remain honest manual gates without it.

PERFORMANCE AND GATES

- Target stable 60 FPS on defined hardware; never claim FPS without measurement.
- Report frame times, draw calls, triangles, enemies, particles, field volumes, and shadow cost only from an allowed run.
- Instantiate only selected hero rig/active class pools; instance repeated world/enemy forms.
- No per-frame geometry/material creation, unbounded arrays, or React state in render loop.
- Pool enemies, projectiles, hits, VFX, trails, scars, audio, lights, ice fragments, elemental fields, and gravity debris.
- Extreme Technician AoE uses fixed slots, batching/instancing, capped chains, and bounded field writes.
- Remove distant/secondary cost before selected-class readability.
- Static gates verify TypeScript, deterministic maps, ground parity, safe spawns, exactly two complete class definitions, nine skills/class, resource and air/ground rules, movement/dash/aerial transitions, finite uniforms, disposal, pool/chain/field caps, temporary-object cleanup, reset, and beauty/depth/shadow parity.
- Use the granted visual-review scope for targeted final-product evidence; avoid disposable tests or unrelated test configuration.

DELIVERY ORDER

1. Understand rules, repository, and references.
2. Build shared Game Host, state flow, and world/class selection.
3. Build closed WorldSpec contract, staged AEON bake, and InteractionField foundation.
4. Build Skyglass as the complete Ashen-Coast-style AEON vertical slice.
5. Integrate voxel player, jump/dodge/dash, base combat, and camera.
6. Integrate both nine-skill class kits, researched sword/elemental VFX, audio, and shared skill bar.
7. Integrate enemy rigs, AI, spawn, and endless waves.
8. Build Verdant as the second independent spec in the same local AEON engine.
9. Close lighting, material separation, performance, and edge cases.
10. Bundle static/numeric gates and hand visible acceptance to the user.

DONE WHEN

- Start screen selects exactly Skyglass or Verdant plus Swordfighter or Elemental Technician and starts directly.
- Both maps use the same local Ashen-Coast-style AEON engine and differ through specs, sites, fields, and material profiles.
- Swordfighter, Elemental Technician, and enemies are premium voxel rigs with articulated full-body ground and aerial animation.
- Both classes have jump, separate dodge, ground/air `Q` dash, and a functional aerial `2` branch without broken states.
- Each class has nine complete skills on `Q E R 1 2 3 4 5 6` with cooldowns, resource rules, attached full-body animation, layered VFX/audio, and measured hits.
- Endless waves, elites, and bosses run without unbounded growth.
- Movement and all 18 class skills produce material-correct, bounded, fully resettable map responses.
- Enemies visibly assemble in the arena center and activate only after assembly.
- World light, sword layers, elemental fields, materials, targets, telegraphs, and tone mapping remain readable.
- Every player-facing string is English and UI stays compact around start plus combat values.
- Static/numeric gates are green; visible combat feel remains honestly marked for user acceptance.

BOUNDED FINAL SUB-AGENT QUALITY REVIEW

- Fan out the independent tracks above, then use one independent critic to review the integrated Three.js game rather than isolated parts.
- Judge Black Desert only for combat responsiveness, full-body force, impact clarity, and layered but readable skill spectacle. Judge Ghost of Tsushima only for katana weight, samurai motion, world composition, and atmospheric environmental craft. Copy no asset, branding, character, map, UI, audio, lore, or proprietary design.
- Judge Skyglass and Verdant identity, composition, materials, lighting, and atmosphere directly against their supplied target-repository concept images listed above. The game must translate those references into its own playable voxel construction instead of copying or ignoring them.
- The critic returns the single strongest concrete gap with evidence and an owner. Route it to that owner, integrate one coherent correction, and rerun the bundled static/regression gates. Run another critic pass only after a material change or a new concrete question—never as an automatic per-camera, per-phase, or endless screenshot loop.
- Never invent approval, a visual win, or measured performance. If a fair review of the built game and lawful references cannot run, leave it as an explicit user acceptance gate.
```