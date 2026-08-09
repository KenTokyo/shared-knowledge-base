# Service OALab — Final implementation prompt

Copy this prompt into a coding-agent session opened in an empty or dedicated Service OALab repository. Do not run it inside the UniAI Chat VS Code extension repository.

---

## Prompt starts here

Build **Service OALab**, a private client-request and controlled software-delivery platform. The quality bar is the clarity and restraint of the best modern AI workspaces, with Synara used only as a reference for quiet surfaces, compact navigation, fine separators, and a centered composer. Do not copy Synara branding, code, logo, or product-specific controls.

The product must feel simple enough for a non-technical client and powerful enough for an internal software-delivery team. It is one product with two role-separated projections over the same request/event truth:

- clients get chat, uploads, voice input, history, simple progress, preview review, and yes/no decisions;
- OALab gets customer management, Kanban, triage, AI/media evidence, job control, retries, quotas, audit history, beta previews, and a human production-release gate.

Read these project artifacts completely before writing code:

1. `service-oalab-product-blueprint.md`
2. `service-oalab-design-assets.md`
3. the selected visual reference directory under `assets/variant-a/` or `assets/variant-b/`
4. repository `AGENTS.md`, architecture guide, and existing task plan if present

Use the blueprint as product and domain truth. If a visual image conflicts with the blueprint, the blueprint wins. Images communicate composition and craft, not hidden functionality.

### Hard preconditions

- Work only in a dedicated Service OALab repository or empty workspace.
- If the workspace is another product, stop before writing and report the wrong target.
- Never request or invent production credentials.
- Do not change DNS, Netcup, Supabase, GitHub, Vercel, messaging-provider, or customer-project state without explicit current authorization and verified target details.
- Keep the public origin configurable. Raw source material inconsistently names `service.olap.de` and `service.oalab.de`; require a verified environment value before deployment.
- If a repository, Vercel project, or customer mapping is absent, build the safe configuration flow and use fixtures. Do not guess.

## 1. Product behavior

### Client experience

Create a low-density client workspace with:

- invitation-only account activation tied to an OALab customer number;
- no public signup;
- chat-style request creation and follow-up;
- editable browser voice transcription;
- screenshot, image, document, audio, and video attachments;
- visible upload, scan, processing, retry, and rejection states;
- simple request history with search and status filters;
- client-facing progress labels only: `Eingegangen`, `In Bearbeitung`, `Deine Freigabe`, `Live`, plus calm manual-review copy for failures;
- beta preview summary and evidence;
- `Ja, passt` and `Änderung nötig` approval actions;
- notification preferences for verified channel adapters;
- understandable quota/usage status without raw provider internals.

The client must never see Kanban, model selectors, repository secrets, branches, tokens, raw costs, worker commands, tool logs, internal notes, or production deployment controls.

### OALab experience

Create a higher-density internal workspace with:

- customer organizations, customer numbers, invitations, memberships, plans, quotas, and project mappings;
- inbox and Kanban projections over the canonical request lifecycle;
- AI-proposed title, category, acceptance criteria, risk, capability needs, and affected project;
- manual `Arbeit starten` as the default MVP dispatch;
- feature-flagged eligible auto-dispatch, off by default;
- worker lease, heartbeat, attempt, progress, cancellation, failure, and retry details;
- media analysis status and evidence;
- internal/client message visibility separation;
- beta preview creation and protected access;
- client approval challenge management;
- release checks, risk summary, client approval evidence, and a native human production confirmation;
- request, storage, token, media-minute, worker-minute, preview, notification, failure, and retry analytics;
- append-only security and operations audit.

### Release rule

The coding worker may prepare code and beta previews. It must never deploy production. Only an authenticated OALab release manager can start production deployment after current checks and approval evidence pass.

## 2. Architecture choice

Build a separate TypeScript monorepo. Use current stable packages supported by official documentation; pin resolved versions in the lockfile and do not invent future versions.

Recommended baseline:

```text
pnpm workspace + Turborepo
apps/web       -> Next.js App Router web application and server boundary
apps/worker    -> long-running Node.js/TypeScript worker for the Netcup VM
packages/contracts
packages/domain
packages/database
packages/media
packages/ai
packages/notifications
packages/deployments
packages/observability
```

Use:

- Supabase Postgres for transactional data;
- Supabase Auth for identity, with admin-created invitation flows;
- row-level security for tenant boundaries plus server-side authorization;
- private Supabase Storage for originals and derivatives;
- Supabase Queues/`pgmq` for durable worker and notification jobs;
- Vercel Preview and Production as deployment adapters where a customer project uses Vercel;
- a Netcup VM for the long-running worker, deployed through a reproducible container or systemd-managed service;
- provider adapters selected by declared capability rather than brand-specific conditionals.

Do not expose queue operations to the browser. Use logged durable queues, visibility/lease windows, explicit archive/dead-letter handling, and idempotent application commands even when the queue claims strong delivery semantics.

Node-RED may later consume signed webhooks through an adapter. It must not own auth, authorization, canonical request state, approvals, audit, quotas, or deployments.

## 3. Module ownership

- `contracts` owns schemas, enums, wire/event payloads, and error codes; no I/O.
- `domain` owns request transitions, approval policy, quota policy, idempotency, and client-status projection.
- `database` owns migrations, RLS, repositories, queries, transactions, and generated types.
- `media` owns upload authorization, scan/process orchestration, derivatives, and capability requirements.
- `ai` owns model/provider capability registry, triage, conversation, media-analysis, and coding-agent adapters.
- `notifications` owns channel capability, templates, outbox delivery, webhook verification, inbound decision resolution, and dead letters.
- `deployments` owns customer project mapping, beta preview, check evidence, production adapter, and rollback evidence.
- `observability` owns correlation IDs, structured events, bounded logs, metrics, tracing helpers, and redaction.
- feature UI owns composition and intent sending; it does not duplicate domain decisions.

Keep props down and callbacks/intents up. Use shared state only for genuinely cross-feature authenticated/session data. Avoid global helper dumping grounds, giant config files, barrel cycles, and feature imports from global platform modules.

## 4. Domain contracts

Implement the canonical lifecycle exactly through one transition service:

```text
draft
submitted
triage_needed
queued
running
awaiting_client
approved_for_beta
beta_deploying
beta_ready
release_review
production_deploying
released

rejected
cancelled
blocked
failed
superseded
archived
```

Rules:

- each request has a monotonically increasing version;
- every mutation provides expected version and idempotency key;
- stale commands return a typed conflict without partial writes;
- state mutation and append-only request event commit in one transaction;
- external side effects start only from a transactional outbox/queue message after commit;
- material code changes invalidate prior client approval;
- every job retry creates a new immutable attempt;
- every approval records exact preview/summary hash, actor, channel, time, expiry, and decision;
- client projection maps internal states through one shared resolver;
- no UI component writes status directly.

## 5. Database, auth, and tenant isolation

Implement migrations and typed repositories for at least:

- organizations;
- memberships;
- invitations;
- plans and organization quota overrides;
- customer projects and repository/deployment mappings;
- service requests;
- request messages;
- attachments and derivatives;
- request events;
- job attempts and leases;
- approval challenges and decisions;
- notification outbox/deliveries/inbound events;
- deployment evidence;
- usage ledger and aggregates;
- audit events.

Security requirements:

- public self-registration is disabled;
- invitation is customer-number, email, role, expiry, and nonce bound;
- store invitation/challenge secrets hashed, single-use, and expiring;
- OALab roles require MFA-ready policy;
- derive tenant scope from verified membership, never only a request body organization ID;
- enable and test RLS for every tenant-owned table and storage path;
- service-role access exists only in trusted server/worker environments;
- client APIs expose allowlisted response schemas and never raw rows;
- audit actors cannot update or delete audit history through application roles;
- secrets never enter database records, browser bundles, logs, prompts, fixtures, screenshots, or commits.

## 6. Media flow

Implement:

```text
uploaded -> quarantined -> scanning -> processing -> ready
                               |             |
                               v             v
                            rejected       failed
```

- Generate random versioned object keys; preserve original names as metadata.
- Upload browser-to-private-storage with short-lived authorization.
- Use resumable TUS uploads for large media and unstable connections.
- Do not overwrite object paths; create new immutable versions.
- Validate requested type, detected MIME, bytes, organization quota, attachment count, and ownership on server.
- Show per-file progress, pause/resume when supported, retry, remove, and recoverable conflict states.
- Malware-scan before AI/operator consumption.
- Produce bounded safe previews.
- Images: dimensions, checksum, safe thumbnail, optional OCR/vision result.
- Audio: duration, language, transcript, confidence metadata.
- Video: metadata, audio transcript, bounded representative frames, optional low-resolution preview.
- Mark AI analysis complete only when a compatible media capability was actually used.
- Treat OCR/transcript/vision content as untrusted data, never as system instruction.

Default configurable policy:

```text
12 attachments per message
25 MiB per image
50 MiB per document
100 MiB per audio file
500 MiB per video
```

## 7. AI and worker orchestration

Create a provider registry that declares:

- text chat;
- image understanding;
- video frame understanding;
- audio transcription;
- code execution/tool use;
- context/output limits;
- health, quota, and privacy metadata.

Never send image/video-dependent work to a text-only model. If no compatible provider is healthy, route to manual review with a clear internal blocker and calm client message.

Worker requirements:

- claim one eligible message through a bounded lease;
- refresh heartbeat and detect lost lease;
- receive only request-scoped context and short-lived credentials;
- operate in an isolated worktree/branch with validated repository root;
- allowlist commands, networks, repositories, deployment projects, and writable paths;
- record bounded structured progress and evidence;
- separate transient retryable failures from deterministic auth, policy, code, test, or configuration failures;
- exponential backoff with jitter and finite attempt budgets;
- cancellation is idempotent and terminates descendants within a deadline;
- a terminal failure returns the request to an operator-visible manual path, never a silent loop;
- automated dispatch is feature-flagged and disabled by default.

## 8. Notifications and approvals

Start with verified email plus one officially supported interactive provider. Keep WhatsApp, SMS, and Signal as capability-gated adapters. Do not claim Signal support until an approved provider path exists.

- organization chooses primary and optional fallback channel;
- messages contain minimal safe summary plus authenticated deep link;
- raw media, credentials, diff bodies, and internal logs never appear in notifications;
- verify webhooks using raw body/signature and bounded clock skew;
- deduplicate provider events;
- retry with jitter and ceiling, then dead-letter;
- never send fallback after a confirmed decision;
- `JA`/`NEIN` changes state only when verified sender and exactly one active challenge resolve;
- ambiguous responses ask for clarification and mutate nothing;
- approval links are signed, scoped, expiring, and idempotent.

## 9. Usage and abuse controls

Append metering events for:

- request submissions;
- messages;
- attachment bytes;
- media minutes;
- AI input/output tokens;
- worker minutes;
- preview builds;
- notification attempts;
- retries and failures.

Implement plan/override limits for requests, concurrency, storage, media, worker time, and spend. Rate-limit login, invite acceptance, upload authorization, request submission, message send, approval attempts, and admin starts separately by tenant/member/risk/IP dimensions. Show client-safe quota copy and exact reset time. Admin overrides require actor, reason, and expiry.

## 10. Visual implementation

Use the selected image series as the visual target and the ten screen contracts from the blueprint as the functional target.

Default recommendation is **Variant A — Nocturne Console** because it is closest to the supplied Synara direction. Keep theme values centralized so Variant B can be enabled without duplicating components.

Implement shared tokens for:

- canvas and surface depth;
- borders and dividers;
- foreground hierarchy;
- brand and semantic states;
- spacing and density;
- radii;
- typography;
- shadows;
- focus rings;
- disclosure motion.

Rules:

- responsive mobile-first client path;
- desktop-first internal operations path with tablet fallback;
- solid readable dialogs; do not use blur/transparency as the primary surface;
- no nested interactive controls;
- icon buttons have accessible names and tooltips;
- disabled controls explain why;
- one shared disclosure animation with reduced-motion fallback;
- stable panel dimensions with internal scroll where content changes;
- meaningful empty, loading, retry, offline, quota, upload-conflict, permission, and stale-version states;
- full keyboard navigation and visible focus;
- WCAG AA contrast and semantic HTML;
- user-generated text is safely rendered and never injected as HTML.

Implement these routes/states:

```text
01 client invitation access
02 client new request
03 client media review
04 client request received
05 client beta approval
06 client history
07 client notification preferences
08 OALab operations board
09 OALab job control detail
10 OALab release control
```

## 11. Vercel and hosting adapters

- Treat Local, Preview, and Production as distinct environments.
- Preview creation may use Git integration, CLI, deploy hook, or REST adapter selected per customer project.
- Protect previews. Never assume a generated preview URL is safe to expose publicly.
- Store only safe deployment metadata; provider tokens remain secret-store owned.
- Production adapter requires current release-manager command and reruns authorization immediately before mutation.
- Support staged/manual promotion where project policy requires it.
- Keep preview and production environment variables separate.
- Capture deployment ID, URL, commit, checks, actor, timestamps, and result.
- Provide rollback evidence/action, but never execute rollback without explicit authorized command.
- Follow the repository's OALab Git/Vercel account-switching and target-verification rules when they exist.

## 12. Logging and observability

Production logs are structured JSON without ANSI. Local development may render a compact, modern retro-console skin over the same events.

Human-facing examples:

```text
[SERVER · REQUEST] [SUBMIT] Client request accepted · REQ-1042 · 184 ms
[WORKER · LEASE] [CLAIM] Project task secured · attempt 2/4 · 37 ms
[MEDIA · VIDEO] [PROCESS] Transcript + 8 frames ready · 12.4 s
[NOTIFY · EMAIL] [DELIVERED] Client update sent · 421 ms
[RELEASE · PROD] [BLOCKED] Human approval required · no mutation made
```

Include source (`SERVER`, `CLIENT`, `WORKER`), domain, operation, safe entity ID, result, attempt, and duration. Use colors only in local pretty output, compact lines, bold/highlight sparingly, and no secrets or full customer content. Time queue wait, media processing, provider calls, builds, database queries, and deployments. Alert on lease loss, growing queue age, retry loops, dead letters, storage growth, provider health, and deployment failure.

## 13. Performance budgets

- client shell interactive at p75 within 2.5 seconds on a representative 4G profile, excluding user media downloads;
- no initial full-history fetch;
- cursor pagination for requests/messages/events;
- no N+1 card queries;
- direct media upload;
- ordinary chat uses simple rendering; virtualize only measured large collections;
- one active timer/listener/subscription owner and reliable cleanup;
- bounded log/event/media derivative sizes and retention;
- worker concurrency is configured, observable, and never unbounded;
- background jobs use leases, visibility timeouts, and backpressure;
- metric labels contain no user IDs, emails, message bodies, filenames, or request IDs.

Measure and report real values. Never invent passing performance.

## 14. Security review scope

Threat-model and test:

- tenant isolation and IDOR;
- invitation takeover;
- approval replay or forged inbound decisions;
- webhook forgery;
- malicious uploads and MIME confusion;
- prompt injection from attachments;
- SSRF;
- repository/worktree path escape;
- shell/argument injection;
- secret leakage;
- worker lease races;
- duplicate side effects;
- production deployment escalation;
- stored and reflected XSS;
- CSRF, origin, cookie, redirect, and CSP failures;
- log/metric PII leakage.

## 15. Planning and execution workflow

Before implementation, create exactly one master task file under the repository's normal task path. Do not create a competing plan if one exists.

Each phase must use:

```markdown
### ✅ Phase N — Name
**Goal:** Verifiable outcome.
* [x] Completed task with concrete result.
* [ ] Open task.
**Result:** One plain-language sentence.
**Architecture fit:** Ownership and data flow.
**References:** At most three main paths.
```

Under all phases add concise comments for maintained criteria and severity-sorted findings. Fix coupled findings in the same run. Create an optimization task only for real remaining findings.

Implement continuously through all phases:

### Phase 1 — Foundation and contracts

- workspace, package boundaries, config schema, local fixtures, design tokens, error model, correlation IDs;
- domain schemas and lifecycle transition tests;
- no production integrations yet.

### Phase 2 — Database, auth, RLS, and invitation flow

- migrations, repositories, admin invitations, client access, roles, tenant policies, audit, seed fixtures;
- cross-tenant denial tests are mandatory.

### Phase 3 — Client chat, history, voice, and media

- routes 01–07;
- safe composer, uploads, media pipeline, client projections, history pagination, offline/retry/stale states.

### Phase 4 — Internal operations and usage

- routes 08–09;
- Kanban projection, triage, request detail, internal notes, quota management, analytics, audit views.

### Phase 5 — Worker and AI/provider adapters

- durable queue, leases, manual dispatch, isolated execution, capability routing, retries, cancellation, evidence, dead letters;
- auto-dispatch remains off behind a feature flag.

### Phase 6 — Notifications and client approval

- outbox, email, one interactive provider, preferences, webhook verification, deep links, decisions, fallback, dead letters.

### Phase 7 — Preview and human production release

- protected preview adapter, client review, checks, release policy, explicit production command, evidence, rollback path.

### Phase 8 — Hardening and integrated acceptance

- accessibility, security, performance, failure drills, observability, retention, documentation, deployment/runbook;
- remove fixtures from production paths and keep safe demo mode explicit.

After each coherent phase, update the master task once and continue. Do not pause for permission between phases unless a real external secret, target, or destructive production decision is required.

## 16. Subagent permission and boundaries

This prompt explicitly permits specialized subagents when the current environment supports them.

Use them only for independent major areas with exclusive ownership, for example:

- database/RLS/security contracts;
- client UI and media experience;
- worker/provider orchestration;
- notifications/deployment adapters.

Do not let multiple agents edit the same modules, migrations, task IDs, or design tokens. Use isolated worktrees when parallel agents write. If isolation is unavailable or boundaries overlap, work sequentially. Main agent owns shared contracts, integration, task truth, and final verification. Do not create review-only agents when canonical checks and one integrated critic provide the same confidence.

## 17. Tests and verification

Add focused tests as part of this new product:

- domain transition and idempotency tests;
- invitation, role, and approval policy tests;
- cross-tenant RLS integration tests;
- queue lease/retry/cancel/dead-letter tests;
- notification webhook signature and duplicate-event tests;
- media type/size/quota/state tests;
- worker path/command/network allowlist tests;
- deployment authorization and stale-approval tests;
- key client/admin component interaction tests;
- representative Playwright journeys for client submit, approval, admin job start, failure recovery, and human release gate.

Use the repository's canonical format, lint, typecheck, unit/integration, build, migration, and E2E commands once per coherent cut. Do not repeatedly run heavyweight whole-workspace checks after micro-edits.

## 18. Bounded browser and visual acceptance permission

This prompt explicitly grants current permission to use the environment's existing browser, preview, screenshot, interaction, accessibility, network, and performance capabilities for the final integrated application.

- Build the coherent product first.
- Run static, structural, functional, security, and measured performance checks before visual review.
- Use the existing browser/preview capability; do not build a custom capture pipeline unless the repository already requires one.
- Use a representative desktop viewport plus one mobile client viewport.
- Inspect the ten required routes/states, but select only the strongest evidence needed for named questions.
- Compare the integrated app against the selected mockup direction for hierarchy, density, spacing, contrast, and workflow clarity.
- An independent critic returns exactly one strongest concrete gap with evidence, responsible owner, and exact acceptance condition.
- Make one coherent correction and rerun relevant bundled checks.
- Run another visual pass only after a material change or a genuinely new question.
- Never invent approval, a visual win, measured performance, provider success, or deployment success.
- If fair browser review cannot run, leave a precise manual user-acceptance gate.

## 19. Required deliverables

- working monorepo and lockfile;
- migrations, RLS policies, local seed/demo data, and migration instructions;
- client and internal UIs for all ten screen contracts;
- Netcup worker packaging and runbook;
- media, AI, notification, queue, and Vercel adapter contracts;
- safe environment example with no secrets;
- test suite and canonical verification commands;
- architecture, threat model, operations, incident, backup/restore, and deployment docs;
- final task file with every phase and acceptance criterion rechecked;
- final report with changed paths, verified commands/results, real remaining risks, and explicit manual gates.

## 20. Definition of done

Do not stop at a clickable mockup. Completion requires:

- client invitation, chat, media, history, progress, preview, and decision journeys work end to end;
- OALab triage, board, manual dispatch, job evidence, failure recovery, quota, notification, beta, and human release journeys work end to end;
- the same request truth drives every projection;
- tenant isolation, private media, audit, idempotency, retries, dead letters, quotas, and release authorization are verified;
- accessibility and performance budgets have measured evidence;
- no automatic production deploy exists;
- no secrets, invented accounts, fabricated provider claims, or unverified external mutations exist;
- all planned To-dos are re-read and actually satisfied before marking done.

Use the quality bar as a direction, not an excuse to copy another product. Ship the strongest coherent, maintainable, modular, reusable, performance-aware, edge-case-safe implementation the verified environment can support.

## Prompt ends here
---

## Current primary references used to keep integration assumptions honest

- Supabase Queues: <https://supabase.com/docs/guides/queues>
- Supabase Auth: <https://supabase.com/docs/guides/auth>
- Supabase Row Level Security: <https://supabase.com/docs/guides/database/postgres/row-level-security>
- Supabase resumable uploads: <https://supabase.com/docs/guides/storage/uploads/resumable-uploads>
- Vercel deployment environments and methods: <https://vercel.com/docs/deployments/overview>
- Vercel Deployment Protection: <https://vercel.com/docs/deployment-protection>
- Vercel manual promotion: <https://vercel.com/docs/deployments/promoting-a-deployment>
