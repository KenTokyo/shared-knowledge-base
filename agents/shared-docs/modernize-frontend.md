# Modernize Frontend (SSOT)

## Ziel dieser Datei

Diese Datei ist die verbindliche Frontend-Referenz für alle zukünftigen UI-Modernisierungen in NoteDrill und weiteren Apps.

Primäre visuelle Wahrheit ist das vollständige LocalBench-Designsystem:

- Projekt: `D:\CODING\React Projects\localbench-component-library`
- Design-System Seite: `src/pages/DesignSystem.tsx`
- Kern-Tokens: `src/index.css`, `index.html`
- Kern-Komponenten: `src/components/*`, `src/components/design-system/*`

Wenn Frontend-Komponenten gebaut oder überarbeitet werden, muss diese Datei vor dem Coding gelesen werden.

## Ergänzende Pflichtquellen

- [LocalBench Component Library Playbook](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/shared-docs/agents/shared-docs/localbench-component-library-playbook.md)
- [LocalBench Prompt-Katalog](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/shared-docs/agents/shared-docs/localbench-component-library-prompts.md)

---

## Beste Integrationsstrategie (Kurzfassung)

Ja, LocalBench kann und sollte in NoteDrill eingebaut werden.

Die beste Strategie ist:

1. zuerst Tokens vereinheitlichen,
2. dann Primitives harmonisieren,
3. dann Feature-Flaechen in Wellen migrieren.

Kein Big-Bang-Designwechsel. Dieser erzeugt zu viele Regressionen.

Empfohlene Migrationswellen:

1. Welle A: `components/ui/*`
2. Welle B: Sidebar + Chat
3. Welle C: Dashboard + Formulare + Overlays

Pilotbereich:

- `http://localhost:3001/admin/design`
- Dateien:
  - `app/admin/design/page.tsx`
  - `app/admin/design/DesignShowcaseClient.tsx`

Regel:

- Neue Designmuster zuerst im Pilotbereich bauen.
- Erst danach in produktive Bereiche uebernehmen.

---

## Pflicht-Workflow vor Frontend-Code

1. Mock/Screenshot prüfen (falls vorhanden) und auf LocalBench-Stil mappen.
2. Prüfen, ob es den Pattern-Baustein bereits gibt (Card, Selector, Sidebar, Dialog, Chat, Table).
3. Tokens aus diesem Dokument übernehmen statt neue „ad hoc“-Styles zu erfinden.
4. Erst dann Code schreiben.

Pflicht-Kommentar für neue UI-Sektionen:

```tsx
{/* MOCK-REFERENZ: PRIMARY=LocalBench Hero/Card System */}
{/* Mock-Analyse: Farben=Neutral+Muted, Fonts=Inter/Playfair/JetBrains, Borders=Subtil, Layout=Kompakt+Luft */}
```

---

## LocalBench Analyse (abgeleitet aus echtem Projekt)

### 1) Design-Charakter

- Minimal, technisch, editorial.
- Klare Flächen mit sehr subtilen Borders.
- Große Radius-Sprache (`rounded-3xl`) für Cards/Sections.
- Runde Controls (`rounded-full`) für Inputs/Buttons.
- Hohe Lesbarkeit, wenig visuelles Rauschen.
- Dark-first möglich, aber Light nicht „billig“: Off-White + Glass-Panels.

### 2) Farb- und Token-Basis

Aus LocalBench-Quellen (`src/index.css`, `index.html`, `ColorsSection.tsx`):

- Light Background Basis: `--bg-light` (Default `#fafafa`, Varianten `#fdfbf7`, `#f0f4f8`, `#ffffff`)
- Dark Background Basis: `#000000`
- Panel Light (Liquid Glass): `bg-white/80` + `backdrop-blur-xl`
- Panel Dark: `#0a0a0a` bis `#111`
- Border Light: `border-black/5`, `border-black/10`, selten `border-white/60` für Glass-Panels
- Border Dark: `border-white/5`, `border-white/10`
- Accent: `#00cc7d` (light), `#00ff9d` (dark)
- Text Primary: `#000000` / `#ffffff`
- Text Muted: `text-black/50`, `text-white/50` (und feiner)

### 3) Typografie-System

Aus `index.html`, `src/index.css`, `TypographySection.tsx`, `PostDetail.tsx`:

- Sans: Inter (`font-sans`) für UI, Buttons, Body.
- Serif: Playfair Display (`font-serif italic font-light`) für H1/H2/H3 und Showcase-Wörter.
- Mono: JetBrains Mono (`font-mono`) für Daten, Zahlen, technische Werte.

Editorial-Pattern:

- Hero-H1: Sans als Basis, einzelne Schlüsselwörter Serif+Italic.
- Artikel-H1/H2/H3: immer Serif + Italic + Light.
- Body: `font-light`, `leading-relaxed`.

### 4) Radius-, Spacing-, Shadow-System

Abgeleitete Baseline:

- Section-Container: `rounded-3xl`, `p-8` (mobil `p-4` bis `p-6`).
- Card-Container: `rounded-3xl`, `p-6` oder `p-8`.
- Dialog-Innenlayer: meist `rounded-2xl`.
- Controls: `rounded-full` (Buttons/Inputs), sekundär `rounded-xl`.
- Shadow Light: `shadow-xl shadow-black/[0.04]` oder `shadow-sm`.
- Shadow Dark: häufig `shadow-none`.

### 5) Border-Regeln (kritisch)

Borders sind immer subtil. Keine leuchtenden Primärfarben auf Border-Linien.

Dark erlaubte Muster:

- Ruhe: `border-white/5`, `border-white/10`
- Hover: `hover:border-white/10`, max. `white/20`
- Aktiv/Fokus: `border-white/20` bis `white/25`

Light erlaubte Muster:

- Ruhe: `border-black/5`, `border-black/10`, alternativ sehr helle neutrale Grautöne
- Hover: `hover:border-black/20`
- Aktiv/Fokus: `border-black/20` bis `black/30`

Verboten als Standard-Border:

- `border-primary-500`, `border-green-400`, `border-blue-500` auf neutralen UI-Flächen

### 6) Bewegungsprinzipien

Aus `Home.tsx`, `ScrollReveal.tsx`, `MagneticButton.tsx`, `Selector.tsx`:

- Hero lädt mit eigener GSAP Timeline (Badge -> Title -> Description -> Actions).
- Non-Hero-Sektionen nutzen GSAP ScrollReveal (`fromTo`, Y-Offset + Opacity).
- Primäre CTA kann Magnetic-Effekt nutzen (dezent).
- Dropdowns/Selector-Listen: Framer Motion Enter/Exit.

---

## Komponenten-Blueprints (wiederverwendbar)

## 1) Navigation Shell

- Floating Header-Pille, `rounded-full`, `backdrop-blur-xl`.
- Border sehr subtil (`black/10` oder `white/10`).
- Kleine Uppercase-Navigation mit breitem Tracking.

## 2) Hero

- Große Headline mit gemischter Serif-Betonung.
- Kompakte, klare CTA-Zeile (Primary + Secondary).
- Dezentes Grid/Texture-Overlay im Hintergrund.

## 3) Cards & Panels

- Light: `bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-black/[0.04] rounded-3xl`.
- Dark: `bg-[#0a0a0a] border border-white/5 shadow-none rounded-3xl`.
- Hover nur leicht (`hover:border-black/10` oder `hover:border-white/10`).

## 4) Buttons

- Primary: Vollfläche, hoher Kontrast, rund.
- Secondary: Outline/Ghost mit subtiler Hover-Fläche.
- Ghost: nur Textfarbe + leichte Hover-Hinterlegung.
- Destructive: rot, aber gezielt nur bei destruktiven Aktionen.

## 5) Inputs & Controls

- Inputs und Suchfelder: `rounded-full`.
- Selector-Komponente als eigener Primitive-Baustein statt native Select.
- Fokus über Ring + subtile Border-Verstärkung, nicht über harte Farben.

## 6) Overlays (Popover, Dropdown, Dialog, Toast)

- Popover/Dropdown: `rounded-2xl`, leicht blur, feine Border.
- Dialog: starker Fokus auf klaren Header, Content, Footer.
- Toasts: Icon-Kreis + kurzer Titel + kurzer Erklärungstext.

## 7) Sidebar / File-System

- Mehrstufige Datei- und Ordnerstrukturen mit sanften Hover-Zuständen.
- Einfache, klar erkennbare aktive Zeile.
- Toolbar-Icons als dezente Utility-Aktionen.

## 8) Chat-Interface

- Zwei-Layer Architektur: Session-Historie + Chat-Content.
- Chat-Bubbles mit klarer Nutzer-/Assistent-Differenz.
- Eingabebox als ruhiger, leicht erhobener Container.

## 9) Tabellen

- Header sehr klein, Uppercase, breite Laufweite.
- Zeilen-Hover minimal (`hover:bg-black/[0.02]` / `white/[0.02]`).
- Datenwerte (Zahlen) in Mono.

## 10) Empty States

- Große, ruhige Center-Box mit `border-dashed`.
- Primäre Aktion als klarer, runder Button.

---

## Globaler Tailwind-Contract (empfohlen)

Für neue Frontend-Bereiche zuerst diese Utility-Bausteine sicherstellen:

- `font-sans`, `font-serif`, `font-mono` korrekt gemappt
- `bg-grid-light`, `bg-grid-dark` (falls Grid-Hintergrund nötig)
- `--bg-light` als Light-Hintergrund-Variable
- `dark`-Variante auf Root robust

Wenn ein Pattern bereits in vorhandenen Primitives existiert, erweitern statt neu bauen.

---

## LocalBench als Component Library (Strategie für alle Apps)

LocalBench ist unser Referenz-Designsystem, nicht nur ein einzelnes Mock.

Übertragungsregel:

1. Verhalten und Struktur übernehmen (Primitives + Patterns).
2. Tokens zentralisieren (Farben, Radius, Spacing, Typografie).
3. App-spezifische Inhalte einsetzen, aber Visualsprache konstant halten.

Empfohlene Primitive-Bibliothek:

- `Selector`-Pattern
- `Card`-Pattern (Liquid Glass + Dark Flat)
- `Dialog`/`Popover`/`Toast`-Pattern
- `Sidebar`/`FileSystem`-Pattern
- `Chat`-Shell-Pattern

---

## Verknüpfung mit Minimal-Weiß Designsystem

## Grundprinzip

LocalBench liefert die Struktur- und Komponentenlogik.
Minimal-Weiß liefert den reduzierten Theme-Layer für farbarme, ruhige Screens.

## 3-Layer Modell

1. Layer A: Struktur
- Komponentenaufbau, Hierarchie, Spacing-Rhythmus, Motion.

2. Layer B: Design-Tokens
- Hintergrund, Surface, Text, Border, Radius, Shadow.

3. Layer C: Theme-Variante
- `default`, `warm`, `ocean`, `minimal-weiss`, etc.

## Minimal-Weiß Regeln

- Accent stark reduzieren; nur bei Status/Erfolg gezielt sichtbar.
- Headings weiterhin Serif/Italic/Light.
- Buttons neutralisieren (weiße/helle Flächen, reduzierte Farbsättigung).
- Borders noch subtiler halten.
- Card-Kontrast moderat, kein harter Kantenbruch.

## Token-Mapping für Minimal-Weiß

- Background: hell-neutral (`#ffffff` bis `#fafafa`)
- Surface: nahezu weiß mit feiner Kante
- Primary Text: sehr dunkel
- Muted Text: mittlere Graustufe
- Border: `black/5` bis `black/10`
- Shadow: leicht, weich, nur wenn notwendig

---

## Pflicht-Audit vor Abschluss einer Frontend-Phase

1. Mock-/Referenztreue
- Sieht die Sektion wie LocalBench-inspiriert aus und nicht wie generisches Template?

2. Border-Audit
- Alle Borders muted?
- Leuchtende Border-Farben entfernt?

3. Typografie-Audit
- Serif/Italic/Light für Headlines korrekt?
- Mono für Zahlen/technische Werte?

4. Component-Reuse-Audit
- Vorhandene Primitive erweitert statt Duplikat gebaut?

5. Motion-Audit
- Hero GSAP Timeline vorhanden?
- Non-Hero ScrollReveal korrekt?

6. Responsive-Audit
- 375px und Desktop geprüft?
- Keine überlaufenden Headings, keine abgeschnittenen Overlays?

---

## Anti-Patterns (vermeiden)

- Zufällige Farbauswahl ohne Tokenbezug
- Leuchtende Border-Linien auf Standard-Flächen
- Zu viele verschiedene Radius-Werte ohne System
- Unruhige, harte Schatten im Dark Mode
- Standard-Inter überall ohne Serif/Mono-Kontrast
- Neue „One-Off“-Komponenten statt bestehende Primitives zu nutzen

---

## Kurz-Checkliste für neue UI-Aufgaben

- [ ] LocalBench-Muster identifiziert (welcher Block wird adaptiert?)
- [ ] Tokens aus dieser Datei übernommen
- [ ] Minimal-Weiß-Regeln berücksichtigt (falls Theme relevant)
- [ ] Borders muted, Spacing kompakt, Typografie klar
- [ ] Bestehende Primitives genutzt/erweitert
- [ ] Mobile + Dark/Light geprüft

---

## Quellenbasis

- `D:\CODING\React Projects\localbench-component-library\DESIGN_SYSTEM.md`
- `D:\CODING\React Projects\localbench-component-library\src\index.css`
- `D:\CODING\React Projects\localbench-component-library\src\pages\DesignSystem.tsx`
- `D:\CODING\React Projects\localbench-component-library\src\components\design-system\*.tsx`
- `D:\CODING\React Projects\localbench-component-library\src\components\Selector.tsx`
- `D:\CODING\React Projects\localbench-component-library\src\components\FileSystem.tsx`
- `D:\CODING\React Projects\localbench-component-library\src\components\ChatInterface.tsx`
- Legacy-Alias (alt): `D:\CODING\React Projects\localbench\...`
