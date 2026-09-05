# Game UI defaults

Read only for game interface design. A named project style or user reference wins. General frontend correctness stays in [FRONTEND-RULES.md](FRONTEND-RULES.md); permissions and writing style stay in [CODING-RULES.md](CODING-RULES.md).

- Avoid generic flat dashboard cards. Use the project palette, layered solid surfaces, inset/raised planes, fine rims, contact shadows, highlights and restrained glow. No extra canvas merely to give controls depth.
- Important actions/states need meaningful, distinct inline SVG marks with a consistent stroke/shape language. Text-only placeholders, repeated generic symbols and decorative icons do not replace meaning.
- Tie motion to events: appear → build → highlight → settle/fade. Selection, cast, hit, cooldown, success and failure need immediate transform/opacity feedback. Limit idle motion, respect reduced motion and clean up listeners/animations.
- Keep combat skills in a compact rail at the lower gameplay edge. Each slot needs a distinct mark, key chip, name on focus/activation and clear ready/active/progress/disabled states. Prefer tight grouping and state lighting over oversized cards or permanent full-surface neon.
