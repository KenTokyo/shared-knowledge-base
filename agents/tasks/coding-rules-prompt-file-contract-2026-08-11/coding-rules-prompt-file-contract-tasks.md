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

## Solution comparison

| Option | Benefit | Risk | Decision |
|---|---|---|---|
| Store raw request and improved text directly in every task file | One file to open | Repeats large prompts, mixes immutable source with changing plan | Reject |
| Create prompt files only when a marker is present | Fewer files | Tasks without marker lose the initial-goal source and condense contract | Reject |
| Require one companion prompt owner for each task; task and handovers carry its link | Stable source, compact plans, same AI can improve and execute | Needs naming and legacy rules | **Build** |
| Keep specialist rules inline | No extra read | Main file stays noisy and duplicates existing owners | Reject |
| Delete specialist detail | Smallest file | Loses safety and practical guidance | Reject |
| Move detail to triggered owners; keep universal gates in Coding Rules | Lean default context without knowledge loss | Links must stay correct | **Build** |

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
