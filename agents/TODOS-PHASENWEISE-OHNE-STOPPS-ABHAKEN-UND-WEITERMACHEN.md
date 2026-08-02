# Phasenworkflow — zusammenhängend bauen, gebündelt prüfen, weiterarbeiten

**Lesen wenn:** Auftrag mehrere kohärente Lieferabschnitte braucht, vorhandene Task-/Masterplanung nennt oder
mehrere Systeme integriert. **Nicht lesen:** kleiner Fix, einzelne Datei, reine Dokuänderung.

## Planung nur bei echtem Bedarf

1. Vorhandenen User-/Projektplan weiterführen; nie zweiten Plan für denselben Scope anlegen.
2. Fehlt Planung: kleinen Auftrag direkt umsetzen. Nur bei echter Mehrphasigkeit genau eine Taskdatei nach lokaler
   Projektkonvention anlegen.
3. Fertigkriterium und wenige ergebnisorientierte Phasen festlegen. Phase = integrierbarer Schnitt, kein Mikro-Todo.
4. Reihenfolge: Systemgerüst/SSoT/Hauptpfad → Integration/Edge-Cases → Feinschliff. Details nicht polieren, solange
   umgebender Ablauf fehlt.

## Arbeitsloop pro Phase

1. Relevante Architektur und aktuellen Git-Scope prüfen.
2. Alle eng gekoppelten Todos der Phase ausimplementieren; nicht nach jedem Mikroedit testen oder dokumentieren.
3. Danach Gates gebündelt ausführen: kanonisches statisches Gate, nur ausdrücklich verlangte UI-/Gameplay-Tests,
   nur entscheidungstragende Sichtprüfung.
4. Funde gemeinsam beheben; normalerweise ein Kontrolllauf. Scheitert gleiche Aussage erneut, Ursache oder
   Umsetzung ändern statt Prüfung zu wiederholen.
5. Phase einmal aktualisieren: Todos abhaken, Ergebnis/Beleg/Rest knapp notieren, höchstens drei Hauptpfade nennen.
6. Direkt nächste offene Phase bearbeiten, bis Userziel oder objektive Grenze erreicht ist.

## Scope und Stopps

- Keine neue Findings-/Optimierungsdatei für Einzelpunkte. Restpunkt in bestehender Planung notieren; separater
  Folgeplan nur, wenn verbleibender In-Scope-Aufwand selbst mehrere Phasen braucht.
- Fremde oder auftragsfremde Funde nicht nebenbei ausbauen; nur eigenen Blocker oder eigene Regression beheben.
- Nach 3–5 Verbesserungen derselben Messachse greift der
  [Achsen-Deckel](MAX-5-VERBESSERUNGEN-DANN-WEITER.md): nächste Phase/Achse statt weitere Feinjustierung.
- Nach letzter Phase Akzeptanzkriterien einmal gegen Ergebnis prüfen. Kein erneutes Gate ohne nachfolgende Änderung.

## Kleines Format

```markdown
### Phase N — Ergebnis
**Ziel:** überprüfbarer, integrierbarer Schnitt
- [ ] zusammengehörige Implementierung
- [ ] Integration/Edge-Cases
- [ ] gebündeltes Gate
**Beleg/Rest:** ein kurzer Satz
**Referenzen:** höchstens drei Hauptpfade
```
