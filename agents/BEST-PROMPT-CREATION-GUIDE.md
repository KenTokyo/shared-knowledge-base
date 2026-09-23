This prompt has been the best prompt for creating anything, try always to replicate the start and the end on how to replicate or build things out, creating new games, you can basically use the subagents feature to replicate, but not needed for smaller tasks, depending on the task, try to think, if its needed


# create claude tsushima game

*7/28/2026, 4:39:56 PM*

---

**You (Draft):**
Create Claude of Tsushima Game Task

I want you to build the most visually impressive first-person fantasy world possible in Three.js, at the environmental quality level of Ghost of Tsushima.

Ghost of Tsushima is the visual benchmark for lighting, vegetation density, terrain composition, atmosphere, cinematic framing, environmental detail and overall world beauty. Use the Ghost of Tsushima screenshots I provide as direct visual reference material and as the quality bar throughout development.

Do not copy its exact locations, characters, architecture or assets. Build a completely original world that reaches the same level of visual cohesion, atmosphere and environmental craftsmanship.

The environment is the main feature.

Create a large, seamless and highly realistic explorable world containing:

* windswept grasslands with extremely dense animated grass
* forests, bamboo groves, flower fields and ancient trees
* mountains, valleys, cliffs, rivers and waterfalls
* shrines, villages, bridges, ruins, camps and forgotten paths
* strong elevation changes and cinematic distant landmarks
* drifting leaves, pollen, mist, dust, birds, insects and subtle wildlife
* carefully composed scenes that remain beautiful from every important viewing angle

The world must feel handcrafted, alive and immersive—not like procedurally scattered objects, disconnected biomes or an empty terrain demo.

Vegetation should use layered wind animation and react near the player. Grass, flowers, bushes and trees must have natural variation in scale, density, direction, shape and placement. Avoid obvious repetition, uniform distribution, visible grids and duplicated silhouettes.

Terrain must feel naturally formed and should blend convincingly between soil, grass, stone, mud, water and paths. Avoid flat surfaces, sharp texture borders, floating objects, exposed primitive geometry and repetitive procedural noise.

Lighting must be one of the strongest parts of the experience.

Use cinematic sunlight, soft contact shadows, atmospheric perspective, fog, light shafts, reflected light, natural exposure, realistic water reflections and carefully controlled color grading.

Every major location should have intentional visual composition, foreground detail, a readable middle ground and impressive distant scenery.

Add simple first-person gameplay:

* WASD movement
* mouse look
* sprint, crouch and jump
* left click for a fast melee attack
* right click for a heavy attack or defensive block
* a visible first-person sword or similar melee weapon
* polished weapon sway, attack animation, trails, hit effects, camera feedback and spatial sound

Keep the gameplay simple. Do not spend the majority of development time on menus, quests, inventory systems, dialogue, progression systems or complicated mechanics.

Populate the world with small, deliberately placed enemy encounters.

Include three or four visually and behaviorally distinct enemy types:

* a standard melee swordsman
* a heavily armored defensive warrior
* a fast spear fighter or agile rogue
* a ranged archer who uses distance and elevation

Enemies should patrol roads, guard camps, occupy ruins and protect important landmarks. They should react to the player, navigate around environmental objects and fight with readable attacks.

Encounters should normally contain one to four enemies. Do not fill every area with combat. Large parts of the world should remain peaceful so the environment can breathe.

Enemies must never walk through rocks, trees, buildings, cliffs or other solid objects. They must not float, clip into terrain, become trapped or attack through blocked lines of sight.

Use hit reactions, stagger animations, basic death animations, weapon trails, dust, sparks and satisfying sound effects. Combat should look polished but remain secondary to the world itself.

## In-game screenshot and visual-review system

Build a dedicated screenshot system directly into the game.

Screenshots must not be produced by taking screenshots of the browser window, the webpage or the DOM, and must not use `page.screenshot()`, `canvas.toDataURL()`, the OS screen grabber or any other external capture path. A browser capture hands back whatever the compositor decided to show at some unspecified moment, at device pixel ratio, possibly colour-managed by the OS, and gives no way to render above the display resolution.

The game itself must render and export screenshots directly from the active Three.js renderer or render target.

A browser automation tool such as Playwright may be used, but **only as a host**: it launches the browser, points it at the game and calls into the game's own capture API. It never takes the picture itself.

The screenshot system must:

* capture the actual rendered game frame at high resolution
* hide the HUD and development overlays automatically
* support configurable output resolution
* save screenshots as PNG files
* support supersampled screenshots above the normal gameplay resolution
* support fixed camera positions and free-camera positions
* allow screenshots to be triggered from inside the game
* allow screenshots to be triggered through a CLI command or automation script
* allow time of day, weather, player position and camera direction to be set before capture
* wait for vegetation, lighting, shadows and textures to finish updating before capture
* use deterministic camera presets so the same location can be compared across iterations

### Determinism

The screenshot system must be deterministic. Two captures of the same preset, separated by a code change, must differ **only** because of that change.

Before the shutter opens:

* pin the animation clock, the delta time, the wind phase and the weather to fixed constants
* pause the world and freeze the time-of-day scale
* bake the environment probe *before* the settle frames, not after them, so the systems that sample it are told about it during their own update
* run six to eight settle frames, manually stepping terrain LOD, vegetation rings, shadow cascades and the sky, because all of them chase the camera and a frame taken immediately after a camera move catches them mid-chase
* restore resolution, render scale, pause state and clock afterwards in a `finally` block, so a capture never damages the running game

Downsample supersampled frames in **linear light**, not in sRGB. Averaging gamma-encoded pixels makes every antialiased edge come out too dark.

Remember that GL render targets are bottom-up; flip the rows when writing the image.

### Benchmark cameras as solved data

Store benchmark cameras as data — position, look-at, field of view, time of day, weather — and **solve those numbers against the actual terrain** with a separate tool rather than authoring them by eye. The solver must place the eye a realistic height above real ground, verify the line of sight is not blocked, keep the skyline inside the frame, and place the sun at a chosen angle relative to the lens. Cross-lit and backlit framing is what makes vegetation read; a camera pointed away from the sun renders grass as flat green felt.

Provide a second tool that reports what each camera actually sees, so the presets can be verified at any time. Re-run the solver whenever the shape of the world changes — hand-tuned coordinates will silently be wrong again.

### A measurement path next to the image path

Alongside the PNG path, expose a path that renders a settled frame and returns **numbers instead of an image**:

* scene-referred HDR luminance statistics for the frame in the render target
* statistics over named rectangles of the frame
* single pixel sampling
* debug channels that write the raw shader output — albedo, roughness, normals, material weights, wetness, ambient occlusion — into the image with the post chain disabled

A parameter sweep needs twenty frames and twenty sets of numbers; twenty PNGs would cost more to move than to render. Review agents must be able to check exposure, banding, saturation and material response numerically, not only by eye.

Also provide a tool that compares one of our frames against a reference photograph **statistically, band by band** down the frame — local contrast over brightness, saturation, colour ratios, deep-shadow fraction. Pixel-to-pixel comparison of two different places is meaningless; distribution comparison of two landscape photographs is not.

### The automation host

The host that drives the browser must:

* verify it is running on a real GPU by reading the unmasked WebGL renderer string, and fail loudly when it falls back to a software rasteriser
* wait on an explicit readiness flag published by the game, not on a timeout
* collect page console errors and exceptions and propagate them into its exit code
* expose the game's capture API through a single small, versioned global object rather than reaching into engine internals from the outside

Create several predefined benchmark viewpoints:

* wide grassland vista
* dense forest interior
* bamboo grove
* river or waterfall scene
* village or shrine approach
* mountain viewpoint
* close-up vegetation and material shot
* combat encounter in the environment

The CLI or automation system should be able to launch the game, load a benchmark viewpoint, configure the scene and trigger an in-game screenshot without manually using the browser.

Example workflow:

1. Start the game headless and confirm a hardware renderer.
2. Wait for the game's own readiness flag.
3. Load a specified benchmark scene.
4. Move the player or review camera to a saved transform.
5. Set time of day and weather.
6. Disable the HUD, the dev overlays and the cursor.
7. Pin the clock and the wind phase, then bake the environment probe.
8. Run the settle frames until LOD, vegetation and shadows have stopped moving.
9. Render at a multiple of the output resolution and read the pixels back out of the render target.
10. Resolve down to the output size in linear light and encode a PNG, without touching the page compositor.
11. Save the PNG into a per-pass review folder, with the capture settings written into the file's metadata.
12. Pass that image to the visual-review agent.

Do not let the review process rely on random browser screenshots with inconsistent camera placement, UI elements, browser scaling or compression.

## Sub-agent orchestration

Fan out specialized sub-agents and assign each major visual area to a separate agent:

* terrain and world composition
* vegetation and wind
* trees, forests and bamboo
* lighting and atmosphere
* water and reflections
* architecture and landmarks
* materials and environmental blending
* first-person animation
* enemy design and combat
* VFX and environmental particles
* audio
* performance optimization
* screenshot and benchmark tooling

Each sub-agent should repeatedly inspect and improve its assigned area rather than implementing it once and stopping.

Use separate visual-review agents that did not build the feature they are reviewing.

These review agents must be extremely harsh. They must judge only the captured visual output, not the implementation effort, code complexity or original intention.

## Ghost of Tsushima comparison

For every major benchmark viewpoint, capture a clean in-game screenshot using the internal screenshot system.

Compare those screenshots directly against the provided Ghost of Tsushima reference screenshots.

The comparison should be side by side and blind:

* randomize which image appears on the left and right
* hide filenames and labels
* do not tell the reviewer which image belongs to this project
* ask the reviewer which frame looks more visually convincing and why

The reviewer must compare:

* overall composition
* lighting quality
* vegetation density
* grass and foliage variation
* terrain realism
* environmental layering
* atmospheric depth
* material quality
* distant scenery
* color grading
* scale
* visual coherence
* signs of procedural repetition
* signs of primitive geometry
* whether the environment looks handcrafted
* whether the image resembles a finished AAA game or a prototype

The reviewer must produce specific actionable criticism. It should identify exact weak regions of the screenshot and explain what must change.

Generic feedback such as “looks good,” “solid progress” or “could use more polish” is not acceptable.

If the generated frame is obviously worse than the Ghost of Tsushima reference, send the criticism back to the responsible sub-agents, improve the world and capture the exact same benchmark viewpoint again.

Continue the visual loop across all benchmark viewpoints.

Do not optimize only one hero screenshot. The world must remain convincing while walking through it, viewing it from unusual angles, moving between biomes and fighting enemies.

Use Ghost of Tsushima as an intentionally difficult and possibly unreachable quality bar. Do not lower the benchmark just so the review agents can declare success.

The final result should not feel like a Three.js demonstration. It should feel like a playable first-person slice of a modern AAA open-world game where the landscape itself is the main attraction.

Use instancing, LOD systems, culling, optimized shadows, reusable materials, object pooling, adaptive vegetation density and intelligent world streaming to maintain stable performance without making the environment feel empty.

Fan out sub-agents, use the internal screenshot pipeline, compare every important scene against the provided by Game Triple AAA references and /loop until the visual quality has been pushed as far as technically possible.

Bild 1: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1785249477528-g5umsca3.png
Bild 2: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1785249510257-2fgbc1vu.png
Bild 3: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1785249557816-6gqqx3dx.png


- Always try creating something similar like this prompt above

- Sollte dir noch gesagt werden, dass du bilder generieren oder suchen sollst, darfst du das tun und in den prompt mit reinschreiben

- Gebe es als eine Datei aus bzw. den Pfad zur datei in /notes
mit endung Thema[]-prompt, gebe dem user nur den Pfad der Datei am Ende deiner nachricht aus

- Wichtig: Bilder müssen dir mitgegeben werden ansonsten muss du selbst welche suchen mittels WebFetch, WebSearch oder erstellen, ohne Bilder nicht anfangen, es sei denn es wird dir vorher gesagt du sollst das ohne Bilder versuchen

- Keine Coding-Regeln mitgeben. Das ist, das bekommt der ja außen mit. Nur WIRKLICH stark an dem Template orientieren, keine mandatory rules oder so extra, die nicht aus dem Template stammen
