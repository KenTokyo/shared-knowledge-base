# LLM Arena — Boxer animation follow-up prompts (V7–V13)

Seven standalone one-shot prompts for comparing more realistic boxer animation pipelines. Motion quality has priority over spectacle. Keep character, choreography, stage, camera, controls, and VFX scope equivalent so the animation method remains the main variable.

## Aufgabenstatus

- [x] Phase 1 — Bewertungen aus `shared/Notes/ANIMATION.md` und V1–V6 auswerten
- [x] Phase 2 — neue, für alle Varianten identische Skillpalette festlegen
- [x] Phase 3 — sieben eigenständige Follow-up-Prompts V7–V13 formulieren
- [x] Phase 4 — Vergleichbarkeit, technische Abgrenzung und verbotene alte Skills prüfen

## Analyse der bisherigen Ergebnisse

- **V4, Retargeted Motion Capture — 7/10:** Die beste Grundlage. Aufgenommene Ganzkörperbewegung liefert bereits glaubwürdige Gewichtsverlagerung, Rhythmus, Hüftarbeit und natürliche Unregelmäßigkeiten. Der größte Hebel liegt deshalb nicht in einer komplett anderen Bewegungserzeugung, sondern in sauberer Retargeting-Kalibrierung, Root Motion, Kontaktmarkern, Foot Locking und besseren Übergängen.
- **V5, Physics-assisted Active Motion — 6/10:** Die Bewegung wirkt durch Impuls, Nachlauf, Bodenkontakt und Landung natürlicher. Als alleiniger Hauptcontroller verschlechtert Physik aber die präzise Kampfchoreografie. In den neuen Varianten wird Physik deshalb überwiegend als begrenzte Sekundärschicht über Mocap eingesetzt.
- **V6, Layered Hybrid Controller — 4/10:** Die Animationen waren brauchbar, aber statisch und physikalisch unpassend. Layering bleibt sinnvoll, benötigt jedoch eine hochwertige Mocap-Basis, klare Autorität pro Gelenk, kontaktbewusste Korrekturen und momentumserhaltende Übergänge.
- **V1–V3 — 1–3/10:** Manuelle Keyframes, reine Kurven und vollständig IK-erzeugte Angriffe bleiben ausgeschlossen. IK darf nur kleine Fehler einer guten Mocap-Bewegung korrigieren, niemals die komplette Performance erzeugen.

### Gemeinsame Folgerung

V7–V13 bleiben **mocap-first**. Sie untersuchen sieben Steigerungen beziehungsweise Kombinationen aus Retargeting, Kontaktkorrektur, Root-Motion-Verarbeitung, Inertialisierung, Clip-Montage, Motion Matching, biomechanischer Plausibilisierung und selektiver Sekundärphysik.

### Fixierte neue Skillpalette

Die beiden schwächeren alten Skills **One-Inch Burst** und **Lightning Roundhouse** entfallen vollständig.

1. **Phantom Weave Dash:** explosiver Links-Rechts-Dash mit tiefem Körperschwerpunkt, Slip-/Weave-Rumpfarbeit, klaren Fußpflanzungen und geladenem Shovel-Hook als Abschluss.
2. **Peekaboo Power Chain:** elite-boxing-inspirierte Peekaboo-Kombination ohne Abbild einer realen Person: Guard, Bob-and-Weave, linker Körperhaken, rechter Körperhaken, linker Uppercut und geladene rechte Gerade. Beine, Hüfte, Wirbelsäule und Schultern müssen jeden Schlag sichtbar antreiben.
3. **Flame Tornado Kick:** kraftvoller Spin-Kick mit lesbarem Pivot, Hüftöffnung und stabiler Rückkehr.
4. **Rising Backflip Kick:** vorbereiteter Aufwärtstritt in einen kontrollierten Backflip mit glaubwürdigem Absprung und Landung.
5. **Dragon Step Combo:** fließende Schritt-, Hand-, Ellbogen-, Knie- und Kick-Kombination mit Richtungswechseln.
6. **Skyfall Somersault Finale:** klar lesbarer Airborne-Somersault-Angriff mit Kompression, Absprung, Rotation, Trefferphase und abgefangener Landung.

---

## Variation 7 — Mocap retargeting with contact cleanup

```text
Build a compact React, Vite, TypeScript, and Three.js animation showcase featuring one original photorealistic, fighting-game-inspired martial-arts boxer on a dark sci-fi studio stage. Keep the full body and both feet visible with a stable comparison camera. Make high-quality motion capture the sole source of primary body motion. Retarget clips with SkeletonUtils.retargetClip, explicitly calibrate source/target rest poses, bone-axis offsets, hip height, limb proportions, and root scale, then trim dead frames and play through AnimationMixer. Do not synthesize attacks from hand-authored bone rotations, procedural pose curves, or full-body IK.

Implement a deterministic post-retarget cleanup pass. Extract foot-contact intervals and strike-contact events, preserve horizontal root motion on the character root, keep vertical movement on the hips, pin each stance foot in world space during planted intervals, and use only small two-bone IK corrections for contact errors. Preserve the captured pelvis, spine, shoulder, and head motion instead of flattening it. Use short pose-matched crossfades into and out of guard, with no snapping or skating.

Add six skills on keys 1–6: (1) Phantom Weave Dash — explosive left-right lateral dashes, low slips/weaves, planted reversals, then a loaded shovel hook; (2) Peekaboo Power Chain — compact guard, bob-and-weave, left body hook, right body hook, left uppercut, and a loaded right cross, all driven visibly from feet, hips, torso, and shoulders; (3) Flame Tornado Kick — planted pivot, hip opening, powerful spin kick, stable recovery; (4) Rising Backflip Kick — compression, rising kick, controlled backflip, believable landing; (5) Dragon Step Combo — connected steps, punches, elbow, knee, and kick with direction changes; (6) Skyfall Somersault Finale — compressed takeoff, readable airborne rotation and attack, absorbed landing. Never include One-Inch Burst or Lightning Roundhouse.

Add restrained hand-written GLSL trails, flame, sparks, and shock rings from runtime-generated geometry only. Trigger VFX from final corrected hand/foot paths and exact contacts; never let effects hide body mechanics or feet. Space replays the current skill and R returns smoothly to guard. Prioritize weight transfer, foot contact, torso loading, impact, recovery, and replay stability over VFX quantity.
```

## Variation 8 — Mocap with selective active physics

```text
Build a compact React, Vite, TypeScript, and Three.js animation showcase featuring one original photorealistic, fighting-game-inspired martial-arts boxer on a dark sci-fi studio stage. Keep the full body and both feet visible with a stable comparison camera. Start every attack from high-quality motion-capture clips retargeted with SkeletonUtils.retargetClip and played through AnimationMixer. Correct rest-pose axes, body scale, root motion, and foot contacts before simulation. Mocap must remain the authoritative choreography; do not replace it with a ragdoll, procedural curves, manual keyframes, or IK-generated attacks.

Add selective active physics only where it improves natural motion. Drive a joint-limited spring-damper follow rig toward the retargeted pose with frame-rate-independent gains, but keep stance feet and the global character root under deterministic contact control. Use strong tracking during anticipation and strike alignment, then briefly soften only relevant torso, shoulder, arm, clothing, and landing chains for inertia, recoil, overlap, ground reaction, and settling. Feed captured linear/angular velocities into these dynamic windows so momentum is continuous. Clamp deviations from the mocap pose, prevent joint hyperextension, and blend back to animation authority without pops. Do not simulate the entire body loosely.

Add six skills on keys 1–6: (1) Phantom Weave Dash — explosive left-right lateral dashes, low slips/weaves, planted reversals, then a loaded shovel hook; (2) Peekaboo Power Chain — compact guard, bob-and-weave, left body hook, right body hook, left uppercut, and a loaded right cross, visibly powered by feet, hips, torso, and shoulders; (3) Flame Tornado Kick — planted pivot, hip opening, powerful spin kick, stable recovery; (4) Rising Backflip Kick — compression, rising kick, controlled backflip, believable landing; (5) Dragon Step Combo — connected steps, punches, elbow, knee, and kick with direction changes; (6) Skyfall Somersault Finale — compressed takeoff, readable airborne rotation and attack, absorbed landing. Never include One-Inch Burst or Lightning Roundhouse.

Use restrained runtime geometry and hand-written GLSL for trails, flame, sparks, dust, and shock rings. Emit effects from final simulated limb paths, foot forces, takeoff/landing impulses, and strike events. Space replays and R recovers to guard. The result must retain mocap precision while gaining subtle momentum, recoil, and physically believable landings.
```

## Variation 9 — Inertialized layered mocap controller

```text
Build a compact React, Vite, TypeScript, and Three.js animation showcase featuring one original photorealistic, fighting-game-inspired martial-arts boxer on a dark sci-fi studio stage. Keep his complete silhouette and feet visible with a fixed comparison-friendly camera. Use retargeted high-quality motion-capture clips for all primary motion via SkeletonUtils.retargetClip and AnimationMixer. Build a layered controller, but never generate primary attacks with procedural curves, manual keyframes, or full-body IK.

Use a full-body action clip as the base, separate lower-body trajectory and upper-body action masks only when necessary, and add low-amplitude mocap-derived breathing, guard tension, hit recoil, and recovery layers with AnimationUtils.makeClipAdditive. Replace long generic crossfades with velocity-aware inertialization: at every transition preserve joint angular velocity, pelvis velocity, facing direction, and stance phase, then decay offsets smoothly. Warp horizontal root trajectories moderately to keep lateral dashes and combo spacing readable without changing contact timing. After all animation layers, run one final contact pass for planted feet and exact strike endpoints. Each joint must have one final pose writer; additive layers may not fight foot locking.

Add six skills on keys 1–6: (1) Phantom Weave Dash — explosive left-right lateral dashes, low slips/weaves, planted reversals, then a loaded shovel hook; (2) Peekaboo Power Chain — compact guard, bob-and-weave, left body hook, right body hook, left uppercut, and a loaded right cross, with obvious leg drive, hip rotation, spine coil, and shoulder follow-through; (3) Flame Tornado Kick — planted pivot, hip opening, powerful spin kick, stable recovery; (4) Rising Backflip Kick — compression, rising kick, controlled backflip, believable landing; (5) Dragon Step Combo — connected steps, punches, elbow, knee, and kick with direction changes; (6) Skyfall Somersault Finale — compressed takeoff, readable airborne rotation and attack, absorbed landing. Never include One-Inch Burst or Lightning Roundhouse.

Create restrained hand-written GLSL trails, flame, sparks, and contact rings from runtime geometry. Bind VFX to the final composed skeleton and contact markers. Space replays; R returns to guard. Favor continuous momentum, live guard behavior, grounded feet, clear wind-up, and non-static recovery while preserving the original captured performance.
```

## Variation 10 — Phase-aligned mocap montage synthesis

```text
Build a compact React, Vite, TypeScript, and Three.js animation showcase featuring one original photorealistic, fighting-game-inspired martial-arts boxer on a dark sci-fi studio stage. Keep the full body and feet in frame with a stable camera. Construct every skill as a montage of high-quality retargeted motion-capture segments. Use SkeletonUtils.retargetClip and AnimationMixer, with calibrated rest-pose offsets, root scale, and bone axes. The source segments must remain the primary animation; no attack may be generated from procedural pose curves, hand-authored joint rotations, or full-body IK.

Preprocess each segment with stance label, contact times, facing, pelvis position/velocity, joint angular velocities, and a compact pose feature vector. Choose splice frames by minimum pose-and-velocity error, align them at matching support-foot phases, and solve a short C1-continuous transition so position and velocity remain continuous. Preserve captured anticipation and follow-through rather than cutting directly between impacts. For the Peekaboo Power Chain, connect separate slips, hooks, uppercut, and cross into one accelerating performance: each previous recoil must load the next strike. Keep true root motion, pin support feet, and allow only small endpoint IK after montage composition.

Add six skills on keys 1–6: (1) Phantom Weave Dash — explosive left-right lateral dashes, low slips/weaves, planted reversals, then a loaded shovel hook; (2) Peekaboo Power Chain — compact guard, bob-and-weave, left body hook, right body hook, left uppercut, and a loaded right cross, visibly powered through feet, hips, torso, and shoulders; (3) Flame Tornado Kick — planted pivot, hip opening, powerful spin kick, stable recovery; (4) Rising Backflip Kick — compression, rising kick, controlled backflip, believable landing; (5) Dragon Step Combo — connected steps, punches, elbow, knee, and kick with direction changes; (6) Skyfall Somersault Finale — compressed takeoff, readable airborne rotation and attack, absorbed landing. Never include One-Inch Burst or Lightning Roundhouse.

Use restrained runtime-generated geometry and hand-written GLSL for trails, flame, sparks, and shock rings. Fire effects only from final limb trajectories and montage contact markers. Space replays and R blends to guard. Judge success by whether multi-part skills read as one captured performance rather than disconnected clips.
```

## Variation 11 — Goal-conditioned motion matching

```text
Build a compact React, Vite, TypeScript, and Three.js animation showcase featuring one original photorealistic, fighting-game-inspired martial-arts boxer on a dark sci-fi studio stage. Keep the entire body and both feet visible with a stable benchmark camera. Use a small database of high-quality, retargeted motion-capture frames and implement goal-conditioned motion matching in TypeScript. Retarget source clips with SkeletonUtils.retargetClip, normalize root scale and axes, and extract per-frame features: future root trajectory, facing, pelvis velocity, left/right foot positions and velocities, stance/contact flags, key hand positions, and major joint velocities. Do not synthesize attacks with procedural curves, manual keyframes, or a full-body IK solver.

At controlled search points, select the lowest-cost compatible frame using trajectory, pose, velocity, stance, and scheduled skill-phase costs. Hard constraints must preserve the requested strike order and required contact windows; motion matching improves approaches, pivots, links, and recoveries rather than improvising a different move. Use inertialized transitions, root alignment, stance-foot locking, and a final small contact correction pass. Cache feature data and use fixed-step decisions so identical inputs replay identically. Avoid frantic frame switching and enforce a minimum segment duration.

Add six skills on keys 1–6: (1) Phantom Weave Dash — explosive left-right lateral dashes, low slips/weaves, planted reversals, then a loaded shovel hook; (2) Peekaboo Power Chain — compact guard, bob-and-weave, left body hook, right body hook, left uppercut, and a loaded right cross, with each torso recoil loading the next strike; (3) Flame Tornado Kick — planted pivot, hip opening, powerful spin kick, stable recovery; (4) Rising Backflip Kick — compression, rising kick, controlled backflip, believable landing; (5) Dragon Step Combo — connected steps, punches, elbow, knee, and kick with direction changes; (6) Skyfall Somersault Finale — compressed takeoff, readable airborne rotation and attack, absorbed landing. Never include One-Inch Burst or Lightning Roundhouse.

Add restrained hand-written GLSL trails, flame, sparks, dust, and shock rings from runtime geometry. Drive VFX only from the final matched pose and exact contact markers. Space replays; R requests a motion-matched return to guard. Prioritize natural linking steps, stance continuity, torso rhythm, and deterministic replay.
```

## Variation 12 — Biomechanics-corrected mocap

```text
Build a compact React, Vite, TypeScript, and Three.js animation showcase featuring one original photorealistic, fighting-game-inspired martial-arts boxer on a dark sci-fi studio stage. Keep the full body and both feet visible with a stable camera. Begin with high-quality full-body motion-capture clips, retarget them using SkeletonUtils.retargetClip, and preserve their timing and style through AnimationMixer. Correct source/target rest poses, bone axes, proportions, and root scale. Mocap is the primary performance; never generate whole attacks from manual keyframes, procedural curves, or IK.

Add a restrained biomechanics correction pass. Estimate segment masses, center of mass, support foot/polygon, pelvis linear velocity, torso angular momentum, and foot ground-reaction timing from the retargeted pose. Detect implausible balance, skating, or momentum loss caused by different body proportions, then apply only low-amplitude pelvis/root offsets, spine compensation, foot locks, and timing-preserving trajectory scale corrections. During punches, maintain a visible kinetic chain from floor pressure through ankle, knee, hip, spine, shoulder, elbow, and fist. During spins and flips, preserve angular momentum through tucking/extension; during landings, distribute deceleration through ankles, knees, hips, and torso. Do not turn this into a loose physics simulation, and never flatten expressive mocap torso motion merely to keep the center of mass centered.

Add six skills on keys 1–6: (1) Phantom Weave Dash — explosive left-right lateral dashes, low slips/weaves, planted reversals, then a loaded shovel hook; (2) Peekaboo Power Chain — compact guard, bob-and-weave, left body hook, right body hook, left uppercut, and a loaded right cross, visibly driven by the complete kinetic chain; (3) Flame Tornado Kick — planted pivot, hip opening, powerful spin kick, stable recovery; (4) Rising Backflip Kick — compression, rising kick, controlled backflip, believable landing; (5) Dragon Step Combo — connected steps, punches, elbow, knee, and kick with direction changes; (6) Skyfall Somersault Finale — compressed takeoff, readable airborne rotation and attack, absorbed landing. Never include One-Inch Burst or Lightning Roundhouse.

Use restrained runtime geometry and hand-written GLSL for trails, flame, sparks, floor dust, and shock rings. Trigger them from corrected limb velocities, strike events, foot pressure, takeoff, and landing. Space replays; R recovers to guard. Make body mechanics, grounded power, momentum, and safe-looking load absorption the visual focus.
```

## Variation 13 — Production mocap hybrid

```text
Build a compact React, Vite, TypeScript, and Three.js animation showcase featuring one original photorealistic, fighting-game-inspired martial-arts boxer on a dark sci-fi studio stage. Keep the full body and feet visible at all times with a stable comparison camera. Create a production-style hybrid that combines the strongest ideas without allowing systems to compete. Primary movement must always come from high-quality motion-capture clips retargeted with SkeletonUtils.retargetClip and played through AnimationMixer. Calibrate rest poses, bone axes, proportions, root scale, and clip timing. Never use procedural pose curves, manual keyframe attacks, or full-body IK as the animation source.

Use this strict update order: (1) sample and retarget the mocap base; (2) phase-match montage segments and preserve root/joint velocity with inertialized transitions; (3) apply small mocap-derived additive guard, breathing, anticipation, and recoil layers; (4) warp only the horizontal root trajectory within safe limits; (5) lock stance feet and apply minimal two-bone contact correction; (6) run a low-amplitude biomechanical balance correction; (7) add frame-rate-independent secondary springs to spine, shoulders, loose limbs, and gear, with brief selective recoil/landing impulses; (8) compute final limb paths and VFX events. Assign one final writer per joint, clamp all corrections, preserve captured asymmetry, and guarantee deterministic replays. Mocap remains dominant at strike contacts.

Add six skills on keys 1–6: (1) Phantom Weave Dash — explosive left-right lateral dashes, low slips/weaves, planted reversals, then a loaded shovel hook; (2) Peekaboo Power Chain — compact guard, bob-and-weave, left body hook, right body hook, left uppercut, and a fully loaded right cross; every strike must start in the feet, rotate through hips and coiled spine, transfer through shoulders, and recover into the next strike; (3) Flame Tornado Kick — planted pivot, hip opening, powerful spin kick, stable recovery; (4) Rising Backflip Kick — compression, rising kick, controlled backflip, believable landing; (5) Dragon Step Combo — connected steps, punches, elbow, knee, and kick with direction changes; (6) Skyfall Somersault Finale — compressed takeoff, readable airborne rotation and attack, absorbed landing. Never include One-Inch Burst or Lightning Roundhouse.

Add restrained hand-written GLSL trails, flame, sparks, floor dust, and shock rings using runtime-generated geometry only. Drive them from final corrected velocities, exact contacts, ground pressure, and landing impulses; effects must never conceal feet or body mechanics. Space replays the current skill and R returns naturally to guard. Optimize for realistic weight transfer, torso loading, clean foot plants, explosive acceleration, momentum-preserving follow-through, physically credible landings, smooth recovery, and stable repeatability.
```

## Fortschrittsprotokoll

- **2026-08-12:** Bestehende Bewertungen und V1–V6 analysiert. Mocap-first als verbindliche Richtung festgelegt. One-Inch Burst und Lightning Roundhouse durch Phantom Weave Dash und Peekaboo Power Chain ersetzt. Sieben eigenständige, direkt kopierbare One-shot-Prompts V7–V13 erstellt und gegeneinander technisch abgegrenzt.
