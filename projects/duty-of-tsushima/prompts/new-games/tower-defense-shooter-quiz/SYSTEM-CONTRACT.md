# Shared System Contract — Farm-Core Defense

## Product Loop

`Prepare → Build → Defend → Answer → Upgrade → Expand → Boss → Extract or Continue`

- The player controls one compact hero from an elevated three-quarter 3D camera.
- Movement is direct and continuous; shooting uses pointer/twin-stick aim independent of movement.
- The farm is an explorable battlefield, not a static tower-defense board.
- A central Quiz Core stores the settlement's knowledge and is the enemies' final target.
- Four answer pylons surround the core at safe readable angles.
- One authored enemy lane must remain open from every active gate to the core.
- Fences reroute enemies; turrets, traps, and the player damage them along the route.
- Preparation and combat phases alternate without loading another world.
- Quiz events interrupt routine, not simulation: enemies keep advancing at bounded pressure.
- Earned upgrades turn an empty farm into a personalized fortified settlement.

## Session Shape

| Beat | Waves | New demand |
|---|---:|---|
| Onboarding | 1–3 | Move, aim, fire, fence, one turret, first quiz |
| Foundation | 4–7 | Four free weapon grants, two lanes, first trap, first ability |
| Commitment | 8–10 | Premium shop starts, elite enemies, first boss |
| Expansion | 11–20 | Outer plot, mixed lanes, elemental armor, second boss |
| Mastery | 21–30 | Full farm footprint, combined threats, final siege boss |
| Endless | 31…∞ | Capped density, rotating modifiers, score chase, boss every ten |

- Wave 30 is a complete ending, not a fake stopping point.
- After wave 30, the player chooses `Extract` or `Continue Endless`.
- Extraction banks full meta rewards and closes the run.
- Endless multiplies score and meta drops but adds a rising loss risk.
- Defeat banks only milestone rewards already secured at boss waves.

## World and Route Rules

- Base farm playable footprint: approximately 140 × 110 metres.
- Core safe radius: 9 metres; no defenses or enemies may spawn inside it.
- Four expansion plots unlock clockwise at Core levels 2–5.
- Initial release uses two enemy gates; later stages activate up to four.
- Lane width target: 5–8 metres with 2-metre minimum clear navigation corridor.
- Fence placement snaps to a light ground grid while actors move continuously.
- Route solver previews every active gate before accepting a fence placement.
- Invalid placement provides one exact reason: `core`, `gate`, `slope`, `water`, `occupied`,
  `route`, `range`, `stock`, or `valid`.
- If a route becomes invalid because of destruction, enemies attack the nearest blocking fence.
- Players can vault low fences at marked breaks; enemies follow navigation and breach rules.
- No tower may target or fire through opaque structures without a valid line of sight.

## Core and Quiz

- Core starts with 1,000 health on Standard difficulty.
- Core does not regenerate during an active wave.
- Between waves it regenerates 4% maximum health, capped at the health present before that wave.
- Gold repairs may restore above that cap, up to full health.
- Core destruction ends the run after a short readable collapse sequence.
- A quiz begins after waves 2, 5, 8, then every three waves.
- A question is shown at the core and in a compact top HUD mirror.
- Four physical answer pylons display one answer each.
- The player resolves an answer by shooting or interacting with its pylon.
- Answer window: 15 seconds; the question stays active if the timer expires.
- Correct answer: +1 Insight, +20% next-wave Gold, and choice of one of three run buffs.
- Wrong answer: no Insight, next wave gains one bounded threat tier, and core shield pauses 20 seconds.
- Timeout: current wave spawns a small pressure group; the question remains available.
- Questions never repeat within one run until the local pack is exhausted.
- Questions and answers have strict length limits and no trick wording.

## Resources

- `Gold`: earned from kills, wave clears, quiz bonuses, and unused preparation time.
- `Insight`: earned only from correct quiz answers and boss mastery challenges.
- `Core Seeds`: meta currency banked at waves 10, 20, 30, and Endless milestones.
- No paid currency, loot boxes, random stat rolls, daily energy, or rotating cash shop.
- Gold resets every run.
- Insight resets every run after feeding the run-tech tree.
- Core Seeds persist locally and unlock deterministic starting options.

## Weapons

### Free onboarding grants

- Wave 1: reliable semi-automatic sidearm.
- Wave 3: balanced automatic carbine.
- Wave 5: close-range scattergun.
- Wave 7: precision burst rifle.
- The player chooses one of two offered grants when a slot would overflow.
- No more weapons are granted automatically after wave 7.

### Premium earned weapons

- Laser repeater: precise sustained beam, heat-limited, strong against shields.
- Arc caster: chains through capped nearby targets, weaker single-target damage.
- Rail lance: slow charged penetration line with terrain impact and boss utility.
- Cryo projector: short cone that primes slow and brittle reactions.
- Premium means high Gold cost and later availability, never real-money ownership.

### Upgrade structure

- Every weapon has five deterministic levels.
- Each level offers one of two authored branches, never random rarity rolls.
- Branch dimensions: damage handling, control, elemental utility, economy, or boss focus.
- One respec is free before wave 10; later respec costs Gold and never cash.
- Ammo, heat, reload, recoil, spread, range, and damage come from one definition source.

## Classes

### Field Ranger

- Uses all ballistic weapons efficiently.
- Passive: accurate hits build `Focus`; full Focus grants short recoil and reload improvement.
- Active pool: Frag Line, Repair Drone, Suppression Beacon, Dash Vault, Armour Break, Rally Pulse.
- Equips exactly three actives before a run; loadout can change after a boss.
- Strength: precise weapon output, repair flexibility, clear single-target control.
- Weakness: less autonomous area denial than Technician.

### Elemental Technician

- Uses emitter gauntlet as primary and may buy elemental premium weapons.
- Passive: elemental contacts build `Core Charge` used by advanced skills.
- Active pool: Fire Orb, Frost Wall, Thunder Grid, Wind Step, Magma Rail, Gravity Well.
- Equips exactly three actives before a run; loadout can change after a boss.
- Strength: large authored AoE fields and material reactions.
- Weakness: resource management, longer recovery, lower direct ballistic efficiency.

## Defenses

### Structures

- Fence: cheap route control; three material tiers; explicit gate segments.
- Sentry: direct line-of-sight ballistic damage; balanced baseline tower.
- Mortar: delayed ground AoE; minimum range and visible impact warning.
- Arc Coil: capped chain damage; strong against clustered shields.
- Frost Fan: directional slow field; weak damage, strong lane control.
- Repair Beacon: pulses repair to nearby structures; never heals Core during combat.

### Traps

- Snare Grid: one-use root and vulnerability window.
- Thunder Mine: one-use armour burst with clear trigger cone.
- Ember Trench: timed narrow burn lane with material reaction.
- Pressure Ram: directional knockback; cannot push bosses outside arena.
- Decoy Totem: temporary target that redirects regular enemies only.
- Traps consume stock; towers persist until sold or destroyed.

### Upgrades

- Every defense has three visible geometry tiers.
- Tier 2 changes one core statistic and adds a readable physical component.
- Tier 3 branches into one of two authored specializations.
- Selling returns 70% base and upgrade Gold outside combat, 40% during combat.
- Repair cost follows missing health, never an opaque fixed fee.
- Tower target priorities: First, Last, Strongest, Weakest, Core Threat.

## Enemy Roster

- Grunt: fast basic attacker; teaches lane and weapon fundamentals.
- Shieldbearer: frontal guard; encourages flank, explosive, or arc response.
- Burrower: bypasses one fence segment then surfaces with a clear warning.
- Spitter: ranged core pressure with line-of-sight projectile.
- Harvester: steals uncollected Gold and flees if ignored.
- Warden: buffs nearby regular enemies until interrupted.
- Siege Brute: attacks fences and towers; slow readable heavy swings.
- Flyer: ignores fences but follows anti-air corridor and can be grounded.
- Boss 10: Gatebreaker Colossus tests route resilience.
- Boss 20: Fourfold Oracle corrupts answer pylons during telegraphed windows.
- Boss 30: Null Harvest Engine combines lanes, shields, adds, and core pressure.

## Difficulty and Scaling

- Difficulty never relies on health growth alone.
- Wave budget, species mix, elite affixes, active gates, and attack combinations grow by chapter.
- Regular enemy speed cap: 1.35× baseline.
- Regular attack-rate cap: 1.30× baseline.
- Crowd active cap target: 48 on recommended desktop, adjusted by measured quality budget.
- Spawn budget queues excess enemies instead of creating all actors in one frame.
- Boss resistance prevents permanent stun, slow below 65% speed, or displacement outside arena.
- Endless uses repeating ten-wave rule decks with deterministic seed and capped simultaneous load.

## Scoring and Records

- Score = wave clear + kill value + core health + quiz accuracy + time bonus + Endless multiplier.
- Spending Gold never lowers score; economy choices should not punish engagement.
- Damage taken does not directly reduce score to avoid passive play.
- Final report lists wave, score, kills, accuracy, quiz result, Gold earned, tower damage, and Core health.
- Local records are versioned and survive offline.
- Boards: Highest Wave, Highest Score, Perfect Quiz, Class, Map, and weekly seeded challenge.
- Online board is optional; local play never waits for network.
- Anti-cheat for online submissions includes run seed, version, input summary, and validated event log.

## Maps

- Map 1 ships complete and owns the full onboarding through Endless.
- Map 2 preview demonstrates a new terrain constraint and retains all core systems.
- Map 3 preview demonstrates another terrain constraint and retains all core systems.
- Lifetime product cap is three maps unless a later product decision changes scope.
- No procedural biome soup; each map has authored lanes, landmarks, expansion plots, and skyline.
- The visual direction changes each map's art, but the gameplay footprint remains comparable.

## Presentation and Feedback

- Weapons use modern premium shooter timing: immediate input response, readable recoil, reload weight,
  strong transient audio, restrained hit stop, directional impact, and short camera impulse.
- Voxel-like characters use separated body parts, real pivots, planted feet, full-body recoil, and
  readable anticipation/contact/recovery.
- Every VFX follows `Cause → Travel → Contact → Reaction → Decay`.
- Opaque effect mass writes depth; additive glow supports shape instead of replacing it.
- Smoke, dust, debris, scorch, frost, wetness, and terrain marks have fixed capacities and lifetimes.
- Destructible ground is cosmetic and bounded; gameplay navigation reads the stable base surface.
- Audio layers source, motion, impact material, low body, spatial tail, and cleanup.
- Quiz cues cut through combat without muting weapons or becoming a separate music track.

## Runtime and Performance Contract

- Use host-native renderer, language, build system, ownership, and tests.
- One game host owns the frame loop, world, camera set, input, audio, and shared state.
- UI, towers, enemies, weapons, quiz, and progression register with that host; none starts a second loop.
- Use deterministic forked random streams for waves, drops, quiz order, and cosmetic variation.
- Pool enemies, projectiles, impacts, tower shots, traps, lights, particles, audio voices, and damage text.
- Instance repeated crops, fence pieces, towers, enemy parts, and debris where the renderer benefits.
- Use distance/frustum culling, LOD, shadow budgets, material reuse, shader prewarm, and capped updates.
- No per-frame geometry, material, audio-node, DOM-node, or unbounded-array creation.
- Define target hardware and measure median, p95, p99 frame time, draw calls, triangles, and active pools.
- Target stable 60 FPS; lower distant detail before combat readability or core/quiz clarity.

## Accessibility

- Full keyboard/mouse and controller support.
- Remappable actions and independent aim/move sensitivity.
- Hold/toggle options for aim, sprint, build, and rapid fire.
- UI scale, subtitle scale, color-blind-safe role patterns, reduced camera shake, and reduced flashes.
- Quiz never depends only on color; answer number and physical position remain stable.
- Tower range, valid placement, enemy armour, and elemental states use shape plus color.
- Pause freezes solo simulation and audio safely.

## Integrated Review

- Static and structural checks run before any visual review.
- Visual review evaluates the final integrated build, not isolated prototypes.
- Use the existing browser, preview, capture, interaction, and performance tools in the host project.
- Establish fixed seed, viewport, DPR, quality, map, wave, camera, and load before comparison.
- Inspect one representative early farm, one build state, one quiz pressure state, and one boss state.
- One independent critic returns the strongest evidenced gap, its owner, and exact acceptance condition.
- Rerun review only after a material correction or a new concrete question.
- Never invent user approval, a visual win, or measured runtime.

