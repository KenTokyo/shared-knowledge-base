# Claude v6 Cost Notes — Readable Edition

> **Purpose:** Cleaner view of the local source file `claude-v6-costs.md`. All recorded values are preserved. Unclear source wording stays explicit instead of being guessed.

## 1. Voxel Samurai Benchmark 1 — Fable 5.1

**Benchmark:** `voxel-samurai-benchmark1`

| Setup | Duration | 5-hour usage | Weekly usage | Fable weekly usage |
|---|---:|---:|---:|---:|
| Fable 5.1 High | 45 min | 7% | 2% | 3% |
| Fable 5.1 xHigh | 69 min | 10% | 2% | 4% |
| Fable Max | — | 12% | 2% | 5% |

## 2. Claude Desktop — Fable 5.1 Max + Opus 5 xHigh

**Setup:** Fable 5.1 Max × Opus 5 xHigh · maximum 3 subagents

| Recorded item | Value |
|---|---:|
| Start | 8% all models · 15% weekly |
| Weekly | 4% |
| Fable weekly | 5% |
| 5-hour usage | 21% |

## 3. UniAiChat Runs

### Fable 5.1 Max × UniAi × Opus 5 High

**Subagents:** maximum 3

| Window | Usage |
|---|---:|
| 5 hours | 26% |
| Weekly | 4% |

### Claude Fable 5 · Claude Code xHigh · UniAiChat

The source contains overlapping `Before` and `After` labels. Kept as recorded:

| Source label | Recorded value |
|---|---|
| Before | — |
| After | — |
| Combined source line | `4% weeklyBefore 35% 78% Weekly` |
| After | `35% 5% weekly + vs 12% 5 hrs` |

### Claude Fabe 5 · Claude Code High · UniAiChat

> `Fabe` is the spelling used in the source.

| Point | Recorded value |
|---|---|
| Vorher | `100% 94% weekly` |
| After 22 min | `34% und 11% weekly` |

## 4. Claude Code Extension

### Fable 5.1 High

| Recorded item | Value |
|---|---:|
| Calculation | `100 - 34 = 66%` |
| Hourly | 12% |
| Now | 54% |
| Weekly only | 2% |

### Fable 5 xHigh Orchestrating Opus 5 High

| Point | 5-hour value | Weekly value | Status |
|---|---:|---:|---|
| Before | 54% | 87% | — |
| After | 30% | 82% | Not finished |

## 5. Claude Code CLI — Fable 5 xHigh Orchestrating Opus 5 xHigh

### Before

| Window | Usage |
|---|---:|
| 5 hours | 100% |
| Weekly | 73% |

### After — Usage Snapshot A

The source records `5h - After`, followed by this status:

```text
Current session ↑
3% used
Resets 3pm (Europe/Berlin)

Current week (all models)
19% used
Resets Sep 6, 8pm (Europe/Berlin)

+50% weekly limits promo through Sep 13 · clau.de/cc-50-promo

Current week (Fable)
22% used
```

### After — Usage Snapshot B

```text
Current session
0% used

Current week (all models)
26% used
Resets Sep 6, 8pm (Europe/Berlin)

+50% weekly limits promo through Sep 13 · clau.de/cc-50-promo

Current week (Fable)
28% used
Resets Sep 6, 8pm (Europe/Berlin)
```

### Session Totals

| Metric | Value |
|---|---:|
| Total cost | **$176.21** |
| Total duration (API) | 4h 49m 53s |
| Total duration (wall) | 3h 51m 34s |
| Total code changes | 16,512 lines added · 342 lines removed |

#### Usage by Model

| Model | Input | Output | Cache read | Cache write | Cost |
|---|---:|---:|---:|---:|---:|
| `claude-haiku-4-5` | 1.7k | 12 | 0 | 0 | $0.0018 |
| `claude-fable-5-1` | 31.5k | 273.4k | 19.4m | 496.7k | $28.78 |
| `claude-opus-5` | 486.6k | 1.2m | 186.4m | 3.7m | $147.43 |

**Prompt cache (main):** 65 requests · 97% of input tokens from cache · no misses · cold — idle 1h 11m 55s, next turn re-caches ~526.5k tokens

## 6. Claude Code CLI — Fable 5.1 xHigh

### Before

```text
Current session
0% used
Resets 9pm (Europe/Berlin)

Current week (all models)
26% used
Resets Sep 6, 8pm (Europe/Berlin)

+50% weekly limits promo through Sep 13 · clau.de/cc-50-promo

Current week (Fable)
28% used
Resets Sep 6, 8pm (Europe/Berlin)
```

### After

**Screen:** Settings → Status → Config → Usage → Stats

**Prompt cache (main):** 57 requests · 97% of input tokens from cache · no misses · warm (1h TTL, last activity 8m 37s ago)

```text
Current session
20% used
Resets 8:59pm (Europe/Berlin)

Current week (all models)
30% used
Resets Sep 6, 7:59pm (Europe/Berlin)

+50% weekly limits promo through Sep 13 · clau.de/cc-50-promo

Current week (Fable)
36% used
Resets Sep 6, 7:59pm (Europe/Berlin)
```

### Session Totals

| Metric | Value |
|---|---:|
| Total cost | **$37.81** |
| Total duration (API) | 1h 19m 29s |
| Total duration (wall) | 1h 38m 26s |
| Total code changes | 7,142 lines added · 26 lines removed |

#### Usage by Model

| Model | Input | Output | Cache read | Cache write | Cost |
|---|---:|---:|---:|---:|---:|
| `claude-haiku-4-5` | 1.1k | 15 | 0 | 0 | $0.0011 |
| `claude-fable-5-1` | 49.7k | 377.4k | 23.6m | 627.7k | $37.81 |

**Prompt cache (main):** 57 requests · 97% of input tokens from cache · no misses · warm (1h TTL, last activity 8m 37s ago)
