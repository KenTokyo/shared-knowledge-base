# LLM Arena prompts — boxer animation, VFX, and countryside estate

Use each prompt as a standalone coding challenge. The four versions keep the same core scene while increasing detail and constraint pressure. No reference images are required.

## Variation 1 — Tiny

```text
Build a small interactive Three.js showcase: a powerful original boxer stands outside a photorealistic luxury countryside house. Let users click five skill buttons to watch anatomy-aware fighting animations with charge-ups, explosive impacts, wind, fog, dust, shockwaves, foliage reaction, and realistic physics. Give each skill a clear wind-up, strike, contact, recoil, and recovery. Include the landscaped garden, carport, glass sunroom, pergola, hot tub, pavilion, greenhouse, vegetable garden, driveway, stone wall, cypress trees, and forest backdrop. Keep it polished, cinematic, fast, and easy to test.
```

## Variation 2 — Short

```text
Create a compact browser-based Three.js VFX and animation demo. The hero is an original heavyweight boxer with the impact, speed, and camera energy of a premium 3D fighting game, without copying any existing character, move, logo, sound, or asset.

Place him in the garden of a photorealistic luxury countryside estate with authentic architecture. Show the house, landscaped garden, carport, glass sunroom, pergola, hot tub, pavilion, greenhouse, vegetable garden, driveway, stone wall, cypress trees, forest backdrop, and convincing exterior details.

Add five clickable skills: Gale Jab, Impact Cross, Cyclone Hook, Comet Uppercut, and Overdrive Combo. Each move needs readable anticipation → charge-up → strike → contact → recoil → recovery. Use anatomy-aware footwork, hip rotation, shoulder drive, weight transfer, guard return, and grounded feet. Layer physically believable wind, pressure distortion, fog, dust, sparks, debris, shock rings, grass movement, leaf motion, and brief restrained bloom. Effects must follow the fists and impact points, react to the estate environment, and never hide the pose.

Keep the UI minimal: skill buttons, replay, slow motion, and reset. Prioritize visual quality, responsive controls, stable performance, and instant comparison between skills.
```

## Variation 3 — Medium

```text
Build a polished, self-contained Three.js skill showcase designed to judge one thing fast: how good a model can make character animation and real-time VFX look.

Create one original muscular boxer, framed like a premium 3D fighting-game fighter but not copied from Tekken or any other franchise. Use a realistic human silhouette, detailed training clothes, gloves, skin shading, grounded contact shadows, and anatomy-aware motion. The boxer must move through the full kinetic chain: planted foot → ankle and knee drive → hip turn → core tension → chest and shoulder rotation → elbow path → fist contact → recoil → balanced guard recovery. Avoid sliding feet, frozen hips, broken wrists, weightless punches, robotic pauses, and instant pose snapping.

The stage is a photorealistic luxury countryside estate built in Three.js. Use authentic architecture and model every visible exterior surface with convincing scale and PBR materials. Include a landscaped garden, carport, glass sunroom, pergola, hot tub, pavilion, greenhouse, vegetable garden, driveway, stone wall, cypress trees, and layered forest backdrop. Add natural sunlight, soft shadows, subtle atmospheric fog, reflections in glass and water, wind-reactive plants, and strong foreground/middle-ground/background depth. Every listed feature must be visible from at least one useful camera angle.

Let users click or press 1–5 to trigger:

1. Gale Jab — compressed air gathers around the glove, then releases as a tight pressure cone.
2. Impact Cross — strong rear-foot pivot, torso torque, contact flash, dust kick, and expanding shock ring.
3. Cyclone Hook — curved fist trail, corkscrew wind, pulled leaves, and directional garden movement.
4. Comet Uppercut — deep leg load, rising strike, sparks, debris lift, vapor column, and delayed ground pulse.
5. Overdrive Combo — short charge with inward-moving fog and particles, then a readable multi-hit burst and final explosive hit.

Each skill needs anticipation, charge, release, contact, follow-through, recoil, and recovery. Build VFX from a strong primary shape plus restrained secondary layers: fist trail, pressure wave, dust, fog, sparks, debris, light, and aftermath. Effects must use the final animated fist path and exact impact point, obey direction and gravity, affect nearby grass and leaves, and fade cleanly. Keep bloom controlled so body mechanics stay readable.

Provide a clean skill rail, active state, cooldown, replay, pause, 0.25× slow motion, reset, orbit camera, and one-click cinematic camera. Prevent skill overlap while an animation is active. Keep all effects reusable and bounded so repeated clicks do not create memory leaks or falling frame rates.

Aim for realistic materials and physics with heightened fighting-game punch. The final result should feel like a tiny premium VFX review tool, not a full game or a rough tech demo.
```

## Variation 4 — Extended benchmark

```text
Create a complete but intentionally small Three.js browser experience for comparing AI-generated character animation and real-time VFX. The app must open directly into one polished scene, let the viewer trigger five boxer skills within seconds, and make visual strengths or failures obvious. Spend effort on the character, impacts, environment response, lighting, and replay tools—not quests, enemies, menus, inventory, or progression.

## Character and animation

Build one original elite heavyweight boxer. Capture the visual force and cinematic readability of a top-tier 3D fighting game while copying no existing franchise character, costume, move, logo, sound, animation, or asset. Use realistic proportions, detailed gloves and training gear, high-quality skin and cloth materials, a stable fighting stance, subtle breathing, guard motion, eye focus, and idle weight shifts.

Every attack must show believable anatomy and momentum:

- feet grip the ground instead of sliding;
- knees and hips initiate force;
- core, back, chest, and shoulders visibly drive the punch;
- elbows and wrists follow safe, readable arcs;
- the center of mass shifts and settles naturally;
- cloth and glove follow-through respond after the body;
- recoil, guard return, breathing, and balance complete the move;
- transitions blend smoothly with no frozen joints, pose popping, foot skating, or weightless motion.

Use a clear beat structure for every move: anticipation → muscle tension → charge-up → release → contact → peak effect → follow-through → recoil → recovery → idle. Keep the boxer readable in silhouette at every major beat.

## Five test skills

Expose five large skill buttons and keyboard keys 1–5:

1. **Gale Jab** — a fast lead jab. Fine dust and mist pull toward the glove during charge, pressure wraps tightly around the forearm, and contact emits a narrow air cone with directional leaf movement.
2. **Impact Cross** — a heavy rear straight. Show heel lift, hip rotation, torso torque, shoulder drive, a sharp contact flash, compressed fog shell, garden dust kick, and expanding low shock ring.
3. **Cyclone Hook** — a broad hook driven by the hips. Use a curved fist trail, coherent vortex ribbon, rotating debris, bent grass, and leaves that continue moving after the fist stops.
4. **Comet Uppercut** — a loaded rising punch. Compress the stance first, then launch through the legs and spine. Add a rising vapor column, sparks, lifted grit, delayed debris fall, and a short ground-pressure pulse.
5. **Overdrive Combo** — a short, readable sequence rather than a blur. Pull fog, dust, and tiny particles inward during charge; give each hit a distinct contact beat; end with one controlled explosive burst, radial wind, shockwave, camera impulse, and settling aftermath.

VFX must have one dominant shape per beat. Secondary fog, sparks, dust, debris, light, distortion, and bloom should support that shape instead of becoming random particle noise. Drive trails, wind, lights, and contact effects from the final animated fist path and exact impact position. Use directional velocity, gravity, drag, turbulence, collision or ground contact where useful, and delayed settling. Nearby grass, flowers, hanging fabric, steam, water, and loose leaves should react to force with different mass and timing. Do not let effects clip through the boxer, spawn from the wrong hand, lag behind the punch, cover the whole screen, or erase detail through white bloom.

## Photorealistic countryside estate

Stage the boxer outside a photorealistic 3D luxury countryside house rendered in Three.js. Use authentic regional architecture, believable construction, correct scale, and complete exterior craftsmanship. Include all of these as real scene elements, not labels or flat backdrops:

- main house with roof structure, chimneys, gutters, downpipes, windows, doors, frames, sills, steps, foundations, trim, fixtures, and weathering;
- landscaped garden with layered planting, lawn variation, flowers, shrubs, paths, edging, furniture, and practical drainage;
- carport connected through a believable drive and walking route;
- glass sunroom with frames, transparent glazing, reflections, interior hints, and contact shadows;
- pergola with climbing plants and convincing beam construction;
- hot tub with water, cover details, controls, steam, and a usable deck area;
- separate pavilion with a clear purpose and furnished exterior zone;
- greenhouse with glass panels, framing, vents, shelves, and visible plants;
- vegetable garden with organized beds, soil, stakes, crops, tools, and irrigation clues;
- driveway with natural wear, material transitions, tire variation, and proper scale;
- stone boundary wall with varied stones, mortar, caps, gates, and grounded contact;
- cypress trees used as intentional vertical accents rather than repeated clones;
- dense forest backdrop with layered depth, silhouette variation, and atmospheric perspective.

Compose camera views so every listed exterior feature can be inspected. Keep paths, entrances, structures, garden zones, and vehicle access logically connected. Avoid floating objects, exposed primitives, repeated tree clones, texture tiling, paper-thin glass, perfectly clean surfaces, random prop scatter, or an empty showroom look.

## Lighting, weather, and camera

Use a warm late-afternoon sun, cool skylight, soft but readable contact shadows, physically based materials, natural exposure, subtle color grading, restrained bloom, glass and water reflections, and light volumetric haze. Wind should travel coherently through cypress crowns, shrubs, grass, fog, steam, and loose leaves with varied response by size and stiffness. Fog must reveal depth rather than wash out the house.

Use a responsive orbit camera for inspection plus fixed views for full body, side profile, close impact, and wide estate context. Add short procedural camera impulses only on major contact; never make the viewer lose the action. Preserve a clear view of feet, fist path, impact point, environmental response, and recovery.

## Review UI and runtime quality

Keep the interface compact and instantly understandable:

- five skill buttons with names, keys, active state, and short cooldown feedback;
- replay current skill;
- pause at the current beat;
- 1×, 0.5×, and 0.25× playback;
- previous-frame and next-frame stepping while paused;
- reset boxer, effects, camera, and environment;
- toggle labels for animation beats and VFX layers;
- toggle between cinematic and neutral lighting without rebuilding the scene.

Only one skill may own the boxer at a time. Repeated input must restart safely or queue once—never blend attacks into broken poses. Reuse bounded particle, light, trail, debris, and decal pools. Clear every effect and restore the same idle state after reset. Keep rendering responsive through instancing, sensible shadow budgets, texture reuse, level of detail for distant vegetation, and capped effect counts, but never remove the core visual layers to fake performance.

The finish line is a tiny, premium interactive showcase where a reviewer can click through all five skills, inspect motion in slow motion, judge explosive wind and fog physics, and still believe the detailed luxury estate surrounding the fighter. Make it photorealistic at rest, physically grounded in motion, dramatic at impact, and clean enough to compare across LLM Arena models.
```
