# Wildcore: Bloom Siege — Gameplay Build Prompt

**Use:** Copy the full fenced block as a standalone core-game implementation request.
**Scope:** Runtime, living farm, camera, heroes, weapons, growth, quiz, enemies, waves, elemental VFX/audio.
**References:** Use all ten local `assets/` images as bounded visual direction.

```text
CREATE WILDCORE: BLOOM SIEGE — COMPLETE GAMEPLAY AND LIVING WORLD

MISSION

Build an original elevated-camera action tower-defense shooter quiz in a living solarpunk fantasy farm.
The player physically moves, aims, shoots, grows defenses, repairs, answers, and protects a seed-memory Core.
The farm must grow visibly through earned choices.
Living structures must behave like understandable machines, not arbitrary magic plants.
Elemental attacks must show device source, motion, contact, material response, and decay.
Use the host renderer, language, runtime, input, audio, build, ownership, and tests.
One host owns world, camera, simulation, input, audio, and frame loop.
Never create a second renderer, game host, world, camera runtime, audio graph, or recursive loop.
Build original geometry, characters, creatures, towers, effects, UI, sound, and lore.
Copy no known fantasy world, hero, spell, enemy, logo, or interface.

QUALITY BAR

- Premium action-game response and readable weapon weight.
- Deterministic tower-defense route and role clarity.
- Handcrafted cinematic environment composition with living motion.
- Compact rounded-faceted voxel-like rigs with expressive full-body animation.
- Elemental spectacle with physical causality and bounded visibility.
- Bright color serving function rather than flattening depth.
- Original solarpunk-fantasy identity, not generic cute mobile art.

REFERENCES

- `assets/00-title-start.png`: identity and class silhouettes.
- `assets/01-wave-one-farm.png`: camera, early density, Core, route.
- `assets/02-build-mode.png`: growing defense and path legality.
- `assets/03-quiz-event.png`: four physical answer petals.
- `assets/04-defense-family.png`: six living structure silhouettes.
- `assets/05-classes-weapons.png`: articulated heroes and equipment.
- `assets/06-upgrade-interface.png`: physical Seed Vault context.
- `assets/07-boss-wave.png`: maximum elemental readability.
- `assets/08-wave-thirty-endgame.png`: earned mature farm.
- `assets/09-future-maps.png`: future wind/volcanic directions only.
Images guide art and composition; runtime builds real 3D content.

FIRST READ

- Mixed crops and irrigation establish a farm.
- Living seed-memory Core is the protected landmark.
- Root-gate routes are obvious through paths, water, and fence forms.
- Hero aim and class silhouette read at small scale.
- Living towers have distinct muzzles and directions.
- Element colors remain localized to active causes.
- Enemies are visible inside elemental fields.
- Four answer petals are recognizable when inactive.
- Late farm looks like earned maturation of the same place.

OWNERSHIP

- Host runtime owns the only world, camera set, input routing, audio graph, and frame loop.
- Hero owner controls movement, aim, weapons, class resources, and three equipped skills.
- Growth owner validates placement, route continuity, construction, regrow, upgrade, and compost.
- Wave owner schedules root gates, creatures, bosses, preparation, completion, and Endless cadence.
- Quiz owner publishes one question, four petals, resolution, reward, and failure threat.
- UI consumes authoritative state and issues commands; it never simulates gameplay truth.
- Reset disposes every subscription, pooled actor, spatial voice, timer, and transient effect once.

SCOPE

- One launch map: `BLOOMSTEAD BASIN`.
- Approximate footprint 140 × 110 metres.
- One local player.
- Field Ranger and Elemental Technician.
- Exactly three equipped abilities each.
- Thirty authored waves and optional Endless.
- Bosses at 10, 20, 30.
- Eight regular creature roles.
- Six persistent structures, five traps.
- Four free weapons, four premium earned devices.
- Exactly four quiz answers.
- No required network, quest campaign, survival crafting, open world, pet collection, or fourth map promise.

WORLD — BLOOMSTEAD BASIN

- Shape four irregular crop gardens around a central living Core terrace.
- Core safe radius nine metres.
- Four answer petals/pylons at stable readable offsets.
- Begin two root gates and grow to four.
- Create curved lanes from compacted soil, irrigation, roots, and stone.
- Minimum valid navigation corridor two metres.
- Living fences reroute but leave gates for player traversal.
- Use seed workshop, waterwheel, giant canopy trunk, ceramic reservoir as landmarks.
- Use mixed crop circles, orchard edge, reed bed, herb terrace, root bridges.
- Keep lane vegetation low and silhouette-clean.
- Use foreground leaves only where camera can fade/cull them.
- Close distance with canopy, hills, and large authored roots, not random forest scatter.
- Ground all structures from one finished terrain truth.
- Cosmetic roots, dents, wetness, char, frost do not mutate navigation height.
- Prevent actors clipping Core, roots, fences, towers, water, workshop, cliffs.

MATERIALS

- Bark has ridges, growth seams, cut ends, and soil transition.
- Woven reed has thickness and tension.
- Glazed ceramic has chips, brace points, and controlled highlights.
- Crystal has depth-writing body and restrained emissive interior.
- Sap conduits are bright only while active.
- Soil shows compression, moisture, leaf litter, and bounded contacts.
- Water has clear edge, flow direction, wake, splash, and depth cue.
- Crops vary by species, height, clump, color, and wind response.
- Petals have thickness and never read as flat alpha cards near camera.

LIGHT AND ATMOSPHERE

- Warm canopy shafts define primary composition.
- Jade sky/canopy fill preserves shadow detail.
- Coral Core light anchors the middle ground.
- Pollen gold marks earned/selected/electric states.
- Violet is reserved for gravity/corruption/high threat.
- Water blue supports water/frost only.
- Keep most world materials neutral enough for effects to read.
- Use stable contact shadows near play and cheaper distance.
- Mist separates depth but never fills near combat.
- Bloom supports dense cores and never replaces form.
- Tone mapping preserves pale ceramic, sun shafts, Core, and effects simultaneously.

VEGETATION AND WIND

- One environment wind source drives grass, crops, leaves, cloth, pollen.
- Layer trunk/branch/leaf frequencies.
- Reduce amplitude near text and active answer faces.
- Hero, enemy, projectile, and shock contacts create bounded local response.
- Wind Step and Cyclone-like forces use the same response field.
- Vegetation never reveals hidden target by wrong culling.
- Use instancing/batching and LOD.
- Avoid uniform sway, visible grid, repeated crowns, unbounded pollen.

CAMERA

- Perspective elevated three-quarter chase.
- Pitch target 50–56 degrees.
- Hero frame height 7–9%.
- Slightly wider than Blackrain to read elemental fields.
- Aim shifts framing modestly toward target.
- Controlled zoom with safe bounds.
- Prefer authored azimuth unless rotation is fully supported.
- Fade/cull only true foreground blockers.
- Collision raises/shortens around canopy roots and towers.
- Weapon impulse and explosion shake short/capped.
- Reduced shake global.
- Grow mode stabilizes without orthographic switch.
- Quiz uses gameplay camera.
- Boss framing is brief and returns control.

INPUT AND MOVEMENT

- WASD/left stick move camera-relative.
- Mouse/right stick aim independently.
- Primary, secondary, reload/vent, dodge, interact, Grow.
- Exactly three ability bindings.
- Grow uses exclusive context and slots 1–6/radial.
- Weapon swap and build never double-fire.
- Buffer reload/dodge/ability recovery.
- Focus loss pauses solo and clears fire/aim.
- Host owns remapping and hold/toggle.
- Rig includes root, pelvis, chest, head, shoulders, elbows, wrists, hips, knees, ankles, hands, feet.
- Real pivots, planted feet, broad readable gestures, upper-body aim, full-body recoil.
- Compact, not block toy, chibi infant, or realistic human.
- Collision overrides animation; no sliding or bunny-hop exploit.

FIELD RANGER

- Leaf-cloth jacket, ceramic plates, seed-metal firearm, utility satchel.
- Accurate hits build Focus.
- Full Focus improves recoil/reload briefly.
- Ballistic weapons at full efficiency.
- Pool: Frag Line, Repair Drone, Suppression Beacon, Dash Vault, Armour Break, Rally Pulse.
- Frag Line uses a seed-shell charge with visible trajectory and bounded fragmentation.
- Repair Drone is pollinator-like but mechanically repairs structures only.
- Suppression Beacon uses a rooted resonator and boss-safe attack-rate control.
- Dash Vault crosses marked low living fences.
- Armour Break exposes a real target state.
- Rally Pulse improves reload and tower tracking in a bounded area.
- Equip exactly three.
- Every ability owns data, animation, contact, cap, effect, audio, cleanup.

ELEMENTAL TECHNICIAN

- Crystal gauntlets, petal vane shoulders, sap reactor, pollinator drone.
- Elemental contacts build Core Charge.
- Primary emitter pulse has braced full-body recoil.
- Pool: Fire Orb, Frost Wall, Thunder Grid, Wind Step, Magma Rail, Gravity Well.
- Fire Orb: sap-plasma charge, dense core, flame sheath, contact, char, decay.
- Frost Wall: thick ceramic-ice growth, valid anchors, cannot close last route.
- Thunder Grid: crystal-vine nodes, capped chains, grounded contacts.
- Wind Step: vane charge, directional dash, vegetation pressure, one measured contact.
- Magma Rail: mineral induction, finite corridor, soil/water reaction.
- Gravity Well: paired lenses, bounded pull, pollen spiral, collapse; bosses resist.
- Equip exactly three.
- No robe, staff, unexplained spell, floating origin, or recolored generic circles.

WEAPONS

- Wave 1 sidearm.
- Wave 3 carbine.
- Wave 5 scattergun.
- Wave 7 burst rifle.
- Full inventory gives explicit replace/store.
- No free grants later.
- Premium from wave 8 for Gold.
- Laser Repeater becomes sunline emitter with heat and precise contact.
- Arc Caster becomes crystal-vine chain device with capped targets.
- Rail Lance becomes mineral induction lance with finite penetration.
- Cryo Projector becomes dew condenser with short cone/brittle setup.
- Names may remain functional in data even if art skin changes.
- Five deterministic levels each.
- One definition source for combat/UI/audio/VFX.
- Hits respect team, line of sight, opaque structure, event identity.
- Pool all repeated shots/effects.

SHOOTER FEEL

- Valid primary fires without animation latency.
- Charged/heavy attacks have visible anticipation.
- Hands/shoulders/hips respond to shot weight.
- Recoil learnable and capped.
- Reload exposes remove/insert/ready with cancel policy.
- Contact differentiates soil, root, reed, ceramic, crystal, water, flesh, armour, shield.
- Hit layers material, enemy response, restrained marker, sound, impulse.
- Scattergun aggregates feedback.
- Cases/seed shells, magazines, impacts use fixed capacity.
- Rapid fire reuses audio voices/graphs.

GROW SYSTEM

- Full grow/repair in preparation; risky during combat.
- Candidate raycasts final terrain.
- One reason: core, gate, slope, water, occupied, route, range, stock, valid.
- Validate every root gate before living fence/Frost Wall acceptance.
- Preview footprint, facing, range, route, joints, total Gold.
- Atomic validate → spend → grow.
- Failure costs nothing.
- Compost return 70% preparation, 40% combat.
- Regrow repair follows missing health.
- Restart clears structures, traps, roots, previews, navigation, pools, subscriptions.

LIVING STRUCTURES

- Root Fence: woven route control, player gate, three visible growth tiers.
- Seed Spitter: articulated ceramic barrel petals, direct line-of-sight shots.
- Bulb Mortar: swells visibly, delayed pod AoE, minimum range.
- Crystal Trellis: three vine posts and capped lightning chains.
- Dew Fan: broad flower, directional slow, condensation.
- Pollinator Lantern: sends repair motes/drones to structures, not Core during waves.
- Each has base, collider, health, target, contact, VFX, audio, upgrade, compost, repair.
- Tier 2 grows one real module.
- Tier 3 chooses exactly two authored roles.
- Priorities: First, Last, Strongest, Weakest, Core Threat.
- Line of sight except arcing Mortar.
- Target work bounded and scheduled.

TRAPS

- Snare Roots: capped root and vulnerability.
- Thunder Pod: armour burst with trigger direction.
- Ember Reed: narrow timed burn lane.
- Pressure Reed: directed push and boss cap.
- Decoy Bloom: redirects regulars only.
- Purchased stock consumed once.
- Triggers deterministic and deduplicated.
- Growth/reaction/decay visible.
- Return colliders, meshes, lights, audio, debris to pools.

QUIZ CORE

- Standard health 1,000.
- No active-wave regeneration.
- Between waves restore 4% max capped to prior-wave start health.
- Gold repair outside combat can reach full.
- Four answer petals are real colliders with readable faces.
- Quiz after waves 2, 5, 8, every three after.
- Seeded no-repeat draw.
- Exactly four choices.
- Shoot/interact resolves once.
- 15-second window.
- Timeout keeps question and spawns bounded pressure.
- Correct: Insight, +20% next-wave Gold, three buffs.
- Wrong: capped threat and 20-second shield recovery pause.
- One authoritative outcome event feeds consumers.
- Core collapse seals defeat once.

ENEMIES

- Thornling: basic fast attacker.
- Shellback: frontal root armour and exposed recovery.
- Burrow Mite: bypasses one fence with soil warning.
- Spore Spitter: ranged line-of-sight projectile.
- Seed Thief: steals loose Gold and flees.
- Chorus Warden: buffs nearby creatures until interrupted.
- Rootbreaker: prioritizes structures with heavy telegraphed hits.
- Glider Moth: air corridor, ignores fences, can be grounded.
- Original angular plant-stone creature silhouettes.
- Distinct size, motion, range, telegraph, counter, not recolor.
- Navigation respects dynamic fences, water, roots, structures, slope.
- No invalid spawn, wall attack, clipping, trapped idle.
- Bounded repath schedule.
- Active cap around 48 after measurement.

WAVES AND BOSSES

- Authored 1–30 arc.
- Composition, gate, role, elite mechanics grow before health.
- Regular speed max 1.35×.
- Attack rate max 1.30×.
- Spawn queue avoids frame spike.
- Wave 10 Gatebreaker Colossus is root-stone siege creature testing fences.
- Wave 20 Fourfold Oracle corrupts one answer petal with telegraph.
- Wave 30 Null Harvest Engine is an original sterile machine-creature threatening Core/lanes.
- Bosses resist permanent stun/displacement and slow below 65%.
- Endless begins by choice.
- Deterministic ten-wave seasonal modifier decks and boss cadence.
- Never begin next wave with unresolved enemies/transactions.

ELEMENTAL RESPONSE

- One neutral contact description carries point, normal, strength, material, element, event ID.
- Fire chars leaves/soil, creates heat/embers/smoke, then cools.
- Frost crystallizes dew/water/surfaces, primes brittle, then melts.
- Lightning uses crystal/vine/water conductivity with capped targets.
- Wind moves leaves, pollen, crops, vapor, actors within caps.
- Magma heats mineral soil and steams water, then cools to bounded dark crust.
- Gravity bends pollen/leaves toward containment and ends in one shock ring.
- Reactions cosmetic by default; Frost Wall collision is separate bounded skill object.
- Same contact feeds rendering, audio, light, and material response.
- Reset clears every residue and field.

VFX

- Cause → Travel → Contact → Reaction → Decay.
- Attach origins to real rig/tower/trap/enemy/Core/ground anchors.
- Opaque mass writes depth; glow supports core.
- Keep effect interiors transparent for targets.
- Use fixed-cap fire, frost, branches, ribbons, leaves, pollen, debris, lights, marks.
- Prewarm first casts/tower shots.
- Reject flat carrier rectangles, random circles, bloom-only attacks, detached particles.

AUDIO

- One host graph and buses.
- Ambience: canopy, crops, water, insects, ceramic chimes, roots, distant creatures.
- Guns layer transient, mechanism, body, tail, material.
- Living towers have distinct preparation/release/contact/decay.
- Element sounds communicate device and material, not generic magic whoosh.
- Quiz chord cuts through without muting combat.
- Boss music grows layers.
- Pause/focus/restart/dispose clean voices.
- Voice/node caps protect rapid fire and pollen effects.

PERFORMANCE

- Declare hardware and target stable 60 FPS.
- Measure median/p95/p99 frame time, draw calls, triangles, pools, lights, audio voices.
- Instance/batch crops, fence parts, tower/enemy parts, leaves, debris.
- LOD/cull vegetation, structures, actors, effects.
- Fixed caps for wind contacts, pollen, elemental fields, branches, lights, marks.
- No per-frame geometry/material/audio/DOM creation.
- Lower distant foliage, pollen, reaction detail, shadow distance first.
- Preserve route, enemy, Core, answers, telegraphs, selected hero.

ARCHITECTURE

- One composition root/lifecycle.
- One fixed-step simulation.
- One seeded random root and forked wave/quiz/audio/cosmetic streams.
- Host contracts/events between systems.
- Producers own complete decisions/payloads.
- No consumer mutable reach-through.
- Pure immutable definitions may share.
- World queries read-only outside world owner.
- One reset and reverse dispose.

EXECUTION

- Inspect host rules/architecture; extend plan if required.
- Build contracts/definitions and Bloomstead world.
- Build camera, hero rig, collision, input.
- Build Ranger gun slice.
- Build Root Fence, Seed Spitter, one enemy, wave, Core defeat/reset.
- Build four-petal quiz.
- Complete weapons, defenses, traps, enemies, bosses.
- Build Technician parity and material response.
- Integrate economy, UI, audio, light, accessibility, quality tiers.
- Sub-agents only if host permits and ownership disjoint.
- One integration owner.

VALIDATION

- Run canonical static/build/gameplay gates.
- Verify one runtime/world/camera/input/audio/loop.
- Verify deterministic waves/quiz.
- Verify accepted growth preserves routes; failures cost nothing.
- Verify collision, line of sight, spawn/repath bounds.
- Verify Core health/recovery/repair/collapse/reset.
- Verify exactly four answer petals and quiz outcomes.
- Verify all classes, weapons, defenses, traps, enemies, bosses, pools, reset.
- Verify elemental response caps and terrain/navigation separation.
- Verify wave 30 Extract/Endless.
- Prompt authorizes bounded browser/screenshot/gameplay/audio/performance review with existing tools.
- Fix seed, viewport, DPR, quality, map, class, wave, camera, load.
- Inspect early, Grow/quiz, boss after integration.
- Critic returns one strongest evidenced gap and owner/condition.
- Repeat after material correction/new question only.
- Never invent FPS/visual/audio/user approval.

DONE WHEN

- Bloomstead reads as living farm and tactical battlefield.
- Movement, aim, fire, dodge, Grow, answer, repair respond.
- Both classes complete with three equipped skills.
- Four early/four premium weapons function.
- Six structures/five traps complete lifecycle.
- Every accepted fence preserves route.
- Core/four answers work under pressure.
- Eight enemies/three bosses have distinct counters.
- Waves 1–30/Endless avoid unbounded growth.
- Elemental VFX/audio show real device/material causality.
- Mature farm visibly grows from early state.
- Gates pass; runtime target met or exact gap reported.
- Final look/feel remain user gates.

Continue until this playable contract is met or a real external boundary is documented.
```
