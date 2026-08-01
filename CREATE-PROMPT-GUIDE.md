Dies ist ein prompt guide, wie prompts aufgebaut werden sollten, danach orientieren wir uns stark!
Nimm am besten von allen 3 Prompts das beste mit
Von matt shumer am meisten, aber performance müssen wir natürlich auch betrachten, das war beim COD clone sehr gut unten beim 3rd prompt:



How to Vibe Your First Game With One Prompt
Making a game with AI isn't hard anymore.
Not a Flappy Bird clone either. I mean a first-person shooter with lighting, physics, weapons, sound and a HUD, built while you sleep. 
The proof isn't mine. @mattshumer_ dictated 152 words into Claude Code, asked for Call of Duty, and walked away. What came back was roughly 55,000 lines of JavaScript across 11 subsystems, running in a browser tab, with not one downloaded art asset in it.
Matt Shumer
@mattshumer_
·
Jul 25
Claude Opus 5 one-shotted this game.

EVERYTHING you see in this demo is custom code... not a single external asset was used.

AI games are going to be amazing.

(sound on)
0:03 / 0:56
The post did 2m views and the replies called it fake, so he published the repo and the prompt.
I assumed it was fake too because I been vibing my own game. So I ran his prompt exactly as written, no edits, no skills, no MCP, and got a playable shooter out of it for 20-30% of a week's usage on Max 20x after 12 hours.
Ziwen
@ziwenxu_
·
Jul 26
No way we just one shot COD at this quality.

Everyone thinks matt is joking. i thought so too. so i ran his exact prompt. this is what came out.

Turns out that he's not joking. 

Run the same prompt and you'll get the same thing. 
(Keep in mind it's takes a lot of token I
Show more
0:24 / 0:41
Quote
Ziwen
@ziwenxu_
·
Jul 26
This quality of the game is insane with only one prompt  x.com/ziwenxu_/statu…
So the building isn't the hard part anymore. Writing the words is, and that part hasn't gotten easier. Same model, same budget, same twelve hours: one prompt produces a shooter and the next produces a grey box.
By the end of this you'll know exactly why this one lands, and you'll have the same shape to fill in for whatever you're making.
Save this. You'll want it open the next time you write a long prompt.
What he actually did
(spoiler: almost nothing, and that's the point)
He used Claude Code running on Opus 5, the strongest model available to him, with the settings that let it keep working on its own and split itself into helper agents.
Then he turned everything else off. No add-ons. No pre-written rule files telling it how he likes code written. No connections to outside tools. All of that exists, most people building with AI reach for it first, and he deliberately left it out. His reasoning was that the extras get in the model's way and it's better to let it take the wheel.
He didn't write a design document either. He spoke three paragraphs into it. Here they are, complete, exactly as he gave them:
plaintext




I want you to build a first-person shooter at the level of the most recent Call of Duty games. It should be utterly perfect, visually beautiful, with every single thing done at AAA quality—from textures to physics to anything you could think of. 

Fan out sub-agents and have sub-agents tackle each one individually so that the game is utterly perfect. You should /loop on each item and have a separate sub-agent check it visually to ensure it looks triple A. That separate sub-agent should be a really harsh critic, and if it doesn't look triple A, it should keep going.

Don't stop until each sub-agent is utterly wowed with the quality when compared with the actual Call of Duty game. It should literally compare them side by side blind and say which one looks better. Do this in ThreeJS. /loop until it's utterly perfect. Fan out sub-agents and ultracode.








That's 152 words, and you can hear that it was spoken rather than typed.
Stripped of the enthusiasm, he asked for five things. Make it as good as Call of Duty. Break the work up and put a separate helper on each piece. Have a different helper look at the pictures and judge them harshly. Make that judge compare its screenshots against real Call of Duty screenshots without being told which is which. Don't stop until the judge is impressed.
The two odd words in there, "/loop" and "ultracode", aren't him being casual. They're commands the tool recognises, one telling it to keep going round again, the other to work at full tilt with helpers.
Then he left it running and went away.
The work wasn't in the setup. It was in what he chose not to give it.
WHY IT WORKS, PARAGRAPH BY PARAGRAPH
(three paragraphs, three completely different jobs)
One is the brief. One is the orchestrator. One is quality control. Once you can see them separately, you can write your own.
Paragraph one: the brief
"at the level of the most recent Call of Duty games"
Telling an AI to make something good forces it to invent its own standard, and it invents a generous one. Naming a real game hands over everything it already knows about that game: how a gun should feel to fire, how light falls down a corridor, how much clutter belongs on screen. None of that had to be written down.
"from textures to physics to anything you could think of"
Two examples, then he hands the list back. The examples work as a measuring stick, showing that one item here is a whole area of work rather than a small task. Then "anything you could think of" makes the AI responsible for finishing the list. It came back with eleven areas of work. Two were his. It worked out the other nine, and deciding what work even exists is the part people are worst at.
Paragraph two: the orchestrator
Read it again and notice it isn't about the game at all. It's a description of a small organization.
"Fan out sub-agents and have sub-agents tackle each one individually… have a separate sub-agent check it visually… should be a really harsh critic, and if it doesn't look triple A, it should keep going."
There are workers, one per area. There's a reviewer who didn't do the work. The reviewer has a temperament, harsh rather than encouraging. And there's a rule for what happens when the review fails, which is that it goes round again.
That's a staffing plan. Most people write prompts about the thing they want built. This one spends its entire middle paragraph on who does the work and who checks it, and none of it on the game.
The reviewer being a different agent is the part worth stealing. Anything that grades its own homework passes it. An AI that just built something still has its own intentions in mind, so asking whether the work is good gets you an answer about what it meant to do rather than what actually landed on screen. A separate reviewer with no memory of building it can only look at the picture.
And left unspecified, an AI reviewer is agreeable by default. It says "solid start" and your loop ends on round one with nothing built. "Really harsh" is three words that stop that.
Paragraph three: quality control
This is the part I normally do by hand. (But with this new prompt we don't have to)
Every time an agent gives me something back, I open it, look at it, decide whether it's good enough, and send it back with a note about what's wrong. That's most of my day, and paragraph three is that job written down and handed to the machine.
"compare them side by side blind and say which one looks better"
"Is this good enough yet?" has no real answer and drifts over a long run. "Which of these two is better?" can be answered, and it can come back as no, which is the entire point of having a check. Hiding which is which stops the reviewer quietly favouring its own work.
It also stops on a result rather than on effort. Most instructions are a list of steps, and work like that finishes when the steps run out, whether the outcome is any good or not. This one keeps going until something about the thing itself is true.
"Do this in ThreeJS."
The odd one out, sitting in the quality control paragraph because he was talking rather than typing and it landed where he remembered it. It's the only technical instruction in the whole prompt, and it did more than he probably intended. Running in a web browser meant there was nowhere to download artwork from, so the AI had to invent every texture and every sound itself.
WHAT YOU'LL ACTUALLY GET
(the honest part, before you spend a week of usage)
It isn't Call of Duty. I want to be straight about that, because the demo is impressive enough that people fill in the rest themselves.
The project scored itself. Eleven independent judges rated the build across four rounds and it finished at about 5 out of 10. In the blind side-by-side that the prompt itself demanded, every judge in every round picked the real Call of Duty frame. Not most rounds. Every one.
So the loop never actually succeeded by its own definition, and it never will, because a browser tab is not going to beat a 200GB game with a nine-figure art budget.
What you get instead is genuinely good and genuinely yours: a working, original, playable game where every texture and every sound was invented from scratch, and no part of it was downloaded from anywhere. For one paragraph and a day of waiting, that's a remarkable trade.
Just don't expect the thing to tell you it's done. It won't. You stop it.
NOW WRITE YOUR OWN
Strip the game out and what's left points at almost anything. A brief, an orchestrator, a quality control pass.
Name something instead of describing it. Don't ask for polished or professional or high quality, because the model decides what those mean and it's generous with itself. Name a thing that already has the quality you want, then give two examples of the work involved at the size you have in mind, and finish with "anything you could think of" so it completes the list itself.
Write the orchestrator as a staffing plan. Who does the work, who checks it, what happens when the check fails. The checker must be a separate worker that didn't build the thing, it must look at the output rather than the reasoning, and it must be told to be harsh.
Make quality control a comparison, not a score. Give it something real to sit beside, hide which is which, ask which is better.
Then the warning, because the instinct to tidy this up is strong and it's wrong.
The obvious criticism is that the prompt can never finish. That looks like a flaw and it's the reason it works. An unreachable bar means quality is simply a function of how long you let it run. Lower the bar to something the model can actually clear and it clears it, then stops improving, and you get exactly the mediocre result you asked for.
So keep the original wording. Keep "utterly perfect." Keep comparing against the best example in the category even though you'll lose. Fill in the brackets and change nothing else:
HINT: USE /goal in codex /loop in Claude or Cursor
You are the brake, not the prompt. Mine ended when my usage ran out, and that's the design working rather than failing. Decide up front what you're willing to spend, because that decision is your real finish line.
plaintext
I want you to build [what you want] at the level of [the best known example of it]. It should be utterly perfect, [what good looks like], 
with every single thing done at [top tier] quality, from [example area] to [example area] to anything you could think of.

Fan out sub-agents and have sub-agents tackle each one individually so that the [thing] is utterly perfect. 
You should /loop on each item and have a separate sub-agent check it to ensure it is [top tier]. That separate sub-agent should be a really harsh critic, and if it isn't [top tier], it should keep going.

Don't stop until each sub-agent is utterly wowed with the quality when compared with [the real example]. 
It should literally compare them side by side blind and say which one looks better. Do this in [your tool or stack]. /loop until it's utterly perfect. Fan out sub-agents and ultracode.
Finally 
It works on a landing page against a site you admire. A report, a deck, a design, a piece of writing. Nothing in the shape is about games.
The lesson underneath all of it is that he spent every one of his 152 words on aim and none on management. He said what good looked like, who would judge it, and when to stop, and let the machine work out how.
Most people do the opposite. They write pages about how, then wonder why the output is confidently wrong.
You now know which one you're writing. That's the whole edge.
I'm vibing my own game as well with agent loops in public. When I say a game prompt worked, it's because I ran it.



Weitere gute Prompts:
# 1 prompt

This is the entire prompt that produced this repository.

```
I want you to build a first-person shooter at the level of the most recent Call of Duty games. It should be utterly perfect, visually beautiful, with every single thing done at AAA quality—from textures to physics to anything you could think of.

Fan out sub-agents and have sub-agents tackle each one individually so that the game is utterly perfect. You should /loop on each item and have a separate sub-agent check it visually to ensure it looks triple A. That separate sub-agent should be a really harsh critic, and if it doesn't look triple A, it should keep going.

Don't stop until each sub-agent is utterly wowed with the quality when compared with the actual Call of Duty game. It should literally compare them side by side blind and say which one looks better. Do this in ThreeJS. /loop until it's utterly perfect. Fan out sub-agents and ultracode.
```





2 prompt: 
I want you to make me a game for the web. You can use ThreeJS, and it's gonna be a
 mountain biker game. Use as many sub-agents as you need to. You have to get in a loop. 
 Your sub-agents need to be thrilled with their own outputs and judge themselves and the output.
 It's gotta be 3D, with realistic audio sounds, sound effects, all that kind of stuff. You have to build all of it. 
 We don't have any other assets to start with. This is you crafting and creating a super fun mountain bike game. 
 Think about what that could look like, build it for me, and then we'll go from there. 






3rd prompt:
# Prompts

The prompts that specify the game, in the order they were given. Wording is unedited, typos
included.

---

## 1. The specification

Everything below arrived in one message.

```text
build a complete realistic FPS shooter game in threejs.


**core gameplay:**
- first person shooter, single player vs AI enemies
- WASD movement, mouse look with pointer lock on click
- left click to shoot, R to reload, shift to sprint, ctrl to crouch, space to jump
- sprint adds FOV push effect and lowers weapon slightly
- crouch lowers camera height and reduces movement speed
- jump with landing camera shake

**weapons system (switch with 1, 2, 3):**
- slot 1: assault rifle — full auto, 30 round mag, moderate spread that increases with sustained fire, semi-auto toggle with V key
- slot 2: shotgun — pump action, 8 shells, wide spread, high damage up close, pump animation between shots
- slot 3: pistol — semi auto, 15 rounds, accurate, fast draw speed
- each weapon needs a visible 3D viewmodel at bottom right — build them from three.js geometry (boxes, cylinders). add gloved hands holding the weapon
- weapon sway on mouse movement, bob when walking synced to footsteps
- muzzle flash (point light + sprite) on every shot
- shell casings that eject and bounce on the ground with physics
- reload animation (weapon dips down off screen and comes back)
- draw animation when switching weapons

**enemies (10 total):**
- humanoid models built from three.js geometry (capsule body, sphere head, box limbs)
- each enemy has a floating name tag and health bar above their head
- enemy names: VIPER, GHOST, REAPER, HAVOC, STRIKER, COBRA, TALON, WOLF, DIESEL, SHADOW
- enemies patrol waypoints around the map using simple pathfinding
- when they spot you (line of sight + distance check), they stop, aim, and shoot with human-like reaction delay (300-800ms random)
- enemies strafe left/right during combat
- headshot detection — 2x damage on head hitbox
- hit reaction animation (flinch backward)
- death animation (ragdoll-style fall, weapon drops to ground)
- enemies deal damage to player with visible red screen flash

**map design — abandoned warehouse district:**
- 60x60 unit play area
- concrete floor with grid texture (procedural)
- shipping containers (large colored boxes) placed as cover throughout
- two story building on one side with accessible second floor via ramp — gives sniper advantage
- long corridor between container stacks (close quarters)
- open center area with a destroyed vehicle (boxes arranged as car shape)
- chain link fence sections around the perimeter (thin planes with alpha)
- barrel stacks that block sightlines
- crate clusters for cover
- directional lighting with shadows casting from a sun position
- fog in the distance for atmosphere

**HUD:**
- crosshair center screen (dynamic — expands when moving/shooting, contracts when still)
- health bar bottom left with number (starts at 100)
- armor bar below health (starts at 50, reduces damage by 50%)
- ammo counter bottom right: current mag / total reserve
- weapon name and icon next to ammo
- kill feed top right — shows "YOU killed ENEMY" with headshot icon when applicable
- hit marker (white X flash) when you land a shot
- damage direction indicator (red arc on screen edge showing where damage came from)
- minimap top left showing player position, enemy dots (red when spotted), and map walls
- round timer top center counting down from 3:00
- kill counter: "X / 10 eliminated"

**audio (all procedural Web Audio API, no external files):**
- gunshot sounds per weapon (rifle = sharp crack, shotgun = deep boom, pistol = snap)
- reload sound (metallic click)
- footsteps synced to movement (concrete sound)
- bullet impact sounds (different for wall vs enemy)
- enemy death sound
- hit confirmation beep
- low health heartbeat warning when under 20hp
- ambient industrial hum in background

**post processing:**
- bloom on muzzle flash and bright lights
- vignette darkening at screen edges
- slight color grading (desaturated, slightly blue shadows)
- screen shake on taking damage and on shooting shotgun

**game flow:**
- start screen: "PRESS TO START" with title
- pointer lock activates on click
- kill all 10 enemies to win
- die or run out of time to lose
- end screen shows: kills, headshots, accuracy percentage, time survived
- restart button on end screen

**performance:**
- use merged geometries where possible to reduce draw calls
- shadow maps at 2048
- keep it running 60fps on mid-range hardware
- use instanced mesh for repeated objects like crates and barrels

make it feel like a real game. weight to the movement, punch to the guns, tension in the combat. not a tech demo.
```

---

## 2. Aim down sights, the sniper, and parkour

Added the fourth weapon, the scope, and the ability to climb onto things.

```text
aim-down-sights (ADS) for all weapons on right click:

assault rifle: FOV goes from 75 to 55, weapon model moves to center screen, tighter spread while aiming
shotgun: FOV goes from 75 to 60, slight zoom, weapon centers
pistol: FOV goes from 75 to 50, weapon raises to center with iron sight alignment
sniper: FOV goes from 75 to 15, full scope overlay with dark circular vignette and mil-dot crosshair lines, subtle scope sway (slow sine wave on x and y), hold shift while scoped to hold breath (sway settles to near zero for 3 seconds)

smooth transition in and out (0.2 sec lerp) for all weapons
reduce movement speed by 40% while ADS
right click to toggle ADS on/off
disable normal crosshair while using sniper scope

sniper rifle as slot 4: bolt action, 5 round mag, one shot kill to body, headshot instant kill
bolt cycle animation between shots (1.5 sec delay)
loud crack sound, visible bullet tracer line
switch weapons with 1-4 and scroll wheel

parkour/mantle: when player jumps near a container or crate edge and holds space, auto-mantle onto it (camera lifts up smoothly to the top)
player can stand and walk on top of containers, crates, the vehicle, and barrel stacks
double jump: tap space twice quickly for extra height
increase base jump height slightly so player can reach container tops with mantle
add collision on top of all objects so player doesn't fall through
```

---

## 3. The bug list

The longest correction of the project. Collision, enemy AI and weapon reliability were all
rebuilt off the back of it.

```text
the game has major bugs that need fixing before this is shareable. go through everything and fix all of these:

**collision bugs (highest priority):**
- player can walk through some walls. every single wall, container, crate, barrel, and building must have solid collision. the player should never pass through any object. check every single object in the scene has a collider and that the collision detection actually works
- enemies are getting stuck inside containers and walls. add collision checks for enemy pathfinding so they navigate AROUND objects, never through them. if an enemy is stuck, teleport them to the nearest valid position outside any object
- enemies stuck inside containers can still shoot the player but player can't shoot back. fix this — if there's no clear line of sight between player and enemy (raycast hits a wall/container), the enemy cannot deal damage

**enemy AI fixes:**
- enemies should never walk into walls or containers. their pathfinding needs to respect all solid objects
- enemies should never stand still in the open doing nothing. if they're not in combat, they patrol. if they spot the player, they engage immediately
- enemies should take cover behind containers and crates during combat, not just stand in the open
- if an enemy can't reach the player, they should find an alternative path, not freeze

**weapon and shooting fixes:**
- make sure every weapon actually fires when clicking. if there's any delay or missed input, fix it
- muzzle flash needs to be visible and punchy — bright flash + point light for 2 frames
- bullet hit detection needs to be accurate. if crosshair is on the enemy, the bullet should hit. no phantom misses
- shell casings should eject properly from the right side of the weapon
- reload should feel smooth — weapon dips, mag change sound, weapon comes back
- ADS (aim down sights) on right click must work for every weapon. if it's broken, fix it
- sniper scope overlay must appear on right click with the sniper equipped

**general polish:**
- make sure the player cannot leave the map boundaries. add invisible walls at all edges
- fix any z-fighting or flickering textures
- make sure the minimap accurately shows wall positions and enemy dots
- death screen and win screen must work properly with accurate stats
- fix any console errors

test everything after fixing. walk along every wall. try to walk through every container. watch every enemy for 30 seconds to make sure they're not stuck. fire every weapon and confirm it works. this needs to feel like a finished game, not a broken prototype.
```

---

## 4. The crosshair

```text
replace the current crosshair with a valorant-style competitive crosshair:

**inner lines:**
- 4 lines (top, bottom, left, right)
- each line is 4px long, 2px thick
- offset 1px from center (small gap in the middle)
- color: white with thin black outline for visibility on any background
- no center dot

**outer lines:**
- 4 lines (top, bottom, left, right)
- each line is 3px long, 2px thick
- offset 2px from the end of the inner lines (gap between inner and outer)
- same white with black outline

**behavior:**
- crosshair stays static when standing still
- inner lines expand outward when moving or shooting (dynamic spread)
- inner lines return to default position when standing still and not firing (0.15 sec lerp back)
- outer lines don't move
- no firing error on outer lines
- no movement error on outer lines
- crosshair disappears when using sniper scope ADS
- crosshair stays visible for all other weapons during ADS

draw this with canvas overlay, not HTML elements. needs to be pixel-perfect and centered.
```

---

## 5. Enemy aim, the sky, and the M4 optic

Sent with two screenshots: one looking up at the zenith, one down a container lane.

```text
time to fix some bugs, enemeies guns are pointing backwards if you see while shooting and our sky looks pixelated like you can see here and 
one more thing zooming in in m4 carbine is like trash i mean theres' no use if i can't zoom in more and see enemy
```
