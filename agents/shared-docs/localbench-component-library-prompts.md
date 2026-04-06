# Design-System Prompt-Katalog

## Zweck

Fertige Prompts fuer typische Frontend-Aufgaben in NoteDrill. Jeder Prompt setzt voraus, dass die KI zuerst `shared-docs/agents/shared-docs/modernize-frontend.md` liest.

---

## Prompt 1: Einzelkomponente modernisieren

**Use Case:** Eine bestehende Komponente sieht veraltet aus.

```md
Modernisiere die Komponente [DATEIPFAD] auf Design-System-Niveau.

Pflicht:
1. Lies zuerst: shared-docs/agents/shared-docs/modernize-frontend.md
2. Analysiere IST-Zustand und nenne die Top-5 Abweichungen zum Design-System.
3. Nutze bestehende Design*-Komponenten aus components/design-system/ wo moeglich.
4. Implementiere das Redesign direkt im Code.
5. Nur muted Borders, klare Typography-Hierarchie, kompakte Spacing-Rhythmik.
6. Visual-Audit: Light/Dark, Mobile/Desktop, Hover/Focus/Active.

Output:
- Geaenderte Dateien
- Welche Design-System-Patterns uebernommen wurden
- Offene Edge Cases
```

---

## Prompt 2: Neue Komponente im Design-System-Stil

**Use Case:** Feature braucht neue UI.

```md
Erzeuge eine neue Komponente [NAME] im Design-System-Stil.

Pflicht:
1. Lies zuerst: shared-docs/agents/shared-docs/modernize-frontend.md
2. Nutze bestehende Design*-Komponenten zuerst (DesignButton, DesignCard, DesignBadge, etc.).
3. Kein generisches Template-Design.
4. Border und Shadow dezent (opacity-basiert, nicht leuchtend).
5. Zustaende vollstaendig: default, hover, focus, active, disabled, loading.
6. Responsiv (375px, Tablet, Desktop).
7. Dark + Light Mode.

Output:
- Komponenten-Code
- Kurze API-Doku (Props) und Nutzungsbeispiel
```

---

## Prompt 3: Qualitaets-Audit (ohne Umsetzung)

**Use Case:** Erst Bewertung, dann Implementierung.

```md
Fuehre ein Design-System-Compliance-Audit fuer [DATEI_ODER_BEREICH] durch.

Lies zuerst: shared-docs/agents/shared-docs/modernize-frontend.md

Bewerte:
1. Farben/Surfaces (Token-konform?)
2. Borders (muted vs. zu laut)
3. Typography (Sans/Serif/Mono korrekt eingesetzt?)
4. Radius/Spacing (konsistent mit System?)
5. Interaktionszustaende (Hover/Focus/Active)
6. Dark/Light Mode

Liefere:
- Severity-Liste (kritisch, mittel, niedrig)
- Praezise Dateireferenzen mit Zeilennummern
- Konkrete Fix-Vorschlaege pro Punkt
```

---

## Prompt 4: Layering/Overflow-Fix

**Use Case:** Overlays oder Elemente verschwinden, z-Index Probleme.

```md
Fixe die Layering-Probleme in [DATEIPFAD].

Pflicht:
1. Pruefe Stacking-Contexts (position, z-index, transform, filter, opacity).
2. Pruefe Clipping durch overflow.
3. Behalte Design-System-Sprache bei (keine Notloesung mit grellen Farben).
4. Verifiziere Desktop + Mobile.

Output:
- Root-Cause
- Konkrete Fixes
- Kurzer Sicherheitscheck gegen Regression
```

---

## Prompt 5: Schnell-Update (Team-Standard)

**Use Case:** Komponente soll schnell auf Design-System-Niveau gebracht werden.

```md
Die Komponente [DATEIPFAD] ist noch nicht im Design-System-Standard.
Bringe sie auf Design-System-Niveau.

Vorgehen:
1. Lies: shared-docs/agents/shared-docs/modernize-frontend.md
2. Abweichungen analysieren (Farben, Typography, Radius, Border, States).
3. Bestehende Design*-Komponenten aus components/design-system/ nutzen.
4. Direkte Umsetzung im Code.
5. Kurzes Vorher/Nachher-Delta ausgeben.
```

---

## Prompt 6: Bereich-Migration (Sidebar, Chat, Dashboard)

**Use Case:** Ganzer App-Bereich soll modernisiert werden.

```md
Migriere den Bereich [BEREICH_NAME] auf das Design-System.

Pflicht:
1. Lies: shared-docs/agents/shared-docs/modernize-frontend.md
2. Inventur: Welche Komponenten gibt es im Bereich?
3. Pro Komponente: Welche Design*-Primitives koennen eingesetzt werden?
4. Umsetzung in Schritten (nicht alles auf einmal).
5. Nach jedem Schritt:
   - Border-Audit (nur muted)
   - Typography-Audit (Inter/Serif/Mono sinnvoll)
   - Responsive-Audit (mobile + desktop)
6. Dark/Light Mode testen.

Output:
- Geaenderte Dateien pro Schritt
- Welche Design*-Komponenten eingesetzt wurden
- Offene Risiken
```

---

## Prompt 7: /admin/design Pilot aktualisieren

**Use Case:** Neue Patterns zuerst im Showcase testen.

```md
Aktualisiere den Bereich app/admin/design auf Design-System-Standard.

Pflicht:
1. Lies: shared-docs/agents/shared-docs/modernize-frontend.md
2. Finde veraltete Patterns in app/admin/design/DesignShowcaseClient.tsx.
3. Ersetze sie durch Design-System-konforme Patterns.
4. Dokumentiere pro Block: Alt-Pattern -> Neues Pattern.
5. Primitives zentral erweitern, nicht nur Klassen lokal ueberschreiben.

Output:
- Geaenderte Dateien
- Mapping: Showcase-Block -> Produktive Zielbereiche
```

---

## Referenzen

- [modernize-frontend.md](modernize-frontend.md) (Design-System SSOT)
- [components/design-system/](../../../components/design-system/) (Fertige Komponenten)
- [Pilot-Bereich](../../../app/admin/design/) (/admin/design Showcase)
