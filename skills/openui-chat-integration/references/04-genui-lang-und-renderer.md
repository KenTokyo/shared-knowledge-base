# GenUI, Lang und Renderer

## Wann laden

Lade diese Datei, wenn die KI nicht nur Text, sondern Karten, Listen, Formulare oder andere UI-Bausteine ausgeben soll.

## Erst diese Seiten lesen

- GenUI-Grundidee:
  `../../openui-docs/genui-lets-assistant-messages-verlauf-20260312-6518-history.md`
- Überblick über Library, Prompt, Parser und Renderer:
  `../../openui-docs/overview-import-langexample-components-verlauf-20260312-3ku6-history.md`
- Eigene Komponenten definieren:
  `../../openui-docs/defining-components-use-definecomponent-verlauf-20260312-3oa4-history.md`
- Interaktive Aktionen:
  `../../openui-docs/interactivity-openui-components-can-verlauf-20260312-3yru-history.md`
- Sprachformat:
  `../../openui-docs/language-specification-openui-lang-verlauf-20260312-42wk-history.md`
- Rendern im Frontend:
  `../../openui-docs/renderer-converts-openui-lang-verlauf-20260312-3vhk-history.md`
- System-Prompt erzeugen:
  `../../openui-docs/system-prompts-library-prompt-verlauf-20260312-3r6h-history.md`

## Feste Regeln

- `componentLibrary` im Frontend allein reicht nicht.
- Die App braucht auch einen erzeugten System-Prompt auf dem Server.
- Die Reihenfolge der Felder im `z.object(...)` bestimmt die Reihenfolge der Argumente in OpenUI Lang.
- `Renderer` kann während des Streams immer wieder neu parsen. Das ist normal.
- Wenn Aktionen genutzt werden, behandle `onAction` und bei Bedarf auch `onStateUpdate`.

## Gute Startkombination

1. Eigene oder fertige Library festlegen.
2. Prompt aus der Library erzeugen.
3. Prompt auf dem Server mitsenden.
4. `Renderer` mit derselben Library im Frontend nutzen.
