# Automatische Enhanced-Prompts als Standard

## Initial goal

- Prompt: `auto-enhanced-prompt-default-enhanced-prompt.md`
- `CODING-RULES.md` auf sicheren Auto-Enhance-Standard umstellen.

## Phasen

- [x] P1 — Aktuelle Coding Rules und bestehenden Promptdatei-Vertrag vollständig prüfen.
- [x] P2 — Varianten vergleichen und Default-/Keyword-Semantik festlegen.
- [x] P3 — Dateivertrag, Auto-Enhance-Regeln und Workflow-Verweise anpassen.
- [x] P4 — Widersprüche, alte aktive Plain-Prompt-Verweise, UTF-8, Diff und Zeilenlimit statisch prüfen.

## Entscheidungen

- Hybrid gewinnt: Auto-Enhance ist Standard, aber Stärke richtet sich nach Qualität des Originals.
- Kein Keyword nötig. `Prompt verbessern` bestätigt nur den Default und bedeutet verbessern plus implementieren.
- Zwei Ausnahmen: `Nur Prompt verbessern` verhindert Umsetzung; `Prompt unverändert` schützt bereits perfekte Prompts vor semantischer Erweiterung.
- Neue Projektaufgaben nutzen ausschließlich `…-enhanced-prompt.md`; historische Dateien werden erst beim nächsten aktiven Task migriert.
- Reine Fragen und Leseaufträge erzeugen weiterhin kein Dateipaar.
- Nur `CODING-RULES.md` und diese Taskunterlagen ändern; keine Produkt-Enhancer- oder Popover-Logik.
- Reine Dokuänderung: keine Tests, Builds, Serverstarts oder Sichtprüfungen.

## Variantenvergleich

| Variante | Vorteil | Risiko | Entscheidung |
|---|---|---|---|
| Verbesserung nur mit Keyword | maximal konservativ | User vergisst Keyword; vage Kritik bleibt schwach | verwerfen |
| Jeden Prompt stark erweitern | kein schwacher Arbeitsauftrag | gute Prompts werden überladen oder verfälscht | verwerfen |
| Verlustfreies Auto-Enhance mit Ausnahmen | vage Kritik wird konkret; gute Prompts bleiben geschützt | braucht klare Semantik | **umsetzen** |

## Findings

- Aktuelle Regeln erkennen „mach klarer/schöner“ bereits und lassen dieselbe KI verbessern plus umsetzen.
- Nicht abgedeckt sind Auto-Enhance ohne Trigger, vage Qualitätskritik als eigener Auslöser und ausschließlich enhanced benannte neue Promptdateien.
- Aktive Plain-Prompt-Verweise stehen in Ziel, Dateivertrag, Übergabebeispiel und Schnellcheck.

## Fortschrittslog (append-only)

### Runde 1 — 2026-08-14 — Bestehenden Vertrag geprüft

- Aktuelle 268-zeilige Coding Rules vollständig gelesen.
- Früheren Enhanced-Prompt-Vertrag samt Entscheidungen und historischen Updates vollständig geprüft.
- Bestehende Same-AI-Umsetzung bleibt erhalten; Aktivierung und Dateinamen werden vereinfacht.

### Runde 2 — 2026-08-14 — Hybrid gewählt

- Explicit-only schützt gute Prompts, lässt aber typische vage Qualitätskritik unbearbeitet.
- Starkes Always-Enhance behebt Vages, kann jedoch vollständige Prompts überladen.
- Verlustfreies Auto-Enhance mit zwei klaren Ausnahmen verbindet beide Vorteile und braucht kein Pflichtkeyword.

### Runde 3 — 2026-08-14 — Auto-Enhance-Vertrag umgesetzt

- Neue Projektaufgaben nutzen nur noch `…-enhanced-prompt.md`; historische Plain-Dateien migrieren erst bei aktiver Weiterarbeit.
- Default verbessert und implementiert ohne Zwischenstopp; `Prompt verbessern` bestätigt denselben Ablauf.
- `Nur Prompt verbessern` und `Prompt unverändert` bilden die zwei eindeutigen Ausnahmen.
- Vage Kritik wird automatisch in Mangel, Domänendimensionen, gezielte Adjektive, Schutz und Abnahme übersetzt.
- Übergabe, Abschlusslesen und Schnellcheck auf den einheitlichen Enhanced-Pfad angepasst.

### Runde 4 — 2026-08-14 — Vertrag statisch abgeschlossen

- Acht Kernaussagen für Default, Keywords, vage Kritik, starke Prompts und Legacy-Migration statisch bestätigt.
- Alle 13 lokalen Links in `CODING-RULES.md` vorhanden; Prompt-/Task-Link ist intakt.
- Keine aktiven Plain-Prompt-Pfade verblieben; zwei Nennungen erklären ausschließlich Abschaffung und Legacy-Migration.
- Keine UTF-8-Ersatzzeichen, nachgestellten Leerzeichen oder Diff-Whitespacefehler gefunden.
- `CODING-RULES.md` bleibt mit 280 Zeilen deutlich unter 800 Zeilen.
- Keine Tests, Builds, Serverstarts oder Sichtprüfungen ausgeführt.

### Runde 5 — 2026-08-14 — Git-Grenze dokumentiert

- Remote abgerufen: lokaler `main` ist bereits einen fremd erstellten Commit voraus (`8a5dcbb`), ohne Rückstand.
- Kein Commit oder Push erstellt, weil ein Push den nicht von dieser Runde erzeugten Vorgängercommit mitveröffentlichen würde.
- Arbeitsänderungen bleiben klar auf `CODING-RULES.md` und den neuen Auto-Enhance-Taskordner begrenzt.
