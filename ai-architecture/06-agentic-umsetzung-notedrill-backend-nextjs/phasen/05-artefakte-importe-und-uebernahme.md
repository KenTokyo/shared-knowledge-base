# Notedrill Backend Next.js: Phase 05 Artefakte, Importe und Übernahme

Stand: 8. März 2026
Status: `DONE`

## Ziel
Diese Phase sorgt dafür, dass der User möglichst wenig manuell machen muss.

## Was der User davon hat
1. weniger Copy-Paste
2. weniger "wo ist mein Ergebnis?"
3. klarere Übernahme von Text, Karten, Quiz und Diagrammen

## Was wir aus dem heutigen Backend lernen
1. Open-In ist schon ein starker Vorläufer
2. aber App-Aktionen und Artefakte sind noch nicht ein gemeinsamer Weg

## Was wir aus Mobile lernen
1. kontrollierte Übernahme ist wichtig
2. Pfad- und Vertragsprüfung müssen zentral sein

## Hauptaufgaben

## 1. Gemeinsamen Artefakt-Vertrag bauen
Pflichtfelder:
1. `artifactId`
2. `artifactType`
3. `sourceRunId`
4. `preview`
5. `payloadRef`
6. `applyMode`

## 2. Open-In und interne Tools zusammenziehen
Beides soll später denselben Übernahmekern nutzen.

## 3. Preview vor Übernahme möglich machen
Gerade bei großen Ergebnissen:
1. Vorschau
2. Bestätigen
3. übernehmen

## 4. Rollback mitdenken
Wenn Übernahme fehlschlägt oder falsch ist:
1. sauber zurückrollen
2. Fehler klar zeigen

## 5. UTF-8, Pfade und Größen prüfen
Pflichtprüfungen:
1. UTF-8
2. erlaubte Zielpfade
3. Größenlimits
4. Typprüfung

## Edge Cases

| Edge Case | Antwort |
|---|---|
| nur ein Teil der Artefakte passt | Teilstatus statt Komplettfehler |
| Import ist zu groß | Preview und Teilübernahme |
| Artefakt kollidiert mit bestehendem Inhalt | Merge- oder Ersetzen-Regel |
| Zeichen kaputt | UTF-8-Prüfung blockt oder repariert |

## Betroffene Dateien oder Bereiche
1. `lib/notes/open-in/*`
2. künftige Tool-Ergebnisse
3. künftiger Artefakt-Vertrag
4. Frontend-Übernahmeflächen

## Done-Kriterien
1. alle Hauptausgaben laufen über denselben Übernahmekern
2. Preview und Fehlerstatus sind klar
3. User muss deutlich seltener manuell eingreifen

## Nächste Phase danach
`06-lange-laeufe-queue-und-24h-agenten.md`

## Umsetzung am 8. MÃ¤rz 2026
1. Ein gemeinsamer Artefakt-Baustein beschreibt jetzt Vorschau, Quelle, Zielmodus und Pruefungen fuer Tool-Ergebnisse.
2. Open-In laeuft serverseitig jetzt nur noch als Vorschau-Artefakt und blockiert die echte Editor-Uebernahme nicht mehr aus Versehen.
3. Vor der Uebernahme pruefen wir jetzt zentrale Risiken:
   - kaputte UTF-8-Zeichen
   - zu grosse Import-Pakete
4. Notiz- und Ordner-Ergebnisse nutzen denselben Artefakt-Weg mit klarer Vorschau.
5. Vorschau-Meldungen aus dem Server-Tool-Feed erscheinen jetzt direkt im Chat.
