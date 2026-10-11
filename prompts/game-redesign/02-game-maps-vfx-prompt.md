# Spielwelt im Premium-Graffiti-Stil (Karten, VFX, Auftritte)

Vorlage für den Welt-Teil eines Umbaus: Karten, Licht, Atmosphäre, VFX, inszenierte Gegner-Auftritte
und große Momente. Die Oberfläche steht getrennt in
[01 — Spiel-UI und Motion](01-game-ui-graffiti-prompt.md). Läuft beides zusammen, teilen sich die
Agenten Farbquelle, Takttabelle und Ereigniskanal; der Orchestrator legt sie zuerst an.

Die Angaben ausfüllen und den Block „Prompt“ vollständig im Chat des Zielprojekts mitgeben. Für reine
Leistungsfragen einer Karte gibt es die [Map-Performance-Prompts](../README.md).

## Meine Angaben

- Spiel und Projektpfad: `<Name, absoluter Pfad>`
- Karten im Umfang: `<alle / Liste; neue Karten ja oder nein>`
- Welt-Referenz: `<Standard: Sci-Fi-Karten aus Shardfall (früher Voxel Samurai Reborn), /Users/kentoky/Documents/React Projects/test-projects/shardfall>`
- Welt- bzw. Crew-Idee des Spiels: `<optional — aus der UI-Identität, falls schon vorhanden>`
- Momente, die inszeniert werden sollen: `<Standard: Gegner-Spawn, Boss-Auftritt, Angriffe, Treffer, Zerstörung, richtige/falsche Eingabe, Combo, Fortschritt, Sieg/Niederlage>`
- Bildrate-Ziel und Budget: `<Standard: Bildwiederholrate; Draw-Calls/Dreiecke aus dem Projekt>`
- Agenten: `<Standard: Orchestrator + 1 Welt-Agent, oder 2 bei UI + Welt>`

## Prompt

```text
Completely overhaul the **in-game world of <GAME>** (<PROJECT PATH>): maps, lighting, atmosphere,
VFX, enemy appearances and big gameplay moments. This should not feel like a polish pass — rebuild the
world so it feels like one premium, cinematic game together with its UI.

Make the maps darker, moodier and more cinematic, with strong contrast and carefully placed lighting.
Use the visual quality and atmosphere of <WORLD REFERENCE> as the quality bar, but adapt that language
to <GAME> and push it even further. Use emissive lighting, glowing environmental elements, atmospheric
fog, particles, animated background details, strong silhouettes and cinematic composition. The world
carries the same hand-drawn graffiti pieces as the UI (murals, tags, stencils on walls and floors), so
UI and world read as one game. Study how the reference handles maps, VFX, enemy spawning,
environmental effects, lighting and presentation. Reuse the strongest ideas where they make sense —
never copy. <GAME> needs its own identity and should look even more refined.

House rules:
- House guide: /Users/kentoky/Documents/React Projects/shared-docs/ui/PREMIUM-GRAFFITI-GAME-UI.md
- Real-time 3D rules: /Users/kentoky/Documents/React Projects/shared-docs/threejs/PERFORMANCE.md

Massively upgrade the **VFX system**. Every important gameplay moment gets satisfying visual impact:
<MOMENTS>. Use particles, shaders, trails, flashes, distortion, emissive effects, debris, screen-space
reactions and layered impact effects where appropriate. Effects must feel controlled, readable and
expensive — they never hide the playfield, the target or the main board.

Enemy appearances and major gameplay events are **staged instead of spawning into existence**:
anticipation, build-up, environmental reactions (lights, fog, floor), VFX and camera motion that make
important moments feel intentional. Warnings of enemy attacks stay readable: hard bright edges and a
sprayed pattern, never a full additive glow that buries the floor.

Architecture rules:
- One world builder with one file per map (layout, update, dispose) and a shared kit; motion only via
  shared uniforms updated once per frame — no React state per frame, no new shader program per frame.
- One VFX pool (ring buffer, one draw call, motion in the vertex shader, upload only the written
  range). No CPU particles and no mesh per hit in combat. Beats come from the shared timing table and
  are set as future start times, never via setTimeout.
- A fixed light set per scene; phases and alarms change only colours and intensities. Lower quality
  tiers use fewer instances and sources, never a different program.
- Every shader program compiles on the loading screen — none mid-fight. Everything a component
  creates on the GPU it disposes; check that a run → menu cycle returns to the same WebGL counts.
- Screen reactions (flash, hit edge, low-health edge) run inside post-processing with the comfort
  sliders and reduced motion — no DOM full-screen tints.
- Menu preview images of every map are re-captured when a map visibly changes.

Keep gameplay rules, balancing, collision, spawn logic and difficulty. Performance must stay at
<FPS TARGET>: pixel cost before draw calls, device pixel ratio never above the device, one quality
governor that only steps down, nothing allocated per frame in combat (watch V8 boxing traps). Measure
old against new without a GPU first, then with gentle captures.

Way of working: you are the orchestrator with at most <N> builder agents (world agent; plus a UI agent
if the UI is part of the job, with strict path ownership). Each builder rates every map and every
moment honestly — identity, atmosphere, readability, performance — and keeps tuning until each is
above 9/10. Findings go back with picture and timestamp. Builders commit only their own paths and
never push; you verify in a clean worktree, look at the evidence, push and check the live version.

Deliver: the maps, the VFX pool and the staged moments; the rules for future agents in CLAUDE.md;
budgets and measurements (draw calls, triangles, programs, frame time, allocations) old against new;
compressed evidence pictures of every map and moment, also on the lowest quality tier.

The final result should feel like <GAME> has been rebuilt by a world-class environment and VFX team.
Darker. More cinematic. More aggressive. More stylish. More AAA.
```

## Was immer dazugehört (nicht kürzen)

- Projektregeln und `~/.claude/CLAUDE.md` gehen vor. Leistung zuerst per Node ohne Grafikkarte
  (`taskpolicy -b nice -n 20`, alt gegen neu), echte FPS-Läufe nur nach dem Skill `pruefbrowser-fps`.
- Aufnahmen: eingebauter Browser zuerst, sonst EIN Chrome for Testing in Nutzerversion, headless,
  ≤ 1280×720, Schleife angehalten, nur benötigte Bilder, sofort schließen — auch in Subagents.
- Neue Töne nur nach Freigabe des Nutzers. Neue Bilder komprimieren.
