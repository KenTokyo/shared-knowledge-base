# React-Performance: prüfen, übertragen, belegen

Ergänzung zu [FRONTEND-RULES](FRONTEND-RULES.md), keine zweite Architektur.
Gilt für neue und angefasste React-Bereiche; keine pauschale Umschreibung funktionierender Komponenten.

## Gemeinsame Grundlage

- Vorhandenen [Vercel-React-Skill](../.agents/skills/vercel-react-best-practices/SKILL.md) verwenden; nur relevante Regeldateien nachladen.
- NoteTree-Host: React 18 / TanStack; eingebettetes TreeChat: isolierter React-19-Client mit Compiler. Next-Kompatibilität bleibt aktiv. Next-/RSC-/React-19-Empfehlungen deshalb nur am passenden Ausführungsort anwenden. Kein neuer Store, SWR oder Frameworkwechsel allein wegen eines Beispiels.
- Vergleichsquelle: T3 Code unter `/Users/kentoky/Documents/React Projects/t3code`, geprüfter Pin `4ee6bfd50ef4a089440d5c3662db2298da9cc50e`. Muster an unserer Datenquelle, Lebensdauer und Bedienung prüfen; ein Referenzname beweist keine bessere Performance.
- Vorhandene Reparaturen und Tests lesen, bevor ein Befund als neu gilt. Frühere Messungen sind keine aktuelle Abnahme.

## Prüfrichtlinie

1. **Kleine Zuständigkeit, kleine Abonnements.** Eine Zeile liest ihre Daten, nicht den gesamten App-Zustand. Unveränderte Daten behalten ihre Referenzen. Selektor-Caches brauchen korrekte Invalidierung bei Löschen, Eltern-/Projektwechsel und verspäteten Antworten. Cache-Lebensdauer und Räumung prüfen.
2. **Ableiten statt zurückspiegeln.** Berechenbare Werte aus vorhandenem State ableiten. Nutzeraktionen in Handlern; Effects synchronisieren echte externe Systeme. Keine Render→Effect→State-Kette allein für Formatierung oder Filter. Memoisierung nur bei begründeten Kosten/Identitätsgrenzen; Compiler ersetzt keine sauberen Datenflüsse.
3. **Ereignisse statt Dauerarbeit.** Resize/Mutation/Dateiänderung gezielt abonnieren, Arbeit bündeln. Wiederkehrende Arbeit braucht einen aktiven Zweck; Cleanup, verborgene Flächen und Rückkehr prüfen. Fachlich nötige Hintergrundarbeit nicht abschalten.
4. **Darstellung lokal halten.** DOM-Messungen gesammelt lesen, danach schreiben. Keine stufenweise Mess-/State-Schleife pro Klick. CSS-Invalidierung im echten Host betrachten; breite relationale Selektoren können weit außerhalb einer Komponente arbeiten. Nicht jedes `:has()` ist automatisch teuer.
5. **Arbeit nach Bedarf.** Schwere Ansichten und Daten erst bei Bedarf laden; unabhängige Abfragen parallel, gleichartige dedupliziert. Abbruch oder Anforderungsgeneration verhindert, dass ein altes Ergebnis die neue Auswahl überschreibt. Fokus, Suche und Zugänglichkeit bei Lazy Loading erhalten.
6. **Große Daten konkret prüfen.** Listenfenster, Indizes, passende Abfragegrößen und vorhandene Pagination nutzen. Kein globales `filter/map/sort` pro Zeile oder Tastendruck ohne Prüfung des echten Umfangs. Keine künstlichen Inhaltsgrenzen als Performance-Fix.
7. **Laufzeitbesitzer eindeutig.** Ein Owner für Scrollen, Ressourcen, Watcher und Speicherung. Timer, Worker, Observer, Streams und Animationen nach Wechsel/Unmount schließen. Keine unsichtbaren mehrfachen Editor-/Chat-Instanzen.
8. **Schnelle Folgeaktionen sind Teil der Funktion.** Projekt A→B→A, Wechsel während Laden, Öffnen/Schließen, Undo/Redo, Abbruch, leere und große Inhalte, Fehler/Retry sowie Mount→Cleanup→Mount prüfen. Keine Datenverluste, doppelten Schreibvorgänge oder unbeabsichtigten KI-Aufrufe.

## Befundformat und Nachweis

Jeder Befund nennt ID, Priorität, betroffenen Nutzerablauf, konkrete `Datei:Zeile`, Aufruf-/Datenfluss, Ursache, kleinste passende Reparatur, Risiken, bestehende Tests und einen überprüfbaren Abnahmeplan.

- **Gemessen:** reproduzierter Ablauf mit Ausgangswert, kontrollierter Ursachenprobe und Rückkehr zum Original. Absolute Werte, Datenmenge, Build, Plattform und Messfenster nennen.
- **Im Code belegt:** der problematische Mechanismus und sein erreichbarer Aufrufpfad sind nachgewiesen; tatsächliche Verzögerung noch nicht gemessen.
- **Verdacht:** Suchtreffer/Heuristik ohne vollständigen Nachweis. Separat führen, nicht als behobenen oder bestätigten Fehler verkaufen.
- **Schon gelöst / kein Befund:** vorhandene Begrenzung, Cleanup, Lazy Loading oder Test nennen. Keine Duplikatreparatur.

Priorität nach Nutzerwirkung, Häufigkeit, betroffener Datenmenge und Sicherheit des Befunds; keine erfundenen Prozentgewinne. Regex-Häufigkeiten und Dateigröße sind keine Ursachenbelege.

Bei Umsetzung passende bestehende Prüfungen verwenden. Leistungsnachweis folgt [IDLE-PERFORMANCE](IDLE-PERFORMANCE.md); Browserregeln stehen im [SCREENSHOT-GUIDE](SCREENSHOT-GUIDE.md). Native Langzeit-, mobile und öffentliche Abnahme getrennt nennen. Prüfbrowser immer schließen; Audit-Standard sind zuerst Quell- und Node-Prüfungen.

## T3-Muster, die bereits einen konkreten Nutzen hatten

- `packages/client-runtime/src/state/threadDetail.ts`: einzelne Datenbereiche abonnieren, stabile Referenzen.
- `apps/web/src/components/Sidebar.motion.ts`: kurze, ereignisgesteuerte Listenbewegung statt dauernder Größenabfragen.
- `apps/web/src/components/chat/restingComposerControlsMeasurement.ts`: Varianten gesammelt messen, Anordnung einmal wählen.
- `packages/client-runtime/src/state/threadSubagents.ts`: Kinder mit vorhandener Thread-Identität und Rundenzuordnung lesen.

Übernahmen und Ursachenbelege: [TreeChat-Rework](../docs/chat/tasks/2026-10-04-treechat-t3-rework-tasks.md). Claude bleibt ausschließlich interaktive CLI im unsichtbaren Terminal. Stil-/State-Verbesserungen rechtfertigen keine zusätzlichen Modellanfragen.
