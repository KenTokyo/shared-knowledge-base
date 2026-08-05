# Charakteranimation, Rigging und Kontakt — global

**Lesen wenn:** Pose, Rig, IK, Cloth, Waffen- oder Fußkontakt in einer Echtzeitfigur falsch wirken.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../LEARNING-SYSTEM.md)
**Stil:** Nur kompakte Stichpunkte; je Punkt eine klare Information.
**Schnitt:** Füllwörter, Einleitungen, Wiederholungen, unnötige Artikel streichen; Fehlerbild, Ursache, Handlung, Beleg erhalten.

## Tipps

- **Kontakt folgt Pose-Proxy statt sichtbarer Geometrie** — Zusatzlayer an Waffe und Körper verschieben Stützhand, Trail oder Treffer. → Pose vollständig auswerten, Weltmatrizen aktualisieren, Kontakt aus tatsächlich gerendertem Schaft-/Klingenpfad lösen; bei unerreichbarem Ziel authored Pose unangetastet lassen.
  *voxel-samurai-quiz: Stützhand 8/8 Klassen, 420/420 Frames, Abstand 0,0000 m · claude-of-tsushima: Trail-Ground-Truth aus `Hero.bladeAt`, Proxy-Gap-Ratios 0,858/0,883 · 2026-07-25–08-01*

- **Zwei Layer schreiben dasselbe Gelenk** — Je nach Lerp verdoppeln oder verzehnfachen sich kleine additive Offsets; Offlinepose grün, Runtimepose nicht. Ursache: Verfolger `v += (ziel-v)·k` integriert nachträgliches `+= offset` zu `offset/k`. → Pro Transform einen Schreiber; Layer vor Apply komponieren oder auf exklusive Kindknoten legen.
  *voxel-samurai-quiz: 106 Klassenresolver brauchten sechs exklusive Alive-Knoten · claude-of-tsushima: Offline-Offhand `0,05`, Runtime mit additiven Layern `grip 0,43+0,42` · 2026-07-25–08-01*

- **Keyframe und Gameplay nutzen verschiedene Zeit** — Marker verfehlt Pose, Kontakt liegt bei Viertelschnitt oder Löschen des letzten Frames kehrt Bewegung um. → Normalisierte Zeitdomäne festlegen; Ease/Arc genau einmal abbilden; Dauer an Startquelle teilen statt im Posepfad nachskalieren.
  *voxel-samurai-quiz: `progress·maxTime` entkoppelte Timeline und Playback · claude-of-tsushima: `arcEase(0,75)=0,612`; Clock-vs.-Arc-Vergleich kostete rund 30 min · 2026-06-28–08-01*

- **Glättung hängt von Bildrate ab** — Andere FPS verändern Cloth, Nachlauf oder Blend trotz gleicher Zielwerte. → Raten als `1-exp(-rate·dt)` oder stabil integrierte Federn formulieren; feste Frame-Blends entfernen, `dt` klemmen/substeppen.
  *claude-flakes: Cloth-Raten und isolierter Allokationspfad im aktuellen Solver · voxel-samurai-quiz: Alive-Layer nutzt Zeitkonstanten, Musculoskeletal-Runtime geklemmtes `dt` plus Substeps statt zweitem Fixed-Lerp · 2026-07-31–08-04*

- **Solver klebt am Cap, Kontakt verbessert sich kaum** — Zielpunkt liegt außerhalb der Freiheitsgrade; höhere Gewichte verrenken nur Arm oder Endpose. → Erreichbarkeit und Basisgewicht am Defektzeitpunkt prüfen, zusätzliche Knoten/Freiheitsgrade geben; bei unmöglicher Geometrie Quelle oder Waffenlage korrigieren.
  *voxel-samurai-quiz: 7/11 Stützgriffe scheiterten vor Geometrie-/Solverkorrektur · claude-of-tsushima: zwei Endkanäle 18 Iterationen am Cap, Fehler nur 0,479→0,449 · 2026-07-25–08-01*

## Handoffs

- Effektform und Effekttiming → [VFX](VFX.md)
- Reihenfolge, Uhren und Reset → [Runtime-Integration](RUNTIME-INTEGRATION.md)
- Kamera-/Framingreaktion → [Licht und Kamera](LIGHT-CAMERA.md)
