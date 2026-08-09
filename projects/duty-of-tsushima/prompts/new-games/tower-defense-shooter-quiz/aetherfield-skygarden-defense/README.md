# Aetherfield: Skygarden Defense

## Direction

- Bright fantasy-farm action viewed from a confident bird's-eye gameplay camera.
- A wide working farm fills the image before architecture, effects, or interface decoration.
- Chunky voxel heroes and enemies stay readable as moving pieces without becoming static board tokens.
- Simple timber, pale stone, crops, water, cloth, and wind-aether devices create a soft crafted world.
- This is the direct sibling to Last Harvest for players who want more map overview and less realism.

## Visual Pillars

1. **Farm acreage first:** crop fields, orchard rows, irrigation, barns, fences, and open lanes own most of every gameplay frame.
2. **Bird's-eye by default:** the camera shows gate, route, defenses, hero, and Quiz Core in one readable tactical picture.
3. **Voxel silhouettes stay obvious:** cuboid heads, blocky hands, stepped armour, broad tools, and short articulated limbs read at distance.
4. **Large shapes beat micro-detail:** clean crop bands, chunky masonry, broad roofs, and graphic shadows replace realistic surface noise.
5. **Fantasy rides on wind and sunlight:** floating pollen, cloth streamers, wind wheels, pale runes, and soft sky-aether support the farm.

## Palette

- Oat gold `#E2C273`
- Meadow green `#6F9A57`
- Cloud limestone `#D7CEB1`
- Honey timber `#A66F3F`
- Sky blue `#63BFD4`
- Lavender cloth `#7068A8`
- Friendly aether `#71E4D5`
- Threat coral `#D96650`
- Deep soil `#4B4134`

## Camera and Composition

- Perspective camera pitched 60–65° downward from horizontal; never shoulder-level or close chase.
- Hero occupies roughly 4–6% of frame height during normal combat.
- At least 65% of each gameplay frame reads as farm ground, crops, routes, irrigation, or build space.
- One active gate-to-Core route remains traceable without camera cuts or a minimap.
- Foreground never hides the route; trees and buildings stay near the outer frame or below the sightline.
- Keep perspective depth and cast shadows; avoid pure orthographic, fixed isometric, tilt-shift blur, or flat board presentation.

## World Construction

- Map 1: `Skygarden Expanse`, a broad highland grain, vegetable, and orchard farm around a wind-fed archive Core.
- Map 2 preview: `Sunwell Paddies`, bright stepped water fields with bridges, reed filters, and current-driven defense pads.
- Map 3 preview: `Cloudbreak Orchard`, open cliff orchards with windbreak hedges, rope lifts, and aerial approach lanes.
- Lifetime map cap remains three.
- The launch farm uses four large readable field plots, two perimeter barns, one mill, irrigation channels, and outer tree belts.
- Buildings support the farm and never turn it into a palace, temple city, tactical base, or ornamental fantasy plaza.

## Defense Language

- Fence upgrades move from chunky timber rails to pale-stone braces and finally wind-aether latches.
- Sentry uses a short brass barrel, boxy seed hopper, broad timber feet, and visible recoil.
- Mortar uses a round ceramic grain bowl on a thick four-leg frame.
- Arc Coil uses three blunt copper prongs around one bright sky crystal.
- Frost Fan uses four wide blue ceramic vanes and visible condensation blocks.
- Repair Beacon resembles a small windmill with articulated repair motes.
- Traps remain low, broad, and directionally obvious against soil and grass.

## Character Language

- Field Ranger: cuboid straw hat or helmet, square indigo jacket, blocky pale armour, broad carbine, large boots.
- Elemental Technician: chunky lavender coat, oversized ceramic gauntlets, square canisters, small voxel survey drone.
- Heads, torsos, pelvises, hands, feet, weapons, and packs use clearly stepped voxel volumes.
- Elbows, knees, hips, shoulders, and wrists still articulate for planted recoil, tool weight, dodges, and repair work.
- Faces use two or three simple planes with readable eyes; no realistic skin, fingers, hair strands, or portrait detail.

## UI Language

- Clean ivory field-map panels with solid dark backing and thin honey-timber rails.
- Sky-blue tabs, large block icons, and short labels support quick reading from the wide camera.
- Friendly/valid/correct uses mint aether; invalid/danger/wrong uses coral.
- One rounded humanist sans handles all data; title may use one restrained carved display face.
- World view stays open through compact corner groups and a narrow top question strip.

## Effect Language

- Ballistics create short chunky dust blocks, leaf bursts, splinters, and one-frame impact stars.
- Wind-aether effects use a pale solid core, mint edge, broad ribbon motion, and controlled bloom.
- Fire, frost, lightning, and gravity change nearby farm materials through simple readable responses.
- Shockwaves bend crop bands and lift bounded voxel debris instead of filling the screen with fog.
- Avoid realistic smoke simulation, dense sparks, wet reflections, tiny debris, ornate spell circles, and bloom-only damage.

## Asset Order

- [`00-title-start.png`](assets/00-title-start.png)
- [`01-wave-one-farm.png`](assets/01-wave-one-farm.png)
- [`02-build-mode.png`](assets/02-build-mode.png)
- [`03-quiz-event.png`](assets/03-quiz-event.png)
- [`04-defense-family.png`](assets/04-defense-family.png)
- [`05-classes-weapons.png`](assets/05-classes-weapons.png)
- [`06-upgrade-interface.png`](assets/06-upgrade-interface.png)
- [`07-boss-wave.png`](assets/07-boss-wave.png)
- [`08-wave-thirty-endgame.png`](assets/08-wave-thirty-endgame.png)
- [`09-future-maps.png`](assets/09-future-maps.png)

Exact generation specs and acceptance notes live in [`ASSET-MANIFEST.md`](ASSET-MANIFEST.md).

## Known Risk

- A high camera can flatten impact; preserve perspective, cast shadows, recoil, projectile travel, and contact motion.
- A larger farm can make units too small; enforce bold voxel silhouettes and the 4–6% hero-height range.
- Bright fantasy can drift into decorative plazas; every structure must serve crops, water, routes, defense, or quiz play.

## Choose This Direction When

- The player should understand the whole farm battle at a glance.
- The product should feel lighter, more playful, and more voxel-like than Last Harvest.
- Building, lane planning, shooting, and quiz pressure must share one readable frame.
- The implementation team wants broad stylized forms instead of realistic material micro-detail.
