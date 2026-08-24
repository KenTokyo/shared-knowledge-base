# Schwertskill-Animation und elementare VFX — global

**Lesen wenn:** Schwertskills, Kombos, Dashes oder Elementeffekte kraftlos, beliebig, armgetrieben oder voneinander entkoppelt wirken.  
**Status:** freiwillige Tipps · projektspezifische Verträge und gemessen bessere Lösungen haben Vorrang.  
**Schnitt:** Animation trägt Kraft und Kontakt; VFX verstärkt die lesbare Bewegung, ersetzt sie nie.

## Lokale Referenzboards

- [`references/sword-elemental-vfx-showcase-01.png`](references/sword-elemental-vfx-showcase-01.png) — acht klar getrennte Familien: Wind, Feuer, Erde, Blitz, Wasser, Lunar, Solar und Void; zeigt Elementbreite und lesbare Hero-Silhouetten.
- [`references/sword-elemental-vfx-showcase-02.png`](references/sword-elemental-vfx-showcase-02.png) — stärkste Peak- und Materialreferenz; zeigt Bogen, Ruptur, Säule, Wirbel, Fraktur und Blüte als unterschiedliche Hauptformen.
- [`references/sword-elemental-vfx-combo-sequences-03.png`](references/sword-elemental-vfx-combo-sequences-03.png) — primäre Animations-/VFX-Balance-Referenz; zeigt pro Skill mehrere aufeinanderfolgende Bewegungs- und Effektphasen statt nur eines Hero-Frames.

## Beobachtet, nicht automatisch vorgeschrieben

- Dunkle Kämpfersilhouetten bleiben trotz sehr heller Effekte lesbar.
- Effektenergie folgt Klinge, Körperbahn, Einschlag oder Standpunkt; sie schwebt nicht beliebig neben der Aktion.
- Familien unterscheiden sich durch Bewegungsphysik und Hauptform, nicht nur durch Farbe.
- Große Peaks besitzen gerichtete Leerräume und ein klares Zentrum; Bloom füllt nicht das ganze Bild gleichmäßig.
- Die Sequenztafel zeigt Antizipation, Beschleunigung, Kontakt und Auflösung als getrennte Bilder.

## Verbindlicher Bewegungsvertrag

- **VFX verdeckt schlechte Animation nur heller** — zuerst Ganzkörperkraft: Blick/Brust führen, Hüfte und Standbein laden, Schritt oder Push-off beschleunigt, Torso rotiert gegen, Schulter–Ellbogen–Handgelenk führen die Klinge, Nachlauf und Recovery fangen Impuls ab.
- **Kein Tennis-, Golf-, Besen- oder Arm-only-Schlag** — Klinge erhält eine eindeutige Schnittebene und ein Ziel; Füße wechseln Last, Distanz oder Winkel; Rumpf bleibt nicht frontal eingefroren.
- **LMB-Grundkette bleibt sofort spielbar** — drei schnelle, unterschiedlich gerichtete normale Treffer mit Eingabepuffer, je eigenem Fußmuster und kurzer bestätigbarer Recovery; VFX kleiner als Skills, aber Klingenpfad, Whoosh und Kontakt klar.
- **RMB bleibt defensiv wahr** — frischer Press öffnet kurzes Parry-Fenster, Halten geht in Guard; Pose, Winkel, Stamina, Funkenring und Audio müssen denselben Kontakt bestätigen.
- **Combo-Skill bedeutet mehrere echte Aktionen** — kein einzelner Swing mit längerem Partikelstrom. Jeder Puls besitzt eigenen Push-off, Klingenpfad, Marker, Trefferledger und Übergang; Wiederholung desselben Targets nur nach ausdrücklich neuem Kontaktmarker.
- **Dash braucht Körperursache und Bremsung** — komprimierte Antizipation, sichtbarer Fußabdruck/Push-off, beschleunigte Reise, Schnitt- oder Durchtrittkontakt, kontrollierter Ausfallschritt beziehungsweise Slide und Recovery. Afterimages folgen finalen Körperposen; sie ersetzen keine Bewegung.
- **Schnell heißt nicht gewichtslos** — Release darf explosiv sein, aber Antizipation, Richtungswechsel, Kontakt und Abfangphase bleiben einzeln lesbar.
- Repräsentative LMB-, Combo-, Dash-, Parry- und Ultimate-Aktionen bei `0.5×`, `1×`, `1.5×` und `2×` replaybar machen; Skelett/body-only vor VFX, danach integrierter Klingen-/Kontaktpass.

## Verbindlicher Elementvertrag

Jede Familie erhält eigene Form, Materialreaktion, Bewegungsgrammatik, Kontakt und Nachleben. Eine gemeinsame flammenartige Energiequalität bedeutet turbulente Zungen, beschleunigte Ribbons und explosives Abstreifen — nicht, dass alles wie orangefarbenes Feuer aussieht.

- **Feuer:** aufrollende Flammenzungen, glühender Klingensaum, Funkenabriss, kurzer Verbrennungskern und abkühlende Glut.
- **Wind:** helle Drucksicheln, faserige Strömungsribbons, Staub-/Blattabriss, scharfer Vakuumkontakt und schnell ausdünnender Nachlauf.
- **Erde:** gewichtete Risslinie, gerichtete Platten-/Splitterhebung, lokaler Staubstoß und schweres Absinken; keine arenaweite transparente Scheibe.
- **Blitz:** Ladung entlang Griff/Klinge, verzweigte aber gerichtete Entladung am Kontakt, kurzer Nachschlag und ionisierte Restfunken.
- **Wasser/Eis:** Klingencrest, umrollende Strömung, Tropfen-/Nebelabriss oder kristalline Fraktur; Volumen wirkt flüssig beziehungsweise spröde statt blauem Feuer.
- **Solar/Licht:** konzentrierte Goldfäden, geometrische Bögen, lokaler Strahlenpeak und saubere Ausblendung mit dunklem Erholungsraum.
- **Lunar/Spirit:** sichelförmige Schleier, perlige Körnung, Blüten-/Motivfragmente und kühler Nachhall; Silhouette bleibt vor der Fläche lesbar.
- **Void/Schatten:** violette Raumkontur, nach innen ziehende Fragmente, kontrollierte Verzerrung und kurzer Negativraum-Implosionsbeat; kein Vollbildnebel.

## Zeitliche Skillform

1. **Antizipation:** Element sammelt sich an Klinge, Fuß, Bodenanker oder Guardform; Zielrichtung wird lesbar.
2. **Release:** Körper und Klinge beschleunigen; eine tragende Hauptform folgt dem final ausgewerteten Klingen-/Körperpfad.
3. **Kontakt:** engster, hellster und kürzester Peak; Materialantwort, Treffer-VFX, Audio, Damage und Hitstop stimmen überein.
4. **Follow-through:** Energie schält sich entlang der tatsächlichen Bewegungsrichtung ab; Combo kann nächsten echten Marker übernehmen.
5. **Recovery/Nachleben:** Figur fängt Gewicht ab; Fragmente, Rauch, Riss oder Lichtkontur verfallen gebudgetet und verdecken keinen neuen Telegraphen.

## Größen- und Gameplaywahrheit

- Spektakuläre VFX dürfen über die Nahkampfhitbox hinausragen, erzeugen dort aber keinen Schaden. Nur autorisierte Klingen-/Körperkontakte oder ausdrücklich lokale Slam-Zonen treffen.
- Hauptform zuerst ohne Bloom abnehmen; lokale Emission, Kontrast, Körnung und Timing vergrößern den Eindruck günstiger als riesige transparente Quads.
- Gefüllte Bodenflächen vor Spawn nach Typ klemmen, junge stark verdeckte gleiche Flächen ablehnen und Gesamtzahl/-fläche über beschleunigtes ältestes Fade begrenzen; expandierende Konturringe vom Verdrängungstest ausnehmen.
- Jede Fähigkeit besitzt eigene Silhouette und Peakform. Farbwechsel allein erzeugt keinen neuen Skill.
- Kameraenergie bei Combos und Multi-Hits akkumuliert nicht ungebremst; nur schwere Kontakte, Guard Break, Perfect Parry oder Elimination erhalten kurzes lokales Hitstop.

## Referenznutzung

- Boards direkt als lokale Dateien ansehen; keine Browsersuche und keine Laufzeit-Screenshotprüfung daraus ableiten.
- Rollen und Prinzipien übertragen, keine Figur, Kleidung, Waffe, UI, Posefolge, Effektgeometrie oder Komposition exakt kopieren.
- Bei bildgebundener Variante alle drei Boards nutzen: `03` steuert Sequenz/Balance, `02` Elementmaterial/Peak, `01` Familienbreite/Skilldeck-Lesbarkeit.
- Bei textgebundener Variante denselben Bewegungs-, Element-, Timing- und Gameplayvertrag ohne Bildzugriff vollständig im Prompt nennen.

## Handoffs

- Allgemeine Pose-, Rig- und Kontaktfehler → [Animation und Charakter](ANIMATION-CHARACTER.md)
- Effektquelle, Pools, Hauptform und Beatkopplung → [VFX](VFX.md)
- Uhren, Marker und Reset → [Runtime-Integration](RUNTIME-INTEGRATION.md)
- Pixelkosten und Bodenbudgets → [Performance](PERFORMANCE.md)
