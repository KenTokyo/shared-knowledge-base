# Claude Flakes Style — Monster HTML-Only Chat Prompt

**Use:** Paste the complete block into a chat interface to request one offline monster showcase.

```text
Create a premium interactive 3D monster gallery as exactly one self-contained file named `monster.html`. Return a downloadable file attachment when supported; otherwise return exactly one complete `html` fenced code block and nothing else. The saved file must run by double-click through `file://`. Put all HTML, CSS, ordinary JavaScript, GLSL strings, procedural geometry, generated texture data, SVG/data URIs, and optional Web Audio inside that file. No terminal, CLI, npm, build step, server, import, module, CDN, fetch, network request, external library, font, image, sound, model, worker file, or second asset.

Build a real raw-WebGL2 showcase, not a static picture, fake 3D card, sprite sheet, or DOM cube pile. The first read is a full-screen premium creature showroom: one selected stone-like voxel monster fills a clean hero viewport while a compact collection rail exposes all ten species immediately. Use an original authored look. Treat Monster Hunter only as a benchmark for species readability, God of War Ragnarök only as a benchmark for cold material richness, and Shadow of the Colossus only as a benchmark for monumental boss scale. Copy no creature, asset, lore, UI, animation, sound, or proprietary design.

GALLERY CONTRACT

- Show exactly ten selectable creatures from the fixed roster below: eight regular species and two clearly marked bosses.
- Provide ten numbered selector buttons, creature name, Regular/Boss tag, scale class, locomotion type, and one short English design capsule.
- Add mouse/touch orbit, wheel/pinch zoom, drag rotation, previous/next controls, keyboard keys `1`–`0`, auto-rotate toggle, reset camera, pause, and `Idle`, `Move`, `Attack`, and `Hit` animation buttons.
- Keep the selected creature centered, fully visible, grounded, and large enough to judge at desktop and mobile sizes. Hide debug overlays by default and include a simple humanoid-sized stone marker for scale.
- Use a restrained snowfield plinth, distant ice silhouettes, sparse windblown flakes, and authored key/fill/rim lighting. The environment supports the creature and never hides its silhouette.
- Show a clear English WebGL2 error if unsupported. Keep every label, tooltip, status, and accessibility name in English.

HARD CREATURE CONTRACT

- Every species must read as a different creature in solid-black silhouette: unique main mass, support pattern, proportions, negative space, head construction, locomotion, scale, material breakup, eye arrangement, idle rhythm, and signature attack.
- Build coherent form hierarchies from tapered, overlapping faceted voxel modules. Boxes and wedges are construction tools, not the final read. No random cube stacks, recolored shared body, generic humanoid, standard golem with swapped horns, detached limbs, or VFX used to hide weak anatomy.
- All bodies are stone and mineral organisms beneath snow, rime, glacier ice, frost crystal, compressed shale, or aurora-reactive quartz with believable heavy mass, layered plates, compressed joints, contact wear, and controlled surface variation.
- The eyes are the only visible facial feature on every regular creature and boss. Eyes may vary in count, spacing, color, depth, and motion, but each head is otherwise a fully sealed stone mask: no visible mouth, jaw opening, nose, nostrils, teeth, tongue, lips, skin, or human face.
- Each creature needs articulated full-body `Idle`, `Move`, `Attack`, and `Hit` states. Weight travels through the root and support limbs; feet compress snow, wings generate lift, burrowers displace the surface, flexible armor cascades, heavy parts lag, and recovery returns the whole body to balance.
- Each signature action follows load → body source → contact or release → recoil/reaction → readable recovery. Effects may add snow displacement, ice chips, frost dust, crystal glints, or pressure only where material or contact causes them.
- Bosses are original complete body plans with authored scale and phase-like escalation, not enlarged regular creatures.

FIXED CLAUDE FLAKES ROSTER — EXACTLY THESE TEN

1. `Frostshard Lynx` — regular stalker; long low feline stone frame, spring-loaded rear legs, blade-like shoulder ice, paired blue eyes in a seamless narrow mask, and a silent crouch-to-pounce cycle.
2. `Rimeplate Elk` — regular charger; tall split-hoof supports, suspended mineral chest, broad branching ice crown, four pale eyes across a sealed forehead plate, and a sweeping antler-led pivot attack.
3. `Snowcairn Owl` — regular flier; rounded stone core, huge layered feather-slabs, short gripping talons, two gold eyes inside a blank circular face disk, and a lift-brake-drop sequence with real wing compression.
4. `Glacier Mole` — regular burrower; compact wedge torso, enormous shovel hands, tiny rear supports, six pink eyes on a smooth closed head plate, and a snow-bulge tunnel ending in an upward breach.
5. `Icicle Pangolin` — regular defender; arched plated body, small planted limbs, long counterweight tail, green eyes under a sealed overlapping brow, and a full-body curl followed by a rolling shard release.
6. `Permafrost Spider` — regular trapper; suspended faceted abdomen, eight long articulated shale legs, crystal anchor tips, a cluster of violet eyes on a featureless front shield, and a raised-body radial frost pin.
7. `Avalanche Bison` — regular bruiser; immense forward shoulder shelf, short powerful legs, layered snow-packed stone coat, two orange eyes recessed in a blank cliff-like brow, and a mass-driven shove that sheds a bounded snow front.
8. `Crystal Medusa` — regular controller; floating bell-shaped quartz mantle, six translucent stone ribbons, orbiting counterweights, one ring of cyan eyes with no other face, and a pulse that travels visibly from mantle to ribbon tips.
9. `Whiteout Behemoth` — boss; six-limbed asymmetrical snowstone predator with a high armored back, long stabilizing forelimbs, buried rear haunches, two lighthouse-red eyes in a sealed ice wall face, and a staged leap that lands through body compression and a circular snow collapse.
10. `Aurora Hydra` — boss; one massive rooted mineral body supports five independently articulated sealed stone neck-heads, each carrying a different eye pair and no mouth, while aurora-reactive seams route a synchronized multi-head charge into a bounded prism storm.

CLAUDE FLAKES STYLE DIRECTION

- Preserve a solid mineral body under every snow layer. Snow drapes upper planes, rime catches exposed edges, translucent ice reveals pressure fractures, and compressed dark stone anchors feet and joints.
- Use warm low-angle sunlight against cool sky fill, soft blue shadow, altitude haze, restrained ice sparkle, and clear contact darkening. The warm/cool split must reveal relief rather than tint everything cyan.
- Add bounded snow response beneath locomotion and attacks: compression, shallow tracks, displaced rim, and gradual soft recovery. Keep one small reusable field around the plinth; never grow marks or particles without a cap.
- The ten species must feel born from one frozen mineral ecosystem while never sharing the same body template, gait, attack source, or scale read.

RUNTIME AND SOURCE QUALITY

- Use one WebGL2 renderer, one animation loop, reusable mesh builders, indexed buffers, shared primitive/material families, and cached creature definitions. Render only the selected hero at full detail; do not keep ten hidden full-detail scenes running.
- Keep update work allocation-light, clamp delta time, pause when hidden, cap device pixel ratio, flakes, reaction writes, and transient particles, dispose replaced GPU resources, handle resize/context loss, and preserve controls after repeated creature switching.
- Design toward smooth 60 FPS on a modern desktop with the selected boss animating, but never claim measured performance unless the page actually measures it. Reduce distant flakes, reaction-field resolution, shadow resolution, DPR, and secondary frost dust before reducing silhouette, eyes, main animation, or contact clarity.
- Keep source readable with named sections and small functions/classes for math, renderer, geometry, creature definitions, rig evaluation, animation, snow response, effects, input, camera, UI, and lifecycle. Do not minify.

DONE WHEN

- One offline `monster.html` opens directly and contains the complete experience.
- Exactly ten selector entries and exactly the ten named creatures exist; entries 9 and 10 are bosses.
- Every creature is distinct without text, color, or effects and has four working animation states.
- Every face exposes eyes only and no forbidden facial feature from any angle or animation.
- Selection, camera, controls, responsive layout, error state, and repeated switching work without external files.
- The final response is only the downloadable file or one complete `html` code block containing `monster.html`.
```
