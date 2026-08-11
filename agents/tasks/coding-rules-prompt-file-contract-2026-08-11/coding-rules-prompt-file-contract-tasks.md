# Coding Rules — prompt-file contract and lean owner routing

## Initial goal

[coding-rules-prompt-file-contract-prompt.md](coding-rules-prompt-file-contract-prompt.md)

- The prompt file is the source of truth for the raw user request and any explicitly requested improvement.
- This task plan derives scope and acceptance from that file.

## User goal

1. Let the working AI improve and execute a prompt without starting a separate enhancer AI.
2. Pair every task plan with a linked prompt file that remains available through context condensation and handovers.
3. Support flexible `Prompt-Verbesserung:[…]` keywords or free text while preserving the original request.
4. Make the main Coding Rules shorter by routing specialist detail to clear owners.

## Acceptance criteria

- Prompt and task files have one stable naming, ownership, update, and reference flow.
- Raw request, optional improved prompt, task plan, handover, and subagent context cannot drift silently.
- Missing/placeholder markers do not invent an improved prompt.
- Existing plans without a prompt companion have a safe migration rule.
- Frontend, 3D, screenshot, and learning details have one owner each; universal gates remain central.
- User edits already present in `CODING-RULES.md` remain intact.
- Links, Markdown structure, UTF-8, Mojibake scan, Git diff, submodule delivery, and parent pointer delivery pass.

## Follow-up goal — simple language and mode-owned Subagent guidance

1. Keep the original request unchanged, then add one clearly named, easier work goal when it helps.
2. Remove hard-to-understand prompt section names and explain the optional improvement line in one short place.
3. Replace vague jargon in Coding Rules with everyday German and add a short “do not write this” list with better words.
4. Keep the user’s 1,200-line limit and removal of the general Subagent section.
5. Send meaningful Subagent-use guidance only inside the Direct or Workflow prompt when that mode is active.

## Follow-up acceptance

- `CODING-RULES.md` contains no general Subagent-use section and no unexplained `kanonisch`, `normalisieren`, `Raw`, `Scope`, `Owner`, `Fan-in`, `Gate`, or `bounded` wording.
- Prompt files use simple section names: source, unchanged original, clear work goal, and dated updates.
- An optional `Prompt-Verbesserung:[…]` line changes how the clear goal is written; no separate request/executable sections are required.
- Direct and Workflow prompts share the same short quality rules; `off` still sends no Subagent block.
- Existing user edits are kept: original text remains separate, the general Subagent block stays removed, and the code-file limit stays at 1,200 lines.
- Documentation checks, focused Subagent tests, full project checks, version bump, VSIX, Git/submodule delivery, and final reread pass.

## Solution comparison

| Option | Benefit | Risk | Decision |
|---|---|---|---|
| Store raw request and improved text directly in every task file | One file to open | Repeats large prompts, mixes immutable source with changing plan | Reject |
| Create prompt files only when a marker is present | Fewer files | Tasks without marker lose the initial-goal source and condense contract | Reject |
| Require one companion prompt owner for each task; task and handovers carry its link | Stable source, compact plans, same AI can improve and execute | Needs naming and legacy rules | **Build** |
| Keep specialist rules inline | No extra read | Main file stays noisy and duplicates existing owners | Reject |
| Delete specialist detail | Smallest file | Loses safety and practical guidance | Reject |
| Move detail to triggered owners; keep universal gates in Coding Rules | Lean default context without knowledge loss | Links must stay correct | **Build** |
| Replace only the two words named by the user | Tiny edit | Leaves the same dense structure and more hidden jargon | Reject for follow-up |
| Rewrite every technical project document | Maximum consistency | Huge unrelated change and high meaning-loss risk | Reject for follow-up |
| Rewrite only the always-read rules, keep exact code names where needed, and move Subagent advice into active strategy prompts | Fixes the daily reading path and mode behavior without a second rules store | Needs focused prompt tests | **Build for follow-up** |

## Phases

### ✅ Phase 1 — Prompt source and task contract
**Goal:** Every planned repository task starts from one durable prompt source and one linked execution plan.
* [x] Read project rules, architecture guide, screenshot, current Coding Rules, current user diff, and phase workflow.
* [x] Preserve the user’s existing optional prompt note and Chat Title removal as input, not disposable noise.
* [x] Create this prompt/task pair before editing the target rules.
* [x] Define exact file naming, raw-source ownership, marker parsing, no-marker behavior, updates, legacy migration, and same-AI execution.
* [x] Require task, handover, context-condense, and delegated work to keep both paths reachable without changing the host routing protocol.
**Result:** Every repository-changing assignment now keeps raw intent in a companion prompt file and execution state in its linked task file.
**Why:** A mutable task plan must not replace or reinterpret the user’s original request.
**Rules met:** one source of truth ✅, no second AI ✅, user edits preserved ✅, edge cases covered ✅.
**Architecture fit:** prompt file owns intent → task file owns execution → handover carries both paths; subagents receive the task and follow its `Initial goal` link.
**Findings:** 🟠 **Fixed:** The former optional one-line note could not guarantee pairing, marker semantics, or condense continuity.
**References:**
`coding-rules-prompt-file-contract-prompt.md`
`../../../CODING-RULES.md`
`../coding-rules-alt-neu-zusammenfuehrung-2026-08-03.md`

### ✅ Phase 2 — Lean specialist-owner routing
**Goal:** Keep the default rule context focused on universal workflow while preserving specialist guidance.
* [x] Compare duplicated frontend, React, 3D, screenshot, learning, and delivery wording.
* [x] Move React/frontend runtime and UI detail into one triggered owner file.
* [x] Replace duplicated 3D and screenshot procedures with direct owner routing and universal gates only.
* [x] Merge repeated universal rules without weakening safety, Git, validation, or delivery requirements.
* [x] Update shared-docs navigation and specialist back-links for the new section names.
**Result:** Always-read Coding Rules dropped from 448 to 276 lines; frontend detail now loads only for frontend work.
**Rules met:** maintainability ✅, modular docs ✅, simple routing ✅, no specialist knowledge loss ✅.
**Architecture fit:** `CODING-RULES.md` stays the router; `FRONTEND-RULES.md`, Three.js owners, screenshot owner, and learning owner carry triggered detail.
**Findings:** 🟡 **Fixed:** React/UI and 3D/capture detail made the always-read file heavier and duplicated established owners.
**References:**
`../../../CODING-RULES.md`
`../../../THREEJS-RULES.md`
`../../../SCREENSHOT-GUIDE.md`

### ✅ Phase 3 — Contract audit and Git delivery
**Goal:** Prove the lean rule set is complete, linked, readable, and delivered through submodule then parent.
* [x] Re-read raw prompt, derived task goal, every phase, and all acceptance criteria.
* [x] Check line reduction, duplicate instructions, contradictions, links, Markdown, UTF-8, Mojibake, and diff whitespace.
* [x] Skip TypeScript/build checks because only documentation changes.
* [x] Commit and push shared-docs implementation as `e72dfa6`; close this audit in a final docs commit, then deliver only the parent submodule pointer.
* [x] Prepare final report with both repository hashes, remote sync, unrelated rest status, and exact inspection paths.
**Result:** Prompt/task contract and lean owner routing are audited and delivered in shared-docs; final audit commit and parent pointer follow immediately.
**Rules met:** documentation-only gate ✅, scoped Git delivery ✅, submodule-first order ✅.
**Architecture fit:** owner content lands before any parent repository points to it.
**Findings:** 🟢 **Fixed:** Renumbering exposed stale section references in specialist docs; all now use stable section names. Two broken legacy links in the touched JavaScript ADR were also repaired. No runtime or extension source change is needed.
**References:**
`../../../CODING-RULES.md`
`../../../FRONTEND-RULES.md`
`coding-rules-prompt-file-contract-prompt.md`

### ✅ Phase 4 — Feedback audit and plain-language design
**Goal:** Turn both screenshots and the user’s edits into one smaller wording and prompt-flow decision before implementation.
* [x] Read both screenshots, the complete current rules, existing prompt/task pair, user diff, Subagent strategy gate, Direct prompt, Workflow prompt, tests, and architecture notes.
* [x] Compare word replacement, full documentation rewrite, and a focused rewrite of the always-read rules plus active-only Subagent guidance.
* [x] Choose the focused rewrite; keep exact code/API names where replacing them would make the rule less accurate.
* [x] Keep this task tightly coupled in the main agent; no Subagent is useful for one shared rule file and one shared prompt rule.
**Result:** The current runtime gate is already correct: `off` sends no strategy prompt, while Direct and Workflow each send exactly one. The missing part is useful-work guidance inside those active prompts; Coding Rules also need a simpler prompt layout and word choices.
**Why:** A second Subagent settings path would duplicate the existing switch. Word-only edits would leave the same hard-to-read structure.
**Limits:** Preserve security, Git, testing, file-size, handover, and sight-check rules; preserve user edits and exact code names.
**Architecture:** Mode switch → one active strategy prompt → shared useful-work text. General work rules no longer carry Subagent behavior.
**Findings:** 🟠 **Open for Phase 5:** prompt source rules contradict “unchanged original” by also asking to remove filler words in that same section. 🟡 **Open for Phase 5:** active prompts explain protocol but not the user’s useful-work rule.
**References:**
`../../../CODING-RULES.md`
`../../../../src/providers/chat/shared/subagent-strategy-prompt.ts`
`coding-rules-prompt-file-contract-prompt.md`

### ✅ Phase 5 — Simpler rules and active-only Subagent guidance
**Goal:** Make the always-read rules understandable and make an enabled Subagent mode carry its own short use rules.
* [x] `plain-rules` — Rewrote dense headings and instructions in everyday German, removed repeats, and cut the file from 278 to 235 lines.
* [x] `prompt-layout` — Kept original text unchanged and moved cleanup/sorting into the separate `Clear work goal` section.
* [x] `word-no-gos` — Added concrete bad-word → better-word examples with an exact code/API-name exception.
* [x] `active-subagent-guidance` — Added one shared useful-work block to Direct and Workflow prompts; `off` stays empty.
* [x] `docs-and-tests` — Updated entry/architecture wording and focused contract checks without a second setting or prompt store.
**Result:** The default rules are shorter and plain, while only enabled Direct/Workflow requests receive the same guidance for useful, non-overlapping Child work.
**Limits:** Maximum 1,200 lines per changed hand-written code file; no browser or screenshot run; no unrelated wording sweep through architecture history.
**Architecture:** `ENABLED_SUBAGENT_USE_GUIDANCE` feeds both existing strategy prompts. The current request snapshot remains the only switch, so the design stays modular, reusable, simple, and cheap at runtime.
**Findings:** 🟠 **Fixed:** The original section asked for unchanged text and cleanup at the same time. 🟡 **Fixed:** Direct and Workflow had protocol details but no shared useful-work rule.
**References:**
`../../../CODING-RULES.md`
`../../../../src/models/subagent-strategy.ts`
`../../../../src/test/SubagentStrategy.test.ts`

### ⏳ Phase 6 — Checks, package, and delivery
**Goal:** Deliver the shared rules and runtime behavior as one verified release.
* [x] `doc-checks` — Verified all Coding Rules links, explained-only no-go words, 235-line size, UTF-8/Mojibake, Markdown endings, and clean diffs.
* [x] `project-checks` — `pnpm test` passed compile, lint, style guardrails, and all 171 extension tests in one full run.
* [x] `release` — Bumped once to `3.6.444`, built through `pnpm package:vsix`, and verified manifest/runtime files inside the VSIX.
* [ ] `git-delivery` — Commit/push shared-docs first, then commit/push the parent code and updated submodule pointer.
* [ ] `final-audit` — Reread prompt, task, user edits, all phases, checks, package, and remaining unrelated status.
**Result:** Rules, runtime tests, and `uniai-chat-3.6.444.vsix` are green; Git delivery and the final reread remain.
**Limits:** Stage only task-owned files; keep unrelated cache and Notes changes untouched.
**Architecture:** Shared-docs commit lands before the parent points to it; no direct VSCE command. The package contains the shared guidance once and both protocol consumers.
**Findings:** 🟢 **Open:** VSCE warns that the extension has many JavaScript files; this existing bundle-size advice does not block the verified package.
**References:**
`coding-rules-prompt-file-contract-tasks.md`
`../../../../package.json`
`../../../../src/models/subagent-strategy.ts`

## Comments

### Phase 1
**Criteria met:** maintainable ownership ✅, clear separation ✅, same-AI reuse ✅, context-loss edge cases ✅.
**Findings by severity:**
1. 🟠 **High · fixed:** Optional extraction became a mandatory prompt/task pair for repository-changing work.
2. 🟡 **Medium · fixed:** Empty and placeholder markers now count as no improvement; raw source stays untouched.
3. 🟡 **Medium · fixed:** Subagents follow the prompt link inside the routed task file, preserving the existing host protocol.

### Phase 2
**Criteria met:** modular owner design ✅, 38% shorter default rule file ✅, specialist knowledge preserved ✅.
**Findings by severity:**
1. 🟡 **Medium · fixed:** Detailed React/UI rules moved to `FRONTEND-RULES.md` before removal from the main file.
2. 🟢 **Low · fixed:** 3D and screenshot procedures now route to existing owners; obsolete numbered back-links were replaced with the section name.

### Phase 3
**Criteria met:** raw/task re-read ✅, 40.6% line reduction ✅, 12 changed Markdown files linked ✅, UTF-8/Mojibake ✅, `git diff --check` ✅, docs-only gate ✅, shared-docs pushed ✅.
**Findings by severity:**
1. 🟡 **Medium · fixed:** Numbered Coding Rules references would have broken after slimming; specialist files now reference stable section names.
2. 🟢 **Low · fixed:** The touched JavaScript ADR contained two already broken relative links; one became a truthful plain legacy filename and the Learning owner link now resolves.

### Phase 5
**Criteria met:** maintainable shared text ✅, modular mode switch ✅, simple prompt flow ✅, runtime cost limited to enabled modes ✅, collision and no-useful-split cases covered ✅.
**Findings by severity:**
1. 🟠 **High · fixed:** Cleanup inside the original-text section would have destroyed the unchanged source.
2. 🟡 **Medium · fixed:** Direct and Workflow could drift because useful-work guidance had no shared source.
3. 🟢 **Low · fixed:** The always-read file used 43 extra lines and several unexplained specialist words.
