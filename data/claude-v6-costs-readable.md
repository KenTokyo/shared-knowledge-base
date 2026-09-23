# Claude v6 Cost Notes — Quick Comparison

> Preview-friendly companion to the local source file `claude-v6-costs.md`. The source stays untouched. Every recorded value remains below.

## Quick Conclusion

- 🟢 **Lowest directly comparable run:** Fable 5.1 High — 7% in the 5-hour record, 2% weekly, 3% Fable weekly, 45 min.
- Fable 5.1 xHigh ran **24 min longer** than High and recorded **+3 percentage points** in 5 hours, the same weekly value, and **+1 point** Fable weekly.
- Fable Max recorded the highest values in that benchmark: **12% / 2% / 5%**. No duration was saved, so cost per minute cannot be compared.
- Recorded session totals were **$37.81** for Fable 5.1 xHigh CLI and **$176.21** for the longer Fable/Opus orchestration. Different models and durations → not a fair efficiency ranking.
- Opus contributed **$147.43 / $176.21 ≈ 83.7%** of the orchestration session cost. Both detailed sessions reported **97% cache input**.

## Color Key

🟢 lowest · 🟡 middle · 🟠 highest **inside the directly comparable benchmark only**. Colors are relative ranks, not universal quality grades.

## 1. Directly Comparable Benchmark

**Benchmark:** `voxel-samurai-benchmark1`

| Rank | Setup | Duration | 5-hour record | Weekly record | Fable weekly record |
|---|---|---:|---:|---:|---:|
| 🟢 Lowest | Fable 5.1 High | 45 min | **7%** | **2%** | **3%** |
| 🟡 Middle | Fable 5.1 xHigh | 69 min | **10%** | **2%** | **4%** |
| 🟠 Highest | Fable Max | Not recorded | **12%** | **2%** | **5%** |

## 2. Before → After Meter Changes

> `pp` means percentage points. Arrows only show meter movement. They do not guess whether an unclear meter means “used” or “left.”

| Setup | Time / state | 5-hour or session meter | All-model weekly meter | Fable weekly meter |
|---|---|---:|---:|---:|
| Fable 5 · Opus 5 High · Claude Code Extension | Not finished | 54% → 30% **▼24 pp** | 87% → 82% **▼5 pp** | — |
| Claude Fabe 5 High · UniAiChat | 22 min | 100% → 34% **▼66 pp** | 94% → 11% **▼83 pp** | — |
| Fable 5.1 xHigh · Claude Code CLI | After | 0% → 20% **▲20 pp** | 26% → 30% **▲4 pp** | 28% → 36% **▲8 pp** |

> `Fabe` is the spelling used in the source. The source also records `100 - 34 = 66%` under the following Claude Code Extension entry.

## 3. Recorded Session Totals

| Setup | Total cost | API duration | Wall duration | Code changes | Main cache |
|---|---:|---:|---:|---:|---|
| Fable 5.1 xHigh · Claude Code CLI | **$37.81** | 1h 19m 29s | 1h 38m 26s | +7,142 / −26 | 57 requests · 97% · warm |
| Fable 5 xHigh orchestrating Opus 5 xHigh · Claude Code CLI | **$176.21** | 4h 49m 53s | 3h 51m 34s | +16,512 / −342 | 65 requests · 97% · cold |

<details>
<summary><strong>Exact model usage and cache details</strong></summary>

| Session | Model | Input | Output | Cache read | Cache write | Cost |
|---|---|---:|---:|---:|---:|---:|
| $37.81 session | `claude-haiku-4-5` | 1.1k | 15 | 0 | 0 | $0.0011 |
| $37.81 session | `claude-fable-5-1` | 49.7k | 377.4k | 23.6m | 627.7k | $37.81 |
| $176.21 session | `claude-haiku-4-5` | 1.7k | 12 | 0 | 0 | $0.0018 |
| $176.21 session | `claude-fable-5-1` | 31.5k | 273.4k | 19.4m | 496.7k | $28.78 |
| $176.21 session | `claude-opus-5` | 486.6k | 1.2m | 186.4m | 3.7m | $147.43 |

- **$37.81 session cache:** 57 requests · 97% of input tokens from cache · no misses · warm · 1h TTL · last activity 8m 37s ago.
- **$176.21 session cache:** 65 requests · 97% of input tokens from cache · no misses · cold · idle 1h 11m 55s · next turn re-caches ~526.5k tokens.

</details>

## 4. Other Recorded Runs

| Host | Setup | Duration / state | 5-hour or session record | Weekly record | Fable weekly record | Other source note |
|---|---|---|---:|---:|---:|---|
| Claude Desktop | Fable 5.1 Max × Opus 5 xHigh · max 3 subagents | — | **21%** | **4%** | **5%** | Start: `8% all models 15% weekly` |
| UniAiChat | Fable 5.1 Max × UniAi × Opus 5 High · max 3 subagents | — | **26%** | **4%** | — | — |
| Claude Code Extension | Fable 5.1 High | — | Now **54%** | **2% weekly only** | — | `100 - 34 = 66%` · `12% hourly` |
| Claude Code CLI | Fable 5 xHigh orchestrating Opus 5 xHigh | Before | **100%** | **73%** | — | After values are in the snapshots below |

### Unclear UniAiChat Record

The source labels overlap, so the exact wording stays intact:

| Source label | Recorded value |
|---|---|
| Before | — |
| After | — |
| Combined source line | `4% weeklyBefore 35% 78% Weekly` |
| After | `35% 5% weekly + vs 12% 5 hrs` |

Setup: `Claude Fable 5 · Claude Code - xHigh - UniAiChat`

## 5. Usage Snapshots

All reset times below use `Europe/Berlin`.

<details>
<summary><strong>Fable 5 xHigh orchestrating Opus 5 xHigh — Claude Code CLI</strong></summary>

The source records `5h - After`, then two snapshots.

| Snapshot | Current session | Session reset | All-model week | Weekly reset | Fable week | Fable reset | Promo |
|---|---:|---|---:|---|---:|---|---|
| A | **3% used ↑** | 3pm · Europe/Berlin | **19% used** | Sep 6 · 8pm | **22% used** | Not recorded | +50% through Sep 13 |
| B | **0% used** | Not recorded | **26% used** | Sep 6 · 8pm | **28% used** | Sep 6 · 8pm | +50% through Sep 13 |

Promo link: `clau.de/cc-50-promo`

</details>

<details>
<summary><strong>Fable 5.1 xHigh — Claude Code CLI</strong></summary>

| Point | Current session | Session reset | All-model week | Weekly reset | Fable week | Fable reset | Promo |
|---|---:|---|---:|---|---:|---|---|
| Before | **0% used** | 9pm · Europe/Berlin | **26% used** | Sep 6 · 8pm | **28% used** | Sep 6 · 8pm | +50% through Sep 13 |
| After | **20% used** | 8:59pm · Europe/Berlin | **30% used** | Sep 6 · 7:59pm | **36% used** | Sep 6 · 7:59pm | +50% through Sep 13 |

After screen: Settings → Status → Config → Usage → Stats

Promo link: `clau.de/cc-50-promo`

</details>
