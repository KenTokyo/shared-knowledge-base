# Next.js-Muster

## Wann laden

Lade diese Datei, wenn eine Next.js-App-Router-App mit OpenUI verbunden werden soll.

## Hauptseite

`../../openui-docs/next-implementation-page-covers-verlauf-20260312-7aix-history.md`

## Dazu oft zusammen laden

- Paket-Setup:
  `../../openui-docs/installation-page-covers-package-verlauf-20260312-61qx-history.md`
- Backend-Verbindung:
  `../../openui-docs/connecting-llm-every-chat-verlauf-20260312-6hka-history.md`
- Provider-Wahl:
  `../../openui-docs/providers-choose-config-based-verlauf-20260312-7dbc-history.md`
- GenUI-System-Prompt:
  `../../openui-docs/system-prompts-library-prompt-verlauf-20260312-3r6h-history.md`

## Merkpunkte

- Bei `response.toReadableStream()` passt meist `openAIReadableStreamAdapter()`.
- Der erzeugte System-Prompt bleibt auf dem Server.
- `processMessage` ist oft klarer als `apiUrl`, wenn die Route ein anderes Format erwartet.
- Prüfe immer zusammen: Frontend-Format, Backend-Format und Thread-Format.
