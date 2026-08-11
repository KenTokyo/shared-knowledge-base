# Frontend, React und UI — Fachregeln

**Lesen wenn:** Der Auftrag React, State, Hydration, Browser-UI, Interaktion oder Frontend-Performance ändert.
**Geltung:** Ergänzt [`CODING-RULES.md`](CODING-RULES.md); dessen User-, Plan-, Prüf- und Git-Gates bleiben vorrangig.

## Komponenten und State

- State unveränderlich aktualisieren; stabile eindeutige Keys nutzen.
- `useState` für renderrelevante Daten, `useRef` für veränderliche Laufzeitdaten ohne Renderbedarf nutzen.
- `useMemo`, `useCallback` und `React.memo` nur bei belegtem Nutzen einsetzen.
- Timer, Listener und Subscriptions immer aufräumen.
- Abgeleitete Werte direkt im Render berechnen; Event-Handler oder echte Store-Subscriptions statt unnötiger Effect-Ketten nutzen.
- Nie eine React-Komponente in einer anderen Komponente definieren; sonst entsteht je Render ein neuer Typ und State kann verloren gehen.
- Props gehen nach unten, Callbacks nach oben. Bei tief geteiltem State vorhandenen Store statt Prop-Ketten oder Parallel-Stores nutzen.

## Render und Hydration

- Im Render nie State, Store oder Context setzen; Setter nicht in anderen Setter-Updates verschachteln.
- Zielwerte zuerst berechnen, Updates danach getrennt ausführen.
- Parent-State nicht per Effect reparieren; sicheren Wert ableiten und direkt anzeigen.
- Interaktive Elemente nicht verschachteln. Klickbare Wrapper brauchen passende HTML-Semantik und Tastatursteuerung.
- Semantisch gleiche Daten nicht erneut schreiben. Store-Actions geben bei No-op den alten State zurück.
- Normalizer nutzen stabile Defaults, nie `Date.now()` als Ersatzwert.
- Daten aus der echten Quelle nur in eine Richtung synchronisieren; Events und Snapshots semantisch deduplizieren.

Diese Warnungen stoppen die Lieferung, bis ihre erste eigene Ursache behoben ist:

- `Maximum update depth exceeded`
- `Too many re-renders`
- `Cannot update while rendering`
- `validateDOMNesting`
- Hydration-Warnung

## Kontrollierte Werte und schnelle Edits

- Tabs, Selects und Modi per Allowlist prüfen; ungültige Werte auf sicheren Default setzen.
- Event-Werte nie blind mit `as MyType` casten; State nur bei echter Änderung setzen.
- Nach schnellen Edits Imports, Dateiende, Klammern und doppelte JSX-Reste prüfen.
- Radix-/Shadcn-`asChild` braucht ein ref-stabiles Child; bewegte oder bedingte Children in stabilen Wrapper setzen.
- Dynamische Texte über sichere DOM-/Framework-APIs einsetzen, nicht per ungeprüftem HTML.

## Frontend-Performance

- Unabhängige Fetches parallel starten; N+1-Abfragen durch Batch-Loading oder passende Joins vermeiden.
- Teure Arbeit passend teilen, poolen, cachen oder vorab bauen.
- Memoisierung nicht vorsorglich verteilen; erst stabile Identität oder messbare Renderkosten belegen.
- Zusätzliche Layer gegen Framezeit, Speicher, Update-Kosten und Pflegeaufwand abwägen.
- Live-Collections nie im selben Iterator erweitern; Queue/Snapshot + `visited`-Set + festes Sicherheitslimit nutzen.
- Performance darf Kernfunktion, Lesbarkeit, Bedienbarkeit oder belegte Qualität nicht still verschlechtern.

## UI und Interaktion

- Erst Designsystem, Theme-Werte, globale Styles, Portal, Overflow und Stacking Context prüfen.
- Mobile-first und platzsparend bauen; wichtigste Aktion sichtbar halten, seltene Optionen in Tooltip, Popover oder Collapsible legen.
- Dichte Toolbars nutzen klare Icons. Jeder Icon-Button braucht `aria-label`, Tooltip und eindeutige Bedeutung.
- Deaktivierte Controls erklären den Grund; Ressourcenblocker nennen Bedarf und aktuellen Wert.
- Dialoge brauchen eine klare, solide Fläche. Starke Transparenz oder Blur nicht als unlesbare Hauptfläche nutzen.
- Dialog nicht direkt aus offenem modalem Menü starten; Menü zuerst schließen oder bewusst non-modal bauen.
- Hängendes `body.style.pointerEvents = "none"` nicht per globalem CSS verstecken.
- Layer-Probleme über Portal, Overflow und Stacking Context lösen, nicht nur über höheren `z-index`.
- Panels mit wechselndem Inhalt erhalten stabile Höhe und internes Scrollen.
- Vorhandene Größen und Varianten nutzen; keine zufälligen lokalen Abweichungen.
- „Juicy“ heißt klare Gruppierung, Form, passender Rand/Glow und kurze Transform-/Opacity-Reaktion — nicht mehr Text, Karten oder Deko-Icons.

## Prüfung

- Browser-, DOM-, Screenshot- und UI-Prüfungen folgen ausschließlich dem Freigabegate in [`CODING-RULES.md`](CODING-RULES.md).
- Statische Checks beweisen Typ- und Buildsicherheit, nicht Lesbarkeit, Bedienbarkeit oder visuelle Qualität.
