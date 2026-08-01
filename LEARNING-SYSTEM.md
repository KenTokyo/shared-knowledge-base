# Learning-System — wie diese Wissensbasis wächst

**Zweck:** Fehler vermeiden, **bevor** sie im Output sichtbar werden. Ein Fehler, den man am Bild erkennt, ist
schon bezahlt. Ein Tipp, den man vor dem ersten Edit liest, kostet zwanzig Zeilen.

**Status: freiwillig.** Das hier sind Tipps, keine Regeln. Eine gemessen bessere Lösung hat immer Vorrang —
und darf den Tipp überschreiben. Wer nur zustimmt, ohne zu messen, ändert nichts.

## Die drei Ebenen

| Ebene | Ordner | Inhalt | Wer schreibt |
|---|---|---|---|
| **Global** | [`threejs/`](threejs/) | Was in **mindestens zwei** Repositories Zeit gekostet hat | jedes Projekt, per Promotion |
| **Projekt** | [`projects/<repo>/`](projects/) | Was in **diesem einen** Repository Zeit gekostet hat | nur dieses Projekt |
| **Lokal** | im Repo selbst | Architektur, SSoT, Protokolle, Befehle | nur dieses Projekt |

Der Ordnername ist der **Repository-Ordnername, klein geschrieben**: `projects/voxel-samurai-quiz/`,
`projects/claude-of-tsushima/`, `projects/claude-flakes/`. Kein Präfix, keine Version, kein Alias —
Kleinschreibung, weil Git im Gegensatz zu Windows Groß-/Kleinschreibung unterscheidet.

**Ein Tipp lebt an genau einer Stelle.** Promotion ist ein **Umzug**, keine Kopie. Sonst driften zwei
Fassungen desselben Tipps auseinander, und das ist teurer als der Tipp wert ist.

## Das Tippformat

Zwei Zeilen. Nicht mehr.

```markdown
- **Kurztitel** — Fehlerbild; Ursache. → Handlung.
  *Beleg · Datum*
```

- **Kurztitel** — das *Fehlerbild*, nicht die Lösung. Man sucht danach, wenn man mitten im Fehler steckt.
- **Fehlerbild** — woran man es merkt. Von außen sichtbar, nicht innerlich.
- **Ursache** — warum es passiert. Ohne sie ist der Tipp nicht übertragbar und nicht widerlegbar.
- **→ Handlung** — was man stattdessen tut. Ein Befehl, ein Werkzeug, eine Reihenfolge.
- **Beleg** — was es gekostet hat oder welche Messung es zeigt. **Der Beleg ist der wichtigste Teil**: er ist
  das, woran eine spätere, klügere KI entscheidet, ob der Tipp noch gilt.

Beispiel:

```markdown
- **Pixelmaße über zwei Auflösungen verglichen** — „Referenz 12 px, wir 11 px, passt"; die Referenz ist
  1256 px breit, unser Frame 1920 px. → In Anteilen der Framebreite messen, nie in nativen Pixeln.
  *0,955 % gegen 0,573 % = 0,60x; eine ganze Achsenbegründung stand darauf, eine Schicht verloren · 2026-08-01*
```

### Was kein Tipp ist

- Allgemeinwissen, das jede KI schon hat („Instancing spart Draw Calls").
- Was der Code oder die Repo-Doku ohnehin sagt — dann gehört ein Link dorthin, kein Duplikat.
- Eine Vermutung ohne Beleg. Wenn es niemanden Zeit gekostet hat, ist es kein Learning.
- Eine Zahl aus einem fremden Stack. Fremde Konstanten ohne gleichen Maßstab sind Rauschen.

## Die drei Operationen

| | Wann | Wie |
|---|---|---|
| **+ Neu** | Der Fehler hat echte Zeit gekostet oder eine Schlussfolgerung umgedreht | anhängen, Beleg dazu |
| **~ Schärfen** | Gleicher Tipp, engerer Trigger oder bessere Handlung | in place ändern, alten Beleg behalten |
| **− Stürzen** | Der Tipp ist **gemessen** falsch | siehe unten |

**Ein gestürzter Tipp wird nicht gelöscht — er wird zum neuen Tipp.** Der Sturz ist selbst das wertvollste
Learning, weil er den Denkfehler zeigt und nicht nur das Ergebnis:

```markdown
- **„Halmbreite stimmt bereits"** — galt bis 2026-08-01, **widerlegt**: der Vergleich lief über zwei
  Auflösungen. → In Framebreiten-Anteilen gegenprüfen, bevor man eine Breite für richtig erklärt.
  *`bladesize.mjs` liest 0,62x/0,59x; der Blindreview hatte richtig gemessen und falsch geschlossen · 2026-08-01*
```

Gelöscht wird nur, was **nie** gestimmt hat oder was in Codeform beantwortet ist (ein Gate, ein Guard, ein
Selftest schlägt jeden Tipp — dann verweist eine Zeile auf das Gate und der Rest fällt weg).

**Ausdrückliches Änderungsrecht:** jede KI darf jeden Tipp schärfen oder stürzen, ohne zu fragen. Verlangt
ist nur der Beleg. Eine klügere KI, die einen besseren Weg misst, soll den Tipp ersetzen — genau dafür ist
das Format so klein.

## Promotion: Projekt → Global

Ein Tipp wandert nach [`threejs/`](threejs/), wenn eines von beiden gilt — nicht, weil er allgemein *klingt*:

- **a)** Er hat in **zwei verschiedenen Repositories** Zeit gekostet (der Normalfall), **oder**
- **b)** sein **Mechanismus** enthält nachweislich nichts Projektspezifisches: kein Dateiname, kein Port,
  keine gefittete Konstante, kein Werkzeugname. Dann steht die Herkunft dabei, und das zweite Repo trägt
  seinen Beleg später nach.

Fall b) existiert nur, damit die globale Ebene beim Start nicht leer bleibt. Ein globaler Tipp, der nach
zwei Jahren immer noch **einen** Beleg hat, gehört zurück nach unten.

1. Tipp im Zielowner unter `threejs/` einfügen, beide Belege nebeneinander.
2. Stack-spezifische Reste streichen (Dateinamen, Ports, Konstanten) — global bleibt der **Mechanismus**.
3. Im Projektordner löschen. Nicht auskommentieren, nicht „siehe global" — löschen.

Umgekehrt: ein globaler Tipp, der nur in einem Repo je gegriffen hat, wandert zurück nach unten.

## Größe

- **Max. 500 Zeilen pro Datei.** Wird es voll: **nach Trigger splitten**, nie in „Teil 2".
- **Max. ~12 Tipps pro Datei.** Darüber liest sie niemand vollständig, und ein ungelesener Tipp wirkt nicht.
  Beim 13. Tipp fliegt der schwächste raus oder die Datei teilt sich.
- Die Kopfzeile jeder Tippdatei sagt in **einem** Satz, wann man sie liest. Wer das nicht formulieren kann,
  hat keinen Trigger und damit keine Datei.

## Der Trigger

Tipps wirken nur, wenn sie **vor** der Arbeit gelesen werden. Deshalb steht in jeder `AGENTS.md` eine
Trigger-Tabelle: *Thema → Datei*. Der Ablauf pro Aufgabe:

1. Thema erkennen (Vegetation, Kamera, Messung, VFX …).
2. Die **eine** passende Datei lesen. Nicht den ganzen Ordner.
3. Arbeiten.
4. Hat etwas Zeit gekostet, das ein Tipp verhindert hätte → Tipp anlegen, in derselben Schicht.

Schritt 4 ist der einzige, der das System am Leben hält. Er kostet zwei Zeilen.

## Kopfzeile jeder Tippdatei

```markdown
# <Thema> — <Projekt oder „global">

**Lesen wenn:** <ein Satz, der den Trigger benennt>
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)
```
