# LocalBench Component Library Playbook

## Ziel

Dieses Dokument beschreibt, wie wir `localbench-component-library` als wiederverwendbares System für mehrere Apps einsetzen.

Scope:

- Bestehende Komponenten wiederverwenden.
- Zukünftige Komponenten im gleichen Stil erzeugen.
- Bestehende Apps schrittweise auf LocalBench-Stil migrieren.

Wichtige Referenz:

- `D:\CODING\React Projects\localbench-component-library`

---

## Ist-Stand (ehrlich)

`localbench-component-library` ist aktuell technisch noch eine **App**, kein publishbares UI-Paket:

- `package.json` ist `private: true`
- keine Library-Entry-Exports (`index.ts` für Komponenten fehlt)
- keine Build-Pipeline für Component Distribution (z. B. `tsup`/Vite Library Mode)
- Komponenten leben direkt neben Seiten und Content

Das ist okay für Startphase, aber für Multi-App-Reuse brauchen wir eine klare Strategie.

---

## Komponenten-Klassen (für Reuse)

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

Diese Bausteine sind die erste Reuse-Priorität.

## Klasse B: Pattern-/Beispielkomponenten

Beispiele:

- `src/components/design-system/*Section.tsx`

Diese sind primär Showcase und als Pattern-Referenz gedacht, nicht als direkte App-Imports.

## Klasse C: App-gekoppelte Seiten

Beispiele:

- `src/pages/*`
- `Layout.tsx` (Routing-/App-Kontext)

Diese sollten nicht 1:1 in fremde Apps übernommen werden.

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
- spätere Updates teuer

Einsatz:

- Einzelkomponenten, Prototyp, schnelle Modernisierung.

## Modell 2: Shared Workspace Package (empfohlen mittelfristig)

Vorgehen:

- `packages/localbench-ui` anlegen.
- Primitives dort bündeln, mit `index.ts` exportieren.
- in Apps als Workspace-Dependency nutzen.

Vorteile:

- zentrale Wartung
- saubere Versionierung
- gute Skalierung über mehrere Apps

Nachteile:

- initialer Setup-Aufwand

Einsatz:

- Standardweg für produktive Reuse-Strategie.

## Modell 3: Generator/Install Script (empfohlen ergänzend)

Vorgehen:

- Komponenten werden per Script in Zielprojekt „eingespielt“ (shadcn-ähnlich).
- Script kann Tokens, Imports und optionale Adapter mit erzeugen.

Vorteile:

- reproduzierbar
- schnell für neue Apps
- Team-weit einheitlich

Nachteile:

- benötigt gutes Template-/Script-Design

Einsatz:

- Onboarding neuer Projekte, Massenmigration.

---

## Empfohlene Stufenstrategie

1. Jetzt: Modell 1 + klare Regeln (nicht wild kopieren).
2. Nächster Ausbau: Modell 2 (echtes `localbench-ui` Package).
3. Danach: Modell 3 (Install/Generate Script als Turbo).

---

## Migrations-Playbook für bestehende Apps

## Phase 1: UI-Inventur

- Komponenten clustern: Buttons, Cards, Inputs, Overlays, Sidebar, Chat.
- Pro Cluster Abweichungen zu LocalBench festhalten.

## Phase 2: Token-Angleichung

- Farben, Radius, Border, Shadow auf LocalBench-Vertrag bringen.
- Erst Tokens stabilisieren, dann Komponenten anfassen.

## Phase 3: Primitive-Migration

- Erst Klasse-A-Primitives austauschen/angleichen.
- Danach Overlays und komplexe Container.

## Phase 4: Feature-Blöcke

- Sidebar, Chat, Dashboard, Tabellen.
- Immer mit Screenshot-Vergleich vorher/nachher.

## Phase 5: Minimal-Weiß Layer

- Struktur bleibt LocalBench, Farben werden minimalisiert.
- Accent nur gezielt/semantisch.

## Phase 6: QA + Regression

- Light/Dark/Minimal-Weiß Matrix.
- Mobile/Desktop.
- Fokus-/Hover-/Active-States.

---

## Adapter-Regeln (damit Komponenten wirklich portabel sind)

1. Routing:
- Keine harten `react-router`-Abhängigkeiten in reinen UI-Primitives.
- Navigation via Callback/Adapter.

2. Theme:
- Theme über CSS-Variablen + optionalen ThemeProvider-Adapter.

3. Daten:
- Keine direkte `import.meta.glob`-Kopplung in UI-Komponenten.
- Daten immer als Props.

4. Texte:
- Keine fest verdrahteten Strings in Primitives.
- Texte per Props/Slots, damit Deutsch/Mehrsprachigkeit sauber bleibt.

---

## Install-Script Leitlinie

Ein Install-Script soll mindestens:

1. Zielpfade prüfen/anlegen (`components/ui/localbench/*`).
2. benötigte Dependencies prüfen (GSAP, Framer Motion, Lucide, Tailwind Merge).
3. Komponenten + benötigte Utilities kopieren.
4. fehlende CSS-Tokens/Font-Hinweise ausgeben oder patchen.
5. optional Adapter-Dateien erzeugen (`theme-adapter.ts`, `motion-config.ts`).

---

## Häufige Stolperfallen

- `custom-scrollbar`/`scrollbar-hide` Klassen sind nicht überall vordefiniert.
- `useTheme()` wird genutzt, aber Host-App hat anderen Theme-Store.
- Komponente erwartet Tailwind Utilities, die im Host fehlen.
- Z-Index-/Overflow-Konflikte bei Overlays.
- Hardcoded Farbwerte kollidieren mit Host-Theme.

Details und vollständige Liste:

- `docs/design/tasks/2026-04-01-localbench-component-library-adoption/EDGE-CASE-KATALOG.md`

---

## Prompt-Verwendung

Für konkrete KI-Eingaben nutze:

- [localbench-component-library-prompts.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/shared-docs/agents/shared-docs/localbench-component-library-prompts.md)

---

## Verknüpfte Referenzen

- [modernize-frontend.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/shared-docs/agents/shared-docs/modernize-frontend.md)
- [MASTER-PLAN.md](/d:/CODING/React%20Projects/notedrill/notedrill-backend-nextjs/docs/design/tasks/2026-04-01-localbench-component-library-adoption/MASTER-PLAN.md)

