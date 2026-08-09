# Aetherfield: Skygarden Defense — UI Build Prompt

**Use:** Copy the complete fenced block as a standalone UI implementation request.
**Scope:** Product shell, HUD, quiz, build, upgrade, settings, defeat, results, accessibility.
**Visual references:** Load all ten images in `assets/`; treat them as composition targets, not textures.

```text
CREATE AETHERFIELD: SKYGARDEN DEFENSE — COMPLETE UI AND PLAYER FLOW

MISSION

Build the complete shippable interface for an original high-bird's-eye 3D farm-defense shooter quiz.
The interface must feel bright, warm, map-first, tactile, modern, and practical.
It must preserve the world as the main visual surface.
It must never look like a generic fantasy mobile overlay.
It must never imitate another game's proprietary UI, iconography, layout, branding, or wording.
Use the host project's existing language, UI framework, renderer integration, build system, and tests.
Do not create a second renderer, world, camera, audio graph, gameplay host, or frame loop.
Integrate with existing gameplay state through explicit selectors, events, commands, or host-native contracts.
Do not create shadow state for Gold, Insight, Core health, waves, weapons, skills, towers, or quiz answers.

QUALITY BAR

Target the clarity and response of a premium current PC action game.
Target the information discipline of a strong modern tactical shooter.
Target the scan speed of a clean field atlas built for a wide bird's-eye battlefield.
Use those qualities only.
Copy no asset, screen, logo, font treatment, icon, animation, sound, or exact layout.
Every visible control must map to a real action.
Every number must come from a real state owner.
Every disabled state must explain its reason.
Every modal must restore focus, input context, pointer state, and simulation state correctly.

REFERENCE IMAGES

Read these project-local references before implementation:
- `assets/00-title-start.png`: title, world-first start flow, two class cards.
- `assets/01-wave-one-farm.png`: ordinary gameplay scale and minimal HUD footprint.
- `assets/02-build-mode.png`: placement state, route rule, six-slot build rail.
- `assets/03-quiz-event.png`: top question, four physical answers, live combat pressure.
- `assets/04-defense-family.png`: defense silhouettes used by build icons.
- `assets/05-classes-weapons.png`: class silhouettes and equipment language.
- `assets/06-upgrade-interface.png`: physical weapon bench and four upgrade families.
- `assets/07-boss-wave.png`: maximum combat pressure and HUD survival.
- `assets/08-wave-thirty-endgame.png`: complete result and Extract/Endless choice.
- `assets/09-future-maps.png`: future-facing map cards only.
Do not place these PNGs directly into gameplay as full-screen UI.
Reconstruct the visual system with real DOM, canvas, SVG, or host-native UI components.
Use image crops only where the product explicitly needs a static map preview.

FIRST READ

- World, selected hero, active lane, enemies, defenses, and Quiz Core read before chrome.
- Wave, Core health, Gold, Insight, weapon state, and three skills are readable without opening a panel.
- Build mode makes facing, range, valid ground, and the final-open-route rule immediately clear.
- Quiz state shows one question and exactly four physical answer pylons without pausing combat.
- Critical, disabled, selected, correct, and wrong states remain distinct without color alone.

OWNERSHIP

- Host state owns gameplay, economy, wave, quiz, loadout, structure, score, and persistence truth.
- UI selectors transform authoritative snapshots into presentation-only view models.
- UI commands request actions and display authoritative success or rejection reasons.
- One shell owns focus, pointer lock, input contexts, modal stacking, pause, and teardown.
- No component creates a timer, wallet, damage rule, unlock rule, or alternate reset path.

PRODUCT TRUTH

- One player controls either Field Ranger or Elemental Technician.
- The camera is perspective 3D pitched 60–65 degrees downward, never shoulder-level or a static board view.
- The player moves, aims, shoots, builds, answers, upgrades, and repairs.
- Enemies travel from active gates toward a central Quiz Core.
- The Core has health and can end the run.
- Four physical answer pylons surround the Core.
- A quiz is answered by shooting or interacting with one pylon.
- Gold is run currency.
- Insight is run knowledge currency.
- Core Seeds are persistent milestone currency.
- Two classes each equip exactly three active abilities.
- Weapons are granted at waves 1, 3, 5, and 7.
- Later premium weapons are bought with earned Gold.
- Wave 30 ends the authored siege.
- The player then chooses Extract or Continue Endless.
- No paid currency, loot box, battle pass, energy timer, or rotating offer exists.

VISUAL IDENTITY

- Name: `AETHERFIELD: SKYGARDEN DEFENSE`.
- Base surface: ivory field-map panels over solid charcoal backing.
- Structural rails: honey timber with simple cloud-limestone corner caps.
- Neutral selection: lavender.
- Valid, charged, correct, and friendly: restrained mint aether.
- Invalid, wrong, core-critical, and hostile: coral.
- Gold resource: warm amber, never neon yellow.
- Insight resource: pale mint-white with a small faceted seed symbol.
- Core Seeds: coral-gold seed facets.
- Data typography: rounded humanist sans with open counters and broad numerals.
- Title may use one restrained carved display face; quiz copy stays in the data face.
- Never place textured paper directly behind small text without an opaque backing.
- Never use glow as the only boundary between UI and world.
- Never use mint as a decorative wash.
- Never use more than one strong accent in a local control group.

LAYOUT GRID

- Design from a 16:9 desktop baseline.
- Support ultrawide, 16:10, and narrower laptop ratios.
- Keep all critical HUD inside a safe region independent of browser chrome.
- Preserve the central 62% of the image for farm, aim, enemies, lanes, towers, and quiz pylons.
- Use compact corner clusters rather than a permanent bottom dashboard.
- Top left: Core status and current objective.
- Top center: wave banner or quiz question, never both at full size.
- Top right: wave, enemies, score multiplier, and short modifiers.
- Bottom left: hero health, shield if present, class resource.
- Bottom center: weapon/ammo plus exactly three equipped skills.
- Bottom right: Gold, Insight, build availability, contextual action.
- Avoid overlap at 1280×720 with UI scale 100%.
- Support UI scale from 80% to 140%.
- Panels with changing content keep stable outer dimensions and scroll internally if required.

START FLOW

- The initial screen owns no active gameplay simulation.
- Show the title over a live or representative Skygarden Expanse view.
- Offer exactly two class cards.
- `FIELD RANGER` card shows firearm role, Focus passive, and three short strengths.
- `ELEMENTAL TECHNICIAN` card shows emitter role, Core Charge passive, and three short strengths.
- Both cards have equal size and production depth.
- Selection state uses a honey-timber frame plus restrained mint mechanism light.
- Keyboard and controller focus must be obvious without hover.
- Primary action says `START`.
- Start remains disabled until a class is selected.
- Disabled copy says `Choose a class`.
- Do not add account, news, store, character creator, social panel, or nested mode browser.
- A compact `Settings` control may appear in a corner.
- Future maps may appear only inside a locked map-info carousel after the base map is complete.
- Do not imply more than three lifetime maps.

LOADING

- Use one short loading state after Start.
- Show map name `SKYGARDEN EXPANSE`.
- Show selected class and one relevant control tip.
- Show real progress only when the host exposes real progress.
- Otherwise use a bounded indeterminate farm mechanism animation.
- Never fake percentages.
- Never begin audio voices, timers, or gameplay before readiness.
- Readiness failure gives a plain retry action and preserves selection.

CORE HUD

- Core display includes icon, current health, maximum health, and shield state if active.
- Core damage produces a short edge pulse and directional world indicator.
- Do not shake the whole HUD continuously.
- Critical state below 25% uses vermilion plus a broken-ring pattern.
- Regeneration between waves shows the restored amount once.
- Repair action shows cost and resulting health before confirmation.
- If repair is unavailable, state `Need X Gold` or `Cannot repair during wave`.

PLAYER HUD

- Health uses a compact bar plus number.
- Class resource is labelled `FOCUS` or `CORE CHARGE`.
- Resource animation follows actual gain/loss, not global time.
- Weapon block shows current weapon, ammo or heat, reserve, reload, and upgrade level.
- Reload communicates progress without a giant radial over the crosshair.
- Premium energy weapons replace ammo display with heat/charge only when definition requires it.
- Weapon swap list appears briefly, then collapses.
- Do not show undiscovered premium weapons during early onboarding.

SKILL BAR

- Show exactly three equipped active skills.
- Each slot shows action binding, silhouette icon, cooldown fill, remaining seconds, and resource state.
- Ranger and Technician use the same HUD geometry but distinct chunky voxel silhouettes and material treatment.
- Cooldown darkens from the edge inward.
- Insufficient resource uses a stable hatch pattern plus exact requirement on focus.
- Air/ground restrictions appear only when relevant.
- A buffered action receives a short pending notch.
- Skill ready cue is brief and does not repeat every frame.
- Icons must remain readable without color.

WAVE UI

- Preparation banner shows next wave number, active gates, enemy traits, and countdown.
- Countdown is a real timer owned by the wave system.
- `START WAVE` allows early start.
- Early start bonus shows exact Gold before activation.
- Combat state shows wave and enemies remaining.
- Boss waves 10, 20, and 30 receive one authored nameplate.
- Never keep a giant wave banner during combat.
- Clear message lasts briefly and yields to upgrade/build state.
- Endless state shows `ENDLESS 31+` and current ten-wave modifier deck.

BUILD MODE

- Enter through the host-defined build action.
- Swap input context explicitly; do not listen in parallel with combat bindings.
- Show a compact tray with at most six structures.
- Each slot shows silhouette, hotkey, stock if limited, and Gold cost.
- Selected slot uses oat-gold/lavender.
- Valid ghost uses mint edge plus physical translucent material.
- Invalid ghost uses vermilion and one exact failure label.
- Validity reasons are `core`, `gate`, `slope`, `water`, `occupied`, `route`, `range`, `stock`, `valid`.
- Show facing direction for Sentry, Frost Fan, and Pressure Ram.
- Show range for towers and effect footprint for traps.
- Show active enemy route from each gate to Core.
- Do not fill the whole terrain with a bright grid.
- Grid appears only near the candidate footprint.
- Fence mode previews connected segments and total price.
- Route-blocking preview identifies the blocked gate.
- Confirm consumes stock/currency only after host validation.
- Cancel costs nothing.
- Sell mode shows 70% return outside combat and 40% during combat.
- Repair mode shows missing health and exact Gold cost.
- Build tray collapses immediately when the mode ends.

QUIZ UI

- Physical answer pylons remain the primary answer surface.
- The top HUD mirrors only the question, timer, streak, and current consequence.
- Do not show a second clickable answer list.
- Render exactly four answers in the world.
- Stable answer ordering maps to bindings 1–4 only when keyboard answering is enabled.
- Aim highlight identifies one pylon with shape, rim, and a thin connection to crosshair.
- Question length target is 62 characters or fewer.
- Answer length target is 32 characters or fewer over two lines.
- Timer begins at 15 seconds.
- Timeout keeps the question open.
- Correct state flashes mint/white, grants Insight, and opens a three-card buff choice.
- Wrong state flashes vermilion, shows threat tier increase, and pauses Core shield recovery.
- Never reveal a correct answer after timeout.
- Never obscure enemies or Core damage during the buff choice.
- Solo simulation may slow to 25% for three seconds during buff selection, not pause indefinitely.
- If selection expires, choose the leftmost deterministic safe buff and report it.

BUFF CHOICE

- Show exactly three authored options.
- Each card names affected system, exact value, and duration or run permanence.
- Examples: `+12% Sentry fire rate this run`, `+15% reload speed`, `+8% Core repair efficiency`.
- No rarity colors.
- No random hidden roll.
- Selected buff enters a compact run-effects drawer.
- Drawer remains collapsed during ordinary play.

UPGRADE BENCH

- Open only in preparation at the physical bench or through a host-authorized shortcut.
- Frame the real mounted weapon as the largest visual object.
- Do not use a screenshot of the weapon.
- Tabs are `WEAPON`, `TOWER`, `FENCE`, `ABILITY`.
- Weapon tab shows five deterministic levels.
- Each level offers two authored branches when applicable.
- Tower tab groups six structures by role.
- Fence tab shows health, breach time, gate behavior, and visible tier model.
- Ability tab shows the class's six available skills and exactly three equipped slots.
- Gold and Insight remain visible in the header.
- Compare view uses current, candidate, and delta.
- Positive/negative deltas use arrows and signs, not color alone.
- Purchase button states exact cost.
- Unavailable purchase states exact missing resource or prerequisite.
- One pre-wave-10 respec is free.
- Later respec cost is explicit.
- Closing restores prior input context and camera.

SETTINGS

- Categories: Controls, Gameplay, Video, Audio, Accessibility.
- Reuse host settings and do not invent ineffective toggles.
- Controls support remapping, sensitivity, aim curve, hold/toggle, and controller prompts.
- Gameplay supports damage numbers, aim assist if available, auto-start preference, and tutorial reset.
- Video shows only renderer-supported quality, resolution scale, shadows, effects, and frame limit.
- Audio exposes master, weapons, effects, ambience, music, UI, and quiz cues if buses exist.
- Accessibility supports UI scale, subtitle scale, color-safe patterns, reduced shake, reduced flashes, and hold alternatives.
- Apply live only where safe.
- Confirm destructive reset actions.
- Settings remain readable over a solid backing.

PAUSE

- Solo pause freezes simulation through the host.
- Pause releases pointer lock safely.
- Menu contains Resume, Settings, Restart Run, Return to Title.
- Restart Run names lost unbanked progress.
- Return to Title names lost unbanked progress.
- Resume restores correct input context and pointer request.
- No duplicate audio graph or timer continues behind pause.

DEFEAT

- Trigger only from the final run snapshot.
- Show wave reached, score, kills, quiz accuracy, Core health at failure, tower damage, Gold earned.
- Show secured Core Seeds separately from lost unbanked rewards.
- Actions: `RETRY` and `RETURN TO TITLE`.
- Retry preserves class selection and resets all run UI state.
- Never query mutable gameplay after the defeat snapshot is sealed.

WAVE-30 RESULT

- Title: `SIEGE COMPLETE`.
- Show Wave 30, score, quiz accuracy, Core health, and Core Seeds.
- `EXTRACT` banks rewards and ends the run.
- `CONTINUE ENDLESS` enters wave 31 with visible risk and score multiplier.
- Neither action is visually treated as wrong.
- Explain that Endless defeat keeps only secured boss milestones.
- Do not add loot opening, star ratings, or monetization.

RESPONSIVE AND INPUT

- Keyboard/mouse and controller are equal first-class paths.
- Pointer focus, DOM focus, and gameplay input never fire the same action twice.
- Visible focus ring exists on every interactive control.
- All pointer-only gestures have a button or key alternative.
- Controller navigation never traps focus inside a scrolling list.
- Hotkey labels update after remapping.
- Safe-area insets support browser and platform overlays.
- At narrow ratios, reduce ornament before text size or hit targets.
- Minimum hit target follows host accessibility standard.

STATE AND ARCHITECTURE

- One UI composition root owns shell routing and overlays.
- Split start, HUD, build, quiz, upgrade, settings, pause, defeat, and result into coherent owners.
- Use one source for currency formatting and one source for input labels.
- Derived values are calculated from stable snapshots or selectors.
- No polling when events/selectors exist.
- No state write during render.
- No global store update every frame.
- Damage numbers, notifications, and markers use fixed-cap pools or bounded queues.
- Dispose subscriptions, timers, observers, and listeners.
- UI restart clears transient queues, open modals, focus traps, and animation state.

AUDIO AND MOTION

- UI audio uses host buses.
- Selection is a soft timber tick with one mint mechanism click.
- Purchase combines mechanical latch and restrained aether response.
- Invalid is a short dry wood/metal stop, never a harsh alarm loop.
- Correct quiz is a clear layered chime that cuts through combat.
- Wrong quiz is a short low warning plus Core response.
- Motion communicates state change in 120–240 ms where appropriate.
- Respect reduced motion.
- Avoid continuous idle animation on every panel.

PERFORMANCE

- UI must not allocate unbounded notifications or damage labels.
- Avoid layout thrash from per-frame world values.
- Update ordinary text at a sensible cadence when frame-exact display is unnecessary.
- World markers use batched or host-native projection paths.
- Hide offscreen markers early.
- Do not create one reactive component per crop, enemy part, projectile, or tower barrel.
- Measure UI contribution under boss-wave load.
- Preserve 60 FPS target on defined hardware without hiding critical state.

EXECUTION

- First inspect the host architecture, UI owner, events, input contexts, gameplay definitions, and tests.
- Write or extend the project task plan before code when host rules require it.
- Implement shared tokens and shell foundations first.
- Complete start and loading.
- Complete gameplay HUD and skill bar.
- Complete build mode and route messaging.
- Complete quiz and buff choice.
- Complete upgrade bench.
- Complete pause, settings, defeat, and result.
- Integrate input, accessibility, audio, restart, and persistence edges.
- Use sub-agents only when the host explicitly permits them and file ownership is disjoint.
- One integration owner resolves all shared state and styling decisions.

VALIDATION

- Run host canonical static and build gates.
- Check every interface state with deterministic fixture data or existing host diagnostics.
- Verify no unknown currency, action, tower, weapon, skill, or quiz state is invented.
- Verify keyboard, pointer, and controller paths.
- Verify restart, class switch, pause, defeat, Extract, and Endless transitions.
- Verify 1280×720, baseline 16:9, ultrawide, and one narrow laptop ratio.
- Verify UI scale 80%, 100%, 140%.
- Verify color-safe patterns and reduced effects.
- This prompt authorizes one bounded integrated browser/preview review using existing host tools.
- Inspect start, ordinary combat, build, quiz, upgrade, boss, and wave-30 states in one session where practical.
- Do not build a new screenshot harness unless the host already requires one.
- Independent critic returns one strongest evidenced UI gap, one owner, one acceptance condition.
- Repeat review only after a material correction or a new concrete question.
- Never invent approval or visual success.

DONE WHEN

- A new player can select a class and start without explanation.
- Ordinary combat HUD leaves the world and aim cone clear.
- Build mode explains cost, orientation, range, stock, and route legality.
- Quiz uses one top question and four physical world answers.
- Correct, wrong, and timeout outcomes are distinct and honest.
- Upgrade bench presents the real weapon and deterministic choices.
- Exactly three equipped skills remain readable under boss pressure.
- Gold, Insight, and Core Seeds never diverge from their owners.
- Pause, restart, defeat, Extract, and Endless restore correct state.
- All supported inputs and accessibility settings function.
- UI remains coherent at required ratios and scales.
- Static gates pass.
- Measured UI cost stays inside host budget.
- Final visual taste remains an explicit user gate.

Continue until this complete interface contract is met or a real external boundary is documented.
```
