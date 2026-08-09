# Service OALab — Design and implementation prompt master tasks

## User goal

- Turn `initial-prompt.md`, six WhatsApp voice messages, and Synara into one implementation-ready product prompt.
- Define a low-friction customer chat and a powerful internal operations surface without exposing Kanban complexity to customers.
- Produce two coherent high-fidelity UI directions with ten workflow screens each.
- Store every final prompt, specification, and selected image in this project folder.

## Solution decision

### Compared approaches

1. **Chat-only frontend:** fastest customer experience, but too weak for internal triage, execution control, audit, and deployment gates.
2. **Shared customer/admin Kanban:** technically direct, but conflicts with the explicit requirement that customers should not need to understand Kanban.
3. **Role-separated service platform:** customer chat/history on one side; internal Kanban/automation/release control on the other; one shared ticket and event model underneath.

### Selected approach

- Use approach 3. It keeps customer effort tiny while preserving modular ownership, operational control, reusable services, measurable performance, and safe failure recovery.
- Treat a request as the single source of truth. Chat messages, attachments, approvals, job attempts, notifications, previews, and deployments append events to that request instead of creating parallel state.
- Use two visual directions over the same screen contracts so the comparison tests design language rather than changing product scope.

### ✅ Phase 1 — Sources, scope, and product boundary

**Goal:** Convert all supplied source material into verified product decisions and explicit uncertainties.

* [x] Read workspace rules, architecture guidance, phase workflow, prompt guide, and image-generation guidance.
* [x] Transcribe and evaluate all six WhatsApp Opus files from 2026-08-09.
* [x] Inspect Synara's project rules, current screenshot, theme tokens, sidebar, surfaces, and composer patterns.
* [x] Choose role-separated customer and internal experiences over a customer-facing Kanban.
* [x] Mark the written domain as provisional until DNS ownership is verified before deployment.

**Result:** Customer simplicity, internal control, media ingestion, response management, quotas, and human production approval form one coherent scope.

**References:**
`shared-docs/OALab/Projects/service-oalab/initial-prompt.md`
`/Users/kentoky/Documents/React Projects/synara/assets/prod/readme-screenshot.jpeg`
`shared-docs/agents/CREATE-PROMPT-GUIDE.md`

### ✅ Phase 2 — Product blueprint and executable build prompt

**Goal:** Create a product/architecture SSoT and a self-contained prompt that another coding agent can execute end to end.

* [x] Define actors, request lifecycle, approval gates, permissions, notification channels, quotas, audit events, and failure recovery.
* [x] Define modular frontend, backend, worker, storage, media, provider, deployment, and observability boundaries.
* [x] Define exact ten-screen contracts shared by both visual variants.
* [x] Write the final implementation prompt with phased To-dos, bounded delegation, browser permission, tests, performance budgets, and acceptance gates.
* [x] Keep unknown infrastructure values configurable; do not invent credentials, repository mappings, or provider access.

**Result:** The blueprint and build prompt now form one executable product contract from client request through protected beta and human production release.

**Architecture fit:** Domain transitions own state, append-only events own history, outbox/queues own external effects, and role-specific UIs remain projections instead of parallel systems.

**References:**
`shared-docs/OALab/Projects/service-oalab/service-oalab-product-blueprint.md`
`shared-docs/OALab/Projects/service-oalab/service-oalab-implementation-prompt.md`
`shared-docs/OALab/CUSTOMER-PROJECT-OPERATIONS.md`

### ✅ Phase 3 — Variant A: Nocturne Console

**Goal:** Generate ten consistent dark, Synara-informed, production-grade desktop mockups covering the complete customer-to-deployment workflow.

* [x] Establish one reusable dark design system and reference screen.
* [x] Generate screens A01–A10 as separate project-bound PNG assets.
* [x] Validate role, state, hierarchy, required actions, legibility, consistency, and absence of watermarks.
* [x] Complete one bounded audit; no material failure required regeneration.

**Result:** Nocturne Console delivers all ten dark workflow screens with consistent navigation, matte surfaces, client simplicity, internal density, and a disabled human release gate.

**Architecture fit:** One base prompt owns visual tokens while ten shared screen contracts own content; no screen-specific parallel design system was introduced.

**References:**
`shared-docs/OALab/Projects/service-oalab/service-oalab-design-assets.md`
`shared-docs/OALab/Projects/service-oalab/assets/variant-a/`
`/Users/kentoky/Documents/React Projects/synara/assets/prod/readme-screenshot.jpeg`

### ✅ Phase 4 — Variant B: Luminous Atelier

**Goal:** Generate ten consistent light, editorial, premium desktop mockups using the same workflow and information architecture as Variant A.

* [x] Establish one reusable light design system and reference screen.
* [x] Generate screens B01–B10 as separate project-bound PNG assets.
* [x] Validate role, state, hierarchy, required actions, legibility, consistency, and absence of watermarks.
* [x] Complete one bounded audit; no material failure required regeneration.

**Result:** Luminous Atelier delivers all ten warm light workflow screens. B01–B05 use the image generator; after its OAuth token was invalidated, B06–B10 were completed from the reusable deterministic renderer with the same documented design tokens and screen contracts.

**Architecture fit:** Shared screen contracts keep both variants comparable; the supporting renderer centralizes B06–B10 tokens and layouts without becoming a second product-state source.

**References:**
`shared-docs/OALab/Projects/service-oalab/service-oalab-design-assets.md`
`shared-docs/OALab/Projects/service-oalab/assets/variant-b/`
`/Users/kentoky/Documents/React Projects/synara/assets/prod/readme-screenshot.jpeg`

### ✅ Phase 5 — Asset documentation and acceptance audit

**Goal:** Make the image set reproducible and verify that every requested deliverable is stored in the project.

* [x] Record purpose, final prompt construction, source references, project path, format, pixel size, composition, materials, lighting, constraints, and selection for all assets.
* [x] Confirm exactly ten selected PNGs per variant and no generator-only delivery paths.
* [x] Check UTF-8, links, filenames, domain wording, customer/admin separation, responsive intent, and media edge cases.
* [x] Re-read all acceptance criteria after every checkbox was completed.

**Result:** The project now contains a reproducible 20-image manifest, canonical prompts, exact dimensions, source roles, selection guidance, and a complete acceptance audit.

**Architecture fit:** `service-oalab-design-assets.md` remains the sole image-specification and manifest owner; task history only records delivery status.

**References:**
`shared-docs/OALab/Projects/service-oalab/service-oalab-design-assets.md`
`shared-docs/OALab/Projects/service-oalab/assets/variant-a/`
`shared-docs/OALab/Projects/service-oalab/assets/variant-b/`

### ⏳ Phase 6 — Version-control delivery

**Goal:** Deliver a clean, integrated shared-docs commit and parent-repository pointer without mixing unrelated workspace changes.

* [x] Inspect shared-docs status and staged diff; include the user-supplied `initial-prompt.md` plus all task deliverables.
* [ ] Commit and push the shared-docs repository.
* [ ] Update only the shared-docs pointer in the parent repository; leave unrelated cache changes untouched.
* [ ] Verify remote integration, commit hashes, and final repository status.

**References:**
`shared-docs/OALab/Projects/service-oalab/`
`shared-docs/`
`AGENTS.md`

## Comments

### Phase 1

**Criteria met:** maintainability ✅, modularity ✅, separation of concerns ✅, single-source request model ✅, reusable workflow contracts ✅, customer simplicity ✅, performance boundaries considered ✅, media and failure edge cases considered ✅.

**Findings / performance issues / rule violations by severity:**

1. 🟠 **High — domain spelling is inconsistent:** written source says `olap.de`, audio sounds like `oalab.de`/`orlab.de`, and project ownership is named OALab. Fix path: keep the deployment host configurable and require a DNS verification gate before production.
2. 🟡 **Medium — first audio contains repeated transcription text:** repeated trailing phrases are an ASR artifact and are excluded from requirements. Fix status: resolved during source normalization.
3. 🟡 **Medium — Synara has no configured Git remote:** its local state cannot be independently proven current. Fix status: use it only as a visual/architectural reference, never as an authoritative dependency.

### Phase 2

**Criteria met:** maintainability ✅, modular packages ✅, service/helper ownership ✅, UI/domain separation ✅, reusable provider adapters ✅, bounded performance ✅, failure and security edge cases ✅, no invented infrastructure access ✅.

**Findings / performance issues / rule violations by severity:**

1. 🟠 **High — text-only AI cannot satisfy media requests:** image/video-dependent jobs must route by capability or to manual review. Fix status: enforced in blueprint and prompt.
2. 🟠 **High — automated production deployment conflicts with the human-control requirement:** worker may only produce beta evidence. Fix status: hard human release-manager gate defined.
3. 🟡 **Medium — Signal may lack a supportable provider route:** exposing it as guaranteed would be dishonest. Fix status: capability-gated adapter and feature flag required.

### Phase 3

**Criteria met:** maintainability ✅, reusable dark base prompt ✅, role separation ✅, consistent hierarchy ✅, bounded image iteration ✅, release-safety state ✅.

**Findings / performance issues / rule violations by severity:** none open; one visual audit found no material failure.

### Phase 4

**Criteria met:** maintainability ✅, reusable light base prompt ✅, deterministic token reuse ✅, client/admin separation ✅, bounded image iteration ✅, dense admin layouts remain legible ✅.

**Findings / performance issues / rule violations by severity:**

1. 🟡 **Medium — image service OAuth token was invalidated after B05:** retries returned `401 token_revoked`. Fix status: resolved without scope loss by rendering B06–B10 from `assets/variant-b-renderer.html`; all five outputs were visually inspected and dimension-checked.

### Phase 5

**Criteria met:** documentation SSoT ✅, exact file manifest ✅, UTF-8 ✅, 20/20 dimension validation ✅, edge cases represented ✅, responsive implementation intent retained ✅.

**Findings / performance issues / rule violations by severity:** none open; domain ambiguity remains an explicit deployment gate rather than an image-level guess.
