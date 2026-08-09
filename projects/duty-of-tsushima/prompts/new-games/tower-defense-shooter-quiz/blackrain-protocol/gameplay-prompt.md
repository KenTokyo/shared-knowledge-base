# Blackrain Protocol — Gameplay Build Prompt

**Use:** Copy the full fenced block as a standalone core-game implementation request.
**Scope:** Runtime, storm farm, camera, operator, guns, build, quiz, AI, waves, VFX, audio, performance.
**References:** Use all ten local `assets/` images as bounded visual direction.

```text
CREATE BLACKRAIN PROTOCOL — COMPLETE GAMEPLAY AND STORM WORLD

MISSION

Build an original elevated-camera action tower-defense shooter quiz on a rain-soaked agricultural site.
The player physically moves, aims, shoots, builds, repairs, answers, and defends.
The world must feel like a functioning grow-site hardened under emergency conditions.
Gunplay must be immediate and weighty.
Defense placement must be spatial, readable, and route-legal.
Rain, smoke, reflections, and light must deepen atmosphere without hiding gameplay or breaking frame time.
Use the host renderer, language, runtime ownership, input, audio, build, and tests.
One runtime owns world, camera, input, simulation, audio, and frame loop.
Never create a second gameplay host, renderer, camera set, audio graph, or recursive frame loop.
Build all designs originally.
Copy no military map, weapon brand, operator, faction, UI, sound, effect, tower, enemy, or logo.

QUALITY BAR

- Premium modern shooter input response, recoil, reload, hit, and sound weight.
- Tactical defense clarity under low light and weather.
- Physically grounded industrial agriculture rather than a generic sci-fi base.
- Compact bevelled voxel-like actors with real articulation and planted movement.
- Cause-driven smoke, heat, electricity, water, debris, and decay.
- Strong stable midtones; darkness is mood, not missing information.
- Original product identity in every structure and enemy.

REFERENCES

- `assets/00-title-start.png`: identity and operator silhouettes.
- `assets/01-wave-one-farm.png`: initial map density, camera, Vault, open lane.
- `assets/02-build-mode.png`: stabilized sentry, barrier, route telemetry.
- `assets/03-quiz-event.png`: four physical terminals under live pressure.
- `assets/04-defense-family.png`: six industrial-agricultural structures.
- `assets/05-classes-weapons.png`: operator rigs and equipment.
- `assets/06-upgrade-interface.png`: physical Field Armoury.
- `assets/07-boss-wave.png`: storm maximum readability target.
- `assets/08-wave-thirty-endgame.png`: fully fortified dawn result.
- `assets/09-future-maps.png`: future flood and cold directions only.
Images are art references, never full-screen gameplay textures.

FIRST READ

- Wet crop rows establish the agricultural site.
- Obsidian Quiz Vault is the central protected landmark.
- Active gate-to-Vault routes are visible through road, light, and barrier geometry.
- Operator is small but aim direction and weapon stance are clear.
- Friendly cyan, selected amber, hostile red retain strict roles.
- Towers show physical fire direction.
- Enemy telegraphs survive rain and smoke.
- Four answer terminals remain identifiable when inactive.
- Upgraded late site remains recognizably the same farm.

OWNERSHIP

- Host runtime owns the only world, camera set, input routing, audio graph, and frame loop.
- Operator owner controls movement, aim, weapons, class resources, and three equipped skills.
- Build owner validates placement, route continuity, construction, repair, upgrade, and sell commands.
- Wave owner schedules gates, enemies, bosses, preparation, completion, and Endless cadence.
- Quiz owner publishes one question, four terminals, resolution, reward, and failure threat.
- UI consumes authoritative state and emits commands; it never simulates combat or economy truth.
- Reset disposes every subscription, pooled actor, spatial voice, timer, and transient effect once.

SCOPE

- One launch map: `BLACKRAIN GROW-SITE`.
- Approximate playable footprint 140 × 110 metres.
- One local player.
- Field Ranger and Elemental Technician.
- Exactly three equipped abilities per class.
- Thirty authored waves and optional Endless.
- Bosses at 10, 20, 30.
- Eight regular enemy roles.
- Six structures, five traps.
- Four free weapons, four premium earned weapons.
- Exactly four quiz answers.
- No required network, campaign quests, extraction inventory, crafting survival, or open world.
- Total map cap remains three.

WORLD — BLACKRAIN GROW-SITE

- Build four irregular crop sectors around a central reinforced Vault pad.
- Core protected radius is nine metres.
- Place four rugged answer terminals at stable offsets around the Vault.
- Begin with two active enemy gates and grow to four.
- Use wet service roads as primary lanes.
- Use polytunnels, crop beds, irrigation, pump house, silo, and service bay as working landmarks.
- Keep at least two metres of valid navigation corridor.
- Barriers create redirects, not sealed mazes.
- Player uses marked low crossings and barrier gates.
- Puddles and drainage add response without random collision traps.
- Polytunnels and silos cast real occlusion and block shots.
- Crop rows remain low enough near lanes to preserve targets.
- Distant storm terrain closes the world without an empty void.
- Ground structures from one finished terrain/collision truth.
- Cosmetic mud deformation never changes navigation height.
- Prevent actors from clipping Vault, barriers, towers, buildings, pipes, slopes, or water boundary.

MATERIALS

- Wet black soil has rough clumps, shallow water, and impact spray.
- Concrete has aggregate, wear, runoff, and stable midtone.
- Gunmetal has controlled highlights, scratches, and edge wear.
- Composite panels remain matte enough to show form.
- Tarps flex subtly and never become transparent noise.
- Glass catches work light but remains dirty and grounded.
- Crops retain natural green and wet specular without glowing.
- Puddles reflect local light, ripple at contact, and fade stably.
- Obsidian Vault reads dark through shape and rim, not pure black.

WEATHER AND LIGHT

- Rain direction follows one environment wind source.
- Near rain is sparse and readable; distant rain carries density.
- Rain avoids bright full-screen streak overload.
- Roof and tower runoff uses bounded emitters.
- Puddles ripple through fixed-cap fields.
- Storm-blue sky fill preserves enemy and crop midtones.
- Amber work lights define safe structure islands.
- Cyan marks friendly live systems.
- Red exists only for real hostile/invalid states.
- Lightning is rare and exposure-controlled.
- Local lights are pooled and capped.
- Wet reflections use host-appropriate SSR/probe/planar approximation only after measurement.
- Lower reflection/weather detail before target clarity.
- Avoid permanent fog wall, crushed black shadows, and cyan neon wash.

CAMERA

- Perspective elevated tactical chase camera.
- Pitch target 55–62 degrees.
- Operator ordinary frame height 9–12%.
- Tighter than a board overview, wide enough for lane decisions.
- Aim shifts framing modestly toward cursor/stick direction.
- Controlled zoom has safe near/far limits.
- Fixed authored azimuth is preferred unless full rotation is deliberately supported.
- Camera collision shortens or rises around greenhouses and towers.
- Transparent fade may apply to blocking roofs only with stable ownership.
- Recoil impulse is short and weapon-specific.
- Explosion shake is distance-scaled and capped.
- Reduced shake setting applies everywhere.
- Build mode stabilizes without switching to orthographic.
- Quiz remains on gameplay camera.

INPUT AND MOVEMENT

- WASD/left stick moves camera-relative.
- Mouse/right stick aims independently.
- Primary fire, secondary aim/charge, reload, dodge, interact, build.
- Exactly three ability bindings.
- Build uses exclusive context with slots 1–6 or controller radial.
- Weapon swap never fires build selection simultaneously.
- Input buffer covers reload end, dodge recovery, ability recovery.
- Focus loss pauses solo play and clears fire/aim edges.
- Remapping and hold/toggle are host-owned.
- Operator rig has root, pelvis, chest, head, shoulders, elbows, wrists, hips, knees, ankles, hands, feet.
- Real pivots, planted steps, upper-body aim, full-body recoil, deliberate dodge.
- No sliding block, photoreal human, arm-only shot animation, or bunny-hop exploit.
- Collision remains authoritative over animation.

FIELD RANGER

- Dark weather shell, composite plates, amber magazine markers, compact firearm.
- Accurate hits build Focus.
- Full Focus briefly improves recoil recovery and reload.
- Ballistic weapons operate at full efficiency.
- Abilities pool: Frag Line, Repair Drone, Suppression Beacon, Dash Vault, Armour Break, Rally Pulse.
- Frag Line follows visible arc and measured bounded blast.
- Repair Drone repairs structures, never Vault during active wave.
- Suppression Beacon reduces regular attack rate with boss cap.
- Dash Vault clears marked low barriers only.
- Armour Break exposes measured target armour.
- Rally Pulse improves reload and tower tracking locally.
- Equip exactly three.
- Every ability defines cooldown, cost, range, target, cap, VFX, audio, cleanup.

ELEMENTAL TECHNICIAN

- Insulated ceramic armour, coil gauntlets, cyan reactor, cable harness, utility drone.
- Elemental contacts build Core Charge.
- Primary is an engineered articulated emitter pulse.
- Abilities pool: Fire Orb, Frost Wall, Thunder Grid, Wind Step, Magma Rail, Gravity Well.
- Fire Orb shows charge, travel, collision, heat, steam/scorch, decay.
- Frost Wall is thick temporary collision and cannot close final route.
- Thunder Grid uses three grounded nodes and capped valid chains.
- Wind Step displaces rain, vapor, and loose debris.
- Magma Rail creates finite heated corridor and steam on water.
- Gravity Well uses visible containment and bounded pull; bosses resist.
- Equip exactly three.
- No robe, staff, unexplained magic, arbitrary world origin, or recolored circles.

WEAPONS

- Wave 1 sidearm.
- Wave 3 carbine.
- Wave 5 scattergun.
- Wave 7 burst rifle.
- Full inventory offers explicit replace/store choice.
- No free grants after wave 7.
- Premium catalogue opens at wave 8.
- Laser repeater uses heat, sustained beam, heat haze, wet steam contact.
- Arc caster chains through capped wet/metal targets and respects grounding rules.
- Rail lance charges finite penetration with strong structure occlusion.
- Cryo projector uses short cone, condensation, frost, brittle setup.
- Five deterministic levels each.
- One definition source owns combat and UI values.
- Hit queries respect teams, opaque structures, line of sight, event IDs.
- Pool shots, projectiles, shells, impacts, lights, and audio.

GUN FEEL

- Valid input fires without presentation latency.
- Charged weapons alone have deliberate anticipation.
- Weapon seats into shoulder/hands and visibly climbs/recover.
- Recoil pattern is learnable, bounded, and class/weapon specific.
- Reload shows magazine and ready phases with explicit cancel policy.
- Muzzle gas displaces rain briefly.
- Wet soil, concrete, metal, glass, water, armour, shield contacts differ.
- Hit feedback layers impact, target reaction, restrained marker, sound, short camera impulse.
- Scattergun aggregates pellet feedback.
- Shells and magazines have fixed-cap lifecycle.
- Rapid fire does not rebuild a large audio graph each round.

BUILD

- Full build/repair in preparation; risky build in combat.
- Terrain raycast uses final world surface.
- One validity reason: core, gate, slope, water, occupied, route, range, stock, valid.
- Validate every active gate before accepting a barrier or Frost Wall.
- Preview footprint, facing, range, route, connection, cost.
- Transaction is validate → spend → spawn.
- Failure spends nothing.
- Sell return 70% preparation, 40% combat.
- Repair cost derives from missing health.
- Restart clears placements, previews, paths, inventories, events, and pools.

STRUCTURES

- Composite Barrier: route control, player gate, three visible tiers.
- Stabilized Sentry: line-of-sight ballistic receiver with magazine feed.
- Smart Mortar: delayed ground AoE and minimum range.
- Arc Transformer: three grounded posts and capped chains.
- Cryogenic Fan: directional slow, low damage, condensation cone.
- Repair Mast: maintenance drones/pulses for structures, not Vault during combat.
- Each owns health, collider, target rule, contact, VFX, audio, upgrades, sell, repair.
- Tier 2 adds one physical module.
- Tier 3 chooses one of two authored roles.
- Priorities: First, Last, Strongest, Weakest, Vault Threat.
- Line of sight applies except arcing Mortar.
- Targeting work is scheduled and bounded.

TRAPS

- Snare Grid: capped root and vulnerability.
- Thunder Mine: armour burst with physical cone.
- Ember Trench: narrow timed burn and steam response.
- Pressure Ram: directed push with boss limits.
- Decoy Emitter: redirects regulars only.
- Stock is purchased and consumed once.
- Triggers are deterministic and event-deduplicated.
- All colliders, effects, lights, sounds, and debris return to pools.

QUIZ VAULT

- Standard health 1,000.
- No combat regeneration.
- Between-wave recovery is 4% max, capped at prior-wave start health.
- Gold repairs outside combat reach full.
- Four terminals are real world objects.
- Quiz after waves 2, 5, 8, then every three.
- Seeded no-repeat questions.
- Exactly four choices.
- Shoot or interact once to resolve.
- Fifteen-second window.
- Timeout leaves question active and spawns a bounded pressure group.
- Correct gives Insight, +20% next-wave Gold, three deterministic buffs.
- Wrong adds capped threat tier and pauses shield recovery 20 seconds.
- One authoritative outcome event feeds UI, audio, waves, score, progression.
- Vault collapse ends run through one defeat path.

ENEMIES

- Raider: basic fast attacker.
- Bulwark: frontal shield and exposed recovery.
- Mole Unit: bypasses one barrier with wet-ground warning.
- Corrosive Spitter: ranged line-of-sight pressure.
- Siphon Runner: steals loose Gold and flees.
- Signal Warden: buffs nearby regulars until interrupted.
- Breach Brute: prioritizes barriers/towers with heavy swings.
- Storm Skimmer: air corridor, ignores barriers, can be grounded.
- Each has original bevelled bio-mechanical/agricultural silhouette.
- Roles differ by size, locomotion, range, telegraph, counter, not color alone.
- Navigation respects dynamic barriers, water, structures, slope, active gates.
- No spawn inside actor/structure or attack through walls.
- Repath uses bounded schedule.
- Active target cap around 48 only after measurement.

WAVES

- Waves 1–30 authored.
- Composition, gates, role combinations, elites grow before health.
- Regular speed cap 1.35×.
- Attack-rate cap 1.30×.
- Spawn queue smooths frame load.
- Wave 10 Gatebreaker Colossus tests barriers and weak points.
- Wave 20 Fourfold Oracle jams one answer terminal during telegraphed windows.
- Wave 30 Null Harvest Engine combines shield, adds, lanes, and Vault attack fairly.
- Bosses resist permanent stun, displacement, and slow below 65%.
- Endless requires wave-30 choice.
- Endless repeats deterministic ten-wave modifier decks and boss cadence.
- No wave begins while previous enemies or transactional state remain unresolved.

VFX AND WEATHER RESPONSE

- Cause → Travel → Contact → Reaction → Decay.
- Attach effects to real muzzle, device, tower, enemy, Vault, trap, or ground anchor.
- Opaque mass writes depth; additive glow supports core.
- Ballistics displace rain, kick mud, spark metal, smoke briefly.
- Explosions push rain and smoke outward.
- Fire creates heat, flame, steam, scorch, smoke, cooling.
- Frost condenses air, crystallizes surfaces, fractures, melts.
- Lightning uses source, valid branches, grounding, puddle response, ion decay.
- Wind bends rain/vapor/debris along force.
- Gravity contains, pulls, collapses, emits bounded shockwave.
- Puddles, mud marks, scorch, frost, debris, smoke all use fixed capacity.
- Cosmetic ground response never moves navigation.
- Prewarm first-use variants.

AUDIO

- One host audio graph and buses.
- Rain, greenhouse drips, pumps, wind, sheet metal, distant thunder form ambience.
- Guns layer transient, mechanism, low body, environment tail, material contact.
- Towers are spatial and voice-limited.
- Quiz protocol remains clear without muting weapons.
- Boss score adds layers instead of restarting abruptly.
- Interior/exterior transitions use host-native sends.
- Focus loss, pause, restart, and dispose clean all voices.

PERFORMANCE

- Declare target hardware and stable 60 FPS goal.
- Measure median/p95/p99 frame time, draw calls, triangles, pools, lights, audio voices.
- Instance crops, barriers, repeated tower/enemy parts, debris.
- LOD/cull rain, crops, reflections, structures, enemies appropriately.
- Pool all repeat effects and actors.
- Cap rain, ripples, dynamic lights, lightning branches, smoke, marks, debris.
- No per-frame geometry/material/audio/DOM creation.
- Lower distant rain, reflection resolution, crop density, shadow range first.
- Never lower Vault, route, target, answer, or telegraph readability.
- Software renderer is a failed performance run, not evidence.

ARCHITECTURE

- One composition root and lifecycle.
- One fixed-step simulation owner.
- One seeded root with forked wave, quiz, audio, cosmetic streams.
- Systems communicate through host contracts/events.
- Producers own decisions and complete payloads.
- Consumers do not reach into mutable internals.
- Immutable definitions may be shared.
- World queries remain read-only outside world owner.
- One run-reset path.
- Reverse-order dispose.

EXECUTION

- Inspect host rules and architecture.
- Extend task plan before code when required.
- Build contracts, deterministic definitions, and Blackrain world.
- Build camera, operator rig, collision, input.
- Build Ranger firearm vertical slice.
- Build Barrier, Sentry, one enemy, wave, Vault defeat/restart.
- Build four-terminal quiz.
- Complete weapons, structures, traps, enemy roles, bosses.
- Build Technician parity and material/weather reactions.
- Integrate economy, UI, audio, lighting, accessibility, quality tiers.
- Use sub-agents only if host permits and ownership is disjoint.
- One integration owner owns shared runtime decisions.

VALIDATION

- Run canonical static/build/gameplay gates.
- Verify one runtime, frame loop, world, camera, input owner, audio graph.
- Verify deterministic waves/quiz.
- Verify accepted barriers preserve all active routes.
- Verify invalid placement spends nothing.
- Verify collision, line of sight, spawn safety, repath bounds.
- Verify Vault health, recovery cap, repair, collapse, defeat, reset.
- Verify four terminals, no-repeat quiz, correct/wrong/timeout.
- Verify all classes, weapons, structures, traps, enemies, bosses, pools, cleanup.
- Verify wave 30 Extract and Endless.
- Prompt authorizes bounded browser, screenshot, gameplay, audio, performance review with existing tools.
- Fix seed, viewport, DPR, quality, map, wave, camera, weather, load.
- Inspect early wave, build/quiz state, boss state after integration.
- Critic returns one strongest evidenced gap and owner/acceptance condition.
- Repeat only after material correction/new question.
- Never invent FPS, visual, audio, or user approval.

DONE WHEN

- Blackrain Grow-Site reads as farm and tactical battlefield.
- Rain and darkness preserve every critical target and route.
- Movement, aiming, firing, dodge, build, quiz, repair are responsive.
- Both classes are complete and equip three skills.
- Four early and four premium weapons work.
- Six structures and five traps work through full lifecycle.
- Every accepted barrier preserves a route.
- Vault and four terminals function under live pressure.
- Eight enemies and three bosses have distinct counters.
- Waves 1–30 and Endless avoid unbounded growth.
- VFX/audio express source, travel, contact, wet material, consequence.
- Static gates pass and measured runtime meets target or reports exact gap.
- Final look/feel remain user gates.

Continue until this playable contract is met or a real external boundary is documented.
```
