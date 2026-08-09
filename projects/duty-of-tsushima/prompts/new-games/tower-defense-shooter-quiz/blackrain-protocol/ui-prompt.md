# Blackrain Protocol — UI Build Prompt

**Use:** Copy the full fenced block as a standalone interface implementation request.
**Scope:** Start, HUD, build, quiz, armoury, settings, defeat, results, accessibility.
**References:** Use all ten local `assets/` images as visual targets, never full-screen runtime textures.

```text
CREATE BLACKRAIN PROTOCOL — COMPLETE TACTICAL UI AND PLAYER FLOW

MISSION

Build the shippable interface for an original elevated-camera farm-defense shooter quiz.
The product is a storm-night agricultural defense operation, not a military-game imitation.
Make the UI precise, compact, tactile, high contrast, and useful under rain, smoke, recoil, and boss pressure.
Keep the 3D world dominant.
Use the host project's UI framework, renderer integration, input, state, audio, build, and tests.
Do not create another renderer, camera, world, gameplay host, audio graph, or frame loop.
Do not duplicate Gold, Insight, Core Seeds, Vault health, wave, quiz, weapon, skill, or structure state.
Copy no proprietary UI grid, icon, insignia, font, animation, sound, terminology, or brand treatment.

QUALITY BAR

- Premium current PC action-game responsiveness.
- Strong tactical-shooter information discipline.
- Real product UI, not decorative sci-fi concept art.
- Fast aim-to-state comprehension under a dark world.
- No fake microtext, meaningless waveform, ornamental reticle, or panel without a data owner.
- No transparent glass directly behind important text.
- Every disabled control names the missing resource, prerequisite, or state.
- Every modal restores focus, pointer, input context, simulation, and audio correctly.

REFERENCE SET

- `assets/00-title-start.png`: storm-night title and two operator cards.
- `assets/01-wave-one-farm.png`: ordinary camera, farm, Vault, and HUD density.
- `assets/02-build-mode.png`: cyan valid ghost, red route failure, six-slot rail.
- `assets/03-quiz-event.png`: live protocol with four rugged answer terminals.
- `assets/04-defense-family.png`: silhouettes used by defense icons.
- `assets/05-classes-weapons.png`: class and equipment identity.
- `assets/06-upgrade-interface.png`: physical carbine in Field Armoury.
- `assets/07-boss-wave.png`: maximum rain, smoke, effects, enemies, and telegraphs.
- `assets/08-wave-thirty-endgame.png`: dawn-break extraction result.
- `assets/09-future-maps.png`: two future map cards, never more than three maps total.
Rebuild UI with real DOM/canvas/SVG/host-native components.
Use static crops only for explicit map previews.

FIRST READ

- Wet grow-site, operator, active route, Vault, enemies, and defenses read before telemetry panels.
- Wave, Vault health, Gold, Insight, weapon state, and three skills remain readable under rain.
- Build mode exposes facing, range, valid ground, and the final-open-route rule at a glance.
- Quiz state shows one protocol question and exactly four physical terminals during live pressure.
- Online, warning, failure, disabled, selected, and correct states work without color alone.

OWNERSHIP

- Host state owns gameplay, economy, wave, quiz, loadout, structure, score, and persistence truth.
- UI selectors create presentation-only view models from authoritative snapshots.
- UI commands request actions and render authoritative success or rejection reasons.
- One shell owns focus, pointer lock, input contexts, modal stacking, pause, and teardown.
- No component creates a timer, wallet, damage rule, unlock rule, or alternate reset path.

PRODUCT TRUTH

- Field Ranger uses firearms and Focus.
- Elemental Technician uses engineered emitters and Core Charge.
- Each equips exactly three active abilities.
- Enemies cross active gates toward an obsidian Quiz Vault.
- Four physical answer terminals surround the Vault.
- Answer by shooting or interacting with one terminal.
- Gold is run currency.
- Insight is correct-answer run currency.
- Core Seeds are secured persistent milestones.
- Weapons are granted at waves 1, 3, 5, 7.
- Premium weapons are earned Gold purchases from wave 8.
- Wave 30 ends the authored Protocol.
- Player chooses Extract or Continue Endless.
- No real-money currency, loot rarity, battle pass, energy, or rotating offers.

VISUAL SYSTEM

- Product name: `BLACKRAIN PROTOCOL`.
- Primary backing: rain black `#0D1218` at readable opacity.
- Structural surface: gunmetal `#27313A` with thin hard rails.
- Stable neutral: wet concrete `#5E6870`.
- Friendly/online/valid: signal cyan `#39C8D8`.
- Selected/caution: work amber `#E0A24A`.
- Hostile/invalid/critical: threat red `#DF4D48`.
- Crop green appears in world context, not core UI data.
- Typography: one condensed sans with open counters and strong numerals.
- Headings may use wider tracking; body copy must not.
- Icons use silhouette plus pattern, never color alone.
- Glass panels use opaque charcoal text plates.
- Reflections remain subtle and never move behind text.
- Rain may streak outside panels, never inside content.
- Cyan is not a universal border.
- Red appears only for real threat or invalid state.

LAYOUT

- Start at 16:9 desktop and support 16:10, ultrawide, narrow laptop.
- Preserve central 55% for player aim, lane, enemies, Vault, answers, and telegraphs.
- Top left: Vault and objective.
- Top center: temporary wave banner or quiz question.
- Top right: wave, enemies, score multiplier, modifier.
- Bottom left: operator health, armour, class resource.
- Bottom center: weapon/ammo/heat and three skills.
- Bottom right: Gold, Insight, Build state, context action.
- No permanent minimap unless gameplay owner exposes required spatial information.
- Use world markers for gates and Core Threats.
- Avoid overlap at 1280×720 and UI scale 100%.
- Support UI scale 80–140%.
- Narrow layouts drop decorative telemetry before labels or hit targets.

START

- Start owns no active combat simulation.
- Show live or representative Blackrain Grow-Site under rain.
- Show exactly two equal operator cards.
- Ranger card: firearm, Focus, precision, repair, single-target control.
- Technician card: emitter, Core Charge, area control, material reaction.
- Selected card receives amber rail and cyan online notch.
- Focus state is visible without hover.
- Primary action says `DEPLOY`.
- Deploy is disabled until class selection and says `Select an operator`.
- Corner Settings control is allowed.
- No account, news, shop, social, loadout maze, season, or paid offer.
- Future maps appear locked only as two preview cards after base map is present.

LOADING

- Show `BLACKRAIN GROW-SITE` and selected operator.
- Show one relevant control tip.
- Use real progress only when real progress exists.
- Otherwise show a bounded pump/sensor animation.
- Never fake a percent.
- Publish readiness only after shaders, pools, state, and input can start safely.
- Failure preserves selection and offers Retry.

VAULT STATUS

- Show current/max health and shield status.
- Damage adds a short red segment loss and directional world marker.
- Under 25%, use red plus broken-chevron pattern.
- Between-wave recovery reports one amount.
- Repair shows cost and resulting health.
- Denial says `Need X Gold` or `Unavailable during wave`.
- Never pulse the entire screen continuously.

OPERATOR STATUS

- Health, armour, and class resource use compact bars plus values.
- Class label is `FOCUS` or `CORE CHARGE`.
- Weapon block shows name, level, ammo/reserve or heat/charge, reload/vent.
- Reload progress stays adjacent to weapon, not over aim.
- Weapon swap list appears briefly.
- Undiscovered premium weapons stay hidden until catalogue unlock.
- Damage direction comes from world edge markers, not a full red screen.

SKILLS

- Exactly three equipped slots.
- Show binding, icon, cooldown fill, seconds, cost, and disabled reason.
- Cooldown drains in a hard radial/edge sweep.
- Insufficient resource uses diagonal insulation pattern.
- Ground/air restriction appears only when blocking current input.
- Buffered input gets a short pending notch.
- Ready cue is one brief cyan edge sweep.
- Reduced flashes replaces it with opacity/shape change.

WAVES

- Preparation shows next wave, active gates, known roles, modifier, countdown.
- Countdown is authoritative.
- `START WAVE` shows exact early-start Gold.
- Combat collapses to wave and enemies remaining.
- Bosses at 10, 20, 30 get one nameplate and one mechanic hint.
- Boss health appears only while boss is active.
- Endless shows ten-wave deck and risk multiplier.
- Never retain a large banner over combat.

BUILD MODE

- Enter one exclusive host input context.
- Show at most six structure slots.
- Slot shows silhouette, binding, stock, and Gold cost.
- Selected is amber.
- Valid ghost is cyan with physical translucent material.
- Invalid ghost is red with one reason.
- Reasons: core, gate, slope, water, occupied, route, range, stock, valid.
- Display facing cone for directional defenses.
- Display range/footprint.
- Display every active gate route to Vault.
- Local grid appears only around candidate footprint.
- Barrier chain shows connection and total price.
- `NO ROUTE` identifies blocked gate.
- Confirm spends only after authoritative validation.
- Cancel spends nothing.
- Sell shows 70% preparation and 40% combat return.
- Repair shows exact missing health and price.
- Exit removes ghosts, route lines, hover, and build bindings.

QUIZ PROTOCOL

- Physical terminals are primary answers.
- Top ribbon mirrors question, timer, streak, consequence.
- Never render a second answer list.
- Exactly four physical answers exist.
- Aim highlight uses amber brackets and thin line to crosshair.
- Keyboard/controller bindings may map 1–4 in stable order.
- Question target length: 62 characters.
- Answer target length: 32 characters over two lines.
- Timer begins at 15 seconds.
- Timeout keeps question open and adds a small pressure group.
- Correct uses cyan/white and grants Insight, Gold bonus, three buffs.
- Wrong uses red and shows next threat tier plus shield-recovery pause.
- Timeout never reveals correct answer.
- Quiz never pauses combat into a separate screen.

BUFF CHOICE

- Exactly three deterministic cards.
- Show affected system, exact amount, duration, stack rule.
- No rarity color or random hidden roll.
- Selection may slow solo simulation to 25% for at most three seconds.
- Expiry chooses deterministic safe default and reports it.
- Active buffs live in a collapsed Protocol drawer.

FIELD ARMOURY

- Open during preparation at physical station or authorized shortcut.
- Real mounted weapon remains the largest object.
- Never substitute a weapon screenshot.
- Tabs: WEAPON, TOWER, BARRIER, ABILITY.
- Show Gold and Insight continuously.
- Weapon has five deterministic levels.
- Branches show current, candidate, delta, cost, prerequisite, physical part.
- Positive/negative uses sign and arrow, not color alone.
- Tower tab groups six physical structures.
- Barrier tab shows health, breach time, gate behavior, conductive branch.
- Ability tab shows six pool skills and exactly three equipped.
- One pre-wave-10 respec is free.
- Later respec states Gold cost.
- Purchase succeeds once or fails without state change.
- Close restores camera, focus, pointer, and input context.

SETTINGS

- Controls, Gameplay, Video, Audio, Accessibility.
- Only expose host-supported values.
- Remapping, independent aim/move sensitivity, hold/toggle, controller prompts.
- Damage-number toggle, aim assist if implemented, auto-start preference, tutorial reset.
- Real quality, resolution scale, shadows, weather/effects, frame limit.
- Master, weapons, effects, towers, enemies, ambience, music, UI, quiz buses when real.
- UI scale, subtitle scale, patterns, reduced shake, reduced flashes, rain intensity accessibility.
- Confirm destructive reset.
- Do not hide platform failure under a disabled unexplained toggle.

PAUSE AND FOCUS

- Host pause freezes solo simulation and timers.
- Release pointer safely.
- Resume, Settings, Restart Protocol, Return to Title.
- Restart/return state lost unbanked progress.
- Resume restores correct input context.
- Window blur/hidden tab follows host focus-loss policy.
- No gameplay fire/aim leaks into panels.

DEFEAT

- Consume one immutable final snapshot.
- Show wave, score, kills, quiz, Vault, tower damage, Gold, secured Seeds.
- Separate secured from lost unbanked reward.
- Actions: RETRY, RETURN TO TITLE.
- Retry preserves operator and resets all transient UI.
- Never query live gameplay after snapshot.

WAVE 30

- Title `PROTOCOL COMPLETE`.
- Show score, quiz, Vault, Core Seeds, main build summary.
- EXTRACT banks and closes.
- CONTINUE ENDLESS enters wave 31.
- Explain secured milestones and Endless loss risk.
- Both choices have equal visual dignity.
- No stars, crate, battle pass, store, or cash prompt.

ACCESSIBILITY AND INPUT

- Keyboard/mouse and controller are first class.
- Visible focus on all controls.
- No pointer-only action.
- Remapped hotkeys update everywhere.
- Controller navigation never traps inside scroll.
- Quiz and role states use shape, number, position, and pattern.
- Reduced motion and flash are honored across all animations.
- Safe area supports platform/browser overlays.
- Modal DOM focus and gameplay input never activate the same command.

STATE ARCHITECTURE

- One UI composition root.
- Coherent owners for start, HUD, build, quiz, armoury, settings, pause, defeat, result.
- One formatter source for currency and bindings.
- Read stable snapshots/selectors; avoid polling.
- Never write state during render.
- Never update global UI state each frame for cosmetic animation.
- Fixed-cap pools for markers, damage numbers, notifications.
- Dispose listeners, observers, timers, subscriptions.
- One reset path clears transient UI and focus state.

MOTION AND AUDIO

- Selection: short metal tick and amber rail.
- Purchase: latch, receiver movement, restrained cyan confirmation.
- Invalid: dry relay stop.
- Correct quiz: sharp clean protocol chord.
- Wrong: low Vault warning without alarm loop.
- Motion typically 100–220 ms.
- Avoid endless scanlines or animated data on every panel.
- Respect reduced motion and host buses.

PERFORMANCE

- No unbounded UI queue.
- Avoid layout reflow from frame-rate values.
- Throttle noncritical numeric text.
- Project world markers through a batched host path.
- Cull offscreen markers.
- Do not create components per enemy part, rain drop, projectile, tower barrel, or crop.
- Measure UI cost during boss rain load.
- Reduce ornament before critical state.

EXECUTION

- Inspect host UI, gameplay definitions, selectors/events, input contexts, audio, persistence, tests.
- Extend project plan before code when required.
- Implement tokens and shell.
- Implement start/loading.
- Implement HUD/skills/waves.
- Implement build/route feedback.
- Implement quiz/buff choice.
- Implement Armoury.
- Implement settings/pause/defeat/result.
- Close accessibility, input, audio, reset, responsive, performance.
- Use sub-agents only when host permits and ownership is disjoint.
- Keep one integration owner.

VALIDATION

- Run canonical static/build gates.
- Exercise every UI state with deterministic fixtures or host diagnostics.
- Verify pointer, keyboard, controller, remapping, focus, restart.
- Verify 1280×720, baseline, ultrawide, narrow laptop.
- Verify UI scale 80, 100, 140%.
- Verify rain, smoke, red telegraph, cyan valid, amber selection remain distinguishable.
- Verify no invented currency, stat, action, or prerequisite.
- This prompt authorizes one bounded integrated browser/preview review using existing host tools.
- Inspect start, ordinary wave, build, quiz, Armoury, boss, wave 30 in one session where practical.
- Critic returns one strongest evidenced gap, owner, and acceptance condition.
- Repeat only after material correction or new question.
- Never invent approval, performance, or visual victory.

DONE WHEN

- Class selection and Deploy are obvious.
- Dark storm gameplay preserves Vault, lane, targets, and threat hierarchy.
- HUD leaves the combat center clear.
- Exactly three skills remain readable.
- Build explains facing, range, route, stock, and price.
- Quiz remains physical and live with exactly four terminals.
- Armoury presents real weapon and deterministic upgrades.
- Gold, Insight, Core Seeds, score, and Vault never diverge from owners.
- Settings, pause, defeat, retry, Extract, Endless restore correct state.
- Supported inputs and accessibility paths work.
- Static gates pass and UI cost remains within measured host budget.
- Visual taste remains user acceptance.

Continue until this complete UI contract is met or a real external boundary is documented.
```
