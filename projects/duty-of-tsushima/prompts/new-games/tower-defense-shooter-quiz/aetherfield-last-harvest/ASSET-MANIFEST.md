# Aetherfield: Last Harvest — Asset Manifest

## Shared Generation Rules

- Built-in image generation, one independent call per image.
- Use case: `stylized-concept`, except explicit interface screens use `ui-mockup`.
- Intended output: polished 16:9 landscape game-development reference.
- Keep the same art direction, hero silhouettes, Core, materials, and camera family across all ten.
- Elevated three-quarter perspective, real 3D depth, compact articulated voxel-like characters.
- Original designs only; no brand marks, copied UI, famous characters, watermarks, or signatures.
- Catalogue images show at most six isolated designs.
- Gameplay scenes prioritize one action and keep player, lane, Core, threats, and defenses readable.
- Final files live under `assets/`; they are references, never final runtime textures.

## 00 — Title and Start

**Path:** `assets/00-title-start.png`

```text
Use case: ui-mockup
Asset type: 16:9 PC game title and start-screen concept
Primary request: Create a shippable start screen for the original game "AETHERFIELD: LAST HARVEST".
Scene/backdrop: elevated three-quarter view over Amberstep Farm at warm sunrise; terraced grain, orchard, timber fences, pale stone Quiz Core, distant windmill, one calm enemy gate.
Subject: two compact selectable hero cards, Field Ranger with indigo jacket and carbine; Elemental Technician with ceramic gauntlets and a small survey drone; one large Start button.
Style/medium: premium stylized 3D game render with tactile diorama realism, compact articulated voxel-like characters, not concept sketch.
Composition/framing: clean 16:9 landscape; title top center; world remains dominant; two restrained class cards low center; primary button below; clear negative space.
Lighting/mood: warm sunrise key, cool sky fill, light farm mist, restrained turquoise aether glow.
Color palette: straw gold, rice green, pale stone, indigo, beaten brass, limited aether cyan.
Materials/textures: real wood grain, worn rope, ceramic glaze, crop variation, dusty stone, cloth weave.
Text (verbatim): "AETHERFIELD: LAST HARVEST", "FIELD RANGER", "ELEMENTAL TECHNICIAN", "START".
Constraints: exact text only once; no settings, account, news, currency, store, trademarks, watermark, extra buttons, dark sci-fi city, first-person camera, or flat orthographic board.
```

**Acceptance:** Title, two class silhouettes, Start action, farm, Core, and warm material identity read instantly.

## 01 — Wave-One Farm

**Path:** `assets/01-wave-one-farm.png`

```text
Use case: stylized-concept
Asset type: in-game environment and gameplay screenshot reference
Primary request: Show wave one of Aetherfield on an initially sparse but buildable working farm.
Scene/backdrop: Amberstep Farm with grain terraces, orchard edge, irrigation ditch, timber fences, one open S-curve lane from a distant gate to the pale stone Quiz Core.
Subject: small Field Ranger firing a carbine at six advancing faceted farm-monsters; one basic brass sentry and one short fence segment already placed.
Style/medium: premium real-time 3D game screenshot, tactile stylized realism, compact voxel-like articulated figures.
Composition/framing: 16:9 elevated three-quarter chase camera at roughly 55 degrees; hero lower middle; Core middle distance; gate upper side; lane readable in one glance.
Lighting/mood: clear morning sun, cool shadows, crop movement, small physical muzzle smoke and soil impacts.
Color palette: natural straw, green, limestone and indigo; cyan only at Core and active sentry.
Materials/textures: individual crop clumps, worn paths, timber joints, brass mechanisms, dusty stone.
Constraints: no title screen, no huge HUD, no grid-board look, no miniature blur, no giant army, no copied symbols, no watermark; preserve clean target readability.
```

**Acceptance:** Hero, gate-to-Core route, one tower, one fence, enemies, and farm purpose remain separable.

## 02 — Build Mode

**Path:** `assets/02-build-mode.png`

```text
Use case: ui-mockup
Asset type: integrated in-game build-mode screenshot reference
Primary request: Show Aetherfield build mode while the player places a brass sentry beside an open farm lane.
Scene/backdrop: same Amberstep Farm and camera family; timber fences reroute the lane through crops toward the Quiz Core.
Subject: Field Ranger visible beside a cyan valid-placement ghost; projected range arc and facing cone; one red invalid fence ghost blocking the final route; compact six-slot build tray.
Style/medium: shippable real-time 3D UI mockup, warm parchment-glass and brass interface integrated over the actual world.
Composition/framing: elevated three-quarter 16:9; world covers at least 80 percent; placement point lower middle; path preview reaches gate and Core; UI along bottom edge only.
Lighting/mood: late morning, crisp contact shadows, gentle dust, calm preparation phase.
Color palette: cyan valid, vermilion invalid, amber selection, natural farm materials elsewhere.
Text (verbatim): "BUILD", "VALID", "ROUTE BLOCKED", "GOLD 840", "PLACE", "ROTATE".
Constraints: exact text only; show no more than six build items; no giant blueprint overlay, no top-down grid, no second currency, no watermark, no unreadable microtext.
```

**Acceptance:** Placement direction, range, valid/invalid state, Gold, route rule, and real world geometry are understandable.

## 03 — Quiz Event

**Path:** `assets/03-quiz-event.png`

```text
Use case: ui-mockup
Asset type: live combat quiz-event screenshot reference
Primary request: Show an active Aetherfield quiz while enemies still advance toward the damaged Quiz Core.
Scene/backdrop: golden-hour Amberstep Farm defense; central pale stone Core with four physical answer pylons arranged around it, active lane and defenses behind.
Subject: Field Ranger aiming at one of four answer pylons; clear top question ribbon; fifteen-second timer; small reward preview; enemies remain visible but secondary.
Style/medium: premium stylized 3D game UI, physical answer boards, parchment-glass HUD, no separate trivia screen.
Composition/framing: elevated three-quarter 16:9; all four answer pylons visible and non-overlapping; question top center; combat center unobscured.
Lighting/mood: warm sun, cool Core light, urgent but readable; cyan selected aim, vermilion incoming damage.
Text (verbatim): "Which tool controls source history?", "Git", "Shader", "Collider", "Mixer", "00:15", "+1 INSIGHT".
Constraints: render exactly four answers; answer text appears on physical pylons; no DOM answer list, no pause, no fifth option, no watermark, no dense decorative copy.
```

**Acceptance:** Exact four-answer interaction, ongoing threat, timer, Core damage, and reward are one readable state.

## 04 — Defense Family

**Path:** `assets/04-defense-family.png`

```text
Use case: stylized-concept
Asset type: six-item game defense design sheet
Primary request: Present the six Aetherfield defense structures as buildable physical objects sharing one handcrafted farm-tech language.
Scene/backdrop: neutral pale stone workshop terrace with subtle crop and hill context, not a UI grid.
Subject: exactly six designs in one row of clear pedestals: reinforced fence gate, brass sentry, ceramic seed mortar, three-prong arc coil, blue-ceramic frost fan, windwheel repair beacon.
Style/medium: polished 3D game asset turntable sheet, stylized realism, production-feasible geometry.
Composition/framing: wide 16:9; each object fully visible at matched scale; three-quarter view; generous spacing; no hero.
Lighting/mood: warm studio sun with cool fill and restrained active emissive cores.
Color palette: timber, limestone, brass, blue ceramic, indigo cable, limited cyan.
Materials/textures: visible joinery, feed mechanisms, hinges, conduits, worn bases, dirt contact.
Constraints: exactly six objects; unique silhouettes; no labels, logos, watermark, floating hologram-only towers, weapons, characters, or extra props.
```

**Acceptance:** Six roles are distinguishable by silhouette and mechanical function without labels.

## 05 — Classes and Weapons

**Path:** `assets/05-classes-weapons.png`

```text
Use case: stylized-concept
Asset type: two-class game character and weapon concept sheet
Primary request: Present Aetherfield's two compact articulated voxel-like hero classes and their equipment.
Scene/backdrop: simple warm farm-workshop backdrop with pale stone floor and a few brass rails.
Subject: Field Ranger in indigo field jacket and segmented pale armour holding compact carbine; Elemental Technician with ceramic coil gauntlets, aether canisters and small survey drone; between them exactly four early weapons plus three premium devices displayed compactly as silhouettes behind, not additional foreground objects.
Style/medium: premium 3D character render, faceted stylized realism, real joints and believable gear weight, not Minecraft and not realistic humans.
Composition/framing: 16:9 full-body three-quarter hero poses; two characters dominate; clean class separation.
Lighting/mood: warm rim, cool fill, restrained turquoise active device light.
Color palette: indigo, pale ceramic, brass, leather, charcoal, aether cyan.
Materials/textures: cloth weave, scratched plates, wood grips, metal wear, ceramic glaze.
Constraints: no swords, staffs, robes, chibi proportions, brand marks, text, watermark, extra classes, detached weapons, or photoreal faces.
```

**Acceptance:** Two class silhouettes, firearm versus engineered element role, compact voxel articulation, and premium weapon progression read cleanly.

## 06 — Upgrade Interface

**Path:** `assets/06-upgrade-interface.png`

```text
Use case: ui-mockup
Asset type: shippable in-game upgrade station interface
Primary request: Show Aetherfield's between-wave upgrade interface at a physical brass field bench with the real carbine mounted in the world.
Scene/backdrop: timber-and-stone farm workshop; world visible around a large parchment-glass interface.
Subject: mounted carbine center; four tabs for Weapon, Tower, Fence, Ability; deterministic five-level weapon rail; two branch choices; Gold and Insight; compact compare panel; visible Start Next Wave action.
Style/medium: realistic product UI integrated into a premium stylized 3D game, not abstract concept art.
Composition/framing: 16:9; real weapon is largest object; navigation left; branch choices right; currencies top; world remains visible at edges.
Lighting/mood: warm work lamp and cyan tool light; calm preparation.
Text (verbatim): "UPGRADE BENCH", "WEAPON", "TOWER", "FENCE", "ABILITY", "GOLD 2,460", "INSIGHT 3", "LEVEL 3", "STABILITY", "PIERCING", "START NEXT WAVE".
Constraints: exact text only; no loot rarity, random stats, cash shop, second weapon, excessive microtext, logos, watermark, or flat weapon thumbnail.
```

**Acceptance:** Real weapon, deterministic level, two branches, four upgrade families, currencies, and exit action form a practical hierarchy.

## 07 — Boss Wave

**Path:** `assets/07-boss-wave.png`

```text
Use case: stylized-concept
Asset type: integrated late-game boss combat screenshot reference
Primary request: Show Aetherfield wave 20 against the Fourfold Oracle without losing tactical readability.
Scene/backdrop: Amberstep Farm at stormy golden hour; expanded fenced plots, layered towers, damaged crops, central Quiz Core.
Subject: huge original faceted stone-and-brass Oracle corrupting one of four answer pylons; Field Ranger fires from lower frame; Technician casts a bounded lightning grid; towers engage mixed enemies.
Style/medium: premium real-time 3D action-strategy screenshot, tactile voxel-like characters, cinematic but playable.
Composition/framing: elevated three-quarter 16:9; boss upper middle; player lower middle; Core and four pylons readable; one red boss attack sector visible.
Lighting/mood: warm sun breaking through dark cloud, cool aether, physical dust, smoke, sparks, crop movement.
Color palette: natural farm base, turquoise friendly effects, vermilion hostile corruption, pale boss stone.
Constraints: no screen-filling bloom, no opaque particle carpet, no copied monster, no logos, no watermark, no unreadable UI wall; targets and lane must remain visible.
```

**Acceptance:** Boss mechanic, two classes, quiz corruption, lane, towers, and hostile telegraph remain separable under spectacle.

## 08 — Wave-Thirty Endgame

**Path:** `assets/08-wave-thirty-endgame.png`

```text
Use case: ui-mockup
Asset type: wave-30 victory and continuation-choice game screen
Primary request: Show the completed Aetherfield farm after defeating wave 30, with visible earned growth and a clear Extract or Continue Endless decision.
Scene/backdrop: fully expanded Amberstep Farm at radiant sunset; upgraded fences, six defense roles, restored crops, repaired Quiz Core, distant cleared gate.
Subject: both heroes stand near the Core; compact results plate shows score, quiz accuracy, core health and banked Core Seeds; two equal clear actions.
Style/medium: premium stylized 3D game end-state with practical readable UI.
Composition/framing: 16:9 elevated hero overview; fortified farm dominates; results low right; two actions prominent; no credits roll.
Lighting/mood: triumphant warm sunset, cool aether accents, drifting chaff, calm smoke decay.
Text (verbatim): "SIEGE COMPLETE", "WAVE 30", "SCORE 184,200", "QUIZ 92%", "CORE 68%", "CORE SEEDS 14", "EXTRACT", "CONTINUE ENDLESS".
Constraints: exact text only; no battle pass, store, stars, loot chest, real-money offer, watermark, extra menu pages, or destroyed farm.
```

**Acceptance:** Earned farm transformation, full end state, secured rewards, and meaningful continuation choice are obvious.

## 09 — Future Maps

**Path:** `assets/09-future-maps.png`

```text
Use case: stylized-concept
Asset type: two-panel future-map environment concept
Primary request: Show exactly two future Aetherfield maps that preserve the same handcrafted aether-farm identity while changing terrain play.
Scene/backdrop: left panel Tideglass Paddies with flooded terraces, bridges, mist turbines and water lanes; right panel Highwind Orchard with cliff plots, rope lifts, windbreak walls and glider route.
Subject: each panel has one recognizable Quiz Core, an open lane, one tiny hero for scale, and one distinct landmark.
Style/medium: polished 3D game environment concept, tactile stylized realism, same camera and material family as Amberstep Farm.
Composition/framing: clean equal 16:9 diptych inside one landscape image; elevated three-quarter views; no third panel.
Lighting/mood: left cool dawn mist with warm lamps; right bright windy afternoon with long cloud shadows.
Color palette: same brass, stone, timber, indigo and restrained cyan identity adapted to water and cliff biomes.
Constraints: exactly two maps, no labels or text, no logos, no watermark, no city, desert, space station, or duplicated layout.
```

**Acceptance:** Two future terrain mechanics, same product identity, and strict three-map lifetime scope read without labels.

