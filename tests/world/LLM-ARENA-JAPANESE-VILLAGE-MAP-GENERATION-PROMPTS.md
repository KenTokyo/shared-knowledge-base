## Quick tech read

| Variation | Core technique | Strongest fit | Main tradeoff |
| --- | --- | --- | --- |
| 1 | Analytic heightfield + masks | Fast, fully code-authored prototype | Terrain can feel mathematically smooth |
| 2 | Erosion-baked heightfield | Natural slopes, drainage, and shorelines | Higher generation cost and harder direct edits |
| 3 | Spline-first world graph | Strong routes and cinematic art direction | Less automatic variation |
| 4 | Modular grammar + constraints | Many valid village layouts | Needs strict rules to avoid noisy composition |
| 5 | Voxel signed-distance field | Cliffs, cuts, caves, and live terrain edits | Heavier meshing and collision work |
| 6 | Authored spec + staged bakes | Best production balance and reliability | More pipeline code up front |

# LLM Arena prompts — Japanese village map generation

Use the same world brief, seed, camera, controls, lighting, and performance HUD in every run. Change only the generation method. Compare composition, terrain quality, path readability, building placement, water integration, collision reliability, generation time, frame time, draw calls, and ease of art direction.

## Locked world brief

- Build an original 600 × 600 unit Three.js combat map; treat 1 unit as 1 meter.
- Create a cinematic Japanese-inspired waterside village with a subtle feudal mood, not a copy of any real game location.
- Place shallow reflective water and reeds in the southwest foreground, stepping-stone banks and a timber footbridge near the center, and a compact market village across the middle ground.
- Give the market 12–18 timber buildings, cloth stalls, lanterns, fences, storage props, small gardens, and one readable plaza.
- Raise the land through three playable levels: water edge, village terraces, and a fortified hill with a keep or pagoda silhouette in the northeast.
- Connect all zones with one clear main route, two flank paths, stone steps, ramps, and at least three combat clearings.
- Frame the opening view from the southwest water edge toward the hill landmark. Use warm sunset light, pink-blue haze, restrained red accents, and readable silhouettes.
- Keep water, roads, buildings, vegetation, collision, navigation, and spawn placement aligned to one world-space contract.
- Use a fixed displayed seed. WASD moves, mouse orbits, Shift sprints, M toggles the overview camera, G toggles generation overlays, and R resets.
- Show generation time, FPS, frame time, draw calls, triangles, visible instances, and seed from real runtime values. Target smooth desktop play without deleting landmarks or route clarity.



## Variation 1 — Analytic heightfield and semantic masks

```text
Build a Vite + Three.js showcase for the locked 600 × 600 meter Japanese-inspired waterside village brief. Generate the entire map deterministically in JavaScript from one seed. Use a continuous analytic height function made from broad hills, ridged noise, smooth terraces, and explicit flattening kernels. Derive named masks for water, shore, roads, market, building plots, combat clearings, rock, grass, and steep slopes. Keep heightAt(x,z), normalAt(x,z), surfaceAt(x,z), waterDepthAt(x,z), roadMaskAt(x,z), and occupancyAt(x,z) as the shared world contract used by rendering, collision, navigation, scatter, and spawns.

Carve the southwest pond and stream into the final heightfield, flatten the central market and northeast keep footprints against the final surface, and reject any placement whose full footprint is too steep, underwater, blocked, or floating. Generate roads as mask blends, buildings from reusable procedural timber modules, and vegetation through seeded slope-aware scatter. Chunk terrain and use instancing, explicit bounds, level of detail, and pooled materials. Include the locked camera, controls, sunset look, overlays, and real performance HUD. Do not use imported terrain, heightmaps, or map meshes. The result must feel authored, not like a noisy plane with random boxes.
```

## Variation 2 — Erosion-baked natural terrain

```text
Build a Vite + Three.js showcase for the locked 600 × 600 meter Japanese-inspired waterside village brief. Start from a seeded low-frequency heightfield, then run an offline-at-load terrain bake with thermal erosion, lightweight hydraulic erosion, drainage accumulation, slope calculation, and shoreline relaxation. Use erosion to form believable ridges, runoff channels, soil fans, and stone exposure; preserve explicit protected zones for the market, paths, combat spaces, and hill keep. Display bake progress and generation time, then render only the finished data rather than simulating erosion every frame.

Store the baked height, normal, slope, drainage, moisture, material, water, road, and occupancy fields in one versioned world result. Make collision, navigation, vegetation, buildings, water, and spawn checks sample that same result. Cut the shallow southwest water after drainage analysis, stabilize its banks, bridge the narrowest useful crossing, and place village terraces where slope and drainage scores are safe. Scatter grass, reeds, shrubs, and rocks from moisture and slope bands with seeded thinning. Use chunked meshes, instancing, explicit bounds, level of detail, and reusable materials. Include the locked camera, controls, sunset look, overlays, and real performance HUD. Keep the final macro layout identical to the brief even when erosion changes local terrain detail.
```

## Variation 3 — Spline-first routes, water, and terraces

```text
Build a Vite + Three.js showcase for the locked 600 × 600 meter Japanese-inspired waterside village brief. Treat the map as a designed world graph before generating terrain. Author a small set of editable Catmull-Rom splines for the main route, two flank paths, pond and stream centerline, footbridge crossing, terrace edges, market street, and approach to the northeast keep. Give each spline width, shoulder, grade limit, surface, clearance, and priority. Turn the graph into signed distance fields, then raise, lower, flatten, and blend a base terrain around those fields.

Derive building plots, stall rows, fences, stairs, ramps, combat clearings, camera anchors, and spawns from the final graph and terrain. Enforce walkable grades, minimum path widths, bridge clearance, full-footprint building support, and continuous routes between all major zones. Use procedural timber modules for 12–18 buildings while keeping rooflines varied and the plaza open. Expose spline control points and influence bands when G is pressed so art direction stays readable. Chunk terrain, instance repeated props and vegetation, set explicit bounds, and use level of detail. Include the locked camera, controls, sunset look, fixed seed, and real performance HUD. Route composition and landmark framing matter more than random variation.
```

## Variation 4 — Modular settlement grammar and constraint solving

```text
Build a Vite + Three.js showcase for the locked 600 × 600 meter Japanese-inspired waterside village brief. Keep the large terrain, pond, three elevation levels, main route, bridge, market plaza, combat clearings, and hill keep as fixed semantic anchors. Generate the village between them with a seeded modular grammar or Wave Function Collapse-style constraint solver. Use a compact tile and module vocabulary for street segments, corners, alleys, courtyards, homes, shops, stalls, gates, fences, gardens, stairs, retaining walls, and empty breathing spaces.

Give every module connection sockets, footprint bounds, entrance direction, elevation range, neighbor rules, route priority, and combat-clearance cost. Solve from the plaza and main route outward, backtrack on blocked layouts, and guarantee that doors face reachable space, roofs do not overlap, the landmark remains visible, and all three combat clearings stay open. After solving, conform each full footprint to the final terrain and generate collision, navigation, scatter exclusions, and prop placement from the solved occupancy grid. Use instanced modular geometry, shared materials, explicit chunk bounds, and level of detail. Include the locked camera, controls, sunset look, overlays, real performance HUD, and fixed seed. R must rebuild the exact same layout; an optional seed control may create a different valid village without moving the macro anchors.
```

## Variation 5 — Voxel signed-distance-field terrain

```text
Build a Vite + Three.js showcase for the locked 600 × 600 meter Japanese-inspired waterside village brief. Represent terrain as a chunked sparse voxel field containing a signed distance to the surface plus material and occupancy channels. Combine smooth constructive-solid-geometry primitives, terraced hill profiles, river cuts, pond basins, road trenches, retaining walls, rock shelves, and keep foundations into one deterministic field. Mesh visible chunks with marching cubes or surface nets, generate stable normals, and build matching collision meshes from the same field.

Use the signed-distance field to create stronger vertical forms than a normal heightmap: undercut stone banks, a short gate tunnel, stepped cliffs, carved drainage, and natural transitions around the southwest water. Keep every required route accessible without forcing caves into the main path. Place the market buildings on sampled support volumes, reject overhangs under footprints, and derive navigation, water boundaries, vegetation, and spawn safety from the final field. Rebuild only dirty chunks when data changes; move meshing away from the render loop when possible. Merge or instance repeated geometry, use explicit bounds and distance-based chunk detail, and show active chunks in the G overlay. Include the locked camera, controls, sunset look, fixed seed, and real performance HUD. Avoid blocky Minecraft-style visuals; the surface must read as smooth cinematic terrain.
```

## Variation 6 — Authored world spec with staged deterministic bakes

```text
Build a Vite + Three.js showcase for the locked 600 × 600 meter Japanese-inspired waterside village brief. Use a hybrid production pipeline. First define one readable WorldSpec with units, bounds, seed, water level, terrain control points, biome zones, route splines, landmark anchors, building plots, combat clearings, camera anchors, and quality budgets. Then run staged deterministic bakes: terrain and terrace field → water and shoreline → roads and navigation → building footprints and occupancy → vegetation and props → collision, camera, and spawn validation. Stamp each result with schema version, seed, source hash, resolution, and dependency revisions so a changed source invalidates every dependent bake.

Use designed macro shapes for the opening vista, main route, market plaza, hill keep, and combat spaces; use procedural detail only inside those authored limits. Build houses from a reusable timber kit, conform full footprints to the final terrain, and share the final world fields across rendering, collision, navigation, water, scatter, and spawns. Split runtime geometry into spatial render buckets with instancing, explicit bounds, level of detail, and scalable shadow, reflection, vegetation, and post-processing quality. Preserve landmark silhouettes and safe routes at every quality setting. Include the locked camera, controls, sunset look, dependency overlay, fixed seed, bake timings, and real performance HUD. Fail loudly on stale or inconsistent bake data instead of silently placing broken content.
```

## Recommended judging order

1. Check macro composition first: opening vista → water → market → hill landmark.
2. Walk every route and edge: no floating buildings, blocked doors, water leaks, unsafe slopes, or collision gaps.
3. Compare generation control: reproduce the seed, move one anchor, and observe what rebuilds.
4. Compare runtime cost using the same camera path and quality setting.
5. Pick Variation 6 for a production map unless live terrain deformation or mass layout variation is the core feature.
