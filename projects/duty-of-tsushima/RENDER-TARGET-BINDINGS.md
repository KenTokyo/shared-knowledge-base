# Render-Targets, Sampler und Rückkopplung — duty-of-tsushima

**Lesen wenn:** du ein Render-Target anlegst, eine Sampler-Uniform setzt, einen Pass ein- oder
ausschaltest, einen zweiten Durchgang in ein bereits gebundenes Ziel schreibst — oder eine
GPU-Meldung `Feedback loop formed between Framebuffer and active Texture` im Protokoll steht.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Der Bau steht in `src/core/Engine.js` (Szenenziel, Tiefenanlage), `src/core/LinearDepth.js`
(lineare Tiefenkopie), `src/render/PostFX.js` (die Kette) und `src/game/GameplayRuntime.js`
(der Ego-Durchgang in dasselbe Ziel). Hier steht nur, was beim Bauen Zeit gekostet hat.

- **Eine Textur, die als Sampler gebunden ist, während sie am aktuellen Framebuffer hängt, ist
  undefiniertes Verhalten — und der sichtbare Schaden trifft das ganze Bild, nicht den Verursacher**
  — die Partikelschichten leben in der Weltszene, zeichnen also **in** `sceneTarget`, und sampelten
  dabei `sceneTarget.depthTexture` für die weiche Tiefenblende. Auf einem Kachelrenderer kamen
  waagerechte Bänder über den ganzen Frame, und zwar nur, sobald wirklich Partikel entstanden — was
  die Suche in Richtung „Partikel sind kaputt" statt „die Bindung ist kaputt" geschickt hat.
  → Wer Szenentiefe **innerhalb** der Szene braucht, kopiert sie vorher in ein eigenes Ziel. Das
  löst nebenbei ein zweites Problem: eine `DepthTexture` sampelt als Fenstertiefe in [0,1], und ein
  weicher Partikelübergang vergleicht gegen Meter. Jeder Vergleich verlor, die Blende stand immer
  auf null, und die tiefenbewusste Hälfte des Partikelsystems hatte nie gelaufen.
  *`GL_INVALID_OPERATION: glDrawElementsInstanced: Feedback loop formed between Framebuffer and
  active Texture`, danach „too many errors" — die Meldung nennt den Draw Call, nicht die Uniform ·
  `src/core/LinearDepth.js` · 2026-08-07*

- **Ein Sampler, der eine abgeschaltete Stufe überlebt, ist dieselbe Bombe mit längerer Zündschnur**
  — bei `ssao = 0` hing `mSSAO.tDepth` weiter an der Tiefenanlage und `mAOBlur.tAO` an einem
  Halbziel, das `resize()` bei jedem Schritt der adaptiven Auflösung freigibt; Godrays und DoF
  ebenso. Heute zeichnet keines dieser Materialien in dem Moment, das ist aber eine Zusage über
  einen fremden Pass, die die Post-Kette gar nicht geben kann. → Jeder `else`-Zweig einer
  abschaltbaren Stufe setzt ihre Sampler auf `null`. Es kostet nichts: der nächste Frame setzt sie
  vor dem eigenen Draw ohnehin neu.
  *Genau diese Bauform — eine Zuweisung, die eine Stufe überlebt, die sie nicht mehr liest — hatte
  den Fehler oben erzeugt · `src/render/PostFX.js` · 2026-08-07*

- **Wer als Gast in einen fremden Pass hineinzeichnet, gibt die Bindung zurück, statt sie auf `null`
  zu werfen** — `LinearDepth.resolve()` läuft mitten in `renderScene`, und der Ego-Durchgang
  `renderView()` läuft zwischen Bloom und Composite. Beide schrieben am Ende hart
  `setRenderTarget(null)`, banden also für einen Pass lang den Bildschirmpuffer mitten in den
  Stapel. Es ging nur gut, weil der jeweils nächste Pass sein Ziel selbst setzt. → `getRenderTarget()`
  merken und im `finally` zurückgeben. Dasselbe gilt für jeden Zustand, den man klammert: ein
  `mute()`/`unmute()` ohne `try/finally` lässt eine geworfene Ausnahme die Wache für den Rest der
  Sitzung stumm schalten — sie schaltet sich still ab statt laut.
  *`src/core/LinearDepth.js`, `src/game/GameplayRuntime.js`, `src/render/Sky.js` · 2026-08-07*

- **Eine Rückkopplung findet man nicht durch Lesen, sondern durch eine Wache in `setRenderTarget`**
  — der Frame-Graph hat hier sechs Vollbildziele, zwei Halbziele, zwei Bloomketten, ein Würfelziel
  und eine Tiefenanlage; welche Textur gerade in welcher Uniform steht, ist über acht Dateien
  verteilt und ändert sich mit Qualitätsstufe und Fenstergröße. Statisches Lesen findet die
  Kombination nicht, die nur bei `medium` ohne DoF entsteht. → Sich unter `import.meta.env.DEV` in
  `renderer.setRenderTarget` einhängen. Zwei Prüfungen, weil es zwei Sorten Pass gibt: Vollbildpässe
  melden ihr **eines** Material an und werden exakt gegen die Anlagen des Ziels verglichen (rund 30
  Vergleiche, kein Fehlalarm möglich); Szenendurchgänge laufen gegen einen Umkehrindex
  Textur → Material, den ein `traverseVisible` alle 45 Frames neu baut. 45 ist keine
  Kompromisszahl: Sampler werden im Aufbau, beim Qualitätswechsel und bei einer Größenänderung
  gesetzt, nie im Frametakt. Im Produktionsbuild gibt die Fabrik `null` zurück und jede Aufrufstelle
  ist ein `?.`.
  *Der einzige mögliche Fehlalarm ist der IBL-Bake — `probe.target.texture` ist gleichzeitig
  `scene.environment` und damit `Water.uEnvMap`, das Wasser wird dort aber nie gezeichnet. Statt
  Würfelziele pauschal auszunehmen (was beim nächsten echten Fund mitschwiege) klammert der Bake
  sich selbst mit `mute()`/`unmute()` · `src/core/FeedbackGuard.js` · 2026-08-07*

- **Ein Instanzring, dessen `count` nur wächst, macht aus einem Uhrenrücksetzer helle Flecken an
  alten Weltpositionen** — der Partikelring zog `instanceCount` monoton bis zur Kapazität hoch und
  nahm ihn nie zurück, auch wenn der letzte Partikel abgelaufen war. Solange die Uhr monoton läuft,
  fällt das nicht auf; ein Neustart der Runde oder ein zurückgesetzter Zeitstand belebt die alten
  Plätze mit ihren alten Matrizen. → Den Ring einklappen, sobald der letzte Eintrag abgelaufen ist.
  Dieselbe Prüfung gehört an jeden Pool, dessen `count` je Frame geschrieben wird: `begin()` /
  `push()` / `flush()` ist die Bauform, die das von selbst richtig macht.
  *`src/fx/particles.js` · 2026-08-07*
