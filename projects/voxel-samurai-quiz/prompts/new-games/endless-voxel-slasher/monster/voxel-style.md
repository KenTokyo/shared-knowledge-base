# Voxel Style — Monster HTML-Only Chat Prompt

**Use:** Paste the complete block into a chat interface to request one offline monster showcase.

```text
Create a premium interactive 3D monster gallery as exactly one self-contained file named `monster.html`. Return a downloadable file attachment when supported; otherwise return exactly one complete `html` fenced code block and nothing else. The saved file must run by double-click through `file://`. Put all HTML, CSS, ordinary JavaScript, GLSL strings, procedural geometry, generated texture data, SVG/data URIs, and optional Web Audio inside that file. No terminal, CLI, npm, build step, server, import, module, CDN, fetch, network request, external library, font, image, sound, model, worker file, or second asset.

Build a real raw-WebGL2 showcase, not a static picture, fake 3D card, sprite sheet, or DOM cube pile. The first read is a full-screen premium creature showroom: one selected stone-like voxel monster fills a clean hero viewport while a compact collection rail exposes all ten species immediately. Use an original authored look. Treat Monster Hunter only as a benchmark for species readability, Minecraft Dungeons only as a benchmark for clean voxel-diorama presentation, and Shadow of the Colossus only as a benchmark for boss scale. Copy no creature, asset, lore, UI, animation, sound, or proprietary design.

GALLERY CONTRACT

- Show exactly ten selectable creatures from the fixed roster below: eight regular species and two clearly marked bosses.
- Provide ten numbered selector buttons, creature name, Regular/Boss tag, scale class, locomotion type, and one short English design capsule.
- Add mouse/touch orbit, wheel/pinch zoom, drag rotation, previous/next controls, keyboard keys `1`–`0`, auto-rotate toggle, reset camera, pause, and `Idle`, `Move`, `Attack`, and `Hit` animation buttons.
- Keep the selected creature centered, fully visible, grounded, and large enough to judge at desktop and mobile sizes. Hide debug overlays by default and include a simple humanoid-sized stone marker for scale.
- Use a restrained faceted plinth, distant voxel silhouettes, soft atmosphere, and authored key/fill/rim lighting. The environment supports the creature and never hides its silhouette.
- Show a clear English WebGL2 error if unsupported. Keep every label, tooltip, status, and accessibility name in English.

HARD CREATURE CONTRACT

- Every species must read as a different creature in solid-black silhouette: unique main mass, support pattern, proportions, negative space, head construction, locomotion, scale, material breakup, eye arrangement, idle rhythm, and signature attack.
- Build coherent form hierarchies from tapered, overlapping faceted voxel modules. Boxes and wedges are construction tools, not the final read. No random cube stacks, recolored shared body, generic humanoid, standard golem with swapped horns, detached limbs, or VFX used to hide weak anatomy.
- All bodies are stone, mineral, crystal, slate, basalt, obsidian, or flint constructions with believable heavy mass, chipped edges, layered plates, compressed joints, contact wear, and controlled surface variation.
- The eyes are the only visible facial feature on every regular creature and boss. Eyes may vary in count, spacing, color, depth, and motion, but each head is otherwise a fully sealed stone mask: no visible mouth, jaw opening, nose, nostrils, teeth, tongue, lips, skin, or human face.
- Each creature needs articulated full-body `Idle`, `Move`, `Attack`, and `Hit` states. Weight travels through the root and support limbs; feet plant, wings generate lift, coils propagate, heavy parts lag, and recovery returns the whole body to balance.
- Each signature action follows load → body source → contact or release → recoil/reaction → readable recovery. Effects may add dust, chips, sparks, refraction, or pressure only where material or contact causes them.
- Bosses are original complete body plans with authored scale and phase-like escalation, not enlarged regular creatures.

FIXED VOXEL ROSTER — EXACTLY THESE TEN

1. `Shardhorn Ram` — regular charger; forward wedge shoulders, four column legs, a crown of broken mineral horns, deep amber slit eyes, and a whole-body brace before impact.
2. `Cairn Hound` — regular pursuit beast; low six-leg chassis, arched cairn spine, long counterweight tail, paired cyan eyes under one sealed brow, and a rapid alternating scuttle-lunge.
3. `Obsidian Mantis` — regular duelist; high triangular thorax, four fine support legs, two heavy glass-black blade arms, tiny magenta pin eyes, and a folding overhead strike.
4. `Quartz Burrower` — regular ambusher; broad low digging mass, shovel forelimbs, crystal ridge, four green eyes inset in one blank plate, and a dive-to-eruption attack.
5. `Slatewing Roc` — regular flier; compact keel body, huge layered slab wings, dangling stone talons, two pale eyes in a sealed spearhead mask, and a weighted dive with real wing recovery.
6. `Basalt Tortoise` — regular tank; low fortress dome, four short piston legs, offset armor terraces, calm lime eyes beneath the shell lip, and a shell-driven ground pulse.
7. `Flintcoil Serpent` — regular controller; long tapered chain of interlocking flint segments, fin-like stabilizers, a single blue eye pair in a closed wedge head, and a traveling coil-whip wave.
8. `Monolith Ape` — regular bruiser; massive forearm supports, compact hind legs, narrow suspended torso, red rectangular eyes in a blank brow block, and a two-beat knuckle slam.
9. `Cathedral Colossus` — boss; four arch-like load legs carry a towering buttressed body with open negative spaces, a suspended mineral heart, a vertical row of gold eyes on a sealed face tower, and a staged collapse-and-rise shockwave.
10. `Riftglass Kraken` — boss; hovering central stone mantle, eight unequal radial glass-stone limbs, a rotating ring of violet eyes with no mouth, and a multi-directional limb sweep followed by a refractive pressure burst.

VOXEL STYLE DIRECTION

- Favor bold authored slabs, wedges, terraces, arches, bevel-like stepped edges, mineral seams, and deliberate negative spaces.
- Palette: grounded basalt, slate, chalk stone, obsidian, quartz, and selective eye color. Keep base materials mostly matte; reserve sharp highlights and emissive energy for eyes, fresh fractures, and action contacts.
- Use a warm key against cool fill so black stone stays readable. Add contact shadow, restrained ambient occlusion, distance fog, and subtle tone mapping without crushing silhouettes or blooming the eyes into blobs.
- The ten species must feel like one mineral ecosystem while never sharing the same body template.

RUNTIME AND SOURCE QUALITY

- Use one WebGL2 renderer, one animation loop, reusable mesh builders, indexed buffers, shared primitive/material families, and cached creature definitions. Render only the selected hero at full detail; do not keep ten hidden full-detail scenes running.
- Keep update work allocation-light, clamp delta time, pause when hidden, cap device pixel ratio and transient particles, dispose replaced GPU resources, handle resize/context loss, and preserve controls after repeated creature switching.
- Design toward smooth 60 FPS on a modern desktop with the selected boss animating, but never claim measured performance unless the page actually measures it. Reduce background shards, shadow resolution, DPR, and secondary dust before reducing silhouette, eyes, main animation, or contact clarity.
- Keep source readable with named sections and small functions/classes for math, renderer, geometry, creature definitions, rig evaluation, animation, effects, input, camera, UI, and lifecycle. Do not minify.

DONE WHEN

- One offline `monster.html` opens directly and contains the complete experience.
- Exactly ten selector entries and exactly the ten named creatures exist; entries 9 and 10 are bosses.
- Every creature is distinct without text, color, or effects and has four working animation states.
- Every face exposes eyes only and no forbidden facial feature from any angle or animation.
- Selection, camera, controls, responsive layout, error state, and repeated switching work without external files.
- The final response is only the downloadable file or one complete `html` code block containing `monster.html`.
```
