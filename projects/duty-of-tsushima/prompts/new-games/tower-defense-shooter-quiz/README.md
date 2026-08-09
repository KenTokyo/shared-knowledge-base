# Farm-Core Defense Shooter Quiz — Three Build Directions

## Purpose

- Use this suite to choose one visual direction for a new browser game before production begins.
- The game mixes elevated-camera 3D shooting, free farm defense building, physical quiz choices,
  two playable combat classes, weapon progression, and a thirty-wave siege that can continue forever.
- Each direction contains three standalone long build prompts and ten ordered concept images.
- The three directions share one gameplay and progression contract so the choice is about visual
  identity, presentation, and emotional tone rather than hidden scope differences.
- Concept images are references, not runtime textures or permission to flatten the game into UI art.

## Recommended Product Name

`Farm-Core Defense` is the neutral genre label for planning only.

The strongest shippable title candidates are:

1. **Aetherfield: Last Harvest** — clearest fantasy-farm promise and strongest broad-audience read.
2. **Aetherfield: Skygarden Defense** — clearest whole-farm overview and strongest chunky voxel read.
3. **Wildcore: Bloom Siege** — strongest elemental fantasy identity and most original tower language.

Each title is original working copy. Perform legal and storefront availability checks before release.

## Variant A — Aetherfield: Last Harvest

- Path: [`aetherfield-last-harvest/`](aetherfield-last-harvest/README.md)
- First read: a warm handcrafted farm becomes a luminous defense diorama at golden hour.
- Camera: elevated three-quarter chase camera, 52–58° pitch, medium tactical reach.
- Materials: timber, pale stone, beaten brass, blue ceramic, paper, crops, dust, physical smoke.
- Light: warm sun, cool sky fill, restrained turquoise aether, readable contact shadows.
- UI: parchment-glass field journal with bronze rails and very limited cyan energy accents.
- VFX: physically rooted pressure, sparks, splinters, soil, fire, frost, and refracted aether.
- Best for: inviting first impression, clear farm fantasy, readable daytime combat, broad appeal.

## Variant B — Aetherfield: Skygarden Defense

- Path: [`aetherfield-skygarden-defense/`](aetherfield-skygarden-defense/README.md)
- First read: a huge sunlit fantasy farm becomes a readable voxel defense map at one glance.
- Camera: high perspective bird's-eye view, 60–65° downward pitch, whole gate-to-Core route visible.
- Materials: chunky timber, pale block stone, simple crops, honey brass, blue ceramic, broad cloth.
- Light: bright warm sun, cool sky fill, graphic contact shadows, airy mint wind-aether.
- UI: compact ivory field atlas with solid backing, large icons, lavender tabs, and low clutter.
- VFX: crop pressure, broad wind ribbons, block debris, simple elemental contact, controlled glow.
- Best for: largest readable farm, strongest strategy overview, clearest voxel heroes, playful fantasy.

## Variant C — Wildcore: Bloom Siege

- Path: [`wildcore-bloom-siege/`](wildcore-bloom-siege/README.md)
- First read: a living solarpunk farm grows its own defenses around a radiant seed archive.
- Camera: slightly wider elevated camera with readable elemental fields and expressive small heroes.
- Materials: carved wood, glazed ceramic, woven reed, living roots, petals, water, luminous sap.
- Light: bright canopy shafts, jade shade, warm coral cores, violet night bloom, soft mist depth.
- UI: organic seed-vault shapes with petal tabs, woven frames, large readable symbols, low clutter.
- VFX: elemental causality through roots, pollen, water, wind, lightning, crystal, and living terrain.
- Best for: most original fantasy identity, strongest elemental class, playful motion and color.

## Shared Product Contract

- Canonical system details: [`SYSTEM-CONTRACT.md`](SYSTEM-CONTRACT.md)
- Initial release ships one complete farm map.
- Two future map previews are included in every image set; total lifetime map count is capped at three.
- One player walks freely inside a buildable farm and fires directly at enemies.
- One `Field Ranger` uses firearms, grenades, and repair tech.
- One `Elemental Technician` uses engineered fire, frost, lightning, and gravity emitters.
- Each class equips at most three active skills.
- Enemies enter through authored gates and move toward the central Quiz Core.
- Players may redirect lanes with fences but must leave one valid route from every active gate.
- Turrets and traps can be placed on valid farm ground outside protected spawn/core footprints.
- A visible question appears at the core with four physical answer pylons.
- Shooting or activating one answer resolves the question.
- Correct answers grant Insight plus a selectable run buff; wrong answers empower the siege briefly.
- The core has health, regenerates only between waves, and can be repaired with earned Gold.
- Waves 1–30 form a complete siege; after wave 30 the player extracts or enters Endless.
- Bosses arrive at waves 10, 20, and 30; Endless adds a boss every ten waves.
- Weapons are granted at waves 1, 3, 5, and 7; later premium weapons are Gold purchases, never cash.
- Local deterministic records work offline; an online leaderboard is optional and never required to play.

## Prompt Matrix

| Direction | UI prompt | Gameplay prompt | Progression prompt | Images |
|---|---|---|---|---:|
| Aetherfield | [`ui`](aetherfield-last-harvest/ui-prompt.md) | [`gameplay`](aetherfield-last-harvest/gameplay-prompt.md) | [`progression`](aetherfield-last-harvest/progression-prompt.md) | 10 |
| Skygarden | [`ui`](aetherfield-skygarden-defense/ui-prompt.md) | [`gameplay`](aetherfield-skygarden-defense/gameplay-prompt.md) | [`progression`](aetherfield-skygarden-defense/progression-prompt.md) | 10 |
| Wildcore | [`ui`](wildcore-bloom-siege/ui-prompt.md) | [`gameplay`](wildcore-bloom-siege/gameplay-prompt.md) | [`progression`](wildcore-bloom-siege/progression-prompt.md) | 10 |

Generation mode, file dimensions, checksums, and visual-review notes are recorded in
[`ASSET-REPORT.md`](ASSET-REPORT.md). Exact final generation prompts remain beside each direction in
its `ASSET-MANIFEST.md`.

## Image Sequence Shared by All Directions

| No. | Product state | Decision answered |
|---:|---|---|
| 00 | Title and start menu | Does the game identity read before play? |
| 01 | Wave-one farm overview | Is the map, core, route, hero, and threat readable at once? |
| 02 | Build mode | Can a player understand valid placement and lane legality? |
| 03 | Quiz event | Are the question, four answers, pressure, and reward legible in play? |
| 04 | Tower and trap family | Do up to six defenses have distinct silhouettes and roles? |
| 05 | Two classes and weapons | Are gunner and technician clearly different without class clutter? |
| 06 | Upgrade interface | Can a player compare weapon, tower, fence, and ability choices? |
| 07 | Boss wave | Does the full combat stack stay readable under spectacle? |
| 08 | Wave-30 endgame | Does the completed farm communicate earned growth and extraction choice? |
| 09 | Future maps | Do two later biomes extend the identity without promising more than three maps? |

## Selection Rubric

Score each direction from 1–5 after viewing its ten images:

- Farm fantasy is recognizable within two seconds.
- Central Quiz Core and four answer pylons remain readable.
- Player, lane, enemies, defenses, and danger hierarchy remain readable together.
- Visual identity feels original rather than assembled from familiar brands.
- Turrets and traps can be distinguished by silhouette without UI labels.
- Field Ranger and Elemental Technician have distinct body language and effects.
- UI looks implementable as real DOM/canvas layers rather than decorative concept noise.
- Effects show cause, travel, contact, reaction, and decay instead of glow alone.
- Early and late game look like the same product at different levels of earned complexity.
- Future maps preserve the game grammar while changing terrain and tactical constraints.

## Recommendation

- Choose **Last Harvest** for the safest mix of warmth, tactile detail, and premium visual appeal.
- Choose **Skygarden Defense** for the highest camera, largest readable farm, and strongest voxel identity.
- Keep **Wildcore** as a later comparison if organic elemental play should dominate the brand.
- Do not merge all three palettes after selection; take systems from the shared contract and keep
  one coherent art direction.

## Usage

1. Review the ten images in one variant folder in numeric order.
2. Read that variant's `README.md` for the visual rules and known risks.
3. Copy one complete prompt file when commissioning its subsystem.
4. For a full build, execute gameplay first, progression second, UI third, then integrate and review.
5. Keep one integration owner across all three prompts so shared state is not implemented three times.
6. Permit sub-agents only across disjoint ownership boundaries named in the prompts.
7. Use the host project's existing browser/capture tools for bounded integrated review.
8. Never claim visual parity, stable FPS, or user approval without evidence.
