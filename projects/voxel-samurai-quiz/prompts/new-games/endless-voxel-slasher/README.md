# Endless Voxel Slasher — English New-Game Prompts

**Use when:** The same complete browser action RPG should be built or compared through three distinct map architectures.
**Constant:** English-only game copy, two worlds, Swordfighter plus Elemental Technician, full-body animation, jump, separate dodge, class Q dash, aerial skill branch, nine skills per class, premium layered sword/elemental VFX, ten enemies, endless waves, boss cadence, spawn, audio, and UI.
**Only comparison area:** Map construction, map rendering, map-light coupling, and visible movement/skill residues.
**Verification boundary:** Do not start automated browser, screenshot, gameplay, or FPS verification without an explicit current user request.

## Long Prompts — Complete Product Specifications

1. [`Voxel Style`](long/voxel-style.md) — authored voxel modules, independent local world builders, batched surfaces, and bounded reaction chunks.
2. [`Ashen Coast Style`](long/ashen-coast-style.md) — local V73 AEON principles: authored WorldSpec, staged bake, derived water, shared runtime fields, and InteractionField.
3. [`Claude Flakes Style`](long/claude-flakes-style.md) — macro heightfield, continuous terrain LOD, bounded SurfaceReactionField, and warm/cool relief lighting.

## Short Prompts — Black Desert Quality Benchmark

1. [`Voxel Style — Short`](short/voxel-style.md) — compact handcrafted voxel-diorama request.
2. [`Ashen Coast Style — Short`](short/ashen-coast-style.md) — compact local AEON-spec/bake request.
3. [`Claude Flakes Style — Short`](short/claude-flakes-style.md) — compact reactive heightfield/clipmap request.

## Shared Game Contract

- Exactly two worlds: Skyglass Aqueduct Palace and Verdant Titan Grove Fortress.
- Maximum outer span: 600 units per world; playable core approximately 220–340 units.
- English-only title, UI, HUD, tutorials, errors, accessibility labels, and player-facing copy.
- Exactly two complete selectable classes: voxel `Swordfighter` and technology-based `Elemental Technician`.
- Both classes use nine skills on `Q E R 1 2 3 4 5 6`, `Space` jump, separate `Left Alt` dodge, ground/air `Q` dash, and a functional airborne `2` branch.
- Swordfighter uses `Spirit`, katana combat, sampled blade motion, and `6 — Thousandfold Horizon` as broad multi-cut ultimate.
- Technician uses `Core Charge`; reactor, gauntlets, drone, plasma, cryogenics, Tesla channels, turbines, induction, and gravity lenses create fire, ice, lightning, wind, magma, and gravity attacks.
- Technician kit: Ion Vector, Pyroclast Orb, Cryo Bastion, Thunder Grid, Cyclone Drive, Magma Rail, Zero-Point Blizzard, Elemental Overdrive, and Event Horizon Engine.
- Both classes receive full-body animation, class-attached VFX/audio/hits, extreme but readable AoE, bounded map response, cooldown UI, reset behavior, pooling, and hard runtime caps.
- Exactly ten stone-like voxel enemy species: eight regular creatures, Titan Golem, and Storm Wyrm.
- Every fifth wave `5, 10, 15, …` is a mandatory alternating boss wave.
- One `WorldImpactEvent` reports the true contact point, direction, footprint, and strength to the selected map system.
- Map response remains cosmetic by default, bounded, weathered by material, and completely reset on retry, class change, or world selection.

## Style Selection

| Style | Choose when | Main trade-off |
|---|---|---|
| Voxel | handcrafted faceted diorama composition and direct module authorship matter most | local builders and reaction chunks require map-specific craft |
| Ashen Coast | local AEON architecture, authored geography, derived water, and shared bake/runtime truth matter most | higher spec, bake, and validation investment before the first finished world |
| Claude Flakes | continuous terrain, genuine visible skill scars, and relief-driven lighting matter most | reaction-field, LOD parity, and shader/bandwidth budgets are more demanding |

## Claude Flakes Reference Boundary

- Source reference: `D:/CODING/React Projects/github-repos-examples/Claude-Flakes`.
- Transfer only stack-neutral principles: bake plus CPU ground parity, continuous terrain LOD, bounded deformation state, shared contact brush, complete reset, warm grazing light, and cool sky fill.
- Do not copy Babylon.js/WGSL APIs, finished shaders, snow identity, or resolution values from the 2,048-meter reference world.
