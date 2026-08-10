# LLM Arena prompts — boxer animation directions

Use the same character, skills, stage, controls, and VFX rules in every run. Compare motion quality, foot contact, impact, transitions, and replay stability.

## Variation 1 — Code-authored keyframe clips

```text
Build a compact Three.js animation showcase with one original, photorealistic, Tekken-inspired martial-arts boxer on a dark sci-fi studio stage. Keep his full body and feet visible. Create every move in code with AnimationClip, QuaternionKeyframeTrack, VectorKeyframeTrack, and AnimationMixer. Author clear anticipation, weight shift, strike, contact, follow-through, and guard recovery poses. Add six skills on keys 1–6: One-Inch Burst, Lightning Roundhouse, Flame Tornado Kick, Rising Backflip Kick, Dragon Step Combo, and Skyfall Somersault Finale. Use hands, elbows, knees, grounded kicks, spinning kicks, and a readable airborne somersault. Add restrained trails, fire, lightning, sparks, and shock rings with hand-written GLSL and runtime-generated geometry only. Drive VFX from final hand and foot paths plus exact contact events. Space replays; R resets.
```

## Variation 2 — Procedural pose curves

```text
Build a compact Three.js animation showcase with one original, photorealistic, Tekken-inspired martial-arts boxer on a dark sci-fi studio stage. Keep his full body and feet visible. Generate all motion directly at runtime: define named full-body poses in code, blend bone quaternions and root motion through normalized procedural curves, and use frame-rate-safe interpolation. Create clear anticipation, weight transfer, contact, follow-through, and recovery. Add six skills on keys 1–6: One-Inch Burst, Lightning Roundhouse, Flame Tornado Kick, Rising Backflip Kick, Dragon Step Combo, and Skyfall Somersault Finale. Use hands, elbows, knees, grounded kicks, spinning kicks, and a readable airborne somersault. Add restrained trails, fire, lightning, sparks, and shock rings with hand-written GLSL and runtime-generated geometry only. Drive VFX from final hand and foot paths plus exact contact events. Space replays; R resets.
```

## Variation 3 — Full-body inverse kinematics

```text
Build a compact Three.js animation showcase with one original, photorealistic, Tekken-inspired martial-arts boxer on a dark sci-fi studio stage. Keep his full body and feet visible. Generate every attack solely from timed hip, hand, elbow, knee, and foot targets, then solve coordinated rig chains with CCDIKSolver or a custom iterative solver. Add joint limits, pole targets, planted-foot locks, and center-of-mass control. Add six skills on keys 1–6: One-Inch Burst, Lightning Roundhouse, Flame Tornado Kick, Rising Backflip Kick, Dragon Step Combo, and Skyfall Somersault Finale. Make hands, elbows, knees, grounded kicks, spinning kicks, and the airborne somersault hit clean targets. Add restrained hand-written GLSL trails, fire, lightning, sparks, and shock rings from runtime geometry. Sync VFX to solved limb paths and contact events. Space replays; R resets.
```

## Variation 4 — Retargeted motion capture

```text
Build a compact Three.js animation showcase with one original, photorealistic, Tekken-inspired martial-arts boxer on a dark sci-fi studio stage. Keep his full body and feet visible. Build the six attacks from high-quality motion-capture clips, retarget them onto one humanoid rig with SkeletonUtils.retargetClip, preserve useful root motion, correct scale and bone axes, trim dead frames, and blend cleanly through AnimationMixer. Add six skills on keys 1–6: One-Inch Burst, Lightning Roundhouse, Flame Tornado Kick, Rising Backflip Kick, Dragon Step Combo, and Skyfall Somersault Finale. The set must cover hands, elbows, knees, grounded kicks, spinning kicks, and a readable airborne somersault. Lock stance feet and correct contact drift after retargeting. Add restrained hand-written GLSL trails, fire, lightning, sparks, and shock rings from runtime geometry. Sync VFX to final limb paths and contact events. Space replays; R resets.
```

## Variation 5 — Physics-assisted active motion

```text
Build a compact Three.js animation showcase with one original, photorealistic, Tekken-inspired martial-arts boxer on a dark sci-fi studio stage. Keep his full body and feet visible. Generate attacks with an active physics rig: timed target poses drive joint-limited spring-damper bones, while momentum, balance, floor contact, recoil, and landing forces shape the final motion. Keep the controller stable, frame-rate independent, and able to recover to guard. Add six skills on keys 1–6: One-Inch Burst, Lightning Roundhouse, Flame Tornado Kick, Rising Backflip Kick, Dragon Step Combo, and Skyfall Somersault Finale. Show hands, elbows, knees, grounded kicks, spinning kicks, and a controlled airborne somersault with believable takeoff and landing. Add restrained hand-written GLSL trails, fire, lightning, sparks, and shock rings from runtime geometry. Drive VFX from simulated limb paths and collision events. Space replays; R resets.
```

## Variation 6 — Layered hybrid controller

```text
Build a compact Three.js animation showcase with one original, photorealistic, Tekken-inspired martial-arts boxer on a dark sci-fi studio stage. Keep his full body and feet visible. Use a layered hybrid controller: AnimationMixer plays authored base clips, additive layers handle guard, breathing, recoil, and aim, procedural IK locks feet and strike contacts, and frame-rate-safe springs add torso and limb follow-through. Give each joint one final pose writer after all layers are composed. Add six skills on keys 1–6: One-Inch Burst, Lightning Roundhouse, Flame Tornado Kick, Rising Backflip Kick, Dragon Step Combo, and Skyfall Somersault Finale. Use hands, elbows, knees, grounded kicks, spinning kicks, and a readable airborne somersault. Add restrained hand-written GLSL trails, fire, lightning, sparks, and shock rings from runtime geometry. Drive VFX from final limb paths and exact contact events. Space replays; R resets.
```
