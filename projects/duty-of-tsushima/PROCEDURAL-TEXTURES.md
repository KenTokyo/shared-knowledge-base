# Prozedurale Texturen und Atlanten — duty-of-tsushima

**Lesen wenn:** Textur zur Ladezeit rechnen, Atlasspalte, Decal-Kachel, Normale aus Höhenfeld.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Das Projekt hat **keine Art-Assets**: jede Textur entsteht beim Boot (`AGENTS.md`). Global:
[`THREEJS-RULES.md`](../../THREEJS-RULES.md) · Effektseite: [`VFX.md`](../../threejs/VFX.md).

- **Umlaufendes Rauschen mit linearem `u` setzt eine Naht auf die Lathe-Kante** — bei `u = 0,999 → 0,000` springt der Rauscheingang, die Geometrie schließt aber. Fällt am Schreibtisch nicht auf, weil der Atlas als Rechteck korrekt aussieht. → Rauschen mit `cos(2πu)/sin(2πu)` speisen statt mit `u`; die Normalenableitung in u **umlaufend** abtasten, in v geklemmt. `v` darf offen laufen, wenn oben und unten nichts schließt.
  *Hülsenatlas 128²: Umlaufkante 15,3 von 255 gegen 64 gemessene Texelkanten — Mittel 9,7 · σ 3,6 · P90 13,6 · Max 20,1, also Rang 6 und z = +1,54: die Naht liegt IM Feld, nicht darüber · 2026-08-02*

- **Getrennte Texelweite je Achse, sobald eine Spalte nicht quadratisch ist** — ein gemeinsamer Schritt für den Gradienten verzerrt die Normale um das Seitenverhältnis. → `du = 1/spaltenbreite`, `dv = 1/höhe` getrennt führen.
  *Hülsenatlas: Spalte 64 breit, 128 hoch — ein gemeinsamer Schritt hätte den v-Gradienten um Faktor 2 verzerrt · 2026-08-02*

- **Multiplikative Tönung auf dunkler Grundfarbe kann nur abdunkeln** — eine Decal-Kachel als „fertiges Bild" gebaut lässt die Tönung nicht mehr hell werden; ein heller Staubschleier ist von einer dunklen Basis aus unerreichbar, egal wie hoch der Faktor. → Kachel als **reine Deckungsmaske** in Weiß bauen, Farbe über `tint` (Vertexattribut) liefern. Die Kachel trägt Form, das Rezept trägt Material.
  *`D.SCORCH` Grundfarbe 0,14: Kern 60,91 gegen 93,03 ohne Decal, sechzehnfache Tönung erreichte nur 74,76. Nach Umbau auf Weiß: Ruß 66,53 · Holzstaub 80,70 · heller Staub 92,88 gegen Hintergrund 95,34 · 2026-08-02*

- **`CanvasTexture` ist headless eine andere Implementierung** — hängt am DOM, also genau die Sorte Unterschied, die eine Capture unreproduzierbar macht. → `DataTexture` aus `Uint8Array`, Pixel selbst rechnen.
  *`src/weapons/geometry.js`: 6 Materialien als `DataTexture` 256², 40 Oberflächen aus 5 Texturen · 2026-08-02*
