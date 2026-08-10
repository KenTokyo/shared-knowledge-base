# LLM Arena prompts — boxer skill animation and VFX

## Variation 1 — Tiny

```text
Build a polished Three.js skill showcase with one photorealistic, Tekken-inspired heavyweight boxer on a minimal sci-fi VFX stage. Use a Three.js + hand-written custom GLSL pipeline with runtime-generated geometry for every skill effect. For VFX, use no bitmap or noise textures, texture splats, sprite sheets, flipbooks, videos, baked VFX meshes, or imported effect packs. Generate trails, particles, wind, fog, sparks, shockwaves, and debris procedurally in shader code. Add five clickable skills with keys 1–5. Give every punch anatomy-aware motion, visible muscle tension, grounded weight transfer, realistic physics, and a clean recovery. Show the active skill and keyboard controls in a compact bottom rail.
```

## Variation 2 — Short

```text
Create a compact Three.js animation and VFX showcase starring one original, photorealistic heavyweight boxer with premium 3D fighting-game energy. Place him on an endless dark studio floor surrounded by low fog, soft light columns, and a surreal sci-fi atmosphere.

Build every skill through a Three.js + hand-written custom GLSL VFX system. Write custom vertex and fragment shaders, generate BufferGeometry at runtime, and animate shader-driven particles. For VFX, use no bitmap, noise, or LUT textures, texture splats, sprite sheets, flipbooks, videos, baked VFX meshes, or imported effect packs. Generate noise mathematically inside GLSL and construct ribbons, rings, pressure cones, shards, fog volumes, and bursts procedurally.

Add five clickable skills with keyboard keys 1–5: Gale Jab, Thunder Cross, Cyclone Hook, Meteor Uppercut, and Overdrive Combo. Build each move around anticipation, muscle tension, foot pressure, hip rotation, shoulder drive, fist contact, recoil, and guard recovery. Layer fist trails, compressed wind, pressure distortion, fog pull, sparks, debris, shock rings, brief impact light, and camera impulse around the exact fist path and contact point.

Use Space to replay, P to pause, and R to reset. Show skill names, keys, active state, and cooldowns in a clean bottom rail. Keep controls instant, animation readable, impacts explosive, and repeated playback smooth.
```

## Variation 3 — Medium

```text
Build a polished browser-based Three.js VFX studio for quickly comparing character animation and skill effects. Feature one original, photorealistic, Tekken-inspired heavyweight boxer with realistic proportions, detailed gloves and training gear, skin and cloth shading, a focused guard stance, breathing, and subtle idle weight shifts.

Use a minimal cinematic stage: an endless charcoal floor, deep black space, thin volumetric light, drifting ground fog, and sparse floating dust. Frame the full body, feet, fist path, and impact zone clearly.

Build a custom procedural VFX runtime with Three.js + hand-written custom GLSL. Write dedicated vertex and fragment shaders for skill silhouettes, energy flow, particles, fog, distortion, contact, and aftermath. For VFX, use no bitmap, noise, or LUT textures, texture splats, sprite sheets, flipbooks, videos, baked VFX meshes, or imported effect packs. Create analytic masks, signed-distance shapes, hash noise, fractal noise, turbulence, and flow directly in GLSL. Generate ribbons, tubes, rings, cones, shards, trails, and particle buffers at runtime with reusable Three.js BufferGeometry. Feed every layer from shared cast events, the sampled fist path, and uniform data for time, origin, direction, impact, color, intensity, and lifecycle.

Trigger five skills by clicking their cards or pressing 1–5:

1. Gale Jab — a sharp lead jab with mist pulled into the glove and a narrow pressure cone at contact.
2. Thunder Cross — a heavy rear straight with planted footwork, hip torque, electric filaments, a contact flash, and a low shock ring.
3. Cyclone Hook — a wide hook with a curved air ribbon, rotating fog, sparks, and directional debris.
4. Meteor Uppercut — a deep leg load followed by a rising punch, vapor column, lifted grit, embers, and delayed debris fall.
5. Overdrive Combo — a charged multi-hit sequence with inward-flowing particles, distinct hit beats, and one large final blast.

Animate the full kinetic chain: foot load → knee drive → hip turn → core tension → chest and shoulder rotation → elbow path → fist contact → follow-through → balanced guard recovery. Show muscle compression and release through the torso, shoulders, arms, and legs. Keep feet planted and transitions fluid.

Give every skill one strong primary VFX shape supported by wind, fog, particles, sparks, debris, light, distortion, and aftermath. Drive every layer from the final animated fist path and exact contact point. Apply direction, gravity, drag, turbulence, floor collision, and delayed settling. Use restrained bloom and short camera impulses to preserve body readability.

Add a bottom skill rail with names, keys, active state, and cooldowns. Use Space to replay, P to pause or resume, R to reset, C to switch between full-body and impact cameras, and Left/Right Arrow to step frames while paused. Reuse bounded effect pools for consistent playback.
```

## Variation 4 — Extended

```text
Create a premium Three.js character-animation and real-time VFX showcase that opens directly into one focused studio scene. The experience should let a reviewer trigger five boxer skills within seconds, inspect every movement beat, and compare explosive effects across repeated runs.

## Fighter

Build one original, photorealistic, Tekken-inspired heavyweight boxer with powerful proportions, detailed boxing gloves, fitted training gear, realistic skin, visible muscle structure, cloth response, grounded contact shadows, eye focus, breathing, guard motion, and natural idle weight shifts.

Animate force through the full body. Feet grip the floor, knees and hips initiate motion, the core braces, the chest and shoulders rotate, the elbow guides the fist, and the center of mass moves into the strike. Show muscle tension building during anticipation, peaking at release, and settling through recoil. Blend each move through anticipation → charge → strike → contact → follow-through → recoil → guard recovery → idle.

## Studio atmosphere

Use an endless dark graphite floor inside a surreal sci-fi VFX studio. Add subtle floor reflections, thin volumetric beams, drifting low fog, suspended dust, distant geometric light shapes, and a deep black background. Use a strong rim light, soft frontal fill, readable skin tones, crisp contact shadows, controlled exposure, and restrained bloom. Compose the camera around the boxer’s full silhouette, planted feet, fist path, and impact point.

## Three.js + hand-written custom GLSL VFX system

Build all skill VFX from dedicated hand-written GLSL vertex and fragment shaders plus runtime-generated Three.js geometry. Apply this asset rule to every visible skill effect: no bitmap textures, noise textures, LUT textures, texture splats, sprite sheets, flipbooks, videos, baked VFX meshes, or imported effect packs. Generate all VFX shapes, masks, motion, breakup, color, opacity, and lighting procedurally. Character skin, clothing, and stage materials remain outside this VFX-only asset rule.

Use analytic signed-distance shapes, gradients, hash functions, fractal noise, curl-like flow, turbulence, Fresnel rims, depth fades, vertex deformation, and time-based lifecycle curves directly in GLSL. Build reusable runtime geometry for ribbons, tubes, rings, cones, shock shells, shards, trails, particle fields, and volumetric forms with BufferGeometry and instancing. Use renderer-owned depth and color targets for soft intersections, scene-aware distortion, and post effects.

Give each skill its own authored shader composition while sharing a small runtime contract. Pass time, phase, origin, direction, sampled fist path, impact point, color, intensity, seed, and lifecycle through explicit uniforms or instance attributes. Compile materials during startup, reuse bounded geometry and particle pools, reset every shader state on release, and keep draw calls and overdraw controlled.

Compose each ability from event-driven layers: anticipation silhouette → charge energy → release trail → contact core → pressure shell → sparks and debris → floor response → residual fog. Use charge, release, contact, peak, recoil, and end events as the timing source for animation, geometry, shaders, light, and camera.

## Skills and controls

Show five clickable skill cards in a compact bottom rail. Display each name, keyboard key, active state, and short cooldown.

1. Gale Jab — press 1. Pull fine mist and dust toward the lead glove during a quick charge. Release a tight air cone, glove trail, contact ripple, and directional floor fog.
2. Thunder Cross — press 2. Drive from the rear foot through the hips and shoulder. Wrap the arm in branching electric filaments, then fire a sharp contact flash, compressed vapor shell, sparks, and expanding ground shock ring.
3. Cyclone Hook — press 3. Rotate through a broad hook with a clean curved fist trail, coherent vortex ribbon, spiraling fog, rotating fragments, and a delayed crosswind sweeping the stage.
4. Meteor Uppercut — press 4. Compress the stance through legs and torso, then rise into the punch. Build a vertical vapor column, ember wake, lifted grit, glowing fragments, floor-pressure pulse, and delayed debris fall.
5. Overdrive Combo — press 5. Charge with fog, sparks, and dust flowing inward around the boxer. Give each punch a distinct contact beat and finish with a radial wind burst, dense shockwave, bright impact core, camera impulse, and settling aftermath.

Use Space to replay the current skill, P to pause or resume, R to reset, C to switch between full-body and close-impact cameras, Left/Right Arrow to step frames while paused, and 0 to return to the neutral camera.

## VFX and motion quality

Give each beat one dominant visual shape. Build supporting layers from pressure distortion, wind ribbons, fog displacement, sparks, grit, fragments, light, floor response, and residual haze. Sample the final animated fist path once and use it for trails, emission, lighting, and contact placement. Use directional velocity, gravity, drag, turbulence, floor collision, bounce, and staggered settling to create believable physical response.

Sync effects to clear animation events: charge, release, contact, peak, recoil, and end. Keep the boxer readable through every flash and shockwave. Let fog and debris preserve movement direction after contact. Use short camera impulses on major hits and stable framing during recovery.

Keep one skill active at a time. Queue one next input, reset cleanly to the same guard stance, and use bounded reusable pools for trails, particles, lights, fog bursts, and debris. Make every key press responsive and every replay visually consistent.

The finished result should feel like a tiny high-end fighting-game VFX studio: photorealistic character rendering, anatomy-driven boxing, dramatic charge-ups, explosive wind and fog, grounded physics, and fast keyboard-based skill comparison.
```
