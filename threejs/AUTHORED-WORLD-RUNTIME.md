# Authored World Runtime — modern world-image pipeline

**Read when:** A complete world, map runtime, bake pipeline, gameplay camera, environment, or final image path is created or replaced.
**Status:** Optional, stack-neutral tips · measured better solution wins · change rights: [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)
**Style:** Compact bullets only; one clear fact per bullet.
**Cut:** Remove filler, intros, repetition, and needless articles; keep symptom, cause, action, evidence.

## Product contract

- **World looks assembled instead of designed** — Noise, props, light, and PostFX make separate local choices. → Start with one authored world specification covering macro landform, route, landmarks, water, build sites, biome roles, encounters, camera anchors, and foreground/middle/background intent.
  *claude-of-tsushima: validated `WorldSpec` drives complete world build · voxel-samurai-quiz: Ashen Coast and Sunken Shrine recovered quality only after the full world-image pipeline returned · 2026-07-28–08-07*

- **Editor view works, production drifts** — Terrain, water, collision, scatter, camera, and spawns rebuild approximate local truth. → Produce one finished world field; every render, physics, placement, gameplay, camera, and VFX consumer queries that result.
  *claude-of-tsushima: shared height/material/environment fields · voxel-samurai-quiz: floors 33/34 share bake, spawn, objective, occupancy, and arena contracts · 2026-07-30–08-07*

- **Expensive geography rebuilds live or loads stale** — Erosion, routes, banks, masks, normals, and placement support lack dependency ownership. → Bake every expensive deterministic derivation in ordered stages; cache output with schema, source, seed, generation-rule, and resolution hashes; reject mismatched bake/stamp pairs.
  *claude-of-tsushima: staged world bake and deterministic cache · voxel-samurai-quiz: matched binary/stamp pairs restored production worlds · 2026-07-30–08-07*

- **Map quality vanishes during integration** — Host mounts copied terrain beside its old fog, shadows, camera, post chain, or frame owner. → One host-native world runtime owns world build, environment, render order, HDR target, final PostFX, and teardown; one canvas, renderer, depth space, camera handoff, clock, and final frame remain active.
  *claude-of-tsushima: complete world boot order · voxel-samurai-quiz: shared-canvas adoption preserved Ashen Coast/Sunken Shrine image parity · 2026-08-06–08-07*

## Required image layers

- **Terrain reads flat across distance** → Couple useful terrain detail/LOD to projected size; preserve beauty, depth, and shadow placement across representations; use tight render bounds.
- **Vegetation reads as cards or noise** → Give vegetation distance roles: layered near grass, clustered middle vegetation, authored skyline mass, foliage atlases with correct alpha mips, and deterministic spatial batches.
- **World feels frozen** → Add bounded ambient life only after composition works: wind-driven grass, water waves, pollen, leaves, birds, precipitation, and local atmosphere; pool and cull every layer.
- **Lighting pieces disagree** → One Environment source controls sun direction/color, sky fill, atmosphere, fog, wind, water response, cascaded or equivalent shadows, exposure, and color grade.
- **PostFX creates style but destroys play** → Resolve one HDR image through deliberate tone mapping, bloom, god rays, depth of field, ambient occlusion, and grade; each pass needs a visible role, finite inputs, and a quality-tier budget.
- **Camera makes premium world look generic** → Author gameplay framing with shoulder distance/elevation, damped focus, collision, first-/third-person contracts, speed response, reset, and named review views tied to world composition.

## Build order

1. Mission, anti-goal, route, landmark hierarchy, arena, and size anchors.
2. Authored spec plus validated units, axes, fields, sites, spawns, and camera anchors.
3. Dependency-ordered terrain/water/road/material/biome/placement bake plus deterministic stamp.
4. Terrain, structures, water, vegetation, ambient life, and interactions from shared world truth.
5. Environment, cascaded shadows, gameplay camera, HDR target, and one final PostFX chain.
6. Spatial batches, LOD, culling, pools, quality tiers, teardown, and static/numeric gates.
7. Agentic visual/gameplay/performance review only with current explicit permission from `CODING-RULES.md` §8–9.

## Performance boundary

- **Extra layer has no budget** → Record CPU update, draw/pass, shader/program, memory, and GPU cost per layer; remove invisible work before reducing authored landmark, route, stable ground, or combat clarity.
- **Quality mode silently changes architecture** → Keep one runtime and world contract; quality tiers scale resolution, LOD distance, shadow reach, reflection/PostFX quality, vegetation density, and ambient-life cadence.
- **Imported world brings imported game** → Port world behavior and visible outcomes only; never copy source gameplay, UI, input, audio, classes, or private file/API shape unless product scope explicitly requires them.

## Handoffs

- Fields, terrain, bakes → [Map generation](MAP-GENERATION.md)
- Grass, foliage, ambient life → [Vegetation](VEGETATION.md)
- Camera, lighting, PostFX → [Light and camera](LIGHT-CAMERA.md)
- Frame order, teardown, reset → [Runtime integration](RUNTIME-INTEGRATION.md)
- LOD, batches, culling, budgets → [Performance](PERFORMANCE.md)
