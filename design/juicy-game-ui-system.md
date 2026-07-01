D:\CODING\React Projects\games\crossword-core-breaker

# Juicy Game-UI System — Motion, „Fake-3D" & Visual Language

> **Cross-Game Styleguide.** Beschreibt, *wie* man die schöne, animierte, aufgeräumte
> Spiel-UI baut, die in **Crossword Core Breaker** (Hauptmenü-Overhaul „Opus v6")
> entstanden ist — als **wiederverwendbares System für weitere Spiele** im
> `games/`-Monorepo (Quiz Blaster Arena, Voxel Samurai Quiz, …).
>
> Diese Datei ist bewusst **engine-/palette-neutral** geschrieben: Sie erklärt das
> *Muster*. Die konkrete CCB-Umsetzung (Warm-Stone-Palette) steht in
> `crossword-core-breaker/DESIGN.md`; die Referenz-Dateien sind unten verlinkt.

**Stack-Annahme:** React + TypeScript, **Framer Motion** (`motion/react`),
Tailwind, optional React-Three-Fiber für *eine* Live-3D-Insel. Lucide-Icons.

---

## 0. TL;DR — die 7 Regeln, die den Look ausmachen

1. **Alles rund.** Karten/Container `rounded-2xl … rounded-3xl` (bevorzugt `rounded-3xl`), Buttons `rounded-xl/2xl`. Nichts Eckiges.
2. **Solide, warme Flächen + gestaffelte Tiefe.** Keine `bg-black/40`-Opacity-Hacks. Stattdessen 3–4 solide Hex-Stufen, die Tiefe erzeugen.
3. **Glow lebt in Rand + Titel + Icon, nicht in der Füllung.** Die Fläche bleibt ruhig; die Farbidentität sitzt am Rand/Akzent.
4. **Eine zusammenhängende gerundete Leiste/Konsole pro Region.** Lose Einzel-Elemente wirken unaufgeräumt — gruppieren.
5. **Idle-Leben + Reaktions-Juice.** Hero-Elemente pulsieren leise (Infinite-Loops); alles Klickbare hebt sich bei Hover und drückt sich bei Tap.
6. **„Fake-3D" statt teurer Canvas.** Lit-Logo, Glow-Halos, CSS-Dioramen, driftende Motes. Echte R3F nur als *eine* bewusste Insel.
7. **Semantische Akzentfarben.** Primär/Bestätigen = Haupt-Akzent (solide, Shine), Erfolg/Belohnung = Gold, Gefahr/Abbruch = heiße Warnfarbe (nur Outline).

---

## 1. Stil-Analyse — warum die Referenz funktioniert

Beobachtet an den gelobten Screens (Hauptmenü, „Hangar", Sanctuary/Dungeon-Karten, beleuchtetes Logo):

- **Aufgeräumt:** Jede Zone ist *eine* gerundete Karte. Der Kopf bündelt Logo + Werte + Schnellzugriff in **einer** Leiste statt vier loser Knöpfe.
- **Warm & hochwertig:** gedämpfte, warme Töne statt grellem Neon; Tiefe durch Schatten/Glow, nicht durch harte Linien.
- **Lebendig, aber ruhig:** Dinge atmen (Kern pulsiert, Fackeln flackern), ohne zu zappeln. Reaktionen sind sofort spürbar (Hover-Lift, Tap-Druck).
- **Lesbare Hierarchie:** großer Gradient-Titel, kleines getracktes Eyebrow-Label darüber, klare Bedeutungsfarben.
- **Distinkte Karten je Typ:** Modus-Karten ≠ Map-Karten ≠ Charakter-Karten. „Alles sieht gleich aus" wird bewusst vermieden (eigene Motiv-Banner/Akzent-Spines).
- **Tiefe ohne 3D-Kosten:** die Arena-Vorschauen sind reine CSS-Dioramen — sehen aus wie Mini-3D-Szenen, kosten aber fast nichts.

---

## 2. Token-System (für ein neues Spiel definieren)

Lege **ein** Token-Objekt an (`config/constants.ts` → z. B. `THEME`/`WARM_STONE`).
Minimal-Set für den Look:

| Rolle | Zweck | CCB-Beispiel |
|------|-------|--------------|
| `BASE` / `LIGHT` / `DARK` | neutrale Material-Töne (Flächen, Kanten, Schatten) | Sand-Trio |
| `FRAME` | Rahmen/Metall/Corner-Brackets | `BRONZE #a87341` |
| `ACCENT` (Primär) | Haupt-Akzent, Primärbutton, „Ready" | `AMBER #ffb347` |
| `HOT` (Warnung) | Schaden/Gefahr/Abbruch, „Charging" | `EMBER #ff6b2c` |
| `REWARD` | Erfolg/Belohnung/Credits/Shield | `GOLD #e8b04a` |
| `INK` | dunkler Text auf hellem Akzent + tiefster Hintergrund | `#1a120b` |
| `PAPER` | heller Text auf dunkler Fläche | `PARCHMENT #f0d9b5` |
| `BG` | App-/Szenen-Hintergrund | `#241608` |

**Regel:** Akzent-Themes ändern nur `ACCENT/HOT/REWARD`, **nie** die Surface-Skala.
So bleibt jedes Spiel im selben „Möbel"-System, nur anders eingefärbt.

### Surface-/Tiefen-Skala (das Geheimnis der Tiefe)

Statt Transparenz → **gestaffelte solide Hex-Stufen**. Je tiefer „im" UI, desto dunkler:

```
BG        #241608   ← Szene/App
Panel-1   #160f08 / #15100a   ← große Karte / Konsole
Panel-2   #1a120b / #2a1d0e   ← Karte aktiv / hervorgehoben
Inset     #0e0a06             ← eingelassene Felder (Banner, Slots, Inputs)
```

**Borders** immer mit Hex-Alpha aus `FRAME`/`ACCENT`, so dezent wie möglich:
`` `1px solid ${FRAME}44` `` (ruhig) … `` `${ACCENT}` `` (aktiv/selektiert).
Alpha-Suffixe sind dein Lautstärkeregler: `22 33 44 55 66 88 aa cc`.

### Farb-Pop — gesättigter Akzent auf tiefem Warm-Schwarz (warum CCB knallt)

Der stärkste Farb-Hebel ist **Kontrast**. Ein Panel wirkt „billig/blass", wenn
**gedämpfte** Akzente auf **neutralem Grau** sitzen. Es „knallt", wenn **gesättigte**
Akzente (`AMBER #ffb347`, `EMBER #ff6b2c`, `GOLD #e8b04a`) auf **tiefem, sattem
Warm-Schwarz** (`#15100a` → `#1e160d`) liegen — dieselben Komponenten, nur andere Tokens.

**Regeln:**
- **Grund tief & warm, nicht neutral-grau.** Neutrale App-Dark-Tokens (`--surface-2 #111`) sind absichtlich unauffällig und nehmen dem Akzent die Kraft. Für einen Spiel-/Hub-Look die Surface-Skala auf warmes Schwarz umdefinieren.
- **Akzent voll gesättigt halten.** Ein „mattes" Primär-Gold (viele App-Themes) reicht nicht; der Core-Akzent muss satt sein (`hsl(33 100% 64%)`), sonst kein Pop.
- **Kontrast ist Pflicht, nicht Deko.** Titel-Gradient `PARCHMENT → AMBER → EMBER`, Glows/Spines/Motes am rohen `--primary`/`--status-*`, Text immer Parchment.
- **Anti-Pattern:** „muted Token auf Grau" → wirkt tot. Nie erwarten, einen gedämpften Akzent auf neutralem `#111` überhaupt zu sehen.

**Umsetzung in NoteDrill (SSoT):** Ein gescopetes Token-Override `.warm-stone-console`
(`app/styles/globals/globals-warm-stone-console.css`) setzt Surfaces + `--primary` +
`--status-*` für einen Teilbaum neu. Weil die Juice-Komponenten token-basiert sind,
recolort das den kompletten Teilbaum ohne Markup-Umbau.

Die **wiederverwendbaren Bausteine** (JS-Spiegel + Komponenten) liegen zentral in
`lib/shared/juicy-console/` (SSoT, parallel zu `lib/shared/subjects/`): `juicy-accents.ts`
(`WARM_STONE`/`ACCENT_HEX`/`accentGlow`/`consoleShadow`), `JuicyHero` (selbst-scopende
Hero-Konsole), `JuicyConsole`/`JUICY_CONSOLE_SHELL` (Hülle für bestehende Katalog-Wurzeln),
`JuicyStatPill`, `JuicyShineCta`, `LitLogo`, `DriftMotes`, `useJuicyTilt`. Jeder Hub komponiert
damit Hero + `warm-stone-console dark`-Scope in wenigen Zeilen statt den Look zu duplizieren.
`app/learning-cards/(overviewSection)/(juice)/` ist nur noch ein dünnes Re-Export-Shim darauf.

**Theme-adaptiv (Stand 2026-07-01):** Der Scope kann jetzt hell ODER dunkel:
- `.warm-stone-console` (Basis) → **WARM-HELL**: gesättigtes, aber TIEFES Amber (`hsl(30 90% 45%)`, damit es auf Creme kontrastiert — helles `#ffb347` würde auf Creme verschwinden) auf warmem Creme (`#ede2cc → #fffefb`). Dieselbe Kontrast-Regel, nur invertiert: **tiefer, satter Akzent auf hellem, warmem Grund**.
- `.dark .warm-stone-console` / `.warm-stone-console.dark` → **WARM-DUNKEL**: helles Amber `#ffb347` auf Warm-Schwarz (die Original-Werte).

**Anwendung:** `class="warm-stone-console"` **ohne** `dark` → folgt dem App-Theme (Hell = Creme-Pop, Dunkel = Warm-Schwarz-Pop). Genutzt für API-Key-Dialog, Friends, Planner. `class="warm-stone-console dark"` → **Force-Dark**, bleibt immer dunkel und aktiviert die Tailwind-`dark:`-Varianten der Kinder (nötig bei Preview-Kacheln wie `bg-white dark:bg-surface-5`). Genutzt für die **4 Hub-Konsolen**: Lernkarten-Dashboard, Quiz (`QuizHubHero` + `QuizCatalogSection`-Wurzel), Kreuzworträtsel (`CrosswordHubHeader` + `CrosswordBrowserSection`-Wurzel) und Spickzettel (ganze `CheatsheetSection`-Wurzel). Details: `DESIGN.md → „Juicy Warm-Stone-Konsole"`.

---

## 3. Motion-System — das „Juice"-Vokabular

Alle Snippets sind `motion/react`. **Sechs** Bausteine erzeugen praktisch den
gesamten Look. Mische sie, erfinde nichts Neues ohne Grund.

### 3.1 Entrance + Stagger (jedes Panel kommt rein)
```tsx
<motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.06 * index }} />
```
Header von oben (`y:-22`), Seiten-Panels von der Seite (`x:-30`), Listen-Items gestaffelt per `delay`.

### 3.2 Hover-Lift + Tap-Druck (alles Klickbare)
```tsx
<motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} />
```
Kacheln dezent (`scale:1.02`), Icon-Buttons stärker (`1.08`). Tap **immer** < 1.

### 3.3 Idle-Glow-Loop (Hero-Elemente „atmen")
```tsx
<motion.div animate={{ boxShadow: [
    `0 0 12px ${ACCENT}40`, `0 0 26px ${ACCENT}70`, `0 0 12px ${ACCENT}40` ] }}
  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} />
```
Nur für **wenige** Signature-Elemente (Logo-Kern, Primärbutton, Halo). Nicht inflationär.

### 3.4 Core-Pulse (der „lebende Kern")
```tsx
<motion.div animate={{ scale: [1, 1.18, 1],
  boxShadow: [`0 0 8px 2px ${ACCENT}`, `0 0 16px 4px ${HOT}`, `0 0 8px 2px ${ACCENT}`] }}
  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
```

### 3.5 Shine-Sweep (Premium-Glanz auf dem Haupt-Button)
```tsx
<motion.button className="group relative overflow-hidden …">
  <div className="absolute inset-0 -translate-x-full transition-transform
       duration-700 group-hover:translate-x-full"
       style={{ background:'linear-gradient(to right,transparent,rgba(255,255,255,.45),transparent)' }} />
  <span className="relative">START</span>
</motion.button>
```

### 3.6 Spring-Transition + AnimatePresence (Stepper, Dialoge, View-Wechsel)
```tsx
transition={{ type: 'spring', stiffness: 240, damping: 26 }}
// View-Tausch:
<AnimatePresence mode="wait">{view === 'a' ? <A key="a"/> : <B key="b"/>}</AnimatePresence>
// Dialog: initial {scale:.9,y:24,opacity:0} → animate {scale:1,y:0,opacity:1} → exit {scale:.92,…}
```

### Motion-Performance-Regeln (PFLICHT)
- **Nur `transform`/`opacity`/`boxShadow`/`filter` animieren** — niemals `width/height/top/left` in Schleifen (Layout-Thrash). `layout`-Animationen sparsam.
- **Keine `Math.random()`/`Date.now()`** für Positionen/Delays von Motes/Partikeln → Hydration-Mismatch + neue Werte pro Render. Stattdessen **feste Arrays** (`[{x,delay},…]`) oder Index-abgeleitet.
- **Infinite-Loops raus aus Combat-Hotpaths.** Idle-Glow nur in Menüs/Overlays, nicht in `useFrame`-nahen Render-Pfaden.
- **`prefers-reduced-motion` respektieren** (Framer: `useReducedMotion()` → Loops/Sweeps abschalten, Entrance auf reines Fade reduzieren).
- **Eine Quelle der Wahrheit für Werte:** keine `setState` im Render, idempotente Updates (siehe `CODING-RULES.md`, React-Loop-Schutz).

---

## 4. „Fake-3D"-Baukasten (3D-Gefühl ohne teure Canvas)

Das wichtigste Werkzeug für den Look. Reihenfolge der Layer (hinten → vorne) ist entscheidend.

### 4.1 Lit-Logo / Core-Diamant (das beleuchtete Brand-Icon)
Rotiertes Quadrat (`rotate-45`) als Bronze-Diamant + konzentrischer Innenring +
radial-Gradient-Kern + **pulsierende `boxShadow`** als Licht. Optional langsame
Dauerrotation eines äußeren Rings → wirkt 3D.
```tsx
// Außen: border-Diamant mit Idle-Glow-Loop (3.3)
// Innen: rounded rotate-45, border `${ACCENT}66`
// Kern : radial-gradient(circle at 40% 35%, PAPER, ACCENT 55%, HOT 90%) + Core-Pulse (3.4)
```
→ CCB: `menu/HeroHeader.tsx` `LogoMark`. Größer + zentriert = Hero für Overlays.

### 4.2 Glow-Halo (Licht hinter dem Objekt)
Separates, **pulsierendes** radiales Div *hinter* dem Element — trägt das „Leuchten",
ohne die Fläche aufzuhellen:
```tsx
style={{ background:`radial-gradient(circle, ${ACCENT} 0%, rgba(0,0,0,0) 68%)` }}
animate={{ opacity:[.45,.8,.45], scale:[.92,1.08,.92] }}
transition={{ duration:3.2, repeat:Infinity, ease:'easeInOut' }}
```

### 4.3 CSS-Diorama (Mini-„3D-Szene" für Previews/Backdrops)
Sieht aus wie eine 3D-Arena, ist aber gestapeltes CSS. **Layer-Rezept:**
1. Himmel (`linear-gradient` oben→unten)
2. Lichtquelle (`radial-gradient`, oben = Sonne / unten = Magma)
3. optionale Lichtstrahlen (schmale rotierte Gradient-Streifen)
4. Rückwand-Band (Horizont)
5. Säulen + Bögen (Schaft = `linear-gradient` für Rundung; Bogen = Border-Radius-Trick)
6. Horizont-Dunst (Gradient-Fade)
7. Boden (Gradient) + perspektivische Fugen (`repeating-linear-gradient` + `mask`)
8. Boden-Reflexion des Kerns (blurred Ellipse)
9. Podest
10. Kern-Halo (pulsierend, 4.2)
11. Kern (radial-gradient + `boxShadow`, leichter Scale-Pulse)
12. Fackeln/VFX (flackernde Flamme + Glut-Glow, 4.4)
13. Vignette (`inset boxShadow`)

→ CCB: `menu/ArenaPreview.tsx` (volle, kommentierte Vorlage). Bewusst **keine** GPU-Last.

### 4.4 Drift-Motes / Glut-Partikel (VFX-Atmosphäre)
Wenige kleine Dots, die mit **festen** Positionen/Delays nach oben driften und faden:
```tsx
const MOTES = [{x:'12%',d:0},{x:'34%',d:.6},{x:'58%',d:1.1},{x:'80%',d:.3}]; // deterministisch!
MOTES.map(m => <motion.span key={m.x} style={{ left:m.x, background:ACCENT }}
  animate={{ y:[0,-40], opacity:[0,.8,0] }}
  transition={{ duration:3.4, repeat:Infinity, ease:'easeOut', delay:m.d }} />)
```

### 4.5 Corner-Brackets (Tech-Panel-Gefühl)
Vier kleine L-Winkel in den Ecken einer Karte → „Konsole/HUD"-Anmutung.
→ CCB: `shop/CornerBrackets.tsx` (geteilt, rein präsentativ).

### 4.6 Wann *echte* R3F-Canvas?
- **Genau eine Live-3D-Insel** pro Screen (z. B. ausgerüsteter Charakter-Bust).
- **Nie** eine zweite Canvas über einer bereits laufenden Spiel-Szene (Pause-Overlay!) → doppelte GPU-Last. Dort „Fake-3D" nutzen.
- Env/IBL einmalig: `<Environment frames={1} resolution={64}>` + inline `<Lightformer>` (netzwerkfrei), kein teurer Planar-Mirror.
→ CCB: `shop/CharacterPreview3D.tsx` (in `menu/PilotBadge.tsx` eingebettet).

---

## 5. Komponenten-Katalog (Bausteine + kanonische Referenz)

| Baustein | Zweck | CCB-Referenz |
|----------|-------|--------------|
| **Cohesive Header-Bar** | Logo + Werte + Schnellzugriff in *einer* gerundeten Leiste | `menu/HeroHeader.tsx` |
| **StatPill** | runde Wert-Kapsel (Label klein, Wert fett, Icon) | `HeroHeader.tsx` → `StatPill` |
| **IconButton** | runder Schnellzugriff mit `aria-label`+Tooltip, Hover-Lift | `HeroHeader.tsx` → `IconButton` |
| **StepRail** | 3-Schritt-Fortschritt, klickbar, animierter Verbinder, Häkchen | `menu/StepRail.tsx` |
| **Feature-Card** | große Auswahl-Kachel mit Akzent-Spine + Motiv-Banner (distinkt je Typ) | `menu/ModeCard.tsx` |
| **OptionGroup/Chip** | kompakte, gerundete Optionsgruppen | `menu/LaunchStep.tsx` |
| **CTA-Button** | großer Primärbutton mit Shine-Sweep + starkem Glow | `LaunchStep.tsx` → START |
| **Info-Dialog** | solides `rounded-3xl`-Popup, Spring-In, Header-Gradient | `menu/ModeInfoDialog.tsx` |
| **Live-3D-Row** | Charakter-Bust (R3F) + CTA in einer Karte | `menu/PilotBadge.tsx` |
| **CSS-Diorama** | Preview „Mini-3D-Szene" | `menu/ArenaPreview.tsx` |
| **CornerBrackets** | Ecken-Winkel | `shop/CornerBrackets.tsx` |
| **Pause-Konsole** | Overlay-Hero (Lit-Logo + Wortmarke + Motes) + juicy Buttons | `screens/(pause)/PauseHero.tsx`, `PauseButton.tsx` |
| **Upgrade-Konsole** | Endless-Reward als Tab-Konsole: Lit-Hero + `layoutId`-TabRail + genau *ein* Tab-Body + ein „Weiter"-CTA; distinkter Akzent je Tab | `RewardShopHub.tsx`, `(upgrade)/UpgradeHero.tsx`, `UpgradeTabRail.tsx`, `BoostDraftTab.tsx`, `SkillsTab.tsx` |

---

## 6. Layout-Muster „aufgeräumt"

- **Eine Karte pro Region.** Werte/Knöpfe nicht lose verstreuen — in *eine* gerundete Leiste/Konsole bündeln.
- **Stepper statt langem Scroll.** Mehrschritt-Flows (Auswahl → Auto-Advance) statt endlosem vertikalem Stack.
- **Seltene Optionen verstecken** (Popover/Dialog/Collapsible). Sichtbar bleibt nur das Wichtige.
- **Distinkte Karten je Datentyp** (eigenes Motiv/Spine), damit nicht „alles gleich" aussieht.
- **Großzügiges Innen-Padding**, klare Eyebrow→Titel→Body-Hierarchie.
- **Mobile-First**, Breite/Höhe ausnutzen, kompakte Control-Layouts (2er-Grids).

---

## 7. Do / Don't

### ✅ Do
- `rounded-2xl/3xl`, solide Hex-Surfaces, gestaffelte Tiefe, Alpha-Borders.
- Juice aus den 6 Motion-Bausteinen; Idle-Glow nur für Signature-Elemente.
- „Fake-3D" (Lit-Logo, Halos, Dioramen, Motes) vor echter Canvas.
- Semantische Akzentfarben; Titel-Gradient; `CornerBrackets` für Konsolen-Feel.
- `aria-label`+Tooltip an Icon-Buttons; `prefers-reduced-motion` respektieren.

### ❌ Don't
- Keine `bg-black/40`/`bg-white/10`-Opacity als Haupthintergrund (bricht u. a. unter Capacitor).
- Kein starker `backdrop-blur` in **dichten Lese-/Einstellungsdialogen** (Pause-/Game-Overlay über der Szene ist ok, sparsam).
- Kein `Math.random()`/`Date.now()` für Motes/Partikel-Positionen.
- Keine zweite Live-R3F-Canvas über laufender Spiel-Szene.
- Keine eckigen Buttons, kein Glow in der Flächenfüllung, kein Neon-Mix im selben Panel.
- Keine Infinite-Loops in Combat-Hotpaths.

---

## 8. Übertragungs-Rezept (neues Spiel in ~7 Schritten)

1. **Token-Objekt** anlegen (`BASE/LIGHT/DARK/FRAME/ACCENT/HOT/REWARD/INK/PAPER/BG`) + Surface-Skala (§2).
2. **Lit-Logo** für die Marke bauen (§4.1) — das ist die visuelle Signatur.
3. **Cohesive Header-Bar** bauen (Logo + Werte-Pills + Icon-Buttons) statt loser Elemente.
4. **Motion-Vokabular** (§3) als Gewohnheit: Entrance+Stagger, Hover/Tap, ein Idle-Glow, ein Shine-CTA, Spring-Dialoge.
5. **Feature-Cards distinkt** je Datentyp gestalten (Akzent-Spine + eigenes Motiv-Banner).
6. **Previews als CSS-Dioramen** (§4.3); echte R3F nur als *eine* Insel (§4.6).
7. **Overlays** (Pause/GameOver/Victory) im selben System: gerundete Konsole + Lit-Logo/Hero + juicy Buttons + Motes.

---

## 9. Referenz-Dateien (Live-Code, beste Vorlage)

**Crossword Core Breaker** (`crossword-core-breaker/src/components/ui/`):
- `menu/HeroHeader.tsx` — Cohesive Bar + Lit-Logo + StatPill + IconButton
- `menu/StepRail.tsx` — Stepper · `menu/LaunchStep.tsx` — CTA + OptionGroups
- `menu/ModeCard.tsx` — distinkte Feature-Card · `menu/ModeInfoDialog.tsx` — Dialog
- `menu/ArenaPreview.tsx` — **CSS-Diorama-Vollvorlage** · `menu/PilotBadge.tsx` — Live-3D-Row
- `shop/CornerBrackets.tsx` · `shop/CharacterPreview3D.tsx`
- `screens/PauseMenu.tsx` + `screens/(pause)/PauseHero.tsx` · `PauseButton.tsx` · `ActiveBoostsPanel.tsx`
- `RewardShopHub.tsx` (Endless-Upgrade-Konsole) + `(upgrade)/UpgradeHero.tsx` · `UpgradeTabRail.tsx` · `BoostDraftTab.tsx` · `SkillsTab.tsx`
- Tokens: `src/config/constants.ts` (`WARM_STONE`) · Palette-Doku: `crossword-core-breaker/DESIGN.md`
- Entstehungs-Masterplan: `crossword-core-breaker/docs/v6-ui-overhaul-stepper-floor/masterplan.md`

**NoteDrill — Live in 4 Hubs** (`lib/shared/juicy-console/` = SSoT der Bausteine):
- `JuicyHero.tsx` — selbst-scopende Warm-Stone-Hero-Konsole (Lit-Logo + Eyebrow/Titel/Subtitle + `actions`/`stats`/`children`-Slots)
- `JuicyConsole.tsx` / `JUICY_CONSOLE_SHELL` — Warm-Stone-Hülle für bestehende Katalog-/Browser-Wurzeln
- `JuicyStatPill.tsx` — generische Werte-Pill · `JuicyShineCta.tsx` — Shine-Sweep-CTA (Link ODER Button)
- `LitLogo.tsx` · `DriftMotes.tsx` · `use-juicy-tilt.ts` · `juicy-accents.ts` (`WARM_STONE`/`consoleShadow`)
- Genutzt in: `QuizHubHero` (Quiz), `CrosswordHubHeader` (Kreuzworträtsel), `CheatsheetSectionHeader`/`CheatsheetSection` (Spickzettel), Lernkarten-Dashboard-`(overviewSection)` (Blaupause, Shim)
- Rollout-Masterplan: `docs/design/tasks/2026-07-01-warm-stone-juicy-console-global-rollout-masterplan.md`

**Verwandte Cross-Game-Docs:** `shared-docs/design/liquid-glass-guide.md`,
`shared-docs/design/auto-animate-documentation.md`, `shared-docs/CODING-RULES.md` (React-Loop-Schutz, Frontend-Regeln).
