# Voxel Samurai Quiz — Prompt Library

**Use when:** A project prompt must be located by product category instead of mixed into a generic prompt folder.

## New Games

- [`Endless Voxel Slasher`](new-games/endless-voxel-slasher/README.md) — 15 standalone English game-build prompts with Swordfighter and technology-based Elemental Technician: three detailed long, three compact short, six orchestrated subagent, and three single-file HTML chat versions.

## Structure Contract

- `new-games/<game>/long/` contains complete greenfield product specifications.
- `new-games/<game>/short/` contains compact benchmark-driven experiments for the same product.
- `new-games/<game>/long-subagent/` contains complete specifications with explicit orchestrated implementation and visual review.
- `new-games/<game>/short-subagent/` contains compact benchmark prompts with the same explicit orchestration profile.
- `new-games/<game>/html-only/` contains chat-ready prompts that demand one locally runnable `index.html` without build tools or external files.
- Each game folder owns one `README.md` that explains constants, style differences, and direct copy targets.
- Prompt files contain English only when the target game is English-only.
