# Prompt-Erstellungsleitfaden: Das Beste aus drei Prompt-Ansätzen

Dieser Leitfaden kombiniert die stärksten Elemente der drei Referenzprompts. Kein Prompt muss vollständig kopiert werden; entscheidend ist ein sinnvoller Mix für das jeweilige Projekt.

## Aktuelle Sichtprüfungs- und Browserregel

Die zitierten Originalprompts unten sind Quellenmaterial, keine automatisch gültigen Arbeitsanweisungen.

Eigene Prompts sollen zunächst zusammenhängende Änderungen umsetzen und anschließend die günstigsten geeigneten Prüfungen verwenden

Ein Prompt darf dem Agenten ausdrücklich die aktuelle Erlaubnis geben, die bereits vorhandene Browser-, Preview-, Computer-Use-, Screenshot-, Gameplay- oder Performance-Funktion seiner Umgebung für die finale integrierte Prüfung zu verwenden.

Du gibst also in dem Prompt die Befugnis, ob Sichtprüfungen und Subagents verwendet werden dürfen und die KIs müssen sich danach halten!

Der Agent soll mittels CLI wege, Screenshots erstellen, sei es playwright cli oder eigenes CLI inbuild Screenshot system, Ziel ist es so wenig wie möglich RAM und CPU zu verbrauchen


Ein projektspezifisches Capture-CLI ist freiwillig und nur sinnvoll, wenn:
* der User es ausdrücklich verlangt,
* das Projekt es bereits besitzt,
* reproduzierbare Engine-Aufnahmen selbst Teil des Produkts sind,
* oder die vorhandene Browserprüfung die relevante Oberfläche technisch nicht prüfen kann.

Die Sichtprüfung bewertet bevorzugt die final integrierte Anwendung und nicht jede isolierte Komponente.

## Empfohlener Mix

* **Prompt 1 als Grundlage:** klares Qualitätsvorbild, spezialisierte Sub-Agenten und unabhängige fachliche Kritik
* **Prompt 2 für kreative Freiheit:** Ziel und Spielgefühl benennen, ohne jede Lösung technisch vorzuschreiben.
* **Prompt 3 für Tiefe und Performance:** konkrete Anforderungen an Architektur, Messbarkeit, Laufzeit, LOD, Culling, Instancing und stabile Integration übernehmen.
* **Gesamtziel:** ambitionierte Qualitätsansprüche mit klaren technischen Leitplanken, realen Messwerten und einer begrenzten integrierten Abnahme verbinden.

## Pflichtblock bei Runtime-VFX

Jeder neue Prompt mit Skill-, Kampf-, Monsterangriffs-, Boss-, Telegraph-, AoE-, Trail-, Impact- oder Bodeneffekt-Scope trägt den Quellenvertrag direkt oder verlinkt [`threejs/VFX.md`](../threejs/VFX.md):

- Sichtbare Effektformen entstehen aus eigenem handgeschriebenem Shadercode und laufzeitgenerierter Geometrie; bei Three.js/WebGL heißt das GLSL, bei einem anderen Renderer dessen nativer Shaderpfad.
- Verboten: Bitmap-/Noise-/LUT-/Decal-Texturen als Effektquelle, Sprite-Sheets, Flipbooks, Videos, gebackene VFX-Meshes, importierte Effektpakete und kopierte Fremdshader.
- Rendererinterne Depth-/Color-Targets, Charakter-/Weltassets und UI-Icons bleiben erlaubt, dürfen aber keine versteckten Effekt-Flipbooks oder gebackenen Skillflächen liefern.
- Qualitätskette im Prompt: `First Read → Anticipation/Release → Raumweg → Kontakt → Reaktion → Folge/Recovery`; Gameplay, Animation, VFX, Sound und Bodenreaktion teilen Cast-ID, Zeitpunkt und Raumanker.
- Jeder Effektbrief benennt dominante Silhouette, Material-/Lichtrollen, Blend-/Depth-Rolle, exakten Footprint, feste Kapazität, Degradation und sichtbare Unterschiede zu Nachbareffekten.
- Referenzen liefern Qualitätsgründe, nie kopierbare Skills. `LinearAbiltyCastingThreeJS` unter [`WINDOWS-RESSOURCEN.md`](../WINDOWS-RESSOURCEN.md) ist die lokale Gegenprobe für prozedurale Layer, AoE-Zielbilder und Live-Tuning.

## Kernprinzip aus Prompt 1

### Originalprompt von Matt Shumer

Der kurze Prompt zeigt die stärkste Grundstruktur: Referenzqualität, Aufgabenteilung, unabhängige Prüfung und wiederholte Verbesserung.

```text
I want you to build a first-person shooter at the level of the most recent Call of Duty games. It should be utterly perfect, visually beautiful, with every single thing done at AAA quality—from textures to physics to anything you could think of. 

Fan out sub-agents and have sub-agents tackle each one individually so that the game is utterly perfect. You should /loop on each item and have a separate sub-agent check it visually to ensure it looks triple A. That separate sub-agent should be a really harsh critic, and if it doesn't look triple A, it should keep going.

Don't stop until each sub-agent is utterly wowed with the quality when compared with the actual Call of Duty game. It should literally compare them side by side blind and say which one looks better. Do this in ThreeJS. /loop until it's utterly perfect. Fan out sub-agents and ultracode.
```

### Warum dieser Ansatz funktioniert

- **Konkrete Referenz statt vager Qualität:** Ein reales Vorbild definiert Atmosphäre, Detailgrad und Qualitätsniveau besser als Wörter wie „professionell“ oder „poliert“.
- **Beispiele mit offenem Umfang:** Zwei konkrete Bereiche geben den Maßstab vor; „anything you could think of“ überträgt dem Modell die Verantwortung, fehlende Arbeitsbereiche zu ergänzen.
- **Sub-Agenten als Fachbereiche:** Große Aufgaben werden in klar getrennte Verantwortungsbereiche zerlegt.
- **Unabhängige, harte Kritik:** Der Reviewer bewertet Architektur, Funktion, Zahlen und das integrierte Produkt statt Absicht oder Aufwand; erlaubte Browserprüfung folgt erst nach der Integration.
- **Vergleich statt Selbstbewertung:** Reproduzierbare Zahlen, Referenzmerkmale und Gegenbeweise liefern zuerst die Entscheidung; ein visueller Side-by-Side-Vergleich bleibt gezielt und begrenzt.
- **Iteration bis zur objektiven Grenze:** Konkrete Funde führen zu einer gezielten Änderung; kein weiterer Prüfloop ohne geänderten Kandidaten oder neue Frage.

### Empfohlener Aufbau eigener Prompts

1. **Brief:** Was soll entstehen und welches reale Vorbild setzt den Qualitätsmaßstab?
2. **Qualitätsmerkmale:** Welche zwei bis fünf Bereiche zeigen konkret, was „gut“ bedeutet?
3. **Orchestrierung:** Welche Fachbereiche bearbeiten spezialisierte Sub-Agenten?
4. **Qualitätskontrolle:** Wer prüft Architektur, Funktion, Zahlen und Gegenbeweise unabhängig? Welche vorhandene Browser- oder Preview-Funktion darf der integrierte Kritiker im aktuellen Auftrag nutzen?
5. **Performance und Messung:** Welche Budgets, Messwerte oder Tests sichern die technische Qualität?
6. **Iterationsregel:** Nur eine materielle Änderung oder eine neue konkrete Frage öffnet einen weiteren Review-Durchlauf.

**Hinweis:** Nutze `/goal` in Codex und `/loop` in Claude oder Cursor, sofern die jeweilige Umgebung diese Befehle unterstützt. Ein absichtlich sehr hoher Qualitätsmaßstab fördert Verbesserungen; die tatsächliche Grenze bilden Zeit, Budget und technische Machbarkeit.

### Wiederverwendbare Vorlage

```text
I want you to build [what you want] at the level of [the best known example of it].

It should be [what good looks like], with every important area completed at [quality level], from [example area] to [example area] to any other area required for a coherent final result.

Use [reference A] only for [specific quality or subsystem].
Use [reference B] only for [specific quality or subsystem].
Copy no proprietary asset, branding, character, map, UI, audio, lore or exact design.

Fan out sub-agents by specialty.
Each sub-agent owns one coherent area and must follow the same shared contracts, schemas and acceptance criteria.

Integrate the full product before independent review.

Run static, structural, functional, regression and performance checks first.

This prompt grants current permission for agent-driven browser, screenshot, interaction and performance checks of the final integrated build.

Use the browser, preview or computer-use capability already available in the current environment.
Do not build a custom screenshot CLI or capture pipeline unless the user explicitly requests it or the project already requires it.

Establish a fair acceptance viewport, inspect representative states and review the integrated product rather than every isolated component.

The critic returns the single strongest concrete gap with evidence, an owner and an exact acceptance condition.

Route that gap to its owner, integrate one coherent correction and rerun the relevant bundled checks.

Run another critic pass only after a material change or a new concrete question.
Never create an automatic per-camera, per-phase, per-component or endless screenshot loop.

Never invent approval, a visual win or measured performance.
If a fair review cannot run, leave it as an explicit user acceptance gate.

Do this in [tool, engine or stack].
```

Die Vorlage funktioniert nicht nur für Spiele, sondern auch für Websites, Berichte, Präsentationen, Designs und andere kreative oder technische Ergebnisse.

---

## Drei Referenzprompts

### Prompt 1: Call-of-Duty-inspirierter FPS

Historischer Originaltext mit maximalem Qualitätsanspruch. Seine visuelle Dauerschleife nicht übernehmen; für neue Prompts gilt ausschließlich die aktuelle Sichtprüfungs- und Browserregel oben.

```text
I want you to build a first-person shooter at the level of the most recent Call of Duty games. It should be utterly perfect, visually beautiful, with every single thing done at AAA quality—from textures to physics to anything you could think of.

Fan out sub-agents and have sub-agents tackle each one individually so that the game is utterly perfect. You should /loop on each item and have a separate sub-agent check it visually to ensure it looks triple A. That separate sub-agent should be a really harsh critic, and if it doesn't look triple A, it should keep going.

Don't stop until each sub-agent is utterly wowed with the quality when compared with the actual Call of Duty game. It should literally compare them side by side blind and say which one looks better. Do this in ThreeJS. /loop until it's utterly perfect. Fan out sub-agents and ultracode.
```


### Prompt 2: 3D-Mountainbike-Spiel

Kurzer, offener Prompt mit viel kreativer Freiheit für das Modell.

```text
I want you to make me a game for the web. You can use ThreeJS, and it's gonna be a
 mountain biker game. Use as many sub-agents as you need to. You have to get in a loop. 
 Your sub-agents need to be thrilled with their own outputs and judge themselves and the output.
 It's gotta be 3D, with realistic audio sounds, sound effects, all that kind of stuff. You have to build all of it. 
 We don't have any other assets to start with. This is you crafting and creating a super fun mountain bike game. 
 Think about what that could look like, build it for me, and then we'll go from there.
```



### Prompt 3: Ghost-of-Tsushima-inspirierte 3D-Welt

> **Wichtig:** Prompt 3 ist bewusst sehr lang und detailliert. Er eignet sich als Baukasten für umfangreiche Projekte. Seine spezielle Engine-Capture- und Screenshot-Technik ist jedoch nur eine optionale Projektfähigkeit. Für normale Agenten-Workflows soll bevorzugt die bereits vorhandene Browser-, Preview- oder Computer-Use-Funktion der aktuellen Umgebung verwendet werden. Es wird kein neues Capture-System gebaut, sofern der User dies nicht ausdrücklich verlangt oder das Projekt es technisch benötigt.

```text
Create Claude of Tsushima Game Task

I want you to build the most visually impressive first-person fantasy world possible in Three.js, at the environmental quality level of Ghost of Tsushima.

Ghost of Tsushima is the visual benchmark for lighting, vegetation density, terrain composition, atmosphere, cinematic framing, environmental detail and overall world beauty. Use the Ghost of Tsushima screenshots I provide as direct visual reference material and as the quality bar throughout development.

Do not copy its exact locations, characters, architecture or assets. Build a completely original world that reaches the same level of visual cohesion, atmosphere and environmental craftsmanship.

The environment is the main feature.

Create a large, seamless and highly realistic explorable world containing:

* windswept grasslands with extremely dense animated grass
* forests, bamboo groves, flower fields and ancient trees
* mountains, valleys, cliffs, rivers and waterfalls
* shrines, villages, bridges, ruins, camps and forgotten paths
* strong elevation changes and cinematic distant landmarks
* drifting leaves, pollen, mist, dust, birds, insects and subtle wildlife
* carefully composed scenes that remain beautiful from every important viewing angle

The world must feel handcrafted, alive and immersive—not like procedurally scattered objects, disconnected biomes or an empty terrain demo.

Vegetation should use layered wind animation and react near the player. Grass, flowers, bushes and trees must have natural variation in scale, density, direction, shape and placement. Avoid obvious repetition, uniform distribution, visible grids and duplicated silhouettes.

Terrain must feel naturally formed and should blend convincingly between soil, grass, stone, mud, water and paths. Avoid flat surfaces, sharp texture borders, floating objects, exposed primitive geometry and repetitive procedural noise.

Lighting must be one of the strongest parts of the experience.

Use cinematic sunlight, soft contact shadows, atmospheric perspective, fog, light shafts, reflected light, natural exposure, realistic water reflections and carefully controlled color grading.

Every major location should have intentional visual composition, foreground detail, a readable middle ground and impressive distant scenery.

Add simple first-person gameplay:

* WASD movement
* mouse look
* sprint, crouch and jump
* left click for a fast melee attack
* right click for a heavy attack or defensive block
* a visible first-person sword or similar melee weapon
* polished weapon sway, attack animation, trails, hit effects, camera feedback and spatial sound

Keep the gameplay simple. Do not spend the majority of development time on menus, quests, inventory systems, dialogue, progression systems or complicated mechanics.

Populate the world with small, deliberately placed enemy encounters.

Include three or four visually and behaviorally distinct enemy types:

* a standard melee swordsman
* a heavily armored defensive warrior
* a fast spear fighter or agile rogue
* a ranged archer who uses distance and elevation

Enemies should patrol roads, guard camps, occupy ruins and protect important landmarks. They should react to the player, navigate around environmental objects and fight with readable attacks.

Encounters should normally contain one to four enemies. Do not fill every area with combat. Large parts of the world should remain peaceful so the environment can breathe.

Enemies must never walk through rocks, trees, buildings, cliffs or other solid objects. They must not float, clip into terrain, become trapped or attack through blocked lines of sight.

Use hit reactions, stagger animations, basic death animations, weapon trails, dust, sparks and satisfying sound effects. Combat should look polished but remain secondary to the world itself.

## Optionale integrierte Browser-Abnahme

Ein Prompt darf für den aktuellen Auftrag die agentische Browser-, Preview-, Screenshot-, Gameplay- und Performance-Prüfung ausdrücklich erlauben.

Der Agent verwendet dafür die bereits vorhandenen Fähigkeiten seiner aktuellen Umgebung.

Vor der Prüfung wird eine faire Akzeptanzansicht hergestellt:

* Vorschau maximieren
* relevante Spielfigur oder Oberfläche zentrieren
* Debug-Overlays ausblenden
* UI lesbar halten
* repräsentative Zustände aufrufen
* normale Auflösung und sinnvolle Kamera verwenden
* vollständiges Laden abwarten

Geprüft wird die finale integrierte Anwendung.

Die Prüfung darf repräsentative Interaktionen, Screenshots und Performancewerte verwenden.

Sie soll nicht jedes Objekt, jede Kamera, jeden Skill oder jede Phase einzeln prüfen.

Der unabhängige Kritiker meldet genau den stärksten konkreten Mangel mit:

* Beleg
* betroffenem System
* verantwortlichem Owner
* überprüfbarem Akzeptanzkriterium

Nach einer kohärenten Korrektur werden die betroffenen statischen, funktionalen und regressiven Prüfungen erneut ausgeführt.

Ein weiterer visueller Durchlauf ist nur nach einer materiellen Änderung oder einer neuen konkreten Unsicherheit erlaubt.

Es gibt keine automatische Screenshot-Schleife.

Ein eigenes Capture-CLI wird nur eingesetzt, wenn es bereits existiert, ausdrücklich verlangt wurde oder selbst Teil des Projektziels ist.

## Sub-agent orchestration

Fan out specialized sub-agents and assign each major visual area to a separate agent:

* terrain and world composition
* vegetation and wind
* trees, forests and bamboo
* lighting and atmosphere
* water and reflections
* architecture and landmarks
* materials and environmental blending
* first-person animation
* enemy design and combat
* VFX and environmental particles
* audio
* performance optimization

Sub-Agenten prüfen ihre isolierten Ergebnisse bevorzugt statisch, strukturell und numerisch.

Die visuelle Hauptprüfung erfolgt nach der Integration durch einen unabhängigen Kritiker.

Dieser Kritiker bewertet das zusammengesetzte Produkt und nicht jedes Sub-Agent-Ergebnis einzeln.

Ein Auftrag darf dem Kritiker ausdrücklich erlauben, die vorhandene Browser-, Preview- oder Computer-Use-Funktion zu bedienen.

Der Kritiker soll keinen eigenen Browser-Harness oder Capture-Stack bauen.

Er gibt genau den stärksten konkreten integrierten Mangel zurück.

Eine weitere Prüfung erfolgt erst nach einer materiellen Änderung oder einer neuen konkreten Frage.

## Optionale Referenzprüfung

Verwende die genannten Spiele oder bereitgestellten Bilder zunächst, um konkrete Qualitätsmerkmale zu definieren:

* Komposition
* Bewegung
* Gewicht
* Timing
* Beleuchtung
* Materialwirkung
* Dichte
* Atmosphäre
* Lesbarkeit
* Performance

Prüfe alles, was sinnvoll statisch, strukturell, funktional oder numerisch geprüft werden kann, bevor eine visuelle Bewertung erfolgt.

Wenn der aktuelle Prompt die Browserprüfung erlaubt, darf der unabhängige Kritiker die final integrierte Anwendung über die vorhandene Browser- oder Preview-Funktion untersuchen.

Ein fairer Vergleich kann:

* identische Zustände
* identische Kameras
* repräsentative Bewegungen
* ein blindes A/B
* oder eine einzelne entscheidende Vergleichsansicht

verwenden.

Der Reviewer nennt genau einen konkreten Unterschied und eine umsetzbare Korrektur.

Nach der Korrektur ist ein weiterer Vergleich nur erlaubt, wenn die Änderung oder eine neue konkrete Frage dies wirklich erforderlich macht.

Kein automatischer Vergleich über jede Kamera, Szene, Klasse, Animation oder Variante.

Die endgültige visuelle und geschmackliche Abnahme darf weiterhin beim User liegen.

Use Ghost of Tsushima as an intentionally difficult and possibly unreachable quality bar. Do not lower the benchmark just so a reviewer can declare success.

The final result should not feel like a Three.js demonstration. It should feel like a playable first-person slice of a modern AAA open-world game where the landscape itself is the main attraction.

Use instancing, LOD systems, culling, optimized shadows, reusable materials, object pooling, adaptive vegetation density and intelligent world streaming to maintain stable performance without making the environment feel empty.

Fan out specialized sub-agents, build the strongest coherent integrated result, validate architecture, functionality and measured runtime, and use the current environment’s existing browser or preview capability for a bounded final review when the prompt explicitly authorizes it.

Do not build a custom capture system by default.

Use project-owned capture tooling only when it already exists, is explicitly requested or is itself required by the product.

The integrated critic returns one evidenced gap and one responsible owner.

Further review requires a material change or a new concrete question.

Never invent approval, performance results or a visual win.

Bild 1: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1785249477528-g5umsca3.png
Bild 2: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1785249510257-2fgbc1vu.png
Bild 3: C:\Users\PC1\AppData\Local\Temp\uniai-chat\clipboard-1785249557816-6gqqx3dx.png
```

Ziel des Systems

Dieses System erstellt kompakte, aber präzise Prompts, indem es bekannte Spiele, Systeme und Mechaniken als Referenzen verwendet.

Anstatt jede Funktion von Grund auf ausführlich zu beschreiben, soll festgelegt werden:

Welche Referenz steht für welches Teilsystem?
Welche Eigenschaften sollen übernommen werden?
Welche Referenzen sollen miteinander kombiniert werden?
Welche Referenz ist für die aktuelle Aufgabe am besten geeignet?

Die KI kennt die grundlegenden Eigenschaften bekannter Spiele und kann diese Referenzen in konkrete Mechaniken, Animationen, Kameraarbeit, Steuerung, VFX, Sound und Spielgefühl übersetzen.

Grundprinzip

Beschreibe nicht unnötig von A bis Z, wie ein System funktionieren soll, wenn bereits eine passende Referenz existiert.

Nicht:

Das Waffensystem muss präzise, reaktionsschnell, kraftvoll und hochwertig sein. Waffen benötigen gutes Trefferfeedback, überzeugende Animationen, starken Rückstoß und befriedigende Sounds.

Sondern:

Das Gunplay und Waffenfeedback sollen sich an den modernen Call-of-Duty-Spielen orientieren.

Die Referenz ersetzt jedoch nicht alle Anforderungen. Sie dient als kompakte Qualitäts- und Designrichtung. Projektspezifische Unterschiede müssen weiterhin klar genannt werden.

Kombination mehrerer Referenzen

Verschiedene Bereiche dürfen sich an unterschiedlichen Spielen orientieren.

Beispiel:
Grundlegendes Spielgefühl und große Schlachten: Battlefield
Gunplay, Waffenanimationen und Trefferfeedback: Call of Duty
Third-Person-Bewegung und Schwertkampf: Ghost of Tsushima
...