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

- **Referenzblatt als Modulkonstanten** — `REF`, `REF_MARKS`, `TORSO_CLIP`, Fenster und Schwellen lagen lose
  im Probecode; das zweite Blatt hätte jeder davon ein `if` verpasst. → Blätter sind Daten (`ref`, `outfit`,
  `stance`, `marks`, `torsoClip`, `note()`, Fenster, Schwellen), die Probe bleibt Instrument; ein neues Blatt
  ist ein Eintrag plus PNG.
  *`_ronin-targets.mjs`; `--ziel roh|ronin|alle` ohne Änderung an `measure()` · PH7 · 2026-08-04*
