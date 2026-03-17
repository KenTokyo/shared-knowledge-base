# Headless und eigene Oberfläche

## Wann laden

Lade diese Datei, wenn fertige OpenUI-Layouts nicht reichen und eine eigene Chat-Oberfläche gebaut werden soll.

## Wichtige Seiten

- Einstieg in Headless:
  `../../openui-docs/headless-introduction-page-introduces-verlauf-20260312-6yys-history.md`
- Wichtige Hooks und Zustand:
  `../../openui-docs/hooks-state-all-headless-verlauf-20260312-7119-history.md`
- Komplettes Beispiel für eigene Oberfläche:
  `../../openui-docs/custom-guide-shows-complete-verlauf-20260312-7508-history.md`
- Nur einzelne Bauteile austauschen:
  `../../openui-docs/custom-chat-components-can-verlauf-20260312-6tzy-history.md`

## Kurz-Regeln

- `ChatProvider` ist die Mitte. Ohne ihn funktionieren die Hooks nicht.
- `useThread()` ist für die aktuelle Unterhaltung.
- `useThreadList()` ist für Seitenleiste, Auswahl und neue Threads.
- Wenn nur der Composer oder eine Nachrichtblase anders aussehen soll, reicht oft ein Override der fertigen Layouts.
- Wenn die ganze Anordnung neu gebaut wird, nimm Headless statt halbe Umbauten an `FullScreen`.

## Achtung

- Eigene `assistantMessage`-Komponenten müssen strukturierte Inhalte selbst rendern, wenn GenUI genutzt wird.
- Eigene Composer sollten sowohl laufendes Streaming als auch Ladezustände beachten.
