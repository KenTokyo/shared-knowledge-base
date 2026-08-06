# Portable World Technology — Three-Style Comparison

Use this page to pick a map technology direction. The labels identify visual/build approaches only; none requires a source project, fixed API, file tree, function signature, or copied implementation.

## Quick Comparison

| Style label | How the map is built | Runtime response | Main performance shape |
| --- | --- | --- | --- |
| Voxel Style | Authored hotspots assembled from reusable faceted modules, static hero forms, deliberate routes, and coherent ground blocks | Bounded local surface regions hold chips, cuts, compression, heat, frost, wetness, and pooled fragments | Instancing or static batching, tight hotspot/chunk bounds, frustum culling, selective LOD |
| Ashen Coast Style | Authored world specification feeds staged derived-data bakes for terrain, water, roads, materials, biome density, placement, and shared world truth | Material-aware cosmetic layer sits above immutable baked terrain and never corrupts navigation or cache data | Deterministic bake cache, dependency invalidation, spatial batches, field-specific resolution, measured LOD |
| Claude Flakes Style | Authored macro heightfield supports continuous terrain LOD where useful, frequency-aware relief, and terrain-aligned structures | Bounded recyclable surface state creates real depth, rims, fracture, compaction, elemental state, wakes, and complete reset | Tight terrain-patch bounds, frustum culling, capped contact batches, recyclable field storage, pooled lights |

## Shared Technology Flow

`authored composition → shared finished world truth → spatial render groups → bounded runtime reactions → coherent lighting/audio → priority-based degradation`

## Short Glossary

| Term | Meaning |
| --- | --- |
| Authored hotspot | Deliberately composed place such as entrance, arena, landmark, side route, water feature, or encounter pocket. |
| Modular kit | Small reusable family of terrain, building, trim, rock, root, foliage, or prop forms. |
| World specification | Data-led description of landform, routes, water, sites, materials, biome rules, spawns, and composition intent. |
| Staged bake | Expensive world preparation split by dependencies so later terrain, water, material, and placement data derive from stable earlier results. |
| Bake cache | Stored output of expensive preparation, reused only while its authored inputs and generation rules still match. |
| Cache invalidation | Forced rebuild when source content, seed, schema, resolution, or generation logic changes. |
| Heightfield | Grid or equivalent surface representation storing terrain elevation. |
| Clipmap / continuous LOD | Camera- or focus-centered terrain detail levels that cover large ground efficiently without visible cracks or moving seams. |
| Shared world truth | One finished surface and material interpretation used by render, collision, grounding, water, structures, spawns, and effects. |
| Batching / instancing | Drawing repeated or static forms in groups instead of one draw call per object or voxel. |
| Render bounds | Tight spatial boxes or spheres describing what a render group actually occupies. |
| Frustum culling | Skipping render groups outside the camera's visible volume. |
| LOD | Lower-cost distant representation used only when projected size makes the difference useful. |
| Bounded reaction region | Fixed-capacity world area that stores nearby scars and elemental state without unbounded trail objects. |
| Material-semantic response | Stone, soil, moss, wood, and water react differently to the same measured contact. |
| Pooling | Reusing fixed sets of fragments, lights, particles, audio voices, or temporary effects instead of allocating during combat. |
| Environment coupling | Sun, sky fill, fog, wind, shadows, exposure, water, materials, audio, and skill lights follow one coherent direction. |
| Degradation order | Remove distant polish and microdetail before landmarks, routes, stable ground, navigation, or combat readability. |

## Freedom Boundary

- Keep the technology behavior and visible outcomes.
- Choose host-native names, APIs, data structures, shaders, cache format, module boundaries, and algorithms.
- Do not recreate another map's function signatures, class layout, constants, paths, assets, or code organization.
