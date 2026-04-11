# Chat History: renderer converts openui lang verlauf 20260315 zuss

*Created on 3/15/2026, 3:29:59 AM*

---

**You (Draft):**
# The Renderer



`<Renderer />` converts OpenUI Lang text into React UI using your library.

Basic usage [#basic-usage]

```tsx
import { Renderer } from "@openuidev/react-lang";
import { openuiLibrary } from "@openuidev/react-ui";

export function AssistantMessage({
  content,
  isStreaming,
}: {
  content: string | null;
  isStreaming: boolean;
}) {
  return <Renderer library={openuiLibrary} response={content} isStreaming={isStreaming} />;
}
```

Props [#props]

| Prop            | Type                                    | Description                                                    |
| :-------------- | :-------------------------------------- | :------------------------------------------------------------- |
| `response`      | `string \| null`                        | Raw OpenUI Lang response text.                                 |
| `library`       | `Library`                               | Library created by `createLibrary(...)`.                       |
| `isStreaming`   | `boolean`                               | Indicates stream is in progress.                               |
| `onAction`      | `(event: ActionEvent) => void`          | Receives structured action events from interactive components. |
| `onStateUpdate` | `(state: Record<string, any>) => void`  | Called on form field changes with the raw field state map.     |
| `initialState`  | `Record<string, any>`                   | Hydrates form state on load (e.g. from persisted message).     |
| `onParseResult` | `(result: ParseResult \| null) => void` | Debug/inspect latest parse result.                             |

Streaming behavior [#streaming-behavior]

* Parser re-runs as chunks arrive.
* Forward references resolve when their statements arrive.
* Missing unresolved references are omitted/null in parsed output until available.
* There is no `nodePlaceholder` prop in the current renderer API.

Actions [#actions]

```tsx
<Renderer
  library={openuiLibrary}
  response={content}
  onAction={(event) => {
    if (event.type === "continue_conversation") {
      // event.humanFriendlyMessage — display label
      // event.formState — raw field values at time of action
    }
  }}
/>
```

Hooks for component authors [#hooks-for-component-authors]

Use these inside components defined with `defineComponent(...)`:

* `useIsStreaming()`
* `useTriggerAction()`
* `useRenderNode()`
* `useFormValidation()`
* `useFormName()` / `useGetFieldValue()` / `useSetFieldValue()`

In component renderers, `renderNode` is also passed directly as a prop.

Example with nested children [#example-with-nested-children]

```tsx
const Dashboard = defineComponent({
  name: "Dashboard",
  description: "Container",
  props: z.object({ cards: z.array(StatCard.ref) }),
  component: ({ props, renderNode }) => <div>{renderNode(props.cards)}</div>,
});
```

Next Steps [#next-steps]

<Cards>
  <Card title="Language Specification" href="/docs/openui-lang/specification">
    Grammar and parser semantics.
  </Card>

  <Card title="Benchmarks" href="/docs/openui-lang/benchmarks">
    Token and latency comparison.
  </Card>
</Cards>