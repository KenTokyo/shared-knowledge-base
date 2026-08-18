# Class VFX transfer — voxel-samurai-quiz

**Read when:** copied V21 class VFX moves, scales, or arrives differently from its source after file parity passed.
**Status:** voluntary tips · measured better solution wins · change rights: [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

## Tips

- **Copied VFX moves differently after transfer** — slice diff stays clean; a shared live-profile adapter rewrites source delta, trail width, particle size, and intensity after each source update. → Audit runtime feeds outside the slice; exact-copy paths keep source clock, transforms, and uniforms and reject target “readable” defaults.
  *Nullkaliber profile used duration `1.35`, trail `1.8`, particle `1.5`, intensity `2.4`; user rejected delayed travel and enemy arrival; overrides removed in game commit `7eb5c8e0` · 2026-08-18*
