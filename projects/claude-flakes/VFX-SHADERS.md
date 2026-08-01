# VFX und Shader — claude-flakes

**Lesen wenn:** du Kristalle, Wasser, Vapor, Partikel, PostFX, Terrainkontakt oder WGSL änderst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Ein schwarzer PostFX-Block wird am Verstärker repariert** — fp16 `+Inf` erzeugte in Karis `Inf*0` und im Soft-Knee `Inf/Inf`; der Bloom vergrößerte den Fehler nur. → NaN vor `min` prüfen, Inf am Eingang des Downsample-Pfads endlich klemmen und danach die Szenenquelle weiterverfolgen.
  *16-px-Block entsprach exakt einem NaN-Texel auf 1/16-Auflösung; Guard entfernte den Block und legte die Quelle frei · 2026-07-30*

- **Sterbender Vapor schreibt NaN-Alpha** — Lebensprüfung lief vor `age += h`, danach war `1-a01<0` und `pow(negativ,1.5)` NaN; Alpha-Vergleiche verwarfen ihn nicht. → Normalisierte Lebenszeit vor gebrochenen Potenzen auf `[0,1]` klemmen.
  *Schwarzpixel in späten Playframes 28.418→0; 18/25 nicht betroffene Matrixframes bitgleich · 2026-07-30*

- **Transparente Röhre bekommt Sägezähne trotz glatter Geometrie** — Vorder- und Rückwand einer depth-write-losen Röhre mischten in Indexreihenfolge, ein Zahn pro Gitterquad. → Fernwand und Nahwand als zwei Cull-Pässe derselben Geometrie zeichnen; Flat-Color und Cullrichtungen getrennt prüfen.
  *Zahnpitch entsprach 176 Gitterspalten, nicht 64 Datenknoten; Fix kostete 27→28 Draws und rund 1,0 ms · 2026-07-30*

- **Shaderterm existiert, aber liegt sechsfach unter dem Pixelraster** — 0,13–0,25-px-Rissblätter wurden unter TAA zu Speckle; mehr Breite erhöhte primär Coverage. → Featuregröße in Schirmpixeln modellieren und Frequenz/Breite gemeinsam sweepen, nicht Hochpass-Sigma blind maximieren.
  *TAA-Überleben der Risse 54 %, der ~3-px-Einschlüsse 81 %; kalibriertes Offline-Modell traf den echten Frame mit 53,8 % · 2026-07-31*

- **Kontakt oder Frost ist „zu schwach“** — Kill-Sonde zeigt Delta 12–22, Kontraständerung nur 8: der Term erreicht zu wenig sichtbare Höhe. → Coverage-Fenster vor Amplitude öffnen und gegen `sun`/`shadow` auf Clipping bzw. Absaufen prüfen.
  *Kontaktfenster 0,42/0,16→0,62/0,40 bewegte max Delta 23; Frostfenster bewegte 33, Vollmatrix ohne Clipping · 2026-07-31*

- **Mehr Peak-Licht macht den Peak flacher** — breites Site-Licht hob p99 um 52 %, kostete aber 11 % Struktur; +75 % weitere Intensität kaufte nur Delta 26 in der Tonemap-Schulter. → Peak-Energie am Subjekt emittieren und mit dessen Geometrie formen; Staubring als spätere Reaktion behandeln.
  *`FLASH_ICE=14` wirkte auf 4,4 % statt als Vollbild-Wash, Struktur 4,04→3,99 %, Clipping 0 · 2026-07-31*

- **Sekundäreffekte feuern beim Anlegen statt beim sichtbaren Durchbruch** — Schnee und `frost.grow` kamen 0,11–0,60 s vor ihrem Prisma; Population gipfelte auf leerem Schnee. → Emission und Audio an die individuelle Growth-Uhr koppeln, nicht an `_plant`.
  *Population bei t=1,0: 814→265, bei lesbarem Eis t=1,6: 246→649, ohne ein neues Korn · 2026-07-31*

- **Gestaffelter Plan bricht am ersten späten Eintrag ab** — unsortierte Shards blockierten frühere Folgereihen; 12–17 große Prismen landeten auf einem Frame. → Einmal pro Cast nach Delay sortieren oder alle fälligen Reihen besuchen; Delay-Signal größer als sein Jitter halten.
  *Insertion-Sort reduzierte Worst-Frame von 17 auf 4; Größen liefen danach klein→groß über 0,25 s · 2026-07-30/31*

- **Bodennebel driftet als Band davon** — Drag näherte Geschwindigkeit dem 2,4-m/s-Wind statt Null; aus 2,5 m Emissionsradius wurden 6–11 m Reise. → Windkopplung aus der Höhe über Grund ableiten; Bodenschicht und steigende Schicht brauchen getrennte Dynamik und Opazität.
  *Vapor Delta≥12-Fläche 0,43→1,67 %, Ripple blieb an Basen zu 85 % und im Vortex-Worst-Case zu 71 % · 2026-07-30*

- **Dünne Kristalle stechen aus unberührtem Schnee** — Brush-Radius folgte der absichtlich von Höhe entkoppelten Taille; eine dünne Klinge bekam nur 9 cm Kontaktfläche für 18 cm Berm. → Terrain-Footprint aus projizierter Lean-/Höhen-Ausdehnung plus Mindestfuß ableiten, Wall dagegen klemmen.
  *Basisänderung lokalisierte sich auf 0,67 % des Frames und verdunkelte die Naht um 6,0/4,6/3,0 Level · 2026-07-30*

- **Dimensionslose Shadergrenze wird gegen Meter-Scatter verglichen** — 0,167 der Höhe waren bei 2,73 m ein 0,46-m-Schnitt, obwohl der Crack-Shower nur 0,30 m streut. → Vor CPU/GPU-Invarianten beide Seiten in dieselbe Einheit bringen und über echte Seed×Höhen-Population prüfen.
  *Clamp auf 0,28 m: 0/65.536 Fälle über dem Eis, 27,7 % sichtbare Kappen unverändert · 2026-07-30*

- **Lichtkanal hat keine Lücke und schneidet trotzdem hart** — ein anderer Afterglow überbrückte die Präsenzmetrik; Prozent-vom-Peak beschuldigte den legitimen Ribbon. → Größten absoluten Framefall bei 60 und 120 fps vergleichen: Fade halbiert sich, Branch-Cut bleibt gleich.
  *Legitime Verhältnisse 0,50–0,60, echter historischer Cut 0,987; Schwelle 0,75 aus den Mechanismen hergeleitet · 2026-07-31*
