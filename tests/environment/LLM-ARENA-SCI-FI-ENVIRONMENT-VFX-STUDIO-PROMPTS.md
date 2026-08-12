
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
- Use one compact 90 × 70 meter blank sci-fi test stage: a matte graphite floor, a shallow central depression, two low ramps, three waist-high test blocks, one open wind corridor, and a distant dark backdrop. Do not generate a world, village, mountain, combat system, or large landscape.
- Put one simple original neutral human mannequin in the stage for scale. Use a close third-person follow camera that keeps the full person visible; mouse orbits and WASD moves the mannequin. Do not spend effort on character detail or gameplay.
- Add only enough natural material to reveal airflow: two small grass patches, one strip of taller grass, three simple original trees, one red-leaf emitter tree, and a few low shrubs. Keep placement, geometry, density, and materials identical in every variation.
- Place part of that vegetation inside the near field the default camera actually sees — some low grass within roughly 12 meters of the stage center, not only around the edges. Wind is judged by what it visibly moves; if every reactive object sits 15+ meters away from the person, a correct wind field still reads as "nothing is happening".
- Make the environment system the hero: global view-distance fog around the person, a restrained secondary ground-mist layer, suspended dust and pollen, wind-lifted grit, falling and flying red leaves, moving vegetation, and intermittent windborne smoke wisps.
- The primary fog is camera-centered atmospheric extinction across the full view, not a bright sheet on the floor. It must reduce visibility progressively in every direction, obscure distant trees and geometry before nearby objects, reach far above the camera, and remain convincing while the person moves. Keep the nearby silhouette readable without creating an obvious clear bubble.
- Windborne smoke has no vent, chimney, fire, or permanent emitter. Spawn soft elongated wisps at seeded random positions along the upwind boundary and inside the air volume. Gusts stretch, shear, curl, split, and dissolve them across the stage. Avoid stationary white balls and repeated vertical columns.
- Use one world-space wind truth for every reactive layer. A gust must travel through the stage coherently: grass bends at the gust front, dust lifts, leaves accelerate and tumble, smoke wisps appear and shear downwind, and trees respond according to stiffness and inertia.
- Leaves must not look like flat confetti moving at one speed. Give them seeded variation in size, mass, drag, lift, spin axis, flutter frequency, tumbling, color, lifetime, and spawn height. They should sweep across the camera at several depths, occasionally rise in vortices, lose energy, settle or recycle outside view, and preserve the main wind direction.
- Separate the atmosphere into broad distance fog, restrained ground mist, intermittent airborne smoke wisps, fine dust/pollen, and sparse near-camera leaves. Fog controls visibility; ground mist only adds low detail; smoke shows gust structure; dust remains finer and more ballistic.
- Keep illumination fixed in all runs: one cool overhead studio source, one warm low rim source, soft contact shadows, fixed exposure, and restrained bloom. Do not provide light position, light color, light intensity, shadow, time-of-day, or exposure controls.
- Use an original clean sci-fi presentation with neutral dark materials so smoke, dust, leaves, and vegetation remain readable. Avoid a neon nightclub look, excessive bloom, opaque fog walls, and UI that covers the stage.
- Use no imported map, environment, character, or complex vegetation assets. Runtime-generated simple geometry and procedural materials are sufficient; effort belongs in motion, layering, depth, and control rather than asset production.
- Before submitting, confirm that every element named in this brief is actually present at runtime. A type check is not sufficient: shaders compile at runtime, so a name that a stage does not know — a uniform declared for the fragment stage but read in the vertex stage, a helper function included in only one prelude — drops that object out of the scene silently while the build stays green. If shader code is composed from shared chunks, keep the declaration next to the value it belongs to, and check that both stages see every name they read. Report any element you could not verify instead of leaving it unstated.

## Required controls

Create one compact right-side **Environment Console**. Show the numeric value beside every slider.

- Wind direction: `0–359°`
- Base wind speed: `0–18 m/s`
- Gust strength: `0–24 m/s`
- Gust frequency: `0–1.5 Hz`
- Turbulence: `0–2`
- Vertical lift: `0–8 m/s`
- Global fog density: `0.0000–0.1200 m⁻¹`, including true zero and fine four-decimal control near zero
- Fog vertical reach: `0.5–150 m`
- Fog start distance: `0–20 m`
- Fog breakup: `0–1`
- Ground-mist amount: `0–0.35`; it must never replace the global fog
- Windborne smoke-wisp amount: `0–1`
- Smoke-wisp event rate: `0–2 Hz`
- Dust amount: `0–1`
- Leaf amount: `0–1`
- Vegetation response: `0–1`
- Optional collapsed Post section: bloom `0–1`, contrast `0.8–1.3`, saturation `0–1.3`, vignette `0–0.5`

Display **effective visibility distance** derived from fog extinction as a read-only value. The density slider must be nonlinear or logarithmic so low densities are tunable instead of jumping immediately to whiteout. Fog vertical reach must genuinely support camera-height fog and map-wide high fog; it must not merely scale a ground plane.

Add **Clear Air**, **Light Haze**, **Dense Fog**, and **Windstorm** presets. Dense Fog must hide the far side of the stage while preserving the person and a short readable near field. Windstorm must generate intermittent moving smoke wisps and gust fronts, not fixed plumes.

`R` resets the seed and preset; `Space` launches one deterministic gust with a smoke-wisp event; `F` freezes simulation; `G` shows wind vectors, fog integration bounds, wisp spawn regions, active counts, and wakes; `1–4` selects presets; `C` cycles three third-person comparison cameras. Use bounded pools and frame-rate-stable updates.

Show real FPS, frame time, draw calls, triangles, active leaves, dust, smoke wisps, fog resolution, and seed. Keep scene, fixed lighting, cameras, controls, and preset values identical in every variation.


## Variation 1.1 — Analytic wind and shader-instanced particles

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep the exact 90 × 70 meter stage, vegetation, fixed lighting, cameras, controls, presets, displayed seed, post controls, diagnostics, and HUD from the locked brief.

Implement one analytic world-space wind function shared conceptually by every system. Combine a normalized base direction, slow directional meander, traveling sine gust bands, height-dependent speed, seeded hash turbulence, and small curl-like vertical lift. Keep all inputs explicit and ensure the Space-key gust travels across the room as a visible front rather than increasing every object everywhere at once.

Use instanced runtime geometry with custom vertex/fragment shaders for bounded leaves, dust, pollen, and smoke wisps. Store seeded per-instance data and derive stable motion from time, wind, lifetime, drag, lift, gravity, flutter, and spin without moving thousands of JavaScript objects each frame. Spawn smoke wisps intermittently from seeded upwind positions as stretched soft volumes; never attach them to fixed stage objects.

Implement the primary fog as depth-aware camera-to-fragment extinction, through a full-screen depth pass or a shared material shader chunk. Apply distance, vertical reach, animated low-frequency breakup, and subtle fixed-light in-scattering along the view ray. It must surround the third-person character and reduce sight distance across the whole stage. Ground mist is only a restrained secondary layer.

Leaves tumble and arc, grit hugs the floor, pollen drifts, and smoke wisps shear horizontally with gusts. Deform vegetation from the same analytic field. Recycle all instances deterministically, keep capacities fixed, and expose actual counts. Aim for a strong, efficient shader baseline; approximate obstacle wakes are acceptable.
```

## Variation 2 — Fixed-step CPU particle physics and spatial collisions

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep the exact stage, vegetation, fixed lighting, cameras, controls, presets, seed, post controls, diagnostics, and HUD unchanged.

Run the environment motion through a deterministic fixed-step CPU simulation with a bounded structure-of-arrays particle pool. Define one windAt(position, time) query containing base flow, traveling gusts, turbulence, vertical lift, and simple local vortices. Give leaves, grit, pollen, and smoke parcels separate force profiles for mass, drag, lift, buoyancy, gravity, flutter torque, angular damping, and lifetime. Batch updated transforms into InstancedMesh buffers; do not create one Three.js object per particle.

Use the floor, ramps, central depression, and test blocks as simple analytic colliders. Leaves may glance, bounce, slide, settle, and be lifted again; grit should make short low hops; smoke parcels should avoid hard clipping and broaden after passing an obstacle. Use a coarse spatial hash or fixed cells only where needed. Drive grass and tree deformation from the same wind query, with springs that show material stiffness and delayed recovery.

Render global camera-centered distance fog with a depth-aware analytic pass and high vertical reach; use ground mist only as secondary detail. Emit CPU smoke parcels intermittently from seeded upwind regions so gusts form horizontal wisps with no visible source. Keep pools capped and overflow allocation-free. The G overlay must reveal visibility distance, fog bounds, wisp events, particle velocity, contacts, pool occupancy, and wind samples. Prioritize believable individual motion and inspectable deterministic physics over maximum density.
```

## Variation 3 — GPGPU advection with GPUComputationRenderer

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep the locked scene, vegetation, fixed lighting, cameras, controls, presets, seed, post controls, diagnostics, and HUD exactly comparable.

Use Three.js GPUComputationRenderer or an equivalent ping-pong floating-point render-target simulation for the airborne environment. Store particle position/lifetime and velocity/type in data textures. Update leaves, dust, pollen, and fine smoke motes entirely on the GPU from one GLSL wind field containing base direction, traveling gust fronts, multi-scale curl noise, height variation, lift, drag, gravity, and emitter influence. Render the data through instanced generated geometry without CPU readback in the normal frame loop.

Give each particle class distinct integration rules. Leaves need stable per-particle mass, tumbling quaternion or angular-state approximation, flutter and lift; dust stays low and loses vertical energy; pollen drifts softly; smoke motes rise, spread, and inherit downwind velocity. Use signed-distance approximations for the floor, ramps, depression, and blocks so particles are pushed out or deflected and form visible wakes rather than clipping through everything. Deform vegetation in shaders by evaluating the same GLSL wind function and gust phase.

Combine the GPU particles with global depth-aware distance fog spanning the full camera view and high vertical reach. Spawn smoke-wisp particles from changing seeded upwind volumes, never from vents or fixed points; let gusts stretch them into broad horizontal streaks. Reset computation textures deterministically. The G view must visualize visibility distance, simulation resolution, wisp regions, wind vectors, obstacle fields, capacity, and particle classes. Favor dense smooth motion while controlling render-target cost and transparent overdraw.
```

## Variation 4 — Shared 2.5D flow-field lattice with gust fronts and wakes

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep every locked scene, UI, fixed-light, camera, preset, seed, control, post, and HUD value the same.

Make a shared 2.5D airflow lattice the central system. Cover the stage with a modest XZ grid and enough height layers to surround the third-person camera. At a fixed rate, inject base flow, traveling gust fronts, turbulence, vertical lift, changing upwind smoke-wisp regions, and sparse seeded vortices. Enforce the floor, ramps, depression, and blocks as obstacle cells so flow bends around solids and creates sheltered zones and wakes. Interpolate windAt(position) from the final field for every consumer.

Advect pooled leaves, dust, pollen, smoke parcels, and ground-mist control points through the lattice. Preserve material-specific behavior after field sampling: leaves add flutter, spin, inertia, gravity, and lift; dust adds ground friction and short saltation hops; smoke adds buoyancy and diffusion; mist stays low and spreads laterally. Grass, shrubs, tree trunks, branches, and crowns must sample nearby cells with different stiffness and spring response so the same gust front visibly crosses the whole set.

Integrate global distance extinction from the camera through the high fog field; do not fake it with a ground plane. Render intermittent smoke wisps and restrained ground mist with depth-faded slices or soft volume shells. The G overlay must show visibility distance, airflow vectors, blocked cells, wakes, gust fronts, fog height, and wisp spawn regions. Prioritize shared cause-and-effect: one gust should bend vegetation, lift dust, carry leaves, and create then reshape an airborne smoke wisp.
```

## Variation 5 — Depth-aware volumetric fog and raymarched smoke

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep the exact locked stage, vegetation, fixed lighting, cameras, controls, presets, seed, post controls, diagnostics, and HUD.

Treat atmospheric image quality as the main experiment. Raymarch a camera-centered participating medium from the camera to scene depth so fog fills the complete view volume and genuinely limits sight distance. Support density down to true zero, high vertical reach up to 150 meters, near-start distance, animated 3D breakup, restrained fixed-light scattering, temporal stabilization, bilateral upsampling, and minimal banding. Ground mist remains a separate low-density detail layer.

Use one analytic world-space wind field for fog modulation, instanced leaves, dust, pollen, vegetation, and intermittent smoke wisps. Create smoke as temporary warped density volumes at seeded random upwind positions. Gusts stretch them laterally, roll their edges, split them around obstacles, and dissolve them; no vent, fixed plume, or repeated white sphere is allowed. Preserve crisp leaf and grit cues in front of the softer atmosphere and keep the third-person silhouette readable.

Allow quality tiers to change ray step count, volume scale, history quality, and secondary particle density without changing controls or composition. The G overlay must show volume bounds, raymarch resolution, step count, history validity, depth intersections, and estimated transparent/volume cost. Avoid using bloom to fake density. Prioritize soft layered depth, plausible plume breakup, stable camera motion, and cinematic atmosphere while honestly exposing the fill-rate cost.
```

## Variation 6 — Layered hybrid production environment system

```text
Build the locked compact React + Vite + TypeScript + Three.js Sci-Fi Environment VFX Studio. This is an environment-effects benchmark, not world generation. Keep the exact locked mini-stage, vegetation, fixed lighting, cameras, controls, presets, seed, post controls, diagnostics, and HUD.

Use a production-oriented hybrid stack with one WindState and one windAt(position, time) contract. Build macro flow from an analytic directional field and traveling gust fronts. Add a low-resolution obstacle-aware flow grid around the ramps, blocks, and depression plus sparse deterministic vortices. Smooth vegetation through stiffness-based springs sampling the same final field.

Choose the right representation per layer: GPU-instanced leaves, dust, pollen, and grit; vertex-shader vegetation; a camera-centered depth-aware fog pass for map-wide visibility extinction and high vertical fog; restrained ground mist; and bounded low-resolution volumes for intermittent windborne smoke wisps. Spawn wisps at changing seeded upwind positions and couple them to gust phase, local flow, breakup, and lifecycle. No fixed smoke emitter or permanent plume is allowed. Leaves combine macro advection with inertia, flutter, tumbling, lift, vortices, settling, and deterministic recycling.

Make transitions invisible. A Space-key gust should enter from the upwind boundary, propagate through vegetation, split around geometry, lift dust, carry leaves through several depths, generate and tear apart a smoke wisp, and leave a settling aftermath. Global fog remains spatially continuous around the moving person and controls sight distance independently of ground mist. Keep capacities, render targets, and quality degradation explicit.

The G overlay must identify which layer uses analytic flow, local grid flow, particles, slices, or raymarching, and show timing/cost per subsystem where available. Aim for the best overall balance of AAA-style visual layering, coherent physics cues, art-directable sliders, stable reset, and practical desktop performance rather than winning only one isolated category.
```

## Recommended judging order

1. First take inventory: grass, taller grass, trees, red leaves, dust, ground mist, and smoke wisps must all be visible near the person. A whole missing layer is usually a silent runtime shader failure, not a weak effect — check the browser console before scoring the wind as poor.
2. Use **Light Haze** and confirm that global fog surrounds the third-person character and progressively hides distance in every direction.
3. Raise fog vertical reach above camera height, then move the person; the effect must remain volumetric and must not reveal a flat fog ceiling or ground plane.
4. Sweep global density from `0.0000` to whiteout and verify precise control at the low end plus a useful short near field at high density.
5. Press `Space`; one gust must bend vegetation, lift dust, carry leaves, and generate a moving source-less smoke wisp with believable delay and decay.
6. Use **Windstorm** and confirm smoke never repeats as fixed white balls or vertical vent plumes.
7. Reset the seed repeatedly, compare macro replay stability, then compare frame time, draw calls, active counts, and quality degradation.
8. Prefer Variation 6 for production balance, Variation 5 for fog quality, Variation 4 for airflow causality, Variation 3 for density, Variation 2 for inspectable physics, or Variation 1 for the fastest strong base.
