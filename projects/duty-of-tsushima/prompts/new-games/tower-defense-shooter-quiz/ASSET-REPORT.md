# Farm-Core Defense — Asset Delivery Report

## Generation Record

- Generated on 2026-08-09 with the built-in image-generation tool.
- One independent generation call produced each final numbered image.
- No external reference image, brand asset, or copied game artwork was supplied to generation.
- Exact final prompts, purpose, relative project path, and acceptance criterion live in each
  direction's [`Aetherfield`](aetherfield-last-harvest/ASSET-MANIFEST.md),
  [`Blackrain`](blackrain-protocol/ASSET-MANIFEST.md), or
  [`Wildcore`](wildcore-bloom-siege/ASSET-MANIFEST.md) manifest.
- The listed checksum is the first 16 hexadecimal characters of SHA-256 and is intended as a compact
  handoff fingerprint, not a security claim.

## Technical Inventory

| Final project path | Dimensions | Format | SHA-256 prefix |
|---|---:|---|---|
| `aetherfield-last-harvest/assets/00-title-start.png` | 1672 × 941 | PNG RGB8 | `58e3dd8500bbd411` |
| `aetherfield-last-harvest/assets/01-wave-one-farm.png` | 1672 × 941 | PNG RGB8 | `0ac230cb82e91e9e` |
| `aetherfield-last-harvest/assets/02-build-mode.png` | 1672 × 941 | PNG RGB8 | `f099f7c12f01204f` |
| `aetherfield-last-harvest/assets/03-quiz-event.png` | 1672 × 941 | PNG RGB8 | `a305e85bd14c25c7` |
| `aetherfield-last-harvest/assets/04-defense-family.png` | 1672 × 941 | PNG RGB8 | `9f4c2620ed060187` |
| `aetherfield-last-harvest/assets/05-classes-weapons.png` | 1672 × 941 | PNG RGB8 | `b3876349e7f1332e` |
| `aetherfield-last-harvest/assets/06-upgrade-interface.png` | 1672 × 941 | PNG RGB8 | `6b9add1bc4fbb91b` |
| `aetherfield-last-harvest/assets/07-boss-wave.png` | 1672 × 941 | PNG RGB8 | `92909f9872b5eed8` |
| `aetherfield-last-harvest/assets/08-wave-thirty-endgame.png` | 1672 × 941 | PNG RGB8 | `32762b3f4a786df4` |
| `aetherfield-last-harvest/assets/09-future-maps.png` | 1672 × 941 | PNG RGB8 | `8800406a2c83bb33` |
| `blackrain-protocol/assets/00-title-start.png` | 1672 × 941 | PNG RGB8 | `f72ed9a2af71d32e` |
| `blackrain-protocol/assets/01-wave-one-farm.png` | 1672 × 941 | PNG RGB8 | `72f413e89a5d05e0` |
| `blackrain-protocol/assets/02-build-mode.png` | 1672 × 941 | PNG RGB8 | `b4b6f908b93bd879` |
| `blackrain-protocol/assets/03-quiz-event.png` | 1672 × 941 | PNG RGB8 | `13b0a6ab87e7c610` |
| `blackrain-protocol/assets/04-defense-family.png` | 1672 × 941 | PNG RGB8 | `9e57cc637e31053a` |
| `blackrain-protocol/assets/05-classes-weapons.png` | 1672 × 941 | PNG RGB8 | `8784e6d45a48d528` |
| `blackrain-protocol/assets/06-upgrade-interface.png` | 1672 × 941 | PNG RGB8 | `5848caab7c44f386` |
| `blackrain-protocol/assets/07-boss-wave.png` | 1672 × 941 | PNG RGB8 | `a048c00946cd8449` |
| `blackrain-protocol/assets/08-wave-thirty-endgame.png` | 1672 × 941 | PNG RGB8 | `59806a2e37107114` |
| `blackrain-protocol/assets/09-future-maps.png` | 1672 × 941 | PNG RGB8 | `f27d8b834ade0e99` |
| `wildcore-bloom-siege/assets/00-title-start.png` | 1672 × 941 | PNG RGB8 | `6c6a72504b6c0235` |
| `wildcore-bloom-siege/assets/01-wave-one-farm.png` | 1672 × 941 | PNG RGB8 | `8578464e587ae19d` |
| `wildcore-bloom-siege/assets/02-build-mode.png` | 1672 × 941 | PNG RGB8 | `d6b2a6f19f66a721` |
| `wildcore-bloom-siege/assets/03-quiz-event.png` | 1672 × 941 | PNG RGB8 | `2bb04159578d94b3` |
| `wildcore-bloom-siege/assets/04-defense-family.png` | 1672 × 941 | PNG RGB8 | `5d6f226dad1f23d1` |
| `wildcore-bloom-siege/assets/05-classes-weapons.png` | 1672 × 941 | PNG RGB8 | `84ffaa1d3b828bed` |
| `wildcore-bloom-siege/assets/06-upgrade-interface.png` | 1672 × 941 | PNG RGB8 | `6b0d44b0aaa15be6` |
| `wildcore-bloom-siege/assets/07-boss-wave.png` | 1672 × 941 | PNG RGB8 | `eee52e51d976646e` |
| `wildcore-bloom-siege/assets/08-wave-thirty-endgame.png` | 1672 × 941 | PNG RGB8 | `f16e0d122e462028` |
| `wildcore-bloom-siege/assets/09-future-maps.png` | 1672 × 941 | PNG RGB8 | `970f21e7589c3743` |

## Review Result

- Inventory gate: 30 of 30 numbered images present; no gaps or cross-direction asset references.
- Decode gate: all 30 are non-interlaced 1672 × 941 PNG files in 8-bit RGB.
- Sequence gate: every direction covers title, early play, build mode, live quiz, six defenses, two
  class identities, upgrades, boss pressure, wave-30 resolution, and exactly two future-map panels.
- Catalogue gate: every isolated defense sheet contains exactly six principal objects.
- Quiz gate: every quiz composition contains four physical answer targets.
- Manual review retained the original `blackrain-protocol/assets/07-boss-wave.png`: it has the
  strongest readable boss/Vault/four-terminal composition, but image generation added a small
  non-canonical `03` support-avatar/HUD artifact. It is not a third playable class. The canonical
  system contract and all implementation prompts require exactly two playable classes. A targeted
  regeneration was attempted, but the image service returned a revoked-token error; a local patch
  was rejected because it visibly degraded the image.

## Selection

- All delivered files are the selected complete generations for their numbered role.
- Aetherfield is the recommended all-round product direction.
- Blackrain is the recommended shooter-first direction.
- Wildcore is the recommended originality-and-elemental direction.
- Final art-direction selection remains a human product decision; no preference is recorded as user
  approval.
