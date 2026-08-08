# Audio lifecycle — duty-of-tsushima

**Read when:** Web Audio starts twice, becomes silent after an error, or fails to recover after interruption.
**Status:** Optional tips · measured better solution wins · editing rights: [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)
**Style:** Compact Markdown bullets only; one clear fact per bullet.
**Cut:** Remove filler, introductions, repetition, and needless articles; keep symptom, cause, action, evidence.

- **Sound vanishes after a start click or error burst** — One click could build two connected graphs, while 40 recent errors tore down the owned graph and set permanent failure. → Join all starts through one promise, publish only a complete graph generation, isolate update lanes, and reserve terminal failure for a missing API.
  *Direct start plus bubbling gesture shared no promise; runtime breaker called `_teardown()`; `src/audio/index.js` 1,907 → 1,591 lines and `pnpm check` built 168 modules · 2026-08-08*

- **First wave is silent although audio later reports running** — Wave direction starts before async graph publication, so `wave:start` can arrive without a route; accepted fanfares then used the world bus. → Queue the latest wave until `running`, use a master-only critical bus, and meter that bus.
  *`GameplayRuntime.begin()` enables the director before `audio.start()` settles; fanfare trim 0.24 → 1.6 (+16.5 dB); `pnpm check` built 171 modules · 2026-08-08*
