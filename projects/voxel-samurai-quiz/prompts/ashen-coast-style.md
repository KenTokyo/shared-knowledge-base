# Ashen Coast Style — lokale AEON-Spec-/Bake-Weltengine

**Verwendung:** Vollständig kopieren und als Bauauftrag im Zielrepository ausführen.
**Konstante:** Spiel, Charakter, Kampf, Skills, Gegner, Wellen, Spawn, Audio und UI bleiben gegenüber den zwei Schwesterprompts gleich.
**Einziger Vergleichsbereich:** Map-Aufbau, Map-Rendering, Map-Lichtkopplung und sichtbare Skillrückstände.
**Map-Fokus:** Lokale V73-AEON-Bauweise mit authored WorldSpec, gestuftem Bake, gemeinsamen Weltfeldern und materialsemantischem InteractionField.
**Sichtprüfung:** Keine automatische Browser-/Screenshot-/Gameplayprüfung ohne aktuellen ausdrücklichen Userauftrag.

```text
CREATE SKYGLASS & VERDANT ENDLESS VOXEL SLASHER — ASHEN COAST STYLE AEON WORLD ENGINE

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

ASHEN-COAST-STYLE-WELTARCHITEKTUR

1. Nutze ausschließlich lokale AEON-Bauweise als Architekturvorbild:
   - `src/engine/world/worlds/v73AshenCoast.js`,
   - `src/engine/world/WorldSpec.js`, `Heightfield.js`, `Terrain.js`, `Structures.js`, `TreeField.js`,
   - `src/engine/render/Environment.js` und `Water.js`.
2. V73 Ashen Coast ist fertige Referenz und bleibt unverändert; baue Skyglass und Verdant als neue Specs derselben Prinzipien, nicht als Kopien der Aschenküste.
3. Eine geschlossene `WorldSpec` ist Hauptquelle je Welt; fehlendes Pflichtfeld scheitert beim Boot laut statt drei Systeme später als leere Fläche.
4. Löse ausgewählte Welt vor Allocation von Heightfield, Typed Arrays und Runtime-Systemen genau einmal auf; friere aktive Spec ein oder führe einen vollständigen kontrollierten Reload aus, nie einen halben Live-Swap.
5. Jede Spec authoriert mindestens:
   - Weltmaß, Meer-/Wasserbasis, getrennte Feldauflösungen und Seed,
   - Landmassensilhouette, Grate, Sporne, Peaks und große Senken,
   - Flusskontrolllinie/-profil, Teiche, Kanäle und Küsten-/Wassergrenzen,
   - Straßen, Nebenwege, Baupads, Landmarken, Camps und Fernträger,
   - Biomregionen, Spielerstart, Gegner-/Bossanker,
   - überprüfbare Kamera-/Kompositionsintents statt nur vergänglicher Koordinaten.
6. Authore große Formen und Routen bewusst; Noise bricht Oberfläche und Übergänge, entscheidet aber nie allein, wo Arena, Landmarke, Fluss oder Weg liegt.
7. Gemeinsame Bake-Pipeline läuft in fester Abhängigkeitenreihenfolge:
   - Distanzfelder für Grate, Wasserwege und Straßen,
   - analytische Makroform aus Spec,
   - Erosion/Verwitterung,
   - Wasserprofil aus erodiertem Boden ableiten und Bett/Ufer danach formen,
   - Straßen graden, Pads planieren und Fernformen setzen,
   - auf finale Höhe hochsamplen und feines Relief ergänzen,
   - Normalen/Steigung, Material-Splat und Biom-/Dichtefeld ableiten.
8. Alles nach dem Bake liest dieselben Felder: Terrain, Spieler, Gegner, Kamera, Strukturen, Vegetation, Wasser, VFX, Spawn und Map-Reaktion.
9. `groundHeightAt`, Normale, Steigung, Wasserhöhe, Splat und Biomabfrage stammen aus finalem Bake; keine CPU/GPU-Doppelimplementierung mit abweichender Interpolation.
10. Cache ist deterministisch und weltgebunden; Schema-/Bake-Version, Seed, Auflösungen, Welt-ID und Quellenhash verhindern stale oder vertauschte Welten.
11. Skaliere V73-Zahlen nicht blind auf maximal 600 Einheiten:
   - jede Feldauflösung folgt kleinster sichtbarer/spielerisch benötigter Frequenz,
   - Weltgröße, Bake-, Splat-, Biom- und Distanzfeldauflösung bleiben getrennte Entscheidungen,
   - LOD lohnt nur, wenn echte Zielkamera Flächen oder Detailstufen verwirft.
12. Kontinuierlicher Boden nutzt bei belegtem Bedarf Ashen-Coast-artiges CDLOD/Quadtree-Terrain: ein wiederverwendetes Patchmesh, instanzierte Knoten, enge Frustum-Auswahl und Morphband zwischen Nachbarstufen.
13. Beauty- und Schatten-/Depth-Pfad verwenden identische Patchplatzierung, Kamerauniform, Höhenabtastung und Morphlogik; Lichtkamera darf Gelände nicht anders displacen als Spielkamera.
14. Terrainmaterial mischt wenige klare Materialrollen aus gemeinsamen Texturarrays und Splat/Biome: Stein, Boden/Gras, Sand/Schutt, Weg und Nässe; Steilwände erhalten passende Projektion statt verschmierter Top-UVs.
15. Skyglass-Spec authoriert Plateau, Plaza, Palastpad, Kanäle, Aquäduktfundamente, Canyonrand und sichere Zugänge als zusammenhängende Felder/Sites.
16. Verdant-Spec authoriert Waldkessel, Lichtung, Hallenpad, Wege, Terrassen, Wurzelhügel, Titanbaumstandorte und Randanstieg als zusammenhängende Felder/Sites.
17. Strukturen samplen mehrere Punkte ihres finalen Footprints; Oberseite sitzt über höchstem Kontakt, Plinthenschürze reicht unter tiefsten, damit weder schweben noch Eingraben möglich ist.
18. Bauten werden pro Site und Material gebatcht, nicht zu einem Inselmesh verschmolzen; Site-Bounds erhalten Frustum-Culling und wiederholte Formen behalten maßstabsgerechte Welt-UVs.
19. Strukturen veröffentlichen Clearings, Pflaster/Wege, Collider, begehbare Sonderflächen und benannte Anker; Vegetation, Materialpfad, Spieler und Gegner lesen dieselben Ergebnisse.
20. Gras/Blumen dürfen kamerarelativ und shadergetrieben arbeiten; große Bäume werden einmal deterministisch aus Biom, Splat, Wasser, Steigung und Clearings gestreut, räumlich gechunkt und instanziert.
21. Jeder sichtbare Zufallsparameter erhält unabhängigen stabilen Hashstrom; Existenz/Position dürfen nicht ungewollt Yaw, Größe, Helligkeit oder Artenwahl koppeln.
22. Wasser entsteht aus fertigem Gelände:
   - Flussoberfläche läuft nicht bergauf,
   - Bett/Ufer passen zum Profil,
   - Wasserfälle entstehen an gemessenen Gefällestrecken,
   - Teichoberfläche liegt in einem tatsächlich haltenden Bowl,
   - Shader-Tiefe nutzt dieselbe Höhenabfrage wie Boden.
23. Laufzeitreaktion liegt als begrenztes materialsemantisches `InteractionField` über unveränderlichem Baseline-Bake; Skillnarben schreiben nie zurück in signierten Terrain-Cache.
24. `WorldImpactEvent` fragt am echten Kontakt Splat, Biom, Wasser und Site-Belegung ab; Materialrolle bestimmt Kerbe, Verdrängung, Bruch, Nässe und Erholung statt Karten-Sondercode im Skill.
25. Beauty-, Depth-/Prepass- und Schattenpfad lesen denselben gefilterten Reaktionsoffset; Gameplayhöhe bleibt stabil, solange Rückstände kosmetisch sind.
26. Reaktionsfeld nutzt gecappte Weltkacheln oder fokusnahes Fenster mit Feldrevision, vollständigem Reset und sicherem Fallback auf Strukturen/Wasser/steilen Flächen.
27. Eine Environment-SSoT besitzt Tageszeit, Wetter, Sonnenrichtung/-farbe/-stärke, Himmels- und Bodenfill, Nebel/Haze, Wind, Schatten, Belichtung und Color Grade.
28. Sky-Dome, gerichtete Schatten, Environment-Probe, Terrain, Vegetation, Wasser, Skilllichter und PostFX lesen diese SSoT; kein Consumer erfindet eigene Sonne oder unabhängigen Nebel.
29. Licht folgt Ashen-Coast-Prinzipien: Cross-/Backlight zeichnet Gras und Oberflächenkanten, warmer Schlüssel trennt sich von kühlem Sky-Fill, Ground-Bounce hält Schatten materialgerecht und Luftperspektive trägt echte Vorder-/Mittel-/Hintergründe.
30. Specs beschreiben Kameraintents aus Motiv, Distanz, Peilbogen, Lichtbezug, freier Sicht, Vordergrund und Geländeabfall; Koordinaten werden aus finalem Bake gelöst und nach Weltänderung neu validiert.
31. Visuelles Ziel: authored kompakte Welt mit dichter lokaler Geografie, konstruktiv passenden Systemen und klaren drei Tiefenebenen; kein Noise-Terrain mit aufgesetzten Props.

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

MAP-REAKTION AUF BEWEGUNG UND SKILLS

- Kampfwerte, Trefferzeit, Reichweite, Cooldown und Kontrolle bleiben unabhängig von Map-Stil und Oberflächenmaterial identisch.
- Ein gemeinsames `WorldImpactEvent` ist einzige Übergabe vom Kampf an die Map: stabile Ereignis-ID, Welt-ID, finaler Kontaktpunkt, Oberflächennormale, Richtung, Footprint, Stärke, Dauer und Reaktionsrollen.
- Event entsteht am echten Waffen-, Projektil-, Fuß- oder Bodenkontakt; nie ersatzweise am Spielerursprung.
- Render, Map-Rückstand, Partikel, Licht und Audio lesen denselben Kontakt; keine getrennt geschätzten Trefferpunkte.
- Reaktion bleibt standardmäßig kosmetisch und verändert weder Schaden noch Navigation, Spawnfairness oder Bossmechanik.
- Skyglass reagiert materialgerecht mit eingeritztem Stein, abgeplatzten Kanten, verdrängtem Staub, feinen Bruchadern und kurzen Wasserwakes.
- Verdant reagiert materialgerecht mit aufgerissenem Moos, verdichtetem Boden, geschnittenen Blättern, gelöster Erde und belasteten Wurzeloberflächen.
- Architektur, Wasser, Brüstungen, Spawnanker und unzerstörbare Landmarken dürfen sichtbare Reaktion zeigen, verlieren aber keine spieltragende Kollision.
- Bewegungsreaktion: Schritte hinterlassen dezente Kontaktspuren; Sprint und Ausweichen ziehen breitere gerichtete Scuffs, ohne Arena in Sekunden zu übermalen.
- `Q — Windstep Sever`: schmale gerichtete Schnittspur entlang realer Dashbahn; Staub/Blätter werden seitlich verdrängt.
- `E — Moon Guard`: nur erfolgreicher Konter schreibt einen kurzen gebrochenen Druckring am Parry-Kontakt; Fehlschlag hinterlässt nichts Permanentes.
- `R — Tempest Wheel`: mehrere flache tangentiale Schnitte bilden einen unregelmäßigen Ring statt einer perfekten Kreistextur.
- `1 — Crescent Wave`: bodennahe Spur endet am echten Kollisions-/Reichweitenpunkt und wird mit Entfernung flacher.
- `2 — Skyward Fang`: Startkontakt öffnet einen kompakten Keilriss mit hochgedrücktem Rand in Hiebrichtung.
- `3 — Phantom Blades`: jede Geisterklinge schreibt genau eine schmale Kerbe am eigenen Zielkontakt.
- `4 — Storm Domain`: Pulse sammeln begrenzte kreuzende Schnitte innerhalb authored Randmaske; keine rechteckige Trägerfläche.
- `5 — Heaven Splitter`: tiefste gerichtete Furche des Sets mit gebrochenem Rand, Materialsplittern und langem, aber nicht ewigem Nachklang.
- Gleiche Event-ID darf keinen zweiten Rückstand schreiben; Mehrfachtreffer, Renderwiederholung und State-Replay bleiben idempotent.
- Rückstände besitzen feste Kapazität, räumliches Fenster oder gecappte Chunks; Überlast verwirft zuerst kleinste/älteste Sekundärspuren statt Speicher oder Draw Calls wachsen zu lassen.
- Oberfläche heilt oder verwittert langsam nach Materialprofil; starke Ultimate-Narbe bleibt am längsten, Mikroschritte am kürzesten.
- `Welt neu starten`, Tod-Neustart und Weltenwechsel löschen Map-Rückstände vollständig und deterministisch.
- Beauty-, Depth-/Prepass- und Schattenpfad müssen dieselbe sichtbare Geometrieänderung lesen; reine Farbmaske darf keine vorgetäuschte tiefe Furche behaupten.
- Unter Wasser ersetzt eine Welle/Trübung die dauerhafte Narbe; auf steilen oder unzuständigen Flächen wird Reaktion sicher auf Materialfeedback reduziert.
- Debugdaten zeigen aktive Kontakte, Rückstandsbelegung, verworfene Writes, Feld-/Chunkgrenze und Resetrevision; keine Browserprüfung ohne ausdrückliche Freigabe.

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

AUSFÜHRUNG UND CRAFT-LOOP

- Ausführungsprofil `linear`: ein Integrationsowner versteht Bestand und Referenzen, baut Gesamtprodukt und hält gekoppelte Entscheidungen in einem Kontext.
- Keine Subagents und keine neue Parallelarchitektur.
- Reihenfolge: Produktvertrag sichern → Game-Host → Map-Hauptweg → Charakter/Kampf → Skills → Gegner/Wellen → zweite Welt → Licht/Performance → Abschlussabgleich.
- Nach jedem zusammenhängenden Schnitt echtes Artefakt lesen: Besitz, Datenfluss, Registrierungen, Limits, Reset und statische Gates.
- Größten belegten Abstand beheben; keine feste Rundenzahl und keine Qualitätsbehauptung aus Selbsterklärung.
- Keine agentische Browser-, Screenshot-, Gameplay- oder FPS-Prüfung ohne ausdrückliche Freigabe im aktuellen Auftrag.
- Sichtbare Wirkung, Kampfgefühl und gemessene Laufzeit bleiben ohne Freigabe ehrliche manuelle Produkt-Gates.

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
  - aktive Gegner-/Poollimits,
  - begrenzte Map-Reaktion, vollständigen Reset und Parität von Beauty-/Depth-/Schattenpfad.
- keine neuen Browser-, Screenshot- oder Gameplaytests ohne ausdrücklichen Userbefehl.

LIEFERREIHENFOLGE

1. Regeln, Bestand und Referenzen verstehen.
2. gemeinsamen Game-Host, Statefluss und Weltenauswahl bauen.
3. geschlossenen WorldSpec-Vertrag, gestuften AEON-Bake und InteractionField-Grundlage bauen.
4. Skyglass als vollständigen Ashen-Coast-artigen AEON-Vertical-Slice bauen.
5. Voxel-Spieler, Grundkampf und Kamera integrieren.
6. acht Skills, VFX, Audio und Skillleiste integrieren.
7. Gegner-Rigs, KI, Spawn und Endloswellen integrieren.
8. Verdant als zweite eigenständige Spec derselben lokalen AEON-Weltengine bauen.
9. Licht, Materialtrennung, Performance und Sonderfälle schließen.
10. statische/numerische Gates bündeln; sichtbare Abnahme dem User übergeben.

FERTIG WENN

- Startansicht lässt genau Skyglass oder Verdant wählen und startet direkt.
- beide Karten nutzen dieselbe lokale Ashen-Coast-artige AEON-Weltengine und unterscheiden sich durch Specs, Sites, Felder und Materialprofile.
- Spieler und alle Gegner sind hochwertige Voxel-Rigs mit gelenkiger Ganzkörperanimation.
- `Q E R 1–5` funktionieren, zeigen Cooldowns und besitzen befestigte VFX/Audio/Treffer.
- Endloswellen, Eliten und Bosse laufen ohne ungebremstes Wachstum.
- Bewegung und alle acht Skills hinterlassen materialgerechte, begrenzte und vollständig rücksetzbare Map-Spuren.
- Gegner spawnen sichtbar in Arenamitte und werden erst nach Aufbau aktiv.
- Weltlicht, Skilllicht, Materialien und Tone Mapping bleiben lesbar.
- UI ist schön, kompakt und auf Start + Kampfwerte begrenzt.
- statische und numerische Gates sind grün; sichtbares Kampfgefühl bleibt ehrlich als Userabnahme markiert.
```
