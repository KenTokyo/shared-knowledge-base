# Gameplay und Balance — claude-flakes

**Lesen wenn:** du Waves, Wights, Boss, Essence, Boons, Cairn, HUD oder `balance.mjs` änderst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Capture-Gate deckt den Spielpfad** — `shoot.mjs` startet mit `?capture`, blendet HUD aus und ruft `combat.begin()` nie auf. → Gameplay über `play.mjs` ohne Capture-Mode treiben und DOM gegen echte Combat-Felder vergleichen.
  *Erster echter Lauf fand z-index-, Pointer-Lock- und HUD-Pfadfehler; danach 32/32 bzw. 54/54 Checks · 2026-07-30/31*

- **Test liest unsichtbares HUD als falsch** — nach Game Over malt der HUD bewusst nicht mehr und hält den Vorwert; der Check verglich ihn weiter gegen fallende Lives. → Sichtbarkeits-/Zustandsvorbedingung filtern und versteckte DOM-Spiegel nicht als Liveanzeige behandeln.
  *Fehlalarm „1 Pip vs 0 Lives“ verschwand nach Filter auf `!over`, 120-s-Lauf 55/55 · 2026-07-31*

- **Langer Botlauf gilt als Balancebeleg** — der Bot stieg durch Sterben auf, räumte keine Welle, sah keinen Cairn, keine Elite und keinen Warden; Pointer-Lock fehlte. → Balance offline gegen echten `Combat` komponieren; Playtest nur für erreichbare Runtimepfade verwenden.
  *120 s enthielten null Käufe und null späte Archetypen trotz Welle 3 · 2026-07-31*

- **Offline-Sweep liest einen gecachten Zähler ohne `update()`** — `wights.liveCount` blieb null und fünfzehn leere Wellen sahen plausibel aus. → Beim Überspringen des Owners dessen autoritative Arrays lesen oder den Updatevertrag vollständig ausführen.
  *Erster `balance.mjs`-Lauf: 3/11 Invarianten, alle Körper 0, Essence nur Wave-Bounty · 2026-07-31*

- **Einzelner Monte-Carlo-Mittelwert wird monoton gegatet** — Archetyp×Höhe spannt pro Körper stark; 16 Trials rauschten stärker als das späte Wellenwachstum. → Standardfehler drucken, Trials erhöhen und gegen Fehlerbalken plus Mehrwellen-Trend prüfen.
  *16 Trials rund 4 % Präzision gegen ~7 % Wachstum; 96 Trials rund 1,7 % und stabile Drei-Wellen-Invariante · 2026-07-31*

- **Sterben befördert die Welle** — `_startWave()` inkrementierte nach dem Tod, obwohl UI-Kommentare Wiederholung versprachen. → Replay als expliziten Zustand führen, nicht die sichtbare Wellenzahl während des Breathers zurückdrehen.
  *Spieler auf Welle 5 bekam zuvor Welle 6; `_replay` hielt Anzeige und nächste Welle konsistent · 2026-07-31*

- **Boss ersetzt fünf Körper, wird aber wie einer bezahlt** — Bosswelle wurde vier Körper kürzer und Welle 5 zahlte 170 statt Welle 4s 192. → Einkommen und EHP gegen die verdrängte Wellenmischung rechnen; Boss-Flag bis zur Auszahlung tragen.
  *Boss-Essence 3,1× ergab Wellen 5/10/15 = 222–223/392–395/449–450; Boss-HP 2,60→2,20 entfernte den Squeeze-Cliff · 2026-08-01*

- **Feste Bossgröße gegen wandernden Nenner beschrieben** — „5,45 Körper“ galt nur in Welle 5; Mischung änderte sich später. → Yardstick-Wight und verdrängte Wellenmischung als zwei getrennte Nenner ausweisen.
  *Boss = 4,92 Yardstick-Wights, aber 5,45/5,06/4,85 Mischkörper in Welle 5/10/15 · 2026-08-01*

- **Leerer Shop wird durch stärkere Preisrampe repariert** — Verdopplung des linearen Rank-Steps verschob Buyout nur um eine Welle, obwohl drei Wellen leer standen. → Erst Kataloggröße gegen verdientes Budget rechnen; bei zu wenig Entscheidungen Inhalt statt Repricing ergänzen.
  *30 Ränge/3.080 Essence leer ab Welle 13 und 2.569 tot; 42 Ränge/6.390 ließen bei Welle 15 noch 3 Ränge und nur 289 übrig · 2026-08-01*

- **Neue Karten gelten als rein additiv** — ein größeres Angebot verzögerte den zweiten Income-Rang um eine Welle und senkte Gesamteinkommen. → Draw-Pool-Dilution und Erwerbszeit der bestehenden Schlüsselkarte mitmessen.
  *Welle 12 zahlte nach Tier 549–550 statt 681–682; Gesamtdifferenz 131,8 Essence, ab Welle 13 wieder gleich · 2026-08-01*

- **Spanne aus zwei Läufen wird als Obergrenze gedruckt** — 3,53 % wurde zu „3 % max“; weitere Läufe können eine Range nur verbreitern oder gleich lassen. → Läufe als Stichprobe benennen, Präfixspannen neu berechnen und nie „must grow“ aus „cannot shrink“ machen.
  *Welle 10 stieg über fünf Läufe auf 6,97 %; zwei Revisionen waren aufwärts, der fünfte Lauf lag innerhalb · 2026-08-01*

- **Unseeded Sim-Callcount wird gegen ein Band diffed** — identischer Code zog neue Pläne und lieferte 493.225/493.268/493.620. → Für Regressionsbeleg `--seed 7` verwenden; unseeded nur als Populationslauf behandeln.
  *Seed 7 wiederholt bitgleich 493.460 Calls über viele nachfolgende Schichten · 2026-08-01*
