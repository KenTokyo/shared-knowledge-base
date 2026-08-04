# Kostüm gegen Referenzfoto — claude-of-tsushima

**Lesen wenn:** Ausstattung, Outfit oder Figur nach einem Referenzfoto nachgebaut und gegen es gemessen wird.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Global: [Animation/Charakter](../../threejs/ANIMATION-CHARACTER.md) · [Messhandwerk](../../threejs/MEASURING.md).
Rig, Pose und Kamera bleiben bei [`CHARACTER-CAMERA.md`](CHARACTER-CAMERA.md).

- **Kleidungsstück wächst, bis es die Rüstung schluckt** — jedes Maß nach oben korrigiert, Jacke am Ende
  0,47 m breit, Ärmel als aufgeblasene Kapseln; das Kostüm sitzt *innerhalb* eines gepanzerten Rigs und wurde
  gegen den falschen Körper getunt. → Outfit sagt per `hides`, welche `geometry.userData.parts` es **ist**,
  nicht welche es überdeckt; danach gegen den nackten Körper maßnehmen.
  *Fünf Phasen Breitenwachstum; nach `hides` 0 % nackter Rig bei `roh`, 8,2 % bei `ronin` · PH6/PH8 · 2026-08-04*

- **Silhouettenbreite als Stoffmaß gelesen** — Hose auf 0,195 m authored, weil die Vorlage so breit aussieht;
  sechs Höhenbänder 0,06–0,11 Figurhöhen zu breit, schlimmstes +0,105. Eine Frontaufnahme zeigt unter der
  Hüfte `Knochenabstand + Stoffradius`, und der Rig gab allein 0,100 m Beinabstand plus 0,049 m Pose-Spreizung
  aus. → Radius aus dem Restbudget lösen (Zielbreite/2 − Beinmittellinie an dieser Höhe), Fülle über Profilform
  statt über mehr Radius.
  *r 0,195 → 0,110; acht FAIL-Bänder auf ≤0,007 Abweichung, Vorhersage traf auf ±0,007 · PH8 · 2026-08-04*

- **Haltung weggeschnitten statt nachgestellt** — Vorlage ist T-Pose, Rig ruht mit hängenden Armen; als
  Ausgleich wurde das Breitenprofil auf eine Spalte um den Rumpf beschnitten. Damit fliegen die Arme aus jeder
  Zahl, und Ärmel wie Handwickel bekommen nie ein Maß. → Aufnahmehaltung als eigene Lab-Haltung anlegen und je
  Referenzblatt wählen; Beschnitt auf 1 stellen, sobald die Haltungen übereinstimmen.
  *`torsoClip` 0,18 → 1; vier Armmaße neu messbar, Ärmel 0,083 gegen 0,083 · PH7 · 2026-08-04*

- **Bandabweichung dem nächstliegenden Teil zugeschrieben** — „Band unter dem Hut zu breit → Krempe zu weit";
  0,349 sind aber 0,314 Figurhöhen außen und die Krempe reicht nur 0,267. Es war das Ärmelende bei 0,325.
  → Vor dem Nachziehen eines Profils prüfen, welches Teil an dieser Höhe überhaupt so weit außen liegt;
  liegt die Ursache im Knochen, Band mit Grund ausnehmen statt ein passendes Teil zu verstellen.
  *Armknochen 1,394 m, Kinn-zu-Arm 0,027 m hier gegen 0,202 m in der Vorlage · PH8 · 2026-08-04*

- **Zweites Blatt erbt die Haltung des ersten** — jedes Blatt einzeln grün, im Sammellauf fällt das zweite
  durch; die Review-Haltung setzt nur eine Marke, und die Knochen schreibt erst ein Neu-Posen zurück. Ein
  Runtime, der bei stehendem Playhead nichts neu posed, macht das nie. → Haltungswechsel über **einen**
  Pfad, der Marke und vollen Rebuild koppelt (`invalidate` reicht nicht: null Schritte auf demselben
  Frame); Sammellauf gegen die Einzelläufe gegenprüfen, bevor man ihm glaubt.
  *Wanderer in T-Pose gemessen: Band 0,825 = 0,837 statt 0,300, Deckung 33,9 % statt 8,2 % · PH8 · 2026-08-04*

- **Kopfbedeckung gegen nur ein Outfit geprüft** — ein Knauf auf dem Hut kostet 0,022 m Kronenhöhe; das
  Blatt, das den Kopf selbst liefert, kürzt ihn und merkt nichts. Das zweite Outfit trägt den
  Heldenschädel bis 1,710 m und schiebt ihn durch die Krone. → Jede Änderung an einem Teil, das mehrere
  Outfits tragen, gegen **alle** Blätter prüfen; das Deckungsmaß ist die Zahl, die es fängt, nicht die Breite.
  *Wanderer-Band 0,975: 35,3 % nackter Rig gegen 25-%-Gate; Knauf verworfen · PH9 · 2026-08-04*

- **Band nimmt das Maximum, der Dickenpass den Median** — ein Wickel wurde durchgehend geschlankt, weil das
  Einzelbein zu dick las; danach war das Band 0,046 zu schmal. Bei nach unten schmalerer Kontur sitzt das
  Bandmaximum an der **Oberkante**, der Median dagegen weiter unten. → Verjüngen statt schlanken: oben voller
  Radius für das Band, unten schmal für den Median — beide Zahlen gewinnen gleichzeitig.
  *`shinWrap` voll bis 0,293 m, 0,049 am Knöchel: Band 0,225 −0,038 → −0,034, Wade +0,016 → +0,013 · PH9 · 2026-08-04*

- **Plattenmaß direkt als Geometriemaß gesetzt** — eine gerenderte Kante liest rund 0,008 Figurhöhen breiter
  als ihre Geometrie (Kantenglättung, wenige Lathe-Segmente). Wer die 0,190 m der Vorlage als Breite authored,
  baut 0,014 m Stoff zu viel. → Plattenmaß minus Kantenzuschlag authoren und Vorhersagen entsprechend
  korrigieren; bleibt danach ein Rest, ist er Stand oder Knochen, nicht Stoff.
  *`sandal.w` 0,180 statt 0,190: Band 0,025 −0,035 → −0,028, Rest ist Beinabstand · PH9 · 2026-08-04*

- **Referenzblatt als Modulkonstanten** — `REF`, `REF_MARKS`, `TORSO_CLIP`, Fenster und Schwellen lagen lose
  im Probecode; das zweite Blatt hätte jeder davon ein `if` verpasst. → Blätter sind Daten (`ref`, `outfit`,
  `stance`, `marks`, `torsoClip`, `note()`, Fenster, Schwellen), die Probe bleibt Instrument; ein neues Blatt
  ist ein Eintrag plus PNG.
  *`_ronin-targets.mjs`; `--ziel roh|ronin|alle` ohne Änderung an `measure()` · PH7 · 2026-08-04*
