# Persistence traps — voxel-samurai-quiz

**Read when:** Renaming product/UI systems or changing Zustand and localStorage ownership.
**Status:** optional tips · measured better solution wins · change rights: [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Only compact bullets; one clear fact per bullet.
Cut filler, introductions, repetition, and needless articles; keep symptom, cause, action, and evidence.

- **Favorites and roster order vanish after product rename** — broad `aeon` → `quizfall` replacement renamed two stable Zustand localStorage keys, leaving valid browser data unreachable. → Treat persisted keys as external APIs; read original and accidental keys once, merge feature data, then delete only accidental key.
  *Commit `64dc6aad` changed both keys; 122-class UI showed 0 favorites and reset roster view until key recovery · 2026-08-09*
