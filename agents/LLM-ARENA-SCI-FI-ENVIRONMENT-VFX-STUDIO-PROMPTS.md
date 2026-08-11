
## Quick technical read

| Variation | Core technique | Strongest fit | Main tradeoff |
| --- | --- | --- | --- |
| 1 | Analytic wind + shader-instanced particles | Fastest polished baseline | Limited obstacle interaction |
| 2 | Fixed-step CPU particle physics | Transparent logic and strong collisions | Lower peak particle count |
| 3 | GPGPU texture simulation | Dense leaves, dust, and smoke motes | More GPU/debug complexity |
| 4 | Shared flow-field lattice | Coherent gust fronts and obstacle wakes | Grid cost and tuning effort |
| 5 | Depth-aware volumetric atmosphere | Best fog and smoke image quality | Fill-rate and raymarch cost |
| 6 | Layered hybrid production stack | Best overall quality/control balance | More subsystem integration |


# LLM Arena prompts — Sci-Fi environment VFX studio

Use the same studio scene, seed, camera, fixed lighting, controls, presets, effect counts, quality target, and performance HUD in every run. Change only the environment simulation and rendering method named by the variation. This is not a world-generation challenge. Compare wind coherence, gust readability, leaf motion, dust behavior, smoke advection, fog depth, vegetation response, parameter control, reset stability, and runtime cost.

## Locked studio brief

- Build a polished React + Vite + TypeScript + Three.js environment-VFX laboratory, managed with pnpm.
- Use one compact 90 × 70 meter blank sci-fi test stage: a matte graphite floor, a shallow central depression, two low ramps, three waist-high test blocks, four floor vents, one open wind corridor, and a distant dark backdrop. Do not generate a world, village, mountain, combat system, character, or large landscape.
- Add only enough natural material to reveal airflow: two small grass patches, one strip of taller grass, three simple original trees, one red-leaf emitter tree, and a few low shrubs. Keep placement, geometry, density, and materials identical in every variation.
- Make the environment system the hero. Show low ground fog, four distinct smoke plumes from vents, suspended dust and pollen, wind-lifted grit, falling and flying red leaves, moving grass, bending shrubs and trees, and one soft distant cloud or haze bank.
- Use one world-space wind truth for every reactive layer. A gust must travel through the stage coherently: grass bends first at the gust front, then dust lifts, leaves accelerate and tumble, smoke leans and breaks up, and trees respond according to their stiffness and inertia.
- Leaves must not look like flat confetti moving at one speed. Give them seeded variation in size, mass, drag, lift, spin axis, flutter frequency, tumbling, color, lifetime, and spawn height. They should sweep across the camera at several depths, occasionally rise in vortices, lose energy, settle or recycle outside view, and preserve the main wind direction.
- Separate the atmosphere into readable scales: broad distance fog, low rolling ground mist, localized smoke with buoyancy, thin dust/pollen, and sparse near-camera leaves. Fog must not be a uniform gray screen; smoke must not behave like fog; dust must remain finer and more ballistic than smoke.
- Keep illumination fixed in all runs: one cool overhead studio source, one warm low rim source, soft contact shadows, fixed exposure, and restrained bloom. Do not provide light position, light color, light intensity, shadow, time-of-day, or exposure controls.
- Use an original clean sci-fi presentation with neutral dark materials so smoke, dust, leaves, and vegetation remain readable. Avoid a neon nightclub look, excessive bloom, opaque fog walls, and UI that covers the stage.
- Use no imported map, environment, character, or complex vegetation assets. Runtime-generated simple geometry and procedural materials are sufficient; effort belongs in motion, layering, depth, and control rather than asset production.

## Locked controls and comparison contract

Create a compact right-side **Environment Console** with numeric values and reset buttons. All six variations must expose the same controls and ranges:

- Wind direction: `0–359°`
- Base wind speed: `0–18 m/s`
- Gust strength: `0–24 m/s`
- Gust frequency: `0–1.5 Hz`
- Turbulence: `0–2`
- Vertical lift: `0–8 m/s`
- Ground-fog density: `0–1`
- Fog height: `0.1–8 m`
- Smoke emission: `0–1`
- Smoke buoyancy: `0–6`
- Dust amount: `0–1`
- Leaf amount: `0–1`
- Vegetation response: `0–1`
- Optional collapsed Post section: bloom `0–1`, contrast `0.8–1.3`, saturation `0–1.3`, vignette `0–0.5`. These are presentation controls, not lighting controls.

Add four identical presets: **Calm**, **Breeze**, **Gale**, and **Storm Front**. Changing any slider overrides only that value. `R` restores the displayed fixed seed and default Breeze preset; `Space` fires one deterministic strong gust; `F` freezes/unfreezes simulation; `G` shows wind vectors, emitter bounds, fog volumes, particle counts, and obstacle/wake diagnostics; `1–4` selects presets; `C` cycles three fixed comparison cameras. Allow mouse orbit and WASD inspection without turning the task into gameplay.

Use a fixed-step simulation or an equivalent frame-rate-stable method. The same seed and preset must produce repeatable macro motion and a clean reset. Pause updates when the page is hidden and avoid giant catch-up steps. Use bounded pools/capacities, stable resource reuse, correct disposal, explicit bounds, and no uncapped emitter growth.

Show real runtime values for FPS, frame time, draw calls, triangles, active leaves, active dust, active smoke elements or volume resolution, and seed. Add a small direction compass and a horizontal wind-speed graph sampled from the actual live wind field. Quality settings may reduce secondary density or volume resolution, but must not change the locked scene, cameras, controls, macro wind direction, or preset values.


## Variation 1 — Analytic wind and shader-instanced particles

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep the exact 90 × 70 meter stage, vegetation, fixed lighting, cameras, controls, presets, displayed seed, post controls, diagnostics, and HUD from the locked brief.

Implement one analytic world-space wind function shared conceptually by every system. Combine a normalized base direction, slow directional meander, traveling sine gust bands, height-dependent speed, seeded hash turbulence, and small curl-like vertical lift. Keep all inputs explicit and ensure the Space-key gust travels across the room as a visible front rather than increasing every object everywhere at once.

Use instanced runtime geometry with custom vertex/fragment shaders for large bounded fields of leaves, dust, pollen, and fine smoke motes. Store seeded per-instance spawn data and derive stable motion from time, wind parameters, lifetime, drag, lift, gravity, flutter, and spin without moving thousands of JavaScript objects each frame. Use simple layered depth-faded ground-fog meshes and soft local smoke billboards or generated volume slices for the four vents. Deform grass blades, shrub clusters, branches, and leaf clusters in their vertex shaders from the same analytic field, with stiffness and delayed secondary sway.

Make direction and material class obvious: leaves tumble and arc, grit hugs the floor and hops, pollen drifts slowly, smoke rises before leaning downwind, and low mist slides in broad soft sheets. Use soft depth intersections and controlled transparency. Recycle particles deterministically outside the wind corridor, keep capacities fixed, and expose actual active counts. The result should be the simplest credible AAA-feeling baseline: visually layered, responsive, efficient, and easy to tune, while accepting that solid blocks only create approximate hand-authored wake zones rather than simulated airflow.
```

## Variation 2 — Fixed-step CPU particle physics and spatial collisions

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep the exact stage, vegetation, fixed lighting, cameras, controls, presets, seed, post controls, diagnostics, and HUD unchanged.

Run the environment motion through a deterministic fixed-step CPU simulation with a bounded structure-of-arrays particle pool. Define one windAt(position, time) query containing base flow, traveling gusts, turbulence, vertical lift, and simple local vortices. Give leaves, grit, pollen, and smoke parcels separate force profiles for mass, drag, lift, buoyancy, gravity, flutter torque, angular damping, and lifetime. Batch updated transforms into InstancedMesh buffers; do not create one Three.js object per particle.

Use the floor, ramps, central depression, and test blocks as simple analytic colliders. Leaves may glance, bounce, slide, settle, and be lifted again; grit should make short low hops; smoke parcels should avoid hard clipping and broaden after passing an obstacle. Use a coarse spatial hash or fixed cells only where needed. Drive grass and tree deformation from the same wind query, with springs that show material stiffness and delayed recovery.

Render broad distance fog and ground mist as inexpensive depth-faded procedural layers, while CPU parcels provide the shaped smoke and close atmospheric detail. Keep all pools capped and define overflow as deterministic oldest-particle reuse or skipped emission without allocation. The G overlay must reveal particle velocity, collider contacts, settled leaves, pool occupancy, and wind samples. Prioritize believable individual motion, collision readability, deterministic replay, and inspectable code over maximum particle density.
```

## Variation 3 — GPGPU advection with GPUComputationRenderer

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep the locked scene, vegetation, fixed lighting, cameras, controls, presets, seed, post controls, diagnostics, and HUD exactly comparable.

Use Three.js GPUComputationRenderer or an equivalent ping-pong floating-point render-target simulation for the airborne environment. Store particle position/lifetime and velocity/type in data textures. Update leaves, dust, pollen, and fine smoke motes entirely on the GPU from one GLSL wind field containing base direction, traveling gust fronts, multi-scale curl noise, height variation, lift, drag, gravity, and emitter influence. Render the data through instanced generated geometry without CPU readback in the normal frame loop.

Give each particle class distinct integration rules. Leaves need stable per-particle mass, tumbling quaternion or angular-state approximation, flutter and lift; dust stays low and loses vertical energy; pollen drifts softly; smoke motes rise, spread, and inherit downwind velocity. Use signed-distance approximations for the floor, ramps, depression, and blocks so particles are pushed out or deflected and form visible wakes rather than clipping through everything. Deform vegetation in shaders by evaluating the same GLSL wind function and gust phase.

Combine the GPU particles with depth-faded low fog and procedurally shaded smoke density shells around the four vents. Reset both computation textures deterministically from the displayed seed. The G view must visualize simulation texture resolution, emitter regions, wind vectors, obstacle distance fields, active capacity, and particle classes. Favor dense, smooth, frame-rate-stable motion and strong macro coherence while keeping render-target resolution and transparent overdraw under control.
```

## Variation 4 — Shared 2.5D flow-field lattice with gust fronts and wakes

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep every locked scene, UI, fixed-light, camera, preset, seed, control, post, and HUD value the same.

Make a shared 2.5D airflow lattice the central system. Cover the stage with a modest XZ grid and several height layers. At a fixed rate, inject the base directional flow, traveling gust fronts, turbulence, vertical lift, vent buoyancy, and sparse seeded vortices. Approximate divergence reduction or a lighter stable relaxation step, then enforce the floor, ramps, depression, and blocks as obstacle cells so the field bends around solids, slows in sheltered zones, and creates readable downstream wakes. Interpolate windAt(position) from this final field for every consumer.

Advect pooled leaves, dust, pollen, smoke parcels, and ground-mist control points through the lattice. Preserve material-specific behavior after field sampling: leaves add flutter, spin, inertia, gravity, and lift; dust adds ground friction and short saltation hops; smoke adds buoyancy and diffusion; mist stays low and spreads laterally. Grass, shrubs, tree trunks, branches, and crowns must sample nearby cells with different stiffness and spring response so the same gust front visibly crosses the whole set.

Render fog and smoke with generated depth-faded slices or soft volume shells, not one uniform scene-fog color. The G overlay must make the lattice understandable with direction arrows, speed colors, blocked cells, wake regions, gust-front position, and sampling heights. Keep grid resolution adjustable internally by quality tier but expose the same user controls as every other run. Prioritize the most convincing shared cause-and-effect: a reviewer should be able to watch one gust go around a block, lift dust at its edge, bend vegetation, carry leaves, and reshape smoke downstream.
```

## Variation 5 — Depth-aware volumetric fog and raymarched smoke

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep the exact locked stage, vegetation, fixed lighting, cameras, controls, presets, seed, post controls, diagnostics, and HUD.

Treat atmospheric image quality as the main experiment. Render broad height fog, rolling ground mist, the four vent plumes, and the distant haze bank through a half-resolution depth-aware volumetric pass or bounded raymarched proxy volumes. Build density mathematically from height falloff, analytic 3D noise, warped plume coordinates, buoyant rise, wind advection, gust compression, dissipation, and obstacle masks. Composite against scene depth with soft intersections, temporal stabilization that resets cleanly, bilateral upsampling, restrained light scattering from the fixed lights, and minimal banding.

Use one analytic world-space wind field for volume advection, instanced leaves, dust, pollen, and vegetation deformation. Leaves and grit remain generated instanced geometry with class-specific drag, gravity, flutter, tumble, and lift so the studio contains crisp directional cues in front of the softer volumes. Smoke must rise vertically near each vent, curl, then shear into the selected wind direction; ground mist must pool in the shallow depression and thin over ramps; distant haze must create depth without hiding silhouettes.

Allow quality tiers to change ray step count, volume scale, history quality, and secondary particle density without changing controls or composition. The G overlay must show volume bounds, raymarch resolution, step count, history validity, depth intersections, and estimated transparent/volume cost. Avoid using bloom to fake density. Prioritize soft layered depth, plausible plume breakup, stable camera motion, and cinematic atmosphere while honestly exposing the fill-rate cost.
```

## Variation 6 — Layered hybrid production environment system

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep the exact locked mini-stage, vegetation, fixed lighting, cameras, controls, presets, seed, post controls, diagnostics, and HUD.

Use a production-oriented hybrid stack with one WindState and one windAt(position, time) contract. Build macro flow from a cheap analytic directional field and traveling gust fronts. Add a low-resolution obstacle-aware flow grid only around the ramps, blocks, depression, and vents. Add sparse deterministic vortex events for visible leaf spirals and dust lifts. Smooth vegetation response through stiffness-based springs, but sample the same final field that drives all airborne effects.

Choose the most suitable representation per layer instead of forcing one technique everywhere: GPU-instanced leaves, dust, pollen, and grit; generated vertex-shader grass and foliage; depth-aware layered height fog for broad atmosphere; bounded low-resolution raymarched or sliced volumes for the four hero smoke plumes; and a soft procedural distant haze bank. Couple them through shared wind direction, gust phase, seed, emitter transforms, and lifecycle. Smoke begins with buoyancy, enters the local flow grid, breaks into turbulent lobes, and dissolves into broad haze. Leaves combine macro advection with inertia, flutter, tumbling, lift, vortices, near-ground settling, and deterministic recycling.

Make transitions between representations invisible. A Space-key gust should enter from the upwind boundary, propagate through grass and trees, split around geometry, lift dust at exposed edges, carry leaves through several depths, bend and tear smoke plumes, and leave a slowly settling aftermath. Keep capacities, render targets, volume resolution, and quality degradation explicit. Reduce distant density, secondary motes, and volume resolution before weakening the main gust, hero leaves, or smoke silhouettes.

The G overlay must identify which layer uses analytic flow, local grid flow, particles, slices, or raymarching, and show timing/cost per subsystem where available. Aim for the best overall balance of AAA-style visual layering, coherent physics cues, art-directable sliders, stable reset, and practical desktop performance rather than winning only one isolated category.
```

## Recommended judging order

1. Select **Breeze**, use Camera 1, and verify that every layer agrees on one wind direction without looking synchronized or mechanical.
2. Press `Space` once and judge whether a visible gust front travels through vegetation, dust, leaves, smoke, and fog with believable delays, inertia, and aftermath.
3. Select **Gale**, cycle all three cameras, and inspect leaf depth, tumbling, smoke breakup, ground-mist layering, and silhouette readability.
4. Select **Calm** and verify that smoke still has buoyancy, leaves settle, dust becomes sparse, vegetation recovers, and fog does not freeze into obvious cards.
5. Use `G` to inspect field continuity, emitter bounds, obstacle behavior, capacities, and whether diagnostics match the visible result.
6. Reset repeatedly with the same seed, compare macro replay stability, then compare real frame time, draw calls, triangles, active counts, and quality degradation.
7. Prefer Variation 6 for a production environment system, Variation 5 for atmosphere-first shots, Variation 4 for airflow causality, Variation 3 for particle density, Variation 2 for inspectable physics, or Variation 1 for the fastest strong prototype.
