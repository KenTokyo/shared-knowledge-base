# Waffe im Bild — duty-of-tsushima

**Lesen wenn:** Viewmodel-Lage, Optik, Bauteil aus `PartSet`, Zielpunkt oder Shaderquelle in `src/weapons/`.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Messseite derselben Arbeit: [`METRICS-AND-GATES.md`](METRICS-AND-GATES.md). Gate: `src/weapons/viewmodeltest.js`.

- **`ring()` ist ein Pfropfen, kein Reif** — `CylinderGeometry` schließt beide Enden, also steht eine volle Scheibe quer in der Bohrung; auf der Ziellinie ist das 100 % Verdeckung, und am Bild sieht man nur „Metall vorn". Zweimal passiert: Lochkimme des Karabiners, dann die Fassungsringe des Leuchtpunkts eine Datei später. → Durchsichtiges Rohr als offene Hülse (`shell()`), Reif auf der Linie als `hoop()` aus `TorusGeometry` — `RingGeometry` ist einseitig und wird beim Inspizieren zum Loch. Die Prüfung misst **Deckung des Zielpunkts**, nicht Anwesenheit eines Teils.
  *Zielpunkt 100 % gedeckt, höchster Punkt des Rings 2,617° über der Ziellinie bei einem Zielpunkt von ±2,64°; lichter Durchlass der Kimme gerechnet `d · tan 2,645°` = 9,2 mm, gebaut 10,5 · `5f147b6`, `c6c8a62` · 2026-08-03*

- **Ein Backtick im eingebetteten Shader beendet das Template-Literal** — ab dort ist der Shader JavaScript, und der Parser meldet den Fehler dort, wo der Rest zufällig ungültig wird, nicht in der Zeile mit dem Zeichen. In einem Template-Literal gibt es keine Kommentare, nur Text. Zweimal passiert: CSS in `ui/style.js`, dann GLSL in `weapons/optics.js`. → Das Zeichen im eingebetteten Text verbieten (Bezeichner ohne Auszeichnung nennen) und die Warnung **in die Quelle selbst** schreiben, nicht nur ins Protokoll — beide Rückfälle hat `vite build` im `check` gefangen, keine Notiz.
  *Drei Stellen in `optics.js`; die Regel stand seit der ersten Fassung im Masterplan und hat nicht gegriffen · `c6c8a62` · 2026-08-03*

- **Hüftlage tippen kostet mehr als lösen** — eine Zahl, die nur ein Bild widerlegen kann, ist keine Zahl: getippte Posen sehen in einem Format richtig und im nächsten falsch aus. → Bedingung formulieren statt Wert raten (Ladehebel auf feste NDC-Stelle, jedes bewegliche Teil im Bild, ≥ 0,14 m vor dem Auge), analytisch vorsortieren und die besten Kandidaten durchs **echte Rig** rastern. Eine Waffe, die dabei abweicht, bekommt ihre Begründung in den Code.
  *Historische drei 7,21/9,92/9,15 % Bilddeckung, moderne drei 9,01/9,96/6,90 %; die MP weicht bewusst ab, weil ihr Magazin im Griff steckt und bei −0,50 auf NDC −1,24 stünde · `79b45d0`, `c6c8a62` · 2026-08-03*

- **Glas darf nicht als Deckung zählen — und die Ausnahme ist nur so viel wert wie ihre Gegenprobe** — eine Optikscheibe liegt quer über der Bohrung und wäre als Fläche 100 % Verdeckung; nimmt man sie über eine `userData`-Kennung aus dem Raster, kann sich ab da **jedes** Mesh selbst von der Prüfung ausnehmen. → Kennung und Gegenrechnung in denselben Commit: für jedes gekennzeichnete Mesh muss das Material wirklich durchsichtig sein. Dazu die zwei Aussagen über das Absehen, die man am Bild nicht abliest — Punkt steht in der Bildmitte, und das Absehen frisst den Zielpunkt nicht.
  *`kzSeeThrough` mit der Sektion „Optik" in `viewmodeltest.js`, Deckel 8 % im Zielpunkt und 3 % im Sichtfeld; Gate 213/213 · `c6c8a62` · 2026-08-03*
