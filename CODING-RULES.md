# Coding Rules & Development Guidelines — gemeinsame Orchestrierung

**Zweck:** Universelle Regeln für eigenständige, konsistente, performante und wartbare Arbeit. Diese Datei verbindet
bewusst die konkrete Praxistiefe der früheren Coding Rules mit den stärkeren Orchestrierungs-, 3D-, Prüf- und
Lieferregeln der neueren Fassung.

**Geltung:** Verbindlich, sobald die lokale `AGENTS.md` hierher verweist. Priorität:

1. aktueller Userauftrag;
2. lokale, projektspezifische `AGENTS.md`;
3. diese gemeinsamen Coding Rules;
4. nur bei passendem Trigger geöffnete Fachowner- und Learning-Dokumente.

Projekt- oder technologiespezifische Details bleiben bei ihren Ownern, besonders Echtzeit-3D in
[THREEJS-RULES.md](THREEJS-RULES.md), Worldbuilding in
[THREEJS-WORLDBUILDING-RULES.md](THREEJS-WORLDBUILDING-RULES.md) und Learnings in
[LEARNING-SYSTEM.md](LEARNING-SYSTEM.md).

## 1. Lesepfad und Kontextanker

Pflichtpfad: lokale `AGENTS.md` vollständig lesen → diese Datei vollständig lesen. Danach nur per konkretem Trigger:

- vorhandener User-/Projektplan → genau diesen Plan lesen und fortführen, nie einen konkurrierenden Plan anlegen;
- mehrere zusammenhängende Lieferabschnitte → einmal den
  [Phasenworkflow](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md) lesen;
- Echtzeit-3D-Facharbeit → `THREEJS-RULES.md` lesen und dort den engsten passenden Owner wählen;
- belegter Projekttrigger → höchstens eine passende Tippdatei lesen;
- Windows-Projektpfad, Nachbarrepo oder lokaler Port →
  [WINDOWS-RESSOURCEN.md](WINDOWS-RESSOURCEN.md) lesen; Windows-Pfade nie auf macOS übertragen;
- macOS-Projektpfad, Nachbarrepo oder lokaler Port →
  [MACOS-RESSOURCEN.md](MACOS-RESSOURCEN.md) lesen; die dortige Pull-Pflicht vor Ressourcennutzung einhalten;
- externe API oder Bibliothek → aktuelle Primärdokumentation nur für die konkrete offene Frage lesen.

Querverweis allein ist kein Leseauftrag. Keine Linkketten vorsorglich öffnen. Vor größerem Leseblock im
Arbeitskontext kurz festhalten:

- **Auftrag:** Userziel und Fertigkriterium in einem Satz.
- **Leseliste:** `offen/gelesen · Pfad · Grund`; neue Pfade nur bei konkreter Frage ergänzen.
- **Befund:** pro gelesener Datei höchstens ein auftragsrelevanter Satz.
- **Nächster Schritt:** nach jedem Leseblock zum Auftrag zurückkehren.

Keine zusätzliche Protokolldatei anlegen, sofern User, Projekt oder echte Mehrphasigkeit sie nicht verlangen.
Lesen endet, sobald die nächste Änderung sicher entschieden werden kann. Recherche ist Mittel zur Entscheidung,
kein Ersatz für Umsetzung.

## 2. Grundhaltung und Bewertungsmodus

Nicht automatisch zustimmen. Behauptungen, Diagnosen, Annahmen und Pläne gelten als ungeprüft, bis Code, Doku,
Logs, nachvollziehbare Logik oder klare Einschränkungen sie stützen.

- **Intent aktiv ableiten:** Speech-to-Text-Fehler und grobe Beschreibungen mitdenken; Beispiele und Referenzen des
  Users stärker gewichten als einzelne wahrscheinlich verfälschte Wörter.
- **Verstehen statt umdeuten:** Lösung A verbessern, nicht still zu B wechseln. Vor Umsetzung prüfen:
  „Löst dieser Schritt das genannte Problem?“
- **Spezifikation = Boden, nicht Decke:** explizite Maße, Superlative und Eigenschaften bleiben harte Constraints;
  Qualität wird darüber aufgebaut, nie durch ihren Tausch gegen andere Stärken.
- **Nicht blind am Bestand festhalten:** Architektur, Datenfluss und Wirkungspfad zuerst prüfen. Wiederholte
  Kollisionen oder falsche Ergebnisse verlangen eine bessere Grundstruktur statt weiterer Werte-Patches.
- **Wirkungsumfeld prüfen:** Bei sichtbaren oder verhaltensrelevanten Änderungen den vollständigen Pfad bis zur
  Ausgabe kontrollieren: globale Settings, Theme/CSS, Shader/Tone-Mapping, Material-Overrides, Feature-Flags,
  Cache, Normalisierung, Fallbacks und Persistenz.
- **Research-First bei echter Unsicherheit:** Stacktrace oder Symptom abstrahieren, lokale Geschwistermuster und
  Primärdokumentation prüfen, 2–3 tragfähige Wege vergleichen, kleinste stabile Lösung wählen. Keine Websuche als
  Ritual bei bekannten lokalen Aufgaben.
- **Anwenderfehler vor Codefehler prüfen:** falsches Verzeichnis, fehlende Installation, bekannter Setup-Schritt oder
  Portkonflikt nicht mit einem Produkt-Workaround „reparieren“.

## 3. Durcharbeiten statt Rückfragen

- **Keine Rückfragen innerhalb eines klaren Auftrags.** Bei mehreren Wegen selbst die fachlich beste, kleinste
  stabile Option wählen, Annahmen kenntlich machen und umsetzen.
- **Empfehlung = gewählt:** Nennt ein vorhandener Plan eine eindeutige Empfehlung, direkt bauen statt erneut fragen.
- **Einzige Pause:** echte externe Blockade, etwa fehlendes Secret/Zugang nur beim User, widersprüchliche Pflichtdaten
  oder irreversible/destruktive Aktion ohne Mandat. Dann genau die eine fehlende Information nennen, keine
  Multiple-Choice-Runde eröffnen.
- **Im Loop bleiben:** bis Userziel, letzte offene Phase oder objektive Grenze weiterarbeiten. Zwischen Phasen weder
  um Erlaubnis bitten noch nur nächste Schritte aufzählen.
- **Manuelles Gate ist kein Pseudo-Todo:** Sind ausschließlich User-Abnahmen wie Ingame-Gefühl oder Optik offen,
  technische Arbeit als abgeschlossen und das manuelle Gate ehrlich kennzeichnen.

### Gefundenes Problem = nächster Arbeitsschritt

Ein Fund im bearbeiteten Scope ist kein Abschlussbericht, sondern Arbeit:

- sichtbaren Fehler, TypeScript-Fehler, tote Referenz, beschädigte Doku, falsche Rechnung oder eigene Regression
  direkt beheben und danach als erledigt erwähnen;
- nicht wegen eines selbst lösbaren Problems stoppen;
- fremde offene Änderungen weder revertieren noch überschreiben;
- blockiert ein fremder Fehler den eigenen Lieferpfad, minimal und additiv reparieren, als fremden Blocker
  dokumentieren, weiterarbeiten;
- auftragsfremde Auffälligkeiten nicht zu ungefragten Großprojekten ausweiten. Nur Blocker, Regressionen und eng
  gekoppelte Qualitätslücken gehören in den aktuellen Scope.

## 4. Planung und phasenweiser Workflow

### Wann Planung nötig ist

1. Vorhandenen User-/Projektplan weiterführen.
2. Kleinen Fix oder reine, klar begrenzte Ein-Datei-Änderung direkt umsetzen, sofern der Auftrag keine Taskdatei
   verlangt.
3. Bei echter Mehrphasigkeit genau eine Task-/Masterplanung nach lokaler Projektkonvention anlegen. Oben das
   Userziel in 1–5 konkreten Stichpunkten festhalten, damit Kontextverdichtung den Auftrag nicht verschiebt.
4. Reihenfolge: Grundstruktur/SSoT/Hauptpfad → Integration/Edge-Cases → Feinschliff → Abschlussabgleich.
5. Keine halbfertige Parallelarchitektur als „Phase“ liefern. Jede Phase ist ein kohärenter, reversibler,
   integrierbarer und möglichst kompilierfähiger Schnitt.

### Pflichtformat bei Task-/Masterplanungen

Jede Phase enthält:

1. **Ziel:** überprüfbares, für Nutzer oder System relevantes Ergebnis.
2. **Todos:** konkrete `[ ]`/`[x]`-Punkte.
3. **Ergebnis-Satz:** kurze Erklärung in einfacher Sprache.
4. **Warum:** nur wenn die Begründung nicht offensichtlich ist.
5. **Eingehalten:** relevante Regeln und Grenzen.
6. **Architektur passt:** SSoT, Besitz und Datenfluss knapp begründen.
7. **Auffälligkeiten/Performance/Kritische Findings:** nach Schwere, inklusive Status oder Fix-Pfad.

Höchstens drei Hauptkomponentenpfade pro Phase referenzieren. Arbeitsprotokoll knapp und append-only führen;
frühere Ergebnisse nicht umschreiben oder erfinden. Überlange Taskdateien bei ungefähr 600 Zeilen nach lokaler
Konvention teilen und gegenseitig verlinken.

### Arbeitsloop pro Phase

1. Scope, Architektur, Git-Differenzen und vorhandene Werkzeuge prüfen.
2. Alle eng gekoppelten Todos ausimplementieren; nicht nach jedem Mikroedit testen oder protokollieren.
3. Kanonische statische Gates gebündelt nach dem zusammenhängenden Schnitt ausführen.
4. Funde gemeinsam beheben; normalerweise ein Kontrolllauf. Scheitert dieselbe Aussage erneut, Ursache oder
   Umsetzung ändern statt die identische Prüfung wiederholen.
5. Phase einmal aktualisieren: Todos, Ergebnis, Beleg, Rest und höchstens drei Hauptpfade.
6. Direkt zur nächsten offenen Phase wechseln.
7. Nach letzter Phase Userauftrag und alle Akzeptanzkriterien einmal vollständig gegenlesen.

Für 3D-Verbesserungsachsen gilt der
[3–5-Verbesserungen-Deckel](agents/MAX-5-VERBESSERUNGEN-DANN-WEITER.md): Danach Achse schließen und an der nächsten
relevanten Dimension arbeiten. Ein Audit zählt nicht als weitere Verbesserung.

## 5. Umsetzung und Architektur

### System vor Feinschliff

- Vor Änderungen Architektur, Single Source of Truth, aktuellen Git-Scope und vorhandene Werkzeuge prüfen.
- Bestehende Systeme erweitern statt parallele Zustände, Renderpfade oder Konfigurationen einzuführen.
- Erst Struktur, Besitz, Datenfluss, Integration und vollständigen Hauptpfad bauen; danach Werte, Optik und
  Mikrooptimierungen justieren.
- **Änderungsmaß = Lückenmaß:** kleine lokale Lücke → kleiner Fix; fehlende Grundstruktur, Identität, Lesbarkeit,
  Maßstab oder Spielwert → großer, zusammenhängender und reversibler Schnitt.
- Keine versteckten harten Limits oder Qualitätsverluste als „Performance-Fix“ einführen.

### Grundstruktur-First

Wenn dieselbe Sache wiederholt falsch, kollidierend oder instabil bleibt:

1. Fundament analysieren: Achsen/Frames, doppelte Wahrheiten, unabhängige Layer, verstecktes Legacy.
2. Betroffenen Scope sauber neu strukturieren statt Patchstapel fortzuführen.
3. Eine gemeinsame SSoT herstellen, aus der alle betroffenen Schichten ableiten.
4. Legacy, verwaiste Importe, tote Zustände und Altreferenzen im selben Schnitt entfernen.

„Komplett neu“ im Userauftrag bedeutet den betroffenen Inhalt wirklich neu aufbauen, nicht nur Farben, Zahlen oder
Parameter des Altbestands drehen.

### Fachlicher Besitz und Dateistruktur

- Eine Datei besitzt ein fachliches Ziel. Unabhängige UI-Elemente, Assets, Datenmodelle oder Service-Use-Cases
  trennen.
- Keine wachsenden `entries.ts`-, `config.ts`-, `data.ts`-, `misc.ts`- oder `helpers.ts`-Monster. Aggregatoren
  importieren/exportieren; konkrete Build-Logik bleibt beim Feature.
- Shared-Module nur bei echter Wiederverwendung. Ein nur lokal benötigter Helper bleibt beim fachlichen Besitzer.
- Dateiname erklärt den Inhalt. Fachliche Dokumente erhalten sprechende Namen statt generischer `README.md`,
  `info.md` oder `notes.md`; technische Fremdvorgaben sind die Ausnahme.
- **Harte LOC-Grenze:** Handgepflegte Codedateien dürfen maximal 1.600 physische Zeilen besitzen. Keine neue oder
  geänderte Datei oberhalb des Limits liefern; berührte Altdateien darüber im selben Auftrag fachlich aufteilen.
  Klar erzeugte Generatorausgaben und unveränderter Vendor-Code sind ausgenommen, solange niemand sie manuell pflegt.
- Ungenutzten Legacy-Code nach der Änderung entfernen.

### Komponenten- und Service-Regeln

- **Nie Komponenten innerhalb anderer Komponenten definieren.** Das erzeugt neue Komponententypen pro Render und
  kann State verlieren.
- Props nach unten, Callbacks nach oben; bei tiefer gemeinsamer Nutzung vorhandenes State-Management nutzen statt
  Prop-Ketten oder Parallelstores zu erfinden.
- Sektionsspezifische Services, Finder und Actions beim fachlichen Besitzer ablegen; globale `lib`-Module nur für
  wirklich bereichsübergreifende Plattformlogik.
- Globale Module dürfen keine Feature-Sektion importieren.
- Falls eine DB-Schicht existiert: Finder lesen, Actions schreiben; Read- und Write-Verantwortung nicht verstecken.

## 6. React-, State- und Laufzeitsicherheit

- Immutable Updates verwenden; stabile eindeutige Keys; `useState` nur für renderrelevanten Zustand, `useRef` für
  mutable Laufzeitdaten ohne Renderbedarf.
- Memoisierung gezielt einsetzen: `useMemo` für tatsächlich teure Berechnung, `useCallback` für relevante stabile
  Funktionsidentität, `React.memo` nur bei messbarem Rendernutzen.
- Subscriptions, Timer und Listener immer bereinigen.
- Neue Komponenten sollen abgeleitete Werte im Render, Event-Handler oder externe Store-Subscriptions nutzen statt
  unnötiger Effect-Ketten.

### Render-Loop- und Hydration-Guard

- Nie State, Store oder Context im Renderpfad setzen.
- Nie Setter in Setter-Updatern verschachteln. Zielzustände berechnen, Updates getrennt ausführen.
- Parent-State nicht per Effect „korrigieren“. Sicheren effektiven Wert ableiten und direkt rendern.
- Interaktive Elemente nicht verschachteln; klickbare Wrapper semantisch und per Tastatur bedienbar machen.
- Write-Back-Synchronisation deduplizieren; semantisch identische Daten nicht erneut schreiben.
- Store-Actions idempotent halten: No-Op gibt vorhandenen State zurück.
- In Normalizern keine zeitbasierten Fallbacks wie `Date.now()` verwenden. Stabile Defaults verhindern künstliche
  Änderungs- und Sync-Schleifen.
- Synchronisation von der echten Quelle in eine Richtung führen, nicht als Ping-Pong zwischen Repräsentationen.
- Custom Events und Snapshots semantisch deduplizieren.
- `Maximum update depth exceeded`, `Too many re-renders`, `Cannot update while rendering`,
  `validateDOMNesting` und Hydration-Warnungen sind Stop-Signale: Update-Kette bis zur ersten eigenen Datei
  verfolgen und Ursache beheben, nie Warnung unterdrücken.

### Controlled Values und Patch-Hygiene

- Kontrollierte Werte per Allowlist validieren; ungültige Tabs, Selects und Modi auf sicheren Default setzen.
- Event-Werte nie blind mit `as MyType` casten.
- State nur bei semantischer Änderung aktualisieren.
- Nach schnellen Edits Dateiende und umgebenden Block auf duplizierte JSX-Reste, Imports und Abschlussklammern
  prüfen.
- Radix-/Shadcn-`asChild` nur mit ref-stabilem Child nutzen; instabile Motion- oder bedingte Children in einen
  stabilen Wrapper setzen.

### Performance

- Unabhängige Fetches parallelisieren.
- N+1-Abfragen vermeiden; Batch-Loading oder passende Joins nutzen.
- Teure Arbeit bündeln, instanzieren, poolen, cachen oder vorbacken, wenn es zum konkreten Pfad passt.
- Zusätzliche Layer müssen ihren sichtbaren oder spielerischen Wert gegen Framezeit, Draw Calls, Speicher,
  Update-Kosten und Komplexität bezahlen.
- Nie eine Live-Collection iterieren und im selben Iterator erweitern. Für Graphen, Flood-Fill, Nachbarschaften und
  Spawn-Ausbreitung Snapshot oder Queue, `visited`-Set und hartes Sicherheitslimit nutzen.
- Kein Performancegewinn darf Kernfunktion, Lesbarkeit, Steuerbarkeit oder belegte Qualität unbemerkt verschlechtern.

## 7. Frontend- und UI-Regeln

- Bestehendes Designsystem, Theme-Variablen, globale Styles, Portal- und Overflow-Struktur zuerst prüfen.
- Mobile-first und platzsparend gestalten: wichtige Aktion sichtbar, seltene Optionen in Tooltip, Popover oder
  Collapsible.
- Dichte Toolbars icon-first aufbauen; Icon-Buttons brauchen `aria-label`, Tooltip und eindeutige Bedeutung.
- Disabled Controls erklären den Grund. Ressourcenblocker nennen Bedarf und aktuellen Wert statt nur auszugrauen.
- Dialoge und Overlays mit stabilen soliden Surface-Farben bauen; starke Transparenz oder Blur nicht als
  Haupthintergrund verwenden, wenn Plattformen oder Lesbarkeit darunter leiden.
- Dialog nie direkt aus einem noch modal offenen Dropdown/Popover öffnen. Erst Menü schließen oder bewusst
  non-modal aufbauen; hängendes `body.style.pointerEvents = "none"` nie per globalem CSS überdecken.
- Stacking-Probleme über Portal, Overflow und Stacking Context lösen, nicht nur mit immer höherem `z-index`.
- Panels mit wechselndem Inhalt erhalten stabile Höhe oder Mindesthöhe und scrollen intern; Außenrahmen springt
  nicht bei Tab-, Item- oder Providerwechsel.
- Standardgrößen der UI-Bibliothek und bestehende Variants bevorzugen; keine willkürlichen lokalen Overrides.
- „Juicy“ heißt klare Gruppierung, Form, semantischer Rim/Glow und kurze Transform-/Opacity-Rückmeldung — nicht
  mehr Erklärtext, Kartenstapel oder dekorative Icon-Flut.
- Automatische Browser-, DOM-, Screenshot-, UI-Smoke- oder manuelle UI-Prüfungen sind nur nach ausdrücklicher
  Freigabe im aktuellen Userauftrag erlaubt; dann gelten Reihenfolge, Werkzeug und Budget aus §9.

## 8. Echtzeit-3D — große Schritte, Sichtprüfung nur nach ausdrücklicher Freigabe

Nur für visuelle oder spielerische Echtzeit-3D-Arbeit, zusätzlich zu `THREEJS-RULES.md`:

- **Makro zuerst:** Richtung, Komposition, Mechanik, Weltstruktur, Timing und Layering vor Detailwerten.
- **Änderungsmaß = Lückenmaß:** kleine Lücke klein beheben; fehlender Maßstab, Tiefe, Identität oder Spielwert verlangt
  einen großen, zusammenhängenden, reversiblen Schnitt.
- **Bei unklarer Richtung:** 2–3 klar verschiedene Richtungen festlegen; stärksten reversiblen Kandidaten als
  Vertical Slice bauen; anhand von Architektur, Zahlen und Produktziel behalten oder wechseln.
- **VFX als System:** Form, Bewegung, Material/Licht, Timing, Reaktion und Audio schichten; nicht nur Partikelzahl
  erhöhen.
- **One-shot statt Bildschleife:** Alle gekoppelten Anforderungen und Kandidaten zuerst vollständig
  ausimplementieren. Keine Capture-, Zwischenstands- oder Bildschleife während des Bauens.
- **Explizites Gate:** Agentische Sichtprüfung ist nur erlaubt, wenn der aktuelle Userauftrag sie ausdrücklich
  freigibt. Schweigen, frühere Freigaben, ein sichtbarer Scope oder eigene Unsicherheit zählen nicht. Ohne Freigabe
  übernimmt der User die direkte Oberflächen-/Gameplay-Abnahme.
- **Freigabe = Pflicht:** Liegt sie vor, die freigegebenen Sichtprüfungen nach vollständiger Umsetzung sowie
  statischen und numerischen Gegenchecks mit dem projekteigenen CLI-System nach §9 durchführen.
- **Budget statt Bildschleife:** Für den gesamten Userauftrag gelten absolut höchstens sechs Sichtprüfungen. Bei
  umfangreicher visueller 3D-Arbeit und allgemeiner Freigabe fünf gezielte Sichtfragen prüfen; die sechste für einen
  relevant korrigierten Endstand oder eine neue konkrete Frage reservieren. Nennt der User eine niedrigere Zahl,
  gilt diese. Das Budget gilt nie neu pro Phase, Kamera, Kandidat oder Mikroedit.
- Nach 3–5 Verbesserungen derselben Messachse an einer anderen 3D-Achse weiterarbeiten.

### Sichtbare Echtzeitformen statisch absichern

- Standardprimitiv plus Einfarbenmaterial ist keine fertige Hero-Form. Hero-Solids brauchen charakteristische
  Silhouette, glaubwürdigen Bodenkontakt, räumliche Tiefe und Oberflächenvariation.
- Doppeltint prüfen: `material.color × instanceColor` kann dunkel × dunkel fast schwarz machen. Materialbasis
  neutralisieren oder Farbattribute explizit führen.
- Masse und Licht trennen: solide Materie schreibt Tiefe; HDR-Kern, Halo, Funken und Bloom sind eigene Lichtrollen.
- Bodenreste, Scars, Risse, Decals und Zonen brauchen authored Masken und Rand-Falloff; Träger-Box oder Plane darf
  nicht als sichtbares Rechteck die Silhouette bestimmen.
- Geometrieherkunft, Farbpfad, Depth-/Blend-Rollen, HDR-Werte und Masken vor einer erlaubten Sichtprüfung statisch
  kontrollieren.

## 9. Validierung, Tests und Prüfbudget

### Gebündeltes Prüfbudget

- Zusammenhängenden Schnitt zuerst ausimplementieren, danach das kanonische statische Gate einmal für alle eigenen
  Änderungen ausführen.
- Funde gemeinsam beheben; normalerweise folgt ein Kontrolllauf.
- Gleiche Prüfung ohne neue Änderung oder neue Frage nicht wiederholen. Wiederholtes Scheitern bedeutet Ursache oder
  Umsetzung prüfen, nicht rerunnen.
- CI und TypeScript sind Liefergates für Code-Sicherheit, keine Mikroedit-Schleife und kein Produktbeweis.
- Den stärksten relevanten Gegencheck wählen statt ritualisierter Vollprüfung.

### Was ohne Userbefehl verboten bleibt

- keine automatischen UI-, Browser-, Playwright-, Screenshot-, DOM-Snapshot- oder Preview-Prüfungen;
- keine Gameplay-, Ingame-, Serverwert-, Recorder- oder selbst gebauten „Gefühl“-Beweise;
- keine neuen Unit-/Integration-/E2E-Tests und keine Testkonfigurationsänderung;
- keinen Dev-Server vorsorglich starten; zuerst prüfen, ob er bereits läuft, und nur bei echtem Bedarf oder
  Userauftrag starten;
- keine CLI-Modell-, Terminal-, PowerShell-, Watcher- oder Statusprozesse im Hintergrund starten. Externe Prozesse
  nur durch konkreten Auftrag oder sichtbare Nutzeraktion, danach sauber beenden.

### TypeScript und statische Checks

- Nach Codeänderungen exakt das kanonische Gate aus der lokalen `AGENTS.md` nutzen. Projektspezifischer Befehl gewinnt;
  bei `voxel-samurai-quiz` ist das `pnpm type-check`.
- Keine `include`-/`exclude`-Scopes verkleinern, um das Gate künstlich grün oder schnell zu machen.
- Cache und projektspezifische Heap-Konfiguration des vorhandenen Scripts nutzen statt einen eigenen blanken
  `tsc --noEmit`-Lauf zu erfinden.
- Bei umgeleiteter Ausgabe Exit-Code **und** Loginhalt prüfen. UTF-16LE-BOM kann einfaches `grep` täuschen;
  Encoding erkennen und `error TS` sowie `ELIFECYCLE` dekodiert zählen.
- Ein leeres Log ist kein Erfolgsbeweis; es kann auf Timeout, Kill oder Session-Abbruch hinweisen.
- Cache nur bei belegtem Verdacht über das vorhandene Clean-Script verwerfen, nicht standardmäßig.
- Reine Doku-, Prompt- oder Regeländerungen brauchen keinen Typecheck.
- Statische Checks belegen nur Typ- und Kompiliersicherheit, nicht Gameplay, Kampfgefühl, Lesbarkeit oder Optik.

### Sichtprüfung und Capture nur nach ausdrücklicher Userfreigabe

- Fehlt im aktuellen Userauftrag die ausdrückliche Erlaubnis, keine Sichtprüfung und kein Capture starten. Frühere
  Freigaben, ein sichtbarer Scope, eigene Unsicherheit oder ein laufender Dev-Server ersetzen sie nicht.
- Freigabe macht die Sichtprüfung im genannten Scope zum Pflichtschritt. Reihenfolge: alle fachlichen Todos und
  Änderungen vollständig ausimplementieren → kanonisches statisches Gate und nötige numerische Gegenchecks →
  Sichtprüfung. Keine Zwischenstands-, Phasen- oder Fortschritts-Captures.
- Für den gesamten Userauftrag höchstens sechs gezielte Sichtprüfungen durchführen. Eine ausdrücklich niedrigere
  Userzahl gewinnt; das Budget erneuert sich nicht pro Phase, Kamera, Kandidat oder Mikroedit. Jede weitere Prüfung
  braucht eine andere konkrete Sichtfrage oder einen relevant geänderten Endstand. Ein montiertes Vergleichsbild
  zählt als eine Sichtprüfung.
- Ausschließlich das projekteigene CLI-Capture-System verwenden.
- Den lokalen Einstieg zuerst in der Projekt-Pfadkarte, den `package.json`-Scripts und passenden `scripts/`-
  Ordnern suchen.
- Den [Screenshot-Guide](SCREENSHOT-GUIDE.md) nur lesen, wenn der Einstieg danach unklar bleibt oder das System
  wirklich fehlt; ein fehlendes System anschließend nach diesem Vertrag bauen.
- Playwright startet einmalig headless Chromium, dieselbe Sitzung bedient alle Messungen.
- Software-Renderer brechen den Lauf ab.
- PNG direkt aus dem Engine-Post-Target erzeugen, in Three.js per `readRenderTargetPixels()`, niemals per
  `page.screenshot()` oder sichtbarem Browser.
- Im fertigen Build zuerst relative Maße, Rauschboden und tatsächlichen Messfensterinhalt prüfen; danach nur die für
  die benannten Sichtfragen nötigen Bildausschnitte ansehen.
- Pro Sichtfrage genau das stärkste Vorher/Nachher- oder Gewinner/Verlierer-Vergleichsbild prüfen. Unveränderte
  Bilder oder identische Fragen nicht erneut prüfen; nach spätestens der sechsten Prüfung die Bildschleife beenden.

## 10. Sichtbare Ergebnisqualität und Craft-Modus

**Erfolgstest = Wirkung, nicht nur Erfüllung.** Technisch korrekte Mittelmäßigkeit entsteht, wenn nur Häkchen und
Gates optimiert werden. Nutzererlebte Kernbereiche erhalten maßgeschneiderte Sorgfalt; unsichtbare Infrastruktur
bleibt möglichst simpel.

- An wichtigen Gabelungen reichere, kohärente Variante für das Nutzererlebnis wählen; Komplexität nicht wahllos im
  Hintergrund erhöhen.
- Schwierigen Kern nicht durch billigen Ersatz vereinfachen. Gerade Fokusobjekt, Kernzahl, erste Interaktion oder
  zentraler Satz erhalten den größten Aufwand.
- Qualität addiert. Fokusaufwertung darf keine bereits gute oder explizit verlangte Eigenschaft verschlechtern.
- Richtigen Hebel verwenden: lokale Betonung, Kadrierung, Platzierung oder relative Skala verbessern, nicht den
  gesamten Kontext degradieren.
- Physisch und logisch kohärent bleiben; Zustände, Summen, Richtungen und Abhängigkeiten müssen real zusammenpassen.
- Vor Abschluss den gesamten Auftrag einmal gegenlesen: Ist jedes explizite Merkmal noch wahr? Wurde nichts vorher
  Gutes geopfert?
- Ohne erlaubte visuelle Prüfung Abschluss ehrlich als technisch umgesetzt und manuell abzunehmen kennzeichnen.
  Mit Freigabe erst nach den vorgesehenen CLI-Sichtprüfungen abschließen. Code-Sicherheit niemals als sichtbaren
  Qualitätsbeweis verkaufen.

### Generative Bau-Prompts

- Mission und First Read zuerst: Welt-/Objektidee, Fokus, Erlebnis und sichtbares Anti-Ziel knapp benennen.
- Kurze Designkapsel statt universellem Bauteilkatalog: wenige tragende Formen, Materialien, Maßstabs- und
  Lichtkontraste.
- User-, Produkt-, Gameplay-, Engine- und Ownership-Grenzen als Invarianten markieren; authored Lösung innerhalb
  dieser Grenzen frei lassen.
- Zentrale Ereignisse kausal beschreiben: Ursache → gemeinsamer Kontakt/Quelle → Reaktion → sichtbare Folge.
- Technische Rezepte nur nennen, wenn Engine, Ownership, Performance, Userauftrag oder belegter Wiederholungsfehler
  sie erzwingen.
- Keine Prompt-Inflation durch Werkzeug-, Material-, Partikel- und Dateilisten. Sichtbares Ergebnis bleibt Maßstab.

## 11. Git und Lieferung

- Nur eigene Dateien stagen, nie pauschal `git add -A`. Fremde offene Änderungen unangetastet lassen.
- Zielbranch grundsätzlich `main`. Nennt lokale `AGENTS.md` einen anderen Zielbranch, dort bleiben.
- Nie eigenmächtig Branch oder Worktree anlegen, wechseln oder öffnen; nur aktueller Userauftrag darf das verlangen.
- Jede kompilierfähige bzw. bei reiner Doku konsistente Einheit eigenständig committen und pushen.
- Commit-Titel einzeilig und konkret: `typ(bereich): was`.
- Bei Submodulen zuerst im Submodul nur eigene Dateien committen und pushen; danach im Elternrepo ausschließlich den
  neuen Submodule-Pointer plus dortige eigene Dateien committen.
- Commit-/Push-Fehler nicht delegieren. Abgelehnten Push synchronisieren, bei Bedarf `git pull --rebase`, Konflikte
  inhaltlich sinnvoll lösen, Rebase fortsetzen und erneut pushen.
- Keine fremden Staging-Einträge übernehmen, zurücksetzen oder in eigene Commits mischen.

## 12. Wissen, Kommunikation und Abschluss

### Wissen klein und belastbar halten

- Technische Tipps bleiben freiwillig und widerlegbar; gemessen bessere Lösung gewinnt.
- Nur ein Learning lesen, das vor der konkreten Arbeit hilft.
- Belegt teure Erfahrung nach `LEARNING-SYSTEM.md` als kurzen Projekttipp zurückgeben; Duplikate vermeiden.
- Maximale Informationsdichte: Fehlerbild, Ursache, Handlung und Beleg erhalten; Füllwörter, Einleitungen,
  Wiederholungen und Synonymketten streichen.

### Übergabedateien und Übergabe-Startprompts knapp halten

Eine Übergabe ist ein Startbefehl, kein Arbeitsbericht. Gleiche Dichte wie oben, zusätzlich hart gedeckelt:

- **Pflichtformat:** Jede neu erzeugte oder aktualisierte Übergabedatei nutzt ausschließlich kompakte
  Markdown-Stichpunkte. Das gilt auch für automatisch erzeugte Fallbacks und den enthaltenen Übergabe-Startprompt.
- **Kein Fließtext:** Überschriften sind erlaubt; darunter steht jede eigenständige Information in genau einem
  Stichpunkt. Auch der Startprompt besteht nur aus direkt ausführbaren Anweisungsstichpunkten.
- **Sprachschnitt:** Füllwörter, Wiederholungen und unnötige Artikel entfernen, wenn die Formulierung natürlich und
  eindeutig bleibt — etwa `Intensität` statt `die Intensität`. Notwendige Grammatik und technische Substanz bleiben.
- **Deckel:** höchstens sechs Abschnitte, je höchstens acht Zeilen; Gesamtlänge unter einer Bildschirmseite.
- **Diese sechs:** Auftrag · Stand · nächster Schritt · Fallen · Dateien mit Zeilennummer, sofern bekannt ·
  Startbefehl.
- **Zahl statt Prosa:** Messwert, Pfad, Commit-Hash. Herleitungen, Sweeps und widerlegte Hypothesen gehören in
  die Task-Datei, nicht in die Übergabe; dort steht nur der Verweis darauf.
- **Vollständigkeit vor Telegrammstil:** Ursachen, Grenzen, Abhängigkeiten, offene Entscheidungen, Zahlen, Pfade und
  Befehle nie für Kürze verlieren.
- **Nichts wiederholen,** was schon in Task-Datei, Commit-Nachricht oder Code-Kommentar steht.
- **Kein Rückblick:** was erledigt und dokumentiert ist, ist Erledigtes und kein Übergabeinhalt.

### Chat-Titel

Jeder neue Chat erhält, sobald das konkrete Ziel klar ist, genau eine Metadatenzeile:

```text
CHAT_META::Titel: [konkreter fachlicher Titel, 11–20 Wörter]
```

Keine generischen Titel, Phasenpräfixe, Description-Zeile oder spätere zufällige Umbenennung. Einen neuen Titel nur
bei klarem Themenwechsel erzeugen.

### Grundton, Antworten Output und Denkweise, Prompt-Dateien, Tasks
- Alles muss in diesem Format ausgegeben werden! Auch bestehende Sachen anpassen direkt nach diesem Schema, tokenkompakt!

* Deutsch zuerst: kurz, klar, freundlich, motiviert und verständlich.
* Einfache Alltagswörter und direkte Verben verwenden.
* Ergebnis zuerst; Problem, Ursache und Änderung konkret benennen.
* Kompakte Stichpunkte bevorzugen, eine klare Information pro Punkt.
* Zahlen für Reihenfolgen, Pfeile für kurze Abläufe, Checkboxen für Aufgaben.
* Passende Icons sparsam zur Orientierung nutzen.
* Immer die passendste Darstellung wählen, nicht alles gleichzeitig verwenden.
* Füllwörter, Wiederholungen, unnötige Artikel, Einleitungen und Satzteile entfernen.
* Alle wichtigen Informationen und Zusammenhänge erhalten.
* Schwierige Begriffe kurz erklären, keine erfundenen Abkürzungen.
* Keine langen Ich-Erzählungen und keine unnötigen manuellen Schritte an den Nutzer abgeben.
* UTF-8 mit echten Umlauten verwenden; Dokumentation nach Änderungen auf Mojibake prüfen.
- Nicht zuviele Linebreaks verwenden, kompakt halten


### Abschluss nach Änderungen

Kurz nennen:

1. **Ergebnis**;
2. **Problem/Ursache**, falls relevant;
3. **Änderung**;
4. **Dateien/Pfade**;
5. **Code-Sicherheit und manuelles Produktgate**;
6. nur echte offene Blockaden oder sinnvoller nächster Verbesserungsvorschlag.

Für jede neu erzeugte Datei oder jedes Artefakt den vollständigen Pfad nennen. Projektgebundene finale Bilder,
Konzepte und Exporte im Projekt ablegen, nicht nur in Temp-, AppData-, Chat- oder Generatorpfaden. Für angeforderte
Bildserien mindestens Zweck, finalen Prompt, Referenzquellen, Projektpfad, Format, Pixelmaße und Auswahl dokumentieren;
bei Baugrundlagen zusätzlich Kamera/Komposition, relative Größen, Materialien, Licht, Negativvorgaben und
Performance-Bauweise als Markdown-SSoT festhalten.

## 13. Schnellcheck vor „fertig“

- Auftrag und lokale `AGENTS.md` vollständig erfüllt?
- Bestehenden Plan fortgeführt und alle eigenen Todos korrekt abgehakt?
- Richtige Grundstruktur und eine SSoT statt Patch- oder Parallelarchitektur?
- Jede neue oder berührte handgepflegte Codedatei bei höchstens 1.600 LOC?
- Explizite Eigenschaften erhalten, keine Regression eingeführt?
- Eigene Funde im Scope behoben, fremde Änderungen unangetastet?
- Keine unerlaubten UI-/Gameplay-Tests, Worktrees, Dev-Server oder Hintergrundprozesse gestartet; bei Freigabe
  Sichtprüfungen erst nach kompletter Umsetzung, nur per Projekt-CLI und höchstens sechsmal durchgeführt?
- Kanonisches statisches Gate nach Codeänderungen gebündelt ausgeführt; Dokuänderung nicht sinnlos typegecheckt?
- UTF-8, Links, Dateiende und Diff geprüft?
- Nur eigene Dateien gestagt, kompilierfähige Einheit committed und gepusht?
- Bei Submodul zuerst Submodul, danach Eltern-Pointer geliefert?
