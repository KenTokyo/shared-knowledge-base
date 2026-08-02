# Gameplay und Balance — claude-flakes

**Lesen wenn:** Waves, Wights, Boss, Essence, Boons, Cairn, HUD oder `balance.mjs`.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Capture-Gate deckt Spielpfad** — `shoot.mjs?capture` blendet HUD aus, startet `combat.begin()` nie. → Gameplay via `play.mjs` ohne Capture; DOM gegen echte Combat-Felder.
  *Erster Lauf fand z-index, Pointer-Lock, HUD-Pfad; danach 32/32 bzw. 54/54 · 2026-07-30/31*

- **Test liest unsichtbares HUD** — nach Game Over kein Paint, Vorwert bleibt; Check vergleicht weiter Lives. → Sichtbarkeits-/Zustandsvorbedingung; verstecktes DOM ≠ Liveanzeige.
  *Fehlalarm „1 Pip vs 0 Lives“ nach `!over` weg; 120 s 55/55 · 2026-07-31*

- **Messwerkzeug umgeht Shipping-Integration** — `balance.mjs` ruft `onKill` direkt; Live-Callback verschluckt Boss-Argument 4 und zahlt 1,00×. → Modellmessung mit Runtime-Gate über echte Callback-Signatur paaren.
  *Alle Balance-Invarianten grün; `play.mjs` belegte nach Arity-Fix 78,99 Essence bzw. 3,10× · 2026-08-02*

- **Offline-Sweep liest Cache ohne `update()`** — `wights.liveCount=0`, leere Waves wirken plausibel. → Autoritative Arrays oder vollständiger Updatevertrag.
  *Erster `balance.mjs`: 3/11 Invarianten, Körper 0, Essence nur Bounty · 2026-07-31*

- **Monte-Carlo-Mittel monoton gegatet** — Archetyp×Höhe streut; 16 Trials rauschen stärker als Wachstum. → Standardfehler, mehr Trials, Fehlerbalken plus Mehrwellen-Trend.
  *16 Trials ~4 % Präzision vs. ~7 % Wachstum; 96 Trials ~1,7 %, stabile 3-Wave-Invariante · 2026-07-31*

- **Sterben befördert Wave** — `_startWave()` inkrementiert trotz versprochenem Replay. → Replay explizit; sichtbare Nummer im Breather nicht zurückdrehen.
  *Tod auf Wave 5 startete 6; `_replay` hält Anzeige und Folgewave · 2026-07-31*

- **Boss ersetzt fünf, zahlt wie einer** — Bosswave 4 Körper kürzer; Wave 5 zahlt 170 vs. Wave 4 192. → Einkommen/EHP gegen verdrängte Mischung; Boss-Flag bis Auszahlung.
  *Essence 3,1×: Waves 5/10/15 222–223/392–395/449–450; HP 2,60→2,20 entfernte Squeeze-Cliff · 2026-08-01*

- **Feste Bossgröße, wandernder Nenner** — „5,45 Körper“ gilt nur Wave 5. → Yardstick-Wight und verdrängte Mischung getrennt.
  *Boss 4,92 Yardsticks; 5,45/5,06/4,85 Mischkörper in Wave 5/10/15 · 2026-08-01*

- **Leerer Shop per Preisrampe** — stärkerer Rank-Step verschiebt Buyout nur eine Wave. → Katalog gegen Budget; bei zu wenig Entscheidungen Inhalt statt Repricing.
  *30 Ränge/3.080 Essence: leer ab Wave 13, 2.569 tot; 42/6.390: Wave 15 noch 3 Ränge, 289 übrig · 2026-08-01*

- **Neue Karten rein additiv gerechnet** — größeres Angebot verzögert Income-Rang und senkt Einkommen. → Pool-Dilution und Erwerbszeit bestehender Schlüsselkarte.
  *Wave 12 549–550 statt 681–682; −131,8 Essence, ab Wave 13 gleich · 2026-08-01*

- **Zwei Läufe als Obergrenze** — 3,53 % wird „3 % max“; mehr Läufe können Range verbreitern. → Stichprobe nennen, Präfixspannen neu rechnen; „cannot shrink“ ≠ „must grow“.
  *Wave 10 über 5 Läufe 6,97 %; zwei Revisionen aufwärts, fünfter innen · 2026-08-01*

- **Unseeded Callcount gegen Band** — gleicher Code zieht neue Pläne: 493.225/493.268/493.620. → Regression `--seed 7`; unseeded nur Population.
  *Seed 7 wiederholt 493.460 Calls bitgleich · 2026-08-01*
