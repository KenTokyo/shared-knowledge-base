# Prompt-Erstellungsleitfaden: Das Beste aus drei Prompt-Ansätzen

Dieser Leitfaden kombiniert die stärksten Elemente der drei Referenzprompts. Kein Prompt muss vollständig kopiert werden; entscheidend ist ein sinnvoller Mix für das jeweilige Projekt.

## Aktuelle Sichtprüfungsregel

Die zitierten Originalprompts unten sind Quellenmaterial, keine aktuelle Arbeitsanweisung. Eigene Prompts sollen
zusammenhängende Änderungen one-shotten, statisch und numerisch prüfen und die direkte visuelle Abnahme bevorzugt
dem User überlassen. Agentische Sichtprüfung braucht die ausdrückliche Freigabe im aktuellen Userauftrag;
Reihenfolge und Gesamtbudget kommen ausschließlich aus [`../CODING-RULES.md`](../CODING-RULES.md) §8–9, die
Technik aus [`../SCREENSHOT-GUIDE.md`](../SCREENSHOT-GUIDE.md). Niemals eine Screenshot-Schleife.

## Empfohlener Mix

- **Prompt 1 als Grundlage:** klares Qualitätsvorbild, spezialisierte Sub-Agenten und unabhängige fachliche Kritik;
  keine automatische visuelle Iterationsschleife übernehmen.
- **Prompt 2 für kreative Freiheit:** Ziel und Spielgefühl benennen, ohne jede Lösung technisch vorzuschreiben.
- **Prompt 3 für Tiefe und Performance:** konkrete Anforderungen an Weltqualität, numerische Messbarkeit,
  GPU-Prüfung, LOD, Culling, Instancing und stabile Laufzeit übernehmen; Screenshot-Technik nur für die begrenzte
  freiwillige Ausnahme.
- **Gesamtziel:** ambitionierte Qualitätsansprüche mit klaren technischen Leitplanken und überprüfbaren Ergebnissen verbinden.

> **Wichtig:** Prompt 3 ist bewusst sehr lang und detailliert. Er eignet sich besonders als Baukasten für umfangreiche Projekte; relevante Abschnitte können gezielt übernommen werden. Seine wiederholten visuellen Loops sind durch die aktuelle Sichtprüfungsregel oben ersetzt.

## Kernprinzip aus Prompt 1

### Originalprompt von Matt Shumer

Der kurze Prompt zeigt die stärkste Grundstruktur: Referenzqualität, Aufgabenteilung, unabhängige Prüfung und wiederholte Verbesserung.

```text
I want you to build a first-person shooter at the level of the most recent Call of Duty games. It should be utterly perfect, visually beautiful, with every single thing done at AAA quality—from textures to physics to anything you could think of. 

Fan out sub-agents and have sub-agents tackle each one individually so that the game is utterly perfect. You should /loop on each item and have a separate sub-agent check it visually to ensure it looks triple A. That separate sub-agent should be a really harsh critic, and if it doesn't look triple A, it should keep going.

Don't stop until each sub-agent is utterly wowed with the quality when compared with the actual Call of Duty game. It should literally compare them side by side blind and say which one looks better. Do this in ThreeJS. /loop until it's utterly perfect. Fan out sub-agents and ultracode.
```

### Warum dieser Ansatz funktioniert

- **Konkrete Referenz statt vager Qualität:** Ein reales Vorbild definiert Atmosphäre, Detailgrad und Qualitätsniveau besser als Wörter wie „professionell“ oder „poliert“.
- **Beispiele mit offenem Umfang:** Zwei konkrete Bereiche geben den Maßstab vor; „anything you could think of“ überträgt dem Modell die Verantwortung, fehlende Arbeitsbereiche zu ergänzen.
- **Sub-Agenten als Fachbereiche:** Große Aufgaben werden in klar getrennte Verantwortungsbereiche zerlegt.
- **Unabhängige, harte Kritik:** Der Reviewer bewertet Architektur, Funktion, Zahlen und echtes Produktartefakt statt
  Absicht oder Aufwand; Bildprüfung bleibt die begrenzte Ausnahme.
- **Vergleich statt Selbstbewertung:** Reproduzierbare Zahlen, Referenzmerkmale und Gegenbeweise liefern zuerst die
  Entscheidung; ein visueller Side-by-Side-Vergleich ist nicht das Standardgate.
- **Iteration bis zur objektiven Grenze:** Konkrete Funde führen zu einer gezielten Änderung; kein weiterer Prüfloop
  ohne geänderten Kandidaten oder neue Frage.

### Empfohlener Aufbau eigener Prompts

1. **Brief:** Was soll entstehen und welches reale Vorbild setzt den Qualitätsmaßstab?
2. **Qualitätsmerkmale:** Welche zwei bis fünf Bereiche zeigen konkret, was „gut“ bedeutet?
3. **Orchestrierung:** Welche Fachbereiche bearbeiten spezialisierte Sub-Agenten?
4. **Qualitätskontrolle:** Wer prüft Architektur, Funktion, Zahlen und Gegenbeweise unabhängig? Visuelle Abnahme
   bevorzugt durch den User; agentisch nur bei ungelöster Unsicherheit.
5. **Performance und Messung:** Welche Budgets, Messwerte oder Tests sichern die technische Qualität?
6. **Iterationsregel:** Nur ein konkreter Fund oder eine geänderte Frage öffnet eine weitere Umsetzungsschleife;
   Sichtprüfung nur nach aktueller Freigabe und innerhalb des zentralen Gesamtbudgets aus `CODING-RULES.md`.

**Hinweis:** Nutze `/goal` in Codex und `/loop` in Claude oder Cursor, sofern die jeweilige Umgebung diese Befehle unterstützt. Ein absichtlich sehr hoher Qualitätsmaßstab fördert Verbesserungen; die tatsächliche Grenze bilden Zeit, Budget und technische Machbarkeit.

### Wiederverwendbare Vorlage

```text
I want you to build [what you want] at the level of [the best known example of it]. It should be utterly perfect,
[what good looks like], with every single thing done at [top tier] quality, from [example area] to [example area]
to anything you could think of.

Fan out sub-agents by specialty. Build each coherent area completely before the reviewer checks architecture,
functionality, performance numbers and the strongest counterexample. Fix concrete findings and continue until the
user goal or an objective technical limit is reached.

Do not run screenshot reviews by default; the user should test the surface directly. Perform visual review only
when the current user request explicitly authorizes it, following the central ordering and total budget in
`CODING-RULES.md`. Never create a screenshot-review loop. Do this in [your tool or stack].
```

Die Vorlage funktioniert nicht nur für Spiele, sondern auch für Websites, Berichte, Präsentationen, Designs und andere kreative oder technische Ergebnisse.

---

## Drei Referenzprompts

### Prompt 1: Call-of-Duty-inspirierter FPS

Historischer Originaltext mit maximalem Qualitätsanspruch. Seine visuelle Dauerschleife nicht übernehmen; für neue
Prompts gilt ausschließlich die aktuelle 1–2-Ausnahmeregel oben.

```text
I want you to build a first-person shooter at the level of the most recent Call of Duty games. It should be utterly perfect, visually beautiful, with every single thing done at AAA quality—from textures to physics to anything you could think of.

Fan out sub-agents and have sub-agents tackle each one individually so that the game is utterly perfect. You should /loop on each item and have a separate sub-agent check it visually to ensure it looks triple A. That separate sub-agent should be a really harsh critic, and if it doesn't look triple A, it should keep going.

Don't stop until each sub-agent is utterly wowed with the quality when compared with the actual Call of Duty game. It should literally compare them side by side blind and say which one looks better. Do this in ThreeJS. /loop until it's utterly perfect. Fan out sub-agents and ultracode.
```


### Prompt 2: 3D-Mountainbike-Spiel

Kurzer, offener Prompt mit viel kreativer Freiheit für das Modell.

```text
I want you to make me a game for the web. You can use ThreeJS, and it's gonna be a
 mountain biker game. Use as many sub-agents as you need to. You have to get in a loop. 
 Your sub-agents need to be thrilled with their own outputs and judge themselves and the output.
 It's gotta be 3D, with realistic audio sounds, sound effects, all that kind of stuff. You have to build all of it. 
 We don't have any other assets to start with. This is you crafting and creating a super fun mountain bike game. 
 Think about what that could look like, build it for me, and then we'll go from there.
```



### Prompt 3: Ghost-of-Tsushima-inspirierte 3D-Welt

> **Hinweis: sehr langer Referenzprompt.** Die Screenshot-Automation darin ist nur ein technischer Baukasten für den freiwilligen Ausnahmefall; automatische visuelle Loops sind gestrichen.

```text
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

## Optional in-game screenshot and visual-review system

Do not build or run a screenshot system by default. Implement the coherent product slice first, use static and
numeric checks, and let the user perform the direct visual surface/gameplay acceptance. Visual review requires
explicit authorization in the current user request and must follow the central total budget in `CODING-RULES.md`.
No review per camera, phase or candidate and no screenshot loop.

If this optional exception is selected and no project CLI capture exists, build it first. Start headless Chromium
once through Playwright and keep the same session for every measurement and permitted image. Reject software
renderers. Screenshots must not be produced by taking screenshots of the browser window, the webpage or the DOM,
and must not use `page.screenshot()`, `canvas.toDataURL()`, the OS screen grabber or any other external capture
path.

The game itself must render and export the PNG directly from the active Three.js render target via
`readRenderTargetPixels()`. Playwright is **only a host**: it launches the browser, points it at the game and calls
into the game's own capture API. It never takes the picture itself.

When the optional exception is selected, the screenshot system must:

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

Benchmark viewpoints may be stored as reusable camera data for numeric probes:

* wide grassland vista
* dense forest interior
* bamboo grove
* river or waterfall scene
* village or shrine approach
* mountain viewpoint
* close-up vegetation and material shot
* combat encounter in the environment

Do not capture all viewpoints. If the optional visual exception is needed, select only the single most decisive
viewpoint, or combine necessary views into one comparison image. The CLI host should configure and trigger that
engine-owned capture without manually using the browser.

Conditional exception workflow:

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
11. Save the PNG into a run-scoped review folder, with the capture settings written into the file's metadata.
12. Pass the single decision-carrying comparison image to the reviewer; a second only after a relevant change or new
    concrete uncertainty, never a third.

Never use random browser screenshots with inconsistent camera placement, UI elements, browser scaling or compression.

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
* optional capture tooling only if the bounded exception is selected

Each sub-agent should complete its coherent area, then use the cheapest relevant static/numeric countercheck. Iterate
only on a concrete finding, not on ritual review.

If visual review is explicitly authorized, use a reviewer that did not build the feature. Across all sub-agents,
share the single central task budget from `CODING-RULES.md`; no phase or agent receives a fresh budget.

## Optional Ghost of Tsushima comparison

Do not automatically capture every benchmark viewpoint. Use the supplied references first to define composition,
lighting, density, terrain, atmosphere, material, scale and performance goals; verify everything numerically or
structurally that can be verified that way.

Only if a material visual uncertainty remains, capture the single most decisive in-game comparison through the
internal render-target pipeline. A blind side-by-side may then randomize left/right, hide labels and ask which frame
is more convincing and why. The reviewer should return one specific actionable finding, not generic polish feedback.

Apply the finding as one coherent change. A second comparison is allowed only when that changed candidate or a new
concrete uncertainty requires it; never a third and never a loop across viewpoints. Walking coverage, collision,
biome transitions and combat remain product/runtime concerns, not a hero-screenshot sweep. Final direct visual
acceptance belongs preferably to the user.

Use Ghost of Tsushima as an intentionally difficult and possibly unreachable quality bar. Do not lower the benchmark just so a reviewer can declare success.

The final result should not feel like a Three.js demonstration. It should feel like a playable first-person slice of a modern AAA open-world game where the landscape itself is the main attraction.

Use instancing, LOD systems, culling, optimized shadows, reusable materials, object pooling, adaptive vegetation density and intelligent world streaming to maintain stable performance without making the environment feel empty.

Fan out sub-agents, build the strongest coherent slice one-shot, validate architecture and numbers, and use the
internal screenshot pipeline only after explicit authorization, within the central task budget from
`CODING-RULES.md`.

Bild 1: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1785249477528-g5umsca3.png
Bild 2: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1785249510257-2fgbc1vu.png
Bild 3: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1785249557816-6gqqx3dx.png
```
