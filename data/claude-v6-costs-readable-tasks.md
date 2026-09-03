# Claude v6 Costs — Readable Companion Tasks

## Initial goal

Prompt: [`claude-v6-costs-readable-enhanced-prompt.md`](claude-v6-costs-readable-enhanced-prompt.md)

Create a cleaner companion for `claude-v6-costs.md` without changing or dropping source facts.

## Phase 1 — Structure and formatting

**Goal:** Make every benchmark and usage snapshot easy to scan.

**Todos**

- [x] Keep the original source untouched.
- [x] Group runs by tool and model setup.
- [x] Format comparisons, session totals, and terminal snapshots clearly.
- [x] Preserve unclear source wording instead of guessing.

**Limits**

- No invented context, dates, units, or conclusions.
- Documentation only; no app or browser test.

**Result:** The companion now separates each tool and setup while retaining every recorded value.

**Main files**

- `claude-v6-costs.md`
- `claude-v6-costs-readable.md`

## Phase 2 — Verification and delivery

**Goal:** Prove the companion is complete and safely delivered.

**Todos**

- [x] Compare all source values and labels against the companion.
- [x] Check Markdown structure, links, whitespace, and mojibake.
- [x] Review Git diff and commit only task-owned files.
- [x] Push shared-docs, then commit and push the parent pointer.

**Result:** The readable edition is verified and ready for the shared-docs delivery flow.
