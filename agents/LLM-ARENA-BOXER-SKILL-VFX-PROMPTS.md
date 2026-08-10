# LLM Arena prompts — boxer skill animation and VFX

## Variation 1 — Tiny

```text
Build a polished Three.js skill showcase with one photorealistic, Tekken-inspired heavyweight boxer on a minimal sci-fi VFX stage. Use a Three.js + hand-written custom GLSL pipeline with runtime-generated geometry for every skill effect. For VFX, use no bitmap or noise textures, texture splats, sprite sheets, flipbooks, videos, baked VFX meshes, or imported effect packs. Add five clickable skills with keys 1–5: Flame Jab, Thunder Cross, Stormfire Hook, Earthbreaker, and Overdrive Detonation. Generate layered flame, lightning, fused fire-thunder energy, explosive shockwaves, procedural floor cracks, displaced ground chunks, dust, sparks, and debris in shader code. Give every punch anatomy-aware motion, visible muscle tension, grounded weight transfer, realistic physics, and a clean recovery. Show the active skill and keyboard controls in a compact bottom rail.
```

## Variation 2 — Short

```text
Create a compact Three.js animation and VFX showcase starring one original, photorealistic heavyweight boxer with premium 3D fighting-game energy. Place him on an endless dark studio floor surrounded by low fog, soft light columns, and a surreal sci-fi atmosphere.

Build every skill through a Three.js + hand-written custom GLSL VFX system. Write custom vertex and fragment shaders, generate BufferGeometry at runtime, and animate shader-driven particles. For VFX, use no bitmap, noise, or LUT textures, texture splats, sprite sheets, flipbooks, videos, baked VFX meshes, or imported effect packs. Generate noise mathematically inside GLSL and construct ribbons, rings, pressure cones, shards, fog volumes, and bursts procedurally.

Add five clickable skills with keyboard keys 1–5: Flame Jab, Thunder Cross, Stormfire Hook, Earthbreaker, and Overdrive Detonation. Give Flame Jab a tight fire sheath, hot core, ember wake, and heat distortion. Give Thunder Cross branching leaders, restrikes, electric filaments, and a low shock ring. Fuse flame ribbons and lightning channels into a rotating plasma impact for Stormfire Hook. Make Earthbreaker drive force into the floor, opening procedural radial cracks, lifting ground chunks, throwing grit, and leaving a layered crater and fading fissure glow. End Overdrive Detonation with a compressed energy core, expanding blast shells, debris, smoke, and a heavy shockwave. Build each move around anticipation, muscle tension, foot pressure, hip rotation, shoulder drive, fist contact, recoil, and guard recovery. Drive every layer from the exact fist path, impact point, and animation event.

Use Space to replay, P to pause, and R to reset. Show skill names, keys, active state, and cooldowns in a clean bottom rail. Keep controls instant, animation readable, impacts explosive, and repeated playback smooth.
```

## Variation 3 — Medium

```text
Build a polished browser-based Three.js VFX studio for quickly comparing character animation and skill effects. Feature one original, photorealistic, Tekken-inspired heavyweight boxer with realistic proportions, detailed gloves and training gear, skin and cloth shading, a focused guard stance, breathing, and subtle idle weight shifts.

Use a minimal cinematic stage: an endless charcoal floor, deep black space, thin volumetric light, drifting ground fog, and sparse floating dust. Frame the full body, feet, fist path, and impact zone clearly.

Build a custom procedural VFX runtime with Three.js + hand-written custom GLSL. Write dedicated vertex and fragment shaders for skill silhouettes, energy flow, particles, fog, distortion, contact, and aftermath. For VFX, use no bitmap, noise, or LUT textures, texture splats, sprite sheets, flipbooks, videos, baked VFX meshes, or imported effect packs. Create analytic masks, signed-distance shapes, hash noise, fractal noise, turbulence, and flow directly in GLSL. Generate ribbons, tubes, rings, cones, shards, trails, and particle buffers at runtime with reusable Three.js BufferGeometry. Feed every layer from shared cast events, the sampled fist path, and uniform data for time, origin, direction, impact, color, intensity, and lifecycle.

Trigger five skills by clicking their cards or pressing 1–5:

1. Flame Jab — ignite a compact fire sheath around the lead glove, then release a sharp flame cone with a white-hot core, rolling orange edge, ember wake, heat distortion, and brief scorch response.
2. Thunder Cross — drive a heavy rear straight through branching electric leaders, crawling glove arcs, rapid restrikes, a compressed contact flash, sparks, and an expanding low shock ring.
3. Stormfire Hook — combine fire and thunder in one broad hook. Wrap the fist path with a rotating flame ribbon, thread lightning through its spine, form a plasma-bright contact core, and release a corkscrew pressure wave with burning electric fragments.
4. Earthbreaker — load the legs and torso, then hammer force into the floor. Generate radial fracture paths, widening crack ribbons, a crater rim, displaced ground chunks, rising dust sheets, flying grit, glowing fissures, and delayed debris settling.
5. Overdrive Detonation — charge a short multi-hit combo with inward-flowing particles. Give every punch a distinct contact beat, then compress the final energy into one core that erupts through layered blast shells, a dense shockwave, sparks, debris, smoke, and a heavy camera impulse.

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

Compose each ability from event-driven layers: anticipation silhouette → charge energy → release trail → contact core → pressure shell → sparks and debris → floor response → residual fog. Give fire a stable hot core, turbulent outer flame, ember advection, heat distortion, and cooling aftermath. Give thunder a main leader, secondary branches, crawl, restrike, contact ionization, and residual arcs. Build fire-thunder fusion from one sampled motion spine while preserving distinct flame and lightning timing. Build explosions from compression, core flash, staggered shells, shock front, debris, smoke, and decay.

Generate Earthbreaker damage at runtime from a seeded radial or Voronoi-style fracture graph. Convert fracture paths into shader-driven crack ribbons, crater displacement, raised rim geometry, bounded floor chunks, grit, dust, and fissure emission. Keep deformation local to the impact, preserve the floor’s original state, and rebuild it exactly on reset.

Use charge, release, contact, peak, recoil, and end events as the timing source for animation, geometry, shaders, light, and camera.

## Skills and controls

Show five clickable skill cards in a compact bottom rail. Display each name, keyboard key, active state, and short cooldown.

1. Flame Jab — press 1. Pull heat haze and tiny embers into the lead glove during a sharp charge. Form a tight procedural fire sheath with a white-hot inner core, rolling flame edge, directional ember wake, pressure cone, contact flare, and fading scorch response.
2. Thunder Cross — press 2. Drive from the rear foot through the hips and shoulder. Grow branching electric leaders along the arm, add crawling glove arcs and timed restrikes, then fire a compressed contact flash, spark spray, vapor shell, and expanding ground shock ring.
3. Stormfire Hook — press 3. Rotate through a broad hook that combines fire and thunder. Build a coherent flame ribbon around the sampled fist path, thread animated lightning channels through its spine, twist both into a plasma-bright impact core, and release a corkscrew shockwave, burning electric fragments, and residual ionized fog.
4. Earthbreaker — press 4. Drop the boxer’s weight through the legs, core, shoulder, and fist into the floor. Generate a seeded radial fracture graph at contact, widen it into glowing crack ribbons, depress a crater center, raise the rim, displace procedural floor chunks, and layer dust sheets, grit jets, rock fragments, ground shock rings, fissure light, and delayed settling. Restore the floor cleanly on reset.
5. Overdrive Detonation — press 5. Pull fog, sparks, embers, and dust inward through a charged multi-hit sequence. Give each punch its own contact flash and pressure shell. Compress fire and electricity into the final fist, then detonate a dense energy core through staggered blast shells, a radial wind wall, floor shockwave, sparks, debris, smoke, camera impulse, and long settling aftermath.

Use Space to replay the current skill, P to pause or resume, R to reset, C to switch between full-body and close-impact cameras, Left/Right Arrow to step frames while paused, and 0 to return to the neutral camera.

## VFX and motion quality

Give each beat one dominant visual shape. Build supporting layers from pressure distortion, wind ribbons, fog displacement, sparks, grit, fragments, light, floor response, and residual haze. Sample the final animated fist path once and use it for trails, emission, lighting, and contact placement. Use directional velocity, gravity, drag, turbulence, floor collision, bounce, and staggered settling to create believable physical response.

Sync effects to clear animation events: charge, release, contact, peak, recoil, and end. Keep the boxer readable through every flash and shockwave. Let fog and debris preserve movement direction after contact. Use short camera impulses on major hits and stable framing during recovery.

Keep one skill active at a time. Queue one next input, reset cleanly to the same guard stance, and use bounded reusable pools for trails, particles, lights, fog bursts, and debris. Make every key press responsive and every replay visually consistent.

The finished result should feel like a tiny high-end fighting-game VFX studio: photorealistic character rendering, anatomy-driven boxing, dramatic charge-ups, explosive wind and fog, grounded physics, and fast keyboard-based skill comparison.
```
