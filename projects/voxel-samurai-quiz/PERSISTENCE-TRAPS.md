# Persistence traps — voxel-samurai-quiz

**Read when:** Renaming product/UI systems or changing Zustand and localStorage ownership.
**Status:** optional tips · measured better solution wins · change rights: [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Only compact bullets; one clear fact per bullet.
Cut filler, introductions, repetition, and needless articles; keep symptom, cause, action, and evidence.

- **Favorites and roster order vanish after product rename** — broad `aeon` → `quizfall` replacement renamed two stable Zustand localStorage keys, leaving valid browser data unreachable. → Treat persisted keys as external APIs; read original and accidental keys once, merge feature data, then delete only accidental key.
  *Commit `64dc6aad` changed both keys; 122-class UI showed 0 favorites and reset roster view until key recovery · 2026-08-09*
- **Menu canvas black in every stage after picking a solo dungeon floor** — `useCameraLogic` derived its `useFrame` priority from persisted `selectedMode` + `soloDungeonLevel` (factory default `soloDungeon` + floor 33), so it claimed a positive priority in the menu too. R3F draws only while no subscriber holds priority > 0 (`internal.priority += (priority > 0 ? 1 : 0)` → `if (!state.internal.priority) gl.render(...)`), and the menu mounts no hand-renderer. Stage, hero and lights disappeared together, with no error boundary. → A persisted gameplay selection may never decide who owns the frame; derive render priority from the same source that mounts the hand-renderer, and never reuse one value as both a gameplay clamp and an ownership switch.
  *Only `EffectComposer` still drew it; bloom off, `glowQuality: "low"` or the WebGPU path mount none → black. Fix `3ece2d11`, `@react-three/fiber` 9.6.1 `dist/events-b389eeca.esm.js:1121` and `:16060` · 2026-08-22*
