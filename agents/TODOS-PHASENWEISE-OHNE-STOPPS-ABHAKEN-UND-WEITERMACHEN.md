# Multi-stage workflow

Read only for genuinely multi-stage, risky or long work. [Coding Rules](../CODING-RULES.md) owns planning thresholds, writing style, permissions, checks and Git delivery.

1. Read the current request and existing plan. Reuse the linked prompt/task pair; create one before implementation only when the planning threshold applies.
2. Order coherent phases: foundation → complete main path → edge cases → finish → verification. Avoid phases that exist only to fill a template.
3. Track a goal, real checkboxes, one result and at most three main paths per phase. Explain architecture, performance and risks once at the level where they matter.
4. Implement related tasks together, run the relevant existing checks, fix findings, update the phase, then continue. Do not stop for permission before an already authorized next phase.
5. Investigate a recurring defect at its cause instead of repeating cosmetic tuning. The [iteration guide](MAX-5-VERBESSERUNGEN-DANN-WEITER.md) limits optional refinement; it does not excuse broken acceptance criteria or override runtime inspection budgets.
6. Keep related findings in the current plan. Record unrelated improvements as brief follow-ups, not automatic new cleanup plans or feature work.
7. At completion, compare the actual result with the current acceptance points. Report checks and real blockers; do not claim success just because boxes are checked.

```markdown
### Phase 1 — Clear outcome
**Goal:** Observable result.
- [x] Completed task.
- [ ] Remaining task.
**Result:** Current outcome, or pending.
**References:**
- `path/to/main/module`
```

For handover, retain the request/task paths, current state, next action, blockers and relevant commands. Do not copy the entire history or restate Coding Rules.
