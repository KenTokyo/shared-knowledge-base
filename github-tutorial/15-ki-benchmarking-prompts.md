# KI-Benchmarking Prompts

## Port-System (KI-Info)

Jede KI bekommt einen eigenen Port (BASE_PORT = Standard-Port aus `package.json`):

| KI | Offset | Beispiel (BASE=3000) |
| --- | --- | --- |
| Claude 4.5 Opus | +1 | BASE_PORT + 1 |
| Claude 4.6 Opus | +2 |
| Claude Sonnet 4.6| +3 |
| GPT 5.4 High | +4 |
| GPT 5.3 XHigh | +5 |
| GPT 5.3 High| +6 |
| GLM 5.1 | +7 |
| MiniMax m2.7 | +8
| Qwen 3.6 Plus | +9

---

Du wirst beurteilt mit anderen KI modellen an der selben Aufgabe, 
damit ich alle modelle gleichzeitig testen kann, sollt ihr/musst du Worktrees für euch/für dich erstellen, nach Fertigstellung gibt ihr dann
euren Port server der auch läuft, sodass ich die Änderungen sehe die ihr gemacht habt, also solltest ihr nicht nachfragen ob eure Planung passt sondern die Planung direkt umsetzen, damit ich die Änderungen sehe, also ihr sollt entscheiden was richtig ist und dass direkt umsetzen da ihr geprüft werdet!

Jedes Modell hat sein eigenes Worktree quasi

=== WORKTREE-SETUP ===
PROJEKT: Quiz Blaser Arena
DU BIST: schaue in deinen Infos genau nach, ansonsten scheitert die Aufgabe
BASE_PORT: siehe package.json
DEIN PORT: [BASE_PORT + OFFSET]

WORKTREE: ../[PROJEKT_NAME]-wt-[ki-name]
BRANCH: benchmark/[ki-name]

SETUP (falls Worktree nicht existiert):
1. git worktree add ../[PROJEKT_NAME]-wt-[ki-name] -b benchmark/[ki-name]
2. cd ../[PROJEKT_NAME]-wt-[ki-name]
3. pnpm install


LIVE-URL: http://localhost:[DEIN_PORT]

I’m currently evaluating the game. Take a look and see whether there are a few bugs I can find. There are still some hitbox problems. Right, see if you can find those. In the middle somehow — when I use my pistol on, well, kind of in the center of the map, you could say there’s something there that collides with my pistol, and very often it causes me to be unable to shoot my targets, since it triggers a collision. Could you please analyze that and fix it and remove the middle transparent so called collision bug or whatever there is in the middle?

Also shooting, especially with the shotgun with 2 and 3 in the skillslot, which are my other weapnos, which I, it makes my screen a bit laggy for some reason when shooting. Maybe check why there is, why it is lagging and try to fix it. And also, there is this issue that somehow there is a answertable spawning in the middle and it stucks, it's like stuck. It just says it's, it just says it's falsch. And I can't like do anything, it just freezes, like in the falsch state, also es bleibt im falsch modus hängen and increase the amount of drone enemies by like 200%

NACH ABSCHLUSS:
- 4. npx tsc check oder generell typescript fehler beheben
- 5. pnpm dev --port [DEIN_PORT oder ein freies]
- Committe alle Änderungen
- Gib mir deinen Port zurück: http://localhost:[DEIN_PORT]












## Cleanup-Prompt (nach Benchmark)

=== CLEANUP ===
PROJEKT: [PROJEKT_NAME]

Alle Benchmark-Worktrees und -Branches entfernen:

1. Worktrees entfernen:
   for d in ../[PROJEKT_NAME]-wt-*; do git worktree remove "$d" --force; done
   git worktree prune

2. Branches löschen:
   git branch | grep "benchmark/" | xargs git branch -D

3. Falls nur eine bestimmte KI gelöscht werden soll:
   git worktree remove ../[PROJEKT_NAME]-wt-[ki-name] --force
   git branch -D benchmark/[ki-name]

Bestätige danach: git worktree list && git branch
