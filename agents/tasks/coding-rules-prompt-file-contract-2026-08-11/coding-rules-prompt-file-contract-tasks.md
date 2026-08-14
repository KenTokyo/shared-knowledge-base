# Coding Rules — prompt-file contract and lean owner routing

## Initial goal

[coding-rules-prompt-file-contract-enhanced-prompt.md](coding-rules-prompt-file-contract-enhanced-prompt.md)

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

## Follow-up goal — explicit enhanced prompt files

1. Change only the documentation workflow; do not touch the product Prompt Enhancer or popover.
2. Keep plain requests in `…-prompt.md`; name the companion `…-enhanced-prompt.md` when the user clearly requests a better prompt.
3. Preserve the unchanged original in both forms, but make `## Improved prompt` the required working basis in an enhanced file.
4. Detect clear positive wording such as “improve”, “make it clearer”, or “make it nicer” without ignoring negations, empty markers, or placeholders.
5. Add six compact sentences with the strongest prompt-writing tips, including optional game inspirations, meaningful adjectives, enough detail, and creative freedom.

## Follow-up acceptance — enhanced naming and writing guide

- The naming rule allows exactly one prompt companion and explains when an existing file is renamed.
- `Unchanged original` is explained as the protected record, not the execution target of an enhanced file.
- Natural improvement requests and the optional marker share one clear trigger rule.
- The improved prompt cannot invent required facts, features, references, or boundaries.
- Task plans, handovers, context reduction, and the final quick check accept both `*-prompt.md` and `*-enhanced-prompt.md`.
- The current companion demonstrates the new enhanced naming and contains both the earlier source and the improved update.
- Documentation links, UTF-8, Mojibake, whitespace, Git/submodule order, and remote sync pass; no code build or VSIX is needed for this docs-only follow-up.

**Criteria feedback:** This stays maintainable and modular because naming carries the state instead of adding a second tool or runtime path. One prompt file remains the source, the task remains the plan, and explicit negation/placeholder rules cover the main edge cases with no performance cost.

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
`coding-rules-prompt-file-contract-enhanced-prompt.md`
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
`coding-rules-prompt-file-contract-enhanced-prompt.md`

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
`coding-rules-prompt-file-contract-enhanced-prompt.md`

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

### ✅ Phase 6 — Checks, package, and delivery
**Goal:** Deliver the shared rules and runtime behavior as one verified release.
* [x] `doc-checks` — Verified all Coding Rules links, explained-only no-go words, 235-line size, UTF-8/Mojibake, Markdown endings, and clean diffs.
* [x] `project-checks` — `pnpm test` passed compile, lint, style guardrails, and all 171 extension tests in one full run.
* [x] `release` — Bumped once to `3.6.444`, built through `pnpm package:vsix`, and verified manifest/runtime files inside the VSIX.
* [x] `git-delivery` — Pushed shared-docs implementation `a2b6086` first, then parent implementation `7aa5dcf`; final task/pointer closure follows this status edit.
* [x] `final-audit` — Reread prompt, task, user edits, all phases, checks, artifact, both remotes, and unrelated remaining files.
**Result:** The plain rules, active-only strategy guidance, tests, Build `3.6.444`, VSIX, and implementation commits are complete and remotely synced.
**Limits:** Staged only task-owned files; unrelated cache and Notes changes remain untouched.
**Architecture:** Shared-docs landed before each parent pointer. One shared string feeds both enabled protocols, `off` stays empty, and no second setting or runtime path exists.
**Findings:** 🟢 **Info:** VSCE advises bundling because the extension has many JavaScript files; this existing package-size advice does not block the verified artifact.
**References:**
`coding-rules-prompt-file-contract-tasks.md`
`../../../../package.json`
`../../../../src/models/subagent-strategy.ts`

### ✅ Phase 7 — Enhanced naming and compact improvement guide
**Goal:** Make requested prompt improvement explicit in the companion filename and in a short, safe writing guide.
* [x] `read-current-state` — Read the latest remote Coding Rules, prompting tips, unchanged update, prior plan, and concurrent popover boundary.
* [x] `enhanced-source` — Appended the unchanged user update, added its improved working prompt, and renamed this companion to `…-enhanced-prompt.md`.
* [x] `rule-contract` — Split plain and enhanced prompt naming, defined the trigger and working source, and updated all path examples.
* [x] `writing-guide` — Replaced repeated marker/vague-request prose with six compact sentences covering clarity, references, adjectives, detail, and creative freedom.
* [x] `docs-checks` — Verified changed links, six guide sentences, UTF-8, Mojibake, final newlines, old/new companion paths, and whitespace.
* [x] `git-delivery` — Committed and pushed the shared-docs implementation as `922d402`; this final status update and the parent pointer are delivered next.
**Result:** Plain and enhanced prompt files now have distinct names, enhanced text is the working basis, and the six-sentence guide stays compact and safe.
**Why:** The old filename hid whether a better prompt existed, and `Clear work goal` did not clearly say which text drives execution.
**Limits:** Documentation only; no popover/product code, version bump, build, browser, screenshot, or VSIX.
**Architecture:** User request → one plain or enhanced prompt companion → linked task plan → execution from improved text when present. This is simple, reusable, maintainable, and adds no runtime work.
**Findings:** 🟠 **Fixed:** One ambiguous filename represented two states. 🟡 **Fixed:** Repeated trigger prose lacked a compact writing method. 🟢 **Protected:** Concurrent popover/product files remain untouched.
**References:**
`../../../CODING-RULES.md`
`coding-rules-prompt-file-contract-enhanced-prompt.md`
`../../../PROMPTING-TIPS.md`

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

### Phase 6
**Criteria met:** docs and links ✅, compile/lint/style ✅, 171 tests ✅, verified VSIX ✅, submodule-first delivery ✅, remote sync ✅.
**Findings by severity:**
1. 🟢 **Info:** VSCE’s existing bundle-size warning is advisory; manifest version, runtime guidance, and required protocol files are present in the archive.
2. 🟢 **Protected:** Pre-existing OpenCode cache and four Notes files were never staged or changed by this task.

### Phase 7
**Criteria met:** clear naming ✅, unchanged original preserved ✅, latest improved prompt drives work ✅, six-sentence guide ✅, negation/placeholder safety ✅, no product changes ✅, docs checks ✅, shared-docs implementation pushed ✅.
**Findings by severity:**
1. 🟠 **High · fixed:** One `…-prompt.md` name did not show whether the AI should follow an improved version; `…-enhanced-prompt.md` now does.
2. 🟡 **Medium · fixed:** Marker and vague-request rules repeated the trigger but did not teach compact prompt improvement; one six-sentence guide now covers the useful parts.
3. 🟢 **Protected:** `Notes/enhance-popover-funktion-verbessern-notes.md` and all product Prompt Enhancer/popover code stayed untouched.
