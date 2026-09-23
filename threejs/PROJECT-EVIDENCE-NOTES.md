# Historical 3D performance, VFX and rig evidence

Moved from Coding Rules on 2026-09-05. Read only for a matching 3D task. These are prior project observations, not fresh measurements or universal guarantees; check the current engine/version and actual rendering path before reuse. [Coding Rules](../CODING-RULES.md) owns permissions and check budgets.

## Shardfall performance reference — 2026-08-28

Windows reference: `d:\CODING\React Projects\test-projects\shardfall-arena-v2.5-active` (Three.js, WebGL2, handwritten GLSL). Prior user report: stable 240 FPS up to `devicePixelRatio` 2; hardware/workload must be matched before treating this as a target. For a matching framerate question, inspect these sources first:

- Field lighting: one `DirectionalLight`, one `HemisphereLight`, at most two point lights. `src/loot/dropAura.ts` explains why there is no light per drop. Per-pixel light evaluation depends on the material/render path; a light radius alone does not guarantee cheap shading.
- `src/fx/grade.ts`: one scene render into a multisampled target, Bloom skipped below 0.01 strength, one combined finishing pass.
- `src/world/terrain.ts`: two `smoothstep` and three `mix` calls per fragment; no noise, trigonometry or texture there. Bake `fbm2` variation into vertex colors. Grid spacing grows from 1.25 m centrally to 4 m outside, avoiding ring-LOD seams.
- `src/world/sky.ts`: 2048² shadow map rather than 4096².

## Ground-layer VFX failure — 2026-08-28

Evidence: `quiz-arena-space` removed `DecalType.FROST` and `createFrostFieldMaterial`.

- Large flat translucent procedural ground sheets stacked without `depthWrite`; their work accumulated approximately with `Σ π · r²`, not object count. Recorded case: 22,000 m² shaded for a 110 m² skill, 198 layers deep; average FPS hid a halved 1% low.
- Avoid recreating that design: expensive Voronoi/fbm or more than roughly four noise calls per ground pixel, radii above roughly 9 m, growing full plates, and a second broad layer over existing ground marks. These numbers belong to this case, not a silent global feature cap.
- Prefer thin rings/edges, tinting existing stone, or effects above the floor: crystals, shards, mist, vertical curtains and particles. Replace the wrong full-sheet effect rather than only clamping its budget.

## Asset-Lab V6 — 2026-09-03

- **Fog color space:** recorded custom shader seam came from mixing `fogColor` in the wrong space. In that pipeline, built-ins mixed fog after tone mapping/encoding; the matching expression was `mix(finishOpaque(lit), fogColor, fogFactor())`. A linear-space mix made the surface roughly 18% brighter. Verify current Three.js chunks/uniform handling rather than assuming all versions use this order.
- **Loop wrap:** for loop length L, circular frequency must be `n · 2π / L`; noise scroll must cover whole tile periods. `sin(t * 9.0)` need not wrap. Compare state at 0 and L⁻ numerically.
- **Rig signs:** torso mass above its pivot and limb mass below it need deliberate angle conventions. Check end effectors numerically: flag tip above head, foot sole at y ≥ 0. A root-pivot somersault instead of pelvis rotation can swing the body below ground.
- **Floor penetration:** keyframed poses penetrated by up to 0.75 units in 22% of frames. During baking, measure the lowest block corner per frame and lift as needed; verify minimum world-y ≥ 0 rather than assuming IK solves contact.
- **Additive colors above 1.0:** desaturate toward `max(r, max(g, b))`, not `vec3(1.0)`, which can darken the result.
- **Fixed world quads:** crossed flame planes needed `DoubleSide`; `FrontSide` lost a plane each quarter orbit. True camera-facing billboards can remain front-sided.
- **Phase seeds:** `(i * 0.37) % 1` produced only 13 distinct phases for 72 lights in the recorded implementation. Use an index hash or random stream and inspect the actual distribution.
- **After edits:** rerun affected smoke/type checks; an added `side: DoubleSide` without its import broke runtime material construction.
- **Without a browser:** run `build()` including `createGeometry()`/`createMaterial()` in Node where supported; check assembled GLSL varyings, uniforms, attributes, reserved words, ASCII, brackets, function order and float/int types using existing shader lints. Static review cannot prove GPU compilation; report that limit.
- **Benchmark fairness:** scope searches to the assigned project/model directory. Searching a shared parent can expose another entry's implementation.
