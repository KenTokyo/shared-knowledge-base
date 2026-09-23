# Aetherfield: Last Harvest — Gameplay Build Prompt

**Use:** Copy the complete fenced block as a standalone core-game implementation request.
**Scope:** Runtime host, world, camera, player, weapons, build, quiz, enemies, waves, VFX, audio, performance.
**Visual references:** Use the ten local `assets/` images as bounded art direction.

```text
CREATE AETHERFIELD: LAST HARVEST — COMPLETE GAMEPLAY AND WORLD

MISSION

Build a complete original browser action tower-defense shooter quiz in a warm handcrafted 3D farm.
The player must physically move, aim, shoot, build, repair, answer, and defend.
The farm must begin sparse and become an authored defensive settlement through play.
The game must be immediately playable, readable, responsive, and replayable.
It must not feel like a static tower-defense board, empty Three.js demo, generic survival arena, or quiz app.
Use the host project's existing renderer, language, build system, input, audio, ownership, and tests.
Create one game runtime only.
Create no second world, renderer, gameplay host, input manager, camera runtime, audio graph, or recursive frame loop.
Build original assets and designs.
Copy no proprietary map, character, weapon, tower, enemy, sound, VFX, UI, logo, or lore.

QUALITY BAR

Gun response should carry premium modern shooter immediacy and weight.
World composition should carry cinematic natural clarity and strong foreground-middle-background depth.
Tower-defense readability should expose lane, range, target, contact, and consequence at a glance.
Voxel-like characters should use real articulated full-body motion rather than sliding blocks.
VFX should carry physical cause and material response rather than colored transparency alone.
Audio should separate preparation, release, travel, contact, low body, spatial tail, and decay.
These are quality traits, not permission to recreate any known product.

REFERENCE SET

- `assets/00-title-start.png`: overall identity and two classes.
- `assets/01-wave-one-farm.png`: initial density, camera, route, Core, combat scale.
- `assets/02-build-mode.png`: physical placement, facing, range, route legality.
- `assets/03-quiz-event.png`: Core and four physical answer pylons under threat.
- `assets/04-defense-family.png`: six structure silhouettes and material family.
- `assets/05-classes-weapons.png`: articulated heroes and weapon/device language.
- `assets/06-upgrade-interface.png`: physical field bench context.
- `assets/07-boss-wave.png`: maximum integrated combat readability.
- `assets/08-wave-thirty-endgame.png`: fully earned farm transformation.
- `assets/09-future-maps.png`: only future biome direction; ship Map 1 first.
Treat images as visual targets, not pre-rendered surfaces.
The final runtime must render real geometry, materials, lighting, animation, particles, and UI.

FIRST READ

- A working farm is visible before defenses.
- The pale stone Quiz Core is the central protected landmark.
- One open gate-to-Core route is immediately legible.
- The selected hero is a small but readable active participant.
- Towers and traps show role through silhouette.
- Enemies visibly advance along valid ground.
- Ballistic and elemental contacts have distinct physical results.
- The four answer pylons are recognizable without a quiz event.
- Early and late farms look like one place at different earned stages.

OWNERSHIP

- Host runtime owns the single world, camera set, input routing, audio graph, and frame loop.
- Player owner controls movement, aim, weapons, class resources, and exactly three equipped skills.
- Build owner validates placement, route continuity, construction, repair, upgrade, and sell commands.
- Wave owner schedules gates, enemies, bosses, preparation, wave completion, and Endless cadence.
- Quiz owner publishes one question, four answers, resolution, reward, and failure threat.
- UI reads authoritative state and issues commands; it never simulates gameplay truth.
- Reset tears down every subscription, pooled object, spatial voice, timer, and transient effect once.

PRODUCT SCOPE

- One complete initial map: `AMBERSTEP FARM`.
- Map footprint approximately 140 × 110 metres.
- One local player.
- Two selectable classes: Field Ranger and Elemental Technician.
- Thirty authored waves plus optional Endless.
- Three bosses at waves 10, 20, and 30.
- Eight regular enemy species.
- Six persistent structures and five traps.
- Four free onboarding weapons and four premium earned weapons.
- Four physical quiz answers.
- Maximum three active abilities per class.
- No network required.
- No quest campaign, dialogue tree, crafting survival, base hunger, or open-world map.
- No fourth map promise.

WORLD — AMBERSTEP FARM

- Shape the map as four irregular farm plots around a central stone archive terrace.
- Place the Quiz Core on the terrace with a nine-metre protected radius.
- Place four answer pylons around the Core at stable compass-like offsets.
- Use two enemy gates initially, expanding to four by late game.
- Create broad S-curve lanes through crops, orchard, irrigation, and sheds.
- Keep the minimum navigation corridor at two metres.
- Use low fence breaks and gates for player traversal.
- Use terraces and drainage for depth without blocking tactical reading.
- Include one windmill, one orchard ridge, one irrigation wheel, and one field workshop as landmarks.
- Keep skyline calm: rolling hills, distant grain, sparse trees, no giant fantasy city.
- Use authored prop clusters around working functions.
- Keep combat lanes clear of decorative clutter.
- Prevent camera collision with sheds, trees, and tall towers.
- Prevent actors from walking through fences, Core, towers, workshop, rocks, and water boundaries.
- Ground every object from the same finished terrain truth.
- Use bounded cosmetic ground response without changing navigation height.

MATERIAL AND LIGHT

- Timber has grain, joinery, wear, and soil contact.
- Pale stone has chipped edges, dust, and stable midtone.
- Brass has controlled roughness and oxidation; it is never mirror gold.
- Blue ceramic has thickness, glaze variation, and believable fractures.
- Crops use species variation, clumps, height bands, and layered wind.
- Cloth uses restrained movement and readable weave.
- Water reflects light without becoming a mirror sheet.
- Main light is warm sun.
- Sky and shadows carry cool fill.
- Aether cyan remains local to active mechanisms.
- Use crisp contact shadows near gameplay and cheaper distant shadowing.
- Preserve highlights and shadow detail through tone mapping.
- Avoid uniform ambient light, crushed shadows, excessive bloom, and milky fog.

CAMERA

- Elevated three-quarter perspective camera.
- Pitch range target 52–58 degrees.
- Maintain perspective; do not use orthographic projection.
- Hero ordinary frame height target 7–10%.
- Follow position smoothly with limited dead zone.
- Aim cursor shifts framing slightly toward target direction.
- Zoom supports tactical near/far bounds without revealing outside world gaps.
- Rotate only if the world and controls fully support it; otherwise use authored fixed azimuth.
- Camera collision raises or shortens safely around obstacles.
- Combat impulse is short, directional, and capped.
- Explosion shake respects distance and accessibility scale.
- Build mode stabilizes the camera and exposes candidate footprint.
- Quiz mode does not cut to another camera.
- Boss introductions use a brief bounded framing move, then return control.
- Never obscure Core or player behind tall foreground vegetation.

INPUT

- WASD or left stick moves camera-relative.
- Mouse or right stick aims independently.
- Primary fires weapon or gauntlet.
- Secondary aims, charges, or uses weapon-specific alternate.
- Reload has an explicit action.
- Dodge has an explicit action with short readable invulnerability.
- Interact answers, uses bench, repairs, and confirms context.
- Build toggles an exclusive input context.
- Build slots use 1–6 or controller radial selection.
- Three class abilities use Q, E, F or remapped equivalents.
- Weapon swap never collides with build-slot context.
- Input buffering covers reload end, dodge recovery, and ability recovery.
- Focus loss pauses solo simulation and clears fire/aim edges.
- Pointer lock and focus restore only from deliberate input.
- All bindings are remappable through the host.

PLAYER BODY AND MOVEMENT

- Use a compact articulated voxel-like rig, not a single block figure.
- Include root, pelvis, chest, head, shoulders, elbows, wrists, hips, knees, ankles, hands, feet.
- Place pivots at real joints.
- Evaluate each actor pose once per frame.
- Attach weapon, muzzle, shell, hand, drone, gauntlet, foot, and hit anchors to rig bones.
- Locomotion includes idle, walk, run, strafe, sprint, dodge, hit, stagger, knockdown, defeat, victory.
- Feet plant against the ground.
- Hips and chest counter-rotate.
- Aim influences upper body within safe limits while legs preserve locomotion.
- Dodge has anticipation, travel, recovery, and one clear invulnerability window.
- Do not permit bunny-hop speed tech.
- Maintain collision against world and defenses.
- Never let animation move actors through blocking geometry.

FIELD RANGER

- Silhouette: indigo field jacket, pale segmented armour, brass tool pack, compact firearm.
- Passive `Focus`: accurate hits fill a meter.
- Full Focus briefly improves recoil recovery and reload handling.
- Ranger uses ballistic weapons at full efficiency.
- Primary weapon motion includes shoulder seat, muzzle climb, hand response, magazine weight, recovery.
- Equipped abilities are chosen from six but exactly three are active.
- `Frag Line`: throw a directional fragmentation charge with visible arc and bounded blast.
- `Repair Drone`: deploy a timed drone to repair nearby structures, never Core during combat.
- `Suppression Beacon`: marked zone reduces regular enemy attack rate with boss cap.
- `Dash Vault`: directional evasive vault over low fence breaks.
- `Armour Break`: next measured hit exposes armour for a short duration.
- `Rally Pulse`: short reload and tower tracking boost inside a bounded radius.
- Every ability declares cooldown, cost, range, target rule, effect cap, VFX, audio, and cleanup.

ELEMENTAL TECHNICIAN

- Silhouette: ceramic gauntlets, aether canisters, short coat, survey drone.
- Passive `Core Charge`: elemental contacts fill a meter.
- Technician primary is an articulated emitter pulse with readable recoil.
- Premium elemental weapons receive class efficiency.
- Equipped abilities are chosen from six but exactly three are active.
- `Fire Orb`: dense projectile, flame sheath, collision burst, bounded burn response.
- `Frost Wall`: curved thick temporary wall from valid anchors; cannot close last route.
- `Thunder Grid`: three grounded nodes chain through capped targets.
- `Wind Step`: directional dash with dust, crop pressure, and one contact.
- `Magma Rail`: finite heated mineral corridor to a true endpoint.
- `Gravity Well`: bounded pull for regular enemies; bosses resist displacement.
- Device chain is always visible: canister charge → emitter → travel/field → contact → response.
- No staff, robe casting, unexplained hand glow, or recolored generic circle.

WEAPON SYSTEM

- Wave 1 grants a semi-automatic sidearm.
- Wave 3 grants a balanced automatic carbine.
- Wave 5 grants a close scattergun.
- Wave 7 grants a precision burst rifle.
- If slots are full, offer one of two explicit replacements.
- No automatic weapon grants after wave 7.
- Premium earned weapons unlock for Gold from wave 8 onward.
- Laser repeater uses heat and sustained precise contact.
- Arc caster uses capped chains and lower single-target damage.
- Rail lance charges a finite penetration line.
- Cryo projector uses a short physical cone and brittle setup.
- Every weapon has five deterministic levels.
- Upgrade branches change real definitions, visuals, and sound where appropriate.
- One definition source owns ammo, heat, damage, rate, reload, recoil, spread, range, and cost.
- Hits use spatial queries, team filter, one hit ID per shot/pellet/event, and valid line of sight.
- Projectiles and hits are pooled.
- No hitscan through opaque structures.

SHOOTER FEEL

- Fire begins on valid input without animation latency.
- Anticipation remains only for charged or heavy weapons.
- Recoil combines weapon motion, aim displacement, sound, muzzle gas, and short camera impulse.
- Recoil pattern is learnable and bounded.
- Reload exposes magazine out, magazine in, chamber/ready, and interrupt policy.
- Shot contact layers flash, material debris, enemy reaction, hit marker/audio, and decay.
- Head/weak-point response is clear but restrained.
- Damage numbers are optional and pooled.
- Scattergun pellets aggregate feedback instead of producing unreadable spam.
- Impacts differentiate soil, stone, wood, metal, water, flesh, armour, and shield.
- Audio uses spatial distance, obstruction if supported, voice limits, and deterministic variation.

BUILD SYSTEM

- Preparation permits full build and repair.
- Combat permits build at increased risk and reduced sell return.
- Candidate placement raycasts the finished terrain.
- Placement reports exactly one reason: core, gate, slope, water, occupied, route, range, stock, valid.
- Validate all active gates before accepting fence or Frost Wall.
- Preview range, footprint, direction, connection, and total cost.
- Placement is serverless/local atomic: validate → spend → spawn.
- Failure spends nothing.
- Selling uses structure identity and returns defined Gold.
- Repair uses missing health and exact cost.
- Defeat/restart clears all structures, traps, previews, routes, and subscriptions deterministically.

STRUCTURES

- Fence: route control, player gate, three visible tiers.
- Sentry: line-of-sight ballistic tower with visible feed and recoil arm.
- Mortar: delayed AoE with minimum range and ground warning.
- Arc Coil: three-prong capped chain tower.
- Frost Fan: directional slow with low damage.
- Repair Beacon: pulses repairs to nearby structures, not Core during waves.
- Every structure has base, collider, health, targeting, damage/control, upgrade, sell, repair, VFX, audio.
- Tier 2 adds a physical module and one primary improvement.
- Tier 3 branches into exactly two authored specializations.
- Target priorities are First, Last, Strongest, Weakest, Core Threat.
- Towers require line of sight except arcing Mortar.
- Tower shots use fixed pools and prewarmed materials.

TRAPS

- Snare Grid roots one capped group and exposes armour briefly.
- Thunder Mine bursts armour in a visible trigger cone.
- Ember Trench creates a short narrow burn lane.
- Pressure Ram pushes along an authored direction and respects boss bounds.
- Decoy Totem redirects regular enemies only and expires visibly.
- Traps consume inventory stock.
- Trigger and effect are deterministic.
- Repeated contacts do not double-apply one event ID.
- Cleanup returns every visual, collider, audio voice, and light to its pool.

QUIZ CORE

- Core begins with 1,000 health on Standard.
- Core safe radius is nine metres.
- Core receives enemy damage from measured attacks.
- Core does not regenerate during combat.
- Between waves it regenerates 4% maximum health, capped at the prior-wave start value.
- Gold repair can restore to full outside combat.
- Four answer pylons are real world objects with collision and readable faces.
- Quiz starts after waves 2, 5, 8, then every three waves.
- Question draw is seeded and no-repeat until exhaustion.
- Exactly four answer choices exist.
- Shooting or interacting resolves one active choice.
- Answer window is 15 seconds.
- Timeout keeps the same question active and requests a small pressure group.
- Correct grants Insight, next-wave Gold bonus, and one of three run buffs.
- Wrong adds one bounded threat tier and pauses Core shield recovery for 20 seconds.
- All results emit one authoritative event consumed by UI, audio, waves, and progression.
- Pylons never create another camera, scene, renderer, or update loop.

ENEMIES

- Grunt: fast basic melee attacker.
- Shieldbearer: frontal guard with exposed flank/recovery.
- Burrower: bypasses one fence segment with ground warning.
- Spitter: ranged projectile with line of sight.
- Harvester: steals loose Gold and tries to escape.
- Warden: buffs nearby regular enemies until interrupted.
- Siege Brute: prioritizes structures with heavy telegraphed swings.
- Flyer: follows an air corridor and can be grounded.
- Give each a distinct silhouette, height, movement, range, telegraph, counter, and death response.
- Do not create role differences through color alone.
- Use navigation that respects structures, water, slopes, gates, and dynamic fences.
- Enemies never spawn inside player, Core, towers, traps, or blocked route.
- Enemies never attack through opaque geometry.
- Repath is scheduled and bounded rather than run for every enemy every frame.
- Active regular enemy target cap is 48 after measurement.

WAVES AND BOSSES

- Waves 1–30 form an authored difficulty arc.
- Preparation follows each clear.
- Early-start grants visible Gold based on unused time.
- Wave budget owns count, mix, gates, elite traits, and spawn cadence.
- Difficulty grows through composition and mechanics before raw health.
- Speed caps at 1.35× baseline.
- Attack rate caps at 1.30× baseline.
- Wave 10 boss is Gatebreaker Colossus.
- It tests route resilience, fence repair, and heavy weak points.
- Wave 20 boss is Fourfold Oracle.
- It corrupts one answer pylon during telegraphed windows.
- Wave 30 boss is Null Harvest Engine.
- It combines shields, lane pressure, adds, and Core attack without unfair overlap.
- Bosses resist permanent stun and displacement.
- Bosses remain above 65% movement under slow.
- Endless starts at wave 31 only after explicit choice.
- Endless uses deterministic ten-wave modifier decks and boss every ten waves.
- Excess spawn budget waits in queue instead of spawning all in one frame.

SPAWN

- Spawn only at authored active gate anchors.
- Show 0.8–1.2 seconds of dust, rune mechanism, and silhouette before activation.
- Enemy is harmless and not targetable until active.
- Offset group activation to avoid one-frame spikes.
- Gate light and audio remain attached to the spawn anchor.
- Never pop an enemy inside camera view without telegraph.

VFX

- Every effect follows Cause → Travel → Contact → Reaction → Decay.
- Origins attach to muzzle, hand, gauntlet, tower, trap, enemy, Core, or validated ground.
- Opaque mass writes depth.
- Additive glow supports a dense core.
- Crop, grass, smoke, dust, debris, water, frost, char, and scars use fixed capacity.
- Weapon impacts create material-correct debris and sound.
- Fire creates heat, flame, smoke, char, and cooling decay.
- Frost creates condensation, crystal growth, brittle response, and melt.
- Lightning exposes source, branch targets, grounding, flash, and ion decay.
- Wind reveals force through crop pressure, dust, leaves, and ribbons.
- Gravity reveals containment, inward motion, collapse, and bounded shockwave.
- Cosmetic terrain reactions clear on restart and never desync collision.
- Prewarm first-use shader/material variants before gameplay.

AUDIO

- Build one audio graph through the host.
- Use buses for master, weapons, impacts, abilities, towers, enemies, ambience, music, UI, quiz.
- Farm ambience includes wind, crops, insects, wood, water, and distant mechanisms.
- Weapons use transient, mechanical body, low report, environment tail, and material impact.
- Towers are locatable and voice-limited.
- Quiz cues remain clear without muting all combat.
- Boss music adds layers rather than restarting a track abruptly.
- Pause, focus loss, restart, and disposal handle all voices correctly.
- Never allocate a large new node graph for every rapid shot.

PERFORMANCE

- Target stable 60 FPS on declared hardware.
- Measure median, p95, p99 frame time, draw calls, triangles, active enemies, particles, lights, audio voices.
- Instance crops, fence pieces, repeated tower parts, enemy parts, and debris where beneficial.
- Use LOD and frustum/distance culling.
- Use pooled projectiles, impacts, effects, traps, lights, audio, and enemies.
- Cap dynamic lights and reuse ballast/variants when renderer requires it.
- No per-frame geometry, material, shader, audio-node, or DOM creation.
- No unbounded marks, trails, arrays, timers, or event histories.
- Adaptive quality reduces distant crops, particles, shadow distance, and reaction detail first.
- Never reduce lane, enemy, Core, answer, or hostile telegraph readability.

ARCHITECTURE

- One composition root registers systems and owns lifecycle.
- One fixed-step gameplay clock owns deterministic movement/combat.
- One seeded random root forks stable wave, quiz, audio, and cosmetic streams.
- Player, weapons, build, quiz, enemies, waves, progression, UI, VFX, and audio communicate through host contracts.
- Producers own decisions and publish complete payloads.
- Consumers do not reach into another subsystem's mutable internals.
- Definitions are immutable and shared only when pure.
- World queries are read-only outside world owner.
- Reset follows one authoritative run-reset path.
- Dispose runs in reverse ownership order.

EXECUTION

- Inspect project rules and existing runtime before edits.
- Add the task to the host plan when required.
- Build runtime contracts and deterministic definitions.
- Build Amberstep terrain, landmarks, Core, gates, and routes.
- Build camera, player rig, locomotion, collision, and input.
- Build Ranger weapon vertical slice.
- Build placement, Fence, and Sentry vertical slice.
- Build one enemy, wave, Core damage, and fail/restart loop.
- Build quiz event with four physical pylons.
- Expand all weapons, structures, traps, enemies, and bosses.
- Build Technician parity and elemental material response.
- Add progression integration, audio, VFX, lighting, accessibility, and performance tiers.
- Use sub-agents only if host rules permit and ownership is disjoint.
- Keep one integration owner for shared runtime and state.

VALIDATION

- Run canonical static, build, and gameplay gates.
- Verify one world, renderer, camera set, input owner, audio graph, and frame loop.
- Verify seeded wave and quiz reproducibility.
- Verify every gate retains a route after accepted placement.
- Verify invalid placement spends nothing.
- Verify actors do not cross solid structures or invalid terrain.
- Verify Core damage, regeneration cap, repair, destruction, defeat, and reset.
- Verify exactly four answer pylons and no repeated question before pack exhaustion.
- Verify all class skills, weapons, towers, traps, enemies, bosses, pools, and resets.
- Verify wave 30 Extract and Endless choice.
- This prompt authorizes bounded browser, screenshot, gameplay, audio, and performance checks through existing host tools.
- Use fixed seed, map, class, viewport, DPR, quality, wave, camera, and load.
- Inspect one early wave, one build/quiz state, and one boss state after integration.
- Independent critic returns one strongest evidenced gap and exact owner/acceptance condition.
- Repeat only after a material correction or new concrete question.
- Never invent measured FPS, visual approval, audio approval, or a comparison win.

DONE WHEN

- Amberstep Farm is a coherent working farm and tactical battlefield.
- Player movement, aim, fire, dodge, build, interact, and repair are responsive.
- Ranger and Technician are complete, distinct, and limited to three equipped skills.
- Four early weapons and four premium earned weapons function.
- Six structures and five traps build, upgrade, repair, sell, trigger, and reset.
- Every accepted fence state preserves a valid enemy route.
- Quiz Core and four physical answers work during live pressure.
- Eight regular enemies and three bosses have distinct mechanics.
- Waves 1–30 and optional Endless complete without unbounded growth.
- VFX and audio communicate source, contact, material, and consequence.
- Fully upgraded farm reads as earned growth from the early state.
- Static gates pass and measured runtime meets declared target or reports exact gap honestly.
- Visible feel and final art taste remain explicit user gates.

Continue until the complete playable contract is met or a real external boundary is documented.

Fan out sub-agents and have sub-agents tackle each one individually so that the game is utterly perfect. You should /loop on each item and have a separate sub-agent check it visually to ensure it looks triple A. That separate sub-agent should be a really harsh critic, and if it doesn't look triple A, it should keep going. 

Don't stop until each sub-agent is utterly wowed with the quality

Maximal aber 6 Subagents zur gleichen Zeit nicht übertreiben sonst gehen meine limits weg!

Du kannst den Claude Browser nutzen, also den eigenen, der dev server läuft und port ist erreichbar
```
