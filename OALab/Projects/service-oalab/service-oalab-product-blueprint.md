# Service OALab — Product, UX, and system blueprint

## 1. Product statement

Service OALab is a private client-request platform that turns plain-language change requests, voice notes, screenshots, images, and videos into controlled software-delivery work.

The product has two deliberately different experiences over one shared request record:

- **Client workspace:** a familiar chat, history, simple progress, previews, and one-tap approvals.
- **OALab operations:** triage, Kanban, automation, execution evidence, customer communication, usage control, beta delivery, and human production release.

The client must never need to understand branches, agents, queues, Kanban, tokens, deployments, or provider failures.

## 2. Source synthesis

### Written source

- Target is a new service surface under an OALab-owned subdomain.
- Current raw note spells the candidate host as `service.olap.de`; project naming and audio suggest `service.oalab.de`. Treat the hostname as configuration until DNS ownership is verified.
- Current deliverable is a build prompt plus design mockups, not application implementation.
- The client describes a problem or feature, optionally by browser speech input, and attaches images.
- Chat and ticket behavior should work together rather than compete as separate products.
- Netcup is available for hosting or a continuously running VM.
- Direct implementation in customer projects and Vercel delivery are desired future capabilities.

### WhatsApp audio findings

| Source | Duration | Normalized product findings |
|---|---:|---|
| `20.53.54.opus` | 01:26 | Client should have chat plus history; internal team can use Kanban. Synara is a structural reference. Repeated transcript tail is an ASR artifact and carries no requirement. |
| `20.57.34.opus` | 03:08 | Requests first arrive in an OALab-controlled queue. Admin can pull/start work. Images are core inputs. Cheap chat AI cannot be assumed to understand images. |
| `21.01.35.opus` | 04:00 | A Netcup VM can run coding agents continuously. Admin must inspect all actions. Failures return to a manual ticket. Add retries, abuse protection, rate limits, analytics, Supabase, and a clean fallback architecture. |
| `21.14.05.opus` | 00:21 | Clarification-only recording; no new product behavior. |
| `21.22.16.opus` | 02:52 | Accounts are invitation-only and linked to an internal customer number. Track usage per customer. Client UI is chat plus history. Every operational step is communicated through a selectable channel. Clients answer with simple approvals. Humans alone approve production deployment. |
| `21.26.03.opus` | 00:37 | MVP pillars are functional client UI, functional internal UI, media-capable data layer, reliable AI engine, and integrated response-management agent. |

### Synara reference findings

Use Synara only as a structural and craft reference:

- quiet full-canvas surfaces;
- compact navigation and restrained icons;
- fine separators instead of nested card walls;
- centered, high-priority composer;
- consistent shared surface and disclosure tokens;
- role-appropriate density;
- status communicated through small semantic accents.

Do not copy Synara branding, source code, logo, product-specific labels, or coding-agent controls into the client UI.

## 3. Product decisions

### 3.1 Separate application, not a Node-RED core

Build a separate application. Node-RED may later consume signed webhooks or power a non-critical integration adapter, but it must not own authentication, authorization, request state, audit truth, approvals, or deployment gates.

Reason: tenant isolation, row-level security, durable job processing, media policies, immutable audit history, rate limiting, and production release controls need testable application code and one transactional data model.

### 3.2 One request, many projections

`service_request` is the stable owner. The following are append-only records or projections attached to it:

- chat messages;
- media attachments;
- status changes;
- internal notes;
- AI triage proposals;
- job attempts;
- tool and repository evidence;
- preview deployments;
- approval challenges and decisions;
- outbound/inbound notifications;
- production deployments;
- metering events;
- security/audit events.

Client chat, client history, internal Kanban, admin detail, notifications, and analytics read projections of the same request. No screen owns a competing status.

### 3.3 Manual-first automation

- **MVP default:** a verified OALab operator presses `Arbeit starten` for a queued request.
- **Automation-ready:** a feature flag may let an eligible request start automatically on the Netcup worker.
- **Safety:** production deployment always requires a fresh human OALab approval. A client approval can authorize beta continuation but never production release.

### 3.4 Capability-based AI routing

The system selects providers by declared capability, not by brand assumptions:

- text conversation;
- image understanding;
- video frame understanding;
- audio transcription;
- code execution;
- tool use;
- context and output limits;
- regional/privacy policy;
- health and current quota.

A text-only provider must never receive a request that depends on unseen image or video content. Unsupported media routes to a compatible analysis provider or to manual review.

## 4. Actors and permissions

| Actor | Allowed | Never allowed |
|---|---|---|
| Client member | Create request, send messages/media, view own organization history, inspect preview, approve/reject client gates, choose notification channel | See internal notes, provider details, tokens/costs, other customers, repository secrets, raw tool logs, Kanban, or production deploy controls |
| Client owner | Client member permissions plus manage own team notification preferences and view organization usage summary | Create arbitrary customer organizations or bypass quotas |
| OALab operator | Triage, communicate, start/retry/cancel jobs, inspect evidence, request client approval, manage beta preview | Production deploy without release permission |
| OALab release manager | Operator permissions plus approve and execute production deployment | Remove audit records or bypass required checks |
| OALab admin | Manage invitations, customer numbers, plans, quotas, project/repository mappings, provider configuration metadata | Read raw provider secrets through the browser UI |
| Worker service | Claim eligible jobs, access request-scoped project credentials, create isolated worktree/branch, run allowlisted actions, publish bounded evidence | Browse unrelated repositories, reuse credentials across tenants, deploy production, or modify customer/account policy |

## 5. Invitation and authentication model

- Public self-registration does not exist.
- OALab creates a customer organization with a stable internal `customer_number`.
- OALab creates a one-time invitation tied to customer number, email, role, expiry, and invitation nonce.
- Invitation acceptance verifies email ownership and activates membership.
- Invitation tokens are hashed at rest, single-use, expiring, and invalidated after success.
- Optional MFA is required for OALab roles and configurable for clients.
- Every server query derives organization scope from the authenticated membership; organization IDs from client payloads are never trusted alone.
- Database row-level security and server authorization both enforce tenant isolation.
- Suspended organizations can read exportable history but cannot submit or approve new work unless policy says otherwise.

## 6. Request lifecycle

### Internal canonical states

```text
draft
  -> submitted
  -> triage_needed
  -> queued
  -> running
  -> awaiting_client
  -> approved_for_beta
  -> beta_deploying
  -> beta_ready
  -> release_review
  -> production_deploying
  -> released
```

Terminal or recovery states:

```text
rejected | cancelled | blocked | failed | superseded | archived
```

### Client-facing projection

| Internal states | Client label | Meaning |
|---|---|---|
| `submitted`, `triage_needed`, `queued` | `Eingegangen` | OALab has the request. |
| `running`, `approved_for_beta`, `beta_deploying` | `In Bearbeitung` | Work is active or a preview is being prepared. |
| `awaiting_client`, `beta_ready`, `release_review` | `Deine Freigabe` or `Prüfung` | A client decision or OALab review is needed. |
| `production_deploying`, `released` | `Wird veröffentlicht` or `Live` | Human-approved production delivery is active or complete. |
| `blocked`, `failed` | `Wir kümmern uns` | OALab needs manual attention; raw failure details remain internal. |

### Transition rules

- Every mutation includes expected request version; stale writes fail with a recoverable conflict.
- Transition handler is the only write owner for status.
- Commands are idempotent through a unique idempotency key.
- Client approval records what was approved: preview ID, summary hash, actor, channel, time, and decision.
- A new material code change invalidates the previous client approval.
- Production release requires current checks, current preview evidence, client approval when configured, and a release-manager action.
- Failure never silently returns to `queued`; retry creates a new attempt and preserves the failed one.

## 7. Core user journeys

### 7.1 Client creates a request

1. Client opens chat and describes the desired change.
2. Client may record speech; browser speech is treated as editable draft text, never as an auto-submitted command.
3. Client attaches screenshots, images, documents, or videos.
4. UI validates size/type, displays upload progress, supports retry, and warns before removing an attachment.
5. Client reviews a concise request summary and submits.
6. Backend creates request, first message, attachment records, metering events, and `submitted` audit event transactionally.
7. Client sees `Eingegangen` plus expected next action, not an invented delivery promise.

### 7.2 OALab triages and starts work

1. New request appears in internal inbox/Kanban.
2. AI proposes title, category, acceptance criteria, risk, required capabilities, and affected customer project.
3. Operator confirms project mapping and adjusts proposal.
4. Rate/quota, repository, worker health, and required media capabilities are checked.
5. Operator presses `Arbeit starten`, or eligible auto-start policy does so.
6. Worker claims the job with a lease and creates an isolated branch/worktree.

### 7.3 Worker executes safely

1. Worker receives only request-scoped context and short-lived credentials.
2. Worker records heartbeats and bounded structured progress.
3. Long logs remain internal and are stored with size/retention limits.
4. Retry policy distinguishes transient infrastructure failures from deterministic code, auth, policy, or test failures.
5. After checks pass, worker creates or updates a beta preview and attaches evidence.
6. On terminal failure, request moves to `failed`; operator sees exact cause and recovery actions, while client sees a calm manual-review message.

### 7.4 Client reviews

1. Client receives a message through the selected verified channel.
2. Client opens the signed, expiring approval page or uses provider-supported action buttons.
3. Preview shows changed areas, plain-language summary, known limits, and `Ja, passt` / `Änderung nötig`.
4. Approval is idempotent. Duplicate channel callbacks return the existing result.
5. Rejection returns to `triage_needed` with the client note.

### 7.5 OALab releases

1. Release manager sees current preview, client decision, checks, diff summary, and risk.
2. Main deployment action requires native confirmation and typed project name for high-risk releases.
3. Deployment status streams to the internal detail view.
4. Success creates `released`, customer notification, deployment evidence, and customer-notes suggestion.
5. Failed deployment preserves previous production state and exposes rollback/runbook actions.

## 8. Notification and response management

### Channel adapters

- Start with verified email plus one officially supported interactive messaging provider.
- Keep WhatsApp, SMS, and Signal behind adapter capabilities and feature flags.
- Never imply Signal support without an approved, supportable integration route.
- Each organization selects a primary channel and optional fallback.
- Sensitive details and raw media are never embedded in messages; send a short summary plus authenticated deep link.

### Approval protocol

- One approval challenge owns request ID, preview ID, decision type, expiration, allowed actors, and nonce hash.
- Links are single-use where appropriate and always expire.
- `JA` / `NEIN` inbound text is accepted only when the sender and active challenge resolve unambiguously.
- Ambiguous replies receive a safe clarification and change no state.
- Provider retries and duplicate webhooks are deduplicated by provider event ID.
- Outbound attempts use exponential backoff with jitter, a retry ceiling, and dead-letter review.
- Channel fallback never sends twice after a confirmed delivery/decision.

## 9. Media pipeline

### Upload

- Browser uploads directly to private object storage through short-lived signed upload authorization.
- Use resumable upload for large video files.
- Store original filename separately from the generated object key.
- Validate extension, detected MIME type, byte size, organization quota, and per-request attachment count.
- Keep objects private; every view/download uses short-lived signed access.

### Processing

```text
uploaded -> quarantined -> scanning -> processing -> ready
                               |             |
                               v             v
                            rejected       failed
```

- Malware scanning runs before AI or operator consumption.
- Images receive metadata, safe preview, and optional OCR/vision analysis.
- Audio receives duration plus transcript with language/confidence metadata.
- Video receives metadata, transcript when audio exists, bounded representative frames, and optional low-resolution preview.
- Original file remains immutable; derivatives are separate objects.
- AI analysis records provider/model, source object version, result version, and failure reason.
- A provider without the required media capability cannot mark processing complete.

### Default configurable limits

- 12 attachments per message.
- Images up to 25 MiB each.
- Documents up to 50 MiB each.
- Audio up to 100 MiB each.
- Video up to 500 MiB each.
- Limits are plan configuration, enforced client-side for feedback and server-side for truth.

## 10. Usage, pricing, and abuse controls

- Meter per organization and request: submitted requests, messages, attachment bytes, media minutes, AI input/output tokens, worker minutes, preview builds, notification sends, and retries.
- Keep billable ledger append-only; dashboards read daily/monthly aggregates.
- Support plan limits for request count, concurrent active requests, storage, media minutes, worker minutes, and monthly spend.
- Rate-limit login, invitation acceptance, request creation, message send, upload authorization, approval attempts, and admin job starts independently.
- Rate keys include organization, member, IP risk bucket, and endpoint; never rely on IP alone.
- Show clients understandable quota copy and reset time. Never reveal raw internal provider cost unless product policy allows it.
- Admin override requires reason, actor, expiry, and audit event.
- Detect burst behavior, repeated failed uploads, duplicate request spam, and approval-token probing.

## 11. System architecture

### Deployable units

```text
Browser
  -> Web application / API boundary
      -> PostgreSQL + row-level security
      -> Private object storage
      -> Durable request/job queue
      -> Notification outbox

Netcup worker service
  -> Claims leased jobs
  -> Media processors
  -> AI/provider adapters
  -> Repository/worktree executor
  -> Preview deployment adapter

OALab release manager
  -> Human production gate
  -> Vercel/hosting deployment adapter
```

### Recommended repository shape

```text
apps/
  web/                 # client and admin web application
  worker/              # Netcup queue worker and job orchestration
packages/
  contracts/           # schemas, enums, event payloads; no runtime I/O
  domain/              # request lifecycle, approval and quota policies
  database/            # migrations, RLS policies, repositories
  media/               # media contracts and processing orchestration
  ai/                  # capability registry and provider adapters
  notifications/       # channel adapters, templates, webhook verification
  deployments/         # preview/release adapters and evidence contracts
  observability/       # structured events, metrics, correlation helpers
```

### Ownership rules

- Domain commands validate transitions; repositories persist; UI never writes tables directly.
- Finder/query modules read projections; action modules mutate through domain commands.
- Provider adapters translate protocols but do not decide product status.
- Outbox owns external side effects after database commit.
- Worker leases have heartbeat, expiry, attempt number, and cancellation token.
- Secrets live in deployment secret stores, never database rows, browser state, logs, prompts, or commits.
- Customer repository mapping is allowlisted and admin-owned.

## 12. Minimal data model

| Entity | Key fields |
|---|---|
| `organizations` | `id`, `customer_number`, `name`, `status`, `plan_id` |
| `memberships` | `user_id`, `organization_id`, `role`, `status` |
| `invitations` | customer, email, role, token hash, expiry, accepted time |
| `service_requests` | tenant, project mapping, canonical state, version, priority, created by |
| `request_messages` | request, sender type, body, visibility, reply relation |
| `attachments` | request/message, private object key, media type, processing state, hash, size |
| `request_events` | request, monotonic sequence, type, actor, payload, occurred time |
| `job_attempts` | request, capability, worker, lease, state, attempt, heartbeat, error code |
| `approvals` | request, preview, challenge hash, channel, decision, actor, expiry |
| `notification_deliveries` | request, channel, provider event ID, state, attempt, error |
| `deployment_evidence` | request, environment, provider, URL, commit, checks, actor |
| `usage_events` | tenant, request, dimension, quantity, unit, source, idempotency key |
| `audit_events` | tenant, actor, action, target, result, request correlation, safe metadata |

Use UUID/ULID identifiers, database constraints, immutable event identifiers, UTC timestamps, and explicit retention classes. No customer PII or message body belongs in metric labels.

## 13. Screen contract shared by both design variants

All screens are 16:10 desktop product mockups at a consistent viewport. Client screens use low density; internal screens may use higher density.

| ID | Role and state | Required visible content |
|---|---|---|
| `01-access` | Client invitation sign-in | OALab Service mark, email, password/passkey route, invitation/customer-number reassurance, support link, no public signup |
| `02-new-request` | Client empty chat | calm hero, single large composer, voice, image/video/file attachment, `Anfrage senden`, short privacy hint, history navigation |
| `03-media-review` | Client composing with media | editable transcribed text, screenshot and video chips/previews, per-file upload status, retry/remove controls, request summary, submit action |
| `04-request-received` | Client after submission | assistant acknowledgment, simple four-step progress, request ID, current state `Eingegangen`, notification promise without fake ETA |
| `05-client-approval` | Client active conversation | update summary, beta preview card, before/after evidence, `Ja, passt` and `Änderung nötig`, approval expiry and selected channel |
| `06-history` | Client history | searchable chronological conversations, simple status pills, last update, unread marker, one selected thread preview, no Kanban |
| `07-notifications` | Client preferences modal/page | email/WhatsApp/SMS/Signal capability rows, verified state, primary/fallback choice, quiet hours, test action, privacy copy |
| `08-operations-board` | OALab internal overview | Kanban columns, filters, quota/worker health strip, compact request cards, client and project identity, retry/approval indicators |
| `09-job-control` | OALab internal request detail | client conversation, internal execution timeline, media analysis, worker lease/attempt, logs/evidence, retry/cancel, beta preview action |
| `10-release-control` | OALab internal release gate | current preview, checks, client approval evidence, risk summary, human production confirmation, deployment timeline, usage snapshot |

## 14. Visual direction A — Nocturne Console

### Character

Quiet, dark, technical, and premium. Inspired by Synara's restraint and spacing, but shaped for a client service product rather than a coding-agent console.

### Tokens

| Token | Value |
|---|---|
| Canvas | `#0A0C0E` |
| Primary surface | `#111419` |
| Elevated surface | `#171B21` |
| Border | `#262C34` |
| Primary text | `#F5F7F8` |
| Muted text | `#8D98A5` |
| Brand mint | `#63E6BE` |
| Secondary indigo | `#788BFF` |
| Warning amber | `#F4B860` |
| Danger coral | `#FF6B75` |

### Composition

- 248 px quiet left rail, flexible main canvas, optional 320 px contextual right rail on internal screens.
- Fine 1 px separators and solid surfaces; blur only for tiny floating overlays.
- Client chat column max width around 760 px.
- 12–14 px UI copy, 22–30 px hero/title copy, compact monospace only for IDs and runtime evidence.
- Status color is localized to dots, slim rims, and action focus—not broad tinted cards.

## 15. Visual direction B — Luminous Atelier

### Character

Warm, editorial, optimistic, and premium. It keeps the same interaction model while making customer service feel more human and less like a developer tool.

### Tokens

| Token | Value |
|---|---|
| Canvas | `#F3F0E9` |
| Primary surface | `#FFFEFB` |
| Secondary surface | `#ECE7DE` |
| Border | `#D7D0C5` |
| Primary text | `#17191C` |
| Muted text | `#6C726F` |
| Brand cobalt | `#345BFF` |
| Secondary violet | `#735CFF` |
| Success jade | `#0C9A70` |
| Danger coral | `#DB6255` |

### Composition

- 260 px warm neutral navigation rail with a crisp white work canvas.
- Larger editorial headings, restrained rounded rectangles, thin charcoal lines, and small cobalt actions.
- Subtle paper-like warmth without fake physical textures or decorative gradients behind text.
- Client content max width around 800 px; internal tables and boards use a measured 12-column grid.
- Solid modal surfaces and direct focus states keep accessibility stronger than atmospheric transparency.

## 16. Responsive behavior

- At 1024–1279 px, internal right rail becomes a drawer; board keeps horizontal scroll with sticky column headers.
- Below 1024 px, navigation collapses to icon rail; client chat remains primary.
- Below 768 px, client experience becomes single-column with bottom composer and native-sized actions.
- Client approval actions remain visible without scrolling past the preview summary.
- Media review stacks previews and upload state; video never autoplays.
- Admin board is usable on tablet but desktop is the operational target.
- Respect reduced motion; open/close motion uses one shared disclosure contract.

## 17. Reliability and performance budgets

- Initial client shell should become interactive within 2.5 seconds at p75 on a typical 4G profile, excluding user media downloads.
- No full-history fetch on initial load; paginate conversations and messages with stable cursors.
- Direct-to-storage upload avoids proxying large media through the web runtime.
- UI virtualizes only proven large lists; ordinary chats use the simpler render path.
- Maximum one active save/upload retry timer per entity; cleanup on unmount or cancellation.
- Queue claims and outbound effects are bounded, leased, idempotent, and observable.
- Database queries avoid N+1 request-card loading; use aggregate projections.
- Logs, tool output, thumbnails, transcripts, and event payloads have explicit size and retention limits.
- Health dashboards show queue age, active leases, failure rate, notification dead letters, storage growth, and provider health without high-cardinality labels.

## 18. Security and privacy gates

- Threat-model tenant isolation, invitation takeover, IDOR, approval replay, webhook forgery, upload malware, prompt injection in attachments, repository escape, secret exfiltration, worker command injection, SSRF, and deployment escalation.
- Sanitize rendered Markdown/HTML and never execute uploaded content.
- Worker network and filesystem access are allowlisted per job.
- AI-retrieved attachment text is untrusted data, never system instruction.
- Verify webhook signatures against raw request bodies and tolerate bounded clock skew.
- CSP, secure cookies, CSRF policy, origin validation, and strict redirect allowlists are release gates.
- Audit records are append-only for application actors; retention/export/delete policy follows the applicable contract and law.
- Logs redact tokens, cookies, email addresses where unnecessary, full message bodies, signed URLs, and repository credentials.

## 19. Out of scope for the first implementation

- Public marketplace or public signup.
- Client-visible Kanban.
- Fully autonomous production deployment.
- Arbitrary shell access from the browser.
- Unlimited provider switching exposed to clients.
- Native mobile apps.
- Billing collection; usage ledger and plan enforcement come first.
- Guaranteed Signal support without a supported provider path.
- Invented delivery-time estimates.

## 20. Definition of done

- Client can accept an invitation, sign in, submit text/voice/media requests, follow history, inspect beta, and approve or request changes.
- OALab can manage customers, triage in Kanban, start/retry/cancel bounded jobs, inspect full evidence, communicate through adapters, and execute a human-gated production release.
- Tenant isolation, invitation restrictions, private media, append-only audit, quotas, idempotency, retries, dead-letter handling, and observability are implemented and tested.
- Exact same request truth drives chat, history, board, notifications, approvals, and release control.
- Responsive and accessibility checks pass; browser review covers representative integrated states only.
- No credentials, DNS mutations, customer repositories, Vercel projects, or production environments are touched until explicitly configured and authorized.
