# LocalBench Component Library Playbook

## Ziel

Dieses Dokument beschreibt, wie wir `localbench-component-library` als wiederverwendbares System fÃ¼r mehrere Apps einsetzen.

Scope:

- Bestehende Komponenten wiederverwenden.
- ZukÃ¼nftige Komponenten im gleichen Stil erzeugen.
- Bestehende Apps schrittweise auf LocalBench-Stil migrieren.

Wichtige Referenz:

- `D:\CODING\React Projects\localbench-component-library`

---

## Ist-Stand (ehrlich)

`localbench-component-library` ist aktuell technisch noch eine **App**, kein publishbares UI-Paket:

- `package.json` ist `private: true`
- keine Library-Entry-Exports (`index.ts` fÃ¼r Komponenten fehlt)
- keine Build-Pipeline fÃ¼r Component Distribution (z. B. `tsup`/Vite Library Mode)
- Komponenten leben direkt neben Seiten und Content

Das ist okay fÃ¼r Startphase, aber fÃ¼r Multi-App-Reuse brauchen wir eine klare Strategie.

---

## Komponenten-Klassen (fÃ¼r Reuse)

## Klasse A: Direkt wiederverwendbare Primitives

Beispiele:

- `Selector.tsx`
- `FileSystem.tsx` (FSSidebar, FSFolder, FSFile usw.)
- `ChatInterface.tsx` (ChatSidebar, ChatHistory, ChatArea)
- `ThemeProvider.tsx`
- `ScrollReveal.tsx`
- `MagneticButton.tsx`
- `NoiseOverlay.tsx`
- `EmptyPlaceholder.tsx`
- `CodeBlock.tsx`

Diese Bausteine sind die erste Reuse-PrioritÃ¤t.

## Klasse B: Pattern-/Beispielkomponenten

Beispiele:

- `src/components/design-system/*Section.tsx`

Diese sind primÃ¤r Showcase und als Pattern-Referenz gedacht, nicht als direkte App-Imports.

## Klasse C: App-gekoppelte Seiten

Beispiele:

- `src/pages/*`
- `Layout.tsx` (Routing-/App-Kontext)

Diese sollten nicht 1:1 in fremde Apps Ã¼bernommen werden.

---

## Reuse-Modelle (Entscheidungsmatrix)

## Modell 1: Copy & Adapt (schnell)

Vorgehen:

- Komponente in Zielprojekt kopieren.
- Imports/Tokens/Theme-Adapter anpassen.

Vorteile:

- sofort nutzbar
- kein Infrastrukturaufbau

Nachteile:

- Forks driften auseinander
- spÃ¤tere Updates teuer

Einsatz:

- Einzelkomponenten, Prototyp, schnelle Modernisierung.

## Modell 2: Shared Workspace Package (empfohlen mittelfristig)

Vorgehen:

- `packages/localbench-ui` anlegen.
- Primitives dort bÃ¼ndeln, mit `index.ts` exportieren.
- in Apps als Workspace-Dependency nutzen.

Vorteile:

- zentrale Wartung
- saubere Versionierung
- gute Skalierung Ã¼ber mehrere Apps

Nachteile:

- initialer Setup-Aufwand

Einsatz:

- Standardweg fÃ¼r produktive Reuse-Strategie.

## Modell 3: Generator/Install Script (empfohlen ergÃ¤nzend)

Vorgehen:

- Komponenten werden per Script in Zielprojekt â€žeingespieltâ€œ (shadcn-Ã¤hnlich).
- Script kann Tokens, Imports und optionale Adapter mit erzeugen.

Vorteile:

- reproduzierbar
- schnell fÃ¼r neue Apps
- Team-weit einheitlich

Nachteile:

- benÃ¶tigt gutes Template-/Script-Design

Einsatz:

- Onboarding neuer Projekte, Massenmigration.

---

## Empfohlene Stufenstrategie

1. Jetzt: Modell 1 + klare Regeln (nicht wild kopieren).
2. NÃ¤chster Ausbau: Modell 2 (echtes `localbench-ui` Package).
3. Danach: Modell 3 (Install/Generate Script als Turbo).

---

## Ist-Stand Privat-Setup (2026-04-01)

Der Schritt zu Modell 2 wurde als private Variante bereits umgesetzt:

1. Paketpfad:
- `D:\CODING\React Projects\localbench-component-library\packages\localbench-ui`

2. Paketname:
- `@localbench/ui`

3. Aktuelle Exports:
- `LocalbenchButton`
- `LocalbenchBadge`

4. NoteDrill-Anbindung:
- Dependency in `package.json`:
  - `"@localbench/ui": "file:../../localbench-component-library/packages/localbench-ui"`
- Next-Konfiguration:
  - `transpilePackages: ['@localbench/ui']` in `next.config.js`
- API-stabile Wrapper:
  - `components/design-system/design-button.tsx`
  - `components/design-system/design-badge.tsx`

5. Warum diese Variante aktuell die beste private Loesung ist:
- keine oeffentliche Registry noetig
- zentrale Pflege in einem Ort
- bestehende App-Aufrufer bleiben stabil (Wrapper-Layer)

---
## Beste Moeglichkeit fuer NoteDrill (konkret)

Kurzantwort: Ja, wir koennen LocalBench sauber einbauen und sollten es ueber einen
Token-first + Primitive-first Ansatz tun, nicht ueber einen Big-Bang-Redesign.

Empfohlene Reihenfolge:

1. `app/styles/core-theme-tokens.css` als visuelle SSOT stabilisieren.
2. `components/ui/*` auf denselben Radius/Border/Surface-Vertrag bringen.
3. Feature-Flaechen in Wellen migrieren:
- Welle A: Sidebar + File-System
- Welle B: Chat/Agentic
- Welle C: Dashboard + Formular-Dialoge
4. Danach Reuse-Haertung:
- Klasse-A-Komponenten aus `localbench-component-library` entkoppeln
- in `localbench-ui` exportieren
- optional Generator (`localbench:add`) bereitstellen

Warum das der beste Weg ist:

- geringes Regressionsrisiko
- schnelle sichtbare Qualitaetsgewinne
- gleichzeitig saubere Basis fuer Multi-App-Reuse

---

## Pilot-Flows mit `/admin/design`

`/admin/design` ist der ideale Pilotbereich fuer den Rollout.

Pflicht fuer den Pilot:

1. Jede neue Design-Variante zuerst dort als Showcase-Block umsetzen.
2. Nur freigegebene Design-Primitives verwenden (`components/design-system/*` oder `components/ui/*`).
3. Danach exakt denselben Block in ein produktives Feature uebernehmen.

Damit wird `/admin/design` zur "sicheren Werkbank", bevor produktive Screens geaendert werden.

---

## Namenskonvention fuer die Referenz-Library

Wenn im Team von der Basis gesprochen wird:

- PrimÃ¤rname: `localbench-component-library`
- Erlaubter Alias in Doku/Prompts: `Component LocalBench Component Library`

Beide Begriffe meinen dieselbe Referenzquelle:
- `D:\CODING\React Projects\localbench-component-library`

---

## Migrations-Playbook fÃ¼r bestehende Apps

## Phase 1: UI-Inventur

- Komponenten clustern: Buttons, Cards, Inputs, Overlays, Sidebar, Chat.
- Pro Cluster Abweichungen zu LocalBench festhalten.

## Phase 2: Token-Angleichung

- Farben, Radius, Border, Shadow auf LocalBench-Vertrag bringen.
- Erst Tokens stabilisieren, dann Komponenten anfassen.

## Phase 3: Primitive-Migration

- Erst Klasse-A-Primitives austauschen/angleichen.
- Danach Overlays und komplexe Container.

## Phase 4: Feature-BlÃ¶cke

- Sidebar, Chat, Dashboard, Tabellen.
- Immer mit Screenshot-Vergleich vorher/nachher.

## Phase 5: Minimal-WeiÃŸ Layer

- Struktur bleibt LocalBench, Farben werden minimalisiert.
- Accent nur gezielt/semantisch.

## Phase 6: QA + Regression

- Light/Dark/Minimal-WeiÃŸ Matrix.
- Mobile/Desktop.
- Fokus-/Hover-/Active-States.

---

## Adapter-Regeln (damit Komponenten wirklich portabel sind)

1. Routing:
- Keine harten `react-router`-AbhÃ¤ngigkeiten in reinen UI-Primitives.
- Navigation via Callback/Adapter.

2. Theme:
- Theme Ã¼ber CSS-Variablen + optionalen ThemeProvider-Adapter.

3. Daten:
- Keine direkte `import.meta.glob`-Kopplung in UI-Komponenten.
- Daten immer als Props.

4. Texte:
- Keine fest verdrahteten Strings in Primitives.
- Texte per Props/Slots, damit Deutsch/Mehrsprachigkeit sauber bleibt.

---

## Install-Script Leitlinie

Ein Install-Script soll mindestens:

1. Zielpfade prÃ¼fen/anlegen (`components/ui/localbench/*`).
2. benÃ¶tigte Dependencies prÃ¼fen (GSAP, Framer Motion, Lucide, Tailwind Merge).
3. Komponenten + benÃ¶tigte Utilities kopieren.
4. fehlende CSS-Tokens/Font-Hinweise ausgeben oder patchen.
5. optional Adapter-Dateien erzeugen (`theme-adapter.ts`, `motion-config.ts`).

---

## HÃ¤ufige Stolperfallen

- `custom-scrollbar`/`scrollbar-hide` Klassen sind nicht Ã¼berall vordefiniert.
- `useTheme()` wird genutzt, aber Host-App hat anderen Theme-Store.
- Komponente erwartet Tailwind Utilities, die im Host fehlen.
- Z-Index-/Overflow-Konflikte bei Overlays.
- Hardcoded Farbwerte kollidieren mit Host-Theme.

Details und vollstÃ¤ndige Liste:

- `docs/design/tasks/2026-04-01-localbench-component-library-adoption/EDGE-CASE-KATALOG.md`

---

## Prompt-Verwendung

FÃ¼r konkrete KI-Eingaben nutze:

- [localbench-component-library-prompts.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/shared-docs/agents/shared-docs/localbench-component-library-prompts.md)

---

## VerknÃ¼pfte Referenzen

- [modernize-frontend.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/shared-docs/agents/shared-docs/modernize-frontend.md)
- [MASTER-PLAN.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/docs/design/tasks/2026-04-01-localbench-component-library-adoption/MASTER-PLAN.md)
- [ADMIN-DESIGN-TO-LOCALBENCH-PLAN.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/docs/design/tasks/2026-04-01-localbench-component-library-adoption/ADMIN-DESIGN-TO-LOCALBENCH-PLAN.md)
