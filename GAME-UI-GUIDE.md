# Game UI defaults

Read only for game interface design. General frontend correctness stays in [FRONTEND-RULES.md](FRONTEND-RULES.md); permissions and writing style stay in [CODING-RULES.md](CODING-RULES.md).

**House style since 11.10.2026: [Premium-Graffiti](ui/PREMIUM-GRAFFITI-GAME-UI.md)** — World-Class Motion, AAA, award level: hand-drawn, layered, expensive graffiti plus motion cut like a video. It is the default for every game UI, also for games without their own `DESIGN.md`.

- **Precedence:** an explicit user decision for a project > this house style > older project styles. Older styles are translated at the next UI rework: the game keeps its world and palette, the craft and motion become the house style's. If the older style was an explicit user choice (e.g. Elemental Flakes glass), ask once instead of replacing it silently.
- **Prompts:** UI and world separately in [prompts/game-redesign/](prompts/game-redesign/README.md), with the original prompt as the example. Skill: `game-ui-graffiti` (rework flow, agent briefs, motion recipe and sound; it absorbed `game-motion-studio` on 12.10.2026).
- **Project contracts that stay valid inside their own scope:** [Shardfall Sci-Fi UI](ui/SHARDFALL-SCI-FI-GAME-UI.md) (reference boards for Shardfall), [MMO combat density](ui/LARGE-MMO-RPG-COMBAT-DENSITY.md) (how much may be on screen).
- Important actions and states need meaningful, distinct marks from the game's own hand-drawn icon set — no generic icon library in the visible UI, no text-only placeholders.
- Tie motion to events: build-up → hit → payoff → rest. Selection, cast, hit, cooldown, success and failure get immediate transform/opacity feedback. No idle loops, reduced motion shows the end state.
- Keep combat skills in a compact rail at the lower gameplay edge. Each slot needs a distinct mark, key chip, name on focus/activation and clear ready/active/progress/disabled states.
- The old "Juicy Game-UI System" (rounded warm-stone cards, idle loops, Lucide) is superseded: [old-deprecated/juicy-game-ui-system.md](old-deprecated/juicy-game-ui-system.md).
