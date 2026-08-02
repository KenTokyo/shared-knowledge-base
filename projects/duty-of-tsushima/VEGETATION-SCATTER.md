# Vegetation, Streuung und Fern-LOD — duty-of-tsushima

**Lesen wenn:** du eine Pflanzenart streust, eine Dichte einstellst, eine LOD-Stufe schreibst, eine
Blatt- und Kronenform aus Primitiven baust, Schattenwurf auf einer Vegetationsschicht anschaltest —
oder eine Fläche als „zu dunkel" gemeldet bekommst und die Farbe anfassen willst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Der Bau selbst steht in `src/world/foliage.js` — Wuchsrechte in `SPECIES`, der Ein-Gitter-Scan in
`buildFoliage`, der LOD-Tausch in `FoliageRig`. Hier steht nur, was beim Bauen Zeit gekostet hat.
Globale Vegetationstipps beginnen bei [`../../threejs/VEGETATION.md`](../../threejs/VEGETATION.md).

- **`density` verspricht einen Bestand und liefert einen kleineren** — die Zahl liest sich als „Stück
  je Quadratmeter", aber sie wird mit einem Häufungsrauschen multipliziert, und ein bilinearer Blend
  aus vier Gleichverteilungen ist selbst **nicht** gleichverteilt: er drängt sich um 0,5 (Streuung
  rund 0,20 gegen 0,289). Eine Schwelle von 0,52 heißt darüber also nicht „die obere Hälfte", und der
  Rampenwert dahinter bleibt fast immer klein. → Den Rauschwert um 0,5 spreizen, **bevor** er gegen
  die Schwelle läuft, und die Dichte danach am **gedruckten** Bestand ablesen statt sie hochzurechnen.
  *Spreizfaktor 1,6 hob denselben Ahornbestand von 94 auf 148 Bäume, ohne dass die Dichte sich
  bewegte; die rechnerisch versprochene Zahl lag über beiden. Erst 0,006 → 0,026 ergab die 681, die
  §3 für den warmen Akzent braucht · 2026-08-02*

- **Ein Fern-LOD ohne Laubmasse löscht die Biomsilhouette** — aus 150 m stand der Bambushain als Feld
  grauer Stäbe im Bild. Ursache ist die naheliegende Sparlogik: auf der fernsten Stufe trägt eine Art
  nur noch ihre Silhouette bei, und gestrichen wurde genau das, woraus die Silhouette besteht. Die
  Stämme sind billig und blieben, das Laub war teuer und fiel weg. → Fern-LOD **masseerhaltend**
  bauen: weniger Teile, aber **größere**. Die gedeckte Fläche halten, nicht die Teilezahl.
  *LOD 2 Bambus von 0 auf 2 Blätter à 0,17 × 0,85 m (nah sind es 5 à 0,115 × 0,7). Kosten 20
  Dreiecke je Halm bei 8305 Halmen = 166k, und `pnpm perf --gate` hielt danach alle vier Presets ·
  2026-08-02*

- **Ein dreiseitiges Rohr fast waagerecht ist aus jeder Richtung ein Dreieck** — der Hain trug
  Wimpel statt Laub. Ein Zylinder mit drei Segmenten hat keine Rundung, die seine Silhouette
  rettet; steht er senkrecht, sieht man ihn als schmalen Strich, kippt er in die Waagerechte, zeigt
  er dem Betrachter seine ganze Länge als flaches Dreieck. → Blattgeometrie aus Rohren **über 90°**
  kippen, also hängend, und lieber viele kurze als wenige lange. Die Segmentzahl ist dabei kein
  Qualitätsregler, die Lage ist es.
  *66° und 1,6 m Länge → 1,92 rad und 0,7 m, dazu 5 statt 3 Blätter. Dieselbe Dreieckszahl, aber der
  Hain liest sich als Laub · 2026-08-02*

- **Eine Krone aus getrennten flachen Scheiben ist ein Sonnenschirm, kein Baum** — vier Polster in
  sauberen Etagen auf einem Stamm lasen sich im Hero-Shot als Scheiben, nicht als Masse. Eine echte
  Krone ist ein Körper mit Löchern darin, und Löcher entstehen zwischen sich **schneidenden**
  Körpern; getrennte Scheiben erzeugen stattdessen Zwischenräume, die als Lücke im Objekt lesen. →
  Kronenpolster überlappen lassen und über mehrere Höhen verteilen, nicht auf einer. Erst der
  Höhenversatz gibt der Krone Ober- und Unterseite, und erst dann fängt sie Licht von oben.
  *Ahornkrone über 1,3 m Höhe statt auf einer Ebene, `flat` von 0,42 auf 0,54–0,62 bei der Kiefer ·
  2026-08-02*

- **Der Schattenpass ist keine Teilmenge des Bildes, und die gerechnete Dreieckszahl ist zu klein** —
  §8 warnt, eine Dreiecksdifferenz überschätze den Gewinn um Faktor zwei; gemessen war es andersherum.
  Ursache sind zwei verschiedene Frusta: die Schattenkamera ist eine achsenparallele Box um den
  **Spieler**, das Bild ein Kegel in **Blickrichtung**. Beide wählen andere Chunks aus, und der
  Bestand hinter dem Rücken zahlt in den Schatten ein, ohne je im Bild zu erscheinen. Dazu stehen die
  Chunks auf verschiedenen LOD-Stufen, was jede „Instanzen × Dreiecke"-Rechnung zusätzlich verfehlt.
  → Die Dreiecke des Schattenpasses mit `renderer.info` **zählen** statt sie zu rechnen:
  `info.autoReset = false`, `reset()`, einen Frame stepen, ablesen. Ohne `autoReset = false` steht am
  Ende nur der letzte von mehreren `render()`-Aufrufen da.
  *Bambus gerechnet 176k, gezählt **264k** — 50 % daneben. Erst die gezählte Zahl erklärte, warum
  `nur bamboo` mehr Dreiecke zog, als der sichtbare Bestand überhaupt hergab · 2026-08-02*

- **Ein dokumentierter Schalter ist noch kein implementierter Schalter** — `ARCHITECTURE.md` nennt
  `userData.kzNoShadow` den „einzigen Schalter" für Schattenwurf und sagt, die Kaskaden läsen
  `mesh.castShadow` nie. In `src/render/` gibt es diesen Pfad nicht: dort steht threes eingebaute
  Shadow Map mit **einem** DirectionalLight, und die liest genau `castShadow`. Zwei Subsysteme setzen
  das Flag seit Phasen und verlassen sich auf einen Mechanismus, den niemand ausführt. → Bevor ein
  Flag aus dem Vertrag gesetzt wird, **einmal greppen, wer es liest**. Findet der Grep nur
  Schreibstellen, ist das Flag Dekoration — und der Effekt, den man ihm zuschreibt, kommt von woanders
  oder gar nicht.
  *`grep -rn kzNoShadow src/` → 3 Treffer, alle schreibend; `render._collect` und `kzNoPrepass`
  existieren nicht, einen Tiefen-Prepass auch nicht · 2026-08-02*

- **Was wie ein Schwebefehler aussieht, ist meistens Verdeckung** — im Bild endeten Bambushalme
  sichtbar in der Luft, und der naheliegende Verdacht war die Höhenabfrage. Gemessen stand kein
  einziger falsch: 14 Instanzen in 38–44 m saßen auf 0,01 m genau auf dem **gezeichneten**
  Terraingitter, das Delta von −0,09 bis −0,15 m war exakt die gewollte Einsenkung von `0,12 · scale`.
  Verdeckt hat sie ein näherer Hangrücken. → Bevor ein Bildfehler zum Bug erklärt wird, die Basis
  gegen das **gezeichnete** Gitter messen statt gegen das Höhenfeld — und den Verdacht erst danach
  formulieren.
  *`/tmp/kz-float.mjs` gegen `tools/browser.mjs`; die Jagd hätte eine Schicht gekostet · 2026-08-02*

- **„Zu dunkel" ist fast nie die Albedo — erst den Sockel messen, dann die Farbe** — zwei Phasen sind
  in „hebe die Grasluma" gelaufen, bevor jemand die Gegenprobe machte. Der additive `lift` des Grades
  landet in Linear, und die sRGB-Kurve ist nahe Schwarz so steil, dass derselbe Summand eine dunkle
  Fläche um 32 von 255 hebt und eine helle nur um 5–10. Eine dunkle Fläche wird dadurch **flach**,
  nicht dunkel: ihr Eigenkontrast erstickt unter einem Sockel, der überall gleich hoch ist. Wer
  daraufhin die Albedo anhebt, verschiebt die kleine Zahl über der grossen. → Vor jeder Farbänderung
  den Sockel messen: Albedo auf 0 und lesen, was übrig bleibt. Bleibt dort mehr als ein paar Einheiten
  stehen, gehört das Problem dem Grade und nicht dem Material.
  *Albedo 0 las 33,3–34,6; mit `grade.lift = 0` fielen dieselben Pixel auf 1,3–1,5. sRGB(0,015) =
  0,128 → 32,7, die Rechnung trifft die Messung auf 0,6 · 2026-08-02*

- **`material.color` sweept die Albedo ohne eine Zeile Quelltext** — sie multipliziert `diffuseColor`,
  also lässt sich die Frage „wie viel vom Material kommt überhaupt im Bild an" in **einem** Prozess
  beantworten, ohne Neubau, Neustart und ohne den Shader anzufassen. Zwei Schüsse (Albedo 0 und 1) auf
  einer **einmal festgehaltenen** Pixelmenge geben Sockel und Steigung getrennt; die Steigung ist das,
  was das Material beiträgt. → Die Pixelmenge bei vollem Material bestimmen und über alle Faktoren
  halten, sonst wandert sie mit und misst sich selbst. Die Technik trägt für jedes Material, nicht nur
  für Vegetation.
  *Die Steigung schwankte über fünf Kameras um Faktor 11 (bamboo-cut +20,7, ability-fireball +1,9) —
  damit war belegt, dass eine einzige Farbänderung sie unmöglich alle heben kann · 2026-08-02*

- **`receiveShadow` und `material.fog` sind Programm-Cache-Schlüssel** — ohne
  `material.needsUpdate = true` passiert beim Umschalten nichts, und die Messung liest sich dann als
  „kein Effekt". Das ist die teuerste Art von Fehlmessung: sie lässt eine **echte** Ursache als
  widerlegt erscheinen und schickt die nächste Schicht in die falsche Richtung. → Beim Isolieren
  ausserdem den per-Material-Schalter nehmen, nicht den globalen: `material.fog = false` verliert nur
  das geprüfte Material den Nebel und der Rest der Szene behält ihn, während `scene.fog = null` die
  anderen Materialien mit gecachtem Programm und veralteten Uniformen stehen lässt.
  *So getrennt: Nebel bewegte über fünf Kameras 0,0–0,1 und war erledigt, `receiveShadow = false` hob
  die Steigung von 19,3 auf 36,8 — Halm plus Sockel landeten damit auf 1,01x der Bodenluma · 2026-08-02*

- **Zwei Vollbilder als JSON durch die CDP-Brücke sind kein Messwert, sondern ein Hänger** — je Kamera
  sind das 16 Mio. Zahlen zu serialisieren; ein Lauf stand nach 7 Minuten ohne eine einzige Zeile
  Ausgabe. → Den Pixelvergleich **in der Seite** rechnen und zwanzig Zahlen zurückgeben. Derselbe Lauf
  dauert danach rund 3 Minuten. Zurückgeben heisst dabei: nur Pixel mit deutlichem Delta werten
  (hier ≥ 40 über RGB), denn ein halb gedecktes Pixel ist eine Mischung aus Objekt und Grund und zieht
  jedes Verhältnis nach 1,0. → Und diese Kernmenge trägt nur, solange das Objekt ein volles Pixel
  füllt; auf fernen Kameras ist auch sie noch verdünnt und **nicht** gegen den Grund vergleichbar.
  *Dieselben Bilder lasen 0,80x über alle Pixel und 0,73x über die Kernmenge · 2026-08-02*
