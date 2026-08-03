# Messgerät und Gates — claude-tower-defense

**Lesen wenn:** eine Sonde hat eine Zahl oder ein Grün geliefert und du willst daraus schließen.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Gegenstück: [`RED-ARM-TRAPS.md`](RED-ARM-TRAPS.md) für `--bad`-Arme, Exit-Codes und Selbstprüfungen.

- **Driftkontrolle liest nur A-Enden** — `|A−A'|/base` zertifiziert Zeitraum, nicht B; trotzdem steht B-Delta daneben. → B mitlesen; unmögliches Vorzeichen (weniger Geometrie, mehr Zeit) als Maschinenrauschen.
  *D68: PASS bei +8,85 ms/−892.320 Tris und +5,75 ms/−532.480 · 2026-08-01*

- **Neuer Wächter brüllt im Rauschen** — 0,15 ms macht Vorzeichen zum Münzwurf; Dauerbanner wird ignoriert. → Stufen: laut nur unmögliches Vorzeichen plus zitierfähiger Betrag; sonst leise. Rot- **und** Grünkontrolle.
  *D68: 2 laut/2 leise; nur gesunder Lauf fing Überempfindlichkeit · 2026-08-01*

- **Gate nennt nur Anzahl** — `14 probes checked` stimmt, schließt aber dritten Bezeichner samt Screenshot-CLI aus. → Namen drucken; Anzahl unabhängig gegen Kandidatendateien.
  *D69: 15−1 Ausnahme=14, nach Fix 16 · 2026-08-01*

- **Gate betritt Codepfad nicht** — geteilter Funktionsaufruf mit `N===0` kehrt vor toter Zeile zurück. → Geteilte Formel schützt Drift, nicht Erreichbarkeit; geänderten Modus selbst fahren.
  *D63: 2 Berichtsmodi 3 Phasen tot bei grünem Gate · 2026-08-01*

- **Begründung ungeprüft** — Akte behauptete Pflichtparameter/`banana`-Ablehnung falsch; Sonde behauptete Kopplung, Vorgängertabelle blieb bitgleich; Kommentar „bis 16,80 %“ zitierte Zeile 2 statt Maximum 21,20 %. → Aussagen ausführen; Kopplung fahren; „bis X“ per sortiertem Log plus Fallname.
  *Vier Läufe bzw. eine gelöschte Zeile in Wegwerfkopie · 2026-08-01*

- **Puffer falsch gekörnt, zu früh oder falsch aggregiert** — Vertexindex auf Instanzattribut→NaN; dynamischer Buffer beim Boot null→Faktor 1.344; „tallest body“ maß Sortenstreuung 40,73 m bzw. Rig-Mesh 0,46 m. → Attribute vertex/instance/unklar (unklar=Exit); dynamische Vertexpuffer namentlich ausweisen; Aggregationseinheit in Spaltenkopf.
  *14 Geometrien NaN; Weld-Kontrolle benannte Abweichung; Folgezeile `clears it by -28.73 m` entlarvte Mengenfehler · 2026-08-01*

- **Sichtlinie skippt Prozent statt Meter** — 10 % auf langer Linie blindet Grat nahe Ziel aus. → `skip=min(0.35,SKIP_M/span)`; Blindstrecke in Metern; bekannt verdecktes Ziel.
  *D74: 11 m blind auf 110 m, Kamm 5 m vorm Ziel; 3/3 VISIBLE trotz unsichtbar; `SKIP_M=3` · 2026-08-02*

- **Konstante Sweepspalte als flache Welt** — Sonde fragt Boden unter Beobachter statt Sample. → Vor Ranking Varianz; keine Streuung = Verdrahtungsverdacht.
  *D74: 123 Zeilen stets 1,3–1,4 m über gesamte Route · 2026-08-02*

- **Klemmender Sampler hat kein Bereichsende** — außerhalb Welt liefert Kantenhöhe; Objekt steht neben Mesh bei plausibler Höhe/Bodenabstand 0. → Für Messung `tools/lib/heights.mjs` mit `null`; Abstand zur Kachelgrenze ausgeben.
  *`Terrain.heightAt` clamp; D74: alle 3 Lane-Mündungen außerhalb |84| (−58/86, 9/86, 86/47), 9 Kandidaten, 0/27 sichtbar · 2026-08-02*
