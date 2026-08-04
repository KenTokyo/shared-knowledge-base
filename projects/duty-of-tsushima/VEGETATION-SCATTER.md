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

- **Wind gehört als Biegewinkel in die vorhandene Bogenrechnung, nicht als Versatz auf die Position**
  — der naheliegende Weg ist, die fertige Halmspitze seitlich zu schieben. Dann wächst der Halm
  in der Böe: die Strecke von der Wurzel zur Spitze wird länger, und die Normale, die aus der
  ungebogenen Form stammt, zeigt weiter dorthin, wo der Halm ohne Wind stand. Beleuchtung und
  Silhouette laufen auseinander, und zwar am stärksten genau im Böenmaximum, wo man hinsieht.
  → Den Wind auf den **Winkel** legen, den die Biegung ohnehin schon rechnet, und Position **und**
  Normale aus demselben Winkel ableiten. Das kostet keine zusätzliche Rechnung — die Bogenformel
  steht bereits da — und hält die Länge konstant.
  *Ein Wind für Gras und Bestand: bewegter Bildanteil `bamboo-cut` 45,7 %, Böe auf `ability-dash`
  40,2 % über 0,35 s gegen 60,6 % über 2,60 s · 2026-08-02*

- **`customDepthMaterial` ist Pflicht, sobald ein Caster sich im Vertexshader bewegt — und der
  Fehlermodus ist leise** — three zeichnet die Schattenkaskade mit seinem eigenen
  `MeshDepthMaterial`, das den Vertexshader des Objekts nicht kennt. Das Objekt weht also im Bild,
  während sein Schatten am Boden klebt. Nichts wirft, nichts loggt, das statische Gate bleibt grün;
  auffallen kann es nur jemandem, der den Schatten getrennt misst. → Bei jedem im Vertexshader
  bewegten Caster dieselbe Verschiebung ein zweites Mal in ein `customDepthMaterial` hängen, und
  danach den **Schatten** messen und nicht das Objekt: A/B über die Uhrzeit mit ausgeblendetem
  Caster, sonst misst man die Bewegung, die man ohnehin schon sieht.
  *Mit gegen ohne: 37,35 % gegen 27,01 % bewegter Bildanteil — 10,34 Punkte, die vorher
  ausschliesslich am Boden fehlten · 2026-08-02*

- **Ein Objekt, das im Frustum steht und trotzdem 0,00 % misst, ist fast immer zu klein — und der
  Test dafür ist eine Skalierung, keine Sichtprüfung** — zwei Phasen lang wurde die Verteilung von
  Vögeln umgebaut, weil „man sieht sie nicht" als Platzierungsfehler gelesen wurde. Drei Ursachen
  kommen infrage und verlangen entgegengesetzte Handlungen: Culling, Bildausschnitt, Winkelgrösse.
  → Alle drei in **einem** Lauf trennen: `frustumCulled = false` setzen (ändert sich der Bildanteil
  nicht, war es nie die Hülle), die Instanzpositionen in JS auf NDC projizieren und zählen (steht
  etwas im Bild?), und die Skalierung künstlich hochdrehen (zeichnet es dann, ist es die Grösse).
  Die Skalierungsprobe ist die schärfste: geht der Anteil mit dem **Quadrat** des Faktors hoch, ist
  der Renderpfad nachweislich in Ordnung und die Frage ist nur noch die Entfernung.
  *Culling: identisch auf drei Nachkommastellen über 14 Kameras. Im Frustum: 7 bis 27 Instanzen.
  Skalierung x5 → Anteil x25 (`boss-4` 0,012 → 0,296 %). Gemessene Spannweite 2,3–7,1 px · 2026-08-02*

- **Gleichmässige Streuung über die ganze Karte ist für kleine Objekte die teuerste Verteilung mit
  der geringsten Wirkung** — der Bildanteil eines Objekts fällt mit 1/d², die Zahl der Objekte in
  einer Sichtkeule wächst mit d². Jede Entfernungsschale liefert also gleich viel Bild, und bei
  gleichmässiger Streuung liegt fast der ganze Bestand in den fernen Schalen: 34 Krähen über 178 m
  Radius hiessen **eine** in Reichweite und dreissig, die ihren Vertexdurchlauf für zwei Pixel
  bezahlen. → An **Orte** streuen, an denen der Spieler steht (Wegspinnen, Landmarken, Plateaufuss),
  und dort in Gruppen statt einzeln — ein Schwarm ist als Schwarm lesbar, dieselbe Zahl verteilt ist
  Bildrauschen. Die Maße des Objekts dabei nicht anfassen: eine Möwe mit zwei Metern Spannweite ist
  kein gelöstes Sichtbarkeitsproblem, sondern eine Lüge.
  *Dieselbe Vogelzahl, nur anders platziert: `cliff-path` Möwen 0,000 → 0,035 % Bildanteil, nächste
  Instanz 170 → 20 m, projizierte Spannweite 6,1 → 45,8 px. Krähen lesen danach auf 13 von 14
  Kameras mit 10,9–52,1 px statt 7,0–19,8 · 2026-08-02*

- **Die Sichtweite als Verdächtiger für ein strukturloses Bild** — die dichteste Kamera ist die
  schlechteste des Blindvergleichs, ihre Skalenleiter **fällt** als einzige, und das offene Todo
  daneben heisst „die Sichtweite reguliert die dominante Art nicht". Beides betrifft dasselbe
  Objekt, also liest es sich wie eine Ursache. Ist es nicht: ein Regler, der eine **Instanzzahl**
  hebt, hebt den Pixelkontrast, und Struktur entsteht daraus erst, wenn die Instanzen sich zu
  Massen zusammenlegen. Ein Halm von 8,8 cm steht ab rund 100 m unter einem Pixel breit — tausend
  davon sind kein Hain, sondern Rauschen. → Den Regler über **alle** Presets sweepen und die
  Bildzahl daneben legen, bevor irgendetwas gebaut wird. Steigt der Pixelkontrast und bleibt die
  Skalenzahl liegen, ist der Regler widerlegt und der Befund gehört auf eine andere Achse.
  *`rel` 0,1337 → 0,1406 → 0,1506 → 0,1582 (+18 %) über `low`..`ultra`, `H` dabei −0,082 / −0,107 /
  −0,089 / −0,098: negativ auf allen vier und nicht einmal monoton · 2026-08-04*

- **Instanz-LOD ist ein Präfix, aber nur auf einer gemischten Liste** — `mesh.count` zu senken ist
  die billigste Ausdünnung, die es gibt (eine ganzzahlige Zuweisung je Chunkwechsel, kein Neubau
  der Matrizen). Ungemischt schneidet sie den zuletzt geschriebenen Streifen ab, und weil ein
  Gitterlauf zeilenweise schreibt, ist das im Bild eine **gerade Kante** quer durch den Bestand. →
  Die Instanzliste beim Bau nach einem **eigenen** Hash sortieren — nicht nach dem, der Farbe oder
  Schlankheit fährt, sonst ist die gezeichnete Teilmenge genau die helle oder genau die schlanke
  Hälfte. Und die Ausdünnung masseerhaltend fahren: weniger Halme, dafür breitere, sonst wird aus
  dem Hain ein Zaun.
  *`thin = [1, 0,72, 0,48]` mit `CULM_W = [1, 1,28, 1,75]`: −7,1 % Dreiecke auf `low`, −4,8 % auf
  `medium`, −2,5 % auf `high`, Draw Calls unverändert, `rel` +0,0002 bis +0,0007 · 2026-08-04*

- **Ein Weltmuster auf einem Bestand landet auf der Bildgröße der Geometrie, nicht auf seiner eigenen** — ein Fleckenmuster sollte dem Bambushain grobe Helligkeitsstruktur geben; gemessen hob es `relK` (+0,0027) und ließ `H` stehen, also genau umgekehrt: es kam als Korn an. Ursache ist die Tiefenkomplexität. Benachbarte Bildpunkte gehören zu Halmen in ganz verschiedener Tiefe, ein per-Fragment-Feld wird dort von Pixel zu Pixel dekorreliert — 0,8 m, 3 m und 8 m Fleckgröße lieferten `dH` −0,0013 / +0,0004 / −0,0048, keine davon über dem Rauschboden 0,0010. → Wer im Bestand **grobe** Bildstruktur will, muss sie an etwas hängen, das im Bild zusammenhängend ist: an die Instanz, an ihre Gruppe oder an die Massierung des Bestands selbst (Lichtung, Dickicht, Vordergrund vor Ferne). Ein Weltraumfeld ist dafür das falsche Werkzeug, so plausibel die Physik dahinter auch ist.
  *Derselbe Term auf `reflectedLight.directDiffuse` allein bewegte vorher **exakt nichts** — Luma ±0,0000 bei Amplitude 0,55: im dichten Bestand hat die Shadow Map das direkte Licht bereits auf null gezogen, und ein Faktor auf eine Null ist eine Null. Was den Bestand trägt, sind Himmel, Env-Map und Durchlicht · `bamboo-cut` · Finding 122 · 2026-08-04*

- **Die Massierung, die eine Bildzahl bewegt, ist so gross wie ihr Messband — nicht so gross wie die Lichtung, die man sich vorstellt** — der Hain sollte „Lichtungen und Dickicht" bekommen, und beides war längst da: das Häufungsrauschen liegt zu **27,4 %** unter seiner Schwelle, Medianlücke **17,8 m**. Genutzt hat es nichts, weil `H` auf dieser Kamera nur Weltbreiten von 0,017 bis 1,07 m liest und eine 19-m-Zelle mit 1137 px **Faktor 18** daneben liegt. Was wirklich fehlte, stand unter einem Meter: die Streuzelle ist 1,59 m breit und liefert im Mittel **0,65 Halme**, ein Horst kann darin gar nicht entstehen, und genau das meldet `H < H_PRIOR` wörtlich als „Korn statt Struktur". → Das Bildband der Zahl **vor** dem Bauen ausrechnen und die Struktur dort hineinbauen, statt die vorhandene grobe Massierung noch einmal zu verstärken. Und die Struktur durch **Verschieben** herstellen, nicht durch Hinzufügen: Halme mehrerer Zellen auf ein gemeinsames Zentrum ziehen lässt die Anzahl exakt gleich, womit „das war nur mehr Dichte" als Gegenerklärung von vornherein ausfällt.
  *`bunch = [3,0 · 0,85]` auf `bamboo-cut`: `H` −0,0863 → **−0,0519** (+0,0344 bei Rauschboden 0,0012, 29-fach), `relK` 0,1475 → 0,1392, am ausgelieferten Bild mit Korn +0,0370. Sweep 0,0/0,7/0,85/0,95 → −0,0869/−0,0720/−0,0519/−0,0473, Knie bei 0,85; **feiner ist schlechter**, 2 m Raster liest nur −0,0830, weil Horst und Gasse zusammen unter die Sprosse rutschen. Dreimal der beste Lichtterm (+0,0116) ohne eine einzige zusätzliche Instanz · Finding 124 · 2026-08-04*

- **Das Rastermaß einer Massierung kommt aus der Belegung des Bestands, nicht aus dem Bildband der Kennzahl — der Tipp darüber gilt nur für die Art, an der er gemessen wurde** — dieselbe Horstbildung wurde von Bambus auf Susuki übertragen und das Raster vorab aus der Regel „Periode auf die oberste Sprosse" gerechnet: vorhergesagt 4,0 m, und die lesen gemessen nur **+0,0067**, den unteren Rand der eigenen Erwartung. Der Sieger steht bei **6,0 m** und liegt mit 1,48x **über** dem Band, wo Bambus' Wahl mit 0,93x darunter lag — dieselbe Regel, gegensätzliche Seite. Was beide Arten verbindet, ist die Füllung: ein Bambushorst hält 3,03 Halme bei 24 % Einzelgängern, und Susuki erreicht das erst bei 6 m (3,39 Büschel, 26 %); bei 4 m sind es 2,05 und 43 %, also ein halber Horst mit halbem Gewinn. Der Grund ist die Streudichte: Susukis Zelle ist so grob wie Bambus' Zelle, aber sie füllt sich langsamer. → Das Raster über die **Belegung** wählen — Ziel rund drei Stück je Horst und unter 30 % Einzelgänger, am echten Bestand gezählt statt aus der Dichte hochgerechnet. Das Bildband bleibt der Filter dafür, welche Kandidaten die Zahl überhaupt sehen kann, aber es setzt das Maß nicht. Der **Zug** dagegen überträgt sich: 0,85 knickt bei beiden Arten, unabhängig an verschiedenen Kameras gemessen.
  *Susuki auf `terrace-waterline`, Raster bei Zug 0,85: 3 m +0,0040 · 4 m +0,0067 · 5 m +0,0134 · **6 m +0,0154** · 7 m +0,0129 · 8 m +0,0106; Zug bei 6 m: 0,60 +0,0058 · 0,75 +0,0101 · **0,85 +0,0154** · 0,95 +0,0134. Rauschboden 0,0009, `relK` 0,0513 → 0,0506, `bump` 0,0000 gegen Schranke 0,009 · Finding 125 · 2026-08-04*

- **Steigt eine Strukturzahl monoton mit dem Raster, ist der Sweep nicht zu Ende, sondern noch nicht weit genug gelaufen** — bis 6 m stieg `H` auf jedem Schritt, und das ist genau die Signatur einer Kennzahl, die Kahlfläche statt Struktur bezahlt: dreimal vorher hatte sich so ein Verlauf als Korn oder Lichtung entpuppt. Aus einer monotonen Kurve lässt sich der ehrliche Punkt nicht ablesen, nur der letzte vor dem Ausreißen raten. Zwei Läufe jenseits des Verdachts entscheiden es: bei 7 und 8 m **fällt** die Zahl wieder (+0,0129 / +0,0106), das Maximum ist zweiseitig und misst Struktur. → Jeden Sweep über den vermuteten Sieger hinaus verlängern, bis die Zahl kippt, und zwar in **jeder** gedrehten Achse. Der Zug hat dasselbe gezeigt (0,95 fällt gegen 0,85). Kostet hier 11 s je Punkt und ersetzt die Diskussion, ob der Gewinn echt ist. Die zweite Achse stützt die Lesart: `relK` fällt bis zum Sieger und steigt bei 7 und 8 m über die Baseline — bei zu grobem Raster kommt die Massierung als Kontrast an, nicht als Struktur.
  *Widerlegt die aus dem Verlauf gezogene Arbeitshypothese „das Knie liegt zwischen 5 und 6 m, und 6 m gewinnt nur, weil die Periode über das Band hinauswächst" — die Gegenprobe hat sie gestürzt, nicht bestätigt · Finding 125 · 2026-08-04*
