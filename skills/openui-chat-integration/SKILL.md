---
name: openui-chat-integration
description: Use when building, debugging, or refactoring OpenUI chat in React or Next.js. Trigger on requests mentioning OpenUI, @openuidev, FullScreen, Copilot, BottomTray, ChatProvider, useThread, defineComponent, createLibrary, Renderer, OpenUI Lang, system prompt generation, openAIAdapter, openAIReadableStreamAdapter, thread history, or custom OpenUI chat UI.
---

# OpenUI Chat Integration

Nutze diesen Skill, wenn eine React- oder Next.js-App mit OpenUI verbunden, erweitert oder repariert werden soll.

## Schnell wählen

Lade nicht alles auf einmal. Nimm nur die Datei, die zur Aufgabe passt.

- Installation, fertige Layouts und schneller Start: `references/01-setup-und-layouts.md`
- Backend, Stream-Format und Provider-Wahl: `references/02-backend-und-provider.md`
- Eigene Chat-Oberfläche mit Hooks: `references/03-headless-und-custom-ui.md`
- GenUI, OpenUI Lang, Renderer und eigene Komponenten: `references/04-genui-lang-und-renderer.md`
- Next.js-App-Router mit Route Handler: `references/05-nextjs-muster.md`
- Wenn du nur den passenden Doku-Namen suchst: `references/00-openui-doc-map.md`

## Arbeitsablauf

1. Kläre zuerst, ob die App fertige OpenUI-Layouts nutzt oder eine eigene Oberfläche baut.
2. Kläre danach, wie das Backend streamt. Davon hängen `streamProtocol` und oft auch `messageFormat` ab.
3. Falls strukturierte UI aus der KI kommen soll, lade auch GenUI, Renderer und System-Prompt-Doku.
4. Öffne nur die Doku-Dateien, die zum aktuellen Weg passen.
5. Nutze bei unklaren Dateinamen `rg --files shared-docs/openui-docs | rg "<suchwort>"`.

## Wichtige Regeln

- Verwechsle nicht Layout-Auswahl und Backend-Anbindung. Das sind zwei getrennte Dinge.
- Setze `messageFormat` nur dann, wenn Anfrage oder gespeicherte Nachrichten wirklich ein anderes Format haben.
- Setze `streamProtocol` nach echtem Antwort-Stream, nicht nach Anbietername.
- Für GenUI reichen Frontend-Komponenten allein nicht. Die App braucht auch den erzeugten System-Prompt auf dem Server.
- Wenn du `assistantMessage`, `userMessage` oder `composer` überschreibst, bist du selbst für das richtige Verhalten verantwortlich.
- Bei Headless gilt: Hooks nur innerhalb von `ChatProvider` verwenden.

## Häufige Aufgaben

- "Baue OpenUI in eine Next.js-App ein."
- "Verbinde OpenUI mit OpenAI oder einem OpenAI-kompatiblen Backend."
- "Baue statt FullScreen lieber eine eigene Chat-Seite mit `ChatProvider`."
- "Warum rendert der Renderer keine Komponenten?"
- "Welche OpenUI-Datei brauche ich für Thread-Verlauf oder Custom Composer?"

## Quellen im Projekt

Die eigentlichen OpenUI-Dokus liegen in `shared-docs/openui-docs/`.
Die Referenz-Dateien in diesem Skill zeigen nur den schnellen Weg zu den passenden Dateien.
