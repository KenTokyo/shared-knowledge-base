# Premium-Graffiti — Hausstil für Spiel-Oberflächen

> **Stand:** 11.10.2026. **Geltung:** Standard für jede Spiel-Oberfläche in jedem Spiel: Titel, Menüs,
> Hangar/Shop, HUD, Dialoge, Pause, Ergebnisse, Übergänge, Momente im Kampf.
> **Vorrang:** Was der Nutzer für ein Projekt ausdrücklich anders will, geht vor. Danach gilt dieser
> Hausstil. Ältere Projektstile werden beim nächsten UI-Umbau in ihn übersetzt (Welt und Palette des
> Spiels bleiben, das Handwerk wird dieses hier). War der ältere Stil eine ausdrückliche Wahl des
> Nutzers (z. B. die Glas-UI von Elemental Flakes), fragt der Umbau einmal nach, statt still zu ersetzen.
> **Designgefühl:** World-Class Motion, AAA, Award-Niveau – premium, von Hand gezeichnet, geschichtet,
> ausdrucksstark und hochwertig („illustrated, layered, expressive and expensive — not like random
> spray-paint fonts or cheap stickers“); geschnitten wie ein Video, nichts erscheint oder verschwindet
> einfach, lebendig und nie chaotisch. Diese Datei ist in sich vollständig; kein Projekt muss dazu
> angesehen werden.
> Der Nutzer am 11.10.2026: „das ist der beste Graffiti-Stil bis jetzt … das darf nicht verloren gehen“.
> **Dazu:** Skill `game-ui-graffiti` (Ablauf, Briefings, Motion-Rezept und Ton nach dem Vorbild QuizBlitz);
> Prompt-Vorlagen für UI und Karten in [`../prompts/game-redesign/`](../prompts/game-redesign/README.md).

---

## 0. Die zwölf Sätze

1. **Gezeichnet, nicht getippt.** Große Wörter sind geschichtete Pieces: Füllverlauf, Extrusion,
   Tintenumriss, Glanz, Drips. Eine Sprühschrift ersetzt nie die Gestaltung.
2. **Handwerk gleich, Welt eigen.** Jedes Spiel bekommt eine eigene Crew-Idee, einen eigenen Ort und
   eine eigene Palette (§1). Keine Kopie eines anderen Spiels.
3. **Fast-Schwarz als Grund, Farbe trägt Bedeutung, höchstens zwei Akzente je Fläche.**
4. **Flächen sind Slaps:** aufgeklebtes Papier, Plakat oder Sticker mit Tintenumriss, hartem
   Versatzschatten ohne Unschärfe und Textur. Kein Glas, kein `backdrop-filter`, keine
   `rounded-3xl`-Webkarte.
5. **Eigener, gezeichneter Symbolsatz.** Lucide oder fremde Symbole kommen in der sichtbaren UI nicht vor.
6. **HUD ruhig und klar, mit Graffiti-Akzenten.** Die volle Wucht gehört Menüs, Übergängen und Momenten.
7. **Geschnitten wie ein Video:** EINE Takttabelle für Bild, 3D und Ton; Aufbau → Treffer →
   Auszahlung → Ruhe; Schnitte statt Überblendungen.
8. **Gehen ist kürzer als Kommen. Keine Endlosschleifen. Nur `transform` und `opacity` animieren.**
9. **Im Kampf legt die UI je Bild nichts an.** Häufige Werte schreibt das Bauteil direkt in den DOM.
10. **Overlays über dem Spielfeld verdecken nie die Hauptinformation** und weichen dem Blickpunkt aus.
11. **Jeder Zustand ist im Studio aufrufbar**, mit Mocks aus echten Daten.
12. **Unter 9/10 ist nichts fertig.** Bewertet werden Identität, Motion, Lesbarkeit und Leistung.

**Prüffrage:** Erkennt man das Spiel an einem Standbild ohne Farbe? Wenn nein: weiter.

---

## 1. Steckbrief je Spiel (zuerst ausfüllen)

| Feld | Inhalt | Beispiel |
|---|---|---|
| **Crew und Ort** | Wer sprüht wo, und warum gehört das zum Spiel? | Writer-Crew bricht nachts in eine Kernanlage ein und „bombt“ den Schild mit Buchstaben |
| **Oberfläche als Gegenstand** | Was ist die UI in dieser Welt? | Das Blackbook der Crew: Marker, Schablone, Slaps, Chrom-Pieces auf Beton |
| **Vorbilder** (Haltung, nicht kopieren) | 3–5 Werke | Spider-Verse, Jet Set Radio Future, Persona 5, Hades, Blade Runner 2049 / Edgerunners |
| **Bewegung in drei Wörtern** | | Slam · Spray · Snap |
| **Erkennungsbewegungen** | 3–5 | Stempel-Slam großer Wörter, Sprühwischer als Schnitt, Marker-Unterstrich zeichnet sich einmal, Sticker-Slap, Drip läuft einmal und steht |
| **Formen** | | Tintenumriss 2–4 px, harter Versatzschatten, Marker mit spitzen Enden, Schablonen-Ausschnitte, Klebeband, Halbton, Drips |
| **Requisiten** | | Sprühdose, Caps, Marker, Klebeband, Schablone, Krone, Pfeile, Crew-Tag |
| **Palette** | Rollen aus §2 auf eigene Töne | NIGHT-Palette, CORE Orange als Marke |
| **Lautstärke** | Wo laut, wo leise | HUD ruhig, volle Wucht nur in Menüs, Übergängen, Momenten |

Die Welt (Karten, Wandbilder) trägt dieselben Pieces wie die UI. So wird daraus EIN Spiel.

---

## 2. Farben — Rollen statt Hex

**EINE Farbquelle** für DOM und 3D (`tokens.ts`). Beim Start werden daraus CSS-Variablen; die Szene
liest dieselben Werte als Zahl. Kein Hex im Bauteil.

| Rolle | Bedeutung | Beispielwert |
|---|---|---|
| `INK` | tiefstes Schwarz: Umrisse, Schlagschatten, Letterbox | `#07080d` |
| `NIGHT` | App- und Szenenhintergrund | `#0d0f17` |
| `WALL` / `WALL_HI` | Grundfläche der Slaps / gehobene Fläche, Hover | `#161a25` / `#222838` |
| `LINE` | Haarlinien, Raster | `#2f3648` |
| `BONE` / `SMOKE` | Haupttext, Chrom-Licht / Zweittext | `#f3eee3` / `#9aa1b5` |
| Marke (`CORE`) | Primäraktion, Logo, das Herz des Spiels | `#ff5b1f` |
| Erfolg (`ACID`) | richtig, Treffer, Combo, Tastaturfokus | `#c9ff2b` |
| Gefahr (`HOT`) | falsch, Schaden, Bedrohung — nie Schmuck | `#ff2e63` |
| Spezial (`UV`) | Schild, Spezial, UV-Farbe der Graffiti | `#8b5cff` |
| Info (`ICE`) | Info, Spieler, Technik | `#38e1ff` |
| Belohnung (`GOLD`) | Währung, Belohnung, Seltenheit | `#ffc53a` |

- Die Rollen sind Pflicht, die Hex-Werte nicht. Ein Spiel mit eigener Palette bildet seine Töne auf
  diese Rollen ab.
- Höchstens zwei Akzente je Fläche. Eine Farbe nur „weil es hübsch ist“ gibt es nicht.
- **Piece-Paletten** als feste Verläufe: Chrom BONE → SMOKE mit INK-Umriss, Hitze GOLD → CORE → HOT,
  dazu je Akzent eine.
- **Seltenheit** als feste Leiter, z. B. BONE · ICE · UV · GOLD.
- **Zahlen** im Gebietsschema des Spiels über EINE Formatierfunktion (`41.320`, `41,3 %`).
- Karten bzw. Welten haben ein Akzentpaar aus EINER Kartenliste; die UI baut keine eigene.

---

## 3. Schriften — vier Rollen

| Rolle | Wofür | Beispiel |
|---|---|---|
| **Piece** | Pieces, Titel, große Momente. Nie Fließtext. | Sedgwick Ave Display |
| **Marker** | Randnotizen, Tags, handschriftliche Hinweise | Sedgwick Ave |
| **Label** | Knöpfe, Etiketten, Zahlen (Tabellenziffern) | Big Shoulders Display (variabel) |
| **Text** | Lesetext, Hinweise, Erklärungen | Sofia Sans Semi Condensed (variabel, Kyrillisch) |

- Nur OFL-Schriften, selbst gehostet; keine Laufzeitdatei von fremden Servern.
- `@font-face` mit `unicode-range`; vorab geladen wird nur, was der erste Bildschirm zeigt.
- Umlaute und alle Schriftsysteme der Spielinhalte prüfen; Fallback für CJK ist die Systemschrift.
- 3D-Text (troika) braucht WOFF statt WOFF2 und immer ein lokales `font=`.
- Die Piece-Schrift ist nur Rohstoff: Das Piece entsteht aus Glyphen plus Schichten (§4), nicht aus
  CSS-`text-shadow`.

---

## 4. Bausatz

Ein Bausatz für alles, an EINER Stelle (z. B. `src/design/kit/`), mit Übersicht im Studio (§9).

| Baustein | Wann |
|---|---|
| **Wall** | Betonwand hinter jedem Menü; je Bildschirm eine eigene Anordnung alter Tags. Statisch. |
| **Slap** | **Jedes Panel.** Aufgeklebtes Papier, leicht gedreht, Umriss, Versatzschatten, optional Klebeband. Töne: Wand, Papier (hell, Text in Tinte), Akzent, eingelassen, flach. |
| **Plakat** | Großer Slap mit Klebeband für die EINE Hauptfläche eines Moments (Haupttafel im Spiel, Dialog, Pause, Belohnung). Je Bildschirm höchstens eins. |
| **Piece** | Gesprühtes Wort: Logo, Bildschirmtitel, Urteil, Momenttitel. Nur aus der Ferne lesbare Wörter, höchstens eins je Bildschirm. |
| **Stencil** | Zahl oder kurzes Wort durch eine Schablone: Kennzahlen, Wellen, Stufen. Nie für Sätze. |
| **MarkerLine** | Von Hand gezogen: Unterstrich, Kringel, Haken, Kreuz, Pfeil. Markiert, was gerade zählt. |
| **Sticker / Stamp / Tape** | Etikett für Zustand und Seltenheit / Urteil oder Rang, schlägt einmal ein / Klebeband an Ecken. |
| **Tally, Splat, Swipe** | Strichliste, Farbklecks hinter einer Heldenzahl, Marker-Wisch hinter einer Überschrift — Akzente statt Farbbalken. |
| **Drip, ImpactFrame, CountUp** | Nase nach einem Einschlag, ein Einschlagbild, Zahl zählt hoch und rastet ein. |
| **SprayWipe** | Jeder Bildschirmwechsel. Die Logik wechselt sofort, die Anzeige folgt dem Schnitt. |

**Pieces bauen** (Glyphen einmal per Werkzeug aus der Piece-Schrift erzeugen):
- Schichten von hinten nach vorn: Schlagschatten → Extrusion → Tintenumriss → Füllverlauf → Glanz →
  Drips → Funkeln. Buchstaben leicht versetzt und gedreht, nie auf einer Grundlinie wie Satzschrift.
- Ein Piece schlägt Buchstabe für Buchstabe ein (gestaffelt), Nasen laufen danach einmal.
- Für Momente im Kampf wird ein Piece beim Einhängen EINMAL zu einem Bild gerastert; im Moment bewegt
  der Compositor nur noch dieses Bild.
- Dieselben Pieces stehen als Wandbilder in der Welt (eigener Generator, gleiche Glyphen).

---

## 5. Symbole

- Ein eigener Satz im Marker-Stil auf einem 24er-Raster: Mittellinien als Strich, volle Tinte,
  versetzte Farbplatte dahinter.
- Aus Definitionen erzeugt (Generator + Marker-Strichfunktion), als Sprite einmal eingehängt; jedes
  Symbol ist nur ein `<use>`. Die erzeugte Datei wird nie von Hand bearbeitet.
- Jede wichtige Aktion und jeder Zustand hat ein eigenes, unterscheidbares Symbol.
- Fremde Namen (z. B. Lucide-Namen in alten Datensätzen) übersetzt EINE Abbildung auf Kit-Symbole.

---

## 6. Bauteile

**Knöpfe (TagButton):** `primary` (Marke, die EINE Hauptaktion je Fläche), `secondary` (Wand),
`danger` (Gefahr), `ghost` (nur Schrift), dazu Akzentvarianten mit genau dieser Bedeutung. Hover hebt
die Fläche vom Schatten, Druck presst sie hinein. Treffziele mindestens 44 px, Symbolknöpfe quadratisch
mit `aria-label`, gestrichelter Fokusring nur bei Tastatur und nie entfernen. Knöpfe über dem Spielfeld
lösen keinen Schuss bzw. keine Spielaktion aus.

**Hauptfläche im Spiel** (etwa die Fragetafel): ein Plakat mit Klebeband. Kategorie bzw. Kontext als
Sprüh-Tag auf der Kante, Schlüsselwörter mit Textmarker im Akzent, gegebene Teile als helle
Aufkleber-Rohlinge, offene Teile als Schablonen-Ausschnitte, das nächste Ziel mit Erfolgskante.
Lange Inhalte werden kleiner, statt umzubrechen (Container-Einheiten). Richtig: Element fliegt vom Ort
des Treffers auf sein Feld. Falsch: harter Glitch ohne Unschärfe plus gesprühtes X am Ort des Fehlers.
Wechsel: alte Fläche geht kurz, erst dann kommt die neue.

**HUD:** ruhig, nur Zahl und Farbe. Vitalwerte als Papierkarten bzw. im Hochformat als EINE
Kopfleiste im selben Papier. Treffer: Karte bebt, Leiste blitzt, Zahl steigt auf. Auftritt nach der
Intro-Taktung, nach Unterbrechungen kürzer. Bedienknöpfe an EINER Stelle.

**Momenttitel und Banner** („SCHILD BRICHT“, „PHASE 2“, „WELLE GERÄUMT“, Boss): die einzige volle
Wucht im Kampf, als gerastertes Piece, Platzierung nach §8.

**Dialoge:** Plakat klatscht auf die deckend abgedunkelte Wand (keine Unschärfe). Inhalt staffelt.
Escape und Klick daneben schließen, Fokus springt hinein und zurück. Rückfragen gestapelt: „Nein“
oben, die gefährliche Aktion darunter.

**Ergebnis:** Schnitt → Urteil als Piece → Punkte zählen hoch → Kennzahl-Kacheln kleben nacheinander
(Heldenzahl füllt die Kachel, Splat dahinter) → Rang-Stempel → Aktionen zuletzt, Aktionen kleben unten.

**Titel und Menüs:** Titelsequenz beim ersten Öffnen (Wischer, Logo schlägt Buchstabe für Buchstabe
ein, Nasen, Glanz, dann staffelt das Menü), jede weitere Rückkehr kurz. Menüschritte: alter Schritt
raus, neuer staffelt herein. Listen und Raster gestaffelt, aber gedeckelt.

**Bildschirmwechsel:** immer über den SprayWipe, danach staffelt der Bildschirm herein: Kopf,
Titel-Piece, Reiter, Inhalt. Nichts erscheint oder verschwindet einfach.

---

## 7. Bewegung

**Quellen (Dateinamen als Vorschlag):**

| Teil | Aufgabe |
|---|---|
| Takttabelle (`src/design/choreo.ts`) | EINE Zeitquelle für DOM, 3D und Ton: `EASE`, `SPRING`, `DUR` (exit < enter, stagger, cut), `CHOREO` (ms je Moment) |
| Installation (`installDesign.ts`) | legt Kurven, Dauern und Federn (`linear()`-Kurven) als CSS-Variablen an; EINE Federrechnung |
| Einmal-Klassen (`motion.css`) | `in-up`, `pop`, `kick`, `shake`, `out`, `draw-x`, `slap-in`, `stamp-in`, `piece` …; Zeitpunkt über eine CSS-Variable aus der Tabelle |
| WAAPI-Helfer (`hud/hudMotion.ts`) | Einmal-Animationen im Kampf über `element.animate` |
| Ereigniskanal (`game/presentation/fxEvents.ts`) | EIN Kanal Spiel → HUD, Szene, Ton (`emitFx`/`onFx`) |

**Startwerte der Takte** (bewährt, zum Übernehmen und Feintunen):
`DUR` exit 180 · enter 480 · stagger 70 · cut 420 ms. Schnitt: Wischer 0, verdeckt 240, Wechsel 260,
frei 300, fertig 700. Titelsequenz: Wand 240, Wort 1 300, Wort 2 560, Nasen 980, Menü 1250, fertig
1950, je Buchstabe 52. Richtig: Kontakt 0, Tafel 90, Unterstrich 200, Combo 260, Ruhe 520. Großer
Moment (Schildbruch): Einschlagbild 100, Splitter 130, Titel 220, Leiste 400, Ruhe 1100. Ergebnis:
Urteil 380, Punkte ab 900, Kacheln ab 2100, Rang 2800, Aktionen 3300.

**Regeln**
1. **Jede Zeit kommt aus der Takttabelle.** Kein Bauteil trägt eine ms-Zahl. Kein Takt verschiebt
   eine Spielregel.
2. **Gehen ist kürzer als Kommen.** Abgang = kurzer Tween, keine Feder.
3. **Keine Endlosschleifen.** Im Leerlauf bewegt sich nichts; Wiederkehrendes läuft einmal je Anlass.
4. **Nur `transform` und `opacity`.** Nie `filter`, Unschärfe, Glow, Farbe, Größe oder Layout
   animieren. Glitch = harte Versätze.
5. **Im Kampf nichts je Bild:** keine motion-Werte, kein React-Zustand, keine Template-Strings, keine
   neuen Objekte. Häufige Werte schreibt das Bauteil direkt in den DOM, nur bei Änderung, mit
   vorgehaltenen Strings. Rückmeldungen über den Ereigniskanal und WAAPI. Menüs, Ergebnis und Pause
   dürfen `motion/react` nutzen.
6. **„Bewegung reduzieren“ zeigt den Endzustand** (`fill-mode: both`, Grundzustand = Endzustand,
   WAAPI springt ans Ende, Komfortregler wirken nur an ihrer EINEN Stelle).
7. **Rückmeldung sofort:** Was nach einem Klick erscheint, erbt keine Einlauf-Verzögerung.
8. **Staffeln immer gedeckelt** (`each` und `max`).
9. **Federn sparsam:** `snap` für Bedienung, `pop` für Einschläge, `soft` für Kamera-artige Wege.
   Überschwinger höchstens einmal.

---

## 8. Overlays über dem Spielfeld

- Titel, Banner und Hinweise verdecken nie die Hauptfläche oder Text und weichen dem Blickpunkt
  (Kern, Boss, Ziel) aus.
- Die Szene meldet die Bildschirmlage des Blickpunkts außerhalb von React (`coreOnScreen`,
  `screenAnchor.ts`). Gemessen wird EINMAL je Moment, kurz vor dem Einschlag; die Lage geht direkt als
  `top`/`left` an den Knoten.
- Reihenfolge Titel: Grundbahn → kleiner neben dem Blickpunkt → Streifen darunter (Hochformat:
  Bauchbinde über der Daumenleiste) → Grundbahn. Lieber ein Stück Blickpunkt verdecken als die Tafel.
- EINE Platzierungsrechnung (`titleLanes.ts`) für alle Overlays.

---

## 9. Studio und Mocks

- DEV-Studio per URL (`?studio=<eintrag>&t=<ms>&bare`): jeder Bildschirm in jedem Zustand ohne
  Spielen; `t` hält alle CSS- und WAAPI-Animationen an; `bare` ohne Rahmen; `data-ready` am `body`,
  sobald Schriften und Bilder sitzen; `window.__studio.{replay, jump, play}`.
- Bausatz-Übersicht (`?studio=kit`) mit allen Teilen, Pieces und Symbolen.
- **Mocks schreiben nie in Speicherstände** und entstehen aus EINEM echten Datensatz (nie Hinweis
  des einen mit Erklärung des anderen mischen).
- Prüffälle sind echte Extremfälle: längster Text, längstes Wort, längster Kategoriename.
- Im Spiel prüfen DEV-Haken (`window.__<spiel>`): Start, Bildschleife anhalten, genau n Bilder,
  jeden Moment auslösen.

---

## 10. Leistung der Oberfläche

- Ziel: Bildrate = Bildwiederholrate. Die UI darf keine Spitzen erzeugen.
- Ruhender Kampf: 0 B UI-Allokation je Bild und keine React-Commits (im Produktions-Build gemessen).
- Kein `filter`, kein `backdrop-filter`, keine animierten Schatten. Texturen als kleine WebP.
- Pieces und große Titel gerastert statt als DOM-Schichten animiert.
- Keine Laufzeitdateien von fremden Servern.

---

## 11. Prüfen, Aufnehmen, Noten

**Reihenfolge:** Typprüfung → Regelprüfungen des Spiels → Build → Node-Messungen ohne Grafikkarte →
erst dann Aufnahmen.

**Aufnahmen** nach `~/.claude/CLAUDE.md`: zuerst der eingebaute Browser, sonst EIN Chrome for Testing
in Nutzerversion, headless, höchstens 1280×720, Schleife angehalten, nur benötigte Bilder, sofort
beenden. Mehrere Agenten teilen sich eine Sperre (Lock-Datei).

**Prüfmaße:** nichts abgeschnitten oder überlappend bei längstem Text, längstem Namen, Handy 320 px,
360×720, 390×720, Desktop 1280×720. Fokusringe, `aria-label`, Test-IDs bleiben.

**Belege:** nur Beweisbilder, komprimiert als WebP, im Projekt unter `docs/<auftrag>/evidence/`.

**Noten je Bereich:** Identität · Motion · Lesbarkeit · Leistung, ehrlich. Unter 9 wird weiter
gearbeitet. Befunde gehen mit Bild und Zeitpunkt zurück an denselben Agenten.

---

## 12. Arbeitsweise bei großen Umbauten

- **Orchestrator plus höchstens zwei Bau-Agenten** (Opus, hohe Denkstufe): UI und Motion / Welt,
  Karten und VFX. Strikter Pfadbesitz.
- **Zuerst die gemeinsamen Verträge**, vom Orchestrator: Farbquelle, Takttabelle, Ereigniskanal,
  Aufgaben-Dokument mit Steckbrief, Besitz, Phasen, Budget, Aufnahmeregeln und Notentabelle.
- **Phasen UI:** Fundament (Tokens, Schriften, Bausatz, Symbole, Studio) → Menüs und Bildschirme →
  Im Spiel (HUD, Hauptfläche, Momente, Pause, Ergebnis) → Feinschliff → Leistung.
- Agenten committen nur eigene Pfade und pushen nie. Der Orchestrator prüft jeden Stand in einem
  sauberen Worktree (Typen, Build, Regelprüfungen), sichtet die Belegbilder, pusht und prüft die
  Live-Version.
- Spielregeln und Balancing bleiben unverändert, sofern der Auftrag nichts anderes sagt.
- Neue Töne nur nach Freigabe des Nutzers (ElevenLabs kostet Guthaben).

---

## 13. Verboten

- Glas, `backdrop-filter`, weiche Webkarten, Pillen-Knöpfe ohne Bezug zur Welt.
- Sprühschrift statt gezeichnetem Piece; Piece für Fließtext; mehr als ein Piece je Bildschirm.
- Mehr als zwei Akzente je Fläche; Gefahr- oder Erfolgsfarbe als Schmuck.
- Lucide oder fremde Symbole in der sichtbaren UI.
- Hex-Farben und ms-Zahlen im Bauteil; eine zweite Farb-, Takt-, Feder-, Ereignis- oder
  Platzierungsquelle.
- Animiertes `filter`, Unschärfe oder Glow; Endlosschleifen im Leerlauf; ein Abgang, der länger dauert
  als der Auftritt; `setTimeout`-Kaskaden für Animationen.
- React-Zustand, motion-Werte oder neue Objekte je Bild im Kampf.
- Overlays über der Hauptfläche oder über Text; feste `top`-Werte in Spalten, die wachsen;
  `center` ohne `safe` in überlaufenden Spalten; Treffziele unter 44 px; fehlender Fokusring.
- Mocks, die in Speicherstände schreiben; Mocks aus gemischten Datensätzen.
- Laufzeitdateien von fremden Servern.

---

## 14. Spiele und ihre Fassungen

Namen wie im NoteTree-Spielehub (`notetree-tanstack/lib/games/game-registry.ts`, Stand 11.10.2026).
Jedes Spiel hat seine Fassung des Hausstils in der eigenen `DESIGN.md`: Steckbrief, Farbrollen,
Schriften, Bausatz, Takte, die Liste „wird beim nächsten Umbau übersetzt“ und offene Fragen. Ein
neues Spiel bekommt eine Zeile hier und eine eigene Fassung.

| Spiel | früher | Repo unter `/Users/kentoky/Documents/React Projects/` |
|---|---|---|
| Crossword Core Breaker | – | `3-crossword-core-breaker` |
| QuizBlitz | – | `quizblitz` (Motion-Referenz; die Welten bleiben eigene Stile) |
| Bahnenwacht | Arbeitsname Lane Defense | `lane-defense` |
| Wissensfestung | – | `Wissensfestung` |
| Shard Royale | Shardfall Arena V2.5 (Hub-Kennung `shardfall`) | `test-projects/shardroyale` |
| Shardfall | Ronin, Voxel Samurai Reborn (Hub-Kennung `samurai-reborn`) | `test-projects/shardfall` |
| Wavebreaker | QuizWaves Shardfall | `test-projects/quizwaves-shardfall-v1` |
| Bastion | QuizWaves Radial | `test-projects/quizwaves-radial-v1` |

Außerhalb des Hubs mit eigener Fassung: Voxel Samurai Quiz („Quizfall“, `voxel-samurai-quiz`),
Shardfall Arena v3 (`test-projects/shardfall-arena-v3-blender`), Elemental Flakes
(`Claude-Flakes/elemental-flakes`, Glas-UI bis zur Entscheidung des Nutzers).

<sub>Beispielprojekt, nur falls wirklich nötig: Crossword Core Breaker (`3-crossword-core-breaker/DESIGN.md`).</sub>
