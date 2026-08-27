# Large MMO RPG — combat density reference

**Wofür:** Zielbild für „das Partikelsystem soll richtig viel aushalten". Nicht für UI-Farben, sondern für
**wie viel gleichzeitig auf dem Schirm stehen darf**, ohne dass die Framerate einbricht.

**Bilder:**
[`references/large-mmo-rpg-combat-01.png`](references/large-mmo-rpg-combat-01.png) ·
[`references/large-mmo-rpg-combat-02.png`](references/large-mmo-rpg-combat-02.png)

*Userurteil 28.08.2026: „Das kannst du bitte als Referenz, wie so MMOs sich anfühlen, also wie das
eigentlich sein soll. Das soll richtig viel aushalten, das Partikelsystem."*

## Was auf den Bildern steht

- 8–12 Spielerfiguren, ein Bossgegner, dazu Reittiere und NPCs im selben Bild.
- Mehrere Skills gleichzeitig: Klingenspuren, Blutnebel, Bodenkreise, Aufladeringe, Trefferblitze.
- ~40 Textelemente über der Szene: Namen, Gildentitel, Schadenszahlen, Buffleisten, Chat.
- Trotzdem flüssig. Das ist der Punkt, nicht die Optik.

## Wie ein MMO das trägt — die vier Regeln, die im Bild sichtbar sind

1. **Fast keine dynamischen Punktlichter.** Effekte leuchten über Emission und additives Blending,
   nicht über echte Lichter. Ein Punktlicht kostet jeden beleuchteten Pixel der ganzen Szene; ein
   emissives Quad kostet nur die Pixel, die es bedeckt.
2. **Der Boden ist billig.** Steinplatten mit gebackener Farbe. Kein Rauschfeld pro Pixel, kein
   Höhenfeld pro Fragment. Der Boden füllt den ganzen Schirm — was er pro Pixel kostet, kostet er
   überall.
3. **Fläche statt Anzahl.** Viele kleine Partikel sind billig, wenige riesige transparente Quads sind
   teuer. Die Rechnung ist bedeckte Pixel mal Layer, nicht Partikelzahl.
4. **Transparenz ist gedeckelt.** Auf keinem der Bilder liegen mehr als drei bis vier durchsichtige
   Lagen übereinander. Die Silhouetten bleiben lesbar, und genau das ist auch die Performancegrenze.

## Gegenprobe im eigenen Repo

Belegt in `projects/claude-flakes/RUNTIME-PERFORMANCE.md`: gemessen kosten in Elemental Flakes
**zehn dauerhaft sichtbare Punktlichter** mehr als der komplette Partikel-Layer, und die Partikelzahl
kostet ≈ 0 ms, während die Partikelgröße alles kostet. Beides deckt sich mit Regel 1 und Regel 3.
