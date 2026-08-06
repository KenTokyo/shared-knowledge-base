# Voxel Style — Authored Modular Voxel Worlds

**Use:** Copy the complete fenced block and execute it as a standalone game-build request in the target repository.
**Constant:** Game, two playable classes, nine skills per class, combat, enemies, waves, spawn, audio, UI, and English-only player-facing language match the two sibling long prompts.
**Only comparison area:** Map construction, map rendering, map-light coupling, and visible movement/skill residues.
**Map focus:** Authored voxel modules, local world builders, batched surfaces, and bounded reaction chunks.
**Visual verification:** Do not start automated browser, screenshot, gameplay, or FPS verification without an explicit current user request.

```text
CREATE SKYGLASS & VERDANT ENDLESS VOXEL SLASHER — VOXEL STYLE MAPS

MISSION AND QUALITY BAR

Build a completely new, immediately playable third-person browser hack-and-slash. The game has exactly two selectable compact worlds, two complete voxel hero classes—a Swordfighter and a technology-based Elemental Technician—endless enemy waves, premium MMORPG-grade abilities, and a minimal start flow.

Reach premium modern action-RPG responsiveness, full-body animation weight, impact clarity, and layered spectacle while creating an original voxel identity. Do not copy assets, characters, effects, UI, audio, maps, or proprietary content from another product.

World quality must achieve strong composition, material separation, lighting, atmosphere, and traversable depth from the written world briefs below. Character construction must use clearly separated body segments, real joint pivots, readable full-body motion, and spatially attached weapons and VFX.

Portability rule: this prompt is the complete reference. Do not inspect, name, or depend on any source project, benchmark repository, versioned map, local machine path, or fixed internal asset path. Use the target repository's existing renderer, language, ownership, and build system. Translate shaders, render targets, storage buffers, post-processing, audio, bakes, and caches into equivalent host-stack mechanisms; never import foreign APIs or finished source code.

Use the two text briefs as art direction and a quality bar, never as flat scenery. The result must function as a real 3D game.

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
   - two large world cards with a generated world preview or representative in-game thumbnail and English name,
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

AUTHORED MODULAR VOXEL WORKSPACE — MAP ARCHITECTURE

1. Build Skyglass and Verdant as two independent authored voxel workspaces under one small shared map-host contract. Everything needed to reproduce this approach is defined here; no external map code is required.
2. Deliberately place faceted volumes and readable material blocks; reject Minecraft grids, random cube terrain, and cube shells over unrelated smooth geometry.
3. Each map owns one isolated `AuthoredWorkspace` or equivalent and a deterministic `build(seed)` entry point.
4. Split the workspace into separate authored hotspots: entrance, central arena, primary landmark, side route, water feature, secondary encounter pocket, and distant silhouette band.
5. Each hotspot owns a local coordinate frame, explicit world bounds, geometry/material batches, ground and blocker data, player/enemy/boss anchors, lights/audio emitters, and optional reaction chunks.
6. Connect hotspots through deliberately graded routes and shared world addressing; they may be built independently but must read as one traversable world without seams or disconnected diorama islands.
7. `build(seed)` returns:
   - batched voxel/wedge/slab families,
   - a few hero surfaces for silhouettes modules cannot carry,
   - `playfield` queries for ground height, normal, material role, water, arena, boundaries, and blockers,
   - camera, lighting, fog, post-processing, and audio profiles,
   - player, enemy, boss, VFX, and ambient anchors,
   - local bounded map-response ownership.
8. Shared helpers remain neutral: deterministic seed/math, primitive generators, greedy meshing or instance batching, host contracts, impact data, bounds, and disposal.
9. Use the seed for reproducible secondary variation only; composition, routes, landmark placement, arena shape, water, and safe exits stay explicitly authored.
10. Build ground from terraces, ramps, slabs, wedges, retaining walls, and coherent voxel clusters; traversal stays smooth enough for fast combat.
11. Visible ground and `groundHeightAt(x,z)`/material queries share one final source; collision and gameplay never reconstruct a second approximate floor.
12. Skyglass uses pale stone masses, dark metal/wood modules, turquoise water, restrained gold inlays, large arches, and palace rhythms rather than tiny tile noise.
13. Verdant uses dark earth/rock masses, layered root volumes, warm timber modules, grouped foliage, and deliberately authored Titan-tree silhouettes.
14. Instance repeated modules by shape/material or merge them into static batches; never create one mesh, draw call, or UI-framework element per voxel.
15. Keep unique hero geometry separate only when its silhouette, traversal, or material behavior cannot be represented by the module families.
16. Partition render work by hotspot or spatial chunk. Compute tight bounding boxes/spheres after final transforms, then apply frustum culling per batch instead of treating the whole map as one always-visible object.
17. Use LOD only for distant architecture, foliage, or silhouette carriers whose projected size justifies a cheaper form; avoid open-world streaming machinery for a compact fully resident map.
18. Track cost as `visible batches × material families × LODs × beauty/shadow/depth passes`, not as raw voxel count alone.
19. Dynamic map response uses a small capped state atlas or sparse cell deltas per visible surface chunk:
   - height/edge offset for real notches and raised rims,
   - fracture/compaction state for material response,
   - wet/frozen/burned/exposed state where relevant,
   - loose fragments from fixed pools,
   - dirty queue with a hard per-frame work budget.
20. One impact updates only touched cells and queues only dirty chunks; never remesh the complete workspace or scan every hotspot per hit.
21. Deep scars may alter local vertices or displacement; micro traces remain normal/roughness/albedo response when their projected size does not justify geometry.
22. Surface chunks share world-space addressing and border samples so cuts, wakes, and frost never stop at batch or hotspot seams.
23. Water, stairs, doors, arena axes, parapets, spawn routes, and exits remain authored safe forms; cosmetic residues never break traversal or navigation.
24. One Environment source owns direct light, sky/ambient fill, fog, wind, shadows, exposure, and grade. All hotspot materials, water, vegetation, skill lights, and post effects consume it.
25. Use a small PBR material-role set with consistent world scale, readable roughness/value separation, contact AO, and triplanar or world-space projection where top-only UVs would smear steep forms.
26. HDR skill/spawn lights come from fixed pools; bloom supports bright cores, tone mapping protects world materials, and post-processing never substitutes for geometry or light direction.
27. World audio consumes the same environment and impact events as visuals: authored ambient zones crossfade by position, while material contacts choose bounded spatial layers from the true hit.
28. The whole compact map may remain loaded; chunks organize culling, reaction updates, shadow cost, and ownership rather than pretending to be an endless streamed world.
29. Derive budgets from target hardware and real combat load; report visible instance families, static batches, reaction chunks, shadow casters, lights, and post passes separately.
30. Reset, retry, and world change clear reaction state, dirty queues, transient lights/audio, and pooled fragments deterministically without rebuilding immutable workspace geometry.
31. Under load, drop distant detail, low-priority fragments, shadow density, and reaction microdetail before landmark silhouette, playfield truth, skill readability, or safe routes.
32. Visual target: a handcrafted premium voxel world with large readable masses, connected authored hotspots, traversable depth, coherent light, and visible combat history—not a procedural block desert.

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
- Debug data exposes contacts, class/skill IDs, occupancy, dropped writes, element/air context, temporary objects, and reset revision; no browser checks without permission.

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

- Execution profile `linear`: one integration owner understands this complete contract and the target repository, builds the full product, and keeps coupled decisions in one context; no subagents or parallel architecture.
- Order: product/class contract → Game Host → primary map → shared rig/movement → Swordfighter slice → Elemental Technician parity → enemies/waves → second world → lighting/performance → final pass.
- Technician is not stretch content; both complete classes belong to the playable path.
- Complete targeted VFX research before class effects and retain only product-relevant decisions.
- Inspect real ownership, data flow, registrations, limits, class/resource state, air/ground state, reset, and static gates after coherent cuts; fix the largest evidenced gap.
- Never start agent-driven browser, screenshot, gameplay, or FPS checks without current permission.
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
- Do not add browser, screenshot, or gameplay tests without explicit request.

DELIVERY ORDER

1. Understand rules, repository, and references.
2. Build shared Game Host, state flow, and world/class selection.
3. Build voxel modules, batches, playfield, and capped response state.
4. Build Skyglass as the complete vertical slice.
5. Integrate voxel player, jump/dodge/dash, base combat, and camera.
6. Integrate both nine-skill class kits, researched sword/elemental VFX, audio, and shared skill bar.
7. Integrate enemy rigs, AI, spawn, and endless waves.
8. Build Verdant as the second independent voxel world.
9. Close lighting, material separation, performance, and edge cases.
10. Bundle static/numeric gates and hand visible acceptance to the user.

DONE WHEN

- Start screen selects exactly Skyglass or Verdant plus Swordfighter or Elemental Technician and starts directly.
- Both maps use the same host contract but own independent voxel builders and response chunks.
- Swordfighter, Elemental Technician, and enemies are premium voxel rigs with articulated full-body ground and aerial animation.
- Both classes have jump, separate dodge, ground/air `Q` dash, and a functional aerial `2` branch without broken states.
- Each class has nine complete skills on `Q E R 1 2 3 4 5 6` with cooldowns, resource rules, attached full-body animation, layered VFX/audio, and measured hits.
- Endless waves, elites, and bosses run without unbounded growth.
- Movement and all 18 class skills produce material-correct, bounded, fully resettable map responses.
- Enemies visibly assemble in the arena center and activate only after assembly.
- World light, sword layers, elemental fields, materials, targets, telegraphs, and tone mapping remain readable.
- Every player-facing string is English and UI stays compact around start plus combat values.
- Static/numeric gates are green; visible combat feel remains honestly marked for user acceptance.
```
