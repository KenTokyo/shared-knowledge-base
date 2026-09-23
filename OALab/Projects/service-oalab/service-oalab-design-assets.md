# Service OALab — Design asset specification and generation record

## 1. Delivery contract

- **Use case:** `ui-mockup`
- **Asset type:** high-fidelity desktop web application screenshots
- **Mode:** built-in `image_gen` for all 20 selected PNGs
- **Format:** PNG
- **Target framing:** landscape 16:10, intended 1536 × 1024 px, no browser chrome or device frame
- **Series:** Variant A `Nocturne Console` and Variant B `Luminous Atelier`
- **Count:** ten selected images per series
- **Language:** German product UI
- **Reference Image 1:** `/Users/kentoky/Documents/React Projects/synara/assets/prod/readme-screenshot.jpeg`
- **Reference role:** structural and spacing reference only; never an edit target
- **Implementation recommendation:** Variant A, because it most directly answers the explicit Synara direction while keeping the client experience simpler than Synara.
- **Selection state:** Variant A is the implementation default unless the user explicitly selects Variant B.
- **Final asset location:** all selected images are stored below `assets/variant-a/` and `assets/variant-b/`; generator-account copies are not delivery dependencies.
- **Supporting source:** `assets/variant-b-renderer.html` is a deterministic implementation reference for B06–B10, not an additional selected image.

## 2. Shared constraints

- Create one single screen per image, not a collage, storyboard, phone frame, or browser window.
- Show a realistic shippable product UI, not concept art, marketing art, a wireframe, or a Dribbble presentation.
- Keep repeated navigation, spacing, typography, icons, status colors, and component geometry consistent within each series.
- Use the same ten screen contracts in both variants so comparison isolates visual direction.
- Preserve strict role separation: client screens 01–07 never show Kanban, code, branches, providers, tokens, raw logs, or production controls.
- Keep exact visible copy sparse and legible. Do not add lorem ipsum, fake paragraphs, random letters, watermarks, signatures, external logos, trademarks, or Synara branding.
- Use a small original abstract OALab service glyph only; no copied logo.
- Use solid readable popover/modal surfaces. Avoid glassmorphism as the primary surface.
- Use clean Lucide-like line icons without copying a proprietary icon or brand.
- Show meaningful status, upload, approval, failure, and release states without decorative clutter.

## 3. Variant A base prompt — Nocturne Console

Every final Variant A prompt is exactly this base prompt followed by one screen-specific addition from section 5.

```text
Use case: ui-mockup
Asset type: one high-fidelity desktop web application screenshot
Primary request: Create a production-ready German-language UI screen for “OALab Service”, a private client request and controlled software-delivery platform. Render one single 16:10 landscape screen intended for 1536 × 1024 pixels, full canvas, without browser chrome, a device frame, a presentation border, or surrounding mockup scene.
Input images: Image 1 is a structural and spacing reference only. Learn from its quiet full-canvas composition, compact navigation, fine dividers, restrained icons, and centered priority area. Do not copy its branding, logo, words, project names, exact controls, or source-specific coding-agent UI.
Style/medium: realistic shippable product UI, not concept art and not a wireframe. Nocturne Console direction: quiet, dark, technical, premium, confident, and highly legible.
Layout system: 248 px compact left navigation when the screen needs navigation; flexible main canvas; optional 320 px contextual right rail only on internal operations screens. Client screens use a calm centered content column around 760 px. Use fine 1 px separators and stable solid surfaces instead of stacks of floating cards.
Color palette: canvas #0A0C0E; primary surface #111419; elevated surface #171B21; border #262C34; primary text #F5F7F8; muted text #8D98A5; brand mint #63E6BE; secondary indigo #788BFF; warning amber #F4B860; danger coral #FF6B75. Keep semantic color localized to small dots, slim rims, status chips, and focused actions.
Typography: refined neutral grotesk sans similar in feeling to Geist or Inter, 12–14 px interface copy, 22–30 px titles, compact monospace only for request IDs and runtime evidence. Generous breathing room in client screens, controlled density in admin screens.
Materials/lighting: matte near-black surfaces, crisp borders, extremely subtle depth, no glossy 3D, no dramatic gradient background, no neon bloom. Blur may appear only behind a tiny floating overlay, never behind the main dialog or content.
Product identity: sparse original three-node OALab service glyph plus the exact wordmark “OALab Service”. Use simple line icons.
Constraints: render one coherent screen only; keep all important controls inside frame; preserve role separation; use exact German labels supplied by the screen addition; no public signup unless explicitly requested; no Kanban or developer internals on client screens 01–07; no watermark; no external logo; no trademark; no Synara name; no lorem ipsum; no random text; no illegible microcopy; no duplicated panels; no giant decorative illustration; no mobile frame.
```

## 4. Variant B base prompt — Luminous Atelier

The canonical final prompt for every Variant B asset is this base prompt followed by the matching screen-specific addition from section 5. B06–B10 additionally use the preceding selected Variant B screen as an image-generation style anchor; that anchor replaces the generic Image 1 reference role without changing the screen contract.

```text
Use case: ui-mockup
Asset type: one high-fidelity desktop web application screenshot
Primary request: Create a production-ready German-language UI screen for “OALab Service”, a private client request and controlled software-delivery platform. Render one single 16:10 landscape screen intended for 1536 × 1024 pixels, full canvas, without browser chrome, a device frame, a presentation border, or surrounding mockup scene.
Input images: Image 1 is a structural and spacing reference only. Learn from its quiet full-canvas composition, compact navigation, fine dividers, restrained icons, and centered priority area. Do not copy its dark palette, branding, logo, words, project names, exact controls, or source-specific coding-agent UI.
Style/medium: realistic shippable product UI, not concept art and not a wireframe. Luminous Atelier direction: warm, editorial, optimistic, premium, human, and highly legible.
Layout system: 260 px warm-neutral navigation rail when the screen needs navigation; crisp off-white work canvas; optional 320 px contextual right rail only on internal operations screens. Client screens use a calm centered content column around 800 px. Use a measured twelve-column grid, thin lines, generous whitespace, and only a few restrained rounded surfaces.
Color palette: canvas #F3F0E9; primary surface #FFFEFB; secondary surface #ECE7DE; border #D7D0C5; primary text #17191C; muted text #6C726F; brand cobalt #345BFF; secondary violet #735CFF; success jade #0C9A70; danger coral #DB6255. Use cobalt for focused actions and localized semantic color for state.
Typography: refined editorial grotesk sans, 12–14 px interface copy, 24–34 px headings, slightly stronger typographic hierarchy than Variant A, compact monospace only for request IDs and runtime evidence.
Materials/lighting: warm matte paper-like color without literal paper texture, crisp white working surfaces, thin charcoal-tinted lines, extremely subtle neutral shadows. No glassmorphism, no glossy 3D, no decorative gradient behind text.
Product identity: sparse original three-node OALab service glyph plus the exact wordmark “OALab Service”. Use simple line icons.
Constraints: render one coherent screen only; keep all important controls inside frame; preserve role separation; use exact German labels supplied by the screen addition; no public signup unless explicitly requested; no Kanban or developer internals on client screens 01–07; no watermark; no external logo; no trademark; no Synara name; no lorem ipsum; no random text; no illegible microcopy; no duplicated panels; no giant decorative illustration; no mobile frame.
```

## 5. Screen-specific prompt additions

### 01 — Invitation access

```text
Screen: 01 client invitation access.
Composition: a calm access screen with a narrow brand/header line, a restrained service promise in the left half, and one solid sign-in panel aligned near the center-right. The panel must feel integrated into the canvas rather than floating in a marketing scene. Include a tiny secure-invitation status line and a subtle support link.
Text (verbatim, no extra copy): “OALab Service”, “Willkommen zurück”, “Nur für eingeladene Kunden”, “E-Mail”, “Passwort”, “Anmelden”, “Zugang aktivieren”, “Hilfe beim Zugang”.
State: invitation-only returning client; no public registration button, no social-login wall, no Kanban, no admin navigation.
```

### 02 — New request chat

```text
Screen: 02 client new request.
Composition: compact client navigation with “Neue Anfrage” active and “Verlauf” below it; main canvas has a quiet centered hero and one large two-row composer. Composer includes attachment, image/video, microphone, and send controls plus a small privacy hint. Keep the empty state useful and uncluttered.
Text (verbatim, no extra copy): “OALab Service”, “Neue Anfrage”, “Verlauf”, “Was sollen wir für dich verbessern?”, “Beschreibe dein Problem oder deine Idee …”, “Anfrage senden”, “Dateien bleiben geschützt”.
State: authenticated client, no existing draft, send action ready.
```

### 03 — Media and voice review

```text
Screen: 03 client media review before submission.
Composition: same client navigation and composer family as screen 02. Show an editable voice transcript in the main composer, one screenshot preview, one video preview with duration, and one small document chip. Each attachment has a clear upload state; one file is complete and one is at 72 percent with a thin progress line. Add a concise request-summary block immediately above the submit action, not a separate dashboard.
Text (verbatim, no extra copy): “Neue Anfrage”, “Entwurf”, “Sprachnachricht bearbeitet”, “Screenshot.png”, “Ablauf.mp4”, “72 %”, “Zusammenfassung”, “Kontaktformular auf Mobilgeräten korrigieren”, “Jetzt senden”.
State: upload in progress but usable; show retry/remove icon affordances without destructive visual noise.
```

### 04 — Request received

```text
Screen: 04 client request received.
Composition: client chat thread with the submitted user message and compact attachment chips, followed by one calm OALab response. Place a horizontal four-step progress tracker inside the conversation area, not as an admin dashboard. Highlight only the first step. Include request ID in small monospace and a notification-channel confirmation.
Text (verbatim, no extra copy): “Anfrage #OA-1042”, “Eingegangen”, “In Bearbeitung”, “Deine Freigabe”, “Live”, “Wir haben deine Anfrage erhalten.”, “Updates senden wir per E-Mail.”, “Weitere Nachricht schreiben …”.
State: accepted and queued; do not show a fake delivery date or worker details.
```

### 05 — Client beta approval

```text
Screen: 05 client beta approval in an active chat.
Composition: client conversation with a highlighted OALab update and a large protected beta-preview card. The card contains a clean browser-preview thumbnail, three short change bullets represented as compact rows, an approval-expiry line, and two unmistakable actions. Keep the primary approval action visible without scrolling.
Text (verbatim, no extra copy): “Deine Freigabe”, “Vorschau ist bereit”, “Mobile Navigation korrigiert”, “Formular geprüft”, “Darstellung optimiert”, “Vorschau öffnen”, “Ja, passt”, “Änderung nötig”, “Antwort auch per WhatsApp möglich”.
State: protected beta ready; no production deployment control and no raw code diff.
```

### 06 — Client history

```text
Screen: 06 client request history.
Composition: client navigation with “Verlauf” active. Main area is a clean two-pane history: searchable chronological request list on the left and a selected conversation preview on the right. Use simple status pills, last-update time, one unread dot, and a clear “Neue Anfrage” action. This is explicitly not Kanban.
Text (verbatim, no extra copy): “Verlauf”, “Neue Anfrage”, “Anfragen durchsuchen”, “Alle”, “In Bearbeitung”, “Deine Freigabe”, “Live”, “Kontaktformular mobil”, “Startseite aktualisieren”, “Logo austauschen”, “Zuletzt aktualisiert”.
State: six realistic history rows with varied simple statuses; selected request preview visible.
```

### 07 — Notification preferences

```text
Screen: 07 client notification preferences.
Composition: settings page or large solid modal over the client shell. Show four channel rows with icon, verification/capability state, primary/fallback selection, and one compact test action. Include quiet hours below. Signal must appear as unavailable and honest, not as working. Keep the main save action clear.
Text (verbatim, no extra copy): “Benachrichtigungen”, “Primärer Kanal”, “Fallback”, “E-Mail”, “WhatsApp”, “SMS”, “Signal”, “Verifiziert”, “Noch nicht verfügbar”, “Test senden”, “Ruhezeiten”, “Einstellungen speichern”.
State: email verified and primary; WhatsApp verified and fallback; SMS inactive; Signal unavailable.
```

### 08 — Internal operations board

```text
Screen: 08 OALab internal operations board.
Composition: compact internal left navigation, top health strip, and a dense but calm Kanban board with exactly four visible columns: Eingang, Geplant, In Arbeit, Freigabe. Cards show client, project, concise title, request ID, media badge, age, risk dot, and quota/approval indicator. Top strip shows queue age, active workers, failures, and storage trend. Avoid colorful sticky-note aesthetics.
Text (verbatim, no extra copy): “Operations”, “Anfragen”, “Kunden”, “Analytics”, “Eingang”, “Geplant”, “In Arbeit”, “Freigabe”, “Worker 3/4”, “Fehler 2”, “Queue 4 Min.”, “Filter”.
State: internal OALab operator; one failed/retry card and one waiting-for-client card are visibly distinct.
```

### 09 — Internal job control

```text
Screen: 09 OALab internal request and job control.
Composition: three-column operational detail. Left is compact client conversation and attachments; center is an execution timeline with triage, media analysis, job lease, checks, and preview build; right is a solid context rail with customer/project, quota, current attempt, worker health, and bounded actions. Show one prior failed attempt collapsed and current attempt healthy. Make internal versus client-visible notes visually explicit.
Text (verbatim, no extra copy): “Anfrage #OA-1042”, “Kundensicht”, “Interne Notiz”, “Ausführung”, “Medienanalyse bereit”, “Versuch 2 von 4”, “Worker verbunden”, “Checks 8/8”, “Beta erstellen”, “Neu versuchen”, “Abbrechen”.
State: current run passed checks and is ready for beta; no production action here.
```

### 10 — Internal release control

```text
Screen: 10 OALab human production release gate.
Composition: focused release-control page with protected preview summary on the left, a central checklist and evidence timeline, and a solid right confirmation panel. Show current commit/evidence in small monospace, client approval with channel and time, risk summary, checks, environment distinction, recent usage snapshot, and a clearly human-only production action. Include rollback readiness but no automatic trigger.
Text (verbatim, no extra copy): “Release Control”, “Beta geprüft”, “Kundenfreigabe erhalten”, “Checks 8/8”, “Risiko: Niedrig”, “Produktion”, “Nur durch OALab”, “Projektname bestätigen”, “Jetzt veröffentlichen”, “Rollback vorbereitet”, “Nutzung dieses Auftrags”.
State: all gates pass, typed confirmation field is still empty, production button remains disabled with a visible reason.
```

## 6. Final file manifest

All files are selected project-bound RGB PNGs at 1536 × 1024 px. Purpose and composition are owned by the matching screen contract in section 5; materials, lighting, constraints, and final prompt construction are owned by the selected variant base in sections 3–4 plus that screen contract.

| ID and purpose | Variant A path | Variant B path | B generation reference | Selection |
|---|---|---|---|---|
| 01 · invitation access | `assets/variant-a/01-access.png` | `assets/variant-b/01-access.png` | Synara structural reference | both retained |
| 02 · new request | `assets/variant-a/02-new-request.png` | `assets/variant-b/02-new-request.png` | Synara structural reference | both retained |
| 03 · media review | `assets/variant-a/03-media-review.png` | `assets/variant-b/03-media-review.png` | Synara structural reference | both retained |
| 04 · request received | `assets/variant-a/04-request-received.png` | `assets/variant-b/04-request-received.png` | Synara structural reference | both retained |
| 05 · client beta approval | `assets/variant-a/05-client-beta-approval.png` | `assets/variant-b/05-client-beta-approval.png` | Synara structural reference | both retained |
| 06 · client history | `assets/variant-a/06-client-history.png` | `assets/variant-b/06-client-history.png` | B05 style anchor | both retained |
| 07 · notification preferences | `assets/variant-a/07-notification-preferences.png` | `assets/variant-b/07-notification-preferences.png` | B06 style anchor | both retained |
| 08 · internal operations board | `assets/variant-a/08-internal-operations-board.png` | `assets/variant-b/08-internal-operations-board.png` | B07 style anchor | both retained |
| 09 · internal job control | `assets/variant-a/09-internal-job-control.png` | `assets/variant-b/09-internal-job-control.png` | B08 style anchor | both retained |
| 10 · internal release control | `assets/variant-a/10-internal-release-control.png` | `assets/variant-b/10-internal-release-control.png` | B09 style anchor | both retained |

### Reproduction and source record

- **Final prompts:** Variant A base from section 3 + matching section 5 addition; Variant B base from section 4 + matching section 5 addition.
- **Reference sources:** Synara screenshot from section 1 is structure/spacing only; B06–B10 use the manifest's preceding selected B screen only for series consistency.
- **Composition:** exact role, state, zones, actions, and visible-copy contract per section 5; one full-canvas 16:10 desktop screen per file.
- **Materials and lighting:** matte solid surfaces, fine separators, restrained depth, no primary glass surface; exact dark or light palette per variant base.
- **Constraints:** role separation, sparse German copy, original OALab glyph, no external branding, watermark, Kanban on client screens, raw developer internals, or automatic production release.
- **Selection:** both complete directions retained for comparison; Variant A remains implementation recommendation.
- **Supporting renderer:** `assets/variant-b-renderer.html` captures reusable Luminous Atelier tokens and deterministic B06–B10 layout ideas; it is a fallback/reference source, not a selected PNG source.

## 7. Validation checklist

- [x] Exactly 20 final PNGs exist inside the project.
- [x] Every file is a single desktop screen and matches its role/state contract.
- [x] Variant A is internally consistent across all ten screens.
- [x] Variant B is internally consistent across all ten screens.
- [x] Client screens contain no internal operations or developer controls.
- [x] Admin screens retain request/client/project identity and human release control.
- [x] Critical German labels are recognizable and there is no watermark or external branding.
- [x] All 20 files were decoded and recorded as 1536 × 1024 RGB PNGs.
- [x] No final asset is left only under the generator account directory.

**Audit result (2026-08-10):** one bounded visual pass across all 20 selected screens and one file-level format/dimension pass found no material failure requiring regeneration. A temporary `401 token_revoked` response caused no delivery gap; the final selected B06–B10 files are complete `image_gen` outputs. Domain hostname is intentionally absent from the mockups and remains configurable in the blueprint and implementation prompt.
