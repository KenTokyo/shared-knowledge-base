# Backend und Provider

## Wann laden

Lade diese Datei, wenn Nachrichten gesendet werden, Streams falsch ankommen oder Thread-Verlauf gespeichert werden soll.

## Erst diese Seiten lesen

- Grundidee zur Verbindung:
  `../../openui-docs/connecting-llm-every-chat-verlauf-20260312-6hka-history.md`
- Wahl von `streamProtocol` und `messageFormat`:
  `../../openui-docs/providers-choose-config-based-verlauf-20260312-7dbc-history.md`
- Genaue Anfrage- und Antwortform:
  `../../openui-docs/api-contract-openui-chat-verlauf-20260312-77kj-history.md`
- Verlauf und Thread-API:
  `../../openui-docs/connect-thread-history-page-verlauf-20260312-6k2y-history.md`

## Entscheidungsregeln

- Nutze `apiUrl`, wenn ein einfacher Endpunkt reicht.
- Nutze `processMessage`, wenn Header, Zusatzdaten oder eine andere Nachrichtform gebraucht werden.
- Nutze `openAIAdapter()` nur bei rohem SSE aus Chat Completions.
- Nutze `openAIReadableStreamAdapter()` bei `response.toReadableStream()`.
- Nutze `openAIResponsesAdapter()` für die Responses API.
- Setze `messageFormat` nur dann, wenn Anfrage oder gespeicherte Nachrichten nicht schon im OpenUI-Standard sind.

## Häufige Fehler

- Falscher Adapter bei richtigem Anbieter. Entscheidend ist das Stream-Format.
- Thread-API speichert ein anderes Nachrichtenformat als der Chat-Endpunkt.
- `threadApiUrl` wird gesetzt, aber die erwarteten Unterpfade fehlen.
