# React, UI und Daten — On-demand-Coding-Regeln

**Lesen bei:** React/Next.js, UI, HUD, Dialogen, Browser-/Capacitor-Frontend oder DB-Fachlogik.  
**Ergänzende Owner:** `shared-docs/react-core-communication-patterns.md`,
`shared-docs/refactoring-docs/rules/react-rules.md`, `shared-docs/refactoring-docs/rules/css-rules.md`.

## Fachliche Ownership

- Eine eigenständige UI, ein fachliches Datenziel oder ein Service-Use-Case erhält eine eigene sprechende
  Datei. Aggregatoren importieren und exportieren nur.
- Service/Helper/Finder/Action bleibt in der Sektion, die ihn fachlich nutzt. `lib/` nur bei echter Nutzung
  durch mindestens zwei Sektionen.
- Globale Module importieren keine Sektionsmodule.
- DB-Technologie am Pfad zeigen. Finder lesen, Actions schreiben; Read-only-Code importiert keine Actions.
- Shared nur für echte neutrale Wiederverwendung, nie als Ablage für versteckte Fachlogik.

## React-State und Render-Sicherheit

- Keine Komponente innerhalb einer Komponente definieren.
- Kein `setState`, `dispatch` oder Context-Write im Renderpfad.
- Keine Setter in Setter-Updatern verschachteln.
- Zustand immutable aktualisieren; No-op-Actions geben den alten State zurück.
- Ableitbare Werte direkt berechnen statt sie über einen Effekt in Parent- oder Spiegelstate zurückzuschreiben.
- Write-back-Effekte deduplizieren; Timer, Listener und Subscriptions immer aufräumen.
- Deterministische Normalisierung: keine `Date.now()`-Fallbacks in Merge-/Normalizer-Pfaden.
- Custom Events und Store-Writes semantisch deduplizieren.
- Stabiler `key` für Listen; teure Berechnungen gezielt memoizen, nicht pauschal.
- Stale Closure vermeiden: neuen Wert im Updater berechnen und genau diesen an Callbacks weiterreichen.

`Maximum update depth exceeded`, `Too many re-renders`, `Cannot update while rendering`,
`validateDOMNesting` und Hydration-Warnungen sind Root-Cause-Stoppsignale, keine Meldungen zum Unterdrücken.

## Controlled Values und Trigger

- `Tabs`, `Select`, `Popover` und andere kontrollierte Werte gegen eine Laufzeit-Allowlist prüfen.
- Eventwerte nicht blind mit `as MyType` casten.
- Interaktive Elemente nie verschachteln.
- Radix/Shadcn `asChild` nur mit garantiert ref-stabilem Child; sonst direkten Trigger oder stabilen
  `<span>`-Wrapper nutzen.
- Dialog nie direkt aus noch modal offenem Dropdown/Popover/ContextMenu öffnen. Erst Quelle schließen oder
  bewusst non-modal halten.
- Nach schnellem Patch Dateiende auf duplizierte JSX-/Abschlussreste prüfen.

## UI-Vertrag

- Vor Änderungen `DESIGN.md`, Theme-Tokens und vorhandene Komponenten prüfen.
- Solide Surface-Farben für Dialoge/Overlays; kein halbtransparenter Hauptuntergrund und kein grundloser
  starker Blur bei dichter Schrift.
- Mobile-first, kompakt und icon-first. Icon-Buttons brauchen `aria-label` und Tooltip.
- Disabled Controls erklären den Grund. Ressourcenblocker zeigen Bedarf und aktuellen Wert.
- Portal-, Overflow- und Stacking-Ursache prüfen, nicht nur `z-index` erhöhen.
- Wechselnde Panelinhalte erhalten stabile Rahmenhöhe und internen Scroll statt Layoutsprung.
- Design-System-Variants und Hausmuster erweitern, keine lokalen Parallelhüllen erfinden.
- Sichtbare Qualität folgt dem gesonderten Browser-/Visual-Vertrag; ohne aktuelle Freigabe bleibt sie
  manuelles Gate.

## Daten- und Laufzeitperformance

- Unabhängige Fetches parallelisieren; N+1 durch Batch/JOIN/`inArray` vermeiden.
- Nie eine live iterierte `Map`, `Set` oder Liste im selben Iterator erweitern. Snapshot/Queue/Visited-Set mit
  hartem Limit nutzen.
- Keine per-frame React-State-, Mesh-, Material- oder Array-Neuanlage in Echtzeitpfaden.
- Bei Three.js/R3F zusätzlich `shared-docs/THREEJS-RULES.md`; bei Multiplayer/State-Sync zusätzlich
  `shared-docs/COLYSEUS-RULES.md`.
