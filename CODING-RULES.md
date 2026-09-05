# Coding Rules

General work policy. Read once per fresh context; reread changed sections only. Specialist knowledge belongs in linked docs, not here.

## 1. Understand and protect the request

- Follow platform/system instructions first. Within project guidance: current user request → local `AGENTS.md` → these rules → relevant specialist guidance. User exceptions apply only to their stated task/session.
- Inspect relevant code, docs, references and Git changes before deciding. Load the smallest useful file set; stop exploring once evidence supports the next change.
- Preserve intent, quantities, paths, commands, names, constraints, negations and working behavior. Correct obvious speech-to-text noise only when meaning is clear.
- Clarify wording, not scope. Never turn five effects into ten or invent features, controls, restrictions or architecture to make a prompt sound stronger. Creative detail belongs only in areas the user leaves open.
- Treat an already enhanced prompt as the working request; do not enhance it again. Do not start a separate enhancer call unless requested or explicitly enabled.
- Proceed with low-risk assumptions and state them briefly. Ask only when ambiguity changes required behavior, significant cost, safety or an irreversible action. Do not end with permission requests for obvious next steps.

## 2. Plan only what the task needs

- **Advice/review without edits:** answer directly; no task files, build, version bump or Git mutation.
- **Small, clear change:** a short checklist is enough. Reuse an existing task file if relevant; no mandatory prompt/task pair.
- **Multi-stage, risky or long work:** before implementation, create or continue one linked pair in the project task folder: `<topic>-enhanced-prompt.md` and `<topic>-tasks.md` (or an existing master plan).
- Prompt file: `## Unchanged original` preserves user text verbatim except secrets (`[REDACTED: secret]`); `## Improved prompt` holds a concise, scope-preserving working request. Do not duplicate global rules. Append dated user updates; keep earlier originals intact.
- Task file: link the prompt under `## Initial goal`. Each phase needs a goal, `[ ]`/`[x]` tasks, a short result and at most three relevant paths. Add architecture, reasons, risks or limits only when they affect decisions; one shared architecture note is enough.
- Update after meaningful progress, then continue to the next task. Fix related findings in the same plan; do not create recursive cleanup plans or unrelated feature work. Split unwieldy plans around 600 lines.
- Handover: goal, current state, next action, blockers, relevant paths and commands. Preserve prompt/task paths when they exist. After context loss, read request → current task state → relevant code; do not replay the whole history.
- Before delivery, compare the implementation with the current request and open acceptance points. Reread originals only if intent is uncertain.
- Multi-stage details: [phase workflow](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md).

## 3. Code and architecture

- Understand the responsible module and data flow. Reuse project patterns; prefer simple components/services with clear responsibilities and one reliable state source.
- Shared modules need real reuse. Avoid growing miscellaneous files, duplicate stores, hidden fallbacks and layers without a concrete benefit.
- Fix causes, not symptoms. Remove displaced code after checking references. Keep unrelated working behavior and other contributors' edits intact.
- Keep new handwritten code files below 1,200 lines. For larger existing files, extract cohesive responsibilities when relevant; a tiny fix alone must not trigger an unrelated rewrite. Generated/vendor files are exempt; stricter project gates still apply.
- Batch repeated I/O, run independent work in parallel, reuse expensive results and clean up listeners/timers/resources. Optimize measured bottlenecks without hiding quality loss or cutting requested functionality.
- Never expand a collection while iterating it without a deliberate queue/snapshot, visited tracking and a bound.
- A repeated defect needs a new cause investigation, not the same tuning again. Broaden repairs only to coupled parts needed for the requested result.
- Repository/reference adoption: preserve the real behavior and quality-bearing mechanism, not just its appearance. Read [reference transfers](REFERENCE-TRANSFERS.md) when applicable.

## 4. Checks and runtime inspection

- Finish a coherent change, run the strongest relevant existing checks, fix findings together, then rerun affected checks. Do not repeat unchanged checks without a new question.
- Use project build/cache scripts. Inspect exit codes and redirected logs. Never weaken checks or exclusions to obtain a green result. Docs-only changes need no typecheck.
- No new tests/configuration unless requested or required by the project. Existing focused checks may be updated for changed behavior.
- Local user-provided images may be read and copied without browser permission.
- Browser/dev-server/UI/gameplay inspection requires explicit permission for this task/session. Without it, use static checks and report runtime/console coverage as unverified.
- With permission: implement → static checks → start app and read console → fix causes → one control run if needed. Default budget: **two runtime inspection runs total, including failures and console checks**. User-specified budgets override this; exhausted budget means report the blocker, not another hidden run.
- Use the existing harness; no automatic capture-framework project. Follow [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md) for approved captures. Typechecks and stub-DOM checks do not prove visual quality or real runtime behavior.

## 5. Secrets, Git and delivery

- Use explicitly authorized test credentials only for the requested test and cost/provider limits. Keep values in ignored local storage or process environment; never in chat, prompts, task files, logs, screenshots or commits. Machine-specific locations belong in resource docs below.
- Before writes, inspect status/diff. Stage explicit paths; never silently reset, overwrite or discard others' work. Commit your task changes. Include other contributors' changes only when explicitly authorized and reviewed; do not claim them as yours.
- Commit and push completed changes unless the user opts out. Read-only tasks require neither. Keep the current branch unless instructed otherwise; do not create/switch worktrees implicitly.
- Fetch and integrate remote changes safely before delivery. Prefer fast-forward when possible; resolve divergent histories and conflicts by reviewing both sides. No destructive reset, blanket ours/theirs, force push or hook bypass.
- Submodules: commit/push inside first, then commit the parent pointer. Review staged paths/diff and `git diff --check`; fix commit/push failures or report the exact external blocker.
- Report result, relevant artifact/path, checks and limits, version/build when applicable, commit hash, remote alignment and remaining status. Local project rules own packaging commands and version policy.

## 6. Writing style — one owner

- Use basic English for chat, generated docs, code and comments unless explicitly requested otherwise. Preserved originals and exact identifiers keep their language.
- Lead with the result. Use short, direct sentences and compact bullets. Explain necessary technical terms. Keep Gen-Z slang light and natural; clarity wins.
- Use numbered steps for order, checkboxes for tasks and icons sparingly. Cut repetition and filler, not facts, grammar or important constraints.
- Use UTF-8 and real umlauts; check changed docs for broken encoding.
- Do not repeat this style block in plans, model prompts or every-turn prompts. A standalone prompt without these rules may carry a short fallback.
- Logs: compact readable stage/action, responsible module, outcome and useful timing. Color only where supported; never log secrets or endless progress noise.

## 7. Load specialist guidance only when relevant

- Frontend/state/UI: [FRONTEND-RULES.md](FRONTEND-RULES.md); game styling: [GAME-UI-GUIDE.md](GAME-UI-GUIDE.md).
- Real-time 3D: [THREEJS-RULES.md](THREEJS-RULES.md); complete worlds: [THREEJS-WORLDBUILDING-RULES.md](THREEJS-WORLDBUILDING-RULES.md).
- Historical VFX/rig/performance cases: [3D evidence notes](threejs/PROJECT-EVIDENCE-NOTES.md); verify stack/version before reuse.
- Local paths, ports or test-key locations: [Windows resources](WINDOWS-RESSOURCEN.md) or [macOS resources](MACOS-RESSOURCEN.md), not both.
- External APIs: current original docs for the open question, not entire documentation trees.
- New proven lessons: [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md). Store with the relevant feature/project; do not grow this core with incident logs.
