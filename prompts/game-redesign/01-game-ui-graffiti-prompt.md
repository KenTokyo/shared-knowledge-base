# Spiel-UI im Premium-Graffiti-Stil (UI + Motion)

Vorlage für einen kompletten UI-Umbau eines Spiels: Identität, alle Menüs, alle Oberflächen im Spiel,
Motion. Karten, VFX und Gegner-Auftritte stehen getrennt in
[02 — Karten, VFX und Auftritte](02-game-maps-vfx-prompt.md). Beide zusammen ergeben den
Original-Auftrag aus der [README](README.md).

Die Angaben ausfüllen und den Block „Prompt“ vollständig im Chat des Zielprojekts mitgeben. Leere
Angaben entscheidet der Orchestrator selbst und begründet sie im Aufgaben-Dokument.

## Meine Angaben

- Spiel und Projektpfad: `<Name, absoluter Pfad>`
- Welt- bzw. Crew-Idee: `<optional — wer sprüht wo, und warum passt das zum Spiel?>`
- Farben, die bleiben müssen: `<optional — Markenfarbe, bestehende Palette>`
- Bildschirme im Umfang: `<Standard: alle — Titel, Menüs, Shop/Hangar, Einstellungen, HUD, Hauptfläche im Spiel, Dialoge, Pause, Ergebnis, Laden, Übergänge>`
- Zusätzliche Referenzen: `<optional — Repos, Bilder, Spiele>`
- Bildrate-Ziel: `<Standard: Bildwiederholrate, z. B. 240 FPS auf 240 Hz>`
- Agenten: `<Standard: Orchestrator + höchstens 2 Bau-Agenten, Opus, hohe Denkstufe>`
- Abschluss: `<Standard: commit + push auf main, Coolify-Build und Live-Version prüfen>`

## Prompt

```text
Completely redesign the entire user interface of **<GAME>** (<PROJECT PATH>) from the ground up and
push it to a true **AAA-quality browser-game level**. This is not a UI refresh: rebuild the visual
identity, every menu, every in-game interface, the feedback and the motion as one cohesive premium
experience.

The art direction is a **premium hand-drawn graffiti style**. Graffiti must feel intentionally
illustrated, layered, expressive and expensive — never random spray-paint fonts or cheap stickers.
Build a complete visual language around it: typography, icons, panels, buttons, HUD elements, menus,
transitions, backgrounds, highlights and in-game UI elements. Make the graffiti identity much stronger
and more polished than anything the game has today.

This is our house style. Read it first and treat it as the standard:
- House guide: /Users/kentoky/Documents/React Projects/shared-docs/ui/PREMIUM-GRAFFITI-GAME-UI.md
- Motion recipe: the skill game-ui-graffiti, references/motion-recipe.md
The guide is complete on its own; there is no need to study another project.
Reuse the craft — layered pieces, slaps, posters, stencils, marker lines, stamps, an own hand-drawn
icon set, one colour source, one timing table, one event channel, a studio with real mock data — but
give <GAME> its own crew idea, place, props and palette. Do not copy another game's look.
<WORLD / CREW IDEA, COLOURS TO KEEP, EXTRA REFERENCES>

Redesign the **entire UI**: <SCREENS>. Make it dramatically more modern, cleaner, more confident and
more game-like. Remove anything that feels like a standard web app: no glass, no soft web cards, no
generic icon library in the visible UI. Every interaction should have weight, personality and visual
feedback. The HUD stays calm and readable; full force belongs to menus, transitions and big moments.
Overlays over the playfield never cover the main board or text and dodge the focal point.

Go extremely hard on **world-class motion design**, cut like a video someone edited: choreographed
beats (build-up → hit → payoff → rest), spring motion, layered and staggered entrances, responsive
hover and press states, parallax, animated typography (pieces slamming in letter by letter, drips that
run once), score reactions that count up and lock in, impact frames, spray-wipe screen transitions and
premium micro-interactions. Nothing may simply appear or disappear. The game should constantly feel
alive without becoming visually chaotic. Rules: one timing table for picture, 3D and sound; exits are
shorter than entrances; no idle loops; animate only transform and opacity; reduced motion shows the
end state; feedback after a click is immediate.

Keep gameplay rules, balancing, save data, test IDs, localisation and accessibility (44 px targets,
visible keyboard focus, aria labels). Performance must stay at <FPS TARGET>: in a running fight the UI
allocates nothing per frame and makes no React commits; frequent values are written straight to the
DOM; feedback runs over one event channel and WAAPI; no animated filter, blur, glow or backdrop-filter.
Measure before and after in a production build.

Way of working: you are the orchestrator. First write the shared contracts yourself — colour tokens,
timing table, event channel, and a task file with the game's style brief (Steckbrief), path
ownership, phases, budgets, capture rules and a rating table. Then run at most <N> builder agents in
parallel with strict path ownership (for example A: foundation, kit, icons, studio, menus; B: HUD,
main board, moments, pause, results). Each builder rates its own work honestly per area — identity,
motion, readability, performance — and keeps tuning until every area is above 9/10. Send findings back
to the same agent with picture and timestamp. Builders commit only their own paths and never push;
you verify every state in a clean worktree (typecheck, build, rule checks), look at the evidence
pictures, then push and check the live version.

Deliver: the game's DESIGN.md as its styleguide (brief, colours, fonts, kit, icons, components, motion,
overlays, studio, checks, forbidden list); a DEV studio (?studio=) that shows every screen in every
state from real data and never writes to save data; compressed evidence pictures; the final rating
table; and short rules in CLAUDE.md for what future agents must not break.

The final result should feel like <GAME> has been rebuilt by a world-class game UI and motion team.
Darker. More cinematic. More confident. More stylish. More tactile. More animated. More
graffiti-driven. More AAA. Do not just polish the current design — replace anything that feels
mediocre, and push every screen until the whole game feels like one premium experience.
```

## Was immer dazugehört (nicht kürzen)

- Projektregeln (`CLAUDE.md`, `AGENTS.md`, eigenes `DESIGN.md`) und `~/.claude/CLAUDE.md` gehen vor:
  Prüfbrowser-Regeln (eingebauter Browser zuerst, sonst EIN Chrome for Testing, ≤ 1280×720, sofort
  schließen, auch in Subagents), FPS-Läufe nur nach dem Skill `pruefbrowser-fps`.
- Neue Töne nur nach Freigabe des Nutzers (ElevenLabs kostet Guthaben).
- Fremde parallele Arbeit nicht übernehmen oder zurücksetzen; nur eigene Dateien committen.
- Neue Bilder komprimieren; keine Laufzeitdateien von fremden Servern.

## Kleine Variante (ein Agent, ein Bereich)

Für einen einzelnen Bildschirm oder ein kleines Spiel reicht: „Gestalte `<Bildschirm>` von `<Spiel>`
nach dem Hausstil `shared-docs/ui/PREMIUM-GRAFFITI-GAME-UI.md` neu, mit den Tokens, Takten und dem
Bausatz des Spiels. Erst Studio-Zustand, dann Bau, dann Aufnahme und ehrliche Note in Identität,
Motion, Lesbarkeit, Leistung; weiter bis über 9.“
