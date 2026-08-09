# Blackrain Protocol — Progression Build Prompt

**Use:** Copy the full fenced block as a standalone progression/economy implementation request.
**Scope:** Economy, weapon/tower/ability growth, quiz rewards, thirty-wave cadence, meta, scoring, persistence.
**References:** `assets/06-upgrade-interface.png` and `assets/08-wave-thirty-endgame.png` are primary.

```text
CREATE BLACKRAIN PROTOCOL — COMPLETE PROGRESSION, ECONOMY, AND RECORDS

MISSION

Build a transparent deterministic progression system for a storm-farm action tower-defense shooter quiz.
Turn a sparse grow-site into a personalized defensive operation over thirty authored waves.
Make every preparation phase offer a meaningful but understandable decision.
Make premium weapons feel earned through play, never purchased with cash.
Make quiz knowledge create tactical advantage without one wrong answer destroying the run.
Make wave 30 a full ending and Endless an optional risk.
Use host state, wallet, wave, quiz, inventory, UI, persistence, reset, and tests.
Do not create duplicate owners or UI-only values.
Create original upgrade names, tuning, presentation, and records.
Copy no proprietary economy, perk tree, reward flow, weapon progression, or monetization.

REFERENCE SET

- `assets/00-title-start.png`: two-class selection before run state.
- `assets/01-wave-one-farm.png`: sparse Grow-Site baseline before investment.
- `assets/02-build-mode.png`: Gold-funded defenses and route legality.
- `assets/03-quiz-event.png`: Insight, bonus, buff, and threat context.
- `assets/04-defense-family.png`: six persistent structure upgrade families.
- `assets/05-classes-weapons.png`: four free grants and four premium catalogue goals.
- `assets/06-upgrade-interface.png`: primary Armoury hierarchy and deterministic branching.
- `assets/07-boss-wave.png`: milestone pressure and secured rewards.
- `assets/08-wave-thirty-endgame.png`: sealed score, Core Seeds, Extract, and Endless.
- `assets/09-future-maps.png`: meta may preview two maps but never promise a fourth.

FIRST READ

- Every resource source, sink, prerequisite, and result is predictable before confirmation.
- Early weapon grants teach the arsenal; later premium power costs earned Gold.
- Operator kit, Armoury parts, barriers, and towers visibly reflect purchased choices.
- Correct answers create bounded opportunity; wrong answers create readable temporary threat.
- Wave 30 seals a complete Protocol before the optional Endless risk.

CORE LOOP

Prepare → Fortify → Defend → Answer → Choose → Upgrade → Expand → Boss → Secure → Continue.
Preparation defaults to 30 seconds.
Wave 1 may allow 45 seconds.
Early start pays a visible bounded Gold bonus.
Combat provides enough income information for the next choice.
Quiz adds Insight, Gold opportunity, buff choice, or bounded threat.
Boss waves secure Core Seeds.
Wave 30 offers Extract or Continue Endless.

HARD RULES

- One launch map: Blackrain Grow-Site.
- Two classes.
- Exactly three equipped abilities.
- Thirty authored waves.
- Bosses at 10, 20, 30.
- Free weapons at 1, 3, 5, 7 only.
- Premium catalogue at wave 8.
- Six structures, five traps, three structure tiers.
- Exactly four quiz answers.
- Gold, Insight, Core Seeds only.
- Gold and Insight reset per run.
- Core Seeds persist.
- No paid currency, rarity, stat roll, crate, pass, energy, daily pressure, required network.

OWNERSHIP

- Wallet owns Gold, Insight, Core Seed transactions.
- Progression owner owns unlock eligibility and purchased nodes.
- Inventory owns acquired weapons and trap stock.
- Structure instance owns health, tier, and branch.
- Ability loadout owns exactly three equipped skills.
- Quiz owner decides correctness.
- Wave owner decides cadence and milestones.
- Score owner consumes events and seals snapshot.
- Save owner persists meta/records.
- UI reads and commands; it never recalculates truth.
- One host run-reset clears run-local state.

GOLD

- Sources: kills, wave clear, correct-answer next-wave bonus, early start, recovered theft, sell.
- Sinks: Barrier, structures, traps, repair, premium weapons, levels, abilities, respec.
- Transaction fields: ID, reason, amount, wave, source, balance before/after, result.
- Failed transaction changes nothing.
- Integer arithmetic is preferred.
- Display formatting reads the same transaction model.
- Unspent Gold carries until run ends.

INSIGHT

- Correct quiz grants one.
- Boss mastery may grant one bonus.
- Buys run-tech and advanced ability tiers.
- Never pays basic repair or ammunition.
- Unspent Insight carries through run.
- Resets only after final snapshot is sealed.

CORE SEEDS

- Wave 10 secures 2.
- Wave 20 secures 4 additional.
- Wave 30 secures 8 additional.
- Each ten Endless waves secures `4 + floor(tier / 2)` with safe cap.
- Defeat keeps secured milestones only.
- Extract banks secured and completion reward.
- Seeds unlock finite sidegrades and starting options, not infinite damage.
- Save validates and writes milestones atomically.

INCOME TARGETS

- Standard Grunt starts near 14 Gold.
- Wave clear starts near 120 Gold and grows by chapter.
- Early start gives 2 Gold per unused second within cap.
- Correct answer grants +20% next-wave Gold.
- Boss reward enables a build pivot, not every purchase.
- Expected lifetime Gold end wave 3: 500–800.
- End wave 7: 1,800–2,600.
- Before boss 10: 3,200–4,400.
- Before boss 20: 9,000–12,000.
- Before boss 30: 18,000–24,000.
- These are tuning targets requiring deterministic simulation and play evidence.
- Standard should support one tower lane, one weapon path, repairs, not universal maxing.

WAVE 1–3

- Wave 1 grants sidearm, Barrier and Stabilized Sentry, starting Gold.
- Teach movement, aim, fire, Vault, open service lane.
- Wave 2 adds first quiz and one trap stock.
- Wave 3 grants carbine, unlocks Smart Mortar, previews second gate.

WAVE 4–7

- Wave 4 unlocks weapon level 2 and target priority.
- Wave 5 grants scattergun, second quiz, Snare Grid, first ability upgrade.
- Wave 6 activates two-lane pressure and Repair Mast.
- Wave 7 grants burst rifle and one replacement choice if full.
- Wave 7 clearly announces the end of automatic weapon grants.

WAVE 8–10

- Wave 8 opens premium catalogue and Arc Transformer.
- Wave 8 runs third quiz.
- Wave 9 unlocks Barrier tier 2 and boss preview.
- Wave 10 Gatebreaker Colossus secures 2 Seeds.
- Wave 10 unlocks outer sector 2, first Tier-3 branch, class loadout change.

WAVE 11–20

- Add Mole Unit, Siphon Runner, Signal Warden, Storm Skimmer in authored combinations.
- Unlock Cryogenic Fan and remaining four traps progressively.
- Unlock weapon levels 3–4.
- Unlock Tier-3 defense branches gradually.
- Activate third gate and sector 3.
- Quiz continues every three waves.
- Wave 20 Fourfold Oracle secures 4 more Seeds.
- Unlock sector 4, weapon level 5, advanced ability tier.

WAVE 21–30

- Use all regular roles and deterministic elite modifiers.
- Activate fourth gate only after route validation.
- Complete defense/weapon/ability branch access.
- Increase repair and Vault pressure without opaque multipliers.
- Wave 30 Null Harvest Engine secures 8 more Seeds.
- Seal result snapshot and offer Extract/Endless.

WEAPON ACQUISITION

- Small explicit inventory capacity.
- Free grant at waves 1, 3, 5, 7.
- Full inventory offers two explicit replace/store options.
- No random drop replaces authored grant.
- Premium weapons remain bought for current run.
- Laser Repeater target price 2,400 Gold.
- Arc Caster 2,800 Gold.
- Rail Lance 3,200 Gold.
- Cryo Projector 2,600 Gold.
- Meta may make one eligible earlier but never removes Gold cost.
- Premium means late/high-value, never real-money.

WEAPON LEVELS

- Five levels each.
- Level 2 improves one core dimension.
- Level 3 branches A/B.
- Level 4 deepens chosen branch and changes physical component.
- Level 5 capstone has clear tradeoff.
- Branches remain comparable and authored.
- One free respec before wave 10.
- Later respec costs Gold and returns branch points only.
- Combat, UI, audio, VFX, score consume one definition source.

CARBINE EXAMPLE

- Base: balanced rate, recoil, magazine, range.
- Level 2 `Sealed Feed`: +12% magazine.
- 3A `Stabilized Control`: -18% recoil, -6% rate.
- 3B `Pressure Cycle`: +14% rate, +10% recoil.
- 4A `Storm Brace`: longer Focus stability.
- 4B `Hot Chamber`: every tenth hit chips armour within cap.
- 5A `Threat Mark`: first burst after reload marks Vault Threat.
- 5B `Linked Fire`: sustained hits briefly improve Sentry tracking.
- All values visible and deterministic.

DEFENSE COST TARGETS

- Composite Barrier 45 Gold per segment.
- Player gate 90.
- Stabilized Sentry 300.
- Smart Mortar 520.
- Arc Transformer 650.
- Cryogenic Fan 560.
- Repair Mast 600.
- Snare Grid 120.
- Thunder Mine 180.
- Ember Trench 220.
- Pressure Ram 260.
- Decoy Emitter 200.
- Tier upgrades roughly 70–110% of base based on measured power.

DEFENSE BRANCHES

- Tier 1 establishes role.
- Tier 2 adds one physical module and primary stat.
- Tier 3 chooses exactly one of two authored roles.
- Sentry: precision Vault-Threat or high-rate lane support.
- Mortar: armour fracture or broad heat denial.
- Arc: long chain or shield overload.
- Cryo: stronger slow or brittle setup.
- Repair: strong local or wide multi-structure service.
- Barrier: breach resistance or conductive support.
- Sell return is 70% preparation, 40% combat.
- Repair cost follows missing health.

ABILITIES

- Six pool abilities per class.
- Exactly three equipped.
- Loadout changes after bosses.
- Tier 1 function.
- Tier 2 Gold improvement.
- Tier 3 Insight mechanic.
- Cooldown has hard floor.
- AoE, chain, target, drone, field caps are explicit.
- Unequipping resolves cooldown/resource state safely.
- UI and gameplay consume same data.

QUIZ REWARDS

- Quiz after waves 2, 5, 8, then every three.
- Correct gives one Insight.
- Correct gives +20% next-wave Gold.
- Correct offers exactly three seeded buffs.
- Buff states affected system, value, duration, stack rule.
- Same-stat stacking has cap.
- No rarity colors or hidden rolls.
- Examples: +12% reload, +12% Sentry tracking, +8% Vault repair efficiency.
- Wrong adds one threat tier to next wave.
- Timeout adds a small current pressure group and leaves question active.
- Threat tier caps at 8.
- Correct lowers threat by one; boss clear resets it.
- Threat never exceeds global speed/attack caps.

SITE EXPANSION

- Sector 1 starts open.
- Sector 2 opens after boss 10.
- Sector 3 opens during chapter 2 by Gold/Insight decision.
- Sector 4 opens after boss 20.
- Expansion adds real ground, barrier anchors, drainage, tower pads, and crop tunnels.
- It never teleports existing structures.
- New gate activates only after navigation solve.
- Visual hardening follows actual purchases: lights, rails, pumps, armour, service modules.
- Decoration never blocks target or route readability.

META — OPERATIONS LEDGER

- Finite deterministic Core Seed tree.
- Families: Starting Kit, Site Plan, Knowledge, Operator Practice, Challenge.
- Starting Kit offers alternative sidearm or one trap stock, not stacking damage.
- Site Plan offers route forecast or first Barrier discount.
- Knowledge offers one buff-choice reroll, not answer reroll.
- Operator Practice starts one tier-1 ability unlocked.
- Challenge unlocks seeded modifiers and cosmetic site banners.
- Standard remains beatable with zero meta.
- Completion target approximately 25–35 runs.
- Reset/export/import work locally.

DIFFICULTY

- Story, Standard, Veteran.
- Story lowers pressure and extends preparation/quiz time.
- Standard owns balance values.
- Veteran raises budget, role combinations, repair pressure before health.
- Global regular speed max 1.35×, attack-rate max 1.30×.
- Difficulty rewards labels/records, not core content locks.
- Weekly seeded Protocol uses fixed rules.
- Accessibility remains valid for local records.
- Competitive boards separate assisted rules transparently if online.

SCORE

- Deterministic event aggregation.
- Wave, enemy, boss phase, quiz, Vault health, time, Endless multiplier.
- Gold spending never lowers score.
- Operator damage does not directly lower score.
- No score from sell/rebuy loop.
- Deduplicate enemy death, quiz result, boss phase, wave clear.
- Snapshot Vault health at clear.
- Quiz accuracy handles unresolved timeout honestly.
- Endless formula is visible and versioned.

FINAL SNAPSHOT

- Immutable and versioned.
- Run ID, seed, version, map, operator, difficulty, wave, score.
- Kills, boss phases, damage, weapon accuracy when valid.
- Quiz correct/wrong/timeout/streak/Insight.
- Gold earned/spent, purchases, repairs, sales.
- Tower damage, trap triggers, structures lost.
- Vault health history/final.
- Weapon paths, defense branches, skills, buffs.
- Secured Seeds and unbanked loss.
- Defeat/results read only snapshot.

RECORDS

- Offline versioned local records.
- Highest Wave, Highest Score, Perfect Quiz, Fastest Wave 30.
- Filters by class, difficulty, map, version.
- Bounded recent history plus best run.
- Optional asynchronous online submit never blocks results.
- Payload includes seed, version, tuning version, event digest, rule flags, snapshot.
- Server validation required for public competitive claims.
- Client-only code never claims secure anti-cheat.

PERSISTENCE

- Version schema and deterministic migration.
- Validate/clamp every field.
- Atomic host-supported writes.
- Last-known-good backup where practical.
- Storage failure becomes session-only and reports once.
- Never block defeat, retry, Extract, or title navigation.
- Reset deletes only owned keys after confirmation.
- Never use current time as unstable ID fallback.

BALANCE TOOLING

- Pure calculators for income, price, wave budget, threat, score, Seeds.
- Deterministic renderless wave 1–30 simulation.
- Track expected/actual income and spending by chapter.
- Detect impossible affordability, dominant branch, dead option, runaway repair spiral.
- Tuning data is immutable during active run.
- Record tuning version in final snapshot.
- Never claim balance from simulation alone; keep play feel as user gate.

PERFORMANCE AND SAFETY

- No progression work per rendered frame.
- Transactions are O(1) or bounded small-table operations.
- Histories and records have hard caps.
- Debounce noncritical saves.
- Milestone bank writes once.
- Network is off critical path.
- Reject NaN, negative currency, invalid branch, duplicate event.
- Seeded choices reproduce.

EXECUTION

- Inspect host wallet, wave, quiz, inventory, save, UI, events, reset.
- Extend project plan if required.
- Define immutable tables and pure formulas.
- Implement wallet and eligibility.
- Implement wave unlocks and grants.
- Implement weapon/defense/ability upgrades.
- Implement quiz buffs/threat.
- Implement sectors/Seeds/meta.
- Implement score/snapshot/records.
- Implement save/migration/storage fallback.
- Add deterministic simulations using host conventions.
- Use sub-agents only if permitted and disjoint.
- Keep one integration owner.

VALIDATION

- Run canonical static/build gates.
- Simulate 1–30 across classes/difficulties/fixed seeds.
- Verify income bands and meaningful tradeoffs.
- Verify grants exactly 1, 3, 5, 7 and never later.
- Verify premium uses Gold only.
- Verify every branch reachable and definition-shared.
- Verify quiz outcomes, stack caps, threat cap/reset.
- Verify exact Seed milestones.
- Verify defeat, retry, Extract, Endless, storage failure, migration.
- Verify score event deduplication and bounded records.
- Prompt authorizes one bounded integrated Armoury/result browser review with existing tools.
- Never invent balance, fairness, retention, or approval.

DONE WHEN

- First preparation offers a clear useful purchase.
- Wave 8 visibly changes acquisition from grants to catalogue.
- Gold enables specialization but not universal maxing.
- Insight rewards knowledge without blocking basic survival.
- Core Seeds provide finite sidegrades.
- Site expands and hardens through actual purchases.
- Wrong/timeout add bounded visible pressure.
- Wave 30 resolves fully and Endless remains optional.
- Defeat preserves only secured milestones.
- Score, persistence, records are deterministic, bounded, offline-safe.
- Gates and simulations pass; price feel remains user playtest gate.

Continue until this progression contract is complete or a real external boundary is documented.
```
