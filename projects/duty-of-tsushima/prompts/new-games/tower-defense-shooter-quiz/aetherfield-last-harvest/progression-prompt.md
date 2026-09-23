# Aetherfield: Last Harvest — Progression Build Prompt

**Use:** Copy the complete fenced block as a standalone progression/economy implementation request.
**Scope:** Run economy, unlock cadence, quiz buffs, upgrades, meta, scoring, records, balance, persistence.
**Visual references:** `assets/06-upgrade-interface.png` and `assets/08-wave-thirty-endgame.png` are primary.

```text
CREATE AETHERFIELD: LAST HARVEST — COMPLETE PROGRESSION, ECONOMY, AND RECORDS

MISSION

Build a complete deterministic progression system for an original farm-defense shooter quiz.
Make every wave produce a meaningful choice without opening a menu after every kill.
Make an empty farm visibly and mechanically grow into a personalized fortress.
Support a satisfying thirty-wave completion and an optional endless score chase.
Keep the economy understandable enough that a new player can predict the result of a purchase.
Reward quiz knowledge without making wrong answers end a run immediately.
Reward mastery without pay-to-win, random loot, daily chores, or hidden manipulation.
Use the host project's existing state, save, event, gameplay, UI, and test architecture.
Do not build a second wallet, wave owner, quiz owner, inventory owner, or run-reset path.
Do not create fake UI-only values.
Create original naming, tuning, data, and presentation.

QUALITY BAR

Target the decision clarity of the best modern action roguelites.
Target the build readability of a strong deterministic tower-defense economy.
Target the weapon-upgrade satisfaction of a premium shooter.
Target the long-run transparency of a fair score-attack game.
Use only those system qualities.
Copy no proprietary upgrade tree, economy curve, perk wording, reward screen, or monetization pattern.

REFERENCE SET

- `assets/00-title-start.png`: class selection precedes progression state.
- `assets/01-wave-one-farm.png`: sparse baseline before earned growth.
- `assets/02-build-mode.png`: Gold-funded defenses and route legality.
- `assets/03-quiz-event.png`: Insight source, next-wave bonus, and buff choice context.
- `assets/04-defense-family.png`: six persistent upgrade families.
- `assets/05-classes-weapons.png`: two loadouts, four grants, and four premium weapon goals.
- `assets/06-upgrade-interface.png`: primary bench hierarchy and deterministic branching.
- `assets/07-boss-wave.png`: boss milestones, pressure, and secured rewards.
- `assets/08-wave-thirty-endgame.png`: final snapshot, Core Seeds, Extract, and Endless.
- `assets/09-future-maps.png`: persistent unlocks may preview two maps but never invent a fourth.

FIRST READ

- The player can explain where every currency came from and what every purchase changes.
- Early waves teach through grants; later power is bought with earned Gold.
- Farm growth, weapon parts, tower modules, and skill effects visibly reflect purchased choices.
- Quiz success creates a bounded advantage; failure creates readable temporary pressure.
- Wave 30 closes a complete run before the optional Endless risk begins.

CORE LOOP

Prepare → Build → Defend → Answer → Choose → Upgrade → Expand → Boss → Bank → Continue.
Each step must have one clear owner and one clear state transition.
Preparation must be short enough to preserve action rhythm.
Combat must drop enough information to support the next choice.
Quiz must alter opportunity, not replace combat.
Boss milestones must secure progress.
Wave 30 must feel complete.
Endless must feel optional and risky rather than mandatory for basic unlocks.

PRODUCT TRUTH

- One complete map at launch: Amberstep Farm.
- Two classes: Field Ranger and Elemental Technician.
- Exactly three equipped active abilities.
- Thirty authored waves.
- Bosses at 10, 20, 30.
- Endless begins only by explicit wave-30 choice.
- Free weapons at 1, 3, 5, 7.
- No more automatic weapon grants after wave 7.
- Premium weapons cost earned Gold.
- Six structures, five traps, three visible structure tiers.
- Four physical quiz answers.
- Gold, Insight, and Core Seeds are the only progression currencies.
- No real-money currency.
- No random item rarity.
- No randomized stat roll.
- No loot box.
- No battle pass.
- No energy timer.
- No required network.

CURRENCY OWNERSHIP

GOLD

- Gold is run-local.
- Gold resets at run start.
- Gold sources are enemy rewards, wave clear, quiz bonus, early start, Harvester recovery, and selling.
- Gold sinks are structures, traps, repairs, weapons, weapon levels, structure levels, ability levels, respec.
- The wallet is the only owner of Gold balance and transactions.
- Every transaction has stable reason, amount, wave, actor/system source, and success/failure.
- Failed purchases never change balance.
- UI reads formatted values from the same transaction model.

INSIGHT

- Insight is run-local.
- Correct quiz answer grants one Insight.
- Boss mastery challenge may grant one bonus Insight.
- Insight buys run-tech nodes and advanced ability tiers.
- Insight never buys basic repairs or ammunition.
- Insight resets after extraction/defeat once the final snapshot is sealed.
- Quiz system decides correctness; wallet only applies the emitted reward.

CORE SEEDS

- Core Seeds persist locally.
- Wave 10 secures 2.
- Wave 20 secures 4 additional.
- Wave 30 secures 8 additional.
- Every ten Endless waves secures `4 + floor(endlessTier / 2)` with a safe cap.
- Defeat keeps only already secured milestone Seeds.
- Extract banks all secured plus current completion bonuses.
- Core Seeds unlock deterministic starting options, not direct infinite stat growth.
- Save owner versions, validates, migrates, and writes Seeds atomically.

GOLD CURVE

- Use data-driven values and pure formulas.
- Standard Grunt reward starts near 14 Gold.
- Species rewards reflect threat, time, and counter demand.
- Wave clear base starts near 120 Gold.
- Wave clear grows by chapter, not exponentially.
- Early-start bonus is 2 Gold per unused preparation second with a chapter cap.
- Correct quiz grants +20% Gold for the next wave only.
- Harvester stolen Gold remains recoverable if killed before escape.
- Boss kill grants a meaningful build pivot, not enough to buy every option.
- Total expected income must support one main tower lane, one personal weapon path, and some repairs.
- It must not support maxing every tower, weapon, fence, and ability by wave 30.

WAVE UNLOCK CADENCE

- Wave 1 grants Sidearm, Fence, Sentry, one readable lane, and enough Gold for a first defense.
- Wave 2 runs the first quiz, unlocks one trap stock, and teaches the correct-answer buff choice.
- Wave 3 grants Carbine, unlocks Mortar, and previews the second gate without full pressure.
- Wave 4 unlocks weapon level 2, Shieldbearer, and tower target priority.
- Wave 5 grants Scattergun, runs the second quiz, and unlocks Snare Grid plus an ability upgrade.
- Wave 6 activates two lanes, introduces Spitter, and unlocks Repair Beacon.
- Wave 7 grants Burst Rifle and a free replacement choice, then ends automatic weapon grants.
- Wave 8 opens the Gold-funded premium catalogue, runs the third quiz, and unlocks Arc Coil.
- Wave 9 previews boss traits, unlocks Fence tier 2, and grants one pre-boss repair pulse.
- Wave 10 fields Gatebreaker Colossus, secures Core Seeds, and opens plot 2 plus Tier-3 branches.

WAVES 11–19

- Add Burrower, Harvester, Warden, and Flyer in authored combinations.
- Unlock Frost Fan, Ember Trench, Thunder Mine, Pressure Ram, Decoy Totem.
- Unlock weapon levels 3–4.
- Unlock structure Tier 3 branches gradually.
- Activate third gate and plot 3.
- Continue quiz every three waves.

- Wave 20 fields Fourfold Oracle and unlocks plot 4, weapon level 5, and advanced abilities.

WAVES 21–29

- Use all regular enemy roles.
- Add deterministic elite modifiers.
- Activate fourth gate where route remains fair.
- Complete defense branch access.
- Introduce final Core repair and economy pressures.
- Keep quiz cadence predictable.

- Wave 30 fields Null Harvest Engine, secures the final authored milestone, snapshots the run, and
  unlocks Extract or Continue Endless.

WEAPON ACQUISITION

- Maintain a small weapon inventory with explicit capacity.
- Four free grants are onboarding and build discovery.
- A full inventory produces a two-choice replace/store decision.
- Premium catalogue opens at wave 8.
- Laser repeater base price target: 2,400 Gold.
- Arc caster base price target: 2,800 Gold.
- Rail lance base price target: 3,200 Gold.
- Cryo projector base price target: 2,600 Gold.
- Prices are initial balance anchors.
- Premium never means paid DLC or cash.
- Purchased weapons remain for the current run.
- Meta unlocks can make a premium weapon eligible earlier, but still require run Gold.

WEAPON LEVELS

- Five deterministic levels per weapon.
- Level purchase prices scale from weapon base and chapter.
- Level 2 improves one handling or damage dimension.
- Level 3 offers first authored branch.
- Level 4 deepens chosen branch and changes visible component.
- Level 5 provides capstone behavior with a clear tradeoff.
- Branch A and B remain comparable in total value.
- No branch is a hidden mandatory choice.
- One free respec before wave 10.
- Later respec returns branch points and costs Gold.
- Respec never refunds weapon acquisition price.
- Definition source is consumed by combat, UI, audio, VFX, and score report.

DEFENSE PROGRESSION

- Tier 1 establishes role.
- Tier 2 adds one visible module and primary stat improvement.
- Tier 3 chooses one of two authored specializations.
- Sentry branch: precision Core-Threat hunter or high-rate lane support.
- Mortar branch: armour fracture or broad soil-fire control.
- Arc branch: longer chain or shield overload.
- Frost branch: stronger slow or brittle damage setup.
- Repair branch: stronger pulse or wider multi-structure coverage.
- Fence branch: health/breach resistance or conductive tower support.
- Upgrade effects come from immutable definitions.
- Structure instances own purchased path and health.

ABILITY PROGRESSION

- Each class has six abilities available in its pool.
- Exactly three are equipped.
- Boss preparation permits loadout change.
- Tier 1 unlocks function.
- Tier 2 costs Gold and improves one clear property.
- Tier 3 costs Insight and adds one authored mechanic.
- No ability gets more than one capstone mechanic.
- Cooldown has a hard safe floor.
- Area and chain counts have hard caps.
- UI, gameplay, VFX, and audio read the same tier definition.
- Loadout changes never leave orphaned cooldown or resource state.

QUIZ BUFFS

- Correct answer grants one Insight.
- Correct answer grants +20% next-wave Gold.
- Correct answer opens exactly three run-buff choices.
- Buff pool is seeded.
- Do not repeat a buff at the same tier until pool exhaustion.
- Buffs target weapon, defense, Core economy, build, or class resource.
- A buff states exact value and duration.
- Buffs stack by explicit additive or multiplicative rule.
- Same-stat stacking has a safe cap.
- Examples:
- `Sharpened Feed`: +12% reload speed this run.
- `Brass Bearings`: +12% Sentry rotation speed.
- `Stone Memory`: +8% Core repair efficiency.
- `Early Yield`: +8% wave-clear Gold.
- `Cold Furrow`: Frost slows 6% more, within cap.
- `Survey Notes`: first Core-Threat kill each wave gives 8 Gold.
- No buff changes the correct quiz answer.
- Wrong and timeout never remove permanent meta progress.

THREAT FROM QUIZ FAILURE

- Wrong answer adds one threat tier to the next wave.
- Timeout spawns a small pressure group in current wave and keeps question open.
- Threat tier caps at 8.
- Each tier changes a documented mix of health, damage, composition, and spawn budget.
- Do not increase movement beyond global cap.
- Do not stack opaque hidden multipliers.
- Threat clears by one after a correct answer and fully after a boss.
- UI shows exact current tier and next consequence.

FARM EXPANSION

- Core level rises at boss milestones and selected upgrades.
- Plot 1 is available from start.
- Plot 2 unlocks after boss 10.
- Plot 3 unlocks during chapter 2 through Gold/Insight choice.
- Plot 4 unlocks after boss 20.
- Expansion opens real ground, fence anchors, irrigation, and tower sockets.
- Expansion never teleports existing structures.
- New gates activate only after route solve.
- Visual growth adds crops, paths, lights, and workshop modules based on actual unlocks.
- Cosmetic growth cannot hide enemy lanes or tower range.

META PROGRESSION

- Meta is a small deterministic `Field Ledger`.
- Core Seeds unlock starting options and sidegrades.
- No infinite damage nodes.
- No mandatory grind to survive Standard.
- Node families: Starting Kit, Farm Plan, Knowledge, Class Practice, Challenge.
- Starting Kit may add a starting trap or alternative sidearm, not raw power stacking.
- Farm Plan may reveal route forecast or reduce first Fence cost.
- Knowledge may add one reroll to quiz buff choices, not questions.
- Class Practice may start with one ability tier-1 unlocked.
- Challenge unlocks seeded modifiers and cosmetic banners.
- Maximum meaningful completion target: 25–35 runs, not endless stat inflation.
- Full reset/export/import works locally.

DIFFICULTY

- Modes: Story, Standard, Veteran.
- Story changes damage pressure and offers longer preparation/quiz time.
- Standard is the balance source.
- Veteran changes budget, combinations, and repair economy before raw health.
- Rewards identify difficulty but do not lock core gameplay behind Veteran.
- Weekly seeded challenge uses one fixed difficulty profile.
- Accessibility options do not invalidate local records.
- Online competitive boards may separate assisted rule sets transparently.

SCORE

- Score is deterministic and event-driven.
- Base sources: wave clear, enemy value, boss phase, quiz, Core health, time, Endless multiplier.
- Spending Gold never reduces score.
- Damage taken does not directly reduce score.
- Selling/rebuying cannot farm score.
- One enemy death contributes once.
- One quiz contributes once.
- One wave clear contributes once.
- Core health bonus is snapshot at wave clear.
- Quiz accuracy bonus uses resolved questions only; timeout counts missed after run end.
- Endless multiplier increases by completed ten-wave tier and has a visible cap or formula.

FINAL REPORT

- Versioned immutable run snapshot.
- Fields: run ID, seed, version, map, class, difficulty, wave, score.
- Fields: kills by species, boss phases, accuracy if available, damage dealt/taken.
- Fields: quiz correct, wrong, timeout, streak, Insight earned.
- Fields: Gold earned/spent, largest purchase, repairs, sell return.
- Fields: tower damage by type, trap triggers, structures lost.
- Fields: Core health history, final health, secured Seeds.
- Fields: weapon path, defense branches, abilities, buffs.
- Defeat and results UI consume only this snapshot.
- Save one final snapshot per run.

RECORDS AND LEADERBOARDS

- Local versioned records work offline.
- Boards: Highest Wave, Highest Score, Perfect Quiz, Fastest Wave 30.
- Filters: class, difficulty, map, game version.
- Keep best run and recent run history with a bounded cap.
- Weekly challenge derives from calendar seed only if system clock is valid.
- Online submission is optional and asynchronous.
- Offline failure never blocks play or results.
- Submission payload includes run seed, version, event digest, input/rule flags, and final snapshot.
- Server validation is required before any public competitive board.
- Never claim anti-cheat security from client-only code.

PERSISTENCE

- Version every save schema.
- Validate every field and clamp unsafe values.
- Use atomic write pattern supported by host.
- Keep last known good backup where practical.
- Storage failure switches to session-only mode and reports it once.
- Never block defeat, retry, or title navigation on storage.
- Migrations are deterministic and tested with representative old fixtures.
- Do not use current time as a normalization fallback for stable IDs.
- Reset deletes only game-owned keys after confirmation.

BALANCE TOOLS

- Implement pure calculators for income, cost, wave budget, threat, score, and Seed milestones.
- Provide deterministic simulation from wave 1–30 without rendering.
- Track expected and actual Gold earned/spent by chapter.
- Track purchase rates and dead options locally only with consent if analytics exists.
- Detect impossible affordability and dominant branch choices.
- Keep tuning data separate from presentation and runtime state.
- Do not introduce remote tuning that changes an active run.
- Record tuning version in run snapshot.

ARCHITECTURE

- Wallet owns currencies and atomic transactions.
- Progression owner owns unlock eligibility and purchased nodes.
- Inventory owner owns acquired weapons and trap stock.
- Structure instances own their chosen upgrade branches.
- Ability loadout owner owns exactly three equipped skills.
- Quiz owner decides correctness and emits outcome.
- Wave owner decides milestone timing and secured reward events.
- Score owner consumes immutable events and produces final snapshot.
- Save owner persists meta and record snapshots.
- UI reads but never re-decides prices, eligibility, rewards, or score.
- Definitions are immutable pure data.
- Reset travels through one host-owned path.

PERFORMANCE AND SAFETY

- Progression calculations do not run per rendered frame.
- Transactions are O(1) or bounded by small authored tables.
- Event history is bounded or compacted into aggregates.
- Leaderboard history has explicit cap.
- Save writes are debounced outside critical milestone transactions.
- Boss milestone banking writes once and confirms state.
- No network call sits on the combat or result critical path.
- No floating-point NaN or negative currency enters state.
- Integer currency math is preferred.
- Seeded choices remain reproducible.

EXECUTION

- Inspect host events, wallets, waves, quiz, inventory, save, UI, and reset.
- Add/extend project plan before code when required.
- Define immutable economy and progression tables.
- Implement wallet transactions and pure affordability.
- Implement wave unlock timeline and weapon grants.
- Implement deterministic weapon, defense, and ability upgrades.
- Implement quiz buff and threat systems.
- Implement expansion and Core Seed milestones.
- Implement score aggregation and final snapshot.
- Implement local persistence, migrations, and records.
- Integrate UI through selectors and commands.
- Add deterministic balance simulation using existing test conventions.
- Use sub-agents only if host rules permit and paths are disjoint.
- One integration owner resolves events and reset.

VALIDATION

- Run host canonical static/build gates.
- Prove no duplicate wallet or score owner exists.
- Simulate waves 1–30 for all classes and difficulties with fixed seeds.
- Verify expected income bands and meaningful unaffordable choices.
- Verify free weapon grants exactly at 1, 3, 5, 7 and never later.
- Verify premium weapons require Gold and no external purchase.
- Verify every structure, weapon, and ability branch has reachable prerequisites.
- Verify quiz correct, wrong, timeout, threat cap, and buff stack cap.
- Verify boss milestones secure exact Core Seeds.
- Verify defeat, retry, extraction, Endless, storage failure, and migration.
- Verify score cannot duplicate on replayed events.
- Verify local records are bounded and versioned.
- This prompt authorizes one bounded integrated browser review of bench and final results through existing host tools.
- Never invent balance success, retention, fairness, or player approval.

DONE WHEN

- A new run has a clear useful purchase within the first preparation.
- Four free weapons arrive at exactly the authored waves.
- Wave 8 changes weapon acquisition from grants to earned purchases.
- Gold supports strong specialization but cannot max everything.
- Insight makes quiz mastery valuable without hard-locking basic survival.
- Core Seeds provide finite deterministic meta choice without infinite power.
- Farm plots, structures, weapons, fences, and abilities visibly grow through real purchases.
- Wrong answers add bounded pressure and timeouts keep the question alive.
- Wave 30 is a complete reward state with honest Extract/Endless choice.
- Defeat preserves only secured milestones.
- Scores and records are deterministic, bounded, versioned, and offline-safe.
- Static gates and balance simulations pass.
- Final prices and feel remain honest tuning and user-playtest gates.

Continue until this progression contract is complete or a real external boundary is documented.
```
