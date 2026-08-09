# Wildcore: Bloom Siege — UI Build Prompt

**Use:** Copy the full fenced block as a standalone interface implementation request.
**Scope:** Start, HUD, growth/build, quiz, Seed Vault, settings, defeat, result, accessibility.
**References:** Use all ten local `assets/` images as composition targets, never full-screen runtime textures.

```text
CREATE WILDCORE: BLOOM SIEGE — COMPLETE LIVING UI AND PLAYER FLOW

MISSION

Build the shippable interface for an original elevated-camera living-farm defense shooter quiz.
The interface must feel organic, bright, premium, expressive, and practical.
The world, heroes, enemies, routes, defenses, and elemental fields remain the primary screen.
Organic does not mean irregular alignment or unreadable decorative vines.
Use the host UI stack, input, renderer integration, state, audio, build, persistence, and tests.
Never create a second renderer, world, camera, gameplay host, audio graph, input owner, or frame loop.
Never duplicate Gold, Insight, Core Seeds, Core health, quiz, wave, weapon, skill, or defense state.
Copy no proprietary fantasy interface, icon, rune, font, animation, terminology, sound, or brand.

QUALITY BAR

- Premium current action-game responsiveness.
- Clear deterministic tower-defense information.
- Friendly all-ages surface with deep tactical meaning.
- Real shippable UI, not an illustrated frame pasted over gameplay.
- Shape, pattern, position, and number support every color state.
- No fake runes, decorative unreadable glyphs, growing vines across text, or mobile reward clutter.
- Every control maps to real state/action.
- Every disabled state explains why.
- Every modal restores focus, input context, simulation, pointer, and audio.

REFERENCES

- `assets/00-title-start.png`: living farm and two guardian cards.
- `assets/01-wave-one-farm.png`: ordinary world scale and low HUD density.
- `assets/02-build-mode.png`: growth ghost, path legality, six-slot seed tray.
- `assets/03-quiz-event.png`: seed-memory question and four answer petals.
- `assets/04-defense-family.png`: six living defense silhouettes.
- `assets/05-classes-weapons.png`: two hero bodies and tools.
- `assets/06-upgrade-interface.png`: physical weapon in Seed Vault.
- `assets/07-boss-wave.png`: vivid maximum combat readability.
- `assets/08-wave-thirty-endgame.png`: fully grown farm and result choice.
- `assets/09-future-maps.png`: two future maps, total lifetime cap three.
Recreate the system using DOM, canvas, SVG, or host-native components.
Static image crops are allowed only for explicit map previews.

FIRST READ

- Living farm, hero, root route, enemies, defenses, and seed-memory Core read before decorative form.
- Wave, Core health, Gold, Insight, weapon state, and three skills are readable without a panel.
- Growth mode exposes facing, range, valid soil, and the final-open-route rule immediately.
- Quiz state shows one memory question and exactly four physical answer petals during live pressure.
- Growth, warning, failure, disabled, selected, and correct states remain distinct without color alone.

OWNERSHIP

- Host state owns gameplay, economy, wave, quiz, loadout, defense, score, and persistence truth.
- UI selectors create presentation-only view models from authoritative snapshots.
- UI commands request actions and display authoritative success or rejection reasons.
- One shell owns focus, pointer lock, input contexts, modal stacking, pause, and teardown.
- No component creates a timer, wallet, damage rule, unlock rule, or alternate reset path.

PRODUCT TRUTH

- Field Ranger uses seed-metal firearms and Focus.
- Elemental Technician uses engineered elemental devices and Core Charge.
- Exactly three active abilities are equipped.
- Enemies follow active routes toward a living seed-memory Core.
- Four physical answer petals/pylons surround the Core.
- Shooting or interacting resolves one answer.
- Gold is run currency.
- Insight is correct-answer run currency.
- Core Seeds are persistent milestone currency.
- Free weapons arrive at waves 1, 3, 5, 7.
- Later premium devices cost earned Gold from wave 8.
- Wave 30 completes the authored Bloom Siege.
- Player chooses Extract or Continue Endless.
- No paid currency, random loot, battle pass, daily energy, or rotating shop.

VISUAL SYSTEM

- Product name: `WILDCORE: BLOOM SIEGE`.
- Primary backing: bark shadow `#27362E` with stable opacity.
- Primary face: warm ceramic `#D9C7A2`.
- Growth/valid/friendly: canopy jade `#2F7255` and young leaf `#83AE58`.
- Core state: coral `#F06E62`.
- Earned selection/electric: pollen gold `#E5BF55`.
- Water/frost/system: water blue `#4AB7C8`.
- Gravity/corruption/high threat: violet `#7459B8` plus broken pattern.
- Body typography: friendly rounded sans with strong lowercase distinction.
- Numerals: condensed sturdy companion face.
- Tabs may use petal silhouettes but align to a strict shared grid.
- Panels use solid dark backing before ceramic translucency.
- Icons use clear silhouettes and one role pattern.
- No rainbow energy, candy gradients, or universal glow border.
- Animation follows state, not global decorative time.

LAYOUT

- Baseline 16:9 desktop.
- Support 16:10, ultrawide, narrow laptop.
- Preserve center 55% for aim, enemies, Core, routes, towers, and answer petals.
- Top left: Core and current objective.
- Top center: temporary wave bloom or quiz ribbon.
- Top right: wave, enemies, score multiplier, modifier.
- Bottom left: hero health and class resource.
- Bottom center: weapon/charge and exactly three skills.
- Bottom right: Gold, Insight, Grow mode, context action.
- No permanent full map unless gameplay requires one.
- World markers use seed-shaped silhouette and directional stem.
- Avoid overlap at 1280×720.
- UI scale 80–140%.
- Reduce petals/ornament before text/hit targets.

START

- Start owns no running simulation.
- Show Bloomstead Basin and living Core.
- Exactly two equal guardian cards.
- Ranger: firearm, Focus, precision, repair, reliable contact.
- Technician: engineered elements, Core Charge, AoE, control, reactions.
- Ranger uses leaf-cloth/ceramic silhouette.
- Technician uses crystal gauntlets/sap reactor/pollinator drone.
- Selected card gains gold rim and jade growth notch.
- Keyboard/controller focus visible without hover.
- Primary action says `GROW THE DEFENSE`.
- Disabled state says `Choose a guardian`.
- Corner Settings allowed.
- No account, shop, news, social, season, character editor, or nested mode flow.
- Show future maps only as two locked preview cards after base map exists.

LOADING

- Show `BLOOMSTEAD BASIN` and class.
- One relevant control tip.
- Real progress only if real progress exists.
- Otherwise use bounded seed-opening mechanism.
- Never fake percentages.
- Start only after pools, shaders, world, state, and input ready.
- Failure preserves selection and offers Retry.

CORE HUD

- Show current/max health and shield.
- Coral ring represents health with numeric value.
- Incoming damage cracks one ring segment and adds directional marker.
- Under 25%, use violet/coral plus broken-root pattern.
- Between-wave restoration reports amount once.
- Repair shows Gold cost and resulting health.
- Denial says exact missing Gold/state.
- Do not pulse all foliage/UI continuously.

HERO HUD

- Health and Focus/Core Charge use bar plus number.
- Weapon block shows name, growth level, ammo/reserve or heat/charge.
- Reload/vent remains near weapon.
- Swap list appears briefly then closes.
- Premium devices stay hidden until catalogue opens.
- Incoming direction uses edge petals with distance falloff.
- Do not cover hero with a large portrait.

SKILLS

- Exactly three equipped slots.
- Each shows binding, silhouette, cooldown, seconds, cost, restriction.
- Ranger frames are ceramic/leaf; Technician frames are crystal/sap.
- Cooldown closes as dark bark ring.
- Insufficient charge uses dry-leaf hatch plus exact requirement on focus.
- Buffered action gets small seed pulse.
- Ready cue is one brief unfurl.
- Reduced motion uses opacity and border only.
- No color-only elemental identity.

WAVES

- Preparation shows next wave, gates, roles, modifier, countdown.
- `START WAVE` shows exact early-start Gold.
- Combat collapses to wave/enemies.
- Boss waves 10, 20, 30 have one nameplate and mechanic hint.
- Boss health appears only while active.
- Endless shows ten-wave season/modifier deck and risk multiplier.
- Large banners retract before player control resumes.

GROW MODE

- Enter one exclusive input context.
- Show at most six structures.
- Slot shows silhouette, key, stock, Gold.
- Selected is pollen gold.
- Valid growth ghost is jade-gold with translucent physical mass.
- Invalid is violet/coral with one reason.
- Reasons: core, gate, slope, water, occupied, route, range, stock, valid.
- Show facing for Seed Spitter, Dew Fan, Pressure Reed.
- Show range/footprint as thin ground foliage boundary with transparent interior.
- Show every root-gate route to Core.
- Local planting grid exists only near candidate.
- Living Fence chain shows joints and total cost.
- `PATH CLOSED` identifies gate.
- Confirm spends after authoritative validation.
- Cancel costs nothing.
- Sell/compost returns 70% preparation, 40% combat.
- Repair/regrow shows exact missing health and Gold.
- Exit clears ghosts, routes, focus, and bindings.

QUIZ BLOOM

- Physical answer petals are primary.
- Top ribbon mirrors question, timer, streak, consequence.
- No second clickable answer list.
- Exactly four answers.
- Aim highlight uses gold edge and a thin pollen line.
- Optional 1–4 bindings use stable order.
- Question target 62 characters.
- Answer target 32 over two lines.
- Timer starts at 15 seconds.
- Timeout keeps question open and spawns bounded pressure group.
- Correct uses gold/white/jade, grants Insight, Gold bonus, three buffs.
- Wrong uses violet/coral, adds threat, pauses shield recovery.
- Timeout never reveals correct answer.
- Live combat continues.

BUFF CHOICE

- Exactly three deterministic seed cards.
- Name system, value, duration, stack rule.
- No rarity or hidden roll.
- Solo simulation may slow to 25% for at most three seconds.
- Timeout picks deterministic safe option and reports it.
- Active buffs live in collapsed Growth Rings drawer.

SEED VAULT

- Open during preparation at physical station or authorized shortcut.
- Real mounted seed-metal weapon is the largest object.
- No weapon screenshot.
- Tabs: WEAPON, TOWER, FENCE, ABILITY.
- Gold and Insight remain visible.
- Five deterministic weapon growth levels.
- Branch cards show current, candidate, delta, cost, requirement, physical change.
- Use sign/arrow/pattern, not color alone.
- Tower tab groups six living structures by role.
- Fence tab shows health, breach, gate, support branch.
- Ability tab shows six skills and exactly three equipped.
- One free pre-wave-10 respec.
- Later respec states cost.
- Purchase commits once or not at all.
- Close restores input/camera/focus/pointer.

SETTINGS

- Controls, Gameplay, Video, Audio, Accessibility.
- Expose only working host values.
- Remap, sensitivities, hold/toggle, controller prompts.
- Damage numbers, aim assist if real, auto-start, tutorials.
- Quality, resolution scale, shadows, vegetation/effects, frame limit.
- Real master/weapons/effects/towers/enemies/ambience/music/UI/quiz buses.
- UI/subtitle scale, color-safe patterns, reduced shake/flashes, vegetation motion reduction.
- Solid readable backing.
- Confirm destructive reset.

PAUSE AND FOCUS

- Host pauses solo simulation/timers/audio safely.
- Release pointer.
- Resume, Settings, Restart Bloom, Return to Title.
- Restart/return state unbanked loss.
- Resume restores correct context.
- Focus loss follows host policy and clears fire edges.
- Gameplay input never leaks into UI.

DEFEAT

- Consume one immutable final snapshot.
- Show wave, score, kills, quiz, Core, tower damage, Gold, secured Seeds.
- Distinguish banked and lost.
- RETRY and RETURN TO TITLE.
- Retry preserves class and resets all transient UI.
- Never query mutable game after seal.

WAVE 30

- Title `BLOOM COMPLETE`.
- Show score, quiz, Core, Core Seeds, key build path.
- EXTRACT banks and ends.
- CONTINUE ENDLESS enters 31.
- Explain secured milestones and risk.
- Both actions are valid.
- No stars, crates, store, pass, or cash prompt.

ACCESSIBILITY AND INPUT

- Keyboard/mouse and controller equal.
- Visible focus everywhere.
- No pointer-only gesture.
- Remapped labels update.
- No controller focus trap.
- Answers and element roles use number, position, shape, pattern.
- Reduced motion/flash applies across UI and world-marker feedback.
- Safe-area aware.
- DOM focus and gameplay action never double-fire.

STATE ARCHITECTURE

- One UI root.
- Separate coherent owners for start, HUD, grow, quiz, Vault, settings, pause, defeat, result.
- One currency/binding formatter source.
- Stable selectors/events, no polling when avoidable.
- No state writes during render.
- No per-frame global store writes for ornament.
- Fixed-cap markers, damage numbers, notifications.
- Dispose subscriptions/listeners/timers/observers.
- One reset clears transient UI/focus.

MOTION AND AUDIO

- Selection: soft ceramic tap and short leaf movement.
- Purchase: root latch, seed resonance, restrained gold confirmation.
- Invalid: dry twig/ceramic stop.
- Correct: clear layered seed chord.
- Wrong: low Core strain without alarm loop.
- Motion normally 120–240 ms.
- Avoid continuous vines around every control.
- Respect reduced motion and host buses.

PERFORMANCE

- No unbounded queues.
- Avoid frame-value layout reflow.
- Throttle noncritical text.
- Batch/project world markers through host path.
- Cull offscreen markers.
- No component per leaf, particle, enemy part, projectile, tower petal.
- Measure UI during boss elemental load.
- Reduce ornament before critical information.

EXECUTION

- Inspect host UI, state, gameplay definitions, events, input, audio, persistence, tests.
- Extend plan before code if required.
- Build tokens/shell, start/loading, HUD/skills/waves.
- Build Grow mode and path feedback.
- Build quiz and buff choice.
- Build Seed Vault.
- Build settings/pause/defeat/result.
- Close accessibility, input, reset, audio, responsive, performance.
- Sub-agents only if host permits and files are disjoint.
- One integration owner.

VALIDATION

- Run canonical static/build gates.
- Exercise every state with deterministic fixtures/diagnostics.
- Verify pointer/keyboard/controller/remapping/focus/restart.
- Verify 1280×720, baseline, ultrawide, narrow laptop.
- Verify UI scale 80/100/140%.
- Verify color-safe/pattern/reduced-motion states.
- Verify no invented currency, stat, action, prerequisite.
- Prompt authorizes one bounded integrated browser/preview review with existing tools.
- Inspect start, ordinary wave, Grow, quiz, Vault, boss, wave 30 in one session where practical.
- Critic returns one strongest evidenced gap, owner, acceptance condition.
- Repeat only after material correction/new question.
- Never invent approval/performance/visual victory.

DONE WHEN

- Start explains two classes and begins cleanly.
- Bright living HUD preserves combat center.
- Exactly three skills remain readable.
- Grow mode explains role, direction, range, route, stock, cost.
- Quiz is live and physical with four petals.
- Seed Vault presents real weapon and deterministic growth.
- Gold, Insight, Core Seeds, score, Core remain owner-correct.
- Pause, retry, Extract, Endless restore correct state.
- Supported inputs/accessibility work.
- Gates pass and measured UI cost stays within host budget.
- Final taste remains user gate.

Continue until this UI contract is met or a real external boundary is documented.
```
