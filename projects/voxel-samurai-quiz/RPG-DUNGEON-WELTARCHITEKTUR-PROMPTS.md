# Endlos-Hack-and-Slash — Kaze-Weltengine gegen Asset-Lab-Einzelkarten

**Lesen wenn:** KI soll dasselbe kleine Voxel-Hack-and-Slash mit zwei Welten über zwei gegensätzliche Weltarchitekturen bauen.
**Promptstil:** Qualitätsvorbild + kreative Freiheit + klare Technik-/Performance-Gates nach [`../../agents/CREATE-PROMPT-GUIDE.md`](../../agents/CREATE-PROMPT-GUIDE.md).
**Vergleich:** Prompt A nutzt eine gemeinsame Kaze-artige Weltengine; Prompt B baut beide Welten als Asset-Lab-V36-artige Einzelbeiträge.
**Status:** zwei eigenständig kopierbare Bauprompts; direkte sichtbare Abnahme bleibt beim User.
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen und unnötige Artikel streichen; Fehlerbild, Ursache, Handlung und Beleg erhalten.

## 1. Referenzbilder in Worten

### Welt 1 — Skyglass Aqueduct Palace

**Referenz:** `assets/concepts/asset-lab/v91-v120-world-comparison/imagegen-final/world-skyglass-aqueduct-palace-image.png`

- große helle Steinplaza als sofort lesbare Kampfarena.
- monumentaler Palast gegenüber Spielerstart als Hauptachse.
- kleinere Häuser, Türme, Treppen, Mauern und Markt-/Gartenprops fassen Platz ein.
- hoher Aquädukt-Ring schließt Horizont und liefert Tiefenmaßstab.
- türkisfarbene Kanäle führen Wasser durch Architektur.
- Wasserfälle stürzen an Kartenrändern in Canyon.
- warme Sonne, kühler Himmel und Wasserreflexe trennen Materialrollen.
- Spielübertragung: Gegner materialisieren im zentralen Bodenmedaillon; Spieler startet am äußeren Tor.

### Welt 2 — Verdant Titan Grove Fortress

**Referenz:** `assets/concepts/asset-lab/v91-v120-world-comparison/imagegen-final/world-verdant-titan-grove-fortress-image.png`

- runde helle Lichtung als sofort lesbare Kampfarena.
- gigantische uralte Baumstämme bilden vertikale Landmarken und Raumgrenze.
- dunkle Holzfestung und mehrere Häuser staffeln sich um Lichtung.
- Treppen, Brücken, Terrassen und Wurzeltor erzeugen mehrere Blickachsen.
- Felsen, Wurzeln, Moos und Farne verbinden Architektur mit Waldboden.
- warmes Fenster-/Laternenlicht kontrastiert kühles Waldgrün.
- Sonnenstrahlen und Luftperspektive trennen Vorder-, Mittel- und Hintergrund.
- Spielübertragung: Gegner wachsen aus zentraler Runenspur; Spieler startet am unteren Waldweg.

### Gemeinsame Bildregeln

- Referenzen definieren Komposition, Materialtrennung, Maßstab, Licht und Dichte.
- Keine Referenz wird als Hintergrundbild, Skybox oder flache Kulisse missbraucht.
- Welt entsteht als echte 3D-Geometrie mit begehbarem Boden und Kollision.
- Keine exakte Kopie geschützter Spielkarten, Figuren oder Assets.
- Skyglass und Verdant dürfen als bereitgestellte Originalkonzepte für Weltenauswahl und Art Direction dienen.

## 2. Fairer Vergleich: Was in beiden Prompts identisch bleibt

| Bereich | Fester Vertrag für beide Prompts |
|---|---|
| Produkt | neues eigenständiges Browser-Hack-and-Slash mit Endloswellen |
| Stack | TypeScript + Three.js; React/R3F nur, wenn bestehender Host davon profitiert |
| Kamera | Third Person mit klarer Arenaübersicht, Kollisionsschutz und weicher Verfolgung |
| Welten | genau Skyglass Aqueduct Palace und Verdant Titan Grove Fortress |
| Größe | je Welt maximal 600 Einheiten Gesamtspanne; begehbarer Kern deutlich kleiner |
| Charakter | Voxel-like Schwertkämpfer mit part-basiertem Voxel-Rig |
| Gegner | Voxel-like Rigs mit lesbaren Klassen und Spawn-Animation |
| Kampf | schnelle LMB-Kette, RMB-Schwerthieb/Block, Ausweichen, Skills `Q E R 1 2 3 4 5` |
| Spielmodus | Welle `1…∞`, Eliten, Bosse, steigende Schwierigkeit, begrenzte aktive Gegnerzahl |
| VFX | hochwertige räumlich gekoppelte Skill-, Treffer-, Spawn- und Todeswirkungen |
| Licht | zentrale Weltbeleuchtung plus begrenzte gepoolte Skilllichter |
| UI | Weltenauswahl + ein Start-Button; im Spiel kompakte Lebens-/Wellen-/Skillanzeige |
| Nichtziel | kein Multiplayer, Backend, Inventar, Crafting, Questlog, Dialogbaum oder Shop |
| Sichtprüfung | keine automatische Browser-/Screenshot-Prüfung ohne aktuellen ausdrücklichen Userauftrag |

## 3. Der einzige beabsichtigte Unterschied

| Entscheidung | Prompt A — Kaze-artig | Prompt B — Asset-Lab-artig |
|---|---|---|
| Hauptquelle | gemeinsame `WorldSpec` pro Karte | lokales `build(seed)` pro Karte |
| Boden | gemeinsames Heightfield und gemeinsame Weltabfragen | ein lokales Terrain-Mesh je Karte |
| Materialien | gemeinsame Splat-/Biom-/Umwelttechnik | lokale Vertexfarben oder lokale Shader |
| Vegetation | gemeinsame Scatter-, Wind- und Entfernungssysteme | einmaliger lokaler Scatter und Instanzfamilien |
| Wasser | gemeinsames Wasserprofil und Materialsystem | lokale Fluss-, Kanal-, Pool- und Wasserfalloberflächen |
| Architektur | gemeinsame Site-/Batching-Regeln | beitragslokale primitive Familien und Oberflächen |
| Neue Welt | überwiegend neue Spec-Daten | neue lokale Builder-Logik |
| Kernfrage | „Welche Weltengine tragen beide Karten?“ | „Wie bauen wir diese eine Karte am stärksten?“ |

---

# Prompt A — Kaze-artige gemeinsame Weltengine

```text
CREATE SKYGLASS & VERDANT ENDLESS VOXEL SLASHER — SHARED WORLD ENGINE

AUFTRAG UND QUALITÄTSBAR

Baue ein komplett neues, sofort spielbares Third-Person-Hack-and-Slash für den Browser. Das Spiel besitzt genau zwei auswählbare kleine Welten, eine Voxel-like Schwertkämpferklasse, Endlos-Gegnerwellen, hochwertige MMORPG-artige Skills und eine sehr einfache Startoberfläche.

Weltqualität soll die Kompositions-, Material-, Licht- und Atmosphärenstärke der zwei bereitgestellten Konzeptbilder erreichen. Charakterbau und Animation sollen die stärksten Prinzipien der Asset-Lab-V6-/V36-Voxel-Rigs übernehmen: klar getrennte Körpersegmente, echte Gelenkpivots, lesbare Ganzkörperbewegung und räumlich befestigte Waffen/VFX. Implementiere alles neu und game-lokal; kopiere keinen fertigen Benchmark-Beitrag.

Referenzen:
- assets/concepts/asset-lab/v91-v120-world-comparison/imagegen-final/world-skyglass-aqueduct-palace-image.png
- assets/concepts/asset-lab/v91-v120-world-comparison/imagegen-final/world-verdant-titan-grove-fortress-image.png

Nutze die Bilder als Art Direction und Qualitätsbar, nicht als flache Spielkulisse. Das Ergebnis muss als echtes 3D-Spiel funktionieren.

MISSION / FIRST READ

- First Read 1: Spieler erkennt sofort ausgewählte Welt und zentrale Kampfarena.
- First Read 2: Voxel-Schwertkämpfer besitzt klare Samurai-/MMORPG-Silhouette.
- First Read 3: Gegner entstehen sichtbar in Arenamitte und greifen lesbar an.
- First Read 4: Skillleiste zeigt acht Fähigkeiten und deren Cooldowns ohne Menüballast.
- Anti-Ziel: kein leerer Terrain-Demo, kein Minecraft-Klon, keine steifen Schiebefiguren, keine Partikelshow ohne Trefferursache, keine überladene MMO-Oberfläche.

PRODUKTUMFANG

- neues eigenständiges Spiel; keine Demo innerhalb eines Editors oder Asset Labs.
- genau zwei Welten; Auswahl vor Start.
- je Welt maximal 600 Einheiten äußere Gesamtspanne.
- begehbarer Kampf-/Erkundungskern ungefähr 220–340 Einheiten.
- kleine Arena-Session mit Endloswellen statt Open-World-Questspiel.
- ein lokaler Spieler; kein Netzwerk oder Backend.
- gemeinsamer Game-Host besitzt Kamera, Eingabe, Kampf, Gegner, Wellen, Audio, UI und Speicherzustand.
- Karten besitzen keine zweite Gameplay-, Eingabe-, Kamera-, Audio- oder UI-Runtime.

START UND UI

1. Startansicht zeigt nur:
   - Spieltitel,
   - zwei große Weltkarten mit Referenzbild/Name,
   - klaren ausgewählten Zustand,
   - einen primären Button `Start`.
2. Keine Einstellungen, Accounts, News, Shop, Charaktereditor oder Untermenüs.
3. `Start` lädt ausgewählte Welt und setzt Spieler an authored Eingang.
4. Ingame-HUD:
   - Lebensbalken,
   - Ausdauer,
   - Geistenergie für Ultimate,
   - aktuelle Welle und verbleibende Gegner,
   - acht Skill-Slots in einer kompakten unteren Leiste,
   - Hotkeys `Q E R 1 2 3 4 5`,
   - dunkler radialer oder flächiger Cooldown-Fortschritt,
   - verbleibende Cooldown-Sekunden,
   - klarer Disabled-Zustand bei fehlender Geistenergie.
5. Skillleiste bleibt auch bei starkem VFX lesbar.
6. Pause enthält nur `Fortsetzen`, `Welt neu starten`, `Zur Weltenauswahl`.
7. Tod zeigt `Erreichte Welle`, `Nochmal` und `Weltenauswahl`.

DIE ZWEI WELTEN

WELT 1 — SKYGLASS AQUEDUCT PALACE

- helle Hochplateau-Stadt über Canyon.
- breiter Steinplatz als zentraler Kampfbereich, ungefähr 100–130 Einheiten breit.
- großes Palastportal als Hauptlandmarke gegenüber Spielerstart.
- kleinere begehbar umgehbare Häuser, Türme, Treppen, Mauern, Statuen, Banner, Pflanzkübel und Marktprops fassen Platz.
- Aquädukt-Ring im Hintergrund mit wiederholten Bögen und Wachtürmen.
- türkisfarbene Kanäle führen durch Platzränder; mehrere Wasserfälle stürzen in Canyon.
- sichere Brüstungen und Blocker verhindern Sturz aus Spielraum.
- Gegner-Spawnzone liegt im zentralen Bodenmedaillon; mehrere Spawnanker verteilen Gruppen ohne Pop-in.
- Licht: warme gerichtete Sonne, kühles Himmelslicht, türkisfarbener Wasserbounce, goldene Innenlichter, klare Kontaktschatten.

WELT 2 — VERDANT TITAN GROVE FORTRESS

- uralter Waldkessel mit gigantischen Baumstämmen als Hero-Landmarken.
- runde Runenlichtung als zentraler Kampfbereich, ungefähr 100–120 Einheiten Durchmesser.
- große Holzhalle/Festung gegenüber Spielerstart.
- kleinere Häuser, Pagodendächer, Terrassen, Treppen, Brücken, Felsgärten, Laternen und Wurzeltor um Lichtung.
- Felsen, Wurzeln, Moos, Farne, Büsche und kleine Bäume verbinden Architektur mit Boden.
- große Titanbäume sind authored Landmarken, nicht zufälliger Scatter.
- Gegner-Spawnzone folgt zentraler Runenspur; Spawnanker bleiben vom Spielerstart getrennt.
- Licht: warmer Sonnenkegel durch Kronendach, kühler grüner Umgebungsfill, warme Fenster/Laternen, sichtbare Luftperspektive ohne milchigen Nahnebel.

KAZE-ARTIGE WELTARCHITEKTUR

1. Baue eine gemeinsame `WorldSpec`-Schnittstelle als Hauptquelle beider Karten.
2. Jede Spec beschreibt:
   - Kartenmaß, Seed und Spielgrenze,
   - authored Terrainformen,
   - Straßen, Plaza/Lichtung und Nebenwege,
   - Wasserläufe, Kanäle, Pools und Wasserfälle,
   - Architektur-Sites und Landmarken,
   - Biom-/Vegetationsregionen,
   - Spielerstart, Gegner-Spawnanker und Bossanker,
   - Kamera- und Lichtprofil.
3. Eine gemeinsame Bake-Pipeline erzeugt:
   - Heightfield als Bodenwahrheit,
   - Normalen-/Steigungsfeld,
   - Material-Splat für Fels, Stein, Erde, Gras, Pfad und Nässe,
   - Biom-/Dichtefeld,
   - Wasser- und Occupancy-Daten,
   - validierbaren Cache.
4. `groundHeightAt(x,z)` versorgt Terrain, Spieler, Gegner, Kamera, Props, Gebäude, Wasser und VFX-Bodenkontakt.
5. CPU- und GPU-Höhenabtastung müssen übereinstimmen.
6. Straßen, Plaza, Lichtung, Kanäle und Baupads verändern oder besitzen Boden konstruktiv.
7. Nutze ein gemeinsames Terrain-/Materialsystem für beide Welten.
8. Karten wählen Daten und Stilparameter; sie kopieren keine Terrainengine.
9. Bei maximal 600 Einheiten keine Kaze-Zahlen blind kopieren:
   - Rasterauflösung aus echter sichtbarer Bodenfrequenz wählen,
   - Chunking/LOD nur einsetzen, wenn Kamera damit relevante Flächen verwirft,
   - keine 2.048²-Textur oder Großwelt-CDLOD ohne messbaren Nutzen.
10. Gemeinsame Vegetation:
   - deterministischer Scatter,
   - Gebäude-/Straßen-Clearings,
   - Arten nach Weltprofil,
   - Instancing für Wiederholungen,
   - gemeinsamer Windblock,
   - Entfernungssystem nur bei sichtbarem Nutzen.
11. Gemeinsame Architekturregeln:
   - Footprint an mehreren Punkten samplen,
   - Plinthen unter tiefsten Kontakt führen,
   - wiederholte Teile instanzieren,
   - einzigartige statische Teile pro Site/Material mergen,
   - Türen, Wege und Arenaachsen offen halten.
12. Gemeinsames Wasser:
   - Wasserhöhe aus fertigem Boden lösen,
   - Kanäle und Ufer konstruktiv schließen,
   - Wasserfälle an echten Höhenstufen,
   - Weltkoordinaten für Wellenphase,
   - Schaum und Flachwasser aus lokaler Tiefe.
13. Gemeinsame Environment-SSoT besitzt Sonne, Himmel, Wind, Nebel, Wetter, Schatten und Color Grade.
14. Sichtbarer Himmel, Materiallicht und Wasserreflexion sollen dieselbe Lichtquelle lesen.
15. Beide Karten liefern denselben Playfield-/Kollisionsvertrag; keine unsichtbaren Blocker durch Türen oder Arenawege.

VOXEL-LIKE CHARAKTERSYSTEM

- Baue keine realistischen Menschenmodelle und keine einfachen Minecraft-Würfelmenschen.
- Erzeuge Körper und Rüstung prozedural aus benannten Voxel-Teilen mit stabilen Part-IDs, lokalen Pivotpunkten und Materialrollen.
- Spielerpalette: Mondsilber, tiefes Indigo, Cyan-Energie und begrenzter Goldakzent.
- Gegner sind kreaturenartige Voxel-/Steinwesen statt Menschen: kantige Felsplatten, Bruchkanten, Kristalle und klar lesbare Tierproportionen bilden Körper und Rüstung.
- Gesichter bleiben vollständig maskenhaft und zeigen ausschließlich ein Paar leuchtende Augen; keine sichtbaren Münder, Nasen, Zähne, Haut oder realistischen Gesichtszüge.
- Augenform, Augenfarbe, Silhouette und Hell-Dunkel-Verteilung trennen Rollen schon aus Kampfdistanz; zusätzliche Farben allein reichen nicht.
- Spieler darf ein eigener Hero-Rig-Renderpfad sein; wiederholte Gegnerteile werden nach Geometrie/Material instanziert oder gebatcht.
- Erzeuge nie ein React-Element oder einzelnes Mesh pro Körperteil und Gegner.
- Für gebatchte Rigs trägt Geometrie mindestens `aPartId/aBoneId`, `aPivot`, `aActorId`, `aBaseColor` und optionale Emissive-/Maskenattribute.
- Vertex-Shader transformiert Position und Normale um echten Gelenkpivot über Bone-/Part-Matrix; Licht darf nicht an Restpose kleben.
- Interaktive Bone-Matrizen kommen aus Actor-Zustand und normalisierter Clipzeit, nicht allein aus globaler Weltzeit.
- Animationssolver berechnet Actor-Pose einmal pro Frame und schreibt Part-Matrizen, Waffenanker und Trefferanker gebündelt; kein React-State pro Gelenk.
- Gleicher Actor-Zustand + gleiche Clipzeit erzeugt dieselbe Pose; Animation bleibt deterministisch und prüfbar.
- Ziel: stilisierte Voxel-Actionfigur mit facettierten Quader-/Keilvolumen, klarer Rüstungsschichtung und hochwertiger Silhouette.
- Spieler ist eine Schwertkämpferklasse:
  - kantiger Kopf mit leuchtenden Augen; keine realistischen Gesichtszüge,
  - Brustpanzer, Hüftpanzer, Schulterplatten, Unterarmschienen und Stiefel als getrennte Volumen,
  - asymmetrische Schulter-/Taillenform für Wiedererkennung,
  - Katana in rechter Hand, Scheide an linker Hüfte,
  - Stoff-/Bannersegmente nur als wenige kontrollierte Teile.
- Nutze ein hierarchisches Voxel-Rig mit mindestens:
  - Root,
  - Becken,
  - Brust,
  - Hals/Kopf,
  - linke/rechte Schulter,
  - Ellbogen,
  - Handgelenk,
  - Hüfte,
  - Knie,
  - Knöchel/Fuß,
  - Waffen- und Scheidenanker.
- Gelenkpivots liegen anatomisch an Schulter, Ellbogen, Hüfte und Knie; Glieder drehen nicht um ihren Mittelpunkt.
- Katana, Scheide, Trail, Cast-Ursprung und Trefferpunkt bleiben an echten Rig-Ankern befestigt.
- Interaktive Animation nutzt Actor-Zeit und Zustandsmaschine, keine globale 20-Sekunden-Schleife.
- Animationszustände:
  - Idle mit Atmung und Gewichtswechsel,
  - Lauf/Sprint/Strafe mit gegensinnigen Armen und gepflanzten Füßen,
  - Ausweichrolle oder Windstep,
  - drei LMB-Kettenschläge,
  - schwerer RMB-Hieb,
  - Block und Parry,
  - acht Skillclips,
  - Treffer, Stagger, Knockback, Knockdown, Tod und Sieg.
- Jeder Angriff besitzt Anticipation → Travel → Contact → Recovery.
- Schadensfenster ist nur am sichtbaren Kontakt aktiv.
- Blende kompatible Posen weich; halte Cancel-Fenster, Inputbuffer und Bewegungsfreigabe bewusst.
- Verhindere Fußgleiten, starres Ganzkörperdrehen, gleitende Gegner und vom Handgelenk getrennte Waffen.
- Gegner verwenden dasselbe Rigsystem, aber eigene Silhouetten, Proportionen, Rüstung und Waffen.

STEUERUNG UND KAMPFGEFÜHL

- `WASD`: Bewegung relativ zur Kamera.
- Maus: Kamera und Zielrichtung.
- `Shift`: Sprint.
- `Space`: Ausweichen mit kurzer Unverwundbarkeit und sichtbarer Bewegungsbahn.
- `LMB`: schnelle dreiteilige Schwertkette.
- `RMB`: schwerer Hieb; gehalten = Block.
- optionales Soft-Lock priorisiert Gegner in Blick-/Reichweitenkegel, ohne Kamera hart einzusperren.
- Treffer braucht räumliche Hitbox, Teamfilter, einmalige Treffer-ID pro Schwung und klare Reichweite.
- Kampf ist schnell, cancelbar und druckvoll, nicht floaty oder animationsgesperrt.
- Trefferfeedback schichtet kurzen Hitstop, kleinen Kameraimpuls, Gegnerreaktion, VFX und räumlichen Sound.
- Kameraimpuls bleibt kurz und begrenzt; keine dauerhafte Übelkeitsbewegung.

FESTE SKILLPALETTE

- `Q — Windstep Sever`, Cooldown 5 s:
  - kurzer gerichteter Dash durch Ziel,
  - horizontale Schwertspur,
  - versetzte Nachbild-Silhouette,
  - Gegner am Kontakt leicht versetzt/staggered.
- `E — Moon Guard`, Cooldown 8 s:
  - kurzes Parry-Fenster,
  - bei Erfolg radialer Konterbogen und starker Stagger,
  - bei Fehlschlag nur kurzer Guard ohne Gratis-Schaden.
- `R — Tempest Wheel`, Cooldown 10 s:
  - kontrollierter Wirbelhieb um Spieler,
  - flacher Bodenring zeigt Reichweite,
  - zieht nahe leichte Gegner minimal zusammen.
- `1 — Crescent Wave`, Cooldown 6 s:
  - breiter bodennaher Schwertbogen fliegt vorwärts,
  - endet am echten Kollisions-/Reichweitenpunkt.
- `2 — Skyward Fang`, Cooldown 9 s:
  - Aufwärtshieb mit kleinem Launch,
  - Spieler folgt kontrolliert in kurze Luftkombo,
  - Bodenkontakt bleibt beim Start sichtbar.
- `3 — Phantom Blades`, Cooldown 14 s, kostet Geist:
  - drei zeitversetzte Geisterklingen treffen markierte Ziele,
  - jede Klinge besitzt Start, Flug, Kontakt und eigenen Trefferimpuls.
- `4 — Storm Domain`, Cooldown 18 s, kostet Geist:
  - begrenzte Bodenzone mit authored Randmaske,
  - pulsierende Schnitte und Windlinien,
  - keine sichtbare rechteckige Trägerfläche.
- `5 — Heaven Splitter`, Cooldown 35 s, benötigt volle Geistenergie:
  - kurze lesbare Vorbereitung,
  - großer vertikaler Schwertbogen,
  - Kontaktkern, Halo, Richtungsbogen, Funken, Bodennarbe und Druckring,
  - stärkster Moment des Sets, ohne Bildschirm vollständig zu verdecken.
- Cooldowns, Kosten, Schadenswerte und Kontrollwirkung liegen in einer gemeinsamen Skilldefinition; UI, Kampf und KI lesen dieselbe Quelle.

VFX- UND AUDIOQUALITÄT

- Jede Wirkung folgt Ursache → Flug/Bewegung → Kontakt → Reaktion → Ausklang.
- VFX-Ursprung kommt aus Hand, Schwertkante, Fußkontakt, Zielkontakt oder authored Bodenanker.
- Schichte VFX nach Rollen:
  - solide Bodennarbe/Decal,
  - heller Kern,
  - weicher Halo,
  - gerichteter Trail/Bogen,
  - Funken/Splitter,
  - Staub/Wind,
  - kurzes dynamisches Licht,
  - passende Gegnerreaktion.
- Masse schreibt Tiefe; Lichtlayer dürfen transparent/additiv sein.
- VFX dürfen Charakter- und Gegner-Silhouetten am Kontakt nicht dauerhaft verdecken.
- Nutze Objektpools für Partikel, Trails, Trefferlichter, Decals und Spawnfragmente.
- Audio je Skill: Vorbereitung, Swing/Travel, Kontakt, tiefer Impact, Ausklang.
- Schritte, Rüstung, Schwert, Wasser, Wind, Wald, Arena und Gegner besitzen räumliche Rollen.
- Musik startet zurückhaltend, verdichtet sich bei Elite/Boss und bleibt endlos loopbar ohne hörbaren Sprung.

ENDLOSSYSTEM UND GEGNER

- Wellen laufen `1…∞`; kein finales Victory-Gate.
- nächste Welle startet nach kurzer klarer Pause, sobald vorige Gegner besiegt sind.
- ein gemeinsamer `WaveDirector` ist Hauptquelle für Wellenzahl, freigeschaltete Arten, Zusammenstellung, Skalierung, Elite-Modifikatoren und Bossrotation.
- jede fünfte Welle `5, 10, 15, …` ist zwingend eine Bosswelle mit Boss plus reduzierter Begleitung; es gibt keine bossfreie fünfte Welle.
- Bosswellen wechseln deterministisch zwischen Titan Golem und Storm Wyrm; spätere Auftritte ergänzen neue Phasen, Angriffskombinationen und stärkere Begleiter statt nur mehr Lebenspunkte.
- Schwierigkeit fällt nie zurück: Lebenspunkte, Schaden und Stagger-Widerstand steigen pro Welle über stabile, begrenzte Formeln; Bewegungs- und Angriffstempo steigen langsamer und besitzen sichere Obergrenzen.
- jeder Fünf-Wellen-Abschnitt schaltet neue Arten, Angriffe, Gruppenkombinationen oder Elite-Modifikatoren frei.
- Wellen 1–4 führen die ersten vier regulären Arten ein; Wellen 6–9 ergänzen zwei weitere; ab Welle 11 stehen alle acht regulären Arten für zunehmend gemischte Gruppen bereit.
- ab Welle 6 dürfen Elite-Modifikatoren reguläre Arten verstärken, gelten aber nie als zusätzliche Gegnerart.
- nach Freischaltung mehrerer Arten dürfen zwei aufeinanderfolgende Nicht-Bosswellen nicht dieselbe Gegnerzusammenstellung verwenden.
- aktive Gegnerzahl bleibt hart begrenzt; Zielbereich ungefähr 18–24 gleichzeitig nach Performancebeleg.
- alle Spawn-/Gegner-/Projektileffekte verwenden Pools; keine ungebremste Objektansammlung.
- es gibt genau zehn Gegnerarten; acht reguläre Kreaturen plus zwei Bosskreaturen:
  1. Stonefang Wolf: niedriger schneller Vierbeiner mit Rudelkreisen, Sprungbiss-Telegraphie und verwundbarer Erholung,
  2. Crystal Mantis: schmaler Kristalljäger mit Seitenschritten, Scherenkombo und klarer Kreuzschnitt-Warnung,
  3. Rootshell Beetle: gepanzerter Käfer-Tank mit Frontschutz, Stoß und offenem Hinterleib als Konterfläche,
  4. Shardwing Raven: fliegende Steinkreatur mit Schattenwarnung, Sturzflug und kurzer Bodenphase,
  5. Obsidian Ape: schwerer Brecher mit Felsfaust-Kombo, Sprungschlag und radialer Bodenwarnung,
  6. Runehorn Stag: schneller Anstürmer mit sichtbarer Angriffslinie, Wandstagger und weitem Geweih-Sweep,
  7. Boulder Tortoise: langsame Artilleriekreatur mit Steinpanzer, Splittergeschoss und unterbrechbarer Aufladung,
  8. Hollow Serpent: segmentierte Steinschlange mit Bodenwelle, kurzem Abtauchen und klar markiertem Auftauchpunkt,
  9. Titan Golem: massiver Boss aus schwebenden Voxel-Felsplatten mit zwei bis drei Phasen, zerstörbaren Panzerrollen und großen Bodenwarnungen,
  10. Storm Wyrm: langer Voxel-Steinwyrm mit Flug-/Bodenwechsel, Blitzaugen, Schneisenangriff und arenaweiter, aber ausweichbarer Bossmechanik.
- alle zehn Arten besitzen steinartige Voxel-Silhouetten; im Gesicht sind aus jeder relevanten Distanz nur die leuchtenden Augen erkennbar.
- reguläre Arten und Bosse brauchen eigene Proportionen, Bewegungsmuster, Angriffsreichweiten, Telegraphien und Konterfenster; reine Farbvarianten sind ungültig.
- Gegner navigieren um Häuser, Wasser, Bäume, Wurzeln, Brüstungen und Arena-Props; Flug- und Abtauchphasen respektieren dieselben Spielraumgrenzen.
- kein Gegner läuft durch Geometrie, greift durch Wände an oder spawnt im Spieler.

SPAWN-ANIMATION

- Gegner erscheinen ausschließlich an zentralen authored Spawnankern der Arena.
- Spawn besitzt 0,8–1,4 s lesbare Telegraphie vor Aktivierung.
- Skyglass: Bodenrune leuchtet türkis/gold; Voxel-Fragmente steigen aus Lichtspalte und setzen Körper segmentweise zusammen.
- Verdant: Wurzelrune wächst; Blätter, Holzsplitter und grünes Licht formen Silhouette aus Boden.
- Ablauf: Bodenzeichen → Partikelaufstieg → Rig-Zusammenbau → Kernflash → Materialstabilisierung → Gegner wird aktiv.
- Gegner ist während Aufbau nicht schädlich und nicht unsichtbar treffbar.
- Spawnlicht, Partikel und Sound bleiben am selben Anker.
- Wellenmanager verteilt Spawnzeiten, damit nicht alle Effekte im selben Frame starten.

LICHTSYSTEM

- eine zentrale Environment-SSoT steuert Sonnenlicht, Himmelsfill, Nebel, Schatten, Belichtung und Color Grade.
- Skyglass: warmes Keylight, kühler Canyonfill, Wasserbounce, helle Steinlesbarkeit, goldene Innenakzente.
- Verdant: gerichtete Sonnenstrahlen, kühler Kronenschatten, warmer Fenster-/Laternenkontrast, kontrollierter Höhennebel.
- Cascaded oder passende gerichtete Schatten decken Spieler, Gegner und Arena ab; Fernkulisse braucht geringere Schattenqualität.
- maximal wenige gepoolte Skill-/Spawnlichter gleichzeitig; Intensität und Lebensdauer begrenzen.
- Bloom unterstützt HDR-Kerne, ersetzt aber keine Form oder Materialtrennung.
- Tone Mapping und Belichtung verhindern ausgebrannte VFX sowie schwarze Schatten.

ORCHESTRIERUNG NACH CREATE-PROMPT-GUIDE

- Wenn Harness Sub-Agenten unterstützt, teile fachlich:
  1. Game-/State-Architektur,
  2. gemeinsame Kaze-Weltengine und beide Specs,
  3. Voxel-Rig und Animation,
  4. Kampf, Skills und Trefferlogik,
  5. Gegner-KI, Navigation und Endloswellen,
  6. VFX und Licht,
  7. UI/UX und Audio,
  8. Performance und unabhängige Abschlusskritik.
- Jeder Fachbereich liefert einen kohärenten integrierbaren Schnitt statt isolierter Demos.
- Unabhängiger Reviewer prüft Architektur, Funktion, Zahlen und stärksten Gegenbeweis.
- Konkreter Fund öffnet genau eine gezielte Korrektur; keine ritualisierte Wiederholung.
- Keine agentische Screenshot-/Browserprüfung ohne ausdrückliche Freigabe im aktuellen Userauftrag.
- Direkte sichtbare und spielerische Endabnahme bleibt beim User.

PERFORMANCE UND GATES

- Ziel: stabile 60 FPS auf definierter Zielhardware; ohne Messung keine FPS-Behauptung.
- berichte CPU-/GPU-Framezeit p50/p90/p99, Draw Calls, Dreiecke, aktive Gegner, Partikel und Schattenkosten.
- instanziere wiederholte Weltformen und Voxel-Gegnerteile, wenn Bewegungsarchitektur es erlaubt.
- keine per-frame Geometrie-/Materialerzeugung, ungebremsten Arrays oder React-State-Updates im Renderloop.
- nutze Pools für Gegner, Projektile, Treffer, VFX, Decals, Audioquellen und dynamische Lichter.
- entferne zuerst unsichtbare Fernkosten, überzählige Schatten und sekundäre Partikel; erhalte Charakter-, Skill- und Arenaerkennbarkeit.
- statische Gates prüfen:
  - TypeScript,
  - deterministischen Map-Build,
  - Bodenparität,
  - Spawn außerhalb Blockern,
  - vollständige Skilldefinitionen,
  - endliche Shaderuniforms,
  - Ressourcen-Dispose,
  - aktive Gegner-/Poollimits.
- keine neuen Browser-, Screenshot- oder Gameplaytests ohne ausdrücklichen Userbefehl.

LIEFERREIHENFOLGE

1. Regeln, Bestand und Referenzen verstehen.
2. gemeinsamen Game-Host, Statefluss und Weltenauswahl bauen.
3. gemeinsame WorldSpec-/Bake-/Runtime-Grundlage bauen.
4. Skyglass als vollständigen Vertical Slice bauen.
5. Voxel-Spieler, Grundkampf und Kamera integrieren.
6. acht Skills, VFX, Audio und Skillleiste integrieren.
7. Gegner-Rigs, KI, Spawn und Endloswellen integrieren.
8. Verdant als zweite Spec derselben Weltengine bauen.
9. Licht, Materialtrennung, Performance und Sonderfälle schließen.
10. statische/numerische Gates bündeln; sichtbare Abnahme dem User übergeben.

FERTIG WENN

- Startansicht lässt genau Skyglass oder Verdant wählen und startet direkt.
- beide Karten nutzen dieselbe Weltengine und unterscheiden sich durch Specs/Assets/Parameter.
- Spieler und alle Gegner sind hochwertige Voxel-Rigs mit gelenkiger Ganzkörperanimation.
- `Q E R 1–5` funktionieren, zeigen Cooldowns und besitzen befestigte VFX/Audio/Treffer.
- Endloswellen, Eliten und Bosse laufen ohne ungebremstes Wachstum.
- Gegner spawnen sichtbar in Arenamitte und werden erst nach Aufbau aktiv.
- Weltlicht, Skilllicht, Materialien und Tone Mapping bleiben lesbar.
- UI ist schön, kompakt und auf Start + Kampfwerte begrenzt.
- statische und numerische Gates sind grün; sichtbares Kampfgefühl bleibt ehrlich als Userabnahme markiert.
```

---

# Prompt B — Asset-Lab-V36-artige Einzelkarten

```text
CREATE SKYGLASS & VERDANT ENDLESS VOXEL SLASHER — SELF-CONTAINED WORLD BUILDS

AUFTRAG UND QUALITÄTSBAR

Baue ein komplett neues, sofort spielbares Third-Person-Hack-and-Slash für den Browser. Das Spiel besitzt genau zwei auswählbare kleine Welten, eine Voxel-like Schwertkämpferklasse, Endlos-Gegnerwellen, hochwertige MMORPG-artige Skills und eine sehr einfache Startoberfläche.

Weltqualität soll die Kompositions-, Material-, Licht- und Atmosphärenstärke der zwei bereitgestellten Konzeptbilder erreichen. Charakterbau und Animation sollen die stärksten Prinzipien der Asset-Lab-V6-/V36-Voxel-Rigs übernehmen: klar getrennte Körpersegmente, echte Gelenkpivots, lesbare Ganzkörperbewegung und räumlich befestigte Waffen/VFX. Implementiere alles neu und game-lokal; kopiere keinen fertigen Benchmark-Beitrag.

Referenzen:
- assets/concepts/asset-lab/v91-v120-world-comparison/imagegen-final/world-skyglass-aqueduct-palace-image.png
- assets/concepts/asset-lab/v91-v120-world-comparison/imagegen-final/world-verdant-titan-grove-fortress-image.png

Nutze die Bilder als Art Direction und Qualitätsbar, nicht als flache Spielkulisse. Das Ergebnis muss als echtes 3D-Spiel funktionieren.

MISSION / FIRST READ

- First Read 1: Spieler erkennt sofort ausgewählte Welt und zentrale Kampfarena.
- First Read 2: Voxel-Schwertkämpfer besitzt klare Samurai-/MMORPG-Silhouette.
- First Read 3: Gegner entstehen sichtbar in Arenamitte und greifen lesbar an.
- First Read 4: Skillleiste zeigt acht Fähigkeiten und deren Cooldowns ohne Menüballast.
- Anti-Ziel: kein leerer Terrain-Demo, kein Minecraft-Klon, keine steifen Schiebefiguren, keine Partikelshow ohne Trefferursache, keine überladene MMO-Oberfläche.

PRODUKTUMFANG

- neues eigenständiges Spiel; keine Demo innerhalb eines Editors oder Asset Labs.
- genau zwei Welten; Auswahl vor Start.
- je Welt maximal 600 Einheiten äußere Gesamtspanne.
- begehbarer Kampf-/Erkundungskern ungefähr 220–340 Einheiten.
- kleine Arena-Session mit Endloswellen statt Open-World-Questspiel.
- ein lokaler Spieler; kein Netzwerk oder Backend.
- gemeinsamer Game-Host besitzt Kamera, Eingabe, Kampf, Gegner, Wellen, Audio, UI und Speicherzustand.
- Karten besitzen keine zweite Gameplay-, Eingabe-, Kamera-, Audio- oder UI-Runtime.

START UND UI

1. Startansicht zeigt nur:
   - Spieltitel,
   - zwei große Weltkarten mit Referenzbild/Name,
   - klaren ausgewählten Zustand,
   - einen primären Button `Start`.
2. Keine Einstellungen, Accounts, News, Shop, Charaktereditor oder Untermenüs.
3. `Start` lädt ausgewählte Welt und setzt Spieler an authored Eingang.
4. Ingame-HUD:
   - Lebensbalken,
   - Ausdauer,
   - Geistenergie für Ultimate,
   - aktuelle Welle und verbleibende Gegner,
   - acht Skill-Slots in einer kompakten unteren Leiste,
   - Hotkeys `Q E R 1 2 3 4 5`,
   - dunkler radialer oder flächiger Cooldown-Fortschritt,
   - verbleibende Cooldown-Sekunden,
   - klarer Disabled-Zustand bei fehlender Geistenergie.
5. Skillleiste bleibt auch bei starkem VFX lesbar.
6. Pause enthält nur `Fortsetzen`, `Welt neu starten`, `Zur Weltenauswahl`.
7. Tod zeigt `Erreichte Welle`, `Nochmal` und `Weltenauswahl`.

DIE ZWEI WELTEN

WELT 1 — SKYGLASS AQUEDUCT PALACE

- helle Hochplateau-Stadt über Canyon.
- breiter Steinplatz als zentraler Kampfbereich, ungefähr 100–130 Einheiten breit.
- großes Palastportal als Hauptlandmarke gegenüber Spielerstart.
- kleinere begehbar umgehbare Häuser, Türme, Treppen, Mauern, Statuen, Banner, Pflanzkübel und Marktprops fassen Platz.
- Aquädukt-Ring im Hintergrund mit wiederholten Bögen und Wachtürmen.
- türkisfarbene Kanäle führen durch Platzränder; mehrere Wasserfälle stürzen in Canyon.
- sichere Brüstungen und Blocker verhindern Sturz aus Spielraum.
- Gegner-Spawnzone liegt im zentralen Bodenmedaillon; mehrere Spawnanker verteilen Gruppen ohne Pop-in.
- Licht: warme gerichtete Sonne, kühles Himmelslicht, türkisfarbener Wasserbounce, goldene Innenlichter, klare Kontaktschatten.

WELT 2 — VERDANT TITAN GROVE FORTRESS

- uralter Waldkessel mit gigantischen Baumstämmen als Hero-Landmarken.
- runde Runenlichtung als zentraler Kampfbereich, ungefähr 100–120 Einheiten Durchmesser.
- große Holzhalle/Festung gegenüber Spielerstart.
- kleinere Häuser, Pagodendächer, Terrassen, Treppen, Brücken, Felsgärten, Laternen und Wurzeltor um Lichtung.
- Felsen, Wurzeln, Moos, Farne, Büsche und kleine Bäume verbinden Architektur mit Boden.
- große Titanbäume sind authored Landmarken, nicht zufälliger Scatter.
- Gegner-Spawnzone folgt zentraler Runenspur; Spawnanker bleiben vom Spielerstart getrennt.
- Licht: warmer Sonnenkegel durch Kronendach, kühler grüner Umgebungsfill, warme Fenster/Laternen, sichtbare Luftperspektive ohne milchigen Nahnebel.

ASSET-LAB-ARTIGE WELTARCHITEKTUR

1. Definiere einen kleinen gemeinsamen `DungeonMapEntry`-Hostvertrag.
2. Jede Karte besitzt einen eigenen Ordner und ein lokales `build(seed)`.
3. `build(seed)` liefert:
   - `families` für instanzierte Primitive,
   - `surfaces` für eigenes Terrain, Wasser und besondere Formen,
   - `playfield` mit `groundHeightAt`, Spielerstart, Arena, begehbarer Grenze und Blockern,
   - Kamera-/Lichtprofil,
   - Spieler-, Gegner- und Bossanker.
4. Karten importieren keine fertigen Builder der jeweils anderen Karte.
5. Erlaubt sind nur neutrale gemeinsame Grundformen, Matrix-/Seed-Helfer und Hostverträge.
6. Jede Karte besitzt eine reine lokale `groundHeightAt(x,z)`-Funktion.
7. Dieselbe Funktion setzt Terrain, Gebäude, Props, Wasserbezug, Spieler, Gegner und VFX-Bodenanker.
8. Sample Boden in ein einziges vollständiges Terrain-Mesh pro Karte; ungefähr 96–180 Segmente nach sichtbarer Form.
9. Große Formen sind authored:
   - Skyglass: Plaza, Palastpad, Kanäle, Randterrassen, Aquäduktfundamente und Canyonabfall.
   - Verdant: Lichtung, Hallenpad, Wege, Terrassen, Wurzelhügel und Randanstieg.
10. Nutze lokale FBM-/Ridge-Noise nur für Reliefbruch; kein richtungsloses Noise-Terrain.
11. Keine gemeinsame Bake-Pipeline, globale Splatmap, globales Biomfeld oder Großwelt-CDLOD.
12. Terrainmaterial je Karte:
   - Vertexfarben oder lokaler Shader,
   - klare Rollen aus Höhe, Steigung, Noise und Masken,
   - Skyglass: heller Stein, dunkles Metall/Holz, Türkiswasser, Goldakzent.
   - Verdant: dunkler Waldboden, Moos, warmer Holzbau, Fels, Farn- und Lichtakzent.
13. Architektur aus beitragslokalen Familien:
   - Boxen, Keile, Stämme, Kronen, Dachmodule, Bögen, Brüstungen, Fenster, Banner, Felsen und Props,
   - nach Grundform/Material instanzieren,
   - Hero-Silhouetten als eigene Surface-Geometrie, wenn Primitive nicht reichen.
14. Vegetation entsteht einmal bei `build(seed)`:
   - lokale Höhen-/Wasser-/Straßen-/Gebäudemasken,
   - klare Arten und Silhouetten,
   - keine Baumchunks oder lokale LOD-Engine ohne messbaren Nutzen.
15. Wasser besteht aus lokalen Surface-Geometrien:
   - Skyglass-Kanäle, Becken und Randwasserfälle,
   - Verdant-Bach/Teich oder feuchte Rinnen nur dort, wo Komposition profitiert,
   - einfache hochwertige Wellen-, Schaum- und Wasserfallshader.
16. Host besitzt Licht, Wind, Wetter, Tone Mapping und Postprocessing; Karte baut keine zweite Umweltengine.
17. Karten dürfen wenige lokale Haze-/Sonnenstrahl-/Wasserflächen liefern, aber keine zweite Sonne oder globale Runtime.
18. Ganze Karte bleibt geladen; Chunking/LOD nur bei belegtem Verwerfen durch echte Kamera.
19. Ziel pro Karte:
   - höchstens ungefähr 20–24 Instanzfamilien,
   - höchstens ungefähr 24–34 Oberflächen,
   - über 54 geschätzte Draw Calls braucht konkrete sichtbare Begründung.
20. Playfield ist einstöckig; Türen und Arenaachsen bleiben echte Lücken.

VOXEL-LIKE CHARAKTERSYSTEM

- Baue keine realistischen Menschenmodelle und keine einfachen Minecraft-Würfelmenschen.
- Erzeuge Körper und Rüstung prozedural aus benannten Voxel-Teilen mit stabilen Part-IDs, lokalen Pivotpunkten und Materialrollen.
- Spielerpalette: Mondsilber, tiefes Indigo, Cyan-Energie und begrenzter Goldakzent.
- Gegner sind kreaturenartige Voxel-/Steinwesen statt Menschen: kantige Felsplatten, Bruchkanten, Kristalle und klar lesbare Tierproportionen bilden Körper und Rüstung.
- Gesichter bleiben vollständig maskenhaft und zeigen ausschließlich ein Paar leuchtende Augen; keine sichtbaren Münder, Nasen, Zähne, Haut oder realistischen Gesichtszüge.
- Augenform, Augenfarbe, Silhouette und Hell-Dunkel-Verteilung trennen Rollen schon aus Kampfdistanz; zusätzliche Farben allein reichen nicht.
- Spieler darf ein eigener Hero-Rig-Renderpfad sein; wiederholte Gegnerteile werden nach Geometrie/Material instanziert oder gebatcht.
- Erzeuge nie ein React-Element oder einzelnes Mesh pro Körperteil und Gegner.
- Für gebatchte Rigs trägt Geometrie mindestens `aPartId/aBoneId`, `aPivot`, `aActorId`, `aBaseColor` und optionale Emissive-/Maskenattribute.
- Vertex-Shader transformiert Position und Normale um echten Gelenkpivot über Bone-/Part-Matrix; Licht darf nicht an Restpose kleben.
- Interaktive Bone-Matrizen kommen aus Actor-Zustand und normalisierter Clipzeit, nicht allein aus globaler Weltzeit.
- Animationssolver berechnet Actor-Pose einmal pro Frame und schreibt Part-Matrizen, Waffenanker und Trefferanker gebündelt; kein React-State pro Gelenk.
- Gleicher Actor-Zustand + gleiche Clipzeit erzeugt dieselbe Pose; Animation bleibt deterministisch und prüfbar.
- Ziel: stilisierte Voxel-Actionfigur mit facettierten Quader-/Keilvolumen, klarer Rüstungsschichtung und hochwertiger Silhouette.
- Spieler ist eine Schwertkämpferklasse:
  - kantiger Kopf mit leuchtenden Augen; keine realistischen Gesichtszüge,
  - Brustpanzer, Hüftpanzer, Schulterplatten, Unterarmschienen und Stiefel als getrennte Volumen,
  - asymmetrische Schulter-/Taillenform für Wiedererkennung,
  - Katana in rechter Hand, Scheide an linker Hüfte,
  - Stoff-/Bannersegmente nur als wenige kontrollierte Teile.
- Nutze ein hierarchisches Voxel-Rig mit mindestens:
  - Root,
  - Becken,
  - Brust,
  - Hals/Kopf,
  - linke/rechte Schulter,
  - Ellbogen,
  - Handgelenk,
  - Hüfte,
  - Knie,
  - Knöchel/Fuß,
  - Waffen- und Scheidenanker.
- Gelenkpivots liegen anatomisch an Schulter, Ellbogen, Hüfte und Knie; Glieder drehen nicht um ihren Mittelpunkt.
- Katana, Scheide, Trail, Cast-Ursprung und Trefferpunkt bleiben an echten Rig-Ankern befestigt.
- Interaktive Animation nutzt Actor-Zeit und Zustandsmaschine, keine globale 20-Sekunden-Schleife.
- Animationszustände:
  - Idle mit Atmung und Gewichtswechsel,
  - Lauf/Sprint/Strafe mit gegensinnigen Armen und gepflanzten Füßen,
  - Ausweichrolle oder Windstep,
  - drei LMB-Kettenschläge,
  - schwerer RMB-Hieb,
  - Block und Parry,
  - acht Skillclips,
  - Treffer, Stagger, Knockback, Knockdown, Tod und Sieg.
- Jeder Angriff besitzt Anticipation → Travel → Contact → Recovery.
- Schadensfenster ist nur am sichtbaren Kontakt aktiv.
- Blende kompatible Posen weich; halte Cancel-Fenster, Inputbuffer und Bewegungsfreigabe bewusst.
- Verhindere Fußgleiten, starres Ganzkörperdrehen, gleitende Gegner und vom Handgelenk getrennte Waffen.
- Gegner verwenden dasselbe Rigsystem, aber eigene Silhouetten, Proportionen, Rüstung und Waffen.

STEUERUNG UND KAMPFGEFÜHL

- `WASD`: Bewegung relativ zur Kamera.
- Maus: Kamera und Zielrichtung.
- `Shift`: Sprint.
- `Space`: Ausweichen mit kurzer Unverwundbarkeit und sichtbarer Bewegungsbahn.
- `LMB`: schnelle dreiteilige Schwertkette.
- `RMB`: schwerer Hieb; gehalten = Block.
- optionales Soft-Lock priorisiert Gegner in Blick-/Reichweitenkegel, ohne Kamera hart einzusperren.
- Treffer braucht räumliche Hitbox, Teamfilter, einmalige Treffer-ID pro Schwung und klare Reichweite.
- Kampf ist schnell, cancelbar und druckvoll, nicht floaty oder animationsgesperrt.
- Trefferfeedback schichtet kurzen Hitstop, kleinen Kameraimpuls, Gegnerreaktion, VFX und räumlichen Sound.
- Kameraimpuls bleibt kurz und begrenzt; keine dauerhafte Übelkeitsbewegung.

FESTE SKILLPALETTE

- `Q — Windstep Sever`, Cooldown 5 s:
  - kurzer gerichteter Dash durch Ziel,
  - horizontale Schwertspur,
  - versetzte Nachbild-Silhouette,
  - Gegner am Kontakt leicht versetzt/staggered.
- `E — Moon Guard`, Cooldown 8 s:
  - kurzes Parry-Fenster,
  - bei Erfolg radialer Konterbogen und starker Stagger,
  - bei Fehlschlag nur kurzer Guard ohne Gratis-Schaden.
- `R — Tempest Wheel`, Cooldown 10 s:
  - kontrollierter Wirbelhieb um Spieler,
  - flacher Bodenring zeigt Reichweite,
  - zieht nahe leichte Gegner minimal zusammen.
- `1 — Crescent Wave`, Cooldown 6 s:
  - breiter bodennaher Schwertbogen fliegt vorwärts,
  - endet am echten Kollisions-/Reichweitenpunkt.
- `2 — Skyward Fang`, Cooldown 9 s:
  - Aufwärtshieb mit kleinem Launch,
  - Spieler folgt kontrolliert in kurze Luftkombo,
  - Bodenkontakt bleibt beim Start sichtbar.
- `3 — Phantom Blades`, Cooldown 14 s, kostet Geist:
  - drei zeitversetzte Geisterklingen treffen markierte Ziele,
  - jede Klinge besitzt Start, Flug, Kontakt und eigenen Trefferimpuls.
- `4 — Storm Domain`, Cooldown 18 s, kostet Geist:
  - begrenzte Bodenzone mit authored Randmaske,
  - pulsierende Schnitte und Windlinien,
  - keine sichtbare rechteckige Trägerfläche.
- `5 — Heaven Splitter`, Cooldown 35 s, benötigt volle Geistenergie:
  - kurze lesbare Vorbereitung,
  - großer vertikaler Schwertbogen,
  - Kontaktkern, Halo, Richtungsbogen, Funken, Bodennarbe und Druckring,
  - stärkster Moment des Sets, ohne Bildschirm vollständig zu verdecken.
- Cooldowns, Kosten, Schadenswerte und Kontrollwirkung liegen in einer gemeinsamen Skilldefinition; UI, Kampf und KI lesen dieselbe Quelle.

VFX- UND AUDIOQUALITÄT

- Jede Wirkung folgt Ursache → Flug/Bewegung → Kontakt → Reaktion → Ausklang.
- VFX-Ursprung kommt aus Hand, Schwertkante, Fußkontakt, Zielkontakt oder authored Bodenanker.
- Schichte VFX nach Rollen:
  - solide Bodennarbe/Decal,
  - heller Kern,
  - weicher Halo,
  - gerichteter Trail/Bogen,
  - Funken/Splitter,
  - Staub/Wind,
  - kurzes dynamisches Licht,
  - passende Gegnerreaktion.
- Masse schreibt Tiefe; Lichtlayer dürfen transparent/additiv sein.
- VFX dürfen Charakter- und Gegner-Silhouetten am Kontakt nicht dauerhaft verdecken.
- Nutze Objektpools für Partikel, Trails, Trefferlichter, Decals und Spawnfragmente.
- Audio je Skill: Vorbereitung, Swing/Travel, Kontakt, tiefer Impact, Ausklang.
- Schritte, Rüstung, Schwert, Wasser, Wind, Wald, Arena und Gegner besitzen räumliche Rollen.
- Musik startet zurückhaltend, verdichtet sich bei Elite/Boss und bleibt endlos loopbar ohne hörbaren Sprung.

ENDLOSSYSTEM UND GEGNER

- Wellen laufen `1…∞`; kein finales Victory-Gate.
- nächste Welle startet nach kurzer klarer Pause, sobald vorige Gegner besiegt sind.
- ein gemeinsamer `WaveDirector` ist Hauptquelle für Wellenzahl, freigeschaltete Arten, Zusammenstellung, Skalierung, Elite-Modifikatoren und Bossrotation.
- jede fünfte Welle `5, 10, 15, …` ist zwingend eine Bosswelle mit Boss plus reduzierter Begleitung; es gibt keine bossfreie fünfte Welle.
- Bosswellen wechseln deterministisch zwischen Titan Golem und Storm Wyrm; spätere Auftritte ergänzen neue Phasen, Angriffskombinationen und stärkere Begleiter statt nur mehr Lebenspunkte.
- Schwierigkeit fällt nie zurück: Lebenspunkte, Schaden und Stagger-Widerstand steigen pro Welle über stabile, begrenzte Formeln; Bewegungs- und Angriffstempo steigen langsamer und besitzen sichere Obergrenzen.
- jeder Fünf-Wellen-Abschnitt schaltet neue Arten, Angriffe, Gruppenkombinationen oder Elite-Modifikatoren frei.
- Wellen 1–4 führen die ersten vier regulären Arten ein; Wellen 6–9 ergänzen zwei weitere; ab Welle 11 stehen alle acht regulären Arten für zunehmend gemischte Gruppen bereit.
- ab Welle 6 dürfen Elite-Modifikatoren reguläre Arten verstärken, gelten aber nie als zusätzliche Gegnerart.
- nach Freischaltung mehrerer Arten dürfen zwei aufeinanderfolgende Nicht-Bosswellen nicht dieselbe Gegnerzusammenstellung verwenden.
- aktive Gegnerzahl bleibt hart begrenzt; Zielbereich ungefähr 18–24 gleichzeitig nach Performancebeleg.
- alle Spawn-/Gegner-/Projektileffekte verwenden Pools; keine ungebremste Objektansammlung.
- es gibt genau zehn Gegnerarten; acht reguläre Kreaturen plus zwei Bosskreaturen:
  1. Stonefang Wolf: niedriger schneller Vierbeiner mit Rudelkreisen, Sprungbiss-Telegraphie und verwundbarer Erholung,
  2. Crystal Mantis: schmaler Kristalljäger mit Seitenschritten, Scherenkombo und klarer Kreuzschnitt-Warnung,
  3. Rootshell Beetle: gepanzerter Käfer-Tank mit Frontschutz, Stoß und offenem Hinterleib als Konterfläche,
  4. Shardwing Raven: fliegende Steinkreatur mit Schattenwarnung, Sturzflug und kurzer Bodenphase,
  5. Obsidian Ape: schwerer Brecher mit Felsfaust-Kombo, Sprungschlag und radialer Bodenwarnung,
  6. Runehorn Stag: schneller Anstürmer mit sichtbarer Angriffslinie, Wandstagger und weitem Geweih-Sweep,
  7. Boulder Tortoise: langsame Artilleriekreatur mit Steinpanzer, Splittergeschoss und unterbrechbarer Aufladung,
  8. Hollow Serpent: segmentierte Steinschlange mit Bodenwelle, kurzem Abtauchen und klar markiertem Auftauchpunkt,
  9. Titan Golem: massiver Boss aus schwebenden Voxel-Felsplatten mit zwei bis drei Phasen, zerstörbaren Panzerrollen und großen Bodenwarnungen,
  10. Storm Wyrm: langer Voxel-Steinwyrm mit Flug-/Bodenwechsel, Blitzaugen, Schneisenangriff und arenaweiter, aber ausweichbarer Bossmechanik.
- alle zehn Arten besitzen steinartige Voxel-Silhouetten; im Gesicht sind aus jeder relevanten Distanz nur die leuchtenden Augen erkennbar.
- reguläre Arten und Bosse brauchen eigene Proportionen, Bewegungsmuster, Angriffsreichweiten, Telegraphien und Konterfenster; reine Farbvarianten sind ungültig.
- Gegner navigieren um Häuser, Wasser, Bäume, Wurzeln, Brüstungen und Arena-Props; Flug- und Abtauchphasen respektieren dieselben Spielraumgrenzen.
- kein Gegner läuft durch Geometrie, greift durch Wände an oder spawnt im Spieler.

SPAWN-ANIMATION

- Gegner erscheinen ausschließlich an zentralen authored Spawnankern der Arena.
- Spawn besitzt 0,8–1,4 s lesbare Telegraphie vor Aktivierung.
- Skyglass: Bodenrune leuchtet türkis/gold; Voxel-Fragmente steigen aus Lichtspalte und setzen Körper segmentweise zusammen.
- Verdant: Wurzelrune wächst; Blätter, Holzsplitter und grünes Licht formen Silhouette aus Boden.
- Ablauf: Bodenzeichen → Partikelaufstieg → Rig-Zusammenbau → Kernflash → Materialstabilisierung → Gegner wird aktiv.
- Gegner ist während Aufbau nicht schädlich und nicht unsichtbar treffbar.
- Spawnlicht, Partikel und Sound bleiben am selben Anker.
- Wellenmanager verteilt Spawnzeiten, damit nicht alle Effekte im selben Frame starten.

LICHTSYSTEM

- eine zentrale Environment-SSoT steuert Sonnenlicht, Himmelsfill, Nebel, Schatten, Belichtung und Color Grade.
- Skyglass: warmes Keylight, kühler Canyonfill, Wasserbounce, helle Steinlesbarkeit, goldene Innenakzente.
- Verdant: gerichtete Sonnenstrahlen, kühler Kronenschatten, warmer Fenster-/Laternenkontrast, kontrollierter Höhennebel.
- Cascaded oder passende gerichtete Schatten decken Spieler, Gegner und Arena ab; Fernkulisse braucht geringere Schattenqualität.
- maximal wenige gepoolte Skill-/Spawnlichter gleichzeitig; Intensität und Lebensdauer begrenzen.
- Bloom unterstützt HDR-Kerne, ersetzt aber keine Form oder Materialtrennung.
- Tone Mapping und Belichtung verhindern ausgebrannte VFX sowie schwarze Schatten.

ORCHESTRIERUNG NACH CREATE-PROMPT-GUIDE

- Wenn Harness Sub-Agenten unterstützt, teile fachlich:
  1. Game-/State-Architektur,
  2. beide beitragslokalen Weltbuilder,
  3. Voxel-Rig und Animation,
  4. Kampf, Skills und Trefferlogik,
  5. Gegner-KI, Navigation und Endloswellen,
  6. VFX und Licht,
  7. UI/UX und Audio,
  8. Performance und unabhängige Abschlusskritik.
- Jeder Fachbereich liefert einen kohärenten integrierbaren Schnitt statt isolierter Demos.
- Unabhängiger Reviewer prüft Architektur, Funktion, Zahlen und stärksten Gegenbeweis.
- Konkreter Fund öffnet genau eine gezielte Korrektur; keine ritualisierte Wiederholung.
- Keine agentische Screenshot-/Browserprüfung ohne ausdrückliche Freigabe im aktuellen Userauftrag.
- Direkte sichtbare und spielerische Endabnahme bleibt beim User.

PERFORMANCE UND GATES

- Ziel: stabile 60 FPS auf definierter Zielhardware; ohne Messung keine FPS-Behauptung.
- berichte CPU-/GPU-Framezeit p50/p90/p99, Draw Calls, Dreiecke, aktive Gegner, Partikel und Schattenkosten.
- instanziere wiederholte Weltformen und Voxel-Gegnerteile, wenn Bewegungsarchitektur es erlaubt.
- keine per-frame Geometrie-/Materialerzeugung, ungebremsten Arrays oder React-State-Updates im Renderloop.
- nutze Pools für Gegner, Projektile, Treffer, VFX, Decals, Audioquellen und dynamische Lichter.
- entferne zuerst unsichtbare Fernkosten, überzählige Schatten und sekundäre Partikel; erhalte Charakter-, Skill- und Arenaerkennbarkeit.
- statische Gates prüfen:
  - TypeScript,
  - deterministischen Map-Build,
  - Bodenparität,
  - Spawn außerhalb Blockern,
  - vollständige Skilldefinitionen,
  - endliche Shaderuniforms,
  - Ressourcen-Dispose,
  - aktive Gegner-/Poollimits.
- keine neuen Browser-, Screenshot- oder Gameplaytests ohne ausdrücklichen Userbefehl.

LIEFERREIHENFOLGE

1. Regeln, Bestand und Referenzen verstehen.
2. gemeinsamen Game-Host, Statefluss und Weltenauswahl bauen.
3. `DungeonMapEntry`, neutrale Primitive und Surface-Vertrag bauen.
4. Skyglass als vollständigen Vertical Slice bauen.
5. Voxel-Spieler, Grundkampf und Kamera integrieren.
6. acht Skills, VFX, Audio und Skillleiste integrieren.
7. Gegner-Rigs, KI, Spawn und Endloswellen integrieren.
8. Verdant als zweiten eigenständigen Weltbuilder bauen.
9. Licht, Materialtrennung, Performance und Sonderfälle schließen.
10. statische/numerische Gates bündeln; sichtbare Abnahme dem User übergeben.

FERTIG WENN

- Startansicht lässt genau Skyglass oder Verdant wählen und startet direkt.
- beide Karten nutzen denselben Hostvertrag, besitzen aber eigenständige Weltbuilder.
- Spieler und alle Gegner sind hochwertige Voxel-Rigs mit gelenkiger Ganzkörperanimation.
- `Q E R 1–5` funktionieren, zeigen Cooldowns und besitzen befestigte VFX/Audio/Treffer.
- Endloswellen, Eliten und Bosse laufen ohne ungebremstes Wachstum.
- Gegner spawnen sichtbar in Arenamitte und werden erst nach Aufbau aktiv.
- Weltlicht, Skilllicht, Materialien und Tone Mapping bleiben lesbar.
- UI ist schön, kompakt und auf Start + Kampfwerte begrenzt.
- statische und numerische Gates sind grün; sichtbares Kampfgefühl bleibt ehrlich als Userabnahme markiert.
```

## 4. Auswahlhilfe

### Prompt A wählen

- weitere Welten sollen später hauptsächlich als Specs hinzukommen.
- Boden, Wasser, Vegetation, Licht und Kollision sollen über Karten identisch funktionieren.
- höhere Anfangsinvestition für langfristig gemeinsame Welttechnik ist erwünscht.
- Vergleich soll zeigen, wie gut ein Kaze-artiges System auf kleine 600-Einheiten-Welten skaliert.

### Prompt B wählen

- jede Welt darf ihre stärkste lokale Geometrie- und Shaderlösung besitzen.
- schneller Einzelkartenbau und unmittelbare Referenznähe sind wichtiger als gemeinsame Bake-/Feldarchitektur.
- Vergleich soll zeigen, wie stark KI zwei hochwertige kompakte Weltbeiträge unabhängig bauen kann.
- gemeinsamer Game-Host reicht als stabile Klammer für Kampf, Charaktere, UI und Endlossystem.

## 5. Größter Promptunterschied

```text
Prompt A fragt zuerst:
„Welche gemeinsame Weltwahrheit und Weltengine tragen Skyglass und Verdant?“

Prompt B fragt zuerst:
„Welche lokale Geometrie, Materialien und Komposition machen diese eine Welt am stärksten?“
```

- Charaktere, Animationen, Skills, VFX, Gegner, Endloswellen, Lichtwirkung und UI bleiben absichtlich gleich.
- Nur Weltaufbau und Wiederverwendungsarchitektur unterscheiden sich.
