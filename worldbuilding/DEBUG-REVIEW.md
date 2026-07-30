# Debugging, Capture und Review

## Kürzester Root-Cause-Loop

1. Defekt in Alltagssprache und Bildregion benennen.
2. Layer wählen: Daten, Geometrie, Material, Licht, PostFX, Kamera oder Messung.
3. Billigsten Gegenbeweis bauen, nicht sofort den Lieblingsfix.
4. Genau eine Ursache ändern.
5. A/A-Null, Zielbeweis und Kontrollregion prüfen.
6. Nach zwei Fehlschlägen Layer/Hypothese wechseln.

## Deterministischer A/B-Vergleich

- Kamera, Zeit, Wetter, Wind, Auflösung und Renderstufe pinnen.
- Auch framebasierte Seeds von SSAO/TAA/Dither pinnen; Uhr allein reicht nicht.
- A und B synchron in **einem** gepinnten Renderfenster erzeugen.
- Vorher A/A ohne Mutation: erwartete Differenz 0 bzw. dokumentierter Rauschboden.
- Neue Kamera/LOD/Schattenkaskaden aufwärmen und Warm-up-Frame verwerfen.
- Wiederholung nach erneutem Aim als eigenes Gate.

Zwei getrennte Captures mit Live-Frames dazwischen sind kein sauberer Toggle-Diff.

## Sweep-Hygiene

- Zielwert unmittelbar vor Draw am echten Material/Uniform zurücklesen.
- Nur eine wirksame Variable verändern; Klassen isolieren.
- Alle mutierten Werte, Maps, Sichtbarkeiten, Targets und Größen sichern/restaurieren.
- Shipping-Zeile am Ende wiederholen; Leak muss 0 sein.
- Uniforms, die `update()` pro Frame schreibt, im selben synchronen Call wie die Messung setzen.
- Count-Sweeps verwenden unabhängige Seeds pro Population.

Ein flacher Sweep fragt zuerst: **Kam der Wert an? War das Signal überhaupt sichtbar?**

## Probe muss seine Frage beweisen

- Vorbedingungen zählen statt voraussetzen.
- Leere Population als `none`/`n/a`, nie als plausible 0 ausgeben.
- Tatsächliche Geometrie/Runtime lesen statt Konstante kopieren.
- Bounding Box des Diffs melden: Vollbildänderung bei lokalem Objekt deutet auf Mess-/Environment-Drift.
- Parser/Runtime-API nutzen, wenn die Frage exakt prüfbar ist; keine fragile Textheuristik.
- Nach dem Fix prüfen, ob Kamera, `argmax`, Population und Gate noch dieselbe Bedeutung haben.
- Instrumente mit bekannten Rampen, Rauschen, Perioden und A/B-Swap selbst testen.

## Bildprovenienz

Jede wichtige Zahl trägt:

`Kamera · Auflösung/Supersampling · Raw/HDR/LDR · linear/sRGB · Cropformat · Motiv/Tiefe · sichtbare Objekte · Zeit/Wetter · Runtime-Wert · Baseline`

Vor einem Crop:

1. ansehen,
2. Motiv und Tiefe benennen,
3. UI/Letterbox/Fremdobjekte ausschließen,
4. Objektanteil per Hide/Show bestätigen,
5. nach Kamera-/Auflösungsänderung neu validieren.

Referenz und Szene müssen im Messbereich dasselbe Motiv zeigen. Shot-lokale Sollwerte nicht global verdrahten.

## Bilder und Zahlen

**Bildpflicht:** First Read, Silhouette, Maßstab, Komposition, Wiederholung, Bodenkontakt.

**Zahlenpflicht:** Farbraum/Energie, Histogramm, Objektbeitrag, Naht, Distanz, Calls/Triangles, Regression.

Wenn eine Metrik besser wird und das Bild schlechter, beantwortet sie die falsche oder nur eine Teilfrage.

## Ablation

- Rohkanal → HDR-Szene → LDR/PostFX.
- Objekt an/aus, Map an/aus, Sonne/IBL/Schatten getrennt.
- Wasser nach Tiefe/Gefälle/Region; Vegetation nach Art/Distanz; nicht alles mitteln.
- Feature-off-Lauf attribuiert gewanderte Regressionen.

## Handover-Status

- **VERIFIZIERT:** Beleg und gültige Baseline.
- **HYPOTHESE:** billigster Widerlegungstest.
- **WIDERLEGT:** nicht erneut versuchen; Beleg nennen.
- **OFFEN:** Impact, Abnahmekriterium, höchstens nächste drei Schritte.

Captures vor letzten Edits, ungültige Crops und wiederhergestellter Shipping-Zustand ausdrücklich nennen.
