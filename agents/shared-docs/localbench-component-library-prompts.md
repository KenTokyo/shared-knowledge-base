# LocalBench Component Library Prompt-Katalog

## Zweck

Diese Prompts sind für typische Realfälle gedacht:

- einzelne Komponente ist noch nicht im LocalBench-Stil
- komplette App soll auf LocalBench umgestellt werden
- Komponenten sollen wiederverwendbar/portabel gemacht werden
- Install-Script oder Generator soll entstehen

Hinweis:

- Nutze die Prompts mit konkreten Datei-Pfaden.
- Immer vorher `modernize-frontend.md` und das Playbook lesen lassen.

---

## Prompt 1: Einzelkomponente modernisieren

**Use Case:** Eine bestehende Komponente sieht veraltet aus.

```md
Du arbeitest in [REPO_PATH].
Modernisiere die Komponente [DATEIPFAD] auf LocalBench-Designsystem-Niveau.

Pflicht:
1. Lies zuerst:
   - shared-docs/agents/shared-docs/modernize-frontend.md
   - shared-docs/agents/shared-docs/localbench-component-library-playbook.md
2. Analysiere IST-Zustand der Komponente und nenne die Top-5 Abweichungen zu LocalBench.
3. Implementiere das Redesign direkt im Code (kein reiner Plan).
4. Nutze nur muted Borders, klare Typography-Hierarchie, kompakte Spacing-Rhythmik.
5. Wenn möglich: bestehende Primitives erweitern statt neue Datei erstellen.
6. Führe am Ende einen kurzen Visual-Audit durch (Light/Dark, Mobile/Desktop, Hover/Focus/Active).

Output:
- Geänderte Dateien
- Welche LocalBench-Patterns übernommen wurden
- Offene Edge Cases
```

---

## Prompt 2: App-weiter Migrationsplan

**Use Case:** Ganze App auf LocalBench-Stil migrieren.

```md
Erstelle einen phasenweisen Migrationsplan, um [APP_NAME] auf LocalBench Component Library Stil umzustellen.

Pflicht:
1. Lies zuerst:
   - shared-docs/agents/shared-docs/modernize-frontend.md
   - shared-docs/agents/shared-docs/localbench-component-library-playbook.md
2. Führe eine Komponenten-Inventur durch:
   - Buttons, Inputs, Cards, Overlays, Sidebar, Chat, Tabellen, Typografie
3. Erstelle diese Artefakte:
   - MASTER-PLAN.md
   - PHASENPLAN.md
   - PERFORMANCE-TESTPLAN.md
   - EDGE-CASE-KATALOG.md
4. Jede Phase braucht:
   - Ziel
   - Dateien
   - Risiko
   - Test
   - Sichtbarer Nutzen
5. Definiere zusätzlich eine Minimal-Weiß-Verknüpfung (Theme-Layer auf LocalBench-Struktur).

Output:
- Vollständige Task-Dokumente mit absoluten Pfaden
```

---

## Prompt 3: Komponente wiederverwendbar machen

**Use Case:** Eine Komponente aus `localbench-component-library` soll portabel werden.

```md
Mache die Komponente [QUELLDATEI] aus localbench-component-library wiederverwendbar für andere Apps.

Pflicht:
1. Entkopple App-spezifische Abhängigkeiten (Routing, Content-Loader, globale Stores).
2. Ersetze harte Annahmen durch Props/Callbacks.
3. Halte Designsprache LocalBench-konform.
4. Erstelle oder ergänze Exports in einem zentralen Index.
5. Dokumentiere:
   - welche Abhängigkeiten vorher app-gekoppelt waren
   - wie der neue API-Vertrag aussieht (Props)
   - ein kurzes Nutzungsbeispiel

Output:
- Refactor im Code
- Mini-Migrationshinweis für Consumer-Apps
```

---

## Prompt 4: Install-Script erzeugen

**Use Case:** Komponenten sollen nicht manuell kopiert werden.

```md
Erstelle ein Install-Script für LocalBench-UI-Komponenten.

Ziel:
- `npm run localbench:add <component-name>` oder ähnlicher Flow

Pflicht:
1. Script prüft Zielprojekt (Tailwind, React-Version, benötigte Dependencies).
2. Script kopiert Komponente + direkte Abhängigkeiten in definierte Zielpfade.
3. Script ergänzt fehlende Utility-Dateien nur wenn nötig.
4. Script erzeugt klare Konsole-Ausgabe:
   - was kopiert wurde
   - was manuell zu tun ist
5. Script ist idempotent (zweiter Lauf zerstört nichts).

Output:
- Script-Datei(en)
- kurze README-Nutzung
- bekannte Grenzen
```

---

## Prompt 5: Prompt für „Komponente noch nicht geupdatet“

**Use Case:** Schneller Team-Standardprompt.

```md
Die Komponente [DATEIPFAD] ist noch nicht im LocalBench-Standard.
Bitte bringe sie vollständig auf LocalBench Component Library Niveau.

Vorgehen:
1. Abweichungen analysieren (Farben, Typography, Radius, Border, States, Motion).
2. Direkte Umsetzung im Code.
3. Falls sinnvoll bestehende Primitives nutzen/erweitern.
4. Ergebnis gegen diese Referenzen auditieren:
   - modernize-frontend.md
   - localbench-component-library-playbook.md
5. Gib ein kurzes Vorher/Nachher-Delta aus.
```

---

## Prompt 6: Prompt für „gesamtes Designsystem wechseln“

**Use Case:** Bestehende App komplett auf LocalBench-Look.

```md
Stelle das bestehende Designsystem in [APP_NAME] auf LocalBench Component Library um.

Pflicht:
1. Erst Analyse + Taskplanung, dann Umsetzung in Phasen.
2. Keine Big-Bang-Änderung ohne Primitive-Layer zuerst.
3. Theme-Kompatibilität erhalten (Light/Dark + optional Minimal-Weiß).
4. Während der Umsetzung:
   - nach jeder Phase Plan aktualisieren
   - Risiken und Regressionen dokumentieren
5. Abschluss mit UI-Audit:
   - Border muted?
   - Typography korrekt?
   - Overlay-Layer stabil?
   - Mobile sauber?
```

---

## Prompt 7: Edge-Case-Fix (Layering/Overflow)

**Use Case:** Overlays oder Textchips verschwinden.

```md
Fixe die Layering-Probleme in [DATEIPFAD].

Kontext:
- Overlays/KPI-Karten müssen immer lesbar und sichtbar bleiben.

Pflicht:
1. Prüfe Stacking-Contexts (`position`, `z-index`, `transform`, `filter`, `opacity`).
2. Prüfe Clipping durch `overflow`.
3. Behalte LocalBench-Designsprache bei (keine Notlösung mit grellen Farben).
4. Verifiziere Desktop + Mobile.

Output:
- Root-Cause
- konkrete Fixes
- kurzer Sicherheitscheck gegen Regression
```

---

## Prompt 8: Qualitäts-Audit ohne sofortige Umsetzung

**Use Case:** Erst Bewertung, dann Implementierung.

```md
Führe ein LocalBench-Compliance-Audit für [DATEI_ODER_BEREICH] durch.

Bewerte:
1. Farben/Surfaces
2. Borders (muted vs zu laut)
3. Typography
4. Radius/Spacing
5. Interaktionszustände
6. Motion

Liefere:
- Severity-Liste (kritisch, mittel, niedrig)
- präzise Dateireferenzen
- konkrete Fix-Vorschläge pro Punkt
```

---

## Prompt 9: Neue Komponente im LocalBench-Stil erzeugen

**Use Case:** Feature braucht neue UI.

```md
Erzeuge eine neue Komponente [NAME] im LocalBench-Stil.

Pflicht:
1. Nutze bestehende Primitives zuerst (Selector, Card, Button, Overlay, etc.).
2. Kein generisches Template-Design.
3. Border und Shadow dezent halten.
4. Zustände vollständig:
   - default, hover, focus, active, disabled, loading
5. Responsiv (375px, Tablet, Desktop).
6. Dokumentiere kurze API (Props) und ein Nutzungsbeispiel.
```

---

## Prompt 10: `/admin/design` als Pilot aktualisieren

**Use Case:** Vor produktiver Migration erst Design im Showcase pruefen.

```md
Aktualisiere den Bereich `app/admin/design` auf LocalBench-Standard und nutze ihn als Pilot fuer die spaetere Produktivmigration.

Pflicht:
1. Lies zuerst:
   - shared-docs/agents/shared-docs/modernize-frontend.md
   - shared-docs/agents/shared-docs/localbench-component-library-playbook.md
2. Finde veraltete Patterns in `app/admin/design/DesignShowcaseClient.tsx`.
3. Ersetze sie durch LocalBench-konforme Patterns (muted borders, kompakte spacing, klare typografie).
4. Dokumentiere pro Block:
   - "Alt-Pattern"
   - "Neues Pattern"
   - "Produktive Zielkomponenten, die davon profitieren"
5. Kein rein visuelles Tuning: Primitives zentral erweitern, nicht nur Klassen lokal ueberschreiben.

Output:
- Geaenderte Dateien
- Mapping "Showcase-Block -> Produktive Zielbereiche"
- Offene Risiken
```

---

## Prompt 11: Komplettes Designsystem einer bestehenden App auf LocalBench umstellen

**Use Case:** Bestehende App soll einheitlich auf LocalBench aussehen.

```md
Migriere das bestehende Designsystem von [APP_NAME] auf LocalBench-Komponentensystem.

Rahmen:
- Referenz-Library: D:\\CODING\\React Projects\\localbench-component-library
- Interner Pilotbereich: /admin/design

Pflicht:
1. Erstelle zuerst eine Inventur (Buttons, Inputs, Cards, Overlays, Sidebar, Chat, Tabellen).
2. Definiere Migration in Wellen:
   - Welle A: Tokens + Primitives
   - Welle B: Sidebar + Chat
   - Welle C: Dashboard + Dialoge + Long-Tail
3. Nach jeder Welle:
   - Border-Audit (nur muted)
   - Typography-Audit (Inter/Serif/Mono sinnvoll eingesetzt)
   - Responsive-Audit (mobile + desktop)
4. Aktualisiere die Task-Doku nach jeder Welle.
5. Liefere am Ende ein "Stabilitaetsprotokoll" mit Regression-Risiken.

Output:
- Phasenplan mit betroffenen Dateien
- konkrete Umsetzungsergebnisse je Welle
- finale Audit-Checkliste
```

---

## Referenzen

- [modernize-frontend.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/shared-docs/agents/shared-docs/modernize-frontend.md)
- [localbench-component-library-playbook.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/shared-docs/agents/shared-docs/localbench-component-library-playbook.md)
- [MASTER-PLAN.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/docs/design/tasks/2026-04-01-localbench-component-library-adoption/MASTER-PLAN.md)
- [ADMIN-DESIGN-TO-LOCALBENCH-PLAN.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/docs/design/tasks/2026-04-01-localbench-component-library-adoption/ADMIN-DESIGN-TO-LOCALBENCH-PLAN.md)
