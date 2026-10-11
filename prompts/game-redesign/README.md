# Spiel-Redesign-Prompts (Premium-Graffiti)

Prompt-Vorlagen für den Hausstil [Premium-Graffiti](../../ui/PREMIUM-GRAFFITI-GAME-UI.md). UI und
Welt sind getrennt; für einen kompletten Umbau beide zusammen verwenden.

| Zweck | Vorlage |
| --- | --- |
| Gesamte Oberfläche und Motion eines Spiels neu (Titel, Menüs, HUD, Dialoge, Ergebnis, Übergänge) | [01 — Spiel-UI und Motion](01-game-ui-graffiti-prompt.md) |
| Karten, Licht, VFX und inszenierte Auftritte neu | [02 — Karten, VFX und Auftritte](02-game-maps-vfx-prompt.md) |

Dazu gehört der Skill `game-ui-graffiti`: Ablauf, Agenten-Briefings, Motion-Rezept und Ton (seit 12.10.2026
auch das frühere `game-motion-studio`).

## Vorbild: der Core-Breaker-Auftrag (07.10.2026)

Mit diesem Prompt entstand die „Nachtschicht“ von Crossword Core Breaker. Der Nutzer am 11.10.2026:
„Ich habe noch nie so eine schöne UI gesehen … das ist der beste Graffiti-Stil bis jetzt.“ Ergebnis:
`/Users/kentoky/Documents/React Projects/3-crossword-core-breaker/DESIGN.md`, Hergang mit Phasen,
Messwerten und Noten in `docs/aaa-graffiti-rework/tasks/2026-10-07-aaa-graffiti-rework-tasks.md`
(Commits 07.–08.10.2026 bis `beb9dd3`).

Voxel Samurai Reborn aus dem Originaltext heißt heute **Shardfall** und liegt unter
`/Users/kentoky/Documents/React Projects/test-projects/shardfall`.

Im Lauf kamen zwei Vorgaben dazu, die in beiden Vorlagen fest stehen: Bildrate = Bildwiederholrate
(240 FPS auf 240 Hz), und auch Quiz-Tafel, Pause und alle übrigen Bildschirme folgen dem
Graffiti-Design. Jeder fertige Stand wurde committet, gepusht und live geprüft.

### Unveränderter Originaltext

```text
Completely redesign **Crossword Corebreaker** from the ground up and push the entire game to a true **AAA-quality browser-game level**. This should not feel like a UI refresh — overhaul the complete visual identity, in-game presentation, maps, VFX, motion, feedback and overall atmosphere.

The main art direction should be a **premium hand-drawn graffiti style**. Graffiti should feel intentionally illustrated, layered, expressive and expensive — not like random spray-paint fonts or cheap stickers. Build a complete visual language around it: typography, icons, panels, buttons, HUD elements, menus, transitions, backgrounds, highlights and in-game elements. Make the graffiti identity much stronger and more polished than before.

Redesign the **entire UI**, including every menu and every in-game interface. Make it dramatically more modern, cleaner, more confident and more game-like. Remove anything that feels like a standard web app. Every interaction should have weight, personality and visual feedback.

Go extremely hard on **World-Class Motion Design**. Add sophisticated transitions, animated layouts, spring motion, layered entrances, responsive hover/press states, parallax, animated typography, score reactions, impact frames, screen transitions and premium micro-interactions. Nothing should simply appear or disappear. The whole game should constantly feel alive without becoming visually chaotic.

Completely overhaul the **in-game maps** as well. Make them darker, moodier and more cinematic, with strong contrast and carefully placed lighting. Use the visual quality and atmosphere of the Sci-Fi maps from **Voxel Samurai Reborn** as a reference, but adapt that language to Crossword Corebreaker and push it even further. Use emissive lighting, glowing environmental elements, atmospheric fog, particles, animated background details, strong silhouettes and cinematic composition.

Reference repository for the existing Sci-Fi map design, graffiti direction and VFX:
`/Users/kentoky/Documents/React Projects/test-projects/voxel-samurai-reborn`

Study how that project handles **maps, VFX, enemy spawning, environmental effects, lighting and visual presentation**. Reuse the strongest ideas where they make sense, but do not simply copy them. Crossword Corebreaker needs its own identity and should look even more refined and AAA-like.

Massively upgrade the **VFX system**. Every important gameplay moment should have satisfying visual impact: enemy spawning, attacks, hits, destruction, correct interactions, transitions, combos, progression moments and special events. Use particles, shaders, trails, flashes, distortion, emissive effects, debris, screen-space reactions and layered impact effects where appropriate. Effects should feel controlled, readable and expensive.

Enemy appearances and major gameplay events should feel staged instead of simply spawning into existence. Use anticipation, buildup, environmental reactions, VFX and motion to make important moments feel intentional.

The final result should feel like **Crossword Corebreaker has been rebuilt by a world-class game UI, motion and VFX team**. Darker. More cinematic. More aggressive. More stylish. More tactile. More animated. More graffiti-driven. More AAA.

Do not just polish the current design. **Replace anything that feels mediocre. Push every screen, every map and every gameplay effect until the entire game feels like one cohesive premium experience.** Du darfst natürlich zwei Subagenten maximal parallel immer aufmachen. Wenn du willst, kannst du Orchestrator spielen. Also, dass du quasi nur die ganzen To-Dos durchgehst mit den zwei Agenten, die du hast. Aber du bist eigentlich nur der, der die Aufgaben überträgt. Nicht wirklich, du sollst jetzt nicht kritisch Die sollen aber selber sich bewerten, ne? solange es nicht unter den über 9 ist, sollen die immer weitermachen, bis das sich gut anfühlt. Ja, also wir reden vom Design und das äh, komplette System, nicht das Balancing, das kann erstmal so bleiben, wir reden jetzt nur vom Design, das Design muss einfach AAA aussehen, genau. Weiterhin aber performant, das ist so das Ziel dahinter, also ein komplett Rework anhand äh, unserer Graffiti-Designs, und so weiter, genau. Aber nochmal hochwertiger, genau. Mit extrem hochwertigen, äh, äh, Motion-like Award-Winning-Animationen, äh, ähnlich als wäre es ein Video, das du geschnitten hättest, genau, so soll sich das anfühlen, bitte. Als wäre es echt ein echtes V-Motion oder irgendein Video,

```

### Was den Prompt stark macht

- **Bild statt Liste:** „illustrated, layered, expressive and expensive — not like random spray-paint
  fonts or cheap stickers“ schließt den billigen Weg ausdrücklich aus.
- **Vollständiger Umfang:** jede Oberfläche, jeder Moment; „nothing should simply appear or
  disappear“.
- **Messlatte und Vorbild** aus einem eigenen Repo, mit dem Verbot zu kopieren.
- **Gefühl als Abnahme:** „als wäre es ein Video, das du geschnitten hättest“.
- **Arbeitsweise:** Orchestrator, höchstens zwei Agenten, Selbstbewertung bis über 9.
- **Grenzen:** Balancing bleibt, Leistung bleibt.

Die Vorlagen 01 und 02 trennen diesen Text in UI und Welt, verweisen auf den Hausstil und ergänzen
die Regeln, die sich im Lauf als nötig erwiesen haben (eine Takt- und Farbquelle, keine Zuteilung je
Bild, Programme nur im Ladebildschirm, Prüfbrowser-Regeln).
