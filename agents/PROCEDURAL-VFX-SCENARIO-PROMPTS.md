# Procedural Runtime VFX — copy-ready scenario prompts

**Purpose:** Pick one prompt, replace its bracketed fields, and paste the whole block into an agent session.

**Global contract:** These prompts standardize production VFX around project-owned handwritten shaders, runtime-generated geometry, one event/spatial truth, fixed runtime budgets, and honest evidence. The deeper technical owner is [`../threejs/VFX.md`](../threejs/VFX.md).

## Pick one scenario

| Scenario | Use it when |
|---|---|
| [1. Greenfield foundation](#1-greenfield-project--build-the-vfx-foundation) | A project has no production VFX runtime yet |
| [2. Full migration](#2-existing-project--migrate-the-complete-vfx-scope) | Every effect in a named production scope must leave legacy sources |
| [3. Add new VFX](#3-existing-project--add-a-new-vfx-family) | One new effect or coherent family must join a healthy runtime |
| [4. Adjust existing VFX](#4-existing-project--adjust-or-repair-an-existing-vfx-family) | A shipped effect looks, behaves, or performs wrong |
| [5. Interrupt and resume](#5-running-long-task--checkpoint-migrate-vfx-and-resume) | An agent is already deep in another task and must safely migrate one VFX path before continuing |

- Replace every `[PLACEHOLDER]`; remove unused optional lines.
- Keep the selected prompt intact. Each block embeds its own source, quality, performance, migration, validation, and completion contract.
- Runtime inspection is opt-in. Replace `[RUNTIME_REVIEW_PERMISSION]` with the exact permission granted now, or `None`.

---

## 1. Greenfield project — build the VFX foundation

```text
Use this prompt when

The project has no production VFX runtime yet and needs one real pilot to establish it.

Mission

Build the first production-ready procedural runtime VFX foundation for [PROJECT] in [ENGINE/RENDERER], then prove it through [PILOT_EFFECT] in the real product path. Do not stop at architecture, a detached demo, or a particle sandbox.

Project inputs

- Product/gameplay role: [WHAT_THE_VFX_MUST_COMMUNICATE]
- Pilot trigger and owner: [CAST/WEATHER/CONTACT/EVENT_OWNER]
- Pilot gameplay footprint: [PATH/RADIUS/CONE/VOLUME/CONTACT_TRUTH]
- Quality references: [OPTIONAL_IMAGES/PROJECTS/VIDEOS_AND_THEIR_SPECIFIC_QUALITY_ROLE]
- Target hardware or existing product budget: [KNOWN_BASELINE_OR_UNKNOWN]
- Runtime review permission for this assignment: [RUNTIME_REVIEW_PERMISSION]

Start rules

1. Read all repository rules, the active task/plan, renderer ownership, build commands, and Git policy before editing.
2. Inspect the real render loop, post stack, gameplay event flow, coordinate units, asset policy, and current Git diff.
3. Continue an existing relevant task owner. Create one small task owner only if repository rules require it and none exists.
4. Keep one production renderer, frame loop, post stack, timing truth, spatial truth, and live parameter owner. Never build a parallel showcase runtime.
5. Use subagents only for large disjoint tracks with exclusive files. One integration owner keeps shared renderer, frame, event, and post-processing decisions.

Non-negotiable procedural source contract

- Every visible effect shape must use project-owned handwritten native shader code and runtime-generated geometry. Use GLSL for WebGL/Three.js, WGSL for WebGPU, HLSL where native, or the renderer's equivalent source path.
- Allowed building blocks: analytic noise, signed-distance fields, parametric ribbons/tubes/quads, generated solids, instanced geometry, particles backed by fixed buffers, targeted material patches, and renderer-owned depth/color targets.
- Forbidden visible effect sources: bitmap/noise/LUT/decal textures, sprite sheets, flipbooks, videos, baked VFX meshes, imported effect packs, copied foreign shaders, or generated wrappers that hide any of those sources.
- Existing character, weapon, world, terrain, and UI assets remain allowed as their intended solid/interface assets. They may not hide baked effect animation or skill surfaces.
- References provide quality reasons only. Do not copy their code, shader text, exact skill, silhouette, palette, UI, branding, audio, or proprietary assets.

Product and quality contract

- Author the full causal chain: First Read → Anticipation → Release → Spatial Path or Footprint → Contact → Reaction → Aftermath/Recovery.
- Give every live instance one stable cast/event ID, deterministic seed where repeatability matters, timeline, world origin, direction, path/footprint, intensity, and lifecycle.
- Derive gameplay, animation, VFX, sound, camera response, and terrain reaction from the same final timing and spatial truth. Never rebuild a lookalike path from player position, frame delta, or hand-tuned duplicate constants.
- The visible telegraph/AoE edge must equal gameplay truth from the first dangerous frame. Visual radius and hit radius must share one source.
- Define the pilot's dominant silhouette before secondary particles or bloom. Separate matter/occlusion, hot core, rim/halo, spray/debris, and aftermath into intentional material, blend, and depth roles.
- Make the pilot identifiable by geometry, motion, timing, material response, and aftermath—not palette, scale, or particle count alone.
- Preserve player, enemy, terrain, reticle, exits, and damage readability under representative overlap. Bloom supports form; it never replaces form.

Foundation and performance envelope

- Create the smallest reusable neutral core that the pilot proves: event schema, shared frame/time data, geometry transport, material/program reuse, pool ownership, bounds, warmup, quality tier, disposal, and instrumentation hooks.
- Keep visible effect shells local to their effect family. Share neutral math and transport, not one generic explosion/trail recolored across the product.
- Preallocate repeated runtime data. Use fixed capacities, complete acquire/release/reset scrubbing, explicit overflow policy, and zero allocation in overflow.
- Do not create mesh, geometry, material, shader program, light, or growing arrays per frame. Warm required shader variants through the real render configuration where the renderer supports it.
- Budget transparent layers, dynamic lights, shadows, post energy, particles, and memory together. No layer earns cost without a clear gameplay or visual role.
- If no measured baseline exists, record budgets and unknowns without inventing FPS, frame time, draw-call, memory, or load-time claims.
- Degrade in this order: hidden work → distant/background density → secondary trails/motes/aftermath → safe resolution/shadow detail. Never degrade exact telegraphs, collision truth, contact beat, dominant silhouette, enemy readability, or input response.

Greenfield compatibility and cleanup

- Do not add placeholder texture/sprite fallbacks “for later.” If an experimental or placeholder effect already occupies the pilot path, replace it behind a reversible boundary and remove its source, loader, preload, flag, control, and fallback after references reach zero.
- Keep gameplay timing, damage, collision, movement, AI, camera safety, and product flow unchanged unless the mission explicitly owns them or a coupled defect is proven.
- Document the production owner and extension path so the next effect joins this runtime instead of creating a second foundation.

Execution and validation

1. Write a compact effect brief: function, first read, timeline beats, exact footprint, shared anchors, dominant silhouette, material/blend/depth roles, capacity, overflow, degradation, and differences from neighboring effects.
2. Build one end-to-end pilot through the real production trigger. Integrate sound/contact/reaction metadata where those owners exist.
3. Inspect event units, transform spaces, deterministic reset, pool reuse, overflow, bounds, uniforms/attributes, render order, warmup, and disposal.
4. Run the repository's canonical static checks after the coherent unit. Use existing shader validation where relevant; a type/build pass does not prove shader compilation or visual quality.
5. Search the delivered path for forbidden sources, duplicate owners, per-frame allocations, uncapped emitters, stale fallbacks, and orphan assets.
6. Check diff hygiene, UTF-8, links, file endings, and repository line limits. Commit and push only owned files as repository rules require.
7. Use browser, screenshot, gameplay, or performance tools only when [RUNTIME_REVIEW_PERMISSION] explicitly grants that exact review now. Reuse the project's existing bounded tool path; do not create a capture harness. Otherwise leave exact manual gates and make no visual/FPS claim.

Finish only when

- The pilot runs through the production renderer and real trigger; no detached demo is the only proof.
- The procedural source contract is met with no forbidden or hidden fallback source.
- Cast/event timeline and spatial truth drive gameplay-facing consumers without a duplicate path.
- Exact footprint, dominant silhouette, contact, and recovery have explicit owners.
- Pools, caps, reset, overflow, warmup, degradation, and disposal are implemented and statically inspected.
- Canonical checks pass, displaced pilot placeholders have zero references, and runtime claims match granted evidence.
- The next effect has one documented production extension route.

Continue in a self-directed loop until every condition is true or an objective external blocker names the exact missing input. Do not pause after planning or return self-fixable work to the user.
```

---

## 2. Existing project — migrate the complete VFX scope

```text
Use this prompt when

Every production effect in one named scope must leave legacy visible sources and join one procedural runtime.

Mission

Migrate every production-visible effect in [MIGRATION_SCOPE] inside [PROJECT] / [ENGINE/RENDERER] to one project-native procedural runtime. Preserve proven gameplay and product behavior, replace incompatible legacy owners family by family, and remove every displaced production path. A pilot plus a TODO list is not completion.

Project inputs

- Migration scope and explicit exclusions: [FAMILIES/FLOORS/SCENES/FEATURES]
- Gameplay and product behavior that must remain exact: [TIMING/HIT_AREAS/COLLISION/AI/CAMERA/FLOW]
- Current runtime/render owners if known: [PATHS_OR_UNKNOWN]
- Quality references: [OPTIONAL_REFERENCES_AND_SPECIFIC_QUALITY_ROLES]
- Existing measured baseline/target hardware: [BASELINE_OR_UNKNOWN]
- Runtime review permission for this assignment: [RUNTIME_REVIEW_PERMISSION]

Start rules

1. Read repository rules, active plans, VFX/render routers, canonical checks, and Git policy completely.
2. Inspect the real tree, Git diff, production imports, renderer/frame/post owners, gameplay event sources, parameter tools, and asset/preload paths. Do not trust stale status text.
3. Continue existing task owners; do not create a competing masterplan or second renderer.
4. Keep unrelated and foreign changes untouched. Split work by coherent effect family, not by random files.
5. Use subagents only for large disjoint families with exclusive ownership. One integration owner keeps shared engine, frame, event, post, budget, and schema files.

Mandatory inventory and decision ledger

Before migration code, inventory every in-scope family with:

- User-visible family and states
- Production owner and frame owner
- Trigger/timeline truth
- World origin, direction, path, footprint, radius, and surface truth
- Visible source type and render role
- Parameter owner and duplicate writers
- Representative peak overlap and known cost
- Decision: keep, repair, replace, merge, or delete
- Replacement owner
- Removal proof required

Also map shared choke points: frame uniforms, event bus, pools, geometries, programs, lights, post targets, editor state, terrain/reaction targets, warmup, and disposal. Maintain a short deletion ledger: old owner → replacement → zero-reference evidence → removal commit.

Non-negotiable procedural source contract

- Every migrated visible effect shape must use project-owned handwritten native shader code and runtime-generated geometry: GLSL, WGSL, HLSL, or the renderer's equivalent source path.
- Allowed: analytic noise, signed-distance fields, parametric ribbons/tubes/quads, generated solids, fixed-buffer particles, instancing, targeted material patches, and renderer-owned depth/color/reaction targets.
- Forbidden: bitmap/noise/LUT/decal textures as visible effect sources, sprite sheets, flipbooks, videos, baked VFX meshes, imported effect packs, copied foreign shaders, or generated wrappers that conceal them.
- Character, weapon, world, terrain, and UI assets remain allowed for their intended roles; they may not carry hidden baked effect animation.
- References define quality reasons only. Never copy code, shader text, exact effects, silhouettes, palettes, UI, branding, audio, or proprietary assets.

Product and quality contract

- Each family must read as: First Read → Anticipation → Release → Spatial Path or Footprint → Contact → Reaction → Aftermath/Recovery.
- One cast/event ID, timeline, deterministic seed where needed, world anchor, direction, path/footprint, intensity, and lifecycle must drive all consumers.
- Gameplay, animation, VFX, sound, camera response, and terrain reaction use the same final timing and spatial truth. No visual clone of collision data and no second path sampled from frame delta or hand constants.
- Visible telegraph/AoE boundaries equal gameplay geometry from the first dangerous frame through impact.
- Every family defines a dominant silhouette plus intentional matter/occlusion, hot core, rim/light, debris/spray, and aftermath roles. Secondary layers react to the main form instead of competing with it.
- Neighboring families differ through shape, motion, timing, material response, contact, and aftermath—not recolor, count, or scale alone.
- Preserve combat and environment readability under real overlap. More bloom, particles, or lights cannot compensate for weak form or causality.

Migration architecture and performance envelope

- Preserve one production renderer, frame loop, post stack, event truth, spatial truth, terrain-state owner, and live parameter owner.
- Keep strong compatible neutral infrastructure when evidence says it meets the contract. Replace wrong source, anchor, phase, or ownership at cause level instead of stacking tuning patches.
- Migrate one coherent family through the real trigger, integrate it, then remove its old owner, assets, loaders, preloads, flags, controls, fallbacks, and duplicate config after references reach zero.
- No permanent dual path, silent fallback, shadow writer, or detached showcase is allowed.
- Share neutral shader math, frame data, geometry transport, and pooling where useful. Keep visible shells family-owned; never ship one generic recolored explosion/trail for all effects.
- Preallocate repeated runtime data; use fixed capacities, complete acquire/release/reset scrubbing, explicit overflow behavior, and zero overflow allocation.
- Avoid per-frame mesh, geometry, material, shader, light, or growing-array creation. Warm required variants through the real render configuration.
- Budget transparent coverage, post energy, dynamic lights, shadows, particles, memory, and shader variants together. Record unknowns; never invent FPS or savings.
- Degrade hidden work first, then distant/background density, secondary trails/motes/aftermath, and safe resolution/shadow detail. Never degrade exact telegraphs, collision truth, contact beat, dominant silhouette, enemy readability, or input response.

Execution sequence

1. Lock shared event, time, space, render-order, parameter, pool, budget, warmup, quality-tier, and disposal contracts.
2. Select one small production pilot that exercises the shared contract; do not create a demo-only path.
3. Migrate coherent families in dependency order. After each family, route the real trigger to the replacement and delete the displaced path before closing that family.
4. Recheck previously good behavior after each wave. Do not trade gameplay truth, world identity, camera safety, or readability for spectacle.
5. Continue through every in-scope family. “Planned,” “stubbed,” “behind a flag,” and “old fallback still available” are not migrated.

Validation after each coherent family

- Run repository canonical static checks and existing shader checks that answer the active question.
- Inspect registrations, event flow, transform units, radii, timeline, capacities, reset, overflow, bounds, uniforms/attributes, blend/depth roles, render order, warmup, and disposal.
- Search migrated paths and built manifests where available for forbidden sources, duplicate parameter writers, per-frame allocations, uncapped emitters, stale flags, loaders, preloads, and fallback render paths.
- Prove each deleted file/asset has zero production imports, registry entries, settings, editor controls, and fallback references.
- Check diff hygiene, UTF-8, links, file endings, and line limits. Commit and push only owned coherent units under repository rules.
- Use browser, screenshot, gameplay, or performance tools only when [RUNTIME_REVIEW_PERMISSION] grants them now. Use existing bounded project tooling, never a new harness. Without permission, leave exact manual questions and claim no visual result or FPS.

Finish only when

- Inventory covers every in-scope visible family with one unambiguous owner.
- Every in-scope family is migrated through production or has one objective external blocker naming exact missing input; no self-fixable family remains “planned.”
- Shared event/spatial/performance contracts reach every migrated family.
- Forbidden visible source types, permanent dual paths, displaced assets, dead loaders, stale controls, and duplicate writers are absent.
- Gameplay radii, timing, collision, AI, camera safety, terrain truth, and product flow remain intact unless explicitly owned changes say otherwise.
- Pools, caps, reset, overflow, warmup, degradation, and disposal have static evidence.
- Canonical checks pass; runtime and performance claims do not exceed granted evidence.
- Manual gates, if any, name exact representative states and questions instead of “check everything.”

Work in a self-directed family-by-family loop until all conditions are true or an objective external blocker is documented. Do not stop after inventory, foundation, pilot, or partial migration.
```

---

## 3. Existing project — add a new VFX family

```text
Use this prompt when

A healthy production runtime needs one new effect or coherent family without a broad migration.

Mission

Add [NEW_EFFECT_OR_FAMILY] to [PROJECT] in [ENGINE/RENDERER] through the existing production VFX, gameplay, render, audio, and terrain/reaction owners. Deliver a distinct, readable, procedural effect—not a new framework, parallel renderer, generic recolor, or isolated demo.

Effect inputs

- Gameplay function and player promise: [WHAT_IT_COMMUNICATES]
- Trigger owner and event phases: [SOURCE/TIMELINE]
- Exact origin, direction, path, radius, cone, volume, or surface footprint: [SPATIAL_TRUTH]
- Neighboring effects it must differ from: [EFFECTS_AND_DIFFERENCES]
- Quality references: [OPTIONAL_REFERENCES_AND_SPECIFIC_QUALITY_ROLES]
- Known runtime budget/baseline: [BUDGET_OR_UNKNOWN]
- Runtime review permission for this assignment: [RUNTIME_REVIEW_PERMISSION]

Start rules

1. Read repository rules, active task/plan, current VFX owner, gameplay event contract, renderer/post path, canonical checks, and Git policy.
2. Inspect the current tree and Git diff. Find the real production trigger, final spatial truth, shared runtime, pool patterns, parameter owner, and disposal route before designing.
3. Extend healthy existing infrastructure. Do not fork schemas, clocks, frame loops, post stacks, live settings, or terrain reaction.
4. Keep unrelated and foreign changes untouched. Use no subagent unless this family contains multiple large disjoint tracks.

Non-negotiable procedural source contract

- Every visible shape in the new family uses project-owned handwritten native shader code plus runtime-generated geometry: GLSL, WGSL, HLSL, or the renderer's equivalent source path.
- Allowed: analytic noise, signed-distance fields, parametric ribbons/tubes/quads, generated solids, fixed-buffer particles, instancing, targeted material patches, and renderer-owned depth/color/reaction targets.
- Forbidden: bitmap/noise/LUT/decal textures as effect sources, sprite sheets, flipbooks, videos, baked VFX meshes, imported effect packs, copied foreign shaders, and generated wrappers that hide them.
- Character, weapon, world, terrain, and UI assets remain allowed in their intended roles. They may not conceal baked effect animation.
- References supply quality reasons only. Do not copy their shader text, code, exact skill, silhouette, palette, UI, audio, branding, or proprietary assets.

Required effect brief

Before code, define:

- First read and dominant silhouette
- Anticipation, release, travel/hold, contact, reaction, and recovery beats
- Stable cast/event ID and deterministic seed policy
- One final origin, direction, path/footprint, radius, and surface source shared by consumers
- Exact visible/gameplay footprint rule
- Matter/occlusion, core, rim/light, debris/spray, and aftermath roles with blend/depth behavior
- Geometry, motion, timing, material, and aftermath differences from neighboring effects
- Fixed capacity, peak overlap, overflow behavior, reset contract, bounds, warmup, quality tiers, and degradation order

Quality and integration contract

- The chain must read: First Read → Anticipation → Release → Spatial Path or Footprint → Contact → Reaction → Aftermath/Recovery.
- Gameplay, animation, VFX, sound, camera response, and terrain reaction share one cast/event identity, final timing, and world-space anchors.
- Never derive secondary layers from a second player position, frame-delta path, or hand-tuned radius. Sample the final path/footprint once and feed all consumers.
- Visible telegraph/AoE geometry equals gameplay truth from the first dangerous frame through contact.
- Secondary layers react to the dominant form. Bloom and particles support it; they do not hide missing geometry or contact.
- The effect remains readable beside neighboring effects and under representative overlap without hiding enemies, terrain, reticle, exits, or damage information.

Performance and ownership envelope

- Reuse neutral frame data, geometry transport, shader math, materials/programs, and pools only where they fit. Keep this family's visible shell and authored parameters with one clear owner.
- Preallocate repeated runtime data. Use fixed capacity, full acquire/release/reset scrubbing, explicit drop/reuse/degrade behavior, and no allocation during overflow.
- No per-frame mesh, geometry, material, shader program, light, or growing-array creation. Warm required shader variants through the real render setup.
- Budget transparent coverage, lights, shadows, post energy, particles, memory, and shader variants with existing effects. Do not invent FPS, draw-call, memory, or hitch claims.
- Degrade hidden work → distant/background density → secondary trails/motes/aftermath → safe resolution/shadow detail. Never degrade exact footprint, collision truth, contact beat, dominant silhouette, enemy readability, or input response.

Scoped migration and cleanup

- Do not migrate unrelated families.
- If the insertion path is healthy, extend it without broad refactoring.
- If a placeholder, forbidden source, duplicate owner, or structurally incompatible helper directly blocks this family, replace only that coupled slice at cause level.
- Once replacement is live, remove the displaced source, asset, loader, preload, registry, flag, editor control, fallback, and dead config after references reach zero. Do not ship a permanent compatibility path.
- Preserve gameplay timing, damage, collision, AI, movement, camera safety, and product flow unless this mission explicitly owns them or a coupled defect is proven.

Validation

1. Trace the real trigger through event data, final transform/units, runtime registration, render order, sound/contact/reaction consumers, and disposal.
2. Inspect timeline boundaries, exact radii, reset after different prior histories, pool overflow, deterministic replay where required, bounds, uniforms/attributes, blend/depth roles, warmup, and quality degradation.
3. Run canonical repository checks and relevant existing shader checks after the coherent unit.
4. Search the new path for forbidden sources, duplicate writers, per-frame allocations, uncapped emitters, hidden fallback paths, and orphan references.
5. Check diff hygiene, UTF-8, links, file endings, and line limits. Commit and push only owned files under repository rules.
6. Use browser, screenshot, gameplay, or performance tools only when [RUNTIME_REVIEW_PERMISSION] explicitly grants them now. Reuse existing bounded project tooling; never create a harness by default. Otherwise name exact manual gates and make no visual/FPS claim.

Finish only when

- The real production trigger reaches the new family; no detached demo is the only integration.
- The effect brief is implemented from first read through recovery.
- Visible footprint and gameplay truth share one source; all secondary consumers share final anchors and timing.
- The family has a distinct shell, intentional material/blend/depth roles, fixed capacity, clean reset, overflow, warmup, degradation, and disposal.
- No forbidden source, permanent fallback, displaced placeholder, duplicate parameter owner, or uncapped path remains in the delivered scope.
- Canonical checks pass, behavior outside the owned scope stays intact, and runtime claims match granted evidence.

Keep working until every condition is true or an objective external blocker identifies exact missing input. Do not stop at a design brief, infrastructure-only commit, or “ready for integration.”
```

---

## 4. Existing project — adjust or repair an existing VFX family

```text
Use this prompt when

A shipped procedural effect looks, behaves, resets, or performs wrong and needs a cause-level repair.

Mission

Repair [EXISTING_EFFECT_OR_FAMILY] in [PROJECT] / [ENGINE/RENDERER] so it changes from [CURRENT_PROBLEM] to [TARGET_PLAYER_READ/BEHAVIOR]. Diagnose the real cause before tuning. Preserve every proven good behavior outside the stated target.

Adjustment inputs

- Failing state and reproduction context: [WHEN/WHERE/OVERLAP/CAMERA]
- Target first read, timing, shape, contact, material, or performance behavior: [TARGET]
- Gameplay truth that must remain exact: [TIMING/PATH/RADIUS/COLLISION/DAMAGE]
- Neighboring effects/readability constraints: [CONSTRAINTS]
- Evidence already available: [CODE/LOG/MEASUREMENT/REFERENCE/USER_REPORT]
- Runtime review permission for this assignment: [RUNTIME_REVIEW_PERMISSION]

Start rules

1. Read repository rules, active task/plan, the effect owner, gameplay event source, renderer/post path, parameter source, canonical checks, and Git policy.
2. Inspect the current Git diff and full output path: trigger → timing → spatial data → pool/runtime → shader/geometry → render/post → sound/contact/reaction → cleanup.
3. Separate observation from assumption. Compare at least these cause levels before choosing the fix: wrong source/owner, wrong timeline/space, wrong dominant form/material role, wrong budget/reset/lifecycle, or genuinely wrong authored parameter.
4. Change a parameter only when evidence places the cause there. If repeated tuning leaves the same fault, rebuild the coupled slice at the cause level.
5. Keep unrelated and foreign changes untouched. Do not create a second runtime or broad migration project.

Non-negotiable procedural source contract

- Every visible effect shape in the adjusted family must use project-owned handwritten native shader code and runtime-generated geometry: GLSL, WGSL, HLSL, or the renderer's equivalent source path.
- Allowed: analytic noise, signed-distance fields, parametric ribbons/tubes/quads, generated solids, fixed-buffer particles, instancing, targeted material patches, and renderer-owned depth/color/reaction targets.
- Forbidden: bitmap/noise/LUT/decal textures as effect sources, sprite sheets, flipbooks, videos, baked VFX meshes, imported effect packs, copied foreign shaders, or wrappers that hide those sources.
- Character, weapon, world, terrain, and UI assets remain allowed in their intended roles; they may not conceal baked effect animation.
- References provide diagnostic quality reasons only. Do not copy their code, shaders, exact effect, silhouette, palette, UI, branding, audio, or proprietary assets.

Diagnosis and quality contract

- Map the current chain: First Read → Anticipation → Release → Spatial Path or Footprint → Contact → Reaction → Aftermath/Recovery. Name the first broken link.
- Verify one stable cast/event ID, timeline, seed policy, final origin, direction, path/footprint, intensity, and lifecycle reach every consumer.
- Verify gameplay, animation, VFX, sound, camera response, and terrain reaction share final timing and space. Remove duplicate paths derived from player position, frame delta, or hand-tuned lookalike radii.
- Visible telegraph/AoE boundaries must equal gameplay truth from the first dangerous frame through contact.
- Preserve or restore one dominant silhouette. Give matter/occlusion, core, rim/light, debris/spray, and aftermath explicit material, blend, depth, and timing roles.
- Keep this family distinct from neighbors through geometry, motion, timing, material response, contact, and aftermath—not palette, count, scale, bloom, or light alone.
- Preserve player, enemy, terrain, reticle, exits, and damage readability under the reported overlap.

Performance, reset, and lifecycle contract

- Reuse the established frame, event, geometry, material/program, pool, post, and parameter owners when healthy. Repair wrong ownership instead of adding another writer.
- Use fixed capacity, complete acquire/release/reset scrubbing, deterministic seeds where required, explicit overflow behavior, correct bounds, warmup, quality tiers, and disposal.
- Run a reset reasoning gate with at least two different prior histories: a reused slot must not inherit old owner, path, time, alpha, seed, cursor, transform, or secondary object state.
- No per-frame mesh, geometry, material, shader, light, or growing-array creation. Overflow must drop/reuse/degrade without allocating.
- Budget transparent coverage, dynamic lights, shadows, post energy, particles, memory, and variants together. Do not claim performance change without measurement permission and evidence.
- Degrade hidden work → distant/background density → secondary trails/motes/aftermath → safe resolution/shadow detail. Never degrade exact footprint, collision truth, contact beat, dominant silhouette, enemy readability, or input response.

Scoped migration and cleanup

- If the family already meets the source and ownership contract, keep its sound foundation and make the smallest complete cause-level repair.
- If the touched family uses a forbidden source, duplicate owner, wrong generic shell, or incompatible lifecycle, migrate that family completely rather than masking it with tuning.
- Do not migrate unrelated VFX.
- Route the real trigger to the repaired owner, then remove displaced assets, loaders, preloads, flags, controls, duplicate config, stale fallback, and dead comments after references reach zero.
- Preserve gameplay timing, damage, collision, AI, movement, camera safety, and product flow unless explicitly in scope or a coupled defect is proven.

Validation

1. Record the proven cause and selected repair in the existing task owner; do not create a competing plan.
2. Inspect event units, transform spaces, timeline transitions, exact footprint, family identity, blend/depth roles, overlap, capacities, reset, overflow, bounds, warmup, degradation, and disposal.
3. Run canonical repository checks and relevant existing shader/static checks after the coherent repair.
4. Search the touched family for forbidden sources, duplicate writers, stale fallbacks, per-frame allocations, uncapped emitters, and orphan assets/references.
5. Recheck previously good behavior in the family and directly coupled consumers. Do not broaden into unrelated cleanup.
6. Check diff hygiene, UTF-8, links, file endings, and line limits. Commit and push only owned coherent files under repository rules.
7. Use browser, screenshot, gameplay, or performance tools only when [RUNTIME_REVIEW_PERMISSION] grants that exact review now. Use existing bounded project tooling and one named question per pass; do not build a harness or loop unchanged candidates. Without permission, leave exact manual gates and make no visual/FPS claim.

Finish only when

- The first broken causal link is repaired at its actual owner, not hidden by unrelated intensity/count changes.
- Target behavior is implemented while named gameplay truth and previously good behavior remain intact.
- The touched family meets procedural source, shared timing/space, exact footprint, identity, pool/reset, overflow, warmup, degradation, and disposal contracts.
- Any displaced family-local legacy path and its assets/loaders/controls have zero references.
- Canonical checks pass; visual and performance statements stay within granted evidence.
- Remaining manual gates name the exact state and question.

Work in a cause-driven loop until these conditions are true or an objective external blocker names exact missing input. Do not repeat the same tuning axis after evidence shows the cause lives elsewhere.
```

---

## 5. Running long task — checkpoint, migrate VFX, and resume

```text
Use this prompt when

An agent is already deep in another assignment and one named VFX path must migrate without losing work or abandoning the original goal.

Interrupt mission

You are already executing [ORIGINAL_TASK_OR_ACTIVE_PLAN]. At the nearest safe coherent checkpoint, temporarily migrate only [VFX_SCOPE] in [PROJECT] / [ENGINE/RENDERER] to the procedural runtime contract below, remove that VFX scope's displaced legacy path, validate it, then immediately resume the original task from its exact highest open item. This is a controlled detour, not a hard stop, context reset, broad VFX overhaul, or permission to abandon the original finish criteria.

Detour inputs

- Existing task/plan owner: [TASK_FILE_OR_SESSION_GOAL]
- Exact VFX family/path to migrate: [VFX_SCOPE]
- Explicit VFX exclusions: [OUT_OF_SCOPE]
- Gameplay truth to preserve: [TIMING/PATH/RADIUS/COLLISION/DAMAGE/AI/CAMERA/FLOW]
- Known quality target or defect: [TARGET]
- Runtime review permission for this assignment: [RUNTIME_REVIEW_PERMISSION]

Safe checkpoint protocol — do this first

1. Read repository rules, the original task owner, VFX/render owner, canonical checks, and Git policy. Inspect current branch, status, staged files, diff, and production imports.
2. Classify changed files as yours/current-task, foreign/unrelated, generated, or untracked. Never stage, rewrite, delete, stash, reset, revert, or “clean up” foreign work.
3. Record a compact append-only checkpoint in the existing task owner or approved handoff location: original goal and finish gate; completed coherent units; current incomplete unit; owned changed files; foreign files to avoid; last checks and exact results; exact highest open resume item; next safe command.
4. If your current unit is halfway through an edit and cannot safely pause, finish only the smallest coherent boundary needed to keep the repository valid. Run the repository's canonical static gate for code changes. Do not expand the original task before the detour.
5. Commit and push that owned coherent checkpoint only when repository rules require it. Never mix the upcoming VFX migration or foreign files into the checkpoint commit.
6. Do not change branch/worktree, create a rival plan, or discard uncommitted work. If an objective external blocker prevents a valid checkpoint, record the exact file/state/input and stop only at that boundary.

VFX detour scope rule

- Touch only [VFX_SCOPE] plus the smallest directly coupled event, pool, renderer-registration, sound/contact/reaction, asset-removal, and documentation paths required for a complete migration.
- Do not migrate neighboring effects, redesign shared gameplay, or start a global VFX foundation unless [VFX_SCOPE] cannot reach production without one missing neutral contract. In that case add only the smallest reusable contract proven by this family.
- Keep one production renderer, frame loop, post stack, event/spatial truth, terrain-state owner, and parameter owner. No detached demo or permanent dual path.
- Preserve all original-task behavior and all named gameplay truth unless this detour explicitly owns a proven coupled defect.

Non-negotiable procedural source contract

- Every visible shape in [VFX_SCOPE] must use project-owned handwritten native shader code plus runtime-generated geometry: GLSL, WGSL, HLSL, or the renderer's equivalent source path.
- Allowed: analytic noise, signed-distance fields, parametric ribbons/tubes/quads, generated solids, fixed-buffer particles, instancing, targeted material patches, and renderer-owned depth/color/reaction targets.
- Forbidden: bitmap/noise/LUT/decal textures as effect sources, sprite sheets, flipbooks, videos, baked VFX meshes, imported effect packs, copied foreign shaders, or generated wrappers that conceal them.
- Character, weapon, world, terrain, and UI assets remain allowed in their intended roles; they may not hide baked effect animation.
- References define quality reasons only. Never copy code, shader text, exact effects, silhouettes, palettes, UI, branding, audio, or proprietary assets.

VFX quality and spatial contract

- Implement the full chain: First Read → Anticipation → Release → Spatial Path or Footprint → Contact → Reaction → Aftermath/Recovery.
- One stable cast/event ID, timeline, deterministic seed where needed, final world origin, direction, path/footprint, intensity, and lifecycle drives gameplay-facing consumers.
- Gameplay, animation, VFX, sound, camera response, and terrain reaction share the same final timing and spatial anchors. Never reconstruct a second path from player position, frame delta, or hand-tuned constants.
- Visible telegraph/AoE geometry equals gameplay truth from the first dangerous frame through impact.
- Define a dominant silhouette plus intentional matter/occlusion, core, rim/light, debris/spray, and aftermath roles. Bloom and particles support the form; they do not replace it.
- Keep the family distinct through geometry, motion, timing, material response, contact, and aftermath—not recolor, scale, count, or light alone.
- Preserve enemy, player, terrain, reticle, exits, and damage readability under representative overlap.

VFX performance and migration contract

- Inventory the touched family only: production owner, trigger/timeline, spatial truth, visible source, render role, parameter owner, capacity, target replacement, and removal proof.
- Reuse healthy neutral frame, event, geometry, material/program, pool, post, and parameter infrastructure. Replace wrong family-local source, owner, path, phase, or lifecycle at cause level.
- Preallocate repeated runtime data. Use fixed capacities, complete acquire/release/reset scrubbing, explicit overflow policy, correct bounds, warmup, quality tiers, and disposal.
- No per-frame mesh, geometry, material, shader, light, or growing-array creation. Overflow drops/reuses/degrades without allocating.
- Budget transparent coverage, dynamic lights, shadows, post energy, particles, memory, and variants together. Never invent FPS, frame time, draw-call, memory, or hitch claims.
- Degrade hidden work → distant/background density → secondary trails/motes/aftermath → safe resolution/shadow detail. Never degrade exact footprint, collision truth, contact beat, dominant silhouette, enemy readability, or input response.
- Route the real production trigger to the replacement. Then remove this family's displaced effect assets, loaders, preloads, registries, flags, editor controls, duplicate config, fallback branches, and dead comments after references reach zero.
- Do not leave legacy and replacement active together after the detour closes.

Detour validation and delivery

1. Inspect cast/event flow, timeline, transform units, exact path/footprint, sound/contact/reaction anchors, render roles, capacities, reset after different prior histories, overflow, bounds, warmup, degradation, and disposal.
2. Run repository canonical checks and relevant existing shader/static checks after the coherent VFX migration.
3. Search [VFX_SCOPE] for forbidden sources, copied shader text, duplicate writers, stale fallbacks, per-frame allocations, uncapped emitters, and orphan assets/references.
4. Prove every removed family-local source has zero production imports, preload/registry entries, settings, controls, and fallback references.
5. Check diff hygiene, UTF-8, links, file endings, and line limits. Commit and push only owned VFX files under repository rules; keep this commit separate from unrelated original-task work when practical.
6. Use browser, screenshot, gameplay, or performance tools only when [RUNTIME_REVIEW_PERMISSION] explicitly grants that exact review now. Reuse existing bounded project tooling; do not create a harness. Otherwise leave exact manual gates and claim no visual/FPS result.
7. Append the VFX result, check evidence, commit, and exact resume point to the existing checkpoint. Do not replace or rewrite earlier task history.

Mandatory resume protocol

1. Re-read the checkpoint and current Git status after the VFX commit.
2. Confirm foreign/unrelated changes are still untouched and the original task's owned files retain their expected state.
3. Restore the original task context, constraints, acceptance criteria, and exact highest open item.
4. Immediately continue implementation from that item. Do not ask for permission, stop after the migration, or return a “next steps” list instead of working.
5. Continue the original task through its own canonical checks, commits, push policy, completion review, and original finish gate. The VFX detour never weakens or replaces those criteria.

Finish only when

- The pre-detour work reached a safe documented coherent checkpoint without losing or mixing foreign changes.
- [VFX_SCOPE] runs through the real production trigger and fully meets source, causal-chain, shared-space, exact-footprint, pool/reset, overflow, warmup, degradation, cleanup, and static validation contracts.
- The displaced family-local legacy path and all of its assets/loaders/controls/fallbacks have zero references.
- The VFX unit is delivered under repository Git rules and runtime claims match granted evidence.
- The original task was resumed from the recorded highest open item and carried forward to its original completion gate or an objective external blocker naming exact missing input.

Do not stop between checkpoint → VFX migration → cleanup → validation → delivery → original-task resume. Stay in the loop until the original assignment's finish condition is met.
```
